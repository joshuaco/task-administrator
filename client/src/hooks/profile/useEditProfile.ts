import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/api/profile';
import { toast } from 'sonner';

export function useEditProfile() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    retry: false
  });

  return { mutateAsync };
}
