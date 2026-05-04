import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../../components/ui/Button";
import InputForm from "../../../components/ui/InputForm";
import SelectCareer from "../../../components/ui/SelectCareer";
import { Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";

function RegisterForm() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        careerRole: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const validateForm = () => {
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.careerRole) {
            return "All fields are required";
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return "Please enter a valid email address";
        }

        if (formData.password.length < 8) {
            return "Password must be at least 8 characters long";
        }

        if (formData.password !== formData.confirmPassword) {
            return "Passwords do not match";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        const result = await register(formData);
        setLoading(false);

        if (result.success) {
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            setError(result.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center">

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--color-primary) text-center">
                Create an Account
            </h1>

            <p className="text-sm text-(--color-primary)/80 mt-2 text-center">
                Start building your career journey
            </p>

            {/* MESSAGES */}
            {error && (
                <div className="w-full mt-6 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="w-full mt-6 p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle size={18} />
                    <span>{success}</span>
                </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-6 md:mt-7">

                <InputForm
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    icon={User}
                />

                <SelectCareer 
                    name="careerRole"
                    value={formData.careerRole}
                    onChange={handleChange}
                />

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
                    placeholder="Create a password"
                    icon={Lock}
                />

                <InputForm
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    icon={Lock}
                />

                <div className="flex items-start gap-2 text-xs mt-4 md:mt-7">
                    <input type="checkbox" className="mt-1" required />
                    <p>
                        I agree to the{" "}
                        <span className="text-(--color-primary)">
                            Terms and Conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-(--color-primary)">
                            Privacy Policy
                        </span>
                    </p>
                </div>

                <Button 
                    text={loading ? "Creating account..." : "Sign Up"} 
                    type="submit"
                    className="w-full py-3 mt-1" 
                    disabled={loading}
                />

                <p className="text-center text-xs mt-2 mb-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-(--color-primary)">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;