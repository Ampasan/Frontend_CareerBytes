import { POPULAR_ROLE_NAMES } from "../../constants/careerTools";

function SuggestRole({ onSelectRole }) {
  const roles = POPULAR_ROLE_NAMES.slice(0, 6);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      
      {/* Title */}
      <span className="text-(--color-primary) text-sm font-medium">
        Suggested Roles
      </span>

      {/* Role List */}
      <div className="flex flex-wrap justify-center gap-3 max-w-125">
        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => onSelectRole && onSelectRole(role)}
            className="px-4 py-1.5 text-sm text-(--color-primary) border border-(--color-primary-border-strong) rounded-full hover:bg-(--color-surface-primary-alt) transition cursor-pointer"
          >
            {role}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestRole;
