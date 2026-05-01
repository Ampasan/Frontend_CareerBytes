function Button({text, variant = "primary", className = ""}) {
    // OPSI VARIANT BUTTON
    const base = "p-4 lg:p-3 text-sm lg:text-md font-semibold rounded-lg cursor-pointer transition";
    const variants = {
        primary: "bg-[var(--color-primary)] text-white lg:px-10 hover:bg-[var(--color-primary)]/80",
        secondary: "bg-[var(--color-secondary)] text-[var(--color-third)] lg:px-5 hover:bg-[var(--color-secondary)]/80",
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