import { ArrowLeft, Pencil, Share2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '@/types';

interface ProjectHeaderProps {
  project: Project;
  text: string;
}

function ProjectHeader({ project, text }: ProjectHeaderProps) {
  const navigate = useNavigate();
  const goBack = () => {
    if (text === 'Back to Project') navigate(`/projects/${project._id}`);
    else navigate(`/`);
  };
  return (
    <header className='bg-white shadow-sm rounded-xl'>
      <div className='p-6'>
        <button
          onClick={goBack}
          className='inline-flex items-center text-gray-600 hover:text-gray-900 mb-4'
        >
          <ArrowLeft className='h-4 w-4 inline mr-2' />
          {text}
        </button>
        <div className='flex justify-between items-start'>
          <div>
            <div className='flex gap-3'>
              <h1 className='text-2xl sm:text-3xl font-semibold tracking-tight'>
                {project.projectName}
              </h1>
              <p className='self-end text-lg text-gray-500 font-semibold'>
                {project.clientName}
              </p>
            </div>
            <span
              className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800`}
            >
              In Progress
            </span>
          </div>
          <div className='space-x-3 hidden sm:flex'>
            <button className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'>
              <Share2 className='h-4 w-4 mr-2' />
              Share
            </button>
            <Link
              to={`/projects/${project._id}/edit`}
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none'
            >
              <Pencil className='h-4 w-4 mr-2' />
              Edit Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProjectHeader;
