import { Pubkey, Result, Try } from '@solana-suite/shared';
import {
  OutputNftMetadata,
  Creators,
  Collections,
  MetaplexOriginal,
} from '@solana-suite/shared-metaplex';

import { Bundlr } from '@solana-suite/storage';
import { Metadata } from "@metaplex-foundation/js";

export namespace Metaplex {
  export const findByOwner = async (
    owner: Pubkey
  ): Promise<Result<OutputNftMetadata[], Error>> => {
    return Try(async () => {
      const allData = await Bundlr.make()
        .nfts()
        .findAllByOwner({ owner: owner.toPublicKey() });




      const res = allData.map((d: Metadata) => {
      console.log(d.json);
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
}
