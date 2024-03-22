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
    DasApiUrl2["dev"] = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92";
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
        const urls = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92" /* dev */.split(",");
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
  Constants2.MAX_TRANSACTION_VERSION = 0;
  Constants2.MAX_TRANSACTION_RETRIES = 1;
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
var import_web33 = require("@solana/web3.js");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_mpl_bubblegum_instructions = require("mpl-bubblegum-instructions");
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
        import_mpl_bubblegum_instructions.PROGRAM_ADDRESS.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = import_web33.PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        import_mpl_bubblegum_instructions.PROGRAM_ADDRESS.toPublicKey()
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
        import_mpl_bubblegum_instructions.PROGRAM_ADDRESS.toPublicKey()
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

// ../transaction-builder/src/priority-fee.ts
var import_web36 = require("@solana/web3.js");

// ../transaction-builder/src/compute-unit.ts
var import_web35 = require("@solana/web3.js");

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

// ../transaction-builder/src/compute-unit.ts
var TransactionBuilder;
((TransactionBuilder9) => {
  const DEFAULUT_COMPUTE_UNIT = 2e5;
  const MINIMUM_COMPUTE_UNIT = 450;
  let ComputeUnit;
  ((ComputeUnit2) => {
    ComputeUnit2.createInstruction = async (instructions, payer) => {
      const units = await (0, ComputeUnit2.simulate)(instructions, payer);
      return import_web35.ComputeBudgetProgram.setComputeUnitLimit({
        units
      });
    };
    ComputeUnit2.simulate = async (instructions, payer) => {
      const tx = new import_web35.Transaction();
      tx.recentBlockhash = import_web35.PublicKey.default.toString();
      instructions.forEach((inst) => tx.add(inst));
      tx.feePayer = payer.publicKey;
      tx.verifySignatures(false);
      const simulation = await Node.getConnection().simulateTransaction(tx);
      if (simulation.value.err) {
        debugLog("# Error simulation: ", simulation);
        return 0;
      }
      const units = simulation.value.unitsConsumed || DEFAULUT_COMPUTE_UNIT;
      debugLog("# get simulate transaction: ", units);
      let cu = 0;
      if (units === 0) {
        cu = DEFAULUT_COMPUTE_UNIT;
      } else if (units < MINIMUM_COMPUTE_UNIT) {
        cu = MINIMUM_COMPUTE_UNIT;
      } else {
        cu = Math.trunc(units * 1.1);
      }
      debugLog("# simulate cu: ", cu);
      return cu;
    };
  })(ComputeUnit = TransactionBuilder9.ComputeUnit || (TransactionBuilder9.ComputeUnit = {}));
})(TransactionBuilder || (TransactionBuilder = {}));

// ../transaction-builder/src/priority-fee.ts
var TransactionBuilder2;
((TransactionBuilder9) => {
  let PriorityFee;
  ((PriorityFee2) => {
    const MAX_RECENT_PRIORITY_FEE_ACCOUNTS = 128;
    const MICRO_LAMPORTS_PER_LAMPORT = 1e6;
    PriorityFee2.createInstruction = async (instructions, addSolPriorityFee, feePayer) => {
      let unitPrice = 0;
      if (addSolPriorityFee && feePayer) {
        const microLamports = addSolPriorityFee.toLamports() * MICRO_LAMPORTS_PER_LAMPORT;
        const cu = await TransactionBuilder.ComputeUnit.simulate(
          instructions,
          feePayer
        );
        unitPrice = Math.trunc(microLamports / cu);
      } else {
        unitPrice = await (0, PriorityFee2.estimatePriorityFee)(instructions);
      }
      debugLog("# unit price(microLamports): ", unitPrice);
      return import_web36.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: unitPrice
      });
    };
    PriorityFee2.estimatePriorityFee = async (instructions) => {
      const writableAccounts = instructions.map(
        (inst) => inst.keys.filter((account) => account.isWritable).map((key) => key.pubkey)
      ).flat();
      const uniqWritableAccounts = [
        ...new Set(writableAccounts.map((account) => account.toBase58()))
      ].map((account) => account.toPublicKey()).slice(0, MAX_RECENT_PRIORITY_FEE_ACCOUNTS);
      const priorityFees = await Node.getConnection().getRecentPrioritizationFees({
        lockedWritableAccounts: uniqWritableAccounts
      });
      if (priorityFees.length < 1) {
        debugLog("# get recent priority fees: ", priorityFees);
        return 0;
      }
      const groupBySlot = priorityFees.reduce(
        (acc, fee) => {
          const key = fee.slot;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(fee);
          return acc;
        },
        {}
      );
      const maxFeeBySlot = Object.keys(groupBySlot).reduce(
        (acc, slot) => {
          acc[slot] = groupBySlot[slot].reduce((max, fee) => {
            return fee.prioritizationFee > max.prioritizationFee ? fee : max;
          });
          return acc;
        },
        {}
      );
      const maximumFees = Object.values(maxFeeBySlot).sort(
        (a, b) => a.slot - b.slot
      );
      const recentFees = maximumFees.slice(
        Math.max(maximumFees.length - 20, 0)
      );
      const mid = Math.floor(recentFees.length / 2);
      const medianFee = recentFees.length % 2 !== 0 ? recentFees[mid].prioritizationFee : (recentFees[mid - 1].prioritizationFee + recentFees[mid].prioritizationFee) / 2;
      debugLog("# median fee: ", medianFee);
      return Math.ceil(medianFee);
    };
  })(PriorityFee = TransactionBuilder9.PriorityFee || (TransactionBuilder9.PriorityFee = {}));
})(TransactionBuilder2 || (TransactionBuilder2 = {}));

// ../transaction-builder/src/batch.ts
var TransactionBuilder3;
((TransactionBuilder9) => {
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
        if (options.isPriorityFee) {
          instructions.unshift(
            await TransactionBuilder2.PriorityFee.createInstruction(
              instructions,
              options.addSolPriorityFee,
              finalSigners[0]
            )
          );
        }
        instructions.unshift(
          await TransactionBuilder.ComputeUnit.createInstruction(
            instructions,
            finalSigners[0]
          )
        );
        instructions.map((inst) => transaction.add(inst));
        const confirmOptions = {
          maxRetries: Constants.MAX_TRANSACTION_RETRIES
        };
        return await (0, import_web37.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          confirmOptions
        );
      });
    };
  }
  TransactionBuilder9.Batch = Batch;
})(TransactionBuilder3 || (TransactionBuilder3 = {}));

// ../transaction-builder/src/common.ts
var import_web38 = require("@solana/web3.js");
var TransactionBuilder4;
((TransactionBuilder9) => {
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
        const transaction = new import_web38.Transaction();
        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;
        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }
        if (options.isPriorityFee) {
          this.instructions.unshift(
            await TransactionBuilder2.PriorityFee.createInstruction(
              this.instructions,
              options.addSolPriorityFee,
              finalSigners[0]
            )
          );
        }
        this.instructions.unshift(
          await TransactionBuilder.ComputeUnit.createInstruction(
            this.instructions,
            finalSigners[0]
          )
        );
        this.instructions.forEach((inst) => transaction.add(inst));
        const confirmOptions = {
          maxRetries: Constants.MAX_TRANSACTION_RETRIES
        };
        return await (0, import_web38.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          confirmOptions
        );
      });
    };
  }
  TransactionBuilder9.Common = Common;
})(TransactionBuilder4 || (TransactionBuilder4 = {}));

// ../transaction-builder/src/mint.ts
var import_web39 = require("@solana/web3.js");
var TransactionBuilder5;
((TransactionBuilder9) => {
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
          this.instructions.unshift(
            await TransactionBuilder2.PriorityFee.createInstruction(
              this.instructions,
              options.addSolPriorityFee,
              finalSigners[0]
            )
          );
        }
        this.instructions.unshift(
          await TransactionBuilder.ComputeUnit.createInstruction(
            this.instructions,
            finalSigners[0]
          )
        );
        const confirmOptions = {
          maxRetries: Constants.MAX_TRANSACTION_RETRIES
        };
        return await (0, import_web39.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          confirmOptions
        );
      });
    };
  }
  TransactionBuilder9.Mint = Mint;
})(TransactionBuilder5 || (TransactionBuilder5 = {}));

// ../transaction-builder/src/partial-sign.ts
var import_web310 = require("@solana/web3.js");
var TransactionBuilder6;
((TransactionBuilder9) => {
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
        const confirmOptions = {
          maxRetries: Constants.MAX_TRANSACTION_RETRIES
        };
        transaction.partialSign(options.feePayer.toKeypair());
        const wireTransaction = transaction.serialize();
        return await Node.getConnection().sendRawTransaction(
          wireTransaction,
          confirmOptions
        );
      });
    };
  }
  TransactionBuilder9.PartialSign = PartialSign;
})(TransactionBuilder6 || (TransactionBuilder6 = {}));

// ../transaction-builder/src/calculate-txsize.ts
var TransactionBuilder7;
((TransactionBuilder9) => {
  const LOW_VALUE = 127;
  const HIGH_VALUE = 16383;
  const MAX_TRANSACTION_SIZE = 1232;
  const compactHeader = (n) => n <= LOW_VALUE ? 1 : n <= HIGH_VALUE ? 2 : 3;
  const compactArraySize = (n, size) => compactHeader(n) + n * size;
  TransactionBuilder9.calculateTxSize = (transaction, feePayer) => {
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
  TransactionBuilder9.isOverTransactionSize = (transaction, feePayer) => {
    return (0, TransactionBuilder9.calculateTxSize)(transaction, feePayer) > MAX_TRANSACTION_SIZE;
  };
})(TransactionBuilder7 || (TransactionBuilder7 = {}));

// ../transaction-builder/src/index.ts
var TransactionBuilder8 = {
  ...TransactionBuilder3,
  ...TransactionBuilder7,
  ...TransactionBuilder4,
  ...TransactionBuilder,
  ...TransactionBuilder5,
  ...TransactionBuilder6,
  ...TransactionBuilder2
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
  const batchOptions = {
    feePayer: options.feePayer,
    isPriorityFee: options.isPriorityFee,
    instructions
  };
  debugLog("# Result batch submit()");
  return new TransactionBuilder8.Batch().submit(batchOptions);
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
((Result32) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result32.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result32.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result32.ok(resArr);
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
    return Result32.ok(res);
  }
  Result32.all = all;
})(Result || (Result = {}));

// ../node/src/index.ts
var import_web311 = require("@solana/web3.js");
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
    return new import_web311.Connection(setted.clusterUrl, setted.commitment);
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
      throw Error(err);
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
var import_mpl_bubblegum_instructions2 = require("mpl-bubblegum-instructions");
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
        tokenStandard: import_mpl_bubblegum_instructions2.TokenStandard.NonFungible,
        tokenProgramVersion: import_mpl_bubblegum_instructions2.TokenProgramVersion.Original
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
    Properties2.intoInfra = async (input, callbackFunc, storageType, options = {}) => {
      if (!input || !input.files) {
        return {};
      }
      const files = await Promise.all(
        input.files.map(async (file) => {
          if (!file.filePath && !file.uri) {
            return {};
          }
          if (file.filePath) {
            const res = await callbackFunc(
              file.filePath,
              storageType,
              options
            );
            if (res.isErr) {
              throw Error(res.error.message);
            }
            return overwriteObject(file, [
              {
                existsKey: "filePath",
                will: { key: "uri", value: res.value }
              }
            ]);
          }
          return file;
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

// src/delegate.ts
var import_mpl_bubblegum_instructions3 = require("mpl-bubblegum-instructions");
var import_spl_account_compression = require("@solana/spl-account-compression");
var CompressedNft;
((CompressedNft10) => {
  CompressedNft10.createDeleagate = async (assetId, newDelegate) => {
    const rpcAssetProof = await DasApi3.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi3.getAsset(assetId.toString());
    if (rpcAssetProof.isErr || rpcAsset.isErr) {
      throw Error("Rise error when get asset proof or asset");
    }
    debugLog("# asset: ", rpcAsset);
    debugLog("# assetProof: ", rpcAssetProof);
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
    return (0, import_mpl_bubblegum_instructions3.createDelegateInstruction)(
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
      return new TransactionBuilder8.Common([inst], [owner.toKeypair()]);
    });
  };
})(CompressedNft || (CompressedNft = {}));

// src/find.ts
var import_spl_account_compression2 = require("@solana/spl-account-compression");
var import_bs583 = __toESM(require("bs58"));
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
  CompressedNft10.findMintIdBySignature = async (signature) => {
    return Try(async () => {
      await Node.confirmedSig(signature, Constants.COMMITMENT);
      const txResponse = await Node.getConnection().getTransaction(signature, {
        commitment: Constants.COMMITMENT,
        maxSupportedTransactionVersion: Constants.MAX_TRANSACTION_VERSION
      });
      if (!txResponse)
        throw Error("No txResponse provided");
      const accountKeys = txResponse.transaction.message.getAccountKeys().keySegments().flat();
      const changeLogEvents = [];
      txResponse.meta?.innerInstructions?.forEach((compiledIx) => {
        compiledIx.instructions.forEach((innerIx) => {
          if (import_spl_account_compression2.SPL_NOOP_PROGRAM_ID.toBase58() !== accountKeys[innerIx.programIdIndex].toBase58()) {
            return;
          }
          try {
            changeLogEvents.push(
              (0, import_spl_account_compression2.deserializeChangeLogEventV1)(
                Buffer.from(import_bs583.default.decode(innerIx.data))
              )
            );
          } catch (_) {
          }
        });
      });
      const leafIndex = changeLogEvents[0].index;
      const spaceOwner = changeLogEvents[0].treeId;
      return Account4.Pda.getAssetId(spaceOwner.toString(), leafIndex);
    });
  };
})(CompressedNft2 || (CompressedNft2 = {}));

// src/gas-less-delegate.ts
var import_web312 = require("@solana/web3.js");
var CompressedNft3;
((CompressedNft10) => {
  CompressedNft10.gasLessDelegate = async (mint, owner, newDelegate, options = {}) => {
    return Try(async () => {
      const inst = await CompressedNft.createDeleagate(
        mint.toPublicKey(),
        newDelegate.toPublicKey()
      );
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web312.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: newDelegate.toPublicKey()
      });
      tx.add(inst);
      if (options.isPriorityFee) {
        tx.instructions.unshift(
          await TransactionBuilder8.PriorityFee.createInstruction(
            tx.instructions,
            options.addSolPriorityFee
          )
        );
      }
      tx.instructions.unshift(
        await TransactionBuilder8.ComputeUnit.createInstruction(
          tx.instructions,
          owner.toKeypair()
        )
      );
      tx.partialSign(owner.toKeypair());
      tx.recentBlockhash = blockhashObj.blockhash;
      return new TransactionBuilder8.PartialSign(
        tx.serialize({
          requireAllSignatures: false
        }).toString("hex")
      );
    });
  };
})(CompressedNft3 || (CompressedNft3 = {}));

// src/gas-less-transfer.ts
var import_web313 = require("@solana/web3.js");

