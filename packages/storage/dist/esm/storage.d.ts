import { Secret } from '@solana-suite/shared';
import { _InputNftMetadata } from '@solana-suite/shared-metaplex';
export declare namespace Storage {
    const uploadMetaContent: (input: _InputNftMetadata, feePayer?: Secret) => Promise<{
        uri: string;
        sellerFeeBasisPoints: number;
        reducedMetadata: {
            name: string;
            symbol: string;
            description?: string | undefined;
            external_url?: string | undefined;
            attributes?: import("@solana-suite/shared-metaplex").JsonMetadataAttribute[] | undefined;
            properties?: import("@solana-suite/shared-metaplex").JsonMetadataProperties | undefined;
            isMutable?: boolean | undefined;
            maxSupply?: import("@metaplex-foundation/js").BigNumber | undefined;
            creators: import("@solana-suite/shared-metaplex").InputCreators[] & import("@metaplex-foundation/js").CreatorInput[];
            uses?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/mpl-token-metadata").Uses> | undefined;
        };
    }>;
}
