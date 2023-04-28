import { InfraSideInput, UserSideInput } from '../types';
export declare namespace Convert.NftMetadata {
    const intoInfra: (input: UserSideInput.NftMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
}
