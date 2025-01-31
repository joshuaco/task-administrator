import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { Project, TaskFormData } from '@/types';
import { taskResponseSchema } from '@/schemas/task';

interface TaskParams {
  formData: TaskFormData;
  projectId: Project['_id'];
}

export const createTask = async ({ formData, projectId }: TaskParams) => {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post(url, formData);
    const response = taskResponseSchema.safeParse(data);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
};
