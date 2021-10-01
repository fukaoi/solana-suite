import { TransactionInstruction } from '@solana/web3.js';
import { MetaplexInstructure } from './index';
export declare namespace MetaplexMetaData {
    const getByMintKey: (mintKey: string) => Promise<{
        name: string;
        symbol: string;
        uri: string;
        updateAuthority: string;
        mint: string;
        sellerFeeBasisPoints: number;
    } | {
        updateAuthority: string;
        mint: string;
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: string;
    }>;
    const getByOwner: (ownerPubKey: string) => Promise<({
        name: string;
        symbol: string;
        uri: string;
        updateAuthority: string;
        mint: string;
        sellerFeeBasisPoints: number;
    } | {
        updateAuthority: string;
        mint: string;
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: string;
    })[]>;
    const create: (data: MetaplexInstructure.Data, mintKey: string, payer: string, mintAuthorityKey?: string, updateAuthority?: string) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
    const update: (data: MetaplexInstructure.Data, newUpdateAuthority: string | undefined, primarySaleHappened: boolean | null | undefined, mintKey: string, updateAuthority: string, signerSecrets: string[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
}
