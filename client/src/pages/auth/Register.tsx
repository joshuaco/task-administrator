import { Lock, Mail, User, UserPlus2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegister } from '@/hooks/auth/useRegister';
import { RegisterFormData } from '@/types';
import ErrorText from '@/components/forms/ErrorText';

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>();

  const password = watch('password');
  const { createAccount } = useRegister();

  const handleRegister = async (formData: RegisterFormData) => {
    await createAccount(formData);
  };

  return (
    <>
      <h2 className='text-center text-3xl font-extrabold text-white'>
        Create your account
      </h2>
      <p className='mt-2 text-center text-sm text-slate-100'>
        Or{' '}
        <Link
          to='/login'
          type='button'
          className='font-medium text-fuchsia-600 hover:text-fuchsia-500 focus:outline-none focus:underline transition ease-in-out duration-150'
        >
          sign in to your account
        </Link>
      </p>

      <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-md'>
        <form
          className='space-y-6 p-4'
          onSubmit={handleSubmit(handleRegister)}
          noValidate
        >
          <div className='rounded-md shadow-sm space-y-4'>
            <div>
              <label htmlFor='name' className='sr-only'>
                Name
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <User className='h-5 w-5 text-purple-500' />
                </div>
                <input
                  {...register('name', {
                    required: 'Name is required'
                  })}
                  type='text'
                  id='name'
                  autoComplete='name'
                  placeholder='Full name'
                  className='appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 
                  focus:border-purple-500 focus:z-10 sm:text-sm rounded-lg'
                />
              </div>
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            </div>
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
              {errors.password && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
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
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 bg-purple-600 focus:ring-purple-500 border-gray-300 rounded'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-slate-100'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a
                href='#'
                className='font-medium text-fuchsia-600 hover:text-fuchsia-500 focus:outline-none focus:underline transition ease-in-out duration-150'
              >
                Forgot your password?
              </a>
            </div>
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
                  <UserPlus2 className='h-5 w-5 text-slate-200 group-hover:text-slate-100' />
                </span>
              )}
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
