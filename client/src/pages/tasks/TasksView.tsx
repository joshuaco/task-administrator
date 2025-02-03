import { Navigate, useParams } from 'react-router-dom';
import { useGetTask } from '@/hooks/task/useGetTask';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/project';
import ProjectHeader from '@/components/projects/ProjectHeader';
import TaskGroup from '@/components/tasks/TaskGroup';
import AddTaskModal from '@/components/tasks/AddTaskModal';

function TasksView() {
  const params = useParams();
  const projectId = params.projectId!;

  const { data: project, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    refetchOnWindowFocus: false
  });

  const { taskData } = useGetTask();

  if (isError) return <Navigate to='/404' />;

  if (project)
    return (
      <>
        <section className='mt-5 space-y-6'>
          <ProjectHeader project={project} text='Back to Project' />
          <TaskGroup tasks={project.tasks} />
        </section>

        <AddTaskModal task={taskData} />
      </>
    );
}

export default TasksView;
