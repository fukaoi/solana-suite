import {
  ALL_DEPTH_SIZE_PAIRS,
  ConcurrentMerkleTreeAccount,
  getConcurrentMerkleTreeAccountSize,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import {
  createCreateTreeInstruction,
  PROGRAM_ADDRESS as MPL_BUBBLEGUM_PROGRAM_ID,
} from 'mpl-bubblegum-instruction';
import { Account } from '~/account';
import { Pubkey } from '~/types/account';
import { Constants, debugLog, Result, Try } from '~/suite-utils';
import { Node } from '~/node';
import { TransactionBuilder } from '~/transaction-builder';
import { MintStructure } from '~/types/transaction-builder';
import { SpaceNumber, SpaceOptions } from '~/types/compressed-nft';

export namespace CompressedNft {
  export class Space {
    spaceOwner: Pubkey;
    constructor(spaceOwner: Pubkey) {
      this.spaceOwner = spaceOwner;
    }

    getAssetId = async (): Promise<Pubkey> => {
      const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
        Node.getConnection(),
        this.spaceOwner.toPublicKey(),
      );
      const leafIndex = treeAccount.tree.rightMostPath.index - 1;
      return Account.Pda.getAssetId(this.spaceOwner, leafIndex);
    };
  }

  /**
   * @internal
   * create a new markle tree
   * This function needs only 1 call
   *
   * @param {Secret} owner
   * @param {number} maxDepth
   * @param {number} maxBufferSize
   * @param {number} canopyDepth
   * @param {Partial<SpaceOptions>} options
   * @return Promise<Result<MintTransaction, Error>>
   */
  export const initSpace = (
    owner: Secret,
    maxDepth: number,
    maxBufferSize: number,
    canopyDepth: number,
    options: Partial<SpaceOptions> = {},
  ): Promise<Result<MintStructure, Error>> => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : owner;
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
      debugLog('# nft space: ', space);

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
            treeCreator: owner.toKeypair().publicKey,
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
        [treeOwner.toKeypair(), owner.toKeypair()],
        payer.toKeypair(),
        treeOwner.pubkey,
      );
    });
  };

  /**
   * create a new nft space
   * This function needs only 1 call
   *
   * @param {Secret} owner
   * @param {SpaceNumber} spaceSize
   * @param {Partial<SpaceOptions>} options
   *
   * @return Promise<Result<MintTransaction, Error>>
   */
  export const createSpace = async (
    owner: Secret,
    spaceSize: SpaceNumber,
    options: Partial<SpaceOptions> = {},
  ): Promise<Result<MintStructure, Error>> => {
    const { maxDepth, maxBufferSize, canopyDepth } =
      calculateSpaceNumberToDepth(spaceSize);
    return initSpace(owner, maxDepth, maxBufferSize, canopyDepth, options);
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

  // @internal
  /// Initialization parameters for an SPL ConcurrentMerkleTree.
  ///
  /// Only the following permutations are valid:
  ///
  /// | max_depth | max_buffer_size       |
  /// | --------- | --------------------- |
  /// | 3         | (8)                   | node: 8
  /// | 14        | (64, 256, 1024, 2048) | node: 16,384
  /// | 20        | (64, 256, 1024, 2048) | node: 1,048,576
  /// | 24        | (64, 256, 512, 1024, 2048) | node: 16,777,216
  /// | 26        | (64, 256, 512, 1024, 2048) | node: 67,108,864
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
