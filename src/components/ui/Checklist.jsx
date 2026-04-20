import { Check } from 'lucide-react';

function Checklist({ bgColor, isCheck, text, variant = "normal" }) {

    const padding = variant === "with-status"? "p-3" : "p-1";

    return(
        <>
        <div className={`${padding} px-3 rounded-xl flex gap-3 items-center text-sm`}
        style={{ backgroundColor: bgColor }}>
            <div className="rounded-full w-4.5 h-4.5 border flex items-center justify-center">
                {isCheck && <Check size={15} />}
            </div>

            <div className="flex justify-between items-center w-full">
                <p>{text}</p>
                {variant === "with-status" && (
                    isCheck? <p className="text-xs font-semibold text-black/30">DONE</p> :
                             <p className="text-xs font-semibold">IN PROGRESS</p>
                )}
            </div>

            
        </div>
        </>
    )
}

export default Checklist;