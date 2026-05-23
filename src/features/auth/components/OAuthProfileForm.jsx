import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, User } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import Button from "../../../components/ui/Button";
import InputForm from "../../../components/ui/InputForm";
import SelectCareer from "../../../components/ui/SelectCareer";

const providerLabels = {
  google: "Google",
  github: "GitHub",
};

function OAuthProfileForm() {
  const navigate = useNavigate();
  const { user, oauthProvider, completeOAuthProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    careerRole: user?.role || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const providerName = providerLabels[oauthProvider] || "social account";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const result = await completeOAuthProfile(formData);
    setLoading(false);

    if (!result.success) {
      setError(result.message || "Failed to save profile. Please try again.");
      return;
    }

    setSuccess("Profile saved. Redirecting...");
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 700);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--color-primary) text-center">
        Complete Your Profile
      </h1>

      <p className="text-sm text-(--color-primary)/80 mt-2 text-center">
        Add your details to continue with {providerName}
      </p>

      {error && (
        <div className="w-full mt-6 p-3 rounded-lg bg-(--color-error-bg) border border-(--color-error-border) flex items-center gap-2 text-(--color-error) text-sm">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="w-full mt-6 p-3 rounded-lg bg-(--color-success-bg) border border-(--color-success-border) flex items-center gap-2 text-(--color-success) text-sm">
          <CheckCircle size={18} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-8">
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
          required
        />

        <Button
          text={loading ? "Saving profile..." : "Continue"}
          type="submit"
          className="w-full py-3 mt-2"
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default OAuthProfileForm;
