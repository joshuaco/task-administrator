import PinField from 'react-pin-field';

interface TokenFormProps {
  label: string;
}

function TokenForm({ label }: TokenFormProps) {
  return (
    <>
      <form className='space-y-8 px-4 py-2 max-w-sm mx-auto'>
        <div className='mt-6'>
          <label className='sr-only'>{label}</label>
          <div className='flex justify-center gap-2'>
            <PinField
              onComplete={(value) => console.log(value)}
              length={6}
              className='w-full px-3 py-2 border border-gray-300 text-center placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 
                  sm:text-lg font-bold rounded-lg'
            />
          </div>
        </div>

        <div className='text-center'>
          <p className='text-sm text-slate-100'>
            Code invalid?{' '}
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

export default TokenForm;
