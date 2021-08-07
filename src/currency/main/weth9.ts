import { TokenERC20 } from './tokenERC20';

const symbol = 'WETH';
const name = 'Wrapped Ether';
const decimals = 18;

const addressChainPairs = [
    { chainId: 1, address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' },
    { chainId: 3, address: '0xc778417E063141139Fce010982780140Aa0cD5Ab' },
    { chainId: 4, address: '0xc778417E063141139Fce010982780140Aa0cD5Ab' },
    { chainId: 5, address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6' },
    { chainId: 42, address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C' },

    { chainId: 10, address: '0x4200000000000000000000000000000000000006' },
    { chainId: 69, address: '0x4200000000000000000000000000000000000006' },

    { chainId: 42161, address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' },
    { chainId: 421611, address: '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681' },
];

/**
 * Known WETH9 implementation addresses
 */
export const WETH9 = addressChainPairs.reduce<{
    [chainId: number]: TokenERC20;
}>((accumulated, { chainId, address }) => {
    accumulated[chainId] = new TokenERC20({
        chainId,
        address,
        symbol,
        name,
        decimals,
    });
    return accumulated;
}, {});
