import {
  InfraSideInput,
  InfraSideOutput,
  UserSideInput,
  UserSideOutput,
} from '../types';

export namespace Convert.Collection {
  export const intoInfraSide = (
    input: UserSideInput.Collection
  ): InfraSideInput.Collection => {
    if (!input) {
      return null;
    }

    return {
      key: input.toPublicKey(),
      verified: false,
    };
  };

  export const intoUserSide = (
    output: InfraSideOutput.Collection
  ): UserSideOutput.Collection => {
    if (!output) {
      return null;
    }

    return {
      address: output.key.toString(),
      verified: output.verified,
    };
  };
}
