import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.Creators {
    const intoInfra: (input: UserSideInput.Creator[] | undefined) => InfraSideInput.Creator[] | null;
    const intoUser: (output: InfraSideOutput.Creator[]) => UserSideOutput.Creator[];
}
