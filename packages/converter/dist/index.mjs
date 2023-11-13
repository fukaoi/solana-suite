// src/collection.ts
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
})(Converter || (Converter = {}));

// src/collection-details.ts
var Converter2;
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
})(Converter2 || (Converter2 = {}));

// src/creators.ts
var Converter3;
((Converter15) => {
  let Creators;
  ((Creators2) => {
    Creators2.intoInfra = (input) => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        let modify = null;
        modify = {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: false
        };
        return modify;
      });
    };
    Creators2.intoCompressedNftInfra = (input) => {
      if (!input) {
        return [];
      }
      return input.map((data) => {
        let modify;
        modify = {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: false
        };
        return modify;
      });
    };
    Creators2.intoUser = (output) => {
      if (!output) {
        return void 0;
      }
      return output.map((data) => {
        const modify = {
          address: data.address.toString(),
          share: data.share,
          verified: data.verified
        };
        return modify;
      });
    };
  })(Creators = Converter15.Creators || (Converter15.Creators = {}));
})(Converter3 || (Converter3 = {}));

// src/uses.ts
var Converter4;
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
})(Converter4 || (Converter4 = {}));

// ../shared/src/constants.ts
import { PublicKey } from "@solana/web3.js";
import Config from "@solana-suite/config";
var Constants;
((Constants2) => {
  Constants2.currentCluster = Config.cluster.type;
  Constants2.customClusterUrl = Config.cluster.customClusterUrl;
  Constants2.isDebugging = Config.debugging;
  Constants2.nftStorageApiKey = Config.nftstorage.apikey;
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
      case "devnet" /* dev */:
      case "testnet" /* test */:
      case "localhost-devnet" /* localhost */:
        return "https://devnet.irys.xyz";
      default: {
        const index = Date.now() % 2;
        const clusters = ["https://node1.irys.xyz", "https://node2.irys.xyz"];
        return clusters[index];
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
  Constants2.NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
  Constants2.NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
  Constants2.IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
  Constants2.BUNDLR_NETWORK_URL = (0, Constants2.switchBundlr)(Config.cluster.type);
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
  async submit() {
    try {
      const instruction = this.unwrap();
      if (instruction.instructions && instruction.signers) {
        return await instruction.submit();
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
    debugLog("# [Before] setted:", setted);
    debugLog(
      "# [Before] Constants.customClusterUrl:",
      Constants.customClusterUrl
    );
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
    debugLog("# [After] setted:", setted);
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
  static submit = async (arr) => {
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
    return BatchTransaction.submit(instructions);
  });
};

// ../transaction/src/default.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction2,
  Transaction as Tx2
} from "@solana/web3.js";
var Transaction = class _Transaction {
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
        maxRetries: MAX_RETRIES
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
    return BatchTransaction.submit(instructions);
  });
};

// ../transaction/src/mint.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction3,
  Transaction as Tx3
} from "@solana/web3.js";

// ../transaction/src/partial-sign.ts
import {
  Transaction as Tx4
} from "@solana/web3.js";

// ../global/src/index.ts
import { Keypair as Keypair3, LAMPORTS_PER_SOL, PublicKey as PublicKey2 } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import bs from "bs58";
String.prototype.toExplorerUrl = function(explorer = "solscan" /* Solscan */) {
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
  if (Account.Keypair.isPubkey(addressOrSignature)) {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `https://solana.fm/address/${addressOrSignature}?cluster=${cluster}`;
    } else {
      url = `https://solscan.io/account/${addressOrSignature}?cluster=${cluster}`;
    }
  } else {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `https://solana.fm/tx/${addressOrSignature}?cluster=${cluster}`;
    } else {
      url = `https://solscan.io/tx/${addressOrSignature}?cluster=${cluster}`;
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
      } else if (royalty > Validator2.ROYALTY_MAX * Converter5.Royalty.THRESHOLD) {
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

// src/token-metadata.ts
var Converter6;
((Converter15) => {
  let TokenMetadata;
  ((TokenMetadata2) => {
    TokenMetadata2.intoInfra = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter3.Creators.intoInfra(input.creators),
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
        creators: Converter3.Creators.intoUser(output.onchain.data.creators),
        uses: Converter4.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Converter15.TokenMetadata || (Converter15.TokenMetadata = {}));
})(Converter6 || (Converter6 = {}));

// src/compressed-nft-metadata.ts
import { TokenProgramVersion, TokenStandard } from "mpl-bubblegum-instruction";
var Converter7;
((Converter15) => {
  let CompressedNftMetadata;
  ((CompressedNftMetadata2) => {
    CompressedNftMetadata2.intoInfra = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter3.Creators.intoCompressedNftInfra(input.creators),
        collection: Converter.Collection.intoInfra(input.collection),
        uses: input.uses || null,
        primarySaleHappened: false,
        isMutable: input.isMutable ?? false,
        editionNonce: 0,
        tokenStandard: TokenStandard.NonFungible,
        tokenProgramVersion: TokenProgramVersion.Original
      };
    };
    CompressedNftMetadata2.intoUser = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: Converter6.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: Converter6.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol
        ),
        tokenAmount,
        uri: Converter6.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: Converter3.Creators.intoUser(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Converter.Collection.intoUser(output.onchain.collection),
        collectionDetails: Converter2.CollectionDetails.intoUser(
          output.onchain.collectionDetails
        ),
        uses: Converter4.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(CompressedNftMetadata = Converter15.CompressedNftMetadata || (Converter15.CompressedNftMetadata = {}));
})(Converter7 || (Converter7 = {}));

// src/memo.ts
var Converter8;
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
})(Converter8 || (Converter8 = {}));

// src/mint.ts
var Converter9;
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
})(Converter9 || (Converter9 = {}));

// src/regular-nft-metadata.ts
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
        creators: Converter3.Creators.intoInfra(input.creators),
        collection: Converter.Collection.intoInfra(input.collection),
        uses: input.uses || null
      };
    };
    RegularNftMetadata2.intoUser = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: Converter6.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: Converter6.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol
        ),
        tokenAmount,
        uri: Converter6.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: Converter3.Creators.intoUser(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Converter.Collection.intoUser(output.onchain.collection),
        collectionDetails: Converter2.CollectionDetails.intoUser(
          output.onchain.collectionDetails
        ),
        uses: Converter4.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(RegularNftMetadata = Converter15.RegularNftMetadata || (Converter15.RegularNftMetadata = {}));
})(Converter10 || (Converter10 = {}));

// src/properties.ts
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

// src/royalty.ts
var Converter12;
((Converter15) => {
  let Royalty;
  ((Royalty2) => {
    Royalty2.THRESHOLD = 100;
    Royalty2.intoInfra = (percentage) => {
      return percentage * Royalty2.THRESHOLD;
    };
  })(Royalty = Converter15.Royalty || (Converter15.Royalty = {}));
})(Converter12 || (Converter12 = {}));

// src/transfer-checked.ts
var Converter13;
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
})(Converter13 || (Converter13 = {}));

// src/transfer.ts
var Converter14;
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
})(Converter14 || (Converter14 = {}));

