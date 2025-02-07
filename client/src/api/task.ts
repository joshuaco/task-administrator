import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { Project, Task, TaskFormData } from '@/types';
import { taskProjectSchema, taskResponseSchema } from '@/schemas/task';

interface TaskParams {
  formData: TaskFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
}

export const createTask = async ({
  formData,
  projectId
}: Pick<TaskParams, 'formData' | 'projectId'>) => {
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

export const getTaskById = async ({
  projectId,
  taskId
}: Pick<TaskParams, 'projectId' | 'taskId'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api(url);
    const response = taskProjectSchema.safeParse(data.task);
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

export const updateTask = async ({
  formData,
  projectId,
  taskId
}: Pick<TaskParams, 'formData' | 'projectId' | 'taskId'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put(url, formData);
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

export const deleteTask = async ({
  projectId,
  taskId
}: Pick<TaskParams, 'projectId' | 'taskId'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete(url);
    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
};
