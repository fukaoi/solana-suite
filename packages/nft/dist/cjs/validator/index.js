"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const shared_1 = require("@solana-suite/shared");
var Validator;
(function (Validator) {
    let Message;
    (function (Message) {
        Message.SUCCESS = "success";
        Message.SMALL_NUMBER = "too small, 0 or higher";
        Message.BIG_NUMBER = "too big, max 100";
        Message.LONG_LENGTH = "too long, max 10";
        Message.EMPTY = "invalid empty value";
    })(Message = Validator.Message || (Validator.Message = {}));
    Validator.isRoyalty = (actual) => {
        if (actual < 0) {
            return shared_1.Result.err(Error(Message.SMALL_NUMBER));
        }
        else if (actual > 100) {
            return shared_1.Result.err(Error(Message.BIG_NUMBER));
        }
        return shared_1.Result.ok(Message.SUCCESS);
    };
    Validator.isName = (actual) => {
        if (actual.length <= 0) {
            return shared_1.Result.err(Error(Message.EMPTY));
        }
        else if (actual.length > 10) {
            return shared_1.Result.err(Error(Message.LONG_LENGTH));
        }
        return shared_1.Result.ok(Message.SUCCESS);
    };
    Validator.isSymbol = (actual) => {
        // export const isSymbol = (actual: string): Result<string, Error> => {
        if (actual.length <= 0) {
            return shared_1.Result.err(Error(Message.EMPTY));
        }
        else if (actual.length > 8) {
            return shared_1.Result.err(Error(Message.LONG_LENGTH));
        }
        return shared_1.Result.ok(Message.SUCCESS);
    };
    Validator.checkAll = (metadata) => {
        const keys = Object.keys(metadata);
        let results = [];
        keys.map((key) => {
            switch (key) {
                case "name":
                    if (metadata.name) {
                        const res = Validator.isName(metadata.name);
                        if (res.isErr) {
                            results.push({ key, error: res.error.message });
                        }
                    }
                    break;
                case "seller_fee_basis_points":
                    if (metadata.seller_fee_basis_points) {
                        const res2 = Validator.isRoyalty(metadata.seller_fee_basis_points);
                        if (res2.isErr) {
                            results.push({ key, error: res2.error.message });
                        }
                    }
                    break;
            }
        });
        if (results.length > 0) {
            return shared_1.Result.err(results);
        }
        return shared_1.Result.ok(Message.SUCCESS);
    };
})(Validator = exports.Validator || (exports.Validator = {}));
