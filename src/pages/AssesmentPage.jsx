import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

import AssesmentStatistic from "../features/skillAssesment/components/AssesmentStatistic";
import AssesmentStart from "../features/skillAssesment/components/AssesmentStart";
import QuizAssesment from "../features/skillAssesment/components/QuizAssesment";
import ProcessingAssesment from "../features/skillAssesment/components/ProcessingAssesment";

import { useState } from "react";

function AssesmentPage() {

    // MENENTUKAN HALAMAN YANG SEDANG AKTIF
    const [currentPage, setCurrentPage] = useState("start");

    return (
        <>
            <Navbar />

            {/* START PAGE */}
            {currentPage === "start" && (
                <>
                    <AssesmentStart
                        onStart={() => setCurrentPage("quiz")}
                    />

                    <AssesmentStatistic />
                </>
            )}

            {/* QUIZ PAGE */}
            {currentPage === "quiz" && (
                <QuizAssesment
                    onExit={() => setCurrentPage("start")}
                    onFinish={() => setCurrentPage("processing")}
                />
            )}

            {/* PROCESSING PAGE */}
            {currentPage === "processing" && (
                <ProcessingAssesment
                    onComplete={() => setCurrentPage("result")}
                />
            )}

            {/* RESULT PAGE */}
            {currentPage === "result" && (
                <>
                <AssesmentStart
                        onStart={() => setCurrentPage("quiz")}
                    />
                <AssesmentStatistic />
                </>
            )}

            <Footer />
        </>
    );
}

export default AssesmentPage;