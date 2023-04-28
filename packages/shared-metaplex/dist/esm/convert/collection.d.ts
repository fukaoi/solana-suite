import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.Collection {
    const intoInfra: (input: UserSideInput.Collection | undefined) => InfraSideInput.Collection | null;
    const intoUser: (output: InfraSideOutput.Collection | undefined) => UserSideOutput.Collection;
}
