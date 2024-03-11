import { PublicKey } from '@solana/web3.js';
import { Pubkey } from './account.mjs';

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

export { FilterOptions, FilterType, Memo, MintTo, MintToChecked, ModuleName, PostTokenAccount, Transfer, TransferChecked, WithMemo };
