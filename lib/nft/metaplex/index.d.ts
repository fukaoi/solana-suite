import { MetaplexObject as _mObject } from './object';
import { MetaplexMetaData as _mMetaData } from './metadata';
import { MetaplexSerialize as _mSerialize } from './serialize';
import { Keypair, TransactionInstruction } from '@solana/web3.js';
export declare const MetaplexMetaData: typeof _mMetaData;
export declare const MetaplexSerialize: typeof _mSerialize;
export declare const MetaplexObject: typeof _mObject;
export declare namespace Metaplex {
    const Object: typeof _mObject;
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
    const initFormat: () => {
        updateAuthority: string;
        mint: string;
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: string;
    };
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
