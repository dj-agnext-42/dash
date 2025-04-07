import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Droplets, Sprout, Users } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  resources: [
    {
      name: 'Water Usage',
      icon: Droplets,
      used: 75000,
      allocated: 100000,
      unit: 'liters',
      trend: 'normal'
    },
    {
      name: 'Fertilizer',
      icon: Sprout,
      used: 850,
      allocated: 1000,
      unit: 'kg',
      trend: 'high'
    },
    {
      name: 'Labor Hours',
      icon: Users,
      used: 180,
      allocated: 200,
      unit: 'hours',
      trend: 'low'
    }
  ]
};

interface ResourceAllocationProps {
  farmId: string;
  date: string;
}

const ResourceAllocation = ({ farmId, date }: ResourceAllocationProps) => {
  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'high':
        return 'text-amber-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-green-500';
    }
  };

  const getProgressColor = (used: number, allocated: number) => {
    const percentage = (used / allocated) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-4">
      {sampleData.resources.map((resource) => {
        const percentage = (resource.used / resource.allocated) * 100;
        const Icon = resource.icon;

        return (
          <Card key={resource.name} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Icon className="h-5 w-5 text-gray-400" />
              <div>
                <h3 className="font-medium">{resource.name}</h3>
                <p className="text-sm text-gray-500">
                  Usage trend:{' '}
                  <span className={getTrendColor(resource.trend)}>
                    {resource.trend.charAt(0).toUpperCase() + resource.trend.slice(1)}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  {resource.used.toLocaleString()} / {resource.allocated.toLocaleString()} {resource.unit}
                </span>
                <span>{percentage.toFixed(1)}%</span>
              </div>
              <Progress
                value={percentage}
                className={`h-2 ${getProgressColor(resource.used, resource.allocated)}`}
              />
            </div>
          </Card>
        );
      })}

      <Card className="p-4 mt-6">
        <h3 className="font-medium mb-2">Resource Efficiency Tips</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Optimize irrigation schedules based on weather forecast</li>
          <li>• Review fertilizer application rates for efficiency</li>
          <li>• Adjust labor allocation based on task priorities</li>
        </ul>
      </Card>
    </div>
  );
};

export default ResourceAllocation; 