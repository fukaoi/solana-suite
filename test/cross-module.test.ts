import {describe, it} from 'mocha';
import {assert} from 'chai';
import {CrossModule} from '../src';

describe('CrossModule', () => {
  it('fetch json file', async () => {
    const res = await CrossModule.fetchJson('../tsconfig.json');
    console.log(res);
  });
})
