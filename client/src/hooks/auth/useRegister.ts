import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { createAccount as registerAccount } from '@/api/auth';

export const useRegister = () => {
  const { mutateAsync: createAccount } = useMutation({
    mutationFn: registerAccount,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data: string) => {
      toast.success(data);
    }
  });

  return { createAccount };
};
