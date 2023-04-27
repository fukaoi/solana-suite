import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from './types';
export declare namespace Creators {
    const toConvertInfra: (input: UserSideInput.Creator[] | undefined) => InfraSideInput.Creator[] | null;
    const toConvertUser: (output: InfraSideOutput.Creator[]) => UserSideOutput.Creator[];
}
