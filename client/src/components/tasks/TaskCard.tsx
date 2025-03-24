import { Task } from '@/types';
import { useDraggable } from '@dnd-kit/core';
import TaskDropdown from './TaskDropdown';

interface TaskCardProps {
  task: Task;
  userId: string;
  managerId: string;
}

function TaskCard({ task, userId, managerId }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: {
      status: task.status
    }
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined;

  return (
    <li
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
      className='p-3 bg-gray-50 rounded-lg hover:bg-gray-100 
      transition-colors flex justify-between gap-x-2 cursor-grab active:cursor-grabbing'
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
        <TaskDropdown task={task} userId={userId} managerId={managerId} />
      </div>
    </li>
  );
}

export default TaskCard;
