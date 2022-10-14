import { PublicKey, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Constants, Result, Instruction, Node } from './';
import { Internals_Instruction } from './internals/_instruction';
import bs from 'bs58';
import './types/global';

Array.prototype.submit = async function () {
  const instructions: Instruction[] = [];
  // dont use forEach
  // It is not possible to stop the process by RETURN in the middle of the process.
  let i = 0;
  for (const obj of this) {
    if (obj.isErr) {
      return Result.err(
        Error(`[Array index of caught 'Result.err': ${i}]${obj.error.message}`)
      );
    } else if (obj.isOk) {
      instructions.push(obj.value);
    } else {
      instructions.push(obj);
    }
    i++;
  }
  return await Internals_Instruction.batchSubmit(instructions);
};

String.prototype.toPublicKey = function () {
  return new PublicKey(this);
};

String.prototype.toKeypair = function () {
  const decoded = bs.decode(this as string);
  return Keypair.fromSecretKey(decoded);
};

String.prototype.toExplorerUrl = function () {
  const endPointUrl = Node.getConnection().rpcEndpoint;
  debugLog('# toExplorerUrl rpcEndpoint:', endPointUrl);
  let cluster = '';
  if (endPointUrl === Constants.EndPointUrl.prd) {
    cluster = Constants.Cluster.prd;
  } else if (endPointUrl === Constants.EndPointUrl.prd2) {
    cluster = Constants.Cluster.prd;
  } else if (endPointUrl === Constants.EndPointUrl.test) {
    cluster = Constants.Cluster.test;
  } else if (endPointUrl === Constants.EndPointUrl.dev) {
    cluster = Constants.Cluster.dev;
  } else {
    cluster = Constants.Cluster.dev;
  }

  try {
    /* tslint:disable-next-line */
    new PublicKey(this);
    return `https://solscan.io/account/${this}?cluster=${cluster}`;
  } catch (_) {
    return `https://solscan.io/tx/${this}?cluster=${cluster}`;
  }
};

Number.prototype.toSol = function () {
  return (this as number) / LAMPORTS_PER_SOL;
};

Number.prototype.toLamports = function () {
  return (this as number) * LAMPORTS_PER_SOL;
};

export const debugLog = (
  data: unknown,
  data2: unknown = '',
  data3: unknown = '',
  data4: unknown = ''
) => {
  if (Constants.isDebugging || process.env.DEBUG == 'true') {
    console.log('[DEBUG]', data, data2, data3, data4);
  }
};

export const sleep = async (sec: number) =>
  new Promise((r) => setTimeout(r, sec * 1000));

export const isBrowser = () =>
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const isNode = () =>
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;
