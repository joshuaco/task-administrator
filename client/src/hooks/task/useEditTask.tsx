import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useGetTask } from './useGetTask';
import { updateTask } from '@/api/task';
import { toast } from 'sonner';

export const useEditTask = () => {
  const { projectId, taskId } = useGetTask();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: editTaskMutation } = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      navigate(location.pathname, { replace: true });
      toast.success(data);
    }
  });

  return { editTaskMutation };
};
