import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CircleDot, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  overallScore: 8.5,
  metrics: [
    {
      name: 'Size Consistency',
      score: 9,
      status: 'excellent',
      details: 'Uniform size across batch',
    },
    {
      name: 'Color Quality',
      score: 8,
      status: 'good',
      details: 'Consistent coloration',
    },
    {
      name: 'Shape Standards',
      score: 8.5,
      status: 'good',
      details: 'Meets shape requirements',
    },
    {
      name: 'Defect Rate',
      score: 7,
      status: 'attention',
      details: 'Minor blemishes noted',
    },
  ],
  recentAssessments: [
    {
      date: '2024-03-15',
      batchId: 'B2024-001',
      score: 8.5,
      status: 'approved',
    },
    {
      date: '2024-03-14',
      batchId: 'B2024-002',
      score: 7.8,
      status: 'attention',
    },
    {
      date: '2024-03-13',
      batchId: 'B2024-003',
      score: 9.0,
      status: 'approved',
    },
  ],
};

interface QualityAssessmentProps {
  customer: string;
  market: string;
  batch: string;
}

const QualityAssessment = ({ customer, market, batch }: QualityAssessmentProps) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'good':
        return <CircleDot className="h-5 w-5 text-blue-500" />;
      case 'attention':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'poor':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 8) return 'text-blue-600';
    if (score >= 7) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 9) return 'bg-green-500';
    if (score >= 8) return 'bg-blue-500';
    if (score >= 7) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 md:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Overall Quality Score</h3>
              <p className={`text-3xl font-bold ${getScoreColor(sampleData.overallScore)}`}>
                {sampleData.overallScore}/10
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Target: 8.5/10</span>
              <Progress
                value={(sampleData.overallScore / 10) * 100}
                className={`h-2 w-24 ${getProgressColor(sampleData.overallScore)}`}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleData.metrics.map((metric) => (
          <Card key={metric.name} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(metric.status)}
                  <h3 className="font-medium">{metric.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">{metric.details}</p>
              </div>
              <div className="text-right">
                <p className={`text-xl font-bold ${getScoreColor(metric.score)}`}>
                  {metric.score}/10
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Assessments */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Quality Assessments</h3>
        <div className="space-y-4">
          {sampleData.recentAssessments.map((assessment) => (
            <div
              key={assessment.batchId}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div>
                <p className="font-medium">{assessment.batchId}</p>
                <p className="text-sm text-gray-500">{assessment.date}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getScoreColor(assessment.score)}`}>
                  {assessment.score}/10
                </p>
                <p className="text-sm text-gray-500">{assessment.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default QualityAssessment; 