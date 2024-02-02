import {
  AccountMeta,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import { Node } from '~/node';
import { Account } from '~/account';
import { DasApi } from '~/das-api';
import { createDelegateInstruction } from 'mpl-bubblegum-instruction';
import {
  ConcurrentMerkleTreeAccount,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';
import { Result, Try } from '~/suite-utils';
import { TransactionBuilder } from '~/transaction-builder';
import { DelegateOptions } from '~/types/compressed-nft';
import { Pubkey, Secret } from '~/types/account';
import { CommonStructure } from '~/types/transaction-builder';

export namespace CompressedNft {

  /**
   * @internal
   */
  export const createDeleagate = async (
    assetId: PublicKey,
    newDelegate: PublicKey | null,
  ): Promise<TransactionInstruction> => {
    const rpcAssetProof = await DasApi.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi.getAsset(assetId.toString());
    if (rpcAssetProof.isErr || rpcAsset.isErr) {
      throw Error('Rise error when get asset proof or asset');
    }
    const compression = rpcAsset.value.compression;
    const ownership = rpcAsset.value.ownership;
    const assetProof = rpcAssetProof.value;
    const treeOwner = assetProof.tree_id.toPublicKey();

    const treeAuthority = Account.Pda.getTreeAuthority(assetProof.tree_id);
    const previousLeafDelegate = ownership.delegate
      ? ownership.delegate.toPublicKey()
      : ownership.owner.toPublicKey();
    const newLeafDelegate = newDelegate ? newDelegate : previousLeafDelegate;
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

    return createDelegateInstruction(
      {
        treeAuthority,
        leafOwner: ownership.owner.toPublicKey(),
        previousLeafDelegate,
        newLeafDelegate,
        merkleTree: assetProof.tree_id.toPublicKey(),
        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        anchorRemainingAccounts: slicedProof,
      },
      {
        root: [...assetProof.root.trim().toPublicKey().toBytes()],
        dataHash: [...compression.data_hash.trim().toPublicKey().toBytes()],
        creatorHash: [
          ...compression.creator_hash.trim().toPublicKey().toBytes(),
        ],
        nonce: compression.leaf_id,
        index: compression.leaf_id,
      },
    );
  };

  /**
   * Set delegate
   *
   * @param {Pubkey} mint   // target mint
   * @param {Secret} owner   // new delegate or previous delegate signer
   * @param {Partial<DelegateOptions>} options
   * @return Promise<Result<Transaction, Error>>
   */
  export const setDelegate = async (
    mint: Pubkey,
    owner: Secret,
    options: Partial<DelegateOptions> = {},
  ): Promise<Result<CommonStructure, Error>> => {
    return Try(async () => {
      const newDelegate = options.delegate
        ? options.delegate.toPublicKey()
        : null;
      const inst = await createDeleagate(mint.toPublicKey(), newDelegate);
      return new TransactionBuilder.Common([inst], [owner.toKeypair()]);
    });
  };
}
