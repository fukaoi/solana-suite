// forked: https://github.com/badrap/result, thank you advice  @jviide

import {TransactionSignature} from '@solana/web3.js';
import {Instruction} from './instruction';

abstract class AbstractResult<T, E extends Error> {
  protected abstract _chain<X, U extends Error>(
    ok: (value: T) => Result<X, U>,
    err: (error: E) => Result<X, U>
  ): Result<X, U>;

  unwrap(): T;
  unwrap<U>(ok: (value: T) => U): U;
  unwrap<U, V>(ok: (value: T) => U, err: (error: E) => V): U | V;
  // unified-signatures. into line 10
  // unwrap<U>(ok: (value: T) => U, err: (error: E) => U): U;
  unwrap(ok?: (value: T) => unknown, err?: (error: E) => unknown): unknown {
    const r = this._chain(
      value => Result.ok(ok ? ok(value) : value),
      error => (err ? Result.ok(err(error)) : Result.err(error))
    );
    if (r.isErr) {
      throw r.error;
    }
    return r.value;
  }

  //// map ////
  map<U>(ok: (value: T) => U): Result<U, E>;
  map<U, F extends Error>(
    ok: (value: T) => U,
    err: (error: E) => F
  ): Result<U, F>;
  map(ok: (value: T) => unknown, err?: (error: E) => Error): Result<unknown> {
    return this._chain(
      value => Result.ok(ok(value)),
      error => Result.err(err ? err(error) : error)
    );
  }

  //// chain ////
  chain<X>(ok: (value: T) => Result<X, E>): Result<X, E>;
  chain<X>(
    ok: (value: T) => Result<X, E>,
    // unified-signatures. into line 37
    // err: (error: E) => Result<X, E>
  ): Result<X, E>;
  chain<X, U extends Error>(
    ok: (value: T) => Result<X, U>,
    err: (error: E) => Result<X, U>
  ): Result<X, U>;
  chain(
    ok: (value: T) => Result<unknown>,
    err?: (error: E) => Result<unknown>
  ): Result<unknown> {
    return this._chain(ok, err || (error => Result.err(error)));
  }

  //// match ////
  match<U, F>(
    ok: (value: T) => U,
    err: (error: E) => F
  ): void | Promise<void>;

  match(
    ok: (value: T) => unknown,
    err: (error: E) => unknown
  ): void | Promise<void> {
     this._chain(
      value => Result.ok(ok(value)),
      error => Result.err(err(error) as Error)
    );
  }


  /// submit (alias Instruction.submit) ////
  async submit(): Promise<Result<TransactionSignature, Error>> {
    try {
      const instruction = this.unwrap() as unknown;
      const castedInst = instruction as Instruction;
      // why return false?
      // if (instruction instanceof Instruction) {
      if (castedInst.instructions && castedInst.signers) {
        return await castedInst.submit();
      }
      return Result.err(Error('Only Instruction object'));
    } catch (err) {
      return Result.err(err as Error);
    }
  }
}

class InternalOk<T, E extends Error> extends AbstractResult<T, E> {
  readonly isOk = true;
  readonly isErr = false;
  constructor(readonly value: T) {
    super();
  }

  protected _chain<X, U extends Error>(
    ok: (value: T) => Result<X, U>,
    _err: (error: E) => Result<X, U>
  ): Result<X, U> {
    return ok(this.value);
  }
}

class InternalErr<T, E extends Error> extends AbstractResult<T, E> {
  readonly isOk = false;
  readonly isErr = true;
  constructor(readonly error: E) {
    super();
  }

  protected _chain<X, U extends Error>(
    _ok: (value: T) => Result<X, U>,
    err: (error: E) => Result<X, U>
  ): Result<X, U> {
    return err(this.error);
  }
}

export namespace Result {
  export interface Ok<T, E extends Error> extends InternalOk<T, E> {}
  export interface Err<T, E extends Error> extends InternalErr<T, E> {}

  export function ok<T, E extends Error>(value: T): Result<T, E> {
    return new InternalOk(value);
  }
  export function err<E extends Error, T = never>(error?: E): Result<T, E>
  export function err<E extends Error, T = never>(error: E): Result<T, E> {
    return new InternalErr(error || Error());
  }

