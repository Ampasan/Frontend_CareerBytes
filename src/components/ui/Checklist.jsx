import { Check } from 'lucide-react';

function Checklist({ isCheck, text }) {
    return(
        <>
        <div className="bg-white p-1 px-3 rounded flex gap-3 items-center text-sm">
            <div className="rounded-full w-4.5 h-4.5 border flex items-center justify-center">
                {isCheck && <Check size={15} />}
            </div>
            <p>{text}</p>
        </div>
        </>
    )
}

export default Checklist;