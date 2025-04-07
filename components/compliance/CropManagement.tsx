import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Bug, Droplets, FlaskRound } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  fertilizer: {
    usage: [
      { date: '2024-03-01', amount: 25 },
      { date: '2024-03-08', amount: 30 },
      { date: '2024-03-15', amount: 28 },
      { date: '2024-03-22', amount: 32 },
      { date: '2024-03-29', amount: 27 },
    ],
    efficiency: 85,
  },
  pestManagement: {
    effectiveness: 92,
    incidents: [
      { date: '2024-03-01', count: 5 },
      { date: '2024-03-08', count: 3 },
      { date: '2024-03-15', count: 2 },
      { date: '2024-03-22', count: 4 },
      { date: '2024-03-29', count: 1 },
    ],
  },
  irrigation: {
    efficiency: 88,
    usage: [
      { date: '2024-03-01', amount: 1200 },
      { date: '2024-03-08', amount: 1100 },
      { date: '2024-03-15', amount: 1300 },
      { date: '2024-03-22', amount: 1150 },
      { date: '2024-03-29', amount: 1250 },
    ],
  },
};

interface CropManagementProps {
  farmId: string;
  batchId: string;
}

const CropManagement = ({ farmId, batchId }: CropManagementProps) => {
  return (
    <div className="space-y-6">
      {/* Fertilizer Usage */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FlaskRound className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Fertilizer Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Usage Trends</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData.fertilizer.usage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis label={{ value: 'kg/hectare', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value} kg/hectare`, 'Usage']}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Efficiency Rating</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Current Efficiency</span>
                <span className="text-sm font-medium">{sampleData.fertilizer.efficiency}%</span>
              </div>
              <Progress value={sampleData.fertilizer.efficiency} className="h-2" />
            </div>
          </Card>
        </div>
      </div>

      {/* Pest Management */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bug className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold">Pest Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pest Incidents</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleData.pestManagement.incidents}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis label={{ value: 'Incidents', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value} incidents`, 'Count']}
                  />
                  <Bar dataKey="count" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Control Effectiveness</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Current Effectiveness</span>
                <span className="text-sm font-medium">{sampleData.pestManagement.effectiveness}%</span>
              </div>
              <Progress value={sampleData.pestManagement.effectiveness} className="h-2" />
            </div>
          </Card>
        </div>
      </div>

      {/* Irrigation */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Irrigation Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Water Usage</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData.irrigation.usage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis label={{ value: 'Liters/hectare', angle: -90, position: 'insideLeft' }} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value} L/hectare`, 'Usage']}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Irrigation Efficiency</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Current Efficiency</span>
                <span className="text-sm font-medium">{sampleData.irrigation.efficiency}%</span>
              </div>
              <Progress value={sampleData.irrigation.efficiency} className="h-2" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropManagement; 