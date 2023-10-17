// src/collection.ts
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

// src/creators.ts
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
((Result6) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result6.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result6.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result6.ok(resArr);
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
    return Result6.ok(res);
  }
  Result6.all = all;
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

// src/memo.ts
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

// src/mint.ts
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

// src/uses.ts
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

// src/token-metadata.ts
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

// src/nft-metadata.ts
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

// src/properties.ts
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

// src/royalty.ts
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

// src/transfer-checked.ts
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

// src/transfer.ts
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

// src/index.ts
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
export {
  Converter12 as Converter
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vc3JjL2NyZWF0b3JzLnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvY29uc3RhbnRzLnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvcmVzdWx0LnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvc2hhcmVkLnRzIiwgIi4uLy4uL2dsb2JhbC9zcmMvaW5kZXgudHMiLCAiLi4vLi4vbm9kZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vaW5zdHJ1Y3Rpb24vc3JjL2luc3RydWN0aW9uL2luZGV4LnRzIiwgIi4uLy4uL2luc3RydWN0aW9uL3NyYy9pbnN0cnVjdGlvbi9kZWZpbmUudHMiLCAiLi4vLi4vaW5zdHJ1Y3Rpb24vc3JjL2luc3RydWN0aW9uL2JhdGNoLXN1Ym1pdC50cyIsICIuLi8uLi9pbnN0cnVjdGlvbi9zcmMvbWludC1pbnN0cnVjdGlvbi50cyIsICIuLi8uLi9pbnN0cnVjdGlvbi9zcmMvbXVsdGlzaWctaW5zdHJ1Y3Rpb24udHMiLCAiLi4vLi4vaW5zdHJ1Y3Rpb24vc3JjL3BhcnRpYWwtc2lnbkluc3RydWN0aW9uLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2Fzc29jaWF0ZWQtYWNjb3VudC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9rZXlwYWlyLWFjY291bnQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvcGRhLnRzIiwgIi4uL3NyYy9tZW1vLnRzIiwgIi4uL3NyYy9taW50LnRzIiwgIi4uL3NyYy91c2VzLnRzIiwgIi4uL3NyYy90b2tlbi1tZXRhZGF0YS50cyIsICIuLi9zcmMvbmZ0LW1ldGFkYXRhLnRzIiwgIi4uL3NyYy9wcm9wZXJ0aWVzLnRzIiwgIi4uL3NyYy9yb3lhbHR5LnRzIiwgIi4uL3NyYy90cmFuc2Zlci1jaGVja2VkLnRzIiwgIi4uL3NyYy90cmFuc2Zlci50cyIsICIuLi9zcmMvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7XG4gIEluZnJhU2lkZUlucHV0LFxuICBJbmZyYVNpZGVPdXRwdXQsXG4gIE9wdGlvbixcbiAgVXNlclNpZGVJbnB1dCxcbiAgVXNlclNpZGVPdXRwdXQsXG59IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb24ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxVc2VyU2lkZUlucHV0LkNvbGxlY3Rpb24+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbmZyYVNpZGVJbnB1dC5Db2xsZWN0aW9uPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGlucHV0LnRvUHVibGljS2V5KCksXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbmZyYVNpZGVPdXRwdXQuQ29sbGVjdGlvbj4sXG4gICAgKTogVXNlclNpZGVPdXRwdXQuQ29sbGVjdGlvbiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiBvdXRwdXQua2V5LnRvU3RyaW5nKCksXG4gICAgICAgIHZlcmlmaWVkOiBvdXRwdXQudmVyaWZpZWQsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBPcHRpb24sXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDcmVhdG9ycyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPFVzZXJTaWRlSW5wdXQuQ3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEluZnJhU2lkZUlucHV0LkNyZWF0b3JzW10+ID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGxldCBtb2RpZnk6IE9wdGlvbjxJbmZyYVNpZGVJbnB1dC5DcmVhdG9ycz4gPSBudWxsO1xuICAgICAgICBtb2RpZnkgPSB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG1vZGlmeTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW5mcmFTaWRlT3V0cHV0LkNyZWF0b3JbXT4sXG4gICAgKTogVXNlclNpZGVPdXRwdXQuQ3JlYXRvcnNbXSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBtb2RpZnkgPSB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBtb2RpZnk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBDb25maWcgZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb25maWcnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBjb25zdCBjdXJyZW50Q2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGV4cG9ydCBjb25zdCBjdXN0b21DbHVzdGVyVXJsID0gQ29uZmlnLmNsdXN0ZXIuY3VzdG9tQ2x1c3RlclVybDtcbiAgZXhwb3J0IGNvbnN0IGlzRGVidWdnaW5nID0gQ29uZmlnLmRlYnVnZ2luZztcbiAgZXhwb3J0IGNvbnN0IG5mdFN0b3JhZ2VBcGlLZXkgPSBDb25maWcubmZ0c3RvcmFnZS5hcGlrZXk7XG5cbiAgZXhwb3J0IGVudW0gQ2x1c3RlciB7XG4gICAgcHJkID0gJ21haW5uZXQtYmV0YScsXG4gICAgcHJkTWV0YXBsZXggPSAnbWFpbm5ldC1iZXRhLW1ldGFwbGV4JyxcbiAgICBkZXYgPSAnZGV2bmV0JyxcbiAgICB0ZXN0ID0gJ3Rlc3RuZXQnLFxuICAgIGxvY2FsaG9zdCA9ICdsb2NhbGhvc3QtZGV2bmV0JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEVuZFBvaW50VXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9hcGkubWFpbm5ldC1iZXRhLnNvbGFuYS5jb20nLFxuICAgIHByZE1ldGFwbGV4ID0gJ2h0dHBzOi8vYXBpLm1ldGFwbGV4LnNvbGFuYS5jb20nLFxuICAgIGRldiA9ICdodHRwczovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gICAgdGVzdCA9ICdodHRwczovL2FwaS50ZXN0bmV0LnNvbGFuYS5jb20nLFxuICAgIGxvY2FsaG9zdCA9ICdodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hDbHVzdGVyID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHsgY2x1c3RlcjogZW52LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcblxuICAgIC8vIGlmIHNldHRlZCBjdXN0b20gdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwgJiYgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21DbHVzdGVyVXJsW2luZGV4XTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkO1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmRNZXRhcGxleDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5sb2NhbGhvc3Q7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hCdW5kbHIgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLmRldjpcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDpcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIubG9jYWxob3N0OlxuICAgICAgICByZXR1cm4gJ2h0dHBzOi8vZGV2bmV0LmlyeXMueHl6JztcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgMjtcbiAgICAgICAgY29uc3QgY2x1c3RlcnMgPSBbJ2h0dHBzOi8vbm9kZTEuaXJ5cy54eXonLCAnaHR0cHM6Ly9ub2RlMi5pcnlzLnh5eiddO1xuICAgICAgICByZXR1cm4gY2x1c3RlcnNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgV1JBUFBFRF9UT0tFTl9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnU28xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMicsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRU1PX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdNZW1vMVVoa0pSZkh5dkxNY1Z1Y0p3eFhldUQ3MjhFcVZERHdRRHhGTU5vJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FVEFQTEVYX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdtZXRhcWJ4eFVlcmRxMjhjajFSYkFXa1lRbTN5YnpqYjZhOGJ0NTE4eDFzJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IENPTU1JVE1FTlQ6IENvbW1pdG1lbnQgPSAnY29uZmlybWVkJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPVxuICAgICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUprYVdRNlpYUm9jam93ZUVSR01qY3lOMlZrT0RaaFJHVTFSVE15WkRaRFpFSmxPRGMwWXpSRk5EbEVPRFkxT1dabU9FTWlMQ0pwYzNNaU9pSnVablF0YzNSdmNtRm5aU0lzSW1saGRDSTZNVFl5TURJMk5EazBNemN3Tml3aWJtRnRaU0k2SW1SbGJXOGlmUS5kNEo3MG1pa3hSQjhhNXZ3TnU2U081SERBOEphdWV1c2VBajdRX3l0TUNFJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vaXBmcy5pby9pcGZzJztcbiAgZXhwb3J0IGNvbnN0IElSWVNfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9nYXRld2F5LmlyeXMueHl6JztcbiAgZXhwb3J0IGNvbnN0IEJVTkRMUl9ORVRXT1JLX1VSTCA9IHN3aXRjaEJ1bmRscihDb25maWcuY2x1c3Rlci50eXBlKTtcbn1cbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0UmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvcj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcblxuICB1bndyYXAoKTogVDtcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBVO1xuICB1bndyYXA8VSwgVj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFYpOiBVIHwgVjtcbiAgLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMTBcbiAgLy8gdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBVKTogVTtcbiAgdW53cmFwKG9rPzogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IHVua25vd24pOiB1bmtub3duIHtcbiAgICBjb25zdCByID0gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayA/IG9rKHZhbHVlKSA6IHZhbHVlKSxcbiAgICAgIChlcnJvcikgPT4gKGVyciA/IFJlc3VsdC5vayhlcnIoZXJyb3IpKSA6IFJlc3VsdC5lcnIoZXJyb3IpKSxcbiAgICApO1xuICAgIGlmIChyLmlzRXJyKSB7XG4gICAgICB0aHJvdyByLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gci52YWx1ZTtcbiAgfVxuXG4gIC8vLy8gbWFwIC8vLy9cbiAgbWFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBSZXN1bHQ8VSwgRT47XG4gIG1hcDxVLCBGIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFUsXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IEYsXG4gICk6IFJlc3VsdDxVLCBGPjtcbiAgbWFwKG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gRXJyb3IpOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyID8gZXJyKGVycm9yKSA6IGVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vLyBjaGFpbiAvLy8vXG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMzdcbiAgLy8gZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBFPlxuICBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc3VibWl0IChhbGlhcyBJbnN0cnVjdGlvbi5zdWJtaXQpIC8vLy9cbiAgYXN5bmMgc3VibWl0KCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+IHtcbiAgICB0cnkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb24gPSB0aGlzLnVud3JhcCgpIGFzIGFueTtcbiAgICAgIGlmIChpbnN0cnVjdGlvbi5pbnN0cnVjdGlvbnMgJiYgaW5zdHJ1Y3Rpb24uc2lnbmVycykge1xuICAgICAgICByZXR1cm4gYXdhaXQgaW5zdHJ1Y3Rpb24uc3VibWl0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcignT25seSBJbnN0cnVjdGlvbiBvYmplY3QnKSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlcnIgYXMgRXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBJbnRlcm5hbE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSB0cnVlO1xuICByZWFkb25seSBpc0VyciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBfZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxFcnI8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IGZhbHNlO1xuICByZWFkb25seSBpc0VyciA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBfb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlc3VsdCB7XG4gIGV4cG9ydCB0eXBlIE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbE9rPFQsIEU+O1xuICBleHBvcnQgdHlwZSBFcnI8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsRXJyPFQsIEU+O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBvazxULCBFIGV4dGVuZHMgRXJyb3I+KHZhbHVlOiBUKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsT2sodmFsdWUpO1xuICB9XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yPzogRSk6IFJlc3VsdDxULCBFPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I6IEUpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnIoZXJyb3IgfHwgRXJyb3IoKSk7XG4gIH1cblxuICB0eXBlIFUgPSBSZXN1bHQ8dW5rbm93bj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgICBSMTUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNCwgUjE1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgICAgT2tUeXBlPFIxNT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgICB8IFIxNVxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxM10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgUjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTEgfCBSMTIgfCBSMTNcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+LCBPa1R5cGU8UjU+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFUsIFIzIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjNdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjM+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMl0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPl0sIEVyclR5cGU8UjAgfCBSMSB8IFIyPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMV0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPl0sIEVyclR5cGU8UjAgfCBSMT4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjBdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD5dLCBFcnJUeXBlPFIwPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiBbXSk6IFJlc3VsdDxbXT47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8VCBleHRlbmRzIFVbXSB8IFJlY29yZDxzdHJpbmcsIFU+PihcbiAgICBvYmo6IFQsXG4gICk6IFJlc3VsdDxcbiAgICB7IFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PGluZmVyIEk+ID8gSSA6IG5ldmVyIH0sXG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT4gPyBFIDogbmV2ZXI7XG4gICAgfVtrZXlvZiBUXVxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogdW5rbm93bik6IHVua25vd24ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIGNvbnN0IHJlc0FyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaikge1xuICAgICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBpdGVtIGFzIHVua25vd247XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlc0Fycik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSAob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KVtrZXldO1xuICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICByZXNba2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQub2socmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yID0gRXJyb3I+ID1cbiAgfCBSZXN1bHQuT2s8VCwgRT5cbiAgfCBSZXN1bHQuRXJyPFQsIEU+O1xuXG50eXBlIE9rVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgTz4gPyBPIDogbmV2ZXI7XG50eXBlIEVyclR5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+XG4gID8gRVxuICA6IG5ldmVyO1xuIiwgImltcG9ydCB7IEFueU9iamVjdCB9IGZyb20gJ34vdHlwZXMvc2hhcmVkJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJy4vcmVzdWx0JztcblxuLyoqXG4gKiBPdmVyd3JpdGUgSlMgT2JqZWN0XG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmplY3RcbiAqIEBwYXJhbSB7T3ZlcndyaXRlT2JqZWN0W119IHRhcmdldHNcbiAqIEByZXR1cm5zIE9iamVjdFxuICovXG5leHBvcnQgY29uc3Qgb3ZlcndyaXRlT2JqZWN0ID0gKFxuICBvYmplY3Q6IHVua25vd24sXG4gIHRhcmdldHM6IHtcbiAgICBleGlzdHNLZXk6IHN0cmluZztcbiAgICB3aWxsOiB7IGtleTogc3RyaW5nOyB2YWx1ZTogdW5rbm93biB9O1xuICB9W10sXG4pOiB1bmtub3duID0+IHtcbiAgY29uc3QgdGhhdDogQW55T2JqZWN0ID0gb2JqZWN0IGFzIEFueU9iamVjdDtcbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBkZWxldGUgdGhhdFt0YXJnZXQuZXhpc3RzS2V5XTtcbiAgICB0aGF0W3RhcmdldC53aWxsLmtleV0gPSB0YXJnZXQud2lsbC52YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0aGF0O1xufTtcblxuLyoqXG4gKiBEaXNwbGF5IGxvZyBmb3Igc29sYW5hLXN1aXRlLWNvbmZpZy5qc1xuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTFcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTJcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTNcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTRcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnTG9nID0gKFxuICBkYXRhMTogdW5rbm93bixcbiAgZGF0YTI6IHVua25vd24gPSAnJyxcbiAgZGF0YTM6IHVua25vd24gPSAnJyxcbiAgZGF0YTQ6IHVua25vd24gPSAnJyxcbik6IHZvaWQgPT4ge1xuICBpZiAoQ29uc3RhbnRzLmlzRGVidWdnaW5nID09PSAndHJ1ZScgfHwgcHJvY2Vzcy5lbnYuREVCVUcgPT09ICd0cnVlJykge1xuICAgIGNvbnNvbGUubG9nKCdbREVCVUddJywgZGF0YTEsIGRhdGEyLCBkYXRhMywgZGF0YTQpO1xuICB9XG59O1xuXG4vKipcbiAqIHNsZWVwIHRpbWVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNlY1xuICogQHJldHVybnMgUHJvbWlzZTxudW1iZXI+XG4gKi9cbmV4cG9ydCBjb25zdCBzbGVlcCA9IGFzeW5jIChzZWM6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCBzZWMgKiAxMDAwKSk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucyAhPSBudWxsICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlICE9IG51bGxcbiAgKTtcbn07XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuZXhwb3J0IGNvbnN0IGlzUHJvbWlzZSA9IChvYmo6IHVua25vd24pOiBvYmogaXMgUHJvbWlzZTx1bmtub3duPiA9PiB7XG4gIHJldHVybiAoXG4gICAgISFvYmogJiZcbiAgICAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiZcbiAgICB0eXBlb2YgKG9iaiBhcyBhbnkpLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgKTtcbn07XG5cbi8qKlxuICogVHJ5IGFzeW5jIG1vbmFkXG4gKlxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8VCwgRT4+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgYXN5bmNibG9jazogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8UmVzdWx0PFQsIEU+PjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihibG9jazogKCkgPT4gVCk6IFJlc3VsdDxULCBFPjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgaW5wdXQ6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBSZXN1bHQ8VCwgRXJyb3I+IHwgUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdiA9IGlucHV0KCk7XG4gICAgaWYgKGlzUHJvbWlzZSh2KSkge1xuICAgICAgcmV0dXJuIHYudGhlbihcbiAgICAgICAgKHg6IFQpID0+IFJlc3VsdC5vayh4KSxcbiAgICAgICAgKGVycjogRSkgPT4gUmVzdWx0LmVycihlcnIpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayh2KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoZSBhcyBzdHJpbmcpKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZmluYWxseUlucHV0KSB7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5hbGx5IGlucHV0OicsIGZpbmFsbHlJbnB1dCk7XG4gICAgICBmaW5hbGx5SW5wdXQoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8dW5kZWZpbmVkfSBjcmVhdGVkX2F0XG4gKiBAcmV0dXJucyBEYXRlIHwgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSA9IChcbiAgY3JlYXRlZF9hdDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuKTogRGF0ZSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChjcmVhdGVkX2F0KSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGNyZWF0ZWRfYXQgKiAxMDAwKTtcbiAgfVxuICByZXR1cm47XG59O1xuIiwgImltcG9ydCB7IEtleXBhaXIsIExBTVBPUlRTX1BFUl9TT0wsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBLZXlwYWlyQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIgfSBmcm9tICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbi8qKlxuICogQ3JlYXRlIGV4cGxvcmVyIHVybCBmb3IgYWNjb3VudCBhZGRyZXNzIG9yIHNpZ25hdHVyZVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5TdHJpbmcucHJvdG90eXBlLnRvRXhwbG9yZXJVcmwgPSBmdW5jdGlvbiAoXG4gIGV4cGxvcmVyOiBFeHBsb3JlciA9IEV4cGxvcmVyLlNvbHNjYW4sXG4pIHtcbiAgY29uc3QgZW5kUG9pbnRVcmwgPSBOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludDtcbiAgZGVidWdMb2coJyMgdG9FeHBsb3JlclVybCBycGNFbmRwb2ludDonLCBlbmRQb2ludFVybCk7XG4gIGxldCBjbHVzdGVyID0gJyc7XG4gIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLnRlc3Q7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5kZXYpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9IGVsc2Uge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH1cblxuICBjb25zdCBhZGRyZXNzT3JTaWduYXR1cmU6IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgbGV0IHVybCA9ICcnO1xuICBpZiAoS2V5cGFpckFjY291bnQuaXNQdWJrZXkoYWRkcmVzc09yU2lnbmF0dXJlKSkge1xuICAgIC8vIGFkZHJlc3NcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgaHR0cHM6Ly9zb2xhbmEuZm0vYWRkcmVzcy8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sc2Nhbi5pby9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICAvLyBzaWduYXR1cmVcbiAgfSBlbHNlIHtcbiAgICAvLyBmb3IgSW52YWxpZCB0eXBlIFwibmV2ZXJcIiBvZiBhZGRyZXNzT3JTaWduYXR1cmUsIHNvIGBhcyBzdHJpbmdgXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sYW5hLmZtL3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sc2Nhbi5pby90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFB1YktleShAc29sYW5hLXN1aXRlKSB0byBQdWJsaWNLZXkoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFB1YmxpY0tleVxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvUHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUtleXBhaXJBY2NvdW50LmlzUHVia2V5KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5QdWJLZXk6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMudG9TdHJpbmcoKSk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUtleXBhaXJBY2NvdW50LmlzU2VjcmV0KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5TZWNyZXQ6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy50b1N0cmluZygpKTtcbiAgcmV0dXJuIEtleXBhaXIuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbn07XG5cbi8qKlxuICogTEFNUE9SVFMgdG8gU09MXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9Tb2wgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC50aW1lcyhMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb21taXRtZW50LCBDb25uZWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcbiAgY29uc3Qgc2V0dGVkID0ge1xuICAgIGNsdXN0ZXJVcmw6ICcnLFxuICAgIGNvbW1pdG1lbnQ6IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICAgIGN1c3RvbUNsdXN0ZXJVcmw6IFtdIGFzIHN0cmluZ1tdLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uID0gKCk6IENvbm5lY3Rpb24gPT4ge1xuICAgIGRlYnVnTG9nKCcjIFtCZWZvcmVdIHNldHRlZDonLCBzZXR0ZWQpO1xuICAgIGRlYnVnTG9nKFxuICAgICAgJyMgW0JlZm9yZV0gQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmw6JyxcbiAgICAgIENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLFxuICAgICk7XG5cbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIGRlYnVnTG9nKCcjIFtBZnRlcl0gc2V0dGVkOicsIHNldHRlZCk7XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IENvbW1pdG1lbnQ7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vZGVmaW5lJztcbmltcG9ydCB7IEluc3RydWN0aW9uIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaC1zdWJtaXQnO1xuXG5leHBvcnQgY2xhc3MgSW5zdHJ1Y3Rpb24ge1xuICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgc2lnbmVyczogS2V5cGFpcltdO1xuICBmZWVQYXllcj86IEtleXBhaXI7XG4gIGRhdGE/OiB1bmtub3duO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgZGF0YT86IHVua25vd24sXG4gICkge1xuICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzdWJtaXQgPSBhc3luYyAoKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEluc3RydWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogc2VuVHJhbnNhY3Rpb24oKSBUcmFuc2FjdGlvbkluc3RydWN0aW9uXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBAdHMtaWdub3JlICovXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0cnVjdGlvbnM6IEluc3RydWN0aW9uW10gPSBbXTtcbiAgLy8gZG9udCB1c2UgZm9yRWFjaFxuICAvLyBJdCBpcyBub3QgcG9zc2libGUgdG8gc3RvcCB0aGUgcHJvY2VzcyBieSBSRVRVUk4gaW4gdGhlIG1pZGRsZSBvZiB0aGUgcHJvY2Vzcy5cbiAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzOiBzdHJpbmcgPSBvYmouZXJyb3IubWVzc2FnZSBhcyBzdHJpbmc7XG4gICAgICAgIHRocm93IEVycm9yKGBbQXJyYXkgaW5kZXggb2YgY2F1Z2h0ICdSZXN1bHQuZXJyJzogJHtpfV0ke2Vycm9yTWVzc31gKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqLmlzT2spIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlIGFzIEluc3RydWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iaiBhcyBJbnN0cnVjdGlvbik7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBCYXRjaC5iYXRjaFN1Ym1pdChpbnN0cnVjdGlvbnMpO1xuICB9KTtcbn07XG4iLCAiLy9AaW50ZXJuYWxzXG5leHBvcnQgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2RlZmluZSc7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiBhcyBfSW5kZXggfSBmcm9tICcuLyc7XG5cbmV4cG9ydCBjbGFzcyBJbnN0cnVjdGlvbiB7XG4gIHN0YXRpYyBiYXRjaFN1Ym1pdCA9IGFzeW5jIChhcnI6IF9JbmRleFtdKTogUHJvbWlzZTxUcmFuc2FjdGlvblNpZ25hdHVyZT4gPT4ge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IGEgb2YgYXJyKSB7XG4gICAgICBpZiAoIWEuaW5zdHJ1Y3Rpb25zICYmICFhLnNpZ25lcnMpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgYG9ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSBiYXRjaFN1Ym1pdCgpLlxuICAgICAgICAgICAgSW5kZXg6ICR7aX0sIFNldCB2YWx1ZTogJHtKU09OLnN0cmluZ2lmeShhKX1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLmluc3RydWN0aW9ucyk7XG4gICAgY29uc3Qgc2lnbmVycyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLnNpZ25lcnMpO1xuICAgIGNvbnN0IGZlZVBheWVycyA9IGFyci5maWx0ZXIoKGEpID0+IGEuZmVlUGF5ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgbGV0IGZlZVBheWVyID0gc2lnbmVyc1swXTtcbiAgICBpZiAoZmVlUGF5ZXJzLmxlbmd0aCA+IDAgJiYgZmVlUGF5ZXJzWzBdLmZlZVBheWVyKSB7XG4gICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgIGlmIChmZWVQYXllcikge1xuICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSBmZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgIH1cbiAgICBpbnN0cnVjdGlvbnMubWFwKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICB9O1xufVxuXG4vKipcbiAqIHNlblRyYW5zYWN0aW9uKCkgVHJhbnNhY3Rpb25JbnN0cnVjdGlvblxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuLyogQHRzLWlnbm9yZSAqL1xuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBfSW5kZXhbXSA9IFtdO1xuICAvLyBkb250IHVzZSBmb3JFYWNoXG4gIC8vIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBzdG9wIHRoZSBwcm9jZXNzIGJ5IFJFVFVSTiBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwcm9jZXNzLlxuICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICBjb25zdCBlcnJvck1lc3M6IHN0cmluZyA9IG9iai5lcnJvci5tZXNzYWdlIGFzIHN0cmluZztcbiAgICAgICAgdGhyb3cgRXJyb3IoYFtBcnJheSBpbmRleCBvZiBjYXVnaHQgJ1Jlc3VsdC5lcnInOiAke2l9XSR7ZXJyb3JNZXNzfWApO1xuICAgICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUgYXMgX0luZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iaiBhcyBfSW5kZXgpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gSW5zdHJ1Y3Rpb24uYmF0Y2hTdWJtaXQoaW5zdHJ1Y3Rpb25zKTtcbiAgfSk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vaW5zdHJ1Y3Rpb24vZGVmaW5lJztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnLi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBNaW50SW5zdHJ1Y3Rpb24gZXh0ZW5kcyBJbnN0cnVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgZGF0YT86IHVua25vd24sXG4gICkge1xuICAgIHN1cGVyKGluc3RydWN0aW9ucywgc2lnbmVycywgZmVlUGF5ZXIsIGRhdGEpO1xuICB9XG5cbiAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW50SW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IE1pbnRJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICB9O1xuXG4gICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgZGVidWdMb2coJyMgQ2hhbmdlIG1ldGFwbGV4IGNsdXN0ZXIgb24gbWFpbm5ldC1iZXRhJyk7XG4gICAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXI6IENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4IH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIEtleXBhaXIsXG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgU1lTVkFSX1JFTlRfUFVCS0VZLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBibG9iLCBzdHJ1Y3QsIHU4IH0gZnJvbSAnQHNvbGFuYS9idWZmZXItbGF5b3V0JztcbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWdJbnN0cnVjdGlvbiB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgY29uc3QgY3JlYXRlTGF5b3V0UHViS2V5ID0gKHByb3BlcnR5OiBzdHJpbmcpOiBhbnkgPT4ge1xuICAgIHJldHVybiBibG9iKDMyLCBwcm9wZXJ0eSk7XG4gIH07XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudCAqL1xuICBleHBvcnQgY29uc3QgTGF5b3V0ID0gc3RydWN0PHtcbiAgICBtOiBudW1iZXI7XG4gICAgbjogbnVtYmVyO1xuICAgIGlzX2luaXRpYWxpemVkOiBudW1iZXI7XG4gICAgc2lnbmVyMTogUHVibGljS2V5O1xuICAgIHNpZ25lcjI6IFB1YmxpY0tleTtcbiAgICBzaWduZXIzOiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNDogUHVibGljS2V5O1xuICAgIHNpZ25lcjU6IFB1YmxpY0tleTtcbiAgICBzaWduZXI2OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNzogUHVibGljS2V5O1xuICAgIHNpZ25lcjg6IFB1YmxpY0tleTtcbiAgICBzaWduZXI5OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyMTA6IFB1YmxpY0tleTtcbiAgICBzaWduZXIxMTogUHVibGljS2V5O1xuICB9PihbXG4gICAgdTgoJ20nKSxcbiAgICB1OCgnbicpLFxuICAgIHU4KCdpc19pbml0aWFsaXplZCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMTAnKSxcbiAgICBjcmVhdGVMYXlvdXRQdWJLZXkoJ3NpZ25lcjExJyksXG4gIF0pO1xuXG4gIGV4cG9ydCBjb25zdCBhY2NvdW50ID0gKFxuICAgIG5ld0FjY291bnQ6IEtleXBhaXIsXG4gICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgYmFsYW5jZU5lZWRlZDogbnVtYmVyLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG5ld0FjY291bnQucHVibGljS2V5LFxuICAgICAgbGFtcG9ydHM6IGJhbGFuY2VOZWVkZWQsXG4gICAgICBzcGFjZTogTGF5b3V0LnNwYW4sXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IG11bHRpc2lnID0gKFxuICAgIG06IG51bWJlcixcbiAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICBzaWduZXJQdWJrZXk6IFB1YmxpY0tleVtdLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAge1xuICAgICAgICBwdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHVia2V5OiBTWVNWQVJfUkVOVF9QVUJLRVksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgc2lnbmVyUHVia2V5LmZvckVhY2goKHB1YmtleSkgPT5cbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIHB1YmtleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBkYXRhTGF5b3V0ID0gc3RydWN0PHsgaW5zdHJ1Y3Rpb246IG51bWJlcjsgbTogbnVtYmVyIH0+KFtcbiAgICAgIHU4KCdpbnN0cnVjdGlvbicpLFxuICAgICAgdTgoJ20nKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuYWxsb2MoZGF0YUxheW91dC5zcGFuKTtcblxuICAgIGRhdGFMYXlvdXQuZW5jb2RlKFxuICAgICAge1xuICAgICAgICBpbnN0cnVjdGlvbjogMixcbiAgICAgICAgbSxcbiAgICAgIH0sXG4gICAgICBkYXRhLFxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAga2V5cyxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9pbnN0cnVjdGlvbi9kZWZpbmUnO1xuXG5leHBvcnQgY2xhc3MgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiB7XG4gIGhleEluc3RydWN0aW9uOiBzdHJpbmc7XG4gIGRhdGE/OiBQdWJrZXk7XG5cbiAgY29uc3RydWN0b3IoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIG1pbnQ/OiBQdWJrZXkpIHtcbiAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gIH1cblxuICBzdWJtaXQgPSBhc3luYyAoXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZSA9IEJ1ZmZlci5mcm9tKHRoaXMuaGV4SW5zdHJ1Y3Rpb24sICdoZXgnKTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uRnJvbUpzb24gPSBUcmFuc2FjdGlvbi5mcm9tKGRlY29kZSk7XG4gICAgICB0cmFuc2FjdGlvbkZyb21Kc29uLnBhcnRpYWxTaWduKGZlZVBheWVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHdpcmVUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uRnJvbUpzb24uc2VyaWFsaXplKCk7XG4gICAgICByZXR1cm4gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuc2VuZFJhd1RyYW5zYWN0aW9uKFxuICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2csIHNsZWVwIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnfi9pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBY2NvdW50LFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcixcbiAgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHsgS2V5cGFpckFjY291bnQgfSBmcm9tICcuL2tleXBhaXItYWNjb3VudCc7XG5cbi8qKlxuICogR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gKlxuICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsbG93T3duZXJPZmZDdXJ2ZVxuICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBBc3NvY2lhdGVkQWNjb3VudCB7XG4gIGNvbnN0IFJFVFJZX09WRVJfTElNSVQgPSAxMDtcbiAgY29uc3QgUkVUUllfU0xFRVBfVElNRSA9IDM7XG4gIGNvbnN0IGdldCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICApOiBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPiA9PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZlZVBheWVyIH0pLnB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICApO1xuXG4gICAgaWYgKCFyZXMuaW5zdCkge1xuICAgICAgcmV0dXJuIHJlcy50b2tlbkFjY291bnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgIFtyZXMuaW5zdF0sXG4gICAgICBbXSxcbiAgICAgIGZlZVBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgcmVzLnRva2VuQWNjb3VudCxcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXRyeSBmdW5jdGlvbiBpZiBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAqL1xuICBleHBvcnQgY29uc3QgcmV0cnlHZXRPckNyZWF0ZSA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGxldCBjb3VudGVyID0gMTtcbiAgICB3aGlsZSAoY291bnRlciA8IFJFVFJZX09WRVJfTElNSVQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBnZXQobWludCwgb3duZXIsIGZlZVBheWVyLCB0cnVlKTtcblxuICAgICAgICBpZiAoaW5zdCAmJiB0eXBlb2YgaW5zdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBpbnN0KTtcbiAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgfSBlbHNlIGlmIChpbnN0IGluc3RhbmNlb2YgSW5zdHJ1Y3Rpb24pIHtcbiAgICAgICAgICAoYXdhaXQgaW5zdC5zdWJtaXQoKSkubWFwKFxuICAgICAgICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgICAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKG9rKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGluc3QuZGF0YSBhcyBzdHJpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICBkZWJ1Z0xvZygnIyBFcnJvciBzdWJtaXQgcmV0cnlHZXRPckNyZWF0ZTogJywgZXJyKTtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGRlYnVnTG9nKGAjIHJldHJ5OiAke2NvdW50ZXJ9IGNyZWF0ZSB0b2tlbiBhY2NvdW50OiBgLCBlKTtcbiAgICAgICAgZGVidWdMb2coYCMgbWludDogJHttaW50fSwgb3duZXI6ICR7b3duZXJ9LCBmZWVQYXllcjogJHtmZWVQYXllcn1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNsZWVwKFJFVFJZX1NMRUVQX1RJTUUpO1xuICAgICAgY291bnRlcisrO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcihgcmV0cnkgYWN0aW9uIGlzIG92ZXIgbGltaXQgJHtSRVRSWV9PVkVSX0xJTUlUfWApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZlZVBheWVyPzogUHVia2V5LFxuICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICApOiBQcm9taXNlPHtcbiAgICB0b2tlbkFjY291bnQ6IHN0cmluZztcbiAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICB9PiA9PiB7XG4gICAgY29uc3QgYXNzb2NpYXRlZFRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgKTtcblxuICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gRG9udCB1c2UgUmVzdWx0XG4gICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgaW5zdDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgaWYgKFxuICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gb3duZXIgOiBmZWVQYXllcjtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgcGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgaW5zdCxcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXIsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbmV4cG9ydCBjbGFzcyBLZXlwYWlyQWNjb3VudCB7XG4gIHNlY3JldDogU2VjcmV0O1xuICBwdWJrZXk6IFB1YmtleTtcblxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgaWYgKCFwYXJhbXMucHVia2V5KSB7XG4gICAgICBjb25zdCBrZXlwYWlyID0gcGFyYW1zLnNlY3JldC50b0tleXBhaXIoKTtcbiAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdWJrZXkgPSBwYXJhbXMucHVia2V5O1xuICAgIH1cbiAgICB0aGlzLnNlY3JldCA9IHBhcmFtcy5zZWNyZXQ7XG4gIH1cblxuICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMucHVia2V5KTtcbiAgfVxuXG4gIHRvS2V5cGFpcigpOiBLZXlwYWlyIHtcbiAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICByZXR1cm4gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICB9XG5cbiAgc3RhdGljIGlzUHVia2V5ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBQdWJrZXkgPT5cbiAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gIHN0YXRpYyBpc1NlY3JldCA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgU2VjcmV0ID0+XG4gICAgL15bMC05YS16QS1aXXs4Nyw4OH0kLy50ZXN0KHZhbHVlKTtcblxuICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXJBY2NvdW50ID0+IHtcbiAgICBjb25zdCBrZXlwYWlyID0gS2V5cGFpci5nZW5lcmF0ZSgpO1xuICAgIHJldHVybiBuZXcgS2V5cGFpckFjY291bnQoe1xuICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgfSk7XG4gIH07XG5cbiAgc3RhdGljIHRvS2V5UGFpciA9IChrZXlwYWlyOiBLZXlwYWlyKTogS2V5cGFpckFjY291bnQgPT4ge1xuICAgIHJldHVybiBuZXcgS2V5cGFpckFjY291bnQoe1xuICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICBleHBvcnQgY29uc3QgZ2V0TWV0YWRhdGEgPSAobWludDogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgW1xuICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgIF0sXG4gICAgICBQUk9HUkFNX0lELFxuICAgICk7XG4gICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0TWFzdGVyRWRpdGlvbiA9IChtaW50OiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICBbXG4gICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICBCdWZmZXIuZnJvbSgnZWRpdGlvbicpLFxuICAgICAgXSxcbiAgICAgIFBST0dSQU1fSUQsXG4gICAgKTtcbiAgICByZXR1cm4gcHVibGljS2V5O1xuICB9O1xufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuTWVtbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBvdXRwdXRUcmFuc2Zlcj86IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyBjYXNlOiB0cmFuc2ZlciB3aXRoIG1lbW9cbiAgICAgIGlmIChvdXRwdXRUcmFuc2ZlciAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtICE9PSAnJykge1xuICAgICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtID09PSAnc3BsLXRva2VuJykge1xuICAgICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGhpc3RvcnkubWVtbyA9IG91dHB1dC5wYXJzZWQ7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk1pbnRUbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQgYXMgc3RyaW5nO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQsIE9wdGlvbiwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBVc2VzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW5mcmFTaWRlT3V0cHV0LlVzZXM+LFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LlVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUb2tlbk1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhU2lkZSA9IChcbiAgICAgIGlucHV0OiBVc2VyU2lkZUlucHV0LlRva2VuTWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogSW5mcmFTaWRlSW5wdXQuTWV0YXBsZXhEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhU2lkZShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IG51bGwsXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5PbmNoYWluQW5kT2ZmY2hhaW4sXG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sKSxcbiAgICAgICAgdG9rZW5BbW91bnQ6IHRva2VuQW1vdW50LFxuICAgICAgICB1cmk6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICAgIC8vIGRlbGV0ZSBOVUxMKDB4MDApIHN0cmluZ3MgZnVuY3Rpb25cbiAgICBleHBvcnQgY29uc3QgZGVsZXRlTnVsbFN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXDAvZywgJycpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Vc2VzIH0gZnJvbSAnLi91c2VzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVG9rZW4gfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7XG4gIEluZnJhU2lkZUlucHV0LFxuICBJbmZyYVNpZGVPdXRwdXQsXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKFxuICAgICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogSW5mcmFTaWRlSW5wdXQuTWV0YXBsZXhEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhU2lkZShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IF9Db2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhU2lkZShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk9uY2hhaW5BbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVXNlclNpZGVPdXRwdXQuTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG91dHB1dC5vbmNoYWluLnVwZGF0ZUF1dGhvcml0eS50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBfVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IF9Ub2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sLFxuICAgICAgICApLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogX1Rva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBpc011dGFibGU6IG91dHB1dC5vbmNoYWluLmlzTXV0YWJsZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucHJpbWFyeVNhbGVIYXBwZW5lZCxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIGVkaXRpb25Ob25jZTogb3V0cHV0Lm9uY2hhaW4uZWRpdGlvbk5vbmNlLFxuICAgICAgICBjb2xsZWN0aW9uOiBfQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9Vc2VyU2lkZShcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5jb2xsZWN0aW9uLFxuICAgICAgICApLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG92ZXJ3cml0ZU9iamVjdCwgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEluZnJhU2lkZUlucHV0LCBVc2VyU2lkZUlucHV0IH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgU3RvcmFnZVR5cGUsIEZpbGVUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gYXN5bmMgKFxuICAgICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuUHJvcGVydGllcyB8IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrRnVuYzogKFxuICAgICAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgICApID0+IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PixcbiAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICk6IFByb21pc2U8SW5mcmFTaWRlSW5wdXQuUHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2FsbGJhY2tGdW5jKGZpbGUuZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICAgICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3ZlcndyaXRlT2JqZWN0KGZpbGUsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICB3aWxsOiB7IGtleTogJ3VyaScsIHZhbHVlOiByZXMudmFsdWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmlucHV0LCBmaWxlcyB9IGFzIEluZnJhU2lkZUlucHV0LlByb3BlcnRpZXM7XG4gICAgfTtcbiAgfVxufVxuIiwgImV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSb3lhbHR5IHtcbiAgICBleHBvcnQgY29uc3QgVEhSRVNIT0xEID0gMTAwO1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgSW5mcmFTaWRlT3V0cHV0IH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlckNoZWNrZWQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQpIHtcbiAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgKTtcbiAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm11bHRpc2lnQXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm11bHRpc2lnQXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS5zaWduZXJzID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNpZ25lcnM7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVHJhbnNmZXIge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlcixcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gY2hlY2tcbiAgICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgaGlzdG9yeS5zb2wgPSBvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHM/LnRvU29sKCkudG9TdHJpbmcoKTtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNZW1vIH0gZnJvbSAnLi9tZW1vJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBOZnRNZXRhZGF0YSB9IGZyb20gJy4vbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9wcm9wZXJ0aWVzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnLi90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFVzZXMgfSBmcm9tICcuL3VzZXMnO1xuXG5leHBvcnQgY29uc3QgQ29udmVydGVyID0ge1xuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uTmZ0TWV0YWRhdGEsXG4gIC4uLlByb3BlcnRpZXMsXG4gIC4uLlJveWFsdHksXG4gIC4uLlRva2VuTWV0YWRhdGEsXG4gIC4uLlRyYW5zZmVyQ2hlY2tlZCxcbiAgLi4uVHJhbnNmZXIsXG4gIC4uLlVzZXMsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQVFPLElBQVU7QUFBQSxDQUFWLENBQVVBLGdCQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLGdCQUFWO0FBQ0UsSUFBTUEsWUFBQSxnQkFBZ0IsQ0FDM0IsVUFDc0M7QUFDdEMsVUFBSSxDQUFDLE9BQU87QUFDVixlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU87QUFBQSxRQUNMLEtBQUssTUFBTSxZQUFZO0FBQUEsUUFDdkIsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBRU8sSUFBTUEsWUFBQSxlQUFlLENBQzFCLFdBQzBDO0FBQzFDLFVBQUksQ0FBQyxRQUFRO0FBQ1gsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPO0FBQUEsUUFDTCxTQUFTLE9BQU8sSUFBSSxTQUFTO0FBQUEsUUFDN0IsVUFBVSxPQUFPO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsS0F6QmUsYUFBQUQsWUFBQSxlQUFBQSxZQUFBO0FBQUEsR0FERjs7O0FDQVYsSUFBVUU7QUFBQSxDQUFWLENBQVVBLGdCQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLGNBQVY7QUFDRSxJQUFNQSxVQUFBLGdCQUFnQixDQUMzQixVQUNzQztBQUN0QyxVQUFJLENBQUMsT0FBTztBQUNWLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTyxNQUFNLElBQUksQ0FBQyxTQUFTO0FBQ3pCLFlBQUksU0FBMEM7QUFDOUMsaUJBQVM7QUFBQSxVQUNQLFNBQVMsS0FBSyxRQUFRLFlBQVk7QUFBQSxVQUNsQyxPQUFPLEtBQUs7QUFBQSxVQUNaLFVBQVUsS0FBSztBQUFBLFFBQ2pCO0FBRUEsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFTyxJQUFNQSxVQUFBLGVBQWUsQ0FDMUIsV0FDMEM7QUFDMUMsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sT0FBTyxJQUFJLENBQUMsU0FBUztBQUMxQixjQUFNLFNBQVM7QUFBQSxVQUNiLFNBQVMsS0FBSyxRQUFRLFNBQVM7QUFBQSxVQUMvQixPQUFPLEtBQUs7QUFBQSxVQUNaLFVBQVUsS0FBSztBQUFBLFFBQ2pCO0FBQ0EsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFBQSxLQWxDZSxXQUFBRCxZQUFBLGFBQUFBLFlBQUE7QUFBQSxHQURGQSw0QkFBQTs7O0FDUmpCLFNBQXFCLGlCQUFpQjtBQUN0QyxPQUFPLFlBQVk7QUFFWixJQUFVO0FBQUEsQ0FBVixDQUFVRSxlQUFWO0FBQ0UsRUFBTUEsV0FBQSxpQkFBaUIsT0FBTyxRQUFRO0FBQ3RDLEVBQU1BLFdBQUEsbUJBQW1CLE9BQU8sUUFBUTtBQUN4QyxFQUFNQSxXQUFBLGNBQWMsT0FBTztBQUMzQixFQUFNQSxXQUFBLG1CQUFtQixPQUFPLFdBQVc7QUFFM0MsTUFBSztBQUFMLElBQUtDLGFBQUw7QUFDTCxJQUFBQSxTQUFBLFNBQU07QUFDTixJQUFBQSxTQUFBLGlCQUFjO0FBQ2QsSUFBQUEsU0FBQSxTQUFNO0FBQ04sSUFBQUEsU0FBQSxVQUFPO0FBQ1AsSUFBQUEsU0FBQSxlQUFZO0FBQUEsS0FMRixVQUFBRCxXQUFBLFlBQUFBLFdBQUE7QUFRTCxNQUFLO0FBQUwsSUFBS0UsaUJBQUw7QUFDTCxJQUFBQSxhQUFBLFNBQU07QUFDTixJQUFBQSxhQUFBLGlCQUFjO0FBQ2QsSUFBQUEsYUFBQSxTQUFNO0FBQ04sSUFBQUEsYUFBQSxVQUFPO0FBQ1AsSUFBQUEsYUFBQSxlQUFZO0FBQUEsS0FMRixjQUFBRixXQUFBLGdCQUFBQSxXQUFBO0FBUUwsRUFBTUEsV0FBQSxnQkFBZ0IsQ0FBQyxVQUdoQjtBQUNaLFVBQU0sRUFBRSxTQUFTLEtBQUssa0JBQUFHLGtCQUFpQixJQUFJO0FBRzNDLFFBQUlBLHFCQUFvQkEsa0JBQWlCLFNBQVMsR0FBRztBQUNuRCxZQUFNLFFBQVEsS0FBSyxJQUFJLElBQUlBLGtCQUFpQjtBQUM1QyxhQUFPQSxrQkFBaUIsS0FBSztBQUFBLElBQy9CO0FBRUEsWUFBUSxLQUFLO0FBQUEsTUFDWCxLQUFLO0FBQ0gsZUFBTztBQUFBLE1BQ1QsS0FBSztBQUNILGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsZUFBTztBQUFBLE1BQ1Q7QUFDRSxlQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFFTyxFQUFNSCxXQUFBLGVBQWUsQ0FBQyxRQUF3QjtBQUNuRCxZQUFRLEtBQUs7QUFBQSxNQUNYLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFDSCxlQUFPO0FBQUEsTUFDVCxTQUFTO0FBQ1AsY0FBTSxRQUFRLEtBQUssSUFBSSxJQUFJO0FBQzNCLGNBQU0sV0FBVyxDQUFDLDBCQUEwQix3QkFBd0I7QUFDcEUsZUFBTyxTQUFTLEtBQUs7QUFBQSxNQUN2QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRU8sRUFBTUEsV0FBQSwyQkFBMkIsSUFBSTtBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUNPLEVBQU1BLFdBQUEsa0JBQWtCLElBQUk7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFDTyxFQUFNQSxXQUFBLHNCQUFzQixJQUFJO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQ08sRUFBTUEsV0FBQSxhQUF5QjtBQUMvQixFQUFNQSxXQUFBLHNCQUNYO0FBQ0ssRUFBTUEsV0FBQSwwQkFBMEI7QUFDaEMsRUFBTUEsV0FBQSxtQkFBbUI7QUFDekIsRUFBTUEsV0FBQSx5QkFBcUJBLFdBQUEsY0FBYSxPQUFPLFFBQVEsSUFBSTtBQUFBLEdBNUVuRDs7O0FDQWpCLElBQWUsaUJBQWYsTUFBa0Q7QUFBQTtBQUFBO0FBQUEsRUFXaEQsT0FBTyxJQUE0QixLQUFzQztBQUN2RSxVQUFNLElBQUksS0FBSztBQUFBLE1BQ2IsQ0FBQyxVQUFVLE9BQU8sR0FBRyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUs7QUFBQSxNQUMzQyxDQUFDLFVBQVcsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxPQUFPLElBQUksS0FBSztBQUFBLElBQzVEO0FBQ0EsUUFBSSxFQUFFLE9BQU87QUFDWCxZQUFNLEVBQUU7QUFBQSxJQUNWO0FBQ0EsV0FBTyxFQUFFO0FBQUEsRUFDWDtBQUFBLEVBUUEsSUFBSSxJQUEyQixLQUE0QztBQUN6RSxXQUFPLEtBQUs7QUFBQSxNQUNWLENBQUMsVUFBVSxPQUFPLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFBQSxNQUM5QixDQUFDLFVBQVUsT0FBTyxJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSztBQUFBLElBQ2hEO0FBQUEsRUFDRjtBQUFBLEVBV0EsTUFDRSxJQUNBLEtBQ2lCO0FBQ2pCLFdBQU8sS0FBSyxPQUFPLElBQUksUUFBUSxDQUFDLFVBQVUsT0FBTyxJQUFJLEtBQUssRUFBRTtBQUFBLEVBQzlEO0FBQUEsRUFLQSxNQUNFLElBQ0EsS0FDc0I7QUFDdEIsU0FBSztBQUFBLE1BQ0gsQ0FBQyxVQUFVLE9BQU8sR0FBRyxHQUFHLEtBQUssQ0FBQztBQUFBLE1BQzlCLENBQUMsVUFBVSxPQUFPLElBQUksSUFBSSxLQUFLLENBQVU7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsTUFBTSxTQUF1RDtBQUMzRCxRQUFJO0FBRUYsWUFBTSxjQUFjLEtBQUssT0FBTztBQUNoQyxVQUFJLFlBQVksZ0JBQWdCLFlBQVksU0FBUztBQUNuRCxlQUFPLE1BQU0sWUFBWSxPQUFPO0FBQUEsTUFDbEM7QUFDQSxhQUFPLE9BQU8sSUFBSSxNQUFNLHlCQUF5QixDQUFDO0FBQUEsSUFDcEQsU0FBUyxLQUFLO0FBQ1osYUFBTyxPQUFPLElBQUksR0FBWTtBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxhQUFOLGNBQTZDLGVBQXFCO0FBQUEsRUFHaEUsWUFBcUIsT0FBVTtBQUM3QixVQUFNO0FBRGE7QUFBQSxFQUVyQjtBQUFBLEVBSlMsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBO0FBQUEsRUFNUCxPQUNSLElBQ0EsTUFDYztBQUNkLFdBQU8sR0FBRyxLQUFLLEtBQUs7QUFBQSxFQUN0QjtBQUNGO0FBRUEsSUFBTSxjQUFOLGNBQThDLGVBQXFCO0FBQUEsRUFHakUsWUFBcUIsT0FBVTtBQUM3QixVQUFNO0FBRGE7QUFBQSxFQUVyQjtBQUFBLEVBSlMsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBS1AsT0FDUixLQUNBLEtBQ2M7QUFDZCxXQUFPLElBQUksS0FBSyxLQUFLO0FBQUEsRUFDdkI7QUFDRjtBQUVPLElBQVU7QUFBQSxDQUFWLENBQVVJLFlBQVY7QUFJRSxXQUFTLEdBQXVCLE9BQXdCO0FBQzdELFdBQU8sSUFBSSxXQUFXLEtBQUs7QUFBQSxFQUM3QjtBQUZPLEVBQUFBLFFBQVM7QUFJVCxXQUFTLElBQWdDLE9BQXdCO0FBQ3RFLFdBQU8sSUFBSSxZQUFZLFNBQVMsTUFBTSxDQUFDO0FBQUEsRUFDekM7QUFGTyxFQUFBQSxRQUFTO0FBOFlULFdBQVMsSUFBSSxLQUF1QjtBQUN6QyxRQUFJLE1BQU0sUUFBUSxHQUFHLEdBQUc7QUFDdEIsWUFBTSxTQUFTLENBQUM7QUFDaEIsaUJBQVcsUUFBUSxLQUFLO0FBQ3RCLFlBQUksS0FBSyxPQUFPO0FBQ2QsaUJBQU87QUFBQSxRQUNUO0FBQ0EsZUFBTyxLQUFLLEtBQUssS0FBSztBQUFBLE1BQ3hCO0FBQ0EsYUFBT0EsUUFBTyxHQUFHLE1BQU07QUFBQSxJQUN6QjtBQUVBLFVBQU0sTUFBK0IsQ0FBQztBQUN0QyxVQUFNLE9BQU8sT0FBTyxLQUFLLEdBQXdCO0FBQ2pELGVBQVcsT0FBTyxNQUFNO0FBQ3RCLFlBQU0sT0FBUSxJQUEwQixHQUFHO0FBQzNDLFVBQUksS0FBSyxPQUFPO0FBQ2QsZUFBTztBQUFBLE1BQ1Q7QUFDQSxVQUFJLEdBQUcsSUFBSSxLQUFLO0FBQUEsSUFDbEI7QUFDQSxXQUFPQSxRQUFPLEdBQUcsR0FBRztBQUFBLEVBQ3RCO0FBdEJPLEVBQUFBLFFBQVM7QUFBQSxHQXRaRDs7O0FDdEdWLElBQU0sa0JBQWtCLENBQzdCLFFBQ0EsWUFJWTtBQUNaLFFBQU0sT0FBa0I7QUFDeEIsVUFBUSxRQUFRLENBQUMsV0FBVztBQUMxQixXQUFPLEtBQUssT0FBTyxTQUFTO0FBQzVCLFNBQUssT0FBTyxLQUFLLEdBQUcsSUFBSSxPQUFPLEtBQUs7QUFBQSxFQUN0QyxDQUFDO0FBQ0QsU0FBTztBQUNUO0FBV08sSUFBTSxXQUFXLENBQ3RCLE9BQ0EsUUFBaUIsSUFDakIsUUFBaUIsSUFDakIsUUFBaUIsT0FDUjtBQUNULE1BQUksVUFBVSxnQkFBZ0IsVUFBVSxRQUFRLElBQUksVUFBVSxRQUFRO0FBQ3BFLFlBQVEsSUFBSSxXQUFXLE9BQU8sT0FBTyxPQUFPLEtBQUs7QUFBQSxFQUNuRDtBQUNGO0FBUU8sSUFBTSxRQUFRLE9BQU8sUUFBaUM7QUFDM0QsU0FBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLFdBQVcsR0FBRyxNQUFNLEdBQUksQ0FBQztBQUNyRDtBQWtDTyxJQUFNLFlBQVksQ0FBQyxRQUEwQztBQUNsRSxTQUNFLENBQUMsQ0FBQyxRQUNELE9BQU8sUUFBUSxZQUFZLE9BQU8sUUFBUSxlQUMzQyxPQUFRLElBQVksU0FBUztBQUVqQztBQVlPLFNBQVMsSUFDZCxPQUNBLGNBQzhDO0FBQzlDLE1BQUk7QUFDRixVQUFNLElBQUksTUFBTTtBQUNoQixRQUFJLFVBQVUsQ0FBQyxHQUFHO0FBQ2hCLGFBQU8sRUFBRTtBQUFBLFFBQ1AsQ0FBQyxNQUFTLE9BQU8sR0FBRyxDQUFDO0FBQUEsUUFDckIsQ0FBQyxRQUFXLE9BQU8sSUFBSSxHQUFHO0FBQUEsTUFDNUI7QUFBQSxJQUNGLE9BQU87QUFDTCxhQUFPLE9BQU8sR0FBRyxDQUFDO0FBQUEsSUFDcEI7QUFBQSxFQUNGLFNBQVMsR0FBRztBQUNWLFFBQUksYUFBYSxPQUFPO0FBQ3RCLGFBQU8sT0FBTyxJQUFJLENBQUM7QUFBQSxJQUNyQjtBQUNBLFdBQU8sT0FBTyxJQUFJLE1BQU0sQ0FBVyxDQUFDO0FBQUEsRUFDdEMsVUFBRTtBQUNBLFFBQUksY0FBYztBQUNoQixlQUFTLG9CQUFvQixZQUFZO0FBQ3pDLG1CQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRjtBQVFPLElBQU0sNkJBQTZCLENBQ3hDLGVBQ3FCO0FBQ3JCLE1BQUksWUFBWTtBQUNkLFdBQU8sSUFBSSxLQUFLLGFBQWEsR0FBSTtBQUFBLEVBQ25DO0FBQ0E7QUFDRjs7O0FDbEpBLFNBQVMsV0FBQUMsVUFBUyxrQkFBa0IsYUFBQUMsa0JBQWlCOzs7QUNDckQsU0FBcUIsa0JBQWtCO0FBRWhDLElBQVU7QUFBQSxDQUFWLENBQVVDLFVBQVY7QUFDTCxRQUFNLFNBQVM7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLFlBQVksVUFBVTtBQUFBLElBQ3RCLGtCQUFrQixDQUFDO0FBQUEsRUFDckI7QUFFTyxFQUFNQSxNQUFBLGdCQUFnQixNQUFrQjtBQUM3QyxhQUFTLHNCQUFzQixNQUFNO0FBQ3JDO0FBQUEsTUFDRTtBQUFBLE1BQ0EsVUFBVTtBQUFBLElBQ1o7QUFFQSxRQUFJLE9BQU8saUJBQWlCLFNBQVMsR0FBRztBQUV0QyxhQUFPLGFBQWEsVUFBVSxjQUFjO0FBQUEsUUFDMUMsa0JBQWtCLE9BQU87QUFBQSxNQUMzQixDQUFDO0FBQUEsSUFDSCxXQUFXLFVBQVUsaUJBQWlCLFNBQVMsR0FBRztBQUVoRCxhQUFPLGFBQWEsVUFBVSxjQUFjO0FBQUEsUUFDMUMsa0JBQWtCLFVBQVU7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDSCxXQUFXLENBQUMsT0FBTyxZQUFZO0FBRTdCLGFBQU8sYUFBYSxVQUFVLGNBQWM7QUFBQSxRQUMxQyxTQUFTLFVBQVU7QUFBQSxNQUNyQixDQUFDO0FBQUEsSUFDSDtBQUVBLFFBQUksQ0FBQyxPQUFPLFlBQVk7QUFDdEIsYUFBTyxhQUFhLFVBQVU7QUFBQSxJQUNoQztBQUVBLGFBQVMscUJBQXFCLE1BQU07QUFFcEMsV0FBTyxJQUFJLFdBQVcsT0FBTyxZQUFZLE9BQU8sVUFBVTtBQUFBLEVBQzVEO0FBRU8sRUFBTUEsTUFBQSxtQkFBbUIsQ0FBQyxVQUlyQjtBQUVWLFdBQU8sYUFBYTtBQUNwQixXQUFPLG1CQUFtQixDQUFDO0FBQzNCLFdBQU8sYUFBYSxVQUFVO0FBRTlCLFVBQU0sRUFBRSxTQUFTLFlBQVksaUJBQWlCLElBQUk7QUFDbEQsUUFBSSxZQUFZO0FBQ2QsYUFBTyxhQUFhO0FBQ3BCLGVBQVMsOEJBQThCLE9BQU8sVUFBVTtBQUFBLElBQzFEO0FBRUEsUUFBSSxTQUFTO0FBQ1gsYUFBTyxhQUFhLFVBQVUsY0FBYyxFQUFFLFFBQWlCLENBQUM7QUFDaEUsZUFBUyw4QkFBOEIsT0FBTyxVQUFVO0FBQUEsSUFDMUQ7QUFFQSxRQUFJLGtCQUFrQjtBQUNwQixlQUFTLHdCQUF3QixnQkFBZ0I7QUFDakQsYUFBTyxhQUFhLFVBQVUsY0FBYyxFQUFFLGlCQUFpQixDQUFDO0FBQ2hFLGFBQU8sbUJBQW1CO0FBQzFCO0FBQUEsUUFDRTtBQUFBLFFBQ0EsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVPLEVBQU1BLE1BQUEsZUFBZSxPQUMxQixXQUNBLGFBQXlCLFVBQVUsZUFDaEM7QUFDSCxVQUFNLGFBQWFBLE1BQUssY0FBYztBQUN0QyxVQUFNLGtCQUFrQixNQUFNLFdBQVcsbUJBQW1CO0FBQzVELFdBQU8sTUFBTSxXQUNWO0FBQUEsTUFDQztBQUFBLFFBQ0UsV0FBVyxnQkFBZ0I7QUFBQSxRQUMzQixzQkFBc0IsZ0JBQWdCO0FBQUEsUUFDdEM7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLElBQ0YsRUFDQyxLQUFLLE9BQU8sRUFBRSxFQUNkLE1BQU0sT0FBTyxHQUFHO0FBQUEsRUFDckI7QUFBQSxHQXpGZTs7O0FDSGpCO0FBQUEsRUFHRSw2QkFBQUM7QUFBQSxFQUNBLGVBQUFDO0FBQUEsT0FHSzs7O0FDTkEsSUFBTSxjQUFjOzs7QUNEM0I7QUFBQSxFQUVFO0FBQUEsRUFDQTtBQUFBLE9BRUs7QUFPQSxJQUFNLGNBQU4sTUFBa0I7QUFBQSxFQUN2QixPQUFPLGNBQWMsT0FBTyxRQUFpRDtBQUMzRSxRQUFJLElBQUk7QUFDUixlQUFXLEtBQUssS0FBSztBQUNuQixVQUFJLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLFNBQVM7QUFDakMsY0FBTTtBQUFBLFVBQ0o7QUFBQSxxQkFDVyxDQUFDLGdCQUFnQixLQUFLLFVBQVUsQ0FBQyxDQUFDO0FBQUEsUUFDL0M7QUFBQSxNQUNGO0FBQ0E7QUFBQSxJQUNGO0FBRUEsVUFBTSxlQUFlLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZO0FBQ3RELFVBQU0sVUFBVSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTztBQUM1QyxVQUFNLFlBQVksSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLGFBQWEsTUFBUztBQUM1RCxRQUFJLFdBQVcsUUFBUSxDQUFDO0FBQ3hCLFFBQUksVUFBVSxTQUFTLEtBQUssVUFBVSxDQUFDLEVBQUUsVUFBVTtBQUNqRCxpQkFBVyxVQUFVLENBQUMsRUFBRTtBQUFBLElBQzFCO0FBRUEsVUFBTSxjQUFjLElBQUksWUFBWTtBQUNwQyxRQUFJLGVBQWU7QUFDbkIsUUFBSSxVQUFVO0FBQ1osa0JBQVksV0FBVyxTQUFTO0FBQ2hDLHFCQUFlLENBQUMsVUFBVSxHQUFHLE9BQU87QUFBQSxJQUN0QztBQUNBLGlCQUFhLElBQUksQ0FBQyxTQUFTLFlBQVksSUFBSSxJQUFJLENBQUM7QUFFaEQsVUFBTSxVQUEwQjtBQUFBLE1BQzlCLFlBQVk7QUFBQSxJQUNkO0FBRUEsV0FBTyxNQUFNO0FBQUEsTUFDWCxLQUFLLGNBQWM7QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQVdBLE1BQU0sVUFBVSxTQUFTLGlCQUFrQjtBQUN6QyxRQUFNLGVBQXlCLENBQUM7QUFHaEMsU0FBTyxJQUFJLFlBQVk7QUFDckIsUUFBSSxJQUFJO0FBQ1IsZUFBVyxPQUFPLE1BQU07QUFDdEIsVUFBSSxJQUFJLE9BQU87QUFDYixjQUFNLFlBQW9CLElBQUksTUFBTTtBQUNwQyxjQUFNLE1BQU0sd0NBQXdDLENBQUMsSUFBSSxTQUFTLEVBQUU7QUFBQSxNQUN0RSxXQUFXLElBQUksTUFBTTtBQUNuQixxQkFBYSxLQUFLLElBQUksS0FBZTtBQUFBLE1BQ3ZDLE9BQU87QUFDTCxxQkFBYSxLQUFLLEdBQWE7QUFBQSxNQUNqQztBQUNBO0FBQUEsSUFDRjtBQUNBLFdBQU8sWUFBWSxZQUFZLFlBQVk7QUFBQSxFQUM3QyxDQUFDO0FBQ0g7OztBRnBFTyxJQUFNQyxlQUFOLE1BQU0sYUFBWTtBQUFBLEVBQ3ZCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQSxZQUNFLGNBQ0EsU0FDQSxVQUNBLE1BQ0E7QUFDQSxTQUFLLGVBQWU7QUFDcEIsU0FBSyxVQUFVO0FBQ2YsU0FBSyxXQUFXO0FBQ2hCLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUVBLFNBQVMsWUFBMEQ7QUFDakUsV0FBTyxJQUFJLFlBQVk7QUFDckIsVUFBSSxFQUFFLGdCQUFnQixlQUFjO0FBQ2xDLGNBQU0sTUFBTSwyQ0FBMkM7QUFBQSxNQUN6RDtBQUNBLFlBQU0sY0FBYyxJQUFJQyxhQUFZO0FBRXBDLFlBQU0sZUFBZSxNQUFNLEtBQUssY0FBYyxFQUFFLG1CQUFtQjtBQUNuRSxrQkFBWSx1QkFBdUIsYUFBYTtBQUNoRCxrQkFBWSxrQkFBa0IsYUFBYTtBQUMzQyxVQUFJLGVBQWUsS0FBSztBQUV4QixVQUFJLEtBQUssVUFBVTtBQUNqQixvQkFBWSxXQUFXLEtBQUssU0FBUztBQUNyQyx1QkFBZSxDQUFDLEtBQUssVUFBVSxHQUFHLEtBQUssT0FBTztBQUFBLE1BQ2hEO0FBRUEsV0FBSyxhQUFhLFFBQVEsQ0FBQyxTQUFTLFlBQVksSUFBSSxJQUFJLENBQUM7QUFFekQsWUFBTSxVQUEwQjtBQUFBLFFBQzlCLFlBQVk7QUFBQSxNQUNkO0FBRUEsYUFBTyxNQUFNQztBQUFBLFFBQ1gsS0FBSyxjQUFjO0FBQUEsUUFDbkI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFXQSxNQUFNLFVBQVUsU0FBUyxpQkFBa0I7QUFDekMsUUFBTSxlQUE4QixDQUFDO0FBR3JDLFNBQU8sSUFBSSxZQUFZO0FBQ3JCLFFBQUksSUFBSTtBQUNSLGVBQVcsT0FBTyxNQUFNO0FBQ3RCLFVBQUksSUFBSSxPQUFPO0FBQ2IsY0FBTSxZQUFvQixJQUFJLE1BQU07QUFDcEMsY0FBTSxNQUFNLHdDQUF3QyxDQUFDLElBQUksU0FBUyxFQUFFO0FBQUEsTUFDdEUsV0FBVyxJQUFJLE1BQU07QUFDbkIscUJBQWEsS0FBSyxJQUFJLEtBQW9CO0FBQUEsTUFDNUMsT0FBTztBQUNMLHFCQUFhLEtBQUssR0FBa0I7QUFBQSxNQUN0QztBQUNBO0FBQUEsSUFDRjtBQUNBLFdBQU8sWUFBTSxZQUFZLFlBQVk7QUFBQSxFQUN2QyxDQUFDO0FBQ0g7OztBRzdGQTtBQUFBLEVBR0UsNkJBQUFDO0FBQUEsRUFDQSxlQUFBQztBQUFBLE9BR0s7OztBQ1BQO0FBQUEsRUFHRTtBQUFBLEVBQ0E7QUFBQSxFQUNBLDBCQUFBQztBQUFBLE9BQ0s7QUFFUCxTQUFTLE1BQU0sUUFBUSxVQUFVO0FBQ2pDLFNBQVMsd0JBQXdCO0FBRTFCLElBQVU7QUFBQSxDQUFWLENBQVVDLHlCQUFWO0FBRUwsUUFBTSxxQkFBcUIsQ0FBQyxhQUEwQjtBQUNwRCxXQUFPLEtBQUssSUFBSSxRQUFRO0FBQUEsRUFDMUI7QUFHTyxFQUFNQSxxQkFBQSxTQUFTLE9BZW5CO0FBQUEsSUFDRCxHQUFHLEdBQUc7QUFBQSxJQUNOLEdBQUcsR0FBRztBQUFBLElBQ04sR0FBRyxnQkFBZ0I7QUFBQSxJQUNuQixtQkFBbUIsU0FBUztBQUFBLElBQzVCLG1CQUFtQixTQUFTO0FBQUEsSUFDNUIsbUJBQW1CLFNBQVM7QUFBQSxJQUM1QixtQkFBbUIsU0FBUztBQUFBLElBQzVCLG1CQUFtQixTQUFTO0FBQUEsSUFDNUIsbUJBQW1CLFNBQVM7QUFBQSxJQUM1QixtQkFBbUIsU0FBUztBQUFBLElBQzVCLG1CQUFtQixTQUFTO0FBQUEsSUFDNUIsbUJBQW1CLFNBQVM7QUFBQSxJQUM1QixtQkFBbUIsVUFBVTtBQUFBLElBQzdCLG1CQUFtQixVQUFVO0FBQUEsRUFDL0IsQ0FBQztBQUVNLEVBQU1BLHFCQUFBLFVBQVUsQ0FDckIsWUFDQSxVQUNBLGtCQUMyQjtBQUMzQixXQUFPLGNBQWMsY0FBYztBQUFBLE1BQ2pDLFlBQVksU0FBUztBQUFBLE1BQ3JCLGtCQUFrQixXQUFXO0FBQUEsTUFDN0IsVUFBVTtBQUFBLE1BQ1YsT0FBT0EscUJBQUEsT0FBTztBQUFBLE1BQ2QsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLEVBQ0g7QUFFTyxFQUFNQSxxQkFBQSxXQUFXLENBQ3RCLEdBQ0EsVUFDQSxpQkFDMkI7QUFDM0IsVUFBTSxPQUFPO0FBQUEsTUFDWDtBQUFBLFFBQ0UsUUFBUSxTQUFTO0FBQUEsUUFDakIsVUFBVTtBQUFBLFFBQ1YsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsUUFDRSxRQUFRO0FBQUEsUUFDUixVQUFVO0FBQUEsUUFDVixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFDQSxpQkFBYTtBQUFBLE1BQVEsQ0FBQyxXQUNwQixLQUFLLEtBQUs7QUFBQSxRQUNSO0FBQUEsUUFDQSxVQUFVO0FBQUEsUUFDVixZQUFZO0FBQUEsTUFDZCxDQUFDO0FBQUEsSUFDSDtBQUVBLFVBQU0sYUFBYSxPQUEyQztBQUFBLE1BQzVELEdBQUcsYUFBYTtBQUFBLE1BQ2hCLEdBQUcsR0FBRztBQUFBLElBQ1IsQ0FBQztBQUVELFVBQU0sT0FBTyxPQUFPLE1BQU0sV0FBVyxJQUFJO0FBRXpDLGVBQVc7QUFBQSxNQUNUO0FBQUEsUUFDRSxhQUFhO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUVBLFdBQU8sSUFBSUQsd0JBQXVCO0FBQUEsTUFDaEM7QUFBQSxNQUNBLFdBQVc7QUFBQSxNQUNYO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEdBbEdlOzs7QUNYakI7QUFBQSxFQUVFLGVBQUFFO0FBQUEsT0FFSzs7O0FDR1A7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxvQkFBQUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7OztBQ2ZQLFNBQVMsV0FBQUMsVUFBUyxhQUFBQyxrQkFBaUI7QUFFbkMsT0FBTyxRQUFRO0FBRVIsSUFBTSxpQkFBTixNQUFNLGdCQUFlO0FBQUEsRUFDMUI7QUFBQSxFQUNBO0FBQUEsRUFFQSxZQUFZLFFBQTZDO0FBQ3ZELFFBQUksQ0FBQyxPQUFPLFFBQVE7QUFDbEIsWUFBTSxVQUFVLE9BQU8sT0FBTyxVQUFVO0FBQ3hDLFdBQUssU0FBUyxRQUFRLFVBQVUsU0FBUztBQUFBLElBQzNDLE9BQU87QUFDTCxXQUFLLFNBQVMsT0FBTztBQUFBLElBQ3ZCO0FBQ0EsU0FBSyxTQUFTLE9BQU87QUFBQSxFQUN2QjtBQUFBLEVBRUEsY0FBeUI7QUFDdkIsV0FBTyxJQUFJQSxXQUFVLEtBQUssTUFBTTtBQUFBLEVBQ2xDO0FBQUEsRUFFQSxZQUFxQjtBQUNuQixVQUFNLFVBQVUsR0FBRyxPQUFPLEtBQUssTUFBTTtBQUNyQyxXQUFPRCxTQUFRLGNBQWMsT0FBTztBQUFBLEVBQ3RDO0FBQUEsRUFFQSxPQUFPLFdBQVcsQ0FBQyxVQUNqQix1QkFBdUIsS0FBSyxLQUFLO0FBQUEsRUFFbkMsT0FBTyxXQUFXLENBQUMsVUFDakIsdUJBQXVCLEtBQUssS0FBSztBQUFBLEVBRW5DLE9BQU8sU0FBUyxNQUFzQjtBQUNwQyxVQUFNLFVBQVVBLFNBQVEsU0FBUztBQUNqQyxXQUFPLElBQUksZ0JBQWU7QUFBQSxNQUN4QixRQUFRLFFBQVEsVUFBVSxTQUFTO0FBQUEsTUFDbkMsUUFBUSxHQUFHLE9BQU8sUUFBUSxTQUFTO0FBQUEsSUFDckMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLE9BQU8sWUFBWSxDQUFDLFlBQXFDO0FBQ3ZELFdBQU8sSUFBSSxnQkFBZTtBQUFBLE1BQ3hCLFFBQVEsUUFBUSxVQUFVLFNBQVM7QUFBQSxNQUNuQyxRQUFRLEdBQUcsT0FBTyxRQUFRLFNBQVM7QUFBQSxJQUNyQyxDQUFDO0FBQUEsRUFDSDtBQUNGOzs7QURsQk8sSUFBVTtBQUFBLENBQVYsQ0FBVUUsdUJBQVY7QUFDTCxRQUFNLG1CQUFtQjtBQUN6QixRQUFNLG1CQUFtQjtBQUN6QixRQUFNLE1BQU0sT0FDVixNQUNBLE9BQ0EsVUFDQSxxQkFBcUIsVUFDYTtBQUNsQyxVQUFNLE1BQU0sVUFBTUEsbUJBQUE7QUFBQSxNQUNoQjtBQUFBLE1BQ0E7QUFBQSxNQUNBLElBQUksZUFBZSxFQUFFLFFBQVEsU0FBUyxDQUFDLEVBQUU7QUFBQSxNQUN6QztBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsSUFBSSxNQUFNO0FBQ2IsYUFBTyxJQUFJO0FBQUEsSUFDYjtBQUVBLFdBQU8sSUFBSUM7QUFBQSxNQUNULENBQUMsSUFBSSxJQUFJO0FBQUEsTUFDVCxDQUFDO0FBQUEsTUFDRCxTQUFTLFVBQVU7QUFBQSxNQUNuQixJQUFJO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFVTyxFQUFNRCxtQkFBQSxtQkFBbUIsT0FDOUIsTUFDQSxPQUNBLGFBQ29CO0FBQ3BCLFFBQUksVUFBVTtBQUNkLFdBQU8sVUFBVSxrQkFBa0I7QUFDakMsVUFBSTtBQUNGLGNBQU0sT0FBTyxNQUFNLElBQUksTUFBTSxPQUFPLFVBQVUsSUFBSTtBQUVsRCxZQUFJLFFBQVEsT0FBTyxTQUFTLFVBQVU7QUFDcEMsbUJBQVMsOEJBQThCLElBQUk7QUFDM0MsaUJBQU87QUFBQSxRQUNULFdBQVcsZ0JBQWdCQyxjQUFhO0FBQ3RDLFdBQUMsTUFBTSxLQUFLLE9BQU8sR0FBRztBQUFBLFlBQ3BCLE9BQU8sT0FBTztBQUNaLG9CQUFNLEtBQUssYUFBYSxFQUFFO0FBQzFCLHFCQUFPLEtBQUs7QUFBQSxZQUNkO0FBQUEsWUFDQSxDQUFDLFFBQVE7QUFDUCx1QkFBUyxxQ0FBcUMsR0FBRztBQUNqRCxvQkFBTTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsU0FBUyxHQUFHO0FBQ1YsaUJBQVMsWUFBWSxPQUFPLDJCQUEyQixDQUFDO0FBQ3hELGlCQUFTLFdBQVcsSUFBSSxZQUFZLEtBQUssZUFBZSxRQUFRLEVBQUU7QUFBQSxNQUNwRTtBQUNBLFlBQU0sTUFBTSxnQkFBZ0I7QUFDNUI7QUFBQSxJQUNGO0FBQ0EsVUFBTSxNQUFNLDhCQUE4QixnQkFBZ0IsRUFBRTtBQUFBLEVBQzlEO0FBV08sRUFBTUQsbUJBQUEsMEJBQTBCLE9BQ3JDLE1BQ0EsT0FDQSxVQUNBLHFCQUFxQixVQUlqQjtBQUNKLFVBQU0seUJBQXlCO0FBQUEsTUFDN0IsS0FBSyxZQUFZO0FBQUEsTUFDakIsTUFBTSxZQUFZO0FBQUEsTUFDbEI7QUFBQSxNQUNBRTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBRUEsYUFBUyw4QkFBOEIsdUJBQXVCLFNBQVMsQ0FBQztBQUV4RSxRQUFJO0FBRUYsWUFBTTtBQUFBLFFBQ0osS0FBSyxjQUFjO0FBQUEsUUFDbkI7QUFBQSxRQUNBLEtBQUssY0FBYyxFQUFFO0FBQUEsUUFDckJBO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxRQUNMLGNBQWMsdUJBQXVCLFNBQVM7QUFBQSxRQUM5QyxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0YsU0FBUyxPQUFnQjtBQUN2QixVQUNFLEVBQUUsaUJBQWlCLDhCQUNuQixFQUFFLGlCQUFpQixnQ0FDbkI7QUFDQSxjQUFNLE1BQU0sa0JBQWtCO0FBQUEsTUFDaEM7QUFFQSxZQUFNLFFBQVEsQ0FBQyxXQUFXLFFBQVE7QUFFbEMsWUFBTSxPQUFPO0FBQUEsUUFDWCxNQUFNLFlBQVk7QUFBQSxRQUNsQjtBQUFBLFFBQ0EsTUFBTSxZQUFZO0FBQUEsUUFDbEIsS0FBSyxZQUFZO0FBQUEsUUFDakJBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFFQSxhQUFPO0FBQUEsUUFDTCxjQUFjLHVCQUF1QixTQUFTO0FBQUEsUUFDOUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxHQXZJZTs7O0FFN0JqQixTQUFTLGFBQUFDLGtCQUFpQjtBQUMxQixTQUFTLGtCQUFrQjtBQUdwQixJQUFVO0FBQUEsQ0FBVixDQUFVQyxTQUFWO0FBQ0UsRUFBTUEsS0FBQSxjQUFjLENBQUMsU0FBNEI7QUFDdEQsVUFBTSxDQUFDLFNBQVMsSUFBSUQsV0FBVTtBQUFBLE1BQzVCO0FBQUEsUUFDRSxPQUFPLEtBQUssVUFBVTtBQUFBLFFBQ3RCLFdBQVcsU0FBUztBQUFBLFFBQ3BCLEtBQUssWUFBWSxFQUFFLFNBQVM7QUFBQSxNQUM5QjtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFTyxFQUFNQyxLQUFBLG1CQUFtQixDQUFDLFNBQTRCO0FBQzNELFVBQU0sQ0FBQyxTQUFTLElBQUlELFdBQVU7QUFBQSxNQUM1QjtBQUFBLFFBQ0UsT0FBTyxLQUFLLFVBQVU7QUFBQSxRQUN0QixXQUFXLFNBQVM7QUFBQSxRQUNwQixLQUFLLFlBQVksRUFBRSxTQUFTO0FBQUEsUUFDNUIsT0FBTyxLQUFLLFNBQVM7QUFBQSxNQUN2QjtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFBQSxHQXhCZTs7O0FWQWpCLFNBQVMsaUJBQWlCO0FBRTFCLE9BQU9FLFNBQVE7QUFRZixPQUFPLFVBQVUsZ0JBQWdCLFNBQy9CLG9DQUNBO0FBQ0EsUUFBTSxjQUFjLEtBQUssY0FBYyxFQUFFO0FBQ3pDLFdBQVMsZ0NBQWdDLFdBQVc7QUFDcEQsTUFBSSxVQUFVO0FBQ2QsTUFBSSxnQkFBZ0IsVUFBVSxZQUFZLEtBQUs7QUFDN0MsY0FBVSxVQUFVLFFBQVE7QUFBQSxFQUM5QixXQUFXLGdCQUFnQixVQUFVLFlBQVksTUFBTTtBQUNyRCxjQUFVLFVBQVUsUUFBUTtBQUFBLEVBQzlCLFdBQVcsZ0JBQWdCLFVBQVUsWUFBWSxLQUFLO0FBQ3BELGNBQVUsVUFBVSxRQUFRO0FBQUEsRUFDOUIsT0FBTztBQUNMLGNBQVUsVUFBVSxRQUFRO0FBQUEsRUFDOUI7QUFFQSxRQUFNLHFCQUE2QixLQUFLLFNBQVM7QUFDakQsTUFBSSxNQUFNO0FBQ1YsTUFBSSxlQUFlLFNBQVMsa0JBQWtCLEdBQUc7QUFFL0MsUUFBSSx3Q0FBZ0M7QUFDbEMsWUFBTSw2QkFBNkIsa0JBQWtCLFlBQVksT0FBTztBQUFBLElBQzFFLE9BQU87QUFDTCxZQUFNLDhCQUE4QixrQkFBa0IsWUFBWSxPQUFPO0FBQUEsSUFDM0U7QUFBQSxFQUVGLE9BQU87QUFFTCxRQUFJLHdDQUFnQztBQUNsQyxZQUFNLHdCQUNKLGtCQUNGLFlBQVksT0FBTztBQUFBLElBQ3JCLE9BQU87QUFDTCxZQUFNLHlCQUNKLGtCQUNGLFlBQVksT0FBTztBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQVFBLE9BQU8sVUFBVSxjQUFjLFdBQVk7QUFDekMsTUFBSSxDQUFDLGVBQWUsU0FBUyxLQUFLLFNBQVMsQ0FBQyxHQUFHO0FBQzdDLFVBQU0sTUFBTSw0QkFBNEIsS0FBSyxTQUFTLENBQUMsRUFBRTtBQUFBLEVBQzNEO0FBQ0EsU0FBTyxJQUFJQyxXQUFVLEtBQUssU0FBUyxDQUFDO0FBQ3RDO0FBUUEsT0FBTyxVQUFVLFlBQVksV0FBWTtBQUN2QyxNQUFJLENBQUMsZUFBZSxTQUFTLEtBQUssU0FBUyxDQUFDLEdBQUc7QUFDN0MsVUFBTSxNQUFNLDRCQUE0QixLQUFLLFNBQVMsQ0FBQyxFQUFFO0FBQUEsRUFDM0Q7QUFDQSxRQUFNLFVBQVVELElBQUcsT0FBTyxLQUFLLFNBQVMsQ0FBQztBQUN6QyxTQUFPRSxTQUFRLGNBQWMsT0FBTztBQUN0QztBQVFBLE9BQU8sVUFBVSxRQUFRLFdBQVk7QUFDbkMsU0FBTyxVQUFVLElBQWMsRUFDNUIsSUFBSSxnQkFBZ0IsRUFDcEIsU0FBUztBQUNkO0FBUUEsT0FBTyxVQUFVLGFBQWEsV0FBWTtBQUN4QyxTQUFPLFVBQVUsSUFBYyxFQUM1QixNQUFNLGdCQUFnQixFQUN0QixTQUFTO0FBQ2Q7OztBV2xHTyxJQUFVQztBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsVUFBVjtBQUNFLElBQU1BLE1BQUEsZUFBZSxDQUMxQixRQUNBLE1BQ0EsZ0JBQ0Esd0JBQ3dCO0FBQ3hCLFlBQU0sVUFBbUIsQ0FBQztBQUcxQixVQUFJLGtCQUFrQixlQUFlLFlBQVksSUFBSTtBQUNuRCxZQUFJLHVCQUF1QixlQUFlLFlBQVksYUFBYTtBQUNqRSxnQkFBTSxjQUFjLG9CQUFvQjtBQUFBLFlBQ3RDLENBQUMsTUFBTSxFQUFFLFlBQVksZUFBZSxPQUFPLEtBQUs7QUFBQSxVQUNsRDtBQUNBLGdCQUFNLFlBQVksb0JBQW9CO0FBQUEsWUFDcEMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxlQUFlLE9BQU8sS0FBSztBQUFBLFVBQ2xEO0FBRUEsa0JBQVEsT0FBTyxlQUFlLE9BQU8sS0FBSztBQUMxQywwQkFBZ0IsUUFBUSxTQUFTLFlBQVk7QUFDN0Msd0JBQWMsUUFBUSxjQUFjLFVBQVU7QUFBQSxRQUNoRCxPQUFPO0FBQ0wsa0JBQVEsU0FBUyxlQUFlLE9BQU8sS0FBSztBQUM1QyxrQkFBUSxjQUFjLGVBQWUsT0FBTyxLQUFLO0FBQUEsUUFDbkQ7QUFBQSxNQUNGO0FBRUEsY0FBUSxPQUFPLE9BQU87QUFDdEIsY0FBUSxPQUFPLE9BQU87QUFDdEIsY0FBUSxXQUFXLDJCQUEyQixLQUFLLFNBQW1CO0FBQ3RFLGNBQVEsTUFBTSxLQUFLLFlBQVksV0FBVyxDQUFDO0FBQzNDLGNBQVEsbUJBQW1CO0FBRTNCLFVBQ0UsS0FBSyxNQUFNLHFCQUNYLEtBQUssTUFBTSxrQkFBa0IsV0FBVyxHQUN4QztBQUVBLGdCQUFRLG1CQUFtQjtBQUFBLE1BQzdCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxLQTFDZSxPQUFBRCxZQUFBLFNBQUFBLFlBQUE7QUFBQSxHQURGQSw0QkFBQTs7O0FDRFYsSUFBVUU7QUFBQSxDQUFWLENBQVVBLGdCQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLFVBQVY7QUFDRSxJQUFNQSxNQUFBLGVBQWUsQ0FDMUIsUUFDQSxTQUN3QjtBQUN4QixZQUFNLFVBQW1CLENBQUM7QUFFMUIsY0FBUSxPQUFPLE9BQU8sT0FBTyxLQUFLO0FBQ2xDLGNBQVEsZ0JBQWdCLE9BQU8sT0FBTyxLQUFLO0FBQzNDLGNBQVEsY0FBYyxPQUFPLE9BQU8sS0FBSztBQUN6QyxjQUFRLFVBQVUsT0FBTyxPQUFPLEtBQUs7QUFDckMsY0FBUSxPQUFPLE9BQU87QUFDdEIsY0FBUSxXQUFXLDJCQUEyQixLQUFLLFNBQW1CO0FBQ3RFLGNBQVEsTUFBTSxLQUFLLFlBQVksV0FBVyxDQUFDO0FBQzNDLGNBQVEsbUJBQW1CO0FBQzNCLFVBQ0UsS0FBSyxNQUFNLHFCQUNYLEtBQUssTUFBTSxrQkFBa0IsV0FBVyxHQUN4QztBQUVBLGdCQUFRLG1CQUFtQjtBQUFBLE1BQzdCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxLQXZCZSxPQUFBRCxZQUFBLFNBQUFBLFlBQUE7QUFBQSxHQURGQSw0QkFBQTs7O0FDSFYsSUFBVUU7QUFBQSxDQUFWLENBQVVBLGdCQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLFVBQVY7QUFDRSxJQUFNQSxNQUFBLGVBQWUsQ0FDMUIsV0FDb0M7QUFDcEMsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsS0FSZSxPQUFBRCxZQUFBLFNBQUFBLFlBQUE7QUFBQSxHQURGQSw0QkFBQTs7O0FDUVYsSUFBVUU7QUFBQSxDQUFWLENBQVVBLGdCQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLG1CQUFWO0FBQ0UsSUFBTUEsZUFBQSxnQkFBZ0IsQ0FDM0IsT0FDQSxLQUNBLHlCQUNrQztBQUNsQyxhQUFPO0FBQUEsUUFDTCxNQUFNLE1BQU07QUFBQSxRQUNaLFFBQVEsTUFBTTtBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsUUFDQSxVQUFVRCxXQUFVLFNBQVMsY0FBYyxNQUFNLFFBQVE7QUFBQSxRQUN6RCxZQUFZO0FBQUEsUUFDWixNQUFNLE1BQU0sUUFBUTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUVPLElBQU1DLGVBQUEsZUFBZSxDQUMxQixRQUNBLGdCQUNpQztBQUNqQyxhQUFPO0FBQUEsUUFDTCxNQUFNLE9BQU8sUUFBUSxLQUFLLFNBQVM7QUFBQSxRQUNuQyxTQUFTLE9BQU8sUUFBUSxLQUFLO0FBQUEsUUFDN0IsVUFBTUEsZUFBQSxtQkFBa0IsT0FBTyxRQUFRLEtBQUssSUFBSTtBQUFBLFFBQ2hELFlBQVFBLGVBQUEsbUJBQWtCLE9BQU8sUUFBUSxLQUFLLE1BQU07QUFBQSxRQUNwRDtBQUFBLFFBQ0EsU0FBS0EsZUFBQSxtQkFBa0IsT0FBTyxRQUFRLEtBQUssR0FBRztBQUFBLFFBQzlDLFVBQVVELFdBQVUsU0FBUyxhQUFhLE9BQU8sUUFBUSxLQUFLLFFBQVE7QUFBQSxRQUN0RSxNQUFNQSxXQUFNLEtBQUssYUFBYSxPQUFPLFFBQVEsSUFBSTtBQUFBLFFBQ2pELFVBQVUsMkJBQTJCLE9BQU8sU0FBUyxVQUFVO0FBQUEsUUFDL0QsVUFBVSxPQUFPO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRU8sSUFBTUMsZUFBQSxvQkFBb0IsQ0FBQyxRQUF3QjtBQUN4RCxhQUFPLElBQUksUUFBUSxPQUFPLEVBQUU7QUFBQSxJQUM5QjtBQUFBLEtBckNlLGdCQUFBRCxZQUFBLGtCQUFBQSxZQUFBO0FBQUEsR0FERkEsNEJBQUE7OztBQ0dWLElBQVVFO0FBQUEsQ0FBVixDQUFVQSxnQkFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxpQkFBVjtBQUNFLElBQU1BLGFBQUEsZ0JBQWdCLENBQzNCLE9BQ0EsS0FDQSx5QkFDa0M7QUFDbEMsYUFBTztBQUFBLFFBQ0wsTUFBTSxNQUFNO0FBQUEsUUFDWixRQUFRLE1BQU07QUFBQSxRQUNkO0FBQUEsUUFDQTtBQUFBLFFBQ0EsVUFBVUQsV0FBVSxTQUFTLGNBQWMsTUFBTSxRQUFRO0FBQUEsUUFDekQsWUFBWSxVQUFZLFdBQVcsY0FBYyxNQUFNLFVBQVU7QUFBQSxRQUNqRSxNQUFNLE1BQU0sUUFBUTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUVPLElBQU1DLGFBQUEsZUFBZSxDQUMxQixRQUNBLGdCQUMrQjtBQUMvQixhQUFPO0FBQUEsUUFDTCxNQUFNLE9BQU8sUUFBUSxLQUFLLFNBQVM7QUFBQSxRQUNuQyxpQkFBaUIsT0FBTyxRQUFRLGdCQUFnQixTQUFTO0FBQUEsUUFDekQsU0FBUyxPQUFPLFFBQVEsS0FBSztBQUFBLFFBQzdCLE1BQU1ELFdBQU8sY0FBYyxrQkFBa0IsT0FBTyxRQUFRLEtBQUssSUFBSTtBQUFBLFFBQ3JFLFFBQVFBLFdBQU8sY0FBYztBQUFBLFVBQzNCLE9BQU8sUUFBUSxLQUFLO0FBQUEsUUFDdEI7QUFBQSxRQUNBO0FBQUEsUUFDQSxLQUFLQSxXQUFPLGNBQWMsa0JBQWtCLE9BQU8sUUFBUSxLQUFLLEdBQUc7QUFBQSxRQUNuRSxXQUFXLE9BQU8sUUFBUTtBQUFBLFFBQzFCLHFCQUFxQixPQUFPLFFBQVE7QUFBQSxRQUNwQyxVQUFVQSxXQUFVLFNBQVMsYUFBYSxPQUFPLFFBQVEsS0FBSyxRQUFRO0FBQUEsUUFDdEUsY0FBYyxPQUFPLFFBQVE7QUFBQSxRQUM3QixZQUFZLFVBQVksV0FBVztBQUFBLFVBQ2pDLE9BQU8sUUFBUTtBQUFBLFFBQ2pCO0FBQUEsUUFDQSxNQUFNQSxXQUFNLEtBQUssYUFBYSxPQUFPLFFBQVEsSUFBSTtBQUFBLFFBQ2pELFVBQVUsMkJBQTJCLE9BQU8sU0FBUyxVQUFVO0FBQUEsUUFDL0QsVUFBVSxPQUFPO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsS0ExQ2UsY0FBQUEsWUFBQSxnQkFBQUEsWUFBQTtBQUFBLEdBREZBLDRCQUFBOzs7QUNSVixJQUFVRTtBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsZ0JBQVY7QUFDRSxJQUFNQSxZQUFBLGdCQUFnQixPQUMzQixPQUNBLGNBS0EsYUFDQSxhQUN1QztBQUN2QyxVQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sT0FBTztBQUMxQixlQUFPLENBQUM7QUFBQSxNQUNWO0FBRUEsWUFBTSxRQUFRLE1BQU0sUUFBUTtBQUFBLFFBQzFCLE1BQU0sTUFBTSxJQUFJLE9BQU8sU0FBUztBQUM5QixjQUFJLENBQUMsS0FBSyxVQUFVO0FBQ2xCLG1CQUFPLENBQUM7QUFBQSxVQUNWO0FBQ0EsZ0JBQU0sTUFBTSxNQUFNLGFBQWEsS0FBSyxVQUFVLGFBQWEsUUFBUTtBQUNuRSxjQUFJLElBQUksT0FBTztBQUNiLGtCQUFNLE1BQU0sSUFBSSxNQUFNLE9BQU87QUFBQSxVQUMvQjtBQUNBLGlCQUFPLGdCQUFnQixNQUFNO0FBQUEsWUFDM0I7QUFBQSxjQUNFLFdBQVc7QUFBQSxjQUNYLE1BQU0sRUFBRSxLQUFLLE9BQU8sT0FBTyxJQUFJLE1BQU07QUFBQSxZQUN2QztBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0gsQ0FBQztBQUFBLE1BQ0g7QUFDQSxhQUFPLEVBQUUsR0FBRyxPQUFPLE1BQU07QUFBQSxJQUMzQjtBQUFBLEtBakNlLGFBQUFELFlBQUEsZUFBQUEsWUFBQTtBQUFBLEdBREZBLDRCQUFBOzs7QUNMVixJQUFVRTtBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsYUFBVjtBQUNFLElBQU1BLFNBQUEsWUFBWTtBQUNsQixJQUFNQSxTQUFBLGdCQUFnQixDQUFDLGVBQXVCO0FBQ25ELGFBQU8sYUFBYUEsU0FBQTtBQUFBLElBQ3RCO0FBQUEsS0FKZSxVQUFBRCxZQUFBLFlBQUFBLFlBQUE7QUFBQSxHQURGQSw0QkFBQTs7O0FDTVYsSUFBVUU7QUFBQSxDQUFWLENBQVVBLGdCQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLHFCQUFWO0FBQ0UsSUFBTUEsaUJBQUEsZUFBZSxDQUMxQixRQUNBLE1BQ0Esd0JBQ3dCO0FBQ3hCLFlBQU0sVUFBbUIsQ0FBQztBQUUxQixVQUFJLHFCQUFxQjtBQUN2QixjQUFNLGNBQWMsb0JBQW9CO0FBQUEsVUFDdEMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxPQUFPLE9BQU8sS0FBSztBQUFBLFFBQzFDO0FBQ0EsY0FBTSxZQUFZLG9CQUFvQjtBQUFBLFVBQ3BDLENBQUMsTUFBTSxFQUFFLFlBQVksT0FBTyxPQUFPLEtBQUs7QUFBQSxRQUMxQztBQUNBLHdCQUFnQixRQUFRLFNBQVMsWUFBWTtBQUM3QyxzQkFBYyxRQUFRLGNBQWMsVUFBVTtBQUFBLE1BQ2hEO0FBRUEsY0FBUSxjQUFjLE9BQU8sT0FBTyxLQUFLO0FBQ3pDLGNBQVEsT0FBTyxPQUFPLE9BQU8sS0FBSztBQUNsQyxjQUFRLG9CQUFvQixPQUFPLE9BQU8sS0FBSztBQUMvQyxjQUFRLFVBQVUsT0FBTyxPQUFPLEtBQUs7QUFDckMsY0FBUSxPQUFPLE9BQU87QUFDdEIsY0FBUSxXQUFXLDJCQUEyQixLQUFLLFNBQW1CO0FBQ3RFLGNBQVEsTUFBTSxLQUFLLFlBQVksV0FBVyxDQUFDO0FBQzNDLGNBQVEsbUJBQW1CO0FBRzNCLFVBQ0UsS0FBSyxNQUFNLHFCQUNYLEtBQUssTUFBTSxrQkFBa0IsV0FBVyxHQUN4QztBQUNBLGdCQUFRLG1CQUFtQjtBQUFBLE1BQzdCO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxLQXJDZSxrQkFBQUQsWUFBQSxvQkFBQUEsWUFBQTtBQUFBLEdBREZBLDhCQUFBOzs7QUNEVixJQUFVRTtBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsY0FBVjtBQUNFLElBQU1BLFVBQUEsZUFBZSxDQUMxQixRQUNBLFNBQ3dCO0FBQ3hCLFlBQU0sVUFBbUIsQ0FBQztBQUcxQixVQUFJLENBQUMsT0FBTyxPQUFPLEtBQUssZUFBZSxDQUFDLE9BQU8sT0FBTyxLQUFLLFVBQVU7QUFDbkU7QUFBQSxNQUNGO0FBRUEsY0FBUSxTQUFTLE9BQU8sT0FBTyxLQUFLO0FBQ3BDLGNBQVEsY0FBYyxPQUFPLE9BQU8sS0FBSztBQUN6QyxjQUFRLE1BQU0sT0FBTyxPQUFPLEtBQUssVUFBVSxNQUFNLEVBQUUsU0FBUztBQUM1RCxjQUFRLE9BQU8sT0FBTztBQUN0QixjQUFRLFdBQVcsMkJBQTJCLEtBQUssU0FBbUI7QUFDdEUsY0FBUSxNQUFNLEtBQUssWUFBWSxXQUFXLENBQUM7QUFDM0MsY0FBUSxtQkFBbUI7QUFHM0IsVUFDRSxLQUFLLE1BQU0scUJBQ1gsS0FBSyxNQUFNLGtCQUFrQixXQUFXLEdBQ3hDO0FBQ0EsZ0JBQVEsbUJBQW1CO0FBQUEsTUFDN0I7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEtBN0JlLFdBQUFELFlBQUEsYUFBQUEsWUFBQTtBQUFBLEdBREZBLDhCQUFBOzs7QUNPVixJQUFNRSxjQUFZO0FBQUEsRUFDdkIsR0FBRztBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFDTDsiLAogICJuYW1lcyI6IFsiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnN0YW50cyIsICJDbHVzdGVyIiwgIkVuZFBvaW50VXJsIiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAiUmVzdWx0IiwgIktleXBhaXIiLCAiUHVibGljS2V5IiwgIk5vZGUiLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJJbnN0cnVjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiIsICJNdWx0aXNpZ0luc3RydWN0aW9uIiwgIlRyYW5zYWN0aW9uIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiS2V5cGFpciIsICJQdWJsaWNLZXkiLCAiQXNzb2NpYXRlZEFjY291bnQiLCAiSW5zdHJ1Y3Rpb24iLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJQdWJsaWNLZXkiLCAiUGRhIiwgImJzIiwgIlB1YmxpY0tleSIsICJLZXlwYWlyIiwgIkNvbnZlcnRlciIsICJNZW1vIiwgIkNvbnZlcnRlciIsICJNaW50IiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJOZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUHJvcGVydGllcyIsICJDb252ZXJ0ZXIiLCAiUm95YWx0eSIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXJDaGVja2VkIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlciIsICJDb252ZXJ0ZXIiXQp9Cg==