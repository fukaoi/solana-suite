import { CreatorInput, Creator } from '@metaplex-foundation/js';
import { InputCreators, OutputCreators } from './types';

export module Creators {
  export const toInputConvert = (input: InputCreators[]): CreatorInput[] => {
    return input.map((data) => {
      const modify: CreatorInput = {
        address: data.address.toPublicKey(),
        share: data.share,
        authority: data.authority,
      };
      return modify;
    });
  };

  export const toOutputConvert = (output: Creator[]): OutputCreators[] => {
    return output.map((data) => {
      const modify: OutputCreators = {
        address: data.address.toString(),
        share: data.share,
        verified: data.verified,
      };
      return modify;
    });
  };
}
