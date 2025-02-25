import { useGetProject } from '@/hooks/projects/useGetProject';
import { useFindUser } from '@/hooks/team/useFindUser';
import { useForm } from 'react-hook-form';
import { Mail, Search } from 'lucide-react';
import type { TeamMemberForm } from '@/types';
import SearchResult from './SearchResult';
import ErrorText from '../forms/ErrorText';

function TeamMemberForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TeamMemberForm>();

  const { projectId } = useGetProject();
  const { findUser, error, isPending, data } = useFindUser();

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = { projectId, formData };
    await findUser(data);
    reset();
  };

  return (
    <>
      <form
        className='mt-2 space-y-6'
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className='flex flex-col gap-1'>
          <label
            className='font-medium text-base text-gray-700'
            htmlFor='email'
          >
            Search by Email
          </label>
          <div className='relative mt-2'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <Mail className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='email'
              id='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className='pl-10 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
              placeholder="Enter member's email address"
            />
          </div>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>

        <button
          type='submit'
          className='w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isPending}
          value={isPending ? 'Searching...' : 'Search'}
        >
          {isPending ? (
            <>
              <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
              Searching...
            </>
          ) : (
            <>
              <Search className='h-5 w-5 mr-2' />
              <span>Search</span>
            </>
          )}
        </button>
      </form>

      <SearchResult error={error} user={data} projectId={projectId} />
    </>
  );
}

export default TeamMemberForm;
