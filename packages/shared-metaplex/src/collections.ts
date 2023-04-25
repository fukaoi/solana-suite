import { InfraSideInput, UserSideInput } from './types';

export namespace Collections {
  export const toConvertInfra = (
    input: UserSideInput.TokenMetadata | undefined
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
    output: Infra.Output.Collection | undefined
  ): User.Output.Collection => {
    if (!output) {
      return null;
    }

    return {
      address: output.address.toString(),
      verified: output.verified,
    };
  };
}
