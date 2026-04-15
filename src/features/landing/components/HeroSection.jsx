function HeroSection() {
    return(
        <>
        <section className="max-w-5xl mx-auto mt-16 grid grid-cols-[55%_45%] gap-15 justify-center ">

            {/* LEFT */}
            <div className=" flex flex-col gap-10 ">
                <h1 className="text-7xl font-semibold tracking-tight">
                    Start Your <br /> <span className="text-[var(--color-text)]">Career </span>the Right Way
                </h1>
                <p className="text-xl"> CareerBytes helps you understand industry skills,<br />identify your gaps, and grow with a clear path forward.</p>

                {/* Button Component */}
                <div>
                    <button></button>
                </div>
            </div>

            {/* RIGHT */}
            <div className=" flex justify-center items-center">
                <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] aspect-square bg-[var(--color-image)] rounded-4xl" />
            </div>
        </section>
        </>
    )
}

export default HeroSection;