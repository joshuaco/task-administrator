const date = new Date();

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
} as const;

export function getFullDate() {
  return date.toLocaleString('en-US', options);
}
