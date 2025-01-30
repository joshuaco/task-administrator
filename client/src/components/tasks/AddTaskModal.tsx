import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react';

export default function AddTaskModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalOpen = queryParams.get('newTask') === 'true';

  console.log(modalOpen);

  return (
    <>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => navigate(location.pathname)}
        >
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
                <DialogPanel className='w-full max-w-4xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-lg transition-all p-4 sm:p-8'>
                  <DialogTitle as='h3' className='font-bold text-2xl mb-2'>
                    New Task
                  </DialogTitle>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
