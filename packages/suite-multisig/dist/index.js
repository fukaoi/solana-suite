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
  Multisig: () => Multisig4
});
module.exports = __toCommonJS(src_exports);

// src/create.ts
var import_web311 = require("@solana/web3.js");
var import_buffer_layout = require("@solana/buffer-layout");
var import_spl_token2 = require("@solana/spl-token");

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
  class Keypair6 {
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
      return new Keypair6({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair6({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
  }
  Account5.Keypair = Keypair6;
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
((Result10) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result10.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result10.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result10.ok(resArr);
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
    return Result10.ok(res);
  }
  Result10.all = all;
})(Result || (Result = {}));

// src/create.ts
var Multisig;
((Multisig5) => {
  Multisig5.create = async (m, feePayer, signerPubkeys) => {
    return Try(async () => {
      if (m > signerPubkeys.length) {
        throw Error("signers number less than m number");
      }
      const account = import_web311.Keypair.generate();
      const connection = Node.getConnection();
      const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
        MultisigInstruction.Layout.span
      );
      const inst1 = MultisigInstruction.account(
        account,
        feePayer.toKeypair(),
        balanceNeeded
      );
      const inst2 = MultisigInstruction.multisig(
        m,
        account,
        signerPubkeys.map((pubkey) => pubkey.toPublicKey())
      );
      return new TransactionBuilder7.Common(
        [inst1, inst2],
        [account],
        feePayer.toKeypair(),
        account.publicKey.toString()
      );
    });
  };
})(Multisig || (Multisig = {}));
var MultisigInstruction;
((MultisigInstruction2) => {
  const createLayoutPubKey = (property) => {
    return (0, import_buffer_layout.blob)(32, property);
  };
  MultisigInstruction2.Layout = (0, import_buffer_layout.struct)([
    (0, import_buffer_layout.u8)("m"),
    (0, import_buffer_layout.u8)("n"),
    (0, import_buffer_layout.u8)("is_initialized"),
    createLayoutPubKey("signer1"),
    createLayoutPubKey("signer2"),
    createLayoutPubKey("signer3"),
    createLayoutPubKey("signer4"),
    createLayoutPubKey("signer5"),
    createLayoutPubKey("signer6"),
    createLayoutPubKey("signer7"),
    createLayoutPubKey("signer8"),
    createLayoutPubKey("signer9"),
    createLayoutPubKey("signer10"),
    createLayoutPubKey("signer11")
  ]);
  MultisigInstruction2.account = (newAccount, feePayer, balanceNeeded) => {
    return import_web311.SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: balanceNeeded,
      space: MultisigInstruction2.Layout.span,
      programId: import_spl_token2.TOKEN_PROGRAM_ID
    });
  };
  MultisigInstruction2.multisig = (m, feePayer, signerPubkey) => {
    const keys = [
      {
        pubkey: feePayer.publicKey,
        isSigner: false,
        isWritable: true
      },
      {
        pubkey: import_web311.SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false
      }
    ];
    signerPubkey.forEach(
      (pubkey) => keys.push({
        pubkey,
        isSigner: false,
        isWritable: false
      })
    );
    const dataLayout = (0, import_buffer_layout.struct)([
      (0, import_buffer_layout.u8)("instruction"),
      (0, import_buffer_layout.u8)("m")
    ]);
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 2,
        m
      },
      data
    );
    return new import_web311.TransactionInstruction({
      keys,
      programId: import_spl_token2.TOKEN_PROGRAM_ID,
      data
    });
  };
})(MultisigInstruction || (MultisigInstruction = {}));

// src/get-info.ts
var import_spl_token3 = require("@solana/spl-token");
var import_web312 = require("@solana/web3.js");
var Multisig2;
((Multisig5) => {
  Multisig5.getInfo = async (multisig) => {
    return Try(async () => {
      const info = await Node.getConnection().getAccountInfo(
        multisig.toPublicKey()
      );
      if (info === null) {
        throw Error("Failed to find multisig");
      }
      if (!info.owner.equals(import_spl_token3.TOKEN_PROGRAM_ID)) {
        throw Error("Invalid multisig owner");
      }
      if (info.data.length !== MultisigInstruction.Layout.span) {
        throw Error("Invalid multisig size");
      }
      const data = Buffer.from(info.data);
      const multisigInfo = MultisigInstruction.Layout.decode(data);
      multisigInfo.signer1 = new import_web312.PublicKey(multisigInfo.signer1);
      multisigInfo.signer2 = new import_web312.PublicKey(multisigInfo.signer2);
      multisigInfo.signer3 = new import_web312.PublicKey(multisigInfo.signer3);
      multisigInfo.signer4 = new import_web312.PublicKey(multisigInfo.signer4);
      multisigInfo.signer5 = new import_web312.PublicKey(multisigInfo.signer5);
      multisigInfo.signer6 = new import_web312.PublicKey(multisigInfo.signer6);
      multisigInfo.signer7 = new import_web312.PublicKey(multisigInfo.signer7);
      multisigInfo.signer8 = new import_web312.PublicKey(multisigInfo.signer8);
      multisigInfo.signer9 = new import_web312.PublicKey(multisigInfo.signer9);
      multisigInfo.signer10 = new import_web312.PublicKey(multisigInfo.signer10);
      multisigInfo.signer11 = new import_web312.PublicKey(multisigInfo.signer11);
      return multisigInfo;
    });
  };
})(Multisig2 || (Multisig2 = {}));

// src/is-address.ts
var Multisig3;
((Multisig5) => {
  Multisig5.isAddress = async (multisig) => {
    return Try(async () => {
      const info = await Multisig2.getInfo(multisig);
      if (info.isErr) {
        return false;
      }
      return true;
    });
  };
})(Multisig3 || (Multisig3 = {}));

