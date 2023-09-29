import { Option, UserSideInput, InfraSideInput, InfraSideOutput, UserSideOutput, FileContent } from 'types/converter';
import { Result } from 'shared';
import { Secret } from 'types/account';
import { StorageType } from 'types/storage';

declare namespace Converter$7 {
    namespace Collection {
        const intoInfraSide: (input: Option<UserSideInput.Collection> | undefined) => Option<InfraSideInput.Collection>;
        const intoUserSide: (output: Option<InfraSideOutput.Collection>) => UserSideOutput.Collection | undefined;
    }
}

declare namespace Converter$6 {
    namespace Creators {
        const intoInfraSide: (input: Option<UserSideInput.Creators[]> | undefined) => Option<InfraSideInput.Creators[]>;
        const intoUserSide: (output: Option<InfraSideOutput.Creator[]>) => UserSideOutput.Creators[] | undefined;
    }
}

declare namespace Converter$5 {
    namespace NftMetadata {
        const intoInfraSide: (input: UserSideInput.NftMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
        const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.NftMetadata;
    }
}

declare namespace Converter$4 {
    namespace Properties {
        const intoInfraSide: (input: UserSideInput.Properties | undefined, storageFunc: (data: FileContent, storageType: StorageType, feePayer?: Secret) => Promise<Result<string, Error>>, storageType: StorageType, feePayer?: Secret) => Promise<InfraSideInput.Properties>;
    }
}

declare namespace Converter$3 {
    namespace Royalty {
        const THRESHOLD = 100;
        const intoInfraSide: (percentage: number) => number;
    }
}

declare namespace Converter$2 {
    namespace TokenMetadata {
        const intoInfraSide: (input: UserSideInput.TokenMetadata, uri: string, sellerFeeBasisPoints: number) => InfraSideInput.MetaplexDataV2;
        const intoUserSide: (output: InfraSideOutput.OnchainAndOffchain, tokenAmount: string) => UserSideOutput.TokenMetadata;
        const deleteNullStrings: (str: string) => string;
    }
}

declare namespace Converter$1 {
    namespace Uses {
        const intoUserSide: (output: Option<InfraSideOutput.Uses>) => UserSideOutput.Uses | undefined;
    }
}

declare const Converter: {
    Uses: typeof Converter$1.Uses;
    TokenMetadata: typeof Converter$2.TokenMetadata;
    Royalty: typeof Converter$3.Royalty;
    Properties: typeof Converter$4.Properties;
    NftMetadata: typeof Converter$5.NftMetadata;
    Creators: typeof Converter$6.Creators;
    Collection: typeof Converter$7.Collection;
};

export { Converter };
