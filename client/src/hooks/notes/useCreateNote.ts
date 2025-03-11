import { createNote } from '@/api/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const useCreateNote = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get('viewTask')!;

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      toast.success(data);
    }
  });

  return { mutateAsync, projectId, taskId };
};
