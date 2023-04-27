import { Collections } from './collections';
import { Creators } from './creators';
import { InfraSideInput, UserSideInput } from './types';

export namespace NftMetadata {
  export const toConvertInfra = (
    input: UserSideInput.NftMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): InfraSideInput.MetaplexDataV2 => {
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
