import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import InputForm from "../../../components/ui/InputForm";
import { Mail } from "lucide-react";

function ForgotPasswordForm() {
  return (
    <div className="flex flex-col items-center">
      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--color-primary) text-center tracking-tight">
        Forgot Password
      </h1>

      <p className="text-sm text-(--color-primary)/80 mt-4 text-center max-w-xs">
        Enter your email and we’ll send you a link to reset your password
      </p>

      {/* FORM */}
      <div className="w-full flex flex-col gap-4 mt-8 sm:mt-10 md:mt-6">
        <InputForm
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
        />

        <Button text="Send Reset Link" className="w-full py-3" />

        {/* BACK TO LOGIN */}
        <p className="text-center text-xs mt-2">
          Remember your password?{" "}
          <Link to="/login" className="text-(--color-primary) font-semibold">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
