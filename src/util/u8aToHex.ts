/**
 * @name u8aToHex
 * @signature u8aToHex (value?: UInt8Array): string
 * @summary Creates a hex string from a Uint8Array object.
 * @description
 * `UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.
 * @example
 *   import { u8aToHex } from '@polkadot/util';
 *
 *   u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
 */

interface IOptions {
  bitLength?: number;
  isPrefixed?: boolean;
}

export default function u8aToHex(
  value?: Uint8Array | null,
  { bitLength = -1, isPrefixed = true }: IOptions = {}
): string {
  const prefix = isPrefixed ? '0x' : '';

  if (!value || !value.length) {
    return prefix;
  }

  const byteLength = Math.ceil(bitLength / 8);

  if (byteLength > 0 && value.length > byteLength) {
    const halfLength = Math.ceil(byteLength / 2);

    return `${u8aToHex(value.subarray(0, halfLength), { bitLength: -1, isPrefixed })}…
    ${u8aToHex(value.subarray(value.length - halfLength), { bitLength: -1, isPrefixed: false })}`;
  }

  return value.reduce((result, item) => {
    return result + `0${item.toString(16)}`.slice(-2);
  }, prefix);
}
