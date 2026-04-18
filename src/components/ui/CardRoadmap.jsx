function CardRoadmap({title, status, description, check, opacity}) {
    return(
        <div className={`bg-[var(--color-cardRM)] grid grid-cols-[80%_20%] justify-center items-center rounded-lg p-8 px-15 py-10 mb-15 shadow-lg shadow-black/20 ${opacity}`}>
            {/* KIRI */}
            <div className="flex flex-col gap-3 mr-10">
                <div className="flex gap-6">
                    <h2 className="font-semibold text-2xl leading-tight tracking-tight">{title}</h2>
                    <h2 className="bg-white px-3 rounded font-semibold flex items-center">{status}</h2>
                </div>
                <p className="text-black/60 mb-10 text-sm">{description}</p>
                <div className="bg-white p-1 px-3 rounded flex gap-3 items-center text-sm">
                    <div className="rounded-full border">
                        {check}
                    </div>
                    <p>User research</p>
                </div>
                <div className="bg-white p-1 px-3 rounded flex gap-3 items-center text-sm">
                    <div className="rounded-full border">
                        {check}
                    </div>
                    <p>Wireframing</p>
                </div>
            </div>
            {/* KANAN */}
            <div className=" h-full flex flex-col font-bold justify-between text-black/40">
                <div className="flex flex-col gap-2">
                    <h3 className="">Tools :</h3>
                    <div className="flex justify-between">
                        <div className="w-[50px] h-[40px] bg-white/20"></div>
                        <div className="w-[50px] h-[40px] bg-white/20"></div>
                        <div className="w-[50px] h-[40px] bg-white/20"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h3>Progress</h3>
                    <div className="flex justify-between items-center gap-2">
                        <div className="bg-black/30 h-2 w-[100%] rounded"></div>
                        <p className="font-bold text-sm">100%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardRoadmap;