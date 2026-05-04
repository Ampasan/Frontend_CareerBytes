import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/ui/Button";
import InputForm from "../../../components/ui/InputForm";
import ButtonSocial from "../../../components/ui/ButtonSocial";
import { Mail, Lock, AlertCircle } from "lucide-react";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* TITLE */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-(--color-primary) text-center">
        Welcome Back
      </h1>

      <p className="text-sm text-(--color-primary)/80 mt-2 text-center">
        Login to continue your career journey
      </p>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="w-full mt-6 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-10 sm:mt-12 lg:mt-15">
        <InputForm
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={Mail}
        />

        <InputForm
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={Lock}
        />

        <div className="text-right text-xs">
          <Link to="/forgot-password" size="sm" className="underline text-(--color-primary)">
            Forgot Password?
          </Link>
        </div>

        <Button 
          text={loading ? "Logging in..." : "Login"} 
          type="submit"
          className="w-full py-3" 
          disabled={loading}
        />

        {/* Divider */}
        <div className="flex items-center gap-3 mt-2 mb-2">
          <div className="flex-1 h-px bg-blue-300"></div>
          <span className="text-xs text-blue-400">or</span>
          <div className="flex-1 h-px bg-blue-300"></div>
        </div>

        <ButtonSocial type="google" />
        <ButtonSocial type="github" />

        <p className="text-center text-xs mt-2 text-(--color-primary)">
          Don’t have an account?{" "}
          <Link to="/register" className="font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
