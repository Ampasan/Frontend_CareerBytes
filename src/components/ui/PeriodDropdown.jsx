import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; 

function PeriodDropdown({ periods = [], value, onChange }) {
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

  return (
    <div className="flex flex-col items-start gap-1" ref={ref}>
      <label className="text-white text-xs font-medium">Period</label>

      <div className="relative w-36">
        {/* Trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between bg-white rounded-md px-4 py-2 text-blue-600 font-medium text-sm shadow-sm"
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
              ? "scale-y-100 translate-y-0 pointer-events-auto"
              : "scale-y-0 -translate-y-2 pointer-events-none"
            }`}
        >
          {periods.map((period) => (
            <li
              key={period}
              onClick={() => {
                onChange(period);
                setIsOpen(false);
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