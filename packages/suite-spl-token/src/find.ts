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
    let data: TokenMetadata[] = [];
    const connection = Node.getConnection();
    const info = await connection.getParsedTokenAccountsByOwner(
      owner.toPublicKey(),
      {
        programId: TOKEN_PROGRAM_ID,
      },
    );

    var middle = Math.floor(info.value.length / 2);
    var firstHalf = info.value.splice(0, middle);
    var secondHalf = info.value;

    const pr = info.value.map((d) => {
      const mint = d.account.data.parsed.info.mint as Pubkey;
      const tokenAmount = d.account.data.parsed.info.tokenAmount
        .amount as string;
      return Metadata.fromAccountAddress(
        connection,
        Account.Pda.getMetadata(mint),
      );
    });

    const metadatas = await Promise.all(pr);
    console.log(metadatas);
    const pr2 = metadatas.map((m) => {
      return fetch(m.data.uri);
    });
    const jsons = await Promise.all(pr2);
    console.log(jsons);

    // for await (const d of info.value) {
    //   const mint = d.account.data.parsed.info.mint as Pubkey;
    //   const tokenAmount = d.account.data.parsed.info.tokenAmount
    //     .amount as string;
    //
    //   let metadata;
    //   try {
    //     metadata = await Metadata.fromAccountAddress(
    //       connection,
    //       Account.Pda.getMetadata(mint),
    //     );
    //   } catch (error) {
    //     continue;
    //   }
    //   debugLog('# findByOwner metadata: ', metadata);
    //   const json = await (await fetch(metadata.data.uri)).json();
    //   data.push(converter(metadata, json, tokenAmount));
    // console.log(data);
    // }
    // console.log('# data size:', data.length);
    // return data;
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
