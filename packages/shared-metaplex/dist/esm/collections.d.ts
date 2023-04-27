import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from './types';
export declare namespace Collections {
    const toConvertInfra: (input: UserSideInput.Collection | undefined) => InfraSideInput.Collection | null;
    const toConvertUser: (output: InfraSideOutput.Collection | undefined) => UserSideOutput.Collection;
}
