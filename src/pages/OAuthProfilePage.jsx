import AuthLayout from "../features/auth/components/AuthLayout";
import OAuthProfileForm from "../features/auth/components/OAuthProfileForm";

function OAuthProfilePage() {
  return (
    <AuthLayout>
      <OAuthProfileForm />
    </AuthLayout>
  );
}

export default OAuthProfilePage;
