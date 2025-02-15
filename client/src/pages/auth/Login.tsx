import { Github, Gitlab, Lock, LogIn, Mail, UserCircle2 } from 'lucide-react';
import { useLogin } from '@/hooks/auth/useLogin';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginFormData } from '@/types';
import ErrorText from '@/components/forms/ErrorText';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>();

  const { login } = useLogin();

  const handleLogin = async (formData: LoginFormData) => {
    await login(formData);
  };

  return (
    <>
      <h2 className='text-center text-3xl font-extrabold text-white'>
        Sign in to your account
      </h2>
      <p className='mt-2 text-center text-sm text-slate-100'>
        Or{' '}
        <Link
          to='/register'
          type='button'
          className='font-medium text-fuchsia-600 hover:text-fuchsia-500 focus:outline-none focus:underline transition ease-in-out duration-150'
        >
          create a new account
        </Link>
      </p>

      <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-md'>
        <form
          className='space-y-6 p-4'
          onSubmit={handleSubmit(handleLogin)}
          noValidate
        >
          <div className='rounded-md shadow-sm space-y-4'>
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
                  <LogIn className='h-5 w-5 text-slate-200 group-hover:text-slate-100' />
                </span>
              )}
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className='mt-6 px-4'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-gray-800 text-slate-100'>
                Or continue with
              </span>
            </div>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-3'>
            <button className='w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              <span className='sr-only'>Sign in with GitHub</span>
              <Github className='w-5 h-5' />
              <span className='ml-2'>GitHub</span>
            </button>
            <button className='w-full inline-flex justify-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
              <span className='sr-only'>Sign in with GitHub</span>
              <Gitlab className='w-5 h-5' />
              <span className='ml-2'>GitLab</span>
            </button>
          </div>
          <div className='mt-6'>
            <button className='w-full inline-flex justify-center items-center py-2 px-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
              <UserCircle2 className='w-5 h-5 mr-2' />
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
