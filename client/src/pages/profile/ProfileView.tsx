import ProfileForm from '@/components/profile/forms/ProfileForm';
import { useAuthContext } from '@/hooks/context/useAuthContext';

function ProfileView() {
  const { user } = useAuthContext();

  return (
    <div>
      <ProfileForm user={user!} />
    </div>
  );
}

export default ProfileView;
