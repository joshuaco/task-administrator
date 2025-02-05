import { SquareCheckBig, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import ProjectDropdown from './ProjectDropdown';

interface ProjectsProps {
  projects: Project[];
}

function ProjectCard({ projects }: ProjectsProps) {
  return (
    <>
      <ul role='list' className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <li
            key={project._id}
            className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300'
          >
            <div className='p-6'>
              <div className='flex justify-between'>
                <Link
                  to={`/projects/${project._id}`}
                  className='text-xl font-semibold text-gray-900 tracking-tight'
                >
                  {project.projectName}
                </Link>
                <ProjectDropdown projectId={project._id} />
              </div>
              <p className='mt-2 text-gray-500 font-medium'>
                {project.clientName}
              </p>
              <p className='text-gray-400'>{project.description}</p>
              <div className='mt-4 flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                  <div className='flex items-center text-gray-500'>
                    <UsersRound className='h-5 w-5 mr-1' />
                    <span>0</span>
                  </div>
                  <div className='flex items-center text-gray-500'>
                    <SquareCheckBig className='h-5 w-5 mr-1' />
                    <span>{project.tasks.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProjectCard;
