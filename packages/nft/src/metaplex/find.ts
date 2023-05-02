import { debugLog, Node, Pubkey, Result } from '@solana-suite/shared';
import {
  Convert,
  InfraSideOutput,
  Pda,
  UserSideInput,
  UserSideOutput,
} from '@solana-suite/shared-metaplex';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import fetch from 'cross-fetch';

// Sort by latest with unixtimestamp function
export const sortByUinixTimestamp =
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
      throw Error(`No match sortable: ${sortable}`);
    }
  };

export enum Sortable {
  Asc = 'asc',
  Desc = 'desc',
}

export type FindByOwnerCallback = <T>(result: Result<T[], Error>) => void;

export const converter = <T>(
  tokenStandard: UserSideInput.TokenStandard,
  metadata: Metadata,
  json: InfraSideOutput.Offchain
): T => {
  if (tokenStandard === UserSideInput.TokenStandard.Fungible) {
    return Convert.TokenMetadata.intoUserSide({
      onchain: metadata,
      offchain: json,
    }) as T;
  } else if (tokenStandard === UserSideInput.TokenStandard.NonFungible) {
    return Convert.NftMetadata.intoUserSide({
      onchain: metadata,
      offchain: json,
    }) as T;
  } else {
    throw Error(`No match tokenStandard: ${tokenStandard}`);
  }
};

export const genericFindByOwner = async <
  T extends UserSideOutput.NftMetadata | UserSideOutput.TokenMetadata
>(
  owner: Pubkey,
  callback: FindByOwnerCallback,
  tokenStandard: UserSideInput.TokenStandard,
  sortable?: Sortable
): Promise<void> => {
  let datas: T[] = [];
  try {
    const connection = Node.getConnection();
    const info = await connection.getParsedTokenAccountsByOwner(
      owner.toPublicKey(),
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    for await (const d of info.value) {
      const mint = d.account.data.parsed.info.mint;
      const metadata = await Metadata.fromAccountAddress(
        connection,
        Pda.getMetadata(mint)
      );
      debugLog('# findByOwner metadata: ', metadata);
      // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
      if (metadata.tokenStandard !== tokenStandard) {
        continue;
      }
      fetch(metadata.data.uri).then((response) => {
        debugLog('# findByOwner response: ', metadata);
        response
          .json()
          .then((json) => {
            datas.push(converter(tokenStandard, metadata, json));
            const descAlgo = sortByUinixTimestamp<T>(Sortable.Desc);
            const ascAlgo = sortByUinixTimestamp<T>(Sortable.Asc);
            if (sortable === Sortable.Desc) {
              datas = datas.sort(descAlgo);
            } else if (sortable === Sortable.Asc) {
              datas = datas.sort(ascAlgo);
            }
            callback(Result.ok(datas));
          })
          .catch((e) => {
            callback(Result.err(e));
          });
      });
    }
  } catch (e) {
    console.error('# retry: ', e);
    if (e instanceof Error) {
      callback(Result.err(e));
    }
  }
};

export namespace Metaplex {
  /**
   * Fetch minted metadata by owner Pubkey
   *
   * @param {Pubkey} owner
   * @param {Sortable} callback
   * @param {Sortable} sortable?
   * @return Promise<Result<never, Error>>
   */
  export const findByOwner = async (
    owner: Pubkey,
    callback: FindByOwnerCallback,
    sortable?: Sortable
  ): Promise<void> => {
    genericFindByOwner<UserSideOutput.NftMetadata>(
      owner,
      callback,
      UserSideInput.TokenStandard.NonFungible,
      sortable
    );
  };

  export const findByOwner2 = async (
    owner: Pubkey,
    callback: FindByOwnerCallback,
    sortable?: Sortable
  ): Promise<void> => {
    genericFindByOwner<UserSideOutput.TokenMetadata>(
      owner,
      callback,
      UserSideInput.TokenStandard.Fungible,
      sortable
    );
  };

  // export const findByOwner = async (
  //   owner: Pubkey,
  //   callback: FindByOwnerCallback,
  //   sortable?: Sortable
  // ): Promise<void> => {
  //   let nftDatas: UserSideOutput.NftMetadata[] = [];
  //   try {
  //     const connection = Node.getConnection();
  //     const info = await connection.getParsedTokenAccountsByOwner(
  //       owner.toPublicKey(),
  //       {
  //         programId: TOKEN_PROGRAM_ID,
  //       }
  //     );
  //
  //     // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
  //     for await (const d of info.value) {
  //       if (d.account.data.parsed.info.tokenAmount.uiAmount == 1) {
  //         const mint = d.account.data.parsed.info.mint;
  //         const metadata = await Metadata.fromAccountAddress(
  //           connection,
  //           Pda.getMetadata(mint)
  //         );
  //         debugLog('# findByOwner metadata: ', metadata);
  //         if (metadata.tokenStandard !== 0) {
  //           continue;
  //         }
  //         fetch(metadata.data.uri).then((response) => {
  //           debugLog('# findByOwner response: ', metadata);
  //           response
  //             .json()
  //             .then((json) => {
  //               const modified = Convert.NftMetadata.intoUserSide({
  //                 onchain: metadata,
  //                 offchain: json,
  //               });
  //               nftDatas.push(modified);
  //               if (sortable === Sortable.Desc) {
  //                 nftDatas = nftDatas.sort(sortDescByUinixTimestamp);
  //               } else if (sortable === Sortable.Asc) {
  //                 nftDatas = nftDatas.sort(sortAscByUinixTimestamp);
  //               }
  //               callback(Result.ok(nftDatas));
  //             })
  //             .catch((e) => {
  //               callback(Result.err(e));
  //             });
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.error('# retry: ', e);
  //     if (e instanceof Error) {
  //       callback(Result.err(e));
  //     }
  //   }
  // };
}
