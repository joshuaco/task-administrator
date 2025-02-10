import Logo from '@/components/Logo';
import { Outlet } from 'react-router-dom';

function Auth() {
  return (
    <div
      className='min-h-screen flex items-center justify-center bg-gray-800 px-4
    py-12 sm:px-6 lg:px-8'
    >
      <div className='max-w-md w-full space-y-8'>
        <div className='w-1/2 mx-auto'>
          <Logo />
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Auth;
