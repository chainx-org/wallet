import dayjs from 'dayjs';

interface IOptions {
  formatString?: string;
  defaultValue?: string;
}

export default function dateFormat(value?: Date, { defaultValue = '' }: IOptions = {}): string {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  return dayjs(value).toISOString();
}
