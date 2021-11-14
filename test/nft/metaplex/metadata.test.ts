import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Account} from '../../../src';
import {MetaplexMetaData, MetaplexInstructure, Metaplex} from '../../../src/nft/metaplex';
import {Setup} from '../../../test/utils/setup';
import {TransactionInstruction} from '@solana/web3.js';

let source: Account.KeypairStr;

describe('MetaplexMetaData', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Create instructions for create metadata', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const tokenKey = 'ZSMBYfbdn9eFJxs91p61nMbdZ7JALuXvUukqZu18skM'.toPubKey();
    const sourceStr = source.pubkey.toPubKey();

    const res = await MetaplexMetaData.create(
      data,
      tokenKey,
      sourceStr,
      sourceStr,
      sourceStr,
    )();
    assert.isTrue(res.isOk);
    assert.isArray(res.unwrap());
    assert.isObject((<TransactionInstruction[]>res.unwrap())[0]);
  });

  it('Create instructions for update metadata', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const tokenKey = 'ZSMBYfbdn9eFJxs91p61nMbdZ7JALuXvUukqZu18skM'.toPubKey();

    const res = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      tokenKey,
      source.pubkey.toPubKey(),
      [source.secret.toKeypair()],
    )();
    assert.isTrue(res.isOk);
    assert.isArray(res.unwrap());
    assert.isObject((<TransactionInstruction[]>res.unwrap())[0]);
  });

  it('Get metadata by tokenKey', async () => {
    const orgData = {
      updateAuthority: '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
      name: 'Gropu1',
      symbol: '',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 0
    };

    const res = await MetaplexMetaData.getByTokenKey(
      'Hn1DMeFF9baMuGVaC5dWhKC2jaPEQnB4pdY9iqz6G4zf'.toPubKey()
    );

    assert.isTrue(res.isOk);
    const format = <Metaplex.Format>res.unwrap();
    assert.equal(format.name, orgData.name);
    assert.equal(format.symbol, orgData.symbol)
    assert.equal(format.uri, orgData.uri)
    assert.equal(format.update_authority, orgData.updateAuthority)
    assert.equal(format.seller_fee_basis_points, orgData.sellerFeeBasisPoints)
  });

  it('Get metadata of nft by owner', async () => {
    const res = await MetaplexMetaData.getByOwner(
      '78DybLoke46TR6RW1HWZBMYt7qouGggQJjLATsfL7RwA'.toPubKey()
    );
    assert.isTrue(res.isOk);
    console.log(res);
  });
})
