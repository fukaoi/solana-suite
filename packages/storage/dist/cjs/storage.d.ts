import { Secret } from '@solana-suite/shared';
export declare namespace Storage {
    const uploadMetaContent: (input: InputNftMetadata, feePayer?: Secret) => Promise<{
        uri: string;
        sellerFeeBasisPoints: any;
        reducedMetadata: InputNftMetadata;
    }>;
}
