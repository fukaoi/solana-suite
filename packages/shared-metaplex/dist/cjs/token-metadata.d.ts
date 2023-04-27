import { InfraSideInput, UserSideInput } from './types';
export declare namespace TokenMetadata {
    const toConvertInfra: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
}
