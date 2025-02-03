import { getTaskById } from '@/api/task';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

export const useGetTask = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('editTask')!;
  const projectId = params.projectId!;

  const { data: taskData } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    refetchOnWindowFocus: false,
    enabled: !!taskId
  });

  return { taskId, projectId, taskData };
};
