import { Result } from '@solana-suite/shared';
import { NftStorageMetaplexMetadata } from '../metaplex';
import { NftStorageMetadata } from '../storage';

export namespace Validator {
  export namespace Message {
    export const SUCCESS = 'success';
    export const SMALL_NUMBER = 'too small';
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

  export type Condition = 'overMax' | 'underMin';
  export interface Limit {
    threshold: number;
    condition: Condition;
  }

  export interface Details {
    key: string;
    message: string;
    actual: string | number;
    limit?: Limit;
  }

  export const isRoyalty = (
    royalty: number
  ): Result<string, ValidatorError> => {
    const key = 'royalty';
    if (!royalty) {
      return Result.err(createError(key, Message.EMPTY, royalty));
    }
    if (royalty < ROYALTY_MIN) {
      return Result.err(
        createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: ROYALTY_MIN,
          condition: 'underMin',
        })
      );
    } else if (royalty > ROYALTY_MAX) {
      return Result.err(
        createError(key, Message.BIG_NUMBER, royalty, {
          threshold: ROYALTY_MAX,
          condition: 'overMax',
        })
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isName = (name: string): Result<string, ValidatorError> => {
    const key = 'name';
    if (!name) {
      return Result.err(createError(key, Message.EMPTY, name));
    }
    if (byteLength(name) > NAME_LENGTH) {
      return Result.err(
        createError(key, Message.LONG_LENGTH, name, {
          threshold: NAME_LENGTH,
          condition: 'overMax',
        })
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isSymbol = (symbol: string): Result<string, ValidatorError> => {
    const key = 'symbol';
    if (!symbol) {
      return Result.err(createError(key, Message.EMPTY, symbol));
    }
    if (byteLength(symbol) > SYMBOL_LENGTH) {
      return Result.err(
        createError(key, Message.LONG_LENGTH, symbol, {
          threshold: SYMBOL_LENGTH,
          condition: 'overMax',
        })
      );
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isFilePath = (
    filePath: string | File
  ): Result<string, ValidatorError> => {
    const key = 'filePath';
    if (!filePath) {
      return Result.err(createError(key, Message.EMPTY, filePath));
    }

    if (typeof filePath === 'string') {
      if (byteLength(filePath) > SYMBOL_LENGTH) {
        return Result.err(
          createError(key, Message.LONG_LENGTH, filePath, {
            threshold: SYMBOL_LENGTH,
            condition: 'overMax',
          })
        );
      }
    } else {
      if (filePath.size > SYMBOL_LENGTH) {
        return Result.err(
          createError(key, Message.LONG_LENGTH, filePath.text(), {
            threshold: SYMBOL_LENGTH,
            condition: 'overMax',
          })
        );
      }
    }

    return Result.ok(Message.SUCCESS);
  };

  export const isUriOrImage = (
    imageOrUri: string
  ): Result<string, ValidatorError> => {
    const key = 'uri or image';
    if (!imageOrUri) {
      return Result.err(createError(key, Message.EMPTY, imageOrUri));
    }
    if (byteLength(imageOrUri) > URL_LENGTH) {
      return Result.err(
        createError(key, Message.LONG_LENGTH, imageOrUri, {
          threshold: URL_LENGTH,
          condition: 'overMax',
        })
      );
    }
    if (!/https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(imageOrUri)) {
      return Result.err(createError(key, Message.INVALID_URL, imageOrUri));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const checkAllStorage = (
    metadata: NftStorageMetadata
  ): Result<string, ValidatorError> => {
    const keys = Object.keys(metadata);
    const results: Details[] = checkAllCommon(metadata);
    keys.map((key) => {
      let res!: Result<string, ValidatorError>;
      switch (key) {
        case 'seller_fee_basis_points':
          res = isRoyalty(metadata.seller_fee_basis_points!);
          break;
        case 'uri':
        case 'image':
          const actual = metadata.image! ? metadata.image : metadata.uri;
          res = isUriOrImage(actual as string);
          break;
      }
      if (res && res.isErr) {
        results.push(...res.error.details);
      }
    });
    if (results.length > 0) {
      const message = 'Caught in the validation errors';
      return Result.err(new ValidatorError(message, results));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const checkAllMetadata = (
    metadata: NftStorageMetaplexMetadata
  ): Result<string, ValidatorError> => {
    const keys = Object.keys(metadata);
    const results: Details[] = checkAllCommon(metadata);
    keys.map((key) => {
      let res!: Result<string, ValidatorError>;
      switch (key) {
        case 'sellerFeeBasisPoints':
          res = isRoyalty(metadata.seller_fee_basis_points!);
          break;
        case 'filePath':
          res = isFilePath(metadata.filePath!);
          break;
      }
      if (res && res.isErr) {
        results.push(...res.error.details);
      }
    });
    if (results.length > 0) {
      const message = 'Caught in the validation errors';
      return Result.err(new ValidatorError(message, results));
    }
    return Result.ok(Message.SUCCESS);
  };

  const byteLength = (value: string): number => {
    const text = new TextEncoder();
    return text.encode(value).length;
  };

  const checkAllCommon = (metadata: NftStorageMetadata): Details[] => {
    const keys = Object.keys(metadata);
    const results: Details[] = [];
    keys.map((key) => {
      let res!: Result<string, ValidatorError>;
      switch (key) {
        case 'name':
          res = isName(metadata.name!);
          break;
        case 'symbol':
          res = isSymbol(metadata.symbol!);
          break;
      }
      if (res && res.isErr) {
        results.push(...res.error.details);
      }
    });
    return results;
  };

  const createError = (
    key: string,
    message: string,
    actual: string | number,
    limit?: Limit
  ): ValidatorError => {
    let error: ValidatorError;
    if (limit) {
      error = new ValidatorError(message, [{ key, message, actual, limit }]);
    } else {
      error = new ValidatorError(message, [{ key, message, actual }]);
    }
    return error;
  };
}

export class ValidatorError extends Error {
  details: Validator.Details[];
  constructor(message: string, details: Validator.Details[]) {
    super(message);
    this.details = details;
  }
}
