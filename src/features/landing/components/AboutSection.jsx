function AboutSection() {
    return(
        <>
        <section className="bg-[var(--color-image)] mt-20 p-8 flex flex-col">
            <div className="grid grid-cols-[40%_60%] items-center">
                <h2 className="flex flex-col p-15 justify-center text-6xl font-semibold tracking-tight leading-14">Why <br /><span className="text-black/40">CareerBytes?</span></h2>
                <p className="text-black/30 ml-15 max-w-xl text-justify text-xl [word-spacing:3px]">
                Figuring out your career path can be overwhelming.
                CareerBytes helps you understand industry skills and grow
                with clarity.
                </p>
            </div>
            <div>
                CARD
            </div>
        </section>
        </>
    )
}

export default AboutSection;