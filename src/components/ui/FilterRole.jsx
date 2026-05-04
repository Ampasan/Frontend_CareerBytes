function FilterRole({ onSelectRole }) {
  const roles = [
    "Data Analyst",
    "Frontend Developer",
    "UI/UX Designer",
    "Product Manager",
  ];

  return (
    <div className="flex justify-center items-center gap-4 flex-wrap w-full max-w-200 mx-auto">
      <span className="text-gray-500 text-md mr-2">Popular :</span>

      {roles.map((role, index) => (
        <div
          key={index}
          onClick={() => onSelectRole && onSelectRole(role)}
          className="bg-[#F0F4FF] text-blue-600 px-5 py-1.5 rounded-md text-md font-medium hover:bg-blue-100 transition cursor-pointer"
        >
          {role}
        </div>
      ))}
    </div>
  );
}

export default FilterRole;