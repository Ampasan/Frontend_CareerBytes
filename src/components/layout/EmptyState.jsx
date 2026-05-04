import EmptyIlustration from "../../assets/empty_state.svg";
import SuggestRole from "../ui/SuggestRole";
import Button from "../ui/Button";

function EmptyState({ searchTerm = "", title, description, onSearchAgain, onSelectRole }) {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      
      {/* Illustration */}
      <div className="w-55 lg:w-70 mb-8">
        <img
          src={EmptyIlustration}
          alt="Empty State"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-[22px] lg:text-[28px] font-semibold text-blue-600 mb-4 max-w-175">
        {title || `No Results Found for "${searchTerm}"`}
      </h1>

      {/* Description */}
      <p className="text-gray-500 text-sm lg:text-base max-w-130 mb-6 leading-relaxed">
        {description || "We couldn't find a career roadmap matching your search. Try using different keywords or explore one of our popular roles below."}
      </p>

      {/* Button */}
      <div className="mb-10">
        <Button text="Search Again" variant="primary" onClick={onSearchAgain} />
      </div>

      {/* Suggested Roles */}
      <SuggestRole onSelectRole={onSelectRole} />
    </div>
  );
}

export default EmptyState;