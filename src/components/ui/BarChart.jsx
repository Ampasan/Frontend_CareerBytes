function BarChart({ title, year, data }) {
    return(
        <div className="bg-[var(--color-primary)]/20 flex flex-col p-6 lg:p-0 lg:ml-20 lg:py-5 lg:px-10 rounded-xl shadow-md shadow-black/10 text-[var(--color-primary)]">
            {/* ATAS: TITLE + YEAR */}
            <div className="flex justify-between text-sm font-semibold mb-5 lg:p-0">
                    <h2>{title}</h2>
                    <h2 className="bg-[var(--color-secondary)] px-4 py-1 rounded">{year}</h2>
            </div>
            {/* BAWAH: BAR CHART CONTENT */}
            <div className="flex justify-center">
                {data.map((item, index) => (
                <div key={index} className="font-semibold flex flex-col items-center w-full">
                    {/* BAR CHART */}
                    <div className=" h-[300px] w-full flex items-end">
                        <div   className={`relative w-full rounded-t-md ${index % 2 === 0 ? "bg-[var(--color-primary)]" : "bg-[var(--color-primary)]/70"}`}
                            style={{ height: `${item.percentage}%` }}>
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs">
                                {item.percentage}%
                            </span>
                        </div>
                    </div>
                    {/* BAR TITLE + LINE */}
                    <span className="text-xs text-center flex justify-center items-center border-t-3 w-full">
                        <h3 className="my-1 mx-2">{item.text}</h3>
                    </span>
                </div>

                ))}


            </div>
        </div>
    )

}

export default BarChart;