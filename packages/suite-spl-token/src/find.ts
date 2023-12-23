import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { debugLog, Result, Try } from '~/shared';
import { TokenMetadata } from '~/types/spl-token';
import { Offchain } from '~/types/storage';
import { Converter } from '~/converter';
import { Account } from '~/account';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { ParsedAccountData } from '@solana/web3.js';
import fetch from 'cross-fetch';

export namespace SplToken {
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

  /**
   * Fetch minted metadata by owner Pubkey
   *
   * @param {Pubkey} owner
   // * @return void
   */
  export const findByOwner = async (owner: Pubkey) => {
    const connection = Node.getConnection();
    const info = await connection.getParsedTokenAccountsByOwner(
      owner.toPublicKey(),
      {
        programId: TOKEN_PROGRAM_ID,
      },
    );

    const pr = info.value.map(async (d) => {
      const mint = d.account.data.parsed.info.mint as Pubkey;
      const tokenAmount = d.account.data.parsed.info.tokenAmount
        .amount as string;
      return Metadata.fromAccountAddress(
        connection,
        Account.Pda.getMetadata(mint),
      ).then(async (metadata) => {
        return fetch(metadata.data.uri).then((res) =>
          res.json().then((json) => {
            return converter(metadata, json, tokenAmount);
          }),
        );
      });
    });

    return await Promise.all(pr);
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
