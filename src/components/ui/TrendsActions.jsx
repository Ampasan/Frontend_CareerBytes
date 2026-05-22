import { ArrowRight, Target } from "lucide-react";
import { Link } from "react-router-dom"; 


function TrendsAction ({ actions = [] }) {
    return (
        <div className="border border-(--color-primary) my-7 p-8 rounded-xl text-(--color-primary)">
            <div className="flex md:items-center gap-2">
                <Target 
                size={30}
                className="h-10 w-10 sm:h-auto md:w-auto"
                />
                <h1 className="text-2xl font-semibold text-(--color-heading-dark)">Recommended Actions</h1>
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
                    <p className="text-sm max-w-187.5">
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
