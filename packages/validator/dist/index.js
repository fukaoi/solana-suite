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
  Validator: () => Validator,
  ValidatorError: () => ValidatorError
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
    const THRESHHOLD = 50;
    let isDisplay = false;
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
    WarnningMessage2.calculateProbability = () => {
      const randomValue = Math.random();
      const probability = 1 / THRESHHOLD;
      if (!isDisplay && randomValue < probability) {
        isDisplay = true;
        return true;
      }
      return false;
    };
  })(WarnningMessage = Constants2.WarnningMessage || (Constants2.WarnningMessage = {}));
})(Constants || (Constants = {}));
((Constants2) => {
  Constants2.currentCluster = Config.cluster.type;
  Constants2.customClusterUrl = Config.cluster.customClusterUrl;
  Constants2.isDebugging = Config.debugging;
  Constants2.nftStorageApiKey = Config.nftStorageApiKey;
  Constants2.dasApiUrl = Config.dasApiUrl;
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
    switch (env) {
      case "mainnet-beta" /* prd */: {
        if (Constants2.dasApiUrl.length < 1) {
          throw Error(Constants2.WarnningMessage.DAS_API_URL);
        }
        const index = Date.now() % Constants2.dasApiUrl.length;
        return Constants2.dasApiUrl[index];
      }
      default: {
        const urls = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639" /* dev */.split(",");
        const index = Date.now() % urls.length;
        return urls[index];
      }
    }
  };
  Constants2.switchNftStorage = (env) => {
    switch (env) {
      case "mainnet-beta" /* prd */:
        if (!Constants2.nftStorageApiKey) {
          throw Error(Constants2.WarnningMessage.NFT_STORAGE_API_KEY);
        }
        return Constants2.nftStorageApiKey;
      default: {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE" /* dev */;
      }
    }
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
var import_web35 = require("@solana/web3.js");

// ../node/src/index.ts
var import_web32 = require("@solana/web3.js");
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
    return new import_web32.Connection(setted.clusterUrl, setted.commitment);
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
var import_web33 = require("@solana/web3.js");
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
      return new import_web33.PublicKey(this.pubkey);
    }
    toKeypair() {
      const decoded = import_bs58.default.decode(this.secret);
      return import_web33.Keypair.fromSecretKey(decoded);
    }
    static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
    static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
    static create = () => {
      const keypair = import_web33.Keypair.generate();
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
var import_web34 = require("@solana/web3.js");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_mpl_bubblegum_instruction = require("mpl-bubblegum-instruction");
var import_bn = __toESM(require("bn.js"));
var Account3;
((Account5) => {
  let Pda;
  ((Pda2) => {
    Pda2.getMetadata = (address) => {
      const [publicKey] = import_web34.PublicKey.findProgramAddressSync(
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
      const [publicKey] = import_web34.PublicKey.findProgramAddressSync(
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
      const [publicKey] = import_web34.PublicKey.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        import_mpl_bubblegum_instruction.PROGRAM_ADDRESS.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = import_web34.PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        import_mpl_bubblegum_instruction.PROGRAM_ADDRESS.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getAssetId = (address, leafIndex) => {
      const node = new import_bn.default.BN(leafIndex);
      const [assetId] = import_web34.PublicKey.findProgramAddressSync(
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
  return new import_web35.PublicKey(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account4.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = import_bs582.default.decode(this.toString());
  return import_web35.Keypair.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return (0, import_bignumber.BigNumber)(this).div(import_web35.LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return (0, import_bignumber.BigNumber)(this).times(import_web35.LAMPORTS_PER_SOL).toNumber();
};

// ../transaction-builder/src/batch.ts
var import_web38 = require("@solana/web3.js");

// ../transaction-builder/src/common.ts
var import_web37 = require("@solana/web3.js");

// ../transaction-builder/src/priority-fee.ts
var import_web36 = require("@solana/web3.js");

// ../das-api/src/api.ts
var DasApi;
((DasApi4) => {
  let dasUri;
  const connect = async (method, params) => {
    Constants.WarnningMessage.calculateProbability() && console.warn(Constants.WarnningMessage.DAS_API_URL);
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
      return import_web36.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: lamports
      });
    };
    const sendTransactionWithPriorityFee = async (lamports, transaction, finalSigners) => {
      const computePriceInst = import_web36.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: lamports
      });
      const confirmOptions = {
        maxRetries: MAX_RETRIES
      };
      transaction.add(computePriceInst);
      return await (0, import_web36.sendAndConfirmTransaction)(
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
        const transaction = new import_web37.Transaction();
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
        const transaction = new import_web38.Transaction();
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
  TransactionBuilder8.Batch = Batch;
})(TransactionBuilder3 || (TransactionBuilder3 = {}));

// ../transaction-builder/src/mint.ts
var import_web39 = require("@solana/web3.js");
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
        const transaction = new import_web39.Transaction();
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
          return await (0, import_web39.sendAndConfirmTransaction)(
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
var import_web310 = require("@solana/web3.js");
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
        const transaction = import_web310.Transaction.from(decode);
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
((Result8) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result8.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result8.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result8.ok(resArr);
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
    return Result8.ok(res);
  }
  Result8.all = all;
})(Result || (Result = {}));

// src/index.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Validator,
  ValidatorError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vZ2xvYmFsL3NyYy9pbmRleC50cyIsICIuLi8uLi9ub2RlL3NyYy9pbmRleC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9hc3NvY2lhdGVkLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2tleXBhaXIudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvcGRhLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2JhdGNoLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbW1vbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9wcmlvcml0eS1mZWUudHMiLCAiLi4vLi4vZGFzLWFwaS9zcmMvYXBpLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29sbGVjdGlvbi50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NyZWF0b3JzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yb3lhbHR5LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbmZ0LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbWVtby50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yZWd1bGFyLW5mdC1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Byb3BlcnRpZXMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy91c2VzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdG9rZW4tbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci1jaGVja2VkLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi9kYXMtYXBpL3NyYy9maW5kLnRzIiwgIi4uLy4uL2Rhcy1hcGkvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvcGFydGlhbC1zaWduLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NhbGN1bGF0ZS10eHNpemUudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL3NoYXJlZC50cyIsICIuLi8uLi9zdWl0ZS11dGlscy9zcmMvcmVzdWx0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgRGV0YWlscywgTGltaXQgfSBmcm9tICd+L3R5cGVzL3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFZhbGlkYXRvciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVzc2FnZSB7XG4gICAgZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnc3VjY2Vzcyc7XG4gICAgZXhwb3J0IGNvbnN0IFNNQUxMX05VTUJFUiA9ICd0b28gc21hbGwnO1xuICAgIGV4cG9ydCBjb25zdCBCSUdfTlVNQkVSID0gJ3RvbyBiaWcnO1xuICAgIGV4cG9ydCBjb25zdCBMT05HX0xFTkdUSCA9ICd0b28gbG9uZyc7XG4gICAgZXhwb3J0IGNvbnN0IEVNUFRZID0gJ2ludmFsaWQgZW1wdHkgdmFsdWUnO1xuICAgIGV4cG9ydCBjb25zdCBJTlZBTElEX1VSTCA9ICdpbnZhbGlkIHVybCc7XG4gICAgZXhwb3J0IGNvbnN0IE9OTFlfTk9ERV9KUyA9ICdgc3RyaW5nYCB0eXBlIGlzIG9ubHkgTm9kZS5qcyc7XG4gIH1cblxuICBleHBvcnQgY29uc3QgTkFNRV9MRU5HVEggPSAzMjtcbiAgZXhwb3J0IGNvbnN0IFNZTUJPTF9MRU5HVEggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IFVSTF9MRU5HVEggPSAyMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01BWCA9IDEwMDtcbiAgZXhwb3J0IGNvbnN0IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCA9IDEwMDAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NSU4gPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBpc1JveWFsdHkgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3JveWFsdHknO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1NlbGxlckZlZUJhc2lzUG9pbnRzID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzZWxsZXJGZWVCYXNpc1BvaW50cy9zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc7XG4gICAgICBpZiAocm95YWx0eSAhPT0gMCAmJiAhcm95YWx0eSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHJveWFsdHkpO1xuICAgICAgfVxuICAgICAgaWYgKHJveWFsdHkgPCBST1lBTFRZX01JTikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuU01BTExfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01JTixcbiAgICAgICAgICBjb25kaXRpb246ICd1bmRlck1pbicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChyb3lhbHR5ID4gUk9ZQUxUWV9NQVggKiBDb252ZXJ0ZXIuUm95YWx0eS5USFJFU0hPTEQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc05hbWUgPSAobmFtZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICduYW1lJztcbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgobmFtZSkgPiBOQU1FX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIG5hbWUsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IE5BTUVfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU3ltYm9sID0gKHN5bWJvbDogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzeW1ib2wnO1xuICAgICAgaWYgKCFzeW1ib2wpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBzeW1ib2wpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoc3ltYm9sKSA+IFNZTUJPTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBzeW1ib2wsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNZTUJPTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNJbWFnZVVybCA9IChpbWFnZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+XG4gICAgaXNVcmlPckltYWdlKGltYWdlLCAnaW1hZ2UnKTtcblxuICBleHBvcnQgY29uc3QgY2hlY2tBbGwgPSA8XG4gICAgVCBleHRlbmRzIFBpY2tOZnRTdG9yYWdlIHwgUGlja05mdFN0b3JhZ2VNZXRhcGxleCB8IFBpY2tNZXRhcGxleCxcbiAgPihcbiAgICBtZXRhZGF0YTogVCxcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSk7XG4gICAgICBjb25zdCByZXN1bHRzOiBEZXRhaWxzW10gPSBbXTtcbiAgICAgIGtleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgbGV0IHJlcyE6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPjtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLmltYWdlKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzSW1hZ2VVcmwobWV0YWRhdGEuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncm95YWx0eSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnJveWFsdHkpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNSb3lhbHR5KG1ldGFkYXRhLnJveWFsdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cykge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5uYW1lKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzTmFtZShtZXRhZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuc3ltYm9sKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU3ltYm9sKG1ldGFkYXRhLnN5bWJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzICYmIHJlcy5pc0Vycikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5yZXMuZXJyb3IuZGV0YWlscyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAnQ2F1Z2h0IGluIHRoZSB2YWxpZGF0aW9uIGVycm9ycy4gc2VlIGluZm9ybWF0aW9uIGUuZzogZXJyPFZhbGlkYXRvckVycm9yPi5kZXRhaWxzJztcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICB0eXBlIFBpY2tOZnRTdG9yYWdlID0gUGljazxcbiAgICBPZmZjaGFpbixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdpbWFnZScgfCAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnXG4gID47XG4gIHR5cGUgUGlja05mdFN0b3JhZ2VNZXRhcGxleCA9IFBpY2s8XG4gICAgSW5wdXROZnRNZXRhZGF0YSxcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdyb3lhbHR5JyB8ICdmaWxlUGF0aCdcbiAgPjtcbiAgdHlwZSBQaWNrTWV0YXBsZXggPSBQaWNrPFxuICAgIERhdGFWMixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICd1cmknIHwgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJ1xuICA+O1xuXG4gIGNvbnN0IGJ5dGVMZW5ndGggPSAodmFsdWU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdGV4dCA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgIHJldHVybiB0ZXh0LmVuY29kZSh2YWx1ZSkubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUVycm9yID0gKFxuICAgIGtleTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBhY3R1YWw6IHN0cmluZyB8IG51bWJlcixcbiAgICBsaW1pdD86IExpbWl0LFxuICApOiBWYWxpZGF0b3JFcnJvciA9PiB7XG4gICAgbGV0IGVycm9yOiBWYWxpZGF0b3JFcnJvcjtcbiAgICBpZiAobGltaXQpIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsLCBsaW1pdCB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsIH1dKTtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9O1xuXG4gIGNvbnN0IGlzVXJpT3JJbWFnZSA9IChcbiAgICBpbWFnZU9yVXJpOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBpZiAoIWltYWdlT3JVcmkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKGltYWdlT3JVcmkpID4gVVJMX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIGltYWdlT3JVcmksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFVSTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCEvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7PzomPSssJSNdKy9nLnRlc3QoaW1hZ2VPclVyaSkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLklOVkFMSURfVVJMLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgZGV0YWlsczogRGV0YWlsc1tdO1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNbXSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb21taXRtZW50LCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IFNvbGFuYUpzb25Db25maWcgZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCc7XG5cbmV4cG9ydCBjb25zdCBDb25maWcgPSBTb2xhbmFKc29uQ29uZmlnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgV2Fybm5pbmdNZXNzYWdlIHtcbiAgICBjb25zdCBUSFJFU0hIT0xEID0gNTA7XG4gICAgbGV0IGlzRGlzcGxheSA9IGZhbHNlO1xuICAgIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBuZnRTdG9yYWdlQXBpS2V5IGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIENhbiBnZXQgYXBpIGtleSBmcm9tIGh0dHBzOi8vbmZ0LnN0b3JhZ2UvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGA7XG4gICAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBkYXNBcGlVcmwgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGkgdXJsIGZyb20gaHR0cHM6Ly93d3cuaGVsaXVzLmRldi9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG4gICAgICAgIGA7XG4gICAgLy8gZXhwb3J0IGNvbnN0IEFOTk9VTkNFID0gYFxuICAgIC8vICAgICBbREVQUkVDQVRFRF1cbiAgICAvLyAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAgICAgQWNjb3VudCwgTm9kZSwgdG9FeHBsb3JlciwgUHVia2V5LCBTZWNyZXQgaGF2ZSBiZWVuIG1vdmVkIHRvXG4gICAgLy8gICAgIEBzb2xhbmEtc3VpdGUvdXRpbHNcbiAgICAvLyAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vICAgICBgO1xuXG4gICAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVByb2JhYmlsaXR5ID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgY29uc3QgcmFuZG9tVmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3QgcHJvYmFiaWxpdHkgPSAxIC8gVEhSRVNISE9MRDtcbiAgICAgIGlmICghaXNEaXNwbGF5ICYmIHJhbmRvbVZhbHVlIDwgcHJvYmFiaWxpdHkpIHtcbiAgICAgICAgaXNEaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBjb25zdCBjdXJyZW50Q2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGV4cG9ydCBjb25zdCBjdXN0b21DbHVzdGVyVXJsID0gQ29uZmlnLmNsdXN0ZXIuY3VzdG9tQ2x1c3RlclVybDtcbiAgZXhwb3J0IGNvbnN0IGlzRGVidWdnaW5nID0gQ29uZmlnLmRlYnVnZ2luZztcbiAgZXhwb3J0IGNvbnN0IG5mdFN0b3JhZ2VBcGlLZXkgPSBDb25maWcubmZ0U3RvcmFnZUFwaUtleTtcbiAgZXhwb3J0IGNvbnN0IGRhc0FwaVVybCA9IENvbmZpZy5kYXNBcGlVcmw7XG5cbiAgZXhwb3J0IGVudW0gQ2x1c3RlciB7XG4gICAgcHJkID0gJ21haW5uZXQtYmV0YScsXG4gICAgcHJkTWV0YXBsZXggPSAnbWFpbm5ldC1iZXRhLW1ldGFwbGV4JyxcbiAgICBkZXYgPSAnZGV2bmV0JyxcbiAgICBsb2NhbGhvc3QgPSAnbG9jYWxob3N0LWRldm5ldCcsXG4gIH1cblxuICBleHBvcnQgZW51bSBFbmRQb2ludFVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vYXBpLm1haW5uZXQtYmV0YS5zb2xhbmEuY29tJyxcbiAgICBwcmRNZXRhcGxleCA9ICdodHRwczovL2FwaS5tZXRhcGxleC5zb2xhbmEuY29tJyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICAgIGxvY2FsaG9zdCA9ICdodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEJ1bmRsclVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbm9kZTEuaXJ5cy54eXosaHR0cHM6Ly9ub2RlMi5pcnlzLnh5eicsXG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmlyeXMueHl6JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIERhc0FwaVVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbWFpbm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTInLFxuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTIsaHR0cHM6Ly9ycGMtZGV2bmV0LmhlbGl1cy54eXo/YXBpLWtleT05ZjcwYTg0My0zMjc0LTRmZmQtYTBhOS0zMjNmOGI3YzA2MzknLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gTmZ0c3RvcmFnZUFwaUtleSB7XG4gICAgcHJkID0gJ2V5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSmthV1E2WlhSb2Nqb3dlRVJHTWpjeU4yVmtPRFpoUkdVMVJUTXlaRFpEWkVKbE9EYzBZelJGTkRsRU9EWTFPV1ptT0VNaUxDSnBjM01pT2lKdVpuUXRjM1J2Y21GblpTSXNJbWxoZENJNk1UWXlNREkyTkRrME16Y3dOaXdpYm1GdFpTSTZJbVJsYlc4aWZRLmQ0SjcwbWlreFJCOGE1dndOdTZTTzVIREE4SmF1ZXVzZUFqN1FfeXRNQ0UnLFxuICAgIGRldiA9IHByZCxcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hDbHVzdGVyID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHsgY2x1c3RlcjogZW52LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcblxuICAgIC8vIGlmIHNldHRlZCBjdXN0b20gdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwgJiYgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21DbHVzdGVyVXJsW2luZGV4XTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkO1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmRNZXRhcGxleDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwubG9jYWxob3N0O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQnVuZGxyID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuQnVuZGxyVXJsLmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaERhc0FwaSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOiB7XG4gICAgICAgIGlmIChkYXNBcGlVcmwubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHRocm93IEVycm9yKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuREFTX0FQSV9VUkwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIGRhc0FwaVVybC5sZW5ndGg7XG4gICAgICAgIHJldHVybiBkYXNBcGlVcmxbaW5kZXhdO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkRhc0FwaVVybC5kZXYuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaE5mdFN0b3JhZ2UgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgaWYgKCFuZnRTdG9yYWdlQXBpS2V5KSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoV2Fybm5pbmdNZXNzYWdlLk5GVF9TVE9SQUdFX0FQSV9LRVkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZnRTdG9yYWdlQXBpS2V5O1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLk5mdHN0b3JhZ2VBcGlLZXkuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgV1JBUFBFRF9UT0tFTl9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnU28xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMicsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRU1PX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdNZW1vMVVoa0pSZkh5dkxNY1Z1Y0p3eFhldUQ3MjhFcVZERHdRRHhGTU5vJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FVEFQTEVYX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdtZXRhcWJ4eFVlcmRxMjhjajFSYkFXa1lRbTN5YnpqYjZhOGJ0NTE4eDFzJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IENPTU1JVE1FTlQ6IENvbW1pdG1lbnQgPSAnY29uZmlybWVkJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vaXBmcy5pby9pcGZzJztcbiAgZXhwb3J0IGNvbnN0IElSWVNfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9nYXRld2F5LmlyeXMueHl6JztcbiAgZXhwb3J0IGNvbnN0IEJVTkRMUl9ORVRXT1JLX1VSTCA9IHN3aXRjaEJ1bmRscihDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gc3dpdGNoRGFzQXBpKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IHN3aXRjaE5mdFN0b3JhZ2UoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xTQ0FOX1VSTCA9ICdodHRwczovL3NvbHNjYW4uaW8nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MQU5BRk1fVVJMID0gJ2h0dHBzOi8vc29sYW5hLmZtJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1hSQVlfVVJMID0gJ2h0dHBzOi8veHJheS5oZWxpdXMueHl6Jztcbn1cblxuLy8gRGlzcGxheSBBbGwgQW5ub3VuY2Vcbi8vIGNvbnNvbGUubG9nKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuQU5OT1VOQ0UpO1xuIiwgImltcG9ydCB7IEtleXBhaXIsIExBTVBPUlRTX1BFUl9TT0wsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbmZpZywgQ29uc3RhbnRzLCBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIsIEV4cGxvcmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuLyoqXG4gKiBDcmVhdGUgZXhwbG9yZXIgdXJsIGZvciBhY2NvdW50IGFkZHJlc3Mgb3Igc2lnbmF0dXJlXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9FeHBsb3JlclVybCA9IGZ1bmN0aW9uKFxuICBleHBsb3JlcjogRXhwbG9yZXIgPSBFeHBsb3Jlci5Tb2xzY2FuLFxuICBvcHRpb25zOiBQYXJ0aWFsPEV4cGxvcmVyT3B0aW9ucz4gPSB7fSxcbikge1xuICBsZXQgY2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGRlYnVnTG9nKCcjIGNsdXN0ZXJUeXBlOicsIGNsdXN0ZXIpO1xuICBpZiAoY2x1c3RlciAhPT0gQ29uc3RhbnRzLkNsdXN0ZXIucHJkKSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfVxuXG4gIGNvbnN0IGFkZHJlc3NPclNpZ25hdHVyZTogc3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICBsZXQgdXJsID0gJyc7XG5cbiAgaWYgKG9wdGlvbnMucmVwbGFjZVBhdGgpIHtcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgaWYgKEFjY291bnQuS2V5cGFpci5pc1B1YmtleShhZGRyZXNzT3JTaWduYXR1cmUpKSB7XG4gICAgLy8gYWRkcmVzc1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L2FkZHJlc3MvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHNpZ25hdHVyZVxuICAgIC8vIGZvciBJbnZhbGlkIHR5cGUgXCJuZXZlclwiIG9mIGFkZHJlc3NPclNpZ25hdHVyZSwgc28gYGFzIHN0cmluZ2BcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS90eC8ke2FkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vdHgvJHthZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICAgIH0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS90eC8ke2FkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXJsO1xufTtcblxuLyoqXG4gKiBQdWJLZXkoQHNvbGFuYS1zdWl0ZSkgdG8gUHVibGljS2V5KEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBQdWJsaWNLZXlcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b1B1YmxpY0tleSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1B1YmtleSh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuUHViS2V5OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnRvU3RyaW5nKCkpO1xufTtcblxuLyoqXG4gKiBTZWNyZXQoQHNvbGFuYS1zdWl0ZSkgdG8gS2V5cGFpcihAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgS2V5cGFpclxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvS2V5cGFpciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1NlY3JldCh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuU2VjcmV0OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMudG9TdHJpbmcoKSk7XG4gIHJldHVybiBLZXlwYWlyLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG59O1xuXG4vKipcbiAqIExBTVBPUlRTIHRvIFNPTFxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvU29sID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLnRpbWVzKExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29tbWl0bWVudCwgQ29ubmVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTm9kZSB7XG4gIGNvbnN0IHNldHRlZCA9IHtcbiAgICBjbHVzdGVyVXJsOiAnJyxcbiAgICBjb21taXRtZW50OiBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgICBjdXN0b21DbHVzdGVyVXJsOiBbXSBhcyBzdHJpbmdbXSxcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvbiA9ICgpOiBDb25uZWN0aW9uID0+IHtcbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbihzZXR0ZWQuY2x1c3RlclVybCwgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjaGFuZ2VDb25uZWN0aW9uID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjb21taXRtZW50PzogQ29tbWl0bWVudDtcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiB2b2lkID0+IHtcbiAgICAvLyBpbml0aWFsaXplXG4gICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSAnJztcbiAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IFtdO1xuICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG5cbiAgICBjb25zdCB7IGNsdXN0ZXIsIGNvbW1pdG1lbnQsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuICAgIGlmIChjb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IGNvbW1pdG1lbnQ7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjb21taXRtZW50OiAnLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gICAgfVxuXG4gICAgaWYgKGNsdXN0ZXIpIHtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjbHVzdGVyOiBjbHVzdGVyIH0pO1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY2x1c3RlclVybDogJywgc2V0dGVkLmNsdXN0ZXJVcmwpO1xuICAgIH1cblxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsKSB7XG4gICAgICBkZWJ1Z0xvZygnIyBjdXN0b21DbHVzdGVyVXJsOiAnLCBjdXN0b21DbHVzdGVyVXJsKTtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjdXN0b21DbHVzdGVyVXJsIH0pO1xuICAgICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBjdXN0b21DbHVzdGVyVXJsO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIE5vZGUgY2hhbmdlIGNsdXN0ZXIsIGN1c3RvbSBjbHVzdGVyIHVybDogJyxcbiAgICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgY29uZmlybWVkU2lnID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgIGNvbW1pdG1lbnQ6IENvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgKSA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhdGVzdEJsb2NraGFzaCA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgcmV0dXJuIGF3YWl0IGNvbm5lY3Rpb25cbiAgICAgIC5jb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBibG9ja2hhc2g6IGxhdGVzdEJsb2NraGFzaC5ibG9ja2hhc2gsXG4gICAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGxhdGVzdEJsb2NraGFzaC5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1pdG1lbnQsXG4gICAgICApXG4gICAgICAudGhlbihSZXN1bHQub2spXG4gICAgICAuY2F0Y2goUmVzdWx0LmVycik7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QWNjb3VudCxcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG4gIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IsXG4gIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbi8qKlxuICogR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gKlxuICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsbG93T3duZXJPZmZDdXJ2ZVxuICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBBc3NvY2lhdGVkIHtcbiAgICAvKipcbiAgICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgICAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICAgICk6IFByb21pc2U8e1xuICAgICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIH0+ID0+IHtcbiAgICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgICBwYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyIGFzIE9yaWdpbmFsLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgY2xhc3MgS2V5cGFpciB7XG4gICAgc2VjcmV0OiBTZWNyZXQ7XG4gICAgcHVia2V5OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgICBpZiAoIXBhcmFtcy5wdWJrZXkpIHtcbiAgICAgICAgY29uc3Qga2V5cGFpciA9IHBhcmFtcy5zZWNyZXQudG9LZXlwYWlyKCk7XG4gICAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVia2V5ID0gcGFyYW1zLnB1YmtleTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VjcmV0ID0gcGFyYW1zLnNlY3JldDtcbiAgICB9XG5cbiAgICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy5wdWJrZXkpO1xuICAgIH1cblxuICAgIHRvS2V5cGFpcigpOiBPcmlnaW5hbCB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICAgIHJldHVybiBPcmlnaW5hbC5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1B1YmtleSA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgUHVia2V5ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGlzU2VjcmV0ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBTZWNyZXQgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17ODcsODh9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXIgPT4ge1xuICAgICAgY29uc3Qga2V5cGFpciA9IE9yaWdpbmFsLmdlbmVyYXRlKCk7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyB0b0tleVBhaXIgPSAoa2V5cGFpcjogT3JpZ2luYWwpOiBLZXlwYWlyID0+IHtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFBST0dSQU1fQUREUkVTUyBhcyBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQgfSBmcm9tICdtcGwtYnViYmxlZ3VtLWluc3RydWN0aW9uJztcbmltcG9ydCBCTiBmcm9tICdibi5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUGRhIHtcbiAgICBleHBvcnQgY29uc3QgZ2V0TWV0YWRhdGEgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldE1hc3RlckVkaXRpb24gPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2VkaXRpb24nKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0VHJlZUF1dGhvcml0eSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW2FkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEJndW1TaWduZXIgPSAoKTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtCdWZmZXIuZnJvbSgnY29sbGVjdGlvbl9jcGknLCAndXRmOCcpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEFzc2V0SWQgPSAoYWRkcmVzczogUHVia2V5LCBsZWFmSW5kZXg6IG51bWJlcik6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gbmV3IEJOLkJOKGxlYWZJbmRleCk7XG4gICAgICBjb25zdCBbYXNzZXRJZF0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdhc3NldCcsICd1dGY4JyksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgVWludDhBcnJheS5mcm9tKG5vZGUudG9BcnJheSgnbGUnLCA4KSksXG4gICAgICAgIF0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBhc3NldElkLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFjY291bnQgYXMgQWFzc29jaWF0ZWQgfSBmcm9tICcuL2Fzc29jaWF0ZWQnO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcbmltcG9ydCB7IEFjY291bnQgYXMgUGRhIH0gZnJvbSAnLi9wZGEnO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG4vLyBpbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSB7XG4gIC4uLkFhc3NvY2lhdGVkLFxuICAuLi5LZXlwYWlyLFxuICAuLi5QZGEsXG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFByaW9yaXR5RmVlIH0gZnJvbSAnLi9wcmlvcml0eS1mZWUnO1xuaW1wb3J0IHsgQmF0Y2hTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQmF0Y2gge1xuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8QmF0Y2hTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBvcHRpb25zLmluc3RydWN0aW9ucycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbW1vbk9yTWludEluc3QgPSBvcHRpb25zLmluc3RydWN0aW9ucztcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3Qgb2YgY29tbW9uT3JNaW50SW5zdCkge1xuICAgICAgICAgIGlmICghaW5zdC5pbnN0cnVjdGlvbnMgJiYgIWluc3Quc2lnbmVycykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgIGBvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgYmF0Y2hTdWJtaXQoKS5cbiAgICAgICAgICAgIEluZGV4OiAke2l9LCBTZXQgdmFsdWU6ICR7SlNPTi5zdHJpbmdpZnkoaW5zdCl9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGNvbW1vbk9yTWludEluc3QuZmxhdE1hcChcbiAgICAgICAgICAoaW5zdCkgPT4gaW5zdC5pbnN0cnVjdGlvbnMsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNpZ25lcnMgPSBjb21tb25Pck1pbnRJbnN0LmZsYXRNYXAoKGluc3QpID0+IGluc3Quc2lnbmVycyk7XG4gICAgICAgIGNvbnN0IGZlZVBheWVycyA9IGNvbW1vbk9yTWludEluc3QuZmlsdGVyKFxuICAgICAgICAgIChpbnN0KSA9PiBpbnN0LmZlZVBheWVyICE9PSB1bmRlZmluZWQsXG4gICAgICAgICk7XG4gICAgICAgIGxldCBmZWVQYXllciA9IHNpZ25lcnNbMF07XG4gICAgICAgIGlmIChmZWVQYXllcnMubGVuZ3RoID4gMCAmJiBmZWVQYXllcnNbMF0uZmVlUGF5ZXIpIHtcbiAgICAgICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgICBpZiAoZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IGZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgICAgICB9XG4gICAgICAgIGluc3RydWN0aW9ucy5tYXAoKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlVHhzaXplLmlzTWF4VHJhbnNhY3Rpb25TaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllci5wdWJsaWNLZXkpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgUHJpb3JpdHlGZWUuUHJpb3JpdHlGZWUuc3VibWl0KFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgS2V5cGFpcixcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUsIFN1Ym1pdE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFByaW9yaXR5RmVlIH0gZnJvbSAnLi9wcmlvcml0eS1mZWUnO1xuXG5leHBvcnQgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBDb21tb248VCA9IHVuZGVmaW5lZD4gaW1wbGVtZW50cyBDb21tb25TdHJ1Y3R1cmU8VD4ge1xuICAgIHN0YXRpYyBNQVhfVFJBTlNBQ1RJT05fU0laRSA9IDEyMzI7XG5cbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI/OiBLZXlwYWlyO1xuICAgIGRhdGE/OiBUO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICAgIGZlZVBheWVyPzogS2V5cGFpcixcbiAgICAgIGRhdGE/OiBULFxuICAgICkge1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBvcHRpb25zOiBQYXJ0aWFsPFN1Ym1pdE9wdGlvbnM+ID0ge30sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21tb24pKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcblxuICAgICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IHRoaXMuZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5pc1ByaW9yaXR5RmVlKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IFByaW9yaXR5RmVlLlByaW9yaXR5RmVlLnN1Ym1pdChcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29tcHV0ZUJ1ZGdldFByb2dyYW0sXG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBEYXNBcGkgfSBmcm9tICd+L2Rhcy1hcGknO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUHJpb3JpdHlGZWUge1xuICAgIGNvbnN0IE1JTklNVU1fUFJJT1JJVFlfRkVFID0gMzAwO1xuICAgIGV4cG9ydCBjb25zdCBzdWJtaXQgPSBhc3luYyAoXG4gICAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBhZGRTb2xQcmlvcml0eUZlZT86IG51bWJlcixcbiAgICApID0+IHtcbiAgICAgIGxldCBhZGRMYW1wb3J0cyA9IDA7XG4gICAgICBpZiAoYWRkU29sUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgYWRkTGFtcG9ydHMgPSBhZGRTb2xQcmlvcml0eUZlZS50b0xhbXBvcnRzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlc3RpbWF0ZXMgPSBhd2FpdCBEYXNBcGkuZ2V0UHJpb3JpdHlGZWVFc3RpbWF0ZSh0cmFuc2FjdGlvbik7XG4gICAgICAgIGRlYnVnTG9nKCcjIGVzdGltYXRlczogJywgZXN0aW1hdGVzKTtcbiAgICAgICAgYWRkTGFtcG9ydHMgPVxuICAgICAgICAgIGVzdGltYXRlcy5pc09rICYmIGVzdGltYXRlcy51bndyYXAoKS5tZWRpdW0gIT09IDBcbiAgICAgICAgICAgID8gZXN0aW1hdGVzLnVud3JhcCgpLm1lZGl1bVxuICAgICAgICAgICAgOiBNSU5JTVVNX1BSSU9SSVRZX0ZFRTtcbiAgICAgIH1cbiAgICAgIGRlYnVnTG9nKCcjIGxhbXBvcnRzOiAnLCBhZGRMYW1wb3J0cyk7XG4gICAgICByZXR1cm4gYXdhaXQgc2VuZFRyYW5zYWN0aW9uV2l0aFByaW9yaXR5RmVlKFxuICAgICAgICBhZGRMYW1wb3J0cyxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIHNpZ25lcnMsXG4gICAgICApO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgY3JlYXRlUHJpb3JpdHlGZWVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGVzdGltYXRlcyA9IGF3YWl0IERhc0FwaS5nZXRQcmlvcml0eUZlZUVzdGltYXRlKHRyYW5zYWN0aW9uKTtcbiAgICAgIGRlYnVnTG9nKCcjIGVzdGltYXRlczogJywgZXN0aW1hdGVzKTtcbiAgICAgIC8vIHByaW9yaXR5IGZlZTogbWVkaXVtXG4gICAgICBjb25zdCBsYW1wb3J0cyA9IGVzdGltYXRlcy5pc09rXG4gICAgICAgID8gZXN0aW1hdGVzLnVud3JhcCgpLm1lZGl1bVxuICAgICAgICA6IE1JTklNVU1fUFJJT1JJVFlfRkVFO1xuICAgICAgcmV0dXJuIENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0UHJpY2Uoe1xuICAgICAgICBtaWNyb0xhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBzZW5kVHJhbnNhY3Rpb25XaXRoUHJpb3JpdHlGZWUgPSBhc3luYyAoXG4gICAgICBsYW1wb3J0czogbnVtYmVyLFxuICAgICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgICAgZmluYWxTaWduZXJzOiBLZXlwYWlyW10sXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBjb21wdXRlUHJpY2VJbnN0ID0gQ29tcHV0ZUJ1ZGdldFByb2dyYW0uc2V0Q29tcHV0ZVVuaXRQcmljZSh7XG4gICAgICAgIG1pY3JvTGFtcG9ydHM6IGxhbXBvcnRzLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgfTtcbiAgICAgIHRyYW5zYWN0aW9uLmFkZChjb21wdXRlUHJpY2VJbnN0KTtcbiAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQXNzZXQsIEFzc2V0UHJvb2YsIEFzc2V0cywgUHJpb3JpdHlGZWVMZXZlbHMgfSBmcm9tICd+L3R5cGVzL2Rhcy1hcGknO1xuaW1wb3J0IHsgU29ydGFibGUgfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIERhc0FwaSB7XG4gIGxldCBkYXNVcmk6IHN0cmluZztcbiAgY29uc3QgY29ubmVjdCA9IGFzeW5jIChcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICBwYXJhbXM6IChcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IFB1YmtleVxuICAgICAgfCBTb3J0YWJsZVxuICAgICAgfCBudW1iZXJcbiAgICAgIHwgdW5kZWZpbmVkXG4gICAgICB8IFB1YmtleVtdXG4gICAgICB8IFRyYW5zYWN0aW9uXG4gICAgICB8IHtcbiAgICAgICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgICAgICB9XG4gICAgKVtdLFxuICApID0+IHtcbiAgICBDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLmNhbGN1bGF0ZVByb2JhYmlsaXR5KCkgJiZcbiAgICAgIGNvbnNvbGUud2FybihDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkRBU19BUElfVVJMKTtcbiAgICBkYXNVcmkgPSBkYXNVcmkgPyBkYXNVcmkgOiBDb25zdGFudHMuREFTX0FQSV9VUkw7XG4gICAgZGVidWdMb2coJyMgZGFzVXJpOiAnLCBkYXNVcmkpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZGFzVXJpLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBqc29ucnBjOiAnMi4wJyxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBpZDogJ2Rhcy1hcGknLFxuICAgICAgICBwYXJhbXMsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIGNvbnN0IGVyciA9IChhd2FpdCByZXNwb25zZS5qc29uKCkpLmVycm9yLm1lc3NhZ2U7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlcnIpKTtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCByZXNwb25zZS5qc29uKCkpLnJlc3VsdDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlRGFzVXJpID0gKHVybDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgZGFzVXJpID0gdXJsO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldFByb29mID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRQcm9vZiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXRQcm9vZicsIFthc3NldElkXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0ID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXQsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0JywgW2Fzc2V0SWRdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRzQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lckFkZHJlc3M6IFB1YmtleSxcbiAgICBsaW1pdDogbnVtYmVyID0gMTAwMCxcbiAgICBwYWdlOiBudW1iZXIgPSAxLFxuICAgIHNvcnRCeT86IFNvcnRhYmxlLFxuICAgIGJlZm9yZT86IHN0cmluZyxcbiAgICBhZnRlcj86IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldHNCeU93bmVyJywgW1xuICAgICAgICBvd25lckFkZHJlc3MsXG4gICAgICAgIHNvcnRCeSxcbiAgICAgICAgbGltaXQsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGJlZm9yZSxcbiAgICAgICAgYWZ0ZXIsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRzQnlHcm91cCA9IGFzeW5jIChcbiAgICBncm91cEtleTogc3RyaW5nLFxuICAgIGdyb3VwVmFsdWU6IFB1YmtleSxcbiAgICBsaW1pdDogbnVtYmVyID0gMTAwMCxcbiAgICBwYWdlOiBudW1iZXIgPSAxLFxuICAgIHNvcnRCeT86IFNvcnRhYmxlLFxuICAgIGJlZm9yZT86IHN0cmluZyxcbiAgICBhZnRlcj86IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldHNCeUdyb3VwJywgW1xuICAgICAgICBncm91cEtleSxcbiAgICAgICAgZ3JvdXBWYWx1ZSxcbiAgICAgICAgc29ydEJ5LFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgYmVmb3JlLFxuICAgICAgICBhZnRlcixcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRQcmlvcml0eUZlZUVzdGltYXRlID0gYXN5bmMgKFxuICAgIGFjY291bnRPclRyYW5zYWN0aW9uOiBQdWJrZXlbXSB8IFRyYW5zYWN0aW9uLFxuICApOiBQcm9taXNlPFJlc3VsdDxQcmlvcml0eUZlZUxldmVscywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBpbmNsdWRlQWxsUHJpb3JpdHlGZWVMZXZlbHM6IHRydWUgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGF3YWl0IGNvbm5lY3QoJ2dldFByaW9yaXR5RmVlRXN0aW1hdGUnLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWNjb3VudE9yVHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApLnByaW9yaXR5RmVlTGV2ZWxzO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEludGVybmFsQ29sbGVjdGlvbiB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEdyb3VwaW5nIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbmltcG9ydCB7XG4gIENvbGxlY3Rpb24gYXMgQ29sbGVjdGlvblR5cGUsXG4gIElucHV0Q29sbGVjdGlvbixcbiAgT3B0aW9uLFxufSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb24ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q29sbGVjdGlvbj4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+LFxuICAgICk6IENvbGxlY3Rpb25UeXBlIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3M6IG91dHB1dC5rZXkudG9TdHJpbmcoKSxcbiAgICAgICAgdmVyaWZpZWQ6IG91dHB1dC52ZXJpZmllZCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbk1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChvdXRwdXQ6IEdyb3VwaW5nW10pOiBQdWJrZXkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gb3V0cHV0LmZpbmQoKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5ncm91cF9rZXkgPT09ICdjb2xsZWN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5ncm91cF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzID8gcmVzLmdyb3VwX3ZhbHVlIDogJyc7XG4gICAgfTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgQ3JlYXRvcnMsIElucHV0Q3JlYXRvcnMsIE9wdGlvbiB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgSW50ZXJuYWxDcmVhdG9ycyB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENyZWF0b3JzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+ID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvQ29tcHJlc3NlZE5mdEluZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IEludGVybmFsQ3JlYXRvcnNbXSA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dCEubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4sXG4gICAgKTogQ3JlYXRvcnNbXSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1N0cmluZygpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBkYXRhLnZlcmlmaWVkLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHtcbiAgTWV0YWRhdGFBcmdzLFxuICBUb2tlblByb2dyYW1WZXJzaW9uLFxuICBUb2tlblN0YW5kYXJkLFxufSBmcm9tICdtcGwtYnViYmxlZ3VtLWluc3RydWN0aW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IE1ldGFkYXRhQXJncyA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Db21wcmVzc2VkTmZ0SW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICAgIHByaW1hcnlTYWxlSGFwcGVuZWQ6IGZhbHNlLFxuICAgICAgICBpc011dGFibGU6IGlucHV0LmlzTXV0YWJsZSA/PyBmYWxzZSxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiAwLFxuICAgICAgICB0b2tlblN0YW5kYXJkOiBUb2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlLFxuICAgICAgICB0b2tlblByb2dyYW1WZXJzaW9uOiBUb2tlblByb2dyYW1WZXJzaW9uLk9yaWdpbmFsLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJveWFsdHkge1xuICAgIGV4cG9ydCBjb25zdCBUSFJFU0hPTEQgPSAxMDA7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQXNzZXRBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvbmZ0JztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBOZnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChvdXRwdXQ6IEFzc2V0QW5kT2ZmY2hhaW4pOiBNZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5pZC50b1N0cmluZygpLFxuICAgICAgICBjb2xsZWN0aW9uTWludDogQ29sbGVjdGlvbi5Db2xsZWN0aW9uTWludC5pbnRvVXNlcihcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5ncm91cGluZyxcbiAgICAgICAgKSBhcyBQdWJrZXksXG4gICAgICAgIGF1dGhvcml0aWVzOiBvdXRwdXQub25jaGFpbi5hdXRob3JpdGllcyxcbiAgICAgICAgcm95YWx0eTogUm95YWx0eS5Sb3lhbHR5LmludG9Vc2VyKG91dHB1dC5vbmNoYWluLnJveWFsdHkucGVyY2VudCksXG4gICAgICAgIG5hbWU6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQubWV0YWRhdGEubmFtZSxcbiAgICAgICAgc3ltYm9sOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLnN5bWJvbCxcbiAgICAgICAgdXJpOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uY3JlYXRvcnMpISxcbiAgICAgICAgdHJlZUFkZHJlc3M6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLnRyZWUsXG4gICAgICAgIGlzQ29tcHJlc3NlZDogb3V0cHV0Lm9uY2hhaW4uY29tcHJlc3Npb24uY29tcHJlc3NlZCxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5tdXRhYmxlLFxuICAgICAgICBpc0J1cm46IG91dHB1dC5vbmNoYWluLmJ1cm50LFxuICAgICAgICBlZGl0aW9uTm9uY2U6IG91dHB1dC5vbmNoYWluLnN1cHBseS5lZGl0aW9uX25vbmNlLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBvdXRwdXQub25jaGFpbi5yb3lhbHR5LnByaW1hcnlfc2FsZV9oYXBwZW5lZCxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSEsXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE1lbW8sIFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1lbW8ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE1lbW8sXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICAgb3V0cHV0VHJhbnNmZXI/OiBUcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyBjYXNlOiB0cmFuc2ZlciB3aXRoIG1lbW9cbiAgICAgIGlmIChvdXRwdXRUcmFuc2ZlciAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtICE9PSAnJykge1xuICAgICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtID09PSAnc3BsLXRva2VuJykge1xuICAgICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGhpc3RvcnkubWVtbyA9IG91dHB1dC5wYXJzZWQ7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBNaW50VG8gfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNaW50VG8sXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubWludEF1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50QXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkuYWNjb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby5hY2NvdW50IGFzIHN0cmluZztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgb3ZlcndyaXRlT2JqZWN0LCBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQge30gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBGaWxlVHlwZSwgUHJvcGVydGllcywgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUHJvcGVydGllcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IGFzeW5jIChcbiAgICAgIGlucHV0OiBQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2tGdW5jOiAoXG4gICAgICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICAgICkgPT4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+LFxuICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxQcm9wZXJ0aWVzPiA9PiB7XG4gICAgICBpZiAoIWlucHV0IHx8ICFpbnB1dC5maWxlcykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGlucHV0LmZpbGVzLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICAgIGlmICghZmlsZS5maWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBjYWxsYmFja0Z1bmMoZmlsZS5maWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgICAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvdmVyd3JpdGVPYmplY3QoZmlsZSwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBleGlzdHNLZXk6ICdmaWxlUGF0aCcsXG4gICAgICAgICAgICAgIHdpbGw6IHsga2V5OiAndXJpJywgdmFsdWU6IHJlcy52YWx1ZSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgLi4uaW5wdXQsIGZpbGVzIH0gYXMgUHJvcGVydGllcztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBPcHRpb24sIFVzZXMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFVzZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAob3V0cHV0OiBPcHRpb248VXNlcz4pOiBVc2VzIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX1VzZXMgfSBmcm9tICcuL3VzZXMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIFRva2VuTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBNZXRhZGF0YUFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVG9rZW5NZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dFRva2VuTWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IG51bGwsXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogTWV0YWRhdGFBbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wpLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBkZWxldGUgTlVMTCgweDAwKSBzdHJpbmdzIGZ1bmN0aW9uXG4gICAgZXhwb3J0IGNvbnN0IGRlbGV0ZU51bGxTdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwwL2csICcnKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlckNoZWNrZWQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IFRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCkge1xuICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICApO1xuICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICB9XG5cbiAgICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubXVsdGlzaWdBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubXVsdGlzaWdBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnNpZ25lcnMgPSBvdXRwdXQucGFyc2VkLmluZm8uc2lnbmVycztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgVHJhbnNmZXIgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlciB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXIsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICBpZiAoIW91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbiB8fCAhb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgIGhpc3Rvcnkuc29sID0gb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzPy50b1NvbCgpLnRvU3RyaW5nKCk7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbXByZXNzZWROZnRNZXRhZGF0YSB9IGZyb20gJy4vY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTmZ0IH0gZnJvbSAnLi9uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1lbW8gfSBmcm9tICcuL21lbW8nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJlZ3VsYXJOZnRNZXRhZGF0YSB9IGZyb20gJy4vcmVndWxhci1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFByb3BlcnRpZXMgfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJveWFsdHkgfSBmcm9tICcuL3JveWFsdHknO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRva2VuTWV0YWRhdGEgfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICcuL3RyYW5zZmVyLWNoZWNrZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5cbmV4cG9ydCBjb25zdCBDb252ZXJ0ZXIgPSB7XG4gIC4uLkNvbXByZXNzZWROZnRNZXRhZGF0YSxcbiAgLi4uQ29sbGVjdGlvbixcbiAgLi4uQ3JlYXRvcnMsXG4gIC4uLk5mdCxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uUmVndWxhck5mdE1ldGFkYXRhLFxuICAuLi5Qcm9wZXJ0aWVzLFxuICAuLi5Sb3lhbHR5LFxuICAuLi5Ub2tlbk1ldGFkYXRhLFxuICAuLi5UcmFuc2ZlckNoZWNrZWQsXG4gIC4uLlRyYW5zZmVyLFxuICAuLi5Vc2VzLFxufTtcbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTWV0YWRhdGEsIE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9uZnQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgRmluZE9wdGlvbnMsIFNvcnRhYmxlLCBTb3J0QnksIFNvcnREaXJlY3Rpb24gfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuaW1wb3J0IHsgRGFzQXBpIGFzIEFwaSB9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgRGFzQXBpIHtcbiAgLy9AaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGRlZmF1bHRTb3J0Qnk6IFNvcnRhYmxlID0ge1xuICAgIHNvcnRCeTogU29ydEJ5LlJlY2VudCxcbiAgICBzb3J0RGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uLkRlc2MsXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGZldGNoT2ZmY2hhaW4gPSBhc3luYyAodXJpOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVyaSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQ29tcHJlc3NlZFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICApOiBQcm9taXNlPFBhcnRpYWw8TWV0YWRhdGE+PiA9PiB7XG4gICAgY29uc3QgYXNzZXQgPSBhd2FpdCBBcGkuZ2V0QXNzZXQobWludCk7XG4gICAgaWYgKGFzc2V0LmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldC5lcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoYXNzZXQudmFsdWUuY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKSB7XG4gICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKFxuICAgICAgICBhc3NldC52YWx1ZS5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAgICAgb25jaGFpbjogYXNzZXQudmFsdWUsXG4gICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgIH07XG4gICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG93bmVyIGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGlzQ29tcHJlc3NlZDogYm9vbGVhbixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPE5mdE1ldGFkYXRhPiA9PiB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBzb3J0Qnk6IGRlZmF1bHRTb3J0QnksXG4gICAgfTtcbiAgICBjb25zdCB7IGxpbWl0LCBwYWdlLCBzb3J0QnksIGJlZm9yZSwgYWZ0ZXIgfSA9IHtcbiAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuXG4gICAgY29uc3QgYXNzZXRzID0gYXdhaXQgQXBpLmdldEFzc2V0c0J5T3duZXIoXG4gICAgICBvd25lcixcbiAgICAgIGxpbWl0LFxuICAgICAgcGFnZSxcbiAgICAgIHNvcnRCeSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICk7XG4gICAgaWYgKGFzc2V0cy5pc0Vycikge1xuICAgICAgdGhyb3cgYXNzZXRzLmVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gYXNzZXRzLnZhbHVlLml0ZW1zO1xuXG4gICAgY29uc3QgbWV0YWRhdGFzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpdGVtc1xuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXByZXNzaW9uLmNvbXByZXNzZWQgPT09IGlzQ29tcHJlc3NlZClcbiAgICAgICAgLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKFxuICAgICAgICAgICAgICBpdGVtLmNvbnRlbnQuanNvbl91cmksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgbWVyZ2VkID0ge1xuICAgICAgICAgICAgICBvbmNoYWluOiBpdGVtLFxuICAgICAgICAgICAgICBvZmZjaGFpbjogb2ZmY2hhaW4sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnQuaW50b1VzZXIobWVyZ2VkKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIEZhaWxlZCBmZXRjaCBvZmZjaGFpbiB1cmw6ICcsIGl0ZW0uY29udGVudC5qc29uX3VyaSk7XG4gICAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcih7XG4gICAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICAgIG9mZmNoYWluOiB7fSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogYXNzZXRzLnZhbHVlLnBhZ2UsXG4gICAgICB0b3RhbDogYXNzZXRzLnZhbHVlLnRvdGFsLFxuICAgICAgbGltaXQ6IGFzc2V0cy52YWx1ZS5saW1pdCxcbiAgICAgIG1ldGFkYXRhcyxcbiAgICB9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBjb2xsZWN0aW9uIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IGNvbGxlY3Rpb25NaW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkLFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RmluZE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5Q29sbGVjdGlvbiA9IGFzeW5jIChcbiAgICBjb2xsZWN0aW9uTWludDogUHVia2V5LFxuICAgIGlzQ29tcHJlc3NlZDogYm9vbGVhbixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPE5mdE1ldGFkYXRhPiA9PiB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBzb3J0Qnk6IGRlZmF1bHRTb3J0QnksXG4gICAgfTtcbiAgICBjb25zdCB7IGxpbWl0LCBwYWdlLCBzb3J0QnksIGJlZm9yZSwgYWZ0ZXIgfSA9IHtcbiAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuXG4gICAgY29uc3QgYXNzZXRzID0gYXdhaXQgQXBpLmdldEFzc2V0c0J5R3JvdXAoXG4gICAgICAnY29sbGVjdGlvbicsXG4gICAgICBjb2xsZWN0aW9uTWludCxcbiAgICAgIGxpbWl0LFxuICAgICAgcGFnZSxcbiAgICAgIHNvcnRCeSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICk7XG4gICAgaWYgKGFzc2V0cy5pc0Vycikge1xuICAgICAgdGhyb3cgYXNzZXRzLmVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gYXNzZXRzLnZhbHVlLml0ZW1zO1xuXG4gICAgY29uc3QgbWV0YWRhdGFzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpdGVtc1xuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXByZXNzaW9uLmNvbXByZXNzZWQgPT09IGlzQ29tcHJlc3NlZClcbiAgICAgICAgLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oaXRlbS5jb250ZW50Lmpzb25fdXJpKTtcbiAgICAgICAgICBjb25zdCBtZXJnZWQgPSB7XG4gICAgICAgICAgICBvbmNoYWluOiBpdGVtLFxuICAgICAgICAgICAgb2ZmY2hhaW46IG9mZmNoYWluLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnQuaW50b1VzZXIobWVyZ2VkKTtcbiAgICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogYXNzZXRzLnZhbHVlLnBhZ2UsXG4gICAgICB0b3RhbDogYXNzZXRzLnZhbHVlLnRvdGFsLFxuICAgICAgbGltaXQ6IGFzc2V0cy52YWx1ZS5saW1pdCxcbiAgICAgIG1ldGFkYXRhcyxcbiAgICB9O1xuICB9O1xufVxuIiwgImltcG9ydCB7IERhc0FwaSBhcyBBcGkgfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgeyBEYXNBcGkgYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5cbmV4cG9ydCBjb25zdCBEYXNBcGkgPSB7XG4gIC4uLkFwaSxcbiAgLi4uRmluZCxcbn07XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFByaW9yaXR5RmVlIH0gZnJvbSAnLi9wcmlvcml0eS1mZWUnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlLCBTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIE1pbnQ8VCA9IFB1YmtleT4gaW1wbGVtZW50cyBNaW50U3RydWN0dXJlPFQ+IHtcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI6IEtleXBhaXI7XG4gICAgZGF0YTogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICAgIGRhdGE6IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1pbnQpKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgTWludEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGlmIChOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgICAgICAgIGRlYnVnTG9nKCcjIENoYW5nZSBtZXRhcGxleCBjbHVzdGVyIG9uIG1haW5uZXQtYmV0YScpO1xuICAgICAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXI6IENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBQcmlvcml0eUZlZS5Qcmlvcml0eUZlZS5zdWJtaXQoXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7XG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxuICBTdWJtaXRPcHRpb25zLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBQYXJ0aWFsU2lnbiBpbXBsZW1lbnRzIFBhcnRpYWxTaWduU3RydWN0dXJlIHtcbiAgICBoZXhJbnN0cnVjdGlvbjogc3RyaW5nO1xuICAgIGRhdGE/OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihpbnN0cnVjdGlvbnM6IHN0cmluZywgbWludD86IFB1YmtleSkge1xuICAgICAgdGhpcy5oZXhJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGFydGlhbFNpZ24pKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0aW9ucy5mZWVQYXllcikge1xuICAgICAgICAgIHRocm93IEVycm9yKCdOZWVkIGZlZVBheWVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWNvZGUgPSBCdWZmZXIuZnJvbSh0aGlzLmhleEluc3RydWN0aW9uLCAnaGV4Jyk7XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gVHJhbnNhY3Rpb24uZnJvbShkZWNvZGUpO1xuICAgICAgICB0cmFuc2FjdGlvbi5wYXJ0aWFsU2lnbihvcHRpb25zLmZlZVBheWVyIS50b0tleXBhaXIoKSk7XG5cbiAgICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3aXJlVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbi5zZXJpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5LCBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbi8vIEBpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBjb25zdCBMT1dfVkFMVUUgPSAxMjc7IC8vIDB4N2ZcbiAgY29uc3QgSElHSF9WQUxVRSA9IDE2MzgzOyAvLyAweDNmZmZcbiAgY29uc3QgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gIC8qKlxuICAgKiBDb21wYWN0IHUxNiBhcnJheSBoZWFkZXIgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIGFycmF5IGhlYWRlclxuICAgKi9cbiAgY29uc3QgY29tcGFjdEhlYWRlciA9IChuOiBudW1iZXIpID0+XG4gICAgbiA8PSBMT1dfVkFMVUUgPyAxIDogbiA8PSBISUdIX1ZBTFVFID8gMiA6IDM7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IHNpemVcbiAgICogQHBhcmFtIG4gZWxlbWVudHMgaW4gdGhlIGNvbXBhY3QgYXJyYXlcbiAgICogQHBhcmFtIHNpemUgYnl0ZXMgcGVyIGVhY2ggZWxlbWVudFxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIGFycmF5XG4gICAqL1xuICBjb25zdCBjb21wYWN0QXJyYXlTaXplID0gKG46IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PlxuICAgIGNvbXBhY3RIZWFkZXIobikgKyBuICogc2l6ZTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHR4c2l6ZVxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gYSBzb2xhbmEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIGZlZVBheWVyIHRoZSBwdWJsaWNLZXkgb2YgdGhlIHNpZ25lclxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVR4U2l6ZSA9IChcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBmZWVQYXllclBrID0gW2ZlZVBheWVyLnRvQmFzZTU4KCldO1xuXG4gICAgY29uc3Qgc2lnbmVycyA9IG5ldyBTZXQ8c3RyaW5nPihmZWVQYXllclBrKTtcbiAgICBjb25zdCBhY2NvdW50cyA9IG5ldyBTZXQ8c3RyaW5nPihmZWVQYXllclBrKTtcblxuICAgIGNvbnN0IGl4c1NpemUgPSB0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMucmVkdWNlKChhY2MsIGl4KSA9PiB7XG4gICAgICBpeC5rZXlzLmZvckVhY2goKHsgcHVia2V5LCBpc1NpZ25lciB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBrID0gcHVia2V5LnRvQmFzZTU4KCk7XG4gICAgICAgIGlmIChpc1NpZ25lcikgc2lnbmVycy5hZGQocGspO1xuICAgICAgICBhY2NvdW50cy5hZGQocGspO1xuICAgICAgfSk7XG5cbiAgICAgIGFjY291bnRzLmFkZChpeC5wcm9ncmFtSWQudG9CYXNlNTgoKSk7XG5cbiAgICAgIGNvbnN0IG5JbmRleGVzID0gaXgua2V5cy5sZW5ndGg7XG4gICAgICBjb25zdCBvcGFxdWVEYXRhID0gaXguZGF0YS5sZW5ndGg7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIGFjYyArXG4gICAgICAgIDEgKyAvLyBQSUQgaW5kZXhcbiAgICAgICAgY29tcGFjdEFycmF5U2l6ZShuSW5kZXhlcywgMSkgK1xuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG9wYXF1ZURhdGEsIDEpXG4gICAgICApO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoc2lnbmVycy5zaXplLCA2NCkgKyAvLyBzaWduYXR1cmVzXG4gICAgICAzICsgLy8gaGVhZGVyXG4gICAgICBjb21wYWN0QXJyYXlTaXplKGFjY291bnRzLnNpemUsIDMyKSArIC8vIGFjY291bnRzXG4gICAgICAzMiArIC8vIGJsb2NraGFzaFxuICAgICAgY29tcGFjdEhlYWRlcih0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMubGVuZ3RoKSArIC8vIGluc3RydWN0aW9uc1xuICAgICAgaXhzU2l6ZVxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIG1heCB0cmFuc2FjdGlvbiBzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgaXNPdmVyVHJhbnNhY3Rpb25TaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gY2FsY3VsYXRlVHhTaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllcikgPiBNQVhfVFJBTlNBQ1RJT05fU0laRTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQmF0Y2ggfSBmcm9tICcuL2JhdGNoJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21tb24gfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUGFydGlhbFNpZ24gfSBmcm9tICcuL3BhcnRpYWwtc2lnbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ2FsY3VsYXRlVHhzaXplIH0gZnJvbSAnLi9jYWxjdWxhdGUtdHhzaXplJztcbmltcG9ydCAnfi90eXBlcy9nbG9iYWwnO1xuaW1wb3J0ICd+L2dsb2JhbCc7XG5cbmV4cG9ydCBjb25zdCBUcmFuc2FjdGlvbkJ1aWxkZXIgPSB7XG4gIC4uLkJhdGNoLFxuICAuLi5DYWxjdWxhdGVUeHNpemUsXG4gIC4uLk1pbnQsXG4gIC4uLkNvbW1vbixcbiAgLi4uUGFydGlhbFNpZ24sXG4gIC4uLlByaW9yaXR5RmVlLFxufTtcbiIsICJpbXBvcnQgeyBBbnlPYmplY3QgfSBmcm9tICd+L3R5cGVzL3V0aWxzJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJy4vcmVzdWx0JztcblxuLyoqXG4gKiBjb252ZXJ0IGJ1ZmZlciB0byBBcnJheVxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXJcbiAqIEByZXR1cm5zIG51bWJlcltdXG4gKi9cbmV4cG9ydCBjb25zdCBidWZmZXJUb0FycmF5ID0gKGJ1ZmZlcjogQnVmZmVyKTogbnVtYmVyW10gPT4ge1xuICBjb25zdCBudW1zID0gW107XG4gIGZvciAoY29uc3QgYnl0ZSBvZiBidWZmZXIpIHtcbiAgICBudW1zLnB1c2goYnVmZmVyW2J5dGVdKTtcbiAgfVxuICByZXR1cm4gbnVtcztcbn07XG5cbi8qKlxuICogT3ZlcndyaXRlIEpTIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqZWN0XG4gKiBAcGFyYW0ge092ZXJ3cml0ZU9iamVjdFtdfSB0YXJnZXRzXG4gKiBAcmV0dXJucyBPYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IG92ZXJ3cml0ZU9iamVjdCA9IChcbiAgb2JqZWN0OiB1bmtub3duLFxuICB0YXJnZXRzOiB7XG4gICAgZXhpc3RzS2V5OiBzdHJpbmc7XG4gICAgd2lsbDogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHVua25vd24gfTtcbiAgfVtdLFxuKTogdW5rbm93biA9PiB7XG4gIGNvbnN0IHRoYXQ6IEFueU9iamVjdCA9IG9iamVjdCBhcyBBbnlPYmplY3Q7XG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgZGVsZXRlIHRoYXRbdGFyZ2V0LmV4aXN0c0tleV07XG4gICAgdGhhdFt0YXJnZXQud2lsbC5rZXldID0gdGFyZ2V0LndpbGwudmFsdWU7XG4gIH0pO1xuICByZXR1cm4gdGhhdDtcbn07XG5cbi8qKlxuICogRGlzcGxheSBsb2cgZm9yIHNvbGFuYS1zdWl0ZS1jb25maWcuanNcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGExXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEyXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEzXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGE0XG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z0xvZyA9IChcbiAgZGF0YTE6IHVua25vd24sXG4gIGRhdGEyOiB1bmtub3duID0gJycsXG4gIGRhdGEzOiB1bmtub3duID0gJycsXG4gIGRhdGE0OiB1bmtub3duID0gJycsXG4pOiB2b2lkID0+IHtcbiAgaWYgKENvbnN0YW50cy5pc0RlYnVnZ2luZyA9PT0gJ3RydWUnIHx8IHByb2Nlc3MuZW52LkRFQlVHID09PSAndHJ1ZScpIHtcbiAgICBjb25zb2xlLmxvZygnW0RFQlVHXScsIGRhdGExLCBkYXRhMiwgZGF0YTMsIGRhdGE0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBzbGVlcCB0aW1lclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNcbiAqIEByZXR1cm5zIFByb21pc2U8bnVtYmVyPlxuICovXG5leHBvcnQgY29uc3Qgc2xlZXAgPSBhc3luYyAoc2VjOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgc2VjICogMTAwMCkpO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNOb2RlID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMgIT0gbnVsbCAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPSBudWxsXG4gICk7XG59O1xuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9ialxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmV4cG9ydCBjb25zdCBpc1Byb21pc2UgPSAob2JqOiB1bmtub3duKTogb2JqIGlzIFByb21pc2U8dW5rbm93bj4gPT4ge1xuICByZXR1cm4gKFxuICAgICEhb2JqICYmXG4gICAgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpICYmXG4gICAgdHlwZW9mIChvYmogYXMgYW55KS50aGVuID09PSAnZnVuY3Rpb24nXG4gICk7XG59O1xuXG4vKipcbiAqIFRyeSBhc3luYyBtb25hZFxuICpcbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PFQsIEU+PlxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGFzeW5jYmxvY2s6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBQcm9taXNlPFJlc3VsdDxULCBFPj47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oYmxvY2s6ICgpID0+IFQpOiBSZXN1bHQ8VCwgRT47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGlucHV0OiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUmVzdWx0PFQsIEVycm9yPiB8IFByb21pc2U8UmVzdWx0PFQsIEVycm9yPj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHYgPSBpbnB1dCgpO1xuICAgIGlmIChpc1Byb21pc2UodikpIHtcbiAgICAgIHJldHVybiB2LnRoZW4oXG4gICAgICAgICh4OiBUKSA9PiBSZXN1bHQub2soeCksXG4gICAgICAgIChlcnI6IEUpID0+IFJlc3VsdC5lcnIoZXJyKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXN1bHQub2sodik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZSk7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKGUgYXMgc3RyaW5nKSk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGZpbmFsbHlJbnB1dCkge1xuICAgICAgZGVidWdMb2coJyMgZmluYWxseSBpbnB1dDonLCBmaW5hbGx5SW5wdXQpO1xuICAgICAgZmluYWxseUlucHV0KCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfHVuZGVmaW5lZH0gY3JlYXRlZF9hdFxuICogQHJldHVybnMgRGF0ZSB8IHVuZGVmaW5lZFxuICovXG5leHBvcnQgY29uc3QgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgPSAoXG4gIGNyZWF0ZWRfYXQ6IG51bWJlciB8IHVuZGVmaW5lZCxcbik6IERhdGUgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoY3JlYXRlZF9hdCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShjcmVhdGVkX2F0ICogMTAwMCk7XG4gIH1cbiAgcmV0dXJuO1xufTtcblxuLyoqXG4gKiBHZXQgdW5peCB0aW1lc3RhbXBcbiAqXG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHVuaXhUaW1lc3RhbXAgPSAoKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbn07XG4iLCAiLy8gZm9ya2VkOiBodHRwczovL2dpdGh1Yi5jb20vYmFkcmFwL3Jlc3VsdCwgdGhhbmsgeW91IGFkdmljZSAgQGp2aWlkZVxuaW1wb3J0IHsgVHJhbnNhY3Rpb25TaWduYXR1cmUgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQ29tbW9uU3RydWN0dXJlLFxuICBNaW50U3RydWN0dXJlLFxuICBQYXJ0aWFsU2lnblN0cnVjdHVyZSxcbiAgU3VibWl0T3B0aW9ucyxcbn0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnLi9zaGFyZWQnO1xuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3I+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG5cbiAgdW53cmFwKCk6IFQ7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogVTtcbiAgdW53cmFwPFUsIFY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBWKTogVSB8IFY7XG4gIC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDEwXG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVSk6IFU7XG4gIHVud3JhcChvaz86ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiB1bmtub3duKTogdW5rbm93biB7XG4gICAgY29uc3QgciA9IHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sgPyBvayh2YWx1ZSkgOiB2YWx1ZSksXG4gICAgICAoZXJyb3IpID0+IChlcnIgPyBSZXN1bHQub2soZXJyKGVycm9yKSkgOiBSZXN1bHQuZXJyKGVycm9yKSksXG4gICAgKTtcbiAgICBpZiAoci5pc0Vycikge1xuICAgICAgdGhyb3cgci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHIudmFsdWU7XG4gIH1cblxuICAvLy8vIG1hcCAvLy8vXG4gIG1hcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogUmVzdWx0PFUsIEU+O1xuICBtYXA8VSwgRiBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBVLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBGLFxuICApOiBSZXN1bHQ8VSwgRj47XG4gIG1hcChvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IEVycm9yKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVyciA/IGVycihlcnJvcikgOiBlcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLy8gY2hhaW4gLy8vL1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuICBjaGFpbihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICAgZXJyPzogKGVycm9yOiBFKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICk6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKG9rLCBlcnIgfHwgKChlcnJvcikgPT4gUmVzdWx0LmVycihlcnJvcikpKTtcbiAgfVxuXG4gIC8vLy8gbWF0Y2ggLy8vL1xuICBtYXRjaDxVLCBGPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gRik6IHZvaWQgfCBQcm9taXNlPHZvaWQ+O1xuXG4gIG1hdGNoKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IHVua25vd24sXG4gICk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyKGVycm9yKSBhcyBFcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLyBzaW5nbGUgVHJhbnNhY3Rpb25CdWlsZGVyIC8vLy9cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBhc3luYyBzdWJtaXQoXG4gICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5tYXAoXG4gICAgICBhc3luYyAob2spID0+IHtcbiAgICAgICAgZGVidWdMb2coJyMgcmVzdWx0IHNpbmdsZSBzdWJtaXQ6ICcsIG9rKTtcbiAgICAgICAgY29uc3Qgb2JqID0gb2sgYXNcbiAgICAgICAgICB8IENvbW1vblN0cnVjdHVyZVxuICAgICAgICAgIHwgTWludFN0cnVjdHVyZVxuICAgICAgICAgIHwgUGFydGlhbFNpZ25TdHJ1Y3R1cmU7XG4gICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KG9wdGlvbnMpO1xuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihyZXMuZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnZhbHVlO1xuICB9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgc3VibWl0KFxuICAgICAgb3B0aW9ucz86IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj47XG4gIH1cbn1cblxuLy8gVHJhbnNhY3Rpb25CdWlsZGVyLkJhdGNoXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSkge1xuICBjb25zdCBpbnN0cnVjdGlvbnM6IENvbW1vblN0cnVjdHVyZSB8IE1pbnRTdHJ1Y3R1cmVbXSA9IFtdO1xuICBmb3IgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9IGVsc2UgaWYgKG9iai5pc09rKSB7XG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcignT25seSBBcnJheSBJbnN0cnVjdGlvbiBvYmplY3QnKSk7XG4gICAgfVxuICB9XG4gIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBzdWJtaXQ6ICcsIGluc3RydWN0aW9ucyk7XG4gIGNvbnN0IGJhdGNoT3B0aW9ucyA9IHtcbiAgICBmZWVQYXllcjogb3B0aW9ucy5mZWVQYXllcixcbiAgICBpc1ByaW9yaXR5RmVlOiBvcHRpb25zLmlzUHJpb3JpdHlGZWUsXG4gICAgaW5zdHJ1Y3Rpb25zOiBpbnN0cnVjdGlvbnMsXG4gIH07XG4gIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkJhdGNoKCkuc3VibWl0KGJhdGNoT3B0aW9ucyk7XG4gIC8vIH1cbn07XG5cbmNsYXNzIEludGVybmFsT2s8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IHRydWU7XG4gIHJlYWRvbmx5IGlzRXJyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHZhbHVlOiBUKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIF9lcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBJbnRlcm5hbEVycjxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gZmFsc2U7XG4gIHJlYWRvbmx5IGlzRXJyID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgZXJyb3I6IEUpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIF9vazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVzdWx0IHtcbiAgZXhwb3J0IHR5cGUgT2s8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsT2s8VCwgRT47XG4gIGV4cG9ydCB0eXBlIEVycjxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxFcnI8VCwgRT47XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4odmFsdWU6IFQpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxPayh2YWx1ZSk7XG4gIH1cbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I/OiBFKTogUmVzdWx0PFQsIEU+O1xuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcjogRSk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbEVycihlcnJvciB8fCBFcnJvcigpKTtcbiAgfVxuXG4gIHR5cGUgVSA9IFJlc3VsdDx1bmtub3duPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICAgIFIxNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0LCBSMTVdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgICBPa1R5cGU8UjE1PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICAgIHwgUjE1XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICBSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMSB8IFIxMiB8IFIxM1xuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTJdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjhdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjg+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjddLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjc+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjVdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND4sIE9rVHlwZTxSNT5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQ+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVSwgUjMgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSM10sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+XSwgRXJyVHlwZTxSMCB8IFIxIHwgUjI+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+XSwgRXJyVHlwZTxSMCB8IFIxPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMF0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPl0sIEVyclR5cGU8UjA+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IFtdKTogUmVzdWx0PFtdPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxUIGV4dGVuZHMgVVtdIHwgUmVjb3JkPHN0cmluZywgVT4+KFxuICAgIG9iajogVCxcbiAgKTogUmVzdWx0PFxuICAgIHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgST4gPyBJIDogbmV2ZXIgfSxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPiA/IEUgOiBuZXZlcjtcbiAgICB9W2tleW9mIFRdXG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgY29uc3QgcmVzQXJyID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqKSB7XG4gICAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gYXMgdW5rbm93bjtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZXN1bHQub2socmVzQXJyKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPik7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3QgaXRlbSA9IChvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pW2tleV07XG4gICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICAgIHJlc1trZXldID0gaXRlbS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5vayhyZXMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3IgPSBFcnJvcj4gPVxuICB8IFJlc3VsdC5PazxULCBFPlxuICB8IFJlc3VsdC5FcnI8VCwgRT47XG5cbnR5cGUgT2tUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDxpbmZlciBPPiA/IE8gOiBuZXZlcjtcbnR5cGUgRXJyVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT5cbiAgPyBFXG4gIDogbmV2ZXI7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLGtCQUFzQztBQUN0QyxrQkFBNkI7QUFFdEIsSUFBTSxTQUFTLFlBQUFBO0FBRWYsSUFBVTtBQUFBLENBQVYsQ0FBVUMsZUFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxxQkFBVjtBQUNMLFVBQU0sYUFBYTtBQUNuQixRQUFJLFlBQVk7QUFDVCxJQUFNQSxpQkFBQSxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPNUIsSUFBTUEsaUJBQUEsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWVwQixJQUFNQSxpQkFBQSx1QkFBdUIsTUFBZTtBQUNqRCxZQUFNLGNBQWMsS0FBSyxPQUFPO0FBQ2hDLFlBQU0sY0FBYyxJQUFJO0FBQ3hCLFVBQUksQ0FBQyxhQUFhLGNBQWMsYUFBYTtBQUMzQyxvQkFBWTtBQUNaLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxLQWpDZSxrQkFBQUQsV0FBQSxvQkFBQUEsV0FBQTtBQUFBLEdBREY7QUFBQSxDQXNDVixDQUFVQSxlQUFWO0FBQ0UsRUFBTUEsV0FBQSxpQkFBaUIsT0FBTyxRQUFRO0FBQ3RDLEVBQU1BLFdBQUEsbUJBQW1CLE9BQU8sUUFBUTtBQUN4QyxFQUFNQSxXQUFBLGNBQWMsT0FBTztBQUMzQixFQUFNQSxXQUFBLG1CQUFtQixPQUFPO0FBQ2hDLEVBQU1BLFdBQUEsWUFBWSxPQUFPO0FBRXpCLE1BQUs7QUFBTCxJQUFLRSxhQUFMO0FBQ0wsSUFBQUEsU0FBQSxTQUFNO0FBQ04sSUFBQUEsU0FBQSxpQkFBYztBQUNkLElBQUFBLFNBQUEsU0FBTTtB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VUFBSSxDQUFDLDhDQUE4QyxLQUFLLFVBQVUsR0FBRztBQUNuRSxjQUFNLFlBQVksS0FBSyxRQUFRLGFBQWEsVUFBVTtBQUFBLE1BQ3hEO0FBQ0EsYUFBTyxRQUFRO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQTlNZTtBQWlOVixJQUFNLGlCQUFOLGNBQTZCLE1BQU07QUFBQSxFQUN4QztBQUFBLEVBQ0EsWUFBWSxTQUFpQixTQUFvQjtBQUMvQyxVQUFNLE9BQU87QUFDYixTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUNGOyIsCiAgIm5hbWVzIjogWyJTb2xhbmFKc29uQ29uZmlnIiwgIkNvbnN0YW50cyIsICJXYXJubmluZ01lc3NhZ2UiLCAiQ2x1c3RlciIsICJFbmRQb2ludFVybCIsICJCdW5kbHJVcmwiLCAiRGFzQXBpVXJsIiwgIk5mdHN0b3JhZ2VBcGlLZXkiLCAiY3VzdG9tQ2x1c3RlclVybCIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJOb2RlIiwgIkFjY291bnQiLCAiQXNzb2NpYXRlZCIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiYnMiLCAiT3JpZ2luYWwiLCAiaW1wb3J0X3dlYjMiLCAiQWNjb3VudCIsICJQZGEiLCAiTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lEIiwgIkJOIiwgIkFjY291bnQiLCAiaW1wb3J0X2JzNTgiLCAiQWNjb3VudCIsICJicyIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJEYXNBcGkiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29sbGVjdGlvbk1pbnQiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgImltcG9ydF9tcGxfYnViYmxlZ3VtX2luc3RydWN0aW9uIiwgIkNvbnZlcnRlciIsICJDb21wcmVzc2VkTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlJveWFsdHkiLCAiQ29udmVydGVyIiwgIk5mdCIsICJDb252ZXJ0ZXIiLCAiTWVtbyIsICJDb252ZXJ0ZXIiLCAiTWludCIsICJDb252ZXJ0ZXIiLCAiUmVndWxhck5mdE1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJQcm9wZXJ0aWVzIiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlckNoZWNrZWQiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyIiwgIkNvbnZlcnRlciIsICJEYXNBcGkiLCAiQ29udmVydGVyIiwgIkRhc0FwaSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiUHJpb3JpdHlGZWUiLCAiRGFzQXBpIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZXN1bHQiLCAiVmFsaWRhdG9yIiwgIk1lc3NhZ2UiLCAiQ29udmVydGVyIl0KfQo=