import { EllipsisVertical, Eye, Pencil, Trash2 } from 'lucide-react';
import { useDeleteTask } from '@/hooks/task/useDeleteTask';
import { useGetTask } from '@/hooks/task/useGetTask';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { Task } from '@/types';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react';

interface TaskDropdownProps {
  task: Task;
}

function TaskDropdown({ task }: TaskDropdownProps) {
  const navigate = useNavigate();
  const { projectId } = useGetTask();
  const { deleteTaskMutation } = useDeleteTask();

  const handleEditTask = () => {
    navigate(`${location.pathname}?editTask=${task._id}`);
  };

  const handleDeleteTask = async () => {
    await deleteTaskMutation({ projectId, taskId: task._id });
  };

  return (
    <>
      <div className='flex shrink-0 gap-x-6'>
        <Menu as='div' className='relative flex-none'>
          <MenuButton
            className='-m-2.5 block p-2 text-gray-500 
        hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors'
          >
            <span className='sr-only'>options</span>
            <EllipsisVertical className='h-5 w-5' aria-hidden='true' />
          </MenuButton>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <MenuItems className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <MenuItem>
                <button
                  type='button'
                  className={`group flex items-center px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100`}
                >
                  <Eye className='h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-500' />
                  Show Task
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type='button'
                  className={`group flex items-center px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100`}
                  onClick={handleEditTask}
                >
                  <Pencil className='h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-500' />
                  Edit Task
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type='button'
                  className={`group flex items-center px-4 py-2 text-sm text-red-500 hover:text-red-600 w-full hover:bg-gray-100`}
                  onClick={handleDeleteTask}
                >
                  <Trash2 className='h-5 w-5 mr-3 text-red-500 group-hover:text-red-600' />
                  Delete Task
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
      {/* Delete Modal */}
    </>
  );
}

export default TaskDropdown;
