import { Lightbulb } from "lucide-react";

function TrendsKeyInsight ({ insights = [] }) {
    return (
        <div className="border border-(--color-primary) my-7 px-8 pt-7 rounded-xl text-(--color-primary)">
            <div className="flex items-center gap-2">
                <Lightbulb size={25}/>
                <h1 className="text-2xl font-semibold text-(--color-heading-dark)">Key Insight</h1>
            </div>
            
            {insights.map((insight, index) => (
                <div 
                key={index}
                className={`pt-5 pb-7 ${index !== insights.length-1 ? "border-b" : "" }`}>
                    <h1 className="text-lg font-semibold mb-3">{insight.title}</h1>
                    <p className="max-w-187.5 text-sm">{insight.description}</p>
                </div>  
            ))}
        </div>
    );
}

export default TrendsKeyInsight;
