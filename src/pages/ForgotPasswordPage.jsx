import AuthLayout from "../features/auth/components/AuthLayout";
import ForgotPasswordForm from "../features/auth/components/ForgotPasswordForm";

function ForgotPasswordPage() {
    return (
        <AuthLayout>
            <ForgotPasswordForm />
        </AuthLayout>
    );
}

export default ForgotPasswordPage;