import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function InputForm({
    label,
    type = "text",
    placeholder,
    icon: Icon,
    name,
    value,
    onChange,
    required = false,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-sm text-(--color-primary)">
                {label}
            </label>

            <div className="flex items-center border border-(--color-border) rounded-lg px-4 py-3 lg:py-2">
                {Icon && (
                    <Icon size={18} className="text-(--color-icon-muted) mr-3" />
                )}

                <input
                    type={isPassword && showPassword ? "text" : type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full outline-none bg-transparent text-sm text-(--color-black) placeholder:text-(--color-text-soft)"
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <Eye size={18} className="text-(--color-text-soft)" />
                        ) : (
                            <EyeOff size={18} className="text-(--color-text-soft)" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

export default InputForm;
