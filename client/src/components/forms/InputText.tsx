import { forwardRef } from 'react';
import ErrorText from './ErrorText';

type InputTextProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  label: string;
  name: string;
  error?: string;
};

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, name, error, ...props }, ref) => {
    return (
      <>
        <label htmlFor={name} className='text-sm uppercase font-bold'>
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          className='w-full p-3 border border-gray-200 outline-gray-500'
          placeholder={label}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </>
    );
  }
);

export default InputText;
