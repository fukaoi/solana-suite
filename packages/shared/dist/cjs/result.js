"use strict";
// forked: https://github.com/badrap/result, thank you advice  @jviide
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class AbstractResult {
    // unified-signatures. into line 10
    // unwrap<U>(ok: (value: T) => U, err: (error: E) => U): U;
    unwrap(ok, err) {
        const r = this._chain((value) => Result.ok(ok ? ok(value) : value), (error) => (err ? Result.ok(err(error)) : Result.err(error)));
        if (r.isErr) {
            throw r.error;
        }
        return r.value;
    }
    map(ok, err) {
        return this._chain((value) => Result.ok(ok(value)), (error) => Result.err(err ? err(error) : error));
    }
    chain(ok, err) {
        return this._chain(ok, err || ((error) => Result.err(error)));
    }
    match(ok, err) {
        this._chain((value) => Result.ok(ok(value)), (error) => Result.err(err(error)));
    }
    /// submit (alias Instruction.submit) ////
    submit(feePayer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instruction = this.unwrap();
                const castedInst = instruction;
                // why return false?
                // if (instruction instanceof Instruction) {
                if (castedInst.instructions && castedInst.signers) {
                    return yield castedInst.submit(feePayer);
                }
                return Result.err(Error('Only Instruction object'));
            }
            catch (err) {
                return Result.err(err);
            }
        });
    }
}
class InternalOk extends AbstractResult {
    constructor(value) {
        super();
        this.value = value;
        this.isOk = true;
        this.isErr = false;
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */
    _chain(ok, _err) {
        return ok(this.value);
    }
}
class InternalErr extends AbstractResult {
    constructor(error) {
        super();
        this.error = error;
        this.isOk = false;
        this.isErr = true;
    }
    _chain(_ok, err) {
        return err(this.error);
    }
}
var Result;
(function (Result) {
    function ok(value) {
        return new InternalOk(value);
    }
    Result.ok = ok;
    function err(error) {
        return new InternalErr(error || Error());
    }
    Result.err = err;
    function all(obj) {
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
        const res = {};
        const keys = Object.keys(obj);
        for (const key of keys) {
            const item = obj[key];
            if (item.isErr) {
                return item;
            }
            res[key] = item.value;
        }
        return Result.ok(res);
    }
    Result.all = all;
})(Result = exports.Result || (exports.Result = {}));
//# sourceMappingURL=result.js.map