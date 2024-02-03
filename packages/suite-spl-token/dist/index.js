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
  SplToken: () => SplToken10
});
module.exports = __toCommonJS(src_exports);

// src/add.ts
var import_spl_token = require("@solana/spl-token");

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
    WarnningMessage2.ANNOUNCE = `
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
console.log(Constants.WarnningMessage.ANNOUNCE);

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

// ../account/src/keypair.ts
var import_web37 = require("@solana/web3.js");
var import_bs58 = __toESM(require("bs58"));
var Account;
((Account4) => {
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
  Account4.Keypair = Keypair4;
})(Account || (Account = {}));

// ../account/src/pda.ts
var import_web38 = require("@solana/web3.js");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_mpl_bubblegum = require("@metaplex-foundation/mpl-bubblegum");
var import_bn = __toESM(require("bn.js"));
var Account2;
((Account4) => {
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
  })(Pda = Account4.Pda || (Account4.Pda = {}));
})(Account2 || (Account2 = {}));

// ../account/src/index.ts
var Account3 = {
  ...Account,
  ...Account2
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
  if (Account3.Keypair.isPubkey(addressOrSignature)) {
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
  if (!Account3.Keypair.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new import_web39.PublicKey(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account3.Keypair.isSecret(this.toString())) {
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
((Result18) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result18.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result18.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result18.ok(resArr);
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
    return Result18.ok(res);
  }
  Result18.all = all;
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

// src/calculate-amount.ts
var SplToken;
((SplToken11) => {
  SplToken11.calculateAmount = (amount, mintDecimal) => {
    return amount * 10 ** mintDecimal;
  };
})(SplToken || (SplToken = {}));

// src/add.ts
var SplToken2;
((SplToken11) => {
  SplToken11.add = async (token, owner, ownerOrMultisig, totalAmount, mintDecimal, options = {}) => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const tokenAssociated = await Account3.Associated.retryGetOrCreate(
        token,
        owner,
        payer
      );
      const inst = (0, import_spl_token.createMintToCheckedInstruction)(
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

// src/burn.ts
var import_spl_token2 = require("@solana/spl-token");
var SplToken3;
((SplToken11) => {
  SplToken11.burn = (mint, owner, ownerOrMultisig, burnAmount, tokenDecimals, options = {}) => {
    return Try(() => {
      const tokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const inst = (0, import_spl_token2.createBurnCheckedInstruction)(
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

// src/find.ts
var import_mpl_token_metadata2 = require("@metaplex-foundation/mpl-token-metadata");
var import_spl_token3 = require("@solana/spl-token");
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
          programId: import_spl_token3.TOKEN_PROGRAM_ID
        }
      );
      const datas = info.value.map(async (d) => {
        const mint = d.account.data.parsed.info.mint;
        const tokenAmount = d.account.data.parsed.info.tokenAmount.amount;
        if (tokenAmount === "1") {
          return;
        }
        return import_mpl_token_metadata2.Metadata.fromAccountAddress(
          connection,
          Account3.Pda.getMetadata(mint)
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
      const metadata = await import_mpl_token_metadata2.Metadata.fromAccountAddress(
        connection,
        Account3.Pda.getMetadata(mint)
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

// src/freeze.ts
var import_spl_token4 = require("@solana/spl-token");
var SplToken5;
((SplToken11) => {
  SplToken11.freeze = (mint, owner, freezeAuthority, options = {}) => {
    return Try(() => {
      const payer = options.feePayer ? options.feePayer : freezeAuthority;
      const tokenAccount = (0, import_spl_token4.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = (0, import_spl_token4.createFreezeAccountInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        new Account3.Keypair({ secret: freezeAuthority }).toPublicKey()
      );
      return new TransactionBuilder6.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// src/gas-less-transfer.ts
var import_spl_token5 = require("@solana/spl-token");
var import_web310 = require("@solana/web3.js");
var SplToken6;
((SplToken11) => {
  SplToken11.gasLessTransfer = async (mint, owner, dest, amount, mintDecimal, feePayer) => {
    return Try(async () => {
      const ownerPublicKey = owner.toKeypair().publicKey;
      const sourceToken = await Account3.Associated.makeOrCreateInstruction(
        mint,
        ownerPublicKey.toString(),
        feePayer
      );
      const destToken = await Account3.Associated.makeOrCreateInstruction(
        mint,
        dest,
        feePayer
      );
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new import_web310.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      const inst2 = (0, import_spl_token5.createTransferCheckedInstruction)(
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

// src/mint.ts
var import_web311 = require("@solana/web3.js");
var import_spl_token6 = require("@solana/spl-token");
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

// src/mint.ts
var SplToken7;
((SplToken11) => {
  const DEFAULT_STORAGE_TYPE = "nftStorage";
  SplToken11.createFreezeAuthority = (mint2, owner, freezeAuthority) => {
    return (0, import_spl_token6.createSetAuthorityInstruction)(
      mint2,
      owner,
      import_spl_token6.AuthorityType.FreezeAccount,
      freezeAuthority
    );
  };
  SplToken11.createMint = async (mint2, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => {
    const connection = Node.getConnection();
    const lamports = await (0, import_spl_token6.getMinimumBalanceForRentExemptMint)(connection);
    const metadataPda = Account3.Pda.getMetadata(mint2.toString());
    const tokenAssociated = (0, import_spl_token6.getAssociatedTokenAddressSync)(mint2, owner);
    const instructions = [];
    instructions.push(
      import_web311.SystemProgram.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: mint2,
        space: import_spl_token6.MINT_SIZE,
        lamports,
        programId: import_spl_token6.TOKEN_PROGRAM_ID
      })
    );
    instructions.push(
      (0, import_spl_token6.createInitializeMintInstruction)(
        mint2,
        mintDecimal,
        owner,
        owner,
        import_spl_token6.TOKEN_PROGRAM_ID
      )
    );
    instructions.push(
      (0, import_spl_token6.createAssociatedTokenAccountInstruction)(
        feePayer,
        tokenAssociated,
        owner,
        mint2
      )
    );
    instructions.push(
      (0, import_spl_token6.createMintToCheckedInstruction)(
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
      const mint2 = Account3.Keypair.create();
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

// src/thaw.ts
var import_spl_token7 = require("@solana/spl-token");
var SplToken8;
((SplToken11) => {
  SplToken11.thaw = (mint, owner, freezeAuthority, options = {}) => {
    const payer = options.feePayer ? options.feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = (0, import_spl_token7.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = (0, import_spl_token7.createThawAccountInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        new Account3.Keypair({ secret: freezeAuthority }).toPublicKey()
      );
      return new TransactionBuilder6.Common(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken8 || (SplToken8 = {}));

// src/transfer.ts
var import_spl_token8 = require("@solana/spl-token");
var SplToken9;
((SplToken11) => {
  SplToken11.transfer = async (mint, owner, dest, ownerOrMultisig, amount, mintDecimal, options = {}) => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const payerPubkey = new Account3.Keypair({ secret: payer });
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());
      const sourceToken = await Account3.Associated.makeOrCreateInstruction(
        mint,
        owner.toString(),
        payerPubkey.pubkey
      );
      const destToken = await Account3.Associated.makeOrCreateInstruction(
        mint,
        dest,
        payerPubkey.pubkey
      );
      const inst = (0, import_spl_token8.createTransferCheckedInstruction)(
        sourceToken.tokenAccount.toPublicKey(),
        mint.toPublicKey(),
        destToken.tokenAccount.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(amount, mintDecimal),
        mintDecimal,
        keypairs
      );
      const instructions = destToken.inst ? [destToken.inst, inst] : [inst];
      return new TransactionBuilder6.Common(
        instructions,
        keypairs,
        payer.toKeypair()
      );
    });
  };
})(SplToken9 || (SplToken9 = {}));

// src/index.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SplToken
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9hZGQudHMiLCAiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL2NvbnN0YW50cy50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9iYXRjaC50cyIsICIuLi8uLi9ub2RlL3NyYy9pbmRleC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9jb21tb24udHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvbWludC50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9wYXJ0aWFsLXNpZ24udHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvY2FsY3VsYXRlLXR4c2l6ZS50cyIsICIuLi8uLi9nbG9iYWwvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2tleXBhaXIudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvcGRhLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9zaGFyZWQudHMiLCAiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL3Jlc3VsdC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jcmVhdG9ycy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbXByZXNzZWQtbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcm95YWx0eS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL25mdC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21lbW8udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcmVndWxhci1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9wcm9wZXJ0aWVzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdXNlcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Rva2VuLW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXItY2hlY2tlZC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdmFsaWRhdG9yL3NyYy9pbmRleC50cyIsICIuLi9zcmMvY2FsY3VsYXRlLWFtb3VudC50cyIsICIuLi9zcmMvYnVybi50cyIsICIuLi9zcmMvZmluZC50cyIsICIuLi9zcmMvZnJlZXplLnRzIiwgIi4uL3NyYy9nYXMtbGVzcy10cmFuc2Zlci50cyIsICIuLi9zcmMvbWludC50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9wcm92ZW5hbmNlLWxheWVyLnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL2Fyd2VhdmUudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvc3RvcmFnZS50cyIsICIuLi9zcmMvdGhhdy50cyIsICIuLi9zcmMvdHJhbnNmZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFNwbFRva2VuIGFzIEFkZCB9IGZyb20gJy4vYWRkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGcmVlemUgfSBmcm9tICcuL2ZyZWV6ZSc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBHYXNMZXNzIH0gZnJvbSAnLi9nYXMtbGVzcy10cmFuc2Zlcic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuLyoqIEBuYW1lc3BhY2UgKi9cbmV4cG9ydCBjb25zdCBTcGxUb2tlbiA9IHtcbiAgLi4uQWRkLFxuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkdhc0xlc3MsXG4gIC4uLk1pbnQsXG4gIC4uLlRoYXcsXG4gIC4uLlRyYW5zZmVyLFxufTtcbiIsICJpbXBvcnQgeyBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBBZGRpbmcgbmV3IHRva2VuIHRvIGV4aXN0aW5nIHRva2VuXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSAgdG9rZW5cbiAgICogQHBhcmFtIHtQdWJrZXl9ICBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldFtdfSAgb3duZXJPck11bHRpc2lnXG4gICAqIEBwYXJhbSB7bnVtYmVyfSAgdG90YWxBbW91bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9ICBtaW50RGVjaW1hbFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKFxuICAgIHRva2VuOiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxDb21tb25TdHJ1Y3R1cmU8UHVia2V5PiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IG9wdGlvbnMuZmVlUGF5ZXIgPyBvcHRpb25zLmZlZVBheWVyIDogb3duZXJPck11bHRpc2lnWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudCh0b3RhbEFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb248UHVia2V5PihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIHRva2VuLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb21taXRtZW50LCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IFNvbGFuYUpzb25Db25maWcgZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCc7XG5cbmxldCBDb25maWcgPSBTb2xhbmFKc29uQ29uZmlnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgV2Fybm5pbmdNZXNzYWdlIHtcbiAgICBjb25zdCBUSFJFU0hIT0xEID0gNTA7XG4gICAgbGV0IGlzRGlzcGxheSA9IGZhbHNlO1xuICAgIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBuZnRTdG9yYWdlQXBpS2V5IGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIENhbiBnZXQgYXBpIGtleSBmcm9tIGh0dHBzOi8vbmZ0LnN0b3JhZ2UvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGA7XG4gICAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBkYXNBcGlVcmwgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGkgdXJsIGZyb20gaHR0cHM6Ly93d3cuaGVsaXVzLmRldi9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG4gICAgICAgIGA7XG4gICAgZXhwb3J0IGNvbnN0IEFOTk9VTkNFID0gYFxuICAgICAgICBbREVQUkVDQVRFRF1cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgQWNjb3VudCwgTm9kZSwgdG9FeHBsb3JlciwgUHVia2V5LCBTZWNyZXQgaGF2ZSBiZWVuIG1vdmVkIHRvIFxuICAgICAgICBAc29sYW5hLXN1aXRlL3V0aWxzIFxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuICAgICAgICBgO1xuXG4gICAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVByb2JhYmlsaXR5ID0gKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgY29uc3QgcmFuZG9tVmFsdWUgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgY29uc3QgcHJvYmFiaWxpdHkgPSAxIC8gVEhSRVNISE9MRDtcbiAgICAgIGlmICghaXNEaXNwbGF5ICYmIHJhbmRvbVZhbHVlIDwgcHJvYmFiaWxpdHkpIHtcbiAgICAgICAgaXNEaXNwbGF5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBjb25zdCBjdXJyZW50Q2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGV4cG9ydCBjb25zdCBjdXN0b21DbHVzdGVyVXJsID0gQ29uZmlnLmNsdXN0ZXIuY3VzdG9tQ2x1c3RlclVybDtcbiAgZXhwb3J0IGNvbnN0IGlzRGVidWdnaW5nID0gQ29uZmlnLmRlYnVnZ2luZztcbiAgZXhwb3J0IGNvbnN0IG5mdFN0b3JhZ2VBcGlLZXkgPSBDb25maWcubmZ0U3RvcmFnZUFwaUtleTtcbiAgZXhwb3J0IGNvbnN0IGRhc0FwaVVybCA9IENvbmZpZy5kYXNBcGlVcmw7XG5cbiAgZXhwb3J0IGVudW0gQ2x1c3RlciB7XG4gICAgcHJkID0gJ21haW5uZXQtYmV0YScsXG4gICAgcHJkTWV0YXBsZXggPSAnbWFpbm5ldC1iZXRhLW1ldGFwbGV4JyxcbiAgICBkZXYgPSAnZGV2bmV0JyxcbiAgICB0ZXN0ID0gJ3Rlc3RuZXQnLFxuICAgIGxvY2FsaG9zdCA9ICdsb2NhbGhvc3QtZGV2bmV0JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEVuZFBvaW50VXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9hcGkubWFpbm5ldC1iZXRhLnNvbGFuYS5jb20nLFxuICAgIHByZE1ldGFwbGV4ID0gJ2h0dHBzOi8vYXBpLm1ldGFwbGV4LnNvbGFuYS5jb20nLFxuICAgIGRldiA9ICdodHRwczovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gICAgdGVzdCA9ICdodHRwczovL2FwaS50ZXN0bmV0LnNvbGFuYS5jb20nLFxuICAgIGxvY2FsaG9zdCA9ICdodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEJ1bmRsclVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbm9kZTEuaXJ5cy54eXosaHR0cHM6Ly9ub2RlMi5pcnlzLnh5eicsXG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmlyeXMueHl6JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIERhc0FwaVVybCB7XG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmhlbGl1cy1ycGMuY29tLz9hcGkta2V5PTE1MzE5YmY0LTViNDAtNDk1OC1hYzhkLTYzMTNhYTU1ZWI5MixodHRwczovL3JwYy1kZXZuZXQuaGVsaXVzLnh5ej9hcGkta2V5PTlmNzBhODQzLTMyNzQtNGZmZC1hMGE5LTMyM2Y4YjdjMDYzOScsXG4gIH1cblxuICBleHBvcnQgZW51bSBOZnRzdG9yYWdlQXBpS2V5IHtcbiAgICBkZXYgPSAnZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKa2FXUTZaWFJvY2pvd2VFUkdNamN5TjJWa09EWmhSR1UxUlRNeVpEWkRaRUpsT0RjMFl6UkZORGxFT0RZMU9XWm1PRU1pTENKcGMzTWlPaUp1Wm5RdGMzUnZjbUZuWlNJc0ltbGhkQ0k2TVRZeU1ESTJORGswTXpjd05pd2libUZ0WlNJNkltUmxiVzhpZlEuZDRKNzBtaWt4UkI4YTV2d051NlNPNUhEQThKYXVldXNlQWo3UV95dE1DRScsXG4gIH1cblxuICBleHBvcnQgY29uc3QgbG9hZENvbmZpZyA9IGFzeW5jICgpID0+IHtcbiAgICBDb25maWcgPSBhd2FpdCBpbXBvcnQoJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQ2x1c3RlciA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB7IGNsdXN0ZXI6IGVudiwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG5cbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIHVybCwgbW9zdCBwcmlvcml0eVxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsICYmIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGg7XG4gICAgICByZXR1cm4gY3VzdG9tQ2x1c3RlclVybFtpbmRleF07XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXg6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkTWV0YXBsZXg7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnRlc3Q6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwubG9jYWxob3N0O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQnVuZGxyID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuQnVuZGxyVXJsLmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaERhc0FwaSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOiB7XG4gICAgICAgIGlmIChkYXNBcGlVcmwubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHRocm93IEVycm9yKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuREFTX0FQSV9VUkwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuQnVuZGxyVXJsLnByZC5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkRhc0FwaVVybC5kZXYuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaE5mdFN0b3JhZ2UgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgaWYgKCFuZnRTdG9yYWdlQXBpS2V5KSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoV2Fybm5pbmdNZXNzYWdlLk5GVF9TVE9SQUdFX0FQSV9LRVkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZnRTdG9yYWdlQXBpS2V5O1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLk5mdHN0b3JhZ2VBcGlLZXkuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgV1JBUFBFRF9UT0tFTl9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnU28xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMicsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRU1PX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdNZW1vMVVoa0pSZkh5dkxNY1Z1Y0p3eFhldUQ3MjhFcVZERHdRRHhGTU5vJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FVEFQTEVYX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdtZXRhcWJ4eFVlcmRxMjhjajFSYkFXa1lRbTN5YnpqYjZhOGJ0NTE4eDFzJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IENPTU1JVE1FTlQ6IENvbW1pdG1lbnQgPSAnY29uZmlybWVkJztcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vaXBmcy5pby9pcGZzJztcbiAgZXhwb3J0IGNvbnN0IElSWVNfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9nYXRld2F5LmlyeXMueHl6JztcbiAgZXhwb3J0IGNvbnN0IEJVTkRMUl9ORVRXT1JLX1VSTCA9IHN3aXRjaEJ1bmRscihDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gc3dpdGNoRGFzQXBpKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IHN3aXRjaE5mdFN0b3JhZ2UoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xTQ0FOX1VSTCA9ICdodHRwczovL3NvbHNjYW4uaW8nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MQU5BRk1fVVJMID0gJ2h0dHBzOi8vc29sYW5hLmZtJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1hSQVlfVVJMID0gJ2h0dHBzOi8veHJheS5oZWxpdXMueHl6Jztcbn1cblxuLy8gRGlzcGxheSBBbGwgQW5ub3VuY2VcbmNvbnNvbGUubG9nKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuQU5OT1VOQ0UpO1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMsIFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21tb24gfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcnksIFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBCYXRjaCB7XG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgYXJyOiBDb21tb24uQ29tbW9uW10gfCBNaW50Lk1pbnRbXSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGEgb2YgYXJyKSB7XG4gICAgICAgICAgaWYgKCFhLmluc3RydWN0aW9ucyAmJiAhYS5zaWduZXJzKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgYG9ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSBiYXRjaFN1Ym1pdCgpLlxuICAgICAgICAgICAgSW5kZXg6ICR7aX0sIFNldCB2YWx1ZTogJHtKU09OLnN0cmluZ2lmeShhKX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gYXJyLmZsYXRNYXAoKGEpID0+IGEuaW5zdHJ1Y3Rpb25zKTtcbiAgICAgICAgY29uc3Qgc2lnbmVycyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLnNpZ25lcnMpO1xuICAgICAgICBjb25zdCBmZWVQYXllcnMgPSBhcnIuZmlsdGVyKChhKSA9PiBhLmZlZVBheWVyICE9PSB1bmRlZmluZWQpO1xuICAgICAgICBsZXQgZmVlUGF5ZXIgPSBzaWduZXJzWzBdO1xuICAgICAgICBpZiAoZmVlUGF5ZXJzLmxlbmd0aCA+IDAgJiYgZmVlUGF5ZXJzWzBdLmZlZVBheWVyKSB7XG4gICAgICAgICAgZmVlUGF5ZXIgPSBmZWVQYXllcnNbMF0uZmVlUGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gc2lnbmVycztcbiAgICAgICAgaWYgKGZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSBmZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW2ZlZVBheWVyLCAuLi5zaWduZXJzXTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbnMubWFwKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZVR4c2l6ZS5pc01heFRyYW5zYWN0aW9uU2l6ZSh0cmFuc2FjdGlvbiwgZmVlUGF5ZXIucHVibGljS2V5KTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbW1pdG1lbnQsIENvbm5lY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5vZGUge1xuICBjb25zdCBzZXR0ZWQgPSB7XG4gICAgY2x1c3RlclVybDogJycsXG4gICAgY29tbWl0bWVudDogQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICAgY3VzdG9tQ2x1c3RlclVybDogW10gYXMgc3RyaW5nW10sXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldENvbm5lY3Rpb24gPSAoKTogQ29ubmVjdGlvbiA9PiB7XG4gICAgaWYgKHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyIGJ5IGpzb24gY29uZmlnXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFzZXR0ZWQuY2x1c3RlclVybCkge1xuICAgICAgLy8gZGVmYXVsdCBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFzZXR0ZWQuY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IENvbW1pdG1lbnQ7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBjb25zdCBNQVhfUkVUUklFUyA9IDM7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIENvbW1vbjxUID0gdW5kZWZpbmVkPiBpbXBsZW1lbnRzIENvbW1vblN0cnVjdHVyZTxUPiB7XG4gICAgc3RhdGljIE1BWF9UUkFOU0FDVElPTl9TSVpFID0gMTIzMjtcblxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICAgIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgICBmZWVQYXllcj86IEtleXBhaXI7XG4gICAgZGF0YT86IFQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgICAgZGF0YT86IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jICgpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbW1vbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBNaW50PFQgPSBQdWJrZXk+IGltcGxlbWVudHMgTWludFN0cnVjdHVyZTxUPiB7XG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyOiBLZXlwYWlyO1xuICAgIGRhdGE6IFQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgICAgc2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgICBkYXRhOiBULFxuICAgICkge1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICB9XG5cbiAgICBzdWJtaXQgPSBhc3luYyAoKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW50KSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IE1pbnRJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IHRoaXMuZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBDaGFuZ2UgbWV0YXBsZXggY2x1c3RlciBvbiBtYWlubmV0LWJldGEnKTtcbiAgICAgICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyOiBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgUGFydGlhbFNpZ25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBQYXJ0aWFsU2lnbiBpbXBsZW1lbnRzIFBhcnRpYWxTaWduU3RydWN0dXJlIHtcbiAgICBoZXhJbnN0cnVjdGlvbjogc3RyaW5nO1xuICAgIGRhdGE/OiBQdWJrZXk7XG4gICAgY2FuU3VibWl0PzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKGluc3RydWN0aW9uczogc3RyaW5nLCBtaW50PzogUHVia2V5LCBjYW5TdWJtaXQgPSBmYWxzZSkge1xuICAgICAgdGhpcy5oZXhJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gICAgICB0aGlzLmNhblN1Ym1pdCA9IGNhblN1Ym1pdDtcbiAgICB9XG5cbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGFydGlhbFNpZ24pKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlY29kZSA9IEJ1ZmZlci5mcm9tKHRoaXMuaGV4SW5zdHJ1Y3Rpb24sICdoZXgnKTtcbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb25Gcm9tSnNvbiA9IFRyYW5zYWN0aW9uLmZyb20oZGVjb2RlKTtcbiAgICAgICAgdHJhbnNhY3Rpb25Gcm9tSnNvbi5wYXJ0aWFsU2lnbihmZWVQYXllci50b0tleXBhaXIoKSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHdpcmVUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uRnJvbUpzb24uc2VyaWFsaXplKCk7XG4gICAgICAgIHJldHVybiBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5zZW5kUmF3VHJhbnNhY3Rpb24oXG4gICAgICAgICAgd2lyZVRyYW5zYWN0aW9uLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5LCBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbi8vIEBpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBjb25zdCBMT1dfVkFMVUUgPSAxMjc7IC8vIDB4N2ZcbiAgY29uc3QgSElHSF9WQUxVRSA9IDE2MzgzOyAvLyAweDNmZmZcbiAgY29uc3QgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gIC8qKlxuICAgKiBDb21wYWN0IHUxNiBhcnJheSBoZWFkZXIgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIGFycmF5IGhlYWRlclxuICAgKi9cbiAgY29uc3QgY29tcGFjdEhlYWRlciA9IChuOiBudW1iZXIpID0+XG4gICAgbiA8PSBMT1dfVkFMVUUgPyAxIDogbiA8PSBISUdIX1ZBTFVFID8gMiA6IDM7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IHNpemVcbiAgICogQHBhcmFtIG4gZWxlbWVudHMgaW4gdGhlIGNvbXBhY3QgYXJyYXlcbiAgICogQHBhcmFtIHNpemUgYnl0ZXMgcGVyIGVhY2ggZWxlbWVudFxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIGFycmF5XG4gICAqL1xuICBjb25zdCBjb21wYWN0QXJyYXlTaXplID0gKG46IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PlxuICAgIGNvbXBhY3RIZWFkZXIobikgKyBuICogc2l6ZTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHR4c2l6ZVxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gYSBzb2xhbmEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIGZlZVBheWVyIHRoZSBwdWJsaWNLZXkgb2YgdGhlIHNpZ25lclxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVR4U2l6ZSA9IChcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBmZWVQYXllclBrID0gW2ZlZVBheWVyLnRvQmFzZTU4KCldO1xuXG4gICAgY29uc3Qgc2lnbmVycyA9IG5ldyBTZXQ8c3RyaW5nPihmZWVQYXllclBrKTtcbiAgICBjb25zdCBhY2NvdW50cyA9IG5ldyBTZXQ8c3RyaW5nPihmZWVQYXllclBrKTtcblxuICAgIGNvbnN0IGl4c1NpemUgPSB0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMucmVkdWNlKChhY2MsIGl4KSA9PiB7XG4gICAgICBpeC5rZXlzLmZvckVhY2goKHsgcHVia2V5LCBpc1NpZ25lciB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHBrID0gcHVia2V5LnRvQmFzZTU4KCk7XG4gICAgICAgIGlmIChpc1NpZ25lcikgc2lnbmVycy5hZGQocGspO1xuICAgICAgICBhY2NvdW50cy5hZGQocGspO1xuICAgICAgfSk7XG5cbiAgICAgIGFjY291bnRzLmFkZChpeC5wcm9ncmFtSWQudG9CYXNlNTgoKSk7XG5cbiAgICAgIGNvbnN0IG5JbmRleGVzID0gaXgua2V5cy5sZW5ndGg7XG4gICAgICBjb25zdCBvcGFxdWVEYXRhID0gaXguZGF0YS5sZW5ndGg7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIGFjYyArXG4gICAgICAgIDEgKyAvLyBQSUQgaW5kZXhcbiAgICAgICAgY29tcGFjdEFycmF5U2l6ZShuSW5kZXhlcywgMSkgK1xuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG9wYXF1ZURhdGEsIDEpXG4gICAgICApO1xuICAgIH0sIDApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoc2lnbmVycy5zaXplLCA2NCkgKyAvLyBzaWduYXR1cmVzXG4gICAgICAzICsgLy8gaGVhZGVyXG4gICAgICBjb21wYWN0QXJyYXlTaXplKGFjY291bnRzLnNpemUsIDMyKSArIC8vIGFjY291bnRzXG4gICAgICAzMiArIC8vIGJsb2NraGFzaFxuICAgICAgY29tcGFjdEhlYWRlcih0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMubGVuZ3RoKSArIC8vIGluc3RydWN0aW9uc1xuICAgICAgaXhzU2l6ZVxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIElzIG1heCB0cmFuc2FjdGlvbiBzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgaXNPdmVyVHJhbnNhY3Rpb25TaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBib29sZWFuID0+IHtcbiAgICByZXR1cm4gY2FsY3VsYXRlVHhTaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllcikgPiBNQVhfVFJBTlNBQ1RJT05fU0laRTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyLCBMQU1QT1JUU19QRVJfU09MLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IEJpZ051bWJlciB9IGZyb20gJ2JpZ251bWJlci5qcyc7XG5pbXBvcnQgeyBFeHBsb3JlciwgRXhwbG9yZXJPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9nbG9iYWwnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG4vKipcbiAqIENyZWF0ZSBleHBsb3JlciB1cmwgZm9yIGFjY291bnQgYWRkcmVzcyBvciBzaWduYXR1cmVcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0V4cGxvcmVyVXJsID0gZnVuY3Rpb24gKFxuICBleHBsb3JlcjogRXhwbG9yZXIgPSBFeHBsb3Jlci5Tb2xzY2FuLFxuICBvcHRpb25zOiBQYXJ0aWFsPEV4cGxvcmVyT3B0aW9ucz4gPSB7fSxcbikge1xuICBjb25zdCBlbmRQb2ludFVybCA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50O1xuICBkZWJ1Z0xvZygnIyB0b0V4cGxvcmVyVXJsIHJwY0VuZHBvaW50OicsIGVuZFBvaW50VXJsKTtcbiAgbGV0IGNsdXN0ZXIgPSAnJztcbiAgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLnByZDtcbiAgfSBlbHNlIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnRlc3QpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDtcbiAgfSBlbHNlIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldikge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH0gZWxzZSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfVxuXG4gIGNvbnN0IGFkZHJlc3NPclNpZ25hdHVyZTogc3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICBsZXQgdXJsID0gJyc7XG5cbiAgaWYgKG9wdGlvbnMucmVwbGFjZVBhdGgpIHtcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgaWYgKEFjY291bnQuS2V5cGFpci5pc1B1YmtleShhZGRyZXNzT3JTaWduYXR1cmUpKSB7XG4gICAgLy8gYWRkcmVzc1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L2FkZHJlc3MvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHNpZ25hdHVyZVxuICAgIC8vIGZvciBJbnZhbGlkIHR5cGUgXCJuZXZlclwiIG9mIGFkZHJlc3NPclNpZ25hdHVyZSwgc28gYGFzIHN0cmluZ2BcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXJsO1xufTtcblxuLyoqXG4gKiBQdWJLZXkoQHNvbGFuYS1zdWl0ZSkgdG8gUHVibGljS2V5KEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBQdWJsaWNLZXlcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b1B1YmxpY0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNQdWJrZXkodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlB1YktleTogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy50b1N0cmluZygpKTtcbn07XG5cbi8qKlxuICogU2VjcmV0KEBzb2xhbmEtc3VpdGUpIHRvIEtleXBhaXIoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIEtleXBhaXJcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0tleXBhaXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzU2VjcmV0KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5TZWNyZXQ6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy50b1N0cmluZygpKTtcbiAgcmV0dXJuIEtleXBhaXIuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbn07XG5cbi8qKlxuICogTEFNUE9SVFMgdG8gU09MXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9Tb2wgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC50aW1lcyhMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcbiIsICJpbXBvcnQgeyBLZXlwYWlyIGFzIE9yaWdpbmFsLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgY2xhc3MgS2V5cGFpciB7XG4gICAgc2VjcmV0OiBTZWNyZXQ7XG4gICAgcHVia2V5OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgICBpZiAoIXBhcmFtcy5wdWJrZXkpIHtcbiAgICAgICAgY29uc3Qga2V5cGFpciA9IHBhcmFtcy5zZWNyZXQudG9LZXlwYWlyKCk7XG4gICAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVia2V5ID0gcGFyYW1zLnB1YmtleTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VjcmV0ID0gcGFyYW1zLnNlY3JldDtcbiAgICB9XG5cbiAgICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy5wdWJrZXkpO1xuICAgIH1cblxuICAgIHRvS2V5cGFpcigpOiBPcmlnaW5hbCB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICAgIHJldHVybiBPcmlnaW5hbC5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1B1YmtleSA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgUHVia2V5ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGlzU2VjcmV0ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBTZWNyZXQgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17ODcsODh9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXIgPT4ge1xuICAgICAgY29uc3Qga2V5cGFpciA9IE9yaWdpbmFsLmdlbmVyYXRlKCk7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyB0b0tleVBhaXIgPSAoa2V5cGFpcjogT3JpZ2luYWwpOiBLZXlwYWlyID0+IHtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC1idWJibGVndW0nO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICAgIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0TWFzdGVyRWRpdGlvbiA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnZWRpdGlvbicpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRUcmVlQXV0aG9yaXR5ID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Qmd1bVNpZ25lciA9ICgpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW0J1ZmZlci5mcm9tKCdjb2xsZWN0aW9uX2NwaScsICd1dGY4JyldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QXNzZXRJZCA9IChhZGRyZXNzOiBQdWJrZXksIGxlYWZJbmRleDogbnVtYmVyKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgQk4uQk4obGVhZkluZGV4KTtcbiAgICAgIGNvbnN0IFthc3NldElkXSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2Fzc2V0JywgJ3V0ZjgnKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBVaW50OEFycmF5LmZyb20obm9kZS50b0FycmF5KCdsZScsIDgpKSxcbiAgICAgICAgXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFzc2V0SWQudG9TdHJpbmcoKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcbmltcG9ydCB7IEFjY291bnQgYXMgUGRhIH0gZnJvbSAnLi9wZGEnO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG4vLyBpbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSB7XG4gIC4uLktleXBhaXIsXG4gIC4uLlBkYSxcbn07XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tbW9uIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFBhcnRpYWxTaWduIH0gZnJvbSAnLi9wYXJ0aWFsLXNpZ24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENhbGN1bGF0ZVR4c2l6ZSB9IGZyb20gJy4vY2FsY3VsYXRlLXR4c2l6ZSc7XG5pbXBvcnQgJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCAnfi9nbG9iYWwnO1xuXG5leHBvcnQgY29uc3QgVHJhbnNhY3Rpb25CdWlsZGVyID0ge1xuICAuLi5CYXRjaCxcbiAgLi4uQ2FsY3VsYXRlVHhzaXplLFxuICAuLi5NaW50LFxuICAuLi5Db21tb24sXG4gIC4uLlBhcnRpYWxTaWduLFxufTtcbiIsICJpbXBvcnQgeyBBbnlPYmplY3QgfSBmcm9tICd+L3R5cGVzL3V0aWxzJztcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gJy4vcmVzdWx0JztcblxuLyoqXG4gKiBjb252ZXJ0IGJ1ZmZlciB0byBBcnJheVxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXJcbiAqIEByZXR1cm5zIG51bWJlcltdXG4gKi9cbmV4cG9ydCBjb25zdCBidWZmZXJUb0FycmF5ID0gKGJ1ZmZlcjogQnVmZmVyKTogbnVtYmVyW10gPT4ge1xuICBjb25zdCBudW1zID0gW107XG4gIGZvciAoY29uc3QgYnl0ZSBvZiBidWZmZXIpIHtcbiAgICBudW1zLnB1c2goYnVmZmVyW2J5dGVdKTtcbiAgfVxuICByZXR1cm4gbnVtcztcbn07XG5cbi8qKlxuICogT3ZlcndyaXRlIEpTIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqZWN0XG4gKiBAcGFyYW0ge092ZXJ3cml0ZU9iamVjdFtdfSB0YXJnZXRzXG4gKiBAcmV0dXJucyBPYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IG92ZXJ3cml0ZU9iamVjdCA9IChcbiAgb2JqZWN0OiB1bmtub3duLFxuICB0YXJnZXRzOiB7XG4gICAgZXhpc3RzS2V5OiBzdHJpbmc7XG4gICAgd2lsbDogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHVua25vd24gfTtcbiAgfVtdLFxuKTogdW5rbm93biA9PiB7XG4gIGNvbnN0IHRoYXQ6IEFueU9iamVjdCA9IG9iamVjdCBhcyBBbnlPYmplY3Q7XG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgZGVsZXRlIHRoYXRbdGFyZ2V0LmV4aXN0c0tleV07XG4gICAgdGhhdFt0YXJnZXQud2lsbC5rZXldID0gdGFyZ2V0LndpbGwudmFsdWU7XG4gIH0pO1xuICByZXR1cm4gdGhhdDtcbn07XG5cbi8qKlxuICogRGlzcGxheSBsb2cgZm9yIHNvbGFuYS1zdWl0ZS1jb25maWcuanNcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGExXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEyXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEzXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGE0XG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z0xvZyA9IChcbiAgZGF0YTE6IHVua25vd24sXG4gIGRhdGEyOiB1bmtub3duID0gJycsXG4gIGRhdGEzOiB1bmtub3duID0gJycsXG4gIGRhdGE0OiB1bmtub3duID0gJycsXG4pOiB2b2lkID0+IHtcbiAgaWYgKENvbnN0YW50cy5pc0RlYnVnZ2luZyA9PT0gJ3RydWUnIHx8IHByb2Nlc3MuZW52LkRFQlVHID09PSAndHJ1ZScpIHtcbiAgICBjb25zb2xlLmxvZygnW0RFQlVHXScsIGRhdGExLCBkYXRhMiwgZGF0YTMsIGRhdGE0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBzbGVlcCB0aW1lclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNcbiAqIEByZXR1cm5zIFByb21pc2U8bnVtYmVyPlxuICovXG5leHBvcnQgY29uc3Qgc2xlZXAgPSBhc3luYyAoc2VjOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgc2VjICogMTAwMCkpO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNOb2RlID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMgIT0gbnVsbCAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPSBudWxsXG4gICk7XG59O1xuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9ialxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmV4cG9ydCBjb25zdCBpc1Byb21pc2UgPSAob2JqOiB1bmtub3duKTogb2JqIGlzIFByb21pc2U8dW5rbm93bj4gPT4ge1xuICByZXR1cm4gKFxuICAgICEhb2JqICYmXG4gICAgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpICYmXG4gICAgdHlwZW9mIChvYmogYXMgYW55KS50aGVuID09PSAnZnVuY3Rpb24nXG4gICk7XG59O1xuXG4vKipcbiAqIFRyeSBhc3luYyBtb25hZFxuICpcbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PFQsIEU+PlxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGFzeW5jYmxvY2s6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBQcm9taXNlPFJlc3VsdDxULCBFPj47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oYmxvY2s6ICgpID0+IFQpOiBSZXN1bHQ8VCwgRT47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGlucHV0OiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUmVzdWx0PFQsIEVycm9yPiB8IFByb21pc2U8UmVzdWx0PFQsIEVycm9yPj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHYgPSBpbnB1dCgpO1xuICAgIGlmIChpc1Byb21pc2UodikpIHtcbiAgICAgIHJldHVybiB2LnRoZW4oXG4gICAgICAgICh4OiBUKSA9PiBSZXN1bHQub2soeCksXG4gICAgICAgIChlcnI6IEUpID0+IFJlc3VsdC5lcnIoZXJyKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXN1bHQub2sodik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZSk7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKGUgYXMgc3RyaW5nKSk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGZpbmFsbHlJbnB1dCkge1xuICAgICAgZGVidWdMb2coJyMgZmluYWxseSBpbnB1dDonLCBmaW5hbGx5SW5wdXQpO1xuICAgICAgZmluYWxseUlucHV0KCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfHVuZGVmaW5lZH0gY3JlYXRlZF9hdFxuICogQHJldHVybnMgRGF0ZSB8IHVuZGVmaW5lZFxuICovXG5leHBvcnQgY29uc3QgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgPSAoXG4gIGNyZWF0ZWRfYXQ6IG51bWJlciB8IHVuZGVmaW5lZCxcbik6IERhdGUgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoY3JlYXRlZF9hdCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShjcmVhdGVkX2F0ICogMTAwMCk7XG4gIH1cbiAgcmV0dXJuO1xufTtcblxuLyoqXG4gKiBHZXQgdW5peCB0aW1lc3RhbXBcbiAqXG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHVuaXhUaW1lc3RhbXAgPSAoKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbn07XG4iLCAiLy8gZm9ya2VkOiBodHRwczovL2dpdGh1Yi5jb20vYmFkcmFwL3Jlc3VsdCwgdGhhbmsgeW91IGFkdmljZSAgQGp2aWlkZVxuaW1wb3J0IHsgVHJhbnNhY3Rpb25TaWduYXR1cmUgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQ29tbW9uU3RydWN0dXJlLFxuICBNaW50U3RydWN0dXJlLFxuICBQYXJ0aWFsU2lnblN0cnVjdHVyZSxcbn0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3I+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG5cbiAgdW53cmFwKCk6IFQ7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogVTtcbiAgdW53cmFwPFUsIFY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBWKTogVSB8IFY7XG4gIC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDEwXG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVSk6IFU7XG4gIHVud3JhcChvaz86ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiB1bmtub3duKTogdW5rbm93biB7XG4gICAgY29uc3QgciA9IHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sgPyBvayh2YWx1ZSkgOiB2YWx1ZSksXG4gICAgICAoZXJyb3IpID0+IChlcnIgPyBSZXN1bHQub2soZXJyKGVycm9yKSkgOiBSZXN1bHQuZXJyKGVycm9yKSksXG4gICAgKTtcbiAgICBpZiAoci5pc0Vycikge1xuICAgICAgdGhyb3cgci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHIudmFsdWU7XG4gIH1cblxuICAvLy8vIG1hcCAvLy8vXG4gIG1hcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogUmVzdWx0PFUsIEU+O1xuICBtYXA8VSwgRiBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBVLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBGLFxuICApOiBSZXN1bHQ8VSwgRj47XG4gIG1hcChvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IEVycm9yKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVyciA/IGVycihlcnJvcikgOiBlcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLy8gY2hhaW4gLy8vL1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuICBjaGFpbihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICAgZXJyPzogKGVycm9yOiBFKSA9PiBSZXN1bHQ8dW5rbm93bj4sXG4gICk6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKG9rLCBlcnIgfHwgKChlcnJvcikgPT4gUmVzdWx0LmVycihlcnJvcikpKTtcbiAgfVxuXG4gIC8vLy8gbWF0Y2ggLy8vL1xuICBtYXRjaDxVLCBGPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gRik6IHZvaWQgfCBQcm9taXNlPHZvaWQ+O1xuXG4gIG1hdGNoKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IHVua25vd24sXG4gICk6IHZvaWQgfCBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyKGVycm9yKSBhcyBFcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLyBzaW5nbGUgVHJhbnNhY3Rpb25CdWlsZGVyIC8vLy9cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBhc3luYyBzdWJtaXQoXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+IHtcbiAgICBjb25zdCByZXMgPSB0aGlzLm1hcChcbiAgICAgIGFzeW5jIChvaykgPT4ge1xuICAgICAgICBkZWJ1Z0xvZygnIyByZXN1bHQgc2luZ2xlIHN1Ym1pdDogJywgb2spO1xuICAgICAgICBpZiAoZmVlUGF5ZXIpIHtcbiAgICAgICAgICBjb25zdCBvYmogPSBvayBhcyBQYXJ0aWFsU2lnblN0cnVjdHVyZTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgb2JqLnN1Ym1pdChmZWVQYXllcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgb2JqID0gb2sgYXMgQ29tbW9uU3RydWN0dXJlIHwgTWludFN0cnVjdHVyZTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgb2JqLnN1Ym1pdCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgfSxcbiAgICApO1xuICAgIGlmIChyZXMuaXNFcnIpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKHJlcy5lcnJvcik7XG4gICAgfVxuICAgIHJldHVybiByZXMudmFsdWU7XG4gIH1cbn1cblxuLy8vIE11bHRpcGxlIFRyYW5zYWN0aW9uQnVpbGRlciAvLy8vXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBpbnRlcmZhY2UgQXJyYXk8VD4ge1xuICAgIHN1Ym1pdChmZWVQYXllcj86IFNlY3JldCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+O1xuICB9XG59XG5cbkFycmF5LnByb3RvdHlwZS5zdWJtaXQgPSBhc3luYyBmdW5jdGlvbiAoZmVlUGF5ZXI/OiBTZWNyZXQpIHtcbiAgaWYgKGZlZVBheWVyKSB7XG4gICAgbGV0IGkgPSAxO1xuICAgIGZvciBhd2FpdCAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0gZWxzZSBpZiAob2JqLnZhbHVlLmNhblN1Ym1pdCkge1xuICAgICAgICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggY2FuU3VibWl0Jyk7XG4gICAgICAgIGNvbnN0IHNpZyA9IGF3YWl0IChvYmogYXMgUGFydGlhbFNpZ25TdHJ1Y3R1cmUpLnN1Ym1pdChmZWVQYXllcik7XG4gICAgICAgIGlmIChzaWcuaXNFcnIpIHtcbiAgICAgICAgICByZXR1cm4gc2lnO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKHNpZy52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggb3RoZXIgdGhhbiBjYW5TdWJtaXQnKTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID09IGkpIHtcbiAgICAgICAgICAvLyBsYXN0IG9iamVjdFxuICAgICAgICAgIHJldHVybiBvYmouc3VibWl0KGZlZVBheWVyKTtcbiAgICAgICAgfVxuICAgICAgICBvYmouc3VibWl0KGZlZVBheWVyKTtcbiAgICAgIH1cbiAgICAgIGkrKztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBDb21tb25TdHJ1Y3R1cmUgfCBNaW50U3RydWN0dXJlW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgICBpZiAob2JqLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9IGVsc2UgaWYgKG9iai5pc09rKSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iai52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcignT25seSBBcnJheSBJbnN0cnVjdGlvbiBvYmplY3QnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBzdWJtaXQ6ICcsIGluc3RydWN0aW9ucyk7XG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQmF0Y2goKS5zdWJtaXQoaW5zdHJ1Y3Rpb25zKTtcbiAgfVxufTtcblxuY2xhc3MgSW50ZXJuYWxPazxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gdHJ1ZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgdmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgX2VycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xuICB9XG59XG5cbmNsYXNzIEludGVybmFsRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSBmYWxzZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSB0cnVlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSBlcnJvcjogRSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgX29rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBSZXN1bHQge1xuICBleHBvcnQgdHlwZSBPazxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxPazxULCBFPjtcbiAgZXhwb3J0IHR5cGUgRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbEVycjxULCBFPjtcblxuICBleHBvcnQgZnVuY3Rpb24gb2s8VCwgRSBleHRlbmRzIEVycm9yPih2YWx1ZTogVCk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbE9rKHZhbHVlKTtcbiAgfVxuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcj86IEUpOiBSZXN1bHQ8VCwgRT47XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yOiBFKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsRXJyKGVycm9yIHx8IEVycm9yKCkpO1xuICB9XG5cbiAgdHlwZSBVID0gUmVzdWx0PHVua25vd24+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gICAgUjE1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTQsIFIxNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICAgIE9rVHlwZTxSMTU+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgICAgfCBSMTVcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTRdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTNdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExIHwgUjEyIHwgUjEzXG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTFdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTBdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjldLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjk+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSN10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjZdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjY+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0PiwgT2tUeXBlPFI1Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjU+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjRdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSND5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVLCBSMyBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjJdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj5dLCBFcnJUeXBlPFIwIHwgUjEgfCBSMj4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjFdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT5dLCBFcnJUeXBlPFIwIHwgUjE+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+XSwgRXJyVHlwZTxSMD4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogW10pOiBSZXN1bHQ8W10+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFQgZXh0ZW5kcyBVW10gfCBSZWNvcmQ8c3RyaW5nLCBVPj4oXG4gICAgb2JqOiBULFxuICApOiBSZXN1bHQ8XG4gICAgeyBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDxpbmZlciBJPiA/IEkgOiBuZXZlciB9LFxuICAgIHtcbiAgICAgIFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+ID8gRSA6IG5ldmVyO1xuICAgIH1ba2V5b2YgVF1cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IHVua25vd24pOiB1bmtub3duIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICBjb25zdCByZXNBcnIgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBvYmopIHtcbiAgICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbSBhcyB1bmtub3duO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlc3VsdC5vayhyZXNBcnIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBpdGVtID0gKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPilba2V5XTtcbiAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgICAgcmVzW2tleV0gPSBpdGVtLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0Lm9rKHJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgUmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvciA9IEVycm9yPiA9XG4gIHwgUmVzdWx0Lk9rPFQsIEU+XG4gIHwgUmVzdWx0LkVycjxULCBFPjtcblxudHlwZSBPa1R5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PGluZmVyIE8+ID8gTyA6IG5ldmVyO1xudHlwZSBFcnJUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPlxuICA/IEVcbiAgOiBuZXZlcjtcbiIsICJpbXBvcnQgeyBJbnRlcm5hbENvbGxlY3Rpb24gfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBHcm91cGluZyB9IGZyb20gJ34vdHlwZXMvZGFzLWFwaSc7XG5pbXBvcnQge1xuICBDb2xsZWN0aW9uIGFzIENvbGxlY3Rpb25UeXBlLFxuICBJbnB1dENvbGxlY3Rpb24sXG4gIE9wdGlvbixcbn0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxJbnB1dENvbGxlY3Rpb24+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+ID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogaW5wdXQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdmVyaWZpZWQ6IGZhbHNlLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPixcbiAgICApOiBDb2xsZWN0aW9uVHlwZSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiBvdXRwdXQua2V5LnRvU3RyaW5nKCksXG4gICAgICAgIHZlcmlmaWVkOiBvdXRwdXQudmVyaWZpZWQsXG4gICAgICB9O1xuICAgIH07XG4gIH1cblxuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb25NaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBHcm91cGluZ1tdKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IG91dHB1dC5maW5kKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUuZ3JvdXBfa2V5ID09PSAnY29sbGVjdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUuZ3JvdXBfdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcyA/IHJlcy5ncm91cF92YWx1ZSA6ICcnO1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IENyZWF0b3JzLCBJbnB1dENyZWF0b3JzLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IEludGVybmFsQ3JlYXRvcnMgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDcmVhdG9ycyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDcmVhdG9yc1tdPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b0NvbXByZXNzZWROZnRJbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDcmVhdG9yc1tdPiB8IHVuZGVmaW5lZCxcbiAgICApOiBJbnRlcm5hbENyZWF0b3JzW10gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5wdXQhLm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+LFxuICAgICk6IENyZWF0b3JzW10gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9TdHJpbmcoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZGF0YS52ZXJpZmllZCxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7XG4gIE1ldGFkYXRhQXJncyxcbiAgVG9rZW5Qcm9ncmFtVmVyc2lvbixcbiAgVG9rZW5TdGFuZGFyZCxcbn0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb21wcmVzc2VkTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBNZXRhZGF0YUFyZ3MgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvQ29tcHJlc3NlZE5mdEluZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9JbmZyYShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBmYWxzZSxcbiAgICAgICAgaXNNdXRhYmxlOiBpbnB1dC5pc011dGFibGUgPz8gZmFsc2UsXG4gICAgICAgIGVkaXRpb25Ob25jZTogMCxcbiAgICAgICAgdG9rZW5TdGFuZGFyZDogVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgICAgdG9rZW5Qcm9ncmFtVmVyc2lvbjogVG9rZW5Qcm9ncmFtVmVyc2lvbi5PcmlnaW5hbCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSb3lhbHR5IHtcbiAgICBleHBvcnQgY29uc3QgVEhSRVNIT0xEID0gMTAwO1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFJveWFsdHkgfSBmcm9tICcuL3JveWFsdHknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFzc2V0QW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL25mdCc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTmZ0IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBBc3NldEFuZE9mZmNoYWluKTogTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4uaWQudG9TdHJpbmcoKSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IENvbGxlY3Rpb24uQ29sbGVjdGlvbk1pbnQuaW50b1VzZXIoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uZ3JvdXBpbmcsXG4gICAgICAgICkgYXMgUHVia2V5LFxuICAgICAgICBhdXRob3JpdGllczogb3V0cHV0Lm9uY2hhaW4uYXV0aG9yaXRpZXMsXG4gICAgICAgIHJveWFsdHk6IFJveWFsdHkuUm95YWx0eS5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5yb3lhbHR5LnBlcmNlbnQpLFxuICAgICAgICBuYW1lOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLm5hbWUsXG4gICAgICAgIHN5bWJvbDogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5tZXRhZGF0YS5zeW1ib2wsXG4gICAgICAgIHVyaTogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmNyZWF0b3JzKSEsXG4gICAgICAgIHRyZWVBZGRyZXNzOiBvdXRwdXQub25jaGFpbi5jb21wcmVzc2lvbi50cmVlLFxuICAgICAgICBpc0NvbXByZXNzZWQ6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLmNvbXByZXNzZWQsXG4gICAgICAgIGlzTXV0YWJsZTogb3V0cHV0Lm9uY2hhaW4ubXV0YWJsZSxcbiAgICAgICAgaXNCdXJuOiBvdXRwdXQub25jaGFpbi5idXJudCxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5zdXBwbHkuZWRpdGlvbl9ub25jZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucm95YWx0eS5wcmltYXJ5X3NhbGVfaGFwcGVuZWQsXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCkhLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBNZW1vLCBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNZW1vLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG91dHB1dFRyYW5zZmVyPzogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgICBpZiAob3V0cHV0VHJhbnNmZXIgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSAhPT0gJycpIHtcbiAgICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQgJiYgb3V0cHV0VHJhbnNmZXIucHJvZ3JhbSA9PT0gJ3NwbC10b2tlbicpIHtcbiAgICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBoaXN0b3J5Lm1lbW8gPSBvdXRwdXQucGFyc2VkO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTWludFRvIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogTWludFRvLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm1pbnRBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludEF1dGhvcml0eTtcbiAgICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgICBoaXN0b3J5LmFjY291bnQgPSBvdXRwdXQucGFyc2VkLmluZm8uYWNjb3VudCBhcyBzdHJpbmc7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG92ZXJ3cml0ZU9iamVjdCwgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHt9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgRmlsZVR5cGUsIFByb3BlcnRpZXMsIFN0b3JhZ2VUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSBhc3luYyAoXG4gICAgICBpbnB1dDogUHJvcGVydGllcyB8IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrRnVuYzogKFxuICAgICAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgICApID0+IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PixcbiAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICk6IFByb21pc2U8UHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2FsbGJhY2tGdW5jKGZpbGUuZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICAgICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3ZlcndyaXRlT2JqZWN0KGZpbGUsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICB3aWxsOiB7IGtleTogJ3VyaScsIHZhbHVlOiByZXMudmFsdWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmlucHV0LCBmaWxlcyB9IGFzIFByb3BlcnRpZXM7XG4gICAgfTtcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgT3B0aW9uLCBVc2VzIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBVc2VzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKG91dHB1dDogT3B0aW9uPFVzZXM+KTogVXNlcyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Vc2VzIH0gZnJvbSAnLi91c2VzJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgSW5wdXRUb2tlbk1ldGFkYXRhLCBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgTWV0YWRhdGFBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRva2VuTWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXRUb2tlbk1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBudWxsLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE1ldGFkYXRhQW5kT2ZmY2hhaW4sXG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICAgICk6IFRva2VuTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sKSxcbiAgICAgICAgdG9rZW5BbW91bnQ6IHRva2VuQW1vdW50LFxuICAgICAgICB1cmk6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgdXNlczogX1VzZXMuVXNlcy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4udXNlcyksXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCksXG4gICAgICAgIG9mZmNoYWluOiBvdXRwdXQub2ZmY2hhaW4sXG4gICAgICB9O1xuICAgIH07XG4gICAgLy8gZGVsZXRlIE5VTEwoMHgwMCkgc3RyaW5ncyBmdW5jdGlvblxuICAgIGV4cG9ydCBjb25zdCBkZWxldGVOdWxsU3RyaW5ncyA9IChzdHI6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcMC9nLCAnJyk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVHJhbnNmZXJDaGVja2VkIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBUcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQpIHtcbiAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgKTtcbiAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm11bHRpc2lnQXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm11bHRpc2lnQXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS5zaWduZXJzID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNpZ25lcnM7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IFRyYW5zZmVyIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVHJhbnNmZXIge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IFRyYW5zZmVyLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgLy8gdmFsaWRhdGlvbiBjaGVja1xuICAgICAgaWYgKCFvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24gfHwgIW91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgIGhpc3RvcnkuZGVzdGluYXRpb24gPSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICBoaXN0b3J5LnNvbCA9IG91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cz8udG9Tb2woKS50b1N0cmluZygpO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBDb21wcmVzc2VkTmZ0TWV0YWRhdGEgfSBmcm9tICcuL2NvbXByZXNzZWQtbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIE5mdCB9IGZyb20gJy4vbmZ0JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNZW1vIH0gZnJvbSAnLi9tZW1vJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICcuL3JlZ3VsYXItbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9wcm9wZXJ0aWVzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnLi90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFVzZXMgfSBmcm9tICcuL3VzZXMnO1xuXG5leHBvcnQgY29uc3QgQ29udmVydGVyID0ge1xuICAuLi5Db21wcmVzc2VkTmZ0TWV0YWRhdGEsXG4gIC4uLkNvbGxlY3Rpb24sXG4gIC4uLkNyZWF0b3JzLFxuICAuLi5OZnQsXG4gIC4uLk1lbW8sXG4gIC4uLk1pbnQsXG4gIC4uLlJlZ3VsYXJOZnRNZXRhZGF0YSxcbiAgLi4uUHJvcGVydGllcyxcbiAgLi4uUm95YWx0eSxcbiAgLi4uVG9rZW5NZXRhZGF0YSxcbiAgLi4uVHJhbnNmZXJDaGVja2VkLFxuICAuLi5UcmFuc2ZlcixcbiAgLi4uVXNlcyxcbn07XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IERldGFpbHMsIExpbWl0IH0gZnJvbSAnfi90eXBlcy92YWxpZGF0b3InO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBWYWxpZGF0b3Ige1xuICBleHBvcnQgbmFtZXNwYWNlIE1lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGV4cG9ydCBjb25zdCBTTUFMTF9OVU1CRVIgPSAndG9vIHNtYWxsJztcbiAgICBleHBvcnQgY29uc3QgQklHX05VTUJFUiA9ICd0b28gYmlnJztcbiAgICBleHBvcnQgY29uc3QgTE9OR19MRU5HVEggPSAndG9vIGxvbmcnO1xuICAgIGV4cG9ydCBjb25zdCBFTVBUWSA9ICdpbnZhbGlkIGVtcHR5IHZhbHVlJztcbiAgICBleHBvcnQgY29uc3QgSU5WQUxJRF9VUkwgPSAnaW52YWxpZCB1cmwnO1xuICAgIGV4cG9ydCBjb25zdCBPTkxZX05PREVfSlMgPSAnYHN0cmluZ2AgdHlwZSBpcyBvbmx5IE5vZGUuanMnO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IE5BTUVfTEVOR1RIID0gMzI7XG4gIGV4cG9ydCBjb25zdCBTWU1CT0xfTEVOR1RIID0gMTA7XG4gIGV4cG9ydCBjb25zdCBVUkxfTEVOR1RIID0gMjAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NQVggPSAxMDA7XG4gIGV4cG9ydCBjb25zdCBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVggPSAxMDAwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUlOID0gMDtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdyb3lhbHR5JztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTZWxsZXJGZWVCYXNpc1BvaW50cyA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogQ29udmVydGVyLlJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXgsXG4gID4oXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5yb3lhbHR5KSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzUm95YWx0eShtZXRhZGF0YS5yb3lhbHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJGZWVCYXNpc1BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEubmFtZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc05hbWUobWV0YWRhdGEubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLnN5bWJvbCkge1xuICAgICAgICAgICAgICByZXMgPSBpc1N5bWJvbChtZXRhZGF0YS5zeW1ib2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFcnIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goLi4ucmVzLmVycm9yLmRldGFpbHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgJ0NhdWdodCBpbiB0aGUgdmFsaWRhdGlvbiBlcnJvcnMuIHNlZSBpbmZvcm1hdGlvbiBlLmc6IGVycjxWYWxpZGF0b3JFcnJvcj4uZGV0YWlscyc7XG4gICAgICAgIHRocm93IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZSA9IFBpY2s8XG4gICAgT2ZmY2hhaW4sXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAnaW1hZ2UnIHwgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJ1xuICA+O1xuICB0eXBlIFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggPSBQaWNrPFxuICAgIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAncm95YWx0eScgfCAnZmlsZVBhdGgnXG4gID47XG4gIHR5cGUgUGlja01ldGFwbGV4ID0gUGljazxcbiAgICBEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdCxcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgaWYgKCFpbWFnZU9yVXJpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChpbWFnZU9yVXJpKSA+IFVSTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBpbWFnZU9yVXJpLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBVUkxfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oz86Jj0rLCUjXSsvZy50ZXN0KGltYWdlT3JVcmkpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5JTlZBTElEX1VSTCwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGRldGFpbHM6IERldGFpbHNbXTtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBkZXRhaWxzOiBEZXRhaWxzW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICB9XG59XG4iLCAiLy9AaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlQW1vdW50ID0gKFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGFtb3VudCAqIDEwICoqIG1pbnREZWNpbWFsO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIGNyZWF0ZUJ1cm5DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBCdXJuT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogQnVybiBleGlzdGluZyB0b2tlblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gICAgbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gICAgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gIG93bmVyT3JNdWx0aXNpZ1xuICAgKiBAcGFyYW0ge251bWJlcn0gICAgYnVybkFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gICAgdG9rZW5EZWNpbWFsc1xuICAgKiBAcGFyYW0ge1BhcnRpYWw8QnVybk9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb3duZXJPck11bHRpc2lnOiBTZWNyZXRbXSxcbiAgICBidXJuQW1vdW50OiBudW1iZXIsXG4gICAgdG9rZW5EZWNpbWFsczogbnVtYmVyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8QnVybk9wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgICBjb25zdCBrZXlwYWlycyA9IG93bmVyT3JNdWx0aXNpZy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIENhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQoYnVybkFtb3VudCwgdG9rZW5EZWNpbWFscyksXG4gICAgICAgIHRva2VuRGVjaW1hbHMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFtpbnN0XSwga2V5cGFpcnMsIHBheWVyLnRvS2V5cGFpcigpKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgUmVzdWx0LCBzbGVlcCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBUT0tFTl9QUk9HUkFNX0lEIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUGFyc2VkQWNjb3VudERhdGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGNvbnN0IE1BWF9SRVRSSUVTID0gMTA7XG4gIGNvbnN0IFJFVFJZX0RFTEFZID0gNTtcbiAgY29uc3QgTkZUU1RPUkFHRV9HQVRFV0FZID0gJ25mdHN0b3JhZ2UubGluayc7XG5cbiAgY29uc3QgY29udmVydGVyID0gKFxuICAgIG1ldGFkYXRhOiBNZXRhZGF0YSxcbiAgICBqc29uOiBPZmZjaGFpbixcbiAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICApOiBUb2tlbk1ldGFkYXRhID0+IHtcbiAgICByZXR1cm4gQ29udmVydGVyLlRva2VuTWV0YWRhdGEuaW50b1VzZXIoXG4gICAgICB7XG4gICAgICAgIG9uY2hhaW46IG1ldGFkYXRhLFxuICAgICAgICBvZmZjaGFpbjoganNvbixcbiAgICAgIH0sXG4gICAgICB0b2tlbkFtb3VudCxcbiAgICApO1xuICB9O1xuXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgY29uc3QgZmV0Y2hSZXRyeSA9IGFzeW5jICh1cmw6IHN0cmluZywgcmV0cmllcyA9IDApOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybC5yZXBsYWNlKCdpcGZzLmlvJywgTkZUU1RPUkFHRV9HQVRFV0FZKSk7XG5cbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAocmV0cmllcyA8IE1BWF9SRVRSSUVTKSB7XG4gICAgICAgIGRlYnVnTG9nKGBFcnJvciBmZXRjaGluZyBkYXRhIGZyb20gJHt1cmx9LCAke3JldHJpZXN9LCAke2Vycm9yfWApO1xuICAgICAgICBhd2FpdCBzbGVlcChSRVRSWV9ERUxBWSk7XG4gICAgICAgIHJldHVybiBmZXRjaFJldHJ5KHVybCwgcmV0cmllcyArIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVidWdMb2coYE1heCByZXRyaWVzIHJlYWNoZWQgKCR7TUFYX1JFVFJJRVN9KWApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG93bmVyIFB1YmtleVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHJldHVybiB7UHJvbWlzZTxSZXN1bHQ8VG9rZW5NZXRhZGF0YVtdfCBFcnJvcj4+fVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFRva2VuTWV0YWRhdGFbXSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgY29ubmVjdGlvbi5nZXRQYXJzZWRUb2tlbkFjY291bnRzQnlPd25lcihcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAge1xuICAgICAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRhdGFzID0gaW5mby52YWx1ZS5tYXAoYXN5bmMgKGQpID0+IHtcbiAgICAgICAgY29uc3QgbWludCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLm1pbnQgYXMgUHVia2V5O1xuICAgICAgICBjb25zdCB0b2tlbkFtb3VudCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50XG4gICAgICAgICAgLmFtb3VudCBhcyBzdHJpbmc7XG4gICAgICAgIGlmICh0b2tlbkFtb3VudCA9PT0gJzEnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgICBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50KSxcbiAgICAgICAgKVxuICAgICAgICAgIC50aGVuKGFzeW5jIChtZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoUmV0cnkobWV0YWRhdGEuZGF0YS51cmkpLnRoZW4oKGpzb246IGFueSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gY29udmVydGVyKG1ldGFkYXRhLCBqc29uLCB0b2tlbkFtb3VudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBkZWJ1Z0xvZygnIyBbRmV0Y2ggZXJyb3JdJywgZXJyKSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZmlsdGVycyA9IChhd2FpdCBQcm9taXNlLmFsbChkYXRhcykpLmZpbHRlcihcbiAgICAgICAgKGRhdGEpID0+IGRhdGEgIT09IHVuZGVmaW5lZCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gZmlsdGVycyBhcyBUb2tlbk1ldGFkYXRhW107XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBtaW50IGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFRva2VuTWV0YWRhdGEsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IE1ldGFkYXRhLmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgQWNjb3VudC5QZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICApO1xuICAgICAgZGVidWdMb2coJyMgZmluZEJ5TWludCBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgPT09IDApIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgYFRoaXMgbWludCBpcyBub3QgU1BMLVRPS0VOLCB0b2tlblN0YW5kYXJkOiR7bWV0YWRhdGEudG9rZW5TdGFuZGFyZH1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkQWNjb3VudEluZm8obWludC50b1B1YmxpY0tleSgpKTtcbiAgICAgIGNvbnN0IHRva2VuQW1vdW50ID0gKGluZm8udmFsdWU/LmRhdGEgYXMgUGFyc2VkQWNjb3VudERhdGEpLnBhcnNlZC5pbmZvXG4gICAgICAgIC5zdXBwbHkgYXMgc3RyaW5nO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IChhd2FpdCAoXG4gICAgICAgIGF3YWl0IGZldGNoKG1ldGFkYXRhLmRhdGEudXJpKVxuICAgICAgKS5qc29uKCkpIGFzIE9mZmNoYWluO1xuICAgICAgcmV0dXJuIGNvbnZlcnRlcihtZXRhZGF0YSwgcmVzcG9uc2UsIHRva2VuQW1vdW50KTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBGcmVlemVPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBGcmVlemluZyBhIHRhcmdldCBuZnRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RnJlZXplT3B0aW9ucz59IG9wdGlvbnMgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj59XG4gICAqL1xuICBleHBvcnQgY29uc3QgZnJlZXplID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8RnJlZXplT3B0aW9ucz4gPSB7fSxcbiAgKTogUmVzdWx0PENvbW1vblN0cnVjdHVyZSwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgQWNjb3VudC5LZXlwYWlyKHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIENhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVHJhbnNmZXIgd2l0aG91dCBzb2xhbmEgc29sLCBkZWxlZ2F0ZSBmZWVwYXllciBmb3IgY29tbWlzc2lvblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1NlY3JldH0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWxcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBnYXNMZXNzVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBTZWNyZXQsXG4gICAgZGVzdDogUHVia2V5LFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25TdHJ1Y3R1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb3duZXJQdWJsaWNLZXkgPSBvd25lci50b0tleXBhaXIoKS5wdWJsaWNLZXk7XG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFjY291bnQuQXNzb2NpYXRlZC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXJQdWJsaWNLZXkudG9TdHJpbmcoKSxcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG5cbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpbnN0MiA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBzb3VyY2VUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBkZXN0VG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyUHVibGljS2V5LFxuICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIFtvd25lci50b0tleXBhaXIoKV0sXG4gICAgICApO1xuXG4gICAgICAvLyByZXR1cm4gYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICBpZiAoIWRlc3RUb2tlbi5pbnN0KSB7XG4gICAgICAgIHR4LmFkZChpbnN0Mik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZXR1cm4gaW5zdHJ1Y3Rpb24gYW5kIHVuZGVjaWRlZCBhc3NvY2lhdGVkIHRva2VuIGFjY291bnRcbiAgICAgICAgdHguYWRkKGRlc3RUb2tlbi5pbnN0KS5hZGQoaW5zdDIpO1xuICAgICAgfVxuXG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgdHgucGFydGlhbFNpZ24ob3duZXIudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzZXJpYWxpemVkVHggPSB0eC5zZXJpYWxpemUoe1xuICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGhleCA9IHNlcmlhbGl6ZWRUeC50b1N0cmluZygnaGV4Jyk7XG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5QYXJ0aWFsU2lnbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIEF1dGhvcml0eVR5cGUsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uLFxuICBjcmVhdGVTZXRBdXRob3JpdHlJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQsXG4gIE1JTlRfU0laRSxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5pbXBvcnQge1xuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSwgdW5peFRpbWVzdGFtcCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnB1dFRva2VuTWV0YWRhdGEsIE1pbnRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAnfi92YWxpZGF0b3InO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuaW1wb3J0IHsgTWludFN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBERUZBVUxUX1NUT1JBR0VfVFlQRSA9ICduZnRTdG9yYWdlJztcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlRnJlZXplQXV0aG9yaXR5ID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogUHVibGljS2V5LFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBBdXRob3JpdHlUeXBlLkZyZWV6ZUFjY291bnQsXG4gICAgICBmcmVlemVBdXRob3JpdHksXG4gICAgKTtcbiAgfTtcblxuICAvL0BpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgdG9rZW5NZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9IGF3YWl0IGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQoY29ubmVjdGlvbik7XG4gICAgY29uc3QgbWV0YWRhdGFQZGEgPSBBY2NvdW50LlBkYS5nZXRNZXRhZGF0YShtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRva2VuQXNzb2NpYXRlZCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBbXTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICAgIHNwYWNlOiBNSU5UX1NJWkUsXG4gICAgICAgIGxhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBvd25lcixcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgICBvd25lcixcbiAgICAgICAgbWludCxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluc3RydWN0aW9ucy5wdXNoKFxuICAgICAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBDYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgaW5zdHJ1Y3Rpb25zLnB1c2goXG4gICAgICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhUGRhLFxuICAgICAgICAgIG1pbnQsXG4gICAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICAgIGRhdGE6IHRva2VuTWV0YWRhdGEsXG4gICAgICAgICAgICBpc011dGFibGUsXG4gICAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogbnVsbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiBpbnN0cnVjdGlvbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNQTC1UT0tFTiBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBvd25lciAgICAgIC8vIHRva2VuIG93bmVyIFNlY3JldFxuICAgKiBAcGFyYW0ge251bWJlcn0gdG90YWxBbW91bnQgLy8gdG90YWwgbnVtYmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW50RGVjaW1hbCAvLyB0b2tlbiBkZWNpbWFsXG4gICAqIEBwYXJhbSB7SW5wdXRUb2tlbk1ldGFkYXRhfSBpbnB1dCAgICAgICAvLyB0b2tlbiBtZXRhZGF0YVxuICAgKiBAcGFyYW0ge1BhcnRpYWw8TWludE9wdGlvbnM+fSBvcHRpb25zICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRJbnN0cnVjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFNlY3JldCxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgaW5wdXQ6IElucHV0VG9rZW5NZXRhZGF0YSxcbiAgICBvcHRpb25zOiBQYXJ0aWFsPE1pbnRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50U3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPElucHV0VG9rZW5NZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IGZlZVBheWVyLCBmcmVlemVBdXRob3JpdHkgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBzdG9yYWdlVHlwZSA9IGlucHV0LnN0b3JhZ2VUeXBlIHx8IERFRkFVTFRfU1RPUkFHRV9UWVBFO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogb3duZXI7XG4gICAgICBpbnB1dC5yb3lhbHR5ID0gMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gMDtcbiAgICAgIGNvbnN0IG93bmVyUHVibGljS2V5ID0gb3duZXIudG9LZXlwYWlyKCkucHVibGljS2V5O1xuXG4gICAgICBjb25zdCBzdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQgYXMgSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgICAgaW5wdXQucm95YWx0eSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIHN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gdW5peFRpbWVzdGFtcCgpO1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgLy8gdXBsb2FkIGZpbGVcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkKFxuICAgICAgICAgIHN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBzdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIGNvbnN0IGltYWdlID0geyBpbWFnZTogaW5wdXQudXJpIH07XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWREYXRhKFxuICAgICAgICAgIHsgLi4uc3RvcmFnZU1ldGFkYXRhLCAuLi5pbWFnZSB9LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydGVyLlRva2VuTWV0YWRhdGEuaW50b0luZnJhKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXJpKTtcblxuICAgICAgY29uc3QgbWludCA9IEFjY291bnQuS2V5cGFpci5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGluc3RzID0gYXdhaXQgY3JlYXRlTWludChcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lclB1YmxpY0tleSxcbiAgICAgICAgdG90YWxBbW91bnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRnJlZXplQXV0aG9yaXR5KFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXJQdWJsaWNLZXksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5NaW50KFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW293bmVyLnRvS2V5cGFpcigpLCBtaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG1pbnQucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBpc0Jyb3dzZXIsIGlzTm9kZSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIElkZW50aXR5LCBUYWdzLCBVcGxvYWRhYmxlRmlsZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgUGhhbnRvbVByb3ZpZGVyIH0gZnJvbSAnfi90eXBlcy9waGFudG9tJztcbmltcG9ydCBJcnlzLCB7IFdlYklyeXMgfSBmcm9tICdAaXJ5cy9zZGsnO1xuaW1wb3J0IHsgVXBsb2FkUmVzcG9uc2UgfSBmcm9tICdAaXJ5cy9zZGsvYnVpbGQvZXNtL2NvbW1vbi90eXBlcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUHJvdmVuYW5jZUxheWVyIHtcbiAgY29uc3QgVE9LRU4gPSAnc29sYW5hJztcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChcbiAgICB1cGxvYWRGaWxlOiBGaWxlVHlwZSxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICAgdGFncz86IFRhZ3MsXG4gICk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGxldCByZWNlaXB0ITogVXBsb2FkUmVzcG9uc2U7XG4gICAgaWYgKGlzVXBsb2FkYWJsZSh1cGxvYWRGaWxlKSkge1xuICAgICAgcmVjZWlwdCA9IGF3YWl0IGlyeXMudXBsb2FkRmlsZSh1cGxvYWRGaWxlLCB7IHRhZ3MgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBmaWxlIHR5cGUgb3IgZW52aXJvbWVudCcpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7Q29uc3RhbnRzLklSWVNfR0FURVdBWV9VUkx9LyR7cmVjZWlwdC5pZH1gO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIGRhdGE6IHN0cmluZyxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICAgdGFncz86IFRhZ3MsXG4gICk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgY29uc3QgaXJ5cyA9IGF3YWl0IGdldElyeXMoaWRlbnRpdHkpO1xuICAgIGNvbnN0IHJlY2VpcHQgPSBhd2FpdCBpcnlzLnVwbG9hZChkYXRhLCB7IHRhZ3MgfSk7XG4gICAgcmV0dXJuIGAke0NvbnN0YW50cy5JUllTX0dBVEVXQVlfVVJMfS8ke3JlY2VpcHQuaWR9YDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOb2RlYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyA9PiB7XG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc0Jyb3dzZXJhYmxlID0gKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgRmlsZSA9PiB7XG4gICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGaWxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzVXBsb2FkYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFVwbG9hZGFibGVGaWxlVHlwZSA9PiB7XG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGaWxlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBmdW5kQXJ3ZWF2ZSA9IGFzeW5jIChcbiAgICB1cGxvYWRGaWxlOiBGaWxlVHlwZSxcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCBieXRlTGVuZ3RoID0gYXdhaXQgdG9CeXRlTGVuZ3RoKHVwbG9hZEZpbGUpO1xuICAgIGNvbnN0IHdpbGxQYXkgPSBhd2FpdCBjYWxjdWxhdGVDb3N0KGJ5dGVMZW5ndGgsIGlkZW50aXR5KTtcbiAgICBjb25zdCBmdW5kVHggPSBhd2FpdCBpcnlzLmZ1bmQoaXJ5cy51dGlscy50b0F0b21pYyh3aWxsUGF5KSk7XG4gICAgZGVidWdMb2coJyMgZnVuZFR4OiAnLCBmdW5kVHgpO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgdG9CeXRlTGVuZ3RoID0gYXN5bmMgKGNvbnRlbnQ6IEZpbGVUeXBlKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICBsZXQgbGVuZ3RoOiBudW1iZXIgPSAxMDA7XG4gICAgaWYgKGlzTm9kZWFibGUoY29udGVudCkpIHtcbiAgICAgIGxlbmd0aCA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhjb250ZW50KS5sZW5ndGg7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXJhYmxlKGNvbnRlbnQpKSB7XG4gICAgICBsZW5ndGggPSBjb250ZW50LnNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBjb250ZW50IHR5cGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldElyeXMgPSBhc3luYyA8VCBleHRlbmRzIElyeXMgfCBXZWJJcnlzPihcbiAgICBpZGVudGl0eTogSWRlbnRpdHksXG4gICkgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIChhd2FpdCBnZXROb2RlSXJ5cyhpZGVudGl0eSBhcyBTZWNyZXQpKSBhcyBUO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZ2V0QnJvd3NlcklyeXMoaWRlbnRpdHkgYXMgUGhhbnRvbVByb3ZpZGVyKSkgYXMgVDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ09ubHkgTm9kZS5qcyBvciBCcm93c2VyJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0Tm9kZUlyeXMgPSBhc3luYyAoc2VjcmV0OiBTZWNyZXQpID0+IHtcbiAgICBjb25zdCBjbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgIH0pO1xuICAgIGNvbnN0IHVybCA9IENvbnN0YW50cy5CVU5ETFJfTkVUV09SS19VUkw7XG4gICAgY29uc3QgdG9rZW4gPSBUT0tFTjtcbiAgICBjb25zdCBrZXkgPSBzZWNyZXQ7XG4gICAgY29uc3QgaXJ5cyA9IG5ldyBJcnlzKHtcbiAgICAgIHVybCxcbiAgICAgIHRva2VuLFxuICAgICAga2V5LFxuICAgICAgY29uZmlnOiB7IHByb3ZpZGVyVXJsOiBjbHVzdGVyVXJsIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIGlyeXM7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXRCcm93c2VySXJ5cyA9IGFzeW5jIChcbiAgICBwcm92aWRlcjogUGhhbnRvbVByb3ZpZGVyLFxuICApOiBQcm9taXNlPFdlYklyeXM+ID0+IHtcbiAgICBjb25zdCBjbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgIH0pO1xuICAgIGNvbnN0IHVybCA9IENvbnN0YW50cy5CVU5ETFJfTkVUV09SS19VUkw7XG4gICAgY29uc3QgdG9rZW4gPSBUT0tFTjtcbiAgICBjb25zdCB3YWxsZXQgPSB7IHJwY1VybDogY2x1c3RlclVybCwgbmFtZTogVE9LRU4sIHByb3ZpZGVyOiBwcm92aWRlciB9O1xuICAgIGNvbnN0IHdlYklyeXMgPSBuZXcgV2ViSXJ5cyh7IHVybCwgdG9rZW4sIHdhbGxldCB9KTtcbiAgICBhd2FpdCB3ZWJJcnlzLnJlYWR5KCk7XG4gICAgcmV0dXJuIHdlYklyeXM7XG4gIH07XG5cbiAgY29uc3QgY2FsY3VsYXRlQ29zdCA9IGFzeW5jIChzaXplOiBudW1iZXIsIGlkZW50aXR5OiBJZGVudGl0eSkgPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCBwcmljZUF0b21pYyA9IGF3YWl0IGlyeXMuZ2V0UHJpY2Uoc2l6ZSk7XG4gICAgY29uc3QgcHJpY2VDb252ZXJ0ZWQgPSBpcnlzLnV0aWxzLmZyb21BdG9taWMocHJpY2VBdG9taWMpO1xuICAgIGRlYnVnTG9nKCcjIHNpemU6ICcsIHNpemUpO1xuICAgIGRlYnVnTG9nKGAjIHByaWNlOiAke3ByaWNlQ29udmVydGVkfWApO1xuICAgIHJldHVybiBwcmljZUNvbnZlcnRlZDtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQcm92ZW5hbmNlTGF5ZXIgfSBmcm9tICcuL3Byb3ZlbmFuY2UtbGF5ZXInO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBcndlYXZlIHtcbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgZmlsZTogJywgZmlsZVBhdGgpO1xuICAgICAgYXdhaXQgUHJvdmVuYW5jZUxheWVyLmZ1bmRBcndlYXZlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgICByZXR1cm4gYXdhaXQgUHJvdmVuYW5jZUxheWVyLnVwbG9hZEZpbGUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IChcbiAgICBtZXRhZGF0YTogT2ZmY2hhaW4sXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhIGRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgIHJldHVybiBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIudXBsb2FkRGF0YShcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpLFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQmxvYiwgTkZUU3RvcmFnZSB9IGZyb20gJ25mdC5zdG9yYWdlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBQcm92ZW5hbmNlTGF5ZXIgfSBmcm9tICcuL3Byb3ZlbmFuY2UtbGF5ZXInO1xuaW1wb3J0IHsgRmlsZVR5cGUsIE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOZnRTdG9yYWdlIHtcbiAgY29uc3QgY3JlYXRlR2F0ZXdheVVybCA9IChjaWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGAke0NvbnN0YW50cy5ORlRfU1RPUkFHRV9HQVRFV0FZX1VSTH0vJHtjaWR9YDtcblxuICBjb25zdCBjb25uZWN0ID0gKCkgPT4ge1xuICAgIENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuY2FsY3VsYXRlUHJvYmFiaWxpdHkoKSAmJlxuICAgICAgY29uc29sZS53YXJuKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuTkZUX1NUT1JBR0VfQVBJX0tFWSk7XG4gICAgcmV0dXJuIG5ldyBORlRTdG9yYWdlKHsgdG9rZW46IENvbnN0YW50cy5ORlRfU1RPUkFHRV9BUElfS0VZIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIGZpbGVUeXBlOiBGaWxlVHlwZSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlVHlwZSk7XG4gICAgICBsZXQgZmlsZSE6IEJ1ZmZlcjtcbiAgICAgIGlmIChQcm92ZW5hbmNlTGF5ZXIuaXNOb2RlYWJsZShmaWxlVHlwZSkpIHtcbiAgICAgICAgZmlsZSA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlVHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKFByb3ZlbmFuY2VMYXllci5pc0Jyb3dzZXJhYmxlKGZpbGVUeXBlKSkge1xuICAgICAgICBmaWxlID0gQnVmZmVyLmZyb20oYXdhaXQgZmlsZVR5cGUuYXJyYXlCdWZmZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWxlID0gQnVmZmVyLmZyb20oZmlsZVR5cGUgYXMgQXJyYXlCdWZmZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9iSW1hZ2UgPSBuZXcgQmxvYihbZmlsZV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSW1hZ2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnRcbiAgICpcbiAgICogQHBhcmFtIHtPZmZjaGFpbn0gc3RvcmFnZURhdGFcbiAgICoge1xuICAgKiAgIG5hbWU/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZGVzY3JpcHRpb24/OiB7c3RyaW5nfSAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgc2VsbGVyRmVlQmFzaXNQb2ludHM/OiBudW1iZXIgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGltYWdlPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAvLyB1cGxvYWRlZCB1cmkgb2Ygb3JpZ2luYWwgY29udGVudFxuICAgKiAgIGV4dGVybmFsX3VybD86IHtzdHJpbmd9ICAgICAgICAgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IHtKc29uTWV0YWRhdGFBdHRyaWJ1dGVbXX0gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiB7SnNvbk1ldGFkYXRhUHJvcGVydGllczxVcmk+fSAvLyBpbmNsdWRlZCBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uICAgICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddOiB7dW5rbm93bn0gICAgICAgICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIHN0b3JhZ2VEYXRhOiBPZmZjaGFpbixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhZGF0YTogJywgc3RvcmFnZURhdGEpO1xuXG4gICAgICBjb25zdCBibG9iSnNvbiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzdG9yYWdlRGF0YSldKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkpzb24pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBGaWxlVHlwZSwgT2ZmY2hhaW4sIFN0b3JhZ2VUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IEFyd2VhdmUgfSBmcm9tICcuL2Fyd2VhdmUnO1xuaW1wb3J0IHsgTmZ0U3RvcmFnZSB9IGZyb20gJy4vbmZ0LXN0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0b3JhZ2Uge1xuICBleHBvcnQgY29uc3QgdG9Db252ZXJ0T2ZmY2hhaW5kYXRhID0gKFxuICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICk6IE9mZmNoYWluID0+IHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgZGVzY3JpcHRpb246IGlucHV0LmRlc2NyaXB0aW9uLFxuICAgICAgc2VsbGVyX2ZlZV9iYXNpc19wb2ludHM6IHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgZXh0ZXJuYWxfdXJsOiBpbnB1dC5leHRlcm5hbF91cmwsXG4gICAgICBhdHRyaWJ1dGVzOiBpbnB1dC5hdHRyaWJ1dGVzLFxuICAgICAgcHJvcGVydGllczogaW5wdXQucHJvcGVydGllcyxcbiAgICAgIGltYWdlOiAnJyxcbiAgICAgIG9wdGlvbnM6IGlucHV0Lm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZEZpbGUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZEZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIGlucHV0OiBPZmZjaGFpbixcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkRGF0YShpbnB1dCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkRGF0YShpbnB1dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZCA9IGFzeW5jIChcbiAgICBpbnB1dDogT2ZmY2hhaW4sXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJyAmJiAhZmVlUGF5ZXIpIHtcbiAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICB9XG4gICAgY29uc3Qgc3RvcmFnZSA9IGF3YWl0IChcbiAgICAgIGF3YWl0IHVwbG9hZEZpbGUoZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcilcbiAgICApLnVud3JhcChcbiAgICAgIGFzeW5jIChvazogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgIHJldHVybiBhd2FpdCB1cGxvYWREYXRhKGlucHV0LCBzdG9yYWdlVHlwZSwgZmVlUGF5ZXIpO1xuICAgICAgfSxcbiAgICAgIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGlmICghc3RvcmFnZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0VtcHR5IHN0b3JhZ2Ugb2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBzdG9yYWdlO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQge1xuICBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgVGhhd09wdGlvbnMgfSBmcm9tICd+L3R5cGVzL3NwbC10b2tlbic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIFRoYXdpbmcgYSB0YXJnZXQgTkZUXG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8VGhhd09wdGlvbnM+fSBvcHRpb25zICAvLyBvcHRpb25zXG4gICAqIEByZXR1cm4ge1Jlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPn1cbiAgICovXG4gIGV4cG9ydCBjb25zdCB0aGF3ID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8VGhhd09wdGlvbnM+ID0ge30sXG4gICk6IFJlc3VsdDxDb21tb25TdHJ1Y3R1cmUsIEVycm9yPiA9PiB7XG4gICAgY29uc3QgcGF5ZXIgPSBvcHRpb25zLmZlZVBheWVyID8gb3B0aW9ucy5mZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ldyBBY2NvdW50LktleXBhaXIoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQ29tbW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQ2FsY3VsYXRvciB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNaW50T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVHJhbnNmZXIgTkZUIGZvciBvbmx5IG11bHRpU2lnIGFjY291bnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgICAvLyBtaW50ZWQgYWNjb3VudFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAgIC8vIGN1cnJlbnQgbXVsdGlzaWcgb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGRlc3QgICAgICAgICAgICAgICAvLyBuZXcgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXRbXX0gb3duZXJPck11bHRpc2lnICAvLyBvd25lciBvciBtdWx0aXNpZyBhY2NvdW50IFNlY3JldFxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50ICAgICAgICAgICAgIC8vIHdhbnQgdG8gdHJhbnNmZXIgU09MIGFtb3VudFxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWwgICAgICAgIC8vIG1pbnRlZCB0b2tlbiBkZWNpbWFsXG4gICAqIEBwYXJhbSB7UGFydGlhbDxNaW50T3B0aW9ucz59IG9wdGlvbnMgICAgICAgLy8gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPHVua25vd24+LCBFcnJvcj4gfVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBvd25lck9yTXVsdGlzaWc6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgb3B0aW9uczogUGFydGlhbDxNaW50T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gb3B0aW9ucy5mZWVQYXllciA/IG9wdGlvbnMuZmVlUGF5ZXIgOiBvd25lck9yTXVsdGlzaWdbMF07XG4gICAgICBjb25zdCBwYXllclB1YmtleSA9IG5ldyBBY2NvdW50LktleXBhaXIoeyBzZWNyZXQ6IHBheWVyIH0pO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBvd25lck9yTXVsdGlzaWcubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcbiAgICAgIGNvbnN0IHNvdXJjZVRva2VuID0gYXdhaXQgQWNjb3VudC5Bc3NvY2lhdGVkLm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lci50b1N0cmluZygpLFxuICAgICAgICBwYXllclB1YmtleS5wdWJrZXksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBY2NvdW50LkFzc29jaWF0ZWQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIHBheWVyUHVia2V5LnB1YmtleSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBDYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZGVzdFRva2VuLmluc3QgPyBbZGVzdFRva2VuLmluc3QsIGluc3RdIDogW2luc3RdO1xuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24oXG4gICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSxrQkFBQUE7QUFBQTtBQUFBOzs7QUNBQSx1QkFBK0M7OztBQ0EvQyxrQkFBc0M7QUFDdEMsa0JBQTZCO0FBRTdCLElBQUksU0FBUyxZQUFBQztBQUVOLElBQVU7QUFBQSxDQUFWLENBQVVDLGVBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMscUJBQVY7QUFDTCxVQUFNLGFBQWE7QUFDbkIsUUFBSSxZQUFZO0FBQ1QsSUFBTUEsaUJBQUEsc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzVCLElBQU1BLGlCQUFBLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPcEIsSUFBTUEsaUJBQUEsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFqQixJQUFNQSxpQkFBQSx1QkFBdUIsTUFBZTtBQUNqRCxZQUFNLGNBQWMsS0FBSyxPQUFPO0FBQ2hDLFlBQU0sY0FBYyxJQUFJO0FBQ3hCLFVBQUksQ0FBQyxhQUFhLGNBQWMsYUFBYTtBQUMzQyxvQkFBWTtBQUNaLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxLQWpDZSxrQkFBQUQsV0FBQSxvQkFBQUEsV0FBQTtBQUFBLEdBREY7QUFBQSxDQXNDVixDQUFVQSxlQUFWO0FBQ0UsRUFBTUEsV0FBQSxpQkFBaUIsT0FBTyxRQUFRO0FBQ3RDLEVBQU1BLFdBQUEsbUJBQW1CLE9BQU8sUUFBUTtBQUN4QyxFQUFNQSxXQUFBLGNBQWMsT0FBTztBQUMzQixFQUFNQSxXQUFBLG1CQUFtQixPQUFPO0FBQ2hDLEVBQU1BLFdBQUEsWUFBWSxPQUFPO0FBRXpCLE1BQUs7QUFBTCxJQUFLRSxhQUFMO0FBQ0wsSUFBQUEsU0FBQSxTQUFNO0FBQ04sSUFBQUEsU0FBQSxpQkFBYztBQUNkLElBQUFBLFNBQUEsU0FBTTtBQUNOLElBQUFBLFNBQUEsVUFBTztBQUNQLElBQUFBLFNBQUEsZUFBWTtBQUFBLEtBTEYsVUFBQUYsV0FBQSxZQUFBQSxXQUFBO0FBUUwsTUFBSztBQUFMLElBQUtHLGlCQUFMO0FBQ0wsSUFBQUEsYUFBQSxTQUFNO0FBQ04sSUFBQUEsYUFBQSxpQkFBYztBQUNkLElBQUFBLGFBQUEsU0FBTTtBQUNOLElBQUFBLGFBQUEsVUFBTztBQUNQLElBQUFBLGFBQUEsZUFBWTtBQUFBLEtBTEYsY0FBQUgsV0FBQSxnQkFBQUEsV0FBQTtBQVFMLE1BQUs7QUFBTCxJQUFLSSxlQUFMO0FBQ0wsSUFBQUEsV0FBQSxTQUFNO0FBQ04sSUFBQUEsV0FBQSxTQUFNO0FBQUEsS0FGSSxZQUFBSixXQUFBLGNBQUFBLFdBQUE7QUFLTCxNQUFLO0FBQUwsSUFBS0ssZUFBTDtBQUNMLElBQUFBLFdBQUEsU0FBTTtBQUFBLEtBREksWUFBQUwsV0FBQSxjQUFBQSxXQUFBO0FBSUwsTUFBSztBQUFMLElBQUtNLHNCQUFMO0FBQ0wsSUFBQUEsa0JBQUEsU0FBTTtBQUFBLEtBREksbUJBQUFOLFdBQUEscUJBQUFBLFdBQUE7QUFJTCxFQUFNQSxXQUFBLGFBQWEsWUFBWTtBQUNwQyxhQUFTLE1BQU0sT0FBTywyQkFBMkI7QUFBQSxFQUNuRDtBQUVPLEVBQU1BLFdBQUEsZ0JBQWdCLENBQUMsVUFHaEI7QUFDWixVQUFNLEVBQUUsU0FBUyxLQUFLLGtCQUFBTyxrQkFBaUIsSUFBSTtBQUczQyxRQUFJQSxxQkFBb0JBLGtCQUFpQixTQUFTLEdBQUc7QUFDbkQsWUFBTSxRQUFRLEtBQUssSUFBSSxJQUFJQSxrQkFBaUI7QUFDNUMsYUFBT0Esa0JBQWlCLEtBQUs7QUFBQSxJQUMvQjtBQUVBLFlBQVEsS0FBSztBQUFBLE1BQ1gsS0FBSztBQUNILGVBQU87QUFBQSxNQUNULEtBQUs7QUFDSCxlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsZUFBTztBQUFBLE1BQ1QsS0FBSztBQUNILGVBQU87QUFBQSxNQUNUO0FBQ0UsZUFBTztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBRU8sRUFBTVAsV0FBQSxlQUFlLENBQUMsUUFBd0I7QUFDbkQsWUFBUSxLQUFLO0FBQUEsTUFDWCxLQUFLLDBCQUF1QjtBQUMxQixjQUFNLE9BQU8sMERBQXdCLE1BQU0sR0FBRztBQUM5QyxjQUFNLFFBQVEsS0FBSyxJQUFJLElBQUksS0FBSztBQUNoQyxlQUFPLEtBQUssS0FBSztBQUFBLE1BQ25CO0FBQUEsTUFDQSxTQUFTO0FBQ1AsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVPLEVBQU1BLFdBQUEsZUFBZSxDQUFDLFFBQXdCO0FBQ25ELFlBQVEsS0FBSztBQUFBLE1BQ1gsS0FBSywwQkFBdUI7QUFDMUIsWUFBSUEsV0FBQSxVQUFVLFNBQVMsR0FBRztBQUN4QixnQkFBTSxNQUFNQSxXQUFVLGdCQUFnQixXQUFXO0FBQUEsUUFDbkQ7QUFDQSxjQUFNLE9BQU8sMERBQXdCLE1BQU0sR0FBRztBQUM5QyxjQUFNLFFBQVEsS0FBSyxJQUFJLElBQUksS0FBSztBQUNoQyxlQUFPLEtBQUssS0FBSztBQUFBLE1BQ25CO0FBQUEsTUFDQSxTQUFTO0FBQ1AsY0FBTSxPQUFPLG1LQUF3QixNQUFNLEdBQUc7QUFDOUMsY0FBTSxRQUFRLEtBQUssSUFBSSxJQUFJLEtBQUs7QUFDaEMsZUFBTyxLQUFLLEtBQUs7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRU8sRUFBTUEsV0FBQSxtQkFBbUIsQ0FBQyxRQUF3QjtBQUN2RCxZQUFRLEtBQUs7QUFBQSxNQUNYLEtBQUs7QUFDSCxZQUFJLENBQUNBLFdBQUEsa0JBQWtCO0FBQ3JCLGdCQUFNLE1BQU1BLFdBQUEsZ0JBQWdCLG1CQUFtQjtBQUFBLFFBQ2pEO0FBQ0EsZUFBT0EsV0FBQTtBQUFBLE1BQ1QsU0FBUztBQUNQLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFTyxFQUFNQSxXQUFBLDJCQUEyQixJQUFJO0FBQUEsSUFDMUM7QUFBQSxFQUNGO0FBQ08sRUFBTUEsV0FBQSxrQkFBa0IsSUFBSTtBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUNPLEVBQU1BLFdBQUEsc0JBQXNCLElBQUk7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFDTyxFQUFNQSxXQUFBLGFBQXlCO0FBQy9CLEVBQU1BLFdBQUEsMEJBQTBCO0FBQ2hDLEVBQU1BLFdBQUEsbUJBQW1CO0FBQ3pCLEVBQU1BLFdBQUEseUJBQXFCQSxXQUFBLGNBQWEsT0FBTyxRQUFRLElBQUk7QUFDM0QsRUFBTUEsV0FBQSxrQkFBY0EsV0FBQSxjQUFhLE9BQU8sUUFBUSxJQUFJO0FBQ3BELEVBQU1BLFdBQUEsMEJBQXNCQSxXQUFBLGtCQUFpQixPQUFPLFFBQVEsSUFBSTtBQUNoRSxFQUFNQSxXQUFBLHVCQUF1QjtBQUM3QixFQUFNQSxXQUFBLHdCQUF3QjtBQUM5QixFQUFNQSxXQUFBLG9CQUFvQjtBQUFBLEdBL0hsQjtBQW1JakIsUUFBUSxJQUFJLFVBQVUsZ0JBQWdCLFFBQVE7OztBQzlLOUMsSUFBQVEsZUFLTzs7O0FDSlAsSUFBQUMsZUFBdUM7QUFFaEMsSUFBVTtBQUFBLENBQVYsQ0FBVUMsVUFBVjtBQUNMLFFBQU0sU0FBUztBQUFBLElBQ2IsWUFBWTtBQUFBLElBQ1osWUFBWSxVQUFVO0FBQUEsSUFDdEIsa0JBQWtCLENBQUM7QUFBQSxFQUNyQjtBQUVPLEVBQU1BLE1BQUEsZ0JBQWdCLE1BQWtCO0FBQzdDLFFBQUksT0FBTyxpQkFBaUIsU0FBUyxHQUFHO0FBRXRDLGFBQU8sYUFBYSxVQUFVLGNBQWM7QUFBQSxRQUMxQyxrQkFBa0IsT0FBTztBQUFBLE1BQzNCLENBQUM7QUFBQSxJQUNILFdBQVcsVUFBVSxpQkFBaUIsU0FBUyxHQUFHO0FBRWhELGFBQU8sYUFBYSxVQUFVLGNBQWM7QUFBQSxRQUMxQyxrQkFBa0IsVUFBVTtBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNILFdBQVcsQ0FBQyxPQUFPLFlBQVk7QUFFN0IsYUFBTyxhQUFhLFVBQVUsY0FBYztBQUFBLFFBQzFDLFNBQVMsVUFBVTtBQUFBLE1BQ3JCLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxDQUFDLE9BQU8sWUFBWTtBQUN0QixhQUFPLGFBQWEsVUFBVTtBQUFBLElBQ2hDO0FBRUEsV0FBTyxJQUFJLHdCQUFXLE9BQU8sWUFBWSxPQUFPLFVBQVU7QUFBQSxFQUM1RDtBQUVPLEVBQU1BLE1BQUEsbUJBQW1CLENBQUMsVUFJckI7QUFFVixXQUFPLGFBQWE7QUFDcEIsV0FBTyxtQkFBbUIsQ0FBQztBQUMzQixXQUFPLGFBQWEsVUFBVTtBQUU5QixVQUFNLEVBQUUsU0FBUyxZQUFZLGlCQUFpQixJQUFJO0FBQ2xELFFBQUksWUFBWTtBQUNkLGFBQU8sYUFBYTtBQUNwQixlQUFTLDhCQUE4QixPQUFPLFVBQVU7QUFBQSxJQUMxRDtBQUVBLFFBQUksU0FBUztBQUNYLGFBQU8sYUFBYSxVQUFVLGNBQWMsRUFBRSxRQUFpQixDQUFDO0FBQ2hFLGVBQVMsOEJBQThCLE9BQU8sVUFBVTtBQUFBLElBQzFEO0FBRUEsUUFBSSxrQkFBa0I7QUFDcEIsZUFBUyx3QkFBd0IsZ0JBQWdCO0FBQ2pELGFBQU8sYUFBYSxVQUFVLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztBQUNoRSxhQUFPLG1CQUFtQjtBQUMxQjtBQUFBLFFBQ0U7QUFBQSxRQUNBLE9BQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFTyxFQUFNQSxNQUFBLGVBQWUsT0FDMUIsV0FDQSxhQUF5QixVQUFVLGVBQ2hDO0FBQ0gsVUFBTSxhQUFhQSxNQUFLLGNBQWM7QUFDdEMsVUFBTSxrQkFBa0IsTUFBTSxXQUFXLG1CQUFtQjtBQUM1RCxXQUFPLE1BQU0sV0FDVjtBQUFBLE1BQ0M7QUFBQSxRQUNFLFdBQVcsZ0JBQWdCO0FBQUEsUUFDM0Isc0JBQXNCLGdCQUFnQjtBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNGLEVBQ0MsS0FBSyxPQUFPLEVBQUUsRUFDZCxNQUFNLE9BQU8sR0FBRztBQUFBLEVBQ3JCO0FBQUEsR0FqRmU7OztBQ0hqQixJQUFBQyxlQU9PO0FBTUEsSUFBTSxjQUFjO0FBRXBCLElBQVU7QUFBQSxDQUFWLENBQVVDLHdCQUFWO0FBQUEsRUFDRSxNQUFNQyxRQUFvRDtBQUFBLElBQy9ELE9BQU8sdUJBQXVCO0FBQUEsSUFFOUI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUVBLFlBQ0UsY0FDQSxTQUNBLFVBQ0EsTUFDQTtBQUNBLFdBQUssZUFBZTtBQUNwQixXQUFLLFVBQVU7QUFDZixXQUFLLFdBQVc7QUFDaEIsV0FBSyxPQUFPO0FBQUEsSUFDZDtBQUFBLElBRUEsU0FBUyxZQUEwRDtBQUNqRSxhQUFPLElBQUksWUFBWTtBQUNyQixZQUFJLEVBQUUsZ0JBQWdCQSxVQUFTO0FBQzdCLGdCQUFNLE1BQU0sMkNBQTJDO0FBQUEsUUFDekQ7QUFDQSxjQUFNLGNBQWMsSUFBSSx5QkFBWTtBQUVwQyxjQUFNLGVBQWUsTUFBTSxLQUFLLGNBQWMsRUFBRSxtQkFBbUI7QUFDbkUsb0JBQVksdUJBQXVCLGFBQWE7QUFDaEQsb0JBQVksa0JBQWtCLGFBQWE7QUFDM0MsWUFBSSxlQUFlLEtBQUs7QUFFeEIsWUFBSSxLQUFLLFVBQVU7QUFDakIsc0JBQVksV0FBVyxLQUFLLFNBQVM7QUFDckMseUJBQWUsQ0FBQyxLQUFLLFVBQVUsR0FBRyxLQUFLLE9BQU87QUFBQSxRQUNoRDtBQUVBLGFBQUssYUFBYSxRQUFRLENBQUMsU0FBUyxZQUFZLElBQUksSUFBSSxDQUFDO0FBRXpELGNBQU0sVUFBMEI7QUFBQSxVQUM5QixZQUFZO0FBQUEsUUFDZDtBQUVBLGVBQU8sVUFBTTtBQUFBLFVBQ1gsS0FBSyxjQUFjO0FBQUEsVUFDbkI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQW5ETyxFQUFBRCxvQkFBTSxTQUFBQztBQUFBLEdBREU7OztBRkhWLElBQVVDO0FBQUEsQ0FBVixDQUFVQSx3QkFBVjtBQUFBLEVBQ0UsTUFBTSxNQUFNO0FBQUEsSUFDakIsU0FBUyxPQUNQLFFBQ2lEO0FBQ2pELGFBQU8sSUFBSSxZQUFZO0FBQ3JCLFlBQUksSUFBSTtBQUNSLG1CQUFXLEtBQUssS0FBSztBQUNuQixjQUFJLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLFNBQVM7QUFDakMsa0JBQU07QUFBQSxjQUNKO0FBQUEscUJBQ08sQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLENBQUMsQ0FBQztBQUFBLFlBQzNDO0FBQUEsVUFDRjtBQUNBO0FBQUEsUUFDRjtBQUVBLGNBQU0sZUFBZSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsWUFBWTtBQUN0RCxjQUFNLFVBQVUsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLE9BQU87QUFDNUMsY0FBTSxZQUFZLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxhQUFhLE1BQVM7QUFDNUQsWUFBSSxXQUFXLFFBQVEsQ0FBQztBQUN4QixZQUFJLFVBQVUsU0FBUyxLQUFLLFVBQVUsQ0FBQyxFQUFFLFVBQVU7QUFDakQscUJBQVcsVUFBVSxDQUFDLEVBQUU7QUFBQSxRQUMxQjtBQUVBLGNBQU0sY0FBYyxJQUFJLHlCQUFZO0FBQ3BDLFlBQUksZUFBZTtBQUNuQixZQUFJLFVBQVU7QUFDWixzQkFBWSxXQUFXLFNBQVM7QUFDaEMseUJBQWUsQ0FBQyxVQUFVLEdBQUcsT0FBTztBQUFBLFFBQ3RDO0FBQ0EscUJBQWEsSUFBSSxDQUFDLFNBQVMsWUFBWSxJQUFJLElBQUksQ0FBQztBQUloRCxjQUFNLFVBQTBCO0FBQUEsVUFDOUIsWUFBWTtBQUFBLFFBQ2Q7QUFFQSxlQUFPLFVBQU07QUFBQSxVQUNYLEtBQUssY0FBYztBQUFBLFVBQ25CO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUE5Q08sRUFBQUEsb0JBQU07QUFBQSxHQURFQSw4Q0FBQTs7O0FHWmpCLElBQUFDLGVBT087QUFRQSxJQUFVQztBQUFBLENBQVYsQ0FBVUEsd0JBQVY7QUFBQSxFQUNFLE1BQU0sS0FBNkM7QUFBQSxJQUN4RDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUEsWUFDRSxjQUNBLFNBQ0EsVUFDQSxNQUNBO0FBQ0EsV0FBSyxlQUFlO0FBQ3BCLFdBQUssVUFBVTtBQUNmLFdBQUssT0FBTztBQUNaLFdBQUssV0FBVztBQUFBLElBQ2xCO0FBQUEsSUFFQSxTQUFTLFlBQTBEO0FBQ2pFLGFBQU8sSUFBSSxZQUFZO0FBQ3JCLFlBQUksRUFBRSxnQkFBZ0IsT0FBTztBQUMzQixnQkFBTSxNQUFNLCtDQUErQztBQUFBLFFBQzdEO0FBQ0EsY0FBTSxjQUFjLElBQUkseUJBQVk7QUFDcEMsY0FBTSxlQUFlLE1BQU0sS0FBSyxjQUFjLEVBQUUsbUJBQW1CO0FBQ25FLG9CQUFZLHVCQUF1QixhQUFhO0FBQ2hELG9CQUFZLGtCQUFrQixhQUFhO0FBQzNDLFlBQUksZUFBZSxLQUFLO0FBRXhCLFlBQUksS0FBSyxVQUFVO0FBQ2pCLHNCQUFZLFdBQVcsS0FBSyxTQUFTO0FBQ3JDLHlCQUFlLENBQUMsS0FBSyxVQUFVLEdBQUcsS0FBSyxPQUFPO0FBQUEsUUFDaEQ7QUFFQSxhQUFLLGFBQWEsUUFBUSxDQUFDLFNBQVMsWUFBWSxJQUFJLElBQUksQ0FBQztBQUV6RCxjQUFNLFVBQTBCO0FBQUEsVUFDOUIsWUFBWTtBQUFBLFFBQ2Q7QUFFQSxZQUFJLEtBQUssY0FBYyxFQUFFLGdCQUFnQixVQUFVLFlBQVksS0FBSztBQUNsRSxtQkFBUywyQ0FBMkM7QUFDcEQsZUFBSyxpQkFBaUIsRUFBRSxTQUFTLFVBQVUsUUFBUSxZQUFZLENBQUM7QUFBQSxRQUNsRTtBQUVBLGVBQU8sVUFBTTtBQUFBLFVBQ1gsS0FBSyxjQUFjO0FBQUEsVUFDbkI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQXJETyxFQUFBQSxvQkFBTTtBQUFBLEdBREVBLDhDQUFBOzs7QUNmakIsSUFBQUMsZUFJTztBQVFBLElBQVVDO0FBQUEsQ0FBVixDQUFVQSx3QkFBVjtBQUFBLEVBQ0UsTUFBTSxZQUE0QztBQUFBLElBQ3ZEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUVBLFlBQVksY0FBc0IsTUFBZSxZQUFZLE9BQU87QUFDbEUsV0FBSyxpQkFBaUI7QUFDdEIsV0FBSyxPQUFPO0FBQ1osV0FBSyxZQUFZO0FBQUEsSUFDbkI7QUFBQSxJQUVBLFNBQVMsT0FDUCxhQUNpRDtBQUNqRCxhQUFPLElBQUksWUFBWTtBQUNyQixZQUFJLEVBQUUsZ0JBQWdCLGNBQWM7QUFDbEMsZ0JBQU0sTUFBTSxzREFBc0Q7QUFBQSxRQUNwRTtBQUVBLGNBQU0sU0FBUyxPQUFPLEtBQUssS0FBSyxnQkFBZ0IsS0FBSztBQUNyRCxjQUFNLHNCQUFzQix5QkFBWSxLQUFLLE1BQU07QUFDbkQsNEJBQW9CLFlBQVksU0FBUyxVQUFVLENBQUM7QUFFcEQsY0FBTSxVQUEwQjtBQUFBLFVBQzlCLFlBQVk7QUFBQSxRQUNkO0FBQ0EsY0FBTSxrQkFBa0Isb0JBQW9CLFVBQVU7QUFDdEQsZUFBTyxNQUFNLEtBQUssY0FBYyxFQUFFO0FBQUEsVUFDaEM7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBakNPLEVBQUFBLG9CQUFNO0FBQUEsR0FERUEsOENBQUE7OztBQ1RWLElBQVVDO0FBQUEsQ0FBVixDQUFVQSx3QkFBVjtBQUNMLFFBQU0sWUFBWTtBQUNsQixRQUFNLGFBQWE7QUFDbkIsUUFBTSx1QkFBdUI7QUFPN0IsUUFBTSxnQkFBZ0IsQ0FBQyxNQUNyQixLQUFLLFlBQVksSUFBSSxLQUFLLGFBQWEsSUFBSTtBQVE3QyxRQUFNLG1CQUFtQixDQUFDLEdBQVcsU0FDbkMsY0FBYyxDQUFDLElBQUksSUFBSTtBQVFsQixFQUFNQSxvQkFBQSxrQkFBa0IsQ0FDN0IsYUFDQSxhQUNXO0FBQ1gsVUFBTSxhQUFhLENBQUMsU0FBUyxTQUFTLENBQUM7QUFFdkMsVUFBTSxVQUFVLElBQUksSUFBWSxVQUFVO0FBQzFDLFVBQU0sV0FBVyxJQUFJLElBQVksVUFBVTtBQUUzQyxVQUFNLFVBQVUsWUFBWSxhQUFhLE9BQU8sQ0FBQyxLQUFLLE9BQU87QUFDM0QsU0FBRyxLQUFLLFFBQVEsQ0FBQyxFQUFFLFFBQVEsU0FBUyxNQUFNO0FBQ3hDLGNBQU0sS0FBSyxPQUFPLFNBQVM7QUFDM0IsWUFBSTtBQUFVLGtCQUFRLElBQUksRUFBRTtBQUM1QixpQkFBUyxJQUFJLEVBQUU7QUFBQSxNQUNqQixDQUFDO0FBRUQsZUFBUyxJQUFJLEdBQUcsVUFBVSxTQUFTLENBQUM7QUFFcEMsWUFBTSxXQUFXLEdBQUcsS0FBSztBQUN6QixZQUFNLGFBQWEsR0FBRyxLQUFLO0FBRTNCLGFBQ0UsTUFDQTtBQUFBLE1BQ0EsaUJBQWlCLFVBQVUsQ0FBQyxJQUM1QixpQkFBaUIsWUFBWSxDQUFDO0FBQUEsSUFFbEMsR0FBRyxDQUFDO0FBRUosV0FDRSxpQkFBaUIsUUFBUSxNQUFNLEVBQUU7QUFBQSxJQUNqQztBQUFBLElBQ0EsaUJBQWlCLFNBQVMsTUFBTSxFQUFFO0FBQUEsSUFDbEM7QUFBQSxJQUNBLGNBQWMsWUFBWSxhQUFhLE1BQU07QUFBQSxJQUM3QztBQUFBLEVBRUo7QUFRTyxFQUFNQSxvQkFBQSx3QkFBd0IsQ0FDbkMsYUFDQSxhQUNZO0FBQ1osZUFBT0Esb0JBQUEsaUJBQWdCLGFBQWEsUUFBUSxJQUFJO0FBQUEsRUFDbEQ7QUFBQSxHQTlFZUEsOENBQUE7OztBQ0hqQixJQUFBQyxlQUFxRDs7O0FDQXJELElBQUFDLGVBQStDO0FBRS9DLGtCQUFlO0FBRVIsSUFBVTtBQUFBLENBQVYsQ0FBVUMsYUFBVjtBQUFBLEVBQ0UsTUFBTUMsU0FBUTtBQUFBLElBQ25CO0FBQUEsSUFDQTtBQUFBLElBRUEsWUFBWSxRQUE2QztBQUN2RCxVQUFJLENBQUMsT0FBTyxRQUFRO0FBQ2xCLGNBQU0sVUFBVSxPQUFPLE9BQU8sVUFBVTtBQUN4QyxhQUFLLFNBQVMsUUFBUSxVQUFVLFNBQVM7QUFBQSxNQUMzQyxPQUFPO0FBQ0wsYUFBSyxTQUFTLE9BQU87QUFBQSxNQUN2QjtBQUNBLFdBQUssU0FBUyxPQUFPO0FBQUEsSUFDdkI7QUFBQSxJQUVBLGNBQXlCO0FBQ3ZCLGFBQU8sSUFBSSx1QkFBVSxLQUFLLE1BQU07QUFBQSxJQUNsQztBQUFBLElBRUEsWUFBc0I7QUFDcEIsWUFBTSxVQUFVLFlBQUFDLFFBQUcsT0FBTyxLQUFLLE1BQU07QUFDckMsYUFBTyxhQUFBQyxRQUFTLGNBQWMsT0FBTztBQUFBLElBQ3ZDO0FBQUEsSUFFQSxPQUFPLFdBQVcsQ0FBQyxVQUNqQix1QkFBdUIsS0FBSyxLQUFLO0FBQUEsSUFFbkMsT0FBTyxXQUFXLENBQUMsVUFDakIsdUJBQXVCLEtBQUssS0FBSztBQUFBLElBRW5DLE9BQU8sU0FBUyxNQUFlO0FBQzdCLFlBQU0sVUFBVSxhQUFBQSxRQUFTLFNBQVM7QUFDbEMsYUFBTyxJQUFJRixTQUFRO0FBQUEsUUFDakIsUUFBUSxRQUFRLFVBQVUsU0FBUztBQUFBLFFBQ25DLFFBQVEsWUFBQUMsUUFBRyxPQUFPLFFBQVEsU0FBUztBQUFBLE1BQ3JDLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFQSxPQUFPLFlBQVksQ0FBQyxZQUErQjtBQUNqRCxhQUFPLElBQUlELFNBQVE7QUFBQSxRQUNqQixRQUFRLFFBQVEsVUFBVSxTQUFTO0FBQUEsUUFDbkMsUUFBUSxZQUFBQyxRQUFHLE9BQU8sUUFBUSxTQUFTO0FBQUEsTUFDckMsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBM0NPLEVBQUFGLFNBQU0sVUFBQUM7QUFBQSxHQURFOzs7QUNKakIsSUFBQUcsZUFBMEI7QUFDMUIsZ0NBQTJCO0FBRTNCLDJCQUF5QztBQUN6QyxnQkFBZTtBQUVSLElBQVVDO0FBQUEsQ0FBVixDQUFVQSxhQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLFNBQVY7QUFDRSxJQUFNQSxLQUFBLGNBQWMsQ0FBQyxZQUErQjtBQUN6RCxZQUFNLENBQUMsU0FBUyxJQUFJLHVCQUFVO0FBQUEsUUFDNUI7QUFBQSxVQUNFLE9BQU8sS0FBSyxVQUFVO0FBQUEsVUFDdEIscUNBQVcsU0FBUztBQUFBLFVBQ3BCLFFBQVEsWUFBWSxFQUFFLFNBQVM7QUFBQSxRQUNqQztBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFTyxJQUFNQSxLQUFBLG1CQUFtQixDQUFDLFlBQStCO0FBQzlELFlBQU0sQ0FBQyxTQUFTLElBQUksdUJBQVU7QUFBQSxRQUM1QjtBQUFBLFVBQ0UsT0FBTyxLQUFLLFVBQVU7QUFBQSxVQUN0QixxQ0FBVyxTQUFTO0FBQUEsVUFDcEIsUUFBUSxZQUFZLEVBQUUsU0FBUztBQUFBLFVBQy9CLE9BQU8sS0FBSyxTQUFTO0FBQUEsUUFDdkI7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRU8sSUFBTUEsS0FBQSxtQkFBbUIsQ0FBQyxZQUErQjtBQUM5RCxZQUFNLENBQUMsU0FBUyxJQUFJLHVCQUFVO0FBQUEsUUFDNUIsQ0FBQyxRQUFRLFlBQVksRUFBRSxTQUFTLENBQUM7QUFBQSxRQUNqQyw4Q0FBeUIsWUFBWTtBQUFBLE1BQ3ZDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFTyxJQUFNQSxLQUFBLGdCQUFnQixNQUFpQjtBQUM1QyxZQUFNLENBQUMsU0FBUyxJQUFJLHVCQUFVO0FBQUEsUUFDNUIsQ0FBQyxPQUFPLEtBQUssa0JBQWtCLE1BQU0sQ0FBQztBQUFBLFFBQ3RDLDhDQUF5QixZQUFZO0FBQUEsTUFDdkM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVPLElBQU1BLEtBQUEsYUFBYSxDQUFDLFNBQWlCLGNBQThCO0FBQ3hFLFlBQU0sT0FBTyxJQUFJLFVBQUFDLFFBQUcsR0FBRyxTQUFTO0FBQ2hDLFlBQU0sQ0FBQyxPQUFPLElBQUksdUJBQVU7QUFBQSxRQUMxQjtBQUFBLFVBQ0UsT0FBTyxLQUFLLFNBQVMsTUFBTTtBQUFBLFVBQzNCLFFBQVEsWUFBWSxFQUFFLFNBQVM7QUFBQSxVQUMvQixXQUFXLEtBQUssS0FBSyxRQUFRLE1BQU0sQ0FBQyxDQUFDO0FBQUEsUUFDdkM7QUFBQSxRQUNBLDhDQUF5QixZQUFZO0FBQUEsTUFDdkM7QUFDQSxhQUFPLFFBQVEsU0FBUztBQUFBLElBQzFCO0FBQUEsS0FyRGUsTUFBQUYsU0FBQSxRQUFBQSxTQUFBO0FBQUEsR0FERkEsd0JBQUE7OztBQ0RWLElBQU1HLFdBQVU7QUFBQSxFQUNyQixHQUFHO0FBQUEsRUFDSCxHQUFHQTtBQUNMOzs7QUhKQSx1QkFBMEI7QUFFMUIsSUFBQUMsZUFBZTtBQVFmLE9BQU8sVUFBVSxnQkFBZ0IsU0FDL0Isb0NBQ0EsVUFBb0MsQ0FBQyxHQUNyQztBQUNBLFFBQU0sY0FBYyxLQUFLLGNBQWMsRUFBRTtBQUN6QyxXQUFTLGdDQUFnQyxXQUFXO0FBQ3BELE1BQUksVUFBVTtBQUNkLE1BQUksZ0JBQWdCLFVBQVUsWUFBWSxLQUFLO0FBQzdDLGNBQVUsVUFBVSxRQUFRO0FBQUEsRUFDOUIsV0FBVyxnQkFBZ0IsVUFBVSxZQUFZLE1BQU07QUFDckQsY0FBVSxVQUFVLFFBQVE7QUFBQSxFQUM5QixXQUFXLGdCQUFnQixVQUFVLFlBQVksS0FBSztBQUNwRCxjQUFVLFVBQVUsUUFBUTtBQUFBLEVBQzlCLE9BQU87QUFDTCxjQUFVLFVBQVUsUUFBUTtBQUFBLEVBQzlCO0FBRUEsUUFBTSxxQkFBNkIsS0FBSyxTQUFTO0FBQ2pELE1BQUksTUFBTTtBQUVWLE1BQUksUUFBUSxhQUFhO0FBQ3ZCLFFBQUksd0NBQWdDO0FBQ2xDLFlBQU0sR0FBRyxVQUFVLHFCQUFxQixJQUFJLFFBQVEsV0FBVyxJQUFJLGtCQUFrQixZQUFZLE9BQU87QUFBQSxJQUMxRyxXQUFXLGdDQUE0QjtBQUNyQyxZQUFNLEdBQUcsVUFBVSxpQkFBaUIsSUFBSSxRQUFRLFdBQVcsSUFBSSxrQkFBa0IsWUFBWSxPQUFPO0FBQUEsSUFDdEcsT0FBTztBQUNMLFlBQU0sR0FBRyxVQUFVLG9CQUFvQixJQUFJLFFBQVEsV0FBVyxJQUFJLGtCQUFrQixZQUFZLE9BQU87QUFBQSxJQUN6RztBQUNBLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSUMsU0FBUSxRQUFRLFNBQVMsa0JBQWtCLEdBQUc7QUFFaEQsUUFBSSx3Q0FBZ0M7QUFDbEMsWUFBTSxHQUFHLFVBQVUscUJBQXFCLFlBQVksa0JBQWtCLFlBQVksT0FBTztBQUFBLElBQzNGLFdBQVcsZ0NBQTRCO0FBQ3JDLFlBQU0sR0FBRyxVQUFVLGlCQUFpQixZQUFZLGtCQUFrQixZQUFZLE9BQU87QUFBQSxJQUN2RixPQUFPO0FBQ0wsWUFBTSxHQUFHLFVBQVUsb0JBQW9CLFlBQVksa0JBQWtCLFlBQVksT0FBTztBQUFBLElBQzFGO0FBQUEsRUFDRixPQUFPO0FBR0wsUUFBSSx3Q0FBZ0M7QUFDbEMsWUFBTSxHQUFHLFVBQVUscUJBQXFCLE9BQ3RDLGtCQUNGLFlBQVksT0FBTztBQUFBLElBQ3JCLFdBQVcsZ0NBQTRCO0FBQ3JDLFlBQU0sR0FBRyxVQUFVLGlCQUFpQixPQUNsQyxrQkFDRixZQUFZLE9BQU87QUFBQSxJQUNyQixPQUFPO0FBQ0wsWUFBTSxHQUFHLFVBQVUsb0JBQW9CLE9BQ3JDLGtCQUNGLFlBQVksT0FBTztBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQVFBLE9BQU8sVUFBVSxjQUFjLFdBQVk7QUFDekMsTUFBSSxDQUFDQSxTQUFRLFFBQVEsU0FBUyxLQUFLLFNBQVMsQ0FBQyxHQUFHO0FBQzlDLFVBQU0sTUFBTSw0QkFBNEIsS0FBSyxTQUFTLENBQUMsRUFBRTtBQUFBLEVBQzNEO0FBQ0EsU0FBTyxJQUFJLHVCQUFVLEtBQUssU0FBUyxDQUFDO0FBQ3RDO0FBUUEsT0FBTyxVQUFVLFlBQVksV0FBWTtBQUN2QyxNQUFJLENBQUNBLFNBQVEsUUFBUSxTQUFTLEtBQUssU0FBUyxDQUFDLEdBQUc7QUFDOUMsVUFBTSxNQUFNLDRCQUE0QixLQUFLLFNBQVMsQ0FBQyxFQUFFO0FBQUEsRUFDM0Q7QUFDQSxRQUFNLFVBQVUsYUFBQUMsUUFBRyxPQUFPLEtBQUssU0FBUyxDQUFDO0FBQ3pDLFNBQU8scUJBQVEsY0FBYyxPQUFPO0FBQ3RDO0FBUUEsT0FBTyxVQUFVLFFBQVEsV0FBWTtBQUNuQyxhQUFPLDRCQUFVLElBQWMsRUFDNUIsSUFBSSw2QkFBZ0IsRUFDcEIsU0FBUztBQUNkO0FBUUEsT0FBTyxVQUFVLGFBQWEsV0FBWTtBQUN4QyxhQUFPLDRCQUFVLElBQWMsRUFDNUIsTUFBTSw2QkFBZ0IsRUFDdEIsU0FBUztBQUNkOzs7QUluSE8sSUFBTUMsc0JBQXFCO0FBQUEsRUFDaEMsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBR0E7QUFDTDs7O0FDV08sSUFBTSxrQkFBa0IsQ0FDN0IsUUFDQSxZQUlZO0FBQ1osUUFBTSxPQUFrQjtBQUN4QixVQUFRLFFBQVEsQ0FBQyxXQUFXO0FBQzFCLFdBQU8sS0FBSyxPQUFPLFNBQVM7QUFDNUIsU0FBSyxPQUFPLEtBQUssR0FBRyxJQUFJLE9BQU8sS0FBSztBQUFBLEVBQ3RDLENBQUM7QUFDRCxTQUFPO0FBQ1Q7QUFXTyxJQUFNLFdBQVcsQ0FDdEIsT0FDQSxRQUFpQixJQUNqQixRQUFpQixJQUNqQixRQUFpQixPQUNSO0FBQ1QsTUFBSSxVQUFVLGdCQUFnQixVQUFVLFFBQVEsSUFBSSxVQUFVLFFBQVE7QUFDcEUsWUFBUSxJQUFJLFdBQVcsT0FBTyxPQUFPLE9BQU8sS0FBSztBQUFBLEVBQ25EO0FBQ0Y7QUFRTyxJQUFNLFFBQVEsT0FBTyxRQUFpQztBQUMzRCxTQUFPLElBQUksUUFBUSxDQUFDLE1BQU0sV0FBVyxHQUFHLE1BQU0sR0FBSSxDQUFDO0FBQ3JEO0FBT08sSUFBTSxZQUFZLE1BQWU7QUFDdEMsU0FDRSxPQUFPLFdBQVcsZUFBZSxPQUFPLE9BQU8sYUFBYTtBQUVoRTtBQU9PLElBQU0sU0FBUyxNQUFlO0FBQ25DLFNBQ0UsT0FBTyxZQUFZLGVBQ25CLFFBQVEsWUFBWSxRQUNwQixRQUFRLFNBQVMsUUFBUTtBQUU3QjtBQVVPLElBQU0sWUFBWSxDQUFDLFFBQTBDO0FBQ2xFLFNBQ0UsQ0FBQyxDQUFDLFFBQ0QsT0FBTyxRQUFRLFlBQVksT0FBTyxRQUFRLGVBQzNDLE9BQVEsSUFBWSxTQUFTO0FBRWpDO0FBWU8sU0FBUyxJQUNkLE9BQ0EsY0FDOEM7QUFDOUMsTUFBSTtBQUNGLFVBQU0sSUFBSSxNQUFNO0FBQ2hCLFFBQUksVUFBVSxDQUFDLEdBQUc7QUFDaEIsYUFBTyxFQUFFO0FBQUEsUUFDUCxDQUFDLE1BQVMsT0FBTyxHQUFHLENBQUM7QUFBQSxRQUNyQixDQUFDLFFBQVcsT0FBTyxJQUFJLEdBQUc7QUFBQSxNQUM1QjtBQUFBLElBQ0YsT0FBTztBQUNMLGFBQU8sT0FBTyxHQUFHLENBQUM7QUFBQSxJQUNwQjtBQUFBLEVBQ0YsU0FBUyxHQUFHO0FBQ1YsUUFBSSxhQUFhLE9BQU87QUFDdEIsYUFBTyxPQUFPLElBQUksQ0FBQztBQUFBLElBQ3JCO0FBQ0EsV0FBTyxPQUFPLElBQUksTUFBTSxDQUFXLENBQUM7QUFBQSxFQUN0QyxVQUFFO0FBQ0EsUUFBSSxjQUFjO0FBQ2hCLGVBQVMsb0JBQW9CLFlBQVk7QUFDekMsbUJBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUNGO0FBUU8sSUFBTSw2QkFBNkIsQ0FDeEMsZUFDcUI7QUFDckIsTUFBSSxZQUFZO0FBQ2QsV0FBTyxJQUFJLEtBQUssYUFBYSxHQUFJO0FBQUEsRUFDbkM7QUFDQTtBQUNGO0FBT08sSUFBTSxnQkFBZ0IsTUFBYztBQUN6QyxTQUFPLEtBQUssT0FBTSxvQkFBSSxLQUFLLEdBQUUsUUFBUSxJQUFJLEdBQUk7QUFDL0M7OztBQzVKQSxJQUFlLGlCQUFmLE1BQWtEO0FBQUEsRUFXaEQsT0FBTyxJQUE0QixLQUFzQztBQUN2RSxVQUFNLElBQUksS0FBSztBQUFBLE1BQ2IsQ0FBQyxVQUFVLE9BQU8sR0FBRyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUs7QUFBQSxNQUMzQyxDQUFDLFVBQVcsTUFBTSxPQUFPLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxPQUFPLElBQUksS0FBSztBQUFBLElBQzVEO0FBQ0EsUUFBSSxFQUFFLE9BQU87QUFDWCxZQUFNLEVBQUU7QUFBQSxJQUNWO0FBQ0EsV0FBTyxFQUFFO0FBQUEsRUFDWDtBQUFBLEVBUUEsSUFBSSxJQUEyQixLQUE0QztBQUN6RSxXQUFPLEtBQUs7QUFBQSxNQUNWLENBQUMsVUFBVSxPQUFPLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFBQSxNQUM5QixDQUFDLFVBQVUsT0FBTyxJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksS0FBSztBQUFBLElBQ2hEO0FBQUEsRUFDRjtBQUFBLEVBU0EsTUFDRSxJQUNBLEtBQ2lCO0FBQ2pCLFdBQU8sS0FBSyxPQUFPLElBQUksUUFBUSxDQUFDLFVBQVUsT0FBTyxJQUFJLEtBQUssRUFBRTtBQUFBLEVBQzlEO0FBQUEsRUFLQSxNQUNFLElBQ0EsS0FDc0I7QUFDdEIsU0FBSztBQUFBLE1BQ0gsQ0FBQyxVQUFVLE9BQU8sR0FBRyxHQUFHLEtBQUssQ0FBQztBQUFBLE1BQzlCLENBQUMsVUFBVSxPQUFPLElBQUksSUFBSSxLQUFLLENBQVU7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUEsRUFJQSxNQUFNLE9BQ0osVUFDOEM7QUFDOUMsVUFBTSxNQUFNLEtBQUs7QUFBQSxNQUNmLE9BQU8sT0FBTztBQUNaLGlCQUFTLDRCQUE0QixFQUFFO0FBQ3ZDLFlBQUksVUFBVTtBQUNaLGdCQUFNLE1BQU07QUFDWixpQkFBTyxNQUFNLElBQUksT0FBTyxRQUFRO0FBQUEsUUFDbEMsT0FBTztBQUNMLGdCQUFNLE1BQU07QUFDWixpQkFBTyxNQUFNLElBQUksT0FBTztBQUFBLFFBQzFCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsQ0FBQyxRQUFRO0FBQ1AsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQ0EsUUFBSSxJQUFJLE9BQU87QUFDYixhQUFPLE9BQU8sSUFBSSxJQUFJLEtBQUs7QUFBQSxJQUM3QjtBQUNBLFdBQU8sSUFBSTtBQUFBLEVBQ2I7QUFDRjtBQVVBLE1BQU0sVUFBVSxTQUFTLGVBQWdCLFVBQW1CO0FBQzFELE1BQUksVUFBVTtBQUNaLFFBQUksSUFBSTtBQUNSLHFCQUFpQixPQUFPLE1BQU07QUFDNUIsVUFBSSxJQUFJLE9BQU87QUFDYixlQUFPO0FBQUEsTUFDVCxXQUFXLElBQUksTUFBTSxXQUFXO0FBQzlCLGlCQUFTLDBCQUEwQjtBQUNuQyxjQUFNLE1BQU0sTUFBTyxJQUE2QixPQUFPLFFBQVE7QUFDL0QsWUFBSSxJQUFJLE9BQU87QUFDYixpQkFBTztBQUFBLFFBQ1Q7QUFDQSxjQUFNLEtBQUssYUFBYSxJQUFJLEtBQUs7QUFBQSxNQUNuQyxPQUFPO0FBQ0wsaUJBQVMscUNBQXFDO0FBQzlDLFlBQUksS0FBSyxVQUFVLEdBQUc7QUFFcEIsaUJBQU8sSUFBSSxPQUFPLFFBQVE7QUFBQSxRQUM1QjtBQUNBLFlBQUksT0FBTyxRQUFRO0FBQUEsTUFDckI7QUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGLE9BQU87QUFDTCxVQUFNLGVBQWtELENBQUM7QUFDekQsZUFBVyxPQUFPLE1BQU07QUFDdEIsVUFBSSxJQUFJLE9BQU87QUFDYixlQUFPO0FBQUEsTUFDVCxXQUFXLElBQUksTUFBTTtBQUNuQixxQkFBYSxLQUFLLElBQUksS0FBSztBQUFBLE1BQzdCLE9BQU87QUFDTCxlQUFPLE9BQU8sSUFBSSxNQUFNLCtCQUErQixDQUFDO0FBQUEsTUFDMUQ7QUFBQSxJQUNGO0FBQ0EsYUFBUywyQkFBMkIsWUFBWTtBQUNoRCxXQUFPLElBQUlDLG9CQUFtQixNQUFNLEVBQUUsT0FBTyxZQUFZO0FBQUEsRUFDM0Q7QUFDRjtBQUVBLElBQU0sYUFBTixjQUE2QyxlQUFxQjtBQUFBLEVBR2hFLFlBQXFCLE9BQVU7QUFDN0IsVUFBTTtBQURhO0FBQUEsRUFFckI7QUFBQSxFQUpTLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQTtBQUFBLEVBTVAsT0FDUixJQUNBLE1BQ2M7QUFDZCxXQUFPLEdBQUcsS0FBSyxLQUFLO0FBQUEsRUFDdEI7QUFDRjtBQUVBLElBQU0sY0FBTixjQUE4QyxlQUFxQjtBQUFBLEVBR2pFLFlBQXFCLE9BQVU7QUFDN0IsVUFBTTtBQURhO0FBQUEsRUFFckI7QUFBQSxFQUpTLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUtQLE9BQ1IsS0FDQSxLQUNjO0FBQ2QsV0FBTyxJQUFJLEtBQUssS0FBSztBQUFBLEVBQ3ZCO0FBQ0Y7QUFFTyxJQUFVO0FBQUEsQ0FBVixDQUFVQyxhQUFWO0FBSUUsV0FBUyxHQUF1QixPQUF3QjtBQUM3RCxXQUFPLElBQUksV0FBVyxLQUFLO0FBQUEsRUFDN0I7QUFGTyxFQUFBQSxTQUFTO0FBSVQsV0FBUyxJQUFnQyxPQUF3QjtBQUN0RSxXQUFPLElBQUksWUFBWSxTQUFTLE1BQU0sQ0FBQztBQUFBLEVBQ3pDO0FBRk8sRUFBQUEsU0FBUztBQThZVCxXQUFTLElBQUksS0FBdUI7QUFDekMsUUFBSSxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQ3RCLFlBQU0sU0FBUyxDQUFDO0FBQ2hCLGlCQUFXLFFBQVEsS0FBSztBQUN0QixZQUFJLEtBQUssT0FBTztBQUNkLGlCQUFPO0FBQUEsUUFDVDtBQUNBLGVBQU8sS0FBSyxLQUFLLEtBQUs7QUFBQSxNQUN4QjtBQUNBLGFBQU9BLFNBQU8sR0FBRyxNQUFNO0FBQUEsSUFDekI7QUFFQSxVQUFNLE1BQStCLENBQUM7QUFDdEMsVUFBTSxPQUFPLE9BQU8sS0FBSyxHQUF3QjtBQUNqRCxlQUFXLE9BQU8sTUFBTTtBQUN0QixZQUFNLE9BQVEsSUFBMEIsR0FBRztBQUMzQyxVQUFJLEtBQUssT0FBTztBQUNkLGVBQU87QUFBQSxNQUNUO0FBQ0EsVUFBSSxHQUFHLElBQUksS0FBSztBQUFBLElBQ2xCO0FBQ0EsV0FBT0EsU0FBTyxHQUFHLEdBQUc7QUFBQSxFQUN0QjtBQXRCTyxFQUFBQSxTQUFTO0FBQUEsR0F0WkQ7OztBQzVLVixJQUFVO0FBQUEsQ0FBVixDQUFVQyxnQkFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxnQkFBVjtBQUNFLElBQU1BLFlBQUEsWUFBWSxDQUN2QixVQUMrQjtBQUMvQixVQUFJLENBQUMsT0FBTztBQUNWLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTztBQUFBLFFBQ0wsS0FBSyxNQUFNLFlBQVk7QUFBQSxRQUN2QixVQUFVO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFFTyxJQUFNQSxZQUFBLFdBQVcsQ0FDdEIsV0FDK0I7QUFDL0IsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU87QUFBQSxRQUNMLFNBQVMsT0FBTyxJQUFJLFNBQVM7QUFBQSxRQUM3QixVQUFVLE9BQU87QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxLQXpCZSxhQUFBRCxZQUFBLGVBQUFBLFlBQUE7QUE0QlYsTUFBVTtBQUFWLElBQVVFLG9CQUFWO0FBQ0UsSUFBTUEsZ0JBQUEsV0FBVyxDQUFDLFdBQStCO0FBQ3RELFlBQU0sTUFBTSxPQUFPLEtBQUssQ0FBQyxVQUFVO0FBQ2pDLFlBQUksTUFBTSxjQUFjLGNBQWM7QUFDcEMsaUJBQU8sTUFBTTtBQUFBLFFBQ2Y7QUFBQSxNQUNGLENBQUM7QUFDRCxhQUFPLE1BQU0sSUFBSSxjQUFjO0FBQUEsSUFDakM7QUFBQSxLQVJlLGlCQUFBRixZQUFBLG1CQUFBQSxZQUFBO0FBQUEsR0E3QkY7OztBQ0pWLElBQVVHO0FBQUEsQ0FBVixDQUFVQSxnQkFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxjQUFWO0FBQ0UsSUFBTUEsVUFBQSxZQUFZLENBQ3ZCLFVBQytCO0FBQy9CLFVBQUksQ0FBQyxPQUFPO0FBQ1YsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVM7QUFDekIsZUFBTztBQUFBLFVBQ0wsU0FBUyxLQUFLLFFBQVEsWUFBWTtBQUFBLFVBQ2xDLE9BQU8sS0FBSztBQUFBLFVBQ1osVUFBVTtBQUFBLFFBQ1o7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBRU8sSUFBTUEsVUFBQSx5QkFBeUIsQ0FDcEMsVUFDdUI7QUFDdkIsVUFBSSxDQUFDLE9BQU87QUFDVixlQUFPLENBQUM7QUFBQSxNQUNWO0FBQ0EsYUFBTyxNQUFPLElBQUksQ0FBQyxTQUFTO0FBQzFCLGVBQU87QUFBQSxVQUNMLFNBQVMsS0FBSyxRQUFRLFlBQVk7QUFBQSxVQUNsQyxPQUFPLEtBQUs7QUFBQSxVQUNaLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVPLElBQU1BLFVBQUEsV0FBVyxDQUN0QixXQUMyQjtBQUMzQixVQUFJLENBQUMsUUFBUTtBQUNYLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTyxPQUFPLElBQUksQ0FBQyxTQUFTO0FBQzFCLGVBQU87QUFBQSxVQUNMLFNBQVMsS0FBSyxRQUFRLFNBQVM7QUFBQSxVQUMvQixPQUFPLEtBQUs7QUFBQSxVQUNaLFVBQVUsS0FBSztBQUFBLFFBQ2pCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEtBN0NlLFdBQUFELFlBQUEsYUFBQUEsWUFBQTtBQUFBLEdBREZBLDRCQUFBOzs7QUNEakIsdUNBSU87QUFFQSxJQUFVRTtBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsMkJBQVY7QUFDRSxJQUFNQSx1QkFBQSxZQUFZLENBQ3ZCLE9BQ0EsS0FDQSx5QkFDaUI7QUFDakIsYUFBTztBQUFBLFFBQ0wsTUFBTSxNQUFNO0FBQUEsUUFDWixRQUFRLE1BQU07QUFBQSxRQUNkO0FBQUEsUUFDQTtBQUFBLFFBQ0EsVUFBVUQsV0FBUyxTQUFTLHVCQUF1QixNQUFNLFFBQVE7QUFBQSxRQUNqRSxZQUFZLFVBQVcsV0FBVyxVQUFVLE1BQU0sVUFBVTtBQUFBLFFBQzVELE1BQU0sTUFBTSxRQUFRO0FBQUEsUUFDcEIscUJBQXFCO0FBQUEsUUFDckIsV0FBVyxNQUFNLGFBQWE7QUFBQSxRQUM5QixjQUFjO0FBQUEsUUFDZCxlQUFlLCtDQUFjO0FBQUEsUUFDN0IscUJBQXFCLHFEQUFvQjtBQUFBLE1BQzNDO0FBQUEsSUFDRjtBQUFBLEtBcEJlLHdCQUFBQSxZQUFBLDBCQUFBQSxZQUFBO0FBQUEsR0FERkEsNEJBQUE7OztBQ1RWLElBQVVFO0FBQUEsQ0FBVixDQUFVQSxnQkFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxhQUFWO0FBQ0UsSUFBTUEsU0FBQSxZQUFZO0FBQ2xCLElBQU1BLFNBQUEsWUFBWSxDQUFDLGVBQXVCO0FBQy9DLGFBQU8sYUFBYUEsU0FBQTtBQUFBLElBQ3RCO0FBRU8sSUFBTUEsU0FBQSxXQUFXLENBQUMsZUFBdUI7QUFDOUMsYUFBTyxhQUFhQSxTQUFBO0FBQUEsSUFDdEI7QUFBQSxLQVJlLFVBQUFELFlBQUEsWUFBQUEsWUFBQTtBQUFBLEdBREZBLDRCQUFBOzs7QUNRVixJQUFVRTtBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsU0FBVjtBQUNFLElBQU1BLEtBQUEsV0FBVyxDQUFDLFdBQXVDO0FBQzlELGFBQU87QUFBQSxRQUNMLE1BQU0sT0FBTyxRQUFRLEdBQUcsU0FBUztBQUFBLFFBQ2pDLGdCQUFnQixVQUFXLGVBQWU7QUFBQSxVQUN4QyxPQUFPLFFBQVE7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsYUFBYSxPQUFPLFFBQVE7QUFBQSxRQUM1QixTQUFTRCxXQUFRLFFBQVEsU0FBUyxPQUFPLFFBQVEsUUFBUSxPQUFPO0FBQUEsUUFDaEUsTUFBTSxPQUFPLFFBQVEsUUFBUSxTQUFTO0FBQUEsUUFDdEMsUUFBUSxPQUFPLFFBQVEsUUFBUSxTQUFTO0FBQUEsUUFDeEMsS0FBSyxPQUFPLFFBQVEsUUFBUTtBQUFBLFFBQzVCLFVBQVVBLFdBQVMsU0FBUyxTQUFTLE9BQU8sUUFBUSxRQUFRO0FBQUEsUUFDNUQsYUFBYSxPQUFPLFFBQVEsWUFBWTtBQUFBLFFBQ3hDLGNBQWMsT0FBTyxRQUFRLFlBQVk7QUFBQSxRQUN6QyxXQUFXLE9BQU8sUUFBUTtBQUFBLFFBQzFCLFFBQVEsT0FBTyxRQUFRO0FBQUEsUUFDdkIsY0FBYyxPQUFPLFFBQVEsT0FBTztBQUFBLFFBQ3BDLHFCQUFxQixPQUFPLFFBQVEsUUFBUTtBQUFBLFFBQzVDLFVBQVUsMkJBQTJCLE9BQU8sU0FBUyxVQUFVO0FBQUEsUUFDL0QsVUFBVSxPQUFPO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsS0F0QmUsTUFBQUEsWUFBQSxRQUFBQSxZQUFBO0FBQUEsR0FERkEsNEJBQUE7OztBQ0RWLElBQVVFO0FBQUEsQ0FBVixDQUFVQSxnQkFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxVQUFWO0FBQ0UsSUFBTUEsTUFBQSxlQUFlLENBQzFCLFFBQ0EsTUFDQSxnQkFDQSx3QkFDd0I7QUFDeEIsWUFBTSxVQUFtQixDQUFDO0FBRzFCLFVBQUksa0JBQWtCLGVBQWUsWUFBWSxJQUFJO0FBQ25ELFlBQUksdUJBQXVCLGVBQWUsWUFBWSxhQUFhO0FBQ2pFLGdCQUFNLGNBQWMsb0JBQW9CO0FBQUEsWUFDdEMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxlQUFlLE9BQU8sS0FBSztBQUFBLFVBQ2xEO0FBQ0EsZ0JBQU0sWUFBWSxvQkFBb0I7QUFBQSxZQUNwQyxDQUFDLE1BQU0sRUFBRSxZQUFZLGVBQWUsT0FBTyxLQUFLO0FBQUEsVUFDbEQ7QUFFQSxrQkFBUSxPQUFPLGVBQWUsT0FBTyxLQUFLO0FBQzFDLDBCQUFnQixRQUFRLFNBQVMsWUFBWTtBQUM3Qyx3QkFBYyxRQUFRLGNBQWMsVUFBVTtBQUFBLFFBQ2hELE9BQU87QUFDTCxrQkFBUSxTQUFTLGVBQWUsT0FBTyxLQUFLO0FBQzVDLGtCQUFRLGNBQWMsZUFBZSxPQUFPLEtBQUs7QUFBQSxRQUNuRDtBQUFBLE1BQ0Y7QUFFQSxjQUFRLE9BQU8sT0FBTztBQUN0QixjQUFRLE9BQU8sT0FBTztBQUN0QixjQUFRLFdBQVcsMkJBQTJCLEtBQUssU0FBbUI7QUFDdEUsY0FBUSxNQUFNLEtBQUssWUFBWSxXQUFXLENBQUM7QUFDM0MsY0FBUSxtQkFBbUI7QUFFM0IsVUFDRSxLQUFLLE1BQU0scUJBQ1gsS0FBSyxNQUFNLGtCQUFrQixXQUFXLEdBQ3hDO0FBRUEsZ0JBQVEsbUJBQW1CO0FBQUEsTUFDN0I7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEtBMUNlLE9BQUFELFlBQUEsU0FBQUEsWUFBQTtBQUFBLEdBREZBLDRCQUFBOzs7QUNGVixJQUFVRTtBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsVUFBVjtBQUNFLElBQU1BLE1BQUEsZUFBZSxDQUMxQixRQUNBLFNBQ3dCO0FBQ3hCLFlBQU0sVUFBbUIsQ0FBQztBQUUxQixjQUFRLE9BQU8sT0FBTyxPQUFPLEtBQUs7QUFDbEMsY0FBUSxnQkFBZ0IsT0FBTyxPQUFPLEtBQUs7QUFDM0MsY0FBUSxjQUFjLE9BQU8sT0FBTyxLQUFLO0FBQ3pDLGNBQVEsVUFBVSxPQUFPLE9BQU8sS0FBSztBQUNyQyxjQUFRLE9BQU8sT0FBTztBQUN0QixjQUFRLFdBQVcsMkJBQTJCLEtBQUssU0FBbUI7QUFDdEUsY0FBUSxNQUFNLEtBQUssWUFBWSxXQUFXLENBQUM7QUFDM0MsY0FBUSxtQkFBbUI7QUFDM0IsVUFDRSxLQUFLLE1BQU0scUJBQ1gsS0FBSyxNQUFNLGtCQUFrQixXQUFXLEdBQ3hDO0FBRUEsZ0JBQVEsbUJBQW1CO0FBQUEsTUFDN0I7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEtBdkJlLE9BQUFELFlBQUEsU0FBQUEsWUFBQTtBQUFBLEdBREZBLDRCQUFBOzs7QUNBVixJQUFVRTtBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsd0JBQVY7QUFDRSxJQUFNQSxvQkFBQSxZQUFZLENBQ3ZCLE9BQ0EsS0FDQSx5QkFDVztBQUNYLGFBQU87QUFBQSxRQUNMLE1BQU0sTUFBTTtBQUFBLFFBQ1osUUFBUSxNQUFNO0FBQUEsUUFDZDtBQUFBLFFBQ0E7QUFBQSxRQUNBLFVBQVVELFdBQVMsU0FBUyxVQUFVLE1BQU0sUUFBUTtBQUFBLFFBQ3BELFlBQVksVUFBVyxXQUFXLFVBQVUsTUFBTSxVQUFVO0FBQUEsUUFDNUQsTUFBTSxNQUFNLFFBQVE7QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQSxLQWZlLHFCQUFBQSxZQUFBLHVCQUFBQSxZQUFBO0FBQUEsR0FERkEsNEJBQUE7OztBQ0NWLElBQVVFO0FBQUEsQ0FBVixDQUFVQSxnQkFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxnQkFBVjtBQUNFLElBQU1BLFlBQUEsWUFBWSxPQUN2QixPQUNBLGNBS0EsYUFDQSxhQUN3QjtBQUN4QixVQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sT0FBTztBQUMxQixlQUFPLENBQUM7QUFBQSxNQUNWO0FBRUEsWUFBTSxRQUFRLE1BQU0sUUFBUTtBQUFBLFFBQzFCLE1BQU0sTUFBTSxJQUFJLE9BQU8sU0FBUztBQUM5QixjQUFJLENBQUMsS0FBSyxVQUFVO0FBQ2xCLG1CQUFPLENBQUM7QUFBQSxVQUNWO0FBQ0EsZ0JBQU0sTUFBTSxNQUFNLGFBQWEsS0FBSyxVQUFVLGFBQWEsUUFBUTtBQUNuRSxjQUFJLElBQUksT0FBTztBQUNiLGtCQUFNLE1BQU0sSUFBSSxNQUFNLE9BQU87QUFBQSxVQUMvQjtBQUNBLGlCQUFPLGdCQUFnQixNQUFNO0FBQUEsWUFDM0I7QUFBQSxjQUNFLFdBQVc7QUFBQSxjQUNYLE1BQU0sRUFBRSxLQUFLLE9BQU8sT0FBTyxJQUFJLE1BQU07QUFBQSxZQUN2QztBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0gsQ0FBQztBQUFBLE1BQ0g7QUFDQSxhQUFPLEVBQUUsR0FBRyxPQUFPLE1BQU07QUFBQSxJQUMzQjtBQUFBLEtBakNlLGFBQUFELFlBQUEsZUFBQUEsWUFBQTtBQUFBLEdBREZBLDRCQUFBOzs7QUNIVixJQUFVRTtBQUFBLENBQVYsQ0FBVUEsZ0JBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsVUFBVjtBQUNFLElBQU1BLE1BQUEsZUFBZSxDQUFDLFdBQTJDO0FBQ3RFLFVBQUksQ0FBQyxRQUFRO0FBQ1gsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEtBTmUsT0FBQUQsWUFBQSxTQUFBQSxZQUFBO0FBQUEsR0FERkEsOEJBQUE7OztBQ0tWLElBQVVFO0FBQUEsQ0FBVixDQUFVQSxnQkFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxtQkFBVjtBQUNFLElBQU1BLGVBQUEsWUFBWSxDQUN2QixPQUNBLEtBQ0EseUJBQ1c7QUFDWCxhQUFPO0FBQUEsUUFDTCxNQUFNLE1BQU07QUFBQSxRQUNaLFFBQVEsTUFBTTtBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsUUFDQSxVQUFVRCxXQUFVLFNBQVMsVUFBVSxNQUFNLFFBQVE7QUFBQSxRQUNyRCxZQUFZO0FBQUEsUUFDWixNQUFNLE1BQU0sUUFBUTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUVPLElBQU1DLGVBQUEsV0FBVyxDQUN0QixRQUNBLGdCQUNrQjtBQUNsQixhQUFPO0FBQUEsUUFDTCxNQUFNLE9BQU8sUUFBUSxLQUFLLFNBQVM7QUFBQSxRQUNuQyxTQUFTLE9BQU8sUUFBUSxLQUFLO0FBQUEsUUFDN0IsVUFBTUEsZUFBQSxtQkFBa0IsT0FBTyxRQUFRLEtBQUssSUFBSTtBQUFBLFFBQ2hELFlBQVFBLGVBQUEsbUJBQWtCLE9BQU8sUUFBUSxLQUFLLE1BQU07QUFBQSxRQUNwRDtBQUFBLFFBQ0EsU0FBS0EsZUFBQSxtQkFBa0IsT0FBTyxRQUFRLEtBQUssR0FBRztBQUFBLFFBQzlDLFVBQVVELFdBQVUsU0FBUyxTQUFTLE9BQU8sUUFBUSxLQUFLLFFBQVE7QUFBQSxRQUNsRSxNQUFNQSxZQUFNLEtBQUssYUFBYSxPQUFPLFFBQVEsSUFBSTtBQUFBLFFBQ2pELFVBQVUsMkJBQTJCLE9BQU8sU0FBUyxVQUFVO0FBQUEsUUFDL0QsVUFBVSxPQUFPO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBRU8sSUFBTUMsZUFBQSxvQkFBb0IsQ0FBQyxRQUF3QjtBQUN4RCxhQUFPLElBQUksUUFBUSxPQUFPLEVBQUU7QUFBQSxJQUM5QjtBQUFBLEtBckNlLGdCQUFBRCxZQUFBLGtCQUFBQSxZQUFBO0FBQUEsR0FERkEsOEJBQUE7OztBQ0RWLElBQVVFO0FBQUEsQ0FBVixDQUFVQSxnQkFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxxQkFBVjtBQUNFLElBQU1BLGlCQUFBLGVBQWUsQ0FDMUIsUUFDQSxNQUNBLHdCQUN3QjtBQUN4QixZQUFNLFVBQW1CLENBQUM7QUFFMUIsVUFBSSxxQkFBcUI7QUFDdkIsY0FBTSxjQUFjLG9CQUFvQjtBQUFBLFVBQ3RDLENBQUMsTUFBTSxFQUFFLFlBQVksT0FBTyxPQUFPLEtBQUs7QUFBQSxRQUMxQztBQUNBLGNBQU0sWUFBWSxvQkFBb0I7QUFBQSxVQUNwQyxDQUFDLE1BQU0sRUFBRSxZQUFZLE9BQU8sT0FBTyxLQUFLO0FBQUEsUUFDMUM7QUFDQSx3QkFBZ0IsUUFBUSxTQUFTLFlBQVk7QUFDN0Msc0JBQWMsUUFBUSxjQUFjLFVBQVU7QUFBQSxNQUNoRDtBQUVBLGNBQVEsY0FBYyxPQUFPLE9BQU8sS0FBSztBQUN6QyxjQUFRLE9BQU8sT0FBTyxPQUFPLEtBQUs7QUFDbEMsY0FBUSxvQkFBb0IsT0FBTyxPQUFPLEtBQUs7QUFDL0MsY0FBUSxVQUFVLE9BQU8sT0FBTyxLQUFLO0FBQ3JDLGNBQVEsT0FBTyxPQUFPO0FBQ3RCLGNBQVEsV0FBVywyQkFBMkIsS0FBSyxTQUFtQjtBQUN0RSxjQUFRLE1BQU0sS0FBSyxZQUFZLFdBQVcsQ0FBQztBQUMzQyxjQUFRLG1CQUFtQjtBQUczQixVQUNFLEtBQUssTUFBTSxxQkFDWCxLQUFLLE1BQU0sa0JBQWtCLFdBQVcsR0FDeEM7QUFDQSxnQkFBUSxtQkFBbUI7QUFBQSxNQUM3QjtBQUVBLGFBQU87QUFBQSxJQUNUO0FBQUEsS0FyQ2Usa0JBQUFELFlBQUEsb0JBQUFBLFlBQUE7QUFBQSxHQURGQSw4QkFBQTs7O0FDRFYsSUFBVUU7QUFBQSxDQUFWLENBQVVBLGdCQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLGNBQVY7QUFDRSxJQUFNQSxVQUFBLGVBQWUsQ0FDMUIsUUFDQSxTQUN3QjtBQUN4QixZQUFNLFVBQW1CLENBQUM7QUFHMUIsVUFBSSxDQUFDLE9BQU8sT0FBTyxLQUFLLGVBQWUsQ0FBQyxPQUFPLE9BQU8sS0FBSyxVQUFVO0FBQ25FO0FBQUEsTUFDRjtBQUVBLGNBQVEsU0FBUyxPQUFPLE9BQU8sS0FBSztBQUNwQyxjQUFRLGNBQWMsT0FBTyxPQUFPLEtBQUs7QUFDekMsY0FBUSxNQUFNLE9BQU8sT0FBTyxLQUFLLFVBQVUsTUFBTSxFQUFFLFNBQVM7QUFDNUQsY0FBUSxPQUFPLE9BQU87QUFDdEIsY0FBUSxXQUFXLDJCQUEyQixLQUFLLFNBQW1CO0FBQ3RFLGNBQVEsTUFBTSxLQUFLLFlBQVksV0FBVyxDQUFDO0FBQzNDLGNBQVEsbUJBQW1CO0FBRzNCLFVBQ0UsS0FBSyxNQUFNLHFCQUNYLEtBQUssTUFBTSxrQkFBa0IsV0FBVyxHQUN4QztBQUNBLGdCQUFRLG1CQUFtQjtBQUFBLE1BQzdCO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxLQTdCZSxXQUFBRCxZQUFBLGFBQUFBLFlBQUE7QUFBQSxHQURGQSw4QkFBQTs7O0FDUVYsSUFBTUUsY0FBWTtBQUFBLEVBQ3ZCLEdBQUdBO0FBQUEsRUFDSCxHQUFHO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFDTDs7O0FDckJPLElBQVU7QUFBQSxDQUFWLENBQVVDLGVBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsYUFBVjtBQUNFLElBQU1BLFNBQUEsVUFBVTtBQUNoQixJQUFNQSxTQUFBLGVBQWU7QUFDckIsSUFBTUEsU0FBQSxhQUFhO0FBQ25CLElBQU1BLFNBQUEsY0FBYztBQUNwQixJQUFNQSxTQUFBLFFBQVE7QUFDZCxJQUFNQSxTQUFBLGNBQWM7QUFDcEIsSUFBTUEsU0FBQSxlQUFlO0FBQUEsS0FQYixVQUFBRCxXQUFBLFlBQUFBLFdBQUE7QUFVVixFQUFNQSxXQUFBLGNBQWM7QUFDcEIsRUFBTUEsV0FBQSxnQkFBZ0I7QUFDdEIsRUFBTUEsV0FBQSxhQUFhO0FBQ25CLEVBQU1BLFdBQUEsY0FBYztBQUNwQixFQUFNQSxXQUFBLDhCQUE4QjtBQUNwQyxFQUFNQSxXQUFBLGNBQWM7QUFFcEIsRUFBTUEsV0FBQSxZQUFZLENBQ3ZCLFlBQ21DO0FBQ25DLFdBQU8sSUFBSSxNQUFNO0FBQ2YsWUFBTSxNQUFNO0FBQ1osVUFBSSxZQUFZLEtBQUssQ0FBQyxTQUFTO0FBQzdCLGNBQU0sWUFBWSxLQUFLLFFBQVEsT0FBTyxPQUFPO0FBQUEsTUFDL0M7QUFDQSxVQUFJLFVBQVVBLFdBQUEsYUFBYTtBQUN6QixjQUFNLFlBQVksS0FBSyxRQUFRLGNBQWMsU0FBUztBQUFBLFVBQ3BELFdBQVdBLFdBQUE7QUFBQSxVQUNYLFdBQVc7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNILFdBQVcsVUFBVUEsV0FBQSxhQUFhO0FBQ2hDLGNBQU0sWUFBWSxLQUFLLFFBQVEsWUFBWSxTQUFTO0FBQUEsVUFDbEQsV0FBV0EsV0FBQTtBQUFBLFVBQ1gsV0FBVztBQUFBLFFBQ2IsQ0FBQztBQUFBLE1BQ0g7QUFDQSxhQUFPLFFBQVE7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSDtBQUVPLEVBQU1BLFdBQUEseUJBQXlCLENBQ3BDLFlBQ21DO0FBQ25DLFdBQU8sSUFBSSxNQUFNO0FBQ2YsWUFBTSxNQUFNO0FBQ1osVUFBSSxZQUFZLEtBQUssQ0FBQyxTQUFTO0FBQzdCLGNBQU0sWUFBWSxLQUFLLFFBQVEsT0FBTyxPQUFPO0FBQUEsTUFDL0M7QUFDQSxVQUFJLFVBQVVBLFdBQUEsYUFBYTtBQUN6QixjQUFNLFlBQVksS0FBSyxRQUFRLGNBQWMsU0FBUztBQUFBLFVBQ3BELFdBQVdBLFdBQUE7QUFBQSxVQUNYLFdBQVc7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNILFdBQVcsVUFBVUEsV0FBQSxjQUFjRSxZQUFVLFFBQVEsV0FBVztBQUM5RCxjQUFNLFlBQVksS0FBSyxRQUFRLFlBQVksU0FBUztBQUFBLFVBQ2xELFdBQVdGLFdBQUE7QUFBQSxVQUNYLFdBQVc7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNIO0FBQ0EsYUFBTyxRQUFRO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFFTyxFQUFNQSxXQUFBLFNBQVMsQ0FBQyxTQUFpRDtBQUN0RSxXQUFPLElBQUksTUFBTTtBQUNmLFlBQU0sTUFBTTtBQUNaLFVBQUksQ0FBQyxNQUFNO0FBQ1QsY0FBTSxZQUFZLEtBQUssUUFBUSxPQUFPLElBQUk7QUFBQSxNQUM1QztBQUNBLFVBQUksV0FBVyxJQUFJLElBQUlBLFdBQUEsYUFBYTtBQUNsQyxjQUFNLFlBQVksS0FBSyxRQUFRLGFBQWEsTUFBTTtBQUFBLFVBQ2hELFdBQVdBLFdBQUE7QUFBQSxVQUNYLFdBQVc7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNIO0FBQ0EsYUFBTyxRQUFRO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFFTyxFQUFNQSxXQUFBLFdBQVcsQ0FBQyxXQUFtRDtBQUMxRSxXQUFPLElBQUksTUFBTTtBQUNmLFlBQU0sTUFBTTtBQUNaLFVBQUksQ0FBQyxRQUFRO0FBQ1gsY0FBTSxZQUFZLEtBQUssUUFBUSxPQUFPLE1BQU07QUFBQSxNQUM5QztBQUNBLFVBQUksV0FBVyxNQUFNLElBQUlBLFdBQUEsZUFBZTtBQUN0QyxjQUFNLFlBQVksS0FBSyxRQUFRLGFBQWEsUUFBUTtBQUFBLFVBQ2xELFdBQVdBLFdBQUE7QUFBQSxVQUNYLFdBQVc7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNIO0FBQ0EsYUFBTyxRQUFRO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFFTyxFQUFNQSxXQUFBLGFBQWEsQ0FBQyxVQUN6QixhQUFhLE9BQU8sT0FBTztBQUV0QixFQUFNQSxXQUFBLFdBQVcsQ0FHdEIsYUFDbUM7QUFDbkMsV0FBTyxJQUFJLE1BQU07QUFDZixZQUFNLE9BQU8sT0FBTyxLQUFLLFFBQVE7QUFDakMsWUFBTSxVQUFxQixDQUFDO0FBQzVCLFdBQUssSUFBSSxDQUFDLFFBQVE7QUFDaEIsWUFBSTtBQUNKLGdCQUFRLEtBQUs7QUFBQSxVQUNYLEtBQUs7QUFDSCxnQkFBSSxPQUFPLFlBQVksU0FBUyxPQUFPO0FBQ3JDLHdCQUFNQSxXQUFBLFlBQVcsU0FBUyxLQUFLO0FBQUEsWUFDakM7QUFDQTtBQUFBLFVBQ0YsS0FBSztBQUNILGdCQUFJLE9BQU8sWUFBWSxTQUFTLFNBQVM7QUFDdkMsd0JBQU1BLFdBQUEsV0FBVSxTQUFTLE9BQU87QUFBQSxZQUNsQztBQUNBO0FBQUEsVUFDRixLQUFLO0FBQ0gsZ0JBQUksT0FBTyxZQUFZLFNBQVMseUJBQXlCO0FBQ3ZELHdCQUFNQSxXQUFBLHdCQUF1QixTQUFTLHVCQUF1QjtBQUFBLFlBQy9EO0FBQ0E7QUFBQSxVQUNGLEtBQUs7QUFDSCxnQkFBSSxPQUFPLFVBQVU7QUFDbkIsd0JBQU1BLFdBQUEsd0JBQXVCLFNBQVMsb0JBQW9CO0FBQUEsWUFDNUQ7QUFDQTtBQUFBLFVBQ0YsS0FBSztBQUNILGdCQUFJLFNBQVMsTUFBTTtBQUNqQix3QkFBTUEsV0FBQSxRQUFPLFNBQVMsSUFBSTtBQUFBLFlBQzVCO0FBQ0E7QUFBQSxVQUNGLEtBQUs7QUFDSCxnQkFBSSxTQUFTLFFBQVE7QUFDbkIsd0JBQU1BLFdBQUEsVUFBUyxTQUFTLE1BQU07QUFBQSxZQUNoQztBQUNBO0FBQUEsUUFDSjtBQUNBLFlBQUksT0FBTyxJQUFJLE9BQU87QUFDcEIsa0JBQVEsS0FBSyxHQUFHLElBQUksTUFBTSxPQUFPO0FBQUEsUUFDbkM7QUFBQSxNQUNGLENBQUM7QUFDRCxVQUFJLFFBQVEsU0FBUyxHQUFHO0FBQ3RCLGNBQU0sVUFDSjtBQUNGLGNBQU0sSUFBSSxlQUFlLFNBQVMsT0FBTztBQUFBLE1BQzNDO0FBQ0EsYUFBTyxRQUFRO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFlQSxRQUFNLGFBQWEsQ0FBQyxVQUEwQjtBQUM1QyxVQUFNLE9BQU8sSUFBSSxZQUFZO0FBQzdCLFdBQU8sS0FBSyxPQUFPLEtBQUssRUFBRTtBQUFBLEVBQzVCO0FBRUEsUUFBTSxjQUFjLENBQ2xCLEtBQ0EsU0FDQSxRQUNBLFVBQ21CO0FBQ25CLFFBQUk7QUFDSixRQUFJLE9BQU87QUFDVCxjQUFRLElBQUksZUFBZSxTQUFTLENBQUMsRUFBRSxLQUFLLFNBQVMsUUFBUSxNQUFNLENBQUMsQ0FBQztBQUFBLElBQ3ZFLE9BQU87QUFDTCxjQUFRLElBQUksZUFBZSxTQUFTLENBQUMsRUFBRSxLQUFLLFNBQVMsT0FBTyxDQUFDLENBQUM7QUFBQSxJQUNoRTtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxlQUFlLENBQ25CLFlBQ0EsUUFDbUM7QUFDbkMsV0FBTyxJQUFJLE1BQU07QUFDZixVQUFJLENBQUMsWUFBWTtBQUNmLGNBQU0sWUFBWSxLQUFLLFFBQVEsT0FBTyxVQUFVO0FBQUEsTUFDbEQ7QUFDQSxVQUFJLFdBQVcsVUFBVSxJQUFJQSxXQUFBLFlBQVk7QUFDdkMsY0FBTSxZQUFZLEtBQUssUUFBUSxhQUFhLFlBQVk7QUFBQSxVQUN0RCxXQUFXQSxXQUFBO0FBQUEsVUFDWCxXQUFXO0FBQUEsUUFDYixDQUFDO0FBQUEsTUFDSDtBQUNBLFVBQUksQ0FBQyw4Q0FBOEMsS0FBSyxVQUFVLEdBQUc7QUFDbkUsY0FBTSxZQUFZLEtBQUssUUFBUSxhQUFhLFVBQVU7QUFBQSxNQUN4RDtBQUNBLGFBQU8sUUFBUTtBQUFBLElBQ2pCLENBQUM7QUFBQSxFQUNIO0FBQUEsR0E5TWU7QUFpTlYsSUFBTSxpQkFBTixjQUE2QixNQUFNO0FBQUEsRUFDeEM7QUFBQSxFQUNBLFlBQVksU0FBaUIsU0FBb0I7QUFDL0MsVUFBTSxPQUFPO0FBQ2IsU0FBSyxVQUFVO0FBQUEsRUFDakI7QUFDRjs7O0FDN05PLElBQVU7QUFBQSxDQUFWLENBQVVHLGVBQVY7QUFDRSxFQUFNQSxXQUFBLGtCQUFrQixDQUM3QixRQUNBLGdCQUNXO0FBQ1gsV0FBTyxTQUFTLE1BQU07QUFBQSxFQUN4QjtBQUFBLEdBTmU7OztBOUJRVixJQUFVQztBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQVlFLEVBQU1BLFdBQUEsTUFBTSxPQUNqQixPQUNBLE9BQ0EsaUJBQ0EsYUFDQSxhQUNBLFVBQWdDLENBQUMsTUFDbUI7QUFDcEQsV0FBTyxJQUFJLFlBQVk7QUFDckIsWUFBTSxRQUFRLFFBQVEsV0FBVyxRQUFRLFdBQVcsZ0JBQWdCLENBQUM7QUFDckUsWUFBTSxXQUFXLGdCQUFnQixJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztBQUV6RCxZQUFNLGtCQUFrQixNQUFNQyxTQUFRLFdBQVc7QUFBQSxRQUMvQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUVBLFlBQU0sV0FBTztBQUFBLFFBQ1gsTUFBTSxZQUFZO0FBQUEsUUFDbEIsZ0JBQWdCLFlBQVk7QUFBQSxRQUM1QixNQUFNLFlBQVk7QUFBQSxRQUNsQixTQUFVLGdCQUFnQixhQUFhLFdBQVc7QUFBQSxRQUNsRDtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsYUFBTyxJQUFJQyxvQkFBbUI7QUFBQSxRQUM1QixDQUFDLElBQUk7QUFBQSxRQUNMO0FBQUEsUUFDQSxNQUFNLFVBQVU7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsR0E5Q2VGLDBCQUFBOzs7QStCVGpCLElBQUFHLG9CQUdPO0FBUUEsSUFBVUM7QUFBQSxDQUFWLENBQVVBLGVBQVY7QUFZRSxFQUFNQSxXQUFBLE9BQU8sQ0FDbEIsTUFDQSxPQUNBLGlCQUNBLFlBQ0EsZUFDQSxVQUFnQyxDQUFDLE1BQ0U7QUFDbkMsV0FBTyxJQUFJLE1BQU07QUFDZixZQUFNLG1CQUFlO0FBQUEsUUFDbkIsS0FBSyxZQUFZO0FBQUEsUUFDakIsTUFBTSxZQUFZO0FBQUEsTUFDcEI7QUFDQSxZQUFNLFFBQVEsUUFBUSxXQUFXLFFBQVEsV0FBVyxnQkFBZ0IsQ0FBQztBQUNyRSxZQUFNLFdBQVcsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO0FBRXpELFlBQU0sV0FBTztBQUFBLFFBQ1g7QUFBQSxRQUNBLEtBQUssWUFBWTtBQUFBLFFBQ2pCLE1BQU0sWUFBWTtBQUFBLFFBQ2xCLFNBQVUsZ0JBQWdCLFlBQVksYUFBYTtBQUFBLFFBQ25EO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFFQSxhQUFPLElBQUlDLG9CQUFtQixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFBQSxJQUMxRSxDQUFDO0FBQUEsRUFDSDtBQUFBLEdBdkNlRCwwQkFBQTs7O0FDSmpCLElBQUFFLDZCQUF5QjtBQUN6QixJQUFBQyxvQkFBaUM7QUFFakMseUJBQWtCO0FBRVgsSUFBVUM7QUFBQSxDQUFWLENBQVVBLGVBQVY7QUFDTCxRQUFNQyxlQUFjO0FBQ3BCLFFBQU0sY0FBYztBQUNwQixRQUFNLHFCQUFxQjtBQUUzQixRQUFNLFlBQVksQ0FDaEIsVUFDQSxNQUNBLGdCQUNrQjtBQUNsQixXQUFPQyxZQUFVLGNBQWM7QUFBQSxNQUM3QjtBQUFBLFFBQ0UsU0FBUztBQUFBLFFBQ1QsVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFHQSxRQUFNLGFBQWEsT0FBTyxLQUFhLFVBQVUsTUFBb0I7QUFDbkUsUUFBSTtBQUNGLFlBQU0sV0FBVyxVQUFNLG1CQUFBQyxTQUFNLElBQUksUUFBUSxXQUFXLGtCQUFrQixDQUFDO0FBRXZFLFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDaEIsY0FBTSxJQUFJLE1BQU0sdUJBQXVCLFNBQVMsTUFBTSxFQUFFO0FBQUEsTUFDMUQ7QUFFQSxhQUFPLE1BQU0sU0FBUyxLQUFLO0FBQUEsSUFDN0IsU0FBUyxPQUFPO0FBQ2QsVUFBSSxVQUFVRixjQUFhO0FBQ3pCLGlCQUFTLDRCQUE0QixHQUFHLEtBQUssT0FBTyxLQUFLLEtBQUssRUFBRTtBQUNoRSxjQUFNLE1BQU0sV0FBVztBQUN2QixlQUFPLFdBQVcsS0FBSyxVQUFVLENBQUM7QUFBQSxNQUNwQyxPQUFPO0FBQ0wsaUJBQVMsd0JBQXdCQSxZQUFXLEdBQUc7QUFBQSxNQUNqRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBUU8sRUFBTUQsV0FBQSxjQUFjLE9BQ3pCLFVBQzRDO0FBQzVDLFdBQU8sSUFBSSxZQUFZO0FBQ3JCLFlBQU0sYUFBYSxLQUFLLGNBQWM7QUFDdEMsWUFBTSxPQUFPLE1BQU0sV0FBVztBQUFBLFFBQzVCLE1BQU0sWUFBWTtBQUFBLFFBQ2xCO0FBQUEsVUFDRSxXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFFBQVEsS0FBSyxNQUFNLElBQUksT0FBTyxNQUFNO0FBQ3hDLGNBQU0sT0FBTyxFQUFFLFFBQVEsS0FBSyxPQUFPLEtBQUs7QUFDeEMsY0FBTSxjQUFjLEVBQUUsUUFBUSxLQUFLLE9BQU8sS0FBSyxZQUM1QztBQUNILFlBQUksZ0JBQWdCLEtBQUs7QUFDdkI7QUFBQSxRQUNGO0FBQ0EsZUFBTyxvQ0FBUztBQUFBLFVBQ2Q7QUFBQSxVQUNBSSxTQUFRLElBQUksWUFBWSxJQUFJO0FBQUEsUUFDOUIsRUFDRyxLQUFLLE9BQU8sYUFBYTtBQUV4QixpQkFBTyxXQUFXLFNBQVMsS0FBSyxHQUFHLEVBQUUsS0FBSyxDQUFDLFNBQWM7QUFDdkQsbUJBQU8sVUFBVSxVQUFVLE1BQU0sV0FBVztBQUFBLFVBQzlDLENBQUM7QUFBQSxRQUNILENBQUMsRUFDQSxNQUFNLENBQUMsUUFBUSxTQUFTLG1CQUFtQixHQUFHLENBQUM7QUFBQSxNQUNwRCxDQUFDO0FBRUQsWUFBTSxXQUFXLE1BQU0sUUFBUSxJQUFJLEtBQUssR0FBRztBQUFBLFFBQ3pDLENBQUMsU0FBUyxTQUFTO0FBQUEsTUFDckI7QUFDQSxhQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSDtBQVFPLEVBQU1KLFdBQUEsYUFBYSxPQUN4QixTQUMwQztBQUMxQyxXQUFPLElBQUksWUFBWTtBQUNyQixZQUFNLGFBQWEsS0FBSyxjQUFjO0FBRXRDLFlBQU0sV0FBVyxNQUFNLG9DQUFTO0FBQUEsUUFDOUI7QUFBQSxRQUNBSSxTQUFRLElBQUksWUFBWSxJQUFJO0FBQUEsTUFDOUI7QUFDQSxlQUFTLDJCQUEyQixRQUFRO0FBQzVDLFVBQUksU0FBUyxrQkFBa0IsR0FBRztBQUNoQyxjQUFNO0FBQUEsVUFDSiw2Q0FBNkMsU0FBUyxhQUFhO0FBQUEsUUFDckU7QUFBQSxNQUNGO0FBQ0EsWUFBTSxPQUFPLE1BQU0sV0FBVyxxQkFBcUIsS0FBSyxZQUFZLENBQUM7QUFDckUsWUFBTSxlQUFlLEtBQUssT0FBTyxNQUEyQixPQUFPLEtBQ2hFO0FBRUgsWUFBTSxXQUFZLE9BQ2hCLFVBQU0sbUJBQUFELFNBQU0sU0FBUyxLQUFLLEdBQUcsR0FDN0IsS0FBSztBQUNQLGFBQU8sVUFBVSxVQUFVLFVBQVUsV0FBVztBQUFBLElBQ2xELENBQUM7QUFBQSxFQUNIO0FBQUEsR0FwSGVILDBCQUFBOzs7QUNQakIsSUFBQUssb0JBR087QUFJQSxJQUFVQztBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQVVFLEVBQU1BLFdBQUEsU0FBUyxDQUNwQixNQUNBLE9BQ0EsaUJBQ0EsVUFBa0MsQ0FBQyxNQUNBO0FBQ25DLFdBQU8sSUFBSSxNQUFNO0FBQ2YsWUFBTSxRQUFRLFFBQVEsV0FBVyxRQUFRLFdBQVc7QUFDcEQsWUFBTSxtQkFBZTtBQUFBLFFBQ25CLEtBQUssWUFBWTtBQUFBLFFBQ2pCLE1BQU0sWUFBWTtBQUFBLE1BQ3BCO0FBQ0EsWUFBTSxXQUFPO0FBQUEsUUFDWDtBQUFBLFFBQ0EsS0FBSyxZQUFZO0FBQUEsUUFDakIsSUFBSUMsU0FBUSxRQUFRLEVBQUUsUUFBUSxnQkFBZ0IsQ0FBQyxFQUFFLFlBQVk7QUFBQSxNQUMvRDtBQUVBLGFBQU8sSUFBSUMsb0JBQW1CO0FBQUEsUUFDNUIsQ0FBQyxJQUFJO0FBQUEsUUFDTCxDQUFDLGdCQUFnQixVQUFVLENBQUM7QUFBQSxRQUM1QixNQUFNLFVBQVU7QUFBQSxNQUNsQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQWxDZUYsMEJBQUE7OztBQ1pqQixJQUFBRyxvQkFBaUQ7QUFDakQsSUFBQUMsZ0JBQTRCO0FBU3JCLElBQVVDO0FBQUEsQ0FBVixDQUFVQSxlQUFWO0FBWUUsRUFBTUEsV0FBQSxrQkFBa0IsT0FDN0IsTUFDQSxPQUNBLE1BQ0EsUUFDQSxhQUNBLGFBQ2lEO0FBQ2pELFdBQU8sSUFBSSxZQUFZO0FBQ3JCLFlBQU0saUJBQWlCLE1BQU0sVUFBVSxFQUFFO0FBQ3pDLFlBQU0sY0FBYyxNQUFNQyxTQUFRLFdBQVc7QUFBQSxRQUMzQztBQUFBLFFBQ0EsZUFBZSxTQUFTO0FBQUEsUUFDeEI7QUFBQSxNQUNGO0FBRUEsWUFBTSxZQUFZLE1BQU1BLFNBQVEsV0FBVztBQUFBLFFBQ3pDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsWUFBTSxlQUFlLE1BQU0sS0FBSyxjQUFjLEVBQUUsbUJBQW1CO0FBRW5FLFlBQU0sS0FBSyxJQUFJLDBCQUFZO0FBQUEsUUFDekIsc0JBQXNCLGFBQWE7QUFBQSxRQUNuQyxXQUFXLGFBQWE7QUFBQSxRQUN4QixVQUFVLFNBQVMsWUFBWTtBQUFBLE1BQ2pDLENBQUM7QUFFRCxZQUFNLFlBQVE7QUFBQSxRQUNaLFlBQVksYUFBYSxZQUFZO0FBQUEsUUFDckMsS0FBSyxZQUFZO0FBQUEsUUFDakIsVUFBVSxhQUFhLFlBQVk7QUFBQSxRQUNuQztBQUFBLFFBQ0EsU0FBVyxnQkFBZ0IsUUFBUSxXQUFXO0FBQUEsUUFDOUM7QUFBQSxRQUNBLENBQUMsTUFBTSxVQUFVLENBQUM7QUFBQSxNQUNwQjtBQUdBLFVBQUksQ0FBQyxVQUFVLE1BQU07QUFDbkIsV0FBRyxJQUFJLEtBQUs7QUFBQSxNQUNkLE9BQU87QUFFTCxXQUFHLElBQUksVUFBVSxJQUFJLEVBQUUsSUFBSSxLQUFLO0FBQUEsTUFDbEM7QUFFQSxTQUFHLGtCQUFrQixhQUFhO0FBQ2xDLFNBQUcsWUFBWSxNQUFNLFVBQVUsQ0FBQztBQUVoQyxZQUFNLGVBQWUsR0FBRyxVQUFVO0FBQUEsUUFDaEMsc0JBQXNCO0FBQUEsTUFDeEIsQ0FBQztBQUNELFlBQU0sTUFBTSxhQUFhLFNBQVMsS0FBSztBQUN2QyxhQUFPLElBQUlDLG9CQUFtQixZQUFZLEdBQUc7QUFBQSxJQUMvQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEdBckVlRiwwQkFBQTs7O0FDVmpCLElBQUFHLGdCQUlPO0FBQ1AsSUFBQUMsb0JBVU87QUFFUCxJQUFBQyw2QkFHTzs7O0FDakJQLGlCQUE4QjtBQUd2QixJQUFVO0FBQUEsQ0FBVixDQUFVQyxxQkFBVjtBQUNMLFFBQU0sUUFBUTtBQUVQLEVBQU1BLGlCQUFBLGFBQWEsT0FDeEJDLGFBQ0EsVUFDQSxTQUNvQjtBQUNwQixVQUFNLE9BQU8sVUFBTUQsaUJBQUEsU0FBUSxRQUFRO0FBQ25DLFFBQUk7QUFDSixZQUFJQSxpQkFBQSxjQUFhQyxXQUFVLEdBQUc7QUFDNUIsZ0JBQVUsTUFBTSxLQUFLLFdBQVdBLGFBQVksRUFBRSxLQUFLLENBQUM7QUFBQSxJQUN0RCxPQUFPO0FBQ0wsWUFBTSxNQUFNLGtDQUFrQztBQUFBLElBQ2hEO0FBQ0EsV0FBTyxHQUFHLFVBQVUsZ0JBQWdCLElBQUksUUFBUSxFQUFFO0FBQUEsRUFDcEQ7QUFFTyxFQUFNRCxpQkFBQSxhQUFhLE9BQ3hCLE1BQ0EsVUFDQSxTQUNvQjtBQUNwQixVQUFNLE9BQU8sVUFBTUEsaUJBQUEsU0FBUSxRQUFRO0FBQ25DLFVBQU0sVUFBVSxNQUFNLEtBQUssT0FBTyxNQUFNLEVBQUUsS0FBSyxDQUFDO0FBQ2hELFdBQU8sR0FBRyxVQUFVLGdCQUFnQixJQUFJLFFBQVEsRUFBRTtBQUFBLEVBQ3BEO0FBRU8sRUFBTUEsaUJBQUEsYUFBYSxDQUFDLFVBQW9DO0FBQzdELFFBQUksT0FBTyxHQUFHO0FBQ1osYUFBTyxPQUFPLFVBQVU7QUFBQSxJQUMxQjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRU8sRUFBTUEsaUJBQUEsZ0JBQWdCLENBQUMsVUFBa0M7QUFDOUQsUUFBSSxVQUFVLEdBQUc7QUFDZixhQUFPLGlCQUFpQjtBQUFBLElBQzFCO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFTyxFQUFNQSxpQkFBQSxlQUFlLENBQUMsVUFBZ0Q7QUFDM0UsUUFBSSxPQUFPLEdBQUc7QUFDWixhQUFPLE9BQU8sVUFBVTtBQUFBLElBQzFCLFdBQVcsVUFBVSxHQUFHO0FBQ3RCLGFBQU8saUJBQWlCO0FBQUEsSUFDMUI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUdPLEVBQU1BLGlCQUFBLGNBQWMsT0FDekJDLGFBQ0EsYUFDa0I7QUFDbEIsVUFBTSxPQUFPLFVBQU1ELGlCQUFBLFNBQVEsUUFBUTtBQUNuQyxVQUFNLGFBQWEsVUFBTUEsaUJBQUEsY0FBYUMsV0FBVTtBQUNoRCxVQUFNLFVBQVUsTUFBTSxjQUFjLFlBQVksUUFBUTtBQUN4RCxVQUFNLFNBQVMsTUFBTSxLQUFLLEtBQUssS0FBSyxNQUFNLFNBQVMsT0FBTyxDQUFDO0FBQzNELGFBQVMsY0FBYyxNQUFNO0FBQUEsRUFDL0I7QUFHTyxFQUFNRCxpQkFBQSxlQUFlLE9BQU8sWUFBdUM7QUFDeEUsUUFBSSxTQUFpQjtBQUNyQixZQUFJQSxpQkFBQSxZQUFXLE9BQU8sR0FBRztBQUN2QixnQkFBVSxNQUFNLE9BQU8sSUFBSSxHQUFHLGFBQWEsT0FBTyxFQUFFO0FBQUEsSUFDdEQsZUFBV0EsaUJBQUEsZUFBYyxPQUFPLEdBQUc7QUFDakMsZUFBUyxRQUFRO0FBQUEsSUFDbkIsT0FBTztBQUNMLFlBQU0sTUFBTSx1QkFBdUI7QUFBQSxJQUNyQztBQUNBLFdBQU87QUFBQSxFQUNUO0FBR08sRUFBTUEsaUJBQUEsVUFBVSxPQUNyQixhQUNHO0FBQ0gsUUFBSSxPQUFPLEdBQUc7QUFDWixhQUFRLFVBQU1BLGlCQUFBLGFBQVksUUFBa0I7QUFBQSxJQUM5QyxXQUFXLFVBQVUsR0FBRztBQUN0QixhQUFRLFVBQU1BLGlCQUFBLGdCQUFlLFFBQTJCO0FBQUEsSUFDMUQsT0FBTztBQUNMLFlBQU0sTUFBTSx5QkFBeUI7QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFHTyxFQUFNQSxpQkFBQSxjQUFjLE9BQU8sV0FBbUI7QUFDbkQsVUFBTSxhQUFhLFVBQVUsY0FBYztBQUFBLE1BQ3pDLFNBQVMsVUFBVTtBQUFBLElBQ3JCLENBQUM7QUFDRCxVQUFNLE1BQU0sVUFBVTtBQUN0QixVQUFNLFFBQVE7QUFDZCxVQUFNLE1BQU07QUFDWixVQUFNLE9BQU8sSUFBSSxXQUFBRSxRQUFLO0FBQUEsTUFDcEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUSxFQUFFLGFBQWEsV0FBVztBQUFBLElBQ3BDLENBQUM7QUFDRCxXQUFPO0FBQUEsRUFDVDtBQUdPLEVBQU1GLGlCQUFBLGlCQUFpQixPQUM1QixhQUNxQjtBQUNyQixVQUFNLGFBQWEsVUFBVSxjQUFjO0FBQUEsTUFDekMsU0FBUyxVQUFVO0FBQUEsSUFDckIsQ0FBQztBQUNELFVBQU0sTUFBTSxVQUFVO0FBQ3RCLFVBQU0sUUFBUTtBQUNkLFVBQU0sU0FBUyxFQUFFLFFBQVEsWUFBWSxNQUFNLE9BQU8sU0FBbUI7QUFDckUsVUFBTSxVQUFVLElBQUksbUJBQVEsRUFBRSxLQUFLLE9BQU8sT0FBTyxDQUFDO0FBQ2xELFVBQU0sUUFBUSxNQUFNO0FBQ3BCLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxnQkFBZ0IsT0FBTyxNQUFjLGFBQXVCO0FBQ2hFLFVBQU0sT0FBTyxVQUFNQSxpQkFBQSxTQUFRLFFBQVE7QUFDbkMsVUFBTSxjQUFjLE1BQU0sS0FBSyxTQUFTLElBQUk7QUFDNUMsVUFBTSxpQkFBaUIsS0FBSyxNQUFNLFdBQVcsV0FBVztBQUN4RCxhQUFTLFlBQVksSUFBSTtBQUN6QixhQUFTLFlBQVksY0FBYyxFQUFFO0FBQ3JDLFdBQU87QUFBQSxFQUNUO0FBQUEsR0FoSWU7OztBQ0RWLElBQVU7QUFBQSxDQUFWLENBQVVHLGFBQVY7QUFDRSxFQUFNQSxTQUFBLGFBQWEsQ0FDeEIsVUFDQSxhQUNtQztBQUNuQyxXQUFPLElBQUksWUFBWTtBQUNyQixlQUFTLG1CQUFtQixRQUFRO0FBQ3BDLFlBQU0sZ0JBQWdCLFlBQVksVUFBVSxRQUFRO0FBQ3BELGFBQU8sTUFBTSxnQkFBZ0IsV0FBVyxVQUFVLFFBQVE7QUFBQSxJQUM1RCxDQUFDO0FBQUEsRUFDSDtBQUVPLEVBQU1BLFNBQUEsYUFBYSxDQUN4QixVQUNBLGFBQ21DO0FBQ25DLFdBQU8sSUFBSSxZQUFZO0FBQ3JCLGVBQVMsd0JBQXdCLFFBQVE7QUFDekMsYUFBTyxNQUFNLGdCQUFnQjtBQUFBLFFBQzNCLEtBQUssVUFBVSxRQUFRO0FBQUEsUUFDdkI7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEdBdkJlOzs7QUNMakIsSUFBQUMsY0FBaUM7QUFLMUIsSUFBVTtBQUFBLENBQVYsQ0FBVUMsZ0JBQVY7QUFDTCxRQUFNLG1CQUFtQixDQUFDLFFBQ3hCLEdBQUcsVUFBVSx1QkFBdUIsSUFBSSxHQUFHO0FBRTdDLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLGNBQVUsZ0JBQWdCLHFCQUFxQixLQUM3QyxRQUFRLEtBQUssVUFBVSxnQkFBZ0IsbUJBQW1CO0FBQzVELFdBQU8sSUFBSSx1QkFBVyxFQUFFLE9BQU8sVUFBVSxvQkFBb0IsQ0FBQztBQUFBLEVBQ2hFO0FBRU8sRUFBTUEsWUFBQSxhQUFhLE9BQ3hCLGFBQ21DO0FBQ25DLFdBQU8sSUFBSSxZQUFZO0FBQ3JCLGVBQVMsc0JBQXNCLFFBQVE7QUFDdkMsVUFBSTtBQUNKLFVBQUksZ0JBQWdCLFdBQVcsUUFBUSxHQUFHO0FBQ3hDLGdCQUFRLE1BQU0sT0FBTyxJQUFJLEdBQUcsYUFBYSxRQUFRO0FBQUEsTUFDbkQsV0FBVyxnQkFBZ0IsY0FBYyxRQUFRLEdBQUc7QUFDbEQsZUFBTyxPQUFPLEtBQUssTUFBTSxTQUFTLFlBQVksQ0FBQztBQUFBLE1BQ2pELE9BQU87QUFDTCxlQUFPLE9BQU8sS0FBSyxRQUF1QjtBQUFBLE1BQzVDO0FBRUEsWUFBTSxZQUFZLElBQUksaUJBQUssQ0FBQyxJQUFJLENBQUM7QUFDakMsWUFBTSxNQUFNLE1BQU0sUUFBUSxFQUFFLFVBQVUsU0FBUztBQUMvQyxhQUFPLGlCQUFpQixHQUFHO0FBQUEsSUFDN0IsQ0FBQztBQUFBLEVBQ0g7QUFvQk8sRUFBTUEsWUFBQSxhQUFhLE9BQ3hCLGdCQUNtQztBQUNuQyxXQUFPLElBQUksWUFBWTtBQUNyQixlQUFTLHVCQUF1QixXQUFXO0FBRTNDLFlBQU0sV0FBVyxJQUFJLGlCQUFLLENBQUMsS0FBSyxVQUFVLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZELFlBQU0sTUFBTSxNQUFNLFFBQVEsRUFBRSxVQUFVLFFBQVE7QUFDOUMsYUFBTyxpQkFBaUIsR0FBRztBQUFBLElBQzdCLENBQUM7QUFBQSxFQUNIO0FBQUEsR0ExRGU7OztBQ0VWLElBQVU7QUFBQSxDQUFWLENBQVVDLGFBQVY7QUFDRSxFQUFNQSxTQUFBLHdCQUF3QixDQUNuQyxPQUNBLHlCQUNhO0FBQ2IsVUFBTSxPQUFPO0FBQUEsTUFDWCxNQUFNLE1BQU07QUFBQSxNQUNaLFFBQVEsTUFBTTtBQUFBLE1BQ2QsYUFBYSxNQUFNO0FBQUEsTUFDbkIseUJBQXlCO0FBQUEsTUFDekIsY0FBYyxNQUFNO0FBQUEsTUFDcEIsWUFBWSxNQUFNO0FBQUEsTUFDbEIsWUFBWSxNQUFNO0FBQUEsTUFDbEIsT0FBTztBQUFBLE1BQ1AsU0FBUyxNQUFNO0FBQUEsSUFDakI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVPLEVBQU1BLFNBQUEsYUFBYSxPQUN4QixVQUNBLGFBQ0EsYUFDbUM7QUFDbkMsUUFBSSxnQkFBZ0IsV0FBVztBQUM3QixVQUFJLENBQUMsVUFBVTtBQUNiLGNBQU0sTUFBTSxnQ0FBZ0M7QUFBQSxNQUM5QztBQUNBLGFBQU8sTUFBTSxRQUFRLFdBQVcsVUFBVSxRQUFRO0FBQUEsSUFDcEQsV0FBVyxnQkFBZ0IsY0FBYztBQUN2QyxhQUFPLE1BQU0sV0FBVyxXQUFXLFFBQVE7QUFBQSxJQUM3QyxPQUFPO0FBQ0wsWUFBTSxNQUFNLHVCQUF1QjtBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUVPLEVBQU1BLFNBQUEsYUFBYSxPQUN4QixPQUNBLGFBQ0EsYUFDbUM7QUFDbkMsUUFBSSxnQkFBZ0IsV0FBVztBQUM3QixVQUFJLENBQUMsVUFBVTtBQUNiLGNBQU0sTUFBTSxnQ0FBZ0M7QUFBQSxNQUM5QztBQUNBLGFBQU8sTUFBTSxRQUFRLFdBQVcsT0FBTyxRQUFRO0FBQUEsSUFDakQsV0FBVyxnQkFBZ0IsY0FBYztBQUN2QyxhQUFPLE1BQU0sV0FBVyxXQUFXLEtBQUs7QUFBQSxJQUMxQyxPQUFPO0FBQ0wsWUFBTSxNQUFNLHVCQUF1QjtBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUVPLEVBQU1BLFNBQUEsU0FBUyxPQUNwQixPQUNBLFVBQ0EsYUFDQSxhQUNtQztBQUNuQyxRQUFJLGdCQUFnQixhQUFhLENBQUMsVUFBVTtBQUMxQyxZQUFNLE1BQU0sZ0NBQWdDO0FBQUEsSUFDOUM7QUFDQSxVQUFNLFVBQVUsT0FDZCxVQUFNQSxTQUFBLFlBQVcsVUFBVSxhQUFhLFFBQVEsR0FDaEQ7QUFBQSxNQUNBLE9BQU8sT0FBZTtBQUNwQixjQUFNLFFBQVE7QUFDZCxlQUFPLFVBQU1BLFNBQUEsWUFBVyxPQUFPLGFBQWEsUUFBUTtBQUFBLE1BQ3REO0FBQUEsTUFDQSxDQUFDLFFBQWU7QUFDZCxjQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsU0FBUztBQUNaLFlBQU0sTUFBTSxzQkFBc0I7QUFBQSxJQUNwQztBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsR0E5RWU7OztBSjZCVixJQUFVQztBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQUNMLFFBQU0sdUJBQXVCO0FBR3RCLEVBQU1BLFdBQUEsd0JBQXdCLENBQ25DQyxPQUNBLE9BQ0Esb0JBQzJCO0FBQzNCLGVBQU87QUFBQSxNQUNMQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLGdDQUFjO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBR08sRUFBTUQsV0FBQSxhQUFhLE9BQ3hCQyxPQUNBLE9BQ0EsYUFDQSxhQUNBLGVBQ0EsVUFDQSxjQUNzQztBQUN0QyxVQUFNLGFBQWEsS0FBSyxjQUFjO0FBQ3RDLFVBQU0sV0FBVyxVQUFNLHNEQUFtQyxVQUFVO0FBQ3BFLFVBQU0sY0FBY0MsU0FBUSxJQUFJLFlBQVlELE1BQUssU0FBUyxDQUFDO0FBQzNELFVBQU0sc0JBQWtCLGlEQUE4QkEsT0FBTSxLQUFLO0FBQ2pFLFVBQU0sZUFBZSxDQUFDO0FBRXRCLGlCQUFhO0FBQUEsTUFDWCw0QkFBYyxjQUFjO0FBQUEsUUFDMUIsWUFBWTtBQUFBLFFBQ1osa0JBQWtCQTtBQUFBLFFBQ2xCLE9BQU87QUFBQSxRQUNQO0FBQUEsUUFDQSxXQUFXO0FBQUEsTUFDYixDQUFDO0FBQUEsSUFDSDtBQUVBLGlCQUFhO0FBQUEsVUFDWDtBQUFBLFFBQ0VBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsaUJBQWE7QUFBQSxVQUNYO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQUE7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLGlCQUFhO0FBQUEsVUFDWDtBQUFBLFFBQ0VBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVUsZ0JBQWdCLGFBQWEsV0FBVztBQUFBLFFBQ2xEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxpQkFBYTtBQUFBLFVBQ1g7QUFBQSxRQUNFO0FBQUEsVUFDRSxVQUFVO0FBQUEsVUFDVixNQUFBQTtBQUFBLFVBQ0EsZUFBZTtBQUFBLFVBQ2YsT0FBTztBQUFBLFVBQ1AsaUJBQWlCO0FBQUEsUUFDbkI7QUFBQSxRQUNBO0FBQUEsVUFDRSw2QkFBNkI7QUFBQSxZQUMzQixNQUFNO0FBQUEsWUFDTjtBQUFBLFlBQ0EsbUJBQW1CO0FBQUEsVUFDckI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQVlPLEVBQU1ELFdBQUEsT0FBTyxPQUNsQixPQUNBLGFBQ0EsYUFDQSxPQUNBLFVBQWdDLENBQUMsTUFDUztBQUMxQyxXQUFPLElBQUksWUFBWTtBQUNyQixZQUFNLFFBQVEsVUFBVSxTQUE2QixLQUFLO0FBQzFELFVBQUksTUFBTSxPQUFPO0FBQ2YsY0FBTSxNQUFNO0FBQUEsTUFDZDtBQUVBLFlBQU0sRUFBRSxVQUFVLGdCQUFnQixJQUFJO0FBQ3RDLFlBQU0sY0FBYyxNQUFNLGVBQWU7QUFDekMsWUFBTSxRQUFRLFdBQVcsV0FBVztBQUNwQyxZQUFNLFVBQVU7QUFDaEIsWUFBTSx1QkFBdUI7QUFDN0IsWUFBTSxpQkFBaUIsTUFBTSxVQUFVLEVBQUU7QUFFekMsWUFBTSxrQkFBa0IsUUFBUTtBQUFBLFFBQzlCO0FBQUEsUUFDQSxNQUFNO0FBQUEsTUFDUjtBQUdBLHNCQUFnQixhQUFhLGNBQWM7QUFFM0MsVUFBSTtBQUVKLFVBQUksTUFBTSxVQUFVO0FBQ2xCLGNBQU0sV0FBVyxNQUFNLFFBQVE7QUFBQSxVQUM3QjtBQUFBLFVBQ0EsTUFBTTtBQUFBLFVBQ047QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUVBLFlBQUksU0FBUyxPQUFPO0FBQ2xCLGdCQUFNO0FBQUEsUUFDUjtBQUNBLGNBQU0sU0FBUztBQUFBLE1BQ2pCLFdBQVcsTUFBTSxLQUFLO0FBQ3BCLGNBQU0sUUFBUSxFQUFFLE9BQU8sTUFBTSxJQUFJO0FBQ2pDLGNBQU0sV0FBVyxNQUFNLFFBQVE7QUFBQSxVQUM3QixFQUFFLEdBQUcsaUJBQWlCLEdBQUcsTUFBTTtBQUFBLFVBQy9CO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFDQSxZQUFJLFNBQVMsT0FBTztBQUNsQixnQkFBTTtBQUFBLFFBQ1I7QUFDQSxjQUFNLFNBQVM7QUFBQSxNQUNqQixPQUFPO0FBQ0wsY0FBTSxNQUFNLDZCQUE2QjtBQUFBLE1BQzNDO0FBRUEsWUFBTSxZQUFZO0FBRWxCLFlBQU0sU0FBU0csWUFBVSxjQUFjO0FBQUEsUUFDckM7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFFQSxlQUFTLGNBQWMsTUFBTTtBQUM3QixlQUFTLDBCQUEwQixHQUFHO0FBRXRDLFlBQU1GLFFBQU9DLFNBQVEsUUFBUSxPQUFPO0FBQ3BDLFlBQU0sUUFBUSxVQUFNRixXQUFBO0FBQUEsUUFDbEJDLE1BQUssWUFBWTtBQUFBLFFBQ2pCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxNQUFNLFVBQVUsRUFBRTtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUdBLFVBQUksaUJBQWlCO0FBQ25CLGNBQU07QUFBQSxjQUNKRCxXQUFBO0FBQUEsWUFDRUMsTUFBSyxZQUFZO0FBQUEsWUFDakI7QUFBQSxZQUNBLGdCQUFnQixZQUFZO0FBQUEsVUFDOUI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLGFBQU8sSUFBSUcsb0JBQW1CO0FBQUEsUUFDNUI7QUFBQSxRQUNBLENBQUMsTUFBTSxVQUFVLEdBQUdILE1BQUssVUFBVSxDQUFDO0FBQUEsUUFDcEMsTUFBTSxVQUFVO0FBQUEsUUFDaEJBLE1BQUs7QUFBQSxNQUNQO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEdBeE1lRCwwQkFBQTs7O0FLaENqQixJQUFBSyxvQkFHTztBQUlBLElBQVVDO0FBQUEsQ0FBVixDQUFVQSxlQUFWO0FBV0UsRUFBTUEsV0FBQSxPQUFPLENBQ2xCLE1BQ0EsT0FDQSxpQkFDQSxVQUFnQyxDQUFDLE1BQ0U7QUFDbkMsVUFBTSxRQUFRLFFBQVEsV0FBVyxRQUFRLFdBQVc7QUFDcEQsV0FBTyxJQUFJLE1BQU07QUFDZixZQUFNLG1CQUFlO0FBQUEsUUFDbkIsS0FBSyxZQUFZO0FBQUEsUUFDakIsTUFBTSxZQUFZO0FBQUEsTUFDcEI7QUFFQSxZQUFNLFdBQU87QUFBQSxRQUNYO0FBQUEsUUFDQSxLQUFLLFlBQVk7QUFBQSxRQUNqQixJQUFJQyxTQUFRLFFBQVEsRUFBRSxRQUFRLGdCQUFnQixDQUFDLEVBQUUsWUFBWTtBQUFBLE1BQy9EO0FBRUEsYUFBTyxJQUFJQyxvQkFBbUI7QUFBQSxRQUM1QixDQUFDLElBQUk7QUFBQSxRQUNMLENBQUMsZ0JBQWdCLFVBQVUsQ0FBQztBQUFBLFFBQzVCLE1BQU0sVUFBVTtBQUFBLE1BQ2xCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEdBcENlRiwwQkFBQTs7O0FDWGpCLElBQUFHLG9CQUFpRDtBQVMxQyxJQUFVQztBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQWFFLEVBQU1BLFdBQUEsV0FBVyxPQUN0QixNQUNBLE9BQ0EsTUFDQSxpQkFDQSxRQUNBLGFBQ0EsVUFBZ0MsQ0FBQyxNQUNXO0FBQzVDLFdBQU8sSUFBSSxZQUFZO0FBQ3JCLFlBQU0sUUFBUSxRQUFRLFdBQVcsUUFBUSxXQUFXLGdCQUFnQixDQUFDO0FBQ3JFLFlBQU0sY0FBYyxJQUFJQyxTQUFRLFFBQVEsRUFBRSxRQUFRLE1BQU0sQ0FBQztBQUN6RCxZQUFNLFdBQVcsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO0FBQ3pELFlBQU0sY0FBYyxNQUFNQSxTQUFRLFdBQVc7QUFBQSxRQUMzQztBQUFBLFFBQ0EsTUFBTSxTQUFTO0FBQUEsUUFDZixZQUFZO0FBQUEsTUFDZDtBQUVBLFlBQU0sWUFBWSxNQUFNQSxTQUFRLFdBQVc7QUFBQSxRQUN6QztBQUFBLFFBQ0E7QUFBQSxRQUNBLFlBQVk7QUFBQSxNQUNkO0FBRUEsWUFBTSxXQUFPO0FBQUEsUUFDWCxZQUFZLGFBQWEsWUFBWTtBQUFBLFFBQ3JDLEtBQUssWUFBWTtBQUFBLFFBQ2pCLFVBQVUsYUFBYSxZQUFZO0FBQUEsUUFDbkMsTUFBTSxZQUFZO0FBQUEsUUFDbEIsU0FBVyxnQkFBZ0IsUUFBUSxXQUFXO0FBQUEsUUFDOUM7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUVBLFlBQU0sZUFBZSxVQUFVLE9BQU8sQ0FBQyxVQUFVLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSTtBQUVwRSxhQUFPLElBQUlDLG9CQUFtQjtBQUFBLFFBQzVCO0FBQUEsUUFDQTtBQUFBLFFBQ0EsTUFBTSxVQUFVO0FBQUEsTUFDbEI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsR0F4RGVGLDBCQUFBOzs7QTFDQ1YsSUFBTUcsYUFBVztBQUFBLEVBQ3RCLEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUNMOyIsCiAgIm5hbWVzIjogWyJTcGxUb2tlbiIsICJTb2xhbmFKc29uQ29uZmlnIiwgIkNvbnN0YW50cyIsICJXYXJubmluZ01lc3NhZ2UiLCAiQ2x1c3RlciIsICJFbmRQb2ludFVybCIsICJCdW5kbHJVcmwiLCAiRGFzQXBpVXJsIiwgIk5mdHN0b3JhZ2VBcGlLZXkiLCAiY3VzdG9tQ2x1c3RlclVybCIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJOb2RlIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJDb21tb24iLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF93ZWIzIiwgIkFjY291bnQiLCAiS2V5cGFpciIsICJicyIsICJPcmlnaW5hbCIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIlBkYSIsICJCTiIsICJBY2NvdW50IiwgImltcG9ydF9iczU4IiwgIkFjY291bnQiLCAiYnMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZXN1bHQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29sbGVjdGlvbk1pbnQiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnZlcnRlciIsICJDb21wcmVzc2VkTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlJveWFsdHkiLCAiQ29udmVydGVyIiwgIk5mdCIsICJDb252ZXJ0ZXIiLCAiTWVtbyIsICJDb252ZXJ0ZXIiLCAiTWludCIsICJDb252ZXJ0ZXIiLCAiUmVndWxhck5mdE1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJQcm9wZXJ0aWVzIiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlckNoZWNrZWQiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyIiwgIkNvbnZlcnRlciIsICJWYWxpZGF0b3IiLCAiTWVzc2FnZSIsICJDb252ZXJ0ZXIiLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgIk1BWF9SRVRSSUVTIiwgIkNvbnZlcnRlciIsICJmZXRjaCIsICJBY2NvdW50IiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfd2ViMyIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9tcGxfdG9rZW5fbWV0YWRhdGEiLCAiUHJvdmVuYW5jZUxheWVyIiwgInVwbG9hZEZpbGUiLCAiSXJ5cyIsICJBcndlYXZlIiwgImltcG9ydF9uZnQiLCAiTmZ0U3RvcmFnZSIsICJTdG9yYWdlIiwgIlNwbFRva2VuIiwgIm1pbnQiLCAiQWNjb3VudCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiQWNjb3VudCIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJBY2NvdW50IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJTcGxUb2tlbiJdCn0K