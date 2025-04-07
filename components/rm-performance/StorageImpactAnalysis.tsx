import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Thermometer, Droplets, Clock, AlertTriangle } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  currentConditions: {
    temperature: 14.2,
    humidity: 85,
    optimalTemp: { min: 13, max: 15 },
    optimalHumidity: { min: 80, max: 90 },
  },
  qualityImpact: {
    defectRate: 4.2,
    shelfLife: 92,
    colorRetention: 95,
  },
  resourceUsage: [
    { name: 'Cooling', value: 45, color: '#3b82f6' },
    { name: 'Ventilation', value: 30, color: '#22c55e' },
    { name: 'Monitoring', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 10, color: '#6b7280' },
  ],
  trends: [
    { time: '00:00', temp: 14.0, humidity: 84 },
    { time: '04:00', temp: 14.1, humidity: 85 },
    { time: '08:00', temp: 14.3, humidity: 86 },
    { time: '12:00', temp: 14.2, humidity: 85 },
    { time: '16:00', temp: 14.1, humidity: 84 },
    { time: '20:00', temp: 14.2, humidity: 85 },
  ],
  alerts: [
    { type: 'Temperature Spike', time: '10:15 AM', severity: 'low' },
    { type: 'Humidity Drop', time: '02:30 PM', severity: 'medium' },
  ],
};

interface StorageImpactAnalysisProps {
  period: string;
  farm: string;
  batch: string;
  view?: 'resources' | 'impact';
}

const StorageImpactAnalysis = ({ period, farm, batch, view = 'resources' }: StorageImpactAnalysisProps) => {
  const getConditionStatus = (value: number, optimal: { min: number; max: number }) => {
    if (value >= optimal.min && value <= optimal.max) return 'text-green-600';
    if (value < optimal.min - 1 || value > optimal.max + 1) return 'text-red-600';
    return 'text-amber-600';
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (view === 'impact') {
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampleData.trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="temp" domain={[10, 20]} />
            <YAxis yAxisId="humidity" orientation="right" domain={[70, 100]} />
            <Tooltip />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temp"
              stroke="#ef4444"
              name="Temperature (°C)"
              strokeWidth={2}
            />
            <Line
              yAxisId="humidity"
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6"
              name="Humidity (%)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Conditions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <p className="text-sm text-gray-500">Temperature</p>
          </div>
          <div className="flex items-center gap-2">
            <p className={`text-lg font-bold ${
              getConditionStatus(sampleData.currentConditions.temperature, sampleData.currentConditions.optimalTemp)
            }`}>
              {sampleData.currentConditions.temperature}°C
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-gray-500">Humidity</p>
          </div>
          <div className="flex items-center gap-2">
            <p className={`text-lg font-bold ${
              getConditionStatus(sampleData.currentConditions.humidity, sampleData.currentConditions.optimalHumidity)
            }`}>
              {sampleData.currentConditions.humidity}%
            </p>
          </div>
        </div>
      </div>

      {/* Quality Impact */}
      <div className="space-y-3">
        <h3 className="font-medium">Quality Impact</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Defect Rate</span>
            <span className="font-medium">{sampleData.qualityImpact.defectRate}%</span>
          </div>
          <Progress value={100 - sampleData.qualityImpact.defectRate} className="h-2 bg-green-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Shelf Life</span>
            <span className="font-medium">{sampleData.qualityImpact.shelfLife}%</span>
          </div>
          <Progress value={sampleData.qualityImpact.shelfLife} className="h-2 bg-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Color Retention</span>
            <span className="font-medium">{sampleData.qualityImpact.colorRetention}%</span>
          </div>
          <Progress value={sampleData.qualityImpact.colorRetention} className="h-2 bg-purple-500" />
        </div>
      </div>

      {/* Resource Usage */}
      <div className="space-y-4">
        <h3 className="font-medium">Resource Allocation</h3>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sampleData.resourceUsage}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {sampleData.resourceUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h3 className="font-medium">Recent Alerts</h3>
        </div>
        {sampleData.alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-2 border rounded-md ${getAlertColor(alert.severity)}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{alert.type}</span>
              <span className="text-sm">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageImpactAnalysis; 