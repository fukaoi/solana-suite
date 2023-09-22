import * as _solana_suite_core from '@solana-suite/core';
import * as internals_shared_metaplex from 'internals/shared-metaplex';
import { UserSideOutput } from 'internals/shared-metaplex';
import * as _metaplex_foundation_mpl_token_metadata from '@metaplex-foundation/mpl-token-metadata';
import * as _solana_web3_js from '@solana/web3.js';
import * as _solana_suite_shared from '@solana-suite/shared';

declare const Metaplex: {
    transfer: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, dest: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], feePayer?: _solana_suite_shared.Secret | undefined) => Promise<_solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>>;
    thaw: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, freezeAuthority: _solana_suite_shared.Secret, feePayer?: _solana_suite_shared.Secret | undefined) => _solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>;
    createDeleagateInstruction: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, delegateAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, nftMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: _solana_suite_shared.Pubkey, signer: _solana_suite_shared.Secret, input: internals_shared_metaplex.UserSideInput.NftMetadata, feePayer?: _solana_suite_shared.Secret | undefined, freezeAuthority?: _solana_suite_shared.Pubkey | undefined) => Promise<_solana_suite_shared.Result<_solana_suite_shared.MintInstruction, Error>>;
    feePayerPartialSignTransferNft: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, dest: _solana_suite_shared.Pubkey, signers: _solana_suite_shared.Secret[], feePayer: _solana_suite_shared.Pubkey) => Promise<_solana_suite_shared.Result<_solana_suite_shared.PartialSignInstruction, Error>>;
    feePayerPartialSignMint: (owner: _solana_suite_shared.Pubkey, signer: _solana_suite_shared.Secret, input: internals_shared_metaplex.UserSideInput.NftMetadata, feePayer: _solana_suite_shared.Pubkey, freezeAuthority?: _solana_suite_shared.Secret | undefined) => Promise<_solana_suite_shared.Result<_solana_suite_shared.PartialSignInstruction, Error>>;
    freeze: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, freezeAuthority: _solana_suite_shared.Secret, feePayer?: _solana_suite_shared.Secret | undefined) => _solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>;
    findByOwner: (owner: _solana_suite_shared.Pubkey, onOk: _solana_suite_core.OnOk<internals_shared_metaplex.UserSideOutput.TokenMetadata>, onErr: _solana_suite_core.OnErr, options?: {
        sortable?: _solana_suite_core.Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => Promise<void>;
    findByMint: (mint: _solana_suite_shared.Pubkey) => Promise<_solana_suite_shared.Result<internals_shared_metaplex.UserSideOutput.NftMetadata, Error>>;
    burn: (mint: _solana_suite_shared.Pubkey, owner: _solana_suite_shared.Pubkey, signer: _solana_suite_shared.Secret, feePayer?: _solana_suite_shared.Secret | undefined) => _solana_suite_shared.Result<_solana_suite_shared.Instruction, Error>;
};

type NftMetadata = UserSideOutput.NftMetadata;

export { Metaplex, NftMetadata };
