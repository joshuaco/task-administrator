import { useEditProfile } from '@/hooks/profile/useEditProfile';
import { useForm } from 'react-hook-form';
import { Camera, Mail, UserIcon } from 'lucide-react';
import type { User, UserProfileForm } from '@/types';
import ErrorText from '@/components/forms/ErrorText';

interface ProfileFormProps {
  user: User;
}

function ProfileForm({ user }: ProfileFormProps) {
  const { mutateAsync: updateProfile } = useEditProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserProfileForm>({ defaultValues: user });

  const handleEditProfile = async (data: UserProfileForm) => {
    await updateProfile(data);
  };

  return (
    <form
      className='space-y-6'
      onSubmit={handleSubmit(handleEditProfile)}
      noValidate
    >
      {/* Profile picture */}
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <img
            src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80'
            alt='Profile'
            className='h-16 w-16 rounded-full'
          />
          <button
            type='button'
            className='absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm 
              border border-gray-200 hover:bg-gray-50'
          >
            <Camera className='h-4 w-4 text-gray-500' />
          </button>
        </div>
        <div>
          <h3 className='text-lg font-medium text-gray-900'>Profile Picture</h3>
          <p className='text-sm text-gray-500'>
            JPG, GIF or PNG. Max size of 2MB.
          </p>
        </div>
      </div>
      {/* Profile form */}
      <div className='grid grid-cols-1 gap-6'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
          </label>
          <div className='mt-1 relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <UserIcon className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              {...register('name', {
                required: 'Name is required'
              })}
              id='name'
              className='w-full p-2 border border-gray-200 outline-gray-500 pl-10'
              placeholder='John Doe'
            />
          </div>
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <div className='mt-1 relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Mail className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='email'
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              id='email'
              className='w-full p-2 border border-gray-200 outline-gray-500 pl-10'
              placeholder='johndoe@email.com'
            />
          </div>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>
      </div>
      <div className='flex justify-end'>
        <input
          type='submit'
          className='bg-purple-600 p-2 text-white text-sm rounded-md font-medium'
          value={isSubmitting ? 'Saving...' : 'Save Changes'}
        />
      </div>
    </form>
  );
}

export default ProfileForm;
