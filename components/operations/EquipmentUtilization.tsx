import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  equipment: [
    { id: 'TR001', name: 'Tractor 1', status: 'active', utilization: 85, maintenanceDue: false },
    { id: 'TR002', name: 'Tractor 2', status: 'maintenance', utilization: 0, maintenanceDue: true },
    { id: 'HV001', name: 'Harvester 1', status: 'active', utilization: 75, maintenanceDue: false },
    { id: 'HV002', name: 'Harvester 2', status: 'idle', utilization: 30, maintenanceDue: false },
    { id: 'SP001', name: 'Sprayer 1', status: 'active', utilization: 60, maintenanceDue: true },
  ],
  utilizationStats: [
    { name: 'Active', value: 3 },
    { name: 'Idle', value: 1 },
    { name: 'Maintenance', value: 1 },
  ]
};

const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

interface EquipmentUtilizationProps {
  farmId: string;
  date: string;
}

const EquipmentUtilization = ({ farmId, date }: EquipmentUtilizationProps) => {
  const { equipment, utilizationStats } = sampleData;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'idle':
        return 'text-amber-500';
      case 'maintenance':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return 'bg-green-600';
    if (utilization >= 50) return 'bg-blue-600';
    return 'bg-amber-500';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Equipment Status Chart */}
        <Card className="p-4 md:col-span-1">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Equipment Status</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={utilizationStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {utilizationStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {utilizationStats.map((stat, index) => (
              <div key={stat.name} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm">{stat.name}</span>
                <span className="text-sm font-medium ml-auto">{stat.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Equipment List */}
        <div className="md:col-span-2 space-y-4">
          {equipment.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-gray-400" />
                    <h4 className="font-medium">{item.name}</h4>
                    {item.maintenanceDue && (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`text-sm ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">ID: {item.id}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium mb-1">Utilization</div>
                  <Progress
                    value={item.utilization}
                    className={`h-2 w-24 ${getUtilizationColor(item.utilization)}`}
                  />
                  <div className="text-sm text-gray-500 mt-1">{item.utilization}%</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentUtilization; 