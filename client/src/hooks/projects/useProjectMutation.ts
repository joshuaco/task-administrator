import { createProject, deleteProject, updateProject } from '@/api/project';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project, ProjectFormData } from '@/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProjectMutationProps {
  projectId?: Project['_id'];
}

export const useProjectMutation = ({ projectId }: ProjectMutationProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteProjectMutation } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.info(data);
    }
  });

  const { mutateAsync: createProjectMutation } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/');
    }
  });

  const { mutateAsync: updateProjectMutation } = useMutation({
    mutationFn: ({
      projectId,
      formData
    }: {
      projectId: string;
      formData: ProjectFormData;
    }) => updateProject(projectId, formData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success(data);
      navigate('/');
    }
  });

  return {
    deleteProjectMutation,
    createProjectMutation,
    updateProjectMutation
  };
};
