import { Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

function Footer() {
    return(
        <footer className="bg-[var(--color-primary)] py-10 text-white ">
            <div className="flex justify-center flex-col lg:flex-row lg:my-1 max-w-6xl mx-auto">
                {/* KIRI: WEB TITLE + COPYRIGHT */}
                <div className="w-full flex items-center lg:items-start justify-center lg:justify-start">
                    <h1 className="font-bold text-xl">CareerBytes</h1>
                </div>
                {/* KANAN: FEATURES + CONTACT */}
                <div className="w-full py-5 lg:py-0 px-5 flex flex-col lg:flex-row justify-center lg:justify-end items-center lg:items-start gap-5 lg:gap-10">
                    {/* FEATURES */}
                    <div className="lg:pr-10 flex flex-col">
                        <h2 className="font-bold mb-1 ">FEATURES</h2>
                        <div className="flex flex-col text-sm underline underline-offset-2 gap-2">
                            <a href="#" className="hover:text-black/50 hover:decoration-gray-700">Career Roadmap</a>
                            <a href="#" className="hover:text-black/50 hover:decoration-gray-700">SKill Assesment</a>
                            <a href="#" className="hover:text-black/50 hover:decoration-gray-700">Daily Mission</a>
                            <a href="#" className="hover:text-black/50 hover:decoration-gray-700">Trending Skills</a>
                        </div>
                    </div>
                    {/* CONTACT */}
                    <div>
                       <h2 className="font-bold mb-1">CONTACT</h2>
                       <div className="flex items-center gap-1 text-sm">
                            <Mail size={20} className="hover:text-black/50 cursor-pointer"/>
                            <FaInstagram size={20}  className="hover:text-black/50 cursor-pointer"/>
                            <FaFacebook size={20}  className="hover:text-black/50 cursor-pointer"/>
                            <FaTiktok size={20}  className="hover:text-black/50 cursor-pointer"/>
                            <FaYoutube size={20}  className="hover:text-black/50 cursor-pointer"/>
                       </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start pb-3 lg:pb-0">
                <h5 className="text-sm lg:ml-15">&copy; CareerBytes. All rights reserved</h5>
            </div>
        </footer>
    )
}

export default Footer;