import { InternalCollection } from '~/types/converter';
import { Collection, InputCollection, Option } from '~/types/regular-nft';

export namespace Converter {
  export namespace Collection {
    export const intoInfra = (
      input: Option<InputCollection> | undefined,
    ): Option<InternalCollection> => {
      if (!input) {
        return null;
      }

      return {
        key: input.toPublicKey(),
        verified: false,
      };
    };

    export const intoUser = (
      output: Option<InternalCollection>,
    ): Collection | undefined => {
      if (!output) {
        return undefined;
      }

      return {
        address: output.key.toString(),
        verified: output.verified,
      };
    };
  }
}
