import { describe, expect, it } from '@jest/globals';
import { SolNative } from '../../src';

const owner = '6bo6UqEZ2D7C4oMpycxBzY5eLeHdmUkCrFXozhqUd4sp';
const tokenAccount = '2QSBPixtfHP2JGYfwGaxeLYji9F4NfemCvCJCXe5kMdt';
const notFoundOwner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu';

describe('SolNative', () => {
  it('find owner info', async () => {
    const res = await SolNative.findByOwner(owner);

    console.log('SolNative.findByOwner: ', res);

    if (res.isErr) {
      expect(res.error.message).toBeTruthy();
    }

    if (res.isOk) {
      const info = res.value;
      expect(typeof info.sol).toBe('number');
      expect(typeof info.lamports).toBe('number');
      expect(typeof info.owner).toBe('string');
    }
  });

  it('find token account info', async () => {
    const res = await SolNative.findByOwner(tokenAccount);

    console.log('SolNative.findByOwner: ', res);

    if (res.isErr) {
      expect(res.error.message).toBeTruthy();
    }

    if (res.isOk) {
      const info = res.value;
      expect(typeof info.sol).toBe('number');
      expect(typeof info.lamports).toBe('number');
      expect(typeof info.owner).toBe('string');
    }
  });

  it('not found asset owner', async () => {
    const res = await SolNative.findByOwner(notFoundOwner);

    console.log('SolNative.findByOwner: ', res);

    if (res.isErr) {
      expect(res.error.message).toBeTruthy();
    }

    if (res.isOk) {
      const info = res.value;
      expect(typeof info.sol).toBe('number');
      expect(typeof info.lamports).toBe('number');
      expect(typeof info.owner).toBe('string');
    }
  });
});
