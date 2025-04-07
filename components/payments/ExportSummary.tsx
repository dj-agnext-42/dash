import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, ArrowDown, DollarSign } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  daily: {
    totalExported: 14750,
    previousTotal: 14200,
    targetQuantity: 15000,
    ratePerKg: 2.5,
    qualityBonus: 0.2,
  },
  weekly: {
    totalExported: 73000,
    previousTotal: 71500,
    targetQuantity: 75000,
    ratePerKg: 2.5,
    qualityBonus: 0.2,
  },
  monthly: {
    totalExported: 268300,
    previousTotal: 265000,
    targetQuantity: 280000,
    ratePerKg: 2.5,
    qualityBonus: 0.2,
  },
};

interface ExportSummaryProps {
  period: 'daily' | 'weekly' | 'monthly';
  batchId: string;
}

const ExportSummary = ({ period, batchId }: ExportSummaryProps) => {
  const data = sampleData[period];
  
  const percentageOfTarget = (data.totalExported / data.targetQuantity) * 100;
  const percentageChange = ((data.totalExported - data.previousTotal) / data.previousTotal) * 100;
  const basePayment = data.totalExported * data.ratePerKg;
  const qualityBonusAmount = data.totalExported * data.qualityBonus;
  const totalPayment = basePayment + qualityBonusAmount;

  return (
    <div className="space-y-6">
      {/* Total Export Quantity */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Exported</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {data.totalExported.toLocaleString()} kg
          </span>
          <span className={`text-sm font-medium flex items-center gap-1 ${
            percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {percentageChange >= 0 ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {Math.abs(percentageChange).toFixed(1)}%
          </span>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Target</span>
            <span>{percentageOfTarget.toFixed(1)}%</span>
          </div>
          <Progress value={percentageOfTarget} className="h-2" />
        </div>
      </Card>

      {/* Payment Calculation */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Payment Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Base Rate</span>
            </div>
            <span className="text-sm font-medium">
              ${data.ratePerKg.toFixed(2)}/kg
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Base Payment</span>
            <span className="text-sm font-medium">
              ${basePayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Quality Bonus</span>
            <span className="text-sm font-medium text-green-600">
              +${qualityBonusAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Payment</span>
              <span className="font-bold text-lg">
                ${totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Target Progress</h3>
          <div className="text-2xl font-bold text-blue-600">
            {((data.targetQuantity - data.totalExported) / 1000).toFixed(1)}t
          </div>
          <p className="text-sm text-gray-500 mt-1">Remaining to target</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Quality Rating</h3>
          <div className="text-2xl font-bold text-green-600">A+</div>
          <p className="text-sm text-gray-500 mt-1">Eligible for bonus</p>
        </Card>
      </div>
    </div>
  );
};

export default ExportSummary; 