import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/useAuth';
import { getProjectById } from '@/api/project';
import ProjectHeader from '@/components/projects/ProjectHeader';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import TaskFormModal from '@/components/tasks/TaskFormModal';
import TaskGroup from '@/components/tasks/TaskGroup';

function TasksView() {
  const params = useParams();
  const projectId = params.projectId!;

  const { data: project, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    refetchOnWindowFocus: false
  });
  const { data: user } = useAuth();

  if (isError) return <Navigate to='/404' />;

  if (project && user)
    return (
      <>
        <section className='mt-5 space-y-6'>
          <ProjectHeader project={project} user={user} text='Back to Project' />
          <TaskGroup tasks={project.tasks} />
        </section>

        <TaskFormModal />
        <TaskModalDetails />
      </>
    );
}

export default TasksView;
