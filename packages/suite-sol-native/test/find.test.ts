import test from 'ava';
import { SolNative } from '../src';

const owner = '6bo6UqEZ2D7C4oMpycxBzY5eLeHdmUkCrFXozhqUd4sp';
const tokenAccount = '2QSBPixtfHP2JGYfwGaxeLYji9F4NfemCvCJCXe5kMdt';
const notFoundOwner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu';

test('find owner info', async (t) => {
  const res = await SolNative.findByOwner(owner);

  t.log('SolNative.findByOwner: ', res);

  if (res.isErr) {
    t.fail(res.error.message);
  }

  if (res.isOk) {
    const info = res.value;
    t.is(typeof info.sol, 'number');
    t.is(typeof info.lamports, 'number');
    t.is(typeof info.owner, 'string');
  }
});

test('find token account info', async (t) => {
  const res = await SolNative.findByOwner(tokenAccount);

  t.log('SolNative.findByOwner: ', res);
  if (res.isErr) {
    t.fail(res.error.message);
  }

  if (res.isOk) {
    const info = res.value;
    t.is(typeof info.sol, 'number');
    t.is(typeof info.lamports, 'number');
    t.is(typeof info.owner, 'string');
  }
});

test('not found asset owner', async (t) => {
  const res = await SolNative.findByOwner(notFoundOwner);

  t.log('SolNative.findByOwner: ', res);

  if (res.isErr) {
    t.fail(res.error.message);
  }

  if (res.isOk) {
    const info = res.value;
    t.is(typeof info.sol, 'number');
    t.is(typeof info.lamports, 'number');
    t.is(typeof info.owner, 'string');
  }
});
