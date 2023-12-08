import {
  ALL_DEPTH_SIZE_PAIRS,
  ConcurrentMerkleTreeAccount,
  getConcurrentMerkleTreeAccountSize,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';
import { MPL_BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { createCreateTreeInstruction } from 'mpl-bubblegum-instruction';
import { Account } from '~/account';
import { Pubkey } from '~/types/account';
import { Constants, debugLog, Result, Try } from '~/shared';
import { Node } from '~/node';
import { TransactionBuilder } from '~/transaction-builder';
import { MintStructure } from '~/types/transaction-builder';

export namespace CompressedNft {
  export class Tree {
    treeOwner: Pubkey;
    constructor(treeOwner: Pubkey) {
      this.treeOwner = treeOwner;
    }

    getAssetId = async (): Promise<Pubkey> => {
      const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
        Node.getConnection(),
        this.treeOwner.toPublicKey(),
      );
      const leafIndex = treeAccount.tree.rightMostPath.index - 1;
      return Account.Pda.getAssetId(this.treeOwner, leafIndex);
    };
  }

  /**
   * create a new markle tree
   * This function needs only 1 call
   *
   * @param {Secret} feePayer
   * @param {number} maxDepth
   * @param {number} maxBufferSize
   * @return Promise<Result<MintTransaction, Error>>
   */
  export const initTree = (
    feePayer: Secret,
    maxDepth: number,
    maxBufferSize: number,
  ): Promise<Result<MintStructure, Error>> => {
    return Try(async () => {
      const treeOwner = Account.Keypair.create();
      const canopyDepth = maxDepth - 5;
      const space = getConcurrentMerkleTreeAccountSize(
        maxDepth,
        maxBufferSize,
        canopyDepth,
      );
      const [treeAuthority] = PublicKey.findProgramAddressSync(
        [treeOwner.toKeypair().publicKey.toBuffer()],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey(),
      );
      const instructions = [];

      debugLog(`# maxDepth: ${maxDepth}, maxBufferSize: ${maxBufferSize}`);
      debugLog('# tree space: ', space);

      if (Constants.isDebugging === 'true' || process.env.DEBUG === 'true') {
        debugLog('# space cost: ', await calculateSpaceCost(space));
      }

      instructions.push(
        SystemProgram.createAccount({
          fromPubkey: feePayer.toKeypair().publicKey,
          newAccountPubkey: treeOwner.toKeypair().publicKey,
          lamports:
            await Node.getConnection().getMinimumBalanceForRentExemption(space),
          space: space,
          programId: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        }),
      );

      instructions.push(
        createCreateTreeInstruction(
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
        ),
      );

      return new TransactionBuilder.Mint(
        instructions,
        [treeOwner.toKeypair()],
        feePayer.toKeypair(),
        treeOwner.pubkey,
      );
    });
  };

  export const initMintTotal = async (
    total: number,
    feePayer: Secret,
  ): Promise<Result<MintStructure, Error>> => {
    const log2 = Math.ceil(Math.log2(total));
    debugLog('# log2: ', log2, 2 ** log2);
    const matched = ALL_DEPTH_SIZE_PAIRS.filter(
      (pair) => pair.maxDepth === log2,
    )[0];
    return initTree(feePayer, matched.maxDepth, matched.maxBufferSize);
  };

  export const calculateSpaceCost = async (space: number) => {
    const lamports =
      await Node.getConnection().getMinimumBalanceForRentExemption(space);
    return { sol: lamports.toSol() };
  };
}
