import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { Sprout, TrendingUp, AlertTriangle } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  forecasts: [
    { month: 'Jan', actual: 0, predicted: 0, confidence: [0, 0] },
    { month: 'Feb', actual: 0, predicted: 0, confidence: [0, 0] },
    { month: 'Mar', actual: 2.1, predicted: 2.3, confidence: [2.0, 2.5] },
    { month: 'Apr', actual: 3.4, predicted: 3.2, confidence: [3.0, 3.5] },
    { month: 'May', actual: 4.2, predicted: 4.5, confidence: [4.2, 4.8] },
    { month: 'Jun', actual: 5.1, predicted: 5.3, confidence: [5.0, 5.6] },
    { month: 'Jul', actual: null, predicted: 6.2, confidence: [5.8, 6.5] },
    { month: 'Aug', actual: null, predicted: 7.1, confidence: [6.7, 7.4] },
    { month: 'Sep', actual: null, predicted: 7.8, confidence: [7.4, 8.2] },
  ],
  insights: [
    {
      type: 'positive',
      message: 'Yield trending 15% above last year',
    },
    {
      type: 'warning',
      message: 'Weather conditions may affect August yields',
    },
    {
      type: 'neutral',
      message: 'Historical yield patterns suggest steady growth',
    },
  ],
  summary: {
    predictedYield: 7.8,
    previousYear: 6.8,
    changePercent: 14.7,
    confidenceRange: [7.4, 8.2],
  },
};

interface YieldForecastingProps {
  crop: string;
  period: string;
  region: string;
}

const YieldForecasting = ({ crop, period, region }: YieldForecastingProps) => {
  const { forecasts, insights, summary } = sampleData;

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Sprout className="h-5 w-5 text-blue-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'text-green-700 bg-green-50';
      case 'warning':
        return 'text-amber-700 bg-amber-50';
      default:
        return 'text-blue-700 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Predicted Yield</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold">
              {summary.predictedYield.toFixed(1)}
            </p>
            <span className="ml-1 text-sm text-gray-500">tons/ha</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Range: {summary.confidenceRange[0].toFixed(1)} - {summary.confidenceRange[1].toFixed(1)}
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">vs Previous Year</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold text-green-600">
              +{summary.changePercent}%
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Previous: {summary.previousYear.toFixed(1)} tons/ha
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Forecast Accuracy</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold">95%</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Based on historical predictions
          </p>
        </Card>
      </div>

      {/* Forecast Chart */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Yield Forecast Trend</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={forecasts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                dataKey="confidence"
                fill="#f0f9ff"
                stroke="none"
                name="Confidence Interval"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#2563eb"
                strokeWidth={2}
                name="Actual Yield"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#7c3aed"
                strokeDasharray="5 5"
                strokeWidth={2}
                name="Predicted Yield"
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className={`p-4 ${getInsightColor(insight.type)}`}>
            <div className="flex items-start gap-3">
              {getInsightIcon(insight.type)}
              <p className="text-sm">{insight.message}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YieldForecasting; 