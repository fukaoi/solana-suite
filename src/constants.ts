import {
  Commitment
} from '@solana/web3.js';

import './util';
import './global';

export namespace ConstantsFunc {
  export const switchApi = (env: string | undefined) => {
    switch (env) {
      case 'production':
        return 'https://api.solana.com';
      case 'test':
        return 'https://api.testnet.solana.com';
      default:
        process.env.NODE_ENV = 'development';
        return 'http://api.devnet.solana.com';
    }
  }

  export const switchNetwork = (env: string | undefined) => {
    switch (env) {
      case 'production':
        return 'mainnet';
      case 'test':
        return 'testnet';
      default:
        process.env.NODE_ENV = 'development';
        return 'devnet';
    }
  }

  export const swtichArweaveUpload = () =>
    'https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile4';
}

export namespace Constants {
  export const CURRENT_NETWORK = ConstantsFunc.switchApi(process.env.NODE_ENV);
  export const API_URL = ConstantsFunc.switchApi(process.env.NODE_ENV);
  export const SYSTEM_PROGRAM_ID = '11111111111111111111111111111111'.toPubKey();
  export const SPL_TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'.toPubKey();
  export const SPL_ASSOCIATED_TOKEN_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'.toPubKey();
  export const MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'.toPubKey();
  export const METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'.toPubKey();
  export const COMMITMENT: Commitment = 'singleGossip';
  // todo: this NFT_STORAGE_API_KEY moved .env file
  // NFT.storage can store NFTs up to 32GB in size!
  export const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';

  export const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
  export const ARWEAVE_UPLOAD_SRV_URL = ConstantsFunc.swtichArweaveUpload();
  export const ARWEAVE_GATEWAY_URL = 'https://arweave.net';
  export const AR_SOL_HOLDER_ID = 'HvwC9QSAzvGXhhVrgPmauVwFWcYZhne3hVot9EbHuFTm'.toPubKey();

  export const COIN_MARKET_URL =  'https://api.coingecko.com/api/v3/simple/price';
}

