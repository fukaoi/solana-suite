import { describe, it } from 'mocha';
import { assert } from 'chai';
import { SplToken } from '../../src/';
const owner = 'Hc3FoHMo3Von8by8oKxx9nqTWkjQuGxM1sgyDQCLEMA9';
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';
const tokenAccount = 'GxGHgYQ9Ko3cjQu3zVmu93QcSY1puH3CkDTGzdrHK2VW';

describe('SplToken', () => {
  it('Not found token', async () => {
    const res = await SplToken.findByOwner(notFoundTokenOwner.toPublicKey());

    assert.isTrue(res.isOk, `${res.unwrap()}`);

    res.unwrap().forEach((r) => {
      assert.isEmpty(r.mint);
      assert.isEmpty(r.amount);
      assert.isEmpty(r.owner);
      assert.isEmpty(r.tokenAccount);
    });
  });

  it('Get token info owned', async () => {
    const res = await SplToken.findByOwner(owner.toPublicKey());

    console.log(res);
    assert.isTrue(res.isOk, `${res.unwrap()}`);

    res.unwrap().forEach((r) => {
      assert.isNotEmpty(r.mint);
      assert.isString(r.mint);
      assert.isString(r.owner);
      assert.isString(r.tokenAccount);
    });
  });

  it('Find by token account', async () => {
    const res = await SplToken.findByOwner(tokenAccount.toPublicKey());
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    assert.isEmpty(res.unwrap());
  });
});
