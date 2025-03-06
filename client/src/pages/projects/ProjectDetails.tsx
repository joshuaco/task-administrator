import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useGetProject } from '@/hooks/projects/useGetProject';
import { useAuthContext } from '@/hooks/context/useAuthContext';
import { Plus, UserCog2 } from 'lucide-react';
import { isManager } from '@/utils/policies';
import TaskList from '@/components/tasks/TaskList';
import EmptyState from '@/components/empty/EmptyState';
import TeamList from '@/components/team/TeamList';
import TaskFormModal from '@/components/tasks/TaskFormModal';
import ProjectHeader from '@/components/projects/ProjectHeader';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import TeamMemberModal from '@/components/team/TeamMemberModal';

function ProjectDetails() {
  const navigate = useNavigate();
  const { project, isError, projectId } = useGetProject();
  const { user } = useAuthContext();

  if (isError) return <Navigate to='/404' />;

  if (project && user)
    return (
      <>
        <section className='mt-5 space-y-6'>
          <ProjectHeader
            project={project}
            user={user}
            text='Back to Projects'
          />

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                  About
                </h2>
                <p className='text-gray-600'>{project.description}</p>
              </div>

              <div className='bg-white rounded-lg shadow-sm p-6 mt-6'>
                <div className='flex justify-between items-start mb-2'>
                  <Link
                    to={`/projects/${project._id}/tasks`}
                    className='text-xl font-semibold text-gray-900 mb-4 cursor-pointer'
                  >
                    Tasks ({project.tasks.length})
                  </Link>

                  {isManager(project.manager, user._id) && (
                    <button
                      className='inline-flex items-center px-1 sm:px-3 py-1 sm:py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-600 
                    hover:bg-fuchsia-700 focus:outline-none'
                      onClick={() => navigate('?newTask=true')}
                    >
                      <Plus className='h-5 w-5 mr-0 sm:mr-1' />
                      <p className='hidden sm:block'>Add Task</p>
                    </button>
                  )}
                </div>
                <div>
                  {project.tasks.length > 0 ? (
                    <TaskList
                      tasks={project.tasks}
                      userId={user._id}
                      managerId={project.manager}
                    />
                  ) : (
                    <EmptyState type='tasks' />
                  )}
                </div>
              </div>
            </div>

            <div className='lg:col-span-1'>
              <div className='bg-white rounded-lg shadow-sm p-6'>
                <div className='flex justify-between items-start mb-4'>
                  <h2 className='text-lg font-semibold text-gray-900'>
                    Team Members
                  </h2>
                  {isManager(project.manager, user._id) && (
                    <div className='flex gap-2'>
                      {project.team.length > 0 && (
                        <button
                          className='inline-flex items-center px-1 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                          onClick={() => navigate('?management=true')}
                        >
                          <UserCog2 className='h-5 w-5 mr-0 sm:mr-1' />
                          <span className='hidden sm:block'>Manage</span>
                        </button>
                      )}
                      <button
                        className='inline-flex items-center px-1 sm:px-3 py-1 sm:py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none'
                        onClick={() => navigate('?addMember=true')}
                      >
                        <Plus className='h-5 w-5 mr-0 sm:mr-1' />
                        <p className='hidden sm:block'>
                          Add <span className='lg:hidden'>Member</span>
                        </p>
                      </button>
                    </div>
                  )}
                </div>

                {project.team.length > 0 ? (
                  <TeamList projectId={projectId} />
                ) : (
                  <EmptyState type='team' />
                )}
              </div>
            </div>
          </div>
        </section>

        <TaskFormModal />
        <TaskModalDetails />
        <TeamMemberModal />
      </>
    );
}

export default ProjectDetails;
