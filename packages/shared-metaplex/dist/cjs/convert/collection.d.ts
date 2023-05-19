import { InfraSideInput, InfraSideOutput, Option, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.Collection {
    const intoInfraSide: (input: Option<UserSideInput.Collection> | undefined) => Option<InfraSideInput.Collection>;
    const intoUserSide: (output: Option<InfraSideOutput.Collection>) => UserSideOutput.Collection | undefined;
}
//# sourceMappingURL=collection.d.ts.map