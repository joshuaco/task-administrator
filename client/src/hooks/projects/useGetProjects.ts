import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/api/project';

export const useGetProjects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  return { projects, isLoading };
};
