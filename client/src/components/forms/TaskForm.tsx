import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createTask } from '@/api/task';
import { TaskFormData } from '@/types';
import { toast } from 'sonner';
import ErrorText from './ErrorText';

interface TaskFormProps {
  onClose: () => void;
}

function TaskForm({ onClose }: TaskFormProps) {
  const params = useParams();
  const projectId = params.projectId!;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TaskFormData>();

  const queryClient = useQueryClient();
  const { mutateAsync: createTaskMutation } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success(data);
      onClose();
    }
  });

  const onSubmit = async (data: TaskFormData) => {
    const taskData = { formData: data, projectId };
    await createTaskMutation(taskData);
  };

  return (
    <form
      noValidate
      className='mt-2 space-y-4 flex flex-col'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-2'>
        <label className='font-medium text-base text-gray-700' htmlFor='name'>
          Task Name
        </label>
        <input
          id='name'
          type='text'
          placeholder='Task Name'
          className='w-full p-3  border-gray-300 border'
          {...register('name', {
            validate: (value) => !!value.trim(),
            required: 'The task name is required'
          })}
        />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      </div>

      <div className='flex flex-col gap-2'>
        <label
          className='font-medium text-base text-gray-700'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          id='description'
          placeholder='Task Description'
          className='w-full p-3 border-gray-300 border resize-none'
          {...register('description', {
            validate: (value) => !!value.trim(),
            required: 'The task description is required'
          })}
        />
        {errors.description && (
          <ErrorText>{errors.description.message}</ErrorText>
        )}
      </div>

      <div className='flex justify-end gap-3'>
        <button
          type='button'
          className='px-4 py-2 border border-gray-300 rounded-md shadow-sm 
          text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
          onClick={() => onClose()}
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
