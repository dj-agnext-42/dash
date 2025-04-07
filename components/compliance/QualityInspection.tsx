import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Sample data - replace with real data from your API
const sampleData = {
  gradeDistribution: [
    { name: 'Extra Class', value: 30 },
    { name: 'Class I', value: 45 },
    { name: 'Class II', value: 20 },
    { name: 'Below Standard', value: 5 },
  ],
  defects: [
    { name: 'Bruising', count: 12 },
    { name: 'Size Variation', count: 8 },
    { name: 'Color Defects', count: 5 },
    { name: 'Shape Issues', count: 3 },
  ],
  metrics: {
    cleanliness: 95,
    sizeConsistency: 88,
    colorUniformity: 92,
    shapeConformity: 85,
  },
};

const GRADE_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];
const DEFECT_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6'];

interface QualityInspectionProps {
  farmId: string;
  batchId: string;
}

const QualityInspection = ({ farmId, batchId }: QualityInspectionProps) => {
  const totalDefects = sampleData.defects.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-6">
      {/* Grade Distribution */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sampleData.gradeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {sampleData.gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={GRADE_COLORS[index % GRADE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quality Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quality Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(sampleData.metrics).map(([key, value]) => (
            <Card key={key} className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <span className="text-sm font-medium">{value}%</span>
                </div>
                <Progress
                  value={value}
                  className="h-2"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Defect Analysis */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Defect Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sampleData.defects}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, count }) => `${name}: ${count}`}
                >
                  {sampleData.defects.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEFECT_COLORS[index % DEFECT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Defect Summary</h3>
            <div className="space-y-4">
              {sampleData.defects.map((defect) => (
                <div key={defect.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{defect.name}</span>
                    <span className="font-medium">{((defect.count / totalDefects) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={(defect.count / totalDefects) * 100}
                    className="h-1"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QualityInspection; 