import { User, Infra } from './types';

export namespace Creators {
  export const toConvertInfra = (
    input: User.Creators[] | undefined
  ): Infra.Creators[] => {
    if (!input) {
      return [];
    }
    return input.map((data) => {
      const modify = {
        address: data.address.toPublicKey(),
        share: data.share,
        verified: data.verified,
      };
      return modify;
    });
  };

  export const toConvertUser = (output: Infra.Creators[]): User.Creators[] => {
    if (!output) {
      return [];
    }
    return output.map((data) => {
      const modify: User.Creators = {
        address: data.address.toString(),
        share: data.share,
        verified: data.verified,
      };
      return modify;
    });
  };
}
