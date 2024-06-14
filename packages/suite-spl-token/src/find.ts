import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { debugLog, Result, sleep, Try } from '~/suite-utils';
import { TokenMetadata } from '~/types/spl-token';
import { Offchain } from '~/types/storage';
import { Converter } from '~/converter';
import { Account } from '~/account';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { ParsedAccountData } from '@solana/web3.js';
import fetch from 'cross-fetch';

export namespace SplToken {
  const MAX_RETRIES = 10;
  const RETRY_DELAY = 5;

  const converter = (
    metadata: Metadata,
    json: Offchain,
    tokenAmount: string,
  ): TokenMetadata => {
    return Converter.TokenMetadata.intoUser(
      {
        onchain: metadata,
        offchain: json,
      },
      tokenAmount,
    );
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const fetchRetry = async (url: string, retries = 0): Promise<any> => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (retries < MAX_RETRIES) {
        debugLog(`Error fetching data from ${url}, ${retries}, ${error}`);
        await sleep(RETRY_DELAY);
        return fetchRetry(url, retries + 1);
      } else {
        debugLog(`Max retries reached (${MAX_RETRIES})`);
      }
    }
  };

  /**
   * Fetch minted metadata by owner Pubkey
   *
   * @param {Pubkey} owner
   * @return {Promise<Result<TokenMetadata[]| Error>>}
   */
  export const findByOwner = async (
    owner: Pubkey,
  ): Promise<Result<TokenMetadata[], Error>> => {
    return Try(async () => {
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID,
        },
      );

      const datas = info.value.map(async (d) => {
        const mint = d.account.data.parsed.info.mint as Pubkey;
        const tokenAmount = d.account.data.parsed.info.tokenAmount
          .amount as string;
        if (tokenAmount === '1') {
          return;
        }
        return Metadata.fromAccountAddress(
          connection,
          Account.Pda.getMetadata(mint),
        )
          .then(async (metadata) => {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            return fetchRetry(metadata.data.uri).then((json: any) => {
              return converter(metadata, json, tokenAmount);
            });
          })
          .catch((err) => debugLog('# [Fetch error]', err));
      });

      const filters = (await Promise.all(datas)).filter(
        (data) => data !== undefined,
      );
      return filters as TokenMetadata[];
    });
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
    return Try(async () => {
      const connection = Node.getConnection();

      const metadata = await Metadata.fromAccountAddress(
        connection,
        Account.Pda.getMetadata(mint),
      );
      debugLog('# findByMint metadata: ', metadata);
      if (metadata.tokenStandard === 0) {
        throw Error(
          `This mint is not SPL-TOKEN, tokenStandard:${metadata.tokenStandard}`,
        );
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data as ParsedAccountData).parsed.info
        .supply as string;

      const response = (await (
        await fetch(metadata.data.uri)
      ).json()) as Offchain;
      return converter(metadata, response, tokenAmount);
    });
  };
}
