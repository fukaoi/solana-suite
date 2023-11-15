import { Converter as _Collection } from './collection';
import { Converter as _CollectionDetails } from './collection-details';
import { Converter as _Creators } from './creators';
import { Converter as _Uses } from './uses';
import { Converter as _Token } from './token-metadata';
import { convertTimestampToDateTime } from '~/shared';
import { InputNftMetadata, NftMetadata } from '~/types/nft';
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
        creators: _Creators.Creators.intoInfra(input.creators),
        collection: _Collection.Collection.intoInfra(input.collection),
        uses: input.uses || null,
      };
    };

    export const intoUser = (output: MetadataAndOffchain): NftMetadata => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: _Token.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: _Token.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol,
        ),
        uri: _Token.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: _Creators.Creators.intoUser(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: _Collection.Collection.intoUser(output.onchain.collection),
        collectionDetails: _CollectionDetails.CollectionDetails.intoUser(
          output.onchain.collectionDetails,
        ),
        uses: _Uses.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain,
      };
    };
  }
}
