import { Converter as _Collection } from './collection';
import { Converter as _CollectionDetails } from './collection-details';
import { Converter as _Creators } from './creators';
import { Converter as _Uses } from './uses';
import { Converter as _Token } from './token-metadata';
import { convertTimestampToDateTime } from '~/shared';
import { InputNftMetadata, NftMetadata } from '~/types/regular-nft';
import { MetadataArgs, TokenProgramVersion, TokenStandard } from 'mpl-bubblegum-instruction';
import { OnchainAndOffchain } from '~/types/storage';

export namespace Converter {
  export namespace CompressedNftMetadata {
    export const intoInfra = (
      input: InputNftMetadata,
      uri: string,
      sellerFeeBasisPoints: number,
    ): MetadataArgs => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: _Creators.Creators.intoCompressedNftInfra(input.creators),
        collection: _Collection.Collection.intoInfra(input.collection),
        uses: input.uses || null,
        primarySaleHappened: false,
        isMutable: input.isMutable ?? false,
        editionNonce: 0,
        tokenStandard: TokenStandard.NonFungible,
        tokenProgramVersion: TokenProgramVersion.Original
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
