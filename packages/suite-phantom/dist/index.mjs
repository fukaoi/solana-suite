// ../transaction-builder/src/batch.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction2,
  Transaction as Transaction2
} from "@solana/web3.js";

// ../shared/src/constants.ts
import { PublicKey } from "@solana/web3.js";
import SolanaJsonConfig from "@solana-suite/config/load";
var Config = SolanaJsonConfig;
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
    WarnningMessage2.ANOUNCE = `
        [DEPRECATED]
        --------------------------------------
        Account, Node, toExplorer, Pubkey, Secret have been moved to 
        @solana-suite/utils 
        ------------------------------------- 
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
console.log(Constants.WarnningMessage.ANOUNCE);

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
    return new TransactionBuilder.Batch().submit(instructions);
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
((Result27) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result27.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result27.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result27.ok(resArr);
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
    return Result27.ok(res);
  }
  Result27.all = all;
})(Result || (Result = {}));

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
import { Keypair as Original, PublicKey as PublicKey2 } from "@solana/web3.js";
import bs from "bs58";
var Account;
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
      return new PublicKey2(this.pubkey);
    }
    toKeypair() {
      const decoded = bs.decode(this.secret);
      return Original.fromSecretKey(decoded);
    }
    static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
    static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
    static create = () => {
      const keypair = Original.generate();
      return new Keypair5({
        pubkey: keypair.publicKey.toString(),
        secret: bs.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair5({
        pubkey: keypair.publicKey.toString(),
        secret: bs.encode(keypair.secretKey)
      });
    };
  }
  Account5.Keypair = Keypair5;
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
      return new TransactionBuilder.Common(
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
          } else if (inst instanceof TransactionBuilder.Common) {
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
})(Account2 || (Account2 = {}));

// ../account/src/pda.ts
import { PublicKey as PublicKey3 } from "@solana/web3.js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { MPL_BUBBLEGUM_PROGRAM_ID } from "@metaplex-foundation/mpl-bubblegum";
import BN from "bn.js";
var Account3;
((Account5) => {
  let Pda;
  ((Pda2) => {
    Pda2.getMetadata = (address) => {
      const [publicKey] = PublicKey3.findProgramAddressSync(
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
      const [publicKey] = PublicKey3.findProgramAddressSync(
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
      const [publicKey] = PublicKey3.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = PublicKey3.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getAssetId = (address, leafIndex) => {
      const node = new BN.BN(leafIndex);
      const [assetId] = PublicKey3.findProgramAddressSync(
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
})(Account3 || (Account3 = {}));

// ../account/src/index.ts
var Account4 = {
  ...Account2,
  ...Account,
  ...Account3
};

// ../global/src/index.ts
import { Keypair, LAMPORTS_PER_SOL, PublicKey as PublicKey4 } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import bs2 from "bs58";
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
  return new PublicKey4(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account4.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs2.decode(this.toString());
  return Keypair.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return BigNumber(this).div(LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return BigNumber(this).times(LAMPORTS_PER_SOL).toNumber();
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

// ../converter/src/compressed-nft-metadata.ts
import {
  TokenProgramVersion,
  TokenStandard
} from "mpl-bubblegum-instruction";
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
        tokenStandard: TokenStandard.NonFungible,
        tokenProgramVersion: TokenProgramVersion.Original
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

// ../transaction-builder/src/common.ts
import {
  sendAndConfirmTransaction,
  Transaction
} from "@solana/web3.js";
var MAX_RETRIES = 3;
var TransactionBuilder2;
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
        const transaction = new Transaction();
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
        return await sendAndConfirmTransaction(
          Node.getConnection(),
          transaction,
          finalSigners,
          options
        );
      });
    };
  }
  TransactionBuilder7.Common = Common2;
})(TransactionBuilder2 || (TransactionBuilder2 = {}));

// ../transaction-builder/src/batch.ts
var TransactionBuilder3;
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
        const transaction = new Transaction2();
        let finalSigners = signers;
        if (feePayer) {
          transaction.feePayer = feePayer.publicKey;
          finalSigners = [feePayer, ...signers];
        }
        instructions.map((inst) => transaction.add(inst));
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
  }
  TransactionBuilder7.Batch = Batch;
})(TransactionBuilder3 || (TransactionBuilder3 = {}));

// ../transaction-builder/src/mint.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction3,
  Transaction as Transaction3
} from "@solana/web3.js";
var TransactionBuilder4;
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
  }
  TransactionBuilder7.Mint = Mint;
})(TransactionBuilder4 || (TransactionBuilder4 = {}));

// ../transaction-builder/src/partial-sign.ts
import {
  Transaction as Transaction4
} from "@solana/web3.js";
var TransactionBuilder5;
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
  }
  TransactionBuilder7.PartialSign = PartialSign;
})(TransactionBuilder5 || (TransactionBuilder5 = {}));

// ../transaction-builder/src/calculate-txsize.ts
var TransactionBuilder6;
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
})(TransactionBuilder6 || (TransactionBuilder6 = {}));

// ../transaction-builder/src/index.ts
var TransactionBuilder = {
  ...TransactionBuilder3,
  ...TransactionBuilder6,
  ...TransactionBuilder4,
  ...TransactionBuilder2,
  ...TransactionBuilder5
};

// src/regular-nft/mint.ts
import { Transaction as Transaction7 } from "@solana/web3.js";

// ../suite-spl-token/src/add.ts
import { createMintToCheckedInstruction } from "@solana/spl-token";

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
      const inst = createMintToCheckedInstruction(
        token.toPublicKey(),
        tokenAssociated.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        keypairs
      );
      return new TransactionBuilder.Common(
        [inst],
        keypairs,
        payer.toKeypair(),
        token
      );
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
  SplToken11.burn = (mint, owner, ownerOrMultisig, burnAmount, tokenDecimals, options = {}) => {
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync2(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const inst = createBurnCheckedInstruction(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs
      );
      return new TransactionBuilder.Common([inst], keypairs, payer.toKeypair());
    });
  };
})(SplToken3 || (SplToken3 = {}));

// ../suite-spl-token/src/find.ts
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID2 } from "@solana/spl-token";
import fetch2 from "cross-fetch";
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
      const response = await fetch2(url.replace("ipfs.io", NFTSTORAGE_GATEWAY));
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
          programId: TOKEN_PROGRAM_ID2
        }
      );
      const datas = info.value.map(async (d) => {
        const mint = d.account.data.parsed.info.mint;
        const tokenAmount = d.account.data.parsed.info.tokenAmount.amount;
        if (tokenAmount === "1") {
          return;
        }
        return Metadata.fromAccountAddress(
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
      const metadata = await Metadata.fromAccountAddress(
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
      const response = await (await fetch2(metadata.data.uri)).json();
      return converter(metadata, response, tokenAmount);
    });
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
        new Account4.Keypair({ secret: freezeAuthority }).toPublicKey()
      );
      return new TransactionBuilder.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// ../suite-spl-token/src/gas-less-transfer.ts
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { Transaction as Transaction5 } from "@solana/web3.js";
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
          ownerPublicKey,
          SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          [owner.toKeypair()]
        );
        tx.add(inst2);
      } else {
        inst2 = createTransferCheckedInstruction(
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
      return new TransactionBuilder.PartialSign(hex);
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
    const metadataPda = Account4.Pda.getMetadata(mint2.toString());
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
      return new TransactionBuilder.Mint(
        insts,
        [owner.toKeypair(), mint2.toKeypair()],
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
        new Account4.Keypair({ secret: freezeAuthority }).toPublicKey()
      );
      return new TransactionBuilder.Common(
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
      const inst = createTransferCheckedInstruction2(
        sourceToken.toPublicKey(),
        mint.toPublicKey(),
        destToken.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(amount, mintDecimal),
        mintDecimal,
        keypairs
      );
      return new TransactionBuilder.Common([inst], keypairs, payer.toKeypair());
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

// ../das-api/src/api.ts
var DasApi;
((DasApi4) => {
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
})(DasApi || (DasApi = {}));

// ../das-api/src/find.ts
var DasApi2;
((DasApi4) => {
  DasApi4.defaultSortBy = {
    sortBy: "recent_action" /* Recent */,
    sortDirection: "desc" /* Desc */
  };
  DasApi4.fetchOffchain = async (uri) => {
    const json = await (await fetch(uri)).json();
    return json;
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
      const editionAddress = Account4.Pda.getMasterEdition(mint);
      const inst = createFreezeDelegatedAccountInstruction({
        delegate: new Account4.Keypair({
          secret: freezeAuthority
        }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new TransactionBuilder.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(RegularNft3 || (RegularNft3 = {}));

// ../suite-regular-nft/src/mint.ts
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
    const metadata = Account4.Pda.getMetadata(mint2.toString());
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
    const collectionMetadata = Account4.Pda.getMetadata(
      collectionParent.toString()
    );
    const collectionMasterEditionAccount = Account4.Pda.getMasterEdition(
      collectionParent.toString()
    );
    return createVerifySizedCollectionItemInstruction({
      collection: collectionMetadata,
      collectionMasterEditionAccount,
      collectionMint: collectionParent,
      metadata: Account4.Pda.getMetadata(collectionChild.toString()),
      payer: feePayer,
      collectionAuthority: feePayer
    });
  };
  RegularNft11.createMint = async (mint2, owner, nftMetadata, feePayer, isMutable) => {
    const ata = getAssociatedTokenAddressSync7(mint2, owner);
    const tokenMetadataPubkey = Account4.Pda.getMetadata(mint2.toString());
    const masterEditionPubkey = Account4.Pda.getMasterEdition(mint2.toString());
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
      return new TransactionBuilder.Mint(
        instructions,
        keypairs,
        payer.toKeypair(),
        mint2.pubkey
      );
    });
  };
})(RegularNft4 || (RegularNft4 = {}));

// ../suite-regular-nft/src/gas-less-mint.ts
import { Transaction as Transaction6 } from "@solana/web3.js";
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
      const tx = new Transaction6({
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
      return new TransactionBuilder.PartialSign(hex, mint.pubkey);
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
import { createSetCollectionSizeInstruction } from "@metaplex-foundation/mpl-token-metadata";
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
        createSetCollectionSizeInstruction(collections, {
          setCollectionSizeArgs: {
            size: collectionSize || RegularNft11.DEFAULT_COLLECTION_SIZE
          }
        })
      );
      return new TransactionBuilder.Mint(
        instructions,
        [owner.toKeypair(), collectionMint.toKeypair()],
        payer.toKeypair(),
        collectionMint.pubkey
      );
    });
  };
})(RegularNft7 || (RegularNft7 = {}));

// ../suite-regular-nft/src/thaw.ts
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
      const editionAddress = Account4.Pda.getMasterEdition(mint);
      const inst = createThawDelegatedAccountInstruction({
        delegate: new Account4.Keypair({
          secret: freezeAuthority
        }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new TransactionBuilder.Common(
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

// src/regular-nft/mint.ts
var PhantomMetaplex;
((PhantomMetaplex2) => {
  PhantomMetaplex2.mint = async (input, cluster, phantom) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      if (!input.filePath || !input.storageType) {
        throw Error("Not found filePath or storageType");
      }
      Node.changeConnection({ cluster });
      const properties = await Converter14.Properties.intoInfra(
        input.properties,
        Storage.uploadFile,
        input.storageType
      );
      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter14.Royalty.intoInfra(royalty);
      const nftStorageMetadata = Storage.toConvertOffchaindata(
        { ...input, properties },
        sellerFeeBasisPoints
      );
      const uploaded = await Storage.upload(
        nftStorageMetadata,
        input.filePath,
        input.storageType
      );
      if (uploaded.isErr) {
        throw uploaded;
      }
      const uri = uploaded.value;
      const datav2 = Converter14.RegularNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );
      const connection = Node.getConnection();
      const mint2 = Account4.Keypair.create();
      const isMutable = true;
      debugLog("# properties: ", properties);
      debugLog("# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      debugLog("# mint: ", mint2.pubkey);
      const tx = new Transaction7();
      const insts = await RegularNft10.createMint(
        mint2.toPublicKey(),
        phantom.publicKey,
        datav2,
        phantom.publicKey,
        isMutable
      );
      insts.forEach((inst) => {
        tx.add(inst);
      });
      tx.feePayer = phantom.publicKey;
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      tx.recentBlockhash = blockhashObj.value.blockhash;
      tx.partialSign(mint2.toKeypair());
      const signed = await phantom.signTransaction(tx);
      debugLog(
        "# signed, signed.signatures: ",
        signed,
        signed.signatures.map((sig2) => sig2.publicKey.toString())
      );
      const sig = await connection.sendRawTransaction(signed.serialize());
      await Node.confirmedSig(sig);
      return mint2.pubkey;
    });
  };
})(PhantomMetaplex || (PhantomMetaplex = {}));

// src/regular-nft/index.ts
var Metaplex = { ...PhantomMetaplex };

// src/spl-token/add.ts
import {
  createMintToCheckedInstruction as createMintToCheckedInstruction4,
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID5
} from "@solana/spl-token";
import { Transaction as Transaction8 } from "@solana/web3.js";
var PhantomSplToken;
((PhantomSplToken4) => {
  PhantomSplToken4.add = async (token, owner, cluster, totalAmount, mintDecimal, phantom) => {
    return Try(async () => {
      Node.changeConnection({ cluster });
      const connection = Node.getConnection();
      const transaction = new Transaction8();
      const makeInstruction = await Account4.Associated.makeOrCreateInstruction(
        token,
        owner
      );
      transaction.add(makeInstruction.inst);
      transaction.add(
        createMintToCheckedInstruction4(
          token.toPublicKey(),
          makeInstruction.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          totalAmount,
          mintDecimal,
          [],
          TOKEN_PROGRAM_ID5
        )
      );
      transaction.feePayer = owner.toPublicKey();
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;
      const signed = await phantom.signAllTransactions([transaction]);
      for (const sign of signed) {
        const sig = await connection.sendRawTransaction(sign.serialize());
        await Node.confirmedSig(sig);
      }
      return token;
    });
  };
})(PhantomSplToken || (PhantomSplToken = {}));

// src/spl-token/mint.ts
import { Keypair as Keypair4, Transaction as Transaction9 } from "@solana/web3.js";
var PhantomSplToken2;
((PhantomSplToken4) => {
  PhantomSplToken4.mint = async (input, owner, cluster, totalAmount, mintDecimal, phantom) => {
    return Try(async () => {
      Node.changeConnection({ cluster });
      const connection = Node.getConnection();
      const transaction = new Transaction9();
      const mint2 = Keypair4.generate();
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const tokenStorageMetadata = Storage.toConvertOffchaindata(
        input,
        input.royalty
      );
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          tokenStorageMetadata,
          input.filePath,
          input.storageType
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType + filePath' or 'uri'`);
      }
      const isMutable = true;
      const datav2 = Converter14.TokenMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );
      debugLog("# datav2: ", datav2);
      debugLog("# upload content url: ", uri);
      const insturctions = await SplToken10.createMint(
        mint2.publicKey,
        owner.toPublicKey(),
        totalAmount,
        mintDecimal,
        datav2,
        owner.toPublicKey(),
        isMutable
      );
      insturctions.forEach(
        (inst) => transaction.add(inst)
      );
      transaction.feePayer = owner.toPublicKey();
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;
      transaction.partialSign(mint2);
      const signed = await phantom.signTransaction(transaction);
      debugLog(
        "# signed, signed.signatures: ",
        signed,
        signed.signatures.map((sig2) => sig2.publicKey.toString())
      );
      const sig = await connection.sendRawTransaction(signed.serialize());
      await Node.confirmedSig(sig);
      return mint2.publicKey.toString();
    });
  };
})(PhantomSplToken2 || (PhantomSplToken2 = {}));

