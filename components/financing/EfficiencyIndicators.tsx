import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Truck, BarChart2 } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  storageMetrics: {
    averageDuration: 4.2, // days
    optimalDuration: 3,
    riskThreshold: 5,
    trend: [
      { day: 'Mon', duration: 3.8 },
      { day: 'Tue', duration: 4.0 },
      { day: 'Wed', duration: 4.2 },
      { day: 'Thu', duration: 4.1 },
      { day: 'Fri', duration: 4.2 },
    ],
  },
  processingEfficiency: {
    current: 92,
    target: 95,
    bottlenecks: [
      { stage: 'Sorting', efficiency: 88 },
      { stage: 'Packaging', efficiency: 92 },
      { stage: 'Loading', efficiency: 95 },
    ],
  },
  resourceUtilization: {
    labor: 85,
    equipment: 78,
    storage: 92,
  },
};

interface EfficiencyIndicatorsProps {
  period: string;
  farm: string;
  region: string;
  view?: 'summary' | 'storage';
}

const EfficiencyIndicators = ({ period, farm, region, view = 'summary' }: EfficiencyIndicatorsProps) => {
  const getEfficiencyColor = (value: number, target: number) => {
    const ratio = (value / target) * 100;
    if (ratio >= 95) return 'text-green-600';
    if (ratio >= 85) return 'text-amber-600';
    return 'text-red-600';
  };

  if (view === 'storage') {
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData.storageMetrics.trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 6]} />
            <Tooltip />
            <Bar dataKey="duration" fill="#3b82f6" name="Duration (days)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Storage Duration */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">Storage Duration</h3>
          </div>
          <span className={`text-sm font-medium ${
            sampleData.storageMetrics.averageDuration <= sampleData.storageMetrics.optimalDuration
              ? 'text-green-600'
              : 'text-amber-600'
          }`}>
            {sampleData.storageMetrics.averageDuration} days
          </span>
        </div>
        <Progress
          value={(sampleData.storageMetrics.averageDuration / sampleData.storageMetrics.riskThreshold) * 100}
          className="h-2 bg-blue-500"
        />
        <p className="text-sm text-gray-500">
          Optimal: {sampleData.storageMetrics.optimalDuration} days
        </p>
      </div>

      {/* Processing Efficiency */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">Processing Efficiency</h3>
          </div>
          <span className={`text-sm font-medium ${
            getEfficiencyColor(sampleData.processingEfficiency.current, sampleData.processingEfficiency.target)
          }`}>
            {sampleData.processingEfficiency.current}%
          </span>
        </div>
        {sampleData.processingEfficiency.bottlenecks.map((stage) => (
          <div key={stage.stage} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{stage.stage}</span>
              <span className="font-medium">{stage.efficiency}%</span>
            </div>
            <Progress value={stage.efficiency} className="h-1.5 bg-green-500" />
          </div>
        ))}
      </div>

      {/* Resource Utilization */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-indigo-500" />
          <h3 className="font-medium">Resource Utilization</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Labor</span>
            <span className="font-medium">{sampleData.resourceUtilization.labor}%</span>
          </div>
          <Progress value={sampleData.resourceUtilization.labor} className="h-2 bg-indigo-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Equipment</span>
            <span className="font-medium">{sampleData.resourceUtilization.equipment}%</span>
          </div>
          <Progress value={sampleData.resourceUtilization.equipment} className="h-2 bg-indigo-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Storage</span>
            <span className="font-medium">{sampleData.resourceUtilization.storage}%</span>
          </div>
          <Progress value={sampleData.resourceUtilization.storage} className="h-2 bg-indigo-500" />
        </div>
      </div>
    </div>
  );
};

export default EfficiencyIndicators; 