import BN from 'bn.js';

const NUMBER_REGEX = new RegExp('(\\d+?)(?=(\\d{3})+(?!\\d)|$)', 'g');

interface IOptions {
  separator?: string | boolean;
  defaultValue?: string;
}

export default function numberFormat(
  value?: BN | number | null,
  { separator = true, defaultValue = '0' }: IOptions = {}
): string {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  return ((value as number).toString().match(NUMBER_REGEX) || []).join(
    typeof separator === 'string' ? separator : separator ? ',' : ''
  );
}
