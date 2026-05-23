import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RoadmapPage from "../pages/RoadmapPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import RegisterPage from "../pages/RegisterPage";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import AssessmentPage from "../pages/AssessmentPage";
import DailyMissionPage from "../pages/DailyMissionPage";
import TaskDetailPage from "../pages/TaskDetailPage";
import TaskAssessmentPage from "../pages/TaskAssessmentPage";
import TaskResultPage from "../pages/TaskResultPage";
import TrendsPage from "../pages/TrendsPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
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
            path="/assessment"
            element={
              <ProtectedRoute>
                  <AssessmentPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/daily-mission"
            element={
              <ProtectedRoute>
                  <DailyMissionPage />
              </ProtectedRoute>
            }
          />
            <Route 
              path="/daily-mission/task"
              element={
                <ProtectedRoute>
                    <TaskDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/daily-mission/task/result"
              element={
                <ProtectedRoute>
                  <TaskResultPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/daily-mission/task/:roadmapLevelId"
              element={
                <ProtectedRoute>
                    <TaskDetailPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/daily-mission/task/:roadmapLevelId/:taskId"
              element={
                <ProtectedRoute>
                    <TaskDetailPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/daily-mission/task/:taskId/assessment"
              element={
                <ProtectedRoute>
                    <TaskAssessmentPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/daily-mission/task/:roadmapLevelId/:taskId/assessment"
              element={
                <ProtectedRoute>
                    <TaskAssessmentPage />
                </ProtectedRoute>
              }
            />
          <Route 
            path="/trends"
            element={
              <ProtectedRoute>
                  <TrendsPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/trends/:year"
            element={
              <ProtectedRoute>
                  <TrendsPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
