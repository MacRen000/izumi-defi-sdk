import invariant from 'invariant';
import { getValidatedAddress } from '../../utils';
import {
    AbstractCurrency,
    AbstractCurrencyProps,
} from '../base/abstractCurrency';
import { Currency } from '../base/currency';

type TokenERC20Props = AbstractCurrencyProps & {
    address: string;
};

/**
 * Represents an ERC20 token with a unique contract address and information describing it.
 */
export class TokenERC20 extends AbstractCurrency {
    public readonly isNative = false;
    public readonly isERC20 = true;

    /**
     * The address of the token's contract on the chain on which the token lives
     */
    public readonly address: string;

    public constructor({ address, ...props }: TokenERC20Props) {
        super(props);
        this.address = getValidatedAddress(address);
    }

    /**
     * Returns true if the two tokens are equivalent, that is,
     * they are both ERC20-compliant, have the same chain id and address.
     * @param other the other currency to compare with
     */
    public equals(other: Currency): boolean {
        return (
            other.isERC20 &&
            this.chainId === other.chainId &&
            this.address === other.address
        );
    }

    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other the other token to compare with
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    public sortsBefore(other: TokenERC20): boolean {
        invariant(this.chainId === other.chainId, 'different chainId');
        invariant(this.address !== other.address, 'same address');
        return this.address.toLowerCase() < other.address.toLowerCase();
    }

    /**
     * Returns an ERC20-compliant version of the token, which is just the token itself
     * in this case, and not a wrapped token
     */
    public get wrapERC20(): TokenERC20 {
        return this;
    }
}
