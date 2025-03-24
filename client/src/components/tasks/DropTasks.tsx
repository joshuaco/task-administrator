import { statusTitle } from '@/utils/status';
import TaskCard from './TaskCard';
import { Task } from '@/types';
import { useDroppable } from '@dnd-kit/core';

interface DropTasksProps {
  tasks: Task[];
  userId: string;
  managerId: string;
  status: string;
}

function DropTasks({ tasks, userId, managerId, status }: DropTasksProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status
  });

  const style = {
    opacity: isOver ? 0.4 : undefined
  };

  return (
    <ul className='space-y-3' ref={setNodeRef} style={style}>
      {tasks.length === 0 ? (
        <li className='border-2 border-dashed border-gray-200 rounded-lg p-4'>
          <p className='text-sm text-gray-500 text-center'>
            No tasks {statusTitle(status).toLowerCase()}
          </p>
        </li>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            userId={userId}
            managerId={managerId}
          />
        ))
      )}
    </ul>
  );
}

export default DropTasks;
