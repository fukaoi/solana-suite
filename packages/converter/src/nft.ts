import { Converter as Collection } from './collection';
import { Converter as Creators } from './creators';
import { Converter as Royalty } from './royalty';
import { convertTimestampToDateTime } from '~/shared';
import { AssetAndOffchain } from '~/types/storage';
import { Metadata } from '~/types/nft';
import { Pubkey } from '~/types/account';

export namespace Converter {
  export namespace Nft {
    export const intoUser = (output: AssetAndOffchain): Metadata => {
      return {
        mint: output.onchain.id.toString(),
        collectionMint: Collection.CollectionMint.intoUser(
          output.onchain.grouping,
        ) as Pubkey,
        authorities: output.onchain.authorities,
        royalty: Royalty.Royalty.intoUser(output.onchain.royalty.percent),
        name: output.onchain.content.metadata.name,
        symbol: output.onchain.content.metadata.symbol,
        uri: output.onchain.content.json_uri,
        creators: Creators.Creators.intoUser(output.onchain.creators)!,
        treeAddress: output.onchain.compression.tree,
        isCompressed: output.onchain.compression.compressed,
        isMutable: output.onchain.mutable,
        isBurn: output.onchain.burnt,
        editionNonce: output.onchain.supply.edition_nonce,
        primarySaleHappened: output.onchain.royalty.primary_sale_happened,
        dateTime: convertTimestampToDateTime(output.offchain.created_at)!,
        offchain: output.offchain,
      };
    };
  }
}
