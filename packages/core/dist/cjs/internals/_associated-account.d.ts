import { PublicKey, TransactionInstruction, Keypair } from '@solana/web3.js';
/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {PublicKey} mint
 * @param {PublicKey} owner
 * @param {PublicKey} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
export declare namespace Internals_AssociatedAccount {
    /**
     * Retry function if create new token accouint
     *
     * @param {PublicKey} mint
     * @param {PublicKey} owner
     * @param {PublicKey} feePayer
     * @returns Promise<string>
     */
    const retryGetOrCreate: (mint: PublicKey, owner: PublicKey, feePayer: Keypair) => Promise<string>;
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {PublicKey} mint
     * @param {PublicKey} owner
     * @param {PublicKey} feePayer
     * @returns Promise<string>
     */
    const makeOrCreateInstruction: (mint: PublicKey, owner: PublicKey, feePayer?: PublicKey, allowOwnerOffCurve?: boolean) => Promise<{
        tokenAccount: string;
        inst: TransactionInstruction | undefined;
    }>;
}
