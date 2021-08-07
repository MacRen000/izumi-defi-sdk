import { getAddress } from '@ethersproject/address';

/**
 * Validates the given address's hex representation and injects a checksum if the given address
 * is not checksummed and validates the checksum otherwise
 * @param address the hex address
 * @returns the validated and checksummed hex address
 */
export const getValidatedAddress = (address: string) => {
  try {
    return getAddress(address);
  } catch (error) {
    throw new Error(`${address} is not a valid address.`);
  }
};
