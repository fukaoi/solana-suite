"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CompressedNft: () => CompressedNft9
});
module.exports = __toCommonJS(src_exports);

// ../suite-utils/src/constants.ts
var import_web3 = require("@solana/web3.js");
var import_load = __toESM(require("@solana-suite/config/load"));
var Config = import_load.default;
var Constants;
((Constants2) => {
  let WarnningMessage;
  ((WarnningMessage2) => {
    WarnningMessage2.NFT_STORAGE_API_KEY = `
        [YOU HAVE TO DO]
        --------------------------------------
        You need to update nftStorageApiKey define parameter in solana-suite.json.
        Can get api key from https://nft.storage/
        --------------------------------------
        `;
    WarnningMessage2.DAS_API_URL = `
        [YOU HAVE TO DO]
        --------------------------------------
        You need to update dasApiUrl define parameter in solana-suite.json.
        can get api url from https://www.helius.dev/
        -------------------------------------- 
        `;
  })(WarnningMessage = Constants2.WarnningMessage || (Constants2.WarnningMessage = {}));
})(Constants || (Constants = {}));
((Constants2) => {
  Constants2.currentCluster = Config.cluster.type;
  Constants2.customClusterUrl = Config.cluster.customClusterUrl;
  Constants2.isDebugging = Config.debugging;
  Constants2.customNftStorageApiKey = Config.nftStorageApiKey;
  Constants2.customDasApiUrl = Config.dasApiUrl;
  let Cluster;
  ((Cluster2) => {
    Cluster2["prd"] = "mainnet-beta";
    Cluster2["prdMetaplex"] = "mainnet-beta-metaplex";
    Cluster2["dev"] = "devnet";
    Cluster2["localhost"] = "localhost-devnet";
  })(Cluster = Constants2.Cluster || (Constants2.Cluster = {}));
  let EndPointUrl;
  ((EndPointUrl2) => {
    EndPointUrl2["prd"] = "https://api.mainnet-beta.solana.com";
    EndPointUrl2["prdMetaplex"] = "https://api.metaplex.solana.com";
    EndPointUrl2["dev"] = "https://api.devnet.solana.com";
    EndPointUrl2["localhost"] = "http://api.devnet.solana.com";
  })(EndPointUrl = Constants2.EndPointUrl || (Constants2.EndPointUrl = {}));
  let BundlrUrl;
  ((BundlrUrl2) => {
    BundlrUrl2["prd"] = "https://node1.irys.xyz,https://node2.irys.xyz";
    BundlrUrl2["dev"] = "https://devnet.irys.xyz";
  })(BundlrUrl = Constants2.BundlrUrl || (Constants2.BundlrUrl = {}));
  let DasApiUrl;
  ((DasApiUrl2) => {
    DasApiUrl2["prd"] = "https://mainnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92";
    DasApiUrl2["dev"] = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639";
  })(DasApiUrl = Constants2.DasApiUrl || (Constants2.DasApiUrl = {}));
  let NftstorageApiKey;
  ((NftstorageApiKey2) => {
    NftstorageApiKey2["prd"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
    NftstorageApiKey2["dev"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE" /* prd */;
  })(NftstorageApiKey = Constants2.NftstorageApiKey || (Constants2.NftstorageApiKey = {}));
  Constants2.switchCluster = (param) => {
    const { cluster: env, customClusterUrl: customClusterUrl2 } = param;
    if (customClusterUrl2 && customClusterUrl2.length > 0) {
      const index = Date.now() % customClusterUrl2.length;
      return customClusterUrl2[index];
    }
    switch (env) {
      case "mainnet-beta" /* prd */:
        return "https://api.mainnet-beta.solana.com" /* prd */;
      case "mainnet-beta-metaplex" /* prdMetaplex */:
        return "https://api.metaplex.solana.com" /* prdMetaplex */;
      case "devnet" /* dev */:
        return "https://api.devnet.solana.com" /* dev */;
      default:
        return "http://api.devnet.solana.com" /* localhost */;
    }
  };
  Constants2.switchBundlr = (env) => {
    switch (env) {
      case "mainnet-beta" /* prd */: {
        const urls = "https://node1.irys.xyz,https://node2.irys.xyz" /* prd */.split(",");
        const index = Date.now() % urls.length;
        return urls[index];
      }
      default: {
        return "https://devnet.irys.xyz" /* dev */;
      }
    }
  };
  Constants2.switchDasApi = (env) => {
    if (Constants2.customDasApiUrl && Constants2.customDasApiUrl.length > 0) {
      const index = Date.now() % Constants2.customDasApiUrl.length;
      return Constants2.customDasApiUrl[index];
    }
    switch (env) {
      case "mainnet-beta" /* prd */: {
        if (Constants2.customDasApiUrl.length < 1) {
          console.warn(Constants2.WarnningMessage.DAS_API_URL);
        }
        const urls = "https://mainnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92" /* prd */.split(",");
        const index = Date.now() % urls.length;
        return urls[index];
      }
      default: {
        const urls = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639" /* dev */.split(",");
        const index = Date.now() % urls.length;
        return urls[index];
      }
    }
  };
  Constants2.switchNftStorage = (env) => {
    if (Constants2.customNftStorageApiKey) {
      return Constants2.customNftStorageApiKey;
    }
    switch (env) {
      case "mainnet-beta" /* prd */:
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE" /* prd */;
      default: {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE" /* dev */;
      }
    }
  };
  Constants2.loadConfig = async () => {
    Config = await import("@solana-suite/config/load");
  };
  Constants2.WRAPPED_TOKEN_PROGRAM_ID = new import_web3.PublicKey(
    "So11111111111111111111111111111111111111112"
  );
  Constants2.MEMO_PROGRAM_ID = new import_web3.PublicKey(
    "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"
  );
  Constants2.METAPLEX_PROGRAM_ID = new import_web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );
  Constants2.COMMITMENT = "confirmed";
  Constants2.NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
  Constants2.IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
  Constants2.BUNDLR_NETWORK_URL = (0, Constants2.switchBundlr)(Config.cluster.type);
  Constants2.DAS_API_URL = (0, Constants2.switchDasApi)(Config.cluster.type);
  Constants2.NFT_STORAGE_API_KEY = (0, Constants2.switchNftStorage)(Config.cluster.type);
  Constants2.EXPLORER_SOLSCAN_URL = "https://solscan.io";
  Constants2.EXPLORER_SOLANAFM_URL = "https://solana.fm";
  Constants2.EXPLORER_XRAY_URL = "https://xray.helius.xyz";
})(Constants || (Constants = {}));

// ../global/src/index.ts
var import_web34 = require("@solana/web3.js");

// ../account/src/associated.ts
var import_spl_token = require("@solana/spl-token");
var Account;
((Account5) => {
  let Associated;
  ((Associated2) => {
    Associated2.makeOrCreateInstruction = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
      const associatedTokenAccount = (0, import_spl_token.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey(),
        allowOwnerOffCurve,
        import_spl_token.TOKEN_PROGRAM_ID,
        import_spl_token.ASSOCIATED_TOKEN_PROGRAM_ID
      );
      debugLog("# associatedTokenAccount: ", associatedTokenAccount.toString());
      try {
        await (0, import_spl_token.getAccount)(
          Node.getConnection(),
          associatedTokenAccount,
          Node.getConnection().commitment,
          import_spl_token.TOKEN_PROGRAM_ID
        );
        return {
          tokenAccount: associatedTokenAccount.toString(),
          inst: void 0
        };
      } catch (error) {
        if (!(error instanceof import_spl_token.TokenAccountNotFoundError) && !(error instanceof import_spl_token.TokenInvalidAccountOwnerError)) {
          throw Error("Unexpected error");
        }
        const payer = !feePayer ? owner : feePayer;
        const inst = (0, import_spl_token.createAssociatedTokenAccountInstruction)(
          payer.toPublicKey(),
          associatedTokenAccount,
          owner.toPublicKey(),
          mint.toPublicKey(),
          import_spl_token.TOKEN_PROGRAM_ID,
          import_spl_token.ASSOCIATED_TOKEN_PROGRAM_ID
        );
        return {
          tokenAccount: associatedTokenAccount.toString(),
          inst
        };
      }
    };
  })(Associated = Account5.Associated || (Account5.Associated = {}));
})(Account || (Account = {}));

// ../account/src/keypair.ts
var import_web32 = require("@solana/web3.js");
var import_bs58 = __toESM(require("bs58"));
var Account2;
((Account5) => {
  class Keypair5 {
    secret;
    pubkey;
    constructor(params) {
      if (!params.pubkey) {
        const keypair = params.secret.toKeypair();
        this.pubkey = keypair.publicKey.toString();
      } else {
        this.pubkey = params.pubkey;
      }
      this.secret = params.secret;
    }
    toPublicKey() {
      return new import_web32.PublicKey(this.pubkey);
    }
    toKeypair() {
      const decoded = import_bs58.default.decode(this.secret);
      return import_web32.Keypair.fromSecretKey(decoded);
    }
    static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
    static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
    static create = () => {
      const keypair = import_web32.Keypair.generate();
      return new Keypair5({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair5({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
  }
  Account5.Keypair = Keypair5;
})(Account2 || (Account2 = {}));

// ../account/src/pda.ts
var import_web33 = require("@solana/web3.js");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_mpl_bubblegum_instruction = require("mpl-bubblegum-instruction");
var import_bn = __toESM(require("bn.js"));
var Account3;
((Account5) => {
  let Pda;
  ((Pda2) => {
    Pda2.getMetadata = (address) => {
      const [publicKey] = import_web33.PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          import_mpl_token_metadata.PROGRAM_ID.toBuffer(),
          address.toPublicKey().toBuffer()
        ],
        import_mpl_token_metadata.PROGRAM_ID
      );
      return publicKey;
    };
    Pda2.getMasterEdition = (address) => {
      const [publicKey] = import_web33.PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          import_mpl_token_metadata.PROGRAM_ID.toBuffer(),
          address.toPublicKey().toBuffer(),
          Buffer.from("edition")
        ],
        import_mpl_token_metadata.PROGRAM_ID
      );
      return publicKey;
    };
    Pda2.getTreeAuthority = (address) => {
      const [publicKey] = import_web33.PublicKey.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        import_mpl_bubblegum_instruction.PROGRAM_ADDRESS.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = import_web33.PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        import_mpl_bubblegum_instruction.PROGRAM_ADDRESS.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getAssetId = (address, leafIndex) => {
      const node = new import_bn.default.BN(leafIndex);
      const [assetId] = import_web33.PublicKey.findProgramAddressSync(
        [
          Buffer.from("asset", "utf8"),
          address.toPublicKey().toBuffer(),
          Uint8Array.from(node.toArray("le", 8))
        ],
        import_mpl_bubblegum_instruction.PROGRAM_ADDRESS.toPublicKey()
      );
      return assetId.toString();
    };
  })(Pda = Account5.Pda || (Account5.Pda = {}));
})(Account3 || (Account3 = {}));

// ../account/src/index.ts
var Account4 = {
  ...Account,
  ...Account2,
  ...Account3
};

// ../global/src/index.ts
var import_bignumber = require("bignumber.js");
var import_bs582 = __toESM(require("bs58"));
String.prototype.toExplorerUrl = function(explorer = "solscan" /* Solscan */, options = {}) {
  let cluster = Config.cluster.type;
  debugLog("# clusterType:", cluster);
  if (cluster !== Constants.Cluster.prd) {
    cluster = Constants.Cluster.dev;
  }
  const addressOrSignature = this.toString();
  let url = "";
  if (options.replacePath) {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/${options.replacePath}/${addressOrSignature}?cluster=${cluster}`;
    } else if (explorer === "xray" /* Xray */) {
      url = `${Constants.EXPLORER_XRAY_URL}/${options.replacePath}/${addressOrSignature}?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/${options.replacePath}/${addressOrSignature}?cluster=${cluster}`;
    }
    return url;
  }
  if (Account4.Keypair.isPubkey(addressOrSignature)) {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/address/${addressOrSignature}?cluster=${cluster}`;
    } else if (explorer === "xray" /* Xray */) {
      url = `${Constants.EXPLORER_XRAY_URL}/account/${addressOrSignature}?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/account/${addressOrSignature}?cluster=${cluster}`;
    }
  } else {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/tx/${addressOrSignature}?cluster=${cluster}`;
    } else if (explorer === "xray" /* Xray */) {
      url = `${Constants.EXPLORER_XRAY_URL}/tx/${addressOrSignature}?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/tx/${addressOrSignature}?cluster=${cluster}`;
    }
  }
  return url;
};
String.prototype.toPublicKey = function() {
  if (!Account4.Keypair.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new import_web34.PublicKey(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account4.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = import_bs582.default.decode(this.toString());
  return import_web34.Keypair.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return (0, import_bignumber.BigNumber)(this).div(import_web34.LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return (0, import_bignumber.BigNumber)(this).times(import_web34.LAMPORTS_PER_SOL).toNumber();
};

// ../transaction-builder/src/batch.ts
var import_web37 = require("@solana/web3.js");

// ../transaction-builder/src/common.ts
var import_web36 = require("@solana/web3.js");

// ../transaction-builder/src/priority-fee.ts
var import_web35 = require("@solana/web3.js");

// ../das-api/src/api.ts
var DasApi;
((DasApi4) => {
  let dasUri;
  const connect = async (method, params) => {
    dasUri = dasUri ? dasUri : Constants.DAS_API_URL;
    debugLog("# dasUri: ", dasUri);
    const response = await fetch(dasUri, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method,
        id: "das-api",
        params
      })
    });
    if (response.status !== 200) {
      const err = (await response.json()).error.message;
      return Result.err(Error(err));
    }
    return (await response.json()).result;
  };
  DasApi4.changeDasUri = (url) => {
    dasUri = url;
  };
  DasApi4.getAssetProof = async (assetId) => {
    return Try(async () => {
      return await connect("getAssetProof", [assetId]);
    });
  };
  DasApi4.getAsset = async (assetId) => {
    return Try(async () => {
      return await connect("getAsset", [assetId]);
    });
  };
  DasApi4.getAssetsByOwner = async (ownerAddress, limit = 1e3, page = 1, sortBy, before, after) => {
    return Try(async () => {
      return await connect("getAssetsByOwner", [
        ownerAddress,
        sortBy,
        limit,
        page,
        before,
        after
      ]);
    });
  };
  DasApi4.getAssetsByGroup = async (groupKey, groupValue, limit = 1e3, page = 1, sortBy, before, after) => {
    return Try(async () => {
      return await connect("getAssetsByGroup", [
        groupKey,
        groupValue,
        sortBy,
        limit,
        page,
        before,
        after
      ]);
    });
  };
  DasApi4.getPriorityFeeEstimate = async (accountOrTransaction) => {
    return Try(async () => {
      const options = { includeAllPriorityFeeLevels: true };
      return (await connect("getPriorityFeeEstimate", [
        {
          accountOrTransaction,
          options
        }
      ])).priorityFeeLevels;
    });
  };
})(DasApi || (DasApi = {}));

// ../converter/src/collection.ts
var Converter;
((Converter15) => {
  let Collection;
  ((Collection2) => {
    Collection2.intoInfra = (input) => {
      if (!input) {
        return null;
      }
      return {
        key: input.toPublicKey(),
        verified: false
      };
    };
    Collection2.intoUser = (output) => {
      if (!output) {
        return void 0;
      }
      return {
        address: output.key.toString(),
        verified: output.verified
      };
    };
  })(Collection = Converter15.Collection || (Converter15.Collection = {}));
  let CollectionMint;
  ((CollectionMint2) => {
    CollectionMint2.intoUser = (output) => {
      const res = output.find((value) => {
        if (value.group_key === "collection") {
          return value.group_value;
        }
      });
      return res ? res.group_value : "";
    };
  })(CollectionMint = Converter15.CollectionMint || (Converter15.CollectionMint = {}));
})(Converter || (Converter = {}));

// ../converter/src/creators.ts
var Converter2;
((Converter15) => {
  let Creators;
  ((Creators2) => {
    Creators2.intoInfra = (input) => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        return {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: false
        };
      });
    };
    Creators2.intoCompressedNftInfra = (input) => {
      if (!input) {
        return [];
      }
      return input.map((data) => {
        return {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: false
        };
      });
    };
    Creators2.intoUser = (output) => {
      if (!output) {
        return void 0;
      }
      return output.map((data) => {
        return {
          address: data.address.toString(),
          share: data.share,
          verified: data.verified
        };
      });
    };
  })(Creators = Converter15.Creators || (Converter15.Creators = {}));
})(Converter2 || (Converter2 = {}));

// ../converter/src/compressed-nft-metadata.ts
var import_mpl_bubblegum_instruction2 = require("mpl-bubblegum-instruction");
var Converter3;
((Converter15) => {
  let CompressedNftMetadata;
  ((CompressedNftMetadata2) => {
    CompressedNftMetadata2.intoInfra = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoCompressedNftInfra(input.creators),
        collection: Converter.Collection.intoInfra(input.collection),
        uses: input.uses || null,
        primarySaleHappened: false,
        isMutable: input.isMutable ?? false,
        editionNonce: 0,
        tokenStandard: import_mpl_bubblegum_instruction2.TokenStandard.NonFungible,
        tokenProgramVersion: import_mpl_bubblegum_instruction2.TokenProgramVersion.Original
      };
    };
  })(CompressedNftMetadata = Converter15.CompressedNftMetadata || (Converter15.CompressedNftMetadata = {}));
})(Converter3 || (Converter3 = {}));

// ../converter/src/royalty.ts
var Converter4;
((Converter15) => {
  let Royalty;
  ((Royalty2) => {
    Royalty2.THRESHOLD = 100;
    Royalty2.intoInfra = (percentage) => {
      return percentage * Royalty2.THRESHOLD;
    };
    Royalty2.intoUser = (percentage) => {
      return percentage * Royalty2.THRESHOLD;
    };
  })(Royalty = Converter15.Royalty || (Converter15.Royalty = {}));
})(Converter4 || (Converter4 = {}));

// ../converter/src/nft.ts
var Converter5;
((Converter15) => {
  let Nft;
  ((Nft2) => {
    Nft2.intoUser = (output) => {
      return {
        mint: output.onchain.id.toString(),
        collectionMint: Converter.CollectionMint.intoUser(
          output.onchain.grouping
        ),
        authorities: output.onchain.authorities,
        royalty: Converter4.Royalty.intoUser(output.onchain.royalty.percent),
        name: output.onchain.content.metadata.name,
        symbol: output.onchain.content.metadata.symbol,
        uri: output.onchain.content.json_uri,
        creators: Converter2.Creators.intoUser(output.onchain.creators),
        treeAddress: output.onchain.compression.tree,
        isCompressed: output.onchain.compression.compressed,
        isMutable: output.onchain.mutable,
        isBurn: output.onchain.burnt,
        editionNonce: output.onchain.supply.edition_nonce,
        primarySaleHappened: output.onchain.royalty.primary_sale_happened,
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(Nft = Converter15.Nft || (Converter15.Nft = {}));
})(Converter5 || (Converter5 = {}));

// ../converter/src/memo.ts
var Converter6;
((Converter15) => {
  let Memo;
  ((Memo2) => {
    Memo2.intoUserSide = (output, meta, outputTransfer, mappingTokenAccount) => {
      const history = {};
      if (outputTransfer && outputTransfer.program !== "") {
        if (mappingTokenAccount && outputTransfer.program === "spl-token") {
          const foundSource = mappingTokenAccount.find(
            (m) => m.account === outputTransfer.parsed.info.source
          );
          const foundDest = mappingTokenAccount.find(
            (m) => m.account === outputTransfer.parsed.info.destination
          );
          history.mint = outputTransfer.parsed.info.mint;
          foundSource && (history.source = foundSource.owner);
          foundDest && (history.destination = foundDest.owner);
        } else {
          history.source = outputTransfer.parsed.info.source;
          history.destination = outputTransfer.parsed.info.destination;
        }
      }
      history.memo = output.parsed;
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Memo = Converter15.Memo || (Converter15.Memo = {}));
})(Converter6 || (Converter6 = {}));

// ../converter/src/mint.ts
var Converter7;
((Converter15) => {
  let Mint;
  ((Mint2) => {
    Mint2.intoUserSide = (output, meta) => {
      const history = {};
      history.mint = output.parsed.info.mint;
      history.mintAuthority = output.parsed.info.mintAuthority;
      history.tokenAmount = output.parsed.info.tokenAmount;
      history.account = output.parsed.info.account;
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Mint = Converter15.Mint || (Converter15.Mint = {}));
})(Converter7 || (Converter7 = {}));

// ../converter/src/regular-nft-metadata.ts
var Converter8;
((Converter15) => {
  let RegularNftMetadata;
  ((RegularNftMetadata2) => {
    RegularNftMetadata2.intoInfra = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoInfra(input.creators),
        collection: Converter.Collection.intoInfra(input.collection),
        uses: input.uses || null
      };
    };
  })(RegularNftMetadata = Converter15.RegularNftMetadata || (Converter15.RegularNftMetadata = {}));
})(Converter8 || (Converter8 = {}));

// ../converter/src/properties.ts
var Converter9;
((Converter15) => {
  let Properties;
  ((Properties2) => {
    Properties2.intoInfra = async (input, callbackFunc, storageType, feePayer) => {
      if (!input || !input.files) {
        return {};
      }
      const files = await Promise.all(
        input.files.map(async (file) => {
          if (!file.filePath) {
            return {};
          }
          const res = await callbackFunc(file.filePath, storageType, feePayer);
          if (res.isErr) {
            throw Error(res.error.message);
          }
          return overwriteObject(file, [
            {
              existsKey: "filePath",
              will: { key: "uri", value: res.value }
            }
          ]);
        })
      );
      return { ...input, files };
    };
  })(Properties = Converter15.Properties || (Converter15.Properties = {}));
})(Converter9 || (Converter9 = {}));

// ../converter/src/uses.ts
var Converter10;
((Converter15) => {
  let Uses;
  ((Uses2) => {
    Uses2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return output;
    };
  })(Uses = Converter15.Uses || (Converter15.Uses = {}));
})(Converter10 || (Converter10 = {}));

// ../converter/src/token-metadata.ts
var Converter11;
((Converter15) => {
  let TokenMetadata;
  ((TokenMetadata2) => {
    TokenMetadata2.intoInfra = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoInfra(input.creators),
        collection: null,
        uses: input.uses || null
      };
    };
    TokenMetadata2.intoUser = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.name),
        symbol: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.symbol),
        tokenAmount,
        uri: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.uri),
        creators: Converter2.Creators.intoUser(output.onchain.data.creators),
        uses: Converter10.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Converter15.TokenMetadata || (Converter15.TokenMetadata = {}));
})(Converter11 || (Converter11 = {}));

// ../converter/src/transfer-checked.ts
var Converter12;
((Converter15) => {
  let TransferChecked;
  ((TransferChecked2) => {
    TransferChecked2.intoUserSide = (output, meta, mappingTokenAccount) => {
      const history = {};
      if (mappingTokenAccount) {
        const foundSource = mappingTokenAccount.find(
          (m) => m.account === output.parsed.info.source
        );
        const foundDest = mappingTokenAccount.find(
          (m) => m.account === output.parsed.info.destination
        );
        foundSource && (history.source = foundSource.owner);
        foundDest && (history.destination = foundDest.owner);
      }
      history.tokenAmount = output.parsed.info.tokenAmount;
      history.mint = output.parsed.info.mint;
      history.multisigAuthority = output.parsed.info.multisigAuthority;
      history.signers = output.parsed.info.signers;
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(TransferChecked = Converter15.TransferChecked || (Converter15.TransferChecked = {}));
})(Converter12 || (Converter12 = {}));

// ../converter/src/transfer.ts
var Converter13;
((Converter15) => {
  let Transfer;
  ((Transfer2) => {
    Transfer2.intoUserSide = (output, meta) => {
      const history = {};
      if (!output.parsed.info.destination || !output.parsed.info.lamports) {
        return;
      }
      history.source = output.parsed.info.source;
      history.destination = output.parsed.info.destination;
      history.sol = output.parsed.info.lamports?.toSol().toString();
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Transfer = Converter15.Transfer || (Converter15.Transfer = {}));
})(Converter13 || (Converter13 = {}));

// ../converter/src/index.ts
var Converter14 = {
  ...Converter3,
  ...Converter,
  ...Converter2,
  ...Converter5,
  ...Converter6,
  ...Converter7,
  ...Converter8,
  ...Converter9,
  ...Converter4,
  ...Converter11,
  ...Converter12,
  ...Converter13,
  ...Converter10
};

// ../das-api/src/find.ts
var DasApi2;
((DasApi4) => {
  DasApi4.defaultSortBy = {
    sortBy: "recent_action" /* Recent */,
    sortDirection: "desc" /* Desc */
  };
  DasApi4.fetchOffchain = async (uri) => {
    const response = await fetch(uri);
    if (response.status !== 200) {
      return {};
    }
    return await response.json();
  };
  DasApi4.findByMint = async (mint, isCompressed) => {
    const asset = await DasApi.getAsset(mint);
    if (asset.isErr) {
      throw asset.error;
    }
    if (asset.value.compression.compressed === isCompressed) {
      const offchain = await (0, DasApi4.fetchOffchain)(
        asset.value.content.json_uri
      );
      const merged = {
        onchain: asset.value,
        offchain
      };
      return Converter14.Nft.intoUser(merged);
    }
    return {};
  };
  DasApi4.findByOwner = async (owner, isCompressed, options = {}) => {
    const defaultOptions = {
      limit: 1e3,
      page: 1,
      sortBy: DasApi4.defaultSortBy
    };
    const { limit, page, sortBy, before, after } = {
      ...defaultOptions,
      ...options
    };
    const assets = await DasApi.getAssetsByOwner(
      owner,
      limit,
      page,
      sortBy,
      before,
      after
    );
    if (assets.isErr) {
      throw assets.error;
    }
    const items = assets.value.items;
    const metadatas = await Promise.all(
      items.filter((item) => item.compression.compressed === isCompressed).map(async (item) => {
        try {
          const offchain = await (0, DasApi4.fetchOffchain)(
            item.content.json_uri
          );
          const merged = {
            onchain: item,
            offchain
          };
          return Converter14.Nft.intoUser(merged);
        } catch (err) {
          debugLog("# Failed fetch offchain url: ", item.content.json_uri);
          return Converter14.Nft.intoUser({
            onchain: item,
            offchain: {}
          });
        }
      })
    );
    return {
      page: assets.value.page,
      total: assets.value.total,
      limit: assets.value.limit,
      metadatas
    };
  };
  DasApi4.findByCollection = async (collectionMint, isCompressed, options = {}) => {
    const defaultOptions = {
      limit: 1e3,
      page: 1,
      sortBy: DasApi4.defaultSortBy
    };
    const { limit, page, sortBy, before, after } = {
      ...defaultOptions,
      ...options
    };
    const assets = await DasApi.getAssetsByGroup(
      "collection",
      collectionMint,
      limit,
      page,
      sortBy,
      before,
      after
    );
    if (assets.isErr) {
      throw assets.error;
    }
    const items = assets.value.items;
    const metadatas = await Promise.all(
      items.filter((item) => item.compression.compressed === isCompressed).map(async (item) => {
        const offchain = await (0, DasApi4.fetchOffchain)(item.content.json_uri);
        const merged = {
          onchain: item,
          offchain
        };
        return Converter14.Nft.intoUser(merged);
      })
    );
    return {
      page: assets.value.page,
      total: assets.value.total,
      limit: assets.value.limit,
      metadatas
    };
  };
})(DasApi2 || (DasApi2 = {}));

// ../das-api/src/index.ts
var DasApi3 = {
  ...DasApi,
  ...DasApi2
};

// ../transaction-builder/src/priority-fee.ts
var TransactionBuilder;
((TransactionBuilder8) => {
  let PriorityFee;
  ((PriorityFee2) => {
    const MINIMUM_PRIORITY_FEE = 300;
    PriorityFee2.submit = async (transaction, signers, addSolPriorityFee) => {
      let addLamports = 0;
      if (addSolPriorityFee) {
        addLamports = addSolPriorityFee.toLamports();
      } else {
        const estimates = await DasApi3.getPriorityFeeEstimate(transaction);
        debugLog("# estimates: ", estimates);
        addLamports = estimates.isOk && estimates.unwrap().medium !== 0 ? estimates.unwrap().medium : MINIMUM_PRIORITY_FEE;
      }
      debugLog("# lamports: ", addLamports);
      return await sendTransactionWithPriorityFee(
        addLamports,
        transaction,
        signers
      );
    };
    PriorityFee2.createPriorityFeeInstruction = async (transaction) => {
      const estimates = await DasApi3.getPriorityFeeEstimate(transaction);
      debugLog("# estimates: ", estimates);
      const lamports = estimates.isOk ? estimates.unwrap().medium : MINIMUM_PRIORITY_FEE;
      return import_web35.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: lamports
      });
    };
    const sendTransactionWithPriorityFee = async (lamports, transaction, finalSigners) => {
      const computePriceInst = import_web35.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: lamports
      });
      const confirmOptions = {
        maxRetries: MAX_RETRIES
      };
      transaction.add(computePriceInst);
      return await (0, import_web35.sendAndConfirmTransaction)(
        Node.getConnection(),
        transaction,
        finalSigners,
        confirmOptions
      );
    };
  })(PriorityFee = TransactionBuilder8.PriorityFee || (TransactionBuilder8.PriorityFee = {}));
})(TransactionBuilder || (TransactionBuilder = {}));

// ../transaction-builder/src/common.ts
var MAX_RETRIES = 3;
var TransactionBuilder2;
((TransactionBuilder8) => {
  class Common {
    static MAX_TRANSACTION_SIZE = 1232;
    instructions;
    signers;
    feePayer;
    data;
    constructor(instructions, signers, feePayer, data) {
      this.instructions = instructions;
      this.signers = signers;
      this.feePayer = feePayer;
      this.data = data;
    }
    submit = async (options = {}) => {
      return Try(async () => {
        if (!(this instanceof Common)) {
          throw Error("only Instruction object that can use this");
        }
        const transaction = new import_web36.Transaction();
        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;
        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }
        this.instructions.forEach((inst) => transaction.add(inst));
        if (options.isPriorityFee) {
          return await TransactionBuilder.PriorityFee.submit(
            transaction,
            finalSigners
          );
        } else {
          const confirmOptions = {
            maxRetries: MAX_RETRIES
          };
          return await (0, import_web36.sendAndConfirmTransaction)(
            Node.getConnection(),
            transaction,
            finalSigners,
            confirmOptions
          );
        }
      });
    };
  }
  TransactionBuilder8.Common = Common;
})(TransactionBuilder2 || (TransactionBuilder2 = {}));

// ../transaction-builder/src/batch.ts
var TransactionBuilder3;
((TransactionBuilder8) => {
  class Batch {
    submit = async (options = {}) => {
      return Try(async () => {
        if (!options.instructions) {
          throw Error("Not found options.instructions");
        }
        const commonOrMintInst = options.instructions;
        let i = 0;
        for (const inst of commonOrMintInst) {
          if (!inst.instructions && !inst.signers) {
            throw Error(
              `only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(inst)}`
            );
          }
          i++;
        }
        const instructions = commonOrMintInst.flatMap(
          (inst) => inst.instructions
        );
        const signers = commonOrMintInst.flatMap((inst) => inst.signers);
        const feePayers = commonOrMintInst.filter(
          (inst) => inst.feePayer !== void 0
        );
        let feePayer = signers[0];
        if (feePayers.length > 0 && feePayers[0].feePayer) {
          feePayer = feePayers[0].feePayer;
        }
        const transaction = new import_web37.Transaction();
        let finalSigners = signers;
        if (feePayer) {
          transaction.feePayer = feePayer.publicKey;
          finalSigners = [feePayer, ...signers];
        }
        instructions.map((inst) => transaction.add(inst));
        if (options.isPriorityFee) {
          return await TransactionBuilder.PriorityFee.submit(
            transaction,
            finalSigners
          );
        } else {
          const confirmOptions = {
            maxRetries: MAX_RETRIES
          };
          return await (0, import_web37.sendAndConfirmTransaction)(
            Node.getConnection(),
            transaction,
            finalSigners,
            confirmOptions
          );
        }
      });
    };
  }
  TransactionBuilder8.Batch = Batch;
})(TransactionBuilder3 || (TransactionBuilder3 = {}));

// ../transaction-builder/src/mint.ts
var import_web38 = require("@solana/web3.js");
var TransactionBuilder4;
((TransactionBuilder8) => {
  class Mint {
    instructions;
    signers;
    feePayer;
    data;
    constructor(instructions, signers, feePayer, data) {
      this.instructions = instructions;
      this.signers = signers;
      this.data = data;
      this.feePayer = feePayer;
    }
    submit = async (options = {}) => {
      return Try(async () => {
        if (!(this instanceof Mint)) {
          throw Error("only MintInstruction object that can use this");
        }
        const transaction = new import_web38.Transaction();
        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;
        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }
        this.instructions.forEach((inst) => transaction.add(inst));
        if (Node.getConnection().rpcEndpoint === Constants.EndPointUrl.prd) {
          debugLog("# Change metaplex cluster on mainnet-beta");
          Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
        }
        if (options.isPriorityFee) {
          return await TransactionBuilder.PriorityFee.submit(
            transaction,
            finalSigners
          );
        } else {
          const confirmOptions = {
            maxRetries: MAX_RETRIES
          };
          return await (0, import_web38.sendAndConfirmTransaction)(
            Node.getConnection(),
            transaction,
            finalSigners,
            confirmOptions
          );
        }
      });
    };
  }
  TransactionBuilder8.Mint = Mint;
})(TransactionBuilder4 || (TransactionBuilder4 = {}));

// ../transaction-builder/src/partial-sign.ts
var import_web39 = require("@solana/web3.js");
var TransactionBuilder5;
((TransactionBuilder8) => {
  class PartialSign {
    hexInstruction;
    data;
    constructor(instructions, mint) {
      this.hexInstruction = instructions;
      this.data = mint;
    }
    submit = async (options = {}) => {
      return Try(async () => {
        if (!(this instanceof PartialSign)) {
          throw Error("only PartialSignInstruction object that can use this");
        }
        if (!options.feePayer) {
          throw Error("Need feePayer");
        }
        const decode = Buffer.from(this.hexInstruction, "hex");
        const transaction = import_web39.Transaction.from(decode);
        transaction.partialSign(options.feePayer.toKeypair());
        const confirmOptions = {
          maxRetries: MAX_RETRIES
        };
        const wireTransaction = transaction.serialize();
        return await Node.getConnection().sendRawTransaction(
          wireTransaction,
          confirmOptions
        );
      });
    };
  }
  TransactionBuilder8.PartialSign = PartialSign;
})(TransactionBuilder5 || (TransactionBuilder5 = {}));

// ../transaction-builder/src/calculate-txsize.ts
var TransactionBuilder6;
((TransactionBuilder8) => {
  const LOW_VALUE = 127;
  const HIGH_VALUE = 16383;
  const MAX_TRANSACTION_SIZE = 1232;
  const compactHeader = (n) => n <= LOW_VALUE ? 1 : n <= HIGH_VALUE ? 2 : 3;
  const compactArraySize = (n, size) => compactHeader(n) + n * size;
  TransactionBuilder8.calculateTxSize = (transaction, feePayer) => {
    const feePayerPk = [feePayer.toBase58()];
    const signers = new Set(feePayerPk);
    const accounts = new Set(feePayerPk);
    const ixsSize = transaction.instructions.reduce((acc, ix) => {
      ix.keys.forEach(({ pubkey, isSigner }) => {
        const pk = pubkey.toBase58();
        if (isSigner)
          signers.add(pk);
        accounts.add(pk);
      });
      accounts.add(ix.programId.toBase58());
      const nIndexes = ix.keys.length;
      const opaqueData = ix.data.length;
      return acc + 1 + // PID index
      compactArraySize(nIndexes, 1) + compactArraySize(opaqueData, 1);
    }, 0);
    return compactArraySize(signers.size, 64) + // signatures
    3 + // header
    compactArraySize(accounts.size, 32) + // accounts
    32 + // blockhash
    compactHeader(transaction.instructions.length) + // instructions
    ixsSize;
  };
  TransactionBuilder8.isOverTransactionSize = (transaction, feePayer) => {
    return (0, TransactionBuilder8.calculateTxSize)(transaction, feePayer) > MAX_TRANSACTION_SIZE;
  };
})(TransactionBuilder6 || (TransactionBuilder6 = {}));

// ../transaction-builder/src/index.ts
var TransactionBuilder7 = {
  ...TransactionBuilder3,
  ...TransactionBuilder6,
  ...TransactionBuilder4,
  ...TransactionBuilder2,
  ...TransactionBuilder5,
  ...TransactionBuilder
};

// ../suite-utils/src/shared.ts
var overwriteObject = (object, targets) => {
  const that = object;
  targets.forEach((target) => {
    delete that[target.existsKey];
    that[target.will.key] = target.will.value;
  });
  return that;
};
var debugLog = (data1, data2 = "", data3 = "", data4 = "") => {
  if (Constants.isDebugging === "true" || process.env.DEBUG === "true") {
    console.log("[DEBUG]", data1, data2, data3, data4);
  }
};
var sleep = async (sec) => {
  return new Promise((r) => setTimeout(r, sec * 1e3));
};
var isBrowser = () => {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
};
var isNode = () => {
  return typeof process !== "undefined" && process.versions != null && process.versions.node != null;
};
var isPromise = (obj) => {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
};
function Try(input, finallyInput) {
  try {
    const v = input();
    if (isPromise(v)) {
      return v.then(
        (x) => Result.ok(x),
        (err) => Result.err(err)
      );
    } else {
      return Result.ok(v);
    }
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return Result.err(Error(e));
  } finally {
    if (finallyInput) {
      debugLog("# finally input:", finallyInput);
      finallyInput();
    }
  }
}
var convertTimestampToDateTime = (created_at) => {
  if (created_at) {
    return new Date(created_at * 1e3);
  }
  return;
};
var unixTimestamp = () => {
  return Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
};

// ../suite-utils/src/result.ts
var AbstractResult = class {
  unwrap(ok, err) {
    const r = this._chain(
      (value) => Result.ok(ok ? ok(value) : value),
      (error) => err ? Result.ok(err(error)) : Result.err(error)
    );
    if (r.isErr) {
      throw r.error;
    }
    return r.value;
  }
  map(ok, err) {
    return this._chain(
      (value) => Result.ok(ok(value)),
      (error) => Result.err(err ? err(error) : error)
    );
  }
  chain(ok, err) {
    return this._chain(ok, err || ((error) => Result.err(error)));
  }
  match(ok, err) {
    this._chain(
      (value) => Result.ok(ok(value)),
      (error) => Result.err(err(error))
    );
  }
  /// single TransactionBuilder ////
  /* eslint-disable @typescript-eslint/no-explicit-any */
  async submit(options = {}) {
    const res = this.map(
      async (ok) => {
        debugLog("# result single submit: ", ok);
        const obj = ok;
        return await obj.submit(options);
      },
      (err) => {
        return err;
      }
    );
    if (res.isErr) {
      return Result.err(res.error);
    }
    return res.value;
  }
};
Array.prototype.submit = async function(options = {}) {
  const instructions = [];
  for (const obj of this) {
    if (obj.isErr) {
      return obj;
    } else if (obj.isOk) {
      instructions.push(obj.value);
    } else {
      return Result.err(Error("Only Array Instruction object"));
    }
  }
  debugLog("# Result batch submit: ", instructions);
  const batchOptions = {
    feePayer: options.feePayer,
    isPriorityFee: options.isPriorityFee,
    instructions
  };
  return new TransactionBuilder7.Batch().submit(batchOptions);
};
var InternalOk = class extends AbstractResult {
  constructor(value) {
    super();
    this.value = value;
  }
  isOk = true;
  isErr = false;
  /* eslint-disable @typescript-eslint/no-unused-vars */
  _chain(ok, _err) {
    return ok(this.value);
  }
};
var InternalErr = class extends AbstractResult {
  constructor(error) {
    super();
    this.error = error;
  }
  isOk = false;
  isErr = true;
  _chain(_ok, err) {
    return err(this.error);
  }
};
var Result;
((Result31) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result31.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result31.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result31.ok(resArr);
    }
    const res = {};
    const keys = Object.keys(obj);
    for (const key of keys) {
      const item = obj[key];
      if (item.isErr) {
        return item;
      }
      res[key] = item.value;
    }
    return Result31.ok(res);
  }
  Result31.all = all;
})(Result || (Result = {}));

// ../node/src/index.ts
var import_web310 = require("@solana/web3.js");
var Node;
((Node2) => {
  const setted = {
    clusterUrl: "",
    commitment: Constants.COMMITMENT,
    customClusterUrl: []
  };
  Node2.getConnection = () => {
    if (setted.customClusterUrl.length > 0) {
      setted.clusterUrl = Constants.switchCluster({
        customClusterUrl: setted.customClusterUrl
      });
    } else if (Constants.customClusterUrl.length > 0) {
      setted.clusterUrl = Constants.switchCluster({
        customClusterUrl: Constants.customClusterUrl
      });
    } else if (!setted.clusterUrl) {
      setted.clusterUrl = Constants.switchCluster({
        cluster: Constants.currentCluster
      });
    }
    if (!setted.commitment) {
      setted.commitment = Constants.COMMITMENT;
    }
    return new import_web310.Connection(setted.clusterUrl, setted.commitment);
  };
  Node2.changeConnection = (param) => {
    setted.clusterUrl = "";
    setted.customClusterUrl = [];
    setted.commitment = Constants.COMMITMENT;
    const { cluster, commitment, customClusterUrl } = param;
    if (commitment) {
      setted.commitment = commitment;
      debugLog("# Node change commitment: ", setted.commitment);
    }
    if (cluster) {
      setted.clusterUrl = Constants.switchCluster({ cluster });
      debugLog("# Node change clusterUrl: ", setted.clusterUrl);
    }
    if (customClusterUrl) {
      debugLog("# customClusterUrl: ", customClusterUrl);
      setted.clusterUrl = Constants.switchCluster({ customClusterUrl });
      setted.customClusterUrl = customClusterUrl;
      debugLog(
        "# Node change cluster, custom cluster url: ",
        setted.clusterUrl
      );
    }
  };
  Node2.confirmedSig = async (signature, commitment = Constants.COMMITMENT) => {
    const connection = Node2.getConnection();
    const latestBlockhash = await connection.getLatestBlockhash();
    return await connection.confirmTransaction(
      {
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature
      },
      commitment
    ).then(Result.ok).catch(Result.err);
  };
})(Node || (Node = {}));

// src/delegate.ts
var import_mpl_bubblegum_instruction3 = require("mpl-bubblegum-instruction");
var import_spl_account_compression = require("@solana/spl-account-compression");
var CompressedNft;
((CompressedNft10) => {
  CompressedNft10.createDeleagate = async (assetId, newDelegate) => {
    const rpcAssetProof = await DasApi3.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi3.getAsset(assetId.toString());
    if (rpcAssetProof.isErr || rpcAsset.isErr) {
      throw Error("Rise error when get asset proof or asset");
    }
    const compression = rpcAsset.value.compression;
    const ownership = rpcAsset.value.ownership;
    const assetProof = rpcAssetProof.value;
    const treeOwner = assetProof.tree_id.toPublicKey();
    const treeAuthority = Account4.Pda.getTreeAuthority(assetProof.tree_id);
    const previousLeafDelegate = ownership.delegate ? ownership.delegate.toPublicKey() : ownership.owner.toPublicKey();
    const newLeafDelegate = newDelegate ? newDelegate : previousLeafDelegate;
    const treeAccount = await import_spl_account_compression.ConcurrentMerkleTreeAccount.fromAccountAddress(
      Node.getConnection(),
      treeOwner
    );
    const canopyDepth = treeAccount.getCanopyDepth();
    const slicedProof = assetProof.proof.map((node) => ({
      pubkey: node.toPublicKey(),
      isSigner: false,
      isWritable: false
    })).slice(0, assetProof.proof.length - (canopyDepth ? canopyDepth : 0));
    return (0, import_mpl_bubblegum_instruction3.createDelegateInstruction)(
      {
        treeAuthority,
        leafOwner: ownership.owner.toPublicKey(),
        previousLeafDelegate,
        newLeafDelegate,
        merkleTree: assetProof.tree_id.toPublicKey(),
        logWrapper: import_spl_account_compression.SPL_NOOP_PROGRAM_ID,
        compressionProgram: import_spl_account_compression.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        anchorRemainingAccounts: slicedProof
      },
      {
        root: [...assetProof.root.trim().toPublicKey().toBytes()],
        dataHash: [...compression.data_hash.trim().toPublicKey().toBytes()],
        creatorHash: [
          ...compression.creator_hash.trim().toPublicKey().toBytes()
        ],
        nonce: compression.leaf_id,
        index: compression.leaf_id
      }
    );
  };
  CompressedNft10.setDelegate = async (mint, owner, options = {}) => {
    return Try(async () => {
      const newDelegate = options.delegate ? options.delegate.toPublicKey() : null;
      const inst = await (0, CompressedNft10.createDeleagate)(mint.toPublicKey(), newDelegate);
      return new TransactionBuilder7.Common([inst], [owner.toKeypair()]);
    });
  };
})(CompressedNft || (CompressedNft = {}));

// src/find.ts
var CompressedNft2;
((CompressedNft10) => {
  CompressedNft10.findByOwner = async (owner, options = {}) => {
    return Try(async () => {
      return await DasApi3.findByOwner(owner, true, options);
    });
  };
  CompressedNft10.findByMint = async (mint) => {
    return Try(async () => {
      return await DasApi3.findByMint(mint, true);
    });
  };
  CompressedNft10.findByCollection = async (collectionMint, options = {}) => {
    return Try(async () => {
      return DasApi3.findByCollection(collectionMint, true, options);
    });
  };
})(CompressedNft2 || (CompressedNft2 = {}));

// src/gas-less-delegate.ts
var import_web311 = require("@solana/web3.js");
var CompressedNft3;
((CompressedNft10) => {
  CompressedNft10.gasLessDelegate = async (mint, owner, newDelegate, options = {}) => {
    return Try(async () => {
      const inst = await CompressedNft.createDeleagate(
        mint.toPublicKey(),
        newDelegate.toPublicKey()
      );
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web311.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: newDelegate.toPublicKey()
      });
      tx.add(inst);
      if (options.isPriorityFee) {
        tx.add(
          await TransactionBuilder7.PriorityFee.createPriorityFeeInstruction(tx)
        );
      }
      tx.partialSign(owner.toKeypair());
      tx.recentBlockhash = blockhashObj.blockhash;
      return new TransactionBuilder7.PartialSign(
        tx.serialize({
          requireAllSignatures: false
        }).toString("hex")
      );
    });
  };
})(CompressedNft3 || (CompressedNft3 = {}));

// src/gas-less-transfer.ts
var import_web312 = require("@solana/web3.js");

// src/transfer.ts
var import_mpl_bubblegum_instruction4 = require("mpl-bubblegum-instruction");
var import_spl_account_compression2 = require("@solana/spl-account-compression");
var CompressedNft4;
((CompressedNft10) => {
  CompressedNft10.createTransfer = async (assetId, assetIdOwner, dest, delegate) => {
    const assetProof = await DasApi3.getAssetProof(assetId);
    if (assetProof.isErr) {
      throw assetProof.error;
    } else if (assetProof.isOk && assetProof.value.proof.length === 0) {
      throw Error("Proof is empty. May be set Regular NFT?");
    }
    const asset = await DasApi3.getAsset(assetId);
    if (asset.isErr) {
      throw asset.error;
    } else if (asset.isOk && asset.value.ownership.owner !== assetIdOwner) {
      throw Error(
        `NFT is not owned by the expected owner: current: ${asset.value.ownership.owner}, expected: ${assetIdOwner}`
      );
    }
    debugLog("# assetProof: ", assetProof.value);
    debugLog("# ownership: ", asset.value.ownership);
    debugLog("# authorities: ", asset.value.authorities);
    const compression = asset.value.compression;
    const ownership = asset.value.ownership;
    const proof = assetProof.value.proof;
    const merkleTree = compression.tree.toPublicKey();
    const treeAccount = await import_spl_account_compression2.ConcurrentMerkleTreeAccount.fromAccountAddress(
      Node.getConnection(),
      merkleTree
    );
    const treeAuthority = treeAccount.getAuthority();
    const canopyDepth = treeAccount.getCanopyDepth();
    const proofPath = proof.map((node) => ({
      pubkey: node.toPublicKey(),
      isSigner: false,
      isWritable: false
    })).slice(0, proof.length - (canopyDepth ? canopyDepth : 0));
    const leafOwner = ownership.owner.toPublicKey();
    const newLeafOwner = dest.toPublicKey();
    const leafNonce = compression.leaf_id;
    let leafDelegate;
    if (delegate) {
      leafDelegate = delegate.toPublicKey();
    } else {
      leafDelegate = ownership.delegate ? ownership.delegate.toPublicKey() : leafOwner;
    }
    return (0, import_mpl_bubblegum_instruction4.createTransferInstruction)(
      {
        merkleTree,
        treeAuthority,
        leafOwner,
        leafDelegate,
        newLeafOwner,
        logWrapper: import_spl_account_compression2.SPL_NOOP_PROGRAM_ID,
        compressionProgram: import_spl_account_compression2.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        anchorRemainingAccounts: proofPath
      },
      {
        root: [...assetProof.value.root.trim().toPublicKey().toBytes()],
        dataHash: [...compression.data_hash.trim().toPublicKey().toBytes()],
        creatorHash: [
          ...compression.creator_hash.trim().toPublicKey().toBytes()
        ],
        nonce: leafNonce,
        index: leafNonce
      }
    );
  };
  CompressedNft10.transfer = async (mint, owner, dest, ownerOrMultisig) => {
    return Try(async () => {
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const inst = await (0, CompressedNft10.createTransfer)(mint, owner, dest);
      return new TransactionBuilder7.Common([inst], keypairs);
    });
  };
})(CompressedNft4 || (CompressedNft4 = {}));

// src/gas-less-transfer.ts
var CompressedNft5;
((CompressedNft10) => {
  CompressedNft10.gasLessTransfer = async (mint, owner, dest, feePayer, options = {}) => {
    return Try(async () => {
      const delegate = await CompressedNft3.gasLessDelegate(mint, owner, feePayer);
      await delegate.submit();
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web312.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      tx.add(
        await CompressedNft4.createTransfer(
          mint,
          new Account4.Keypair({ secret: owner }).pubkey,
          dest,
          feePayer
        )
      );
      if (options.isPriorityFee) {
        tx.add(
          await TransactionBuilder7.PriorityFee.createPriorityFeeInstruction(tx)
        );
      }
      tx.recentBlockhash = blockhashObj.blockhash;
      return new TransactionBuilder7.PartialSign(
        tx.serialize({
          requireAllSignatures: false
        }).toString("hex")
      );
    });
  };
})(CompressedNft5 || (CompressedNft5 = {}));

// ../storage/src/provenance-layer.ts
var import_sdk = __toESM(require("@irys/sdk"));
var ProvenanceLayer;
((ProvenanceLayer2) => {
  const TOKEN = "solana";
  ProvenanceLayer2.uploadFile = async (uploadFile2, identity, tags) => {
    const irys = await (0, ProvenanceLayer2.getIrys)(identity);
    let receipt;
    if ((0, ProvenanceLayer2.isUploadable)(uploadFile2)) {
      receipt = await irys.uploadFile(uploadFile2, { tags });
    } else {
      throw Error("No match file type or enviroment");
    }
    return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
  };
  ProvenanceLayer2.uploadData = async (data, identity, tags) => {
    const irys = await (0, ProvenanceLayer2.getIrys)(identity);
    const receipt = await irys.upload(data, { tags });
    return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
  };
  ProvenanceLayer2.isNodeable = (value) => {
    if (isNode()) {
      return typeof value === "string";
    }
    return false;
  };
  ProvenanceLayer2.isBrowserable = (value) => {
    if (isBrowser()) {
      return value instanceof File;
    }
    return false;
  };
  ProvenanceLayer2.isUploadable = (value) => {
    if (isNode()) {
      return typeof value === "string";
    } else if (isBrowser()) {
      return value instanceof File;
    }
    return false;
  };
  ProvenanceLayer2.fundArweave = async (uploadFile2, identity) => {
    const irys = await (0, ProvenanceLayer2.getIrys)(identity);
    const byteLength = await (0, ProvenanceLayer2.toByteLength)(uploadFile2);
    const willPay = await calculateCost(byteLength, identity);
    const fundTx = await irys.fund(irys.utils.toAtomic(willPay));
    debugLog("# fundTx: ", fundTx);
  };
  ProvenanceLayer2.toByteLength = async (content) => {
    let length = 100;
    if ((0, ProvenanceLayer2.isNodeable)(content)) {
      length = (await import("fs")).readFileSync(content).length;
    } else if ((0, ProvenanceLayer2.isBrowserable)(content)) {
      length = content.size;
    } else {
      throw Error("No match content type");
    }
    return length;
  };
  ProvenanceLayer2.getIrys = async (identity) => {
    if (isNode()) {
      return await (0, ProvenanceLayer2.getNodeIrys)(identity);
    } else if (isBrowser()) {
      return await (0, ProvenanceLayer2.getBrowserIrys)(identity);
    } else {
      throw Error("Only Node.js or Browser");
    }
  };
  ProvenanceLayer2.getNodeIrys = async (secret) => {
    const clusterUrl = Constants.switchCluster({
      cluster: Constants.currentCluster
    });
    const url = Constants.BUNDLR_NETWORK_URL;
    const token = TOKEN;
    const key = secret;
    const irys = new import_sdk.default({
      url,
      token,
      key,
      config: { providerUrl: clusterUrl }
    });
    return irys;
  };
  ProvenanceLayer2.getBrowserIrys = async (provider) => {
    const clusterUrl = Constants.switchCluster({
      cluster: Constants.currentCluster
    });
    const url = Constants.BUNDLR_NETWORK_URL;
    const token = TOKEN;
    const wallet = { rpcUrl: clusterUrl, name: TOKEN, provider };
    const webIrys = new import_sdk.WebIrys({ url, token, wallet });
    await webIrys.ready();
    return webIrys;
  };
  const calculateCost = async (size, identity) => {
    const irys = await (0, ProvenanceLayer2.getIrys)(identity);
    const priceAtomic = await irys.getPrice(size);
    const priceConverted = irys.utils.fromAtomic(priceAtomic);
    debugLog("# size: ", size);
    debugLog(`# price: ${priceConverted}`);
    return priceConverted;
  };
})(ProvenanceLayer || (ProvenanceLayer = {}));

