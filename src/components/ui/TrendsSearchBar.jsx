import { useState } from "react";
import { Search } from "lucide-react";

function TrendsSearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full bg-white rounded-xl shadow-md flex items-center px-6 py-4">
        
        <input
          type="text"
          placeholder="Search for a role"
          className="flex-1 bg-(--color-transparent) outline-none text-(--color-text-subtle) placeholder:text-(--color-text-muted) text-md"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Search 
          className="text-(--color-text-muted) w-6 h-6 cursor-pointer hover:text-(--color-link) transition" 
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default TrendsSearchBar;
