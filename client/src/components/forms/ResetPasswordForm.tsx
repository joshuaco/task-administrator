import { Lock, LockOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { ResetPasswordForm } from '@/types';
import ErrorText from './ErrorText';

function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordForm>();

  const password = watch('password');

  const handleNewPassword = () => {};

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className='space-y-6 p-4'
        noValidate
      >
        <div>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Lock className='h-5 w-5 text-purple-500' />
            </div>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              })}
              type='password'
              id='password'
              autoComplete='current-password'
              placeholder='Password'
              className='appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 
                  focus:border-purple-500 focus:z-10 sm:text-sm rounded-lg'
            />
          </div>
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </div>

        <div>
          <label htmlFor='password-confirm' className='sr-only'>
            Confirm password
          </label>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Lock className='h-5 w-5 text-purple-500' />
            </div>
            <input
              {...register('password-confirm', {
                required: 'Password is required',
                validate: (value) =>
                  value === password || 'Passwords do not match'
              })}
              type='password'
              id='password-confirm'
              autoComplete='current-password'
              placeholder='Confirm password'
              className='appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 
                  focus:border-purple-500 focus:z-10 sm:text-sm rounded-lg'
            />
          </div>
          {errors['password-confirm'] && (
            <ErrorText>{errors['password-confirm'].message}</ErrorText>
          )}
        </div>

        <div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? (
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <div className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
              </span>
            ) : (
              <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                <LockOpen className='h-5 w-5 text-slate-200 group-hover:text-slate-100' />
              </span>
            )}
            {isSubmitting ? 'Changing Password' : 'Change Password'}
          </button>
        </div>
      </form>
    </>
  );
}

export default ResetPasswordForm;
