import BarChart from "../../../components/ui/BarChart"

function TrendsSection() {
    // DATA UNTUK SETTING DIAGRAM BATANG
    const chartData = [
        {percentage: 90, text: "Data Analyst"},
        {percentage: 82, text: "UI/UX Designer"},
        {percentage: 70, text: "Web Developer"},
        {percentage: 60, text: "Product Manager"},
        {percentage: 45, text: "Business Analyst"}
    ]

    return(
    <>
    <section id="trends" className="scroll-mt-35 my-15 mb-25">
        <div className=" max-w-6xl mx-auto px-8 grid grid-cols-[35%_65%] justify-center">
            {/* BAGIAN KIRI */}
            <div className="max-w-sm flex flex-col gap-5">
                <h1 className="text-5xl font-semibold tracking-tight">Stay Ahead with In-Demand Skills</h1>
                <p className="text-black/30 text-lg [word-spacing:3px] ">
                Stay updated with the latest skills in demand across industries. Discover what to learn next and stay competitive in your career journey.
                </p>
            </div>
            {/* DIAGRAM BATANG */}
            <BarChart title="Popularity Score (5)" year="2024" data={chartData}/>
        </div>
    </section>
    </>
        
    )
}

export default TrendsSection