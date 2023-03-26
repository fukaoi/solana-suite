import { InputTokenMetadata, MetaplexDataV2 } from './types';
export declare module TokenMetadata {
    const toConvertInfra: (input: InputTokenMetadata, uri: string, sellerFeeBasisPoints: number) => MetaplexDataV2;
}
