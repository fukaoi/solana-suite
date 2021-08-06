import {
  Connection, Keypair,
} from '@solana/web3.js';

import bs from 'bs58';

import {Constants} from './constants';

console.debug = (data: any, data2: any = '') =>
  process.env.NODE_ENV === 'debug' &&
  console.log(`\u001b[35m${data}`, `\u001b[36m${data2}`);

export namespace Util {
  let connection: Connection;

  export const sleep = async (sec: number) => new Promise(r => setTimeout(r, sec * 1000));

  export const getConnection = () => {
    if (connection) return connection;
    connection = new Connection(Constants.API_URL);
    return connection;
  };

  export const getApiUrl = () => Constants.API_URL;

  export const createKeypair = (secret: string): Keypair => {
    const decoded = bs.decode(secret);
    return Keypair.fromSecretKey(decoded);
  }
}
