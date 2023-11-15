import { DasApi } from '~/das-api';
import { Pubkey } from '~/types/account';
import { debugLog, Try } from '~/shared';
import { Node } from '~/node';
import { createTransferInstruction } from 'mpl-bubblegum-instruction';
import {
  ConcurrentMerkleTreeAccount,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';
import { Transaction } from '~/transaction';

export namespace CompressedNft {
  export const transfer = async (
    assetId: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signer: Secret,
    feePayer?: Secret,
  ) => {
    return Try(async () => {
      const payer = feePayer ? feePayer : signer;

      let assetProof = await DasApi.getAssetProof(assetId);
      if (assetProof.isErr) {
        throw assetProof.error;
      } else if (assetProof.isOk && assetProof.value.proof.length === 0) {
        throw Error('Proof is empty');
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

      let inst = createTransferInstruction(
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
      return new Transaction([inst], [signer.toKeypair()], payer.toKeypair());
    });
  };
}