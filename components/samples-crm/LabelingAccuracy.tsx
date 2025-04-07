import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tag, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  currentAccuracy: 98.5,
  target: 99,
  categories: [
    {
      name: 'Product Info',
      accuracy: 99.5,
      errors: 2,
      status: 'success',
    },
    {
      name: 'Grade Marking',
      accuracy: 98.8,
      errors: 5,
      status: 'success',
    },
    {
      name: 'Origin Labels',
      accuracy: 97.5,
      errors: 10,
      status: 'warning',
    },
    {
      name: 'Batch Codes',
      accuracy: 99.2,
      errors: 3,
      status: 'success',
    },
  ],
  weeklyTrend: [
    { week: 'Week 1', accuracy: 97.8 },
    { week: 'Week 2', accuracy: 98.2 },
    { week: 'Week 3', accuracy: 98.5 },
    { week: 'Week 4', accuracy: 98.5 },
  ],
  recentIssues: [
    {
      category: 'Origin Labels',
      description: 'Incorrect region code used',
      frequency: 5,
      impact: 'medium',
    },
    {
      category: 'Grade Marking',
      description: 'Faded print quality',
      frequency: 3,
      impact: 'low',
    },
  ],
};

interface LabelingAccuracyProps {
  customer: string;
  market: string;
  batch: string;
}

const LabelingAccuracy = ({ customer, market, batch }: LabelingAccuracyProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-amber-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Accuracy */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium">Overall Labeling Accuracy</h3>
            </div>
            <p className="text-3xl font-bold mt-2">
              {sampleData.currentAccuracy}%
              <span className="text-sm text-gray-500 ml-2">
                vs target {sampleData.target}%
              </span>
            </p>
          </div>
          {sampleData.currentAccuracy >= sampleData.target ? (
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          ) : (
            <AlertTriangle className="h-8 w-8 text-amber-500" />
          )}
        </div>
        <Progress
          value={(sampleData.currentAccuracy / sampleData.target) * 100}
          className="h-2 bg-blue-100"
        />
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleData.categories.map((category) => (
          <Card key={category.name} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {category.errors} errors detected
                </p>
              </div>
              <p className={`text-lg font-bold ${getStatusColor(category.status)}`}>
                {category.accuracy}%
              </p>
            </div>
            <Progress
              value={category.accuracy}
              className="h-1.5 mt-2 bg-gray-100"
            />
          </Card>
        ))}
      </div>

      {/* Accuracy Trend */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Weekly Accuracy Trend</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData.weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[95, 100]} />
              <Tooltip />
              <Bar
                dataKey="accuracy"
                name="Accuracy %"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Issues */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Issues</h3>
        <div className="space-y-4">
          {sampleData.recentIssues.map((issue, index) => (
            <div
              key={index}
              className="flex items-start justify-between border-b pb-4 last:border-0"
            >
              <div>
                <h4 className="font-medium">{issue.category}</h4>
                <p className="text-sm text-gray-500 mt-1">{issue.description}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(issue.impact)}`}>
                  {issue.impact.toUpperCase()}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  {issue.frequency} occurrences
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LabelingAccuracy; 