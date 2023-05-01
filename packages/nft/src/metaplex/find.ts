import { debugLog, Node, Pubkey, Result } from '@solana-suite/shared';
import { Convert, Pda, UserSideOutput } from '@solana-suite/shared-metaplex';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import fetch from 'cross-fetch';

// Sort by latest with unixtimestamp function
export const sortDescByUinixTimestamp = (
  a: UserSideOutput.NftMetadata,
  b: UserSideOutput.NftMetadata
): number => {
  if (!a.offchain.created_at) {
    a.offchain.created_at = 0;
  }
  if (!b.offchain.created_at) {
    b.offchain.created_at = 0;
  }
  return b.offchain.created_at - a.offchain.created_at;
};

export const sortAscByUinixTimestamp = (
  a: UserSideOutput.NftMetadata,
  b: UserSideOutput.NftMetadata
): number => {
  if (!a.offchain.created_at) {
    a.offchain.created_at = 0;
  }
  if (!b.offchain.created_at) {
    b.offchain.created_at = 0;
  }
  return a.offchain.created_at - b.offchain.created_at;
};

export enum Sortable {
  Asc = 'asc',
  Desc = 'desc',
}

export type FindByOwnerCallback = (
  result: Result<UserSideOutput.NftMetadata[], Error>
) => void;

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
    let nftDatas: UserSideOutput.NftMetadata[] = [];
    try {
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
      for await (const d of info.value) {
        if (d.account.data.parsed.info.tokenAmount.uiAmount == 1) {
          const mint = d.account.data.parsed.info.mint;
          const metadata = await Metadata.fromAccountAddress(
            connection,
            Pda.getMetadata(mint)
          );
          debugLog('# findByOwner metadata: ', metadata);
          if (metadata.tokenStandard !== 0) {
            continue;
          }
          fetch(metadata.data.uri).then((response) => {
            debugLog('# findByOwner response: ', metadata);
            response
              .json()
              .then((json) => {
                const modified = Convert.NftMetadata.intoUserSide({
                  onchain: metadata,
                  offchain: json,
                });
                nftDatas.push(modified);
                if (sortable === Sortable.Desc) {
                  nftDatas = nftDatas.sort(sortDescByUinixTimestamp);
                } else if (sortable === Sortable.Asc) {
                  nftDatas = nftDatas.sort(sortAscByUinixTimestamp);
                }
                callback(Result.ok(nftDatas));
              })
              .catch((e) => {
                callback(Result.err(e));
              });
          });
        }
      }
    } catch (e) {
      console.error('# retry: ', e);
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
