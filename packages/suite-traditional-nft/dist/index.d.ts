import * as types_core from 'types/core';
import * as types_converter from 'types/converter';
import * as _metaplex_foundation_mpl_token_metadata from '@metaplex-foundation/mpl-token-metadata';
import * as _solana_web3_js from '@solana/web3.js';
import * as shared from 'shared';
import * as instruction from 'instruction';

declare const TraditionalNft: {
    transfer: (mint: string, owner: string, dest: string, signers: string[], feePayer?: string | undefined) => Promise<shared.Result<instruction.Instruction, Error>>;
    thaw: (mint: string, owner: string, freezeAuthority: string, feePayer?: string | undefined) => shared.Result<instruction.Instruction, Error>;
    createDeleagateInstruction: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, delegateAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, nftMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: string, signer: string, input: types_converter.UserSideInput.NftMetadata, feePayer?: string | undefined, freezeAuthority?: string | undefined) => Promise<shared.Result<instruction.MintInstruction, Error>>;
    feePayerPartialSignTransferNft: (mint: string, owner: string, dest: string, signers: string[], feePayer: string) => Promise<shared.Result<instruction.PartialSignInstruction, Error>>;
    feePayerPartialSignMint: (owner: string, signer: string, input: types_converter.UserSideInput.NftMetadata, feePayer: string, freezeAuthority?: string | undefined) => Promise<shared.Result<instruction.PartialSignInstruction, Error>>;
    freeze: (mint: string, owner: string, freezeAuthority: string, feePayer?: string | undefined) => shared.Result<instruction.Instruction, Error>;
    findByOwner: (owner: string, onOk: types_core.OnOk<types_converter.UserSideOutput.TokenMetadata>, onErr: types_core.OnErr, options?: {
        sortable?: types_core.Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => Promise<void>;
    findByMint: (mint: string) => Promise<shared.Result<types_converter.UserSideOutput.NftMetadata, Error>>;
    burn: (mint: string, owner: string, signer: string, feePayer?: string | undefined) => shared.Result<instruction.Instruction, Error>;
};

export { TraditionalNft };