// ../storage/src/arweave.ts
var Arweave;
((Arweave2) => {
  Arweave2.uploadFile = (filePath, feePayer) => {
    return Try(async () => {
      debugLog("# upload file: ", filePath);
      await ProvenanceLayer.fundArweave(filePath, feePayer);
      return await ProvenanceLayer.uploadFile(filePath, feePayer);
    });
  };
  Arweave2.uploadData = (storageData, feePayer) => {
    return Try(async () => {
      storageData.created_at = unixTimestamp();
      debugLog("# Will upload offchain: ", storageData);
      return await ProvenanceLayer.uploadData(
        JSON.stringify(storageData),
        feePayer
      );
    });
  };
})(Arweave || (Arweave = {}));

// ../storage/src/nft-storage.ts
var import_nft2 = require("nft.storage");
var NftStorage;
((NftStorage2) => {
  const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
  const connect = () => {
    return new import_nft2.NFTStorage({ token: Constants.NFT_STORAGE_API_KEY });
  };
  NftStorage2.uploadFile = async (fileType) => {
    return Try(async () => {
      debugLog("# upload content: ", fileType);
      let file;
      if (ProvenanceLayer.isNodeable(fileType)) {
        file = (await import("fs")).readFileSync(fileType);
      } else if (ProvenanceLayer.isBrowserable(fileType)) {
        file = Buffer.from(await fileType.arrayBuffer());
      } else {
        file = Buffer.from(fileType);
      }
      const blobImage = new import_nft2.Blob([file]);
      const res = await connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    });
  };
  NftStorage2.uploadData = async (storageData) => {
    return Try(async () => {
      storageData.created_at = unixTimestamp();
      debugLog("# Will upload offchain: ", storageData);
      const blobJson = new import_nft2.Blob([JSON.stringify(storageData)]);
      const res = await connect().storeBlob(blobJson);
      return createGatewayUrl(res);
    });
  };
})(NftStorage || (NftStorage = {}));

// ../storage/src/storage.ts
var Storage;
((Storage2) => {
  Storage2.toConvertOffchaindata = (input, sellerFeeBasisPoints) => {
    const data = {
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      seller_fee_basis_points: sellerFeeBasisPoints,
      external_url: input.external_url,
      attributes: input.attributes,
      properties: input.properties,
      image: "",
      options: input.options
    };
    return data;
  };
  Storage2.uploadFile = async (filePath, storageType, feePayer) => {
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      return await Arweave.uploadFile(filePath, feePayer);
    } else if (storageType === "nftStorage") {
      return await NftStorage.uploadFile(filePath);
    } else {
      throw Error("Not found storageType");
    }
  };
  Storage2.uploadData = async (input, storageType, feePayer) => {
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      return await Arweave.uploadData(input, feePayer);
    } else if (storageType === "nftStorage") {
      return await NftStorage.uploadData(input);
    } else {
      throw Error("Not found storageType");
    }
  };
  Storage2.upload = async (input, filePath, storageType, feePayer) => {
    if (storageType === "arweave" && !feePayer) {
      throw Error("Arweave needs to have feepayer");
    }
    const storage = await (await (0, Storage2.uploadFile)(filePath, storageType, feePayer)).unwrap(
      async (ok) => {
        input.image = ok;
        return await (0, Storage2.uploadData)(input, storageType, feePayer);
      },
      (err) => {
        throw err;
      }
    );
    if (!storage) {
      throw Error("Empty storage object");
    }
    return storage;
  };
})(Storage || (Storage = {}));

