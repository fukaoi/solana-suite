import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Validator} from '../../src';


describe('Validator', () => {
  it('isRoyalty', async () => {
    const res = Validator.isRoyalty(30);
    assert.isOk(res.isOk);
    const res2 = Validator.isRoyalty(-1);
    assert.isOk(res2.isErr)
    assert.equal(res2.isErr && res2.error.message, 'too small');
    const res3 = Validator.isRoyalty(200);
    assert.equal(res3.isErr && res3.error.message, 'too big');
  });

  it('isName', async () => {
    const res = Validator.isRoyalty(30);
    assert.isOk(res.isOk);
    const res2 = Validator.isRoyalty(-1);
    assert.isOk(res2.isErr)
    assert.equal(res2.isErr && res2.error.message, 'too small');
    const res3 = Validator.isRoyalty(200);
    assert.equal(res3.isErr && res3.error.message, 'too big');
  });
});
