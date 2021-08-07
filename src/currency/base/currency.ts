import { NativeCurrency } from './nativeCurrency';
import { TokenERC20 } from '../main/tokenERC20';

/**
 * A currency is any fungible financial instrument.
 * This includes all ERC20-compliant tokens, Ether,
 * and other currencies native to particular chains
 */
export type Currency = NativeCurrency | TokenERC20;
