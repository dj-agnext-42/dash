'use client';

import { Card } from '@/components/ui/card';
import QuantityComparison from '@/components/payments/QuantityComparison';
import WeightConsistency from '@/components/payments/WeightConsistency';
import ExportSummary from '@/components/payments/ExportSummary';
import { useState } from 'react';

export default function PaymentsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedBatch, setSelectedBatch] = useState<string>('');

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedPeriod(e.target.value as 'daily' | 'weekly' | 'monthly');
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedBatch(e.target.value);
  };

  const handleExportData = (): void => {
    alert('Exporting data for accounting system...');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Payments Dashboard</h1>
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Export data for accounting"
          >
            Export for Accounting
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={selectedPeriod}
            onChange={handlePeriodChange}
            aria-label="Select time period"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          
          <input
            type="text"
            placeholder="Batch ID"
            className="p-2 border rounded-md"
            value={selectedBatch}
            onChange={handleBatchChange}
            aria-label="Enter batch ID"
          />
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Quantity Comparison</h2>
          <QuantityComparison period={selectedPeriod} batchId={selectedBatch} />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Weight per Box Consistency</h2>
          <WeightConsistency period={selectedPeriod} batchId={selectedBatch} />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Export Summary</h2>
          <ExportSummary period={selectedPeriod} batchId={selectedBatch} />
        </Card>
      </div>
    </div>
  );
} 