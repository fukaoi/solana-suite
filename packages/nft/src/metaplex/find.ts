import { Pubkey, Result, Try } from '@solana-suite/shared';
import { Bundlr, OutputNftMetadata } from '@solana-suite/shared-metaplex';
import { Metadata } from '@metaplex-foundation/js';

export namespace Metaplex {
  export const findByOwner = async (
    owner: Pubkey
  ): Promise<Result<OutputNftMetadata[], Error>> => {
    return Try(async () => {
      const allData = await Bundlr.make()
        .nfts()
        .findAllByOwner({ owner: owner.toPublicKey() });

      const res = allData.map((d) => {
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
