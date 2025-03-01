import { useGetProject } from '@/hooks/projects/useGetProject';
import { useDeleteMember } from '@/hooks/team/useDeleteMember';
import { useGetTeam } from '@/hooks/team/useGetTeam';
import { Shield, Trash2, UserCircle2 } from 'lucide-react';

interface Props {
  onClose: () => void;
}

function TeamMemberManagement({ onClose }: Props) {
  const { projectId } = useGetProject();
  const { team } = useGetTeam(projectId);
  const { removeMember } = useDeleteMember({ projectId });

  const handleRemoveMember = (memberId: string) => {
    const data = { projectId, id: memberId };
    removeMember(data);
    onClose();
  };

  return (
    <>
      <ul className='space-y-4 mt-4'>
        {team?.map((member) => (
          <li
            key={member._id}
            className='bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'
          >
            <div className='flex items-center space-x-3'>
              <UserCircle2 className='h-10 w-10 text-gray-500' />
              <div>
                <p className='font-medium text-gray-900'>{member.name}</p>
                <p className='text-sm text-gray-500 flex items-center'>
                  <Shield className='h-4 w-4 mr-1 text-gray-400' />
                  DevOps Engineer
                </p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto'>
              <select
                value='DevOps Engineer'
                className='block w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                sm:text-sm px-3 py-1.5'
              >
                <option key={1} className='p-3'>
                  DevOps Engineer
                </option>
              </select>
              <button
                onClick={() => handleRemoveMember(member._id)}
                className='inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 whitespace-nowrap'
              >
                <Trash2 className='h-4 w-4 mr-1' />
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TeamMemberManagement;
