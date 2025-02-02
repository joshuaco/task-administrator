// Replace hyphens with space and capitalize first letter
export const getStatusTitle = (status: string) =>
  status.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
