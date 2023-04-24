import { Instruction, Pubkey, Result, Secret } from '@solana-suite/shared';
export declare namespace SplToken {
    /**
     * Freezing a target nft
     * it should set to freezeAuthority when mint()
     * @param {Pubkey} mint             // mint address
     * @param {Pubkey} owner            // current owner
     * @param {Secret} freezeAuthority  // setted freeze authority of nft
     * @param {Secret} feePayer?       // fee payer
     */
    const freeze: (mint: Pubkey, owner: Pubkey, freezeAuthority: Secret, feePayer?: Secret) => Result<Instruction, Error>;
}
