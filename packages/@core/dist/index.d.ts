import * as _solana_suite_shared from '@solana-suite/shared';
import { Pubkey, Result, Secret } from '@solana-suite/shared';
import * as _solana_web3_js from '@solana/web3.js';
import { TransactionInstruction, PublicKey } from '@solana/web3.js';
import * as shared_metaplex from 'shared-metaplex';
import { UserSideOutput as UserSideOutput$1 } from 'shared-metaplex';
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
    getHistory: (target: _solana_suite_shared.Pubkey, onOk: OnOk<UserSideOutput.History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
    decode: (encoded: string) => string;
    encode: (data: string) => Buffer;
    create: (data: string, owner: _solana_suite_shared.Pubkey, signer: _solana_suite_shared.Secret, feePayer?: _solana_suite_shared.Secret | undefined) => _solana_suite_shared.Instruction;
};

declare const Multisig: {
    isAddress: (multisig: _solana_suite_shared.Pubkey) => Promise<_solana_suite_shared.Result<boolean, Error>>;
    getInfo: (multisig: _solana_suite_shared.Pubkey) => Promise<_solana_suite_shared.Result<_solana_buffer_layout.LayoutObject, Error>>;
    create: (m: number, feePayer: _solana_suite_shared.Secret, signerPubkeys: _solana_suite_shared.Pubkey[]) => Promise<_solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>>;
};

declare const SolNative: {
    transferWithMultisig: (owner: _solana_suite_shared.Pubkey, dest: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], amount: number, feePayer?: _solana_suite_shared.Secret | undefined) => Promise<_solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>>;
    transfer: (source: _solana_suite_shared.Pubkey, dest: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], amount: number, feePayer?: _solana_suite_shared.Secret | undefined) => _solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>;
    getHistory: (target: _solana_suite_shared.Pubkey, filterType: FilterType, onOk: OnOk<UserSideOutput.History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (owner: _solana_suite_shared.Pubkey, dest: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], amount: number, feePayer: _solana_suite_shared.Pubkey) => Promise<_solana_suite_shared.Result<_solana_suite_shared.PartialSignInstruction, Error>>;
    findByOwner: (owner: _solana_suite_shared.Pubkey) => Promise<_solana_suite_shared.Result<OwnerInfo, Error>>;
};

declare const SplToken: {
    transfer: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, dest: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], amount: number, mintDecimal: number, feePayer?: _solana_suite_shared.Secret | undefined) => Promise<_solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>>;
    thaw: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, freezeAuthority: _solana_suite_shared.Secret, feePayer?: _solana_suite_shared.Secret | undefined) => _solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>;
    createFreezeAuthority: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, freezeAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: _solana_suite_shared.Pubkey, signer: _solana_suite_shared.Secret, totalAmount: number, mintDecimal: number, input: UserSideInput.TokenMetadata, feePayer?: _solana_suite_shared.Secret | undefined, freezeAuthority?: _solana_suite_shared.Pubkey | undefined) => Promise<_solana_suite_shared.Result<_solana_suite_shared.MintInstruction, Error>>;
    getHistory: (target: _solana_suite_shared.Pubkey, filterType: FilterType, onOk: OnOk<UserSideOutput.History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, dest: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], amount: number, mintDecimal: number, feePayer: _solana_suite_shared.Pubkey) => Promise<_solana_suite_shared.Result<_solana_suite_shared.PartialSignInstruction, Error>>;
    freeze: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, freezeAuthority: _solana_suite_shared.Secret, feePayer?: _solana_suite_shared.Secret | undefined) => _solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>;
    genericFindByOwner: <T extends shared_metaplex.UserSideOutput.TokenMetadata | shared_metaplex.UserSideOutput.NftMetadata>(owner: _solana_suite_shared.Pubkey, callback: (result: _solana_suite_shared.Result<T[], Error>) => void, tokenStandard: shared_metaplex.UserSideInput.TokenStandard, sortable?: Sortable | undefined, isHolder?: boolean | undefined) => Promise<void>;
    genericFindByMint: <T_1 extends shared_metaplex.UserSideOutput.TokenMetadata | shared_metaplex.UserSideOutput.NftMetadata>(mint: _solana_suite_shared.Pubkey, tokenStandard: shared_metaplex.UserSideInput.TokenStandard) => Promise<_solana_suite_shared.Result<T_1, Error>>;
    findByOwner: (owner: _solana_suite_shared.Pubkey, onOk: OnOk<shared_metaplex.UserSideOutput.TokenMetadata>, onErr: OnErr, options?: {
        sortable?: Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => void;
    findByMint: (mint: _solana_suite_shared.Pubkey) => Promise<_solana_suite_shared.Result<shared_metaplex.UserSideOutput.TokenMetadata, Error>>;
    burn: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], burnAmount: number, tokenDecimals: number, feePayer?: _solana_suite_shared.Secret | undefined) => _solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>;
    add: (token: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], totalAmount: number, mintDecimal: number, feePayer?: _solana_suite_shared.Secret | undefined) => Promise<_solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>>;
};

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

export { Airdrop, AssociatedAccount, FilterOptions, FilterType, Find, History, HistoryOptions, InfraSideOutput, Memo, ModuleName, Multisig, OnErr, OnOk, OwnerInfo, PostTokenAccount, SolNative, Sortable, SplToken, TokenMetadata, UserSideOutput, WithMemo };
