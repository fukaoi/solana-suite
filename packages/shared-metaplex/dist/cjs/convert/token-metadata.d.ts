import { InfraSideInput, UserSideInput } from '../types';
export declare namespace Convert.TokenMetadata {
    const intoInfraSide: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
}
