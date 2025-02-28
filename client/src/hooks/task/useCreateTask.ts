import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createTask } from '@/api/task';
import { toast } from 'sonner';

export const useCreateTask = ({ projectId }: { projectId: string }) => {
  const navigate = useNavigate();
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
