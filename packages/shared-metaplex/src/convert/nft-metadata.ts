import { Convert as C1 } from './collection';
import { Convert as C2 } from './creators';
import { InfraSideInput, UserSideInput } from '../types';

export namespace Convert.NftMetadata {
  export const intoInfra = (
    input: UserSideInput.NftMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): InfraSideInput.MetaplexDataV2 => {
    return {
      name: input.name,
      symbol: input.symbol,
      uri,
      sellerFeeBasisPoints,
      creators: C2.Creators.intoInfra(input.creators),
      collection: C1.Collection.intoInfra(input.collection),
      uses: input.uses || null,
    };
  };
}
