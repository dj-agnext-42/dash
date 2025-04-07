'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import QualityAssessment from '@/components/samples-crm/QualityAssessment';
import GradeDistribution from '@/components/samples-crm/GradeDistribution';
import LabelingAccuracy from '@/components/samples-crm/LabelingAccuracy';

export default function SamplesCRMDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Samples CRM Dashboard</h1>
          <button
            onClick={() => alert('Generating quality report...')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            aria-label="Generate quality report"
          >
            Generate Report
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            aria-label="Select customer"
          >
            <option value="">All Customers</option>
            <option value="customer1">Fresh Foods Co.</option>
            <option value="customer2">Global Grocers</option>
            <option value="customer3">Premium Produce Ltd.</option>
          </select>
          
          <select
            className="p-2 border rounded-md"
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            aria-label="Select market"
          >
            <option value="">All Markets</option>
            <option value="eu">European Union</option>
            <option value="us">United States</option>
            <option value="asia">Asia Pacific</option>
          </select>

          <select
            className="p-2 border rounded-md"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            aria-label="Select batch"
          >
            <option value="">All Batches</option>
            <option value="batch1">Batch #2024-001</option>
            <option value="batch2">Batch #2024-002</option>
            <option value="batch3">Batch #2024-003</option>
          </select>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Quality Assessment</h2>
          <QualityAssessment 
            customer={selectedCustomer}
            market={selectedMarket}
            batch={selectedBatch}
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
          <GradeDistribution
            customer={selectedCustomer}
            market={selectedMarket}
            batch={selectedBatch}
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Labeling Accuracy</h2>
          <LabelingAccuracy
            customer={selectedCustomer}
            market={selectedMarket}
            batch={selectedBatch}
          />
        </Card>
      </div>
    </div>
  );
} 