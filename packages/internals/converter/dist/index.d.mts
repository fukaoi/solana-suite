import { Option, UserSideInput, InfraSideInput, InfraSideOutput, UserSideOutput, FileContent, StorageType } from 'internals/types';
import { Secret, Result } from '@solana-suite/shared';

declare namespace Convert$6 {
    namespace Collection {
        const intoInfraSide: (input: Option<UserSideInput.Collection> | undefined) => Option<InfraSideInput.Collection>;
        const intoUserSide: (output: Option<InfraSideOutput.Collection>) => UserSideOutput.Collection | undefined;
    }
}

declare namespace Convert$5 {
    namespace Creators {
        const intoInfraSide: (input: Option<UserSideInput.Creators[]> | undefined) => Option<InfraSideInput.Creators[]>;
        const intoUserSide: (output: Option<InfraSideOutput.Creator[]>) => UserSideOutput.Creators[] | undefined;
    }
}

declare namespace Convert$4 {
    namespace NftMetadata {
        const intoInfraSide: (input: UserSideInput.NftMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
        const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.NftMetadata;
    }
}

declare namespace Convert$3 {
    namespace Properties {
        const intoInfraSide: (input: UserSideInput.Properties | undefined, storageFunc: (data: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<InfraSideInput.Properties>;
    }
}

declare namespace Convert$2 {
    namespace TokenMetadata {
        const intoInfraSide: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
        const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.TokenMetadata;
        const deleteNullStrings: (str: string) => string;
    }
}

declare namespace Convert$1 {
    namespace Uses {
        const intoUserSide: (output: Option<InfraSideOutput.Uses>) => UserSideOutput.Uses | undefined;
    }
}

declare const Convert: {
    Uses: typeof Convert$1.Uses;
    TokenMetadata: typeof Convert$2.TokenMetadata;
    Properties: typeof Convert$3.Properties;
    NftMetadata: typeof Convert$4.NftMetadata;
    Creators: typeof Convert$5.Creators;
    Collection: typeof Convert$6.Collection;
};

export { Convert };
