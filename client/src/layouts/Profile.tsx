import Tabs from '@/components/profile/Tabs';
import { Outlet } from 'react-router-dom';

function Profile() {
  return (
    <>
      <div className='bg-gray-50 pt-1 sm:pt-3'>
        <div className='max-w-screen-md mx-auto'>
          <div className='bg-white shadow-sm rounded-lg px-4 sm:px-6 pb-4'>
            <div className='py-4'>
              <h1 className='text-3xl font-semibold text-gray-900'>Settings</h1>
              <p className='mt-2 text-base text-gray-500'>
                Manage your account settings and preferences
              </p>
            </div>
            <Tabs />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
