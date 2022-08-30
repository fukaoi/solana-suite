import { describe, it } from 'mocha';
import { SolNative } from '../../src';
import { assert } from 'chai';

const owner = '6bo6UqEZ2D7C4oMpycxBzY5eLeHdmUkCrFXozhqUd4sp';
const tokenAccount = '2QSBPixtfHP2JGYfwGaxeLYji9F4NfemCvCJCXe5kMdt';
const notFoundOwner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu';

describe('SolNative', () => {
  it('find owner info', async () => {
    const res = await SolNative.findByOwner(owner.toPublicKey());

    console.log('SolNative.findByOwner: ', res);

    if (res.isErr) {
      assert(res.error.message);
    }

    if (res.isOk) {
      const info = res.value;
      assert.isNumber(info.sol);
      assert.isNumber(info.lamports);
      assert.isString(info.owner);
    }
  });

  it('find token account info', async () => {
    const res = await SolNative.findByOwner(tokenAccount.toPublicKey());

    console.log('SolNative.findByOwner: ', res);

    if (res.isErr) {
      assert(res.error.message);
    }

    if (res.isOk) {
      const info = res.value;
      assert.isNumber(info.sol);
      assert.isNumber(info.lamports);
      assert.isString(info.owner);
    }
  });

  it('not found asset owner', async () => {
    const res = await SolNative.findByOwner(notFoundOwner.toPublicKey());

    console.log('SolNative.findByOwner: ', res);

    if (res.isErr) {
      assert(res.error.message);
    }

    if (res.isOk) {
      const info = res.value;
      assert.isNumber(info.sol);
      assert.isNumber(info.lamports);
      assert.isString(info.owner);
    }
  });
});
