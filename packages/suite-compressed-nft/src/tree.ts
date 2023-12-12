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
import { TreeOptions } from '~/types/compressed-nft';

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
   * @param {Pubkey} owner
   * @param {Secret} signer
   * @param {number} maxDepth
   * @param {number} maxBufferSize
   * @param {number} canopyDepth
   * @param {Partial<TreeOptions>} options
   * @return Promise<Result<MintTransaction, Error>>
   */
  export const initTree = (
    owner: Pubkey,
    signer: Secret,
    maxDepth: number,
    maxBufferSize: number,
    canopyDepth: number,
    options: Partial<TreeOptions> = {},
  ): Promise<Result<MintStructure, Error>> => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : signer;
      const treeOwner = Account.Keypair.create();
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
          fromPubkey: payer.toKeypair().publicKey,
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
            treeCreator: owner.toPublicKey(),
            payer: payer.toKeypair().publicKey,
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
        [treeOwner.toKeypair(), signer.toKeypair()],
        payer.toKeypair(),
        treeOwner.pubkey,
      );
    });
  };

  /**
   * create a new nft space
   * This function needs only 1 call
   *
   * @param {Pubkey} owner
   * @param {Secret} signer
   * @param {number} spaceSize
   * @param {Partial<TreeOptions>} options
   *
   * @return Promise<Result<MintTransaction, Error>>
   */
  export const createMintSpace = async (
    owner: Pubkey,
    signer: Secret,
    spaceSize: number,
    options: Partial<TreeOptions> = {},
  ): Promise<Result<MintStructure, Error>> => {
    const { maxDepth, maxBufferSize, canopyDepth } =
      calculateSpaceNumberToDepth(spaceSize);
    return initTree(
      owner,
      signer,
      maxDepth,
      maxBufferSize,
      canopyDepth,
      options,
    );
  };

  /**
   * Calculate space cost
   *
   * @param {number} spaceSize
   * @return Promise<{sol: number}>
   */
  export const calculateSpaceCost = async (spaceSize: number) => {
    const { maxDepth, maxBufferSize, canopyDepth } =
      calculateSpaceNumberToDepth(spaceSize);
    const requiredSpace = getConcurrentMerkleTreeAccountSize(
      maxDepth,
      maxBufferSize,
      canopyDepth,
    );
    const lamports =
      await Node.getConnection().getMinimumBalanceForRentExemption(
        requiredSpace,
      );
    return { sol: lamports.toSol() };
  };

  /// Initialization parameters for an SPL ConcurrentMerkleTree.
  ///
  /// Only the following permutations are valid:
  ///
  /// | max_depth | max_buffer_size       |
  /// | --------- | --------------------- |
  /// | 3         | (8)                   | node: 8
  /// | 14        | (64, 256, 1024, 2048) | node: 16,384
  /// | 20        | (64, 256, 1024, 2048) | node: 131,072
  /// | 24        | (64, 256, 512, 1024, 2048) | node: 1,048,576
  /// | 26        | (64, 256, 512, 1024, 2048) | node: ???
  /// | 30        | (512, 1024, 2048) | node: 1,073,741,824
  const calculateSpaceNumberToDepth = (space: number) => {
    const log2 = Math.ceil(Math.log2(space));
    debugLog('# log2: ', log2, 2 ** log2);
    const matched = ALL_DEPTH_SIZE_PAIRS.filter(
      (pair) => pair.maxDepth === log2,
    )[0];
    const canopyDepth = matched.maxDepth - 5;
    return {
      maxDepth: matched.maxDepth,
      maxBufferSize: matched.maxBufferSize,
      canopyDepth,
    };
  };
}
