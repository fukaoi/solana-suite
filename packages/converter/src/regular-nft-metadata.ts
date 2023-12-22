import { Converter as Collection } from './collection';
import { Converter as Creators } from './creators';
import { Converter as Royalty } from './royalty';
import { convertTimestampToDateTime } from '~/shared';
import { InputNftMetadata } from '~/types/regular-nft';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { AssetAndOffchain } from '~/types/storage';
import { NftMetadata } from '~/types/compressed-nft';
import { Pubkey } from '~/types/account';

export namespace Converter {
  export namespace RegularNftMetadata {
    export const intoInfra = (
      input: InputNftMetadata,
      uri: string,
      sellerFeeBasisPoints: number,
    ): DataV2 => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Creators.Creators.intoInfra(input.creators),
        collection: Collection.Collection.intoInfra(input.collection),
        uses: input.uses || null,
      };
    };
  }
}
