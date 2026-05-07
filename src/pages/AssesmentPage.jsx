import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AnalysisSkill from "../features/skillAssesment/AnalysisSkill";
import StartAssesment from "../features/skillAssesment/StartAssesment";

function AssesmentPage() {
    return(
        <>
        <Navbar />
        <StartAssesment />
        <AnalysisSkill />
        <Footer />
        </>
    )
}

export default AssesmentPage;