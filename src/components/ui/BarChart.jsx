function BarChart({ title, year, data }) {
    return(
        <div className="bg-(--color-primary)/20 flex flex-col p-4 sm:p-6 lg:p-0 lg:ml-20 lg:py-5 lg:px-10 rounded-xl shadow-[0_4px_6px_-1px_var(--color-shadow-subtle),0_2px_4px_-2px_var(--color-shadow-subtle)] text-(--color-primary) mx-auto w-full">
            {/* ATAS: TITLE + YEAR */}
            <div className="flex justify-between text-sm font-semibold mb-5 lg:p-0">
                    <h2>{title}</h2>
                    <h2 className="bg-(--color-secondary) px-4 py-1 rounded">{year}</h2>
            </div>
            {/* BAWAH: BAR CHART CONTENT */}
            <div className="flex justify-center">
                {data.map((item, index) => (
                <div key={index} className="font-semibold flex flex-col items-center w-full">
                    {/* BAR CHART */}
                    <div className=" h-75 w-full flex items-end">
                        <div   className={`relative w-full rounded-t-md ${index % 2 === 0 ? "bg-(--color-primary)" : "bg-(--color-primary)/70"}`}
                            style={{ height: `${item.percentage}%` }}>
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs">
                                {item.percentage}%
                            </span>
                        </div>
                    </div>
                    {/* BAR TITLE + LINE */}
                    <span className="text-[10px] sm:text-xs text-center flex justify-center items-center border-t-3 w-full">
                        <h3 className="my-1 mx-1 sm:mx-2">{item.text}</h3>
                    </span>
                </div>

                ))}


            </div>
        </div>
    )

}

export default BarChart;
