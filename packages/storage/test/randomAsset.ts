import {
  JsonMetadata,
  MetaplexFileContent,
} from '@metaplex-foundation/js';
import fs from 'fs';

export namespace RandomAsset {
  const ASSET_DIR = `${__dirname}/assets/`;

  const dateFormat = (): string => {
    const t = new Date();
    return (
      t.getFullYear() +
      '-' +
      ('0' + (t.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + t.getDate()).slice(-2) +
      '/' +
      ('0' + t.getHours()).slice(-2) +
      ':' +
      ('0' + t.getMinutes()).slice(-2) +
      ':' +
      ('0' + t.getSeconds()).slice(-2)
    );
  };

  const createCommonAsset = () => {
    const files = fs.readdirSync(ASSET_DIR);
    const index = Math.floor(Math.random() * files.length);
    const asset = files[index];
    const filePath = `${ASSET_DIR}${asset}`;
    const created = `created at ${dateFormat()}`;
    const name = asset.split(/.jpeg|.png|.jpg/i)[0].toUpperCase();
    const description = `This nft is ${name}:${created}`;
    const symbol = 'SUITE';
    return { name, description, filePath, symbol };
  };

  export type RandomAssetType = JsonMetadata & {
    filePath?: MetaplexFileContent;
  };

  export const get = (): RandomAssetType => {
    const storageData: RandomAssetType = {};
    const commonAsset = createCommonAsset();
    storageData.name = commonAsset.name;
    storageData.filePath = commonAsset.filePath;
    storageData.description = commonAsset.description;
    storageData.symbol = commonAsset.symbol;
    storageData.seller_fee_basis_points = 100;
    storageData.animation_url =
      'https://ipfs.infura.io/ipfs/QmPkRtkGn5ckAY5m6ejpWcDPmnAUJgphtJWFkyQP7LNAcx';
    storageData.external_url = 'https://example.org/top';
    storageData.category = 'image';
    storageData.attributes = [
      {
        limits: 'transfer',
        value: '7',
      },
      {
        limits: 'use_limit',
        value: '3',
      },
    ];
    storageData.collection = { name: 'Pets in Japan', family: 'PETS WORLD' };
    storageData.properties = {
      creators: [
        {
          address: '24W8B8DyYiieQH49eb7Xo2EQt3Qh3Xvu6yMq8mYywtML',
          share: 45,
        },
      ],
    };

    storageData.creators = [
      {
        address: '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U',
        share: 100,
      },
    ];
    return storageData;
  };
}
