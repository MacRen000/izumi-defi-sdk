import invariant from 'invariant';
import { Currency } from './currency';
import { TokenERC20 } from '../main/tokenERC20';
import { config } from '../config';

export interface AbstractCurrencyProps {
    chainId: number;
    decimals: number;
    symbol?: string;
    name?: string;
}

/**
 * Represents the base data of any currency.
 */
export abstract class AbstractCurrency {
    /**
     * Whether the currency is native to the chain and must be wrapped (e.g. Ether)
     */
    public abstract readonly isNative: boolean;
    /**
     * Whether the currency is a token that is ERC20-compliant
     */
    public abstract readonly isERC20: boolean;
    /**
     * The ID of the chain on which the currency resides
     */
    public readonly chainId: number;
    /**
     * The number of decimals used in the currency
     */
    public readonly decimals: number;
    /**
     * The currency's symbol
     */
    public readonly symbol?: string;
    /**
     * The currency's name
     */
    public readonly name?: string;

    /**
     * Constructs a base currency instance
     * @param chainId the ID of the chain on which the currency resides
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     */
    protected constructor({
        chainId,
        decimals,
        symbol,
        name,
    }: AbstractCurrencyProps) {
        invariant(Number.isSafeInteger(chainId), 'chainId');
        invariant(
            decimals >= config.MIN_ALLOWED_DECIMALS &&
                decimals <= config.MAX_ALLOWED_DECIMALS &&
                Number.isInteger(decimals),
            'decimals'
        );

        this.chainId = chainId;
        this.decimals = decimals;
        this.symbol = symbol;
        this.name = name;
    }

    /**
     * Returns whether this currency is functionally equivalent to the other currency
     * @param other the other currency
     */
    public abstract equals(other: Currency): boolean;

    /**
     * Returns the wrapped ERC20-compliant version of this currency that can be used with the Uniswap contracts
     */
    public abstract get wrapERC20(): TokenERC20;
}
