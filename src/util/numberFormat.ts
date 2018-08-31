import BN from 'bn.js';

const NUMBER_REGEX = new RegExp('(\\d+?)(?=(\\d{3})+(?!\\d)|$)', 'g');

export default function numberFormat(value?: BN | number | null): string {
  if (value === undefined || value === null) {
    return '0';
  }

  return ((value as number).toString().match(NUMBER_REGEX) || []).join(',');
}
