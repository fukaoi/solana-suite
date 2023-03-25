import { CreatorInput, Creator } from '@metaplex-foundation/js';
import { ICreators, OCreators } from './types';
export declare namespace Creators {
    const toInputConvert: (input: ICreators[] | undefined) => CreatorInput[];
    const toOutputConvert: (output: Creator[]) => OCreators[];
}
