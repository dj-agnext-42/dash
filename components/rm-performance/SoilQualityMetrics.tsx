import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplets, Leaf, Gauge } from 'lucide-react';

// Sample data - replace with actual API data
const sampleData = {
  currentMetrics: {
    pH: 6.8,
    optimalPh: { min: 6.5, max: 7.5 },
    nutrients: {
      nitrogen: 85,
      phosphorus: 72,
      potassium: 90,
    },
    organicMatter: 4.2,
  },
  soilTrends: [
    { month: 'Jan', pH: 6.7, nitrogen: 82, phosphorus: 70, potassium: 88 },
    { month: 'Feb', pH: 6.8, nitrogen: 84, phosphorus: 71, potassium: 89 },
    { month: 'Mar', pH: 6.8, nitrogen: 85, phosphorus: 72, potassium: 90 },
    { month: 'Apr', pH: 6.8, nitrogen: 85, phosphorus: 72, potassium: 90 },
  ],
  healthIndicators: {
    microorganisms: 88,
    waterRetention: 75,
    erosionRisk: 15,
  },
};

interface SoilQualityMetricsProps {
  period: string;
  farm: string;
  batch: string;
}

const SoilQualityMetrics = ({ period, farm, batch }: SoilQualityMetricsProps) => {
  const getHealthColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getPhStatus = (ph: number, optimal: { min: number; max: number }) => {
    if (ph >= optimal.min && ph <= optimal.max) return 'text-green-600';
    if (ph < optimal.min - 0.5 || ph > optimal.max + 0.5) return 'text-red-600';
    return 'text-amber-600';
  };

  return (
    <div className="space-y-6">
      {/* pH Levels */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">Soil pH</h3>
          </div>
          <span className={`text-sm font-medium ${
            getPhStatus(sampleData.currentMetrics.pH, sampleData.currentMetrics.optimalPh)
          }`}>
            {sampleData.currentMetrics.pH}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{
              width: `${((sampleData.currentMetrics.pH - 5.5) / 3) * 100}%`,
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </div>
        <p className="text-sm text-gray-500">
          Optimal range: {sampleData.currentMetrics.optimalPh.min} - {sampleData.currentMetrics.optimalPh.max}
        </p>
      </div>

      {/* Nutrient Levels */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-500" />
          <h3 className="font-medium">Nutrient Levels</h3>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Nitrogen (N)</span>
              <span className="font-medium">{sampleData.currentMetrics.nutrients.nitrogen}%</span>
            </div>
            <Progress
              value={sampleData.currentMetrics.nutrients.nitrogen}
              className="h-2 bg-green-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Phosphorus (P)</span>
              <span className="font-medium">{sampleData.currentMetrics.nutrients.phosphorus}%</span>
            </div>
            <Progress
              value={sampleData.currentMetrics.nutrients.phosphorus}
              className="h-2 bg-yellow-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Potassium (K)</span>
              <span className="font-medium">{sampleData.currentMetrics.nutrients.potassium}%</span>
            </div>
            <Progress
              value={sampleData.currentMetrics.nutrients.potassium}
              className="h-2 bg-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Soil Health Indicators */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-indigo-500" />
          <h3 className="font-medium">Soil Health</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Microorganisms</p>
            <p className={`text-lg font-bold ${getHealthColor(sampleData.healthIndicators.microorganisms)}`}>
              {sampleData.healthIndicators.microorganisms}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Water Retention</p>
            <p className={`text-lg font-bold ${getHealthColor(sampleData.healthIndicators.waterRetention)}`}>
              {sampleData.healthIndicators.waterRetention}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Erosion Risk</p>
            <p className={`text-lg font-bold ${getHealthColor(100 - sampleData.healthIndicators.erosionRisk)}`}>
              {sampleData.healthIndicators.erosionRisk}%
            </p>
          </div>
        </div>
      </div>

      {/* Trends Chart */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Nutrient Trends</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData.soilTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="nitrogen"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
              />
              <Line
                type="monotone"
                dataKey="phosphorus"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ fill: '#eab308' }}
              />
              <Line
                type="monotone"
                dataKey="potassium"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ fill: '#a855f7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default SoilQualityMetrics; 