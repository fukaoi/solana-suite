import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Result, MintInstruction } from '@solana-suite/shared';
import { InputTokenMetadata, TokenMetadata } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const createMintInstruction: (connection: Connection, mint: PublicKey, owner: PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: TokenMetadata, feePayer: PublicKey, isMutable: boolean, signers?: Keypair[]) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
    const mint: (owner: PublicKey, signer: Keypair, totalAmount: number, mintDecimal: number, input: InputTokenMetadata, feePayer?: Keypair) => Promise<Result<MintInstruction, Error>>;
}
