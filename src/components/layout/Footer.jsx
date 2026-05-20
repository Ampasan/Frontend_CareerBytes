import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

function Footer() {
    return(
        <footer className="bg-(--color-primary) py-10 text-(--color-white) ">
            <div className="flex justify-center flex-col lg:flex-row lg:my-1 max-w-6xl mx-auto px-6">
                {/* KIRI: WEB TITLE + COPYRIGHT */}
                <div className="w-full flex items-start justify-start">
                    <h1 className="font-bold text-xl">CareerBytes</h1>
                </div>
                {/* KANAN: FEATURES + CONTACT */}
                <div className="w-full py-5 lg:py-0 flex flex-col lg:flex-row justify-start lg:justify-end items-start gap-5 lg:gap-10">
                    {/* FEATURES */}
                    <div className="lg:pr-10 flex flex-col">
                        <h2 className="font-bold mb-1 ">FEATURES</h2>
                        <div className="flex flex-col text-sm underline underline-offset-2 gap-2">
                            <Link to="/career-roadmap" className="hover:text-(--color-footer-link-hover) hover:decoration-(--color-footer-decoration-hover)">Career Roadmap</Link>
                            <Link to="/assessment" className="hover:text-(--color-footer-link-hover) hover:decoration-(--color-footer-decoration-hover)">SKill Assessment</Link>
                            <Link to="/daily-mission" className="hover:text-(--color-footer-link-hover) hover:decoration-(--color-footer-decoration-hover)">Daily Mission</Link>
                            <a href="#" className="hover:text-(--color-footer-link-hover) hover:decoration-(--color-footer-decoration-hover)">Trending Skills</a>
                        </div>
                    </div>
                    {/* CONTACT */}
                    <div>
                       <h2 className="font-bold mb-1">CONTACT</h2>
                       <div className="flex items-center gap-1 text-sm">
                            <Mail size={20} className="hover:text-(--color-footer-link-hover) cursor-pointer"/>
                            <FaInstagram size={20}  className="hover:text-(--color-footer-link-hover) cursor-pointer"/>
                            <FaFacebook size={20}  className="hover:text-(--color-footer-link-hover) cursor-pointer"/>
                            <FaTiktok size={20}  className="hover:text-(--color-footer-link-hover) cursor-pointer"/>
                            <FaYoutube size={20}  className="hover:text-(--color-footer-link-hover) cursor-pointer"/>
                       </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center pb-3 lg:pb-0">
                <h5 className="text-sm">&copy; 2026 CareerBytes. All rights reserved</h5>
            </div>
        </footer>
    )
}

export default Footer;
