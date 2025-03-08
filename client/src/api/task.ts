import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { taskSchema } from '@/schemas/task';
import { Project, Task, TaskFormData } from '@/types';

interface TaskParams {
  formData: TaskFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
  status: Task['status'];
}

export const createTask = async ({
  formData,
  projectId
}: Pick<TaskParams, 'formData' | 'projectId'>) => {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post(url, formData);
    return data.message;
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
    const response = taskSchema.safeParse(data.task);
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
    return data.message;
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

export const updateTaskStatus = async ({
  projectId,
  taskId,
  status
}: Pick<TaskParams, 'projectId' | 'taskId' | 'status'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`;
    const { data } = await api.patch(url, { status });
    return data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
};
