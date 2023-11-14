import { DasApi } from '~/das-api';
import { Pubkey } from '~/types/account';
import { Account, bufferToArray, debugLog, Try } from '~/shared';
import { PublicKey } from '@solana/web3.js';
import { createTransferInstruction } from 'mpl-bubblegum-instruction';
import {
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';
import bs58 from 'bs58';
import { Transaction } from '~/transaction';

export namespace CompressedNft {
  export const transfer = async (
    assetId: Pubkey,
    treeOwner: Pubkey,
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
      const proofPath = assetProof.value.proof.map((node: string) => ({
        pubkey: node.toPublicKey(),
        isSigner: false,
        isWritable: false,
      }));

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
      const treeId = assetProof.value.tree_id;

      const leafNonce = compression.leaf_id;
      const treeAuthority = Account.Pda.getTreeAuthority(treeOwner);
      const leafDelegate = ownership.delegate
        ? ownership.delegate.toPublicKey()
        : ownership.owner.toPublicKey();

      let inst = createTransferInstruction(
        {
          treeAuthority,
          leafOwner: ownership.owner.toPublicKey(),
          leafDelegate: leafDelegate,
          newLeafOwner: dest.toPublicKey(),
          merkleTree: treeId.toPublicKey(),
          logWrapper: SPL_NOOP_PROGRAM_ID,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          anchorRemainingAccounts: proofPath,
        },
        {
          root: bufferToArray(bs58.decode(assetProof.value.root)),
          dataHash: bufferToArray(bs58.decode(compression.data_hash.trim())),
          creatorHash: bufferToArray(
            bs58.decode(compression.creator_hash.trim()),
          ),
          nonce: leafNonce,
          index: leafNonce,
        },
      );
      return new Transaction([inst], [signer.toKeypair()], payer.toKeypair());
    });
  };
}
