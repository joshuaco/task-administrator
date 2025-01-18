import { forwardRef } from 'react';
import ErrorText from './ErrorText';

type InputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  label: string;
  name: string;
  error?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, error, ...props }, ref) => {
    console.log(props);
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

export default InputField;
