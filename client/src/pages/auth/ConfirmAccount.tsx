import { useNavigate } from 'react-router-dom';
import { confirmAccount } from '@/api/auth';
import { toast } from 'sonner';
import PinField from 'react-pin-field';

function ConfirmAccount() {
  const navigate = useNavigate();

  const handleComplete = async (token: string) => {
    try {
      const message = await confirmAccount(token);
      toast.success(message);
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
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
