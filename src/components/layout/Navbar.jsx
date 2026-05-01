import { HamburgerIcon, LucideHamburger, Menu, MenuIcon, MenuSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return(
        <nav className={`bg-[var(--color-image)] sticky max-w-md md:max-w-6xl mx-auto top-5 z-100 shadow-lg ${isMenuOpen ? "rounded-b-none rounded-t-3xl" : "rounded-full"}`}>

            <div className={`lg:my-2 py-3 px-8 lg:px-16 flex text-xl border ${isMenuOpen ? "flex-col items-start gap-5 rounded-b-none rounded-t-3xl border-b-0" : "items-center justify-between rounded-full"}`}>
                
                <div className="flex justify-between w-full lg:w-auto">
                    <h1 className="font-semibold text-lg lg:text-xl">
                        <a href="/">CareerBytes</a>
                    </h1>
                    <div className="lg:hidden cursor-pointer"
                    onClick={() => setMenuOpen(!isMenuOpen)}>
                        <Menu strokeWidth={3} size={30} />
                    </div>
                </div>

                {/* Nav menu */}
                <ul className="hidden lg:flex gap-8">
                    <li className="hover:text-black/40"><a href="#home">Home</a></li>
                    <li className="hover:text-black/40"><a href="#roadmap">Roadmap</a></li>
                    <li className="hover:text-black/40"><a href="#mission">Mission</a></li>
                    <li className="hover:text-black/40"><a href="#trends">Trends</a></li>
                </ul>

                {/* Login/Sign Up */}
                <div className="hidden lg:flex lg:items-center lg:gap-4 font-semibold ">
                    <Link to="#" className="hover:text-black/40 transition">Login</Link>
                    <Link to="#" className="flex items-center bg-black hover:bg-black/20 transition text-white px-4 py-2 rounded-full">Sign Up</Link>
                </div>

                {isMenuOpen && (
                <div className="absolute top-full left-0 p-5 px-8 bg-[var(--color-image)] flex flex-col gap-4 w-full text-lg lg:hidden rounded-b-3xl shadow-lg border border-t-0">
                    <a href="#home">Home</a>
                    <a href="#roadmap">Roadmap</a>
                    <a href="#mission">Mission</a>
                    <a href="#trends">Trends</a>
                    <Link to="#">Login</Link>
                    <Link to="#">Sign Up</Link>

                </div>
    )}
                
            </div>
        </nav>
    )
}

export default Navbar;