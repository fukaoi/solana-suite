import {describe, it} from 'mocha';
import {assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {Transaction} from '../../../src/transaction';
import {MetaplexDeploy} from '../../../src/nft/metaplex/deploy';
import {MetaplexObject} from '../../../src/nft/metaplex/object';
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';
import {Util} from '../../../src/util';

let source: Wallet.Keypair;

describe('MetaplexDeploy', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Deploy metaplex nft', async () => {
    const data = new MetaplexObject.Data({
      name: 'Cat',
      symbol: 'CAT',
      uri: 'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50',
      sellerFeeBasisPoints: 100,
      creators: null
    });
    const txsign = await MetaplexDeploy.create(data, source.pubkey, [source.secret])();
    console.log('# mintKey: ', txsign.mintKey);
    const res = await Transaction.sendInstructions(txsign.signers, txsign.instructions);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);

    await Util.getConnection().confirmTransaction(res, 'max');

    // const updateAuthority = await Wallet.create();
    const updateTx = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      txsign.mintKey,
      source.pubkey,
      source.pubkey,
      source.secret,
    );
    const updateRes = await Transaction.sendInstructions(
      [Util.createKeypair(source.secret)],
      updateTx
    );
    console.log(updateRes);

  });
})