// src/transfer.ts
var import_mpl_bubblegum_instructions4 = require("mpl-bubblegum-instructions");
var import_spl_account_compression3 = require("@solana/spl-account-compression");
var CompressedNft4;
((CompressedNft10) => {
  CompressedNft10.createTransfer = async (assetId, assetIdOwner, dest, delegate) => {
    const assetProof = await DasApi3.getAssetProof(assetId);
    debugLog("# assetProof: ", assetProof);
    if (assetProof.isErr) {
      throw assetProof.error;
    } else if (assetProof.isOk && assetProof.value.proof.length === 0) {
      throw Error("Proof is empty. May be set Regular NFT?");
    }
    const asset = await DasApi3.getAsset(assetId);
    debugLog("# asset: ", asset);
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
    const treeAccount = await import_spl_account_compression3.ConcurrentMerkleTreeAccount.fromAccountAddress(
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
    return (0, import_mpl_bubblegum_instructions4.createTransferInstruction)(
      {
        merkleTree,
        treeAuthority,
        leafOwner,
        leafDelegate,
        newLeafOwner,
        logWrapper: import_spl_account_compression3.SPL_NOOP_PROGRAM_ID,
        compressionProgram: import_spl_account_compression3.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
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
      return new TransactionBuilder8.Common([inst], keypairs);
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
      const tx = new import_web313.Transaction({
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
        tx.instructions.unshift(
          await TransactionBuilder8.PriorityFee.createInstruction(
            tx.instructions,
            options.addSolPriorityFee
          )
        );
      }
      tx.instructions.unshift(
        await TransactionBuilder8.ComputeUnit.createInstruction(
          tx.instructions,
          owner.toKeypair()
        )
      );
      tx.recentBlockhash = blockhashObj.blockhash;
      return new TransactionBuilder8.PartialSign(
        tx.serialize({
          requireAllSignatures: false
        }).toString("hex")
      );
    });
  };
})(CompressedNft5 || (CompressedNft5 = {}));

// ../suite-storage/src/provenance-layer.ts
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

// ../suite-storage/src/arweave.ts
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

// ../suite-storage/src/nft-storage.ts
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

// ../suite-storage/src/storage.ts
var Storage;
((Storage3) => {
  Storage3.toConvertOffchaindata = (input, sellerFeeBasisPoints) => {
    const data = {
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      seller_fee_basis_points: sellerFeeBasisPoints,
      animation_url: input.animation_url,
      external_url: input.external_url,
      attributes: input.attributes,
      properties: input.properties,
      image: "",
      options: input.options
    };
    return data;
  };
  Storage3.uploadFile = async (filePath, storageType, options = {}) => {
    if (storageType === "arweave") {
      if (!options.feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      return await Arweave.uploadFile(filePath, options.feePayer);
    } else if (storageType === "nftStorage") {
      return await NftStorage.uploadFile(filePath);
    } else {
      throw Error("Not found storageType");
    }
  };
  Storage3.uploadData = async (input, storageType, options = {}) => {
    if (storageType === "arweave") {
      if (!options.feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      return await Arweave.uploadData(input, options.feePayer);
    } else if (storageType === "nftStorage") {
      return await NftStorage.uploadData(input);
    } else {
      throw Error("Not found storageType");
    }
  };
  Storage3.upload = async (input, filePath, storageType, options = {}) => {
    if (storageType === "arweave" && !options.feePayer) {
      throw Error("Arweave needs to have feepayer");
    }
    const storage = await (await (0, Storage3.uploadFile)(filePath, storageType, options)).unwrap(
      async (ok) => {
        input.image = ok;
        return await (0, Storage3.uploadData)(input, storageType, options);
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

// ../suite-storage/src/index.ts
var Storage2 = {
  ...Storage
};

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

// src/mint.ts
var import_mpl_bubblegum_instructions5 = require("mpl-bubblegum-instructions");
var import_spl_account_compression4 = require("@solana/spl-account-compression");
var import_mpl_token_metadata2 = require("@metaplex-foundation/mpl-token-metadata");
var CompressedNft6;
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
    return (0, import_mpl_bubblegum_instructions5.createVerifyCreatorInstruction)(
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
        creatorHash: [...(0, import_mpl_bubblegum_instructions5.computeCreatorHash)(creators)],
        dataHash: [...(0, import_mpl_bubblegum_instructions5.computeDataHash)(metadata)],
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
          Storage2.uploadFile,
          storageType,
          { feePayer: payer }
        );
      }
      input = {
        ...input,
        properties,
        storageType
      };
      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter14.Royalty.intoInfra(royalty);
      const storageMetadata = Storage2.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints
      );
      let uri;
      if (input.filePath) {
        const uploaded = await Storage2.upload(
          storageMetadata,
          input.filePath,
          storageType,
          { feePayer: payer }
        );
        debugLog("# upload content url: ", uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage2.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          { feePayer: payer }
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
        (0, import_mpl_bubblegum_instructions5.createMintToCollectionV1Instruction)(
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
            collectionAuthorityRecordPda: import_mpl_bubblegum_instructions5.PROGRAM_ID,
            compressionProgram: import_spl_account_compression4.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            tokenMetadataProgram: import_mpl_token_metadata2.PROGRAM_ID
          },
          {
            metadataArgs
          }
        )
      );
      return new TransactionBuilder8.Common(
        instructions,
        [owner.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(CompressedNft6 || (CompressedNft6 = {}));

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
      return new TransactionBuilder8.Common(
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
      return new TransactionBuilder8.Common([inst], keypairs, payer.toKeypair());
    });
  };
})(SplToken3 || (SplToken3 = {}));

// ../suite-spl-token/src/find.ts
var import_mpl_token_metadata3 = require("@metaplex-foundation/mpl-token-metadata");
var import_spl_token4 = require("@solana/spl-token");
var import_cross_fetch = __toESM(require("cross-fetch"));
var SplToken4;
((SplToken11) => {
  const MAX_RETRIES = 10;
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
      if (retries < MAX_RETRIES) {
        debugLog(`Error fetching data from ${url}, ${retries}, ${error}`);
        await sleep(RETRY_DELAY);
        return fetchRetry(url, retries + 1);
      } else {
        debugLog(`Max retries reached (${MAX_RETRIES})`);
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
      return new TransactionBuilder8.Common(
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
        tx.instructions.unshift(
          await TransactionBuilder8.PriorityFee.createInstruction(
            tx.instructions,
            options.addSolPriorityFee
          )
        );
      }
      tx.instructions.unshift(
        await TransactionBuilder8.ComputeUnit.createInstruction(
          tx.instructions,
          owner.toKeypair()
        )
      );
      tx.recentBlockhash = blockhashObj.blockhash;
      tx.partialSign(owner.toKeypair());
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new TransactionBuilder8.PartialSign(hex);
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
      const storageMetadata = Storage2.toConvertOffchaindata(
        input,
        input.royalty
      );
      let uri;
      if (input.filePath) {
        const uploaded = await Storage2.upload(
          storageMetadata,
          input.filePath,
          storageType,
          { feePayer: payer }
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage2.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          { feePayer: payer }
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
      return new TransactionBuilder8.Mint(
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
      return new TransactionBuilder8.Common(
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
      return new TransactionBuilder8.Common(
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
      return new TransactionBuilder8.Common(
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
          Storage2.uploadFile,
          storageType,
          { feePayer: payer }
        );
      }
      input = {
        ...input,
        properties,
        storageType
      };
      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter14.Royalty.intoInfra(royalty);
      const storageMetadata = Storage2.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints
      );
      let uri;
      if (input.filePath) {
        const uploaded = await Storage2.upload(
          storageMetadata,
          input.filePath,
          storageType,
          { feePayer: payer }
        );
        debugLog("# upload content url: ", uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage2.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          { feePayer: payer }
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
      return new TransactionBuilder8.Mint(
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
          Storage2.uploadFile,
          storageType
        );
        const storageMetadata = Storage2.toConvertOffchaindata(
          { ...input, properties },
          sellerFeeBasisPoints
        );
        const uploaded = await Storage2.upload(
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
        tx.instructions.unshift(
          await TransactionBuilder8.PriorityFee.createInstruction(
            tx.instructions,
            options.addSolPriorityFee
          )
        );
      }
      tx.instructions.unshift(
        await TransactionBuilder8.ComputeUnit.createInstruction(
          tx.instructions,
          owner.toKeypair()
        )
      );
      tx.recentBlockhash = blockhashObj.blockhash;
      [owner, mint].forEach((signer) => tx.partialSign(signer.toKeypair()));
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new TransactionBuilder8.PartialSign(hex, mint.pubkey);
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
          Storage2.uploadFile,
          storageType,
          { feePayer: payer }
        );
      }
      input = {
        ...input,
        properties
      };
      const storageMetadata = Storage2.toConvertOffchaindata(input, 0);
      storageMetadata.created_at = unixTimestamp();
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage2.upload(
          storageMetadata,
          input.filePath,
          storageType,
          { feePayer: payer }
        );
        debugLog("# upload content url: ", uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage2.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          { feePayer: payer }
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
      return new TransactionBuilder8.Mint(
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
      return new TransactionBuilder8.Common(
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
var CompressedNft7;
((CompressedNft10) => {
  CompressedNft10.mintCollection = (owner, input, options = {}) => {
    const { feePayer, freezeAuthority } = options;
    return RegularNft10.mintCollection(owner, input, {
      feePayer,
      freezeAuthority
    });
  };
})(CompressedNft7 || (CompressedNft7 = {}));

// src/space.ts
var import_spl_account_compression5 = require("@solana/spl-account-compression");
var import_web318 = require("@solana/web3.js");
var import_mpl_bubblegum_instructions6 = require("mpl-bubblegum-instructions");
var CompressedNft8;
((CompressedNft10) => {
  class Space {
    spaceOwner;
    constructor(spaceOwner) {
      this.spaceOwner = spaceOwner;
    }
  }
  CompressedNft10.Space = Space;
  CompressedNft10.initSpace = (owner, maxDepth, maxBufferSize, canopyDepth, options = {}) => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : owner;
      const treeOwner = Account4.Keypair.create();
      const space = (0, import_spl_account_compression5.getConcurrentMerkleTreeAccountSize)(
        maxDepth,
        maxBufferSize,
        canopyDepth
      );
      const [treeAuthority] = import_web318.PublicKey.findProgramAddressSync(
        [treeOwner.toKeypair().publicKey.toBuffer()],
        import_mpl_bubblegum_instructions6.PROGRAM_ADDRESS.toPublicKey()
      );
      const instructions = [];
      debugLog(`# maxDepth: ${maxDepth}, maxBufferSize: ${maxBufferSize}`);
      debugLog("# nft space: ", space);
      if (Constants.isDebugging === "true" || process.env.DEBUG === "true") {
        debugLog("# space cost: ", await (0, CompressedNft10.calculateSpaceCost)(space));
      }
      instructions.push(
        import_web318.SystemProgram.createAccount({
          fromPubkey: payer.toKeypair().publicKey,
          newAccountPubkey: treeOwner.toKeypair().publicKey,
          lamports: await Node.getConnection().getMinimumBalanceForRentExemption(space),
          space,
          programId: import_spl_account_compression5.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID
        })
      );
      instructions.push(
        (0, import_mpl_bubblegum_instructions6.createCreateTreeInstruction)(
          {
            merkleTree: treeOwner.toKeypair().publicKey,
            treeAuthority,
            treeCreator: owner.toKeypair().publicKey,
            payer: payer.toKeypair().publicKey,
            logWrapper: import_spl_account_compression5.SPL_NOOP_PROGRAM_ID,
            compressionProgram: import_spl_account_compression5.SPL_ACCOUNT_COMPRESSION_PROGRAM_ID
          },
          {
            maxBufferSize,
            maxDepth,
            public: false
          },
          import_mpl_bubblegum_instructions6.PROGRAM_ADDRESS.toPublicKey()
        )
      );
      return new TransactionBuilder8.Mint(
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
    const requiredSpace = (0, import_spl_account_compression5.getConcurrentMerkleTreeAccountSize)(
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
    const matched = import_spl_account_compression5.ALL_DEPTH_SIZE_PAIRS.filter(
      (pair) => pair.maxDepth === log2
    )[0];
    const canopyDepth = matched.maxDepth - 5;
    return {
      maxDepth: matched.maxDepth,
      maxBufferSize: matched.maxBufferSize,
      canopyDepth
    };
  };
})(CompressedNft8 || (CompressedNft8 = {}));

// src/index.ts
var CompressedNft9 = {
  ...CompressedNft,
  ...CompressedNft2,
  ...CompressedNft3,
  ...CompressedNft5,
  ...CompressedNft6,
  ...CompressedNft8,
  ...CompressedNft7,
  ...CompressedNft4
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompressedNft
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vZ2xvYmFsL3NyYy9pbmRleC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9hc3NvY2lhdGVkLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2tleXBhaXIudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvcGRhLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2JhdGNoLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3ByaW9yaXR5LWZlZS50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9jb21wdXRlLXVuaXQudHMiLCAiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL3NoYXJlZC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9jb21tb24udHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvbWludC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9wYXJ0aWFsLXNpZ24udHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvY2FsY3VsYXRlLXR4c2l6ZS50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi9zdWl0ZS11dGlscy9zcmMvcmVzdWx0LnRzIiwgIi4uLy4uL25vZGUvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2Rhcy1hcGkvc3JjL2FwaS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jcmVhdG9ycy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbXByZXNzZWQtbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcm95YWx0eS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL25mdC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21lbW8udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcmVndWxhci1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9wcm9wZXJ0aWVzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdXNlcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Rva2VuLW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXItY2hlY2tlZC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vZGFzLWFwaS9zcmMvZmluZC50cyIsICIuLi8uLi9kYXMtYXBpL3NyYy9pbmRleC50cyIsICIuLi9zcmMvZGVsZWdhdGUudHMiLCAiLi4vc3JjL2ZpbmQudHMiLCAiLi4vc3JjL2dhcy1sZXNzLWRlbGVnYXRlLnRzIiwgIi4uL3NyYy9nYXMtbGVzcy10cmFuc2Zlci50cyIsICIuLi9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vc3VpdGUtc3RvcmFnZS9zcmMvcHJvdmVuYW5jZS1sYXllci50cyIsICIuLi8uLi9zdWl0ZS1zdG9yYWdlL3NyYy9hcndlYXZlLnRzIiwgIi4uLy4uL3N1aXRlLXN0b3JhZ2Uvc3JjL25mdC1zdG9yYWdlLnRzIiwgIi4uLy4uL3N1aXRlLXN0b3JhZ2Uvc3JjL3N0b3JhZ2UudHMiLCAiLi4vLi4vc3VpdGUtc3RvcmFnZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdmFsaWRhdG9yL3NyYy9pbmRleC50cyIsICIuLi9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2FkZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2NhbGN1bGF0ZS1hbW91bnQudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZmluZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2ZyZWV6ZS50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9maW5kLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9mcmVlemUudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL21pbnQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2dhcy1sZXNzLW1pbnQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9taW50LWNvbGxlY3Rpb24udHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9pbmRleC50cyIsICIuLi9zcmMvbWludC1jb2xsZWN0aW9uLnRzIiwgIi4uL3NyYy9zcGFjZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBEZWxlZ2F0ZSB9IGZyb20gJy4vZGVsZWdhdGUnO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgR2FzTGVzc0RlbGVnYXRlIH0gZnJvbSAnLi9nYXMtbGVzcy1kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIEdhc0xlc3NUcmFuc2ZlciB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vbWludC1jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgU3BhY2UgfSBmcm9tICcuL3NwYWNlJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTmZ0ID0ge1xuICAuLi5EZWxlZ2F0ZSxcbiAgLi4uRmluZCxcbiAgLi4uR2FzTGVzc0RlbGVnYXRlLFxuICAuLi5HYXNMZXNzVHJhbnNmZXIsXG4gIC4uLk1pbnQsXG4gIC4uLlNwYWNlLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5UcmFuc2Zlcixcbn07XG4iLCAiaW1wb3J0IHsgRmluYWxpdHksIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgU29sYW5hSnNvbkNvbmZpZyBmcm9tICdAc29sYW5hLXN1aXRlL2NvbmZpZy9sb2FkJztcblxuZXhwb3J0IGxldCBDb25maWcgPSBTb2xhbmFKc29uQ29uZmlnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgV2Fybm5pbmdNZXNzYWdlIHtcbiAgICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZUFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBDYW4gZ2V0IGFwaSBrZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgO1xuICAgIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgZGFzQXBpVXJsIGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpIHVybCBmcm9tIGh0dHBzOi8vd3d3LmhlbGl1cy5kZXYvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuICAgICAgICBgO1xuICAgIC8vIGV4cG9ydCBjb25zdCBBTk5PVU5DRSA9IGBcbiAgICAvLyAgICAgW0RFUFJFQ0FURURdXG4gICAgLy8gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gICAgIEFjY291bnQsIE5vZGUsIHRvRXhwbG9yZXIsIFB1YmtleSwgU2VjcmV0IGhhdmUgYmVlbiBtb3ZlZCB0b1xuICAgIC8vICAgICBAc29sYW5hLXN1aXRlL3V0aWxzXG4gICAgLy8gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAgICAgYDtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBjb25zdCBjdXJyZW50Q2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGV4cG9ydCBjb25zdCBjdXN0b21DbHVzdGVyVXJsID0gQ29uZmlnLmNsdXN0ZXIuY3VzdG9tQ2x1c3RlclVybDtcbiAgZXhwb3J0IGNvbnN0IGlzRGVidWdnaW5nID0gQ29uZmlnLmRlYnVnZ2luZztcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbU5mdFN0b3JhZ2VBcGlLZXkgPSBDb25maWcubmZ0U3RvcmFnZUFwaUtleTtcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbURhc0FwaVVybCA9IENvbmZpZy5kYXNBcGlVcmw7XG5cbiAgZXhwb3J0IGVudW0gQ2x1c3RlciB7XG4gICAgcHJkID0gJ21haW5uZXQtYmV0YScsXG4gICAgcHJkTWV0YXBsZXggPSAnbWFpbm5ldC1iZXRhLW1ldGFwbGV4JyxcbiAgICBkZXYgPSAnZGV2bmV0JyxcbiAgICBsb2NhbGhvc3QgPSAnbG9jYWxob3N0LWRldm5ldCcsXG4gIH1cblxuICBleHBvcnQgZW51bSBFbmRQb2ludFVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vYXBpLm1haW5uZXQtYmV0YS5zb2xhbmEuY29tJyxcbiAgICBwcmRNZXRhcGxleCA9ICdodHRwczovL2FwaS5tZXRhcGxleC5zb2xhbmEuY29tJyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICAgIGxvY2FsaG9zdCA9ICdodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEJ1bmRsclVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbm9kZTEuaXJ5cy54eXosaHR0cHM6Ly9ub2RlMi5pcnlzLnh5eicsXG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmlyeXMueHl6JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIERhc0FwaVVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbWFpbm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTInLFxuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTInLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gTmZ0c3RvcmFnZUFwaUtleSB7XG4gICAgcHJkID0gJ2V5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSmthV1E2WlhSb2Nqb3dlRVJHTWpjeU4yVmtPRFpoUkdVMVJUTXlaRFpEWkVKbE9EYzBZelJGTkRsRU9EWTFPV1ptT0VNaUxDSnBjM01pT2lKdVpuUXRjM1J2Y21GblpTSXNJbWxoZENJNk1UWXlNREkyTkRrME16Y3dOaXdpYm1GdFpTSTZJbVJsYlc4aWZRLmQ0SjcwbWlreFJCOGE1dndOdTZTTzVIREE4SmF1ZXVzZUFqN1FfeXRNQ0UnLFxuICAgIGRldiA9IHByZCxcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hDbHVzdGVyID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHsgY2x1c3RlcjogZW52LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcblxuICAgIC8vIGlmIHNldHRlZCBjdXN0b20gdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwgJiYgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21DbHVzdGVyVXJsW2luZGV4XTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkO1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmRNZXRhcGxleDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwubG9jYWxob3N0O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQnVuZGxyID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuQnVuZGxyVXJsLmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaERhc0FwaSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSBkYXMgdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbURhc0FwaVVybCAmJiBjdXN0b21EYXNBcGlVcmwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgY3VzdG9tRGFzQXBpVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21EYXNBcGlVcmxbaW5kZXhdO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBpZiAoY3VzdG9tRGFzQXBpVXJsLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5EQVNfQVBJX1VSTCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5EYXNBcGlVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuRGFzQXBpVXJsLmRldi5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoTmZ0U3RvcmFnZSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSBuZnQuc3RvcmFnZSBhcGkga2V5LCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbU5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgIHJldHVybiBjdXN0b21OZnRTdG9yYWdlQXBpS2V5O1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5OZnRzdG9yYWdlQXBpS2V5LnByZDtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5OZnRzdG9yYWdlQXBpS2V5LmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGxvYWRDb25maWcgPSBhc3luYyAoKSA9PiB7XG4gICAgQ29uZmlnID0gYXdhaXQgaW1wb3J0KCdAc29sYW5hLXN1aXRlL2NvbmZpZy9sb2FkJyk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IFdSQVBQRURfVE9LRU5fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ1NvMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTInLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVNT19QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnTWVtbzFVaGtKUmZIeXZMTWNWdWNKd3hYZXVENzI4RXFWRER3UUR4Rk1ObycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRVRBUExFWF9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnbWV0YXFieHhVZXJkcTI4Y2oxUmJBV2tZUW0zeWJ6amI2YThidDUxOHgxcycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBDT01NSVRNRU5UOiBGaW5hbGl0eSA9ICdjb25maXJtZWQnO1xuICBleHBvcnQgY29uc3QgTUFYX1RSQU5TQUNUSU9OX1ZFUlNJT046IG51bWJlciA9IDA7XG4gIGV4cG9ydCBjb25zdCBNQVhfVFJBTlNBQ1RJT05fUkVUUklFUyA9IDE7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9HQVRFV0FZX1VSTCA9ICdodHRwczovL2lwZnMuaW8vaXBmcyc7XG4gIGV4cG9ydCBjb25zdCBJUllTX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vZ2F0ZXdheS5pcnlzLnh5eic7XG4gIGV4cG9ydCBjb25zdCBCVU5ETFJfTkVUV09SS19VUkwgPSBzd2l0Y2hCdW5kbHIoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IHN3aXRjaERhc0FwaShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPSBzd2l0Y2hOZnRTdG9yYWdlKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MU0NBTl9VUkwgPSAnaHR0cHM6Ly9zb2xzY2FuLmlvJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTEFOQUZNX1VSTCA9ICdodHRwczovL3NvbGFuYS5mbSc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9YUkFZX1VSTCA9ICdodHRwczovL3hyYXkuaGVsaXVzLnh5eic7XG59XG5cbi8vIERpc3BsYXkgQWxsIEFubm91bmNlXG4vLyBjb25zb2xlLmxvZyhDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkFOTk9VTkNFKTtcbiIsICJpbXBvcnQgeyBLZXlwYWlyLCBMQU1QT1JUU19QRVJfU09MLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgQ29uZmlnLCBDb25zdGFudHMsIGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IEJpZ051bWJlciB9IGZyb20gJ2JpZ251bWJlci5qcyc7XG5pbXBvcnQgeyBFeHBsb3JlciwgRXhwbG9yZXJPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9nbG9iYWwnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG4vKipcbiAqIENyZWF0ZSBleHBsb3JlciB1cmwgZm9yIGFjY291bnQgYWRkcmVzcyBvciBzaWduYXR1cmVcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0V4cGxvcmVyVXJsID0gZnVuY3Rpb24gKFxuICBleHBsb3JlcjogRXhwbG9yZXIgPSBFeHBsb3Jlci5Tb2xzY2FuLFxuICBvcHRpb25zOiBQYXJ0aWFsPEV4cGxvcmVyT3B0aW9ucz4gPSB7fSxcbikge1xuICBsZXQgY2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGRlYnVnTG9nKCcjIGNsdXN0ZXJUeXBlOicsIGNsdXN0ZXIpO1xuICBpZiAoY2x1c3RlciAhPT0gQ29uc3RhbnRzLkNsdXN0ZXIucHJkKSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfVxuXG4gIGNvbnN0IGFkZHJlc3NPclNpZ25hdHVyZTogc3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICBsZXQgdXJsID0gJyc7XG5cbiAgaWYgKG9wdGlvbnMucmVwbGFjZVBhdGgpIHtcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgaWYgKEFjY291bnQuS2V5cGFpci5pc1B1YmtleShhZGRyZXNzT3JTaWduYXR1cmUpKSB7XG4gICAgLy8gYWRkcmVzc1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L2FkZHJlc3MvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHNpZ25hdHVyZVxuICAgIC8vIGZvciBJbnZhbGlkIHR5cGUgXCJuZXZlclwiIG9mIGFkZHJlc3NPclNpZ25hdHVyZSwgc28gYGFzIHN0cmluZ2BcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXJsO1xufTtcblxuLyoqXG4gKiBQdWJLZXkoQHNvbGFuYS1zdWl0ZSkgdG8gUHVibGljS2V5KEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBQdWJsaWNLZXlcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b1B1YmxpY0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNQdWJrZXkodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlB1YktleTogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy50b1N0cmluZygpKTtcbn07XG5cbi8qKlxuICogU2VjcmV0KEBzb2xhbmEtc3VpdGUpIHRvIEtleXBhaXIoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIEtleXBhaXJcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0tleXBhaXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzU2VjcmV0KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5TZWNyZXQ6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy50b1N0cmluZygpKTtcbiAgcmV0dXJuIEtleXBhaXIuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbn07XG5cbi8qKlxuICogTEFNUE9SVFMgdG8gU09MXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9Tb2wgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC50aW1lcyhMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBY2NvdW50LFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcixcbiAgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuLyoqXG4gKiBHZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAqXG4gKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsb3dPd25lck9mZkN1cnZlXG4gKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPlxuICovXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIEFzc29jaWF0ZWQge1xuICAgIC8qKlxuICAgICAqIFtNYWluIGxvZ2ljXUdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gICAgICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAgICovXG4gICAgZXhwb3J0IGNvbnN0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyPzogUHVia2V5LFxuICAgICAgYWxsb3dPd25lck9mZkN1cnZlID0gZmFsc2UsXG4gICAgKTogUHJvbWlzZTx7XG4gICAgICB0b2tlbkFjY291bnQ6IHN0cmluZztcbiAgICAgIGluc3Q6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgfT4gPT4ge1xuICAgICAgY29uc3QgYXNzb2NpYXRlZFRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gRG9udCB1c2UgUmVzdWx0XG4gICAgICAgIGF3YWl0IGdldEFjY291bnQoXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKS5jb21taXRtZW50LFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yKSAmJlxuICAgICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gb3duZXIgOiBmZWVQYXllcjtcblxuICAgICAgICBjb25zdCBpbnN0ID0gY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICAgIHBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3QsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEtleXBhaXIgYXMgT3JpZ2luYWwsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBjbGFzcyBLZXlwYWlyIHtcbiAgICBzZWNyZXQ6IFNlY3JldDtcbiAgICBwdWJrZXk6IFB1YmtleTtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwdWJrZXk/OiBQdWJrZXk7IHNlY3JldDogU2VjcmV0IH0pIHtcbiAgICAgIGlmICghcGFyYW1zLnB1YmtleSkge1xuICAgICAgICBjb25zdCBrZXlwYWlyID0gcGFyYW1zLnNlY3JldC50b0tleXBhaXIoKTtcbiAgICAgICAgdGhpcy5wdWJrZXkgPSBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdWJrZXkgPSBwYXJhbXMucHVia2V5O1xuICAgICAgfVxuICAgICAgdGhpcy5zZWNyZXQgPSBwYXJhbXMuc2VjcmV0O1xuICAgIH1cblxuICAgIHRvUHVibGljS2V5KCk6IFB1YmxpY0tleSB7XG4gICAgICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnB1YmtleSk7XG4gICAgfVxuXG4gICAgdG9LZXlwYWlyKCk6IE9yaWdpbmFsIHtcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy5zZWNyZXQpO1xuICAgICAgcmV0dXJuIE9yaWdpbmFsLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzUHVia2V5ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBQdWJrZXkgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17MzIsNDR9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgaXNTZWNyZXQgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFNlY3JldCA9PlxuICAgICAgL15bMC05YS16QS1aXXs4Nyw4OH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBjcmVhdGUgPSAoKTogS2V5cGFpciA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlyID0gT3JpZ2luYWwuZ2VuZXJhdGUoKTtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvS2V5UGFpciA9IChrZXlwYWlyOiBPcmlnaW5hbCk6IEtleXBhaXIgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUFJPR1JBTV9BRERSRVNTIGFzIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb25zJztcbmltcG9ydCBCTiBmcm9tICdibi5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUGRhIHtcbiAgICBleHBvcnQgY29uc3QgZ2V0TWV0YWRhdGEgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldE1hc3RlckVkaXRpb24gPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2VkaXRpb24nKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0VHJlZUF1dGhvcml0eSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW2FkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEJndW1TaWduZXIgPSAoKTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtCdWZmZXIuZnJvbSgnY29sbGVjdGlvbl9jcGknLCAndXRmOCcpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEFzc2V0SWQgPSAoYWRkcmVzczogUHVia2V5LCBsZWFmSW5kZXg6IG51bWJlcik6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gbmV3IEJOLkJOKGxlYWZJbmRleCk7XG4gICAgICBjb25zdCBbYXNzZXRJZF0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdhc3NldCcsICd1dGY4JyksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgVWludDhBcnJheS5mcm9tKG5vZGUudG9BcnJheSgnbGUnLCA4KSksXG4gICAgICAgIF0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBhc3NldElkLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFjY291bnQgYXMgQWFzc29jaWF0ZWQgfSBmcm9tICcuL2Fzc29jaWF0ZWQnO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcbmltcG9ydCB7IEFjY291bnQgYXMgUGRhIH0gZnJvbSAnLi9wZGEnO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG4vLyBpbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSB7XG4gIC4uLkFhc3NvY2lhdGVkLFxuICAuLi5LZXlwYWlyLFxuICAuLi5QZGEsXG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFByaW9yaXR5RmVlIH0gZnJvbSAnLi9wcmlvcml0eS1mZWUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbXB1dGVVbml0IH0gZnJvbSAnLi9jb21wdXRlLXVuaXQnO1xuaW1wb3J0IHsgQmF0Y2hTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQmF0Y2gge1xuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8QmF0Y2hTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBvcHRpb25zLmluc3RydWN0aW9ucycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbW1vbk9yTWludEluc3QgPSBvcHRpb25zLmluc3RydWN0aW9ucztcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3Qgb2YgY29tbW9uT3JNaW50SW5zdCkge1xuICAgICAgICAgIGlmICghaW5zdC5pbnN0cnVjdGlvbnMgJiYgIWluc3Quc2lnbmVycykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgIGBvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgYmF0Y2hTdWJtaXQoKS5cbiAgICAgICAgICAgIEluZGV4OiAke2l9LCBTZXQgdmFsdWU6ICR7SlNPTi5zdHJpbmdpZnkoaW5zdCl9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGNvbW1vbk9yTWludEluc3QuZmxhdE1hcChcbiAgICAgICAgICAoaW5zdCkgPT4gaW5zdC5pbnN0cnVjdGlvbnMsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNpZ25lcnMgPSBjb21tb25Pck1pbnRJbnN0LmZsYXRNYXAoKGluc3QpID0+IGluc3Quc2lnbmVycyk7XG4gICAgICAgIGNvbnN0IGZlZVBheWVycyA9IGNvbW1vbk9yTWludEluc3QuZmlsdGVyKFxuICAgICAgICAgIChpbnN0KSA9PiBpbnN0LmZlZVBheWVyICE9PSB1bmRlZmluZWQsXG4gICAgICAgICk7XG4gICAgICAgIGxldCBmZWVQYXllciA9IHNpZ25lcnNbMF07XG4gICAgICAgIGlmIChmZWVQYXllcnMubGVuZ3RoID4gMCAmJiBmZWVQYXllcnNbMF0uZmVlUGF5ZXIpIHtcbiAgICAgICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgICBpZiAoZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IGZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlVHhzaXplLmlzTWF4VHJhbnNhY3Rpb25TaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllci5wdWJsaWNLZXkpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICBpbnN0cnVjdGlvbnMudW5zaGlmdChcbiAgICAgICAgICAgIGF3YWl0IFByaW9yaXR5RmVlLlByaW9yaXR5RmVlLmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICAgIG9wdGlvbnMuYWRkU29sUHJpb3JpdHlGZWUsXG4gICAgICAgICAgICAgIGZpbmFsU2lnbmVyc1swXSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgIGF3YWl0IENvbXB1dGVVbml0LkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzWzBdLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICAgIGluc3RydWN0aW9ucy5tYXAoKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IENvbnN0YW50cy5NQVhfVFJBTlNBQ1RJT05fUkVUUklFUyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbXB1dGVCdWRnZXRQcm9ncmFtLFxuICBLZXlwYWlyLFxuICBSZWNlbnRQcmlvcml0aXphdGlvbkZlZXMsXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21wdXRlVW5pdCB9IGZyb20gJy4vY29tcHV0ZS11bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByaW9yaXR5RmVlIHtcbiAgICBjb25zdCBNQVhfUkVDRU5UX1BSSU9SSVRZX0ZFRV9BQ0NPVU5UUyA9IDEyODtcbiAgICBjb25zdCBNSUNST19MQU1QT1JUU19QRVJfTEFNUE9SVCA9IDFfMDAwXzAwMDtcblxuICAgIGV4cG9ydCBjb25zdCBjcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgYWRkU29sUHJpb3JpdHlGZWU/OiBudW1iZXIsXG4gICAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgKSA9PiB7XG4gICAgICBsZXQgdW5pdFByaWNlID0gMDtcbiAgICAgIGlmIChhZGRTb2xQcmlvcml0eUZlZSAmJiBmZWVQYXllcikge1xuICAgICAgICBjb25zdCBtaWNyb0xhbXBvcnRzID1cbiAgICAgICAgICBhZGRTb2xQcmlvcml0eUZlZS50b0xhbXBvcnRzKCkgKiBNSUNST19MQU1QT1JUU19QRVJfTEFNUE9SVDtcbiAgICAgICAgY29uc3QgY3UgPSBhd2FpdCBDb21wdXRlVW5pdC5Db21wdXRlVW5pdC5zaW11bGF0ZShcbiAgICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgICAgZmVlUGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIHVuaXRQcmljZSA9IE1hdGgudHJ1bmMobWljcm9MYW1wb3J0cyAvIGN1KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuaXRQcmljZSA9IGF3YWl0IGVzdGltYXRlUHJpb3JpdHlGZWUoaW5zdHJ1Y3Rpb25zKTtcbiAgICAgIH1cbiAgICAgIGRlYnVnTG9nKCcjIHVuaXQgcHJpY2UobWljcm9MYW1wb3J0cyk6ICcsIHVuaXRQcmljZSk7XG4gICAgICByZXR1cm4gQ29tcHV0ZUJ1ZGdldFByb2dyYW0uc2V0Q29tcHV0ZVVuaXRQcmljZSh7XG4gICAgICAgIG1pY3JvTGFtcG9ydHM6IHVuaXRQcmljZSxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyB0aGFua3MgaHR0cHM6Ly9naXRodWIuY29tL2Jsb2Nrd29ya3MtZm91bmRhdGlvbi9tYW5nby12NC9ibG9iLzU3YTk4MzVhYThmNjM2YjZkMjMxYmEyYzQwMDhiZmU4OWNiZjA4YmEvdHMvY2xpZW50L3NyYy9jbGllbnQudHMjTDQ1NTJcbiAgICBleHBvcnQgY29uc3QgZXN0aW1hdGVQcmlvcml0eUZlZSA9IGFzeW5jIChcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgICBjb25zdCB3cml0YWJsZUFjY291bnRzID0gaW5zdHJ1Y3Rpb25zXG4gICAgICAgIC5tYXAoKGluc3QpID0+XG4gICAgICAgICAgaW5zdC5rZXlzXG4gICAgICAgICAgICAuZmlsdGVyKChhY2NvdW50KSA9PiBhY2NvdW50LmlzV3JpdGFibGUpXG4gICAgICAgICAgICAubWFwKChrZXkpID0+IGtleS5wdWJrZXkpLFxuICAgICAgICApXG4gICAgICAgIC5mbGF0KCk7XG5cbiAgICAgIGNvbnN0IHVuaXFXcml0YWJsZUFjY291bnRzID0gW1xuICAgICAgICAuLi5uZXcgU2V0KHdyaXRhYmxlQWNjb3VudHMubWFwKChhY2NvdW50KSA9PiBhY2NvdW50LnRvQmFzZTU4KCkpKSxcbiAgICAgIF1cbiAgICAgICAgLm1hcCgoYWNjb3VudCkgPT4gYWNjb3VudC50b1B1YmxpY0tleSgpKVxuICAgICAgICAuc2xpY2UoMCwgTUFYX1JFQ0VOVF9QUklPUklUWV9GRUVfQUNDT1VOVFMpO1xuXG4gICAgICBjb25zdCBwcmlvcml0eUZlZXMgPVxuICAgICAgICBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRSZWNlbnRQcmlvcml0aXphdGlvbkZlZXMoe1xuICAgICAgICAgIGxvY2tlZFdyaXRhYmxlQWNjb3VudHM6IHVuaXFXcml0YWJsZUFjY291bnRzLFxuICAgICAgICB9KTtcblxuICAgICAgaWYgKHByaW9yaXR5RmVlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIGdldCByZWNlbnQgcHJpb3JpdHkgZmVlczogJywgcHJpb3JpdHlGZWVzKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdyb3VwQnlTbG90ID0gcHJpb3JpdHlGZWVzLnJlZHVjZShcbiAgICAgICAgKGFjYywgZmVlKSA9PiB7XG4gICAgICAgICAgY29uc3Qga2V5ID0gZmVlLnNsb3Q7XG4gICAgICAgICAgaWYgKCFhY2Nba2V5XSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYWNjW2tleV0ucHVzaChmZWUpO1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sXG4gICAgICAgIHt9IGFzIFJlY29yZDxzdHJpbmcsIFJlY2VudFByaW9yaXRpemF0aW9uRmVlc1tdPixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG1heEZlZUJ5U2xvdCA9IE9iamVjdC5rZXlzKGdyb3VwQnlTbG90KS5yZWR1Y2UoXG4gICAgICAgIChhY2MsIHNsb3QpID0+IHtcbiAgICAgICAgICBhY2Nbc2xvdF0gPSBncm91cEJ5U2xvdFtzbG90XS5yZWR1Y2UoKG1heCwgZmVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmVlLnByaW9yaXRpemF0aW9uRmVlID4gbWF4LnByaW9yaXRpemF0aW9uRmVlID8gZmVlIDogbWF4O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sXG4gICAgICAgIHt9IGFzIFJlY29yZDxzdHJpbmcsIFJlY2VudFByaW9yaXRpemF0aW9uRmVlcz4sXG4gICAgICApO1xuICAgICAgY29uc3QgbWF4aW11bUZlZXMgPSBPYmplY3QudmFsdWVzKG1heEZlZUJ5U2xvdCkuc29ydChcbiAgICAgICAgKGE6IFJlY2VudFByaW9yaXRpemF0aW9uRmVlcywgYjogUmVjZW50UHJpb3JpdGl6YXRpb25GZWVzKSA9PlxuICAgICAgICAgIGEuc2xvdCAtIGIuc2xvdCxcbiAgICAgICkgYXMgUmVjZW50UHJpb3JpdGl6YXRpb25GZWVzW107XG5cbiAgICAgIC8vIGdldCBtZWRpYW4gb2YgbGFzdCAyMCBmZWVzXG4gICAgICBjb25zdCByZWNlbnRGZWVzID0gbWF4aW11bUZlZXMuc2xpY2UoXG4gICAgICAgIE1hdGgubWF4KG1heGltdW1GZWVzLmxlbmd0aCAtIDIwLCAwKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKHJlY2VudEZlZXMubGVuZ3RoIC8gMik7XG4gICAgICBjb25zdCBtZWRpYW5GZWUgPVxuICAgICAgICByZWNlbnRGZWVzLmxlbmd0aCAlIDIgIT09IDBcbiAgICAgICAgICA/IHJlY2VudEZlZXNbbWlkXS5wcmlvcml0aXphdGlvbkZlZVxuICAgICAgICAgIDogKHJlY2VudEZlZXNbbWlkIC0gMV0ucHJpb3JpdGl6YXRpb25GZWUgK1xuICAgICAgICAgICAgICByZWNlbnRGZWVzW21pZF0ucHJpb3JpdGl6YXRpb25GZWUpIC9cbiAgICAgICAgICAgIDI7XG5cbiAgICAgIGRlYnVnTG9nKCcjIG1lZGlhbiBmZWU6ICcsIG1lZGlhbkZlZSk7XG5cbiAgICAgIHJldHVybiBNYXRoLmNlaWwobWVkaWFuRmVlKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29tcHV0ZUJ1ZGdldFByb2dyYW0sXG4gIEtleXBhaXIsXG4gIFB1YmxpY0tleSxcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnLi4vLi4vc3VpdGUtdXRpbHMvc3JjL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgY29uc3QgREVGQVVMVVRfQ09NUFVURV9VTklUID0gMjAwXzAwMDtcbiAgY29uc3QgTUlOSU1VTV9DT01QVVRFX1VOSVQgPSA0NTA7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHV0ZVVuaXQge1xuICAgIGV4cG9ydCBjb25zdCBjcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgcGF5ZXI6IEtleXBhaXIsXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCB1bml0cyA9IGF3YWl0IHNpbXVsYXRlKGluc3RydWN0aW9ucywgcGF5ZXIpO1xuICAgICAgcmV0dXJuIENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0TGltaXQoe1xuICAgICAgICB1bml0cyxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3Qgc2ltdWxhdGUgPSBhc3luYyAoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHBheWVyOiBLZXlwYWlyLFxuICAgICk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gUHVibGljS2V5LmRlZmF1bHQudG9TdHJpbmcoKTtcbiAgICAgIGluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0eC5hZGQoaW5zdCkpO1xuICAgICAgdHguZmVlUGF5ZXIgPSBwYXllci5wdWJsaWNLZXk7XG4gICAgICB0eC52ZXJpZnlTaWduYXR1cmVzKGZhbHNlKTtcblxuICAgICAgY29uc3Qgc2ltdWxhdGlvbiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNpbXVsYXRlVHJhbnNhY3Rpb24odHgpO1xuXG4gICAgICBpZiAoc2ltdWxhdGlvbi52YWx1ZS5lcnIpIHtcbiAgICAgICAgZGVidWdMb2coJyMgRXJyb3Igc2ltdWxhdGlvbjogJywgc2ltdWxhdGlvbik7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgY29uc3QgdW5pdHMgPSBzaW11bGF0aW9uLnZhbHVlLnVuaXRzQ29uc3VtZWQgfHwgREVGQVVMVVRfQ09NUFVURV9VTklUO1xuICAgICAgZGVidWdMb2coJyMgZ2V0IHNpbXVsYXRlIHRyYW5zYWN0aW9uOiAnLCB1bml0cyk7XG4gICAgICBsZXQgY3UgPSAwO1xuICAgICAgaWYgKHVuaXRzID09PSAwKSB7XG4gICAgICAgIGN1ID0gREVGQVVMVVRfQ09NUFVURV9VTklUO1xuICAgICAgfSBlbHNlIGlmICh1bml0cyA8IE1JTklNVU1fQ09NUFVURV9VTklUKSB7XG4gICAgICAgIC8vIG9ubHkgc29sIHRyYW5zZmVyXG4gICAgICAgIGN1ID0gTUlOSU1VTV9DT01QVVRFX1VOSVQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdSA9IE1hdGgudHJ1bmModW5pdHMgKiAxLjEpO1xuICAgICAgfVxuICAgICAgZGVidWdMb2coJyMgc2ltdWxhdGUgY3U6ICcsIGN1KTtcbiAgICAgIHJldHVybiBjdTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQW55T2JqZWN0IH0gZnJvbSAnfi90eXBlcy91dGlscyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogY29udmVydCBidWZmZXIgdG8gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gKiBAcmV0dXJucyBudW1iZXJbXVxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9BcnJheSA9IChidWZmZXI6IEJ1ZmZlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgbnVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGJ5dGUgb2YgYnVmZmVyKSB7XG4gICAgbnVtcy5wdXNoKGJ1ZmZlcltieXRlXSk7XG4gIH1cbiAgcmV0dXJuIG51bXM7XG59O1xuXG4vKipcbiAqIE92ZXJ3cml0ZSBKUyBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9iamVjdFxuICogQHBhcmFtIHtPdmVyd3JpdGVPYmplY3RbXX0gdGFyZ2V0c1xuICogQHJldHVybnMgT2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGVPYmplY3QgPSAoXG4gIG9iamVjdDogdW5rbm93bixcbiAgdGFyZ2V0czoge1xuICAgIGV4aXN0c0tleTogc3RyaW5nO1xuICAgIHdpbGw6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiB1bmtub3duIH07XG4gIH1bXSxcbik6IHVua25vd24gPT4ge1xuICBjb25zdCB0aGF0OiBBbnlPYmplY3QgPSBvYmplY3QgYXMgQW55T2JqZWN0O1xuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGRlbGV0ZSB0aGF0W3RhcmdldC5leGlzdHNLZXldO1xuICAgIHRoYXRbdGFyZ2V0LndpbGwua2V5XSA9IHRhcmdldC53aWxsLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXkgbG9nIGZvciBzb2xhbmEtc3VpdGUtY29uZmlnLmpzXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMVxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhM1xuICogQHBhcmFtIHt1bmtub3dufSBkYXRhNFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAoXG4gIGRhdGExOiB1bmtub3duLFxuICBkYXRhMjogdW5rbm93biA9ICcnLFxuICBkYXRhMzogdW5rbm93biA9ICcnLFxuICBkYXRhNDogdW5rbm93biA9ICcnLFxuKTogdm9pZCA9PiB7XG4gIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgY29uc29sZS5sb2coJ1tERUJVR10nLCBkYXRhMSwgZGF0YTIsIGRhdGEzLCBkYXRhNCk7XG4gIH1cbn07XG5cbi8qKlxuICogc2xlZXAgdGltZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjXG4gKiBAcmV0dXJucyBQcm9taXNlPG51bWJlcj5cbiAqL1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gYXN5bmMgKHNlYzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIHNlYyAqIDEwMDApKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbFxuICApO1xufTtcblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgcmV0dXJuIChcbiAgICAhIW9iaiAmJlxuICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgIHR5cGVvZiAob2JqIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufTtcblxuLyoqXG4gKiBUcnkgYXN5bmMgbW9uYWRcbiAqXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxULCBFPj5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBhc3luY2Jsb2NrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZXN1bHQ8VCwgRT4+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KGJsb2NrOiAoKSA9PiBUKTogUmVzdWx0PFQsIEU+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBpbnB1dDogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFJlc3VsdDxULCBFcnJvcj4gfCBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gaW5wdXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHYpKSB7XG4gICAgICByZXR1cm4gdi50aGVuKFxuICAgICAgICAoeDogVCkgPT4gUmVzdWx0Lm9rKHgpLFxuICAgICAgICAoZXJyOiBFKSA9PiBSZXN1bHQuZXJyKGVyciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHYpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlIGFzIHN0cmluZykpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChmaW5hbGx5SW5wdXQpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmFsbHkgaW5wdXQ6JywgZmluYWxseUlucHV0KTtcbiAgICAgIGZpbmFsbHlJbnB1dCgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcnx1bmRlZmluZWR9IGNyZWF0ZWRfYXRcbiAqIEByZXR1cm5zIERhdGUgfCB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lID0gKFxuICBjcmVhdGVkX2F0OiBudW1iZXIgfCB1bmRlZmluZWQsXG4pOiBEYXRlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGNyZWF0ZWRfYXQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoY3JlYXRlZF9hdCAqIDEwMDApO1xuICB9XG4gIHJldHVybjtcbn07XG5cbi8qKlxuICogR2V0IHVuaXggdGltZXN0YW1wXG4gKlxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCB1bml4VGltZXN0YW1wID0gKCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlLCBTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21wdXRlVW5pdCB9IGZyb20gJy4vY29tcHV0ZS11bml0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQ29tbW9uPFQgPSB1bmRlZmluZWQ+IGltcGxlbWVudHMgQ29tbW9uU3RydWN0dXJlPFQ+IHtcbiAgICBzdGF0aWMgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyPzogS2V5cGFpcjtcbiAgICBkYXRhPzogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgICBkYXRhPzogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tbW9uKSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgICAgYXdhaXQgUHJpb3JpdHlGZWUuUHJpb3JpdHlGZWUuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgICBvcHRpb25zLmFkZFNvbFByaW9yaXR5RmVlLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgIGF3YWl0IENvbXB1dGVVbml0LkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBDb25zdGFudHMuTUFYX1RSQU5TQUNUSU9OX1JFVFJJRVMsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgS2V5cGFpcixcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZVVuaXQgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlLCBTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIE1pbnQ8VCA9IFB1YmtleT4gaW1wbGVtZW50cyBNaW50U3RydWN0dXJlPFQ+IHtcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI6IEtleXBhaXI7XG4gICAgZGF0YTogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICAgIGRhdGE6IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1pbnQpKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgTWludEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGlmIChOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgICAgICAgIGRlYnVnTG9nKCcjIENoYW5nZSBtZXRhcGxleCBjbHVzdGVyIG9uIG1haW5uZXQtYmV0YScpO1xuICAgICAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXI6IENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLnVuc2hpZnQoXG4gICAgICAgICAgICBhd2FpdCBQcmlvcml0eUZlZS5Qcmlvcml0eUZlZS5jcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICAgIG9wdGlvbnMuYWRkU29sUHJpb3JpdHlGZWUsXG4gICAgICAgICAgICAgIGZpbmFsU2lnbmVyc1swXSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLnVuc2hpZnQoXG4gICAgICAgICAgYXdhaXQgQ29tcHV0ZVVuaXQuQ29tcHV0ZVVuaXQuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICB0aGlzLmluc3RydWN0aW9ucyxcbiAgICAgICAgICAgIGZpbmFsU2lnbmVyc1swXSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogQ29uc3RhbnRzLk1BWF9UUkFOU0FDVElPTl9SRVRSSUVTLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgQ29uc3RhbnRzLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHtcbiAgUGFydGlhbFNpZ25TdHJ1Y3R1cmUsXG4gIFN1Ym1pdE9wdGlvbnMsXG59IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIFBhcnRpYWxTaWduIGltcGxlbWVudHMgUGFydGlhbFNpZ25TdHJ1Y3R1cmUge1xuICAgIGhleEluc3RydWN0aW9uOiBzdHJpbmc7XG4gICAgZGF0YT86IFB1YmtleTtcblxuICAgIGNvbnN0cnVjdG9yKGluc3RydWN0aW9uczogc3RyaW5nLCBtaW50PzogUHVia2V5KSB7XG4gICAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5kYXRhID0gbWludDtcbiAgICB9XG5cbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBvcHRpb25zOiBQYXJ0aWFsPFN1Ym1pdE9wdGlvbnM+ID0ge30sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJ0aWFsU2lnbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBQYXJ0aWFsU2lnbkluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLmZlZVBheWVyKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ05lZWQgZmVlUGF5ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlY29kZSA9IEJ1ZmZlci5mcm9tKHRoaXMuaGV4SW5zdHJ1Y3Rpb24sICdoZXgnKTtcbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBUcmFuc2FjdGlvbi5mcm9tKGRlY29kZSk7XG4gICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBDb25zdGFudHMuTUFYX1RSQU5TQUNUSU9OX1JFVFJJRVMsXG4gICAgICAgIH07XG4gICAgICAgIHRyYW5zYWN0aW9uLnBhcnRpYWxTaWduKG9wdGlvbnMuZmVlUGF5ZXIudG9LZXlwYWlyKCkpO1xuICAgICAgICBjb25zdCB3aXJlVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbi5zZXJpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5LCBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbi8vIEBpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBjb25zdCBMT1dfVkFMVUUgPSAxMjc7IC8vIDB4N2ZcbiAgY29uc3QgSElHSF9WQUxVRSA9IDE2MzgzOyAvLyAweDNmZmZcbiAgY29uc3QgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gIC8qKlxuICAgKiBDb21wYWN0IHUxNiBhcnJheSBoZWFkZXIgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIGFycmF5IGhlYWRlclxuICAgKi9cbiAgY29uc3QgY29tcGFjdEhlYWRlciA9IChuOiBudW1iZXIpID0+XG4gICAgbiA8PSBMT1dfVkFMVUUgPyAxIDogbiA8PSBISUdIX1ZBTFVFID8gMiA6IDM7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IHNpemVcbiAgICogQHBhcmFtIG4gZWxlbWVudHMgaW4gdGhlIGNvbXBhY3QgYXJyYXlcbiAgICogQHBhcmFtIHNpemUgYnl0ZXMgcGVyIGVhY2ggZWxlbWVudFxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIGFycmF5XG4gICAqL1xuICBjb25zdCBjb21wYWN0QXJyYXlTaXplID0gKG46IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PlxuICAgIGNvbXBhY3RIZWFkZXIobikgKyBuICogc2l6ZTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHR4c2l6ZVxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gYSBzb2xhbmEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIGZlZVBheWVyIHRoZSBwdWJsaWNLZXkgb2YgdGhlIHNpZ25lclxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVR4U2l6ZSA9IChcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBmZWVQYXllclBrID0gW2ZlZVBheWVyLnRvQmFzZTU4KCldO1xuXG4gICAgY29uc3Qgc2lnbmVycyA9IG5ldyBTZXQ8c3RyaW5nPihmZWVQYXllclBrKTtcbiAgICBjb25zdCBhY2NvdW50cyA9IG5ldyBTZXQ8c3RyaW5nPihmZWVQYXllclBrKTtcblxuICAgIGNvbnN0IGl4c1NpemUgPSB0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMucmVkdWNlKChhY2MsIGl4KSA9PiB7XG4gICAgICBpeC5rZXlzLmZvckVhY2goKHsgcHVia2V5LCBpc1NpZ25lciB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBrID0gcHVia2V5LnRvQmFzZTU4KCk7XG4gICAgICAgIGlmIChpc1NpZ25lcikgc2lnbmVycy5hZGQocGspO1xuICAgICAgICBhY2NvdW50cy5hZGQocGspO1xuICAgICAgfSk7XG5cbiAgICAgIGFjY291bnRzLmFkZChpeC5wcm9ncmFtSWQudG9CYXNlNTgoKSk7XG5cbiAgICAgIGNvbnN0IG5JbmRleGVzID0gaXgua2V5cy5sZW5ndGg7XG4gICAgICBjb25zdCBvcGFxdWVEYXRhID0gaXguZGF0YS5sZW5ndGg7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIGFjYyArXG4gICAgICAgIDEgKyAvLyBQSUQgaW5kZXhcbiAgICAgICAgY29tcGFjdEFycmF5U2l6ZShuSW5kZXhlcywgMSkgK1xuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG9wYXF1ZURhdGEsIDEpXG4gICAgICApO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoc2lnbmVycy5zaXplLCA2NCkgKyAvLyBzaWduYXR1cmVzXG4gICAgICAzICsgLy8gaGVhZGVyXG4gICAgICBjb21wYWN0QXJyYXlTaXplKGFjY291bnRzLnNpemUsIDMyKSArIC8vIGFjY291bnRzXG4gICAgICAzMiArIC8vIGJsb2NraGFzaFxuICAgICAgY29tcGFjdEhlYWRlcih0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMubGVuZ3RoKSArIC8vIGluc3RydWN0aW9uc1xuICAgICAgaXhzU2l6ZVxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIG1heCB0cmFuc2FjdGlvbiBzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgaXNPdmVyVHJhbnNhY3Rpb25TaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gY2FsY3VsYXRlVHhTaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllcikgPiBNQVhfVFJBTlNBQ1RJT05fU0laRTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQmF0Y2ggfSBmcm9tICcuL2JhdGNoJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21tb24gfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZSB9IGZyb20gJy4vY29tcHV0ZS11bml0JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQYXJ0aWFsU2lnbiB9IGZyb20gJy4vcGFydGlhbC1zaWduJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDYWxjdWxhdGVUeHNpemUgfSBmcm9tICcuL2NhbGN1bGF0ZS10eHNpemUnO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uQnVpbGRlciA9IHtcbiAgLi4uQmF0Y2gsXG4gIC4uLkNhbGN1bGF0ZVR4c2l6ZSxcbiAgLi4uQ29tbW9uLFxuICAuLi5Db21wdXRlLFxuICAuLi5NaW50LFxuICAuLi5QYXJ0aWFsU2lnbixcbiAgLi4uUHJpb3JpdHlGZWUsXG59O1xuIiwgIi8vIGZvcmtlZDogaHR0cHM6Ly9naXRodWIuY29tL2JhZHJhcC9yZXN1bHQsIHRoYW5rIHlvdSBhZHZpY2UgIEBqdmlpZGVcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2lnbmF0dXJlIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIENvbW1vblN0cnVjdHVyZSxcbiAgTWludFN0cnVjdHVyZSxcbiAgUGFydGlhbFNpZ25TdHJ1Y3R1cmUsXG4gIFN1Ym1pdE9wdGlvbnMsXG59IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJy4nO1xuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3I+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG5cbiAgdW53cmFwKCk6IFQ7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogVTtcbiAgdW53cmFwPFUsIFY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBWKTogVSB8IFY7XG4gIC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDEwXG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVSk6IFU7XG4gIHVud3JhcChvaz86ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiB1bmtub3duKTogdW5rbm93biB7XG4gICAgY29uc3QgciA9IHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sgPyBvayh2YWx1ZSkgOiB2YWx1ZSksXG4gICAgICAoZXJyb3IpID0+IChlcnIgPyBSZXN1bHQub2soZXJyKGVycm9yKSkgOiBSZXN1bHQuZXJyKGVycm9yKSksXG4gICAgKTtcbiAgICBpZiAoci5pc0Vycikge1xuICAgICAgdGhyb3cgci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHIudmFsdWU7XG4gIH1cblxuICAvLy8vIG1hcCAvLy8vXG4gIG1hcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogUmVzdWx0PFUsIEU+O1xuICBtYXA8VSwgRiBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBVLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBGLFxuICApOiBSZXN1bHQ8VSwgRj47XG4gIG1hcChvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IEVycm9yKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVyciA/IGVycihlcnJvcikgOiBlcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLy8gY2hhaW4gLy8vL1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuICBjaGFpbihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICAgZXJyPzogKGVycm9yOiBFKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICk6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKG9rLCBlcnIgfHwgKChlcnJvcikgPT4gUmVzdWx0LmVycihlcnJvcikpKTtcbiAgfVxuXG4gIC8vLy8gbWF0Y2ggLy8vL1xuICBtYXRjaDxVLCBGPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gRik6IHZvaWQgfCBQcm9taXNlPHZvaWQ+O1xuXG4gIG1hdGNoKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IHVua25vd24sXG4gICk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyKGVycm9yKSBhcyBFcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLyBzaW5nbGUgVHJhbnNhY3Rpb25CdWlsZGVyIC8vLy9cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBhc3luYyBzdWJtaXQoXG4gICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5tYXAoXG4gICAgICBhc3luYyAob2spID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gb2sgYXNcbiAgICAgICAgICB8IENvbW1vblN0cnVjdHVyZVxuICAgICAgICAgIHwgTWludFN0cnVjdHVyZVxuICAgICAgICAgIHwgUGFydGlhbFNpZ25TdHJ1Y3R1cmU7XG4gICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KG9wdGlvbnMpO1xuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihyZXMuZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnZhbHVlO1xuICB9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgc3VibWl0KFxuICAgICAgb3B0aW9ucz86IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj47XG4gIH1cbn1cblxuLy8gVHJhbnNhY3Rpb25CdWlsZGVyLkJhdGNoXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSkge1xuICBjb25zdCBpbnN0cnVjdGlvbnM6IENvbW1vblN0cnVjdHVyZSB8IE1pbnRTdHJ1Y3R1cmVbXSA9IFtdO1xuICBmb3IgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9IGVsc2UgaWYgKG9iai5pc09rKSB7XG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcignT25seSBBcnJheSBJbnN0cnVjdGlvbiBvYmplY3QnKSk7XG4gICAgfVxuICB9XG4gIGNvbnN0IGJhdGNoT3B0aW9ucyA9IHtcbiAgICBmZWVQYXllcjogb3B0aW9ucy5mZWVQYXllcixcbiAgICBpc1ByaW9yaXR5RmVlOiBvcHRpb25zLmlzUHJpb3JpdHlGZWUsXG4gICAgaW5zdHJ1Y3Rpb25zOiBpbnN0cnVjdGlvbnMsXG4gIH07XG4gIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBzdWJtaXQoKScpO1xuICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaCgpLnN1Ym1pdChiYXRjaE9wdGlvbnMpO1xufTtcblxuY2xhc3MgSW50ZXJuYWxPazxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gdHJ1ZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgdmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgX2VycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xuICB9XG59XG5cbmNsYXNzIEludGVybmFsRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSBmYWxzZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSB0cnVlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSBlcnJvcjogRSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgX29rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBSZXN1bHQge1xuICBleHBvcnQgdHlwZSBPazxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxPazxULCBFPjtcbiAgZXhwb3J0IHR5cGUgRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbEVycjxULCBFPjtcblxuICBleHBvcnQgZnVuY3Rpb24gb2s8VCwgRSBleHRlbmRzIEVycm9yPih2YWx1ZTogVCk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbE9rKHZhbHVlKTtcbiAgfVxuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcj86IEUpOiBSZXN1bHQ8VCwgRT47XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yOiBFKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsRXJyKGVycm9yIHx8IEVycm9yKCkpO1xuICB9XG5cbiAgdHlwZSBVID0gUmVzdWx0PHVua25vd24+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gICAgUjE1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTQsIFIxNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICAgIE9rVHlwZTxSMTU+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgICAgfCBSMTVcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTRdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTNdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExIHwgUjEyIHwgUjEzXG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTFdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTBdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjldLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjk+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSN10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjZdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjY+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0PiwgT2tUeXBlPFI1Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjU+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjRdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSND5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVLCBSMyBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjJdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj5dLCBFcnJUeXBlPFIwIHwgUjEgfCBSMj4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjFdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT5dLCBFcnJUeXBlPFIwIHwgUjE+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+XSwgRXJyVHlwZTxSMD4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogW10pOiBSZXN1bHQ8W10+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFQgZXh0ZW5kcyBVW10gfCBSZWNvcmQ8c3RyaW5nLCBVPj4oXG4gICAgb2JqOiBULFxuICApOiBSZXN1bHQ8XG4gICAgeyBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDxpbmZlciBJPiA/IEkgOiBuZXZlciB9LFxuICAgIHtcbiAgICAgIFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+ID8gRSA6IG5ldmVyO1xuICAgIH1ba2V5b2YgVF1cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IHVua25vd24pOiB1bmtub3duIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICBjb25zdCByZXNBcnIgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBvYmopIHtcbiAgICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbSBhcyB1bmtub3duO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlc3VsdC5vayhyZXNBcnIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBpdGVtID0gKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPilba2V5XTtcbiAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgICAgcmVzW2tleV0gPSBpdGVtLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0Lm9rKHJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgUmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvciA9IEVycm9yPiA9XG4gIHwgUmVzdWx0Lk9rPFQsIEU+XG4gIHwgUmVzdWx0LkVycjxULCBFPjtcblxudHlwZSBPa1R5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PGluZmVyIE8+ID8gTyA6IG5ldmVyO1xudHlwZSBFcnJUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPlxuICA/IEVcbiAgOiBuZXZlcjtcbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbW1pdG1lbnQsIENvbm5lY3Rpb24sIEZpbmFsaXR5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcbiAgY29uc3Qgc2V0dGVkID0ge1xuICAgIGNsdXN0ZXJVcmw6ICcnLFxuICAgIGNvbW1pdG1lbnQ6IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICAgIGN1c3RvbUNsdXN0ZXJVcmw6IFtdIGFzIHN0cmluZ1tdLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uID0gKCk6IENvbm5lY3Rpb24gPT4ge1xuICAgIGlmIChzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjdXN0b20gY2x1c3RlclxuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGN1c3RvbUNsdXN0ZXJVcmw6IHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjdXN0b20gY2x1c3RlciBieSBqc29uIGNvbmZpZ1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGN1c3RvbUNsdXN0ZXJVcmw6IENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghc2V0dGVkLmNsdXN0ZXJVcmwpIHtcbiAgICAgIC8vIGRlZmF1bHQgY2x1c3RlclxuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghc2V0dGVkLmNvbW1pdG1lbnQpIHtcbiAgICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uKHNldHRlZC5jbHVzdGVyVXJsLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNoYW5nZUNvbm5lY3Rpb24gPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGNvbW1pdG1lbnQ/OiBGaW5hbGl0eTtcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiB2b2lkID0+IHtcbiAgICAvLyBpbml0aWFsaXplXG4gICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSAnJztcbiAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IFtdO1xuICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG5cbiAgICBjb25zdCB7IGNsdXN0ZXIsIGNvbW1pdG1lbnQsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuICAgIGlmIChjb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IGNvbW1pdG1lbnQ7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjb21taXRtZW50OiAnLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gICAgfVxuXG4gICAgaWYgKGNsdXN0ZXIpIHtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjbHVzdGVyOiBjbHVzdGVyIH0pO1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY2x1c3RlclVybDogJywgc2V0dGVkLmNsdXN0ZXJVcmwpO1xuICAgIH1cblxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsKSB7XG4gICAgICBkZWJ1Z0xvZygnIyBjdXN0b21DbHVzdGVyVXJsOiAnLCBjdXN0b21DbHVzdGVyVXJsKTtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjdXN0b21DbHVzdGVyVXJsIH0pO1xuICAgICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBjdXN0b21DbHVzdGVyVXJsO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIE5vZGUgY2hhbmdlIGNsdXN0ZXIsIGN1c3RvbSBjbHVzdGVyIHVybDogJyxcbiAgICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgY29uZmlybWVkU2lnID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgIGNvbW1pdG1lbnQ6IENvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgKSA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhdGVzdEJsb2NraGFzaCA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgcmV0dXJuIGF3YWl0IGNvbm5lY3Rpb25cbiAgICAgIC5jb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBibG9ja2hhc2g6IGxhdGVzdEJsb2NraGFzaC5ibG9ja2hhc2gsXG4gICAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGxhdGVzdEJsb2NraGFzaC5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1pdG1lbnQsXG4gICAgICApXG4gICAgICAudGhlbihSZXN1bHQub2spXG4gICAgICAuY2F0Y2goUmVzdWx0LmVycik7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFzc2V0LCBBc3NldFByb29mLCBBc3NldHMsIFByaW9yaXR5RmVlTGV2ZWxzIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbmltcG9ydCB7IFNvcnRhYmxlIH0gZnJvbSAnfi90eXBlcy9maW5kJztcblxuZXhwb3J0IG5hbWVzcGFjZSBEYXNBcGkge1xuICBsZXQgZGFzVXJpOiBzdHJpbmc7XG4gIGNvbnN0IGNvbm5lY3QgPSBhc3luYyAoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgcGFyYW1zOiAoXG4gICAgICB8IHN0cmluZ1xuICAgICAgfCBQdWJrZXlcbiAgICAgIHwgU29ydGFibGVcbiAgICAgIHwgbnVtYmVyXG4gICAgICB8IHVuZGVmaW5lZFxuICAgICAgfCBQdWJrZXlbXVxuICAgICAgfCBUcmFuc2FjdGlvblxuICAgICAgfCB7XG4gICAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICAgICAgfVxuICAgIClbXSxcbiAgKSA9PiB7XG4gICAgZGFzVXJpID0gZGFzVXJpID8gZGFzVXJpIDogQ29uc3RhbnRzLkRBU19BUElfVVJMO1xuICAgIGRlYnVnTG9nKCcjIGRhc1VyaTogJywgZGFzVXJpKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGRhc1VyaSwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAganNvbnJwYzogJzIuMCcsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaWQ6ICdkYXMtYXBpJyxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICBjb25zdCBlcnIgPSAoYXdhaXQgcmVzcG9uc2UuanNvbigpKS5lcnJvci5tZXNzYWdlO1xuICAgICAgdGhyb3cgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgcmV0dXJuIChhd2FpdCByZXNwb25zZS5qc29uKCkpLnJlc3VsdDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlRGFzVXJpID0gKHVybDogc3RyaW5nKTogdm9pZCA9PiB7XG4gICAgZGFzVXJpID0gdXJsO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldFByb29mID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRQcm9vZiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXRQcm9vZicsIFthc3NldElkXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0ID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXQsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0JywgW2Fzc2V0SWRdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRzQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lckFkZHJlc3M6IFB1YmtleSxcbiAgICBsaW1pdDogbnVtYmVyID0gMTAwMCxcbiAgICBwYWdlOiBudW1iZXIgPSAxLFxuICAgIHNvcnRCeT86IFNvcnRhYmxlLFxuICAgIGJlZm9yZT86IHN0cmluZyxcbiAgICBhZnRlcj86IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldHNCeU93bmVyJywgW1xuICAgICAgICBvd25lckFkZHJlc3MsXG4gICAgICAgIHNvcnRCeSxcbiAgICAgICAgbGltaXQsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGJlZm9yZSxcbiAgICAgICAgYWZ0ZXIsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRzQnlHcm91cCA9IGFzeW5jIChcbiAgICBncm91cEtleTogc3RyaW5nLFxuICAgIGdyb3VwVmFsdWU6IFB1YmtleSxcbiAgICBsaW1pdDogbnVtYmVyID0gMTAwMCxcbiAgICBwYWdlOiBudW1iZXIgPSAxLFxuICAgIHNvcnRCeT86IFNvcnRhYmxlLFxuICAgIGJlZm9yZT86IHN0cmluZyxcbiAgICBhZnRlcj86IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldHNCeUdyb3VwJywgW1xuICAgICAgICBncm91cEtleSxcbiAgICAgICAgZ3JvdXBWYWx1ZSxcbiAgICAgICAgc29ydEJ5LFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgYmVmb3JlLFxuICAgICAgICBhZnRlcixcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRQcmlvcml0eUZlZUVzdGltYXRlID0gYXN5bmMgKFxuICAgIGFjY291bnRPclRyYW5zYWN0aW9uOiBQdWJrZXlbXSB8IFRyYW5zYWN0aW9uLFxuICApOiBQcm9taXNlPFJlc3VsdDxQcmlvcml0eUZlZUxldmVscywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25zID0geyBpbmNsdWRlQWxsUHJpb3JpdHlGZWVMZXZlbHM6IHRydWUgfTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGF3YWl0IGNvbm5lY3QoJ2dldFByaW9yaXR5RmVlRXN0aW1hdGUnLCBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYWNjb3VudE9yVHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pXG4gICAgICApLnByaW9yaXR5RmVlTGV2ZWxzO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEludGVybmFsQ29sbGVjdGlvbiB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEdyb3VwaW5nIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbmltcG9ydCB7XG4gIENvbGxlY3Rpb24gYXMgQ29sbGVjdGlvblR5cGUsXG4gIElucHV0Q29sbGVjdGlvbixcbiAgT3B0aW9uLFxufSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb24ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q29sbGVjdGlvbj4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+LFxuICAgICk6IENvbGxlY3Rpb25UeXBlIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZHJlc3M6IG91dHB1dC5rZXkudG9TdHJpbmcoKSxcbiAgICAgICAgdmVyaWZpZWQ6IG91dHB1dC52ZXJpZmllZCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbk1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChvdXRwdXQ6IEdyb3VwaW5nW10pOiBQdWJrZXkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gb3V0cHV0LmZpbmQoKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZS5ncm91cF9rZXkgPT09ICdjb2xsZWN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB2YWx1ZS5ncm91cF92YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzID8gcmVzLmdyb3VwX3ZhbHVlIDogJyc7XG4gICAgfTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgQ3JlYXRvcnMsIElucHV0Q3JlYXRvcnMsIE9wdGlvbiB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgSW50ZXJuYWxDcmVhdG9ycyB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENyZWF0b3JzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+ID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvQ29tcHJlc3NlZE5mdEluZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IEludGVybmFsQ3JlYXRvcnNbXSA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dCEubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4sXG4gICAgKTogQ3JlYXRvcnNbXSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1N0cmluZygpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBkYXRhLnZlcmlmaWVkLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHtcbiAgTWV0YWRhdGFBcmdzLFxuICBUb2tlblByb2dyYW1WZXJzaW9uLFxuICBUb2tlblN0YW5kYXJkLFxufSBmcm9tICdtcGwtYnViYmxlZ3VtLWluc3RydWN0aW9ucyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBNZXRhZGF0YUFyZ3MgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvQ29tcHJlc3NlZE5mdEluZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBmYWxzZSxcbiAgICAgICAgaXNNdXRhYmxlOiBpbnB1dC5pc011dGFibGUgPz8gZmFsc2UsXG4gICAgICAgIGVkaXRpb25Ob25jZTogMCxcbiAgICAgICAgdG9rZW5TdGFuZGFyZDogVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgICAgdG9rZW5Qcm9ncmFtVmVyc2lvbjogVG9rZW5Qcm9ncmFtVmVyc2lvbi5PcmlnaW5hbCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSb3lhbHR5IHtcbiAgICBleHBvcnQgY29uc3QgVEhSRVNIT0xEID0gMTAwO1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJveWFsdHkgfSBmcm9tICcuL3JveWFsdHknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFzc2V0QW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTmZ0IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBBc3NldEFuZE9mZmNoYWluKTogTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4uaWQudG9TdHJpbmcoKSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IENvbGxlY3Rpb24uQ29sbGVjdGlvbk1pbnQuaW50b1VzZXIoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uZ3JvdXBpbmcsXG4gICAgICAgICkgYXMgUHVia2V5LFxuICAgICAgICBhdXRob3JpdGllczogb3V0cHV0Lm9uY2hhaW4uYXV0aG9yaXRpZXMsXG4gICAgICAgIHJveWFsdHk6IFJveWFsdHkuUm95YWx0eS5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5yb3lhbHR5LnBlcmNlbnQpLFxuICAgICAgICBuYW1lOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLm5hbWUsXG4gICAgICAgIHN5bWJvbDogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5tZXRhZGF0YS5zeW1ib2wsXG4gICAgICAgIHVyaTogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmNyZWF0b3JzKSEsXG4gICAgICAgIHRyZWVBZGRyZXNzOiBvdXRwdXQub25jaGFpbi5jb21wcmVzc2lvbi50cmVlLFxuICAgICAgICBpc0NvbXByZXNzZWQ6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLmNvbXByZXNzZWQsXG4gICAgICAgIGlzTXV0YWJsZTogb3V0cHV0Lm9uY2hhaW4ubXV0YWJsZSxcbiAgICAgICAgaXNCdXJuOiBvdXRwdXQub25jaGFpbi5idXJudCxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5zdXBwbHkuZWRpdGlvbl9ub25jZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucm95YWx0eS5wcmltYXJ5X3NhbGVfaGFwcGVuZWQsXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCkhLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBNZW1vLCBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNZW1vLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG91dHB1dFRyYW5zZmVyPzogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgICBpZiAob3V0cHV0VHJhbnNmZXIgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSAhPT0gJycpIHtcbiAgICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSA9PT0gJ3NwbC10b2tlbicpIHtcbiAgICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBoaXN0b3J5Lm1lbW8gPSBvdXRwdXQucGFyc2VkO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTWludFRvIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogTWludFRvLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm1pbnRBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludEF1dGhvcml0eTtcbiAgICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgICBoaXN0b3J5LmFjY291bnQgPSBvdXRwdXQucGFyc2VkLmluZm8uYWNjb3VudCBhcyBzdHJpbmc7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG92ZXJ3cml0ZU9iamVjdCwgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7XG4gIEZpbGVUeXBlLFxuICBQcm9wZXJ0aWVzLFxuICBTdG9yYWdlT3B0aW9ucyxcbiAgU3RvcmFnZVR5cGUsXG59IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQcm9wZXJ0aWVzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gYXN5bmMgKFxuICAgICAgaW5wdXQ6IFByb3BlcnRpZXMgfCB1bmRlZmluZWQsXG4gICAgICBjYWxsYmFja0Z1bmM6IChcbiAgICAgICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICAgIG9wdGlvbnM6IFBhcnRpYWw8U3RvcmFnZU9wdGlvbnM+LFxuICAgICAgKSA9PiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4sXG4gICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICBvcHRpb25zOiBQYXJ0aWFsPFN0b3JhZ2VPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGggJiYgIWZpbGUudXJpKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmaWxlLmZpbGVQYXRoKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBjYWxsYmFja0Z1bmMoXG4gICAgICAgICAgICAgIGZpbGUuZmlsZVBhdGghLFxuICAgICAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICAgICAgICAgIHRocm93IEVycm9yKHJlcy5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvdmVyd3JpdGVPYmplY3QoZmlsZSwgW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICAgIHdpbGw6IHsga2V5OiAndXJpJywgdmFsdWU6IHJlcy52YWx1ZSB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWxlO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICByZXR1cm4geyAuLi5pbnB1dCwgZmlsZXMgfSBhcyBQcm9wZXJ0aWVzO1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE9wdGlvbiwgVXNlcyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVXNlcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChvdXRwdXQ6IE9wdGlvbjxVc2VzPik6IFVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IElucHV0VG9rZW5NZXRhZGF0YSwgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE1ldGFkYXRhQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUb2tlbk1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0VG9rZW5NZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogbnVsbCxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBNZXRhZGF0YUFuZE9mZmNoYWluLFxuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgICApOiBUb2tlbk1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLm1pbnQudG9TdHJpbmcoKSxcbiAgICAgICAgcm95YWx0eTogb3V0cHV0Lm9uY2hhaW4uZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgbmFtZTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5uYW1lKSxcbiAgICAgICAgc3ltYm9sOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCksXG4gICAgICAgIHRva2VuQW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgdXJpOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnVyaSksXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICAgIC8vIGRlbGV0ZSBOVUxMKDB4MDApIHN0cmluZ3MgZnVuY3Rpb25cbiAgICBleHBvcnQgY29uc3QgZGVsZXRlTnVsbFN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXDAvZywgJycpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5tdWx0aXNpZ0F1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5tdWx0aXNpZ0F1dGhvcml0eTtcbiAgICAgIGhpc3Rvcnkuc2lnbmVycyA9IG91dHB1dC5wYXJzZWQuaW5mby5zaWduZXJzO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBUcmFuc2ZlcixcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gY2hlY2tcbiAgICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgaGlzdG9yeS5zb2wgPSBvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHM/LnRvU29sKCkudG9TdHJpbmcoKTtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIH0gZnJvbSAnLi9jb21wcmVzc2VkLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBOZnQgfSBmcm9tICcuL25mdCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWVtbyB9IGZyb20gJy4vbWVtbyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnLi9yZWd1bGFyLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUHJvcGVydGllcyB9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW5NZXRhZGF0YSB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vdHJhbnNmZXItY2hlY2tlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBVc2VzIH0gZnJvbSAnLi91c2VzJztcblxuZXhwb3J0IGNvbnN0IENvbnZlcnRlciA9IHtcbiAgLi4uQ29tcHJlc3NlZE5mdE1ldGFkYXRhLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTmZ0LFxuICAuLi5NZW1vLFxuICAuLi5NaW50LFxuICAuLi5SZWd1bGFyTmZ0TWV0YWRhdGEsXG4gIC4uLlByb3BlcnRpZXMsXG4gIC4uLlJveWFsdHksXG4gIC4uLlRva2VuTWV0YWRhdGEsXG4gIC4uLlRyYW5zZmVyQ2hlY2tlZCxcbiAgLi4uVHJhbnNmZXIsXG4gIC4uLlVzZXMsXG59O1xuIiwgImltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNZXRhZGF0YSwgTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBGaW5kT3B0aW9ucywgU29ydGFibGUsIFNvcnRCeSwgU29ydERpcmVjdGlvbiB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5pbXBvcnQgeyBEYXNBcGkgYXMgQXBpIH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBEYXNBcGkge1xuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZGVmYXVsdFNvcnRCeTogU29ydGFibGUgPSB7XG4gICAgc29ydEJ5OiBTb3J0QnkuUmVjZW50LFxuICAgIHNvcnREaXJlY3Rpb246IFNvcnREaXJlY3Rpb24uRGVzYyxcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZmV0Y2hPZmZjaGFpbiA9IGFzeW5jICh1cmk6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJpKTtcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBpc0NvbXByZXNzZWQ6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8UGFydGlhbDxNZXRhZGF0YT4+ID0+IHtcbiAgICBjb25zdCBhc3NldCA9IGF3YWl0IEFwaS5nZXRBc3NldChtaW50KTtcbiAgICBpZiAoYXNzZXQuaXNFcnIpIHtcbiAgICAgIHRocm93IGFzc2V0LmVycm9yO1xuICAgIH1cblxuICAgIGlmIChhc3NldC52YWx1ZS5jb21wcmVzc2lvbi5jb21wcmVzc2VkID09PSBpc0NvbXByZXNzZWQpIHtcbiAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oXG4gICAgICAgIGFzc2V0LnZhbHVlLmNvbnRlbnQuanNvbl91cmksXG4gICAgICApO1xuICAgICAgY29uc3QgbWVyZ2VkID0ge1xuICAgICAgICBvbmNoYWluOiBhc3NldC52YWx1ZSxcbiAgICAgICAgb2ZmY2hhaW46IG9mZmNoYWluLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBDb252ZXJ0ZXIuTmZ0LmludG9Vc2VyKG1lcmdlZCk7XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgb3duZXIgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0NvbXByZXNzZWRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8TmZ0TWV0YWRhdGE+ID0+IHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHNvcnRCeTogZGVmYXVsdFNvcnRCeSxcbiAgICB9O1xuICAgIGNvbnN0IHsgbGltaXQsIHBhZ2UsIHNvcnRCeSwgYmVmb3JlLCBhZnRlciB9ID0ge1xuICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG5cbiAgICBjb25zdCBhc3NldHMgPSBhd2FpdCBBcGkuZ2V0QXNzZXRzQnlPd25lcihcbiAgICAgIG93bmVyLFxuICAgICAgbGltaXQsXG4gICAgICBwYWdlLFxuICAgICAgc29ydEJ5LFxuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgKTtcbiAgICBpZiAoYXNzZXRzLmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldHMuZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBhc3NldHMudmFsdWUuaXRlbXM7XG5cbiAgICBjb25zdCBtZXRhZGF0YXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGl0ZW1zXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKVxuICAgICAgICAubWFwKGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oXG4gICAgICAgICAgICAgIGl0ZW0uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSB7XG4gICAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgZGVidWdMb2coJyMgRmFpbGVkIGZldGNoIG9mZmNoYWluIHVybDogJywgaXRlbS5jb250ZW50Lmpzb25fdXJpKTtcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0ZXIuTmZ0LmludG9Vc2VyKHtcbiAgICAgICAgICAgICAgb25jaGFpbjogaXRlbSxcbiAgICAgICAgICAgICAgb2ZmY2hhaW46IHt9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiBhc3NldHMudmFsdWUucGFnZSxcbiAgICAgIHRvdGFsOiBhc3NldHMudmFsdWUudG90YWwsXG4gICAgICBsaW1pdDogYXNzZXRzLnZhbHVlLmxpbWl0LFxuICAgICAgbWV0YWRhdGFzLFxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IGNvbGxlY3Rpb24gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0NvbXByZXNzZWQsXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlDb2xsZWN0aW9uID0gYXN5bmMgKFxuICAgIGNvbGxlY3Rpb25NaW50OiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8TmZ0TWV0YWRhdGE+ID0+IHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHNvcnRCeTogZGVmYXVsdFNvcnRCeSxcbiAgICB9O1xuICAgIGNvbnN0IHsgbGltaXQsIHBhZ2UsIHNvcnRCeSwgYmVmb3JlLCBhZnRlciB9ID0ge1xuICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG5cbiAgICBjb25zdCBhc3NldHMgPSBhd2FpdCBBcGkuZ2V0QXNzZXRzQnlHcm91cChcbiAgICAgICdjb2xsZWN0aW9uJyxcbiAgICAgIGNvbGxlY3Rpb25NaW50LFxuICAgICAgbGltaXQsXG4gICAgICBwYWdlLFxuICAgICAgc29ydEJ5LFxuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgKTtcbiAgICBpZiAoYXNzZXRzLmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldHMuZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBhc3NldHMudmFsdWUuaXRlbXM7XG5cbiAgICBjb25zdCBtZXRhZGF0YXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGl0ZW1zXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKVxuICAgICAgICAubWFwKGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2ZmY2hhaW46IE9mZmNoYWluID0gYXdhaXQgZmV0Y2hPZmZjaGFpbihpdGVtLmNvbnRlbnQuanNvbl91cmkpO1xuICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICBvZmZjaGFpbjogb2ZmY2hhaW4sXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgICAgICB9KSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiBhc3NldHMudmFsdWUucGFnZSxcbiAgICAgIHRvdGFsOiBhc3NldHMudmFsdWUudG90YWwsXG4gICAgICBsaW1pdDogYXNzZXRzLnZhbHVlLmxpbWl0LFxuICAgICAgbWV0YWRhdGFzLFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgRGFzQXBpIGFzIEFwaSB9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7IERhc0FwaSBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcblxuZXhwb3J0IGNvbnN0IERhc0FwaSA9IHtcbiAgLi4uQXBpLFxuICAuLi5GaW5kLFxufTtcbiIsICJpbXBvcnQge1xuICBBY2NvdW50TWV0YSxcbiAgUHVibGljS2V5LFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IERhc0FwaSB9IGZyb20gJ34vZGFzLWFwaSc7XG5pbXBvcnQgeyBjcmVhdGVEZWxlZ2F0ZUluc3RydWN0aW9uIH0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LFxuICBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICBTUExfTk9PUF9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC1hY2NvdW50LWNvbXByZXNzaW9uJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5LCBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IERlbGVnYXRlT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvY29tcHJlc3NlZC1uZnQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZURlbGVhZ2F0ZSA9IGFzeW5jIChcbiAgICBhc3NldElkOiBQdWJsaWNLZXksXG4gICAgbmV3RGVsZWdhdGU6IFB1YmxpY0tleSB8IG51bGwsXG4gICk6IFByb21pc2U8VHJhbnNhY3Rpb25JbnN0cnVjdGlvbj4gPT4ge1xuICAgIGNvbnN0IHJwY0Fzc2V0UHJvb2YgPSBhd2FpdCBEYXNBcGkuZ2V0QXNzZXRQcm9vZihhc3NldElkLnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHJwY0Fzc2V0ID0gYXdhaXQgRGFzQXBpLmdldEFzc2V0KGFzc2V0SWQudG9TdHJpbmcoKSk7XG4gICAgaWYgKHJwY0Fzc2V0UHJvb2YuaXNFcnIgfHwgcnBjQXNzZXQuaXNFcnIpIHtcbiAgICAgIHRocm93IEVycm9yKCdSaXNlIGVycm9yIHdoZW4gZ2V0IGFzc2V0IHByb29mIG9yIGFzc2V0Jyk7XG4gICAgfVxuICAgIGRlYnVnTG9nKCcjIGFzc2V0OiAnLCBycGNBc3NldCk7XG4gICAgZGVidWdMb2coJyMgYXNzZXRQcm9vZjogJywgcnBjQXNzZXRQcm9vZik7XG4gICAgY29uc3QgY29tcHJlc3Npb24gPSBycGNBc3NldC52YWx1ZS5jb21wcmVzc2lvbjtcbiAgICBjb25zdCBvd25lcnNoaXAgPSBycGNBc3NldC52YWx1ZS5vd25lcnNoaXA7XG4gICAgY29uc3QgYXNzZXRQcm9vZiA9IHJwY0Fzc2V0UHJvb2YudmFsdWU7XG4gICAgY29uc3QgdHJlZU93bmVyID0gYXNzZXRQcm9vZi50cmVlX2lkLnRvUHVibGljS2V5KCk7XG5cbiAgICBjb25zdCB0cmVlQXV0aG9yaXR5ID0gQWNjb3VudC5QZGEuZ2V0VHJlZUF1dGhvcml0eShhc3NldFByb29mLnRyZWVfaWQpO1xuICAgIGNvbnN0IHByZXZpb3VzTGVhZkRlbGVnYXRlID0gb3duZXJzaGlwLmRlbGVnYXRlXG4gICAgICA/IG93bmVyc2hpcC5kZWxlZ2F0ZS50b1B1YmxpY0tleSgpXG4gICAgICA6IG93bmVyc2hpcC5vd25lci50b1B1YmxpY0tleSgpO1xuICAgIGNvbnN0IG5ld0xlYWZEZWxlZ2F0ZSA9IG5ld0RlbGVnYXRlID8gbmV3RGVsZWdhdGUgOiBwcmV2aW91c0xlYWZEZWxlZ2F0ZTtcbiAgICBjb25zdCB0cmVlQWNjb3VudCA9IGF3YWl0IENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudC5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgIHRyZWVPd25lcixcbiAgICApO1xuICAgIGNvbnN0IGNhbm9weURlcHRoID0gdHJlZUFjY291bnQuZ2V0Q2Fub3B5RGVwdGgoKTtcbiAgICBjb25zdCBzbGljZWRQcm9vZjogQWNjb3VudE1ldGFbXSA9IGFzc2V0UHJvb2YucHJvb2ZcbiAgICAgIC5tYXAoKG5vZGU6IHN0cmluZykgPT4gKHtcbiAgICAgICAgcHVia2V5OiBub2RlLnRvUHVibGljS2V5KCksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9KSlcbiAgICAgIC5zbGljZSgwLCBhc3NldFByb29mLnByb29mLmxlbmd0aCAtIChjYW5vcHlEZXB0aCA/IGNhbm9weURlcHRoIDogMCkpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZURlbGVnYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIHRyZWVBdXRob3JpdHksXG4gICAgICAgIGxlYWZPd25lcjogb3duZXJzaGlwLm93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHByZXZpb3VzTGVhZkRlbGVnYXRlLFxuICAgICAgICBuZXdMZWFmRGVsZWdhdGUsXG4gICAgICAgIG1lcmtsZVRyZWU6IGFzc2V0UHJvb2YudHJlZV9pZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBsb2dXcmFwcGVyOiBTUExfTk9PUF9QUk9HUkFNX0lELFxuICAgICAgICBjb21wcmVzc2lvblByb2dyYW06IFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gICAgICAgIGFuY2hvclJlbWFpbmluZ0FjY291bnRzOiBzbGljZWRQcm9vZixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IFsuLi5hc3NldFByb29mLnJvb3QudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgZGF0YUhhc2g6IFsuLi5jb21wcmVzc2lvbi5kYXRhX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgY3JlYXRvckhhc2g6IFtcbiAgICAgICAgICAuLi5jb21wcmVzc2lvbi5jcmVhdG9yX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpLFxuICAgICAgICBdLFxuICAgICAgICBub25jZTogY29tcHJlc3Npb24ubGVhZl9pZCxcbiAgICAgICAgaW5kZXg6IGNvbXByZXNzaW9uLmxlYWZfaWQsXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBkZWxlZ2F0ZVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgIC8vIHRhcmdldCBtaW50XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgIC8vIG5ldyBkZWxlZ2F0ZSBvciBwcmV2aW91cyBkZWxlZ2F0ZSBzaWduZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPERlbGVnYXRlT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHNldERlbGVnYXRlID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RGVsZWdhdGVPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3RGVsZWdhdGUgPSBvcHRpb25zLmRlbGVnYXRlXG4gICAgICAgID8gb3B0aW9ucy5kZWxlZ2F0ZS50b1B1YmxpY0tleSgpXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBjcmVhdGVEZWxlYWdhdGUobWludC50b1B1YmxpY0tleSgpLCBuZXdEZWxlZ2F0ZSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oW2luc3RdLCBbb3duZXIudG9LZXlwYWlyKCldKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRGFzQXBpIH0gZnJvbSAnfi9kYXMtYXBpJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBNZXRhZGF0YSwgTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBGaW5kT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5pbXBvcnQge1xuICBDaGFuZ2VMb2dFdmVudFYxLFxuICBkZXNlcmlhbGl6ZUNoYW5nZUxvZ0V2ZW50VjEsXG4gIFNQTF9OT09QX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLWFjY291bnQtY29tcHJlc3Npb24nO1xuXG5pbXBvcnQgYnM1OCBmcm9tICdiczU4JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG93bmVyIGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBEYXNBcGkuZmluZEJ5T3duZXIob3duZXIsIHRydWUsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBtaW50IGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsPE1ldGFkYXRhPiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgRGFzQXBpLmZpbmRCeU1pbnQobWludCwgdHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IGNvbGxlY3Rpb24gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeUNvbGxlY3Rpb24gPSBhc3luYyAoXG4gICAgY29sbGVjdGlvbk1pbnQ6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gRGFzQXBpLmZpbmRCeUNvbGxlY3Rpb24oY29sbGVjdGlvbk1pbnQsIHRydWUsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIGNORlQgbWludCBpZCBieSB0cmFuc2FjdGlvbiBzaWduYXR1cmVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpZ25hdHVyZVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFB1YmtleSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRNaW50SWRCeVNpZ25hdHVyZSA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UHVia2V5LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKHNpZ25hdHVyZSwgQ29uc3RhbnRzLkNPTU1JVE1FTlQpO1xuICAgICAgY29uc3QgdHhSZXNwb25zZSA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldFRyYW5zYWN0aW9uKHNpZ25hdHVyZSwge1xuICAgICAgICBjb21taXRtZW50OiBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgICAgICAgbWF4U3VwcG9ydGVkVHJhbnNhY3Rpb25WZXJzaW9uOiBDb25zdGFudHMuTUFYX1RSQU5TQUNUSU9OX1ZFUlNJT04sXG4gICAgICB9KTtcblxuICAgICAgaWYgKCF0eFJlc3BvbnNlKSB0aHJvdyBFcnJvcignTm8gdHhSZXNwb25zZSBwcm92aWRlZCcpO1xuXG4gICAgICBjb25zdCBhY2NvdW50S2V5cyA9IHR4UmVzcG9uc2UudHJhbnNhY3Rpb24ubWVzc2FnZVxuICAgICAgICAuZ2V0QWNjb3VudEtleXMoKVxuICAgICAgICAua2V5U2VnbWVudHMoKVxuICAgICAgICAuZmxhdCgpO1xuXG4gICAgICBjb25zdCBjaGFuZ2VMb2dFdmVudHM6IENoYW5nZUxvZ0V2ZW50VjFbXSA9IFtdO1xuXG4gICAgICB0eFJlc3BvbnNlIS5tZXRhPy5pbm5lckluc3RydWN0aW9ucz8uZm9yRWFjaCgoY29tcGlsZWRJeCkgPT4ge1xuICAgICAgICBjb21waWxlZEl4Lmluc3RydWN0aW9ucy5mb3JFYWNoKChpbm5lckl4KSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgU1BMX05PT1BfUFJPR1JBTV9JRC50b0Jhc2U1OCgpICE9PVxuICAgICAgICAgICAgYWNjb3VudEtleXNbaW5uZXJJeC5wcm9ncmFtSWRJbmRleF0udG9CYXNlNTgoKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2hhbmdlTG9nRXZlbnRzLnB1c2goXG4gICAgICAgICAgICAgIGRlc2VyaWFsaXplQ2hhbmdlTG9nRXZlbnRWMShcbiAgICAgICAgICAgICAgICBCdWZmZXIuZnJvbShiczU4LmRlY29kZShpbm5lckl4LmRhdGEpKSxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgICAgLy9ub29wLCBjYXRjaCBlcnJvciBkZXNlcmlhbGl6ZWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBsZWFmSW5kZXggPSBjaGFuZ2VMb2dFdmVudHNbMF0uaW5kZXg7XG4gICAgICBjb25zdCBzcGFjZU93bmVyID0gY2hhbmdlTG9nRXZlbnRzWzBdLnRyZWVJZDtcbiAgICAgIHJldHVybiBBY2NvdW50LlBkYS5nZXRBc3NldElkKHNwYWNlT3duZXIudG9TdHJpbmcoKSwgbGVhZkluZGV4KTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIERlbGVnYXRlIH0gZnJvbSAnLi9kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHtcbiAgR2FzTGVzc0RlbGVnYXRlT3B0aW9ucyxcbiAgUGFydGlhbFNpZ25TdHJ1Y3R1cmUsXG59IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgZGVsZWdhdGUgd2l0aCBnYXMtbGVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IG5ld0RlbGVnYXRlXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNzTGVzc0RlbGVnYXRlT3B0aW9ucz4gfSBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduVHJhbnNhY3Rpb24sIEVycm9yPj59XG4gICAqL1xuICBleHBvcnQgY29uc3QgZ2FzTGVzc0RlbGVnYXRlID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIG5ld0RlbGVnYXRlOiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxHYXNMZXNzRGVsZWdhdGVPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbnN0ID0gYXdhaXQgRGVsZWdhdGUuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ld0RlbGVnYXRlLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogbmV3RGVsZWdhdGUudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgdHguYWRkKGluc3QpO1xuXG4gICAgICBpZiAob3B0aW9ucy5pc1ByaW9yaXR5RmVlKSB7XG4gICAgICAgIHR4Lmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgIGF3YWl0IFRyYW5zYWN0aW9uQnVpbGRlci5Qcmlvcml0eUZlZS5jcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICAgIHR4Lmluc3RydWN0aW9ucyxcbiAgICAgICAgICAgIG9wdGlvbnMuYWRkU29sUHJpb3JpdHlGZWUsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdHguaW5zdHJ1Y3Rpb25zLnVuc2hpZnQoXG4gICAgICAgIGF3YWl0IFRyYW5zYWN0aW9uQnVpbGRlci5Db21wdXRlVW5pdC5jcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICB0eC5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgb3duZXIudG9LZXlwYWlyKCksXG4gICAgICAgICksXG4gICAgICApO1xuXG4gICAgICB0eC5wYXJ0aWFsU2lnbihvd25lci50b0tleXBhaXIoKSk7XG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5QYXJ0aWFsU2lnbihcbiAgICAgICAgdHhcbiAgICAgICAgICAuc2VyaWFsaXplKHtcbiAgICAgICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50b1N0cmluZygnaGV4JyksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgRGVsZWdhdGUgfSBmcm9tICcuL2dhcy1sZXNzLWRlbGVnYXRlJztcbmltcG9ydCB7XG4gIEdhc0xlc3NUcmFuc2Zlck9wdGlvbnMsXG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICAvKipcbiAgICogVHJhbnNmZXIgd2l0aCBnYXMtbGVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3RcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNzTGVzc1RyYW5zZmVyT3B0aW9ucz4gfSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblRyYW5zYWN0aW9uW10sIEVycm9yPj59XG4gICAqL1xuICBleHBvcnQgY29uc3QgZ2FzTGVzc1RyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8R2FzTGVzc1RyYW5zZmVyT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGVsZWdhdGUgPSBhd2FpdCBEZWxlZ2F0ZS5nYXNMZXNzRGVsZWdhdGUobWludCwgb3duZXIsIGZlZVBheWVyKTtcbiAgICAgIGF3YWl0IGRlbGVnYXRlLnN1Ym1pdCgpO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbih7XG4gICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgIGJsb2NraGFzaDogYmxvY2toYXNoT2JqLmJsb2NraGFzaCxcbiAgICAgICAgZmVlUGF5ZXI6IGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcblxuICAgICAgdHguYWRkKFxuICAgICAgICBhd2FpdCBUcmFuc2Zlci5jcmVhdGVUcmFuc2ZlcihcbiAgICAgICAgICBtaW50LFxuICAgICAgICAgIG5ldyBBY2NvdW50LktleXBhaXIoeyBzZWNyZXQ6IG93bmVyIH0pLnB1YmtleSxcbiAgICAgICAgICBkZXN0LFxuICAgICAgICAgIGZlZVBheWVyLFxuICAgICAgICApLFxuICAgICAgKTtcblxuICAgICAgaWYgKG9wdGlvbnMuaXNQcmlvcml0eUZlZSkge1xuICAgICAgICB0eC5pbnN0cnVjdGlvbnMudW5zaGlmdChcbiAgICAgICAgICBhd2FpdCBUcmFuc2FjdGlvbkJ1aWxkZXIuUHJpb3JpdHlGZWUuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICB0eC5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICBvcHRpb25zLmFkZFNvbFByaW9yaXR5RmVlLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHR4Lmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICBhd2FpdCBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tcHV0ZVVuaXQuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgdHguaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgIG93bmVyLnRvS2V5cGFpcigpLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKFxuICAgICAgICB0eFxuICAgICAgICAgIC5zZXJpYWxpemUoe1xuICAgICAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRvU3RyaW5nKCdoZXgnKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IERhc0FwaSB9IGZyb20gJ34vZGFzLWFwaSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJJbnN0cnVjdGlvbiB9IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb25zJztcbmltcG9ydCB7XG4gIENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudCxcbiAgU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgU1BMX05PT1BfUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtYWNjb3VudC1jb21wcmVzc2lvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVibGljS2V5LCBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBhc3NldElkOiBQdWJrZXksXG4gICAgYXNzZXRJZE93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIGRlbGVnYXRlPzogUHVia2V5LFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24+ID0+IHtcbiAgICBjb25zdCBhc3NldFByb29mID0gYXdhaXQgRGFzQXBpLmdldEFzc2V0UHJvb2YoYXNzZXRJZCk7XG4gICAgZGVidWdMb2coJyMgYXNzZXRQcm9vZjogJywgYXNzZXRQcm9vZik7XG4gICAgaWYgKGFzc2V0UHJvb2YuaXNFcnIpIHtcbiAgICAgIHRocm93IGFzc2V0UHJvb2YuZXJyb3I7XG4gICAgfSBlbHNlIGlmIChhc3NldFByb29mLmlzT2sgJiYgYXNzZXRQcm9vZi52YWx1ZS5wcm9vZi5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IEVycm9yKCdQcm9vZiBpcyBlbXB0eS4gTWF5IGJlIHNldCBSZWd1bGFyIE5GVD8nKTtcbiAgICB9XG5cbiAgICBjb25zdCBhc3NldCA9IGF3YWl0IERhc0FwaS5nZXRBc3NldChhc3NldElkKTtcbiAgICBkZWJ1Z0xvZygnIyBhc3NldDogJywgYXNzZXQpO1xuICAgIGlmIChhc3NldC5pc0Vycikge1xuICAgICAgdGhyb3cgYXNzZXQuZXJyb3I7XG4gICAgfSBlbHNlIGlmIChhc3NldC5pc09rICYmIGFzc2V0LnZhbHVlLm93bmVyc2hpcC5vd25lciAhPT0gYXNzZXRJZE93bmVyKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgYE5GVCBpcyBub3Qgb3duZWQgYnkgdGhlIGV4cGVjdGVkIG93bmVyOiBjdXJyZW50OiAke2Fzc2V0LnZhbHVlLm93bmVyc2hpcC5vd25lcn0sIGV4cGVjdGVkOiAke2Fzc2V0SWRPd25lcn1gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWJ1Z0xvZygnIyBhc3NldFByb29mOiAnLCBhc3NldFByb29mLnZhbHVlKTtcbiAgICBkZWJ1Z0xvZygnIyBvd25lcnNoaXA6ICcsIGFzc2V0LnZhbHVlLm93bmVyc2hpcCk7XG4gICAgZGVidWdMb2coJyMgYXV0aG9yaXRpZXM6ICcsIGFzc2V0LnZhbHVlLmF1dGhvcml0aWVzKTtcblxuICAgIGNvbnN0IGNvbXByZXNzaW9uID0gYXNzZXQudmFsdWUuY29tcHJlc3Npb247XG4gICAgY29uc3Qgb3duZXJzaGlwID0gYXNzZXQudmFsdWUub3duZXJzaGlwO1xuICAgIGNvbnN0IHByb29mID0gYXNzZXRQcm9vZi52YWx1ZS5wcm9vZjtcbiAgICBjb25zdCBtZXJrbGVUcmVlID0gY29tcHJlc3Npb24udHJlZS50b1B1YmxpY0tleSgpO1xuICAgIGNvbnN0IHRyZWVBY2NvdW50ID0gYXdhaXQgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgbWVya2xlVHJlZSxcbiAgICApO1xuICAgIGNvbnN0IHRyZWVBdXRob3JpdHkgPSB0cmVlQWNjb3VudC5nZXRBdXRob3JpdHkoKTtcbiAgICBjb25zdCBjYW5vcHlEZXB0aCA9IHRyZWVBY2NvdW50LmdldENhbm9weURlcHRoKCk7XG5cbiAgICBjb25zdCBwcm9vZlBhdGggPSBwcm9vZlxuICAgICAgLm1hcCgobm9kZTogc3RyaW5nKSA9PiAoe1xuICAgICAgICBwdWJrZXk6IG5vZGUudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pKVxuICAgICAgLnNsaWNlKDAsIHByb29mLmxlbmd0aCAtIChjYW5vcHlEZXB0aCA/IGNhbm9weURlcHRoIDogMCkpO1xuXG4gICAgY29uc3QgbGVhZk93bmVyID0gb3duZXJzaGlwLm93bmVyLnRvUHVibGljS2V5KCk7XG4gICAgY29uc3QgbmV3TGVhZk93bmVyID0gZGVzdC50b1B1YmxpY0tleSgpO1xuICAgIGNvbnN0IGxlYWZOb25jZSA9IGNvbXByZXNzaW9uLmxlYWZfaWQ7XG4gICAgbGV0IGxlYWZEZWxlZ2F0ZTogUHVibGljS2V5O1xuICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgbGVhZkRlbGVnYXRlID0gZGVsZWdhdGUudG9QdWJsaWNLZXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGVhZkRlbGVnYXRlID0gb3duZXJzaGlwLmRlbGVnYXRlXG4gICAgICAgID8gb3duZXJzaGlwLmRlbGVnYXRlLnRvUHVibGljS2V5KClcbiAgICAgICAgOiBsZWFmT3duZXI7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVUcmFuc2Zlckluc3RydWN0aW9uKFxuICAgICAge1xuICAgICAgICBtZXJrbGVUcmVlLFxuICAgICAgICB0cmVlQXV0aG9yaXR5LFxuICAgICAgICBsZWFmT3duZXIsXG4gICAgICAgIGxlYWZEZWxlZ2F0ZSxcbiAgICAgICAgbmV3TGVhZk93bmVyLFxuICAgICAgICBsb2dXcmFwcGVyOiBTUExfTk9PUF9QUk9HUkFNX0lELFxuICAgICAgICBjb21wcmVzc2lvblByb2dyYW06IFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gICAgICAgIGFuY2hvclJlbWFpbmluZ0FjY291bnRzOiBwcm9vZlBhdGgsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByb290OiBbLi4uYXNzZXRQcm9vZi52YWx1ZS5yb290LnRyaW0oKS50b1B1YmxpY0tleSgpLnRvQnl0ZXMoKV0sXG4gICAgICAgIGRhdGFIYXNoOiBbLi4uY29tcHJlc3Npb24uZGF0YV9oYXNoLnRyaW0oKS50b1B1YmxpY0tleSgpLnRvQnl0ZXMoKV0sXG4gICAgICAgIGNyZWF0b3JIYXNoOiBbXG4gICAgICAgICAgLi4uY29tcHJlc3Npb24uY3JlYXRvcl9oYXNoLnRyaW0oKS50b1B1YmxpY0tleSgpLnRvQnl0ZXMoKSxcbiAgICAgICAgXSxcbiAgICAgICAgbm9uY2U6IGxlYWZOb25jZSxcbiAgICAgICAgaW5kZXg6IGxlYWZOb25jZSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogdHJhbnNmZXIgbmZ0XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge1B1YmtleX0gZGVzdFxuICAgKiBAcGFyYW0ge1NlY3JldFtdfSBvd25lck9yTXVsdGlzaWdcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcbiAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBjcmVhdGVUcmFuc2ZlcihtaW50LCBvd25lciwgZGVzdCk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oW2luc3RdLCBrZXlwYWlycyk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgaXNCcm93c2VyLCBpc05vZGUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEZpbGVUeXBlLCBJZGVudGl0eSwgVGFncywgVXBsb2FkYWJsZUZpbGVUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IFBoYW50b21Qcm92aWRlciB9IGZyb20gJ34vdHlwZXMvcGhhbnRvbSc7XG5pbXBvcnQgSXJ5cywgeyBXZWJJcnlzIH0gZnJvbSAnQGlyeXMvc2RrJztcbmltcG9ydCB7IFVwbG9hZFJlc3BvbnNlIH0gZnJvbSAnQGlyeXMvc2RrL2J1aWxkL2VzbS9jb21tb24vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFByb3ZlbmFuY2VMYXllciB7XG4gIGNvbnN0IFRPS0VOID0gJ3NvbGFuYSc7XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgdXBsb2FkRmlsZTogRmlsZVR5cGUsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICAgIHRhZ3M/OiBUYWdzLFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBsZXQgcmVjZWlwdCE6IFVwbG9hZFJlc3BvbnNlO1xuICAgIGlmIChpc1VwbG9hZGFibGUodXBsb2FkRmlsZSkpIHtcbiAgICAgIHJlY2VpcHQgPSBhd2FpdCBpcnlzLnVwbG9hZEZpbGUodXBsb2FkRmlsZSwgeyB0YWdzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggZmlsZSB0eXBlIG9yIGVudmlyb21lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke0NvbnN0YW50cy5JUllTX0dBVEVXQVlfVVJMfS8ke3JlY2VpcHQuaWR9YDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBkYXRhOiBzdHJpbmcsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICAgIHRhZ3M/OiBUYWdzLFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCByZWNlaXB0ID0gYXdhaXQgaXJ5cy51cGxvYWQoZGF0YSwgeyB0YWdzIH0pO1xuICAgIHJldHVybiBgJHtDb25zdGFudHMuSVJZU19HQVRFV0FZX1VSTH0vJHtyZWNlaXB0LmlkfWA7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzTm9kZWFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNCcm93c2VyYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEZpbGUgPT4ge1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1VwbG9hZGFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBVcGxvYWRhYmxlRmlsZVR5cGUgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZnVuZEFyd2VhdmUgPSBhc3luYyAoXG4gICAgdXBsb2FkRmlsZTogRmlsZVR5cGUsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgYnl0ZUxlbmd0aCA9IGF3YWl0IHRvQnl0ZUxlbmd0aCh1cGxvYWRGaWxlKTtcbiAgICBjb25zdCB3aWxsUGF5ID0gYXdhaXQgY2FsY3VsYXRlQ29zdChieXRlTGVuZ3RoLCBpZGVudGl0eSk7XG4gICAgY29uc3QgZnVuZFR4ID0gYXdhaXQgaXJ5cy5mdW5kKGlyeXMudXRpbHMudG9BdG9taWMod2lsbFBheSkpO1xuICAgIGRlYnVnTG9nKCcjIGZ1bmRUeDogJywgZnVuZFR4KTtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IHRvQnl0ZUxlbmd0aCA9IGFzeW5jIChjb250ZW50OiBGaWxlVHlwZSk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgbGV0IGxlbmd0aDogbnVtYmVyID0gMTAwO1xuICAgIGlmIChpc05vZGVhYmxlKGNvbnRlbnQpKSB7XG4gICAgICBsZW5ndGggPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoY29udGVudCkubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyYWJsZShjb250ZW50KSkge1xuICAgICAgbGVuZ3RoID0gY29udGVudC5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggY29udGVudCB0eXBlJyk7XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXRJcnlzID0gYXN5bmMgPFQgZXh0ZW5kcyBJcnlzIHwgV2ViSXJ5cz4oXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICApID0+IHtcbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZ2V0Tm9kZUlyeXMoaWRlbnRpdHkgYXMgU2VjcmV0KSkgYXMgVDtcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGdldEJyb3dzZXJJcnlzKGlkZW50aXR5IGFzIFBoYW50b21Qcm92aWRlcikpIGFzIFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdPbmx5IE5vZGUuanMgb3IgQnJvd3NlcicpO1xuICAgIH1cbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldE5vZGVJcnlzID0gYXN5bmMgKHNlY3JldDogU2VjcmV0KSA9PiB7XG4gICAgY29uc3QgY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICB9KTtcbiAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMO1xuICAgIGNvbnN0IHRva2VuID0gVE9LRU47XG4gICAgY29uc3Qga2V5ID0gc2VjcmV0O1xuICAgIGNvbnN0IGlyeXMgPSBuZXcgSXJ5cyh7XG4gICAgICB1cmwsXG4gICAgICB0b2tlbixcbiAgICAgIGtleSxcbiAgICAgIGNvbmZpZzogeyBwcm92aWRlclVybDogY2x1c3RlclVybCB9LFxuICAgIH0pO1xuICAgIHJldHVybiBpcnlzO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0QnJvd3NlcklyeXMgPSBhc3luYyAoXG4gICAgcHJvdmlkZXI6IFBoYW50b21Qcm92aWRlcixcbiAgKTogUHJvbWlzZTxXZWJJcnlzPiA9PiB7XG4gICAgY29uc3QgY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICB9KTtcbiAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMO1xuICAgIGNvbnN0IHRva2VuID0gVE9LRU47XG4gICAgY29uc3Qgd2FsbGV0ID0geyBycGNVcmw6IGNsdXN0ZXJVcmwsIG5hbWU6IFRPS0VOLCBwcm92aWRlcjogcHJvdmlkZXIgfTtcbiAgICBjb25zdCB3ZWJJcnlzID0gbmV3IFdlYklyeXMoeyB1cmwsIHRva2VuLCB3YWxsZXQgfSk7XG4gICAgYXdhaXQgd2ViSXJ5cy5yZWFkeSgpO1xuICAgIHJldHVybiB3ZWJJcnlzO1xuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZUNvc3QgPSBhc3luYyAoc2l6ZTogbnVtYmVyLCBpZGVudGl0eTogSWRlbnRpdHkpID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgcHJpY2VBdG9taWMgPSBhd2FpdCBpcnlzLmdldFByaWNlKHNpemUpO1xuICAgIGNvbnN0IHByaWNlQ29udmVydGVkID0gaXJ5cy51dGlscy5mcm9tQXRvbWljKHByaWNlQXRvbWljKTtcbiAgICBkZWJ1Z0xvZygnIyBzaXplOiAnLCBzaXplKTtcbiAgICBkZWJ1Z0xvZyhgIyBwcmljZTogJHtwcmljZUNvbnZlcnRlZH1gKTtcbiAgICByZXR1cm4gcHJpY2VDb252ZXJ0ZWQ7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHJvdmVuYW5jZUxheWVyIH0gZnJvbSAnLi9wcm92ZW5hbmNlLWxheWVyJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEZpbGVUeXBlLCBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5cbi8vIEBpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBBcndlYXZlIHtcbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgZmlsZTogJywgZmlsZVBhdGgpO1xuICAgICAgYXdhaXQgUHJvdmVuYW5jZUxheWVyLmZ1bmRBcndlYXZlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgICByZXR1cm4gYXdhaXQgUHJvdmVuYW5jZUxheWVyLnVwbG9hZEZpbGUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IChcbiAgICBzdG9yYWdlRGF0YTogT2ZmY2hhaW4sXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VEYXRhLmNyZWF0ZWRfYXQgPSB1bml4VGltZXN0YW1wKCk7XG4gICAgICBkZWJ1Z0xvZygnIyBXaWxsIHVwbG9hZCBvZmZjaGFpbjogJywgc3RvcmFnZURhdGEpO1xuICAgICAgcmV0dXJuIGF3YWl0IFByb3ZlbmFuY2VMYXllci51cGxvYWREYXRhKFxuICAgICAgICBKU09OLnN0cmluZ2lmeShzdG9yYWdlRGF0YSksXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBCbG9iLCBORlRTdG9yYWdlIH0gZnJvbSAnbmZ0LnN0b3JhZ2UnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnksIHVuaXhUaW1lc3RhbXAgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFByb3ZlbmFuY2VMYXllciB9IGZyb20gJy4vcHJvdmVuYW5jZS1sYXllcic7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG4vLyBAaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgTmZ0U3RvcmFnZSB7XG4gIGNvbnN0IGNyZWF0ZUdhdGV3YXlVcmwgPSAoY2lkOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICBgJHtDb25zdGFudHMuTkZUX1NUT1JBR0VfR0FURVdBWV9VUkx9LyR7Y2lkfWA7XG5cbiAgY29uc3QgY29ubmVjdCA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IE5GVFN0b3JhZ2UoeyB0b2tlbjogQ29uc3RhbnRzLk5GVF9TVE9SQUdFX0FQSV9LRVkgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgZmlsZVR5cGU6IEZpbGVUeXBlLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQ6ICcsIGZpbGVUeXBlKTtcbiAgICAgIGxldCBmaWxlITogQnVmZmVyO1xuICAgICAgaWYgKFByb3ZlbmFuY2VMYXllci5pc05vZGVhYmxlKGZpbGVUeXBlKSkge1xuICAgICAgICBmaWxlID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVUeXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoUHJvdmVuYW5jZUxheWVyLmlzQnJvd3NlcmFibGUoZmlsZVR5cGUpKSB7XG4gICAgICAgIGZpbGUgPSBCdWZmZXIuZnJvbShhd2FpdCBmaWxlVHlwZS5hcnJheUJ1ZmZlcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGUgPSBCdWZmZXIuZnJvbShmaWxlVHlwZSBhcyBBcnJheUJ1ZmZlcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJsb2JJbWFnZSA9IG5ldyBCbG9iKFtmaWxlXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JJbWFnZSk7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudFxuICAgKlxuICAgKiBAcGFyYW0ge09mZmNoYWlufSBzdG9yYWdlRGF0YVxuICAgKiB7XG4gICAqICAgbmFtZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBkZXNjcmlwdGlvbj86IHtzdHJpbmd9ICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBzZWxsZXJGZWVCYXNpc1BvaW50cz86IG51bWJlciAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgaW1hZ2U/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgIC8vIHVwbG9hZGVkIHVyaSBvZiBvcmlnaW5hbCBjb250ZW50XG4gICAqICAgZXh0ZXJuYWxfdXJsPzoge3N0cmluZ30gICAgICAgICAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzoge0pzb25NZXRhZGF0YUF0dHJpYnV0ZVtdfSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IHtKc29uTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT59IC8vIGluY2x1ZGVkIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IENvbGxlY3Rpb24gICAgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIFtrZXk6IHN0cmluZ106IHt1bmtub3dufSAgICAgICAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogfVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZERhdGEgPSBhc3luYyAoXG4gICAgc3RvcmFnZURhdGE6IE9mZmNoYWluLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gY3JlYXRlZCBhdCBieSB1bml4IHRpbWVzdGFtcFxuICAgICAgc3RvcmFnZURhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcbiAgICAgIGRlYnVnTG9nKCcjIFdpbGwgdXBsb2FkIG9mZmNoYWluOiAnLCBzdG9yYWdlRGF0YSk7XG4gICAgICBjb25zdCBibG9iSnNvbiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzdG9yYWdlRGF0YSldKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkpzb24pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7XG4gIEZpbGVUeXBlLFxuICBPZmZjaGFpbixcbiAgU3RvcmFnZU9wdGlvbnMsXG4gIFN0b3JhZ2VUeXBlLFxufSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQXJ3ZWF2ZSB9IGZyb20gJy4vYXJ3ZWF2ZSc7XG5pbXBvcnQgeyBOZnRTdG9yYWdlIH0gZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RvcmFnZSB7XG4gIC8qIEBpbnRlcm5hbCAqL1xuICBleHBvcnQgY29uc3QgdG9Db252ZXJ0T2ZmY2hhaW5kYXRhID0gKFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICk6IE9mZmNoYWluID0+IHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgZGVzY3JpcHRpb246IGlucHV0LmRlc2NyaXB0aW9uLFxuICAgICAgc2VsbGVyX2ZlZV9iYXNpc19wb2ludHM6IHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgYW5pbWF0aW9uX3VybDogaW5wdXQuYW5pbWF0aW9uX3VybCxcbiAgICAgIGV4dGVybmFsX3VybDogaW5wdXQuZXh0ZXJuYWxfdXJsLFxuICAgICAgYXR0cmlidXRlczogaW5wdXQuYXR0cmlidXRlcyxcbiAgICAgIHByb3BlcnRpZXM6IGlucHV0LnByb3BlcnRpZXMsXG4gICAgICBpbWFnZTogJycsXG4gICAgICBvcHRpb25zOiBpbnB1dC5vcHRpb25zLFxuICAgIH07XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFN0b3JhZ2VPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIW9wdGlvbnMuZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkRmlsZShmaWxlUGF0aCwgb3B0aW9ucy5mZWVQYXllcik7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWRGaWxlKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBzdG9yYWdlVHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBpbnB1dDogT2ZmY2hhaW4sXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8U3RvcmFnZU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghb3B0aW9ucy5mZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWREYXRhKGlucHV0LCBvcHRpb25zLmZlZVBheWVyKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZERhdGEoaW5wdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuICB9O1xuXG4gIC8qIEBpbnRlcm5hbCAqL1xuICBleHBvcnQgY29uc3QgdXBsb2FkID0gYXN5bmMgKFxuICAgIGlucHV0OiBPZmZjaGFpbixcbiAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8U3RvcmFnZU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScgJiYgIW9wdGlvbnMuZmVlUGF5ZXIpIHtcbiAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICB9XG4gICAgY29uc3Qgc3RvcmFnZSA9IGF3YWl0IChcbiAgICAgIGF3YWl0IHVwbG9hZEZpbGUoZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBvcHRpb25zKVxuICAgICkudW53cmFwKFxuICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaW5wdXQuaW1hZ2UgPSBvaztcbiAgICAgICAgcmV0dXJuIGF3YWl0IHVwbG9hZERhdGEoaW5wdXQsIHN0b3JhZ2VUeXBlLCBvcHRpb25zKTtcbiAgICAgIH0sXG4gICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9LFxuICAgICk7XG5cbiAgICBpZiAoIXN0b3JhZ2UpIHtcbiAgICAgIHRocm93IEVycm9yKCdFbXB0eSBzdG9yYWdlIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gc3RvcmFnZTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTdG9yYWdlIGFzIFBhcmVudCB9IGZyb20gJy4vc3RvcmFnZSc7XG5cbi8qKiBAbmFtZXNwYWNlICovXG5leHBvcnQgY29uc3QgU3RvcmFnZSA9IHtcbiAgLi4uUGFyZW50LFxufTtcbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgRGV0YWlscywgTGltaXQgfSBmcm9tICd+L3R5cGVzL3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFZhbGlkYXRvciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVzc2FnZSB7XG4gICAgZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnc3VjY2Vzcyc7XG4gICAgZXhwb3J0IGNvbnN0IFNNQUxMX05VTUJFUiA9ICd0b28gc21hbGwnO1xuICAgIGV4cG9ydCBjb25zdCBCSUdfTlVNQkVSID0gJ3RvbyBiaWcnO1xuICAgIGV4cG9ydCBjb25zdCBMT05HX0xFTkdUSCA9ICd0b28gbG9uZyc7XG4gICAgZXhwb3J0IGNvbnN0IEVNUFRZID0gJ2ludmFsaWQgZW1wdHkgdmFsdWUnO1xuICAgIGV4cG9ydCBjb25zdCBJTlZBTElEX1VSTCA9ICdpbnZhbGlkIHVybCc7XG4gICAgZXhwb3J0IGNvbnN0IE9OTFlfTk9ERV9KUyA9ICdgc3RyaW5nYCB0eXBlIGlzIG9ubHkgTm9kZS5qcyc7XG4gIH1cblxuICBleHBvcnQgY29uc3QgTkFNRV9MRU5HVEggPSAzMjtcbiAgZXhwb3J0IGNvbnN0IFNZTUJPTF9MRU5HVEggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IFVSTF9MRU5HVEggPSAyMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01BWCA9IDEwMDtcbiAgZXhwb3J0IGNvbnN0IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCA9IDEwMDAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NSU4gPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBpc1JveWFsdHkgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3JveWFsdHknO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1NlbGxlckZlZUJhc2lzUG9pbnRzID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzZWxsZXJGZWVCYXNpc1BvaW50cy9zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc7XG4gICAgICBpZiAocm95YWx0eSAhPT0gMCAmJiAhcm95YWx0eSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHJveWFsdHkpO1xuICAgICAgfVxuICAgICAgaWYgKHJveWFsdHkgPCBST1lBTFRZX01JTikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuU01BTExfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01JTixcbiAgICAgICAgICBjb25kaXRpb246ICd1bmRlck1pbicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChyb3lhbHR5ID4gUk9ZQUxUWV9NQVggKiBDb252ZXJ0ZXIuUm95YWx0eS5USFJFU0hPTEQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc05hbWUgPSAobmFtZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICduYW1lJztcbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgobmFtZSkgPiBOQU1FX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIG5hbWUsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IE5BTUVfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU3ltYm9sID0gKHN5bWJvbDogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzeW1ib2wnO1xuICAgICAgaWYgKCFzeW1ib2wpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBzeW1ib2wpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoc3ltYm9sKSA+IFNZTUJPTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBzeW1ib2wsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNZTUJPTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNJbWFnZVVybCA9IChpbWFnZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+XG4gICAgaXNVcmlPckltYWdlKGltYWdlLCAnaW1hZ2UnKTtcblxuICBleHBvcnQgY29uc3QgY2hlY2tBbGwgPSA8XG4gICAgVCBleHRlbmRzIFBpY2tOZnRTdG9yYWdlIHwgUGlja05mdFN0b3JhZ2VNZXRhcGxleCB8IFBpY2tNZXRhcGxleCxcbiAgPihcbiAgICBtZXRhZGF0YTogVCxcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSk7XG4gICAgICBjb25zdCByZXN1bHRzOiBEZXRhaWxzW10gPSBbXTtcbiAgICAgIGtleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgbGV0IHJlcyE6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPjtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLmltYWdlKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzSW1hZ2VVcmwobWV0YWRhdGEuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncm95YWx0eSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnJveWFsdHkpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNSb3lhbHR5KG1ldGFkYXRhLnJveWFsdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cykge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5uYW1lKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzTmFtZShtZXRhZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuc3ltYm9sKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU3ltYm9sKG1ldGFkYXRhLnN5bWJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzICYmIHJlcy5pc0Vycikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5yZXMuZXJyb3IuZGV0YWlscyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAnQ2F1Z2h0IGluIHRoZSB2YWxpZGF0aW9uIGVycm9ycy4gc2VlIGluZm9ybWF0aW9uIGUuZzogZXJyPFZhbGlkYXRvckVycm9yPi5kZXRhaWxzJztcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICB0eXBlIFBpY2tOZnRTdG9yYWdlID0gUGljazxcbiAgICBPZmZjaGFpbixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdpbWFnZScgfCAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnXG4gID47XG4gIHR5cGUgUGlja05mdFN0b3JhZ2VNZXRhcGxleCA9IFBpY2s8XG4gICAgSW5wdXROZnRNZXRhZGF0YSxcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdyb3lhbHR5JyB8ICdmaWxlUGF0aCdcbiAgPjtcbiAgdHlwZSBQaWNrTWV0YXBsZXggPSBQaWNrPFxuICAgIERhdGFWMixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICd1cmknIHwgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJ1xuICA+O1xuXG4gIGNvbnN0IGJ5dGVMZW5ndGggPSAodmFsdWU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdGV4dCA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgIHJldHVybiB0ZXh0LmVuY29kZSh2YWx1ZSkubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUVycm9yID0gKFxuICAgIGtleTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBhY3R1YWw6IHN0cmluZyB8IG51bWJlcixcbiAgICBsaW1pdD86IExpbWl0LFxuICApOiBWYWxpZGF0b3JFcnJvciA9PiB7XG4gICAgbGV0IGVycm9yOiBWYWxpZGF0b3JFcnJvcjtcbiAgICBpZiAobGltaXQpIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsLCBsaW1pdCB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsIH1dKTtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9O1xuXG4gIGNvbnN0IGlzVXJpT3JJbWFnZSA9IChcbiAgICBpbWFnZU9yVXJpOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBpZiAoIWltYWdlT3JVcmkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKGltYWdlT3JVcmkpID4gVVJMX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIGltYWdlT3JVcmksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFVSTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCEvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7PzomPSssJSNdKy9nLnRlc3QoaW1hZ2VPclVyaSkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLklOVkFMSURfVVJMLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgZGV0YWlsczogRGV0YWlsc1tdO1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNbXSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N1aXRlLXN0b3JhZ2UnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICd+L3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBEYXNBcGkgfSBmcm9tICd+L2Rhcy1hcGknO1xuaW1wb3J0IHtcbiAgY29tcHV0ZUNyZWF0b3JIYXNoLFxuICBjb21wdXRlRGF0YUhhc2gsXG4gIGNyZWF0ZU1pbnRUb0NvbGxlY3Rpb25WMUluc3RydWN0aW9uLFxuICBjcmVhdGVWZXJpZnlDcmVhdG9ySW5zdHJ1Y3Rpb24sXG4gIENyZWF0b3IsXG4gIE1ldGFkYXRhQXJncyxcbiAgUFJPR1JBTV9JRCBhcyBCVUJCTEVHVU1fUFJPR1JBTV9JRCxcbn0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LFxuICBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICBTUExfTk9PUF9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC1hY2NvdW50LWNvbXByZXNzaW9uJztcblxuaW1wb3J0IHsgUFJPR1JBTV9JRCBhcyBUT0tFTl9NRVRBREFUQV9QUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7XG4gIEFjY291bnRNZXRhLFxuICBQdWJsaWNLZXksXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvY29tcHJlc3NlZC1uZnQnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZVZlcmlmeUNyZWF0b3IgPSBhc3luYyAoXG4gICAgY3JlYXRvcnM6IENyZWF0b3JbXSxcbiAgICBhc3NldElkOiBQdWJsaWNLZXksXG4gICAgdHJlZU93bmVyOiBQdWJsaWNLZXksXG4gICAgbWV0YWRhdGE6IE1ldGFkYXRhQXJncyxcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24+ID0+IHtcbiAgICBjb25zdCBycGNBc3NldFByb29mID0gYXdhaXQgRGFzQXBpLmdldEFzc2V0UHJvb2YoYXNzZXRJZC50b1N0cmluZygpKTtcbiAgICBjb25zdCBycGNBc3NldCA9IGF3YWl0IERhc0FwaS5nZXRBc3NldChhc3NldElkLnRvU3RyaW5nKCkpO1xuICAgIGlmIChycGNBc3NldFByb29mLmlzRXJyIHx8IHJwY0Fzc2V0LmlzRXJyKSB7XG4gICAgICB0aHJvdyBFcnJvcignUmlzZSBlcnJvciB3aGVuIGdldCBhc3NldCBwcm9vZiBvciBhc3NldCcpO1xuICAgIH1cbiAgICBjb25zdCBjb21wcmVzc2lvbiA9IHJwY0Fzc2V0LnZhbHVlLmNvbXByZXNzaW9uO1xuICAgIGNvbnN0IG93bmVyc2hpcCA9IHJwY0Fzc2V0LnZhbHVlLm93bmVyc2hpcDtcbiAgICBjb25zdCBhc3NldFByb29mID0gcnBjQXNzZXRQcm9vZi52YWx1ZTtcblxuICAgIGNvbnN0IHRyZWVBY2NvdW50ID0gYXdhaXQgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgdHJlZU93bmVyLFxuICAgICk7XG4gICAgY29uc3QgY2Fub3B5RGVwdGggPSB0cmVlQWNjb3VudC5nZXRDYW5vcHlEZXB0aCgpO1xuICAgIGNvbnN0IHNsaWNlZFByb29mOiBBY2NvdW50TWV0YVtdID0gYXNzZXRQcm9vZi5wcm9vZlxuICAgICAgLm1hcCgobm9kZTogc3RyaW5nKSA9PiAoe1xuICAgICAgICBwdWJrZXk6IG5vZGUudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pKVxuICAgICAgLnNsaWNlKDAsIGFzc2V0UHJvb2YucHJvb2YubGVuZ3RoIC0gKGNhbm9weURlcHRoID8gY2Fub3B5RGVwdGggOiAwKSk7XG5cbiAgICByZXR1cm4gY3JlYXRlVmVyaWZ5Q3JlYXRvckluc3RydWN0aW9uKFxuICAgICAge1xuICAgICAgICB0cmVlQXV0aG9yaXR5OiB0cmVlT3duZXIsXG4gICAgICAgIGxlYWZPd25lcjogb3duZXJzaGlwLm93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGxlYWZEZWxlZ2F0ZTogKG93bmVyc2hpcC5kZWxlZ2F0ZSB8fCBvd25lcnNoaXAub3duZXIpLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1lcmtsZVRyZWU6IGFzc2V0UHJvb2YudHJlZV9pZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG5cbiAgICAgICAgbG9nV3JhcHBlcjogU1BMX05PT1BfUFJPR1JBTV9JRCxcbiAgICAgICAgY29tcHJlc3Npb25Qcm9ncmFtOiBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICAgICAgICBjcmVhdG9yOiBmZWVQYXllcixcblxuICAgICAgICAvLyBwcm92aWRlIHRoZSBzbGljZWQgcHJvb2ZcbiAgICAgICAgYW5jaG9yUmVtYWluaW5nQWNjb3VudHM6IHNsaWNlZFByb29mLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcm9vdDogWy4uLmFzc2V0UHJvb2Yucm9vdC50cmltKCkudG9QdWJsaWNLZXkoKS50b0J5dGVzKCldLFxuICAgICAgICBjcmVhdG9ySGFzaDogWy4uLmNvbXB1dGVDcmVhdG9ySGFzaChjcmVhdG9ycyldLFxuICAgICAgICBkYXRhSGFzaDogWy4uLmNvbXB1dGVEYXRhSGFzaChtZXRhZGF0YSldLFxuICAgICAgICBub25jZTogY29tcHJlc3Npb24ubGVhZl9pZCxcbiAgICAgICAgaW5kZXg6IGNvbXByZXNzaW9uLmxlYWZfaWQsXG4gICAgICAgIG1lc3NhZ2U6IG1ldGFkYXRhLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgQ29tcHJlc3NlZCBORlQgbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXIgICAgICAgICAvLyBvd25lcidzIFNlY3JldFxuICAgKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gICAqIHtcbiAgICogICBuYW1lOiBzdHJpbmcgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sOiBzdHJpbmcgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyBEZWNlbnRyYWxpemVkIHN0b3JhZ2VcbiAgICogICB1cmk/OiBzdHJpbmcgfCBGaWxlICAgICAgICAvLyB1cGxvYWRlZCBjb250ZW50IHVybFxuICAgKiAgIGZpbGVQYXRoPzogc3RyaW5nIHwgRmlsZSAgIC8vIHVwbG9hZCBjb250ZW50XG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgaXNNdXRhYmxlPzogYm9vbGVhbiAgICAgICAgICAgLy8gZW5hYmxlIHVwZGF0ZSgpXG4gICAqICAgb3B0aW9ucz86IFtrZXk6IHN0cmluZ10/OiB1bmtub3duICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEBwYXJhbSB7UHVia2V5fSBzcGFjZU93bmVyICAgICAgLy8gUHJldmlvdXNseSBjcmVhdGVkIHNwYWNlIG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBjb2xsZWN0aW9uTWludCAvLyBQcmV2aW91c2x5IGNyZWF0ZWQgY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9ucyAgICAgICAgIC8vIG1pbnQgb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBzcGFjZU93bmVyOiBQdWJrZXksXG4gICAgY29sbGVjdGlvbk1pbnQ6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXROZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBmZWVQYXllciwgcmVjZWl2ZXIsIGRlbGVnYXRlIH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogb3duZXI7XG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNLZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG4gICAgICBjb25zdCBsZWFmT3duZXIgPSByZWNlaXZlciA/IHJlY2VpdmVyLnRvUHVibGljS2V5KCkgOiBvd25lclB1YmxpY0tleTtcbiAgICAgIGNvbnN0IGxlYWZEZWxlZ2F0ZSA9IGRlbGVnYXRlXG4gICAgICAgID8gZGVsZWdhdGVcbiAgICAgICAgOiBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBwYXllciEgfSkucHVia2V5O1xuXG4gICAgICBjb25zdCB0cmVlQXV0aG9yaXR5ID0gQWNjb3VudC5QZGEuZ2V0VHJlZUF1dGhvcml0eShcbiAgICAgICAgc3BhY2VPd25lci50b1B1YmxpY0tleSgpLnRvU3RyaW5nKCksXG4gICAgICApO1xuICAgICAgY29uc3QgY29sbGVjdGlvbk1ldGFkYXRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEoXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnRvU3RyaW5nKCksXG4gICAgICApO1xuICAgICAgY29uc3QgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihcbiAgICAgICAgY29sbGVjdGlvbk1pbnQudG9TdHJpbmcoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBidWJibGVndW1TaWduZXIgPSBBY2NvdW50LlBkYS5nZXRCZ3VtU2lnbmVyKCk7XG5cbiAgICAgIC8vIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50XG4gICAgICBsZXQgcHJvcGVydGllcztcbiAgICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgeyBmZWVQYXllcjogcGF5ZXIgfSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJveWFsdHkgPSBpbnB1dC5yb3lhbHR5ID8gaW5wdXQucm95YWx0eSA6IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IENvbnZlcnRlci5Sb3lhbHR5LmludG9JbmZyYShyb3lhbHR5KTtcbiAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgLy8gdXBsb2FkIGZpbGVcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICB7IGZlZVBheWVyOiBwYXllciB9LFxuICAgICAgICApO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIC8vIHVwbG9hZGVkIGZpbGVcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHsgZmVlUGF5ZXI6IHBheWVyIH0sXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb252ZXJ0ZWQgPSBDb252ZXJ0ZXIuQ29tcHJlc3NlZE5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBtZXRhZGF0YUFyZ3M6IE1ldGFkYXRhQXJncyA9IHtcbiAgICAgICAgLi4uY29udmVydGVkLFxuICAgICAgICBjb2xsZWN0aW9uOiB7IGtleTogY29sbGVjdGlvbk1pbnQudG9QdWJsaWNLZXkoKSwgdmVyaWZpZWQ6IGZhbHNlIH0sXG4gICAgICB9O1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgbWV0YWRhdGFBcmdzOiAnLCBtZXRhZGF0YUFyZ3MpO1xuXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICBjcmVhdGVNaW50VG9Db2xsZWN0aW9uVjFJbnN0cnVjdGlvbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXJrbGVUcmVlOiBzcGFjZU93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICB0cmVlQXV0aG9yaXR5LFxuICAgICAgICAgICAgdHJlZURlbGVnYXRlOiBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIHBheWVyOiBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgICBsZWFmT3duZXI6IGxlYWZPd25lciwgLy8gcmVjZWl2ZXJcbiAgICAgICAgICAgIGxlYWZEZWxlZ2F0ZTogbGVhZkRlbGVnYXRlLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5OiBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25NaW50OiBjb2xsZWN0aW9uTWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgY29sbGVjdGlvbk1ldGFkYXRhLFxuICAgICAgICAgICAgZWRpdGlvbkFjY291bnQ6IGNvbGxlY3Rpb25NYXN0ZXJFZGl0aW9uQWNjb3VudCxcbiAgICAgICAgICAgIGJ1YmJsZWd1bVNpZ25lcixcbiAgICAgICAgICAgIGxvZ1dyYXBwZXI6IFNQTF9OT09QX1BST0dSQU1fSUQsXG4gICAgICAgICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5UmVjb3JkUGRhOiBCVUJCTEVHVU1fUFJPR1JBTV9JRCxcbiAgICAgICAgICAgIGNvbXByZXNzaW9uUHJvZ3JhbTogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgICAgIHRva2VuTWV0YWRhdGFQcm9ncmFtOiBUT0tFTl9NRVRBREFUQV9QUk9HUkFNX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0YWRhdGFBcmdzLFxuICAgICAgICAgIH0sXG4gICAgICAgICksXG4gICAgICApO1xuXG4gICAgICAvLyBpZiAoaW5wdXQuY3JlYXRvcnMpIHtcbiAgICAgIC8vICAgY29uc3QgYXNzZXRJZCA9IGF3YWl0IG5ldyBTcGFjZS5TcGFjZShzcGFjZU93bmVyKS5nZXRBc3NldElkKCk7XG4gICAgICAvLyAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgLy8gICAgIGF3YWl0IGNyZWF0ZVZlcmlmeUNyZWF0b3IoXG4gICAgICAvLyAgICAgICBtZXRhZGF0YUFyZ3MuY3JlYXRvcnMsXG4gICAgICAvLyAgICAgICBhc3NldElkLnRvUHVibGljS2V5KCksXG4gICAgICAvLyAgICAgICBzcGFjZU93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAvLyAgICAgICBtZXRhZGF0YUFyZ3MsXG4gICAgICAvLyAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAvLyAgICAgKSxcbiAgICAgIC8vICAgKTtcbiAgICAgIC8vIH1cblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIFtvd25lci50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBBZGRpbmcgbmV3IHRva2VuIHRvIGV4aXN0aW5nIHRva2VuXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSAgdG9rZW5cbiAgICogQHBhcmFtIHtQdWJrZXl9ICBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldFtdfSAgb3duZXJPck11bHRpc2lnXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgdG90YWxBbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9ICBtaW50RGVjaW1hbFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKFxuICAgIHRva2VuOiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmU8UHVia2V5PiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgYXNzb2NpYXRlZCA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFzc29jaWF0ZWQudG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIENhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQodG90YWxBbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXNzb2NpYXRlZC5pbnN0ID8gW2Fzc29jaWF0ZWQuaW5zdCwgaW5zdF0gOiBbaW5zdF07XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbjxQdWJrZXk+KFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgdG9rZW4sXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgIi8vQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZUFtb3VudCA9IChcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICApOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBhbW91bnQgKiAxMCAqKiBtaW50RGVjaW1hbDtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQnVybk9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEJ1cm4gZXhpc3RpbmcgdG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9ICAgIG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9ICAgIG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0W119ICBvd25lck9yTXVsdGlzaWdcbiAgICogQHBhcmFtIHtudW1iZXJ9ICAgIGJ1cm5BbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9ICAgIHRva2VuRGVjaW1hbHNcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEJ1cm5PcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG93bmVyT3JNdWx0aXNpZzogU2VjcmV0W10sXG4gICAgYnVybkFtb3VudDogbnVtYmVyLFxuICAgIHRva2VuRGVjaW1hbHM6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEJ1cm5PcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUJ1cm5DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KGJ1cm5BbW91bnQsIHRva2VuRGVjaW1hbHMpLFxuICAgICAgICB0b2tlbkRlY2ltYWxzLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihbaW5zdF0sIGtleXBhaXJzLCBwYXllci50b0tleXBhaXIoKSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgc2xlZXAsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFBhcnNlZEFjY291bnREYXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBNQVhfUkVUUklFUyA9IDEwO1xuICBjb25zdCBSRVRSWV9ERUxBWSA9IDU7XG4gIGNvbnN0IE5GVFNUT1JBR0VfR0FURVdBWSA9ICduZnRzdG9yYWdlLmxpbmsnO1xuXG4gIGNvbnN0IGNvbnZlcnRlciA9IChcbiAgICBtZXRhZGF0YTogTWV0YWRhdGEsXG4gICAganNvbjogT2ZmY2hhaW4sXG4gICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgcmV0dXJuIENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9Vc2VyKFxuICAgICAge1xuICAgICAgICBvbmNoYWluOiBtZXRhZGF0YSxcbiAgICAgICAgb2ZmY2hhaW46IGpzb24sXG4gICAgICB9LFxuICAgICAgdG9rZW5BbW91bnQsXG4gICAgKTtcbiAgfTtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gIGNvbnN0IGZldGNoUmV0cnkgPSBhc3luYyAodXJsOiBzdHJpbmcsIHJldHJpZXMgPSAwKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwucmVwbGFjZSgnaXBmcy5pbycsIE5GVFNUT1JBR0VfR0FURVdBWSkpO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHJldHJpZXMgPCBNQVhfUkVUUklFUykge1xuICAgICAgICBkZWJ1Z0xvZyhgRXJyb3IgZmV0Y2hpbmcgZGF0YSBmcm9tICR7dXJsfSwgJHtyZXRyaWVzfSwgJHtlcnJvcn1gKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoUkVUUllfREVMQVkpO1xuICAgICAgICByZXR1cm4gZmV0Y2hSZXRyeSh1cmwsIHJldHJpZXMgKyAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnTG9nKGBNYXggcmV0cmllcyByZWFjaGVkICgke01BWF9SRVRSSUVTfSlgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UmVzdWx0PFRva2VuTWV0YWRhdGFbXXwgRXJyb3I+Pn1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhW10sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkVG9rZW5BY2NvdW50c0J5T3duZXIoXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkYXRhcyA9IGluZm8udmFsdWUubWFwKGFzeW5jIChkKSA9PiB7XG4gICAgICAgIGNvbnN0IG1pbnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby5taW50IGFzIFB1YmtleTtcbiAgICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby50b2tlbkFtb3VudFxuICAgICAgICAgIC5hbW91bnQgYXMgc3RyaW5nO1xuICAgICAgICBpZiAodG9rZW5BbW91bnQgPT09ICcxJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWV0YWRhdGEuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgICAgQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICAgIClcbiAgICAgICAgICAudGhlbihhc3luYyAobWV0YWRhdGEpID0+IHtcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgICAgICAgICAgIHJldHVybiBmZXRjaFJldHJ5KG1ldGFkYXRhLmRhdGEudXJpKS50aGVuKChqc29uOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRlcihtZXRhZGF0YSwganNvbiwgdG9rZW5BbW91bnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4gZGVidWdMb2coJyMgW0ZldGNoIGVycm9yXScsIGVycikpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZpbHRlcnMgPSAoYXdhaXQgUHJvbWlzZS5hbGwoZGF0YXMpKS5maWx0ZXIoXG4gICAgICAgIChkYXRhKSA9PiBkYXRhICE9PSB1bmRlZmluZWQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZpbHRlcnMgYXMgVG9rZW5NZXRhZGF0YVtdO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQpLFxuICAgICAgKTtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmRCeU1pbnQgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgIGlmIChtZXRhZGF0YS50b2tlblN0YW5kYXJkID09PSAwKSB7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIGBUaGlzIG1pbnQgaXMgbm90IFNQTC1UT0tFTiwgdG9rZW5TdGFuZGFyZDoke21ldGFkYXRhLnRva2VuU3RhbmRhcmR9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBjb25uZWN0aW9uLmdldFBhcnNlZEFjY291bnRJbmZvKG1pbnQudG9QdWJsaWNLZXkoKSk7XG4gICAgICBjb25zdCB0b2tlbkFtb3VudCA9IChpbmZvLnZhbHVlPy5kYXRhIGFzIFBhcnNlZEFjY291bnREYXRhKS5wYXJzZWQuaW5mb1xuICAgICAgICAuc3VwcGx5IGFzIHN0cmluZztcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSAoYXdhaXQgKFxuICAgICAgICBhd2FpdCBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICkuanNvbigpKSBhcyBPZmZjaGFpbjtcbiAgICAgIHJldHVybiBjb252ZXJ0ZXIobWV0YWRhdGEsIHJlc3BvbnNlLCB0b2tlbkFtb3VudCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgRnJlZXplT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogRnJlZXppbmcgYSB0YXJnZXQgbmZ0XG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+fSBvcHRpb25zIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiB7UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+fVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgR2FzTGVzc1RyYW5zZmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVHJhbnNmZXIgd2l0aG91dCBzb2xhbmEgc29sLCBkZWxlZ2F0ZSBmZWVwYXllciBmb3IgY29tbWlzc2lvblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWxcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNMZXNzVHJhbnNmZXJPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZ2FzTGVzc1RyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGZlZVBheWVyOiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxHYXNMZXNzVHJhbnNmZXJPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcbiAgICAgIGNvbnN0IHNvdXJjZVRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lclB1YmxpY0tleS50b1N0cmluZygpLFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgZGVzdCxcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcblxuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgIENhbGN1bGF0b3IuY2FsY3VsYXRlQW1vdW50KGFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpXSxcbiAgICAgICk7XG5cbiAgICAgIC8vIHJldHVybiBhc3NvY2lhdGVkIHRva2VuIGFjY291bnRcbiAgICAgIGlmICghZGVzdFRva2VuLmluc3QpIHtcbiAgICAgICAgdHguYWRkKGluc3QyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldHVybiBpbnN0cnVjdGlvbiBhbmQgdW5kZWNpZGVkIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgICB0eC5hZGQoZGVzdFRva2VuLmluc3QpLmFkZChpbnN0Mik7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgdHguaW5zdHJ1Y3Rpb25zLnVuc2hpZnQoXG4gICAgICAgICAgYXdhaXQgVHJhbnNhY3Rpb25CdWlsZGVyLlByaW9yaXR5RmVlLmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgdHguaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgb3B0aW9ucy5hZGRTb2xQcmlvcml0eUZlZSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0eC5pbnN0cnVjdGlvbnMudW5zaGlmdChcbiAgICAgICAgYXdhaXQgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgIHR4Lmluc3RydWN0aW9ucyxcbiAgICAgICAgICBvd25lci50b0tleXBhaXIoKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICB0eC5wYXJ0aWFsU2lnbihvd25lci50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKGhleCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBTeXN0ZW1Qcm9ncmFtLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQXV0aG9yaXR5VHlwZSxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCxcbiAgTUlOVF9TSVpFLFxuICBUT0tFTl9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24sXG4gIERhdGFWMixcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IElucHV0VG9rZW5NZXRhZGF0YSwgTWludE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICd+L3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3VpdGUtc3RvcmFnZSc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuXG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVGcmVlemVBdXRob3JpdHkgPSAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBjcmVhdGVTZXRBdXRob3JpdHlJbnN0cnVjdGlvbihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIEF1dGhvcml0eVR5cGUuRnJlZXplQWNjb3VudCxcbiAgICAgIGZyZWV6ZUF1dGhvcml0eSxcbiAgICApO1xuICB9O1xuXG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICB0b2tlbk1ldGFkYXRhOiBEYXRhVjIsXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgICBpc011dGFibGU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8VHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdPiA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhbXBvcnRzID0gYXdhaXQgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludChjb25uZWN0aW9uKTtcbiAgICBjb25zdCBtZXRhZGF0YVBkYSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFtdO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBTeXN0ZW1Qcm9ncmFtLmNyZWF0ZUFjY291bnQoe1xuICAgICAgICBmcm9tUHVia2V5OiBmZWVQYXllcixcbiAgICAgICAgbmV3QWNjb3VudFB1YmtleTogbWludCxcbiAgICAgICAgc3BhY2U6IE1JTlRfU0laRSxcbiAgICAgICAgbGFtcG9ydHM6IGxhbXBvcnRzLFxuICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBtaW50LFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIHRva2VuQXNzb2NpYXRlZCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIENhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQodG90YWxBbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGFQZGEsXG4gICAgICAgICAgbWludCxcbiAgICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZU1ldGFkYXRhQWNjb3VudEFyZ3NWMzoge1xuICAgICAgICAgICAgZGF0YTogdG9rZW5NZXRhZGF0YSxcbiAgICAgICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25EZXRhaWxzOiBudWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfTtcblxuICAvKipcbiAgICogU1BMLVRPS0VOIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyICAgICAgLy8gdG9rZW4gb3duZXIgU2VjcmV0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbEFtb3VudCAvLyB0b3RhbCBudW1iZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbnREZWNpbWFsIC8vIHRva2VuIGRlY2ltYWxcbiAgICogQHBhcmFtIHtJbnB1dFRva2VuTWV0YWRhdGF9IGlucHV0ICAgICAgIC8vIHRva2VuIG1ldGFkYXRhXG4gICAqIEBwYXJhbSB7UGFydGlhbDxNaW50T3B0aW9ucz59IG9wdGlvbnMgICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBpbnB1dDogSW5wdXRUb2tlbk1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXRUb2tlbk1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZmVlUGF5ZXIsIGZyZWV6ZUF1dGhvcml0eSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGlucHV0LnJveWFsdHkgPSAwO1xuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSAwO1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNLZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG5cbiAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCBhcyBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgICBpbnB1dC5yb3lhbHR5LFxuICAgICAgKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgeyBmZWVQYXllcjogcGF5ZXIgfSxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHsgZmVlUGF5ZXI6IHBheWVyIH0sXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc011dGFibGUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuVG9rZW5NZXRhZGF0YS5pbnRvSW5mcmEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cmkpO1xuXG4gICAgICBjb25zdCBtaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBjcmVhdGVNaW50KFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICB0b3RhbEFtb3VudCxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChmcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHMucHVzaChcbiAgICAgICAgICBjcmVhdGVGcmVlemVBdXRob3JpdHkoXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RzLFxuICAgICAgICBbb3duZXIudG9LZXlwYWlyKCksIG1pbnQudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgbWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQge1xuICBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgVGhhd09wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIFRoYXdpbmcgYSB0YXJnZXQgTkZUXG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8VGhhd09wdGlvbnM+fSBvcHRpb25zICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Jlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPn1cbiAgICovXG4gIGV4cG9ydCBjb25zdCB0aGF3ID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8VGhhd09wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ldyBBY2NvdW50LktleXBhaXIoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRvciB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVHJhbnNmZXIgTkZUIGZvciBvbmx5IG11bHRpU2lnIGFjY291bnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgICAvLyBtaW50ZWQgYWNjb3VudFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAgIC8vIGN1cnJlbnQgbXVsdGlzaWcgb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3QgICAgICAgICAgICAgICAvLyBuZXcgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gb3duZXJPck11bHRpc2lnICAvLyBvd25lciBvciBtdWx0aXNpZyBhY2NvdW50IFNlY3JldFxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50ICAgICAgICAgICAgIC8vIHdhbnQgdG8gdHJhbnNmZXIgU09MIGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWwgICAgICAgIC8vIG1pbnRlZCB0b2tlbiBkZWNpbWFsXG4gICAqIEBwYXJhbSB7UGFydGlhbDxNaW50T3B0aW9ucz59IG9wdGlvbnMgICAgICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPHVua25vd24+LCBFcnJvcj4gfVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgICBjb25zdCBwYXllclB1YmtleSA9IG5ldyBBY2NvdW50LktleXBhaXIoeyBzZWNyZXQ6IHBheWVyIH0pO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcbiAgICAgIGNvbnN0IHNvdXJjZVRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lci50b1N0cmluZygpLFxuICAgICAgICBwYXllclB1YmtleS5wdWJrZXksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIHBheWVyUHVia2V5LnB1YmtleSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZGVzdFRva2VuLmluc3QgPyBbZGVzdFRva2VuLmluc3QsIGluc3RdIDogW2luc3RdO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTcGxUb2tlbiBhcyBBZGQgfSBmcm9tICcuL2FkZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBCdXJuIH0gZnJvbSAnLi9idXJuJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZpbmQgfSBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRnJlZXplIH0gZnJvbSAnLi9mcmVlemUnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgR2FzTGVzcyB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUaGF3IH0gZnJvbSAnLi90aGF3JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5cbi8qKiBAbmFtZXNwYWNlICovXG5leHBvcnQgY29uc3QgU3BsVG9rZW4gPSB7XG4gIC4uLkFkZCxcbiAgLi4uQnVybixcbiAgLi4uRmluZCxcbiAgLi4uRnJlZXplLFxuICAuLi5HYXNMZXNzLFxuICAuLi5NaW50LFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBCdXJuT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICAvKipcbiAgICogQnVybiBleGlzdGluZyB0b2tlblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gIG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9ICBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldFtdfSAgb3duZXJPck11bHRpc2lnXG4gICAqIEBwYXJhbSB7UGFydGlhbDxCdXJuT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgYnVybiA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QnVybk9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgY29uc3QgZmVlUGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IG93bmVyT3JNdWx0aXNpZ1swXTtcbiAgICByZXR1cm4gU3BsVG9rZW4uYnVybihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIG93bmVyT3JNdWx0aXNpZyxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICB7XG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBEYXNBcGkgfSBmcm9tICd+L2Rhcy1hcGknO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1ldGFkYXRhLCBOZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvbmZ0JztcbmltcG9ydCB7IEZpbmRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9maW5kJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG93bmVyIGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBEYXNBcGkuZmluZEJ5T3duZXIob3duZXIsIGZhbHNlLCBvcHRpb25zKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbDxNZXRhZGF0YT4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IERhc0FwaS5maW5kQnlNaW50KG1pbnQsIGZhbHNlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgY29sbGVjdGlvbiBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBjb2xsZWN0aW9uTWludFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RmluZE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5Q29sbGVjdGlvbiA9IGFzeW5jIChcbiAgICBjb2xsZWN0aW9uTWludDogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBEYXNBcGkuZmluZEJ5Q29sbGVjdGlvbihjb2xsZWN0aW9uTWludCwgZmFsc2UsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5pbXBvcnQgeyBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGNyZWF0ZUZyZWV6ZURlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBGcmVlemVPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBGcmVlemluZyBhIHRhcmdldCBuZnRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZnJlZXplID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RnJlZXplT3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGVkaXRpb25BZGRyZXNzID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZURlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbih7XG4gICAgICAgIGRlbGVnYXRlOiBuZXcgQWNjb3VudC5LZXlwYWlyKHtcbiAgICAgICAgICBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSxcbiAgICAgICAgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG9rZW5BY2NvdW50OiB0b2tlbkFjY291bnQsXG4gICAgICAgIGVkaXRpb246IGVkaXRpb25BZGRyZXNzLFxuICAgICAgICBtaW50OiBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQXBwcm92ZUluc3RydWN0aW9uLFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQsXG4gIE1JTlRfU0laRSxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdWl0ZS1zdG9yYWdlJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEsIE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICd+L3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQ3JlYXRlTWFzdGVyRWRpdGlvblYzSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVNpZ25NZXRhZGF0YUluc3RydWN0aW9uLFxuICBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb25JdGVtSW5zdHJ1Y3Rpb24sXG4gIERhdGFWMixcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuXG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVWZXJpZnlDcmVhdG9yID0gKG1pbnQ6IFB1YmxpY0tleSwgY3JlYXRvcjogUHVibGljS2V5KSA9PiB7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50LnRvU3RyaW5nKCkpO1xuICAgIHJldHVybiBjcmVhdGVTaWduTWV0YWRhdGFJbnN0cnVjdGlvbih7XG4gICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXG4gICAgICBjcmVhdG9yOiBjcmVhdG9yLFxuICAgIH0pO1xuICB9O1xuXG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVEZWxlYWdhdGUgPSAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgZGVsZWdhdGVBdXRob3JpdHk6IFB1YmxpY0tleSxcbiAgKTogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiA9PiB7XG4gICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZUFwcHJvdmVJbnN0cnVjdGlvbihcbiAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgIGRlbGVnYXRlQXV0aG9yaXR5LFxuICAgICAgb3duZXIsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICk7XG4gIH07XG5cbiAgLy9AaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZVZlcmlmeVNpemVkQ29sbGVjdGlvbiA9IChcbiAgICBjb2xsZWN0aW9uQ2hpbGQ6IFB1YmxpY0tleSxcbiAgICBjb2xsZWN0aW9uUGFyZW50OiBQdWJsaWNLZXksXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKSA9PiB7XG4gICAgY29uc3QgY29sbGVjdGlvbk1ldGFkYXRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEoXG4gICAgICBjb2xsZWN0aW9uUGFyZW50LnRvU3RyaW5nKCksXG4gICAgKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uTWFzdGVyRWRpdGlvbkFjY291bnQgPSBBY2NvdW50LlBkYS5nZXRNYXN0ZXJFZGl0aW9uKFxuICAgICAgY29sbGVjdGlvblBhcmVudC50b1N0cmluZygpLFxuICAgICk7XG4gICAgcmV0dXJuIGNyZWF0ZVZlcmlmeVNpemVkQ29sbGVjdGlvbkl0ZW1JbnN0cnVjdGlvbih7XG4gICAgICBjb2xsZWN0aW9uOiBjb2xsZWN0aW9uTWV0YWRhdGEsXG4gICAgICBjb2xsZWN0aW9uTWFzdGVyRWRpdGlvbkFjY291bnQ6IGNvbGxlY3Rpb25NYXN0ZXJFZGl0aW9uQWNjb3VudCxcbiAgICAgIGNvbGxlY3Rpb25NaW50OiBjb2xsZWN0aW9uUGFyZW50LFxuICAgICAgbWV0YWRhdGE6IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKGNvbGxlY3Rpb25DaGlsZC50b1N0cmluZygpKSxcbiAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgIGNvbGxlY3Rpb25BdXRob3JpdHk6IGZlZVBheWVyLFxuICAgIH0pO1xuICB9O1xuXG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIG5mdE1ldGFkYXRhOiBEYXRhVjIsXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgICBpc011dGFibGU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8VHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdPiA9PiB7XG4gICAgY29uc3QgYXRhID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuICAgIGNvbnN0IHRva2VuTWV0YWRhdGFQdWJrZXkgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IG1hc3RlckVkaXRpb25QdWJrZXkgPSBBY2NvdW50LlBkYS5nZXRNYXN0ZXJFZGl0aW9uKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFtdO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBTeXN0ZW1Qcm9ncmFtLmNyZWF0ZUFjY291bnQoe1xuICAgICAgICBmcm9tUHVia2V5OiBmZWVQYXllcixcbiAgICAgICAgbmV3QWNjb3VudFB1YmtleTogbWludCxcbiAgICAgICAgbGFtcG9ydHM6IGF3YWl0IGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQoY29ubmVjdGlvbiksXG4gICAgICAgIHNwYWNlOiBNSU5UX1NJWkUsXG4gICAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uKG1pbnQsIDAsIG93bmVyLCBvd25lcikpO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oZmVlUGF5ZXIsIGF0YSwgb3duZXIsIG1pbnQpLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24obWludCwgYXRhLCBvd25lciwgMSwgMCkpO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgbWV0YWRhdGE6IHRva2VuTWV0YWRhdGFQdWJrZXksXG4gICAgICAgICAgbWludCxcbiAgICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZU1ldGFkYXRhQWNjb3VudEFyZ3NWMzoge1xuICAgICAgICAgICAgZGF0YTogbmZ0TWV0YWRhdGEsXG4gICAgICAgICAgICBpc011dGFibGUsXG4gICAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVDcmVhdGVNYXN0ZXJFZGl0aW9uVjNJbnN0cnVjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGVkaXRpb246IG1hc3RlckVkaXRpb25QdWJrZXksXG4gICAgICAgICAgbWludCxcbiAgICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICAgIG1pbnRBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgICBtZXRhZGF0YTogdG9rZW5NZXRhZGF0YVB1YmtleSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZU1hc3RlckVkaXRpb25BcmdzOiB7XG4gICAgICAgICAgICBtYXhTdXBwbHk6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb25zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgTkZUIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyICAgICAgICAgICAgLy8gb3duZXIncyBTZWNyZXRcbiAgICogQHBhcmFtIHtJbnB1dE5mdE1ldGFkYXRhfSBpbnB1dCAgLy8gbmZ0IG1ldGFkYXRhXG4gICAqIEBwYXJhbSB7UGFydGlhbDxNaW50T3B0aW9ucz59IG9wdGlvbnMgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRJbnN0cnVjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgZmVlUGF5ZXIsIGZyZWV6ZUF1dGhvcml0eSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IG93bmVyO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuXG4gICAgICAvLyBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudFxuICAgICAgbGV0IHByb3BlcnRpZXM7XG4gICAgICBpZiAoaW5wdXQucHJvcGVydGllcykge1xuICAgICAgICBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydGVyLlByb3BlcnRpZXMuaW50b0luZnJhKFxuICAgICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgICAgU3RvcmFnZS51cGxvYWRGaWxlLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHsgZmVlUGF5ZXI6IHBheWVyIH0sXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0ID0ge1xuICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByb3lhbHR5ID0gaW5wdXQucm95YWx0eSA/IGlucHV0LnJveWFsdHkgOiAwO1xuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSBDb252ZXJ0ZXIuUm95YWx0eS5pbnRvSW5mcmEocm95YWx0eSk7XG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgeyBmZWVQYXllcjogcGF5ZXIgfSxcbiAgICAgICAgKTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgICAvLyB1cGxvYWRlZCBmaWxlXG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHsgaW1hZ2U6IGlucHV0LnVyaSB9O1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkRGF0YShcbiAgICAgICAgICB7IC4uLnN0b3JhZ2VNZXRhZGF0YSwgLi4uaW1hZ2UgfSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICB7IGZlZVBheWVyOiBwYXllciB9LFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydGVyLlJlZ3VsYXJOZnRNZXRhZGF0YS5pbnRvSW5mcmEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBtaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhd2FpdCBjcmVhdGVNaW50KFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZURlbGVhZ2F0ZShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gY29sbGVjdGlvbiAtLS1cbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZVZlcmlmeVNpemVkQ29sbGVjdGlvbihcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGlucHV0LmNvbGxlY3Rpb24udG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXlwYWlycyA9IFtvd25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV07XG5cbiAgICAgIC8vIGNyZWF0b3IgLS0tXG4gICAgICBpZiAoaW5wdXQuY3JlYXRvcnMpIHtcbiAgICAgICAgaW5wdXQuY3JlYXRvcnMuZm9yRWFjaCgoY3JlYXRvcikgPT4ge1xuICAgICAgICAgIGlmIChBY2NvdW50LktleXBhaXIuaXNTZWNyZXQoY3JlYXRvci5zZWNyZXQpKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9yUHVia2V5ID0gY3JlYXRvci5hZGRyZXNzLnRvUHVibGljS2V5KCk7XG4gICAgICAgICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVmVyaWZ5Q3JlYXRvcihtaW50LnRvUHVibGljS2V5KCksIGNyZWF0b3JQdWJrZXkpO1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goaW5zdCk7XG4gICAgICAgICAgICBrZXlwYWlycy5wdXNoKGNyZWF0b3Iuc2VjcmV0LnRvS2V5cGFpcigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5NaW50KFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgbWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgR2FzTGVzc01pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N1aXRlLXN0b3JhZ2UnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvKipcbiAgICogTWludCB3aXRob3V0IHNvbGFuYSBzb2wsIGRlbGVnYXRlIGZlZXBheWVyIGZvciBjb21taXNzaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7VXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YX0gaW5wdXRcbiAgICoge1xuICAgKiAgIG5hbWU6IHN0cmluZyAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w6IHN0cmluZyAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGZpbGVQYXRoOiBzdHJpbmcgfCBGaWxlICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgcm95YWx0eTogbnVtYmVyICAgICAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgc3RvcmFnZVR5cGU6ICdhcndlYXZlJ3wnbmZ0U3RvcmFnZScgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqICAgY3JlYXRvcnM/OiBJbnB1dENyZWF0b3JzW10gICAgICAgICAgLy8gb3RoZXIgY3JlYXRvcnMgdGhhbiBvd25lclxuICAgKiAgIHVzZXM/OiBVc2VzICAgICAgICAgICAgICAgICAgIC8vIHVzYWdlIGZlYXR1cmU6IGJ1cm4sIHNpbmdsZSwgbXVsdGlwbGVcbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogfVxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXIgICAgICAgIC8vIGZlZSBwYXllclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8R2FzTGVzc01pbnRPcHRpb25zPn0gb3B0aW9ucyAgICAgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NNaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEdhc0xlc3NNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXROZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3Qgcm95YWx0eSA9IGlucHV0LnJveWFsdHkgPyBpbnB1dC5yb3lhbHR5IDogMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gQ29udmVydGVyLlJveWFsdHkuaW50b0luZnJhKHJveWFsdHkpO1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNrZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG5cbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuICAgICAgbGV0IHVyaSA9ICcnO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgICAgeyAuLi5pbnB1dCwgcHJvcGVydGllcyB9LFxuICAgICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICB1cmkgPSBpbnB1dC51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgbGV0IGRhdGF2MiA9IENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG4gICAgICBsZXQgY29sbGVjdGlvbjtcbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uICYmIGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbiA9IENvbnZlcnRlci5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKTtcbiAgICAgICAgZGF0YXYyID0geyAuLi5kYXRhdjIsIGNvbGxlY3Rpb24gfTtcbiAgICAgIH1cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IGlucHV0LmlzTXV0YWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlucHV0LmlzTXV0YWJsZTtcblxuICAgICAgZGVidWdMb2coJyMgaW5wdXQ6ICcsIGlucHV0KTtcbiAgICAgIGRlYnVnTG9nKCcjIHNlbGxlckZlZUJhc2lzUG9pbnRzOiAnLCBzZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IE1pbnQuY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY2tleSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChvcHRpb25zLmZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIE1pbnQuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXJQdWJsaWNrZXksXG4gICAgICAgICAgICBvcHRpb25zLmZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG5cbiAgICAgIGluc3RzLmZvckVhY2goKGluc3QpID0+IHR4LmFkZChpbnN0KSk7XG5cbiAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgdHguaW5zdHJ1Y3Rpb25zLnVuc2hpZnQoXG4gICAgICAgICAgYXdhaXQgVHJhbnNhY3Rpb25CdWlsZGVyLlByaW9yaXR5RmVlLmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgdHguaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgb3B0aW9ucy5hZGRTb2xQcmlvcml0eUZlZSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0eC5pbnN0cnVjdGlvbnMudW5zaGlmdChcbiAgICAgICAgYXdhaXQgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgIHR4Lmluc3RydWN0aW9ucyxcbiAgICAgICAgICBvd25lci50b0tleXBhaXIoKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICBbb3duZXIsIG1pbnRdLmZvckVhY2goKHNpZ25lcikgPT4gdHgucGFydGlhbFNpZ24oc2lnbmVyLnRvS2V5cGFpcigpKSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKGhleCwgbWludC5wdWJrZXkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHtcbiAgR2FzTGVzc1RyYW5zZmVyT3B0aW9ucyxcbiAgUGFydGlhbFNpZ25TdHJ1Y3R1cmUsXG59IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgLyoqXG4gICAqIFRyYW5zZmVyIHdpdGhvdXQgc29sYW5hIHNvbCwgZGVsZWdhdGUgZmVlcGF5ZXIgZm9yIGNvbW1pc3Npb25cbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0XG4gICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8R2FzTGVzc1RyYW5zZmVyT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEdhc0xlc3NUcmFuc2Zlck9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4uZ2FzTGVzc1RyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBmZWVQYXllcixcbiAgICAgIG9wdGlvbnMsXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVTZXRDb2xsZWN0aW9uU2l6ZUluc3RydWN0aW9uIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdWl0ZS1zdG9yYWdlJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IE1pbnRDb2xsZWN0aW9uT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbi8qKlxuICogY3JlYXRlIGEgY29sbGVjdGlvblxuICogVGhpcyBmdW5jdGlvbiBuZWVkcyBvbmx5IDEgY2FsbFxuICpcbiAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICogQHBhcmFtIHtJbnB1dE5mdE1ldGFkYXRhfSBpbnB1dFxuICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRDb2xsZWN0aW9uT3B0aW9ucz59IG9wdGlvbnNcbiAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PlxuICovXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBERUZBVUxUX0NPTExFQ1RJT05fU0laRSA9IDA7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuICBleHBvcnQgY29uc3QgbWludENvbGxlY3Rpb24gPSAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRDb2xsZWN0aW9uT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dE5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZnJlZXplQXV0aG9yaXR5LCBmZWVQYXllciwgY29sbGVjdGlvblNpemUgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG4gICAgICBsZXQgcHJvcGVydGllcztcbiAgICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgeyBmZWVQYXllcjogcGF5ZXIgfSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgfTtcbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuXG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShpbnB1dCwgMCk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHsgZmVlUGF5ZXI6IHBheWVyIH0sXG4gICAgICAgICk7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHsgZmVlUGF5ZXI6IHBheWVyIH0sXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShpbnB1dCwgdXJpLCAwKTtcblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBjb2xsZWN0aW9uTWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YUFjY291bnQgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShcbiAgICAgICAgY29sbGVjdGlvbk1pbnQucHVia2V5LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXdhaXQgTWludC5jcmVhdGVNaW50KFxuICAgICAgICBjb2xsZWN0aW9uTWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgICBNaW50LmNyZWF0ZURlbGVhZ2F0ZShcbiAgICAgICAgICAgIGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0ge1xuICAgICAgICBjb2xsZWN0aW9uTWV0YWRhdGE6IGNvbGxlY3Rpb25NZXRhZGF0YUFjY291bnQsXG4gICAgICAgIGNvbGxlY3Rpb25BdXRob3JpdHk6IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IGNvbGxlY3Rpb25NaW50LnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgIH07XG5cbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICBjcmVhdGVTZXRDb2xsZWN0aW9uU2l6ZUluc3RydWN0aW9uKGNvbGxlY3Rpb25zLCB7XG4gICAgICAgICAgc2V0Q29sbGVjdGlvblNpemVBcmdzOiB7XG4gICAgICAgICAgICBzaXplOiBjb2xsZWN0aW9uU2l6ZSB8fCBERUZBVUxUX0NPTExFQ1RJT05fU0laRSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpLCBjb2xsZWN0aW9uTWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBjb2xsZWN0aW9uTWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgVGhhd09wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtUaGF3T3B0aW9uc30gb3B0aW9ucyAgICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPHVua25vd24+LCBFcnJvcj4gfVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRoYXcgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxUaGF3T3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PENvbW1vblN0cnVjdHVyZTx1bmtub3duPiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGVkaXRpb25BZGRyZXNzID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24oe1xuICAgICAgICBkZWxlZ2F0ZTogbmV3IEFjY291bnQuS2V5cGFpcih7XG4gICAgICAgICAgc2VjcmV0OiBmcmVlemVBdXRob3JpdHksXG4gICAgICAgIH0pLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQWNjb3VudDogdG9rZW5BY2NvdW50LFxuICAgICAgICBlZGl0aW9uOiBlZGl0aW9uQWRkcmVzcyxcbiAgICAgICAgbWludDogbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNmZXJPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICAvKipcbiAgICogVHJhbnNmZXIgTkZUXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0ICAgICAgICAgICAgIC8vIG5ldyBvd25lclxuICAgKiBAcGFyYW0ge1RoYXdPcHRpb25zfSBvcHRpb25zICAgICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Jlc3VsdDxDb21tb25TdHJ1Y3R1cmU8dW5rbm93bj4sIEVycm9yPiB9XG4gICAqL1xuICBleHBvcnQgY29uc3QgdHJhbnNmZXIgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIG93bmVyT3JNdWx0aXNpZzogU2VjcmV0W10sXG4gICAgb3B0aW9uczogUGFydGlhbDxUcmFuc2Zlck9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFNwbFRva2VuLnRyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIG93bmVyT3JNdWx0aXNpZyxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBvcHRpb25zLFxuICAgICk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVndWxhck5mdCBhcyBCdXJuIH0gZnJvbSAnLi9idXJuJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEZyZWV6ZSB9IGZyb20gJy4vZnJlZXplJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgR2FzTGVzc01pbnQgfSBmcm9tICcuL2dhcy1sZXNzLW1pbnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBHYXNMZXNzVHJhbnNmZXIgfSBmcm9tICcuL2dhcy1sZXNzLXRyYW5zZmVyJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIE1pbnRDb2xsZWN0aW9uIH0gZnJvbSAnLi9taW50LWNvbGxlY3Rpb24nO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBUaGF3IH0gZnJvbSAnLi90aGF3JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmV4cG9ydCBjb25zdCBSZWd1bGFyTmZ0ID0ge1xuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkdhc0xlc3NNaW50LFxuICAuLi5HYXNMZXNzVHJhbnNmZXIsXG4gIC4uLk1pbnQsXG4gIC4uLk1pbnRDb2xsZWN0aW9uLFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCB9IGZyb20gJ34vc3VpdGUtcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTWludENvbGxlY3Rpb25PcHRpb25zIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuLyoqXG4gKiBjcmVhdGUgYSBjb2xsZWN0aW9uXG4gKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gKlxuICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gKiBAcGFyYW0ge01pbnRDb2xsZWN0aW9uT3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIGV4cG9ydCBjb25zdCBtaW50Q29sbGVjdGlvbiA9IChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludENvbGxlY3Rpb25PcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIFJlZ3VsYXJOZnQubWludENvbGxlY3Rpb24ob3duZXIsIGlucHV0LCB7XG4gICAgICBmZWVQYXllcixcbiAgICAgIGZyZWV6ZUF1dGhvcml0eSxcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBBTExfREVQVEhfU0laRV9QQUlSUyxcbiAgLy8gQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LFxuICBnZXRDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnRTaXplLFxuICBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICBTUExfTk9PUF9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC1hY2NvdW50LWNvbXByZXNzaW9uJztcbmltcG9ydCB7IFB1YmxpY0tleSwgU3lzdGVtUHJvZ3JhbSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBjcmVhdGVDcmVhdGVUcmVlSW5zdHJ1Y3Rpb24sXG4gIFBST0dSQU1fQUREUkVTUyBhcyBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb25zJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFNwYWNlTnVtYmVyLCBTcGFjZU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2NvbXByZXNzZWQtbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgZXhwb3J0IGNsYXNzIFNwYWNlIHtcbiAgICBzcGFjZU93bmVyOiBQdWJrZXk7XG4gICAgY29uc3RydWN0b3Ioc3BhY2VPd25lcjogUHVia2V5KSB7XG4gICAgICB0aGlzLnNwYWNlT3duZXIgPSBzcGFjZU93bmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogY3JlYXRlIGEgbmV3IG1hcmtsZSB0cmVlXG4gICAqIFRoaXMgZnVuY3Rpb24gbmVlZHMgb25seSAxIGNhbGxcbiAgICpcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhEZXB0aFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4QnVmZmVyU2l6ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gY2Fub3B5RGVwdGhcbiAgICogQHBhcmFtIHtQYXJ0aWFsPFNwYWNlT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50VHJhbnNhY3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBpbml0U3BhY2UgPSAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBtYXhEZXB0aDogbnVtYmVyLFxuICAgIG1heEJ1ZmZlclNpemU6IG51bWJlcixcbiAgICBjYW5vcHlEZXB0aDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8U3BhY2VPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGNvbnN0IHRyZWVPd25lciA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IHNwYWNlID0gZ2V0Q29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50U2l6ZShcbiAgICAgICAgbWF4RGVwdGgsXG4gICAgICAgIG1heEJ1ZmZlclNpemUsXG4gICAgICAgIGNhbm9weURlcHRoLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IFt0cmVlQXV0aG9yaXR5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbdHJlZU93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleS50b0J1ZmZlcigpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gW107XG5cbiAgICAgIGRlYnVnTG9nKGAjIG1heERlcHRoOiAke21heERlcHRofSwgbWF4QnVmZmVyU2l6ZTogJHttYXhCdWZmZXJTaXplfWApO1xuICAgICAgZGVidWdMb2coJyMgbmZ0IHNwYWNlOiAnLCBzcGFjZSk7XG5cbiAgICAgIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIHNwYWNlIGNvc3Q6ICcsIGF3YWl0IGNhbGN1bGF0ZVNwYWNlQ29zdChzcGFjZSkpO1xuICAgICAgfVxuXG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgICBmcm9tUHVia2V5OiBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgbmV3QWNjb3VudFB1YmtleTogdHJlZU93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICBsYW1wb3J0czpcbiAgICAgICAgICAgIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdGlvbihzcGFjZSksXG4gICAgICAgICAgc3BhY2U6IHNwYWNlLFxuICAgICAgICAgIHByb2dyYW1JZDogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgY3JlYXRlQ3JlYXRlVHJlZUluc3RydWN0aW9uKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1lcmtsZVRyZWU6IHRyZWVPd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgICB0cmVlQXV0aG9yaXR5LFxuICAgICAgICAgICAgdHJlZUNyZWF0b3I6IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICAgIHBheWVyOiBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgICBsb2dXcmFwcGVyOiBTUExfTk9PUF9QUk9HUkFNX0lELFxuICAgICAgICAgICAgY29tcHJlc3Npb25Qcm9ncmFtOiBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWF4QnVmZmVyU2l6ZSxcbiAgICAgICAgICAgIG1heERlcHRoLFxuICAgICAgICAgICAgcHVibGljOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgICApLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuTWludChcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBbdHJlZU93bmVyLnRvS2V5cGFpcigpLCBvd25lci50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICB0cmVlT3duZXIucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogY3JlYXRlIGEgbmV3IG5mdCBzcGFjZVxuICAgKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICAgKiBAcGFyYW0ge1NwYWNlTnVtYmVyfSBzcGFjZVNpemVcbiAgICogQHBhcmFtIHtQYXJ0aWFsPFNwYWNlT3B0aW9ucz59IG9wdGlvbnNcbiAgICpcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50VHJhbnNhY3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVTcGFjZSA9IGFzeW5jIChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIHNwYWNlU2l6ZTogU3BhY2VOdW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxTcGFjZU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIGNvbnN0IHsgbWF4RGVwdGgsIG1heEJ1ZmZlclNpemUsIGNhbm9weURlcHRoIH0gPVxuICAgICAgY2FsY3VsYXRlU3BhY2VOdW1iZXJUb0RlcHRoKHNwYWNlU2l6ZSk7XG4gICAgcmV0dXJuIGluaXRTcGFjZShvd25lciwgbWF4RGVwdGgsIG1heEJ1ZmZlclNpemUsIGNhbm9weURlcHRoLCBvcHRpb25zKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHNwYWNlIGNvc3RcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNwYWNlU2l6ZVxuICAgKiBAcmV0dXJuIFByb21pc2U8e3NvbDogbnVtYmVyfT5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVTcGFjZUNvc3QgPSBhc3luYyAoc3BhY2VTaXplOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB7IG1heERlcHRoLCBtYXhCdWZmZXJTaXplLCBjYW5vcHlEZXB0aCB9ID1cbiAgICAgIGNhbGN1bGF0ZVNwYWNlTnVtYmVyVG9EZXB0aChzcGFjZVNpemUpO1xuICAgIGNvbnN0IHJlcXVpcmVkU3BhY2UgPSBnZXRDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnRTaXplKFxuICAgICAgbWF4RGVwdGgsXG4gICAgICBtYXhCdWZmZXJTaXplLFxuICAgICAgY2Fub3B5RGVwdGgsXG4gICAgKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9XG4gICAgICBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRpb24oXG4gICAgICAgIHJlcXVpcmVkU3BhY2UsXG4gICAgICApO1xuICAgIHJldHVybiB7IHNvbDogbGFtcG9ydHMudG9Tb2woKSB9O1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICAvLy8gSW5pdGlhbGl6YXRpb24gcGFyYW1ldGVycyBmb3IgYW4gU1BMIENvbmN1cnJlbnRNZXJrbGVUcmVlLlxuICAvLy9cbiAgLy8vIE9ubHkgdGhlIGZvbGxvd2luZyBwZXJtdXRhdGlvbnMgYXJlIHZhbGlkOlxuICAvLy9cbiAgLy8vIHwgbWF4X2RlcHRoIHwgbWF4X2J1ZmZlcl9zaXplICAgICAgIHxcbiAgLy8vIHwgLS0tLS0tLS0tIHwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHxcbiAgLy8vIHwgMyAgICAgICAgIHwgKDgpICAgICAgICAgICAgICAgICAgIHwgbm9kZTogOFxuICAvLy8gfCAxNCAgICAgICAgfCAoNjQsIDI1NiwgMTAyNCwgMjA0OCkgfCBub2RlOiAxNiwzODRcbiAgLy8vIHwgMjAgICAgICAgIHwgKDY0LCAyNTYsIDEwMjQsIDIwNDgpIHwgbm9kZTogMSwwNDgsNTc2XG4gIC8vLyB8IDI0ICAgICAgICB8ICg2NCwgMjU2LCA1MTIsIDEwMjQsIDIwNDgpIHwgbm9kZTogMTYsNzc3LDIxNlxuICAvLy8gfCAyNiAgICAgICAgfCAoNjQsIDI1NiwgNTEyLCAxMDI0LCAyMDQ4KSB8IG5vZGU6IDY3LDEwOCw4NjRcbiAgLy8vIHwgMzAgICAgICAgIHwgKDUxMiwgMTAyNCwgMjA0OCkgfCBub2RlOiAxLDA3Myw3NDEsODI0XG4gIGNvbnN0IGNhbGN1bGF0ZVNwYWNlTnVtYmVyVG9EZXB0aCA9IChzcGFjZTogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbG9nMiA9IE1hdGguY2VpbChNYXRoLmxvZzIoc3BhY2UpKTtcbiAgICBkZWJ1Z0xvZygnIyBsb2cyOiAnLCBsb2cyLCAyICoqIGxvZzIpO1xuICAgIGNvbnN0IG1hdGNoZWQgPSBBTExfREVQVEhfU0laRV9QQUlSUy5maWx0ZXIoXG4gICAgICAocGFpcikgPT4gcGFpci5tYXhEZXB0aCA9PT0gbG9nMixcbiAgICApWzBdO1xuICAgIGNvbnN0IGNhbm9weURlcHRoID0gbWF0Y2hlZC5tYXhEZXB0aCAtIDU7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1heERlcHRoOiBtYXRjaGVkLm1heERlcHRoLFxuICAgICAgbWF4QnVmZmVyU2l6ZTogbWF0Y2hlZC5tYXhCdWZmZXJTaXplLFxuICAgICAgY2Fub3B5RGVwdGgsXG4gICAgfTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSx1QkFBQUE7QUFBQTtBQUFBOzs7QUNBQSxrQkFBb0M7QUFDcEMsa0JBQTZCO0FBRXRCLElBQUksU0FBUyxZQUFBQztBQUViLElBQVU7QUFBQSxDQUFWLENBQVVDLGVBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMscUJBQVY7QUFDRSxJQUFNQSxpQkFBQSxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPNUIsSUFBTUEsaUJBQUEsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBUlos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Q0FBQztBQUN2QyxhQUFTLFlBQVksTUFBTSxLQUFLLElBQUk7QUFDcEMsVUFBTSxVQUFVLHFEQUFxQjtBQUFBLE1BQ25DLENBQUMsU0FBUyxLQUFLLGFBQWE7QUFBQSxJQUM5QixFQUFFLENBQUM7QUFDSCxVQUFNLGNBQWMsUUFBUSxXQUFXO0FBQ3ZDLFdBQU87QUFBQSxNQUNMLFVBQVUsUUFBUTtBQUFBLE1BQ2xCLGVBQWUsUUFBUTtBQUFBLE1BQ3ZCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxHQXpKZUEsb0NBQUE7OztBcEVWVixJQUFNSSxpQkFBZ0I7QUFBQSxFQUMzQixHQUFHO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUNMOyIsCiAgIm5hbWVzIjogWyJDb21wcmVzc2VkTmZ0IiwgIlNvbGFuYUpzb25Db25maWciLCAiQ29uc3RhbnRzIiwgIldhcm5uaW5nTWVzc2FnZSIsICJDbHVzdGVyIiwgIkVuZFBvaW50VXJsIiwgIkJ1bmRsclVybCIsICJEYXNBcGlVcmwiLCAiTmZ0c3RvcmFnZUFwaUtleSIsICJjdXN0b21DbHVzdGVyVXJsIiwgImltcG9ydF93ZWIzIiwgIkFjY291bnQiLCAiQXNzb2NpYXRlZCIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiYnMiLCAiT3JpZ2luYWwiLCAiaW1wb3J0X3dlYjMiLCAiQWNjb3VudCIsICJQZGEiLCAiTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lEIiwgIkJOIiwgIkFjY291bnQiLCAiaW1wb3J0X2JzNTgiLCAiQWNjb3VudCIsICJicyIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tcHV0ZVVuaXQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlByaW9yaXR5RmVlIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZXN1bHQiLCAiaW1wb3J0X3dlYjMiLCAiTm9kZSIsICJEYXNBcGkiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29sbGVjdGlvbk1pbnQiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgImltcG9ydF9tcGxfYnViYmxlZ3VtX2luc3RydWN0aW9ucyIsICJDb252ZXJ0ZXIiLCAiQ29tcHJlc3NlZE5mdE1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJSb3lhbHR5IiwgIkNvbnZlcnRlciIsICJOZnQiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIlJlZ3VsYXJOZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUHJvcGVydGllcyIsICJDb252ZXJ0ZXIiLCAiVXNlcyIsICJDb252ZXJ0ZXIiLCAiVG9rZW5NZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXJDaGVja2VkIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlciIsICJDb252ZXJ0ZXIiLCAiRGFzQXBpIiwgIkNvbnZlcnRlciIsICJEYXNBcGkiLCAiaW1wb3J0X21wbF9idWJibGVndW1faW5zdHJ1Y3Rpb25zIiwgIkNvbXByZXNzZWROZnQiLCAiRGFzQXBpIiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfYWNjb3VudF9jb21wcmVzc2lvbiIsICJpbXBvcnRfYnM1OCIsICJDb21wcmVzc2VkTmZ0IiwgIkRhc0FwaSIsICJiczU4IiwgIkFjY291bnQiLCAiaW1wb3J0X3dlYjMiLCAiQ29tcHJlc3NlZE5mdCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X21wbF9idWJibGVndW1faW5zdHJ1Y3Rpb25zIiwgImltcG9ydF9zcGxfYWNjb3VudF9jb21wcmVzc2lvbiIsICJDb21wcmVzc2VkTmZ0IiwgIkRhc0FwaSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tcHJlc3NlZE5mdCIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJQcm92ZW5hbmNlTGF5ZXIiLCAidXBsb2FkRmlsZSIsICJJcnlzIiwgIkFyd2VhdmUiLCAiaW1wb3J0X25mdCIsICJOZnRTdG9yYWdlIiwgIlN0b3JhZ2UiLCAiU3RvcmFnZSIsICJWYWxpZGF0b3IiLCAiTWVzc2FnZSIsICJDb252ZXJ0ZXIiLCAiaW1wb3J0X21wbF9idWJibGVndW1faW5zdHJ1Y3Rpb25zIiwgImltcG9ydF9zcGxfYWNjb3VudF9jb21wcmVzc2lvbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIkNvbXByZXNzZWROZnQiLCAiRGFzQXBpIiwgIkFjY291bnQiLCAiQ29udmVydGVyIiwgIlN0b3JhZ2UiLCAiQlVCQkxFR1VNX1BST0dSQU1fSUQiLCAiVE9LRU5fTUVUQURBVEFfUFJPR1JBTV9JRCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiQ29udmVydGVyIiwgImZldGNoIiwgIkFjY291bnQiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF93ZWIzIiwgIlNwbFRva2VuIiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJTcGxUb2tlbiIsICJtaW50IiwgIkFjY291bnQiLCAiU3RvcmFnZSIsICJDb252ZXJ0ZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJTcGxUb2tlbiIsICJSZWd1bGFyTmZ0IiwgIlNwbFRva2VuIiwgIlJlZ3VsYXJOZnQiLCAiRGFzQXBpIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJSZWd1bGFyTmZ0IiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJSZWd1bGFyTmZ0IiwgIm1pbnQiLCAiQWNjb3VudCIsICJDb252ZXJ0ZXIiLCAiU3RvcmFnZSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiUmVndWxhck5mdCIsICJDb252ZXJ0ZXIiLCAiU3RvcmFnZSIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZWd1bGFyTmZ0IiwgIlNwbFRva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUmVndWxhck5mdCIsICJDb252ZXJ0ZXIiLCAiU3RvcmFnZSIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUmVndWxhck5mdCIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZWd1bGFyTmZ0IiwgIlNwbFRva2VuIiwgIlJlZ3VsYXJOZnQiLCAiQ29tcHJlc3NlZE5mdCIsICJSZWd1bGFyTmZ0IiwgImltcG9ydF9zcGxfYWNjb3VudF9jb21wcmVzc2lvbiIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfbXBsX2J1YmJsZWd1bV9pbnN0cnVjdGlvbnMiLCAiQ29tcHJlc3NlZE5mdCIsICJBY2NvdW50IiwgIk1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tcHJlc3NlZE5mdCJdCn0K