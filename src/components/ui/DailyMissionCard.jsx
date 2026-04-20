import Bar from "./Bar";
import Checklist from "./Checklist";

function DailyMissionCard({ data }) {
    return(
        <div className="bg-white p-9 px-10 rounded-xl flex flex-col gap-4 shadow-md shadow-black/10">
            <h2 className="font-semibold text-2xl">Daily Mission</h2>
            <p className="text-xs font-semibold text-black/40">CREATE A SIMPLE LANDING PAGE</p>

            <div className="flex flex-col gap-5 mb-12">
                {data.map((item, index) => (
                    <Checklist
                    bgColor="var(--color-image)"
                    isCheck={item.isCheck}
                    text={item.text}
                    variant={item.variant}
                />
                ))}
            </div>
            <Bar progress={40} text="Weakly Streak" variant="C" />

        </div>
    )
}

export default DailyMissionCard;