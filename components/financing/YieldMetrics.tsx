import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  currentYield: 85.2,
  targetYield: 90,
  yieldTrend: [
    { period: 'Jan', yield: 82 },
    { period: 'Feb', yield: 84 },
    { period: 'Mar', yield: 83 },
    { period: 'Apr', yield: 85.2 },
  ],
  qualityImpact: {
    premium: 65,
    standard: 25,
    below: 10,
  },
  yearOverYear: {
    change: 3.5,
    trend: 'up',
  },
};

interface YieldMetricsProps {
  period: string;
  farm: string;
  region: string;
}

const YieldMetrics = ({ period, farm, region }: YieldMetricsProps) => {
  const getProgressColor = (current: number, target: number) => {
    const ratio = (current / target) * 100;
    if (ratio >= 95) return 'bg-green-500';
    if (ratio >= 85) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Current Yield vs Target */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Current Yield</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">{sampleData.currentYield}%</p>
              <span className="text-sm text-gray-500">
                of target {sampleData.targetYield}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {sampleData.yearOverYear.trend === 'up' ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
            <span className={`text-sm font-medium ${
              sampleData.yearOverYear.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {sampleData.yearOverYear.change}% YoY
            </span>
          </div>
        </div>
        <Progress
          value={(sampleData.currentYield / sampleData.targetYield) * 100}
          className={`h-2 ${getProgressColor(sampleData.currentYield, sampleData.targetYield)}`}
        />
      </div>

      {/* Yield Trend */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Yield Trend</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData.yieldTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis domain={[75, 95]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="yield"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Quality Distribution */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500">Quality Distribution</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Premium Grade</span>
            <span className="font-medium">{sampleData.qualityImpact.premium}%</span>
          </div>
          <Progress value={sampleData.qualityImpact.premium} className="h-2 bg-green-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Standard Grade</span>
            <span className="font-medium">{sampleData.qualityImpact.standard}%</span>
          </div>
          <Progress value={sampleData.qualityImpact.standard} className="h-2 bg-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Below Standard</span>
            <span className="font-medium">{sampleData.qualityImpact.below}%</span>
          </div>
          <Progress value={sampleData.qualityImpact.below} className="h-2 bg-red-500" />
        </div>
      </div>
    </div>
  );
};

export default YieldMetrics; 