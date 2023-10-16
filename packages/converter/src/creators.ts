import {
  InfraSideInput,
  InfraSideOutput,
  Option,
  UserSideInput,
  UserSideOutput,
} from '~/types/converter';

export namespace Converter {
  export namespace Creators {
    export const intoInfraSide = (
      input: Option<UserSideInput.Creators[]> | undefined,
    ): Option<InfraSideInput.Creators[]> => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        let modify: Option<InfraSideInput.Creators> = null;
        modify = {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: data.verified,
        };

        return modify;
      });
    };

    export const intoUserSide = (
      output: Option<InfraSideOutput.Creator[]>,
    ): UserSideOutput.Creators[] | undefined => {
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
