import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

// Sample data - replace with real data from your API
const sampleData = {
  daily: [
    { date: '2024-04-01', avgWeight: 13.2, minWeight: 12.8, maxWeight: 13.5 },
    { date: '2024-04-02', avgWeight: 13.1, minWeight: 12.9, maxWeight: 13.4 },
    { date: '2024-04-03', avgWeight: 13.3, minWeight: 13.0, maxWeight: 13.6 },
    { date: '2024-04-04', avgWeight: 13.0, minWeight: 12.7, maxWeight: 13.3 },
    { date: '2024-04-05', avgWeight: 13.2, minWeight: 12.9, maxWeight: 13.5 },
  ],
  weekly: [
    { date: '2024-W13', avgWeight: 13.1, minWeight: 12.8, maxWeight: 13.4 },
    { date: '2024-W14', avgWeight: 13.2, minWeight: 12.9, maxWeight: 13.5 },
    { date: '2024-W15', avgWeight: 13.0, minWeight: 12.7, maxWeight: 13.3 },
    { date: '2024-W16', avgWeight: 13.3, minWeight: 13.0, maxWeight: 13.6 },
  ],
  monthly: [
    { date: '2024-01', avgWeight: 13.2, minWeight: 12.9, maxWeight: 13.5 },
    { date: '2024-02', avgWeight: 13.1, minWeight: 12.8, maxWeight: 13.4 },
    { date: '2024-03', avgWeight: 13.3, minWeight: 13.0, maxWeight: 13.6 },
    { date: '2024-04', avgWeight: 13.2, minWeight: 12.9, maxWeight: 13.5 },
  ],
};

interface WeightConsistencyProps {
  period: 'daily' | 'weekly' | 'monthly';
  batchId: string;
}

const WeightConsistency = ({ period, batchId }: WeightConsistencyProps) => {
  const data = sampleData[period];
  const targetWeight = 13.0;
  const tolerance = 0.5;

  const formatDate = (date: string) => {
    switch (period) {
      case 'daily':
        return new Date(date).toLocaleDateString();
      case 'weekly':
        return `Week ${date.split('W')[1]}`;
      case 'monthly':
        return new Date(date + '-01').toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
      default:
        return date;
    }
  };

  const getVariationStatus = (avg: number, min: number, max: number) => {
    const variation = max - min;
    if (variation <= 0.3) return 'Excellent';
    if (variation <= 0.5) return 'Good';
    return 'Needs Improvement';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return 'text-green-600';
      case 'Good':
        return 'text-blue-600';
      case 'Needs Improvement':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
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
              domain={[12.5, 14]}
              label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              labelFormatter={formatDate}
              formatter={(value) => [`${value} kg`, '']}
            />
            <Line
              type="monotone"
              dataKey="avgWeight"
              stroke="#2563eb"
              strokeWidth={2}
              name="Average Weight"
            />
            <Line
              type="monotone"
              dataKey="minWeight"
              stroke="#9ca3af"
              strokeDasharray="3 3"
              name="Min Weight"
            />
            <Line
              type="monotone"
              dataKey="maxWeight"
              stroke="#9ca3af"
              strokeDasharray="3 3"
              name="Max Weight"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Weight Variation Summary */}
      <div className="grid grid-cols-1 gap-4">
        {data.map((entry) => {
          const status = getVariationStatus(entry.avgWeight, entry.minWeight, entry.maxWeight);
          return (
            <Card key={entry.date} className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">{formatDate(entry.date)}</div>
                  <div className="text-sm text-gray-500">
                    Range: {entry.minWeight} - {entry.maxWeight} kg
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Avg: {entry.avgWeight} kg</div>
                  <div className={`text-sm font-medium ${getStatusColor(status)}`}>
                    {status}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WeightConsistency; 