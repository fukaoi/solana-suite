import { InfraSideInput, UserSideInput } from './types';
export declare namespace NftMetadata {
    const toConvertInfra: (input: UserSideInput.NftMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
}
