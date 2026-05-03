import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-200 bg-white rounded-xl shadow-md flex items-center px-6 py-4">
        
        <input
          type="text"
          placeholder="Search for a role"
          className="flex-1 bg-transparent outline-none text-gray-600 placeholder:text-gray-500 text-md"
          onChange={(e) => onSearch(e.target.value)}
        />

        <Search className="text-gray-500 w-6 h-6" />
      </div>
    </div>
  );
}

export default SearchBar;