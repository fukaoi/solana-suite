import { UserSideOutput } from './converter.js';
import { Pubkey } from './account.js';
import { PublicKey } from '@solana/web3.js';
import 'bn.js';
import '@metaplex-foundation/mpl-token-metadata';
import './type-ed05193d.js';

declare namespace CoreUserSideOutput {
    type History = {
        sol?: string;
        account?: string;
        destination?: Pubkey;
        source?: Pubkey;
        authority?: Pubkey;
        multisigAuthority?: Pubkey;
        signers?: Pubkey[];
        mint?: Pubkey;
        mintAuthority?: Pubkey;
        tokenAmount?: string;
        memo?: string;
        dateTime?: Date;
        type?: string;
        sig?: string;
        innerInstruction?: boolean;
    };
}

declare enum Sortable {
    Asc = "asc",
    Desc = "desc"
}
type TokenMetadata = UserSideOutput.TokenMetadata;

declare namespace CoreInfraSideOutput {
    type Transfer = {
        parsed: {
            info: {
                destination: Pubkey;
                source: Pubkey;
                lamports: number;
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type MintTo = {
        parsed: {
            info: {
                account: Pubkey;
                mint: Pubkey;
                mintAuthority: Pubkey;
                tokenAmount: string;
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type MintToChecked = MintTo;
    type TransferChecked = {
        parsed: {
            info: {
                destination: Pubkey;
                mint: Pubkey;
                multisigAuthority: Pubkey;
                signers: Pubkey[];
                source: Pubkey;
                tokenAmount: string;
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type Memo = {
        parsed: string;
        program: string;
        programId: PublicKey;
    };
}

type OwnerInfo = {
    sol: number;
    lamports: number;
    owner: string;
};

type HistoryOptions = {
    waitTime: number;
    narrowDown: number;
};

declare enum FilterType {
    Memo = "memo",
    Mint = "mint",
    OnlyMemo = "only-memo",
    Transfer = "transfer"
}
declare enum ModuleName {
    SolNative = "system",
    SplToken = "spl-token"
}
declare const FilterOptions: {
    Transfer: {
        program: string[];
        action: string[];
    };
    Memo: {
        program: string[];
        action: string[];
    };
    Mint: {
        program: string[];
        action: string[];
    };
};
type PostTokenAccount = {
    account: string;
    owner: string;
};
type WithMemo = {
    sig: string[];
    memo: string;
};

type Find = UserSideOutput.TokenMetadata;
type History = CoreUserSideOutput.History;
type OnOk<T extends Find | History> = (ok: T[]) => void;
type OnErr = (err: Error) => void;

export { CoreInfraSideOutput, CoreUserSideOutput, FilterOptions, FilterType, Find, History, HistoryOptions, ModuleName, OnErr, OnOk, OwnerInfo, PostTokenAccount, Sortable, TokenMetadata, WithMemo };
