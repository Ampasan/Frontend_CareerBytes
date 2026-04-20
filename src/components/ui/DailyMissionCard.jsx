import Checklist from "./Checklist";

function DailyMissionCard() {
    return(
        <div className="bg-white p-5 rounded-xl flex flex-col gap-2">
            <h2 className="font-semibold text-2xl">Daily Mission</h2>
            <p className="text-xs font-semibold text-black/40">CREATE A SIMPLE LANDING PAGE</p>
            <Checklist
            isCheck={true}
            text="Define landing page structure"
            />

        </div>
    )
}

export default DailyMissionCard;