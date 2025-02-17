import { useState } from 'react';
import TokenForm from '@/components/forms/TokenForm';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import { validateToken } from '@/api/auth';
import { toast } from 'sonner';

function ResetPasswordView() {
  const [token, setToken] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);

  const handleComplete = async (value: string) => {
    try {
      const response = await validateToken(value);
      if (response) {
        toast.success(response);
        setToken(value);
        setIsValidToken(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className='px-4 sm:max-w-sm sm:mx-auto'>
        <h2 className='text-3xl font-extrabold text-white'>Reset Password</h2>
      </div>

      <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm px-4'>
        {!isValidToken ? (
          <TokenForm onComplete={handleComplete} />
        ) : (
          <ResetPasswordForm token={token} />
        )}
      </div>
    </>
  );
}

export default ResetPasswordView;
