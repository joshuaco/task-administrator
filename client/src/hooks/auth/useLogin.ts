import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginAccount } from '@/api/auth';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutateAsync: login } = useMutation({
    mutationFn: loginAccount,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem('AUTH_TOKEN', data.token);
      }
      navigate('/');
    }
  });

  return { login };
};
