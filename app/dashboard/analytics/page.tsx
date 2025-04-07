'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import YieldForecasting from '@/components/analytics/YieldForecasting';
import WeatherImpact from '@/components/analytics/WeatherImpact';
import MarketTrends from '@/components/analytics/MarketTrends';

export default function AnalyticsDashboard() {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <button
            onClick={() => alert('Downloading analytics report...')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Download analytics report"
          >
            Download Report
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            aria-label="Select crop"
          >
            <option value="">All Crops</option>
            <option value="corn">Corn</option>
            <option value="wheat">Wheat</option>
            <option value="soybeans">Soybeans</option>
          </select>
          
          <select
            className="p-2 border rounded-md"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            aria-label="Select time period"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>

          <select
            className="p-2 border rounded-md"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            aria-label="Select region"
          >
            <option value="">All Regions</option>
            <option value="north">Northern Region</option>
            <option value="south">Southern Region</option>
            <option value="east">Eastern Region</option>
            <option value="west">Western Region</option>
          </select>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Yield Forecasting</h2>
          <YieldForecasting 
            crop={selectedCrop}
            period={selectedPeriod}
            region={selectedRegion}
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Weather Impact Analysis</h2>
          <WeatherImpact
            crop={selectedCrop}
            period={selectedPeriod}
            region={selectedRegion}
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Market Trends</h2>
          <MarketTrends
            crop={selectedCrop}
            period={selectedPeriod}
            region={selectedRegion}
          />
        </Card>
      </div>
    </div>
  );
} 