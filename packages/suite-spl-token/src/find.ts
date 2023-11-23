import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { debugLog, Result } from '~/shared';
import { SortDirection } from '~/types/find';
import { RegularNftMetadata } from '~/types/regular-nft';
import { TokenMetadata } from '~/types/spl-token';
import { Offchain } from '~/types/storage';
import { OnErr, OnOk } from '~/types/shared';
import { Converter } from '~/converter';
import { Account } from '~/account';
import {
  Metadata,
  TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { ParsedAccountData } from '@solana/web3.js';
import fetch from 'cross-fetch';

export namespace SplToken {
  const UNABLE_ERROR_REGEX = /Unable to find Metadata account/;

  // Sort by latest with unixtimestamp function
  const sortByUinixTimestamp =
    <T extends RegularNftMetadata | TokenMetadata>(sortable: SortDirection) =>
    (a: T, b: T): number => {
      if (!a.offchain.created_at) {
        a.offchain.created_at = 0;
      }
      if (!b.offchain.created_at) {
        b.offchain.created_at = 0;
      }
      if (sortable === SortDirection.Desc) {
        return b.offchain.created_at - a.offchain.created_at;
      } else if (sortable === SortDirection.Asc) {
        return a.offchain.created_at - b.offchain.created_at;
      } else {
        return b.offchain.created_at - a.offchain.created_at;
      }
    };

  const converter = <T>(
    tokenStandard: TokenStandard,
    metadata: Metadata,
    json: Offchain,
    tokenAmount: string,
  ): T => {
    if (tokenStandard === TokenStandard.Fungible) {
      return Converter.TokenMetadata.intoUser(
        {
          onchain: metadata,
          offchain: json,
        },
        tokenAmount,
      ) as T;
    } else if (tokenStandard === TokenStandard.NonFungible) {
      return Converter.RegularNftMetadata.intoUser({
        onchain: metadata,
        offchain: json,
      }) as T;
    } else {
      throw Error(`No match tokenStandard: ${tokenStandard}`);
    }
  };

  export const genericFindByOwner = async <
    T extends RegularNftMetadata | TokenMetadata,
  >(
    owner: Pubkey,
    callback: (result: Result<T[], Error>) => void,
    tokenStandard: TokenStandard,
    sortable?: SortDirection,
    isHolder?: boolean,
  ): Promise<void> => {
    try {
      let data: T[] = [];
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID,
        },
      );

      info.value.length === 0 && callback(Result.ok([]));

      for await (const d of info.value) {
        if (isHolder && d.account.data.parsed.info.tokenAmount.uiAmount < 1) {
          debugLog(
            '# findByOwner no hold metadata: ',
            d.account.data.parsed.info,
          );
          continue;
        }
        const mint = d.account.data.parsed.info.mint as Pubkey;
        const tokenAmount = d.account.data.parsed.info.tokenAmount
          .amount as string;

        try {
          const metadata = await Metadata.fromAccountAddress(
            connection,
            Account.Pda.getMetadata(mint),
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
                .then((json: Offchain) => {
                  data.push(
                    converter<T>(tokenStandard, metadata, json, tokenAmount),
                  );
                  callback(Result.ok(data)); // need this call ?
                })
                .catch((e) => {
                  callback(Result.err(e));
                })
                .finally(() => {
                  const descAlgo = sortByUinixTimestamp<T>(SortDirection.Desc);
                  const ascAlgo = sortByUinixTimestamp<T>(SortDirection.Asc);
                  if (sortable === SortDirection.Desc) {
                    data = data.sort(descAlgo);
                  } else if (sortable === SortDirection.Asc) {
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
    T extends RegularNftMetadata | TokenMetadata,
  >(
    mint: Pubkey,
    tokenStandard: TokenStandard,
  ): Promise<Result<T, Error>> => {
    try {
      const connection = Node.getConnection();

      const metadata = await Metadata.fromAccountAddress(
        connection,
        Account.Pda.getMetadata(mint),
      );
      debugLog('# findByMint metadata: ', metadata);
      // tokenStandard: 0(NFT) or 2 (SPL-TOKEN)
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error('token standards are different');
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data as ParsedAccountData).parsed.info
        .supply as string;

      const response = (await (
        await fetch(metadata.data.uri)
      ).json()) as Offchain;
      return Result.ok(
        converter<T>(tokenStandard, metadata, response, tokenAmount),
      );
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  /**
   * Fetch minted metadata by owner Pubkey
   *
   * @param {Pubkey} owner
   * @param {OnOk} onOk callback function
   * @param {OnErr} onErr callback function
   * @param {{sortable?: Sortable, isHolder?: boolean}} options?
   * @return void
   */
  export const findByOwner = (
    owner: Pubkey,
    onOk: OnOk<TokenMetadata>,
    onErr: OnErr,
    options?: { sortDirection?: SortDirection; isHolder?: boolean },
  ): void => {
    const sortable = !options?.sortDirection
      ? SortDirection.Desc
      : options?.sortDirection;
    const isHolder = !options?.isHolder ? true : false;

    /* eslint-disable @typescript-eslint/no-floating-promises */
    genericFindByOwner<TokenMetadata>(
      owner,
      (result) => {
        result.match((ok) => onOk(ok), onErr);
      },
      TokenStandard.Fungible,
      sortable,
      isHolder,
    );
  };

  /**
   * Fetch minted metadata by mint address
   *
   * @param {Pubkey} mint
   * @return Promise<Result<UserSideOutput.TokenMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey,
  ): Promise<Result<TokenMetadata, Error>> => {
    return await genericFindByMint<TokenMetadata>(mint, TokenStandard.Fungible);
  };
}
