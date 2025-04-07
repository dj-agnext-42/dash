import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

// Sample data - replace with real data from your API
const sampleData = {
  daily: {
    completion: 75,
    documents: [
      { name: 'Quality Control Report', status: 'completed' },
      { name: 'Safety Inspection', status: 'completed' },
      { name: 'Temperature Log', status: 'pending' },
      { name: 'Handling Procedures', status: 'completed' },
      { name: 'Sanitation Report', status: 'missing' },
    ],
  },
  weekly: {
    completion: 85,
    documents: [
      { name: 'Weekly Audit Report', status: 'completed' },
      { name: 'Equipment Maintenance', status: 'completed' },
      { name: 'Staff Training Records', status: 'completed' },
      { name: 'Incident Reports', status: 'pending' },
      { name: 'Compliance Review', status: 'completed' },
    ],
  },
  monthly: {
    completion: 90,
    documents: [
      { name: 'Monthly Compliance Summary', status: 'completed' },
      { name: 'Regulatory Inspection', status: 'completed' },
      { name: 'Quality Metrics Report', status: 'completed' },
      { name: 'Risk Assessment', status: 'completed' },
      { name: 'Environmental Audit', status: 'pending' },
    ],
  },
};

interface ComplianceProgressProps {
  period: 'daily' | 'weekly' | 'monthly';
  shipmentId: string;
}

const ComplianceProgress = ({ period, shipmentId }: ComplianceProgressProps) => {
  const data = sampleData[period];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Circle className="h-5 w-5 text-yellow-500" />;
      case 'missing':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Overall Completion</span>
          <span className="text-sm font-medium">{data.completion}%</span>
        </div>
        <Progress value={data.completion} className="h-2" />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-500">Required Documents</h3>
        <div className="space-y-2">
          {data.documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(doc.status)}
                <span className="text-sm">{doc.name}</span>
              </div>
              <span className="text-xs text-gray-500">
                {getStatusText(doc.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceProgress; 