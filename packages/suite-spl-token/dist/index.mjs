// src/add.ts
import { createMintToCheckedInstruction } from "@solana/spl-token";

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
        return "https://devnet.bundlr.network";
      default: {
        const index = Date.now() % 2;
        const clusters = [
          "https://node1.bundlr.network",
          "https://node2.bundlr.network"
        ];
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
((Result15) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result15.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result15.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result15.ok(resArr);
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
    return Result15.ok(res);
  }
  Result15.all = all;
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

// ../global/src/index.ts
import { Keypair as Keypair5, LAMPORTS_PER_SOL, PublicKey as PublicKey5 } from "@solana/web3.js";

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

// ../instruction/src/instruction/index.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction2,
  Transaction as Transaction2
} from "@solana/web3.js";

// ../instruction/src/instruction/define.ts
var MAX_RETRIES = 3;

// ../instruction/src/instruction/batch-submit.ts
import {
  sendAndConfirmTransaction,
  Transaction
} from "@solana/web3.js";
var Instruction = class {
  static batchSubmit = async (arr) => {
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
    const transaction = new Transaction();
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
    return Instruction.batchSubmit(instructions);
  });
};

// ../instruction/src/instruction/index.ts
var Instruction2 = class _Instruction {
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
      if (!(this instanceof _Instruction)) {
        throw Error("only Instruction object that can use this");
      }
      const transaction = new Transaction2();
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
    return Instruction.batchSubmit(instructions);
  });
};

// ../instruction/src/mint-instruction.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction3,
  Transaction as Transaction3
} from "@solana/web3.js";
var MintInstruction = class _MintInstruction extends Instruction2 {
  constructor(instructions, signers, feePayer, data) {
    super(instructions, signers, feePayer, data);
  }
  submit = async () => {
    return Try(async () => {
      if (!(this instanceof _MintInstruction)) {
        throw Error("only MintInstruction object that can use this");
      }
      const transaction = new Transaction3();
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

// ../instruction/src/multisig-instruction.ts
import {
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction as TransactionInstruction3
} from "@solana/web3.js";
import { blob, struct, u8 } from "@solana/buffer-layout";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
var MultisigInstruction;
((MultisigInstruction2) => {
  const createLayoutPubKey = (property) => {
    return blob(32, property);
  };
  MultisigInstruction2.Layout = struct([
    u8("m"),
    u8("n"),
    u8("is_initialized"),
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
    return SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: balanceNeeded,
      space: MultisigInstruction2.Layout.span,
      programId: TOKEN_PROGRAM_ID
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
        pubkey: SYSVAR_RENT_PUBKEY,
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
    const dataLayout = struct([
      u8("instruction"),
      u8("m")
    ]);
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 2,
        m
      },
      data
    );
    return new TransactionInstruction3({
      keys,
      programId: TOKEN_PROGRAM_ID,
      data
    });
  };
})(MultisigInstruction || (MultisigInstruction = {}));

// ../instruction/src/partial-signInstruction.ts
import {
  Transaction as Transaction4
} from "@solana/web3.js";
var PartialSignInstruction = class _PartialSignInstruction {
  hexInstruction;
  data;
  constructor(instructions, mint) {
    this.hexInstruction = instructions;
    this.data = mint;
  }
  submit = async (feePayer) => {
    return Try(async () => {
      if (!(this instanceof _PartialSignInstruction)) {
        throw Error("only PartialSignInstruction object that can use this");
      }
      const decode = Buffer.from(this.hexInstruction, "hex");
      const transactionFromJson = Transaction4.from(decode);
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

// ../account/src/associated-account.ts
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID2,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError
} from "@solana/spl-token";

// ../account/src/keypair-account.ts
import { Keypair as Keypair4, PublicKey as PublicKey3 } from "@solana/web3.js";
import bs from "bs58";
var KeypairAccount = class _KeypairAccount {
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
    const decoded = bs.decode(this.secret);
    return Keypair4.fromSecretKey(decoded);
  }
  static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
  static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
  static create = () => {
    const keypair = Keypair4.generate();
    return new _KeypairAccount({
      pubkey: keypair.publicKey.toString(),
      secret: bs.encode(keypair.secretKey)
    });
  };
  static toKeyPair = (keypair) => {
    return new _KeypairAccount({
      pubkey: keypair.publicKey.toString(),
      secret: bs.encode(keypair.secretKey)
    });
  };
};
String.prototype.toPublicKey = function() {
  if (!KeypairAccount.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new PublicKey3(this);
};
String.prototype.toKeypair = function() {
  if (!KeypairAccount.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs.decode(this);
  return Keypair4.fromSecretKey(decoded);
};

// ../account/src/associated-account.ts
var AssociatedAccount;
((AssociatedAccount2) => {
  const RETRY_OVER_LIMIT = 10;
  const RETRY_SLEEP_TIME = 3;
  const get = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
    const res = await (0, AssociatedAccount2.makeOrCreateInstruction)(
      mint,
      owner,
      new KeypairAccount({ secret: feePayer }).pubkey,
      allowOwnerOffCurve
    );
    if (!res.inst) {
      return res.tokenAccount;
    }
    return new Instruction2(
      [res.inst],
      [],
      feePayer.toKeypair(),
      res.tokenAccount
    );
  };
  AssociatedAccount2.retryGetOrCreate = async (mint, owner, feePayer) => {
    let counter = 1;
    while (counter < RETRY_OVER_LIMIT) {
      try {
        const inst = await get(mint, owner, feePayer, true);
        if (inst && typeof inst === "string") {
          debugLog("# associatedTokenAccount: ", inst);
          return inst;
        } else if (inst instanceof Instruction2) {
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
  AssociatedAccount2.makeOrCreateInstruction = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
    const associatedTokenAccount = getAssociatedTokenAddressSync(
      mint.toPublicKey(),
      owner.toPublicKey(),
      allowOwnerOffCurve,
      TOKEN_PROGRAM_ID2,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    debugLog("# associatedTokenAccount: ", associatedTokenAccount.toString());
    try {
      await getAccount(
        Node.getConnection(),
        associatedTokenAccount,
        Node.getConnection().commitment,
        TOKEN_PROGRAM_ID2
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
        TOKEN_PROGRAM_ID2,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
      return {
        tokenAccount: associatedTokenAccount.toString(),
        inst
      };
    }
  };
})(AssociatedAccount || (AssociatedAccount = {}));

// ../account/src/pda.ts
import { PublicKey as PublicKey4 } from "@solana/web3.js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
var Pda;
((Pda2) => {
  Pda2.getMetadata = (mint) => {
    const [publicKey] = PublicKey4.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        PROGRAM_ID.toBuffer(),
        mint.toPublicKey().toBuffer()
      ],
      PROGRAM_ID
    );
    return publicKey;
  };
  Pda2.getMasterEdition = (mint) => {
    const [publicKey] = PublicKey4.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        PROGRAM_ID.toBuffer(),
        mint.toPublicKey().toBuffer(),
        Buffer.from("edition")
      ],
      PROGRAM_ID
    );
    return publicKey;
  };
})(Pda || (Pda = {}));

// ../global/src/index.ts
import { BigNumber } from "bignumber.js";
import bs2 from "bs58";
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
  if (KeypairAccount.isPubkey(addressOrSignature)) {
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
  if (!KeypairAccount.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new PublicKey5(this.toString());
};
String.prototype.toKeypair = function() {
  if (!KeypairAccount.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs2.decode(this.toString());
  return Keypair5.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return BigNumber(this).div(LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return BigNumber(this).times(LAMPORTS_PER_SOL).toNumber();
};

// src/calculate-amount.ts
var SplToken;
((SplToken12) => {
  SplToken12.calculateAmount = (amount, mintDecimal) => {
    return amount * 10 ** mintDecimal;
  };
})(SplToken || (SplToken = {}));

// src/add.ts
var SplToken2;
((SplToken12) => {
  SplToken12.add = async (token, owner, signers, totalAmount, mintDecimal, feePayer) => {
    return Try(async () => {
      const payer = !feePayer ? signers[0] : feePayer;
      const keypairs = signers.map((s) => s.toKeypair());
      const tokenAssociated = await AssociatedAccount.retryGetOrCreate(
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
      return new Instruction2([inst], keypairs, payer.toKeypair(), token);
    });
  };
})(SplToken2 || (SplToken2 = {}));

// src/burn.ts
import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync2
} from "@solana/spl-token";
var SplToken3;
((SplToken12) => {
  SplToken12.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => {
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync2(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
      const keypairs = signers.map((s) => s.toKeypair());
      const inst = createBurnCheckedInstruction(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs
      );
      return new Instruction2([inst], keypairs, payer);
    });
  };
})(SplToken3 || (SplToken3 = {}));

// ../types/src/converter/user-side/input.ts
var UserSideInput;
((UserSideInput2) => {
  let TokenStandard;
  ((TokenStandard2) => {
    TokenStandard2[TokenStandard2["NonFungible"] = 0] = "NonFungible";
    TokenStandard2[TokenStandard2["FungibleAsset"] = 1] = "FungibleAsset";
    TokenStandard2[TokenStandard2["Fungible"] = 2] = "Fungible";
    TokenStandard2[TokenStandard2["NonFungibleEdition"] = 3] = "NonFungibleEdition";
    TokenStandard2[TokenStandard2["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
  })(TokenStandard = UserSideInput2.TokenStandard || (UserSideInput2.TokenStandard = {}));
})(UserSideInput || (UserSideInput = {}));

// ../types/src/converter/common.ts
var Common;
((Common2) => {
  let UseMethod;
  ((UseMethod2) => {
    UseMethod2[UseMethod2["Burn"] = 0] = "Burn";
    UseMethod2[UseMethod2["Multiple"] = 1] = "Multiple";
    UseMethod2[UseMethod2["Single"] = 2] = "Single";
  })(UseMethod = Common2.UseMethod || (Common2.UseMethod = {}));
})(Common || (Common = {}));

// ../converter/src/collection.ts
var Converter;
((Converter13) => {
  let Collection;
  ((Collection2) => {
    Collection2.intoInfraSide = (input) => {
      if (!input) {
        return null;
      }
      return {
        key: input.toPublicKey(),
        verified: false
      };
    };
    Collection2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return {
        address: output.key.toString(),
        verified: output.verified
      };
    };
  })(Collection = Converter13.Collection || (Converter13.Collection = {}));
})(Converter || (Converter = {}));

// ../converter/src/creators.ts
var Converter2;
((Converter13) => {
  let Creators;
  ((Creators2) => {
    Creators2.intoInfraSide = (input) => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        let modify = null;
        modify = {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: data.verified
        };
        return modify;
      });
    };
    Creators2.intoUserSide = (output) => {
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
  })(Creators = Converter13.Creators || (Converter13.Creators = {}));
})(Converter2 || (Converter2 = {}));

// ../converter/src/memo.ts
var Converter3;
((Converter13) => {
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
  })(Memo = Converter13.Memo || (Converter13.Memo = {}));
})(Converter3 || (Converter3 = {}));

// ../converter/src/mint.ts
var Converter4;
((Converter13) => {
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
  })(Mint = Converter13.Mint || (Converter13.Mint = {}));
})(Converter4 || (Converter4 = {}));

// ../converter/src/uses.ts
var Converter5;
((Converter13) => {
  let Uses;
  ((Uses2) => {
    Uses2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return output;
    };
  })(Uses = Converter13.Uses || (Converter13.Uses = {}));
})(Converter5 || (Converter5 = {}));

// ../converter/src/token-metadata.ts
var Converter6;
((Converter13) => {
  let TokenMetadata;
  ((TokenMetadata2) => {
    TokenMetadata2.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoInfraSide(input.creators),
        collection: null,
        uses: input.uses || null
      };
    };
    TokenMetadata2.intoUserSide = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.name),
        symbol: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.symbol),
        tokenAmount,
        uri: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.uri),
        creators: Converter2.Creators.intoUserSide(output.onchain.data.creators),
        uses: Converter5.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Converter13.TokenMetadata || (Converter13.TokenMetadata = {}));
})(Converter6 || (Converter6 = {}));

// ../converter/src/nft-metadata.ts
var Converter7;
((Converter13) => {
  let NftMetadata;
  ((NftMetadata2) => {
    NftMetadata2.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoInfraSide(input.creators),
        collection: Converter.Collection.intoInfraSide(input.collection),
        uses: input.uses || null
      };
    };
    NftMetadata2.intoUserSide = (output, tokenAmount) => {
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
        creators: Converter2.Creators.intoUserSide(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Converter.Collection.intoUserSide(
          output.onchain.collection
        ),
        uses: Converter5.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(NftMetadata = Converter13.NftMetadata || (Converter13.NftMetadata = {}));
})(Converter7 || (Converter7 = {}));

// ../converter/src/properties.ts
var Converter8;
((Converter13) => {
  let Properties;
  ((Properties2) => {
    Properties2.intoInfraSide = async (input, callbackFunc, storageType, feePayer) => {
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
  })(Properties = Converter13.Properties || (Converter13.Properties = {}));
})(Converter8 || (Converter8 = {}));

// ../converter/src/royalty.ts
var Converter9;
((Converter13) => {
  let Royalty;
  ((Royalty2) => {
    Royalty2.THRESHOLD = 100;
    Royalty2.intoInfraSide = (percentage) => {
      return percentage * Royalty2.THRESHOLD;
    };
  })(Royalty = Converter13.Royalty || (Converter13.Royalty = {}));
})(Converter9 || (Converter9 = {}));

// ../converter/src/transfer-checked.ts
var Converter10;
((Converter13) => {
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
  })(TransferChecked = Converter13.TransferChecked || (Converter13.TransferChecked = {}));
})(Converter10 || (Converter10 = {}));

// ../converter/src/transfer.ts
var Converter11;
((Converter13) => {
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
  })(Transfer = Converter13.Transfer || (Converter13.Transfer = {}));
})(Converter11 || (Converter11 = {}));

// ../converter/src/index.ts
var Converter12 = {
  ...Converter,
  ...Converter2,
  ...Converter3,
  ...Converter4,
  ...Converter7,
  ...Converter8,
  ...Converter9,
  ...Converter6,
  ...Converter10,
  ...Converter11,
  ...Converter5
};

