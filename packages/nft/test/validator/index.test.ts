import { describe, it } from "mocha";
import { assert } from "chai";
import { Validator } from "../../src";

describe("Validator", () => {
  it("isRoyalty", async () => {
    const res = Validator.isRoyalty(30);
    assert.isOk(res.isOk);
    const res2 = Validator.isRoyalty(-1);
    assert.isOk(res2.isErr);
    assert.equal(
      res2.isErr && res2.error.message,
      Validator.Message.SMALL_NUMBER
    );
    const res3 = Validator.isRoyalty(200);
    assert.equal(
      res3.isErr && res3.error.message,
      Validator.Message.BIG_NUMBER
    );
  });

  it("isName", async () => {
    const res = Validator.isName("name");
    assert.isOk(res.isOk);
    const res2 = Validator.isName("long-long-name");
    assert.isOk(res2.isErr);
    assert.equal(
      res2.isErr && res2.error.message,
      Validator.Message.LONG_LENGTH
    );
    const res3 = Validator.isName("");
    assert.equal(res3.isErr && res3.error.message, Validator.Message.EMPTY);
  });

  it("isSymbol", async () => {
    const res = Validator.isSymbol("SYMBOL");
    assert.isOk(res.isOk);
    const res2 = Validator.isSymbol("LONG-LONG-SYMBOL");
    console.log(res2);
    assert.isOk(res2.isErr);
    assert.equal(
      res2.isErr && res2.error.message,
      Validator.Message.LONG_LENGTH
    );
    const res3 = Validator.isName("");
    assert.equal(res3.isErr && res3.error.message, Validator.Message.EMPTY);
  });

  it("[Error]checkAll", async () => {
    const data = {
      name: "long-name-long-name",
      seller_fee_basis_points: 150,
    };
    const res = Validator.checkAll(data);
    console.log(res);
    assert.isTrue(res.isErr);
  });

  it("[Success]checkAll", async () => {
    const data = {
      name: "name",
      seller_fee_basis_points: 50,
    };
    const res = Validator.checkAll(data);
    console.log(res);
    assert.isTrue(res.isOk);
  });
});
