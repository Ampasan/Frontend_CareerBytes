import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import AssesmentStatistic from "../features/skillAssesment/components/AssesmentStatistic";
import AssesmentStart from "../features/skillAssesment/components/AssesmentStart";
import { useState } from "react";
import QuizAssesment from "../features/skillAssesment/components/QuizAssesment";

function AssesmentPage() {
    const [isStarted, setIsStarted] = useState(false);

    return(
        <>
        <Navbar />
        {
            !isStarted ? 
            ( 
            <> 
            <AssesmentStart onStart={() => setIsStarted(true)} />
            <AssesmentStatistic />
            </> 
            ) : 
            ( <QuizAssesment onExit={() => setIsStarted(false)} />
            )
        }
        <Footer />
        </>
    )
}

export default AssesmentPage;