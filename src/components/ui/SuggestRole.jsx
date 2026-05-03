function SuggestRole() {
  const roles = [
    "UI/UX Designer",
    "Data Analyst",
    "Frontend Developer",
    "Product Manager",
    "Software Engineer",
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      
      {/* Title */}
      <span className="text-blue-600 text-sm font-medium">
        Suggested Roles
      </span>

      {/* Role List */}
      <div className="flex flex-wrap justify-center gap-3 max-w-125">
        {roles.map((role, index) => (
          <div
            key={index}
            className="px-4 py-1.5 text-sm text-blue-600 border border-blue-400 rounded-full hover:bg-blue-50 transition cursor-pointer"
          >
            {role}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuggestRole;