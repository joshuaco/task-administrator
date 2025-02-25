import { isAxiosError } from 'axios';
import { TeamMemberForm } from '@/types';
import api from '@/lib/axios';
import { teamMemberSchema } from '@/schemas/team';

interface teamMemberProps {
  projectId: string;
  formData: TeamMemberForm;
  id: string;
}

export async function findUserByEmail({
  projectId,
  formData
}: Pick<teamMemberProps, 'projectId' | 'formData'>) {
  try {
    const { data } = await api.post(
      `/projects/${projectId}/team/find`,
      formData
    );
    const response = teamMemberSchema.safeParse(data.user);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addUserToProject({
  projectId,
  id
}: Pick<teamMemberProps, 'projectId' | 'id'>) {
  try {
    const { data } = await api.post(`/projects/${projectId}/team`, { id });
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
