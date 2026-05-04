function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center px-5 py-10 
            bg-white overflow-y-auto">

            {/* TOP RIGHT SEMI CIRCLE */}
            <div className="absolute top-0 right-0 w-75 h-75 md:w-125 md:h-125 
                bg-[radial-gradient(circle_at_top_right,var(--color-primary)_0%,rgba(255,255,255,0)_60%)]">
            </div>

            {/* BOTTOM LEFT SEMI CIRCLE */}
            <div className="absolute bottom-0 left-0 w-75 h-75 md:w-125 md:h-125 
                bg-[radial-gradient(circle_at_bottom_left,var(--color-primary)_0%,rgba(255,255,255,0)_60%)]">
            </div>

            {/* CONTENT */}
            <div className="w-full max-w-md relative z-10">
                {children}
            </div>

        </div>
    );
}

export default AuthLayout;