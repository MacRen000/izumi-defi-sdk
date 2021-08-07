import { AbstractCurrency } from './abstractCurrency';

/**
 * Represents the native currency of a particular chain
 */
export abstract class NativeCurrency extends AbstractCurrency {
    public readonly isNative = true;
    public readonly isERC20 = false;
}
