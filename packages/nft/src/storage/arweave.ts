
import {Metaplex, keypairIdentity, bundlrStorage, BundlrStorageDriver, useMetaplexFile} from "@metaplex-foundation/js";
import {KeypairStr} from '@solana-suite/core';
import {Node} from '@solana-suite/shared';
import fs from 'fs';
import {Storage} from './';

// const connection = Node.getConnection();
// const wallet = new KeypairStr(
  // '3Uy2kBCKwThRKHDc8Wi3MakGHKMYjYH13HhP4tK3p4x7',
  // '2WSrU7dhmgoS2Gseb63VphpGDycVQGoKf76TBeYbQdrB9rMcqKuob32G9j8faKSaiFxU3hywjuvM1ZYCu9bvNQfq'
// ).toKeypair();

// const metaplex = Metaplex
  // .make(connection)
  // .use(keypairIdentity(wallet))
  // .use(bundlrStorage({
    // address: 'https://devnet.bundlr.network',
    // providerUrl: 'https://api.devnet.solana.com',
    // timeout: 60000,
  // }));



// const bundlr = metaplex.storage().driver() as BundlrStorageDriver;

// // bundlr.getBalance().then(console.log);

// const buffer = fs.readFileSync('./demo.jpg');
// const file = useMetaplexFile(buffer, 'demo.jpg');
// bundlr.upload(file).then(console.log).catch(console.log);


import {
  Keypair,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

export namespace StorageArweave {
  export const upload = async (
    payer: Keypair,
    storageData: Storage.Format
  // ): Promise<Result<string, Error>> => {
  ) => {
    // return Result.ok(`${Constants.ARWEAVE_GATEWAY_URL}/${manifest!.transactionId}`);
  }
}
