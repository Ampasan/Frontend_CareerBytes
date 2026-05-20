import { HamburgerIcon, LucideHamburger, Menu, MenuIcon, MenuSquare, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return(
        <nav className={`bg-(--color-image) text-(--color-primary) sticky max-w-full md:max-w-6xl mx-4 md:mx-auto top-5 z-100 shadow-lg ${isMenuOpen ? "rounded-b-none rounded-t-3xl" : "rounded-full"}`}>

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
                    <li className="hover:text-(--color-primary)/40"><Link to="/assessment">Assessment</Link></li>
                    <li className="hover:text-(--color-primary)/40"><Link to="/daily-mission">Mission</Link></li>
                    <li className="hover:text-(--color-primary)/40"><a href="#trends">Trends</a></li>
                </ul>

                {/* Auth Sections */}
                <div className="hidden lg:flex lg:items-center lg:gap-4 font-semibold ">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="hover:text-(--color-primary)/40 transition">Login</Link>
                            <Link to="/register" className="flex items-center bg-(--color-primary) hover:bg-(--color-primary)/80 transition text-(--color-white) px-4 py-2 rounded-full">Sign Up</Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm lg:text-base">
                                <div className="bg-(--color-primary)/10 p-2 rounded-full">
                                    <User size={18} className="text-(--color-primary)" />
                                </div>
                                <span className="font-bold">{user?.name}</span>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center bg-(--color-primary) hover:bg-(--color-primary)/80 transition text-(--color-white) px-4 py-2 rounded-full font-semibold cursor-pointer"
                            >
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>

                {isMenuOpen && (
                    <div className="absolute top-full left-0 p-5 px-8 bg-(--color-image) flex flex-col gap-4 w-full text-lg lg:hidden rounded-b-3xl shadow-lg border border-t-0">
                        <Link to="/" className="hover:text-(--color-primary)/60 transition">Home</Link>
                        <Link to="/career-roadmap" className="hover:text-(--color-primary)/60 transition">Roadmap</Link>
                        <Link to="/assessment" className="hover:text-(--color-primary)/60 transition">Assessment</Link>
                        <Link to="/daily-mission" className="hover:text-(--color-primary)/60 transition">Mission</Link>
                        <a href="#trends" className="hover:text-(--color-primary)/60 transition">Trends</a>
                        
                        {/* Mobile Auth Links */}
                        <div className="flex flex-col gap-4 pt-4 border-t border-(--color-primary)/10">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="font-semibold hover:text-(--color-primary)/60 transition">Login</Link>
                                    <Link to="/register" className="bg-(--color-primary) text-(--color-white) px-6 py-3 rounded-full font-semibold text-center hover:bg-(--color-primary)/80 transition">
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 py-2">
                                        <div className="bg-(--color-primary)/10 p-2 rounded-full">
                                            <User size={18} className="text-(--color-primary)" />
                                        </div>
                                        <span className="font-bold">{user?.name}</span>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-(--color-primary) text-(--color-white) px-6 py-3 rounded-full font-semibold text-center hover:bg-(--color-primary)/80 transition flex items-center justify-center gap-2"
                                    >
                                        <span>Logout</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
                
            </div>
        </nav>
    )
}

export default Navbar;
