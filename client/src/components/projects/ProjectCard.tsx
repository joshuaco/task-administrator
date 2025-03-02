import { ListTodo, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project, User } from '@/types';
import { isManager } from '@/utils/policies';
import ProjectDropdown from './ProjectDropdown';

interface ProjectsProps {
  projects: Project[];
  user: User;
}

function ProjectCard({ projects, user }: ProjectsProps) {
  return (
    <>
      <ul role='list' className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <li
            key={project._id}
            className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full'
          >
            <div className='p-4 sm:p-6 flex-grow'>
              <div className='flex justify-between items-start'>
                <Link
                  to={`/projects/${project._id}`}
                  className='text-xl font-semibold text-gray-900 tracking-tight'
                >
                  {project.projectName}
                </Link>
                <ProjectDropdown project={project} user={user} />
              </div>
              <p className='mt-2 text-gray-500 font-medium'>
                {project.clientName}
              </p>
              <p className='mt-1 text-gray-600 text-sm sm:text-base line-clamp-2 min-h-[2.5rem]'>
                {project.description}
              </p>
              <div className='flex items-center justify-between mt-auto pt-4'>
                <div className='flex items-center space-x-4'>
                  <div className='flex items-center text-gray-500'>
                    <UsersRound className='h-5 w-5 mr-1' />
                    <span>{project.team.length}</span>
                  </div>
                  <div className='flex items-center text-gray-500'>
                    <ListTodo className='h-5 w-5 mr-1' />
                    <span>{project.tasks.length}</span>
                  </div>
                </div>
                <div>
                  {isManager(project.manager, user._id) ? (
                    <p className='inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                      Manager
                    </p>
                  ) : (
                    <p className='inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                      Collaborator
                    </p>
                  )}
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
