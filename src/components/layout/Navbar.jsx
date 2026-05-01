import { HamburgerIcon, LucideHamburger, Menu, MenuIcon, MenuSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return(
        <nav className={`bg-[var(--color-image)] text-[var(--color-primary)] sticky max-w-md md:max-w-6xl mx-auto top-5 z-100 shadow-lg ${isMenuOpen ? "rounded-b-none rounded-t-3xl" : "rounded-full"}`}>

            <div className={`lg:my-2 py-3 px-8 lg:px-16 flex text-xl border border-[var(--color-primary)] ${isMenuOpen ? "flex-col items-start gap-5 rounded-b-none rounded-t-3xl border-b-0" : "items-center justify-between rounded-full"}`}>
                
                <div className="flex justify-between w-full lg:w-auto">
                    <h1 className="font-semibold text-lg lg:text-xl">
                        <a href="/">CareerBytes</a>
                    </h1>
                    <div className="lg:hidden cursor-pointer rounded-sm hover:bg-[var(--color-primary)]/20"
                    onClick={() => setMenuOpen(!isMenuOpen)}>
                        <Menu strokeWidth={3} size={30} />
                    </div>
                </div>

                {/* Nav menu */}
                <ul className="hidden lg:flex gap-8">
                    <li className="hover:text-[var(--color-primary)]/40"><a href="#home">Home</a></li>
                    <li className="hover:text-[var(--color-primary)]/40"><a href="#roadmap">Roadmap</a></li>
                    <li className="hover:text-[var(--color-primary)]/40"><a href="#mission">Mission</a></li>
                    <li className="hover:text-[var(--color-primary)]/40"><a href="#trends">Trends</a></li>
                </ul>

                {/* Login/Sign Up */}
                <div className="hidden lg:flex lg:items-center lg:gap-4 font-semibold ">
                    <Link to="#" className="hover:text-[var(--color-primary)]/40 transition">Login</Link>
                    <Link to="#" className="flex items-center bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 transition text-white px-4 py-2 rounded-full">Sign Up</Link>
                </div>

                {isMenuOpen && (
                <div className="absolute top-full left-0 p-5 px-8 bg-[var(--color-image)] flex flex-col gap-4 w-full text-lg lg:hidden rounded-b-3xl shadow-lg border border-t-0">
                    <a href="#home" className="hover:bg-[var(--color-primary)/50">Home</a>
                    <a href="#roadmap" className="hover:bg-[var(--color-primary)/50">Roadmap</a>
                    <a href="#mission" className="hover:bg-[var(--color-primary)/50">Mission</a>
                    <a href="#trends" className="hover:bg-[var(--color-primary)/50">Trends</a>
                    <Link to="#" className="hover:bg-[var(--color-primary)/50">Login</Link>
                    <Link to="#" className="hover:bg-[var(--color-primary)/50">Sign Up</Link>

                </div>
    )}
                
            </div>
        </nav>
    )
}

export default Navbar;