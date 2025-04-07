import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Sample data - replace with real data from your API
const sampleData = {
  daily: [
    { name: 'Pass', value: 85 },
    { name: 'Fail', value: 15 },
  ],
  weekly: [
    { name: 'Pass', value: 88 },
    { name: 'Fail', value: 12 },
  ],
  monthly: [
    { name: 'Pass', value: 87 },
    { name: 'Fail', value: 13 },
  ],
};

const COLORS = ['#22c55e', '#ef4444'];

interface QualityTestChartProps {
  period: 'daily' | 'weekly' | 'monthly';
  shipmentId: string;
}

const QualityTestChart = ({ period, shipmentId }: QualityTestChartProps) => {
  const data = sampleData[period];

  return (
    <div className="w-full h-[300px]">
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-green-600">
          {data[0].value}%
        </div>
        <div className="text-sm text-gray-500">Pass Rate</div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value}%`}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QualityTestChart; 