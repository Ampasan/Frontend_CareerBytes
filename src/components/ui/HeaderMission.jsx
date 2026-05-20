import { ChevronLeft, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeaderMission({
  task,
  backText = "Back to Daily Mission",
  backRoute = "/daily-mission",
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* Back */}
      <div className="mb-7">
        <button
          className="flex items-center gap-2 text-base font-semibold hover:opacity-70 cursor-pointer"
          onClick={() => navigate(backRoute)}
        >
          <ChevronLeft size={18} />
          <span>{backText}</span>
        </button>
      </div>

      {/* Badge */}
      <div className="mb-4">
        <span className="bg-(--color-primary)/15 px-4 py-1 font-medium rounded-full text-xs">
          {task.role}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-bold text-3xl lg:text-4xl mb-5 leading-tight">
        {task.title}
      </h1>

      {/* Info */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Clock3 size={18} />
          <span>{task.estimateTime}</span>
        </div>

        <span className="bg-(--color-primary)/30 px-4 py-1 rounded-full text-sm">
          {task.level}
        </span>
      </div>
    </>
  );
}

export default HeaderMission;
