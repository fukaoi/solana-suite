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
   * Fetch minted metadata by owner Pubkey
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
      try {
        const connection = Node.getConnection();
        const info = await connection.getParsedTokenAccountsByOwner(
          owner.toPublicKey(),
          {
            programId: TOKEN_PROGRAM_ID,
          }
        );

        const metadatas = [{metadata: any, mint: String, json: any}];
        for await (const d of info.value) {
          if (d.account.data.parsed.info.tokenAmount.uiAmount == 1) {
            const mint = d.account.data.parsed.info.mint;
            const metadata = await Metadata.fromAccountAddress(
              connection,
              Pda.getMetadata(mint)
            );
            metadatas.push({metadata, mint});
            fetch(metadata.data.uri).then((response) => {
              response.json().then((json) => {
                console.log('# json: ', json);
              });
            });
          }
        }
      } catch (e) {
        console.error('# EEEEE: ', e);
      }
    });
  };
}
