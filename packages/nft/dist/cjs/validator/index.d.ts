import { Result } from "@solana-suite/shared";
import { NftStorageMetadata } from "../storage";
export declare namespace Validator {
    namespace Message {
        const SUCCESS = "success";
        const SMALL_NUMBER = "too small, 0 or higher";
        const BIG_NUMBER = "too big, max 100";
        const LONG_LENGTH = "too long, max 10";
        const EMPTY = "invalid empty value";
    }
    const isRoyalty: (actual: number) => Result<string, Error>;
    const isName: (actual: string) => Result<string, Error>;
    const isSymbol: (actual: string) => Result<string, Error>;
    const checkAll: (metadata: NftStorageMetadata) => Result<string, Error>;
}
