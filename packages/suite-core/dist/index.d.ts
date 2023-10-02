import * as shared from 'shared';
import { Result } from 'shared';
import { Pubkey } from 'types/account';
import * as instruction from 'instruction';
import * as types_core from 'types/core';
import * as _solana_buffer_layout from '@solana/buffer-layout';
import * as types_coverter from 'types/coverter';
import * as types_converter from 'types/converter';
import * as _metaplex_foundation_mpl_token_metadata from '@metaplex-foundation/mpl-token-metadata';
import * as _solana_web3_js from '@solana/web3.js';

declare namespace Airdrop {
    const request: (pubkey: Pubkey, airdropAmount?: number) => Promise<Result<string, Error>>;
}

declare const Memo: {
    getHistory: (target: string, onOk: types_core.OnOk<types_core.CoreUserSideOutput.History>, onErr: types_core.OnErr, options?: Partial<types_core.HistoryOptions>) => Promise<void>;
    decode: (encoded: string) => string;
    encode: (data: string) => Buffer;
    create: (data: string, owner: string, signer: string, feePayer?: string | undefined) => instruction.Instruction;
};

declare const Multisig: {
    isAddress: (multisig: string) => Promise<shared.Result<boolean, Error>>;
    getInfo: (multisig: string) => Promise<shared.Result<_solana_buffer_layout.LayoutObject, Error>>;
    create: (m: number, feePayer: string, signerPubkeys: string[]) => Promise<shared.Result<instruction.Instruction, Error>>;
};

declare const SolNative: {
    transferWithMultisig: (owner: string, dest: string, signers: string[], amount: number, feePayer?: string | undefined) => Promise<shared.Result<instruction.Instruction, Error>>;
    transfer: (source: string, dest: string, signers: string[], amount: number, feePayer?: string | undefined) => shared.Result<instruction.Instruction, Error>;
    getHistory: (target: string, filterType: types_core.FilterType, onOk: types_core.OnOk<types_core.CoreUserSideOutput.History>, onErr: types_core.OnErr, options?: Partial<types_core.HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (owner: string, dest: string, signers: string[], amount: number, feePayer: string) => Promise<shared.Result<instruction.PartialSignInstruction, Error>>;
    findByOwner: (owner: string) => Promise<shared.Result<types_core.OwnerInfo, Error>>;
};

declare const SplToken: {
    transfer: (mint: string, owner: string, dest: string, signers: string[], amount: number, mintDecimal: number, feePayer?: string | undefined) => Promise<shared.Result<instruction.Instruction, Error>>;
    thaw: (mint: string, owner: string, freezeAuthority: string, feePayer?: string | undefined) => shared.Result<instruction.Instruction, Error>;
    createFreezeAuthority: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, freezeAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: string, signer: string, totalAmount: number, mintDecimal: number, input: types_converter.UserSideInput.TokenMetadata, feePayer?: string | undefined, freezeAuthority?: string | undefined) => Promise<shared.Result<instruction.MintInstruction, Error>>;
    getHistory: (target: string, filterType: types_core.FilterType, onOk: types_core.OnOk<types_core.CoreUserSideOutput.History>, onErr: types_core.OnErr, options?: Partial<types_core.HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (mint: string, owner: string, dest: string, signers: string[], amount: number, mintDecimal: number, feePayer: string) => Promise<shared.Result<instruction.PartialSignInstruction, Error>>;
    genericFindByOwner: <T extends types_converter.UserSideOutput.NftMetadata | types_converter.UserSideOutput.TokenMetadata>(owner: string, callback: (result: shared.Result<T[], Error>) => void, tokenStandard: types_converter.UserSideInput.TokenStandard, sortable?: types_core.Sortable | undefined, isHolder?: boolean | undefined) => Promise<void>;
    genericFindByMint: <T_1 extends types_converter.UserSideOutput.NftMetadata | types_converter.UserSideOutput.TokenMetadata>(mint: string, tokenStandard: types_converter.UserSideInput.TokenStandard) => Promise<shared.Result<T_1, Error>>;
    findByOwner: (owner: string, onOk: types_core.OnOk<types_coverter.UserSideOutput.TokenMetadata>, onErr: types_core.OnErr, options?: {
        sortable?: types_core.Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => void;
    findByMint: (mint: string) => Promise<shared.Result<types_coverter.UserSideOutput.TokenMetadata, Error>>;
    burn: (mint: string, owner: string, signers: string[], burnAmount: number, tokenDecimals: number, feePayer?: string | undefined) => shared.Result<instruction.Instruction, Error>;
    add: (token: string, owner: string, signers: string[], totalAmount: number, mintDecimal: number, feePayer?: string | undefined) => Promise<shared.Result<instruction.Instruction, Error>>;
};

export { Airdrop, Memo, Multisig, SolNative, SplToken };
