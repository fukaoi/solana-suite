import { CreatorInput, Creator } from '@metaplex-foundation/js';
import { InputCreators, OutputCreators } from './types';

export module Creators {
  export const toInputConvert = (input: InputCreators): CreatorInput[] => {
    return [];
  };
  export const toOutputConvert = (output: Creator): OutputCreators[] => {
    return [];
  };
}

