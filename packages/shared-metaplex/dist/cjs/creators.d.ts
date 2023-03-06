import { CreatorInput, Creator } from '@metaplex-foundation/js';
import { InputCreators, OutputCreators } from './types';
export declare module Creators {
    const toInputConvert: (input: InputCreators[] | undefined) => CreatorInput[];
    const toOutputConvert: (output: Creator[]) => OutputCreators[];
}
