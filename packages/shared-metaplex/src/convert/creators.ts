import {
  InfraSideInput,
  InfraSideOutput,
  UserSideInput,
  UserSideOutput,
} from '../types';

export namespace Convert.Creators {
  export const intoInfraSide = (
    input: UserSideInput.Creators[]
  ): InfraSideInput.Creators[] => {
    if (!input) {
      return null;
    }
    return input.map((data) => {
      if (!data) {
        return null;
      }
      const modify = {
        address: data.address.toPublicKey(),
        share: data.share,
        verified: data.verified,
      };
      return modify;
    });
  };

  export const intoUserSide = (
    output: InfraSideOutput.Creator[]
  ): UserSideOutput.Creators[] => {
    if (!output) {
      return [];
    }

    return output.map((data) => {
      if (!data) {
        return null;
      }
      const modify = {
        address: data.address.toString(),
        share: data.share,
        verified: data.verified,
      };
      return modify;
    });
  };
}
