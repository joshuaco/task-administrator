import { CheckCircle2 } from 'lucide-react';
import PinField from 'react-pin-field';

function ConfirmAccount() {
  const handleComplete = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <div>
        <h2 className='text-center text-4xl font-extrabold text-white'>
          Confirm your account
        </h2>
        <p className='mt-2 text-center text text-slate-100'>
          We sent a verification code to your email address.
        </p>
      </div>

      <form className='space-y-8 p-4 max-w-sm mx-auto'>
        <div className='mt-6'>
          <label className='sr-only'>Verification code</label>
          <div className='flex justify-center gap-2'>
            <PinField
              onComplete={(value) => handleComplete(value)}
              length={6}
              className='w-full px-3 py-2 border border-gray-300 text-center placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 
              sm:text-lg font-bold rounded-lg'
            />
          </div>
        </div>
        <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'>
          <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
            <CheckCircle2 className='h-5 w-5 text-slate-200 group-hover:text-slate-100' />
          </span>
          Verify code
        </button>
        <div className='text-center'>
          <p className='text-sm text-slate-100'>
            Didn't receive the code?{' '}
            <button
              type='button'
              className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline'
            >
              Resend code
            </button>
          </p>
        </div>
      </form>
    </>
  );
}

export default ConfirmAccount;
