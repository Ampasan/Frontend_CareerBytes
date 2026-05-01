function Button({text, variant = "primary", className = ""}) {
    // OPSI VARIANT BUTTON
    const base = "p-4 lg:p-3 text-sm lg:text-md lg:px-13 font-semibold rounded-lg cursor-pointer transition";
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