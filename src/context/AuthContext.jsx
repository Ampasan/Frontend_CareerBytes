import { useState, useEffect, useCallback } from "react";
import authService from "../features/auth/services/authService";
import rolesService from "../services/rolesService";
import { AuthContext } from "./auth-context";
import {
  clearOAuthProfileState,
  getOAuthProvider,
  isOAuthProfilePending,
  setOAuthProfilePending,
} from "../features/auth/services/oauthSession";
import {
  clearStoredAuth,
  getApiErrorMessage,
  getStoredToken,
  getStoredUser,
  setStoredAuth,
} from "../services/api";

const cleanOAuthTokenFromUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("token");
  url.searchParams.delete("error");
  url.searchParams.delete("provider");
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`);
};

const mergeUserProfile = (profile = {}, fallback = {}) => {
  const safeProfile = profile || {};
  const storedFallback = fallback || {};
  const canUseFallback =
    !safeProfile.id ||
    !storedFallback.id ||
    String(safeProfile.id) === String(storedFallback.id);
  const safeFallback = canUseFallback ? storedFallback : {};

  return {
    ...safeFallback,
    ...safeProfile,
    name: safeFallback.oauthProfileCompleted
      ? safeFallback.name || safeProfile.name || ""
      : safeProfile.name || safeFallback.name || "",
    role: safeProfile.role || safeFallback.role || "",
    roleId: safeProfile.roleId ?? safeFallback.roleId ?? null,
    oauthProfileCompleted:
      safeProfile.oauthProfileCompleted || safeFallback.oauthProfileCompleted || false,
  };
};

const withResolvedRole = async (profile) => {
  if (!profile) return profile;
  if (profile.role && profile.roleId) return profile;

  let nextProfile = profile;

  if (nextProfile.roleId && !nextProfile.role) {
    try {
      const role = await rolesService.resolveRoleById(nextProfile.roleId);
      nextProfile = {
        ...nextProfile,
        role: role?.name || nextProfile.role || "",
      };
    } catch {
      // Keep the login flow moving; role can still be resolved from default roadmap.
    }
  }

  if (!nextProfile.role || !nextProfile.roleId) {
    try {
      const role = await rolesService.resolveCurrentUserRole();
      nextProfile = {
        ...nextProfile,
        role: nextProfile.role || role?.name || "",
        roleId: nextProfile.roleId ?? role?.id ?? null,
      };
    } catch {
      return nextProfile;
    }
  }

  return nextProfile;
};

const withTimeout = (promise, timeoutMs = 10000) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => {
        reject(new Error("Request timeout. Server terlalu lama merespons."));
      }, timeoutMs);
    }),
  ]);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(getStoredToken()));
  const [requiresOAuthProfile, setRequiresOAuthProfile] = useState(() => isOAuthProfilePending());
  const [oauthProvider, setOAuthProviderState] = useState(() => getOAuthProvider());
  const [loading, setLoading] = useState(true);

  const persistSession = useCallback(({ token, user: nextUser }) => {
    setStoredAuth({ token, user: nextUser });
    setUser(nextUser);
    setIsAuthenticated(Boolean(token));
  }, []);

  const refreshUser = useCallback(async () => {
    const profile = await withTimeout(authService.me());
    const nextUser = await withResolvedRole(mergeUserProfile(profile, getStoredUser()));

    setStoredAuth({ user: nextUser });
    setUser(nextUser);
    setIsAuthenticated(true);
    return nextUser;
  }, []);

  useEffect(() => {
    const verifySession = async () => {
      const params = new URLSearchParams(window.location.search);
      const oauthToken = params.get("token");
      const oauthProviderFromUrl = params.get("provider");
      const token = oauthToken || getStoredToken();

      if (!token) {
        clearStoredAuth();
        clearOAuthProfileState();
        setUser(null);
        setIsAuthenticated(false);
        setRequiresOAuthProfile(false);
        setOAuthProviderState("");
        setLoading(false);
        return;
      }

      try {
        if (oauthToken) {
          setStoredAuth({ token: oauthToken });
          setOAuthProfilePending(oauthProviderFromUrl || getOAuthProvider());
          setRequiresOAuthProfile(true);
          setOAuthProviderState(oauthProviderFromUrl || getOAuthProvider());
          cleanOAuthTokenFromUrl();
        }

        const profile = await withTimeout(authService.me());
        const nextUser = await withResolvedRole(mergeUserProfile(profile, getStoredUser()));

        persistSession({ token, user: nextUser });
      } catch {
        clearStoredAuth();
        clearOAuthProfileState();
        setUser(null);
        setIsAuthenticated(false);
        setRequiresOAuthProfile(false);
        setOAuthProviderState("");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [persistSession]);

  const login = async (email, password) => {
    try {
      const response = await withTimeout(authService.login(email, password));
      setStoredAuth({ token: response.token });
      const nextUser = await withResolvedRole(mergeUserProfile(response.user, getStoredUser()));

      persistSession({ ...response, user: nextUser });

      return { success: true, user: nextUser };
    } catch (error) {
      return { success: false, message: getApiErrorMessage(error, "Login gagal") };
    }
  };

  const register = async (userData) => {
    try {
      const response = await withTimeout(authService.register(userData));

      if (response.token) {
        setStoredAuth({ token: response.token });
        const nextUser = await withResolvedRole(mergeUserProfile(response.user, getStoredUser()));
        persistSession({ ...response, user: nextUser });

        response.user = nextUser;
      }

      return {
        success: true,
        authenticated: Boolean(response.token),
        message: response.message,
        user: response.user,
      };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error, "Registrasi gagal"),
      };
    }
  };

  const completeOAuthProfile = async ({ fullName, careerRole }) => {
    const cleanedName = fullName?.trim();
    const cleanedCareerRole = careerRole?.trim();

    if (!cleanedName || cleanedName.length < 3) {
      return { success: false, message: "Full Name minimal 3 karakter" };
    }

    if (!cleanedCareerRole) {
      return { success: false, message: "Career Path wajib dipilih" };
    }

    try {
      const role = await rolesService.resolveRoleByName(cleanedCareerRole);

      if (!role?.id) {
        return { success: false, message: "Career Path tidak ditemukan" };
      }

      const response = await authService.updateRole(role.id);
      const nextUser = {
        ...user,
        name: cleanedName,
        roleId: response.data?.roleId || role.id,
        role: response.data?.roleName || role.name || cleanedCareerRole,
        oauthProfileCompleted: true,
      };

      setStoredAuth({ user: nextUser });
      clearOAuthProfileState();
      setUser(nextUser);
      setIsAuthenticated(true);
      setRequiresOAuthProfile(false);
      setOAuthProviderState("");

      return { success: true, user: nextUser };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error, "Gagal menyimpan profil OAuth"),
      };
    }
  };

  const updateUserRole = async (roleId) => {
    try {
      const response = await authService.updateRole(roleId);
      const resolvedRole = response.data?.roleName
        ? null
        : await rolesService.resolveRoleById(roleId);
      const nextUser = {
        ...user,
        roleId: response.data?.roleId || roleId,
        role: response.data?.roleName || resolvedRole?.name || user?.role,
      };

      setStoredAuth({ user: nextUser });
      setUser(nextUser);

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error, "Gagal menyimpan role"),
      };
    }
  };

  const logout = async () => {
    await authService.logout();
    clearOAuthProfileState();
    setUser(null);
    setIsAuthenticated(false);
    setRequiresOAuthProfile(false);
    setOAuthProviderState("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        requiresOAuthProfile,
        oauthProvider,
        login,
        register,
        completeOAuthProfile,
        logout,
        refreshUser,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
