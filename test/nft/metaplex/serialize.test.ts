import {describe, it} from 'mocha';
import {expect} from 'chai'
import {MetaplexSerialize} from '../../../src/nft/metaplex/serialize';


const base64Data = 'BBz/op6YwDJGbas9BKU2EA/YHc2vEGUxUDnDAM5qaD+f+GnBCiAPzZjWCoucrKaXX6I4+Oyah/uYnvag/MHFyk8gAAAAa2F3YW1vbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAS1dNAAAAAAAAAMgAAABodHRwczovL2ZnYmhrdW01czdpd2M3b2J2ZXBubGRmY2V2emxkY3BqZ3lkN3N6NXlwbnQ2a2hsdGI2b3EuYXJ3ZWF2ZS5uZXQvS1lKMVVaMlgwV0Y5d2FrZTFZeWlKWEt4aWVrMkJfbG51SHRuNVIxekQ1MC8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGQAAAABAf4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';

describe('MetaplexSerialize', () => {
  it('Decode at base64 serialized data', () => {
    const orgData = {
      ownerPubKey: '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
      mintKey: 'Hihe2pbN1zbz68szcCUgNTMBC8Cnn94PpFUgt7ZxPNBx',
      name: 'kawamon',
      symbol: 'KWM',
      uri: 'https://fgbhkum5s7iwc7obvepnldfcevzldcpjgyd7sz5ypnt6khltb6oq.arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50/',
      fee: 100
    }

    const bufferData = Buffer.from(base64Data);
    const res = MetaplexSerialize.decode(bufferData);

    console.log('# decode metadata: ', res);

    expect(res.name).to.equal(orgData.name);
    expect(res.symbol).to.equal(orgData.symbol);
    expect(res.uri).to.equal(orgData.uri);
    expect(res.mintKey).to.equal(orgData.mintKey);
    expect(res.ownerPubKey).to.equal(orgData.ownerPubKey);
    expect(res.fee).to.equal(orgData.fee);
  });
})
