import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.NftMetadata {
    const intoInfraSide: (input: UserSideInput.NftMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
    const intoUserSide: (input: InfraSideOutput.OnchainAndOffchain) => UserSideOutput.NftMetadata;
    const deleteNullStrings: (str: string) => string;
}
