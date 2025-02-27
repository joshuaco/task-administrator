import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUserToProject } from '@/api/team';
import { toast } from 'sonner';

export const useAddMember = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: addMember } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success(data);
    }
  });

  return { addMember };
};
