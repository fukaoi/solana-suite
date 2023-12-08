import { InputNftMetadata } from '~/types/regular-nft';
import { Pubkey, Secret } from '~/types/account';
import { Node } from '~/node';
import { TransactionBuilder } from '~/transaction-builder';
import { Result, Try } from '~/shared';
import { DasApi } from '~/das-api';
import {
  computeCreatorHash,
  computeDataHash,
  createVerifyCreatorInstruction,
  Creator,
  MetadataArgs,
} from 'mpl-bubblegum-instruction';
import {
  ConcurrentMerkleTreeAccount,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';

import {
  AccountMeta,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import { CommonStructure } from '~/types/transaction-builder';
import { Converter } from '~/converter';

export namespace CompressedNft {
  export const createVerifyCreator = async (
    creators: Creator[],
    assetId: PublicKey,
    treeOwner: PublicKey,
    metadata: MetadataArgs,
    feePayer: PublicKey,
  ): Promise<TransactionInstruction> => {
    const rpcAssetProof = await DasApi.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi.getAsset(assetId.toString());
    if (rpcAssetProof.isErr || rpcAsset.isErr) {
      throw Error('Rise error when get asset proof or asset');
    }
    const compression = rpcAsset.value.compression;
    const ownership = rpcAsset.value.ownership;
    const assetProof = rpcAssetProof.value;

    const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
      Node.getConnection(),
      treeOwner,
    );
    const canopyDepth = treeAccount.getCanopyDepth();
    const slicedProof: AccountMeta[] = assetProof.proof
      .map((node: string) => ({
        pubkey: node.toPublicKey(),
        isSigner: false,
        isWritable: false,
      }))
      .slice(0, assetProof.proof.length - (canopyDepth ? canopyDepth : 0));

    return createVerifyCreatorInstruction(
      {
        treeAuthority: treeOwner,
        leafOwner: ownership.owner.toPublicKey(),
        leafDelegate: (ownership.delegate || ownership.owner).toPublicKey(),
        merkleTree: assetProof.tree_id.toPublicKey(),
        payer: feePayer,

        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        creator: feePayer,

        // provide the sliced proof
        anchorRemainingAccounts: slicedProof,
      },
      {
        root: [...assetProof.root.trim().toPublicKey().toBytes()],
        creatorHash: [...computeCreatorHash(creators)],
        dataHash: [...computeDataHash(metadata)],
        nonce: compression.leaf_id,
        index: compression.leaf_id,
        message: metadata,
      },
    );
  };

  export const createCreator = async (
    mint: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    feePayer: Secret,
    treeOwner: Pubkey,
  ): Promise<Result<CommonStructure, Error>> => {
    return Try(async () => {
      const metadata = Converter.CompressedNftMetadata.intoInfra(input, '', 0);
      const instruction = await createVerifyCreator(
        metadata.creators,
        mint.toPublicKey(),
        treeOwner.toPublicKey(),
        metadata,
        feePayer.toKeypair().publicKey,
      );

      return new TransactionBuilder.Common(
        [instruction],
        [signer.toKeypair()],
        feePayer.toKeypair(),
      );
    });
  };
}
