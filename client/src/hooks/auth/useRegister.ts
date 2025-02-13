import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { createAccount as registerAccount } from '@/api/auth';

export const useRegister = () => {
  const { mutateAsync: createAccount } = useMutation({
    mutationFn: registerAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    }
  });

  return { createAccount };
};
