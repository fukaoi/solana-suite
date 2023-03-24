import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { Result, MintInstruction, Pubkey, Secret } from '@solana-suite/shared';
import { InputTokenMetadata, _TokenMetadata } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const createMintInstructions: (mint: PublicKey, owner: PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: _TokenMetadata, feePayer: PublicKey, isMutable: boolean) => Promise<TransactionInstruction[]>;
    const mint: (owner: Pubkey, signer: Secret, totalAmount: number, mintDecimal: number, input: InputTokenMetadata, feePayer?: Secret) => Promise<Result<MintInstruction, Error>>;
}
