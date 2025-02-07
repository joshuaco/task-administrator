import { Bookmark, Calendar, Clock, User, X } from 'lucide-react';
import { useGetTask } from '@/hooks/task/useGetTask';
import { Navigate, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react';

export default function TaskModalDetails() {
  const navigate = useNavigate();
  const { viewTaskId, taskData, isError, error, projectId } = useGetTask();
  const show = viewTaskId ? true : false;

  const handleClose = () => {
    navigate(location.pathname, { replace: true });
  };

  if (isError) {
    toast.error(error?.message, { id: 'task-modal-error' });
    return <Navigate to={`/projects/${projectId}`} />;
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/60' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-2xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-lg transition-all py-4 px-6'>
                <div className='w-full flex justify-between items-center'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium w-fit bg-blue-100 text-blue-800`}
                  >
                    {taskData?.project.projectName || 'Task'}
                  </span>
                  <button
                    className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    onClick={handleClose}
                  >
                    <X className='h-6 w-6' />
                  </button>
                </div>
                <DialogTitle
                  as='h3'
                  className='text-xl font-semibold text-gray-900 my-2'
                >
                  {taskData?.name}
                </DialogTitle>
                <div className='space-y-2 my-4'>
                  <h4 className='text-sm font-medium text-gray-700'>
                    Description
                  </h4>
                  <p className='text-gray-600 whitespace-pre-wrap'>
                    {taskData?.description || 'No description provided.'}
                  </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <h4 className='text-sm font-medium text-gray-700'>
                      Details
                    </h4>
                    <div className='space-y-3'>
                      <div className='flex items-center text-gray-600'>
                        <User className='h-5 w-5 mr-2' />
                        <span>Assigned to John Doe and 3 others</span>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <Bookmark className='h-5 w-5 mr-2' />
                        <span>Status: {taskData?.status}</span>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <Calendar className='h-5 w-5 mr-2' />
                        <span>Due: {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <h4 className='text-sm font-medium text-gray-700'>
                      Timeline
                    </h4>
                    <div className='space-y-3'>
                      <div className='flex items-center text-gray-600'>
                        <Clock className='h-5 w-5 mr-2' />
                        <span>Created: {new Date().toLocaleDateString()}</span>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <Clock className='h-5 w-5 mr-2' />
                        <span>Updated: {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <button
                    type='button'
                    onClick={handleClose}
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
