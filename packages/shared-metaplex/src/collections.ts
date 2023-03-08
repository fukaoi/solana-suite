import {
  InputCollection,
  InputCollectionAuthority,
  OutputCollection,
  _InputCollection,
  _InputCollectionAuthority,
  _OutputCollection,
} from './types';

export namespace Collections {
  export const toInputConvert = (
    input: InputCollection | undefined
  ): _InputCollection => (!input ? null : input.toPublicKey());

  export const toInputAuthorityConvert = (
    input: InputCollectionAuthority | undefined
  ): _InputCollectionAuthority => (!input ? null : input.toKeypair());

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
