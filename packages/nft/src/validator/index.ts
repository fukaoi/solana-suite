import { Result } from '@solana-suite/shared';
import {NftStorageMetadata} from '../storage';

export namespace Validator {
  export namespace Message {
    export const SUCCESS = 'success'
    export const SMALL = 'too small'
    export const BIG = 'too big'

  }
  export const isRoyalty = (actual: number): Result<string, Error> => {
    if (actual < 0) {
      return Result.err(Error(Message.SMALL));
    } else if (actual > 100) {
      return Result.err(Error(Message.BIG));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isName = (actual: string): Result<string, Error> => {
    if (actual.length < 0) {
      return Result.err(Error(Message.SMALL));
    } else if (actual.length > 100) {
      return Result.err(Error(Message.BIG));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const checkAll = (actualData: NftStorageMetadata) => {
    const keys = Object.keys(actualData);
    keys.map(key => {
      console.log(key);
      console.log(actualData[key]);
    });
  };
}
