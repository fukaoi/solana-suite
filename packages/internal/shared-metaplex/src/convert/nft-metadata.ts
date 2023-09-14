import { Convert as _Collection } from './collection';
import { Convert as _Creators } from './creators';
import { Convert as _Uses } from './uses';
import { Convert as _Token } from './token-metadata';
import {
  InfraSideInput,
  InfraSideOutput,
  UserSideInput,
  UserSideOutput,
} from '../types';

import { convertTimestampToDateTime } from '@solana-suite/shared';

export namespace Convert {
  export namespace NftMetadata {
    export const intoInfraSide = (
      input: UserSideInput.NftMetadata,
      uri: string,
      sellerFeeBasisPoints: number,
    ): InfraSideInput.MetaplexDataV2 => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: _Creators.Creators.intoInfraSide(input.creators),
        collection: _Collection.Collection.intoInfraSide(input.collection),
        uses: input.uses || null,
      };
    };

    export const intoUserSide = (
      output: InfraSideOutput.OnchainAndOffchain,
      tokenAmount: string,
    ): UserSideOutput.NftMetadata => {
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
        creators: _Creators.Creators.intoUserSide(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: _Collection.Collection.intoUserSide(
          output.onchain.collection,
        ),
        uses: _Uses.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain,
      };
    };
  }
}
