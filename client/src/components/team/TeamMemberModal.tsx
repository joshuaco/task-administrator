import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from '@headlessui/react';
import { XIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import TeamMemberForm from './TeamMemberForm';
import TeamMemberManagement from './TeamMemberManagement';

function TeamMemberModal() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const addMember = queryParams.get('addMember');
  const management = queryParams.get('management');
  const show = !!addMember || !!management;

  const closeModal = () => {
    navigate(location.pathname, { replace: true });
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => closeModal()}>
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
                <DialogPanel className='w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-lg transition-all py-6 px-8'>
                  <div className='flex justify-between items-center'>
                    <DialogTitle
                      as='h3'
                      className='text-xl font-semibold text-gray-900 mb-2'
                    >
                      {management ? 'Manage Team Members' : 'Add Team Member'}
                    </DialogTitle>
                    <button
                      className='p-1 sm:p-2 rounded-md hover:bg-gray-100 focus:outline-none'
                      onClick={() => closeModal()}
                    >
                      <XIcon className='h-6 w-6 text-gray-500' />
                    </button>
                  </div>
                  {management && <TeamMemberManagement onClose={closeModal} />}
                  {addMember && <TeamMemberForm />}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default TeamMemberModal;
