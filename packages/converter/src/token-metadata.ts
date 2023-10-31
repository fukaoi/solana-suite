import { Converter as _Creators } from './creators';
import { Converter as _Uses } from './uses';
import {
  InfraInput,
  InfraOutput,
  UserInput,
  UserOutput,
} from '~/types/converter';

import { convertTimestampToDateTime } from '~/shared';
export namespace Converter {
  export namespace TokenMetadata {
    export const intoInfraSide = (
      input: UserInput.TokenMetadata,
      uri: string,
      sellerFeeBasisPoints: number,
    ): InfraInput.MetaplexDataV2 => {
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
      output: InfraOutput.OnchainAndOffchain,
      tokenAmount: string,
    ): UserOutput.TokenMetadata => {
      return {
        mint: output.onchain.mint.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: deleteNullStrings(output.onchain.data.name),
        symbol: deleteNullStrings(output.onchain.data.symbol),
        tokenAmount: tokenAmount,
        uri: deleteNullStrings(output.onchain.data.uri),
        creators: _Creators.Creators.intoUserSide(output.onchain.data.creators),
        uses: _Uses.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain,
      };
    };
    // delete NULL(0x00) strings function
    export const deleteNullStrings = (str: string): string => {
      return str.replace(/\0/g, '');
    };
  }
}
