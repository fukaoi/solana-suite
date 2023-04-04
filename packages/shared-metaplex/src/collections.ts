import { User, Infra } from './types';

export namespace Collections {
  export const toConvertInfra = (
    input: User.Input.Collection | undefined
  ): Infra.Input.Collection => {
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
