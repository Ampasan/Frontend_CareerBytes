import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/ui/SearchBar";
import TrendsMain from "../features/Trends/components/TrendsMain";

function TrendsPage () {
    return (
        <>
        <Navbar />
            <TrendsMain />
        <Footer />
        </>
    )
}

export default TrendsPage;