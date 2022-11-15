import { PublicKey } from '@solana/web3.js';
import { Result, Try } from '@solana-suite/shared';
import { Bundlr } from '../bundlr';
import { OutputMetaplexMetadata } from '../types/metaplex/index';
import { Metadata } from '@metaplex-foundation/js';

export namespace Metaplex {
  export const findByOwner = async (
    owner: PublicKey
  ): Promise<Result<OutputMetaplexMetadata[], Error>> => {
    return Try(async () => {
      const allData = await Bundlr.make()
        .nfts()
        .findAllByOwner({ owner })
        .run();

      const res = allData.map(d => {
        return {
          mint: (d as Metadata).mintAddress.toString(),
          updateAuthority: d.updateAuthorityAddress.toString(),
          royalty: d.sellerFeeBasisPoints,
          name: d.name,
          symbol: d.symbol,
          uri: d.uri,
          isMutable: d.isMutable,
          primarySaleHappened: d.primarySaleHappened,
          creators: d.creators,
          editionNonce: d.editionNonce,
          collection: d.collection,
          uses: d.uses,
        };
      });
      return res;
    });
  };
}
