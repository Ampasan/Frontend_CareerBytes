import { TrendingUp } from "lucide-react";

const iconMap = {
  trending: <TrendingUp size={40} className="text-(--color-primary-dark)" />,
};

function StatsSummaryCard({ stats = [] }) {
  return (
    <div className="flex flex-wrap gap-5 md:gap-7">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="flex-1 border border-(--color-primary) rounded-xl p-6 flex flex-col justify-center items-center gap-2"
        >
          {stat.icon && iconMap[stat.icon] && (
            <span>{iconMap[stat.icon]}</span>
          )}
          <p className="text-2xl font-bold text-(--color-primary)">{stat.value}</p>
          <p className="text-sm text-(--color-primary-dark) text-center">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsSummaryCard;