// src/index.ts
var Multisig4 = { ...Multisig, ...Multisig2, ...Multisig3 };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Multisig
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9jcmVhdGUudHMiLCAiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL2NvbnN0YW50cy50cyIsICIuLi8uLi9nbG9iYWwvc3JjL2luZGV4LnRzIiwgIi4uLy4uL25vZGUvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2Fzc29jaWF0ZWQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMva2V5cGFpci50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9wZGEudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvYmF0Y2gudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvY29tbW9uLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3ByaW9yaXR5LWZlZS50cyIsICIuLi8uLi9kYXMtYXBpL3NyYy9hcGkudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jb2xsZWN0aW9uLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY3JlYXRvcnMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jb21wcmVzc2VkLW5mdC1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3JveWFsdHkudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9uZnQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9tZW1vLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbWludC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3JlZ3VsYXItbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcHJvcGVydGllcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3VzZXMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90b2tlbi1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3RyYW5zZmVyLWNoZWNrZWQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2Rhcy1hcGkvc3JjL2ZpbmQudHMiLCAiLi4vLi4vZGFzLWFwaS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvbWludC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9wYXJ0aWFsLXNpZ24udHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvY2FsY3VsYXRlLXR4c2l6ZS50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi9zdWl0ZS11dGlscy9zcmMvc2hhcmVkLnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9yZXN1bHQudHMiLCAiLi4vc3JjL2dldC1pbmZvLnRzIiwgIi4uL3NyYy9pcy1hZGRyZXNzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBNdWx0aXNpZyBhcyBDcmVhdGUgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBHZXRJbmZvIH0gZnJvbSAnLi9nZXQtaW5mbyc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBJc0FkZHJlc3MgfSBmcm9tICcuL2lzLWFkZHJlc3MnO1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZXhwb3J0IGNvbnN0IE11bHRpc2lnID0geyAuLi5DcmVhdGUsIC4uLkdldEluZm8sIC4uLklzQWRkcmVzcyB9O1xuIiwgImltcG9ydCB7XG4gIEtleXBhaXIsXG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgU1lTVkFSX1JFTlRfUFVCS0VZLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgYmxvYiwgc3RydWN0LCB1OCB9IGZyb20gJ0Bzb2xhbmEvYnVmZmVyLWxheW91dCc7XG5pbXBvcnQgeyBUT0tFTl9QUk9HUkFNX0lEIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICAvKipcbiAgICogQ3JlYXRlIG11bHRpc2lnXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtICAgICAgICAgICAgICAgICAvLyAgbnVtYmVyIG9mIG11bHRpc2lnXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllciAgICAgICAgICAvLyAgbWVtbyBvd25lclxuICAgKiBAcGFyYW0ge1B1YmtleVtdfSBzaWduZXJQdWJrZXlzICAgLy8gIHNpZ25lcnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmU8UHVia2V5PiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IGFzeW5jIChcbiAgICBtOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICBzaWduZXJQdWJrZXlzOiBQdWJrZXlbXSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPFB1YmtleT4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKG0gPiBzaWduZXJQdWJrZXlzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBFcnJvcignc2lnbmVycyBudW1iZXIgbGVzcyB0aGFuIG0gbnVtYmVyJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFjY291bnQgPSBLZXlwYWlyLmdlbmVyYXRlKCk7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCBiYWxhbmNlTmVlZGVkID0gYXdhaXQgY29ubmVjdGlvbi5nZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRpb24oXG4gICAgICAgIE11bHRpc2lnSW5zdHJ1Y3Rpb24uTGF5b3V0LnNwYW4sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0MSA9IE11bHRpc2lnSW5zdHJ1Y3Rpb24uYWNjb3VudChcbiAgICAgICAgYWNjb3VudCxcbiAgICAgICAgZmVlUGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIGJhbGFuY2VOZWVkZWQsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0MiA9IE11bHRpc2lnSW5zdHJ1Y3Rpb24ubXVsdGlzaWcoXG4gICAgICAgIG0sXG4gICAgICAgIGFjY291bnQsXG4gICAgICAgIHNpZ25lclB1YmtleXMubWFwKChwdWJrZXk6IFB1YmtleSkgPT4gcHVia2V5LnRvUHVibGljS2V5KCkpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uPFB1YmtleT4oXG4gICAgICAgIFtpbnN0MSwgaW5zdDJdLFxuICAgICAgICBbYWNjb3VudF0sXG4gICAgICAgIGZlZVBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBhY2NvdW50LnB1YmxpY0tleS50b1N0cmluZygpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBNdWx0aXNpZ0luc3RydWN0aW9uIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBjb25zdCBjcmVhdGVMYXlvdXRQdWJLZXkgPSAocHJvcGVydHk6IHN0cmluZyk6IGFueSA9PiB7XG4gICAgcmV0dXJuIGJsb2IoMzIsIHByb3BlcnR5KTtcbiAgfTtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50ICovXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgTGF5b3V0ID0gc3RydWN0PHtcbiAgICBtOiBudW1iZXI7XG4gICAgbjogbnVtYmVyO1xuICAgIGlzX2luaXRpYWxpemVkOiBudW1iZXI7XG4gICAgc2lnbmVyMTogUHVibGljS2V5O1xuICAgIHNpZ25lcjI6IFB1YmxpY0tleTtcbiAgICBzaWduZXIzOiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNDogUHVibGljS2V5O1xuICAgIHNpZ25lcjU6IFB1YmxpY0tleTtcbiAgICBzaWduZXI2OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNzogUHVibGljS2V5O1xuICAgIHNpZ25lcjg6IFB1YmxpY0tleTtcbiAgICBzaWduZXI5OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyMTA6IFB1YmxpY0tleTtcbiAgICBzaWduZXIxMTogUHVibGljS2V5O1xuICB9PihbXG4gICAgdTgoJ20nKSxcbiAgICB1OCgnbicpLFxuICAgIHU4KCdpc19pbml0aWFsaXplZCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMTAnKSxcbiAgICBjcmVhdGVMYXlvdXRQdWJLZXkoJ3NpZ25lcjExJyksXG4gIF0pO1xuXG4gIGV4cG9ydCBjb25zdCBhY2NvdW50ID0gKFxuICAgIG5ld0FjY291bnQ6IEtleXBhaXIsXG4gICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgYmFsYW5jZU5lZWRlZDogbnVtYmVyLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG5ld0FjY291bnQucHVibGljS2V5LFxuICAgICAgbGFtcG9ydHM6IGJhbGFuY2VOZWVkZWQsXG4gICAgICBzcGFjZTogTGF5b3V0LnNwYW4sXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IG11bHRpc2lnID0gKFxuICAgIG06IG51bWJlcixcbiAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICBzaWduZXJQdWJrZXk6IFB1YmxpY0tleVtdLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAge1xuICAgICAgICBwdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHVia2V5OiBTWVNWQVJfUkVOVF9QVUJLRVksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgc2lnbmVyUHVia2V5LmZvckVhY2goKHB1YmtleSkgPT5cbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIHB1YmtleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBkYXRhTGF5b3V0ID0gc3RydWN0PHsgaW5zdHJ1Y3Rpb246IG51bWJlcjsgbTogbnVtYmVyIH0+KFtcbiAgICAgIHU4KCdpbnN0cnVjdGlvbicpLFxuICAgICAgdTgoJ20nKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuYWxsb2MoZGF0YUxheW91dC5zcGFuKTtcblxuICAgIGRhdGFMYXlvdXQuZW5jb2RlKFxuICAgICAge1xuICAgICAgICBpbnN0cnVjdGlvbjogMixcbiAgICAgICAgbSxcbiAgICAgIH0sXG4gICAgICBkYXRhLFxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAga2V5cyxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBTb2xhbmFKc29uQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnO1xuXG5leHBvcnQgY29uc3QgQ29uZmlnID0gU29sYW5hSnNvbkNvbmZpZztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgbmFtZXNwYWNlIFdhcm5uaW5nTWVzc2FnZSB7XG4gICAgY29uc3QgVEhSRVNISE9MRCA9IDUwO1xuICAgIGxldCBpc0Rpc3BsYXkgPSBmYWxzZTtcbiAgICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZUFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBDYW4gZ2V0IGFwaSBrZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgO1xuICAgIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgZGFzQXBpVXJsIGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpIHVybCBmcm9tIGh0dHBzOi8vd3d3LmhlbGl1cy5kZXYvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuICAgICAgICBgO1xuICAgIC8vIGV4cG9ydCBjb25zdCBBTk5PVU5DRSA9IGBcbiAgICAvLyAgICAgW0RFUFJFQ0FURURdXG4gICAgLy8gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gICAgIEFjY291bnQsIE5vZGUsIHRvRXhwbG9yZXIsIFB1YmtleSwgU2VjcmV0IGhhdmUgYmVlbiBtb3ZlZCB0b1xuICAgIC8vICAgICBAc29sYW5hLXN1aXRlL3V0aWxzXG4gICAgLy8gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAgICAgYDtcblxuICAgIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVQcm9iYWJpbGl0eSA9ICgpOiBib29sZWFuID0+IHtcbiAgICAgIGNvbnN0IHJhbmRvbVZhbHVlID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIGNvbnN0IHByb2JhYmlsaXR5ID0gMSAvIFRIUkVTSEhPTEQ7XG4gICAgICBpZiAoIWlzRGlzcGxheSAmJiByYW5kb21WYWx1ZSA8IHByb2JhYmlsaXR5KSB7XG4gICAgICAgIGlzRGlzcGxheSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgY29uc3QgY3VycmVudENsdXN0ZXIgPSBDb25maWcuY2x1c3Rlci50eXBlO1xuICBleHBvcnQgY29uc3QgY3VzdG9tQ2x1c3RlclVybCA9IENvbmZpZy5jbHVzdGVyLmN1c3RvbUNsdXN0ZXJVcmw7XG4gIGV4cG9ydCBjb25zdCBpc0RlYnVnZ2luZyA9IENvbmZpZy5kZWJ1Z2dpbmc7XG4gIGV4cG9ydCBjb25zdCBuZnRTdG9yYWdlQXBpS2V5ID0gQ29uZmlnLm5mdFN0b3JhZ2VBcGlLZXk7XG4gIGV4cG9ydCBjb25zdCBkYXNBcGlVcmwgPSBDb25maWcuZGFzQXBpVXJsO1xuXG4gIGV4cG9ydCBlbnVtIENsdXN0ZXIge1xuICAgIHByZCA9ICdtYWlubmV0LWJldGEnLFxuICAgIHByZE1ldGFwbGV4ID0gJ21haW5uZXQtYmV0YS1tZXRhcGxleCcsXG4gICAgZGV2ID0gJ2Rldm5ldCcsXG4gICAgbG9jYWxob3N0ID0gJ2xvY2FsaG9zdC1kZXZuZXQnLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRW5kUG9pbnRVcmwge1xuICAgIHByZCA9ICdodHRwczovL2FwaS5tYWlubmV0LWJldGEuc29sYW5hLmNvbScsXG4gICAgcHJkTWV0YXBsZXggPSAnaHR0cHM6Ly9hcGkubWV0YXBsZXguc29sYW5hLmNvbScsXG4gICAgZGV2ID0gJ2h0dHBzOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgICBsb2NhbGhvc3QgPSAnaHR0cDovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gIH1cblxuICBleHBvcnQgZW51bSBCdW5kbHJVcmwge1xuICAgIHByZCA9ICdodHRwczovL25vZGUxLmlyeXMueHl6LGh0dHBzOi8vbm9kZTIuaXJ5cy54eXonLFxuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5pcnlzLnh5eicsXG4gIH1cblxuICBleHBvcnQgZW51bSBEYXNBcGlVcmwge1xuICAgIHByZCA9ICdodHRwczovL21haW5uZXQuaGVsaXVzLXJwYy5jb20vP2FwaS1rZXk9MTUzMTliZjQtNWI0MC00OTU4LWFjOGQtNjMxM2FhNTVlYjkyJyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaGVsaXVzLXJwYy5jb20vP2FwaS1rZXk9MTUzMTliZjQtNWI0MC00OTU4LWFjOGQtNjMxM2FhNTVlYjkyLGh0dHBzOi8vcnBjLWRldm5ldC5oZWxpdXMueHl6P2FwaS1rZXk9OWY3MGE4NDMtMzI3NC00ZmZkLWEwYTktMzIzZjhiN2MwNjM5JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIE5mdHN0b3JhZ2VBcGlLZXkge1xuICAgIHByZCA9ICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUprYVdRNlpYUm9jam93ZUVSR01qY3lOMlZrT0RaaFJHVTFSVE15WkRaRFpFSmxPRGMwWXpSRk5EbEVPRFkxT1dabU9FTWlMQ0pwYzNNaU9pSnVablF0YzNSdmNtRm5aU0lzSW1saGRDSTZNVFl5TURJMk5EazBNemN3Tml3aWJtRnRaU0k2SW1SbGJXOGlmUS5kNEo3MG1pa3hSQjhhNXZ3TnU2U081SERBOEphdWV1c2VBajdRX3l0TUNFJyxcbiAgICBkZXYgPSBwcmQsXG4gIH1cblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQ2x1c3RlciA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB7IGNsdXN0ZXI6IGVudiwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG5cbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIHVybCwgbW9zdCBwcmlvcml0eVxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsICYmIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGg7XG4gICAgICByZXR1cm4gY3VzdG9tQ2x1c3RlclVybFtpbmRleF07XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXg6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkTWV0YXBsZXg7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLmRldjpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5kZXY7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmxvY2FsaG9zdDtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaEJ1bmRsciA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOiB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuQnVuZGxyVXJsLnByZC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkJ1bmRsclVybC5kZXY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hEYXNBcGkgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBpZiAoZGFzQXBpVXJsLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkRBU19BUElfVVJMKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBkYXNBcGlVcmwubGVuZ3RoO1xuICAgICAgICByZXR1cm4gZGFzQXBpVXJsW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5EYXNBcGlVcmwuZGV2LnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hOZnRTdG9yYWdlID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIGlmICghbmZ0U3RvcmFnZUFwaUtleSkge1xuICAgICAgICAgIHRocm93IEVycm9yKFdhcm5uaW5nTWVzc2FnZS5ORlRfU1RPUkFHRV9BUElfS0VZKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmZ0U3RvcmFnZUFwaUtleTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5OZnRzdG9yYWdlQXBpS2V5LmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IFdSQVBQRURfVE9LRU5fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ1NvMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTInLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVNT19QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnTWVtbzFVaGtKUmZIeXZMTWNWdWNKd3hYZXVENzI4RXFWRER3UUR4Rk1ObycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRVRBUExFWF9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnbWV0YXFieHhVZXJkcTI4Y2oxUmJBV2tZUW0zeWJ6amI2YThidDUxOHgxcycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBDT01NSVRNRU5UOiBDb21taXRtZW50ID0gJ2NvbmZpcm1lZCc7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9HQVRFV0FZX1VSTCA9ICdodHRwczovL2lwZnMuaW8vaXBmcyc7XG4gIGV4cG9ydCBjb25zdCBJUllTX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vZ2F0ZXdheS5pcnlzLnh5eic7XG4gIGV4cG9ydCBjb25zdCBCVU5ETFJfTkVUV09SS19VUkwgPSBzd2l0Y2hCdW5kbHIoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IHN3aXRjaERhc0FwaShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPSBzd2l0Y2hOZnRTdG9yYWdlKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MU0NBTl9VUkwgPSAnaHR0cHM6Ly9zb2xzY2FuLmlvJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTEFOQUZNX1VSTCA9ICdodHRwczovL3NvbGFuYS5mbSc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9YUkFZX1VSTCA9ICdodHRwczovL3hyYXkuaGVsaXVzLnh5eic7XG59XG5cbi8vIERpc3BsYXkgQWxsIEFubm91bmNlXG4vLyBjb25zb2xlLmxvZyhDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkFOTk9VTkNFKTtcbiIsICJpbXBvcnQgeyBLZXlwYWlyLCBMQU1QT1JUU19QRVJfU09MLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBDb25maWcsIENvbnN0YW50cywgZGVidWdMb2cgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgQmlnTnVtYmVyIH0gZnJvbSAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCB7IEV4cGxvcmVyLCBFeHBsb3Jlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbi8qKlxuICogQ3JlYXRlIGV4cGxvcmVyIHVybCBmb3IgYWNjb3VudCBhZGRyZXNzIG9yIHNpZ25hdHVyZVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5TdHJpbmcucHJvdG90eXBlLnRvRXhwbG9yZXJVcmwgPSBmdW5jdGlvbihcbiAgZXhwbG9yZXI6IEV4cGxvcmVyID0gRXhwbG9yZXIuU29sc2NhbixcbiAgb3B0aW9uczogUGFydGlhbDxFeHBsb3Jlck9wdGlvbnM+ID0ge30sXG4pIHtcbiAgbGV0IGNsdXN0ZXIgPSBDb25maWcuY2x1c3Rlci50eXBlO1xuICBkZWJ1Z0xvZygnIyBjbHVzdGVyVHlwZTonLCBjbHVzdGVyKTtcbiAgaWYgKGNsdXN0ZXIgIT09IENvbnN0YW50cy5DbHVzdGVyLnByZCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH1cblxuICBjb25zdCBhZGRyZXNzT3JTaWduYXR1cmU6IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgbGV0IHVybCA9ICcnO1xuXG4gIGlmIChvcHRpb25zLnJlcGxhY2VQYXRoKSB7XG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGlmIChBY2NvdW50LktleXBhaXIuaXNQdWJrZXkoYWRkcmVzc09yU2lnbmF0dXJlKSkge1xuICAgIC8vIGFkZHJlc3NcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS9hZGRyZXNzLyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBzaWduYXR1cmVcbiAgICAvLyBmb3IgSW52YWxpZCB0eXBlIFwibmV2ZXJcIiBvZiBhZGRyZXNzT3JTaWduYXR1cmUsIHNvIGBhcyBzdHJpbmdgXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vdHgvJHthZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L3R4LyR7YWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgICB9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vdHgvJHthZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogUHViS2V5KEBzb2xhbmEtc3VpdGUpIHRvIFB1YmxpY0tleShAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHVibGljS2V5XG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9QdWJsaWNLZXkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNQdWJrZXkodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlB1YktleTogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy50b1N0cmluZygpKTtcbn07XG5cbi8qKlxuICogU2VjcmV0KEBzb2xhbmEtc3VpdGUpIHRvIEtleXBhaXIoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIEtleXBhaXJcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0tleXBhaXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNTZWNyZXQodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlNlY3JldDogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xufTtcblxuLyoqXG4gKiBMQU1QT1JUUyB0byBTT0xcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b1NvbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC5kaXYoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG5cbi8qKlxuICogU09MIHRvIExBTVBPUlRTXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9MYW1wb3J0cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC50aW1lcyhMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbW1pdG1lbnQsIENvbm5lY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5vZGUge1xuICBjb25zdCBzZXR0ZWQgPSB7XG4gICAgY2x1c3RlclVybDogJycsXG4gICAgY29tbWl0bWVudDogQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICAgY3VzdG9tQ2x1c3RlclVybDogW10gYXMgc3RyaW5nW10sXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldENvbm5lY3Rpb24gPSAoKTogQ29ubmVjdGlvbiA9PiB7XG4gICAgaWYgKHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyIGJ5IGpzb24gY29uZmlnXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFzZXR0ZWQuY2x1c3RlclVybCkge1xuICAgICAgLy8gZGVmYXVsdCBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFzZXR0ZWQuY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IENvbW1pdG1lbnQ7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFjY291bnQsXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBUT0tFTl9QUk9HUkFNX0lELFxuICBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yLFxuICBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcixcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG4vKipcbiAqIEdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICpcbiAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICogQHBhcmFtIHtib29sZWFufSBhbGxvd093bmVyT2ZmQ3VydmVcbiAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nIHwgSW5zdHJ1Y3Rpb24+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQXNzb2NpYXRlZCB7XG4gICAgLyoqXG4gICAgICogW01haW4gbG9naWNdR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAgICAgKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgICAqXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gZmVlUGF5ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICAgKi9cbiAgICBleHBvcnQgY29uc3QgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI/OiBQdWJrZXksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgICApOiBQcm9taXNlPHtcbiAgICAgIHRva2VuQWNjb3VudDogc3RyaW5nO1xuICAgICAgaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICB9PiA9PiB7XG4gICAgICBjb25zdCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYWxsb3dPd25lck9mZkN1cnZlLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBEb250IHVzZSBSZXN1bHRcbiAgICAgICAgYXdhaXQgZ2V0QWNjb3VudChcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLmNvbW1pdG1lbnQsXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IpICYmXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBlcnJvcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5ZXIgPSAhZmVlUGF5ZXIgPyBvd25lciA6IGZlZVBheWVyO1xuXG4gICAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgcGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgS2V5cGFpciBhcyBPcmlnaW5hbCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IGNsYXNzIEtleXBhaXIge1xuICAgIHNlY3JldDogU2VjcmV0O1xuICAgIHB1YmtleTogUHVia2V5O1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiB7IHB1YmtleT86IFB1YmtleTsgc2VjcmV0OiBTZWNyZXQgfSkge1xuICAgICAgaWYgKCFwYXJhbXMucHVia2V5KSB7XG4gICAgICAgIGNvbnN0IGtleXBhaXIgPSBwYXJhbXMuc2VjcmV0LnRvS2V5cGFpcigpO1xuICAgICAgICB0aGlzLnB1YmtleSA9IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB1YmtleSA9IHBhcmFtcy5wdWJrZXk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlY3JldCA9IHBhcmFtcy5zZWNyZXQ7XG4gICAgfVxuXG4gICAgdG9QdWJsaWNLZXkoKTogUHVibGljS2V5IHtcbiAgICAgIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMucHVia2V5KTtcbiAgICB9XG5cbiAgICB0b0tleXBhaXIoKTogT3JpZ2luYWwge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnNlY3JldCk7XG4gICAgICByZXR1cm4gT3JpZ2luYWwuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNQdWJrZXkgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFB1YmtleSA9PlxuICAgICAgL15bMC05YS16QS1aXXszMiw0NH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBpc1NlY3JldCA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgU2VjcmV0ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezg3LDg4fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGNyZWF0ZSA9ICgpOiBLZXlwYWlyID0+IHtcbiAgICAgIGNvbnN0IGtleXBhaXIgPSBPcmlnaW5hbC5nZW5lcmF0ZSgpO1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgdG9LZXlQYWlyID0gKGtleXBhaXI6IE9yaWdpbmFsKTogS2V5cGFpciA9PiB7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBQUk9HUkFNX0FERFJFU1MgYXMgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lEIH0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5pbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIFBkYSB7XG4gICAgZXhwb3J0IGNvbnN0IGdldE1ldGFkYXRhID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRNYXN0ZXJFZGl0aW9uID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdlZGl0aW9uJyksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldFRyZWVBdXRob3JpdHkgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFthZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRCZ3VtU2lnbmVyID0gKCk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbQnVmZmVyLmZyb20oJ2NvbGxlY3Rpb25fY3BpJywgJ3V0ZjgnKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRBc3NldElkID0gKGFkZHJlc3M6IFB1YmtleSwgbGVhZkluZGV4OiBudW1iZXIpOiBQdWJrZXkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IG5ldyBCTi5CTihsZWFmSW5kZXgpO1xuICAgICAgY29uc3QgW2Fzc2V0SWRdID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnYXNzZXQnLCAndXRmOCcpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICAgIFVpbnQ4QXJyYXkuZnJvbShub2RlLnRvQXJyYXkoJ2xlJywgOCkpLFxuICAgICAgICBdLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gYXNzZXRJZC50b1N0cmluZygpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBY2NvdW50IGFzIEFhc3NvY2lhdGVkIH0gZnJvbSAnLi9hc3NvY2lhdGVkJztcbmltcG9ydCB7IEFjY291bnQgYXMgS2V5cGFpciB9IGZyb20gJy4va2V5cGFpcic7XG5pbXBvcnQgeyBBY2NvdW50IGFzIFBkYSB9IGZyb20gJy4vcGRhJztcbmltcG9ydCAnfi90eXBlcy9nbG9iYWwnO1xuLy8gaW1wb3J0ICd+L2dsb2JhbCc7XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50ID0ge1xuICAuLi5BYXNzb2NpYXRlZCxcbiAgLi4uS2V5cGFpcixcbiAgLi4uUGRhLFxufTtcbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcbmltcG9ydCB7IEJhdGNoU3VibWl0T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIEJhdGNoIHtcbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBvcHRpb25zOiBQYXJ0aWFsPEJhdGNoU3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc3RydWN0aW9ucykge1xuICAgICAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgb3B0aW9ucy5pbnN0cnVjdGlvbnMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb21tb25Pck1pbnRJbnN0ID0gb3B0aW9ucy5pbnN0cnVjdGlvbnM7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBpbnN0IG9mIGNvbW1vbk9yTWludEluc3QpIHtcbiAgICAgICAgICBpZiAoIWluc3QuaW5zdHJ1Y3Rpb25zICYmICFpbnN0LnNpZ25lcnMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBgb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIGJhdGNoU3VibWl0KCkuXG4gICAgICAgICAgICBJbmRleDogJHtpfSwgU2V0IHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KGluc3QpfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBjb21tb25Pck1pbnRJbnN0LmZsYXRNYXAoXG4gICAgICAgICAgKGluc3QpID0+IGluc3QuaW5zdHJ1Y3Rpb25zLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzaWduZXJzID0gY29tbW9uT3JNaW50SW5zdC5mbGF0TWFwKChpbnN0KSA9PiBpbnN0LnNpZ25lcnMpO1xuICAgICAgICBjb25zdCBmZWVQYXllcnMgPSBjb21tb25Pck1pbnRJbnN0LmZpbHRlcihcbiAgICAgICAgICAoaW5zdCkgPT4gaW5zdC5mZWVQYXllciAhPT0gdW5kZWZpbmVkLFxuICAgICAgICApO1xuICAgICAgICBsZXQgZmVlUGF5ZXIgPSBzaWduZXJzWzBdO1xuICAgICAgICBpZiAoZmVlUGF5ZXJzLmxlbmd0aCA+IDAgJiYgZmVlUGF5ZXJzWzBdLmZlZVBheWVyKSB7XG4gICAgICAgICAgZmVlUGF5ZXIgPSBmZWVQYXllcnNbMF0uZmVlUGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gc2lnbmVycztcbiAgICAgICAgaWYgKGZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSBmZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW2ZlZVBheWVyLCAuLi5zaWduZXJzXTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbnMubWFwKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZVR4c2l6ZS5pc01heFRyYW5zYWN0aW9uU2l6ZSh0cmFuc2FjdGlvbiwgZmVlUGF5ZXIucHVibGljS2V5KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5pc1ByaW9yaXR5RmVlKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IFByaW9yaXR5RmVlLlByaW9yaXR5RmVlLnN1Ym1pdChcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlLCBTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcblxuZXhwb3J0IGNvbnN0IE1BWF9SRVRSSUVTID0gMztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQ29tbW9uPFQgPSB1bmRlZmluZWQ+IGltcGxlbWVudHMgQ29tbW9uU3RydWN0dXJlPFQ+IHtcbiAgICBzdGF0aWMgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyPzogS2V5cGFpcjtcbiAgICBkYXRhPzogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgICBkYXRhPzogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tbW9uKSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBQcmlvcml0eUZlZS5Qcmlvcml0eUZlZS5zdWJtaXQoXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbXB1dGVCdWRnZXRQcm9ncmFtLFxuICBDb25maXJtT3B0aW9ucyxcbiAgS2V5cGFpcixcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgRGFzQXBpIH0gZnJvbSAnfi9kYXMtYXBpJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByaW9yaXR5RmVlIHtcbiAgICBjb25zdCBNSU5JTVVNX1BSSU9SSVRZX0ZFRSA9IDMwMDtcbiAgICBleHBvcnQgY29uc3Qgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgYWRkU29sUHJpb3JpdHlGZWU/OiBudW1iZXIsXG4gICAgKSA9PiB7XG4gICAgICBsZXQgYWRkTGFtcG9ydHMgPSAwO1xuICAgICAgaWYgKGFkZFNvbFByaW9yaXR5RmVlKSB7XG4gICAgICAgIGFkZExhbXBvcnRzID0gYWRkU29sUHJpb3JpdHlGZWUudG9MYW1wb3J0cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXN0aW1hdGVzID0gYXdhaXQgRGFzQXBpLmdldFByaW9yaXR5RmVlRXN0aW1hdGUodHJhbnNhY3Rpb24pO1xuICAgICAgICBkZWJ1Z0xvZygnIyBlc3RpbWF0ZXM6ICcsIGVzdGltYXRlcyk7XG4gICAgICAgIGFkZExhbXBvcnRzID1cbiAgICAgICAgICBlc3RpbWF0ZXMuaXNPayAmJiBlc3RpbWF0ZXMudW53cmFwKCkubWVkaXVtICE9PSAwXG4gICAgICAgICAgICA/IGVzdGltYXRlcy51bndyYXAoKS5tZWRpdW1cbiAgICAgICAgICAgIDogTUlOSU1VTV9QUklPUklUWV9GRUU7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZygnIyBsYW1wb3J0czogJywgYWRkTGFtcG9ydHMpO1xuICAgICAgcmV0dXJuIGF3YWl0IHNlbmRUcmFuc2FjdGlvbldpdGhQcmlvcml0eUZlZShcbiAgICAgICAgYWRkTGFtcG9ydHMsXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBzaWduZXJzLFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGNyZWF0ZVByaW9yaXR5RmVlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBlc3RpbWF0ZXMgPSBhd2FpdCBEYXNBcGkuZ2V0UHJpb3JpdHlGZWVFc3RpbWF0ZSh0cmFuc2FjdGlvbik7XG4gICAgICBkZWJ1Z0xvZygnIyBlc3RpbWF0ZXM6ICcsIGVzdGltYXRlcyk7XG4gICAgICAvLyBwcmlvcml0eSBmZWU6IG1lZGl1bVxuICAgICAgY29uc3QgbGFtcG9ydHMgPSBlc3RpbWF0ZXMuaXNPa1xuICAgICAgICA/IGVzdGltYXRlcy51bndyYXAoKS5tZWRpdW1cbiAgICAgICAgOiBNSU5JTVVNX1BSSU9SSVRZX0ZFRTtcbiAgICAgIHJldHVybiBDb21wdXRlQnVkZ2V0UHJvZ3JhbS5zZXRDb21wdXRlVW5pdFByaWNlKHtcbiAgICAgICAgbWljcm9MYW1wb3J0czogbGFtcG9ydHMsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2VuZFRyYW5zYWN0aW9uV2l0aFByaW9yaXR5RmVlID0gYXN5bmMgKFxuICAgICAgbGFtcG9ydHM6IG51bWJlcixcbiAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgIGZpbmFsU2lnbmVyczogS2V5cGFpcltdLFxuICAgICkgPT4ge1xuICAgICAgY29uc3QgY29tcHV0ZVByaWNlSW5zdCA9IENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0UHJpY2Uoe1xuICAgICAgICBtaWNyb0xhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgIH07XG4gICAgICB0cmFuc2FjdGlvbi5hZGQoY29tcHV0ZVByaWNlSW5zdCk7XG4gICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFzc2V0LCBBc3NldFByb29mLCBBc3NldHMsIFByaW9yaXR5RmVlTGV2ZWxzIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbmltcG9ydCB7IFNvcnRhYmxlIH0gZnJvbSAnfi90eXBlcy9maW5kJztcblxuZXhwb3J0IG5hbWVzcGFjZSBEYXNBcGkge1xuICBsZXQgZGFzVXJpOiBzdHJpbmc7XG4gIGNvbnN0IGNvbm5lY3QgPSBhc3luYyAoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgcGFyYW1zOiAoXG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBQdWJrZXlcbiAgICAgIHwgU29ydGFibGVcbiAgICAgIHwgbnVtYmVyXG4gICAgICB8IHVuZGVmaW5lZFxuICAgICAgfCBQdWJrZXlbXVxuICAgICAgfCBUcmFuc2FjdGlvblxuICAgICAgfCB7XG4gICAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICAgICAgfVxuICAgIClbXSxcbiAgKSA9PiB7XG4gICAgQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5jYWxjdWxhdGVQcm9iYWJpbGl0eSgpICYmXG4gICAgICBjb25zb2xlLndhcm4oQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5EQVNfQVBJX1VSTCk7XG4gICAgZGFzVXJpID0gZGFzVXJpID8gZGFzVXJpIDogQ29uc3RhbnRzLkRBU19BUElfVVJMO1xuICAgIGRlYnVnTG9nKCcjIGRhc1VyaTogJywgZGFzVXJpKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGRhc1VyaSwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAganNvbnJwYzogJzIuMCcsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaWQ6ICdkYXMtYXBpJyxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICBjb25zdCBlcnIgPSAoYXdhaXQgcmVzcG9uc2UuanNvbigpKS5lcnJvci5tZXNzYWdlO1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoZXJyKSk7XG4gICAgfVxuICAgIHJldHVybiAoYXdhaXQgcmVzcG9uc2UuanNvbigpKS5yZXN1bHQ7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNoYW5nZURhc1VyaSA9ICh1cmw6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgIGRhc1VyaSA9IHVybDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRQcm9vZiA9IGFzeW5jIChcbiAgICBhc3NldElkOiBzdHJpbmcsXG4gICk6IFByb21pc2U8UmVzdWx0PEFzc2V0UHJvb2YsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0UHJvb2YnLCBbYXNzZXRJZF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldCA9IGFzeW5jIChcbiAgICBhc3NldElkOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PEFzc2V0LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldCcsIFthc3NldElkXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0c0J5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXJBZGRyZXNzOiBQdWJrZXksXG4gICAgbGltaXQ6IG51bWJlciA9IDEwMDAsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBzb3J0Qnk/OiBTb3J0YWJsZSxcbiAgICBiZWZvcmU/OiBzdHJpbmcsXG4gICAgYWZ0ZXI/OiBzdHJpbmcsXG4gICk6IFByb21pc2U8UmVzdWx0PEFzc2V0cywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXRzQnlPd25lcicsIFtcbiAgICAgICAgb3duZXJBZGRyZXNzLFxuICAgICAgICBzb3J0QnksXG4gICAgICAgIGxpbWl0LFxuICAgICAgICBwYWdlLFxuICAgICAgICBiZWZvcmUsXG4gICAgICAgIGFmdGVyLFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0c0J5R3JvdXAgPSBhc3luYyAoXG4gICAgZ3JvdXBLZXk6IHN0cmluZyxcbiAgICBncm91cFZhbHVlOiBQdWJrZXksXG4gICAgbGltaXQ6IG51bWJlciA9IDEwMDAsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBzb3J0Qnk/OiBTb3J0YWJsZSxcbiAgICBiZWZvcmU/OiBzdHJpbmcsXG4gICAgYWZ0ZXI/OiBzdHJpbmcsXG4gICk6IFByb21pc2U8UmVzdWx0PEFzc2V0cywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXRzQnlHcm91cCcsIFtcbiAgICAgICAgZ3JvdXBLZXksXG4gICAgICAgIGdyb3VwVmFsdWUsXG4gICAgICAgIHNvcnRCeSxcbiAgICAgICAgbGltaXQsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGJlZm9yZSxcbiAgICAgICAgYWZ0ZXIsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0UHJpb3JpdHlGZWVFc3RpbWF0ZSA9IGFzeW5jIChcbiAgICBhY2NvdW50T3JUcmFuc2FjdGlvbjogUHVia2V5W10gfCBUcmFuc2FjdGlvbixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UHJpb3JpdHlGZWVMZXZlbHMsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgaW5jbHVkZUFsbFByaW9yaXR5RmVlTGV2ZWxzOiB0cnVlIH07XG4gICAgICByZXR1cm4gKFxuICAgICAgICBhd2FpdCBjb25uZWN0KCdnZXRQcmlvcml0eUZlZUVzdGltYXRlJywgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGFjY291bnRPclRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICB9LFxuICAgICAgICBdKVxuICAgICAgKS5wcmlvcml0eUZlZUxldmVscztcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBJbnRlcm5hbENvbGxlY3Rpb24gfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBHcm91cGluZyB9IGZyb20gJ34vdHlwZXMvZGFzLWFwaSc7XG5pbXBvcnQge1xuICBDb2xsZWN0aW9uIGFzIENvbGxlY3Rpb25UeXBlLFxuICBJbnB1dENvbGxlY3Rpb24sXG4gIE9wdGlvbixcbn0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENvbGxlY3Rpb24+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+ID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogaW5wdXQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPixcbiAgICApOiBDb2xsZWN0aW9uVHlwZSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiBvdXRwdXQua2V5LnRvU3RyaW5nKCksXG4gICAgICAgIHZlcmlmaWVkOiBvdXRwdXQudmVyaWZpZWQsXG4gICAgICB9O1xuICAgIH07XG4gIH1cblxuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb25NaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBHcm91cGluZ1tdKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IG91dHB1dC5maW5kKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUuZ3JvdXBfa2V5ID09PSAnY29sbGVjdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUuZ3JvdXBfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcyA/IHJlcy5ncm91cF92YWx1ZSA6ICcnO1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IENyZWF0b3JzLCBJbnB1dENyZWF0b3JzLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IEludGVybmFsQ3JlYXRvcnMgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDcmVhdG9ycyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDcmVhdG9yc1tdPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b0NvbXByZXNzZWROZnRJbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDcmVhdG9yc1tdPiB8IHVuZGVmaW5lZCxcbiAgICApOiBJbnRlcm5hbENyZWF0b3JzW10gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQhLm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+LFxuICAgICk6IENyZWF0b3JzW10gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9TdHJpbmcoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZGF0YS52ZXJpZmllZCxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7XG4gIE1ldGFkYXRhQXJncyxcbiAgVG9rZW5Qcm9ncmFtVmVyc2lvbixcbiAgVG9rZW5TdGFuZGFyZCxcbn0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBNZXRhZGF0YUFyZ3MgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvQ29tcHJlc3NlZE5mdEluZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBmYWxzZSxcbiAgICAgICAgaXNNdXRhYmxlOiBpbnB1dC5pc011dGFibGUgPz8gZmFsc2UsXG4gICAgICAgIGVkaXRpb25Ob25jZTogMCxcbiAgICAgICAgdG9rZW5TdGFuZGFyZDogVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgICAgdG9rZW5Qcm9ncmFtVmVyc2lvbjogVG9rZW5Qcm9ncmFtVmVyc2lvbi5PcmlnaW5hbCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSb3lhbHR5IHtcbiAgICBleHBvcnQgY29uc3QgVEhSRVNIT0xEID0gMTAwO1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJveWFsdHkgfSBmcm9tICcuL3JveWFsdHknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFzc2V0QW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTmZ0IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBBc3NldEFuZE9mZmNoYWluKTogTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4uaWQudG9TdHJpbmcoKSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IENvbGxlY3Rpb24uQ29sbGVjdGlvbk1pbnQuaW50b1VzZXIoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uZ3JvdXBpbmcsXG4gICAgICAgICkgYXMgUHVia2V5LFxuICAgICAgICBhdXRob3JpdGllczogb3V0cHV0Lm9uY2hhaW4uYXV0aG9yaXRpZXMsXG4gICAgICAgIHJveWFsdHk6IFJveWFsdHkuUm95YWx0eS5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5yb3lhbHR5LnBlcmNlbnQpLFxuICAgICAgICBuYW1lOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLm5hbWUsXG4gICAgICAgIHN5bWJvbDogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5tZXRhZGF0YS5zeW1ib2wsXG4gICAgICAgIHVyaTogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmNyZWF0b3JzKSEsXG4gICAgICAgIHRyZWVBZGRyZXNzOiBvdXRwdXQub25jaGFpbi5jb21wcmVzc2lvbi50cmVlLFxuICAgICAgICBpc0NvbXByZXNzZWQ6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLmNvbXByZXNzZWQsXG4gICAgICAgIGlzTXV0YWJsZTogb3V0cHV0Lm9uY2hhaW4ubXV0YWJsZSxcbiAgICAgICAgaXNCdXJuOiBvdXRwdXQub25jaGFpbi5idXJudCxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5zdXBwbHkuZWRpdGlvbl9ub25jZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucm95YWx0eS5wcmltYXJ5X3NhbGVfaGFwcGVuZWQsXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCkhLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBNZW1vLCBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNZW1vLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG91dHB1dFRyYW5zZmVyPzogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgICBpZiAob3V0cHV0VHJhbnNmZXIgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSAhPT0gJycpIHtcbiAgICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSA9PT0gJ3NwbC10b2tlbicpIHtcbiAgICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBoaXN0b3J5Lm1lbW8gPSBvdXRwdXQucGFyc2VkO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTWludFRvIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogTWludFRvLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm1pbnRBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludEF1dGhvcml0eTtcbiAgICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgICBoaXN0b3J5LmFjY291bnQgPSBvdXRwdXQucGFyc2VkLmluZm8uYWNjb3VudCBhcyBzdHJpbmc7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG92ZXJ3cml0ZU9iamVjdCwgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHt9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgRmlsZVR5cGUsIFByb3BlcnRpZXMsIFN0b3JhZ2VUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSBhc3luYyAoXG4gICAgICBpbnB1dDogUHJvcGVydGllcyB8IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrRnVuYzogKFxuICAgICAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgICApID0+IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PixcbiAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICk6IFByb21pc2U8UHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2FsbGJhY2tGdW5jKGZpbGUuZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICAgICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3ZlcndyaXRlT2JqZWN0KGZpbGUsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICB3aWxsOiB7IGtleTogJ3VyaScsIHZhbHVlOiByZXMudmFsdWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmlucHV0LCBmaWxlcyB9IGFzIFByb3BlcnRpZXM7XG4gICAgfTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgT3B0aW9uLCBVc2VzIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBVc2VzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKG91dHB1dDogT3B0aW9uPFVzZXM+KTogVXNlcyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Vc2VzIH0gZnJvbSAnLi91c2VzJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgSW5wdXRUb2tlbk1ldGFkYXRhLCBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgTWV0YWRhdGFBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRva2VuTWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXRUb2tlbk1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBudWxsLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE1ldGFkYXRhQW5kT2ZmY2hhaW4sXG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICAgICk6IFRva2VuTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sKSxcbiAgICAgICAgdG9rZW5BbW91bnQ6IHRva2VuQW1vdW50LFxuICAgICAgICB1cmk6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgdXNlczogX1VzZXMuVXNlcy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4udXNlcyksXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCksXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gICAgLy8gZGVsZXRlIE5VTEwoMHgwMCkgc3RyaW5ncyBmdW5jdGlvblxuICAgIGV4cG9ydCBjb25zdCBkZWxldGVOdWxsU3RyaW5ncyA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcMC9nLCAnJyk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVHJhbnNmZXJDaGVja2VkIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBUcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQpIHtcbiAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgKTtcbiAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm11bHRpc2lnQXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm11bHRpc2lnQXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS5zaWduZXJzID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNpZ25lcnM7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IFRyYW5zZmVyIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVHJhbnNmZXIge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IFRyYW5zZmVyLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gdmFsaWRhdGlvbiBjaGVja1xuICAgICAgaWYgKCFvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24gfHwgIW91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICBoaXN0b3J5LnNvbCA9IG91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cz8udG9Tb2woKS50b1N0cmluZygpO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb21wcmVzc2VkTmZ0TWV0YWRhdGEgfSBmcm9tICcuL2NvbXByZXNzZWQtbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE5mdCB9IGZyb20gJy4vbmZ0JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNZW1vIH0gZnJvbSAnLi9tZW1vJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICcuL3JlZ3VsYXItbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9wcm9wZXJ0aWVzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnLi90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFVzZXMgfSBmcm9tICcuL3VzZXMnO1xuXG5leHBvcnQgY29uc3QgQ29udmVydGVyID0ge1xuICAuLi5Db21wcmVzc2VkTmZ0TWV0YWRhdGEsXG4gIC4uLkNvbGxlY3Rpb24sXG4gIC4uLkNyZWF0b3JzLFxuICAuLi5OZnQsXG4gIC4uLk1lbW8sXG4gIC4uLk1pbnQsXG4gIC4uLlJlZ3VsYXJOZnRNZXRhZGF0YSxcbiAgLi4uUHJvcGVydGllcyxcbiAgLi4uUm95YWx0eSxcbiAgLi4uVG9rZW5NZXRhZGF0YSxcbiAgLi4uVHJhbnNmZXJDaGVja2VkLFxuICAuLi5UcmFuc2ZlcixcbiAgLi4uVXNlcyxcbn07XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1ldGFkYXRhLCBOZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvbmZ0JztcbmltcG9ydCB7IE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IEZpbmRPcHRpb25zLCBTb3J0YWJsZSwgU29ydEJ5LCBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnfi90eXBlcy9maW5kJztcbmltcG9ydCB7IERhc0FwaSBhcyBBcGkgfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIERhc0FwaSB7XG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBkZWZhdWx0U29ydEJ5OiBTb3J0YWJsZSA9IHtcbiAgICBzb3J0Qnk6IFNvcnRCeS5SZWNlbnQsXG4gICAgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbi5EZXNjLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBmZXRjaE9mZmNoYWluID0gYXN5bmMgKHVyaTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmkpO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBtaW50IGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0NvbXByZXNzZWRcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIGlzQ29tcHJlc3NlZDogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxQYXJ0aWFsPE1ldGFkYXRhPj4gPT4ge1xuICAgIGNvbnN0IGFzc2V0ID0gYXdhaXQgQXBpLmdldEFzc2V0KG1pbnQpO1xuICAgIGlmIChhc3NldC5pc0Vycikge1xuICAgICAgdGhyb3cgYXNzZXQuZXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKGFzc2V0LnZhbHVlLmNvbXByZXNzaW9uLmNvbXByZXNzZWQgPT09IGlzQ29tcHJlc3NlZCkge1xuICAgICAgY29uc3Qgb2ZmY2hhaW46IE9mZmNoYWluID0gYXdhaXQgZmV0Y2hPZmZjaGFpbihcbiAgICAgICAgYXNzZXQudmFsdWUuY29udGVudC5qc29uX3VyaSxcbiAgICAgICk7XG4gICAgICBjb25zdCBtZXJnZWQgPSB7XG4gICAgICAgIG9uY2hhaW46IGFzc2V0LnZhbHVlLFxuICAgICAgICBvZmZjaGFpbjogb2ZmY2hhaW4sXG4gICAgICB9O1xuICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnQuaW50b1VzZXIobWVyZ2VkKTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBvd25lciBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQ29tcHJlc3NlZFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RmluZE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBpc0NvbXByZXNzZWQ6IGJvb2xlYW4sXG4gICAgb3B0aW9uczogUGFydGlhbDxGaW5kT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxOZnRNZXRhZGF0YT4gPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgbGltaXQ6IDEwMDAsXG4gICAgICBwYWdlOiAxLFxuICAgICAgc29ydEJ5OiBkZWZhdWx0U29ydEJ5LFxuICAgIH07XG4gICAgY29uc3QgeyBsaW1pdCwgcGFnZSwgc29ydEJ5LCBiZWZvcmUsIGFmdGVyIH0gPSB7XG4gICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfTtcblxuICAgIGNvbnN0IGFzc2V0cyA9IGF3YWl0IEFwaS5nZXRBc3NldHNCeU93bmVyKFxuICAgICAgb3duZXIsXG4gICAgICBsaW1pdCxcbiAgICAgIHBhZ2UsXG4gICAgICBzb3J0QnksXG4gICAgICBiZWZvcmUsXG4gICAgICBhZnRlcixcbiAgICApO1xuICAgIGlmIChhc3NldHMuaXNFcnIpIHtcbiAgICAgIHRocm93IGFzc2V0cy5lcnJvcjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtcyA9IGFzc2V0cy52YWx1ZS5pdGVtcztcblxuICAgIGNvbnN0IG1ldGFkYXRhcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgaXRlbXNcbiAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb21wcmVzc2lvbi5jb21wcmVzc2VkID09PSBpc0NvbXByZXNzZWQpXG4gICAgICAgIC5tYXAoYXN5bmMgKGl0ZW0pID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb2ZmY2hhaW46IE9mZmNoYWluID0gYXdhaXQgZmV0Y2hPZmZjaGFpbihcbiAgICAgICAgICAgICAgaXRlbS5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAgICAgICAgICAgb25jaGFpbjogaXRlbSxcbiAgICAgICAgICAgICAgb2ZmY2hhaW46IG9mZmNoYWluLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0ZXIuTmZ0LmludG9Vc2VyKG1lcmdlZCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBkZWJ1Z0xvZygnIyBGYWlsZWQgZmV0Y2ggb2ZmY2hhaW4gdXJsOiAnLCBpdGVtLmNvbnRlbnQuanNvbl91cmkpO1xuICAgICAgICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnQuaW50b1VzZXIoe1xuICAgICAgICAgICAgICBvbmNoYWluOiBpdGVtLFxuICAgICAgICAgICAgICBvZmZjaGFpbjoge30sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2U6IGFzc2V0cy52YWx1ZS5wYWdlLFxuICAgICAgdG90YWw6IGFzc2V0cy52YWx1ZS50b3RhbCxcbiAgICAgIGxpbWl0OiBhc3NldHMudmFsdWUubGltaXQsXG4gICAgICBtZXRhZGF0YXMsXG4gICAgfTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgY29sbGVjdGlvbiBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBjb2xsZWN0aW9uTWludFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQ29tcHJlc3NlZCxcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeUNvbGxlY3Rpb24gPSBhc3luYyAoXG4gICAgY29sbGVjdGlvbk1pbnQ6IFB1YmtleSxcbiAgICBpc0NvbXByZXNzZWQ6IGJvb2xlYW4sXG4gICAgb3B0aW9uczogUGFydGlhbDxGaW5kT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxOZnRNZXRhZGF0YT4gPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgbGltaXQ6IDEwMDAsXG4gICAgICBwYWdlOiAxLFxuICAgICAgc29ydEJ5OiBkZWZhdWx0U29ydEJ5LFxuICAgIH07XG4gICAgY29uc3QgeyBsaW1pdCwgcGFnZSwgc29ydEJ5LCBiZWZvcmUsIGFmdGVyIH0gPSB7XG4gICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfTtcblxuICAgIGNvbnN0IGFzc2V0cyA9IGF3YWl0IEFwaS5nZXRBc3NldHNCeUdyb3VwKFxuICAgICAgJ2NvbGxlY3Rpb24nLFxuICAgICAgY29sbGVjdGlvbk1pbnQsXG4gICAgICBsaW1pdCxcbiAgICAgIHBhZ2UsXG4gICAgICBzb3J0QnksXG4gICAgICBiZWZvcmUsXG4gICAgICBhZnRlcixcbiAgICApO1xuICAgIGlmIChhc3NldHMuaXNFcnIpIHtcbiAgICAgIHRocm93IGFzc2V0cy5lcnJvcjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtcyA9IGFzc2V0cy52YWx1ZS5pdGVtcztcblxuICAgIGNvbnN0IG1ldGFkYXRhcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgaXRlbXNcbiAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb21wcmVzc2lvbi5jb21wcmVzc2VkID09PSBpc0NvbXByZXNzZWQpXG4gICAgICAgIC5tYXAoYXN5bmMgKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKGl0ZW0uY29udGVudC5qc29uX3VyaSk7XG4gICAgICAgICAgY29uc3QgbWVyZ2VkID0ge1xuICAgICAgICAgICAgb25jaGFpbjogaXRlbSxcbiAgICAgICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBDb252ZXJ0ZXIuTmZ0LmludG9Vc2VyKG1lcmdlZCk7XG4gICAgICAgIH0pLFxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2U6IGFzc2V0cy52YWx1ZS5wYWdlLFxuICAgICAgdG90YWw6IGFzc2V0cy52YWx1ZS50b3RhbCxcbiAgICAgIGxpbWl0OiBhc3NldHMudmFsdWUubGltaXQsXG4gICAgICBtZXRhZGF0YXMsXG4gICAgfTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBEYXNBcGkgYXMgQXBpIH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgRGFzQXBpIGFzIEZpbmQgfSBmcm9tICcuL2ZpbmQnO1xuXG5leHBvcnQgY29uc3QgRGFzQXBpID0ge1xuICAuLi5BcGksXG4gIC4uLkZpbmQsXG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSwgU3VibWl0T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBNaW50PFQgPSBQdWJrZXk+IGltcGxlbWVudHMgTWludFN0cnVjdHVyZTxUPiB7XG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyOiBLZXlwYWlyO1xuICAgIGRhdGE6IFQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgICBkYXRhOiBULFxuICAgICkge1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICB9XG5cbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBvcHRpb25zOiBQYXJ0aWFsPFN1Ym1pdE9wdGlvbnM+ID0ge30sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW50KSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IE1pbnRJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IHRoaXMuZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBDaGFuZ2UgbWV0YXBsZXggY2x1c3RlciBvbiBtYWlubmV0LWJldGEnKTtcbiAgICAgICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyOiBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgUHJpb3JpdHlGZWUuUHJpb3JpdHlGZWUuc3VibWl0KFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQge1xuICBQYXJ0aWFsU2lnblN0cnVjdHVyZSxcbiAgU3VibWl0T3B0aW9ucyxcbn0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgUGFydGlhbFNpZ24gaW1wbGVtZW50cyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB7XG4gICAgaGV4SW5zdHJ1Y3Rpb246IHN0cmluZztcbiAgICBkYXRhPzogUHVia2V5O1xuXG4gICAgY29uc3RydWN0b3IoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIG1pbnQ/OiBQdWJrZXkpIHtcbiAgICAgIHRoaXMuaGV4SW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLmRhdGEgPSBtaW50O1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhcnRpYWxTaWduKSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdGlvbnMuZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignTmVlZCBmZWVQYXllcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVjb2RlID0gQnVmZmVyLmZyb20odGhpcy5oZXhJbnN0cnVjdGlvbiwgJ2hleCcpO1xuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IFRyYW5zYWN0aW9uLmZyb20oZGVjb2RlKTtcbiAgICAgICAgdHJhbnNhY3Rpb24ucGFydGlhbFNpZ24ob3B0aW9ucy5mZWVQYXllciEudG9LZXlwYWlyKCkpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb24uc2VyaWFsaXplKCk7XG4gICAgICAgIHJldHVybiBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5zZW5kUmF3VHJhbnNhY3Rpb24oXG4gICAgICAgICAgd2lyZVRyYW5zYWN0aW9uLFxuICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSwgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG4vLyBAaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgY29uc3QgTE9XX1ZBTFVFID0gMTI3OyAvLyAweDdmXG4gIGNvbnN0IEhJR0hfVkFMVUUgPSAxNjM4MzsgLy8gMHgzZmZmXG4gIGNvbnN0IE1BWF9UUkFOU0FDVElPTl9TSVpFID0gMTIzMjtcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgaGVhZGVyIHNpemVcbiAgICogQHBhcmFtIG4gZWxlbWVudHMgaW4gdGhlIGNvbXBhY3QgYXJyYXlcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiBhcnJheSBoZWFkZXJcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RIZWFkZXIgPSAobjogbnVtYmVyKSA9PlxuICAgIG4gPD0gTE9XX1ZBTFVFID8gMSA6IG4gPD0gSElHSF9WQUxVRSA/IDIgOiAzO1xuXG4gIC8qKlxuICAgKiBDb21wYWN0IHUxNiBhcnJheSBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEBwYXJhbSBzaXplIGJ5dGVzIHBlciBlYWNoIGVsZW1lbnRcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiBhcnJheVxuICAgKi9cbiAgY29uc3QgY29tcGFjdEFycmF5U2l6ZSA9IChuOiBudW1iZXIsIHNpemU6IG51bWJlcikgPT5cbiAgICBjb21wYWN0SGVhZGVyKG4pICsgbiAqIHNpemU7XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0eHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVUeFNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgZmVlUGF5ZXJQayA9IFtmZWVQYXllci50b0Jhc2U1OCgpXTtcblxuICAgIGNvbnN0IHNpZ25lcnMgPSBuZXcgU2V0PHN0cmluZz4oZmVlUGF5ZXJQayk7XG4gICAgY29uc3QgYWNjb3VudHMgPSBuZXcgU2V0PHN0cmluZz4oZmVlUGF5ZXJQayk7XG5cbiAgICBjb25zdCBpeHNTaXplID0gdHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLnJlZHVjZSgoYWNjLCBpeCkgPT4ge1xuICAgICAgaXgua2V5cy5mb3JFYWNoKCh7IHB1YmtleSwgaXNTaWduZXIgfSkgPT4ge1xuICAgICAgICBjb25zdCBwayA9IHB1YmtleS50b0Jhc2U1OCgpO1xuICAgICAgICBpZiAoaXNTaWduZXIpIHNpZ25lcnMuYWRkKHBrKTtcbiAgICAgICAgYWNjb3VudHMuYWRkKHBrKTtcbiAgICAgIH0pO1xuXG4gICAgICBhY2NvdW50cy5hZGQoaXgucHJvZ3JhbUlkLnRvQmFzZTU4KCkpO1xuXG4gICAgICBjb25zdCBuSW5kZXhlcyA9IGl4LmtleXMubGVuZ3RoO1xuICAgICAgY29uc3Qgb3BhcXVlRGF0YSA9IGl4LmRhdGEubGVuZ3RoO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICBhY2MgK1xuICAgICAgICAxICsgLy8gUElEIGluZGV4XG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUobkluZGV4ZXMsIDEpICtcbiAgICAgICAgY29tcGFjdEFycmF5U2l6ZShvcGFxdWVEYXRhLCAxKVxuICAgICAgKTtcbiAgICB9LCAwKTtcblxuICAgIHJldHVybiAoXG4gICAgICBjb21wYWN0QXJyYXlTaXplKHNpZ25lcnMuc2l6ZSwgNjQpICsgLy8gc2lnbmF0dXJlc1xuICAgICAgMyArIC8vIGhlYWRlclxuICAgICAgY29tcGFjdEFycmF5U2l6ZShhY2NvdW50cy5zaXplLCAzMikgKyAvLyBhY2NvdW50c1xuICAgICAgMzIgKyAvLyBibG9ja2hhc2hcbiAgICAgIGNvbXBhY3RIZWFkZXIodHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLmxlbmd0aCkgKyAvLyBpbnN0cnVjdGlvbnNcbiAgICAgIGl4c1NpemVcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBtYXggdHJhbnNhY3Rpb24gc2l6ZVxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gYSBzb2xhbmEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIGZlZVBheWVyIHRoZSBwdWJsaWNLZXkgb2YgdGhlIHNpZ25lclxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGlzT3ZlclRyYW5zYWN0aW9uU2l6ZSA9IChcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGNhbGN1bGF0ZVR4U2l6ZSh0cmFuc2FjdGlvbiwgZmVlUGF5ZXIpID4gTUFYX1RSQU5TQUNUSU9OX1NJWkU7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tbW9uIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFBhcnRpYWxTaWduIH0gZnJvbSAnLi9wYXJ0aWFsLXNpZ24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFByaW9yaXR5RmVlIH0gZnJvbSAnLi9wcmlvcml0eS1mZWUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENhbGN1bGF0ZVR4c2l6ZSB9IGZyb20gJy4vY2FsY3VsYXRlLXR4c2l6ZSc7XG5pbXBvcnQgJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCAnfi9nbG9iYWwnO1xuXG5leHBvcnQgY29uc3QgVHJhbnNhY3Rpb25CdWlsZGVyID0ge1xuICAuLi5CYXRjaCxcbiAgLi4uQ2FsY3VsYXRlVHhzaXplLFxuICAuLi5NaW50LFxuICAuLi5Db21tb24sXG4gIC4uLlBhcnRpYWxTaWduLFxuICAuLi5Qcmlvcml0eUZlZSxcbn07XG4iLCAiaW1wb3J0IHsgQW55T2JqZWN0IH0gZnJvbSAnfi90eXBlcy91dGlscyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogY29udmVydCBidWZmZXIgdG8gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gKiBAcmV0dXJucyBudW1iZXJbXVxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9BcnJheSA9IChidWZmZXI6IEJ1ZmZlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgbnVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGJ5dGUgb2YgYnVmZmVyKSB7XG4gICAgbnVtcy5wdXNoKGJ1ZmZlcltieXRlXSk7XG4gIH1cbiAgcmV0dXJuIG51bXM7XG59O1xuXG4vKipcbiAqIE92ZXJ3cml0ZSBKUyBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9iamVjdFxuICogQHBhcmFtIHtPdmVyd3JpdGVPYmplY3RbXX0gdGFyZ2V0c1xuICogQHJldHVybnMgT2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGVPYmplY3QgPSAoXG4gIG9iamVjdDogdW5rbm93bixcbiAgdGFyZ2V0czoge1xuICAgIGV4aXN0c0tleTogc3RyaW5nO1xuICAgIHdpbGw6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiB1bmtub3duIH07XG4gIH1bXSxcbik6IHVua25vd24gPT4ge1xuICBjb25zdCB0aGF0OiBBbnlPYmplY3QgPSBvYmplY3QgYXMgQW55T2JqZWN0O1xuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGRlbGV0ZSB0aGF0W3RhcmdldC5leGlzdHNLZXldO1xuICAgIHRoYXRbdGFyZ2V0LndpbGwua2V5XSA9IHRhcmdldC53aWxsLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXkgbG9nIGZvciBzb2xhbmEtc3VpdGUtY29uZmlnLmpzXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMVxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhM1xuICogQHBhcmFtIHt1bmtub3dufSBkYXRhNFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAoXG4gIGRhdGExOiB1bmtub3duLFxuICBkYXRhMjogdW5rbm93biA9ICcnLFxuICBkYXRhMzogdW5rbm93biA9ICcnLFxuICBkYXRhNDogdW5rbm93biA9ICcnLFxuKTogdm9pZCA9PiB7XG4gIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgY29uc29sZS5sb2coJ1tERUJVR10nLCBkYXRhMSwgZGF0YTIsIGRhdGEzLCBkYXRhNCk7XG4gIH1cbn07XG5cbi8qKlxuICogc2xlZXAgdGltZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjXG4gKiBAcmV0dXJucyBQcm9taXNlPG51bWJlcj5cbiAqL1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gYXN5bmMgKHNlYzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIHNlYyAqIDEwMDApKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbFxuICApO1xufTtcblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgcmV0dXJuIChcbiAgICAhIW9iaiAmJlxuICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgIHR5cGVvZiAob2JqIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufTtcblxuLyoqXG4gKiBUcnkgYXN5bmMgbW9uYWRcbiAqXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxULCBFPj5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBhc3luY2Jsb2NrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZXN1bHQ8VCwgRT4+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KGJsb2NrOiAoKSA9PiBUKTogUmVzdWx0PFQsIEU+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBpbnB1dDogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFJlc3VsdDxULCBFcnJvcj4gfCBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gaW5wdXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHYpKSB7XG4gICAgICByZXR1cm4gdi50aGVuKFxuICAgICAgICAoeDogVCkgPT4gUmVzdWx0Lm9rKHgpLFxuICAgICAgICAoZXJyOiBFKSA9PiBSZXN1bHQuZXJyKGVyciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHYpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlIGFzIHN0cmluZykpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChmaW5hbGx5SW5wdXQpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmFsbHkgaW5wdXQ6JywgZmluYWxseUlucHV0KTtcbiAgICAgIGZpbmFsbHlJbnB1dCgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcnx1bmRlZmluZWR9IGNyZWF0ZWRfYXRcbiAqIEByZXR1cm5zIERhdGUgfCB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lID0gKFxuICBjcmVhdGVkX2F0OiBudW1iZXIgfCB1bmRlZmluZWQsXG4pOiBEYXRlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGNyZWF0ZWRfYXQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoY3JlYXRlZF9hdCAqIDEwMDApO1xuICB9XG4gIHJldHVybjtcbn07XG5cbi8qKlxuICogR2V0IHVuaXggdGltZXN0YW1wXG4gKlxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCB1bml4VGltZXN0YW1wID0gKCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG59O1xuIiwgIi8vIGZvcmtlZDogaHR0cHM6Ly9naXRodWIuY29tL2JhZHJhcC9yZXN1bHQsIHRoYW5rIHlvdSBhZHZpY2UgIEBqdmlpZGVcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2lnbmF0dXJlIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIENvbW1vblN0cnVjdHVyZSxcbiAgTWludFN0cnVjdHVyZSxcbiAgUGFydGlhbFNpZ25TdHJ1Y3R1cmUsXG4gIFN1Ym1pdE9wdGlvbnMsXG59IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJy4vc2hhcmVkJztcblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuXG4gIHVud3JhcCgpOiBUO1xuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFU7XG4gIHVud3JhcDxVLCBWPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVik6IFUgfCBWO1xuICAvLyB1bmlmaWVkLXNpZ25hdHVyZXMuIGludG8gbGluZSAxMFxuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFUpOiBVO1xuICB1bndyYXAob2s/OiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gdW5rbm93bik6IHVua25vd24ge1xuICAgIGNvbnN0IHIgPSB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rID8gb2sodmFsdWUpIDogdmFsdWUpLFxuICAgICAgKGVycm9yKSA9PiAoZXJyID8gUmVzdWx0Lm9rKGVycihlcnJvcikpIDogUmVzdWx0LmVycihlcnJvcikpLFxuICAgICk7XG4gICAgaWYgKHIuaXNFcnIpIHtcbiAgICAgIHRocm93IHIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByLnZhbHVlO1xuICB9XG5cbiAgLy8vLyBtYXAgLy8vL1xuICBtYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFJlc3VsdDxVLCBFPjtcbiAgbWFwPFUsIEYgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gVSxcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gRixcbiAgKTogUmVzdWx0PFUsIEY+O1xuICBtYXAob2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiBFcnJvcik6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIgPyBlcnIoZXJyb3IpIDogZXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8vIGNoYWluIC8vLy9cbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc2luZ2xlIFRyYW5zYWN0aW9uQnVpbGRlciAvLy8vXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgYXN5bmMgc3VibWl0KFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4ge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMubWFwKFxuICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgIGRlYnVnTG9nKCcjIHJlc3VsdCBzaW5nbGUgc3VibWl0OiAnLCBvayk7XG4gICAgICAgIGNvbnN0IG9iaiA9IG9rIGFzXG4gICAgICAgICAgfCBDb21tb25TdHJ1Y3R1cmVcbiAgICAgICAgICB8IE1pbnRTdHJ1Y3R1cmVcbiAgICAgICAgICB8IFBhcnRpYWxTaWduU3RydWN0dXJlO1xuICAgICAgICByZXR1cm4gYXdhaXQgb2JqLnN1Ym1pdChvcHRpb25zKTtcbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIocmVzLmVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy52YWx1ZTtcbiAgfVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBpbnRlcmZhY2UgQXJyYXk8VD4ge1xuICAgIHN1Ym1pdChcbiAgICAgIG9wdGlvbnM/OiBQYXJ0aWFsPFN1Ym1pdE9wdGlvbnM+LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+O1xuICB9XG59XG5cbi8vIFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaFxuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRpb25zOiBQYXJ0aWFsPFN1Ym1pdE9wdGlvbnM+ID0ge30pIHtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBDb21tb25TdHJ1Y3R1cmUgfCBNaW50U3RydWN0dXJlW10gPSBbXTtcbiAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoJ09ubHkgQXJyYXkgSW5zdHJ1Y3Rpb24gb2JqZWN0JykpO1xuICAgIH1cbiAgfVxuICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggc3VibWl0OiAnLCBpbnN0cnVjdGlvbnMpO1xuICBjb25zdCBiYXRjaE9wdGlvbnMgPSB7XG4gICAgZmVlUGF5ZXI6IG9wdGlvbnMuZmVlUGF5ZXIsXG4gICAgaXNQcmlvcml0eUZlZTogb3B0aW9ucy5pc1ByaW9yaXR5RmVlLFxuICAgIGluc3RydWN0aW9uczogaW5zdHJ1Y3Rpb25zLFxuICB9O1xuICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaCgpLnN1Ym1pdChiYXRjaE9wdGlvbnMpO1xuICAvLyB9XG59O1xuXG5jbGFzcyBJbnRlcm5hbE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSB0cnVlO1xuICByZWFkb25seSBpc0VyciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBfZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxFcnI8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IGZhbHNlO1xuICByZWFkb25seSBpc0VyciA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBfb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlc3VsdCB7XG4gIGV4cG9ydCB0eXBlIE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbE9rPFQsIEU+O1xuICBleHBvcnQgdHlwZSBFcnI8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsRXJyPFQsIEU+O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBvazxULCBFIGV4dGVuZHMgRXJyb3I+KHZhbHVlOiBUKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsT2sodmFsdWUpO1xuICB9XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yPzogRSk6IFJlc3VsdDxULCBFPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I6IEUpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnIoZXJyb3IgfHwgRXJyb3IoKSk7XG4gIH1cblxuICB0eXBlIFUgPSBSZXN1bHQ8dW5rbm93bj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgICBSMTUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNCwgUjE1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgICAgT2tUeXBlPFIxNT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgICB8IFIxNVxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxM10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgUjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTEgfCBSMTIgfCBSMTNcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+LCBPa1R5cGU8UjU+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFUsIFIzIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjNdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjM+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMl0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPl0sIEVyclR5cGU8UjAgfCBSMSB8IFIyPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMV0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPl0sIEVyclR5cGU8UjAgfCBSMT4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjBdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD5dLCBFcnJUeXBlPFIwPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiBbXSk6IFJlc3VsdDxbXT47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8VCBleHRlbmRzIFVbXSB8IFJlY29yZDxzdHJpbmcsIFU+PihcbiAgICBvYmo6IFQsXG4gICk6IFJlc3VsdDxcbiAgICB7IFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PGluZmVyIEk+ID8gSSA6IG5ldmVyIH0sXG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT4gPyBFIDogbmV2ZXI7XG4gICAgfVtrZXlvZiBUXVxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogdW5rbm93bik6IHVua25vd24ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIGNvbnN0IHJlc0FyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaikge1xuICAgICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBpdGVtIGFzIHVua25vd247XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlc0Fycik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSAob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KVtrZXldO1xuICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICByZXNba2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQub2socmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yID0gRXJyb3I+ID1cbiAgfCBSZXN1bHQuT2s8VCwgRT5cbiAgfCBSZXN1bHQuRXJyPFQsIEU+O1xuXG50eXBlIE9rVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgTz4gPyBPIDogbmV2ZXI7XG50eXBlIEVyclR5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+XG4gID8gRVxuICA6IG5ldmVyO1xuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBMYXlvdXRPYmplY3QgfSBmcm9tICdAc29sYW5hL2J1ZmZlci1sYXlvdXQnO1xuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBNdWx0aXNpZ0luc3RydWN0aW9uIH0gZnJvbSAnLi9jcmVhdGUnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE11bHRpc2lnIHtcbiAgLy9AaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldEluZm8gPSBhc3luYyAoXG4gICAgbXVsdGlzaWc6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TGF5b3V0T2JqZWN0LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRBY2NvdW50SW5mbyhcbiAgICAgICAgbXVsdGlzaWcudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBpZiAoaW5mbyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBFcnJvcignRmFpbGVkIHRvIGZpbmQgbXVsdGlzaWcnKTtcbiAgICAgIH1cbiAgICAgIGlmICghaW5mby5vd25lci5lcXVhbHMoVE9LRU5fUFJPR1JBTV9JRCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgbXVsdGlzaWcgb3duZXInKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbmZvLmRhdGEubGVuZ3RoICE9PSBNdWx0aXNpZ0luc3RydWN0aW9uLkxheW91dC5zcGFuKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIG11bHRpc2lnIHNpemUnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IEJ1ZmZlci5mcm9tKGluZm8uZGF0YSk7XG4gICAgICBjb25zdCBtdWx0aXNpZ0luZm8gPSBNdWx0aXNpZ0luc3RydWN0aW9uLkxheW91dC5kZWNvZGUoZGF0YSk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMSA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjEpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjIgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIyKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIzID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyMyk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyNCA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjQpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjUgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI1KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI2ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyNik7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyNyA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjcpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjggPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI4KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI5ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyOSk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMTAgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIxMCk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMTEgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIxMSk7XG4gICAgICByZXR1cm4gbXVsdGlzaWdJbmZvO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTXVsdGlzaWcgYXMgX0dldCB9IGZyb20gJy4vZ2V0LWluZm8nO1xuXG5leHBvcnQgbmFtZXNwYWNlIE11bHRpc2lnIHtcbiAgLyoqXG4gICAqIENoZWNrIGlmIGl0IGlzIGEgbXVsdGlzaWcgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbXVsdGlzaWcgLy8gbXVsdGlzaWcgYWNjb3VudFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PGJvb2xlYW4sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBpc0FkZHJlc3MgPSBhc3luYyAoXG4gICAgbXVsdGlzaWc6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Ym9vbGVhbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgX0dldC5nZXRJbmZvKG11bHRpc2lnKTtcbiAgICAgIGlmIChpbmZvLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLGtCQUFBQTtBQUFBO0FBQUE7OztBQ0FBLElBQUFDLGdCQU1PO0FBQ1AsMkJBQWlDO0FBQ2pDLElBQUFDLG9CQUFpQzs7O0FDUmpDLGtCQUFzQztBQUN0QyxrQkFBNkI7QUFFdEIsSUFBTSxTQUFTLFlBQUFDO0FBRWYsSUFBVTtBQUFBLENBQVYsQ0FBVUMsZUFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxxQkFBVjtBQUNMLFVBQU0sYUFBYTtBQUNuQixRQUFJLFlBQVk7QUFDVCxJQUFNQSxpQkFBQSxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPNUIsSUFBTUEsaUJBQUEsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWVwQixJQUFNQSxpQkFBQSx1QkFBdUIsTUFBZTtBQUNqRCxZQUFNLGNBQWMsS0FBSyxPQUFPO0FBQ2hDLFlBQU0sY0FBYyxJQUFJO0FBQ3hCLFVBQUksQ0FBQyxhQUFhLGNBQWMsYUFBYTtBQUMzQyxvQkFBWTtBQUNaLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxLQWpDZSxrQkFBQUQsV0FBQSxvQkFBQUEsV0FBQTtBQUFBLEdBREY7QUFBQSxDQXNDVixDQUFVQSxlQUFWO0FBQ0UsRUFBTUEsV0FBQSxpQkFBaUIsT0FBTyxRQUFRO0FBQ3RDLEVBQU1BLFdBQUEsbUJBQW1CLE9BQU8sUUFBUTtBQUN4QyxFQUFNQSxXQUFBLGNBQWMs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QUFVLElBQUksd0JBQVUsYUFBYSxPQUFPO0FBQ3pELG1CQUFhLFVBQVUsSUFBSSx3QkFBVSxhQUFhLE9BQU87QUFDekQsbUJBQWEsVUFBVSxJQUFJLHdCQUFVLGFBQWEsT0FBTztBQUN6RCxtQkFBYSxVQUFVLElBQUksd0JBQVUsYUFBYSxPQUFPO0FBQ3pELG1CQUFhLFVBQVUsSUFBSSx3QkFBVSxhQUFhLE9BQU87QUFDekQsbUJBQWEsVUFBVSxJQUFJLHdCQUFVLGFBQWEsT0FBTztBQUN6RCxtQkFBYSxVQUFVLElBQUksd0JBQVUsYUFBYSxPQUFPO0FBQ3pELG1CQUFhLFVBQVUsSUFBSSx3QkFBVSxhQUFhLE9BQU87QUFDekQsbUJBQWEsV0FBVyxJQUFJLHdCQUFVLGFBQWEsUUFBUTtBQUMzRCxtQkFBYSxXQUFXLElBQUksd0JBQVUsYUFBYSxRQUFRO0FBQzNELGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNIO0FBQUEsR0FsQ2VBLDBCQUFBOzs7QUNKVixJQUFVQztBQUFBLENBQVYsQ0FBVUEsY0FBVjtBQU9FLEVBQU1BLFVBQUEsWUFBWSxPQUN2QixhQUNvQztBQUNwQyxXQUFPLElBQUksWUFBWTtBQUNyQixZQUFNLE9BQU8sTUFBTUEsVUFBSyxRQUFRLFFBQVE7QUFDeEMsVUFBSSxLQUFLLE9BQU87QUFDZCxlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNIO0FBQUEsR0FqQmVBLDBCQUFBOzs7QXBDQ1YsSUFBTUMsWUFBVyxFQUFFLEdBQUcsVUFBUSxHQUFHQSxXQUFTLEdBQUdBLFVBQVU7IiwKICAibmFtZXMiOiBbIk11bHRpc2lnIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU29sYW5hSnNvbkNvbmZpZyIsICJDb25zdGFudHMiLCAiV2Fybm5pbmdNZXNzYWdlIiwgIkNsdXN0ZXIiLCAiRW5kUG9pbnRVcmwiLCAiQnVuZGxyVXJsIiwgIkRhc0FwaVVybCIsICJOZnRzdG9yYWdlQXBpS2V5IiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3dlYjMiLCAiTm9kZSIsICJBY2NvdW50IiwgIkFzc29jaWF0ZWQiLCAiaW1wb3J0X3dlYjMiLCAiQWNjb3VudCIsICJLZXlwYWlyIiwgImJzIiwgIk9yaWdpbmFsIiwgImltcG9ydF93ZWIzIiwgIkFjY291bnQiLCAiUGRhIiwgIk1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCIsICJCTiIsICJBY2NvdW50IiwgImltcG9ydF9iczU4IiwgIkFjY291bnQiLCAiYnMiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3dlYjMiLCAiRGFzQXBpIiwgIkNvbnZlcnRlciIsICJDb2xsZWN0aW9uIiwgIkNvbGxlY3Rpb25NaW50IiwgIkNvbnZlcnRlciIsICJDcmVhdG9ycyIsICJpbXBvcnRfbXBsX2J1YmJsZWd1bV9pbnN0cnVjdGlvbiIsICJDb252ZXJ0ZXIiLCAiQ29tcHJlc3NlZE5mdE1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJSb3lhbHR5IiwgIkNvbnZlcnRlciIsICJOZnQiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIlJlZ3VsYXJOZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUHJvcGVydGllcyIsICJDb252ZXJ0ZXIiLCAiVXNlcyIsICJDb252ZXJ0ZXIiLCAiVG9rZW5NZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXJDaGVja2VkIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlciIsICJDb252ZXJ0ZXIiLCAiRGFzQXBpIiwgIkNvbnZlcnRlciIsICJEYXNBcGkiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlByaW9yaXR5RmVlIiwgIkRhc0FwaSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiUmVzdWx0IiwgIk11bHRpc2lnIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJNdWx0aXNpZ0luc3RydWN0aW9uIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X3dlYjMiLCAiTXVsdGlzaWciLCAiTXVsdGlzaWciLCAiTXVsdGlzaWciXQp9Cg==