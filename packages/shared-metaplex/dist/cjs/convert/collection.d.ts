import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.Collection {
    const intoInfraSide: (input: UserSideInput.Collection | undefined) => InfraSideInput.Collection | null;
    const intoUserSide: (output: InfraSideOutput.Collection | undefined) => UserSideOutput.Collection;
}
