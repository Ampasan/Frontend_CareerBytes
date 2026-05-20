import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import AssessmentStatistic from "../features/skillAssessment/components/AssessmentStatistic";
import AssessmentStart from "../features/skillAssessment/components/AssessmentStart";
import QuizAssessment from "../features/skillAssessment/components/QuizAssessment";
import ProcessingAssessment from "../features/skillAssessment/components/ProcessingAssessment";

import { useEffect, useState } from "react";

function AssessmentPage() {

    // MENENTUKAN HALAMAN YANG SEDANG AKTIF
    const [currentPage, setCurrentPage] = useState("start");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [currentPage]);

    return (
        <>
            <Navbar />

            {/* START PAGE */}
            {currentPage === "start" && (
                <>
                    <AssessmentStart
                        onStart={() => setCurrentPage("quiz")}
                    />

                    <AssessmentStatistic />
                </>
            )}

            {/* QUIZ PAGE */}
            {currentPage === "quiz" && (
                <QuizAssessment
                    onExit={() => setCurrentPage("start")}
                    onFinish={() => setCurrentPage("processing")}
                />
            )}

            {/* PROCESSING PAGE */}
            {currentPage === "processing" && (
                <ProcessingAssessment
                    onComplete={() => setCurrentPage("result")}
                />
            )}

            {/* RESULT PAGE */}
            {currentPage === "result" && (
                <>
                <AssessmentStart
                        onStart={() => setCurrentPage("quiz")}
                    />
                <AssessmentStatistic />
                </>
            )}

            <Footer />
        </>
    );
}

export default AssessmentPage;
