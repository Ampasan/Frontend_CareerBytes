import { TrendingUp } from "lucide-react";

// Tambah icon baru di sini kalau API nanti punya jenis lain
const iconMap = {
  trending: <TrendingUp size={16} className="text-blue-500" />,
};

function StatCard({ icon = null, title, content, desc }) {
  return (
    <div className="flex-1 bg-white shadow-md rounded-xl p-5 flex flex-col gap-2 min-w-0 min-h-34.5 text-(--color-primary)">
      {/* Title + icon opsional */}
      <div className="flex items-center gap-2">
        {icon && iconMap[icon] && (
          <span>{iconMap[icon]}</span>
        )}
        <span className="text-xs truncate">{title}</span>
      </div>

      {/* Content - angka besar atau teks */}
      <p className="text-xl sm:text-xl font-bold leading-tight max-w-40">
        {content}
      </p>

      {/* Desc - bisa angka growth atau teks biasa */}
      <p className="text-xs">{desc}</p>
    </div>
  );
}

export default StatCard;