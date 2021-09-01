import {describe, it} from 'mocha';
import {Memo} from '../../../src/memo';
import {assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {Transaction} from '../../../src/transaction';
import {MetaplexMint} from '../../../src/nft/metaplex/mint';
import {Util} from '../../../src/util';

let source: Wallet.Keypair;

describe('MetaplexMint', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Create metaplex nft', async () => {
    const getTx = await MetaplexMint.create(source.pubkey, [source.secret]);
    const tx = await getTx();
    const res = await Transaction.sendInstructions([Util.createKeypair(source.secret)], tx);
    console.log(`# tx signature: ${res}`);
  });
})
