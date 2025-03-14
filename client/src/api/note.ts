import api from '@/lib/axios';
import { Project, Task, TaskNote, TaskNoteForm } from '@/types';
import { isAxiosError } from 'axios';

interface NoteAPIProps {
  formData: TaskNoteForm;
  projectId: Project['_id'];
  taskId: Task['_id'];
  noteId: TaskNote['_id'];
}

export async function createNote({
  formData,
  projectId,
  taskId
}: Pick<NoteAPIProps, 'formData' | 'projectId' | 'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const { data } = await api.post(url, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteNote({
  projectId,
  taskId,
  noteId
}: Pick<NoteAPIProps, 'projectId' | 'taskId' | 'noteId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const { data } = await api.delete(url);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
