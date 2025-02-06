import { Task } from '@/types';
import TaskDropdown from './TaskDropdown';

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <li
      className='p-3 bg-gray-50 rounded-lg hover:bg-gray-100 
      transition-colors flex justify-between gap-x-2'
    >
      <div className='min-w-0 flex flex-col gap-y-2'>
        <button
          type='button'
          className='text-base font-semibold text-slate-600 text-left'
        >
          {task.name}
        </button>

        {task.description && (
          <p className='text-sm text-slate-500'>{task.description}</p>
        )}
      </div>
      <div className='mt-1'>
        <TaskDropdown taskId={task._id} />
      </div>
    </li>
  );
}

export default TaskCard;
