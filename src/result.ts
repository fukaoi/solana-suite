export class Result<Success, Failure> {
    private constructor(
        private value: Success|undefined,
        private errorValue: Failure|undefined
    ) {}

    static success<Success, Failure>(value: Success) {
        return new Result<Success, Failure>(value, undefined);
    }

    static failure<Success, Failure>(errorValue: Failure) {
        return new Result<Success, Failure>(undefined, errorValue);
    }

    isSuccess(): boolean {
      return this.value ? true : false;
    }

    isFailure(): boolean {
      return this.errorValue ? true : false;
    }
}
