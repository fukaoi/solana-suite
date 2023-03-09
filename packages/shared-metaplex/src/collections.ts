import {
  InputCollection,
  OutputCollection,
  _InputCollection,
  _OutputCollection,
} from './types';

export namespace Collections {
  export const toInputConvert = (
    input: InputCollection | undefined
  ): _InputCollection => (!input ? null : input.toPublicKey());

  export const toOutputConvert = (
    output: _OutputCollection | undefined
  ): OutputCollection => {
    return !output
      ? null
      : {
          address: output.address.toString(),
          verified: output.verified,
        };
  };
}
