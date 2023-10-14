import test from 'ava';
import { Setup } from 'test-tools/setup';
import { SplToken } from '../src/';
import { Pubkey } from '~/types/account';
import { History } from '~/types/history';
import { OnErr, OnOk } from '~/types/shared';
import { FilterType } from '~/types/transaction-filter';

let target: Pubkey;
test.before(async () => {
  const obj = await Setup.generateKeyPair();
  target = obj.source.pubkey;
});

test.skip('Get mint history', async (t) => {
  const onOk: OnOk<History> = async (ok) => {
    console.log('# hisory size: ', ok.length); // t.log is buffering
    ok.forEach((res) => {
      t.not(res.source, '');
      t.not(res.destination, '');
      t.not(res.tokenAmount, '');
      t.not(res.signers, '');
      t.not(res.multisigAuthority, '');
      t.not(res.dateTime, null);
    });
  };

  const onErr: OnErr = (err: Error) => t.fail(err.message);
  await SplToken.getHistory(target, FilterType.Mint, onOk, onErr, {
    waitTime: 0,
  });
});
