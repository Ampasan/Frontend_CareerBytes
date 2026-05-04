import Card from "../../../components/ui/Card";
import { Eye, Route, ChartArea, ChartBar } from "lucide-react";

function AboutSection() {
    return(
        <>
        <section className="bg-(--color-primary) mt-20 px-6 py-10 lg:p-8 lg:pb-40 flex flex-col">
            <div className="max-w-md lg:max-w-6xl mx-auto">
                {/* TEXT BAGIAN ATAS */}
                <div className="text-white flex justify-center lg:justify-between items-center flex-wrap md:flex-nowrap">
                    <h2 className="flex lg:flex-col pb-6 lg:p-10 lg:py-15 justify-center text-3xl sm:text-4xl lg:text-6xl font-bold lg:tracking-tight gap-4 lg:gap-0 lg:items-start lg:leading-14 text-center lg:text-left">Why <br className="hidden lg:block" />CareerBytes?</h2>

                    <p className="max-w-full lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-justify lg:mr-10 text-sm sm:text-base lg:text-xl lg:[word-spacing:3px] tracking-tight">
                    Figuring out your career path can be overwhelming.
                    CareerBytes helps you understand industry skills and grow
                    with clarity.
                    </p>
                </div>
                {/* CARD */}
                <div className="flex items-center justify-center lg:justify-between lg:mx-8 mt-10 gap-8 lg:gap-15 flex-wrap lg:flex-nowrap text-(--color-primary) ">
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
            </div>
        </section>
        </>
    )
}

export default AboutSection;