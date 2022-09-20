import { MetaplexFileContent } from '@metaplex-foundation/js';
import { isBrowser, Result } from '@solana-suite/shared';
import {Internals_Royalty} from './internals/_royalty';
import {
  InputMetaplexMetadata,
  MetaplexMetaData,
} from './types/metaplex/index';

import { NftStorageMetadata } from './types/storage';
import { Limit, Details } from './types/validator';

export namespace Validator {
  export namespace Message {
    export const SUCCESS = 'success';
    export const SMALL_NUMBER = 'too small';
    export const BIG_NUMBER = 'too big';
    export const LONG_LENGTH = 'too long';
    export const EMPTY = 'invalid empty value';
    export const INVALID_URL = 'invalid url';
    export const ONLY_NODE_JS = '`string` type is only Node.js';
  }

  export const NAME_LENGTH = 32;
  export const SYMBOL_LENGTH = 10;
  export const URL_LENGTH = 200;
  export const ROYALTY_MAX = 100;
  export const SELLER_FEE_BASIS_POINTS_MAX = 10000;
  export const ROYALTY_MIN = -1;

  export const isRoyalty = (
    royalty: number
  ): Result<string, ValidatorError> => {
    const key = 'royalty';
    if (royalty !== 0 && !royalty) {
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

  export const isSellerFeeBasisPoints = (
    royalty: number
  ): Result<string, ValidatorError> => {
    const key = 'sellerFeeBasisPoints/seller_fee_basis_points';
    if (royalty !== 0 && !royalty) {
      return Result.err(createError(key, Message.EMPTY, royalty));
    }
    if (royalty < ROYALTY_MIN) {
      return Result.err(
        createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: ROYALTY_MIN,
          condition: 'underMin',
        })
      );
    } else if (royalty > ROYALTY_MAX * Internals_Royalty.THRESHOLD) {
      return Result.err(
        createError(key, Message.BIG_NUMBER, royalty, {
          threshold: SELLER_FEE_BASIS_POINTS_MAX,
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
    filePath: MetaplexFileContent
  ): Result<string, ValidatorError> => {
    const key = 'filePath';
    if (!filePath) {
      return Result.err(createError(key, Message.EMPTY, filePath));
    }
    if (isBrowser() && typeof filePath === 'string') {
      return Result.err(createError(key, Message.ONLY_NODE_JS, filePath));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isUri = (uri: string): Result<string, ValidatorError> =>
    isUriOrImage(uri, 'uri');

  export const isImageUrl = (image: string): Result<string, ValidatorError> =>
    isUriOrImage(image, 'image');

  export const checkAll = <
    T extends PickNftStorage | PickNftStorageMetaplex | PickMetaplex
  >(
    metadata: T
  ): Result<string, ValidatorError> => {
    const keys = Object.keys(metadata);
    const results: Details[] = [];
    keys.map((key) => {
      let res!: Result<string, ValidatorError>;
      switch (key) {
        case 'uri':
          if (key in metadata) {
            res = isUri(metadata.uri);
          }
          break;
        case 'image':
          if (key in metadata) {
            res = isImageUrl(metadata.image!);
          }
          break;
        case 'royalty':
          if (key in metadata) {
            res = isRoyalty(metadata.royalty);
          }
          break;
        case 'seller_fee_basis_points':
          if (key in metadata) {
            res = isSellerFeeBasisPoints(metadata.seller_fee_basis_points!);
          }
          break;
        case 'sellerFeeBasisPoints':
          if (key in metadata) {
            res = isSellerFeeBasisPoints(metadata.sellerFeeBasisPoints!);
          }
          break;
        case 'name':
          res = isName(metadata.name!);
          break;
        case 'symbol':
          res = isSymbol(metadata.symbol!);
          break;
        case 'filePath':
          if (key in metadata) {
            res = isFilePath(metadata.filePath);
          }
          break;
      }
      if (res && res.isErr) {
        results.push(...res.error.details);
      }
    });
    if (results.length > 0) {
      const message =
        'Caught in the validation errors. see information e.g: err<ValidatorError>.details';
      return Result.err(new ValidatorError(message, results));
    }
    return Result.ok(Message.SUCCESS);
  };

  type PickNftStorage = Pick<
    NftStorageMetadata,
    'name' | 'symbol' | 'image' | 'seller_fee_basis_points'
  >;
  type PickNftStorageMetaplex = Pick<
    InputMetaplexMetadata,
    'name' | 'symbol' | 'royalty' | 'filePath'
  >;
  type PickMetaplex = Pick<
    MetaplexMetaData,
    'name' | 'symbol' | 'uri' | 'sellerFeeBasisPoints'
  >;

  const byteLength = (value: string): number => {
    const text = new TextEncoder();
    return text.encode(value).length;
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

  const isUriOrImage = (
    imageOrUri: string,
    key: string
  ): Result<string, ValidatorError> => {
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
}

export class ValidatorError extends Error {
  details: Details[];
  constructor(message: string, details: Details[]) {
    super(message);
    this.details = details;
  }
}
