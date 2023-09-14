import {
  InfraSideInput,
  InfraSideOutput,
  Option,
  UserSideInput,
  UserSideOutput,
} from '../types';

export namespace Convert {
  export namespace Collection {
    export const intoInfraSide = (
      input: Option<UserSideInput.Collection> | undefined,
    ): Option<InfraSideInput.Collection> => {
      if (!input) {
        return null;
      }

      return {
        key: input.toPublicKey(),
        verified: false,
      };
    };

    export const intoUserSide = (
      output: Option<InfraSideOutput.Collection>,
    ): UserSideOutput.Collection | undefined => {
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
