import { User } from "lucide-react";

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
          className={`w-full outline-none bg-transparent text-sm ${
            value ? "text-(--color-black)" : "text-(--color-text-soft)"
          }`}
        >
          <option value="" className="text-(--color-text-soft)">
            Enter your career path
          </option>
          <option value="Frontend Developer" className="text-(--color-black)">
            Frontend Developer
          </option>
          <option value="Software Engineer" className="text-(--color-black)">
            Software Engineer
          </option>
          <option value="UI/UX Designer" className="text-(--color-black)">
            UI/UX Designer
          </option>
          <option value="Data Analyst" className="text-(--color-black)">
            Data Analyst
          </option>
          <option value="Product Manager" className="text-(--color-black)">
            Product Manager
          </option>
        </select>
      </div>
    </div>
  );
}

export default SelectCareer;
