import { Converter as _Collection } from './collection';
import { Converter as _Creators } from './creators';
import { Converter as _Uses } from './uses';
import { Converter as _Token } from './token-metadata';
import { convertTimestampToDateTime } from '~/shared';
import {
  InputNftMetadata,
  MetaplexDataV2,
  NftMetadata,
} from '~/types/regular-nft';

import { OnchainAndOffchain } from '~/types/storage';

export namespace Converter {
  export namespace NftMetadata {
    export const intoInfra = (
      input: InputNftMetadata,
      uri: string,
      sellerFeeBasisPoints: number,
    ): MetaplexDataV2 => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: _Creators.Creators.intoInfra(input.creators),
        collection: _Collection.Collection.intoInfra(input.collection),
        uses: input.uses || null,
      };
    };

    export const intoUser = (
      output: OnchainAndOffchain,
      tokenAmount: string,
    ): NftMetadata => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: _Token.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: _Token.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol,
        ),
        tokenAmount: tokenAmount,
        uri: _Token.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: _Creators.Creators.intoUser(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: _Collection.Collection.intoUser(output.onchain.collection),
        uses: _Uses.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain,
      };
    };
  }
}
