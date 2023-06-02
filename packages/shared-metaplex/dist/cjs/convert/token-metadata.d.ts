import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.TokenMetadata {
    const intoInfraSide: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
    const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.TokenMetadata;
    const deleteNullStrings: (str: string) => string;
}
//# sourceMappingURL=token-metadata.d.ts.map