// ../validator/src/index.ts
var Validator;
((Validator2) => {
  let Message;
  ((Message2) => {
    Message2.SUCCESS = "success";
    Message2.SMALL_NUMBER = "too small";
    Message2.BIG_NUMBER = "too big";
    Message2.LONG_LENGTH = "too long";
    Message2.EMPTY = "invalid empty value";
    Message2.INVALID_URL = "invalid url";
    Message2.ONLY_NODE_JS = "`string` type is only Node.js";
  })(Message = Validator2.Message || (Validator2.Message = {}));
  Validator2.NAME_LENGTH = 32;
  Validator2.SYMBOL_LENGTH = 10;
  Validator2.URL_LENGTH = 200;
  Validator2.ROYALTY_MAX = 100;
  Validator2.SELLER_FEE_BASIS_POINTS_MAX = 1e4;
  Validator2.ROYALTY_MIN = 0;
  Validator2.isRoyalty = (royalty) => {
    return Try(() => {
      const key = "royalty";
      if (royalty !== 0 && !royalty) {
        throw createError(key, Message.EMPTY, royalty);
      }
      if (royalty < Validator2.ROYALTY_MIN) {
        throw createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MIN,
          condition: "underMin"
        });
      } else if (royalty > Validator2.ROYALTY_MAX) {
        throw createError(key, Message.BIG_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MAX,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isSellerFeeBasisPoints = (royalty) => {
    return Try(() => {
      const key = "sellerFeeBasisPoints/seller_fee_basis_points";
      if (royalty !== 0 && !royalty) {
        throw createError(key, Message.EMPTY, royalty);
      }
      if (royalty < Validator2.ROYALTY_MIN) {
        throw createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MIN,
          condition: "underMin"
        });
      } else if (royalty > Validator2.ROYALTY_MAX * Converter14.Royalty.THRESHOLD) {
        throw createError(key, Message.BIG_NUMBER, royalty, {
          threshold: Validator2.SELLER_FEE_BASIS_POINTS_MAX,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isName = (name) => {
    return Try(() => {
      const key = "name";
      if (!name) {
        throw createError(key, Message.EMPTY, name);
      }
      if (byteLength(name) > Validator2.NAME_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, name, {
          threshold: Validator2.NAME_LENGTH,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isSymbol = (symbol) => {
    return Try(() => {
      const key = "symbol";
      if (!symbol) {
        throw createError(key, Message.EMPTY, symbol);
      }
      if (byteLength(symbol) > Validator2.SYMBOL_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, symbol, {
          threshold: Validator2.SYMBOL_LENGTH,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isImageUrl = (image) => isUriOrImage(image, "image");
  Validator2.checkAll = (metadata) => {
    return Try(() => {
      const keys = Object.keys(metadata);
      const results = [];
      keys.map((key) => {
        let res;
        switch (key) {
          case "image":
            if (key in metadata && metadata.image) {
              res = (0, Validator2.isImageUrl)(metadata.image);
            }
            break;
          case "royalty":
            if (key in metadata && metadata.royalty) {
              res = (0, Validator2.isRoyalty)(metadata.royalty);
            }
            break;
          case "seller_fee_basis_points":
            if (key in metadata && metadata.seller_fee_basis_points) {
              res = (0, Validator2.isSellerFeeBasisPoints)(metadata.seller_fee_basis_points);
            }
            break;
          case "sellerFeeBasisPoints":
            if (key in metadata) {
              res = (0, Validator2.isSellerFeeBasisPoints)(metadata.sellerFeeBasisPoints);
            }
            break;
          case "name":
            if (metadata.name) {
              res = (0, Validator2.isName)(metadata.name);
            }
            break;
          case "symbol":
            if (metadata.symbol) {
              res = (0, Validator2.isSymbol)(metadata.symbol);
            }
            break;
        }
        if (res && res.isErr) {
          results.push(...res.error.details);
        }
      });
      if (results.length > 0) {
        const message = "Caught in the validation errors. see information e.g: err<ValidatorError>.details";
        throw new ValidatorError(message, results);
      }
      return Message.SUCCESS;
    });
  };
  const byteLength = (value) => {
    const text = new TextEncoder();
    return text.encode(value).length;
  };
  const createError = (key, message, actual, limit) => {
    let error;
    if (limit) {
      error = new ValidatorError(message, [{ key, message, actual, limit }]);
    } else {
      error = new ValidatorError(message, [{ key, message, actual }]);
    }
    return error;
  };
  const isUriOrImage = (imageOrUri, key) => {
    return Try(() => {
      if (!imageOrUri) {
        throw createError(key, Message.EMPTY, imageOrUri);
      }
      if (byteLength(imageOrUri) > Validator2.URL_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, imageOrUri, {
          threshold: Validator2.URL_LENGTH,
          condition: "overMax"
        });
      }
      if (!/https?:\/\/[-_.!~*\\()a-zA-Z0-9;?:&=+,%#]+/g.test(imageOrUri)) {
        throw createError(key, Message.INVALID_URL, imageOrUri);
      }
      return Message.SUCCESS;
    });
  };
})(Validator || (Validator = {}));
var ValidatorError = class extends Error {
  details;
  constructor(message, details) {
    super(message);
    this.details = details;
  }
};

// src/space.ts
var import_spl_account_compression3 = require("@solana/spl-account-compression");
var import_web313 = require("@solana/web3.js");
var import_mpl_bubblegum_instruction5 = require("mpl-bubblegum-instruction");
var CompressedNft6;
((CompressedNft10) => {
  class Space {
    spaceOwner;
    constructor(spaceOwner) {
      this.spaceOwner = spaceOwner;
    }
    getAssetId = async () => {
      const treeAccount = await import_spl_account_compression3.ConcurrentMerkleTreeAccount.fromAccountAddress(
        Node.getConnection(),
        this.spaceOwner.toPublicKey()
      );
      const leafIndex = treeAccount.tree.rightMostPath.index - 1;
      return Account4.Pda.getAssetId(this.spaceOwner, leafIndex);
    };
  }
  CompressedNft10.Space = Space;
  CompressedNft10.initSpace = (owner, maxDepth, maxBufferSize, canopyDepth, options = {}) => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : owner;
      const treeOwner = Account4.Keypair.create();
      const space = (0, import_spl_account_compression3.getConcurrentMerkleTreeAccountSize)(
        maxDepth,
        maxBufferSize,
        canopyDepth
      );
      const [treeAuthority] = import_web313.PublicKey.findProgramAddressSync(
        [treeOwner.toKeypair().publicKey.toBuffer()],
        import_mpl_bubblegum_instruction5.PROGRAM_ADDRESS.toPublicKey()
      );
      const instructions = [];
      debugLog(`# maxDepth: ${maxDepth}, maxBufferSize: ${maxBufferSize}`);
      debugLog("# nft space: ", space);
      if (Constants.isDebugging === "true" || process.env.DEBUG === "true") {
        debugLog("# space cost: ", await (0, CompressedNft10.calculateSpaceCost)(space));
      }
      instructions.push(
        import_web313.SystemProgram.createAccount({
          fromPubkey: payer.toKeypair().publicKey,
          newAccountPubkey: treeOwner.toKeypair().publicKey,
          lamports: await Node.getConnection().getMinimumBalanceForRentExemption(space),
          space,
          programId: import_spl_account_compression3.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID
        })
      );
      instructions.push(
        (0, import_mpl_bubblegum_instruction5.createCreateTreeInstruction)(
          {
            merkleTree: treeOwner.toKeypair().publicKey,
            treeAuthority,
            treeCreator: owner.toKeypair().publicKey,
            payer: payer.toKeypair().publicKey,
            logWrapper: import_spl_account_compression3.SPL_NOOP_PROGRAM_ID,
            compressionProgram: import_spl_account_compression3.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID
          },
          {
            maxBufferSize,
            maxDepth,
            public: false
          },
          import_mpl_bubblegum_instruction5.PROGRAM_ADDRESS.toPublicKey()
        )
      );
      return new TransactionBuilder7.Mint(
        instructions,
        [treeOwner.toKeypair(), owner.toKeypair()],
        payer.toKeypair(),
        treeOwner.pubkey
      );
    });
  };
  CompressedNft10.createSpace = async (owner, spaceSize, options = {}) => {
    const { maxDepth, maxBufferSize, canopyDepth } = calculateSpaceNumberToDepth(spaceSize);
    return (0, CompressedNft10.initSpace)(owner, maxDepth, maxBufferSize, canopyDepth, options);
  };
  CompressedNft10.calculateSpaceCost = async (spaceSize) => {
    const { maxDepth, maxBufferSize, canopyDepth } = calculateSpaceNumberToDepth(spaceSize);
    const requiredSpace = (0, import_spl_account_compression3.getConcurrentMerkleTreeAccountSize)(
      maxDepth,
      maxBufferSize,
      canopyDepth
    );
    const lamports = await Node.getConnection().getMinimumBalanceForRentExemption(
      requiredSpace
    );
    return { sol: lamports.toSol() };
  };
  const calculateSpaceNumberToDepth = (space) => {
    const log2 = Math.ceil(Math.log2(space));
    debugLog("# log2: ", log2, 2 ** log2);
    const matched = import_spl_account_compression3.ALL_DEPTH_SIZE_PAIRS.filter(
      (pair) => pair.maxDepth === log2
    )[0];
    const canopyDepth = matched.maxDepth - 5;
    return {
      maxDepth: matched.maxDepth,
      maxBufferSize: matched.maxBufferSize,
      canopyDepth
    };
  };
})(CompressedNft6 || (CompressedNft6 = {}));

// src/mint.ts
var import_mpl_bubblegum_instruction6 = require("mpl-bubblegum-instruction");
var import_spl_account_compression4 = require("@solana/spl-account-compression");
var import_mpl_token_metadata2 = require("@metaplex-foundation/mpl-token-metadata");
var CompressedNft7;
((CompressedNft10) => {
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  CompressedNft10.createVerifyCreator = async (creators, assetId, treeOwner, metadata, feePayer) => {
    const rpcAssetProof = await DasApi3.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi3.getAsset(assetId.toString());
    if (rpcAssetProof.isErr || rpcAsset.isErr) {
      throw Error("Rise error when get asset proof or asset");
    }
    const compression = rpcAsset.value.compression;
    const ownership = rpcAsset.value.ownership;
    const assetProof = rpcAssetProof.value;
    const treeAccount = await import_spl_account_compression4.ConcurrentMerkleTreeAccount.fromAccountAddress(
      Node.getConnection(),
      treeOwner
    );
    const canopyDepth = treeAccount.getCanopyDepth();
    const slicedProof = assetProof.proof.map((node) => ({
      pubkey: node.toPublicKey(),
      isSigner: false,
      isWritable: false
    })).slice(0, assetProof.proof.length - (canopyDepth ? canopyDepth : 0));
    return (0, import_mpl_bubblegum_instruction6.createVerifyCreatorInstruction)(
      {
        treeAuthority: treeOwner,
        leafOwner: ownership.owner.toPublicKey(),
        leafDelegate: (ownership.delegate || ownership.owner).toPublicKey(),
        merkleTree: assetProof.tree_id.toPublicKey(),
        payer: feePayer,
        logWrapper: import_spl_account_compression4.SPL_NOOP_PROGRAM_ID,
        compressionProgram: import_spl_account_compression4.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        creator: feePayer,
        // provide the sliced proof
        anchorRemainingAccounts: slicedProof
      },
      {
        root: [...assetProof.root.trim().toPublicKey().toBytes()],
        creatorHash: [...(0, import_mpl_bubblegum_instruction6.computeCreatorHash)(creators)],
        dataHash: [...(0, import_mpl_bubblegum_instruction6.computeDataHash)(metadata)],
        nonce: compression.leaf_id,
        index: compression.leaf_id,
        message: metadata
      }
    );
  };
  CompressedNft10.mint = async (owner, input, spaceOwner, collectionMint, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, receiver, delegate } = options;
      const payer = feePayer ? feePayer : owner;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const ownerPublicKey = owner.toKeypair().publicKey;
      const leafOwner = receiver ? receiver.toPublicKey() : ownerPublicKey;
      const leafDelegate = delegate ? delegate : new Account4.Keypair({ secret: payer }).pubkey;
      const treeAuthority = Account4.Pda.getTreeAuthority(
        spaceOwner.toPublicKey().toString()
      );
      const collectionMetadata = Account4.Pda.getMetadata(
        collectionMint.toString()
      );
      const collectionMasterEditionAccount = Account4.Pda.getMasterEdition(
        collectionMint.toString()
      );
      const bubblegumSigner = Account4.Pda.getBgumSigner();
      let properties;
      if (input.properties) {
        properties = await Converter14.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType,
          payer
        );
      }
      input = {
        ...input,
        properties,
        storageType
      };
      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter14.Royalty.intoInfra(royalty);
      const storageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints
      );
      let uri;
      if (input.filePath) {
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
          payer
        );
        debugLog("# upload content url: ", uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          payer
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }
      const converted = Converter14.CompressedNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );
      const metadataArgs = {
        ...converted,
        collection: { key: collectionMint.toPublicKey(), verified: false }
      };
      debugLog("# input: ", input);
      debugLog("# metadataArgs: ", metadataArgs);
      const instructions = [];
      instructions.push(
        (0, import_mpl_bubblegum_instruction6.createMintToCollectionV1Instruction)(
          {
            merkleTree: spaceOwner.toPublicKey(),
            treeAuthority,
            treeDelegate: ownerPublicKey,
            payer: payer.toKeypair().publicKey,
            leafOwner,
            // receiver
            leafDelegate: leafDelegate.toPublicKey(),
            collectionAuthority: ownerPublicKey,
            collectionMint: collectionMint.toPublicKey(),
            collectionMetadata,
            editionAccount: collectionMasterEditionAccount,
            bubblegumSigner,
            logWrapper: import_spl_account_compression4.SPL_NOOP_PROGRAM_ID,
            collectionAuthorityRecordPda: import_mpl_bubblegum_instruction6.PROGRAM_ID,
            compressionProgram: import_spl_account_compression4.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            tokenMetadataProgram: import_mpl_token_metadata2.PROGRAM_ID
          },
          {
            metadataArgs
          }
        )
      );
      if (input.creators) {
        const assetId = await new CompressedNft6.Space(spaceOwner).getAssetId();
        instructions.push(
          await (0, CompressedNft10.createVerifyCreator)(
            metadataArgs.creators,
            assetId.toPublicKey(),
            spaceOwner.toPublicKey(),
            metadataArgs,
            payer.toKeypair().publicKey
          )
        );
      }
      return new TransactionBuilder7.Mint(
        instructions,
        [owner.toKeypair()],
        payer.toKeypair(),
        new CompressedNft6.Space(spaceOwner)
      );
    });
  };
})(CompressedNft7 || (CompressedNft7 = {}));

// ../suite-spl-token/src/add.ts
var import_spl_token2 = require("@solana/spl-token");

// ../suite-spl-token/src/calculate-amount.ts
var SplToken;
((SplToken11) => {
  SplToken11.calculateAmount = (amount, mintDecimal) => {
    return amount * 10 ** mintDecimal;
  };
})(SplToken || (SplToken = {}));

// ../suite-spl-token/src/add.ts
var SplToken2;
((SplToken11) => {
  SplToken11.add = async (token, owner, ownerOrMultisig, totalAmount, mintDecimal, options = {}) => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const associated = await Account4.Associated.makeOrCreateInstruction(
        token,
        owner,
        payer
      );
      const inst = (0, import_spl_token2.createMintToCheckedInstruction)(
        token.toPublicKey(),
        associated.tokenAccount.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        keypairs
      );
      const instructions = associated.inst ? [associated.inst, inst] : [inst];
      return new TransactionBuilder7.Common(
        instructions,
        keypairs,
        payer.toKeypair(),
        token
      );
    });
  };
})(SplToken2 || (SplToken2 = {}));

// ../suite-spl-token/src/burn.ts
var import_spl_token3 = require("@solana/spl-token");
var SplToken3;
((SplToken11) => {
  SplToken11.burn = (mint, owner, ownerOrMultisig, burnAmount, tokenDecimals, options = {}) => {
    return Try(() => {
      const tokenAccount = (0, import_spl_token3.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const inst = (0, import_spl_token3.createBurnCheckedInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs
      );
      return new TransactionBuilder7.Common([inst], keypairs, payer.toKeypair());
    });
  };
})(SplToken3 || (SplToken3 = {}));

// ../suite-spl-token/src/find.ts
var import_mpl_token_metadata3 = require("@metaplex-foundation/mpl-token-metadata");
var import_spl_token4 = require("@solana/spl-token");
var import_cross_fetch = __toESM(require("cross-fetch"));
var SplToken4;
((SplToken11) => {
  const MAX_RETRIES2 = 10;
  const RETRY_DELAY = 5;
  const NFTSTORAGE_GATEWAY = "nftstorage.link";
  const converter = (metadata, json, tokenAmount) => {
    return Converter14.TokenMetadata.intoUser(
      {
        onchain: metadata,
        offchain: json
      },
      tokenAmount
    );
  };
  const fetchRetry = async (url, retries = 0) => {
    try {
      const response = await (0, import_cross_fetch.default)(url.replace("ipfs.io", NFTSTORAGE_GATEWAY));
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (retries < MAX_RETRIES2) {
        debugLog(`Error fetching data from ${url}, ${retries}, ${error}`);
        await sleep(RETRY_DELAY);
        return fetchRetry(url, retries + 1);
      } else {
        debugLog(`Max retries reached (${MAX_RETRIES2})`);
      }
    }
  };
  SplToken11.findByOwner = async (owner) => {
    return Try(async () => {
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: import_spl_token4.TOKEN_PROGRAM_ID
        }
      );
      const datas = info.value.map(async (d) => {
        const mint = d.account.data.parsed.info.mint;
        const tokenAmount = d.account.data.parsed.info.tokenAmount.amount;
        if (tokenAmount === "1") {
          return;
        }
        return import_mpl_token_metadata3.Metadata.fromAccountAddress(
          connection,
          Account4.Pda.getMetadata(mint)
        ).then(async (metadata) => {
          return fetchRetry(metadata.data.uri).then((json) => {
            return converter(metadata, json, tokenAmount);
          });
        }).catch((err) => debugLog("# [Fetch error]", err));
      });
      const filters = (await Promise.all(datas)).filter(
        (data) => data !== void 0
      );
      return filters;
    });
  };
  SplToken11.findByMint = async (mint) => {
    return Try(async () => {
      const connection = Node.getConnection();
      const metadata = await import_mpl_token_metadata3.Metadata.fromAccountAddress(
        connection,
        Account4.Pda.getMetadata(mint)
      );
      debugLog("# findByMint metadata: ", metadata);
      if (metadata.tokenStandard === 0) {
        throw Error(
          `This mint is not SPL-TOKEN, tokenStandard:${metadata.tokenStandard}`
        );
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data).parsed.info.supply;
      const response = await (await (0, import_cross_fetch.default)(metadata.data.uri)).json();
      return converter(metadata, response, tokenAmount);
    });
  };
})(SplToken4 || (SplToken4 = {}));

// ../suite-spl-token/src/freeze.ts
var import_spl_token5 = require("@solana/spl-token");
var SplToken5;
((SplToken11) => {
  SplToken11.freeze = (mint, owner, freezeAuthority, options = {}) => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = (0, import_spl_token5.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = (0, import_spl_token5.createFreezeAccountInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        new Account4.Keypair({ secret: freezeAuthority }).toPublicKey()
      );
      return new TransactionBuilder7.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// ../suite-spl-token/src/gas-less-transfer.ts
var import_spl_token6 = require("@solana/spl-token");
var import_web314 = require("@solana/web3.js");
var SplToken6;
((SplToken11) => {
  SplToken11.gasLessTransfer = async (mint, owner, dest, amount, mintDecimal, feePayer, options = {}) => {
    return Try(async () => {
      const ownerPublicKey = owner.toKeypair().publicKey;
      const sourceToken = await Account4.Associated.makeOrCreateInstruction(
        mint,
        ownerPublicKey.toString(),
        feePayer
      );
      const destToken = await Account4.Associated.makeOrCreateInstruction(
        mint,
        dest,
        feePayer
      );
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web314.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      const inst2 = (0, import_spl_token6.createTransferCheckedInstruction)(
        sourceToken.tokenAccount.toPublicKey(),
        mint.toPublicKey(),
        destToken.tokenAccount.toPublicKey(),
        ownerPublicKey,
        SplToken.calculateAmount(amount, mintDecimal),
        mintDecimal,
        [owner.toKeypair()]
      );
      if (!destToken.inst) {
        tx.add(inst2);
      } else {
        tx.add(destToken.inst).add(inst2);
      }
      if (options.isPriorityFee) {
        tx.add(
          await TransactionBuilder7.PriorityFee.createPriorityFeeInstruction(tx)
        );
      }
      tx.recentBlockhash = blockhashObj.blockhash;
      tx.partialSign(owner.toKeypair());
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new TransactionBuilder7.PartialSign(hex);
    });
  };
})(SplToken6 || (SplToken6 = {}));

// ../suite-spl-token/src/mint.ts
var import_web315 = require("@solana/web3.js");
var import_spl_token7 = require("@solana/spl-token");
var import_mpl_token_metadata4 = require("@metaplex-foundation/mpl-token-metadata");
var SplToken7;
((SplToken11) => {
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  SplToken11.createFreezeAuthority = (mint2, owner, freezeAuthority) => {
    return (0, import_spl_token7.createSetAuthorityInstruction)(
      mint2,
      owner,
      import_spl_token7.AuthorityType.FreezeAccount,
      freezeAuthority
    );
  };
  SplToken11.createMint = async (mint2, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => {
    const connection = Node.getConnection();
    const lamports = await (0, import_spl_token7.getMinimumBalanceForRentExemptMint)(connection);
    const metadataPda = Account4.Pda.getMetadata(mint2.toString());
    const tokenAssociated = (0, import_spl_token7.getAssociatedTokenAddressSync)(mint2, owner);
    const instructions = [];
    instructions.push(
      import_web315.SystemProgram.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: mint2,
        space: import_spl_token7.MINT_SIZE,
        lamports,
        programId: import_spl_token7.TOKEN_PROGRAM_ID
      })
    );
    instructions.push(
      (0, import_spl_token7.createInitializeMintInstruction)(
        mint2,
        mintDecimal,
        owner,
        owner,
        import_spl_token7.TOKEN_PROGRAM_ID
      )
    );
    instructions.push(
      (0, import_spl_token7.createAssociatedTokenAccountInstruction)(
        feePayer,
        tokenAssociated,
        owner,
        mint2
      )
    );
    instructions.push(
      (0, import_spl_token7.createMintToCheckedInstruction)(
        mint2,
        tokenAssociated,
        owner,
        SplToken.calculateAmount(totalAmount, mintDecimal),
        mintDecimal
      )
    );
    instructions.push(
      (0, import_mpl_token_metadata4.createCreateMetadataAccountV3Instruction)(
        {
          metadata: metadataPda,
          mint: mint2,
          mintAuthority: owner,
          payer: feePayer,
          updateAuthority: owner
        },
        {
          createMetadataAccountArgsV3: {
            data: tokenMetadata,
            isMutable,
            collectionDetails: null
          }
        }
      )
    );
    return instructions;
  };
  SplToken11.mint = async (owner, totalAmount, mintDecimal, input, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, freezeAuthority } = options;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const payer = feePayer ? feePayer : owner;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const ownerPublicKey = owner.toKeypair().publicKey;
      const storageMetadata = Storage.toConvertOffchaindata(
        input,
        input.royalty
      );
      let uri;
      if (input.filePath) {
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
          payer
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          payer
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }
      const isMutable = true;
      const datav2 = Converter14.TokenMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );
      debugLog("# datav2: ", datav2);
      debugLog("# upload content url: ", uri);
      const mint2 = Account4.Keypair.create();
      const insts = await (0, SplToken11.createMint)(
        mint2.toPublicKey(),
        ownerPublicKey,
        totalAmount,
        mintDecimal,
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );
      if (freezeAuthority) {
        insts.push(
          (0, SplToken11.createFreezeAuthority)(
            mint2.toPublicKey(),
            ownerPublicKey,
            freezeAuthority.toPublicKey()
          )
        );
      }
      return new TransactionBuilder7.Mint(
        insts,
        [owner.toKeypair(), mint2.toKeypair()],
        payer.toKeypair(),
        mint2.pubkey
      );
    });
  };
})(SplToken7 || (SplToken7 = {}));

// ../suite-spl-token/src/thaw.ts
var import_spl_token8 = require("@solana/spl-token");
var SplToken8;
((SplToken11) => {
  SplToken11.thaw = (mint, owner, freezeAuthority, options = {}) => {
    const payer = options.feePayer ? options.feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = (0, import_spl_token8.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = (0, import_spl_token8.createThawAccountInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        new Account4.Keypair({ secret: freezeAuthority }).toPublicKey()
      );
      return new TransactionBuilder7.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken8 || (SplToken8 = {}));

// ../suite-spl-token/src/transfer.ts
var import_spl_token9 = require("@solana/spl-token");
var SplToken9;
((SplToken11) => {
  SplToken11.transfer = async (mint, owner, dest, ownerOrMultisig, amount, mintDecimal, options = {}) => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const payerPubkey = new Account4.Keypair({ secret: payer });
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const sourceToken = await Account4.Associated.makeOrCreateInstruction(
        mint,
        owner.toString(),
        payerPubkey.pubkey
      );
      const destToken = await Account4.Associated.makeOrCreateInstruction(
        mint,
        dest,
        payerPubkey.pubkey
      );
      const inst = (0, import_spl_token9.createTransferCheckedInstruction)(
        sourceToken.tokenAccount.toPublicKey(),
        mint.toPublicKey(),
        destToken.tokenAccount.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(amount, mintDecimal),
        mintDecimal,
        keypairs
      );
      const instructions = destToken.inst ? [destToken.inst, inst] : [inst];
      return new TransactionBuilder7.Common(
        instructions,
        keypairs,
        payer.toKeypair()
      );
    });
  };
})(SplToken9 || (SplToken9 = {}));

// ../suite-spl-token/src/index.ts
var SplToken10 = {
  ...SplToken2,
  ...SplToken3,
  ...SplToken4,
  ...SplToken5,
  ...SplToken6,
  ...SplToken7,
  ...SplToken8,
  ...SplToken9
};

// ../suite-regular-nft/src/burn.ts
var RegularNft;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  RegularNft11.burn = (mint, owner, ownerOrMultisig, options = {}) => {
    const feePayer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
    return SplToken10.burn(
      mint,
      owner,
      ownerOrMultisig,
      NFT_AMOUNT,
      NFT_DECIMALS,
      {
        feePayer
      }
    );
  };
})(RegularNft || (RegularNft = {}));

// ../suite-regular-nft/src/find.ts
var RegularNft2;
((RegularNft11) => {
  RegularNft11.findByOwner = async (owner, options = {}) => {
    return Try(async () => {
      return await DasApi3.findByOwner(owner, false, options);
    });
  };
  RegularNft11.findByMint = async (mint) => {
    return Try(async () => {
      return await DasApi3.findByMint(mint, false);
    });
  };
  RegularNft11.findByCollection = async (collectionMint, options = {}) => {
    return Try(async () => {
      return DasApi3.findByCollection(collectionMint, false, options);
    });
  };
})(RegularNft2 || (RegularNft2 = {}));

// ../suite-regular-nft/src/freeze.ts
var import_spl_token10 = require("@solana/spl-token");
var import_mpl_token_metadata5 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft3;
((RegularNft11) => {
  RegularNft11.freeze = (mint, owner, freezeAuthority, options = {}) => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = (0, import_spl_token10.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = Account4.Pda.getMasterEdition(mint);
      const inst = (0, import_mpl_token_metadata5.createFreezeDelegatedAccountInstruction)({
        delegate: new Account4.Keypair({
          secret: freezeAuthority
        }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new TransactionBuilder7.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(RegularNft3 || (RegularNft3 = {}));

// ../suite-regular-nft/src/mint.ts
var import_web316 = require("@solana/web3.js");
var import_spl_token11 = require("@solana/spl-token");
var import_mpl_token_metadata6 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft4;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  RegularNft11.createVerifyCreator = (mint2, creator) => {
    const metadata = Account4.Pda.getMetadata(mint2.toString());
    return (0, import_mpl_token_metadata6.createSignMetadataInstruction)({
      metadata,
      creator
    });
  };
  RegularNft11.createDeleagate = (mint2, owner, delegateAuthority) => {
    const tokenAccount = (0, import_spl_token11.getAssociatedTokenAddressSync)(mint2, owner);
    return (0, import_spl_token11.createApproveInstruction)(
      tokenAccount,
      delegateAuthority,
      owner,
      NFT_AMOUNT
    );
  };
  RegularNft11.createVerifySizedCollection = (collectionChild, collectionParent, feePayer) => {
    const collectionMetadata = Account4.Pda.getMetadata(
      collectionParent.toString()
    );
    const collectionMasterEditionAccount = Account4.Pda.getMasterEdition(
      collectionParent.toString()
    );
    return (0, import_mpl_token_metadata6.createVerifySizedCollectionItemInstruction)({
      collection: collectionMetadata,
      collectionMasterEditionAccount,
      collectionMint: collectionParent,
      metadata: Account4.Pda.getMetadata(collectionChild.toString()),
      payer: feePayer,
      collectionAuthority: feePayer
    });
  };
  RegularNft11.createMint = async (mint2, owner, nftMetadata, feePayer, isMutable) => {
    const ata = (0, import_spl_token11.getAssociatedTokenAddressSync)(mint2, owner);
    const tokenMetadataPubkey = Account4.Pda.getMetadata(mint2.toString());
    const masterEditionPubkey = Account4.Pda.getMasterEdition(mint2.toString());
    const connection = Node.getConnection();
    const instructions = [];
    instructions.push(
      import_web316.SystemProgram.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: mint2,
        lamports: await (0, import_spl_token11.getMinimumBalanceForRentExemptMint)(connection),
        space: import_spl_token11.MINT_SIZE,
        programId: import_spl_token11.TOKEN_PROGRAM_ID
      })
    );
    instructions.push((0, import_spl_token11.createInitializeMintInstruction)(mint2, 0, owner, owner));
    instructions.push(
      (0, import_spl_token11.createAssociatedTokenAccountInstruction)(feePayer, ata, owner, mint2)
    );
    instructions.push((0, import_spl_token11.createMintToCheckedInstruction)(mint2, ata, owner, 1, 0));
    instructions.push(
      (0, import_mpl_token_metadata6.createCreateMetadataAccountV3Instruction)(
        {
          metadata: tokenMetadataPubkey,
          mint: mint2,
          mintAuthority: owner,
          payer: feePayer,
          updateAuthority: owner
        },
        {
          createMetadataAccountArgsV3: {
            data: nftMetadata,
            isMutable,
            collectionDetails: null
          }
        }
      )
    );
    instructions.push(
      (0, import_mpl_token_metadata6.createCreateMasterEditionV3Instruction)(
        {
          edition: masterEditionPubkey,
          mint: mint2,
          updateAuthority: owner,
          mintAuthority: owner,
          payer: feePayer,
          metadata: tokenMetadataPubkey
        },
        {
          createMasterEditionArgs: {
            maxSupply: 0
          }
        }
      )
    );
    return instructions;
  };
  RegularNft11.mint = async (owner, input, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, freezeAuthority } = options;
      const payer = feePayer ? feePayer : owner;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const ownerPublicKey = owner.toKeypair().publicKey;
      let properties;
      if (input.properties) {
        properties = await Converter14.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType,
          payer
        );
      }
      input = {
        ...input,
        properties,
        storageType
      };
      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter14.Royalty.intoInfra(royalty);
      const storageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints
      );
      let uri;
      if (input.filePath) {
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
          payer
        );
        debugLog("# upload content url: ", uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          payer
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }
      const datav2 = Converter14.RegularNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      debugLog("# input: ", input);
      debugLog("# datav2: ", datav2);
      const mint2 = Account4.Keypair.create();
      const instructions = await (0, RegularNft11.createMint)(
        mint2.toPublicKey(),
        ownerPublicKey,
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );
      if (freezeAuthority) {
        instructions.push(
          (0, RegularNft11.createDeleagate)(
            mint2.toPublicKey(),
            ownerPublicKey,
            freezeAuthority.toPublicKey()
          )
        );
      }
      if (input.collection) {
        instructions.push(
          (0, RegularNft11.createVerifySizedCollection)(
            mint2.toPublicKey(),
            input.collection.toPublicKey(),
            payer.toKeypair().publicKey
          )
        );
      }
      const keypairs = [owner.toKeypair(), mint2.toKeypair()];
      if (input.creators) {
        input.creators.forEach((creator) => {
          if (Account4.Keypair.isSecret(creator.secret)) {
            const creatorPubkey = creator.address.toPublicKey();
            const inst = (0, RegularNft11.createVerifyCreator)(mint2.toPublicKey(), creatorPubkey);
            instructions.push(inst);
            keypairs.push(creator.secret.toKeypair());
          }
        });
      }
      return new TransactionBuilder7.Mint(
        instructions,
        keypairs,
        payer.toKeypair(),
        mint2.pubkey
      );
    });
  };
})(RegularNft4 || (RegularNft4 = {}));

// ../suite-regular-nft/src/gas-less-mint.ts
var import_web317 = require("@solana/web3.js");
var RegularNft5;
((RegularNft11) => {
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  RegularNft11.gasLessMint = async (owner, input, feePayer, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter14.Royalty.intoInfra(royalty);
      const ownerPublickey = owner.toKeypair().publicKey;
      let uri = "";
      if (input.filePath) {
        const properties = await Converter14.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType
        );
        const storageMetadata = Storage.toConvertOffchaindata(
          { ...input, properties },
          sellerFeeBasisPoints
        );
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
        debugLog("# upload content url: ", uploaded);
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }
      let datav2 = Converter14.RegularNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );
      let collection;
      if (input.collection && input.collection) {
        collection = Converter14.Collection.intoInfra(input.collection);
        datav2 = { ...datav2, collection };
      }
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      debugLog("# input: ", input);
      debugLog("# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      debugLog("# datav2: ", datav2);
      const mint = Account4.Keypair.create();
      const insts = await RegularNft4.createMint(
        mint.toPublicKey(),
        ownerPublickey,
        datav2,
        feePayer.toPublicKey(),
        isMutable
      );
      if (options.freezeAuthority) {
        insts.push(
          RegularNft4.createDeleagate(
            mint.toPublicKey(),
            ownerPublickey,
            options.freezeAuthority.toPublicKey()
          )
        );
      }
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web317.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      insts.forEach((inst) => tx.add(inst));
      if (options.isPriorityFee) {
        tx.add(
          await TransactionBuilder7.PriorityFee.createPriorityFeeInstruction(tx)
        );
      }
      tx.recentBlockhash = blockhashObj.blockhash;
      [owner, mint].forEach((signer) => tx.partialSign(signer.toKeypair()));
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new TransactionBuilder7.PartialSign(hex, mint.pubkey);
    });
  };
})(RegularNft5 || (RegularNft5 = {}));

// ../suite-regular-nft/src/gas-less-transfer.ts
var RegularNft6;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  RegularNft11.gasLessTransfer = async (mint, owner, dest, feePayer, options = {}) => {
    return SplToken10.gasLessTransfer(
      mint,
      owner,
      dest,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer,
      options
    );
  };
})(RegularNft6 || (RegularNft6 = {}));

// ../suite-regular-nft/src/mint-collection.ts
var import_mpl_token_metadata7 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft7;
((RegularNft11) => {
  const DEFAULT_COLLECTION_SIZE = 0;
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  RegularNft11.mintCollection = (owner, input, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { freezeAuthority, feePayer, collectionSize } = options;
      const payer = feePayer ? feePayer : owner;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const ownerPublicKey = owner.toKeypair().publicKey;
      let properties;
      if (input.properties) {
        properties = await Converter14.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType,
          payer
        );
      }
      input = {
        ...input,
        properties
      };
      const storageMetadata = Storage.toConvertOffchaindata(input, 0);
      storageMetadata.created_at = unixTimestamp();
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
          payer
        );
        debugLog("# upload content url: ", uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          payer
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }
      const datav2 = Converter14.RegularNftMetadata.intoInfra(input, uri, 0);
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      debugLog("# input: ", input);
      debugLog("# datav2: ", datav2);
      const collectionMint = Account4.Keypair.create();
      const collectionMetadataAccount = Account4.Pda.getMetadata(
        collectionMint.pubkey
      );
      const instructions = await RegularNft4.createMint(
        collectionMint.toPublicKey(),
        ownerPublicKey,
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );
      if (freezeAuthority) {
        instructions.push(
          RegularNft4.createDeleagate(
            collectionMint.toPublicKey(),
            ownerPublicKey,
            freezeAuthority.toPublicKey()
          )
        );
      }
      const collections = {
        collectionMetadata: collectionMetadataAccount,
        collectionAuthority: owner.toKeypair().publicKey,
        collectionMint: collectionMint.toKeypair().publicKey
      };
      instructions.push(
        (0, import_mpl_token_metadata7.createSetCollectionSizeInstruction)(collections, {
          setCollectionSizeArgs: {
            size: collectionSize || DEFAULT_COLLECTION_SIZE
          }
        })
      );
      return new TransactionBuilder7.Mint(
        instructions,
        [owner.toKeypair(), collectionMint.toKeypair()],
        payer.toKeypair(),
        collectionMint.pubkey
      );
    });
  };
})(RegularNft7 || (RegularNft7 = {}));

