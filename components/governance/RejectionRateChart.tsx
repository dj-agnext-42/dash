import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - replace with real data from your API
const sampleData = {
  daily: [
    { date: '2024-04-01', rejectionRate: 2.5 },
    { date: '2024-04-02', rejectionRate: 3.1 },
    { date: '2024-04-03', rejectionRate: 2.8 },
    { date: '2024-04-04', rejectionRate: 2.2 },
    { date: '2024-04-05', rejectionRate: 2.9 },
  ],
  weekly: [
    { date: '2024-W13', rejectionRate: 2.7 },
    { date: '2024-W14', rejectionRate: 2.9 },
    { date: '2024-W15', rejectionRate: 2.5 },
    { date: '2024-W16', rejectionRate: 2.8 },
  ],
  monthly: [
    { date: '2024-01', rejectionRate: 2.8 },
    { date: '2024-02', rejectionRate: 2.6 },
    { date: '2024-03', rejectionRate: 2.9 },
    { date: '2024-04', rejectionRate: 2.7 },
  ],
};

interface RejectionRateChartProps {
  period: 'daily' | 'weekly' | 'monthly';
  shipmentId: string;
}

const RejectionRateChart = ({ period, shipmentId }: RejectionRateChartProps) => {
  const data = sampleData[period];

  const formatDate = (date: string) => {
    switch (period) {
      case 'daily':
        return new Date(date).toLocaleDateString();
      case 'weekly':
        return `Week ${date.split('W')[1]}`;
      case 'monthly':
        return new Date(date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
      default:
        return date;
    }
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
          />
          <YAxis
            label={{ value: 'Rejection Rate (%)', angle: -90, position: 'insideLeft' }}
            domain={[0, 5]}
          />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(value) => [`${value}%`, 'Rejection Rate']}
          />
          <Line
            type="monotone"
            dataKey="rejectionRate"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RejectionRateChart; 