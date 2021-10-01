import { MetaplexObject as _mObject } from './object';
import { MetaplexMetaData as _mMetaData } from './metadata';
import { Keypair, TransactionInstruction } from '@solana/web3.js';
export declare const MetaplexObject: typeof _mObject;
export declare const MetaplexMetaData: typeof _mMetaData;
export declare namespace Metaplex {
    interface Creators {
    }
    interface MetadataFormat {
        name: string;
        uri: string;
        symbol: string;
        update_authority: string;
        creators?: Creators[];
        seller_fee_basis_points?: number;
        primary_sale_happened?: boolean;
    }
    const create: (payer: string, signerSecrets: string[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<{
        instructions: TransactionInstruction[];
        signers: Keypair[];
        mintKey: string;
    }>;
    const mint: (data: _mObject.Data, owner: {
        pubkey: string;
        secret: string;
    }) => Promise<{
        mintKey: string;
        signature: string;
    }>;
}
