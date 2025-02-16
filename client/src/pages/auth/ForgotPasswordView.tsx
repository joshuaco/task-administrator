import { toast } from 'sonner';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '@/api/auth';
import { ForgotPasswordForm } from '@/types';
import ErrorText from '@/components/forms/ErrorText';
import { Link } from 'react-router-dom';

function ForgotPasswordView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ForgotPasswordForm>();

  const handleForgotPassword = async (formData: ForgotPasswordForm) => {
    try {
      const response = await forgotPassword(formData.email);
      reset();
      toast.success(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <h2 className='text-center text-3xl font-extrabold text-white'>
        Reset Password
      </h2>

      <div className='mt-8 sm:mx-auto max-w-full sm:max-w-sm px-4'>
        <form
          className='space-y-6'
          noValidate
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <div>
            <label htmlFor='email' className='sr-only'>
              Email address
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Mail className='h-5 w-5 text-purple-500' />
              </div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type='email'
                id='email'
                autoComplete='email'
                placeholder='Email address'
                className='appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 
                  focus:border-purple-500 focus:z-10 sm:text-sm rounded-lg'
              />
            </div>
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </div>
          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Reset Password
            </button>
          </div>
        </form>

        <div className='mt-8 text-right'>
          <Link to='/login' className='text-slate-300 text-sm'>
            Back to login
          </Link>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordView;
