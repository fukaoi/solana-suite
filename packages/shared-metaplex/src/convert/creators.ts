import {
  InfraSideInput,
  InfraSideOutput,
  Option,
  UserSideInput,
  UserSideOutput,
} from '../types';

export namespace Convert.Creators {
  export const intoInfraSide = (
    input: Option<UserSideInput.Creators[]> | undefined
  ): Option<InfraSideInput.Creators[]> => {
    if (!input) {
      return [];
    }
    return input.map((data) => {
      let modify: Option<InfraSideInput.Creators> = null;
      modify = {
        address: data.address.toPublicKey(),
        share: data.share,
        verified: data.verified,
      };

      return modify;
    });
  };

  export const intoUserSide = (
    output: Option<InfraSideOutput.Creator[]>
  ): Option<UserSideOutput.Creators[]> => {
    if (!output) {
      return [];
    }

    return output.map((data) => {
      const modify = {
        address: data.address.toString(),
        share: data.share,
        verified: data.verified,
      };
      return modify;
    });
  };
}
