import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  CheckSquare,
  CircleUserRound,
  FolderKanban,
  Menu,
  X
} from 'lucide-react';
import Logo from './Logo';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='max-w-screen-2xl'>
      <div className='mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <div className='w-32'>
            <Link to='/' className='flex items-center'>
              <Logo />
            </Link>
          </div>

          <div className='flex items-center px-2'>
            <div className='hidden md:flex items-center space-x-8'>
              <a
                href='/projects'
                className='flex items-center space-x-2 text-gray-50 hover:text-gray-200'
              >
                <FolderKanban size={20} />
                <span>My Projects</span>
              </a>
              <a
                href='/tasks'
                className='flex items-center space-x-2 text-gray-50 
        hover:text-gray-200'
              >
                <CheckSquare size={20} />
                <span>My Tasks</span>
              </a>
              <button className='flex items-center space-x-2 text-gray-50 hover:text-gray-200'>
                <CircleUserRound size={20} />
                <span>Profile</span>
              </button>
            </div>

            <div className='md:hidden flex items-center'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='text-gray-50 hover:text-gray-200 focus:outline-none'
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden'>
          <div className='px-8 pt-2 pb-3 space-y-1'>
            <a
              href='/projects'
              className='flex items-center space-x-2 px-3 py-2 text-gray-50 hover:text-gray-200'
            >
              <FolderKanban size={20} />
              <span>My Projects</span>
            </a>
            <a
              href='/tasks'
              className='flex items-center space-x-2 px-3 py-2 text-gray-50 hover:text-gray-200'
            >
              <CheckSquare size={20} />
              <span>My Tasks</span>
            </a>
            <button className='flex items-center space-x-2 px-3 py-2 text-gray-50 hover:text-gray-200'>
              <CircleUserRound size={20} />
              <span>User</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
