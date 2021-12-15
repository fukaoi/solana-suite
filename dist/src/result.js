"use strict";
// fork: https://github.com/badrap/result
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const instruction_1 = require("./instruction");
class AbstractResult {
    // unified-signatures. into line 10
    // unwrap<U>(ok: (value: T) => U, err: (error: E) => U): U;
    unwrap(ok, err) {
        const r = this._chain(value => Result.ok(ok ? ok(value) : value), error => (err ? Result.ok(err(error)) : Result.err(error)));
        if (r.isErr) {
            throw r.error;
        }
        return r.value;
    }
    map(ok, err) {
        return this._chain(value => Result.ok(ok(value)), error => Result.err(err ? err(error) : error));
    }
    chain(ok, err) {
        return this._chain(ok, err || (error => Result.err(error)));
    }
    match(ok, err) {
        this._chain(value => Result.ok(ok(value)), error => Result.err(err(error)));
    }
    /// submit (alias Instruction.submit) ////
    async submit() {
        try {
            const instruction = this.unwrap();
            if (instruction instanceof instruction_1.Instruction) {
                return await instruction.submit();
            }
            return Result.err(Error('Only Instruction object'));
        }
        catch (err) {
            return Result.err(err);
        }
    }
}
class InternalOk extends AbstractResult {
    value;
    isOk = true;
    isErr = false;
    constructor(value) {
        super();
        this.value = value;
    }
    _chain(ok, _err) {
        return ok(this.value);
    }
}
class InternalErr extends AbstractResult {
    error;
    isOk = false;
    isErr = true;
    constructor(error) {
        super();
        this.error = error;
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