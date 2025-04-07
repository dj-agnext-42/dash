import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Award, TrendingUp, TrendingDown } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  distribution: [
    { name: 'Extra Class', value: 45, color: '#22c55e' },
    { name: 'Class I', value: 35, color: '#3b82f6' },
    { name: 'Class II', value: 15, color: '#f59e0b' },
    { name: 'Below Standard', value: 5, color: '#ef4444' },
  ],
  trends: [
    {
      grade: 'Extra Class',
      trend: 'up',
      change: '+5%',
      comment: 'Improved sorting process',
    },
    {
      grade: 'Class I',
      trend: 'down',
      change: '-3%',
      comment: 'Shifted to Extra Class',
    },
    {
      grade: 'Class II',
      trend: 'down',
      change: '-2%',
      comment: 'Better handling procedures',
    },
  ],
  summary: {
    totalSamples: 1000,
    premiumRatio: 80,
    targetAchieved: true,
  },
};

interface GradeDistributionProps {
  customer: string;
  market: string;
  batch: string;
}

const GradeDistribution = ({ customer, market, batch }: GradeDistributionProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Premium Grade Ratio</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-green-600">{sampleData.summary.premiumRatio}%</p>
              <span className="text-sm text-gray-500">
                of total samples
              </span>
            </div>
          </div>
          {sampleData.summary.targetAchieved && (
            <div className="p-2 bg-green-50 rounded-full">
              <Award className="h-6 w-6 text-green-500" />
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Based on {sampleData.summary.totalSamples.toLocaleString()} samples
        </p>
      </Card>

      {/* Grade Distribution Chart */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Grade Distribution</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sampleData.distribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {sampleData.distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Grade Trends */}
      <div className="space-y-3">
        {sampleData.trends.map((trend) => (
          <Card key={trend.grade} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTrendIcon(trend.trend)}
                <span className="font-medium">{trend.grade}</span>
              </div>
              <span className={`text-sm font-medium ${
                trend.trend === 'up' ? 'text-green-600' : 'text-amber-600'
              }`}>
                {trend.change}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{trend.comment}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GradeDistribution; 