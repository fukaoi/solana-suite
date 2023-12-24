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
var import_web34 = require("@solana/web3.js");

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

// ../transaction-builder/src/common.ts
var import_web33 = require("@solana/web3.js");
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
        const transaction = new import_web33.Transaction();
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
        return await (0, import_web33.sendAndConfirmTransaction)(
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
        const transaction = new import_web34.Transaction();
        let finalSigners = signers;
        if (feePayer) {
          transaction.feePayer = feePayer.publicKey;
          finalSigners = [feePayer, ...signers];
        }
        instructions.map((inst) => transaction.add(inst));
        const options = {
          maxRetries: MAX_RETRIES
        };
        return await (0, import_web34.sendAndConfirmTransaction)(
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
var import_web35 = require("@solana/web3.js");
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
        const transaction = new import_web35.Transaction();
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
        return await (0, import_web35.sendAndConfirmTransaction)(
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
var import_web36 = require("@solana/web3.js");
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
        const transactionFromJson = import_web36.Transaction.from(decode);
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

// ../global/src/index.ts
var import_web39 = require("@solana/web3.js");

// ../account/src/associated.ts
var import_spl_token = require("@solana/spl-token");

// ../account/src/keypair.ts
var import_web37 = require("@solana/web3.js");
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
      return new import_web37.PublicKey(this.pubkey);
    }
    toKeypair() {
      const decoded = import_bs58.default.decode(this.secret);
      return import_web37.Keypair.fromSecretKey(decoded);
    }
    static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
    static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
    static create = () => {
      const keypair = import_web37.Keypair.generate();
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
var import_web38 = require("@solana/web3.js");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_mpl_bubblegum = require("@metaplex-foundation/mpl-bubblegum");
var import_bn = __toESM(require("bn.js"));
var Account3;
((Account5) => {
  let Pda;
  ((Pda2) => {
    Pda2.getMetadata = (address) => {
      const [publicKey] = import_web38.PublicKey.findProgramAddressSync(
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
      const [publicKey] = import_web38.PublicKey.findProgramAddressSync(
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
      const [publicKey] = import_web38.PublicKey.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = import_web38.PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getAssetId = (address, leafIndex) => {
      const node = new import_bn.default.BN(leafIndex);
      const [assetId] = import_web38.PublicKey.findProgramAddressSync(
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
  return new import_web39.PublicKey(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account4.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = import_bs582.default.decode(this.toString());
  return import_web39.Keypair.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return (0, import_bignumber.BigNumber)(this).div(import_web39.LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return (0, import_bignumber.BigNumber)(this).times(import_web39.LAMPORTS_PER_SOL).toNumber();
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
      return Result.err(res.error);
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
        return Result.err(Error("Only Array Instruction object"));
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
var Result;
((Result7) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result7.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result7.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result7.ok(resArr);
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
    return Result7.ok(res);
  }
  Result7.all = all;
})(Result || (Result = {}));

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvY29uc3RhbnRzLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2JhdGNoLnRzIiwgIi4uLy4uL25vZGUvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbW1vbi50cyIsICIuLi8uLi9zaGFyZWQvc3JjL3NoYXJlZC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3BhcnRpYWwtc2lnbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9jYWxjdWxhdGUtdHhzaXplLnRzIiwgIi4uLy4uL2dsb2JhbC9zcmMvaW5kZXgudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvYXNzb2NpYXRlZC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9rZXlwYWlyLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL3BkYS50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9pbmRleC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi9zaGFyZWQvc3JjL3Jlc3VsdC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jcmVhdG9ycy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbXByZXNzZWQtbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcm95YWx0eS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL25mdC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21lbW8udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcmVndWxhci1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9wcm9wZXJ0aWVzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdXNlcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Rva2VuLW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXItY2hlY2tlZC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgRGV0YWlscywgTGltaXQgfSBmcm9tICd+L3R5cGVzL3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFZhbGlkYXRvciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVzc2FnZSB7XG4gICAgZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnc3VjY2Vzcyc7XG4gICAgZXhwb3J0IGNvbnN0IFNNQUxMX05VTUJFUiA9ICd0b28gc21hbGwnO1xuICAgIGV4cG9ydCBjb25zdCBCSUdfTlVNQkVSID0gJ3RvbyBiaWcnO1xuICAgIGV4cG9ydCBjb25zdCBMT05HX0xFTkdUSCA9ICd0b28gbG9uZyc7XG4gICAgZXhwb3J0IGNvbnN0IEVNUFRZID0gJ2ludmFsaWQgZW1wdHkgdmFsdWUnO1xuICAgIGV4cG9ydCBjb25zdCBJTlZBTElEX1VSTCA9ICdpbnZhbGlkIHVybCc7XG4gICAgZXhwb3J0IGNvbnN0IE9OTFlfTk9ERV9KUyA9ICdgc3RyaW5nYCB0eXBlIGlzIG9ubHkgTm9kZS5qcyc7XG4gIH1cblxuICBleHBvcnQgY29uc3QgTkFNRV9MRU5HVEggPSAzMjtcbiAgZXhwb3J0IGNvbnN0IFNZTUJPTF9MRU5HVEggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IFVSTF9MRU5HVEggPSAyMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01BWCA9IDEwMDtcbiAgZXhwb3J0IGNvbnN0IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCA9IDEwMDAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NSU4gPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBpc1JveWFsdHkgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3JveWFsdHknO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1NlbGxlckZlZUJhc2lzUG9pbnRzID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzZWxsZXJGZWVCYXNpc1BvaW50cy9zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc7XG4gICAgICBpZiAocm95YWx0eSAhPT0gMCAmJiAhcm95YWx0eSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHJveWFsdHkpO1xuICAgICAgfVxuICAgICAgaWYgKHJveWFsdHkgPCBST1lBTFRZX01JTikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuU01BTExfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01JTixcbiAgICAgICAgICBjb25kaXRpb246ICd1bmRlck1pbicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChyb3lhbHR5ID4gUk9ZQUxUWV9NQVggKiBDb252ZXJ0ZXIuUm95YWx0eS5USFJFU0hPTEQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc05hbWUgPSAobmFtZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICduYW1lJztcbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgobmFtZSkgPiBOQU1FX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIG5hbWUsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IE5BTUVfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU3ltYm9sID0gKHN5bWJvbDogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzeW1ib2wnO1xuICAgICAgaWYgKCFzeW1ib2wpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBzeW1ib2wpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoc3ltYm9sKSA+IFNZTUJPTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBzeW1ib2wsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNZTUJPTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNJbWFnZVVybCA9IChpbWFnZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+XG4gICAgaXNVcmlPckltYWdlKGltYWdlLCAnaW1hZ2UnKTtcblxuICBleHBvcnQgY29uc3QgY2hlY2tBbGwgPSA8XG4gICAgVCBleHRlbmRzIFBpY2tOZnRTdG9yYWdlIHwgUGlja05mdFN0b3JhZ2VNZXRhcGxleCB8IFBpY2tNZXRhcGxleCxcbiAgPihcbiAgICBtZXRhZGF0YTogVCxcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSk7XG4gICAgICBjb25zdCByZXN1bHRzOiBEZXRhaWxzW10gPSBbXTtcbiAgICAgIGtleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgbGV0IHJlcyE6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPjtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLmltYWdlKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzSW1hZ2VVcmwobWV0YWRhdGEuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncm95YWx0eSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnJveWFsdHkpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNSb3lhbHR5KG1ldGFkYXRhLnJveWFsdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cykge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5uYW1lKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzTmFtZShtZXRhZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuc3ltYm9sKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU3ltYm9sKG1ldGFkYXRhLnN5bWJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzICYmIHJlcy5pc0Vycikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5yZXMuZXJyb3IuZGV0YWlscyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAnQ2F1Z2h0IGluIHRoZSB2YWxpZGF0aW9uIGVycm9ycy4gc2VlIGluZm9ybWF0aW9uIGUuZzogZXJyPFZhbGlkYXRvckVycm9yPi5kZXRhaWxzJztcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICB0eXBlIFBpY2tOZnRTdG9yYWdlID0gUGljazxcbiAgICBPZmZjaGFpbixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdpbWFnZScgfCAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnXG4gID47XG4gIHR5cGUgUGlja05mdFN0b3JhZ2VNZXRhcGxleCA9IFBpY2s8XG4gICAgSW5wdXROZnRNZXRhZGF0YSxcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdyb3lhbHR5JyB8ICdmaWxlUGF0aCdcbiAgPjtcbiAgdHlwZSBQaWNrTWV0YXBsZXggPSBQaWNrPFxuICAgIERhdGFWMixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICd1cmknIHwgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJ1xuICA+O1xuXG4gIGNvbnN0IGJ5dGVMZW5ndGggPSAodmFsdWU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdGV4dCA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgIHJldHVybiB0ZXh0LmVuY29kZSh2YWx1ZSkubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUVycm9yID0gKFxuICAgIGtleTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBhY3R1YWw6IHN0cmluZyB8IG51bWJlcixcbiAgICBsaW1pdD86IExpbWl0LFxuICApOiBWYWxpZGF0b3JFcnJvciA9PiB7XG4gICAgbGV0IGVycm9yOiBWYWxpZGF0b3JFcnJvcjtcbiAgICBpZiAobGltaXQpIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsLCBsaW1pdCB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsIH1dKTtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9O1xuXG4gIGNvbnN0IGlzVXJpT3JJbWFnZSA9IChcbiAgICBpbWFnZU9yVXJpOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBpZiAoIWltYWdlT3JVcmkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKGltYWdlT3JVcmkpID4gVVJMX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIGltYWdlT3JVcmksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFVSTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCEvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7PzomPSssJSNdKy9nLnRlc3QoaW1hZ2VPclVyaSkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLklOVkFMSURfVVJMLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgZGV0YWlsczogRGV0YWlsc1tdO1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNbXSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb21taXRtZW50LCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IFNvbGFuYUpzb25Db25maWcgZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCc7XG5cbmxldCBDb25maWcgPSBTb2xhbmFKc29uQ29uZmlnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgV2Fybm5pbmdNZXNzYWdlIHtcbiAgICBjb25zdCBUSFJFU0hIT0xEID0gNztcbiAgICBsZXQgaXNEaXNwbGF5ID0gZmFsc2U7XG4gICAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPSBgXG4gICAgICAgIFtZT1UgSEFWRSBUTyBET11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgWW91IG5lZWQgdG8gdXBkYXRlIG5mdFN0b3JhZ2VBcGlLZXkgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgQ2FuIGdldCBhcGkga2V5IGZyb20gaHR0cHM6Ly9uZnQuc3RvcmFnZS9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgYDtcbiAgICBleHBvcnQgY29uc3QgREFTX0FQSV9VUkwgPSBgXG4gICAgICAgIFtZT1UgSEFWRSBUTyBET11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgWW91IG5lZWQgdG8gdXBkYXRlIGRhc0FwaVVybCBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBjYW4gZ2V0IGFwaSB1cmwgZnJvbSBodHRwczovL3d3dy5oZWxpdXMuZGV2L1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcbiAgICAgICAgYDtcblxuICAgIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVQcm9iYWJpbGl0eSA9ICgpOiBib29sZWFuID0+IHtcbiAgICAgIGNvbnN0IHJhbmRvbVZhbHVlID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIGNvbnN0IHByb2JhYmlsaXR5ID0gMSAvIFRIUkVTSEhPTEQ7XG4gICAgICBpZiAoIWlzRGlzcGxheSAmJiByYW5kb21WYWx1ZSA8IHByb2JhYmlsaXR5KSB7XG4gICAgICAgIGlzRGlzcGxheSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgY29uc3QgY3VycmVudENsdXN0ZXIgPSBDb25maWcuY2x1c3Rlci50eXBlO1xuICBleHBvcnQgY29uc3QgY3VzdG9tQ2x1c3RlclVybCA9IENvbmZpZy5jbHVzdGVyLmN1c3RvbUNsdXN0ZXJVcmw7XG4gIGV4cG9ydCBjb25zdCBpc0RlYnVnZ2luZyA9IENvbmZpZy5kZWJ1Z2dpbmc7XG4gIGV4cG9ydCBjb25zdCBuZnRTdG9yYWdlQXBpS2V5ID0gQ29uZmlnLm5mdFN0b3JhZ2VBcGlLZXk7XG4gIGV4cG9ydCBjb25zdCBkYXNBcGlVcmwgPSBDb25maWcuZGFzQXBpVXJsO1xuXG4gIGV4cG9ydCBlbnVtIENsdXN0ZXIge1xuICAgIHByZCA9ICdtYWlubmV0LWJldGEnLFxuICAgIHByZE1ldGFwbGV4ID0gJ21haW5uZXQtYmV0YS1tZXRhcGxleCcsXG4gICAgZGV2ID0gJ2Rldm5ldCcsXG4gICAgdGVzdCA9ICd0ZXN0bmV0JyxcbiAgICBsb2NhbGhvc3QgPSAnbG9jYWxob3N0LWRldm5ldCcsXG4gIH1cblxuICBleHBvcnQgZW51bSBFbmRQb2ludFVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vYXBpLm1haW5uZXQtYmV0YS5zb2xhbmEuY29tJyxcbiAgICBwcmRNZXRhcGxleCA9ICdodHRwczovL2FwaS5tZXRhcGxleC5zb2xhbmEuY29tJyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICAgIHRlc3QgPSAnaHR0cHM6Ly9hcGkudGVzdG5ldC5zb2xhbmEuY29tJyxcbiAgICBsb2NhbGhvc3QgPSAnaHR0cDovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gIH1cblxuICBleHBvcnQgZW51bSBCdW5kbHJVcmwge1xuICAgIHByZCA9ICdodHRwczovL25vZGUxLmlyeXMueHl6LGh0dHBzOi8vbm9kZTIuaXJ5cy54eXonLFxuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5pcnlzLnh5eicsXG4gIH1cblxuICBleHBvcnQgZW51bSBEYXNBcGlVcmwge1xuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTIsaHR0cHM6Ly9ycGMtZGV2bmV0LmhlbGl1cy54eXo/YXBpLWtleT05ZjcwYTg0My0zMjc0LTRmZmQtYTBhOS0zMjNmOGI3YzA2MzknLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gTmZ0c3RvcmFnZUFwaUtleSB7XG4gICAgZGV2ID0gJ2V5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSmthV1E2WlhSb2Nqb3dlRVJHTWpjeU4yVmtPRFpoUkdVMVJUTXlaRFpEWkVKbE9EYzBZelJGTkRsRU9EWTFPV1ptT0VNaUxDSnBjM01pT2lKdVpuUXRjM1J2Y21GblpTSXNJbWxoZENJNk1UWXlNREkyTkRrME16Y3dOaXdpYm1GdFpTSTZJbVJsYlc4aWZRLmQ0SjcwbWlreFJCOGE1dndOdTZTTzVIREE4SmF1ZXVzZUFqN1FfeXRNQ0UnLFxuICB9XG5cbiAgZXhwb3J0IGNvbnN0IGxvYWRDb25maWcgPSBhc3luYyAoKSA9PiB7XG4gICAgQ29uZmlnID0gYXdhaXQgaW1wb3J0KCdAc29sYW5hLXN1aXRlL2NvbmZpZy9sb2FkJyk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaENsdXN0ZXIgPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgeyBjbHVzdGVyOiBlbnYsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuXG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSB1cmwsIG1vc3QgcHJpb3JpdHlcbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCAmJiBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoO1xuICAgICAgcmV0dXJuIGN1c3RvbUNsdXN0ZXJVcmxbaW5kZXhdO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQ7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZE1ldGFwbGV4O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci50ZXN0OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnRlc3Q7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLmRldjpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5kZXY7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmxvY2FsaG9zdDtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaEJ1bmRsciA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOiB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuQnVuZGxyVXJsLnByZC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkJ1bmRsclVybC5kZXY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hEYXNBcGkgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBpZiAoZGFzQXBpVXJsLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkRBU19BUElfVVJMKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5EYXNBcGlVcmwuZGV2LnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hOZnRTdG9yYWdlID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIGlmICghbmZ0U3RvcmFnZUFwaUtleSkge1xuICAgICAgICAgIHRocm93IEVycm9yKFdhcm5uaW5nTWVzc2FnZS5ORlRfU1RPUkFHRV9BUElfS0VZKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmZ0U3RvcmFnZUFwaUtleTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5OZnRzdG9yYWdlQXBpS2V5LmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IFdSQVBQRURfVE9LRU5fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ1NvMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTInLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVNT19QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnTWVtbzFVaGtKUmZIeXZMTWNWdWNKd3hYZXVENzI4RXFWRER3UUR4Rk1ObycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRVRBUExFWF9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnbWV0YXFieHhVZXJkcTI4Y2oxUmJBV2tZUW0zeWJ6amI2YThidDUxOHgxcycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBDT01NSVRNRU5UOiBDb21taXRtZW50ID0gJ2NvbmZpcm1lZCc7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9HQVRFV0FZX1VSTCA9ICdodHRwczovL2lwZnMuaW8vaXBmcyc7XG4gIGV4cG9ydCBjb25zdCBJUllTX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vZ2F0ZXdheS5pcnlzLnh5eic7XG4gIGV4cG9ydCBjb25zdCBCVU5ETFJfTkVUV09SS19VUkwgPSBzd2l0Y2hCdW5kbHIoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IHN3aXRjaERhc0FwaShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPSBzd2l0Y2hOZnRTdG9yYWdlKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MU0NBTl9VUkwgPSAnaHR0cHM6Ly9zb2xzY2FuLmlvJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTEFOQUZNX1VSTCA9ICdodHRwczovL3NvbGFuYS5mbSc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9YUkFZX1VSTCA9ICdodHRwczovL3hyYXkuaGVsaXVzLnh5eic7XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUywgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbW1vbiB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFRyeSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zcmMvc2hhcmVkJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zcmMvcmVzdWx0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQmF0Y2gge1xuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIGFycjogQ29tbW9uLkNvbW1vbltdIHwgTWludC5NaW50W10sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBhIG9mIGFycikge1xuICAgICAgICAgIGlmICghYS5pbnN0cnVjdGlvbnMgJiYgIWEuc2lnbmVycykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgIGBvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgYmF0Y2hTdWJtaXQoKS5cbiAgICAgICAgICAgIEluZGV4OiAke2l9LCBTZXQgdmFsdWU6ICR7SlNPTi5zdHJpbmdpZnkoYSl9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLmluc3RydWN0aW9ucyk7XG4gICAgICAgIGNvbnN0IHNpZ25lcnMgPSBhcnIuZmxhdE1hcCgoYSkgPT4gYS5zaWduZXJzKTtcbiAgICAgICAgY29uc3QgZmVlUGF5ZXJzID0gYXJyLmZpbHRlcigoYSkgPT4gYS5mZWVQYXllciAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgbGV0IGZlZVBheWVyID0gc2lnbmVyc1swXTtcbiAgICAgICAgaWYgKGZlZVBheWVycy5sZW5ndGggPiAwICYmIGZlZVBheWVyc1swXS5mZWVQYXllcikge1xuICAgICAgICAgIGZlZVBheWVyID0gZmVlUGF5ZXJzWzBdLmZlZVBheWVyO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICAgIGlmIChmZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFtmZWVQYXllciwgLi4uc2lnbmVyc107XG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb25zLm1hcCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGVUeHNpemUuaXNNYXhUcmFuc2FjdGlvblNpemUodHJhbnNhY3Rpb24sIGZlZVBheWVyLnB1YmxpY0tleSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29tbWl0bWVudCwgQ29ubmVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTm9kZSB7XG4gIGNvbnN0IHNldHRlZCA9IHtcbiAgICBjbHVzdGVyVXJsOiAnJyxcbiAgICBjb21taXRtZW50OiBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgICBjdXN0b21DbHVzdGVyVXJsOiBbXSBhcyBzdHJpbmdbXSxcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvbiA9ICgpOiBDb25uZWN0aW9uID0+IHtcbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbihzZXR0ZWQuY2x1c3RlclVybCwgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjaGFuZ2VDb25uZWN0aW9uID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjb21taXRtZW50PzogQ29tbWl0bWVudDtcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiB2b2lkID0+IHtcbiAgICAvLyBpbml0aWFsaXplXG4gICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSAnJztcbiAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IFtdO1xuICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG5cbiAgICBjb25zdCB7IGNsdXN0ZXIsIGNvbW1pdG1lbnQsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuICAgIGlmIChjb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IGNvbW1pdG1lbnQ7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjb21taXRtZW50OiAnLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gICAgfVxuXG4gICAgaWYgKGNsdXN0ZXIpIHtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjbHVzdGVyOiBjbHVzdGVyIH0pO1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY2x1c3RlclVybDogJywgc2V0dGVkLmNsdXN0ZXJVcmwpO1xuICAgIH1cblxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsKSB7XG4gICAgICBkZWJ1Z0xvZygnIyBjdXN0b21DbHVzdGVyVXJsOiAnLCBjdXN0b21DbHVzdGVyVXJsKTtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjdXN0b21DbHVzdGVyVXJsIH0pO1xuICAgICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBjdXN0b21DbHVzdGVyVXJsO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIE5vZGUgY2hhbmdlIGNsdXN0ZXIsIGN1c3RvbSBjbHVzdGVyIHVybDogJyxcbiAgICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgY29uZmlybWVkU2lnID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgIGNvbW1pdG1lbnQ6IENvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgKSA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhdGVzdEJsb2NraGFzaCA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgcmV0dXJuIGF3YWl0IGNvbm5lY3Rpb25cbiAgICAgIC5jb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBibG9ja2hhc2g6IGxhdGVzdEJsb2NraGFzaC5ibG9ja2hhc2gsXG4gICAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGxhdGVzdEJsb2NraGFzaC5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1pdG1lbnQsXG4gICAgICApXG4gICAgICAudGhlbihSZXN1bHQub2spXG4gICAgICAuY2F0Y2goUmVzdWx0LmVycik7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBjb25zdCBNQVhfUkVUUklFUyA9IDM7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIENvbW1vbjxUID0gdW5kZWZpbmVkPiBpbXBsZW1lbnRzIENvbW1vblN0cnVjdHVyZTxUPiB7XG4gICAgc3RhdGljIE1BWF9UUkFOU0FDVElPTl9TSVpFID0gMTIzMjtcblxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICAgIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgICBmZWVQYXllcj86IEtleXBhaXI7XG4gICAgZGF0YT86IFQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgICAgZGF0YT86IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jICgpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbW1vbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFueU9iamVjdCB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJy4vcmVzdWx0JztcblxuLyoqXG4gKiBjb252ZXJ0IGJ1ZmZlciB0byBBcnJheVxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXJcbiAqIEByZXR1cm5zIG51bWJlcltdXG4gKi9cbmV4cG9ydCBjb25zdCBidWZmZXJUb0FycmF5ID0gKGJ1ZmZlcjogQnVmZmVyKTogbnVtYmVyW10gPT4ge1xuICBjb25zdCBudW1zID0gW107XG4gIGZvciAoY29uc3QgYnl0ZSBvZiBidWZmZXIpIHtcbiAgICBudW1zLnB1c2goYnVmZmVyW2J5dGVdKTtcbiAgfVxuICByZXR1cm4gbnVtcztcbn07XG5cbi8qKlxuICogT3ZlcndyaXRlIEpTIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqZWN0XG4gKiBAcGFyYW0ge092ZXJ3cml0ZU9iamVjdFtdfSB0YXJnZXRzXG4gKiBAcmV0dXJucyBPYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IG92ZXJ3cml0ZU9iamVjdCA9IChcbiAgb2JqZWN0OiB1bmtub3duLFxuICB0YXJnZXRzOiB7XG4gICAgZXhpc3RzS2V5OiBzdHJpbmc7XG4gICAgd2lsbDogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHVua25vd24gfTtcbiAgfVtdLFxuKTogdW5rbm93biA9PiB7XG4gIGNvbnN0IHRoYXQ6IEFueU9iamVjdCA9IG9iamVjdCBhcyBBbnlPYmplY3Q7XG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgZGVsZXRlIHRoYXRbdGFyZ2V0LmV4aXN0c0tleV07XG4gICAgdGhhdFt0YXJnZXQud2lsbC5rZXldID0gdGFyZ2V0LndpbGwudmFsdWU7XG4gIH0pO1xuICByZXR1cm4gdGhhdDtcbn07XG5cbi8qKlxuICogRGlzcGxheSBsb2cgZm9yIHNvbGFuYS1zdWl0ZS1jb25maWcuanNcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGExXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEyXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEzXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGE0XG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z0xvZyA9IChcbiAgZGF0YTE6IHVua25vd24sXG4gIGRhdGEyOiB1bmtub3duID0gJycsXG4gIGRhdGEzOiB1bmtub3duID0gJycsXG4gIGRhdGE0OiB1bmtub3duID0gJycsXG4pOiB2b2lkID0+IHtcbiAgaWYgKENvbnN0YW50cy5pc0RlYnVnZ2luZyA9PT0gJ3RydWUnIHx8IHByb2Nlc3MuZW52LkRFQlVHID09PSAndHJ1ZScpIHtcbiAgICBjb25zb2xlLmxvZygnW0RFQlVHXScsIGRhdGExLCBkYXRhMiwgZGF0YTMsIGRhdGE0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBzbGVlcCB0aW1lclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNcbiAqIEByZXR1cm5zIFByb21pc2U8bnVtYmVyPlxuICovXG5leHBvcnQgY29uc3Qgc2xlZXAgPSBhc3luYyAoc2VjOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgc2VjICogMTAwMCkpO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNOb2RlID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMgIT0gbnVsbCAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPSBudWxsXG4gICk7XG59O1xuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9ialxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmV4cG9ydCBjb25zdCBpc1Byb21pc2UgPSAob2JqOiB1bmtub3duKTogb2JqIGlzIFByb21pc2U8dW5rbm93bj4gPT4ge1xuICByZXR1cm4gKFxuICAgICEhb2JqICYmXG4gICAgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpICYmXG4gICAgdHlwZW9mIChvYmogYXMgYW55KS50aGVuID09PSAnZnVuY3Rpb24nXG4gICk7XG59O1xuXG4vKipcbiAqIFRyeSBhc3luYyBtb25hZFxuICpcbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PFQsIEU+PlxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGFzeW5jYmxvY2s6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBQcm9taXNlPFJlc3VsdDxULCBFPj47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oYmxvY2s6ICgpID0+IFQpOiBSZXN1bHQ8VCwgRT47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGlucHV0OiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUmVzdWx0PFQsIEVycm9yPiB8IFByb21pc2U8UmVzdWx0PFQsIEVycm9yPj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHYgPSBpbnB1dCgpO1xuICAgIGlmIChpc1Byb21pc2UodikpIHtcbiAgICAgIHJldHVybiB2LnRoZW4oXG4gICAgICAgICh4OiBUKSA9PiBSZXN1bHQub2soeCksXG4gICAgICAgIChlcnI6IEUpID0+IFJlc3VsdC5lcnIoZXJyKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXN1bHQub2sodik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZSk7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKGUgYXMgc3RyaW5nKSk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGZpbmFsbHlJbnB1dCkge1xuICAgICAgZGVidWdMb2coJyMgZmluYWxseSBpbnB1dDonLCBmaW5hbGx5SW5wdXQpO1xuICAgICAgZmluYWxseUlucHV0KCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfHVuZGVmaW5lZH0gY3JlYXRlZF9hdFxuICogQHJldHVybnMgRGF0ZSB8IHVuZGVmaW5lZFxuICovXG5leHBvcnQgY29uc3QgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgPSAoXG4gIGNyZWF0ZWRfYXQ6IG51bWJlciB8IHVuZGVmaW5lZCxcbik6IERhdGUgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoY3JlYXRlZF9hdCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShjcmVhdGVkX2F0ICogMTAwMCk7XG4gIH1cbiAgcmV0dXJuO1xufTtcblxuLyoqXG4gKiBHZXQgdW5peCB0aW1lc3RhbXBcbiAqXG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHVuaXhUaW1lc3RhbXAgPSAoKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbn07XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBNaW50PFQgPSBQdWJrZXk+IGltcGxlbWVudHMgTWludFN0cnVjdHVyZTxUPiB7XG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyOiBLZXlwYWlyO1xuICAgIGRhdGE6IFQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgICBkYXRhOiBULFxuICAgICkge1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICB9XG5cbiAgICBzdWJtaXQgPSBhc3luYyAoKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW50KSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IE1pbnRJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IHRoaXMuZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBDaGFuZ2UgbWV0YXBsZXggY2x1c3RlciBvbiBtYWlubmV0LWJldGEnKTtcbiAgICAgICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyOiBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFBhcnRpYWxTaWduU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgUGFydGlhbFNpZ24gaW1wbGVtZW50cyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB7XG4gICAgaGV4SW5zdHJ1Y3Rpb246IHN0cmluZztcbiAgICBkYXRhPzogUHVia2V5O1xuICAgIGNhblN1Ym1pdD86IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihpbnN0cnVjdGlvbnM6IHN0cmluZywgbWludD86IFB1YmtleSwgY2FuU3VibWl0ID0gZmFsc2UpIHtcbiAgICAgIHRoaXMuaGV4SW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLmRhdGEgPSBtaW50O1xuICAgICAgdGhpcy5jYW5TdWJtaXQgPSBjYW5TdWJtaXQ7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhcnRpYWxTaWduKSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWNvZGUgPSBCdWZmZXIuZnJvbSh0aGlzLmhleEluc3RydWN0aW9uLCAnaGV4Jyk7XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uRnJvbUpzb24gPSBUcmFuc2FjdGlvbi5mcm9tKGRlY29kZSk7XG4gICAgICAgIHRyYW5zYWN0aW9uRnJvbUpzb24ucGFydGlhbFNpZ24oZmVlUGF5ZXIudG9LZXlwYWlyKCkpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3aXJlVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbkZyb21Kc29uLnNlcmlhbGl6ZSgpO1xuICAgICAgICByZXR1cm4gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuc2VuZFJhd1RyYW5zYWN0aW9uKFxuICAgICAgICAgIHdpcmVUcmFuc2FjdGlvbixcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSwgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG4vLyBAaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgY29uc3QgTE9XX1ZBTFVFID0gMTI3OyAvLyAweDdmXG4gIGNvbnN0IEhJR0hfVkFMVUUgPSAxNjM4MzsgLy8gMHgzZmZmXG4gIGNvbnN0IE1BWF9UUkFOU0FDVElPTl9TSVpFID0gMTIzMjtcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgaGVhZGVyIHNpemVcbiAgICogQHBhcmFtIG4gZWxlbWVudHMgaW4gdGhlIGNvbXBhY3QgYXJyYXlcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiBhcnJheSBoZWFkZXJcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RIZWFkZXIgPSAobjogbnVtYmVyKSA9PlxuICAgIG4gPD0gTE9XX1ZBTFVFID8gMSA6IG4gPD0gSElHSF9WQUxVRSA/IDIgOiAzO1xuXG4gIC8qKlxuICAgKiBDb21wYWN0IHUxNiBhcnJheSBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEBwYXJhbSBzaXplIGJ5dGVzIHBlciBlYWNoIGVsZW1lbnRcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiBhcnJheVxuICAgKi9cbiAgY29uc3QgY29tcGFjdEFycmF5U2l6ZSA9IChuOiBudW1iZXIsIHNpemU6IG51bWJlcikgPT5cbiAgICBjb21wYWN0SGVhZGVyKG4pICsgbiAqIHNpemU7XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0eHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVUeFNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgZmVlUGF5ZXJQayA9IFtmZWVQYXllci50b0Jhc2U1OCgpXTtcblxuICAgIGNvbnN0IHNpZ25lcnMgPSBuZXcgU2V0PHN0cmluZz4oZmVlUGF5ZXJQayk7XG4gICAgY29uc3QgYWNjb3VudHMgPSBuZXcgU2V0PHN0cmluZz4oZmVlUGF5ZXJQayk7XG5cbiAgICBjb25zdCBpeHNTaXplID0gdHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLnJlZHVjZSgoYWNjLCBpeCkgPT4ge1xuICAgICAgaXgua2V5cy5mb3JFYWNoKCh7IHB1YmtleSwgaXNTaWduZXIgfSkgPT4ge1xuICAgICAgICBjb25zdCBwayA9IHB1YmtleS50b0Jhc2U1OCgpO1xuICAgICAgICBpZiAoaXNTaWduZXIpIHNpZ25lcnMuYWRkKHBrKTtcbiAgICAgICAgYWNjb3VudHMuYWRkKHBrKTtcbiAgICAgIH0pO1xuXG4gICAgICBhY2NvdW50cy5hZGQoaXgucHJvZ3JhbUlkLnRvQmFzZTU4KCkpO1xuXG4gICAgICBjb25zdCBuSW5kZXhlcyA9IGl4LmtleXMubGVuZ3RoO1xuICAgICAgY29uc3Qgb3BhcXVlRGF0YSA9IGl4LmRhdGEubGVuZ3RoO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICBhY2MgK1xuICAgICAgICAxICsgLy8gUElEIGluZGV4XG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUobkluZGV4ZXMsIDEpICtcbiAgICAgICAgY29tcGFjdEFycmF5U2l6ZShvcGFxdWVEYXRhLCAxKVxuICAgICAgKTtcbiAgICB9LCAwKTtcblxuICAgIHJldHVybiAoXG4gICAgICBjb21wYWN0QXJyYXlTaXplKHNpZ25lcnMuc2l6ZSwgNjQpICsgLy8gc2lnbmF0dXJlc1xuICAgICAgMyArIC8vIGhlYWRlclxuICAgICAgY29tcGFjdEFycmF5U2l6ZShhY2NvdW50cy5zaXplLCAzMikgKyAvLyBhY2NvdW50c1xuICAgICAgMzIgKyAvLyBibG9ja2hhc2hcbiAgICAgIGNvbXBhY3RIZWFkZXIodHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLmxlbmd0aCkgKyAvLyBpbnN0cnVjdGlvbnNcbiAgICAgIGl4c1NpemVcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBtYXggdHJhbnNhY3Rpb24gc2l6ZVxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gYSBzb2xhbmEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIGZlZVBheWVyIHRoZSBwdWJsaWNLZXkgb2YgdGhlIHNpZ25lclxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGlzT3ZlclRyYW5zYWN0aW9uU2l6ZSA9IChcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGNhbGN1bGF0ZVR4U2l6ZSh0cmFuc2FjdGlvbiwgZmVlUGF5ZXIpID4gTUFYX1RSQU5TQUNUSU9OX1NJWkU7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgS2V5cGFpciwgTEFNUE9SVFNfUEVSX1NPTCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZyB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgQmlnTnVtYmVyIH0gZnJvbSAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCB7IEV4cGxvcmVyLCBFeHBsb3Jlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbi8qKlxuICogQ3JlYXRlIGV4cGxvcmVyIHVybCBmb3IgYWNjb3VudCBhZGRyZXNzIG9yIHNpZ25hdHVyZVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5TdHJpbmcucHJvdG90eXBlLnRvRXhwbG9yZXJVcmwgPSBmdW5jdGlvbiAoXG4gIGV4cGxvcmVyOiBFeHBsb3JlciA9IEV4cGxvcmVyLlNvbHNjYW4sXG4gIG9wdGlvbnM6IFBhcnRpYWw8RXhwbG9yZXJPcHRpb25zPiA9IHt9LFxuKSB7XG4gIGNvbnN0IGVuZFBvaW50VXJsID0gTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQ7XG4gIGRlYnVnTG9nKCcjIHRvRXhwbG9yZXJVcmwgcnBjRW5kcG9pbnQ6JywgZW5kUG9pbnRVcmwpO1xuICBsZXQgY2x1c3RlciA9ICcnO1xuICBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIucHJkO1xuICB9IGVsc2UgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci50ZXN0O1xuICB9IGVsc2UgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfSBlbHNlIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9XG5cbiAgY29uc3QgYWRkcmVzc09yU2lnbmF0dXJlOiBzdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gIGxldCB1cmwgPSAnJztcblxuICBpZiAob3B0aW9ucy5yZXBsYWNlUGF0aCkge1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBpZiAoQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KGFkZHJlc3NPclNpZ25hdHVyZSkpIHtcbiAgICAvLyBhZGRyZXNzXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vYWRkcmVzcy8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gc2lnbmF0dXJlXG4gICAgLy8gZm9yIEludmFsaWQgdHlwZSBcIm5ldmVyXCIgb2YgYWRkcmVzc09yU2lnbmF0dXJlLCBzbyBgYXMgc3RyaW5nYFxuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFB1YktleShAc29sYW5hLXN1aXRlKSB0byBQdWJsaWNLZXkoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFB1YmxpY0tleVxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvUHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1B1YmtleSh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuUHViS2V5OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnRvU3RyaW5nKCkpO1xufTtcblxuLyoqXG4gKiBTZWNyZXQoQHNvbGFuYS1zdWl0ZSkgdG8gS2V5cGFpcihAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgS2V5cGFpclxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvS2V5cGFpciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNTZWNyZXQodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlNlY3JldDogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xufTtcblxuLyoqXG4gKiBMQU1QT1JUUyB0byBTT0xcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b1NvbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAuZGl2KExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuXG4vKipcbiAqIFNPTCB0byBMQU1QT1JUU1xuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvTGFtcG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLnRpbWVzKExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2csIHNsZWVwIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFjY291bnQsXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBUT0tFTl9QUk9HUkFNX0lELFxuICBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yLFxuICBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcixcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5pbXBvcnQgeyBBY2NvdW50IGFzIEtleXBhaXIgfSBmcm9tICcuL2tleXBhaXInO1xuXG4vKipcbiAqIEdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICpcbiAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICogQHBhcmFtIHtib29sZWFufSBhbGxvd093bmVyT2ZmQ3VydmVcbiAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nIHwgSW5zdHJ1Y3Rpb24+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQXNzb2NpYXRlZCB7XG4gICAgY29uc3QgUkVUUllfT1ZFUl9MSU1JVCA9IDEwO1xuICAgIGNvbnN0IFJFVFJZX1NMRUVQX1RJTUUgPSAzO1xuICAgIC8vQGludGVybmFsXG4gICAgY29uc3QgZ2V0ID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgICApOiBQcm9taXNlPHN0cmluZyB8IENvbW1vblN0cnVjdHVyZTxQdWJrZXk+PiA9PiB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIG5ldyBLZXlwYWlyLktleXBhaXIoeyBzZWNyZXQ6IGZlZVBheWVyIH0pLnB1YmtleSxcbiAgICAgICAgYWxsb3dPd25lck9mZkN1cnZlLFxuICAgICAgKTtcblxuICAgICAgaWYgKCFyZXMuaW5zdCkge1xuICAgICAgICByZXR1cm4gcmVzLnRva2VuQWNjb3VudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uPFB1YmtleT4oXG4gICAgICAgIFtyZXMuaW5zdF0sXG4gICAgICAgIFtdLFxuICAgICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgcmVzLnRva2VuQWNjb3VudCEsXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXRyeSBmdW5jdGlvbiBpZiBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCByZXRyeUdldE9yQ3JlYXRlID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgIGxldCBjb3VudGVyID0gMTtcbiAgICAgIHdoaWxlIChjb3VudGVyIDwgUkVUUllfT1ZFUl9MSU1JVCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBnZXQobWludCwgb3duZXIsIGZlZVBheWVyLCB0cnVlKTtcblxuICAgICAgICAgIGlmIChpbnN0ICYmIHR5cGVvZiBpbnN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgaW5zdCk7XG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGluc3QgaW5zdGFuY2VvZiBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKSB7XG4gICAgICAgICAgICAoYXdhaXQgaW5zdC5zdWJtaXQoKSkubWFwKFxuICAgICAgICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKG9rKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdC5kYXRhO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnTG9nKCcjIEVycm9yIHN1Ym1pdCByZXRyeUdldE9yQ3JlYXRlOiAnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZGVidWdMb2coYCMgcmV0cnk6ICR7Y291bnRlcn0gY3JlYXRlIHRva2VuIGFjY291bnQ6IGAsIGUpO1xuICAgICAgICAgIGRlYnVnTG9nKGAjIG1pbnQ6ICR7bWludH0sIG93bmVyOiAke293bmVyfSwgZmVlUGF5ZXI6ICR7ZmVlUGF5ZXJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgc2xlZXAoUkVUUllfU0xFRVBfVElNRSk7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICAgIH1cbiAgICAgIHRocm93IEVycm9yKGByZXRyeSBhY3Rpb24gaXMgb3ZlciBsaW1pdCAke1JFVFJZX09WRVJfTElNSVR9YCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFtNYWluIGxvZ2ljXUdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gICAgICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAgICovXG4gICAgZXhwb3J0IGNvbnN0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyPzogUHVia2V5LFxuICAgICAgYWxsb3dPd25lck9mZkN1cnZlID0gZmFsc2UsXG4gICAgKTogUHJvbWlzZTx7XG4gICAgICB0b2tlbkFjY291bnQ6IHN0cmluZztcbiAgICAgIGluc3Q6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgfT4gPT4ge1xuICAgICAgY29uc3QgYXNzb2NpYXRlZFRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gRG9udCB1c2UgUmVzdWx0XG4gICAgICAgIGF3YWl0IGdldEFjY291bnQoXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKS5jb21taXRtZW50LFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yKSAmJlxuICAgICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gb3duZXIgOiBmZWVQYXllcjtcblxuICAgICAgICBjb25zdCBpbnN0ID0gY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICAgIHBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3QsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEtleXBhaXIgYXMgT3JpZ2luYWwsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBjbGFzcyBLZXlwYWlyIHtcbiAgICBzZWNyZXQ6IFNlY3JldDtcbiAgICBwdWJrZXk6IFB1YmtleTtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwdWJrZXk/OiBQdWJrZXk7IHNlY3JldDogU2VjcmV0IH0pIHtcbiAgICAgIGlmICghcGFyYW1zLnB1YmtleSkge1xuICAgICAgICBjb25zdCBrZXlwYWlyID0gcGFyYW1zLnNlY3JldC50b0tleXBhaXIoKTtcbiAgICAgICAgdGhpcy5wdWJrZXkgPSBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdWJrZXkgPSBwYXJhbXMucHVia2V5O1xuICAgICAgfVxuICAgICAgdGhpcy5zZWNyZXQgPSBwYXJhbXMuc2VjcmV0O1xuICAgIH1cblxuICAgIHRvUHVibGljS2V5KCk6IFB1YmxpY0tleSB7XG4gICAgICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnB1YmtleSk7XG4gICAgfVxuXG4gICAgdG9LZXlwYWlyKCk6IE9yaWdpbmFsIHtcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy5zZWNyZXQpO1xuICAgICAgcmV0dXJuIE9yaWdpbmFsLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzUHVia2V5ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBQdWJrZXkgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17MzIsNDR9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgaXNTZWNyZXQgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFNlY3JldCA9PlxuICAgICAgL15bMC05YS16QS1aXXs4Nyw4OH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBjcmVhdGUgPSAoKTogS2V5cGFpciA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlyID0gT3JpZ2luYWwuZ2VuZXJhdGUoKTtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvS2V5UGFpciA9IChrZXlwYWlyOiBPcmlnaW5hbCk6IEtleXBhaXIgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLWJ1YmJsZWd1bSc7XG5pbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIFBkYSB7XG4gICAgZXhwb3J0IGNvbnN0IGdldE1ldGFkYXRhID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRNYXN0ZXJFZGl0aW9uID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdlZGl0aW9uJyksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldFRyZWVBdXRob3JpdHkgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFthZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRCZ3VtU2lnbmVyID0gKCk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbQnVmZmVyLmZyb20oJ2NvbGxlY3Rpb25fY3BpJywgJ3V0ZjgnKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRBc3NldElkID0gKGFkZHJlc3M6IFB1YmtleSwgbGVhZkluZGV4OiBudW1iZXIpOiBQdWJrZXkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IG5ldyBCTi5CTihsZWFmSW5kZXgpO1xuICAgICAgY29uc3QgW2Fzc2V0SWRdID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnYXNzZXQnLCAndXRmOCcpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICAgIFVpbnQ4QXJyYXkuZnJvbShub2RlLnRvQXJyYXkoJ2xlJywgOCkpLFxuICAgICAgICBdLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gYXNzZXRJZC50b1N0cmluZygpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBY2NvdW50IGFzIEFzc29jaWF0ZWQgfSBmcm9tICcuL2Fzc29jaWF0ZWQnO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcbmltcG9ydCB7IEFjY291bnQgYXMgUGRhIH0gZnJvbSAnLi9wZGEnO1xuXG5leHBvcnQgY29uc3QgQWNjb3VudCA9IHtcbiAgLi4uQXNzb2NpYXRlZCxcbiAgLi4uS2V5cGFpcixcbiAgLi4uUGRhLFxufTtcbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQmF0Y2ggfSBmcm9tICcuL2JhdGNoJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21tb24gfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUGFydGlhbFNpZ24gfSBmcm9tICcuL3BhcnRpYWwtc2lnbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ2FsY3VsYXRlVHhzaXplIH0gZnJvbSAnLi9jYWxjdWxhdGUtdHhzaXplJztcbmltcG9ydCAnfi90eXBlcy9nbG9iYWwnO1xuaW1wb3J0ICd+L2dsb2JhbCc7XG5cbmV4cG9ydCBjb25zdCBUcmFuc2FjdGlvbkJ1aWxkZXIgPSB7XG4gIC4uLkJhdGNoLFxuICAuLi5DYWxjdWxhdGVUeHNpemUsXG4gIC4uLk1pbnQsXG4gIC4uLkNvbW1vbixcbiAgLi4uUGFydGlhbFNpZ24sXG59O1xuIiwgIi8vIGZvcmtlZDogaHR0cHM6Ly9naXRodWIuY29tL2JhZHJhcC9yZXN1bHQsIHRoYW5rIHlvdSBhZHZpY2UgIEBqdmlpZGVcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2lnbmF0dXJlIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIENvbW1vblN0cnVjdHVyZSxcbiAgTWludFN0cnVjdHVyZSxcbiAgUGFydGlhbFNpZ25TdHJ1Y3R1cmUsXG59IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuXG4gIHVud3JhcCgpOiBUO1xuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFU7XG4gIHVud3JhcDxVLCBWPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVik6IFUgfCBWO1xuICAvLyB1bmlmaWVkLXNpZ25hdHVyZXMuIGludG8gbGluZSAxMFxuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFUpOiBVO1xuICB1bndyYXAob2s/OiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gdW5rbm93bik6IHVua25vd24ge1xuICAgIGNvbnN0IHIgPSB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rID8gb2sodmFsdWUpIDogdmFsdWUpLFxuICAgICAgKGVycm9yKSA9PiAoZXJyID8gUmVzdWx0Lm9rKGVycihlcnJvcikpIDogUmVzdWx0LmVycihlcnJvcikpLFxuICAgICk7XG4gICAgaWYgKHIuaXNFcnIpIHtcbiAgICAgIHRocm93IHIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByLnZhbHVlO1xuICB9XG5cbiAgLy8vLyBtYXAgLy8vL1xuICBtYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFJlc3VsdDxVLCBFPjtcbiAgbWFwPFUsIEYgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gVSxcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gRixcbiAgKTogUmVzdWx0PFUsIEY+O1xuICBtYXAob2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiBFcnJvcik6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIgPyBlcnIoZXJyb3IpIDogZXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8vIGNoYWluIC8vLy9cbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc2luZ2xlIFRyYW5zYWN0aW9uQnVpbGRlciAvLy8vXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgYXN5bmMgc3VibWl0KFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5tYXAoXG4gICAgICBhc3luYyAob2spID0+IHtcbiAgICAgICAgZGVidWdMb2coJyMgcmVzdWx0IHNpbmdsZSBzdWJtaXQ6ICcsIG9rKTtcbiAgICAgICAgaWYgKGZlZVBheWVyKSB7XG4gICAgICAgICAgY29uc3Qgb2JqID0gb2sgYXMgUGFydGlhbFNpZ25TdHJ1Y3R1cmU7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IG9iai5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG9iaiA9IG9rIGFzIENvbW1vblN0cnVjdHVyZSB8IE1pbnRTdHJ1Y3R1cmU7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IG9iai5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihyZXMuZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnZhbHVlO1xuICB9XG59XG5cbi8vLyBNdWx0aXBsZSBUcmFuc2FjdGlvbkJ1aWxkZXIgLy8vL1xuZGVjbGFyZSBnbG9iYWwge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgaW50ZXJmYWNlIEFycmF5PFQ+IHtcbiAgICBzdWJtaXQoZmVlUGF5ZXI/OiBTZWNyZXQpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PjtcbiAgfVxufVxuXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKGZlZVBheWVyPzogU2VjcmV0KSB7XG4gIGlmIChmZWVQYXllcikge1xuICAgIGxldCBpID0gMTtcbiAgICBmb3IgYXdhaXQgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgICBpZiAob2JqLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9IGVsc2UgaWYgKG9iai52YWx1ZS5jYW5TdWJtaXQpIHtcbiAgICAgICAgZGVidWdMb2coJyMgUmVzdWx0IGJhdGNoIGNhblN1Ym1pdCcpO1xuICAgICAgICBjb25zdCBzaWcgPSBhd2FpdCAob2JqIGFzIFBhcnRpYWxTaWduU3RydWN0dXJlKS5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgICBpZiAoc2lnLmlzRXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHNpZztcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhzaWcudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVidWdMb2coJyMgUmVzdWx0IGJhdGNoIG90aGVyIHRoYW4gY2FuU3VibWl0Jyk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PSBpKSB7XG4gICAgICAgICAgLy8gbGFzdCBvYmplY3RcbiAgICAgICAgICByZXR1cm4gb2JqLnN1Ym1pdChmZWVQYXllcik7XG4gICAgICAgIH1cbiAgICAgICAgb2JqLnN1Ym1pdChmZWVQYXllcik7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGluc3RydWN0aW9uczogQ29tbW9uU3RydWN0dXJlIHwgTWludFN0cnVjdHVyZVtdID0gW107XG4gICAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoJ09ubHkgQXJyYXkgSW5zdHJ1Y3Rpb24gb2JqZWN0JykpO1xuICAgICAgfVxuICAgIH1cbiAgICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggc3VibWl0OiAnLCBpbnN0cnVjdGlvbnMpO1xuICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkJhdGNoKCkuc3VibWl0KGluc3RydWN0aW9ucyk7XG4gIH1cbn07XG5cbmNsYXNzIEludGVybmFsT2s8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IHRydWU7XG4gIHJlYWRvbmx5IGlzRXJyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHZhbHVlOiBUKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIF9lcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBJbnRlcm5hbEVycjxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gZmFsc2U7XG4gIHJlYWRvbmx5IGlzRXJyID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgZXJyb3I6IEUpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIF9vazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVzdWx0IHtcbiAgZXhwb3J0IHR5cGUgT2s8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsT2s8VCwgRT47XG4gIGV4cG9ydCB0eXBlIEVycjxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxFcnI8VCwgRT47XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4odmFsdWU6IFQpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxPayh2YWx1ZSk7XG4gIH1cbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I/OiBFKTogUmVzdWx0PFQsIEU+O1xuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcjogRSk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbEVycihlcnJvciB8fCBFcnJvcigpKTtcbiAgfVxuXG4gIHR5cGUgVSA9IFJlc3VsdDx1bmtub3duPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICAgIFIxNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0LCBSMTVdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgICBPa1R5cGU8UjE1PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICAgIHwgUjE1XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICBSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMSB8IFIxMiB8IFIxM1xuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTJdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjhdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjg+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjddLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjc+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjVdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND4sIE9rVHlwZTxSNT5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQ+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVSwgUjMgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSM10sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+XSwgRXJyVHlwZTxSMCB8IFIxIHwgUjI+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+XSwgRXJyVHlwZTxSMCB8IFIxPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMF0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPl0sIEVyclR5cGU8UjA+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IFtdKTogUmVzdWx0PFtdPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxUIGV4dGVuZHMgVVtdIHwgUmVjb3JkPHN0cmluZywgVT4+KFxuICAgIG9iajogVCxcbiAgKTogUmVzdWx0PFxuICAgIHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgST4gPyBJIDogbmV2ZXIgfSxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPiA/IEUgOiBuZXZlcjtcbiAgICB9W2tleW9mIFRdXG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgY29uc3QgcmVzQXJyID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqKSB7XG4gICAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gYXMgdW5rbm93bjtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZXN1bHQub2socmVzQXJyKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPik7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3QgaXRlbSA9IChvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pW2tleV07XG4gICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICAgIHJlc1trZXldID0gaXRlbS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5vayhyZXMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3IgPSBFcnJvcj4gPVxuICB8IFJlc3VsdC5PazxULCBFPlxuICB8IFJlc3VsdC5FcnI8VCwgRT47XG5cbnR5cGUgT2tUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDxpbmZlciBPPiA/IE8gOiBuZXZlcjtcbnR5cGUgRXJyVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT5cbiAgPyBFXG4gIDogbmV2ZXI7XG4iLCAiaW1wb3J0IHsgSW50ZXJuYWxDb2xsZWN0aW9uIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgR3JvdXBpbmcgfSBmcm9tICd+L3R5cGVzL2Rhcy1hcGknO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbiBhcyBDb2xsZWN0aW9uVHlwZSxcbiAgSW5wdXRDb2xsZWN0aW9uLFxuICBPcHRpb24sXG59IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbiB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDb2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGlucHV0LnRvUHVibGljS2V5KCksXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4sXG4gICAgKTogQ29sbGVjdGlvblR5cGUgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogR3JvdXBpbmdbXSk6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBvdXRwdXQuZmluZCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmdyb3VwX2tleSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmdyb3VwX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMgPyByZXMuZ3JvdXBfdmFsdWUgOiAnJztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDcmVhdG9ycywgSW5wdXRDcmVhdG9ycywgT3B0aW9uIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Db21wcmVzc2VkTmZ0SW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogSW50ZXJuYWxDcmVhdG9yc1tdID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0IS5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPixcbiAgICApOiBDcmVhdG9yc1tdIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQge1xuICBNZXRhZGF0YUFyZ3MsXG4gIFRva2VuUHJvZ3JhbVZlcnNpb24sXG4gIFRva2VuU3RhbmRhcmQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogTWV0YWRhdGFBcmdzID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0NvbXByZXNzZWROZnRJbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogZmFsc2UsXG4gICAgICAgIGlzTXV0YWJsZTogaW5wdXQuaXNNdXRhYmxlID8/IGZhbHNlLFxuICAgICAgICBlZGl0aW9uTm9uY2U6IDAsXG4gICAgICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUsXG4gICAgICAgIHRva2VuUHJvZ3JhbVZlcnNpb246IFRva2VuUHJvZ3JhbVZlcnNpb24uT3JpZ2luYWwsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJleHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUm95YWx0eSB7XG4gICAgZXhwb3J0IGNvbnN0IFRIUkVTSE9MRCA9IDEwMDtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQXNzZXRBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvbmZ0JztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBOZnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChvdXRwdXQ6IEFzc2V0QW5kT2ZmY2hhaW4pOiBNZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5pZC50b1N0cmluZygpLFxuICAgICAgICBjb2xsZWN0aW9uTWludDogQ29sbGVjdGlvbi5Db2xsZWN0aW9uTWludC5pbnRvVXNlcihcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5ncm91cGluZyxcbiAgICAgICAgKSBhcyBQdWJrZXksXG4gICAgICAgIGF1dGhvcml0aWVzOiBvdXRwdXQub25jaGFpbi5hdXRob3JpdGllcyxcbiAgICAgICAgcm95YWx0eTogUm95YWx0eS5Sb3lhbHR5LmludG9Vc2VyKG91dHB1dC5vbmNoYWluLnJveWFsdHkucGVyY2VudCksXG4gICAgICAgIG5hbWU6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQubWV0YWRhdGEubmFtZSxcbiAgICAgICAgc3ltYm9sOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLnN5bWJvbCxcbiAgICAgICAgdXJpOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uY3JlYXRvcnMpISxcbiAgICAgICAgdHJlZUFkZHJlc3M6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLnRyZWUsXG4gICAgICAgIGlzQ29tcHJlc3NlZDogb3V0cHV0Lm9uY2hhaW4uY29tcHJlc3Npb24uY29tcHJlc3NlZCxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5tdXRhYmxlLFxuICAgICAgICBpc0J1cm46IG91dHB1dC5vbmNoYWluLmJ1cm50LFxuICAgICAgICBlZGl0aW9uTm9uY2U6IG91dHB1dC5vbmNoYWluLnN1cHBseS5lZGl0aW9uX25vbmNlLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBvdXRwdXQub25jaGFpbi5yb3lhbHR5LnByaW1hcnlfc2FsZV9oYXBwZW5lZCxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSEsXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBNZW1vLCBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNZW1vLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG91dHB1dFRyYW5zZmVyPzogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgICBpZiAob3V0cHV0VHJhbnNmZXIgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSAhPT0gJycpIHtcbiAgICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSA9PT0gJ3NwbC10b2tlbicpIHtcbiAgICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBoaXN0b3J5Lm1lbW8gPSBvdXRwdXQucGFyc2VkO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTWludFRvIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE1pbnRUbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQgYXMgc3RyaW5nO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBvdmVyd3JpdGVPYmplY3QsIFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQge30gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBGaWxlVHlwZSwgUHJvcGVydGllcywgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUHJvcGVydGllcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IGFzeW5jIChcbiAgICAgIGlucHV0OiBQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2tGdW5jOiAoXG4gICAgICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICAgICkgPT4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+LFxuICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxQcm9wZXJ0aWVzPiA9PiB7XG4gICAgICBpZiAoIWlucHV0IHx8ICFpbnB1dC5maWxlcykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGlucHV0LmZpbGVzLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICAgIGlmICghZmlsZS5maWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBjYWxsYmFja0Z1bmMoZmlsZS5maWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgICAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvdmVyd3JpdGVPYmplY3QoZmlsZSwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBleGlzdHNLZXk6ICdmaWxlUGF0aCcsXG4gICAgICAgICAgICAgIHdpbGw6IHsga2V5OiAndXJpJywgdmFsdWU6IHJlcy52YWx1ZSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgLi4uaW5wdXQsIGZpbGVzIH0gYXMgUHJvcGVydGllcztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBPcHRpb24sIFVzZXMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFVzZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAob3V0cHV0OiBPcHRpb248VXNlcz4pOiBVc2VzIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX1VzZXMgfSBmcm9tICcuL3VzZXMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIFRva2VuTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBNZXRhZGF0YUFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRva2VuTWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXRUb2tlbk1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBudWxsLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE1ldGFkYXRhQW5kT2ZmY2hhaW4sXG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICAgICk6IFRva2VuTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sKSxcbiAgICAgICAgdG9rZW5BbW91bnQ6IHRva2VuQW1vdW50LFxuICAgICAgICB1cmk6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgdXNlczogX1VzZXMuVXNlcy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4udXNlcyksXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCksXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gICAgLy8gZGVsZXRlIE5VTEwoMHgwMCkgc3RyaW5ncyBmdW5jdGlvblxuICAgIGV4cG9ydCBjb25zdCBkZWxldGVOdWxsU3RyaW5ncyA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcMC9nLCAnJyk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5tdWx0aXNpZ0F1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5tdWx0aXNpZ0F1dGhvcml0eTtcbiAgICAgIGhpc3Rvcnkuc2lnbmVycyA9IG91dHB1dC5wYXJzZWQuaW5mby5zaWduZXJzO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlciB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXIsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICBpZiAoIW91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbiB8fCAhb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgIGhpc3Rvcnkuc29sID0gb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzPy50b1NvbCgpLnRvU3RyaW5nKCk7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbXByZXNzZWROZnRNZXRhZGF0YSB9IGZyb20gJy4vY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTmZ0IH0gZnJvbSAnLi9uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1lbW8gfSBmcm9tICcuL21lbW8nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJlZ3VsYXJOZnRNZXRhZGF0YSB9IGZyb20gJy4vcmVndWxhci1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFByb3BlcnRpZXMgfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJveWFsdHkgfSBmcm9tICcuL3JveWFsdHknO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRva2VuTWV0YWRhdGEgfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICcuL3RyYW5zZmVyLWNoZWNrZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5cbmV4cG9ydCBjb25zdCBDb252ZXJ0ZXIgPSB7XG4gIC4uLkNvbXByZXNzZWROZnRNZXRhZGF0YSxcbiAgLi4uQ29sbGVjdGlvbixcbiAgLi4uQ3JlYXRvcnMsXG4gIC4uLk5mdCxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uUmVndWxhck5mdE1ldGFkYXRhLFxuICAuLi5Qcm9wZXJ0aWVzLFxuICAuLi5Sb3lhbHR5LFxuICAuLi5Ub2tlbk1ldGFkYXRhLFxuICAuLi5UcmFuc2ZlckNoZWNrZWQsXG4gIC4uLlRyYW5zZmVyLFxuICAuLi5Vc2VzLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsa0JBQXNDO0FBQ3RDLGtCQUE2QjtBQUU3QixJQUFJLFNBQVMsWUFBQUE7QUFFTixJQUFVO0FBQUEsQ0FBVixDQUFVQyxlQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLHFCQUFWO0FBQ0wsVUFBTSxhQUFhO0FBQ25CLFFBQUksWUFBWTtBQUNULElBQU1BLGlCQUFBLHNCQUFzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU81QixJQUFNQSxpQkFBQSxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUXBCLElBQU1BLGlCQUFBLHVCQUF1QixNQUFlO0FBQ2pELFlBQU0sY0FBYyxLQUFLLE9BQU87QUFDaEMsWUFBTSxjQUFjLElBQUk7QUFDeEIsVUFBSSxDQUFDLGFBQWEsY0FBYyxhQUFhO0FBQzND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QU0sQ0FBQyxDQUFDO0FBQUEsSUFDdkUsT0FBTztBQUNMLGNBQVEsSUFBSSxlQUFlLFNBQVMsQ0FBQyxFQUFFLEtBQUssU0FBUyxPQUFPLENBQUMsQ0FBQztBQUFBLElBQ2hFO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGVBQWUsQ0FDbkIsWUFDQSxRQUNtQztBQUNuQyxXQUFPLElBQUksTUFBTTtBQUNmLFVBQUksQ0FBQyxZQUFZO0FBQ2YsY0FBTSxZQUFZLEtBQUssUUFBUSxPQUFPLFVBQVU7QUFBQSxNQUNsRDtBQUNBLFVBQUksV0FBVyxVQUFVLElBQUlBLFdBQUEsWUFBWTtBQUN2QyxjQUFNLFlBQVksS0FBSyxRQUFRLGFBQWEsWUFBWTtBQUFBLFVBQ3RELFdBQVdBLFdBQUE7QUFBQSxVQUNYLFdBQVc7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNIO0FBQ0EsVUFBSSxDQUFDLDhDQUE4QyxLQUFLLFVBQVUsR0FBRztBQUNuRSxjQUFNLFlBQVksS0FBSyxRQUFRLGFBQWEsVUFBVTtBQUFBLE1BQ3hEO0FBQ0EsYUFBTyxRQUFRO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQTlNZTtBQWlOVixJQUFNLGlCQUFOLGNBQTZCLE1BQU07QUFBQSxFQUN4QztBQUFBLEVBQ0EsWUFBWSxTQUFpQixTQUFvQjtBQUMvQyxVQUFNLE9BQU87QUFDYixTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUNGOyIsCiAgIm5hbWVzIjogWyJTb2xhbmFKc29uQ29uZmlnIiwgIkNvbnN0YW50cyIsICJXYXJubmluZ01lc3NhZ2UiLCAiQ2x1c3RlciIsICJFbmRQb2ludFVybCIsICJCdW5kbHJVcmwiLCAiRGFzQXBpVXJsIiwgIk5mdHN0b3JhZ2VBcGlLZXkiLCAiY3VzdG9tQ2x1c3RlclVybCIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJOb2RlIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJDb21tb24iLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF93ZWIzIiwgIkFjY291bnQiLCAiS2V5cGFpciIsICJicyIsICJPcmlnaW5hbCIsICJBY2NvdW50IiwgIkFzc29jaWF0ZWQiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgIkFjY291bnQiLCAiUGRhIiwgIkJOIiwgIkFjY291bnQiLCAiaW1wb3J0X2JzNTgiLCAiQWNjb3VudCIsICJicyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlJlc3VsdCIsICJDb252ZXJ0ZXIiLCAiQ29sbGVjdGlvbiIsICJDb2xsZWN0aW9uTWludCIsICJDb252ZXJ0ZXIiLCAiQ3JlYXRvcnMiLCAiQ29udmVydGVyIiwgIkNvbXByZXNzZWROZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUm95YWx0eSIsICJDb252ZXJ0ZXIiLCAiTmZ0IiwgIkNvbnZlcnRlciIsICJNZW1vIiwgIkNvbnZlcnRlciIsICJNaW50IiwgIkNvbnZlcnRlciIsICJSZWd1bGFyTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlByb3BlcnRpZXMiLCAiQ29udmVydGVyIiwgIlVzZXMiLCAiQ29udmVydGVyIiwgIlRva2VuTWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXIiLCAiQ29udmVydGVyIiwgIlZhbGlkYXRvciIsICJNZXNzYWdlIiwgIkNvbnZlcnRlciJdCn0K