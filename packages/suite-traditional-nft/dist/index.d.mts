import * as _solana_suite_core from '@solana-suite/core';
import * as types_converter from 'types/converter';
import { UserSideOutput } from 'types/converter';
import * as _metaplex_foundation_mpl_token_metadata from '@metaplex-foundation/mpl-token-metadata';
import * as _solana_web3_js from '@solana/web3.js';
import * as shared from 'shared';

declare const Metaplex: {
    transfer: (mint: shared.Pubkey, owner: shared.Pubkey, dest: shared.Pubkey, signers: shared.Secret[], feePayer?: shared.Secret | undefined) => Promise<shared.Result<shared.Instruction, Error>>;
    thaw: (mint: shared.Pubkey, owner: shared.Pubkey, freezeAuthority: shared.Secret, feePayer?: shared.Secret | undefined) => shared.Result<shared.Instruction, Error>;
    createDeleagateInstruction: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, delegateAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, nftMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: shared.Pubkey, signer: shared.Secret, input: types_converter.UserSideInput.NftMetadata, feePayer?: shared.Secret | undefined, freezeAuthority?: shared.Pubkey | undefined) => Promise<shared.Result<shared.MintInstruction, Error>>;
    feePayerPartialSignTransferNft: (mint: shared.Pubkey, owner: shared.Pubkey, dest: shared.Pubkey, signers: shared.Secret[], feePayer: shared.Pubkey) => Promise<shared.Result<shared.PartialSignInstruction, Error>>;
    feePayerPartialSignMint: (owner: shared.Pubkey, signer: shared.Secret, input: types_converter.UserSideInput.NftMetadata, feePayer: shared.Pubkey, freezeAuthority?: shared.Secret | undefined) => Promise<shared.Result<shared.PartialSignInstruction, Error>>;
    freeze: (mint: shared.Pubkey, owner: shared.Pubkey, freezeAuthority: shared.Secret, feePayer?: shared.Secret | undefined) => shared.Result<shared.Instruction, Error>;
    findByOwner: (owner: shared.Pubkey, onOk: _solana_suite_core.OnOk<types_converter.UserSideOutput.TokenMetadata>, onErr: _solana_suite_core.OnErr, options?: {
        sortable?: _solana_suite_core.Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => Promise<void>;
    findByMint: (mint: shared.Pubkey) => Promise<shared.Result<types_converter.UserSideOutput.NftMetadata, Error>>;
    burn: (mint: shared.Pubkey, owner: shared.Pubkey, signer: shared.Secret, feePayer?: shared.Secret | undefined) => shared.Result<shared.Instruction, Error>;
};

type NftMetadata = UserSideOutput.NftMetadata;

export { Metaplex, NftMetadata };
