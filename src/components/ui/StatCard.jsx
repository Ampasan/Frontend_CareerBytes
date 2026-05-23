import { TrendingUp } from "lucide-react";

// Tambah icon baru di sini kalau API nanti punya jenis lain
const iconMap = {
  trending: <TrendingUp size={16} className="text-(--color-link-muted)" />,
};

function StatCard({ icon = null, title, content, desc }) {
  return (
    <div className="flex-1 bg-white shadow-md rounded-xl p-4 md:p-5 flex flex-col gap-2 md:min-h-34.5 
                    text-(--color-primary) justify-center items-center md:justify-start md:items-start">
      {/* Title + icon opsional */}
      <div className="flex items-center gap-2">
        {icon && iconMap[icon] && (
          <span>{iconMap[icon]}</span>
        )}
        <span className="text-xs truncate">{title}</span>
      </div>

      {/* Content - angka besar atau teks */}
      <p className="text-base sm:text-xl font-bold leading-tight md:max-w-40">
        {content}
      </p>

      {/* Desc - bisa angka growth atau teks biasa */}
      <p className="text-xs">{desc}</p>
    </div>
  );
}

export default StatCard;