// src/index.ts
var Converter5 = {
  ...Converter7,
  ...Converter,
  ...Converter3,
  ...Converter8,
  ...Converter9,
  ...Converter10,
  ...Converter11,
  ...Converter12,
  ...Converter6,
  ...Converter13,
  ...Converter14,
  ...Converter4
};
export {
  Converter5 as Converter
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vc3JjL2NvbGxlY3Rpb24tZGV0YWlscy50cyIsICIuLi9zcmMvY3JlYXRvcnMudHMiLCAiLi4vc3JjL3VzZXMudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9yZXN1bHQudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9zaGFyZWQudHMiLCAiLi4vLi4vbm9kZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24vc3JjL2JhdGNoLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uL3NyYy9kZWZpbmUudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24vc3JjL2RlZmF1bHQudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24vc3JjL21pbnQudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24vc3JjL3BhcnRpYWwtc2lnbi50cyIsICIuLi8uLi9nbG9iYWwvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2Fzc29jaWF0ZWQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMva2V5cGFpci50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9wZGEudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdmFsaWRhdG9yL3NyYy9pbmRleC50cyIsICIuLi9zcmMvdG9rZW4tbWV0YWRhdGEudHMiLCAiLi4vc3JjL2NvbXByZXNzZWQtbmZ0LW1ldGFkYXRhLnRzIiwgIi4uL3NyYy9tZW1vLnRzIiwgIi4uL3NyYy9taW50LnRzIiwgIi4uL3NyYy9yZWd1bGFyLW5mdC1tZXRhZGF0YS50cyIsICIuLi9zcmMvcHJvcGVydGllcy50cyIsICIuLi9zcmMvcm95YWx0eS50cyIsICIuLi9zcmMvdHJhbnNmZXItY2hlY2tlZC50cyIsICIuLi9zcmMvdHJhbnNmZXIudHMiLCAiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBJbnRlcm5hbENvbGxlY3Rpb24gfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBDb2xsZWN0aW9uLCBJbnB1dENvbGxlY3Rpb24sIE9wdGlvbiB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbiB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDb2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGlucHV0LnRvUHVibGljS2V5KCksXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4sXG4gICAgKTogQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiBvdXRwdXQua2V5LnRvU3RyaW5nKCksXG4gICAgICAgIHZlcmlmaWVkOiBvdXRwdXQudmVyaWZpZWQsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb2xsZWN0aW9uRGV0YWlscyBhcyBNZXRhcGxleENvbGxlY3Rpb25EZXRhaWxzIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IENvbGxlY3Rpb25EZXRhaWxzLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb25EZXRhaWxzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxNZXRhcGxleENvbGxlY3Rpb25EZXRhaWxzPixcbiAgICApOiBDb2xsZWN0aW9uRGV0YWlscyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBfX2tpbmQ6IG91dHB1dC5fX2tpbmQsXG4gICAgICAgIHNpemU6IHBhcnNlSW50KG91dHB1dC5zaXplLnRvU3RyaW5nKDEwKSksXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDcmVhdG9ycywgSW5wdXRDcmVhdG9ycywgT3B0aW9uIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IG1vZGlmeTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnM+ID0gbnVsbDtcbiAgICAgICAgbW9kaWZ5ID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbW9kaWZ5O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvQ29tcHJlc3NlZE5mdEluZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IEludGVybmFsQ3JlYXRvcnNbXSA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dCEubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGxldCBtb2RpZnk6IEludGVybmFsQ3JlYXRvcnM7XG4gICAgICAgIG1vZGlmeSA9IHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG1vZGlmeTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+LFxuICAgICk6IENyZWF0b3JzW10gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgbW9kaWZ5ID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1N0cmluZygpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBkYXRhLnZlcmlmaWVkLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbW9kaWZ5O1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IE9wdGlvbiwgVXNlcyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVXNlcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChvdXRwdXQ6IE9wdGlvbjxVc2VzPik6IFVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbW1pdG1lbnQsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgY29uc3QgY3VycmVudENsdXN0ZXIgPSBDb25maWcuY2x1c3Rlci50eXBlO1xuICBleHBvcnQgY29uc3QgY3VzdG9tQ2x1c3RlclVybCA9IENvbmZpZy5jbHVzdGVyLmN1c3RvbUNsdXN0ZXJVcmw7XG4gIGV4cG9ydCBjb25zdCBpc0RlYnVnZ2luZyA9IENvbmZpZy5kZWJ1Z2dpbmc7XG4gIGV4cG9ydCBjb25zdCBuZnRTdG9yYWdlQXBpS2V5ID0gQ29uZmlnLm5mdHN0b3JhZ2UuYXBpa2V5O1xuXG4gIGV4cG9ydCBlbnVtIENsdXN0ZXIge1xuICAgIHByZCA9ICdtYWlubmV0LWJldGEnLFxuICAgIHByZE1ldGFwbGV4ID0gJ21haW5uZXQtYmV0YS1tZXRhcGxleCcsXG4gICAgZGV2ID0gJ2Rldm5ldCcsXG4gICAgdGVzdCA9ICd0ZXN0bmV0JyxcbiAgICBsb2NhbGhvc3QgPSAnbG9jYWxob3N0LWRldm5ldCcsXG4gIH1cblxuICBleHBvcnQgZW51bSBFbmRQb2ludFVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vYXBpLm1haW5uZXQtYmV0YS5zb2xhbmEuY29tJyxcbiAgICBwcmRNZXRhcGxleCA9ICdodHRwczovL2FwaS5tZXRhcGxleC5zb2xhbmEuY29tJyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICAgIHRlc3QgPSAnaHR0cHM6Ly9hcGkudGVzdG5ldC5zb2xhbmEuY29tJyxcbiAgICBsb2NhbGhvc3QgPSAnaHR0cDovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gIH1cblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQ2x1c3RlciA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB7IGNsdXN0ZXI6IGVudiwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG5cbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIHVybCwgbW9zdCBwcmlvcml0eVxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsICYmIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGg7XG4gICAgICByZXR1cm4gY3VzdG9tQ2x1c3RlclVybFtpbmRleF07XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXg6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkTWV0YXBsZXg7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnRlc3Q6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwubG9jYWxob3N0O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQnVuZGxyID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnRlc3Q6XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLmxvY2FsaG9zdDpcbiAgICAgICAgcmV0dXJuICdodHRwczovL2Rldm5ldC5pcnlzLnh5eic7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIDI7XG4gICAgICAgIGNvbnN0IGNsdXN0ZXJzID0gWydodHRwczovL25vZGUxLmlyeXMueHl6JywgJ2h0dHBzOi8vbm9kZTIuaXJ5cy54eXonXTtcbiAgICAgICAgcmV0dXJuIGNsdXN0ZXJzW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IFdSQVBQRURfVE9LRU5fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ1NvMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTInLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVNT19QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnTWVtbzFVaGtKUmZIeXZMTWNWdWNKd3hYZXVENzI4RXFWRER3UUR4Rk1ObycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRVRBUExFWF9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnbWV0YXFieHhVZXJkcTI4Y2oxUmJBV2tZUW0zeWJ6amI2YThidDUxOHgxcycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBDT01NSVRNRU5UOiBDb21taXRtZW50ID0gJ2NvbmZpcm1lZCc7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID1cbiAgICAnZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKa2FXUTZaWFJvY2pvd2VFUkdNamN5TjJWa09EWmhSR1UxUlRNeVpEWkRaRUpsT0RjMFl6UkZORGxFT0RZMU9XWm1PRU1pTENKcGMzTWlPaUp1Wm5RdGMzUnZjbUZuWlNJc0ltbGhkQ0k2TVRZeU1ESTJORGswTXpjd05pd2libUZ0WlNJNkltUmxiVzhpZlEuZDRKNzBtaWt4UkI4YTV2d051NlNPNUhEQThKYXVldXNlQWo3UV95dE1DRSc7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9HQVRFV0FZX1VSTCA9ICdodHRwczovL2lwZnMuaW8vaXBmcyc7XG4gIGV4cG9ydCBjb25zdCBJUllTX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vZ2F0ZXdheS5pcnlzLnh5eic7XG4gIGV4cG9ydCBjb25zdCBCVU5ETFJfTkVUV09SS19VUkwgPSBzd2l0Y2hCdW5kbHIoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG59XG4iLCAiLy8gZm9ya2VkOiBodHRwczovL2dpdGh1Yi5jb20vYmFkcmFwL3Jlc3VsdCwgdGhhbmsgeW91IGFkdmljZSAgQGp2aWlkZVxuaW1wb3J0IHsgVHJhbnNhY3Rpb25TaWduYXR1cmUgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3I+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG5cbiAgdW53cmFwKCk6IFQ7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogVTtcbiAgdW53cmFwPFUsIFY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBWKTogVSB8IFY7XG4gIC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDEwXG4gIC8vIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVSk6IFU7XG4gIHVud3JhcChvaz86ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiB1bmtub3duKTogdW5rbm93biB7XG4gICAgY29uc3QgciA9IHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sgPyBvayh2YWx1ZSkgOiB2YWx1ZSksXG4gICAgICAoZXJyb3IpID0+IChlcnIgPyBSZXN1bHQub2soZXJyKGVycm9yKSkgOiBSZXN1bHQuZXJyKGVycm9yKSksXG4gICAgKTtcbiAgICBpZiAoci5pc0Vycikge1xuICAgICAgdGhyb3cgci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHIudmFsdWU7XG4gIH1cblxuICAvLy8vIG1hcCAvLy8vXG4gIG1hcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogUmVzdWx0PFUsIEU+O1xuICBtYXA8VSwgRiBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBVLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBGLFxuICApOiBSZXN1bHQ8VSwgRj47XG4gIG1hcChvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IEVycm9yKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVyciA/IGVycihlcnJvcikgOiBlcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLy8gY2hhaW4gLy8vL1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDM3XG4gIC8vIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgRT5cbiAgUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG4gIGNoYWluKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDx1bmtub3duPixcbiAgICBlcnI/OiAoZXJyb3I6IEUpID0+IFJlc3VsdDx1bmtub3duPixcbiAgKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4ob2ssIGVyciB8fCAoKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycm9yKSkpO1xuICB9XG5cbiAgLy8vLyBtYXRjaCAvLy8vXG4gIG1hdGNoPFUsIEY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBGKTogdm9pZCB8IFByb21pc2U8dm9pZD47XG5cbiAgbWF0Y2goXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93bixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gdW5rbm93bixcbiAgKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIoZXJyb3IpIGFzIEVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vIHN1Ym1pdCAoYWxpYXMgSW5zdHJ1Y3Rpb24uc3VibWl0KSAvLy8vXG4gIGFzeW5jIHN1Ym1pdCgpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgICAgIGNvbnN0IGluc3RydWN0aW9uID0gdGhpcy51bndyYXAoKSBhcyBhbnk7XG4gICAgICBpZiAoaW5zdHJ1Y3Rpb24uaW5zdHJ1Y3Rpb25zICYmIGluc3RydWN0aW9uLnNpZ25lcnMpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGluc3RydWN0aW9uLnN1Ym1pdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoJ09ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0JykpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZXJyIGFzIEVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxPazxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gdHJ1ZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgdmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgX2VycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xuICB9XG59XG5cbmNsYXNzIEludGVybmFsRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSBmYWxzZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSB0cnVlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSBlcnJvcjogRSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgX29rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBSZXN1bHQge1xuICBleHBvcnQgdHlwZSBPazxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxPazxULCBFPjtcbiAgZXhwb3J0IHR5cGUgRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbEVycjxULCBFPjtcblxuICBleHBvcnQgZnVuY3Rpb24gb2s8VCwgRSBleHRlbmRzIEVycm9yPih2YWx1ZTogVCk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbE9rKHZhbHVlKTtcbiAgfVxuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcj86IEUpOiBSZXN1bHQ8VCwgRT47XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yOiBFKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsRXJyKGVycm9yIHx8IEVycm9yKCkpO1xuICB9XG5cbiAgdHlwZSBVID0gUmVzdWx0PHVua25vd24+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gICAgUjE1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTQsIFIxNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICAgIE9rVHlwZTxSMTU+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgICAgfCBSMTVcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTRdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTNdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExIHwgUjEyIHwgUjEzXG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTFdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTBdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjldLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjk+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSN10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjZdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjY+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0PiwgT2tUeXBlPFI1Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjU+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjRdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSND5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVLCBSMyBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjJdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj5dLCBFcnJUeXBlPFIwIHwgUjEgfCBSMj4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjFdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT5dLCBFcnJUeXBlPFIwIHwgUjE+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+XSwgRXJyVHlwZTxSMD4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogW10pOiBSZXN1bHQ8W10+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFQgZXh0ZW5kcyBVW10gfCBSZWNvcmQ8c3RyaW5nLCBVPj4oXG4gICAgb2JqOiBULFxuICApOiBSZXN1bHQ8XG4gICAgeyBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDxpbmZlciBJPiA/IEkgOiBuZXZlciB9LFxuICAgIHtcbiAgICAgIFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+ID8gRSA6IG5ldmVyO1xuICAgIH1ba2V5b2YgVF1cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IHVua25vd24pOiB1bmtub3duIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICBjb25zdCByZXNBcnIgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBvYmopIHtcbiAgICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbSBhcyB1bmtub3duO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlc3VsdC5vayhyZXNBcnIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBpdGVtID0gKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPilba2V5XTtcbiAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgICAgcmVzW2tleV0gPSBpdGVtLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0Lm9rKHJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgUmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvciA9IEVycm9yPiA9XG4gIHwgUmVzdWx0Lk9rPFQsIEU+XG4gIHwgUmVzdWx0LkVycjxULCBFPjtcblxudHlwZSBPa1R5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PGluZmVyIE8+ID8gTyA6IG5ldmVyO1xudHlwZSBFcnJUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPlxuICA/IEVcbiAgOiBuZXZlcjtcbiIsICJpbXBvcnQgeyBBbnlPYmplY3QgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogT3ZlcndyaXRlIEpTIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqZWN0XG4gKiBAcGFyYW0ge092ZXJ3cml0ZU9iamVjdFtdfSB0YXJnZXRzXG4gKiBAcmV0dXJucyBPYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IG92ZXJ3cml0ZU9iamVjdCA9IChcbiAgb2JqZWN0OiB1bmtub3duLFxuICB0YXJnZXRzOiB7XG4gICAgZXhpc3RzS2V5OiBzdHJpbmc7XG4gICAgd2lsbDogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHVua25vd24gfTtcbiAgfVtdLFxuKTogdW5rbm93biA9PiB7XG4gIGNvbnN0IHRoYXQ6IEFueU9iamVjdCA9IG9iamVjdCBhcyBBbnlPYmplY3Q7XG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgZGVsZXRlIHRoYXRbdGFyZ2V0LmV4aXN0c0tleV07XG4gICAgdGhhdFt0YXJnZXQud2lsbC5rZXldID0gdGFyZ2V0LndpbGwudmFsdWU7XG4gIH0pO1xuICByZXR1cm4gdGhhdDtcbn07XG5cbi8qKlxuICogRGlzcGxheSBsb2cgZm9yIHNvbGFuYS1zdWl0ZS1jb25maWcuanNcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGExXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEyXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEzXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGE0XG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z0xvZyA9IChcbiAgZGF0YTE6IHVua25vd24sXG4gIGRhdGEyOiB1bmtub3duID0gJycsXG4gIGRhdGEzOiB1bmtub3duID0gJycsXG4gIGRhdGE0OiB1bmtub3duID0gJycsXG4pOiB2b2lkID0+IHtcbiAgaWYgKENvbnN0YW50cy5pc0RlYnVnZ2luZyA9PT0gJ3RydWUnIHx8IHByb2Nlc3MuZW52LkRFQlVHID09PSAndHJ1ZScpIHtcbiAgICBjb25zb2xlLmxvZygnW0RFQlVHXScsIGRhdGExLCBkYXRhMiwgZGF0YTMsIGRhdGE0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBzbGVlcCB0aW1lclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNcbiAqIEByZXR1cm5zIFByb21pc2U8bnVtYmVyPlxuICovXG5leHBvcnQgY29uc3Qgc2xlZXAgPSBhc3luYyAoc2VjOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgc2VjICogMTAwMCkpO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNOb2RlID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMgIT0gbnVsbCAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPSBudWxsXG4gICk7XG59O1xuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9ialxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmV4cG9ydCBjb25zdCBpc1Byb21pc2UgPSAob2JqOiB1bmtub3duKTogb2JqIGlzIFByb21pc2U8dW5rbm93bj4gPT4ge1xuICByZXR1cm4gKFxuICAgICEhb2JqICYmXG4gICAgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpICYmXG4gICAgdHlwZW9mIChvYmogYXMgYW55KS50aGVuID09PSAnZnVuY3Rpb24nXG4gICk7XG59O1xuXG4vKipcbiAqIFRyeSBhc3luYyBtb25hZFxuICpcbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PFQsIEU+PlxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGFzeW5jYmxvY2s6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBQcm9taXNlPFJlc3VsdDxULCBFPj47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oYmxvY2s6ICgpID0+IFQpOiBSZXN1bHQ8VCwgRT47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGlucHV0OiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUmVzdWx0PFQsIEVycm9yPiB8IFByb21pc2U8UmVzdWx0PFQsIEVycm9yPj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHYgPSBpbnB1dCgpO1xuICAgIGlmIChpc1Byb21pc2UodikpIHtcbiAgICAgIHJldHVybiB2LnRoZW4oXG4gICAgICAgICh4OiBUKSA9PiBSZXN1bHQub2soeCksXG4gICAgICAgIChlcnI6IEUpID0+IFJlc3VsdC5lcnIoZXJyKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXN1bHQub2sodik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZSk7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKGUgYXMgc3RyaW5nKSk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGZpbmFsbHlJbnB1dCkge1xuICAgICAgZGVidWdMb2coJyMgZmluYWxseSBpbnB1dDonLCBmaW5hbGx5SW5wdXQpO1xuICAgICAgZmluYWxseUlucHV0KCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfHVuZGVmaW5lZH0gY3JlYXRlZF9hdFxuICogQHJldHVybnMgRGF0ZSB8IHVuZGVmaW5lZFxuICovXG5leHBvcnQgY29uc3QgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgPSAoXG4gIGNyZWF0ZWRfYXQ6IG51bWJlciB8IHVuZGVmaW5lZCxcbik6IERhdGUgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoY3JlYXRlZF9hdCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShjcmVhdGVkX2F0ICogMTAwMCk7XG4gIH1cbiAgcmV0dXJuO1xufTtcbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb21taXRtZW50LCBDb25uZWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcbiAgY29uc3Qgc2V0dGVkID0ge1xuICAgIGNsdXN0ZXJVcmw6ICcnLFxuICAgIGNvbW1pdG1lbnQ6IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICAgIGN1c3RvbUNsdXN0ZXJVcmw6IFtdIGFzIHN0cmluZ1tdLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uID0gKCk6IENvbm5lY3Rpb24gPT4ge1xuICAgIGRlYnVnTG9nKCcjIFtCZWZvcmVdIHNldHRlZDonLCBzZXR0ZWQpO1xuICAgIGRlYnVnTG9nKFxuICAgICAgJyMgW0JlZm9yZV0gQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmw6JyxcbiAgICAgIENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLFxuICAgICk7XG5cbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIGRlYnVnTG9nKCcjIFtBZnRlcl0gc2V0dGVkOicsIHNldHRlZCk7XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IENvbW1pdG1lbnQ7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbiBhcyBUeCxcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2RlZmluZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJy4vZGVmYXVsdCc7XG5cbmV4cG9ydCBjbGFzcyBCYXRjaFRyYW5zYWN0aW9uIHtcbiAgc3RhdGljIHN1Ym1pdCA9IGFzeW5jIChhcnI6IFRyYW5zYWN0aW9uW10pOiBQcm9taXNlPFRyYW5zYWN0aW9uU2lnbmF0dXJlPiA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3QgYSBvZiBhcnIpIHtcbiAgICAgIGlmICghYS5pbnN0cnVjdGlvbnMgJiYgIWEuc2lnbmVycykge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIGJhdGNoU3VibWl0KCkuXG4gICAgICAgICAgICBJbmRleDogJHtpfSwgU2V0IHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KGEpfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuXG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXJyLmZsYXRNYXAoKGEpID0+IGEuaW5zdHJ1Y3Rpb25zKTtcbiAgICBjb25zdCBzaWduZXJzID0gYXJyLmZsYXRNYXAoKGEpID0+IGEuc2lnbmVycyk7XG4gICAgY29uc3QgZmVlUGF5ZXJzID0gYXJyLmZpbHRlcigoYSkgPT4gYS5mZWVQYXllciAhPT0gdW5kZWZpbmVkKTtcbiAgICBsZXQgZmVlUGF5ZXIgPSBzaWduZXJzWzBdO1xuICAgIGlmIChmZWVQYXllcnMubGVuZ3RoID4gMCAmJiBmZWVQYXllcnNbMF0uZmVlUGF5ZXIpIHtcbiAgICAgIGZlZVBheWVyID0gZmVlUGF5ZXJzWzBdLmZlZVBheWVyO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFR4KCk7XG4gICAgbGV0IGZpbmFsU2lnbmVycyA9IHNpZ25lcnM7XG4gICAgaWYgKGZlZVBheWVyKSB7XG4gICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IGZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgIGZpbmFsU2lnbmVycyA9IFtmZWVQYXllciwgLi4uc2lnbmVyc107XG4gICAgfVxuICAgIGluc3RydWN0aW9ucy5tYXAoKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgIH07XG5cbiAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICBvcHRpb25zLFxuICAgICk7XG4gIH07XG59XG5cbi8qKlxuICogc2VuVHJhbnNhY3Rpb24oKSBUcmFuc2FjdGlvbkluc3RydWN0aW9uXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBAdHMtaWdub3JlICovXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uW10gPSBbXTtcbiAgLy8gZG9udCB1c2UgZm9yRWFjaFxuICAvLyBJdCBpcyBub3QgcG9zc2libGUgdG8gc3RvcCB0aGUgcHJvY2VzcyBieSBSRVRVUk4gaW4gdGhlIG1pZGRsZSBvZiB0aGUgcHJvY2Vzcy5cbiAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzOiBzdHJpbmcgPSBvYmouZXJyb3IubWVzc2FnZSBhcyBzdHJpbmc7XG4gICAgICAgIHRocm93IEVycm9yKGBbQXJyYXkgaW5kZXggb2YgY2F1Z2h0ICdSZXN1bHQuZXJyJzogJHtpfV0ke2Vycm9yTWVzc31gKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqLmlzT2spIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlIGFzIFRyYW5zYWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iaiBhcyBUcmFuc2FjdGlvbik7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBCYXRjaFRyYW5zYWN0aW9uLnN1Ym1pdChpbnN0cnVjdGlvbnMpO1xuICB9KTtcbn07XG4iLCAiLy9AaW50ZXJuYWxzXG5leHBvcnQgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbiBhcyBUeCxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vZGVmaW5lJztcbmltcG9ydCB7IEJhdGNoVHJhbnNhY3Rpb24gfSBmcm9tICcuL2JhdGNoJztcblxuZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uIHtcbiAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgZmVlUGF5ZXI/OiBLZXlwYWlyO1xuICBkYXRhPzogdW5rbm93bjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgIGRhdGE/OiB1bmtub3duLFxuICApIHtcbiAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUcmFuc2FjdGlvbikpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUeCgpO1xuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuXG4vKipcbiAqIHNlblRyYW5zYWN0aW9uKCkgVHJhbnNhY3Rpb25JbnN0cnVjdGlvblxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuLyogQHRzLWlnbm9yZSAqL1xuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbltdID0gW107XG4gIC8vIGRvbnQgdXNlIGZvckVhY2hcbiAgLy8gSXQgaXMgbm90IHBvc3NpYmxlIHRvIHN0b3AgdGhlIHByb2Nlc3MgYnkgUkVUVVJOIGluIHRoZSBtaWRkbGUgb2YgdGhlIHByb2Nlc3MuXG4gIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgICBpZiAob2JqLmlzRXJyKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzczogc3RyaW5nID0gb2JqLmVycm9yLm1lc3NhZ2UgYXMgc3RyaW5nO1xuICAgICAgICB0aHJvdyBFcnJvcihgW0FycmF5IGluZGV4IG9mIGNhdWdodCAnUmVzdWx0LmVycic6ICR7aX1dJHtlcnJvck1lc3N9YCk7XG4gICAgICB9IGVsc2UgaWYgKG9iai5pc09rKSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iai52YWx1ZSBhcyBUcmFuc2FjdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmogYXMgVHJhbnNhY3Rpb24pO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gQmF0Y2hUcmFuc2FjdGlvbi5zdWJtaXQoaW5zdHJ1Y3Rpb25zKTtcbiAgfSk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbiBhcyBUeCxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vZGVmaW5lJztcblxuZXhwb3J0IGNsYXNzIE1pbnRUcmFuc2FjdGlvbjxUPiB7XG4gIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICBzaWduZXJzOiBLZXlwYWlyW107XG4gIGZlZVBheWVyPzogS2V5cGFpcjtcbiAgZGF0YT86IFQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgIGZlZVBheWVyPzogS2V5cGFpcixcbiAgICBkYXRhPzogVCxcbiAgKSB7XG4gICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIHN1Ym1pdCA9IGFzeW5jICgpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWludFRyYW5zYWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignb25seSBNaW50SW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICB9XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUeCgpO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IHRoaXMuZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgfTtcblxuICAgICAgaWYgKE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50ID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIENoYW5nZSBtZXRhcGxleCBjbHVzdGVyIG9uIG1haW5uZXQtYmV0YScpO1xuICAgICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyOiBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleCB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgVHJhbnNhY3Rpb24gYXMgVHgsXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2RlZmluZSc7XG5cbmV4cG9ydCBjbGFzcyBQYXJ0aWFsU2lnblRyYW5zYWN0aW9uIHtcbiAgaGV4SW5zdHJ1Y3Rpb246IHN0cmluZztcbiAgZGF0YT86IFB1YmtleTtcblxuICBjb25zdHJ1Y3RvcihpbnN0cnVjdGlvbnM6IHN0cmluZywgbWludD86IFB1YmtleSkge1xuICAgIHRoaXMuaGV4SW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbnM7XG4gICAgdGhpcy5kYXRhID0gbWludDtcbiAgfVxuXG4gIHN1Ym1pdCA9IGFzeW5jIChcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGFydGlhbFNpZ25UcmFuc2FjdGlvbikpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlID0gQnVmZmVyLmZyb20odGhpcy5oZXhJbnN0cnVjdGlvbiwgJ2hleCcpO1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb25Gcm9tSnNvbiA9IFR4LmZyb20oZGVjb2RlKTtcbiAgICAgIHRyYW5zYWN0aW9uRnJvbUpzb24ucGFydGlhbFNpZ24oZmVlUGF5ZXIudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICB9O1xuICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb25Gcm9tSnNvbi5zZXJpYWxpemUoKTtcbiAgICAgIHJldHVybiBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5zZW5kUmF3VHJhbnNhY3Rpb24oXG4gICAgICAgIHdpcmVUcmFuc2FjdGlvbixcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgS2V5cGFpciwgTEFNUE9SVFNfUEVSX1NPTCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZyB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgQmlnTnVtYmVyIH0gZnJvbSAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCB7IEV4cGxvcmVyIH0gZnJvbSAnfi90eXBlcy9nbG9iYWwnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG4vKipcbiAqIENyZWF0ZSBleHBsb3JlciB1cmwgZm9yIGFjY291bnQgYWRkcmVzcyBvciBzaWduYXR1cmVcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0V4cGxvcmVyVXJsID0gZnVuY3Rpb24gKFxuICBleHBsb3JlcjogRXhwbG9yZXIgPSBFeHBsb3Jlci5Tb2xzY2FuLFxuKSB7XG4gIGNvbnN0IGVuZFBvaW50VXJsID0gTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQ7XG4gIGRlYnVnTG9nKCcjIHRvRXhwbG9yZXJVcmwgcnBjRW5kcG9pbnQ6JywgZW5kUG9pbnRVcmwpO1xuICBsZXQgY2x1c3RlciA9ICcnO1xuICBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIucHJkO1xuICB9IGVsc2UgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci50ZXN0O1xuICB9IGVsc2UgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfSBlbHNlIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9XG5cbiAgY29uc3QgYWRkcmVzc09yU2lnbmF0dXJlOiBzdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gIGxldCB1cmwgPSAnJztcbiAgaWYgKEFjY291bnQuS2V5cGFpci5pc1B1YmtleShhZGRyZXNzT3JTaWduYXR1cmUpKSB7XG4gICAgLy8gYWRkcmVzc1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGBodHRwczovL3NvbGFuYS5mbS9hZGRyZXNzLyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgaHR0cHM6Ly9zb2xzY2FuLmlvL2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICAgIC8vIHNpZ25hdHVyZVxuICB9IGVsc2Uge1xuICAgIC8vIGZvciBJbnZhbGlkIHR5cGUgXCJuZXZlclwiIG9mIGFkZHJlc3NPclNpZ25hdHVyZSwgc28gYGFzIHN0cmluZ2BcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgaHR0cHM6Ly9zb2xhbmEuZm0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgaHR0cHM6Ly9zb2xzY2FuLmlvL3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogUHViS2V5KEBzb2xhbmEtc3VpdGUpIHRvIFB1YmxpY0tleShAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHVibGljS2V5XG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9QdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5QdWJLZXk6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMudG9TdHJpbmcoKSk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1NlY3JldCh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuU2VjcmV0OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMudG9TdHJpbmcoKSk7XG4gIHJldHVybiBLZXlwYWlyLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG59O1xuXG4vKipcbiAqIExBTVBPUlRTIHRvIFNPTFxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvU29sID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC5kaXYoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG5cbi8qKlxuICogU09MIHRvIExBTVBPUlRTXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9MYW1wb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAudGltZXMoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgc2xlZXAgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnfi90cmFuc2FjdGlvbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBY2NvdW50LFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcixcbiAgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcblxuLyoqXG4gKiBHZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAqXG4gKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsb3dPd25lck9mZkN1cnZlXG4gKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPlxuICovXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIEFzc29jaWF0ZWQge1xuICAgIGNvbnN0IFJFVFJZX09WRVJfTElNSVQgPSAxMDtcbiAgICBjb25zdCBSRVRSWV9TTEVFUF9USU1FID0gMztcbiAgICAvL0BpbnRlcm5hbFxuICAgIGNvbnN0IGdldCA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgICAgYWxsb3dPd25lck9mZkN1cnZlID0gZmFsc2UsXG4gICAgKTogUHJvbWlzZTxzdHJpbmcgfCBUcmFuc2FjdGlvbj4gPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBuZXcgS2V5cGFpci5LZXlwYWlyKHsgc2VjcmV0OiBmZWVQYXllciB9KS5wdWJrZXksXG4gICAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgICk7XG5cbiAgICAgIGlmICghcmVzLmluc3QpIHtcbiAgICAgICAgcmV0dXJuIHJlcy50b2tlbkFjY291bnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb24oXG4gICAgICAgIFtyZXMuaW5zdF0sXG4gICAgICAgIFtdLFxuICAgICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgcmVzLnRva2VuQWNjb3VudCxcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHJ5IGZ1bmN0aW9uIGlmIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAgICovXG4gICAgZXhwb3J0IGNvbnN0IHJldHJ5R2V0T3JDcmVhdGUgPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgICAgd2hpbGUgKGNvdW50ZXIgPCBSRVRSWV9PVkVSX0xJTUlUKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaW5zdCA9IGF3YWl0IGdldChtaW50LCBvd25lciwgZmVlUGF5ZXIsIHRydWUpO1xuXG4gICAgICAgICAgaWYgKGluc3QgJiYgdHlwZW9mIGluc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBpbnN0KTtcbiAgICAgICAgICAgIHJldHVybiBpbnN0O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5zdCBpbnN0YW5jZW9mIFRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAoYXdhaXQgaW5zdC5zdWJtaXQoKSkubWFwKFxuICAgICAgICAgICAgICBhc3luYyAob2spID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhvayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3QuZGF0YSBhcyBzdHJpbmc7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1Z0xvZygnIyBFcnJvciBzdWJtaXQgcmV0cnlHZXRPckNyZWF0ZTogJywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnTG9nKGAjIHJldHJ5OiAke2NvdW50ZXJ9IGNyZWF0ZSB0b2tlbiBhY2NvdW50OiBgLCBlKTtcbiAgICAgICAgICBkZWJ1Z0xvZyhgIyBtaW50OiAke21pbnR9LCBvd25lcjogJHtvd25lcn0sIGZlZVBheWVyOiAke2ZlZVBheWVyfWApO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHNsZWVwKFJFVFJZX1NMRUVQX1RJTUUpO1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICB9XG4gICAgICB0aHJvdyBFcnJvcihgcmV0cnkgYWN0aW9uIGlzIG92ZXIgbGltaXQgJHtSRVRSWV9PVkVSX0xJTUlUfWApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgICAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICAgICk6IFByb21pc2U8e1xuICAgICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIH0+ID0+IHtcbiAgICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgICBwYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyIGFzIE9yaWdpbmFsLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgY2xhc3MgS2V5cGFpciB7XG4gICAgc2VjcmV0OiBTZWNyZXQ7XG4gICAgcHVia2V5OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgICBpZiAoIXBhcmFtcy5wdWJrZXkpIHtcbiAgICAgICAgY29uc3Qga2V5cGFpciA9IHBhcmFtcy5zZWNyZXQudG9LZXlwYWlyKCk7XG4gICAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVia2V5ID0gcGFyYW1zLnB1YmtleTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VjcmV0ID0gcGFyYW1zLnNlY3JldDtcbiAgICB9XG5cbiAgICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy5wdWJrZXkpO1xuICAgIH1cblxuICAgIHRvS2V5cGFpcigpOiBPcmlnaW5hbCB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICAgIHJldHVybiBPcmlnaW5hbC5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1B1YmtleSA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgUHVia2V5ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGlzU2VjcmV0ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBTZWNyZXQgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17ODcsODh9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXIgPT4ge1xuICAgICAgY29uc3Qga2V5cGFpciA9IE9yaWdpbmFsLmdlbmVyYXRlKCk7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyB0b0tleVBhaXIgPSAoa2V5cGFpcjogT3JpZ2luYWwpOiBLZXlwYWlyID0+IHtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC1idWJibGVndW0nO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICAgIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0TWFzdGVyRWRpdGlvbiA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnZWRpdGlvbicpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRUcmVlQXV0aG9yaXR5ID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Qmd1bVNpZ25lciA9ICgpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW0J1ZmZlci5mcm9tKCdjb2xsZWN0aW9uX2NwaScsICd1dGY4JyldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QXNzZXRJZCA9IChhZGRyZXNzOiBQdWJrZXksIGxlYWZJbmRleDogbnVtYmVyKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgQk4uQk4obGVhZkluZGV4KTtcbiAgICAgIGNvbnN0IFthc3NldElkXSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2Fzc2V0JywgJ3V0ZjgnKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBVaW50OEFycmF5LmZyb20obm9kZS50b0FycmF5KCdsZScsIDgpKSxcbiAgICAgICAgXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFzc2V0SWQudG9TdHJpbmcoKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCBhcyBBc3NvY2lhdGVkIH0gZnJvbSAnLi9hc3NvY2lhdGVkJztcbmltcG9ydCB7IEFjY291bnQgYXMgS2V5cGFpciB9IGZyb20gJy4va2V5cGFpcic7XG5pbXBvcnQgeyBBY2NvdW50IGFzIFBkYSB9IGZyb20gJy4vcGRhJztcblxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSB7XG4gIC4uLkFzc29jaWF0ZWQsXG4gIC4uLktleXBhaXIsXG4gIC4uLlBkYSxcbn07XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBEZXRhaWxzLCBMaW1pdCB9IGZyb20gJ34vdHlwZXMvdmFsaWRhdG9yJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVmFsaWRhdG9yIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZXNzYWdlIHtcbiAgICBleHBvcnQgY29uc3QgU1VDQ0VTUyA9ICdzdWNjZXNzJztcbiAgICBleHBvcnQgY29uc3QgU01BTExfTlVNQkVSID0gJ3RvbyBzbWFsbCc7XG4gICAgZXhwb3J0IGNvbnN0IEJJR19OVU1CRVIgPSAndG9vIGJpZyc7XG4gICAgZXhwb3J0IGNvbnN0IExPTkdfTEVOR1RIID0gJ3RvbyBsb25nJztcbiAgICBleHBvcnQgY29uc3QgRU1QVFkgPSAnaW52YWxpZCBlbXB0eSB2YWx1ZSc7XG4gICAgZXhwb3J0IGNvbnN0IElOVkFMSURfVVJMID0gJ2ludmFsaWQgdXJsJztcbiAgICBleHBvcnQgY29uc3QgT05MWV9OT0RFX0pTID0gJ2BzdHJpbmdgIHR5cGUgaXMgb25seSBOb2RlLmpzJztcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBOQU1FX0xFTkdUSCA9IDMyO1xuICBleHBvcnQgY29uc3QgU1lNQk9MX0xFTkdUSCA9IDEwO1xuICBleHBvcnQgY29uc3QgVVJMX0xFTkdUSCA9IDIwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUFYID0gMTAwO1xuICBleHBvcnQgY29uc3QgU0VMTEVSX0ZFRV9CQVNJU19QT0lOVFNfTUFYID0gMTAwMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01JTiA9IDA7XG5cbiAgZXhwb3J0IGNvbnN0IGlzUm95YWx0eSA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAncm95YWx0eSc7XG4gICAgICBpZiAocm95YWx0eSAhPT0gMCAmJiAhcm95YWx0eSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHJveWFsdHkpO1xuICAgICAgfVxuICAgICAgaWYgKHJveWFsdHkgPCBST1lBTFRZX01JTikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuU01BTExfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01JTixcbiAgICAgICAgICBjb25kaXRpb246ICd1bmRlck1pbicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChyb3lhbHR5ID4gUk9ZQUxUWV9NQVgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUFYLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3NlbGxlckZlZUJhc2lzUG9pbnRzL3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCAqIENvbnZlcnRlci5Sb3lhbHR5LlRIUkVTSE9MRCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogU0VMTEVSX0ZFRV9CQVNJU19QT0lOVFNfTUFYLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzTmFtZSA9IChuYW1lOiBzdHJpbmcpOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ25hbWUnO1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgbmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChuYW1lKSA+IE5BTUVfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgbmFtZSwge1xuICAgICAgICAgIHRocmVzaG9sZDogTkFNRV9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTeW1ib2wgPSAoc3ltYm9sOiBzdHJpbmcpOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3N5bWJvbCc7XG4gICAgICBpZiAoIXN5bWJvbCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHN5bWJvbCk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChzeW1ib2wpID4gU1lNQk9MX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIHN5bWJvbCwge1xuICAgICAgICAgIHRocmVzaG9sZDogU1lNQk9MX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc0ltYWdlVXJsID0gKGltYWdlOiBzdHJpbmcpOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT5cbiAgICBpc1VyaU9ySW1hZ2UoaW1hZ2UsICdpbWFnZScpO1xuXG4gIGV4cG9ydCBjb25zdCBjaGVja0FsbCA9IDxcbiAgICBUIGV4dGVuZHMgUGlja05mdFN0b3JhZ2UgfCBQaWNrTmZ0U3RvcmFnZU1ldGFwbGV4IHwgUGlja01ldGFwbGV4LFxuICA+KFxuICAgIG1ldGFkYXRhOiBULFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG1ldGFkYXRhKTtcbiAgICAgIGNvbnN0IHJlc3VsdHM6IERldGFpbHNbXSA9IFtdO1xuICAgICAga2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICBsZXQgcmVzITogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+O1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuaW1hZ2UpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNJbWFnZVVybChtZXRhZGF0YS5pbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyb3lhbHR5JzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNSb3lhbHR5KG1ldGFkYXRhLnJveWFsdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cykge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5uYW1lKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzTmFtZShtZXRhZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuc3ltYm9sKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU3ltYm9sKG1ldGFkYXRhLnN5bWJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzICYmIHJlcy5pc0Vycikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5yZXMuZXJyb3IuZGV0YWlscyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAnQ2F1Z2h0IGluIHRoZSB2YWxpZGF0aW9uIGVycm9ycy4gc2VlIGluZm9ybWF0aW9uIGUuZzogZXJyPFZhbGlkYXRvckVycm9yPi5kZXRhaWxzJztcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICB0eXBlIFBpY2tOZnRTdG9yYWdlID0gUGljazxcbiAgICBPZmZjaGFpbixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdpbWFnZScgfCAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnXG4gID47XG4gIHR5cGUgUGlja05mdFN0b3JhZ2VNZXRhcGxleCA9IFBpY2s8XG4gICAgSW5wdXROZnRNZXRhZGF0YSxcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdyb3lhbHR5JyB8ICdmaWxlUGF0aCdcbiAgPjtcbiAgdHlwZSBQaWNrTWV0YXBsZXggPSBQaWNrPFxuICAgIERhdGFWMixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICd1cmknIHwgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJ1xuICA+O1xuXG4gIGNvbnN0IGJ5dGVMZW5ndGggPSAodmFsdWU6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdGV4dCA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgIHJldHVybiB0ZXh0LmVuY29kZSh2YWx1ZSkubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUVycm9yID0gKFxuICAgIGtleTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBhY3R1YWw6IHN0cmluZyB8IG51bWJlcixcbiAgICBsaW1pdD86IExpbWl0LFxuICApOiBWYWxpZGF0b3JFcnJvciA9PiB7XG4gICAgbGV0IGVycm9yOiBWYWxpZGF0b3JFcnJvcjtcbiAgICBpZiAobGltaXQpIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsLCBsaW1pdCB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsIH1dKTtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9O1xuXG4gIGNvbnN0IGlzVXJpT3JJbWFnZSA9IChcbiAgICBpbWFnZU9yVXJpOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmcsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBpZiAoIWltYWdlT3JVcmkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKGltYWdlT3JVcmkpID4gVVJMX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIGltYWdlT3JVcmksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFVSTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCEvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7PzomPSssJSNdKy9nLnRlc3QoaW1hZ2VPclVyaSkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLklOVkFMSURfVVJMLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgZGV0YWlsczogRGV0YWlsc1tdO1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNbXSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX1VzZXMgfSBmcm9tICcuL3VzZXMnO1xuaW1wb3J0IHsgSW5wdXRUb2tlbk1ldGFkYXRhLCBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgT25jaGFpbkFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRva2VuTWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXRUb2tlbk1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBudWxsLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9uY2hhaW5BbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wpLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBkZWxldGUgTlVMTCgweDAwKSBzdHJpbmdzIGZ1bmN0aW9uXG4gICAgZXhwb3J0IGNvbnN0IGRlbGV0ZU51bGxTdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwwL2csICcnKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Db2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfQ29sbGVjdGlvbkRldGFpbHMgfSBmcm9tICcuL2NvbGxlY3Rpb24tZGV0YWlscyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX1VzZXMgfSBmcm9tICcuL3VzZXMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Ub2tlbiB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhLCBOZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgTWV0YWRhdGFBcmdzLCBUb2tlblByb2dyYW1WZXJzaW9uLCBUb2tlblN0YW5kYXJkIH0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBPbmNoYWluQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogTWV0YWRhdGFBcmdzID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Db21wcmVzc2VkTmZ0SW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBfQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBmYWxzZSxcbiAgICAgICAgaXNNdXRhYmxlOiBpbnB1dC5pc011dGFibGUgPz8gZmFsc2UsXG4gICAgICAgIGVkaXRpb25Ob25jZTogMCxcbiAgICAgICAgdG9rZW5TdGFuZGFyZDogVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgICAgdG9rZW5Qcm9ncmFtVmVyc2lvbjogVG9rZW5Qcm9ncmFtVmVyc2lvbi5PcmlnaW5hbFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPbmNoYWluQW5kT2ZmY2hhaW4sXG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICAgICk6IE5mdE1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLm1pbnQudG9TdHJpbmcoKSxcbiAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvdXRwdXQub25jaGFpbi51cGRhdGVBdXRob3JpdHkudG9TdHJpbmcoKSxcbiAgICAgICAgcm95YWx0eTogb3V0cHV0Lm9uY2hhaW4uZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgbmFtZTogX1Rva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5uYW1lKSxcbiAgICAgICAgc3ltYm9sOiBfVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCxcbiAgICAgICAgKSxcbiAgICAgICAgdG9rZW5BbW91bnQ6IHRva2VuQW1vdW50LFxuICAgICAgICB1cmk6IF9Ub2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5pc011dGFibGUsXG4gICAgICAgIHByaW1hcnlTYWxlSGFwcGVuZWQ6IG91dHB1dC5vbmNoYWluLnByaW1hcnlTYWxlSGFwcGVuZWQsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIGVkaXRpb25Ob25jZTogb3V0cHV0Lm9uY2hhaW4uZWRpdGlvbk5vbmNlLFxuICAgICAgICBjb2xsZWN0aW9uOiBfQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmNvbGxlY3Rpb24pLFxuICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogX0NvbGxlY3Rpb25EZXRhaWxzLkNvbGxlY3Rpb25EZXRhaWxzLmludG9Vc2VyKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmNvbGxlY3Rpb25EZXRhaWxzLFxuICAgICAgICApLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBNZW1vLCBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNZW1vLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG91dHB1dFRyYW5zZmVyPzogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgICBpZiAob3V0cHV0VHJhbnNmZXIgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSAhPT0gJycpIHtcbiAgICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSA9PT0gJ3NwbC10b2tlbicpIHtcbiAgICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBoaXN0b3J5Lm1lbW8gPSBvdXRwdXQucGFyc2VkO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTWludFRvIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE1pbnRUbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQgYXMgc3RyaW5nO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Db2xsZWN0aW9uRGV0YWlscyB9IGZyb20gJy4vY29sbGVjdGlvbi1kZXRhaWxzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX1Rva2VuIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEsIE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5pbXBvcnQgeyBPbmNoYWluQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IF9Db2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9uY2hhaW5BbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG91dHB1dC5vbmNoYWluLnVwZGF0ZUF1dGhvcml0eS50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBfVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IF9Ub2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sLFxuICAgICAgICApLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogX1Rva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBpc011dGFibGU6IG91dHB1dC5vbmNoYWluLmlzTXV0YWJsZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucHJpbWFyeVNhbGVIYXBwZW5lZCxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5lZGl0aW9uTm9uY2UsXG4gICAgICAgIGNvbGxlY3Rpb246IF9Db2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uY29sbGVjdGlvbiksXG4gICAgICAgIGNvbGxlY3Rpb25EZXRhaWxzOiBfQ29sbGVjdGlvbkRldGFpbHMuQ29sbGVjdGlvbkRldGFpbHMuaW50b1VzZXIoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uY29sbGVjdGlvbkRldGFpbHMsXG4gICAgICAgICksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgb3ZlcndyaXRlT2JqZWN0LCBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHt9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEZpbGVUeXBlLCBQcm9wZXJ0aWVzLCBTdG9yYWdlVHlwZSB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQcm9wZXJ0aWVzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gYXN5bmMgKFxuICAgICAgaW5wdXQ6IFByb3BlcnRpZXMgfCB1bmRlZmluZWQsXG4gICAgICBjYWxsYmFja0Z1bmM6IChcbiAgICAgICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICAgKSA9PiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4sXG4gICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICApOiBQcm9taXNlPFByb3BlcnRpZXM+ID0+IHtcbiAgICAgIGlmICghaW5wdXQgfHwgIWlucHV0LmZpbGVzKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgaW5wdXQuZmlsZXMubWFwKGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKCFmaWxlLmZpbGVQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNhbGxiYWNrRnVuYyhmaWxlLmZpbGVQYXRoLCBzdG9yYWdlVHlwZSwgZmVlUGF5ZXIpO1xuICAgICAgICAgIGlmIChyZXMuaXNFcnIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKHJlcy5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG92ZXJ3cml0ZU9iamVjdChmaWxlLCBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGV4aXN0c0tleTogJ2ZpbGVQYXRoJyxcbiAgICAgICAgICAgICAgd2lsbDogeyBrZXk6ICd1cmknLCB2YWx1ZTogcmVzLnZhbHVlIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICByZXR1cm4geyAuLi5pbnB1dCwgZmlsZXMgfSBhcyBQcm9wZXJ0aWVzO1xuICAgIH07XG4gIH1cbn1cbiIsICJleHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUm95YWx0eSB7XG4gICAgZXhwb3J0IGNvbnN0IFRIUkVTSE9MRCA9IDEwMDtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlckNoZWNrZWQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IFRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCkge1xuICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICApO1xuICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICB9XG5cbiAgICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubXVsdGlzaWdBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubXVsdGlzaWdBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnNpZ25lcnMgPSBvdXRwdXQucGFyc2VkLmluZm8uc2lnbmVycztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFRyYW5zZmVyIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBUcmFuc2ZlcixcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gY2hlY2tcbiAgICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgaGlzdG9yeS5zb2wgPSBvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHM/LnRvU29sKCkudG9TdHJpbmcoKTtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIH0gZnJvbSAnLi9jb21wcmVzc2VkLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNZW1vIH0gZnJvbSAnLi9tZW1vJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICcuL3JlZ3VsYXItbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9wcm9wZXJ0aWVzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnLi90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFVzZXMgfSBmcm9tICcuL3VzZXMnO1xuXG5leHBvcnQgY29uc3QgQ29udmVydGVyID0ge1xuICAuLi5Db21wcmVzc2VkTmZ0TWV0YWRhdGEsXG4gIC4uLkNvbGxlY3Rpb24sXG4gIC4uLkNyZWF0b3JzLFxuICAuLi5NZW1vLFxuICAuLi5NaW50LFxuICAuLi5SZWd1bGFyTmZ0TWV0YWRhdGEsXG4gIC4uLlByb3BlcnRpZXMsXG4gIC4uLlJveWFsdHksXG4gIC4uLlRva2VuTWV0YWRhdGEsXG4gIC4uLlRyYW5zZmVyQ2hlY2tlZCxcbiAgLi4uVHJhbnNmZXIsXG4gIC4uLlVzZXMsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdPLElBQVU7QUFBQSxDQUFWLENBQVVBLGdCQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLGdC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QUFVO0FBQ25FO0FBQUEsTUFDRjtBQUVBLGNBQVEsU0FBUyxPQUFPLE9BQU8sS0FBSztBQUNwQyxjQUFRLGNBQWMsT0FBTyxPQUFPLEtBQUs7QUFDekMsY0FBUSxNQUFNLE9BQU8sT0FBTyxLQUFLLFVBQVUsTUFBTSxFQUFFLFNBQVM7QUFDNUQsY0FBUSxPQUFPLE9BQU87QUFDdEIsY0FBUSxXQUFXLDJCQUEyQixLQUFLLFNBQW1CO0FBQ3RFLGNBQVEsTUFBTSxLQUFLLFlBQVksV0FBVyxDQUFDO0FBQzNDLGNBQVEsbUJBQW1CO0FBRzNCLFVBQ0UsS0FBSyxNQUFNLHFCQUNYLEtBQUssTUFBTSxrQkFBa0IsV0FBVyxHQUN4QztBQUNBLGdCQUFRLG1CQUFtQjtBQUFBLE1BQzdCO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxLQTdCZSxXQUFBRCxZQUFBLGFBQUFBLFlBQUE7QUFBQSxHQURGQSw4QkFBQTs7O0FDUVYsSUFBTUUsYUFBWTtBQUFBLEVBQ3ZCLEdBQUdBO0FBQUEsRUFDSCxHQUFHO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUNMOyIsCiAgIm5hbWVzIjogWyJDb252ZXJ0ZXIiLCAiQ29sbGVjdGlvbiIsICJDb252ZXJ0ZXIiLCAiQ29sbGVjdGlvbkRldGFpbHMiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnN0YW50cyIsICJDbHVzdGVyIiwgIkVuZFBvaW50VXJsIiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAiUmVzdWx0IiwgIk5vZGUiLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUeCIsICJUeCIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAiVHgiLCAiVHgiLCAiS2V5cGFpciIsICJQdWJsaWNLZXkiLCAiUHVibGljS2V5IiwgIktleXBhaXIiLCAiUHVibGljS2V5IiwgImJzIiwgIkFjY291bnQiLCAiS2V5cGFpciIsICJBY2NvdW50IiwgIkFzc29jaWF0ZWQiLCAiUHVibGljS2V5IiwgIkFjY291bnQiLCAiUGRhIiwgIkFjY291bnQiLCAiVmFsaWRhdG9yIiwgIk1lc3NhZ2UiLCAiQ29udmVydGVyIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJDb21wcmVzc2VkTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIlJlZ3VsYXJOZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUHJvcGVydGllcyIsICJDb252ZXJ0ZXIiLCAiUm95YWx0eSIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXJDaGVja2VkIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlciIsICJDb252ZXJ0ZXIiXQp9Cg==