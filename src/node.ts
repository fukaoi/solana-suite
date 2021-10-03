import {Constants} from './constants';
import {
  Connection,
} from '@solana/web3.js';

export namespace Node {
  let connection: Connection;

  export const getConnection = () => {
    if (connection) return connection;
    connection = new Connection(Constants.API_URL);
    return connection;
  };

  export const getApiUrl = () => Constants.API_URL;
}
