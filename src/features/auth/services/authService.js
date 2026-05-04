import { DEFAULT_USER } from "../../../constants/dummy/user";

const getStoredUsers = () => {
  const users = localStorage.getItem("mock_users");
  return users ? JSON.parse(users) : [DEFAULT_USER];
};

const authService = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
          const token = "mock-jwt-token-" + Math.random().toString(36).substr(2);
          const { password: _, ...userWithoutPassword } = user;
          resolve({ user: userWithoutPassword, token });
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  },

  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStoredUsers();
        
        if (users.find(u => u.email === userData.email)) {
          reject(new Error("Email already registered"));
          return;
        }

        const newUser = {
          id: Date.now().toString(),
          name: userData.fullName,
          email: userData.email,
          password: userData.password,
          role: userData.careerRole,
        };

        users.push(newUser);
        localStorage.setItem("mock_users", JSON.stringify(users));
        
        console.log("Mock registered user:", newUser);
        resolve({ success: true, message: "Registration successful" });
      }, 1000);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
};

export default authService;