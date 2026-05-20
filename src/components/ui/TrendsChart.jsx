import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function TrendsChart ({ data }) {
    return (
        <div className="border border-(--color-primary) my-7 p-8 rounded-xl text-(--color-primary)">
            <h1 className="text-2xl font-semibold">Top Trending Skills by Popularity</h1>
            <p className="text-(--color-primary-dark) text-sm py-3">Based on job postings, employer demand, and industry growth</p>
            
            {/* Chart */} 
            <div className="w-full overflow-x-auto">
                <div className="min-w-162.5 h-70 sm:h-[350] px-2 py-2">
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
                        stroke="var(--color-trends-growth)"
                    />
                    {/* Sumbu X */}
                    <XAxis
                        stroke="var(--color-trends-growth)"
                        dataKey="skill"
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                        tickMargin={10}
                        tick={{
                        fontSize: 12,
                        }}
                    />
                    {/* Sumbu Y */}
                    <YAxis 
                    stroke="var(--color-trends-growth)"
                    tick={{
                        fontSize: 11,
                    }}
                    label={{
                        value: "Popularity Score",
                        angle: -90,
                        position: "insideLeft",
                        style: {
                        fill: "var(--color-trends-growth)",
                        fontSize: 12,
                        },
                    }}
                    />
                    {/* Tooltip */}
                    <Tooltip />

                    {/* Bar */}
                    <Bar
                        dataKey="score"
                        fill="var(--color-trends-growth)"
                        radius={[8, 8, 0, 0]}
                    />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </div>
            
            <div className="flex justify-center items-center gap-3 py-6">
                <div className="bg-(--color-trends-growth) h-3.5 w-3.5 "></div>
                <p className="text-sm sm:text-base">Popularity Score</p>
            </div>
        </div>
    )
}

export default TrendsChart;
