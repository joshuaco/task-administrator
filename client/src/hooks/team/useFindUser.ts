import { findUserByEmail } from '@/api/team';
import { useMutation } from '@tanstack/react-query';

export const useFindUser = () => {
  const {
    mutateAsync: findUser,
    error,
    data,
    isPending
  } = useMutation({
    mutationFn: findUserByEmail
  });

  return { findUser, error, data, isPending };
};
