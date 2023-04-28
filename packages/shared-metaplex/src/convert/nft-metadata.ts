import { Convert as C1 } from './collection';
import { Convert as C2 } from './creators';
import { InfraSideInput, UserSideInput } from '../types';

export namespace Convert.NftMetadata {
  export const intoInfraSide = (
    input: UserSideInput.NftMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): InfraSideInput.MetaplexDataV2 => {
    return {
      name: input.name,
      symbol: input.symbol,
      uri,
      sellerFeeBasisPoints,
      creators: C2.Creators.intoInfraSide(input.creators),
      collection: C1.Collection.intoInfraSide(input.collection),
      uses: input.uses || null,
    };
  };

  export const intoUserSide = (
    input: UserSideInput.NftMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): InfraSideInput.MetaplexDataV2 => {
    return {
      name: input.name,
      symbol: input.symbol,
      uri,
      sellerFeeBasisPoints,
      creators: C2.Creators.intoInfraSide(input.creators),
      collection: C1.Collection.intoInfraSide(input.collection),
      uses: input.uses || null,
    };
  };
}
