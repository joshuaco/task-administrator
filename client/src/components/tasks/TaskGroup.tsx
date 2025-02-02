import { Task } from '@/types';
import { getStatusTitle } from '@/utils/regex';
import {
  CheckCircle2,
  CircleDashed,
  Clock,
  Eye,
  PauseCircle
} from 'lucide-react';
import TaskCard from './TaskCard';

interface TaskGroupProps {
  tasks: Task[];
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

function TaskGroup({ tasks }: TaskGroupProps) {
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

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
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
                    {getStatusTitle(status)}
                  </h2>
                </div>
              </div>

              <ul className='space-y-3'>
                {tasks.length === 0 ? (
                  <li className='border-2 border-dashed border-gray-200 rounded-lg p-4'>
                    <p className='text-sm text-gray-500 text-center'>
                      No tasks {getStatusTitle(status).toLowerCase()}
                    </p>
                  </li>
                ) : (
                  tasks.map((task) => <TaskCard key={task._id} task={task} />)
                )}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default TaskGroup;
