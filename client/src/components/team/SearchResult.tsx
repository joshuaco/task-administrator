import { useAddMember } from '@/hooks/team/useAddMember';
import { TeamMember } from '@/types';
import { AlertCircle, UserCircle2, UserPlus } from 'lucide-react';

interface SearchResultProps {
  error: Error | null;
  user?: TeamMember;
  projectId: string;
}

function SearchResult({ error, user, projectId }: SearchResultProps) {
  const { addMember } = useAddMember({ projectId });

  const handleAddUserToProject = async () => {
    if (user) {
      const data = { projectId, id: user._id };
      await addMember(data);
    }
  };

  return (
    <div className='mt-8'>
      <h3 className='font-medium text-gray-700 mb-4'>Search Results</h3>
      {error ? (
        <div className='rounded-md bg-yellow-50 p-4'>
          <div className='flex'>
            <AlertCircle className='h-5 w-5 text-yellow-400' />
            <div className='ml-3'>
              <p className='text-sm text-yellow-700'>{error.message}</p>
            </div>
          </div>
        </div>
      ) : user ? (
        <div className='space-y-4'>
          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'>
            <div className='flex items-center space-x-3'>
              <UserCircle2 className='text-gray-500 h-10 w-10' />
              <div>
                <p className='text-sm font-medium text-gray-900'>{user.name}</p>
                <p className='text-sm text-gray-500'>{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleAddUserToProject}
              className='inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
            >
              <UserPlus className='h-5 w-5 mr-0 sm:mr-2' />
              <span className='hidden sm:block'>Add</span>
            </button>
          </div>
        </div>
      ) : (
        <div className='text-center text-sm text-gray-500'>
          Search for a team member by their email address
        </div>
      )}
    </div>
  );
}

export default SearchResult;
