function Button({text, variant = "primary", className = ""}) {
    const base = "p-3 px-13 font-semibold rounded-lg cursor-pointer transition";
    const variants = {
        primary: "bg-black text-white hover:bg-black/40",
        secondary: "bg-black/10 text-black hover:bg-black/20",
    };

    return(
        <>
            <button className={`${base} ${variants[variant]} ${className}`}>
                {text}
            </button>
        </>
    )
}

export default Button