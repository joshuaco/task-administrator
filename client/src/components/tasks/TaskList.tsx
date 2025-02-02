import { Task } from '@/types';
import {
  statusTitle,
  statusPillColors,
  statusBorderColors
} from '@/utils/status';
import TaskDropdown from './TaskDropdown';

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <div className='space-y-4'>
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`flex sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3 hover:bg-gray-100 transition-colors border-t-4 ${
            statusBorderColors[task.status]
          } sm:border-t-0`}
        >
          <div>
            <h3 className='font-medium text-gray-900'>{task.name}</h3>
          </div>
          <div className='flex items-center gap-x-2'>
            <span
              className={`hidden sm:block px-3 py-1 rounded-full text-sm font-medium w-fit ${
                statusPillColors[task.status]
              }`}
            >
              {statusTitle(task.status)}
            </span>
            <TaskDropdown />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
