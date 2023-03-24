import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
export declare namespace SplToken {
    const createMintInstructions: (mint: PublicKey, owner: PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: DataV2, feePayer: PublicKey, isMutable: boolean) => Promise<TransactionInstruction[]>;
}
