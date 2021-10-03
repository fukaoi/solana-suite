import { Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { MetaplexInstructure } from './instructure';
export * from './instructure';
export * from './metadata';
export * from './serialize';
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
    const create: (payer: PublicKey, signers: Keypair[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<{
        instructions: TransactionInstruction[];
        signers: Keypair[];
        tokenKey: string;
    }>;
    const mint: (data: MetaplexInstructure.Data, owner: Keypair) => Promise<{
        tokenKey: string;
        signature: string;
    }>;
}
