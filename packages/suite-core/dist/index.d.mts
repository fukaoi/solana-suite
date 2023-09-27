import * as shared from 'shared';
import { Pubkey, Result, Secret } from 'shared';
import * as _solana_web3_js from '@solana/web3.js';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import { UserSideOutput as UserSideOutput$2 } from 'types/converter';
import * as _solana_buffer_layout from '@solana/buffer-layout';
import * as _metaplex_foundation_mpl_token_metadata from '@metaplex-foundation/mpl-token-metadata';

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

declare const Memo: {
    getHistory: (target: shared.Pubkey, onOk: OnOk<UserSideOutput$1.History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
    decode: (encoded: string) => string;
    encode: (data: string) => Buffer;
    create: (data: string, owner: shared.Pubkey, signer: shared.Secret, feePayer?: shared.Secret) => shared.Instruction;
};

declare const Multisig: {
    isAddress: (multisig: shared.Pubkey) => Promise<shared.Result<boolean, Error>>;
    getInfo: (multisig: shared.Pubkey) => Promise<shared.Result<_solana_buffer_layout.LayoutObject, Error>>;
    create: (m: number, feePayer: shared.Secret, signerPubkeys: shared.Pubkey[]) => Promise<shared.Result<shared.Instruction, Error>>;
};

declare const SolNative: {
    transferWithMultisig: (owner: shared.Pubkey, dest: shared.Pubkey, signers: shared.Secret[], amount: number, feePayer?: shared.Secret) => Promise<shared.Result<shared.Instruction, Error>>;
    transfer: (source: shared.Pubkey, dest: shared.Pubkey, signers: shared.Secret[], amount: number, feePayer?: shared.Secret) => shared.Result<shared.Instruction, Error>;
    getHistory: (target: shared.Pubkey, filterType: FilterType, onOk: OnOk<UserSideOutput$1.History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (owner: shared.Pubkey, dest: shared.Pubkey, signers: shared.Secret[], amount: number, feePayer: shared.Pubkey) => Promise<shared.Result<shared.PartialSignInstruction, Error>>;
    findByOwner: (owner: shared.Pubkey) => Promise<shared.Result<OwnerInfo, Error>>;
};

declare const SplToken: {
    transfer: (mint: shared.Pubkey, owner: shared.Pubkey, dest: shared.Pubkey, signers: shared.Secret[], amount: number, mintDecimal: number, feePayer?: shared.Secret) => Promise<shared.Result<shared.Instruction, Error>>;
    thaw: (mint: shared.Pubkey, owner: shared.Pubkey, freezeAuthority: shared.Secret, feePayer?: shared.Secret) => shared.Result<shared.Instruction, Error>;
    createFreezeAuthority: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, freezeAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: shared.Pubkey, signer: shared.Secret, totalAmount: number, mintDecimal: number, input: UserSideInput.TokenMetadata, feePayer?: shared.Secret, freezeAuthority?: shared.Pubkey) => Promise<shared.Result<shared.MintInstruction, Error>>;
    getHistory: (target: shared.Pubkey, filterType: FilterType, onOk: OnOk<UserSideOutput$1.History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (mint: shared.Pubkey, owner: shared.Pubkey, dest: shared.Pubkey, signers: shared.Secret[], amount: number, mintDecimal: number, feePayer: shared.Pubkey) => Promise<shared.Result<shared.PartialSignInstruction, Error>>;
    freeze: (mint: shared.Pubkey, owner: shared.Pubkey, freezeAuthority: shared.Secret, feePayer?: shared.Secret) => shared.Result<shared.Instruction, Error>;
    genericFindByOwner: <T extends unknown>(owner: shared.Pubkey, callback: (result: shared.Result<T[], Error>) => void, tokenStandard: UserSideInput.TokenStandard, sortable?: Sortable, isHolder?: boolean) => Promise<void>;
    genericFindByMint: <T_1 extends unknown>(mint: shared.Pubkey, tokenStandard: UserSideInput.TokenStandard) => Promise<shared.Result<T_1, Error>>;
    findByOwner: (owner: shared.Pubkey, onOk: OnOk<SharendMetaplex.TokenMetadata>, onErr: OnErr, options?: {
        sortable?: Sortable;
        isHolder?: boolean;
    }) => void;
    findByMint: (mint: shared.Pubkey) => Promise<shared.Result<UserSideOutput.TokenMetadata, Error>>;
    burn: (mint: shared.Pubkey, owner: shared.Pubkey, signers: shared.Secret[], burnAmount: number, tokenDecimals: number, feePayer?: shared.Secret) => shared.Result<shared.Instruction, Error>;
    add: (token: shared.Pubkey, owner: shared.Pubkey, signers: shared.Secret[], totalAmount: number, mintDecimal: number, feePayer?: shared.Secret) => Promise<shared.Result<shared.Instruction, Error>>;
};

declare namespace UserSideOutput$1 {
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
type TokenMetadata = UserSideOutput$2.TokenMetadata;

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

type Find = UserSideOutput$2.TokenMetadata;
type History = UserSideOutput$1.History;
type OnOk<T extends Find | History> = (ok: T[]) => void;
type OnErr = (err: Error) => void;

export { Airdrop, AssociatedAccount, FilterOptions, FilterType, Find, History, HistoryOptions, InfraSideOutput, Memo, ModuleName, Multisig, OnErr, OnOk, OwnerInfo, PostTokenAccount, SolNative, Sortable, SplToken, TokenMetadata, UserSideOutput$1 as UserSideOutput, WithMemo };
