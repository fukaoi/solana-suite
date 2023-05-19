import { InfraSideInput, InfraSideOutput, Option, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.Creators {
    const intoInfraSide: (input: Option<UserSideInput.Creators[]> | undefined) => Option<InfraSideInput.Creators[]>;
    const intoUserSide: (output: Option<InfraSideOutput.Creator[]>) => UserSideOutput.Creators[] | undefined;
}
//# sourceMappingURL=creators.d.ts.map