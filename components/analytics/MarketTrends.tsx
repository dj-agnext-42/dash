import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  priceHistory: [
    { date: '2023-10', price: 320, volume: 1200, average: 315 },
    { date: '2023-11', price: 340, volume: 1100, average: 325 },
    { date: '2023-12', price: 355, volume: 1300, average: 335 },
    { date: '2024-01', price: 345, volume: 1250, average: 340 },
    { date: '2024-02', price: 360, volume: 1400, average: 350 },
    { date: '2024-03', price: 380, volume: 1350, average: 360 },
  ],
  marketInsights: [
    {
      trend: 'up',
      metric: 'Price',
      value: '+5.2%',
      description: 'Month-over-month increase',
    },
    {
      trend: 'up',
      metric: 'Demand',
      value: '+12%',
      description: 'Growing export demand',
    },
    {
      trend: 'down',
      metric: 'Supply',
      value: '-3%',
      description: 'Regional supply constraints',
    },
  ],
  forecast: {
    nextMonth: 395,
    confidence: 0.85,
    trend: 'upward',
    factors: [
      'Increasing export demand',
      'Limited regional supply',
      'Favorable weather conditions',
    ],
  },
};

interface MarketTrendsProps {
  crop: string;
  period: string;
  region: string;
}

const MarketTrends = ({ crop, period, region }: MarketTrendsProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <BarChart2 className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Price Chart */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Price Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData.priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                name="Market Price"
                strokeWidth={2}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="average"
                stroke="#6b7280"
                name="Average Price"
                strokeDasharray="5 5"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="volume"
                stroke="#10b981"
                name="Trading Volume"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleData.marketInsights.map((insight) => (
          <Card key={insight.metric} className="p-4">
            <div className="flex items-center gap-3 mb-2">
              {getTrendIcon(insight.trend)}
              <h3 className="font-medium">{insight.metric}</h3>
            </div>
            <p className={`text-2xl font-bold ${getTrendColor(insight.trend)}`}>
              {insight.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
          </Card>
        ))}
      </div>

      {/* Price Forecast */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-500">Price Forecast</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline">
              <p className="text-sm text-gray-500">Next Month Forecast</p>
              <p className="text-2xl font-bold">${sampleData.forecast.nextMonth}</p>
            </div>
            <p className="text-sm text-gray-500">
              Confidence: {(sampleData.forecast.confidence * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Contributing Factors:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {sampleData.forecast.factors.map((factor, index) => (
                <li key={index}>• {factor}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketTrends; 