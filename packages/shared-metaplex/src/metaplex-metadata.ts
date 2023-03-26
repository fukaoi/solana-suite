import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { Collections } from './collections';
import { Creators } from './creators';
import { InputNftMetadata } from './types';

export module MetaplexMetadata {
  export const toConvertDataV2 = (
    input: InputNftMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): DataV2 => {
    return {
      name: input.name,
      symbol: input.symbol,
      uri,
      sellerFeeBasisPoints,
      creators: Creators.toConvertInfra(input.creators),
      collection: Collections.toConvertInfra(input.collection),
      uses: input.uses || null,
    };
  };
}
