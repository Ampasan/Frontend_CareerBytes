import { Award, TrendingUp } from "lucide-react";
import Bar from "../../../components/ui/Bar";
import { mockMissions } from "../../../constants/dummy/mission";

function MissionRewardCard({ rewards }) {
  const mission = mockMissions.missions.find((m) => m.id === 2);
  const safeRewards = rewards || mission?.assessment?.rewards || {
    xp: 50,
    badgeProgress: "3 of 5 tasks completed",
    skillGrowth: { "UI Structure": 5 }
  };

  const badgeProgressStr = safeRewards.badgeProgress || "0 of 5 tasks completed";
  const badgeMatch = badgeProgressStr.match(/(\d+)\s+of\s+(\d+)/);

  const completed = badgeMatch ? parseInt(badgeMatch[1]) : 0;
  const total = badgeMatch ? parseInt(badgeMatch[2]) : 1;

  const progress = (completed / total) * 100;

  const skillGrowth = safeRewards.skillGrowth || {};
  const skillKeys = Object.keys(skillGrowth);
  const skillName = skillKeys.length > 0 ? skillKeys[0] : "Skill";
  const skillValue = skillKeys.length > 0 ? skillGrowth[skillName] : 0;

  return (
    <div className="w-full border border-(--color-primary) rounded-2xl p-6 lg:p-7 bg-(--color-surface)">
      {/* Header */}

      <div className="flex items-center gap-2 mb-3">
        <Award
          size={20}
          className="text-(--color-primary)"
        />

        <h2 className="text-lg lg:text-lg font-bold text-(--color-primary)">
          Mission Rewards
        </h2>
      </div>

      {/* Experience */}

      <div className="flex justify-between items-center mb-5">

        <span className="font-medium text-sm lg:text-base text-(--color-primary)/90">
          Experience Points
        </span>

        <span className="text-lg lg:text-xl font-bold text-(--color-primary)">
          +{safeRewards.xp} XP
        </span>

      </div>

      {/* Divider */}

      <div className="border-t border-(--color-primary)/10 mb-2"/>

      {/* Badge Progress */}

      <div className="mb-5">

        <p className="font-medium text-sm lg:text-base text-(--color-primary)/90 mb-2">
          Wireframing Badge Progress
        </p>

        <div className="max-w-full md:max-w-[50%]">
          <Bar
            progress={progress}
            color="bg-(--color-primary)"
            bgColor="bg-(--color-primary)/10"
            height="h-[8px]"
          />
        </div>

        <p className="text-xs lg:text-xs text-(--color-primary)/50 mt-2">
          {safeRewards.badgeProgress}
        </p>

      </div>

      {/* Divider */}

      <div className="border-t border-(--color-primary)/10 mb-4"/>

      {/* Skill */}

      <div className="flex flex-col gap-2">

        <div className="flex items-center gap-2">
          <TrendingUp
            size={18}
            className="text-(--color-primary)"
          />

          <span className="font-medium text-sm lg:text-base text-(--color-primary)/90">
            Skill Growth
          </span>
        </div>

        <p className="font-bold text-sm lg:text-base text-(--color-primary)">
          {skillName} +{skillValue}%
        </p>

      </div>
    </div>
  );
}

export default MissionRewardCard;
