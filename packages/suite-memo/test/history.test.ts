import test from 'ava';
import { Memo } from '../src/';
import { History } from '~/types/history';
import { OnErr, OnOk } from '~/types/shared';

test('Get Only memo history', async (t) => {
  const onOk: OnOk<History> = (ok) => {
    console.log('# hisory size: ', ok.length); // t.log is buffering
    ok.forEach((res) => {
      t.not(res.source, '');
      t.not(res.destination, '');
      t.not(res.tokenAmount, '');
      t.not(res.signers, '');
      t.not(res.multisigAuthority, '');
      t.not(res.dateTime, '');
    });
  };

  const onErr: OnErr = (err: Error) => t.fail(JSON.stringify(err, ['stack']));
  await Memo.getHistory(
    'Ebq72X3i8ug6AX2G3v2ZoLA4ZcxHurvMuJYorqJ6sALD',
    onOk,
    onErr,
    { narrowDown: 10 },
  );
});
