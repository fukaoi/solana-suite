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
  Account: () => Account,
  FilterOptions: () => FilterOptions,
  FilterType: () => FilterType,
  ModuleName: () => ModuleName,
  Node: () => Node,
  RegularNft: () => RegularNft10,
  Validator: () => Validator,
  ValidatorError: () => ValidatorError
});
module.exports = __toCommonJS(src_exports);

// ../suite-spl-token/src/add.ts
var import_spl_token2 = require("@solana/spl-token");

// ../shared/src/constants.ts
var import_web3 = require("@solana/web3.js");
var import_load = __toESM(require("@solana-suite/config/load"));
var Config = import_load.default;
var Constants;
((Constants2) => {
  let WarnningMessage;
  ((WarnningMessage2) => {
    const THRESHHOLD = 5;
    let isDisplay = false;
    WarnningMessage2.NFT_STORAGE_API_KEY = `
        [Warning]
        --------------------------------------
        You need to update nftStorageApiKey define parameter in solana-suite.json.
        Can get api key from https://nft.storage/
        --------------------------------------
        `;
    WarnningMessage2.DAS_API_URL = `
        [Warning]
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
      case "mainnet-beta" /* prd */:
        if (Constants2.dasApiUrl.length < 1) {
          throw Error(Constants2.WarnningMessage.DAS_API_URL);
        }
        const urls = "https://node1.irys.xyz,https://node2.irys.xyz" /* prd */.split(",");
        const index = Date.now() % urls.length;
        return urls[index];
      default: {
        const urls2 = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639" /* dev */.split(",");
        const index2 = Date.now() % urls2.length;
        return urls2[index2];
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

// ../shared/src/result.ts
var AbstractResult = class {
  // unified-signatures. into line 10
  // unwrap<U>(ok: (value: T) => U, err: (error: E) => U): U;
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
  /// submit (alias Instruction.submit) ////
  /* eslint-disable @typescript-eslint/no-explicit-any */
  async submit(feePayer) {
    try {
      const instruction = this.unwrap();
      if (instruction.instructions || instruction.hexInstruction || instruction[0].instructions || instruction[0].hexInstruction) {
        return await instruction.submit(feePayer);
      }
      return Result.err(Error("Only Instruction object"));
    } catch (err) {
      return Result.err(err);
    }
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
((Result21) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result21.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result21.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result21.ok(resArr);
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
    return Result21.ok(res);
  }
  Result21.all = all;
})(Result || (Result = {}));

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

// ../transaction/src/batch.ts
var import_web33 = require("@solana/web3.js");

// ../transaction/src/define.ts
var MAX_RETRIES = 3;

// ../transaction/src/batch.ts
var BatchTransaction = class {
  submit = async (arr) => {
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
  };
};
Array.prototype.submit = async function() {
  const instructions = [];
  return Try(async () => {
    let i = 0;
    for (const obj of this) {
      if (obj.isErr) {
        const errorMess = obj.error.message;
        throw Error(`[Array index of caught 'Result.err': ${i}]${errorMess}`);
      } else if (obj.isOk) {
        instructions.push(obj.value);
      } else {
        instructions.push(obj);
      }
      i++;
    }
    return new BatchTransaction().submit(instructions);
  });
};

// ../transaction/src/common.ts
var import_web34 = require("@solana/web3.js");
var Transaction = class _Transaction {
  static MAX_RETRIES = 3;
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
      if (!(this instanceof _Transaction)) {
        throw Error("only Instruction object that can use this");
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
        maxRetries: _Transaction.MAX_RETRIES
      };
      return await (0, import_web34.sendAndConfirmTransaction)(
        Node.getConnection(),
        transaction,
        finalSigners,
        options
      );
    });
  };
};

// ../transaction/src/mint.ts
var import_web35 = require("@solana/web3.js");
var MintTransaction = class _MintTransaction {
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
      if (!(this instanceof _MintTransaction)) {
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
};

// ../transaction/src/partial-sign.ts
var import_web36 = require("@solana/web3.js");
var PartialSignTransaction = class _PartialSignTransaction {
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
      if (!(this instanceof _PartialSignTransaction)) {
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
};
Array.prototype.submit = async function(feePayer) {
  for await (const obj of this) {
    const partialSignTx = obj;
    if (partialSignTx.canSubmit) {
      (await partialSignTx.submit(feePayer)).match(
        (ok) => Node.confirmedSig(ok, "finalized"),
        (err) => {
          throw err;
        }
      );
    } else {
      return await partialSignTx.submit(feePayer);
    }
  }
};

// ../global/src/index.ts
var import_web37 = require("@solana/web3.js");
var import_bignumber = require("bignumber.js");
var import_bs58 = __toESM(require("bs58"));
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
  if (Account.Keypair.isPubkey(addressOrSignature)) {
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
  if (!Account.Keypair.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new import_web37.PublicKey(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = import_bs58.default.decode(this.toString());
  return import_web37.Keypair.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return (0, import_bignumber.BigNumber)(this).div(import_web37.LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return (0, import_bignumber.BigNumber)(this).times(import_web37.LAMPORTS_PER_SOL).toNumber();
};

// ../account/src/associated.ts
var import_spl_token = require("@solana/spl-token");

// ../account/src/keypair.ts
var import_web38 = require("@solana/web3.js");
var import_bs582 = __toESM(require("bs58"));
var Account2;
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
      return new import_web38.PublicKey(this.pubkey);
    }
    toKeypair() {
      const decoded = import_bs582.default.decode(this.secret);
      return import_web38.Keypair.fromSecretKey(decoded);
    }
    static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
    static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
    static create = () => {
      const keypair = import_web38.Keypair.generate();
      return new Keypair4({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs582.default.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair4({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs582.default.encode(keypair.secretKey)
      });
    };
  }
  Account5.Keypair = Keypair4;
})(Account2 || (Account2 = {}));

// ../account/src/associated.ts
var Account3;
((Account5) => {
  let Associated;
  ((Associated2) => {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    const get = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
      const res = await (0, Associated2.makeOrCreateInstruction)(
        mint,
        owner,
        new Account2.Keypair({ secret: feePayer }).pubkey,
        allowOwnerOffCurve
      );
      if (!res.inst) {
        return res.tokenAccount;
      }
      return new Transaction(
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
          } else if (inst instanceof Transaction) {
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
})(Account3 || (Account3 = {}));

// ../account/src/pda.ts
var import_web39 = require("@solana/web3.js");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_mpl_bubblegum = require("@metaplex-foundation/mpl-bubblegum");
var import_bn = __toESM(require("bn.js"));
var Account4;
((Account5) => {
  let Pda;
  ((Pda2) => {
    Pda2.getMetadata = (address) => {
      const [publicKey] = import_web39.PublicKey.findProgramAddressSync(
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
      const [publicKey] = import_web39.PublicKey.findProgramAddressSync(
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
      const [publicKey] = import_web39.PublicKey.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = import_web39.PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getAssetId = (address, leafIndex) => {
      const node = new import_bn.default.BN(leafIndex);
      const [assetId] = import_web39.PublicKey.findProgramAddressSync(
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
})(Account4 || (Account4 = {}));

// ../account/src/index.ts
var Account = {
  ...Account3,
  ...Account2,
  ...Account4
};

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
            if (key in metadata) {
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
  SplToken11.add = async (token, owner, signers, totalAmount, mintDecimal, options = {}) => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const tokenAssociated = await Account.Associated.retryGetOrCreate(
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
      return new Transaction([inst], keypairs, payer.toKeypair(), token);
    });
  };
})(SplToken2 || (SplToken2 = {}));

// ../suite-spl-token/src/burn.ts
var import_spl_token3 = require("@solana/spl-token");
var SplToken3;
((SplToken11) => {
  SplToken11.burn = (mint, owner, signers, burnAmount, tokenDecimals, options = {}) => {
    return Try(() => {
      const tokenAccount = (0, import_spl_token3.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = options.feePayer ? options.feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const inst = (0, import_spl_token3.createBurnCheckedInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs
      );
      return new Transaction([inst], keypairs, payer.toKeypair());
    });
  };
})(SplToken3 || (SplToken3 = {}));

// ../suite-spl-token/src/find.ts
var import_mpl_token_metadata2 = require("@metaplex-foundation/mpl-token-metadata");
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
    if (tokenStandard === import_mpl_token_metadata2.TokenStandard.Fungible) {
      return Converter14.TokenMetadata.intoUser(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else if (tokenStandard === import_mpl_token_metadata2.TokenStandard.NonFungible) {
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
      info.value.length === 0 && callback(Result.ok([]));
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
          const metadata = await import_mpl_token_metadata2.Metadata.fromAccountAddress(
            connection,
            Account.Pda.getMetadata(mint)
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
              callback(Result.ok(data));
            }).catch((e) => {
              callback(Result.err(e));
            }).finally(() => {
              const descAlgo = sortByUinixTimestamp("desc" /* Desc */);
              const ascAlgo = sortByUinixTimestamp("asc" /* Asc */);
              if (sortable === "desc" /* Desc */) {
                data = data.sort(descAlgo);
              } else if (sortable === "asc" /* Asc */) {
                data = data.sort(ascAlgo);
              }
              callback(Result.ok(data));
            });
          }).catch((e) => {
            callback(Result.err(e));
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
        callback(Result.err(e));
      }
    }
  };
  SplToken11.genericFindByMint = async (mint, tokenStandard) => {
    try {
      const connection = Node.getConnection();
      const metadata = await import_mpl_token_metadata2.Metadata.fromAccountAddress(
        connection,
        Account.Pda.getMetadata(mint)
      );
      debugLog("# findByMint metadata: ", metadata);
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error("token standards are different");
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data).parsed.info.supply;
      const response = await (await (0, import_cross_fetch.default)(metadata.data.uri)).json();
      return Result.ok(
        converter(tokenStandard, metadata, response, tokenAmount)
      );
    } catch (e) {
      return Result.err(e);
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
      import_mpl_token_metadata2.TokenStandard.Fungible,
      sortable,
      isHolder
    );
  };
  SplToken11.findByMint = async (mint) => {
    return await (0, SplToken11.genericFindByMint)(mint, import_mpl_token_metadata2.TokenStandard.Fungible);
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
        new Account.Keypair({ secret: freezeAuthority }).toPublicKey()
      );
      return new Transaction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// ../suite-spl-token/src/gas-less-transfer.ts
var import_spl_token6 = require("@solana/spl-token");
var import_web310 = require("@solana/web3.js");
var SplToken6;
((SplToken11) => {
  SplToken11.gasLessTransfer = async (mint, owner, dest, signers, amount, mintDecimal, feePayer) => {
    return Try(async () => {
      const keypairs = signers.map((s) => s.toKeypair());
      const sourceToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        owner,
        feePayer
      );
      const destToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        dest,
        feePayer
      );
      let inst2;
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web310.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      if (!destToken.inst) {
        inst2 = (0, import_spl_token6.createTransferCheckedInstruction)(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          keypairs
        );
        tx.add(inst2);
      } else {
        inst2 = (0, import_spl_token6.createTransferCheckedInstruction)(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          keypairs
        );
        tx.add(destToken.inst).add(inst2);
      }
      tx.recentBlockhash = blockhashObj.blockhash;
      keypairs.forEach((signer) => {
        tx.partialSign(signer);
      });
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new PartialSignTransaction(hex);
    });
  };
})(SplToken6 || (SplToken6 = {}));

// ../suite-spl-token/src/mint.ts
var import_web311 = require("@solana/web3.js");
var import_spl_token7 = require("@solana/spl-token");
var import_mpl_token_metadata3 = require("@metaplex-foundation/mpl-token-metadata");

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

// ../suite-spl-token/src/mint.ts
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
    const metadataPda = Account.Pda.getMetadata(mint2.toString());
    const tokenAssociated = (0, import_spl_token7.getAssociatedTokenAddressSync)(mint2, owner);
    const instructions = [];
    instructions.push(
      import_web311.SystemProgram.createAccount({
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
      (0, import_mpl_token_metadata3.createCreateMetadataAccountV3Instruction)(
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
  SplToken11.mint = async (owner, signer, totalAmount, mintDecimal, input, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, freezeAuthority } = options;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const payer = feePayer ? feePayer : signer;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
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
      const mint2 = Account.Keypair.create();
      const insts = await (0, SplToken11.createMint)(
        mint2.toPublicKey(),
        owner.toPublicKey(),
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
            owner.toPublicKey(),
            freezeAuthority.toPublicKey()
          )
        );
      }
      return new MintTransaction(
        insts,
        [signer.toKeypair(), mint2.toKeypair()],
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
        new Account.Keypair({ secret: freezeAuthority }).toPublicKey()
      );
      return new Transaction(
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
  SplToken11.transfer = async (mint, owner, dest, signers, amount, mintDecimal, options = {}) => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const sourceToken = await Account.Associated.retryGetOrCreate(
        mint,
        owner,
        payer
      );
      const destToken = await Account.Associated.retryGetOrCreate(
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
      return new Transaction([inst], keypairs, payer.toKeypair());
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

// src/burn.ts
var RegularNft;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  RegularNft11.burn = (mint, owner, signer, options = {}) => {
    const feePayer = options.feePayer ? options.feePayer : signer;
    return SplToken10.burn(mint, owner, [signer], NFT_AMOUNT, NFT_DECIMALS, {
      feePayer
    });
  };
})(RegularNft || (RegularNft = {}));

// src/find.ts
var import_mpl_token_metadata4 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft2;
((RegularNft11) => {
  RegularNft11.findByOwner = async (owner, onOk, onErr, options) => {
    const sortable = !options?.sortable ? "desc" /* Desc */ : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    await SplToken10.genericFindByOwner(
      owner,
      (result) => result.match(onOk, onErr),
      import_mpl_token_metadata4.TokenStandard.NonFungible,
      sortable,
      isHolder
    );
  };
  RegularNft11.findByMint = async (mint) => {
    return await SplToken10.genericFindByMint(mint, import_mpl_token_metadata4.TokenStandard.NonFungible);
  };
})(RegularNft2 || (RegularNft2 = {}));

// src/freeze.ts
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
      const editionAddress = Account.Pda.getMasterEdition(mint);
      const inst = (0, import_mpl_token_metadata5.createFreezeDelegatedAccountInstruction)({
        delegate: new Account.Keypair({
          secret: freezeAuthority
        }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new Transaction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(RegularNft3 || (RegularNft3 = {}));

// src/mint.ts
var import_web312 = require("@solana/web3.js");
var import_spl_token11 = require("@solana/spl-token");
var import_mpl_token_metadata6 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft4;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  RegularNft11.createVerifyCreator = (mint2, creator) => {
    const metadata = Account.Pda.getMetadata(mint2.toString());
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
    const collectionMetadata = Account.Pda.getMetadata(
      collectionParent.toString()
    );
    const collectionMasterEditionAccount = Account.Pda.getMasterEdition(
      collectionParent.toString()
    );
    return (0, import_mpl_token_metadata6.createVerifySizedCollectionItemInstruction)({
      collection: collectionMetadata,
      collectionMasterEditionAccount,
      collectionMint: collectionParent,
      metadata: Account.Pda.getMetadata(collectionChild.toString()),
      payer: feePayer,
      collectionAuthority: feePayer
    });
  };
  RegularNft11.createMint = async (mint2, owner, nftMetadata, feePayer, isMutable) => {
    const ata = (0, import_spl_token11.getAssociatedTokenAddressSync)(mint2, owner);
    const tokenMetadataPubkey = Account.Pda.getMetadata(mint2.toString());
    const masterEditionPubkey = Account.Pda.getMasterEdition(mint2.toString());
    const connection = Node.getConnection();
    const instructions = [];
    instructions.push(
      import_web312.SystemProgram.createAccount({
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
  RegularNft11.mint = async (owner, signer, input, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, freezeAuthority } = options;
      const payer = feePayer ? feePayer : signer;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
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
      const sellerFeeBasisPoints = Converter14.Royalty.intoInfra(input.royalty);
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
      const mint2 = Account.Keypair.create();
      const instructions = await (0, RegularNft11.createMint)(
        mint2.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );
      if (freezeAuthority) {
        instructions.push(
          (0, RegularNft11.createDeleagate)(
            mint2.toPublicKey(),
            owner.toPublicKey(),
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
      const keypairs = [signer.toKeypair(), mint2.toKeypair()];
      if (input.creators) {
        input.creators.forEach((creator) => {
          if (Account.Keypair.isSecret(creator.secret)) {
            const creatorPubkey = creator.address.toPublicKey();
            const inst = (0, RegularNft11.createVerifyCreator)(mint2.toPublicKey(), creatorPubkey);
            instructions.push(inst);
            keypairs.push(creator.secret.toKeypair());
          }
        });
      }
      return new MintTransaction(
        instructions,
        keypairs,
        payer.toKeypair(),
        mint2.pubkey
      );
    });
  };
})(RegularNft4 || (RegularNft4 = {}));

// src/gas-less-mint.ts
var import_web313 = require("@solana/web3.js");
var RegularNft5;
((RegularNft11) => {
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  RegularNft11.gasLessMint = async (owner, signer, input, feePayer, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const sellerFeeBasisPoints = Converter14.Royalty.intoInfra(input.royalty);
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
      const mint = Account.Keypair.create();
      const insts = await RegularNft4.createMint(
        mint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        feePayer.toPublicKey(),
        isMutable
      );
      if (options.freezeAuthority) {
        insts.push(
          RegularNft4.createDeleagate(
            mint.toPublicKey(),
            owner.toPublicKey(),
            options.freezeAuthority.toPublicKey()
          )
        );
      }
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web313.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      insts.forEach((inst) => tx.add(inst));
      tx.recentBlockhash = blockhashObj.blockhash;
      [signer, mint].forEach((signer2) => tx.partialSign(signer2.toKeypair()));
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new PartialSignTransaction(hex, mint.pubkey);
    });
  };
})(RegularNft5 || (RegularNft5 = {}));

// src/gas-less-transfer.ts
var RegularNft6;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  RegularNft11.gasLessTransfer = async (mint, owner, dest, signers, feePayer) => {
    return SplToken10.gasLessTransfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };
})(RegularNft6 || (RegularNft6 = {}));

// src/mint-collection.ts
var import_mpl_token_metadata7 = require("@metaplex-foundation/mpl-token-metadata");
var RegularNft7;
((RegularNft11) => {
  RegularNft11.DEFAULT_COLLECTION_SIZE = 0;
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  RegularNft11.mintCollection = (owner, signer, input, options = {}) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { freezeAuthority, feePayer, collectionSize } = options;
      const payer = feePayer ? feePayer : signer;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
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
      const collectionMint = Account.Keypair.create();
      const collectionMetadataAccount = Account.Pda.getMetadata(
        collectionMint.pubkey
      );
      const instructions = await RegularNft4.createMint(
        collectionMint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );
      if (freezeAuthority) {
        instructions.push(
          RegularNft4.createDeleagate(
            collectionMint.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey()
          )
        );
      }
      const collections = {
        collectionMetadata: collectionMetadataAccount,
        collectionAuthority: payer.toKeypair().publicKey,
        collectionMint: collectionMint.toKeypair().publicKey
      };
      instructions.push(
        (0, import_mpl_token_metadata7.createSetCollectionSizeInstruction)(collections, {
          setCollectionSizeArgs: {
            size: collectionSize || RegularNft11.DEFAULT_COLLECTION_SIZE
          }
        })
      );
      return new MintTransaction(
        instructions,
        [signer.toKeypair(), collectionMint.toKeypair()],
        payer.toKeypair(),
        collectionMint.pubkey
      );
    });
  };
})(RegularNft7 || (RegularNft7 = {}));

// src/thaw.ts
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
      const editionAddress = Account.Pda.getMasterEdition(mint);
      const inst = (0, import_mpl_token_metadata8.createThawDelegatedAccountInstruction)({
        delegate: new Account.Keypair({
          secret: freezeAuthority
        }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new Transaction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(RegularNft8 || (RegularNft8 = {}));

// src/transfer.ts
var RegularNft9;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  RegularNft11.transfer = (mint, owner, dest, signers, options = {}) => {
    return SplToken10.transfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      options
    );
  };
})(RegularNft9 || (RegularNft9 = {}));

// src/index.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Account,
  FilterOptions,
  FilterType,
  ModuleName,
  Node,
  RegularNft,
  Validator,
  ValidatorError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvYWRkLnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvY29uc3RhbnRzLnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvcmVzdWx0LnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvc2hhcmVkLnRzIiwgIi4uLy4uL25vZGUvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uL3NyYy9iYXRjaC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi9zcmMvZGVmaW5lLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uL3NyYy9jb21tb24udHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24vc3JjL21pbnQudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24vc3JjL3BhcnRpYWwtc2lnbi50cyIsICIuLi8uLi9nbG9iYWwvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2Fzc29jaWF0ZWQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMva2V5cGFpci50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9wZGEudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvaW5kZXgudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jb2xsZWN0aW9uLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY3JlYXRvcnMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yb3lhbHR5LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9tZW1vLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbWludC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24tZGV0YWlscy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3VzZXMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90b2tlbi1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3JlZ3VsYXItbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcHJvcGVydGllcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3RyYW5zZmVyLWNoZWNrZWQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3ZhbGlkYXRvci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHlwZXMvc3JjL3RyYW5zYWN0aW9uLWZpbHRlci9pbmRleC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2NhbGN1bGF0ZS1hbW91bnQudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9idXJuLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZmluZC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2ZyZWV6ZS50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvbWludC50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9wcm92ZW5hbmNlLWxheWVyLnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL2Fyd2VhdmUudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvc3RvcmFnZS50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL3RoYXcudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9idXJuLnRzIiwgIi4uL3NyYy9maW5kLnRzIiwgIi4uL3NyYy9mcmVlemUudHMiLCAiLi4vc3JjL21pbnQudHMiLCAiLi4vc3JjL2dhcy1sZXNzLW1pbnQudHMiLCAiLi4vc3JjL2dhcy1sZXNzLXRyYW5zZmVyLnRzIiwgIi4uL3NyYy9taW50LWNvbGxlY3Rpb24udHMiLCAiLi4vc3JjL3RoYXcudHMiLCAiLi4vc3JjL3RyYW5zZmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgRnJlZXplIH0gZnJvbSAnLi9mcmVlemUnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBHYXNMZXNzTWludCB9IGZyb20gJy4vZ2FzLWxlc3MtbWludCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEdhc0xlc3NUcmFuc2ZlciB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludENvbGxlY3Rpb24gfSBmcm9tICcuL21pbnQtY29sbGVjdGlvbic7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0ICd+L3R5cGVzL3RyYW5zYWN0aW9uJztcbmltcG9ydCAnfi90cmFuc2FjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBSZWd1bGFyTmZ0ID0ge1xuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkdhc0xlc3NNaW50LFxuICAuLi5HYXNMZXNzVHJhbnNmZXIsXG4gIC4uLk1pbnQsXG4gIC4uLk1pbnRDb2xsZWN0aW9uLFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG5cbmV4cG9ydCAqIGZyb20gJ34vc2hhcmVkL2V4cG9ydHMnO1xuIiwgImltcG9ydCB7IGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEF1dGhvcml0eU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKFxuICAgIHRva2VuOiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxBdXRob3JpdHlPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogc2lnbmVyc1swXTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCB0b2tlbkFzc29jaWF0ZWQgPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQXNzb2NpYXRlZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCksIHRva2VuKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb21taXRtZW50LCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IFNvbGFuYUpzb25Db25maWcgZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCc7XG5cbmxldCBDb25maWcgPSBTb2xhbmFKc29uQ29uZmlnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgV2Fybm5pbmdNZXNzYWdlIHtcbiAgICBjb25zdCBUSFJFU0hIT0xEID0gNTtcbiAgICBsZXQgaXNEaXNwbGF5ID0gZmFsc2U7XG4gICAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPSBgXG4gICAgICAgIFtXYXJuaW5nXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZUFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBDYW4gZ2V0IGFwaSBrZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgO1xuICAgIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IGBcbiAgICAgICAgW1dhcm5pbmddXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBkYXNBcGlVcmwgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGkgdXJsIGZyb20gaHR0cHM6Ly93d3cuaGVsaXVzLmRldi9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG4gICAgICAgIGA7XG5cbiAgICBleHBvcnQgY29uc3QgY2FsY3VsYXRlUHJvYmFiaWxpdHkgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCBwcm9iYWJpbGl0eSA9IDEgLyBUSFJFU0hIT0xEO1xuICAgICAgaWYgKCFpc0Rpc3BsYXkgJiYgcmFuZG9tVmFsdWUgPCBwcm9iYWJpbGl0eSkge1xuICAgICAgICBpc0Rpc3BsYXkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IGNvbnN0IGN1cnJlbnRDbHVzdGVyID0gQ29uZmlnLmNsdXN0ZXIudHlwZTtcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbUNsdXN0ZXJVcmwgPSBDb25maWcuY2x1c3Rlci5jdXN0b21DbHVzdGVyVXJsO1xuICBleHBvcnQgY29uc3QgaXNEZWJ1Z2dpbmcgPSBDb25maWcuZGVidWdnaW5nO1xuICBleHBvcnQgY29uc3QgbmZ0U3RvcmFnZUFwaUtleSA9IENvbmZpZy5uZnRTdG9yYWdlQXBpS2V5O1xuICBleHBvcnQgY29uc3QgZGFzQXBpVXJsID0gQ29uZmlnLmRhc0FwaVVybDtcblxuICBleHBvcnQgZW51bSBDbHVzdGVyIHtcbiAgICBwcmQgPSAnbWFpbm5ldC1iZXRhJyxcbiAgICBwcmRNZXRhcGxleCA9ICdtYWlubmV0LWJldGEtbWV0YXBsZXgnLFxuICAgIGRldiA9ICdkZXZuZXQnLFxuICAgIHRlc3QgPSAndGVzdG5ldCcsXG4gICAgbG9jYWxob3N0ID0gJ2xvY2FsaG9zdC1kZXZuZXQnLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRW5kUG9pbnRVcmwge1xuICAgIHByZCA9ICdodHRwczovL2FwaS5tYWlubmV0LWJldGEuc29sYW5hLmNvbScsXG4gICAgcHJkTWV0YXBsZXggPSAnaHR0cHM6Ly9hcGkubWV0YXBsZXguc29sYW5hLmNvbScsXG4gICAgZGV2ID0gJ2h0dHBzOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgICB0ZXN0ID0gJ2h0dHBzOi8vYXBpLnRlc3RuZXQuc29sYW5hLmNvbScsXG4gICAgbG9jYWxob3N0ID0gJ2h0dHA6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gQnVuZGxyVXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9ub2RlMS5pcnlzLnh5eixodHRwczovL25vZGUyLmlyeXMueHl6JyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaXJ5cy54eXonLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRGFzQXBpVXJsIHtcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaGVsaXVzLXJwYy5jb20vP2FwaS1rZXk9MTUzMTliZjQtNWI0MC00OTU4LWFjOGQtNjMxM2FhNTVlYjkyLGh0dHBzOi8vcnBjLWRldm5ldC5oZWxpdXMueHl6P2FwaS1rZXk9OWY3MGE4NDMtMzI3NC00ZmZkLWEwYTktMzIzZjhiN2MwNjM5JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIE5mdHN0b3JhZ2VBcGlLZXkge1xuICAgIGRldiA9ICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUprYVdRNlpYUm9jam93ZUVSR01qY3lOMlZrT0RaaFJHVTFSVE15WkRaRFpFSmxPRGMwWXpSRk5EbEVPRFkxT1dabU9FTWlMQ0pwYzNNaU9pSnVablF0YzNSdmNtRm5aU0lzSW1saGRDSTZNVFl5TURJMk5EazBNemN3Tml3aWJtRnRaU0k2SW1SbGJXOGlmUS5kNEo3MG1pa3hSQjhhNXZ3TnU2U081SERBOEphdWV1c2VBajdRX3l0TUNFJyxcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBsb2FkQ29uZmlnID0gYXN5bmMgKCkgPT4ge1xuICAgIENvbmZpZyA9IGF3YWl0IGltcG9ydCgnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCcpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hDbHVzdGVyID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHsgY2x1c3RlcjogZW52LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcblxuICAgIC8vIGlmIHNldHRlZCBjdXN0b20gdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwgJiYgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21DbHVzdGVyVXJsW2luZGV4XTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkO1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmRNZXRhcGxleDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5sb2NhbGhvc3Q7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hCdW5kbHIgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5CdW5kbHJVcmwuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoRGFzQXBpID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIGlmIChkYXNBcGlVcmwubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHRocm93IEVycm9yKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuREFTX0FQSV9VUkwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuQnVuZGxyVXJsLnByZC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkRhc0FwaVVybC5kZXYuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaE5mdFN0b3JhZ2UgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgaWYgKCFuZnRTdG9yYWdlQXBpS2V5KSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoV2Fybm5pbmdNZXNzYWdlLk5GVF9TVE9SQUdFX0FQSV9LRVkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZnRTdG9yYWdlQXBpS2V5O1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLk5mdHN0b3JhZ2VBcGlLZXkuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgV1JBUFBFRF9UT0tFTl9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnU28xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMicsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRU1PX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdNZW1vMVVoa0pSZkh5dkxNY1Z1Y0p3eFhldUQ3MjhFcVZERHdRRHhGTU5vJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FVEFQTEVYX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdtZXRhcWJ4eFVlcmRxMjhjajFSYkFXa1lRbTN5YnpqYjZhOGJ0NTE4eDFzJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IENPTU1JVE1FTlQ6IENvbW1pdG1lbnQgPSAnY29uZmlybWVkJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vaXBmcy5pby9pcGZzJztcbiAgZXhwb3J0IGNvbnN0IElSWVNfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9nYXRld2F5LmlyeXMueHl6JztcbiAgZXhwb3J0IGNvbnN0IEJVTkRMUl9ORVRXT1JLX1VSTCA9IHN3aXRjaEJ1bmRscihDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gc3dpdGNoRGFzQXBpKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IHN3aXRjaE5mdFN0b3JhZ2UoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xTQ0FOX1VSTCA9ICdodHRwczovL3NvbHNjYW4uaW8nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MQU5BRk1fVVJMID0gJ2h0dHBzOi8vc29sYW5hLmZtJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1hSQVlfVVJMID0gJ2h0dHBzOi8veHJheS5oZWxpdXMueHl6Jztcbn1cbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0UmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvcj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcblxuICB1bndyYXAoKTogVDtcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBVO1xuICB1bndyYXA8VSwgVj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFYpOiBVIHwgVjtcbiAgLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMTBcbiAgLy8gdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBVKTogVTtcbiAgdW53cmFwKG9rPzogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IHVua25vd24pOiB1bmtub3duIHtcbiAgICBjb25zdCByID0gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayA/IG9rKHZhbHVlKSA6IHZhbHVlKSxcbiAgICAgIChlcnJvcikgPT4gKGVyciA/IFJlc3VsdC5vayhlcnIoZXJyb3IpKSA6IFJlc3VsdC5lcnIoZXJyb3IpKSxcbiAgICApO1xuICAgIGlmIChyLmlzRXJyKSB7XG4gICAgICB0aHJvdyByLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gci52YWx1ZTtcbiAgfVxuXG4gIC8vLy8gbWFwIC8vLy9cbiAgbWFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBSZXN1bHQ8VSwgRT47XG4gIG1hcDxVLCBGIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFUsXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IEYsXG4gICk6IFJlc3VsdDxVLCBGPjtcbiAgbWFwKG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gRXJyb3IpOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyID8gZXJyKGVycm9yKSA6IGVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vLyBjaGFpbiAvLy8vXG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMzdcbiAgLy8gZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBFPlxuICBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc3VibWl0IChhbGlhcyBJbnN0cnVjdGlvbi5zdWJtaXQpIC8vLy9cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBhc3luYyBzdWJtaXQoZmVlUGF5ZXI/OiBhbnkpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9uID0gdGhpcy51bndyYXAoKSBhcyBhbnk7XG4gICAgICBpZiAoXG4gICAgICAgIGluc3RydWN0aW9uLmluc3RydWN0aW9ucyB8fFxuICAgICAgICBpbnN0cnVjdGlvbi5oZXhJbnN0cnVjdGlvbiB8fFxuICAgICAgICBpbnN0cnVjdGlvblswXS5pbnN0cnVjdGlvbnMgfHxcbiAgICAgICAgaW5zdHJ1Y3Rpb25bMF0uaGV4SW5zdHJ1Y3Rpb25cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gYXdhaXQgaW5zdHJ1Y3Rpb24uc3VibWl0KGZlZVBheWVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKCdPbmx5IEluc3RydWN0aW9uIG9iamVjdCcpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGVyciBhcyBFcnJvcik7XG4gICAgfVxuICB9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgc3VibWl0KGZlZVBheWVyPzogU2VjcmV0KTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj47XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxPazxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gdHJ1ZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgdmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgX2VycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xuICB9XG59XG5cbmNsYXNzIEludGVybmFsRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSBmYWxzZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSB0cnVlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSBlcnJvcjogRSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgX29rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBSZXN1bHQge1xuICBleHBvcnQgdHlwZSBPazxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxPazxULCBFPjtcbiAgZXhwb3J0IHR5cGUgRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbEVycjxULCBFPjtcblxuICBleHBvcnQgZnVuY3Rpb24gb2s8VCwgRSBleHRlbmRzIEVycm9yPih2YWx1ZTogVCk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbE9rKHZhbHVlKTtcbiAgfVxuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcj86IEUpOiBSZXN1bHQ8VCwgRT47XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yOiBFKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsRXJyKGVycm9yIHx8IEVycm9yKCkpO1xuICB9XG5cbiAgdHlwZSBVID0gUmVzdWx0PHVua25vd24+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gICAgUjE1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTQsIFIxNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICAgIE9rVHlwZTxSMTU+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgICAgfCBSMTVcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTRdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTNdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExIHwgUjEyIHwgUjEzXG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTFdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTBdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjldLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjk+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSN10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjZdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjY+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0PiwgT2tUeXBlPFI1Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjU+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjRdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSND5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVLCBSMyBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjJdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj5dLCBFcnJUeXBlPFIwIHwgUjEgfCBSMj4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjFdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT5dLCBFcnJUeXBlPFIwIHwgUjE+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+XSwgRXJyVHlwZTxSMD4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogW10pOiBSZXN1bHQ8W10+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFQgZXh0ZW5kcyBVW10gfCBSZWNvcmQ8c3RyaW5nLCBVPj4oXG4gICAgb2JqOiBULFxuICApOiBSZXN1bHQ8XG4gICAgeyBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDxpbmZlciBJPiA/IEkgOiBuZXZlciB9LFxuICAgIHtcbiAgICAgIFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+ID8gRSA6IG5ldmVyO1xuICAgIH1ba2V5b2YgVF1cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IHVua25vd24pOiB1bmtub3duIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICBjb25zdCByZXNBcnIgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBvYmopIHtcbiAgICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbSBhcyB1bmtub3duO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlc3VsdC5vayhyZXNBcnIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBpdGVtID0gKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPilba2V5XTtcbiAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgICAgcmVzW2tleV0gPSBpdGVtLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0Lm9rKHJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgUmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvciA9IEVycm9yPiA9XG4gIHwgUmVzdWx0Lk9rPFQsIEU+XG4gIHwgUmVzdWx0LkVycjxULCBFPjtcblxudHlwZSBPa1R5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PGluZmVyIE8+ID8gTyA6IG5ldmVyO1xudHlwZSBFcnJUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPlxuICA/IEVcbiAgOiBuZXZlcjtcbiIsICJpbXBvcnQgeyBBbnlPYmplY3QgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogY29udmVydCBidWZmZXIgdG8gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gKiBAcmV0dXJucyBudW1iZXJbXVxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9BcnJheSA9IChidWZmZXI6IEJ1ZmZlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgbnVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGJ5dGUgb2YgYnVmZmVyKSB7XG4gICAgbnVtcy5wdXNoKGJ1ZmZlcltieXRlXSk7XG4gIH1cbiAgcmV0dXJuIG51bXM7XG59O1xuXG4vKipcbiAqIE92ZXJ3cml0ZSBKUyBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9iamVjdFxuICogQHBhcmFtIHtPdmVyd3JpdGVPYmplY3RbXX0gdGFyZ2V0c1xuICogQHJldHVybnMgT2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGVPYmplY3QgPSAoXG4gIG9iamVjdDogdW5rbm93bixcbiAgdGFyZ2V0czoge1xuICAgIGV4aXN0c0tleTogc3RyaW5nO1xuICAgIHdpbGw6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiB1bmtub3duIH07XG4gIH1bXSxcbik6IHVua25vd24gPT4ge1xuICBjb25zdCB0aGF0OiBBbnlPYmplY3QgPSBvYmplY3QgYXMgQW55T2JqZWN0O1xuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGRlbGV0ZSB0aGF0W3RhcmdldC5leGlzdHNLZXldO1xuICAgIHRoYXRbdGFyZ2V0LndpbGwua2V5XSA9IHRhcmdldC53aWxsLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXkgbG9nIGZvciBzb2xhbmEtc3VpdGUtY29uZmlnLmpzXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMVxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhM1xuICogQHBhcmFtIHt1bmtub3dufSBkYXRhNFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAoXG4gIGRhdGExOiB1bmtub3duLFxuICBkYXRhMjogdW5rbm93biA9ICcnLFxuICBkYXRhMzogdW5rbm93biA9ICcnLFxuICBkYXRhNDogdW5rbm93biA9ICcnLFxuKTogdm9pZCA9PiB7XG4gIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgY29uc29sZS5sb2coJ1tERUJVR10nLCBkYXRhMSwgZGF0YTIsIGRhdGEzLCBkYXRhNCk7XG4gIH1cbn07XG5cbi8qKlxuICogc2xlZXAgdGltZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjXG4gKiBAcmV0dXJucyBQcm9taXNlPG51bWJlcj5cbiAqL1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gYXN5bmMgKHNlYzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIHNlYyAqIDEwMDApKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbFxuICApO1xufTtcblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgcmV0dXJuIChcbiAgICAhIW9iaiAmJlxuICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgIHR5cGVvZiAob2JqIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufTtcblxuLyoqXG4gKiBUcnkgYXN5bmMgbW9uYWRcbiAqXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxULCBFPj5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBhc3luY2Jsb2NrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZXN1bHQ8VCwgRT4+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KGJsb2NrOiAoKSA9PiBUKTogUmVzdWx0PFQsIEU+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBpbnB1dDogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFJlc3VsdDxULCBFcnJvcj4gfCBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gaW5wdXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHYpKSB7XG4gICAgICByZXR1cm4gdi50aGVuKFxuICAgICAgICAoeDogVCkgPT4gUmVzdWx0Lm9rKHgpLFxuICAgICAgICAoZXJyOiBFKSA9PiBSZXN1bHQuZXJyKGVyciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHYpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlIGFzIHN0cmluZykpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChmaW5hbGx5SW5wdXQpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmFsbHkgaW5wdXQ6JywgZmluYWxseUlucHV0KTtcbiAgICAgIGZpbmFsbHlJbnB1dCgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcnx1bmRlZmluZWR9IGNyZWF0ZWRfYXRcbiAqIEByZXR1cm5zIERhdGUgfCB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lID0gKFxuICBjcmVhdGVkX2F0OiBudW1iZXIgfCB1bmRlZmluZWQsXG4pOiBEYXRlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGNyZWF0ZWRfYXQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoY3JlYXRlZF9hdCAqIDEwMDApO1xuICB9XG4gIHJldHVybjtcbn07XG5cbi8qKlxuICogR2V0IHVuaXggdGltZXN0YW1wXG4gKlxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCB1bml4VGltZXN0YW1wID0gKCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG59O1xuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IENvbW1pdG1lbnQsIENvbm5lY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5vZGUge1xuICBjb25zdCBzZXR0ZWQgPSB7XG4gICAgY2x1c3RlclVybDogJycsXG4gICAgY29tbWl0bWVudDogQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICAgY3VzdG9tQ2x1c3RlclVybDogW10gYXMgc3RyaW5nW10sXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldENvbm5lY3Rpb24gPSAoKTogQ29ubmVjdGlvbiA9PiB7XG4gICAgaWYgKHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyIGJ5IGpzb24gY29uZmlnXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFzZXR0ZWQuY2x1c3RlclVybCkge1xuICAgICAgLy8gZGVmYXVsdCBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFzZXR0ZWQuY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IENvbW1pdG1lbnQ7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbiBhcyBUeCxcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2RlZmluZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJy4vY29tbW9uJztcblxuLy8gVE9ETzogcmVuYW1lIFRyYXNhY3Rpb24uQmF0Y2hcbmV4cG9ydCBjbGFzcyBCYXRjaFRyYW5zYWN0aW9uIHtcbiAgc3VibWl0ID0gYXN5bmMgKGFycjogVHJhbnNhY3Rpb25bXSk6IFByb21pc2U8VHJhbnNhY3Rpb25TaWduYXR1cmU+ID0+IHtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBhIG9mIGFycikge1xuICAgICAgaWYgKCFhLmluc3RydWN0aW9ucyAmJiAhYS5zaWduZXJzKSB7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIGBvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgYmF0Y2hTdWJtaXQoKS5cbiAgICAgICAgICAgIEluZGV4OiAke2l9LCBTZXQgdmFsdWU6ICR7SlNPTi5zdHJpbmdpZnkoYSl9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhcnIuZmxhdE1hcCgoYSkgPT4gYS5pbnN0cnVjdGlvbnMpO1xuICAgIGNvbnN0IHNpZ25lcnMgPSBhcnIuZmxhdE1hcCgoYSkgPT4gYS5zaWduZXJzKTtcbiAgICBjb25zdCBmZWVQYXllcnMgPSBhcnIuZmlsdGVyKChhKSA9PiBhLmZlZVBheWVyICE9PSB1bmRlZmluZWQpO1xuICAgIGxldCBmZWVQYXllciA9IHNpZ25lcnNbMF07XG4gICAgaWYgKGZlZVBheWVycy5sZW5ndGggPiAwICYmIGZlZVBheWVyc1swXS5mZWVQYXllcikge1xuICAgICAgZmVlUGF5ZXIgPSBmZWVQYXllcnNbMF0uZmVlUGF5ZXI7XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHgoKTtcbiAgICBsZXQgZmluYWxTaWduZXJzID0gc2lnbmVycztcbiAgICBpZiAoZmVlUGF5ZXIpIHtcbiAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgZmluYWxTaWduZXJzID0gW2ZlZVBheWVyLCAuLi5zaWduZXJzXTtcbiAgICB9XG4gICAgaW5zdHJ1Y3Rpb25zLm1hcCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgfTtcblxuICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICB0cmFuc2FjdGlvbixcbiAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgIG9wdGlvbnMsXG4gICAgKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBzZW5UcmFuc2FjdGlvbigpIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25cbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbi8qIEB0cy1pZ25vcmUgKi9cbkFycmF5LnByb3RvdHlwZS5zdWJtaXQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25bXSA9IFtdO1xuICAvLyBkb250IHVzZSBmb3JFYWNoXG4gIC8vIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBzdG9wIHRoZSBwcm9jZXNzIGJ5IFJFVFVSTiBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwcm9jZXNzLlxuICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICBjb25zdCBlcnJvck1lc3M6IHN0cmluZyA9IG9iai5lcnJvci5tZXNzYWdlIGFzIHN0cmluZztcbiAgICAgICAgdGhyb3cgRXJyb3IoYFtBcnJheSBpbmRleCBvZiBjYXVnaHQgJ1Jlc3VsdC5lcnInOiAke2l9XSR7ZXJyb3JNZXNzfWApO1xuICAgICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUgYXMgVHJhbnNhY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqIGFzIFRyYW5zYWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCYXRjaFRyYW5zYWN0aW9uKCkuc3VibWl0KGluc3RydWN0aW9ucyk7XG4gIH0pO1xufTtcbiIsICIvL0BpbnRlcm5hbHNcbi8vIFRPRE86IG1vdmUgdG8gY29tbW9uLnRzXG5leHBvcnQgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbiBhcyBUeCxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5cbi8vIFRPRE86IGNyZWF0ZSBjbGFzcyB0eXBlLCByZW5hbWUgY2xhc3MgbmFtZTogIFRyYW5zYWN0aW9uLkNvbW1vblxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uIHtcbiAgc3RhdGljIE1BWF9SRVRSSUVTID0gMztcblxuICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgc2lnbmVyczogS2V5cGFpcltdO1xuICBmZWVQYXllcj86IEtleXBhaXI7XG4gIGRhdGE/OiB1bmtub3duO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgZGF0YT86IHVua25vd24sXG4gICkge1xuICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzdWJtaXQgPSBhc3luYyAoKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFRyYW5zYWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFR4KCk7XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICBtYXhSZXRyaWVzOiBUcmFuc2FjdGlvbi5NQVhfUkVUUklFUyxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uIGFzIFR4LFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9kZWZpbmUnO1xuXG4vLyBUT0RPOiByZW5hbWUgVHJhc2FjdGlvbkdlbmVyYXRvci5NaW50XG5leHBvcnQgY2xhc3MgTWludFRyYW5zYWN0aW9uPFQ+IHtcbiAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgZmVlUGF5ZXI/OiBLZXlwYWlyO1xuICBkYXRhPzogVDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgIGRhdGE/OiBULFxuICApIHtcbiAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW50VHJhbnNhY3Rpb24pKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IE1pbnRJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFR4KCk7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICB9O1xuXG4gICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgZGVidWdMb2coJyMgQ2hhbmdlIG1ldGFwbGV4IGNsdXN0ZXIgb24gbWFpbm5ldC1iZXRhJyk7XG4gICAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXI6IENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4IH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBUcmFuc2FjdGlvbiBhcyBUeCxcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vZGVmaW5lJztcblxuLy8gVE9ETzogXG4vLyBUT0RPOiByZW5hbWUgVHJhc2FjdGlvbi5QYXJ0aWFsU2lnblxuZXhwb3J0IGNsYXNzIFBhcnRpYWxTaWduVHJhbnNhY3Rpb24ge1xuICBoZXhJbnN0cnVjdGlvbjogc3RyaW5nO1xuICBkYXRhPzogUHVia2V5O1xuICBjYW5TdWJtaXQ/OiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGluc3RydWN0aW9uczogc3RyaW5nLCBtaW50PzogUHVia2V5LCBjYW5TdWJtaXQgPSBmYWxzZSkge1xuICAgIHRoaXMuaGV4SW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbnM7XG4gICAgdGhpcy5kYXRhID0gbWludDtcbiAgICB0aGlzLmNhblN1Ym1pdCA9IGNhblN1Ym1pdDtcbiAgfVxuXG4gIHN1Ym1pdCA9IGFzeW5jIChcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGFydGlhbFNpZ25UcmFuc2FjdGlvbikpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlID0gQnVmZmVyLmZyb20odGhpcy5oZXhJbnN0cnVjdGlvbiwgJ2hleCcpO1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb25Gcm9tSnNvbiA9IFR4LmZyb20oZGVjb2RlKTtcbiAgICAgIHRyYW5zYWN0aW9uRnJvbUpzb24ucGFydGlhbFNpZ24oZmVlUGF5ZXIudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICB9O1xuICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb25Gcm9tSnNvbi5zZXJpYWxpemUoKTtcbiAgICAgIHJldHVybiBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5zZW5kUmF3VHJhbnNhY3Rpb24oXG4gICAgICAgIHdpcmVUcmFuc2FjdGlvbixcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogc2VuVHJhbnNhY3Rpb24oKSBUcmFuc2FjdGlvbkluc3RydWN0aW9uXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBAdHMtaWdub3JlICovXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKGZlZVBheWVyOiBTZWNyZXQpIHtcbiAgZm9yIGF3YWl0IChjb25zdCBvYmogb2YgdGhpcykge1xuICAgIGNvbnN0IHBhcnRpYWxTaWduVHg6IFBhcnRpYWxTaWduVHJhbnNhY3Rpb24gPSBvYmo7XG5cbiAgICBpZiAocGFydGlhbFNpZ25UeC5jYW5TdWJtaXQpIHtcbiAgICAgIChhd2FpdCBwYXJ0aWFsU2lnblR4LnN1Ym1pdChmZWVQYXllcikpLm1hdGNoKFxuICAgICAgICAob2spID0+IE5vZGUuY29uZmlybWVkU2lnKG9rLCAnZmluYWxpemVkJyksXG4gICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXdhaXQgcGFydGlhbFNpZ25UeC5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgIH1cbiAgfVxufTtcbiIsICJpbXBvcnQgeyBLZXlwYWlyLCBMQU1QT1JUU19QRVJfU09MLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIsIEV4cGxvcmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuLyoqXG4gKiBDcmVhdGUgZXhwbG9yZXIgdXJsIGZvciBhY2NvdW50IGFkZHJlc3Mgb3Igc2lnbmF0dXJlXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9FeHBsb3JlclVybCA9IGZ1bmN0aW9uIChcbiAgZXhwbG9yZXI6IEV4cGxvcmVyID0gRXhwbG9yZXIuU29sc2NhbixcbiAgb3B0aW9uczogUGFydGlhbDxFeHBsb3Jlck9wdGlvbnM+ID0ge30sXG4pIHtcbiAgY29uc3QgZW5kUG9pbnRVcmwgPSBOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludDtcbiAgZGVidWdMb2coJyMgdG9FeHBsb3JlclVybCBycGNFbmRwb2ludDonLCBlbmRQb2ludFVybCk7XG4gIGxldCBjbHVzdGVyID0gJyc7XG4gIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLnRlc3Q7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5kZXYpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9IGVsc2Uge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH1cblxuICBjb25zdCBhZGRyZXNzT3JTaWduYXR1cmU6IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgbGV0IHVybCA9ICcnO1xuXG4gIGlmIChvcHRpb25zLnJlcGxhY2VQYXRoKSB7XG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGlmIChBY2NvdW50LktleXBhaXIuaXNQdWJrZXkoYWRkcmVzc09yU2lnbmF0dXJlKSkge1xuICAgIC8vIGFkZHJlc3NcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS9hZGRyZXNzLyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBzaWduYXR1cmVcbiAgICAvLyBmb3IgSW52YWxpZCB0eXBlIFwibmV2ZXJcIiBvZiBhZGRyZXNzT3JTaWduYXR1cmUsIHNvIGBhcyBzdHJpbmdgXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogUHViS2V5KEBzb2xhbmEtc3VpdGUpIHRvIFB1YmxpY0tleShAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHVibGljS2V5XG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9QdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5QdWJLZXk6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMudG9TdHJpbmcoKSk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1NlY3JldCh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuU2VjcmV0OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMudG9TdHJpbmcoKSk7XG4gIHJldHVybiBLZXlwYWlyLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG59O1xuXG4vKipcbiAqIExBTVBPUlRTIHRvIFNPTFxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvU29sID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC5kaXYoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG5cbi8qKlxuICogU09MIHRvIExBTVBPUlRTXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9MYW1wb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAudGltZXMoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgc2xlZXAgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBY2NvdW50LFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcixcbiAgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcblxuLyoqXG4gKiBHZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAqXG4gKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsb3dPd25lck9mZkN1cnZlXG4gKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPlxuICovXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIEFzc29jaWF0ZWQge1xuICAgIGNvbnN0IFJFVFJZX09WRVJfTElNSVQgPSAxMDtcbiAgICBjb25zdCBSRVRSWV9TTEVFUF9USU1FID0gMztcbiAgICAvL0BpbnRlcm5hbFxuICAgIGNvbnN0IGdldCA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgICAgYWxsb3dPd25lck9mZkN1cnZlID0gZmFsc2UsXG4gICAgKTogUHJvbWlzZTxzdHJpbmcgfCBUcmFuc2FjdGlvbj4gPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBuZXcgS2V5cGFpci5LZXlwYWlyKHsgc2VjcmV0OiBmZWVQYXllciB9KS5wdWJrZXksXG4gICAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgICk7XG5cbiAgICAgIGlmICghcmVzLmluc3QpIHtcbiAgICAgICAgcmV0dXJuIHJlcy50b2tlbkFjY291bnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24oXG4gICAgICAgIFtyZXMuaW5zdF0sXG4gICAgICAgIFtdLFxuICAgICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgcmVzLnRva2VuQWNjb3VudCxcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHJ5IGZ1bmN0aW9uIGlmIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAgICovXG4gICAgZXhwb3J0IGNvbnN0IHJldHJ5R2V0T3JDcmVhdGUgPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgICAgd2hpbGUgKGNvdW50ZXIgPCBSRVRSWV9PVkVSX0xJTUlUKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaW5zdCA9IGF3YWl0IGdldChtaW50LCBvd25lciwgZmVlUGF5ZXIsIHRydWUpO1xuXG4gICAgICAgICAgaWYgKGluc3QgJiYgdHlwZW9mIGluc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBpbnN0KTtcbiAgICAgICAgICAgIHJldHVybiBpbnN0O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5zdCBpbnN0YW5jZW9mIFRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAoYXdhaXQgaW5zdC5zdWJtaXQoKSkubWFwKFxuICAgICAgICAgICAgICBhc3luYyAob2spID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhvayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3QuZGF0YSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1Z0xvZygnIyBFcnJvciBzdWJtaXQgcmV0cnlHZXRPckNyZWF0ZTogJywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnTG9nKGAjIHJldHJ5OiAke2NvdW50ZXJ9IGNyZWF0ZSB0b2tlbiBhY2NvdW50OiBgLCBlKTtcbiAgICAgICAgICBkZWJ1Z0xvZyhgIyBtaW50OiAke21pbnR9LCBvd25lcjogJHtvd25lcn0sIGZlZVBheWVyOiAke2ZlZVBheWVyfWApO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHNsZWVwKFJFVFJZX1NMRUVQX1RJTUUpO1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICB9XG4gICAgICB0aHJvdyBFcnJvcihgcmV0cnkgYWN0aW9uIGlzIG92ZXIgbGltaXQgJHtSRVRSWV9PVkVSX0xJTUlUfWApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgICAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICAgICk6IFByb21pc2U8e1xuICAgICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIH0+ID0+IHtcbiAgICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgICBwYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyIGFzIE9yaWdpbmFsLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgY2xhc3MgS2V5cGFpciB7XG4gICAgc2VjcmV0OiBTZWNyZXQ7XG4gICAgcHVia2V5OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgICBpZiAoIXBhcmFtcy5wdWJrZXkpIHtcbiAgICAgICAgY29uc3Qga2V5cGFpciA9IHBhcmFtcy5zZWNyZXQudG9LZXlwYWlyKCk7XG4gICAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVia2V5ID0gcGFyYW1zLnB1YmtleTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VjcmV0ID0gcGFyYW1zLnNlY3JldDtcbiAgICB9XG5cbiAgICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy5wdWJrZXkpO1xuICAgIH1cblxuICAgIHRvS2V5cGFpcigpOiBPcmlnaW5hbCB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICAgIHJldHVybiBPcmlnaW5hbC5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1B1YmtleSA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgUHVia2V5ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGlzU2VjcmV0ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBTZWNyZXQgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17ODcsODh9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXIgPT4ge1xuICAgICAgY29uc3Qga2V5cGFpciA9IE9yaWdpbmFsLmdlbmVyYXRlKCk7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyB0b0tleVBhaXIgPSAoa2V5cGFpcjogT3JpZ2luYWwpOiBLZXlwYWlyID0+IHtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC1idWJibGVndW0nO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICAgIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0TWFzdGVyRWRpdGlvbiA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnZWRpdGlvbicpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRUcmVlQXV0aG9yaXR5ID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Qmd1bVNpZ25lciA9ICgpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW0J1ZmZlci5mcm9tKCdjb2xsZWN0aW9uX2NwaScsICd1dGY4JyldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QXNzZXRJZCA9IChhZGRyZXNzOiBQdWJrZXksIGxlYWZJbmRleDogbnVtYmVyKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgQk4uQk4obGVhZkluZGV4KTtcbiAgICAgIGNvbnN0IFthc3NldElkXSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2Fzc2V0JywgJ3V0ZjgnKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBVaW50OEFycmF5LmZyb20obm9kZS50b0FycmF5KCdsZScsIDgpKSxcbiAgICAgICAgXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFzc2V0SWQudG9TdHJpbmcoKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCBhcyBBc3NvY2lhdGVkIH0gZnJvbSAnLi9hc3NvY2lhdGVkJztcbmltcG9ydCB7IEFjY291bnQgYXMgS2V5cGFpciB9IGZyb20gJy4va2V5cGFpcic7XG5pbXBvcnQgeyBBY2NvdW50IGFzIFBkYSB9IGZyb20gJy4vcGRhJztcblxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSB7XG4gIC4uLkFzc29jaWF0ZWQsXG4gIC4uLktleXBhaXIsXG4gIC4uLlBkYSxcbn07XG4iLCAiaW1wb3J0IHsgSW50ZXJuYWxDb2xsZWN0aW9uIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgR3JvdXBpbmcgfSBmcm9tICd+L3R5cGVzL2Rhcy1hcGknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDb2xsZWN0aW9uLCBJbnB1dENvbGxlY3Rpb24sIE9wdGlvbiB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbiB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDb2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGlucHV0LnRvUHVibGljS2V5KCksXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4sXG4gICAgKTogQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiBvdXRwdXQua2V5LnRvU3RyaW5nKCksXG4gICAgICAgIHZlcmlmaWVkOiBvdXRwdXQudmVyaWZpZWQsXG4gICAgICB9O1xuICAgIH07XG4gIH1cblxuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb25NaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBHcm91cGluZ1tdKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IG91dHB1dC5maW5kKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUuZ3JvdXBfa2V5ID09PSAnY29sbGVjdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUuZ3JvdXBfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcyA/IHJlcy5ncm91cF92YWx1ZSA6ICcnO1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IENyZWF0b3JzLCBJbnB1dENyZWF0b3JzLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IEludGVybmFsQ3JlYXRvcnMgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDcmVhdG9ycyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDcmVhdG9yc1tdPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b0NvbXByZXNzZWROZnRJbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDcmVhdG9yc1tdPiB8IHVuZGVmaW5lZCxcbiAgICApOiBJbnRlcm5hbENyZWF0b3JzW10gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQhLm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+LFxuICAgICk6IENyZWF0b3JzW10gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9TdHJpbmcoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZGF0YS52ZXJpZmllZCxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJleHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUm95YWx0eSB7XG4gICAgZXhwb3J0IGNvbnN0IFRIUkVTSE9MRCA9IDEwMDtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL2NvbXByZXNzZWQtbmZ0JztcbmltcG9ydCB7XG4gIE1ldGFkYXRhQXJncyxcbiAgVG9rZW5Qcm9ncmFtVmVyc2lvbixcbiAgVG9rZW5TdGFuZGFyZCxcbn0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBBc3NldEFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBNZXRhZGF0YUFyZ3MgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvQ29tcHJlc3NlZE5mdEluZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBmYWxzZSxcbiAgICAgICAgaXNNdXRhYmxlOiBpbnB1dC5pc011dGFibGUgPz8gZmFsc2UsXG4gICAgICAgIGVkaXRpb25Ob25jZTogMCxcbiAgICAgICAgdG9rZW5TdGFuZGFyZDogVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgICAgdG9rZW5Qcm9ncmFtVmVyc2lvbjogVG9rZW5Qcm9ncmFtVmVyc2lvbi5PcmlnaW5hbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChvdXRwdXQ6IEFzc2V0QW5kT2ZmY2hhaW4pOiBOZnRNZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5pZC50b1N0cmluZygpLFxuICAgICAgICBjb2xsZWN0aW9uTWludDogQ29sbGVjdGlvbi5Db2xsZWN0aW9uTWludC5pbnRvVXNlcihcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5ncm91cGluZyxcbiAgICAgICAgKSBhcyBQdWJrZXksXG4gICAgICAgIGF1dGhvcml0aWVzOiBvdXRwdXQub25jaGFpbi5hdXRob3JpdGllcyxcbiAgICAgICAgcm95YWx0eTogUm95YWx0eS5Sb3lhbHR5LmludG9Vc2VyKG91dHB1dC5vbmNoYWluLnJveWFsdHkucGVyY2VudCksXG4gICAgICAgIG5hbWU6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQubWV0YWRhdGEubmFtZSxcbiAgICAgICAgc3ltYm9sOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLnN5bWJvbCxcbiAgICAgICAgdXJpOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uY3JlYXRvcnMpISxcbiAgICAgICAgdHJlZUFkZHJlc3M6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLnRyZWUsXG4gICAgICAgIGlzQ29tcHJlc3NlZDogb3V0cHV0Lm9uY2hhaW4uY29tcHJlc3Npb24uY29tcHJlc3NlZCxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5tdXRhYmxlLFxuICAgICAgICBpc0J1cm46IG91dHB1dC5vbmNoYWluLmJ1cm50LFxuICAgICAgICBlZGl0aW9uTm9uY2U6IG91dHB1dC5vbmNoYWluLnN1cHBseS5lZGl0aW9uX25vbmNlLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBvdXRwdXQub25jaGFpbi5yb3lhbHR5LnByaW1hcnlfc2FsZV9oYXBwZW5lZCxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSEsXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBNZW1vLCBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNZW1vLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG91dHB1dFRyYW5zZmVyPzogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgICBpZiAob3V0cHV0VHJhbnNmZXIgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSAhPT0gJycpIHtcbiAgICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSA9PT0gJ3NwbC10b2tlbicpIHtcbiAgICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBoaXN0b3J5Lm1lbW8gPSBvdXRwdXQucGFyc2VkO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTWludFRvIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE1pbnRUbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQgYXMgc3RyaW5nO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb2xsZWN0aW9uRGV0YWlscyBhcyBNZXRhcGxleENvbGxlY3Rpb25EZXRhaWxzIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgQ29sbGVjdGlvbkRldGFpbHMsIE9wdGlvbiB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbkRldGFpbHMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPE1ldGFwbGV4Q29sbGVjdGlvbkRldGFpbHM+LFxuICAgICk6IENvbGxlY3Rpb25EZXRhaWxzIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIF9fa2luZDogb3V0cHV0Ll9fa2luZCxcbiAgICAgICAgc2l6ZTogcGFyc2VJbnQob3V0cHV0LnNpemUudG9TdHJpbmcoMTApKSxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgT3B0aW9uLCBVc2VzIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBVc2VzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKG91dHB1dDogT3B0aW9uPFVzZXM+KTogVXNlcyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Vc2VzIH0gZnJvbSAnLi91c2VzJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgSW5wdXRUb2tlbk1ldGFkYXRhLCBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgTWV0YWRhdGFBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUb2tlbk1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0VG9rZW5NZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogbnVsbCxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBNZXRhZGF0YUFuZE9mZmNoYWluLFxuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgICApOiBUb2tlbk1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLm1pbnQudG9TdHJpbmcoKSxcbiAgICAgICAgcm95YWx0eTogb3V0cHV0Lm9uY2hhaW4uZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgbmFtZTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5uYW1lKSxcbiAgICAgICAgc3ltYm9sOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCksXG4gICAgICAgIHRva2VuQW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgdXJpOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnVyaSksXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICAgIC8vIGRlbGV0ZSBOVUxMKDB4MDApIHN0cmluZ3MgZnVuY3Rpb25cbiAgICBleHBvcnQgY29uc3QgZGVsZXRlTnVsbFN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXDAvZywgJycpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbkRldGFpbHMgfSBmcm9tICcuL2NvbGxlY3Rpb24tZGV0YWlscyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBVc2VzIH0gZnJvbSAnLi91c2VzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUb2tlbiB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEsIFJlZ3VsYXJOZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IE1ldGFkYXRhQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBNZXRhZGF0YUFuZE9mZmNoYWluLFxuICAgICk6IFJlZ3VsYXJOZnRNZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3V0cHV0Lm9uY2hhaW4udXBkYXRlQXV0aG9yaXR5LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IFRva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5uYW1lKSxcbiAgICAgICAgc3ltYm9sOiBUb2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sLFxuICAgICAgICApLFxuICAgICAgICB1cmk6IFRva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBpc011dGFibGU6IG91dHB1dC5vbmNoYWluLmlzTXV0YWJsZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucHJpbWFyeVNhbGVIYXBwZW5lZCxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICBlZGl0aW9uTm9uY2U6IG91dHB1dC5vbmNoYWluLmVkaXRpb25Ob25jZSxcbiAgICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmNvbGxlY3Rpb24pLFxuICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogQ29sbGVjdGlvbkRldGFpbHMuQ29sbGVjdGlvbkRldGFpbHMuaW50b1VzZXIoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uY29sbGVjdGlvbkRldGFpbHMsXG4gICAgICAgICksXG4gICAgICAgIHVzZXM6IFVzZXMuVXNlcy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4udXNlcyksXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCksXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBvdmVyd3JpdGVPYmplY3QsIFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQge30gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBGaWxlVHlwZSwgUHJvcGVydGllcywgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUHJvcGVydGllcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IGFzeW5jIChcbiAgICAgIGlucHV0OiBQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2tGdW5jOiAoXG4gICAgICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICAgICkgPT4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+LFxuICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxQcm9wZXJ0aWVzPiA9PiB7XG4gICAgICBpZiAoIWlucHV0IHx8ICFpbnB1dC5maWxlcykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGlucHV0LmZpbGVzLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICAgIGlmICghZmlsZS5maWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBjYWxsYmFja0Z1bmMoZmlsZS5maWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgICAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvdmVyd3JpdGVPYmplY3QoZmlsZSwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBleGlzdHNLZXk6ICdmaWxlUGF0aCcsXG4gICAgICAgICAgICAgIHdpbGw6IHsga2V5OiAndXJpJywgdmFsdWU6IHJlcy52YWx1ZSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgLi4uaW5wdXQsIGZpbGVzIH0gYXMgUHJvcGVydGllcztcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVHJhbnNmZXJDaGVja2VkIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBUcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQpIHtcbiAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgKTtcbiAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm11bHRpc2lnQXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm11bHRpc2lnQXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS5zaWduZXJzID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNpZ25lcnM7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IFRyYW5zZmVyIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBUcmFuc2ZlcixcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gY2hlY2tcbiAgICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgaGlzdG9yeS5zb2wgPSBvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHM/LnRvU29sKCkudG9TdHJpbmcoKTtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIH0gZnJvbSAnLi9jb21wcmVzc2VkLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNZW1vIH0gZnJvbSAnLi9tZW1vJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICcuL3JlZ3VsYXItbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9wcm9wZXJ0aWVzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnLi90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFVzZXMgfSBmcm9tICcuL3VzZXMnO1xuXG5leHBvcnQgY29uc3QgQ29udmVydGVyID0ge1xuICAuLi5Db21wcmVzc2VkTmZ0TWV0YWRhdGEsXG4gIC4uLkNvbGxlY3Rpb24sXG4gIC4uLkNyZWF0b3JzLFxuICAuLi5NZW1vLFxuICAuLi5NaW50LFxuICAuLi5SZWd1bGFyTmZ0TWV0YWRhdGEsXG4gIC4uLlByb3BlcnRpZXMsXG4gIC4uLlJveWFsdHksXG4gIC4uLlRva2VuTWV0YWRhdGEsXG4gIC4uLlRyYW5zZmVyQ2hlY2tlZCxcbiAgLi4uVHJhbnNmZXIsXG4gIC4uLlVzZXMsXG59O1xuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgRGV0YWlscywgTGltaXQgfSBmcm9tICd+L3R5cGVzL3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFZhbGlkYXRvciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVzc2FnZSB7XG4gICAgZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnc3VjY2Vzcyc7XG4gICAgZXhwb3J0IGNvbnN0IFNNQUxMX05VTUJFUiA9ICd0b28gc21hbGwnO1xuICAgIGV4cG9ydCBjb25zdCBCSUdfTlVNQkVSID0gJ3RvbyBiaWcnO1xuICAgIGV4cG9ydCBjb25zdCBMT05HX0xFTkdUSCA9ICd0b28gbG9uZyc7XG4gICAgZXhwb3J0IGNvbnN0IEVNUFRZID0gJ2ludmFsaWQgZW1wdHkgdmFsdWUnO1xuICAgIGV4cG9ydCBjb25zdCBJTlZBTElEX1VSTCA9ICdpbnZhbGlkIHVybCc7XG4gICAgZXhwb3J0IGNvbnN0IE9OTFlfTk9ERV9KUyA9ICdgc3RyaW5nYCB0eXBlIGlzIG9ubHkgTm9kZS5qcyc7XG4gIH1cblxuICBleHBvcnQgY29uc3QgTkFNRV9MRU5HVEggPSAzMjtcbiAgZXhwb3J0IGNvbnN0IFNZTUJPTF9MRU5HVEggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IFVSTF9MRU5HVEggPSAyMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01BWCA9IDEwMDtcbiAgZXhwb3J0IGNvbnN0IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCA9IDEwMDAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NSU4gPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBpc1JveWFsdHkgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3JveWFsdHknO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1NlbGxlckZlZUJhc2lzUG9pbnRzID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzZWxsZXJGZWVCYXNpc1BvaW50cy9zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc7XG4gICAgICBpZiAocm95YWx0eSAhPT0gMCAmJiAhcm95YWx0eSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHJveWFsdHkpO1xuICAgICAgfVxuICAgICAgaWYgKHJveWFsdHkgPCBST1lBTFRZX01JTikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuU01BTExfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01JTixcbiAgICAgICAgICBjb25kaXRpb246ICd1bmRlck1pbicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChyb3lhbHR5ID4gUk9ZQUxUWV9NQVggKiBDb252ZXJ0ZXIuUm95YWx0eS5USFJFU0hPTEQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc05hbWUgPSAobmFtZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICduYW1lJztcbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgobmFtZSkgPiBOQU1FX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIG5hbWUsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IE5BTUVfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU3ltYm9sID0gKHN5bWJvbDogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzeW1ib2wnO1xuICAgICAgaWYgKCFzeW1ib2wpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBzeW1ib2wpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoc3ltYm9sKSA+IFNZTUJPTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBzeW1ib2wsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNZTUJPTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNJbWFnZVVybCA9IChpbWFnZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+XG4gICAgaXNVcmlPckltYWdlKGltYWdlLCAnaW1hZ2UnKTtcblxuICBleHBvcnQgY29uc3QgY2hlY2tBbGwgPSA8XG4gICAgVCBleHRlbmRzIFBpY2tOZnRTdG9yYWdlIHwgUGlja05mdFN0b3JhZ2VNZXRhcGxleCB8IFBpY2tNZXRhcGxleCxcbiAgPihcbiAgICBtZXRhZGF0YTogVCxcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSk7XG4gICAgICBjb25zdCByZXN1bHRzOiBEZXRhaWxzW10gPSBbXTtcbiAgICAgIGtleXMubWFwKChrZXkpID0+IHtcbiAgICAgICAgbGV0IHJlcyE6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPjtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLmltYWdlKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzSW1hZ2VVcmwobWV0YWRhdGEuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncm95YWx0eSc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzUm95YWx0eShtZXRhZGF0YS5yb3lhbHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJGZWVCYXNpc1BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEubmFtZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc05hbWUobWV0YWRhdGEubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLnN5bWJvbCkge1xuICAgICAgICAgICAgICByZXMgPSBpc1N5bWJvbChtZXRhZGF0YS5zeW1ib2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFcnIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goLi4ucmVzLmVycm9yLmRldGFpbHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgJ0NhdWdodCBpbiB0aGUgdmFsaWRhdGlvbiBlcnJvcnMuIHNlZSBpbmZvcm1hdGlvbiBlLmc6IGVycjxWYWxpZGF0b3JFcnJvcj4uZGV0YWlscyc7XG4gICAgICAgIHRocm93IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZSA9IFBpY2s8XG4gICAgT2ZmY2hhaW4sXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAnaW1hZ2UnIHwgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJ1xuICA+O1xuICB0eXBlIFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggPSBQaWNrPFxuICAgIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAncm95YWx0eScgfCAnZmlsZVBhdGgnXG4gID47XG4gIHR5cGUgUGlja01ldGFwbGV4ID0gUGljazxcbiAgICBEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdCxcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgaWYgKCFpbWFnZU9yVXJpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChpbWFnZU9yVXJpKSA+IFVSTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBpbWFnZU9yVXJpLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBVUkxfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oz86Jj0rLCUjXSsvZy50ZXN0KGltYWdlT3JVcmkpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5JTlZBTElEX1VSTCwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGRldGFpbHM6IERldGFpbHNbXTtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBkZXRhaWxzOiBEZXRhaWxzW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJy4uL2FjY291bnQnO1xuXG5leHBvcnQgZW51bSBGaWx0ZXJUeXBlIHtcbiAgTWVtbyA9ICdtZW1vJyxcbiAgTWludCA9ICdtaW50JyxcbiAgT25seU1lbW8gPSAnb25seS1tZW1vJyxcbiAgVHJhbnNmZXIgPSAndHJhbnNmZXInLFxufVxuXG5leHBvcnQgZW51bSBNb2R1bGVOYW1lIHtcbiAgU29sTmF0aXZlID0gJ3N5c3RlbScsXG4gIFNwbFRva2VuID0gJ3NwbC10b2tlbicsXG59XG5cbmV4cG9ydCBjb25zdCBGaWx0ZXJPcHRpb25zID0ge1xuICBUcmFuc2Zlcjoge1xuICAgIHByb2dyYW06IFsnc3lzdGVtJywgJ3NwbC10b2tlbiddLFxuICAgIGFjdGlvbjogWyd0cmFuc2ZlcicsICd0cmFuc2ZlckNoZWNrZWQnXSxcbiAgfSxcbiAgTWVtbzoge1xuICAgIHByb2dyYW06IFsnc3BsLW1lbW8nXSxcbiAgICBhY3Rpb246IFsnKiddLFxuICB9LFxuICBNaW50OiB7XG4gICAgcHJvZ3JhbTogWydzcGwtdG9rZW4nXSxcbiAgICBhY3Rpb246IFsnbWludFRvJywgJ21pbnRUb0NoZWNrZWQnXSxcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIFBvc3RUb2tlbkFjY291bnQgPSB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgb3duZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFdpdGhNZW1vID0ge1xuICBzaWc6IHN0cmluZ1tdO1xuICBtZW1vOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBUcmFuc2ZlciA9IHtcbiAgcGFyc2VkOiB7XG4gICAgaW5mbzoge1xuICAgICAgZGVzdGluYXRpb246IFB1YmtleTtcbiAgICAgIHNvdXJjZTogUHVia2V5O1xuICAgICAgbGFtcG9ydHM6IG51bWJlcjtcbiAgICB9O1xuICAgIHR5cGU6IHN0cmluZztcbiAgfTtcbiAgcHJvZ3JhbTogc3RyaW5nO1xuICBwcm9ncmFtSWQ/OiBQdWJsaWNLZXk7XG59O1xuXG5leHBvcnQgdHlwZSBNaW50VG8gPSB7XG4gIHBhcnNlZDoge1xuICAgIGluZm86IHtcbiAgICAgIGFjY291bnQ6IFB1YmtleTtcbiAgICAgIG1pbnQ6IFB1YmtleTtcbiAgICAgIG1pbnRBdXRob3JpdHk6IFB1YmtleTtcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmc7XG4gICAgfTtcbiAgICB0eXBlOiBzdHJpbmc7XG4gIH07XG4gIHByb2dyYW06IHN0cmluZztcbiAgcHJvZ3JhbUlkPzogUHVibGljS2V5O1xufTtcblxuZXhwb3J0IHR5cGUgTWludFRvQ2hlY2tlZCA9IE1pbnRUbztcblxuZXhwb3J0IHR5cGUgVHJhbnNmZXJDaGVja2VkID0ge1xuICBwYXJzZWQ6IHtcbiAgICBpbmZvOiB7XG4gICAgICBkZXN0aW5hdGlvbjogUHVia2V5O1xuICAgICAgbWludDogUHVia2V5O1xuICAgICAgbXVsdGlzaWdBdXRob3JpdHk6IFB1YmtleTtcbiAgICAgIHNpZ25lcnM6IFB1YmtleVtdO1xuICAgICAgc291cmNlOiBQdWJrZXk7XG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nO1xuICAgIH07XG4gICAgdHlwZTogc3RyaW5nO1xuICB9O1xuICBwcm9ncmFtOiBzdHJpbmc7XG4gIHByb2dyYW1JZD86IFB1YmxpY0tleTtcbn07XG5cbmV4cG9ydCB0eXBlIE1lbW8gPSB7XG4gIHBhcnNlZDogc3RyaW5nO1xuICBwcm9ncmFtOiBzdHJpbmc7XG4gIHByb2dyYW1JZDogUHVibGljS2V5O1xufTtcbiIsICIvL0BpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVBbW91bnQgPSAoXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gYW1vdW50ICogMTAgKiogbWludERlY2ltYWw7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBBdXRob3JpdHlPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYnVybkFtb3VudDogbnVtYmVyLFxuICAgIHRva2VuRGVjaW1hbHM6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IHNpZ25lcnNbMF07XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUJ1cm5DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KGJ1cm5BbW91bnQsIHRva2VuRGVjaW1hbHMpLFxuICAgICAgICB0b2tlbkRlY2ltYWxzLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnfi90eXBlcy9maW5kJztcbmltcG9ydCB7IFJlZ3VsYXJOZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IE9uRXJyLCBPbk9rIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQge1xuICBNZXRhZGF0YSxcbiAgVG9rZW5TdGFuZGFyZCxcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBQYXJzZWRBY2NvdW50RGF0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnY3Jvc3MtZmV0Y2gnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgY29uc3QgVU5BQkxFX0VSUk9SX1JFR0VYID0gL1VuYWJsZSB0byBmaW5kIE1ldGFkYXRhIGFjY291bnQvO1xuXG4gIC8vIFNvcnQgYnkgbGF0ZXN0IHdpdGggdW5peHRpbWVzdGFtcCBmdW5jdGlvblxuICBjb25zdCBzb3J0QnlVaW5peFRpbWVzdGFtcCA9XG4gICAgPFQgZXh0ZW5kcyBSZWd1bGFyTmZ0TWV0YWRhdGEgfCBUb2tlbk1ldGFkYXRhPihzb3J0YWJsZTogU29ydERpcmVjdGlvbikgPT5cbiAgICAoYTogVCwgYjogVCk6IG51bWJlciA9PiB7XG4gICAgICBpZiAoIWEub2ZmY2hhaW4uY3JlYXRlZF9hdCkge1xuICAgICAgICBhLm9mZmNoYWluLmNyZWF0ZWRfYXQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKCFiLm9mZmNoYWluLmNyZWF0ZWRfYXQpIHtcbiAgICAgICAgYi5vZmZjaGFpbi5jcmVhdGVkX2F0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChzb3J0YWJsZSA9PT0gU29ydERpcmVjdGlvbi5EZXNjKSB7XG4gICAgICAgIHJldHVybiBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgLSBhLm9mZmNoYWluLmNyZWF0ZWRfYXQ7XG4gICAgICB9IGVsc2UgaWYgKHNvcnRhYmxlID09PSBTb3J0RGlyZWN0aW9uLkFzYykge1xuICAgICAgICByZXR1cm4gYS5vZmZjaGFpbi5jcmVhdGVkX2F0IC0gYi5vZmZjaGFpbi5jcmVhdGVkX2F0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGEub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH1cbiAgICB9O1xuXG4gIGNvbnN0IGNvbnZlcnRlciA9IDxUPihcbiAgICB0b2tlblN0YW5kYXJkOiBUb2tlblN0YW5kYXJkLFxuICAgIG1ldGFkYXRhOiBNZXRhZGF0YSxcbiAgICBqc29uOiBPZmZjaGFpbixcbiAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICApOiBUID0+IHtcbiAgICBpZiAodG9rZW5TdGFuZGFyZCA9PT0gVG9rZW5TdGFuZGFyZC5GdW5naWJsZSkge1xuICAgICAgcmV0dXJuIENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9Vc2VyKFxuICAgICAgICB7XG4gICAgICAgICAgb25jaGFpbjogbWV0YWRhdGEsXG4gICAgICAgICAgb2ZmY2hhaW46IGpzb24sXG4gICAgICAgIH0sXG4gICAgICAgIHRva2VuQW1vdW50LFxuICAgICAgKSBhcyBUO1xuICAgIH0gZWxzZSBpZiAodG9rZW5TdGFuZGFyZCA9PT0gVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSkge1xuICAgICAgcmV0dXJuIENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b1VzZXIoe1xuICAgICAgICBvbmNoYWluOiBtZXRhZGF0YSxcbiAgICAgICAgb2ZmY2hhaW46IGpzb24sXG4gICAgICB9KSBhcyBUO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggdG9rZW5TdGFuZGFyZDogJHt0b2tlblN0YW5kYXJkfWApO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2VuZXJpY0ZpbmRCeU93bmVyID0gYXN5bmMgPFxuICAgIFQgZXh0ZW5kcyBSZWd1bGFyTmZ0TWV0YWRhdGEgfCBUb2tlbk1ldGFkYXRhLFxuICA+KFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgY2FsbGJhY2s6IChyZXN1bHQ6IFJlc3VsdDxUW10sIEVycm9yPikgPT4gdm9pZCxcbiAgICB0b2tlblN0YW5kYXJkOiBUb2tlblN0YW5kYXJkLFxuICAgIHNvcnRhYmxlPzogU29ydERpcmVjdGlvbixcbiAgICBpc0hvbGRlcj86IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGF0YTogVFtdID0gW107XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgY29ubmVjdGlvbi5nZXRQYXJzZWRUb2tlbkFjY291bnRzQnlPd25lcihcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAge1xuICAgICAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIGluZm8udmFsdWUubGVuZ3RoID09PSAwICYmIGNhbGxiYWNrKFJlc3VsdC5vayhbXSkpO1xuXG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IGQgb2YgaW5mby52YWx1ZSkge1xuICAgICAgICBpZiAoaXNIb2xkZXIgJiYgZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8udG9rZW5BbW91bnQudWlBbW91bnQgPCAxKSB7XG4gICAgICAgICAgZGVidWdMb2coXG4gICAgICAgICAgICAnIyBmaW5kQnlPd25lciBubyBob2xkIG1ldGFkYXRhOiAnLFxuICAgICAgICAgICAgZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtaW50ID0gZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8ubWludCBhcyBQdWJrZXk7XG4gICAgICAgIGNvbnN0IHRva2VuQW1vdW50ID0gZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8udG9rZW5BbW91bnRcbiAgICAgICAgICAuYW1vdW50IGFzIHN0cmluZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgTWV0YWRhdGEuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgICAgIEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgZGVidWdMb2coJyMgZmluZEJ5T3duZXIgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgICAgICAvLyB0b2tlblN0YW5kYXJkOiAwKE5GVCkgb3IgMiAoU1BMLVRPS0VOKVxuICAgICAgICAgIGlmIChtZXRhZGF0YS50b2tlblN0YW5kYXJkICE9PSB0b2tlblN0YW5kYXJkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmV0Y2gobWV0YWRhdGEuZGF0YS51cmkpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAuanNvbigpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGpzb246IE9mZmNoYWluKSA9PiB7XG4gICAgICAgICAgICAgICAgICBkYXRhLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnRlcjxUPih0b2tlblN0YW5kYXJkLCBtZXRhZGF0YSwganNvbiwgdG9rZW5BbW91bnQpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhkYXRhKSk7IC8vIG5lZWQgdGhpcyBjYWxsID9cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkZXNjQWxnbyA9IHNvcnRCeVVpbml4VGltZXN0YW1wPFQ+KFNvcnREaXJlY3Rpb24uRGVzYyk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhc2NBbGdvID0gc29ydEJ5VWluaXhUaW1lc3RhbXA8VD4oU29ydERpcmVjdGlvbi5Bc2MpO1xuICAgICAgICAgICAgICAgICAgaWYgKHNvcnRhYmxlID09PSBTb3J0RGlyZWN0aW9uLkRlc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc29ydChkZXNjQWxnbyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvcnRhYmxlID09PSBTb3J0RGlyZWN0aW9uLkFzYykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5zb3J0KGFzY0FsZ28pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0Lm9rKGRhdGEpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IgJiYgVU5BQkxFX0VSUk9SX1JFR0VYLnRlc3QoZS5tZXNzYWdlKSkge1xuICAgICAgICAgICAgZGVidWdMb2coJyMgc2tpcCBlcnJvciBmb3Igb2xkIFNQTC1UT0tFTjogJywgbWludCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2VuZXJpY0ZpbmRCeU1pbnQgPSBhc3luYyA8XG4gICAgVCBleHRlbmRzIFJlZ3VsYXJOZnRNZXRhZGF0YSB8IFRva2VuTWV0YWRhdGEsXG4gID4oXG4gICAgbWludDogUHVia2V5LFxuICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQsXG4gICk6IFByb21pc2U8UmVzdWx0PFQsIEVycm9yPj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG5cbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgTWV0YWRhdGEuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICBjb25uZWN0aW9uLFxuICAgICAgICBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50KSxcbiAgICAgICk7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlNaW50IG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG4gICAgICAvLyB0b2tlblN0YW5kYXJkOiAwKE5GVCkgb3IgMiAoU1BMLVRPS0VOKVxuICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgIT09IHRva2VuU3RhbmRhcmQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3Rva2VuIHN0YW5kYXJkcyBhcmUgZGlmZmVyZW50Jyk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgY29ubmVjdGlvbi5nZXRQYXJzZWRBY2NvdW50SW5mbyhtaW50LnRvUHVibGljS2V5KCkpO1xuICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSAoaW5mby52YWx1ZT8uZGF0YSBhcyBQYXJzZWRBY2NvdW50RGF0YSkucGFyc2VkLmluZm9cbiAgICAgICAgLnN1cHBseSBhcyBzdHJpbmc7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IChcbiAgICAgICAgYXdhaXQgZmV0Y2gobWV0YWRhdGEuZGF0YS51cmkpXG4gICAgICApLmpzb24oKSkgYXMgT2ZmY2hhaW47XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKFxuICAgICAgICBjb252ZXJ0ZXI8VD4odG9rZW5TdGFuZGFyZCwgbWV0YWRhdGEsIHJlc3BvbnNlLCB0b2tlbkFtb3VudCksXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUgYXMgRXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG93bmVyIFB1YmtleVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtPbk9rfSBvbk9rIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T25FcnJ9IG9uRXJyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7e3NvcnRhYmxlPzogU29ydGFibGUsIGlzSG9sZGVyPzogYm9vbGVhbn19IG9wdGlvbnM/XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb25PazogT25PazxUb2tlbk1ldGFkYXRhPixcbiAgICBvbkVycjogT25FcnIsXG4gICAgb3B0aW9ucz86IHsgc29ydERpcmVjdGlvbj86IFNvcnREaXJlY3Rpb247IGlzSG9sZGVyPzogYm9vbGVhbiB9LFxuICApOiB2b2lkID0+IHtcbiAgICBjb25zdCBzb3J0YWJsZSA9ICFvcHRpb25zPy5zb3J0RGlyZWN0aW9uXG4gICAgICA/IFNvcnREaXJlY3Rpb24uRGVzY1xuICAgICAgOiBvcHRpb25zPy5zb3J0RGlyZWN0aW9uO1xuICAgIGNvbnN0IGlzSG9sZGVyID0gIW9wdGlvbnM/LmlzSG9sZGVyID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWZsb2F0aW5nLXByb21pc2VzICovXG4gICAgZ2VuZXJpY0ZpbmRCeU93bmVyPFRva2VuTWV0YWRhdGE+KFxuICAgICAgb3duZXIsXG4gICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgIHJlc3VsdC5tYXRjaCgob2spID0+IG9uT2sob2spLCBvbkVycik7XG4gICAgICB9LFxuICAgICAgVG9rZW5TdGFuZGFyZC5GdW5naWJsZSxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgaXNIb2xkZXIsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VG9rZW5NZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGdlbmVyaWNGaW5kQnlNaW50PFRva2VuTWV0YWRhdGE+KG1pbnQsIFRva2VuU3RhbmRhcmQuRnVuZ2libGUpO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBBdXRob3JpdHlPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEZyZWV6aW5nIGEgdGFyZ2V0IG5mdFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8QXV0aG9yaXR5T3B0aW9ucz59IG9wdGlvbnMgLy8gb3B0aW9uc1xuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblRyYW5zYWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBkZXN0LFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICk7XG5cbiAgICAgIGxldCBpbnN0MjtcbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuXG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbih7XG4gICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgIGJsb2NraGFzaDogYmxvY2toYXNoT2JqLmJsb2NraGFzaCxcbiAgICAgICAgZmVlUGF5ZXI6IGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcblxuICAgICAgLy8gcmV0dXJuIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgaWYgKCFkZXN0VG9rZW4uaW5zdCkge1xuICAgICAgICBpbnN0MiA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBkZXN0VG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgKTtcbiAgICAgICAgdHguYWRkKGluc3QyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldHVybiBpbnN0cnVjdGlvbiBhbmQgdW5kZWNpZGVkIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgICBpbnN0MiA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBkZXN0VG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgKTtcbiAgICAgICAgdHguYWRkKGRlc3RUb2tlbi5pbnN0KS5hZGQoaW5zdDIpO1xuICAgICAgfVxuXG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAga2V5cGFpcnMuZm9yRWFjaCgoc2lnbmVyKSA9PiB7XG4gICAgICAgIHR4LnBhcnRpYWxTaWduKHNpZ25lcik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2VyaWFsaXplZFR4ID0gdHguc2VyaWFsaXplKHtcbiAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBoZXggPSBzZXJpYWxpemVkVHgudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgcmV0dXJuIG5ldyBQYXJ0aWFsU2lnblRyYW5zYWN0aW9uKGhleCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBTeXN0ZW1Qcm9ncmFtLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQXV0aG9yaXR5VHlwZSxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCxcbiAgTUlOVF9TSVpFLFxuICBUT0tFTl9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24sXG4gIERhdGFWMixcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgTWludFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG4gIGV4cG9ydCBjb25zdCBjcmVhdGVGcmVlemVBdXRob3JpdHkgPSAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBjcmVhdGVTZXRBdXRob3JpdHlJbnN0cnVjdGlvbihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIEF1dGhvcml0eVR5cGUuRnJlZXplQWNjb3VudCxcbiAgICAgIGZyZWV6ZUF1dGhvcml0eSxcbiAgICApO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICB0b2tlbk1ldGFkYXRhOiBEYXRhVjIsXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgICBpc011dGFibGU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8VHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdPiA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhbXBvcnRzID0gYXdhaXQgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludChjb25uZWN0aW9uKTtcbiAgICBjb25zdCBtZXRhZGF0YVBkYSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IFtdO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBTeXN0ZW1Qcm9ncmFtLmNyZWF0ZUFjY291bnQoe1xuICAgICAgICBmcm9tUHVia2V5OiBmZWVQYXllcixcbiAgICAgICAgbmV3QWNjb3VudFB1YmtleTogbWludCxcbiAgICAgICAgc3BhY2U6IE1JTlRfU0laRSxcbiAgICAgICAgbGFtcG9ydHM6IGxhbXBvcnRzLFxuICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBtaW50LFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIHRva2VuQXNzb2NpYXRlZCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIENhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQodG90YWxBbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGFQZGEsXG4gICAgICAgICAgbWludCxcbiAgICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNyZWF0ZU1ldGFkYXRhQWNjb3VudEFyZ3NWMzoge1xuICAgICAgICAgICAgZGF0YTogdG9rZW5NZXRhZGF0YSxcbiAgICAgICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25EZXRhaWxzOiBudWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfTtcblxuICAvKipcbiAgICogU1BMLVRPS0VOIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgIC8vIHRva2VuIG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBzaWduZXIgICAgICAvLyB0b2tlbiBvd25lciBTZWNyZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQW1vdW50IC8vIHRvdGFsIG51bWJlclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWwgLy8gdG9rZW4gZGVjaW1hbFxuICAgKiBAcGFyYW0ge0lucHV0VG9rZW5NZXRhZGF0YX0gaW5wdXQgICAgICAgLy8gdG9rZW4gbWV0YWRhdGFcbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9ucyAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyOiBTZWNyZXQsXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGlucHV0OiBJbnB1dFRva2VuTWV0YWRhdGEsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uPFB1YmtleT4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXRUb2tlbk1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZmVlUGF5ZXIsIGZyZWV6ZUF1dGhvcml0eSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBzaWduZXI7XG4gICAgICBpbnB1dC5yb3lhbHR5ID0gMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gMDtcblxuICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0IGFzIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICAgIGlucHV0LnJveWFsdHksXG4gICAgICApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHsgaW1hZ2U6IGlucHV0LnVyaSB9O1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkRGF0YShcbiAgICAgICAgICB7IC4uLnN0b3JhZ2VNZXRhZGF0YSwgLi4uaW1hZ2UgfSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVyaSk7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IGNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG90YWxBbW91bnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRnJlZXplQXV0aG9yaXR5KFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTWludFRyYW5zYWN0aW9uKFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW3NpZ25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgaXNCcm93c2VyLCBpc05vZGUgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBGaWxlVHlwZSwgSWRlbnRpdHksIFRhZ3MsIFVwbG9hZGFibGVGaWxlVHlwZSB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBQaGFudG9tUHJvdmlkZXIgfSBmcm9tICd+L3R5cGVzL3BoYW50b20nO1xuaW1wb3J0IElyeXMsIHsgV2ViSXJ5cyB9IGZyb20gJ0BpcnlzL3Nkayc7XG5pbXBvcnQgeyBVcGxvYWRSZXNwb25zZSB9IGZyb20gJ0BpcnlzL3Nkay9idWlsZC9lc20vY29tbW9uL3R5cGVzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBQcm92ZW5hbmNlTGF5ZXIge1xuICBjb25zdCBUT0tFTiA9ICdzb2xhbmEnO1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIHVwbG9hZEZpbGU6IEZpbGVUeXBlLFxuICAgIGlkZW50aXR5OiBJZGVudGl0eSxcbiAgICB0YWdzPzogVGFncyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgbGV0IHJlY2VpcHQhOiBVcGxvYWRSZXNwb25zZTtcbiAgICBpZiAoaXNVcGxvYWRhYmxlKHVwbG9hZEZpbGUpKSB7XG4gICAgICByZWNlaXB0ID0gYXdhaXQgaXJ5cy51cGxvYWRGaWxlKHVwbG9hZEZpbGUsIHsgdGFncyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vIG1hdGNoIGZpbGUgdHlwZSBvciBlbnZpcm9tZW50Jyk7XG4gICAgfVxuICAgIHJldHVybiBgJHtDb25zdGFudHMuSVJZU19HQVRFV0FZX1VSTH0vJHtyZWNlaXB0LmlkfWA7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZERhdGEgPSBhc3luYyAoXG4gICAgZGF0YTogc3RyaW5nLFxuICAgIGlkZW50aXR5OiBJZGVudGl0eSxcbiAgICB0YWdzPzogVGFncyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgcmVjZWlwdCA9IGF3YWl0IGlyeXMudXBsb2FkKGRhdGEsIHsgdGFncyB9KTtcbiAgICByZXR1cm4gYCR7Q29uc3RhbnRzLklSWVNfR0FURVdBWV9VUkx9LyR7cmVjZWlwdC5pZH1gO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc05vZGVhYmxlID0gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nID0+IHtcbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzQnJvd3NlcmFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBGaWxlID0+IHtcbiAgICBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNVcGxvYWRhYmxlID0gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgVXBsb2FkYWJsZUZpbGVUeXBlID0+IHtcbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGZ1bmRBcndlYXZlID0gYXN5bmMgKFxuICAgIHVwbG9hZEZpbGU6IEZpbGVUeXBlLFxuICAgIGlkZW50aXR5OiBJZGVudGl0eSxcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGNvbnN0IGJ5dGVMZW5ndGggPSBhd2FpdCB0b0J5dGVMZW5ndGgodXBsb2FkRmlsZSk7XG4gICAgY29uc3Qgd2lsbFBheSA9IGF3YWl0IGNhbGN1bGF0ZUNvc3QoYnl0ZUxlbmd0aCwgaWRlbnRpdHkpO1xuICAgIGNvbnN0IGZ1bmRUeCA9IGF3YWl0IGlyeXMuZnVuZChpcnlzLnV0aWxzLnRvQXRvbWljKHdpbGxQYXkpKTtcbiAgICBkZWJ1Z0xvZygnIyBmdW5kVHg6ICcsIGZ1bmRUeCk7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCB0b0J5dGVMZW5ndGggPSBhc3luYyAoY29udGVudDogRmlsZVR5cGUpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgIGxldCBsZW5ndGg6IG51bWJlciA9IDEwMDtcbiAgICBpZiAoaXNOb2RlYWJsZShjb250ZW50KSkge1xuICAgICAgbGVuZ3RoID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGNvbnRlbnQpLmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcmFibGUoY29udGVudCkpIHtcbiAgICAgIGxlbmd0aCA9IGNvbnRlbnQuc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vIG1hdGNoIGNvbnRlbnQgdHlwZScpO1xuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0SXJ5cyA9IGFzeW5jIDxUIGV4dGVuZHMgSXJ5cyB8IFdlYklyeXM+KFxuICAgIGlkZW50aXR5OiBJZGVudGl0eSxcbiAgKSA9PiB7XG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGdldE5vZGVJcnlzKGlkZW50aXR5IGFzIFNlY3JldCkpIGFzIFQ7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIChhd2FpdCBnZXRCcm93c2VySXJ5cyhpZGVudGl0eSBhcyBQaGFudG9tUHJvdmlkZXIpKSBhcyBUO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignT25seSBOb2RlLmpzIG9yIEJyb3dzZXInKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXROb2RlSXJ5cyA9IGFzeW5jIChzZWNyZXQ6IFNlY3JldCkgPT4ge1xuICAgIGNvbnN0IGNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgfSk7XG4gICAgY29uc3QgdXJsID0gQ29uc3RhbnRzLkJVTkRMUl9ORVRXT1JLX1VSTDtcbiAgICBjb25zdCB0b2tlbiA9IFRPS0VOO1xuICAgIGNvbnN0IGtleSA9IHNlY3JldDtcbiAgICBjb25zdCBpcnlzID0gbmV3IElyeXMoe1xuICAgICAgdXJsLFxuICAgICAgdG9rZW4sXG4gICAgICBrZXksXG4gICAgICBjb25maWc6IHsgcHJvdmlkZXJVcmw6IGNsdXN0ZXJVcmwgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gaXJ5cztcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJJcnlzID0gYXN5bmMgKFxuICAgIHByb3ZpZGVyOiBQaGFudG9tUHJvdmlkZXIsXG4gICk6IFByb21pc2U8V2ViSXJ5cz4gPT4ge1xuICAgIGNvbnN0IGNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgfSk7XG4gICAgY29uc3QgdXJsID0gQ29uc3RhbnRzLkJVTkRMUl9ORVRXT1JLX1VSTDtcbiAgICBjb25zdCB0b2tlbiA9IFRPS0VOO1xuICAgIGNvbnN0IHdhbGxldCA9IHsgcnBjVXJsOiBjbHVzdGVyVXJsLCBuYW1lOiBUT0tFTiwgcHJvdmlkZXI6IHByb3ZpZGVyIH07XG4gICAgY29uc3Qgd2ViSXJ5cyA9IG5ldyBXZWJJcnlzKHsgdXJsLCB0b2tlbiwgd2FsbGV0IH0pO1xuICAgIGF3YWl0IHdlYklyeXMucmVhZHkoKTtcbiAgICByZXR1cm4gd2ViSXJ5cztcbiAgfTtcblxuICBjb25zdCBjYWxjdWxhdGVDb3N0ID0gYXN5bmMgKHNpemU6IG51bWJlciwgaWRlbnRpdHk6IElkZW50aXR5KSA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGNvbnN0IHByaWNlQXRvbWljID0gYXdhaXQgaXJ5cy5nZXRQcmljZShzaXplKTtcbiAgICBjb25zdCBwcmljZUNvbnZlcnRlZCA9IGlyeXMudXRpbHMuZnJvbUF0b21pYyhwcmljZUF0b21pYyk7XG4gICAgZGVidWdMb2coJyMgc2l6ZTogJywgc2l6ZSk7XG4gICAgZGVidWdMb2coYCMgcHJpY2U6ICR7cHJpY2VDb252ZXJ0ZWR9YCk7XG4gICAgcmV0dXJuIHByaWNlQ29udmVydGVkO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFByb3ZlbmFuY2VMYXllciB9IGZyb20gJy4vcHJvdmVuYW5jZS1sYXllcic7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBcndlYXZlIHtcbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgZmlsZTogJywgZmlsZVBhdGgpO1xuICAgICAgYXdhaXQgUHJvdmVuYW5jZUxheWVyLmZ1bmRBcndlYXZlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgICByZXR1cm4gYXdhaXQgUHJvdmVuYW5jZUxheWVyLnVwbG9hZEZpbGUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IChcbiAgICBtZXRhZGF0YTogT2ZmY2hhaW4sXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhIGRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgIHJldHVybiBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIudXBsb2FkRGF0YShcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpLFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQmxvYiwgTkZUU3RvcmFnZSB9IGZyb20gJ25mdC5zdG9yYWdlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHJvdmVuYW5jZUxheWVyIH0gZnJvbSAnLi9wcm92ZW5hbmNlLWxheWVyJztcbmltcG9ydCB7IEZpbGVUeXBlLCBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTmZ0U3RvcmFnZSB7XG4gIGNvbnN0IGNyZWF0ZUdhdGV3YXlVcmwgPSAoY2lkOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICBgJHtDb25zdGFudHMuTkZUX1NUT1JBR0VfR0FURVdBWV9VUkx9LyR7Y2lkfWA7XG5cbiAgY29uc3QgY29ubmVjdCA9ICgpID0+IHtcbiAgICBDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLmNhbGN1bGF0ZVByb2JhYmlsaXR5KCkgJiZcbiAgICAgIGNvbnNvbGUud2FybihDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLk5GVF9TVE9SQUdFX0FQSV9LRVkpO1xuICAgIHJldHVybiBuZXcgTkZUU3RvcmFnZSh7IHRva2VuOiBDb25zdGFudHMuTkZUX1NUT1JBR0VfQVBJX0tFWSB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChcbiAgICBmaWxlVHlwZTogRmlsZVR5cGUsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudDogJywgZmlsZVR5cGUpO1xuICAgICAgbGV0IGZpbGUhOiBCdWZmZXI7XG4gICAgICBpZiAoUHJvdmVuYW5jZUxheWVyLmlzTm9kZWFibGUoZmlsZVR5cGUpKSB7XG4gICAgICAgIGZpbGUgPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoZmlsZVR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChQcm92ZW5hbmNlTGF5ZXIuaXNCcm93c2VyYWJsZShmaWxlVHlwZSkpIHtcbiAgICAgICAgZmlsZSA9IEJ1ZmZlci5mcm9tKGF3YWl0IGZpbGVUeXBlLmFycmF5QnVmZmVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmlsZSA9IEJ1ZmZlci5mcm9tKGZpbGVUeXBlIGFzIEFycmF5QnVmZmVyKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmxvYkltYWdlID0gbmV3IEJsb2IoW2ZpbGVdKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkltYWdlKTtcbiAgICAgIHJldHVybiBjcmVhdGVHYXRld2F5VXJsKHJlcyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7T2ZmY2hhaW59IHN0b3JhZ2VEYXRhXG4gICAqIHtcbiAgICogICBuYW1lPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbD86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGRlc2NyaXB0aW9uPzoge3N0cmluZ30gICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIHNlbGxlckZlZUJhc2lzUG9pbnRzPzogbnVtYmVyICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBpbWFnZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgLy8gdXBsb2FkZWQgdXJpIG9mIG9yaWdpbmFsIGNvbnRlbnRcbiAgICogICBleHRlcm5hbF91cmw/OiB7c3RyaW5nfSAgICAgICAgICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiB7SnNvbk1ldGFkYXRhQXR0cmlidXRlW119ICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzoge0pzb25NZXRhZGF0YVByb3BlcnRpZXM8VXJpPn0gLy8gaW5jbHVkZWQgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogQ29sbGVjdGlvbiAgICAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgW2tleTogc3RyaW5nXToge3Vua25vd259ICAgICAgICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBzdG9yYWdlRGF0YTogT2ZmY2hhaW4sXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgbWV0YWRhdGE6ICcsIHN0b3JhZ2VEYXRhKTtcblxuICAgICAgY29uc3QgYmxvYkpzb24gPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoc3RvcmFnZURhdGEpXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JKc29uKTtcbiAgICAgIHJldHVybiBjcmVhdGVHYXRld2F5VXJsKHJlcyk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEZpbGVUeXBlLCBPZmZjaGFpbiwgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQXJ3ZWF2ZSB9IGZyb20gJy4vYXJ3ZWF2ZSc7XG5pbXBvcnQgeyBOZnRTdG9yYWdlIH0gZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RvcmFnZSB7XG4gIGV4cG9ydCBjb25zdCB0b0NvbnZlcnRPZmZjaGFpbmRhdGEgPSAoXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgKTogT2ZmY2hhaW4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXG4gICAgICBzZWxsZXJfZmVlX2Jhc2lzX3BvaW50czogc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICBleHRlcm5hbF91cmw6IGlucHV0LmV4dGVybmFsX3VybCxcbiAgICAgIGF0dHJpYnV0ZXM6IGlucHV0LmF0dHJpYnV0ZXMsXG4gICAgICBwcm9wZXJ0aWVzOiBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgaW1hZ2U6ICcnLFxuICAgICAgb3B0aW9uczogaW5wdXQub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkRmlsZShmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkRmlsZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZERhdGEgPSBhc3luYyAoXG4gICAgaW5wdXQ6IE9mZmNoYWluLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWREYXRhKGlucHV0LCBmZWVQYXllcik7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWREYXRhKGlucHV0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBzdG9yYWdlVHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkID0gYXN5bmMgKFxuICAgIGlucHV0OiBPZmZjaGFpbixcbiAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnICYmICFmZWVQYXllcikge1xuICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgIH1cbiAgICBjb25zdCBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgYXdhaXQgdXBsb2FkRmlsZShmaWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKVxuICAgICkudW53cmFwKFxuICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgaW5wdXQuaW1hZ2UgPSBvaztcbiAgICAgICAgcmV0dXJuIGF3YWl0IHVwbG9hZERhdGEoaW5wdXQsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICB9LFxuICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSxcbiAgICApO1xuXG4gICAgaWYgKCFzdG9yYWdlKSB7XG4gICAgICB0aHJvdyBFcnJvcignRW1wdHkgc3RvcmFnZSBvYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0b3JhZ2U7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQge1xuICBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQXV0aG9yaXR5T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+fSBvcHRpb25zICAvLyBvcHRpb25zXG4gICAqL1xuICBleHBvcnQgY29uc3QgdGhhdyA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQXV0aG9yaXR5T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBzaWduZXJzWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IHNvdXJjZVRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5yZXRyeUdldE9yQ3JlYXRlKFxuICAgICAgICBtaW50LFxuICAgICAgICBkZXN0LFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgc291cmNlVG9rZW4udG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBkZXN0VG9rZW4udG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFNwbFRva2VuIGFzIEFkZCB9IGZyb20gJy4vYWRkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGcmVlemUgfSBmcm9tICcuL2ZyZWV6ZSc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBHYXNMZXNzIH0gZnJvbSAnLi9nYXMtbGVzcy10cmFuc2Zlcic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCAnfi90eXBlcy90cmFuc2FjdGlvbic7XG5pbXBvcnQgJ34vdHJhbnNhY3Rpb24nO1xuXG5leHBvcnQgY29uc3QgU3BsVG9rZW4gPSB7XG4gIC4uLkFkZCxcbiAgLi4uQnVybixcbiAgLi4uRmluZCxcbiAgLi4uRnJlZXplLFxuICAuLi5HYXNMZXNzLFxuICAuLi5NaW50LFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG5cbmV4cG9ydCAqIGZyb20gJ34vc2hhcmVkL2V4cG9ydHMnO1xuIiwgImltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IEF1dGhvcml0eU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QXV0aG9yaXR5T3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PFRyYW5zYWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBzaWduZXI7XG4gICAgcmV0dXJuIFNwbFRva2VuLmJ1cm4obWludCwgb3duZXIsIFtzaWduZXJdLCBORlRfQU1PVU5ULCBORlRfREVDSU1BTFMsIHtcbiAgICAgIGZlZVBheWVyLFxuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IFNwbFRva2VuIH0gZnJvbSAnfi9zdWl0ZS1zcGwtdG9rZW4nO1xuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5pbXBvcnQgeyBPbkVyciwgT25PayB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcbmltcG9ydCB7IFRva2VuU3RhbmRhcmQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG93bmVyIFB1YmtleVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtPbk9rfSBvbk9rIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T25FcnJ9IG9uRXJyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7e3NvcnRhYmxlPzogU29ydGFibGUsIGlzSG9sZGVyPzogYm9vbGVhbn19IG9wdGlvbnM/XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb25PazogT25PazxSZWd1bGFyTmZ0TWV0YWRhdGE+LFxuICAgIG9uRXJyOiBPbkVycixcbiAgICBvcHRpb25zPzogeyBzb3J0YWJsZT86IFNvcnREaXJlY3Rpb247IGlzSG9sZGVyPzogYm9vbGVhbiB9LFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBzb3J0YWJsZSA9ICFvcHRpb25zPy5zb3J0YWJsZVxuICAgICAgPyBTb3J0RGlyZWN0aW9uLkRlc2NcbiAgICAgIDogb3B0aW9ucz8uc29ydGFibGU7XG4gICAgY29uc3QgaXNIb2xkZXIgPSAhb3B0aW9ucz8uaXNIb2xkZXIgPyB0cnVlIDogZmFsc2U7XG4gICAgLy8gSEFDSzogY2hlY2sgcGVyZm9ybWFuY2VcbiAgICBhd2FpdCBTcGxUb2tlbi5nZW5lcmljRmluZEJ5T3duZXIoXG4gICAgICBvd25lcixcbiAgICAgIChyZXN1bHQ6IFJlc3VsdDxuZXZlcltdLCBFcnJvcj4pID0+IHJlc3VsdC5tYXRjaChvbk9rLCBvbkVyciksXG4gICAgICBUb2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlLFxuICAgICAgc29ydGFibGUsXG4gICAgICBpc0hvbGRlcixcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UmVndWxhck5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gYXdhaXQgU3BsVG9rZW4uZ2VuZXJpY0ZpbmRCeU1pbnQobWludCwgVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuXG5pbXBvcnQgeyBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGNyZWF0ZUZyZWV6ZURlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IEF1dGhvcml0eU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBGcmVlemluZyBhIHRhcmdldCBuZnRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUmVzdWx0PFRyYW5zYWN0aW9uLCBFcnJvcj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmcmVlemUgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxBdXRob3JpdHlPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBlZGl0aW9uQWRkcmVzcyA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24obWludCk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24oe1xuICAgICAgICBkZWxlZ2F0ZTogbmV3IEFjY291bnQuS2V5cGFpcih7XG4gICAgICAgICAgc2VjcmV0OiBmcmVlemVBdXRob3JpdHksXG4gICAgICAgIH0pLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQWNjb3VudDogdG9rZW5BY2NvdW50LFxuICAgICAgICBlZGl0aW9uOiBlZGl0aW9uQWRkcmVzcyxcbiAgICAgICAgbWludDogbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBTeXN0ZW1Qcm9ncmFtLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVBcHByb3ZlSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCxcbiAgTUlOVF9TSVpFLFxuICBUT0tFTl9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnksIHVuaXhUaW1lc3RhbXAgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNaW50VHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhLCBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uLFxuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBjcmVhdGVTaWduTWV0YWRhdGFJbnN0cnVjdGlvbixcbiAgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uSXRlbUluc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICBleHBvcnQgY29uc3QgY3JlYXRlVmVyaWZ5Q3JlYXRvciA9IChtaW50OiBQdWJsaWNLZXksIGNyZWF0b3I6IFB1YmxpY0tleSkgPT4ge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gY3JlYXRlU2lnbk1ldGFkYXRhSW5zdHJ1Y3Rpb24oe1xuICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxuICAgICAgY3JlYXRvcjogY3JlYXRvcixcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY3JlYXRlRGVsZWFnYXRlID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGRlbGVnYXRlQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcblxuICAgIHJldHVybiBjcmVhdGVBcHByb3ZlSW5zdHJ1Y3Rpb24oXG4gICAgICB0b2tlbkFjY291bnQsXG4gICAgICBkZWxlZ2F0ZUF1dGhvcml0eSxcbiAgICAgIG93bmVyLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICApO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb24gPSAoXG4gICAgY29sbGVjdGlvbkNoaWxkOiBQdWJsaWNLZXksXG4gICAgY29sbGVjdGlvblBhcmVudDogUHVibGljS2V5LFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKFxuICAgICAgY29sbGVjdGlvblBhcmVudC50b1N0cmluZygpLFxuICAgICk7XG4gICAgY29uc3QgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihcbiAgICAgIGNvbGxlY3Rpb25QYXJlbnQudG9TdHJpbmcoKSxcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb25JdGVtSW5zdHJ1Y3Rpb24oe1xuICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbk1ldGFkYXRhLFxuICAgICAgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50OiBjb2xsZWN0aW9uTWFzdGVyRWRpdGlvbkFjY291bnQsXG4gICAgICBjb2xsZWN0aW9uTWludDogY29sbGVjdGlvblBhcmVudCxcbiAgICAgIG1ldGFkYXRhOiBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShjb2xsZWN0aW9uQ2hpbGQudG9TdHJpbmcoKSksXG4gICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5OiBmZWVQYXllcixcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBuZnRNZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGF0YSA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcbiAgICBjb25zdCB0b2tlbk1ldGFkYXRhUHVia2V5ID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtYXN0ZXJFZGl0aW9uUHVia2V5ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICAgIGxhbXBvcnRzOiBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pLFxuICAgICAgICBzcGFjZTogTUlOVF9TSVpFLFxuICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihtaW50LCAwLCBvd25lciwgb3duZXIpKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKGZlZVBheWVyLCBhdGEsIG93bmVyLCBtaW50KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKG1pbnQsIGF0YSwgb3duZXIsIDEsIDApKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIG1ldGFkYXRhOiB0b2tlbk1ldGFkYXRhUHVia2V5LFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICAgIGRhdGE6IG5mdE1ldGFkYXRhLFxuICAgICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWFzdGVyRWRpdGlvblYzSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlZGl0aW9uOiBtYXN0ZXJFZGl0aW9uUHVia2V5LFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgICAgbWV0YWRhdGE6IHRva2VuTWV0YWRhdGFQdWJrZXksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNYXN0ZXJFZGl0aW9uQXJnczoge1xuICAgICAgICAgICAgbWF4U3VwcGx5OiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnQgYW5kIE5GVCBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAvLyBmaXJzdCBtaW50ZWQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IHNpZ25lciAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7SW5wdXROZnRNZXRhZGF0YX0gaW5wdXRcbiAgICoge1xuICAgKiAgIG5hbWU6IHN0cmluZyAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w6IHN0cmluZyAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGZpbGVQYXRoOiBzdHJpbmcgfCBGaWxlICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgcm95YWx0eTogbnVtYmVyICAgICAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgc3RvcmFnZVR5cGU6ICdhcndlYXZlJ3wnbmZ0U3RvcmFnZScgLy8gRGVjZW50cmFsaXplZCBzdG9yYWdlXG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgY3JlYXRvcnM/OiBJbnB1dENyZWF0b3JzW10gICAgLy8gb3RoZXIgY3JlYXRvcnMgdGhhbiBvd25lclxuICAgKiAgIHVzZXM/OiBVc2VzICAgICAgICAgICAgICAgICAgIC8vIHVzYWdlIGZlYXR1cmU6IGJ1cm4sIHNpbmdsZSwgbXVsdGlwbGVcbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogICBvcHRpb25zPzogW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9ucyAgICAgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uPFB1YmtleT4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXROZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBmZWVQYXllciwgZnJlZXplQXV0aG9yaXR5IH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcblxuICAgICAgLy8gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnRcbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gQ29udmVydGVyLlJveWFsdHkuaW50b0luZnJhKGlucHV0LnJveWFsdHkpO1xuICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgLy8gdXBsb2FkIGZpbGVcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgICAvLyB1cGxvYWRlZCBmaWxlXG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHsgaW1hZ2U6IGlucHV0LnVyaSB9O1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkRGF0YShcbiAgICAgICAgICB7IC4uLnN0b3JhZ2VNZXRhZGF0YSwgLi4uaW1hZ2UgfSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IGlucHV0LmlzTXV0YWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlucHV0LmlzTXV0YWJsZTtcblxuICAgICAgZGVidWdMb2coJyMgaW5wdXQ6ICcsIGlucHV0KTtcbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcblxuICAgICAgY29uc3QgbWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXdhaXQgY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZURlbGVhZ2F0ZShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBjb2xsZWN0aW9uIC0tLVxuICAgICAgaWYgKGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgICAgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgaW5wdXQuY29sbGVjdGlvbi50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleXBhaXJzID0gW3NpZ25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV07XG5cbiAgICAgIC8vIGNyZWF0b3IgLS0tXG4gICAgICBpZiAoaW5wdXQuY3JlYXRvcnMpIHtcbiAgICAgICAgaW5wdXQuY3JlYXRvcnMuZm9yRWFjaCgoY3JlYXRvcikgPT4ge1xuICAgICAgICAgIGlmIChBY2NvdW50LktleXBhaXIuaXNTZWNyZXQoY3JlYXRvci5zZWNyZXQpKSB7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9yUHVia2V5ID0gY3JlYXRvci5hZGRyZXNzLnRvUHVibGljS2V5KCk7XG4gICAgICAgICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVmVyaWZ5Q3JlYXRvcihtaW50LnRvUHVibGljS2V5KCksIGNyZWF0b3JQdWJrZXkpO1xuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goaW5zdCk7XG4gICAgICAgICAgICBrZXlwYWlycy5wdXNoKGNyZWF0b3Iuc2VjcmV0LnRvS2V5cGFpcigpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1pbnRUcmFuc2FjdGlvbihcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG1pbnQucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnksIHVuaXhUaW1lc3RhbXAgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBHYXNMZXNzTWludE9wdGlvbnMsIElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25UcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICd+L3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgTkZUIG1pbnQgd2l0aCBQYXJ0aWFsIFNpZ25cbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgIC8vIGZpcnN0IG1pbnRlZCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gc2lnbmVyICAgICAgICAgLy8gb3duZXIncyBTZWNyZXRcbiAgICogQHBhcmFtIHtVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhfSBpbnB1dFxuICAgKiB7XG4gICAqICAgbmFtZTogc3RyaW5nICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbDogc3RyaW5nICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZmlsZVBhdGg6IHN0cmluZyB8IEZpbGUgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBkZXNjcmlwdGlvbj86IHN0cmluZyAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIGV4dGVybmFsX3VybD86IHN0cmluZyAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzogTWV0YWRhdGFBdHRyaWJ1dGVbXSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IE1ldGFkYXRhUHJvcGVydGllczxVcmk+IC8vIGluY2x1ZGUgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogUHVia2V5ICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddPzogdW5rbm93biAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogICBjcmVhdG9ycz86IElucHV0Q3JlYXRvcnNbXSAgICAgICAgICAvLyBvdGhlciBjcmVhdG9ycyB0aGFuIG93bmVyXG4gICAqICAgdXNlcz86IFVzZXMgICAgICAgICAgICAgICAgICAgLy8gdXNhZ2UgZmVhdHVyZTogYnVybiwgc2luZ2xlLCBtdWx0aXBsZVxuICAgKiAgIGlzTXV0YWJsZT86IGJvb2xlYW4gICAgICAgICAgIC8vIGVuYWJsZSB1cGRhdGUoKVxuICAgKiB9XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllciAgICAgICAgLy8gZmVlIHBheWVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxHYXNMZXNzTWludE9wdGlvbnM+fSBvcHRpb25zICAgICAgICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzTWludCA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIGZlZVBheWVyOiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxHYXNMZXNzTWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduVHJhbnNhY3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXROZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSBDb252ZXJ0ZXIuUm95YWx0eS5pbnRvSW5mcmEoaW5wdXQucm95YWx0eSk7XG5cbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuICAgICAgbGV0IHVyaSA9ICcnO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgICAgeyAuLi5pbnB1dCwgcHJvcGVydGllcyB9LFxuICAgICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICApO1xuXG4gICAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICB1cmkgPSBpbnB1dC51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgbGV0IGRhdGF2MiA9IENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG4gICAgICBsZXQgY29sbGVjdGlvbjtcbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uICYmIGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbiA9IENvbnZlcnRlci5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKTtcbiAgICAgICAgZGF0YXYyID0geyAuLi5kYXRhdjIsIGNvbGxlY3Rpb24gfTtcbiAgICAgIH1cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IGlucHV0LmlzTXV0YWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlucHV0LmlzTXV0YWJsZTtcblxuICAgICAgZGVidWdMb2coJyMgaW5wdXQ6ICcsIGlucHV0KTtcbiAgICAgIGRlYnVnTG9nKCcjIHNlbGxlckZlZUJhc2lzUG9pbnRzOiAnLCBzZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IE1pbnQuY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKG9wdGlvbnMuZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgTWludC5jcmVhdGVEZWxlYWdhdGUoXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3B0aW9ucy5mcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICBpbnN0cy5mb3JFYWNoKChpbnN0KSA9PiB0eC5hZGQoaW5zdCkpO1xuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIFtzaWduZXIsIG1pbnRdLmZvckVhY2goKHNpZ25lcikgPT4gdHgucGFydGlhbFNpZ24oc2lnbmVyLnRvS2V5cGFpcigpKSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25UcmFuc2FjdGlvbihoZXgsIG1pbnQucHVia2V5KTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25UcmFuc2FjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFNwbFRva2VuLmdhc0xlc3NUcmFuc2ZlcihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIGRlc3QsXG4gICAgICBzaWduZXJzLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICAgIE5GVF9ERUNJTUFMUyxcbiAgICAgIGZlZVBheWVyLFxuICAgICk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlU2V0Q29sbGVjdGlvblNpemVJbnN0cnVjdGlvbiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnksIHVuaXhUaW1lc3RhbXAgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgTWludFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IE1pbnRDb2xsZWN0aW9uT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG4vKipcbiAqIGNyZWF0ZSBhIGNvbGxlY3Rpb25cbiAqIFRoaXMgZnVuY3Rpb24gbmVlZHMgb25seSAxIGNhbGxcbiAqXG4gKiBAcGFyYW0ge2ZlZVBheWVyfSBTZWNyZXRcbiAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09MTEVDVElPTl9TSVpFID0gMDtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG4gIGV4cG9ydCBjb25zdCBtaW50Q29sbGVjdGlvbiA9IChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludENvbGxlY3Rpb25PcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50VHJhbnNhY3Rpb248UHVia2V5PiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dE5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZnJlZXplQXV0aG9yaXR5LCBmZWVQYXllciwgY29sbGVjdGlvblNpemUgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBzaWduZXI7XG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgfTtcbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuXG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShpbnB1dCwgMCk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHsgaW1hZ2U6IGlucHV0LnVyaSB9O1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkRGF0YShcbiAgICAgICAgICB7IC4uLnN0b3JhZ2VNZXRhZGF0YSwgLi4uaW1hZ2UgfSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5SZWd1bGFyTmZ0TWV0YWRhdGEuaW50b0luZnJhKGlucHV0LCB1cmksIDApO1xuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgY29sbGVjdGlvbk1ldGFkYXRhQWNjb3VudCA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKFxuICAgICAgICBjb2xsZWN0aW9uTWludC5wdWJrZXksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhd2FpdCBNaW50LmNyZWF0ZU1pbnQoXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChmcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgICAgTWludC5jcmVhdGVEZWxlYWdhdGUoXG4gICAgICAgICAgICBjb2xsZWN0aW9uTWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0ge1xuICAgICAgICBjb2xsZWN0aW9uTWV0YWRhdGE6IGNvbGxlY3Rpb25NZXRhZGF0YUFjY291bnQsXG4gICAgICAgIGNvbGxlY3Rpb25BdXRob3JpdHk6IHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IGNvbGxlY3Rpb25NaW50LnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgIH07XG5cbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICBjcmVhdGVTZXRDb2xsZWN0aW9uU2l6ZUluc3RydWN0aW9uKGNvbGxlY3Rpb25zLCB7XG4gICAgICAgICAgc2V0Q29sbGVjdGlvblNpemVBcmdzOiB7XG4gICAgICAgICAgICBzaXplOiBjb2xsZWN0aW9uU2l6ZSB8fCBERUZBVUxUX0NPTExFQ1RJT05fU0laRSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgTWludFRyYW5zYWN0aW9uKFxuICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgIFtzaWduZXIudG9LZXlwYWlyKCksIGNvbGxlY3Rpb25NaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIGNvbGxlY3Rpb25NaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQXV0aG9yaXR5T3B0aW9ucyB9IGZyb20gJy4uLy4uL3R5cGVzL3NyYy9zaGFyZWQvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgLyoqXG4gICAqIFRoYXdpbmcgYSB0YXJnZXQgTkZUXG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge0F1dGhvcml0eU9wdGlvbnN9IG9wdGlvbnMgICAgICAgICAgLy8gb3B0aW9uc1xuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRoYXcgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxBdXRob3JpdHlPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBlZGl0aW9uQWRkcmVzcyA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24obWludCk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUaGF3RGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uKHtcbiAgICAgICAgZGVsZWdhdGU6IG5ldyBBY2NvdW50LktleXBhaXIoe1xuICAgICAgICAgIHNlY3JldDogZnJlZXplQXV0aG9yaXR5LFxuICAgICAgICB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFjY291bnQ6IHRva2VuQWNjb3VudCxcbiAgICAgICAgZWRpdGlvbjogZWRpdGlvbkFkZHJlc3MsXG4gICAgICAgIG1pbnQ6IG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFNwbFRva2VuIH0gZnJvbSAnfi9zdWl0ZS1zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IEF1dGhvcml0eU9wdGlvbnMgfSBmcm9tICcuLi8uLi90eXBlcy9zcmMvc2hhcmVkL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgb3B0aW9uczogUGFydGlhbDxBdXRob3JpdHlPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFNwbFRva2VuLnRyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIHNpZ25lcnMsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICAgTkZUX0RFQ0lNQUxTLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFBQUE7QUFBQSxFQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxJQUFBQyxvQkFBK0M7OztBQ0EvQyxrQkFBc0M7QUFDdEMsa0JBQTZCO0FBRTdCLElBQUksU0FBUyxZQUFBQztBQUVOLElBQVU7QUFBQSxDQUFWLENBQVVDLGVBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMs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QVEsUUFBUTtBQUFBLFVBQzVCLFFBQVE7QUFBQSxRQUNWLENBQUMsRUFBRSxZQUFZO0FBQUEsUUFDZjtBQUFBLFFBQ0EsU0FBUztBQUFBLFFBQ1QsTUFBTSxLQUFLLFlBQVk7QUFBQSxNQUN6QixDQUFDO0FBQ0QsYUFBTyxJQUFJO0FBQUEsUUFDVCxDQUFDLElBQUk7QUFBQSxRQUNMLENBQUMsZ0JBQWdCLFVBQVUsQ0FBQztBQUFBLFFBQzVCLE1BQU0sVUFBVTtBQUFBLE1BQ2xCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEdBdENlQSw4QkFBQTs7O0FDRlYsSUFBVUM7QUFBQSxDQUFWLENBQVVBLGlCQUFWO0FBQ0wsUUFBTSxhQUFhO0FBQ25CLFFBQU0sZUFBZTtBQUVkLEVBQU1BLGFBQUEsV0FBVyxDQUN0QixNQUNBLE9BQ0EsTUFDQSxTQUNBLFVBQXFDLENBQUMsTUFDRTtBQUN4QyxXQUFPQyxXQUFTO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsR0FwQmVELDhCQUFBOzs7QXJETVYsSUFBTUUsZUFBYTtBQUFBLEVBQ3hCLEdBQUc7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUNMOyIsCiAgIm5hbWVzIjogWyJSZWd1bGFyTmZ0IiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU29sYW5hSnNvbkNvbmZpZyIsICJDb25zdGFudHMiLCAiV2Fybm5pbmdNZXNzYWdlIiwgIkNsdXN0ZXIiLCAiRW5kUG9pbnRVcmwiLCAiQnVuZGxyVXJsIiwgIkRhc0FwaVVybCIsICJOZnRzdG9yYWdlQXBpS2V5IiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAidXJscyIsICJpbmRleCIsICJSZXN1bHQiLCAiaW1wb3J0X3dlYjMiLCAiTm9kZSIsICJpbXBvcnRfd2ViMyIsICJUeCIsICJpbXBvcnRfd2ViMyIsICJUeCIsICJpbXBvcnRfd2ViMyIsICJUeCIsICJpbXBvcnRfd2ViMyIsICJUeCIsICJpbXBvcnRfd2ViMyIsICJicyIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfYnM1OCIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiYnMiLCAiT3JpZ2luYWwiLCAiQWNjb3VudCIsICJBc3NvY2lhdGVkIiwgImltcG9ydF93ZWIzIiwgIkFjY291bnQiLCAiUGRhIiwgIkJOIiwgIkFjY291bnQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29sbGVjdGlvbk1pbnQiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnZlcnRlciIsICJSb3lhbHR5IiwgIkNvbnZlcnRlciIsICJDb21wcmVzc2VkTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb25EZXRhaWxzIiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJSZWd1bGFyTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlByb3BlcnRpZXMiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXIiLCAiQ29udmVydGVyIiwgIlZhbGlkYXRvciIsICJNZXNzYWdlIiwgIkNvbnZlcnRlciIsICJGaWx0ZXJUeXBlIiwgIk1vZHVsZU5hbWUiLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiQ29udmVydGVyIiwgImZldGNoIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfd2ViMyIsICJTcGxUb2tlbiIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUHJvdmVuYW5jZUxheWVyIiwgInVwbG9hZEZpbGUiLCAiSXJ5cyIsICJBcndlYXZlIiwgIk5mdFN0b3JhZ2UiLCAiU3RvcmFnZSIsICJTcGxUb2tlbiIsICJtaW50IiwgIkNvbnZlcnRlciIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiUmVndWxhck5mdCIsICJTcGxUb2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIlJlZ3VsYXJOZnQiLCAibWludCIsICJDb252ZXJ0ZXIiLCAiaW1wb3J0X3dlYjMiLCAiUmVndWxhck5mdCIsICJDb252ZXJ0ZXIiLCAic2lnbmVyIiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJSZWd1bGFyTmZ0IiwgIkNvbnZlcnRlciIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUmVndWxhck5mdCIsICJSZWd1bGFyTmZ0IiwgIlNwbFRva2VuIiwgIlJlZ3VsYXJOZnQiXQp9Cg==