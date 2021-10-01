import { TransactionInstruction } from '@solana/web3.js';
import { MetaplexInstructure } from './index';
export declare namespace MetaplexMetaData {
    const getByMintKey: (mintKey: string) => Promise<{
        name: any;
        symbol: any;
        uri: any;
        updateAuthority: string;
        mint: string;
        sellerFeeBasisPoints: any;
    }>;
    const getByOwner: (ownerPubKey: string) => Promise<{
        name: any;
        symbol: any;
        uri: any;
        updateAuthority: string;
        mint: string;
        sellerFeeBasisPoints: any;
    }[]>;
    const create: (data: MetaplexInstructure.Data, mintKey: string, payer: string, mintAuthorityKey?: string, updateAuthority?: string) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
    const update: (data: MetaplexInstructure.Data, newUpdateAuthority: string | undefined, primarySaleHappened: boolean | null | undefined, mintKey: string, updateAuthority: string, signerSecrets: string[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
}
