import { TaskActivity } from '@/types';
import { History } from 'lucide-react';

interface TaskStatusLogProps {
  activities?: TaskActivity[];
}

function TaskStatusLog({ activities }: TaskStatusLogProps) {
  return (
    <div className='space-y-2'>
      <h4 className='font-medium text-sm text-gray-700 flex items-center bg-white py-2'>
        <History className='h-5 w-5 mr-2' />
        Activity History
      </h4>
      {activities && (
        <div className='space-y-3'>
          {activities.length === 0 ? (
            <p className='text-sm text-gray-500'>No activity recorded yet.</p>
          ) : (
            <ul className='relative'>
              <div className='absolute top-0 bottom-0 left-2 w-0.5 bg-gray-200' />
              {activities.map((activity) => (
                <li key={activity._id} className='relative pl-8 pb-4'>
                  <div className='absolute left-0 top-4 w-4 h-4 rounded-full bg-white border-2 border-indigo-500' />
                  <div className='bg-gray-50 rounded-lg p-3'>
                    <p className='text-sm text-gray-600'>
                      <span className='font-medium text-gray-900'>
                        {activity.user.name}
                      </span>
                      {' changed status to '}
                      <span className='font-medium'>{activity.status}</span>
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskStatusLog;
