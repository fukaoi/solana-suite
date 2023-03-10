import { CreatorInput, Creator } from '@metaplex-foundation/js';
import { Secret } from '@solana-suite/shared';
import { InputCreators, OutputCreators } from './types';

export namespace Creators {
  export const toInputConvert = (
    input: InputCreators[] | undefined
  ): CreatorInput[] => {
    if (!input) {
      return [];
    }
    return input.map((data) => {
      const authority = data.authority
        ? (data.authority ).toKeypair()
        : undefined;
      const modify: CreatorInput = {
        address: data.address.toPublicKey(),
        share: data.share,
        authority: authority,
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
