import {
  Commitment,
  PublicKey
} from '@solana/web3.js';

import Config from './solana-suite.json';

export namespace Constants {
  export enum SolanaNet {
    prd = 'mainnet-beta',
    dev = 'devnet',
    test = 'testnet',
  }

  export const currentNetwork = Config.network;
  export const isDebugging = Config.debugging;
}

export namespace ConstantsFunc {
  export const switchApi = (env: string | undefined) => {
    switch (env) {
      case Constants.SolanaNet.prd:
        return 'https://api.mainnet-beta.solana.com';
      case Constants.SolanaNet.test:
        return 'https://api.testnet.solana.com';
      default:
        return 'http://api.devnet.solana.com';
    }
  }
}

export namespace Constants {
  String.prototype.toPublicKey = function () {
    return new PublicKey(this);
  }
  export const CURRENT_NETWORK = ConstantsFunc.switchApi(Constants.currentNetwork);
  export const API_URL = ConstantsFunc.switchApi(Constants.currentNetwork);
  export const WRAPPED_TOKEN_PROGRAM_ID = 'So11111111111111111111111111111111111111112'.toPublicKey();
  export const MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'.toPublicKey();
  export const METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'.toPublicKey();
  export const COMMITMENT: Commitment = 'confirmed';
  // todo: this NFT_STORAGE_API_KEY moved .env file
  // NFT.storage can store NFTs up to 32GB in size!
  export const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';

  export const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
  export const ARWEAVE_UPLOAD_SRV_URL = 'https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile4';
  export const ARWEAVE_GATEWAY_URL = 'https://arweave.net';
  export const AR_SOL_HOLDER_ID = 'HvwC9QSAzvGXhhVrgPmauVwFWcYZhne3hVot9EbHuFTm'.toPublicKey();

  export const COIN_MARKET_URL = 'https://api.coingecko.com/api/v3/simple/price';
}
