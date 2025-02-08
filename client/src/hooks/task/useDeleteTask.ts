import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetTask } from './useGetTask';
import { deleteTask } from '@/api/task';
import { toast } from 'sonner';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { projectId } = useGetTask();

  const { mutateAsync: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.info(data);
    }
  });

  return { deleteTaskMutation };
};
