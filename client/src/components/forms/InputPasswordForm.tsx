import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { checkPassword } from '@/api/auth';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import type { CheckPasswordForm } from '@/types';
import ErrorText from './ErrorText';

interface InputPasswordFormProps {
  onClose: () => void;
  onDelete: () => void;
}

function InputPasswordForm({ onClose, onDelete }: InputPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckPasswordForm>();

  const { mutateAsync } = useMutation({
    mutationFn: checkPassword,
    onError: (error) => toast.error(error.message)
  });

  const handleForm = async (data: CheckPasswordForm) => {
    await mutateAsync(data);
    // If promise fails doesn't go to next line
    onDelete();
  };

  return (
    <form
      className='mt-3 space-y-2'
      noValidate
      onSubmit={handleSubmit(handleForm)}
    >
      <div className='flex flex-col gap-1'>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Lock className='h-5 w-5 text-gray-400' />
          </div>
          <input
            id='password'
            type='password'
            placeholder='Your login password'
            className='w-full p-2 text-sm border-gray-300 border rounded-md pl-10'
            {...register('password', {
              required: 'Please, input your password'
            })}
          />
        </div>
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      </div>
      <div className='py-3 sm:flex sm:flex-row-reverse'>
        <input
          type='submit'
          className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
          value='Delete'
        />

        <button
          type='button'
          onClick={() => onClose()}
          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default InputPasswordForm;
