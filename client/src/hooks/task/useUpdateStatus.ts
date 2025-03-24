import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project, Task, TaskStatus } from '@/types';
import { updateTaskStatus } from '@/api/task';
import { useGetTask } from './useGetTask';
import { toast } from 'sonner';

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const { projectId, viewTaskId } = useGetTask();

  const { mutate: updateStatusMutation } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task', viewTaskId] });
      toast.success(data);
    },
    retry: 1
  });

  const updateStatusOptimistic = (taskId: string, status: TaskStatus) => {
    queryClient.setQueryData<Project>(['project', projectId], (prevData) => {
      if (!prevData) return prevData;
      const updatedTasks = (prevData.tasks as Task[]).map((task: Task) => {
        if (task._id === taskId) {
          return { ...task, status };
        }
        return task;
      });
      return { ...prevData, tasks: updatedTasks };
    });
  };

  return { updateStatusMutation, updateStatusOptimistic, projectId };
};
