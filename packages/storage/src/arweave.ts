import { ProvenanceLayer } from "./provenance-layer";
import { debugLog, Result, Secret, Try } from "@solana-suite/shared";
import { FileContent, InfraSideInput } from "@solana-suite/shared-metaplex";

export namespace Arweave {
  export const uploadFile = (
    filePath: FileContent,
    feePayer: Secret,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog("# upload file: ", filePath);
      await ProvenanceLayer.fundArweave(filePath, feePayer);
      return await ProvenanceLayer.uploadFile(filePath, feePayer);
    });
  };

  export const uploadData = (
    metadata: InfraSideInput.Offchain,
    feePayer: Secret,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog("# upload meta data: ", metadata);
      return await ProvenanceLayer.uploadData(
        JSON.stringify(metadata),
        feePayer,
      );
    });
  };
}
