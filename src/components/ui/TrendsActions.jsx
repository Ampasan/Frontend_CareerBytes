import { ArrowRight, Target } from "lucide-react";
import { Link } from "react-router-dom"; 


function TrendsAction ({ actions = [] }) {
    return (
        <div className="border border-(--color-primary) my-7 p-8 rounded-xl text-(--color-primary)">
            <div className="flex items-center gap-2">
                <Target size={30}/>
                <h1 className="text-2xl font-semibold">Recommended Actions</h1>
            </div>

                {
                actions.map((action, index) => (
                    <div
                    key={index}
                    className="border border-(--color-primary) rounded-xl p-5 mt-5"
                    >
                    <h1 className="text-lg font-semibold mb-2">
                        {action.title}
                    </h1>
                    <p className="text-sm max-w-[750px]">
                        {action.description}
                    </p>
                    <Link
                        to={action.path}
                        className="mt-5 text-sm font-medium flex items-center gap-2 hover:underline cursor-pointer
                                   group
                        ">
                        {action.linkText}
                        <ArrowRight 
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"/>
                    </Link>
                </div>

            ))
            }
        </div>
    )
}

export default TrendsAction;