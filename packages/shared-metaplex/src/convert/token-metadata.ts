import { Convert as _Creators } from './creators';
import { Convert as _Uses } from './uses';
import {
  InfraSideInput,
  InfraSideOutput,
  UserSideInput,
  UserSideOutput,
} from '../types';

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
      creators: _Creators.Creators.intoInfraSide(input.creators),
      collection: null,
      uses: input.uses || null,
    };
  };

  export const intoUserSide = (
    output: InfraSideOutput.OnchainAndOffchain,
    tokenAmount?: InfraSideOutput.TokeAmount
  ): UserSideOutput.TokenMetadata => {
    return {
      mint: output.onchain.mint.toString(),
      royalty: output.onchain.data.sellerFeeBasisPoints,
      name: deleteNullStrings(output.onchain.data.name),
      symbol: deleteNullStrings(output.onchain.data.symbol),
      tokenAmount: tokenAmount,
      uri: deleteNullStrings(output.onchain.data.uri),
      creators: _Creators.Creators.intoUserSide(output.onchain.data.creators),
      uses: _Uses.Uses.intoUserSide(output.onchain.uses),
      offchain: output.offchain,
    };
  };
  // delete NULL(0x00) strings function
  export const deleteNullStrings = (str: string): string => {
    return str.replace(/\0/g, '');
  };
}
