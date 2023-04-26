import { Creators } from './creators';
import { InfraSideInput, UserSideInput } from './types';

export namespace TokenMetadata {
  export const toConvertInfra = (
    input: UserSideInput.TokenMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): InfraSideInput.MetaplexDataV2 => {
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
