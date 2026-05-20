import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

function PeriodDropdown({ periods = [], value, onChange, variant = "main" }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isMain = variant === "main";

  return (
    <div className="flex flex-col items-start gap-1" ref={ref}>
      {isMain ? 
        (<label className="text-white text-sm font-medium">Period</label>) :
        (<label className="text-[#14357F] text-sm font-medium">Select Period</label>)
      }

      <div className="relative w-34 md:w-36">
        {/* Trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full flex items-center justify-between bg-white rounded-md px-2 py-1 lg:px-4 lg:py-2 
                      text-blue-600 font-medium text-sm lg:text-sm shadow-sm
                    ${isMain ? "" : "ring-2 ring-(--color-primary)/10"}
            `}
        >
          <span>{value || "Periode"}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        <ul
          className={`absolute top-full mt-1 w-full bg-white rounded-md shadow-lg z-10 overflow-hidden
            transition-all duration-300 origin-top
            ${isOpen
              ? "scale-y-100 translate-y-0 pointer-events ring-2 ring-(--color-primary)/10"
              : "scale-y-0 -translate-y-2 pointer-events-none"
            }`}
        >
          {periods.map((period) => (
            <li
              key={period}
              onClick={() => {
                onChange(period);
                setIsOpen(false);
                navigate(`/trends/${period}`);
              }}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors
                hover:bg-blue-50
                ${value === period ? "text-blue-600 font-semibold" : "text-gray-600"}`}
            >
              {period}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PeriodDropdown;