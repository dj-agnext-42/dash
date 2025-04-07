import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Beaker, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  currentPeriod: {
    passRate: 92,
    totalTests: 150,
    criticalIssues: 3,
    categories: {
      pesticide: 95,
      microbial: 90,
      physical: 94,
      chemical: 89,
    },
  },
  testHistory: [
    { month: 'Jan', passRate: 88, totalTests: 120 },
    { month: 'Feb', passRate: 90, totalTests: 135 },
    { month: 'Mar', passRate: 92, totalTests: 150 },
    { month: 'Apr', passRate: 91, totalTests: 145 },
  ],
  recentTests: [
    { name: 'Pesticide Residue', result: 'pass', value: '0.05 ppm', threshold: '0.1 ppm' },
    { name: 'Microbial Count', result: 'pass', value: '1000 cfu/g', threshold: '5000 cfu/g' },
    { name: 'Heavy Metals', result: 'warning', value: '0.18 ppm', threshold: '0.2 ppm' },
    { name: 'Physical Inspection', result: 'fail', value: 'Multiple defects', threshold: 'Max 2 defects' },
  ],
};

interface QualityTestResultsProps {
  period: string;
  supplier: string;
  region: string;
  view?: 'default' | 'trends';
}

const QualityTestResults = ({ period, supplier, region, view = 'default' }: QualityTestResultsProps) => {
  const getResultIcon = (result: string) => {
    switch (result) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
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
          <LineChart data={sampleData.testHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 200]} />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="passRate"
              name="Pass Rate (%)"
              stroke="#22c55e"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalTests"
              name="Total Tests"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Pass Rate */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Beaker className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium">Quality Test Results</h3>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${
            sampleData.currentPeriod.passRate >= 90 ? 'text-green-600' : 'text-amber-600'
          }`}>
            {sampleData.currentPeriod.passRate}%
          </p>
          <p className="text-sm text-gray-500">Pass Rate</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Pesticide Tests</span>
            <span className="font-medium">{sampleData.currentPeriod.categories.pesticide}%</span>
          </div>
          <Progress value={sampleData.currentPeriod.categories.pesticide} className="h-2 bg-green-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Microbial Tests</span>
            <span className="font-medium">{sampleData.currentPeriod.categories.microbial}%</span>
          </div>
          <Progress value={sampleData.currentPeriod.categories.microbial} className="h-2 bg-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Physical Tests</span>
            <span className="font-medium">{sampleData.currentPeriod.categories.physical}%</span>
          </div>
          <Progress value={sampleData.currentPeriod.categories.physical} className="h-2 bg-purple-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Chemical Tests</span>
            <span className="font-medium">{sampleData.currentPeriod.categories.chemical}%</span>
          </div>
          <Progress value={sampleData.currentPeriod.categories.chemical} className="h-2 bg-indigo-500" />
        </div>
      </div>

      {/* Recent Test Results */}
      <div className="space-y-3">
        <h3 className="font-medium">Recent Test Results</h3>
        {sampleData.recentTests.map((test, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <div className="flex items-center gap-2">
              {getResultIcon(test.result)}
              <div>
                <p className="text-sm font-medium">{test.name}</p>
                <p className="text-xs text-gray-500">Threshold: {test.threshold}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-medium ${getResultColor(test.result)}`}>
                {test.value}
              </p>
              <p className="text-xs text-gray-500">
                {test.result.charAt(0).toUpperCase() + test.result.slice(1)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Total Tests</p>
          <p className="text-lg font-bold">{sampleData.currentPeriod.totalTests}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-md">
          <p className="text-sm text-red-600">Critical Issues</p>
          <p className="text-lg font-bold text-red-600">{sampleData.currentPeriod.criticalIssues}</p>
        </div>
      </div>
    </div>
  );
};

export default QualityTestResults; 