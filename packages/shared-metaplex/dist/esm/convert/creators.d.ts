import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.Creators {
    const intoInfraSide: (input: UserSideInput.Creator[] | undefined) => InfraSideInput.Creator[] | null;
    const intoUserSide: (output: InfraSideOutput.Creator[]) => UserSideOutput.Creator[];
}
