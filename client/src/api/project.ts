import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { ProjectFormData } from '@/types';
import { projectsSchema, projectSchema } from '@/schemas/project';

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
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const { data } = await api.get(`/projects/${projectId}`);
    const response = projectSchema.safeParse(data.project);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const updateProject = async (
  projectId: string,
  formData: ProjectFormData
) => {
  try {
    const { data } = await api.put(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
};
