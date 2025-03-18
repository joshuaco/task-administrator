import { UpdateUserPasswordForm, UserProfileForm } from '@/types';
import { isAxiosError } from 'axios';
import api from '@/lib/axios';

export async function updateProfile(formData: UserProfileForm) {
  try {
    const { data } = await api.put('/auth/profile', formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateUserPassword(formData: UpdateUserPasswordForm) {
  const newData = {
    current_password: formData['current-password'],
    password: formData.password,
    confirm_password: formData['password-confirm']
  };
  try {
    const { data } = await api.post('/auth/update-password', newData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
