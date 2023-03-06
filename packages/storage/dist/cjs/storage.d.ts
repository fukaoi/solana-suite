import { Secret } from '@solana-suite/shared';
export declare namespace Storage {
    const uploadMetaContent: (input: _InputNftMetadata, feePayer?: Secret) => Promise<{
        uri: string;
        sellerFeeBasisPoints: number;
        reducedMetadata: _InputNftMetadata;
    }>;
}
