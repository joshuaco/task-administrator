import { useState } from 'react';
import TokenForm from '@/components/forms/TokenForm';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

function ResetPasswordView() {
  const [isValidToken] = useState(false);

  return (
    <>
      <h2 className='text-center text-3xl font-extrabold text-white'>
        Reset Password
      </h2>

      <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-md'>
        {!isValidToken ? (
          <TokenForm label='Confirm code' />
        ) : (
          <ResetPasswordForm />
        )}
      </div>
    </>
  );
}

export default ResetPasswordView;
