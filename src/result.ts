export class Result<Success, Failure> {
  private constructor(
    private _value: Success | undefined,
    private _errorValue: Failure | undefined
  ) {}

  static success<Success, Failure>(value: Success) {
    return new Result<Success, Failure>(value, undefined);
  }

  static failure<Success, Failure>(errorValue: Failure) {
    return new Result<Success, Failure>(undefined, errorValue);
  }

  isSuccess(): boolean {
    return this._value ? true : false;
  }

  isFailure(): boolean {
    return this._errorValue ? true : false;
  }

  get value(): Success | undefined {
    return this._value;
  }

  get errorValue(): Failure | undefined {
    return this._errorValue;
  }
}
