import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RoadmapPage from "../pages/RoadmapPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import RegisterPage from "../pages/RegisterPage";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import AssesmentPage from "../pages/AssesmentPage";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route 
            path="/career-roadmap" 
            element={
              <ProtectedRoute>
                <RoadmapPage />
              </ProtectedRoute>
            } 
          /> 

          <Route 
            path="/login" 
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            } 
          />
          
          <Route 
            path="/forgot-password" 
            element={
              <AuthRoute>
                <ForgotPasswordPage />
              </AuthRoute>
            } 
          />
          
          <Route 
            path="/register" 
            element={
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            } 
          />

          <Route 
            path="/assesment"
            element={
              <ProtectedRoute>
                  <AssesmentPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}