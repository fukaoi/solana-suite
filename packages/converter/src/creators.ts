import {
  InfraInput,
  InfraOutput,
  Option,
  UserInput,
  UserOutput,
} from '~/types/converter';

export namespace Converter {
  export namespace Creators {
    export const intoInfraSide = (
      input: Option<UserInput.Creators[]> | undefined,
    ): Option<InfraInput.Creators[]> => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        let modify: Option<InfraInput.Creators> = null;
        modify = {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: data.verified,
        };

        return modify;
      });
    };

    export const intoUserSide = (
      output: Option<InfraOutput.Creator[]>,
    ): UserOutput.Creators[] | undefined => {
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
