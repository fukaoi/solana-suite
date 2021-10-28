import {assert} from 'chai';
import {Append, Wallet} from '../src/';
import {Setup} from './utils/setup';

let source: Wallet.KeypairStr;

describe('Append', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Is in multiSig', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
  });
})
