import { describe, it } from 'mocha';
import { Properties } from '../src/properties';
import { assert } from 'chai';

describe('Properties', () => {
  it('To input convert', () => {
    const expected = [
      {
        files: {
          type: 'image/jpeg',
          uri: 'https://ipfs.org/demo.jpg',
        },
      },
      {
        files: {
          type: 'image/gif',
          uri: 'https://arweave.com/demo.gif',
        },
      },
    ];

    const res = Properties.toInputConvert();
    assert.deepEqual(expected, res);
  });
});
