import { Navigate } from "react-router-dom";
import AuthLayout from "../features/auth/components/AuthLayout";
import OAuthProfileForm from "../features/auth/components/OAuthProfileForm";
import { useAuth } from "../hooks/useAuth";

function OAuthProfilePage() {
  const { loading, requiresOAuthProfile } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--color-primary)"></div>
      </div>
    );
  }

  if (!requiresOAuthProfile) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout>
      <OAuthProfileForm />
    </AuthLayout>
  );
}

export default OAuthProfilePage;
