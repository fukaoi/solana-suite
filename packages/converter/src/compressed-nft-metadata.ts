import { Converter as Collection } from './collection';
import { Converter as CollectionDetails } from './collection-details';
import { Converter as Creators } from './creators';
import { Converter as Uses } from './uses';
import { Converter as Token } from './token-metadata';
import { convertTimestampToDateTime } from '~/shared';
import { InputNftMetadata, NftMetadata } from '~/types/nft';
import {
  MetadataArgs,
  TokenProgramVersion,
  TokenStandard,
} from 'mpl-bubblegum-instruction';
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
        creators: Creators.Creators.intoCompressedNftInfra(input.creators),
        collection: Collection.Collection.intoInfra(input.collection),
        uses: input.uses || null,
        primarySaleHappened: false,
        isMutable: input.isMutable ?? false,
        editionNonce: 0,
        tokenStandard: TokenStandard.NonFungible,
        tokenProgramVersion: TokenProgramVersion.Original,
      };
    };

    export const intoUser = (output: OnchainAndOffchain): NftMetadata => {
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
