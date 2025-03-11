import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CircleUserRound, Settings, LogOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/hooks/context/useAuthContext';

function ProfileDropdown() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleSignOut = () => {
    logout();
    queryClient.removeQueries({ queryKey: ['user'] });
    queryClient.removeQueries({ queryKey: ['projects'] });
    navigate('/login');
  };

  return (
    <Menu>
      <MenuButton className='flex items-center space-x-2 px-1 py-2 sm:px-0 sm:py-0 text-gray-50 hover:text-gray-200'>
        <CircleUserRound size={20} />
        <span>Profile</span>
      </MenuButton>

      <MenuItems
        anchor='bottom start'
        className='absolute right-0 w-56 mt-4 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
      >
        <MenuItem>
          <Link
            to='/profile'
            className='flex items-center gap-2 w-full px-4 py-2 text-base text-gray-600 hover:bg-gray-100'
          >
            <Settings size={20} className='text-gray-500' />
            Settings
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            type='button'
            className='flex items-center gap-2 w-full px-4 py-2 text-base text-gray-600 hover:bg-gray-100'
            onClick={handleSignOut}
          >
            <LogOut size={20} className='text-gray-500' />
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default ProfileDropdown;
