import {describe, it} from 'mocha';
import {expect} from 'chai'
import {Metaplex} from '../../../src/nft/metaplex/index';
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';

let source: Wallet.Keypair;
let dest: Wallet.Keypair;

describe('Metaplex', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer nft', async() => {
    // const tokenKey = 'FH9UGNWGQMVhSpprQ9fcP4U8onMuJYhzbunj9DNBFZDu';
    const tokenKey = '2oNxuvU24GUu37Y2Q1yLdGVTpZ7n3HkKWdKZVMskXrC8';
    const res = await Metaplex.transfer(
      tokenKey,
      source.secret,
      dest.pubkey
    );
    console.log(res);
  });
})
