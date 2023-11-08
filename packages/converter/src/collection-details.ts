import { CollectionDetails as MetaplexCollectionDetails } from '@metaplex-foundation/mpl-token-metadata';
import { CollectionDetails, Option } from '~/types/regular-nft';

export namespace Converter {
  export namespace CollectionDetails {
    export const intoUser = (
      output: Option<MetaplexCollectionDetails>,
    ): CollectionDetails | undefined => {
      if (!output) {
        return undefined;
      }

      return {
        __kind: output.__kind,
        size: parseInt(output.size.toString(10)),
      };
    };
  }
}
