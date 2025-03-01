import { removeUserToProject } from '@/api/team';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteMember = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const { mutate: removeMember } = useMutation({
    mutationFn: removeUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
      toast.success(data);
    }
  });

  return { removeMember };
};
