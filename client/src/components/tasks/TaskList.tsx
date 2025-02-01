import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
}

function TaskList({ tasks }: TaskListProps) {
  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    completed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'on-hold': 'bg-red-100 text-red-800',
    'under-review': 'bg-yellow-100 text-yellow-800'
  } as const;

  return (
    <div className='space-y-4'>
      {tasks.map((task) => (
        <div
          key={task._id}
          className='flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3 hover:bg-gray-100 transition-colors'
        >
          <div>
            <h3 className='font-medium text-gray-900'>{task.name}</h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
              statusColors[task.status]
            }`}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
