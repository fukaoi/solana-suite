import * as types_core from 'types/core';
import * as types_converter from 'types/converter';
import * as _metaplex_foundation_mpl_token_metadata from '@metaplex-foundation/mpl-token-metadata';
import * as _solana_web3_js from '@solana/web3.js';
import * as shared from 'shared';
import * as instruction from 'instruction';
import * as types_account from 'types/account';

declare const TraditionalNft: {
    transfer: (mint: types_account.Pubkey, owner: types_account.Pubkey, dest: types_account.Pubkey, signers: types_account.Secret[], feePayer?: types_account.Secret | undefined) => Promise<shared.Result<instruction.Instruction, Error>>;
    thaw: (mint: types_account.Pubkey, owner: types_account.Pubkey, freezeAuthority: types_account.Secret, feePayer?: types_account.Secret | undefined) => shared.Result<instruction.Instruction, Error>;
    createDeleagateInstruction: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, delegateAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, nftMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: types_account.Pubkey, signer: types_account.Secret, input: types_converter.UserSideInput.NftMetadata, feePayer?: types_account.Secret | undefined, freezeAuthority?: types_account.Pubkey | undefined) => Promise<shared.Result<instruction.MintInstruction, Error>>;
    feePayerPartialSignTransferNft: (mint: types_account.Pubkey, owner: types_account.Pubkey, dest: types_account.Pubkey, signers: types_account.Secret[], feePayer: types_account.Pubkey) => Promise<shared.Result<instruction.PartialSignInstruction, Error>>;
    feePayerPartialSignMint: (owner: types_account.Pubkey, signer: types_account.Secret, input: types_converter.UserSideInput.NftMetadata, feePayer: types_account.Pubkey, freezeAuthority?: types_account.Secret | undefined) => Promise<shared.Result<instruction.PartialSignInstruction, Error>>;
    freeze: (mint: types_account.Pubkey, owner: types_account.Pubkey, freezeAuthority: types_account.Secret, feePayer?: types_account.Secret | undefined) => shared.Result<instruction.Instruction, Error>;
    findByOwner: (owner: types_account.Pubkey, onOk: types_core.OnOk<types_converter.UserSideOutput.TokenMetadata>, onErr: types_core.OnErr, options?: {
        sortable?: types_core.Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => Promise<void>;
    findByMint: (mint: types_account.Pubkey) => Promise<shared.Result<types_converter.UserSideOutput.NftMetadata, Error>>;
    burn: (mint: types_account.Pubkey, owner: types_account.Pubkey, signer: types_account.Secret, feePayer?: types_account.Secret | undefined) => shared.Result<instruction.Instruction, Error>;
};

export { TraditionalNft };
