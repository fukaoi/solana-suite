import { Result, Secret } from '@solana-suite/shared';
import { FileContent, InfraSideInput } from '@solana-suite/shared-metaplex';
export declare namespace Arweave {
    const uploadFile: (filePath: FileContent, feePayer: Secret) => Promise<Result<string, Error>>;
    const uploadData: (metadata: InfraSideInput.Offchain, feePayer: Secret) => Promise<Result<string, Error>>;
}
//# sourceMappingURL=arweave.d.ts.map