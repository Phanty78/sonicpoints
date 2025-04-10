// src/components/ui/charts/SonicHistoryChart.js
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function SonicHistoryChart({ history }) {
  // Formatage des données pour le graphique
  const chartData = history.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    sonicPoints: item.sonicPoints,
    liquidityPoints: item.liquidityPoints,
    activePoints: item.activePoints,
  }));

  return (
    <div className="h-[400px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sonicPoints"
            stroke="#8884d8"
            name="Sonic Points"
          />
          <Line
            type="monotone"
            dataKey="liquidityPoints"
            stroke="#82ca9d"
            name="Liquidity Points"
          />
          <Line
            type="monotone"
            dataKey="activePoints"
            stroke="#ffc658"
            name="Active Points"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
