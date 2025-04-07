interface ConditionReport {
  id: string;
  date: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  notes: string;
  damagePercentage: number;
}

// Sample data - replace with real data from your API
const sampleData: ConditionReport[] = [
  {
    id: 'SHP001',
    date: '2024-04-03',
    condition: 'Good',
    notes: 'Minor bruising on 5% of the produce',
    damagePercentage: 5,
  },
  {
    id: 'SHP002',
    date: '2024-04-02',
    condition: 'Excellent',
    notes: 'No visible damage',
    damagePercentage: 0,
  },
  {
    id: 'SHP003',
    date: '2024-04-01',
    condition: 'Fair',
    notes: 'Some discoloration and bruising',
    damagePercentage: 15,
  },
];

interface ShipmentConditionProps {
  phase: string;
  shipmentId: string;
}

const ShipmentCondition = ({ phase, shipmentId }: ShipmentConditionProps) => {
  const getConditionColor = (condition: ConditionReport['condition']) => {
    const colors = {
      Excellent: 'bg-green-100 text-green-800',
      Good: 'bg-blue-100 text-blue-800',
      Fair: 'bg-yellow-100 text-yellow-800',
      Poor: 'bg-red-100 text-red-800',
    };
    return colors[condition];
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Damage %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sampleData.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => alert(`Notes: ${report.notes}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    alert(`Notes: ${report.notes}`);
                  }
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(report.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getConditionColor(report.condition)}`}>
                    {report.condition}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.damagePercentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Click on a row to view detailed notes
      </p>
    </div>
  );
};

export default ShipmentCondition; 