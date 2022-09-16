import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { Bundlr } from '../bundlr';
import { OutputMetaplexMetadata } from '../types/metaplex/index';
import { Metadata } from '@metaplex-foundation/js';

export namespace Metaplex {
  export const findByOwner = async (
    owner: PublicKey
  ): Promise<Result<OutputMetaplexMetadata[], Error>> => {
    const allData = await Bundlr.make()
      .nfts()
      .findAllByOwner({ owner })
      .run()
      .then(Result.ok)
      .catch(Result.err);

    if (allData.isErr) {
      return Result.err(allData.error);
    }

    const res = allData.unwrap().map((d) => {
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
    return Result.ok(res);
  };
}
