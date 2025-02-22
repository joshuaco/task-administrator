import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { loginSchema } from '@/schemas/auth';
import { LoginFormData, RegisterFormData, ResetPasswordForm } from '@/types';

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
    const response = loginSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function forgotPassword(email: LoginFormData['email']) {
  try {
    const { data } = await api.post('/auth/forgot-password', { email });
    return data.message as string;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function validateToken(token: string) {
  try {
    const { data } = await api.post('/auth/validate-token', { token });
    return data.message as string;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function updatePassword({
  formData,
  token
}: {
  formData: ResetPasswordForm;
  token: string;
}) {
  try {
    const { data } = await api.post(`/auth/reset-password/${token}`, formData);
    return data.message as string;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}

export async function getUser() {
  try {
    const { data } = await api('/auth/user');
    return data.user;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw error;
  }
}
