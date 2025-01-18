import api from '@/lib/axios';
import { ProjectFormData } from '@/types';

export const createProject = async (formData: ProjectFormData) => {
  const { data } = await api.post('/projects', formData);
  console.log(data);
};
