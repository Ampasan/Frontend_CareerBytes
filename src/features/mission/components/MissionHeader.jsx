function MissionHeader() {
    return (
        <section className="mt-16 lg:mt-24">
            <div className="max-w-7xl mx-auto px-5">
                
                {/* Content */}
                <div className="flex flex-col items-center text-center">
                    
                    {/* Heading */}
                    <h1 className="text-(--color-primary) text-3xl sm:text-4xl lg:text-7xl font-bold tracking-[-0.04em] leading-none">
                        Daily Mission
                    </h1>

                    {/* Description */}
                    <p className="mt-4 text-(--color-primary) text-base sm:text-lg lg:text-2xl max-w-4xl leading-relaxed">
                        Complete tasks to build your skills and advance your career
                    </p>

                    {/* Stats */}
                    <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-6">
                        
                        {/* Total Tasks */}
                        <div className="border-4 border-(--color-primary) rounded-xl w-26.5 h-18 lg:w-35.5 lg:h-22.5 px-4 flex flex-col justify-center items-start">
                            <h2 className="text-(--color-primary) text-2xl lg:text-3xl font-bold leading-none text-left">
                                8
                            </h2>

                            <p className="mt-1 text-(--color-primary) text-xs lg:text-sm font-medium text-left">
                                Total Tasks
                            </p>
                        </div>

                        {/* Completed */}
                        <div className="border-4 border-(--color-primary) rounded-xl w-26.5 h-18 lg:w-35.5 lg:h-22.5 px-4 flex flex-col justify-center items-start">
                            <h2 className="text-(--color-primary) text-2xl lg:text-3xl font-bold leading-none text-left">
                                2
                            </h2>

                            <p className="mt-1 text-(--color-primary) text-xs lg:text-sm font-medium text-left">
                                Completed
                            </p>
                        </div>

                        {/* Remaining */}
                        <div className="border-4 border-(--color-primary) rounded-xl w-26.5 h-18 lg:w-35.5 lg:h-22.5 px-4 flex flex-col justify-center items-start">
                            <h2 className="text-(--color-primary) text-2xl lg:text-3xl font-bold leading-none text-left">
                                6
                            </h2>

                            <p className="mt-1 text-(--color-primary) text-xs lg:text-sm font-medium text-left">
                                Remaining
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default MissionHeader;