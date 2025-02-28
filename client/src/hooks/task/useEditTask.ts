import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { updateTask } from '@/api/task';
import { toast } from 'sonner';

interface Props {
  projectId: string;
  editTaskId: string;
}

export const useEditTask = ({ projectId, editTaskId }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: editTaskMutation } = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task', editTaskId] });
      navigate(location.pathname, { replace: true });
      toast.success(data);
    }
  });

  return { editTaskMutation };
};
