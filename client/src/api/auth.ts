import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { RegisterFormData } from '@/types';

export async function createAccount(formData: RegisterFormData) {
  try {
    const { data } = await api.post('/auth/create-account', formData);
    return data.message as string;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
