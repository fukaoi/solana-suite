import { Convert as CR } from './creators';
import { InfraSideInput, UserSideInput } from '../types';

export namespace Convert.TokenMetadata {
  export const intoInfraSide = (
    input: UserSideInput.TokenMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): InfraSideInput.MetaplexDataV2 => {
    return {
      name: input.name,
      symbol: input.symbol,
      uri,
      sellerFeeBasisPoints,
      creators: CR.Creators.intoInfraSide(input.creators),
      collection: null,
      uses: input.uses || null,
    };
  };

  // export const intoUserSide = (
  //   input: UserSideOutput.TokenMetadata
  // ): UserSideOutput.TokenMetadata => {
  //   return {
  //     mint: input.onchain.mint.toString(),
  //     updateAuthority: input.onchain.updateAuthority.toString(),
  //     royalty: input.onchain.data.sellerFeeBasisPoints,
  //     name: input.onchain.data.name,
  //     symbol: input.onchain.data.symbol,
  //     uri: input.onchain.data.uri,
  //     isMutable: input.onchain.isMutable,
  //     primarySaleHappened: input.onchain.primarySaleHappened,
  //     creators: CR.Creators.intoUserSide(input.onchain.data.creators),
  //     editionNonce: input.onchain.editionNonce,
  //     collection: CO.Collection.intoUserSide(input.onchain.collection),
  //     uses: input.onchain.uses,
  //     offchain: input.offchain,
  //   };
  // };
}
