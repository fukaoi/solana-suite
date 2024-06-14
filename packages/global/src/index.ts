import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Config, Constants, debugLog } from '~/suite-utils';
import { Account } from '~/account';
import { BigNumber } from 'bignumber.js';
import { Explorer, ExplorerOptions } from '~/types/global';
import bs from 'bs58';

/**
 * Create explorer url for account address or signature
 *
 * @see {@link types/global.ts}
 * @returns string
 */
String.prototype.toExplorerUrl = function (
  explorer: Explorer = Explorer.Solscan,
  options: Partial<ExplorerOptions> = {},
) {
  console.log('# config in global', Config);
  let cluster = Config.cluster.type;
  debugLog('# clusterType:', cluster);
  if (cluster !== Constants.Cluster.prd) {
    cluster = Constants.Cluster.dev;
  }

  const addressOrSignature: string = this.toString();
  let url = '';

  if (options.replacePath) {
    if (explorer === Explorer.SolanaFM) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/${options.replacePath}/${addressOrSignature}?cluster=${cluster}`;
    } else if (explorer === Explorer.Xray) {
      url = `${Constants.EXPLORER_XRAY_URL}/${options.replacePath}/${addressOrSignature}?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/${options.replacePath}/${addressOrSignature}?cluster=${cluster}`;
    }
    return url;
  }

  if (Account.Keypair.isPubkey(addressOrSignature)) {
    // address
    if (explorer === Explorer.SolanaFM) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/address/${addressOrSignature}?cluster=${cluster}`;
    } else if (explorer === Explorer.Xray) {
      url = `${Constants.EXPLORER_XRAY_URL}/account/${addressOrSignature}?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/account/${addressOrSignature}?cluster=${cluster}`;
    }
  } else {
    // signature
    // for Invalid type "never" of addressOrSignature, so `as string`
    if (explorer === Explorer.SolanaFM) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/tx/${
        addressOrSignature as string
      }?cluster=${cluster}`;
    } else if (explorer === Explorer.Xray) {
      url = `${Constants.EXPLORER_XRAY_URL}/tx/${
        addressOrSignature as string
      }?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/tx/${
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
  if (!Account.Keypair.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new PublicKey(this.toString());
};

/**
 * Secret(@solana-suite) to Keypair(@solana/web3.js)
 *
 * @see {@link types/global.ts}
 * @returns Keypair
 */
String.prototype.toKeypair = function () {
  if (!Account.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs.decode(this.toString());
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
