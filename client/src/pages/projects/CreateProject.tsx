import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProjectForm from '@/components/forms/ProjectForm';

function CreateProject() {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <div className='mt-5'>
          <h2 className='text-3xl sm:text-4xl font-semibold'>
            Create a new project
          </h2>
          <p className='text-lg font-medium text-gray-500'>
            Fill out the form below to create a new project.
          </p>
        </div>

        <nav className='hidden sm:block'>
          <Link
            to='/'
            className='flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white text-lg font-medium py-2 px-4 rounded-xl transition-colors mt-6 sm:mt-0'
          >
            <ChevronLeft className='inline' />
            <p className='ml-2'>Go Back</p>
          </Link>
        </nav>
      </div>

      <div className='mt-4 sm:mt-6 bg-white shadow-lg p-10 rounded-xl'>
        <ProjectForm />
      </div>
    </>
  );
}

export default CreateProject;
