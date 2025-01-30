import { Project } from '@/types';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react';
import { EllipsisVertical, Eye, Pencil, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '@/api/project';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { toast } from 'sonner';

interface ProjectDropdownProps {
  projectId: Project['_id'];
}

function ProjectDropdown({ projectId }: ProjectDropdownProps) {
  const queryClient = useQueryClient();
  const { mutate: deleteProjectMutation } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.info(data);
    }
  });
  return (
    <div className='flex shrink-0 items-center gap-x-6'>
      <Menu as='div' className='relative flex-none'>
        <MenuButton className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
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
                className='px-3 py-1 text-sm leading-6 text-gray-800 flex items-center'
              >
                <Eye className='h-4 w-4 inline mr-2 text-gray-500' />
                See Project
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to={`/projects/${projectId}/edit`}
                className='flex items-center px-3 py-1 text-sm leading-6 text-gray-800'
              >
                <Pencil className='h-4 w-4 inline mr-2 text-gray-500' />
                Edit
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                type='button'
                className='flex items-center px-3 py-1 text-sm leading-6 text-red-600'
                onClick={() => deleteProjectMutation(projectId)}
              >
                <Trash className='h-4 w-4 inline mr-2 text-red-600' />
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default ProjectDropdown;
