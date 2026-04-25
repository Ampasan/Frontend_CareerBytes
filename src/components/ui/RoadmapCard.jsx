// import Bar from "./Bar"; //OPSIONAL
import Checklist from "./Checklist";

function RoadmapCard({opacity, title, status, description, ChecklistItems, progress}) {
    return(
        <div className={`bg-[var(--color-cardRM)] grid grid-cols-[80%_20%] justify-center items-center rounded-lg p-8 px-15 py-10 shadow-lg shadow-black/20 ml-15 hover:scale-101 transition ${opacity}`}>
            
            {/* BAGIAN KIRI */}
            <div className="flex flex-col gap-3 mr-10">
                {/* ATAS: TITLE, STATUS, DESCRIPTION*/}
                <div className="flex gap-6">
                    <h2 className="font-semibold text-2xl leading-tight tracking-tight">{title}</h2>
                    {status && (<h2 className="bg-white px-3 rounded font-semibold flex items-center">{status}</h2>)}
                </div>
                <p className="text-black/60 mb-10 text-sm">{description}</p>
                {/* BAWAH: CHECKLIST */}
                {ChecklistItems?.map((item, index) => (
                    <Checklist 
                    key={index}
                    bgColor="white"
                    isCheck={item.isCheck}
                    text={item.text}
                    />
                ))}
            </div>

            {/* BAGIAN KANAN */}
            <div className="text-sm h-full flex flex-col font-bold justify-between text-black/40">
                {/* ATAS: TOOLS + KOTAK */}
                <div className="flex flex-col gap-2">
                    <h3 className="">Tools :</h3>
                    <div className="flex justify-between">
                        <div className="w-[50px] h-[40px] bg-white/20"></div>
                        <div className="w-[50px] h-[40px] bg-white/20"></div>
                        <div className="w-[50px] h-[40px] bg-white/20"></div>
                    </div>
                </div>
                {/* BAWAH: PROGRESS + BAR */}
                <div className="flex flex-col gap-1">
                    <h3>Progress</h3>
                    <div className="flex items-center gap-2">
                        {/* BAR */}
                        <div className="flex-1 bg-black/20 h-1.5 rounded overflow-hidden">
                            <div className="bg-black/30 h-2 w-[100%] rounded" 
                            style={{width: `${progress}%`}}>
                            </div>
                        </div>
                        <p className="min-w-[37px] font-bold text-sm text-right">{progress}%</p>
                        {/* <Bar variant="B" progress={75} /> */} {/* BAR COMPONENT (OPSIONAL) */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoadmapCard;