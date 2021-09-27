import { TransactionInstruction } from '@solana/web3.js';
import { MetaplexObject } from './object';
import { MetaplexSerialize } from './serialize';
export declare namespace MetaplexMetaData {
    const getByMintKey: (mintKey: string) => Promise<MetaplexSerialize.MetaData | undefined>;
    const getByOwner: (ownerPubKey: string) => Promise<MetaplexSerialize.MetaData[] | undefined>;
    const create: (data: MetaplexObject.Data, mintKey: string, payer: string, mintAuthorityKey?: string, updateAuthority?: string) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
    const update: (data: MetaplexObject.Data | undefined, newUpdateAuthority: string | undefined, primarySaleHappened: boolean | null | undefined, mintKey: string, updateAuthority: string, signerSecrets: string[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
}
