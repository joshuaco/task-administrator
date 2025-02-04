import { EllipsisVertical, Eye, Pencil, Trash } from 'lucide-react';
import { useDeleteTask } from '@/hooks/task/useDeleteTask';
import { useGetTask } from '@/hooks/task/useGetTask';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react';

interface TaskDropdownProps {
  taskId: string;
}

function TaskDropdown({ taskId }: TaskDropdownProps) {
  const navigate = useNavigate();
  const { projectId } = useGetTask();
  const { deleteTaskMutation } = useDeleteTask();

  const handleEditTask = () => {
    navigate(`${location.pathname}?editTask=${taskId}`);
  };

  const handleDeleteTask = async () => {
    await deleteTaskMutation({ projectId, taskId });
  };

  return (
    <div className='flex shrink-0 gap-x-6'>
      <Menu as='div' className='relative flex-none'>
        <MenuButton className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
          <span className='sr-only'>opciones</span>
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
          <MenuItems className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
            <MenuItem>
              <button
                type='button'
                className='px-3 py-1 text-sm leading-6 text-gray-600 flex items-center gap-x-2'
              >
                <Eye className='h-4 w-4 inline' />
                See Task
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type='button'
                className='px-3 py-1 text-sm leading-6 text-gray-600 flex items-center gap-x-2'
                onClick={handleEditTask}
              >
                <Pencil className='h-4 w-4 inline' />
                Edit Task
              </button>
            </MenuItem>

            <MenuItem>
              <button
                type='button'
                className='px-3 py-1 text-sm leading-6 text-red-500 flex items-center gap-x-2'
                onClick={handleDeleteTask}
              >
                <Trash className='h-4 w-4 inline' />
                Delete Task
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default TaskDropdown;
