import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProjectById } from '@/api/project';

export const useGetProject = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data: project, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  });

  return { project, isError, projectId };
};
