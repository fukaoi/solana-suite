import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { _InputNftMetadata } from './types';
export declare module MetaplexMetadata {
    const toConvertDataV2: (input: _InputNftMetadata, uri: string, sellerFeeBasisPoints: number) => DataV2;
}
