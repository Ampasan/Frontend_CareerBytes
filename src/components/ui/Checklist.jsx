import { Check } from 'lucide-react';

function Checklist({ bgColor, isCheck, text }) {
    return(
        <>
        <div className="p-1 px-3 rounded flex gap-3 items-center text-sm"
        style={{ backgroundColor: bgColor }}>
            <div className="rounded-full w-4.5 h-4.5 border flex items-center justify-center">
                {isCheck && <Check size={15} />}
            </div>
            <p>{text}</p>
        </div>
        </>
    )
}

export default Checklist;