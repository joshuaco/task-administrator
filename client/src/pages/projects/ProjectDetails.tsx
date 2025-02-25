import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useGetProject } from '@/hooks/projects/useGetProject';
import { useGetTask } from '@/hooks/task/useGetTask';
import { Plus } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import EmptyState from '@/components/empty/EmptyState';
import TaskFormModal from '@/components/tasks/TaskFormModal';
import ProjectHeader from '@/components/projects/ProjectHeader';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import TeamMemberModal from '@/components/team/TeamMemberModal';

function ProjectDetails() {
  const navigate = useNavigate();
  const { project, isError } = useGetProject();
  const { taskData } = useGetTask();

  if (isError) return <Navigate to='/404' />;

  if (project)
    return (
      <>
        <section className='mt-5 space-y-6'>
          <ProjectHeader project={project} text='Back to Projects' />

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

                  <button
                    className='inline-flex items-center px-1 sm:px-3 py-1 sm:py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-600 
                    hover:bg-fuchsia-700 focus:outline-none'
                    onClick={() => navigate('?newTask=true')}
                  >
                    <Plus className='h-5 w-5 mr-0 sm:mr-1' />
                    <p className='hidden sm:block'>Add Task</p>
                  </button>
                </div>
                <div>
                  {project.tasks.length > 0 ? (
                    <TaskList tasks={project.tasks} />
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
                  <button
                    className='inline-flex items-center px-1 sm:px-3 py-1 sm:py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none'
                    onClick={() => navigate('?addMember=true')}
                  >
                    <Plus className='h-5 w-5 mr-0 sm:mr-1' />
                    <p className='hidden sm:block'>Add Member</p>
                  </button>
                </div>

                {project.team.length > 0 ? (
                  <div className='space-y-4 flex justify-center items-center'>
                    <p className='text-gray-600'>Team members here...</p>
                  </div>
                ) : (
                  <EmptyState type='team' />
                )}
              </div>
            </div>
          </div>
        </section>

        <TaskFormModal task={taskData} />
        <TaskModalDetails />
        <TeamMemberModal />
      </>
    );
}

export default ProjectDetails;
