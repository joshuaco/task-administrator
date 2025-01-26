import api from '@/lib/axios';
import { ProjectFormData } from '@/types';
import { projectsSchema } from '@/schemas/project';

export const createProject = async (formData: ProjectFormData) => {
  try {
    const { data } = await api.post('/projects', formData);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getProjects = async () => {
  try {
    const { data } = await api.get('/projects');
    const response = projectsSchema.safeParse(data.projects);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
