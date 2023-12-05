// ../suite-spl-token/src/add.ts
import { createMintToCheckedInstruction } from "@solana/spl-token";

// ../shared/src/constants.ts
import { PublicKey } from "@solana/web3.js";
import SolanaJsonConfig from "@solana-suite/config/load";
var Config = SolanaJsonConfig;
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
  Constants2.WRAPPED_TOKEN_PROGRAM_ID = new PublicKey(
    "So11111111111111111111111111111111111111112"
  );
  Constants2.MEMO_PROGRAM_ID = new PublicKey(
    "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"
  );
  Constants2.METAPLEX_PROGRAM_ID = new PublicKey(
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
import { Connection } from "@solana/web3.js";
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
    return new Connection(setted.clusterUrl, setted.commitment);
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
import {
  sendAndConfirmTransaction,
  Transaction as Tx
} from "@solana/web3.js";

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
    const transaction = new Tx();
    let finalSigners = signers;
    if (feePayer) {
      transaction.feePayer = feePayer.publicKey;
      finalSigners = [feePayer, ...signers];
    }
    instructions.map((inst) => transaction.add(inst));
    const options = {
      maxRetries: MAX_RETRIES
    };
    return await sendAndConfirmTransaction(
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
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction2,
  Transaction as Tx2
} from "@solana/web3.js";
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
      const transaction = new Tx2();
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
      return await sendAndConfirmTransaction2(
        Node.getConnection(),
        transaction,
        finalSigners,
        options
      );
    });
  };
};

// ../transaction/src/mint.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction3,
  Transaction as Tx3
} from "@solana/web3.js";
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
      const transaction = new Tx3();
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
      return await sendAndConfirmTransaction3(
        Node.getConnection(),
        transaction,
        finalSigners,
        options
      );
    });
  };
};

// ../transaction/src/partial-sign.ts
import {
  Transaction as Tx4
} from "@solana/web3.js";
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
      const transactionFromJson = Tx4.from(decode);
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
import { Keypair as Keypair3, LAMPORTS_PER_SOL, PublicKey as PublicKey2 } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import bs from "bs58";
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
  return new PublicKey2(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs.decode(this.toString());
  return Keypair3.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return BigNumber(this).div(LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return BigNumber(this).times(LAMPORTS_PER_SOL).toNumber();
};

// ../account/src/associated.ts
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError
} from "@solana/spl-token";

