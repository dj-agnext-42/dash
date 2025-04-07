'use client';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SoilQualityMetrics from '@/components/compliance/SoilQualityMetrics';
import CropManagement from '@/components/compliance/CropManagement';
import QualityInspection from '@/components/compliance/QualityInspection';
import StorageConditions from '@/components/compliance/StorageConditions';
import { useState } from 'react';

export default function ComplianceDashboard() {
  const [selectedFarm, setSelectedFarm] = useState<string>('all');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedFacility, setSelectedFacility] = useState<string>('all');

  // Sample data - replace with real data from your API
  const farms = [
    { id: 'all', name: 'All Farms' },
    { id: 'farm1', name: 'Farm 1' },
    { id: 'farm2', name: 'Farm 2' },
    { id: 'farm3', name: 'Farm 3' },
  ];

  const facilities = [
    { id: 'all', name: 'All Facilities' },
    { id: 'facility1', name: 'Facility 1' },
    { id: 'facility2', name: 'Facility 2' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Compliance Dashboard</h1>
        
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            className="p-2 border rounded-md"
            value={selectedFarm}
            onChange={(e) => setSelectedFarm(e.target.value)}
            aria-label="Select farm"
          >
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.name}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Harvest Batch ID"
            className="p-2 border rounded-md"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            aria-label="Enter harvest batch ID"
          />

          <select
            className="p-2 border rounded-md"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            aria-label="Select storage facility"
          >
            {facilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dashboard Content */}
      <Tabs defaultValue="soil" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="soil">Soil Quality</TabsTrigger>
          <TabsTrigger value="crop">Crop Management</TabsTrigger>
          <TabsTrigger value="quality">Quality Inspection</TabsTrigger>
          <TabsTrigger value="storage">Storage Conditions</TabsTrigger>
        </TabsList>

        <TabsContent value="soil" className="space-y-4">
          <Card className="p-4">
            <SoilQualityMetrics
              farmId={selectedFarm}
              batchId={selectedBatch}
            />
          </Card>
        </TabsContent>

        <TabsContent value="crop" className="space-y-4">
          <Card className="p-4">
            <CropManagement
              farmId={selectedFarm}
              batchId={selectedBatch}
            />
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card className="p-4">
            <QualityInspection
              farmId={selectedFarm}
              batchId={selectedBatch}
            />
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card className="p-4">
            <StorageConditions
              facilityId={selectedFacility}
              batchId={selectedBatch}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 