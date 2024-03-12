import { Converter as Collection } from './collection';
import { Converter as Creators } from './creators';
import { InputNftMetadata } from '~/types/regular-nft';
import {
  MetadataArgs,
  TokenProgramVersion,
  TokenStandard,
} from 'mpl-bubblegum-instructions';

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
  }
}
