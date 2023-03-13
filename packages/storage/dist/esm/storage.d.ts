import { Secret } from '@solana-suite/shared';
import { _InputNftMetadata } from '@solana-suite/shared-metaplex';
export declare namespace Storage {
    const uploadMetaContent: (input: _InputNftMetadata, feePayer?: Secret) => Promise<{
        uri: string;
        sellerFeeBasisPoints: number;
        reducedMetadata: {
            symbol: string;
            name: string;
            description?: string | undefined;
            external_url?: string | undefined;
            attributes?: import("@solana-suite/shared-metaplex").MetadataAttribute[] | undefined;
            properties?: import("@solana-suite/shared-metaplex").MetadataProperties | undefined;
            isMutable?: boolean | undefined;
            maxSupply?: import("@metaplex-foundation/js").BigNumber | undefined;
            uses?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/mpl-token-metadata").Uses> | undefined;
            isCollection?: boolean | undefined;
            creators?: import("@metaplex-foundation/js").CreatorInput[] | undefined;
            collection?: import("@solana-suite/shared-metaplex")._InputCollection | undefined;
        };
    }>;
}
