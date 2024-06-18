// ../suite-utils/src/constants.ts
import { PublicKey } from "@solana/web3.js";
import SolanaJsonConfig from "@solana-suite/config/load";
var Config = SolanaJsonConfig;
var Constants;
((Constants2) => {
  let WarnningMessage;
  ((WarnningMessage2) => {
    WarnningMessage2.FILEBASE_CREDENTIAL = `
        [YOU HAVE TO DO]
        --------------------------------------
        You need to update Filebase credential(accessKey and secret) define parameter in solana-suite.json.
        Can get credential from https://filebase.com/
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
  Constants2.FilebaseCredential = {
    dev: {
      key: "9CA51CEFF9FF98CB91CF",
      secret: "CgjYuMvs2NdFGbLPyFDSWESaO05nobQ9mp16PPDo"
    }
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
  Constants2.switchFilebaseCredential = (env) => {
    switch (env) {
      case "mainnet-beta" /* prd */: {
        if (!Config.filebase.key || !Config.filebase.secret) {
          throw Error(Constants2.WarnningMessage.FILEBASE_CREDENTIAL);
        }
        return Config.filebase;
      }
      default: {
        if (Config.filebase.key || Config.filebase.secret) {
          return Config.filebase;
        }
        return Constants2.FilebaseCredential.dev;
      }
    }
  };
  Constants2.loadConfig = async () => {
    const { default: loadedConfig } = await import("@solana-suite/config/load", { with: { type: "json" } });
    Config = loadedConfig;
    console.log("##############", Config);
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
  Constants2.MAX_TRANSACTION_VERSION = 0;
  Constants2.MAX_TRANSACTION_RETRIES = 1;
  Constants2.FILEBADE_GATEWAY_URL = "https://ipfs.filebase.io/ipfs";
  Constants2.IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
  Constants2.BUNDLR_NETWORK_URL = (0, Constants2.switchBundlr)(Config.cluster.type);
  Constants2.FILEBASE_ACCESS_KEYS = (0, Constants2.switchFilebaseCredential)(
    Config.cluster.type
  );
  Constants2.DAS_API_URL = (0, Constants2.switchDasApi)(Config.cluster.type);
  Constants2.EXPLORER_SOLSCAN_URL = "https://solscan.io";
  Constants2.EXPLORER_SOLANAFM_URL = "https://solana.fm";
  Constants2.EXPLORER_XRAY_URL = "https://xray.helius.xyz";
})(Constants || (Constants = {}));

// ../global/src/index.ts
import { Keypair, LAMPORTS_PER_SOL, PublicKey as PublicKey4 } from "@solana/web3.js";

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
var Account;
((Account5) => {
  let Associated;
  ((Associated2) => {
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
})(Account || (Account = {}));

// ../account/src/keypair.ts
import { Keypair as Original, PublicKey as PublicKey2 } from "@solana/web3.js";
import bs from "bs58";
var Account2;
((Account5) => {
  class Keypair7 {
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
      return new Keypair7({
        pubkey: keypair.publicKey.toString(),
        secret: bs.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair7({
        pubkey: keypair.publicKey.toString(),
        secret: bs.encode(keypair.secretKey)
      });
    };
  }
  Account5.Keypair = Keypair7;
})(Account2 || (Account2 = {}));

// ../account/src/pda.ts
import { PublicKey as PublicKey3 } from "@solana/web3.js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { PROGRAM_ADDRESS as MPL_BUBBLEGUM_PROGRAM_ID } from "mpl-bubblegum-instructions";
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
  ...Account,
  ...Account2,
  ...Account3
};

// ../global/src/index.ts
import { BigNumber } from "bignumber.js";
import bs2 from "bs58";
String.prototype.toExplorerUrl = function(explorer = "solscan" /* Solscan */, options = {}) {
  console.log("# config in global", Config);
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

// ../transaction-builder/src/batch.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction2,
  Transaction as Transaction3
} from "@solana/web3.js";

// ../transaction-builder/src/priority-fee.ts
import {
  ComputeBudgetProgram as ComputeBudgetProgram2
} from "@solana/web3.js";

// ../transaction-builder/src/compute-unit.ts
import {
  ComputeBudgetProgram,
  PublicKey as PublicKey5,
  Transaction
} from "@solana/web3.js";

// ../suite-utils/src/shared.ts
var debugLog = (data1, data2 = "", data3 = "", data4 = "") => {
  if (Constants.isDebugging === "true" || process.env.DEBUG === "true") {
    console.log("[DEBUG]", data1, data2, data3, data4);
  }
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

// ../transaction-builder/src/compute-unit.ts
var TransactionBuilder;
((TransactionBuilder10) => {
  const DEFAULUT_COMPUTE_UNIT = 2e5;
  const DEFAULUT_THRESHOLD_MULTIPLIED = 1.1;
  const MINIMUM_COMPUTE_UNIT = 450;
  let ComputeUnit;
  ((ComputeUnit2) => {
    ComputeUnit2.createInstruction = async (instructions, payer, thresholdMultiplied) => {
      const units = await (0, ComputeUnit2.simulate)(instructions, payer, thresholdMultiplied);
      return ComputeBudgetProgram.setComputeUnitLimit({
        units
      });
    };
    ComputeUnit2.simulate = async (instructions, payer, thresholdMultiplied = DEFAULUT_THRESHOLD_MULTIPLIED) => {
      const tx = new Transaction();
      tx.recentBlockhash = PublicKey5.default.toString();
      instructions.forEach((inst) => tx.add(inst));
      tx.feePayer = payer.publicKey;
      tx.verifySignatures(false);
      const simulation = await Node.getConnection().simulateTransaction(tx);
      const units = simulation.value.unitsConsumed || DEFAULUT_COMPUTE_UNIT;
      debugLog("# get simulate transaction: ", units);
      let cu = 0;
      if (units === 0) {
        cu = DEFAULUT_COMPUTE_UNIT;
      } else if (units < MINIMUM_COMPUTE_UNIT) {
        cu = MINIMUM_COMPUTE_UNIT;
      } else {
        cu = Math.trunc(units * thresholdMultiplied);
      }
      debugLog("# simulate cu: ", cu);
      return cu;
    };
  })(ComputeUnit = TransactionBuilder10.ComputeUnit || (TransactionBuilder10.ComputeUnit = {}));
})(TransactionBuilder || (TransactionBuilder = {}));

// ../transaction-builder/src/priority-fee.ts
var TransactionBuilder2;
((TransactionBuilder10) => {
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
      return ComputeBudgetProgram2.setComputeUnitPrice({
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
  })(PriorityFee = TransactionBuilder10.PriorityFee || (TransactionBuilder10.PriorityFee = {}));
})(TransactionBuilder2 || (TransactionBuilder2 = {}));

// ../transaction-builder/src/retry.ts
import {
  sendAndConfirmTransaction,
  SendTransactionError
} from "@solana/web3.js";
var TransactionBuilder3;
((TransactionBuilder10) => {
  let Retry;
  ((Retry2) => {
    const RETRY_MULTIPLIED = 1.6;
    Retry2.isComputeBudgetError = (error) => {
      if (typeof error === "object" && error instanceof SendTransactionError) {
        if (error.logs?.some((item) => item.includes("ComputeBudget"))) {
          return true;
        }
      }
      return false;
    };
    Retry2.submit = async (transaction, finalSigners, confirmOptions) => {
      debugLog("# Retry the Transaction due to a compute budget error");
      transaction.instructions[0] = await TransactionBuilder.ComputeUnit.createInstruction(
        transaction.instructions,
        finalSigners[0],
        RETRY_MULTIPLIED
      );
      return await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        finalSigners,
        confirmOptions
      );
    };
    Retry2.submitForPartialSign = async (transaction, finalSigner, confirmOptions) => {
      debugLog("# Retry the Transaction due to a compute budget error");
      transaction.instructions[0] = await TransactionBuilder.ComputeUnit.createInstruction(
        transaction.instructions,
        finalSigner,
        RETRY_MULTIPLIED
      );
      transaction.partialSign(finalSigner);
      const wireTransaction = transaction.serialize();
      return await Node.getConnection().sendRawTransaction(
        wireTransaction,
        confirmOptions
      );
    };
  })(Retry = TransactionBuilder10.Retry || (TransactionBuilder10.Retry = {}));
})(TransactionBuilder3 || (TransactionBuilder3 = {}));

// ../transaction-builder/src/batch.ts
var TransactionBuilder4;
((TransactionBuilder10) => {
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
        const transaction = new Transaction3();
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
        try {
          return await sendAndConfirmTransaction2(
            Node.getConnection(),
            transaction,
            finalSigners,
            confirmOptions
          );
        } catch (error) {
          if (TransactionBuilder3.Retry.isComputeBudgetError(error)) {
            return await TransactionBuilder3.Retry.submit(
              transaction,
              finalSigners,
              confirmOptions
            );
          }
          throw error;
        }
      });
    };
  }
  TransactionBuilder10.Batch = Batch;
})(TransactionBuilder4 || (TransactionBuilder4 = {}));

// ../transaction-builder/src/common.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction3,
  Transaction as Transaction4
} from "@solana/web3.js";
var TransactionBuilder5;
((TransactionBuilder10) => {
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
        const transaction = new Transaction4();
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
        try {
          return await sendAndConfirmTransaction3(
            Node.getConnection(),
            transaction,
            finalSigners,
            confirmOptions
          );
        } catch (error) {
          if (TransactionBuilder3.Retry.isComputeBudgetError(error)) {
            return await TransactionBuilder3.Retry.submit(
              transaction,
              finalSigners,
              confirmOptions
            );
          }
          throw error;
        }
      });
    };
  }
  TransactionBuilder10.Common = Common;
})(TransactionBuilder5 || (TransactionBuilder5 = {}));

// ../transaction-builder/src/mint.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction4,
  Transaction as Transaction5
} from "@solana/web3.js";
var TransactionBuilder6;
((TransactionBuilder10) => {
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
        const transaction = new Transaction5();
        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;
        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }
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
        this.instructions.forEach((inst) => transaction.add(inst));
        const confirmOptions = {
          maxRetries: Constants.MAX_TRANSACTION_RETRIES
        };
        try {
          return await sendAndConfirmTransaction4(
            Node.getConnection(),
            transaction,
            finalSigners,
            confirmOptions
          );
        } catch (error) {
          if (TransactionBuilder3.Retry.isComputeBudgetError(error)) {
            return await TransactionBuilder3.Retry.submit(
              transaction,
              finalSigners,
              confirmOptions
            );
          }
          throw error;
        }
      });
    };
  }
  TransactionBuilder10.Mint = Mint;
})(TransactionBuilder6 || (TransactionBuilder6 = {}));

// ../transaction-builder/src/partial-sign.ts
import {
  Transaction as Transaction6
} from "@solana/web3.js";
var TransactionBuilder7;
((TransactionBuilder10) => {
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
        const transaction = Transaction6.from(decode);
        const confirmOptions = {
          maxRetries: Constants.MAX_TRANSACTION_RETRIES
        };
        try {
          transaction.partialSign(options.feePayer.toKeypair());
          const wireTransaction = transaction.serialize();
          return await Node.getConnection().sendRawTransaction(
            wireTransaction,
            confirmOptions
          );
        } catch (error) {
          if (TransactionBuilder3.Retry.isComputeBudgetError(error)) {
            return await TransactionBuilder3.Retry.submitForPartialSign(
              transaction,
              options.feePayer.toKeypair(),
              confirmOptions
            );
          }
          throw error;
        }
      });
    };
  }
  TransactionBuilder10.PartialSign = PartialSign;
})(TransactionBuilder7 || (TransactionBuilder7 = {}));

// ../transaction-builder/src/calculate-txsize.ts
var TransactionBuilder8;
((TransactionBuilder10) => {
  const LOW_VALUE = 127;
  const HIGH_VALUE = 16383;
  const MAX_TRANSACTION_SIZE = 1232;
  const compactHeader = (n) => n <= LOW_VALUE ? 1 : n <= HIGH_VALUE ? 2 : 3;
  const compactArraySize = (n, size) => compactHeader(n) + n * size;
  TransactionBuilder10.calculateTxSize = (transaction, feePayer) => {
    const feePayerPk = [feePayer.toBase58()];
    const signers = new Set(feePayerPk);
    const accounts = new Set(feePayerPk);
    const ixsSize = transaction.instructions.reduce((acc, ix) => {
      ix.keys.forEach(({ pubkey, isSigner }) => {
        const pk = pubkey.toBase58();
        if (isSigner) signers.add(pk);
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
  TransactionBuilder10.isOverTransactionSize = (transaction, feePayer) => {
    return (0, TransactionBuilder10.calculateTxSize)(transaction, feePayer) > MAX_TRANSACTION_SIZE;
  };
})(TransactionBuilder8 || (TransactionBuilder8 = {}));

// ../transaction-builder/src/index.ts
var TransactionBuilder9 = {
  ...TransactionBuilder4,
  ...TransactionBuilder8,
  ...TransactionBuilder5,
  ...TransactionBuilder,
  ...TransactionBuilder6,
  ...TransactionBuilder7,
  ...TransactionBuilder2,
  ...TransactionBuilder3
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
        const hexRegex = /^[0-9a-fA-F]+$/;
        if (typeof ok === "string" && hexRegex.test(ok)) {
          return new TransactionBuilder9.PartialSign(ok).submit(options);
        } else {
          const obj = ok;
          return await obj.submit(options);
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
  return new TransactionBuilder9.Batch().submit(batchOptions);
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

// src/index.ts
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
export {
  Node
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL2NvbnN0YW50cy50cyIsICIuLi8uLi9nbG9iYWwvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2Fzc29jaWF0ZWQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMva2V5cGFpci50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9wZGEudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvYmF0Y2gudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvcHJpb3JpdHktZmVlLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbXB1dGUtdW5pdC50cyIsICIuLi8uLi9zdWl0ZS11dGlscy9zcmMvc2hhcmVkLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3JldHJ5LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbW1vbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3BhcnRpYWwtc2lnbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9jYWxjdWxhdGUtdHhzaXplLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9yZXN1bHQudHMiLCAiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBGaW5hbGl0eSwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBTb2xhbmFKc29uQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnO1xuXG5leHBvcnQgbGV0IENvbmZpZyA9IFNvbGFuYUpzb25Db25maWc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBXYXJubmluZ01lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBGSUxFQkFTRV9DUkVERU5USUFMID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBGaWxlYmFzZSBjcmVkZW50aWFsKGFjY2Vzc0tleSBhbmQgc2VjcmV0KSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBDYW4gZ2V0IGNyZWRlbnRpYWwgZnJvbSBodHRwczovL2ZpbGViYXNlLmNvbS9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgYDtcbiAgICBleHBvcnQgY29uc3QgREFTX0FQSV9VUkwgPSBgXG4gICAgICAgIFtZT1UgSEFWRSBUTyBET11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgWW91IG5lZWQgdG8gdXBkYXRlIGRhc0FwaVVybCBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBjYW4gZ2V0IGFwaSB1cmwgZnJvbSBodHRwczovL3d3dy5oZWxpdXMuZGV2L1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcbiAgICAgICAgYDtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBjb25zdCBjdXJyZW50Q2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGV4cG9ydCBjb25zdCBjdXN0b21DbHVzdGVyVXJsID0gQ29uZmlnLmNsdXN0ZXIuY3VzdG9tQ2x1c3RlclVybDtcbiAgZXhwb3J0IGNvbnN0IGlzRGVidWdnaW5nID0gQ29uZmlnLmRlYnVnZ2luZztcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbURhc0FwaVVybCA9IENvbmZpZy5kYXNBcGlVcmw7XG5cbiAgZXhwb3J0IGVudW0gQ2x1c3RlciB7XG4gICAgcHJkID0gJ21haW5uZXQtYmV0YScsXG4gICAgcHJkTWV0YXBsZXggPSAnbWFpbm5ldC1iZXRhLW1ldGFwbGV4JyxcbiAgICBkZXYgPSAnZGV2bmV0JyxcbiAgICBsb2NhbGhvc3QgPSAnbG9jYWxob3N0LWRldm5ldCcsXG4gIH1cblxuICBleHBvcnQgZW51bSBFbmRQb2ludFVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vYXBpLm1haW5uZXQtYmV0YS5zb2xhbmEuY29tJyxcbiAgICBwcmRNZXRhcGxleCA9ICdodHRwczovL2FwaS5tZXRhcGxleC5zb2xhbmEuY29tJyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICAgIGxvY2FsaG9zdCA9ICdodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEJ1bmRsclVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbm9kZTEuaXJ5cy54eXosaHR0cHM6Ly9ub2RlMi5pcnlzLnh5eicsXG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmlyeXMueHl6JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIERhc0FwaVVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbWFpbm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTInLFxuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTInLFxuICB9XG5cbiAgZXhwb3J0IGNvbnN0IEZpbGViYXNlQ3JlZGVudGlhbCA9IHtcbiAgICBkZXY6IHtcbiAgICAgIGtleTogJzlDQTUxQ0VGRjlGRjk4Q0I5MUNGJyxcbiAgICAgIHNlY3JldDogJ0Nnall1TXZzMk5kRkdiTFB5RkRTV0VTYU8wNW5vYlE5bXAxNlBQRG8nLFxuICAgIH0sXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaENsdXN0ZXIgPSAocGFyYW06IHtcbiAgICBjbHVzdGVyPzogc3RyaW5nO1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgeyBjbHVzdGVyOiBlbnYsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuXG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSB1cmwsIG1vc3QgcHJpb3JpdHlcbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCAmJiBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoO1xuICAgICAgcmV0dXJuIGN1c3RvbUNsdXN0ZXJVcmxbaW5kZXhdO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQ7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZE1ldGFwbGV4O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5sb2NhbGhvc3Q7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hCdW5kbHIgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5CdW5kbHJVcmwuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoRGFzQXBpID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIGRhcyB1cmwsIG1vc3QgcHJpb3JpdHlcbiAgICBpZiAoY3VzdG9tRGFzQXBpVXJsICYmIGN1c3RvbURhc0FwaVVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21EYXNBcGlVcmwubGVuZ3RoO1xuICAgICAgcmV0dXJuIGN1c3RvbURhc0FwaVVybFtpbmRleF07XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOiB7XG4gICAgICAgIGlmIChjdXN0b21EYXNBcGlVcmwubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkRBU19BUElfVVJMKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkRhc0FwaVVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5EYXNBcGlVcmwuZGV2LnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hGaWxlYmFzZUNyZWRlbnRpYWwgPSAoXG4gICAgZW52OiBzdHJpbmcsXG4gICk6IHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBzZWNyZXQ6IHN0cmluZztcbiAgfSA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOiB7XG4gICAgICAgIGlmICghQ29uZmlnLmZpbGViYXNlLmtleSB8fCAhQ29uZmlnLmZpbGViYXNlLnNlY3JldCkge1xuICAgICAgICAgIHRocm93IEVycm9yKENvbnN0YW50cy5XYXJubmluZ01lc3NhZ2UuRklMRUJBU0VfQ1JFREVOVElBTCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbmZpZy5maWxlYmFzZTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgaWYgKENvbmZpZy5maWxlYmFzZS5rZXkgfHwgQ29uZmlnLmZpbGViYXNlLnNlY3JldCkge1xuICAgICAgICAgIHJldHVybiBDb25maWcuZmlsZWJhc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZpbGViYXNlQ3JlZGVudGlhbC5kZXY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBsb2FkQ29uZmlnID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHsgZGVmYXVsdDogbG9hZGVkQ29uZmlnIH0gPSBhd2FpdCBpbXBvcnQoXG4gICAgICAnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCcsXG4gICAgICB7XG4gICAgICAgIHdpdGg6IHsgdHlwZTogJ2pzb24nIH0sXG4gICAgICB9XG4gICAgKTtcbiAgICBDb25maWcgPSBsb2FkZWRDb25maWc7XG4gICAgY29uc29sZS5sb2coJyMjIyMjIyMjIyMjIyMjJywgQ29uZmlnKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgV1JBUFBFRF9UT0tFTl9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnU28xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMicsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRU1PX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdNZW1vMVVoa0pSZkh5dkxNY1Z1Y0p3eFhldUQ3MjhFcVZERHdRRHhGTU5vJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FVEFQTEVYX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdtZXRhcWJ4eFVlcmRxMjhjajFSYkFXa1lRbTN5YnpqYjZhOGJ0NTE4eDFzJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IENPTU1JVE1FTlQ6IEZpbmFsaXR5ID0gJ2NvbmZpcm1lZCc7XG4gIGV4cG9ydCBjb25zdCBNQVhfVFJBTlNBQ1RJT05fVkVSU0lPTjogbnVtYmVyID0gMDtcbiAgZXhwb3J0IGNvbnN0IE1BWF9UUkFOU0FDVElPTl9SRVRSSUVTID0gMTtcbiAgZXhwb3J0IGNvbnN0IEZJTEVCQURFX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vaXBmcy5maWxlYmFzZS5pby9pcGZzJztcbiAgZXhwb3J0IGNvbnN0IElSWVNfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9nYXRld2F5LmlyeXMueHl6JztcbiAgZXhwb3J0IGNvbnN0IEJVTkRMUl9ORVRXT1JLX1VSTCA9IHN3aXRjaEJ1bmRscihDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IEZJTEVCQVNFX0FDQ0VTU19LRVlTID0gc3dpdGNoRmlsZWJhc2VDcmVkZW50aWFsKFxuICAgIENvbmZpZy5jbHVzdGVyLnR5cGUsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IHN3aXRjaERhc0FwaShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTFNDQU5fVVJMID0gJ2h0dHBzOi8vc29sc2Nhbi5pbyc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xBTkFGTV9VUkwgPSAnaHR0cHM6Ly9zb2xhbmEuZm0nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfWFJBWV9VUkwgPSAnaHR0cHM6Ly94cmF5LmhlbGl1cy54eXonO1xufVxuXG4vLyBEaXNwbGF5IEFsbCBBbm5vdW5jZVxuLy8gY29uc29sZS5sb2coQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5BTk5PVU5DRSk7XG4iLCAiaW1wb3J0IHsgS2V5cGFpciwgTEFNUE9SVFNfUEVSX1NPTCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbmZpZywgQ29uc3RhbnRzLCBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIsIEV4cGxvcmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuLyoqXG4gKiBDcmVhdGUgZXhwbG9yZXIgdXJsIGZvciBhY2NvdW50IGFkZHJlc3Mgb3Igc2lnbmF0dXJlXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9FeHBsb3JlclVybCA9IGZ1bmN0aW9uIChcbiAgZXhwbG9yZXI6IEV4cGxvcmVyID0gRXhwbG9yZXIuU29sc2NhbixcbiAgb3B0aW9uczogUGFydGlhbDxFeHBsb3Jlck9wdGlvbnM+ID0ge30sXG4pIHtcbiAgY29uc29sZS5sb2coJyMgY29uZmlnIGluIGdsb2JhbCcsIENvbmZpZyk7XG4gIGxldCBjbHVzdGVyID0gQ29uZmlnLmNsdXN0ZXIudHlwZTtcbiAgZGVidWdMb2coJyMgY2x1c3RlclR5cGU6JywgY2x1c3Rlcik7XG4gIGlmIChjbHVzdGVyICE9PSBDb25zdGFudHMuQ2x1c3Rlci5wcmQpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9XG5cbiAgY29uc3QgYWRkcmVzc09yU2lnbmF0dXJlOiBzdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gIGxldCB1cmwgPSAnJztcblxuICBpZiAob3B0aW9ucy5yZXBsYWNlUGF0aCkge1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBpZiAoQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KGFkZHJlc3NPclNpZ25hdHVyZSkpIHtcbiAgICAvLyBhZGRyZXNzXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vYWRkcmVzcy8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gc2lnbmF0dXJlXG4gICAgLy8gZm9yIEludmFsaWQgdHlwZSBcIm5ldmVyXCIgb2YgYWRkcmVzc09yU2lnbmF0dXJlLCBzbyBgYXMgc3RyaW5nYFxuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFB1YktleShAc29sYW5hLXN1aXRlKSB0byBQdWJsaWNLZXkoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFB1YmxpY0tleVxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvUHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1B1YmtleSh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuUHViS2V5OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnRvU3RyaW5nKCkpO1xufTtcblxuLyoqXG4gKiBTZWNyZXQoQHNvbGFuYS1zdWl0ZSkgdG8gS2V5cGFpcihAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgS2V5cGFpclxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvS2V5cGFpciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNTZWNyZXQodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlNlY3JldDogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xufTtcblxuLyoqXG4gKiBMQU1QT1JUUyB0byBTT0xcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b1NvbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAuZGl2KExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuXG4vKipcbiAqIFNPTCB0byBMQU1QT1JUU1xuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvTGFtcG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLnRpbWVzKExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFjY291bnQsXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBUT0tFTl9QUk9HUkFNX0lELFxuICBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yLFxuICBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcixcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG4vKipcbiAqIEdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICpcbiAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICogQHBhcmFtIHtib29sZWFufSBhbGxvd093bmVyT2ZmQ3VydmVcbiAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nIHwgSW5zdHJ1Y3Rpb24+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQXNzb2NpYXRlZCB7XG4gICAgLyoqXG4gICAgICogW01haW4gbG9naWNdR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAgICAgKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgICAqXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gZmVlUGF5ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICAgKi9cbiAgICBleHBvcnQgY29uc3QgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI/OiBQdWJrZXksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgICApOiBQcm9taXNlPHtcbiAgICAgIHRva2VuQWNjb3VudDogc3RyaW5nO1xuICAgICAgaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICB9PiA9PiB7XG4gICAgICBjb25zdCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYWxsb3dPd25lck9mZkN1cnZlLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBEb250IHVzZSBSZXN1bHRcbiAgICAgICAgYXdhaXQgZ2V0QWNjb3VudChcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLmNvbW1pdG1lbnQsXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IpICYmXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBlcnJvcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5ZXIgPSAhZmVlUGF5ZXIgPyBvd25lciA6IGZlZVBheWVyO1xuXG4gICAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgcGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgS2V5cGFpciBhcyBPcmlnaW5hbCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IGNsYXNzIEtleXBhaXIge1xuICAgIHNlY3JldDogU2VjcmV0O1xuICAgIHB1YmtleTogUHVia2V5O1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiB7IHB1YmtleT86IFB1YmtleTsgc2VjcmV0OiBTZWNyZXQgfSkge1xuICAgICAgaWYgKCFwYXJhbXMucHVia2V5KSB7XG4gICAgICAgIGNvbnN0IGtleXBhaXIgPSBwYXJhbXMuc2VjcmV0LnRvS2V5cGFpcigpO1xuICAgICAgICB0aGlzLnB1YmtleSA9IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB1YmtleSA9IHBhcmFtcy5wdWJrZXk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlY3JldCA9IHBhcmFtcy5zZWNyZXQ7XG4gICAgfVxuXG4gICAgdG9QdWJsaWNLZXkoKTogUHVibGljS2V5IHtcbiAgICAgIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMucHVia2V5KTtcbiAgICB9XG5cbiAgICB0b0tleXBhaXIoKTogT3JpZ2luYWwge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnNlY3JldCk7XG4gICAgICByZXR1cm4gT3JpZ2luYWwuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNQdWJrZXkgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFB1YmtleSA9PlxuICAgICAgL15bMC05YS16QS1aXXszMiw0NH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBpc1NlY3JldCA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgU2VjcmV0ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezg3LDg4fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGNyZWF0ZSA9ICgpOiBLZXlwYWlyID0+IHtcbiAgICAgIGNvbnN0IGtleXBhaXIgPSBPcmlnaW5hbC5nZW5lcmF0ZSgpO1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgdG9LZXlQYWlyID0gKGtleXBhaXI6IE9yaWdpbmFsKTogS2V5cGFpciA9PiB7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBQUk9HUkFNX0FERFJFU1MgYXMgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lEIH0gZnJvbSAnbXBsLWJ1YmJsZWd1bS1pbnN0cnVjdGlvbnMnO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICAgIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0TWFzdGVyRWRpdGlvbiA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnZWRpdGlvbicpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRUcmVlQXV0aG9yaXR5ID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Qmd1bVNpZ25lciA9ICgpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW0J1ZmZlci5mcm9tKCdjb2xsZWN0aW9uX2NwaScsICd1dGY4JyldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QXNzZXRJZCA9IChhZGRyZXNzOiBQdWJrZXksIGxlYWZJbmRleDogbnVtYmVyKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgQk4uQk4obGVhZkluZGV4KTtcbiAgICAgIGNvbnN0IFthc3NldElkXSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2Fzc2V0JywgJ3V0ZjgnKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBVaW50OEFycmF5LmZyb20obm9kZS50b0FycmF5KCdsZScsIDgpKSxcbiAgICAgICAgXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFzc2V0SWQudG9TdHJpbmcoKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCBhcyBBYXNzb2NpYXRlZCB9IGZyb20gJy4vYXNzb2NpYXRlZCc7XG5pbXBvcnQgeyBBY2NvdW50IGFzIEtleXBhaXIgfSBmcm9tICcuL2tleXBhaXInO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBQZGEgfSBmcm9tICcuL3BkYSc7XG5pbXBvcnQgJ34vdHlwZXMvZ2xvYmFsJztcbi8vIGltcG9ydCAnfi9nbG9iYWwnO1xuXG5leHBvcnQgY29uc3QgQWNjb3VudCA9IHtcbiAgLi4uQWFzc29jaWF0ZWQsXG4gIC4uLktleXBhaXIsXG4gIC4uLlBkYSxcbn07XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZVVuaXQgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUmV0cnkgfSBmcm9tICcuL3JldHJ5JztcbmltcG9ydCB7IEJhdGNoU3VibWl0T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIEJhdGNoIHtcbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBvcHRpb25zOiBQYXJ0aWFsPEJhdGNoU3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zLmluc3RydWN0aW9ucykge1xuICAgICAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgb3B0aW9ucy5pbnN0cnVjdGlvbnMnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb21tb25Pck1pbnRJbnN0ID0gb3B0aW9ucy5pbnN0cnVjdGlvbnM7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBpbnN0IG9mIGNvbW1vbk9yTWludEluc3QpIHtcbiAgICAgICAgICBpZiAoIWluc3QuaW5zdHJ1Y3Rpb25zICYmICFpbnN0LnNpZ25lcnMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBgb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIGJhdGNoU3VibWl0KCkuXG4gICAgICAgICAgICBJbmRleDogJHtpfSwgU2V0IHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KGluc3QpfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBjb21tb25Pck1pbnRJbnN0LmZsYXRNYXAoXG4gICAgICAgICAgKGluc3QpID0+IGluc3QuaW5zdHJ1Y3Rpb25zLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBzaWduZXJzID0gY29tbW9uT3JNaW50SW5zdC5mbGF0TWFwKChpbnN0KSA9PiBpbnN0LnNpZ25lcnMpO1xuICAgICAgICBjb25zdCBmZWVQYXllcnMgPSBjb21tb25Pck1pbnRJbnN0LmZpbHRlcihcbiAgICAgICAgICAoaW5zdCkgPT4gaW5zdC5mZWVQYXllciAhPT0gdW5kZWZpbmVkLFxuICAgICAgICApO1xuICAgICAgICBsZXQgZmVlUGF5ZXIgPSBzaWduZXJzWzBdO1xuICAgICAgICBpZiAoZmVlUGF5ZXJzLmxlbmd0aCA+IDAgJiYgZmVlUGF5ZXJzWzBdLmZlZVBheWVyKSB7XG4gICAgICAgICAgZmVlUGF5ZXIgPSBmZWVQYXllcnNbMF0uZmVlUGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gc2lnbmVycztcbiAgICAgICAgaWYgKGZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSBmZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW2ZlZVBheWVyLCAuLi5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZVR4c2l6ZS5pc01heFRyYW5zYWN0aW9uU2l6ZSh0cmFuc2FjdGlvbiwgZmVlUGF5ZXIucHVibGljS2V5KTtcblxuICAgICAgICBpZiAob3B0aW9ucy5pc1ByaW9yaXR5RmVlKSB7XG4gICAgICAgICAgaW5zdHJ1Y3Rpb25zLnVuc2hpZnQoXG4gICAgICAgICAgICBhd2FpdCBQcmlvcml0eUZlZS5Qcmlvcml0eUZlZS5jcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgICBvcHRpb25zLmFkZFNvbFByaW9yaXR5RmVlLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpbnN0cnVjdGlvbnMudW5zaGlmdChcbiAgICAgICAgICBhd2FpdCBDb21wdXRlVW5pdC5Db21wdXRlVW5pdC5jcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICAgIGluc3RydWN0aW9ucyxcbiAgICAgICAgICAgIGZpbmFsU2lnbmVyc1swXSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgICBpbnN0cnVjdGlvbnMubWFwKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBDb25zdGFudHMuTUFYX1RSQU5TQUNUSU9OX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChSZXRyeS5SZXRyeS5pc0NvbXB1dGVCdWRnZXRFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBSZXRyeS5SZXRyeS5zdWJtaXQoXG4gICAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb21wdXRlQnVkZ2V0UHJvZ3JhbSxcbiAgS2V5cGFpcixcbiAgUmVjZW50UHJpb3JpdGl6YXRpb25GZWVzLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZVVuaXQgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQcmlvcml0eUZlZSB7XG4gICAgY29uc3QgTUFYX1JFQ0VOVF9QUklPUklUWV9GRUVfQUNDT1VOVFMgPSAxMjg7XG4gICAgY29uc3QgTUlDUk9fTEFNUE9SVFNfUEVSX0xBTVBPUlQgPSAxXzAwMF8wMDA7XG5cbiAgICBleHBvcnQgY29uc3QgY3JlYXRlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIGFkZFNvbFByaW9yaXR5RmVlPzogbnVtYmVyLFxuICAgICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgICkgPT4ge1xuICAgICAgbGV0IHVuaXRQcmljZSA9IDA7XG4gICAgICBpZiAoYWRkU29sUHJpb3JpdHlGZWUgJiYgZmVlUGF5ZXIpIHtcbiAgICAgICAgY29uc3QgbWljcm9MYW1wb3J0cyA9XG4gICAgICAgICAgYWRkU29sUHJpb3JpdHlGZWUudG9MYW1wb3J0cygpICogTUlDUk9fTEFNUE9SVFNfUEVSX0xBTVBPUlQ7XG4gICAgICAgIGNvbnN0IGN1ID0gYXdhaXQgQ29tcHV0ZVVuaXQuQ29tcHV0ZVVuaXQuc2ltdWxhdGUoXG4gICAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgIGZlZVBheWVyLFxuICAgICAgICApO1xuICAgICAgICB1bml0UHJpY2UgPSBNYXRoLnRydW5jKG1pY3JvTGFtcG9ydHMgLyBjdSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bml0UHJpY2UgPSBhd2FpdCBlc3RpbWF0ZVByaW9yaXR5RmVlKGluc3RydWN0aW9ucyk7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZygnIyB1bml0IHByaWNlKG1pY3JvTGFtcG9ydHMpOiAnLCB1bml0UHJpY2UpO1xuICAgICAgcmV0dXJuIENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0UHJpY2Uoe1xuICAgICAgICBtaWNyb0xhbXBvcnRzOiB1bml0UHJpY2UsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gdGhhbmtzIGh0dHBzOi8vZ2l0aHViLmNvbS9ibG9ja3dvcmtzLWZvdW5kYXRpb24vbWFuZ28tdjQvYmxvYi81N2E5ODM1YWE4ZjYzNmI2ZDIzMWJhMmM0MDA4YmZlODljYmYwOGJhL3RzL2NsaWVudC9zcmMvY2xpZW50LnRzI0w0NTUyXG4gICAgZXhwb3J0IGNvbnN0IGVzdGltYXRlUHJpb3JpdHlGZWUgPSBhc3luYyAoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICApOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgY29uc3Qgd3JpdGFibGVBY2NvdW50cyA9IGluc3RydWN0aW9uc1xuICAgICAgICAubWFwKChpbnN0KSA9PlxuICAgICAgICAgIGluc3Qua2V5c1xuICAgICAgICAgICAgLmZpbHRlcigoYWNjb3VudCkgPT4gYWNjb3VudC5pc1dyaXRhYmxlKVxuICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBrZXkucHVia2V5KSxcbiAgICAgICAgKVxuICAgICAgICAuZmxhdCgpO1xuXG4gICAgICBjb25zdCB1bmlxV3JpdGFibGVBY2NvdW50cyA9IFtcbiAgICAgICAgLi4ubmV3IFNldCh3cml0YWJsZUFjY291bnRzLm1hcCgoYWNjb3VudCkgPT4gYWNjb3VudC50b0Jhc2U1OCgpKSksXG4gICAgICBdXG4gICAgICAgIC5tYXAoKGFjY291bnQpID0+IGFjY291bnQudG9QdWJsaWNLZXkoKSlcbiAgICAgICAgLnNsaWNlKDAsIE1BWF9SRUNFTlRfUFJJT1JJVFlfRkVFX0FDQ09VTlRTKTtcblxuICAgICAgY29uc3QgcHJpb3JpdHlGZWVzID1cbiAgICAgICAgYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0UmVjZW50UHJpb3JpdGl6YXRpb25GZWVzKHtcbiAgICAgICAgICBsb2NrZWRXcml0YWJsZUFjY291bnRzOiB1bmlxV3JpdGFibGVBY2NvdW50cyxcbiAgICAgICAgfSk7XG5cbiAgICAgIGlmIChwcmlvcml0eUZlZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICBkZWJ1Z0xvZygnIyBnZXQgcmVjZW50IHByaW9yaXR5IGZlZXM6ICcsIHByaW9yaXR5RmVlcyk7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBncm91cEJ5U2xvdCA9IHByaW9yaXR5RmVlcy5yZWR1Y2UoXG4gICAgICAgIChhY2MsIGZlZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGZlZS5zbG90O1xuICAgICAgICAgIGlmICghYWNjW2tleV0pIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGFjY1trZXldLnB1c2goZmVlKTtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LFxuICAgICAgICB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBSZWNlbnRQcmlvcml0aXphdGlvbkZlZXNbXT4sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBtYXhGZWVCeVNsb3QgPSBPYmplY3Qua2V5cyhncm91cEJ5U2xvdCkucmVkdWNlKFxuICAgICAgICAoYWNjLCBzbG90KSA9PiB7XG4gICAgICAgICAgYWNjW3Nsb3RdID0gZ3JvdXBCeVNsb3Rbc2xvdF0ucmVkdWNlKChtYXgsIGZlZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZlZS5wcmlvcml0aXphdGlvbkZlZSA+IG1heC5wcmlvcml0aXphdGlvbkZlZSA/IGZlZSA6IG1heDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LFxuICAgICAgICB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBSZWNlbnRQcmlvcml0aXphdGlvbkZlZXM+LFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1heGltdW1GZWVzID0gT2JqZWN0LnZhbHVlcyhtYXhGZWVCeVNsb3QpLnNvcnQoXG4gICAgICAgIChhOiBSZWNlbnRQcmlvcml0aXphdGlvbkZlZXMsIGI6IFJlY2VudFByaW9yaXRpemF0aW9uRmVlcykgPT5cbiAgICAgICAgICBhLnNsb3QgLSBiLnNsb3QsXG4gICAgICApIGFzIFJlY2VudFByaW9yaXRpemF0aW9uRmVlc1tdO1xuXG4gICAgICAvLyBnZXQgbWVkaWFuIG9mIGxhc3QgMjAgZmVlc1xuICAgICAgY29uc3QgcmVjZW50RmVlcyA9IG1heGltdW1GZWVzLnNsaWNlKFxuICAgICAgICBNYXRoLm1heChtYXhpbXVtRmVlcy5sZW5ndGggLSAyMCwgMCksXG4gICAgICApO1xuICAgICAgY29uc3QgbWlkID0gTWF0aC5mbG9vcihyZWNlbnRGZWVzLmxlbmd0aCAvIDIpO1xuICAgICAgY29uc3QgbWVkaWFuRmVlID1cbiAgICAgICAgcmVjZW50RmVlcy5sZW5ndGggJSAyICE9PSAwXG4gICAgICAgICAgPyByZWNlbnRGZWVzW21pZF0ucHJpb3JpdGl6YXRpb25GZWVcbiAgICAgICAgICA6IChyZWNlbnRGZWVzW21pZCAtIDFdLnByaW9yaXRpemF0aW9uRmVlICtcbiAgICAgICAgICAgICAgcmVjZW50RmVlc1ttaWRdLnByaW9yaXRpemF0aW9uRmVlKSAvXG4gICAgICAgICAgICAyO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBtZWRpYW4gZmVlOiAnLCBtZWRpYW5GZWUpO1xuXG4gICAgICByZXR1cm4gTWF0aC5jZWlsKG1lZGlhbkZlZSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbXB1dGVCdWRnZXRQcm9ncmFtLFxuICBLZXlwYWlyLFxuICBQdWJsaWNLZXksXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJy4uLy4uL3N1aXRlLXV0aWxzL3NyYy9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGNvbnN0IERFRkFVTFVUX0NPTVBVVEVfVU5JVCA9IDIwMF8wMDA7XG4gIGNvbnN0IERFRkFVTFVUX1RIUkVTSE9MRF9NVUxUSVBMSUVEID0gMS4xO1xuICBjb25zdCBNSU5JTVVNX0NPTVBVVEVfVU5JVCA9IDQ1MDtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb21wdXRlVW5pdCB7XG4gICAgZXhwb3J0IGNvbnN0IGNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBwYXllcjogS2V5cGFpcixcbiAgICAgIHRocmVzaG9sZE11bHRpcGxpZWQ/OiBudW1iZXIsXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCB1bml0cyA9IGF3YWl0IHNpbXVsYXRlKGluc3RydWN0aW9ucywgcGF5ZXIsIHRocmVzaG9sZE11bHRpcGxpZWQpO1xuICAgICAgcmV0dXJuIENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0TGltaXQoe1xuICAgICAgICB1bml0cyxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3Qgc2ltdWxhdGUgPSBhc3luYyAoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHBheWVyOiBLZXlwYWlyLFxuICAgICAgdGhyZXNob2xkTXVsdGlwbGllZDogbnVtYmVyID0gREVGQVVMVVRfVEhSRVNIT0xEX01VTFRJUExJRUQsXG4gICAgKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBQdWJsaWNLZXkuZGVmYXVsdC50b1N0cmluZygpO1xuICAgICAgaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHR4LmFkZChpbnN0KSk7XG4gICAgICB0eC5mZWVQYXllciA9IHBheWVyLnB1YmxpY0tleTtcbiAgICAgIHR4LnZlcmlmeVNpZ25hdHVyZXMoZmFsc2UpO1xuXG4gICAgICBjb25zdCBzaW11bGF0aW9uID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuc2ltdWxhdGVUcmFuc2FjdGlvbih0eCk7XG4gICAgICBjb25zdCB1bml0cyA9IHNpbXVsYXRpb24udmFsdWUudW5pdHNDb25zdW1lZCB8fCBERUZBVUxVVF9DT01QVVRFX1VOSVQ7XG4gICAgICBkZWJ1Z0xvZygnIyBnZXQgc2ltdWxhdGUgdHJhbnNhY3Rpb246ICcsIHVuaXRzKTtcbiAgICAgIGxldCBjdSA9IDA7XG4gICAgICBpZiAodW5pdHMgPT09IDApIHtcbiAgICAgICAgY3UgPSBERUZBVUxVVF9DT01QVVRFX1VOSVQ7XG4gICAgICB9IGVsc2UgaWYgKHVuaXRzIDwgTUlOSU1VTV9DT01QVVRFX1VOSVQpIHtcbiAgICAgICAgLy8gb25seSBzb2wgdHJhbnNmZXJcbiAgICAgICAgY3UgPSBNSU5JTVVNX0NPTVBVVEVfVU5JVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1ID0gTWF0aC50cnVuYyh1bml0cyAqIHRocmVzaG9sZE11bHRpcGxpZWQpO1xuICAgICAgfVxuICAgICAgZGVidWdMb2coJyMgc2ltdWxhdGUgY3U6ICcsIGN1KTtcbiAgICAgIHJldHVybiBjdTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQW55T2JqZWN0IH0gZnJvbSAnfi90eXBlcy91dGlscyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogY29udmVydCBidWZmZXIgdG8gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gKiBAcmV0dXJucyBudW1iZXJbXVxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9BcnJheSA9IChidWZmZXI6IEJ1ZmZlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgbnVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGJ5dGUgb2YgYnVmZmVyKSB7XG4gICAgbnVtcy5wdXNoKGJ1ZmZlcltieXRlXSk7XG4gIH1cbiAgcmV0dXJuIG51bXM7XG59O1xuXG4vKipcbiAqIE92ZXJ3cml0ZSBKUyBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9iamVjdFxuICogQHBhcmFtIHtPdmVyd3JpdGVPYmplY3RbXX0gdGFyZ2V0c1xuICogQHJldHVybnMgT2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGVPYmplY3QgPSAoXG4gIG9iamVjdDogdW5rbm93bixcbiAgdGFyZ2V0czoge1xuICAgIGV4aXN0c0tleTogc3RyaW5nO1xuICAgIHdpbGw6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiB1bmtub3duIH07XG4gIH1bXSxcbik6IHVua25vd24gPT4ge1xuICBjb25zdCB0aGF0OiBBbnlPYmplY3QgPSBvYmplY3QgYXMgQW55T2JqZWN0O1xuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGRlbGV0ZSB0aGF0W3RhcmdldC5leGlzdHNLZXldO1xuICAgIHRoYXRbdGFyZ2V0LndpbGwua2V5XSA9IHRhcmdldC53aWxsLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXkgbG9nIGZvciBzb2xhbmEtc3VpdGUtY29uZmlnLmpzXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMVxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhM1xuICogQHBhcmFtIHt1bmtub3dufSBkYXRhNFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAoXG4gIGRhdGExOiB1bmtub3duLFxuICBkYXRhMjogdW5rbm93biA9ICcnLFxuICBkYXRhMzogdW5rbm93biA9ICcnLFxuICBkYXRhNDogdW5rbm93biA9ICcnLFxuKTogdm9pZCA9PiB7XG4gIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgY29uc29sZS5sb2coJ1tERUJVR10nLCBkYXRhMSwgZGF0YTIsIGRhdGEzLCBkYXRhNCk7XG4gIH1cbn07XG5cbi8qKlxuICogc2xlZXAgdGltZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjXG4gKiBAcmV0dXJucyBQcm9taXNlPG51bWJlcj5cbiAqL1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gYXN5bmMgKHNlYzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIHNlYyAqIDEwMDApKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbFxuICApO1xufTtcblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgcmV0dXJuIChcbiAgICAhIW9iaiAmJlxuICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgIHR5cGVvZiAob2JqIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufTtcblxuLyoqXG4gKiBUcnkgYXN5bmMgbW9uYWRcbiAqXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxULCBFPj5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBhc3luY2Jsb2NrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZXN1bHQ8VCwgRT4+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KGJsb2NrOiAoKSA9PiBUKTogUmVzdWx0PFQsIEU+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBpbnB1dDogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFJlc3VsdDxULCBFcnJvcj4gfCBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gaW5wdXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHYpKSB7XG4gICAgICByZXR1cm4gdi50aGVuKFxuICAgICAgICAoeDogVCkgPT4gUmVzdWx0Lm9rKHgpLFxuICAgICAgICAoZXJyOiBFKSA9PiBSZXN1bHQuZXJyKGVyciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHYpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlIGFzIHN0cmluZykpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChmaW5hbGx5SW5wdXQpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmFsbHkgaW5wdXQ6JywgZmluYWxseUlucHV0KTtcbiAgICAgIGZpbmFsbHlJbnB1dCgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcnx1bmRlZmluZWR9IGNyZWF0ZWRfYXRcbiAqIEByZXR1cm5zIERhdGUgfCB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lID0gKFxuICBjcmVhdGVkX2F0OiBudW1iZXIgfCB1bmRlZmluZWQsXG4pOiBEYXRlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGNyZWF0ZWRfYXQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoY3JlYXRlZF9hdCAqIDEwMDApO1xuICB9XG4gIHJldHVybjtcbn07XG5cbi8qKlxuICogR2V0IHVuaXggdGltZXN0YW1wXG4gKlxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCB1bml4VGltZXN0YW1wID0gKCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBTZW5kVHJhbnNhY3Rpb25FcnJvcixcbiAgVHJhbnNhY3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZVVuaXQgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSZXRyeSB7XG4gICAgY29uc3QgUkVUUllfTVVMVElQTElFRCA9IDEuNjtcbiAgICBleHBvcnQgY29uc3QgaXNDb21wdXRlQnVkZ2V0RXJyb3IgPSAoXG4gICAgICBlcnJvcjogdW5rbm93bixcbiAgICApOiBlcnJvciBpcyBTZW5kVHJhbnNhY3Rpb25FcnJvciA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnb2JqZWN0JyAmJiBlcnJvciBpbnN0YW5jZW9mIFNlbmRUcmFuc2FjdGlvbkVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvci5sb2dzPy5zb21lKChpdGVtKSA9PiBpdGVtLmluY2x1ZGVzKCdDb21wdXRlQnVkZ2V0JykpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgIGZpbmFsU2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zLFxuICAgICkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgUmV0cnkgdGhlIFRyYW5zYWN0aW9uIGR1ZSB0byBhIGNvbXB1dGUgYnVkZ2V0IGVycm9yJyk7XG4gICAgICB0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnNbMF0gPVxuICAgICAgICBhd2FpdCBDb21wdXRlVW5pdC5Db21wdXRlVW5pdC5jcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICB0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgZmluYWxTaWduZXJzWzBdLFxuICAgICAgICAgIFJFVFJZX01VTFRJUExJRUQsXG4gICAgICAgICk7XG5cbiAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICApO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3Qgc3VibWl0Rm9yUGFydGlhbFNpZ24gPSBhc3luYyAoXG4gICAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgICBmaW5hbFNpZ25lcjogS2V5cGFpcixcbiAgICAgIGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyxcbiAgICApID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIFJldHJ5IHRoZSBUcmFuc2FjdGlvbiBkdWUgdG8gYSBjb21wdXRlIGJ1ZGdldCBlcnJvcicpO1xuICAgICAgdHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zWzBdID1cbiAgICAgICAgYXdhaXQgQ29tcHV0ZVVuaXQuQ29tcHV0ZVVuaXQuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgdHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgIGZpbmFsU2lnbmVyLFxuICAgICAgICAgIFJFVFJZX01VTFRJUExJRUQsXG4gICAgICAgICk7XG4gICAgICB0cmFuc2FjdGlvbi5wYXJ0aWFsU2lnbihmaW5hbFNpZ25lcik7XG4gICAgICBjb25zdCB3aXJlVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbi5zZXJpYWxpemUoKTtcbiAgICAgIHJldHVybiBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5zZW5kUmF3VHJhbnNhY3Rpb24oXG4gICAgICAgIHdpcmVUcmFuc2FjdGlvbixcbiAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgS2V5cGFpcixcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSwgU3VibWl0T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZVVuaXQgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUmV0cnkgfSBmcm9tICcuL3JldHJ5JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQ29tbW9uPFQgPSB1bmRlZmluZWQ+IGltcGxlbWVudHMgQ29tbW9uU3RydWN0dXJlPFQ+IHtcbiAgICBzdGF0aWMgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyPzogS2V5cGFpcjtcbiAgICBkYXRhPzogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgICBkYXRhPzogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tbW9uKSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgICAgYXdhaXQgUHJpb3JpdHlGZWUuUHJpb3JpdHlGZWUuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgICBvcHRpb25zLmFkZFNvbFByaW9yaXR5RmVlLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgIGF3YWl0IENvbXB1dGVVbml0LkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBDb25zdGFudHMuTUFYX1RSQU5TQUNUSU9OX1JFVFJJRVMsXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoUmV0cnkuUmV0cnkuaXNDb21wdXRlQnVkZ2V0RXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgUmV0cnkuUmV0cnkuc3VibWl0KFxuICAgICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbXB1dGVVbml0IH0gZnJvbSAnLi9jb21wdXRlLXVuaXQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFByaW9yaXR5RmVlIH0gZnJvbSAnLi9wcmlvcml0eS1mZWUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFJldHJ5IH0gZnJvbSAnLi9yZXRyeSc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlLCBTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIE1pbnQ8VCA9IFB1YmtleT4gaW1wbGVtZW50cyBNaW50U3RydWN0dXJlPFQ+IHtcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI6IEtleXBhaXI7XG4gICAgZGF0YTogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICAgIGRhdGE6IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1pbnQpKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgTWludEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBDaGFuZ2UgbWV0YXBsZXggY2x1c3RlciBvbiBtYWlubmV0LWJldGEnKTtcbiAgICAgICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyOiBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgICAgYXdhaXQgUHJpb3JpdHlGZWUuUHJpb3JpdHlGZWUuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgICBvcHRpb25zLmFkZFNvbFByaW9yaXR5RmVlLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgIGF3YWl0IENvbXB1dGVVbml0LkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBDb25zdGFudHMuTUFYX1RSQU5TQUNUSU9OX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChSZXRyeS5SZXRyeS5pc0NvbXB1dGVCdWRnZXRFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBSZXRyeS5SZXRyeS5zdWJtaXQoXG4gICAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQge1xuICBQYXJ0aWFsU2lnblN0cnVjdHVyZSxcbiAgU3VibWl0T3B0aW9ucyxcbn0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBSZXRyeSB9IGZyb20gJy4vcmV0cnknO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBQYXJ0aWFsU2lnbiBpbXBsZW1lbnRzIFBhcnRpYWxTaWduU3RydWN0dXJlIHtcbiAgICBoZXhJbnN0cnVjdGlvbjogc3RyaW5nO1xuICAgIGRhdGE/OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihpbnN0cnVjdGlvbnM6IHN0cmluZywgbWludD86IFB1YmtleSkge1xuICAgICAgdGhpcy5oZXhJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGFydGlhbFNpZ24pKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0aW9ucy5mZWVQYXllcikge1xuICAgICAgICAgIHRocm93IEVycm9yKCdOZWVkIGZlZVBheWVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWNvZGUgPSBCdWZmZXIuZnJvbSh0aGlzLmhleEluc3RydWN0aW9uLCAnaGV4Jyk7XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gVHJhbnNhY3Rpb24uZnJvbShkZWNvZGUpO1xuICAgICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogQ29uc3RhbnRzLk1BWF9UUkFOU0FDVElPTl9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24ucGFydGlhbFNpZ24ob3B0aW9ucy5mZWVQYXllci50b0tleXBhaXIoKSk7XG4gICAgICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb24uc2VyaWFsaXplKCk7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICAgIHdpcmVUcmFuc2FjdGlvbixcbiAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKFJldHJ5LlJldHJ5LmlzQ29tcHV0ZUJ1ZGdldEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFJldHJ5LlJldHJ5LnN1Ym1pdEZvclBhcnRpYWxTaWduKFxuICAgICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgb3B0aW9ucy5mZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSwgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG4vLyBAaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgY29uc3QgTE9XX1ZBTFVFID0gMTI3OyAvLyAweDdmXG4gIGNvbnN0IEhJR0hfVkFMVUUgPSAxNjM4MzsgLy8gMHgzZmZmXG4gIGNvbnN0IE1BWF9UUkFOU0FDVElPTl9TSVpFID0gMTIzMjtcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgaGVhZGVyIHNpemVcbiAgICogQHBhcmFtIG4gZWxlbWVudHMgaW4gdGhlIGNvbXBhY3QgYXJyYXlcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiBhcnJheSBoZWFkZXJcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RIZWFkZXIgPSAobjogbnVtYmVyKSA9PlxuICAgIG4gPD0gTE9XX1ZBTFVFID8gMSA6IG4gPD0gSElHSF9WQUxVRSA/IDIgOiAzO1xuXG4gIC8qKlxuICAgKiBDb21wYWN0IHUxNiBhcnJheSBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEBwYXJhbSBzaXplIGJ5dGVzIHBlciBlYWNoIGVsZW1lbnRcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiBhcnJheVxuICAgKi9cbiAgY29uc3QgY29tcGFjdEFycmF5U2l6ZSA9IChuOiBudW1iZXIsIHNpemU6IG51bWJlcikgPT5cbiAgICBjb21wYWN0SGVhZGVyKG4pICsgbiAqIHNpemU7XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0eHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVUeFNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgZmVlUGF5ZXJQayA9IFtmZWVQYXllci50b0Jhc2U1OCgpXTtcblxuICAgIGNvbnN0IHNpZ25lcnMgPSBuZXcgU2V0PHN0cmluZz4oZmVlUGF5ZXJQayk7XG4gICAgY29uc3QgYWNjb3VudHMgPSBuZXcgU2V0PHN0cmluZz4oZmVlUGF5ZXJQayk7XG5cbiAgICBjb25zdCBpeHNTaXplID0gdHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLnJlZHVjZSgoYWNjLCBpeCkgPT4ge1xuICAgICAgaXgua2V5cy5mb3JFYWNoKCh7IHB1YmtleSwgaXNTaWduZXIgfSkgPT4ge1xuICAgICAgICBjb25zdCBwayA9IHB1YmtleS50b0Jhc2U1OCgpO1xuICAgICAgICBpZiAoaXNTaWduZXIpIHNpZ25lcnMuYWRkKHBrKTtcbiAgICAgICAgYWNjb3VudHMuYWRkKHBrKTtcbiAgICAgIH0pO1xuXG4gICAgICBhY2NvdW50cy5hZGQoaXgucHJvZ3JhbUlkLnRvQmFzZTU4KCkpO1xuXG4gICAgICBjb25zdCBuSW5kZXhlcyA9IGl4LmtleXMubGVuZ3RoO1xuICAgICAgY29uc3Qgb3BhcXVlRGF0YSA9IGl4LmRhdGEubGVuZ3RoO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICBhY2MgK1xuICAgICAgICAxICsgLy8gUElEIGluZGV4XG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUobkluZGV4ZXMsIDEpICtcbiAgICAgICAgY29tcGFjdEFycmF5U2l6ZShvcGFxdWVEYXRhLCAxKVxuICAgICAgKTtcbiAgICB9LCAwKTtcblxuICAgIHJldHVybiAoXG4gICAgICBjb21wYWN0QXJyYXlTaXplKHNpZ25lcnMuc2l6ZSwgNjQpICsgLy8gc2lnbmF0dXJlc1xuICAgICAgMyArIC8vIGhlYWRlclxuICAgICAgY29tcGFjdEFycmF5U2l6ZShhY2NvdW50cy5zaXplLCAzMikgKyAvLyBhY2NvdW50c1xuICAgICAgMzIgKyAvLyBibG9ja2hhc2hcbiAgICAgIGNvbXBhY3RIZWFkZXIodHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLmxlbmd0aCkgKyAvLyBpbnN0cnVjdGlvbnNcbiAgICAgIGl4c1NpemVcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBtYXggdHJhbnNhY3Rpb24gc2l6ZVxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gYSBzb2xhbmEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIGZlZVBheWVyIHRoZSBwdWJsaWNLZXkgb2YgdGhlIHNpZ25lclxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGlzT3ZlclRyYW5zYWN0aW9uU2l6ZSA9IChcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGNhbGN1bGF0ZVR4U2l6ZSh0cmFuc2FjdGlvbiwgZmVlUGF5ZXIpID4gTUFYX1RSQU5TQUNUSU9OX1NJWkU7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tbW9uIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbXB1dGUgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUGFydGlhbFNpZ24gfSBmcm9tICcuL3BhcnRpYWwtc2lnbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ2FsY3VsYXRlVHhzaXplIH0gZnJvbSAnLi9jYWxjdWxhdGUtdHhzaXplJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBSZXRyeSB9IGZyb20gJy4vcmV0cnknO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uQnVpbGRlciA9IHtcbiAgLi4uQmF0Y2gsXG4gIC4uLkNhbGN1bGF0ZVR4c2l6ZSxcbiAgLi4uQ29tbW9uLFxuICAuLi5Db21wdXRlLFxuICAuLi5NaW50LFxuICAuLi5QYXJ0aWFsU2lnbixcbiAgLi4uUHJpb3JpdHlGZWUsXG4gIC4uLlJldHJ5LFxufTtcbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBDb21tb25TdHJ1Y3R1cmUsXG4gIE1pbnRTdHJ1Y3R1cmUsXG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxuICBTdWJtaXRPcHRpb25zLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICcuJztcblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuXG4gIHVud3JhcCgpOiBUO1xuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFU7XG4gIHVud3JhcDxVLCBWPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVik6IFUgfCBWO1xuICAvLyB1bmlmaWVkLXNpZ25hdHVyZXMuIGludG8gbGluZSAxMFxuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFUpOiBVO1xuICB1bndyYXAob2s/OiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gdW5rbm93bik6IHVua25vd24ge1xuICAgIGNvbnN0IHIgPSB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rID8gb2sodmFsdWUpIDogdmFsdWUpLFxuICAgICAgKGVycm9yKSA9PiAoZXJyID8gUmVzdWx0Lm9rKGVycihlcnJvcikpIDogUmVzdWx0LmVycihlcnJvcikpLFxuICAgICk7XG4gICAgaWYgKHIuaXNFcnIpIHtcbiAgICAgIHRocm93IHIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByLnZhbHVlO1xuICB9XG5cbiAgLy8vLyBtYXAgLy8vL1xuICBtYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFJlc3VsdDxVLCBFPjtcbiAgbWFwPFUsIEYgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gVSxcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gRixcbiAgKTogUmVzdWx0PFUsIEY+O1xuICBtYXAob2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiBFcnJvcik6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIgPyBlcnIoZXJyb3IpIDogZXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8vIGNoYWluIC8vLy9cbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc2luZ2xlIFRyYW5zYWN0aW9uQnVpbGRlciAvLy8vXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgYXN5bmMgc3VibWl0KFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4ge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMubWFwKFxuICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgIC8vIHBhcmFtZXRlcjogcGFydGlhbFNpZ24gaGV4SW5zdHJ1Y3R1cmVcbiAgICAgICAgY29uc3QgaGV4UmVnZXggPSAvXlswLTlhLWZBLUZdKyQvO1xuICAgICAgICBpZiAodHlwZW9mIG9rID09PSAnc3RyaW5nJyAmJiBoZXhSZWdleC50ZXN0KG9rKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLlBhcnRpYWxTaWduKG9rKS5zdWJtaXQob3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgb2JqID0gb2sgYXNcbiAgICAgICAgICAgIHwgQ29tbW9uU3RydWN0dXJlXG4gICAgICAgICAgICB8IE1pbnRTdHJ1Y3R1cmVcbiAgICAgICAgICAgIHwgUGFydGlhbFNpZ25TdHJ1Y3R1cmU7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IG9iai5zdWJtaXQob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIocmVzLmVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy52YWx1ZTtcbiAgfVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBpbnRlcmZhY2UgQXJyYXk8VD4ge1xuICAgIHN1Ym1pdChcbiAgICAgIG9wdGlvbnM/OiBQYXJ0aWFsPFN1Ym1pdE9wdGlvbnM+LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+O1xuICB9XG59XG5cbi8vIFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaFxuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uIChvcHRpb25zOiBQYXJ0aWFsPFN1Ym1pdE9wdGlvbnM+ID0ge30pIHtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBDb21tb25TdHJ1Y3R1cmUgfCBNaW50U3RydWN0dXJlW10gPSBbXTtcbiAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoJ09ubHkgQXJyYXkgSW5zdHJ1Y3Rpb24gb2JqZWN0JykpO1xuICAgIH1cbiAgfVxuICBjb25zdCBiYXRjaE9wdGlvbnMgPSB7XG4gICAgZmVlUGF5ZXI6IG9wdGlvbnMuZmVlUGF5ZXIsXG4gICAgaXNQcmlvcml0eUZlZTogb3B0aW9ucy5pc1ByaW9yaXR5RmVlLFxuICAgIGluc3RydWN0aW9uczogaW5zdHJ1Y3Rpb25zLFxuICB9O1xuICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggc3VibWl0KCknKTtcbiAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbkJ1aWxkZXIuQmF0Y2goKS5zdWJtaXQoYmF0Y2hPcHRpb25zKTtcbn07XG5cbmNsYXNzIEludGVybmFsT2s8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IHRydWU7XG4gIHJlYWRvbmx5IGlzRXJyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHZhbHVlOiBUKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIF9lcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBJbnRlcm5hbEVycjxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gZmFsc2U7XG4gIHJlYWRvbmx5IGlzRXJyID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgZXJyb3I6IEUpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIF9vazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVzdWx0IHtcbiAgZXhwb3J0IHR5cGUgT2s8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsT2s8VCwgRT47XG4gIGV4cG9ydCB0eXBlIEVycjxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxFcnI8VCwgRT47XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4odmFsdWU6IFQpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxPayh2YWx1ZSk7XG4gIH1cbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I/OiBFKTogUmVzdWx0PFQsIEU+O1xuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcjogRSk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbEVycihlcnJvciB8fCBFcnJvcigpKTtcbiAgfVxuXG4gIHR5cGUgVSA9IFJlc3VsdDx1bmtub3duPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICAgIFIxNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0LCBSMTVdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgICBPa1R5cGU8UjE1PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICAgIHwgUjE1XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICBSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMSB8IFIxMiB8IFIxM1xuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTJdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjhdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjg+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjddLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjc+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjVdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND4sIE9rVHlwZTxSNT5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQ+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVSwgUjMgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSM10sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+XSwgRXJyVHlwZTxSMCB8IFIxIHwgUjI+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+XSwgRXJyVHlwZTxSMCB8IFIxPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMF0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPl0sIEVyclR5cGU8UjA+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IFtdKTogUmVzdWx0PFtdPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxUIGV4dGVuZHMgVVtdIHwgUmVjb3JkPHN0cmluZywgVT4+KFxuICAgIG9iajogVCxcbiAgKTogUmVzdWx0PFxuICAgIHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgST4gPyBJIDogbmV2ZXIgfSxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPiA/IEUgOiBuZXZlcjtcbiAgICB9W2tleW9mIFRdXG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgY29uc3QgcmVzQXJyID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqKSB7XG4gICAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gYXMgdW5rbm93bjtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZXN1bHQub2socmVzQXJyKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPik7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3QgaXRlbSA9IChvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pW2tleV07XG4gICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICAgIHJlc1trZXldID0gaXRlbS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5vayhyZXMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3IgPSBFcnJvcj4gPVxuICB8IFJlc3VsdC5PazxULCBFPlxuICB8IFJlc3VsdC5FcnI8VCwgRT47XG5cbnR5cGUgT2tUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDxpbmZlciBPPiA/IE8gOiBuZXZlcjtcbnR5cGUgRXJyVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT5cbiAgPyBFXG4gIDogbmV2ZXI7XG4iLCAiaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBDb21taXRtZW50LCBDb25uZWN0aW9uLCBGaW5hbGl0eSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTm9kZSB7XG4gIGNvbnN0IHNldHRlZCA9IHtcbiAgICBjbHVzdGVyVXJsOiAnJyxcbiAgICBjb21taXRtZW50OiBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgICBjdXN0b21DbHVzdGVyVXJsOiBbXSBhcyBzdHJpbmdbXSxcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvbiA9ICgpOiBDb25uZWN0aW9uID0+IHtcbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbihzZXR0ZWQuY2x1c3RlclVybCwgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjaGFuZ2VDb25uZWN0aW9uID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjb21taXRtZW50PzogRmluYWxpdHk7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQW1CLGlCQUFpQjtBQUNwQyxPQUFPLHNCQUFzQjtBQUV0QixJQUFJLFNBQVM7QUFFYixJQUFVO0FBQUEsQ0FBVixDQUFVQSxlQUFWO0FBQ0UsTUFBVTtBQUFWLElBQVVDLHFCQUFWO0FBQ0UsSUFBTUEsaUJBQUEsc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzVCLElBQU1BLGlCQUFBLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVJaLGtCQUFBRCxXQUFBLG9CQUFBQSxXQUFBO0FBQUEsR0FERjtBQUFBLENBbUJWLENBQVVBLGVBQVY7QUFDRSxFQUFNQSxXQUFBLGlCQUFpQixPQUFPLFFBQVE7QUFDdEMsRUFBTUEsV0FBQSxtQkFBbUIsT0FBTyxRQUFRO0FBQ3hDLEVBQU1BLFdBQUEsY0FBYyxPQUFPO0FBQzNCLEVBQU1BLFdBQUEsa0JBQWtCLE9BQU87QUFFL0IsTUFBSztBQUFMLElBQUtFLGFBQUw7QUFDTCxJQUFBQSxTQUFBLFNBQU07QUFDTixJQUFBQSxTQUFBLGlCQUFjO0FBQ2QsSUFBQUEsU0FBQSxTQUFNO0FBQ04sSUFBQUEs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QUFBQSxJQUNoQztBQUVBLFdBQU8sSUFBSSxXQUFXLE9BQU8sWUFBWSxPQUFPLFVBQVU7QUFBQSxFQUM1RDtBQUVPLEVBQU1BLE1BQUEsbUJBQW1CLENBQUMsVUFJckI7QUFFVixXQUFPLGFBQWE7QUFDcEIsV0FBTyxtQkFBbUIsQ0FBQztBQUMzQixXQUFPLGFBQWEsVUFBVTtBQUU5QixVQUFNLEVBQUUsU0FBUyxZQUFZLGlCQUFpQixJQUFJO0FBQ2xELFFBQUksWUFBWTtBQUNkLGFBQU8sYUFBYTtBQUNwQixlQUFTLDhCQUE4QixPQUFPLFVBQVU7QUFBQSxJQUMxRDtBQUVBLFFBQUksU0FBUztBQUNYLGFBQU8sYUFBYSxVQUFVLGNBQWMsRUFBRSxRQUFpQixDQUFDO0FBQ2hFLGVBQVMsOEJBQThCLE9BQU8sVUFBVTtBQUFBLElBQzFEO0FBRUEsUUFBSSxrQkFBa0I7QUFDcEIsZUFBUyx3QkFBd0IsZ0JBQWdCO0FBQ2pELGFBQU8sYUFBYSxVQUFVLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztBQUNoRSxhQUFPLG1CQUFtQjtBQUMxQjtBQUFBLFFBQ0U7QUFBQSxRQUNBLE9BQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFTyxFQUFNQSxNQUFBLGVBQWUsT0FDMUIsV0FDQSxhQUF5QixVQUFVLGVBQ2hDO0FBQ0gsVUFBTSxhQUFhQSxNQUFLLGNBQWM7QUFDdEMsVUFBTSxrQkFBa0IsTUFBTSxXQUFXLG1CQUFtQjtBQUM1RCxXQUFPLE1BQU0sV0FDVjtBQUFBLE1BQ0M7QUFBQSxRQUNFLFdBQVcsZ0JBQWdCO0FBQUEsUUFDM0Isc0JBQXNCLGdCQUFnQjtBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNGLEVBQ0MsS0FBSyxPQUFPLEVBQUUsRUFDZCxNQUFNLE9BQU8sR0FBRztBQUFBLEVBQ3JCO0FBQUEsR0FqRmU7IiwKICAibmFtZXMiOiBbIkNvbnN0YW50cyIsICJXYXJubmluZ01lc3NhZ2UiLCAiQ2x1c3RlciIsICJFbmRQb2ludFVybCIsICJCdW5kbHJVcmwiLCAiRGFzQXBpVXJsIiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAiUHVibGljS2V5IiwgIkFjY291bnQiLCAiQXNzb2NpYXRlZCIsICJQdWJsaWNLZXkiLCAiQWNjb3VudCIsICJLZXlwYWlyIiwgIlB1YmxpY0tleSIsICJBY2NvdW50IiwgIlBkYSIsICJBY2NvdW50IiwgImJzIiwgIkFjY291bnQiLCAiUHVibGljS2V5IiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiQ29tcHV0ZUJ1ZGdldFByb2dyYW0iLCAiUHVibGljS2V5IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJDb21wdXRlVW5pdCIsICJQdWJsaWNLZXkiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlByaW9yaXR5RmVlIiwgIkNvbXB1dGVCdWRnZXRQcm9ncmFtIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZXRyeSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb24iLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbiIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlJlc3VsdCIsICJOb2RlIl0KfQo=