import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import heroImage from "../../../assets/heroimg.png";

function HeroSection() {
    return(
        <>
        <section id="home" className="scroll-mt-40 max-w-md lg:max-w-6xl mx-auto px-6 lg:px-15 mt-16 grid xl:grid-cols-[55%_45%] gap-5 md:gap-12 justify-center ">

            {/* LEFT */}
            <div className="order-2 lg:order-1 flex flex-col gap-5 lg:gap-12 ">
                {/* TEXT */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl text-center lg:text-start font-bold tracking-tight text-(--color-primary)">
                    Start Your <br /> <span className="text-(--color-secondary)">Career </span>the Right Way
                </h1>
                <p className="text-justify pb-4 lg:pb-0 lg:text-start text-sm sm:text-base lg:text-xl text-(--color-primary) max-w-105 mx-auto lg:mx-0">
                    CareerBytes helps you understand industry skills, identify your gaps, and grow with a clear path forward.
                </p>

                {/* BUTTON COMPONENT */}
                <div className="flex flex-col lg:flex-row gap-5 justify-center lg:justify-start">
                    <Link to="/register">
                        <Button text="Get Started" variant="primary"/>
                    </Link>
                    <Link to="/career-roadmap">
                        <Button text="Explore Roadmap" variant="secondary"/>
                    </Link>
                </div>
            </div>

            {/* RIGHT */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
                <div className="w-72 h-52 sm:w-87.5 sm:h-62.5 lg:w-112.5 lg:h-112.5 aspect-square rounded-4xl"> 
                <img 
                src={heroImage} 
                alt="Hero"
                className="w-full h-full object-contain scale-110 lg:scale-120" />
                </div>
            </div>
        </section>
        </>
    )
}

export default HeroSection;