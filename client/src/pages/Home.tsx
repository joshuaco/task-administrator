import { getFullDate } from '@/utils/date';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <p className='text-lg font-medium text-gray-500 mt-5'>
          {getFullDate()}
        </p>
        <h1 className='text-4xl font-semibold'>Welcome back, User</h1>
      </div>

      <nav>
        <Link
          to='/projects/create'
          className='flex items-center bg-purple-500 hover:bg-purple-600 text-white text-lg font-medium py-2 px-4 rounded-xl transition-colors'
        >
          <Plus className='inline' />
          <p className='hidden md:block ml-2'>New Project</p>
        </Link>
      </nav>
    </div>
  );
}

export default Home;
