import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Plus, Share2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/project';

function ProjectDetails() {
  const params = useParams();
  const projectId = params.projectId!;

  const { data: project, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    refetchOnWindowFocus: false,
    retry: false
  });

  if (isError) return <Navigate to='/404' />;

  if (project)
    return (
      <>
        <section className='mt-5 space-y-6'>
          <header className='bg-white shadow-sm rounded-xl'>
            <div className='p-6'>
              <Link
                to='/'
                className='inline-flex items-center text-gray-600 hover:text-gray-900 mb-4'
              >
                <ArrowLeft className='h-4 w-4 inline mr-2' />
                Back to Projects
              </Link>
              <div className='flex justify-between items-start'>
                <div>
                  <h1 className='text-2xl sm:text-3xl font-semibold tracking-tight'>
                    {project.projectName}
                  </h1>
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

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                  About
                </h2>
                <p className='text-gray-600'>{project.description}</p>
              </div>

              <div className='bg-white rounded-lg shadow-sm p-6 mt-6'>
                <div className='flex justify-between items-start'>
                  <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                    Tasks
                  </h2>
                  <button className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none'>
                    <Plus className='h-5 w-5 mr-2' />
                    Add Task
                  </button>
                </div>
                <div className='space-y-4'></div>
              </div>
            </div>

            <div className='lg:col-span-1'>
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                  Team Members
                </h2>
                <div className='space-y-4 flex justify-center items-center'>
                  <p className='text-gray-600'>Team members here...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default ProjectDetails;
