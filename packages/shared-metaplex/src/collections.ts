import {
  InfraSideInput,
  InfraSideOutput,
  UserSideInput,
  UserSideOutput,
} from './types';

export namespace Collections {
  export const toConvertInfra = (
    input: UserSideInput.Collection | undefined
  ): InfraSideInput.Collection => {
    if (!input) {
      return null;
    }

    return {
      key: input.toPublicKey(),
      verified: false,
    };
  };

  export const toConvertUser = (
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
