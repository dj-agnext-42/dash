'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import EquipmentUtilization from '@/components/operations/EquipmentUtilization';
import ResourceAllocation from '@/components/operations/ResourceAllocation';
import TaskManagement from '@/components/operations/TaskManagement';

export default function OperationsDashboard() {
  const [selectedFarm, setSelectedFarm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
          <button
            onClick={() => alert('Generating operations report...')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            aria-label="Generate operations report"
          >
            Generate Report
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-4 mb-6">
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
          
          <input
            type="date"
            className="p-2 border rounded-md"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            aria-label="Select date"
          />
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-4 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Equipment Utilization</h2>
          <EquipmentUtilization farmId={selectedFarm} date={selectedDate} />
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Resource Allocation</h2>
          <ResourceAllocation farmId={selectedFarm} date={selectedDate} />
        </Card>

        <Card className="p-4 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Task Management</h2>
          <TaskManagement farmId={selectedFarm} date={selectedDate} />
        </Card>
      </div>
    </div>
  );
} 