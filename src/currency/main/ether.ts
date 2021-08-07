import invariant from 'invariant';
import { Currency } from '../base/currency';
import { NativeCurrency } from '../base/nativeCurrency';
import { TokenERC20 } from './tokenERC20';
import { WETH9 } from './weth9';

/**
 * Ether is the main usage of a 'native' currency, i.e. for Ethereum mainnet and all testnets
 */
export class Ether extends NativeCurrency {
    protected constructor(chainId: number) {
        super({
            chainId,
            decimals: 18,
            symbol: 'ETH',
            name: 'Ether',
        });
    }

    public get wrapERC20(): TokenERC20 {
        const weth9 = WETH9[this.chainId];

        invariant(!!weth9, 'wrapERC20');

        return weth9;
    }

    private static etherCache: { [chainId: number]: Ether } = {};

    /**
     * Returns the Ether currency for a particular chain
     * @param chainId the id of the chain
     */
    public static fromChain(chainId: number): Ether {
        if (this.etherCache[chainId] === undefined) {
            this.etherCache[chainId] = new Ether(chainId);
        }

        return this.etherCache[chainId];
    }

    public equals(other: Currency): boolean {
        return other.isNative && other.chainId === this.chainId;
    }
}
