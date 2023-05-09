import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.TokenMetadata {
    const intoInfraSide: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
    const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: any) => UserSideOutput.TokenMetadata;
    const deleteNullStrings: (str: string) => string;
}
