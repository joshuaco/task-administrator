import { useMutation } from '@tanstack/react-query';
import { loginAccount } from '@/api/auth';
import { toast } from 'sonner';

export const useLogin = () => {
  const { mutateAsync: login } = useMutation({
    mutationFn: loginAccount,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    }
  });

  return { login };
};
