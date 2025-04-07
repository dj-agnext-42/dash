import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

// Sample data - replace with real data from your API
const sampleData = {
  tasks: [
    {
      id: 'T001',
      name: 'Morning Irrigation Check',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Team A',
      progress: 100,
      dueTime: '08:00 AM'
    },
    {
      id: 'T002',
      name: 'Fertilizer Application - Field B',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'Team B',
      progress: 65,
      dueTime: '10:30 AM'
    },
    {
      id: 'T003',
      name: 'Equipment Maintenance',
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Maintenance Team',
      progress: 0,
      dueTime: '02:00 PM'
    },
    {
      id: 'T004',
      name: 'Harvest Planning',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'Management',
      progress: 80,
      dueTime: '04:00 PM'
    }
  ],
  summary: {
    completed: 5,
    inProgress: 2,
    pending: 1,
    total: 8
  }
};

interface TaskManagementProps {
  farmId: string;
  date: string;
}

const TaskManagement = ({ farmId, date }: TaskManagementProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold mt-1">{sampleData.summary.total}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {sampleData.summary.completed}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {sampleData.summary.inProgress}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-amber-500 mt-1">
            {sampleData.summary.pending}
          </p>
        </Card>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {sampleData.tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getStatusIcon(task.status)}
                <div>
                  <h4 className="font-medium">{task.name}</h4>
                  <div className="mt-1 space-x-3 text-sm">
                    <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                    <span className="text-gray-500">Due: {task.dueTime}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Assigned to: {task.assignedTo}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium mb-1">Progress</div>
                <Progress
                  value={task.progress}
                  className={`h-2 w-24 ${getStatusColor(task.status)}`}
                />
                <div className="text-sm text-gray-500 mt-1">{task.progress}%</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement; 