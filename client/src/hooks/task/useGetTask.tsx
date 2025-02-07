import { getTaskById } from '@/api/task';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';

export const useGetTask = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editTaskId = queryParams.get('editTask')!;
  const viewTaskId = queryParams.get('viewTask')!;
  const taskId = editTaskId || viewTaskId;
  const projectId = params.projectId!;

  const {
    data: taskData,
    isError,
    error
  } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!taskId
  });

  return { viewTaskId, editTaskId, projectId, taskData, isError, error };
};
