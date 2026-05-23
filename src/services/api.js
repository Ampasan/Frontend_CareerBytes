import axios from "axios";

const normalizeBaseUrl = (url = "") => {
  const trimmedUrl = url.trim().replace(/\/+$/, "");
  if (!trimmedUrl) return "http://localhost:3000";

  return trimmedUrl.endsWith("/api")
    ? trimmedUrl.slice(0, -4)
    : trimmedUrl;
};

export const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000"
);

const isBrowser = typeof window !== "undefined";

export const getStoredToken = () =>
  isBrowser ? window.localStorage.getItem("token") : null;

export const setStoredAuth = ({ token, user }) => {
  if (!isBrowser) return;
  if (token) window.localStorage.setItem("token", token);
  if (user) window.localStorage.setItem("user", JSON.stringify(user));
};

export const clearStoredAuth = () => {
  if (!isBrowser) return;
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
};

export const getStoredUser = () => {
  if (!isBrowser) return null;

  try {
    const savedUser = window.localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    clearStoredAuth();
    return null;
  }
};

export const getApiErrorMessage = (error, fallback = "Terjadi kesalahan. Coba lagi.") =>
  error?.message || error?.data?.message || fallback;

const normalizeApiError = (error) => {
  const responseData = error?.response?.data;
  const message =
    responseData?.message ||
    responseData?.error ||
    (error?.code === "ECONNABORTED"
      ? "Request timeout. Server terlalu lama merespons."
      : "") ||
    error?.message ||
    "Terjadi kesalahan. Coba lagi.";

  const normalizedError = new Error(message);
  normalizedError.status = error?.response?.status;
  normalizedError.data = responseData;
  normalizedError.errors = responseData?.errors || [];
  normalizedError.originalError = error;

  return normalizedError;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeApiError(error);
    const requestUrl = error?.config?.url || "";
    const isAuthRequest =
      requestUrl.includes("/api/auth/login") ||
      requestUrl.includes("/api/auth/register");

    if (normalizedError.status === 401 && !isAuthRequest) {
      clearStoredAuth();
    }

    return Promise.reject(normalizedError);
  }
);

export default api;
