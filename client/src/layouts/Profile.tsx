import Tabs from '@/components/profile/Tabs';
import { Outlet } from 'react-router-dom';

function Profile() {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
}

export default Profile;
