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

export async function confirmAccount(token: string) {
  try {
    const { data } = await api.post('/auth/confirm-account', { token });
    return data.message as string;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
