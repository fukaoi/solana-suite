import { Pubkey, Result, Secret, Instruction } from '@solana-suite/shared';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import { UserSideOutput as UserSideOutput$1 } from 'internals/shared-metaplex';
import { LayoutObject } from '@solana/buffer-layout';

declare namespace Airdrop {
    const request: (pubkey: Pubkey, airdropAmount?: number) => Promise<Result<string, Error>>;
}

/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {Pubkey} mint
 * @param {Pubkey} owner
 * @param {Secret} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
declare namespace AssociatedAccount {
    /**
     * Retry function if create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Secret} feePayer
     * @returns Promise<string>
     */
    const retryGetOrCreate: (mint: Pubkey, owner: Pubkey, feePayer: Secret) => Promise<string>;
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Pubkey} feePayer
     * @returns Promise<string>
     */
    const makeOrCreateInstruction: (mint: Pubkey, owner: Pubkey, feePayer?: Pubkey, allowOwnerOffCurve?: boolean) => Promise<{
        tokenAccount: string;
        inst: TransactionInstruction | undefined;
    }>;
}

declare namespace Memo$2 {
    const decode: (encoded: string) => string;
    const encode: (data: string) => Buffer;
    const create: (data: string, owner: Pubkey, signer: Secret, feePayer?: Secret) => Instruction;
}

declare namespace UserSideOutput {
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
type TokenMetadata = UserSideOutput$1.TokenMetadata;

declare namespace InfraSideOutput {
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

type Find = UserSideOutput$1.TokenMetadata;
type History = UserSideOutput.History;
type OnOk<T extends Find | History> = (ok: T[]) => void;
type OnErr = (err: Error) => void;

declare namespace Memo$1 {
    const getHistory: (target: Pubkey, onOk: OnOk<History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
}

declare const Memo: typeof Memo$2 & typeof Memo$1;

declare namespace Multisig$3 {
    const create: (m: number, feePayer: Secret, signerPubkeys: Pubkey[]) => Promise<Result<Instruction, Error>>;
}

declare namespace Multisig$2 {
    const getInfo: (multisig: Pubkey) => Promise<Result<LayoutObject, Error>>;
}

declare namespace Multisig$1 {
    const isAddress: (multisig: Pubkey) => Promise<Result<boolean, Error>>;
}

declare const Multisig: typeof Multisig$3 & typeof Multisig$2 & typeof Multisig$1;

declare const SolNative: any;

declare const SplToken: any;

export { Airdrop, AssociatedAccount, FilterOptions, FilterType, Find, History, HistoryOptions, InfraSideOutput, Memo, ModuleName, Multisig, OnErr, OnOk, OwnerInfo, PostTokenAccount, SolNative, Sortable, SplToken, TokenMetadata, UserSideOutput, WithMemo };
