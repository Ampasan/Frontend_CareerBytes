import { Link } from "react-router-dom"
import Button from "../../components/ui/Button"

function StartAssesment () {
    return (
        <section className="my-10 mt-18 max-w-full mx-auto">
            <div className="max-w-6xl mx-auto px-5">
                <div className=" flex flex-col p-10 lg:p-15 py-10 lg:py-20 gap-2 rounded-xl border border-[var(--color-primary)]">
                    <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-primary)] ">Understand Your Skill Level</h1>
                    <p className="max-w-[600px] text-sm lg:text-lg text-[var(--color-primary)]">Answer a few quick questions to understand your current skill level and identify what you need to improve.</p>
                    {/* Button */}
                    <div className="text-sm mt-8 lg:mt-12">
                        <Link 
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white p-2 px-10 rounded-md"
                        >
                            Start
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StartAssesment;