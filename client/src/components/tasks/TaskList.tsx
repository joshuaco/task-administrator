import { Task } from '@/types';
import {
  statusTitle,
  statusPillColors,
  statusBorderColors
} from '@/utils/status';
import TaskDropdown from './TaskDropdown';
import { useNavigate } from 'react-router-dom';

interface TaskListProps {
  tasks: Task[];
  userId: string;
  managerId: string;
}

function TaskList({ tasks, userId, managerId }: TaskListProps) {
  const navigate = useNavigate();
  const sortedTasks = tasks.sort((a, b) => {
    const statusOrder = {
      pending: 0,
      'on-hold': 1,
      'in-progress': 2,
      'under-review': 3,
      completed: 4
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const handleViewTask = (taskId: string) => {
    navigate(`${location.pathname}?viewTask=${taskId}`);
  };

  return (
    <div className='space-y-4'>
      {sortedTasks.map((task) => (
        <div
          key={task._id}
          className={`flex sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3 hover:bg-gray-100 transition-colors border-t-4 ${
            statusBorderColors[task.status]
          } sm:border-t-0`}
        >
          <div>
            <button
              className='font-medium text-gray-900'
              onClick={() => handleViewTask(task._id)}
            >
              {task.name}
            </button>
          </div>
          <div className='flex items-center gap-x-2'>
            <span
              className={`hidden sm:block px-3 py-1 rounded-full text-sm font-medium w-fit sm:mr-2 ${
                statusPillColors[task.status]
              }`}
            >
              {statusTitle(task.status)}
            </span>
            <TaskDropdown task={task} userId={userId} managerId={managerId} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
