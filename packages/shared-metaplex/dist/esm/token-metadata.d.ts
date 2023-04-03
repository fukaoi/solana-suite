import { InputTokenMetadata, MetaplexDataV2 } from './types';
export declare namespace TokenMetadata {
    const toConvertInfra: (input: InputTokenMetadata, uri: string, sellerFeeBasisPoints: number) => MetaplexDataV2;
}
