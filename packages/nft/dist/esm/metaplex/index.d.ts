export * from "./mint";
import { CreateNftInput } from "@metaplex-foundation/js";
import { NftStorageMetadata } from "../storage";
declare type noNeedOptional = "payer" | "owner" | "associatedTokenProgram" | "tokenProgram" | "confirmOptions";
export declare type MetaplexMetadata = Omit<CreateNftInput, noNeedOptional>;
export declare type NftStorageMetaplexMetadata = NftStorageMetadata & Omit<MetaplexMetadata, "uri"> & {
    filePath: string | File;
    storageType: 'arweave' | 'nftStorage';
};
