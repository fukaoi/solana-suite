import { DasApi } from '~/das-api';
import { Pubkey } from '~/types/account';
import { debugLog, Result, Try } from '~/shared';
import { Node } from '~/node';
import { createTransferInstruction } from 'mpl-bubblegum-instruction';
import {
  ConcurrentMerkleTreeAccount,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';
import { Transaction } from '~/transaction';
import { TransactionInstruction } from '@solana/web3.js';

export namespace CompressedNft {
  export const createTransfer = async (
    assetId: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
  ): Promise<TransactionInstruction> => {
    let assetProof = await DasApi.getAssetProof(assetId);
    if (assetProof.isErr) {
      throw assetProof.error;
    } else if (assetProof.isOk && assetProof.value.proof.length === 0) {
      throw Error('Proof is empty. May be set Regular NFT?');
    }

    const asset = await DasApi.getAsset(assetId);
    if (asset.isErr) {
      throw asset.error;
    } else if (asset.isOk && asset.value.ownership.owner !== owner) {
      throw Error(
        `NFT is not owned by the expected owner: ${asset.value.ownership.owner}, ${owner}`,
      );
    }

    debugLog('# assetProof: ', assetProof.value);
    debugLog('# asset: ', asset.value);

    const compression = asset.value.compression;
    const ownership = asset.value.ownership;
    const proof = assetProof.value.proof;
    const merkleTree = compression.tree.toPublicKey();
    const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
      Node.getConnection(),
      merkleTree,
    );
    const treeAuthority = treeAccount.getAuthority();
    const canopyDepth = treeAccount.getCanopyDepth();

    const proofPath = proof
      .map((node: string) => ({
        pubkey: node.toPublicKey(),
        isSigner: false,
        isWritable: false,
      }))
      .slice(0, proof.length - (!!canopyDepth ? canopyDepth : 0));

    const leafOwner = ownership.owner.toPublicKey();
    const newLeafOwner = dest.toPublicKey();
    const leafNonce = compression.leaf_id;
    const leafDelegate = ownership.delegate
      ? ownership.delegate.toPublicKey()
      : leafOwner;

    return createTransferInstruction(
      {
        merkleTree,
        treeAuthority,
        leafOwner,
        leafDelegate,
        newLeafOwner,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        anchorRemainingAccounts: proofPath,
      },
      {
        root: [...assetProof.value.root.trim().toPublicKey().toBytes()],
        dataHash: [...compression.data_hash.trim().toPublicKey().toBytes()],
        creatorHash: [
          ...compression.creator_hash.trim().toPublicKey().toBytes(),
        ],
        nonce: leafNonce,
        index: leafNonce,
      },
    );
  };

  /**
   * transfer nft
   *
   * @param {Pubkey} assetId
   * @param {Pubkey} owner
   * @param {Pubkey} dest
   * @param {Secret[]} signers
   * @param {Secret} feePayer?
   * @return Promise<Result<Transaction, Error>>
   */
  export const transfer = async (
    assetId: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    feePayer?: Secret,
  ): Promise<Result<Transaction, Error>> => {
    return Try(async () => {
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const inst = await createTransfer(assetId, owner, dest);
      return new Transaction([inst], keypairs, payer.toKeypair());
    });
  };
}
