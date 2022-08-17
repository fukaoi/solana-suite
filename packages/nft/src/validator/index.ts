import { Result } from "@solana-suite/shared";
import { NftStorageMetadata } from "../storage";

export namespace Validator {
  export namespace Message {
    export const SUCCESS = "success";
    export const SMALL_NUMBER = "too small, 0 or higher";
    export const BIG_NUMBER = "too big, max 100";
    export const LONG_LENGTH = "too long, max 10";
    export const EMPTY = "invalid empty value";
    export const INVALID_URL = "invalid url";
  }
  export interface ValidatorErrors {
    key: string;
    error: string;
  }

  export const isRoyalty = (actual: number): Result<string, Error> => {
    if (actual < 0) {
      return Result.err(Error(Message.SMALL_NUMBER));
    } else if (actual > 100) {
      return Result.err(Error(Message.BIG_NUMBER));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isName = (actual: string): Result<string, Error> => {
    if (actual.length <= 0) {
      return Result.err(Error(Message.EMPTY));
    } else if (actual.length > 10) {
      return Result.err(Error(Message.LONG_LENGTH));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isSymbol = (actual: string): Result<string, Error> => {
    if (actual.length <= 0) {
      return Result.err(Error(Message.EMPTY));
    } else if (actual.length > 8) {
      return Result.err(Error(Message.LONG_LENGTH));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isImageUrl = (actual: string): Result<string, Error> => {
    if (actual.length <= 0) {
      return Result.err(Error(Message.EMPTY));
    } else if (
      !/https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(actual)
    ) {
      return Result.err(Error(Message.INVALID_URL));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const checkAll = (
    metadata: NftStorageMetadata
  ): Result<string, any> => {
    const keys = Object.keys(metadata);
    const results: ValidatorErrors[] = [];
    keys.map((key) => {
      switch (key) {
        case "name":
          if (metadata.name) {
            const res = isName(metadata.name);
            if (res.isErr) {
              results.push({ key, error: res.error.message });
            }
          }
          break;
        case "seller_fee_basis_points":
          if (metadata.seller_fee_basis_points) {
            const res2 = isRoyalty(metadata.seller_fee_basis_points);
            if (res2.isErr) {
              results.push({ key, error: res2.error.message });
            }
          }
          break;
        case "symbol":
          if (metadata.symbol) {
            const res2 = isSymbol(metadata.symbol);
            if (res2.isErr) {
              results.push({ key, error: res2.error.message });
            }
          }
          break;
      }
    });
    if (results.length > 0) {
      return Result.err(results as any);
    }
    return Result.ok(Message.SUCCESS);
  };
}
