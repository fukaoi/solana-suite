import { TransactionInstruction } from '@solana/web3.js';
import { Pubkey, Secret } from '@solana-suite/shared';
/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {Pubkey} mint
 * @param {Pubkey} owner
 * @param {Pubkey} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
export declare namespace AssociatedAccount {
    /**
     * Retry function if create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Secret} feePayer
     * @returns Promise<string>
     */
    const retryGetOrCreate: (mint: Pubkey, owner: Pubkey, feePayer: Secret) => Promise<string>;
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Pubkey} feePayer
     * @returns Promise<string>
     */
    const makeOrCreateInstruction: (mint: Pubkey, owner: Pubkey, feePayer?: Pubkey, allowOwnerOffCurve?: boolean) => Promise<{
        tokenAccount: string;
        inst: TransactionInstruction | undefined;
    }>;
}
