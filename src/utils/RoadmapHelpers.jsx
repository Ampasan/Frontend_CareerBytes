import { Check, Play, LockKeyhole } from 'lucide-react';

// HELPER ICON
export function getIcon(type) {
    if (type === "Completed") return <Check size={15}/>;
    if (type === "On Going") return <Play size={15}/>;
    if (type === false) return <LockKeyhole size={15}/>;
}
// HELPER OPACITY
export function getOpacity(type) {
    if (type === "Completed") return "opacity-100";
    if (type === "On Going") return "opacity-90";
    if (type === false) return "opacity-30";
    return "opacity-10";
}
