import { useProjectMutation } from '@/hooks/projects/useProjectMutation';
import { Project } from '@/types';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react';
import { EllipsisVertical, Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

interface ProjectDropdownProps {
  projectId: Project['_id'];
}

function ProjectDropdown({ projectId }: ProjectDropdownProps) {
  const { deleteProjectMutation } = useProjectMutation({});
  return (
    <div className='flex shrink-0 gap-x-6'>
      <Menu as='div' className='relative flex-none'>
        <MenuButton className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors'>
          <span className='sr-only'>Options</span>
          <EllipsisVertical className='h-5 w-5' />
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
              <Link
                to={`/projects/${projectId}`}
                className='flex items-center px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100'
              >
                <Eye className='h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-500' />
                View Project
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to={`/projects/${projectId}/edit`}
                className='flex items-center px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-100'
              >
                <Pencil className='h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-500' />
                Edit Project
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                type='button'
                className='flex items-center px-4 py-2 text-sm text-red-500 hover:text-red-600 w-full hover:bg-gray-100'
                onClick={() => deleteProjectMutation(projectId)}
              >
                <Trash2 className='h-5 w-5 mr-3 text-red-500 group-hover:text-red-600' />
                Delete Project
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default ProjectDropdown;
