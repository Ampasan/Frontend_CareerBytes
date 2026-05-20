function FilterRole({ onSelectRole }) {
  const roles = [
    "Data Analyst",
    "Frontend Developer",
    "UI/UX Designer",
    "Product Manager",
  ];

  return (
    <div className="flex justify-center items-center gap-4 flex-wrap w-full max-w-200 mx-auto">
      <span className="text-(--color-text-muted) text-md mr-2">Popular :</span>

      {roles.map((role, index) => (
        <div
          key={index}
          onClick={() => onSelectRole && onSelectRole(role)}
          className="bg-(--color-surface-primary-alt) text-(--color-primary) px-5 py-1.5 rounded-md text-md font-medium hover:bg-(--color-primary-soft-hover) transition cursor-pointer"
        >
          {role}
        </div>
      ))}
    </div>
  );
}

export default FilterRole;
