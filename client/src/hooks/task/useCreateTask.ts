import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useGetTask } from './useGetTask';
import { createTask } from '@/api/task';
import { toast } from 'sonner';

export const useCreateTask = () => {
  const navigate = useNavigate();
  const { projectId } = useGetTask();
  const queryClient = useQueryClient();

  const { mutateAsync: createTaskMutation } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success(data);
      navigate(location.pathname, { replace: true });
    }
  });

  return { createTaskMutation };
};
