import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  revenueMetrics: {
    current: 850000,
    target: 1000000,
    previousPeriod: 780000,
    growth: 9,
  },
  costBreakdown: [
    { name: 'Labor', value: 35, color: '#3b82f6' },
    { name: 'Storage', value: 25, color: '#22c55e' },
    { name: 'Transport', value: 20, color: '#f59e0b' },
    { name: 'Processing', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ],
  profitabilityIndicators: {
    grossMargin: 32,
    operatingMargin: 18,
    netMargin: 12,
    previousNetMargin: 10,
  },
  costTrends: [
    { category: 'Labor', change: 5, trend: 'up' },
    { category: 'Storage', change: -2, trend: 'down' },
    { category: 'Transport', change: 8, trend: 'up' },
  ],
};

interface FinancialImpactProps {
  period: string;
  farm: string;
  region: string;
  view?: 'summary' | 'costs';
}

const FinancialImpact = ({ period, farm, region, view = 'summary' }: FinancialImpactProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (view === 'costs') {
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sampleData.costBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {sampleData.costBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">Revenue</h3>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">
              +{sampleData.revenueMetrics.growth}%
            </span>
          </div>
        </div>
        <p className="text-2xl font-bold">
          {formatCurrency(sampleData.revenueMetrics.current)}
        </p>
        <Progress
          value={(sampleData.revenueMetrics.current / sampleData.revenueMetrics.target) * 100}
          className="h-2 bg-green-500"
        />
        <p className="text-sm text-gray-500">
          Target: {formatCurrency(sampleData.revenueMetrics.target)}
        </p>
      </div>

      {/* Profitability Metrics */}
      <div className="space-y-4">
        <h3 className="font-medium">Profitability Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Gross Margin</p>
            <p className="text-lg font-bold">{sampleData.profitabilityIndicators.grossMargin}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Operating Margin</p>
            <p className="text-lg font-bold">{sampleData.profitabilityIndicators.operatingMargin}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Net Margin</p>
            <div className="flex items-center gap-1">
              <p className="text-lg font-bold">{sampleData.profitabilityIndicators.netMargin}%</p>
              {sampleData.profitabilityIndicators.netMargin > sampleData.profitabilityIndicators.previousNetMargin ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cost Trends */}
      <div className="space-y-3">
        <h3 className="font-medium">Cost Trends</h3>
        {sampleData.costTrends.map((item) => (
          <div key={item.category} className="flex items-center justify-between">
            <span className="text-sm">{item.category}</span>
            <div className="flex items-center gap-1">
              <span className={`text-sm font-medium ${
                item.trend === 'up' ? 'text-red-600' : 'text-green-600'
              }`}>
                {item.trend === 'up' ? '+' : ''}{item.change}%
              </span>
              {item.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialImpact; 