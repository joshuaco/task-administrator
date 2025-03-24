import { FolderX } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='flex justify-center items-center p-4'>
      <div className='text-center text-white'>
        <FolderX className='h-16 w-16 mx-auto mb-8' />
        <h1 className='text-4xl font-bold mb-6'>404 - Page not found</h1>
        <p className='text-lg'>
          Sorry, we couldn't find the page you're looking for. The page might
          have been removed, renamed, or doesn't exist.
        </p>

        <div className='mt-14'>
          <Link
            to='/'
            className='p-3 bg-purple-600 rounded-md text-white font-semibold hover:bg-purple-700 
            transition-all'
          >
            Take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
