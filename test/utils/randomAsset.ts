import fs from 'fs';
import {Util} from '../../src/util';

export namespace RandomAsset {
  const ASSET_DIR = './test/assets/';
  export const get = () => {
    const files = fs.readdirSync(ASSET_DIR);
    const index = Math.floor(Math.random() * files.length)
    const asset = files[index];
    const imagePath = `${ASSET_DIR}${asset}`;
    const created = `created at ${Util.dateFormat()}`;
    const name = `${asset.split(/.jpeg/)[0]}:${Util.dateFormat()}`;
    const description = `This nft is ${name}:${created}`;
    return {name, description, imagePath}; 
  }
}
