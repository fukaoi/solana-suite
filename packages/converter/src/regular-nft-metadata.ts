import { Converter as Collection } from './collection';
import { Converter as CollectionDetails } from './collection-details';
import { Converter as Creators } from './creators';
import { Converter as Uses } from './uses';
import { Converter as Token } from './token-metadata';
import { convertTimestampToDateTime } from '~/shared';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputNftMetadata, RegularNftMetadata } from '~/types/regular-nft';
import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { MetadataAndOffchain } from '~/types/storage';

export namespace Converter {
  export namespace RegularNftMetadata {
    export const intoInfra = (
      input: InputNftMetadata,
      uri: string,
      sellerFeeBasisPoints: number,
    ): DataV2 => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Creators.Creators.intoInfra(input.creators),
        collection: Collection.Collection.intoInfra(input.collection),
        uses: input.uses || null,
      };
    };

    export const intoUser = (
      output: MetadataAndOffchain,
    ): RegularNftMetadata => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: Token.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: Token.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol,
        ),
        uri: Token.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: Creators.Creators.intoUser(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Collection.Collection.intoUser(output.onchain.collection),
        collectionDetails: CollectionDetails.CollectionDetails.intoUser(
          output.onchain.collectionDetails,
        ),
        uses: Uses.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain,
      };
    };
  }
}
