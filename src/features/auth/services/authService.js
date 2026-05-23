import api, { API_BASE_URL, clearStoredAuth } from "../../../services/api";
import { setOAuthProvider } from "./oauthSession";

const readRoleName = (...values) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
    if (value && typeof value === "object") {
      const roleName =
        value.name ||
        value.roleName ||
        value.role_name ||
        value.title ||
        value.label;

      if (typeof roleName === "string" && roleName.trim()) {
        return roleName.trim();
      }
    }
  }

  return "";
};

const readRoleId = (...values) => {
  for (const value of values) {
    if (value === 0 || value) return value;
  }

  return null;
};

const normalizeUser = (user = {}) => {
  const safeUser = user || {};
  const roleName = readRoleName(
    safeUser.roleName,
    safeUser.role_name,
    safeUser.role,
    safeUser.careerRole,
    safeUser.careerRoleName,
    safeUser.career_role,
    safeUser.career_path,
    safeUser.careerPath,
    safeUser.selectedRole,
    safeUser.selected_role
  );

  return {
    id: safeUser.id,
    name: safeUser.name || safeUser.fullName || "",
    email: safeUser.email || "",
    avatar: safeUser.avatar || null,
    role: roleName,
    roleId: readRoleId(
      safeUser.roleId,
      safeUser.role_id,
      safeUser.careerRoleId,
      safeUser.career_role_id,
      safeUser.careerRole?.id,
      safeUser.career_role?.id,
      safeUser.selectedRole?.id,
      safeUser.selected_role?.id,
      safeUser.role?.id
    ),
    createdAt: safeUser.createdAt || safeUser.created_at || null,
  };
};

const pickExactRole = (roles = [], roleName = "") => {
  const normalizedRoleName = roleName.toLowerCase().trim();

  return (
    roles.find((role) => role.name?.toLowerCase().trim() === normalizedRoleName) ||
    roles.find((role) =>
      role.name?.toLowerCase().includes(normalizedRoleName)
    ) ||
    roles[0]
  );
};

const resolveRoleWithToken = async (roleName, token) => {
  if (!roleName || !token) return null;

  const response = await api.get("/api/roles", {
    params: { query: roleName },
    headers: { Authorization: `Bearer ${token}` },
  });

  return pickExactRole(response.data?.data || [], roleName) || null;
};

const authService = {
  login: async (email, password) => {
    const response = await api.post("/api/auth/login", { email, password });

    return {
      message: response.data?.message || "Login berhasil",
      token: response.data?.token,
      user: normalizeUser(response.data?.user),
    };
  },

  register: async (userData) => {
    const payload = {
      name: userData.name || userData.fullName,
      email: userData.email,
      password: userData.password,
    };

    const response = await api.post("/api/auth/register", payload);
    const token = response.data?.token;
    let user = normalizeUser(response.data?.user);

    if (token && userData.careerRole) {
      try {
        const role = await resolveRoleWithToken(userData.careerRole, token);

        if (role?.id) {
          const roleResponse = await api.patch(
            "/api/auth/me/role",
            { roleId: role.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          user = {
            ...user,
            role: roleResponse.data?.data?.roleName || role.name,
            roleId: roleResponse.data?.data?.roleId || role.id,
          };
        }
      } catch {
        user = { ...user, role: userData.careerRole };
      }
    }

    return {
      message: response.data?.message || "Registrasi berhasil",
      token,
      user,
    };
  },

  me: async () => {
    const response = await api.get("/api/auth/me");
    return normalizeUser(response.data?.user);
  },

  updateRole: async (roleId) => {
    const response = await api.patch("/api/auth/me/role", { roleId });

    return {
      message: response.data?.message || "Role berhasil dipilih",
      data: response.data?.data,
    };
  },

  logout: async () => {
    clearStoredAuth();
    return { success: true };
  },

  getOAuthUrl: (provider) => `${API_BASE_URL}/api/auth/${provider}`,

  startOAuthLogin: (provider) => {
    setOAuthProvider(provider);
    window.location.href = `${API_BASE_URL}/api/auth/${provider}`;
  },
};

export default authService;
