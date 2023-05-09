import { InfraSideInput, InfraSideOutput, UserSideInput, UserSideOutput } from '../types';
export declare namespace Convert.NftMetadata {
    const intoInfraSide: (input: UserSideInput.NftMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
    const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain) => UserSideOutput.NftMetadata;
}
