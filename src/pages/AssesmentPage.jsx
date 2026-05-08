import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AssesmentStatistic from "../features/skillAssesment/components/AssesmentStatistic";
import AssesmentStart from "../features/skillAssesment/components/AssesmentStart";

function AssesmentPage() {
    return(
        <>
        <Navbar />
        <AssesmentStart />
        <AssesmentStatistic />
        <Footer />
        </>
    )
}

export default AssesmentPage;