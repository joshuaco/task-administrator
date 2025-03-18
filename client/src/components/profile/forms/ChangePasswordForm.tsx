import { Loader2, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UpdateUserPasswordForm } from '@/types';
import { useUpdatePassword } from '@/hooks/profile/useUpdatePassword';
import ErrorText from '@/components/forms/ErrorText';

function ChangePasswordForm() {
  const { mutate: updatePassword } = useUpdatePassword();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<UpdateUserPasswordForm>();

  const password = watch('password');
  const current_password = watch('current-password');

  const handleUpdatePassword = (data: UpdateUserPasswordForm) => {
    updatePassword(data);
    reset();
  };

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(handleUpdatePassword)}
      noValidate
    >
      <div>
        <label
          htmlFor='current-password'
          className='block text-sm font-medium text-gray-700'
        >
          Current Password
        </label>
        <div className='mt-1 relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Lock className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='password'
            id='current-password'
            {...register('current-password', {
              required: 'Current password is required'
            })}
            className='w-full p-2 border border-gray-200 outline-gray-500 pl-10'
          />
        </div>
        {errors['current-password'] && (
          <ErrorText>{errors['current-password'].message}</ErrorText>
        )}
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          New Password
        </label>
        <div className='mt-1 relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Lock className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='password'
            id='password'
            {...register('password', {
              required: 'New password is required',
              minLength: {
                value: 8,
                message: 'Password must contain 8 characters'
              },
              validate: (value) =>
                value !== current_password || 'New password cannot be repeated'
            })}
            className='w-full p-2 border border-gray-200 outline-gray-500 pl-10'
          />
        </div>
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      </div>

      <div>
        <label
          htmlFor='password-confirm'
          className='block text-sm font-medium text-gray-700'
        >
          Confirm New Password
        </label>
        <div className='mt-1 relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <Lock className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='password'
            id='password-confirm'
            {...register('password-confirm', {
              validate: (value) =>
                value === password || `Passwords doesn't match`
            })}
            className='w-full p-2 border border-gray-200 outline-gray-500 pl-10'
          />
        </div>
        {errors['password-confirm'] && (
          <ErrorText>{errors['password-confirm'].message}</ErrorText>
        )}
      </div>

      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex items-center px-4 py-2 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='animate-spin h-4 w-4 mr-2' />
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
