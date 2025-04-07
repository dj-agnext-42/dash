import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - replace with real data from your API
const sampleData = [
  { time: '08:00', temperature: 13.5 },
  { time: '09:00', temperature: 13.8 },
  { time: '10:00', temperature: 14.2 },
  { time: '11:00', temperature: 14.5 },
  { time: '12:00', temperature: 13.9 },
  { time: '13:00', temperature: 13.2 },
  { time: '14:00', temperature: 13.7 },
];

interface TemperatureGaugeProps {
  phase: string;
  shipmentId: string;
}

const TemperatureGauge = ({ phase, shipmentId }: TemperatureGaugeProps) => {
  const [hasAlert, setHasAlert] = useState(false);
  const minTemp = 13;
  const maxTemp = 14;

  useEffect(() => {
    // Check if any temperature readings are outside the acceptable range
    const tempOutOfRange = sampleData.some(
      (data) => data.temperature < minTemp || data.temperature > maxTemp
    );
    setHasAlert(tempOutOfRange);
  }, []);

  return (
    <div className="space-y-4">
      {hasAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <strong className="font-bold">Alert!</strong>
          <span className="block sm:inline"> Temperature outside acceptable range (13-14°C)</span>
        </div>
      )}
      
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sampleData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              domain={[12, 15]}
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip formatter={(value) => `${value}°C`} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: '#2563eb' }}
            />
            {/* Reference lines for acceptable temperature range */}
            <Line
              type="monotone"
              dataKey={() => minTemp}
              stroke="#dc2626"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <Line
              type="monotone"
              dataKey={() => maxTemp}
              stroke="#dc2626"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TemperatureGauge; 