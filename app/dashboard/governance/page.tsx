'use client';

import { Card } from '@/components/ui/card';
import RejectionRateChart from '@/components/governance/RejectionRateChart';
import QualityTestChart from '@/components/governance/QualityTestChart';
import ComplianceProgress from '@/components/governance/ComplianceProgress';
import { useState } from 'react';

export default function GovernanceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>('');

  const handlePeriodChange = (period: 'daily' | 'weekly' | 'monthly') => {
    setSelectedPeriod(period);
  };

  const handleShipmentChange = (shipmentId: string) => {
    setSelectedShipmentId(shipmentId);
  };

  const handleExportReport = () => {
    // In a real application, this would generate and download an audit report
    alert('Generating audit report...');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Governance Dashboard</h1>
          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Export audit report"
          >
            Export Report
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value as 'daily' | 'weekly' | 'monthly')}
            aria-label="Select time period"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          
          <input
            type="text"
            placeholder="Shipment ID"
            className="p-2 border rounded-md"
            value={selectedShipmentId}
            onChange={(e) => handleShipmentChange(e.target.value)}
            aria-label="Enter shipment ID"
          />
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Rejection Rate Trends</h2>
          <RejectionRateChart period={selectedPeriod} shipmentId={selectedShipmentId} />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quality Test Results</h2>
          <QualityTestChart period={selectedPeriod} shipmentId={selectedShipmentId} />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Compliance Documentation</h2>
          <ComplianceProgress period={selectedPeriod} shipmentId={selectedShipmentId} />
        </Card>
      </div>
    </div>
  );
} 