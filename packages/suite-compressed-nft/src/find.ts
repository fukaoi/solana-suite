import { Pubkey } from '~/types/account';
import { DasApi } from '~/das-api';
import { Account } from '~/account';
import { Node } from '~/node';
import { Constants, Result, Try } from '~/suite-utils';
import { Metadata, NftMetadata } from '~/types/nft';
import { FindOptions } from '~/types/find';
import {
  ChangeLogEventV1,
  deserializeChangeLogEventV1,
  SPL_NOOP_PROGRAM_ID,
} from '@solana/spl-account-compression';

import bs58 from 'bs58';

export namespace CompressedNft {
  /**
   * Find nft by owner address
   *
   * @param {Pubkey} owner
   * @param {Partial<FindOptions>} options
   * @return Promise<Result<CompressedNftMetadata, Error>>
   */
  export const findByOwner = async (
    owner: Pubkey,
    options: Partial<FindOptions> = {},
  ): Promise<Result<NftMetadata, Error>> => {
    return Try(async () => {
      return await DasApi.findByOwner(owner, true, options);
    });
  };

  /**
   * Find nft by mint address
   *
   * @param {Pubkey} mint
   * @return Promise<Result<NftMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey,
  ): Promise<Result<Partial<Metadata>, Error>> => {
    return Try(async () => {
      return await DasApi.findByMint(mint, true);
    });
  };

  /**
   * Find nft by collection mint
   *
   * @param {Pubkey} collectionMint
   * @param {Partial<FindOptions>} options
   * @return Promise<Result<CompressedNftMetadata, Error>>
   */
  export const findByCollection = async (
    collectionMint: Pubkey,
    options: Partial<FindOptions> = {},
  ): Promise<Result<NftMetadata, Error>> => {
    return Try(async () => {
      return DasApi.findByCollection(collectionMint, true, options);
    });
  };

  /**
   * Find cNFT mint id by transaction signature
   *
   * @param {string} signature
   * @return Promise<Result<Pubkey, Error>>
   */
  export const findMintIdBySignature = async (
    signature: string,
  ): Promise<Result<Pubkey, Error>> => {
    return Try(async () => {
      await Node.confirmedSig(signature, Constants.COMMITMENT);
      const txResponse = await Node.getConnection().getTransaction(signature, {
        commitment: Constants.COMMITMENT,
        maxSupportedTransactionVersion: Constants.MAX_TRANSACTION_VERSION,
      });

      if (!txResponse) throw Error('No txResponse provided');

      const accountKeys = txResponse.transaction.message
        .getAccountKeys()
        .keySegments()
        .flat();

      const changeLogEvents: ChangeLogEventV1[] = [];

      txResponse!.meta?.innerInstructions?.forEach((compiledIx) => {
        compiledIx.instructions.forEach((innerIx) => {
          if (
            SPL_NOOP_PROGRAM_ID.toBase58() !==
            accountKeys[innerIx.programIdIndex].toBase58()
          ) {
            return;
          }
          try {
            changeLogEvents.push(
              deserializeChangeLogEventV1(
                Buffer.from(bs58.decode(innerIx.data)),
              ),
            );
          } catch (_) {
            //noop, catch error deserialized
          }
        });
      });
      const leafIndex = changeLogEvents[0].index;
      const spaceOwner = changeLogEvents[0].treeId;
      return Account.Pda.getAssetId(spaceOwner.toString(), leafIndex);
    });
  };
}
