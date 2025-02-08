import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react';
import { UseMutateFunction } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

interface DeleteModalProps {
  title: string;
  name: string;
  id: string;
  onShow: boolean;
  onClose: () => void;
  onDelete: UseMutateFunction<void, Error, string, unknown>;
}

function DeleteModal({
  title,
  name,
  id,
  onClose,
  onShow,
  onDelete
}: DeleteModalProps) {
  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <>
      <Transition appear show={onShow} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => onClose()}>
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
                <DialogPanel className='w-full max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-lg transition-all py-4 px-6'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                      <AlertTriangle className='h-6 w-6 text-red-600' />
                    </div>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <DialogTitle
                        as='h3'
                        className='text-lg font-semibold leading-6 text-gray-900'
                      >
                        {title}
                      </DialogTitle>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          {`Are you sure you want to delete "${name}"? This action cannot be undone.`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                    <button
                      type='button'
                      onClick={handleDelete}
                      className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                    >
                      Delete
                    </button>
                    <button
                      type='button'
                      onClick={() => onClose()}
                      className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DeleteModal;
