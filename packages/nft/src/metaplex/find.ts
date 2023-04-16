import { Node, Pubkey, Result, Try } from '@solana-suite/shared';
import {
  Collections,
  Creators,
  MetaplexOriginal,
  OutputNftMetadata,
  Pda,
} from '@solana-suite/shared-metaplex';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Bundlr } from '@solana-suite/storage';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import fetch from 'cross-fetch';

export namespace Metaplex {
  /**
   * fetch minted data by owner Pubkey
   *
   * @param {Pubkey} owner
   * @return Promise<Result<OutputNftMetadata[], Error>>
   */
  export const findByOwner = async (
    owner: Pubkey
  ): Promise<Result<OutputNftMetadata[], Error>> => {
    return Try(async () => {
      const allData = await Bundlr.make()
        .nfts()
        .findAllByOwner({ owner: owner.toPublicKey() });

      const res = allData.map((d) => {
        return {
          mint: (d as MetaplexOriginal).mintAddress.toString(),
          updateAuthority: d.updateAuthorityAddress.toString(),
          royalty: d.sellerFeeBasisPoints,
          name: d.name,
          symbol: d.symbol,
          uri: d.uri,
          isMutable: d.isMutable,
          primarySaleHappened: d.primarySaleHappened,
          creators: Creators.toConvertUser(d.creators),
          editionNonce: d.editionNonce,
          collection: Collections.toConvertUser(d.collection),
          uses: d.uses,
        };
      });
      return res;
    });
  };

  export const findByOwner2 = async (owner: Pubkey) => {
    return Try(async () => {
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      for (let index = 0; index < info.value.length; index++) {
        const mint = info.value[index].account.data.parsed.info.mint;
        try {
          const metaAccount = Pda.getMetadata(mint);
          const metadata = await Metadata.fromAccountAddress(
            connection,
            metaAccount
          );
          const uri = metadata.data.uri;
          const response = await fetch(uri);
          const json = await response.json();
          console.log('#metadata: ', metadata);
          console.log('#json: ', json);
        } catch (e) {
          console.error('#maybe no nft: ', e);
          console.error('#info: ', info.value[index]);
        }
      }
    });
  };
}
