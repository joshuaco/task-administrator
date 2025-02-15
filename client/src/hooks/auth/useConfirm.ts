import { useMutation } from '@tanstack/react-query';
import { confirmAccount as confirmAccountApi } from '@/api/auth';
import { toast } from 'sonner';

export const useConfirm = () => {
  const { mutateAsync: confirmAccount, isLoading } = useMutation({
    mutationFn: confirmAccountApi,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data: string) => {
      console.log(data);
    }
  });

  return { confirmAccount, isLoading };
};
