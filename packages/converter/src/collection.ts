import {
  InfraInput,
  InfraOutput,
  Option,
  UserInput,
  UserOutput,
} from '~/types/converter';

export namespace Converter {
  export namespace Collection {
    export const intoInfraSide = (
      input: Option<UserInput.Collection> | undefined,
    ): Option<InfraInput.Collection> => {
      if (!input) {
        return null;
      }

      return {
        key: input.toPublicKey(),
        verified: false,
      };
    };

    export const intoUserSide = (
      output: Option<InfraOutput.Collection>,
    ): UserOutput.Collection | undefined => {
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