// ../suite-regular-nft/src/thaw.ts
var import_spl_token12 = require("@solana/spl-token");
var import_mpl_token_metadata8 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft8;
((RegularNft11) => {
  RegularNft11.thaw = (mint, owner, freezeAuthority, options = {}) => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = (0, import_spl_token12.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = Account4.Pda.getMasterEdition(mint);
      const inst = (0, import_mpl_token_metadata8.createThawDelegatedAccountInstruction)({
        delegate: new Account4.Keypair({
          secret: freezeAuthority
        }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new TransactionBuilder7.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(RegularNft8 || (RegularNft8 = {}));

// ../suite-regular-nft/src/transfer.ts
var RegularNft9;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  RegularNft11.transfer = (mint, owner, dest, ownerOrMultisig, options = {}) => {
    return SplToken10.transfer(
      mint,
      owner,
      dest,
      ownerOrMultisig,
      NFT_AMOUNT,
      NFT_DECIMALS,
      options
    );
  };
})(RegularNft9 || (RegularNft9 = {}));

// ../suite-regular-nft/src/index.ts
var RegularNft10 = {
  ...RegularNft,
  ...RegularNft2,
  ...RegularNft3,
  ...RegularNft5,
  ...RegularNft6,
  ...RegularNft4,
  ...RegularNft7,
  ...RegularNft8,
  ...RegularNft9
};

// src/mint-collection.ts
var CompressedNft8;
((CompressedNft10) => {
  CompressedNft10.mintCollection = (owner, input, options = {}) => {
    const { feePayer, freezeAuthority } = options;
    return RegularNft10.mintCollection(owner, input, {
      feePayer,
      freezeAuthority
    });
  };
})(CompressedNft8 || (CompressedNft8 = {}));

// src/index.ts
var CompressedNft9 = {
  // ...Creator,
  ...CompressedNft,
  ...CompressedNft2,
  ...CompressedNft3,
  ...CompressedNft5,
  ...CompressedNft7,
  ...CompressedNft6,
  ...CompressedNft8,
  ...CompressedNft4
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompressedNft
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vZ2xvYmFsL3NyYy9pbmRleC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9hc3NvY2lhdGVkLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2tleXBhaXIudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvcGRhLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2JhdGNoLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbW1vbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9wcmlvcml0eS1mZWUudHMiLCAiLi4vLi4vZGFzLWFwaS9zcmMvYXBpLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29sbGVjdGlvbi50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NyZWF0b3JzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yb3lhbHR5LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbmZ0LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbWVtby50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yZWd1bGFyLW5mdC1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Byb3BlcnRpZXMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy91c2VzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdG9rZW4tbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci1jaGVja2VkLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi9kYXMtYXBpL3NyYy9maW5kLnRzIiwgIi4uLy4uL2Rhcy1hcGkvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvcGFydGlhbC1zaWduLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NhbGN1bGF0ZS10eHNpemUudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL3NoYXJlZC50cyIsICIuLi8uLi9zdWl0ZS11dGlscy9zcmMvcmVzdWx0LnRzIiwgIi4uLy4uL25vZGUvc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9kZWxlZ2F0ZS50cyIsICIuLi9zcmMvZmluZC50cyIsICIuLi9zcmMvZ2FzLWxlc3MtZGVsZWdhdGUudHMiLCAiLi4vc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9wcm92ZW5hbmNlLWxheWVyLnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL2Fyd2VhdmUudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvc3RvcmFnZS50cyIsICIuLi8uLi92YWxpZGF0b3Ivc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9zcGFjZS50cyIsICIuLi9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2FkZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2NhbGN1bGF0ZS1hbW91bnQudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZmluZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2ZyZWV6ZS50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9maW5kLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9mcmVlemUudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL21pbnQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2dhcy1sZXNzLW1pbnQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9taW50LWNvbGxlY3Rpb24udHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9pbmRleC50cyIsICIuLi9zcmMvbWludC1jb2xsZWN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBpbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIENyZWF0b3IgfSBmcm9tICcuL2NyZWF0b3InO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBEZWxlZ2F0ZSB9IGZyb20gJy4vZGVsZWdhdGUnO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgR2FzTGVzc0RlbGVnYXRlIH0gZnJvbSAnLi9nYXMtbGVzcy1kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIEdhc0xlc3NUcmFuc2ZlciB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vbWludC1jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgU3BhY2UgfSBmcm9tICcuL3NwYWNlJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTmZ0ID0ge1xuICAvLyAuLi5DcmVhdG9yLFxuICAuLi5EZWxlZ2F0ZSxcbiAgLi4uRmluZCxcbiAgLi4uR2FzTGVzc0RlbGVnYXRlLFxuICAuLi5HYXNMZXNzVHJhbnNmZXIsXG4gIC4uLk1pbnQsXG4gIC4uLlNwYWNlLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5UcmFuc2Zlcixcbn07XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBTb2xhbmFKc29uQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnO1xuXG5leHBvcnQgbGV0IENvbmZpZyA9IFNvbGFuYUpzb25Db25maWc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBXYXJubmluZ01lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBuZnRTdG9yYWdlQXBpS2V5IGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIENhbiBnZXQgYXBpIGtleSBmcm9tIGh0dHBzOi8vbmZ0LnN0b3JhZ2UvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGA7XG4gICAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBkYXNBcGlVcmwgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGkgdXJsIGZyb20gaHR0cHM6Ly93d3cuaGVsaXVzLmRldi9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG4gICAgICAgIGA7XG4gICAgLy8gZXhwb3J0IGNvbnN0IEFOTk9VTkNFID0gYFxuICAgIC8vICAgICBbREVQUkVDQVRFRF1cbiAgICAvLyAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAgICAgQWNjb3VudCwgTm9kZSwgdG9FeHBsb3JlciwgUHVia2V5LCBTZWNyZXQgaGF2ZSBiZWVuIG1vdmVkIHRvXG4gICAgLy8gICAgIEBzb2xhbmEtc3VpdGUvdXRpbHNcbiAgICAvLyAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vICAgICBgO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IGNvbnN0IGN1cnJlbnRDbHVzdGVyID0gQ29uZmlnLmNsdXN0ZXIudHlwZTtcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbUNsdXN0ZXJVcmwgPSBDb25maWcuY2x1c3Rlci5jdXN0b21DbHVzdGVyVXJsO1xuICBleHBvcnQgY29uc3QgaXNEZWJ1Z2dpbmcgPSBDb25maWcuZGVidWdnaW5nO1xuICBleHBvcnQgY29uc3QgY3VzdG9tTmZ0U3RvcmFnZUFwaUtleSA9IENvbmZpZy5uZnRTdG9yYWdlQXBpS2V5O1xuICBleHBvcnQgY29uc3QgY3VzdG9tRGFzQXBpVXJsID0gQ29uZmlnLmRhc0FwaVVybDtcblxuICBleHBvcnQgZW51bSBDbHVzdGVyIHtcbiAgICBwcmQgPSAnbWFpbm5ldC1iZXRhJyxcbiAgICBwcmRNZXRhcGxleCA9ICdtYWlubmV0LWJldGEtbWV0YXBsZXgnLFxuICAgIGRldiA9ICdkZXZuZXQnLFxuICAgIGxvY2FsaG9zdCA9ICdsb2NhbGhvc3QtZGV2bmV0JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEVuZFBvaW50VXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9hcGkubWFpbm5ldC1iZXRhLnNvbGFuYS5jb20nLFxuICAgIHByZE1ldGFwbGV4ID0gJ2h0dHBzOi8vYXBpLm1ldGFwbGV4LnNvbGFuYS5jb20nLFxuICAgIGRldiA9ICdodHRwczovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gICAgbG9jYWxob3N0ID0gJ2h0dHA6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gQnVuZGxyVXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9ub2RlMS5pcnlzLnh5eixodHRwczovL25vZGUyLmlyeXMueHl6JyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaXJ5cy54eXonLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRGFzQXBpVXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9tYWlubmV0LmhlbGl1cy1ycGMuY29tLz9hcGkta2V5PTE1MzE5YmY0LTViNDAtNDk1OC1hYzhkLTYzMTNhYTU1ZWI5MicsXG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmhlbGl1cy1ycGMuY29tLz9hcGkta2V5PTE1MzE5YmY0LTViNDAtNDk1OC1hYzhkLTYzMTNhYTU1ZWI5MixodHRwczovL3JwYy1kZXZuZXQuaGVsaXVzLnh5ej9hcGkta2V5PTlmNzBhODQzLTMyNzQtNGZmZC1hMGE5LTMyM2Y4YjdjMDYzOScsXG4gIH1cblxuICBleHBvcnQgZW51bSBOZnRzdG9yYWdlQXBpS2V5IHtcbiAgICBwcmQgPSAnZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKa2FXUTZaWFJvY2pvd2VFUkdNamN5TjJWa09EWmhSR1UxUlRNeVpEWkRaRUpsT0RjMFl6UkZORGxFT0RZMU9XWm1PRU1pTENKcGMzTWlPaUp1Wm5RdGMzUnZjbUZuWlNJc0ltbGhkQ0k2TVRZeU1ESTJORGswTXpjd05pd2libUZ0WlNJNkltUmxiVzhpZlEuZDRKNzBtaWt4UkI4YTV2d051NlNPNUhEQThKYXVldXNlQWo3UV95dE1DRScsXG4gICAgZGV2ID0gcHJkLFxuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaENsdXN0ZXIgPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgeyBjbHVzdGVyOiBlbnYsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuXG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSB1cmwsIG1vc3QgcHJpb3JpdHlcbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCAmJiBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoO1xuICAgICAgcmV0dXJuIGN1c3RvbUNsdXN0ZXJVcmxbaW5kZXhdO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQ7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZE1ldGFwbGV4O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5sb2NhbGhvc3Q7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hCdW5kbHIgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5CdW5kbHJVcmwuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoRGFzQXBpID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIGRhcyB1cmwsIG1vc3QgcHJpb3JpdHlcbiAgICBpZiAoY3VzdG9tRGFzQXBpVXJsICYmIGN1c3RvbURhc0FwaVVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21EYXNBcGlVcmwubGVuZ3RoO1xuICAgICAgcmV0dXJuIGN1c3RvbURhc0FwaVVybFtpbmRleF07XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOiB7XG4gICAgICAgIGlmIChjdXN0b21EYXNBcGlVcmwubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkRBU19BUElfVVJMKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkRhc0FwaVVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5EYXNBcGlVcmwuZGV2LnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hOZnRTdG9yYWdlID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIG5mdC5zdG9yYWdlIGFwaSBrZXksIG1vc3QgcHJpb3JpdHlcbiAgICBpZiAoY3VzdG9tTmZ0U3RvcmFnZUFwaUtleSkge1xuICAgICAgcmV0dXJuIGN1c3RvbU5mdFN0b3JhZ2VBcGlLZXk7XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLk5mdHN0b3JhZ2VBcGlLZXkucHJkO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLk5mdHN0b3JhZ2VBcGlLZXkuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgbG9hZENvbmZpZyA9IGFzeW5jICgpID0+IHtcbiAgICBDb25maWcgPSBhd2FpdCBpbXBvcnQoJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgV1JBUFBFRF9UT0tFTl9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnU28xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMicsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRU1PX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdNZW1vMVVoa0pSZkh5dkxNY1Z1Y0p3eFhldUQ3MjhFcVZERHdRRHhGTU5vJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FVEFQTEVYX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdtZXRhcWJ4eFVlcmRxMjhjajFSYkFXa1lRbTN5YnpqYjZhOGJ0NTE4eDFzJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IENPTU1JVE1FTlQ6IENvbW1pdG1lbnQgPSAnY29uZmlybWVkJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vaXBmcy5pby9pcGZzJztcbiAgZXhwb3J0IGNvbnN0IElSWVNfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9nYXRld2F5LmlyeXMueHl6JztcbiAgZXhwb3J0IGNvbnN0IEJVTkRMUl9ORVRXT1JLX1VSTCA9IHN3aXRjaEJ1bmRscihDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gc3dpdGNoRGFzQXBpKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IHN3aXRjaE5mdFN0b3JhZ2UoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xTQ0FOX1VSTCA9ICdodHRwczovL3NvbHNjYW4uaW8nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MQU5BRk1fVVJMID0gJ2h0dHBzOi8vc29sYW5hLmZtJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1hSQVlfVVJMID0gJ2h0dHBzOi8veHJheS5oZWxpdXMueHl6Jztcbn1cblxuLy8gRGlzcGxheSBBbGwgQW5ub3VuY2Vcbi8vIGNvbnNvbGUubG9nKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuQU5OT1VOQ0UpO1xuIiwgImltcG9ydCB7IEtleXBhaXIsIExBTVBPUlRTX1BFUl9TT0wsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbmZpZywgQ29uc3RhbnRzLCBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIsIEV4cGxvcmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuLyoqXG4gKiBDcmVhdGUgZXhwbG9yZXIgdXJsIGZvciBhY2NvdW50IGFkZHJlc3Mgb3Igc2lnbmF0dXJlXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9FeHBsb3JlclVybCA9IGZ1bmN0aW9uKFxuICBleHBsb3JlcjogRXhwbG9yZXIgPSBFeHBsb3Jlci5Tb2xzY2FuLFxuICBvcHRpb25zOiBQYXJ0aWFsPEV4cGxvcmVyT3B0aW9ucz4gPSB7fSxcbikge1xuICBsZXQgY2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGRlYnVnTG9nKCcjIGNsdXN0ZXJUeXBlOicsIGNsdXN0ZXIpO1xuICBpZiAoY2x1c3RlciAhPT0gQ29uc3RhbnRzLkNsdXN0ZXIucHJkKSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfVxuXG4gIGNvbnN0IGFkZHJlc3NPclNpZ25hdHVyZTogc3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICBsZXQgdXJsID0gJyc7XG5cbiAgaWYgKG9wdGlvbnMucmVwbGFjZVBhdGgpIHtcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgaWYgKEFjY291bnQuS2V5cGFpci5pc1B1YmtleShhZGRyZXNzT3JTaWduYXR1cmUpKSB7XG4gICAgLy8gYWRkcmVzc1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L2FkZHJlc3MvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHNpZ25hdHVyZVxuICAgIC8vIGZvciBJbnZhbGlkIHR5cGUgXCJuZXZlclwiIG9mIGFkZHJlc3NPclNpZ25hdHVyZSwgc28gYGFzIHN0cmluZ2BcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS90eC8ke2FkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vdHgvJHthZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICAgIH0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS90eC8ke2FkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXJsO1xufTtcblxuLyoqXG4gKiBQdWJLZXkoQHNvbGFuYS1zdWl0ZSkgdG8gUHVibGljS2V5KEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBQdWJsaWNLZXlcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b1B1YmxpY0tleSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1B1YmtleSh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuUHViS2V5OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnRvU3RyaW5nKCkpO1xufTtcblxuLyoqXG4gKiBTZWNyZXQoQHNvbGFuYS1zdWl0ZSkgdG8gS2V5cGFpcihAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgS2V5cGFpclxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvS2V5cGFpciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1NlY3JldCh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuU2VjcmV0OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMudG9TdHJpbmcoKSk7XG4gIHJldHVybiBLZXlwYWlyLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG59O1xuXG4vKipcbiAqIExBTVBPUlRTIHRvIFNPTFxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvU29sID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLnRpbWVzKExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFjY291bnQsXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBUT0tFTl9QUk9HUkFNX0lELFxuICBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yLFxuICBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcixcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG4vKipcbiAqIEdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICpcbiAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICogQHBhcmFtIHtib29sZWFufSBhbGxvd093bmVyT2ZmQ3VydmVcbiAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nIHwgSW5zdHJ1Y3Rpb24+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQXNzb2NpYXRlZCB7XG4gICAgLyoqXG4gICAgICogW01haW4gbG9naWNdR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAgICAgKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgICAqXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gZmVlUGF5ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICAgKi9cbiAgICBleHBvcnQgY29uc3QgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI/OiBQdWJrZXksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgICApOiBQcm9taXNlPHtcbiAgICAgIHRva2VuQWNjb3VudDogc3RyaW5nO1xuICAgICAgaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICB9PiA9PiB7XG4gICAgICBjb25zdCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYWxsb3dPd25lck9mZkN1cnZlLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBEb250IHVzZSBSZXN1bHRcbiAgICAgICAgYXdhaXQgZ2V0QWNjb3VudChcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLmNvbW1pdG1lbnQsXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IpICYmXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBlcnJvcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5ZXIgPSAhZmVlUGF5ZXIgPyBvd25lciA6IGZlZVBheWVyO1xuXG4gICAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgcGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgS2V5cGFpciBhcyBPcmlnaW5hbCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IGNsYXNzIEtleXBhaXIge1xuICAgIHNlY3JldDogU2VjcmV0O1xuICAgIHB1YmtleTogUHVia2V5O1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiB7IHB1YmtleT86IFB1YmtleTsgc2VjcmV0OiBTZWNyZXQgfSkge1xuICAgICAgaWYgKCFwYXJhbXMucHVia2V5KSB7XG4gICAgICAgIGNvbnN0IGtleXBhaXIgPSBwYXJhbXMuc2VjcmV0LnRvS2V5cGFpcigpO1xuICAgICAgICB0aGlzLnB1YmtleSA9IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB1YmtleSA9IHBhcmFtcy5wdWJrZXk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlY3JldCA9IHBhcmFtcy5zZWNyZXQ7XG4gICAgfVxuXG4gICAgdG9QdWJsaWNLZXkoKTogUHVibGljS2V5IHtcbiAgICAgIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMucHVia2V5KTtcbiAgICB9XG5cbiAgICB0b0tleXBhaXIoKTogT3JpZ2luYWwge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnNlY3JldCk7XG4gICAgICByZXR1cm4gT3JpZ2luYWwuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNQdWJrZXkgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFB1YmtleSA9PlxuICAgICAgL15bMC05YS16QS1aXXszMiw0NH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBpc1NlY3JldCA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgU2VjcmV0ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezg3LDg4fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGNyZWF0ZSA9ICgpOiBLZXlwYWlyID0+IHtcbiAgICAgIGNvbnN0IGtleXBhaXIgPSBPcmlnaW5hbC5nZW5lcmF0ZSgpO1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgdG9LZXlQYWlyID0gKGtleXBhaXI6IE9yaWdpbmFsKTogS2V5cGFpciA9PiB7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBQUk9HUkFNX0FERFJFU1MgYXMgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lEIH0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5pbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIFBkYSB7XG4gICAgZXhwb3J0IGNvbnN0IGdldE1ldGFkYXRhID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRNYXN0ZXJFZGl0aW9uID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdlZGl0aW9uJyksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldFRyZWVBdXRob3JpdHkgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFthZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRCZ3VtU2lnbmVyID0gKCk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbQnVmZmVyLmZyb20oJ2NvbGxlY3Rpb25fY3BpJywgJ3V0ZjgnKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRBc3NldElkID0gKGFkZHJlc3M6IFB1YmtleSwgbGVhZkluZGV4OiBudW1iZXIpOiBQdWJrZXkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IG5ldyBCTi5CTihsZWFmSW5kZXgpO1xuICAgICAgY29uc3QgW2Fzc2V0SWRdID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnYXNzZXQnLCAndXRmOCcpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICAgIFVpbnQ4QXJyYXkuZnJvbShub2RlLnRvQXJyYXkoJ2xlJywgOCkpLFxuICAgICAgICBdLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gYXNzZXRJZC50b1N0cmluZygpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBY2NvdW50IGFzIEFhc3NvY2lhdGVkIH0gZnJvbSAnLi9hc3NvY2lhdGVkJztcbmltcG9ydCB7IEFjY291bnQgYXMgS2V5cGFpciB9IGZyb20gJy4va2V5cGFpcic7XG5pbXBvcnQgeyBBY2NvdW50IGFzIFBkYSB9IGZyb20gJy4vcGRhJztcbmltcG9ydCAnfi90eXBlcy9nbG9iYWwnO1xuLy8gaW1wb3J0ICd+L2dsb2JhbCc7XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50ID0ge1xuICAuLi5BYXNzb2NpYXRlZCxcbiAgLi4uS2V5cGFpcixcbiAgLi4uUGRhLFxufTtcbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcbmltcG9ydCB7IEJhdGNoU3VibWl0T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIEJhdGNoIHtcbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBvcHRpb25zOiBQYXJ0aWFsPEJhdGNoU3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc3RydWN0aW9ucykge1xuICAgICAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgb3B0aW9ucy5pbnN0cnVjdGlvbnMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb21tb25Pck1pbnRJbnN0ID0gb3B0aW9ucy5pbnN0cnVjdGlvbnM7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBpbnN0IG9mIGNvbW1vbk9yTWludEluc3QpIHtcbiAgICAgICAgICBpZiAoIWluc3QuaW5zdHJ1Y3Rpb25zICYmICFpbnN0LnNpZ25lcnMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBgb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIGJhdGNoU3VibWl0KCkuXG4gICAgICAgICAgICBJbmRleDogJHtpfSwgU2V0IHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KGluc3QpfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBjb21tb25Pck1pbnRJbnN0LmZsYXRNYXAoXG4gICAgICAgICAgKGluc3QpID0+IGluc3QuaW5zdHJ1Y3Rpb25zLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzaWduZXJzID0gY29tbW9uT3JNaW50SW5zdC5mbGF0TWFwKChpbnN0KSA9PiBpbnN0LnNpZ25lcnMpO1xuICAgICAgICBjb25zdCBmZWVQYXllcnMgPSBjb21tb25Pck1pbnRJbnN0LmZpbHRlcihcbiAgICAgICAgICAoaW5zdCkgPT4gaW5zdC5mZWVQYXllciAhPT0gdW5kZWZpbmVkLFxuICAgICAgICApO1xuICAgICAgICBsZXQgZmVlUGF5ZXIgPSBzaWduZXJzWzBdO1xuICAgICAgICBpZiAoZmVlUGF5ZXJzLmxlbmd0aCA+IDAgJiYgZmVlUGF5ZXJzWzBdLmZlZVBheWVyKSB7XG4gICAgICAgICAgZmVlUGF5ZXIgPSBmZWVQYXllcnNbMF0uZmVlUGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gc2lnbmVycztcbiAgICAgICAgaWYgKGZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSBmZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW2ZlZVBheWVyLCAuLi5zaWduZXJzXTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbnMubWFwKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZVR4c2l6ZS5pc01heFRyYW5zYWN0aW9uU2l6ZSh0cmFuc2FjdGlvbiwgZmVlUGF5ZXIucHVibGljS2V5KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5pc1ByaW9yaXR5RmVlKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IFByaW9yaXR5RmVlLlByaW9yaXR5RmVlLnN1Ym1pdChcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlLCBTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcblxuZXhwb3J0IGNvbnN0IE1BWF9SRVRSSUVTID0gMztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQ29tbW9uPFQgPSB1bmRlZmluZWQ+IGltcGxlbWVudHMgQ29tbW9uU3RydWN0dXJlPFQ+IHtcbiAgICBzdGF0aWMgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyPzogS2V5cGFpcjtcbiAgICBkYXRhPzogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgICBkYXRhPzogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tbW9uKSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBQcmlvcml0eUZlZS5Qcmlvcml0eUZlZS5zdWJtaXQoXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbXB1dGVCdWRnZXRQcm9ncmFtLFxuICBDb25maXJtT3B0aW9ucyxcbiAgS2V5cGFpcixcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgRGFzQXBpIH0gZnJvbSAnfi9kYXMtYXBpJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByaW9yaXR5RmVlIHtcbiAgICBjb25zdCBNSU5JTVVNX1BSSU9SSVRZX0ZFRSA9IDMwMDtcbiAgICBleHBvcnQgY29uc3Qgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgYWRkU29sUHJpb3JpdHlGZWU/OiBudW1iZXIsXG4gICAgKSA9PiB7XG4gICAgICBsZXQgYWRkTGFtcG9ydHMgPSAwO1xuICAgICAgaWYgKGFkZFNvbFByaW9yaXR5RmVlKSB7XG4gICAgICAgIGFkZExhbXBvcnRzID0gYWRkU29sUHJpb3JpdHlGZWUudG9MYW1wb3J0cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXN0aW1hdGVzID0gYXdhaXQgRGFzQXBpLmdldFByaW9yaXR5RmVlRXN0aW1hdGUodHJhbnNhY3Rpb24pO1xuICAgICAgICBkZWJ1Z0xvZygnIyBlc3RpbWF0ZXM6ICcsIGVzdGltYXRlcyk7XG4gICAgICAgIGFkZExhbXBvcnRzID1cbiAgICAgICAgICBlc3RpbWF0ZXMuaXNPayAmJiBlc3RpbWF0ZXMudW53cmFwKCkubWVkaXVtICE9PSAwXG4gICAgICAgICAgICA/IGVzdGltYXRlcy51bndyYXAoKS5tZWRpdW1cbiAgICAgICAgICAgIDogTUlOSU1VTV9QUklPUklUWV9GRUU7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZygnIyBsYW1wb3J0czogJywgYWRkTGFtcG9ydHMpO1xuICAgICAgcmV0dXJuIGF3YWl0IHNlbmRUcmFuc2FjdGlvbldpdGhQcmlvcml0eUZlZShcbiAgICAgICAgYWRkTGFtcG9ydHMsXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBzaWduZXJzLFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGNyZWF0ZVByaW9yaXR5RmVlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBlc3RpbWF0ZXMgPSBhd2FpdCBEYXNBcGkuZ2V0UHJpb3JpdHlGZWVFc3RpbWF0ZSh0cmFuc2FjdGlvbik7XG4gICAgICBkZWJ1Z0xvZygnIyBlc3RpbWF0ZXM6ICcsIGVzdGltYXRlcyk7XG4gICAgICAvLyBwcmlvcml0eSBmZWU6IG1lZGl1bVxuICAgICAgY29uc3QgbGFtcG9ydHMgPSBlc3RpbWF0ZXMuaXNPa1xuICAgICAgICA/IGVzdGltYXRlcy51bndyYXAoKS5tZWRpdW1cbiAgICAgICAgOiBNSU5JTVVNX1BSSU9SSVRZX0ZFRTtcbiAgICAgIHJldHVybiBDb21wdXRlQnVkZ2V0UHJvZ3JhbS5zZXRDb21wdXRlVW5pdFByaWNlKHtcbiAgICAgICAgbWljcm9MYW1wb3J0czogbGFtcG9ydHMsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2VuZFRyYW5zYWN0aW9uV2l0aFByaW9yaXR5RmVlID0gYXN5bmMgKFxuICAgICAgbGFtcG9ydHM6IG51bWJlcixcbiAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgIGZpbmFsU2lnbmVyczogS2V5cGFpcltdLFxuICAgICkgPT4ge1xuICAgICAgY29uc3QgY29tcHV0ZVByaWNlSW5zdCA9IENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0UHJpY2Uoe1xuICAgICAgICBtaWNyb0xhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgIH07XG4gICAgICB0cmFuc2FjdGlvbi5hZGQoY29tcHV0ZVByaWNlSW5zdCk7XG4gICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFzc2V0LCBBc3NldFByb29mLCBBc3NldHMsIFByaW9yaXR5RmVlTGV2ZWxzIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbmltcG9ydCB7IFNvcnRhYmxlIH0gZnJvbSAnfi90eXBlcy9maW5kJztcblxuZXhwb3J0IG5hbWVzcGFjZSBEYXNBcGkge1xuICBsZXQgZGFzVXJpOiBzdHJpbmc7XG4gIGNvbnN0IGNvbm5lY3QgPSBhc3luYyAoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgcGFyYW1zOiAoXG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBQdWJrZXlcbiAgICAgIHwgU29ydGFibGVcbiAgICAgIHwgbnVtYmVyXG4gICAgICB8IHVuZGVmaW5lZFxuICAgICAgfCBQdWJrZXlbXVxuICAgICAgfCBUcmFuc2FjdGlvblxuICAgICAgfCB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XG4gICAgICB9XG4gICAgKVtdLFxuICApID0+IHtcbiAgICBkYXNVcmkgPSBkYXNVcmkgPyBkYXNVcmkgOiBDb25zdGFudHMuREFTX0FQSV9VUkw7XG4gICAgZGVidWdMb2coJyMgZGFzVXJpOiAnLCBkYXNVcmkpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZGFzVXJpLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBqc29ucnBjOiAnMi4wJyxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBpZDogJ2Rhcy1hcGknLFxuICAgICAgICBwYXJhbXMsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIGNvbnN0IGVyciA9IChhd2FpdCByZXNwb25zZS5qc29uKCkpLmVycm9yLm1lc3NhZ2U7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlcnIpKTtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCByZXNwb25zZS5qc29uKCkpLnJlc3VsdDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlRGFzVXJpID0gKHVybDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgZGFzVXJpID0gdXJsO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldFByb29mID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRQcm9vZiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXRQcm9vZicsIFthc3NldElkXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0ID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXQsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0JywgW2Fzc2V0SWRdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRzQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lckFkZHJlc3M6IFB1YmtleSxcbiAgICBsaW1pdDogbnVtYmVyID0gMTAwMCxcbiAgICBwYWdlOiBudW1iZXIgPSAxLFxuICAgIHNvcnRCeT86IFNvcnRhYmxlLFxuICAgIGJlZm9yZT86IHN0cmluZyxcbiAgICBhZnRlcj86IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldHNCeU93bmVyJywgW1xuICAgICAgICBvd25lckFkZHJlc3MsXG4gICAgICAgIHNvcnRCeSxcbiAgICAgICAgbGltaXQsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGJlZm9yZSxcbiAgICAgICAgYWZ0ZXIsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRzQnlHcm91cCA9IGFzeW5jIChcbiAgICBncm91cEtleTogc3RyaW5nLFxuICAgIGdyb3VwVmFsdWU6IFB1YmtleSxcbiAgICBsaW1pdDogbnVtYmVyID0gMTAwMCxcbiAgICBwYWdlOiBudW1iZXIgPSAxLFxuICAgIHNvcnRCeT86IFNvcnRhYmxlLFxuICAgIGJlZm9yZT86IHN0cmluZyxcbiAgICBhZnRlcj86IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldHNCeUdyb3VwJywgW1xuICAgICAgICBncm91cEtleSxcbiAgICAgICAgZ3JvdXBWYWx1ZSxcbiAgICAgICAgc29ydEJ5LFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgYmVmb3JlLFxuICAgICAgICBhZnRlcixcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRQcmlvcml0eUZlZUVzdGltYXRlID0gYXN5bmMgKFxuICAgIGFjY291bnRPclRyYW5zYWN0aW9uOiBQdWJrZXlbXSB8IFRyYW5zYWN0aW9uLFxuICApOiBQcm9taXNlPFJlc3VsdDxQcmlvcml0eUZlZUxldmVscywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBpbmNsdWRlQWxsUHJpb3JpdHlGZWVMZXZlbHM6IHRydWUgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGF3YWl0IGNvbm5lY3QoJ2dldFByaW9yaXR5RmVlRXN0aW1hdGUnLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWNjb3VudE9yVHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApLnByaW9yaXR5RmVlTGV2ZWxzO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEludGVybmFsQ29sbGVjdGlvbiB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEdyb3VwaW5nIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbmltcG9ydCB7XG4gIENvbGxlY3Rpb24gYXMgQ29sbGVjdGlvblR5cGUsXG4gIElucHV0Q29sbGVjdGlvbixcbiAgT3B0aW9uLFxufSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb24ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q29sbGVjdGlvbj4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+LFxuICAgICk6IENvbGxlY3Rpb25UeXBlIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3M6IG91dHB1dC5rZXkudG9TdHJpbmcoKSxcbiAgICAgICAgdmVyaWZpZWQ6IG91dHB1dC52ZXJpZmllZCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbk1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChvdXRwdXQ6IEdyb3VwaW5nW10pOiBQdWJrZXkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gb3V0cHV0LmZpbmQoKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5ncm91cF9rZXkgPT09ICdjb2xsZWN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5ncm91cF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzID8gcmVzLmdyb3VwX3ZhbHVlIDogJyc7XG4gICAgfTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgQ3JlYXRvcnMsIElucHV0Q3JlYXRvcnMsIE9wdGlvbiB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgSW50ZXJuYWxDcmVhdG9ycyB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENyZWF0b3JzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+ID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvQ29tcHJlc3NlZE5mdEluZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IEludGVybmFsQ3JlYXRvcnNbXSA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dCEubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4sXG4gICAgKTogQ3JlYXRvcnNbXSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1N0cmluZygpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBkYXRhLnZlcmlmaWVkLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHtcbiAgTWV0YWRhdGFBcmdzLFxuICBUb2tlblByb2dyYW1WZXJzaW9uLFxuICBUb2tlblN0YW5kYXJkLFxufSBmcm9tICdtcGwtYnViYmxlZ3VtLWluc3RydWN0aW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IE1ldGFkYXRhQXJncyA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Db21wcmVzc2VkTmZ0SW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICAgIHByaW1hcnlTYWxlSGFwcGVuZWQ6IGZhbHNlLFxuICAgICAgICBpc011dGFibGU6IGlucHV0LmlzTXV0YWJsZSA/PyBmYWxzZSxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiAwLFxuICAgICAgICB0b2tlblN0YW5kYXJkOiBUb2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlLFxuICAgICAgICB0b2tlblByb2dyYW1WZXJzaW9uOiBUb2tlblByb2dyYW1WZXJzaW9uLk9yaWdpbmFsLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJveWFsdHkge1xuICAgIGV4cG9ydCBjb25zdCBUSFJFU0hPTEQgPSAxMDA7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQXNzZXRBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvbmZ0JztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBOZnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChvdXRwdXQ6IEFzc2V0QW5kT2ZmY2hhaW4pOiBNZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5pZC50b1N0cmluZygpLFxuICAgICAgICBjb2xsZWN0aW9uTWludDogQ29sbGVjdGlvbi5Db2xsZWN0aW9uTWludC5pbnRvVXNlcihcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5ncm91cGluZyxcbiAgICAgICAgKSBhcyBQdWJrZXksXG4gICAgICAgIGF1dGhvcml0aWVzOiBvdXRwdXQub25jaGFpbi5hdXRob3JpdGllcyxcbiAgICAgICAgcm95YWx0eTogUm95YWx0eS5Sb3lhbHR5LmludG9Vc2VyKG91dHB1dC5vbmNoYWluLnJveWFsdHkucGVyY2VudCksXG4gICAgICAgIG5hbWU6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQubWV0YWRhdGEubmFtZSxcbiAgICAgICAgc3ltYm9sOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLnN5bWJvbCxcbiAgICAgICAgdXJpOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uY3JlYXRvcnMpISxcbiAgICAgICAgdHJlZUFkZHJlc3M6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLnRyZWUsXG4gICAgICAgIGlzQ29tcHJlc3NlZDogb3V0cHV0Lm9uY2hhaW4uY29tcHJlc3Npb24uY29tcHJlc3NlZCxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5tdXRhYmxlLFxuICAgICAgICBpc0J1cm46IG91dHB1dC5vbmNoYWluLmJ1cm50LFxuICAgICAgICBlZGl0aW9uTm9uY2U6IG91dHB1dC5vbmNoYWluLnN1cHBseS5lZGl0aW9uX25vbmNlLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBvdXRwdXQub25jaGFpbi5yb3lhbHR5LnByaW1hcnlfc2FsZV9oYXBwZW5lZCxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSEsXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE1lbW8sIFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1lbW8ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE1lbW8sXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICAgb3V0cHV0VHJhbnNmZXI/OiBUcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyBjYXNlOiB0cmFuc2ZlciB3aXRoIG1lbW9cbiAgICAgIGlmIChvdXRwdXRUcmFuc2ZlciAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtICE9PSAnJykge1xuICAgICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtID09PSAnc3BsLXRva2VuJykge1xuICAgICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGhpc3RvcnkubWVtbyA9IG91dHB1dC5wYXJzZWQ7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBNaW50VG8gfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNaW50VG8sXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubWludEF1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50QXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkuYWNjb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby5hY2NvdW50IGFzIHN0cmluZztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgb3ZlcndyaXRlT2JqZWN0LCBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQge30gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBGaWxlVHlwZSwgUHJvcGVydGllcywgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUHJvcGVydGllcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IGFzeW5jIChcbiAgICAgIGlucHV0OiBQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2tGdW5jOiAoXG4gICAgICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICAgICkgPT4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+LFxuICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxQcm9wZXJ0aWVzPiA9PiB7XG4gICAgICBpZiAoIWlucHV0IHx8ICFpbnB1dC5maWxlcykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGlucHV0LmZpbGVzLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICAgIGlmICghZmlsZS5maWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBjYWxsYmFja0Z1bmMoZmlsZS5maWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgICAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvdmVyd3JpdGVPYmplY3QoZmlsZSwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBleGlzdHNLZXk6ICdmaWxlUGF0aCcsXG4gICAgICAgICAgICAgIHdpbGw6IHsga2V5OiAndXJpJywgdmFsdWU6IHJlcy52YWx1ZSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgLi4uaW5wdXQsIGZpbGVzIH0gYXMgUHJvcGVydGllcztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBPcHRpb24sIFVzZXMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFVzZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAob3V0cHV0OiBPcHRpb248VXNlcz4pOiBVc2VzIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX1VzZXMgfSBmcm9tICcuL3VzZXMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIFRva2VuTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBNZXRhZGF0YUFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVG9rZW5NZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dFRva2VuTWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IG51bGwsXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogTWV0YWRhdGFBbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wpLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBkZWxldGUgTlVMTCgweDAwKSBzdHJpbmdzIGZ1bmN0aW9uXG4gICAgZXhwb3J0IGNvbnN0IGRlbGV0ZU51bGxTdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwwL2csICcnKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlckNoZWNrZWQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IFRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCkge1xuICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICApO1xuICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICB9XG5cbiAgICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubXVsdGlzaWdBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubXVsdGlzaWdBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnNpZ25lcnMgPSBvdXRwdXQucGFyc2VkLmluZm8uc2lnbmVycztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgVHJhbnNmZXIgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlciB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXIsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICBpZiAoIW91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbiB8fCAhb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgIGhpc3Rvcnkuc29sID0gb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzPy50b1NvbCgpLnRvU3RyaW5nKCk7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbXByZXNzZWROZnRNZXRhZGF0YSB9IGZyb20gJy4vY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTmZ0IH0gZnJvbSAnLi9uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1lbW8gfSBmcm9tICcuL21lbW8nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJlZ3VsYXJOZnRNZXRhZGF0YSB9IGZyb20gJy4vcmVndWxhci1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFByb3BlcnRpZXMgfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJveWFsdHkgfSBmcm9tICcuL3JveWFsdHknO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRva2VuTWV0YWRhdGEgfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICcuL3RyYW5zZmVyLWNoZWNrZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5cbmV4cG9ydCBjb25zdCBDb252ZXJ0ZXIgPSB7XG4gIC4uLkNvbXByZXNzZWROZnRNZXRhZGF0YSxcbiAgLi4uQ29sbGVjdGlvbixcbiAgLi4uQ3JlYXRvcnMsXG4gIC4uLk5mdCxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uUmVndWxhck5mdE1ldGFkYXRhLFxuICAuLi5Qcm9wZXJ0aWVzLFxuICAuLi5Sb3lhbHR5LFxuICAuLi5Ub2tlbk1ldGFkYXRhLFxuICAuLi5UcmFuc2ZlckNoZWNrZWQsXG4gIC4uLlRyYW5zZmVyLFxuICAuLi5Vc2VzLFxufTtcbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTWV0YWRhdGEsIE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9uZnQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgRmluZE9wdGlvbnMsIFNvcnRhYmxlLCBTb3J0QnksIFNvcnREaXJlY3Rpb24gfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuaW1wb3J0IHsgRGFzQXBpIGFzIEFwaSB9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgRGFzQXBpIHtcbiAgLy9AaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGRlZmF1bHRTb3J0Qnk6IFNvcnRhYmxlID0ge1xuICAgIHNvcnRCeTogU29ydEJ5LlJlY2VudCxcbiAgICBzb3J0RGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uLkRlc2MsXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGZldGNoT2ZmY2hhaW4gPSBhc3luYyAodXJpOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVyaSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQ29tcHJlc3NlZFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICApOiBQcm9taXNlPFBhcnRpYWw8TWV0YWRhdGE+PiA9PiB7XG4gICAgY29uc3QgYXNzZXQgPSBhd2FpdCBBcGkuZ2V0QXNzZXQobWludCk7XG4gICAgaWYgKGFzc2V0LmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldC5lcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoYXNzZXQudmFsdWUuY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKSB7XG4gICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKFxuICAgICAgICBhc3NldC52YWx1ZS5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAgICAgb25jaGFpbjogYXNzZXQudmFsdWUsXG4gICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgIH07XG4gICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG93bmVyIGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGlzQ29tcHJlc3NlZDogYm9vbGVhbixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPE5mdE1ldGFkYXRhPiA9PiB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBzb3J0Qnk6IGRlZmF1bHRTb3J0QnksXG4gICAgfTtcbiAgICBjb25zdCB7IGxpbWl0LCBwYWdlLCBzb3J0QnksIGJlZm9yZSwgYWZ0ZXIgfSA9IHtcbiAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuXG4gICAgY29uc3QgYXNzZXRzID0gYXdhaXQgQXBpLmdldEFzc2V0c0J5T3duZXIoXG4gICAgICBvd25lcixcbiAgICAgIGxpbWl0LFxuICAgICAgcGFnZSxcbiAgICAgIHNvcnRCeSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICk7XG4gICAgaWYgKGFzc2V0cy5pc0Vycikge1xuICAgICAgdGhyb3cgYXNzZXRzLmVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gYXNzZXRzLnZhbHVlLml0ZW1zO1xuXG4gICAgY29uc3QgbWV0YWRhdGFzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpdGVtc1xuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXByZXNzaW9uLmNvbXByZXNzZWQgPT09IGlzQ29tcHJlc3NlZClcbiAgICAgICAgLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKFxuICAgICAgICAgICAgICBpdGVtLmNvbnRlbnQuanNvbl91cmksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgbWVyZ2VkID0ge1xuICAgICAgICAgICAgICBvbmNoYWluOiBpdGVtLFxuICAgICAgICAgICAgICBvZmZjaGFpbjogb2ZmY2hhaW4sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnQuaW50b1VzZXIobWVyZ2VkKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIEZhaWxlZCBmZXRjaCBvZmZjaGFpbiB1cmw6ICcsIGl0ZW0uY29udGVudC5qc29uX3VyaSk7XG4gICAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcih7XG4gICAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICAgIG9mZmNoYWluOiB7fSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogYXNzZXRzLnZhbHVlLnBhZ2UsXG4gICAgICB0b3RhbDogYXNzZXRzLnZhbHVlLnRvdGFsLFxuICAgICAgbGltaXQ6IGFzc2V0cy52YWx1ZS5saW1pdCxcbiAgICAgIG1ldGFkYXRhcyxcbiAgICB9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBjb2xsZWN0aW9uIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IGNvbGxlY3Rpb25NaW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkLFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RmluZE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5Q29sbGVjdGlvbiA9IGFzeW5jIChcbiAgICBjb2xsZWN0aW9uTWludDogUHVia2V5LFxuICAgIGlzQ29tcHJlc3NlZDogYm9vbGVhbixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPE5mdE1ldGFkYXRhPiA9PiB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBzb3J0Qnk6IGRlZmF1bHRTb3J0QnksXG4gICAgfTtcbiAgICBjb25zdCB7IGxpbWl0LCBwYWdlLCBzb3J0QnksIGJlZm9yZSwgYWZ0ZXIgfSA9IHtcbiAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuXG4gICAgY29uc3QgYXNzZXRzID0gYXdhaXQgQXBpLmdldEFzc2V0c0J5R3JvdXAoXG4gICAgICAnY29sbGVjdGlvbicsXG4gICAgICBjb2xsZWN0aW9uTWludCxcbiAgICAgIGxpbWl0LFxuICAgICAgcGFnZSxcbiAgICAgIHNvcnRCeSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICk7XG4gICAgaWYgKGFzc2V0cy5pc0Vycikge1xuICAgICAgdGhyb3cgYXNzZXRzLmVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gYXNzZXRzLnZhbHVlLml0ZW1zO1xuXG4gICAgY29uc3QgbWV0YWRhdGFzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpdGVtc1xuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXByZXNzaW9uLmNvbXByZXNzZWQgPT09IGlzQ29tcHJlc3NlZClcbiAgICAgICAgLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oaXRlbS5jb250ZW50Lmpzb25fdXJpKTtcbiAgICAgICAgICBjb25zdCBtZXJnZWQgPSB7XG4gICAgICAgICAgICBvbmNoYWluOiBpdGVtLFxuICAgICAgICAgICAgb2ZmY2hhaW46IG9mZmNoYWluLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnQuaW50b1VzZXIobWVyZ2VkKTtcbiAgICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogYXNzZXRzLnZhbHVlLnBhZ2UsXG4gICAgICB0b3RhbDogYXNzZXRzLnZhbHVlLnRvdGFsLFxuICAgICAgbGltaXQ6IGFzc2V0cy52YWx1ZS5saW1pdCxcbiAgICAgIG1ldGFkYXRhcyxcbiAgICB9O1xuICB9O1xufVxuIiwgImltcG9ydCB7IERhc0FwaSBhcyBBcGkgfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgeyBEYXNBcGkgYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5cbmV4cG9ydCBjb25zdCBEYXNBcGkgPSB7XG4gIC4uLkFwaSxcbiAgLi4uRmluZCxcbn07XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFByaW9yaXR5RmVlIH0gZnJvbSAnLi9wcmlvcml0eS1mZWUnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlLCBTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIE1pbnQ8VCA9IFB1YmtleT4gaW1wbGVtZW50cyBNaW50U3RydWN0dXJlPFQ+IHtcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI6IEtleXBhaXI7XG4gICAgZGF0YTogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICAgIGRhdGE6IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1pbnQpKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgTWludEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGlmIChOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgICAgICAgIGRlYnVnTG9nKCcjIENoYW5nZSBtZXRhcGxleCBjbHVzdGVyIG9uIG1haW5uZXQtYmV0YScpO1xuICAgICAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXI6IENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBQcmlvcml0eUZlZS5Qcmlvcml0eUZlZS5zdWJtaXQoXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7XG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxuICBTdWJtaXRPcHRpb25zLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBQYXJ0aWFsU2lnbiBpbXBsZW1lbnRzIFBhcnRpYWxTaWduU3RydWN0dXJlIHtcbiAgICBoZXhJbnN0cnVjdGlvbjogc3RyaW5nO1xuICAgIGRhdGE/OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihpbnN0cnVjdGlvbnM6IHN0cmluZywgbWludD86IFB1YmtleSkge1xuICAgICAgdGhpcy5oZXhJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGFydGlhbFNpZ24pKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0aW9ucy5mZWVQYXllcikge1xuICAgICAgICAgIHRocm93IEVycm9yKCdOZWVkIGZlZVBheWVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWNvZGUgPSBCdWZmZXIuZnJvbSh0aGlzLmhleEluc3RydWN0aW9uLCAnaGV4Jyk7XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gVHJhbnNhY3Rpb24uZnJvbShkZWNvZGUpO1xuICAgICAgICB0cmFuc2FjdGlvbi5wYXJ0aWFsU2lnbihvcHRpb25zLmZlZVBheWVyIS50b0tleXBhaXIoKSk7XG5cbiAgICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3aXJlVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbi5zZXJpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5LCBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbi8vIEBpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBjb25zdCBMT1dfVkFMVUUgPSAxMjc7IC8vIDB4N2ZcbiAgY29uc3QgSElHSF9WQUxVRSA9IDE2MzgzOyAvLyAweDNmZmZcbiAgY29uc3QgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gIC8qKlxuICAgKiBDb21wYWN0IHUxNiBhcnJheSBoZWFkZXIgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIGFycmF5IGhlYWRlclxuICAgKi9cbiAgY29uc3QgY29tcGFjdEhlYWRlciA9IChuOiBudW1iZXIpID0+XG4gICAgbiA8PSBMT1dfVkFMVUUgPyAxIDogbiA8PSBISUdIX1ZBTFVFID8gMiA6IDM7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IHNpemVcbiAgICogQHBhcmFtIG4gZWxlbWVudHMgaW4gdGhlIGNvbXBhY3QgYXJyYXlcbiAgICogQHBhcmFtIHNpemUgYnl0ZXMgcGVyIGVhY2ggZWxlbWVudFxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIGFycmF5XG4gICAqL1xuICBjb25zdCBjb21wYWN0QXJyYXlTaXplID0gKG46IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PlxuICAgIGNvbXBhY3RIZWFkZXIobikgKyBuICogc2l6ZTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHR4c2l6ZVxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gYSBzb2xhbmEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIGZlZVBheWVyIHRoZSBwdWJsaWNLZXkgb2YgdGhlIHNpZ25lclxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVR4U2l6ZSA9IChcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBmZWVQYXllclBrID0gW2ZlZVBheWVyLnRvQmFzZTU4KCldO1xuXG4gICAgY29uc3Qgc2lnbmVycyA9IG5ldyBTZXQ8c3RyaW5nPihmZWVQYXllclBrKTtcbiAgICBjb25zdCBhY2NvdW50cyA9IG5ldyBTZXQ8c3RyaW5nPihmZWVQYXllclBrKTtcblxuICAgIGNvbnN0IGl4c1NpemUgPSB0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMucmVkdWNlKChhY2MsIGl4KSA9PiB7XG4gICAgICBpeC5rZXlzLmZvckVhY2goKHsgcHVia2V5LCBpc1NpZ25lciB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBrID0gcHVia2V5LnRvQmFzZTU4KCk7XG4gICAgICAgIGlmIChpc1NpZ25lcikgc2lnbmVycy5hZGQocGspO1xuICAgICAgICBhY2NvdW50cy5hZGQocGspO1xuICAgICAgfSk7XG5cbiAgICAgIGFjY291bnRzLmFkZChpeC5wcm9ncmFtSWQudG9CYXNlNTgoKSk7XG5cbiAgICAgIGNvbnN0IG5JbmRleGVzID0gaXgua2V5cy5sZW5ndGg7XG4gICAgICBjb25zdCBvcGFxdWVEYXRhID0gaXguZGF0YS5sZW5ndGg7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIGFjYyArXG4gICAgICAgIDEgKyAvLyBQSUQgaW5kZXhcbiAgICAgICAgY29tcGFjdEFycmF5U2l6ZShuSW5kZXhlcywgMSkgK1xuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG9wYXF1ZURhdGEsIDEpXG4gICAgICApO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoc2lnbmVycy5zaXplLCA2NCkgKyAvLyBzaWduYXR1cmVzXG4gICAgICAzICsgLy8gaGVhZGVyXG4gICAgICBjb21wYWN0QXJyYXlTaXplKGFjY291bnRzLnNpemUsIDMyKSArIC8vIGFjY291bnRzXG4gICAgICAzMiArIC8vIGJsb2NraGFzaFxuICAgICAgY29tcGFjdEhlYWRlcih0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMubGVuZ3RoKSArIC8vIGluc3RydWN0aW9uc1xuICAgICAgaXhzU2l6ZVxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIG1heCB0cmFuc2FjdGlvbiBzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgaXNPdmVyVHJhbnNhY3Rpb25TaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gY2FsY3VsYXRlVHhTaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllcikgPiBNQVhfVFJBTlNBQ1RJT05fU0laRTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQmF0Y2ggfSBmcm9tICcuL2JhdGNoJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21tb24gfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUGFydGlhbFNpZ24gfSBmcm9tICcuL3BhcnRpYWwtc2lnbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ2FsY3VsYXRlVHhzaXplIH0gZnJvbSAnLi9jYWxjdWxhdGUtdHhzaXplJztcbmltcG9ydCAnfi90eXBlcy9nbG9iYWwnO1xuaW1wb3J0ICd+L2dsb2JhbCc7XG5cbmV4cG9ydCBjb25zdCBUcmFuc2FjdGlvbkJ1aWxkZXIgPSB7XG4gIC4uLkJhdGNoLFxuICAuLi5DYWxjdWxhdGVUeHNpemUsXG4gIC4uLk1pbnQsXG4gIC4uLkNvbW1vbixcbiAgLi4uUGFydGlhbFNpZ24sXG4gIC4uLlByaW9yaXR5RmVlLFxufTtcbiIsICJpbXBvcnQgeyBBbnlPYmplY3QgfSBmcm9tICd+L3R5cGVzL3V0aWxzJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJy4vcmVzdWx0JztcblxuLyoqXG4gKiBjb252ZXJ0IGJ1ZmZlciB0byBBcnJheVxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXJcbiAqIEByZXR1cm5zIG51bWJlcltdXG4gKi9cbmV4cG9ydCBjb25zdCBidWZmZXJUb0FycmF5ID0gKGJ1ZmZlcjogQnVmZmVyKTogbnVtYmVyW10gPT4ge1xuICBjb25zdCBudW1zID0gW107XG4gIGZvciAoY29uc3QgYnl0ZSBvZiBidWZmZXIpIHtcbiAgICBudW1zLnB1c2goYnVmZmVyW2J5dGVdKTtcbiAgfVxuICByZXR1cm4gbnVtcztcbn07XG5cbi8qKlxuICogT3ZlcndyaXRlIEpTIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqZWN0XG4gKiBAcGFyYW0ge092ZXJ3cml0ZU9iamVjdFtdfSB0YXJnZXRzXG4gKiBAcmV0dXJucyBPYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IG92ZXJ3cml0ZU9iamVjdCA9IChcbiAgb2JqZWN0OiB1bmtub3duLFxuICB0YXJnZXRzOiB7XG4gICAgZXhpc3RzS2V5OiBzdHJpbmc7XG4gICAgd2lsbDogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHVua25vd24gfTtcbiAgfVtdLFxuKTogdW5rbm93biA9PiB7XG4gIGNvbnN0IHRoYXQ6IEFueU9iamVjdCA9IG9iamVjdCBhcyBBbnlPYmplY3Q7XG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgZGVsZXRlIHRoYXRbdGFyZ2V0LmV4aXN0c0tleV07XG4gICAgdGhhdFt0YXJnZXQud2lsbC5rZXldID0gdGFyZ2V0LndpbGwudmFsdWU7XG4gIH0pO1xuICByZXR1cm4gdGhhdDtcbn07XG5cbi8qKlxuICogRGlzcGxheSBsb2cgZm9yIHNvbGFuYS1zdWl0ZS1jb25maWcuanNcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGExXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEyXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEzXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGE0XG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z0xvZyA9IChcbiAgZGF0YTE6IHVua25vd24sXG4gIGRhdGEyOiB1bmtub3duID0gJycsXG4gIGRhdGEzOiB1bmtub3duID0gJycsXG4gIGRhdGE0OiB1bmtub3duID0gJycsXG4pOiB2b2lkID0+IHtcbiAgaWYgKENvbnN0YW50cy5pc0RlYnVnZ2luZyA9PT0gJ3RydWUnIHx8IHByb2Nlc3MuZW52LkRFQlVHID09PSAndHJ1ZScpIHtcbiAgICBjb25zb2xlLmxvZygnW0RFQlVHXScsIGRhdGExLCBkYXRhMiwgZGF0YTMsIGRhdGE0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBzbGVlcCB0aW1lclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNcbiAqIEByZXR1cm5zIFByb21pc2U8bnVtYmVyPlxuICovXG5leHBvcnQgY29uc3Qgc2xlZXAgPSBhc3luYyAoc2VjOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgc2VjICogMTAwMCkpO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNOb2RlID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMgIT0gbnVsbCAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPSBudWxsXG4gICk7XG59O1xuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9ialxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmV4cG9ydCBjb25zdCBpc1Byb21pc2UgPSAob2JqOiB1bmtub3duKTogb2JqIGlzIFByb21pc2U8dW5rbm93bj4gPT4ge1xuICByZXR1cm4gKFxuICAgICEhb2JqICYmXG4gICAgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpICYmXG4gICAgdHlwZW9mIChvYmogYXMgYW55KS50aGVuID09PSAnZnVuY3Rpb24nXG4gICk7XG59O1xuXG4vKipcbiAqIFRyeSBhc3luYyBtb25hZFxuICpcbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PFQsIEU+PlxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGFzeW5jYmxvY2s6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBQcm9taXNlPFJlc3VsdDxULCBFPj47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oYmxvY2s6ICgpID0+IFQpOiBSZXN1bHQ8VCwgRT47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGlucHV0OiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUmVzdWx0PFQsIEVycm9yPiB8IFByb21pc2U8UmVzdWx0PFQsIEVycm9yPj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHYgPSBpbnB1dCgpO1xuICAgIGlmIChpc1Byb21pc2UodikpIHtcbiAgICAgIHJldHVybiB2LnRoZW4oXG4gICAgICAgICh4OiBUKSA9PiBSZXN1bHQub2soeCksXG4gICAgICAgIChlcnI6IEUpID0+IFJlc3VsdC5lcnIoZXJyKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXN1bHQub2sodik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZSk7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKGUgYXMgc3RyaW5nKSk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGZpbmFsbHlJbnB1dCkge1xuICAgICAgZGVidWdMb2coJyMgZmluYWxseSBpbnB1dDonLCBmaW5hbGx5SW5wdXQpO1xuICAgICAgZmluYWxseUlucHV0KCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfHVuZGVmaW5lZH0gY3JlYXRlZF9hdFxuICogQHJldHVybnMgRGF0ZSB8IHVuZGVmaW5lZFxuICovXG5leHBvcnQgY29uc3QgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgPSAoXG4gIGNyZWF0ZWRfYXQ6IG51bWJlciB8IHVuZGVmaW5lZCxcbik6IERhdGUgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoY3JlYXRlZF9hdCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShjcmVhdGVkX2F0ICogMTAwMCk7XG4gIH1cbiAgcmV0dXJuO1xufTtcblxuLyoqXG4gKiBHZXQgdW5peCB0aW1lc3RhbXBcbiAqXG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHVuaXhUaW1lc3RhbXAgPSAoKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbn07XG4iLCAiLy8gZm9ya2VkOiBodHRwczovL2dpdGh1Yi5jb20vYmFkcmFwL3Jlc3VsdCwgdGhhbmsgeW91IGFkdmljZSAgQGp2aWlkZVxuaW1wb3J0IHsgVHJhbnNhY3Rpb25TaWduYXR1cmUgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQ29tbW9uU3RydWN0dXJlLFxuICBNaW50U3RydWN0dXJlLFxuICBQYXJ0aWFsU2lnblN0cnVjdHVyZSxcbiAgU3VibWl0T3B0aW9ucyxcbn0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnLi9zaGFyZWQnO1xuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3I+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG5cbiAgdW53cmFwKCk6IFQ7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogVTtcbiAgdW53cmFwPFUsIFY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBWKTogVSB8IFY7XG4gIC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDEwXG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVSk6IFU7XG4gIHVud3JhcChvaz86ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiB1bmtub3duKTogdW5rbm93biB7XG4gICAgY29uc3QgciA9IHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sgPyBvayh2YWx1ZSkgOiB2YWx1ZSksXG4gICAgICAoZXJyb3IpID0+IChlcnIgPyBSZXN1bHQub2soZXJyKGVycm9yKSkgOiBSZXN1bHQuZXJyKGVycm9yKSksXG4gICAgKTtcbiAgICBpZiAoci5pc0Vycikge1xuICAgICAgdGhyb3cgci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHIudmFsdWU7XG4gIH1cblxuICAvLy8vIG1hcCAvLy8vXG4gIG1hcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogUmVzdWx0PFUsIEU+O1xuICBtYXA8VSwgRiBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBVLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBGLFxuICApOiBSZXN1bHQ8VSwgRj47XG4gIG1hcChvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IEVycm9yKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVyciA/IGVycihlcnJvcikgOiBlcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLy8gY2hhaW4gLy8vL1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuICBjaGFpbihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICAgZXJyPzogKGVycm9yOiBFKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICk6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKG9rLCBlcnIgfHwgKChlcnJvcikgPT4gUmVzdWx0LmVycihlcnJvcikpKTtcbiAgfVxuXG4gIC8vLy8gbWF0Y2ggLy8vL1xuICBtYXRjaDxVLCBGPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gRik6IHZvaWQgfCBQcm9taXNlPHZvaWQ+O1xuXG4gIG1hdGNoKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IHVua25vd24sXG4gICk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyKGVycm9yKSBhcyBFcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLyBzaW5nbGUgVHJhbnNhY3Rpb25CdWlsZGVyIC8vLy9cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBhc3luYyBzdWJtaXQoXG4gICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5tYXAoXG4gICAgICBhc3luYyAob2spID0+IHtcbiAgICAgICAgZGVidWdMb2coJyMgcmVzdWx0IHNpbmdsZSBzdWJtaXQ6ICcsIG9rKTtcbiAgICAgICAgY29uc3Qgb2JqID0gb2sgYXNcbiAgICAgICAgICB8IENvbW1vblN0cnVjdHVyZVxuICAgICAgICAgIHwgTWludFN0cnVjdHVyZVxuICAgICAgICAgIHwgUGFydGlhbFNpZ25TdHJ1Y3R1cmU7XG4gICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KG9wdGlvbnMpO1xuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihyZXMuZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnZhbHVlO1xuICB9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgc3VibWl0KFxuICAgICAgb3B0aW9ucz86IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj47XG4gIH1cbn1cblxuLy8gVHJhbnNhY3Rpb25CdWlsZGVyLkJhdGNoXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSkge1xuICBjb25zdCBpbnN0cnVjdGlvbnM6IENvbW1vblN0cnVjdHVyZSB8IE1pbnRTdHJ1Y3R1cmVbXSA9IFtdO1xuICBmb3IgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9IGVsc2UgaWYgKG9iai5pc09rKSB7XG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcignT25seSBBcnJheSBJbnN0cnVjdGlvbiBvYmplY3QnKSk7XG4gICAgfVxuICB9XG4gIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBzdWJtaXQ6ICcsIGluc3RydWN0aW9ucyk7XG4gIGNvbnN0IGJhdGNoT3B0aW9ucyA9IHtcbiAgICBmZWVQYXllcjogb3B0aW9ucy5mZWVQYXllcixcbiAgICBpc1ByaW9yaXR5RmVlOiBvcHRpb25zLmlzUHJpb3JpdHlGZWUsXG4gICAgaW5zdHJ1Y3Rpb25zOiBpbnN0cnVjdGlvbnMsXG4gIH07XG4gIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkJhdGNoKCkuc3VibWl0KGJhdGNoT3B0aW9ucyk7XG4gIC8vIH1cbn07XG5cbmNsYXNzIEludGVybmFsT2s8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IHRydWU7XG4gIHJlYWRvbmx5IGlzRXJyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHZhbHVlOiBUKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIF9lcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBJbnRlcm5hbEVycjxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gZmFsc2U7XG4gIHJlYWRvbmx5IGlzRXJyID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgZXJyb3I6IEUpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIF9vazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVzdWx0IHtcbiAgZXhwb3J0IHR5cGUgT2s8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsT2s8VCwgRT47XG4gIGV4cG9ydCB0eXBlIEVycjxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxFcnI8VCwgRT47XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4odmFsdWU6IFQpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxPayh2YWx1ZSk7XG4gIH1cbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I/OiBFKTogUmVzdWx0PFQsIEU+O1xuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcjogRSk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbEVycihlcnJvciB8fCBFcnJvcigpKTtcbiAgfVxuXG4gIHR5cGUgVSA9IFJlc3VsdDx1bmtub3duPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICAgIFIxNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0LCBSMTVdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgICBPa1R5cGU8UjE1PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICAgIHwgUjE1XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICBSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMSB8IFIxMiB8IFIxM1xuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTJdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjhdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjg+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjddLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjc+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjVdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND4sIE9rVHlwZTxSNT5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQ+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVSwgUjMgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSM10sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+XSwgRXJyVHlwZTxSMCB8IFIxIHwgUjI+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+XSwgRXJyVHlwZTxSMCB8IFIxPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMF0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPl0sIEVyclR5cGU8UjA+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IFtdKTogUmVzdWx0PFtdPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxUIGV4dGVuZHMgVVtdIHwgUmVjb3JkPHN0cmluZywgVT4+KFxuICAgIG9iajogVCxcbiAgKTogUmVzdWx0PFxuICAgIHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgST4gPyBJIDogbmV2ZXIgfSxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPiA/IEUgOiBuZXZlcjtcbiAgICB9W2tleW9mIFRdXG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgY29uc3QgcmVzQXJyID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqKSB7XG4gICAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gYXMgdW5rbm93bjtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZXN1bHQub2socmVzQXJyKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPik7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3QgaXRlbSA9IChvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pW2tleV07XG4gICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICAgIHJlc1trZXldID0gaXRlbS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5vayhyZXMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3IgPSBFcnJvcj4gPVxuICB8IFJlc3VsdC5PazxULCBFPlxuICB8IFJlc3VsdC5FcnI8VCwgRT47XG5cbnR5cGUgT2tUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDxpbmZlciBPPiA/IE8gOiBuZXZlcjtcbnR5cGUgRXJyVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT5cbiAgPyBFXG4gIDogbmV2ZXI7XG4iLCAiaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBDb21taXRtZW50LCBDb25uZWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcbiAgY29uc3Qgc2V0dGVkID0ge1xuICAgIGNsdXN0ZXJVcmw6ICcnLFxuICAgIGNvbW1pdG1lbnQ6IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICAgIGN1c3RvbUNsdXN0ZXJVcmw6IFtdIGFzIHN0cmluZ1tdLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uID0gKCk6IENvbm5lY3Rpb24gPT4ge1xuICAgIGlmIChzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjdXN0b20gY2x1c3RlclxuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGN1c3RvbUNsdXN0ZXJVcmw6IHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjdXN0b20gY2x1c3RlciBieSBqc29uIGNvbmZpZ1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGN1c3RvbUNsdXN0ZXJVcmw6IENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghc2V0dGVkLmNsdXN0ZXJVcmwpIHtcbiAgICAgIC8vIGRlZmF1bHQgY2x1c3RlclxuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghc2V0dGVkLmNvbW1pdG1lbnQpIHtcbiAgICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uKHNldHRlZC5jbHVzdGVyVXJsLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNoYW5nZUNvbm5lY3Rpb24gPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGNvbW1pdG1lbnQ/OiBDb21taXRtZW50O1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHZvaWQgPT4ge1xuICAgIC8vIGluaXRpYWxpemVcbiAgICBzZXR0ZWQuY2x1c3RlclVybCA9ICcnO1xuICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gW107XG4gICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcblxuICAgIGNvbnN0IHsgY2x1c3RlciwgY29tbWl0bWVudCwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG4gICAgaWYgKGNvbW1pdG1lbnQpIHtcbiAgICAgIHNldHRlZC5jb21taXRtZW50ID0gY29tbWl0bWVudDtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNvbW1pdG1lbnQ6ICcsIHNldHRlZC5jb21taXRtZW50KTtcbiAgICB9XG5cbiAgICBpZiAoY2x1c3Rlcikge1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7IGNsdXN0ZXI6IGNsdXN0ZXIgfSk7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjbHVzdGVyVXJsOiAnLCBzZXR0ZWQuY2x1c3RlclVybCk7XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGN1c3RvbUNsdXN0ZXJVcmw6ICcsIGN1c3RvbUNsdXN0ZXJVcmwpO1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7IGN1c3RvbUNsdXN0ZXJVcmwgfSk7XG4gICAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IGN1c3RvbUNsdXN0ZXJVcmw7XG4gICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgJyMgTm9kZSBjaGFuZ2UgY2x1c3RlciwgY3VzdG9tIGNsdXN0ZXIgdXJsOiAnLFxuICAgICAgICBzZXR0ZWQuY2x1c3RlclVybCxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjb25maXJtZWRTaWcgPSBhc3luYyAoXG4gICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgY29tbWl0bWVudDogQ29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICApID0+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgbGF0ZXN0QmxvY2toYXNoID0gYXdhaXQgY29ubmVjdGlvbi5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICByZXR1cm4gYXdhaXQgY29ubmVjdGlvblxuICAgICAgLmNvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGJsb2NraGFzaDogbGF0ZXN0QmxvY2toYXNoLmJsb2NraGFzaCxcbiAgICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogbGF0ZXN0QmxvY2toYXNoLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tbWl0bWVudCxcbiAgICAgIClcbiAgICAgIC50aGVuKFJlc3VsdC5vaylcbiAgICAgIC5jYXRjaChSZXN1bHQuZXJyKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBBY2NvdW50TWV0YSxcbiAgUHVibGljS2V5LFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IERhc0FwaSB9IGZyb20gJ34vZGFzLWFwaSc7XG5pbXBvcnQgeyBjcmVhdGVEZWxlZ2F0ZUluc3RydWN0aW9uIH0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5pbXBvcnQge1xuICBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQsXG4gIFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gIFNQTF9OT09QX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLWFjY291bnQtY29tcHJlc3Npb24nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBEZWxlZ2F0ZU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2NvbXByZXNzZWQtbmZ0JztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVEZWxlYWdhdGUgPSBhc3luYyAoXG4gICAgYXNzZXRJZDogUHVibGljS2V5LFxuICAgIG5ld0RlbGVnYXRlOiBQdWJsaWNLZXkgfCBudWxsLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24+ID0+IHtcbiAgICBjb25zdCBycGNBc3NldFByb29mID0gYXdhaXQgRGFzQXBpLmdldEFzc2V0UHJvb2YoYXNzZXRJZC50b1N0cmluZygpKTtcbiAgICBjb25zdCBycGNBc3NldCA9IGF3YWl0IERhc0FwaS5nZXRBc3NldChhc3NldElkLnRvU3RyaW5nKCkpO1xuICAgIGlmIChycGNBc3NldFByb29mLmlzRXJyIHx8IHJwY0Fzc2V0LmlzRXJyKSB7XG4gICAgICB0aHJvdyBFcnJvcignUmlzZSBlcnJvciB3aGVuIGdldCBhc3NldCBwcm9vZiBvciBhc3NldCcpO1xuICAgIH1cbiAgICBjb25zdCBjb21wcmVzc2lvbiA9IHJwY0Fzc2V0LnZhbHVlLmNvbXByZXNzaW9uO1xuICAgIGNvbnN0IG93bmVyc2hpcCA9IHJwY0Fzc2V0LnZhbHVlLm93bmVyc2hpcDtcbiAgICBjb25zdCBhc3NldFByb29mID0gcnBjQXNzZXRQcm9vZi52YWx1ZTtcbiAgICBjb25zdCB0cmVlT3duZXIgPSBhc3NldFByb29mLnRyZWVfaWQudG9QdWJsaWNLZXkoKTtcblxuICAgIGNvbnN0IHRyZWVBdXRob3JpdHkgPSBBY2NvdW50LlBkYS5nZXRUcmVlQXV0aG9yaXR5KGFzc2V0UHJvb2YudHJlZV9pZCk7XG4gICAgY29uc3QgcHJldmlvdXNMZWFmRGVsZWdhdGUgPSBvd25lcnNoaXAuZGVsZWdhdGVcbiAgICAgID8gb3duZXJzaGlwLmRlbGVnYXRlLnRvUHVibGljS2V5KClcbiAgICAgIDogb3duZXJzaGlwLm93bmVyLnRvUHVibGljS2V5KCk7XG4gICAgY29uc3QgbmV3TGVhZkRlbGVnYXRlID0gbmV3RGVsZWdhdGUgPyBuZXdEZWxlZ2F0ZSA6IHByZXZpb3VzTGVhZkRlbGVnYXRlO1xuICAgIGNvbnN0IHRyZWVBY2NvdW50ID0gYXdhaXQgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgdHJlZU93bmVyLFxuICAgICk7XG4gICAgY29uc3QgY2Fub3B5RGVwdGggPSB0cmVlQWNjb3VudC5nZXRDYW5vcHlEZXB0aCgpO1xuICAgIGNvbnN0IHNsaWNlZFByb29mOiBBY2NvdW50TWV0YVtdID0gYXNzZXRQcm9vZi5wcm9vZlxuICAgICAgLm1hcCgobm9kZTogc3RyaW5nKSA9PiAoe1xuICAgICAgICBwdWJrZXk6IG5vZGUudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pKVxuICAgICAgLnNsaWNlKDAsIGFzc2V0UHJvb2YucHJvb2YubGVuZ3RoIC0gKGNhbm9weURlcHRoID8gY2Fub3B5RGVwdGggOiAwKSk7XG5cbiAgICByZXR1cm4gY3JlYXRlRGVsZWdhdGVJbnN0cnVjdGlvbihcbiAgICAgIHtcbiAgICAgICAgdHJlZUF1dGhvcml0eSxcbiAgICAgICAgbGVhZk93bmVyOiBvd25lcnNoaXAub3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgcHJldmlvdXNMZWFmRGVsZWdhdGUsXG4gICAgICAgIG5ld0xlYWZEZWxlZ2F0ZSxcbiAgICAgICAgbWVya2xlVHJlZTogYXNzZXRQcm9vZi50cmVlX2lkLnRvUHVibGljS2V5KCksXG4gICAgICAgIGxvZ1dyYXBwZXI6IFNQTF9OT09QX1BST0dSQU1fSUQsXG4gICAgICAgIGNvbXByZXNzaW9uUHJvZ3JhbTogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgYW5jaG9yUmVtYWluaW5nQWNjb3VudHM6IHNsaWNlZFByb29mLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcm9vdDogWy4uLmFzc2V0UHJvb2Yucm9vdC50cmltKCkudG9QdWJsaWNLZXkoKS50b0J5dGVzKCldLFxuICAgICAgICBkYXRhSGFzaDogWy4uLmNvbXByZXNzaW9uLmRhdGFfaGFzaC50cmltKCkudG9QdWJsaWNLZXkoKS50b0J5dGVzKCldLFxuICAgICAgICBjcmVhdG9ySGFzaDogW1xuICAgICAgICAgIC4uLmNvbXByZXNzaW9uLmNyZWF0b3JfaGFzaC50cmltKCkudG9QdWJsaWNLZXkoKS50b0J5dGVzKCksXG4gICAgICAgIF0sXG4gICAgICAgIG5vbmNlOiBjb21wcmVzc2lvbi5sZWFmX2lkLFxuICAgICAgICBpbmRleDogY29tcHJlc3Npb24ubGVhZl9pZCxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IGRlbGVnYXRlXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgLy8gdGFyZ2V0IG1pbnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyICAgLy8gbmV3IGRlbGVnYXRlIG9yIHByZXZpb3VzIGRlbGVnYXRlIHNpZ25lclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RGVsZWdhdGVPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3Qgc2V0RGVsZWdhdGUgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxEZWxlZ2F0ZU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBuZXdEZWxlZ2F0ZSA9IG9wdGlvbnMuZGVsZWdhdGVcbiAgICAgICAgPyBvcHRpb25zLmRlbGVnYXRlLnRvUHVibGljS2V5KClcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29uc3QgaW5zdCA9IGF3YWl0IGNyZWF0ZURlbGVhZ2F0ZShtaW50LnRvUHVibGljS2V5KCksIG5ld0RlbGVnYXRlKTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihbaW5zdF0sIFtvd25lci50b0tleXBhaXIoKV0pO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBEYXNBcGkgfSBmcm9tICd+L2Rhcy1hcGknO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE1ldGFkYXRhLCBOZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvbmZ0JztcbmltcG9ydCB7IEZpbmRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9maW5kJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG93bmVyIGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBEYXNBcGkuZmluZEJ5T3duZXIob3duZXIsIHRydWUsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBtaW50IGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsPE1ldGFkYXRhPiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgRGFzQXBpLmZpbmRCeU1pbnQobWludCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IGNvbGxlY3Rpb24gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeUNvbGxlY3Rpb24gPSBhc3luYyAoXG4gICAgY29sbGVjdGlvbk1pbnQ6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gRGFzQXBpLmZpbmRCeUNvbGxlY3Rpb24oY29sbGVjdGlvbk1pbnQsIHRydWUsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgRGVsZWdhdGUgfSBmcm9tICcuL2RlbGVnYXRlJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBHYXNzTGVzc0RlbGVnYXRlT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvY29tcHJlc3NlZC1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICAvKipcbiAgICogQ3JlYXRlIGRlbGVnYXRlIHdpdGggZ2FzLWxlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBuZXdEZWxlZ2F0ZVxuICAgKiBAcGFyYW0ge1BhcnRpYWw8R2Fzc0xlc3NEZWxlZ2F0ZU9wdGlvbnM+IH0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblRyYW5zYWN0aW9uLCBFcnJvcj4+fVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NEZWxlZ2F0ZSA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBuZXdEZWxlZ2F0ZTogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8R2Fzc0xlc3NEZWxlZ2F0ZU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBEZWxlZ2F0ZS5jcmVhdGVEZWxlYWdhdGUoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3RGVsZWdhdGUudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBuZXdEZWxlZ2F0ZS50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICB0eC5hZGQoaW5zdCk7XG5cbiAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgdHguYWRkKFxuICAgICAgICAgIGF3YWl0IFRyYW5zYWN0aW9uQnVpbGRlci5Qcmlvcml0eUZlZS5jcmVhdGVQcmlvcml0eUZlZUluc3RydWN0aW9uKHR4KSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdHgucGFydGlhbFNpZ24ob3duZXIudG9LZXlwYWlyKCkpO1xuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuUGFydGlhbFNpZ24oXG4gICAgICAgIHR4XG4gICAgICAgICAgLnNlcmlhbGl6ZSh7XG4gICAgICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9TdHJpbmcoJ2hleCcpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIERlbGVnYXRlIH0gZnJvbSAnLi9nYXMtbGVzcy1kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBHYXNzTGVzc1RyYW5zZmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvY29tcHJlc3NlZC1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICAvKipcbiAgICogVHJhbnNmZXIgd2l0aCBnYXMtbGVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3RcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNzTGVzc1RyYW5zZmVyT3B0aW9ucz4gfSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblRyYW5zYWN0aW9uW10sIEVycm9yPj59XG4gICAqL1xuICBleHBvcnQgY29uc3QgZ2FzTGVzc1RyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8R2Fzc0xlc3NUcmFuc2Zlck9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGRlbGVnYXRlID0gYXdhaXQgRGVsZWdhdGUuZ2FzTGVzc0RlbGVnYXRlKG1pbnQsIG93bmVyLCBmZWVQYXllcik7XG4gICAgICBhd2FpdCBkZWxlZ2F0ZS5zdWJtaXQoKTtcbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG5cbiAgICAgIHR4LmFkZChcbiAgICAgICAgYXdhaXQgVHJhbnNmZXIuY3JlYXRlVHJhbnNmZXIoXG4gICAgICAgICAgbWludCxcbiAgICAgICAgICBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBvd25lciB9KS5wdWJrZXksXG4gICAgICAgICAgZGVzdCxcbiAgICAgICAgICBmZWVQYXllcixcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgdHguYWRkKFxuICAgICAgICAgIGF3YWl0IFRyYW5zYWN0aW9uQnVpbGRlci5Qcmlvcml0eUZlZS5jcmVhdGVQcmlvcml0eUZlZUluc3RydWN0aW9uKHR4KSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuUGFydGlhbFNpZ24oXG4gICAgICAgIHR4XG4gICAgICAgICAgLnNlcmlhbGl6ZSh7XG4gICAgICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9TdHJpbmcoJ2hleCcpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRGFzQXBpIH0gZnJvbSAnfi9kYXMtYXBpJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2Zlckluc3RydWN0aW9uIH0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5pbXBvcnQge1xuICBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQsXG4gIFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gIFNQTF9OT09QX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLWFjY291bnQtY29tcHJlc3Npb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmxpY0tleSwgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBleHBvcnQgY29uc3QgY3JlYXRlVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgYXNzZXRJZDogUHVia2V5LFxuICAgIGFzc2V0SWRPd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBkZWxlZ2F0ZT86IFB1YmtleSxcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uPiA9PiB7XG4gICAgY29uc3QgYXNzZXRQcm9vZiA9IGF3YWl0IERhc0FwaS5nZXRBc3NldFByb29mKGFzc2V0SWQpO1xuICAgIGlmIChhc3NldFByb29mLmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldFByb29mLmVycm9yO1xuICAgIH0gZWxzZSBpZiAoYXNzZXRQcm9vZi5pc09rICYmIGFzc2V0UHJvb2YudmFsdWUucHJvb2YubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcignUHJvb2YgaXMgZW1wdHkuIE1heSBiZSBzZXQgUmVndWxhciBORlQ/Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgYXNzZXQgPSBhd2FpdCBEYXNBcGkuZ2V0QXNzZXQoYXNzZXRJZCk7XG4gICAgaWYgKGFzc2V0LmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldC5lcnJvcjtcbiAgICB9IGVsc2UgaWYgKGFzc2V0LmlzT2sgJiYgYXNzZXQudmFsdWUub3duZXJzaGlwLm93bmVyICE9PSBhc3NldElkT3duZXIpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgTkZUIGlzIG5vdCBvd25lZCBieSB0aGUgZXhwZWN0ZWQgb3duZXI6IGN1cnJlbnQ6ICR7YXNzZXQudmFsdWUub3duZXJzaGlwLm93bmVyfSwgZXhwZWN0ZWQ6ICR7YXNzZXRJZE93bmVyfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGRlYnVnTG9nKCcjIGFzc2V0UHJvb2Y6ICcsIGFzc2V0UHJvb2YudmFsdWUpO1xuICAgIGRlYnVnTG9nKCcjIG93bmVyc2hpcDogJywgYXNzZXQudmFsdWUub3duZXJzaGlwKTtcbiAgICBkZWJ1Z0xvZygnIyBhdXRob3JpdGllczogJywgYXNzZXQudmFsdWUuYXV0aG9yaXRpZXMpO1xuXG4gICAgY29uc3QgY29tcHJlc3Npb24gPSBhc3NldC52YWx1ZS5jb21wcmVzc2lvbjtcbiAgICBjb25zdCBvd25lcnNoaXAgPSBhc3NldC52YWx1ZS5vd25lcnNoaXA7XG4gICAgY29uc3QgcHJvb2YgPSBhc3NldFByb29mLnZhbHVlLnByb29mO1xuICAgIGNvbnN0IG1lcmtsZVRyZWUgPSBjb21wcmVzc2lvbi50cmVlLnRvUHVibGljS2V5KCk7XG4gICAgY29uc3QgdHJlZUFjY291bnQgPSBhd2FpdCBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICBtZXJrbGVUcmVlLFxuICAgICk7XG4gICAgY29uc3QgdHJlZUF1dGhvcml0eSA9IHRyZWVBY2NvdW50LmdldEF1dGhvcml0eSgpO1xuICAgIGNvbnN0IGNhbm9weURlcHRoID0gdHJlZUFjY291bnQuZ2V0Q2Fub3B5RGVwdGgoKTtcblxuICAgIGNvbnN0IHByb29mUGF0aCA9IHByb29mXG4gICAgICAubWFwKChub2RlOiBzdHJpbmcpID0+ICh7XG4gICAgICAgIHB1YmtleTogbm9kZS50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc1NpZ25lcjogZmFsc2UsXG4gICAgICAgIGlzV3JpdGFibGU6IGZhbHNlLFxuICAgICAgfSkpXG4gICAgICAuc2xpY2UoMCwgcHJvb2YubGVuZ3RoIC0gKGNhbm9weURlcHRoID8gY2Fub3B5RGVwdGggOiAwKSk7XG5cbiAgICBjb25zdCBsZWFmT3duZXIgPSBvd25lcnNoaXAub3duZXIudG9QdWJsaWNLZXkoKTtcbiAgICBjb25zdCBuZXdMZWFmT3duZXIgPSBkZXN0LnRvUHVibGljS2V5KCk7XG4gICAgY29uc3QgbGVhZk5vbmNlID0gY29tcHJlc3Npb24ubGVhZl9pZDtcbiAgICBsZXQgbGVhZkRlbGVnYXRlOiBQdWJsaWNLZXk7XG4gICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICBsZWFmRGVsZWdhdGUgPSBkZWxlZ2F0ZS50b1B1YmxpY0tleSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZWFmRGVsZWdhdGUgPSBvd25lcnNoaXAuZGVsZWdhdGVcbiAgICAgICAgPyBvd25lcnNoaXAuZGVsZWdhdGUudG9QdWJsaWNLZXkoKVxuICAgICAgICA6IGxlYWZPd25lcjtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZVRyYW5zZmVySW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIG1lcmtsZVRyZWUsXG4gICAgICAgIHRyZWVBdXRob3JpdHksXG4gICAgICAgIGxlYWZPd25lcixcbiAgICAgICAgbGVhZkRlbGVnYXRlLFxuICAgICAgICBuZXdMZWFmT3duZXIsXG4gICAgICAgIGxvZ1dyYXBwZXI6IFNQTF9OT09QX1BST0dSQU1fSUQsXG4gICAgICAgIGNvbXByZXNzaW9uUHJvZ3JhbTogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgYW5jaG9yUmVtYWluaW5nQWNjb3VudHM6IHByb29mUGF0aCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IFsuLi5hc3NldFByb29mLnZhbHVlLnJvb3QudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgZGF0YUhhc2g6IFsuLi5jb21wcmVzc2lvbi5kYXRhX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgY3JlYXRvckhhc2g6IFtcbiAgICAgICAgICAuLi5jb21wcmVzc2lvbi5jcmVhdG9yX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpLFxuICAgICAgICBdLFxuICAgICAgICBub25jZTogbGVhZk5vbmNlLFxuICAgICAgICBpbmRleDogbGVhZk5vbmNlLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiB0cmFuc2ZlciBuZnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0XG4gICAqIEBwYXJhbSB7U2VjcmV0W119IG93bmVyT3JNdWx0aXNpZ1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgdHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIG93bmVyT3JNdWx0aXNpZzogU2VjcmV0W10sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IG93bmVyT3JNdWx0aXNpZy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuICAgICAgY29uc3QgaW5zdCA9IGF3YWl0IGNyZWF0ZVRyYW5zZmVyKG1pbnQsIG93bmVyLCBkZXN0KTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihbaW5zdF0sIGtleXBhaXJzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBpc0Jyb3dzZXIsIGlzTm9kZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIElkZW50aXR5LCBUYWdzLCBVcGxvYWRhYmxlRmlsZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgUGhhbnRvbVByb3ZpZGVyIH0gZnJvbSAnfi90eXBlcy9waGFudG9tJztcbmltcG9ydCBJcnlzLCB7IFdlYklyeXMgfSBmcm9tICdAaXJ5cy9zZGsnO1xuaW1wb3J0IHsgVXBsb2FkUmVzcG9uc2UgfSBmcm9tICdAaXJ5cy9zZGsvYnVpbGQvZXNtL2NvbW1vbi90eXBlcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUHJvdmVuYW5jZUxheWVyIHtcbiAgY29uc3QgVE9LRU4gPSAnc29sYW5hJztcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChcbiAgICB1cGxvYWRGaWxlOiBGaWxlVHlwZSxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICAgdGFncz86IFRhZ3MsXG4gICk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGxldCByZWNlaXB0ITogVXBsb2FkUmVzcG9uc2U7XG4gICAgaWYgKGlzVXBsb2FkYWJsZSh1cGxvYWRGaWxlKSkge1xuICAgICAgcmVjZWlwdCA9IGF3YWl0IGlyeXMudXBsb2FkRmlsZSh1cGxvYWRGaWxlLCB7IHRhZ3MgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBmaWxlIHR5cGUgb3IgZW52aXJvbWVudCcpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7Q29uc3RhbnRzLklSWVNfR0FURVdBWV9VUkx9LyR7cmVjZWlwdC5pZH1gO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIGRhdGE6IHN0cmluZyxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICAgdGFncz86IFRhZ3MsXG4gICk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGNvbnN0IHJlY2VpcHQgPSBhd2FpdCBpcnlzLnVwbG9hZChkYXRhLCB7IHRhZ3MgfSk7XG4gICAgcmV0dXJuIGAke0NvbnN0YW50cy5JUllTX0dBVEVXQVlfVVJMfS8ke3JlY2VpcHQuaWR9YDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOb2RlYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyA9PiB7XG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc0Jyb3dzZXJhYmxlID0gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgRmlsZSA9PiB7XG4gICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGaWxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzVXBsb2FkYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFVwbG9hZGFibGVGaWxlVHlwZSA9PiB7XG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGaWxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBmdW5kQXJ3ZWF2ZSA9IGFzeW5jIChcbiAgICB1cGxvYWRGaWxlOiBGaWxlVHlwZSxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCBieXRlTGVuZ3RoID0gYXdhaXQgdG9CeXRlTGVuZ3RoKHVwbG9hZEZpbGUpO1xuICAgIGNvbnN0IHdpbGxQYXkgPSBhd2FpdCBjYWxjdWxhdGVDb3N0KGJ5dGVMZW5ndGgsIGlkZW50aXR5KTtcbiAgICBjb25zdCBmdW5kVHggPSBhd2FpdCBpcnlzLmZ1bmQoaXJ5cy51dGlscy50b0F0b21pYyh3aWxsUGF5KSk7XG4gICAgZGVidWdMb2coJyMgZnVuZFR4OiAnLCBmdW5kVHgpO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgdG9CeXRlTGVuZ3RoID0gYXN5bmMgKGNvbnRlbnQ6IEZpbGVUeXBlKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSAxMDA7XG4gICAgaWYgKGlzTm9kZWFibGUoY29udGVudCkpIHtcbiAgICAgIGxlbmd0aCA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhjb250ZW50KS5sZW5ndGg7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXJhYmxlKGNvbnRlbnQpKSB7XG4gICAgICBsZW5ndGggPSBjb250ZW50LnNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBjb250ZW50IHR5cGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldElyeXMgPSBhc3luYyA8VCBleHRlbmRzIElyeXMgfCBXZWJJcnlzPihcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICkgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIChhd2FpdCBnZXROb2RlSXJ5cyhpZGVudGl0eSBhcyBTZWNyZXQpKSBhcyBUO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZ2V0QnJvd3NlcklyeXMoaWRlbnRpdHkgYXMgUGhhbnRvbVByb3ZpZGVyKSkgYXMgVDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ09ubHkgTm9kZS5qcyBvciBCcm93c2VyJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0Tm9kZUlyeXMgPSBhc3luYyAoc2VjcmV0OiBTZWNyZXQpID0+IHtcbiAgICBjb25zdCBjbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgIH0pO1xuICAgIGNvbnN0IHVybCA9IENvbnN0YW50cy5CVU5ETFJfTkVUV09SS19VUkw7XG4gICAgY29uc3QgdG9rZW4gPSBUT0tFTjtcbiAgICBjb25zdCBrZXkgPSBzZWNyZXQ7XG4gICAgY29uc3QgaXJ5cyA9IG5ldyBJcnlzKHtcbiAgICAgIHVybCxcbiAgICAgIHRva2VuLFxuICAgICAga2V5LFxuICAgICAgY29uZmlnOiB7IHByb3ZpZGVyVXJsOiBjbHVzdGVyVXJsIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIGlyeXM7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXRCcm93c2VySXJ5cyA9IGFzeW5jIChcbiAgICBwcm92aWRlcjogUGhhbnRvbVByb3ZpZGVyLFxuICApOiBQcm9taXNlPFdlYklyeXM+ID0+IHtcbiAgICBjb25zdCBjbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgIH0pO1xuICAgIGNvbnN0IHVybCA9IENvbnN0YW50cy5CVU5ETFJfTkVUV09SS19VUkw7XG4gICAgY29uc3QgdG9rZW4gPSBUT0tFTjtcbiAgICBjb25zdCB3YWxsZXQgPSB7IHJwY1VybDogY2x1c3RlclVybCwgbmFtZTogVE9LRU4sIHByb3ZpZGVyOiBwcm92aWRlciB9O1xuICAgIGNvbnN0IHdlYklyeXMgPSBuZXcgV2ViSXJ5cyh7IHVybCwgdG9rZW4sIHdhbGxldCB9KTtcbiAgICBhd2FpdCB3ZWJJcnlzLnJlYWR5KCk7XG4gICAgcmV0dXJuIHdlYklyeXM7XG4gIH07XG5cbiAgY29uc3QgY2FsY3VsYXRlQ29zdCA9IGFzeW5jIChzaXplOiBudW1iZXIsIGlkZW50aXR5OiBJZGVudGl0eSkgPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCBwcmljZUF0b21pYyA9IGF3YWl0IGlyeXMuZ2V0UHJpY2Uoc2l6ZSk7XG4gICAgY29uc3QgcHJpY2VDb252ZXJ0ZWQgPSBpcnlzLnV0aWxzLmZyb21BdG9taWMocHJpY2VBdG9taWMpO1xuICAgIGRlYnVnTG9nKCcjIHNpemU6ICcsIHNpemUpO1xuICAgIGRlYnVnTG9nKGAjIHByaWNlOiAke3ByaWNlQ29udmVydGVkfWApO1xuICAgIHJldHVybiBwcmljZUNvbnZlcnRlZDtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQcm92ZW5hbmNlTGF5ZXIgfSBmcm9tICcuL3Byb3ZlbmFuY2UtbGF5ZXInO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBcndlYXZlIHtcbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgZmlsZTogJywgZmlsZVBhdGgpO1xuICAgICAgYXdhaXQgUHJvdmVuYW5jZUxheWVyLmZ1bmRBcndlYXZlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgICByZXR1cm4gYXdhaXQgUHJvdmVuYW5jZUxheWVyLnVwbG9hZEZpbGUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IChcbiAgICBzdG9yYWdlRGF0YTogT2ZmY2hhaW4sXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VEYXRhLmNyZWF0ZWRfYXQgPSB1bml4VGltZXN0YW1wKCk7XG4gICAgICBkZWJ1Z0xvZygnIyBXaWxsIHVwbG9hZCBvZmZjaGFpbjogJywgc3RvcmFnZURhdGEpO1xuICAgICAgcmV0dXJuIGF3YWl0IFByb3ZlbmFuY2VMYXllci51cGxvYWREYXRhKFxuICAgICAgICBKU09OLnN0cmluZ2lmeShzdG9yYWdlRGF0YSksXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBCbG9iLCBORlRTdG9yYWdlIH0gZnJvbSAnbmZ0LnN0b3JhZ2UnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnksIHVuaXhUaW1lc3RhbXAgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFByb3ZlbmFuY2VMYXllciB9IGZyb20gJy4vcHJvdmVuYW5jZS1sYXllcic7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5mdFN0b3JhZ2Uge1xuICBjb25zdCBjcmVhdGVHYXRld2F5VXJsID0gKGNpZDogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgYCR7Q29uc3RhbnRzLk5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMfS8ke2NpZH1gO1xuXG4gIGNvbnN0IGNvbm5lY3QgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBORlRTdG9yYWdlKHsgdG9rZW46IENvbnN0YW50cy5ORlRfU1RPUkFHRV9BUElfS0VZIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIGZpbGVUeXBlOiBGaWxlVHlwZSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlVHlwZSk7XG4gICAgICBsZXQgZmlsZSE6IEJ1ZmZlcjtcbiAgICAgIGlmIChQcm92ZW5hbmNlTGF5ZXIuaXNOb2RlYWJsZShmaWxlVHlwZSkpIHtcbiAgICAgICAgZmlsZSA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlVHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKFByb3ZlbmFuY2VMYXllci5pc0Jyb3dzZXJhYmxlKGZpbGVUeXBlKSkge1xuICAgICAgICBmaWxlID0gQnVmZmVyLmZyb20oYXdhaXQgZmlsZVR5cGUuYXJyYXlCdWZmZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlID0gQnVmZmVyLmZyb20oZmlsZVR5cGUgYXMgQXJyYXlCdWZmZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9iSW1hZ2UgPSBuZXcgQmxvYihbZmlsZV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSW1hZ2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnRcbiAgICpcbiAgICogQHBhcmFtIHtPZmZjaGFpbn0gc3RvcmFnZURhdGFcbiAgICoge1xuICAgKiAgIG5hbWU/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZGVzY3JpcHRpb24/OiB7c3RyaW5nfSAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgc2VsbGVyRmVlQmFzaXNQb2ludHM/OiBudW1iZXIgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGltYWdlPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAvLyB1cGxvYWRlZCB1cmkgb2Ygb3JpZ2luYWwgY29udGVudFxuICAgKiAgIGV4dGVybmFsX3VybD86IHtzdHJpbmd9ICAgICAgICAgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IHtKc29uTWV0YWRhdGFBdHRyaWJ1dGVbXX0gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiB7SnNvbk1ldGFkYXRhUHJvcGVydGllczxVcmk+fSAvLyBpbmNsdWRlZCBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uICAgICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddOiB7dW5rbm93bn0gICAgICAgICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIHN0b3JhZ2VEYXRhOiBPZmZjaGFpbixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VEYXRhLmNyZWF0ZWRfYXQgPSB1bml4VGltZXN0YW1wKCk7XG4gICAgICBkZWJ1Z0xvZygnIyBXaWxsIHVwbG9hZCBvZmZjaGFpbjogJywgc3RvcmFnZURhdGEpO1xuICAgICAgY29uc3QgYmxvYkpzb24gPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoc3RvcmFnZURhdGEpXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JKc29uKTtcbiAgICAgIHJldHVybiBjcmVhdGVHYXRld2F5VXJsKHJlcyk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluLCBTdG9yYWdlVHlwZSB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBBcndlYXZlIH0gZnJvbSAnLi9hcndlYXZlJztcbmltcG9ydCB7IE5mdFN0b3JhZ2UgfSBmcm9tICcuL25mdC1zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTdG9yYWdlIHtcbiAgZXhwb3J0IGNvbnN0IHRvQ29udmVydE9mZmNoYWluZGF0YSA9IChcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICApOiBPZmZjaGFpbiA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgIGRlc2NyaXB0aW9uOiBpbnB1dC5kZXNjcmlwdGlvbixcbiAgICAgIHNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzOiBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgIGV4dGVybmFsX3VybDogaW5wdXQuZXh0ZXJuYWxfdXJsLFxuICAgICAgYXR0cmlidXRlczogaW5wdXQuYXR0cmlidXRlcyxcbiAgICAgIHByb3BlcnRpZXM6IGlucHV0LnByb3BlcnRpZXMsXG4gICAgICBpbWFnZTogJycsXG4gICAgICBvcHRpb25zOiBpbnB1dC5vcHRpb25zLFxuICAgIH07XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWRGaWxlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWRGaWxlKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBzdG9yYWdlVHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBpbnB1dDogT2ZmY2hhaW4sXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZERhdGEoaW5wdXQsIGZlZVBheWVyKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZERhdGEoaW5wdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IE9mZmNoYWluLFxuICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScgJiYgIWZlZVBheWVyKSB7XG4gICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgfVxuICAgIGNvbnN0IHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICBhd2FpdCB1cGxvYWRGaWxlKGZpbGVQYXRoLCBzdG9yYWdlVHlwZSwgZmVlUGF5ZXIpXG4gICAgKS51bndyYXAoXG4gICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICByZXR1cm4gYXdhaXQgdXBsb2FkRGF0YShpbnB1dCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgIH0sXG4gICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9LFxuICAgICk7XG5cbiAgICBpZiAoIXN0b3JhZ2UpIHtcbiAgICAgIHRocm93IEVycm9yKCdFbXB0eSBzdG9yYWdlIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gc3RvcmFnZTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgRGV0YWlscywgTGltaXQgfSBmcm9tICd+L3R5cGVzL3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFZhbGlkYXRvciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVzc2FnZSB7XG4gICAgZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnc3VjY2Vzcyc7XG4gICAgZXhwb3J0IGNvbnN0IFNNQUxMX05VTUJFUiA9ICd0b28gc21hbGwnO1xuICAgIGV4cG9ydCBjb25zdCBCSUdfTlVNQkVSID0gJ3RvbyBiaWcnO1xuICAgIGV4cG9ydCBjb25zdCBMT05HX0xFTkdUSCA9ICd0b28gbG9uZyc7XG4gICAgZXhwb3J0IGNvbnN0IEVNUFRZID0gJ2ludmFsaWQgZW1wdHkgdmFsdWUnO1xuICAgIGV4cG9ydCBjb25zdCBJTlZBTElEX1VSTCA9ICdpbnZhbGlkIHVybCc7XG4gICAgZXhwb3J0IGNvbnN0IE9OTFlfTk9ERV9KUyA9ICdgc3RyaW5nYCB0eXBlIGlzIG9ubHkgTm9kZS5qcyc7XG4gIH1cblxuICBleHBvcnQgY29uc3QgTkFNRV9MRU5HVEggPSAzMjtcbiAgZXhwb3J0IGNvbnN0IFNZTUJPTF9MRU5HVEggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IFVSTF9MRU5HVEggPSAyMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01BWCA9IDEwMDtcbiAgZXhwb3J0IGNvbnN0IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCA9IDEwMDAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NSU4gPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBpc1JveWFsdHkgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3JveWFsdHknO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1NlbGxlckZlZUJhc2lzUG9pbnRzID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzZWxsZXJGZWVCYXNpc1BvaW50cy9zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc7XG4gICAgICBpZiAocm95YWx0eSAhPT0gMCAmJiAhcm95YWx0eSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHJveWFsdHkpO1xuICAgICAgfVxuICAgICAgaWYgKHJveWFsdHkgPCBST1lBTFRZX01JTikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuU01BTExfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01JTixcbiAgICAgICAgICBjb25kaXRpb246ICd1bmRlck1pbicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChyb3lhbHR5ID4gUk9ZQUxUWV9NQVggKiBDb252ZXJ0ZXIuUm95YWx0eS5USFJFU0hPTEQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc05hbWUgPSAobmFtZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICduYW1lJztcbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgobmFtZSkgPiBOQU1FX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIG5hbWUsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IE5BTUVfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU3ltYm9sID0gKHN5bWJvbDogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzeW1ib2wnO1xuICAgICAgaWYgKCFzeW1ib2wpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBzeW1ib2wpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoc3ltYm9sKSA+IFNZTUJPTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBzeW1ib2wsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNZTUJPTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNJbWFnZVVybCA9IChpbWFnZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+XG4gICAgaXNVcmlPckltYWdlKGltYWdlLCAnaW1hZ2UnKTtcblxuICBleHBvcnQgY29uc3QgY2hlY2tBbGwgPSA8XG4gICAgVCBleHRlbmRzIFBpY2tOZnRTdG9yYWdlIHwgUGlja05mdFN0b3JhZ2VNZXRhcGxleCB8IFBpY2tNZXRhcGxleCxcbiAgPihcbiAgICBtZXRhZGF0YTogVCxcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSk7XG4gICAgICBjb25zdCByZXN1bHRzOiBEZXRhaWxzW10gPSBbXTtcbiAgICAgIGtleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgbGV0IHJlcyE6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPjtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLmltYWdlKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzSW1hZ2VVcmwobWV0YWRhdGEuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncm95YWx0eSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnJveWFsdHkpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNSb3lhbHR5KG1ldGFkYXRhLnJveWFsdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cykge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5uYW1lKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzTmFtZShtZXRhZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuc3ltYm9sKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU3ltYm9sKG1ldGFkYXRhLnN5bWJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzICYmIHJlcy5pc0Vycikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5yZXMuZXJyb3IuZGV0YWlscyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAnQ2F1Z2h0IGluIHRoZSB2YWxpZGF0aW9uIGVycm9ycy4gc2VlIGluZm9ybWF0aW9uIGUuZzogZXJyPFZhbGlkYXRvckVycm9yPi5kZXRhaWxzJztcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICB0eXBlIFBpY2tOZnRTdG9yYWdlID0gUGljazxcbiAgICBPZmZjaGFpbixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdpbWFnZScgfCAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnXG4gID47XG4gIHR5cGUgUGlja05mdFN0b3JhZ2VNZXRhcGxleCA9IFBpY2s8XG4gICAgSW5wdXROZnRNZXRhZGF0YSxcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdyb3lhbHR5JyB8ICdmaWxlUGF0aCdcbiAgPjtcbiAgdHlwZSBQaWNrTWV0YXBsZXggPSBQaWNrPFxuICAgIERhdGFWMixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICd1cmknIHwgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJ1xuICA+O1xuXG4gIGNvbnN0IGJ5dGVMZW5ndGggPSAodmFsdWU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdGV4dCA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgIHJldHVybiB0ZXh0LmVuY29kZSh2YWx1ZSkubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUVycm9yID0gKFxuICAgIGtleTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBhY3R1YWw6IHN0cmluZyB8IG51bWJlcixcbiAgICBsaW1pdD86IExpbWl0LFxuICApOiBWYWxpZGF0b3JFcnJvciA9PiB7XG4gICAgbGV0IGVycm9yOiBWYWxpZGF0b3JFcnJvcjtcbiAgICBpZiAobGltaXQpIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsLCBsaW1pdCB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsIH1dKTtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9O1xuXG4gIGNvbnN0IGlzVXJpT3JJbWFnZSA9IChcbiAgICBpbWFnZU9yVXJpOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBpZiAoIWltYWdlT3JVcmkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKGltYWdlT3JVcmkpID4gVVJMX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIGltYWdlT3JVcmksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFVSTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCEvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7PzomPSssJSNdKy9nLnRlc3QoaW1hZ2VPclVyaSkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLklOVkFMSURfVVJMLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgZGV0YWlsczogRGV0YWlsc1tdO1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNbXSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBBTExfREVQVEhfU0laRV9QQUlSUyxcbiAgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LFxuICBnZXRDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnRTaXplLFxuICBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICBTUExfTk9PUF9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC1hY2NvdW50LWNvbXByZXNzaW9uJztcbmltcG9ydCB7IFB1YmxpY0tleSwgU3lzdGVtUHJvZ3JhbSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBjcmVhdGVDcmVhdGVUcmVlSW5zdHJ1Y3Rpb24sXG4gIFBST0dSQU1fQUREUkVTUyBhcyBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU3BhY2VOdW1iZXIsIFNwYWNlT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvY29tcHJlc3NlZC1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICBleHBvcnQgY2xhc3MgU3BhY2Uge1xuICAgIHNwYWNlT3duZXI6IFB1YmtleTtcbiAgICBjb25zdHJ1Y3RvcihzcGFjZU93bmVyOiBQdWJrZXkpIHtcbiAgICAgIHRoaXMuc3BhY2VPd25lciA9IHNwYWNlT3duZXI7XG4gICAgfVxuXG4gICAgZ2V0QXNzZXRJZCA9IGFzeW5jICgpOiBQcm9taXNlPFB1YmtleT4gPT4ge1xuICAgICAgY29uc3QgdHJlZUFjY291bnQgPSBhd2FpdCBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdGhpcy5zcGFjZU93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgbGVhZkluZGV4ID0gdHJlZUFjY291bnQudHJlZS5yaWdodE1vc3RQYXRoLmluZGV4IC0gMTtcbiAgICAgIHJldHVybiBBY2NvdW50LlBkYS5nZXRBc3NldElkKHRoaXMuc3BhY2VPd25lciwgbGVhZkluZGV4KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBjcmVhdGUgYSBuZXcgbWFya2xlIHRyZWVcbiAgICogVGhpcyBmdW5jdGlvbiBuZWVkcyBvbmx5IDEgY2FsbFxuICAgKlxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heERlcHRoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhCdWZmZXJTaXplXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjYW5vcHlEZXB0aFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8U3BhY2VPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGluaXRTcGFjZSA9IChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIG1heERlcHRoOiBudW1iZXIsXG4gICAgbWF4QnVmZmVyU2l6ZTogbnVtYmVyLFxuICAgIGNhbm9weURlcHRoOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxTcGFjZU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IG93bmVyO1xuICAgICAgY29uc3QgdHJlZU93bmVyID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3Qgc3BhY2UgPSBnZXRDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnRTaXplKFxuICAgICAgICBtYXhEZXB0aCxcbiAgICAgICAgbWF4QnVmZmVyU2l6ZSxcbiAgICAgICAgY2Fub3B5RGVwdGgsXG4gICAgICApO1xuICAgICAgY29uc3QgW3RyZWVBdXRob3JpdHldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFt0cmVlT3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5LnRvQnVmZmVyKCldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgICAgZGVidWdMb2coYCMgbWF4RGVwdGg6ICR7bWF4RGVwdGh9LCBtYXhCdWZmZXJTaXplOiAke21heEJ1ZmZlclNpemV9YCk7XG4gICAgICBkZWJ1Z0xvZygnIyBuZnQgc3BhY2U6ICcsIHNwYWNlKTtcblxuICAgICAgaWYgKENvbnN0YW50cy5pc0RlYnVnZ2luZyA9PT0gJ3RydWUnIHx8IHByb2Nlc3MuZW52LkRFQlVHID09PSAndHJ1ZScpIHtcbiAgICAgICAgZGVidWdMb2coJyMgc3BhY2UgY29zdDogJywgYXdhaXQgY2FsY3VsYXRlU3BhY2VDb3N0KHNwYWNlKSk7XG4gICAgICB9XG5cbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICBTeXN0ZW1Qcm9ncmFtLmNyZWF0ZUFjY291bnQoe1xuICAgICAgICAgIGZyb21QdWJrZXk6IHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICBuZXdBY2NvdW50UHVia2V5OiB0cmVlT3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgIGxhbXBvcnRzOlxuICAgICAgICAgICAgYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0aW9uKHNwYWNlKSxcbiAgICAgICAgICBzcGFjZTogc3BhY2UsXG4gICAgICAgICAgcHJvZ3JhbUlkOiBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICBjcmVhdGVDcmVhdGVUcmVlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWVya2xlVHJlZTogdHJlZU93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICAgIHRyZWVBdXRob3JpdHksXG4gICAgICAgICAgICB0cmVlQ3JlYXRvcjogb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICAgcGF5ZXI6IHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICAgIGxvZ1dyYXBwZXI6IFNQTF9OT09QX1BST0dSQU1fSUQsXG4gICAgICAgICAgICBjb21wcmVzc2lvblByb2dyYW06IFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtYXhCdWZmZXJTaXplLFxuICAgICAgICAgICAgbWF4RGVwdGgsXG4gICAgICAgICAgICBwdWJsaWM6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICAgICksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5NaW50KFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIFt0cmVlT3duZXIudG9LZXlwYWlyKCksIG93bmVyLnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIHRyZWVPd25lci5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBjcmVhdGUgYSBuZXcgbmZ0IHNwYWNlXG4gICAqIFRoaXMgZnVuY3Rpb24gbmVlZHMgb25seSAxIGNhbGxcbiAgICpcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7U3BhY2VOdW1iZXJ9IHNwYWNlU2l6ZVxuICAgKiBAcGFyYW0ge1BhcnRpYWw8U3BhY2VPcHRpb25zPn0gb3B0aW9uc1xuICAgKlxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZVNwYWNlID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgc3BhY2VTaXplOiBTcGFjZU51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFNwYWNlT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgY29uc3QgeyBtYXhEZXB0aCwgbWF4QnVmZmVyU2l6ZSwgY2Fub3B5RGVwdGggfSA9XG4gICAgICBjYWxjdWxhdGVTcGFjZU51bWJlclRvRGVwdGgoc3BhY2VTaXplKTtcbiAgICByZXR1cm4gaW5pdFNwYWNlKG93bmVyLCBtYXhEZXB0aCwgbWF4QnVmZmVyU2l6ZSwgY2Fub3B5RGVwdGgsIG9wdGlvbnMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgc3BhY2UgY29zdFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3BhY2VTaXplXG4gICAqIEByZXR1cm4gUHJvbWlzZTx7c29sOiBudW1iZXJ9PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVNwYWNlQ29zdCA9IGFzeW5jIChzcGFjZVNpemU6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHsgbWF4RGVwdGgsIG1heEJ1ZmZlclNpemUsIGNhbm9weURlcHRoIH0gPVxuICAgICAgY2FsY3VsYXRlU3BhY2VOdW1iZXJUb0RlcHRoKHNwYWNlU2l6ZSk7XG4gICAgY29uc3QgcmVxdWlyZWRTcGFjZSA9IGdldENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudFNpemUoXG4gICAgICBtYXhEZXB0aCxcbiAgICAgIG1heEJ1ZmZlclNpemUsXG4gICAgICBjYW5vcHlEZXB0aCxcbiAgICApO1xuICAgIGNvbnN0IGxhbXBvcnRzID1cbiAgICAgIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdGlvbihcbiAgICAgICAgcmVxdWlyZWRTcGFjZSxcbiAgICAgICk7XG4gICAgcmV0dXJuIHsgc29sOiBsYW1wb3J0cy50b1NvbCgpIH07XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIC8vLyBJbml0aWFsaXphdGlvbiBwYXJhbWV0ZXJzIGZvciBhbiBTUEwgQ29uY3VycmVudE1lcmtsZVRyZWUuXG4gIC8vL1xuICAvLy8gT25seSB0aGUgZm9sbG93aW5nIHBlcm11dGF0aW9ucyBhcmUgdmFsaWQ6XG4gIC8vL1xuICAvLy8gfCBtYXhfZGVwdGggfCBtYXhfYnVmZmVyX3NpemUgICAgICAgfFxuICAvLy8gfCAtLS0tLS0tLS0gfCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0gfFxuICAvLy8gfCAzICAgICAgICAgfCAoOCkgICAgICAgICAgICAgICAgICAgfCBub2RlOiA4XG4gIC8vLyB8IDE0ICAgICAgICB8ICg2NCwgMjU2LCAxMDI0LCAyMDQ4KSB8IG5vZGU6IDE2LDM4NFxuICAvLy8gfCAyMCAgICAgICAgfCAoNjQsIDI1NiwgMTAyNCwgMjA0OCkgfCBub2RlOiAxLDA0OCw1NzZcbiAgLy8vIHwgMjQgICAgICAgIHwgKDY0LCAyNTYsIDUxMiwgMTAyNCwgMjA0OCkgfCBub2RlOiAxNiw3NzcsMjE2XG4gIC8vLyB8IDI2ICAgICAgICB8ICg2NCwgMjU2LCA1MTIsIDEwMjQsIDIwNDgpIHwgbm9kZTogNjcsMTA4LDg2NFxuICAvLy8gfCAzMCAgICAgICAgfCAoNTEyLCAxMDI0LCAyMDQ4KSB8IG5vZGU6IDEsMDczLDc0MSw4MjRcbiAgY29uc3QgY2FsY3VsYXRlU3BhY2VOdW1iZXJUb0RlcHRoID0gKHNwYWNlOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBsb2cyID0gTWF0aC5jZWlsKE1hdGgubG9nMihzcGFjZSkpO1xuICAgIGRlYnVnTG9nKCcjIGxvZzI6ICcsIGxvZzIsIDIgKiogbG9nMik7XG4gICAgY29uc3QgbWF0Y2hlZCA9IEFMTF9ERVBUSF9TSVpFX1BBSVJTLmZpbHRlcihcbiAgICAgIChwYWlyKSA9PiBwYWlyLm1heERlcHRoID09PSBsb2cyLFxuICAgIClbMF07XG4gICAgY29uc3QgY2Fub3B5RGVwdGggPSBtYXRjaGVkLm1heERlcHRoIC0gNTtcbiAgICByZXR1cm4ge1xuICAgICAgbWF4RGVwdGg6IG1hdGNoZWQubWF4RGVwdGgsXG4gICAgICBtYXhCdWZmZXJTaXplOiBtYXRjaGVkLm1heEJ1ZmZlclNpemUsXG4gICAgICBjYW5vcHlEZXB0aCxcbiAgICB9O1xuICB9O1xufVxuIiwgImltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IERhc0FwaSB9IGZyb20gJ34vZGFzLWFwaSc7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIFNwYWNlIH0gZnJvbSAnLi9zcGFjZSc7XG5pbXBvcnQge1xuICBjb21wdXRlQ3JlYXRvckhhc2gsXG4gIGNvbXB1dGVEYXRhSGFzaCxcbiAgY3JlYXRlTWludFRvQ29sbGVjdGlvblYxSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVZlcmlmeUNyZWF0b3JJbnN0cnVjdGlvbixcbiAgQ3JlYXRvcixcbiAgTWV0YWRhdGFBcmdzLFxuICBQUk9HUkFNX0lEIGFzIEJVQkJMRUdVTV9QUk9HUkFNX0lELFxufSBmcm9tICdtcGwtYnViYmxlZ3VtLWluc3RydWN0aW9uJztcbmltcG9ydCB7XG4gIENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudCxcbiAgU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgU1BMX05PT1BfUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtYWNjb3VudC1jb21wcmVzc2lvbic7XG5cbmltcG9ydCB7IFBST0dSQU1fSUQgYXMgVE9LRU5fTUVUQURBVEFfUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQge1xuICBBY2NvdW50TWV0YSxcbiAgUHVibGljS2V5LFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTWludE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2NvbXByZXNzZWQtbmZ0JztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBleHBvcnQgY29uc3QgY3JlYXRlVmVyaWZ5Q3JlYXRvciA9IGFzeW5jIChcbiAgICBjcmVhdG9yczogQ3JlYXRvcltdLFxuICAgIGFzc2V0SWQ6IFB1YmxpY0tleSxcbiAgICB0cmVlT3duZXI6IFB1YmxpY0tleSxcbiAgICBtZXRhZGF0YTogTWV0YWRhdGFBcmdzLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IFByb21pc2U8VHJhbnNhY3Rpb25JbnN0cnVjdGlvbj4gPT4ge1xuICAgIGNvbnN0IHJwY0Fzc2V0UHJvb2YgPSBhd2FpdCBEYXNBcGkuZ2V0QXNzZXRQcm9vZihhc3NldElkLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHJwY0Fzc2V0ID0gYXdhaXQgRGFzQXBpLmdldEFzc2V0KGFzc2V0SWQudG9TdHJpbmcoKSk7XG4gICAgaWYgKHJwY0Fzc2V0UHJvb2YuaXNFcnIgfHwgcnBjQXNzZXQuaXNFcnIpIHtcbiAgICAgIHRocm93IEVycm9yKCdSaXNlIGVycm9yIHdoZW4gZ2V0IGFzc2V0IHByb29mIG9yIGFzc2V0Jyk7XG4gICAgfVxuICAgIGNvbnN0IGNvbXByZXNzaW9uID0gcnBjQXNzZXQudmFsdWUuY29tcHJlc3Npb247XG4gICAgY29uc3Qgb3duZXJzaGlwID0gcnBjQXNzZXQudmFsdWUub3duZXJzaGlwO1xuICAgIGNvbnN0IGFzc2V0UHJvb2YgPSBycGNBc3NldFByb29mLnZhbHVlO1xuXG4gICAgY29uc3QgdHJlZUFjY291bnQgPSBhd2FpdCBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICB0cmVlT3duZXIsXG4gICAgKTtcbiAgICBjb25zdCBjYW5vcHlEZXB0aCA9IHRyZWVBY2NvdW50LmdldENhbm9weURlcHRoKCk7XG4gICAgY29uc3Qgc2xpY2VkUHJvb2Y6IEFjY291bnRNZXRhW10gPSBhc3NldFByb29mLnByb29mXG4gICAgICAubWFwKChub2RlOiBzdHJpbmcpID0+ICh7XG4gICAgICAgIHB1YmtleTogbm9kZS50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc1NpZ25lcjogZmFsc2UsXG4gICAgICAgIGlzV3JpdGFibGU6IGZhbHNlLFxuICAgICAgfSkpXG4gICAgICAuc2xpY2UoMCwgYXNzZXRQcm9vZi5wcm9vZi5sZW5ndGggLSAoY2Fub3B5RGVwdGggPyBjYW5vcHlEZXB0aCA6IDApKTtcblxuICAgIHJldHVybiBjcmVhdGVWZXJpZnlDcmVhdG9ySW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIHRyZWVBdXRob3JpdHk6IHRyZWVPd25lcixcbiAgICAgICAgbGVhZk93bmVyOiBvd25lcnNoaXAub3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbGVhZkRlbGVnYXRlOiAob3duZXJzaGlwLmRlbGVnYXRlIHx8IG93bmVyc2hpcC5vd25lcikudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbWVya2xlVHJlZTogYXNzZXRQcm9vZi50cmVlX2lkLnRvUHVibGljS2V5KCksXG4gICAgICAgIHBheWVyOiBmZWVQYXllcixcblxuICAgICAgICBsb2dXcmFwcGVyOiBTUExfTk9PUF9QUk9HUkFNX0lELFxuICAgICAgICBjb21wcmVzc2lvblByb2dyYW06IFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gICAgICAgIGNyZWF0b3I6IGZlZVBheWVyLFxuXG4gICAgICAgIC8vIHByb3ZpZGUgdGhlIHNsaWNlZCBwcm9vZlxuICAgICAgICBhbmNob3JSZW1haW5pbmdBY2NvdW50czogc2xpY2VkUHJvb2YsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb290OiBbLi4uYXNzZXRQcm9vZi5yb290LnRyaW0oKS50b1B1YmxpY0tleSgpLnRvQnl0ZXMoKV0sXG4gICAgICAgIGNyZWF0b3JIYXNoOiBbLi4uY29tcHV0ZUNyZWF0b3JIYXNoKGNyZWF0b3JzKV0sXG4gICAgICAgIGRhdGFIYXNoOiBbLi4uY29tcHV0ZURhdGFIYXNoKG1ldGFkYXRhKV0sXG4gICAgICAgIG5vbmNlOiBjb21wcmVzc2lvbi5sZWFmX2lkLFxuICAgICAgICBpbmRleDogY29tcHJlc3Npb24ubGVhZl9pZCxcbiAgICAgICAgbWVzc2FnZTogbWV0YWRhdGEsXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50IGFuZCBDb21wcmVzc2VkIE5GVCBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7SW5wdXROZnRNZXRhZGF0YX0gaW5wdXRcbiAgICoge1xuICAgKiAgIG5hbWU6IHN0cmluZyAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w6IHN0cmluZyAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIHJveWFsdHk6IG51bWJlciAgICAgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIHN0b3JhZ2VUeXBlOiAnYXJ3ZWF2ZSd8J25mdFN0b3JhZ2UnIC8vIERlY2VudHJhbGl6ZWQgc3RvcmFnZVxuICAgKiAgIHVyaT86IHN0cmluZyB8IEZpbGUgICAgICAgIC8vIHVwbG9hZGVkIGNvbnRlbnQgdXJsXG4gICAqICAgZmlsZVBhdGg/OiBzdHJpbmcgfCBGaWxlICAgLy8gdXBsb2FkIGNvbnRlbnRcbiAgICogICBkZXNjcmlwdGlvbj86IHN0cmluZyAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIGV4dGVybmFsX3VybD86IHN0cmluZyAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzogTWV0YWRhdGFBdHRyaWJ1dGVbXSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IE1ldGFkYXRhUHJvcGVydGllczxVcmk+IC8vIGluY2x1ZGUgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogUHVia2V5ICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogICBvcHRpb25zPzogW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHBhcmFtIHtQdWJrZXl9IHNwYWNlT3duZXIgICAgICAvLyBQcmV2aW91c2x5IGNyZWF0ZWQgc3BhY2Ugb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGNvbGxlY3Rpb25NaW50IC8vIFByZXZpb3VzbHkgY3JlYXRlZCBjb2xsZWN0aW9uTWludFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zICAgICAgICAgLy8gbWludCBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIHNwYWNlT3duZXI6IFB1YmtleSxcbiAgICBjb2xsZWN0aW9uTWludDogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmU8U3BhY2UuU3BhY2U+LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgZmVlUGF5ZXIsIHJlY2VpdmVyLCBkZWxlZ2F0ZSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IG93bmVyO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuICAgICAgY29uc3QgbGVhZk93bmVyID0gcmVjZWl2ZXIgPyByZWNlaXZlci50b1B1YmxpY0tleSgpIDogb3duZXJQdWJsaWNLZXk7XG4gICAgICBjb25zdCBsZWFmRGVsZWdhdGUgPSBkZWxlZ2F0ZVxuICAgICAgICA/IGRlbGVnYXRlXG4gICAgICAgIDogbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogcGF5ZXIhIH0pLnB1YmtleTtcblxuICAgICAgY29uc3QgdHJlZUF1dGhvcml0eSA9IEFjY291bnQuUGRhLmdldFRyZWVBdXRob3JpdHkoXG4gICAgICAgIHNwYWNlT3duZXIudG9QdWJsaWNLZXkoKS50b1N0cmluZygpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKFxuICAgICAgICBjb2xsZWN0aW9uTWludC50b1N0cmluZygpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NYXN0ZXJFZGl0aW9uQWNjb3VudCA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24oXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnRvU3RyaW5nKCksXG4gICAgICApO1xuICAgICAgY29uc3QgYnViYmxlZ3VtU2lnbmVyID0gQWNjb3VudC5QZGEuZ2V0Qmd1bVNpZ25lcigpO1xuXG4gICAgICAvLyBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudFxuICAgICAgbGV0IHByb3BlcnRpZXM7XG4gICAgICBpZiAoaW5wdXQucHJvcGVydGllcykge1xuICAgICAgICBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydGVyLlByb3BlcnRpZXMuaW50b0luZnJhKFxuICAgICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgICAgU3RvcmFnZS51cGxvYWRGaWxlLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpbnB1dCA9IHtcbiAgICAgICAgLi4uaW5wdXQsXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgcm95YWx0eSA9IGlucHV0LnJveWFsdHkgPyBpbnB1dC5yb3lhbHR5IDogMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gQ29udmVydGVyLlJveWFsdHkuaW50b0luZnJhKHJveWFsdHkpO1xuICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGxldCB1cmkhOiBzdHJpbmc7XG4gICAgICAvLyB1cGxvYWQgZmlsZVxuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIC8vIHVwbG9hZGVkIGZpbGVcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udmVydGVkID0gQ29udmVydGVyLkNvbXByZXNzZWROZnRNZXRhZGF0YS5pbnRvSW5mcmEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGFBcmdzOiBNZXRhZGF0YUFyZ3MgPSB7XG4gICAgICAgIC4uLmNvbnZlcnRlZCxcbiAgICAgICAgY29sbGVjdGlvbjogeyBrZXk6IGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksIHZlcmlmaWVkOiBmYWxzZSB9LFxuICAgICAgfTtcblxuICAgICAgZGVidWdMb2coJyMgaW5wdXQ6ICcsIGlucHV0KTtcbiAgICAgIGRlYnVnTG9nKCcjIG1ldGFkYXRhQXJnczogJywgbWV0YWRhdGFBcmdzKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gW107XG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgY3JlYXRlTWludFRvQ29sbGVjdGlvblYxSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWVya2xlVHJlZTogc3BhY2VPd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgdHJlZUF1dGhvcml0eSxcbiAgICAgICAgICAgIHRyZWVEZWxlZ2F0ZTogb3duZXJQdWJsaWNLZXksXG4gICAgICAgICAgICBwYXllcjogcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICAgbGVhZk93bmVyOiBsZWFmT3duZXIsIC8vIHJlY2VpdmVyXG4gICAgICAgICAgICBsZWFmRGVsZWdhdGU6IGxlYWZEZWxlZ2F0ZS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgY29sbGVjdGlvbkF1dGhvcml0eTogb3duZXJQdWJsaWNLZXksXG4gICAgICAgICAgICBjb2xsZWN0aW9uTWludDogY29sbGVjdGlvbk1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25NZXRhZGF0YSxcbiAgICAgICAgICAgIGVkaXRpb25BY2NvdW50OiBjb2xsZWN0aW9uTWFzdGVyRWRpdGlvbkFjY291bnQsXG4gICAgICAgICAgICBidWJibGVndW1TaWduZXIsXG4gICAgICAgICAgICBsb2dXcmFwcGVyOiBTUExfTk9PUF9QUk9HUkFNX0lELFxuICAgICAgICAgICAgY29sbGVjdGlvbkF1dGhvcml0eVJlY29yZFBkYTogQlVCQkxFR1VNX1BST0dSQU1fSUQsXG4gICAgICAgICAgICBjb21wcmVzc2lvblByb2dyYW06IFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gICAgICAgICAgICB0b2tlbk1ldGFkYXRhUHJvZ3JhbTogVE9LRU5fTUVUQURBVEFfUFJPR1JBTV9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1ldGFkYXRhQXJncyxcbiAgICAgICAgICB9LFxuICAgICAgICApLFxuICAgICAgKTtcblxuICAgICAgaWYgKGlucHV0LmNyZWF0b3JzKSB7XG4gICAgICAgIGNvbnN0IGFzc2V0SWQgPSBhd2FpdCBuZXcgU3BhY2UuU3BhY2Uoc3BhY2VPd25lcikuZ2V0QXNzZXRJZCgpO1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgICBhd2FpdCBjcmVhdGVWZXJpZnlDcmVhdG9yKFxuICAgICAgICAgICAgbWV0YWRhdGFBcmdzLmNyZWF0b3JzLFxuICAgICAgICAgICAgYXNzZXRJZC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgc3BhY2VPd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgbWV0YWRhdGFBcmdzLFxuICAgICAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG5ldyBTcGFjZS5TcGFjZShzcGFjZU93bmVyKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogQWRkaW5nIG5ldyB0b2tlbiB0byBleGlzdGluZyB0b2tlblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gIHRva2VuXG4gICAqIEBwYXJhbSB7UHVia2V5fSAgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gIG93bmVyT3JNdWx0aXNpZ1xuICAgKiBAcGFyYW0ge251bWJlcn0gIHRvdGFsQW1vdW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgbWludERlY2ltYWxcbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGFkZCA9IGFzeW5jIChcbiAgICB0b2tlbjogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPFB1YmtleT4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IG93bmVyT3JNdWx0aXNpZ1swXTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gb3duZXJPck11bHRpc2lnLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IGFzc29jaWF0ZWQgPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuLFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBhc3NvY2lhdGVkLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGFzc29jaWF0ZWQuaW5zdCA/IFthc3NvY2lhdGVkLmluc3QsIGluc3RdIDogW2luc3RdO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb248UHVia2V5PihcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIHRva2VuLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICIvL0BpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVBbW91bnQgPSAoXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gYW1vdW50ICogMTAgKiogbWludERlY2ltYWw7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEJ1cm5PcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBCdXJuIGV4aXN0aW5nIHRva2VuXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSAgICBtaW50XG4gICAqIEBwYXJhbSB7UHVia2V5fSAgICBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldFtdfSAgb3duZXJPck11bHRpc2lnXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgICBidXJuQW1vdW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgICB0b2tlbkRlY2ltYWxzXG4gICAqIEBwYXJhbSB7UGFydGlhbDxCdXJuT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgYnVybiA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIGJ1cm5BbW91bnQ6IG51bWJlcixcbiAgICB0b2tlbkRlY2ltYWxzOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxCdXJuT3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IG93bmVyT3JNdWx0aXNpZ1swXTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gb3duZXJPck11bHRpc2lnLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudChidXJuQW1vdW50LCB0b2tlbkRlY2ltYWxzKSxcbiAgICAgICAgdG9rZW5EZWNpbWFscyxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIHNsZWVwLCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFRva2VuTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBQYXJzZWRBY2NvdW50RGF0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnY3Jvc3MtZmV0Y2gnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgY29uc3QgTUFYX1JFVFJJRVMgPSAxMDtcbiAgY29uc3QgUkVUUllfREVMQVkgPSA1O1xuICBjb25zdCBORlRTVE9SQUdFX0dBVEVXQVkgPSAnbmZ0c3RvcmFnZS5saW5rJztcblxuICBjb25zdCBjb252ZXJ0ZXIgPSAoXG4gICAgbWV0YWRhdGE6IE1ldGFkYXRhLFxuICAgIGpzb246IE9mZmNoYWluLFxuICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICk6IFRva2VuTWV0YWRhdGEgPT4ge1xuICAgIHJldHVybiBDb252ZXJ0ZXIuVG9rZW5NZXRhZGF0YS5pbnRvVXNlcihcbiAgICAgIHtcbiAgICAgICAgb25jaGFpbjogbWV0YWRhdGEsXG4gICAgICAgIG9mZmNoYWluOiBqc29uLFxuICAgICAgfSxcbiAgICAgIHRva2VuQW1vdW50LFxuICAgICk7XG4gIH07XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBjb25zdCBmZXRjaFJldHJ5ID0gYXN5bmMgKHVybDogc3RyaW5nLCByZXRyaWVzID0gMCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLnJlcGxhY2UoJ2lwZnMuaW8nLCBORlRTVE9SQUdFX0dBVEVXQVkpKTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChyZXRyaWVzIDwgTUFYX1JFVFJJRVMpIHtcbiAgICAgICAgZGVidWdMb2coYEVycm9yIGZldGNoaW5nIGRhdGEgZnJvbSAke3VybH0sICR7cmV0cmllc30sICR7ZXJyb3J9YCk7XG4gICAgICAgIGF3YWl0IHNsZWVwKFJFVFJZX0RFTEFZKTtcbiAgICAgICAgcmV0dXJuIGZldGNoUmV0cnkodXJsLCByZXRyaWVzICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWJ1Z0xvZyhgTWF4IHJldHJpZXMgcmVhY2hlZCAoJHtNQVhfUkVUUklFU30pYCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgb3duZXIgUHVia2V5XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhW118IEVycm9yPj59XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VG9rZW5NZXRhZGF0YVtdLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBjb25uZWN0aW9uLmdldFBhcnNlZFRva2VuQWNjb3VudHNCeU93bmVyKFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGF0YXMgPSBpbmZvLnZhbHVlLm1hcChhc3luYyAoZCkgPT4ge1xuICAgICAgICBjb25zdCBtaW50ID0gZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8ubWludCBhcyBQdWJrZXk7XG4gICAgICAgIGNvbnN0IHRva2VuQW1vdW50ID0gZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8udG9rZW5BbW91bnRcbiAgICAgICAgICAuYW1vdW50IGFzIHN0cmluZztcbiAgICAgICAgaWYgKHRva2VuQW1vdW50ID09PSAnMScpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1ldGFkYXRhLmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgICBjb25uZWN0aW9uLFxuICAgICAgICAgIEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQpLFxuICAgICAgICApXG4gICAgICAgICAgLnRoZW4oYXN5bmMgKG1ldGFkYXRhKSA9PiB7XG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hSZXRyeShtZXRhZGF0YS5kYXRhLnVyaSkudGhlbigoanNvbjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBjb252ZXJ0ZXIobWV0YWRhdGEsIGpzb24sIHRva2VuQW1vdW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IGRlYnVnTG9nKCcjIFtGZXRjaCBlcnJvcl0nLCBlcnIpKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBmaWx0ZXJzID0gKGF3YWl0IFByb21pc2UuYWxsKGRhdGFzKSkuZmlsdGVyKFxuICAgICAgICAoZGF0YSkgPT4gZGF0YSAhPT0gdW5kZWZpbmVkLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBmaWx0ZXJzIGFzIFRva2VuTWV0YWRhdGFbXTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VG9rZW5NZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG5cbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgTWV0YWRhdGEuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICBjb25uZWN0aW9uLFxuICAgICAgICBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50KSxcbiAgICAgICk7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlNaW50IG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG4gICAgICBpZiAobWV0YWRhdGEudG9rZW5TdGFuZGFyZCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgVGhpcyBtaW50IGlzIG5vdCBTUEwtVE9LRU4sIHRva2VuU3RhbmRhcmQ6JHttZXRhZGF0YS50b2tlblN0YW5kYXJkfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgY29ubmVjdGlvbi5nZXRQYXJzZWRBY2NvdW50SW5mbyhtaW50LnRvUHVibGljS2V5KCkpO1xuICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSAoaW5mby52YWx1ZT8uZGF0YSBhcyBQYXJzZWRBY2NvdW50RGF0YSkucGFyc2VkLmluZm9cbiAgICAgICAgLnN1cHBseSBhcyBzdHJpbmc7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IChcbiAgICAgICAgYXdhaXQgZmV0Y2gobWV0YWRhdGEuZGF0YS51cmkpXG4gICAgICApLmpzb24oKSkgYXMgT2ZmY2hhaW47XG4gICAgICByZXR1cm4gY29udmVydGVyKG1ldGFkYXRhLCByZXNwb25zZSwgdG9rZW5BbW91bnQpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUZyZWV6ZUFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IEZyZWV6ZU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEZyZWV6aW5nIGEgdGFyZ2V0IG5mdFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGcmVlemVPcHRpb25zPn0gb3B0aW9ucyAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Jlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPn1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmcmVlemUgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxGcmVlemVPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZUFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ldyBBY2NvdW50LktleXBhaXIoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRvciB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFBhcnRpYWxTaWduU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IEdhc0xlc3NUcmFuc2Zlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVHJhbnNmZXIgd2l0aG91dCBzb2xhbmEgc29sLCBkZWxlZ2F0ZSBmZWVwYXllciBmb3IgY29tbWlzc2lvblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWxcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNMZXNzVHJhbnNmZXJPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZ2FzTGVzc1RyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGZlZVBheWVyOiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxHYXNMZXNzVHJhbnNmZXJPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcbiAgICAgIGNvbnN0IHNvdXJjZVRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lclB1YmxpY0tleS50b1N0cmluZygpLFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgZGVzdCxcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcblxuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgIENhbGN1bGF0b3IuY2FsY3VsYXRlQW1vdW50KGFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpXSxcbiAgICAgICk7XG5cbiAgICAgIC8vIHJldHVybiBhc3NvY2lhdGVkIHRva2VuIGFjY291bnRcbiAgICAgIGlmICghZGVzdFRva2VuLmluc3QpIHtcbiAgICAgICAgdHguYWRkKGluc3QyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldHVybiBpbnN0cnVjdGlvbiBhbmQgdW5kZWNpZGVkIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgICB0eC5hZGQoZGVzdFRva2VuLmluc3QpLmFkZChpbnN0Mik7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgdHguYWRkKFxuICAgICAgICAgIGF3YWl0IFRyYW5zYWN0aW9uQnVpbGRlci5Qcmlvcml0eUZlZS5jcmVhdGVQcmlvcml0eUZlZUluc3RydWN0aW9uKHR4KSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIHR4LnBhcnRpYWxTaWduKG93bmVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgc2VyaWFsaXplZFR4ID0gdHguc2VyaWFsaXplKHtcbiAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBoZXggPSBzZXJpYWxpemVkVHgudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuUGFydGlhbFNpZ24oaGV4KTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBQdWJsaWNLZXksXG4gIFN5c3RlbVByb2dyYW0sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBBdXRob3JpdHlUeXBlLFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbixcbiAgY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50LFxuICBNSU5UX1NJWkUsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbixcbiAgRGF0YVYyLFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgSW5wdXRUb2tlbk1ldGFkYXRhLCBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdG9yYWdlJztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG5cbiAgLy9AaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZUZyZWV6ZUF1dGhvcml0eSA9IChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFB1YmxpY0tleSxcbiAgKTogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgQXV0aG9yaXR5VHlwZS5GcmVlemVBY2NvdW50LFxuICAgICAgZnJlZXplQXV0aG9yaXR5LFxuICAgICk7XG4gIH07XG5cbiAgLy9AaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIHRva2VuTWV0YWRhdGE6IERhdGFWMixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICAgIGlzTXV0YWJsZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uW10+ID0+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgbGFtcG9ydHMgPSBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pO1xuICAgIGNvbnN0IG1ldGFkYXRhUGRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCB0b2tlbkFzc29jaWF0ZWQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gW107XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLFxuICAgICAgICBuZXdBY2NvdW50UHVia2V5OiBtaW50LFxuICAgICAgICBzcGFjZTogTUlOVF9TSVpFLFxuICAgICAgICBsYW1wb3J0czogbGFtcG9ydHMsXG4gICAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBvd25lcixcbiAgICAgICAgb3duZXIsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICAgIHRva2VuQXNzb2NpYXRlZCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIG1pbnQsXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgICBvd25lcixcbiAgICAgICAgQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudCh0b3RhbEFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YVBkYSxcbiAgICAgICAgICBtaW50LFxuICAgICAgICAgIG1pbnRBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY3JlYXRlTWV0YWRhdGFBY2NvdW50QXJnc1YzOiB7XG4gICAgICAgICAgICBkYXRhOiB0b2tlbk1ldGFkYXRhLFxuICAgICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb25zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTUEwtVE9LRU4gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXIgICAgICAvLyB0b2tlbiBvd25lciBTZWNyZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQW1vdW50IC8vIHRvdGFsIG51bWJlclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWwgLy8gdG9rZW4gZGVjaW1hbFxuICAgKiBAcGFyYW0ge0lucHV0VG9rZW5NZXRhZGF0YX0gaW5wdXQgICAgICAgLy8gdG9rZW4gbWV0YWRhdGFcbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9ucyAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGlucHV0OiBJbnB1dFRva2VuTWV0YWRhdGEsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dFRva2VuTWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBmZWVQYXllciwgZnJlZXplQXV0aG9yaXR5IH0gPSBvcHRpb25zO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IG93bmVyO1xuICAgICAgaW5wdXQucm95YWx0eSA9IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IDA7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0IGFzIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICAgIGlucHV0LnJveWFsdHksXG4gICAgICApO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgLy8gdXBsb2FkIGZpbGVcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydGVyLlRva2VuTWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXJpKTtcblxuICAgICAgY29uc3QgbWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGluc3RzID0gYXdhaXQgY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgdG90YWxBbW91bnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRnJlZXplQXV0aG9yaXR5KFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5NaW50KFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpLCBtaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG1pbnQucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFRoYXdPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPFRoYXdPcHRpb25zPn0gb3B0aW9ucyAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj59XG4gICAqL1xuICBleHBvcnQgY29uc3QgdGhhdyA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFRoYXdPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRoYXdBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTWludE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIFRyYW5zZmVyIE5GVCBmb3Igb25seSBtdWx0aVNpZyBhY2NvdW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgICAgLy8gbWludGVkIGFjY291bnRcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgICAvLyBjdXJyZW50IG11bHRpc2lnIG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0ICAgICAgICAgICAgICAgLy8gbmV3IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0W119IG93bmVyT3JNdWx0aXNpZyAgLy8gb3duZXIgb3IgbXVsdGlzaWcgYWNjb3VudCBTZWNyZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAgICAgICAgICAgICAvLyB3YW50IHRvIHRyYW5zZmVyIFNPTCBhbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbnREZWNpbWFsICAgICAgICAvLyBtaW50ZWQgdG9rZW4gZGVjaW1hbFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zICAgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiB7UmVzdWx0PENvbW1vblN0cnVjdHVyZTx1bmtub3duPiwgRXJyb3I+IH1cbiAgICovXG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3QgcGF5ZXJQdWJrZXkgPSBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBwYXllciB9KTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gb3duZXJPck11bHRpc2lnLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIudG9TdHJpbmcoKSxcbiAgICAgICAgcGF5ZXJQdWJrZXkucHVia2V5LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBkZXN0LFxuICAgICAgICBwYXllclB1YmtleS5wdWJrZXksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGRlc3RUb2tlbi5pbnN0ID8gW2Rlc3RUb2tlbi5pbnN0LCBpbnN0XSA6IFtpbnN0XTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU3BsVG9rZW4gYXMgQWRkIH0gZnJvbSAnLi9hZGQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQnVybiB9IGZyb20gJy4vYnVybic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZyZWV6ZSB9IGZyb20gJy4vZnJlZXplJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEdhc0xlc3MgfSBmcm9tICcuL2dhcy1sZXNzLXRyYW5zZmVyJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgVGhhdyB9IGZyb20gJy4vdGhhdyc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZXhwb3J0IGNvbnN0IFNwbFRva2VuID0ge1xuICAuLi5BZGQsXG4gIC4uLkJ1cm4sXG4gIC4uLkZpbmQsXG4gIC4uLkZyZWV6ZSxcbiAgLi4uR2FzTGVzcyxcbiAgLi4uTWludCxcbiAgLi4uVGhhdyxcbiAgLi4uVHJhbnNmZXIsXG59O1xuIiwgImltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgQnVybk9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgLyoqXG4gICAqIEJ1cm4gZXhpc3RpbmcgdG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9ICBtaW50XG4gICAqIEBwYXJhbSB7UHVia2V5fSAgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gIG93bmVyT3JNdWx0aXNpZ1xuICAgKiBAcGFyYW0ge1BhcnRpYWw8QnVybk9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEJ1cm5PcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgcmV0dXJuIFNwbFRva2VuLmJ1cm4oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBvd25lck9yTXVsdGlzaWcsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICAgTkZUX0RFQ0lNQUxTLFxuICAgICAge1xuICAgICAgICBmZWVQYXllcixcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgRGFzQXBpIH0gZnJvbSAnfi9kYXMtYXBpJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNZXRhZGF0YSwgTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBGaW5kT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBvd25lciBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RmluZE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgRGFzQXBpLmZpbmRCeU93bmVyKG93bmVyLCBmYWxzZSwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWw8TWV0YWRhdGE+LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBEYXNBcGkuZmluZEJ5TWludChtaW50LCBmYWxzZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IGNvbGxlY3Rpb24gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeUNvbGxlY3Rpb24gPSBhc3luYyAoXG4gICAgY29sbGVjdGlvbk1pbnQ6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gRGFzQXBpLmZpbmRCeUNvbGxlY3Rpb24oY29sbGVjdGlvbk1pbnQsIGZhbHNlLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuaW1wb3J0IHsgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBjcmVhdGVGcmVlemVEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgRnJlZXplT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICAvKipcbiAgICogRnJlZXppbmcgYSB0YXJnZXQgbmZ0XG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGcmVlemVPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBlZGl0aW9uQWRkcmVzcyA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24obWludCk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24oe1xuICAgICAgICBkZWxlZ2F0ZTogbmV3IEFjY291bnQuS2V5cGFpcih7XG4gICAgICAgICAgc2VjcmV0OiBmcmVlemVBdXRob3JpdHksXG4gICAgICAgIH0pLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQWNjb3VudDogdG9rZW5BY2NvdW50LFxuICAgICAgICBlZGl0aW9uOiBlZGl0aW9uQWRkcmVzcyxcbiAgICAgICAgbWludDogbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBQdWJsaWNLZXksXG4gIFN5c3RlbVByb2dyYW0sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUFwcHJvdmVJbnN0cnVjdGlvbixcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50LFxuICBNSU5UX1NJWkUsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhLCBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uLFxuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBjcmVhdGVTaWduTWV0YWRhdGFJbnN0cnVjdGlvbixcbiAgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uSXRlbUluc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlVmVyaWZ5Q3JlYXRvciA9IChtaW50OiBQdWJsaWNLZXksIGNyZWF0b3I6IFB1YmxpY0tleSkgPT4ge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gY3JlYXRlU2lnbk1ldGFkYXRhSW5zdHJ1Y3Rpb24oe1xuICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxuICAgICAgY3JlYXRvcjogY3JlYXRvcixcbiAgICB9KTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlRGVsZWFnYXRlID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGRlbGVnYXRlQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcblxuICAgIHJldHVybiBjcmVhdGVBcHByb3ZlSW5zdHJ1Y3Rpb24oXG4gICAgICB0b2tlbkFjY291bnQsXG4gICAgICBkZWxlZ2F0ZUF1dGhvcml0eSxcbiAgICAgIG93bmVyLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICApO1xuICB9O1xuXG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb24gPSAoXG4gICAgY29sbGVjdGlvbkNoaWxkOiBQdWJsaWNLZXksXG4gICAgY29sbGVjdGlvblBhcmVudDogUHVibGljS2V5LFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKFxuICAgICAgY29sbGVjdGlvblBhcmVudC50b1N0cmluZygpLFxuICAgICk7XG4gICAgY29uc3QgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihcbiAgICAgIGNvbGxlY3Rpb25QYXJlbnQudG9TdHJpbmcoKSxcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb25JdGVtSW5zdHJ1Y3Rpb24oe1xuICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbk1ldGFkYXRhLFxuICAgICAgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50OiBjb2xsZWN0aW9uTWFzdGVyRWRpdGlvbkFjY291bnQsXG4gICAgICBjb2xsZWN0aW9uTWludDogY29sbGVjdGlvblBhcmVudCxcbiAgICAgIG1ldGFkYXRhOiBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShjb2xsZWN0aW9uQ2hpbGQudG9TdHJpbmcoKSksXG4gICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5OiBmZWVQYXllcixcbiAgICB9KTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBuZnRNZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGF0YSA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcbiAgICBjb25zdCB0b2tlbk1ldGFkYXRhUHVia2V5ID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtYXN0ZXJFZGl0aW9uUHVia2V5ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICAgIGxhbXBvcnRzOiBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pLFxuICAgICAgICBzcGFjZTogTUlOVF9TSVpFLFxuICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihtaW50LCAwLCBvd25lciwgb3duZXIpKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKGZlZVBheWVyLCBhdGEsIG93bmVyLCBtaW50KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKG1pbnQsIGF0YSwgb3duZXIsIDEsIDApKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIG1ldGFkYXRhOiB0b2tlbk1ldGFkYXRhUHVia2V5LFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICAgIGRhdGE6IG5mdE1ldGFkYXRhLFxuICAgICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWFzdGVyRWRpdGlvblYzSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlZGl0aW9uOiBtYXN0ZXJFZGl0aW9uUHVia2V5LFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgICAgbWV0YWRhdGE6IHRva2VuTWV0YWRhdGFQdWJrZXksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNYXN0ZXJFZGl0aW9uQXJnczoge1xuICAgICAgICAgICAgbWF4U3VwcGx5OiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnQgYW5kIE5GVCBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7SW5wdXROZnRNZXRhZGF0YX0gaW5wdXQgIC8vIG5mdCBtZXRhZGF0YVxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dE5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgLy8gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnRcbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJveWFsdHkgPSBpbnB1dC5yb3lhbHR5ID8gaW5wdXQucm95YWx0eSA6IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IENvbnZlcnRlci5Sb3lhbHR5LmludG9JbmZyYShyb3lhbHR5KTtcbiAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgLy8gdXBsb2FkIGZpbGVcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgICAvLyB1cGxvYWRlZCBmaWxlXG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHsgaW1hZ2U6IGlucHV0LnVyaSB9O1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkRGF0YShcbiAgICAgICAgICB7IC4uLnN0b3JhZ2VNZXRhZGF0YSwgLi4uaW1hZ2UgfSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IGlucHV0LmlzTXV0YWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlucHV0LmlzTXV0YWJsZTtcblxuICAgICAgZGVidWdMb2coJyMgaW5wdXQ6ICcsIGlucHV0KTtcbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcblxuICAgICAgY29uc3QgbWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXdhaXQgY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgICBjcmVhdGVEZWxlYWdhdGUoXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbGxlY3Rpb24gLS0tXG4gICAgICBpZiAoaW5wdXQuY29sbGVjdGlvbikge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgICBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb24oXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBpbnB1dC5jb2xsZWN0aW9uLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5cGFpcnMgPSBbb3duZXIudG9LZXlwYWlyKCksIG1pbnQudG9LZXlwYWlyKCldO1xuXG4gICAgICAvLyBjcmVhdG9yIC0tLVxuICAgICAgaWYgKGlucHV0LmNyZWF0b3JzKSB7XG4gICAgICAgIGlucHV0LmNyZWF0b3JzLmZvckVhY2goKGNyZWF0b3IpID0+IHtcbiAgICAgICAgICBpZiAoQWNjb3VudC5LZXlwYWlyLmlzU2VjcmV0KGNyZWF0b3Iuc2VjcmV0KSkge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvclB1YmtleSA9IGNyZWF0b3IuYWRkcmVzcy50b1B1YmxpY0tleSgpO1xuICAgICAgICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVZlcmlmeUNyZWF0b3IobWludC50b1B1YmxpY0tleSgpLCBjcmVhdG9yUHVia2V5KTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5wdXNoKGluc3QpO1xuICAgICAgICAgICAga2V5cGFpcnMucHVzaChjcmVhdG9yLnNlY3JldC50b0tleXBhaXIoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuTWludChcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG1pbnQucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEdhc0xlc3NNaW50T3B0aW9ucywgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICd+L3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuXG4gIC8qKlxuICAgKiBNaW50IHdpdGhvdXQgc29sYW5hIHNvbCwgZGVsZWdhdGUgZmVlcGF5ZXIgZm9yIGNvbW1pc3Npb25cbiAgICpcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyICAgICAgICAgLy8gb3duZXIncyBTZWNyZXRcbiAgICogQHBhcmFtIHtVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhfSBpbnB1dFxuICAgKiB7XG4gICAqICAgbmFtZTogc3RyaW5nICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbDogc3RyaW5nICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZmlsZVBhdGg6IHN0cmluZyB8IEZpbGUgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBkZXNjcmlwdGlvbj86IHN0cmluZyAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIGV4dGVybmFsX3VybD86IHN0cmluZyAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzogTWV0YWRhdGFBdHRyaWJ1dGVbXSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IE1ldGFkYXRhUHJvcGVydGllczxVcmk+IC8vIGluY2x1ZGUgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogUHVia2V5ICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddPzogdW5rbm93biAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogICBjcmVhdG9ycz86IElucHV0Q3JlYXRvcnNbXSAgICAgICAgICAvLyBvdGhlciBjcmVhdG9ycyB0aGFuIG93bmVyXG4gICAqICAgdXNlcz86IFVzZXMgICAgICAgICAgICAgICAgICAgLy8gdXNhZ2UgZmVhdHVyZTogYnVybiwgc2luZ2xlLCBtdWx0aXBsZVxuICAgKiAgIGlzTXV0YWJsZT86IGJvb2xlYW4gICAgICAgICAgIC8vIGVuYWJsZSB1cGRhdGUoKVxuICAgKiB9XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllciAgICAgICAgLy8gZmVlIHBheWVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNMZXNzTWludE9wdGlvbnM+fSBvcHRpb25zICAgICAgICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZ2FzTGVzc01pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8R2FzTGVzc01pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dE5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCByb3lhbHR5ID0gaW5wdXQucm95YWx0eSA/IGlucHV0LnJveWFsdHkgOiAwO1xuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSBDb252ZXJ0ZXIuUm95YWx0eS5pbnRvSW5mcmEocm95YWx0eSk7XG4gICAgICBjb25zdCBvd25lclB1YmxpY2tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG4gICAgICBsZXQgdXJpID0gJyc7XG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgICB7IC4uLmlucHV0LCBwcm9wZXJ0aWVzIH0sXG4gICAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIHVyaSA9IGlucHV0LnVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuXG4gICAgICBsZXQgZGF0YXYyID0gQ29udmVydGVyLlJlZ3VsYXJOZnRNZXRhZGF0YS5pbnRvSW5mcmEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgLy8tLS0gY29sbGVjdGlvbiAtLS1cbiAgICAgIGxldCBjb2xsZWN0aW9uO1xuICAgICAgaWYgKGlucHV0LmNvbGxlY3Rpb24gJiYgaW5wdXQuY29sbGVjdGlvbikge1xuICAgICAgICBjb2xsZWN0aW9uID0gQ29udmVydGVyLkNvbGxlY3Rpb24uaW50b0luZnJhKGlucHV0LmNvbGxlY3Rpb24pO1xuICAgICAgICBkYXRhdjIgPSB7IC4uLmRhdGF2MiwgY29sbGVjdGlvbiB9O1xuICAgICAgfVxuICAgICAgLy8tLS0gY29sbGVjdGlvbiAtLS1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgc2VsbGVyRmVlQmFzaXNQb2ludHM6ICcsIHNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcblxuICAgICAgY29uc3QgbWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGluc3RzID0gYXdhaXQgTWludC5jcmVhdGVNaW50KFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyUHVibGlja2V5LFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKG9wdGlvbnMuZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgTWludC5jcmVhdGVEZWxlYWdhdGUoXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lclB1YmxpY2tleSxcbiAgICAgICAgICAgIG9wdGlvbnMuZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbih7XG4gICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgIGJsb2NraGFzaDogYmxvY2toYXNoT2JqLmJsb2NraGFzaCxcbiAgICAgICAgZmVlUGF5ZXI6IGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcblxuICAgICAgaW5zdHMuZm9yRWFjaCgoaW5zdCkgPT4gdHguYWRkKGluc3QpKTtcblxuICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICB0eC5hZGQoXG4gICAgICAgICAgYXdhaXQgVHJhbnNhY3Rpb25CdWlsZGVyLlByaW9yaXR5RmVlLmNyZWF0ZVByaW9yaXR5RmVlSW5zdHJ1Y3Rpb24odHgpLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgW293bmVyLCBtaW50XS5mb3JFYWNoKChzaWduZXIpID0+IHR4LnBhcnRpYWxTaWduKHNpZ25lci50b0tleXBhaXIoKSkpO1xuXG4gICAgICBjb25zdCBzZXJpYWxpemVkVHggPSB0eC5zZXJpYWxpemUoe1xuICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGhleCA9IHNlcmlhbGl6ZWRUeC50b1N0cmluZygnaGV4Jyk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5QYXJ0aWFsU2lnbihoZXgsIG1pbnQucHVia2V5KTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFBhcnRpYWxTaWduU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IEdhc0xlc3NUcmFuc2Zlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IFNwbFRva2VuIH0gZnJvbSAnfi9zdWl0ZS1zcGwtdG9rZW4nO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICAvKipcbiAgICogVHJhbnNmZXIgd2l0aG91dCBzb2xhbmEgc29sLCBkZWxlZ2F0ZSBmZWVwYXllciBmb3IgY29tbWlzc2lvblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3RcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNMZXNzVHJhbnNmZXJPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZ2FzTGVzc1RyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8R2FzTGVzc1RyYW5zZmVyT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBTcGxUb2tlbi5nYXNMZXNzVHJhbnNmZXIoXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBkZXN0LFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICAgIE5GVF9ERUNJTUFMUyxcbiAgICAgIGZlZVBheWVyLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVNldENvbGxlY3Rpb25TaXplSW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgTWludENvbGxlY3Rpb25PcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuLyoqXG4gKiBjcmVhdGUgYSBjb2xsZWN0aW9uXG4gKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gKlxuICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gKiBAcGFyYW0ge1BhcnRpYWw8TWludENvbGxlY3Rpb25PcHRpb25zPn0gb3B0aW9uc1xuICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IERFRkFVTFRfQ09MTEVDVElPTl9TSVpFID0gMDtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG4gIGV4cG9ydCBjb25zdCBtaW50Q29sbGVjdGlvbiA9IChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludENvbGxlY3Rpb25PcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBmcmVlemVBdXRob3JpdHksIGZlZVBheWVyLCBjb2xsZWN0aW9uU2l6ZSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IG93bmVyO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgfTtcbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuXG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShpbnB1dCwgMCk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHsgaW1hZ2U6IGlucHV0LnVyaSB9O1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkRGF0YShcbiAgICAgICAgICB7IC4uLnN0b3JhZ2VNZXRhZGF0YSwgLi4uaW1hZ2UgfSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b0luZnJhKGlucHV0LCB1cmksIDApO1xuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgY29sbGVjdGlvbk1ldGFkYXRhQWNjb3VudCA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKFxuICAgICAgICBjb2xsZWN0aW9uTWludC5wdWJrZXksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhd2FpdCBNaW50LmNyZWF0ZU1pbnQoXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIE1pbnQuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICAgICAgY29sbGVjdGlvbk1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSB7XG4gICAgICAgIGNvbGxlY3Rpb25NZXRhZGF0YTogY29sbGVjdGlvbk1ldGFkYXRhQWNjb3VudCxcbiAgICAgICAgY29sbGVjdGlvbkF1dGhvcml0eTogb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICBjb2xsZWN0aW9uTWludDogY29sbGVjdGlvbk1pbnQudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgfTtcblxuICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgIGNyZWF0ZVNldENvbGxlY3Rpb25TaXplSW5zdHJ1Y3Rpb24oY29sbGVjdGlvbnMsIHtcbiAgICAgICAgICBzZXRDb2xsZWN0aW9uU2l6ZUFyZ3M6IHtcbiAgICAgICAgICAgIHNpemU6IGNvbGxlY3Rpb25TaXplIHx8IERFRkFVTFRfQ09MTEVDVElPTl9TSVpFLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuTWludChcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBbb3duZXIudG9LZXlwYWlyKCksIGNvbGxlY3Rpb25NaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgY3JlYXRlVGhhd0RlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBUaGF3T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgLyoqXG4gICAqIFRoYXdpbmcgYSB0YXJnZXQgTkZUXG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge1RoYXdPcHRpb25zfSBvcHRpb25zICAgICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Jlc3VsdDxDb21tb25TdHJ1Y3R1cmU8dW5rbm93bj4sIEVycm9yPiB9XG4gICAqL1xuICBleHBvcnQgY29uc3QgdGhhdyA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFRoYXdPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPHVua25vd24+LCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgZWRpdGlvbkFkZHJlc3MgPSBBY2NvdW50LlBkYS5nZXRNYXN0ZXJFZGl0aW9uKG1pbnQpO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVGhhd0RlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbih7XG4gICAgICAgIGRlbGVnYXRlOiBuZXcgQWNjb3VudC5LZXlwYWlyKHtcbiAgICAgICAgICBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSxcbiAgICAgICAgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG9rZW5BY2NvdW50OiB0b2tlbkFjY291bnQsXG4gICAgICAgIGVkaXRpb246IGVkaXRpb25BZGRyZXNzLFxuICAgICAgICBtaW50OiBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFNwbFRva2VuIH0gZnJvbSAnfi9zdWl0ZS1zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2Zlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIC8qKlxuICAgKiBUcmFuc2ZlciBORlRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3QgICAgICAgICAgICAgLy8gbmV3IG93bmVyXG4gICAqIEBwYXJhbSB7VGhhd09wdGlvbnN9IG9wdGlvbnMgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiB7UmVzdWx0PENvbW1vblN0cnVjdHVyZTx1bmtub3duPiwgRXJyb3I+IH1cbiAgICovXG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFRyYW5zZmVyT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4udHJhbnNmZXIoXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBkZXN0LFxuICAgICAgb3duZXJPck11bHRpc2lnLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICAgIE5GVF9ERUNJTUFMUyxcbiAgICAgIG9wdGlvbnMsXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgRnJlZXplIH0gZnJvbSAnLi9mcmVlemUnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBHYXNMZXNzTWludCB9IGZyb20gJy4vZ2FzLWxlc3MtbWludCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEdhc0xlc3NUcmFuc2ZlciB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludENvbGxlY3Rpb24gfSBmcm9tICcuL21pbnQtY29sbGVjdGlvbic7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZXhwb3J0IGNvbnN0IFJlZ3VsYXJOZnQgPSB7XG4gIC4uLkJ1cm4sXG4gIC4uLkZpbmQsXG4gIC4uLkZyZWV6ZSxcbiAgLi4uR2FzTGVzc01pbnQsXG4gIC4uLkdhc0xlc3NUcmFuc2ZlcixcbiAgLi4uTWludCxcbiAgLi4uTWludENvbGxlY3Rpb24sXG4gIC4uLlRoYXcsXG4gIC4uLlRyYW5zZmVyLFxufTtcbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IH0gZnJvbSAnfi9zdWl0ZS1yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBNaW50Q29sbGVjdGlvbk9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2NvbXByZXNzZWQtbmZ0JztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG4vKipcbiAqIGNyZWF0ZSBhIGNvbGxlY3Rpb25cbiAqIFRoaXMgZnVuY3Rpb24gbmVlZHMgb25seSAxIGNhbGxcbiAqXG4gKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAqIEBwYXJhbSB7SW5wdXROZnRNZXRhZGF0YX0gaW5wdXRcbiAqIEBwYXJhbSB7TWludENvbGxlY3Rpb25PcHRpb25zfSBvcHRpb25zXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxNaW50VHJhbnNhY3Rpb24sIEVycm9yPj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgZXhwb3J0IGNvbnN0IG1pbnRDb2xsZWN0aW9uID0gKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50Q29sbGVjdGlvbk9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIGNvbnN0IHsgZmVlUGF5ZXIsIGZyZWV6ZUF1dGhvcml0eSB9ID0gb3B0aW9ucztcbiAgICByZXR1cm4gUmVndWxhck5mdC5taW50Q29sbGVjdGlvbihvd25lciwgaW5wdXQsIHtcbiAgICAgIGZlZVBheWVyLFxuICAgICAgZnJlZXplQXV0aG9yaXR5LFxuICAgIH0pO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLHVCQUFBQTtBQUFBO0FBQUE7OztBQ0FBLGtCQUFzQztBQUN0QyxrQkFBNkI7QUFFdEIsSUFBSSxTQUFTLFlBQUFDO0FBRWIsSUFBVTtBQUFBLENBQVYsQ0FBVUMsZUFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxxQkFBVjtBQUNFLElBQU1BLGlCQUFBLHNCQUFzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU81QixJQUFNQSxpQkFBQSxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FSWixrQkFBQUQsV0FBQSxvQkFBQUEsV0FBQTtBQUFBLEdBREY7QUFBQSxDQTBCVixDQUFVQSxlQUFWO0FBQ0UsRUFBTUEsV0FBQSxpQkFBaUIsT0FBTyxRQUFRO0FBQ3RDLEVBQU1BLFdBQUEsbUJBQW1CLE9BQU8sUUFBUTtBQUN4QyxFQUFNQSxXQUFBLGNBQWMsT0FBTztBQUMzQixFQUFNQSxX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LENBQVVBLG9CQUFWO0FBQ0UsRUFBTUEsZ0JBQUEsaUJBQWlCLENBQzVCLE9BQ0EsT0FDQSxVQUEwQyxDQUFDLE1BQ0Q7QUFDMUMsVUFBTSxFQUFFLFVBQVUsZ0JBQWdCLElBQUk7QUFDdEMsV0FBT0MsYUFBVyxlQUFlLE9BQU8sT0FBTztBQUFBLE1BQzdDO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQVhlRCxvQ0FBQTs7O0FsRUxWLElBQU1FLGlCQUFnQjtBQUFBO0FBQUEsRUFFM0IsR0FBRztBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFDTDsiLAogICJuYW1lcyI6IFsiQ29tcHJlc3NlZE5mdCIsICJTb2xhbmFKc29uQ29uZmlnIiwgIkNvbnN0YW50cyIsICJXYXJubmluZ01lc3NhZ2UiLCAiQ2x1c3RlciIsICJFbmRQb2ludFVybCIsICJCdW5kbHJVcmwiLCAiRGFzQXBpVXJsIiwgIk5mdHN0b3JhZ2VBcGlLZXkiLCAiY3VzdG9tQ2x1c3RlclVybCIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIkFzc29jaWF0ZWQiLCAiaW1wb3J0X3dlYjMiLCAiQWNjb3VudCIsICJLZXlwYWlyIiwgImJzIiwgIk9yaWdpbmFsIiwgImltcG9ydF93ZWIzIiwgIkFjY291bnQiLCAiUGRhIiwgIk1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCIsICJCTiIsICJBY2NvdW50IiwgImltcG9ydF9iczU4IiwgIkFjY291bnQiLCAiYnMiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3dlYjMiLCAiRGFzQXBpIiwgIkNvbnZlcnRlciIsICJDb2xsZWN0aW9uIiwgIkNvbGxlY3Rpb25NaW50IiwgIkNvbnZlcnRlciIsICJDcmVhdG9ycyIsICJpbXBvcnRfbXBsX2J1YmJsZWd1bV9pbnN0cnVjdGlvbiIsICJDb252ZXJ0ZXIiLCAiQ29tcHJlc3NlZE5mdE1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJSb3lhbHR5IiwgIkNvbnZlcnRlciIsICJOZnQiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIlJlZ3VsYXJOZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUHJvcGVydGllcyIsICJDb252ZXJ0ZXIiLCAiVXNlcyIsICJDb252ZXJ0ZXIiLCAiVG9rZW5NZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXJDaGVja2VkIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlciIsICJDb252ZXJ0ZXIiLCAiRGFzQXBpIiwgIkNvbnZlcnRlciIsICJEYXNBcGkiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlByaW9yaXR5RmVlIiwgIkRhc0FwaSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiUmVzdWx0IiwgImltcG9ydF93ZWIzIiwgIk5vZGUiLCAiaW1wb3J0X21wbF9idWJibGVndW1faW5zdHJ1Y3Rpb24iLCAiQ29tcHJlc3NlZE5mdCIsICJEYXNBcGkiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tcHJlc3NlZE5mdCIsICJEYXNBcGkiLCAiaW1wb3J0X3dlYjMiLCAiQ29tcHJlc3NlZE5mdCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X21wbF9idWJibGVndW1faW5zdHJ1Y3Rpb24iLCAiaW1wb3J0X3NwbF9hY2NvdW50X2NvbXByZXNzaW9uIiwgIkNvbXByZXNzZWROZnQiLCAiRGFzQXBpIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJDb21wcmVzc2VkTmZ0IiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlByb3ZlbmFuY2VMYXllciIsICJ1cGxvYWRGaWxlIiwgIklyeXMiLCAiQXJ3ZWF2ZSIsICJpbXBvcnRfbmZ0IiwgIk5mdFN0b3JhZ2UiLCAiU3RvcmFnZSIsICJWYWxpZGF0b3IiLCAiTWVzc2FnZSIsICJDb252ZXJ0ZXIiLCAiaW1wb3J0X3NwbF9hY2NvdW50X2NvbXByZXNzaW9uIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9tcGxfYnViYmxlZ3VtX2luc3RydWN0aW9uIiwgIkNvbXByZXNzZWROZnQiLCAiQWNjb3VudCIsICJNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9tcGxfYnViYmxlZ3VtX2luc3RydWN0aW9uIiwgImltcG9ydF9zcGxfYWNjb3VudF9jb21wcmVzc2lvbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIkNvbXByZXNzZWROZnQiLCAiRGFzQXBpIiwgIkFjY291bnQiLCAiQ29udmVydGVyIiwgIkJVQkJMRUdVTV9QUk9HUkFNX0lEIiwgIlRPS0VOX01FVEFEQVRBX1BST0dSQU1fSUQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgIk1BWF9SRVRSSUVTIiwgIkNvbnZlcnRlciIsICJmZXRjaCIsICJBY2NvdW50IiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfd2ViMyIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiU3BsVG9rZW4iLCAibWludCIsICJBY2NvdW50IiwgIkNvbnZlcnRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlNwbFRva2VuIiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiUmVndWxhck5mdCIsICJEYXNBcGkiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAibWludCIsICJBY2NvdW50IiwgIkNvbnZlcnRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiUmVndWxhck5mdCIsICJDb252ZXJ0ZXIiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiUmVndWxhck5mdCIsICJTcGxUb2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAiQ29udmVydGVyIiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJSZWd1bGFyTmZ0IiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiUmVndWxhck5mdCIsICJDb21wcmVzc2VkTmZ0IiwgIlJlZ3VsYXJOZnQiLCAiQ29tcHJlc3NlZE5mdCJdCn0K