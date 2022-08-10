import { Result } from '@solana-suite/shared';

export namespace Validator {
  export namespace Message {
    export const SUCCESS = 'success'
    export const SMALL = 'too small'
    export const BIG = 'too big'

  }
  export const isRoyalty = (actual: number) => {
    if (actual < 0) {
      return Result.err(Error(Message.SMALL));
    } else if (actual > 100) {
      return Result.err(Error(Message.BIG));
    }
    return Result.ok(Message.SUCCESS);
  };

  export const isName = (actual: string) => {
    if (actual.length < 0) {
      return Result.err(Error(Message.SMALL));
    } else if (actual.length > 100) {
      return Result.err(Error(Message.BIG));
    }
    return Result.ok(Message.SUCCESS);
  };
}
