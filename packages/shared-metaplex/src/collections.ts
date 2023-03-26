import { User, Infra } from './types';

export namespace Collections {
  export const toConvertInfra = (
    input: User.Collection | undefined
  ): Infra.Collection => {
    if (!input) {
      return null;
    }

    return {
      key: input.toPublicKey(),
      verified: true,
    };
  };

  export const toConvertUser = (
    output: Infra.Collection | undefined
  ): User.Collection => {
    return !output ? null : output.toString();
  };
}
