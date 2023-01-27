import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { Result, MintInstruction } from '@solana-suite/shared';
import { InputTokenMetadata } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const createMintInstruction: (connection: Connection, owner: PublicKey, signers: Keypair[], totalAmount: number, mintDecimal: number, tokenMetadata: DataV2, feePayer: Keypair, isMutable: boolean) => Promise<MintInstruction>;
    const mint: (owner: PublicKey, signer: Keypair, totalAmount: number, mintDecimal: number, input: InputTokenMetadata, feePayer?: Keypair) => Promise<Result<MintInstruction, Error>>;
}
