import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { createProject, updateProject } from '@/api/project';
import { Project, ProjectFormData } from '@/types';
import { toast } from 'sonner';
import ErrorText from './ErrorText';

interface ProjectFormProps {
  project?: Project;
}

function ProjectForm({ project }: ProjectFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProjectFormData>({ defaultValues: project });

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
      queryClient.invalidateQueries({ queryKey: ['project', project?._id] });
      toast.success(data);
      navigate('/');
    }
  });

  const handleFormSubmit = async (data: ProjectFormData) => {
    if (project) {
      await updateProjectMutation({ projectId: project._id, formData: data });
    } else {
      await createProjectMutation(data);
    }
  };

  return (
    <>
      <form
        className='max-w-3xl mx-auto flex flex-col gap-3'
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className='mb-2 space-y-2'>
          <label htmlFor='projectName' className='text-sm uppercase font-bold'>
            Project Name
          </label>
          <input
            id='projectName'
            className='w-full p-3 border border-gray-200 outline-gray-500'
            type='text'
            placeholder='Project Name'
            disabled={isSubmitting}
            {...register('projectName', {
              required: 'The project name is required'
            })}
          />
          {errors.projectName && (
            <ErrorText>{errors.projectName.message}</ErrorText>
          )}
        </div>

        <div className='mb-2 space-y-2'>
          <label htmlFor='clientName' className='text-sm uppercase font-bold'>
            Client Name
          </label>
          <input
            id='clientName'
            className='w-full p-3 border border-gray-200 outline-gray-500'
            type='text'
            disabled={isSubmitting}
            placeholder='Client Name'
            {...register('clientName', {
              required: 'The client name is required'
            })}
          />
          {errors.clientName && (
            <ErrorText>{errors.clientName.message}</ErrorText>
          )}
        </div>

        <div className='mb-2 space-y-2'>
          <label htmlFor='description' className='text-sm uppercase font-bold'>
            Description
          </label>
          <textarea
            id='description'
            className='w-full p-3 border border-gray-200 outline-gray-500 resize-none'
            disabled={isSubmitting}
            placeholder='Project Description'
            {...register('description', {
              required: 'The project description is required'
            })}
          />
          {errors.description && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </div>
        <input
          className=' bg-fuchsia-600 hover:bg-fuchsia-700 p-3 font-semibold text-white text-lg rounded-xl transition-colors w-full sm:w-1/2 self-center disabled:bg-gray-400 disabled:cursor-not-allowed'
          type='submit'
          value={project ? 'Update Project' : 'Create Project'}
          disabled={isSubmitting || Object.keys(errors).length > 0}
        />
      </form>
    </>
  );
}

export default ProjectForm;
