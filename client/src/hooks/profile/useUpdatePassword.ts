import { updateUserPassword } from '@/api/profile';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdatePassword() {
  const { mutate } = useMutation({
    mutationFn: updateUserPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
    retry: false
  });

  return { mutate };
}
