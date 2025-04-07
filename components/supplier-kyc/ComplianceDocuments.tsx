import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { FileCheck, AlertTriangle, ShieldCheck, FileWarning } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  documentStatus: {
    completed: 85,
    pending: 10,
    expired: 5,
    documents: [
      { name: 'Business License', status: 'completed', expiry: '2024-12-31' },
      { name: 'Quality Certification', status: 'completed', expiry: '2024-06-30' },
      { name: 'Insurance Policy', status: 'pending', expiry: null },
      { name: 'Safety Compliance', status: 'expired', expiry: '2023-12-31' },
    ],
  },
  riskMetrics: {
    overall: 78,
    categories: [
      { name: 'Financial', score: 85 },
      { name: 'Operational', score: 75 },
      { name: 'Compliance', score: 90 },
      { name: 'Quality', score: 82 },
      { name: 'Delivery', score: 88 },
    ],
  },
  complianceHistory: [
    { month: 'Jan', score: 82 },
    { month: 'Feb', score: 85 },
    { month: 'Mar', score: 78 },
    { month: 'Apr', score: 85 },
  ],
};

interface ComplianceDocumentsProps {
  period: string;
  supplier: string;
  region: string;
  view?: 'default' | 'risk';
}

const ComplianceDocuments = ({ period, supplier, region, view = 'default' }: ComplianceDocumentsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-amber-600';
      case 'expired':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'expired':
        return <FileWarning className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (view === 'risk') {
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={sampleData.riskMetrics.categories}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar
              name="Risk Score"
              dataKey="score"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Compliance Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <h3 className="font-medium">Overall Compliance</h3>
        </div>
        <span className={`text-lg font-bold ${
          sampleData.documentStatus.completed >= 80 ? 'text-green-600' : 'text-amber-600'
        }`}>
          {sampleData.documentStatus.completed}%
        </span>
      </div>

      {/* Document Status Distribution */}
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completed</span>
            <span className="font-medium text-green-600">{sampleData.documentStatus.completed}%</span>
          </div>
          <Progress value={sampleData.documentStatus.completed} className="h-2 bg-green-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Pending</span>
            <span className="font-medium text-amber-600">{sampleData.documentStatus.pending}%</span>
          </div>
          <Progress value={sampleData.documentStatus.pending} className="h-2 bg-amber-500" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Expired</span>
            <span className="font-medium text-red-600">{sampleData.documentStatus.expired}%</span>
          </div>
          <Progress value={sampleData.documentStatus.expired} className="h-2 bg-red-500" />
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        <h3 className="font-medium">Required Documents</h3>
        {sampleData.documentStatus.documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(doc.status)}
              <span className="text-sm">{doc.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {doc.expiry && (
                <span className="text-xs text-gray-500">
                  Expires: {new Date(doc.expiry).toLocaleDateString()}
                </span>
              )}
              <span className={`text-sm font-medium ${getStatusColor(doc.status)}`}>
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Score */}
      <div className="space-y-2">
        <h3 className="font-medium">Risk Assessment</h3>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <span className="text-sm">Overall Risk Score</span>
          <span className={`text-lg font-bold ${
            sampleData.riskMetrics.overall >= 80 ? 'text-green-600' : 'text-amber-600'
          }`}>
            {sampleData.riskMetrics.overall}/100
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceDocuments; 