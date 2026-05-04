import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
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
      <div className="w-full max-w-200 bg-white rounded-xl shadow-md flex items-center px-6 py-4">
        
        <input
          type="text"
          placeholder="Search for a role"
          className="flex-1 bg-transparent outline-none text-gray-600 placeholder:text-gray-500 text-md"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <Search 
          className="text-gray-500 w-6 h-6 cursor-pointer hover:text-blue-600 transition" 
          onClick={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchBar;