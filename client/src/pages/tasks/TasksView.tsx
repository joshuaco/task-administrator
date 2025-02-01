import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/project';
import ProjectHeader from '@/components/projects/ProjectHeader';

function TasksView() {
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
          <ProjectHeader project={project} text='Back to Project' />
        </section>
      </>
    );
}

export default TasksView;
