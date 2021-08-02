import {describe, it} from 'mocha';
import {expect, assert} from 'chai'
import setupKeyPair, {TestUtils} from './setupKeyPair';
import fs from 'fs';

describe('TestUtils', () => {
  it('setupKeyPair', async () => {
    const res = await setupKeyPair();
    console.log(res);
    // expect(res.length).to.equal(15);
  });
})
