function Card({icon, title, description}) {
    return(
        <div className="bg-white rounded-lg shadow-lg shadow-black/20 p-6 w-full sm:w-80 lg:w-100 hover:scale-110 transition">
            <div className="mb-2">{icon}</div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-black mt-2 text-sm mb-10">{description}</p>
        </div>
    )
}

export default Card;

