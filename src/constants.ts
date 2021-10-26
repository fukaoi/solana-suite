import {
  Commitment,
  PublicKey
} from '@solana/web3.js';

import TSConfig from '../tsconfig.json';

export namespace Constants {
  export enum SolanaNet {
    prd = 'mainnet-beta',
    dev = 'devnet',
    test = 'testnet',
  }

  export const currentNetwork = TSConfig.solanaSuite.network;

  export const isDebugging = () => {
    if (process?.env?.NODE_ENV) {
      if (process.env.NODE_ENV === 'development') {
        return true;
      }
    }
    if (TSConfig.solanaSuite.debugging) {
      return true;
    }
    return false;
  }
}

export namespace ConstantsFunc {
  export const switchApi = (env: string | undefined) => {
    switch (env) {
      case Constants.SolanaNet.prd:
        return 'https://api.solana.com';
      case Constants.SolanaNet.test:
        return 'https://api.testnet.solana.com';
      default:
        process.env.SOLANA_NETWORK = Constants.SolanaNet.dev;
        return 'http://api.devnet.solana.com';
    }
  }
}

export namespace Constants {
  String.prototype.toPubKey = function () {
    return new PublicKey(this);
  }
  export const CURRENT_NETWORK = ConstantsFunc.switchApi(Constants.currentNetwork);
  export const API_URL = ConstantsFunc.switchApi(Constants.currentNetwork);
  export const SYSTEM_PROGRAM_ID = '11111111111111111111111111111111'.toPubKey();
  export const SPL_ASSOCIATED_TOKEN_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'.toPubKey();
  export const MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'.toPubKey();
  export const METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'.toPubKey();
  export const COMMITMENT: Commitment = 'confirmed';
  // todo: this NFT_STORAGE_API_KEY moved .env file
  // NFT.storage can store NFTs up to 32GB in size!
  export const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';

  export const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
  export const ARWEAVE_UPLOAD_SRV_URL = 'https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile4';
  export const ARWEAVE_GATEWAY_URL = 'https://arweave.net';
  export const AR_SOL_HOLDER_ID = 'HvwC9QSAzvGXhhVrgPmauVwFWcYZhne3hVot9EbHuFTm'.toPubKey();

  export const COIN_MARKET_URL = 'https://api.coingecko.com/api/v3/simple/price';
}
