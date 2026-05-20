import { useState, useEffect, createContext, useContext } from "react";
import authService from "../features/auth/services/authService";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      return savedUser && token ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      return !!(savedUser && token);
    } catch {
      return false;
    }
  });

  const [loading] = useState(false);

  useEffect(() => {
    // For async verification
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { user, token } = response;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
