import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data - replace with real data from your API
const sampleData = [
  { date: '2024-03-28', loaded: 1000, received: 980 },
  { date: '2024-03-29', loaded: 1200, received: 1150 },
  { date: '2024-03-30', loaded: 800, received: 785 },
  { date: '2024-03-31', loaded: 1500, received: 1460 },
  { date: '2024-04-01', loaded: 1100, received: 1080 },
  { date: '2024-04-02', loaded: 900, received: 880 },
  { date: '2024-04-03', loaded: 1300, received: 1270 },
];

interface QuantityComparisonChartProps {
  phase: string;
  shipmentId: string;
}

const QuantityComparisonChart = ({ phase, shipmentId }: QuantityComparisonChartProps) => {
  // In a real application, you would fetch data based on phase and shipmentId
  // For now, we'll use sample data

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            label={{ value: 'Quantity (kg)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value, name) => [
              `${value} kg`,
              name.charAt(0).toUpperCase() + name.slice(1)
            ]}
          />
          <Legend />
          <Bar dataKey="loaded" fill="#2563eb" name="Loaded" />
          <Bar dataKey="received" fill="#16a34a" name="Received" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuantityComparisonChart; 