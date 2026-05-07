import CircleProgress from "./CircleProgress";

function AnalysisResult ({percentage, role, level}) {
    return(
        <>
        <div className="w-full lg:w-xs mx-auto lg:mx-0 flex flex-col justify-center items-center px-20 lg:px-8 py-6 pb-12 gap-2 rounded-xl border border-[var(--color-primary)]">
            <h1 className="text-2xl lg:text-4xl font-bold text-[var(--color-primary)]">Analysis Result</h1>
            <p className="max-w-[600px] text-sm lg:text-lg text-[var(--color-primary)]">{role} Role</p>
            <CircleProgress percentage={percentage}/>
            
            <div className="bg-[var(--color-primary)]/20 text-sm lg:text-base p-1 px-5 font-semibold text-[var(--color-primary)] border rounded-full">
                <p>{level}</p>
            </div>
        </div>
        </>
    )
}

export default AnalysisResult;

//ROLE, PERCENTAGE, LEVEL