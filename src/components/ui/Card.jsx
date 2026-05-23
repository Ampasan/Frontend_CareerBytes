function Card({icon, title, description}) {
    return(
        <div className="bg-(--color-surface) rounded-lg shadow-[0_10px_15px_-3px_var(--color-shadow-card),0_4px_6px_-4px_var(--color-shadow-card)] p-6 w-full sm:w-80 lg:w-100 hover:scale-110 transition">
            <div className="mb-2">{icon}</div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-black mt-2 text-sm mb-10">{description}</p>
        </div>
    )
}

export default Card;
