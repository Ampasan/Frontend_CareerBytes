function AssesmentStart ({ onStart, disabled = false, message = "" }) {
    return (
        <section className="my-10 mt-18 max-w-full mx-auto">
            <div className="max-w-6xl mx-auto px-5">
                <div className=" flex flex-col p-10 lg:p-15 py-10 lg:py-20 gap-2 rounded-xl border border-(--color-primary)">
                    <h1 className="text-4xl lg:text-6xl font-bold text-(--color-primary) ">Understand Your Skill Level</h1>
                    <p className="max-w-150 text-sm lg:text-lg text-(--color-primary)">Answer a few quick questions to understand your current skill level and identify what you need to improve.</p>
                    {message && (
                        <div className="mt-4 rounded-lg border border-(--color-error-border) bg-(--color-error-bg) px-4 py-3 text-sm font-semibold text-(--color-error)">
                            {message}
                        </div>
                    )}
                    {/* Button */}
                    <div className="text-sm mt-8 lg:mt-12">
                        <button 
                        className="bg-(--color-primary) hover:bg-(--color-primary)/80 disabled:opacity-60 disabled:cursor-not-allowed text-white p-2 px-10 rounded-md cursor-pointer"
                        onClick={onStart}
                        disabled={disabled}
                        >
                            {disabled ? "Loading..." : "Start"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AssesmentStart;
