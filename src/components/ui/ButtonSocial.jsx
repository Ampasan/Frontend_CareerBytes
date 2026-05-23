import authService from "../../features/auth/services/authService";

const socialConfig = {
  google: {
    icon: "https://res.cloudinary.com/drrmbeiyk/image/upload/v1779541130/google_zb3qop.svg",
    text: "Continue with Google",
  },
  github: {
    icon: "https://res.cloudinary.com/drrmbeiyk/image/upload/v1779541129/github_i6l2rh.svg",
    text: "Continue with GitHub",
  },
};

function ButtonSocial({ type = "google" }) {
  const config = socialConfig[type] || socialConfig.google;

  const handleClick = () => {
    window.location.href = authService.getOAuthUrl(type);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 border border-(--color-primary) rounded-lg p-4 lg:p-3 hover:bg-(--color-secondary)/80 transition"
    >
      <img
        src={config.icon}
        alt={config.text}
        className="w-5 h-5 object-contain"
      />

      <span className="text-sm lg:text-md font-medium text-(--color-primary)">
        {config.text}
      </span>
    </button>
  );
}

export default ButtonSocial;
