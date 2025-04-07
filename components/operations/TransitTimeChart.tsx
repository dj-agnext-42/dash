import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - replace with real data from your API
const sampleData = [
  { date: '2024-03-28', transitTime: 4.5 },
  { date: '2024-03-29', transitTime: 5.2 },
  { date: '2024-03-30', transitTime: 4.8 },
  { date: '2024-03-31', transitTime: 5.0 },
  { date: '2024-04-01', transitTime: 4.7 },
  { date: '2024-04-02', transitTime: 4.9 },
  { date: '2024-04-03', transitTime: 5.1 },
];

interface TransitTimeChartProps {
  phase: string;
  shipmentId: string;
}

const TransitTimeChart = ({ phase, shipmentId }: TransitTimeChartProps) => {
  // In a real application, you would fetch data based on phase and shipmentId
  // For now, we'll use sample data
  
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sampleData}
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
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis
            label={{ value: 'Transit Time (hours)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value) => [`${value} hours`, 'Transit Time']}
          />
          <Line
            type="monotone"
            dataKey="transitTime"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransitTimeChart; 