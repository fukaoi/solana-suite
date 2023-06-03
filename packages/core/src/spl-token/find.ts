import { debugLog, Node, Pubkey, Result } from '@solana-suite/shared';
import { Find, Sortable } from '../types/';
import {
  Convert,
  InfraSideOutput,
  Pda,
  UserSideInput,
  UserSideOutput,
} from '@solana-suite/shared-metaplex';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { ParsedAccountData } from '@solana/web3.js';
import fetch from 'cross-fetch';

export namespace SplToken {
  const UNABLE_ERROR_REGEX = /Unable to find Metadata account/;

  // Sort by latest with unixtimestamp function
  const sortByUinixTimestamp =
    <T extends UserSideOutput.NftMetadata | UserSideOutput.TokenMetadata>(
      sortable: Sortable
    ) =>
    (a: T, b: T): number => {
      if (!a.offchain.created_at) {
        a.offchain.created_at = 0;
      }
      if (!b.offchain.created_at) {
        b.offchain.created_at = 0;
      }
      if (sortable === Sortable.Desc) {
        return b.offchain.created_at - a.offchain.created_at;
      } else if (sortable === Sortable.Asc) {
        return a.offchain.created_at - b.offchain.created_at;
      } else {
        return b.offchain.created_at - a.offchain.created_at;
      }
    };

  const converter = <T>(
    tokenStandard: UserSideInput.TokenStandard,
    metadata: Metadata,
    json: InfraSideOutput.Offchain,
    tokenAmount: string
  ): T => {
    if (tokenStandard === UserSideInput.TokenStandard.Fungible) {
      return Convert.TokenMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json,
        },
        tokenAmount
      ) as T;
    } else if (tokenStandard === UserSideInput.TokenStandard.NonFungible) {
      return Convert.NftMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json,
        },
        tokenAmount
      ) as T;
    } else {
      throw Error(`No match tokenStandard: ${tokenStandard}`);
    }
  };

  export const genericFindByOwner = async <
    T extends UserSideOutput.NftMetadata | UserSideOutput.TokenMetadata
  >(
    owner: Pubkey,
    callback: (result: Result<T[], Error>) => void,
    tokenStandard: UserSideInput.TokenStandard,
    sortable?: Sortable,
    isHolder?: boolean
  ): Promise<void> => {
    try {
      let data: T[] = [];
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      info.value.length === 0 && callback(Result.ok([]));

      for await (const d of info.value) {
        if (isHolder && d.account.data.parsed.info.tokenAmount.uiAmount < 1) {
          debugLog(
            '# findByOwner no hold metadata: ',
            d.account.data.parsed.info
          );
          continue;
        }
        const mint = d.account.data.parsed.info.mint as Pubkey;
        const tokenAmount = d.account.data.parsed.info.tokenAmount.amount;

        try {
          const metadata = await Metadata.fromAccountAddress(
            connection,
            Pda.getMetadata(mint)
          );
          debugLog('# findByOwner metadata: ', metadata);
          // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
          if (metadata.tokenStandard !== tokenStandard) {
            continue;
          }
          fetch(metadata.data.uri)
            .then((response) => {
              response
                .json()
                .then((json: InfraSideOutput.Offchain) => {
                  data.push(
                    converter<T>(tokenStandard, metadata, json, tokenAmount)
                  );
                  callback(Result.ok(data)); // need this call ?
                })
                .catch((e) => {
                  callback(Result.err(e));
                })
                .finally(() => {
                  const descAlgo = sortByUinixTimestamp<T>(Sortable.Desc);
                  const ascAlgo = sortByUinixTimestamp<T>(Sortable.Asc);
                  if (sortable === Sortable.Desc) {
                    data = data.sort(descAlgo);
                  } else if (sortable === Sortable.Asc) {
                    data = data.sort(ascAlgo);
                  }
                  callback(Result.ok(data));
                });
            })
            .catch((e) => {
              callback(Result.err(e));
            });
        } catch (e) {
          if (e instanceof Error && UNABLE_ERROR_REGEX.test(e.message)) {
            debugLog('# skip error for old SPL-TOKEN: ', mint);
            continue;
          }
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };

  export const genericFindByMint = async <
    T extends UserSideOutput.NftMetadata | UserSideOutput.TokenMetadata
  >(
    mint: Pubkey,
    tokenStandard: UserSideInput.TokenStandard
  ): Promise<Result<UserSideOutput.TokenMetadata, Error>> => {
    try {
      let data: T;
      const connection = Node.getConnection();

      const metadata = await Metadata.fromAccountAddress(
        connection,
        Pda.getMetadata(mint)
      );
      debugLog('# findByMint metadata: ', metadata);
      // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error('token standards are different');
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data as ParsedAccountData).parsed.info
        .supply as string;

      const response = await (await fetch(metadata.data.uri)).json();
      data = converter<T>(tokenStandard, metadata, response, tokenAmount);
      return Result.ok(data);
    } catch (e: any) {
      return Result.err(e);
    }
  };

  /**
   * Fetch minted metadata by owner Pubkey
   *
   * @param {Pubkey} owner
   * @param {OnOk} onOk callback function
   * @param {OnErr} onErr callback function
   * @param {{sortable?: Sortable, isHolder?: boolean}} options?
   * @return Promise<void>
   */
  export const findByOwner = (
    owner: Pubkey,
    onOk: Find.OnOk,
    onErr: Find.OnErr,
    options?: { sortable?: Sortable; isHolder?: boolean }
  ): void => {
    const sortable = !options?.sortable ? Sortable.Desc : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    genericFindByOwner<UserSideOutput.TokenMetadata>(
      owner,
      (result) => {
        result.match(onOk, onErr);
      },
      UserSideInput.TokenStandard.Fungible,
      sortable,
      isHolder
    );
  };

  /**
   * Fetch minted metadata by mint address
   *
   * @param {Pubkey} mint
   * @return Promise<Result<UserSideOutput.TokenMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey
  ): Promise<Result<UserSideOutput.TokenMetadata, Error>> => {
    return await genericFindByMint<UserSideOutput.TokenMetadata>(
      mint,
      UserSideInput.TokenStandard.Fungible
    );
  };
}
