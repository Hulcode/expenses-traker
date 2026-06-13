import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";
const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={3}
          dataKey="amount"
          labelLine={false}
          label={false}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        {/* Center label */}
        {showTextAnchor && (
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="-0.4em" fontSize={13} fill="#6b7280">
              {label}
            </tspan>
            <tspan
              x="50%"
              dy="1.4em"
              fontSize={20}
              fontWeight={500}
              fill="#111827"
            >
              {totalAmount}
            </tspan>
          </text>
        )}
        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
