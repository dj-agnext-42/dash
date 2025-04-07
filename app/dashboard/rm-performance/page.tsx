'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import SoilQualityMetrics from '@/components/rm-performance/SoilQualityMetrics';
import ProductQualityMetrics from '@/components/rm-performance/ProductQualityMetrics';
import StorageImpactAnalysis from '@/components/rm-performance/StorageImpactAnalysis';

export default function RMPerformanceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [selectedFarm, setSelectedFarm] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');

  const handlePeriodChange = (period: 'daily' | 'weekly' | 'monthly'): void => {
    setSelectedPeriod(period);
  };

  const handleFarmChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedFarm(e.target.value);
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBatch(e.target.value);
  };

  const handleExportReport = (): void => {
    alert('Downloading performance report...');
  };

  const handleCorrelationAnalysis = (): void => {
    alert('Opening correlation analysis...');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">RM and Product Performance Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={handleExportReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              aria-label="Download performance report"
            >
              Export Report
            </button>
            <button
              onClick={handleCorrelationAnalysis}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              aria-label="Run correlation analysis"
            >
              Correlation Analysis
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value as 'daily' | 'weekly' | 'monthly')}
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
            onChange={handleFarmChange}
            aria-label="Select farm"
          >
            <option value="">All Farms</option>
            <option value="farm1">Farm 1</option>
            <option value="farm2">Farm 2</option>
            <option value="farm3">Farm 3</option>
          </select>

          <select
            className="p-2 border rounded-md"
            value={selectedBatch}
            onChange={handleBatchChange}
            aria-label="Select batch"
          >
            <option value="">All Batches</option>
            <option value="batch1">Batch #001</option>
            <option value="batch2">Batch #002</option>
            <option value="batch3">Batch #003</option>
          </select>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Soil Quality Metrics */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Soil Quality Analysis</h2>
          <SoilQualityMetrics
            period={selectedPeriod}
            farm={selectedFarm}
            batch={selectedBatch}
          />
        </Card>

        {/* Product Quality Metrics */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Product Quality Metrics</h2>
          <ProductQualityMetrics
            period={selectedPeriod}
            farm={selectedFarm}
            batch={selectedBatch}
          />
        </Card>

        {/* Resource Management */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Resource Management</h2>
          <StorageImpactAnalysis
            period={selectedPeriod}
            farm={selectedFarm}
            batch={selectedBatch}
            view="resources"
          />
        </Card>

        {/* Storage Impact Analysis */}
        <Card className="p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Storage Condition Impact</h2>
          <div className="h-[400px]">
            <StorageImpactAnalysis
              period={selectedPeriod}
              farm={selectedFarm}
              batch={selectedBatch}
              view="impact"
            />
          </div>
        </Card>

        {/* Quality Correlation */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quality Correlation</h2>
          <div className="h-[400px]">
            <ProductQualityMetrics
              period={selectedPeriod}
              farm={selectedFarm}
              batch={selectedBatch}
              view="correlation"
            />
          </div>
        </Card>
      </div>
    </div>
  );
} 