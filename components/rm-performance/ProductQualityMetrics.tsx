import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  qualityScores: {
    size: 92,
    color: 88,
    shape: 85,
    defects: 95,
  },
  defectAnalysis: [
    { type: 'Bruising', count: 12, severity: 'low' },
    { type: 'Discoloration', count: 8, severity: 'medium' },
    { type: 'Deformity', count: 5, severity: 'low' },
    { type: 'Spots', count: 3, severity: 'high' },
  ],
  gradeDistribution: {
    premium: 75,
    standard: 20,
    substandard: 5,
  },
  correlationData: [
    { fertilizer: 80, quality: 85, size: 15 },
    { fertilizer: 85, quality: 88, size: 18 },
    { fertilizer: 90, quality: 92, size: 20 },
    { fertilizer: 95, quality: 95, size: 22 },
  ],
};

interface ProductQualityMetricsProps {
  period: string;
  farm: string;
  batch: string;
  view?: 'default' | 'correlation';
}

const ProductQualityMetrics = ({ period, farm, batch, view = 'default' }: ProductQualityMetricsProps) => {
  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-amber-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-yellow-500';
      case 'medium':
        return 'bg-orange-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (view === 'correlation') {
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="fertilizer"
              name="Fertilizer Usage"
              unit="%"
              domain={[75, 100]}
            />
            <YAxis
              type="number"
              dataKey="quality"
              name="Quality Score"
              unit="%"
              domain={[80, 100]}
            />
            <ZAxis
              type="number"
              dataKey="size"
              range={[50, 400]}
              name="Size"
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter
              name="Products"
              data={sampleData.correlationData}
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quality Scores */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Size Conformity</p>
          <div className="flex items-center gap-2">
            <p className={`text-lg font-bold ${getQualityColor(sampleData.qualityScores.size)}`}>
              {sampleData.qualityScores.size}%
            </p>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Color Consistency</p>
          <div className="flex items-center gap-2">
            <p className={`text-lg font-bold ${getQualityColor(sampleData.qualityScores.color)}`}>
              {sampleData.qualityScores.color}%
            </p>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Shape Quality</p>
          <div className="flex items-center gap-2">
            <p className={`text-lg font-bold ${getQualityColor(sampleData.qualityScores.shape)}`}>
              {sampleData.qualityScores.shape}%
            </p>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Defect Rate</p>
          <div className="flex items-center gap-2">
            <p className={`text-lg font-bold ${getQualityColor(sampleData.qualityScores.defects)}`}>
              {sampleData.qualityScores.defects}%
            </p>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="space-y-3">
        <h3 className="font-medium">Grade Distribution</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Premium Grade</span>
            <span className="font-medium">{sampleData.gradeDistribution.premium}%</span>
          </div>
          <Progress value={sampleData.gradeDistribution.premium} className="h-2 bg-green-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Standard Grade</span>
            <span className="font-medium">{sampleData.gradeDistribution.standard}%</span>
          </div>
          <Progress value={sampleData.gradeDistribution.standard} className="h-2 bg-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Substandard</span>
            <span className="font-medium">{sampleData.gradeDistribution.substandard}%</span>
          </div>
          <Progress value={sampleData.gradeDistribution.substandard} className="h-2 bg-red-500" />
        </div>
      </div>

      {/* Defect Analysis */}
      <div className="space-y-3">
        <h3 className="font-medium">Defect Analysis</h3>
        {sampleData.defectAnalysis.map((defect) => (
          <div key={defect.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getSeverityColor(defect.severity)}`} />
              <span className="text-sm">{defect.type}</span>
            </div>
            <span className="text-sm font-medium">{defect.count} instances</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductQualityMetrics; 