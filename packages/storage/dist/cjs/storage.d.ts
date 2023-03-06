import { Secret } from '@solana-suite/shared';
import { InputNftMetadata } from '@solana-suite/shared-metaplex';
export declare namespace Storage {
    const uploadMetaContent: (input: InputNftMetadata, feePayer?: Secret) => Promise<{
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
            creators?: import("@solana-suite/shared-metaplex").InputCreators[] | undefined;
            uses?: import("@metaplex-foundation/js").Option<import("@metaplex-foundation/mpl-token-metadata").Uses> | undefined;
            isCollection?: boolean | undefined;
            collection?: import("@metaplex-foundation/js").Option<import("@solana-suite/shared").Pubkey> | undefined;
            collectionAuthority?: import("@metaplex-foundation/js").Option<Secret> | undefined;
            collectionAuthorityIsDelegated?: boolean | undefined;
            collectionIsSized?: boolean | undefined;
        };
    }>;
}
