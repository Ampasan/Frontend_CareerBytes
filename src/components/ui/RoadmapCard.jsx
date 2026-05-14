// import Bar from "./Bar"; //OPSIONAL
import Checklist from "./Checklist";

function RoadmapCard({opacity, title, status, description, ChecklistItems, progress, tools}) {
    return(
        <div className={`bg-(--color-primary) grid lg:grid-cols-[80%_20%] justify-center items-center rounded-lg gap-5 lg:gap-0 px-6 py-8 lg:px-15 lg:py-10 shadow-lg shadow-black/20 hover:scale-101 transition ${opacity}`}>
            
            {/* BAGIAN KIRI */}
            <div className="order-1 flex flex-col gap-3 lg:mr-10">
                {/* ATAS: TITLE, STATUS, DESCRIPTION*/}
                <div className="flex flex-col sm:flex-row justify-between lg:justify-start gap-2 lg:gap-6 items-start sm:items-center">
                    <h2 className="font-semibold text-base sm:text-lg lg:text-2xl leading-tight tracking-tight text-white">{title}</h2>
                    {status && (
                        <h2 className="bg-white px-2 py-0.5 text-xs sm:text-sm lg:text-md lg:px-3 rounded font-semibold flex items-center ">{status}</h2>)}
                </div>
                <p className="text-white mb-5 lg:mb-10 text-sm">{description}</p>
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
            <div className="order-2 text-sm h-full flex flex-col font-bold justify-between text-white gap-4 lg:gap-0">
                {/* ATAS: TOOLS + KOTAK */}
                <div className="flex flex-col gap-2">
                    <h3 className="">Tools :</h3>
                    <div className="flex gap-2">
                        {tools && tools.length > 0 ? (
                            tools.map((tool, index) => (
                                <div key={index} className="w-11.25 h-11.25 bg-white rounded-sm flex items-center justify-center overflow-hidden shadow-sm hover:scale-110 transition-transform cursor-pointer">
                                    <img src={tool} alt="tool icon" className="w-full h-full object-contain" />
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="w-11.25 h-11.25 bg-white/20 rounded-sm"></div>
                                <div className="w-11.25 h-11.25 bg-white/20 rounded-sm"></div>
                                <div className="w-11.25 h-11.25 bg-white/20 rounded-sm"></div>
                            </>
                        )}
                    </div>
                </div>
                {/* BAWAH: PROGRESS + BAR */}
                <div className="flex flex-col gap-1">
                    <h3>Progress</h3>
                    <div className="flex items-center gap-2">
                        {/* BAR */}
                        <div className="flex-1 flex items-center bg-white h-1.5 rounded overflow-hidden">
                            <div className="bg-green-400 h-2 w-full rounded" 
                            style={{width: `${progress}%`}}>
                            </div>
                        </div>
                        <p className="min-w-9.25 font-bold text-sm text-right">{progress}%</p>
                        {/* <Bar variant="B" progress={75} /> */} {/* BAR COMPONENT (OPSIONAL) */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoadmapCard;