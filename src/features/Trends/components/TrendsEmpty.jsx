import { ChartColumn } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { dummyPeriods } from "../../../constants/dummy/trendsDummy";

function TrendsEmpty () {
    const { year } = useParams();
    const minYear = Math.min(...dummyPeriods.map(Number));
    const maxYear = Math.max(...dummyPeriods.map(Number));

    return (
        <>
        <div className="border border-(--color-primary) my-7 px-8 pt-7 rounded-xl text-(--color-primary) 
                        flex flex-col justify-center items-center gap-7">
            <div className="bg-(--color-primary)/10 p-10 rounded-full">
                <ChartColumn size={120}
                />
            </div>
            <h1 className="text-3xl font-semibold">No Data Available for {year}</h1>
            <p className="text-center max-w-lg">
                We don't have trending skills data for this period yet. This could be because data collection is still in progress or the selected year is outside our current data range.
            </p>
            <div className="bg-(--color-primary)/10 border flex flex-col text-center gap-2 rounded-xl 
            p-5 py-7 text-sm w-full max-w-lg">
                <h2 className="text-[#14357F] font-semibold">Try this options:</h2>
                <ul className="list-disc list-inside text-start space-y-2 marker:text-[#14357F]">
                    <li>Select a different year from the dropdown above</li>
                    <li>Check back later as we continuously update our data</li>
                    <li>Explore other sections like Roadmap or Daily Mission</li>
                </ul>
            </div>
            <div className="flex gap-5 justify-center items-center py-4 pb-10 font-[500] tracking-wide">
                <Link
                to={`/trends/${Number(year) - 1}`} 
                className="bg-(--color-primary) text-white px-5 py-2 rounded-md border border-(--color-primary) hover:bg-white hover:text-(--color-primary) transition space-x-2">
                    View {year - 1} Data
                </Link>
                <Link 
                to="/trends"
                className="bg-white text-(--color-primary) px-5 py-2 rounded-md border border-(--color-primary) hover:bg-(--color-primary) hover:text-white transition">
                    Explore Other Section
                </Link>
            </div>
        </div>
        <p className="text-center text-sm text-(--color-primary)">Data is typically available for years {minYear}–{maxYear-1}. Future predictions coming soon.</p>
        </>
    )
}

export default TrendsEmpty;