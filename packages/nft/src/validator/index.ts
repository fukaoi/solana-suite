import { Result } from '@solana-suite/shared';
import { NftStorageMetadata } from '../storage';

export namespace Validator {
  export namespace Message {
    export const SUCCESS = 'success';
    export const SMALL_NUMBER = 'too small 0 or higher';
    export const BIG_NUMBER = 'too big';
    export const LONG_LENGTH = 'too long';
    export const EMPTY = 'invalid empty value';
    export const INVALID_URL = 'invalid url';
  }

  export const NAME_LENGTH = 32;
  export const SYMBOL_LENGTH = 10;
  export const URL_LENGTH = 200;
  export const ROYALTY_MAX = 100;
  export const ROYALTY_MIN = 0;

  export interface Details {
    key: string;
    error: string;
  }

  export class ValidatorError extends Error {
    details: Details[];
    constructor(message: string, details: Details[]) {
      super(message);
      this.details = details;
    }
  }

  export const isRoyalty = (
    royalty: number
  ): Result<string, ValidatorError> => {
    const key = 'royalty';
    if (!royalty) {
      return Result.err(errorMessage(key, Message.EMPTY, royalty));
    }
    if (royalty < ROYALTY_MIN) {
      return Result.err(errorMessage(key, Message.SMALL_NUMBER, royalty));
    } else if (royalty > ROYALTY_MAX) {
      return Result.err(
        errorMessage(key, Message.BIG_NUMBER, royalty, ROYALTY_MAX)
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isName = (name: string): Result<string, ValidatorError> => {
    const key = 'name';
    if (!name) {
      return Result.err(errorMessage(key, Message.EMPTY, name));
    }
    if (byteLength(name) > NAME_LENGTH) {
      return Result.err(
        errorMessage(key, Message.LONG_LENGTH, name, NAME_LENGTH)
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isSymbol = (symbol: string): Result<string, ValidatorError> => {
    const key = 'symbol';
    if (!symbol) {
      return Result.err(errorMessage(key, Message.EMPTY, symbol));
    }
    if (byteLength(symbol) > SYMBOL_LENGTH) {
      return Result.err(
        errorMessage(key, Message.LONG_LENGTH, symbol, SYMBOL_LENGTH)
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isImageUrl = (
    imageUrl: string
  ): Result<string, ValidatorError> => {
    const key = 'image';
    if (!imageUrl) {
      return Result.err(errorMessage(key, Message.EMPTY, imageUrl));
    }
    if (byteLength(imageUrl) > URL_LENGTH) {
      return Result.err(
        errorMessage(key, Message.LONG_LENGTH, imageUrl, URL_LENGTH)
      );
    }
    if (!/https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(imageUrl)) {
      return Result.err(errorMessage(key, Message.INVALID_URL, imageUrl));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const checkAll = (
    metadata: NftStorageMetadata
  ): Result<string, ValidatorError> => {
    const keys = Object.keys(metadata);
    const results: Details[] = [];
    keys.map((key) => {
      let res!: Result<string, ValidatorError>; // initial
      switch (key) {
        case 'name':
          if (metadata.name) {
            res = isName(metadata.name);
          }
          break;
        case 'seller_fee_basis_points':
          if (metadata.seller_fee_basis_points) {
            res = isRoyalty(metadata.seller_fee_basis_points);
          }
          break;
        case 'symbol':
          if (metadata.symbol) {
            res = isSymbol(metadata.symbol);
          }
          break;
        case 'image':
          if (metadata.image) {
            res = isImageUrl(metadata.image);
          }
          break;
      }
      if (res.isErr) {
        results.push({ key, error: res.error.message });
      }
    });
    if (results.length > 0) {
      const message =
        'Caught in the validation errors, get error reasons from `err.fails`';
      return Result.err(new ValidatorError(message, results));
    }
    return Result.ok(Message.SUCCESS);
  };

  const byteLength = (value: string): number => {
    const text = new TextEncoder();
    return text.encode(value).length;
  };

  const errorMessage = (
    key: string,
    message: string,
    actual: string | number,
    limit?: number
  ): ValidatorError => {
    let error: string;
    if (limit) {
      error = `${message}, actual: ${actual}, limit: ${limit}`;
    } else {
      error = `${message}, actual: ${actual}, limit: ${limit}`;
    }
    return new ValidatorError(error, [{ key, error }]);
  };
}
