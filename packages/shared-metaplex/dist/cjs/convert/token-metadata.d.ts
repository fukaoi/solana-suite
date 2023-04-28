import { InfraSideInput, UserSideInput } from '../types';
export declare namespace Convert.TokenMetadata {
    const intoInfra: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
}
