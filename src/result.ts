export class Result<Ok, Fail> {
  private constructor(
    private _value: Ok | undefined,
    private _error: Fail | undefined
  ) {}

  static ok<Ok, Fail>(value: Ok) {
    return new Result<Ok, Fail>(value, undefined);
  }

  static fail<Ok, Fail>(error: Fail) {
    return new Result<Ok, Fail>(undefined, error);
  }

  static isFail(result: unknown): boolean {
    if (typeof result === 'object' && result) {
      return (result as Result<unknown, unknown>).isFail();
    }
    return false;
  }

  static isOk(result: unknown): boolean {
    if (typeof result === 'object' && result) {
      return (result as Result<unknown, unknown>).isOk();
    }
    return false;
  }

  isOk(): boolean {
    return this._value !== undefined  ? true : false;
  }

  isFail(): boolean {
    return this._error !== undefined ? true : false;
  }

  get value(): Ok | undefined {
    return this._value;
  }

  get error(): Fail | undefined {
    return this._error;
  }
}
