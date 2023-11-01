import { Converter as _Creators } from './creators';
import { Converter as _Uses } from './uses';
import { InputTokenMetadata, TokenMetadata } from '~/types/spl-token';
import { MetaplexDataV2 } from '~/types/regular-nft';
import { OnchainAndOffchain } from '~/types/storage';
import { convertTimestampToDateTime } from '~/shared';

export namespace Converter {
  export namespace TokenMetadata {
    export const intoInfraSide = (
      input: InputTokenMetadata,
      uri: string,
      sellerFeeBasisPoints: number,
    ): MetaplexDataV2 => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: _Creators.Creators.intoInfra(input.creators),
        collection: null,
        uses: input.uses || null,
      };
    };

    export const intoUserSide = (
      output: OnchainAndOffchain,
      tokenAmount: string,
    ): TokenMetadata => {
      return {
        mint: output.onchain.mint.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: deleteNullStrings(output.onchain.data.name),
        symbol: deleteNullStrings(output.onchain.data.symbol),
        tokenAmount: tokenAmount,
        uri: deleteNullStrings(output.onchain.data.uri),
        creators: _Creators.Creators.intoUser(output.onchain.data.creators),
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