  type U = Result<unknown>;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U,
    R8 extends U,
    R9 extends U,
    R10 extends U,
    R11 extends U,
    R12 extends U,
    R13 extends U,
    R14 extends U,
    R15 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>,
      OkType<R8>,
      OkType<R9>,
      OkType<R10>,
      OkType<R11>,
      OkType<R12>,
      OkType<R13>,
      OkType<R14>,
      OkType<R15>
    ],
    ErrType<
      | R0
      | R1
      | R2
      | R3
      | R4
      | R5
      | R6
      | R7
      | R8
      | R9
      | R10
      | R11
      | R12
      | R13
      | R14
      | R15
    >
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U,
    R8 extends U,
    R9 extends U,
    R10 extends U,
    R11 extends U,
    R12 extends U,
    R13 extends U,
    R14 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>,
      OkType<R8>,
      OkType<R9>,
      OkType<R10>,
      OkType<R11>,
      OkType<R12>,
      OkType<R13>,
      OkType<R14>
    ],
    ErrType<
      | R0
      | R1
      | R2
      | R3
      | R4
      | R5
      | R6
      | R7
      | R8
      | R9
      | R10
      | R11
      | R12
      | R13
      | R14
    >
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U,
    R8 extends U,
    R9 extends U,
    R10 extends U,
    R11 extends U,
    R12 extends U,
    R13 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>,
      OkType<R8>,
      OkType<R9>,
      OkType<R10>,
      OkType<R11>,
      OkType<R12>,
      OkType<R13>
    ],
    ErrType<
      R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13
    >
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U,
    R8 extends U,
    R9 extends U,
    R10 extends U,
    R11 extends U,
    R12 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>,
      OkType<R8>,
      OkType<R9>,
      OkType<R10>,
      OkType<R11>
    ],
    ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U,
    R8 extends U,
    R9 extends U,
    R10 extends U,
    R11 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>,
      OkType<R8>,
      OkType<R9>,
      OkType<R10>,
      OkType<R11>
    ],
    ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U,
    R8 extends U,
    R9 extends U,
    R10 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>,
      OkType<R8>,
      OkType<R9>,
      OkType<R10>
    ],
    ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10>
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U,
    R8 extends U,
    R9 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>,
      OkType<R8>,
      OkType<R9>
    ],
    ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9>
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U,
    R8 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>,
      OkType<R8>
    ],
    ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U,
    R7 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6, R7]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>,
      OkType<R7>
    ],
    ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7>
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U,
    R6 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5, R6]
  ): Result<
    [
      OkType<R0>,
      OkType<R1>,
      OkType<R2>,
      OkType<R3>,
      OkType<R4>,
      OkType<R5>,
      OkType<R6>
    ],
    ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6>
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U,
    R5 extends U
  >(
    obj: [R0, R1, R2, R3, R4, R5]
  ): Result<
    [OkType<R0>, OkType<R1>, OkType<R2>, OkType<R3>, OkType<R4>, OkType<R5>],
    ErrType<R0 | R1 | R2 | R3 | R4 | R5>
  >;
  export function all<
    R0 extends U,
    R1 extends U,
    R2 extends U,
    R3 extends U,
    R4 extends U
  >(
    obj: [R0, R1, R2, R3, R4]
  ): Result<
    [OkType<R0>, OkType<R1>, OkType<R2>, OkType<R3>, OkType<R4>],
    ErrType<R0 | R1 | R2 | R3 | R4>
  >;
  export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U>(
    obj: [R0, R1, R2, R3]
  ): Result<
    [OkType<R0>, OkType<R1>, OkType<R2>, OkType<R3>],
    ErrType<R0 | R1 | R2 | R3>
  >;
  export function all<R0 extends U, R1 extends U, R2 extends U>(
    obj: [R0, R1, R2]
  ): Result<[OkType<R0>, OkType<R1>, OkType<R2>], ErrType<R0 | R1 | R2>>;
  export function all<R0 extends U, R1 extends U>(
    obj: [R0, R1]
  ): Result<[OkType<R0>, OkType<R1>], ErrType<R0 | R1>>;
  export function all<R0 extends U>(
    obj: [R0]
  ): Result<[OkType<R0>], ErrType<R0>>;
  export function all(obj: []): Result<[]>;
  export function all<T extends U[] | Record<string, U>>(
    obj: T
  ): Result<
    {[K in keyof T]: T[K] extends Result<infer I> ? I : never},
    {
      [K in keyof T]: T[K] extends Result<unknown, infer E> ? E : never;
    }[keyof T]
  >;
  export function all(obj: unknown): unknown {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result.ok(resArr);
    }

    const res: Record<string, unknown> = {};
    const keys = Object.keys(obj as Record<string, U>);
    for (const key of keys) {
      const item = (obj as Record<string, U>)[key];
      if (item.isErr) {
        return item;
      }
      res[key] = item.value;
    }
    return Result.ok(res);
  }
}

export type Result<T, E extends Error = Error> =
  | Result.Ok<T, E>
  | Result.Err<T, E>;

type OkType<R extends Result<unknown>> = R extends Result<infer O> ? O : never;
type ErrType<R extends Result<unknown>> = R extends Result<unknown, infer E>
  ? E
  : never;
