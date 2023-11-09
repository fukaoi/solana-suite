import { Creators, InputCreators, Option } from '~/types/regular-nft';
import { InternalCreators } from '~/types/converter';

export namespace Converter {
  export namespace Creators {
    export const intoInfra = (
      input: Option<InputCreators[]> | undefined,
    ): Option<InternalCreators[]> => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        let modify: Option<InternalCreators> = null;
        modify = {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: false,
        };

        return modify;
      });
    };

    export const intoUser = (
      output: Option<InternalCreators[]>,
    ): Creators[] | undefined => {
      if (!output) {
        return undefined;
      }

      return output.map((data) => {
        const modify = {
          address: data.address.toString(),
          share: data.share,
          verified: data.verified,
        };
        return modify;
      });
    };
  }
}
