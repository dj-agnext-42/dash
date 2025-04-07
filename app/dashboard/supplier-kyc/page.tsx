'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import ComplianceDocuments from '@/components/supplier-kyc/ComplianceDocuments';
import QualityTestResults from '@/components/supplier-kyc/QualityTestResults';
import InspectionMetrics from '@/components/supplier-kyc/InspectionMetrics';

export default function SupplierKYCDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('monthly');
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Supplier KYC Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => alert('Downloading compliance report...')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              aria-label="Download compliance report"
            >
              Export Report
            </button>
            <button
              onClick={() => alert('Opening supplier audit history...')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              aria-label="View audit history"
            >
              Audit History
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
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            aria-label="Select supplier"
          >
            <option value="">All Suppliers</option>
            <option value="supplier1">Green Farms Ltd</option>
            <option value="supplier2">Fresh Produce Co</option>
            <option value="supplier3">Organic Harvests Inc</option>
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

        {/* Alert Banner for Non-Compliant Suppliers */}
        {selectedSupplier && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  2 suppliers have compliance scores below 80%. Review required.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Documentation */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Compliance Documentation</h2>
          <ComplianceDocuments
            period={selectedPeriod}
            supplier={selectedSupplier}
            region={selectedRegion}
          />
        </Card>

        {/* Quality Test Results */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Quality Test Results</h2>
          <QualityTestResults
            period={selectedPeriod}
            supplier={selectedSupplier}
            region={selectedRegion}
          />
        </Card>

        {/* Pre-loading Inspection */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Pre-loading Inspection</h2>
          <InspectionMetrics
            period={selectedPeriod}
            supplier={selectedSupplier}
            region={selectedRegion}
          />
        </Card>

        {/* Supplier Performance Trends */}
        <Card className="p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Performance Trends</h2>
          <div className="h-[400px]">
            <QualityTestResults
              period={selectedPeriod}
              supplier={selectedSupplier}
              region={selectedRegion}
              view="trends"
            />
          </div>
        </Card>

        {/* Risk Assessment */}
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
          <div className="h-[400px]">
            <ComplianceDocuments
              period={selectedPeriod}
              supplier={selectedSupplier}
              region={selectedRegion}
              view="risk"
            />
          </div>
        </Card>
      </div>
    </div>
  );
} 