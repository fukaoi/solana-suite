import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { MintInstruction, Pubkey, Result, Secret } from '@solana-suite/shared';
import { UserSideInput } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const createFreezeAuthority: (mint: PublicKey, owner: PublicKey, freezeAuthority: PublicKey) => TransactionInstruction;
    const createMintInstructions: (mint: PublicKey, owner: PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: DataV2, feePayer: PublicKey, isMutable: boolean) => Promise<TransactionInstruction[]>;
    /**
     * SPL-TOKEN mint
     *
     * @param {Pubkey} owner       // token owner
     * @param {Secret} signer      // token owner Secret
     * @param {number} totalAmount // total number
     * @param {number} mintDecimal // token decimal
     * @param {Pubkey} input       // token metadata
     * @param {Secret} feePayer?   // fee payer
     * @param {Pubkey} freezeAuthority? // freeze authority
     * @return Promise<Result<MintInstruction, Error>>
     */
    const mint: (owner: Pubkey, signer: Secret, totalAmount: number, mintDecimal: number, input: UserSideInput.TokenMetadata, feePayer?: Secret, freezeAuthority?: Pubkey) => Promise<Result<MintInstruction, Error>>;
}
//# sourceMappingURL=mint.d.ts.map