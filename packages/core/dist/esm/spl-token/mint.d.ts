import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Result, MintInstruction, Pubkey, Secret } from '@solana-suite/shared';
import { InputTokenMetadata, _TokenMetadata } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const createMintInstruction: (connection: Connection, mint: PublicKey, owner: PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: _TokenMetadata, feePayer: PublicKey, isMutable: boolean, signers?: Keypair[]) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
    const mint: (owner: Pubkey, signer: Secret, totalAmount: number, mintDecimal: number, input: InputTokenMetadata, feePayer?: Secret) => Promise<Result<MintInstruction, Error>>;
}
