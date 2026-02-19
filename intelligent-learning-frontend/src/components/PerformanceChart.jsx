import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function PerformanceChart({ data }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-8">
      <h2 className="text-xl mb-4 text-green-400">Difficulty Analysis</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="topicName" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="difficultyScore" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;
