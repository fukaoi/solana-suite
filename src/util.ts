import {
  Connection, Keypair,
} from '@solana/web3.js';

import bs from 'bs58';
import {Constants} from './constants';

console.debug = (data: any, data2: any = '') => {
  if (process.env.NODE_ENV === 'development'
    || process.env.NODE_ENV === 'testnet') {
    console.log(`\u001b[35m${data}`, `\u001b[36m${data2}`);
  }
}

export namespace Util {
  let connection: Connection;

  export const isEmpty = (val: any): boolean => {
    if (val === null || val === undefined) return true;
    if (Array.isArray(val)) return val.length > 0 ? false : true;
    if (typeof val === 'number') return false;
    console.log(Object.values(val).length);
    if (!Object.values(val).length) return false;
    return !Object.keys(val).length;
  }

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

  export const createSigners = (signerSecrets: string[]): Keypair[] => signerSecrets.map(s => createKeypair(s));

  export const dateFormat = (): string => {
    const t = new Date();
    return t.getFullYear() + '-' +
      ('0' + (t.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (t.getDate())).slice(-2) + '/' +
      ('0' + t.getHours()).slice(-2) + ':' +
      ('0' + t.getMinutes()).slice(-2) + ':' +
      ('0' + t.getSeconds()).slice(-2);
  }
}
