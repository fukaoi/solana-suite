import { Creators } from './creators';
import { InputTokenMetadata, MetaplexDataV2 } from './types';

export module TokenMetadata {
  export const toConvertInfra = (
    input: InputTokenMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): MetaplexDataV2 => {
    return {
      name: input.name,
      symbol: input.symbol,
      uri,
      sellerFeeBasisPoints,
      creators: Creators.toConvertInfra(input.creators),
      collection: null,
      uses: input.uses || null,
    };
  };
}
