import { Identity, Tags, UploadableFileType } from './types';
import { FileContent } from '@solana-suite/shared-metaplex';
export declare namespace ProvenanceLayer {
    const uploadFile: (uploadFile: FileContent, identity: Identity, tags?: Tags) => Promise<string>;
    const uploadData: (data: string, identity: Identity, tags?: Tags) => Promise<string>;
    const isNodeable: (value: unknown) => value is string;
    const isBrowserable: (value: unknown) => value is File;
    const isUploadable: (value: unknown) => value is UploadableFileType;
}
//# sourceMappingURL=provenance-layer.d.ts.map