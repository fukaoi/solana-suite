import { TransactionInstruction } from '@solana/web3.js';
import { MetaplexObject } from './object';
export declare namespace MetaplexMetaData {
    const getByMintKey: (mintKey: string) => Promise<{
        updateAuthority: string;
        mint: string;
        name: string;
        symbol: string;
        uri: string;
    }>;
    const getByOwner: (ownerPubKey: string) => Promise<{
        updateAuthority: string;
        mint: string;
        name: string;
        symbol: string;
        uri: string;
    }[]>;
    const create: (data: MetaplexObject.Data, mintKey: string, payer: string, mintAuthorityKey?: string, updateAuthority?: string) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
    const update: (data: MetaplexObject.Data, newUpdateAuthority: string | undefined, primarySaleHappened: boolean | null | undefined, mintKey: string, updateAuthority: string, signerSecrets: string[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
}
