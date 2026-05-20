import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function TrendsChart ({ data }) {
    return (
        <div className="border border-(--color-primary) my-7 p-8 rounded-xl text-(--color-primary)">
            <h1 className="text-2xl font-semibold">Top Trending Skills by Popularity</h1>
            <p className="text-[#14357F] text-sm py-3">Based on job postings, employer demand, and industry growth</p>
            
            {/* Chart */} 
            <div className="w-full h-[300px] px-6 py-2">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: 60,
                    }}
                    >
                    {/* Grid Putus-putus */}
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#19439F"
                    />
                    {/* Sumbu X */}
                    <XAxis
                        stroke="#19439F"
                        dataKey="skill"
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                        tick={{
                        fontSize: 12,
                        }}
                    />
                    {/* Sumbu Y */}
                    <YAxis 
                    stroke="#19439F"
                    tick={{
                        fontSize: 11,
                    }}
                    label={{
                        value: "Popularity Score",
                        angle: -90,
                        position: "insideLeft",
                        style: {
                        fill: "#19439F",
                        fontSize: 12,
                        },
                    }}
                    />
                    {/* Tooltip */}
                    <Tooltip />

                    {/* Bar */}
                    <Bar
                        dataKey="score"
                        fill="#19439F"
                        radius={[8, 8, 0, 0]}
                    />
                    </BarChart>
                </ResponsiveContainer>

            </div>
            
            <div className="flex justify-center items-center gap-3 py-6">
                <div className="bg-[#19439F] h-3.5 w-3.5 "></div>
                <p>Popularity Score</p>
            </div>
        </div>
    )
}

export default TrendsChart;