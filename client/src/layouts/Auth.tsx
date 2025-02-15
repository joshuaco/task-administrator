import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Logo from '@/components/Logo';

function Auth() {
  return (
    <>
      <div
        className='min-h-screen flex justify-center bg-gray-800 px-4
    py-8 sm:px-6 lg:px-8'
      >
        <div className='max-w-md w-full space-y-6'>
          <div className='w-1/2 mx-auto'>
            <Logo />
          </div>

          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster richColors position='top-right' />
    </>
  );
}

export default Auth;