// ../account/src/keypair.ts
import { Keypair as Original, PublicKey as PublicKey3 } from "@solana/web3.js";
import bs2 from "bs58";
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
      return new PublicKey3(this.pubkey);
    }
    toKeypair() {
      const decoded = bs2.decode(this.secret);
      return Original.fromSecretKey(decoded);
    }
    static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
    static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
    static create = () => {
      const keypair = Original.generate();
      return new Keypair4({
        pubkey: keypair.publicKey.toString(),
        secret: bs2.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair4({
        pubkey: keypair.publicKey.toString(),
        secret: bs2.encode(keypair.secretKey)
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
      const associatedTokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
        allowOwnerOffCurve,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
      debugLog("# associatedTokenAccount: ", associatedTokenAccount.toString());
      try {
        await getAccount(
          Node.getConnection(),
          associatedTokenAccount,
          Node.getConnection().commitment,
          TOKEN_PROGRAM_ID
        );
        return {
          tokenAccount: associatedTokenAccount.toString(),
          inst: void 0
        };
      } catch (error) {
        if (!(error instanceof TokenAccountNotFoundError) && !(error instanceof TokenInvalidAccountOwnerError)) {
          throw Error("Unexpected error");
        }
        const payer = !feePayer ? owner : feePayer;
        const inst = createAssociatedTokenAccountInstruction(
          payer.toPublicKey(),
          associatedTokenAccount,
          owner.toPublicKey(),
          mint.toPublicKey(),
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
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
import { PublicKey as PublicKey4 } from "@solana/web3.js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { MPL_BUBBLEGUM_PROGRAM_ID } from "@metaplex-foundation/mpl-bubblegum";
import BN from "bn.js";
var Account4;
((Account5) => {
  let Pda;
  ((Pda2) => {
    Pda2.getMetadata = (address) => {
      const [publicKey] = PublicKey4.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          address.toPublicKey().toBuffer()
        ],
        PROGRAM_ID
      );
      return publicKey;
    };
    Pda2.getMasterEdition = (address) => {
      const [publicKey] = PublicKey4.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          address.toPublicKey().toBuffer(),
          Buffer.from("edition")
        ],
        PROGRAM_ID
      );
      return publicKey;
    };
    Pda2.getTreeAuthority = (address) => {
      const [publicKey] = PublicKey4.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = PublicKey4.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getAssetId = (address, leafIndex) => {
      const node = new BN.BN(leafIndex);
      const [assetId] = PublicKey4.findProgramAddressSync(
        [
          Buffer.from("asset", "utf8"),
          address.toPublicKey().toBuffer(),
          Uint8Array.from(node.toArray("le", 8))
        ],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
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
import {
  TokenProgramVersion,
  TokenStandard
} from "mpl-bubblegum-instruction";
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
        tokenStandard: TokenStandard.NonFungible,
        tokenProgramVersion: TokenProgramVersion.Original
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
      const inst = createMintToCheckedInstruction(
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
import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync2
} from "@solana/spl-token";
var SplToken3;
((SplToken11) => {
  SplToken11.burn = (mint, owner, signers, burnAmount, tokenDecimals, options = {}) => {
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync2(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = options.feePayer ? options.feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const inst = createBurnCheckedInstruction(
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
import {
  Metadata,
  TokenStandard as TokenStandard2
} from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID2 } from "@solana/spl-token";
import fetch from "cross-fetch";
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
    if (tokenStandard === TokenStandard2.Fungible) {
      return Converter14.TokenMetadata.intoUser(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else if (tokenStandard === TokenStandard2.NonFungible) {
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
          programId: TOKEN_PROGRAM_ID2
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
          const metadata = await Metadata.fromAccountAddress(
            connection,
            Account.Pda.getMetadata(mint)
          );
          debugLog("# findByOwner metadata: ", metadata);
          if (metadata.tokenStandard !== tokenStandard) {
            continue;
          }
          fetch(metadata.data.uri).then((response) => {
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
      const metadata = await Metadata.fromAccountAddress(
        connection,
        Account.Pda.getMetadata(mint)
      );
      debugLog("# findByMint metadata: ", metadata);
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error("token standards are different");
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data).parsed.info.supply;
      const response = await (await fetch(metadata.data.uri)).json();
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
      TokenStandard2.Fungible,
      sortable,
      isHolder
    );
  };
  SplToken11.findByMint = async (mint) => {
    return await (0, SplToken11.genericFindByMint)(mint, TokenStandard2.Fungible);
  };
})(SplToken4 || (SplToken4 = {}));

// ../suite-spl-token/src/freeze.ts
import {
  createFreezeAccountInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync3
} from "@solana/spl-token";
var SplToken5;
((SplToken11) => {
  SplToken11.freeze = (mint, owner, freezeAuthority, options = {}) => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = getAssociatedTokenAddressSync3(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = createFreezeAccountInstruction(
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
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { Transaction as Transaction2 } from "@solana/web3.js";
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
      const tx = new Transaction2({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      if (!destToken.inst) {
        inst2 = createTransferCheckedInstruction(
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
        inst2 = createTransferCheckedInstruction(
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
import {
  SystemProgram
} from "@solana/web3.js";
import {
  AuthorityType,
  createAssociatedTokenAccountInstruction as createAssociatedTokenAccountInstruction2,
  createInitializeMintInstruction,
  createMintToCheckedInstruction as createMintToCheckedInstruction2,
  createSetAuthorityInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync4,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID3
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction
} from "@metaplex-foundation/mpl-token-metadata";

// ../storage/src/provenance-layer.ts
import Irys, { WebIrys } from "@irys/sdk";
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
    const irys = new Irys({
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
    const webIrys = new WebIrys({ url, token, wallet });
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
import { Blob, NFTStorage } from "nft.storage";
var NftStorage;
((NftStorage2) => {
  const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
  const connect = () => {
    Constants.WarnningMessage.calculateProbability() && console.warn(Constants.WarnningMessage.NFT_STORAGE_API_KEY);
    return new NFTStorage({ token: Constants.NFT_STORAGE_API_KEY });
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
      const blobImage = new Blob([file]);
      const res = await connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    });
  };
  NftStorage2.uploadData = async (storageData) => {
    return Try(async () => {
      debugLog("# upload metadata: ", storageData);
      const blobJson = new Blob([JSON.stringify(storageData)]);
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
    return createSetAuthorityInstruction(
      mint2,
      owner,
      AuthorityType.FreezeAccount,
      freezeAuthority
    );
  };
  SplToken11.createMint = async (mint2, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => {
    const connection = Node.getConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const metadataPda = Account.Pda.getMetadata(mint2.toString());
    const tokenAssociated = getAssociatedTokenAddressSync4(mint2, owner);
    const instructions = [];
    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: mint2,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID3
      })
    );
    instructions.push(
      createInitializeMintInstruction(
        mint2,
        mintDecimal,
        owner,
        owner,
        TOKEN_PROGRAM_ID3
      )
    );
    instructions.push(
      createAssociatedTokenAccountInstruction2(
        feePayer,
        tokenAssociated,
        owner,
        mint2
      )
    );
    instructions.push(
      createMintToCheckedInstruction2(
        mint2,
        tokenAssociated,
        owner,
        SplToken.calculateAmount(totalAmount, mintDecimal),
        mintDecimal
      )
    );
    instructions.push(
      createCreateMetadataAccountV3Instruction(
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
import {
  createThawAccountInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync5
} from "@solana/spl-token";
var SplToken8;
((SplToken11) => {
  SplToken11.thaw = (mint, owner, freezeAuthority, options = {}) => {
    const payer = options.feePayer ? options.feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync5(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = createThawAccountInstruction(
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
import { createTransferCheckedInstruction as createTransferCheckedInstruction2 } from "@solana/spl-token";
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
      const inst = createTransferCheckedInstruction2(
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
import { TokenStandard as TokenStandard3 } from "@metaplex-foundation/mpl-token-metadata";
var RegularNft2;
((RegularNft11) => {
  RegularNft11.findByOwner = async (owner, onOk, onErr, options) => {
    const sortable = !options?.sortable ? "desc" /* Desc */ : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    await SplToken10.genericFindByOwner(
      owner,
      (result) => result.match(onOk, onErr),
      TokenStandard3.NonFungible,
      sortable,
      isHolder
    );
  };
  RegularNft11.findByMint = async (mint) => {
    return await SplToken10.genericFindByMint(mint, TokenStandard3.NonFungible);
  };
})(RegularNft2 || (RegularNft2 = {}));

// src/freeze.ts
import { getAssociatedTokenAddressSync as getAssociatedTokenAddressSync6 } from "@solana/spl-token";
import { createFreezeDelegatedAccountInstruction } from "@metaplex-foundation/mpl-token-metadata";
var RegularNft3;
((RegularNft11) => {
  RegularNft11.freeze = (mint, owner, freezeAuthority, options = {}) => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = getAssociatedTokenAddressSync6(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = Account.Pda.getMasterEdition(mint);
      const inst = createFreezeDelegatedAccountInstruction({
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
import {
  SystemProgram as SystemProgram2
} from "@solana/web3.js";
import {
  createApproveInstruction,
  createAssociatedTokenAccountInstruction as createAssociatedTokenAccountInstruction3,
  createInitializeMintInstruction as createInitializeMintInstruction2,
  createMintToCheckedInstruction as createMintToCheckedInstruction3,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync7,
  getMinimumBalanceForRentExemptMint as getMinimumBalanceForRentExemptMint2,
  MINT_SIZE as MINT_SIZE2,
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID4
} from "@solana/spl-token";
import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction as createCreateMetadataAccountV3Instruction2,
  createSignMetadataInstruction,
  createVerifySizedCollectionItemInstruction
} from "@metaplex-foundation/mpl-token-metadata";
var RegularNft4;
((RegularNft11) => {
  const NFT_AMOUNT = 1;
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  RegularNft11.createVerifyCreator = (mint2, creator) => {
    const metadata = Account.Pda.getMetadata(mint2.toString());
    return createSignMetadataInstruction({
      metadata,
      creator
    });
  };
  RegularNft11.createDeleagate = (mint2, owner, delegateAuthority) => {
    const tokenAccount = getAssociatedTokenAddressSync7(mint2, owner);
    return createApproveInstruction(
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
    return createVerifySizedCollectionItemInstruction({
      collection: collectionMetadata,
      collectionMasterEditionAccount,
      collectionMint: collectionParent,
      metadata: Account.Pda.getMetadata(collectionChild.toString()),
      payer: feePayer,
      collectionAuthority: feePayer
    });
  };
  RegularNft11.createMint = async (mint2, owner, nftMetadata, feePayer, isMutable) => {
    const ata = getAssociatedTokenAddressSync7(mint2, owner);
    const tokenMetadataPubkey = Account.Pda.getMetadata(mint2.toString());
    const masterEditionPubkey = Account.Pda.getMasterEdition(mint2.toString());
    const connection = Node.getConnection();
    const instructions = [];
    instructions.push(
      SystemProgram2.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: mint2,
        lamports: await getMinimumBalanceForRentExemptMint2(connection),
        space: MINT_SIZE2,
        programId: TOKEN_PROGRAM_ID4
      })
    );
    instructions.push(createInitializeMintInstruction2(mint2, 0, owner, owner));
    instructions.push(
      createAssociatedTokenAccountInstruction3(feePayer, ata, owner, mint2)
    );
    instructions.push(createMintToCheckedInstruction3(mint2, ata, owner, 1, 0));
    instructions.push(
      createCreateMetadataAccountV3Instruction2(
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
      createCreateMasterEditionV3Instruction(
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
import { Transaction as Transaction3 } from "@solana/web3.js";
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
      const tx = new Transaction3({
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
import { createSetCollectionSizeInstruction } from "@metaplex-foundation/mpl-token-metadata";
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
        createSetCollectionSizeInstruction(collections, {
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
import { getAssociatedTokenAddressSync as getAssociatedTokenAddressSync8 } from "@solana/spl-token";
import { createThawDelegatedAccountInstruction } from "@metaplex-foundation/mpl-token-metadata";
var RegularNft8;
((RegularNft11) => {
  RegularNft11.thaw = (mint, owner, freezeAuthority, options = {}) => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = getAssociatedTokenAddressSync8(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = Account.Pda.getMasterEdition(mint);
      const inst = createThawDelegatedAccountInstruction({
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
export {
  Account,
  FilterOptions,
  FilterType,
  ModuleName,
  Node,
  RegularNft10 as RegularNft,
  Validator,
  ValidatorError
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9hZGQudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9yZXN1bHQudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9zaGFyZWQudHMiLCAiLi4vLi4vbm9kZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24vc3JjL2JhdGNoLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uL3NyYy9kZWZpbmUudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24vc3JjL2NvbW1vbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi9zcmMvbWludC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi9zcmMvcGFydGlhbC1zaWduLnRzIiwgIi4uLy4uL2dsb2JhbC9zcmMvaW5kZXgudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvYXNzb2NpYXRlZC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9rZXlwYWlyLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL3BkYS50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9pbmRleC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jcmVhdG9ycy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3JveWFsdHkudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jb21wcmVzc2VkLW5mdC1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21lbW8udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29sbGVjdGlvbi1kZXRhaWxzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdXNlcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Rva2VuLW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcmVndWxhci1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9wcm9wZXJ0aWVzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXItY2hlY2tlZC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdmFsaWRhdG9yL3NyYy9pbmRleC50cyIsICIuLi8uLi90eXBlcy9zcmMvdHJhbnNhY3Rpb24tZmlsdGVyL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvY2FsY3VsYXRlLWFtb3VudC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2J1cm4udHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9maW5kLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZnJlZXplLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZ2FzLWxlc3MtdHJhbnNmZXIudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9taW50LnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL3Byb3ZlbmFuY2UtbGF5ZXIudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvYXJ3ZWF2ZS50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9uZnQtc3RvcmFnZS50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9zdG9yYWdlLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvdGhhdy50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvaW5kZXgudHMiLCAiLi4vc3JjL2J1cm4udHMiLCAiLi4vc3JjL2ZpbmQudHMiLCAiLi4vc3JjL2ZyZWV6ZS50cyIsICIuLi9zcmMvbWludC50cyIsICIuLi9zcmMvZ2FzLWxlc3MtbWludC50cyIsICIuLi9zcmMvZ2FzLWxlc3MtdHJhbnNmZXIudHMiLCAiLi4vc3JjL21pbnQtY29sbGVjdGlvbi50cyIsICIuLi9zcmMvdGhhdy50cyIsICIuLi9zcmMvdHJhbnNmZXIudHMiLCAiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBBdXRob3JpdHlPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGFkZCA9IGFzeW5jIChcbiAgICB0b2tlbjogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QXV0aG9yaXR5T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IHNpZ25lcnNbMF07XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudCh0b3RhbEFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKFtpbnN0XSwga2V5cGFpcnMsIHBheWVyLnRvS2V5cGFpcigpLCB0b2tlbik7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBTb2xhbmFKc29uQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnO1xuXG5sZXQgQ29uZmlnID0gU29sYW5hSnNvbkNvbmZpZztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgbmFtZXNwYWNlIFdhcm5uaW5nTWVzc2FnZSB7XG4gICAgY29uc3QgVEhSRVNISE9MRCA9IDU7XG4gICAgbGV0IGlzRGlzcGxheSA9IGZhbHNlO1xuICAgIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gYFxuICAgICAgICBbV2FybmluZ11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgWW91IG5lZWQgdG8gdXBkYXRlIG5mdFN0b3JhZ2VBcGlLZXkgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgQ2FuIGdldCBhcGkga2V5IGZyb20gaHR0cHM6Ly9uZnQuc3RvcmFnZS9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgYDtcbiAgICBleHBvcnQgY29uc3QgREFTX0FQSV9VUkwgPSBgXG4gICAgICAgIFtXYXJuaW5nXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgZGFzQXBpVXJsIGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpIHVybCBmcm9tIGh0dHBzOi8vd3d3LmhlbGl1cy5kZXYvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuICAgICAgICBgO1xuXG4gICAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVByb2JhYmlsaXR5ID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgY29uc3QgcmFuZG9tVmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3QgcHJvYmFiaWxpdHkgPSAxIC8gVEhSRVNISE9MRDtcbiAgICAgIGlmICghaXNEaXNwbGF5ICYmIHJhbmRvbVZhbHVlIDwgcHJvYmFiaWxpdHkpIHtcbiAgICAgICAgaXNEaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBjb25zdCBjdXJyZW50Q2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGV4cG9ydCBjb25zdCBjdXN0b21DbHVzdGVyVXJsID0gQ29uZmlnLmNsdXN0ZXIuY3VzdG9tQ2x1c3RlclVybDtcbiAgZXhwb3J0IGNvbnN0IGlzRGVidWdnaW5nID0gQ29uZmlnLmRlYnVnZ2luZztcbiAgZXhwb3J0IGNvbnN0IG5mdFN0b3JhZ2VBcGlLZXkgPSBDb25maWcubmZ0U3RvcmFnZUFwaUtleTtcbiAgZXhwb3J0IGNvbnN0IGRhc0FwaVVybCA9IENvbmZpZy5kYXNBcGlVcmw7XG5cbiAgZXhwb3J0IGVudW0gQ2x1c3RlciB7XG4gICAgcHJkID0gJ21haW5uZXQtYmV0YScsXG4gICAgcHJkTWV0YXBsZXggPSAnbWFpbm5ldC1iZXRhLW1ldGFwbGV4JyxcbiAgICBkZXYgPSAnZGV2bmV0JyxcbiAgICB0ZXN0ID0gJ3Rlc3RuZXQnLFxuICAgIGxvY2FsaG9zdCA9ICdsb2NhbGhvc3QtZGV2bmV0JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEVuZFBvaW50VXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9hcGkubWFpbm5ldC1iZXRhLnNvbGFuYS5jb20nLFxuICAgIHByZE1ldGFwbGV4ID0gJ2h0dHBzOi8vYXBpLm1ldGFwbGV4LnNvbGFuYS5jb20nLFxuICAgIGRldiA9ICdodHRwczovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gICAgdGVzdCA9ICdodHRwczovL2FwaS50ZXN0bmV0LnNvbGFuYS5jb20nLFxuICAgIGxvY2FsaG9zdCA9ICdodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEJ1bmRsclVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbm9kZTEuaXJ5cy54eXosaHR0cHM6Ly9ub2RlMi5pcnlzLnh5eicsXG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmlyeXMueHl6JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIERhc0FwaVVybCB7XG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmhlbGl1cy1ycGMuY29tLz9hcGkta2V5PTE1MzE5YmY0LTViNDAtNDk1OC1hYzhkLTYzMTNhYTU1ZWI5MixodHRwczovL3JwYy1kZXZuZXQuaGVsaXVzLnh5ej9hcGkta2V5PTlmNzBhODQzLTMyNzQtNGZmZC1hMGE5LTMyM2Y4YjdjMDYzOScsXG4gIH1cblxuICBleHBvcnQgZW51bSBOZnRzdG9yYWdlQXBpS2V5IHtcbiAgICBkZXYgPSAnZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKa2FXUTZaWFJvY2pvd2VFUkdNamN5TjJWa09EWmhSR1UxUlRNeVpEWkRaRUpsT0RjMFl6UkZORGxFT0RZMU9XWm1PRU1pTENKcGMzTWlPaUp1Wm5RdGMzUnZjbUZuWlNJc0ltbGhkQ0k2TVRZeU1ESTJORGswTXpjd05pd2libUZ0WlNJNkltUmxiVzhpZlEuZDRKNzBtaWt4UkI4YTV2d051NlNPNUhEQThKYXVldXNlQWo3UV95dE1DRScsXG4gIH1cblxuICBleHBvcnQgY29uc3QgbG9hZENvbmZpZyA9IGFzeW5jICgpID0+IHtcbiAgICBDb25maWcgPSBhd2FpdCBpbXBvcnQoJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQ2x1c3RlciA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB7IGNsdXN0ZXI6IGVudiwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG5cbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIHVybCwgbW9zdCBwcmlvcml0eVxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsICYmIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGg7XG4gICAgICByZXR1cm4gY3VzdG9tQ2x1c3RlclVybFtpbmRleF07XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXg6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkTWV0YXBsZXg7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnRlc3Q6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwubG9jYWxob3N0O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQnVuZGxyID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuQnVuZGxyVXJsLmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaERhc0FwaSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICBpZiAoZGFzQXBpVXJsLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkRBU19BUElfVVJMKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5EYXNBcGlVcmwuZGV2LnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hOZnRTdG9yYWdlID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIGlmICghbmZ0U3RvcmFnZUFwaUtleSkge1xuICAgICAgICAgIHRocm93IEVycm9yKFdhcm5uaW5nTWVzc2FnZS5ORlRfU1RPUkFHRV9BUElfS0VZKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmZ0U3RvcmFnZUFwaUtleTtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5OZnRzdG9yYWdlQXBpS2V5LmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IFdSQVBQRURfVE9LRU5fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ1NvMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTInLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVNT19QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnTWVtbzFVaGtKUmZIeXZMTWNWdWNKd3hYZXVENzI4RXFWRER3UUR4Rk1ObycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRVRBUExFWF9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnbWV0YXFieHhVZXJkcTI4Y2oxUmJBV2tZUW0zeWJ6amI2YThidDUxOHgxcycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBDT01NSVRNRU5UOiBDb21taXRtZW50ID0gJ2NvbmZpcm1lZCc7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9HQVRFV0FZX1VSTCA9ICdodHRwczovL2lwZnMuaW8vaXBmcyc7XG4gIGV4cG9ydCBjb25zdCBJUllTX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vZ2F0ZXdheS5pcnlzLnh5eic7XG4gIGV4cG9ydCBjb25zdCBCVU5ETFJfTkVUV09SS19VUkwgPSBzd2l0Y2hCdW5kbHIoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IHN3aXRjaERhc0FwaShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPSBzd2l0Y2hOZnRTdG9yYWdlKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MU0NBTl9VUkwgPSAnaHR0cHM6Ly9zb2xzY2FuLmlvJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTEFOQUZNX1VSTCA9ICdodHRwczovL3NvbGFuYS5mbSc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9YUkFZX1VSTCA9ICdodHRwczovL3hyYXkuaGVsaXVzLnh5eic7XG59XG4iLCAiLy8gZm9ya2VkOiBodHRwczovL2dpdGh1Yi5jb20vYmFkcmFwL3Jlc3VsdCwgdGhhbmsgeW91IGFkdmljZSAgQGp2aWlkZVxuaW1wb3J0IHsgVHJhbnNhY3Rpb25TaWduYXR1cmUgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3I+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG5cbiAgdW53cmFwKCk6IFQ7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogVTtcbiAgdW53cmFwPFUsIFY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBWKTogVSB8IFY7XG4gIC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDEwXG4gIC8vIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVSk6IFU7XG4gIHVud3JhcChvaz86ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiB1bmtub3duKTogdW5rbm93biB7XG4gICAgY29uc3QgciA9IHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sgPyBvayh2YWx1ZSkgOiB2YWx1ZSksXG4gICAgICAoZXJyb3IpID0+IChlcnIgPyBSZXN1bHQub2soZXJyKGVycm9yKSkgOiBSZXN1bHQuZXJyKGVycm9yKSksXG4gICAgKTtcbiAgICBpZiAoci5pc0Vycikge1xuICAgICAgdGhyb3cgci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHIudmFsdWU7XG4gIH1cblxuICAvLy8vIG1hcCAvLy8vXG4gIG1hcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogUmVzdWx0PFUsIEU+O1xuICBtYXA8VSwgRiBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBVLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBGLFxuICApOiBSZXN1bHQ8VSwgRj47XG4gIG1hcChvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IEVycm9yKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVyciA/IGVycihlcnJvcikgOiBlcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLy8gY2hhaW4gLy8vL1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDM3XG4gIC8vIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgRT5cbiAgUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG4gIGNoYWluKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDx1bmtub3duPixcbiAgICBlcnI/OiAoZXJyb3I6IEUpID0+IFJlc3VsdDx1bmtub3duPixcbiAgKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4ob2ssIGVyciB8fCAoKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycm9yKSkpO1xuICB9XG5cbiAgLy8vLyBtYXRjaCAvLy8vXG4gIG1hdGNoPFUsIEY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBGKTogdm9pZCB8IFByb21pc2U8dm9pZD47XG5cbiAgbWF0Y2goXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93bixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gdW5rbm93bixcbiAgKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIoZXJyb3IpIGFzIEVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vIHN1Ym1pdCAoYWxpYXMgSW5zdHJ1Y3Rpb24uc3VibWl0KSAvLy8vXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgYXN5bmMgc3VibWl0KGZlZVBheWVyPzogYW55KTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbiA9IHRoaXMudW53cmFwKCkgYXMgYW55O1xuICAgICAgaWYgKFxuICAgICAgICBpbnN0cnVjdGlvbi5pbnN0cnVjdGlvbnMgfHxcbiAgICAgICAgaW5zdHJ1Y3Rpb24uaGV4SW5zdHJ1Y3Rpb24gfHxcbiAgICAgICAgaW5zdHJ1Y3Rpb25bMF0uaW5zdHJ1Y3Rpb25zIHx8XG4gICAgICAgIGluc3RydWN0aW9uWzBdLmhleEluc3RydWN0aW9uXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGluc3RydWN0aW9uLnN1Ym1pdChmZWVQYXllcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcignT25seSBJbnN0cnVjdGlvbiBvYmplY3QnKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlcnIgYXMgRXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBpbnRlcmZhY2UgQXJyYXk8VD4ge1xuICAgIHN1Ym1pdChmZWVQYXllcj86IFNlY3JldCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+O1xuICB9XG59XG5cbmNsYXNzIEludGVybmFsT2s8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IHRydWU7XG4gIHJlYWRvbmx5IGlzRXJyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHZhbHVlOiBUKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIF9lcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBJbnRlcm5hbEVycjxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gZmFsc2U7XG4gIHJlYWRvbmx5IGlzRXJyID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgZXJyb3I6IEUpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIF9vazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVzdWx0IHtcbiAgZXhwb3J0IHR5cGUgT2s8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsT2s8VCwgRT47XG4gIGV4cG9ydCB0eXBlIEVycjxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxFcnI8VCwgRT47XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4odmFsdWU6IFQpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxPayh2YWx1ZSk7XG4gIH1cbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I/OiBFKTogUmVzdWx0PFQsIEU+O1xuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcjogRSk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbEVycihlcnJvciB8fCBFcnJvcigpKTtcbiAgfVxuXG4gIHR5cGUgVSA9IFJlc3VsdDx1bmtub3duPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICAgIFIxNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0LCBSMTVdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgICBPa1R5cGU8UjE1PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICAgIHwgUjE1XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICBSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMSB8IFIxMiB8IFIxM1xuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTJdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjhdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjg+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjddLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjc+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjVdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND4sIE9rVHlwZTxSNT5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQ+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVSwgUjMgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSM10sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+XSwgRXJyVHlwZTxSMCB8IFIxIHwgUjI+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+XSwgRXJyVHlwZTxSMCB8IFIxPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMF0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPl0sIEVyclR5cGU8UjA+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IFtdKTogUmVzdWx0PFtdPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxUIGV4dGVuZHMgVVtdIHwgUmVjb3JkPHN0cmluZywgVT4+KFxuICAgIG9iajogVCxcbiAgKTogUmVzdWx0PFxuICAgIHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgST4gPyBJIDogbmV2ZXIgfSxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPiA/IEUgOiBuZXZlcjtcbiAgICB9W2tleW9mIFRdXG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgY29uc3QgcmVzQXJyID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqKSB7XG4gICAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gYXMgdW5rbm93bjtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZXN1bHQub2socmVzQXJyKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPik7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3QgaXRlbSA9IChvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pW2tleV07XG4gICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICAgIHJlc1trZXldID0gaXRlbS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5vayhyZXMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3IgPSBFcnJvcj4gPVxuICB8IFJlc3VsdC5PazxULCBFPlxuICB8IFJlc3VsdC5FcnI8VCwgRT47XG5cbnR5cGUgT2tUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDxpbmZlciBPPiA/IE8gOiBuZXZlcjtcbnR5cGUgRXJyVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT5cbiAgPyBFXG4gIDogbmV2ZXI7XG4iLCAiaW1wb3J0IHsgQW55T2JqZWN0IH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnLi9yZXN1bHQnO1xuXG4vKipcbiAqIGNvbnZlcnQgYnVmZmVyIHRvIEFycmF5XG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlclxuICogQHJldHVybnMgbnVtYmVyW11cbiAqL1xuZXhwb3J0IGNvbnN0IGJ1ZmZlclRvQXJyYXkgPSAoYnVmZmVyOiBCdWZmZXIpOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IG51bXMgPSBbXTtcbiAgZm9yIChjb25zdCBieXRlIG9mIGJ1ZmZlcikge1xuICAgIG51bXMucHVzaChidWZmZXJbYnl0ZV0pO1xuICB9XG4gIHJldHVybiBudW1zO1xufTtcblxuLyoqXG4gKiBPdmVyd3JpdGUgSlMgT2JqZWN0XG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmplY3RcbiAqIEBwYXJhbSB7T3ZlcndyaXRlT2JqZWN0W119IHRhcmdldHNcbiAqIEByZXR1cm5zIE9iamVjdFxuICovXG5leHBvcnQgY29uc3Qgb3ZlcndyaXRlT2JqZWN0ID0gKFxuICBvYmplY3Q6IHVua25vd24sXG4gIHRhcmdldHM6IHtcbiAgICBleGlzdHNLZXk6IHN0cmluZztcbiAgICB3aWxsOiB7IGtleTogc3RyaW5nOyB2YWx1ZTogdW5rbm93biB9O1xuICB9W10sXG4pOiB1bmtub3duID0+IHtcbiAgY29uc3QgdGhhdDogQW55T2JqZWN0ID0gb2JqZWN0IGFzIEFueU9iamVjdDtcbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBkZWxldGUgdGhhdFt0YXJnZXQuZXhpc3RzS2V5XTtcbiAgICB0aGF0W3RhcmdldC53aWxsLmtleV0gPSB0YXJnZXQud2lsbC52YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0aGF0O1xufTtcblxuLyoqXG4gKiBEaXNwbGF5IGxvZyBmb3Igc29sYW5hLXN1aXRlLWNvbmZpZy5qc1xuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTFcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTJcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTNcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTRcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnTG9nID0gKFxuICBkYXRhMTogdW5rbm93bixcbiAgZGF0YTI6IHVua25vd24gPSAnJyxcbiAgZGF0YTM6IHVua25vd24gPSAnJyxcbiAgZGF0YTQ6IHVua25vd24gPSAnJyxcbik6IHZvaWQgPT4ge1xuICBpZiAoQ29uc3RhbnRzLmlzRGVidWdnaW5nID09PSAndHJ1ZScgfHwgcHJvY2Vzcy5lbnYuREVCVUcgPT09ICd0cnVlJykge1xuICAgIGNvbnNvbGUubG9nKCdbREVCVUddJywgZGF0YTEsIGRhdGEyLCBkYXRhMywgZGF0YTQpO1xuICB9XG59O1xuXG4vKipcbiAqIHNsZWVwIHRpbWVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNlY1xuICogQHJldHVybnMgUHJvbWlzZTxudW1iZXI+XG4gKi9cbmV4cG9ydCBjb25zdCBzbGVlcCA9IGFzeW5jIChzZWM6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCBzZWMgKiAxMDAwKSk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucyAhPSBudWxsICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlICE9IG51bGxcbiAgKTtcbn07XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuZXhwb3J0IGNvbnN0IGlzUHJvbWlzZSA9IChvYmo6IHVua25vd24pOiBvYmogaXMgUHJvbWlzZTx1bmtub3duPiA9PiB7XG4gIHJldHVybiAoXG4gICAgISFvYmogJiZcbiAgICAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiZcbiAgICB0eXBlb2YgKG9iaiBhcyBhbnkpLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgKTtcbn07XG5cbi8qKlxuICogVHJ5IGFzeW5jIG1vbmFkXG4gKlxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8VCwgRT4+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgYXN5bmNibG9jazogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8UmVzdWx0PFQsIEU+PjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihibG9jazogKCkgPT4gVCk6IFJlc3VsdDxULCBFPjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgaW5wdXQ6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBSZXN1bHQ8VCwgRXJyb3I+IHwgUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdiA9IGlucHV0KCk7XG4gICAgaWYgKGlzUHJvbWlzZSh2KSkge1xuICAgICAgcmV0dXJuIHYudGhlbihcbiAgICAgICAgKHg6IFQpID0+IFJlc3VsdC5vayh4KSxcbiAgICAgICAgKGVycjogRSkgPT4gUmVzdWx0LmVycihlcnIpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayh2KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoZSBhcyBzdHJpbmcpKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZmluYWxseUlucHV0KSB7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5hbGx5IGlucHV0OicsIGZpbmFsbHlJbnB1dCk7XG4gICAgICBmaW5hbGx5SW5wdXQoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8dW5kZWZpbmVkfSBjcmVhdGVkX2F0XG4gKiBAcmV0dXJucyBEYXRlIHwgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSA9IChcbiAgY3JlYXRlZF9hdDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuKTogRGF0ZSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChjcmVhdGVkX2F0KSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGNyZWF0ZWRfYXQgKiAxMDAwKTtcbiAgfVxuICByZXR1cm47XG59O1xuXG4vKipcbiAqIEdldCB1bml4IHRpbWVzdGFtcFxuICpcbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5leHBvcnQgY29uc3QgdW5peFRpbWVzdGFtcCA9ICgpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xufTtcbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb21taXRtZW50LCBDb25uZWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcbiAgY29uc3Qgc2V0dGVkID0ge1xuICAgIGNsdXN0ZXJVcmw6ICcnLFxuICAgIGNvbW1pdG1lbnQ6IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICAgIGN1c3RvbUNsdXN0ZXJVcmw6IFtdIGFzIHN0cmluZ1tdLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uID0gKCk6IENvbm5lY3Rpb24gPT4ge1xuICAgIGlmIChzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjdXN0b20gY2x1c3RlclxuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGN1c3RvbUNsdXN0ZXJVcmw6IHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjdXN0b20gY2x1c3RlciBieSBqc29uIGNvbmZpZ1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGN1c3RvbUNsdXN0ZXJVcmw6IENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghc2V0dGVkLmNsdXN0ZXJVcmwpIHtcbiAgICAgIC8vIGRlZmF1bHQgY2x1c3RlclxuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghc2V0dGVkLmNvbW1pdG1lbnQpIHtcbiAgICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uKHNldHRlZC5jbHVzdGVyVXJsLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNoYW5nZUNvbm5lY3Rpb24gPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGNvbW1pdG1lbnQ/OiBDb21taXRtZW50O1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHZvaWQgPT4ge1xuICAgIC8vIGluaXRpYWxpemVcbiAgICBzZXR0ZWQuY2x1c3RlclVybCA9ICcnO1xuICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gW107XG4gICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcblxuICAgIGNvbnN0IHsgY2x1c3RlciwgY29tbWl0bWVudCwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG4gICAgaWYgKGNvbW1pdG1lbnQpIHtcbiAgICAgIHNldHRlZC5jb21taXRtZW50ID0gY29tbWl0bWVudDtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNvbW1pdG1lbnQ6ICcsIHNldHRlZC5jb21taXRtZW50KTtcbiAgICB9XG5cbiAgICBpZiAoY2x1c3Rlcikge1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7IGNsdXN0ZXI6IGNsdXN0ZXIgfSk7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjbHVzdGVyVXJsOiAnLCBzZXR0ZWQuY2x1c3RlclVybCk7XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGN1c3RvbUNsdXN0ZXJVcmw6ICcsIGN1c3RvbUNsdXN0ZXJVcmwpO1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7IGN1c3RvbUNsdXN0ZXJVcmwgfSk7XG4gICAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IGN1c3RvbUNsdXN0ZXJVcmw7XG4gICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgJyMgTm9kZSBjaGFuZ2UgY2x1c3RlciwgY3VzdG9tIGNsdXN0ZXIgdXJsOiAnLFxuICAgICAgICBzZXR0ZWQuY2x1c3RlclVybCxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjb25maXJtZWRTaWcgPSBhc3luYyAoXG4gICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgY29tbWl0bWVudDogQ29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICApID0+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgbGF0ZXN0QmxvY2toYXNoID0gYXdhaXQgY29ubmVjdGlvbi5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICByZXR1cm4gYXdhaXQgY29ubmVjdGlvblxuICAgICAgLmNvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGJsb2NraGFzaDogbGF0ZXN0QmxvY2toYXNoLmJsb2NraGFzaCxcbiAgICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogbGF0ZXN0QmxvY2toYXNoLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tbWl0bWVudCxcbiAgICAgIClcbiAgICAgIC50aGVuKFJlc3VsdC5vaylcbiAgICAgIC5jYXRjaChSZXN1bHQuZXJyKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24gYXMgVHgsXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9kZWZpbmUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICcuL2NvbW1vbic7XG5cbi8vIFRPRE86IHJlbmFtZSBUcmFzYWN0aW9uLkJhdGNoXG5leHBvcnQgY2xhc3MgQmF0Y2hUcmFuc2FjdGlvbiB7XG4gIHN1Ym1pdCA9IGFzeW5jIChhcnI6IFRyYW5zYWN0aW9uW10pOiBQcm9taXNlPFRyYW5zYWN0aW9uU2lnbmF0dXJlPiA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3QgYSBvZiBhcnIpIHtcbiAgICAgIGlmICghYS5pbnN0cnVjdGlvbnMgJiYgIWEuc2lnbmVycykge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIGJhdGNoU3VibWl0KCkuXG4gICAgICAgICAgICBJbmRleDogJHtpfSwgU2V0IHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KGEpfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXJyLmZsYXRNYXAoKGEpID0+IGEuaW5zdHJ1Y3Rpb25zKTtcbiAgICBjb25zdCBzaWduZXJzID0gYXJyLmZsYXRNYXAoKGEpID0+IGEuc2lnbmVycyk7XG4gICAgY29uc3QgZmVlUGF5ZXJzID0gYXJyLmZpbHRlcigoYSkgPT4gYS5mZWVQYXllciAhPT0gdW5kZWZpbmVkKTtcbiAgICBsZXQgZmVlUGF5ZXIgPSBzaWduZXJzWzBdO1xuICAgIGlmIChmZWVQYXllcnMubGVuZ3RoID4gMCAmJiBmZWVQYXllcnNbMF0uZmVlUGF5ZXIpIHtcbiAgICAgIGZlZVBheWVyID0gZmVlUGF5ZXJzWzBdLmZlZVBheWVyO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFR4KCk7XG4gICAgbGV0IGZpbmFsU2lnbmVycyA9IHNpZ25lcnM7XG4gICAgaWYgKGZlZVBheWVyKSB7XG4gICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IGZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgIGZpbmFsU2lnbmVycyA9IFtmZWVQYXllciwgLi4uc2lnbmVyc107XG4gICAgfVxuICAgIGluc3RydWN0aW9ucy5tYXAoKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgIH07XG5cbiAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICBvcHRpb25zLFxuICAgICk7XG4gIH07XG59XG5cbi8qKlxuICogc2VuVHJhbnNhY3Rpb24oKSBUcmFuc2FjdGlvbkluc3RydWN0aW9uXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBAdHMtaWdub3JlICovXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uW10gPSBbXTtcbiAgLy8gZG9udCB1c2UgZm9yRWFjaFxuICAvLyBJdCBpcyBub3QgcG9zc2libGUgdG8gc3RvcCB0aGUgcHJvY2VzcyBieSBSRVRVUk4gaW4gdGhlIG1pZGRsZSBvZiB0aGUgcHJvY2Vzcy5cbiAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzOiBzdHJpbmcgPSBvYmouZXJyb3IubWVzc2FnZSBhcyBzdHJpbmc7XG4gICAgICAgIHRocm93IEVycm9yKGBbQXJyYXkgaW5kZXggb2YgY2F1Z2h0ICdSZXN1bHQuZXJyJzogJHtpfV0ke2Vycm9yTWVzc31gKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqLmlzT2spIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlIGFzIFRyYW5zYWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iaiBhcyBUcmFuc2FjdGlvbik7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQmF0Y2hUcmFuc2FjdGlvbigpLnN1Ym1pdChpbnN0cnVjdGlvbnMpO1xuICB9KTtcbn07XG4iLCAiLy9AaW50ZXJuYWxzXG4vLyBUT0RPOiBtb3ZlIHRvIGNvbW1vbi50c1xuZXhwb3J0IGNvbnN0IE1BWF9SRVRSSUVTID0gMztcbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgS2V5cGFpcixcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24gYXMgVHgsXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuXG4vLyBUT0RPOiBjcmVhdGUgY2xhc3MgdHlwZSwgcmVuYW1lIGNsYXNzIG5hbWU6ICBUcmFuc2FjdGlvbi5Db21tb25cbmV4cG9ydCBjbGFzcyBUcmFuc2FjdGlvbiB7XG4gIHN0YXRpYyBNQVhfUkVUUklFUyA9IDM7XG5cbiAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgZmVlUGF5ZXI/OiBLZXlwYWlyO1xuICBkYXRhPzogdW5rbm93bjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgIGRhdGE/OiB1bmtub3duLFxuICApIHtcbiAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUcmFuc2FjdGlvbikpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUeCgpO1xuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgbWF4UmV0cmllczogVHJhbnNhY3Rpb24uTUFYX1JFVFJJRVMsXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbiBhcyBUeCxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vZGVmaW5lJztcblxuLy8gVE9ETzogcmVuYW1lIFRyYXNhY3Rpb25HZW5lcmF0b3IuTWludFxuZXhwb3J0IGNsYXNzIE1pbnRUcmFuc2FjdGlvbjxUPiB7XG4gIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICBzaWduZXJzOiBLZXlwYWlyW107XG4gIGZlZVBheWVyPzogS2V5cGFpcjtcbiAgZGF0YT86IFQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgIGZlZVBheWVyPzogS2V5cGFpcixcbiAgICBkYXRhPzogVCxcbiAgKSB7XG4gICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIHN1Ym1pdCA9IGFzeW5jICgpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWludFRyYW5zYWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignb25seSBNaW50SW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUeCgpO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IHRoaXMuZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgfTtcblxuICAgICAgaWYgKE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50ID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIENoYW5nZSBtZXRhcGxleCBjbHVzdGVyIG9uIG1haW5uZXQtYmV0YScpO1xuICAgICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyOiBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleCB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgVHJhbnNhY3Rpb24gYXMgVHgsXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2RlZmluZSc7XG5cbi8vIFRPRE86IFxuLy8gVE9ETzogcmVuYW1lIFRyYXNhY3Rpb24uUGFydGlhbFNpZ25cbmV4cG9ydCBjbGFzcyBQYXJ0aWFsU2lnblRyYW5zYWN0aW9uIHtcbiAgaGV4SW5zdHJ1Y3Rpb246IHN0cmluZztcbiAgZGF0YT86IFB1YmtleTtcbiAgY2FuU3VibWl0PzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihpbnN0cnVjdGlvbnM6IHN0cmluZywgbWludD86IFB1YmtleSwgY2FuU3VibWl0ID0gZmFsc2UpIHtcbiAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gICAgdGhpcy5jYW5TdWJtaXQgPSBjYW5TdWJtaXQ7XG4gIH1cblxuICBzdWJtaXQgPSBhc3luYyAoXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhcnRpYWxTaWduVHJhbnNhY3Rpb24pKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZSA9IEJ1ZmZlci5mcm9tKHRoaXMuaGV4SW5zdHJ1Y3Rpb24sICdoZXgnKTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uRnJvbUpzb24gPSBUeC5mcm9tKGRlY29kZSk7XG4gICAgICB0cmFuc2FjdGlvbkZyb21Kc29uLnBhcnRpYWxTaWduKGZlZVBheWVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHdpcmVUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uRnJvbUpzb24uc2VyaWFsaXplKCk7XG4gICAgICByZXR1cm4gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuc2VuZFJhd1RyYW5zYWN0aW9uKFxuICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuXG4vKipcbiAqIHNlblRyYW5zYWN0aW9uKCkgVHJhbnNhY3Rpb25JbnN0cnVjdGlvblxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuLyogQHRzLWlnbm9yZSAqL1xuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uIChmZWVQYXllcjogU2VjcmV0KSB7XG4gIGZvciBhd2FpdCAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICBjb25zdCBwYXJ0aWFsU2lnblR4OiBQYXJ0aWFsU2lnblRyYW5zYWN0aW9uID0gb2JqO1xuXG4gICAgaWYgKHBhcnRpYWxTaWduVHguY2FuU3VibWl0KSB7XG4gICAgICAoYXdhaXQgcGFydGlhbFNpZ25UeC5zdWJtaXQoZmVlUGF5ZXIpKS5tYXRjaChcbiAgICAgICAgKG9rKSA9PiBOb2RlLmNvbmZpcm1lZFNpZyhvaywgJ2ZpbmFsaXplZCcpLFxuICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGF3YWl0IHBhcnRpYWxTaWduVHguc3VibWl0KGZlZVBheWVyKTtcbiAgICB9XG4gIH1cbn07XG4iLCAiaW1wb3J0IHsgS2V5cGFpciwgTEFNUE9SVFNfUEVSX1NPTCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZyB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgQmlnTnVtYmVyIH0gZnJvbSAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCB7IEV4cGxvcmVyLCBFeHBsb3Jlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbi8qKlxuICogQ3JlYXRlIGV4cGxvcmVyIHVybCBmb3IgYWNjb3VudCBhZGRyZXNzIG9yIHNpZ25hdHVyZVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5TdHJpbmcucHJvdG90eXBlLnRvRXhwbG9yZXJVcmwgPSBmdW5jdGlvbiAoXG4gIGV4cGxvcmVyOiBFeHBsb3JlciA9IEV4cGxvcmVyLlNvbHNjYW4sXG4gIG9wdGlvbnM6IFBhcnRpYWw8RXhwbG9yZXJPcHRpb25zPiA9IHt9LFxuKSB7XG4gIGNvbnN0IGVuZFBvaW50VXJsID0gTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQ7XG4gIGRlYnVnTG9nKCcjIHRvRXhwbG9yZXJVcmwgcnBjRW5kcG9pbnQ6JywgZW5kUG9pbnRVcmwpO1xuICBsZXQgY2x1c3RlciA9ICcnO1xuICBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIucHJkO1xuICB9IGVsc2UgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci50ZXN0O1xuICB9IGVsc2UgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfSBlbHNlIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9XG5cbiAgY29uc3QgYWRkcmVzc09yU2lnbmF0dXJlOiBzdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gIGxldCB1cmwgPSAnJztcblxuICBpZiAob3B0aW9ucy5yZXBsYWNlUGF0aCkge1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBpZiAoQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KGFkZHJlc3NPclNpZ25hdHVyZSkpIHtcbiAgICAvLyBhZGRyZXNzXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vYWRkcmVzcy8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gc2lnbmF0dXJlXG4gICAgLy8gZm9yIEludmFsaWQgdHlwZSBcIm5ldmVyXCIgb2YgYWRkcmVzc09yU2lnbmF0dXJlLCBzbyBgYXMgc3RyaW5nYFxuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFB1YktleShAc29sYW5hLXN1aXRlKSB0byBQdWJsaWNLZXkoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFB1YmxpY0tleVxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvUHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1B1YmtleSh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuUHViS2V5OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnRvU3RyaW5nKCkpO1xufTtcblxuLyoqXG4gKiBTZWNyZXQoQHNvbGFuYS1zdWl0ZSkgdG8gS2V5cGFpcihAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgS2V5cGFpclxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvS2V5cGFpciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNTZWNyZXQodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlNlY3JldDogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xufTtcblxuLyoqXG4gKiBMQU1QT1JUUyB0byBTT0xcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b1NvbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAuZGl2KExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuXG4vKipcbiAqIFNPTCB0byBMQU1QT1JUU1xuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvTGFtcG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLnRpbWVzKExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2csIHNsZWVwIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QWNjb3VudCxcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG4gIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IsXG4gIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7IEFjY291bnQgYXMgS2V5cGFpciB9IGZyb20gJy4va2V5cGFpcic7XG5cbi8qKlxuICogR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gKlxuICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsbG93T3duZXJPZmZDdXJ2ZVxuICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBBc3NvY2lhdGVkIHtcbiAgICBjb25zdCBSRVRSWV9PVkVSX0xJTUlUID0gMTA7XG4gICAgY29uc3QgUkVUUllfU0xFRVBfVElNRSA9IDM7XG4gICAgLy9AaW50ZXJuYWxcbiAgICBjb25zdCBnZXQgPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICAgICk6IFByb21pc2U8c3RyaW5nIHwgVHJhbnNhY3Rpb24+ID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lcixcbiAgICAgICAgbmV3IEtleXBhaXIuS2V5cGFpcih7IHNlY3JldDogZmVlUGF5ZXIgfSkucHVia2V5LFxuICAgICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICApO1xuXG4gICAgICBpZiAoIXJlcy5pbnN0KSB7XG4gICAgICAgIHJldHVybiByZXMudG9rZW5BY2NvdW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKFxuICAgICAgICBbcmVzLmluc3RdLFxuICAgICAgICBbXSxcbiAgICAgICAgZmVlUGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIHJlcy50b2tlbkFjY291bnQsXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXRyeSBmdW5jdGlvbiBpZiBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCByZXRyeUdldE9yQ3JlYXRlID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgIGxldCBjb3VudGVyID0gMTtcbiAgICAgIHdoaWxlIChjb3VudGVyIDwgUkVUUllfT1ZFUl9MSU1JVCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBnZXQobWludCwgb3duZXIsIGZlZVBheWVyLCB0cnVlKTtcblxuICAgICAgICAgIGlmIChpbnN0ICYmIHR5cGVvZiBpbnN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgaW5zdCk7XG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGluc3QgaW5zdGFuY2VvZiBUcmFuc2FjdGlvbikge1xuICAgICAgICAgICAgKGF3YWl0IGluc3Quc3VibWl0KCkpLm1hcChcbiAgICAgICAgICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcob2spO1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnN0LmRhdGEgYXMgc3RyaW5nO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVidWdMb2coJyMgRXJyb3Igc3VibWl0IHJldHJ5R2V0T3JDcmVhdGU6ICcsIGVycik7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBkZWJ1Z0xvZyhgIyByZXRyeTogJHtjb3VudGVyfSBjcmVhdGUgdG9rZW4gYWNjb3VudDogYCwgZSk7XG4gICAgICAgICAgZGVidWdMb2coYCMgbWludDogJHttaW50fSwgb3duZXI6ICR7b3duZXJ9LCBmZWVQYXllcjogJHtmZWVQYXllcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBzbGVlcChSRVRSWV9TTEVFUF9USU1FKTtcbiAgICAgICAgY291bnRlcisrO1xuICAgICAgfVxuICAgICAgdGhyb3cgRXJyb3IoYHJldHJ5IGFjdGlvbiBpcyBvdmVyIGxpbWl0ICR7UkVUUllfT1ZFUl9MSU1JVH1gKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW01haW4gbG9naWNdR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAgICAgKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgICAqXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gZmVlUGF5ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICAgKi9cbiAgICBleHBvcnQgY29uc3QgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI/OiBQdWJrZXksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgICApOiBQcm9taXNlPHtcbiAgICAgIHRva2VuQWNjb3VudDogc3RyaW5nO1xuICAgICAgaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICB9PiA9PiB7XG4gICAgICBjb25zdCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYWxsb3dPd25lck9mZkN1cnZlLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBEb250IHVzZSBSZXN1bHRcbiAgICAgICAgYXdhaXQgZ2V0QWNjb3VudChcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLmNvbW1pdG1lbnQsXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IpICYmXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBlcnJvcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5ZXIgPSAhZmVlUGF5ZXIgPyBvd25lciA6IGZlZVBheWVyO1xuXG4gICAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgcGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgS2V5cGFpciBhcyBPcmlnaW5hbCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IGNsYXNzIEtleXBhaXIge1xuICAgIHNlY3JldDogU2VjcmV0O1xuICAgIHB1YmtleTogUHVia2V5O1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiB7IHB1YmtleT86IFB1YmtleTsgc2VjcmV0OiBTZWNyZXQgfSkge1xuICAgICAgaWYgKCFwYXJhbXMucHVia2V5KSB7XG4gICAgICAgIGNvbnN0IGtleXBhaXIgPSBwYXJhbXMuc2VjcmV0LnRvS2V5cGFpcigpO1xuICAgICAgICB0aGlzLnB1YmtleSA9IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB1YmtleSA9IHBhcmFtcy5wdWJrZXk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlY3JldCA9IHBhcmFtcy5zZWNyZXQ7XG4gICAgfVxuXG4gICAgdG9QdWJsaWNLZXkoKTogUHVibGljS2V5IHtcbiAgICAgIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMucHVia2V5KTtcbiAgICB9XG5cbiAgICB0b0tleXBhaXIoKTogT3JpZ2luYWwge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnNlY3JldCk7XG4gICAgICByZXR1cm4gT3JpZ2luYWwuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNQdWJrZXkgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFB1YmtleSA9PlxuICAgICAgL15bMC05YS16QS1aXXszMiw0NH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBpc1NlY3JldCA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgU2VjcmV0ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezg3LDg4fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGNyZWF0ZSA9ICgpOiBLZXlwYWlyID0+IHtcbiAgICAgIGNvbnN0IGtleXBhaXIgPSBPcmlnaW5hbC5nZW5lcmF0ZSgpO1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgdG9LZXlQYWlyID0gKGtleXBhaXI6IE9yaWdpbmFsKTogS2V5cGFpciA9PiB7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtYnViYmxlZ3VtJztcbmltcG9ydCBCTiBmcm9tICdibi5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUGRhIHtcbiAgICBleHBvcnQgY29uc3QgZ2V0TWV0YWRhdGEgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldE1hc3RlckVkaXRpb24gPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2VkaXRpb24nKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0VHJlZUF1dGhvcml0eSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW2FkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEJndW1TaWduZXIgPSAoKTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtCdWZmZXIuZnJvbSgnY29sbGVjdGlvbl9jcGknLCAndXRmOCcpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEFzc2V0SWQgPSAoYWRkcmVzczogUHVia2V5LCBsZWFmSW5kZXg6IG51bWJlcik6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gbmV3IEJOLkJOKGxlYWZJbmRleCk7XG4gICAgICBjb25zdCBbYXNzZXRJZF0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdhc3NldCcsICd1dGY4JyksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgVWludDhBcnJheS5mcm9tKG5vZGUudG9BcnJheSgnbGUnLCA4KSksXG4gICAgICAgIF0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBhc3NldElkLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFjY291bnQgYXMgQXNzb2NpYXRlZCB9IGZyb20gJy4vYXNzb2NpYXRlZCc7XG5pbXBvcnQgeyBBY2NvdW50IGFzIEtleXBhaXIgfSBmcm9tICcuL2tleXBhaXInO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBQZGEgfSBmcm9tICcuL3BkYSc7XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50ID0ge1xuICAuLi5Bc3NvY2lhdGVkLFxuICAuLi5LZXlwYWlyLFxuICAuLi5QZGEsXG59O1xuIiwgImltcG9ydCB7IEludGVybmFsQ29sbGVjdGlvbiB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEdyb3VwaW5nIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgQ29sbGVjdGlvbiwgSW5wdXRDb2xsZWN0aW9uLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb24ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q29sbGVjdGlvbj4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+LFxuICAgICk6IENvbGxlY3Rpb24gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogR3JvdXBpbmdbXSk6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBvdXRwdXQuZmluZCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmdyb3VwX2tleSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmdyb3VwX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMgPyByZXMuZ3JvdXBfdmFsdWUgOiAnJztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDcmVhdG9ycywgSW5wdXRDcmVhdG9ycywgT3B0aW9uIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Db21wcmVzc2VkTmZ0SW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogSW50ZXJuYWxDcmVhdG9yc1tdID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0IS5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPixcbiAgICApOiBDcmVhdG9yc1tdIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJveWFsdHkge1xuICAgIGV4cG9ydCBjb25zdCBUSFJFU0hPTEQgPSAxMDA7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQge1xuICBNZXRhZGF0YUFyZ3MsXG4gIFRva2VuUHJvZ3JhbVZlcnNpb24sXG4gIFRva2VuU3RhbmRhcmQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgQXNzZXRBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogTWV0YWRhdGFBcmdzID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0NvbXByZXNzZWROZnRJbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogZmFsc2UsXG4gICAgICAgIGlzTXV0YWJsZTogaW5wdXQuaXNNdXRhYmxlID8/IGZhbHNlLFxuICAgICAgICBlZGl0aW9uTm9uY2U6IDAsXG4gICAgICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUsXG4gICAgICAgIHRva2VuUHJvZ3JhbVZlcnNpb246IFRva2VuUHJvZ3JhbVZlcnNpb24uT3JpZ2luYWwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBBc3NldEFuZE9mZmNoYWluKTogTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4uaWQudG9TdHJpbmcoKSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IENvbGxlY3Rpb24uQ29sbGVjdGlvbk1pbnQuaW50b1VzZXIoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uZ3JvdXBpbmcsXG4gICAgICAgICkgYXMgUHVia2V5LFxuICAgICAgICBhdXRob3JpdGllczogb3V0cHV0Lm9uY2hhaW4uYXV0aG9yaXRpZXMsXG4gICAgICAgIHJveWFsdHk6IFJveWFsdHkuUm95YWx0eS5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5yb3lhbHR5LnBlcmNlbnQpLFxuICAgICAgICBuYW1lOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLm5hbWUsXG4gICAgICAgIHN5bWJvbDogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5tZXRhZGF0YS5zeW1ib2wsXG4gICAgICAgIHVyaTogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmNyZWF0b3JzKSEsXG4gICAgICAgIHRyZWVBZGRyZXNzOiBvdXRwdXQub25jaGFpbi5jb21wcmVzc2lvbi50cmVlLFxuICAgICAgICBpc0NvbXByZXNzZWQ6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLmNvbXByZXNzZWQsXG4gICAgICAgIGlzTXV0YWJsZTogb3V0cHV0Lm9uY2hhaW4ubXV0YWJsZSxcbiAgICAgICAgaXNCdXJuOiBvdXRwdXQub25jaGFpbi5idXJudCxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5zdXBwbHkuZWRpdGlvbl9ub25jZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucm95YWx0eS5wcmltYXJ5X3NhbGVfaGFwcGVuZWQsXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCkhLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgTWVtbywgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVtbyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogTWVtbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBvdXRwdXRUcmFuc2Zlcj86IFRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIGNhc2U6IHRyYW5zZmVyIHdpdGggbWVtb1xuICAgICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50ICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gPT09ICdzcGwtdG9rZW4nKSB7XG4gICAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8ubWludDtcbiAgICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5tZW1vID0gb3V0cHV0LnBhcnNlZDtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE1pbnRUbyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNaW50VG8sXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubWludEF1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50QXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkuYWNjb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby5hY2NvdW50IGFzIHN0cmluZztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29sbGVjdGlvbkRldGFpbHMgYXMgTWV0YXBsZXhDb2xsZWN0aW9uRGV0YWlscyB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IENvbGxlY3Rpb25EZXRhaWxzLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb25EZXRhaWxzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxNZXRhcGxleENvbGxlY3Rpb25EZXRhaWxzPixcbiAgICApOiBDb2xsZWN0aW9uRGV0YWlscyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBfX2tpbmQ6IG91dHB1dC5fX2tpbmQsXG4gICAgICAgIHNpemU6IHBhcnNlSW50KG91dHB1dC5zaXplLnRvU3RyaW5nKDEwKSksXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE9wdGlvbiwgVXNlcyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVXNlcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChvdXRwdXQ6IE9wdGlvbjxVc2VzPik6IFVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IElucHV0VG9rZW5NZXRhZGF0YSwgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE1ldGFkYXRhQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVG9rZW5NZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dFRva2VuTWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IG51bGwsXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogTWV0YWRhdGFBbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wpLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBkZWxldGUgTlVMTCgweDAwKSBzdHJpbmdzIGZ1bmN0aW9uXG4gICAgZXhwb3J0IGNvbnN0IGRlbGV0ZU51bGxTdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwwL2csICcnKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb25EZXRhaWxzIH0gZnJvbSAnLi9jb2xsZWN0aW9uLWRldGFpbHMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW4gfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhLCBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBNZXRhZGF0YUFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogTWV0YWRhdGFBbmRPZmZjaGFpbixcbiAgICApOiBSZWd1bGFyTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG91dHB1dC5vbmNoYWluLnVwZGF0ZUF1dGhvcml0eS50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBUb2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCxcbiAgICAgICAgKSxcbiAgICAgICAgdXJpOiBUb2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5pc011dGFibGUsXG4gICAgICAgIHByaW1hcnlTYWxlSGFwcGVuZWQ6IG91dHB1dC5vbmNoYWluLnByaW1hcnlTYWxlSGFwcGVuZWQsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5lZGl0aW9uTm9uY2UsXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5jb2xsZWN0aW9uKSxcbiAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IENvbGxlY3Rpb25EZXRhaWxzLkNvbGxlY3Rpb25EZXRhaWxzLmludG9Vc2VyKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmNvbGxlY3Rpb25EZXRhaWxzLFxuICAgICAgICApLFxuICAgICAgICB1c2VzOiBVc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgb3ZlcndyaXRlT2JqZWN0LCBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHt9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgRmlsZVR5cGUsIFByb3BlcnRpZXMsIFN0b3JhZ2VUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSBhc3luYyAoXG4gICAgICBpbnB1dDogUHJvcGVydGllcyB8IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrRnVuYzogKFxuICAgICAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgICApID0+IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PixcbiAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICk6IFByb21pc2U8UHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2FsbGJhY2tGdW5jKGZpbGUuZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICAgICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3ZlcndyaXRlT2JqZWN0KGZpbGUsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICB3aWxsOiB7IGtleTogJ3VyaScsIHZhbHVlOiByZXMudmFsdWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmlucHV0LCBmaWxlcyB9IGFzIFByb3BlcnRpZXM7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5tdWx0aXNpZ0F1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5tdWx0aXNpZ0F1dGhvcml0eTtcbiAgICAgIGhpc3Rvcnkuc2lnbmVycyA9IG91dHB1dC5wYXJzZWQuaW5mby5zaWduZXJzO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlciB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXIsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICBpZiAoIW91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbiB8fCAhb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgIGhpc3Rvcnkuc29sID0gb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzPy50b1NvbCgpLnRvU3RyaW5nKCk7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbXByZXNzZWROZnRNZXRhZGF0YSB9IGZyb20gJy4vY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWVtbyB9IGZyb20gJy4vbWVtbyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnLi9yZWd1bGFyLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUHJvcGVydGllcyB9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW5NZXRhZGF0YSB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vdHJhbnNmZXItY2hlY2tlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBVc2VzIH0gZnJvbSAnLi91c2VzJztcblxuZXhwb3J0IGNvbnN0IENvbnZlcnRlciA9IHtcbiAgLi4uQ29tcHJlc3NlZE5mdE1ldGFkYXRhLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uUmVndWxhck5mdE1ldGFkYXRhLFxuICAuLi5Qcm9wZXJ0aWVzLFxuICAuLi5Sb3lhbHR5LFxuICAuLi5Ub2tlbk1ldGFkYXRhLFxuICAuLi5UcmFuc2ZlckNoZWNrZWQsXG4gIC4uLlRyYW5zZmVyLFxuICAuLi5Vc2VzLFxufTtcbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IERldGFpbHMsIExpbWl0IH0gZnJvbSAnfi90eXBlcy92YWxpZGF0b3InO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBWYWxpZGF0b3Ige1xuICBleHBvcnQgbmFtZXNwYWNlIE1lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGV4cG9ydCBjb25zdCBTTUFMTF9OVU1CRVIgPSAndG9vIHNtYWxsJztcbiAgICBleHBvcnQgY29uc3QgQklHX05VTUJFUiA9ICd0b28gYmlnJztcbiAgICBleHBvcnQgY29uc3QgTE9OR19MRU5HVEggPSAndG9vIGxvbmcnO1xuICAgIGV4cG9ydCBjb25zdCBFTVBUWSA9ICdpbnZhbGlkIGVtcHR5IHZhbHVlJztcbiAgICBleHBvcnQgY29uc3QgSU5WQUxJRF9VUkwgPSAnaW52YWxpZCB1cmwnO1xuICAgIGV4cG9ydCBjb25zdCBPTkxZX05PREVfSlMgPSAnYHN0cmluZ2AgdHlwZSBpcyBvbmx5IE5vZGUuanMnO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IE5BTUVfTEVOR1RIID0gMzI7XG4gIGV4cG9ydCBjb25zdCBTWU1CT0xfTEVOR1RIID0gMTA7XG4gIGV4cG9ydCBjb25zdCBVUkxfTEVOR1RIID0gMjAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NQVggPSAxMDA7XG4gIGV4cG9ydCBjb25zdCBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVggPSAxMDAwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUlOID0gMDtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdyb3lhbHR5JztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTZWxsZXJGZWVCYXNpc1BvaW50cyA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogQ29udmVydGVyLlJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXgsXG4gID4oXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1JveWFsdHkobWV0YWRhdGEucm95YWx0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyRmVlQmFzaXNQb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLm5hbWUpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNOYW1lKG1ldGFkYXRhLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5zeW1ib2wpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTeW1ib2wobWV0YWRhdGEuc3ltYm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRXJyKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLnJlcy5lcnJvci5kZXRhaWxzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAgICdDYXVnaHQgaW4gdGhlIHZhbGlkYXRpb24gZXJyb3JzLiBzZWUgaW5mb3JtYXRpb24gZS5nOiBlcnI8VmFsaWRhdG9yRXJyb3I+LmRldGFpbHMnO1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIHR5cGUgUGlja05mdFN0b3JhZ2UgPSBQaWNrPFxuICAgIE9mZmNoYWluLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ2ltYWdlJyB8ICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cydcbiAgPjtcbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZU1ldGFwbGV4ID0gUGljazxcbiAgICBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ3JveWFsdHknIHwgJ2ZpbGVQYXRoJ1xuICA+O1xuICB0eXBlIFBpY2tNZXRhcGxleCA9IFBpY2s8XG4gICAgRGF0YVYyLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ3VyaScgfCAnc2VsbGVyRmVlQmFzaXNQb2ludHMnXG4gID47XG5cbiAgY29uc3QgYnl0ZUxlbmd0aCA9ICh2YWx1ZTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCB0ZXh0ID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgcmV0dXJuIHRleHQuZW5jb2RlKHZhbHVlKS5sZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlRXJyb3IgPSAoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGFjdHVhbDogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGxpbWl0PzogTGltaXQsXG4gICk6IFZhbGlkYXRvckVycm9yID0+IHtcbiAgICBsZXQgZXJyb3I6IFZhbGlkYXRvckVycm9yO1xuICAgIGlmIChsaW1pdCkge1xuICAgICAgZXJyb3IgPSBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgW3sga2V5LCBtZXNzYWdlLCBhY3R1YWwsIGxpbWl0IH1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3IgPSBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgW3sga2V5LCBtZXNzYWdlLCBhY3R1YWwgfV0pO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3I7XG4gIH07XG5cbiAgY29uc3QgaXNVcmlPckltYWdlID0gKFxuICAgIGltYWdlT3JVcmk6IHN0cmluZyxcbiAgICBrZXk6IHN0cmluZyxcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGlmICghaW1hZ2VPclVyaSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIGltYWdlT3JVcmkpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoaW1hZ2VPclVyaSkgPiBVUkxfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgaW1hZ2VPclVyaSwge1xuICAgICAgICAgIHRocmVzaG9sZDogVVJMX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIS9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTs/OiY9KywlI10rL2cudGVzdChpbWFnZU9yVXJpKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuSU5WQUxJRF9VUkwsIGltYWdlT3JVcmkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBkZXRhaWxzOiBEZXRhaWxzW107XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgZGV0YWlsczogRGV0YWlsc1tdKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICcuLi9hY2NvdW50JztcblxuZXhwb3J0IGVudW0gRmlsdGVyVHlwZSB7XG4gIE1lbW8gPSAnbWVtbycsXG4gIE1pbnQgPSAnbWludCcsXG4gIE9ubHlNZW1vID0gJ29ubHktbWVtbycsXG4gIFRyYW5zZmVyID0gJ3RyYW5zZmVyJyxcbn1cblxuZXhwb3J0IGVudW0gTW9kdWxlTmFtZSB7XG4gIFNvbE5hdGl2ZSA9ICdzeXN0ZW0nLFxuICBTcGxUb2tlbiA9ICdzcGwtdG9rZW4nLFxufVxuXG5leHBvcnQgY29uc3QgRmlsdGVyT3B0aW9ucyA9IHtcbiAgVHJhbnNmZXI6IHtcbiAgICBwcm9ncmFtOiBbJ3N5c3RlbScsICdzcGwtdG9rZW4nXSxcbiAgICBhY3Rpb246IFsndHJhbnNmZXInLCAndHJhbnNmZXJDaGVja2VkJ10sXG4gIH0sXG4gIE1lbW86IHtcbiAgICBwcm9ncmFtOiBbJ3NwbC1tZW1vJ10sXG4gICAgYWN0aW9uOiBbJyonXSxcbiAgfSxcbiAgTWludDoge1xuICAgIHByb2dyYW06IFsnc3BsLXRva2VuJ10sXG4gICAgYWN0aW9uOiBbJ21pbnRUbycsICdtaW50VG9DaGVja2VkJ10sXG4gIH0sXG59O1xuXG5leHBvcnQgdHlwZSBQb3N0VG9rZW5BY2NvdW50ID0ge1xuICBhY2NvdW50OiBzdHJpbmc7XG4gIG93bmVyOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBXaXRoTWVtbyA9IHtcbiAgc2lnOiBzdHJpbmdbXTtcbiAgbWVtbzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgVHJhbnNmZXIgPSB7XG4gIHBhcnNlZDoge1xuICAgIGluZm86IHtcbiAgICAgIGRlc3RpbmF0aW9uOiBQdWJrZXk7XG4gICAgICBzb3VyY2U6IFB1YmtleTtcbiAgICAgIGxhbXBvcnRzOiBudW1iZXI7XG4gICAgfTtcbiAgICB0eXBlOiBzdHJpbmc7XG4gIH07XG4gIHByb2dyYW06IHN0cmluZztcbiAgcHJvZ3JhbUlkPzogUHVibGljS2V5O1xufTtcblxuZXhwb3J0IHR5cGUgTWludFRvID0ge1xuICBwYXJzZWQ6IHtcbiAgICBpbmZvOiB7XG4gICAgICBhY2NvdW50OiBQdWJrZXk7XG4gICAgICBtaW50OiBQdWJrZXk7XG4gICAgICBtaW50QXV0aG9yaXR5OiBQdWJrZXk7XG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nO1xuICAgIH07XG4gICAgdHlwZTogc3RyaW5nO1xuICB9O1xuICBwcm9ncmFtOiBzdHJpbmc7XG4gIHByb2dyYW1JZD86IFB1YmxpY0tleTtcbn07XG5cbmV4cG9ydCB0eXBlIE1pbnRUb0NoZWNrZWQgPSBNaW50VG87XG5cbmV4cG9ydCB0eXBlIFRyYW5zZmVyQ2hlY2tlZCA9IHtcbiAgcGFyc2VkOiB7XG4gICAgaW5mbzoge1xuICAgICAgZGVzdGluYXRpb246IFB1YmtleTtcbiAgICAgIG1pbnQ6IFB1YmtleTtcbiAgICAgIG11bHRpc2lnQXV0aG9yaXR5OiBQdWJrZXk7XG4gICAgICBzaWduZXJzOiBQdWJrZXlbXTtcbiAgICAgIHNvdXJjZTogUHVia2V5O1xuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZztcbiAgICB9O1xuICAgIHR5cGU6IHN0cmluZztcbiAgfTtcbiAgcHJvZ3JhbTogc3RyaW5nO1xuICBwcm9ncmFtSWQ/OiBQdWJsaWNLZXk7XG59O1xuXG5leHBvcnQgdHlwZSBNZW1vID0ge1xuICBwYXJzZWQ6IHN0cmluZztcbiAgcHJvZ3JhbTogc3RyaW5nO1xuICBwcm9ncmFtSWQ6IFB1YmxpY0tleTtcbn07XG4iLCAiLy9AaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlQW1vdW50ID0gKFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGFtb3VudCAqIDEwICoqIG1pbnREZWNpbWFsO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIGNyZWF0ZUJ1cm5DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQXV0aG9yaXR5T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGJ1cm5BbW91bnQ6IG51bWJlcixcbiAgICB0b2tlbkRlY2ltYWxzOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxBdXRob3JpdHlPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBzaWduZXJzWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudChidXJuQW1vdW50LCB0b2tlbkRlY2ltYWxzKSxcbiAgICAgICAgdG9rZW5EZWNpbWFscyxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKFtpbnN0XSwga2V5cGFpcnMsIHBheWVyLnRvS2V5cGFpcigpKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU29ydERpcmVjdGlvbiB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IFRva2VuTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBPbkVyciwgT25PayB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHtcbiAgTWV0YWRhdGEsXG4gIFRva2VuU3RhbmRhcmQsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBUT0tFTl9QUk9HUkFNX0lEIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUGFyc2VkQWNjb3VudERhdGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGNvbnN0IFVOQUJMRV9FUlJPUl9SRUdFWCA9IC9VbmFibGUgdG8gZmluZCBNZXRhZGF0YSBhY2NvdW50LztcblxuICAvLyBTb3J0IGJ5IGxhdGVzdCB3aXRoIHVuaXh0aW1lc3RhbXAgZnVuY3Rpb25cbiAgY29uc3Qgc29ydEJ5VWluaXhUaW1lc3RhbXAgPVxuICAgIDxUIGV4dGVuZHMgUmVndWxhck5mdE1ldGFkYXRhIHwgVG9rZW5NZXRhZGF0YT4oc29ydGFibGU6IFNvcnREaXJlY3Rpb24pID0+XG4gICAgKGE6IFQsIGI6IFQpOiBudW1iZXIgPT4ge1xuICAgICAgaWYgKCFhLm9mZmNoYWluLmNyZWF0ZWRfYXQpIHtcbiAgICAgICAgYS5vZmZjaGFpbi5jcmVhdGVkX2F0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmICghYi5vZmZjaGFpbi5jcmVhdGVkX2F0KSB7XG4gICAgICAgIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoc29ydGFibGUgPT09IFNvcnREaXJlY3Rpb24uRGVzYykge1xuICAgICAgICByZXR1cm4gYi5vZmZjaGFpbi5jcmVhdGVkX2F0IC0gYS5vZmZjaGFpbi5jcmVhdGVkX2F0O1xuICAgICAgfSBlbHNlIGlmIChzb3J0YWJsZSA9PT0gU29ydERpcmVjdGlvbi5Bc2MpIHtcbiAgICAgICAgcmV0dXJuIGEub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGIub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgLSBhLm9mZmNoYWluLmNyZWF0ZWRfYXQ7XG4gICAgICB9XG4gICAgfTtcblxuICBjb25zdCBjb252ZXJ0ZXIgPSA8VD4oXG4gICAgdG9rZW5TdGFuZGFyZDogVG9rZW5TdGFuZGFyZCxcbiAgICBtZXRhZGF0YTogTWV0YWRhdGEsXG4gICAganNvbjogT2ZmY2hhaW4sXG4gICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgKTogVCA9PiB7XG4gICAgaWYgKHRva2VuU3RhbmRhcmQgPT09IFRva2VuU3RhbmRhcmQuRnVuZ2libGUpIHtcbiAgICAgIHJldHVybiBDb252ZXJ0ZXIuVG9rZW5NZXRhZGF0YS5pbnRvVXNlcihcbiAgICAgICAge1xuICAgICAgICAgIG9uY2hhaW46IG1ldGFkYXRhLFxuICAgICAgICAgIG9mZmNoYWluOiBqc29uLFxuICAgICAgICB9LFxuICAgICAgICB0b2tlbkFtb3VudCxcbiAgICAgICkgYXMgVDtcbiAgICB9IGVsc2UgaWYgKHRva2VuU3RhbmRhcmQgPT09IFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUpIHtcbiAgICAgIHJldHVybiBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9Vc2VyKHtcbiAgICAgICAgb25jaGFpbjogbWV0YWRhdGEsXG4gICAgICAgIG9mZmNoYWluOiBqc29uLFxuICAgICAgfSkgYXMgVDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIHRva2VuU3RhbmRhcmQ6ICR7dG9rZW5TdGFuZGFyZH1gKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdlbmVyaWNGaW5kQnlPd25lciA9IGFzeW5jIDxcbiAgICBUIGV4dGVuZHMgUmVndWxhck5mdE1ldGFkYXRhIHwgVG9rZW5NZXRhZGF0YSxcbiAgPihcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNhbGxiYWNrOiAocmVzdWx0OiBSZXN1bHQ8VFtdLCBFcnJvcj4pID0+IHZvaWQsXG4gICAgdG9rZW5TdGFuZGFyZDogVG9rZW5TdGFuZGFyZCxcbiAgICBzb3J0YWJsZT86IFNvcnREaXJlY3Rpb24sXG4gICAgaXNIb2xkZXI/OiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGE6IFRbXSA9IFtdO1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkVG9rZW5BY2NvdW50c0J5T3duZXIoXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBpbmZvLnZhbHVlLmxlbmd0aCA9PT0gMCAmJiBjYWxsYmFjayhSZXN1bHQub2soW10pKTtcblxuICAgICAgZm9yIGF3YWl0IChjb25zdCBkIG9mIGluZm8udmFsdWUpIHtcbiAgICAgICAgaWYgKGlzSG9sZGVyICYmIGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50LnVpQW1vdW50IDwgMSkge1xuICAgICAgICAgIGRlYnVnTG9nKFxuICAgICAgICAgICAgJyMgZmluZEJ5T3duZXIgbm8gaG9sZCBtZXRhZGF0YTogJyxcbiAgICAgICAgICAgIGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWludCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLm1pbnQgYXMgUHVia2V5O1xuICAgICAgICBjb25zdCB0b2tlbkFtb3VudCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50XG4gICAgICAgICAgLmFtb3VudCBhcyBzdHJpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IE1ldGFkYXRhLmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgICAgICBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGRlYnVnTG9nKCcjIGZpbmRCeU93bmVyIG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG4gICAgICAgICAgLy8gdG9rZW5TdGFuZGFyZDogMChORlQpIG9yIDIgKFNQTC1UT0tFTilcbiAgICAgICAgICBpZiAobWV0YWRhdGEudG9rZW5TdGFuZGFyZCAhPT0gdG9rZW5TdGFuZGFyZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZldGNoKG1ldGFkYXRhLmRhdGEudXJpKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgLmpzb24oKVxuICAgICAgICAgICAgICAgIC50aGVuKChqc29uOiBPZmZjaGFpbikgPT4ge1xuICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZXI8VD4odG9rZW5TdGFuZGFyZCwgbWV0YWRhdGEsIGpzb24sIHRva2VuQW1vdW50KSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQub2soZGF0YSkpOyAvLyBuZWVkIHRoaXMgY2FsbCA/XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZGVzY0FsZ28gPSBzb3J0QnlVaW5peFRpbWVzdGFtcDxUPihTb3J0RGlyZWN0aW9uLkRlc2MpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgYXNjQWxnbyA9IHNvcnRCeVVpbml4VGltZXN0YW1wPFQ+KFNvcnREaXJlY3Rpb24uQXNjKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzb3J0YWJsZSA9PT0gU29ydERpcmVjdGlvbi5EZXNjKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNvcnQoZGVzY0FsZ28pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzb3J0YWJsZSA9PT0gU29ydERpcmVjdGlvbi5Bc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc29ydChhc2NBbGdvKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhkYXRhKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yICYmIFVOQUJMRV9FUlJPUl9SRUdFWC50ZXN0KGUubWVzc2FnZSkpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIHNraXAgZXJyb3IgZm9yIG9sZCBTUEwtVE9LRU46ICcsIG1pbnQpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdlbmVyaWNGaW5kQnlNaW50ID0gYXN5bmMgPFxuICAgIFQgZXh0ZW5kcyBSZWd1bGFyTmZ0TWV0YWRhdGEgfCBUb2tlbk1ldGFkYXRhLFxuICA+KFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICB0b2tlblN0YW5kYXJkOiBUb2tlblN0YW5kYXJkLFxuICApOiBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IE1ldGFkYXRhLmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICApO1xuICAgICAgZGVidWdMb2coJyMgZmluZEJ5TWludCBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgLy8gdG9rZW5TdGFuZGFyZDogMChORlQpIG9yIDIgKFNQTC1UT0tFTilcbiAgICAgIGlmIChtZXRhZGF0YS50b2tlblN0YW5kYXJkICE9PSB0b2tlblN0YW5kYXJkKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0b2tlbiBzdGFuZGFyZHMgYXJlIGRpZmZlcmVudCcpO1xuICAgICAgfVxuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkQWNjb3VudEluZm8obWludC50b1B1YmxpY0tleSgpKTtcbiAgICAgIGNvbnN0IHRva2VuQW1vdW50ID0gKGluZm8udmFsdWU/LmRhdGEgYXMgUGFyc2VkQWNjb3VudERhdGEpLnBhcnNlZC5pbmZvXG4gICAgICAgIC5zdXBwbHkgYXMgc3RyaW5nO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IChhd2FpdCAoXG4gICAgICAgIGF3YWl0IGZldGNoKG1ldGFkYXRhLmRhdGEudXJpKVxuICAgICAgKS5qc29uKCkpIGFzIE9mZmNoYWluO1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayhcbiAgICAgICAgY29udmVydGVyPFQ+KHRva2VuU3RhbmRhcmQsIG1ldGFkYXRhLCByZXNwb25zZSwgdG9rZW5BbW91bnQpLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlIGFzIEVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7T25Pa30gb25PayBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09uRXJyfSBvbkVyciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3tzb3J0YWJsZT86IFNvcnRhYmxlLCBpc0hvbGRlcj86IGJvb2xlYW59fSBvcHRpb25zP1xuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9uT2s6IE9uT2s8VG9rZW5NZXRhZGF0YT4sXG4gICAgb25FcnI6IE9uRXJyLFxuICAgIG9wdGlvbnM/OiB7IHNvcnREaXJlY3Rpb24/OiBTb3J0RGlyZWN0aW9uOyBpc0hvbGRlcj86IGJvb2xlYW4gfSxcbiAgKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc29ydGFibGUgPSAhb3B0aW9ucz8uc29ydERpcmVjdGlvblxuICAgICAgPyBTb3J0RGlyZWN0aW9uLkRlc2NcbiAgICAgIDogb3B0aW9ucz8uc29ydERpcmVjdGlvbjtcbiAgICBjb25zdCBpc0hvbGRlciA9ICFvcHRpb25zPy5pc0hvbGRlciA/IHRydWUgOiBmYWxzZTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1mbG9hdGluZy1wcm9taXNlcyAqL1xuICAgIGdlbmVyaWNGaW5kQnlPd25lcjxUb2tlbk1ldGFkYXRhPihcbiAgICAgIG93bmVyLFxuICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXN1bHQubWF0Y2goKG9rKSA9PiBvbk9rKG9rKSwgb25FcnIpO1xuICAgICAgfSxcbiAgICAgIFRva2VuU3RhbmRhcmQuRnVuZ2libGUsXG4gICAgICBzb3J0YWJsZSxcbiAgICAgIGlzSG9sZGVyLFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBtaW50IGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFRva2VuTWV0YWRhdGEsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBhd2FpdCBnZW5lcmljRmluZEJ5TWludDxUb2tlbk1ldGFkYXRhPihtaW50LCBUb2tlblN0YW5kYXJkLkZ1bmdpYmxlKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQXV0aG9yaXR5T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBGcmVlemluZyBhIHRhcmdldCBuZnRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+fSBvcHRpb25zIC8vIG9wdGlvbnNcbiAgICovXG4gIGV4cG9ydCBjb25zdCBmcmVlemUgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxBdXRob3JpdHlPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25UcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRvciB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25UcmFuc2FjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgc291cmNlVG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgZGVzdCxcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBsZXQgaW5zdDI7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcblxuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIHJldHVybiBhc3NvY2lhdGVkIHRva2VuIGFjY291bnRcbiAgICAgIGlmICghZGVzdFRva2VuLmluc3QpIHtcbiAgICAgICAgaW5zdDIgPSBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgICBzb3VyY2VUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgZGVzdFRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgICAga2V5cGFpcnMsXG4gICAgICAgICk7XG4gICAgICAgIHR4LmFkZChpbnN0Mik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZXR1cm4gaW5zdHJ1Y3Rpb24gYW5kIHVuZGVjaWRlZCBhc3NvY2lhdGVkIHRva2VuIGFjY291bnRcbiAgICAgICAgaW5zdDIgPSBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgICBzb3VyY2VUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgZGVzdFRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgICAga2V5cGFpcnMsXG4gICAgICAgICk7XG4gICAgICAgIHR4LmFkZChkZXN0VG9rZW4uaW5zdCkuYWRkKGluc3QyKTtcbiAgICAgIH1cblxuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGtleXBhaXJzLmZvckVhY2goKHNpZ25lcikgPT4ge1xuICAgICAgICB0eC5wYXJ0aWFsU2lnbihzaWduZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25UcmFuc2FjdGlvbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIEF1dGhvcml0eVR5cGUsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uLFxuICBjcmVhdGVTZXRBdXRob3JpdHlJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQsXG4gIE1JTlRfU0laRSxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5pbXBvcnQge1xuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc2hhcmVkJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IE1pbnRUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgSW5wdXRUb2tlbk1ldGFkYXRhLCBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuICBleHBvcnQgY29uc3QgY3JlYXRlRnJlZXplQXV0aG9yaXR5ID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogUHVibGljS2V5LFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBBdXRob3JpdHlUeXBlLkZyZWV6ZUFjY291bnQsXG4gICAgICBmcmVlemVBdXRob3JpdHksXG4gICAgKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgdG9rZW5NZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9IGF3YWl0IGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQoY29ubmVjdGlvbik7XG4gICAgY29uc3QgbWV0YWRhdGFQZGEgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRva2VuQXNzb2NpYXRlZCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICAgIHNwYWNlOiBNSU5UX1NJWkUsXG4gICAgICAgIGxhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBvd25lcixcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgICBvd25lcixcbiAgICAgICAgbWludCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhUGRhLFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICAgIGRhdGE6IHRva2VuTWV0YWRhdGEsXG4gICAgICAgICAgICBpc011dGFibGUsXG4gICAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBpbnN0cnVjdGlvbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNQTC1UT0tFTiBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAvLyB0b2tlbiBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gc2lnbmVyICAgICAgLy8gdG9rZW4gb3duZXIgU2VjcmV0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbEFtb3VudCAvLyB0b3RhbCBudW1iZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbnREZWNpbWFsIC8vIHRva2VuIGRlY2ltYWxcbiAgICogQHBhcmFtIHtJbnB1dFRva2VuTWV0YWRhdGF9IGlucHV0ICAgICAgIC8vIHRva2VuIG1ldGFkYXRhXG4gICAqIEBwYXJhbSB7UGFydGlhbDxNaW50T3B0aW9ucz59IG9wdGlvbnMgICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBpbnB1dDogSW5wdXRUb2tlbk1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRUcmFuc2FjdGlvbjxQdWJrZXk+LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0VG9rZW5NZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyO1xuICAgICAgaW5wdXQucm95YWx0eSA9IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IDA7XG5cbiAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCBhcyBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgICBpbnB1dC5yb3lhbHR5LFxuICAgICAgKTtcblxuICAgICAgLy8gY3JlYXRlZCBhdCBieSB1bml4IHRpbWVzdGFtcFxuICAgICAgc3RvcmFnZU1ldGFkYXRhLmNyZWF0ZWRfYXQgPSB1bml4VGltZXN0YW1wKCk7XG5cbiAgICAgIGxldCB1cmkhOiBzdHJpbmc7XG4gICAgICAvLyB1cGxvYWQgZmlsZVxuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgc3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB7IGltYWdlOiBpbnB1dC51cmkgfTtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZERhdGEoXG4gICAgICAgICAgeyAuLi5zdG9yYWdlTWV0YWRhdGEsIC4uLmltYWdlIH0sXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc011dGFibGUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuVG9rZW5NZXRhZGF0YS5pbnRvSW5mcmEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cmkpO1xuXG4gICAgICBjb25zdCBtaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBjcmVhdGVNaW50KFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRvdGFsQW1vdW50LFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZUZyZWV6ZUF1dGhvcml0eShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1pbnRUcmFuc2FjdGlvbihcbiAgICAgICAgaW5zdHMsXG4gICAgICAgIFtzaWduZXIudG9LZXlwYWlyKCksIG1pbnQudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgbWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIGlzQnJvd3NlciwgaXNOb2RlIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIElkZW50aXR5LCBUYWdzLCBVcGxvYWRhYmxlRmlsZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgUGhhbnRvbVByb3ZpZGVyIH0gZnJvbSAnfi90eXBlcy9waGFudG9tJztcbmltcG9ydCBJcnlzLCB7IFdlYklyeXMgfSBmcm9tICdAaXJ5cy9zZGsnO1xuaW1wb3J0IHsgVXBsb2FkUmVzcG9uc2UgfSBmcm9tICdAaXJ5cy9zZGsvYnVpbGQvZXNtL2NvbW1vbi90eXBlcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUHJvdmVuYW5jZUxheWVyIHtcbiAgY29uc3QgVE9LRU4gPSAnc29sYW5hJztcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChcbiAgICB1cGxvYWRGaWxlOiBGaWxlVHlwZSxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICAgdGFncz86IFRhZ3MsXG4gICk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGxldCByZWNlaXB0ITogVXBsb2FkUmVzcG9uc2U7XG4gICAgaWYgKGlzVXBsb2FkYWJsZSh1cGxvYWRGaWxlKSkge1xuICAgICAgcmVjZWlwdCA9IGF3YWl0IGlyeXMudXBsb2FkRmlsZSh1cGxvYWRGaWxlLCB7IHRhZ3MgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBmaWxlIHR5cGUgb3IgZW52aXJvbWVudCcpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7Q29uc3RhbnRzLklSWVNfR0FURVdBWV9VUkx9LyR7cmVjZWlwdC5pZH1gO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIGRhdGE6IHN0cmluZyxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICAgdGFncz86IFRhZ3MsXG4gICk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGNvbnN0IHJlY2VpcHQgPSBhd2FpdCBpcnlzLnVwbG9hZChkYXRhLCB7IHRhZ3MgfSk7XG4gICAgcmV0dXJuIGAke0NvbnN0YW50cy5JUllTX0dBVEVXQVlfVVJMfS8ke3JlY2VpcHQuaWR9YDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOb2RlYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyA9PiB7XG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc0Jyb3dzZXJhYmxlID0gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgRmlsZSA9PiB7XG4gICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGaWxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzVXBsb2FkYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFVwbG9hZGFibGVGaWxlVHlwZSA9PiB7XG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGaWxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBmdW5kQXJ3ZWF2ZSA9IGFzeW5jIChcbiAgICB1cGxvYWRGaWxlOiBGaWxlVHlwZSxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCBieXRlTGVuZ3RoID0gYXdhaXQgdG9CeXRlTGVuZ3RoKHVwbG9hZEZpbGUpO1xuICAgIGNvbnN0IHdpbGxQYXkgPSBhd2FpdCBjYWxjdWxhdGVDb3N0KGJ5dGVMZW5ndGgsIGlkZW50aXR5KTtcbiAgICBjb25zdCBmdW5kVHggPSBhd2FpdCBpcnlzLmZ1bmQoaXJ5cy51dGlscy50b0F0b21pYyh3aWxsUGF5KSk7XG4gICAgZGVidWdMb2coJyMgZnVuZFR4OiAnLCBmdW5kVHgpO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgdG9CeXRlTGVuZ3RoID0gYXN5bmMgKGNvbnRlbnQ6IEZpbGVUeXBlKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSAxMDA7XG4gICAgaWYgKGlzTm9kZWFibGUoY29udGVudCkpIHtcbiAgICAgIGxlbmd0aCA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhjb250ZW50KS5sZW5ndGg7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXJhYmxlKGNvbnRlbnQpKSB7XG4gICAgICBsZW5ndGggPSBjb250ZW50LnNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBjb250ZW50IHR5cGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldElyeXMgPSBhc3luYyA8VCBleHRlbmRzIElyeXMgfCBXZWJJcnlzPihcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICkgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIChhd2FpdCBnZXROb2RlSXJ5cyhpZGVudGl0eSBhcyBTZWNyZXQpKSBhcyBUO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZ2V0QnJvd3NlcklyeXMoaWRlbnRpdHkgYXMgUGhhbnRvbVByb3ZpZGVyKSkgYXMgVDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ09ubHkgTm9kZS5qcyBvciBCcm93c2VyJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0Tm9kZUlyeXMgPSBhc3luYyAoc2VjcmV0OiBTZWNyZXQpID0+IHtcbiAgICBjb25zdCBjbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgIH0pO1xuICAgIGNvbnN0IHVybCA9IENvbnN0YW50cy5CVU5ETFJfTkVUV09SS19VUkw7XG4gICAgY29uc3QgdG9rZW4gPSBUT0tFTjtcbiAgICBjb25zdCBrZXkgPSBzZWNyZXQ7XG4gICAgY29uc3QgaXJ5cyA9IG5ldyBJcnlzKHtcbiAgICAgIHVybCxcbiAgICAgIHRva2VuLFxuICAgICAga2V5LFxuICAgICAgY29uZmlnOiB7IHByb3ZpZGVyVXJsOiBjbHVzdGVyVXJsIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIGlyeXM7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXRCcm93c2VySXJ5cyA9IGFzeW5jIChcbiAgICBwcm92aWRlcjogUGhhbnRvbVByb3ZpZGVyLFxuICApOiBQcm9taXNlPFdlYklyeXM+ID0+IHtcbiAgICBjb25zdCBjbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgIH0pO1xuICAgIGNvbnN0IHVybCA9IENvbnN0YW50cy5CVU5ETFJfTkVUV09SS19VUkw7XG4gICAgY29uc3QgdG9rZW4gPSBUT0tFTjtcbiAgICBjb25zdCB3YWxsZXQgPSB7IHJwY1VybDogY2x1c3RlclVybCwgbmFtZTogVE9LRU4sIHByb3ZpZGVyOiBwcm92aWRlciB9O1xuICAgIGNvbnN0IHdlYklyeXMgPSBuZXcgV2ViSXJ5cyh7IHVybCwgdG9rZW4sIHdhbGxldCB9KTtcbiAgICBhd2FpdCB3ZWJJcnlzLnJlYWR5KCk7XG4gICAgcmV0dXJuIHdlYklyeXM7XG4gIH07XG5cbiAgY29uc3QgY2FsY3VsYXRlQ29zdCA9IGFzeW5jIChzaXplOiBudW1iZXIsIGlkZW50aXR5OiBJZGVudGl0eSkgPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCBwcmljZUF0b21pYyA9IGF3YWl0IGlyeXMuZ2V0UHJpY2Uoc2l6ZSk7XG4gICAgY29uc3QgcHJpY2VDb252ZXJ0ZWQgPSBpcnlzLnV0aWxzLmZyb21BdG9taWMocHJpY2VBdG9taWMpO1xuICAgIGRlYnVnTG9nKCcjIHNpemU6ICcsIHNpemUpO1xuICAgIGRlYnVnTG9nKGAjIHByaWNlOiAke3ByaWNlQ29udmVydGVkfWApO1xuICAgIHJldHVybiBwcmljZUNvbnZlcnRlZDtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQcm92ZW5hbmNlTGF5ZXIgfSBmcm9tICcuL3Byb3ZlbmFuY2UtbGF5ZXInO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEZpbGVUeXBlLCBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQXJ3ZWF2ZSB7XG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gKFxuICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGZpbGU6ICcsIGZpbGVQYXRoKTtcbiAgICAgIGF3YWl0IFByb3ZlbmFuY2VMYXllci5mdW5kQXJ3ZWF2ZShmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgICAgcmV0dXJuIGF3YWl0IFByb3ZlbmFuY2VMYXllci51cGxvYWRGaWxlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZERhdGEgPSAoXG4gICAgbWV0YWRhdGE6IE9mZmNoYWluLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgbWV0YSBkYXRhOiAnLCBtZXRhZGF0YSk7XG4gICAgICByZXR1cm4gYXdhaXQgUHJvdmVuYW5jZUxheWVyLnVwbG9hZERhdGEoXG4gICAgICAgIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKSxcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEJsb2IsIE5GVFN0b3JhZ2UgfSBmcm9tICduZnQuc3RvcmFnZSc7XG5pbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFByb3ZlbmFuY2VMYXllciB9IGZyb20gJy4vcHJvdmVuYW5jZS1sYXllcic7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5mdFN0b3JhZ2Uge1xuICBjb25zdCBjcmVhdGVHYXRld2F5VXJsID0gKGNpZDogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgYCR7Q29uc3RhbnRzLk5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMfS8ke2NpZH1gO1xuXG4gIGNvbnN0IGNvbm5lY3QgPSAoKSA9PiB7XG4gICAgQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5jYWxjdWxhdGVQcm9iYWJpbGl0eSgpICYmXG4gICAgICBjb25zb2xlLndhcm4oQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5ORlRfU1RPUkFHRV9BUElfS0VZKTtcbiAgICByZXR1cm4gbmV3IE5GVFN0b3JhZ2UoeyB0b2tlbjogQ29uc3RhbnRzLk5GVF9TVE9SQUdFX0FQSV9LRVkgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgZmlsZVR5cGU6IEZpbGVUeXBlLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQ6ICcsIGZpbGVUeXBlKTtcbiAgICAgIGxldCBmaWxlITogQnVmZmVyO1xuICAgICAgaWYgKFByb3ZlbmFuY2VMYXllci5pc05vZGVhYmxlKGZpbGVUeXBlKSkge1xuICAgICAgICBmaWxlID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVUeXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoUHJvdmVuYW5jZUxheWVyLmlzQnJvd3NlcmFibGUoZmlsZVR5cGUpKSB7XG4gICAgICAgIGZpbGUgPSBCdWZmZXIuZnJvbShhd2FpdCBmaWxlVHlwZS5hcnJheUJ1ZmZlcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZpbGUgPSBCdWZmZXIuZnJvbShmaWxlVHlwZSBhcyBBcnJheUJ1ZmZlcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJsb2JJbWFnZSA9IG5ldyBCbG9iKFtmaWxlXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JJbWFnZSk7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudFxuICAgKlxuICAgKiBAcGFyYW0ge09mZmNoYWlufSBzdG9yYWdlRGF0YVxuICAgKiB7XG4gICAqICAgbmFtZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBkZXNjcmlwdGlvbj86IHtzdHJpbmd9ICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBzZWxsZXJGZWVCYXNpc1BvaW50cz86IG51bWJlciAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgaW1hZ2U/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgIC8vIHVwbG9hZGVkIHVyaSBvZiBvcmlnaW5hbCBjb250ZW50XG4gICAqICAgZXh0ZXJuYWxfdXJsPzoge3N0cmluZ30gICAgICAgICAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzoge0pzb25NZXRhZGF0YUF0dHJpYnV0ZVtdfSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IHtKc29uTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT59IC8vIGluY2x1ZGVkIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IENvbGxlY3Rpb24gICAgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIFtrZXk6IHN0cmluZ106IHt1bmtub3dufSAgICAgICAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogfVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZERhdGEgPSBhc3luYyAoXG4gICAgc3RvcmFnZURhdGE6IE9mZmNoYWluLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGFkYXRhOiAnLCBzdG9yYWdlRGF0YSk7XG5cbiAgICAgIGNvbnN0IGJsb2JKc29uID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHN0b3JhZ2VEYXRhKV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSnNvbik7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4sIFN0b3JhZ2VUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IEFyd2VhdmUgfSBmcm9tICcuL2Fyd2VhdmUnO1xuaW1wb3J0IHsgTmZ0U3RvcmFnZSB9IGZyb20gJy4vbmZ0LXN0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0b3JhZ2Uge1xuICBleHBvcnQgY29uc3QgdG9Db252ZXJ0T2ZmY2hhaW5kYXRhID0gKFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICk6IE9mZmNoYWluID0+IHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgZGVzY3JpcHRpb246IGlucHV0LmRlc2NyaXB0aW9uLFxuICAgICAgc2VsbGVyX2ZlZV9iYXNpc19wb2ludHM6IHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgZXh0ZXJuYWxfdXJsOiBpbnB1dC5leHRlcm5hbF91cmwsXG4gICAgICBhdHRyaWJ1dGVzOiBpbnB1dC5hdHRyaWJ1dGVzLFxuICAgICAgcHJvcGVydGllczogaW5wdXQucHJvcGVydGllcyxcbiAgICAgIGltYWdlOiAnJyxcbiAgICAgIG9wdGlvbnM6IGlucHV0Lm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZEZpbGUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZEZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIGlucHV0OiBPZmZjaGFpbixcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkRGF0YShpbnB1dCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkRGF0YShpbnB1dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZCA9IGFzeW5jIChcbiAgICBpbnB1dDogT2ZmY2hhaW4sXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJyAmJiAhZmVlUGF5ZXIpIHtcbiAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICB9XG4gICAgY29uc3Qgc3RvcmFnZSA9IGF3YWl0IChcbiAgICAgIGF3YWl0IHVwbG9hZEZpbGUoZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcilcbiAgICApLnVud3JhcChcbiAgICAgIGFzeW5jIChvazogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgIHJldHVybiBhd2FpdCB1cGxvYWREYXRhKGlucHV0LCBzdG9yYWdlVHlwZSwgZmVlUGF5ZXIpO1xuICAgICAgfSxcbiAgICAgIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGlmICghc3RvcmFnZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0VtcHR5IHN0b3JhZ2Ugb2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBzdG9yYWdlO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IEF1dGhvcml0eU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVGhhd2luZyBhIHRhcmdldCBORlRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gc2V0dGVkIGZyZWV6ZSBhdXRob3JpdHkgb2YgbmZ0XG4gICAqIEBwYXJhbSB7UGFydGlhbDxBdXRob3JpdHlPcHRpb25zPn0gb3B0aW9ucyAgLy8gb3B0aW9uc1xuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRoYXcgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxBdXRob3JpdHlPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPiA9PiB7XG4gICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ldyBBY2NvdW50LktleXBhaXIoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBDYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEF1dGhvcml0eU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgdHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxBdXRob3JpdHlPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogc2lnbmVyc1swXTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5yZXRyeUdldE9yQ3JlYXRlKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgbWludCxcbiAgICAgICAgZGVzdCxcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIENhbGN1bGF0b3IuY2FsY3VsYXRlQW1vdW50KGFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKFtpbnN0XSwga2V5cGFpcnMsIHBheWVyLnRvS2V5cGFpcigpKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTcGxUb2tlbiBhcyBBZGQgfSBmcm9tICcuL2FkZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBCdXJuIH0gZnJvbSAnLi9idXJuJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZpbmQgfSBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRnJlZXplIH0gZnJvbSAnLi9mcmVlemUnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgR2FzTGVzcyB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUaGF3IH0gZnJvbSAnLi90aGF3JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgJ34vdHlwZXMvdHJhbnNhY3Rpb24nO1xuaW1wb3J0ICd+L3RyYW5zYWN0aW9uJztcblxuZXhwb3J0IGNvbnN0IFNwbFRva2VuID0ge1xuICAuLi5BZGQsXG4gIC4uLkJ1cm4sXG4gIC4uLkZpbmQsXG4gIC4uLkZyZWV6ZSxcbiAgLi4uR2FzTGVzcyxcbiAgLi4uTWludCxcbiAgLi4uVGhhdyxcbiAgLi4uVHJhbnNmZXIsXG59O1xuXG5leHBvcnQgKiBmcm9tICd+L3NoYXJlZC9leHBvcnRzJztcbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5pbXBvcnQgeyBBdXRob3JpdHlPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICBleHBvcnQgY29uc3QgYnVybiA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXI6IFNlY3JldCxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEF1dGhvcml0eU9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBmZWVQYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogc2lnbmVyO1xuICAgIHJldHVybiBTcGxUb2tlbi5idXJuKG1pbnQsIG93bmVyLCBbc2lnbmVyXSwgTkZUX0FNT1VOVCwgTkZUX0RFQ0lNQUxTLCB7XG4gICAgICBmZWVQYXllcixcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuaW1wb3J0IHsgT25FcnIsIE9uT2sgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5pbXBvcnQgeyBUb2tlblN0YW5kYXJkIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7T25Pa30gb25PayBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09uRXJyfSBvbkVyciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3tzb3J0YWJsZT86IFNvcnRhYmxlLCBpc0hvbGRlcj86IGJvb2xlYW59fSBvcHRpb25zP1xuICAgKiBAcmV0dXJuIFByb21pc2U8dm9pZD5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9uT2s6IE9uT2s8UmVndWxhck5mdE1ldGFkYXRhPixcbiAgICBvbkVycjogT25FcnIsXG4gICAgb3B0aW9ucz86IHsgc29ydGFibGU/OiBTb3J0RGlyZWN0aW9uOyBpc0hvbGRlcj86IGJvb2xlYW4gfSxcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3Qgc29ydGFibGUgPSAhb3B0aW9ucz8uc29ydGFibGVcbiAgICAgID8gU29ydERpcmVjdGlvbi5EZXNjXG4gICAgICA6IG9wdGlvbnM/LnNvcnRhYmxlO1xuICAgIGNvbnN0IGlzSG9sZGVyID0gIW9wdGlvbnM/LmlzSG9sZGVyID8gdHJ1ZSA6IGZhbHNlO1xuICAgIC8vIEhBQ0s6IGNoZWNrIHBlcmZvcm1hbmNlXG4gICAgYXdhaXQgU3BsVG9rZW4uZ2VuZXJpY0ZpbmRCeU93bmVyKFxuICAgICAgb3duZXIsXG4gICAgICAocmVzdWx0OiBSZXN1bHQ8bmV2ZXJbXSwgRXJyb3I+KSA9PiByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgaXNIb2xkZXIsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFJlZ3VsYXJOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IFNwbFRva2VuLmdlbmVyaWNGaW5kQnlNaW50KG1pbnQsIFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUpO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcblxuaW1wb3J0IHsgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBjcmVhdGVGcmVlemVEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBBdXRob3JpdHlPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICAvKipcbiAgICogRnJlZXppbmcgYSB0YXJnZXQgbmZ0XG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxBdXRob3JpdHlPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFJlc3VsdDxUcmFuc2FjdGlvbiwgRXJyb3I+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZnJlZXplID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QXV0aG9yaXR5T3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PFRyYW5zYWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgZWRpdGlvbkFkZHJlc3MgPSBBY2NvdW50LlBkYS5nZXRNYXN0ZXJFZGl0aW9uKG1pbnQpO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlRnJlZXplRGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uKHtcbiAgICAgICAgZGVsZWdhdGU6IG5ldyBBY2NvdW50LktleXBhaXIoe1xuICAgICAgICAgIHNlY3JldDogZnJlZXplQXV0aG9yaXR5LFxuICAgICAgICB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFjY291bnQ6IHRva2VuQWNjb3VudCxcbiAgICAgICAgZWRpdGlvbjogZWRpdGlvbkFkZHJlc3MsXG4gICAgICAgIG1pbnQ6IG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQXBwcm92ZUluc3RydWN0aW9uLFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQsXG4gIE1JTlRfU0laRSxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTWludFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSwgTWludE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVDcmVhdGVNYXN0ZXJFZGl0aW9uVjNJbnN0cnVjdGlvbixcbiAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbixcbiAgY3JlYXRlU2lnbk1ldGFkYXRhSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVZlcmlmeVNpemVkQ29sbGVjdGlvbkl0ZW1JbnN0cnVjdGlvbixcbiAgRGF0YVYyLFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZVZlcmlmeUNyZWF0b3IgPSAobWludDogUHVibGljS2V5LCBjcmVhdG9yOiBQdWJsaWNLZXkpID0+IHtcbiAgICBjb25zdCBtZXRhZGF0YSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgcmV0dXJuIGNyZWF0ZVNpZ25NZXRhZGF0YUluc3RydWN0aW9uKHtcbiAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YSxcbiAgICAgIGNyZWF0b3I6IGNyZWF0b3IsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZURlbGVhZ2F0ZSA9IChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBkZWxlZ2F0ZUF1dGhvcml0eTogUHVibGljS2V5LFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG5cbiAgICByZXR1cm4gY3JlYXRlQXBwcm92ZUluc3RydWN0aW9uKFxuICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgZGVsZWdhdGVBdXRob3JpdHksXG4gICAgICBvd25lcixcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uID0gKFxuICAgIGNvbGxlY3Rpb25DaGlsZDogUHVibGljS2V5LFxuICAgIGNvbGxlY3Rpb25QYXJlbnQ6IFB1YmxpY0tleSxcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApID0+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uTWV0YWRhdGEgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShcbiAgICAgIGNvbGxlY3Rpb25QYXJlbnQudG9TdHJpbmcoKSxcbiAgICApO1xuICAgIGNvbnN0IGNvbGxlY3Rpb25NYXN0ZXJFZGl0aW9uQWNjb3VudCA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24oXG4gICAgICBjb2xsZWN0aW9uUGFyZW50LnRvU3RyaW5nKCksXG4gICAgKTtcbiAgICByZXR1cm4gY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uSXRlbUluc3RydWN0aW9uKHtcbiAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb25NZXRhZGF0YSxcbiAgICAgIGNvbGxlY3Rpb25NYXN0ZXJFZGl0aW9uQWNjb3VudDogY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50LFxuICAgICAgY29sbGVjdGlvbk1pbnQ6IGNvbGxlY3Rpb25QYXJlbnQsXG4gICAgICBtZXRhZGF0YTogQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEoY29sbGVjdGlvbkNoaWxkLnRvU3RyaW5nKCkpLFxuICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgY29sbGVjdGlvbkF1dGhvcml0eTogZmVlUGF5ZXIsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgbmZ0TWV0YWRhdGE6IERhdGFWMixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICAgIGlzTXV0YWJsZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uW10+ID0+IHtcbiAgICBjb25zdCBhdGEgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG4gICAgY29uc3QgdG9rZW5NZXRhZGF0YVB1YmtleSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgbWFzdGVyRWRpdGlvblB1YmtleSA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24obWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gW107XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLFxuICAgICAgICBuZXdBY2NvdW50UHVia2V5OiBtaW50LFxuICAgICAgICBsYW1wb3J0czogYXdhaXQgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludChjb25uZWN0aW9uKSxcbiAgICAgICAgc3BhY2U6IE1JTlRfU0laRSxcbiAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24obWludCwgMCwgb3duZXIsIG93bmVyKSk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihmZWVQYXllciwgYXRhLCBvd25lciwgbWludCksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbihtaW50LCBhdGEsIG93bmVyLCAxLCAwKSk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBtZXRhZGF0YTogdG9rZW5NZXRhZGF0YVB1YmtleSxcbiAgICAgICAgICBtaW50LFxuICAgICAgICAgIG1pbnRBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY3JlYXRlTWV0YWRhdGFBY2NvdW50QXJnc1YzOiB7XG4gICAgICAgICAgICBkYXRhOiBuZnRNZXRhZGF0YSxcbiAgICAgICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICAgICAgIGNvbGxlY3Rpb25EZXRhaWxzOiBudWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgIGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgZWRpdGlvbjogbWFzdGVyRWRpdGlvblB1YmtleSxcbiAgICAgICAgICBtaW50LFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIG1ldGFkYXRhOiB0b2tlbk1ldGFkYXRhUHVia2V5LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY3JlYXRlTWFzdGVyRWRpdGlvbkFyZ3M6IHtcbiAgICAgICAgICAgIG1heFN1cHBseTogMCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBpbnN0cnVjdGlvbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50IGFuZCBORlQgbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgLy8gZmlyc3QgbWludGVkIG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBzaWduZXIgICAgICAgICAvLyBvd25lcidzIFNlY3JldFxuICAgKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gICAqIHtcbiAgICogICBuYW1lOiBzdHJpbmcgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sOiBzdHJpbmcgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBmaWxlUGF0aDogc3RyaW5nIHwgRmlsZSAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIHJveWFsdHk6IG51bWJlciAgICAgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIHN0b3JhZ2VUeXBlOiAnYXJ3ZWF2ZSd8J25mdFN0b3JhZ2UnIC8vIERlY2VudHJhbGl6ZWQgc3RvcmFnZVxuICAgKiAgIGRlc2NyaXB0aW9uPzogc3RyaW5nICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgZXh0ZXJuYWxfdXJsPzogc3RyaW5nICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiBNZXRhZGF0YUF0dHJpYnV0ZVtdICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzogTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT4gLy8gaW5jbHVkZSBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBQdWJrZXkgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIGNyZWF0b3JzPzogSW5wdXRDcmVhdG9yc1tdICAgIC8vIG90aGVyIGNyZWF0b3JzIHRoYW4gb3duZXJcbiAgICogICB1c2VzPzogVXNlcyAgICAgICAgICAgICAgICAgICAvLyB1c2FnZSBmZWF0dXJlOiBidXJuLCBzaW5nbGUsIG11bHRpcGxlXG4gICAqICAgaXNNdXRhYmxlPzogYm9vbGVhbiAgICAgICAgICAgLy8gZW5hYmxlIHVwZGF0ZSgpXG4gICAqICAgb3B0aW9ucz86IFtrZXk6IHN0cmluZ10/OiB1bmtub3duICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEBwYXJhbSB7UGFydGlhbDxNaW50T3B0aW9ucz59IG9wdGlvbnMgICAgICAgICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8TWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRUcmFuc2FjdGlvbjxQdWJrZXk+LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgZmVlUGF5ZXIsIGZyZWV6ZUF1dGhvcml0eSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IHNpZ25lcjtcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG5cbiAgICAgIC8vIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50XG4gICAgICBsZXQgcHJvcGVydGllcztcbiAgICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0ID0ge1xuICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IENvbnZlcnRlci5Sb3lhbHR5LmludG9JbmZyYShpbnB1dC5yb3lhbHR5KTtcbiAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgICAgLy8gdXBsb2FkZWQgZmlsZVxuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB7IGltYWdlOiBpbnB1dC51cmkgfTtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZERhdGEoXG4gICAgICAgICAgeyAuLi5zdG9yYWdlTWV0YWRhdGEsIC4uLmltYWdlIH0sXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG5cbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGF3YWl0IGNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgICBjcmVhdGVEZWxlYWdhdGUoXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gY29sbGVjdGlvbiAtLS1cbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZVZlcmlmeVNpemVkQ29sbGVjdGlvbihcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGlucHV0LmNvbGxlY3Rpb24udG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBrZXlwYWlycyA9IFtzaWduZXIudG9LZXlwYWlyKCksIG1pbnQudG9LZXlwYWlyKCldO1xuXG4gICAgICAvLyBjcmVhdG9yIC0tLVxuICAgICAgaWYgKGlucHV0LmNyZWF0b3JzKSB7XG4gICAgICAgIGlucHV0LmNyZWF0b3JzLmZvckVhY2goKGNyZWF0b3IpID0+IHtcbiAgICAgICAgICBpZiAoQWNjb3VudC5LZXlwYWlyLmlzU2VjcmV0KGNyZWF0b3Iuc2VjcmV0KSkge1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvclB1YmtleSA9IGNyZWF0b3IuYWRkcmVzcy50b1B1YmxpY0tleSgpO1xuICAgICAgICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVZlcmlmeUNyZWF0b3IobWludC50b1B1YmxpY0tleSgpLCBjcmVhdG9yUHVia2V5KTtcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5wdXNoKGluc3QpO1xuICAgICAgICAgICAga2V5cGFpcnMucHVzaChjcmVhdG9yLnNlY3JldC50b0tleXBhaXIoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNaW50VHJhbnNhY3Rpb24oXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgR2FzTGVzc01pbnRPcHRpb25zLCBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFBhcnRpYWxTaWduVHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnQgYW5kIE5GVCBtaW50IHdpdGggUGFydGlhbCBTaWduXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAvLyBmaXJzdCBtaW50ZWQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IHNpZ25lciAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7VXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YX0gaW5wdXRcbiAgICoge1xuICAgKiAgIG5hbWU6IHN0cmluZyAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w6IHN0cmluZyAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGZpbGVQYXRoOiBzdHJpbmcgfCBGaWxlICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgcm95YWx0eTogbnVtYmVyICAgICAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgc3RvcmFnZVR5cGU6ICdhcndlYXZlJ3wnbmZ0U3RvcmFnZScgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqICAgY3JlYXRvcnM/OiBJbnB1dENyZWF0b3JzW10gICAgICAgICAgLy8gb3RoZXIgY3JlYXRvcnMgdGhhbiBvd25lclxuICAgKiAgIHVzZXM/OiBVc2VzICAgICAgICAgICAgICAgICAgIC8vIHVzYWdlIGZlYXR1cmU6IGJ1cm4sIHNpbmdsZSwgbXVsdGlwbGVcbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogfVxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXIgICAgICAgIC8vIGZlZSBwYXllclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8R2FzTGVzc01pbnRPcHRpb25zPn0gb3B0aW9ucyAgICAgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnbkluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZ2FzTGVzc01pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8R2FzTGVzc01pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblRyYW5zYWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gQ29udmVydGVyLlJveWFsdHkuaW50b0luZnJhKGlucHV0LnJveWFsdHkpO1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCB1cmkgPSAnJztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydGVyLlByb3BlcnRpZXMuaW50b0luZnJhKFxuICAgICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgICAgU3RvcmFnZS51cGxvYWRGaWxlLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICAgIHsgLi4uaW5wdXQsIHByb3BlcnRpZXMgfSxcbiAgICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgKTtcblxuICAgICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgdXJpID0gaW5wdXQudXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG5cbiAgICAgIGxldCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuICAgICAgbGV0IGNvbGxlY3Rpb247XG4gICAgICBpZiAoaW5wdXQuY29sbGVjdGlvbiAmJiBpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24gPSBDb252ZXJ0ZXIuQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbik7XG4gICAgICAgIGRhdGF2MiA9IHsgLi4uZGF0YXYyLCBjb2xsZWN0aW9uIH07XG4gICAgICB9XG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBzZWxsZXJGZWVCYXNpc1BvaW50czogJywgc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBtaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBNaW50LmNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChvcHRpb25zLmZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIE1pbnQuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG9wdGlvbnMuZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbih7XG4gICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgIGJsb2NraGFzaDogYmxvY2toYXNoT2JqLmJsb2NraGFzaCxcbiAgICAgICAgZmVlUGF5ZXI6IGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcblxuICAgICAgaW5zdHMuZm9yRWFjaCgoaW5zdCkgPT4gdHguYWRkKGluc3QpKTtcbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICBbc2lnbmVyLCBtaW50XS5mb3JFYWNoKChzaWduZXIpID0+IHR4LnBhcnRpYWxTaWduKHNpZ25lci50b0tleXBhaXIoKSkpO1xuXG4gICAgICBjb25zdCBzZXJpYWxpemVkVHggPSB0eC5zZXJpYWxpemUoe1xuICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGhleCA9IHNlcmlhbGl6ZWRUeC50b1N0cmluZygnaGV4Jyk7XG4gICAgICByZXR1cm4gbmV3IFBhcnRpYWxTaWduVHJhbnNhY3Rpb24oaGV4LCBtaW50LnB1YmtleSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25UcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGZlZVBheWVyOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduVHJhbnNhY3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBTcGxUb2tlbi5nYXNMZXNzVHJhbnNmZXIoXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBkZXN0LFxuICAgICAgc2lnbmVycyxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBmZWVQYXllcixcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVNldENvbGxlY3Rpb25TaXplSW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdG9yYWdlJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IE1pbnRUcmFuc2FjdGlvbiB9IGZyb20gJ34vdHJhbnNhY3Rpb24nO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBNaW50Q29sbGVjdGlvbk9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuLyoqXG4gKiBjcmVhdGUgYSBjb2xsZWN0aW9uXG4gKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gKlxuICogQHBhcmFtIHtmZWVQYXllcn0gU2VjcmV0XG4gKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGV4cG9ydCBjb25zdCBERUZBVUxUX0NPTExFQ1RJT05fU0laRSA9IDA7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuICBleHBvcnQgY29uc3QgbWludENvbGxlY3Rpb24gPSAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRDb2xsZWN0aW9uT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFRyYW5zYWN0aW9uPFB1YmtleT4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8SW5wdXROZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGZyZWV6ZUF1dGhvcml0eSwgZmVlUGF5ZXIsIGNvbGxlY3Rpb25TaXplIH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyO1xuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcblxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG4gICAgICBsZXQgcHJvcGVydGllcztcbiAgICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0ID0ge1xuICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgIH07XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoaW5wdXQsIDApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCAmJiBpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB7IGltYWdlOiBpbnB1dC51cmkgfTtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZERhdGEoXG4gICAgICAgICAgeyAuLi5zdG9yYWdlTWV0YWRhdGEsIC4uLmltYWdlIH0sXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShpbnB1dCwgdXJpLCAwKTtcblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBjb2xsZWN0aW9uTWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YUFjY291bnQgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShcbiAgICAgICAgY29sbGVjdGlvbk1pbnQucHVia2V5LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXdhaXQgTWludC5jcmVhdGVNaW50KFxuICAgICAgICBjb2xsZWN0aW9uTWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICAgIE1pbnQuY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICAgICAgY29sbGVjdGlvbk1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb2xsZWN0aW9ucyA9IHtcbiAgICAgICAgY29sbGVjdGlvbk1ldGFkYXRhOiBjb2xsZWN0aW9uTWV0YWRhdGFBY2NvdW50LFxuICAgICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5OiBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGNvbGxlY3Rpb25NaW50OiBjb2xsZWN0aW9uTWludC50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICB9O1xuXG4gICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgY3JlYXRlU2V0Q29sbGVjdGlvblNpemVJbnN0cnVjdGlvbihjb2xsZWN0aW9ucywge1xuICAgICAgICAgIHNldENvbGxlY3Rpb25TaXplQXJnczoge1xuICAgICAgICAgICAgc2l6ZTogY29sbGVjdGlvblNpemUgfHwgREVGQVVMVF9DT0xMRUNUSU9OX1NJWkUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IE1pbnRUcmFuc2FjdGlvbihcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICBbc2lnbmVyLnRvS2V5cGFpcigpLCBjb2xsZWN0aW9uTWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBjb2xsZWN0aW9uTWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICd+L3RyYW5zYWN0aW9uJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBjcmVhdGVUaGF3RGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IEF1dGhvcml0eU9wdGlvbnMgfSBmcm9tICcuLi8uLi90eXBlcy9zcmMvc2hhcmVkL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtBdXRob3JpdHlPcHRpb25zfSBvcHRpb25zICAgICAgICAgIC8vIG9wdGlvbnNcbiAgICovXG4gIGV4cG9ydCBjb25zdCB0aGF3ID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QXV0aG9yaXR5T3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PFRyYW5zYWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgZWRpdGlvbkFkZHJlc3MgPSBBY2NvdW50LlBkYS5nZXRNYXN0ZXJFZGl0aW9uKG1pbnQpO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVGhhd0RlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbih7XG4gICAgICAgIGRlbGVnYXRlOiBuZXcgQWNjb3VudC5LZXlwYWlyKHtcbiAgICAgICAgICBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSxcbiAgICAgICAgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG9rZW5BY2NvdW50OiB0b2tlbkFjY291bnQsXG4gICAgICAgIGVkaXRpb246IGVkaXRpb25BZGRyZXNzLFxuICAgICAgICBtaW50OiBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBBdXRob3JpdHlPcHRpb25zIH0gZnJvbSAnLi4vLi4vdHlwZXMvc3JjL3NoYXJlZC9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICBleHBvcnQgY29uc3QgdHJhbnNmZXIgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QXV0aG9yaXR5T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBTcGxUb2tlbi50cmFuc2ZlcihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIGRlc3QsXG4gICAgICBzaWduZXJzLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICAgIE5GVF9ERUNJTUFMUyxcbiAgICAgIG9wdGlvbnMsXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgRnJlZXplIH0gZnJvbSAnLi9mcmVlemUnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBHYXNMZXNzTWludCB9IGZyb20gJy4vZ2FzLWxlc3MtbWludCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEdhc0xlc3NUcmFuc2ZlciB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludENvbGxlY3Rpb24gfSBmcm9tICcuL21pbnQtY29sbGVjdGlvbic7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0ICd+L3R5cGVzL3RyYW5zYWN0aW9uJztcbmltcG9ydCAnfi90cmFuc2FjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBSZWd1bGFyTmZ0ID0ge1xuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkdhc0xlc3NNaW50LFxuICAuLi5HYXNMZXNzVHJhbnNmZXIsXG4gIC4uLk1pbnQsXG4gIC4uLk1pbnRDb2xsZWN0aW9uLFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG5cbmV4cG9ydCAqIGZyb20gJ34vc2hhcmVkL2V4cG9ydHMnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsc0NBQXNDOzs7QUNBL0MsU0FBcUIsaUJBQWlCO0FBQ3RDLE9BQU8sc0JBQXNCO0FBRTdCLElBQUksU0FBUztBQUVOLElBQVU7QUFBQSxDQUFWLENBQVVBLGVBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMscUJBQVY7QUFDTCxVQUFNLGFBQWE7QUFDbkIsUUFBSSxZQUFZO0FBQ1QsSUFBTUEsaUJBQUEsc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzVCLElB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QU1BLGFBQUEsV0FBVyxDQUN0QixNQUNBLE9BQ0EsTUFDQSxTQUNBLFVBQXFDLENBQUMsTUFDRTtBQUN4QyxXQUFPQyxXQUFTO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsR0FwQmVELDhCQUFBOzs7QUNNVixJQUFNRSxlQUFhO0FBQUEsRUFDeEIsR0FBRztBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQ0w7IiwKICAibmFtZXMiOiBbIkNvbnN0YW50cyIsICJXYXJubmluZ01lc3NhZ2UiLCAiQ2x1c3RlciIsICJFbmRQb2ludFVybCIsICJCdW5kbHJVcmwiLCAiRGFzQXBpVXJsIiwgIk5mdHN0b3JhZ2VBcGlLZXkiLCAiY3VzdG9tQ2x1c3RlclVybCIsICJ1cmxzIiwgImluZGV4IiwgIlJlc3VsdCIsICJOb2RlIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAiVHgiLCAiVHgiLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgIlR4IiwgIlR4IiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAiVHgiLCAiVHgiLCAiS2V5cGFpciIsICJQdWJsaWNLZXkiLCAiUHVibGljS2V5IiwgIktleXBhaXIiLCAiUHVibGljS2V5IiwgImJzIiwgIkFjY291bnQiLCAiS2V5cGFpciIsICJBY2NvdW50IiwgIkFzc29jaWF0ZWQiLCAiUHVibGljS2V5IiwgIkFjY291bnQiLCAiUGRhIiwgIkFjY291bnQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29sbGVjdGlvbk1pbnQiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnZlcnRlciIsICJSb3lhbHR5IiwgIkNvbnZlcnRlciIsICJDb21wcmVzc2VkTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb25EZXRhaWxzIiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJSZWd1bGFyTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlByb3BlcnRpZXMiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXIiLCAiQ29udmVydGVyIiwgIlZhbGlkYXRvciIsICJNZXNzYWdlIiwgIkNvbnZlcnRlciIsICJGaWx0ZXJUeXBlIiwgIk1vZHVsZU5hbWUiLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiU3BsVG9rZW4iLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiVG9rZW5TdGFuZGFyZCIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIlNwbFRva2VuIiwgIkNvbnZlcnRlciIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJTcGxUb2tlbiIsICJUcmFuc2FjdGlvbiIsICJTcGxUb2tlbiIsICJUcmFuc2FjdGlvbiIsICJjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiUHJvdmVuYW5jZUxheWVyIiwgInVwbG9hZEZpbGUiLCAiQXJ3ZWF2ZSIsICJOZnRTdG9yYWdlIiwgIlN0b3JhZ2UiLCAiU3BsVG9rZW4iLCAibWludCIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJUT0tFTl9QUk9HUkFNX0lEIiwgImNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbiIsICJjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24iLCAiQ29udmVydGVyIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlNwbFRva2VuIiwgImNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIiwgIlNwbFRva2VuIiwgImNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIiwgIlNwbFRva2VuIiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiVG9rZW5TdGFuZGFyZCIsICJSZWd1bGFyTmZ0IiwgIlNwbFRva2VuIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlJlZ3VsYXJOZnQiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiU3lzdGVtUHJvZ3JhbSIsICJjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbiIsICJjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24iLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCIsICJNSU5UX1NJWkUiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uIiwgIlJlZ3VsYXJOZnQiLCAibWludCIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJTeXN0ZW1Qcm9ncmFtIiwgImdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQiLCAiTUlOVF9TSVpFIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbiIsICJjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIiwgIkNvbnZlcnRlciIsICJUcmFuc2FjdGlvbiIsICJSZWd1bGFyTmZ0IiwgIkNvbnZlcnRlciIsICJzaWduZXIiLCAiUmVndWxhck5mdCIsICJTcGxUb2tlbiIsICJSZWd1bGFyTmZ0IiwgIkNvbnZlcnRlciIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJSZWd1bGFyTmZ0IiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiUmVndWxhck5mdCJdCn0K