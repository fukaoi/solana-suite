import {
  getConcurrentMerkleTreeAccountSize,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';
import { MPL_BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { Account, debugLog, Try } from '~/shared';
import { Node } from '~/node';
import { Transaction } from '~/transaction';
import { createCreateTreeInstruction } from 'mpl-bubblegum-instruction';

/**
 * create a new markle tree
 * This function needs only 1 call
 *
 * @param {feePayer} Secret
 * @param {maxDepth} number
 * @param {maxBufferSize} number
 * @return Promise<Result<Instruction, Error>>
 */
export namespace CompressedNft {
  export const initTree = (
    feePayer: Secret,
    maxDepth: number = 14,
    maxBufferSize: number = 64,
  ) => {
    return Try(async () => {
      const treeOwner = Account.Keypair.create();
      const space = getConcurrentMerkleTreeAccountSize(maxDepth, maxBufferSize);
      const [treeAuthority] = PublicKey.findProgramAddressSync(
        [treeOwner.toKeypair().publicKey.toBuffer()],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey(),
      );

      debugLog('# tree space: ', space);

      const inst1 = SystemProgram.createAccount({
        fromPubkey: feePayer.toKeypair().publicKey,
        newAccountPubkey: treeOwner.toKeypair().publicKey,
        lamports:
          await Node.getConnection().getMinimumBalanceForRentExemption(space),
        space: space,
        programId: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
      });

      const inst2 = createCreateTreeInstruction(
        {
          merkleTree: treeOwner.toKeypair().publicKey,
          treeAuthority,
          treeCreator: feePayer.toKeypair().publicKey,
          payer: feePayer.toKeypair().publicKey,
          logWrapper: SPL_NOOP_PROGRAM_ID,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        },
        {
          maxBufferSize,
          maxDepth,
          public: false,
        },
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey(),
      );

      return new Transaction(
        [inst1, inst2],
        [treeOwner.toKeypair()],
        feePayer.toKeypair(),
        treeOwner
      );
    });
  };
}
