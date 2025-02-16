import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { LoginFormData, RegisterFormData } from '@/types';

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

export async function loginAccount(formData: LoginFormData) {
  try {
    const { data } = await api.post('/auth/login', formData);
    return data.message as string;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function forgotPassword(email: LoginFormData['email']) {
  try {
    const { data } = await api.post('/auth/reset-password', { email });
    return data.message as string;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
