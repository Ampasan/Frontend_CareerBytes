import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RoadmapPage from "../pages/RoadmapPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import RegisterPage from "../pages/RegisterPage";
import OAuthProfilePage from "../pages/OAuthProfilePage";
import { AuthProvider } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import AssessmentPage from "../pages/AssessmentPage";
import DailyMissionPage from "../pages/DailyMissionPage";
import TaskDetailPage from "../pages/TaskDetailPage";
import TaskAssessmentPage from "../pages/TaskAssessmentPage";
import TaskResultPage from "../pages/TaskResultPage";
import TrendsPage from "../pages/TrendsPage";
import { API_BASE_URL } from "../services/api";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function OAuthProfileRedirect() {
  const { isAuthenticated, loading, requiresOAuthProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated && requiresOAuthProfile && location.pathname !== "/oauth-profile") {
      navigate("/oauth-profile", { replace: true });
    }
  }, [isAuthenticated, loading, location.pathname, navigate, requiresOAuthProfile]);

  return null;
}

function OAuthBackendCallbackRedirect() {
  const { provider } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const callbackUrl = new URL(`/api/auth/${provider}/callback`, API_BASE_URL);
    callbackUrl.search = location.search;

    if (callbackUrl.origin === window.location.origin) {
      navigate("/login", { replace: true });
      return;
    }

    window.location.replace(callbackUrl.toString());
  }, [location.search, navigate, provider]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-primary)"></div>
    </div>
  );
}

function OAuthFrontendCallback() {
  const { isAuthenticated, loading, requiresOAuthProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    navigate(requiresOAuthProfile ? "/oauth-profile" : "/", {
      replace: true,
    });
  }, [isAuthenticated, loading, navigate, requiresOAuthProfile]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-primary)"></div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <OAuthProfileRedirect />
        <Routes>
          <Route
            path="/api/auth/:provider/callback"
            element={<OAuthBackendCallbackRedirect />}
          />
          <Route path="/auth/callback" element={<OAuthFrontendCallback />} />
          <Route path="/auth/:provider/callback" element={<OAuthFrontendCallback />} />

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
            path="/oauth-profile"
            element={
              <ProtectedRoute>
                <OAuthProfilePage />
              </ProtectedRoute>
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
