import test from 'ava';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Converter } from '../src/';

test('test', async (t) => {
  console.log((Account.Keypair.create().pubkey as string).toPublicKey());
  t.pass();
});

test('To input convert', async (t) => {
  const creator1 = Account.Keypair.create();
  const creator2 = Account.Keypair.create();
  const creator3 = Account.Keypair.create();
  const creator4 = Account.Keypair.create();
  const input = [
    {
      address: creator1.pubkey,
      share: 20,
      verified: false,
    },
    {
      address: creator2.pubkey,
      share: 30,
      verified: false,
    },
    {
      address: creator3.pubkey,
      share: 40,
      verified: false,
    },
    {
      address: creator4.pubkey,
      share: 10,
      verified: false,
    },
  ];
  const results = Converter.Creators.intoInfra(input);
  t.log('# converted creators', results);
  if (results) {
    results.forEach((res, i) => {
      t.is(res.address.toString(), input[i].address);
      t.is(res.share, input[i].share);
    });
  } else {
    t.fail('`results` is null, empty');
  }
});

test('To un-define convert', async (t) => {
  const res = Converter.Creators.intoInfra([]);
  t.deepEqual(res, []);
});
