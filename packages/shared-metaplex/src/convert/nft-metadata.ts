import { Convert as CO } from './collection';
import { Convert as CR } from './creators';
import {
  InfraSideInput,
  InfraSideOutput,
  UserSideInput,
  UserSideOutput,
} from '../types';

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
      creators: CR.Creators.intoInfraSide(input.creators),
      collection: CO.Collection.intoInfraSide(input.collection),
      uses: input.uses || null,
    };
  };

  export const intoUserSide = (
    input: InfraSideOutput.OnchainAndOffchain
  ): UserSideOutput.NftMetadata => {
    return {
      mint: input.onchain.mint.toString(),
      updateAuthority: input.onchain.updateAuthority.toString(),
      royalty: input.onchain.data.sellerFeeBasisPoints,
      name: input.onchain.data.name,
      symbol: input.onchain.data.symbol,
      uri: input.onchain.data.uri,
      isMutable: input.onchain.isMutable,
      primarySaleHappened: input.onchain.primarySaleHappened,
      creators: CR.Creators.intoUserSide(input.onchain.data.creators),
      editionNonce: input.onchain.editionNonce,
      collection: CO.Collection.intoUserSide(input.onchain.collection),
      uses: input.onchain.uses,
      onchain: input.offchain,
    };
  };
}
