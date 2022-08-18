import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Validator } from '../../src';

describe('Validator', () => {
  it('[Success]isRoyalty', async () => {
    const res = Validator.isRoyalty(30);
    assert.isOk(res.isOk);
  });

  it('[Error]isRoyalty: too small number', async () => {
    const res = Validator.isRoyalty(-1);
    assert.isOk(res.isErr);
    assert.equal(
      res.isErr && res.error.message,
      Validator.Message.SMALL_NUMBER
    );
  });

  it('[Error]isRoyalty: too big number', async () => {
    const res = Validator.isRoyalty(200);
    assert.equal(res.isErr && res.error.message, Validator.Message.BIG_NUMBER);
  });

  it('[Error]isRoyalty: empty value', async () => {
    const res = Validator.isRoyalty(parseInt(''));
    assert.equal(res.isErr && res.error.message, Validator.Message.EMPTY);
  });

  it('[Success]isName', async () => {
    const res = Validator.isName('name');
    assert.isOk(res.isOk);
  });

  it('[Error]isName: too long length', async () => {
    const res = Validator.isName('long-long-name');
    assert.isOk(res.isErr);
    assert.equal(res.isErr && res.error.message, Validator.Message.LONG_LENGTH);
  });

  it('[Error]isName: empty value', async () => {
    const res = Validator.isName('');
    assert.equal(res.isErr && res.error.message, Validator.Message.EMPTY);
  });

  it('[Success]isSymbol', async () => {
    const res = Validator.isSymbol('SYMBOL');
    assert.isOk(res.isOk);
  });

  it('[Error]isSymbol: too long length', async () => {
    const res = Validator.isSymbol('LONG-LONG-SYMBOL');
    assert.isOk(res.isErr);
    assert.equal(res.isErr && res.error.message, Validator.Message.LONG_LENGTH);
  });

  it('[Error]isSymbol: empty value', async () => {
    const res3 = Validator.isName('');
    assert.equal(res3.isErr && res3.error.message, Validator.Message.EMPTY);
  });

  it('[Success]isImageUrl', async () => {
    const res = Validator.isImageUrl(
      'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50'
    );
    assert.isOk(res.isOk);
  });

  it('[Error]isImageUrl: empty value', async () => {
    const res = Validator.isImageUrl('');
    assert.isOk(res.isErr);
  });

  it('[Error]isImageUrl: invalid value', async () => {
    const res = Validator.isImageUrl('invalid url');
    assert.isOk(res.isErr);
  });

  it('[Success]checkAll', async () => {
    const data = {
      name: 'name',
      seller_fee_basis_points: 50,
      symbol: 'SYMBOL',
      image: 'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50',
    };
    const res = Validator.checkAll(data);
    console.log(res);
    assert.isTrue(res.isOk);
  });

  it('[Error]checkAll', async () => {
    const data = {
      name: 'long-name-long-name',
      seller_fee_basis_points: 150,
      symbol: 'LONG-SYMBOL-LONG-SYMBOL',
      image: 'url',
    };
    const res = Validator.checkAll(data);
    console.log(res);
    assert.isTrue(res.isErr);
  });
});
