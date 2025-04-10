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

export function SwapxHistoryChart({ history }) {
  // Formatage des données pour le graphique
  const chartData = history.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    swapxPoints: item.swapxPoints,
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
            dataKey="swapxPoints"
            stroke="#ffc658"
            name="SwapX Points"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
