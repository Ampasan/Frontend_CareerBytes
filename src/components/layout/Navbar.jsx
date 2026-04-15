import { Link } from "react-router-dom";

function Navbar() {
    return(
        <nav className="bg-gray-200 outline shadow-lg max-w-6xl mx-auto my-5 py-2 px-16
        flex items-center justify-between rounded-full sticky top-0 z-50">
            
            <h1 className="font-semibold">CareerBytes</h1>

            <ul className="flex gap-8">
                <li><Link to="#">Home</Link></li>
                <li><Link to="#">Roadmap</Link></li>
                <li><Link to="#">Mission</Link></li>
                <li><Link to="#">Trends</Link></li>
            </ul>

            <div className="flex items-center gap-4 font-semibold">
                <Link to="#">Login</Link>
                <Link to="#" className="flex items-center bg-black text-white px-4 py-1 rounded-full">Sign Up</Link>
            </div>
        </nav>
    )
}

export default Navbar;