import { Task, TaskStatus } from '@/types';
import { statusTitle } from '@/utils/status';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  CheckCircle2,
  CircleDashed,
  Clock,
  Eye,
  PauseCircle
} from 'lucide-react';
import DropTasks from './DropTasks';
import { useUpdateStatus } from '@/hooks/task/useUpdateStatus';

interface TaskGroupProps {
  tasks: Task[];
  userId: string;
  managerId: string;
}

type GroupedTasks = {
  [key: string]: {
    tasks: Task[];
    icon: React.ReactNode;
    color: string;
  };
};

const initialStatusGroups: GroupedTasks = {
  pending: {
    tasks: [],
    icon: <CircleDashed className='h-5 w-5' />,
    color: 'bg-gray-100 text-gray-800'
  },
  'on-hold': {
    tasks: [],
    icon: <PauseCircle className='h-5 w-5' />,
    color: 'bg-orange-100 text-orange-800'
  },
  'in-progress': {
    tasks: [],
    icon: <Clock className='h-5 w-5' />,
    color: 'bg-blue-100 text-blue-800'
  },
  'under-review': {
    tasks: [],
    icon: <Eye className='h-5 w-5' />,
    color: 'bg-yellow-100 text-yellow-800'
  },
  completed: {
    tasks: [],
    icon: <CheckCircle2 className='h-5 w-5' />,
    color: 'bg-green-100 text-green-800'
  }
};

function TaskGroup({ tasks, userId, managerId }: TaskGroupProps) {
  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const currentGroup = acc[task.status] ? acc[task.status].tasks : [];
      return {
        ...acc,
        [task.status]: {
          ...acc[task.status],
          tasks: [...currentGroup, task]
        }
      };
    },
    { ...initialStatusGroups }
  );

  const { updateStatusMutation, updateStatusOptimistic, projectId } =
    useUpdateStatus();

  const handleDragEnd = (e: DragEndEvent) => {
    document.body.style.overflow = '';
    const { over, active } = e;

    if (over && active.data.current!.status !== over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      updateStatusOptimistic(taskId, status);
      updateStatusMutation({ projectId, taskId, status });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 5
      }
    })
  );

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(
            ([status, { icon, color, tasks }]) => (
              <div
                key={status}
                className='bg-white rounded-lg shadow-sm p-4 sm:p-6'
              >
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-2'>
                    <span className={`p-2 rounded-lg ${color}`}>{icon}</span>
                    <h2 className='text-lg font-semibold text-gray-900'>
                      {statusTitle(status)}
                    </h2>
                  </div>
                </div>
                <DropTasks
                  tasks={tasks}
                  userId={userId}
                  managerId={managerId}
                  status={status}
                />
              </div>
            )
          )}
        </DndContext>
      </div>
    </div>
  );
}

export default TaskGroup;
