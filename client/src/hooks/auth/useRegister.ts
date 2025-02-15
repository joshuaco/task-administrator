import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createAccount as registerAccount } from '@/api/auth';

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutateAsync: createAccount } = useMutation({
    mutationFn: registerAccount,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data: string) => {
      toast.success(data);
      navigate('/login');
    }
  });

  return { createAccount };
};
