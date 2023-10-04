import { SolNative } from '../src';
import test from 'ava';
import { Setup } from 'test-tools/setup';
import { Pubkey } from '~/types/account';
import { FilterType } from '~/types/transaction-filter';
import { History } from '~/types/history';

let target: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  target = obj.source.pubkey;
});

test('Get transfer history', (t) => {
  const onErr = (err: Error) => {
    t.fail(err.message);
  };
  const onOk = (datas: History[]) => {
    t.log('# hisory size: ', datas.length);
    datas.forEach((res) => {
      t.not(res.source, '');
      t.not(res.destination, '');
      t.not(res.tokenAmount, '');
      t.not(res.signers, '');
      t.not(res.multisigAuthority, '');
      t.not(res.dateTime, null);
    });
  };

  SolNative.getHistory(target, FilterType.Transfer, onOk, onErr, {
    waitTime: 0,
  });
  t.pass();
});

test('Get Memo history', async (t) => {
  const onErr = (err: Error) => {
    t.fail(err.message);
  };
  const onOk = (datas: History[]) => {
    t.log('# hisory size: ', datas.length);
    datas.forEach((res) => {
      t.not(res.source, '');
      t.not(res.destination, '');
      t.not(res.tokenAmount, '');
      t.not(res.signers, '');
      t.not(res.multisigAuthority, '');
      t.not(res.dateTime, null);
    });
  };
  await SolNative.getHistory(target, FilterType.Memo, onOk, onErr);
  t.pass();
});

test('[Error]Get Mint history', async (t) => {
  await SolNative.getHistory(
    target,
    FilterType.Mint,
    (ok: History[]) => t.fail(`Dont go through here: ${ok}`),
    (err: Error) => t.pass(err.message),
  );
});
