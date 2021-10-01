import { Keypair, TransactionInstruction } from '@solana/web3.js';
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
    const create: (payer: string, signerSecrets: string[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<{
        instructions: TransactionInstruction[];
        signers: Keypair[];
        mintKey: string;
    }>;
    const mint: (data: MetaplexInstructure.Data, owner: {
        pubkey: string;
        secret: string;
    }) => Promise<{
        mintKey: string;
        signature: string;
    }>;
}