// src/find.ts
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID3 } from "@solana/spl-token";
import fetch from "cross-fetch";
var SplToken4;
((SplToken12) => {
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
    if (tokenStandard === UserSideInput.TokenStandard.Fungible) {
      return Converter12.TokenMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else if (tokenStandard === UserSideInput.TokenStandard.NonFungible) {
      return Converter12.NftMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else {
      throw Error(`No match tokenStandard: ${tokenStandard}`);
    }
  };
  SplToken12.genericFindByOwner = async (owner, callback, tokenStandard, sortable, isHolder) => {
    try {
      let data = [];
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID3
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
            Pda.getMetadata(mint)
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
  SplToken12.genericFindByMint = async (mint, tokenStandard) => {
    try {
      const connection = Node.getConnection();
      const metadata = await Metadata.fromAccountAddress(
        connection,
        Pda.getMetadata(mint)
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
  SplToken12.findByOwner = (owner, onOk, onErr, options) => {
    const sortable = !options?.sortable ? "desc" /* Desc */ : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    (0, SplToken12.genericFindByOwner)(
      owner,
      (result) => {
        result.match((ok) => onOk(ok), onErr);
      },
      UserSideInput.TokenStandard.Fungible,
      sortable,
      isHolder
    );
  };
  SplToken12.findByMint = async (mint) => {
    return await (0, SplToken12.genericFindByMint)(
      mint,
      UserSideInput.TokenStandard.Fungible
    );
  };
})(SplToken4 || (SplToken4 = {}));

// src/freeze.ts
import {
  createFreezeAccountInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync3
} from "@solana/spl-token";
var SplToken5;
((SplToken12) => {
  SplToken12.freeze = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync3(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = createFreezeAccountInstruction(
        tokenAccount,
        mint.toPublicKey(),
        new KeypairAccount({ secret: freezeAuthority }).toPublicKey()
      );
      return new Instruction2(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// src/fee-payer-partial-sign-transfer.ts
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { Transaction as Transaction5 } from "@solana/web3.js";
var SplToken6;
((SplToken12) => {
  SplToken12.feePayerPartialSignTransfer = async (mint, owner, dest, signers, amount, mintDecimal, feePayer) => {
    return Try(async () => {
      const keypairs = signers.map((s) => s.toKeypair());
      const sourceToken = await AssociatedAccount.makeOrCreateInstruction(
        mint,
        owner,
        feePayer
      );
      const destToken = await AssociatedAccount.makeOrCreateInstruction(
        mint,
        dest,
        feePayer
      );
      let inst2;
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction5({
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
      return new PartialSignInstruction(hex);
    });
  };
})(SplToken6 || (SplToken6 = {}));

// src/history.ts
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID4 } from "@solana/spl-token";

// ../types/src/transaction-filter/index.ts
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

// ../transaction-filter/src/signatures.ts
var Signatures;
((Signatures2) => {
  const parseForTransaction = async (signature) => {
    const res = await Node.getConnection().getParsedTransaction(signature);
    if (!res) {
      return {};
    }
    return res;
  };
  Signatures2.getForAdress = async (pubkey, parser, callback, options, histories = []) => {
    try {
      debugLog("# options: ", options);
      const transactions = await Node.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit: options.narrowDown
        }
      );
      debugLog("# transactions count:", transactions.length);
      for (const transaction of transactions) {
        parseForTransaction(transaction.signature).then((signature) => {
          const history = parser(signature);
          if (history) {
            histories.push(history);
            callback(Result.ok(histories));
          }
        }).catch((e) => callback(Result.err(e)));
        await sleep(options.waitTime);
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
})(Signatures || (Signatures = {}));

// ../transaction-filter/src/transaction-filter.ts
var TransactionFilter;
((TransactionFilter2) => {
  const createPostTokenAccountList = (transaction) => {
    const postTokenAccount = [];
    const accountKeys = transaction.transaction.message.accountKeys.map(
      (t) => t.pubkey.toString()
    );
    transaction.meta?.postTokenBalances?.forEach((t) => {
      if (accountKeys[t.accountIndex] && t.owner) {
        const v = {
          account: accountKeys[t.accountIndex],
          owner: t.owner
        };
        postTokenAccount.push(v);
      }
    });
    return postTokenAccount;
  };
  TransactionFilter2.isParsedInstruction = (arg) => {
    return arg !== null && typeof arg === "object" && "parsed" in arg;
  };
  TransactionFilter2.parse = (filterType, moduleName) => (txMeta) => {
    let history;
    if (filterType === "mint" /* Mint */ && moduleName === "system" /* SolNative */) {
      throw Error(
        "This filterType('FilterType.Mint') can not use from SolNative module"
      );
    }
    if (!txMeta) {
      return history;
    }
    const postTokenAccount = createPostTokenAccountList(txMeta);
    txMeta.transaction.message.instructions.forEach((instruction) => {
      if ((0, TransactionFilter2.isParsedInstruction)(instruction)) {
        switch (filterType) {
          case "memo" /* Memo */: {
            if (FilterOptions.Memo.program.includes(instruction.program)) {
              let instructionTransfer;
              txMeta.transaction.message.instructions.forEach(
                (instruction2) => {
                  if ((0, TransactionFilter2.isParsedInstruction)(instruction2) && FilterOptions.Transfer.program.includes(
                    instruction2.program
                  )) {
                    instructionTransfer = instruction2;
                  }
                }
              );
              if (instructionTransfer && moduleName !== instructionTransfer["program"]) {
                debugLog(
                  "# FilterType.Memo break instruction: ",
                  instructionTransfer
                );
                break;
              }
              history = Converter12.Memo.intoUserSide(
                instruction,
                txMeta,
                instructionTransfer,
                postTokenAccount
              );
            }
            break;
          }
          case "only-memo" /* OnlyMemo */: {
            if (FilterOptions.Memo.program.includes(instruction.program)) {
              let instructionTransfer;
              history = Converter12.Memo.intoUserSide(
                instruction,
                txMeta,
                instructionTransfer,
                postTokenAccount
              );
            }
            break;
          }
          case "mint" /* Mint */: {
            if (FilterOptions.Mint.program.includes(instruction.program) && FilterOptions.Mint.action.includes(
              instruction.parsed.type
            )) {
              history = Converter12.Mint.intoUserSide(instruction, txMeta);
            }
            break;
          }
          case "transfer" /* Transfer */:
            if (moduleName === instruction.program && FilterOptions.Transfer.action.includes(
              instruction.parsed.type
            )) {
              if (instruction.parsed.type === "transferChecked") {
                history = Converter12.TransferChecked.intoUserSide(
                  instruction,
                  txMeta,
                  postTokenAccount
                );
              } else {
                history = Converter12.Transfer.intoUserSide(
                  instruction,
                  txMeta
                );
              }
            }
        }
      }
    });
    return history;
  };
})(TransactionFilter || (TransactionFilter = {}));

// src/history.ts
var SplToken7;
((SplToken12) => {
  SplToken12.getHistory = async (target, filterType, onOk, onErr, options = {}) => {
    try {
      const defaultValues = {
        waitTime: 0.03,
        narrowDown: 100
      };
      const mergedOptions = { ...defaultValues, ...options };
      if (filterType === "memo" /* Memo */) {
        const parser = TransactionFilter.parse(filterType, "spl-token" /* SplToken */);
        await Signatures.getForAdress(
          target,
          parser,
          (result) => result.match(onOk, onErr),
          mergedOptions
        );
      } else {
        const tokenAccounts = await Node.getConnection().getParsedTokenAccountsByOwner(
          target.toPublicKey(),
          {
            programId: TOKEN_PROGRAM_ID4
          }
        );
        const storedHistories = [];
        debugLog("# tokenAccounts size: ", tokenAccounts.value.length);
        for (const account of tokenAccounts.value) {
          const parser = TransactionFilter.parse(
            filterType,
            "spl-token" /* SplToken */
          );
          await Signatures.getForAdress(
            account.pubkey.toString(),
            parser,
            (result) => result.match(onOk, onErr),
            mergedOptions,
            storedHistories
          );
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  };
})(SplToken7 || (SplToken7 = {}));

// src/mint.ts
import {
  SystemProgram as SystemProgram2
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
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID5
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction
} from "@metaplex-foundation/mpl-token-metadata";

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
  Validator2.ROYALTY_MIN = -1;
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
      } else if (royalty > Validator2.ROYALTY_MAX * Converter12.Royalty.THRESHOLD) {
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

// ../storage/src/nft-storage.ts
import { Blob, NFTStorage } from "nft.storage";
var NftStorage;
((NftStorage2) => {
  let isDisplayWarning = false;
  const getNftStorageApiKey = () => {
    if (!Constants.nftStorageApiKey) {
      if (!isDisplayWarning) {
        console.warn(
          `
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package
        your need to update nftStorage.apiKey define parameter in solana-suite.json.
        can get apiKey from https://nft.storage/
        --------------------------------------
        `
        );
        isDisplayWarning = true;
      }
      return Constants.NFT_STORAGE_API_KEY;
    } else {
      return Constants.nftStorageApiKey;
    }
  };
  const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
  const connect = () => new NFTStorage({ token: getNftStorageApiKey() });
  NftStorage2.uploadContent = async (filePath) => {
    return Try(async () => {
      debugLog("# upload content: ", filePath);
      let file;
      if (isNode()) {
        const filepath = filePath;
        file = (await import("fs")).readFileSync(filepath);
      } else if (isBrowser()) {
        const filepath = filePath;
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      const blobImage = new Blob([file]);
      const res = await connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    });
  };
  NftStorage2.uploadMetadata = async (metadata) => {
    return Try(async () => {
      debugLog("# upload metadata: ", metadata);
      const blobJson = new Blob([JSON.stringify(metadata)]);
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
  Storage2.uploadContent = async (filePath, storageType, feePayer) => {
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      return await NftStorage.uploadContent(filePath);
    } else if (storageType === "nftStorage") {
      return await NftStorage.uploadContent(filePath);
    } else {
      throw Error("Not found storageType");
    }
  };
  Storage2.uploadMetaAndContent = async (input, filePath, storageType, feePayer) => {
    let storage;
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      storage = await // await Arweave.uploadContent(filePath, feePayer)
      (await NftStorage.uploadContent(filePath)).unwrap(
        async (ok) => {
          input.image = ok;
        },
        (err) => {
          throw err;
        }
      );
    } else if (storageType === "nftStorage") {
      storage = await (await NftStorage.uploadContent(filePath)).unwrap(
        async (ok) => {
          input.image = ok;
          return await NftStorage.uploadMetadata(input);
        },
        (err) => {
          throw err;
        }
      );
    } else {
      throw Error("No match storageType");
    }
    if (!storage) {
      throw Error("Empty storage object");
    }
    return storage;
  };
})(Storage || (Storage = {}));

// src/mint.ts
var SplToken8;
((SplToken12) => {
  SplToken12.createFreezeAuthority = (mint2, owner, freezeAuthority) => {
    return createSetAuthorityInstruction(
      mint2,
      owner,
      AuthorityType.FreezeAccount,
      freezeAuthority
    );
  };
  SplToken12.createMintInstructions = async (mint2, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => {
    const connection = Node.getConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const metadataPda = Pda.getMetadata(mint2.toString());
    const tokenAssociated = getAssociatedTokenAddressSync4(mint2, owner);
    const inst1 = SystemProgram2.createAccount({
      fromPubkey: feePayer,
      newAccountPubkey: mint2,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID5
    });
    const inst2 = createInitializeMintInstruction(
      mint2,
      mintDecimal,
      owner,
      owner,
      TOKEN_PROGRAM_ID5
    );
    const inst3 = createAssociatedTokenAccountInstruction2(
      feePayer,
      tokenAssociated,
      owner,
      mint2
    );
    const inst4 = createMintToCheckedInstruction2(
      mint2,
      tokenAssociated,
      owner,
      SplToken.calculateAmount(totalAmount, mintDecimal),
      mintDecimal
    );
    const inst5 = createCreateMetadataAccountV3Instruction(
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
    );
    return [inst1, inst2, inst3, inst4, inst5];
  };
  SplToken12.mint = async (owner, signer, totalAmount, mintDecimal, input, feePayer, freezeAuthority) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const payer = feePayer ? feePayer : signer;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const tokenStorageMetadata = Storage.toConvertOffchaindata(
        input,
        input.royalty
      );
      const createdAt = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      tokenStorageMetadata.created_at = createdAt;
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.uploadMetaAndContent(
          tokenStorageMetadata,
          input.filePath,
          input.storageType,
          payer
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error("Must set 'storageType + filePath' or 'uri'");
      }
      const isMutable = true;
      const datav2 = Converter12.TokenMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      debugLog("# datav2: ", datav2);
      debugLog("# upload content url: ", uri);
      const mint2 = KeypairAccount.create();
      const insts = await (0, SplToken12.createMintInstructions)(
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
          (0, SplToken12.createFreezeAuthority)(
            mint2.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey()
          )
        );
      }
      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint2.toKeypair()],
        payer.toKeypair(),
        mint2.pubkey
      );
    });
  };
})(SplToken8 || (SplToken8 = {}));

// src/thaw.ts
import {
  createThawAccountInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync5
} from "@solana/spl-token";
var SplToken9;
((SplToken12) => {
  SplToken12.thaw = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync5(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = createThawAccountInstruction(
        tokenAccount,
        mint.toPublicKey(),
        new KeypairAccount({ secret: freezeAuthority }).toPublicKey()
      );
      return new Instruction2(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken9 || (SplToken9 = {}));

// src/transfer.ts
import { createTransferCheckedInstruction as createTransferCheckedInstruction2 } from "@solana/spl-token";
var SplToken10;
((SplToken12) => {
  SplToken12.transfer = async (mint, owner, dest, signers, amount, mintDecimal, feePayer) => {
    return Try(async () => {
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const sourceToken = await AssociatedAccount.retryGetOrCreate(
        mint,
        owner,
        payer
      );
      const destToken = await AssociatedAccount.retryGetOrCreate(
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
      return new Instruction2([inst], keypairs, payer.toKeypair());
    });
  };
})(SplToken10 || (SplToken10 = {}));

// src/index.ts
var SplToken11 = {
  ...SplToken2,
  ...SplToken3,
  ...SplToken4,
  ...SplToken5,
  ...SplToken6,
  ...SplToken7,
  ...SplToken8,
  ...SplToken9,
  ...SplToken10
};
export {
  SplToken11 as SplToken
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FkZC50cyIsICIuLi8uLi9zaGFyZWQvc3JjL2NvbnN0YW50cy50cyIsICIuLi8uLi9zaGFyZWQvc3JjL3Jlc3VsdC50cyIsICIuLi8uLi9zaGFyZWQvc3JjL3NoYXJlZC50cyIsICIuLi8uLi9nbG9iYWwvc3JjL2luZGV4LnRzIiwgIi4uLy4uL25vZGUvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2luc3RydWN0aW9uL3NyYy9pbnN0cnVjdGlvbi9pbmRleC50cyIsICIuLi8uLi9pbnN0cnVjdGlvbi9zcmMvaW5zdHJ1Y3Rpb24vZGVmaW5lLnRzIiwgIi4uLy4uL2luc3RydWN0aW9uL3NyYy9pbnN0cnVjdGlvbi9iYXRjaC1zdWJtaXQudHMiLCAiLi4vLi4vaW5zdHJ1Y3Rpb24vc3JjL21pbnQtaW5zdHJ1Y3Rpb24udHMiLCAiLi4vLi4vaW5zdHJ1Y3Rpb24vc3JjL211bHRpc2lnLWluc3RydWN0aW9uLnRzIiwgIi4uLy4uL2luc3RydWN0aW9uL3NyYy9wYXJ0aWFsLXNpZ25JbnN0cnVjdGlvbi50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9hc3NvY2lhdGVkLWFjY291bnQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMva2V5cGFpci1hY2NvdW50LnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL3BkYS50cyIsICIuLi9zcmMvY2FsY3VsYXRlLWFtb3VudC50cyIsICIuLi9zcmMvYnVybi50cyIsICIuLi8uLi90eXBlcy9zcmMvY29udmVydGVyL3VzZXItc2lkZS9pbnB1dC50cyIsICIuLi8uLi90eXBlcy9zcmMvY29udmVydGVyL2NvbW1vbi50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jcmVhdG9ycy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21lbW8udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdXNlcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Rva2VuLW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcHJvcGVydGllcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3JveWFsdHkudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci1jaGVja2VkLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9pbmRleC50cyIsICIuLi9zcmMvZmluZC50cyIsICIuLi9zcmMvZnJlZXplLnRzIiwgIi4uL3NyYy9mZWUtcGF5ZXItcGFydGlhbC1zaWduLXRyYW5zZmVyLnRzIiwgIi4uL3NyYy9oaXN0b3J5LnRzIiwgIi4uLy4uL3R5cGVzL3NyYy90cmFuc2FjdGlvbi1maWx0ZXIvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tZmlsdGVyL3NyYy9zaWduYXR1cmVzLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWZpbHRlci9zcmMvdHJhbnNhY3Rpb24tZmlsdGVyLnRzIiwgIi4uL3NyYy9taW50LnRzIiwgIi4uLy4uL3ZhbGlkYXRvci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvc3RvcmFnZS50cyIsICIuLi9zcmMvdGhhdy50cyIsICIuLi9zcmMvdHJhbnNmZXIudHMiLCAiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnfi9pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBBc3NvY2lhdGVkQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBfQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBhZGQgPSBhc3luYyAoXG4gICAgdG9rZW46IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSAhZmVlUGF5ZXIgPyBzaWduZXJzWzBdIDogZmVlUGF5ZXI7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQXNzb2NpYXRlZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBfQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudCh0b3RhbEFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFtpbnN0XSwga2V5cGFpcnMsIHBheWVyLnRvS2V5cGFpcigpLCB0b2tlbik7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBDb25maWcgZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb25maWcnO1xuXG4vLyBXQVJOSU5HOiBOb3QgdG8gYmUgYSBjaXJjdWxhciByZWZlcmVuY2VcbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IGNvbnN0IGN1cnJlbnRDbHVzdGVyID0gQ29uZmlnLmNsdXN0ZXIudHlwZTtcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbUNsdXN0ZXJVcmwgPSBDb25maWcuY2x1c3Rlci5jdXN0b21DbHVzdGVyVXJsO1xuICBleHBvcnQgY29uc3QgaXNEZWJ1Z2dpbmcgPSBDb25maWcuZGVidWdnaW5nO1xuICBleHBvcnQgY29uc3QgbmZ0U3RvcmFnZUFwaUtleSA9IENvbmZpZy5uZnRzdG9yYWdlLmFwaWtleTtcblxuICBleHBvcnQgZW51bSBDbHVzdGVyIHtcbiAgICBwcmQgPSAnbWFpbm5ldC1iZXRhJyxcbiAgICBwcmRNZXRhcGxleCA9ICdtYWlubmV0LWJldGEtbWV0YXBsZXgnLFxuICAgIGRldiA9ICdkZXZuZXQnLFxuICAgIHRlc3QgPSAndGVzdG5ldCcsXG4gICAgbG9jYWxob3N0ID0gJ2xvY2FsaG9zdC1kZXZuZXQnLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRW5kUG9pbnRVcmwge1xuICAgIHByZCA9ICdodHRwczovL2FwaS5tYWlubmV0LWJldGEuc29sYW5hLmNvbScsXG4gICAgcHJkTWV0YXBsZXggPSAnaHR0cHM6Ly9hcGkubWV0YXBsZXguc29sYW5hLmNvbScsXG4gICAgZGV2ID0gJ2h0dHBzOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgICB0ZXN0ID0gJ2h0dHBzOi8vYXBpLnRlc3RuZXQuc29sYW5hLmNvbScsXG4gICAgbG9jYWxob3N0ID0gJ2h0dHA6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICB9XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaENsdXN0ZXIgPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgeyBjbHVzdGVyOiBlbnYsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuXG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSB1cmwsIG1vc3QgcHJpb3JpdHlcbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCAmJiBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoO1xuICAgICAgcmV0dXJuIGN1c3RvbUNsdXN0ZXJVcmxbaW5kZXhdO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQ7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZE1ldGFwbGV4O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci50ZXN0OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnRlc3Q7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLmRldjpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5kZXY7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmxvY2FsaG9zdDtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaEJ1bmRsciA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci50ZXN0OlxuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5sb2NhbGhvc3Q6XG4gICAgICAgIHJldHVybiAnaHR0cHM6Ly9kZXZuZXQuYnVuZGxyLm5ldHdvcmsnO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSAyO1xuICAgICAgICBjb25zdCBjbHVzdGVycyA9IFtcbiAgICAgICAgICAnaHR0cHM6Ly9ub2RlMS5idW5kbHIubmV0d29yaycsXG4gICAgICAgICAgJ2h0dHBzOi8vbm9kZTIuYnVuZGxyLm5ldHdvcmsnLFxuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gY2x1c3RlcnNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgV1JBUFBFRF9UT0tFTl9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnU28xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMicsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRU1PX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdNZW1vMVVoa0pSZkh5dkxNY1Z1Y0p3eFhldUQ3MjhFcVZERHdRRHhGTU5vJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FVEFQTEVYX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdtZXRhcWJ4eFVlcmRxMjhjajFSYkFXa1lRbTN5YnpqYjZhOGJ0NTE4eDFzJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IENPTU1JVE1FTlQ6IENvbW1pdG1lbnQgPSAnY29uZmlybWVkJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPVxuICAgICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUprYVdRNlpYUm9jam93ZUVSR01qY3lOMlZrT0RaaFJHVTFSVE15WkRaRFpFSmxPRGMwWXpSRk5EbEVPRFkxT1dabU9FTWlMQ0pwYzNNaU9pSnVablF0YzNSdmNtRm5aU0lzSW1saGRDSTZNVFl5TURJMk5EazBNemN3Tml3aWJtRnRaU0k2SW1SbGJXOGlmUS5kNEo3MG1pa3hSQjhhNXZ3TnU2U081SERBOEphdWV1c2VBajdRX3l0TUNFJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vaXBmcy5pby9pcGZzJztcbiAgZXhwb3J0IGNvbnN0IEJVTkRMUl9ORVRXT1JLX1VSTCA9IHN3aXRjaEJ1bmRscihDb25maWcuY2x1c3Rlci50eXBlKTtcbn1cbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0UmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvcj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcblxuICB1bndyYXAoKTogVDtcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBVO1xuICB1bndyYXA8VSwgVj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFYpOiBVIHwgVjtcbiAgLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMTBcbiAgLy8gdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBVKTogVTtcbiAgdW53cmFwKG9rPzogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IHVua25vd24pOiB1bmtub3duIHtcbiAgICBjb25zdCByID0gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayA/IG9rKHZhbHVlKSA6IHZhbHVlKSxcbiAgICAgIChlcnJvcikgPT4gKGVyciA/IFJlc3VsdC5vayhlcnIoZXJyb3IpKSA6IFJlc3VsdC5lcnIoZXJyb3IpKSxcbiAgICApO1xuICAgIGlmIChyLmlzRXJyKSB7XG4gICAgICB0aHJvdyByLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gci52YWx1ZTtcbiAgfVxuXG4gIC8vLy8gbWFwIC8vLy9cbiAgbWFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBSZXN1bHQ8VSwgRT47XG4gIG1hcDxVLCBGIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFUsXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IEYsXG4gICk6IFJlc3VsdDxVLCBGPjtcbiAgbWFwKG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gRXJyb3IpOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyID8gZXJyKGVycm9yKSA6IGVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vLyBjaGFpbiAvLy8vXG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMzdcbiAgLy8gZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBFPlxuICBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc3VibWl0IChhbGlhcyBJbnN0cnVjdGlvbi5zdWJtaXQpIC8vLy9cbiAgYXN5bmMgc3VibWl0KCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+IHtcbiAgICB0cnkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb24gPSB0aGlzLnVud3JhcCgpIGFzIGFueTtcbiAgICAgIGlmIChpbnN0cnVjdGlvbi5pbnN0cnVjdGlvbnMgJiYgaW5zdHJ1Y3Rpb24uc2lnbmVycykge1xuICAgICAgICByZXR1cm4gYXdhaXQgaW5zdHJ1Y3Rpb24uc3VibWl0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcignT25seSBJbnN0cnVjdGlvbiBvYmplY3QnKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlcnIgYXMgRXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBJbnRlcm5hbE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSB0cnVlO1xuICByZWFkb25seSBpc0VyciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBfZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxFcnI8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IGZhbHNlO1xuICByZWFkb25seSBpc0VyciA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBfb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlc3VsdCB7XG4gIGV4cG9ydCB0eXBlIE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbE9rPFQsIEU+O1xuICBleHBvcnQgdHlwZSBFcnI8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsRXJyPFQsIEU+O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBvazxULCBFIGV4dGVuZHMgRXJyb3I+KHZhbHVlOiBUKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsT2sodmFsdWUpO1xuICB9XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yPzogRSk6IFJlc3VsdDxULCBFPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I6IEUpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnIoZXJyb3IgfHwgRXJyb3IoKSk7XG4gIH1cblxuICB0eXBlIFUgPSBSZXN1bHQ8dW5rbm93bj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgICBSMTUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNCwgUjE1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgICAgT2tUeXBlPFIxNT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgICB8IFIxNVxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxM10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgUjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTEgfCBSMTIgfCBSMTNcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+LCBPa1R5cGU8UjU+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFUsIFIzIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjNdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjM+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMl0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPl0sIEVyclR5cGU8UjAgfCBSMSB8IFIyPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMV0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPl0sIEVyclR5cGU8UjAgfCBSMT4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjBdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD5dLCBFcnJUeXBlPFIwPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiBbXSk6IFJlc3VsdDxbXT47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8VCBleHRlbmRzIFVbXSB8IFJlY29yZDxzdHJpbmcsIFU+PihcbiAgICBvYmo6IFQsXG4gICk6IFJlc3VsdDxcbiAgICB7IFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PGluZmVyIEk+ID8gSSA6IG5ldmVyIH0sXG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT4gPyBFIDogbmV2ZXI7XG4gICAgfVtrZXlvZiBUXVxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogdW5rbm93bik6IHVua25vd24ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIGNvbnN0IHJlc0FyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaikge1xuICAgICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBpdGVtIGFzIHVua25vd247XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlc0Fycik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSAob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KVtrZXldO1xuICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICByZXNba2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQub2socmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yID0gRXJyb3I+ID1cbiAgfCBSZXN1bHQuT2s8VCwgRT5cbiAgfCBSZXN1bHQuRXJyPFQsIEU+O1xuXG50eXBlIE9rVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgTz4gPyBPIDogbmV2ZXI7XG50eXBlIEVyclR5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+XG4gID8gRVxuICA6IG5ldmVyO1xuIiwgImltcG9ydCB7IEFueU9iamVjdCB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJy4vcmVzdWx0JztcblxuLyoqXG4gKiBPdmVyd3JpdGUgSlMgT2JqZWN0XG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmplY3RcbiAqIEBwYXJhbSB7T3ZlcndyaXRlT2JqZWN0W119IHRhcmdldHNcbiAqIEByZXR1cm5zIE9iamVjdFxuICovXG5leHBvcnQgY29uc3Qgb3ZlcndyaXRlT2JqZWN0ID0gKFxuICBvYmplY3Q6IHVua25vd24sXG4gIHRhcmdldHM6IHtcbiAgICBleGlzdHNLZXk6IHN0cmluZztcbiAgICB3aWxsOiB7IGtleTogc3RyaW5nOyB2YWx1ZTogdW5rbm93biB9O1xuICB9W10sXG4pOiB1bmtub3duID0+IHtcbiAgY29uc3QgdGhhdDogQW55T2JqZWN0ID0gb2JqZWN0IGFzIEFueU9iamVjdDtcbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBkZWxldGUgdGhhdFt0YXJnZXQuZXhpc3RzS2V5XTtcbiAgICB0aGF0W3RhcmdldC53aWxsLmtleV0gPSB0YXJnZXQud2lsbC52YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0aGF0O1xufTtcblxuLyoqXG4gKiBEaXNwbGF5IGxvZyBmb3Igc29sYW5hLXN1aXRlLWNvbmZpZy5qc1xuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTFcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTJcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTNcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTRcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnTG9nID0gKFxuICBkYXRhMTogdW5rbm93bixcbiAgZGF0YTI6IHVua25vd24gPSAnJyxcbiAgZGF0YTM6IHVua25vd24gPSAnJyxcbiAgZGF0YTQ6IHVua25vd24gPSAnJyxcbik6IHZvaWQgPT4ge1xuICBpZiAoQ29uc3RhbnRzLmlzRGVidWdnaW5nID09PSAndHJ1ZScgfHwgcHJvY2Vzcy5lbnYuREVCVUcgPT09ICd0cnVlJykge1xuICAgIGNvbnNvbGUubG9nKCdbREVCVUddJywgZGF0YTEsIGRhdGEyLCBkYXRhMywgZGF0YTQpO1xuICB9XG59O1xuXG4vKipcbiAqIHNsZWVwIHRpbWVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNlY1xuICogQHJldHVybnMgUHJvbWlzZTxudW1iZXI+XG4gKi9cbmV4cG9ydCBjb25zdCBzbGVlcCA9IGFzeW5jIChzZWM6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCBzZWMgKiAxMDAwKSk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucyAhPSBudWxsICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlICE9IG51bGxcbiAgKTtcbn07XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuZXhwb3J0IGNvbnN0IGlzUHJvbWlzZSA9IChvYmo6IHVua25vd24pOiBvYmogaXMgUHJvbWlzZTx1bmtub3duPiA9PiB7XG4gIHJldHVybiAoXG4gICAgISFvYmogJiZcbiAgICAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiZcbiAgICB0eXBlb2YgKG9iaiBhcyBhbnkpLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgKTtcbn07XG5cbi8qKlxuICogVHJ5IGFzeW5jIG1vbmFkXG4gKlxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8VCwgRT4+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgYXN5bmNibG9jazogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8UmVzdWx0PFQsIEU+PjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihibG9jazogKCkgPT4gVCk6IFJlc3VsdDxULCBFPjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgaW5wdXQ6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBSZXN1bHQ8VCwgRXJyb3I+IHwgUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdiA9IGlucHV0KCk7XG4gICAgaWYgKGlzUHJvbWlzZSh2KSkge1xuICAgICAgcmV0dXJuIHYudGhlbihcbiAgICAgICAgKHg6IFQpID0+IFJlc3VsdC5vayh4KSxcbiAgICAgICAgKGVycjogRSkgPT4gUmVzdWx0LmVycihlcnIpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayh2KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoZSBhcyBzdHJpbmcpKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZmluYWxseUlucHV0KSB7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5hbGx5IGlucHV0OicsIGZpbmFsbHlJbnB1dCk7XG4gICAgICBmaW5hbGx5SW5wdXQoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8dW5kZWZpbmVkfSBjcmVhdGVkX2F0XG4gKiBAcmV0dXJucyBEYXRlIHwgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSA9IChcbiAgY3JlYXRlZF9hdDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuKTogRGF0ZSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChjcmVhdGVkX2F0KSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGNyZWF0ZWRfYXQgKiAxMDAwKTtcbiAgfVxuICByZXR1cm47XG59O1xuIiwgImltcG9ydCB7IEtleXBhaXIsIExBTVBPUlRTX1BFUl9TT0wsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBLZXlwYWlyQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIgfSBmcm9tICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbi8qKlxuICogQ3JlYXRlIGV4cGxvcmVyIHVybCBmb3IgYWNjb3VudCBhZGRyZXNzIG9yIHNpZ25hdHVyZVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5TdHJpbmcucHJvdG90eXBlLnRvRXhwbG9yZXJVcmwgPSBmdW5jdGlvbiAoXG4gIGV4cGxvcmVyOiBFeHBsb3JlciA9IEV4cGxvcmVyLlNvbHNjYW4sXG4pIHtcbiAgY29uc3QgZW5kUG9pbnRVcmwgPSBOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludDtcbiAgZGVidWdMb2coJyMgdG9FeHBsb3JlclVybCBycGNFbmRwb2ludDonLCBlbmRQb2ludFVybCk7XG4gIGxldCBjbHVzdGVyID0gJyc7XG4gIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLnRlc3Q7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5kZXYpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9IGVsc2Uge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH1cblxuICBjb25zdCBhZGRyZXNzT3JTaWduYXR1cmU6IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgbGV0IHVybCA9ICcnO1xuICBpZiAoS2V5cGFpckFjY291bnQuaXNQdWJrZXkoYWRkcmVzc09yU2lnbmF0dXJlKSkge1xuICAgIC8vIGFkZHJlc3NcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgaHR0cHM6Ly9zb2xhbmEuZm0vYWRkcmVzcy8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sc2Nhbi5pby9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICAvLyBzaWduYXR1cmVcbiAgfSBlbHNlIHtcbiAgICAvLyBmb3IgSW52YWxpZCB0eXBlIFwibmV2ZXJcIiBvZiBhZGRyZXNzT3JTaWduYXR1cmUsIHNvIGBhcyBzdHJpbmdgXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sYW5hLmZtL3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sc2Nhbi5pby90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFB1YktleShAc29sYW5hLXN1aXRlKSB0byBQdWJsaWNLZXkoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFB1YmxpY0tleVxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvUHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUtleXBhaXJBY2NvdW50LmlzUHVia2V5KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5QdWJLZXk6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMudG9TdHJpbmcoKSk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUtleXBhaXJBY2NvdW50LmlzU2VjcmV0KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5TZWNyZXQ6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy50b1N0cmluZygpKTtcbiAgcmV0dXJuIEtleXBhaXIuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbn07XG5cbi8qKlxuICogTEFNUE9SVFMgdG8gU09MXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9Tb2wgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC50aW1lcyhMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb21taXRtZW50LCBDb25uZWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcbiAgY29uc3Qgc2V0dGVkID0ge1xuICAgIGNsdXN0ZXJVcmw6ICcnLFxuICAgIGNvbW1pdG1lbnQ6IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICAgIGN1c3RvbUNsdXN0ZXJVcmw6IFtdIGFzIHN0cmluZ1tdLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uID0gKCk6IENvbm5lY3Rpb24gPT4ge1xuICAgIGRlYnVnTG9nKCcjIFtCZWZvcmVdIHNldHRlZDonLCBzZXR0ZWQpO1xuICAgIGRlYnVnTG9nKFxuICAgICAgJyMgW0JlZm9yZV0gQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmw6JyxcbiAgICAgIENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLFxuICAgICk7XG5cbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIGRlYnVnTG9nKCcjIFtBZnRlcl0gc2V0dGVkOicsIHNldHRlZCk7XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IENvbW1pdG1lbnQ7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vZGVmaW5lJztcbmltcG9ydCB7IEluc3RydWN0aW9uIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaC1zdWJtaXQnO1xuXG5leHBvcnQgY2xhc3MgSW5zdHJ1Y3Rpb24ge1xuICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgc2lnbmVyczogS2V5cGFpcltdO1xuICBmZWVQYXllcj86IEtleXBhaXI7XG4gIGRhdGE/OiB1bmtub3duO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgZGF0YT86IHVua25vd24sXG4gICkge1xuICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzdWJtaXQgPSBhc3luYyAoKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEluc3RydWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogc2VuVHJhbnNhY3Rpb24oKSBUcmFuc2FjdGlvbkluc3RydWN0aW9uXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBAdHMtaWdub3JlICovXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0cnVjdGlvbnM6IEluc3RydWN0aW9uW10gPSBbXTtcbiAgLy8gZG9udCB1c2UgZm9yRWFjaFxuICAvLyBJdCBpcyBub3QgcG9zc2libGUgdG8gc3RvcCB0aGUgcHJvY2VzcyBieSBSRVRVUk4gaW4gdGhlIG1pZGRsZSBvZiB0aGUgcHJvY2Vzcy5cbiAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzOiBzdHJpbmcgPSBvYmouZXJyb3IubWVzc2FnZSBhcyBzdHJpbmc7XG4gICAgICAgIHRocm93IEVycm9yKGBbQXJyYXkgaW5kZXggb2YgY2F1Z2h0ICdSZXN1bHQuZXJyJzogJHtpfV0ke2Vycm9yTWVzc31gKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqLmlzT2spIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlIGFzIEluc3RydWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iaiBhcyBJbnN0cnVjdGlvbik7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBCYXRjaC5iYXRjaFN1Ym1pdChpbnN0cnVjdGlvbnMpO1xuICB9KTtcbn07XG4iLCAiLy9AaW50ZXJuYWxzXG5leHBvcnQgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2RlZmluZSc7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiBhcyBfSW5kZXggfSBmcm9tICcuLyc7XG5cbmV4cG9ydCBjbGFzcyBJbnN0cnVjdGlvbiB7XG4gIHN0YXRpYyBiYXRjaFN1Ym1pdCA9IGFzeW5jIChhcnI6IF9JbmRleFtdKTogUHJvbWlzZTxUcmFuc2FjdGlvblNpZ25hdHVyZT4gPT4ge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IGEgb2YgYXJyKSB7XG4gICAgICBpZiAoIWEuaW5zdHJ1Y3Rpb25zICYmICFhLnNpZ25lcnMpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgYG9ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSBiYXRjaFN1Ym1pdCgpLlxuICAgICAgICAgICAgSW5kZXg6ICR7aX0sIFNldCB2YWx1ZTogJHtKU09OLnN0cmluZ2lmeShhKX1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLmluc3RydWN0aW9ucyk7XG4gICAgY29uc3Qgc2lnbmVycyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLnNpZ25lcnMpO1xuICAgIGNvbnN0IGZlZVBheWVycyA9IGFyci5maWx0ZXIoKGEpID0+IGEuZmVlUGF5ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgbGV0IGZlZVBheWVyID0gc2lnbmVyc1swXTtcbiAgICBpZiAoZmVlUGF5ZXJzLmxlbmd0aCA+IDAgJiYgZmVlUGF5ZXJzWzBdLmZlZVBheWVyKSB7XG4gICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgIGlmIChmZWVQYXllcikge1xuICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSBmZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgIH1cbiAgICBpbnN0cnVjdGlvbnMubWFwKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICB9O1xufVxuXG4vKipcbiAqIHNlblRyYW5zYWN0aW9uKCkgVHJhbnNhY3Rpb25JbnN0cnVjdGlvblxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuLyogQHRzLWlnbm9yZSAqL1xuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBfSW5kZXhbXSA9IFtdO1xuICAvLyBkb250IHVzZSBmb3JFYWNoXG4gIC8vIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBzdG9wIHRoZSBwcm9jZXNzIGJ5IFJFVFVSTiBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwcm9jZXNzLlxuICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICBjb25zdCBlcnJvck1lc3M6IHN0cmluZyA9IG9iai5lcnJvci5tZXNzYWdlIGFzIHN0cmluZztcbiAgICAgICAgdGhyb3cgRXJyb3IoYFtBcnJheSBpbmRleCBvZiBjYXVnaHQgJ1Jlc3VsdC5lcnInOiAke2l9XSR7ZXJyb3JNZXNzfWApO1xuICAgICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUgYXMgX0luZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iaiBhcyBfSW5kZXgpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gSW5zdHJ1Y3Rpb24uYmF0Y2hTdWJtaXQoaW5zdHJ1Y3Rpb25zKTtcbiAgfSk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vaW5zdHJ1Y3Rpb24vZGVmaW5lJztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnLi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBNaW50SW5zdHJ1Y3Rpb24gZXh0ZW5kcyBJbnN0cnVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgZGF0YT86IHVua25vd24sXG4gICkge1xuICAgIHN1cGVyKGluc3RydWN0aW9ucywgc2lnbmVycywgZmVlUGF5ZXIsIGRhdGEpO1xuICB9XG5cbiAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW50SW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IE1pbnRJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICB9O1xuXG4gICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgZGVidWdMb2coJyMgQ2hhbmdlIG1ldGFwbGV4IGNsdXN0ZXIgb24gbWFpbm5ldC1iZXRhJyk7XG4gICAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXI6IENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4IH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIEtleXBhaXIsXG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgU1lTVkFSX1JFTlRfUFVCS0VZLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBibG9iLCBzdHJ1Y3QsIHU4IH0gZnJvbSAnQHNvbGFuYS9idWZmZXItbGF5b3V0JztcbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWdJbnN0cnVjdGlvbiB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgY29uc3QgY3JlYXRlTGF5b3V0UHViS2V5ID0gKHByb3BlcnR5OiBzdHJpbmcpOiBhbnkgPT4ge1xuICAgIHJldHVybiBibG9iKDMyLCBwcm9wZXJ0eSk7XG4gIH07XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudCAqL1xuICBleHBvcnQgY29uc3QgTGF5b3V0ID0gc3RydWN0PHtcbiAgICBtOiBudW1iZXI7XG4gICAgbjogbnVtYmVyO1xuICAgIGlzX2luaXRpYWxpemVkOiBudW1iZXI7XG4gICAgc2lnbmVyMTogUHVibGljS2V5O1xuICAgIHNpZ25lcjI6IFB1YmxpY0tleTtcbiAgICBzaWduZXIzOiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNDogUHVibGljS2V5O1xuICAgIHNpZ25lcjU6IFB1YmxpY0tleTtcbiAgICBzaWduZXI2OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNzogUHVibGljS2V5O1xuICAgIHNpZ25lcjg6IFB1YmxpY0tleTtcbiAgICBzaWduZXI5OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyMTA6IFB1YmxpY0tleTtcbiAgICBzaWduZXIxMTogUHVibGljS2V5O1xuICB9PihbXG4gICAgdTgoJ20nKSxcbiAgICB1OCgnbicpLFxuICAgIHU4KCdpc19pbml0aWFsaXplZCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMTAnKSxcbiAgICBjcmVhdGVMYXlvdXRQdWJLZXkoJ3NpZ25lcjExJyksXG4gIF0pO1xuXG4gIGV4cG9ydCBjb25zdCBhY2NvdW50ID0gKFxuICAgIG5ld0FjY291bnQ6IEtleXBhaXIsXG4gICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgYmFsYW5jZU5lZWRlZDogbnVtYmVyLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG5ld0FjY291bnQucHVibGljS2V5LFxuICAgICAgbGFtcG9ydHM6IGJhbGFuY2VOZWVkZWQsXG4gICAgICBzcGFjZTogTGF5b3V0LnNwYW4sXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IG11bHRpc2lnID0gKFxuICAgIG06IG51bWJlcixcbiAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICBzaWduZXJQdWJrZXk6IFB1YmxpY0tleVtdLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAge1xuICAgICAgICBwdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHVia2V5OiBTWVNWQVJfUkVOVF9QVUJLRVksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgc2lnbmVyUHVia2V5LmZvckVhY2goKHB1YmtleSkgPT5cbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIHB1YmtleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBkYXRhTGF5b3V0ID0gc3RydWN0PHsgaW5zdHJ1Y3Rpb246IG51bWJlcjsgbTogbnVtYmVyIH0+KFtcbiAgICAgIHU4KCdpbnN0cnVjdGlvbicpLFxuICAgICAgdTgoJ20nKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuYWxsb2MoZGF0YUxheW91dC5zcGFuKTtcblxuICAgIGRhdGFMYXlvdXQuZW5jb2RlKFxuICAgICAge1xuICAgICAgICBpbnN0cnVjdGlvbjogMixcbiAgICAgICAgbSxcbiAgICAgIH0sXG4gICAgICBkYXRhLFxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAga2V5cyxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9pbnN0cnVjdGlvbi9kZWZpbmUnO1xuXG5leHBvcnQgY2xhc3MgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiB7XG4gIGhleEluc3RydWN0aW9uOiBzdHJpbmc7XG4gIGRhdGE/OiBQdWJrZXk7XG5cbiAgY29uc3RydWN0b3IoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIG1pbnQ/OiBQdWJrZXkpIHtcbiAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gIH1cblxuICBzdWJtaXQgPSBhc3luYyAoXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZSA9IEJ1ZmZlci5mcm9tKHRoaXMuaGV4SW5zdHJ1Y3Rpb24sICdoZXgnKTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uRnJvbUpzb24gPSBUcmFuc2FjdGlvbi5mcm9tKGRlY29kZSk7XG4gICAgICB0cmFuc2FjdGlvbkZyb21Kc29uLnBhcnRpYWxTaWduKGZlZVBheWVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHdpcmVUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uRnJvbUpzb24uc2VyaWFsaXplKCk7XG4gICAgICByZXR1cm4gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuc2VuZFJhd1RyYW5zYWN0aW9uKFxuICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2csIHNsZWVwIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnfi9pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBY2NvdW50LFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcixcbiAgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHsgS2V5cGFpckFjY291bnQgfSBmcm9tICcuL2tleXBhaXItYWNjb3VudCc7XG5cbi8qKlxuICogR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gKlxuICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsbG93T3duZXJPZmZDdXJ2ZVxuICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBBc3NvY2lhdGVkQWNjb3VudCB7XG4gIGNvbnN0IFJFVFJZX09WRVJfTElNSVQgPSAxMDtcbiAgY29uc3QgUkVUUllfU0xFRVBfVElNRSA9IDM7XG4gIGNvbnN0IGdldCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICApOiBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPiA9PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZlZVBheWVyIH0pLnB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICApO1xuXG4gICAgaWYgKCFyZXMuaW5zdCkge1xuICAgICAgcmV0dXJuIHJlcy50b2tlbkFjY291bnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgIFtyZXMuaW5zdF0sXG4gICAgICBbXSxcbiAgICAgIGZlZVBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgcmVzLnRva2VuQWNjb3VudCxcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXRyeSBmdW5jdGlvbiBpZiBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAqL1xuICBleHBvcnQgY29uc3QgcmV0cnlHZXRPckNyZWF0ZSA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGxldCBjb3VudGVyID0gMTtcbiAgICB3aGlsZSAoY291bnRlciA8IFJFVFJZX09WRVJfTElNSVQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBnZXQobWludCwgb3duZXIsIGZlZVBheWVyLCB0cnVlKTtcblxuICAgICAgICBpZiAoaW5zdCAmJiB0eXBlb2YgaW5zdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBpbnN0KTtcbiAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgfSBlbHNlIGlmIChpbnN0IGluc3RhbmNlb2YgSW5zdHJ1Y3Rpb24pIHtcbiAgICAgICAgICAoYXdhaXQgaW5zdC5zdWJtaXQoKSkubWFwKFxuICAgICAgICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgICAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKG9rKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGluc3QuZGF0YSBhcyBzdHJpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICBkZWJ1Z0xvZygnIyBFcnJvciBzdWJtaXQgcmV0cnlHZXRPckNyZWF0ZTogJywgZXJyKTtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGRlYnVnTG9nKGAjIHJldHJ5OiAke2NvdW50ZXJ9IGNyZWF0ZSB0b2tlbiBhY2NvdW50OiBgLCBlKTtcbiAgICAgICAgZGVidWdMb2coYCMgbWludDogJHttaW50fSwgb3duZXI6ICR7b3duZXJ9LCBmZWVQYXllcjogJHtmZWVQYXllcn1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNsZWVwKFJFVFJZX1NMRUVQX1RJTUUpO1xuICAgICAgY291bnRlcisrO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcihgcmV0cnkgYWN0aW9uIGlzIG92ZXIgbGltaXQgJHtSRVRSWV9PVkVSX0xJTUlUfWApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZlZVBheWVyPzogUHVia2V5LFxuICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICApOiBQcm9taXNlPHtcbiAgICB0b2tlbkFjY291bnQ6IHN0cmluZztcbiAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICB9PiA9PiB7XG4gICAgY29uc3QgYXNzb2NpYXRlZFRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgKTtcblxuICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gRG9udCB1c2UgUmVzdWx0XG4gICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgaW5zdDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgaWYgKFxuICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gb3duZXIgOiBmZWVQYXllcjtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgcGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgaW5zdCxcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXIsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbmV4cG9ydCBjbGFzcyBLZXlwYWlyQWNjb3VudCB7XG4gIHNlY3JldDogU2VjcmV0O1xuICBwdWJrZXk6IFB1YmtleTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgaWYgKCFwYXJhbXMucHVia2V5KSB7XG4gICAgICBjb25zdCBrZXlwYWlyID0gcGFyYW1zLnNlY3JldC50b0tleXBhaXIoKTtcbiAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdWJrZXkgPSBwYXJhbXMucHVia2V5O1xuICAgIH1cbiAgICB0aGlzLnNlY3JldCA9IHBhcmFtcy5zZWNyZXQ7XG4gIH1cblxuICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMucHVia2V5KTtcbiAgfVxuXG4gIHRvS2V5cGFpcigpOiBLZXlwYWlyIHtcbiAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICByZXR1cm4gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICB9XG5cbiAgc3RhdGljIGlzUHVia2V5ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBQdWJrZXkgPT5cbiAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gIHN0YXRpYyBpc1NlY3JldCA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgU2VjcmV0ID0+XG4gICAgL15bMC05YS16QS1aXXs4Nyw4OH0kLy50ZXN0KHZhbHVlKTtcblxuICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXJBY2NvdW50ID0+IHtcbiAgICBjb25zdCBrZXlwYWlyID0gS2V5cGFpci5nZW5lcmF0ZSgpO1xuICAgIHJldHVybiBuZXcgS2V5cGFpckFjY291bnQoe1xuICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgfSk7XG4gIH07XG5cbiAgc3RhdGljIHRvS2V5UGFpciA9IChrZXlwYWlyOiBLZXlwYWlyKTogS2V5cGFpckFjY291bnQgPT4ge1xuICAgIHJldHVybiBuZXcgS2V5cGFpckFjY291bnQoe1xuICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogUHViS2V5KEBzb2xhbmEtc3VpdGUpIHRvIFB1YmxpY0tleShAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHVibGljS2V5XG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9QdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghS2V5cGFpckFjY291bnQuaXNQdWJrZXkodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlB1YktleTogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcyk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUtleXBhaXJBY2NvdW50LmlzU2VjcmV0KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5TZWNyZXQ6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcyBhcyBzdHJpbmcpO1xuICByZXR1cm4gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xufTtcbiIsICJpbXBvcnQgeyBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFBkYSB7XG4gIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChtaW50OiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICBbXG4gICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgXSxcbiAgICAgIFBST0dSQU1fSUQsXG4gICAgKTtcbiAgICByZXR1cm4gcHVibGljS2V5O1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRNYXN0ZXJFZGl0aW9uID0gKG1pbnQ6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgIFtcbiAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgIEJ1ZmZlci5mcm9tKCdlZGl0aW9uJyksXG4gICAgICBdLFxuICAgICAgUFJPR1JBTV9JRCxcbiAgICApO1xuICAgIHJldHVybiBwdWJsaWNLZXk7XG4gIH07XG59XG4iLCAiLy9AaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlQW1vdW50ID0gKFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGFtb3VudCAqIDEwICoqIG1pbnREZWNpbWFsO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIGNyZWF0ZUJ1cm5DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiB9IGZyb20gJ34vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBfQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGJ1cm5BbW91bnQ6IG51bWJlcixcbiAgICB0b2tlbkRlY2ltYWxzOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyLnRvS2V5cGFpcigpIDogc2lnbmVyc1swXS50b0tleXBhaXIoKTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIF9DYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KGJ1cm5BbW91bnQsIHRva2VuRGVjaW1hbHMpLFxuICAgICAgICB0b2tlbkRlY2ltYWxzLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi4vLi4vc3RvcmFnZSc7XG5pbXBvcnQgeyBDb21tb24sIGJpZ251bSwgRmlsZUNvbnRlbnQgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnLi4vLi4vYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVXNlclNpZGVJbnB1dCB7XG4gIGV4cG9ydCB0eXBlIENvbGxlY3Rpb24gPSBQdWJrZXk7XG5cbiAgZXhwb3J0IHR5cGUgQ3JlYXRvcnMgPSB7XG4gICAgYWRkcmVzczogUHVia2V5O1xuICAgIHNoYXJlOiBudW1iZXI7XG4gICAgdmVyaWZpZWQ6IGJvb2xlYW47XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgUHJvcGVydGllcyA9IENvbW1vbi5Qcm9wZXJ0aWVzO1xuXG4gIGV4cG9ydCBlbnVtIFRva2VuU3RhbmRhcmQge1xuICAgIE5vbkZ1bmdpYmxlID0gMCxcbiAgICBGdW5naWJsZUFzc2V0ID0gMSxcbiAgICBGdW5naWJsZSA9IDIsXG4gICAgTm9uRnVuZ2libGVFZGl0aW9uID0gMyxcbiAgICBQcm9ncmFtbWFibGVOb25GdW5naWJsZSA9IDQsXG4gIH1cblxuICBleHBvcnQgdHlwZSBOZnRNZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3ltYm9sOiBzdHJpbmc7XG4gICAgcm95YWx0eTogbnVtYmVyO1xuICAgIHN0b3JhZ2VUeXBlPzogU3RvcmFnZVR5cGU7XG4gICAgZmlsZVBhdGg/OiBGaWxlQ29udGVudDtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgaXNNdXRhYmxlPzogYm9vbGVhbjtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBleHRlcm5hbF91cmw/OiBzdHJpbmc7XG4gICAgYXR0cmlidXRlcz86IENvbW1vbi5BdHRyaWJ1dGVbXTtcbiAgICBwcm9wZXJ0aWVzPzogUHJvcGVydGllcztcbiAgICBtYXhTdXBwbHk/OiBiaWdudW07XG4gICAgY3JlYXRvcnM/OiBDcmVhdG9yc1tdO1xuICAgIHVzZXM/OiBDb21tb24uVXNlcztcbiAgICBjb2xsZWN0aW9uPzogQ29sbGVjdGlvbjtcbiAgICBvcHRpb25zPzogQ29tbW9uLk9wdGlvbnM7XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgVG9rZW5NZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3ltYm9sOiBzdHJpbmc7XG4gICAgZmlsZVBhdGg/OiBGaWxlQ29udGVudDtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlVHlwZTtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICByb3lhbHR5PzogbnVtYmVyO1xuICAgIHVzZXM/OiBDb21tb24uVXNlcztcbiAgICBjcmVhdG9ycz86IENyZWF0b3JzW107XG4gICAgYXR0cmlidXRlcz86IENvbW1vbi5BdHRyaWJ1dGVbXTtcbiAgICBvcHRpb25zPzogQ29tbW9uLk9wdGlvbnM7XG4gIH07XG59XG4iLCAiaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IHR5cGUgT3B0aW9uPFQ+ID0gVCB8IG51bGw7XG5leHBvcnQgdHlwZSBiaWdudW0gPSBudW1iZXIgfCBCTjtcbmV4cG9ydCB0eXBlIEZpbGVDb250ZW50ID0gc3RyaW5nIHwgQnVmZmVyIHwgVWludDhBcnJheSB8IEFycmF5QnVmZmVyO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbW1vbiB7XG4gIGV4cG9ydCB0eXBlIFByb3BlcnRpZXMgPSB7XG4gICAgY3JlYXRvcnM/OiB7XG4gICAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgICAgc2hhcmU/OiBudW1iZXI7XG4gICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH1bXTtcbiAgICBmaWxlcz86IHtcbiAgICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgICBmaWxlUGF0aD86IEZpbGVDb250ZW50O1xuICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICB9W107XG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgfTtcblxuICBleHBvcnQgdHlwZSBBdHRyaWJ1dGUgPSB7XG4gICAgdHJhaXRfdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICB9O1xuXG4gIGV4cG9ydCBlbnVtIFVzZU1ldGhvZCB7XG4gICAgQnVybiA9IDAsXG4gICAgTXVsdGlwbGUgPSAxLFxuICAgIFNpbmdsZSA9IDIsXG4gIH1cblxuICBleHBvcnQgdHlwZSBVc2VzID0ge1xuICAgIHVzZU1ldGhvZDogVXNlTWV0aG9kO1xuICAgIHJlbWFpbmluZzogYmlnbnVtO1xuICAgIHRvdGFsOiBiaWdudW07XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgT3B0aW9ucyA9IHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9O1xufVxuIiwgImltcG9ydCB7XG4gIEluZnJhU2lkZUlucHV0LFxuICBJbmZyYVNpZGVPdXRwdXQsXG4gIE9wdGlvbixcbiAgVXNlclNpZGVJbnB1dCxcbiAgVXNlclNpZGVPdXRwdXQsXG59IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb24ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxVc2VyU2lkZUlucHV0LkNvbGxlY3Rpb24+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbmZyYVNpZGVJbnB1dC5Db2xsZWN0aW9uPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGlucHV0LnRvUHVibGljS2V5KCksXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbmZyYVNpZGVPdXRwdXQuQ29sbGVjdGlvbj4sXG4gICAgKTogVXNlclNpZGVPdXRwdXQuQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiBvdXRwdXQua2V5LnRvU3RyaW5nKCksXG4gICAgICAgIHZlcmlmaWVkOiBvdXRwdXQudmVyaWZpZWQsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBPcHRpb24sXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDcmVhdG9ycyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPFVzZXJTaWRlSW5wdXQuQ3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEluZnJhU2lkZUlucHV0LkNyZWF0b3JzW10+ID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGxldCBtb2RpZnk6IE9wdGlvbjxJbmZyYVNpZGVJbnB1dC5DcmVhdG9ycz4gPSBudWxsO1xuICAgICAgICBtb2RpZnkgPSB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG1vZGlmeTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW5mcmFTaWRlT3V0cHV0LkNyZWF0b3JbXT4sXG4gICAgKTogVXNlclNpZGVPdXRwdXQuQ3JlYXRvcnNbXSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBtb2RpZnkgPSB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBtb2RpZnk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1lbW8ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5NZW1vLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG91dHB1dFRyYW5zZmVyPzogSW5mcmFTaWRlT3V0cHV0LlRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIGNhc2U6IHRyYW5zZmVyIHdpdGggbWVtb1xuICAgICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50ICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gPT09ICdzcGwtdG9rZW4nKSB7XG4gICAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8ubWludDtcbiAgICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5tZW1vID0gb3V0cHV0LnBhcnNlZDtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuTWludFRvLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm1pbnRBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludEF1dGhvcml0eTtcbiAgICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgICBoaXN0b3J5LmFjY291bnQgPSBvdXRwdXQucGFyc2VkLmluZm8uYWNjb3VudCBhcyBzdHJpbmc7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEluZnJhU2lkZU91dHB1dCwgT3B0aW9uLCBVc2VyU2lkZU91dHB1dCB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFVzZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbmZyYVNpZGVPdXRwdXQuVXNlcz4sXG4gICAgKTogVXNlclNpZGVPdXRwdXQuVXNlcyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Vc2VzIH0gZnJvbSAnLi91c2VzJztcbmltcG9ydCB7XG4gIEluZnJhU2lkZUlucHV0LFxuICBJbmZyYVNpZGVPdXRwdXQsXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRva2VuTWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKFxuICAgICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5NZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBJbmZyYVNpZGVJbnB1dC5NZXRhcGxleERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmFTaWRlKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogbnVsbCxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk9uY2hhaW5BbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wpLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgdXNlczogX1VzZXMuVXNlcy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4udXNlcyksXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCksXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gICAgLy8gZGVsZXRlIE5VTEwoMHgwMCkgc3RyaW5ncyBmdW5jdGlvblxuICAgIGV4cG9ydCBjb25zdCBkZWxldGVOdWxsU3RyaW5ncyA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcMC9nLCAnJyk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX1VzZXMgfSBmcm9tICcuL3VzZXMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Ub2tlbiB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHtcbiAgSW5mcmFTaWRlSW5wdXQsXG4gIEluZnJhU2lkZU91dHB1dCxcbiAgVXNlclNpZGVJbnB1dCxcbiAgVXNlclNpZGVPdXRwdXQsXG59IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcblxuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBOZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSAoXG4gICAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBJbmZyYVNpZGVJbnB1dC5NZXRhcGxleERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmFTaWRlKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogX0NvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmFTaWRlKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuT25jaGFpbkFuZE9mZmNoYWluLFxuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgICApOiBVc2VyU2lkZU91dHB1dC5OZnRNZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3V0cHV0Lm9uY2hhaW4udXBkYXRlQXV0aG9yaXR5LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IF9Ub2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogX1Rva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3MoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wsXG4gICAgICAgICksXG4gICAgICAgIHRva2VuQW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgdXJpOiBfVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnVyaSksXG4gICAgICAgIGlzTXV0YWJsZTogb3V0cHV0Lm9uY2hhaW4uaXNNdXRhYmxlLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBvdXRwdXQub25jaGFpbi5wcmltYXJ5U2FsZUhhcHBlbmVkLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5lZGl0aW9uTm9uY2UsXG4gICAgICAgIGNvbGxlY3Rpb246IF9Db2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b1VzZXJTaWRlKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmNvbGxlY3Rpb24sXG4gICAgICAgICksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgb3ZlcndyaXRlT2JqZWN0LCBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZUNvbnRlbnQsIEluZnJhU2lkZUlucHV0LCBVc2VyU2lkZUlucHV0IH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUHJvcGVydGllcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSBhc3luYyAoXG4gICAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5Qcm9wZXJ0aWVzIHwgdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2tGdW5jOiAoXG4gICAgICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICAgICkgPT4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+LFxuICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxJbmZyYVNpZGVJbnB1dC5Qcm9wZXJ0aWVzPiA9PiB7XG4gICAgICBpZiAoIWlucHV0IHx8ICFpbnB1dC5maWxlcykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGlucHV0LmZpbGVzLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICAgIGlmICghZmlsZS5maWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBjYWxsYmFja0Z1bmMoZmlsZS5maWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgICAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvdmVyd3JpdGVPYmplY3QoZmlsZSwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBleGlzdHNLZXk6ICdmaWxlUGF0aCcsXG4gICAgICAgICAgICAgIHdpbGw6IHsga2V5OiAndXJpJywgdmFsdWU6IHJlcy52YWx1ZSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgLi4uaW5wdXQsIGZpbGVzIH0gYXMgSW5mcmFTaWRlSW5wdXQuUHJvcGVydGllcztcbiAgICB9O1xuICB9XG59XG4iLCAiZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJveWFsdHkge1xuICAgIGV4cG9ydCBjb25zdCBUSFJFU0hPTEQgPSAxMDA7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0LlRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCkge1xuICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICApO1xuICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICB9XG5cbiAgICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubXVsdGlzaWdBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubXVsdGlzaWdBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnNpZ25lcnMgPSBvdXRwdXQucGFyc2VkLmluZm8uc2lnbmVycztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlciB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0LlRyYW5zZmVyLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gdmFsaWRhdGlvbiBjaGVja1xuICAgICAgaWYgKCFvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24gfHwgIW91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICBoaXN0b3J5LnNvbCA9IG91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cz8udG9Tb2woKS50b1N0cmluZygpO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1lbW8gfSBmcm9tICcuL21lbW8nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE5mdE1ldGFkYXRhIH0gZnJvbSAnLi9uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFByb3BlcnRpZXMgfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJveWFsdHkgfSBmcm9tICcuL3JveWFsdHknO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRva2VuTWV0YWRhdGEgfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICcuL3RyYW5zZmVyLWNoZWNrZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5cbmV4cG9ydCBjb25zdCBDb252ZXJ0ZXIgPSB7XG4gIC4uLkNvbGxlY3Rpb24sXG4gIC4uLkNyZWF0b3JzLFxuICAuLi5NZW1vLFxuICAuLi5NaW50LFxuICAuLi5OZnRNZXRhZGF0YSxcbiAgLi4uUHJvcGVydGllcyxcbiAgLi4uUm95YWx0eSxcbiAgLi4uVG9rZW5NZXRhZGF0YSxcbiAgLi4uVHJhbnNmZXJDaGVja2VkLFxuICAuLi5UcmFuc2ZlcixcbiAgLi4uVXNlcyxcbn07XG4iLCAiaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNvcnRhYmxlIH0gZnJvbSAnfi90eXBlcy9maW5kJztcbmltcG9ydCB7IE9uRXJyLCBPbk9rIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUGRhIH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFBhcnNlZEFjY291bnREYXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBVTkFCTEVfRVJST1JfUkVHRVggPSAvVW5hYmxlIHRvIGZpbmQgTWV0YWRhdGEgYWNjb3VudC87XG5cbiAgLy8gU29ydCBieSBsYXRlc3Qgd2l0aCB1bml4dGltZXN0YW1wIGZ1bmN0aW9uXG4gIGNvbnN0IHNvcnRCeVVpbml4VGltZXN0YW1wID1cbiAgICA8VCBleHRlbmRzIFVzZXJTaWRlT3V0cHV0Lk5mdE1ldGFkYXRhIHwgVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YT4oXG4gICAgICBzb3J0YWJsZTogU29ydGFibGUsXG4gICAgKSA9PlxuICAgIChhOiBULCBiOiBUKTogbnVtYmVyID0+IHtcbiAgICAgIGlmICghYS5vZmZjaGFpbi5jcmVhdGVkX2F0KSB7XG4gICAgICAgIGEub2ZmY2hhaW4uY3JlYXRlZF9hdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoIWIub2ZmY2hhaW4uY3JlYXRlZF9hdCkge1xuICAgICAgICBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRhYmxlID09PSBTb3J0YWJsZS5EZXNjKSB7XG4gICAgICAgIHJldHVybiBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgLSBhLm9mZmNoYWluLmNyZWF0ZWRfYXQ7XG4gICAgICB9IGVsc2UgaWYgKHNvcnRhYmxlID09PSBTb3J0YWJsZS5Bc2MpIHtcbiAgICAgICAgcmV0dXJuIGEub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGIub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgLSBhLm9mZmNoYWluLmNyZWF0ZWRfYXQ7XG4gICAgICB9XG4gICAgfTtcblxuICBjb25zdCBjb252ZXJ0ZXIgPSA8VD4oXG4gICAgdG9rZW5TdGFuZGFyZDogVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLFxuICAgIG1ldGFkYXRhOiBNZXRhZGF0YSxcbiAgICBqc29uOiBJbmZyYVNpZGVPdXRwdXQuT2ZmY2hhaW4sXG4gICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgKTogVCA9PiB7XG4gICAgaWYgKHRva2VuU3RhbmRhcmQgPT09IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5GdW5naWJsZSkge1xuICAgICAgcmV0dXJuIENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9Vc2VyU2lkZShcbiAgICAgICAge1xuICAgICAgICAgIG9uY2hhaW46IG1ldGFkYXRhLFxuICAgICAgICAgIG9mZmNoYWluOiBqc29uLFxuICAgICAgICB9LFxuICAgICAgICB0b2tlbkFtb3VudCxcbiAgICAgICkgYXMgVDtcbiAgICB9IGVsc2UgaWYgKHRva2VuU3RhbmRhcmQgPT09IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSkge1xuICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnRNZXRhZGF0YS5pbnRvVXNlclNpZGUoXG4gICAgICAgIHtcbiAgICAgICAgICBvbmNoYWluOiBtZXRhZGF0YSxcbiAgICAgICAgICBvZmZjaGFpbjoganNvbixcbiAgICAgICAgfSxcbiAgICAgICAgdG9rZW5BbW91bnQsXG4gICAgICApIGFzIFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKGBObyBtYXRjaCB0b2tlblN0YW5kYXJkOiAke3Rva2VuU3RhbmRhcmR9YCk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZW5lcmljRmluZEJ5T3duZXIgPSBhc3luYyA8XG4gICAgVCBleHRlbmRzIFVzZXJTaWRlT3V0cHV0Lk5mdE1ldGFkYXRhIHwgVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSxcbiAgPihcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNhbGxiYWNrOiAocmVzdWx0OiBSZXN1bHQ8VFtdLCBFcnJvcj4pID0+IHZvaWQsXG4gICAgdG9rZW5TdGFuZGFyZDogVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLFxuICAgIHNvcnRhYmxlPzogU29ydGFibGUsXG4gICAgaXNIb2xkZXI/OiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGE6IFRbXSA9IFtdO1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkVG9rZW5BY2NvdW50c0J5T3duZXIoXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBpbmZvLnZhbHVlLmxlbmd0aCA9PT0gMCAmJiBjYWxsYmFjayhSZXN1bHQub2soW10pKTtcblxuICAgICAgZm9yIGF3YWl0IChjb25zdCBkIG9mIGluZm8udmFsdWUpIHtcbiAgICAgICAgaWYgKGlzSG9sZGVyICYmIGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50LnVpQW1vdW50IDwgMSkge1xuICAgICAgICAgIGRlYnVnTG9nKFxuICAgICAgICAgICAgJyMgZmluZEJ5T3duZXIgbm8gaG9sZCBtZXRhZGF0YTogJyxcbiAgICAgICAgICAgIGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWludCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLm1pbnQgYXMgUHVia2V5O1xuICAgICAgICBjb25zdCB0b2tlbkFtb3VudCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50XG4gICAgICAgICAgLmFtb3VudCBhcyBzdHJpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IE1ldGFkYXRhLmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgICAgICBQZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlPd25lciBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgICAgIC8vIHRva2VuU3RhbmRhcmQ6IDAoTkZUKSBvciAyIChTUEwtVE9LRU4pXG4gICAgICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgIT09IHRva2VuU3RhbmRhcmQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICByZXNwb25zZVxuICAgICAgICAgICAgICAgIC5qc29uKClcbiAgICAgICAgICAgICAgICAudGhlbigoanNvbjogSW5mcmFTaWRlT3V0cHV0Lk9mZmNoYWluKSA9PiB7XG4gICAgICAgICAgICAgICAgICBkYXRhLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnRlcjxUPih0b2tlblN0YW5kYXJkLCBtZXRhZGF0YSwganNvbiwgdG9rZW5BbW91bnQpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhkYXRhKSk7IC8vIG5lZWQgdGhpcyBjYWxsID9cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkZXNjQWxnbyA9IHNvcnRCeVVpbml4VGltZXN0YW1wPFQ+KFNvcnRhYmxlLkRlc2MpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgYXNjQWxnbyA9IHNvcnRCeVVpbml4VGltZXN0YW1wPFQ+KFNvcnRhYmxlLkFzYyk7XG4gICAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUgPT09IFNvcnRhYmxlLkRlc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc29ydChkZXNjQWxnbyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvcnRhYmxlID09PSBTb3J0YWJsZS5Bc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc29ydChhc2NBbGdvKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhkYXRhKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yICYmIFVOQUJMRV9FUlJPUl9SRUdFWC50ZXN0KGUubWVzc2FnZSkpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIHNraXAgZXJyb3IgZm9yIG9sZCBTUEwtVE9LRU46ICcsIG1pbnQpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdlbmVyaWNGaW5kQnlNaW50ID0gYXN5bmMgPFxuICAgIFQgZXh0ZW5kcyBVc2VyU2lkZU91dHB1dC5OZnRNZXRhZGF0YSB8IFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsXG4gID4oXG4gICAgbWludDogUHVia2V5LFxuICAgIHRva2VuU3RhbmRhcmQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIFBkYS5nZXRNZXRhZGF0YShtaW50KSxcbiAgICAgICk7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlNaW50IG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG4gICAgICAvLyB0b2tlblN0YW5kYXJkOiAwKE5GVCkgb3IgMiAoU1BMLVRPS0VOKVxuICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgIT09IHRva2VuU3RhbmRhcmQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3Rva2VuIHN0YW5kYXJkcyBhcmUgZGlmZmVyZW50Jyk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgY29ubmVjdGlvbi5nZXRQYXJzZWRBY2NvdW50SW5mbyhtaW50LnRvUHVibGljS2V5KCkpO1xuICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSAoaW5mby52YWx1ZT8uZGF0YSBhcyBQYXJzZWRBY2NvdW50RGF0YSkucGFyc2VkLmluZm9cbiAgICAgICAgLnN1cHBseSBhcyBzdHJpbmc7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IChcbiAgICAgICAgYXdhaXQgZmV0Y2gobWV0YWRhdGEuZGF0YS51cmkpXG4gICAgICApLmpzb24oKSkgYXMgSW5mcmFTaWRlT3V0cHV0Lk9mZmNoYWluO1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayhcbiAgICAgICAgY29udmVydGVyPFQ+KHRva2VuU3RhbmRhcmQsIG1ldGFkYXRhLCByZXNwb25zZSwgdG9rZW5BbW91bnQpLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlIGFzIEVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7T25Pa30gb25PayBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09uRXJyfSBvbkVyciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3tzb3J0YWJsZT86IFNvcnRhYmxlLCBpc0hvbGRlcj86IGJvb2xlYW59fSBvcHRpb25zP1xuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9uT2s6IE9uT2s8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YT4sXG4gICAgb25FcnI6IE9uRXJyLFxuICAgIG9wdGlvbnM/OiB7IHNvcnRhYmxlPzogU29ydGFibGU7IGlzSG9sZGVyPzogYm9vbGVhbiB9LFxuICApOiB2b2lkID0+IHtcbiAgICBjb25zdCBzb3J0YWJsZSA9ICFvcHRpb25zPy5zb3J0YWJsZSA/IFNvcnRhYmxlLkRlc2MgOiBvcHRpb25zPy5zb3J0YWJsZTtcbiAgICBjb25zdCBpc0hvbGRlciA9ICFvcHRpb25zPy5pc0hvbGRlciA/IHRydWUgOiBmYWxzZTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1mbG9hdGluZy1wcm9taXNlcyAqL1xuICAgIGdlbmVyaWNGaW5kQnlPd25lcjxVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhPihcbiAgICAgIG93bmVyLFxuICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXN1bHQubWF0Y2goKG9rKSA9PiBvbk9rKG9rKSwgb25FcnIpO1xuICAgICAgfSxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5GdW5naWJsZSxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgaXNIb2xkZXIsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGdlbmVyaWNGaW5kQnlNaW50PFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGE+KFxuICAgICAgbWludCxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5GdW5naWJsZSxcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXJBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnfi9pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEZyZWV6aW5nIGEgdGFyZ2V0IG5mdFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICovXG4gIGV4cG9ydCBjb25zdCBmcmVlemUgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24gfSBmcm9tICd+L2luc3RydWN0aW9uJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFzc29jaWF0ZWRBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBmZWVQYXllclBhcnRpYWxTaWduVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgc291cmNlVG9rZW4gPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgbGV0IGluc3QyO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG5cbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXR1cm4gYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICBpZiAoIWRlc3RUb2tlbi5pbnN0KSB7XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIF9DYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgKTtcbiAgICAgICAgdHguYWRkKGluc3QyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldHVybiBpbnN0cnVjdGlvbiBhbmQgdW5kZWNpZGVkIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgICBpbnN0MiA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBkZXN0VG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBfQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgICAga2V5cGFpcnMsXG4gICAgICAgICk7XG4gICAgICAgIHR4LmFkZChkZXN0VG9rZW4uaW5zdCkuYWRkKGluc3QyKTtcbiAgICAgIH1cblxuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGtleXBhaXJzLmZvckVhY2goKHNpZ25lcikgPT4ge1xuICAgICAgICB0eC5wYXJ0aWFsU2lnbihzaWduZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25JbnN0cnVjdGlvbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE9uRXJyLCBPbk9rIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuaW1wb3J0IHsgSGlzdG9yeSwgSGlzdG9yeU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgRmlsdGVyVHlwZSwgTW9kdWxlTmFtZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IFNpZ25hdHVyZXMsIFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGdldEhpc3RvcnkgPSBhc3luYyAoXG4gICAgdGFyZ2V0OiBQdWJrZXksXG4gICAgZmlsdGVyVHlwZTogRmlsdGVyVHlwZSxcbiAgICBvbk9rOiBPbk9rPEhpc3Rvcnk+LFxuICAgIG9uRXJyOiBPbkVycixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEhpc3RvcnlPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVmYXVsdFZhbHVlczogSGlzdG9yeU9wdGlvbnMgPSB7XG4gICAgICAgIHdhaXRUaW1lOiAwLjAzLFxuICAgICAgICBuYXJyb3dEb3duOiAxMDAsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IHsgLi4uZGVmYXVsdFZhbHVlcywgLi4ub3B0aW9ucyB9O1xuICAgICAgaWYgKGZpbHRlclR5cGUgPT09IEZpbHRlclR5cGUuTWVtbykge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBUcmFuc2FjdGlvbkZpbHRlci5wYXJzZShmaWx0ZXJUeXBlLCBNb2R1bGVOYW1lLlNwbFRva2VuKTtcbiAgICAgICAgYXdhaXQgU2lnbmF0dXJlcy5nZXRGb3JBZHJlc3MoXG4gICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgIHBhcnNlcixcbiAgICAgICAgICAocmVzdWx0KSA9PiByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgICAgIG1lcmdlZE9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0b2tlbkFjY291bnRzID1cbiAgICAgICAgICBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRQYXJzZWRUb2tlbkFjY291bnRzQnlPd25lcihcbiAgICAgICAgICAgIHRhcmdldC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgc3RvcmVkSGlzdG9yaWVzOiBIaXN0b3J5W10gPSBbXTtcbiAgICAgICAgZGVidWdMb2coJyMgdG9rZW5BY2NvdW50cyBzaXplOiAnLCB0b2tlbkFjY291bnRzLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGZvciAoY29uc3QgYWNjb3VudCBvZiB0b2tlbkFjY291bnRzLnZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgcGFyc2VyID0gVHJhbnNhY3Rpb25GaWx0ZXIucGFyc2UoXG4gICAgICAgICAgICBmaWx0ZXJUeXBlLFxuICAgICAgICAgICAgTW9kdWxlTmFtZS5TcGxUb2tlbixcbiAgICAgICAgICApO1xuICAgICAgICAgIGF3YWl0IFNpZ25hdHVyZXMuZ2V0Rm9yQWRyZXNzKFxuICAgICAgICAgICAgYWNjb3VudC5wdWJrZXkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHBhcnNlcixcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHJlc3VsdC5tYXRjaChvbk9rLCBvbkVyciksXG4gICAgICAgICAgICBtZXJnZWRPcHRpb25zLFxuICAgICAgICAgICAgc3RvcmVkSGlzdG9yaWVzLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIG9uRXJyKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiIsICJleHBvcnQgZW51bSBGaWx0ZXJUeXBlIHtcbiAgTWVtbyA9ICdtZW1vJyxcbiAgTWludCA9ICdtaW50JyxcbiAgT25seU1lbW8gPSAnb25seS1tZW1vJyxcbiAgVHJhbnNmZXIgPSAndHJhbnNmZXInLFxufVxuXG5leHBvcnQgZW51bSBNb2R1bGVOYW1lIHtcbiAgU29sTmF0aXZlID0gJ3N5c3RlbScsXG4gIFNwbFRva2VuID0gJ3NwbC10b2tlbicsXG59XG5cbmV4cG9ydCBjb25zdCBGaWx0ZXJPcHRpb25zID0ge1xuICBUcmFuc2Zlcjoge1xuICAgIHByb2dyYW06IFsnc3lzdGVtJywgJ3NwbC10b2tlbiddLFxuICAgIGFjdGlvbjogWyd0cmFuc2ZlcicsICd0cmFuc2ZlckNoZWNrZWQnXSxcbiAgfSxcbiAgTWVtbzoge1xuICAgIHByb2dyYW06IFsnc3BsLW1lbW8nXSxcbiAgICBhY3Rpb246IFsnKiddLFxuICB9LFxuICBNaW50OiB7XG4gICAgcHJvZ3JhbTogWydzcGwtdG9rZW4nXSxcbiAgICBhY3Rpb246IFsnbWludFRvJywgJ21pbnRUb0NoZWNrZWQnXSxcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIFBvc3RUb2tlbkFjY291bnQgPSB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgb3duZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFdpdGhNZW1vID0ge1xuICBzaWc6IHN0cmluZ1tdO1xuICBtZW1vOiBzdHJpbmc7XG59O1xuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBzbGVlcCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTaWduYXR1cmVzIHtcbiAgY29uc3QgcGFyc2VGb3JUcmFuc2FjdGlvbiA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhPiA9PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0UGFyc2VkVHJhbnNhY3Rpb24oc2lnbmF0dXJlKTtcbiAgICBpZiAoIXJlcykge1xuICAgICAgcmV0dXJuIHt9IGFzIFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGE7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEZvckFkcmVzcyA9IGFzeW5jIChcbiAgICBwdWJrZXk6IFB1YmtleSxcbiAgICBwYXJzZXI6ICh0cmFuc2FjdGlvbjogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSkgPT4gSGlzdG9yeSB8IHVuZGVmaW5lZCxcbiAgICBjYWxsYmFjazogKGhpc3Rvcnk6IFJlc3VsdDxIaXN0b3J5W10sIEVycm9yPikgPT4gdm9pZCxcbiAgICBvcHRpb25zOiB7XG4gICAgICB3YWl0VGltZTogbnVtYmVyO1xuICAgICAgbmFycm93RG93bjogbnVtYmVyO1xuICAgIH0sXG4gICAgaGlzdG9yaWVzOiBIaXN0b3J5W10gPSBbXSxcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGRlYnVnTG9nKCcjIG9wdGlvbnM6ICcsIG9wdGlvbnMpO1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb25zID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0U2lnbmF0dXJlc0ZvckFkZHJlc3MoXG4gICAgICAgIHB1YmtleS50b1B1YmxpY0tleSgpLFxuICAgICAgICB7XG4gICAgICAgICAgbGltaXQ6IG9wdGlvbnMubmFycm93RG93bixcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIHRyYW5zYWN0aW9ucyBjb3VudDonLCB0cmFuc2FjdGlvbnMubGVuZ3RoKTtcblxuICAgICAgZm9yIChjb25zdCB0cmFuc2FjdGlvbiBvZiB0cmFuc2FjdGlvbnMpIHtcbiAgICAgICAgcGFyc2VGb3JUcmFuc2FjdGlvbih0cmFuc2FjdGlvbi5zaWduYXR1cmUpXG4gICAgICAgICAgLnRoZW4oKHNpZ25hdHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeSA9IHBhcnNlcihzaWduYXR1cmUpO1xuICAgICAgICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgaGlzdG9yaWVzLnB1c2goaGlzdG9yeSk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhoaXN0b3JpZXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZSkgPT4gY2FsbGJhY2soUmVzdWx0LmVycihlKSkpO1xuICAgICAgICBhd2FpdCBzbGVlcChvcHRpb25zLndhaXRUaW1lKTsgLy8gYXZvaWQgNDI5IGVycm9yXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUGFyc2VkSW5zdHJ1Y3Rpb24sIFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgRmlsdGVyT3B0aW9ucyxcbiAgRmlsdGVyVHlwZSxcbiAgTW9kdWxlTmFtZSxcbiAgUG9zdFRva2VuQWNjb3VudCxcbn0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkZpbHRlciB7XG4gIGNvbnN0IGNyZWF0ZVBvc3RUb2tlbkFjY291bnRMaXN0ID0gKFxuICAgIHRyYW5zYWN0aW9uOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICApOiBQb3N0VG9rZW5BY2NvdW50W10gPT4ge1xuICAgIGNvbnN0IHBvc3RUb2tlbkFjY291bnQ6IFBvc3RUb2tlbkFjY291bnRbXSA9IFtdO1xuICAgIGNvbnN0IGFjY291bnRLZXlzID0gdHJhbnNhY3Rpb24udHJhbnNhY3Rpb24ubWVzc2FnZS5hY2NvdW50S2V5cy5tYXAoKHQpID0+XG4gICAgICB0LnB1YmtleS50b1N0cmluZygpLFxuICAgICk7XG5cbiAgICB0cmFuc2FjdGlvbi5tZXRhPy5wb3N0VG9rZW5CYWxhbmNlcz8uZm9yRWFjaCgodCkgPT4ge1xuICAgICAgaWYgKGFjY291bnRLZXlzW3QuYWNjb3VudEluZGV4XSAmJiB0Lm93bmVyKSB7XG4gICAgICAgIGNvbnN0IHYgPSB7XG4gICAgICAgICAgYWNjb3VudDogYWNjb3VudEtleXNbdC5hY2NvdW50SW5kZXhdLFxuICAgICAgICAgIG93bmVyOiB0Lm93bmVyLFxuICAgICAgICB9O1xuICAgICAgICBwb3N0VG9rZW5BY2NvdW50LnB1c2godik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBvc3RUb2tlbkFjY291bnQ7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzUGFyc2VkSW5zdHJ1Y3Rpb24gPSAoXG4gICAgYXJnOiB1bmtub3duLFxuICApOiBhcmcgaXMgUGFyc2VkSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBhcmcgIT09IG51bGwgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgJ3BhcnNlZCcgaW4gYXJnO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBwYXJzZSA9XG4gICAgKGZpbHRlclR5cGU6IEZpbHRlclR5cGUsIG1vZHVsZU5hbWU6IE1vZHVsZU5hbWUpID0+XG4gICAgKHR4TWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgbGV0IGhpc3Rvcnk6IEhpc3RvcnkgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZmlsdGVyVHlwZSA9PT0gRmlsdGVyVHlwZS5NaW50ICYmXG4gICAgICAgIG1vZHVsZU5hbWUgPT09IE1vZHVsZU5hbWUuU29sTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgXCJUaGlzIGZpbHRlclR5cGUoJ0ZpbHRlclR5cGUuTWludCcpIGNhbiBub3QgdXNlIGZyb20gU29sTmF0aXZlIG1vZHVsZVwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXR4TWV0YSkge1xuICAgICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcG9zdFRva2VuQWNjb3VudCA9IGNyZWF0ZVBvc3RUb2tlbkFjY291bnRMaXN0KHR4TWV0YSk7XG5cbiAgICAgIHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICBpZiAoaXNQYXJzZWRJbnN0cnVjdGlvbihpbnN0cnVjdGlvbikpIHtcbiAgICAgICAgICBzd2l0Y2ggKGZpbHRlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5NZW1vOiB7XG4gICAgICAgICAgICAgIGlmIChGaWx0ZXJPcHRpb25zLk1lbW8ucHJvZ3JhbS5pbmNsdWRlcyhpbnN0cnVjdGlvbi5wcm9ncmFtKSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgbGV0IGluc3RydWN0aW9uVHJhbnNmZXI7XG5cbiAgICAgICAgICAgICAgICAvLyBmZXRjaCAgdHJhbnNmZXIgdHJhbnNhY3Rpb24gZm9yIHJlbGF0aW9uYWwgbWVtb1xuICAgICAgICAgICAgICAgIHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICBpc1BhcnNlZEluc3RydWN0aW9uKGluc3RydWN0aW9uKSAmJlxuICAgICAgICAgICAgICAgICAgICAgIEZpbHRlck9wdGlvbnMuVHJhbnNmZXIucHJvZ3JhbS5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnByb2dyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyID0gaW5zdHJ1Y3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vIHNwbC10b2tlbiBvciBzeXN0ZW1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyICYmXG4gICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lICE9PSBpbnN0cnVjdGlvblRyYW5zZmVyWydwcm9ncmFtJ11cbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGRlYnVnTG9nKFxuICAgICAgICAgICAgICAgICAgICAnIyBGaWx0ZXJUeXBlLk1lbW8gYnJlYWsgaW5zdHJ1Y3Rpb246ICcsXG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uVHJhbnNmZXIsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZmV0Y2ggbWVtbyBvbmx5IHRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IENvbnZlcnRlci5NZW1vLmludG9Vc2VyU2lkZShcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgdHhNZXRhLFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25UcmFuc2ZlcixcbiAgICAgICAgICAgICAgICAgIHBvc3RUb2tlbkFjY291bnQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5Pbmx5TWVtbzoge1xuICAgICAgICAgICAgICBpZiAoRmlsdGVyT3B0aW9ucy5NZW1vLnByb2dyYW0uaW5jbHVkZXMoaW5zdHJ1Y3Rpb24ucHJvZ3JhbSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zdHJ1Y3Rpb25UcmFuc2ZlcjtcblxuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBDb252ZXJ0ZXIuTWVtby5pbnRvVXNlclNpZGUoXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbixcbiAgICAgICAgICAgICAgICAgIHR4TWV0YSxcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uVHJhbnNmZXIsXG4gICAgICAgICAgICAgICAgICBwb3N0VG9rZW5BY2NvdW50LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEZpbHRlclR5cGUuTWludDoge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgRmlsdGVyT3B0aW9ucy5NaW50LnByb2dyYW0uaW5jbHVkZXMoaW5zdHJ1Y3Rpb24ucHJvZ3JhbSkgJiZcbiAgICAgICAgICAgICAgICBGaWx0ZXJPcHRpb25zLk1pbnQuYWN0aW9uLmluY2x1ZGVzKFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24ucGFyc2VkLnR5cGUgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IENvbnZlcnRlci5NaW50LmludG9Vc2VyU2lkZShpbnN0cnVjdGlvbiwgdHhNZXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5UcmFuc2ZlcjpcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWUgPT09IGluc3RydWN0aW9uLnByb2dyYW0gJiZcbiAgICAgICAgICAgICAgICBGaWx0ZXJPcHRpb25zLlRyYW5zZmVyLmFjdGlvbi5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnBhcnNlZC50eXBlIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChpbnN0cnVjdGlvbi5wYXJzZWQudHlwZSA9PT0gJ3RyYW5zZmVyQ2hlY2tlZCcpIHtcbiAgICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBDb252ZXJ0ZXIuVHJhbnNmZXJDaGVja2VkLmludG9Vc2VyU2lkZShcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHR4TWV0YSxcbiAgICAgICAgICAgICAgICAgICAgcG9zdFRva2VuQWNjb3VudCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBDb252ZXJ0ZXIuVHJhbnNmZXIuaW50b1VzZXJTaWRlKFxuICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdHhNZXRhLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBQdWJsaWNLZXksXG4gIFN5c3RlbVByb2dyYW0sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBBdXRob3JpdHlUeXBlLFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbixcbiAgY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50LFxuICBNSU5UX1NJWkUsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbixcbiAgRGF0YVYyLFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgS2V5cGFpckFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgTWludEluc3RydWN0aW9uIH0gZnJvbSAnfi9pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBVc2VyU2lkZUlucHV0IH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUGRhIH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgY3JlYXRlRnJlZXplQXV0aG9yaXR5ID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogUHVibGljS2V5LFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBBdXRob3JpdHlUeXBlLkZyZWV6ZUFjY291bnQsXG4gICAgICBmcmVlemVBdXRob3JpdHksXG4gICAgKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludEluc3RydWN0aW9ucyA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgdG9rZW5NZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9IGF3YWl0IGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQoY29ubmVjdGlvbik7XG4gICAgY29uc3QgbWV0YWRhdGFQZGEgPSBQZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCB0b2tlbkFzc29jaWF0ZWQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG5cbiAgICBjb25zdCBpbnN0MSA9IFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICBmcm9tUHVia2V5OiBmZWVQYXllcixcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICBzcGFjZTogTUlOVF9TSVpFLFxuICAgICAgbGFtcG9ydHM6IGxhbXBvcnRzLFxuICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgIH0pO1xuXG4gICAgY29uc3QgaW5zdDIgPSBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgb3duZXIsXG4gICAgICBvd25lcixcbiAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgKTtcblxuICAgIGNvbnN0IGluc3QzID0gY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgZmVlUGF5ZXIsXG4gICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICBvd25lcixcbiAgICAgIG1pbnQsXG4gICAgKTtcblxuICAgIGNvbnN0IGluc3Q0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIHRva2VuQXNzb2NpYXRlZCxcbiAgICAgIG93bmVyLFxuICAgICAgX0NhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQodG90YWxBbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgIG1pbnREZWNpbWFsLFxuICAgICk7XG5cbiAgICBjb25zdCBpbnN0NSA9IGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YVBkYSxcbiAgICAgICAgbWludCxcbiAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNyZWF0ZU1ldGFkYXRhQWNjb3VudEFyZ3NWMzoge1xuICAgICAgICAgIGRhdGE6IHRva2VuTWV0YWRhdGEsXG4gICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgIGNvbGxlY3Rpb25EZXRhaWxzOiBudWxsLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIHJldHVybiBbaW5zdDEsIGluc3QyLCBpbnN0MywgaW5zdDQsIGluc3Q1XTtcbiAgfTtcblxuICAvKipcbiAgICogU1BMLVRPS0VOIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgIC8vIHRva2VuIG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBzaWduZXIgICAgICAvLyB0b2tlbiBvd25lciBTZWNyZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQW1vdW50IC8vIHRvdGFsIG51bWJlclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWwgLy8gdG9rZW4gZGVjaW1hbFxuICAgKiBAcGFyYW0ge1B1YmtleX0gaW5wdXQgICAgICAgLy8gdG9rZW4gbWV0YWRhdGFcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgIC8vIGZlZSBwYXllclxuICAgKiBAcGFyYW0ge1B1YmtleX0gZnJlZXplQXV0aG9yaXR5PyAvLyBmcmVlemUgYXV0aG9yaXR5XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5Ub2tlbk1ldGFkYXRhLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgIGZyZWV6ZUF1dGhvcml0eT86IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPFVzZXJTaWRlSW5wdXQuVG9rZW5NZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBzaWduZXI7XG4gICAgICBpbnB1dC5yb3lhbHR5ID0gMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gMDtcblxuICAgICAgY29uc3QgdG9rZW5TdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQgYXMgVXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YSxcbiAgICAgICAgaW5wdXQucm95YWx0eSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICAgIHRva2VuU3RvcmFnZU1ldGFkYXRhLmNyZWF0ZWRfYXQgPSBjcmVhdGVkQXQ7XG5cbiAgICAgIGxldCB1cmkhOiBzdHJpbmc7XG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGggJiYgaW5wdXQuc3RvcmFnZVR5cGUpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZE1ldGFBbmRDb250ZW50KFxuICAgICAgICAgIHRva2VuU3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIGlucHV0LnN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgdXJpID0gaW5wdXQudXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJNdXN0IHNldCAnc3RvcmFnZVR5cGUgKyBmaWxlUGF0aCcgb3IgJ3VyaSdcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9JbmZyYVNpZGUoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cmkpO1xuXG4gICAgICBjb25zdCBtaW50ID0gS2V5cGFpckFjY291bnQuY3JlYXRlKCk7XG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IGNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG90YWxBbW91bnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRnJlZXplQXV0aG9yaXR5KFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTWludEluc3RydWN0aW9uKFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW3NpZ25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBJbmZyYVNpZGVJbnB1dCwgVXNlclNpZGVJbnB1dCB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IERldGFpbHMsIExpbWl0IH0gZnJvbSAnfi90eXBlcy92YWxpZGF0b3InO1xuXG5leHBvcnQgbmFtZXNwYWNlIFZhbGlkYXRvciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVzc2FnZSB7XG4gICAgZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnc3VjY2Vzcyc7XG4gICAgZXhwb3J0IGNvbnN0IFNNQUxMX05VTUJFUiA9ICd0b28gc21hbGwnO1xuICAgIGV4cG9ydCBjb25zdCBCSUdfTlVNQkVSID0gJ3RvbyBiaWcnO1xuICAgIGV4cG9ydCBjb25zdCBMT05HX0xFTkdUSCA9ICd0b28gbG9uZyc7XG4gICAgZXhwb3J0IGNvbnN0IEVNUFRZID0gJ2ludmFsaWQgZW1wdHkgdmFsdWUnO1xuICAgIGV4cG9ydCBjb25zdCBJTlZBTElEX1VSTCA9ICdpbnZhbGlkIHVybCc7XG4gICAgZXhwb3J0IGNvbnN0IE9OTFlfTk9ERV9KUyA9ICdgc3RyaW5nYCB0eXBlIGlzIG9ubHkgTm9kZS5qcyc7XG4gIH1cblxuICBleHBvcnQgY29uc3QgTkFNRV9MRU5HVEggPSAzMjtcbiAgZXhwb3J0IGNvbnN0IFNZTUJPTF9MRU5HVEggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IFVSTF9MRU5HVEggPSAyMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01BWCA9IDEwMDtcbiAgZXhwb3J0IGNvbnN0IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCA9IDEwMDAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NSU4gPSAtMTtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdyb3lhbHR5JztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTZWxsZXJGZWVCYXNpc1BvaW50cyA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogQ29udmVydGVyLlJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXgsXG4gID4oXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1JveWFsdHkobWV0YWRhdGEucm95YWx0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyRmVlQmFzaXNQb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLm5hbWUpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNOYW1lKG1ldGFkYXRhLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5zeW1ib2wpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTeW1ib2wobWV0YWRhdGEuc3ltYm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRXJyKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLnJlcy5lcnJvci5kZXRhaWxzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAgICdDYXVnaHQgaW4gdGhlIHZhbGlkYXRpb24gZXJyb3JzLiBzZWUgaW5mb3JtYXRpb24gZS5nOiBlcnI8VmFsaWRhdG9yRXJyb3I+LmRldGFpbHMnO1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIHR5cGUgUGlja05mdFN0b3JhZ2UgPSBQaWNrPFxuICAgIEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ2ltYWdlJyB8ICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cydcbiAgPjtcbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZU1ldGFwbGV4ID0gUGljazxcbiAgICBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ3JveWFsdHknIHwgJ2ZpbGVQYXRoJ1xuICA+O1xuICB0eXBlIFBpY2tNZXRhcGxleCA9IFBpY2s8XG4gICAgSW5mcmFTaWRlSW5wdXQuTWV0YXBsZXhEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdCxcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgaWYgKCFpbWFnZU9yVXJpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChpbWFnZU9yVXJpKSA+IFVSTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBpbWFnZU9yVXJpLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBVUkxfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oz86Jj0rLCUjXSsvZy50ZXN0KGltYWdlT3JVcmkpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5JTlZBTElEX1VSTCwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGRldGFpbHM6IERldGFpbHNbXTtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBkZXRhaWxzOiBEZXRhaWxzW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQmxvYiwgTkZUU3RvcmFnZSB9IGZyb20gJ25mdC5zdG9yYWdlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIGlzQnJvd3NlciwgaXNOb2RlLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcblxuLy8gaW1wb3J0IHsgdG9NZXRhcGxleEZpbGUgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9qcyc7XG5pbXBvcnQgeyBGaWxlQ29udGVudCwgSW5mcmFTaWRlSW5wdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTmZ0U3RvcmFnZSB7XG4gIGxldCBpc0Rpc3BsYXlXYXJuaW5nID0gZmFsc2U7XG4gIGNvbnN0IGdldE5mdFN0b3JhZ2VBcGlLZXkgPSAoKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIUNvbnN0YW50cy5uZnRTdG9yYWdlQXBpS2V5KSB7XG4gICAgICBpZiAoIWlzRGlzcGxheVdhcm5pbmcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBcbiAgICAgICAgW1dhcm5pbmddXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIElmIHdpbGwgdXNlIEBzb2xhbmEtc3VpdGUvbmZ0IHBhY2thZ2VcbiAgICAgICAgeW91ciBuZWVkIHRvIHVwZGF0ZSBuZnRTdG9yYWdlLmFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBjYW4gZ2V0IGFwaUtleSBmcm9tIGh0dHBzOi8vbmZ0LnN0b3JhZ2UvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGAsXG4gICAgICAgICk7XG4gICAgICAgIGlzRGlzcGxheVdhcm5pbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIENvbnN0YW50cy5ORlRfU1RPUkFHRV9BUElfS0VZO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ29uc3RhbnRzLm5mdFN0b3JhZ2VBcGlLZXk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUdhdGV3YXlVcmwgPSAoY2lkOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICBgJHtDb25zdGFudHMuTkZUX1NUT1JBR0VfR0FURVdBWV9VUkx9LyR7Y2lkfWA7XG5cbiAgY29uc3QgY29ubmVjdCA9ICgpID0+IG5ldyBORlRTdG9yYWdlKHsgdG9rZW46IGdldE5mdFN0b3JhZ2VBcGlLZXkoKSB9KTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudDogJywgZmlsZVBhdGgpO1xuICAgICAgbGV0IGZpbGUhOiBCdWZmZXI7XG4gICAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aCBhcyBzdHJpbmc7XG4gICAgICAgIGZpbGUgPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoZmlsZXBhdGgpO1xuICAgICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICAvLyBmaWxlID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnKS5idWZmZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcignU3VwcG9ydGVkIGVudmlyb25tZW50OiBvbmx5IE5vZGUuanMgYW5kIEJyb3dzZXIganMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmxvYkltYWdlID0gbmV3IEJsb2IoW2ZpbGVdKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkltYWdlKTtcbiAgICAgIHJldHVybiBjcmVhdGVHYXRld2F5VXJsKHJlcyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZU1ldGFkYXRhfSBtZXRhZGF0YVxuICAgKiB7XG4gICAqICAgbmFtZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBkZXNjcmlwdGlvbj86IHtzdHJpbmd9ICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBzZWxsZXJGZWVCYXNpc1BvaW50cz86IG51bWJlciAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgaW1hZ2U/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgIC8vIHVwbG9hZGVkIHVyaSBvZiBvcmlnaW5hbCBjb250ZW50XG4gICAqICAgZXh0ZXJuYWxfdXJsPzoge3N0cmluZ30gICAgICAgICAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzoge0pzb25NZXRhZGF0YUF0dHJpYnV0ZVtdfSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IHtKc29uTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT59IC8vIGluY2x1ZGVkIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IENvbGxlY3Rpb24gICAgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIFtrZXk6IHN0cmluZ106IHt1bmtub3dufSAgICAgICAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogfVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFkYXRhID0gYXN5bmMgKFxuICAgIG1ldGFkYXRhOiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuXG4gICAgICBjb25zdCBibG9iSnNvbiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShtZXRhZGF0YSldKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkpzb24pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZUNvbnRlbnQsIEluZnJhU2lkZUlucHV0LCBVc2VyU2lkZUlucHV0IH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuLy8gaW1wb3J0IHsgQXJ3ZWF2ZSB9IGZyb20gJy4vYXJ3ZWF2ZSc7XG5pbXBvcnQgeyBOZnRTdG9yYWdlIH0gZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RvcmFnZSB7XG4gIGV4cG9ydCBjb25zdCB0b0NvbnZlcnRPZmZjaGFpbmRhdGEgPSAoXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgKTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXG4gICAgICBzZWxsZXJfZmVlX2Jhc2lzX3BvaW50czogc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICBleHRlcm5hbF91cmw6IGlucHV0LmV4dGVybmFsX3VybCxcbiAgICAgIGF0dHJpYnV0ZXM6IGlucHV0LmF0dHJpYnV0ZXMsXG4gICAgICBwcm9wZXJ0aWVzOiBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgaW1hZ2U6ICcnLFxuICAgICAgb3B0aW9uczogaW5wdXQub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkQ29udGVudChmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWRDb250ZW50KGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBzdG9yYWdlVHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkTWV0YUFuZENvbnRlbnQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgc3RvcmFnZSA9IGF3YWl0IC8vIGF3YWl0IEFyd2VhdmUudXBsb2FkQ29udGVudChmaWxlUGF0aCwgZmVlUGF5ZXIpXG4gICAgICAoXG4gICAgICAgIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aClcbiAgICAgICkudW53cmFwKFxuICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgICAgLy8gcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkTWV0YWRhdGEoaW5wdXQsIGZlZVBheWVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgc3RvcmFnZSA9IGF3YWl0IChcbiAgICAgICAgYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWRDb250ZW50KGZpbGVQYXRoKVxuICAgICAgKS51bndyYXAoXG4gICAgICAgIGFzeW5jIChvazogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaW5wdXQuaW1hZ2UgPSBvaztcbiAgICAgICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWRNZXRhZGF0YShpbnB1dCk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vIG1hdGNoIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFzdG9yYWdlKSB7XG4gICAgICB0aHJvdyBFcnJvcignRW1wdHkgc3RvcmFnZSBvYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0b3JhZ2U7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiB9IGZyb20gJ34vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgS2V5cGFpckFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICovXG4gIGV4cG9ydCBjb25zdCB0aGF3ID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPiA9PiB7XG4gICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEtleXBhaXJBY2NvdW50KHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgX0NhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQXNzb2NpYXRlZEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgSW5zdHJ1Y3Rpb24gfSBmcm9tICd+L2luc3RydWN0aW9uJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyc1swXTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBzb3VyY2VUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBfQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFNwbFRva2VuIGFzIEFkZCB9IGZyb20gJy4vYWRkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGcmVlemUgfSBmcm9tICcuL2ZyZWV6ZSc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGZWVQYXllciB9IGZyb20gJy4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlcic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBIaXN0b3J5IH0gZnJvbSAnLi9oaXN0b3J5JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgVGhhdyB9IGZyb20gJy4vdGhhdyc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0ICd+L3R5cGVzL2luc3RydWN0aW9uJztcbmltcG9ydCAnfi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBTcGxUb2tlbiA9IHtcbiAgLi4uQWRkLFxuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkZlZVBheWVyLFxuICAuLi5IaXN0b3J5LFxuICAuLi5NaW50LFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxzQ0FBc0M7OztBQ0EvQyxTQUFxQixpQkFBaUI7QUFDdEMsT0FBTyxZQUFZO0FBR1osSUFBVTtBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQUNFLEVBQU1BLFdBQUEsaUJBQWlCLE9BQU8sUUFBUTtBQUN0QyxFQUFNQSxXQUFBLG1CQUFtQixPQUFPLFFBQVE7QUFDeEMsRUFBTUEsV0FBQSxjQUFjLE9BQU87QUFDM0IsRUFBTUEsV0FBQSxtQkFBbUIsT0FBTyxXQUFXO0FBRTNDLE1BQUs7QUFBTCxJQUFLQyxhQUFMO0FBQ0wsSUFBQUEsU0FBQSxTQUFNO0FBQ04sSUFBQUEsU0FBQSxpQkFBYztBQUNkLElBQUFBLFNBQUEsU0FBTTtBQUNOLElBQUFBLFNBQUEsVUFBTztBQUNQLElBQUFBLFNBQUEsZUFBWTtBQUFBLEtBTEYsVUFBQUQsV0FBQSxZQUFB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ImN1c3RvbUNsdXN0ZXJVcmwiLCAiUmVzdWx0IiwgIktleXBhaXIiLCAiUHVibGljS2V5IiwgIk5vZGUiLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJJbnN0cnVjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiSW5zdHJ1Y3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbkluc3RydWN0aW9uIiwgIk11bHRpc2lnSW5zdHJ1Y3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJLZXlwYWlyIiwgIlB1YmxpY0tleSIsICJBc3NvY2lhdGVkQWNjb3VudCIsICJJbnN0cnVjdGlvbiIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIlB1YmxpY0tleSIsICJQZGEiLCAiYnMiLCAiUHVibGljS2V5IiwgIktleXBhaXIiLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiSW5zdHJ1Y3Rpb24iLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiU3BsVG9rZW4iLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiSW5zdHJ1Y3Rpb24iLCAiVXNlclNpZGVJbnB1dCIsICJUb2tlblN0YW5kYXJkIiwgIkNvbW1vbiIsICJVc2VNZXRob2QiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnZlcnRlciIsICJNZW1vIiwgIkNvbnZlcnRlciIsICJNaW50IiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJOZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUHJvcGVydGllcyIsICJDb252ZXJ0ZXIiLCAiUm95YWx0eSIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXJDaGVja2VkIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlciIsICJDb252ZXJ0ZXIiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJTcGxUb2tlbiIsICJDb252ZXJ0ZXIiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiU3BsVG9rZW4iLCAiSW5zdHJ1Y3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiU3BsVG9rZW4iLCAiVHJhbnNhY3Rpb24iLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJTaWduYXR1cmVzIiwgIlRyYW5zYWN0aW9uRmlsdGVyIiwgImluc3RydWN0aW9uIiwgIkNvbnZlcnRlciIsICJTcGxUb2tlbiIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIlN5c3RlbVByb2dyYW0iLCAiY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uIiwgImNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbiIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIlZhbGlkYXRvciIsICJNZXNzYWdlIiwgIkNvbnZlcnRlciIsICJOZnRTdG9yYWdlIiwgIlN0b3JhZ2UiLCAiU3BsVG9rZW4iLCAibWludCIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJTeXN0ZW1Qcm9ncmFtIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uIiwgImNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbiIsICJDb252ZXJ0ZXIiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiU3BsVG9rZW4iLCAiSW5zdHJ1Y3Rpb24iLCAiY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24iLCAiU3BsVG9rZW4iLCAiY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24iLCAiSW5zdHJ1Y3Rpb24iLCAiU3BsVG9rZW4iXQp9Cg==