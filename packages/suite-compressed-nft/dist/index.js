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
  Account: () => Account4,
  CompressedNft: () => CompressedNft9,
  Explorer: () => Explorer,
  FilterOptions: () => FilterOptions,
  FilterType: () => FilterType,
  ModuleName: () => ModuleName,
  Node: () => Node,
  Try: () => Try,
  Validator: () => Validator,
  ValidatorError: () => ValidatorError,
  bufferToArray: () => bufferToArray,
  convertTimestampToDateTime: () => convertTimestampToDateTime,
  debugLog: () => debugLog,
  isBrowser: () => isBrowser,
  isNode: () => isNode,
  isPromise: () => isPromise,
  overwriteObject: () => overwriteObject,
  sleep: () => sleep,
  unixTimestamp: () => unixTimestamp
});
module.exports = __toCommonJS(src_exports);

// ../shared/src/constants.ts
var import_web3 = require("@solana/web3.js");
var import_load = __toESM(require("@solana-suite/config/load"));
var Config = import_load.default;
var Constants;
((Constants2) => {
  let WarnningMessage;
  ((WarnningMessage2) => {
    const THRESHHOLD = 7;
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
    Cluster2["test"] = "testnet";
    Cluster2["localhost"] = "localhost-devnet";
  })(Cluster = Constants2.Cluster || (Constants2.Cluster = {}));
  let EndPointUrl;
  ((EndPointUrl2) => {
    EndPointUrl2["prd"] = "https://api.mainnet-beta.solana.com";
    EndPointUrl2["prdMetaplex"] = "https://api.metaplex.solana.com";
    EndPointUrl2["dev"] = "https://api.devnet.solana.com";
    EndPointUrl2["test"] = "https://api.testnet.solana.com";
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
      case "testnet" /* test */:
        return "https://api.testnet.solana.com" /* test */;
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

// ../transaction-builder/src/batch.ts
var import_web33 = require("@solana/web3.js");

// ../transaction-builder/src/common.ts
var import_web32 = require("@solana/web3.js");
var MAX_RETRIES = 3;
var TransactionBuilder;
((TransactionBuilder7) => {
  class Common2 {
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
    submit = async () => {
      return Try(async () => {
        if (!(this instanceof Common2)) {
          throw Error("only Instruction object that can use this");
        }
        const transaction = new import_web32.Transaction();
        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;
        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }
        this.instructions.forEach((inst) => transaction.add(inst));
        const options = {
          maxRetries: MAX_RETRIES
        };
        return await (0, import_web32.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          options
        );
      });
    };
  }
  TransactionBuilder7.Common = Common2;
})(TransactionBuilder || (TransactionBuilder = {}));

// ../shared/src/shared.ts
var bufferToArray = (buffer) => {
  const nums = [];
  for (const byte of buffer) {
    nums.push(buffer[byte]);
  }
  return nums;
};
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
        (x) => Result2.ok(x),
        (err) => Result2.err(err)
      );
    } else {
      return Result2.ok(v);
    }
  } catch (e) {
    if (e instanceof Error) {
      return Result2.err(e);
    }
    return Result2.err(Error(e));
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

// ../transaction-builder/src/batch.ts
var TransactionBuilder2;
((TransactionBuilder7) => {
  class Batch {
    submit = async (arr) => {
      return Try(async () => {
        let i = 0;
        for (const a of arr) {
          if (!a.instructions && !a.signers) {
            throw Error(
              `only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(a)}`
            );
          }
          i++;
        }
        const instructions = arr.flatMap((a) => a.instructions);
        const signers = arr.flatMap((a) => a.signers);
        const feePayers = arr.filter((a) => a.feePayer !== void 0);
        let feePayer = signers[0];
        if (feePayers.length > 0 && feePayers[0].feePayer) {
          feePayer = feePayers[0].feePayer;
        }
        const transaction = new import_web33.Transaction();
        let finalSigners = signers;
        if (feePayer) {
          transaction.feePayer = feePayer.publicKey;
          finalSigners = [feePayer, ...signers];
        }
        instructions.map((inst) => transaction.add(inst));
        const options = {
          maxRetries: MAX_RETRIES
        };
        return await (0, import_web33.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          options
        );
      });
    };
  }
  TransactionBuilder7.Batch = Batch;
})(TransactionBuilder2 || (TransactionBuilder2 = {}));

// ../transaction-builder/src/mint.ts
var import_web34 = require("@solana/web3.js");
var TransactionBuilder3;
((TransactionBuilder7) => {
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
    submit = async () => {
      return Try(async () => {
        if (!(this instanceof Mint)) {
          throw Error("only MintInstruction object that can use this");
        }
        const transaction = new import_web34.Transaction();
        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;
        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }
        this.instructions.forEach((inst) => transaction.add(inst));
        const options = {
          maxRetries: MAX_RETRIES
        };
        if (Node.getConnection().rpcEndpoint === Constants.EndPointUrl.prd) {
          debugLog("# Change metaplex cluster on mainnet-beta");
          Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
        }
        return await (0, import_web34.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          options
        );
      });
    };
  }
  TransactionBuilder7.Mint = Mint;
})(TransactionBuilder3 || (TransactionBuilder3 = {}));

// ../transaction-builder/src/partial-sign.ts
var import_web35 = require("@solana/web3.js");
var TransactionBuilder4;
((TransactionBuilder7) => {
  class PartialSign {
    hexInstruction;
    data;
    canSubmit;
    constructor(instructions, mint, canSubmit = false) {
      this.hexInstruction = instructions;
      this.data = mint;
      this.canSubmit = canSubmit;
    }
    submit = async (feePayer) => {
      return Try(async () => {
        if (!(this instanceof PartialSign)) {
          throw Error("only PartialSignInstruction object that can use this");
        }
        const decode = Buffer.from(this.hexInstruction, "hex");
        const transactionFromJson = import_web35.Transaction.from(decode);
        transactionFromJson.partialSign(feePayer.toKeypair());
        const options = {
          maxRetries: MAX_RETRIES
        };
        const wireTransaction = transactionFromJson.serialize();
        return await Node.getConnection().sendRawTransaction(
          wireTransaction,
          options
        );
      });
    };
  }
  TransactionBuilder7.PartialSign = PartialSign;
})(TransactionBuilder4 || (TransactionBuilder4 = {}));

// ../transaction-builder/src/calculate-txsize.ts
var TransactionBuilder5;
((TransactionBuilder7) => {
  const LOW_VALUE = 127;
  const HIGH_VALUE = 16383;
  const MAX_TRANSACTION_SIZE = 1232;
  const compactHeader = (n) => n <= LOW_VALUE ? 1 : n <= HIGH_VALUE ? 2 : 3;
  const compactArraySize = (n, size) => compactHeader(n) + n * size;
  TransactionBuilder7.calculateTxSize = (transaction, feePayer) => {
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
  TransactionBuilder7.isOverTransactionSize = (transaction, feePayer) => {
    return (0, TransactionBuilder7.calculateTxSize)(transaction, feePayer) > MAX_TRANSACTION_SIZE;
  };
})(TransactionBuilder5 || (TransactionBuilder5 = {}));

// ../types/src/global/index.ts
var Explorer = /* @__PURE__ */ ((Explorer2) => {
  Explorer2["Solscan"] = "solscan";
  Explorer2["SolanaFM"] = "solanafm";
  Explorer2["Xray"] = "xray";
  return Explorer2;
})(Explorer || {});

// ../global/src/index.ts
var import_web38 = require("@solana/web3.js");

// ../account/src/associated.ts
var import_spl_token = require("@solana/spl-token");

// ../account/src/keypair.ts
var import_web36 = require("@solana/web3.js");
var import_bs58 = __toESM(require("bs58"));
var Account;
((Account5) => {
  class Keypair4 {
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
      return new import_web36.PublicKey(this.pubkey);
    }
    toKeypair() {
      const decoded = import_bs58.default.decode(this.secret);
      return import_web36.Keypair.fromSecretKey(decoded);
    }
    static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
    static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
    static create = () => {
      const keypair = import_web36.Keypair.generate();
      return new Keypair4({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair4({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
  }
  Account5.Keypair = Keypair4;
})(Account || (Account = {}));

// ../account/src/associated.ts
var Account2;
((Account5) => {
  let Associated;
  ((Associated2) => {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    const get = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
      const res = await (0, Associated2.makeOrCreateInstruction)(
        mint,
        owner,
        new Account.Keypair({ secret: feePayer }).pubkey,
        allowOwnerOffCurve
      );
      if (!res.inst) {
        return res.tokenAccount;
      }
      return new TransactionBuilder6.Common(
        [res.inst],
        [],
        feePayer.toKeypair(),
        res.tokenAccount
      );
    };
    Associated2.retryGetOrCreate = async (mint, owner, feePayer) => {
      let counter = 1;
      while (counter < RETRY_OVER_LIMIT) {
        try {
          const inst = await get(mint, owner, feePayer, true);
          if (inst && typeof inst === "string") {
            debugLog("# associatedTokenAccount: ", inst);
            return inst;
          } else if (inst instanceof TransactionBuilder6.Common) {
            (await inst.submit()).map(
              async (ok) => {
                await Node.confirmedSig(ok);
                return inst.data;
              },
              (err) => {
                debugLog("# Error submit retryGetOrCreate: ", err);
                throw err;
              }
            );
          }
        } catch (e) {
          debugLog(`# retry: ${counter} create token account: `, e);
          debugLog(`# mint: ${mint}, owner: ${owner}, feePayer: ${feePayer}`);
        }
        await sleep(RETRY_SLEEP_TIME);
        counter++;
      }
      throw Error(`retry action is over limit ${RETRY_OVER_LIMIT}`);
    };
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
})(Account2 || (Account2 = {}));

// ../account/src/pda.ts
var import_web37 = require("@solana/web3.js");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_mpl_bubblegum = require("@metaplex-foundation/mpl-bubblegum");
var import_bn = __toESM(require("bn.js"));
var Account3;
((Account5) => {
  let Pda;
  ((Pda2) => {
    Pda2.getMetadata = (address) => {
      const [publicKey] = import_web37.PublicKey.findProgramAddressSync(
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
      const [publicKey] = import_web37.PublicKey.findProgramAddressSync(
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
      const [publicKey] = import_web37.PublicKey.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = import_web37.PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getAssetId = (address, leafIndex) => {
      const node = new import_bn.default.BN(leafIndex);
      const [assetId] = import_web37.PublicKey.findProgramAddressSync(
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
  ...Account2,
  ...Account,
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
  } else if (endPointUrl === Constants.EndPointUrl.test) {
    cluster = Constants.Cluster.test;
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
  return new import_web38.PublicKey(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account4.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = import_bs582.default.decode(this.toString());
  return import_web38.Keypair.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return (0, import_bignumber.BigNumber)(this).div(import_web38.LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return (0, import_bignumber.BigNumber)(this).times(import_web38.LAMPORTS_PER_SOL).toNumber();
};

// ../transaction-builder/src/index.ts
var TransactionBuilder6 = {
  ...TransactionBuilder2,
  ...TransactionBuilder5,
  ...TransactionBuilder3,
  ...TransactionBuilder,
  ...TransactionBuilder4
};

// ../shared/src/result.ts
var AbstractResult = class {
  unwrap(ok, err) {
    const r = this._chain(
      (value) => Result2.ok(ok ? ok(value) : value),
      (error) => err ? Result2.ok(err(error)) : Result2.err(error)
    );
    if (r.isErr) {
      throw r.error;
    }
    return r.value;
  }
  map(ok, err) {
    return this._chain(
      (value) => Result2.ok(ok(value)),
      (error) => Result2.err(err ? err(error) : error)
    );
  }
  chain(ok, err) {
    return this._chain(ok, err || ((error) => Result2.err(error)));
  }
  match(ok, err) {
    this._chain(
      (value) => Result2.ok(ok(value)),
      (error) => Result2.err(err(error))
    );
  }
  /// single TransactionBuilder ////
  /* eslint-disable @typescript-eslint/no-explicit-any */
  async submit(feePayer) {
    const res = this.map(
      async (ok) => {
        debugLog("# result single submit: ", ok);
        if (feePayer) {
          const obj = ok;
          return await obj.submit(feePayer);
        } else {
          const obj = ok;
          return await obj.submit();
        }
      },
      (err) => {
        return err;
      }
    );
    if (res.isErr) {
      return Result2.err(res.error);
    }
    return res.value;
  }
};
Array.prototype.submit = async function(feePayer) {
  if (feePayer) {
    let i = 1;
    for await (const obj of this) {
      if (obj.isErr) {
        return obj;
      } else if (obj.value.canSubmit) {
        debugLog("# Result batch canSubmit");
        const sig = await obj.submit(feePayer);
        if (sig.isErr) {
          return sig;
        }
        await Node.confirmedSig(sig.value);
      } else {
        debugLog("# Result batch other than canSubmit");
        if (this.length == i) {
          return obj.submit(feePayer);
        }
        obj.submit(feePayer);
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
        return Result2.err(Error("Only Array Instruction object"));
      }
    }
    debugLog("# Result batch submit: ", instructions);
    return new TransactionBuilder6.Batch().submit(instructions);
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
var Result2;
((Result29) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result29.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result29.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result29.ok(resArr);
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
    return Result29.ok(res);
  }
  Result29.all = all;
})(Result2 || (Result2 = {}));

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

// ../converter/src/royalty.ts
var Converter3;
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
})(Converter3 || (Converter3 = {}));

// ../converter/src/compressed-nft-metadata.ts
var import_mpl_bubblegum_instruction = require("mpl-bubblegum-instruction");
var Converter4;
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
    CompressedNftMetadata2.intoUser = (output) => {
      return {
        mint: output.onchain.id.toString(),
        collectionMint: Converter.CollectionMint.intoUser(
          output.onchain.grouping
        ),
        authorities: output.onchain.authorities,
        royalty: Converter3.Royalty.intoUser(output.onchain.royalty.percent),
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
  })(CompressedNftMetadata = Converter15.CompressedNftMetadata || (Converter15.CompressedNftMetadata = {}));
})(Converter4 || (Converter4 = {}));

// ../converter/src/memo.ts
var Converter5;
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
})(Converter5 || (Converter5 = {}));

// ../converter/src/mint.ts
var Converter6;
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
})(Converter6 || (Converter6 = {}));

// ../converter/src/collection-details.ts
var Converter7;
((Converter15) => {
  let CollectionDetails;
  ((CollectionDetails2) => {
    CollectionDetails2.intoUser = (output) => {
      if (!output) {
        return void 0;
      }
      return {
        __kind: output.__kind,
        size: parseInt(output.size.toString(10))
      };
    };
  })(CollectionDetails = Converter15.CollectionDetails || (Converter15.CollectionDetails = {}));
})(Converter7 || (Converter7 = {}));

// ../converter/src/uses.ts
var Converter8;
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
})(Converter8 || (Converter8 = {}));

// ../converter/src/token-metadata.ts
var Converter9;
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
        uses: Converter8.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Converter15.TokenMetadata || (Converter15.TokenMetadata = {}));
})(Converter9 || (Converter9 = {}));

// ../converter/src/regular-nft-metadata.ts
var Converter10;
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
    RegularNftMetadata2.intoUser = (output) => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: Converter9.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: Converter9.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol
        ),
        uri: Converter9.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: Converter2.Creators.intoUser(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Converter.Collection.intoUser(output.onchain.collection),
        collectionDetails: Converter7.CollectionDetails.intoUser(
          output.onchain.collectionDetails
        ),
        uses: Converter8.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(RegularNftMetadata = Converter15.RegularNftMetadata || (Converter15.RegularNftMetadata = {}));
})(Converter10 || (Converter10 = {}));

// ../converter/src/properties.ts
var Converter11;
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
  ...Converter4,
  ...Converter,
  ...Converter2,
  ...Converter5,
  ...Converter6,
  ...Converter10,
  ...Converter11,
  ...Converter3,
  ...Converter9,
  ...Converter12,
  ...Converter13,
  ...Converter8
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

// ../types/src/transaction-filter/index.ts
var FilterType = /* @__PURE__ */ ((FilterType2) => {
  FilterType2["Memo"] = "memo";
  FilterType2["Mint"] = "mint";
  FilterType2["OnlyMemo"] = "only-memo";
  FilterType2["Transfer"] = "transfer";
  return FilterType2;
})(FilterType || {});
var ModuleName = /* @__PURE__ */ ((ModuleName2) => {
  ModuleName2["SolNative"] = "system";
  ModuleName2["SplToken"] = "spl-token";
  return ModuleName2;
})(ModuleName || {});
var FilterOptions = {
  Transfer: {
    program: ["system", "spl-token"],
    action: ["transfer", "transferChecked"]
  },
  Memo: {
    program: ["spl-memo"],
    action: ["*"]
  },
  Mint: {
    program: ["spl-token"],
    action: ["mintTo", "mintToChecked"]
  }
};

// ../node/src/index.ts
var import_web39 = require("@solana/web3.js");
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
    return new import_web39.Connection(setted.clusterUrl, setted.commitment);
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
    ).then(Result2.ok).catch(Result2.err);
  };
})(Node || (Node = {}));

// ../das-api/src/index.ts
var DasApi;
((DasApi2) => {
  const connect = async (method, params) => {
    Constants.WarnningMessage.calculateProbability() && console.warn(Constants.WarnningMessage.DAS_API_URL);
    debugLog("# das api url: ", Constants.DAS_API_URL);
    const response = await fetch(Constants.DAS_API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method,
        id: "compression",
        params
      })
    });
    return (await response.json()).result;
  };
  DasApi2.getAssetProof = async (assetId) => {
    return Try(async () => {
      return await connect("getAssetProof", [assetId]);
    });
  };
  DasApi2.getAsset = async (assetId) => {
    return Try(async () => {
      return await connect("getAsset", [assetId]);
    });
  };
  DasApi2.getAssetsByOwner = async (ownerAddress, limit = 1e3, page = 1, sortBy, before, after) => {
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
  DasApi2.getAssetsByGroup = async (groupKey, groupValue, limit = 1e3, page = 1, sortBy, before, after) => {
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
})(DasApi || (DasApi = {}));

// src/delegate.ts
var import_mpl_bubblegum_instruction2 = require("mpl-bubblegum-instruction");
var import_spl_account_compression = require("@solana/spl-account-compression");
var CompressedNft;
((CompressedNft10) => {
  CompressedNft10.createDeleagate = async (assetId, newDelegate) => {
    const rpcAssetProof = await DasApi.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi.getAsset(assetId.toString());
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
      return new TransactionBuilder6.Common([inst], [owner.toKeypair()]);
    });
  };
})(CompressedNft || (CompressedNft = {}));

