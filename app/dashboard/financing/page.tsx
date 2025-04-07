'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import YieldMetrics from '@/components/financing/YieldMetrics';
import EfficiencyIndicators from '@/components/financing/EfficiencyIndicators';
import FinancialImpact from '@/components/financing/FinancialImpact';

export default function FinancingDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly');
  const [selectedFarm, setSelectedFarm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">CEO Financing Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => alert('Downloading financial report...')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              aria-label="Download financial report"
            >
              Download Report
            </button>
            <button
              onClick={() => alert('Opening scenario analysis...')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              aria-label="Run scenario analysis"
            >
              Scenario Analysis
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            aria-label="Select time period"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          
          <select
            className="p-2 border rounded-md"
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
            aria-label="Select farm"
          >
            <option value="">All Farms</option>
            <option value="farm1">Farm 1</option>
            <option value="farm2">Farm 2</option>
            <option value="farm3">Farm 3</option>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Yield Metrics */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Yield Performance</h2>
          <YieldMetrics
            period={selectedPeriod}
            farm={selectedFarm}
            region={selectedRegion}
          />
        </Card>

        {/* Efficiency Indicators */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Operational Efficiency</h2>
          <EfficiencyIndicators
            period={selectedPeriod}
            farm={selectedFarm}
            region={selectedRegion}
          />
        </Card>

        {/* Financial Impact */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Financial Impact</h2>
          <FinancialImpact
            period={selectedPeriod}
            farm={selectedFarm}
            region={selectedRegion}
          />
        </Card>

        {/* Storage Duration Analysis */}
        <Card className="p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Storage Duration vs. Optimal Freshness</h2>
          <div className="h-[400px]">
            <EfficiencyIndicators
              period={selectedPeriod}
              farm={selectedFarm}
              region={selectedRegion}
              view="storage"
            />
          </div>
        </Card>

        {/* Cost Analysis */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Cost Analysis</h2>
          <div className="h-[400px]">
            <FinancialImpact
              period={selectedPeriod}
              farm={selectedFarm}
              region={selectedRegion}
              view="costs"
            />
          </div>
        </Card>
      </div>
    </div>
  );
} 