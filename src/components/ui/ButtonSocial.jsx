import googleIcon from "../../assets/logo/google.svg";
import githubIcon from "../../assets/logo/github.svg";

function ButtonSocial({ type = "google" }) {
    const isGoogle = type === "google";

    const icon = isGoogle ? googleIcon : githubIcon;
    const text = isGoogle
        ? "Continue with Google"
        : "Continue with GitHub";

    return (
        <button className="w-full flex items-center justify-center gap-3 border border-(--color-primary) rounded-lg p-4 lg:p-3 hover:bg-(--color-secondary)/80 transition">
            
            {/* ICON */}
            <img
                src={icon}
                alt={text}
                className="w-5 h-5 object-contain"
            />

            {/* TEXT */}
            <span className="text-sm lg:text-md font-medium text-(--color-primary)">
                {text}
            </span>
        </button>
    );
}

export default ButtonSocial;