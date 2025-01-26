import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/project';
import { ChevronLeft } from 'lucide-react';
import ProjectForm from '@/components/forms/ProjectForm';

function EditProject() {
  const params = useParams();
  const projectId = params.projectId!;

  const { data: project, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    refetchOnWindowFocus: false,
    retry: false
  });

  if (isError) return <Navigate to='/404' />;

  return (
    <>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <div className='mt-5'>
          <h2 className='text-3xl sm:text-4xl font-semibold'>Edit Project</h2>
          <p className='hidden sm:block text-lg font-medium text-gray-500'>
            Fill out the form below to edit the project.
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

      {project && (
        <div className='mt-4 p-6 sm:p-10 sm:mt-6 bg-white shadow-lg  rounded-xl'>
          <ProjectForm project={project} />
        </div>
      )}
    </>
  );
}

export default EditProject;
