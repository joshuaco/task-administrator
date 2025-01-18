import { getFullDate } from '@/utils/date';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
      <div className='mt-5'>
        <p className='text-lg font-medium text-gray-500'>{getFullDate()}</p>
        <h1 className='text-3xl sm:text-4xl font-semibold'>
          Welcome back, User
        </h1>
      </div>

      <nav className='w-full sm:w-auto'>
        <Link
          to='/projects/create'
          className='flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white text-lg font-medium py-2 px-4 
          rounded-xl transition-colors mt-6 sm:mt-0'
        >
          <Plus className='inline' />
          <p className='ml-2'>New Project</p>
        </Link>
      </nav>
    </div>
  );
}

export default Home;
