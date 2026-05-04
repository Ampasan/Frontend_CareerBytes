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
    <section id="trends" className="scroll-mt-35 my-10 lg:my-15 lg:mb-25">
        <div className="max-w-md lg:max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[35%_65%] justify-center">
            {/* BAGIAN KIRI */}
            <div className="max-w-sm lg:max-w-sm mx-auto my-5 lg:my-0 flex flex-col gap-5 justify-center lg:justify-start">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-(--color-primary) text-center lg:text-left">Stay Ahead with In-Demand Skills</h1>
                <p className="text-(--color-primary) text-sm sm:text-base lg:text-lg [word-spacing:3px] text-center lg:text-left">
                Stay updated with the latest skills in demand across industries. Discover what to learn next and stay competitive in your career journey.
                </p>
            </div>
            {/* DIAGRAM BATANG */}
            <div className="p-4 lg:p-0">
            <BarChart title="Popularity Score (5)" year="2024" data={chartData}/>
            </div>
        </div>
    </section>
    </>
        
    )
}

export default TrendsSection