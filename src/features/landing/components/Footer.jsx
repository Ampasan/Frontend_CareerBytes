import { Mail } from "lucide-react";

function Footer() {
    return(
        <footer className="bg-black/20 py-7">
            <div className="flex justify-center my-1 max-w-6xl mx-auto">
                <div className="w-full flex flex-col gap-30 items-start">
                    <h1 className="font-bold text-xl">CareerBytes</h1>
                    <h5 className="text-sm">&copy; CareerBytes. All rights reserved</h5>
                </div>

                <div className="w-full px-5 flex justify-end items-start gap-10">
                    <div className="pr-10 flex flex-col">
                        <h2 className="font-semibold mb-1">FEATURES</h2>
                        <div className="flex flex-col text-sm underline underline-offset-2 gap-2">
                            <a href="#" className="hover:text-black/50 hover:decoration-gray-700">Career Roadmap</a>
                            <a href="#" className="hover:text-black/50 hover:decoration-gray-700">SKill Assesment</a>
                            <a href="#" className="hover:text-black/50 hover:decoration-gray-700">Daily Mission</a>
                            <a href="#" className="hover:text-black/50 hover:decoration-gray-700">Trending Skills</a>
                        </div>
                    </div>
                    <div>
                       <h2 className="font-semibold mb-1">CONTACT</h2>
                       <div className="flex items-center gap-1 text-sm hover:text-black/50 cursor-pointer">
                            <Mail size={15}/>
                            <h3 className="mb-1">Email</h3>
                       </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;