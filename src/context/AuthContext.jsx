import { useState, useEffect, useCallback } from "react";
import authService from "../features/auth/services/authService";
import rolesService from "../services/rolesService";
import { AuthContext } from "./auth-context";
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
    role: safeProfile.role || safeFallback.role || "",
    roleId: safeProfile.roleId ?? safeFallback.roleId ?? null,
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
      const token = oauthToken || getStoredToken();

      if (!token) {
        clearStoredAuth();
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        if (oauthToken) {
          setStoredAuth({ token: oauthToken });
          cleanOAuthTokenFromUrl();
        }

        const profile = await withTimeout(authService.me());
        const nextUser = await withResolvedRole(mergeUserProfile(profile, getStoredUser()));

        persistSession({ token, user: nextUser });
      } catch {
        clearStoredAuth();
        setUser(null);
        setIsAuthenticated(false);
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
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        refreshUser,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
