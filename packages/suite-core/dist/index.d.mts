import * as shared from 'shared';
import { Result } from 'shared';
import * as types_account from 'types/account';
import { Pubkey as Pubkey$1 } from 'types/account';
import * as instruction from 'instruction';
import * as types_core from 'types/core';
import * as _solana_buffer_layout from '@solana/buffer-layout';
import * as types_converter from 'types/converter';
import * as _metaplex_foundation_mpl_token_metadata from '@metaplex-foundation/mpl-token-metadata';
import * as _solana_web3_js from '@solana/web3.js';

declare namespace Airdrop {
    const request: (pubkey: Pubkey$1, airdropAmount?: number) => Promise<Result<string, Error>>;
}

declare const Memo: {
    getHistory: (target: types_account.Pubkey, onOk: types_core.OnOk<types_core.UserSideOutput.History>, onErr: types_core.OnErr, options?: Partial<types_core.HistoryOptions>) => Promise<void>;
    decode: (encoded: string) => string;
    encode: (data: string) => Buffer;
    create: (data: string, owner: types_account.Pubkey, signer: types_account.Secret, feePayer?: types_account.Secret | undefined) => instruction.Instruction;
};

declare const Multisig: {
    isAddress: (multisig: types_account.Pubkey) => Promise<shared.Result<boolean, Error>>;
    getInfo: (multisig: types_account.Pubkey) => Promise<shared.Result<_solana_buffer_layout.LayoutObject, Error>>;
    create: (m: number, feePayer: types_account.Secret, signerPubkeys: types_account.Pubkey[]) => Promise<shared.Result<instruction.Instruction, Error>>;
};

declare const SolNative: {
    transferWithMultisig: (owner: types_account.Pubkey, dest: types_account.Pubkey, signers: types_account.Secret[], amount: number, feePayer?: types_account.Secret | undefined) => Promise<shared.Result<instruction.Instruction, Error>>;
    transfer: (source: types_account.Pubkey, dest: types_account.Pubkey, signers: types_account.Secret[], amount: number, feePayer?: types_account.Secret | undefined) => shared.Result<instruction.Instruction, Error>;
    getHistory: (target: types_account.Pubkey, filterType: types_core.FilterType, onOk: types_core.OnOk<types_core.UserSideOutput.History>, onErr: types_core.OnErr, options?: Partial<types_core.HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (owner: types_account.Pubkey, dest: types_account.Pubkey, signers: types_account.Secret[], amount: number, feePayer: types_account.Pubkey) => Promise<shared.Result<instruction.PartialSignInstruction, Error>>;
    findByOwner: (owner: types_account.Pubkey) => Promise<shared.Result<types_core.OwnerInfo, Error>>;
};

declare const SplToken: {
    transfer: (mint: types_account.Pubkey, owner: types_account.Pubkey, dest: types_account.Pubkey, signers: types_account.Secret[], amount: number, mintDecimal: number, feePayer?: types_account.Secret | undefined) => Promise<shared.Result<instruction.Instruction, Error>>;
    thaw: (mint: types_account.Pubkey, owner: types_account.Pubkey, freezeAuthority: types_account.Secret, feePayer?: types_account.Secret | undefined) => shared.Result<instruction.Instruction, Error>;
    createFreezeAuthority: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, freezeAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: types_account.Pubkey, signer: types_account.Secret, totalAmount: number, mintDecimal: number, input: types_converter.UserSideInput.TokenMetadata, feePayer?: types_account.Secret | undefined, freezeAuthority?: types_account.Pubkey | undefined) => Promise<shared.Result<instruction.MintInstruction, Error>>;
    getHistory: (target: types_account.Pubkey, filterType: types_core.FilterType, onOk: types_core.OnOk<types_core.UserSideOutput.History>, onErr: types_core.OnErr, options?: Partial<types_core.HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (mint: types_account.Pubkey, owner: types_account.Pubkey, dest: types_account.Pubkey, signers: types_account.Secret[], amount: number, mintDecimal: number, feePayer: types_account.Pubkey) => Promise<shared.Result<instruction.PartialSignInstruction, Error>>;
    freeze: (mint: Pubkey, owner: Pubkey, freezeAuthority: Secret, feePayer?: Secret | undefined) => shared.Result<instruction.Instruction, Error>;
    genericFindByOwner: <T extends types_converter.UserSideOutput.TokenMetadata | types_converter.UserSideOutput.NftMetadata>(owner: types_account.Pubkey, callback: (result: shared.Result<T[], Error>) => void, tokenStandard: types_converter.UserSideInput.TokenStandard, sortable?: types_core.Sortable | undefined, isHolder?: boolean | undefined) => Promise<void>;
    genericFindByMint: <T_1 extends types_converter.UserSideOutput.TokenMetadata | types_converter.UserSideOutput.NftMetadata>(mint: types_account.Pubkey, tokenStandard: types_converter.UserSideInput.TokenStandard) => Promise<shared.Result<T_1, Error>>;
    findByOwner: (owner: types_account.Pubkey, onOk: types_core.OnOk<types_converter.UserSideOutput.TokenMetadata>, onErr: types_core.OnErr, options?: {
        sortable?: types_core.Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => void;
    findByMint: (mint: types_account.Pubkey) => Promise<shared.Result<types_converter.UserSideOutput.TokenMetadata, Error>>;
    burn: (mint: types_account.Pubkey, owner: types_account.Pubkey, signers: types_account.Secret[], burnAmount: number, tokenDecimals: number, feePayer?: types_account.Secret | undefined) => shared.Result<instruction.Instruction, Error>;
    add: (token: types_account.Pubkey, owner: types_account.Pubkey, signers: types_account.Secret[], totalAmount: number, mintDecimal: number, feePayer?: types_account.Secret | undefined) => Promise<shared.Result<instruction.Instruction, Error>>;
};

export { Airdrop, Memo, Multisig, SolNative, SplToken };
