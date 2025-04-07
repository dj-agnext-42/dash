import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ClipboardCheck, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  currentPeriod: {
    totalInspections: 85,
    passRate: 88,
    majorDefects: 12,
    minorDefects: 25,
    defectCategories: [
      { name: 'Packaging', value: 15 },
      { name: 'Product', value: 12 },
      { name: 'Documentation', value: 8 },
      { name: 'Other', value: 2 },
    ],
  },
  inspectionHistory: [
    { week: 'W1', passed: 20, failed: 3 },
    { week: 'W2', passed: 18, failed: 2 },
    { week: 'W3', passed: 22, failed: 4 },
    { week: 'W4', passed: 19, failed: 3 },
  ],
  recentInspections: [
    { date: '2024-03-15', status: 'pass', defects: 0, notes: 'All criteria met' },
    { date: '2024-03-14', status: 'warning', defects: 2, notes: 'Minor packaging issues' },
    { date: '2024-03-13', status: 'fail', defects: 5, notes: 'Multiple documentation errors' },
    { date: '2024-03-12', status: 'pass', defects: 1, notes: 'Single minor defect' },
  ],
};

const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#6b7280'];

interface InspectionMetricsProps {
  period: string;
  supplier: string;
  region: string;
  view?: 'default' | 'trends';
}

const InspectionMetrics = ({ period, supplier, region, view = 'default' }: InspectionMetricsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'text-green-600';
      case 'fail':
        return 'text-red-600';
      case 'warning':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  if (view === 'trends') {
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData.inspectionHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="passed" name="Passed" fill="#22c55e" stackId="a" />
            <Bar dataKey="failed" name="Failed" fill="#ef4444" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Overall Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium">Pre-loading Inspection Results</h3>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${
            sampleData.currentPeriod.passRate >= 85 ? 'text-green-600' : 'text-amber-600'
          }`}>
            {sampleData.currentPeriod.passRate}%
          </p>
          <p className="text-sm text-gray-500">Pass Rate</p>
        </div>
      </div>

      {/* Defect Categories */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sampleData.currentPeriod.defectCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {sampleData.currentPeriod.defectCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          {sampleData.currentPeriod.defectCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-sm font-medium">{category.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Inspections */}
      <div className="space-y-3">
        <h3 className="font-medium">Recent Inspections</h3>
        {sampleData.recentInspections.map((inspection, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(inspection.status)}
              <div>
                <p className="text-sm font-medium">{new Date(inspection.date).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500">{inspection.notes}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${getStatusColor(inspection.status)}`}>
                {inspection.defects} defects
              </p>
              <p className="text-xs text-gray-500">
                {inspection.status.charAt(0).toUpperCase() + inspection.status.slice(1)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-red-50 rounded-md">
          <p className="text-sm text-red-600">Major Defects</p>
          <p className="text-lg font-bold text-red-600">{sampleData.currentPeriod.majorDefects}</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-md">
          <p className="text-sm text-amber-600">Minor Defects</p>
          <p className="text-lg font-bold text-amber-600">{sampleData.currentPeriod.minorDefects}</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionMetrics; 