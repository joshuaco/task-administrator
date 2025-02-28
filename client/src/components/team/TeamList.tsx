import { useGetTeam } from '@/hooks/team/useGetTeam';
import { UserCircle2 } from 'lucide-react';

interface TeamListProps {
  projectId: string;
}

function TeamList({ projectId }: TeamListProps) {
  const { team } = useGetTeam(projectId);
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
      {team?.map((member) => (
        <li key={member._id} className='flex items-center space-x-3'>
          <UserCircle2 className='h-10 w-10 text-gray-500' />
          <div>
            <p className='text-sm font-medium text-gray-900'>{member.name}</p>
            <p className='text-sm text-gray-500'>DevOps Engineer</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TeamList;
