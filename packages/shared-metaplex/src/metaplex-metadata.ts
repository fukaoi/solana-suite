import { Collections } from './collections';
import { Creators } from './creators';
import { InputNftMetadata, MetaplexDataV2 } from './types';

export namespace MetaplexMetadata {
  export const toConvertInfra = (
    input: InputNftMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): MetaplexDataV2 => {
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
