import {
  InfraSideInput,
  InfraSideOutput,
  UserSideInput,
  UserSideOutput,
} from '../types';

export namespace Convert.Collection {
  export const intoInfra = (
    input: UserSideInput.Collection | undefined
  ): InfraSideInput.Collection | null => {
    if (!input) {
      return null;
    }

    return {
      key: input.toPublicKey(),
      verified: false,
    };
  };

  export const intoUser = (
    output: InfraSideOutput.Collection | undefined
  ): UserSideOutput.Collection => {
    if (!output) {
      return null;
    }

    return {
      address: output.address.toString(),
      verified: output.verified,
    };
  };
}
