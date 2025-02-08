import { TaskStatus } from '@/types';

// Replace hyphens with space and capitalize first letter
export const statusTitle = (status: string) =>
  status.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

export const statusPillColors = {
  pending: 'bg-gray-100 text-gray-800',
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'on-hold': 'bg-orange-100 text-orange-800',
  'under-review': 'bg-yellow-100 text-yellow-800'
} as const;

export const statusBorderColors = {
  pending: 'border-gray-300',
  completed: 'border-green-300',
  'in-progress': 'border-blue-300',
  'on-hold': 'border-orange-300',
  'under-review': 'border-yellow-300'
} as const;

export const taskStatus: { [key in TaskStatus]: string } = {
  pending: 'Pending',
  'on-hold': 'On Hold',
  'in-progress': 'In Progress',
  'under-review': 'Under Review',
  completed: 'Completed'
};
