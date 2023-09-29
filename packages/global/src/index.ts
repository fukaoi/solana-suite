import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Node } from 'node';
import { Constants, debugLog } from 'shared';
import { KeypairAccount } from 'account';
import { BigNumber } from 'bignumber.js';
import { Explorer } from 'types/global';
import bs from 'bs58';

/**
 * Create explorer url for account address or signature
 *
 * @see {@link types/global.ts}
 * @returns string
 */
String.prototype.toExplorerUrl = function (
  explorer: Explorer = Explorer.Solscan,
) {
  const endPointUrl = Node.getConnection().rpcEndpoint;
  debugLog('# toExplorerUrl rpcEndpoint:', endPointUrl);
  let cluster = '';
  if (endPointUrl === Constants.EndPointUrl.prd) {
    cluster = Constants.Cluster.prd;
  } else if (endPointUrl === Constants.EndPointUrl.test) {
    cluster = Constants.Cluster.test;
  } else if (endPointUrl === Constants.EndPointUrl.dev) {
    cluster = Constants.Cluster.dev;
  } else {
    cluster = Constants.Cluster.dev;
  }

  const addressOrSignature: string = this.toString();
  let url = '';
  if (KeypairAccount.isPubkey(addressOrSignature)) {
    // address
    if (explorer === Explorer.SolanaFM) {
      url = `https://solana.fm/address/${addressOrSignature}?cluster=${cluster}`;
    } else {
      url = `https://solscan.io/account/${addressOrSignature}?cluster=${cluster}`;
    }
    // signature
  } else {
    // for Invalid type "never" of addressOrSignature, so `as string`
    if (explorer === Explorer.SolanaFM) {
      url = `https://solana.fm/tx/${
        addressOrSignature as string
      }?cluster=${cluster}`;
    } else {
      url = `https://solscan.io/tx/${
        addressOrSignature as string
      }?cluster=${cluster}`;
    }
  }
  return url;
};

/**
 * PubKey(@solana-suite) to PublicKey(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns PublicKey
 */
String.prototype.toPublicKey = function () {
  if (!KeypairAccount.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new PublicKey(this);
};

/**
 * Secret(@solana-suite) to Keypair(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns Keypair
 */
String.prototype.toKeypair = function () {
  if (!KeypairAccount.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
};

/**
 * LAMPORTS to SOL
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toSol = function () {
  return BigNumber(this as number)
    .div(LAMPORTS_PER_SOL)
    .toNumber();
};

/**
 * SOL to LAMPORTS
 *
 * @see {@link types/global.ts}
 * @returns number
 */
Number.prototype.toLamports = function () {
  return BigNumber(this as number)
    .times(LAMPORTS_PER_SOL)
    .toNumber();
};
