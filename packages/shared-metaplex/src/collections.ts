import {
  ICollection,
  OCollection,
  Collection,
} from './types';

export namespace Collections {
  export const toInputConvert = (
    input: ICollection | undefined
  ): any => (!input ? null : input.toPublicKey());

  export const toOutputConvert = (
    output: OCollection | undefined
  ): OCollection => {
    return !output
      ? null
      : {
          address: output.address.toString(),
          verified: output.verified,
        };
  };
}
