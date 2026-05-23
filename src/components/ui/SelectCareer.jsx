import { User } from "lucide-react";
import { POPULAR_ROLE_NAMES } from "../../constants/careerTools";

function SelectCareer({ name, value, onChange, required = false }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm text-(--color-primary)">Career Path</label>

      <div className="flex items-center border border-(--color-primary) rounded-lg px-4 py-3 lg:py-2">
        <User size={18} className="text-(--color-icon-muted) mr-3" />

        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full outline-none bg-(--color-transparent) text-sm ${
            value ? "text-black" : "text-(--color-text-soft)"
          }`}
        >
          <option value="" className="text-(--color-text-soft)">
            Enter your career path
          </option>
          {POPULAR_ROLE_NAMES.map((role) => (
            <option key={role} value={role} className="text-black">
              {role}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectCareer;
