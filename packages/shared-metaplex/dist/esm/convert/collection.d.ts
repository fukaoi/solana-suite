import { InfraSideInput, InfraSideOutput, Option, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.Collection {
    const intoInfraSide: (input: Option<UserSideInput.Collection> | undefined) => Option<InfraSideInput.Collection>;
    const intoUserSide: (output: Option<InfraSideOutput.Collection>) => Option<UserSideOutput.Collection>;
}
