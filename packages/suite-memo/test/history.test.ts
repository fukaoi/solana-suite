import test from 'ava';
import { Memo } from '../src/';
import { History } from '~/types/history';
import { OnErr, OnOk } from '~/types/shared';

const target = 'Ebq72X3i8ug6AX2G3v2ZoLA4ZcxHurvMuJYorqJ6sALD';

test('Get Only memo history', async (t) => {
  const onOk: OnOk<History> = (ok) => {
    console.log('# hisory size: ', ok.length);
    ok.forEach((res) => {
      t.not(res.source, '');
      t.not(res.destination, '');
      t.not(res.tokenAmount, '');
      t.not(res.signers, '');
      t.not(res.multisigAuthority, '');
      t.not(res.dateTime, '');
    });
  };

  const onErr: OnErr = (err: Error) => t.fail(err.message);
  await Memo.getHistory(target, onOk, onErr);
  t.pass();
});
