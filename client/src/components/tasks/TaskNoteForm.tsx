import { useCreateNote } from '@/hooks/notes/useCreateNote';
import { MessageSquarePlus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { TaskNoteForm } from '@/types';
import ErrorText from '../forms/ErrorText';

interface TaskNoteFormProps {
  onclose: () => void;
}

function TaskNoteForm({ onclose }: TaskNoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TaskNoteForm>({
    defaultValues: {} as TaskNoteForm
  });
  const { mutateAsync: createNote, projectId, taskId } = useCreateNote();

  const onSubmitForm = async (formData: TaskNoteForm) => {
    const data = { formData, projectId, taskId };
    await createNote(data);
    onclose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className='space-y-3'>
      <div className='flex items-center justify-between mb-2'>
        <label
          htmlFor='note'
          className='block text-sm font-medium text-gray-700 ml-3'
        >
          Add a note
        </label>
        <button
          type='button'
          onClick={onclose}
          className='inline-flex items-center text-gray-400 hover:text-gray-500'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
      <div>
        <input
          id='note'
          {...register('content', {
            required: 'Note content is required'
          })}
          className='block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none 
          px-3 py-2'
          placeholder='Type your note here...'
        />
        {errors.content && <ErrorText>{errors.content.message}</ErrorText>}
      </div>
      <div className='flex justify-end gap-2'>
        <button
          type='button'
          onClick={onclose}
          className='inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white 
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <MessageSquarePlus className='h-4 w-4 mr-2' />
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </form>
  );
}

export default TaskNoteForm;
