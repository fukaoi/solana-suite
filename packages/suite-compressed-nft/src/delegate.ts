import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { Account } from '~/account';
import { DasApi } from '~/das-api';
import { createDelegateInstruction } from 'mpl-bubblegum-instruction';
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';
import { Result, Try } from '~/shared';
import { Transaction } from '~/transaction';
import { DelegateOptions } from '~/types/compressed-nft';
import { Pubkey, Secret } from '~/types/account';

export namespace CompressedNft {
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

    const treeAuthority = Account.Pda.getTreeAuthority(assetProof.tree_id);
    const previousLeafDelegate = ownership.delegate
      ? ownership.delegate.toPublicKey()
      : ownership.owner.toPublicKey();
    console.log('previousLeafDelegate', previousLeafDelegate);
    const newLeafDelegate = newDelegate ? newDelegate : previousLeafDelegate;
    console.log('newLeafDelegate', newLeafDelegate);
    return createDelegateInstruction(
      {
        treeAuthority,
        leafOwner: ownership.owner.toPublicKey(),
        previousLeafDelegate,
        newLeafDelegate,
        merkleTree: assetProof.tree_id.toPublicKey(),
        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
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
   * @param {Pubkey} assetId
   * @param {Secret} signer // new delegate or previous delegate signer
   * @param {Partial<DelegateOptions>} options
   * @return Promise<Result<Transaction, Error>>
   */
  export const setDelegate = async (
    assetId: Pubkey,
    signer: Secret,
    options: Partial<DelegateOptions> = {},
  ): Promise<Result<Transaction, Error>> => {
    return Try(async () => {
      const newDelegate = options.delegate
        ? options.delegate.toPublicKey()
        : null;
      const inst = await createDeleagate(assetId.toPublicKey(), newDelegate);
      return new Transaction([inst], [signer.toKeypair()]);
    });
  };
}
