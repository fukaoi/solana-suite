import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { InputNftMetadata } from './types';
export declare module MetaplexMetadata {
    const toConvertDataV2: (input: InputNftMetadata, uri: string, sellerFeeBasisPoints: number) => DataV2;
}
