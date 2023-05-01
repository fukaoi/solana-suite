import { Node, Pubkey, Result, Try } from '@solana-suite/shared';
import {
  // UserSideOutput,
  Convert,
  InfraSideOutput,
  Pda,
  UserSideOutput,
} from '@solana-suite/shared-metaplex';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import fetch from 'cross-fetch';

export namespace Metaplex {
  // /**
  //  * Fetch minted metadata by owner Pubkey
  //  *
  //  * @param {Pubkey} owner
  //  * @return Promise<Result<OutputNftMetadata[], Error>>
  //  */
  // export const findByOwner = async (
  //   owner: Pubkey
  // ): Promise<Result<UserSideOutput.NftMetadata[], Error>> => {
  //   return Try(async () => {
  //     const allData = await Bundlr.make()
  //       .nfts()
  //       .findAllByOwner({ owner: owner.toPublicKey() });
  //
  //     const res = allData.map((d) => {
  //       return {
  //         mint: (d as InfraSideOutput.Onchain).mintAddress.toString(),
  //         updateAuthority: d.updateAuthorityAddress.toString(),
  //         royalty: d.sellerFeeBasisPoints,
  //         name: d.name,
  //         symbol: d.symbol,
  //         uri: d.uri,
  //         isMutable: d.isMutable,
  //         primarySaleHappened: d.primarySaleHappened,
  //         creators: Creators.toConvertUser(d.creators),
  //         editionNonce: d.editionNonce,
  //         collection: Collections.toConvertUser(d.collection),
  //         uses: d.uses,
  //       };
  //     });
  //     return res;
  //   });
  // };

  /**
   * Fetch minted metadata by owner Pubkey
   *
   * @param {Pubkey} owner
   * @return Promise<Result<OutputNftMetadata[], Error>>
   */
  export const findByOwner2 = async (owner: Pubkey) => {
    return Try(async () => {
      const contentsDatas: UserSideOutput.NftMetadata[] = [];
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
            if (metadata.tokenStandard !== 0) {
              continue;
            }
            fetch(metadata.data.uri).then((response) => {
              response.json().then((json) => {
                const modified = Convert.NftMetadata.intoUserSide({
                  onchain: metadata,
                  offchain: json,
                });
                contentsDatas.push(modified);
                console.log('------------------------------');
                console.log(contentsDatas);
              });
            });
          }
        }
      } catch (e) {
        console.error('# retry: ', e);
      }
    });
  };
}
