import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data - replace with real data from your API
const sampleData = {
  daily: [
    { date: '2024-04-01', harvested: 5000, received: 4850, loaded: 4800 },
    { date: '2024-04-02', harvested: 5500, received: 5300, loaded: 5250 },
    { date: '2024-04-03', harvested: 4800, received: 4650, loaded: 4600 },
    { date: '2024-04-04', harvested: 5200, received: 5050, loaded: 5000 },
    { date: '2024-04-05', harvested: 5100, received: 4950, loaded: 4900 },
  ],
  weekly: [
    { date: '2024-W13', harvested: 25000, received: 24200, loaded: 24000 },
    { date: '2024-W14', harvested: 26500, received: 25700, loaded: 25500 },
    { date: '2024-W15', harvested: 24800, received: 24100, loaded: 23900 },
    { date: '2024-W16', harvested: 25500, received: 24800, loaded: 24600 },
  ],
  monthly: [
    { date: '2024-01', harvested: 98000, received: 95200, loaded: 94500 },
    { date: '2024-02', harvested: 92000, received: 89300, loaded: 88800 },
    { date: '2024-03', harvested: 95000, received: 92100, loaded: 91500 },
    { date: '2024-04', harvested: 97000, received: 94200, loaded: 93500 },
  ],
};

interface QuantityComparisonProps {
  period: 'daily' | 'weekly' | 'monthly';
  batchId: string;
}

const QuantityComparison = ({ period, batchId }: QuantityComparisonProps) => {
  const data = sampleData[period];

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

  const calculateLossPercentage = (harvested: number, received: number) => {
    return ((harvested - received) / harvested * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
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
              label={{ value: 'Quantity (kg)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              labelFormatter={formatDate}
              formatter={(value) => [`${value.toLocaleString()} kg`, '']}
            />
            <Legend />
            <Bar dataKey="harvested" name="Harvested" fill="#22c55e" />
            <Bar dataKey="received" name="Received" fill="#3b82f6" />
            <Bar dataKey="loaded" name="Loaded at Port" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Loss Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((entry) => (
          <div
            key={entry.date}
            className="p-3 bg-gray-50 rounded-lg"
          >
            <div className="text-sm font-medium text-gray-500">
              {formatDate(entry.date)}
            </div>
            <div className="mt-1 space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Harvest to Received Loss:</span>
                <span className="text-sm font-medium text-amber-600">
                  {calculateLossPercentage(entry.harvested, entry.received)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Received to Loaded Loss:</span>
                <span className="text-sm font-medium text-amber-600">
                  {calculateLossPercentage(entry.received, entry.loaded)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuantityComparison; 