import Card from "../../../components/ui/Card";
import { Eye, Route, ChartArea, ChartBar } from "lucide-react";

function AboutSection() {
    return(
        <>
        <section className="bg-[var(--color-image)] mt-20 p-8 pb-40 flex flex-col">
            <div className="grid grid-cols-[40%_60%] items-center">
                <h2 className="flex flex-col p-15 justify-center text-6xl font-semibold tracking-tight leading-14">Why <br /><span className="text-black/40">CareerBytes?</span></h2>
                <p className="text-black/30 ml-15 max-w-xl text-justify text-xl [word-spacing:3px]">
                Figuring out your career path can be overwhelming.
                CareerBytes helps you understand industry skills and grow
                with clarity.
                </p>
            </div>
            <div className="flex justify-between mx-15 mt-10 gap-15">
                <Card
                icon={<Eye />}
                title="Understand Industry Skills"
                description="Focus on the skills that actually matter in today's job market."
                />
                <Card
                icon={<ChartArea />}
                title="Identify Your Skill Gaps"
                description="See what you already have and what you need to improve."
                />
                <Card
                icon={<Route />}
                title="Follow a Clear Career Path"
                description="Learn step by step with a structured roadmap tailored to your role."
                />
            </div>
        </section>
        </>
    )
}

export default AboutSection;