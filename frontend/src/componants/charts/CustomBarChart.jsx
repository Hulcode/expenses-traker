import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Alternates between purple and gray for each bar
const getBarColor = (index) => {
  return index % 2 === 0 ? "#875cf5" : "#cfbefb";
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {payload[0].payload.month}
        </p>
        <p className="text-ss text-gray-600">
          Amount:{" "}
          <span className="text-sm font-medium text-gray-800">
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data }) => {
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
            {data?.map((_, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
