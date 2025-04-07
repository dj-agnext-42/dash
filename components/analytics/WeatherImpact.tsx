import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  currentConditions: [
    {
      name: 'Temperature',
      icon: Thermometer,
      value: 24.5,
      unit: '°C',
      status: 'optimal',
      impact: 'Positive impact on growth',
    },
    {
      name: 'Rainfall',
      icon: Droplets,
      value: 45,
      unit: 'mm',
      status: 'warning',
      impact: 'Below average for season',
    },
    {
      name: 'Humidity',
      icon: Cloud,
      value: 65,
      unit: '%',
      status: 'optimal',
      impact: 'Good for crop development',
    },
    {
      name: 'Wind Speed',
      icon: Wind,
      value: 12,
      unit: 'km/h',
      status: 'caution',
      impact: 'Monitor for potential damage',
    },
  ],
  impactData: [
    {
      month: 'Apr',
      temperature: 85,
      rainfall: 65,
      yield: 75,
    },
    {
      month: 'May',
      temperature: 90,
      rainfall: 80,
      yield: 85,
    },
    {
      month: 'Jun',
      temperature: 75,
      rainfall: 95,
      yield: 90,
    },
    {
      month: 'Jul',
      temperature: 70,
      rainfall: 60,
      yield: 65,
    },
  ],
};

interface WeatherImpactProps {
  crop: string;
  period: string;
  region: string;
}

const WeatherImpact = ({ crop, period, region }: WeatherImpactProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-red-600 bg-red-50';
      case 'caution':
        return 'text-amber-600 bg-amber-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleData.currentConditions.map((condition) => {
          const Icon = condition.icon;
          return (
            <Card key={condition.name} className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium">{condition.name}</h3>
                    <span className="text-lg font-semibold">
                      {condition.value}
                      <span className="text-sm text-gray-500 ml-1">
                        {condition.unit}
                      </span>
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(condition.status)}`}>
                      {condition.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{condition.impact}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Impact Chart */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Weather Impact on Yield</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData.impactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="temperature"
                name="Temperature Impact"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="rainfall"
                name="Rainfall Impact"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="yield"
                name="Yield Impact"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Risk Assessment */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Weather Risk Assessment</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Drought Risk</span>
              <span>35%</span>
            </div>
            <Progress value={35} className="h-2 bg-red-100" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Frost Risk</span>
              <span>15%</span>
            </div>
            <Progress value={15} className="h-2 bg-blue-100" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Storm Risk</span>
              <span>25%</span>
            </div>
            <Progress value={25} className="h-2 bg-amber-100" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WeatherImpact; 