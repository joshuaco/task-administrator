import { getProjectTeam } from '@/api/team';
import { useQuery } from '@tanstack/react-query';

export const useGetTeam = (projectId: string) => {
  const { data: team, isLoading } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam({ projectId }),
    retry: false
  });

  return { team, isLoading };
};
