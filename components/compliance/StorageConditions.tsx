import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  temperature: {
    current: 14,
    optimal: { min: 13, max: 15 },
    history: [
      { time: '08:00', value: 13.5 },
      { time: '09:00', value: 13.8 },
      { time: '10:00', value: 14.2 },
      { time: '11:00', value: 14.5 },
      { time: '12:00', value: 14.3 },
      { time: '13:00', value: 14.0 },
      { time: '14:00', value: 13.8 },
    ],
  },
  humidity: {
    current: 85,
    optimal: { min: 80, max: 90 },
    history: [
      { time: '08:00', value: 82 },
      { time: '09:00', value: 84 },
      { time: '10:00', value: 85 },
      { time: '11:00', value: 86 },
      { time: '12:00', value: 85 },
      { time: '13:00', value: 84 },
      { time: '14:00', value: 85 },
    ],
  },
  qualityChecks: [
    {
      time: '08:00',
      status: 'passed',
      notes: 'All parameters within acceptable range',
    },
    {
      time: '10:00',
      status: 'warning',
      notes: 'Humidity slightly above optimal',
    },
    {
      time: '12:00',
      status: 'passed',
      notes: 'Conditions normalized',
    },
    {
      time: '14:00',
      status: 'passed',
      notes: 'Regular check - all normal',
    },
  ],
};

interface StorageConditionsProps {
  facilityId: string;
  batchId: string;
}

const StorageConditions = ({ facilityId, batchId }: StorageConditionsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const isWithinRange = (value: number, min: number, max: number) => {
    return value >= min && value <= max;
  };

  return (
    <div className="space-y-6">
      {/* Current Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium">Temperature</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {sampleData.temperature.current}°C
              </span>
              <span className={`text-sm font-medium ${
                isWithinRange(
                  sampleData.temperature.current,
                  sampleData.temperature.optimal.min,
                  sampleData.temperature.optimal.max
                ) ? 'text-green-600' : 'text-red-600'
              }`}>
                {sampleData.temperature.optimal.min}°C - {sampleData.temperature.optimal.max}°C
              </span>
            </div>
            <Progress
              value={
                ((sampleData.temperature.current - sampleData.temperature.optimal.min) /
                (sampleData.temperature.optimal.max - sampleData.temperature.optimal.min)) * 100
              }
              className="h-2"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium">Humidity</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {sampleData.humidity.current}%
              </span>
              <span className={`text-sm font-medium ${
                isWithinRange(
                  sampleData.humidity.current,
                  sampleData.humidity.optimal.min,
                  sampleData.humidity.optimal.max
                ) ? 'text-green-600' : 'text-red-600'
              }`}>
                {sampleData.humidity.optimal.min}% - {sampleData.humidity.optimal.max}%
              </span>
            </div>
            <Progress
              value={
                ((sampleData.humidity.current - sampleData.humidity.optimal.min) /
                (sampleData.humidity.optimal.max - sampleData.humidity.optimal.min)) * 100
              }
              className="h-2"
            />
          </div>
        </Card>
      </div>

      {/* Historical Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Temperature History</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData.temperature.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis
                  domain={[
                    sampleData.temperature.optimal.min - 1,
                    sampleData.temperature.optimal.max + 1,
                  ]}
                />
                <Tooltip formatter={(value) => `${value}°C`} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Humidity History</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData.humidity.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis
                  domain={[
                    sampleData.humidity.optimal.min - 5,
                    sampleData.humidity.optimal.max + 5,
                  ]}
                />
                <Tooltip formatter={(value) => `${value}%`} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quality Checks */}
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Quality Checks</h3>
        <div className="space-y-4">
          {sampleData.qualityChecks.map((check, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{check.time}</span>
                  <span className={`text-sm font-medium ${getStatusColor(check.status)}`}>
                    {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{check.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StorageConditions; 