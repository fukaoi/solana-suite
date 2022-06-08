import { PublicKey, TransactionInstruction, Signer } from '@solana/web3.js';
import { Instruction, Result } from '@solana-suite/shared';
import { MetaplexInstructure } from './';
export * from './instructure';
export * from './metadata';
export * from './serialize';
export * from './account';
export declare namespace MetaplexInstruction {
    const mintAccount: (instructions: TransactionInstruction[], owner: PublicKey, signers: Signer[]) => Promise<{
        mintAccount: PublicKey;
        signers: Signer[];
    }>;
    const mint: (instructions: TransactionInstruction[], createdAccount: PublicKey, owner: PublicKey, freezeAuthority: PublicKey) => Promise<string>;
}
export declare namespace Metaplex {
    interface Creators {
    }
    interface Format {
        name: string;
        uri: string;
        symbol: string;
        update_authority: string;
        creators?: Creators[];
        seller_fee_basis_points?: number;
        primary_sale_happened?: boolean;
    }
    const initFormat: () => Format;
    const initializeMint: (payer: PublicKey, signers: Signer[]) => Promise<{
        instructions: TransactionInstruction[];
        signers: Signer[];
        mint: string;
    }>;
    const mint: (data: MetaplexInstructure.Data, owner: PublicKey, signers: Signer[]) => Promise<Result<Instruction, Error>>;
    const burn: (mint: PublicKey, owner: PublicKey, signers: Signer[], feePayer?: Signer) => Promise<Result<Instruction, Error>>;
}
