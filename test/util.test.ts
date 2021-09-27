import {describe, it} from 'mocha';
import {assert} from 'chai';
// import {Util} from '../src/util'; 
import '../src/util';

describe('Util', () => {
  it('console.debug', () => {
    console.debug('call console.debug');
  });

  it('Change type', () => {
    "Change".toPubKey();
  });
})
