import { HamburgerIcon, LucideHamburger, Menu, MenuIcon, MenuSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return(
        <nav className={`bg-(--color-image) text-(--color-primary) sticky max-w-md md:max-w-6xl mx-4 md:mx-auto top-5 z-100 shadow-lg ${isMenuOpen ? "rounded-b-none rounded-t-3xl" : "rounded-full"}`}>

            <div className={`lg:my-2 py-3 px-8 lg:px-16 flex text-xl border border-(--color-primary) ${isMenuOpen ? "flex-col items-start gap-5 rounded-b-none rounded-t-3xl border-b-0" : "items-center justify-between rounded-full"}`}>
                
                <div className="flex justify-between w-full lg:w-auto">
                    <h1 className="font-semibold text-lg lg:text-xl">
                        <Link to="/">CareerBytes</Link>
                    </h1>
                    <div className="lg:hidden cursor-pointer rounded-sm hover:bg-(--color-primary)/20"
                    onClick={() => setMenuOpen(!isMenuOpen)}>
                        <Menu strokeWidth={3} size={30} />
                    </div>
                </div>

                {/* Nav menu */}
                <ul className="hidden lg:flex gap-8">
                    <li className="hover:text-(--color-primary)/40"><Link to="/">Home</Link></li>
                    <li className="hover:text-(--color-primary)/40"><Link to="/career-roadmap">Roadmap</Link></li>
                    <li className="hover:text-(--color-primary)/40"><a href="#mission">Assesment</a></li>
                    <li className="hover:text-(--color-primary)/40"><a href="#mission">Mission</a></li>
                    <li className="hover:text-(--color-primary)/40"><a href="#trends">Trends</a></li>
                </ul>

                {/* Login/Sign Up */}
                <div className="hidden lg:flex lg:items-center lg:gap-4 font-semibold ">
                    <Link to="#" className="hover:text-(--color-primary)/40 transition">Login</Link>
                    <Link to="#" className="flex items-center bg-(--color-primary) hover:bg-(--color-primary)/80 transition text-white px-4 py-2 rounded-full">Sign Up</Link>
                </div>

                {isMenuOpen && (
                <div className="absolute top-full left-0 p-5 px-8 bg-(--color-image) flex flex-col gap-4 w-full text-lg lg:hidden rounded-b-3xl shadow-lg border border-t-0">
                    <Link to="/" className="hover:bg-[var(--color-primary)/50">Home</Link>
                    <Link to="/career-roadmap" className="hover:bg-[var(--color-primary)/50">Roadmap</Link>
                    <Link to="/assesment" className="hover:bg-[var(--color-primary)/50">Assessment</Link>
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