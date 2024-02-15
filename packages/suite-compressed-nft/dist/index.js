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
    DasApiUrl2["dev"] = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639";
  })(DasApiUrl = Constants2.DasApiUrl || (Constants2.DasApiUrl = {}));
  let NftstorageApiKey;
  ((NftstorageApiKey2) => {
    NftstorageApiKey2["dev"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
  })(NftstorageApiKey = Constants2.NftstorageApiKey || (Constants2.NftstorageApiKey = {}));
  Constants2.loadConfig = async () => {
    Config = await import("@solana-suite/config/load");
  };
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
        const urls = "https://node1.irys.xyz,https://node2.irys.xyz" /* prd */.split(",");
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
var import_mpl_bubblegum = require("@metaplex-foundation/mpl-bubblegum");
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
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = import_web33.PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
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
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
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
  const endPointUrl = Node.getConnection().rpcEndpoint;
  debugLog("# toExplorerUrl rpcEndpoint:", endPointUrl);
  let cluster = "";
  if (endPointUrl === Constants.EndPointUrl.prd) {
    cluster = Constants.Cluster.prd;
  } else if (endPointUrl === Constants.EndPointUrl.dev) {
    cluster = Constants.Cluster.dev;
  } else {
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
var import_mpl_bubblegum_instruction = require("mpl-bubblegum-instruction");
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
        tokenStandard: import_mpl_bubblegum_instruction.TokenStandard.NonFungible,
        tokenProgramVersion: import_mpl_bubblegum_instruction.TokenProgramVersion.Original
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
    PriorityFee2.submit = async (transaction, signers) => {
      const estimates = await DasApi3.getPriorityFeeEstimate(transaction);
      debugLog("# estimates: ", estimates);
      try {
        const lamports = estimates.isOk ? estimates.unwrap().medium : MINIMUM_PRIORITY_FEE;
        debugLog("# lamports: ", lamports);
        return sendTransactionWithPriorityFee(lamports, transaction, signers);
      } catch (error) {
        debugLog("# priority fee error: ", error);
        const lamports = estimates.isOk ? estimates.unwrap().high : MINIMUM_PRIORITY_FEE;
        debugLog("# lamports: ", lamports);
        return sendTransactionWithPriorityFee(lamports, transaction, signers);
      }
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
    canSubmit;
    constructor(instructions, mint, canSubmit = false) {
      this.hexInstruction = instructions;
      this.data = mint;
      this.canSubmit = canSubmit;
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
Array.prototype.submit = async function(options) {
  if (options.feePayer) {
    let i = 1;
    for await (const obj of this) {
      if (obj.isErr) {
        return obj;
      } else if (obj.value.canSubmit) {
        debugLog("# Result batch canSubmit");
        const sig = await obj.submit(options);
        if (sig.isErr) {
          return sig;
        }
        await Node.confirmedSig(sig.value);
      } else {
        debugLog("# Result batch other than canSubmit");
        if (this.length == i) {
          return obj.submit(options);
        }
        obj.submit(options);
      }
      i++;
    }
  } else {
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
  }
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
var import_mpl_bubblegum_instruction2 = require("mpl-bubblegum-instruction");
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
    return (0, import_mpl_bubblegum_instruction2.createDelegateInstruction)(
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
var import_mpl_bubblegum_instruction3 = require("mpl-bubblegum-instruction");
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
    return (0, import_mpl_bubblegum_instruction3.createTransferInstruction)(
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
    const delegate = await CompressedNft3.gasLessDelegate(mint, owner, feePayer);
    delegate.unwrap().canSubmit = true;
    const transfer = await Try(async () => {
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
    return [delegate, transfer];
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
  Arweave2.uploadData = (metadata, feePayer) => {
    return Try(async () => {
      debugLog("# upload meta data: ", metadata);
      return await ProvenanceLayer.uploadData(
        JSON.stringify(metadata),
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
    Constants.WarnningMessage.calculateProbability() && console.warn(Constants.WarnningMessage.NFT_STORAGE_API_KEY);
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
      debugLog("# upload metadata: ", storageData);
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
var import_mpl_bubblegum2 = require("@metaplex-foundation/mpl-bubblegum");
var import_web313 = require("@solana/web3.js");
var import_mpl_bubblegum_instruction4 = require("mpl-bubblegum-instruction");
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
        import_mpl_bubblegum2.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
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
        (0, import_mpl_bubblegum_instruction4.createCreateTreeInstruction)(
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
          import_mpl_bubblegum2.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
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
var import_mpl_bubblegum_instruction5 = require("mpl-bubblegum-instruction");
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
    return (0, import_mpl_bubblegum_instruction5.createVerifyCreatorInstruction)(
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
        creatorHash: [...(0, import_mpl_bubblegum_instruction5.computeCreatorHash)(creators)],
        dataHash: [...(0, import_mpl_bubblegum_instruction5.computeDataHash)(metadata)],
        nonce: compression.leaf_id,
        index: compression.leaf_id,
        message: metadata
      }
    );
  };
  CompressedNft10.mint = async (owner, input, treeOwner, collectionMint, options = {}) => {
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
        treeOwner.toPublicKey().toString()
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
      storageMetadata.created_at = unixTimestamp();
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
        (0, import_mpl_bubblegum_instruction5.createMintToCollectionV1Instruction)(
          {
            merkleTree: treeOwner.toPublicKey(),
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
            collectionAuthorityRecordPda: import_mpl_bubblegum_instruction5.PROGRAM_ID,
            compressionProgram: import_spl_account_compression4.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            tokenMetadataProgram: import_mpl_token_metadata2.PROGRAM_ID
          },
          {
            metadataArgs
          }
        )
      );
      if (input.creators) {
        const assetId = await new CompressedNft6.Space(treeOwner).getAssetId();
        instructions.push(
          await (0, CompressedNft10.createVerifyCreator)(
            metadataArgs.creators,
            assetId.toPublicKey(),
            treeOwner.toPublicKey(),
            metadataArgs,
            payer.toKeypair().publicKey
          )
        );
      }
      return new TransactionBuilder7.Mint(
        instructions,
        [owner.toKeypair()],
        payer.toKeypair(),
        new CompressedNft6.Space(treeOwner)
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
      storageMetadata.created_at = unixTimestamp();
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
      storageMetadata.created_at = unixTimestamp();
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
        storageMetadata.created_at = unixTimestamp();
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vZ2xvYmFsL3NyYy9pbmRleC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9hc3NvY2lhdGVkLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2tleXBhaXIudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvcGRhLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2JhdGNoLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbW1vbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9wcmlvcml0eS1mZWUudHMiLCAiLi4vLi4vZGFzLWFwaS9zcmMvYXBpLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29sbGVjdGlvbi50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NyZWF0b3JzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yb3lhbHR5LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbmZ0LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbWVtby50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yZWd1bGFyLW5mdC1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Byb3BlcnRpZXMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy91c2VzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdG9rZW4tbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci1jaGVja2VkLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi9kYXMtYXBpL3NyYy9maW5kLnRzIiwgIi4uLy4uL2Rhcy1hcGkvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvcGFydGlhbC1zaWduLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NhbGN1bGF0ZS10eHNpemUudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL3NoYXJlZC50cyIsICIuLi8uLi9zdWl0ZS11dGlscy9zcmMvcmVzdWx0LnRzIiwgIi4uLy4uL25vZGUvc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9kZWxlZ2F0ZS50cyIsICIuLi9zcmMvZmluZC50cyIsICIuLi9zcmMvZ2FzLWxlc3MtZGVsZWdhdGUudHMiLCAiLi4vc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9wcm92ZW5hbmNlLWxheWVyLnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL2Fyd2VhdmUudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvc3RvcmFnZS50cyIsICIuLi8uLi92YWxpZGF0b3Ivc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9zcGFjZS50cyIsICIuLi9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2FkZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2NhbGN1bGF0ZS1hbW91bnQudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZmluZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2ZyZWV6ZS50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9maW5kLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9mcmVlemUudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL21pbnQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2dhcy1sZXNzLW1pbnQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9taW50LWNvbGxlY3Rpb24udHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9pbmRleC50cyIsICIuLi9zcmMvbWludC1jb2xsZWN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBpbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIENyZWF0b3IgfSBmcm9tICcuL2NyZWF0b3InO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBEZWxlZ2F0ZSB9IGZyb20gJy4vZGVsZWdhdGUnO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgR2FzTGVzc0RlbGVnYXRlIH0gZnJvbSAnLi9nYXMtbGVzcy1kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIEdhc0xlc3NUcmFuc2ZlciB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vbWludC1jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgU3BhY2UgfSBmcm9tICcuL3NwYWNlJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTmZ0ID0ge1xuICAvLyAuLi5DcmVhdG9yLFxuICAuLi5EZWxlZ2F0ZSxcbiAgLi4uRmluZCxcbiAgLi4uR2FzTGVzc0RlbGVnYXRlLFxuICAuLi5HYXNMZXNzVHJhbnNmZXIsXG4gIC4uLk1pbnQsXG4gIC4uLlNwYWNlLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5UcmFuc2Zlcixcbn07XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBTb2xhbmFKc29uQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnO1xuXG5sZXQgQ29uZmlnID0gU29sYW5hSnNvbkNvbmZpZztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgbmFtZXNwYWNlIFdhcm5uaW5nTWVzc2FnZSB7XG4gICAgY29uc3QgVEhSRVNISE9MRCA9IDUwO1xuICAgIGxldCBpc0Rpc3BsYXkgPSBmYWxzZTtcbiAgICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZUFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBDYW4gZ2V0IGFwaSBrZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgO1xuICAgIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgZGFzQXBpVXJsIGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpIHVybCBmcm9tIGh0dHBzOi8vd3d3LmhlbGl1cy5kZXYvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuICAgICAgICBgO1xuICAgIC8vIGV4cG9ydCBjb25zdCBBTk5PVU5DRSA9IGBcbiAgICAvLyAgICAgW0RFUFJFQ0FURURdXG4gICAgLy8gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gICAgIEFjY291bnQsIE5vZGUsIHRvRXhwbG9yZXIsIFB1YmtleSwgU2VjcmV0IGhhdmUgYmVlbiBtb3ZlZCB0b1xuICAgIC8vICAgICBAc29sYW5hLXN1aXRlL3V0aWxzXG4gICAgLy8gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAgICAgYDtcblxuICAgIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVQcm9iYWJpbGl0eSA9ICgpOiBib29sZWFuID0+IHtcbiAgICAgIGNvbnN0IHJhbmRvbVZhbHVlID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIGNvbnN0IHByb2JhYmlsaXR5ID0gMSAvIFRIUkVTSEhPTEQ7XG4gICAgICBpZiAoIWlzRGlzcGxheSAmJiByYW5kb21WYWx1ZSA8IHByb2JhYmlsaXR5KSB7XG4gICAgICAgIGlzRGlzcGxheSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgY29uc3QgY3VycmVudENsdXN0ZXIgPSBDb25maWcuY2x1c3Rlci50eXBlO1xuICBleHBvcnQgY29uc3QgY3VzdG9tQ2x1c3RlclVybCA9IENvbmZpZy5jbHVzdGVyLmN1c3RvbUNsdXN0ZXJVcmw7XG4gIGV4cG9ydCBjb25zdCBpc0RlYnVnZ2luZyA9IENvbmZpZy5kZWJ1Z2dpbmc7XG4gIGV4cG9ydCBjb25zdCBuZnRTdG9yYWdlQXBpS2V5ID0gQ29uZmlnLm5mdFN0b3JhZ2VBcGlLZXk7XG4gIGV4cG9ydCBjb25zdCBkYXNBcGlVcmwgPSBDb25maWcuZGFzQXBpVXJsO1xuXG4gIGV4cG9ydCBlbnVtIENsdXN0ZXIge1xuICAgIHByZCA9ICdtYWlubmV0LWJldGEnLFxuICAgIHByZE1ldGFwbGV4ID0gJ21haW5uZXQtYmV0YS1tZXRhcGxleCcsXG4gICAgZGV2ID0gJ2Rldm5ldCcsXG4gICAgbG9jYWxob3N0ID0gJ2xvY2FsaG9zdC1kZXZuZXQnLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRW5kUG9pbnRVcmwge1xuICAgIHByZCA9ICdodHRwczovL2FwaS5tYWlubmV0LWJldGEuc29sYW5hLmNvbScsXG4gICAgcHJkTWV0YXBsZXggPSAnaHR0cHM6Ly9hcGkubWV0YXBsZXguc29sYW5hLmNvbScsXG4gICAgZGV2ID0gJ2h0dHBzOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgICBsb2NhbGhvc3QgPSAnaHR0cDovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gIH1cblxuICBleHBvcnQgZW51bSBCdW5kbHJVcmwge1xuICAgIHByZCA9ICdodHRwczovL25vZGUxLmlyeXMueHl6LGh0dHBzOi8vbm9kZTIuaXJ5cy54eXonLFxuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5pcnlzLnh5eicsXG4gIH1cblxuICBleHBvcnQgZW51bSBEYXNBcGlVcmwge1xuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTIsaHR0cHM6Ly9ycGMtZGV2bmV0LmhlbGl1cy54eXo/YXBpLWtleT05ZjcwYTg0My0zMjc0LTRmZmQtYTBhOS0zMjNmOGI3YzA2MzknLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gTmZ0c3RvcmFnZUFwaUtleSB7XG4gICAgZGV2ID0gJ2V5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSmthV1E2WlhSb2Nqb3dlRVJHTWpjeU4yVmtPRFpoUkdVMVJUTXlaRFpEWkVKbE9EYzBZelJGTkRsRU9EWTFPV1ptT0VNaUxDSnBjM01pT2lKdVpuUXRjM1J2Y21GblpTSXNJbWxoZENJNk1UWXlNREkyTkRrME16Y3dOaXdpYm1GdFpTSTZJbVJsYlc4aWZRLmQ0SjcwbWlreFJCOGE1dndOdTZTTzVIREE4SmF1ZXVzZUFqN1FfeXRNQ0UnLFxuICB9XG5cbiAgZXhwb3J0IGNvbnN0IGxvYWRDb25maWcgPSBhc3luYyAoKSA9PiB7XG4gICAgQ29uZmlnID0gYXdhaXQgaW1wb3J0KCdAc29sYW5hLXN1aXRlL2NvbmZpZy9sb2FkJyk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaENsdXN0ZXIgPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgeyBjbHVzdGVyOiBlbnYsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuXG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSB1cmwsIG1vc3QgcHJpb3JpdHlcbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCAmJiBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoO1xuICAgICAgcmV0dXJuIGN1c3RvbUNsdXN0ZXJVcmxbaW5kZXhdO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQ7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZE1ldGFwbGV4O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5sb2NhbGhvc3Q7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hCdW5kbHIgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5CdW5kbHJVcmwuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoRGFzQXBpID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgaWYgKGRhc0FwaVVybC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5EQVNfQVBJX1VSTCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuRGFzQXBpVXJsLmRldi5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoTmZ0U3RvcmFnZSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICBpZiAoIW5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihXYXJubmluZ01lc3NhZ2UuTkZUX1NUT1JBR0VfQVBJX0tFWSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5mdFN0b3JhZ2VBcGlLZXk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuTmZ0c3RvcmFnZUFwaUtleS5kZXY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBXUkFQUEVEX1RPS0VOX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdTbzExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEyJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FTU9fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ01lbW8xVWhrSlJmSHl2TE1jVnVjSnd4WGV1RDcyOEVxVkREd1FEeEZNTm8nLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVUQVBMRVhfUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ21ldGFxYnh4VWVyZHEyOGNqMVJiQVdrWVFtM3liempiNmE4YnQ1MTh4MXMnLFxuICApO1xuICBleHBvcnQgY29uc3QgQ09NTUlUTUVOVDogQ29tbWl0bWVudCA9ICdjb25maXJtZWQnO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9pcGZzLmlvL2lwZnMnO1xuICBleHBvcnQgY29uc3QgSVJZU19HQVRFV0FZX1VSTCA9ICdodHRwczovL2dhdGV3YXkuaXJ5cy54eXonO1xuICBleHBvcnQgY29uc3QgQlVORExSX05FVFdPUktfVVJMID0gc3dpdGNoQnVuZGxyKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgREFTX0FQSV9VUkwgPSBzd2l0Y2hEYXNBcGkoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gc3dpdGNoTmZ0U3RvcmFnZShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTFNDQU5fVVJMID0gJ2h0dHBzOi8vc29sc2Nhbi5pbyc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xBTkFGTV9VUkwgPSAnaHR0cHM6Ly9zb2xhbmEuZm0nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfWFJBWV9VUkwgPSAnaHR0cHM6Ly94cmF5LmhlbGl1cy54eXonO1xufVxuXG4vLyBEaXNwbGF5IEFsbCBBbm5vdW5jZVxuLy8gY29uc29sZS5sb2coQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5BTk5PVU5DRSk7XG4iLCAiaW1wb3J0IHsgS2V5cGFpciwgTEFNUE9SVFNfUEVSX1NPTCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIsIEV4cGxvcmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuLyoqXG4gKiBDcmVhdGUgZXhwbG9yZXIgdXJsIGZvciBhY2NvdW50IGFkZHJlc3Mgb3Igc2lnbmF0dXJlXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9FeHBsb3JlclVybCA9IGZ1bmN0aW9uIChcbiAgZXhwbG9yZXI6IEV4cGxvcmVyID0gRXhwbG9yZXIuU29sc2NhbixcbiAgb3B0aW9uczogUGFydGlhbDxFeHBsb3Jlck9wdGlvbnM+ID0ge30sXG4pIHtcbiAgY29uc3QgZW5kUG9pbnRVcmwgPSBOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludDtcbiAgZGVidWdMb2coJyMgdG9FeHBsb3JlclVybCBycGNFbmRwb2ludDonLCBlbmRQb2ludFVybCk7XG4gIGxldCBjbHVzdGVyID0gJyc7XG4gIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5kZXYpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9IGVsc2Uge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH1cblxuICBjb25zdCBhZGRyZXNzT3JTaWduYXR1cmU6IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgbGV0IHVybCA9ICcnO1xuXG4gIGlmIChvcHRpb25zLnJlcGxhY2VQYXRoKSB7XG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGlmIChBY2NvdW50LktleXBhaXIuaXNQdWJrZXkoYWRkcmVzc09yU2lnbmF0dXJlKSkge1xuICAgIC8vIGFkZHJlc3NcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS9hZGRyZXNzLyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBzaWduYXR1cmVcbiAgICAvLyBmb3IgSW52YWxpZCB0eXBlIFwibmV2ZXJcIiBvZiBhZGRyZXNzT3JTaWduYXR1cmUsIHNvIGBhcyBzdHJpbmdgXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogUHViS2V5KEBzb2xhbmEtc3VpdGUpIHRvIFB1YmxpY0tleShAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHVibGljS2V5XG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9QdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5QdWJLZXk6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMudG9TdHJpbmcoKSk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1NlY3JldCh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuU2VjcmV0OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMudG9TdHJpbmcoKSk7XG4gIHJldHVybiBLZXlwYWlyLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG59O1xuXG4vKipcbiAqIExBTVBPUlRTIHRvIFNPTFxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvU29sID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC5kaXYoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG5cbi8qKlxuICogU09MIHRvIExBTVBPUlRTXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9MYW1wb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAudGltZXMoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QWNjb3VudCxcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG4gIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IsXG4gIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbi8qKlxuICogR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gKlxuICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsbG93T3duZXJPZmZDdXJ2ZVxuICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBBc3NvY2lhdGVkIHtcbiAgICAvKipcbiAgICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgICAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICAgICk6IFByb21pc2U8e1xuICAgICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIH0+ID0+IHtcbiAgICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgICBwYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyIGFzIE9yaWdpbmFsLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgY2xhc3MgS2V5cGFpciB7XG4gICAgc2VjcmV0OiBTZWNyZXQ7XG4gICAgcHVia2V5OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgICBpZiAoIXBhcmFtcy5wdWJrZXkpIHtcbiAgICAgICAgY29uc3Qga2V5cGFpciA9IHBhcmFtcy5zZWNyZXQudG9LZXlwYWlyKCk7XG4gICAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVia2V5ID0gcGFyYW1zLnB1YmtleTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VjcmV0ID0gcGFyYW1zLnNlY3JldDtcbiAgICB9XG5cbiAgICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy5wdWJrZXkpO1xuICAgIH1cblxuICAgIHRvS2V5cGFpcigpOiBPcmlnaW5hbCB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICAgIHJldHVybiBPcmlnaW5hbC5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1B1YmtleSA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgUHVia2V5ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGlzU2VjcmV0ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBTZWNyZXQgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17ODcsODh9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXIgPT4ge1xuICAgICAgY29uc3Qga2V5cGFpciA9IE9yaWdpbmFsLmdlbmVyYXRlKCk7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyB0b0tleVBhaXIgPSAoa2V5cGFpcjogT3JpZ2luYWwpOiBLZXlwYWlyID0+IHtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC1idWJibGVndW0nO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICAgIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0TWFzdGVyRWRpdGlvbiA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnZWRpdGlvbicpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRUcmVlQXV0aG9yaXR5ID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Qmd1bVNpZ25lciA9ICgpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW0J1ZmZlci5mcm9tKCdjb2xsZWN0aW9uX2NwaScsICd1dGY4JyldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QXNzZXRJZCA9IChhZGRyZXNzOiBQdWJrZXksIGxlYWZJbmRleDogbnVtYmVyKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgQk4uQk4obGVhZkluZGV4KTtcbiAgICAgIGNvbnN0IFthc3NldElkXSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2Fzc2V0JywgJ3V0ZjgnKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBVaW50OEFycmF5LmZyb20obm9kZS50b0FycmF5KCdsZScsIDgpKSxcbiAgICAgICAgXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFzc2V0SWQudG9TdHJpbmcoKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCBhcyBBYXNzb2NpYXRlZCB9IGZyb20gJy4vYXNzb2NpYXRlZCc7XG5pbXBvcnQgeyBBY2NvdW50IGFzIEtleXBhaXIgfSBmcm9tICcuL2tleXBhaXInO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBQZGEgfSBmcm9tICcuL3BkYSc7XG5pbXBvcnQgJ34vdHlwZXMvZ2xvYmFsJztcbi8vIGltcG9ydCAnfi9nbG9iYWwnO1xuXG5leHBvcnQgY29uc3QgQWNjb3VudCA9IHtcbiAgLi4uQWFzc29jaWF0ZWQsXG4gIC4uLktleXBhaXIsXG4gIC4uLlBkYSxcbn07XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBCYXRjaFN1Ym1pdE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBCYXRjaCB7XG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxCYXRjaFN1Ym1pdE9wdGlvbnM+ID0ge30sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnN0cnVjdGlvbnMpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIG9wdGlvbnMuaW5zdHJ1Y3Rpb25zJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29tbW9uT3JNaW50SW5zdCA9IG9wdGlvbnMuaW5zdHJ1Y3Rpb25zO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgaW5zdCBvZiBjb21tb25Pck1pbnRJbnN0KSB7XG4gICAgICAgICAgaWYgKCFpbnN0Lmluc3RydWN0aW9ucyAmJiAhaW5zdC5zaWduZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgYG9ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSBiYXRjaFN1Ym1pdCgpLlxuICAgICAgICAgICAgSW5kZXg6ICR7aX0sIFNldCB2YWx1ZTogJHtKU09OLnN0cmluZ2lmeShpbnN0KX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gY29tbW9uT3JNaW50SW5zdC5mbGF0TWFwKFxuICAgICAgICAgIChpbnN0KSA9PiBpbnN0Lmluc3RydWN0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgc2lnbmVycyA9IGNvbW1vbk9yTWludEluc3QuZmxhdE1hcCgoaW5zdCkgPT4gaW5zdC5zaWduZXJzKTtcbiAgICAgICAgY29uc3QgZmVlUGF5ZXJzID0gY29tbW9uT3JNaW50SW5zdC5maWx0ZXIoXG4gICAgICAgICAgKGluc3QpID0+IGluc3QuZmVlUGF5ZXIgIT09IHVuZGVmaW5lZCxcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGZlZVBheWVyID0gc2lnbmVyc1swXTtcbiAgICAgICAgaWYgKGZlZVBheWVycy5sZW5ndGggPiAwICYmIGZlZVBheWVyc1swXS5mZWVQYXllcikge1xuICAgICAgICAgIGZlZVBheWVyID0gZmVlUGF5ZXJzWzBdLmZlZVBheWVyO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICAgIGlmIChmZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFtmZWVQYXllciwgLi4uc2lnbmVyc107XG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb25zLm1hcCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGVUeHNpemUuaXNNYXhUcmFuc2FjdGlvblNpemUodHJhbnNhY3Rpb24sIGZlZVBheWVyLnB1YmxpY0tleSk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBQcmlvcml0eUZlZS5Qcmlvcml0eUZlZS5zdWJtaXQoXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSwgU3VibWl0T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5cbmV4cG9ydCBjb25zdCBNQVhfUkVUUklFUyA9IDM7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIENvbW1vbjxUID0gdW5kZWZpbmVkPiBpbXBsZW1lbnRzIENvbW1vblN0cnVjdHVyZTxUPiB7XG4gICAgc3RhdGljIE1BWF9UUkFOU0FDVElPTl9TSVpFID0gMTIzMjtcblxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICAgIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgICBmZWVQYXllcj86IEtleXBhaXI7XG4gICAgZGF0YT86IFQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgICAgZGF0YT86IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbW1vbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgUHJpb3JpdHlGZWUuUHJpb3JpdHlGZWUuc3VibWl0KFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb21wdXRlQnVkZ2V0UHJvZ3JhbSxcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IERhc0FwaSB9IGZyb20gJ34vZGFzLWFwaSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQcmlvcml0eUZlZSB7XG4gICAgY29uc3QgTUlOSU1VTV9QUklPUklUWV9GRUUgPSAzMDA7XG4gICAgZXhwb3J0IGNvbnN0IHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGVzdGltYXRlcyA9IGF3YWl0IERhc0FwaS5nZXRQcmlvcml0eUZlZUVzdGltYXRlKHRyYW5zYWN0aW9uKTtcbiAgICAgIGRlYnVnTG9nKCcjIGVzdGltYXRlczogJywgZXN0aW1hdGVzKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHByaW9yaXR5IGZlZTogbWVkaXVtXG4gICAgICAgIGNvbnN0IGxhbXBvcnRzID0gZXN0aW1hdGVzLmlzT2tcbiAgICAgICAgICA/IGVzdGltYXRlcy51bndyYXAoKS5tZWRpdW1cbiAgICAgICAgICA6IE1JTklNVU1fUFJJT1JJVFlfRkVFO1xuICAgICAgICBkZWJ1Z0xvZygnIyBsYW1wb3J0czogJywgbGFtcG9ydHMpO1xuICAgICAgICByZXR1cm4gc2VuZFRyYW5zYWN0aW9uV2l0aFByaW9yaXR5RmVlKGxhbXBvcnRzLCB0cmFuc2FjdGlvbiwgc2lnbmVycyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBkZWJ1Z0xvZygnIyBwcmlvcml0eSBmZWUgZXJyb3I6ICcsIGVycm9yKTtcbiAgICAgICAgLy8gcHJpb3JpdHkgZmVlOiBoaWdoXG4gICAgICAgIGNvbnN0IGxhbXBvcnRzID0gZXN0aW1hdGVzLmlzT2tcbiAgICAgICAgICA/IGVzdGltYXRlcy51bndyYXAoKS5oaWdoXG4gICAgICAgICAgOiBNSU5JTVVNX1BSSU9SSVRZX0ZFRTtcbiAgICAgICAgZGVidWdMb2coJyMgbGFtcG9ydHM6ICcsIGxhbXBvcnRzKTtcbiAgICAgICAgcmV0dXJuIHNlbmRUcmFuc2FjdGlvbldpdGhQcmlvcml0eUZlZShsYW1wb3J0cywgdHJhbnNhY3Rpb24sIHNpZ25lcnMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgY3JlYXRlUHJpb3JpdHlGZWVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGVzdGltYXRlcyA9IGF3YWl0IERhc0FwaS5nZXRQcmlvcml0eUZlZUVzdGltYXRlKHRyYW5zYWN0aW9uKTtcbiAgICAgIGRlYnVnTG9nKCcjIGVzdGltYXRlczogJywgZXN0aW1hdGVzKTtcbiAgICAgIC8vIHByaW9yaXR5IGZlZTogbWVkaXVtXG4gICAgICBjb25zdCBsYW1wb3J0cyA9IGVzdGltYXRlcy5pc09rXG4gICAgICAgID8gZXN0aW1hdGVzLnVud3JhcCgpLm1lZGl1bVxuICAgICAgICA6IE1JTklNVU1fUFJJT1JJVFlfRkVFO1xuICAgICAgcmV0dXJuIENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0UHJpY2Uoe1xuICAgICAgICBtaWNyb0xhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBzZW5kVHJhbnNhY3Rpb25XaXRoUHJpb3JpdHlGZWUgPSBhc3luYyAoXG4gICAgICBsYW1wb3J0czogbnVtYmVyLFxuICAgICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgICAgZmluYWxTaWduZXJzOiBLZXlwYWlyW10sXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBjb21wdXRlUHJpY2VJbnN0ID0gQ29tcHV0ZUJ1ZGdldFByb2dyYW0uc2V0Q29tcHV0ZVVuaXRQcmljZSh7XG4gICAgICAgIG1pY3JvTGFtcG9ydHM6IGxhbXBvcnRzLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgfTtcbiAgICAgIHRyYW5zYWN0aW9uLmFkZChjb21wdXRlUHJpY2VJbnN0KTtcbiAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQXNzZXQsIEFzc2V0UHJvb2YsIEFzc2V0cywgUHJpb3JpdHlGZWVMZXZlbHMgfSBmcm9tICd+L3R5cGVzL2Rhcy1hcGknO1xuaW1wb3J0IHsgU29ydGFibGUgfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIERhc0FwaSB7XG4gIGxldCBkYXNVcmk6IHN0cmluZztcbiAgY29uc3QgY29ubmVjdCA9IGFzeW5jIChcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICBwYXJhbXM6IChcbiAgICAgIHwgc3RyaW5nXG4gICAgICB8IFB1YmtleVxuICAgICAgfCBTb3J0YWJsZVxuICAgICAgfCBudW1iZXJcbiAgICAgIHwgdW5kZWZpbmVkXG4gICAgICB8IFB1YmtleVtdXG4gICAgICB8IFRyYW5zYWN0aW9uXG4gICAgICB8IHtcbiAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICAgIH1cbiAgICApW10sXG4gICkgPT4ge1xuICAgIENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuY2FsY3VsYXRlUHJvYmFiaWxpdHkoKSAmJlxuICAgICAgY29uc29sZS53YXJuKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuREFTX0FQSV9VUkwpO1xuICAgIGRhc1VyaSA9IGRhc1VyaSA/IGRhc1VyaSA6IENvbnN0YW50cy5EQVNfQVBJX1VSTDtcbiAgICBkZWJ1Z0xvZygnIyBkYXNVcmk6ICcsIGRhc1VyaSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChkYXNVcmksIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGpzb25ycGM6ICcyLjAnLFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGlkOiAnZGFzLWFwaScsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgY29uc3QgZXJyID0gKGF3YWl0IHJlc3BvbnNlLmpzb24oKSkuZXJyb3IubWVzc2FnZTtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKGVycikpO1xuICAgIH1cbiAgICByZXR1cm4gKGF3YWl0IHJlc3BvbnNlLmpzb24oKSkucmVzdWx0O1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjaGFuZ2VEYXNVcmkgPSAodXJsOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBkYXNVcmkgPSB1cmw7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0UHJvb2YgPSBhc3luYyAoXG4gICAgYXNzZXRJZDogc3RyaW5nLFxuICApOiBQcm9taXNlPFJlc3VsdDxBc3NldFByb29mLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldFByb29mJywgW2Fzc2V0SWRdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXQgPSBhc3luYyAoXG4gICAgYXNzZXRJZDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxBc3NldCwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXQnLCBbYXNzZXRJZF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldHNCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyQWRkcmVzczogUHVia2V5LFxuICAgIGxpbWl0OiBudW1iZXIgPSAxMDAwLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgc29ydEJ5PzogU29ydGFibGUsXG4gICAgYmVmb3JlPzogc3RyaW5nLFxuICAgIGFmdGVyPzogc3RyaW5nLFxuICApOiBQcm9taXNlPFJlc3VsdDxBc3NldHMsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0c0J5T3duZXInLCBbXG4gICAgICAgIG93bmVyQWRkcmVzcyxcbiAgICAgICAgc29ydEJ5LFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgYmVmb3JlLFxuICAgICAgICBhZnRlcixcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldHNCeUdyb3VwID0gYXN5bmMgKFxuICAgIGdyb3VwS2V5OiBzdHJpbmcsXG4gICAgZ3JvdXBWYWx1ZTogUHVia2V5LFxuICAgIGxpbWl0OiBudW1iZXIgPSAxMDAwLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgc29ydEJ5PzogU29ydGFibGUsXG4gICAgYmVmb3JlPzogc3RyaW5nLFxuICAgIGFmdGVyPzogc3RyaW5nLFxuICApOiBQcm9taXNlPFJlc3VsdDxBc3NldHMsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0c0J5R3JvdXAnLCBbXG4gICAgICAgIGdyb3VwS2V5LFxuICAgICAgICBncm91cFZhbHVlLFxuICAgICAgICBzb3J0QnksXG4gICAgICAgIGxpbWl0LFxuICAgICAgICBwYWdlLFxuICAgICAgICBiZWZvcmUsXG4gICAgICAgIGFmdGVyLFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldFByaW9yaXR5RmVlRXN0aW1hdGUgPSBhc3luYyAoXG4gICAgYWNjb3VudE9yVHJhbnNhY3Rpb246IFB1YmtleVtdIHwgVHJhbnNhY3Rpb24sXG4gICk6IFByb21pc2U8UmVzdWx0PFByaW9yaXR5RmVlTGV2ZWxzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IGluY2x1ZGVBbGxQcmlvcml0eUZlZUxldmVsczogdHJ1ZSB9O1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgYXdhaXQgY29ubmVjdCgnZ2V0UHJpb3JpdHlGZWVFc3RpbWF0ZScsIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhY2NvdW50T3JUcmFuc2FjdGlvbixcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSlcbiAgICAgICkucHJpb3JpdHlGZWVMZXZlbHM7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgSW50ZXJuYWxDb2xsZWN0aW9uIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgR3JvdXBpbmcgfSBmcm9tICd+L3R5cGVzL2Rhcy1hcGknO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbiBhcyBDb2xsZWN0aW9uVHlwZSxcbiAgSW5wdXRDb2xsZWN0aW9uLFxuICBPcHRpb24sXG59IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbiB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDb2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGlucHV0LnRvUHVibGljS2V5KCksXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4sXG4gICAgKTogQ29sbGVjdGlvblR5cGUgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogR3JvdXBpbmdbXSk6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBvdXRwdXQuZmluZCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmdyb3VwX2tleSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmdyb3VwX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMgPyByZXMuZ3JvdXBfdmFsdWUgOiAnJztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDcmVhdG9ycywgSW5wdXRDcmVhdG9ycywgT3B0aW9uIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Db21wcmVzc2VkTmZ0SW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogSW50ZXJuYWxDcmVhdG9yc1tdID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0IS5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPixcbiAgICApOiBDcmVhdG9yc1tdIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQge1xuICBNZXRhZGF0YUFyZ3MsXG4gIFRva2VuUHJvZ3JhbVZlcnNpb24sXG4gIFRva2VuU3RhbmRhcmQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogTWV0YWRhdGFBcmdzID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0NvbXByZXNzZWROZnRJbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogZmFsc2UsXG4gICAgICAgIGlzTXV0YWJsZTogaW5wdXQuaXNNdXRhYmxlID8/IGZhbHNlLFxuICAgICAgICBlZGl0aW9uTm9uY2U6IDAsXG4gICAgICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUsXG4gICAgICAgIHRva2VuUHJvZ3JhbVZlcnNpb246IFRva2VuUHJvZ3JhbVZlcnNpb24uT3JpZ2luYWwsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJleHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUm95YWx0eSB7XG4gICAgZXhwb3J0IGNvbnN0IFRIUkVTSE9MRCA9IDEwMDtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBBc3NldEFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9uZnQnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE5mdCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogQXNzZXRBbmRPZmZjaGFpbik6IE1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLmlkLnRvU3RyaW5nKCksXG4gICAgICAgIGNvbGxlY3Rpb25NaW50OiBDb2xsZWN0aW9uLkNvbGxlY3Rpb25NaW50LmludG9Vc2VyKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmdyb3VwaW5nLFxuICAgICAgICApIGFzIFB1YmtleSxcbiAgICAgICAgYXV0aG9yaXRpZXM6IG91dHB1dC5vbmNoYWluLmF1dGhvcml0aWVzLFxuICAgICAgICByb3lhbHR5OiBSb3lhbHR5LlJveWFsdHkuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4ucm95YWx0eS5wZXJjZW50KSxcbiAgICAgICAgbmFtZTogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5tZXRhZGF0YS5uYW1lLFxuICAgICAgICBzeW1ib2w6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQubWV0YWRhdGEuc3ltYm9sLFxuICAgICAgICB1cmk6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQuanNvbl91cmksXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5jcmVhdG9ycykhLFxuICAgICAgICB0cmVlQWRkcmVzczogb3V0cHV0Lm9uY2hhaW4uY29tcHJlc3Npb24udHJlZSxcbiAgICAgICAgaXNDb21wcmVzc2VkOiBvdXRwdXQub25jaGFpbi5jb21wcmVzc2lvbi5jb21wcmVzc2VkLFxuICAgICAgICBpc011dGFibGU6IG91dHB1dC5vbmNoYWluLm11dGFibGUsXG4gICAgICAgIGlzQnVybjogb3V0cHV0Lm9uY2hhaW4uYnVybnQsXG4gICAgICAgIGVkaXRpb25Ob25jZTogb3V0cHV0Lm9uY2hhaW4uc3VwcGx5LmVkaXRpb25fbm9uY2UsXG4gICAgICAgIHByaW1hcnlTYWxlSGFwcGVuZWQ6IG91dHB1dC5vbmNoYWluLnJveWFsdHkucHJpbWFyeV9zYWxlX2hhcHBlbmVkLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpISxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgTWVtbywgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVtbyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogTWVtbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBvdXRwdXRUcmFuc2Zlcj86IFRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIGNhc2U6IHRyYW5zZmVyIHdpdGggbWVtb1xuICAgICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50ICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gPT09ICdzcGwtdG9rZW4nKSB7XG4gICAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8ubWludDtcbiAgICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5tZW1vID0gb3V0cHV0LnBhcnNlZDtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE1pbnRUbyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE1pbnRUbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQgYXMgc3RyaW5nO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBvdmVyd3JpdGVPYmplY3QsIFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7fSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IEZpbGVUeXBlLCBQcm9wZXJ0aWVzLCBTdG9yYWdlVHlwZSB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQcm9wZXJ0aWVzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gYXN5bmMgKFxuICAgICAgaW5wdXQ6IFByb3BlcnRpZXMgfCB1bmRlZmluZWQsXG4gICAgICBjYWxsYmFja0Z1bmM6IChcbiAgICAgICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICAgKSA9PiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4sXG4gICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICApOiBQcm9taXNlPFByb3BlcnRpZXM+ID0+IHtcbiAgICAgIGlmICghaW5wdXQgfHwgIWlucHV0LmZpbGVzKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgaW5wdXQuZmlsZXMubWFwKGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKCFmaWxlLmZpbGVQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNhbGxiYWNrRnVuYyhmaWxlLmZpbGVQYXRoLCBzdG9yYWdlVHlwZSwgZmVlUGF5ZXIpO1xuICAgICAgICAgIGlmIChyZXMuaXNFcnIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKHJlcy5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG92ZXJ3cml0ZU9iamVjdChmaWxlLCBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGV4aXN0c0tleTogJ2ZpbGVQYXRoJyxcbiAgICAgICAgICAgICAgd2lsbDogeyBrZXk6ICd1cmknLCB2YWx1ZTogcmVzLnZhbHVlIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICByZXR1cm4geyAuLi5pbnB1dCwgZmlsZXMgfSBhcyBQcm9wZXJ0aWVzO1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE9wdGlvbiwgVXNlcyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVXNlcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChvdXRwdXQ6IE9wdGlvbjxVc2VzPik6IFVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IElucHV0VG9rZW5NZXRhZGF0YSwgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE1ldGFkYXRhQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUb2tlbk1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0VG9rZW5NZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogbnVsbCxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBNZXRhZGF0YUFuZE9mZmNoYWluLFxuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgICApOiBUb2tlbk1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLm1pbnQudG9TdHJpbmcoKSxcbiAgICAgICAgcm95YWx0eTogb3V0cHV0Lm9uY2hhaW4uZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgbmFtZTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5uYW1lKSxcbiAgICAgICAgc3ltYm9sOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCksXG4gICAgICAgIHRva2VuQW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgdXJpOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnVyaSksXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICAgIC8vIGRlbGV0ZSBOVUxMKDB4MDApIHN0cmluZ3MgZnVuY3Rpb25cbiAgICBleHBvcnQgY29uc3QgZGVsZXRlTnVsbFN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXDAvZywgJycpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5tdWx0aXNpZ0F1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5tdWx0aXNpZ0F1dGhvcml0eTtcbiAgICAgIGhpc3Rvcnkuc2lnbmVycyA9IG91dHB1dC5wYXJzZWQuaW5mby5zaWduZXJzO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBUcmFuc2ZlcixcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gY2hlY2tcbiAgICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgaGlzdG9yeS5zb2wgPSBvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHM/LnRvU29sKCkudG9TdHJpbmcoKTtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIH0gZnJvbSAnLi9jb21wcmVzc2VkLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBOZnQgfSBmcm9tICcuL25mdCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWVtbyB9IGZyb20gJy4vbWVtbyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnLi9yZWd1bGFyLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUHJvcGVydGllcyB9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW5NZXRhZGF0YSB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vdHJhbnNmZXItY2hlY2tlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBVc2VzIH0gZnJvbSAnLi91c2VzJztcblxuZXhwb3J0IGNvbnN0IENvbnZlcnRlciA9IHtcbiAgLi4uQ29tcHJlc3NlZE5mdE1ldGFkYXRhLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTmZ0LFxuICAuLi5NZW1vLFxuICAuLi5NaW50LFxuICAuLi5SZWd1bGFyTmZ0TWV0YWRhdGEsXG4gIC4uLlByb3BlcnRpZXMsXG4gIC4uLlJveWFsdHksXG4gIC4uLlRva2VuTWV0YWRhdGEsXG4gIC4uLlRyYW5zZmVyQ2hlY2tlZCxcbiAgLi4uVHJhbnNmZXIsXG4gIC4uLlVzZXMsXG59O1xuIiwgImltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNZXRhZGF0YSwgTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBGaW5kT3B0aW9ucywgU29ydGFibGUsIFNvcnRCeSwgU29ydERpcmVjdGlvbiB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5pbXBvcnQgeyBEYXNBcGkgYXMgQXBpIH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBEYXNBcGkge1xuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZGVmYXVsdFNvcnRCeTogU29ydGFibGUgPSB7XG4gICAgc29ydEJ5OiBTb3J0QnkuUmVjZW50LFxuICAgIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24uRGVzYyxcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZmV0Y2hPZmZjaGFpbiA9IGFzeW5jICh1cmk6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJpKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBpc0NvbXByZXNzZWQ6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8UGFydGlhbDxNZXRhZGF0YT4+ID0+IHtcbiAgICBjb25zdCBhc3NldCA9IGF3YWl0IEFwaS5nZXRBc3NldChtaW50KTtcbiAgICBpZiAoYXNzZXQuaXNFcnIpIHtcbiAgICAgIHRocm93IGFzc2V0LmVycm9yO1xuICAgIH1cblxuICAgIGlmIChhc3NldC52YWx1ZS5jb21wcmVzc2lvbi5jb21wcmVzc2VkID09PSBpc0NvbXByZXNzZWQpIHtcbiAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oXG4gICAgICAgIGFzc2V0LnZhbHVlLmNvbnRlbnQuanNvbl91cmksXG4gICAgICApO1xuICAgICAgY29uc3QgbWVyZ2VkID0ge1xuICAgICAgICBvbmNoYWluOiBhc3NldC52YWx1ZSxcbiAgICAgICAgb2ZmY2hhaW46IG9mZmNoYWluLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBDb252ZXJ0ZXIuTmZ0LmludG9Vc2VyKG1lcmdlZCk7XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgb3duZXIgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0NvbXByZXNzZWRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8TmZ0TWV0YWRhdGE+ID0+IHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHNvcnRCeTogZGVmYXVsdFNvcnRCeSxcbiAgICB9O1xuICAgIGNvbnN0IHsgbGltaXQsIHBhZ2UsIHNvcnRCeSwgYmVmb3JlLCBhZnRlciB9ID0ge1xuICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG5cbiAgICBjb25zdCBhc3NldHMgPSBhd2FpdCBBcGkuZ2V0QXNzZXRzQnlPd25lcihcbiAgICAgIG93bmVyLFxuICAgICAgbGltaXQsXG4gICAgICBwYWdlLFxuICAgICAgc29ydEJ5LFxuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgKTtcbiAgICBpZiAoYXNzZXRzLmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldHMuZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBhc3NldHMudmFsdWUuaXRlbXM7XG5cbiAgICBjb25zdCBtZXRhZGF0YXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGl0ZW1zXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKVxuICAgICAgICAubWFwKGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oXG4gICAgICAgICAgICAgIGl0ZW0uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSB7XG4gICAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgZGVidWdMb2coJyMgRmFpbGVkIGZldGNoIG9mZmNoYWluIHVybDogJywgaXRlbS5jb250ZW50Lmpzb25fdXJpKTtcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0ZXIuTmZ0LmludG9Vc2VyKHtcbiAgICAgICAgICAgICAgb25jaGFpbjogaXRlbSxcbiAgICAgICAgICAgICAgb2ZmY2hhaW46IHt9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiBhc3NldHMudmFsdWUucGFnZSxcbiAgICAgIHRvdGFsOiBhc3NldHMudmFsdWUudG90YWwsXG4gICAgICBsaW1pdDogYXNzZXRzLnZhbHVlLmxpbWl0LFxuICAgICAgbWV0YWRhdGFzLFxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IGNvbGxlY3Rpb24gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0NvbXByZXNzZWQsXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlDb2xsZWN0aW9uID0gYXN5bmMgKFxuICAgIGNvbGxlY3Rpb25NaW50OiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8TmZ0TWV0YWRhdGE+ID0+IHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHNvcnRCeTogZGVmYXVsdFNvcnRCeSxcbiAgICB9O1xuICAgIGNvbnN0IHsgbGltaXQsIHBhZ2UsIHNvcnRCeSwgYmVmb3JlLCBhZnRlciB9ID0ge1xuICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG5cbiAgICBjb25zdCBhc3NldHMgPSBhd2FpdCBBcGkuZ2V0QXNzZXRzQnlHcm91cChcbiAgICAgICdjb2xsZWN0aW9uJyxcbiAgICAgIGNvbGxlY3Rpb25NaW50LFxuICAgICAgbGltaXQsXG4gICAgICBwYWdlLFxuICAgICAgc29ydEJ5LFxuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgKTtcbiAgICBpZiAoYXNzZXRzLmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldHMuZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBhc3NldHMudmFsdWUuaXRlbXM7XG5cbiAgICBjb25zdCBtZXRhZGF0YXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGl0ZW1zXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKVxuICAgICAgICAubWFwKGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2ZmY2hhaW46IE9mZmNoYWluID0gYXdhaXQgZmV0Y2hPZmZjaGFpbihpdGVtLmNvbnRlbnQuanNvbl91cmkpO1xuICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICBvZmZjaGFpbjogb2ZmY2hhaW4sXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgICAgICB9KSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiBhc3NldHMudmFsdWUucGFnZSxcbiAgICAgIHRvdGFsOiBhc3NldHMudmFsdWUudG90YWwsXG4gICAgICBsaW1pdDogYXNzZXRzLnZhbHVlLmxpbWl0LFxuICAgICAgbWV0YWRhdGFzLFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgRGFzQXBpIGFzIEFwaSB9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7IERhc0FwaSBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcblxuZXhwb3J0IGNvbnN0IERhc0FwaSA9IHtcbiAgLi4uQXBpLFxuICAuLi5GaW5kLFxufTtcbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgS2V5cGFpcixcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUsIFN1Ym1pdE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgTWludDxUID0gUHVia2V5PiBpbXBsZW1lbnRzIE1pbnRTdHJ1Y3R1cmU8VD4ge1xuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICAgIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgICBmZWVQYXllcjogS2V5cGFpcjtcbiAgICBkYXRhOiBUO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICAgIGZlZVBheWVyOiBLZXlwYWlyLFxuICAgICAgZGF0YTogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWludCkpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBNaW50SW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgaWYgKE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50ID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgICAgICAgZGVidWdMb2coJyMgQ2hhbmdlIG1ldGFwbGV4IGNsdXN0ZXIgb24gbWFpbm5ldC1iZXRhJyk7XG4gICAgICAgICAgTm9kZS5jaGFuZ2VDb25uZWN0aW9uKHsgY2x1c3RlcjogQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXggfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pc1ByaW9yaXR5RmVlKSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IFByaW9yaXR5RmVlLlByaW9yaXR5RmVlLnN1Ym1pdChcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtcbiAgUGFydGlhbFNpZ25TdHJ1Y3R1cmUsXG4gIFBhcnRpYWxTaWduU3VibWl0T3B0aW9ucyxcbn0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgUGFydGlhbFNpZ24gaW1wbGVtZW50cyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB7XG4gICAgaGV4SW5zdHJ1Y3Rpb246IHN0cmluZztcbiAgICBkYXRhPzogUHVia2V5O1xuICAgIGNhblN1Ym1pdD86IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihpbnN0cnVjdGlvbnM6IHN0cmluZywgbWludD86IFB1YmtleSwgY2FuU3VibWl0ID0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaGV4SW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLmRhdGEgPSBtaW50O1xuICAgICAgdGhpcy5jYW5TdWJtaXQgPSBjYW5TdWJtaXQ7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxQYXJ0aWFsU2lnblN1Ym1pdE9wdGlvbnM+ID0ge30sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJ0aWFsU2lnbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBQYXJ0aWFsU2lnbkluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLmZlZVBheWVyKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ05lZWQgZmVlUGF5ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlY29kZSA9IEJ1ZmZlci5mcm9tKHRoaXMuaGV4SW5zdHJ1Y3Rpb24sICdoZXgnKTtcbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBUcmFuc2FjdGlvbi5mcm9tKGRlY29kZSk7XG4gICAgICAgIHRyYW5zYWN0aW9uLnBhcnRpYWxTaWduKG9wdGlvbnMuZmVlUGF5ZXIhLnRvS2V5cGFpcigpKTtcblxuICAgICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHdpcmVUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uLnNlcmlhbGl6ZSgpO1xuICAgICAgICByZXR1cm4gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuc2VuZFJhd1RyYW5zYWN0aW9uKFxuICAgICAgICAgIHdpcmVUcmFuc2FjdGlvbixcbiAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXksIFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuLy8gQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGNvbnN0IExPV19WQUxVRSA9IDEyNzsgLy8gMHg3ZlxuICBjb25zdCBISUdIX1ZBTFVFID0gMTYzODM7IC8vIDB4M2ZmZlxuICBjb25zdCBNQVhfVFJBTlNBQ1RJT05fU0laRSA9IDEyMzI7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IGhlYWRlciBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXkgaGVhZGVyXG4gICAqL1xuICBjb25zdCBjb21wYWN0SGVhZGVyID0gKG46IG51bWJlcikgPT5cbiAgICBuIDw9IExPV19WQUxVRSA/IDEgOiBuIDw9IEhJR0hfVkFMVUUgPyAyIDogMztcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcGFyYW0gc2l6ZSBieXRlcyBwZXIgZWFjaCBlbGVtZW50XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXlcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RBcnJheVNpemUgPSAobjogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+XG4gICAgY29tcGFjdEhlYWRlcihuKSArIG4gKiBzaXplO1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdHhzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlVHhTaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyUGsgPSBbZmVlUGF5ZXIudG9CYXNlNTgoKV07XG5cbiAgICBjb25zdCBzaWduZXJzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuICAgIGNvbnN0IGFjY291bnRzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuXG4gICAgY29uc3QgaXhzU2l6ZSA9IHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaXgpID0+IHtcbiAgICAgIGl4LmtleXMuZm9yRWFjaCgoeyBwdWJrZXksIGlzU2lnbmVyIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGsgPSBwdWJrZXkudG9CYXNlNTgoKTtcbiAgICAgICAgaWYgKGlzU2lnbmVyKSBzaWduZXJzLmFkZChwayk7XG4gICAgICAgIGFjY291bnRzLmFkZChwayk7XG4gICAgICB9KTtcblxuICAgICAgYWNjb3VudHMuYWRkKGl4LnByb2dyYW1JZC50b0Jhc2U1OCgpKTtcblxuICAgICAgY29uc3QgbkluZGV4ZXMgPSBpeC5rZXlzLmxlbmd0aDtcbiAgICAgIGNvbnN0IG9wYXF1ZURhdGEgPSBpeC5kYXRhLmxlbmd0aDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgYWNjICtcbiAgICAgICAgMSArIC8vIFBJRCBpbmRleFxuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG5JbmRleGVzLCAxKSArXG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUob3BhcXVlRGF0YSwgMSlcbiAgICAgICk7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgY29tcGFjdEFycmF5U2l6ZShzaWduZXJzLnNpemUsIDY0KSArIC8vIHNpZ25hdHVyZXNcbiAgICAgIDMgKyAvLyBoZWFkZXJcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoYWNjb3VudHMuc2l6ZSwgMzIpICsgLy8gYWNjb3VudHNcbiAgICAgIDMyICsgLy8gYmxvY2toYXNoXG4gICAgICBjb21wYWN0SGVhZGVyKHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5sZW5ndGgpICsgLy8gaW5zdHJ1Y3Rpb25zXG4gICAgICBpeHNTaXplXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgbWF4IHRyYW5zYWN0aW9uIHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBpc092ZXJUcmFuc2FjdGlvblNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBjYWxjdWxhdGVUeFNpemUodHJhbnNhY3Rpb24sIGZlZVBheWVyKSA+IE1BWF9UUkFOU0FDVElPTl9TSVpFO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBCYXRjaCB9IGZyb20gJy4vYmF0Y2gnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbW1vbiB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQYXJ0aWFsU2lnbiB9IGZyb20gJy4vcGFydGlhbC1zaWduJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDYWxjdWxhdGVUeHNpemUgfSBmcm9tICcuL2NhbGN1bGF0ZS10eHNpemUnO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uQnVpbGRlciA9IHtcbiAgLi4uQmF0Y2gsXG4gIC4uLkNhbGN1bGF0ZVR4c2l6ZSxcbiAgLi4uTWludCxcbiAgLi4uQ29tbW9uLFxuICAuLi5QYXJ0aWFsU2lnbixcbiAgLi4uUHJpb3JpdHlGZWUsXG59O1xuIiwgImltcG9ydCB7IEFueU9iamVjdCB9IGZyb20gJ34vdHlwZXMvdXRpbHMnO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnLi9yZXN1bHQnO1xuXG4vKipcbiAqIGNvbnZlcnQgYnVmZmVyIHRvIEFycmF5XG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlclxuICogQHJldHVybnMgbnVtYmVyW11cbiAqL1xuZXhwb3J0IGNvbnN0IGJ1ZmZlclRvQXJyYXkgPSAoYnVmZmVyOiBCdWZmZXIpOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IG51bXMgPSBbXTtcbiAgZm9yIChjb25zdCBieXRlIG9mIGJ1ZmZlcikge1xuICAgIG51bXMucHVzaChidWZmZXJbYnl0ZV0pO1xuICB9XG4gIHJldHVybiBudW1zO1xufTtcblxuLyoqXG4gKiBPdmVyd3JpdGUgSlMgT2JqZWN0XG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmplY3RcbiAqIEBwYXJhbSB7T3ZlcndyaXRlT2JqZWN0W119IHRhcmdldHNcbiAqIEByZXR1cm5zIE9iamVjdFxuICovXG5leHBvcnQgY29uc3Qgb3ZlcndyaXRlT2JqZWN0ID0gKFxuICBvYmplY3Q6IHVua25vd24sXG4gIHRhcmdldHM6IHtcbiAgICBleGlzdHNLZXk6IHN0cmluZztcbiAgICB3aWxsOiB7IGtleTogc3RyaW5nOyB2YWx1ZTogdW5rbm93biB9O1xuICB9W10sXG4pOiB1bmtub3duID0+IHtcbiAgY29uc3QgdGhhdDogQW55T2JqZWN0ID0gb2JqZWN0IGFzIEFueU9iamVjdDtcbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBkZWxldGUgdGhhdFt0YXJnZXQuZXhpc3RzS2V5XTtcbiAgICB0aGF0W3RhcmdldC53aWxsLmtleV0gPSB0YXJnZXQud2lsbC52YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0aGF0O1xufTtcblxuLyoqXG4gKiBEaXNwbGF5IGxvZyBmb3Igc29sYW5hLXN1aXRlLWNvbmZpZy5qc1xuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTFcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTJcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTNcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTRcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnTG9nID0gKFxuICBkYXRhMTogdW5rbm93bixcbiAgZGF0YTI6IHVua25vd24gPSAnJyxcbiAgZGF0YTM6IHVua25vd24gPSAnJyxcbiAgZGF0YTQ6IHVua25vd24gPSAnJyxcbik6IHZvaWQgPT4ge1xuICBpZiAoQ29uc3RhbnRzLmlzRGVidWdnaW5nID09PSAndHJ1ZScgfHwgcHJvY2Vzcy5lbnYuREVCVUcgPT09ICd0cnVlJykge1xuICAgIGNvbnNvbGUubG9nKCdbREVCVUddJywgZGF0YTEsIGRhdGEyLCBkYXRhMywgZGF0YTQpO1xuICB9XG59O1xuXG4vKipcbiAqIHNsZWVwIHRpbWVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNlY1xuICogQHJldHVybnMgUHJvbWlzZTxudW1iZXI+XG4gKi9cbmV4cG9ydCBjb25zdCBzbGVlcCA9IGFzeW5jIChzZWM6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCBzZWMgKiAxMDAwKSk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucyAhPSBudWxsICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlICE9IG51bGxcbiAgKTtcbn07XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuZXhwb3J0IGNvbnN0IGlzUHJvbWlzZSA9IChvYmo6IHVua25vd24pOiBvYmogaXMgUHJvbWlzZTx1bmtub3duPiA9PiB7XG4gIHJldHVybiAoXG4gICAgISFvYmogJiZcbiAgICAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiZcbiAgICB0eXBlb2YgKG9iaiBhcyBhbnkpLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgKTtcbn07XG5cbi8qKlxuICogVHJ5IGFzeW5jIG1vbmFkXG4gKlxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8VCwgRT4+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgYXN5bmNibG9jazogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8UmVzdWx0PFQsIEU+PjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihibG9jazogKCkgPT4gVCk6IFJlc3VsdDxULCBFPjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgaW5wdXQ6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBSZXN1bHQ8VCwgRXJyb3I+IHwgUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdiA9IGlucHV0KCk7XG4gICAgaWYgKGlzUHJvbWlzZSh2KSkge1xuICAgICAgcmV0dXJuIHYudGhlbihcbiAgICAgICAgKHg6IFQpID0+IFJlc3VsdC5vayh4KSxcbiAgICAgICAgKGVycjogRSkgPT4gUmVzdWx0LmVycihlcnIpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayh2KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoZSBhcyBzdHJpbmcpKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZmluYWxseUlucHV0KSB7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5hbGx5IGlucHV0OicsIGZpbmFsbHlJbnB1dCk7XG4gICAgICBmaW5hbGx5SW5wdXQoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8dW5kZWZpbmVkfSBjcmVhdGVkX2F0XG4gKiBAcmV0dXJucyBEYXRlIHwgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSA9IChcbiAgY3JlYXRlZF9hdDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuKTogRGF0ZSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChjcmVhdGVkX2F0KSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGNyZWF0ZWRfYXQgKiAxMDAwKTtcbiAgfVxuICByZXR1cm47XG59O1xuXG4vKipcbiAqIEdldCB1bml4IHRpbWVzdGFtcFxuICpcbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5leHBvcnQgY29uc3QgdW5peFRpbWVzdGFtcCA9ICgpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xufTtcbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBDb21tb25TdHJ1Y3R1cmUsXG4gIE1pbnRTdHJ1Y3R1cmUsXG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxuICBTdWJtaXRPcHRpb25zLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuXG4gIHVud3JhcCgpOiBUO1xuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFU7XG4gIHVud3JhcDxVLCBWPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVik6IFUgfCBWO1xuICAvLyB1bmlmaWVkLXNpZ25hdHVyZXMuIGludG8gbGluZSAxMFxuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFUpOiBVO1xuICB1bndyYXAob2s/OiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gdW5rbm93bik6IHVua25vd24ge1xuICAgIGNvbnN0IHIgPSB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rID8gb2sodmFsdWUpIDogdmFsdWUpLFxuICAgICAgKGVycm9yKSA9PiAoZXJyID8gUmVzdWx0Lm9rKGVycihlcnJvcikpIDogUmVzdWx0LmVycihlcnJvcikpLFxuICAgICk7XG4gICAgaWYgKHIuaXNFcnIpIHtcbiAgICAgIHRocm93IHIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByLnZhbHVlO1xuICB9XG5cbiAgLy8vLyBtYXAgLy8vL1xuICBtYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFJlc3VsdDxVLCBFPjtcbiAgbWFwPFUsIEYgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gVSxcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gRixcbiAgKTogUmVzdWx0PFUsIEY+O1xuICBtYXAob2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiBFcnJvcik6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIgPyBlcnIoZXJyb3IpIDogZXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8vIGNoYWluIC8vLy9cbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc2luZ2xlIFRyYW5zYWN0aW9uQnVpbGRlciAvLy8vXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgYXN5bmMgc3VibWl0KFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4ge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMubWFwKFxuICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgIGRlYnVnTG9nKCcjIHJlc3VsdCBzaW5nbGUgc3VibWl0OiAnLCBvayk7XG4gICAgICAgIGNvbnN0IG9iaiA9IG9rIGFzXG4gICAgICAgICAgfCBDb21tb25TdHJ1Y3R1cmVcbiAgICAgICAgICB8IE1pbnRTdHJ1Y3R1cmVcbiAgICAgICAgICB8IFBhcnRpYWxTaWduU3RydWN0dXJlO1xuICAgICAgICByZXR1cm4gYXdhaXQgb2JqLnN1Ym1pdChvcHRpb25zKTtcbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIocmVzLmVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy52YWx1ZTtcbiAgfVxufVxuXG4vLy8gTXVsdGlwbGUgVHJhbnNhY3Rpb25CdWlsZGVyIC8vLy9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgc3VibWl0KFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPixcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PjtcbiAgfVxufVxuXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24ob3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPikge1xuICBpZiAob3B0aW9ucy5mZWVQYXllcikge1xuICAgIGxldCBpID0gMTtcbiAgICBmb3IgYXdhaXQgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgICBpZiAob2JqLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9IGVsc2UgaWYgKG9iai52YWx1ZS5jYW5TdWJtaXQpIHtcbiAgICAgICAgZGVidWdMb2coJyMgUmVzdWx0IGJhdGNoIGNhblN1Ym1pdCcpO1xuICAgICAgICBjb25zdCBzaWcgPSBhd2FpdCAob2JqIGFzIFBhcnRpYWxTaWduU3RydWN0dXJlKS5zdWJtaXQob3B0aW9ucyk7XG4gICAgICAgIGlmIChzaWcuaXNFcnIpIHtcbiAgICAgICAgICByZXR1cm4gc2lnO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKHNpZy52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggb3RoZXIgdGhhbiBjYW5TdWJtaXQnKTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09IGkpIHtcbiAgICAgICAgICAvLyBsYXN0IG9iamVjdFxuICAgICAgICAgIHJldHVybiBvYmouc3VibWl0KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIG9iai5zdWJtaXQob3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGluc3RydWN0aW9uczogQ29tbW9uU3RydWN0dXJlIHwgTWludFN0cnVjdHVyZVtdID0gW107XG4gICAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoJ09ubHkgQXJyYXkgSW5zdHJ1Y3Rpb24gb2JqZWN0JykpO1xuICAgICAgfVxuICAgIH1cbiAgICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggc3VibWl0OiAnLCBpbnN0cnVjdGlvbnMpO1xuICAgIGNvbnN0IGJhdGNoT3B0aW9ucyA9IHtcbiAgICAgIGZlZVBheWVyOiBvcHRpb25zLmZlZVBheWVyLFxuICAgICAgaXNQcmlvcml0eUZlZTogb3B0aW9ucy5pc1ByaW9yaXR5RmVlLFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBpbnN0cnVjdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaCgpLnN1Ym1pdChiYXRjaE9wdGlvbnMpO1xuICB9XG59O1xuXG5jbGFzcyBJbnRlcm5hbE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSB0cnVlO1xuICByZWFkb25seSBpc0VyciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBfZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxFcnI8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IGZhbHNlO1xuICByZWFkb25seSBpc0VyciA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBfb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlc3VsdCB7XG4gIGV4cG9ydCB0eXBlIE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbE9rPFQsIEU+O1xuICBleHBvcnQgdHlwZSBFcnI8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsRXJyPFQsIEU+O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBvazxULCBFIGV4dGVuZHMgRXJyb3I+KHZhbHVlOiBUKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsT2sodmFsdWUpO1xuICB9XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yPzogRSk6IFJlc3VsdDxULCBFPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I6IEUpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnIoZXJyb3IgfHwgRXJyb3IoKSk7XG4gIH1cblxuICB0eXBlIFUgPSBSZXN1bHQ8dW5rbm93bj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgICBSMTUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNCwgUjE1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgICAgT2tUeXBlPFIxNT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgICB8IFIxNVxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxM10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgUjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTEgfCBSMTIgfCBSMTNcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+LCBPa1R5cGU8UjU+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFUsIFIzIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjNdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjM+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMl0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPl0sIEVyclR5cGU8UjAgfCBSMSB8IFIyPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMV0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPl0sIEVyclR5cGU8UjAgfCBSMT4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjBdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD5dLCBFcnJUeXBlPFIwPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiBbXSk6IFJlc3VsdDxbXT47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8VCBleHRlbmRzIFVbXSB8IFJlY29yZDxzdHJpbmcsIFU+PihcbiAgICBvYmo6IFQsXG4gICk6IFJlc3VsdDxcbiAgICB7IFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PGluZmVyIEk+ID8gSSA6IG5ldmVyIH0sXG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT4gPyBFIDogbmV2ZXI7XG4gICAgfVtrZXlvZiBUXVxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogdW5rbm93bik6IHVua25vd24ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIGNvbnN0IHJlc0FyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaikge1xuICAgICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBpdGVtIGFzIHVua25vd247XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlc0Fycik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSAob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KVtrZXldO1xuICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICByZXNba2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQub2socmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yID0gRXJyb3I+ID1cbiAgfCBSZXN1bHQuT2s8VCwgRT5cbiAgfCBSZXN1bHQuRXJyPFQsIEU+O1xuXG50eXBlIE9rVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgTz4gPyBPIDogbmV2ZXI7XG50eXBlIEVyclR5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+XG4gID8gRVxuICA6IG5ldmVyO1xuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29tbWl0bWVudCwgQ29ubmVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTm9kZSB7XG4gIGNvbnN0IHNldHRlZCA9IHtcbiAgICBjbHVzdGVyVXJsOiAnJyxcbiAgICBjb21taXRtZW50OiBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgICBjdXN0b21DbHVzdGVyVXJsOiBbXSBhcyBzdHJpbmdbXSxcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvbiA9ICgpOiBDb25uZWN0aW9uID0+IHtcbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbihzZXR0ZWQuY2x1c3RlclVybCwgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjaGFuZ2VDb25uZWN0aW9uID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjb21taXRtZW50PzogQ29tbWl0bWVudDtcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiB2b2lkID0+IHtcbiAgICAvLyBpbml0aWFsaXplXG4gICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSAnJztcbiAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IFtdO1xuICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG5cbiAgICBjb25zdCB7IGNsdXN0ZXIsIGNvbW1pdG1lbnQsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuICAgIGlmIChjb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IGNvbW1pdG1lbnQ7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjb21taXRtZW50OiAnLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gICAgfVxuXG4gICAgaWYgKGNsdXN0ZXIpIHtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjbHVzdGVyOiBjbHVzdGVyIH0pO1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY2x1c3RlclVybDogJywgc2V0dGVkLmNsdXN0ZXJVcmwpO1xuICAgIH1cblxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsKSB7XG4gICAgICBkZWJ1Z0xvZygnIyBjdXN0b21DbHVzdGVyVXJsOiAnLCBjdXN0b21DbHVzdGVyVXJsKTtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjdXN0b21DbHVzdGVyVXJsIH0pO1xuICAgICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBjdXN0b21DbHVzdGVyVXJsO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIE5vZGUgY2hhbmdlIGNsdXN0ZXIsIGN1c3RvbSBjbHVzdGVyIHVybDogJyxcbiAgICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgY29uZmlybWVkU2lnID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgIGNvbW1pdG1lbnQ6IENvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgKSA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhdGVzdEJsb2NraGFzaCA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgcmV0dXJuIGF3YWl0IGNvbm5lY3Rpb25cbiAgICAgIC5jb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBibG9ja2hhc2g6IGxhdGVzdEJsb2NraGFzaC5ibG9ja2hhc2gsXG4gICAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGxhdGVzdEJsb2NraGFzaC5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1pdG1lbnQsXG4gICAgICApXG4gICAgICAudGhlbihSZXN1bHQub2spXG4gICAgICAuY2F0Y2goUmVzdWx0LmVycik7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgQWNjb3VudE1ldGEsXG4gIFB1YmxpY0tleSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBEYXNBcGkgfSBmcm9tICd+L2Rhcy1hcGknO1xuaW1wb3J0IHsgY3JlYXRlRGVsZWdhdGVJbnN0cnVjdGlvbiB9IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHtcbiAgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LFxuICBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICBTUExfTk9PUF9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC1hY2NvdW50LWNvbXByZXNzaW9uJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgRGVsZWdhdGVPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBleHBvcnQgY29uc3QgY3JlYXRlRGVsZWFnYXRlID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IFB1YmxpY0tleSxcbiAgICBuZXdEZWxlZ2F0ZTogUHVibGljS2V5IHwgbnVsbCxcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uPiA9PiB7XG4gICAgY29uc3QgcnBjQXNzZXRQcm9vZiA9IGF3YWl0IERhc0FwaS5nZXRBc3NldFByb29mKGFzc2V0SWQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgcnBjQXNzZXQgPSBhd2FpdCBEYXNBcGkuZ2V0QXNzZXQoYXNzZXRJZC50b1N0cmluZygpKTtcbiAgICBpZiAocnBjQXNzZXRQcm9vZi5pc0VyciB8fCBycGNBc3NldC5pc0Vycikge1xuICAgICAgdGhyb3cgRXJyb3IoJ1Jpc2UgZXJyb3Igd2hlbiBnZXQgYXNzZXQgcHJvb2Ygb3IgYXNzZXQnKTtcbiAgICB9XG4gICAgY29uc3QgY29tcHJlc3Npb24gPSBycGNBc3NldC52YWx1ZS5jb21wcmVzc2lvbjtcbiAgICBjb25zdCBvd25lcnNoaXAgPSBycGNBc3NldC52YWx1ZS5vd25lcnNoaXA7XG4gICAgY29uc3QgYXNzZXRQcm9vZiA9IHJwY0Fzc2V0UHJvb2YudmFsdWU7XG4gICAgY29uc3QgdHJlZU93bmVyID0gYXNzZXRQcm9vZi50cmVlX2lkLnRvUHVibGljS2V5KCk7XG5cbiAgICBjb25zdCB0cmVlQXV0aG9yaXR5ID0gQWNjb3VudC5QZGEuZ2V0VHJlZUF1dGhvcml0eShhc3NldFByb29mLnRyZWVfaWQpO1xuICAgIGNvbnN0IHByZXZpb3VzTGVhZkRlbGVnYXRlID0gb3duZXJzaGlwLmRlbGVnYXRlXG4gICAgICA/IG93bmVyc2hpcC5kZWxlZ2F0ZS50b1B1YmxpY0tleSgpXG4gICAgICA6IG93bmVyc2hpcC5vd25lci50b1B1YmxpY0tleSgpO1xuICAgIGNvbnN0IG5ld0xlYWZEZWxlZ2F0ZSA9IG5ld0RlbGVnYXRlID8gbmV3RGVsZWdhdGUgOiBwcmV2aW91c0xlYWZEZWxlZ2F0ZTtcbiAgICBjb25zdCB0cmVlQWNjb3VudCA9IGF3YWl0IENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudC5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgIHRyZWVPd25lcixcbiAgICApO1xuICAgIGNvbnN0IGNhbm9weURlcHRoID0gdHJlZUFjY291bnQuZ2V0Q2Fub3B5RGVwdGgoKTtcbiAgICBjb25zdCBzbGljZWRQcm9vZjogQWNjb3VudE1ldGFbXSA9IGFzc2V0UHJvb2YucHJvb2ZcbiAgICAgIC5tYXAoKG5vZGU6IHN0cmluZykgPT4gKHtcbiAgICAgICAgcHVia2V5OiBub2RlLnRvUHVibGljS2V5KCksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9KSlcbiAgICAgIC5zbGljZSgwLCBhc3NldFByb29mLnByb29mLmxlbmd0aCAtIChjYW5vcHlEZXB0aCA/IGNhbm9weURlcHRoIDogMCkpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZURlbGVnYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIHRyZWVBdXRob3JpdHksXG4gICAgICAgIGxlYWZPd25lcjogb3duZXJzaGlwLm93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHByZXZpb3VzTGVhZkRlbGVnYXRlLFxuICAgICAgICBuZXdMZWFmRGVsZWdhdGUsXG4gICAgICAgIG1lcmtsZVRyZWU6IGFzc2V0UHJvb2YudHJlZV9pZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBsb2dXcmFwcGVyOiBTUExfTk9PUF9QUk9HUkFNX0lELFxuICAgICAgICBjb21wcmVzc2lvblByb2dyYW06IFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gICAgICAgIGFuY2hvclJlbWFpbmluZ0FjY291bnRzOiBzbGljZWRQcm9vZixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IFsuLi5hc3NldFByb29mLnJvb3QudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgZGF0YUhhc2g6IFsuLi5jb21wcmVzc2lvbi5kYXRhX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgY3JlYXRvckhhc2g6IFtcbiAgICAgICAgICAuLi5jb21wcmVzc2lvbi5jcmVhdG9yX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpLFxuICAgICAgICBdLFxuICAgICAgICBub25jZTogY29tcHJlc3Npb24ubGVhZl9pZCxcbiAgICAgICAgaW5kZXg6IGNvbXByZXNzaW9uLmxlYWZfaWQsXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBkZWxlZ2F0ZVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgIC8vIHRhcmdldCBtaW50XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgIC8vIG5ldyBkZWxlZ2F0ZSBvciBwcmV2aW91cyBkZWxlZ2F0ZSBzaWduZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPERlbGVnYXRlT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHNldERlbGVnYXRlID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RGVsZWdhdGVPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3RGVsZWdhdGUgPSBvcHRpb25zLmRlbGVnYXRlXG4gICAgICAgID8gb3B0aW9ucy5kZWxlZ2F0ZS50b1B1YmxpY0tleSgpXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBjcmVhdGVEZWxlYWdhdGUobWludC50b1B1YmxpY0tleSgpLCBuZXdEZWxlZ2F0ZSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oW2luc3RdLCBbb3duZXIudG9LZXlwYWlyKCldKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRGFzQXBpIH0gZnJvbSAnfi9kYXMtYXBpJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBNZXRhZGF0YSwgTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBGaW5kT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBvd25lciBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RmluZE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgRGFzQXBpLmZpbmRCeU93bmVyKG93bmVyLCB0cnVlLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbDxNZXRhZGF0YT4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IERhc0FwaS5maW5kQnlNaW50KG1pbnQsIHRydWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBjb2xsZWN0aW9uIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IGNvbGxlY3Rpb25NaW50XG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlDb2xsZWN0aW9uID0gYXN5bmMgKFxuICAgIGNvbGxlY3Rpb25NaW50OiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxGaW5kT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIERhc0FwaS5maW5kQnlDb2xsZWN0aW9uKGNvbGxlY3Rpb25NaW50LCB0cnVlLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIERlbGVnYXRlIH0gZnJvbSAnLi9kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgR2Fzc0xlc3NEZWxlZ2F0ZU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2NvbXByZXNzZWQtbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBkZWxlZ2F0ZSB3aXRoIGdhcy1sZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICAgKiBAcGFyYW0ge1B1YmtleX0gbmV3RGVsZWdhdGVcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEdhc3NMZXNzRGVsZWdhdGVPcHRpb25zPiB9IG9wdGlvbnNcbiAgICogQHJldHVybiB7UHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25UcmFuc2FjdGlvbiwgRXJyb3I+Pn1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzRGVsZWdhdGUgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgbmV3RGVsZWdhdGU6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEdhc3NMZXNzRGVsZWdhdGVPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbnN0ID0gYXdhaXQgRGVsZWdhdGUuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ld0RlbGVnYXRlLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogbmV3RGVsZWdhdGUudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgdHguYWRkKGluc3QpO1xuXG4gICAgICBpZiAob3B0aW9ucy5pc1ByaW9yaXR5RmVlKSB7XG4gICAgICAgIHR4LmFkZChcbiAgICAgICAgICBhd2FpdCBUcmFuc2FjdGlvbkJ1aWxkZXIuUHJpb3JpdHlGZWUuY3JlYXRlUHJpb3JpdHlGZWVJbnN0cnVjdGlvbih0eCksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHR4LnBhcnRpYWxTaWduKG93bmVyLnRvS2V5cGFpcigpKTtcbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKFxuICAgICAgICB0eFxuICAgICAgICAgIC5zZXJpYWxpemUoe1xuICAgICAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRvU3RyaW5nKCdoZXgnKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBEZWxlZ2F0ZSB9IGZyb20gJy4vZ2FzLWxlc3MtZGVsZWdhdGUnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgR2Fzc0xlc3NUcmFuc2Zlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2NvbXByZXNzZWQtbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgLyoqXG4gICAqIFRyYW5zZmVyIHdpdGggZ2FzLWxlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0XG4gICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8R2Fzc0xlc3NUcmFuc2Zlck9wdGlvbnM+IH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25UcmFuc2FjdGlvbltdLCBFcnJvcj4+fVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEdhc3NMZXNzVHJhbnNmZXJPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+W10+ID0+IHtcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IGF3YWl0IERlbGVnYXRlLmdhc0xlc3NEZWxlZ2F0ZShtaW50LCBvd25lciwgZmVlUGF5ZXIpO1xuICAgIGRlbGVnYXRlLnVud3JhcCgpLmNhblN1Ym1pdCA9IHRydWU7XG5cbiAgICBjb25zdCB0cmFuc2ZlciA9IGF3YWl0IFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICB0eC5hZGQoXG4gICAgICAgIGF3YWl0IFRyYW5zZmVyLmNyZWF0ZVRyYW5zZmVyKFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogb3duZXIgfSkucHVia2V5LFxuICAgICAgICAgIGRlc3QsXG4gICAgICAgICAgZmVlUGF5ZXIsXG4gICAgICAgICksXG4gICAgICApO1xuXG4gICAgICBpZiAob3B0aW9ucy5pc1ByaW9yaXR5RmVlKSB7XG4gICAgICAgIHR4LmFkZChcbiAgICAgICAgICBhd2FpdCBUcmFuc2FjdGlvbkJ1aWxkZXIuUHJpb3JpdHlGZWUuY3JlYXRlUHJpb3JpdHlGZWVJbnN0cnVjdGlvbih0eCksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKFxuICAgICAgICB0eFxuICAgICAgICAgIC5zZXJpYWxpemUoe1xuICAgICAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRvU3RyaW5nKCdoZXgnKSxcbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtkZWxlZ2F0ZSwgdHJhbnNmZXJdO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBEYXNBcGkgfSBmcm9tICd+L2Rhcy1hcGknO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zZmVySW5zdHJ1Y3Rpb24gfSBmcm9tICdtcGwtYnViYmxlZ3VtLWluc3RydWN0aW9uJztcbmltcG9ydCB7XG4gIENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudCxcbiAgU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgU1BMX05PT1BfUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtYWNjb3VudC1jb21wcmVzc2lvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVibGljS2V5LCBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBhc3NldElkOiBQdWJrZXksXG4gICAgYXNzZXRJZE93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIGRlbGVnYXRlPzogUHVia2V5LFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24+ID0+IHtcbiAgICBjb25zdCBhc3NldFByb29mID0gYXdhaXQgRGFzQXBpLmdldEFzc2V0UHJvb2YoYXNzZXRJZCk7XG4gICAgaWYgKGFzc2V0UHJvb2YuaXNFcnIpIHtcbiAgICAgIHRocm93IGFzc2V0UHJvb2YuZXJyb3I7XG4gICAgfSBlbHNlIGlmIChhc3NldFByb29mLmlzT2sgJiYgYXNzZXRQcm9vZi52YWx1ZS5wcm9vZi5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKCdQcm9vZiBpcyBlbXB0eS4gTWF5IGJlIHNldCBSZWd1bGFyIE5GVD8nKTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3NldCA9IGF3YWl0IERhc0FwaS5nZXRBc3NldChhc3NldElkKTtcbiAgICBpZiAoYXNzZXQuaXNFcnIpIHtcbiAgICAgIHRocm93IGFzc2V0LmVycm9yO1xuICAgIH0gZWxzZSBpZiAoYXNzZXQuaXNPayAmJiBhc3NldC52YWx1ZS5vd25lcnNoaXAub3duZXIgIT09IGFzc2V0SWRPd25lcikge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIGBORlQgaXMgbm90IG93bmVkIGJ5IHRoZSBleHBlY3RlZCBvd25lcjogY3VycmVudDogJHthc3NldC52YWx1ZS5vd25lcnNoaXAub3duZXJ9LCBleHBlY3RlZDogJHthc3NldElkT3duZXJ9YCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZGVidWdMb2coJyMgYXNzZXRQcm9vZjogJywgYXNzZXRQcm9vZi52YWx1ZSk7XG4gICAgZGVidWdMb2coJyMgb3duZXJzaGlwOiAnLCBhc3NldC52YWx1ZS5vd25lcnNoaXApO1xuICAgIGRlYnVnTG9nKCcjIGF1dGhvcml0aWVzOiAnLCBhc3NldC52YWx1ZS5hdXRob3JpdGllcyk7XG5cbiAgICBjb25zdCBjb21wcmVzc2lvbiA9IGFzc2V0LnZhbHVlLmNvbXByZXNzaW9uO1xuICAgIGNvbnN0IG93bmVyc2hpcCA9IGFzc2V0LnZhbHVlLm93bmVyc2hpcDtcbiAgICBjb25zdCBwcm9vZiA9IGFzc2V0UHJvb2YudmFsdWUucHJvb2Y7XG4gICAgY29uc3QgbWVya2xlVHJlZSA9IGNvbXByZXNzaW9uLnRyZWUudG9QdWJsaWNLZXkoKTtcbiAgICBjb25zdCB0cmVlQWNjb3VudCA9IGF3YWl0IENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudC5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgIG1lcmtsZVRyZWUsXG4gICAgKTtcbiAgICBjb25zdCB0cmVlQXV0aG9yaXR5ID0gdHJlZUFjY291bnQuZ2V0QXV0aG9yaXR5KCk7XG4gICAgY29uc3QgY2Fub3B5RGVwdGggPSB0cmVlQWNjb3VudC5nZXRDYW5vcHlEZXB0aCgpO1xuXG4gICAgY29uc3QgcHJvb2ZQYXRoID0gcHJvb2ZcbiAgICAgIC5tYXAoKG5vZGU6IHN0cmluZykgPT4gKHtcbiAgICAgICAgcHVia2V5OiBub2RlLnRvUHVibGljS2V5KCksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9KSlcbiAgICAgIC5zbGljZSgwLCBwcm9vZi5sZW5ndGggLSAoY2Fub3B5RGVwdGggPyBjYW5vcHlEZXB0aCA6IDApKTtcblxuICAgIGNvbnN0IGxlYWZPd25lciA9IG93bmVyc2hpcC5vd25lci50b1B1YmxpY0tleSgpO1xuICAgIGNvbnN0IG5ld0xlYWZPd25lciA9IGRlc3QudG9QdWJsaWNLZXkoKTtcbiAgICBjb25zdCBsZWFmTm9uY2UgPSBjb21wcmVzc2lvbi5sZWFmX2lkO1xuICAgIGxldCBsZWFmRGVsZWdhdGU6IFB1YmxpY0tleTtcbiAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgIGxlYWZEZWxlZ2F0ZSA9IGRlbGVnYXRlLnRvUHVibGljS2V5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlYWZEZWxlZ2F0ZSA9IG93bmVyc2hpcC5kZWxlZ2F0ZVxuICAgICAgICA/IG93bmVyc2hpcC5kZWxlZ2F0ZS50b1B1YmxpY0tleSgpXG4gICAgICAgIDogbGVhZk93bmVyO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlVHJhbnNmZXJJbnN0cnVjdGlvbihcbiAgICAgIHtcbiAgICAgICAgbWVya2xlVHJlZSxcbiAgICAgICAgdHJlZUF1dGhvcml0eSxcbiAgICAgICAgbGVhZk93bmVyLFxuICAgICAgICBsZWFmRGVsZWdhdGUsXG4gICAgICAgIG5ld0xlYWZPd25lcixcbiAgICAgICAgbG9nV3JhcHBlcjogU1BMX05PT1BfUFJPR1JBTV9JRCxcbiAgICAgICAgY29tcHJlc3Npb25Qcm9ncmFtOiBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICAgICAgICBhbmNob3JSZW1haW5pbmdBY2NvdW50czogcHJvb2ZQYXRoLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcm9vdDogWy4uLmFzc2V0UHJvb2YudmFsdWUucm9vdC50cmltKCkudG9QdWJsaWNLZXkoKS50b0J5dGVzKCldLFxuICAgICAgICBkYXRhSGFzaDogWy4uLmNvbXByZXNzaW9uLmRhdGFfaGFzaC50cmltKCkudG9QdWJsaWNLZXkoKS50b0J5dGVzKCldLFxuICAgICAgICBjcmVhdG9ySGFzaDogW1xuICAgICAgICAgIC4uLmNvbXByZXNzaW9uLmNyZWF0b3JfaGFzaC50cmltKCkudG9QdWJsaWNLZXkoKS50b0J5dGVzKCksXG4gICAgICAgIF0sXG4gICAgICAgIG5vbmNlOiBsZWFmTm9uY2UsXG4gICAgICAgIGluZGV4OiBsZWFmTm9uY2UsXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIHRyYW5zZmVyIG5mdFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3RcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gb3duZXJPck11bHRpc2lnXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gb3duZXJPck11bHRpc2lnLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG4gICAgICBjb25zdCBpbnN0ID0gYXdhaXQgY3JlYXRlVHJhbnNmZXIobWludCwgb3duZXIsIGRlc3QpO1xuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFtpbnN0XSwga2V5cGFpcnMpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIGlzQnJvd3NlciwgaXNOb2RlIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBGaWxlVHlwZSwgSWRlbnRpdHksIFRhZ3MsIFVwbG9hZGFibGVGaWxlVHlwZSB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBQaGFudG9tUHJvdmlkZXIgfSBmcm9tICd+L3R5cGVzL3BoYW50b20nO1xuaW1wb3J0IElyeXMsIHsgV2ViSXJ5cyB9IGZyb20gJ0BpcnlzL3Nkayc7XG5pbXBvcnQgeyBVcGxvYWRSZXNwb25zZSB9IGZyb20gJ0BpcnlzL3Nkay9idWlsZC9lc20vY29tbW9uL3R5cGVzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBQcm92ZW5hbmNlTGF5ZXIge1xuICBjb25zdCBUT0tFTiA9ICdzb2xhbmEnO1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIHVwbG9hZEZpbGU6IEZpbGVUeXBlLFxuICAgIGlkZW50aXR5OiBJZGVudGl0eSxcbiAgICB0YWdzPzogVGFncyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgbGV0IHJlY2VpcHQhOiBVcGxvYWRSZXNwb25zZTtcbiAgICBpZiAoaXNVcGxvYWRhYmxlKHVwbG9hZEZpbGUpKSB7XG4gICAgICByZWNlaXB0ID0gYXdhaXQgaXJ5cy51cGxvYWRGaWxlKHVwbG9hZEZpbGUsIHsgdGFncyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vIG1hdGNoIGZpbGUgdHlwZSBvciBlbnZpcm9tZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiBgJHtDb25zdGFudHMuSVJZU19HQVRFV0FZX1VSTH0vJHtyZWNlaXB0LmlkfWA7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZERhdGEgPSBhc3luYyAoXG4gICAgZGF0YTogc3RyaW5nLFxuICAgIGlkZW50aXR5OiBJZGVudGl0eSxcbiAgICB0YWdzPzogVGFncyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgcmVjZWlwdCA9IGF3YWl0IGlyeXMudXBsb2FkKGRhdGEsIHsgdGFncyB9KTtcbiAgICByZXR1cm4gYCR7Q29uc3RhbnRzLklSWVNfR0FURVdBWV9VUkx9LyR7cmVjZWlwdC5pZH1gO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc05vZGVhYmxlID0gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nID0+IHtcbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzQnJvd3NlcmFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBGaWxlID0+IHtcbiAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNVcGxvYWRhYmxlID0gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgVXBsb2FkYWJsZUZpbGVUeXBlID0+IHtcbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGZ1bmRBcndlYXZlID0gYXN5bmMgKFxuICAgIHVwbG9hZEZpbGU6IEZpbGVUeXBlLFxuICAgIGlkZW50aXR5OiBJZGVudGl0eSxcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBhd2FpdCB0b0J5dGVMZW5ndGgodXBsb2FkRmlsZSk7XG4gICAgY29uc3Qgd2lsbFBheSA9IGF3YWl0IGNhbGN1bGF0ZUNvc3QoYnl0ZUxlbmd0aCwgaWRlbnRpdHkpO1xuICAgIGNvbnN0IGZ1bmRUeCA9IGF3YWl0IGlyeXMuZnVuZChpcnlzLnV0aWxzLnRvQXRvbWljKHdpbGxQYXkpKTtcbiAgICBkZWJ1Z0xvZygnIyBmdW5kVHg6ICcsIGZ1bmRUeCk7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCB0b0J5dGVMZW5ndGggPSBhc3luYyAoY29udGVudDogRmlsZVR5cGUpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgIGxldCBsZW5ndGg6IG51bWJlciA9IDEwMDtcbiAgICBpZiAoaXNOb2RlYWJsZShjb250ZW50KSkge1xuICAgICAgbGVuZ3RoID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGNvbnRlbnQpLmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcmFibGUoY29udGVudCkpIHtcbiAgICAgIGxlbmd0aCA9IGNvbnRlbnQuc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vIG1hdGNoIGNvbnRlbnQgdHlwZScpO1xuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0SXJ5cyA9IGFzeW5jIDxUIGV4dGVuZHMgSXJ5cyB8IFdlYklyeXM+KFxuICAgIGlkZW50aXR5OiBJZGVudGl0eSxcbiAgKSA9PiB7XG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGdldE5vZGVJcnlzKGlkZW50aXR5IGFzIFNlY3JldCkpIGFzIFQ7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIChhd2FpdCBnZXRCcm93c2VySXJ5cyhpZGVudGl0eSBhcyBQaGFudG9tUHJvdmlkZXIpKSBhcyBUO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignT25seSBOb2RlLmpzIG9yIEJyb3dzZXInKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXROb2RlSXJ5cyA9IGFzeW5jIChzZWNyZXQ6IFNlY3JldCkgPT4ge1xuICAgIGNvbnN0IGNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgfSk7XG4gICAgY29uc3QgdXJsID0gQ29uc3RhbnRzLkJVTkRMUl9ORVRXT1JLX1VSTDtcbiAgICBjb25zdCB0b2tlbiA9IFRPS0VOO1xuICAgIGNvbnN0IGtleSA9IHNlY3JldDtcbiAgICBjb25zdCBpcnlzID0gbmV3IElyeXMoe1xuICAgICAgdXJsLFxuICAgICAgdG9rZW4sXG4gICAgICBrZXksXG4gICAgICBjb25maWc6IHsgcHJvdmlkZXJVcmw6IGNsdXN0ZXJVcmwgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gaXJ5cztcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJJcnlzID0gYXN5bmMgKFxuICAgIHByb3ZpZGVyOiBQaGFudG9tUHJvdmlkZXIsXG4gICk6IFByb21pc2U8V2ViSXJ5cz4gPT4ge1xuICAgIGNvbnN0IGNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgfSk7XG4gICAgY29uc3QgdXJsID0gQ29uc3RhbnRzLkJVTkRMUl9ORVRXT1JLX1VSTDtcbiAgICBjb25zdCB0b2tlbiA9IFRPS0VOO1xuICAgIGNvbnN0IHdhbGxldCA9IHsgcnBjVXJsOiBjbHVzdGVyVXJsLCBuYW1lOiBUT0tFTiwgcHJvdmlkZXI6IHByb3ZpZGVyIH07XG4gICAgY29uc3Qgd2ViSXJ5cyA9IG5ldyBXZWJJcnlzKHsgdXJsLCB0b2tlbiwgd2FsbGV0IH0pO1xuICAgIGF3YWl0IHdlYklyeXMucmVhZHkoKTtcbiAgICByZXR1cm4gd2ViSXJ5cztcbiAgfTtcblxuICBjb25zdCBjYWxjdWxhdGVDb3N0ID0gYXN5bmMgKHNpemU6IG51bWJlciwgaWRlbnRpdHk6IElkZW50aXR5KSA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGNvbnN0IHByaWNlQXRvbWljID0gYXdhaXQgaXJ5cy5nZXRQcmljZShzaXplKTtcbiAgICBjb25zdCBwcmljZUNvbnZlcnRlZCA9IGlyeXMudXRpbHMuZnJvbUF0b21pYyhwcmljZUF0b21pYyk7XG4gICAgZGVidWdMb2coJyMgc2l6ZTogJywgc2l6ZSk7XG4gICAgZGVidWdMb2coYCMgcHJpY2U6ICR7cHJpY2VDb252ZXJ0ZWR9YCk7XG4gICAgcmV0dXJuIHByaWNlQ29udmVydGVkO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFByb3ZlbmFuY2VMYXllciB9IGZyb20gJy4vcHJvdmVuYW5jZS1sYXllcic7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFyd2VhdmUge1xuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IChcbiAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBmaWxlOiAnLCBmaWxlUGF0aCk7XG4gICAgICBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIuZnVuZEFyd2VhdmUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICAgIHJldHVybiBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIudXBsb2FkRmlsZShmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gKFxuICAgIG1ldGFkYXRhOiBPZmZjaGFpbixcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGEgZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgcmV0dXJuIGF3YWl0IFByb3ZlbmFuY2VMYXllci51cGxvYWREYXRhKFxuICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSksXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBCbG9iLCBORlRTdG9yYWdlIH0gZnJvbSAnbmZ0LnN0b3JhZ2UnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFByb3ZlbmFuY2VMYXllciB9IGZyb20gJy4vcHJvdmVuYW5jZS1sYXllcic7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5mdFN0b3JhZ2Uge1xuICBjb25zdCBjcmVhdGVHYXRld2F5VXJsID0gKGNpZDogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgYCR7Q29uc3RhbnRzLk5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMfS8ke2NpZH1gO1xuXG4gIGNvbnN0IGNvbm5lY3QgPSAoKSA9PiB7XG4gICAgQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5jYWxjdWxhdGVQcm9iYWJpbGl0eSgpICYmXG4gICAgICBjb25zb2xlLndhcm4oQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5ORlRfU1RPUkFHRV9BUElfS0VZKTtcbiAgICByZXR1cm4gbmV3IE5GVFN0b3JhZ2UoeyB0b2tlbjogQ29uc3RhbnRzLk5GVF9TVE9SQUdFX0FQSV9LRVkgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgZmlsZVR5cGU6IEZpbGVUeXBlLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQ6ICcsIGZpbGVUeXBlKTtcbiAgICAgIGxldCBmaWxlITogQnVmZmVyO1xuICAgICAgaWYgKFByb3ZlbmFuY2VMYXllci5pc05vZGVhYmxlKGZpbGVUeXBlKSkge1xuICAgICAgICBmaWxlID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVUeXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoUHJvdmVuYW5jZUxheWVyLmlzQnJvd3NlcmFibGUoZmlsZVR5cGUpKSB7XG4gICAgICAgIGZpbGUgPSBCdWZmZXIuZnJvbShhd2FpdCBmaWxlVHlwZS5hcnJheUJ1ZmZlcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGUgPSBCdWZmZXIuZnJvbShmaWxlVHlwZSBhcyBBcnJheUJ1ZmZlcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJsb2JJbWFnZSA9IG5ldyBCbG9iKFtmaWxlXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JJbWFnZSk7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudFxuICAgKlxuICAgKiBAcGFyYW0ge09mZmNoYWlufSBzdG9yYWdlRGF0YVxuICAgKiB7XG4gICAqICAgbmFtZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBkZXNjcmlwdGlvbj86IHtzdHJpbmd9ICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBzZWxsZXJGZWVCYXNpc1BvaW50cz86IG51bWJlciAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgaW1hZ2U/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgIC8vIHVwbG9hZGVkIHVyaSBvZiBvcmlnaW5hbCBjb250ZW50XG4gICAqICAgZXh0ZXJuYWxfdXJsPzoge3N0cmluZ30gICAgICAgICAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzoge0pzb25NZXRhZGF0YUF0dHJpYnV0ZVtdfSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IHtKc29uTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT59IC8vIGluY2x1ZGVkIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IENvbGxlY3Rpb24gICAgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIFtrZXk6IHN0cmluZ106IHt1bmtub3dufSAgICAgICAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogfVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZERhdGEgPSBhc3luYyAoXG4gICAgc3RvcmFnZURhdGE6IE9mZmNoYWluLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGFkYXRhOiAnLCBzdG9yYWdlRGF0YSk7XG5cbiAgICAgIGNvbnN0IGJsb2JKc29uID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHN0b3JhZ2VEYXRhKV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSnNvbik7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEZpbGVUeXBlLCBPZmZjaGFpbiwgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQXJ3ZWF2ZSB9IGZyb20gJy4vYXJ3ZWF2ZSc7XG5pbXBvcnQgeyBOZnRTdG9yYWdlIH0gZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RvcmFnZSB7XG4gIGV4cG9ydCBjb25zdCB0b0NvbnZlcnRPZmZjaGFpbmRhdGEgPSAoXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgKTogT2ZmY2hhaW4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXG4gICAgICBzZWxsZXJfZmVlX2Jhc2lzX3BvaW50czogc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICBleHRlcm5hbF91cmw6IGlucHV0LmV4dGVybmFsX3VybCxcbiAgICAgIGF0dHJpYnV0ZXM6IGlucHV0LmF0dHJpYnV0ZXMsXG4gICAgICBwcm9wZXJ0aWVzOiBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgaW1hZ2U6ICcnLFxuICAgICAgb3B0aW9uczogaW5wdXQub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkRmlsZShmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkRmlsZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZERhdGEgPSBhc3luYyAoXG4gICAgaW5wdXQ6IE9mZmNoYWluLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWREYXRhKGlucHV0LCBmZWVQYXllcik7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWREYXRhKGlucHV0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBzdG9yYWdlVHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkID0gYXN5bmMgKFxuICAgIGlucHV0OiBPZmZjaGFpbixcbiAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnICYmICFmZWVQYXllcikge1xuICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgIH1cbiAgICBjb25zdCBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgYXdhaXQgdXBsb2FkRmlsZShmaWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKVxuICAgICkudW53cmFwKFxuICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaW5wdXQuaW1hZ2UgPSBvaztcbiAgICAgICAgcmV0dXJuIGF3YWl0IHVwbG9hZERhdGEoaW5wdXQsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICB9LFxuICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgaWYgKCFzdG9yYWdlKSB7XG4gICAgICB0aHJvdyBFcnJvcignRW1wdHkgc3RvcmFnZSBvYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0b3JhZ2U7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IERldGFpbHMsIExpbWl0IH0gZnJvbSAnfi90eXBlcy92YWxpZGF0b3InO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBWYWxpZGF0b3Ige1xuICBleHBvcnQgbmFtZXNwYWNlIE1lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGV4cG9ydCBjb25zdCBTTUFMTF9OVU1CRVIgPSAndG9vIHNtYWxsJztcbiAgICBleHBvcnQgY29uc3QgQklHX05VTUJFUiA9ICd0b28gYmlnJztcbiAgICBleHBvcnQgY29uc3QgTE9OR19MRU5HVEggPSAndG9vIGxvbmcnO1xuICAgIGV4cG9ydCBjb25zdCBFTVBUWSA9ICdpbnZhbGlkIGVtcHR5IHZhbHVlJztcbiAgICBleHBvcnQgY29uc3QgSU5WQUxJRF9VUkwgPSAnaW52YWxpZCB1cmwnO1xuICAgIGV4cG9ydCBjb25zdCBPTkxZX05PREVfSlMgPSAnYHN0cmluZ2AgdHlwZSBpcyBvbmx5IE5vZGUuanMnO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IE5BTUVfTEVOR1RIID0gMzI7XG4gIGV4cG9ydCBjb25zdCBTWU1CT0xfTEVOR1RIID0gMTA7XG4gIGV4cG9ydCBjb25zdCBVUkxfTEVOR1RIID0gMjAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NQVggPSAxMDA7XG4gIGV4cG9ydCBjb25zdCBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVggPSAxMDAwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUlOID0gMDtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdyb3lhbHR5JztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTZWxsZXJGZWVCYXNpc1BvaW50cyA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogQ29udmVydGVyLlJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXgsXG4gID4oXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5yb3lhbHR5KSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzUm95YWx0eShtZXRhZGF0YS5yb3lhbHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJGZWVCYXNpc1BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEubmFtZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc05hbWUobWV0YWRhdGEubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLnN5bWJvbCkge1xuICAgICAgICAgICAgICByZXMgPSBpc1N5bWJvbChtZXRhZGF0YS5zeW1ib2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFcnIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goLi4ucmVzLmVycm9yLmRldGFpbHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgJ0NhdWdodCBpbiB0aGUgdmFsaWRhdGlvbiBlcnJvcnMuIHNlZSBpbmZvcm1hdGlvbiBlLmc6IGVycjxWYWxpZGF0b3JFcnJvcj4uZGV0YWlscyc7XG4gICAgICAgIHRocm93IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZSA9IFBpY2s8XG4gICAgT2ZmY2hhaW4sXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAnaW1hZ2UnIHwgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJ1xuICA+O1xuICB0eXBlIFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggPSBQaWNrPFxuICAgIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAncm95YWx0eScgfCAnZmlsZVBhdGgnXG4gID47XG4gIHR5cGUgUGlja01ldGFwbGV4ID0gUGljazxcbiAgICBEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdCxcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgaWYgKCFpbWFnZU9yVXJpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChpbWFnZU9yVXJpKSA+IFVSTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBpbWFnZU9yVXJpLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBVUkxfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oz86Jj0rLCUjXSsvZy50ZXN0KGltYWdlT3JVcmkpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5JTlZBTElEX1VSTCwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGRldGFpbHM6IERldGFpbHNbXTtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBkZXRhaWxzOiBEZXRhaWxzW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQUxMX0RFUFRIX1NJWkVfUEFJUlMsXG4gIENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudCxcbiAgZ2V0Q29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50U2l6ZSxcbiAgU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgU1BMX05PT1BfUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtYWNjb3VudC1jb21wcmVzc2lvbic7XG5pbXBvcnQgeyBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtYnViYmxlZ3VtJztcbmltcG9ydCB7IFB1YmxpY0tleSwgU3lzdGVtUHJvZ3JhbSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBjcmVhdGVDcmVhdGVUcmVlSW5zdHJ1Y3Rpb24gfSBmcm9tICdtcGwtYnViYmxlZ3VtLWluc3RydWN0aW9uJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFNwYWNlTnVtYmVyLCBTcGFjZU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2NvbXByZXNzZWQtbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgZXhwb3J0IGNsYXNzIFNwYWNlIHtcbiAgICBzcGFjZU93bmVyOiBQdWJrZXk7XG4gICAgY29uc3RydWN0b3Ioc3BhY2VPd25lcjogUHVia2V5KSB7XG4gICAgICB0aGlzLnNwYWNlT3duZXIgPSBzcGFjZU93bmVyO1xuICAgIH1cblxuICAgIGdldEFzc2V0SWQgPSBhc3luYyAoKTogUHJvbWlzZTxQdWJrZXk+ID0+IHtcbiAgICAgIGNvbnN0IHRyZWVBY2NvdW50ID0gYXdhaXQgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRoaXMuc3BhY2VPd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGxlYWZJbmRleCA9IHRyZWVBY2NvdW50LnRyZWUucmlnaHRNb3N0UGF0aC5pbmRleCAtIDE7XG4gICAgICByZXR1cm4gQWNjb3VudC5QZGEuZ2V0QXNzZXRJZCh0aGlzLnNwYWNlT3duZXIsIGxlYWZJbmRleCk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogY3JlYXRlIGEgbmV3IG1hcmtsZSB0cmVlXG4gICAqIFRoaXMgZnVuY3Rpb24gbmVlZHMgb25seSAxIGNhbGxcbiAgICpcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhEZXB0aFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4QnVmZmVyU2l6ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gY2Fub3B5RGVwdGhcbiAgICogQHBhcmFtIHtQYXJ0aWFsPFNwYWNlT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50VHJhbnNhY3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBpbml0U3BhY2UgPSAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBtYXhEZXB0aDogbnVtYmVyLFxuICAgIG1heEJ1ZmZlclNpemU6IG51bWJlcixcbiAgICBjYW5vcHlEZXB0aDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8U3BhY2VPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGNvbnN0IHRyZWVPd25lciA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IHNwYWNlID0gZ2V0Q29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50U2l6ZShcbiAgICAgICAgbWF4RGVwdGgsXG4gICAgICAgIG1heEJ1ZmZlclNpemUsXG4gICAgICAgIGNhbm9weURlcHRoLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IFt0cmVlQXV0aG9yaXR5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbdHJlZU93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleS50b0J1ZmZlcigpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gW107XG5cbiAgICAgIGRlYnVnTG9nKGAjIG1heERlcHRoOiAke21heERlcHRofSwgbWF4QnVmZmVyU2l6ZTogJHttYXhCdWZmZXJTaXplfWApO1xuICAgICAgZGVidWdMb2coJyMgbmZ0IHNwYWNlOiAnLCBzcGFjZSk7XG5cbiAgICAgIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIHNwYWNlIGNvc3Q6ICcsIGF3YWl0IGNhbGN1bGF0ZVNwYWNlQ29zdChzcGFjZSkpO1xuICAgICAgfVxuXG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgICBmcm9tUHVia2V5OiBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgbmV3QWNjb3VudFB1YmtleTogdHJlZU93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICBsYW1wb3J0czpcbiAgICAgICAgICAgIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdGlvbihzcGFjZSksXG4gICAgICAgICAgc3BhY2U6IHNwYWNlLFxuICAgICAgICAgIHByb2dyYW1JZDogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgY3JlYXRlQ3JlYXRlVHJlZUluc3RydWN0aW9uKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1lcmtsZVRyZWU6IHRyZWVPd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgICB0cmVlQXV0aG9yaXR5LFxuICAgICAgICAgICAgdHJlZUNyZWF0b3I6IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICAgIHBheWVyOiBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgICBsb2dXcmFwcGVyOiBTUExfTk9PUF9QUk9HUkFNX0lELFxuICAgICAgICAgICAgY29tcHJlc3Npb25Qcm9ncmFtOiBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWF4QnVmZmVyU2l6ZSxcbiAgICAgICAgICAgIG1heERlcHRoLFxuICAgICAgICAgICAgcHVibGljOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgICApLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuTWludChcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBbdHJlZU93bmVyLnRvS2V5cGFpcigpLCBvd25lci50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICB0cmVlT3duZXIucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogY3JlYXRlIGEgbmV3IG5mdCBzcGFjZVxuICAgKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICAgKiBAcGFyYW0ge1NwYWNlTnVtYmVyfSBzcGFjZVNpemVcbiAgICogQHBhcmFtIHtQYXJ0aWFsPFNwYWNlT3B0aW9ucz59IG9wdGlvbnNcbiAgICpcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50VHJhbnNhY3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVTcGFjZSA9IGFzeW5jIChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIHNwYWNlU2l6ZTogU3BhY2VOdW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxTcGFjZU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIGNvbnN0IHsgbWF4RGVwdGgsIG1heEJ1ZmZlclNpemUsIGNhbm9weURlcHRoIH0gPVxuICAgICAgY2FsY3VsYXRlU3BhY2VOdW1iZXJUb0RlcHRoKHNwYWNlU2l6ZSk7XG4gICAgcmV0dXJuIGluaXRTcGFjZShvd25lciwgbWF4RGVwdGgsIG1heEJ1ZmZlclNpemUsIGNhbm9weURlcHRoLCBvcHRpb25zKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHNwYWNlIGNvc3RcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNwYWNlU2l6ZVxuICAgKiBAcmV0dXJuIFByb21pc2U8e3NvbDogbnVtYmVyfT5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVTcGFjZUNvc3QgPSBhc3luYyAoc3BhY2VTaXplOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB7IG1heERlcHRoLCBtYXhCdWZmZXJTaXplLCBjYW5vcHlEZXB0aCB9ID1cbiAgICAgIGNhbGN1bGF0ZVNwYWNlTnVtYmVyVG9EZXB0aChzcGFjZVNpemUpO1xuICAgIGNvbnN0IHJlcXVpcmVkU3BhY2UgPSBnZXRDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnRTaXplKFxuICAgICAgbWF4RGVwdGgsXG4gICAgICBtYXhCdWZmZXJTaXplLFxuICAgICAgY2Fub3B5RGVwdGgsXG4gICAgKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9XG4gICAgICBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRpb24oXG4gICAgICAgIHJlcXVpcmVkU3BhY2UsXG4gICAgICApO1xuICAgIHJldHVybiB7IHNvbDogbGFtcG9ydHMudG9Tb2woKSB9O1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICAvLy8gSW5pdGlhbGl6YXRpb24gcGFyYW1ldGVycyBmb3IgYW4gU1BMIENvbmN1cnJlbnRNZXJrbGVUcmVlLlxuICAvLy9cbiAgLy8vIE9ubHkgdGhlIGZvbGxvd2luZyBwZXJtdXRhdGlvbnMgYXJlIHZhbGlkOlxuICAvLy9cbiAgLy8vIHwgbWF4X2RlcHRoIHwgbWF4X2J1ZmZlcl9zaXplICAgICAgIHxcbiAgLy8vIHwgLS0tLS0tLS0tIHwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHxcbiAgLy8vIHwgMyAgICAgICAgIHwgKDgpICAgICAgICAgICAgICAgICAgIHwgbm9kZTogOFxuICAvLy8gfCAxNCAgICAgICAgfCAoNjQsIDI1NiwgMTAyNCwgMjA0OCkgfCBub2RlOiAxNiwzODRcbiAgLy8vIHwgMjAgICAgICAgIHwgKDY0LCAyNTYsIDEwMjQsIDIwNDgpIHwgbm9kZTogMSwwNDgsNTc2XG4gIC8vLyB8IDI0ICAgICAgICB8ICg2NCwgMjU2LCA1MTIsIDEwMjQsIDIwNDgpIHwgbm9kZTogMTYsNzc3LDIxNlxuICAvLy8gfCAyNiAgICAgICAgfCAoNjQsIDI1NiwgNTEyLCAxMDI0LCAyMDQ4KSB8IG5vZGU6IDY3LDEwOCw4NjRcbiAgLy8vIHwgMzAgICAgICAgIHwgKDUxMiwgMTAyNCwgMjA0OCkgfCBub2RlOiAxLDA3Myw3NDEsODI0XG4gIGNvbnN0IGNhbGN1bGF0ZVNwYWNlTnVtYmVyVG9EZXB0aCA9IChzcGFjZTogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbG9nMiA9IE1hdGguY2VpbChNYXRoLmxvZzIoc3BhY2UpKTtcbiAgICBkZWJ1Z0xvZygnIyBsb2cyOiAnLCBsb2cyLCAyICoqIGxvZzIpO1xuICAgIGNvbnN0IG1hdGNoZWQgPSBBTExfREVQVEhfU0laRV9QQUlSUy5maWx0ZXIoXG4gICAgICAocGFpcikgPT4gcGFpci5tYXhEZXB0aCA9PT0gbG9nMixcbiAgICApWzBdO1xuICAgIGNvbnN0IGNhbm9weURlcHRoID0gbWF0Y2hlZC5tYXhEZXB0aCAtIDU7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1heERlcHRoOiBtYXRjaGVkLm1heERlcHRoLFxuICAgICAgbWF4QnVmZmVyU2l6ZTogbWF0Y2hlZC5tYXhCdWZmZXJTaXplLFxuICAgICAgY2Fub3B5RGVwdGgsXG4gICAgfTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICd+L3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBEYXNBcGkgfSBmcm9tICd+L2Rhcy1hcGknO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBTcGFjZSB9IGZyb20gJy4vc3BhY2UnO1xuaW1wb3J0IHtcbiAgY29tcHV0ZUNyZWF0b3JIYXNoLFxuICBjb21wdXRlRGF0YUhhc2gsXG4gIGNyZWF0ZU1pbnRUb0NvbGxlY3Rpb25WMUluc3RydWN0aW9uLFxuICBjcmVhdGVWZXJpZnlDcmVhdG9ySW5zdHJ1Y3Rpb24sXG4gIENyZWF0b3IsXG4gIE1ldGFkYXRhQXJncyxcbiAgUFJPR1JBTV9JRCBhcyBCVUJCTEVHVU1fUFJPR1JBTV9JRCxcbn0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5pbXBvcnQge1xuICBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQsXG4gIFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gIFNQTF9OT09QX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLWFjY291bnQtY29tcHJlc3Npb24nO1xuXG5pbXBvcnQgeyBQUk9HUkFNX0lEIGFzIFRPS0VOX01FVEFEQVRBX1BST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHtcbiAgQWNjb3VudE1ldGEsXG4gIFB1YmxpY0tleSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZVZlcmlmeUNyZWF0b3IgPSBhc3luYyAoXG4gICAgY3JlYXRvcnM6IENyZWF0b3JbXSxcbiAgICBhc3NldElkOiBQdWJsaWNLZXksXG4gICAgdHJlZU93bmVyOiBQdWJsaWNLZXksXG4gICAgbWV0YWRhdGE6IE1ldGFkYXRhQXJncyxcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24+ID0+IHtcbiAgICBjb25zdCBycGNBc3NldFByb29mID0gYXdhaXQgRGFzQXBpLmdldEFzc2V0UHJvb2YoYXNzZXRJZC50b1N0cmluZygpKTtcbiAgICBjb25zdCBycGNBc3NldCA9IGF3YWl0IERhc0FwaS5nZXRBc3NldChhc3NldElkLnRvU3RyaW5nKCkpO1xuICAgIGlmIChycGNBc3NldFByb29mLmlzRXJyIHx8IHJwY0Fzc2V0LmlzRXJyKSB7XG4gICAgICB0aHJvdyBFcnJvcignUmlzZSBlcnJvciB3aGVuIGdldCBhc3NldCBwcm9vZiBvciBhc3NldCcpO1xuICAgIH1cbiAgICBjb25zdCBjb21wcmVzc2lvbiA9IHJwY0Fzc2V0LnZhbHVlLmNvbXByZXNzaW9uO1xuICAgIGNvbnN0IG93bmVyc2hpcCA9IHJwY0Fzc2V0LnZhbHVlLm93bmVyc2hpcDtcbiAgICBjb25zdCBhc3NldFByb29mID0gcnBjQXNzZXRQcm9vZi52YWx1ZTtcblxuICAgIGNvbnN0IHRyZWVBY2NvdW50ID0gYXdhaXQgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgdHJlZU93bmVyLFxuICAgICk7XG4gICAgY29uc3QgY2Fub3B5RGVwdGggPSB0cmVlQWNjb3VudC5nZXRDYW5vcHlEZXB0aCgpO1xuICAgIGNvbnN0IHNsaWNlZFByb29mOiBBY2NvdW50TWV0YVtdID0gYXNzZXRQcm9vZi5wcm9vZlxuICAgICAgLm1hcCgobm9kZTogc3RyaW5nKSA9PiAoe1xuICAgICAgICBwdWJrZXk6IG5vZGUudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pKVxuICAgICAgLnNsaWNlKDAsIGFzc2V0UHJvb2YucHJvb2YubGVuZ3RoIC0gKGNhbm9weURlcHRoID8gY2Fub3B5RGVwdGggOiAwKSk7XG5cbiAgICByZXR1cm4gY3JlYXRlVmVyaWZ5Q3JlYXRvckluc3RydWN0aW9uKFxuICAgICAge1xuICAgICAgICB0cmVlQXV0aG9yaXR5OiB0cmVlT3duZXIsXG4gICAgICAgIGxlYWZPd25lcjogb3duZXJzaGlwLm93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGxlYWZEZWxlZ2F0ZTogKG93bmVyc2hpcC5kZWxlZ2F0ZSB8fCBvd25lcnNoaXAub3duZXIpLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1lcmtsZVRyZWU6IGFzc2V0UHJvb2YudHJlZV9pZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG5cbiAgICAgICAgbG9nV3JhcHBlcjogU1BMX05PT1BfUFJPR1JBTV9JRCxcbiAgICAgICAgY29tcHJlc3Npb25Qcm9ncmFtOiBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICAgICAgICBjcmVhdG9yOiBmZWVQYXllcixcblxuICAgICAgICAvLyBwcm92aWRlIHRoZSBzbGljZWQgcHJvb2ZcbiAgICAgICAgYW5jaG9yUmVtYWluaW5nQWNjb3VudHM6IHNsaWNlZFByb29mLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcm9vdDogWy4uLmFzc2V0UHJvb2Yucm9vdC50cmltKCkudG9QdWJsaWNLZXkoKS50b0J5dGVzKCldLFxuICAgICAgICBjcmVhdG9ySGFzaDogWy4uLmNvbXB1dGVDcmVhdG9ySGFzaChjcmVhdG9ycyldLFxuICAgICAgICBkYXRhSGFzaDogWy4uLmNvbXB1dGVEYXRhSGFzaChtZXRhZGF0YSldLFxuICAgICAgICBub25jZTogY29tcHJlc3Npb24ubGVhZl9pZCxcbiAgICAgICAgaW5kZXg6IGNvbXByZXNzaW9uLmxlYWZfaWQsXG4gICAgICAgIG1lc3NhZ2U6IG1ldGFkYXRhLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgQ29tcHJlc3NlZCBORlQgbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXIgICAgICAgICAvLyBvd25lcidzIFNlY3JldFxuICAgKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gICAqIHtcbiAgICogICBuYW1lOiBzdHJpbmcgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sOiBzdHJpbmcgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyBEZWNlbnRyYWxpemVkIHN0b3JhZ2VcbiAgICogICB1cmk/OiBzdHJpbmcgfCBGaWxlICAgICAgICAvLyB1cGxvYWRlZCBjb250ZW50IHVybFxuICAgKiAgIGZpbGVQYXRoPzogc3RyaW5nIHwgRmlsZSAgIC8vIHVwbG9hZCBjb250ZW50XG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgaXNNdXRhYmxlPzogYm9vbGVhbiAgICAgICAgICAgLy8gZW5hYmxlIHVwZGF0ZSgpXG4gICAqICAgb3B0aW9ucz86IFtrZXk6IHN0cmluZ10/OiB1bmtub3duICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEBwYXJhbSB7UHVia2V5fSB0cmVlT3duZXIgICAgICAvLyBQcmV2aW91c2x5IGNyZWF0ZWQgdHJlZU93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBjb2xsZWN0aW9uTWludCAvLyBQcmV2aW91c2x5IGNyZWF0ZWQgY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9ucyAgICAgICAgIC8vIG1pbnQgb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICB0cmVlT3duZXI6IFB1YmtleSxcbiAgICBjb2xsZWN0aW9uTWludDogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmU8U3BhY2UuU3BhY2U+LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgZmVlUGF5ZXIsIHJlY2VpdmVyLCBkZWxlZ2F0ZSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IG93bmVyO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuICAgICAgY29uc3QgbGVhZk93bmVyID0gcmVjZWl2ZXIgPyByZWNlaXZlci50b1B1YmxpY0tleSgpIDogb3duZXJQdWJsaWNLZXk7XG4gICAgICBjb25zdCBsZWFmRGVsZWdhdGUgPSBkZWxlZ2F0ZVxuICAgICAgICA/IGRlbGVnYXRlXG4gICAgICAgIDogbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogcGF5ZXIhIH0pLnB1YmtleTtcblxuICAgICAgY29uc3QgdHJlZUF1dGhvcml0eSA9IEFjY291bnQuUGRhLmdldFRyZWVBdXRob3JpdHkoXG4gICAgICAgIHRyZWVPd25lci50b1B1YmxpY0tleSgpLnRvU3RyaW5nKCksXG4gICAgICApO1xuICAgICAgY29uc3QgY29sbGVjdGlvbk1ldGFkYXRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEoXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnRvU3RyaW5nKCksXG4gICAgICApO1xuICAgICAgY29uc3QgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihcbiAgICAgICAgY29sbGVjdGlvbk1pbnQudG9TdHJpbmcoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBidWJibGVndW1TaWduZXIgPSBBY2NvdW50LlBkYS5nZXRCZ3VtU2lnbmVyKCk7XG5cbiAgICAgIC8vIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50XG4gICAgICBsZXQgcHJvcGVydGllcztcbiAgICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0ID0ge1xuICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByb3lhbHR5ID0gaW5wdXQucm95YWx0eSA/IGlucHV0LnJveWFsdHkgOiAwO1xuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSBDb252ZXJ0ZXIuUm95YWx0eS5pbnRvSW5mcmEocm95YWx0eSk7XG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgLy8gY3JlYXRlZCBhdCBieSB1bml4IHRpbWVzdGFtcFxuICAgICAgc3RvcmFnZU1ldGFkYXRhLmNyZWF0ZWRfYXQgPSB1bml4VGltZXN0YW1wKCk7XG5cbiAgICAgIGxldCB1cmkhOiBzdHJpbmc7XG4gICAgICAvLyB1cGxvYWQgZmlsZVxuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIC8vIHVwbG9hZGVkIGZpbGVcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udmVydGVkID0gQ29udmVydGVyLkNvbXByZXNzZWROZnRNZXRhZGF0YS5pbnRvSW5mcmEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGFBcmdzOiBNZXRhZGF0YUFyZ3MgPSB7XG4gICAgICAgIC4uLmNvbnZlcnRlZCxcbiAgICAgICAgY29sbGVjdGlvbjogeyBrZXk6IGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksIHZlcmlmaWVkOiBmYWxzZSB9LFxuICAgICAgfTtcblxuICAgICAgZGVidWdMb2coJyMgaW5wdXQ6ICcsIGlucHV0KTtcbiAgICAgIGRlYnVnTG9nKCcjIG1ldGFkYXRhQXJnczogJywgbWV0YWRhdGFBcmdzKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gW107XG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgY3JlYXRlTWludFRvQ29sbGVjdGlvblYxSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWVya2xlVHJlZTogdHJlZU93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICB0cmVlQXV0aG9yaXR5LFxuICAgICAgICAgICAgdHJlZURlbGVnYXRlOiBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIHBheWVyOiBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgICBsZWFmT3duZXI6IGxlYWZPd25lciwgLy8gcmVjZWl2ZXJcbiAgICAgICAgICAgIGxlYWZEZWxlZ2F0ZTogbGVhZkRlbGVnYXRlLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5OiBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25NaW50OiBjb2xsZWN0aW9uTWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgY29sbGVjdGlvbk1ldGFkYXRhLFxuICAgICAgICAgICAgZWRpdGlvbkFjY291bnQ6IGNvbGxlY3Rpb25NYXN0ZXJFZGl0aW9uQWNjb3VudCxcbiAgICAgICAgICAgIGJ1YmJsZWd1bVNpZ25lcixcbiAgICAgICAgICAgIGxvZ1dyYXBwZXI6IFNQTF9OT09QX1BST0dSQU1fSUQsXG4gICAgICAgICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5UmVjb3JkUGRhOiBCVUJCTEVHVU1fUFJPR1JBTV9JRCxcbiAgICAgICAgICAgIGNvbXByZXNzaW9uUHJvZ3JhbTogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgICAgIHRva2VuTWV0YWRhdGFQcm9ncmFtOiBUT0tFTl9NRVRBREFUQV9QUk9HUkFNX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0YWRhdGFBcmdzLFxuICAgICAgICAgIH0sXG4gICAgICAgICksXG4gICAgICApO1xuXG4gICAgICBpZiAoaW5wdXQuY3JlYXRvcnMpIHtcbiAgICAgICAgY29uc3QgYXNzZXRJZCA9IGF3YWl0IG5ldyBTcGFjZS5TcGFjZSh0cmVlT3duZXIpLmdldEFzc2V0SWQoKTtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgICAgYXdhaXQgY3JlYXRlVmVyaWZ5Q3JlYXRvcihcbiAgICAgICAgICAgIG1ldGFkYXRhQXJncy5jcmVhdG9ycyxcbiAgICAgICAgICAgIGFzc2V0SWQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIHRyZWVPd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgbWV0YWRhdGFBcmdzLFxuICAgICAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG5ldyBTcGFjZS5TcGFjZSh0cmVlT3duZXIpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBBZGRpbmcgbmV3IHRva2VuIHRvIGV4aXN0aW5nIHRva2VuXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSAgdG9rZW5cbiAgICogQHBhcmFtIHtQdWJrZXl9ICBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldFtdfSAgb3duZXJPck11bHRpc2lnXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgdG90YWxBbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9ICBtaW50RGVjaW1hbFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKFxuICAgIHRva2VuOiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmU8UHVia2V5PiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgYXNzb2NpYXRlZCA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFzc29jaWF0ZWQudG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIENhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQodG90YWxBbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXNzb2NpYXRlZC5pbnN0ID8gW2Fzc29jaWF0ZWQuaW5zdCwgaW5zdF0gOiBbaW5zdF07XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbjxQdWJrZXk+KFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgdG9rZW4sXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgIi8vQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZUFtb3VudCA9IChcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICApOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBhbW91bnQgKiAxMCAqKiBtaW50RGVjaW1hbDtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQnVybk9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEJ1cm4gZXhpc3RpbmcgdG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9ICAgIG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9ICAgIG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0W119ICBvd25lck9yTXVsdGlzaWdcbiAgICogQHBhcmFtIHtudW1iZXJ9ICAgIGJ1cm5BbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9ICAgIHRva2VuRGVjaW1hbHNcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEJ1cm5PcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG93bmVyT3JNdWx0aXNpZzogU2VjcmV0W10sXG4gICAgYnVybkFtb3VudDogbnVtYmVyLFxuICAgIHRva2VuRGVjaW1hbHM6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEJ1cm5PcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUJ1cm5DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KGJ1cm5BbW91bnQsIHRva2VuRGVjaW1hbHMpLFxuICAgICAgICB0b2tlbkRlY2ltYWxzLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihbaW5zdF0sIGtleXBhaXJzLCBwYXllci50b0tleXBhaXIoKSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgc2xlZXAsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFBhcnNlZEFjY291bnREYXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBNQVhfUkVUUklFUyA9IDEwO1xuICBjb25zdCBSRVRSWV9ERUxBWSA9IDU7XG4gIGNvbnN0IE5GVFNUT1JBR0VfR0FURVdBWSA9ICduZnRzdG9yYWdlLmxpbmsnO1xuXG4gIGNvbnN0IGNvbnZlcnRlciA9IChcbiAgICBtZXRhZGF0YTogTWV0YWRhdGEsXG4gICAganNvbjogT2ZmY2hhaW4sXG4gICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgcmV0dXJuIENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9Vc2VyKFxuICAgICAge1xuICAgICAgICBvbmNoYWluOiBtZXRhZGF0YSxcbiAgICAgICAgb2ZmY2hhaW46IGpzb24sXG4gICAgICB9LFxuICAgICAgdG9rZW5BbW91bnQsXG4gICAgKTtcbiAgfTtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gIGNvbnN0IGZldGNoUmV0cnkgPSBhc3luYyAodXJsOiBzdHJpbmcsIHJldHJpZXMgPSAwKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwucmVwbGFjZSgnaXBmcy5pbycsIE5GVFNUT1JBR0VfR0FURVdBWSkpO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHJldHJpZXMgPCBNQVhfUkVUUklFUykge1xuICAgICAgICBkZWJ1Z0xvZyhgRXJyb3IgZmV0Y2hpbmcgZGF0YSBmcm9tICR7dXJsfSwgJHtyZXRyaWVzfSwgJHtlcnJvcn1gKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoUkVUUllfREVMQVkpO1xuICAgICAgICByZXR1cm4gZmV0Y2hSZXRyeSh1cmwsIHJldHJpZXMgKyAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnTG9nKGBNYXggcmV0cmllcyByZWFjaGVkICgke01BWF9SRVRSSUVTfSlgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UmVzdWx0PFRva2VuTWV0YWRhdGFbXXwgRXJyb3I+Pn1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhW10sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkVG9rZW5BY2NvdW50c0J5T3duZXIoXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkYXRhcyA9IGluZm8udmFsdWUubWFwKGFzeW5jIChkKSA9PiB7XG4gICAgICAgIGNvbnN0IG1pbnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby5taW50IGFzIFB1YmtleTtcbiAgICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby50b2tlbkFtb3VudFxuICAgICAgICAgIC5hbW91bnQgYXMgc3RyaW5nO1xuICAgICAgICBpZiAodG9rZW5BbW91bnQgPT09ICcxJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWV0YWRhdGEuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgICAgQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICAgIClcbiAgICAgICAgICAudGhlbihhc3luYyAobWV0YWRhdGEpID0+IHtcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgICAgICAgICAgIHJldHVybiBmZXRjaFJldHJ5KG1ldGFkYXRhLmRhdGEudXJpKS50aGVuKChqc29uOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRlcihtZXRhZGF0YSwganNvbiwgdG9rZW5BbW91bnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4gZGVidWdMb2coJyMgW0ZldGNoIGVycm9yXScsIGVycikpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZpbHRlcnMgPSAoYXdhaXQgUHJvbWlzZS5hbGwoZGF0YXMpKS5maWx0ZXIoXG4gICAgICAgIChkYXRhKSA9PiBkYXRhICE9PSB1bmRlZmluZWQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZpbHRlcnMgYXMgVG9rZW5NZXRhZGF0YVtdO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQpLFxuICAgICAgKTtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmRCeU1pbnQgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgIGlmIChtZXRhZGF0YS50b2tlblN0YW5kYXJkID09PSAwKSB7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIGBUaGlzIG1pbnQgaXMgbm90IFNQTC1UT0tFTiwgdG9rZW5TdGFuZGFyZDoke21ldGFkYXRhLnRva2VuU3RhbmRhcmR9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBjb25uZWN0aW9uLmdldFBhcnNlZEFjY291bnRJbmZvKG1pbnQudG9QdWJsaWNLZXkoKSk7XG4gICAgICBjb25zdCB0b2tlbkFtb3VudCA9IChpbmZvLnZhbHVlPy5kYXRhIGFzIFBhcnNlZEFjY291bnREYXRhKS5wYXJzZWQuaW5mb1xuICAgICAgICAuc3VwcGx5IGFzIHN0cmluZztcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSAoYXdhaXQgKFxuICAgICAgICBhd2FpdCBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICkuanNvbigpKSBhcyBPZmZjaGFpbjtcbiAgICAgIHJldHVybiBjb252ZXJ0ZXIobWV0YWRhdGEsIHJlc3BvbnNlLCB0b2tlbkFtb3VudCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgRnJlZXplT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogRnJlZXppbmcgYSB0YXJnZXQgbmZ0XG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+fSBvcHRpb25zIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiB7UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+fVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgR2FzTGVzc1RyYW5zZmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBUcmFuc2ZlciB3aXRob3V0IHNvbGFuYSBzb2wsIGRlbGVnYXRlIGZlZXBheWVyIGZvciBjb21taXNzaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICAgKiBAcGFyYW0ge1B1YmtleX0gZGVzdFxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW50RGVjaW1hbFxuICAgKiBAcGFyYW0ge1B1YmtleX0gZmVlUGF5ZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEdhc0xlc3NUcmFuc2Zlck9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgZGVzdDogUHVia2V5LFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEdhc0xlc3NUcmFuc2Zlck9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuICAgICAgY29uc3Qgc291cmNlVG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyUHVibGljS2V5LnRvU3RyaW5nKCksXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBkZXN0LFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuXG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbih7XG4gICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgIGJsb2NraGFzaDogYmxvY2toYXNoT2JqLmJsb2NraGFzaCxcbiAgICAgICAgZmVlUGF5ZXI6IGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgaW5zdDIgPSBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBbb3duZXIudG9LZXlwYWlyKCldLFxuICAgICAgKTtcblxuICAgICAgLy8gcmV0dXJuIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgaWYgKCFkZXN0VG9rZW4uaW5zdCkge1xuICAgICAgICB0eC5hZGQoaW5zdDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmV0dXJuIGluc3RydWN0aW9uIGFuZCB1bmRlY2lkZWQgYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICAgIHR4LmFkZChkZXN0VG9rZW4uaW5zdCkuYWRkKGluc3QyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICB0eC5hZGQoXG4gICAgICAgICAgYXdhaXQgVHJhbnNhY3Rpb25CdWlsZGVyLlByaW9yaXR5RmVlLmNyZWF0ZVByaW9yaXR5RmVlSW5zdHJ1Y3Rpb24odHgpLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgdHgucGFydGlhbFNpZ24ob3duZXIudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzZXJpYWxpemVkVHggPSB0eC5zZXJpYWxpemUoe1xuICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGhleCA9IHNlcmlhbGl6ZWRUeC50b1N0cmluZygnaGV4Jyk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5QYXJ0aWFsU2lnbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIEF1dGhvcml0eVR5cGUsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uLFxuICBjcmVhdGVTZXRBdXRob3JpdHlJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQsXG4gIE1JTlRfU0laRSxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5pbXBvcnQge1xuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlRnJlZXplQXV0aG9yaXR5ID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogUHVibGljS2V5LFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBBdXRob3JpdHlUeXBlLkZyZWV6ZUFjY291bnQsXG4gICAgICBmcmVlemVBdXRob3JpdHksXG4gICAgKTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgdG9rZW5NZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9IGF3YWl0IGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQoY29ubmVjdGlvbik7XG4gICAgY29uc3QgbWV0YWRhdGFQZGEgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRva2VuQXNzb2NpYXRlZCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICAgIHNwYWNlOiBNSU5UX1NJWkUsXG4gICAgICAgIGxhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBvd25lcixcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgICBvd25lcixcbiAgICAgICAgbWludCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhUGRhLFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICAgIGRhdGE6IHRva2VuTWV0YWRhdGEsXG4gICAgICAgICAgICBpc011dGFibGUsXG4gICAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBpbnN0cnVjdGlvbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNQTC1UT0tFTiBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgIC8vIHRva2VuIG93bmVyIFNlY3JldFxuICAgKiBAcGFyYW0ge251bWJlcn0gdG90YWxBbW91bnQgLy8gdG90YWwgbnVtYmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW50RGVjaW1hbCAvLyB0b2tlbiBkZWNpbWFsXG4gICAqIEBwYXJhbSB7SW5wdXRUb2tlbk1ldGFkYXRhfSBpbnB1dCAgICAgICAvLyB0b2tlbiBtZXRhZGF0YVxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRJbnN0cnVjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgaW5wdXQ6IElucHV0VG9rZW5NZXRhZGF0YSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0VG9rZW5NZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogb3duZXI7XG4gICAgICBpbnB1dC5yb3lhbHR5ID0gMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gMDtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuXG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQgYXMgSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgICAgaW5wdXQucm95YWx0eSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgLy8gdXBsb2FkIGZpbGVcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydGVyLlRva2VuTWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXJpKTtcblxuICAgICAgY29uc3QgbWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGluc3RzID0gYXdhaXQgY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgdG90YWxBbW91bnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRnJlZXplQXV0aG9yaXR5KFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5NaW50KFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpLCBtaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG1pbnQucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFRoYXdPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPFRoYXdPcHRpb25zPn0gb3B0aW9ucyAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj59XG4gICAqL1xuICBleHBvcnQgY29uc3QgdGhhdyA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFRoYXdPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRoYXdBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTWludE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIFRyYW5zZmVyIE5GVCBmb3Igb25seSBtdWx0aVNpZyBhY2NvdW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgICAgLy8gbWludGVkIGFjY291bnRcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgICAvLyBjdXJyZW50IG11bHRpc2lnIG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0ICAgICAgICAgICAgICAgLy8gbmV3IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0W119IG93bmVyT3JNdWx0aXNpZyAgLy8gb3duZXIgb3IgbXVsdGlzaWcgYWNjb3VudCBTZWNyZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAgICAgICAgICAgICAvLyB3YW50IHRvIHRyYW5zZmVyIFNPTCBhbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbnREZWNpbWFsICAgICAgICAvLyBtaW50ZWQgdG9rZW4gZGVjaW1hbFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zICAgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiB7UmVzdWx0PENvbW1vblN0cnVjdHVyZTx1bmtub3duPiwgRXJyb3I+IH1cbiAgICovXG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3QgcGF5ZXJQdWJrZXkgPSBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBwYXllciB9KTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gb3duZXJPck11bHRpc2lnLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIudG9TdHJpbmcoKSxcbiAgICAgICAgcGF5ZXJQdWJrZXkucHVia2V5LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBkZXN0LFxuICAgICAgICBwYXllclB1YmtleS5wdWJrZXksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGRlc3RUb2tlbi5pbnN0ID8gW2Rlc3RUb2tlbi5pbnN0LCBpbnN0XSA6IFtpbnN0XTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU3BsVG9rZW4gYXMgQWRkIH0gZnJvbSAnLi9hZGQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQnVybiB9IGZyb20gJy4vYnVybic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZyZWV6ZSB9IGZyb20gJy4vZnJlZXplJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEdhc0xlc3MgfSBmcm9tICcuL2dhcy1sZXNzLXRyYW5zZmVyJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgVGhhdyB9IGZyb20gJy4vdGhhdyc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuXG4vKiogQG5hbWVzcGFjZSAqL1xuZXhwb3J0IGNvbnN0IFNwbFRva2VuID0ge1xuICAuLi5BZGQsXG4gIC4uLkJ1cm4sXG4gIC4uLkZpbmQsXG4gIC4uLkZyZWV6ZSxcbiAgLi4uR2FzTGVzcyxcbiAgLi4uTWludCxcbiAgLi4uVGhhdyxcbiAgLi4uVHJhbnNmZXIsXG59O1xuIiwgImltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgQnVybk9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgLyoqXG4gICAqIEJ1cm4gZXhpc3RpbmcgdG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9ICBtaW50XG4gICAqIEBwYXJhbSB7UHVia2V5fSAgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gIG93bmVyT3JNdWx0aXNpZ1xuICAgKiBAcGFyYW0ge1BhcnRpYWw8QnVybk9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEJ1cm5PcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgcmV0dXJuIFNwbFRva2VuLmJ1cm4oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBvd25lck9yTXVsdGlzaWcsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICAgTkZUX0RFQ0lNQUxTLFxuICAgICAge1xuICAgICAgICBmZWVQYXllcixcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgRGFzQXBpIH0gZnJvbSAnfi9kYXMtYXBpJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNZXRhZGF0YSwgTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBGaW5kT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBvd25lciBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RmluZE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgRGFzQXBpLmZpbmRCeU93bmVyKG93bmVyLCBmYWxzZSwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWw8TWV0YWRhdGE+LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBEYXNBcGkuZmluZEJ5TWludChtaW50LCBmYWxzZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IGNvbGxlY3Rpb24gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeUNvbGxlY3Rpb24gPSBhc3luYyAoXG4gICAgY29sbGVjdGlvbk1pbnQ6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gRGFzQXBpLmZpbmRCeUNvbGxlY3Rpb24oY29sbGVjdGlvbk1pbnQsIGZhbHNlLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuaW1wb3J0IHsgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBjcmVhdGVGcmVlemVEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgRnJlZXplT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICAvKipcbiAgICogRnJlZXppbmcgYSB0YXJnZXQgbmZ0XG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGcmVlemVPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBlZGl0aW9uQWRkcmVzcyA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24obWludCk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24oe1xuICAgICAgICBkZWxlZ2F0ZTogbmV3IEFjY291bnQuS2V5cGFpcih7XG4gICAgICAgICAgc2VjcmV0OiBmcmVlemVBdXRob3JpdHksXG4gICAgICAgIH0pLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQWNjb3VudDogdG9rZW5BY2NvdW50LFxuICAgICAgICBlZGl0aW9uOiBlZGl0aW9uQWRkcmVzcyxcbiAgICAgICAgbWludDogbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBQdWJsaWNLZXksXG4gIFN5c3RlbVByb2dyYW0sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUFwcHJvdmVJbnN0cnVjdGlvbixcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50LFxuICBNSU5UX1NJWkUsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhLCBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uLFxuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBjcmVhdGVTaWduTWV0YWRhdGFJbnN0cnVjdGlvbixcbiAgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uSXRlbUluc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlVmVyaWZ5Q3JlYXRvciA9IChtaW50OiBQdWJsaWNLZXksIGNyZWF0b3I6IFB1YmxpY0tleSkgPT4ge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gY3JlYXRlU2lnbk1ldGFkYXRhSW5zdHJ1Y3Rpb24oe1xuICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxuICAgICAgY3JlYXRvcjogY3JlYXRvcixcbiAgICB9KTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlRGVsZWFnYXRlID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGRlbGVnYXRlQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcblxuICAgIHJldHVybiBjcmVhdGVBcHByb3ZlSW5zdHJ1Y3Rpb24oXG4gICAgICB0b2tlbkFjY291bnQsXG4gICAgICBkZWxlZ2F0ZUF1dGhvcml0eSxcbiAgICAgIG93bmVyLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICApO1xuICB9O1xuXG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb24gPSAoXG4gICAgY29sbGVjdGlvbkNoaWxkOiBQdWJsaWNLZXksXG4gICAgY29sbGVjdGlvblBhcmVudDogUHVibGljS2V5LFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKFxuICAgICAgY29sbGVjdGlvblBhcmVudC50b1N0cmluZygpLFxuICAgICk7XG4gICAgY29uc3QgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihcbiAgICAgIGNvbGxlY3Rpb25QYXJlbnQudG9TdHJpbmcoKSxcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb25JdGVtSW5zdHJ1Y3Rpb24oe1xuICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbk1ldGFkYXRhLFxuICAgICAgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50OiBjb2xsZWN0aW9uTWFzdGVyRWRpdGlvbkFjY291bnQsXG4gICAgICBjb2xsZWN0aW9uTWludDogY29sbGVjdGlvblBhcmVudCxcbiAgICAgIG1ldGFkYXRhOiBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShjb2xsZWN0aW9uQ2hpbGQudG9TdHJpbmcoKSksXG4gICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5OiBmZWVQYXllcixcbiAgICB9KTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBuZnRNZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGF0YSA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcbiAgICBjb25zdCB0b2tlbk1ldGFkYXRhUHVia2V5ID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtYXN0ZXJFZGl0aW9uUHVia2V5ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICAgIGxhbXBvcnRzOiBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pLFxuICAgICAgICBzcGFjZTogTUlOVF9TSVpFLFxuICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihtaW50LCAwLCBvd25lciwgb3duZXIpKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKGZlZVBheWVyLCBhdGEsIG93bmVyLCBtaW50KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKG1pbnQsIGF0YSwgb3duZXIsIDEsIDApKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIG1ldGFkYXRhOiB0b2tlbk1ldGFkYXRhUHVia2V5LFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICAgIGRhdGE6IG5mdE1ldGFkYXRhLFxuICAgICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWFzdGVyRWRpdGlvblYzSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlZGl0aW9uOiBtYXN0ZXJFZGl0aW9uUHVia2V5LFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgICAgbWV0YWRhdGE6IHRva2VuTWV0YWRhdGFQdWJrZXksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNYXN0ZXJFZGl0aW9uQXJnczoge1xuICAgICAgICAgICAgbWF4U3VwcGx5OiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnQgYW5kIE5GVCBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7SW5wdXROZnRNZXRhZGF0YX0gaW5wdXRcbiAgICoge1xuICAgKiAgIG5hbWU6IHN0cmluZyAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w6IHN0cmluZyAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGZpbGVQYXRoOiBzdHJpbmcgfCBGaWxlICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgcm95YWx0eTogbnVtYmVyICAgICAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgc3RvcmFnZVR5cGU6ICdhcndlYXZlJ3wnbmZ0U3RvcmFnZScgLy8gRGVjZW50cmFsaXplZCBzdG9yYWdlXG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgY3JlYXRvcnM/OiBJbnB1dENyZWF0b3JzW10gICAgLy8gb3RoZXIgY3JlYXRvcnMgdGhhbiBvd25lclxuICAgKiAgIHVzZXM/OiBVc2VzICAgICAgICAgICAgICAgICAgIC8vIHVzYWdlIGZlYXR1cmU6IGJ1cm4sIHNpbmdsZSwgbXVsdGlwbGVcbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogICBvcHRpb25zPzogW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9ucyAgICAgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dE5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgLy8gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnRcbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJveWFsdHkgPSBpbnB1dC5yb3lhbHR5ID8gaW5wdXQucm95YWx0eSA6IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IENvbnZlcnRlci5Sb3lhbHR5LmludG9JbmZyYShyb3lhbHR5KTtcbiAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgICAgLy8gdXBsb2FkZWQgZmlsZVxuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB7IGltYWdlOiBpbnB1dC51cmkgfTtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZERhdGEoXG4gICAgICAgICAgeyAuLi5zdG9yYWdlTWV0YWRhdGEsIC4uLmltYWdlIH0sXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG5cbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGF3YWl0IGNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChmcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgICAgY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBjb2xsZWN0aW9uIC0tLVxuICAgICAgaWYgKGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgICAgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgaW5wdXQuY29sbGVjdGlvbi50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleXBhaXJzID0gW293bmVyLnRvS2V5cGFpcigpLCBtaW50LnRvS2V5cGFpcigpXTtcblxuICAgICAgLy8gY3JlYXRvciAtLS1cbiAgICAgIGlmIChpbnB1dC5jcmVhdG9ycykge1xuICAgICAgICBpbnB1dC5jcmVhdG9ycy5mb3JFYWNoKChjcmVhdG9yKSA9PiB7XG4gICAgICAgICAgaWYgKEFjY291bnQuS2V5cGFpci5pc1NlY3JldChjcmVhdG9yLnNlY3JldCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JQdWJrZXkgPSBjcmVhdG9yLmFkZHJlc3MudG9QdWJsaWNLZXkoKTtcbiAgICAgICAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVWZXJpZnlDcmVhdG9yKG1pbnQudG9QdWJsaWNLZXkoKSwgY3JlYXRvclB1YmtleSk7XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChpbnN0KTtcbiAgICAgICAgICAgIGtleXBhaXJzLnB1c2goY3JlYXRvci5zZWNyZXQudG9LZXlwYWlyKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBHYXNMZXNzTWludE9wdGlvbnMsIElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvKipcbiAgICogTWludCB3aXRob3V0IHNvbGFuYSBzb2wsIGRlbGVnYXRlIGZlZXBheWVyIGZvciBjb21taXNzaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7VXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YX0gaW5wdXRcbiAgICoge1xuICAgKiAgIG5hbWU6IHN0cmluZyAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w6IHN0cmluZyAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGZpbGVQYXRoOiBzdHJpbmcgfCBGaWxlICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgcm95YWx0eTogbnVtYmVyICAgICAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgc3RvcmFnZVR5cGU6ICdhcndlYXZlJ3wnbmZ0U3RvcmFnZScgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqICAgY3JlYXRvcnM/OiBJbnB1dENyZWF0b3JzW10gICAgICAgICAgLy8gb3RoZXIgY3JlYXRvcnMgdGhhbiBvd25lclxuICAgKiAgIHVzZXM/OiBVc2VzICAgICAgICAgICAgICAgICAgIC8vIHVzYWdlIGZlYXR1cmU6IGJ1cm4sIHNpbmdsZSwgbXVsdGlwbGVcbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogfVxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXIgICAgICAgIC8vIGZlZSBwYXllclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8R2FzTGVzc01pbnRPcHRpb25zPn0gb3B0aW9ucyAgICAgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NNaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEdhc0xlc3NNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXROZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3Qgcm95YWx0eSA9IGlucHV0LnJveWFsdHkgPyBpbnB1dC5yb3lhbHR5IDogMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gQ29udmVydGVyLlJveWFsdHkuaW50b0luZnJhKHJveWFsdHkpO1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNrZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG5cbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuICAgICAgbGV0IHVyaSA9ICcnO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgICAgeyAuLi5pbnB1dCwgcHJvcGVydGllcyB9LFxuICAgICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICApO1xuXG4gICAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICB1cmkgPSBpbnB1dC51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgbGV0IGRhdGF2MiA9IENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG4gICAgICBsZXQgY29sbGVjdGlvbjtcbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uICYmIGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbiA9IENvbnZlcnRlci5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKTtcbiAgICAgICAgZGF0YXYyID0geyAuLi5kYXRhdjIsIGNvbGxlY3Rpb24gfTtcbiAgICAgIH1cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IGlucHV0LmlzTXV0YWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlucHV0LmlzTXV0YWJsZTtcblxuICAgICAgZGVidWdMb2coJyMgaW5wdXQ6ICcsIGlucHV0KTtcbiAgICAgIGRlYnVnTG9nKCcjIHNlbGxlckZlZUJhc2lzUG9pbnRzOiAnLCBzZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IE1pbnQuY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY2tleSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChvcHRpb25zLmZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIE1pbnQuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXJQdWJsaWNrZXksXG4gICAgICAgICAgICBvcHRpb25zLmZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG5cbiAgICAgIGluc3RzLmZvckVhY2goKGluc3QpID0+IHR4LmFkZChpbnN0KSk7XG5cbiAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgdHguYWRkKFxuICAgICAgICAgIGF3YWl0IFRyYW5zYWN0aW9uQnVpbGRlci5Qcmlvcml0eUZlZS5jcmVhdGVQcmlvcml0eUZlZUluc3RydWN0aW9uKHR4KSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIFtvd25lciwgbWludF0uZm9yRWFjaCgoc2lnbmVyKSA9PiB0eC5wYXJ0aWFsU2lnbihzaWduZXIudG9LZXlwYWlyKCkpKTtcblxuICAgICAgY29uc3Qgc2VyaWFsaXplZFR4ID0gdHguc2VyaWFsaXplKHtcbiAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBoZXggPSBzZXJpYWxpemVkVHgudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuUGFydGlhbFNpZ24oaGV4LCBtaW50LnB1YmtleSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBHYXNMZXNzVHJhbnNmZXJPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgLyoqXG4gICAqIFRyYW5zZmVyIHdpdGhvdXQgc29sYW5hIHNvbCwgZGVsZWdhdGUgZmVlcGF5ZXIgZm9yIGNvbW1pc3Npb25cbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0XG4gICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8R2FzTGVzc1RyYW5zZmVyT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEdhc0xlc3NUcmFuc2Zlck9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4uZ2FzTGVzc1RyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBmZWVQYXllcixcbiAgICAgIG9wdGlvbnMsXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVTZXRDb2xsZWN0aW9uU2l6ZUluc3RydWN0aW9uIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdG9yYWdlJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IE1pbnRDb2xsZWN0aW9uT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbi8qKlxuICogY3JlYXRlIGEgY29sbGVjdGlvblxuICogVGhpcyBmdW5jdGlvbiBuZWVkcyBvbmx5IDEgY2FsbFxuICpcbiAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICogQHBhcmFtIHtJbnB1dE5mdE1ldGFkYXRhfSBpbnB1dFxuICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRDb2xsZWN0aW9uT3B0aW9ucz59IG9wdGlvbnNcbiAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PlxuICovXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBERUZBVUxUX0NPTExFQ1RJT05fU0laRSA9IDA7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuICBleHBvcnQgY29uc3QgbWludENvbGxlY3Rpb24gPSAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRDb2xsZWN0aW9uT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dE5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZnJlZXplQXV0aG9yaXR5LCBmZWVQYXllciwgY29sbGVjdGlvblNpemUgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG4gICAgICBsZXQgcHJvcGVydGllcztcbiAgICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0ID0ge1xuICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgIH07XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoaW5wdXQsIDApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCAmJiBpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB7IGltYWdlOiBpbnB1dC51cmkgfTtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZERhdGEoXG4gICAgICAgICAgeyAuLi5zdG9yYWdlTWV0YWRhdGEsIC4uLmltYWdlIH0sXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShpbnB1dCwgdXJpLCAwKTtcblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBjb2xsZWN0aW9uTWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YUFjY291bnQgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShcbiAgICAgICAgY29sbGVjdGlvbk1pbnQucHVia2V5LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXdhaXQgTWludC5jcmVhdGVNaW50KFxuICAgICAgICBjb2xsZWN0aW9uTWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgICBNaW50LmNyZWF0ZURlbGVhZ2F0ZShcbiAgICAgICAgICAgIGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0ge1xuICAgICAgICBjb2xsZWN0aW9uTWV0YWRhdGE6IGNvbGxlY3Rpb25NZXRhZGF0YUFjY291bnQsXG4gICAgICAgIGNvbGxlY3Rpb25BdXRob3JpdHk6IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IGNvbGxlY3Rpb25NaW50LnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgIH07XG5cbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICBjcmVhdGVTZXRDb2xsZWN0aW9uU2l6ZUluc3RydWN0aW9uKGNvbGxlY3Rpb25zLCB7XG4gICAgICAgICAgc2V0Q29sbGVjdGlvblNpemVBcmdzOiB7XG4gICAgICAgICAgICBzaXplOiBjb2xsZWN0aW9uU2l6ZSB8fCBERUZBVUxUX0NPTExFQ1RJT05fU0laRSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpLCBjb2xsZWN0aW9uTWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBjb2xsZWN0aW9uTWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgVGhhd09wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtUaGF3T3B0aW9uc30gb3B0aW9ucyAgICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPHVua25vd24+LCBFcnJvcj4gfVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRoYXcgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxUaGF3T3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PENvbW1vblN0cnVjdHVyZTx1bmtub3duPiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGVkaXRpb25BZGRyZXNzID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24oe1xuICAgICAgICBkZWxlZ2F0ZTogbmV3IEFjY291bnQuS2V5cGFpcih7XG4gICAgICAgICAgc2VjcmV0OiBmcmVlemVBdXRob3JpdHksXG4gICAgICAgIH0pLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQWNjb3VudDogdG9rZW5BY2NvdW50LFxuICAgICAgICBlZGl0aW9uOiBlZGl0aW9uQWRkcmVzcyxcbiAgICAgICAgbWludDogbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNmZXJPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICAvKipcbiAgICogVHJhbnNmZXIgTkZUXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0ICAgICAgICAgICAgIC8vIG5ldyBvd25lclxuICAgKiBAcGFyYW0ge1RoYXdPcHRpb25zfSBvcHRpb25zICAgICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Jlc3VsdDxDb21tb25TdHJ1Y3R1cmU8dW5rbm93bj4sIEVycm9yPiB9XG4gICAqL1xuICBleHBvcnQgY29uc3QgdHJhbnNmZXIgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIG93bmVyT3JNdWx0aXNpZzogU2VjcmV0W10sXG4gICAgb3B0aW9uczogUGFydGlhbDxUcmFuc2Zlck9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFNwbFRva2VuLnRyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIG93bmVyT3JNdWx0aXNpZyxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBvcHRpb25zLFxuICAgICk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVndWxhck5mdCBhcyBCdXJuIH0gZnJvbSAnLi9idXJuJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEZyZWV6ZSB9IGZyb20gJy4vZnJlZXplJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgR2FzTGVzc01pbnQgfSBmcm9tICcuL2dhcy1sZXNzLW1pbnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBHYXNMZXNzVHJhbnNmZXIgfSBmcm9tICcuL2dhcy1sZXNzLXRyYW5zZmVyJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIE1pbnRDb2xsZWN0aW9uIH0gZnJvbSAnLi9taW50LWNvbGxlY3Rpb24nO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBUaGF3IH0gZnJvbSAnLi90aGF3JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmV4cG9ydCBjb25zdCBSZWd1bGFyTmZ0ID0ge1xuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkdhc0xlc3NNaW50LFxuICAuLi5HYXNMZXNzVHJhbnNmZXIsXG4gIC4uLk1pbnQsXG4gIC4uLk1pbnRDb2xsZWN0aW9uLFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCB9IGZyb20gJ34vc3VpdGUtcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTWludENvbGxlY3Rpb25PcHRpb25zIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuLyoqXG4gKiBjcmVhdGUgYSBjb2xsZWN0aW9uXG4gKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gKlxuICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gKiBAcGFyYW0ge01pbnRDb2xsZWN0aW9uT3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIGV4cG9ydCBjb25zdCBtaW50Q29sbGVjdGlvbiA9IChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludENvbGxlY3Rpb25PcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIFJlZ3VsYXJOZnQubWludENvbGxlY3Rpb24ob3duZXIsIGlucHV0LCB7XG4gICAgICBmZWVQYXllcixcbiAgICAgIGZyZWV6ZUF1dGhvcml0eSxcbiAgICB9KTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSx1QkFBQUE7QUFBQTtBQUFBOzs7QUNBQSxrQkFBc0M7QUFDdEMsa0JBQTZCO0FBRTdCLElBQUksU0FBUyxZQUFBQztBQUVOLElBQVU7QUFBQSxDQUFWLENBQVVDLGVBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMscUJBQVY7QUFDTCxVQUFNLGFBQWE7QUFDbkIsUUFBSSxZQUFZO0FBQ1QsSUFBTUEsaUJBQUEsc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzVCLElBQU1BLGlCQUFBLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFlcEIsSUFBTUEsaUJBQUEsdUJBQXVCLE1BQWU7QUFDakQsWUFBTSxjQUFjLEtBQUssT0FBTztBQUNoQyxZQUFNLGNBQWMsSUFBSTtBQUN4QixVQUFJLENBQUMsYUFBYSxjQUFjLGFBQWE7QUFDM0Msb0JBQVk7QUFDWixlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsS0FqQ2Usa0JBQUFELFdBQUEsb0JBQUFBLFdBQUE7QUFBQSxHQURGO0FBQUEsQ0FzQ1YsQ0FBVUEs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QUNBO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEdBWGVELG9DQUFBOzs7QWxFTFYsSUFBTUUsaUJBQWdCO0FBQUE7QUFBQSxFQUUzQixHQUFHO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUNMOyIsCiAgIm5hbWVzIjogWyJDb21wcmVzc2VkTmZ0IiwgIlNvbGFuYUpzb25Db25maWciLCAiQ29uc3RhbnRzIiwgIldhcm5uaW5nTWVzc2FnZSIsICJDbHVzdGVyIiwgIkVuZFBvaW50VXJsIiwgIkJ1bmRsclVybCIsICJEYXNBcGlVcmwiLCAiTmZ0c3RvcmFnZUFwaUtleSIsICJjdXN0b21DbHVzdGVyVXJsIiwgImltcG9ydF93ZWIzIiwgIkFjY291bnQiLCAiQXNzb2NpYXRlZCIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiYnMiLCAiT3JpZ2luYWwiLCAiaW1wb3J0X3dlYjMiLCAiQWNjb3VudCIsICJQZGEiLCAiQk4iLCAiQWNjb3VudCIsICJpbXBvcnRfYnM1OCIsICJBY2NvdW50IiwgImJzIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF93ZWIzIiwgIkRhc0FwaSIsICJDb252ZXJ0ZXIiLCAiQ29sbGVjdGlvbiIsICJDb2xsZWN0aW9uTWludCIsICJDb252ZXJ0ZXIiLCAiQ3JlYXRvcnMiLCAiQ29udmVydGVyIiwgIkNvbXByZXNzZWROZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUm95YWx0eSIsICJDb252ZXJ0ZXIiLCAiTmZ0IiwgIkNvbnZlcnRlciIsICJNZW1vIiwgIkNvbnZlcnRlciIsICJNaW50IiwgIkNvbnZlcnRlciIsICJSZWd1bGFyTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlByb3BlcnRpZXMiLCAiQ29udmVydGVyIiwgIlVzZXMiLCAiQ29udmVydGVyIiwgIlRva2VuTWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXIiLCAiQ29udmVydGVyIiwgIkRhc0FwaSIsICJDb252ZXJ0ZXIiLCAiRGFzQXBpIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJQcmlvcml0eUZlZSIsICJEYXNBcGkiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlJlc3VsdCIsICJpbXBvcnRfd2ViMyIsICJOb2RlIiwgImltcG9ydF9tcGxfYnViYmxlZ3VtX2luc3RydWN0aW9uIiwgIkNvbXByZXNzZWROZnQiLCAiRGFzQXBpIiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIkNvbXByZXNzZWROZnQiLCAiRGFzQXBpIiwgImltcG9ydF93ZWIzIiwgIkNvbXByZXNzZWROZnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9tcGxfYnViYmxlZ3VtX2luc3RydWN0aW9uIiwgImltcG9ydF9zcGxfYWNjb3VudF9jb21wcmVzc2lvbiIsICJDb21wcmVzc2VkTmZ0IiwgIkRhc0FwaSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tcHJlc3NlZE5mdCIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJQcm92ZW5hbmNlTGF5ZXIiLCAidXBsb2FkRmlsZSIsICJJcnlzIiwgIkFyd2VhdmUiLCAiaW1wb3J0X25mdCIsICJOZnRTdG9yYWdlIiwgIlN0b3JhZ2UiLCAiVmFsaWRhdG9yIiwgIk1lc3NhZ2UiLCAiQ29udmVydGVyIiwgImltcG9ydF9zcGxfYWNjb3VudF9jb21wcmVzc2lvbiIsICJpbXBvcnRfbXBsX2J1YmJsZWd1bSIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfbXBsX2J1YmJsZWd1bV9pbnN0cnVjdGlvbiIsICJDb21wcmVzc2VkTmZ0IiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9tcGxfYnViYmxlZ3VtX2luc3RydWN0aW9uIiwgImltcG9ydF9zcGxfYWNjb3VudF9jb21wcmVzc2lvbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIkNvbXByZXNzZWROZnQiLCAiRGFzQXBpIiwgIkFjY291bnQiLCAiQ29udmVydGVyIiwgIkJVQkJMRUdVTV9QUk9HUkFNX0lEIiwgIlRPS0VOX01FVEFEQVRBX1BST0dSQU1fSUQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgIk1BWF9SRVRSSUVTIiwgIkNvbnZlcnRlciIsICJmZXRjaCIsICJBY2NvdW50IiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfd2ViMyIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiU3BsVG9rZW4iLCAibWludCIsICJBY2NvdW50IiwgIkNvbnZlcnRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlNwbFRva2VuIiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiUmVndWxhck5mdCIsICJEYXNBcGkiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAibWludCIsICJBY2NvdW50IiwgIkNvbnZlcnRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiUmVndWxhck5mdCIsICJDb252ZXJ0ZXIiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiUmVndWxhck5mdCIsICJTcGxUb2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAiQ29udmVydGVyIiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJSZWd1bGFyTmZ0IiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiUmVndWxhck5mdCIsICJDb21wcmVzc2VkTmZ0IiwgIlJlZ3VsYXJOZnQiLCAiQ29tcHJlc3NlZE5mdCJdCn0K