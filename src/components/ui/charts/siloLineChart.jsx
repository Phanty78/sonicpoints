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

export function SiloHistoryChart({ history }) {
  // Formatage des données pour le graphique
  const chartData = history.map((item) => ({
    date: new Date(item.date).toLocaleDateString(),
    siloPoints: item.siloPoints,
    siloRank: item.siloRank,
  }));

  return (
    <div className="h-[400px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="siloPoints"
            stroke="#8884d8"
            name="Silo Points"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="siloRank"
            stroke="#ff7300"
            name="Silo Rank"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
