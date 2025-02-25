import { addUserToProject } from '@/api/team';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useAddMember = () => {
  const { mutateAsync: addMember } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    }
  });

  return { addMember };
};
