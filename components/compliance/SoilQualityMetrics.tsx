import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data - replace with real data from your API
const sampleData = {
  phTrends: [
    { date: '2024-03-01', ph: 6.8 },
    { date: '2024-03-08', ph: 6.9 },
    { date: '2024-03-15', ph: 7.1 },
    { date: '2024-03-22', ph: 6.7 },
    { date: '2024-03-29', ph: 6.8 },
  ],
  nutrients: [
    {
      name: 'Nitrogen',
      value: 85,
      optimal: 80,
      unit: 'mg/kg',
    },
    {
      name: 'Phosphorus',
      value: 45,
      optimal: 40,
      unit: 'mg/kg',
    },
    {
      name: 'Potassium',
      value: 180,
      optimal: 200,
      unit: 'mg/kg',
    },
    {
      name: 'Calcium',
      value: 1200,
      optimal: 1000,
      unit: 'mg/kg',
    },
    {
      name: 'Magnesium',
      value: 150,
      optimal: 150,
      unit: 'mg/kg',
    },
  ],
};

interface SoilQualityMetricsProps {
  farmId: string;
  batchId: string;
}

const SoilQualityMetrics = ({ farmId, batchId }: SoilQualityMetricsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Soil pH Trends</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sampleData.phTrends}
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
                domain={[6, 8]}
                label={{ value: 'pH Level', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="ph"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Nutrient Levels</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sampleData.nutrients}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Level (mg/kg)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                formatter={(value, name) => [`${value} mg/kg`, name === 'optimal' ? 'Optimal Level' : 'Current Level']}
              />
              <Legend />
              <Bar dataKey="value" fill="#2563eb" name="Current Level" />
              <Bar dataKey="optimal" fill="#22c55e" name="Optimal Level" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleData.nutrients.map((nutrient) => (
          <Card key={nutrient.name} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{nutrient.name}</h3>
                <p className="text-sm text-gray-500">Current: {nutrient.value} {nutrient.unit}</p>
              </div>
              <div className={`text-sm font-medium ${
                nutrient.value >= nutrient.optimal ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {((nutrient.value / nutrient.optimal) * 100).toFixed(1)}% of optimal
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SoilQualityMetrics; 