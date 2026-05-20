function Button({text, variant = "primary", className = "", onClick}) {
    // OPSI VARIANT BUTTON
    const base = "p-4 lg:p-3 text-sm lg:text-md font-semibold rounded-lg cursor-pointer transition";
    const variants = {
        primary: "bg-(--color-primary) text-(--color-white) lg:px-10 hover:bg-(--color-primary)/80",
        secondary: "bg-(--color-secondary) text-(--color-third) lg:px-5 hover:bg-(--color-secondary)/80",
    };
    
    return(
        <>
            <button 
              className={`${base} ${variants[variant]} ${className}`}
              onClick={onClick}
            >
                {text}
            </button>
        </>
    )
}

export default Button
