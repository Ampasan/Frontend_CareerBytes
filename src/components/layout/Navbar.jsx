import { Link } from "react-router-dom";

function Navbar() {
    return(
        <nav className="bg-[var(--color-image)]/50 backdrop-blur-md outline shadow-lg max-w-6xl mx-auto my-5 py-3 px-16
        flex items-center justify-between rounded-full sticky top-4 z-50 text-xl ">
            
            <h1 className="font-semibold">CareerBytes</h1>

            <ul className="flex gap-8">
                <li className="hover:text-black/40"><Link to="#">Home</Link></li>
                <li className="hover:text-black/40"><Link to="#">Roadmap</Link></li>
                <li className="hover:text-black/40"><Link to="#">Mission</Link></li>
                <li className="hover:text-black/40"><Link to="#">Trends</Link></li>
            </ul>

            <div className="flex items-center gap-4 font-semibold ">
                <Link to="#" className="hover:text-black/40 transition">Login</Link>
                <Link to="#" className="flex items-center bg-black hover:bg-black/20 transition text-white px-4 py-1 rounded-full">Sign Up</Link>
            </div>
        </nav>
    )
}

export default Navbar;