// src/spl-token/index.ts
var PhantomSplToken3 = {
  ...PhantomSplToken,
  ...PhantomSplToken2
};
export {
  Metaplex,
  PhantomSplToken3 as PhantomSplToken
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvYmF0Y2gudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9zaGFyZWQudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9yZXN1bHQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvYXNzb2NpYXRlZC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9rZXlwYWlyLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL3BkYS50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9pbmRleC50cyIsICIuLi8uLi9nbG9iYWwvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29sbGVjdGlvbi50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NyZWF0b3JzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yb3lhbHR5LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbmZ0LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbWVtby50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yZWd1bGFyLW5mdC1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Byb3BlcnRpZXMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy91c2VzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdG9rZW4tbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci1jaGVja2VkLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi92YWxpZGF0b3Ivc3JjL2luZGV4LnRzIiwgIi4uLy4uL25vZGUvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbW1vbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3BhcnRpYWwtc2lnbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9jYWxjdWxhdGUtdHhzaXplLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9yZWd1bGFyLW5mdC9taW50LnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvYWRkLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvY2FsY3VsYXRlLWFtb3VudC50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL2J1cm4udHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9maW5kLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZnJlZXplLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvZ2FzLWxlc3MtdHJhbnNmZXIudHMiLCAiLi4vLi4vc3VpdGUtc3BsLXRva2VuL3NyYy9taW50LnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL3Byb3ZlbmFuY2UtbGF5ZXIudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvYXJ3ZWF2ZS50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9uZnQtc3RvcmFnZS50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9zdG9yYWdlLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvdGhhdy50cyIsICIuLi8uLi9zdWl0ZS1zcGwtdG9rZW4vc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL3N1aXRlLXNwbC10b2tlbi9zcmMvaW5kZXgudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2J1cm4udHMiLCAiLi4vLi4vZGFzLWFwaS9zcmMvYXBpLnRzIiwgIi4uLy4uL2Rhcy1hcGkvc3JjL2ZpbmQudHMiLCAiLi4vLi4vZGFzLWFwaS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2ZpbmQudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2ZyZWV6ZS50cyIsICIuLi8uLi9zdWl0ZS1yZWd1bGFyLW5mdC9zcmMvbWludC50cyIsICIuLi8uLi9zdWl0ZS1yZWd1bGFyLW5mdC9zcmMvZ2FzLWxlc3MtbWludC50cyIsICIuLi8uLi9zdWl0ZS1yZWd1bGFyLW5mdC9zcmMvZ2FzLWxlc3MtdHJhbnNmZXIudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL21pbnQtY29sbGVjdGlvbi50cyIsICIuLi8uLi9zdWl0ZS1yZWd1bGFyLW5mdC9zcmMvdGhhdy50cyIsICIuLi8uLi9zdWl0ZS1yZWd1bGFyLW5mdC9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vc3VpdGUtcmVndWxhci1uZnQvc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9yZWd1bGFyLW5mdC9pbmRleC50cyIsICIuLi9zcmMvc3BsLXRva2VuL2FkZC50cyIsICIuLi9zcmMvc3BsLXRva2VuL21pbnQudHMiLCAiLi4vc3JjL3NwbC10b2tlbi9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUywgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbW1vbiB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFRyeSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zcmMvc2hhcmVkJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zcmMvcmVzdWx0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQmF0Y2gge1xuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIGFycjogQ29tbW9uLkNvbW1vbltdIHwgTWludC5NaW50W10sXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBhIG9mIGFycikge1xuICAgICAgICAgIGlmICghYS5pbnN0cnVjdGlvbnMgJiYgIWEuc2lnbmVycykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgIGBvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgYmF0Y2hTdWJtaXQoKS5cbiAgICAgICAgICAgIEluZGV4OiAke2l9LCBTZXQgdmFsdWU6ICR7SlNPTi5zdHJpbmdpZnkoYSl9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLmluc3RydWN0aW9ucyk7XG4gICAgICAgIGNvbnN0IHNpZ25lcnMgPSBhcnIuZmxhdE1hcCgoYSkgPT4gYS5zaWduZXJzKTtcbiAgICAgICAgY29uc3QgZmVlUGF5ZXJzID0gYXJyLmZpbHRlcigoYSkgPT4gYS5mZWVQYXllciAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgbGV0IGZlZVBheWVyID0gc2lnbmVyc1swXTtcbiAgICAgICAgaWYgKGZlZVBheWVycy5sZW5ndGggPiAwICYmIGZlZVBheWVyc1swXS5mZWVQYXllcikge1xuICAgICAgICAgIGZlZVBheWVyID0gZmVlUGF5ZXJzWzBdLmZlZVBheWVyO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICAgIGlmIChmZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFtmZWVQYXllciwgLi4uc2lnbmVyc107XG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb25zLm1hcCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICAvLyBDYWxjdWxhdGVUeHNpemUuaXNNYXhUcmFuc2FjdGlvblNpemUodHJhbnNhY3Rpb24sIGZlZVBheWVyLnB1YmxpY0tleSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBTb2xhbmFKc29uQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnO1xuXG5sZXQgQ29uZmlnID0gU29sYW5hSnNvbkNvbmZpZztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgbmFtZXNwYWNlIFdhcm5uaW5nTWVzc2FnZSB7XG4gICAgY29uc3QgVEhSRVNISE9MRCA9IDUwO1xuICAgIGxldCBpc0Rpc3BsYXkgPSBmYWxzZTtcbiAgICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZUFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBDYW4gZ2V0IGFwaSBrZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgO1xuICAgIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgZGFzQXBpVXJsIGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpIHVybCBmcm9tIGh0dHBzOi8vd3d3LmhlbGl1cy5kZXYvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuICAgICAgICBgO1xuICAgIGV4cG9ydCBjb25zdCBBTk9VTkNFID0gYFxuICAgICAgICBbREVQUkVDQVRFRF1cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgQWNjb3VudCwgTm9kZSwgdG9FeHBsb3JlciwgUHVia2V5LCBTZWNyZXQgaGF2ZSBiZWVuIG1vdmVkIHRvIFxuICAgICAgICBAc29sYW5hLXN1aXRlL3V0aWxzIFxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuICAgICAgICBgO1xuXG4gICAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVByb2JhYmlsaXR5ID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgY29uc3QgcmFuZG9tVmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3QgcHJvYmFiaWxpdHkgPSAxIC8gVEhSRVNISE9MRDtcbiAgICAgIGlmICghaXNEaXNwbGF5ICYmIHJhbmRvbVZhbHVlIDwgcHJvYmFiaWxpdHkpIHtcbiAgICAgICAgaXNEaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBjb25zdCBjdXJyZW50Q2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGV4cG9ydCBjb25zdCBjdXN0b21DbHVzdGVyVXJsID0gQ29uZmlnLmNsdXN0ZXIuY3VzdG9tQ2x1c3RlclVybDtcbiAgZXhwb3J0IGNvbnN0IGlzRGVidWdnaW5nID0gQ29uZmlnLmRlYnVnZ2luZztcbiAgZXhwb3J0IGNvbnN0IG5mdFN0b3JhZ2VBcGlLZXkgPSBDb25maWcubmZ0U3RvcmFnZUFwaUtleTtcbiAgZXhwb3J0IGNvbnN0IGRhc0FwaVVybCA9IENvbmZpZy5kYXNBcGlVcmw7XG5cbiAgZXhwb3J0IGVudW0gQ2x1c3RlciB7XG4gICAgcHJkID0gJ21haW5uZXQtYmV0YScsXG4gICAgcHJkTWV0YXBsZXggPSAnbWFpbm5ldC1iZXRhLW1ldGFwbGV4JyxcbiAgICBkZXYgPSAnZGV2bmV0JyxcbiAgICB0ZXN0ID0gJ3Rlc3RuZXQnLFxuICAgIGxvY2FsaG9zdCA9ICdsb2NhbGhvc3QtZGV2bmV0JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEVuZFBvaW50VXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9hcGkubWFpbm5ldC1iZXRhLnNvbGFuYS5jb20nLFxuICAgIHByZE1ldGFwbGV4ID0gJ2h0dHBzOi8vYXBpLm1ldGFwbGV4LnNvbGFuYS5jb20nLFxuICAgIGRldiA9ICdodHRwczovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gICAgdGVzdCA9ICdodHRwczovL2FwaS50ZXN0bmV0LnNvbGFuYS5jb20nLFxuICAgIGxvY2FsaG9zdCA9ICdodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEJ1bmRsclVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbm9kZTEuaXJ5cy54eXosaHR0cHM6Ly9ub2RlMi5pcnlzLnh5eicsXG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmlyeXMueHl6JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIERhc0FwaVVybCB7XG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmhlbGl1cy1ycGMuY29tLz9hcGkta2V5PTE1MzE5YmY0LTViNDAtNDk1OC1hYzhkLTYzMTNhYTU1ZWI5MixodHRwczovL3JwYy1kZXZuZXQuaGVsaXVzLnh5ej9hcGkta2V5PTlmNzBhODQzLTMyNzQtNGZmZC1hMGE5LTMyM2Y4YjdjMDYzOScsXG4gIH1cblxuICBleHBvcnQgZW51bSBOZnRzdG9yYWdlQXBpS2V5IHtcbiAgICBkZXYgPSAnZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKa2FXUTZaWFJvY2pvd2VFUkdNamN5TjJWa09EWmhSR1UxUlRNeVpEWkRaRUpsT0RjMFl6UkZORGxFT0RZMU9XWm1PRU1pTENKcGMzTWlPaUp1Wm5RdGMzUnZjbUZuWlNJc0ltbGhkQ0k2TVRZeU1ESTJORGswTXpjd05pd2libUZ0WlNJNkltUmxiVzhpZlEuZDRKNzBtaWt4UkI4YTV2d051NlNPNUhEQThKYXVldXNlQWo3UV95dE1DRScsXG4gIH1cblxuICBleHBvcnQgY29uc3QgbG9hZENvbmZpZyA9IGFzeW5jICgpID0+IHtcbiAgICBDb25maWcgPSBhd2FpdCBpbXBvcnQoJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQ2x1c3RlciA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB7IGNsdXN0ZXI6IGVudiwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG5cbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIHVybCwgbW9zdCBwcmlvcml0eVxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsICYmIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGg7XG4gICAgICByZXR1cm4gY3VzdG9tQ2x1c3RlclVybFtpbmRleF07XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXg6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkTWV0YXBsZXg7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnRlc3Q6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwubG9jYWxob3N0O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQnVuZGxyID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuQnVuZGxyVXJsLmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaERhc0FwaSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOiB7XG4gICAgICAgIGlmIChkYXNBcGlVcmwubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHRocm93IEVycm9yKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuREFTX0FQSV9VUkwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuQnVuZGxyVXJsLnByZC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkRhc0FwaVVybC5kZXYuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaE5mdFN0b3JhZ2UgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgaWYgKCFuZnRTdG9yYWdlQXBpS2V5KSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoV2Fybm5pbmdNZXNzYWdlLk5GVF9TVE9SQUdFX0FQSV9LRVkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZnRTdG9yYWdlQXBpS2V5O1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLk5mdHN0b3JhZ2VBcGlLZXkuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgV1JBUFBFRF9UT0tFTl9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnU28xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMicsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRU1PX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdNZW1vMVVoa0pSZkh5dkxNY1Z1Y0p3eFhldUQ3MjhFcVZERHdRRHhGTU5vJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FVEFQTEVYX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdtZXRhcWJ4eFVlcmRxMjhjajFSYkFXa1lRbTN5YnpqYjZhOGJ0NTE4eDFzJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IENPTU1JVE1FTlQ6IENvbW1pdG1lbnQgPSAnY29uZmlybWVkJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vaXBmcy5pby9pcGZzJztcbiAgZXhwb3J0IGNvbnN0IElSWVNfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9nYXRld2F5LmlyeXMueHl6JztcbiAgZXhwb3J0IGNvbnN0IEJVTkRMUl9ORVRXT1JLX1VSTCA9IHN3aXRjaEJ1bmRscihDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gc3dpdGNoRGFzQXBpKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IHN3aXRjaE5mdFN0b3JhZ2UoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xTQ0FOX1VSTCA9ICdodHRwczovL3NvbHNjYW4uaW8nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MQU5BRk1fVVJMID0gJ2h0dHBzOi8vc29sYW5hLmZtJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1hSQVlfVVJMID0gJ2h0dHBzOi8veHJheS5oZWxpdXMueHl6Jztcbn1cblxuLy8gRGlzcGxheSBBbGwgQW5ub3VuY2VcbmNvbnNvbGUubG9nKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuQU5PVU5DRSk7XG4iLCAiaW1wb3J0IHsgQW55T2JqZWN0IH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnLi9yZXN1bHQnO1xuXG4vKipcbiAqIGNvbnZlcnQgYnVmZmVyIHRvIEFycmF5XG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlclxuICogQHJldHVybnMgbnVtYmVyW11cbiAqL1xuZXhwb3J0IGNvbnN0IGJ1ZmZlclRvQXJyYXkgPSAoYnVmZmVyOiBCdWZmZXIpOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IG51bXMgPSBbXTtcbiAgZm9yIChjb25zdCBieXRlIG9mIGJ1ZmZlcikge1xuICAgIG51bXMucHVzaChidWZmZXJbYnl0ZV0pO1xuICB9XG4gIHJldHVybiBudW1zO1xufTtcblxuLyoqXG4gKiBPdmVyd3JpdGUgSlMgT2JqZWN0XG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmplY3RcbiAqIEBwYXJhbSB7T3ZlcndyaXRlT2JqZWN0W119IHRhcmdldHNcbiAqIEByZXR1cm5zIE9iamVjdFxuICovXG5leHBvcnQgY29uc3Qgb3ZlcndyaXRlT2JqZWN0ID0gKFxuICBvYmplY3Q6IHVua25vd24sXG4gIHRhcmdldHM6IHtcbiAgICBleGlzdHNLZXk6IHN0cmluZztcbiAgICB3aWxsOiB7IGtleTogc3RyaW5nOyB2YWx1ZTogdW5rbm93biB9O1xuICB9W10sXG4pOiB1bmtub3duID0+IHtcbiAgY29uc3QgdGhhdDogQW55T2JqZWN0ID0gb2JqZWN0IGFzIEFueU9iamVjdDtcbiAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICBkZWxldGUgdGhhdFt0YXJnZXQuZXhpc3RzS2V5XTtcbiAgICB0aGF0W3RhcmdldC53aWxsLmtleV0gPSB0YXJnZXQud2lsbC52YWx1ZTtcbiAgfSk7XG4gIHJldHVybiB0aGF0O1xufTtcblxuLyoqXG4gKiBEaXNwbGF5IGxvZyBmb3Igc29sYW5hLXN1aXRlLWNvbmZpZy5qc1xuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTFcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTJcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTNcbiAqIEBwYXJhbSB7dW5rbm93bn0gZGF0YTRcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnTG9nID0gKFxuICBkYXRhMTogdW5rbm93bixcbiAgZGF0YTI6IHVua25vd24gPSAnJyxcbiAgZGF0YTM6IHVua25vd24gPSAnJyxcbiAgZGF0YTQ6IHVua25vd24gPSAnJyxcbik6IHZvaWQgPT4ge1xuICBpZiAoQ29uc3RhbnRzLmlzRGVidWdnaW5nID09PSAndHJ1ZScgfHwgcHJvY2Vzcy5lbnYuREVCVUcgPT09ICd0cnVlJykge1xuICAgIGNvbnNvbGUubG9nKCdbREVCVUddJywgZGF0YTEsIGRhdGEyLCBkYXRhMywgZGF0YTQpO1xuICB9XG59O1xuXG4vKipcbiAqIHNsZWVwIHRpbWVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNlY1xuICogQHJldHVybnMgUHJvbWlzZTxudW1iZXI+XG4gKi9cbmV4cG9ydCBjb25zdCBzbGVlcCA9IGFzeW5jIChzZWM6IG51bWJlcik6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocikgPT4gc2V0VGltZW91dChyLCBzZWMgKiAxMDAwKSk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGUgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucyAhPSBudWxsICYmXG4gICAgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlICE9IG51bGxcbiAgKTtcbn07XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuZXhwb3J0IGNvbnN0IGlzUHJvbWlzZSA9IChvYmo6IHVua25vd24pOiBvYmogaXMgUHJvbWlzZTx1bmtub3duPiA9PiB7XG4gIHJldHVybiAoXG4gICAgISFvYmogJiZcbiAgICAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiZcbiAgICB0eXBlb2YgKG9iaiBhcyBhbnkpLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgKTtcbn07XG5cbi8qKlxuICogVHJ5IGFzeW5jIG1vbmFkXG4gKlxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8VCwgRT4+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgYXN5bmNibG9jazogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFByb21pc2U8UmVzdWx0PFQsIEU+PjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihibG9jazogKCkgPT4gVCk6IFJlc3VsdDxULCBFPjtcbmV4cG9ydCBmdW5jdGlvbiBUcnk8VCwgRSBleHRlbmRzIEVycm9yPihcbiAgaW5wdXQ6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBSZXN1bHQ8VCwgRXJyb3I+IHwgUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdiA9IGlucHV0KCk7XG4gICAgaWYgKGlzUHJvbWlzZSh2KSkge1xuICAgICAgcmV0dXJuIHYudGhlbihcbiAgICAgICAgKHg6IFQpID0+IFJlc3VsdC5vayh4KSxcbiAgICAgICAgKGVycjogRSkgPT4gUmVzdWx0LmVycihlcnIpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayh2KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlKTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoZSBhcyBzdHJpbmcpKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBpZiAoZmluYWxseUlucHV0KSB7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5hbGx5IGlucHV0OicsIGZpbmFsbHlJbnB1dCk7XG4gICAgICBmaW5hbGx5SW5wdXQoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ8dW5kZWZpbmVkfSBjcmVhdGVkX2F0XG4gKiBAcmV0dXJucyBEYXRlIHwgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSA9IChcbiAgY3JlYXRlZF9hdDogbnVtYmVyIHwgdW5kZWZpbmVkLFxuKTogRGF0ZSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmIChjcmVhdGVkX2F0KSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGNyZWF0ZWRfYXQgKiAxMDAwKTtcbiAgfVxuICByZXR1cm47XG59O1xuXG4vKipcbiAqIEdldCB1bml4IHRpbWVzdGFtcFxuICpcbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5leHBvcnQgY29uc3QgdW5peFRpbWVzdGFtcCA9ICgpOiBudW1iZXIgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xufTtcbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBDb21tb25TdHJ1Y3R1cmUsXG4gIE1pbnRTdHJ1Y3R1cmUsXG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0UmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvcj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcblxuICB1bndyYXAoKTogVDtcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBVO1xuICB1bndyYXA8VSwgVj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFYpOiBVIHwgVjtcbiAgLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMTBcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBVKTogVTtcbiAgdW53cmFwKG9rPzogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IHVua25vd24pOiB1bmtub3duIHtcbiAgICBjb25zdCByID0gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayA/IG9rKHZhbHVlKSA6IHZhbHVlKSxcbiAgICAgIChlcnJvcikgPT4gKGVyciA/IFJlc3VsdC5vayhlcnIoZXJyb3IpKSA6IFJlc3VsdC5lcnIoZXJyb3IpKSxcbiAgICApO1xuICAgIGlmIChyLmlzRXJyKSB7XG4gICAgICB0aHJvdyByLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gci52YWx1ZTtcbiAgfVxuXG4gIC8vLy8gbWFwIC8vLy9cbiAgbWFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBSZXN1bHQ8VSwgRT47XG4gIG1hcDxVLCBGIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFUsXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IEYsXG4gICk6IFJlc3VsdDxVLCBGPjtcbiAgbWFwKG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gRXJyb3IpOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyID8gZXJyKGVycm9yKSA6IGVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vLyBjaGFpbiAvLy8vXG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG4gIGNoYWluKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDx1bmtub3duPixcbiAgICBlcnI/OiAoZXJyb3I6IEUpID0+IFJlc3VsdDx1bmtub3duPixcbiAgKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4ob2ssIGVyciB8fCAoKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycm9yKSkpO1xuICB9XG5cbiAgLy8vLyBtYXRjaCAvLy8vXG4gIG1hdGNoPFUsIEY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBGKTogdm9pZCB8IFByb21pc2U8dm9pZD47XG5cbiAgbWF0Y2goXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93bixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gdW5rbm93bixcbiAgKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIoZXJyb3IpIGFzIEVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vIHNpbmdsZSBUcmFuc2FjdGlvbkJ1aWxkZXIgLy8vL1xuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gIGFzeW5jIHN1Ym1pdChcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4ge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMubWFwKFxuICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgIGRlYnVnTG9nKCcjIHJlc3VsdCBzaW5nbGUgc3VibWl0OiAnLCBvayk7XG4gICAgICAgIGlmIChmZWVQYXllcikge1xuICAgICAgICAgIGNvbnN0IG9iaiA9IG9rIGFzIFBhcnRpYWxTaWduU3RydWN0dXJlO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KGZlZVBheWVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBvYmogPSBvayBhcyBDb21tb25TdHJ1Y3R1cmUgfCBNaW50U3RydWN0dXJlO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIocmVzLmVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy52YWx1ZTtcbiAgfVxufVxuXG4vLy8gTXVsdGlwbGUgVHJhbnNhY3Rpb25CdWlsZGVyIC8vLy9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgc3VibWl0KGZlZVBheWVyPzogU2VjcmV0KTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj47XG4gIH1cbn1cblxuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uIChmZWVQYXllcj86IFNlY3JldCkge1xuICBpZiAoZmVlUGF5ZXIpIHtcbiAgICBsZXQgaSA9IDE7XG4gICAgZm9yIGF3YWl0IChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSBlbHNlIGlmIChvYmoudmFsdWUuY2FuU3VibWl0KSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBjYW5TdWJtaXQnKTtcbiAgICAgICAgY29uc3Qgc2lnID0gYXdhaXQgKG9iaiBhcyBQYXJ0aWFsU2lnblN0cnVjdHVyZSkuc3VibWl0KGZlZVBheWVyKTtcbiAgICAgICAgaWYgKHNpZy5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBzaWc7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcoc2lnLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBvdGhlciB0aGFuIGNhblN1Ym1pdCcpO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT0gaSkge1xuICAgICAgICAgIC8vIGxhc3Qgb2JqZWN0XG4gICAgICAgICAgcmV0dXJuIG9iai5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIG9iai5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnM6IENvbW1vblN0cnVjdHVyZSB8IE1pbnRTdHJ1Y3R1cmVbXSA9IFtdO1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0gZWxzZSBpZiAob2JqLmlzT2spIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKCdPbmx5IEFycmF5IEluc3RydWN0aW9uIG9iamVjdCcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVidWdMb2coJyMgUmVzdWx0IGJhdGNoIHN1Ym1pdDogJywgaW5zdHJ1Y3Rpb25zKTtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaCgpLnN1Ym1pdChpbnN0cnVjdGlvbnMpO1xuICB9XG59O1xuXG5jbGFzcyBJbnRlcm5hbE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSB0cnVlO1xuICByZWFkb25seSBpc0VyciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBfZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxFcnI8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IGZhbHNlO1xuICByZWFkb25seSBpc0VyciA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBfb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlc3VsdCB7XG4gIGV4cG9ydCB0eXBlIE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbE9rPFQsIEU+O1xuICBleHBvcnQgdHlwZSBFcnI8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsRXJyPFQsIEU+O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBvazxULCBFIGV4dGVuZHMgRXJyb3I+KHZhbHVlOiBUKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsT2sodmFsdWUpO1xuICB9XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yPzogRSk6IFJlc3VsdDxULCBFPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I6IEUpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnIoZXJyb3IgfHwgRXJyb3IoKSk7XG4gIH1cblxuICB0eXBlIFUgPSBSZXN1bHQ8dW5rbm93bj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgICBSMTUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNCwgUjE1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgICAgT2tUeXBlPFIxNT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgICB8IFIxNVxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxM10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgUjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTEgfCBSMTIgfCBSMTNcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+LCBPa1R5cGU8UjU+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFUsIFIzIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjNdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjM+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMl0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPl0sIEVyclR5cGU8UjAgfCBSMSB8IFIyPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMV0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPl0sIEVyclR5cGU8UjAgfCBSMT4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjBdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD5dLCBFcnJUeXBlPFIwPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiBbXSk6IFJlc3VsdDxbXT47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8VCBleHRlbmRzIFVbXSB8IFJlY29yZDxzdHJpbmcsIFU+PihcbiAgICBvYmo6IFQsXG4gICk6IFJlc3VsdDxcbiAgICB7IFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PGluZmVyIEk+ID8gSSA6IG5ldmVyIH0sXG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT4gPyBFIDogbmV2ZXI7XG4gICAgfVtrZXlvZiBUXVxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogdW5rbm93bik6IHVua25vd24ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIGNvbnN0IHJlc0FyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaikge1xuICAgICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBpdGVtIGFzIHVua25vd247XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlc0Fycik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSAob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KVtrZXldO1xuICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICByZXNba2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQub2socmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yID0gRXJyb3I+ID1cbiAgfCBSZXN1bHQuT2s8VCwgRT5cbiAgfCBSZXN1bHQuRXJyPFQsIEU+O1xuXG50eXBlIE9rVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgTz4gPyBPIDogbmV2ZXI7XG50eXBlIEVyclR5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+XG4gID8gRVxuICA6IG5ldmVyO1xuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2csIHNsZWVwIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFjY291bnQsXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBUT0tFTl9QUk9HUkFNX0lELFxuICBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yLFxuICBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcixcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5pbXBvcnQgeyBBY2NvdW50IGFzIEtleXBhaXIgfSBmcm9tICcuL2tleXBhaXInO1xuXG4vKipcbiAqIEdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICpcbiAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICogQHBhcmFtIHtib29sZWFufSBhbGxvd093bmVyT2ZmQ3VydmVcbiAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nIHwgSW5zdHJ1Y3Rpb24+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQXNzb2NpYXRlZCB7XG4gICAgY29uc3QgUkVUUllfT1ZFUl9MSU1JVCA9IDEwO1xuICAgIGNvbnN0IFJFVFJZX1NMRUVQX1RJTUUgPSAzO1xuICAgIC8vQGludGVybmFsXG4gICAgY29uc3QgZ2V0ID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgICApOiBQcm9taXNlPHN0cmluZyB8IENvbW1vblN0cnVjdHVyZTxQdWJrZXk+PiA9PiB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIG5ldyBLZXlwYWlyLktleXBhaXIoeyBzZWNyZXQ6IGZlZVBheWVyIH0pLnB1YmtleSxcbiAgICAgICAgYWxsb3dPd25lck9mZkN1cnZlLFxuICAgICAgKTtcblxuICAgICAgaWYgKCFyZXMuaW5zdCkge1xuICAgICAgICByZXR1cm4gcmVzLnRva2VuQWNjb3VudDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uPFB1YmtleT4oXG4gICAgICAgIFtyZXMuaW5zdF0sXG4gICAgICAgIFtdLFxuICAgICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgcmVzLnRva2VuQWNjb3VudCEsXG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXRyeSBmdW5jdGlvbiBpZiBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCByZXRyeUdldE9yQ3JlYXRlID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgIGxldCBjb3VudGVyID0gMTtcbiAgICAgIHdoaWxlIChjb3VudGVyIDwgUkVUUllfT1ZFUl9MSU1JVCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBnZXQobWludCwgb3duZXIsIGZlZVBheWVyLCB0cnVlKTtcblxuICAgICAgICAgIGlmIChpbnN0ICYmIHR5cGVvZiBpbnN0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgaW5zdCk7XG4gICAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGluc3QgaW5zdGFuY2VvZiBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKSB7XG4gICAgICAgICAgICAoYXdhaXQgaW5zdC5zdWJtaXQoKSkubWFwKFxuICAgICAgICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKG9rKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdC5kYXRhO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnTG9nKCcjIEVycm9yIHN1Ym1pdCByZXRyeUdldE9yQ3JlYXRlOiAnLCBlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgZGVidWdMb2coYCMgcmV0cnk6ICR7Y291bnRlcn0gY3JlYXRlIHRva2VuIGFjY291bnQ6IGAsIGUpO1xuICAgICAgICAgIGRlYnVnTG9nKGAjIG1pbnQ6ICR7bWludH0sIG93bmVyOiAke293bmVyfSwgZmVlUGF5ZXI6ICR7ZmVlUGF5ZXJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgc2xlZXAoUkVUUllfU0xFRVBfVElNRSk7XG4gICAgICAgIGNvdW50ZXIrKztcbiAgICAgIH1cbiAgICAgIHRocm93IEVycm9yKGByZXRyeSBhY3Rpb24gaXMgb3ZlciBsaW1pdCAke1JFVFJZX09WRVJfTElNSVR9YCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFtNYWluIGxvZ2ljXUdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gICAgICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAgICovXG4gICAgZXhwb3J0IGNvbnN0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyPzogUHVia2V5LFxuICAgICAgYWxsb3dPd25lck9mZkN1cnZlID0gZmFsc2UsXG4gICAgKTogUHJvbWlzZTx7XG4gICAgICB0b2tlbkFjY291bnQ6IHN0cmluZztcbiAgICAgIGluc3Q6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgfT4gPT4ge1xuICAgICAgY29uc3QgYXNzb2NpYXRlZFRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gRG9udCB1c2UgUmVzdWx0XG4gICAgICAgIGF3YWl0IGdldEFjY291bnQoXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKS5jb21taXRtZW50LFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yKSAmJlxuICAgICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gb3duZXIgOiBmZWVQYXllcjtcblxuICAgICAgICBjb25zdCBpbnN0ID0gY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICAgIHBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3QsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEtleXBhaXIgYXMgT3JpZ2luYWwsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBjbGFzcyBLZXlwYWlyIHtcbiAgICBzZWNyZXQ6IFNlY3JldDtcbiAgICBwdWJrZXk6IFB1YmtleTtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwdWJrZXk/OiBQdWJrZXk7IHNlY3JldDogU2VjcmV0IH0pIHtcbiAgICAgIGlmICghcGFyYW1zLnB1YmtleSkge1xuICAgICAgICBjb25zdCBrZXlwYWlyID0gcGFyYW1zLnNlY3JldC50b0tleXBhaXIoKTtcbiAgICAgICAgdGhpcy5wdWJrZXkgPSBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdWJrZXkgPSBwYXJhbXMucHVia2V5O1xuICAgICAgfVxuICAgICAgdGhpcy5zZWNyZXQgPSBwYXJhbXMuc2VjcmV0O1xuICAgIH1cblxuICAgIHRvUHVibGljS2V5KCk6IFB1YmxpY0tleSB7XG4gICAgICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnB1YmtleSk7XG4gICAgfVxuXG4gICAgdG9LZXlwYWlyKCk6IE9yaWdpbmFsIHtcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy5zZWNyZXQpO1xuICAgICAgcmV0dXJuIE9yaWdpbmFsLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzUHVia2V5ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBQdWJrZXkgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17MzIsNDR9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgaXNTZWNyZXQgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFNlY3JldCA9PlxuICAgICAgL15bMC05YS16QS1aXXs4Nyw4OH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBjcmVhdGUgPSAoKTogS2V5cGFpciA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlyID0gT3JpZ2luYWwuZ2VuZXJhdGUoKTtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvS2V5UGFpciA9IChrZXlwYWlyOiBPcmlnaW5hbCk6IEtleXBhaXIgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLWJ1YmJsZWd1bSc7XG5pbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIFBkYSB7XG4gICAgZXhwb3J0IGNvbnN0IGdldE1ldGFkYXRhID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRNYXN0ZXJFZGl0aW9uID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdlZGl0aW9uJyksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldFRyZWVBdXRob3JpdHkgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFthZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRCZ3VtU2lnbmVyID0gKCk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbQnVmZmVyLmZyb20oJ2NvbGxlY3Rpb25fY3BpJywgJ3V0ZjgnKV0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRBc3NldElkID0gKGFkZHJlc3M6IFB1YmtleSwgbGVhZkluZGV4OiBudW1iZXIpOiBQdWJrZXkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IG5ldyBCTi5CTihsZWFmSW5kZXgpO1xuICAgICAgY29uc3QgW2Fzc2V0SWRdID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnYXNzZXQnLCAndXRmOCcpLFxuICAgICAgICAgIGFkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpLFxuICAgICAgICAgIFVpbnQ4QXJyYXkuZnJvbShub2RlLnRvQXJyYXkoJ2xlJywgOCkpLFxuICAgICAgICBdLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gYXNzZXRJZC50b1N0cmluZygpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBY2NvdW50IGFzIEFzc29jaWF0ZWQgfSBmcm9tICcuL2Fzc29jaWF0ZWQnO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcbmltcG9ydCB7IEFjY291bnQgYXMgUGRhIH0gZnJvbSAnLi9wZGEnO1xuXG5leHBvcnQgY29uc3QgQWNjb3VudCA9IHtcbiAgLi4uQXNzb2NpYXRlZCxcbiAgLi4uS2V5cGFpcixcbiAgLi4uUGRhLFxufTtcbiIsICJpbXBvcnQgeyBLZXlwYWlyLCBMQU1QT1JUU19QRVJfU09MLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIsIEV4cGxvcmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuLyoqXG4gKiBDcmVhdGUgZXhwbG9yZXIgdXJsIGZvciBhY2NvdW50IGFkZHJlc3Mgb3Igc2lnbmF0dXJlXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9FeHBsb3JlclVybCA9IGZ1bmN0aW9uIChcbiAgZXhwbG9yZXI6IEV4cGxvcmVyID0gRXhwbG9yZXIuU29sc2NhbixcbiAgb3B0aW9uczogUGFydGlhbDxFeHBsb3Jlck9wdGlvbnM+ID0ge30sXG4pIHtcbiAgY29uc3QgZW5kUG9pbnRVcmwgPSBOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludDtcbiAgZGVidWdMb2coJyMgdG9FeHBsb3JlclVybCBycGNFbmRwb2ludDonLCBlbmRQb2ludFVybCk7XG4gIGxldCBjbHVzdGVyID0gJyc7XG4gIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLnRlc3Q7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5kZXYpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9IGVsc2Uge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH1cblxuICBjb25zdCBhZGRyZXNzT3JTaWduYXR1cmU6IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgbGV0IHVybCA9ICcnO1xuXG4gIGlmIChvcHRpb25zLnJlcGxhY2VQYXRoKSB7XG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGlmIChBY2NvdW50LktleXBhaXIuaXNQdWJrZXkoYWRkcmVzc09yU2lnbmF0dXJlKSkge1xuICAgIC8vIGFkZHJlc3NcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS9hZGRyZXNzLyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBzaWduYXR1cmVcbiAgICAvLyBmb3IgSW52YWxpZCB0eXBlIFwibmV2ZXJcIiBvZiBhZGRyZXNzT3JTaWduYXR1cmUsIHNvIGBhcyBzdHJpbmdgXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogUHViS2V5KEBzb2xhbmEtc3VpdGUpIHRvIFB1YmxpY0tleShAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHVibGljS2V5XG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9QdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5QdWJLZXk6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMudG9TdHJpbmcoKSk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1NlY3JldCh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuU2VjcmV0OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMudG9TdHJpbmcoKSk7XG4gIHJldHVybiBLZXlwYWlyLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG59O1xuXG4vKipcbiAqIExBTVBPUlRTIHRvIFNPTFxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvU29sID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC5kaXYoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG5cbi8qKlxuICogU09MIHRvIExBTVBPUlRTXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9MYW1wb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAudGltZXMoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG4iLCAiaW1wb3J0IHsgSW50ZXJuYWxDb2xsZWN0aW9uIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgR3JvdXBpbmcgfSBmcm9tICd+L3R5cGVzL2Rhcy1hcGknO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbiBhcyBDb2xsZWN0aW9uVHlwZSxcbiAgSW5wdXRDb2xsZWN0aW9uLFxuICBPcHRpb24sXG59IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbiB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDb2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGlucHV0LnRvUHVibGljS2V5KCksXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4sXG4gICAgKTogQ29sbGVjdGlvblR5cGUgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogR3JvdXBpbmdbXSk6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBvdXRwdXQuZmluZCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmdyb3VwX2tleSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmdyb3VwX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMgPyByZXMuZ3JvdXBfdmFsdWUgOiAnJztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDcmVhdG9ycywgSW5wdXRDcmVhdG9ycywgT3B0aW9uIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Db21wcmVzc2VkTmZ0SW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogSW50ZXJuYWxDcmVhdG9yc1tdID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0IS5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPixcbiAgICApOiBDcmVhdG9yc1tdIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQge1xuICBNZXRhZGF0YUFyZ3MsXG4gIFRva2VuUHJvZ3JhbVZlcnNpb24sXG4gIFRva2VuU3RhbmRhcmQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogTWV0YWRhdGFBcmdzID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0NvbXByZXNzZWROZnRJbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogZmFsc2UsXG4gICAgICAgIGlzTXV0YWJsZTogaW5wdXQuaXNNdXRhYmxlID8/IGZhbHNlLFxuICAgICAgICBlZGl0aW9uTm9uY2U6IDAsXG4gICAgICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUsXG4gICAgICAgIHRva2VuUHJvZ3JhbVZlcnNpb246IFRva2VuUHJvZ3JhbVZlcnNpb24uT3JpZ2luYWwsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJleHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUm95YWx0eSB7XG4gICAgZXhwb3J0IGNvbnN0IFRIUkVTSE9MRCA9IDEwMDtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQXNzZXRBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvbmZ0JztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBOZnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChvdXRwdXQ6IEFzc2V0QW5kT2ZmY2hhaW4pOiBNZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5pZC50b1N0cmluZygpLFxuICAgICAgICBjb2xsZWN0aW9uTWludDogQ29sbGVjdGlvbi5Db2xsZWN0aW9uTWludC5pbnRvVXNlcihcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5ncm91cGluZyxcbiAgICAgICAgKSBhcyBQdWJrZXksXG4gICAgICAgIGF1dGhvcml0aWVzOiBvdXRwdXQub25jaGFpbi5hdXRob3JpdGllcyxcbiAgICAgICAgcm95YWx0eTogUm95YWx0eS5Sb3lhbHR5LmludG9Vc2VyKG91dHB1dC5vbmNoYWluLnJveWFsdHkucGVyY2VudCksXG4gICAgICAgIG5hbWU6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQubWV0YWRhdGEubmFtZSxcbiAgICAgICAgc3ltYm9sOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLnN5bWJvbCxcbiAgICAgICAgdXJpOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uY3JlYXRvcnMpISxcbiAgICAgICAgdHJlZUFkZHJlc3M6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLnRyZWUsXG4gICAgICAgIGlzQ29tcHJlc3NlZDogb3V0cHV0Lm9uY2hhaW4uY29tcHJlc3Npb24uY29tcHJlc3NlZCxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5tdXRhYmxlLFxuICAgICAgICBpc0J1cm46IG91dHB1dC5vbmNoYWluLmJ1cm50LFxuICAgICAgICBlZGl0aW9uTm9uY2U6IG91dHB1dC5vbmNoYWluLnN1cHBseS5lZGl0aW9uX25vbmNlLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBvdXRwdXQub25jaGFpbi5yb3lhbHR5LnByaW1hcnlfc2FsZV9oYXBwZW5lZCxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSEsXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBNZW1vLCBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNZW1vLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG91dHB1dFRyYW5zZmVyPzogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgICBpZiAob3V0cHV0VHJhbnNmZXIgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSAhPT0gJycpIHtcbiAgICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSA9PT0gJ3NwbC10b2tlbicpIHtcbiAgICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBoaXN0b3J5Lm1lbW8gPSBvdXRwdXQucGFyc2VkO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTWludFRvIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE1pbnRUbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQgYXMgc3RyaW5nO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBvdmVyd3JpdGVPYmplY3QsIFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQge30gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBGaWxlVHlwZSwgUHJvcGVydGllcywgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUHJvcGVydGllcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IGFzeW5jIChcbiAgICAgIGlucHV0OiBQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkLFxuICAgICAgY2FsbGJhY2tGdW5jOiAoXG4gICAgICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICAgICkgPT4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+LFxuICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxQcm9wZXJ0aWVzPiA9PiB7XG4gICAgICBpZiAoIWlucHV0IHx8ICFpbnB1dC5maWxlcykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGlucHV0LmZpbGVzLm1hcChhc3luYyAoZmlsZSkgPT4ge1xuICAgICAgICAgIGlmICghZmlsZS5maWxlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBjYWxsYmFja0Z1bmMoZmlsZS5maWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgICAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvdmVyd3JpdGVPYmplY3QoZmlsZSwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBleGlzdHNLZXk6ICdmaWxlUGF0aCcsXG4gICAgICAgICAgICAgIHdpbGw6IHsga2V5OiAndXJpJywgdmFsdWU6IHJlcy52YWx1ZSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgLi4uaW5wdXQsIGZpbGVzIH0gYXMgUHJvcGVydGllcztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBPcHRpb24sIFVzZXMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFVzZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAob3V0cHV0OiBPcHRpb248VXNlcz4pOiBVc2VzIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX1VzZXMgfSBmcm9tICcuL3VzZXMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIFRva2VuTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBNZXRhZGF0YUFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRva2VuTWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXRUb2tlbk1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBudWxsLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE1ldGFkYXRhQW5kT2ZmY2hhaW4sXG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICAgICk6IFRva2VuTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sKSxcbiAgICAgICAgdG9rZW5BbW91bnQ6IHRva2VuQW1vdW50LFxuICAgICAgICB1cmk6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgdXNlczogX1VzZXMuVXNlcy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4udXNlcyksXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCksXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gICAgLy8gZGVsZXRlIE5VTEwoMHgwMCkgc3RyaW5ncyBmdW5jdGlvblxuICAgIGV4cG9ydCBjb25zdCBkZWxldGVOdWxsU3RyaW5ncyA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcMC9nLCAnJyk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5tdWx0aXNpZ0F1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5tdWx0aXNpZ0F1dGhvcml0eTtcbiAgICAgIGhpc3Rvcnkuc2lnbmVycyA9IG91dHB1dC5wYXJzZWQuaW5mby5zaWduZXJzO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlciB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXIsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICBpZiAoIW91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbiB8fCAhb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgIGhpc3Rvcnkuc29sID0gb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzPy50b1NvbCgpLnRvU3RyaW5nKCk7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbXByZXNzZWROZnRNZXRhZGF0YSB9IGZyb20gJy4vY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTmZ0IH0gZnJvbSAnLi9uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1lbW8gfSBmcm9tICcuL21lbW8nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJlZ3VsYXJOZnRNZXRhZGF0YSB9IGZyb20gJy4vcmVndWxhci1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFByb3BlcnRpZXMgfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJveWFsdHkgfSBmcm9tICcuL3JveWFsdHknO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRva2VuTWV0YWRhdGEgfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICcuL3RyYW5zZmVyLWNoZWNrZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5cbmV4cG9ydCBjb25zdCBDb252ZXJ0ZXIgPSB7XG4gIC4uLkNvbXByZXNzZWROZnRNZXRhZGF0YSxcbiAgLi4uQ29sbGVjdGlvbixcbiAgLi4uQ3JlYXRvcnMsXG4gIC4uLk5mdCxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uUmVndWxhck5mdE1ldGFkYXRhLFxuICAuLi5Qcm9wZXJ0aWVzLFxuICAuLi5Sb3lhbHR5LFxuICAuLi5Ub2tlbk1ldGFkYXRhLFxuICAuLi5UcmFuc2ZlckNoZWNrZWQsXG4gIC4uLlRyYW5zZmVyLFxuICAuLi5Vc2VzLFxufTtcbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IERldGFpbHMsIExpbWl0IH0gZnJvbSAnfi90eXBlcy92YWxpZGF0b3InO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBWYWxpZGF0b3Ige1xuICBleHBvcnQgbmFtZXNwYWNlIE1lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGV4cG9ydCBjb25zdCBTTUFMTF9OVU1CRVIgPSAndG9vIHNtYWxsJztcbiAgICBleHBvcnQgY29uc3QgQklHX05VTUJFUiA9ICd0b28gYmlnJztcbiAgICBleHBvcnQgY29uc3QgTE9OR19MRU5HVEggPSAndG9vIGxvbmcnO1xuICAgIGV4cG9ydCBjb25zdCBFTVBUWSA9ICdpbnZhbGlkIGVtcHR5IHZhbHVlJztcbiAgICBleHBvcnQgY29uc3QgSU5WQUxJRF9VUkwgPSAnaW52YWxpZCB1cmwnO1xuICAgIGV4cG9ydCBjb25zdCBPTkxZX05PREVfSlMgPSAnYHN0cmluZ2AgdHlwZSBpcyBvbmx5IE5vZGUuanMnO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IE5BTUVfTEVOR1RIID0gMzI7XG4gIGV4cG9ydCBjb25zdCBTWU1CT0xfTEVOR1RIID0gMTA7XG4gIGV4cG9ydCBjb25zdCBVUkxfTEVOR1RIID0gMjAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NQVggPSAxMDA7XG4gIGV4cG9ydCBjb25zdCBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVggPSAxMDAwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUlOID0gMDtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdyb3lhbHR5JztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTZWxsZXJGZWVCYXNpc1BvaW50cyA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogQ29udmVydGVyLlJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXgsXG4gID4oXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5yb3lhbHR5KSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzUm95YWx0eShtZXRhZGF0YS5yb3lhbHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJGZWVCYXNpc1BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEubmFtZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc05hbWUobWV0YWRhdGEubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLnN5bWJvbCkge1xuICAgICAgICAgICAgICByZXMgPSBpc1N5bWJvbChtZXRhZGF0YS5zeW1ib2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFcnIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goLi4ucmVzLmVycm9yLmRldGFpbHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgJ0NhdWdodCBpbiB0aGUgdmFsaWRhdGlvbiBlcnJvcnMuIHNlZSBpbmZvcm1hdGlvbiBlLmc6IGVycjxWYWxpZGF0b3JFcnJvcj4uZGV0YWlscyc7XG4gICAgICAgIHRocm93IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZSA9IFBpY2s8XG4gICAgT2ZmY2hhaW4sXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAnaW1hZ2UnIHwgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJ1xuICA+O1xuICB0eXBlIFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggPSBQaWNrPFxuICAgIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAncm95YWx0eScgfCAnZmlsZVBhdGgnXG4gID47XG4gIHR5cGUgUGlja01ldGFwbGV4ID0gUGljazxcbiAgICBEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdCxcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgaWYgKCFpbWFnZU9yVXJpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChpbWFnZU9yVXJpKSA+IFVSTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBpbWFnZU9yVXJpLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBVUkxfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oz86Jj0rLCUjXSsvZy50ZXN0KGltYWdlT3JVcmkpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5JTlZBTElEX1VSTCwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGRldGFpbHM6IERldGFpbHNbXTtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBkZXRhaWxzOiBEZXRhaWxzW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29tbWl0bWVudCwgQ29ubmVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTm9kZSB7XG4gIGNvbnN0IHNldHRlZCA9IHtcbiAgICBjbHVzdGVyVXJsOiAnJyxcbiAgICBjb21taXRtZW50OiBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgICBjdXN0b21DbHVzdGVyVXJsOiBbXSBhcyBzdHJpbmdbXSxcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvbiA9ICgpOiBDb25uZWN0aW9uID0+IHtcbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbihzZXR0ZWQuY2x1c3RlclVybCwgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjaGFuZ2VDb25uZWN0aW9uID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjb21taXRtZW50PzogQ29tbWl0bWVudDtcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiB2b2lkID0+IHtcbiAgICAvLyBpbml0aWFsaXplXG4gICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSAnJztcbiAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IFtdO1xuICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG5cbiAgICBjb25zdCB7IGNsdXN0ZXIsIGNvbW1pdG1lbnQsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuICAgIGlmIChjb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IGNvbW1pdG1lbnQ7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjb21taXRtZW50OiAnLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gICAgfVxuXG4gICAgaWYgKGNsdXN0ZXIpIHtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjbHVzdGVyOiBjbHVzdGVyIH0pO1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY2x1c3RlclVybDogJywgc2V0dGVkLmNsdXN0ZXJVcmwpO1xuICAgIH1cblxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsKSB7XG4gICAgICBkZWJ1Z0xvZygnIyBjdXN0b21DbHVzdGVyVXJsOiAnLCBjdXN0b21DbHVzdGVyVXJsKTtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjdXN0b21DbHVzdGVyVXJsIH0pO1xuICAgICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBjdXN0b21DbHVzdGVyVXJsO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIE5vZGUgY2hhbmdlIGNsdXN0ZXIsIGN1c3RvbSBjbHVzdGVyIHVybDogJyxcbiAgICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgY29uZmlybWVkU2lnID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgIGNvbW1pdG1lbnQ6IENvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgKSA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhdGVzdEJsb2NraGFzaCA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgcmV0dXJuIGF3YWl0IGNvbm5lY3Rpb25cbiAgICAgIC5jb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBibG9ja2hhc2g6IGxhdGVzdEJsb2NraGFzaC5ibG9ja2hhc2gsXG4gICAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGxhdGVzdEJsb2NraGFzaC5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1pdG1lbnQsXG4gICAgICApXG4gICAgICAudGhlbihSZXN1bHQub2spXG4gICAgICAuY2F0Y2goUmVzdWx0LmVycik7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBjb25zdCBNQVhfUkVUUklFUyA9IDM7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIENvbW1vbjxUID0gdW5kZWZpbmVkPiBpbXBsZW1lbnRzIENvbW1vblN0cnVjdHVyZTxUPiB7XG4gICAgc3RhdGljIE1BWF9UUkFOU0FDVElPTl9TSVpFID0gMTIzMjtcblxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICAgIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgICBmZWVQYXllcj86IEtleXBhaXI7XG4gICAgZGF0YT86IFQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgICAgZGF0YT86IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jICgpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbW1vbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgTWludDxUID0gUHVia2V5PiBpbXBsZW1lbnRzIE1pbnRTdHJ1Y3R1cmU8VD4ge1xuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICAgIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgICBmZWVQYXllcjogS2V5cGFpcjtcbiAgICBkYXRhOiBUO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICAgIGZlZVBheWVyOiBLZXlwYWlyLFxuICAgICAgZGF0YTogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWludCkpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBNaW50SW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50ID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgICAgICAgZGVidWdMb2coJyMgQ2hhbmdlIG1ldGFwbGV4IGNsdXN0ZXIgb24gbWFpbm5ldC1iZXRhJyk7XG4gICAgICAgICAgTm9kZS5jaGFuZ2VDb25uZWN0aW9uKHsgY2x1c3RlcjogQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXggfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIFBhcnRpYWxTaWduIGltcGxlbWVudHMgUGFydGlhbFNpZ25TdHJ1Y3R1cmUge1xuICAgIGhleEluc3RydWN0aW9uOiBzdHJpbmc7XG4gICAgZGF0YT86IFB1YmtleTtcbiAgICBjYW5TdWJtaXQ/OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIG1pbnQ/OiBQdWJrZXksIGNhblN1Ym1pdCA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5kYXRhID0gbWludDtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gY2FuU3VibWl0O1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJ0aWFsU2lnbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBQYXJ0aWFsU2lnbkluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVjb2RlID0gQnVmZmVyLmZyb20odGhpcy5oZXhJbnN0cnVjdGlvbiwgJ2hleCcpO1xuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbkZyb21Kc29uID0gVHJhbnNhY3Rpb24uZnJvbShkZWNvZGUpO1xuICAgICAgICB0cmFuc2FjdGlvbkZyb21Kc29uLnBhcnRpYWxTaWduKGZlZVBheWVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb25Gcm9tSnNvbi5zZXJpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXksIFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuLy8gQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGNvbnN0IExPV19WQUxVRSA9IDEyNzsgLy8gMHg3ZlxuICBjb25zdCBISUdIX1ZBTFVFID0gMTYzODM7IC8vIDB4M2ZmZlxuICBjb25zdCBNQVhfVFJBTlNBQ1RJT05fU0laRSA9IDEyMzI7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IGhlYWRlciBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXkgaGVhZGVyXG4gICAqL1xuICBjb25zdCBjb21wYWN0SGVhZGVyID0gKG46IG51bWJlcikgPT5cbiAgICBuIDw9IExPV19WQUxVRSA/IDEgOiBuIDw9IEhJR0hfVkFMVUUgPyAyIDogMztcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcGFyYW0gc2l6ZSBieXRlcyBwZXIgZWFjaCBlbGVtZW50XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXlcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RBcnJheVNpemUgPSAobjogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+XG4gICAgY29tcGFjdEhlYWRlcihuKSArIG4gKiBzaXplO1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdHhzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlVHhTaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyUGsgPSBbZmVlUGF5ZXIudG9CYXNlNTgoKV07XG5cbiAgICBjb25zdCBzaWduZXJzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuICAgIGNvbnN0IGFjY291bnRzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuXG4gICAgY29uc3QgaXhzU2l6ZSA9IHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaXgpID0+IHtcbiAgICAgIGl4LmtleXMuZm9yRWFjaCgoeyBwdWJrZXksIGlzU2lnbmVyIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGsgPSBwdWJrZXkudG9CYXNlNTgoKTtcbiAgICAgICAgaWYgKGlzU2lnbmVyKSBzaWduZXJzLmFkZChwayk7XG4gICAgICAgIGFjY291bnRzLmFkZChwayk7XG4gICAgICB9KTtcblxuICAgICAgYWNjb3VudHMuYWRkKGl4LnByb2dyYW1JZC50b0Jhc2U1OCgpKTtcblxuICAgICAgY29uc3QgbkluZGV4ZXMgPSBpeC5rZXlzLmxlbmd0aDtcbiAgICAgIGNvbnN0IG9wYXF1ZURhdGEgPSBpeC5kYXRhLmxlbmd0aDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgYWNjICtcbiAgICAgICAgMSArIC8vIFBJRCBpbmRleFxuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG5JbmRleGVzLCAxKSArXG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUob3BhcXVlRGF0YSwgMSlcbiAgICAgICk7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgY29tcGFjdEFycmF5U2l6ZShzaWduZXJzLnNpemUsIDY0KSArIC8vIHNpZ25hdHVyZXNcbiAgICAgIDMgKyAvLyBoZWFkZXJcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoYWNjb3VudHMuc2l6ZSwgMzIpICsgLy8gYWNjb3VudHNcbiAgICAgIDMyICsgLy8gYmxvY2toYXNoXG4gICAgICBjb21wYWN0SGVhZGVyKHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5sZW5ndGgpICsgLy8gaW5zdHJ1Y3Rpb25zXG4gICAgICBpeHNTaXplXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgbWF4IHRyYW5zYWN0aW9uIHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBpc092ZXJUcmFuc2FjdGlvblNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBjYWxjdWxhdGVUeFNpemUodHJhbnNhY3Rpb24sIGZlZVBheWVyKSA+IE1BWF9UUkFOU0FDVElPTl9TSVpFO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBCYXRjaCB9IGZyb20gJy4vYmF0Y2gnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbW1vbiB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQYXJ0aWFsU2lnbiB9IGZyb20gJy4vcGFydGlhbC1zaWduJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDYWxjdWxhdGVUeHNpemUgfSBmcm9tICcuL2NhbGN1bGF0ZS10eHNpemUnO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uQnVpbGRlciA9IHtcbiAgLi4uQmF0Y2gsXG4gIC4uLkNhbGN1bGF0ZVR4c2l6ZSxcbiAgLi4uTWludCxcbiAgLi4uQ29tbW9uLFxuICAuLi5QYXJ0aWFsU2lnbixcbn07XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb24sIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUmVndWxhck5mdCB9IGZyb20gJ34vc3VpdGUtcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVmFsaWRhdG9yLCBWYWxpZGF0b3JFcnJvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFBoYW50b21Qcm92aWRlciB9IGZyb20gJ34vdHlwZXMvcGhhbnRvbSc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGhhbnRvbU1ldGFwbGV4IHtcbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50IGFuZCBORlQgbWludFxuICAgKlxuICAgKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9ICBpbnB1dFxuICAgKiBAcGFyYW0ge3N0cmluZ30gIGNsdXN0ZXJcbiAgICogQHBhcmFtIHtQaGFudG9tfSBwaGFudG9tIC8vcGhhbnRvbSB3YWxsZXQgb2JqZWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvciB8IFZhbGlkYXRvckVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIGNsdXN0ZXI6IHN0cmluZyxcbiAgICBwaGFudG9tOiBQaGFudG9tUHJvdmlkZXIsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3IgfCBWYWxpZGF0b3JFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpbnB1dC5maWxlUGF0aCB8fCAhaW5wdXQuc3RvcmFnZVR5cGUpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBmaWxlUGF0aCBvciBzdG9yYWdlVHlwZScpO1xuICAgICAgfVxuXG4gICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyIH0pO1xuXG4gICAgICAvL0NvbnZlcnQgcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnRcbiAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICApO1xuXG4gICAgICBjb25zdCByb3lhbHR5ID0gaW5wdXQucm95YWx0eSA/IGlucHV0LnJveWFsdHkgOiAwO1xuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSBDb252ZXJ0ZXIuUm95YWx0eS5pbnRvSW5mcmEocm95YWx0eSk7XG4gICAgICBjb25zdCBuZnRTdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgeyAuLi5pbnB1dCwgcHJvcGVydGllcyB9LFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG4gICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICBuZnRTdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICBpbnB1dC5zdG9yYWdlVHlwZSxcbiAgICAgICk7XG5cbiAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCBtaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaXNNdXRhYmxlID0gdHJ1ZTtcblxuICAgICAgZGVidWdMb2coJyMgcHJvcGVydGllczogJywgcHJvcGVydGllcyk7XG4gICAgICBkZWJ1Z0xvZygnIyBzZWxsZXJGZWVCYXNpc1BvaW50czogJywgc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgZGVidWdMb2coJyMgbWludDogJywgbWludC5wdWJrZXkpO1xuXG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbigpO1xuXG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IFJlZ3VsYXJOZnQuY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBwaGFudG9tLnB1YmxpY0tleSEsXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgcGhhbnRvbS5wdWJsaWNLZXkhLFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICBpbnN0cy5mb3JFYWNoKChpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgIHR4LmFkZChpbnN0KTtcbiAgICAgIH0pO1xuICAgICAgdHguZmVlUGF5ZXIgPSBwaGFudG9tLnB1YmxpY0tleSE7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaEFuZENvbnRleHQoKTtcbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai52YWx1ZS5ibG9ja2hhc2g7XG4gICAgICB0eC5wYXJ0aWFsU2lnbihtaW50LnRvS2V5cGFpcigpKTtcbiAgICAgIGNvbnN0IHNpZ25lZCA9IGF3YWl0IHBoYW50b20uc2lnblRyYW5zYWN0aW9uKHR4KTtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBzaWduZWQsIHNpZ25lZC5zaWduYXR1cmVzOiAnLFxuICAgICAgICBzaWduZWQsXG4gICAgICAgIHNpZ25lZC5zaWduYXR1cmVzLm1hcCgoc2lnKSA9PiBzaWcucHVibGljS2V5LnRvU3RyaW5nKCkpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNpZyA9IGF3YWl0IGNvbm5lY3Rpb24uc2VuZFJhd1RyYW5zYWN0aW9uKHNpZ25lZC5zZXJpYWxpemUoKSk7XG4gICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhzaWcpO1xuICAgICAgcmV0dXJuIG1pbnQucHVia2V5O1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBBZGRpbmcgbmV3IHRva2VuIHRvIGV4aXN0aW5nIHRva2VuXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSAgdG9rZW5cbiAgICogQHBhcmFtIHtQdWJrZXl9ICBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldFtdfSAgb3duZXJPck11bHRpc2lnXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgdG90YWxBbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9ICBtaW50RGVjaW1hbFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKFxuICAgIHRva2VuOiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmU8UHVia2V5PiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudCh0b3RhbEFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb248UHVia2V5PihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIHRva2VuLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICIvL0BpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVBbW91bnQgPSAoXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gYW1vdW50ICogMTAgKiogbWludERlY2ltYWw7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBCdXJuT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogQnVybiBleGlzdGluZyB0b2tlblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gICAgbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gICAgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gIG93bmVyT3JNdWx0aXNpZ1xuICAgKiBAcGFyYW0ge251bWJlcn0gICAgYnVybkFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gICAgdG9rZW5EZWNpbWFsc1xuICAgKiBAcGFyYW0ge1BhcnRpYWw8QnVybk9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBidXJuQW1vdW50OiBudW1iZXIsXG4gICAgdG9rZW5EZWNpbWFsczogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QnVybk9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgICBjb25zdCBrZXlwYWlycyA9IG93bmVyT3JNdWx0aXNpZy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIENhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQoYnVybkFtb3VudCwgdG9rZW5EZWNpbWFscyksXG4gICAgICAgIHRva2VuRGVjaW1hbHMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFtpbnN0XSwga2V5cGFpcnMsIHBheWVyLnRvS2V5cGFpcigpKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBzbGVlcCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFBhcnNlZEFjY291bnREYXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBNQVhfUkVUUklFUyA9IDEwO1xuICBjb25zdCBSRVRSWV9ERUxBWSA9IDU7XG4gIGNvbnN0IE5GVFNUT1JBR0VfR0FURVdBWSA9ICduZnRzdG9yYWdlLmxpbmsnO1xuXG4gIGNvbnN0IGNvbnZlcnRlciA9IChcbiAgICBtZXRhZGF0YTogTWV0YWRhdGEsXG4gICAganNvbjogT2ZmY2hhaW4sXG4gICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgcmV0dXJuIENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9Vc2VyKFxuICAgICAge1xuICAgICAgICBvbmNoYWluOiBtZXRhZGF0YSxcbiAgICAgICAgb2ZmY2hhaW46IGpzb24sXG4gICAgICB9LFxuICAgICAgdG9rZW5BbW91bnQsXG4gICAgKTtcbiAgfTtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gIGNvbnN0IGZldGNoUmV0cnkgPSBhc3luYyAodXJsOiBzdHJpbmcsIHJldHJpZXMgPSAwKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwucmVwbGFjZSgnaXBmcy5pbycsIE5GVFNUT1JBR0VfR0FURVdBWSkpO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHJldHJpZXMgPCBNQVhfUkVUUklFUykge1xuICAgICAgICBkZWJ1Z0xvZyhgRXJyb3IgZmV0Y2hpbmcgZGF0YSBmcm9tICR7dXJsfSwgJHtyZXRyaWVzfSwgJHtlcnJvcn1gKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoUkVUUllfREVMQVkpO1xuICAgICAgICByZXR1cm4gZmV0Y2hSZXRyeSh1cmwsIHJldHJpZXMgKyAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnTG9nKGBNYXggcmV0cmllcyByZWFjaGVkICgke01BWF9SRVRSSUVTfSlgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEByZXR1cm4ge1Byb21pc2U8UmVzdWx0PFRva2VuTWV0YWRhdGFbXXwgRXJyb3I+Pn1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhW10sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkVG9rZW5BY2NvdW50c0J5T3duZXIoXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkYXRhcyA9IGluZm8udmFsdWUubWFwKGFzeW5jIChkKSA9PiB7XG4gICAgICAgIGNvbnN0IG1pbnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby5taW50IGFzIFB1YmtleTtcbiAgICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby50b2tlbkFtb3VudFxuICAgICAgICAgIC5hbW91bnQgYXMgc3RyaW5nO1xuICAgICAgICBpZiAodG9rZW5BbW91bnQgPT09ICcxJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWV0YWRhdGEuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgICAgQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICAgIClcbiAgICAgICAgICAudGhlbihhc3luYyAobWV0YWRhdGEpID0+IHtcbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgICAgICAgICAgIHJldHVybiBmZXRjaFJldHJ5KG1ldGFkYXRhLmRhdGEudXJpKS50aGVuKChqc29uOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnRlcihtZXRhZGF0YSwganNvbiwgdG9rZW5BbW91bnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4gZGVidWdMb2coJyMgW0ZldGNoIGVycm9yXScsIGVycikpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZpbHRlcnMgPSAoYXdhaXQgUHJvbWlzZS5hbGwoZGF0YXMpKS5maWx0ZXIoXG4gICAgICAgIChkYXRhKSA9PiBkYXRhICE9PSB1bmRlZmluZWQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZpbHRlcnMgYXMgVG9rZW5NZXRhZGF0YVtdO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIEFjY291bnQuUGRhLmdldE1ldGFkYXRhKG1pbnQpLFxuICAgICAgKTtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmRCeU1pbnQgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgIGlmIChtZXRhZGF0YS50b2tlblN0YW5kYXJkID09PSAwKSB7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIGBUaGlzIG1pbnQgaXMgbm90IFNQTC1UT0tFTiwgdG9rZW5TdGFuZGFyZDoke21ldGFkYXRhLnRva2VuU3RhbmRhcmR9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBjb25uZWN0aW9uLmdldFBhcnNlZEFjY291bnRJbmZvKG1pbnQudG9QdWJsaWNLZXkoKSk7XG4gICAgICBjb25zdCB0b2tlbkFtb3VudCA9IChpbmZvLnZhbHVlPy5kYXRhIGFzIFBhcnNlZEFjY291bnREYXRhKS5wYXJzZWQuaW5mb1xuICAgICAgICAuc3VwcGx5IGFzIHN0cmluZztcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSAoYXdhaXQgKFxuICAgICAgICBhd2FpdCBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICkuanNvbigpKSBhcyBPZmZjaGFpbjtcbiAgICAgIHJldHVybiBjb252ZXJ0ZXIobWV0YWRhdGEsIHJlc3BvbnNlLCB0b2tlbkFtb3VudCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUZyZWV6ZUFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IEZyZWV6ZU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEZyZWV6aW5nIGEgdGFyZ2V0IG5mdFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGcmVlemVPcHRpb25zPn0gb3B0aW9ucyAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Jlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPn1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmcmVlemUgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxGcmVlemVPcHRpb25zPiA9IHt9LFxuICApOiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZUFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ldyBBY2NvdW50LktleXBhaXIoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVHJhbnNmZXIgd2l0aG91dCBzb2xhbmEgc29sLCBkZWxlZ2F0ZSBmZWVwYXllciBmb3IgY29tbWlzc2lvblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWxcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgZGVzdDogUHVia2V5LFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNLZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXJQdWJsaWNLZXkudG9TdHJpbmcoKSxcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgbGV0IGluc3QyO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG5cbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXR1cm4gYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICBpZiAoIWRlc3RUb2tlbi5pbnN0KSB7XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBbb3duZXIudG9LZXlwYWlyKCldLFxuICAgICAgICApO1xuICAgICAgICB0eC5hZGQoaW5zdDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmV0dXJuIGluc3RydWN0aW9uIGFuZCB1bmRlY2lkZWQgYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBbb3duZXIudG9LZXlwYWlyKCldLFxuICAgICAgICApO1xuICAgICAgICB0eC5hZGQoZGVzdFRva2VuLmluc3QpLmFkZChpbnN0Mik7XG4gICAgICB9XG5cbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICB0eC5wYXJ0aWFsU2lnbihvd25lci50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKGhleCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBTeXN0ZW1Qcm9ncmFtLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQXV0aG9yaXR5VHlwZSxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCxcbiAgTUlOVF9TSVpFLFxuICBUT0tFTl9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24sXG4gIERhdGFWMixcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlRnJlZXplQXV0aG9yaXR5ID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogUHVibGljS2V5LFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBBdXRob3JpdHlUeXBlLkZyZWV6ZUFjY291bnQsXG4gICAgICBmcmVlemVBdXRob3JpdHksXG4gICAgKTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgdG9rZW5NZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9IGF3YWl0IGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQoY29ubmVjdGlvbik7XG4gICAgY29uc3QgbWV0YWRhdGFQZGEgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRva2VuQXNzb2NpYXRlZCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICAgIHNwYWNlOiBNSU5UX1NJWkUsXG4gICAgICAgIGxhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBvd25lcixcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgICBvd25lcixcbiAgICAgICAgbWludCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhUGRhLFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICAgIGRhdGE6IHRva2VuTWV0YWRhdGEsXG4gICAgICAgICAgICBpc011dGFibGUsXG4gICAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBpbnN0cnVjdGlvbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNQTC1UT0tFTiBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgIC8vIHRva2VuIG93bmVyIFNlY3JldFxuICAgKiBAcGFyYW0ge251bWJlcn0gdG90YWxBbW91bnQgLy8gdG90YWwgbnVtYmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW50RGVjaW1hbCAvLyB0b2tlbiBkZWNpbWFsXG4gICAqIEBwYXJhbSB7SW5wdXRUb2tlbk1ldGFkYXRhfSBpbnB1dCAgICAgICAvLyB0b2tlbiBtZXRhZGF0YVxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRJbnN0cnVjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgaW5wdXQ6IElucHV0VG9rZW5NZXRhZGF0YSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0VG9rZW5NZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogb3duZXI7XG4gICAgICBpbnB1dC5yb3lhbHR5ID0gMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gMDtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuXG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQgYXMgSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgICAgaW5wdXQucm95YWx0eSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgLy8gdXBsb2FkIGZpbGVcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydGVyLlRva2VuTWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXJpKTtcblxuICAgICAgY29uc3QgbWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGluc3RzID0gYXdhaXQgY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgdG90YWxBbW91bnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRnJlZXplQXV0aG9yaXR5KFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5NaW50KFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpLCBtaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG1pbnQucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBpc0Jyb3dzZXIsIGlzTm9kZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IEZpbGVUeXBlLCBJZGVudGl0eSwgVGFncywgVXBsb2FkYWJsZUZpbGVUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IFBoYW50b21Qcm92aWRlciB9IGZyb20gJ34vdHlwZXMvcGhhbnRvbSc7XG5pbXBvcnQgSXJ5cywgeyBXZWJJcnlzIH0gZnJvbSAnQGlyeXMvc2RrJztcbmltcG9ydCB7IFVwbG9hZFJlc3BvbnNlIH0gZnJvbSAnQGlyeXMvc2RrL2J1aWxkL2VzbS9jb21tb24vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFByb3ZlbmFuY2VMYXllciB7XG4gIGNvbnN0IFRPS0VOID0gJ3NvbGFuYSc7XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgdXBsb2FkRmlsZTogRmlsZVR5cGUsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICAgIHRhZ3M/OiBUYWdzLFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBsZXQgcmVjZWlwdCE6IFVwbG9hZFJlc3BvbnNlO1xuICAgIGlmIChpc1VwbG9hZGFibGUodXBsb2FkRmlsZSkpIHtcbiAgICAgIHJlY2VpcHQgPSBhd2FpdCBpcnlzLnVwbG9hZEZpbGUodXBsb2FkRmlsZSwgeyB0YWdzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggZmlsZSB0eXBlIG9yIGVudmlyb21lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke0NvbnN0YW50cy5JUllTX0dBVEVXQVlfVVJMfS8ke3JlY2VpcHQuaWR9YDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBkYXRhOiBzdHJpbmcsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICAgIHRhZ3M/OiBUYWdzLFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCByZWNlaXB0ID0gYXdhaXQgaXJ5cy51cGxvYWQoZGF0YSwgeyB0YWdzIH0pO1xuICAgIHJldHVybiBgJHtDb25zdGFudHMuSVJZU19HQVRFV0FZX1VSTH0vJHtyZWNlaXB0LmlkfWA7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzTm9kZWFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNCcm93c2VyYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEZpbGUgPT4ge1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1VwbG9hZGFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBVcGxvYWRhYmxlRmlsZVR5cGUgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZnVuZEFyd2VhdmUgPSBhc3luYyAoXG4gICAgdXBsb2FkRmlsZTogRmlsZVR5cGUsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgYnl0ZUxlbmd0aCA9IGF3YWl0IHRvQnl0ZUxlbmd0aCh1cGxvYWRGaWxlKTtcbiAgICBjb25zdCB3aWxsUGF5ID0gYXdhaXQgY2FsY3VsYXRlQ29zdChieXRlTGVuZ3RoLCBpZGVudGl0eSk7XG4gICAgY29uc3QgZnVuZFR4ID0gYXdhaXQgaXJ5cy5mdW5kKGlyeXMudXRpbHMudG9BdG9taWMod2lsbFBheSkpO1xuICAgIGRlYnVnTG9nKCcjIGZ1bmRUeDogJywgZnVuZFR4KTtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IHRvQnl0ZUxlbmd0aCA9IGFzeW5jIChjb250ZW50OiBGaWxlVHlwZSk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgbGV0IGxlbmd0aDogbnVtYmVyID0gMTAwO1xuICAgIGlmIChpc05vZGVhYmxlKGNvbnRlbnQpKSB7XG4gICAgICBsZW5ndGggPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoY29udGVudCkubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyYWJsZShjb250ZW50KSkge1xuICAgICAgbGVuZ3RoID0gY29udGVudC5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggY29udGVudCB0eXBlJyk7XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXRJcnlzID0gYXN5bmMgPFQgZXh0ZW5kcyBJcnlzIHwgV2ViSXJ5cz4oXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICApID0+IHtcbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZ2V0Tm9kZUlyeXMoaWRlbnRpdHkgYXMgU2VjcmV0KSkgYXMgVDtcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGdldEJyb3dzZXJJcnlzKGlkZW50aXR5IGFzIFBoYW50b21Qcm92aWRlcikpIGFzIFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdPbmx5IE5vZGUuanMgb3IgQnJvd3NlcicpO1xuICAgIH1cbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldE5vZGVJcnlzID0gYXN5bmMgKHNlY3JldDogU2VjcmV0KSA9PiB7XG4gICAgY29uc3QgY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICB9KTtcbiAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMO1xuICAgIGNvbnN0IHRva2VuID0gVE9LRU47XG4gICAgY29uc3Qga2V5ID0gc2VjcmV0O1xuICAgIGNvbnN0IGlyeXMgPSBuZXcgSXJ5cyh7XG4gICAgICB1cmwsXG4gICAgICB0b2tlbixcbiAgICAgIGtleSxcbiAgICAgIGNvbmZpZzogeyBwcm92aWRlclVybDogY2x1c3RlclVybCB9LFxuICAgIH0pO1xuICAgIHJldHVybiBpcnlzO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0QnJvd3NlcklyeXMgPSBhc3luYyAoXG4gICAgcHJvdmlkZXI6IFBoYW50b21Qcm92aWRlcixcbiAgKTogUHJvbWlzZTxXZWJJcnlzPiA9PiB7XG4gICAgY29uc3QgY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICB9KTtcbiAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMO1xuICAgIGNvbnN0IHRva2VuID0gVE9LRU47XG4gICAgY29uc3Qgd2FsbGV0ID0geyBycGNVcmw6IGNsdXN0ZXJVcmwsIG5hbWU6IFRPS0VOLCBwcm92aWRlcjogcHJvdmlkZXIgfTtcbiAgICBjb25zdCB3ZWJJcnlzID0gbmV3IFdlYklyeXMoeyB1cmwsIHRva2VuLCB3YWxsZXQgfSk7XG4gICAgYXdhaXQgd2ViSXJ5cy5yZWFkeSgpO1xuICAgIHJldHVybiB3ZWJJcnlzO1xuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZUNvc3QgPSBhc3luYyAoc2l6ZTogbnVtYmVyLCBpZGVudGl0eTogSWRlbnRpdHkpID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgcHJpY2VBdG9taWMgPSBhd2FpdCBpcnlzLmdldFByaWNlKHNpemUpO1xuICAgIGNvbnN0IHByaWNlQ29udmVydGVkID0gaXJ5cy51dGlscy5mcm9tQXRvbWljKHByaWNlQXRvbWljKTtcbiAgICBkZWJ1Z0xvZygnIyBzaXplOiAnLCBzaXplKTtcbiAgICBkZWJ1Z0xvZyhgIyBwcmljZTogJHtwcmljZUNvbnZlcnRlZH1gKTtcbiAgICByZXR1cm4gcHJpY2VDb252ZXJ0ZWQ7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHJvdmVuYW5jZUxheWVyIH0gZnJvbSAnLi9wcm92ZW5hbmNlLWxheWVyJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFyd2VhdmUge1xuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IChcbiAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBmaWxlOiAnLCBmaWxlUGF0aCk7XG4gICAgICBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIuZnVuZEFyd2VhdmUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICAgIHJldHVybiBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIudXBsb2FkRmlsZShmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gKFxuICAgIG1ldGFkYXRhOiBPZmZjaGFpbixcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGEgZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgcmV0dXJuIGF3YWl0IFByb3ZlbmFuY2VMYXllci51cGxvYWREYXRhKFxuICAgICAgICBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSksXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBCbG9iLCBORlRTdG9yYWdlIH0gZnJvbSAnbmZ0LnN0b3JhZ2UnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQcm92ZW5hbmNlTGF5ZXIgfSBmcm9tICcuL3Byb3ZlbmFuY2UtbGF5ZXInO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOZnRTdG9yYWdlIHtcbiAgY29uc3QgY3JlYXRlR2F0ZXdheVVybCA9IChjaWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGAke0NvbnN0YW50cy5ORlRfU1RPUkFHRV9HQVRFV0FZX1VSTH0vJHtjaWR9YDtcblxuICBjb25zdCBjb25uZWN0ID0gKCkgPT4ge1xuICAgIENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuY2FsY3VsYXRlUHJvYmFiaWxpdHkoKSAmJlxuICAgICAgY29uc29sZS53YXJuKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuTkZUX1NUT1JBR0VfQVBJX0tFWSk7XG4gICAgcmV0dXJuIG5ldyBORlRTdG9yYWdlKHsgdG9rZW46IENvbnN0YW50cy5ORlRfU1RPUkFHRV9BUElfS0VZIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIGZpbGVUeXBlOiBGaWxlVHlwZSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlVHlwZSk7XG4gICAgICBsZXQgZmlsZSE6IEJ1ZmZlcjtcbiAgICAgIGlmIChQcm92ZW5hbmNlTGF5ZXIuaXNOb2RlYWJsZShmaWxlVHlwZSkpIHtcbiAgICAgICAgZmlsZSA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlVHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKFByb3ZlbmFuY2VMYXllci5pc0Jyb3dzZXJhYmxlKGZpbGVUeXBlKSkge1xuICAgICAgICBmaWxlID0gQnVmZmVyLmZyb20oYXdhaXQgZmlsZVR5cGUuYXJyYXlCdWZmZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlID0gQnVmZmVyLmZyb20oZmlsZVR5cGUgYXMgQXJyYXlCdWZmZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9iSW1hZ2UgPSBuZXcgQmxvYihbZmlsZV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSW1hZ2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnRcbiAgICpcbiAgICogQHBhcmFtIHtPZmZjaGFpbn0gc3RvcmFnZURhdGFcbiAgICoge1xuICAgKiAgIG5hbWU/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZGVzY3JpcHRpb24/OiB7c3RyaW5nfSAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgc2VsbGVyRmVlQmFzaXNQb2ludHM/OiBudW1iZXIgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGltYWdlPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAvLyB1cGxvYWRlZCB1cmkgb2Ygb3JpZ2luYWwgY29udGVudFxuICAgKiAgIGV4dGVybmFsX3VybD86IHtzdHJpbmd9ICAgICAgICAgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IHtKc29uTWV0YWRhdGFBdHRyaWJ1dGVbXX0gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiB7SnNvbk1ldGFkYXRhUHJvcGVydGllczxVcmk+fSAvLyBpbmNsdWRlZCBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uICAgICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddOiB7dW5rbm93bn0gICAgICAgICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIHN0b3JhZ2VEYXRhOiBPZmZjaGFpbixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhZGF0YTogJywgc3RvcmFnZURhdGEpO1xuXG4gICAgICBjb25zdCBibG9iSnNvbiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzdG9yYWdlRGF0YSldKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkpzb24pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluLCBTdG9yYWdlVHlwZSB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBBcndlYXZlIH0gZnJvbSAnLi9hcndlYXZlJztcbmltcG9ydCB7IE5mdFN0b3JhZ2UgfSBmcm9tICcuL25mdC1zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTdG9yYWdlIHtcbiAgZXhwb3J0IGNvbnN0IHRvQ29udmVydE9mZmNoYWluZGF0YSA9IChcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICApOiBPZmZjaGFpbiA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgIGRlc2NyaXB0aW9uOiBpbnB1dC5kZXNjcmlwdGlvbixcbiAgICAgIHNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzOiBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgIGV4dGVybmFsX3VybDogaW5wdXQuZXh0ZXJuYWxfdXJsLFxuICAgICAgYXR0cmlidXRlczogaW5wdXQuYXR0cmlidXRlcyxcbiAgICAgIHByb3BlcnRpZXM6IGlucHV0LnByb3BlcnRpZXMsXG4gICAgICBpbWFnZTogJycsXG4gICAgICBvcHRpb25zOiBpbnB1dC5vcHRpb25zLFxuICAgIH07XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWRGaWxlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWRGaWxlKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBzdG9yYWdlVHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBpbnB1dDogT2ZmY2hhaW4sXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZERhdGEoaW5wdXQsIGZlZVBheWVyKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZERhdGEoaW5wdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IE9mZmNoYWluLFxuICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScgJiYgIWZlZVBheWVyKSB7XG4gICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgfVxuICAgIGNvbnN0IHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICBhd2FpdCB1cGxvYWRGaWxlKGZpbGVQYXRoLCBzdG9yYWdlVHlwZSwgZmVlUGF5ZXIpXG4gICAgKS51bndyYXAoXG4gICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICByZXR1cm4gYXdhaXQgdXBsb2FkRGF0YShpbnB1dCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgIH0sXG4gICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9LFxuICAgICk7XG5cbiAgICBpZiAoIXN0b3JhZ2UpIHtcbiAgICAgIHRocm93IEVycm9yKCdFbXB0eSBzdG9yYWdlIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gc3RvcmFnZTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7XG4gIGNyZWF0ZVRoYXdBY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBUaGF3T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVGhhd2luZyBhIHRhcmdldCBORlRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gc2V0dGVkIGZyZWV6ZSBhdXRob3JpdHkgb2YgbmZ0XG4gICAqIEBwYXJhbSB7UGFydGlhbDxUaGF3T3B0aW9ucz59IG9wdGlvbnMgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiB7UmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+fVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRoYXcgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgb3B0aW9uczogUGFydGlhbDxUaGF3T3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEFjY291bnQuS2V5cGFpcih7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRvciB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVHJhbnNmZXIgTkZUIGZvciBvbmx5IG11bHRpU2lnIGFjY291bnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgICAvLyBtaW50ZWQgYWNjb3VudFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAgIC8vIGN1cnJlbnQgbXVsdGlzaWcgb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3QgICAgICAgICAgICAgICAvLyBuZXcgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gb3duZXJPck11bHRpc2lnICAvLyBvd25lciBvciBtdWx0aXNpZyBhY2NvdW50IFNlY3JldFxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50ICAgICAgICAgICAgIC8vIHdhbnQgdG8gdHJhbnNmZXIgU09MIGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWwgICAgICAgIC8vIG1pbnRlZCB0b2tlbiBkZWNpbWFsXG4gICAqIEBwYXJhbSB7UGFydGlhbDxNaW50T3B0aW9ucz59IG9wdGlvbnMgICAgICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPHVua25vd24+LCBFcnJvcj4gfVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgICBjb25zdCBrZXlwYWlycyA9IG93bmVyT3JNdWx0aXNpZy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5yZXRyeUdldE9yQ3JlYXRlKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgbWludCxcbiAgICAgICAgZGVzdCxcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIENhbGN1bGF0b3IuY2FsY3VsYXRlQW1vdW50KGFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFNwbFRva2VuIGFzIEFkZCB9IGZyb20gJy4vYWRkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGcmVlemUgfSBmcm9tICcuL2ZyZWV6ZSc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBHYXNMZXNzIH0gZnJvbSAnLi9nYXMtbGVzcy10cmFuc2Zlcic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IGNvbnN0IFNwbFRva2VuID0ge1xuICAuLi5BZGQsXG4gIC4uLkJ1cm4sXG4gIC4uLkZpbmQsXG4gIC4uLkZyZWV6ZSxcbiAgLi4uR2FzTGVzcyxcbiAgLi4uTWludCxcbiAgLi4uVGhhdyxcbiAgLi4uVHJhbnNmZXIsXG59O1xuXG5leHBvcnQgKiBmcm9tICd+L3NoYXJlZC9leHBvcnRzJztcbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ34vc3VpdGUtc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBCdXJuT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICAvKipcbiAgICogQnVybiBleGlzdGluZyB0b2tlblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gIG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9ICBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldFtdfSAgb3duZXJPck11bHRpc2lnXG4gICAqIEBwYXJhbSB7UGFydGlhbDxCdXJuT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgYnVybiA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QnVybk9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgY29uc3QgZmVlUGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IG93bmVyT3JNdWx0aXNpZ1swXTtcbiAgICByZXR1cm4gU3BsVG9rZW4uYnVybihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIG93bmVyT3JNdWx0aXNpZyxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICB7XG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgfSxcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQXNzZXQsIEFzc2V0UHJvb2YsIEFzc2V0cyB9IGZyb20gJ34vdHlwZXMvZGFzLWFwaSc7XG5pbXBvcnQgeyBTb3J0YWJsZSB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgRGFzQXBpIHtcbiAgY29uc3QgY29ubmVjdCA9IGFzeW5jIChcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICBwYXJhbXM6IChzdHJpbmcgfCBQdWJrZXkgfCBTb3J0YWJsZSB8IG51bWJlciB8IHVuZGVmaW5lZClbXSxcbiAgKSA9PiB7XG4gICAgQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5jYWxjdWxhdGVQcm9iYWJpbGl0eSgpICYmXG4gICAgICBjb25zb2xlLndhcm4oQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5EQVNfQVBJX1VSTCk7XG4gICAgZGVidWdMb2coJyMgZGFzIGFwaSB1cmw6ICcsIENvbnN0YW50cy5EQVNfQVBJX1VSTCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChDb25zdGFudHMuREFTX0FQSV9VUkwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGpzb25ycGM6ICcyLjAnLFxuICAgICAgICBtZXRob2QsXG4gICAgICAgIGlkOiAnY29tcHJlc3Npb24nLFxuICAgICAgICBwYXJhbXMsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICByZXR1cm4gKGF3YWl0IHJlc3BvbnNlLmpzb24oKSkucmVzdWx0O1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldFByb29mID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRQcm9vZiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXRQcm9vZicsIFthc3NldElkXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0ID0gYXN5bmMgKFxuICAgIGFzc2V0SWQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXQsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0JywgW2Fzc2V0SWRdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRzQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lckFkZHJlc3M6IFB1YmtleSxcbiAgICBsaW1pdDogbnVtYmVyID0gMTAwMCxcbiAgICBwYWdlOiBudW1iZXIgPSAxLFxuICAgIHNvcnRCeT86IFNvcnRhYmxlLFxuICAgIGJlZm9yZT86IHN0cmluZyxcbiAgICBhZnRlcj86IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldHNCeU93bmVyJywgW1xuICAgICAgICBvd25lckFkZHJlc3MsXG4gICAgICAgIHNvcnRCeSxcbiAgICAgICAgbGltaXQsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGJlZm9yZSxcbiAgICAgICAgYWZ0ZXIsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXRzQnlHcm91cCA9IGFzeW5jIChcbiAgICBncm91cEtleTogc3RyaW5nLFxuICAgIGdyb3VwVmFsdWU6IFB1YmtleSxcbiAgICBsaW1pdDogbnVtYmVyID0gMTAwMCxcbiAgICBwYWdlOiBudW1iZXIgPSAxLFxuICAgIHNvcnRCeT86IFNvcnRhYmxlLFxuICAgIGJlZm9yZT86IHN0cmluZyxcbiAgICBhZnRlcj86IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8QXNzZXRzLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldHNCeUdyb3VwJywgW1xuICAgICAgICBncm91cEtleSxcbiAgICAgICAgZ3JvdXBWYWx1ZSxcbiAgICAgICAgc29ydEJ5LFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgYmVmb3JlLFxuICAgICAgICBhZnRlcixcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNZXRhZGF0YSwgTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBGaW5kT3B0aW9ucywgU29ydGFibGUsIFNvcnRCeSwgU29ydERpcmVjdGlvbiB9IGZyb20gJ34vdHlwZXMvZmluZCc7XG5pbXBvcnQgeyBEYXNBcGkgYXMgQXBpIH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgRGFzQXBpIHtcbiAgLy9AaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGRlZmF1bHRTb3J0Qnk6IFNvcnRhYmxlID0ge1xuICAgIHNvcnRCeTogU29ydEJ5LlJlY2VudCxcbiAgICBzb3J0RGlyZWN0aW9uOiBTb3J0RGlyZWN0aW9uLkRlc2MsXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGZldGNoT2ZmY2hhaW4gPSBhc3luYyAodXJpOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgKGF3YWl0IGZldGNoKHVyaSkpLmpzb24oKTtcbiAgICByZXR1cm4ganNvbjtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBpc0NvbXByZXNzZWQ6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8UGFydGlhbDxNZXRhZGF0YT4+ID0+IHtcbiAgICBjb25zdCBhc3NldCA9IGF3YWl0IEFwaS5nZXRBc3NldChtaW50KTtcbiAgICBpZiAoYXNzZXQuaXNFcnIpIHtcbiAgICAgIHRocm93IGFzc2V0LmVycm9yO1xuICAgIH1cblxuICAgIGlmIChhc3NldC52YWx1ZS5jb21wcmVzc2lvbi5jb21wcmVzc2VkID09PSBpc0NvbXByZXNzZWQpIHtcbiAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oXG4gICAgICAgIGFzc2V0LnZhbHVlLmNvbnRlbnQuanNvbl91cmksXG4gICAgICApO1xuICAgICAgY29uc3QgbWVyZ2VkID0ge1xuICAgICAgICBvbmNoYWluOiBhc3NldC52YWx1ZSxcbiAgICAgICAgb2ZmY2hhaW46IG9mZmNoYWluLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBDb252ZXJ0ZXIuTmZ0LmludG9Vc2VyKG1lcmdlZCk7XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfTtcblxuICAvKipcbiAgICogRmluZCBuZnQgYnkgb3duZXIgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0NvbXByZXNzZWRcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8TmZ0TWV0YWRhdGE+ID0+IHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHNvcnRCeTogZGVmYXVsdFNvcnRCeSxcbiAgICB9O1xuICAgIGNvbnN0IHsgbGltaXQsIHBhZ2UsIHNvcnRCeSwgYmVmb3JlLCBhZnRlciB9ID0ge1xuICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG5cbiAgICBjb25zdCBhc3NldHMgPSBhd2FpdCBBcGkuZ2V0QXNzZXRzQnlPd25lcihcbiAgICAgIG93bmVyLFxuICAgICAgbGltaXQsXG4gICAgICBwYWdlLFxuICAgICAgc29ydEJ5LFxuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgKTtcbiAgICBpZiAoYXNzZXRzLmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldHMuZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBhc3NldHMudmFsdWUuaXRlbXM7XG5cbiAgICBjb25zdCBtZXRhZGF0YXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGl0ZW1zXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKVxuICAgICAgICAubWFwKGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oXG4gICAgICAgICAgICAgIGl0ZW0uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSB7XG4gICAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgZGVidWdMb2coJyMgRmFpbGVkIGZldGNoIG9mZmNoYWluIHVybDogJywgaXRlbS5jb250ZW50Lmpzb25fdXJpKTtcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0ZXIuTmZ0LmludG9Vc2VyKHtcbiAgICAgICAgICAgICAgb25jaGFpbjogaXRlbSxcbiAgICAgICAgICAgICAgb2ZmY2hhaW46IHt9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiBhc3NldHMudmFsdWUucGFnZSxcbiAgICAgIHRvdGFsOiBhc3NldHMudmFsdWUudG90YWwsXG4gICAgICBsaW1pdDogYXNzZXRzLnZhbHVlLmxpbWl0LFxuICAgICAgbWV0YWRhdGFzLFxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IGNvbGxlY3Rpb24gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gY29sbGVjdGlvbk1pbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBpc0NvbXByZXNzZWQsXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlDb2xsZWN0aW9uID0gYXN5bmMgKFxuICAgIGNvbGxlY3Rpb25NaW50OiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RmluZE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8TmZ0TWV0YWRhdGE+ID0+IHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgIGxpbWl0OiAxMDAwLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHNvcnRCeTogZGVmYXVsdFNvcnRCeSxcbiAgICB9O1xuICAgIGNvbnN0IHsgbGltaXQsIHBhZ2UsIHNvcnRCeSwgYmVmb3JlLCBhZnRlciB9ID0ge1xuICAgICAgLi4uZGVmYXVsdE9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG5cbiAgICBjb25zdCBhc3NldHMgPSBhd2FpdCBBcGkuZ2V0QXNzZXRzQnlHcm91cChcbiAgICAgICdjb2xsZWN0aW9uJyxcbiAgICAgIGNvbGxlY3Rpb25NaW50LFxuICAgICAgbGltaXQsXG4gICAgICBwYWdlLFxuICAgICAgc29ydEJ5LFxuICAgICAgYmVmb3JlLFxuICAgICAgYWZ0ZXIsXG4gICAgKTtcbiAgICBpZiAoYXNzZXRzLmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldHMuZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBhc3NldHMudmFsdWUuaXRlbXM7XG5cbiAgICBjb25zdCBtZXRhZGF0YXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGl0ZW1zXG4gICAgICAgIC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKVxuICAgICAgICAubWFwKGFzeW5jIChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2ZmY2hhaW46IE9mZmNoYWluID0gYXdhaXQgZmV0Y2hPZmZjaGFpbihpdGVtLmNvbnRlbnQuanNvbl91cmkpO1xuICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICBvZmZjaGFpbjogb2ZmY2hhaW4sXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgICAgICB9KSxcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiBhc3NldHMudmFsdWUucGFnZSxcbiAgICAgIHRvdGFsOiBhc3NldHMudmFsdWUudG90YWwsXG4gICAgICBsaW1pdDogYXNzZXRzLnZhbHVlLmxpbWl0LFxuICAgICAgbWV0YWRhdGFzLFxuICAgIH07XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgRGFzQXBpIGFzIEFwaSB9IGZyb20gJy4vYXBpJztcbmltcG9ydCB7IERhc0FwaSBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcblxuZXhwb3J0IGNvbnN0IERhc0FwaSA9IHtcbiAgLi4uQXBpLFxuICAuLi5GaW5kLFxufTtcbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IERhc0FwaSB9IGZyb20gJ34vZGFzLWFwaSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTWV0YWRhdGEsIE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9uZnQnO1xuaW1wb3J0IHsgRmluZE9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2ZpbmQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICAvKipcbiAgICogRmluZCBuZnQgYnkgb3duZXIgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZpbmRPcHRpb25zPn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PENvbXByZXNzZWROZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxGaW5kT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IERhc0FwaS5maW5kQnlPd25lcihvd25lciwgZmFsc2UsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBtaW50IGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsPE1ldGFkYXRhPiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgRGFzQXBpLmZpbmRCeU1pbnQobWludCwgZmFsc2UpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBjb2xsZWN0aW9uIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IGNvbGxlY3Rpb25NaW50XG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlDb2xsZWN0aW9uID0gYXN5bmMgKFxuICAgIGNvbGxlY3Rpb25NaW50OiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxGaW5kT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIERhc0FwaS5maW5kQnlDb2xsZWN0aW9uKGNvbGxlY3Rpb25NaW50LCBmYWxzZSwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5pbXBvcnQgeyBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGNyZWF0ZUZyZWV6ZURlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBGcmVlemVPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIC8qKlxuICAgKiBGcmVlemluZyBhIHRhcmdldCBuZnRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEZyZWV6ZU9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZnJlZXplID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RnJlZXplT3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGVkaXRpb25BZGRyZXNzID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZURlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbih7XG4gICAgICAgIGRlbGVnYXRlOiBuZXcgQWNjb3VudC5LZXlwYWlyKHtcbiAgICAgICAgICBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSxcbiAgICAgICAgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG9rZW5BY2NvdW50OiB0b2tlbkFjY291bnQsXG4gICAgICAgIGVkaXRpb246IGVkaXRpb25BZGRyZXNzLFxuICAgICAgICBtaW50OiBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQXBwcm92ZUluc3RydWN0aW9uLFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQsXG4gIE1JTlRfU0laRSxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ34vc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhLCBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uLFxuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBjcmVhdGVTaWduTWV0YWRhdGFJbnN0cnVjdGlvbixcbiAgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uSXRlbUluc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlVmVyaWZ5Q3JlYXRvciA9IChtaW50OiBQdWJsaWNLZXksIGNyZWF0b3I6IFB1YmxpY0tleSkgPT4ge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICByZXR1cm4gY3JlYXRlU2lnbk1ldGFkYXRhSW5zdHJ1Y3Rpb24oe1xuICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxuICAgICAgY3JlYXRvcjogY3JlYXRvcixcbiAgICB9KTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlRGVsZWFnYXRlID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGRlbGVnYXRlQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcblxuICAgIHJldHVybiBjcmVhdGVBcHByb3ZlSW5zdHJ1Y3Rpb24oXG4gICAgICB0b2tlbkFjY291bnQsXG4gICAgICBkZWxlZ2F0ZUF1dGhvcml0eSxcbiAgICAgIG93bmVyLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICApO1xuICB9O1xuXG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb24gPSAoXG4gICAgY29sbGVjdGlvbkNoaWxkOiBQdWJsaWNLZXksXG4gICAgY29sbGVjdGlvblBhcmVudDogUHVibGljS2V5LFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YSA9IEFjY291bnQuUGRhLmdldE1ldGFkYXRhKFxuICAgICAgY29sbGVjdGlvblBhcmVudC50b1N0cmluZygpLFxuICAgICk7XG4gICAgY29uc3QgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihcbiAgICAgIGNvbGxlY3Rpb25QYXJlbnQudG9TdHJpbmcoKSxcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVWZXJpZnlTaXplZENvbGxlY3Rpb25JdGVtSW5zdHJ1Y3Rpb24oe1xuICAgICAgY29sbGVjdGlvbjogY29sbGVjdGlvbk1ldGFkYXRhLFxuICAgICAgY29sbGVjdGlvbk1hc3RlckVkaXRpb25BY2NvdW50OiBjb2xsZWN0aW9uTWFzdGVyRWRpdGlvbkFjY291bnQsXG4gICAgICBjb2xsZWN0aW9uTWludDogY29sbGVjdGlvblBhcmVudCxcbiAgICAgIG1ldGFkYXRhOiBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShjb2xsZWN0aW9uQ2hpbGQudG9TdHJpbmcoKSksXG4gICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICBjb2xsZWN0aW9uQXV0aG9yaXR5OiBmZWVQYXllcixcbiAgICB9KTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBuZnRNZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGF0YSA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcbiAgICBjb25zdCB0b2tlbk1ldGFkYXRhUHVia2V5ID0gQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtYXN0ZXJFZGl0aW9uUHVia2V5ID0gQWNjb3VudC5QZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICAgIGxhbXBvcnRzOiBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pLFxuICAgICAgICBzcGFjZTogTUlOVF9TSVpFLFxuICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihtaW50LCAwLCBvd25lciwgb3duZXIpKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKGZlZVBheWVyLCBhdGEsIG93bmVyLCBtaW50KSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKG1pbnQsIGF0YSwgb3duZXIsIDEsIDApKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIG1ldGFkYXRhOiB0b2tlbk1ldGFkYXRhUHVia2V5LFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICAgIGRhdGE6IG5mdE1ldGFkYXRhLFxuICAgICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQ3JlYXRlTWFzdGVyRWRpdGlvblYzSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBlZGl0aW9uOiBtYXN0ZXJFZGl0aW9uUHVia2V5LFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgICAgbWV0YWRhdGE6IHRva2VuTWV0YWRhdGFQdWJrZXksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNYXN0ZXJFZGl0aW9uQXJnczoge1xuICAgICAgICAgICAgbWF4U3VwcGx5OiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnQgYW5kIE5GVCBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7SW5wdXROZnRNZXRhZGF0YX0gaW5wdXRcbiAgICoge1xuICAgKiAgIG5hbWU6IHN0cmluZyAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w6IHN0cmluZyAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGZpbGVQYXRoOiBzdHJpbmcgfCBGaWxlICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgcm95YWx0eTogbnVtYmVyICAgICAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgc3RvcmFnZVR5cGU6ICdhcndlYXZlJ3wnbmZ0U3RvcmFnZScgLy8gRGVjZW50cmFsaXplZCBzdG9yYWdlXG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgY3JlYXRvcnM/OiBJbnB1dENyZWF0b3JzW10gICAgLy8gb3RoZXIgY3JlYXRvcnMgdGhhbiBvd25lclxuICAgKiAgIHVzZXM/OiBVc2VzICAgICAgICAgICAgICAgICAgIC8vIHVzYWdlIGZlYXR1cmU6IGJ1cm4sIHNpbmdsZSwgbXVsdGlwbGVcbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogICBvcHRpb25zPzogW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHBhcmFtIHtQYXJ0aWFsPE1pbnRPcHRpb25zPn0gb3B0aW9ucyAgICAgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dE5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgLy8gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnRcbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnRlci5Qcm9wZXJ0aWVzLmludG9JbmZyYShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkRmlsZSxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaW5wdXQgPSB7XG4gICAgICAgIC4uLmlucHV0LFxuICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHJveWFsdHkgPSBpbnB1dC5yb3lhbHR5ID8gaW5wdXQucm95YWx0eSA6IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IENvbnZlcnRlci5Sb3lhbHR5LmludG9JbmZyYShyb3lhbHR5KTtcbiAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIC8vIHVwbG9hZCBmaWxlXG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGgpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZChcbiAgICAgICAgICBzdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgICAgLy8gdXBsb2FkZWQgZmlsZVxuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB7IGltYWdlOiBpbnB1dC51cmkgfTtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZERhdGEoXG4gICAgICAgICAgeyAuLi5zdG9yYWdlTWV0YWRhdGEsIC4uLmltYWdlIH0sXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBBY2NvdW50LktleXBhaXIuY3JlYXRlKCk7XG5cbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGF3YWl0IGNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChmcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgICAgY3JlYXRlRGVsZWFnYXRlKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBjb2xsZWN0aW9uIC0tLVxuICAgICAgaWYgKGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICAgICAgY3JlYXRlVmVyaWZ5U2l6ZWRDb2xsZWN0aW9uKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgaW5wdXQuY29sbGVjdGlvbi50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGtleXBhaXJzID0gW293bmVyLnRvS2V5cGFpcigpLCBtaW50LnRvS2V5cGFpcigpXTtcblxuICAgICAgLy8gY3JlYXRvciAtLS1cbiAgICAgIGlmIChpbnB1dC5jcmVhdG9ycykge1xuICAgICAgICBpbnB1dC5jcmVhdG9ycy5mb3JFYWNoKChjcmVhdG9yKSA9PiB7XG4gICAgICAgICAgaWYgKEFjY291bnQuS2V5cGFpci5pc1NlY3JldChjcmVhdG9yLnNlY3JldCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JQdWJrZXkgPSBjcmVhdG9yLmFkZHJlc3MudG9QdWJsaWNLZXkoKTtcbiAgICAgICAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVWZXJpZnlDcmVhdG9yKG1pbnQudG9QdWJsaWNLZXkoKSwgY3JlYXRvclB1YmtleSk7XG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChpbnN0KTtcbiAgICAgICAgICAgIGtleXBhaXJzLnB1c2goY3JlYXRvci5zZWNyZXQudG9LZXlwYWlyKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5LCB1bml4VGltZXN0YW1wIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgR2FzTGVzc01pbnRPcHRpb25zLCBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnfi9zdG9yYWdlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ34vdmFsaWRhdG9yJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBhcnRpYWxTaWduU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0IHtcbiAgY29uc3QgREVGQVVMVF9TVE9SQUdFX1RZUEUgPSAnbmZ0U3RvcmFnZSc7XG5cbiAgLyoqXG4gICAqIE1pbnQgd2l0aG91dCBzb2xhbmEgc29sLCBkZWxlZ2F0ZSBmZWVwYXllciBmb3IgY29tbWlzc2lvblxuICAgKlxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXIgICAgICAgICAvLyBvd25lcidzIFNlY3JldFxuICAgKiBAcGFyYW0ge1VzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGF9IGlucHV0XG4gICAqIHtcbiAgICogICBuYW1lOiBzdHJpbmcgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sOiBzdHJpbmcgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBmaWxlUGF0aDogc3RyaW5nIHwgRmlsZSAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIHJveWFsdHk6IG51bWJlciAgICAgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIHN0b3JhZ2VUeXBlOiAnYXJ3ZWF2ZSd8J25mdFN0b3JhZ2UnIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGRlc2NyaXB0aW9uPzogc3RyaW5nICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgZXh0ZXJuYWxfdXJsPzogc3RyaW5nICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiBNZXRhZGF0YUF0dHJpYnV0ZVtdICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzogTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT4gLy8gaW5jbHVkZSBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBQdWJrZXkgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIFtrZXk6IHN0cmluZ10/OiB1bmtub3duICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiAgIGNyZWF0b3JzPzogSW5wdXRDcmVhdG9yc1tdICAgICAgICAgIC8vIG90aGVyIGNyZWF0b3JzIHRoYW4gb3duZXJcbiAgICogICB1c2VzPzogVXNlcyAgICAgICAgICAgICAgICAgICAvLyB1c2FnZSBmZWF0dXJlOiBidXJuLCBzaW5nbGUsIG11bHRpcGxlXG4gICAqICAgaXNNdXRhYmxlPzogYm9vbGVhbiAgICAgICAgICAgLy8gZW5hYmxlIHVwZGF0ZSgpXG4gICAqIH1cbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyICAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICogQHBhcmFtIHtQYXJ0aWFsPEdhc0xlc3NNaW50T3B0aW9ucz59IG9wdGlvbnMgICAgICAgICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzTWludCA9IGFzeW5jIChcbiAgICBvd25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIGZlZVBheWVyOiBQdWJrZXksXG4gICAgb3B0aW9uczogUGFydGlhbDxHYXNMZXNzTWludE9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0TmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RvcmFnZVR5cGUgPSBpbnB1dC5zdG9yYWdlVHlwZSB8fCBERUZBVUxUX1NUT1JBR0VfVFlQRTtcbiAgICAgIGNvbnN0IHJveWFsdHkgPSBpbnB1dC5yb3lhbHR5ID8gaW5wdXQucm95YWx0eSA6IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IENvbnZlcnRlci5Sb3lhbHR5LmludG9JbmZyYShyb3lhbHR5KTtcbiAgICAgIGNvbnN0IG93bmVyUHVibGlja2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCB1cmkgPSAnJztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydGVyLlByb3BlcnRpZXMuaW50b0luZnJhKFxuICAgICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgICAgU3RvcmFnZS51cGxvYWRGaWxlLFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICAgIHsgLi4uaW5wdXQsIHByb3BlcnRpZXMgfSxcbiAgICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgKTtcblxuICAgICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgdXJpID0gaW5wdXQudXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG5cbiAgICAgIGxldCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuICAgICAgbGV0IGNvbGxlY3Rpb247XG4gICAgICBpZiAoaW5wdXQuY29sbGVjdGlvbiAmJiBpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24gPSBDb252ZXJ0ZXIuQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbik7XG4gICAgICAgIGRhdGF2MiA9IHsgLi4uZGF0YXYyLCBjb2xsZWN0aW9uIH07XG4gICAgICB9XG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBzZWxsZXJGZWVCYXNpc1BvaW50czogJywgc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBtaW50ID0gQWNjb3VudC5LZXlwYWlyLmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBNaW50LmNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXJQdWJsaWNrZXksXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAob3B0aW9ucy5mcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHMucHVzaChcbiAgICAgICAgICBNaW50LmNyZWF0ZURlbGVhZ2F0ZShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyUHVibGlja2V5LFxuICAgICAgICAgICAgb3B0aW9ucy5mcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICBpbnN0cy5mb3JFYWNoKChpbnN0KSA9PiB0eC5hZGQoaW5zdCkpO1xuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIFtvd25lciwgbWludF0uZm9yRWFjaCgoc2lnbmVyKSA9PiB0eC5wYXJ0aWFsU2lnbihzaWduZXIudG9LZXlwYWlyKCkpKTtcblxuICAgICAgY29uc3Qgc2VyaWFsaXplZFR4ID0gdHguc2VyaWFsaXplKHtcbiAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBoZXggPSBzZXJpYWxpemVkVHgudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuUGFydGlhbFNpZ24oaGV4LCBtaW50LnB1YmtleSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIC8qKlxuICAgKiBUcmFuc2ZlciB3aXRob3V0IHNvbGFuYSBzb2wsIGRlbGVnYXRlIGZlZXBheWVyIGZvciBjb21taXNzaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lclxuICAgKiBAcGFyYW0ge1B1YmtleX0gZGVzdFxuICAgKiBAcGFyYW0ge1B1YmtleX0gZmVlUGF5ZXJcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGdhc0xlc3NUcmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBTcGxUb2tlbi5nYXNMZXNzVHJhbnNmZXIoXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBkZXN0LFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICAgIE5GVF9ERUNJTUFMUyxcbiAgICAgIGZlZVBheWVyLFxuICAgICk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlU2V0Q29sbGVjdGlvblNpemVJbnN0cnVjdGlvbiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBUcnksIHVuaXhUaW1lc3RhbXAgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgTWludENvbGxlY3Rpb25PcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuLyoqXG4gKiBjcmVhdGUgYSBjb2xsZWN0aW9uXG4gKiBUaGlzIGZ1bmN0aW9uIG5lZWRzIG9ubHkgMSBjYWxsXG4gKlxuICogQHBhcmFtIHtTZWNyZXR9IG93bmVyXG4gKiBAcGFyYW0ge0lucHV0TmZ0TWV0YWRhdGF9IGlucHV0XG4gKiBAcGFyYW0ge1BhcnRpYWw8TWludENvbGxlY3Rpb25PcHRpb25zPn0gb3B0aW9uc1xuICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGV4cG9ydCBjb25zdCBERUZBVUxUX0NPTExFQ1RJT05fU0laRSA9IDA7XG4gIGNvbnN0IERFRkFVTFRfU1RPUkFHRV9UWVBFID0gJ25mdFN0b3JhZ2UnO1xuICBleHBvcnQgY29uc3QgbWludENvbGxlY3Rpb24gPSAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRDb2xsZWN0aW9uT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludFN0cnVjdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxJbnB1dE5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZnJlZXplQXV0aG9yaXR5LCBmZWVQYXllciwgY29sbGVjdGlvblNpemUgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBvd25lcjtcbiAgICAgIGNvbnN0IHN0b3JhZ2VUeXBlID0gaW5wdXQuc3RvcmFnZVR5cGUgfHwgREVGQVVMVF9TVE9SQUdFX1RZUEU7XG4gICAgICBjb25zdCBvd25lclB1YmxpY0tleSA9IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleTtcblxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG4gICAgICBsZXQgcHJvcGVydGllcztcbiAgICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0ZXIuUHJvcGVydGllcy5pbnRvSW5mcmEoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZEZpbGUsXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0ID0ge1xuICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgIH07XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgY29uc3Qgc3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoaW5wdXQsIDApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBzdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IHVuaXhUaW1lc3RhbXAoKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCAmJiBpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB7IGltYWdlOiBpbnB1dC51cmkgfTtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZERhdGEoXG4gICAgICAgICAgeyAuLi5zdG9yYWdlTWV0YWRhdGEsIC4uLmltYWdlIH0sXG4gICAgICAgICAgc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0IGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuUmVndWxhck5mdE1ldGFkYXRhLmludG9JbmZyYShpbnB1dCwgdXJpLCAwKTtcblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBjb2xsZWN0aW9uTWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25NZXRhZGF0YUFjY291bnQgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShcbiAgICAgICAgY29sbGVjdGlvbk1pbnQucHVia2V5LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXdhaXQgTWludC5jcmVhdGVNaW50KFxuICAgICAgICBjb2xsZWN0aW9uTWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChcbiAgICAgICAgICBNaW50LmNyZWF0ZURlbGVhZ2F0ZShcbiAgICAgICAgICAgIGNvbGxlY3Rpb25NaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25zID0ge1xuICAgICAgICBjb2xsZWN0aW9uTWV0YWRhdGE6IGNvbGxlY3Rpb25NZXRhZGF0YUFjY291bnQsXG4gICAgICAgIGNvbGxlY3Rpb25BdXRob3JpdHk6IG93bmVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IGNvbGxlY3Rpb25NaW50LnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgIH07XG5cbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgICBjcmVhdGVTZXRDb2xsZWN0aW9uU2l6ZUluc3RydWN0aW9uKGNvbGxlY3Rpb25zLCB7XG4gICAgICAgICAgc2V0Q29sbGVjdGlvblNpemVBcmdzOiB7XG4gICAgICAgICAgICBzaXplOiBjb2xsZWN0aW9uU2l6ZSB8fCBERUZBVUxUX0NPTExFQ1RJT05fU0laRSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLk1pbnQoXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpLCBjb2xsZWN0aW9uTWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBjb2xsZWN0aW9uTWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBjcmVhdGVUaGF3RGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFRoYXdPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnQge1xuICAvKipcbiAgICogVGhhd2luZyBhIHRhcmdldCBORlRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gc2V0dGVkIGZyZWV6ZSBhdXRob3JpdHkgb2YgbmZ0XG4gICAqIEBwYXJhbSB7VGhhd09wdGlvbnN9IG9wdGlvbnMgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiB7UmVzdWx0PENvbW1vblN0cnVjdHVyZTx1bmtub3duPiwgRXJyb3I+IH1cbiAgICovXG4gIGV4cG9ydCBjb25zdCB0aGF3ID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8VGhhd09wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmU8dW5rbm93bj4sIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBlZGl0aW9uQWRkcmVzcyA9IEFjY291bnQuUGRhLmdldE1hc3RlckVkaXRpb24obWludCk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUaGF3RGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uKHtcbiAgICAgICAgZGVsZWdhdGU6IG5ldyBBY2NvdW50LktleXBhaXIoe1xuICAgICAgICAgIHNlY3JldDogZnJlZXplQXV0aG9yaXR5LFxuICAgICAgICB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFjY291bnQ6IHRva2VuQWNjb3VudCxcbiAgICAgICAgZWRpdGlvbjogZWRpdGlvbkFkZHJlc3MsXG4gICAgICAgIG1pbnQ6IG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2Zlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVndWxhck5mdCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIC8qKlxuICAgKiBUcmFuc2ZlciBORlRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3QgICAgICAgICAgICAgLy8gbmV3IG93bmVyXG4gICAqIEBwYXJhbSB7VGhhd09wdGlvbnN9IG9wdGlvbnMgICAgIC8vIG9wdGlvbnNcbiAgICogQHJldHVybiB7UmVzdWx0PENvbW1vblN0cnVjdHVyZTx1bmtub3duPiwgRXJyb3I+IH1cbiAgICovXG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPFRyYW5zZmVyT3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4udHJhbnNmZXIoXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBkZXN0LFxuICAgICAgb3duZXJPck11bHRpc2lnLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICAgIE5GVF9ERUNJTUFMUyxcbiAgICAgIG9wdGlvbnMsXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgRnJlZXplIH0gZnJvbSAnLi9mcmVlemUnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBHYXNMZXNzTWludCB9IGZyb20gJy4vZ2FzLWxlc3MtbWludCc7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIEdhc0xlc3NUcmFuc2ZlciB9IGZyb20gJy4vZ2FzLWxlc3MtdHJhbnNmZXInO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFJlZ3VsYXJOZnQgYXMgTWludENvbGxlY3Rpb24gfSBmcm9tICcuL21pbnQtY29sbGVjdGlvbic7XG5pbXBvcnQgeyBSZWd1bGFyTmZ0IGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgUmVndWxhck5mdCBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0ICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInOyAvLyBUT0RPOiBuZWVkPyBvciBSZXN1bHRcbmltcG9ydCAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IGNvbnN0IFJlZ3VsYXJOZnQgPSB7XG4gIC4uLkJ1cm4sXG4gIC4uLkZpbmQsXG4gIC4uLkZyZWV6ZSxcbiAgLi4uR2FzTGVzc01pbnQsXG4gIC4uLkdhc0xlc3NUcmFuc2ZlcixcbiAgLi4uTWludCxcbiAgLi4uTWludENvbGxlY3Rpb24sXG4gIC4uLlRoYXcsXG4gIC4uLlRyYW5zZmVyLFxufTtcblxuZXhwb3J0ICogZnJvbSAnfi9zaGFyZWQvZXhwb3J0cyc7XG4iLCAiaW1wb3J0IHsgUGhhbnRvbU1ldGFwbGV4IGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuXG5leHBvcnQgY29uc3QgTWV0YXBsZXggPSB7IC4uLk1pbnQgfTtcbiIsICJpbXBvcnQge1xuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIFRPS0VOX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb24sIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgUGhhbnRvbVByb3ZpZGVyIH0gZnJvbSAnfi90eXBlcy9waGFudG9tJztcblxuZXhwb3J0IG5hbWVzcGFjZSBQaGFudG9tU3BsVG9rZW4ge1xuICAvKipcbiAgICogQWRkaW5nIG5ldyB0b2tlbiB0byBleGlzdGluZyB0b2tlblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gIHRva2VuXG4gICAqIEBwYXJhbSB7UHVia2V5fSAgb3duZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9ICBjbHVzdGVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgdG90YWxBbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9ICBtaW50RGVjaW1hbFxuICAgKiBAcGFyYW0ge1BoYW50b219IHBoYW50b20gLy9waGFudG9tIHdhbGxldCBvYmplY3RcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBhZGQgPSBhc3luYyAoXG4gICAgdG9rZW46IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNsdXN0ZXI6IHN0cmluZyxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgcGhhbnRvbTogUGhhbnRvbVByb3ZpZGVyLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgTm9kZS5jaGFuZ2VDb25uZWN0aW9uKHsgY2x1c3RlciB9KTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgIGNvbnN0IG1ha2VJbnN0cnVjdGlvbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG93bmVyLFxuICAgICAgKTtcbiAgICAgIHRyYW5zYWN0aW9uLmFkZChtYWtlSW5zdHJ1Y3Rpb24uaW5zdCBhcyBUcmFuc2FjdGlvbkluc3RydWN0aW9uKTtcbiAgICAgIHRyYW5zYWN0aW9uLmFkZChcbiAgICAgICAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICAgIHRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWFrZUluc3RydWN0aW9uLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgdG90YWxBbW91bnQsXG4gICAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgICAgW10sXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gb3duZXIudG9QdWJsaWNLZXkoKTtcbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoQW5kQ29udGV4dCgpO1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLnZhbHVlLmJsb2NraGFzaDtcblxuICAgICAgY29uc3Qgc2lnbmVkID0gYXdhaXQgcGhhbnRvbS5zaWduQWxsVHJhbnNhY3Rpb25zKFt0cmFuc2FjdGlvbl0pO1xuXG4gICAgICAvLyBUT0RPOiByZWZhY3RvcmluZ1xuICAgICAgZm9yIChjb25zdCBzaWduIG9mIHNpZ25lZCkge1xuICAgICAgICBjb25zdCBzaWcgPSBhd2FpdCBjb25uZWN0aW9uLnNlbmRSYXdUcmFuc2FjdGlvbihzaWduLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcoc2lnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyLCBUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICd+L3N1aXRlLXNwbC10b2tlbic7XG5pbXBvcnQgeyBQaGFudG9tUHJvdmlkZXIgfSBmcm9tICd+L3R5cGVzL3BoYW50b20nO1xuaW1wb3J0IHsgSW5wdXRUb2tlbk1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFBoYW50b21TcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBNaW50IG5ldyBzcGwtdG9rZW5cbiAgICpcbiAgICogQHBhcmFtIHtJbnB1dE5mdE1ldGFkYXRhfSAgaW5wdXRcbiAgICogQHBhcmFtIHtQdWJrZXl9ICBvd25lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gIGNsdXN0ZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9ICB0b3RhbEFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gIG1pbnREZWNpbWFsXG4gICAqIEBwYXJhbSB7UGhhbnRvbX0gcGhhbnRvbSAvL3BoYW50b20gd2FsbGV0IG9iamVjdFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IElucHV0VG9rZW5NZXRhZGF0YSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNsdXN0ZXI6IHN0cmluZyxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgcGhhbnRvbTogUGhhbnRvbVByb3ZpZGVyLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgTm9kZS5jaGFuZ2VDb25uZWN0aW9uKHsgY2x1c3RlciB9KTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zdCBtaW50ID0gS2V5cGFpci5nZW5lcmF0ZSgpO1xuXG4gICAgICBpbnB1dC5yb3lhbHR5ID0gMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gMDtcbiAgICAgIGNvbnN0IHRva2VuU3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0IGFzIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICAgIGlucHV0LnJveWFsdHksXG4gICAgICApO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgdG9rZW5TdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICB1cmkgPSBpbnB1dC51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgJ3N0b3JhZ2VUeXBlICsgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9JbmZyYShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVyaSk7XG5cbiAgICAgIGNvbnN0IGluc3R1cmN0aW9ucyA9IGF3YWl0IFNwbFRva2VuLmNyZWF0ZU1pbnQoXG4gICAgICAgIG1pbnQucHVibGljS2V5LFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b3RhbEFtb3VudCxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgaW5zdHVyY3Rpb25zLmZvckVhY2goKGluc3Q6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24pID0+XG4gICAgICAgIHRyYW5zYWN0aW9uLmFkZChpbnN0KSxcbiAgICAgICk7XG4gICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IG93bmVyLnRvUHVibGljS2V5KCk7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaEFuZENvbnRleHQoKTtcbiAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai52YWx1ZS5ibG9ja2hhc2g7XG4gICAgICB0cmFuc2FjdGlvbi5wYXJ0aWFsU2lnbihtaW50KTtcbiAgICAgIGNvbnN0IHNpZ25lZCA9IGF3YWl0IHBoYW50b20uc2lnblRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBzaWduZWQsIHNpZ25lZC5zaWduYXR1cmVzOiAnLFxuICAgICAgICBzaWduZWQsXG4gICAgICAgIHNpZ25lZC5zaWduYXR1cmVzLm1hcCgoc2lnKSA9PiBzaWcucHVibGljS2V5LnRvU3RyaW5nKCkpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNpZyA9IGF3YWl0IGNvbm5lY3Rpb24uc2VuZFJhd1RyYW5zYWN0aW9uKHNpZ25lZC5zZXJpYWxpemUoKSk7XG4gICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhzaWcpO1xuICAgICAgcmV0dXJuIG1pbnQucHVibGljS2V5LnRvU3RyaW5nKCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUGhhbnRvbVNwbFRva2VuIGFzIEFkZCB9IGZyb20gJy4vYWRkJztcbmltcG9ydCB7IFBoYW50b21TcGxUb2tlbiBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcblxuZXhwb3J0IGNvbnN0IFBoYW50b21TcGxUb2tlbiA9IHtcbiAgLi4uQWRkLFxuICAuLi5NaW50LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUFBLEVBRUUsNkJBQUFBO0FBQUEsRUFDQSxlQUFBQztBQUFBLE9BRUs7OztBQ0xQLFNBQXFCLGlCQUFpQjtBQUN0QyxPQUFPLHNCQUFzQjtBQUU3QixJQUFJLFNBQVM7QUFFTixJQUFVO0FBQUEsQ0FBVixDQUFVQyxlQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLHFCQUFWO0FBQ0wsVUFBTSxhQUFhO0FBQ25CLFFBQUksWUFBWTtBQUNULElBQU1BLGlCQUFBLHNCQUFzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU81QixJQUFNQSxpQkFBQSxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT3BCLElBQU1BLGlCQUFBLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRaEIsSUFBTUEsaUJBQUEsdUJBQXVCLE1BQWU7QUFDakQsWUFBTSxjQUFjLEtBQUssT0FBTztBQUNoQyxZQUFNLGNBQWMsSUFBSTtBQUN4QixVQUFJLENBQUMsYUFBYSxjQUFjLGFBQWE7QUFDM0Msb0JBQVk7QUFDWixlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsS0FqQ2Usa0JBQUFELFdBQUEsb0JBQUFBLFdBQUE7QUFBQSxHQURGO0FBQUEsQ0FzQ1YsQ0FBVUEsZUFBVjtBQUNFLEVBQU1BLFdBQUEsaUJBQWlCLE9BQU8sUUFBUTtBQUN0QyxFQUFNQSxXQUFBLG1CQUFtQixPQUFPLFFBQVE7QUFDeEMsRUFBTUEsV0FBQSxjQUFjLE9BQU87QUFDM0IsRUFBTUEsV0FBQSxtQkFBbUIsT0FBTztBQUNoQyxFQUFNQSxXQUFBLFlBQVksT0FBTztBQUV6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QUFDTCxjQUFNLE1BQU0sNENBQTRDO0FBQUEsTUFDMUQ7QUFFQSxZQUFNLFlBQVk7QUFFbEIsWUFBTSxTQUFTQyxZQUFVLGNBQWM7QUFBQSxRQUNyQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUVBLGVBQVMsY0FBYyxNQUFNO0FBQzdCLGVBQVMsMEJBQTBCLEdBQUc7QUFFdEMsWUFBTSxlQUFlLE1BQU1DLFdBQVM7QUFBQSxRQUNsQ0gsTUFBSztBQUFBLFFBQ0wsTUFBTSxZQUFZO0FBQUEsUUFDbEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsTUFBTSxZQUFZO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBRUEsbUJBQWE7QUFBQSxRQUFRLENBQUMsU0FDcEIsWUFBWSxJQUFJLElBQUk7QUFBQSxNQUN0QjtBQUNBLGtCQUFZLFdBQVcsTUFBTSxZQUFZO0FBQ3pDLFlBQU0sZUFBZSxNQUFNLFdBQVcsNkJBQTZCO0FBQ25FLGtCQUFZLGtCQUFrQixhQUFhLE1BQU07QUFDakQsa0JBQVksWUFBWUEsS0FBSTtBQUM1QixZQUFNLFNBQVMsTUFBTSxRQUFRLGdCQUFnQixXQUFXO0FBQ3hEO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBLE9BQU8sV0FBVyxJQUFJLENBQUNJLFNBQVFBLEtBQUksVUFBVSxTQUFTLENBQUM7QUFBQSxNQUN6RDtBQUNBLFlBQU0sTUFBTSxNQUFNLFdBQVcsbUJBQW1CLE9BQU8sVUFBVSxDQUFDO0FBQ2xFLFlBQU0sS0FBSyxhQUFhLEdBQUc7QUFDM0IsYUFBT0osTUFBSyxVQUFVLFNBQVM7QUFBQSxJQUNqQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEdBekZlRix3Q0FBQTs7O0FDVFYsSUFBTU8sbUJBQWtCO0FBQUEsRUFDN0IsR0FBRztBQUFBLEVBQ0gsR0FBR0E7QUFDTDsiLAogICJuYW1lcyI6IFsic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJDb25zdGFudHMiLCAiV2Fybm5pbmdNZXNzYWdlIiwgIkNsdXN0ZXIiLCAiRW5kUG9pbnRVcmwiLCAiQnVuZGxyVXJsIiwgIkRhc0FwaVVybCIsICJOZnRzdG9yYWdlQXBpS2V5IiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAiUmVzdWx0IiwgIlB1YmxpY0tleSIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiQWNjb3VudCIsICJBc3NvY2lhdGVkIiwgIlB1YmxpY0tleSIsICJBY2NvdW50IiwgIlBkYSIsICJBY2NvdW50IiwgIlB1YmxpY0tleSIsICJicyIsICJBY2NvdW50IiwgIlB1YmxpY0tleSIsICJDb252ZXJ0ZXIiLCAiQ29sbGVjdGlvbiIsICJDb2xsZWN0aW9uTWludCIsICJDb252ZXJ0ZXIiLCAiQ3JlYXRvcnMiLCAiQ29udmVydGVyIiwgIkNvbXByZXNzZWROZnRNZXRhZGF0YSIsICJDb252ZXJ0ZXIiLCAiUm95YWx0eSIsICJDb252ZXJ0ZXIiLCAiTmZ0IiwgIkNvbnZlcnRlciIsICJNZW1vIiwgIkNvbnZlcnRlciIsICJNaW50IiwgIkNvbnZlcnRlciIsICJSZWd1bGFyTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlByb3BlcnRpZXMiLCAiQ29udmVydGVyIiwgIlVzZXMiLCAiQ29udmVydGVyIiwgIlRva2VuTWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXIiLCAiQ29udmVydGVyIiwgIlZhbGlkYXRvciIsICJNZXNzYWdlIiwgIkNvbnZlcnRlciIsICJOb2RlIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJDb21tb24iLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb24iLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbiIsICJTcGxUb2tlbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlNwbFRva2VuIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiZmV0Y2giLCAiU3BsVG9rZW4iLCAiTUFYX1JFVFJJRVMiLCAiQ29udmVydGVyIiwgIkFjY291bnQiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uIiwgImNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbiIsICJjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24iLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJQcm92ZW5hbmNlTGF5ZXIiLCAidXBsb2FkRmlsZSIsICJBcndlYXZlIiwgIk5mdFN0b3JhZ2UiLCAiU3RvcmFnZSIsICJTcGxUb2tlbiIsICJtaW50IiwgIkFjY291bnQiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIiwgIkNvbnZlcnRlciIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgImNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIiwgIlNwbFRva2VuIiwgIkFjY291bnQiLCAiY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24iLCAiU3BsVG9rZW4iLCAiUmVndWxhck5mdCIsICJTcGxUb2tlbiIsICJEYXNBcGkiLCAiRGFzQXBpIiwgIkNvbnZlcnRlciIsICJEYXNBcGkiLCAiUmVndWxhck5mdCIsICJEYXNBcGkiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiUmVndWxhck5mdCIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJBY2NvdW50IiwgIlN5c3RlbVByb2dyYW0iLCAiY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uIiwgImNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgImdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQiLCAiTUlOVF9TSVpFIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbiIsICJSZWd1bGFyTmZ0IiwgIm1pbnQiLCAiQWNjb3VudCIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJTeXN0ZW1Qcm9ncmFtIiwgImdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQiLCAiTUlOVF9TSVpFIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbiIsICJjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIiwgIkNvbnZlcnRlciIsICJUcmFuc2FjdGlvbiIsICJSZWd1bGFyTmZ0IiwgIkNvbnZlcnRlciIsICJBY2NvdW50IiwgIlJlZ3VsYXJOZnQiLCAiU3BsVG9rZW4iLCAiUmVndWxhck5mdCIsICJDb252ZXJ0ZXIiLCAiQWNjb3VudCIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJSZWd1bGFyTmZ0IiwgIkFjY291bnQiLCAiUmVndWxhck5mdCIsICJTcGxUb2tlbiIsICJSZWd1bGFyTmZ0IiwgIlBoYW50b21NZXRhcGxleCIsICJDb252ZXJ0ZXIiLCAibWludCIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uIiwgIlJlZ3VsYXJOZnQiLCAic2lnIiwgImNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbiIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIlRyYW5zYWN0aW9uIiwgIlBoYW50b21TcGxUb2tlbiIsICJUcmFuc2FjdGlvbiIsICJBY2NvdW50IiwgImNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbiIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIktleXBhaXIiLCAiVHJhbnNhY3Rpb24iLCAiUGhhbnRvbVNwbFRva2VuIiwgIlRyYW5zYWN0aW9uIiwgIm1pbnQiLCAiS2V5cGFpciIsICJDb252ZXJ0ZXIiLCAiU3BsVG9rZW4iLCAic2lnIiwgIlBoYW50b21TcGxUb2tlbiJdCn0K