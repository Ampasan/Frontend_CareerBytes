import Bar from "./Bar";
import Checklist from "./Checklist";

function DailyMissionCard({ data }) {
    return(
        <div className="bg-white p-9 px-10 rounded-xl flex flex-col gap-4 shadow-md shadow-black/10">
            {/* CARD TITLE + DESCRIPTION */}
            <h2 className="font-semibold text-2xl text-(--color-primary)">Daily Mission</h2>
            <p className="text-xs font-semibold text-(--color-primary)/40">CREATE A SIMPLE LANDING PAGE</p>
            {/* CARD CHECKLIST */}
            <div className="flex flex-col gap-5 mb-8 lg:mb-12">
                {data.map((item, index) => (
                    <Checklist
                    key={index}
                    bgColor2="bg-[var(--color-primary)]/20"
                    isCheck={item.isCheck}
                    text={item.text}
                    variant={item.variant}
                />
                ))}
            </div>
            {/* CARD BAR */}
            <Bar progress={40} text="Weekly Streak" variant="C" />

        </div>
    )
}

export default DailyMissionCard;