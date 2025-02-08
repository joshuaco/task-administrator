import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTaskStatus } from '@/api/task';
import { useGetTask } from './useGetTask';
import { toast } from 'sonner';

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const { projectId, viewTaskId } = useGetTask();

  const { mutateAsync: updateStatusMutation } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task', viewTaskId] });
      toast.success(data);
    }
  });

  return { updateStatusMutation };
};
