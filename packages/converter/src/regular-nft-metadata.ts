import { Converter as Collection } from './collection';
import { Converter as Creators } from './creators';
import { InputNftMetadata } from '~/types/regular-nft';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';

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
