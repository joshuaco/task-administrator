import { FolderPlus, ListPlus, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  type: 'projects' | 'tasks' | 'team';
}

function EmptyState({ type }: EmptyStateProps) {
  const config = {
    projects: {
      icon: FolderPlus,
      title: 'No Projects Yet',
      description: 'Get started by creating your first project',
      buttonText: 'Create Project'
    },
    tasks: {
      icon: ListPlus,
      title: 'No Tasks Yet',
      description: 'Add tasks to track progress on this project',
      buttonText: 'Add Task'
    },
    team: {
      icon: Users2,
      title: 'No Team Members Yet',
      description: 'Start building your team by adding members'
    }
  }[type];

  const Icon = config.icon;

  return (
    <>
      <div className='text-center py-12'>
        <Icon className='mx-auto h-12 w-12 text-gray-400' />
        <h3 className='mt-2 text-lg font-medium text-gray-900'>
          {config.title}
        </h3>
        <p className='mt-1 text-sm text-gray-500'>{config.description}</p>

        {type === 'projects' && (
          <div className='mt-6'>
            <Link
              to='/projects/create'
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            >
              <Icon className='h-5 w-5 mr-2' />
              {config.buttonText}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default EmptyState;
