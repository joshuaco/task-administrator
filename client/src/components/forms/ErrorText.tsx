function ErrorText({ children }: { children?: string }) {
  return <>{children && <p className='text-red-500 text-sm'>{children}</p>}</>;
}

export default ErrorText;