// src/find.ts
var CompressedNft2;
((CompressedNft10) => {
  CompressedNft10.defaultSortBy = {
    sortBy: "recent_action" /* Recent */,
    sortDirection: "desc" /* Desc */
  };
  const fetchOffchain = async (uri) => {
    const json = await (await fetch(uri)).json();
    return json;
  };
  CompressedNft10.findByOwner = async (owner, options = {}) => {
    return Try(async () => {
      const defaultOptions = {
        limit: 1e3,
        page: 1,
        sortBy: CompressedNft10.defaultSortBy
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
        items.filter((item) => item.compression.compressed === true).map(async (item) => {
          try {
            const offchain = await fetchOffchain(
              item.content.json_uri
            );
            const merged = {
              onchain: item,
              offchain
            };
            return Converter14.CompressedNftMetadata.intoUser(merged);
          } catch (err) {
            debugLog("# Failed fetch offchain url: ", item.content.json_uri);
            return Converter14.CompressedNftMetadata.intoUser({
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
    });
  };
  CompressedNft10.findByMint = async (mint) => {
    return Try(async () => {
      const asset = await DasApi.getAsset(mint);
      if (asset.isErr) {
        throw asset.error;
      }
      const offchain = await fetchOffchain(
        asset.value.content.json_uri
      );
      const merged = {
        onchain: asset.value,
        offchain
      };
      return Converter14.CompressedNftMetadata.intoUser(merged);
    });
  };
  CompressedNft10.findByCollection = async (collectionMint, options = {}) => {
    return Try(async () => {
      const defaultOptions = {
        limit: 1e3,
        page: 1,
        sortBy: CompressedNft10.defaultSortBy
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
        items.filter((item) => item.compression.compressed === true).map(async (item) => {
          const offchain = await fetchOffchain(
            item.content.json_uri
          );
          const merged = {
            onchain: item,
            offchain
          };
          return Converter14.CompressedNftMetadata.intoUser(merged);
        })
      );
      return {
        page: assets.value.page,
        total: assets.value.total,
        limit: assets.value.limit,
        metadatas
      };
    });
  };
})(CompressedNft2 || (CompressedNft2 = {}));

// src/gas-less-delegate.ts
var import_web310 = require("@solana/web3.js");
var CompressedNft3;
((CompressedNft10) => {
  CompressedNft10.gasLessDelegate = async (mint, owner, newDelegate) => {
    return Try(async () => {
      const inst = await CompressedNft.createDeleagate(
        mint.toPublicKey(),
        newDelegate.toPublicKey()
      );
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web310.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: newDelegate.toPublicKey()
      });
      tx.add(inst);
      tx.partialSign(owner.toKeypair());
      tx.recentBlockhash = blockhashObj.blockhash;
      return new TransactionBuilder6.PartialSign(
        tx.serialize({
          requireAllSignatures: false
        }).toString("hex")
      );
    });
  };
})(CompressedNft3 || (CompressedNft3 = {}));

// src/gas-less-transfer.ts
var import_web311 = require("@solana/web3.js");

// src/transfer.ts
var import_mpl_bubblegum_instruction3 = require("mpl-bubblegum-instruction");
var import_spl_account_compression2 = require("@solana/spl-account-compression");
var CompressedNft4;
((CompressedNft10) => {
  CompressedNft10.createTransfer = async (assetId, assetIdOwner, dest, delegate) => {
    const assetProof = await DasApi.getAssetProof(assetId);
    if (assetProof.isErr) {
      throw assetProof.error;
    } else if (assetProof.isOk && assetProof.value.proof.length === 0) {
      throw Error("Proof is empty. May be set Regular NFT?");
    }
    const asset = await DasApi.getAsset(assetId);
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
      return new TransactionBuilder6.Common([inst], keypairs);
    });
  };
})(CompressedNft4 || (CompressedNft4 = {}));

// src/gas-less-transfer.ts
var CompressedNft5;
((CompressedNft10) => {
  CompressedNft10.gasLessTransfer = async (mint, owner, dest, feePayer) => {
    const delegate = await CompressedNft3.gasLessDelegate(mint, owner, feePayer);
    delegate.unwrap().canSubmit = true;
    const transfer = await Try(async () => {
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const inst = new import_web311.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      inst.add(
        await CompressedNft4.createTransfer(
          mint,
          new Account4.Keypair({ secret: owner }).pubkey,
          dest,
          feePayer
        )
      );
      inst.recentBlockhash = blockhashObj.blockhash;
      return new TransactionBuilder6.PartialSign(
        inst.serialize({
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
var import_nft = require("nft.storage");
var NftStorage;
((NftStorage2) => {
  const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
  const connect = () => {
    Constants.WarnningMessage.calculateProbability() && console.warn(Constants.WarnningMessage.NFT_STORAGE_API_KEY);
    return new import_nft.NFTStorage({ token: Constants.NFT_STORAGE_API_KEY });
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
      const blobImage = new import_nft.Blob([file]);
      const res = await connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    });
  };
  NftStorage2.uploadData = async (storageData) => {
    return Try(async () => {
      debugLog("# upload metadata: ", storageData);
      const blobJson = new import_nft.Blob([JSON.stringify(storageData)]);
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

// src/space.ts
var import_spl_account_compression3 = require("@solana/spl-account-compression");
var import_mpl_bubblegum2 = require("@metaplex-foundation/mpl-bubblegum");
var import_web312 = require("@solana/web3.js");
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
      const [treeAuthority] = import_web312.PublicKey.findProgramAddressSync(
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
        import_web312.SystemProgram.createAccount({
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
      return new TransactionBuilder6.Mint(
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
    const rpcAssetProof = await DasApi.getAssetProof(assetId.toString());
    const rpcAsset = await DasApi.getAsset(assetId.toString());
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
      return new TransactionBuilder6.Mint(
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
      const tokenAssociated = await Account4.Associated.retryGetOrCreate(
        token,
        owner,
        payer
      );
      const inst = (0, import_spl_token2.createMintToCheckedInstruction)(
        token.toPublicKey(),
        tokenAssociated.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        keypairs
      );
      return new TransactionBuilder6.Common(
        [inst],
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
      return new TransactionBuilder6.Common([inst], keypairs, payer.toKeypair());
    });
  };
})(SplToken3 || (SplToken3 = {}));

// ../suite-spl-token/src/find.ts
var import_mpl_token_metadata3 = require("@metaplex-foundation/mpl-token-metadata");
var import_spl_token4 = require("@solana/spl-token");
var import_cross_fetch = __toESM(require("cross-fetch"));
var SplToken4;
((SplToken11) => {
  const UNABLE_ERROR_REGEX = /Unable to find Metadata account/;
  const sortByUinixTimestamp = (sortable) => (a, b) => {
    if (!a.offchain.created_at) {
      a.offchain.created_at = 0;
    }
    if (!b.offchain.created_at) {
      b.offchain.created_at = 0;
    }
    if (sortable === "desc" /* Desc */) {
      return b.offchain.created_at - a.offchain.created_at;
    } else if (sortable === "asc" /* Asc */) {
      return a.offchain.created_at - b.offchain.created_at;
    } else {
      return b.offchain.created_at - a.offchain.created_at;
    }
  };
  const converter = (tokenStandard, metadata, json, tokenAmount) => {
    if (tokenStandard === import_mpl_token_metadata3.TokenStandard.Fungible) {
      return Converter14.TokenMetadata.intoUser(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else if (tokenStandard === import_mpl_token_metadata3.TokenStandard.NonFungible) {
      return Converter14.RegularNftMetadata.intoUser({
        onchain: metadata,
        offchain: json
      });
    } else {
      throw Error(`No match tokenStandard: ${tokenStandard}`);
    }
  };
  SplToken11.genericFindByOwner = async (owner, callback, tokenStandard, sortable, isHolder) => {
    try {
      let data = [];
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: import_spl_token4.TOKEN_PROGRAM_ID
        }
      );
      info.value.length === 0 && callback(Result2.ok([]));
      for await (const d of info.value) {
        if (isHolder && d.account.data.parsed.info.tokenAmount.uiAmount < 1) {
          debugLog(
            "# findByOwner no hold metadata: ",
            d.account.data.parsed.info
          );
          continue;
        }
        const mint = d.account.data.parsed.info.mint;
        const tokenAmount = d.account.data.parsed.info.tokenAmount.amount;
        try {
          const metadata = await import_mpl_token_metadata3.Metadata.fromAccountAddress(
            connection,
            Account4.Pda.getMetadata(mint)
          );
          debugLog("# findByOwner metadata: ", metadata);
          if (metadata.tokenStandard !== tokenStandard) {
            continue;
          }
          (0, import_cross_fetch.default)(metadata.data.uri).then((response) => {
            response.json().then((json) => {
              data.push(
                converter(tokenStandard, metadata, json, tokenAmount)
              );
              callback(Result2.ok(data));
            }).catch((e) => {
              callback(Result2.err(e));
            }).finally(() => {
              const descAlgo = sortByUinixTimestamp("desc" /* Desc */);
              const ascAlgo = sortByUinixTimestamp("asc" /* Asc */);
              if (sortable === "desc" /* Desc */) {
                data = data.sort(descAlgo);
              } else if (sortable === "asc" /* Asc */) {
                data = data.sort(ascAlgo);
              }
              callback(Result2.ok(data));
            });
          }).catch((e) => {
            callback(Result2.err(e));
          });
        } catch (e) {
          if (e instanceof Error && UNABLE_ERROR_REGEX.test(e.message)) {
            debugLog("# skip error for old SPL-TOKEN: ", mint);
            continue;
          }
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result2.err(e));
      }
    }
  };
  SplToken11.genericFindByMint = async (mint, tokenStandard) => {
    try {
      const connection = Node.getConnection();
      const metadata = await import_mpl_token_metadata3.Metadata.fromAccountAddress(
        connection,
        Account4.Pda.getMetadata(mint)
      );
      debugLog("# findByMint metadata: ", metadata);
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error("token standards are different");
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data).parsed.info.supply;
      const response = await (await (0, import_cross_fetch.default)(metadata.data.uri)).json();
      return Result2.ok(
        converter(tokenStandard, metadata, response, tokenAmount)
      );
    } catch (e) {
      return Result2.err(e);
    }
  };
  SplToken11.findByOwner = (owner, onOk, onErr, options) => {
    const sortable = !options?.sortDirection ? "desc" /* Desc */ : options?.sortDirection;
    const isHolder = !options?.isHolder ? true : false;
    (0, SplToken11.genericFindByOwner)(
      owner,
      (result) => {
        result.match((ok) => onOk(ok), onErr);
      },
      import_mpl_token_metadata3.TokenStandard.Fungible,
      sortable,
      isHolder
    );
  };
  SplToken11.findByMint = async (mint) => {
    return await (0, SplToken11.genericFindByMint)(mint, import_mpl_token_metadata3.TokenStandard.Fungible);
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
      return new TransactionBuilder6.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// ../suite-spl-token/src/gas-less-transfer.ts
var import_spl_token6 = require("@solana/spl-token");
var import_web313 = require("@solana/web3.js");
var SplToken6;
((SplToken11) => {
  SplToken11.gasLessTransfer = async (mint, owner, dest, amount, mintDecimal, feePayer) => {
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
      let inst2;
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web313.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      if (!destToken.inst) {
        inst2 = (0, import_spl_token6.createTransferCheckedInstruction)(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          ownerPublicKey,
          SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          [owner.toKeypair()]
        );
        tx.add(inst2);
      } else {
        inst2 = (0, import_spl_token6.createTransferCheckedInstruction)(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          ownerPublicKey,
          SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          [owner.toKeypair()]
        );
        tx.add(destToken.inst).add(inst2);
      }
      tx.recentBlockhash = blockhashObj.blockhash;
      tx.partialSign(owner.toKeypair());
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new TransactionBuilder6.PartialSign(hex);
    });
  };
})(SplToken6 || (SplToken6 = {}));

// ../suite-spl-token/src/mint.ts
var import_web314 = require("@solana/web3.js");
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
      import_web314.SystemProgram.createAccount({
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
      return new TransactionBuilder6.Mint(
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
      return new TransactionBuilder6.Common(
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
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const sourceToken = await Account4.Associated.retryGetOrCreate(
        mint,
        owner,
        payer
      );
      const destToken = await Account4.Associated.retryGetOrCreate(
        mint,
        dest,
        payer
      );
      const inst = (0, import_spl_token9.createTransferCheckedInstruction)(
        sourceToken.toPublicKey(),
        mint.toPublicKey(),
        destToken.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(amount, mintDecimal),
        mintDecimal,
        keypairs
      );
      return new TransactionBuilder6.Common([inst], keypairs, payer.toKeypair());
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
var import_mpl_token_metadata5 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft2;
((RegularNft11) => {
  RegularNft11.findByOwner = async (owner, onOk, onErr, options) => {
    const sortable = !options?.sortable ? "desc" /* Desc */ : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    await SplToken10.genericFindByOwner(
      owner,
      (result) => result.match(onOk, onErr),
      import_mpl_token_metadata5.TokenStandard.NonFungible,
      sortable,
      isHolder
    );
  };
  RegularNft11.findByMint = async (mint) => {
    return await SplToken10.genericFindByMint(mint, import_mpl_token_metadata5.TokenStandard.NonFungible);
  };
})(RegularNft2 || (RegularNft2 = {}));

// ../suite-regular-nft/src/freeze.ts
var import_spl_token10 = require("@solana/spl-token");
var import_mpl_token_metadata6 = require("@metaplex-foundation/mpl-token-metadata");
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
      const inst = (0, import_mpl_token_metadata6.createFreezeDelegatedAccountInstruction)({
        delegate: new Account4.Keypair({
          secret: freezeAuthority
        }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new TransactionBuilder6.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(RegularNft3 || (RegularNft3 = {}));

// ../suite-regular-nft/src/mint.ts
var import_web315 = require("@solana/web3.js");
var import_spl_token11 = require("@solana/spl-token");
var import_mpl_token_metadata7 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft4;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  RegularNft11.createVerifyCreator = (mint2, creator) => {
    const metadata = Account4.Pda.getMetadata(mint2.toString());
    return (0, import_mpl_token_metadata7.createSignMetadataInstruction)({
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
    return (0, import_mpl_token_metadata7.createVerifySizedCollectionItemInstruction)({
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
      import_web315.SystemProgram.createAccount({
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
      (0, import_mpl_token_metadata7.createCreateMetadataAccountV3Instruction)(
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
      (0, import_mpl_token_metadata7.createCreateMasterEditionV3Instruction)(
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
      return new TransactionBuilder6.Mint(
        instructions,
        keypairs,
        payer.toKeypair(),
        mint2.pubkey
      );
    });
  };
})(RegularNft4 || (RegularNft4 = {}));

// ../suite-regular-nft/src/gas-less-mint.ts
var import_web316 = require("@solana/web3.js");
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
      const tx = new import_web316.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      insts.forEach((inst) => tx.add(inst));
      tx.recentBlockhash = blockhashObj.blockhash;
      [owner, mint].forEach((signer) => tx.partialSign(signer.toKeypair()));
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new TransactionBuilder6.PartialSign(hex, mint.pubkey);
    });
  };
})(RegularNft5 || (RegularNft5 = {}));

// ../suite-regular-nft/src/gas-less-transfer.ts
var RegularNft6;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  RegularNft11.gasLessTransfer = async (mint, owner, dest, feePayer) => {
    return SplToken10.gasLessTransfer(
      mint,
      owner,
      dest,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };
})(RegularNft6 || (RegularNft6 = {}));

// ../suite-regular-nft/src/mint-collection.ts
var import_mpl_token_metadata8 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft7;
((RegularNft11) => {
  RegularNft11.DEFAULT_COLLECTION_SIZE = 0;
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
        (0, import_mpl_token_metadata8.createSetCollectionSizeInstruction)(collections, {
          setCollectionSizeArgs: {
            size: collectionSize || RegularNft11.DEFAULT_COLLECTION_SIZE
          }
        })
      );
      return new TransactionBuilder6.Mint(
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
var import_mpl_token_metadata9 = require("@metaplex-foundation/mpl-token-metadata");
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
      const inst = (0, import_mpl_token_metadata9.createThawDelegatedAccountInstruction)({
        delegate: new Account4.Keypair({
          secret: freezeAuthority
        }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new TransactionBuilder6.Common(
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
  Account,
  CompressedNft,
  Explorer,
  FilterOptions,
  FilterType,
  ModuleName,
  Node,
  Try,
  Validator,
  ValidatorError,
  bufferToArray,
  convertTimestampToDateTime,
  debugLog,
  isBrowser,
  isNode,
  isPromise,
  overwriteObject,
  sleep,
  unixTimestamp
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvY29uc3RhbnRzLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2JhdGNoLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbW1vbi50cyIsICIuLi8uLi9zaGFyZWQvc3JjL3NoYXJlZC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3BhcnRpYWwtc2lnbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9jYWxjdWxhdGUtdHhzaXplLnRzIiwgIi4uLy4uL3R5cGVzL3NyYy9nbG9iYWwvaW5kZXgudHMiLCAiLi4vLi4vZ2xvYmFsL3NyYy9pbmRleC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9hc3NvY2lhdGVkLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2tleXBhaXIudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvcGRhLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvcmVzdWx0LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29sbGVjdGlvbi50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NyZWF0b3JzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcm95YWx0eS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbXByZXNzZWQtbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbWVtby50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jb2xsZWN0aW9uLWRldGFpbHMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy91c2VzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdG9rZW4tbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yZWd1bGFyLW5mdC1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Byb3BlcnRpZXMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci1jaGVja2VkLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi92YWxpZGF0b3Ivc3JjL2luZGV4LnRzIiwgIi4uLy4uL3R5cGVzL3NyYy90cmFuc2FjdGlvbi1maWx0ZXIvaW5kZXgudHMiLCAiLi4vLi4vbm9kZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vZGFzLWFwaS9zcmMvaW5kZXgudHMiLCAiLi4vc3JjL2RlbGVnYXRlLnRzIiwgIi4uL3NyYy9maW5kLnRzIiwgIi4uL3NyYy9nYXMtbGVzcy1kZWxlZ2F0ZS50cyIsICIuLi9zcmMvZ2FzLWxlc3MtdHJhbnNmZXIudHMiLCAiLi4vc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL3Byb3ZlbmFuY2UtbGF5ZXIudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvYXJ3ZWF2ZS50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9uZnQtc3RvcmFnZS50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9zdG9yYWdlLnRzIiwgIi4uL3NyYy9zcGFjZS50cyIsICIuLi9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2FkZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2NhbGN1bGF0ZS1hbW91bnQudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZmluZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2ZyZWV6ZS50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9maW5kLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9mcmVlemUudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL21pbnQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2dhcy1sZXNzLW1pbnQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9taW50LWNvbGxlY3Rpb24udHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXJlZ3VsYXItbmZ0L3NyYy9pbmRleC50cyIsICIuLi9zcmMvbWludC1jb2xsZWN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBpbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIENyZWF0b3IgfSBmcm9tICcuL2NyZWF0b3InO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBEZWxlZ2F0ZSB9IGZyb20gJy4vZGVsZWdhdGUnO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgR2FzTGVzc0RlbGVnYXRlIH0gZnJvbSAnLi9nYXMtbGVzcy1kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBDb21wcmVzc2VkTmZ0IGFzIEdhc0xlc3NUcmFuc2ZlciB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vbWludC1jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgU3BhY2UgfSBmcm9tICcuL3NwYWNlJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuaW1wb3J0ICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0ICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0ICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgY29uc3QgQ29tcHJlc3NlZE5mdCA9IHtcbiAgLy8gLi4uQ3JlYXRvcixcbiAgLi4uRGVsZWdhdGUsXG4gIC4uLkZpbmQsXG4gIC4uLkdhc0xlc3NEZWxlZ2F0ZSxcbiAgLi4uR2FzTGVzc1RyYW5zZmVyLFxuICAuLi5NaW50LFxuICAuLi5TcGFjZSxcbiAgLi4uQ29sbGVjdGlvbixcbiAgLi4uVHJhbnNmZXIsXG59O1xuZXhwb3J0ICogZnJvbSAnfi9zaGFyZWQvZXhwb3J0cyc7XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBTb2xhbmFKc29uQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnO1xuXG5sZXQgQ29uZmlnID0gU29sYW5hSnNvbkNvbmZpZztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgbmFtZXNwYWNlIFdhcm5uaW5nTWVzc2FnZSB7XG4gICAgY29uc3QgVEhSRVNISE9MRCA9IDc7XG4gICAgbGV0IGlzRGlzcGxheSA9IGZhbHNlO1xuICAgIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBuZnRTdG9yYWdlQXBpS2V5IGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIENhbiBnZXQgYXBpIGtleSBmcm9tIGh0dHBzOi8vbmZ0LnN0b3JhZ2UvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGA7XG4gICAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBkYXNBcGlVcmwgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGkgdXJsIGZyb20gaHR0cHM6Ly93d3cuaGVsaXVzLmRldi9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG4gICAgICAgIGA7XG5cbiAgICBleHBvcnQgY29uc3QgY2FsY3VsYXRlUHJvYmFiaWxpdHkgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCBwcm9iYWJpbGl0eSA9IDEgLyBUSFJFU0hIT0xEO1xuICAgICAgaWYgKCFpc0Rpc3BsYXkgJiYgcmFuZG9tVmFsdWUgPCBwcm9iYWJpbGl0eSkge1xuICAgICAgICBpc0Rpc3BsYXkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IGNvbnN0IGN1cnJlbnRDbHVzdGVyID0gQ29uZmlnLmNsdXN0ZXIudHlwZTtcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbUNsdXN0ZXJVcmwgPSBDb25maWcuY2x1c3Rlci5jdXN0b21DbHVzdGVyVXJsO1xuICBleHBvcnQgY29uc3QgaXNEZWJ1Z2dpbmcgPSBDb25maWcuZGVidWdnaW5nO1xuICBleHBvcnQgY29uc3QgbmZ0U3RvcmFnZUFwaUtleSA9IENvbmZpZy5uZnRTdG9yYWdlQXBpS2V5O1xuICBleHBvcnQgY29uc3QgZGFzQXBpVXJsID0gQ29uZmlnLmRhc0FwaVVybDtcblxuICBleHBvcnQgZW51bSBDbHVzdGVyIHtcbiAgICBwcmQgPSAnbWFpbm5ldC1iZXRhJyxcbiAgICBwcmRNZXRhcGxleCA9ICdtYWlubmV0LWJldGEtbWV0YXBsZXgnLFxuICAgIGRldiA9ICdkZXZuZXQnLFxuICAgIHRlc3QgPSAndGVzdG5ldCcsXG4gICAgbG9jYWxob3N0ID0gJ2xvY2FsaG9zdC1kZXZuZXQnLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRW5kUG9pbnRVcmwge1xuICAgIHByZCA9ICdodHRwczovL2FwaS5tYWlubmV0LWJldGEuc29sYW5hLmNvbScsXG4gICAgcHJkTWV0YXBsZXggPSAnaHR0cHM6Ly9hcGkubWV0YXBsZXguc29sYW5hLmNvbScsXG4gICAgZGV2ID0gJ2h0dHBzOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgICB0ZXN0ID0gJ2h0dHBzOi8vYXBpLnRlc3RuZXQuc29sYW5hLmNvbScsXG4gICAgbG9jYWxob3N0ID0gJ2h0dHA6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gQnVuZGxyVXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9ub2RlMS5pcnlzLnh5eixodHRwczovL25vZGUyLmlyeXMueHl6JyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaXJ5cy54eXonLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRGFzQXBpVXJsIHtcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaGVsaXVzLXJwYy5jb20vP2FwaS1rZXk9MTUzMTliZjQtNWI0MC00OTU4LWFjOGQtNjMxM2FhNTVlYjkyLGh0dHBzOi8vcnBjLWRldm5ldC5oZWxpdXMueHl6P2FwaS1rZXk9OWY3MGE4NDMtMzI3NC00ZmZkLWEwYTktMzIzZjhiN2MwNjM5JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIE5mdHN0b3JhZ2VBcGlLZXkge1xuICAgIGRldiA9ICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUprYVdRNlpYUm9jam93ZUVSR01qY3lOMlZrT0RaaFJHVTFSVE15WkRaRFpFSmxPRGMwWXpSRk5EbEVPRFkxT1dabU9FTWlMQ0pwYzNNaU9pSnVablF0YzNSdmNtRm5aU0lzSW1saGRDSTZNVFl5TURJMk5EazBNemN3Tml3aWJtRnRaU0k2SW1SbGJXOGlmUS5kNEo3MG1pa3hSQjhhNXZ3TnU2U081SERBOEphdWV1c2VBajdRX3l0TUNFJyxcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBsb2FkQ29uZmlnID0gYXN5bmMgKCkgPT4ge1xuICAgIENvbmZpZyA9IGF3YWl0IGltcG9ydCgnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCcpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hDbHVzdGVyID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHsgY2x1c3RlcjogZW52LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcblxuICAgIC8vIGlmIHNldHRlZCBjdXN0b20gdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwgJiYgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21DbHVzdGVyVXJsW2luZGV4XTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkO1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmRNZXRhcGxleDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5sb2NhbGhvc3Q7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hCdW5kbHIgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5CdW5kbHJVcmwuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoRGFzQXBpID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgaWYgKGRhc0FwaVVybC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5EQVNfQVBJX1VSTCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuRGFzQXBpVXJsLmRldi5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoTmZ0U3RvcmFnZSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICBpZiAoIW5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihXYXJubmluZ01lc3NhZ2UuTkZUX1NUT1JBR0VfQVBJX0tFWSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5mdFN0b3JhZ2VBcGlLZXk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuTmZ0c3RvcmFnZUFwaUtleS5kZXY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBXUkFQUEVEX1RPS0VOX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdTbzExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEyJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FTU9fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ01lbW8xVWhrSlJmSHl2TE1jVnVjSnd4WGV1RDcyOEVxVkREd1FEeEZNTm8nLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVUQVBMRVhfUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ21ldGFxYnh4VWVyZHEyOGNqMVJiQVdrWVFtM3liempiNmE4YnQ1MTh4MXMnLFxuICApO1xuICBleHBvcnQgY29uc3QgQ09NTUlUTUVOVDogQ29tbWl0bWVudCA9ICdjb25maXJtZWQnO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9pcGZzLmlvL2lwZnMnO1xuICBleHBvcnQgY29uc3QgSVJZU19HQVRFV0FZX1VSTCA9ICdodHRwczovL2dhdGV3YXkuaXJ5cy54eXonO1xuICBleHBvcnQgY29uc3QgQlVORExSX05FVFdPUktfVVJMID0gc3dpdGNoQnVuZGxyKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgREFTX0FQSV9VUkwgPSBzd2l0Y2hEYXNBcGkoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gc3dpdGNoTmZ0U3RvcmFnZShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTFNDQU5fVVJMID0gJ2h0dHBzOi8vc29sc2Nhbi5pbyc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xBTkFGTV9VUkwgPSAnaHR0cHM6Ly9zb2xhbmEuZm0nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfWFJBWV9VUkwgPSAnaHR0cHM6Ly94cmF5LmhlbGl1cy54eXonO1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMsIFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21tb24gfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcnkgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3JjL3NoYXJlZCc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3JjL3Jlc3VsdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIEJhdGNoIHtcbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBhcnI6IENvbW1vbi5Db21tb25bXSB8IE1pbnQuTWludFtdLFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgYSBvZiBhcnIpIHtcbiAgICAgICAgICBpZiAoIWEuaW5zdHJ1Y3Rpb25zICYmICFhLnNpZ25lcnMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBgb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIGJhdGNoU3VibWl0KCkuXG4gICAgICAgICAgICBJbmRleDogJHtpfSwgU2V0IHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KGEpfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhcnIuZmxhdE1hcCgoYSkgPT4gYS5pbnN0cnVjdGlvbnMpO1xuICAgICAgICBjb25zdCBzaWduZXJzID0gYXJyLmZsYXRNYXAoKGEpID0+IGEuc2lnbmVycyk7XG4gICAgICAgIGNvbnN0IGZlZVBheWVycyA9IGFyci5maWx0ZXIoKGEpID0+IGEuZmVlUGF5ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIGxldCBmZWVQYXllciA9IHNpZ25lcnNbMF07XG4gICAgICAgIGlmIChmZWVQYXllcnMubGVuZ3RoID4gMCAmJiBmZWVQYXllcnNbMF0uZmVlUGF5ZXIpIHtcbiAgICAgICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgICBpZiAoZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IGZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgICAgICB9XG4gICAgICAgIGluc3RydWN0aW9ucy5tYXAoKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlVHhzaXplLmlzTWF4VHJhbnNhY3Rpb25TaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllci5wdWJsaWNLZXkpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBDb21tb248VCA9IHVuZGVmaW5lZD4gaW1wbGVtZW50cyBDb21tb25TdHJ1Y3R1cmU8VD4ge1xuICAgIHN0YXRpYyBNQVhfVFJBTlNBQ1RJT05fU0laRSA9IDEyMzI7XG5cbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI/OiBLZXlwYWlyO1xuICAgIGRhdGE/OiBUO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICAgIGZlZVBheWVyPzogS2V5cGFpcixcbiAgICAgIGRhdGE/OiBULFxuICAgICkge1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICBzdWJtaXQgPSBhc3luYyAoKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21tb24pKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcblxuICAgICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IHRoaXMuZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBbnlPYmplY3QgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogY29udmVydCBidWZmZXIgdG8gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gKiBAcmV0dXJucyBudW1iZXJbXVxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9BcnJheSA9IChidWZmZXI6IEJ1ZmZlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgbnVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGJ5dGUgb2YgYnVmZmVyKSB7XG4gICAgbnVtcy5wdXNoKGJ1ZmZlcltieXRlXSk7XG4gIH1cbiAgcmV0dXJuIG51bXM7XG59O1xuXG4vKipcbiAqIE92ZXJ3cml0ZSBKUyBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9iamVjdFxuICogQHBhcmFtIHtPdmVyd3JpdGVPYmplY3RbXX0gdGFyZ2V0c1xuICogQHJldHVybnMgT2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGVPYmplY3QgPSAoXG4gIG9iamVjdDogdW5rbm93bixcbiAgdGFyZ2V0czoge1xuICAgIGV4aXN0c0tleTogc3RyaW5nO1xuICAgIHdpbGw6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiB1bmtub3duIH07XG4gIH1bXSxcbik6IHVua25vd24gPT4ge1xuICBjb25zdCB0aGF0OiBBbnlPYmplY3QgPSBvYmplY3QgYXMgQW55T2JqZWN0O1xuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGRlbGV0ZSB0aGF0W3RhcmdldC5leGlzdHNLZXldO1xuICAgIHRoYXRbdGFyZ2V0LndpbGwua2V5XSA9IHRhcmdldC53aWxsLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXkgbG9nIGZvciBzb2xhbmEtc3VpdGUtY29uZmlnLmpzXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMVxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhM1xuICogQHBhcmFtIHt1bmtub3dufSBkYXRhNFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAoXG4gIGRhdGExOiB1bmtub3duLFxuICBkYXRhMjogdW5rbm93biA9ICcnLFxuICBkYXRhMzogdW5rbm93biA9ICcnLFxuICBkYXRhNDogdW5rbm93biA9ICcnLFxuKTogdm9pZCA9PiB7XG4gIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgY29uc29sZS5sb2coJ1tERUJVR10nLCBkYXRhMSwgZGF0YTIsIGRhdGEzLCBkYXRhNCk7XG4gIH1cbn07XG5cbi8qKlxuICogc2xlZXAgdGltZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjXG4gKiBAcmV0dXJucyBQcm9taXNlPG51bWJlcj5cbiAqL1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gYXN5bmMgKHNlYzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIHNlYyAqIDEwMDApKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbFxuICApO1xufTtcblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgcmV0dXJuIChcbiAgICAhIW9iaiAmJlxuICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgIHR5cGVvZiAob2JqIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufTtcblxuLyoqXG4gKiBUcnkgYXN5bmMgbW9uYWRcbiAqXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxULCBFPj5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBhc3luY2Jsb2NrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZXN1bHQ8VCwgRT4+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KGJsb2NrOiAoKSA9PiBUKTogUmVzdWx0PFQsIEU+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBpbnB1dDogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFJlc3VsdDxULCBFcnJvcj4gfCBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gaW5wdXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHYpKSB7XG4gICAgICByZXR1cm4gdi50aGVuKFxuICAgICAgICAoeDogVCkgPT4gUmVzdWx0Lm9rKHgpLFxuICAgICAgICAoZXJyOiBFKSA9PiBSZXN1bHQuZXJyKGVyciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHYpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlIGFzIHN0cmluZykpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChmaW5hbGx5SW5wdXQpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmFsbHkgaW5wdXQ6JywgZmluYWxseUlucHV0KTtcbiAgICAgIGZpbmFsbHlJbnB1dCgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcnx1bmRlZmluZWR9IGNyZWF0ZWRfYXRcbiAqIEByZXR1cm5zIERhdGUgfCB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lID0gKFxuICBjcmVhdGVkX2F0OiBudW1iZXIgfCB1bmRlZmluZWQsXG4pOiBEYXRlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGNyZWF0ZWRfYXQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoY3JlYXRlZF9hdCAqIDEwMDApO1xuICB9XG4gIHJldHVybjtcbn07XG5cbi8qKlxuICogR2V0IHVuaXggdGltZXN0YW1wXG4gKlxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCB1bml4VGltZXN0YW1wID0gKCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgTWludDxUID0gUHVia2V5PiBpbXBsZW1lbnRzIE1pbnRTdHJ1Y3R1cmU8VD4ge1xuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICAgIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgICBmZWVQYXllcjogS2V5cGFpcjtcbiAgICBkYXRhOiBUO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICAgIGZlZVBheWVyOiBLZXlwYWlyLFxuICAgICAgZGF0YTogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWludCkpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBNaW50SW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50ID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgICAgICAgZGVidWdMb2coJyMgQ2hhbmdlIG1ldGFwbGV4IGNsdXN0ZXIgb24gbWFpbm5ldC1iZXRhJyk7XG4gICAgICAgICAgTm9kZS5jaGFuZ2VDb25uZWN0aW9uKHsgY2x1c3RlcjogQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXggfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIFBhcnRpYWxTaWduIGltcGxlbWVudHMgUGFydGlhbFNpZ25TdHJ1Y3R1cmUge1xuICAgIGhleEluc3RydWN0aW9uOiBzdHJpbmc7XG4gICAgZGF0YT86IFB1YmtleTtcbiAgICBjYW5TdWJtaXQ/OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIG1pbnQ/OiBQdWJrZXksIGNhblN1Ym1pdCA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5kYXRhID0gbWludDtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gY2FuU3VibWl0O1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJ0aWFsU2lnbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBQYXJ0aWFsU2lnbkluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVjb2RlID0gQnVmZmVyLmZyb20odGhpcy5oZXhJbnN0cnVjdGlvbiwgJ2hleCcpO1xuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbkZyb21Kc29uID0gVHJhbnNhY3Rpb24uZnJvbShkZWNvZGUpO1xuICAgICAgICB0cmFuc2FjdGlvbkZyb21Kc29uLnBhcnRpYWxTaWduKGZlZVBheWVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb25Gcm9tSnNvbi5zZXJpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXksIFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuLy8gQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGNvbnN0IExPV19WQUxVRSA9IDEyNzsgLy8gMHg3ZlxuICBjb25zdCBISUdIX1ZBTFVFID0gMTYzODM7IC8vIDB4M2ZmZlxuICBjb25zdCBNQVhfVFJBTlNBQ1RJT05fU0laRSA9IDEyMzI7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IGhlYWRlciBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXkgaGVhZGVyXG4gICAqL1xuICBjb25zdCBjb21wYWN0SGVhZGVyID0gKG46IG51bWJlcikgPT5cbiAgICBuIDw9IExPV19WQUxVRSA/IDEgOiBuIDw9IEhJR0hfVkFMVUUgPyAyIDogMztcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcGFyYW0gc2l6ZSBieXRlcyBwZXIgZWFjaCBlbGVtZW50XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXlcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RBcnJheVNpemUgPSAobjogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+XG4gICAgY29tcGFjdEhlYWRlcihuKSArIG4gKiBzaXplO1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdHhzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlVHhTaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyUGsgPSBbZmVlUGF5ZXIudG9CYXNlNTgoKV07XG5cbiAgICBjb25zdCBzaWduZXJzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuICAgIGNvbnN0IGFjY291bnRzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuXG4gICAgY29uc3QgaXhzU2l6ZSA9IHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaXgpID0+IHtcbiAgICAgIGl4LmtleXMuZm9yRWFjaCgoeyBwdWJrZXksIGlzU2lnbmVyIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGsgPSBwdWJrZXkudG9CYXNlNTgoKTtcbiAgICAgICAgaWYgKGlzU2lnbmVyKSBzaWduZXJzLmFkZChwayk7XG4gICAgICAgIGFjY291bnRzLmFkZChwayk7XG4gICAgICB9KTtcblxuICAgICAgYWNjb3VudHMuYWRkKGl4LnByb2dyYW1JZC50b0Jhc2U1OCgpKTtcblxuICAgICAgY29uc3QgbkluZGV4ZXMgPSBpeC5rZXlzLmxlbmd0aDtcbiAgICAgIGNvbnN0IG9wYXF1ZURhdGEgPSBpeC5kYXRhLmxlbmd0aDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgYWNjICtcbiAgICAgICAgMSArIC8vIFBJRCBpbmRleFxuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG5JbmRleGVzLCAxKSArXG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUob3BhcXVlRGF0YSwgMSlcbiAgICAgICk7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgY29tcGFjdEFycmF5U2l6ZShzaWduZXJzLnNpemUsIDY0KSArIC8vIHNpZ25hdHVyZXNcbiAgICAgIDMgKyAvLyBoZWFkZXJcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoYWNjb3VudHMuc2l6ZSwgMzIpICsgLy8gYWNjb3VudHNcbiAgICAgIDMyICsgLy8gYmxvY2toYXNoXG4gICAgICBjb21wYWN0SGVhZGVyKHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5sZW5ndGgpICsgLy8gaW5zdHJ1Y3Rpb25zXG4gICAgICBpeHNTaXplXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgbWF4IHRyYW5zYWN0aW9uIHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBpc092ZXJUcmFuc2FjdGlvblNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBjYWxjdWxhdGVUeFNpemUodHJhbnNhY3Rpb24sIGZlZVBheWVyKSA+IE1BWF9UUkFOU0FDVElPTl9TSVpFO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXIsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBTdHJpbmcge1xuICAgIHRvUHVibGljS2V5KCk6IFB1YmxpY0tleTtcbiAgICB0b0tleXBhaXIoKTogS2V5cGFpcjtcbiAgICB0b0V4cGxvcmVyVXJsKGV4cGxvcmVyPzogRXhwbG9yZXIsIG9wdGlvbnM/OiBFeHBsb3Jlck9wdGlvbnMpOiBzdHJpbmc7XG4gIH1cbiAgaW50ZXJmYWNlIE51bWJlciB7XG4gICAgdG9Tb2woKTogbnVtYmVyO1xuICAgIHRvTGFtcG9ydHMoKTogbnVtYmVyO1xuICB9XG5cbiAgaW50ZXJmYWNlIENvbnNvbGUge1xuICAgIGRlYnVnKGRhdGE6IHVua25vd24sIGRhdGEyPzogdW5rbm93biwgZGF0YTM/OiB1bmtub3duKTogdm9pZDtcbiAgfVxuXG4gIGludGVyZmFjZSBTZWNyZXQge1xuICAgIHRvS2V5cGFpcigpOiBLZXlwYWlyO1xuICB9XG5cbiAgaW50ZXJmYWNlIFB1YmtleSB7XG4gICAgdG9QdWJsaWNLZXkoKTogUHVibGljS2V5O1xuICB9XG59XG5cbmV4cG9ydCBlbnVtIEV4cGxvcmVyIHtcbiAgU29sc2NhbiA9ICdzb2xzY2FuJyxcbiAgU29sYW5hRk0gPSAnc29sYW5hZm0nLFxuICBYcmF5ID0gJ3hyYXknLFxufVxuXG5leHBvcnQgdHlwZSBFeHBsb3Jlck9wdGlvbnMgPSB7XG4gIHJlcGxhY2VQYXRoOiBzdHJpbmc7XG59O1xuIiwgImltcG9ydCB7IEtleXBhaXIsIExBTVBPUlRTX1BFUl9TT0wsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IEJpZ051bWJlciB9IGZyb20gJ2JpZ251bWJlci5qcyc7XG5pbXBvcnQgeyBFeHBsb3JlciwgRXhwbG9yZXJPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9nbG9iYWwnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG4vKipcbiAqIENyZWF0ZSBleHBsb3JlciB1cmwgZm9yIGFjY291bnQgYWRkcmVzcyBvciBzaWduYXR1cmVcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0V4cGxvcmVyVXJsID0gZnVuY3Rpb24gKFxuICBleHBsb3JlcjogRXhwbG9yZXIgPSBFeHBsb3Jlci5Tb2xzY2FuLFxuICBvcHRpb25zOiBQYXJ0aWFsPEV4cGxvcmVyT3B0aW9ucz4gPSB7fSxcbikge1xuICBjb25zdCBlbmRQb2ludFVybCA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50O1xuICBkZWJ1Z0xvZygnIyB0b0V4cGxvcmVyVXJsIHJwY0VuZHBvaW50OicsIGVuZFBvaW50VXJsKTtcbiAgbGV0IGNsdXN0ZXIgPSAnJztcbiAgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLnByZDtcbiAgfSBlbHNlIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnRlc3QpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDtcbiAgfSBlbHNlIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldikge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH0gZWxzZSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfVxuXG4gIGNvbnN0IGFkZHJlc3NPclNpZ25hdHVyZTogc3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICBsZXQgdXJsID0gJyc7XG5cbiAgaWYgKG9wdGlvbnMucmVwbGFjZVBhdGgpIHtcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgaWYgKEFjY291bnQuS2V5cGFpci5pc1B1YmtleShhZGRyZXNzT3JTaWduYXR1cmUpKSB7XG4gICAgLy8gYWRkcmVzc1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L2FkZHJlc3MvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHNpZ25hdHVyZVxuICAgIC8vIGZvciBJbnZhbGlkIHR5cGUgXCJuZXZlclwiIG9mIGFkZHJlc3NPclNpZ25hdHVyZSwgc28gYGFzIHN0cmluZ2BcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXJsO1xufTtcblxuLyoqXG4gKiBQdWJLZXkoQHNvbGFuYS1zdWl0ZSkgdG8gUHVibGljS2V5KEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBQdWJsaWNLZXlcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b1B1YmxpY0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNQdWJrZXkodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlB1YktleTogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy50b1N0cmluZygpKTtcbn07XG5cbi8qKlxuICogU2VjcmV0KEBzb2xhbmEtc3VpdGUpIHRvIEtleXBhaXIoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIEtleXBhaXJcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0tleXBhaXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzU2VjcmV0KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5TZWNyZXQ6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy50b1N0cmluZygpKTtcbiAgcmV0dXJuIEtleXBhaXIuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbn07XG5cbi8qKlxuICogTEFNUE9SVFMgdG8gU09MXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9Tb2wgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC50aW1lcyhMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGRlYnVnTG9nLCBzbGVlcCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBY2NvdW50LFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcixcbiAgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcblxuLyoqXG4gKiBHZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAqXG4gKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsb3dPd25lck9mZkN1cnZlXG4gKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPlxuICovXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIEFzc29jaWF0ZWQge1xuICAgIGNvbnN0IFJFVFJZX09WRVJfTElNSVQgPSAxMDtcbiAgICBjb25zdCBSRVRSWV9TTEVFUF9USU1FID0gMztcbiAgICAvL0BpbnRlcm5hbFxuICAgIGNvbnN0IGdldCA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgICAgYWxsb3dPd25lck9mZkN1cnZlID0gZmFsc2UsXG4gICAgKTogUHJvbWlzZTxzdHJpbmcgfCBDb21tb25TdHJ1Y3R1cmU8UHVia2V5Pj4gPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBuZXcgS2V5cGFpci5LZXlwYWlyKHsgc2VjcmV0OiBmZWVQYXllciB9KS5wdWJrZXksXG4gICAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgICk7XG5cbiAgICAgIGlmICghcmVzLmluc3QpIHtcbiAgICAgICAgcmV0dXJuIHJlcy50b2tlbkFjY291bnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbjxQdWJrZXk+KFxuICAgICAgICBbcmVzLmluc3RdLFxuICAgICAgICBbXSxcbiAgICAgICAgZmVlUGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIHJlcy50b2tlbkFjY291bnQhLFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0cnkgZnVuY3Rpb24gaWYgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgICAqXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICAgKi9cbiAgICBleHBvcnQgY29uc3QgcmV0cnlHZXRPckNyZWF0ZSA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgICk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICBsZXQgY291bnRlciA9IDE7XG4gICAgICB3aGlsZSAoY291bnRlciA8IFJFVFJZX09WRVJfTElNSVQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBpbnN0ID0gYXdhaXQgZ2V0KG1pbnQsIG93bmVyLCBmZWVQYXllciwgdHJ1ZSk7XG5cbiAgICAgICAgICBpZiAoaW5zdCAmJiB0eXBlb2YgaW5zdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGluc3QpO1xuICAgICAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgICAgICAgfSBlbHNlIGlmIChpbnN0IGluc3RhbmNlb2YgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbikge1xuICAgICAgICAgICAgKGF3YWl0IGluc3Quc3VibWl0KCkpLm1hcChcbiAgICAgICAgICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhvayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3QuZGF0YTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1Z0xvZygnIyBFcnJvciBzdWJtaXQgcmV0cnlHZXRPckNyZWF0ZTogJywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnTG9nKGAjIHJldHJ5OiAke2NvdW50ZXJ9IGNyZWF0ZSB0b2tlbiBhY2NvdW50OiBgLCBlKTtcbiAgICAgICAgICBkZWJ1Z0xvZyhgIyBtaW50OiAke21pbnR9LCBvd25lcjogJHtvd25lcn0sIGZlZVBheWVyOiAke2ZlZVBheWVyfWApO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHNsZWVwKFJFVFJZX1NMRUVQX1RJTUUpO1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICB9XG4gICAgICB0aHJvdyBFcnJvcihgcmV0cnkgYWN0aW9uIGlzIG92ZXIgbGltaXQgJHtSRVRSWV9PVkVSX0xJTUlUfWApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgICAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICAgICk6IFByb21pc2U8e1xuICAgICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIH0+ID0+IHtcbiAgICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgICBwYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyIGFzIE9yaWdpbmFsLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgY2xhc3MgS2V5cGFpciB7XG4gICAgc2VjcmV0OiBTZWNyZXQ7XG4gICAgcHVia2V5OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgICBpZiAoIXBhcmFtcy5wdWJrZXkpIHtcbiAgICAgICAgY29uc3Qga2V5cGFpciA9IHBhcmFtcy5zZWNyZXQudG9LZXlwYWlyKCk7XG4gICAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVia2V5ID0gcGFyYW1zLnB1YmtleTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VjcmV0ID0gcGFyYW1zLnNlY3JldDtcbiAgICB9XG5cbiAgICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy5wdWJrZXkpO1xuICAgIH1cblxuICAgIHRvS2V5cGFpcigpOiBPcmlnaW5hbCB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICAgIHJldHVybiBPcmlnaW5hbC5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1B1YmtleSA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgUHVia2V5ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGlzU2VjcmV0ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBTZWNyZXQgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17ODcsODh9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXIgPT4ge1xuICAgICAgY29uc3Qga2V5cGFpciA9IE9yaWdpbmFsLmdlbmVyYXRlKCk7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyB0b0tleVBhaXIgPSAoa2V5cGFpcjogT3JpZ2luYWwpOiBLZXlwYWlyID0+IHtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC1idWJibGVndW0nO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICAgIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0TWFzdGVyRWRpdGlvbiA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnZWRpdGlvbicpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRUcmVlQXV0aG9yaXR5ID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Qmd1bVNpZ25lciA9ICgpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW0J1ZmZlci5mcm9tKCdjb2xsZWN0aW9uX2NwaScsICd1dGY4JyldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QXNzZXRJZCA9IChhZGRyZXNzOiBQdWJrZXksIGxlYWZJbmRleDogbnVtYmVyKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgQk4uQk4obGVhZkluZGV4KTtcbiAgICAgIGNvbnN0IFthc3NldElkXSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2Fzc2V0JywgJ3V0ZjgnKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBVaW50OEFycmF5LmZyb20obm9kZS50b0FycmF5KCdsZScsIDgpKSxcbiAgICAgICAgXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFzc2V0SWQudG9TdHJpbmcoKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCBhcyBBc3NvY2lhdGVkIH0gZnJvbSAnLi9hc3NvY2lhdGVkJztcbmltcG9ydCB7IEFjY291bnQgYXMgS2V5cGFpciB9IGZyb20gJy4va2V5cGFpcic7XG5pbXBvcnQgeyBBY2NvdW50IGFzIFBkYSB9IGZyb20gJy4vcGRhJztcblxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSB7XG4gIC4uLkFzc29jaWF0ZWQsXG4gIC4uLktleXBhaXIsXG4gIC4uLlBkYSxcbn07XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tbW9uIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFBhcnRpYWxTaWduIH0gZnJvbSAnLi9wYXJ0aWFsLXNpZ24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENhbGN1bGF0ZVR4c2l6ZSB9IGZyb20gJy4vY2FsY3VsYXRlLXR4c2l6ZSc7XG5pbXBvcnQgJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCAnfi9nbG9iYWwnO1xuXG5leHBvcnQgY29uc3QgVHJhbnNhY3Rpb25CdWlsZGVyID0ge1xuICAuLi5CYXRjaCxcbiAgLi4uQ2FsY3VsYXRlVHhzaXplLFxuICAuLi5NaW50LFxuICAuLi5Db21tb24sXG4gIC4uLlBhcnRpYWxTaWduLFxufTtcbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBDb21tb25TdHJ1Y3R1cmUsXG4gIE1pbnRTdHJ1Y3R1cmUsXG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0UmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvcj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcblxuICB1bndyYXAoKTogVDtcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBVO1xuICB1bndyYXA8VSwgVj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFYpOiBVIHwgVjtcbiAgLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMTBcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBVKTogVTtcbiAgdW53cmFwKG9rPzogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IHVua25vd24pOiB1bmtub3duIHtcbiAgICBjb25zdCByID0gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayA/IG9rKHZhbHVlKSA6IHZhbHVlKSxcbiAgICAgIChlcnJvcikgPT4gKGVyciA/IFJlc3VsdC5vayhlcnIoZXJyb3IpKSA6IFJlc3VsdC5lcnIoZXJyb3IpKSxcbiAgICApO1xuICAgIGlmIChyLmlzRXJyKSB7XG4gICAgICB0aHJvdyByLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gci52YWx1ZTtcbiAgfVxuXG4gIC8vLy8gbWFwIC8vLy9cbiAgbWFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBSZXN1bHQ8VSwgRT47XG4gIG1hcDxVLCBGIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFUsXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IEYsXG4gICk6IFJlc3VsdDxVLCBGPjtcbiAgbWFwKG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gRXJyb3IpOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyID8gZXJyKGVycm9yKSA6IGVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vLyBjaGFpbiAvLy8vXG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG4gIGNoYWluKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDx1bmtub3duPixcbiAgICBlcnI/OiAoZXJyb3I6IEUpID0+IFJlc3VsdDx1bmtub3duPixcbiAgKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4ob2ssIGVyciB8fCAoKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycm9yKSkpO1xuICB9XG5cbiAgLy8vLyBtYXRjaCAvLy8vXG4gIG1hdGNoPFUsIEY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBGKTogdm9pZCB8IFByb21pc2U8dm9pZD47XG5cbiAgbWF0Y2goXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93bixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gdW5rbm93bixcbiAgKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIoZXJyb3IpIGFzIEVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vIHNpbmdsZSBUcmFuc2FjdGlvbkJ1aWxkZXIgLy8vL1xuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gIGFzeW5jIHN1Ym1pdChcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4ge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMubWFwKFxuICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgIGRlYnVnTG9nKCcjIHJlc3VsdCBzaW5nbGUgc3VibWl0OiAnLCBvayk7XG4gICAgICAgIGlmIChmZWVQYXllcikge1xuICAgICAgICAgIGNvbnN0IG9iaiA9IG9rIGFzIFBhcnRpYWxTaWduU3RydWN0dXJlO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KGZlZVBheWVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBvYmogPSBvayBhcyBDb21tb25TdHJ1Y3R1cmUgfCBNaW50U3RydWN0dXJlO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIocmVzLmVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy52YWx1ZTtcbiAgfVxufVxuXG4vLy8gTXVsdGlwbGUgVHJhbnNhY3Rpb25CdWlsZGVyIC8vLy9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgc3VibWl0KGZlZVBheWVyPzogU2VjcmV0KTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj47XG4gIH1cbn1cblxuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uIChmZWVQYXllcj86IFNlY3JldCkge1xuICBpZiAoZmVlUGF5ZXIpIHtcbiAgICBsZXQgaSA9IDE7XG4gICAgZm9yIGF3YWl0IChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSBlbHNlIGlmIChvYmoudmFsdWUuY2FuU3VibWl0KSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBjYW5TdWJtaXQnKTtcbiAgICAgICAgY29uc3Qgc2lnID0gYXdhaXQgKG9iaiBhcyBQYXJ0aWFsU2lnblN0cnVjdHVyZSkuc3VibWl0KGZlZVBheWVyKTtcbiAgICAgICAgaWYgKHNpZy5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBzaWc7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcoc2lnLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBvdGhlciB0aGFuIGNhblN1Ym1pdCcpO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT0gaSkge1xuICAgICAgICAgIC8vIGxhc3Qgb2JqZWN0XG4gICAgICAgICAgcmV0dXJuIG9iai5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIG9iai5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnM6IENvbW1vblN0cnVjdHVyZSB8IE1pbnRTdHJ1Y3R1cmVbXSA9IFtdO1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0gZWxzZSBpZiAob2JqLmlzT2spIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKCdPbmx5IEFycmF5IEluc3RydWN0aW9uIG9iamVjdCcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVidWdMb2coJyMgUmVzdWx0IGJhdGNoIHN1Ym1pdDogJywgaW5zdHJ1Y3Rpb25zKTtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaCgpLnN1Ym1pdChpbnN0cnVjdGlvbnMpO1xuICB9XG59O1xuXG5jbGFzcyBJbnRlcm5hbE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSB0cnVlO1xuICByZWFkb25seSBpc0VyciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBfZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxFcnI8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IGZhbHNlO1xuICByZWFkb25seSBpc0VyciA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBfb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlc3VsdCB7XG4gIGV4cG9ydCB0eXBlIE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbE9rPFQsIEU+O1xuICBleHBvcnQgdHlwZSBFcnI8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsRXJyPFQsIEU+O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBvazxULCBFIGV4dGVuZHMgRXJyb3I+KHZhbHVlOiBUKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsT2sodmFsdWUpO1xuICB9XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yPzogRSk6IFJlc3VsdDxULCBFPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I6IEUpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnIoZXJyb3IgfHwgRXJyb3IoKSk7XG4gIH1cblxuICB0eXBlIFUgPSBSZXN1bHQ8dW5rbm93bj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgICBSMTUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNCwgUjE1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgICAgT2tUeXBlPFIxNT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgICB8IFIxNVxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxM10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgUjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTEgfCBSMTIgfCBSMTNcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+LCBPa1R5cGU8UjU+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFUsIFIzIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjNdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjM+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMl0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPl0sIEVyclR5cGU8UjAgfCBSMSB8IFIyPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMV0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPl0sIEVyclR5cGU8UjAgfCBSMT4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjBdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD5dLCBFcnJUeXBlPFIwPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiBbXSk6IFJlc3VsdDxbXT47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8VCBleHRlbmRzIFVbXSB8IFJlY29yZDxzdHJpbmcsIFU+PihcbiAgICBvYmo6IFQsXG4gICk6IFJlc3VsdDxcbiAgICB7IFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PGluZmVyIEk+ID8gSSA6IG5ldmVyIH0sXG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT4gPyBFIDogbmV2ZXI7XG4gICAgfVtrZXlvZiBUXVxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogdW5rbm93bik6IHVua25vd24ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIGNvbnN0IHJlc0FyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaikge1xuICAgICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBpdGVtIGFzIHVua25vd247XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlc0Fycik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSAob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KVtrZXldO1xuICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICByZXNba2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQub2socmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yID0gRXJyb3I+ID1cbiAgfCBSZXN1bHQuT2s8VCwgRT5cbiAgfCBSZXN1bHQuRXJyPFQsIEU+O1xuXG50eXBlIE9rVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgTz4gPyBPIDogbmV2ZXI7XG50eXBlIEVyclR5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+XG4gID8gRVxuICA6IG5ldmVyO1xuIiwgImltcG9ydCB7IEludGVybmFsQ29sbGVjdGlvbiB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEdyb3VwaW5nIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgQ29sbGVjdGlvbiwgSW5wdXRDb2xsZWN0aW9uLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb24ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q29sbGVjdGlvbj4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+LFxuICAgICk6IENvbGxlY3Rpb24gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogR3JvdXBpbmdbXSk6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBvdXRwdXQuZmluZCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmdyb3VwX2tleSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmdyb3VwX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMgPyByZXMuZ3JvdXBfdmFsdWUgOiAnJztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDcmVhdG9ycywgSW5wdXRDcmVhdG9ycywgT3B0aW9uIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Db21wcmVzc2VkTmZ0SW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogSW50ZXJuYWxDcmVhdG9yc1tdID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0IS5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPixcbiAgICApOiBDcmVhdG9yc1tdIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJveWFsdHkge1xuICAgIGV4cG9ydCBjb25zdCBUSFJFU0hPTEQgPSAxMDA7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQge1xuICBNZXRhZGF0YUFyZ3MsXG4gIFRva2VuUHJvZ3JhbVZlcnNpb24sXG4gIFRva2VuU3RhbmRhcmQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgQXNzZXRBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogTWV0YWRhdGFBcmdzID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0NvbXByZXNzZWROZnRJbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogZmFsc2UsXG4gICAgICAgIGlzTXV0YWJsZTogaW5wdXQuaXNNdXRhYmxlID8/IGZhbHNlLFxuICAgICAgICBlZGl0aW9uTm9uY2U6IDAsXG4gICAgICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUsXG4gICAgICAgIHRva2VuUHJvZ3JhbVZlcnNpb246IFRva2VuUHJvZ3JhbVZlcnNpb24uT3JpZ2luYWwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBBc3NldEFuZE9mZmNoYWluKTogTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4uaWQudG9TdHJpbmcoKSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IENvbGxlY3Rpb24uQ29sbGVjdGlvbk1pbnQuaW50b1VzZXIoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uZ3JvdXBpbmcsXG4gICAgICAgICkgYXMgUHVia2V5LFxuICAgICAgICBhdXRob3JpdGllczogb3V0cHV0Lm9uY2hhaW4uYXV0aG9yaXRpZXMsXG4gICAgICAgIHJveWFsdHk6IFJveWFsdHkuUm95YWx0eS5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5yb3lhbHR5LnBlcmNlbnQpLFxuICAgICAgICBuYW1lOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLm5hbWUsXG4gICAgICAgIHN5bWJvbDogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5tZXRhZGF0YS5zeW1ib2wsXG4gICAgICAgIHVyaTogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmNyZWF0b3JzKSEsXG4gICAgICAgIHRyZWVBZGRyZXNzOiBvdXRwdXQub25jaGFpbi5jb21wcmVzc2lvbi50cmVlLFxuICAgICAgICBpc0NvbXByZXNzZWQ6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLmNvbXByZXNzZWQsXG4gICAgICAgIGlzTXV0YWJsZTogb3V0cHV0Lm9uY2hhaW4ubXV0YWJsZSxcbiAgICAgICAgaXNCdXJuOiBvdXRwdXQub25jaGFpbi5idXJudCxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5zdXBwbHkuZWRpdGlvbl9ub25jZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucm95YWx0eS5wcmltYXJ5X3NhbGVfaGFwcGVuZWQsXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCkhLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgTWVtbywgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVtbyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogTWVtbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBvdXRwdXRUcmFuc2Zlcj86IFRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIGNhc2U6IHRyYW5zZmVyIHdpdGggbWVtb1xuICAgICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50ICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gPT09ICdzcGwtdG9rZW4nKSB7XG4gICAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8ubWludDtcbiAgICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5tZW1vID0gb3V0cHV0LnBhcnNlZDtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE1pbnRUbyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNaW50VG8sXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubWludEF1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50QXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkuYWNjb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby5hY2NvdW50IGFzIHN0cmluZztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29sbGVjdGlvbkRldGFpbHMgYXMgTWV0YXBsZXhDb2xsZWN0aW9uRGV0YWlscyB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IENvbGxlY3Rpb25EZXRhaWxzLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb25EZXRhaWxzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxNZXRhcGxleENvbGxlY3Rpb25EZXRhaWxzPixcbiAgICApOiBDb2xsZWN0aW9uRGV0YWlscyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBfX2tpbmQ6IG91dHB1dC5fX2tpbmQsXG4gICAgICAgIHNpemU6IHBhcnNlSW50KG91dHB1dC5zaXplLnRvU3RyaW5nKDEwKSksXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE9wdGlvbiwgVXNlcyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVXNlcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChvdXRwdXQ6IE9wdGlvbjxVc2VzPik6IFVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IElucHV0VG9rZW5NZXRhZGF0YSwgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE1ldGFkYXRhQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVG9rZW5NZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dFRva2VuTWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IG51bGwsXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogTWV0YWRhdGFBbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wpLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBkZWxldGUgTlVMTCgweDAwKSBzdHJpbmdzIGZ1bmN0aW9uXG4gICAgZXhwb3J0IGNvbnN0IGRlbGV0ZU51bGxTdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwwL2csICcnKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb25EZXRhaWxzIH0gZnJvbSAnLi9jb2xsZWN0aW9uLWRldGFpbHMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW4gfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhLCBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBNZXRhZGF0YUFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogTWV0YWRhdGFBbmRPZmZjaGFpbixcbiAgICApOiBSZWd1bGFyTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG91dHB1dC5vbmNoYWluLnVwZGF0ZUF1dGhvcml0eS50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBUb2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCxcbiAgICAgICAgKSxcbiAgICAgICAgdXJpOiBUb2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5pc011dGFibGUsXG4gICAgICAgIHByaW1hcnlTYWxlSGFwcGVuZWQ6IG91dHB1dC5vbmNoYWluLnByaW1hcnlTYWxlSGFwcGVuZWQsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5lZGl0aW9uTm9uY2UsXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5jb2xsZWN0aW9uKSxcbiAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IENvbGxlY3Rpb25EZXRhaWxzLkNvbGxlY3Rpb25EZXRhaWxzLmludG9Vc2VyKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmNvbGxlY3Rpb25EZXRhaWxzLFxuICAgICAgICApLFxuICAgICAgICB1c2VzOiBVc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgb3ZlcndyaXRlT2JqZWN0LCBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHt9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgRmlsZVR5cGUsIFByb3BlcnRpZXMsIFN0b3JhZ2VUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSBhc3luYyAoXG4gICAgICBpbnB1dDogUHJvcGVydGllcyB8IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrRnVuYzogKFxuICAgICAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgICApID0+IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PixcbiAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICk6IFByb21pc2U8UHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2FsbGJhY2tGdW5jKGZpbGUuZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICAgICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3ZlcndyaXRlT2JqZWN0KGZpbGUsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICB3aWxsOiB7IGtleTogJ3VyaScsIHZhbHVlOiByZXMudmFsdWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmlucHV0LCBmaWxlcyB9IGFzIFByb3BlcnRpZXM7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5tdWx0aXNpZ0F1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5tdWx0aXNpZ0F1dGhvcml0eTtcbiAgICAgIGhpc3Rvcnkuc2lnbmVycyA9IG91dHB1dC5wYXJzZWQuaW5mby5zaWduZXJzO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlciB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXIsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICBpZiAoIW91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbiB8fCAhb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgIGhpc3Rvcnkuc29sID0gb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzPy50b1NvbCgpLnRvU3RyaW5nKCk7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbXByZXNzZWROZnRNZXRhZGF0YSB9IGZyb20gJy4vY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWVtbyB9IGZyb20gJy4vbWVtbyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnLi9yZWd1bGFyLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUHJvcGVydGllcyB9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW5NZXRhZGF0YSB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vdHJhbnNmZXItY2hlY2tlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBVc2VzIH0gZnJvbSAnLi91c2VzJztcblxuZXhwb3J0IGNvbnN0IENvbnZlcnRlciA9IHtcbiAgLi4uQ29tcHJlc3NlZE5mdE1ldGFkYXRhLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uUmVndWxhck5mdE1ldGFkYXRhLFxuICAuLi5Qcm9wZXJ0aWVzLFxuICAuLi5Sb3lhbHR5LFxuICAuLi5Ub2tlbk1ldGFkYXRhLFxuICAuLi5UcmFuc2ZlckNoZWNrZWQsXG4gIC4uLlRyYW5zZmVyLFxuICAuLi5Vc2VzLFxufTtcbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IERldGFpbHMsIExpbWl0IH0gZnJvbSAnfi90eXBlcy92YWxpZGF0b3InO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBWYWxpZGF0b3Ige1xuICBleHBvcnQgbmFtZXNwYWNlIE1lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGV4cG9ydCBjb25zdCBTTUFMTF9OVU1CRVIgPSAndG9vIHNtYWxsJztcbiAgICBleHBvcnQgY29uc3QgQklHX05VTUJFUiA9ICd0b28gYmlnJztcbiAgICBleHBvcnQgY29uc3QgTE9OR19MRU5HVEggPSAndG9vIGxvbmcnO1xuICAgIGV4cG9ydCBjb25zdCBFTVBUWSA9ICdpbnZhbGlkIGVtcHR5IHZhbHVlJztcbiAgICBleHBvcnQgY29uc3QgSU5WQUxJRF9VUkwgPSAnaW52YWxpZCB1cmwnO1xuICAgIGV4cG9ydCBjb25zdCBPTkxZX05PREVfSlMgPSAnYHN0cmluZ2AgdHlwZSBpcyBvbmx5IE5vZGUuanMnO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IE5BTUVfTEVOR1RIID0gMzI7XG4gIGV4cG9ydCBjb25zdCBTWU1CT0xfTEVOR1RIID0gMTA7XG4gIGV4cG9ydCBjb25zdCBVUkxfTEVOR1RIID0gMjAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NQVggPSAxMDA7XG4gIGV4cG9ydCBjb25zdCBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVggPSAxMDAwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUlOID0gMDtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdyb3lhbHR5JztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTZWxsZXJGZWVCYXNpc1BvaW50cyA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogQ29udmVydGVyLlJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXgsXG4gID4oXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5yb3lhbHR5KSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzUm95YWx0eShtZXRhZGF0YS5yb3lhbHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJGZWVCYXNpc1BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEubmFtZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc05hbWUobWV0YWRhdGEubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLnN5bWJvbCkge1xuICAgICAgICAgICAgICByZXMgPSBpc1N5bWJvbChtZXRhZGF0YS5zeW1ib2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFcnIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goLi4ucmVzLmVycm9yLmRldGFpbHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgJ0NhdWdodCBpbiB0aGUgdmFsaWRhdGlvbiBlcnJvcnMuIHNlZSBpbmZvcm1hdGlvbiBlLmc6IGVycjxWYWxpZGF0b3JFcnJvcj4uZGV0YWlscyc7XG4gICAgICAgIHRocm93IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZSA9IFBpY2s8XG4gICAgT2ZmY2hhaW4sXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAnaW1hZ2UnIHwgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJ1xuICA+O1xuICB0eXBlIFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggPSBQaWNrPFxuICAgIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAncm95YWx0eScgfCAnZmlsZVBhdGgnXG4gID47XG4gIHR5cGUgUGlja01ldGFwbGV4ID0gUGljazxcbiAgICBEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdCxcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgaWYgKCFpbWFnZU9yVXJpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChpbWFnZU9yVXJpKSA+IFVSTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBpbWFnZU9yVXJpLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBVUkxfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oz86Jj0rLCUjXSsvZy50ZXN0KGltYWdlT3JVcmkpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5JTlZBTElEX1VSTCwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGRldGFpbHM6IERldGFpbHNbXTtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBkZXRhaWxzOiBEZXRhaWxzW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJy4uL2FjY291bnQnO1xuXG5leHBvcnQgZW51bSBGaWx0ZXJUeXBlIHtcbiAgTWVtbyA9ICdtZW1vJyxcbiAgTWludCA9ICdtaW50JyxcbiAgT25seU1lbW8gPSAnb25seS1tZW1vJyxcbiAgVHJhbnNmZXIgPSAndHJhbnNmZXInLFxufVxuXG5leHBvcnQgZW51bSBNb2R1bGVOYW1lIHtcbiAgU29sTmF0aXZlID0gJ3N5c3RlbScsXG4gIFNwbFRva2VuID0gJ3NwbC10b2tlbicsXG59XG5cbmV4cG9ydCBjb25zdCBGaWx0ZXJPcHRpb25zID0ge1xuICBUcmFuc2Zlcjoge1xuICAgIHByb2dyYW06IFsnc3lzdGVtJywgJ3NwbC10b2tlbiddLFxuICAgIGFjdGlvbjogWyd0cmFuc2ZlcicsICd0cmFuc2ZlckNoZWNrZWQnXSxcbiAgfSxcbiAgTWVtbzoge1xuICAgIHByb2dyYW06IFsnc3BsLW1lbW8nXSxcbiAgICBhY3Rpb246IFsnKiddLFxuICB9LFxuICBNaW50OiB7XG4gICAgcHJvZ3JhbTogWydzcGwtdG9rZW4nXSxcbiAgICBhY3Rpb246IFsnbWludFRvJywgJ21pbnRUb0NoZWNrZWQnXSxcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIFBvc3RUb2tlbkFjY291bnQgPSB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgb3duZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFdpdGhNZW1vID0ge1xuICBzaWc6IHN0cmluZ1tdO1xuICBtZW1vOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBUcmFuc2ZlciA9IHtcbiAgcGFyc2VkOiB7XG4gICAgaW5mbzoge1xuICAgICAgZGVzdGluYXRpb246IFB1YmtleTtcbiAgICAgIHNvdXJjZTogUHVia2V5O1xuICAgICAgbGFtcG9ydHM6IG51bWJlcjtcbiAgICB9O1xuICAgIHR5cGU6IHN0cmluZztcbiAgfTtcbiAgcHJvZ3JhbTogc3RyaW5nO1xuICBwcm9ncmFtSWQ/OiBQdWJsaWNLZXk7XG59O1xuXG5leHBvcnQgdHlwZSBNaW50VG8gPSB7XG4gIHBhcnNlZDoge1xuICAgIGluZm86IHtcbiAgICAgIGFjY291bnQ6IFB1YmtleTtcbiAgICAgIG1pbnQ6IFB1YmtleTtcbiAgICAgIG1pbnRBdXRob3JpdHk6IFB1YmtleTtcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmc7XG4gICAgfTtcbiAgICB0eXBlOiBzdHJpbmc7XG4gIH07XG4gIHByb2dyYW06IHN0cmluZztcbiAgcHJvZ3JhbUlkPzogUHVibGljS2V5O1xufTtcblxuZXhwb3J0IHR5cGUgTWludFRvQ2hlY2tlZCA9IE1pbnRUbztcblxuZXhwb3J0IHR5cGUgVHJhbnNmZXJDaGVja2VkID0ge1xuICBwYXJzZWQ6IHtcbiAgICBpbmZvOiB7XG4gICAgICBkZXN0aW5hdGlvbjogUHVia2V5O1xuICAgICAgbWludDogUHVia2V5O1xuICAgICAgbXVsdGlzaWdBdXRob3JpdHk6IFB1YmtleTtcbiAgICAgIHNpZ25lcnM6IFB1YmtleVtdO1xuICAgICAgc291cmNlOiBQdWJrZXk7XG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nO1xuICAgIH07XG4gICAgdHlwZTogc3RyaW5nO1xuICB9O1xuICBwcm9ncmFtOiBzdHJpbmc7XG4gIHByb2dyYW1JZD86IFB1YmxpY0tleTtcbn07XG5cbmV4cG9ydCB0eXBlIE1lbW8gPSB7XG4gIHBhcnNlZDogc3RyaW5nO1xuICBwcm9ncmFtOiBzdHJpbmc7XG4gIHByb2dyYW1JZDogUHVibGljS2V5O1xufTtcbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb21taXRtZW50LCBDb25uZWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcbiAgY29uc3Qgc2V0dGVkID0ge1xuICAgIGNsdXN0ZXJVcmw6ICcnLFxuICAgIGNvbW1pdG1lbnQ6IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICAgIGN1c3RvbUNsdXN0ZXJVcmw6IFtdIGFzIHN0cmluZ1tdLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uID0gKCk6IENvbm5lY3Rpb24gPT4ge1xuICAgIGlmIChzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjdXN0b20gY2x1c3RlclxuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGN1c3RvbUNsdXN0ZXJVcmw6IHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjdXN0b20gY2x1c3RlciBieSBqc29uIGNvbmZpZ1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGN1c3RvbUNsdXN0ZXJVcmw6IENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghc2V0dGVkLmNsdXN0ZXJVcmwpIHtcbiAgICAgIC8vIGRlZmF1bHQgY2x1c3RlclxuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghc2V0dGVkLmNvbW1pdG1lbnQpIHtcbiAgICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uKHNldHRlZC5jbHVzdGVyVXJsLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNoYW5nZUNvbm5lY3Rpb24gPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGNvbW1pdG1lbnQ/OiBDb21taXRtZW50O1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHZvaWQgPT4ge1xuICAgIC8vIGluaXRpYWxpemVcbiAgICBzZXR0ZWQuY2x1c3RlclVybCA9ICcnO1xuICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gW107XG4gICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcblxuICAgIGNvbnN0IHsgY2x1c3RlciwgY29tbWl0bWVudCwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG4gICAgaWYgKGNvbW1pdG1lbnQpIHtcbiAgICAgIHNldHRlZC5jb21taXRtZW50ID0gY29tbWl0bWVudDtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNvbW1pdG1lbnQ6ICcsIHNldHRlZC5jb21taXRtZW50KTtcbiAgICB9XG5cbiAgICBpZiAoY2x1c3Rlcikge1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7IGNsdXN0ZXI6IGNsdXN0ZXIgfSk7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjbHVzdGVyVXJsOiAnLCBzZXR0ZWQuY2x1c3RlclVybCk7XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGN1c3RvbUNsdXN0ZXJVcmw6ICcsIGN1c3RvbUNsdXN0ZXJVcmwpO1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7IGN1c3RvbUNsdXN0ZXJVcmwgfSk7XG4gICAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IGN1c3RvbUNsdXN0ZXJVcmw7XG4gICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgJyMgTm9kZSBjaGFuZ2UgY2x1c3RlciwgY3VzdG9tIGNsdXN0ZXIgdXJsOiAnLFxuICAgICAgICBzZXR0ZWQuY2x1c3RlclVybCxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjb25maXJtZWRTaWcgPSBhc3luYyAoXG4gICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgY29tbWl0bWVudDogQ29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICApID0+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgbGF0ZXN0QmxvY2toYXNoID0gYXdhaXQgY29ubmVjdGlvbi5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICByZXR1cm4gYXdhaXQgY29ubmVjdGlvblxuICAgICAgLmNvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGJsb2NraGFzaDogbGF0ZXN0QmxvY2toYXNoLmJsb2NraGFzaCxcbiAgICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogbGF0ZXN0QmxvY2toYXNoLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tbWl0bWVudCxcbiAgICAgIClcbiAgICAgIC50aGVuKFJlc3VsdC5vaylcbiAgICAgIC5jYXRjaChSZXN1bHQuZXJyKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgVHJ5LCBkZWJ1Z0xvZyB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IEFzc2V0LCBBc3NldFByb29mLCBBc3NldHMgfSBmcm9tICd+L3R5cGVzL2Rhcy1hcGknO1xuaW1wb3J0IHsgU29ydGFibGUgfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIERhc0FwaSB7XG4gIGNvbnN0IGNvbm5lY3QgPSBhc3luYyAoXG4gICAgbWV0aG9kOiBzdHJpbmcsXG4gICAgcGFyYW1zOiAoc3RyaW5nIHwgUHVia2V5IHwgU29ydGFibGUgfCBudW1iZXIgfCB1bmRlZmluZWQpW10sXG4gICkgPT4ge1xuICAgIENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuY2FsY3VsYXRlUHJvYmFiaWxpdHkoKSAmJlxuICAgICAgY29uc29sZS53YXJuKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuREFTX0FQSV9VUkwpO1xuICAgIGRlYnVnTG9nKCcjIGRhcyBhcGkgdXJsOiAnLCBDb25zdGFudHMuREFTX0FQSV9VUkwpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goQ29uc3RhbnRzLkRBU19BUElfVVJMLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBqc29ucnBjOiAnMi4wJyxcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBpZDogJ2NvbXByZXNzaW9uJyxcbiAgICAgICAgcGFyYW1zLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgcmV0dXJuIChhd2FpdCByZXNwb25zZS5qc29uKCkpLnJlc3VsdDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRQcm9vZiA9IGFzeW5jIChcbiAgICBhc3NldElkOiBzdHJpbmcsXG4gICk6IFByb21pc2U8UmVzdWx0PEFzc2V0UHJvb2YsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0UHJvb2YnLCBbYXNzZXRJZF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldCA9IGFzeW5jIChcbiAgICBhc3NldElkOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PEFzc2V0LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldCcsIFthc3NldElkXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0c0J5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXJBZGRyZXNzOiBQdWJrZXksXG4gICAgbGltaXQ6IG51bWJlciA9IDEwMDAsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBzb3J0Qnk/OiBTb3J0YWJsZSxcbiAgICBiZWZvcmU/OiBzdHJpbmcsXG4gICAgYWZ0ZXI/OiBzdHJpbmcsXG4gICk6IFByb21pc2U8UmVzdWx0PEFzc2V0cywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXRzQnlPd25lcicsIFtcbiAgICAgICAgb3duZXJBZGRyZXNzLFxuICAgICAgICBzb3J0QnksXG4gICAgICAgIGxpbWl0LFxuICAgICAgICBwYWdlLFxuICAgICAgICBiZWZvcmUsXG4gICAgICAgIGFmdGVyLFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0c0J5R3JvdXAgPSBhc3luYyAoXG4gICAgZ3JvdXBLZXk6IHN0cmluZyxcbiAgICBncm91cFZhbHVlOiBQdWJrZXksXG4gICAgbGltaXQ6IG51bWJlciA9IDEwMDAsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBzb3J0Qnk/OiBTb3J0YWJsZSxcbiAgICBiZWZvcmU/OiBzdHJpbmcsXG4gICAgYWZ0ZXI/OiBzdHJpbmcsXG4gICk6IFByb21pc2U8UmVzdWx0PEFzc2V0cywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXRzQnlHcm91cCcsIFtcbiAgICAgICAgZ3JvdXBLZXksXG4gICAgICAgIGdyb3VwVmFsdWUsXG4gICAgICAgIHNvcnRCeSxcbiAgICAgICAgbGltaXQsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGJlZm9yZSxcbiAgICAgICAgYWZ0ZXIsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBBY2NvdW50TWV0YSxcbiAgUHVibGljS2V5LFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IERhc0FwaSB9IGZyb20gJ34vZGFzLWFwaSc7XG5pbXBvcnQgeyBjcmVhdGVEZWxlZ2F0ZUluc3RydWN0aW9uIH0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5pbXBvcnQge1xuICBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQsXG4gIFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gIFNQTF9OT09QX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLWFjY291bnQtY29tcHJlc3Npb24nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgRGVsZWdhdGVPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlRGVsZWFnYXRlID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IFB1YmxpY0tleSxcbiAgICBuZXdEZWxlZ2F0ZTogUHVibGljS2V5IHwgbnVsbCxcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uPiA9PiB7XG4gICAgY29uc3QgcnBjQXNzZXRQcm9vZiA9IGF3YWl0IERhc0FwaS5nZXRBc3NldFByb29mKGFzc2V0SWQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgcnBjQXNzZXQgPSBhd2FpdCBEYXNBcGkuZ2V0QXNzZXQoYXNzZXRJZC50b1N0cmluZygpKTtcbiAgICBpZiAocnBjQXNzZXRQcm9vZi5pc0VyciB8fCBycGNBc3NldC5pc0Vycikge1xuICAgICAgdGhyb3cgRXJyb3IoJ1Jpc2UgZXJyb3Igd2hlbiBnZXQgYXNzZXQgcHJvb2Ygb3IgYXNzZXQnKTtcbiAgICB9XG4gICAgY29uc3QgY29tcHJlc3Npb24gPSBycGNBc3NldC52YWx1ZS5jb21wcmVzc2lvbjtcbiAgICBjb25zdCBvd25lcnNoaXAgPSBycGNBc3NldC52YWx1ZS5vd25lcnNoaXA7XG4gICAgY29uc3QgYXNzZXRQcm9vZiA9IHJwY0Fzc2V0UHJvb2YudmFsdWU7XG4gICAgY29uc3QgdHJlZU93bmVyID0gYXNzZXRQcm9vZi50cmVlX2lkLnRvUHVibGljS2V5KCk7XG5cbiAgICBjb25zdCB0cmVlQXV0aG9yaXR5ID0gQWNjb3VudC5QZGEuZ2V0VHJlZUF1dGhvcml0eShhc3NldFByb29mLnRyZWVfaWQpO1xuICAgIGNvbnN0IHByZXZpb3VzTGVhZkRlbGVnYXRlID0gb3duZXJzaGlwLmRlbGVnYXRlXG4gICAgICA/IG93bmVyc2hpcC5kZWxlZ2F0ZS50b1B1YmxpY0tleSgpXG4gICAgICA6IG93bmVyc2hpcC5vd25lci50b1B1YmxpY0tleSgpO1xuICAgIGNvbnN0IG5ld0xlYWZEZWxlZ2F0ZSA9IG5ld0RlbGVnYXRlID8gbmV3RGVsZWdhdGUgOiBwcmV2aW91c0xlYWZEZWxlZ2F0ZTtcbiAgICBjb25zdCB0cmVlQWNjb3VudCA9IGF3YWl0IENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudC5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgIHRyZWVPd25lcixcbiAgICApO1xuICAgIGNvbnN0IGNhbm9weURlcHRoID0gdHJlZUFjY291bnQuZ2V0Q2Fub3B5RGVwdGgoKTtcbiAgICBjb25zdCBzbGljZWRQcm9vZjogQWNjb3VudE1ldGFbXSA9IGFzc2V0UHJvb2YucHJvb2ZcbiAgICAgIC5tYXAoKG5vZGU6IHN0cmluZykgPT4gKHtcbiAgICAgICAgcHVia2V5OiBub2RlLnRvUHVibGljS2V5KCksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9KSlcbiAgICAgIC5zbGljZSgwLCBhc3NldFByb29mLnByb29mLmxlbmd0aCAtIChjYW5vcHlEZXB0aCA/IGNhbm9weURlcHRoIDogMCkpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZURlbGVnYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIHRyZWVBdXRob3JpdHksXG4gICAgICAgIGxlYWZPd25lcjogb3duZXJzaGlwLm93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHByZXZpb3VzTGVhZkRlbGVnYXRlLFxuICAgICAgICBuZXdMZWFmRGVsZWdhdGUsXG4gICAgICAgIG1lcmtsZVRyZWU6IGFzc2V0UHJvb2YudHJlZV9pZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBsb2dXcmFwcGVyOiBTUExfTk9PUF9QUk9HUkFNX0lELFxuICAgICAgICBjb21wcmVzc2lvblByb2dyYW06IFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gICAgICAgIGFuY2hvclJlbWFpbmluZ0FjY291bnRzOiBzbGljZWRQcm9vZixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IFsuLi5hc3NldFByb29mLnJvb3QudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgZGF0YUhhc2g6IFsuLi5jb21wcmVzc2lvbi5kYXRhX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgY3JlYXRvckhhc2g6IFtcbiAgICAgICAgICAuLi5jb21wcmVzc2lvbi5jcmVhdG9yX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpLFxuICAgICAgICBdLFxuICAgICAgICBub25jZTogY29tcHJlc3Npb24ubGVhZl9pZCxcbiAgICAgICAgaW5kZXg6IGNvbXByZXNzaW9uLmxlYWZfaWQsXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBkZWxlZ2F0ZVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgIC8vIHRhcmdldCBtaW50XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgIC8vIG5ldyBkZWxlZ2F0ZSBvciBwcmV2aW91cyBkZWxlZ2F0ZSBzaWduZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPERlbGVnYXRlT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHNldERlbGVnYXRlID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RGVsZWdhdGVPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbmV3RGVsZWdhdGUgPSBvcHRpb25zLmRlbGVnYXRlXG4gICAgICAgID8gb3B0aW9ucy5kZWxlZ2F0ZS50b1B1YmxpY0tleSgpXG4gICAgICAgIDogbnVsbDtcbiAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBjcmVhdGVEZWxlYWdhdGUobWludC50b1B1YmxpY0tleSgpLCBuZXdEZWxlZ2F0ZSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oW2luc3RdLCBbb3duZXIudG9LZXlwYWlyKCldKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBEYXNBcGkgfSBmcm9tICd+L2Rhcy1hcGknO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnksIGRlYnVnTG9nIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgQ29tcHJlc3NlZE5mdE1ldGFkYXRhLCBOZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvY29tcHJlc3NlZC1uZnQnO1xuXG5pbXBvcnQgeyBGaW5kT3B0aW9ucywgU29ydGFibGUsIFNvcnRCeSwgU29ydERpcmVjdGlvbiB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBkZWZhdWx0U29ydEJ5OiBTb3J0YWJsZSA9IHtcbiAgICBzb3J0Qnk6IFNvcnRCeS5SZWNlbnQsXG4gICAgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbi5EZXNjLFxuICB9O1xuXG4gIGNvbnN0IGZldGNoT2ZmY2hhaW4gPSBhc3luYyAodXJpOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgKGF3YWl0IGZldGNoKHVyaSkpLmpzb24oKTtcbiAgICByZXR1cm4ganNvbjtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgb3duZXIgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxGaW5kT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICBsaW1pdDogMTAwMCxcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgc29ydEJ5OiBkZWZhdWx0U29ydEJ5LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgbGltaXQsIHBhZ2UsIHNvcnRCeSwgYmVmb3JlLCBhZnRlciB9ID0ge1xuICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGFzc2V0cyA9IGF3YWl0IERhc0FwaS5nZXRBc3NldHNCeU93bmVyKFxuICAgICAgICBvd25lcixcbiAgICAgICAgbGltaXQsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHNvcnRCeSxcbiAgICAgICAgYmVmb3JlLFxuICAgICAgICBhZnRlcixcbiAgICAgICk7XG4gICAgICBpZiAoYXNzZXRzLmlzRXJyKSB7XG4gICAgICAgIHRocm93IGFzc2V0cy5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbXMgPSBhc3NldHMudmFsdWUuaXRlbXM7XG5cbiAgICAgIGNvbnN0IG1ldGFkYXRhcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpdGVtc1xuICAgICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAubWFwKGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKFxuICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY29uc3QgbWVyZ2VkID0ge1xuICAgICAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICAgICAgb2ZmY2hhaW46IG9mZmNoYWluLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICByZXR1cm4gQ29udmVydGVyLkNvbXByZXNzZWROZnRNZXRhZGF0YS5pbnRvVXNlcihtZXJnZWQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIGRlYnVnTG9nKCcjIEZhaWxlZCBmZXRjaCBvZmZjaGFpbiB1cmw6ICcsIGl0ZW0uY29udGVudC5qc29uX3VyaSk7XG4gICAgICAgICAgICAgIHJldHVybiBDb252ZXJ0ZXIuQ29tcHJlc3NlZE5mdE1ldGFkYXRhLmludG9Vc2VyKHtcbiAgICAgICAgICAgICAgICBvbmNoYWluOiBpdGVtLFxuICAgICAgICAgICAgICAgIG9mZmNoYWluOiB7fSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZTogYXNzZXRzLnZhbHVlLnBhZ2UsXG4gICAgICAgIHRvdGFsOiBhc3NldHMudmFsdWUudG90YWwsXG4gICAgICAgIGxpbWl0OiBhc3NldHMudmFsdWUubGltaXQsXG4gICAgICAgIG1ldGFkYXRhcyxcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGFzc2V0ID0gYXdhaXQgRGFzQXBpLmdldEFzc2V0KG1pbnQpO1xuICAgICAgaWYgKGFzc2V0LmlzRXJyKSB7XG4gICAgICAgIHRocm93IGFzc2V0LmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKFxuICAgICAgICBhc3NldC52YWx1ZS5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAgICAgb25jaGFpbjogYXNzZXQudmFsdWUsXG4gICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgIH07XG4gICAgICByZXR1cm4gQ29udmVydGVyLkNvbXByZXNzZWROZnRNZXRhZGF0YS5pbnRvVXNlcihtZXJnZWQpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBjb2xsZWN0aW9uIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IGNvbGxlY3Rpb25NaW50XG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlDb2xsZWN0aW9uID0gYXN5bmMgKFxuICAgIGNvbGxlY3Rpb25NaW50OiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxGaW5kT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICBsaW1pdDogMTAwMCxcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgc29ydEJ5OiBkZWZhdWx0U29ydEJ5LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgbGltaXQsIHBhZ2UsIHNvcnRCeSwgYmVmb3JlLCBhZnRlciB9ID0ge1xuICAgICAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGFzc2V0cyA9IGF3YWl0IERhc0FwaS5nZXRBc3NldHNCeUdyb3VwKFxuICAgICAgICAnY29sbGVjdGlvbicsXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgc29ydEJ5LFxuICAgICAgICBiZWZvcmUsXG4gICAgICAgIGFmdGVyLFxuICAgICAgKTtcbiAgICAgIGlmIChhc3NldHMuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgYXNzZXRzLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtcyA9IGFzc2V0cy52YWx1ZS5pdGVtcztcblxuICAgICAgY29uc3QgbWV0YWRhdGFzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGl0ZW1zXG4gICAgICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5jb21wcmVzc2lvbi5jb21wcmVzc2VkID09PSB0cnVlKVxuICAgICAgICAgIC5tYXAoYXN5bmMgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oXG4gICAgICAgICAgICAgIGl0ZW0uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSB7XG4gICAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gQ29udmVydGVyLkNvbXByZXNzZWROZnRNZXRhZGF0YS5pbnRvVXNlcihtZXJnZWQpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2U6IGFzc2V0cy52YWx1ZS5wYWdlLFxuICAgICAgICB0b3RhbDogYXNzZXRzLnZhbHVlLnRvdGFsLFxuICAgICAgICBsaW1pdDogYXNzZXRzLnZhbHVlLmxpbWl0LFxuICAgICAgICBtZXRhZGF0YXMsXG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgRGVsZWdhdGUgfSBmcm9tICcuL2RlbGVnYXRlJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICAvKipcbiAgICogQ3JlYXRlIGRlbGVnYXRlIHdpdGggZ2FzLWxlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBuZXdEZWxlZ2F0ZVxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblRyYW5zYWN0aW9uLCBFcnJvcj4+fVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NEZWxlZ2F0ZSA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBuZXdEZWxlZ2F0ZTogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbnN0ID0gYXdhaXQgRGVsZWdhdGUuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ld0RlbGVnYXRlLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogbmV3RGVsZWdhdGUudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgdHguYWRkKGluc3QpO1xuICAgICAgdHgucGFydGlhbFNpZ24ob3duZXIudG9LZXlwYWlyKCkpO1xuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuUGFydGlhbFNpZ24oXG4gICAgICAgIHR4XG4gICAgICAgICAgLnNlcmlhbGl6ZSh7XG4gICAgICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9TdHJpbmcoJ2hleCcpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBBY2NvdW50LCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgRGVsZWdhdGUgfSBmcm9tICcuL2dhcy1sZXNzLWRlbGVnYXRlJztcbmltcG9ydCB7IFBhcnRpYWxTaWduU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0IHtcbiAgLyoqXG4gICAqIFRyYW5zZmVyIHdpdGggZ2FzLWxlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0XG4gICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25UcmFuc2FjdGlvbltdLCBFcnJvcj4+fVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPltdPiA9PiB7XG4gICAgY29uc3QgZGVsZWdhdGUgPSBhd2FpdCBEZWxlZ2F0ZS5nYXNMZXNzRGVsZWdhdGUobWludCwgb3duZXIsIGZlZVBheWVyKTtcbiAgICBkZWxlZ2F0ZS51bndyYXAoKS5jYW5TdWJtaXQgPSB0cnVlO1xuXG4gICAgY29uc3QgdHJhbnNmZXIgPSBhd2FpdCBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICBjb25zdCBpbnN0ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICBpbnN0LmFkZChcbiAgICAgICAgYXdhaXQgVHJhbnNmZXIuY3JlYXRlVHJhbnNmZXIoXG4gICAgICAgICAgbWludCxcbiAgICAgICAgICBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBvd25lciB9KS5wdWJrZXksXG4gICAgICAgICAgZGVzdCxcbiAgICAgICAgICBmZWVQYXllcixcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgICBpbnN0LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKFxuICAgICAgICBpbnN0XG4gICAgICAgICAgLnNlcmlhbGl6ZSh7XG4gICAgICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudG9TdHJpbmcoJ2hleCcpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2RlbGVnYXRlLCB0cmFuc2Zlcl07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IERhc0FwaSB9IGZyb20gJ34vZGFzLWFwaSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zZmVySW5zdHJ1Y3Rpb24gfSBmcm9tICdtcGwtYnViYmxlZ3VtLWluc3RydWN0aW9uJztcbmltcG9ydCB7XG4gIENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudCxcbiAgU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgU1BMX05PT1BfUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtYWNjb3VudC1jb21wcmVzc2lvbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVibGljS2V5LCBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgYXNzZXRJZDogUHVia2V5LFxuICAgIGFzc2V0SWRPd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBkZWxlZ2F0ZT86IFB1YmtleSxcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uPiA9PiB7XG4gICAgY29uc3QgYXNzZXRQcm9vZiA9IGF3YWl0IERhc0FwaS5nZXRBc3NldFByb29mKGFzc2V0SWQpO1xuICAgIGlmIChhc3NldFByb29mLmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldFByb29mLmVycm9yO1xuICAgIH0gZWxzZSBpZiAoYXNzZXRQcm9vZi5pc09rICYmIGFzc2V0UHJvb2YudmFsdWUucHJvb2YubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBFcnJvcignUHJvb2YgaXMgZW1wdHkuIE1heSBiZSBzZXQgUmVndWxhciBORlQ/Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgYXNzZXQgPSBhd2FpdCBEYXNBcGkuZ2V0QXNzZXQoYXNzZXRJZCk7XG4gICAgaWYgKGFzc2V0LmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldC5lcnJvcjtcbiAgICB9IGVsc2UgaWYgKGFzc2V0LmlzT2sgJiYgYXNzZXQudmFsdWUub3duZXJzaGlwLm93bmVyICE9PSBhc3NldElkT3duZXIpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgTkZUIGlzIG5vdCBvd25lZCBieSB0aGUgZXhwZWN0ZWQgb3duZXI6IGN1cnJlbnQ6ICR7YXNzZXQudmFsdWUub3duZXJzaGlwLm93bmVyfSwgZXhwZWN0ZWQ6ICR7YXNzZXRJZE93bmVyfWAsXG4gICAgICApO1xuICAgIH1cblxuICAgIGRlYnVnTG9nKCcjIGFzc2V0UHJvb2Y6ICcsIGFzc2V0UHJvb2YudmFsdWUpO1xuICAgIGRlYnVnTG9nKCcjIG93bmVyc2hpcDogJywgYXNzZXQudmFsdWUub3duZXJzaGlwKTtcbiAgICBkZWJ1Z0xvZygnIyBhdXRob3JpdGllczogJywgYXNzZXQudmFsdWUuYXV0aG9yaXRpZXMpO1xuXG4gICAgY29uc3QgY29tcHJlc3Npb24gPSBhc3NldC52YWx1ZS5jb21wcmVzc2lvbjtcbiAgICBjb25zdCBvd25lcnNoaXAgPSBhc3NldC52YWx1ZS5vd25lcnNoaXA7XG4gICAgY29uc3QgcHJvb2YgPSBhc3NldFByb29mLnZhbHVlLnByb29mO1xuICAgIGNvbnN0IG1lcmtsZVRyZWUgPSBjb21wcmVzc2lvbi50cmVlLnRvUHVibGljS2V5KCk7XG4gICAgY29uc3QgdHJlZUFjY291bnQgPSBhd2FpdCBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICBtZXJrbGVUcmVlLFxuICAgICk7XG4gICAgY29uc3QgdHJlZUF1dGhvcml0eSA9IHRyZWVBY2NvdW50LmdldEF1dGhvcml0eSgpO1xuICAgIGNvbnN0IGNhbm9weURlcHRoID0gdHJlZUFjY291bnQuZ2V0Q2Fub3B5RGVwdGgoKTtcblxuICAgIGNvbnN0IHByb29mUGF0aCA9IHByb29mXG4gICAgICAubWFwKChub2RlOiBzdHJpbmcpID0+ICh7XG4gICAgICAgIHB1YmtleTogbm9kZS50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc1NpZ25lcjogZmFsc2UsXG4gICAgICAgIGlzV3JpdGFibGU6IGZhbHNlLFxuICAgICAgfSkpXG4gICAgICAuc2xpY2UoMCwgcHJvb2YubGVuZ3RoIC0gKGNhbm9weURlcHRoID8gY2Fub3B5RGVwdGggOiAwKSk7XG5cbiAgICBjb25zdCBsZWFmT3duZXIgPSBvd25lcnNoaXAub3duZXIudG9QdWJsaWNLZXkoKTtcbiAgICBjb25zdCBuZXdMZWFmT3duZXIgPSBkZXN0LnRvUHVibGljS2V5KCk7XG4gICAgY29uc3QgbGVhZk5vbmNlID0gY29tcHJlc3Npb24ubGVhZl9pZDtcbiAgICBsZXQgbGVhZkRlbGVnYXRlOiBQdWJsaWNLZXk7XG4gICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICBsZWFmRGVsZWdhdGUgPSBkZWxlZ2F0ZS50b1B1YmxpY0tleSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZWFmRGVsZWdhdGUgPSBvd25lcnNoaXAuZGVsZWdhdGVcbiAgICAgICAgPyBvd25lcnNoaXAuZGVsZWdhdGUudG9QdWJsaWNLZXkoKVxuICAgICAgICA6IGxlYWZPd25lcjtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZVRyYW5zZmVySW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIG1lcmtsZVRyZWUsXG4gICAgICAgIHRyZWVBdXRob3JpdHksXG4gICAgICAgIGxlYWZPd25lcixcbiAgICAgICAgbGVhZkRlbGVnYXRlLFxuICAgICAgICBuZXdMZWFmT3duZXIsXG4gICAgICAgIGxvZ1dyYXBwZXI6IFNQTF9OT09QX1BST0dSQU1fSUQsXG4gICAgICAgIGNvbXByZXNzaW9uUHJvZ3JhbTogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgYW5jaG9yUmVtYWluaW5nQWNjb3VudHM6IHByb29mUGF0aCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IFsuLi5hc3NldFByb29mLnZhbHVlLnJvb3QudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgZGF0YUhhc2g6IFsuLi5jb21wcmVzc2lvbi5kYXRhX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgY3JlYXRvckhhc2g6IFtcbiAgICAgICAgICAuLi5jb21wcmVzc2lvbi5jcmVhdG9yX2hhc2gudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpLFxuICAgICAgICBdLFxuICAgICAgICBub25jZTogbGVhZk5vbmNlLFxuICAgICAgICBpbmRleDogbGVhZk5vbmNlLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiB0cmFuc2ZlciBuZnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBkZXN0XG4gICAqIEBwYXJhbSB7U2VjcmV0W119IG93bmVyT3JNdWx0aXNpZ1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgdHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIG93bmVyT3JNdWx0aXNpZzogU2VjcmV0W10sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IG93bmVyT3JNdWx0aXNpZy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuICAgICAgY29uc3QgaW5zdCA9IGF3YWl0IGNyZWF0ZVRyYW5zZmVyKG1pbnQsIG93bmVyLCBkZXN0KTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihbaW5zdF0sIGtleXBhaXJzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBpc0Jyb3dzZXIsIGlzTm9kZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IEZpbGVUeXBlLCBJZGVudGl0eSwgVGFncywgVXBsb2FkYWJsZUZpbGVUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IFBoYW50b21Qcm92aWRlciB9IGZyb20gJ34vdHlwZXMvcGhhbnRvbSc7XG5pbXBvcnQgSXJ5cywgeyBXZWJJcnlzIH0gZnJvbSAnQGlyeXMvc2RrJztcbmltcG9ydCB7IFVwbG9hZFJlc3BvbnNlIH0gZnJvbSAnQGlyeXMvc2RrL2J1aWxkL2VzbS9jb21tb24vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFByb3ZlbmFuY2VMYXllciB7XG4gIGNvbnN0IFRPS0VOID0gJ3NvbGFuYSc7XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgdXBsb2FkRmlsZTogRmlsZVR5cGUsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICAgIHRhZ3M/OiBUYWdzLFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBsZXQgcmVjZWlwdCE6IFVwbG9hZFJlc3BvbnNlO1xuICAgIGlmIChpc1VwbG9hZGFibGUodXBsb2FkRmlsZSkpIHtcbiAgICAgIHJlY2VpcHQgPSBhd2FpdCBpcnlzLnVwbG9hZEZpbGUodXBsb2FkRmlsZSwgeyB0YWdzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggZmlsZSB0eXBlIG9yIGVudmlyb21lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke0NvbnN0YW50cy5JUllTX0dBVEVXQVlfVVJMfS8ke3JlY2VpcHQuaWR9YDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBkYXRhOiBzdHJpbmcsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICAgIHRhZ3M/OiBUYWdzLFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCByZWNlaXB0ID0gYXdhaXQgaXJ5cy51cGxvYWQoZGF0YSwgeyB0YWdzIH0pO1xuICAgIHJldHVybiBgJHtDb25zdGFudHMuSVJZU19HQVRFV0FZX1VSTH0vJHtyZWNlaXB0LmlkfWA7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzTm9kZWFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNCcm93c2VyYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEZpbGUgPT4ge1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1VwbG9hZGFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBVcGxvYWRhYmxlRmlsZVR5cGUgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZnVuZEFyd2VhdmUgPSBhc3luYyAoXG4gICAgdXBsb2FkRmlsZTogRmlsZVR5cGUsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgYnl0ZUxlbmd0aCA9IGF3YWl0IHRvQnl0ZUxlbmd0aCh1cGxvYWRGaWxlKTtcbiAgICBjb25zdCB3aWxsUGF5ID0gYXdhaXQgY2FsY3VsYXRlQ29zdChieXRlTGVuZ3RoLCBpZGVudGl0eSk7XG4gICAgY29uc3QgZnVuZFR4ID0gYXdhaXQgaXJ5cy5mdW5kKGlyeXMudXRpbHMudG9BdG9taWMod2lsbFBheSkpO1xuICAgIGRlYnVnTG9nKCcjIGZ1bmRUeDogJywgZnVuZFR4KTtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IHRvQnl0ZUxlbmd0aCA9IGFzeW5jIChjb250ZW50OiBGaWxlVHlwZSk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgbGV0IGxlbmd0aDogbnVtYmVyID0gMTAwO1xuICAgIGlmIChpc05vZGVhYmxlKGNvbnRlbnQpKSB7XG4gICAgICBsZW5ndGggPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoY29udGVudCkubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyYWJsZShjb250ZW50KSkge1xuICAgICAgbGVuZ3RoID0gY29udGVudC5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggY29udGVudCB0eXBlJyk7XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXRJcnlzID0gYXN5bmMgPFQgZXh0ZW5kcyBJcnlzIHwgV2ViSXJ5cz4oXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICApID0+IHtcbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZ2V0Tm9kZUlyeXMoaWRlbnRpdHkgYXMgU2VjcmV0KSkgYXMgVDtcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGdldEJyb3dzZXJJcnlzKGlkZW50aXR5IGFzIFBoYW50b21Qcm92aWRlcikpIGFzIFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdPbmx5IE5vZGUuanMgb3IgQnJvd3NlcicpO1xuICAgIH1cbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldE5vZGVJcnlzID0gYXN5bmMgKHNlY3JldDogU2VjcmV0KSA9PiB7XG4gICAgY29uc3QgY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICB9KTtcbiAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMO1xuICAgIGNvbnN0IHRva2VuID0gVE9LRU47XG4gICAgY29uc3Qga2V5ID0gc2VjcmV0O1xuICAgIGNvbnN0IGlyeXMgPSBuZXcgSXJ5cyh7XG4gICAgICB1cmwsXG4gICAgICB0b2tlbixcbiAgICAgIGtleSxcbiAgICAgIGNvbmZpZzogeyBwcm92aWRlclVybDogY2x1c3RlclVybCB9LFxuICAgIH0pO1xuICAgIHJldHVybiBpcnlzO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0QnJvd3NlcklyeXMgPSBhc3luYyAoXG4gICAgcHJvdmlkZXI6IFBoYW50b21Qcm92aWRlcixcbiAgKTogUHJvbWlzZTxXZWJJcnlzPiA9PiB7XG4gICAgY29uc3QgY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICB9KTtcbiAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMO1xuICAgIGNvbnN0IHRva2VuID0gVE9LRU47XG4gICAgY29uc3Qgd2FsbGV0ID0geyBycGNVcmw6IGNsdXN0ZXJVcmwsIG5hbWU6IFRPS0VOLCBwcm92aWRlcjogcHJvdmlkZXIgfTtcbiAgICBjb25zdCB3ZWJJcnlzID0gbmV3IFdlYklyeXMoeyB1cmwsIHRva2VuLCB3YWxsZXQgfSk7XG4gICAgYXdhaXQgd2ViSXJ5cy5yZWFkeSgpO1xuICAgIHJldHVybiB3ZWJJcnlzO1xuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZUNvc3QgPSBhc3luYyAoc2l6ZTogbnVtYmVyLCBpZGVudGl0eTogSWRlbnRpdHkpID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgcHJpY2VBdG9taWMgPSBhd2FpdCBpcnlzLmdldFByaWNlKHNpemUpO1xuICAgIGNvbnN0IHByaWNlQ29udmVydGVkID0gaXJ5cy51dGlscy5mcm9tQXRvbWljKHByaWNlQXRvbWljKTtcbiAgICBkZWJ1Z0xvZygnIyBzaXplOiAnLCBzaXplKTtcbiAgICBkZWJ1Z0xvZyhgIyBwcmljZTogJHtwcmljZUNvbnZlcnRlZH1gKTtcbiAgICByZXR1cm4gcHJpY2VDb252ZXJ0ZWQ7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHJvdmVuYW5jZUxheWVyIH0gZnJvbSAnLi9wcm92ZW5hbmNlLWxheWVyJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFyd2VhdmUge1xuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IChcbiAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBmaWxlOiAnLCBmaWxlUGF0aCk7XG4gICAgICBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIuZnVuZEFyd2VhdmUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICAgIHJldHVybiBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIudXBsb2FkRmlsZShmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gKFxuICAgIG1ldGFkYXRhOiBPZmZjaGFpbixcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGEgZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgcmV0dXJuIGF3YWl0IFByb3ZlbmFuY2VMYXllci51cGxvYWREYXRhKFxuICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSksXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBCbG9iLCBORlRTdG9yYWdlIH0gZnJvbSAnbmZ0LnN0b3JhZ2UnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQcm92ZW5hbmNlTGF5ZXIgfSBmcm9tICcuL3Byb3ZlbmFuY2UtbGF5ZXInO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOZnRTdG9yYWdlIHtcbiAgY29uc3QgY3JlYXRlR2F0ZXdheVVybCA9IChjaWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGAke0NvbnN0YW50cy5ORlRfU1RPUkFHRV9HQVRFV0FZX1VSTH0vJHtjaWR9YDtcblxuICBjb25zdCBjb25uZWN0ID0gKCkgPT4ge1xuICAgIENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuY2FsY3VsYXRlUHJvYmFiaWxpdHkoKSAmJlxuICAgICAgY29uc29sZS53YXJuKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuTkZUX1NUT1JBR0VfQVBJX0tFWSk7XG4gICAgcmV0dXJuIG5ldyBORlRTdG9yYWdlKHsgdG9rZW46IENvbnN0YW50cy5ORlRfU1RPUkFHRV9BUElfS0VZIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIGZpbGVUeXBlOiBGaWxlVHlwZSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlVHlwZSk7XG4gICAgICBsZXQgZmlsZSE6IEJ1ZmZlcjtcbiAgICAgIGlmIChQcm92ZW5hbmNlTGF5ZXIuaXNOb2RlYWJsZShmaWxlVHlwZSkpIHtcbiAgICAgICAgZmlsZSA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlVHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKFByb3ZlbmFuY2VMYXllci5pc0Jyb3dzZXJhYmxlKGZpbGVUeXBlKSkge1xuICAgICAgICBmaWxlID0gQnVmZmVyLmZyb20oYXdhaXQgZmlsZVR5cGUuYXJyYXlCdWZmZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlID0gQnVmZmVyLmZyb20oZmlsZVR5cGUgYXMgQXJyYXlCdWZmZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9iSW1hZ2UgPSBuZXcgQmxvYihbZmlsZV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSW1hZ2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnRcbiAgICpcbiAgICogQHBhcmFtIHtPZmZjaGFpbn0gc3RvcmFnZURhdGFcbiAgICoge1xuICAgKiAgIG5hbWU/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZGVzY3JpcHRpb24/OiB7c3RyaW5nfSAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgc2VsbGVyRmVlQmFzaXNQb2ludHM/OiBudW1iZXIgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGltYWdlPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAvLyB1cGxvYWRlZCB1cmkgb2Ygb3JpZ2luYWwgY29udGVudFxuICAgKiAgIGV4dGVybmFsX3VybD86IHtzdHJpbmd9ICAgICAgICAgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IHtKc29uTWV0YWRhdGFBdHRyaWJ1dGVbXX0gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiB7SnNvbk1ldGFkYXRhUHJvcGVydGllczxVcmk+fSAvLyBpbmNsdWRlZCBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uICAgICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddOiB7dW5rbm93bn0gICAgICAgICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIHN0b3JhZ2VEYXRhOiBPZmZjaGFpbixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhZGF0YTogJywgc3RvcmFnZURhdGEpO1xuXG4gICAgICBjb25zdCBibG9iSnNvbiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzdG9yYWdlRGF0YSldKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkpzb24pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluLCBTdG9yYWdlVHlwZSB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBBcndlYXZlIH0gZnJvbSAnLi9hcndlYXZlJztcbmltcG9ydCB7IE5mdFN0b3JhZ2UgfSBmcm9tICcuL25mdC1zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTdG9yYWdlIHtcbiAgZXhwb3J0IGNvbnN0IHRvQ29udmVydE9mZmNoYWluZGF0YSA9IChcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICApOiBPZmZjaGFpbiA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgIGRlc2NyaXB0aW9uOiBpbnB1dC5kZXNjcmlwdGlvbixcbiAgICAgIHNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzOiBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgIGV4dGVybmFsX3VybDogaW5wdXQuZXh0ZXJuYWxfdXJsLFxuICAgICAgYXR0cmlidXRlczogaW5wdXQuYXR0cmlidXRlcyxcbiAgICAgIHByb3BlcnRpZXM6IGlucHV0LnByb3BlcnRpZXMsXG4gICAgICBpbWFnZTogJycsXG4gICAgICBvcHRpb25zOiBpbnB1dC5vcHRpb25zLFxuICAgIH07XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWRGaWxlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWRGaWxlKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBzdG9yYWdlVHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBpbnB1dDogT2ZmY2hhaW4sXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZERhdGEoaW5wdXQsIGZlZVBheWVyKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZERhdGEoaW5wdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IE9mZmNoYWluLFxuICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScgJiYgIWZlZVBheWVyKSB7XG4gICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgfVxuICAgIGNvbnN0IHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICBhd2FpdCB1cGxvYWRGaWxlKGZpbGVQYXRoLCBzdG9yYWdlVHlwZSwgZmVlUGF5ZXIpXG4gICAgKS51bndyYXAoXG4gICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICByZXR1cm4gYXdhaXQgdXBsb2FkRGF0YShpbnB1dCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgIH0sXG4gICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9LFxuICAgICk7XG5cbiAgICBpZiAoIXN0b3JhZ2UpIHtcbiAgICAgIHRocm93IEVycm9yKCdFbXB0eSBzdG9yYWdlIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gc3RvcmFnZTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBBTExfREVQVEhfU0laRV9QQUlSUyxcbiAgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LFxuICBnZXRDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnRTaXplLFxuICBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICBTUExfTk9PUF9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC1hY2NvdW50LWNvbXByZXNzaW9uJztcbmltcG9ydCB7IE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC1idWJibGVndW0nO1xuaW1wb3J0IHsgUHVibGljS2V5LCBTeXN0ZW1Qcm9ncmFtIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGNyZWF0ZUNyZWF0ZVRyZWVJbnN0cnVjdGlvbiB9IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFNwYWNlT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvY29tcHJlc3NlZC1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbXByZXNzZWROZnQge1xuICBleHBvcnQgY2xhc3MgU3BhY2Uge1xuICAgIHNwYWNlT3duZXI6IFB1YmtleTtcbiAgICBjb25zdHJ1Y3RvcihzcGFjZU93bmVyOiBQdWJrZXkpIHtcbiAgICAgIHRoaXMuc3BhY2VPd25lciA9IHNwYWNlT3duZXI7XG4gICAgfVxuXG4gICAgZ2V0QXNzZXRJZCA9IGFzeW5jICgpOiBQcm9taXNlPFB1YmtleT4gPT4ge1xuICAgICAgY29uc3QgdHJlZUFjY291bnQgPSBhd2FpdCBDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnQuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdGhpcy5zcGFjZU93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgbGVhZkluZGV4ID0gdHJlZUFjY291bnQudHJlZS5yaWdodE1vc3RQYXRoLmluZGV4IC0gMTtcbiAgICAgIHJldHVybiBBY2NvdW50LlBkYS5nZXRBc3NldElkKHRoaXMuc3BhY2VPd25lciwgbGVhZkluZGV4KTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIG5ldyBtYXJrbGUgdHJlZVxuICAgKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4RGVwdGhcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1heEJ1ZmZlclNpemVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNhbm9weURlcHRoXG4gICAqIEBwYXJhbSB7UGFydGlhbDxTcGFjZU9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgaW5pdFNwYWNlID0gKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgbWF4RGVwdGg6IG51bWJlcixcbiAgICBtYXhCdWZmZXJTaXplOiBudW1iZXIsXG4gICAgY2Fub3B5RGVwdGg6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFNwYWNlT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXI7XG4gICAgICBjb25zdCB0cmVlT3duZXIgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG4gICAgICBjb25zdCBzcGFjZSA9IGdldENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudFNpemUoXG4gICAgICAgIG1heERlcHRoLFxuICAgICAgICBtYXhCdWZmZXJTaXplLFxuICAgICAgICBjYW5vcHlEZXB0aCxcbiAgICAgICk7XG4gICAgICBjb25zdCBbdHJlZUF1dGhvcml0eV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW3RyZWVPd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXkudG9CdWZmZXIoKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFtdO1xuXG4gICAgICBkZWJ1Z0xvZyhgIyBtYXhEZXB0aDogJHttYXhEZXB0aH0sIG1heEJ1ZmZlclNpemU6ICR7bWF4QnVmZmVyU2l6ZX1gKTtcbiAgICAgIGRlYnVnTG9nKCcjIG5mdCBzcGFjZTogJywgc3BhY2UpO1xuXG4gICAgICBpZiAoQ29uc3RhbnRzLmlzRGVidWdnaW5nID09PSAndHJ1ZScgfHwgcHJvY2Vzcy5lbnYuREVCVUcgPT09ICd0cnVlJykge1xuICAgICAgICBkZWJ1Z0xvZygnIyBzcGFjZSBjb3N0OiAnLCBhd2FpdCBjYWxjdWxhdGVTcGFjZUNvc3Qoc3BhY2UpKTtcbiAgICAgIH1cblxuICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgIFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICAgICAgZnJvbVB1YmtleTogcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgIG5ld0FjY291bnRQdWJrZXk6IHRyZWVPd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgbGFtcG9ydHM6XG4gICAgICAgICAgICBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRpb24oc3BhY2UpLFxuICAgICAgICAgIHNwYWNlOiBzcGFjZSxcbiAgICAgICAgICBwcm9ncmFtSWQ6IFNQTF9BQ0NPVU5UX0NPTVBSRVNTSU9OX1BST0dSQU1fSUQsXG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgIGNyZWF0ZUNyZWF0ZVRyZWVJbnN0cnVjdGlvbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXJrbGVUcmVlOiB0cmVlT3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICAgdHJlZUF1dGhvcml0eSxcbiAgICAgICAgICAgIHRyZWVDcmVhdG9yOiBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgICBwYXllcjogcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICAgbG9nV3JhcHBlcjogU1BMX05PT1BfUFJPR1JBTV9JRCxcbiAgICAgICAgICAgIGNvbXByZXNzaW9uUHJvZ3JhbTogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1heEJ1ZmZlclNpemUsXG4gICAgICAgICAgICBtYXhEZXB0aCxcbiAgICAgICAgICAgIHB1YmxpYzogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAgW3RyZWVPd25lci50b0tleXBhaXIoKSwgb3duZXIudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgdHJlZU93bmVyLnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBhIG5ldyBuZnQgc3BhY2VcbiAgICogVGhpcyBmdW5jdGlvbiBuZWVkcyBvbmx5IDEgY2FsbFxuICAgKlxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNwYWNlU2l6ZVxuICAgKiBAcGFyYW0ge1BhcnRpYWw8U3BhY2VPcHRpb25zPn0gb3B0aW9uc1xuICAgKlxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRUcmFuc2FjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZVNwYWNlID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgc3BhY2VTaXplOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxTcGFjZU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIGNvbnN0IHsgbWF4RGVwdGgsIG1heEJ1ZmZlclNpemUsIGNhbm9weURlcHRoIH0gPVxuICAgICAgY2FsY3VsYXRlU3BhY2VOdW1iZXJUb0RlcHRoKHNwYWNlU2l6ZSk7XG4gICAgcmV0dXJuIGluaXRTcGFjZShvd25lciwgbWF4RGVwdGgsIG1heEJ1ZmZlclNpemUsIGNhbm9weURlcHRoLCBvcHRpb25zKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHNwYWNlIGNvc3RcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHNwYWNlU2l6ZVxuICAgKiBAcmV0dXJuIFByb21pc2U8e3NvbDogbnVtYmVyfT5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVTcGFjZUNvc3QgPSBhc3luYyAoc3BhY2VTaXplOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB7IG1heERlcHRoLCBtYXhCdWZmZXJTaXplLCBjYW5vcHlEZXB0aCB9ID1cbiAgICAgIGNhbGN1bGF0ZVNwYWNlTnVtYmVyVG9EZXB0aChzcGFjZVNpemUpO1xuICAgIGNvbnN0IHJlcXVpcmVkU3BhY2UgPSBnZXRDb25jdXJyZW50TWVya2xlVHJlZUFjY291bnRTaXplKFxuICAgICAgbWF4RGVwdGgsXG4gICAgICBtYXhCdWZmZXJTaXplLFxuICAgICAgY2Fub3B5RGVwdGgsXG4gICAgKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9XG4gICAgICBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRpb24oXG4gICAgICAgIHJlcXVpcmVkU3BhY2UsXG4gICAgICApO1xuICAgIHJldHVybiB7IHNvbDogbGFtcG9ydHMudG9Tb2woKSB9O1xuICB9O1xuXG4gIC8vLyBJbml0aWFsaXphdGlvbiBwYXJhbWV0ZXJzIGZvciBhbiBTUEwgQ29uY3VycmVudE1lcmtsZVRyZWUuXG4gIC8vL1xuICAvLy8gT25seSB0aGUgZm9sbG93aW5nIHBlcm11dGF0aW9ucyBhcmUgdmFsaWQ6XG4gIC8vL1xuICAvLy8gfCBtYXhfZGVwdGggfCBtYXhfYnVmZmVyX3NpemUgICAgICAgfFxuICAvLy8gfCAtLS0tLS0tLS0gfCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0gfFxuICAvLy8gfCAzICAgICAgICAgfCAoOCkgICAgICAgICAgICAgICAgICAgfCBub2RlOiA4XG4gIC8vLyB8IDE0ICAgICAgICB8ICg2NCwgMjU2LCAxMDI0LCAyMDQ4KSB8IG5vZGU6IDE2LDM4NFxuICAvLy8gfCAyMCAgICAgICAgfCAoNjQsIDI1NiwgMTAyNCwgMjA0OCkgfCBub2RlOiAxMzEsMDcyXG4gIC8vLyB8IDI0ICAgICAgICB8ICg2NCwgMjU2LCA1MTIsIDEwMjQsIDIwNDgpIHwgbm9kZTogMSwwNDgsNTc2XG4gIC8vLyB8IDI2ICAgICAgICB8ICg2NCwgMjU2LCA1MTIsIDEwMjQsIDIwNDgpIHwgbm9kZTogPz8/XG4gIC8vLyB8IDMwICAgICAgICB8ICg1MTIsIDEwMjQsIDIwNDgpIHwgbm9kZTogMSwwNzMsNzQxLDgyNFxuICBjb25zdCBjYWxjdWxhdGVTcGFjZU51bWJlclRvRGVwdGggPSAoc3BhY2U6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGxvZzIgPSBNYXRoLmNlaWwoTWF0aC5sb2cyKHNwYWNlKSk7XG4gICAgZGVidWdMb2coJyMgbG9nMjogJywgbG9nMiwgMiAqKiBsb2cyKTtcbiAgICBjb25zdCBtYXRjaGVkID0gQUxMX0RFUFRIX1NJWkVfUEFJUlMuZmlsdGVyKFxuICAgICAgKHBhaXIpID0+IHBhaXIubWF4RGVwdGggPT09IGxvZzIsXG4gICAgKVswXTtcbiAgICBjb25zdCBjYW5vcHlEZXB0aCA9IG1hdGNoZWQubWF4RGVwdGggLSA1O1xuICAgIHJldHVybiB7XG4gICAgICBtYXhEZXB0aDogbWF0Y2hlZC5tYXhEZXB0aCxcbiAgICAgIG1heEJ1ZmZlclNpemU6IG1hdGNoZWQubWF4QnVmZmVyU2l6ZSxcbiAgICAgIGNhbm9weURlcHRoLFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdG9yYWdlJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCwgVmFsaWRhdG9yIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgRGFzQXBpIH0gZnJvbSAnfi9kYXMtYXBpJztcbmltcG9ydCB7IENvbXByZXNzZWROZnQgYXMgU3BhY2UgfSBmcm9tICcuL3NwYWNlJztcbmltcG9ydCB7XG4gIGNvbXB1dGVDcmVhdG9ySGFzaCxcbiAgY29tcHV0ZURhdGFIYXNoLFxuICBjcmVhdGVNaW50VG9Db2xsZWN0aW9uVjFJbnN0cnVjdGlvbixcbiAgY3JlYXRlVmVyaWZ5Q3JlYXRvckluc3RydWN0aW9uLFxuICBDcmVhdG9yLFxuICBNZXRhZGF0YUFyZ3MsXG4gIFBST0dSQU1fSUQgYXMgQlVCQkxFR1VNX1BST0dSQU1fSUQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHtcbiAgQ29uY3VycmVudE1lcmtsZVRyZWVBY2NvdW50LFxuICBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICBTUExfTk9PUF9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC1hY2NvdW50LWNvbXByZXNzaW9uJztcblxuaW1wb3J0IHsgUFJPR1JBTV9JRCBhcyBUT0tFTl9NRVRBREFUQV9QUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7XG4gIEFjY291bnRNZXRhLFxuICBQdWJsaWNLZXksXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvY29tcHJlc3NlZC1uZnQnO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVWZXJpZnlDcmVhdG9yID0gYXN5bmMgKFxuICAgIGNyZWF0b3JzOiBDcmVhdG9yW10sXG4gICAgYXNzZXRJZDogUHVibGljS2V5LFxuICAgIHRyZWVPd25lcjogUHVibGljS2V5LFxuICAgIG1ldGFkYXRhOiBNZXRhZGF0YUFyZ3MsXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uPiA9PiB7XG4gICAgY29uc3QgcnBjQXNzZXRQcm9vZiA9IGF3YWl0IERhc0FwaS5nZXRBc3NldFByb29mKGFzc2V0SWQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgcnBjQXNzZXQgPSBhd2FpdCBEYXNBcGkuZ2V0QXNzZXQoYXNzZXRJZC50b1N0cmluZygpKTtcbiAgICBpZiAocnBjQXNzZXRQcm9vZi5pc0VyciB8fCBycGNBc3NldC5pc0Vycikge1xuICAgICAgdGhyb3cgRXJyb3IoJ1Jpc2UgZXJyb3Igd2hlbiBnZXQgYXNzZXQgcHJvb2Ygb3IgYXNzZXQnKTtcbiAgICB9XG4gICAgY29uc3QgY29tcHJlc3Npb24gPSBycGNBc3NldC52YWx1ZS5jb21wcmVzc2lvbjtcbiAgICBjb25zdCBvd25lcnNoaXAgPSBycGNBc3NldC52YWx1ZS5vd25lcnNoaXA7XG4gICAgY29uc3QgYXNzZXRQcm9vZiA9IHJwY0Fzc2V0UHJvb2YudmFsdWU7XG5cbiAgICBjb25zdCB0cmVlQWNjb3VudCA9IGF3YWl0IENvbmN1cnJlbnRNZXJrbGVUcmVlQWNjb3VudC5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgIHRyZWVPd25lcixcbiAgICApO1xuICAgIGNvbnN0IGNhbm9weURlcHRoID0gdHJlZUFjY291bnQuZ2V0Q2Fub3B5RGVwdGgoKTtcbiAgICBjb25zdCBzbGljZWRQcm9vZjogQWNjb3VudE1ldGFbXSA9IGFzc2V0UHJvb2YucHJvb2ZcbiAgICAgIC5tYXAoKG5vZGU6IHN0cmluZykgPT4gKHtcbiAgICAgICAgcHVia2V5OiBub2RlLnRvUHVibGljS2V5KCksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9KSlcbiAgICAgIC5zbGljZSgwLCBhc3NldFByb29mLnByb29mLmxlbmd0aCAtIChjYW5vcHlEZXB0aCA/IGNhbm9weURlcHRoIDogMCkpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZVZlcmlmeUNyZWF0b3JJbnN0cnVjdGlvbihcbiAgICAgIHtcbiAgICAgICAgdHJlZUF1dGhvcml0eTogdHJlZU93bmVyLFxuICAgICAgICBsZWFmT3duZXI6IG93bmVyc2hpcC5vd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBsZWFmRGVsZWdhdGU6IChvd25lcnNoaXAuZGVsZWdhdGUgfHwgb3duZXJzaGlwLm93bmVyKS50b1B1YmxpY0tleSgpLFxuICAgICAgICBtZXJrbGVUcmVlOiBhc3NldFByb29mLnRyZWVfaWQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuXG4gICAgICAgIGxvZ1dyYXBwZXI6IFNQTF9OT09QX1BST0dSQU1fSUQsXG4gICAgICAgIGNvbXByZXNzaW9uUHJvZ3JhbTogU1BMX0FDQ09VTlRfQ09NUFJFU1NJT05fUFJPR1JBTV9JRCxcbiAgICAgICAgY3JlYXRvcjogZmVlUGF5ZXIsXG5cbiAgICAgICAgLy8gcHJvdmlkZSB0aGUgc2xpY2VkIHByb29mXG4gICAgICAgIGFuY2hvclJlbWFpbmluZ0FjY291bnRzOiBzbGljZWRQcm9vZixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IFsuLi5hc3NldFByb29mLnJvb3QudHJpbSgpLnRvUHVibGljS2V5KCkudG9CeXRlcygpXSxcbiAgICAgICAgY3JlYXRvckhhc2g6IFsuLi5jb21wdXRlQ3JlYXRvckhhc2goY3JlYXRvcnMpXSxcbiAgICAgICAgZGF0YUhhc2g6IFsuLi5jb21wdXRlRGF0YUhhc2gobWV0YWRhdGEpXSxcbiAgICAgICAgbm9uY2U6IGNvbXByZXNzaW9uLmxlYWZfaWQsXG4gICAgICAgIGluZGV4OiBjb21wcmVzc2lvbi5sZWFmX2lkLFxuICAgICAgICBtZXNzYWdlOiBtZXRhZGF0YSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnQgYW5kIENvbXByZXNzZWQgTkZUIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyICAgICAgICAgLy8gb3duZXIncyBTZWNyZXRcbiAgICogQHBhcmFtIHtJbnB1dE5mdE1ldGFkYXRhfSBpbnB1dFxuICAgKiB7XG4gICAqICAgbmFtZTogc3RyaW5nICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbDogc3RyaW5nICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZmlsZVBhdGg6IHN0cmluZyB8IEZpbGUgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyBEZWNlbnRyYWxpemVkIHN0b3JhZ2VcbiAgICogICBkZXNjcmlwdGlvbj86IHN0cmluZyAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIGV4dGVybmFsX3VybD86IHN0cmluZyAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzogTWV0YWRhdGFBdHRyaWJ1dGVbXSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IE1ldGFkYXRhUHJvcGVydGllczxVcmk+IC8vIGluY2x1ZGUgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogUHVia2V5ICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogICBvcHRpb25zPzogW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHBhcmFtIHtQdWJrZXl9IHRyZWVPd25lciAgICAgIC8vIFByZXZpb3VzbHkgY3JlYXRlZCB0cmVlT3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGNvbGxlY3Rpb25NaW50IC8vIFByZXZpb3VzbHkgY3JlYXRlZCBjb2xsZWN0aW9uTWludFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zICAgICAgICAgLy8gbWludCBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIHRyZWVPd25lcjogUHVia2V5LFxuICAgIGNvbGxlY3Rpb25NaW50OiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZTxTcGFjZS5TcGFjZT4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXROZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBmZWVQYXllciwgcmVjZWl2ZXIsIGRlbGVnYXRlIH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogb3duZXI7XG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNLZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG4gICAgICBjb25zdCBsZWFmT3duZXIgPSByZWNlaXZlciA/IHJlY2VpdmVyLnRvUHVibGljS2V5KCkgOiBvd25lclB1YmxpY0tleTtcbiAgICAgIGNvbnN0IGxlYWZEZWxlZ2F0ZSA9IGRlbGVnYXRlXG4gICAgICAgID8gZGVsZWdhdGVcbiAgICAgICAgOiBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBwYXllciEgfSkucHVia2V5O1xuXG4gICAgICBjb25zdCB0cmVlQXV0aG9yaXR5ID0gQWNjb3VudC5QZGEuZ2V0VHJlZUF1dGhvcml0eShcbiAgICAgICAgdHJlZU93bmVyLnRvUHVibGljS2V5KCkudG9TdHJpbmcoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBjb2xsZWN0aW9uTWV0YWRhdGEgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShcbiAgICAgICAgY29sbGVjdGlvbk1pbnQudG9TdHJpbmcoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBjb2xsZWN0aW9uTWFzdGVyRWRpdGlvbkFjY291bnQgPSBBY2NvdW50LlBkYS5nZXRNYXN0ZXJFZGl0aW9uKFxuICAgICAgICBjb2xsZWN0aW9uTWludC50b1N0cmluZygpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGJ1YmJsZWd1bVNpZ25lciA9IEFjY291bnQuUGRhLmdldEJndW1TaWduZXIoKTtcblxuICAgICAgLy8gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnRcbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJveWFsdHkgPSBpbnB1dC5yb3lhbHR5ID8gaW5wdXQucm95YWx0eSA6IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IENvbnZlcnRlci5Sb3lhbHR5LmludG9JbmZyYShyb3lhbHR5KTtcbiAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgICAgLy8gdXBsb2FkZWQgZmlsZVxuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB7IGltYWdlOiBpbnB1dC51cmkgfTtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZERhdGEoXG4gICAgICAgICAgeyAuLi5zdG9yYWdlTWV0YWRhdGEsIC4uLmltYWdlIH0sXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb252ZXJ0ZWQgPSBDb252ZXJ0ZXIuQ29tcHJlc3NlZE5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBtZXRhZGF0YUFyZ3M6IE1ldGFkYXRhQXJncyA9IHtcbiAgICAgICAgLi4uY29udmVydGVkLFxuICAgICAgICBjb2xsZWN0aW9uOiB7IGtleTogY29sbGVjdGlvbk1pbnQudG9QdWJsaWNLZXkoKSwgdmVyaWZpZWQ6IGZhbHNlIH0sXG4gICAgICB9O1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgbWV0YWRhdGFBcmdzOiAnLCBtZXRhZGF0YUFyZ3MpO1xuXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICBjcmVhdGVNaW50VG9Db2xsZWN0aW9uVjFJbnN0cnVjdGlvbihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXJrbGVUcmVlOiB0cmVlT3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIHRyZWVBdXRob3JpdHksXG4gICAgICAgICAgICB0cmVlRGVsZWdhdGU6IG93bmVyUHVibGljS2V5LFxuICAgICAgICAgICAgcGF5ZXI6IHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICAgIGxlYWZPd25lcjogbGVhZk93bmVyLCAvLyByZWNlaXZlclxuICAgICAgICAgICAgbGVhZkRlbGVnYXRlOiBsZWFmRGVsZWdhdGUudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25BdXRob3JpdHk6IG93bmVyUHVibGljS2V5LFxuICAgICAgICAgICAgY29sbGVjdGlvbk1pbnQ6IGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBjb2xsZWN0aW9uTWV0YWRhdGEsXG4gICAgICAgICAgICBlZGl0aW9uQWNjb3VudDogY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50LFxuICAgICAgICAgICAgYnViYmxlZ3VtU2lnbmVyLFxuICAgICAgICAgICAgbG9nV3JhcHBlcjogU1BMX05PT1BfUFJPR1JBTV9JRCxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25BdXRob3JpdHlSZWNvcmRQZGE6IEJVQkJMRUdVTV9QUk9HUkFNX0lELFxuICAgICAgICAgICAgY29tcHJlc3Npb25Qcm9ncmFtOiBTUExfQUNDT1VOVF9DT01QUkVTU0lPTl9QUk9HUkFNX0lELFxuICAgICAgICAgICAgdG9rZW5NZXRhZGF0YVByb2dyYW06IFRPS0VOX01FVEFEQVRBX1BST0dSQU1fSUQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtZXRhZGF0YUFyZ3MsXG4gICAgICAgICAgfSxcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIGlmIChpbnB1dC5jcmVhdG9ycykge1xuICAgICAgICBjb25zdCBhc3NldElkID0gYXdhaXQgbmV3IFNwYWNlLlNwYWNlKHRyZWVPd25lcikuZ2V0QXNzZXRJZCgpO1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgICBhd2FpdCBjcmVhdGVWZXJpZnlDcmVhdG9yKFxuICAgICAgICAgICAgbWV0YWRhdGFBcmdzLmNyZWF0b3JzLFxuICAgICAgICAgICAgYXNzZXRJZC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgdHJlZU93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBtZXRhZGF0YUFyZ3MsXG4gICAgICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuTWludChcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBbb3duZXIudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgbmV3IFNwYWNlLlNwYWNlKHRyZWVPd25lciksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBhZGQgPSBhc3luYyAoXG4gICAgdG9rZW46IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG93bmVyT3JNdWx0aXNpZzogU2VjcmV0W10sXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZTxQdWJrZXk+LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgICBjb25zdCBrZXlwYWlycyA9IG93bmVyT3JNdWx0aXNpZy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCB0b2tlbkFzc29jaWF0ZWQgPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQXNzb2NpYXRlZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbjxQdWJrZXk+KFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgdG9rZW4sXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgIi8vQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZUFtb3VudCA9IChcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICApOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBhbW91bnQgKiAxMCAqKiBtaW50RGVjaW1hbDtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEJ1cm5PcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG93bmVyT3JNdWx0aXNpZzogU2VjcmV0W10sXG4gICAgYnVybkFtb3VudDogbnVtYmVyLFxuICAgIHRva2VuRGVjaW1hbHM6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEJ1cm5PcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUJ1cm5DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KGJ1cm5BbW91bnQsIHRva2VuRGVjaW1hbHMpLFxuICAgICAgICB0b2tlbkRlY2ltYWxzLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihbaW5zdF0sIGtleXBhaXJzLCBwYXllci50b0tleXBhaXIoKSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuaW1wb3J0IHsgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgT25FcnIsIE9uT2sgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7XG4gIE1ldGFkYXRhLFxuICBUb2tlblN0YW5kYXJkLFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFBhcnNlZEFjY291bnREYXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBVTkFCTEVfRVJST1JfUkVHRVggPSAvVW5hYmxlIHRvIGZpbmQgTWV0YWRhdGEgYWNjb3VudC87XG5cbiAgLy8gU29ydCBieSBsYXRlc3Qgd2l0aCB1bml4dGltZXN0YW1wIGZ1bmN0aW9uXG4gIGNvbnN0IHNvcnRCeVVpbml4VGltZXN0YW1wID1cbiAgICA8VCBleHRlbmRzIFJlZ3VsYXJOZnRNZXRhZGF0YSB8IFRva2VuTWV0YWRhdGE+KHNvcnRhYmxlOiBTb3J0RGlyZWN0aW9uKSA9PlxuICAgIChhOiBULCBiOiBUKTogbnVtYmVyID0+IHtcbiAgICAgIGlmICghYS5vZmZjaGFpbi5jcmVhdGVkX2F0KSB7XG4gICAgICAgIGEub2ZmY2hhaW4uY3JlYXRlZF9hdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoIWIub2ZmY2hhaW4uY3JlYXRlZF9hdCkge1xuICAgICAgICBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRhYmxlID09PSBTb3J0RGlyZWN0aW9uLkRlc2MpIHtcbiAgICAgICAgcmV0dXJuIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGEub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH0gZWxzZSBpZiAoc29ydGFibGUgPT09IFNvcnREaXJlY3Rpb24uQXNjKSB7XG4gICAgICAgIHJldHVybiBhLm9mZmNoYWluLmNyZWF0ZWRfYXQgLSBiLm9mZmNoYWluLmNyZWF0ZWRfYXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYi5vZmZjaGFpbi5jcmVhdGVkX2F0IC0gYS5vZmZjaGFpbi5jcmVhdGVkX2F0O1xuICAgICAgfVxuICAgIH07XG5cbiAgY29uc3QgY29udmVydGVyID0gPFQ+KFxuICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQsXG4gICAgbWV0YWRhdGE6IE1ldGFkYXRhLFxuICAgIGpzb246IE9mZmNoYWluLFxuICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICk6IFQgPT4ge1xuICAgIGlmICh0b2tlblN0YW5kYXJkID09PSBUb2tlblN0YW5kYXJkLkZ1bmdpYmxlKSB7XG4gICAgICByZXR1cm4gQ29udmVydGVyLlRva2VuTWV0YWRhdGEuaW50b1VzZXIoXG4gICAgICAgIHtcbiAgICAgICAgICBvbmNoYWluOiBtZXRhZGF0YSxcbiAgICAgICAgICBvZmZjaGFpbjoganNvbixcbiAgICAgICAgfSxcbiAgICAgICAgdG9rZW5BbW91bnQsXG4gICAgICApIGFzIFQ7XG4gICAgfSBlbHNlIGlmICh0b2tlblN0YW5kYXJkID09PSBUb2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlKSB7XG4gICAgICByZXR1cm4gQ29udmVydGVyLlJlZ3VsYXJOZnRNZXRhZGF0YS5pbnRvVXNlcih7XG4gICAgICAgIG9uY2hhaW46IG1ldGFkYXRhLFxuICAgICAgICBvZmZjaGFpbjoganNvbixcbiAgICAgIH0pIGFzIFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKGBObyBtYXRjaCB0b2tlblN0YW5kYXJkOiAke3Rva2VuU3RhbmRhcmR9YCk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZW5lcmljRmluZEJ5T3duZXIgPSBhc3luYyA8XG4gICAgVCBleHRlbmRzIFJlZ3VsYXJOZnRNZXRhZGF0YSB8IFRva2VuTWV0YWRhdGEsXG4gID4oXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBjYWxsYmFjazogKHJlc3VsdDogUmVzdWx0PFRbXSwgRXJyb3I+KSA9PiB2b2lkLFxuICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQsXG4gICAgc29ydGFibGU/OiBTb3J0RGlyZWN0aW9uLFxuICAgIGlzSG9sZGVyPzogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBkYXRhOiBUW10gPSBbXTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBjb25uZWN0aW9uLmdldFBhcnNlZFRva2VuQWNjb3VudHNCeU93bmVyKFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgaW5mby52YWx1ZS5sZW5ndGggPT09IDAgJiYgY2FsbGJhY2soUmVzdWx0Lm9rKFtdKSk7XG5cbiAgICAgIGZvciBhd2FpdCAoY29uc3QgZCBvZiBpbmZvLnZhbHVlKSB7XG4gICAgICAgIGlmIChpc0hvbGRlciAmJiBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby50b2tlbkFtb3VudC51aUFtb3VudCA8IDEpIHtcbiAgICAgICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgICAgICcjIGZpbmRCeU93bmVyIG5vIGhvbGQgbWV0YWRhdGE6ICcsXG4gICAgICAgICAgICBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mbyxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1pbnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby5taW50IGFzIFB1YmtleTtcbiAgICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby50b2tlbkFtb3VudFxuICAgICAgICAgIC5hbW91bnQgYXMgc3RyaW5nO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgICAgICBjb25uZWN0aW9uLFxuICAgICAgICAgICAgQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlPd25lciBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgICAgIC8vIHRva2VuU3RhbmRhcmQ6IDAoTkZUKSBvciAyIChTUEwtVE9LRU4pXG4gICAgICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgIT09IHRva2VuU3RhbmRhcmQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICByZXNwb25zZVxuICAgICAgICAgICAgICAgIC5qc29uKClcbiAgICAgICAgICAgICAgICAudGhlbigoanNvbjogT2ZmY2hhaW4pID0+IHtcbiAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChcbiAgICAgICAgICAgICAgICAgICAgY29udmVydGVyPFQ+KHRva2VuU3RhbmRhcmQsIG1ldGFkYXRhLCBqc29uLCB0b2tlbkFtb3VudCksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0Lm9rKGRhdGEpKTsgLy8gbmVlZCB0aGlzIGNhbGwgP1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NBbGdvID0gc29ydEJ5VWluaXhUaW1lc3RhbXA8VD4oU29ydERpcmVjdGlvbi5EZXNjKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGFzY0FsZ28gPSBzb3J0QnlVaW5peFRpbWVzdGFtcDxUPihTb3J0RGlyZWN0aW9uLkFzYyk7XG4gICAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUgPT09IFNvcnREaXJlY3Rpb24uRGVzYykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5zb3J0KGRlc2NBbGdvKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc29ydGFibGUgPT09IFNvcnREaXJlY3Rpb24uQXNjKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNvcnQoYXNjQWxnbyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQub2soZGF0YSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvciAmJiBVTkFCTEVfRVJST1JfUkVHRVgudGVzdChlLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBkZWJ1Z0xvZygnIyBza2lwIGVycm9yIGZvciBvbGQgU1BMLVRPS0VOOiAnLCBtaW50KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZW5lcmljRmluZEJ5TWludCA9IGFzeW5jIDxcbiAgICBUIGV4dGVuZHMgUmVndWxhck5mdE1ldGFkYXRhIHwgVG9rZW5NZXRhZGF0YSxcbiAgPihcbiAgICBtaW50OiBQdWJrZXksXG4gICAgdG9rZW5TdGFuZGFyZDogVG9rZW5TdGFuZGFyZCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQpLFxuICAgICAgKTtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmRCeU1pbnQgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgIC8vIHRva2VuU3RhbmRhcmQ6IDAoTkZUKSBvciAyIChTUEwtVE9LRU4pXG4gICAgICBpZiAobWV0YWRhdGEudG9rZW5TdGFuZGFyZCAhPT0gdG9rZW5TdGFuZGFyZCkge1xuICAgICAgICB0aHJvdyBFcnJvcigndG9rZW4gc3RhbmRhcmRzIGFyZSBkaWZmZXJlbnQnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBjb25uZWN0aW9uLmdldFBhcnNlZEFjY291bnRJbmZvKG1pbnQudG9QdWJsaWNLZXkoKSk7XG4gICAgICBjb25zdCB0b2tlbkFtb3VudCA9IChpbmZvLnZhbHVlPy5kYXRhIGFzIFBhcnNlZEFjY291bnREYXRhKS5wYXJzZWQuaW5mb1xuICAgICAgICAuc3VwcGx5IGFzIHN0cmluZztcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSAoYXdhaXQgKFxuICAgICAgICBhd2FpdCBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICkuanNvbigpKSBhcyBPZmZjaGFpbjtcbiAgICAgIHJldHVybiBSZXN1bHQub2soXG4gICAgICAgIGNvbnZlcnRlcjxUPih0b2tlblN0YW5kYXJkLCBtZXRhZGF0YSwgcmVzcG9uc2UsIHRva2VuQW1vdW50KSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZSBhcyBFcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgb3duZXIgUHVia2V5XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge09uT2t9IG9uT2sgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPbkVycn0gb25FcnIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHt7c29ydGFibGU/OiBTb3J0YWJsZSwgaXNIb2xkZXI/OiBib29sZWFufX0gb3B0aW9ucz9cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvbk9rOiBPbk9rPFRva2VuTWV0YWRhdGE+LFxuICAgIG9uRXJyOiBPbkVycixcbiAgICBvcHRpb25zPzogeyBzb3J0RGlyZWN0aW9uPzogU29ydERpcmVjdGlvbjsgaXNIb2xkZXI/OiBib29sZWFuIH0sXG4gICk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNvcnRhYmxlID0gIW9wdGlvbnM/LnNvcnREaXJlY3Rpb25cbiAgICAgID8gU29ydERpcmVjdGlvbi5EZXNjXG4gICAgICA6IG9wdGlvbnM/LnNvcnREaXJlY3Rpb247XG4gICAgY29uc3QgaXNIb2xkZXIgPSAhb3B0aW9ucz8uaXNIb2xkZXIgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZmxvYXRpbmctcHJvbWlzZXMgKi9cbiAgICBnZW5lcmljRmluZEJ5T3duZXI8VG9rZW5NZXRhZGF0YT4oXG4gICAgICBvd25lcixcbiAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgcmVzdWx0Lm1hdGNoKChvaykgPT4gb25PayhvayksIG9uRXJyKTtcbiAgICAgIH0sXG4gICAgICBUb2tlblN0YW5kYXJkLkZ1bmdpYmxlLFxuICAgICAgc29ydGFibGUsXG4gICAgICBpc0hvbGRlcixcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gYXdhaXQgZ2VuZXJpY0ZpbmRCeU1pbnQ8VG9rZW5NZXRhZGF0YT4obWludCwgVG9rZW5TdGFuZGFyZC5GdW5naWJsZSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUZyZWV6ZUFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IEZyZWV6ZU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEZyZWV6aW5nIGEgdGFyZ2V0IG5mdFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8QXV0aG9yaXR5T3B0aW9ucz59IG9wdGlvbnMgLy8gb3B0aW9uc1xuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRvciB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFBhcnRpYWxTaWduU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgZGVzdDogUHVia2V5LFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNLZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXJQdWJsaWNLZXkudG9TdHJpbmcoKSxcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgbGV0IGluc3QyO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG5cbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXR1cm4gYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICBpZiAoIWRlc3RUb2tlbi5pbnN0KSB7XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBbb3duZXIudG9LZXlwYWlyKCldLFxuICAgICAgICApO1xuICAgICAgICB0eC5hZGQoaW5zdDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmV0dXJuIGluc3RydWN0aW9uIGFuZCB1bmRlY2lkZWQgYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBbb3duZXIudG9LZXlwYWlyKCldLFxuICAgICAgICApO1xuICAgICAgICB0eC5hZGQoZGVzdFRva2VuLmluc3QpLmFkZChpbnN0Mik7XG4gICAgICB9XG5cbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICB0eC5wYXJ0aWFsU2lnbihvd25lci50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKGhleCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBTeXN0ZW1Qcm9ncmFtLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQXV0aG9yaXR5VHlwZSxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCxcbiAgTUlOVF9TSVpFLFxuICBUT0tFTl9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24sXG4gIERhdGFWMixcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZUZyZWV6ZUF1dGhvcml0eSA9IChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFB1YmxpY0tleSxcbiAgKTogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgQXV0aG9yaXR5VHlwZS5GcmVlemVBY2NvdW50LFxuICAgICAgZnJlZXplQXV0aG9yaXR5LFxuICAgICk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIHRva2VuTWV0YWRhdGE6IERhdGFWMixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICAgIGlzTXV0YWJsZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uW10+ID0+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgbGFtcG9ydHMgPSBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pO1xuICAgIGNvbnN0IG1ldGFkYXRhUGRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCB0b2tlbkFzc29jaWF0ZWQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gW107XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLFxuICAgICAgICBuZXdBY2NvdW50UHVia2V5OiBtaW50LFxuICAgICAgICBzcGFjZTogTUlOVF9TSVpFLFxuICAgICAgICBsYW1wb3J0czogbGFtcG9ydHMsXG4gICAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBvd25lcixcbiAgICAgICAgb3duZXIsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICAgIHRva2VuQXNzb2NpYXRlZCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIG1pbnQsXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgICBvd25lcixcbiAgICAgICAgQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudCh0b3RhbEFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YVBkYSxcbiAgICAgICAgICBtaW50LFxuICAgICAgICAgIG1pbnRBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY3JlYXRlTWV0YWRhdGFBY2NvdW50QXJnc1YzOiB7XG4gICAgICAgICAgICBkYXRhOiB0b2tlbk1ldGFkYXRhLFxuICAgICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcbiAgICByZXR1cm4gaW5zdHJ1Y3Rpb25zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTUEwtVE9LRU4gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXIgICAgICAvLyB0b2tlbiBvd25lciBTZWNyZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQW1vdW50IC8vIHRvdGFsIG51bWJlclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWwgLy8gdG9rZW4gZGVjaW1hbFxuICAgKiBAcGFyYW0ge0lucHV0VG9rZW5NZXRhZGF0YX0gaW5wdXQgICAgICAgLy8gdG9rZW4gbWV0YWRhdGFcbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9ucyAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGlucHV0OiBJbnB1dFRva2VuTWV0YWRhdGEsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dFRva2VuTWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBmZWVQYXllciwgZnJlZXplQXV0aG9yaXR5IH0gPSBvcHRpb25zO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IG93bmVyO1xuICAgICAgaW5wdXQucm95YWx0eSA9IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IDA7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0IGFzIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICAgIGlucHV0LnJveWFsdHksXG4gICAgICApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHsgaW1hZ2U6IGlucHV0LnVyaSB9O1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkRGF0YShcbiAgICAgICAgICB7IC4uLnN0b3JhZ2VNZXRhZGF0YSwgLi4uaW1hZ2UgfSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVyaSk7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IGNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgIHRvdGFsQW1vdW50LFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZUZyZWV6ZUF1dGhvcml0eShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuTWludChcbiAgICAgICAgaW5zdHMsXG4gICAgICAgIFtvd25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQge1xuICBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgVGhhd09wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIFRoYXdpbmcgYSB0YXJnZXQgTkZUXG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8VGhhd09wdGlvbnM+fSBvcHRpb25zICAvLyBvcHRpb25zXG4gICAqL1xuICBleHBvcnQgY29uc3QgdGhhdyA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFRoYXdPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRoYXdBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgc291cmNlVG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBzb3VyY2VUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFtpbnN0XSwga2V5cGFpcnMsIHBheWVyLnRvS2V5cGFpcigpKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTcGxUb2tlbiBhcyBBZGQgfSBmcm9tICcuL2FkZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBCdXJuIH0gZnJvbSAnLi9idXJuJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZpbmQgfSBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRnJlZXplIH0gZnJvbSAnLi9mcmVlemUnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgR2FzTGVzcyB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUaGF3IH0gZnJvbSAnLi90aGF3JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBjb25zdCBTcGxUb2tlbiA9IHtcbiAgLi4uQWRkLFxuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkdhc0xlc3MsXG4gIC4uLk1pbnQsXG4gIC4uLlRoYXcsXG4gIC4uLlRyYW5zZmVyLFxufTtcblxuZXhwb3J0ICogZnJvbSAnfi9zaGFyZWQvZXhwb3J0cyc7XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgQnVybk9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEJ1cm5PcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgcmV0dXJuIFNwbFRva2VuLmJ1cm4oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBvd25lck9yTXVsdGlzaWcsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICAgTkZUX0RFQ0lNQUxTLFxuICAgICAge1xuICAgICAgICBmZWVQYXllcixcbiAgICAgIH0sXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuaW1wb3J0IHsgT25FcnIsIE9uT2sgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5pbXBvcnQgeyBUb2tlblN0YW5kYXJkIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7T25Pa30gb25PayBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09uRXJyfSBvbkVyciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3tzb3J0YWJsZT86IFNvcnRhYmxlLCBpc0hvbGRlcj86IGJvb2xlYW59fSBvcHRpb25zP1xuICAgKiBAcmV0dXJuIFByb21pc2U8dm9pZD5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9uT2s6IE9uT2s8UmVndWxhck5mdE1ldGFkYXRhPixcbiAgICBvbkVycjogT25FcnIsXG4gICAgb3B0aW9ucz86IHsgc29ydGFibGU/OiBTb3J0RGlyZWN0aW9uOyBpc0hvbGRlcj86IGJvb2xlYW4gfSxcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3Qgc29ydGFibGUgPSAhb3B0aW9ucz8uc29ydGFibGVcbiAgICAgID8gU29ydERpcmVjdGlvbi5EZXNjXG4gICAgICA6IG9wdGlvbnM/LnNvcnRhYmxlO1xuICAgIGNvbnN0IGlzSG9sZGVyID0gIW9wdGlvbnM/LmlzSG9sZGVyID8gdHJ1ZSA6IGZhbHNlO1xuICAgIC8vIEhBQ0s6IGNoZWNrIHBlcmZvcm1hbmNlXG4gICAgYXdhaXQgU3BsVG9rZW4uZ2VuZXJpY0ZpbmRCeU93bmVyKFxuICAgICAgb3duZXIsXG4gICAgICAocmVzdWx0OiBSZXN1bHQ8bmV2ZXJbXSwgRXJyb3I+KSA9PiByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgaXNIb2xkZXIsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFJlZ3VsYXJOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IFNwbFRva2VuLmdlbmVyaWNGaW5kQnlNaW50KG1pbnQsIFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUpO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuaW1wb3J0IHsgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBjcmVhdGVGcmVlemVEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBBdXRob3JpdHlPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgLyoqXG4gICAqIEZyZWV6aW5nIGEgdGFyZ2V0IG5mdFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8QXV0aG9yaXR5T3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBlZGl0aW9uQWRkcmVzcyA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24obWludCk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24oe1xuICAgICAgICBkZWxlZ2F0ZTogbmV3IEFjY291bnQuS2V5cGFpcih7XG4gICAgICAgICAgc2VjcmV0OiBmcmVlemVBdXRob3JpdHksXG4gICAgICAgIH0pLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQWNjb3VudDogdG9rZW5BY2NvdW50LFxuICAgICAgICBlZGl0aW9uOiBlZGl0aW9uQWRkcmVzcyxcbiAgICAgICAgbWludDogbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBQdWJsaWNLZXksXG4gIFN5c3RlbVByb2dyYW0sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUFwcHJvdmVJbnN0cnVjdGlvbixcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50LFxuICBNSU5UX1NJWkUsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSwgTWludE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVDcmVhdGVNYXN0ZXJFZGl0aW9uVjNJbnN0cnVjdGlvbixcbiAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbixcbiAgY3JlYXRlU2lnbk1ldGFkYXRhSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVZlcmlmeVNpemVkQ29sbGVjdGlvbkl0ZW1JbnN0cnVjdGlvbixcbiAgRGF0YVYyLFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZVZlcmlmeUNyZWF0b3IgPSAobWludDogUHVibGljS2V5LCBjcmVhdG9yOiBQdWJsaWNLZXkpID0+IHtcbiAgICBjb25zdCBtZXRhZGF0YSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIGNyZWF0ZVNpZ25NZXRhZGF0YUluc3RydWN0aW9uKHtcbiAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YSxcbiAgICAgIGNyZWF0b3I6IGNyZWF0b3IsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZURlbGVhZ2F0ZSA9IChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBkZWxlZ2F0ZUF1dGhvcml0eTogUHVibGljS2V5LFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG5cbiAgICByZXR1cm4gY3JlYXRlQXBwcm92ZUluc3RydWN0aW9uKFxuICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgZGVsZWdhdGVBdXRob3JpdHksXG4gICAgICBvd25lcixcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uID0gKFxuICAgIGNvbGxlY3Rpb25DaGlsZDogUHVibGljS2V5LFxuICAgIGNvbGxlY3Rpb25QYXJlbnQ6IFB1YmxpY0tleSxcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApID0+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uTWV0YWRhdGEgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShcbiAgICAgIGNvbGxlY3Rpb25QYXJlbnQudG9TdHJpbmcoKSxcbiAgICApO1xuICAgIGNvbnN0IGNvbGxlY3Rpb25NYXN0ZXJFZGl0aW9uQWNjb3VudCA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24oXG4gICAgICBjb2xsZWN0aW9uUGFyZW50LnRvU3RyaW5nKCksXG4gICAgKTtcbiAgICByZXR1cm4gY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uSXRlbUluc3RydWN0aW9uKHtcbiAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb25NZXRhZGF0YSxcbiAgICAgIGNvbGxlY3Rpb25NYXN0ZXJFZGl0aW9uQWNjb3VudDogY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50LFxuICAgICAgY29sbGVjdGlvbk1pbnQ6IGNvbGxlY3Rpb25QYXJlbnQsXG4gICAgICBtZXRhZGF0YTogQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEoY29sbGVjdGlvbkNoaWxkLnRvU3RyaW5nKCkpLFxuICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgY29sbGVjdGlvbkF1dGhvcml0eTogZmVlUGF5ZXIsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgbmZ0TWV0YWRhdGE6IERhdGFWMixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICAgIGlzTXV0YWJsZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uW10+ID0+IHtcbiAgICBjb25zdCBhdGEgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG4gICAgY29uc3QgdG9rZW5NZXRhZGF0YVB1YmtleSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgbWFzdGVyRWRpdGlvblB1YmtleSA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24obWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gW107XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLFxuICAgICAgICBuZXdBY2NvdW50UHVia2V5OiBtaW50LFxuICAgICAgICBsYW1wb3J0czogYXdhaXQgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludChjb25uZWN0aW9uKSxcbiAgICAgICAgc3BhY2U6IE1JTlRfU0laRSxcbiAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24obWludCwgMCwgb3duZXIsIG93bmVyKSk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihmZWVQYXllciwgYXRhLCBvd25lciwgbWludCksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbihtaW50LCBhdGEsIG93bmVyLCAxLCAwKSk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRhZGF0YTogdG9rZW5NZXRhZGF0YVB1YmtleSxcbiAgICAgICAgICBtaW50LFxuICAgICAgICAgIG1pbnRBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY3JlYXRlTWV0YWRhdGFBY2NvdW50QXJnc1YzOiB7XG4gICAgICAgICAgICBkYXRhOiBuZnRNZXRhZGF0YSxcbiAgICAgICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25EZXRhaWxzOiBudWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgZWRpdGlvbjogbWFzdGVyRWRpdGlvblB1YmtleSxcbiAgICAgICAgICBtaW50LFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIG1ldGFkYXRhOiB0b2tlbk1ldGFkYXRhUHVia2V5LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY3JlYXRlTWFzdGVyRWRpdGlvbkFyZ3M6IHtcbiAgICAgICAgICAgIG1heFN1cHBseTogMCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBpbnN0cnVjdGlvbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50IGFuZCBORlQgbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXIgICAgICAgICAvLyBvd25lcidzIFNlY3JldFxuICAgKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gICAqIHtcbiAgICogICBuYW1lOiBzdHJpbmcgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sOiBzdHJpbmcgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBmaWxlUGF0aDogc3RyaW5nIHwgRmlsZSAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIHJveWFsdHk6IG51bWJlciAgICAgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIHN0b3JhZ2VUeXBlOiAnYXJ3ZWF2ZSd8J25mdFN0b3JhZ2UnIC8vIERlY2VudHJhbGl6ZWQgc3RvcmFnZVxuICAgKiAgIGRlc2NyaXB0aW9uPzogc3RyaW5nICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgZXh0ZXJuYWxfdXJsPzogc3RyaW5nICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiBNZXRhZGF0YUF0dHJpYnV0ZVtdICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzogTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT4gLy8gaW5jbHVkZSBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBQdWJrZXkgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIGNyZWF0b3JzPzogSW5wdXRDcmVhdG9yc1tdICAgIC8vIG90aGVyIGNyZWF0b3JzIHRoYW4gb3duZXJcbiAgICogICB1c2VzPzogVXNlcyAgICAgICAgICAgICAgICAgICAvLyB1c2FnZSBmZWF0dXJlOiBidXJuLCBzaW5nbGUsIG11bHRpcGxlXG4gICAqICAgaXNNdXRhYmxlPzogYm9vbGVhbiAgICAgICAgICAgLy8gZW5hYmxlIHVwZGF0ZSgpXG4gICAqICAgb3B0aW9ucz86IFtrZXk6IHN0cmluZ10/OiB1bmtub3duICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEBwYXJhbSB7UGFydGlhbDxNaW50T3B0aW9ucz59IG9wdGlvbnMgICAgICAgICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRTdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXROZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBmZWVQYXllciwgZnJlZXplQXV0aG9yaXR5IH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogb3duZXI7XG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNLZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG5cbiAgICAgIC8vIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50XG4gICAgICBsZXQgcHJvcGVydGllcztcbiAgICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0ID0ge1xuICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByb3lhbHR5ID0gaW5wdXQucm95YWx0eSA/IGlucHV0LnJveWFsdHkgOiAwO1xuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSBDb252ZXJ0ZXIuUm95YWx0eS5pbnRvSW5mcmEocm95YWx0eSk7XG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgLy8gY3JlYXRlZCBhdCBieSB1bml4IHRpbWVzdGFtcFxuICAgICAgc3RvcmFnZU1ldGFkYXRhLmNyZWF0ZWRfYXQgPSB1bml4VGltZXN0YW1wKCk7XG5cbiAgICAgIGxldCB1cmkhOiBzdHJpbmc7XG4gICAgICAvLyB1cGxvYWQgZmlsZVxuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIC8vIHVwbG9hZGVkIGZpbGVcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydGVyLlJlZ3VsYXJOZnRNZXRhZGF0YS5pbnRvSW5mcmEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBtaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhd2FpdCBjcmVhdGVNaW50KFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZURlbGVhZ2F0ZShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gY29sbGVjdGlvbiAtLS1cbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZVZlcmlmeVNpemVkQ29sbGVjdGlvbihcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGlucHV0LmNvbGxlY3Rpb24udG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXlwYWlycyA9IFtvd25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV07XG5cbiAgICAgIC8vIGNyZWF0b3IgLS0tXG4gICAgICBpZiAoaW5wdXQuY3JlYXRvcnMpIHtcbiAgICAgICAgaW5wdXQuY3JlYXRvcnMuZm9yRWFjaCgoY3JlYXRvcikgPT4ge1xuICAgICAgICAgIGlmIChBY2NvdW50LktleXBhaXIuaXNTZWNyZXQoY3JlYXRvci5zZWNyZXQpKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9yUHVia2V5ID0gY3JlYXRvci5hZGRyZXNzLnRvUHVibGljS2V5KCk7XG4gICAgICAgICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVmVyaWZ5Q3JlYXRvcihtaW50LnRvUHVibGljS2V5KCksIGNyZWF0b3JQdWJrZXkpO1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goaW5zdCk7XG4gICAgICAgICAgICBrZXlwYWlycy5wdXNoKGNyZWF0b3Iuc2VjcmV0LnRvS2V5cGFpcigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5NaW50KFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgbWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEdhc0xlc3NNaW50T3B0aW9ucywgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICd+L3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgTkZUIG1pbnQgd2l0aCBQYXJ0aWFsIFNpZ25cbiAgICpcbiAgICogQHBhcmFtIHtTZWNyZXR9IG93bmVyICAgICAgICAgLy8gb3duZXIncyBTZWNyZXRcbiAgICogQHBhcmFtIHtVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhfSBpbnB1dFxuICAgKiB7XG4gICAqICAgbmFtZTogc3RyaW5nICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbDogc3RyaW5nICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZmlsZVBhdGg6IHN0cmluZyB8IEZpbGUgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBkZXNjcmlwdGlvbj86IHN0cmluZyAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIGV4dGVybmFsX3VybD86IHN0cmluZyAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzogTWV0YWRhdGFBdHRyaWJ1dGVbXSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IE1ldGFkYXRhUHJvcGVydGllczxVcmk+IC8vIGluY2x1ZGUgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogUHVia2V5ICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddPzogdW5rbm93biAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogICBjcmVhdG9ycz86IElucHV0Q3JlYXRvcnNbXSAgICAgICAgICAvLyBvdGhlciBjcmVhdG9ycyB0aGFuIG93bmVyXG4gICAqICAgdXNlcz86IFVzZXMgICAgICAgICAgICAgICAgICAgLy8gdXNhZ2UgZmVhdHVyZTogYnVybiwgc2luZ2xlLCBtdWx0aXBsZVxuICAgKiAgIGlzTXV0YWJsZT86IGJvb2xlYW4gICAgICAgICAgIC8vIGVuYWJsZSB1cGRhdGUoKVxuICAgKiB9XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllciAgICAgICAgLy8gZmVlIHBheWVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNMZXNzTWludE9wdGlvbnM+fSBvcHRpb25zICAgICAgICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFN0cnVjdFBhcnRpYWxTaWduVHJhbnNhY3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzTWludCA9IGFzeW5jIChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIGZlZVBheWVyOiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxHYXNMZXNzTWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IHJveWFsdHkgPSBpbnB1dC5yb3lhbHR5ID8gaW5wdXQucm95YWx0eSA6IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IENvbnZlcnRlci5Sb3lhbHR5LmludG9JbmZyYShyb3lhbHR5KTtcbiAgICAgIGNvbnN0IG93bmVyUHVibGlja2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCB1cmkgPSAnJztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydGVyLlByb3BlcnRpZXMuaW50b0luZnJhKFxuICAgICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgICAgU3RvcmFnZS51cGxvYWRGaWxlLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICAgIHsgLi4uaW5wdXQsIHByb3BlcnRpZXMgfSxcbiAgICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgKTtcblxuICAgICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgdXJpID0gaW5wdXQudXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG5cbiAgICAgIGxldCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuICAgICAgbGV0IGNvbGxlY3Rpb247XG4gICAgICBpZiAoaW5wdXQuY29sbGVjdGlvbiAmJiBpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24gPSBDb252ZXJ0ZXIuQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbik7XG4gICAgICAgIGRhdGF2MiA9IHsgLi4uZGF0YXYyLCBjb2xsZWN0aW9uIH07XG4gICAgICB9XG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBzZWxsZXJGZWVCYXNpc1BvaW50czogJywgc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBtaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBNaW50LmNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXJQdWJsaWNrZXksXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAob3B0aW9ucy5mcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHMucHVzaChcbiAgICAgICAgICBNaW50LmNyZWF0ZURlbGVhZ2F0ZShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyUHVibGlja2V5LFxuICAgICAgICAgICAgb3B0aW9ucy5mcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICBpbnN0cy5mb3JFYWNoKChpbnN0KSA9PiB0eC5hZGQoaW5zdCkpO1xuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIFtvd25lciwgbWludF0uZm9yRWFjaCgoc2lnbmVyKSA9PiB0eC5wYXJ0aWFsU2lnbihzaWduZXIudG9LZXlwYWlyKCkpKTtcblxuICAgICAgY29uc3Qgc2VyaWFsaXplZFR4ID0gdHguc2VyaWFsaXplKHtcbiAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBoZXggPSBzZXJpYWxpemVkVHgudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuUGFydGlhbFNpZ24oaGV4LCBtaW50LnB1YmtleSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgZGVzdDogUHVia2V5LFxuICAgIGZlZVBheWVyOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4uZ2FzTGVzc1RyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBmZWVQYXllcixcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVNldENvbGxlY3Rpb25TaXplSW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdG9yYWdlJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IE1pbnRDb2xsZWN0aW9uT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbi8qKlxuICogY3JlYXRlIGEgY29sbGVjdGlvblxuICogVGhpcyBmdW5jdGlvbiBuZWVkcyBvbmx5IDEgY2FsbFxuICpcbiAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICogQHBhcmFtIHtJbnB1dE5mdE1ldGFkYXRhfSBpbnB1dFxuICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRDb2xsZWN0aW9uT3B0aW9ucz59IG9wdGlvbnNcbiAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09MTEVDVElPTl9TSVpFID0gMDtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG4gIGV4cG9ydCBjb25zdCBtaW50Q29sbGVjdGlvbiA9IChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludENvbGxlY3Rpb25PcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBmcmVlemVBdXRob3JpdHksIGZlZVBheWVyLCBjb2xsZWN0aW9uU2l6ZSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IG93bmVyO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgfTtcbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuXG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShpbnB1dCwgMCk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHsgaW1hZ2U6IGlucHV0LnVyaSB9O1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkRGF0YShcbiAgICAgICAgICB7IC4uLnN0b3JhZ2VNZXRhZGF0YSwgLi4uaW1hZ2UgfSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b0luZnJhKGlucHV0LCB1cmksIDApO1xuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgY29sbGVjdGlvbk1ldGFkYXRhQWNjb3VudCA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKFxuICAgICAgICBjb2xsZWN0aW9uTWludC5wdWJrZXksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhd2FpdCBNaW50LmNyZWF0ZU1pbnQoXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIE1pbnQuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICAgICAgY29sbGVjdGlvbk1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29sbGVjdGlvbnMgPSB7XG4gICAgICAgIGNvbGxlY3Rpb25NZXRhZGF0YTogY29sbGVjdGlvbk1ldGFkYXRhQWNjb3VudCxcbiAgICAgICAgY29sbGVjdGlvbkF1dGhvcml0eTogb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICBjb2xsZWN0aW9uTWludDogY29sbGVjdGlvbk1pbnQudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgfTtcblxuICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgIGNyZWF0ZVNldENvbGxlY3Rpb25TaXplSW5zdHJ1Y3Rpb24oY29sbGVjdGlvbnMsIHtcbiAgICAgICAgICBzZXRDb2xsZWN0aW9uU2l6ZUFyZ3M6IHtcbiAgICAgICAgICAgIHNpemU6IGNvbGxlY3Rpb25TaXplIHx8IERFRkFVTFRfQ09MTEVDVElPTl9TSVpFLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuTWludChcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBbb3duZXIudG9LZXlwYWlyKCksIGNvbGxlY3Rpb25NaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgVGhhd09wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtUaGF3T3B0aW9uc30gb3B0aW9ucyAgICAgLy8gb3B0aW9uc1xuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRoYXcgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxUaGF3T3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PENvbW1vblN0cnVjdHVyZTx1bmtub3duPiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGVkaXRpb25BZGRyZXNzID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24oe1xuICAgICAgICBkZWxlZ2F0ZTogbmV3IEFjY291bnQuS2V5cGFpcih7XG4gICAgICAgICAgc2VjcmV0OiBmcmVlemVBdXRob3JpdHksXG4gICAgICAgIH0pLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQWNjb3VudDogdG9rZW5BY2NvdW50LFxuICAgICAgICBlZGl0aW9uOiBlZGl0aW9uQWRkcmVzcyxcbiAgICAgICAgbWludDogbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zZmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8VHJhbnNmZXJPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBTcGxUb2tlbi50cmFuc2ZlcihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIGRlc3QsXG4gICAgICBvd25lck9yTXVsdGlzaWcsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICAgTkZUX0RFQ0lNQUxTLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgQnVybiB9IGZyb20gJy4vYnVybic7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEZpbmQgfSBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBGcmVlemUgfSBmcm9tICcuL2ZyZWV6ZSc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEdhc0xlc3NNaW50IH0gZnJvbSAnLi9nYXMtbGVzcy1taW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgR2FzTGVzc1RyYW5zZmVyIH0gZnJvbSAnLi9nYXMtbGVzcy10cmFuc2Zlcic7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50Q29sbGVjdGlvbiB9IGZyb20gJy4vbWludC1jb2xsZWN0aW9uJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgVGhhdyB9IGZyb20gJy4vdGhhdyc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7IC8vIFRPRE86IG5lZWQ/IG9yIFJlc3VsdFxuaW1wb3J0ICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgY29uc3QgUmVndWxhck5mdCA9IHtcbiAgLi4uQnVybixcbiAgLi4uRmluZCxcbiAgLi4uRnJlZXplLFxuICAuLi5HYXNMZXNzTWludCxcbiAgLi4uR2FzTGVzc1RyYW5zZmVyLFxuICAuLi5NaW50LFxuICAuLi5NaW50Q29sbGVjdGlvbixcbiAgLi4uVGhhdyxcbiAgLi4uVHJhbnNmZXIsXG59O1xuXG5leHBvcnQgKiBmcm9tICd+L3NoYXJlZC9leHBvcnRzJztcbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCB9IGZyb20gJ34vc3VpdGUtcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTWludENvbGxlY3Rpb25PcHRpb25zIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuLyoqXG4gKiBjcmVhdGUgYSBjb2xsZWN0aW9uXG4gKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gKlxuICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gKiBAcGFyYW0ge01pbnRDb2xsZWN0aW9uT3B0aW9uc30gb3B0aW9uc1xuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uLCBFcnJvcj4+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdCB7XG4gIGV4cG9ydCBjb25zdCBtaW50Q29sbGVjdGlvbiA9IChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludENvbGxlY3Rpb25PcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIFJlZ3VsYXJOZnQubWludENvbGxlY3Rpb24ob3duZXIsIGlucHV0LCB7XG4gICAgICBmZWVQYXllcixcbiAgICAgIGZyZWV6ZUF1dGhvcml0eSxcbiAgICB9KTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxpQkFBQUE7QUFBQSxFQUFBLHFCQUFBQztBQUFBLEVBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLGtCQUFzQztBQUN0QyxrQkFBNkI7QUFFN0IsSUFBSSxTQUFTLFlBQUFDO0FBRU4sSUFBVTtBQUFBLENBQVYsQ0FBVUMsZUFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxxQkFBVjtBQUNMLFVBQU0sYUFBYTtBQUNuQixRQUFJLFlBQVk7QUFDVCxJQUFNQSxpQkFBQSxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPNUIsSUFBTUEsaUJBQUEsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFwQixJQUFNQSxpQkFBQSx1QkFBdUIsTUFBZTtBQUNqRCxZQUFNLGNBQWMsS0FBSyxPQUFPO0FBQ2hDLFlBQU0sY0FBYyxJ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QUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFDTDs7O0FDTk8sSUFBVUM7QUFBQSxDQUFWLENBQVVBLG9CQUFWO0FBQ0UsRUFBTUEsZ0JBQUEsaUJBQWlCLENBQzVCLE9BQ0EsT0FDQSxVQUEwQyxDQUFDLE1BQ0Q7QUFDMUMsVUFBTSxFQUFFLFVBQVUsZ0JBQWdCLElBQUk7QUFDdEMsV0FBT0MsYUFBVyxlQUFlLE9BQU8sT0FBTztBQUFBLE1BQzdDO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQVhlRCxvQ0FBQTs7O0FqRUZWLElBQU1FLGlCQUFnQjtBQUFBO0FBQUEsRUFFM0IsR0FBRztBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFDTDsiLAogICJuYW1lcyI6IFsiQWNjb3VudCIsICJDb21wcmVzc2VkTmZ0IiwgIlNvbGFuYUpzb25Db25maWciLCAiQ29uc3RhbnRzIiwgIldhcm5uaW5nTWVzc2FnZSIsICJDbHVzdGVyIiwgIkVuZFBvaW50VXJsIiwgIkJ1bmRsclVybCIsICJEYXNBcGlVcmwiLCAiTmZ0c3RvcmFnZUFwaUtleSIsICJjdXN0b21DbHVzdGVyVXJsIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJDb21tb24iLCAiUmVzdWx0IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJFeHBsb3JlciIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiYnMiLCAiT3JpZ2luYWwiLCAiQWNjb3VudCIsICJBc3NvY2lhdGVkIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIlBkYSIsICJCTiIsICJBY2NvdW50IiwgImltcG9ydF9iczU4IiwgIkFjY291bnQiLCAiYnMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlJlc3VsdCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29sbGVjdGlvbk1pbnQiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnZlcnRlciIsICJSb3lhbHR5IiwgIkNvbnZlcnRlciIsICJDb21wcmVzc2VkTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb25EZXRhaWxzIiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJSZWd1bGFyTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlByb3BlcnRpZXMiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXIiLCAiQ29udmVydGVyIiwgIlZhbGlkYXRvciIsICJNZXNzYWdlIiwgIkNvbnZlcnRlciIsICJGaWx0ZXJUeXBlIiwgIk1vZHVsZU5hbWUiLCAiaW1wb3J0X3dlYjMiLCAiTm9kZSIsICJSZXN1bHQiLCAiRGFzQXBpIiwgImltcG9ydF9tcGxfYnViYmxlZ3VtX2luc3RydWN0aW9uIiwgIkNvbXByZXNzZWROZnQiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tcHJlc3NlZE5mdCIsICJDb252ZXJ0ZXIiLCAiaW1wb3J0X3dlYjMiLCAiQ29tcHJlc3NlZE5mdCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X21wbF9idWJibGVndW1faW5zdHJ1Y3Rpb24iLCAiaW1wb3J0X3NwbF9hY2NvdW50X2NvbXByZXNzaW9uIiwgIkNvbXByZXNzZWROZnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIkNvbXByZXNzZWROZnQiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiUHJvdmVuYW5jZUxheWVyIiwgInVwbG9hZEZpbGUiLCAiSXJ5cyIsICJBcndlYXZlIiwgIk5mdFN0b3JhZ2UiLCAiU3RvcmFnZSIsICJpbXBvcnRfc3BsX2FjY291bnRfY29tcHJlc3Npb24iLCAiaW1wb3J0X21wbF9idWJibGVndW0iLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X21wbF9idWJibGVndW1faW5zdHJ1Y3Rpb24iLCAiQ29tcHJlc3NlZE5mdCIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfbXBsX2J1YmJsZWd1bV9pbnN0cnVjdGlvbiIsICJpbXBvcnRfc3BsX2FjY291bnRfY29tcHJlc3Npb24iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJDb21wcmVzc2VkTmZ0IiwgIkFjY291bnQiLCAiQ29udmVydGVyIiwgIkJVQkJMRUdVTV9QUk9HUkFNX0lEIiwgIlRPS0VOX01FVEFEQVRBX1BST0dSQU1fSUQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgIkNvbnZlcnRlciIsICJSZXN1bHQiLCAiQWNjb3VudCIsICJmZXRjaCIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgIkFjY291bnQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X3dlYjMiLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlNwbFRva2VuIiwgIm1pbnQiLCAiQWNjb3VudCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJTcGxUb2tlbiIsICJSZWd1bGFyTmZ0IiwgIlNwbFRva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUmVndWxhck5mdCIsICJTcGxUb2tlbiIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUmVndWxhck5mdCIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUmVndWxhck5mdCIsICJtaW50IiwgIkFjY291bnQiLCAiQ29udmVydGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJSZWd1bGFyTmZ0IiwgIkNvbnZlcnRlciIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZWd1bGFyTmZ0IiwgIlNwbFRva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUmVndWxhck5mdCIsICJDb252ZXJ0ZXIiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiUmVndWxhck5mdCIsICJTcGxUb2tlbiIsICJSZWd1bGFyTmZ0IiwgIkNvbXByZXNzZWROZnQiLCAiUmVndWxhck5mdCIsICJDb21wcmVzc2VkTmZ0Il0KfQo=