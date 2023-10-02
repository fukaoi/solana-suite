import fs from 'node:fs';

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

  export const get = () => {
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
}
