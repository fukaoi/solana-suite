import {describe, it} from 'mocha';
import  '../src/global';
import {assert} from 'chai';


describe('Global', () => {
  it('Convert string to PublicKey', async () => {
    const str = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
    const res = str.toPubKey();
    assert.equal(res.constructor.name, 'PublicKey');
  });
})
