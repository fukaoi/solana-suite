import { PublicKey, TransactionInstruction, Keypair } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {PublicKey} mint
 * @param {PublicKey} owner
 * @param {PublicKey} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<Result<string | Instruction, Error>>
 */
export declare namespace AssociatedAccount {
    const get: (mint: PublicKey, owner: PublicKey, feePayer: Keypair, allowOwnerOffCurve?: boolean) => Promise<Result<string | Instruction, Error>>;
    /**
     * Retry function if create new token accouint
     *
     * @param {PublicKey} mint
     * @param {PublicKey} owner
     * @param {PublicKey} feePayer
     * @returns Promise<Result<string, Error>>
     */
    const retryGetOrCreate: (mint: PublicKey, owner: PublicKey, feePayer: Keypair) => Promise<Result<string, Error>>;
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {PublicKey} mint
     * @param {PublicKey} owner
     * @param {PublicKey} feePayer
     * @returns Promise<Result<string, Error>>
     */
    const makeOrCreateInstruction: (mint: PublicKey, owner: PublicKey, feePayer?: PublicKey, allowOwnerOffCurve?: boolean) => Promise<Result<{
        tokenAccount: string;
        inst: TransactionInstruction | undefined;
    }, Error>>;
}
