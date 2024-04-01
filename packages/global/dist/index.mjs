// src/index.ts
import { Keypair as Keypair6, LAMPORTS_PER_SOL, PublicKey as PublicKey5 } from "@solana/web3.js";

// ../suite-utils/src/constants.ts
import { PublicKey } from "@solana/web3.js";
import SolanaJsonConfig from "@solana-suite/config/load";
var Config = SolanaJsonConfig;
var Constants;
((Constants2) => {
  let WarnningMessage;
  ((WarnningMessage2) => {
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
  })(WarnningMessage = Constants2.WarnningMessage || (Constants2.WarnningMessage = {}));
})(Constants || (Constants = {}));
((Constants2) => {
  Constants2.currentCluster = Config.cluster.type;
  Constants2.customClusterUrl = Config.cluster.customClusterUrl;
  Constants2.isDebugging = Config.debugging;
  Constants2.customNftStorageApiKey = Config.nftStorageApiKey;
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
  let NftstorageApiKey;
  ((NftstorageApiKey2) => {
    NftstorageApiKey2["prd"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
    NftstorageApiKey2["dev"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE" /* prd */;
  })(NftstorageApiKey = Constants2.NftstorageApiKey || (Constants2.NftstorageApiKey = {}));
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
  Constants2.switchNftStorage = (env) => {
    if (Constants2.customNftStorageApiKey) {
      return Constants2.customNftStorageApiKey;
    }
    switch (env) {
      case "mainnet-beta" /* prd */:
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE" /* prd */;
      default: {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE" /* dev */;
      }
    }
  };
  Constants2.loadConfig = async () => {
    Config = await import("@solana-suite/config/load");
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
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction2,
  Transaction as Transaction3
} from "@solana/web3.js";

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

// ../transaction-builder/src/priority-fee.ts
import {
  ComputeBudgetProgram as ComputeBudgetProgram2
} from "@solana/web3.js";

// ../transaction-builder/src/compute-unit.ts
import {
  ComputeBudgetProgram,
  PublicKey as PublicKey2,
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
      tx.recentBlockhash = PublicKey2.default.toString();
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
        console.log("#### this: ", this);
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
import { Keypair as Original, PublicKey as PublicKey3 } from "@solana/web3.js";
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
      return new PublicKey3(this.pubkey);
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
import { PublicKey as PublicKey4 } from "@solana/web3.js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { PROGRAM_ADDRESS as MPL_BUBBLEGUM_PROGRAM_ID } from "mpl-bubblegum-instructions";
import BN from "bn.js";
var Account3;
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
})(Account3 || (Account3 = {}));

// ../account/src/index.ts
var Account4 = {
  ...Account,
  ...Account2,
  ...Account3
};

// src/index.ts
import { BigNumber } from "bignumber.js";
import bs2 from "bs58";
String.prototype.toExplorerUrl = function(explorer = "solscan" /* Solscan */, options = {}) {
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
  return new PublicKey5(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account4.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs2.decode(this.toString());
  return Keypair6.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return BigNumber(this).div(LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return BigNumber(this).times(LAMPORTS_PER_SOL).toNumber();
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvYmF0Y2gudHMiLCAiLi4vLi4vbm9kZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvcHJpb3JpdHktZmVlLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbXB1dGUtdW5pdC50cyIsICIuLi8uLi9zdWl0ZS11dGlscy9zcmMvc2hhcmVkLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3JldHJ5LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NvbW1vbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL3BhcnRpYWwtc2lnbi50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1idWlsZGVyL3NyYy9jYWxjdWxhdGUtdHhzaXplLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9yZXN1bHQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvYXNzb2NpYXRlZC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9rZXlwYWlyLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL3BkYS50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgS2V5cGFpciwgTEFNUE9SVFNfUEVSX1NPTCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbmZpZywgQ29uc3RhbnRzLCBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIsIEV4cGxvcmVyT3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuLyoqXG4gKiBDcmVhdGUgZXhwbG9yZXIgdXJsIGZvciBhY2NvdW50IGFkZHJlc3Mgb3Igc2lnbmF0dXJlXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9FeHBsb3JlclVybCA9IGZ1bmN0aW9uIChcbiAgZXhwbG9yZXI6IEV4cGxvcmVyID0gRXhwbG9yZXIuU29sc2NhbixcbiAgb3B0aW9uczogUGFydGlhbDxFeHBsb3Jlck9wdGlvbnM+ID0ge30sXG4pIHtcbiAgbGV0IGNsdXN0ZXIgPSBDb25maWcuY2x1c3Rlci50eXBlO1xuICBkZWJ1Z0xvZygnIyBjbHVzdGVyVHlwZTonLCBjbHVzdGVyKTtcbiAgaWYgKGNsdXN0ZXIgIT09IENvbnN0YW50cy5DbHVzdGVyLnByZCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH1cblxuICBjb25zdCBhZGRyZXNzT3JTaWduYXR1cmU6IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgbGV0IHVybCA9ICcnO1xuXG4gIGlmIChvcHRpb25zLnJlcGxhY2VQYXRoKSB7XG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGlmIChBY2NvdW50LktleXBhaXIuaXNQdWJrZXkoYWRkcmVzc09yU2lnbmF0dXJlKSkge1xuICAgIC8vIGFkZHJlc3NcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS9hZGRyZXNzLyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBzaWduYXR1cmVcbiAgICAvLyBmb3IgSW52YWxpZCB0eXBlIFwibmV2ZXJcIiBvZiBhZGRyZXNzT3JTaWduYXR1cmUsIHNvIGBhcyBzdHJpbmdgXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogUHViS2V5KEBzb2xhbmEtc3VpdGUpIHRvIFB1YmxpY0tleShAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHVibGljS2V5XG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9QdWJsaWNLZXkgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5QdWJLZXk6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMudG9TdHJpbmcoKSk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1NlY3JldCh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuU2VjcmV0OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMudG9TdHJpbmcoKSk7XG4gIHJldHVybiBLZXlwYWlyLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG59O1xuXG4vKipcbiAqIExBTVBPUlRTIHRvIFNPTFxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvU29sID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC5kaXYoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG5cbi8qKlxuICogU09MIHRvIExBTVBPUlRTXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9MYW1wb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAudGltZXMoTEFNUE9SVFNfUEVSX1NPTClcbiAgICAudG9OdW1iZXIoKTtcbn07XG4iLCAiaW1wb3J0IHsgRmluYWxpdHksIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgU29sYW5hSnNvbkNvbmZpZyBmcm9tICdAc29sYW5hLXN1aXRlL2NvbmZpZy9sb2FkJztcblxuZXhwb3J0IGxldCBDb25maWcgPSBTb2xhbmFKc29uQ29uZmlnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgV2Fybm5pbmdNZXNzYWdlIHtcbiAgICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfQVBJX0tFWSA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZUFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBDYW4gZ2V0IGFwaSBrZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgO1xuICAgIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IGBcbiAgICAgICAgW1lPVSBIQVZFIFRPIERPXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBZb3UgbmVlZCB0byB1cGRhdGUgZGFzQXBpVXJsIGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpIHVybCBmcm9tIGh0dHBzOi8vd3d3LmhlbGl1cy5kZXYvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxuICAgICAgICBgO1xuICAgIC8vIGV4cG9ydCBjb25zdCBBTk5PVU5DRSA9IGBcbiAgICAvLyAgICAgW0RFUFJFQ0FURURdXG4gICAgLy8gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gICAgIEFjY291bnQsIE5vZGUsIHRvRXhwbG9yZXIsIFB1YmtleSwgU2VjcmV0IGhhdmUgYmVlbiBtb3ZlZCB0b1xuICAgIC8vICAgICBAc29sYW5hLXN1aXRlL3V0aWxzXG4gICAgLy8gICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAgICAgYDtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIENvbnN0YW50cyB7XG4gIGV4cG9ydCBjb25zdCBjdXJyZW50Q2x1c3RlciA9IENvbmZpZy5jbHVzdGVyLnR5cGU7XG4gIGV4cG9ydCBjb25zdCBjdXN0b21DbHVzdGVyVXJsID0gQ29uZmlnLmNsdXN0ZXIuY3VzdG9tQ2x1c3RlclVybDtcbiAgZXhwb3J0IGNvbnN0IGlzRGVidWdnaW5nID0gQ29uZmlnLmRlYnVnZ2luZztcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbU5mdFN0b3JhZ2VBcGlLZXkgPSBDb25maWcubmZ0U3RvcmFnZUFwaUtleTtcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbURhc0FwaVVybCA9IENvbmZpZy5kYXNBcGlVcmw7XG5cbiAgZXhwb3J0IGVudW0gQ2x1c3RlciB7XG4gICAgcHJkID0gJ21haW5uZXQtYmV0YScsXG4gICAgcHJkTWV0YXBsZXggPSAnbWFpbm5ldC1iZXRhLW1ldGFwbGV4JyxcbiAgICBkZXYgPSAnZGV2bmV0JyxcbiAgICBsb2NhbGhvc3QgPSAnbG9jYWxob3N0LWRldm5ldCcsXG4gIH1cblxuICBleHBvcnQgZW51bSBFbmRQb2ludFVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vYXBpLm1haW5uZXQtYmV0YS5zb2xhbmEuY29tJyxcbiAgICBwcmRNZXRhcGxleCA9ICdodHRwczovL2FwaS5tZXRhcGxleC5zb2xhbmEuY29tJyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICAgIGxvY2FsaG9zdCA9ICdodHRwOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIEJ1bmRsclVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbm9kZTEuaXJ5cy54eXosaHR0cHM6Ly9ub2RlMi5pcnlzLnh5eicsXG4gICAgZGV2ID0gJ2h0dHBzOi8vZGV2bmV0LmlyeXMueHl6JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIERhc0FwaVVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vbWFpbm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTInLFxuICAgIGRldiA9ICdodHRwczovL2Rldm5ldC5oZWxpdXMtcnBjLmNvbS8/YXBpLWtleT0xNTMxOWJmNC01YjQwLTQ5NTgtYWM4ZC02MzEzYWE1NWViOTInLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gTmZ0c3RvcmFnZUFwaUtleSB7XG4gICAgcHJkID0gJ2V5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSmthV1E2WlhSb2Nqb3dlRVJHTWpjeU4yVmtPRFpoUkdVMVJUTXlaRFpEWkVKbE9EYzBZelJGTkRsRU9EWTFPV1ptT0VNaUxDSnBjM01pT2lKdVpuUXRjM1J2Y21GblpTSXNJbWxoZENJNk1UWXlNREkyTkRrME16Y3dOaXdpYm1GdFpTSTZJbVJsYlc4aWZRLmQ0SjcwbWlreFJCOGE1dndOdTZTTzVIREE4SmF1ZXVzZUFqN1FfeXRNQ0UnLFxuICAgIGRldiA9IHByZCxcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hDbHVzdGVyID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHsgY2x1c3RlcjogZW52LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcblxuICAgIC8vIGlmIHNldHRlZCBjdXN0b20gdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwgJiYgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21DbHVzdGVyVXJsW2luZGV4XTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkO1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmRNZXRhcGxleDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwubG9jYWxob3N0O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQnVuZGxyID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuQnVuZGxyVXJsLmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHN3aXRjaERhc0FwaSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSBkYXMgdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbURhc0FwaVVybCAmJiBjdXN0b21EYXNBcGlVcmwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgY3VzdG9tRGFzQXBpVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21EYXNBcGlVcmxbaW5kZXhdO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBpZiAoY3VzdG9tRGFzQXBpVXJsLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5EQVNfQVBJX1VSTCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5EYXNBcGlVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuRGFzQXBpVXJsLmRldi5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoTmZ0U3RvcmFnZSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgLy8gaWYgc2V0dGVkIGN1c3RvbSBuZnQuc3RvcmFnZSBhcGkga2V5LCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbU5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgIHJldHVybiBjdXN0b21OZnRTdG9yYWdlQXBpS2V5O1xuICAgIH1cblxuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5OZnRzdG9yYWdlQXBpS2V5LnByZDtcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5OZnRzdG9yYWdlQXBpS2V5LmRldjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGxvYWRDb25maWcgPSBhc3luYyAoKSA9PiB7XG4gICAgQ29uZmlnID0gYXdhaXQgaW1wb3J0KCdAc29sYW5hLXN1aXRlL2NvbmZpZy9sb2FkJyk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IFdSQVBQRURfVE9LRU5fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ1NvMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTInLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVNT19QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnTWVtbzFVaGtKUmZIeXZMTWNWdWNKd3hYZXVENzI4RXFWRER3UUR4Rk1ObycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRVRBUExFWF9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnbWV0YXFieHhVZXJkcTI4Y2oxUmJBV2tZUW0zeWJ6amI2YThidDUxOHgxcycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBDT01NSVRNRU5UOiBGaW5hbGl0eSA9ICdjb25maXJtZWQnO1xuICBleHBvcnQgY29uc3QgTUFYX1RSQU5TQUNUSU9OX1ZFUlNJT046IG51bWJlciA9IDA7XG4gIGV4cG9ydCBjb25zdCBNQVhfVFJBTlNBQ1RJT05fUkVUUklFUyA9IDE7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9HQVRFV0FZX1VSTCA9ICdodHRwczovL2lwZnMuaW8vaXBmcyc7XG4gIGV4cG9ydCBjb25zdCBJUllTX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vZ2F0ZXdheS5pcnlzLnh5eic7XG4gIGV4cG9ydCBjb25zdCBCVU5ETFJfTkVUV09SS19VUkwgPSBzd2l0Y2hCdW5kbHIoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBEQVNfQVBJX1VSTCA9IHN3aXRjaERhc0FwaShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPSBzd2l0Y2hOZnRTdG9yYWdlKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfU09MU0NBTl9VUkwgPSAnaHR0cHM6Ly9zb2xzY2FuLmlvJztcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTEFOQUZNX1VSTCA9ICdodHRwczovL3NvbGFuYS5mbSc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9YUkFZX1VSTCA9ICdodHRwczovL3hyYXkuaGVsaXVzLnh5eic7XG59XG5cbi8vIERpc3BsYXkgQWxsIEFubm91bmNlXG4vLyBjb25zb2xlLmxvZyhDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkFOTk9VTkNFKTtcbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQcmlvcml0eUZlZSB9IGZyb20gJy4vcHJpb3JpdHktZmVlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21wdXRlVW5pdCB9IGZyb20gJy4vY29tcHV0ZS11bml0JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBSZXRyeSB9IGZyb20gJy4vcmV0cnknO1xuaW1wb3J0IHsgQmF0Y2hTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQmF0Y2gge1xuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8QmF0Y2hTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zdHJ1Y3Rpb25zKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBvcHRpb25zLmluc3RydWN0aW9ucycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbW1vbk9yTWludEluc3QgPSBvcHRpb25zLmluc3RydWN0aW9ucztcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IGluc3Qgb2YgY29tbW9uT3JNaW50SW5zdCkge1xuICAgICAgICAgIGlmICghaW5zdC5pbnN0cnVjdGlvbnMgJiYgIWluc3Quc2lnbmVycykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgIGBvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgYmF0Y2hTdWJtaXQoKS5cbiAgICAgICAgICAgIEluZGV4OiAke2l9LCBTZXQgdmFsdWU6ICR7SlNPTi5zdHJpbmdpZnkoaW5zdCl9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGNvbW1vbk9yTWludEluc3QuZmxhdE1hcChcbiAgICAgICAgICAoaW5zdCkgPT4gaW5zdC5pbnN0cnVjdGlvbnMsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNpZ25lcnMgPSBjb21tb25Pck1pbnRJbnN0LmZsYXRNYXAoKGluc3QpID0+IGluc3Quc2lnbmVycyk7XG4gICAgICAgIGNvbnN0IGZlZVBheWVycyA9IGNvbW1vbk9yTWludEluc3QuZmlsdGVyKFxuICAgICAgICAgIChpbnN0KSA9PiBpbnN0LmZlZVBheWVyICE9PSB1bmRlZmluZWQsXG4gICAgICAgICk7XG4gICAgICAgIGxldCBmZWVQYXllciA9IHNpZ25lcnNbMF07XG4gICAgICAgIGlmIChmZWVQYXllcnMubGVuZ3RoID4gMCAmJiBmZWVQYXllcnNbMF0uZmVlUGF5ZXIpIHtcbiAgICAgICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgICBpZiAoZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IGZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlVHhzaXplLmlzTWF4VHJhbnNhY3Rpb25TaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllci5wdWJsaWNLZXkpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICBpbnN0cnVjdGlvbnMudW5zaGlmdChcbiAgICAgICAgICAgIGF3YWl0IFByaW9yaXR5RmVlLlByaW9yaXR5RmVlLmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgICBpbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICAgIG9wdGlvbnMuYWRkU29sUHJpb3JpdHlGZWUsXG4gICAgICAgICAgICAgIGZpbmFsU2lnbmVyc1swXSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgIGF3YWl0IENvbXB1dGVVbml0LkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzWzBdLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICAgIGluc3RydWN0aW9ucy5tYXAoKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgY29uc3QgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IENvbnN0YW50cy5NQVhfVFJBTlNBQ1RJT05fUkVUUklFUyxcbiAgICAgICAgfTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKFJldHJ5LlJldHJ5LmlzQ29tcHV0ZUJ1ZGdldEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFJldHJ5LlJldHJ5LnN1Ym1pdChcbiAgICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29tbWl0bWVudCwgQ29ubmVjdGlvbiwgRmluYWxpdHkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5vZGUge1xuICBjb25zdCBzZXR0ZWQgPSB7XG4gICAgY2x1c3RlclVybDogJycsXG4gICAgY29tbWl0bWVudDogQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICAgY3VzdG9tQ2x1c3RlclVybDogW10gYXMgc3RyaW5nW10sXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldENvbm5lY3Rpb24gPSAoKTogQ29ubmVjdGlvbiA9PiB7XG4gICAgaWYgKHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyIGJ5IGpzb24gY29uZmlnXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFzZXR0ZWQuY2x1c3RlclVybCkge1xuICAgICAgLy8gZGVmYXVsdCBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFzZXR0ZWQuY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IEZpbmFsaXR5O1xuICAgIGN1c3RvbUNsdXN0ZXJVcmw/OiBzdHJpbmdbXTtcbiAgfSk6IHZvaWQgPT4ge1xuICAgIC8vIGluaXRpYWxpemVcbiAgICBzZXR0ZWQuY2x1c3RlclVybCA9ICcnO1xuICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gW107XG4gICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcblxuICAgIGNvbnN0IHsgY2x1c3RlciwgY29tbWl0bWVudCwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG4gICAgaWYgKGNvbW1pdG1lbnQpIHtcbiAgICAgIHNldHRlZC5jb21taXRtZW50ID0gY29tbWl0bWVudDtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNvbW1pdG1lbnQ6ICcsIHNldHRlZC5jb21taXRtZW50KTtcbiAgICB9XG5cbiAgICBpZiAoY2x1c3Rlcikge1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7IGNsdXN0ZXI6IGNsdXN0ZXIgfSk7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjbHVzdGVyVXJsOiAnLCBzZXR0ZWQuY2x1c3RlclVybCk7XG4gICAgfVxuXG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGN1c3RvbUNsdXN0ZXJVcmw6ICcsIGN1c3RvbUNsdXN0ZXJVcmwpO1xuICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7IGN1c3RvbUNsdXN0ZXJVcmwgfSk7XG4gICAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IGN1c3RvbUNsdXN0ZXJVcmw7XG4gICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgJyMgTm9kZSBjaGFuZ2UgY2x1c3RlciwgY3VzdG9tIGNsdXN0ZXIgdXJsOiAnLFxuICAgICAgICBzZXR0ZWQuY2x1c3RlclVybCxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjb25maXJtZWRTaWcgPSBhc3luYyAoXG4gICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICAgY29tbWl0bWVudDogQ29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICApID0+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgbGF0ZXN0QmxvY2toYXNoID0gYXdhaXQgY29ubmVjdGlvbi5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICByZXR1cm4gYXdhaXQgY29ubmVjdGlvblxuICAgICAgLmNvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAge1xuICAgICAgICAgIGJsb2NraGFzaDogbGF0ZXN0QmxvY2toYXNoLmJsb2NraGFzaCxcbiAgICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogbGF0ZXN0QmxvY2toYXNoLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29tbWl0bWVudCxcbiAgICAgIClcbiAgICAgIC50aGVuKFJlc3VsdC5vaylcbiAgICAgIC5jYXRjaChSZXN1bHQuZXJyKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBDb21wdXRlQnVkZ2V0UHJvZ3JhbSxcbiAgS2V5cGFpcixcbiAgUmVjZW50UHJpb3JpdGl6YXRpb25GZWVzLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZVVuaXQgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQcmlvcml0eUZlZSB7XG4gICAgY29uc3QgTUFYX1JFQ0VOVF9QUklPUklUWV9GRUVfQUNDT1VOVFMgPSAxMjg7XG4gICAgY29uc3QgTUlDUk9fTEFNUE9SVFNfUEVSX0xBTVBPUlQgPSAxXzAwMF8wMDA7XG5cbiAgICBleHBvcnQgY29uc3QgY3JlYXRlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIGFkZFNvbFByaW9yaXR5RmVlPzogbnVtYmVyLFxuICAgICAgZmVlUGF5ZXI/OiBLZXlwYWlyLFxuICAgICkgPT4ge1xuICAgICAgbGV0IHVuaXRQcmljZSA9IDA7XG4gICAgICBpZiAoYWRkU29sUHJpb3JpdHlGZWUgJiYgZmVlUGF5ZXIpIHtcbiAgICAgICAgY29uc3QgbWljcm9MYW1wb3J0cyA9XG4gICAgICAgICAgYWRkU29sUHJpb3JpdHlGZWUudG9MYW1wb3J0cygpICogTUlDUk9fTEFNUE9SVFNfUEVSX0xBTVBPUlQ7XG4gICAgICAgIGNvbnN0IGN1ID0gYXdhaXQgQ29tcHV0ZVVuaXQuQ29tcHV0ZVVuaXQuc2ltdWxhdGUoXG4gICAgICAgICAgaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgIGZlZVBheWVyLFxuICAgICAgICApO1xuICAgICAgICB1bml0UHJpY2UgPSBNYXRoLnRydW5jKG1pY3JvTGFtcG9ydHMgLyBjdSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bml0UHJpY2UgPSBhd2FpdCBlc3RpbWF0ZVByaW9yaXR5RmVlKGluc3RydWN0aW9ucyk7XG4gICAgICB9XG4gICAgICBkZWJ1Z0xvZygnIyB1bml0IHByaWNlKG1pY3JvTGFtcG9ydHMpOiAnLCB1bml0UHJpY2UpO1xuICAgICAgcmV0dXJuIENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0UHJpY2Uoe1xuICAgICAgICBtaWNyb0xhbXBvcnRzOiB1bml0UHJpY2UsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gdGhhbmtzIGh0dHBzOi8vZ2l0aHViLmNvbS9ibG9ja3dvcmtzLWZvdW5kYXRpb24vbWFuZ28tdjQvYmxvYi81N2E5ODM1YWE4ZjYzNmI2ZDIzMWJhMmM0MDA4YmZlODljYmYwOGJhL3RzL2NsaWVudC9zcmMvY2xpZW50LnRzI0w0NTUyXG4gICAgZXhwb3J0IGNvbnN0IGVzdGltYXRlUHJpb3JpdHlGZWUgPSBhc3luYyAoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICApOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICAgICAgY29uc3Qgd3JpdGFibGVBY2NvdW50cyA9IGluc3RydWN0aW9uc1xuICAgICAgICAubWFwKChpbnN0KSA9PlxuICAgICAgICAgIGluc3Qua2V5c1xuICAgICAgICAgICAgLmZpbHRlcigoYWNjb3VudCkgPT4gYWNjb3VudC5pc1dyaXRhYmxlKVxuICAgICAgICAgICAgLm1hcCgoa2V5KSA9PiBrZXkucHVia2V5KSxcbiAgICAgICAgKVxuICAgICAgICAuZmxhdCgpO1xuXG4gICAgICBjb25zdCB1bmlxV3JpdGFibGVBY2NvdW50cyA9IFtcbiAgICAgICAgLi4ubmV3IFNldCh3cml0YWJsZUFjY291bnRzLm1hcCgoYWNjb3VudCkgPT4gYWNjb3VudC50b0Jhc2U1OCgpKSksXG4gICAgICBdXG4gICAgICAgIC5tYXAoKGFjY291bnQpID0+IGFjY291bnQudG9QdWJsaWNLZXkoKSlcbiAgICAgICAgLnNsaWNlKDAsIE1BWF9SRUNFTlRfUFJJT1JJVFlfRkVFX0FDQ09VTlRTKTtcblxuICAgICAgY29uc3QgcHJpb3JpdHlGZWVzID1cbiAgICAgICAgYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0UmVjZW50UHJpb3JpdGl6YXRpb25GZWVzKHtcbiAgICAgICAgICBsb2NrZWRXcml0YWJsZUFjY291bnRzOiB1bmlxV3JpdGFibGVBY2NvdW50cyxcbiAgICAgICAgfSk7XG5cbiAgICAgIGlmIChwcmlvcml0eUZlZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICBkZWJ1Z0xvZygnIyBnZXQgcmVjZW50IHByaW9yaXR5IGZlZXM6ICcsIHByaW9yaXR5RmVlcyk7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBncm91cEJ5U2xvdCA9IHByaW9yaXR5RmVlcy5yZWR1Y2UoXG4gICAgICAgIChhY2MsIGZlZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGZlZS5zbG90O1xuICAgICAgICAgIGlmICghYWNjW2tleV0pIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGFjY1trZXldLnB1c2goZmVlKTtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LFxuICAgICAgICB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBSZWNlbnRQcmlvcml0aXphdGlvbkZlZXNbXT4sXG4gICAgICApO1xuXG4gICAgICBjb25zdCBtYXhGZWVCeVNsb3QgPSBPYmplY3Qua2V5cyhncm91cEJ5U2xvdCkucmVkdWNlKFxuICAgICAgICAoYWNjLCBzbG90KSA9PiB7XG4gICAgICAgICAgYWNjW3Nsb3RdID0gZ3JvdXBCeVNsb3Rbc2xvdF0ucmVkdWNlKChtYXgsIGZlZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZlZS5wcmlvcml0aXphdGlvbkZlZSA+IG1heC5wcmlvcml0aXphdGlvbkZlZSA/IGZlZSA6IG1heDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LFxuICAgICAgICB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBSZWNlbnRQcmlvcml0aXphdGlvbkZlZXM+LFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1heGltdW1GZWVzID0gT2JqZWN0LnZhbHVlcyhtYXhGZWVCeVNsb3QpLnNvcnQoXG4gICAgICAgIChhOiBSZWNlbnRQcmlvcml0aXphdGlvbkZlZXMsIGI6IFJlY2VudFByaW9yaXRpemF0aW9uRmVlcykgPT5cbiAgICAgICAgICBhLnNsb3QgLSBiLnNsb3QsXG4gICAgICApIGFzIFJlY2VudFByaW9yaXRpemF0aW9uRmVlc1tdO1xuXG4gICAgICAvLyBnZXQgbWVkaWFuIG9mIGxhc3QgMjAgZmVlc1xuICAgICAgY29uc3QgcmVjZW50RmVlcyA9IG1heGltdW1GZWVzLnNsaWNlKFxuICAgICAgICBNYXRoLm1heChtYXhpbXVtRmVlcy5sZW5ndGggLSAyMCwgMCksXG4gICAgICApO1xuICAgICAgY29uc3QgbWlkID0gTWF0aC5mbG9vcihyZWNlbnRGZWVzLmxlbmd0aCAvIDIpO1xuICAgICAgY29uc3QgbWVkaWFuRmVlID1cbiAgICAgICAgcmVjZW50RmVlcy5sZW5ndGggJSAyICE9PSAwXG4gICAgICAgICAgPyByZWNlbnRGZWVzW21pZF0ucHJpb3JpdGl6YXRpb25GZWVcbiAgICAgICAgICA6IChyZWNlbnRGZWVzW21pZCAtIDFdLnByaW9yaXRpemF0aW9uRmVlICtcbiAgICAgICAgICAgICAgcmVjZW50RmVlc1ttaWRdLnByaW9yaXRpemF0aW9uRmVlKSAvXG4gICAgICAgICAgICAyO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBtZWRpYW4gZmVlOiAnLCBtZWRpYW5GZWUpO1xuXG4gICAgICByZXR1cm4gTWF0aC5jZWlsKG1lZGlhbkZlZSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENvbXB1dGVCdWRnZXRQcm9ncmFtLFxuICBLZXlwYWlyLFxuICBQdWJsaWNLZXksXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJy4uLy4uL3N1aXRlLXV0aWxzL3NyYy9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGNvbnN0IERFRkFVTFVUX0NPTVBVVEVfVU5JVCA9IDIwMF8wMDA7XG4gIGNvbnN0IERFRkFVTFVUX1RIUkVTSE9MRF9NVUxUSVBMSUVEID0gMS4xO1xuICBjb25zdCBNSU5JTVVNX0NPTVBVVEVfVU5JVCA9IDQ1MDtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb21wdXRlVW5pdCB7XG4gICAgZXhwb3J0IGNvbnN0IGNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBwYXllcjogS2V5cGFpcixcbiAgICAgIHRocmVzaG9sZE11bHRpcGxpZWQ/OiBudW1iZXIsXG4gICAgKSA9PiB7XG4gICAgICBjb25zdCB1bml0cyA9IGF3YWl0IHNpbXVsYXRlKGluc3RydWN0aW9ucywgcGF5ZXIsIHRocmVzaG9sZE11bHRpcGxpZWQpO1xuICAgICAgcmV0dXJuIENvbXB1dGVCdWRnZXRQcm9ncmFtLnNldENvbXB1dGVVbml0TGltaXQoe1xuICAgICAgICB1bml0cyxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3Qgc2ltdWxhdGUgPSBhc3luYyAoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHBheWVyOiBLZXlwYWlyLFxuICAgICAgdGhyZXNob2xkTXVsdGlwbGllZDogbnVtYmVyID0gREVGQVVMVVRfVEhSRVNIT0xEX01VTFRJUExJRUQsXG4gICAgKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBQdWJsaWNLZXkuZGVmYXVsdC50b1N0cmluZygpO1xuICAgICAgaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHR4LmFkZChpbnN0KSk7XG4gICAgICB0eC5mZWVQYXllciA9IHBheWVyLnB1YmxpY0tleTtcbiAgICAgIHR4LnZlcmlmeVNpZ25hdHVyZXMoZmFsc2UpO1xuXG4gICAgICBjb25zdCBzaW11bGF0aW9uID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuc2ltdWxhdGVUcmFuc2FjdGlvbih0eCk7XG4gICAgICBjb25zdCB1bml0cyA9IHNpbXVsYXRpb24udmFsdWUudW5pdHNDb25zdW1lZCB8fCBERUZBVUxVVF9DT01QVVRFX1VOSVQ7XG4gICAgICBkZWJ1Z0xvZygnIyBnZXQgc2ltdWxhdGUgdHJhbnNhY3Rpb246ICcsIHVuaXRzKTtcbiAgICAgIGxldCBjdSA9IDA7XG4gICAgICBpZiAodW5pdHMgPT09IDApIHtcbiAgICAgICAgY3UgPSBERUZBVUxVVF9DT01QVVRFX1VOSVQ7XG4gICAgICB9IGVsc2UgaWYgKHVuaXRzIDwgTUlOSU1VTV9DT01QVVRFX1VOSVQpIHtcbiAgICAgICAgLy8gb25seSBzb2wgdHJhbnNmZXJcbiAgICAgICAgY3UgPSBNSU5JTVVNX0NPTVBVVEVfVU5JVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1ID0gTWF0aC50cnVuYyh1bml0cyAqIHRocmVzaG9sZE11bHRpcGxpZWQpO1xuICAgICAgfVxuICAgICAgZGVidWdMb2coJyMgc2ltdWxhdGUgY3U6ICcsIGN1KTtcbiAgICAgIHJldHVybiBjdTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQW55T2JqZWN0IH0gZnJvbSAnfi90eXBlcy91dGlscyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogY29udmVydCBidWZmZXIgdG8gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gKiBAcmV0dXJucyBudW1iZXJbXVxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9BcnJheSA9IChidWZmZXI6IEJ1ZmZlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgbnVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGJ5dGUgb2YgYnVmZmVyKSB7XG4gICAgbnVtcy5wdXNoKGJ1ZmZlcltieXRlXSk7XG4gIH1cbiAgcmV0dXJuIG51bXM7XG59O1xuXG4vKipcbiAqIE92ZXJ3cml0ZSBKUyBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9iamVjdFxuICogQHBhcmFtIHtPdmVyd3JpdGVPYmplY3RbXX0gdGFyZ2V0c1xuICogQHJldHVybnMgT2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGVPYmplY3QgPSAoXG4gIG9iamVjdDogdW5rbm93bixcbiAgdGFyZ2V0czoge1xuICAgIGV4aXN0c0tleTogc3RyaW5nO1xuICAgIHdpbGw6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiB1bmtub3duIH07XG4gIH1bXSxcbik6IHVua25vd24gPT4ge1xuICBjb25zdCB0aGF0OiBBbnlPYmplY3QgPSBvYmplY3QgYXMgQW55T2JqZWN0O1xuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGRlbGV0ZSB0aGF0W3RhcmdldC5leGlzdHNLZXldO1xuICAgIHRoYXRbdGFyZ2V0LndpbGwua2V5XSA9IHRhcmdldC53aWxsLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXkgbG9nIGZvciBzb2xhbmEtc3VpdGUtY29uZmlnLmpzXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMVxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhM1xuICogQHBhcmFtIHt1bmtub3dufSBkYXRhNFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAoXG4gIGRhdGExOiB1bmtub3duLFxuICBkYXRhMjogdW5rbm93biA9ICcnLFxuICBkYXRhMzogdW5rbm93biA9ICcnLFxuICBkYXRhNDogdW5rbm93biA9ICcnLFxuKTogdm9pZCA9PiB7XG4gIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgY29uc29sZS5sb2coJ1tERUJVR10nLCBkYXRhMSwgZGF0YTIsIGRhdGEzLCBkYXRhNCk7XG4gIH1cbn07XG5cbi8qKlxuICogc2xlZXAgdGltZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjXG4gKiBAcmV0dXJucyBQcm9taXNlPG51bWJlcj5cbiAqL1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gYXN5bmMgKHNlYzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIHNlYyAqIDEwMDApKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbFxuICApO1xufTtcblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgcmV0dXJuIChcbiAgICAhIW9iaiAmJlxuICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgIHR5cGVvZiAob2JqIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufTtcblxuLyoqXG4gKiBUcnkgYXN5bmMgbW9uYWRcbiAqXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxULCBFPj5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBhc3luY2Jsb2NrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZXN1bHQ8VCwgRT4+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KGJsb2NrOiAoKSA9PiBUKTogUmVzdWx0PFQsIEU+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBpbnB1dDogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFJlc3VsdDxULCBFcnJvcj4gfCBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gaW5wdXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHYpKSB7XG4gICAgICByZXR1cm4gdi50aGVuKFxuICAgICAgICAoeDogVCkgPT4gUmVzdWx0Lm9rKHgpLFxuICAgICAgICAoZXJyOiBFKSA9PiBSZXN1bHQuZXJyKGVyciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHYpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlIGFzIHN0cmluZykpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChmaW5hbGx5SW5wdXQpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmFsbHkgaW5wdXQ6JywgZmluYWxseUlucHV0KTtcbiAgICAgIGZpbmFsbHlJbnB1dCgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcnx1bmRlZmluZWR9IGNyZWF0ZWRfYXRcbiAqIEByZXR1cm5zIERhdGUgfCB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lID0gKFxuICBjcmVhdGVkX2F0OiBudW1iZXIgfCB1bmRlZmluZWQsXG4pOiBEYXRlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGNyZWF0ZWRfYXQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoY3JlYXRlZF9hdCAqIDEwMDApO1xuICB9XG4gIHJldHVybjtcbn07XG5cbi8qKlxuICogR2V0IHVuaXggdGltZXN0YW1wXG4gKlxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCB1bml4VGltZXN0YW1wID0gKCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBTZW5kVHJhbnNhY3Rpb25FcnJvcixcbiAgVHJhbnNhY3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZVVuaXQgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSZXRyeSB7XG4gICAgY29uc3QgUkVUUllfTVVMVElQTElFRCA9IDEuNjtcbiAgICBleHBvcnQgY29uc3QgaXNDb21wdXRlQnVkZ2V0RXJyb3IgPSAoXG4gICAgICBlcnJvcjogdW5rbm93bixcbiAgICApOiBlcnJvciBpcyBTZW5kVHJhbnNhY3Rpb25FcnJvciA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yID09PSAnb2JqZWN0JyAmJiBlcnJvciBpbnN0YW5jZW9mIFNlbmRUcmFuc2FjdGlvbkVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvci5sb2dzPy5zb21lKChpdGVtKSA9PiBpdGVtLmluY2x1ZGVzKCdDb21wdXRlQnVkZ2V0JykpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICAgIGZpbmFsU2lnbmVyczogS2V5cGFpcltdLFxuICAgICAgY29uZmlybU9wdGlvbnM6IENvbmZpcm1PcHRpb25zLFxuICAgICkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgUmV0cnkgdGhlIFRyYW5zYWN0aW9uIGR1ZSB0byBhIGNvbXB1dGUgYnVkZ2V0IGVycm9yJyk7XG4gICAgICB0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnNbMF0gPVxuICAgICAgICBhd2FpdCBDb21wdXRlVW5pdC5Db21wdXRlVW5pdC5jcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICB0cmFuc2FjdGlvbi5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgZmluYWxTaWduZXJzWzBdLFxuICAgICAgICAgIFJFVFJZX01VTFRJUExJRUQsXG4gICAgICAgICk7XG5cbiAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICApO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3Qgc3VibWl0Rm9yUGFydGlhbFNpZ24gPSBhc3luYyAoXG4gICAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgICBmaW5hbFNpZ25lcjogS2V5cGFpcixcbiAgICAgIGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyxcbiAgICApID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIFJldHJ5IHRoZSBUcmFuc2FjdGlvbiBkdWUgdG8gYSBjb21wdXRlIGJ1ZGdldCBlcnJvcicpO1xuICAgICAgdHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zWzBdID1cbiAgICAgICAgYXdhaXQgQ29tcHV0ZVVuaXQuQ29tcHV0ZVVuaXQuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgdHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgIGZpbmFsU2lnbmVyLFxuICAgICAgICAgIFJFVFJZX01VTFRJUExJRUQsXG4gICAgICAgICk7XG4gICAgICB0cmFuc2FjdGlvbi5wYXJ0aWFsU2lnbihmaW5hbFNpZ25lcik7XG4gICAgICBjb25zdCB3aXJlVHJhbnNhY3Rpb24gPSB0cmFuc2FjdGlvbi5zZXJpYWxpemUoKTtcbiAgICAgIHJldHVybiBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5zZW5kUmF3VHJhbnNhY3Rpb24oXG4gICAgICAgIHdpcmVUcmFuc2FjdGlvbixcbiAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgS2V5cGFpcixcbiAgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSwgU3VibWl0T3B0aW9ucyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tcHV0ZVVuaXQgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUmV0cnkgfSBmcm9tICcuL3JldHJ5JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQ29tbW9uPFQgPSB1bmRlZmluZWQ+IGltcGxlbWVudHMgQ29tbW9uU3RydWN0dXJlPFQ+IHtcbiAgICBzdGF0aWMgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyPzogS2V5cGFpcjtcbiAgICBkYXRhPzogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgICBkYXRhPzogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tbW9uKSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgICAgYXdhaXQgUHJpb3JpdHlGZWUuUHJpb3JpdHlGZWUuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgICBvcHRpb25zLmFkZFNvbFByaW9yaXR5RmVlLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgIGF3YWl0IENvbXB1dGVVbml0LkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBDb25zdGFudHMuTUFYX1RSQU5TQUNUSU9OX1JFVFJJRVMsXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoUmV0cnkuUmV0cnkuaXNDb21wdXRlQnVkZ2V0RXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgUmV0cnkuUmV0cnkuc3VibWl0KFxuICAgICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbXB1dGVVbml0IH0gZnJvbSAnLi9jb21wdXRlLXVuaXQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFByaW9yaXR5RmVlIH0gZnJvbSAnLi9wcmlvcml0eS1mZWUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFJldHJ5IH0gZnJvbSAnLi9yZXRyeSc7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlLCBTdWJtaXRPcHRpb25zIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIE1pbnQ8VCA9IFB1YmtleT4gaW1wbGVtZW50cyBNaW50U3RydWN0dXJlPFQ+IHtcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI6IEtleXBhaXI7XG4gICAgZGF0YTogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICAgIGRhdGE6IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1pbnQpKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgTWludEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBDaGFuZ2UgbWV0YXBsZXggY2x1c3RlciBvbiBtYWlubmV0LWJldGEnKTtcbiAgICAgICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyOiBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmlzUHJpb3JpdHlGZWUpIHtcbiAgICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgICAgYXdhaXQgUHJpb3JpdHlGZWUuUHJpb3JpdHlGZWUuY3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLFxuICAgICAgICAgICAgICBvcHRpb25zLmFkZFNvbFByaW9yaXR5RmVlLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy51bnNoaWZ0KFxuICAgICAgICAgIGF3YWl0IENvbXB1dGVVbml0LkNvbXB1dGVVbml0LmNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMsXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnNbMF0sXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1PcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBDb25zdGFudHMuTUFYX1RSQU5TQUNUSU9OX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICBjb25maXJtT3B0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmIChSZXRyeS5SZXRyeS5pc0NvbXB1dGVCdWRnZXRFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBSZXRyeS5SZXRyeS5zdWJtaXQoXG4gICAgICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQge1xuICBQYXJ0aWFsU2lnblN0cnVjdHVyZSxcbiAgU3VibWl0T3B0aW9ucyxcbn0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBSZXRyeSB9IGZyb20gJy4vcmV0cnknO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBQYXJ0aWFsU2lnbiBpbXBsZW1lbnRzIFBhcnRpYWxTaWduU3RydWN0dXJlIHtcbiAgICBoZXhJbnN0cnVjdGlvbjogc3RyaW5nO1xuICAgIGRhdGE/OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihpbnN0cnVjdGlvbnM6IHN0cmluZywgbWludD86IFB1YmtleSkge1xuICAgICAgdGhpcy5oZXhJbnN0cnVjdGlvbiA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUGFydGlhbDxTdWJtaXRPcHRpb25zPiA9IHt9LFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGFydGlhbFNpZ24pKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0aW9ucy5mZWVQYXllcikge1xuICAgICAgICAgIHRocm93IEVycm9yKCdOZWVkIGZlZVBheWVyJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWNvZGUgPSBCdWZmZXIuZnJvbSh0aGlzLmhleEluc3RydWN0aW9uLCAnaGV4Jyk7XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gVHJhbnNhY3Rpb24uZnJvbShkZWNvZGUpO1xuICAgICAgICBjb25zdCBjb25maXJtT3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogQ29uc3RhbnRzLk1BWF9UUkFOU0FDVElPTl9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24ucGFydGlhbFNpZ24ob3B0aW9ucy5mZWVQYXllci50b0tleXBhaXIoKSk7XG4gICAgICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb24uc2VyaWFsaXplKCk7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICAgIHdpcmVUcmFuc2FjdGlvbixcbiAgICAgICAgICAgIGNvbmZpcm1PcHRpb25zLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKFJldHJ5LlJldHJ5LmlzQ29tcHV0ZUJ1ZGdldEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFJldHJ5LlJldHJ5LnN1Ym1pdEZvclBhcnRpYWxTaWduKFxuICAgICAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICAgICAgb3B0aW9ucy5mZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgICAgICAgY29uZmlybU9wdGlvbnMsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSwgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG4vLyBAaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgY29uc3QgTE9XX1ZBTFVFID0gMTI3OyAvLyAweDdmXG4gIGNvbnN0IEhJR0hfVkFMVUUgPSAxNjM4MzsgLy8gMHgzZmZmXG4gIGNvbnN0IE1BWF9UUkFOU0FDVElPTl9TSVpFID0gMTIzMjtcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgaGVhZGVyIHNpemVcbiAgICogQHBhcmFtIG4gZWxlbWVudHMgaW4gdGhlIGNvbXBhY3QgYXJyYXlcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiBhcnJheSBoZWFkZXJcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RIZWFkZXIgPSAobjogbnVtYmVyKSA9PlxuICAgIG4gPD0gTE9XX1ZBTFVFID8gMSA6IG4gPD0gSElHSF9WQUxVRSA/IDIgOiAzO1xuXG4gIC8qKlxuICAgKiBDb21wYWN0IHUxNiBhcnJheSBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEBwYXJhbSBzaXplIGJ5dGVzIHBlciBlYWNoIGVsZW1lbnRcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiBhcnJheVxuICAgKi9cbiAgY29uc3QgY29tcGFjdEFycmF5U2l6ZSA9IChuOiBudW1iZXIsIHNpemU6IG51bWJlcikgPT5cbiAgICBjb21wYWN0SGVhZGVyKG4pICsgbiAqIHNpemU7XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0eHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVUeFNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgZmVlUGF5ZXJQayA9IFtmZWVQYXllci50b0Jhc2U1OCgpXTtcblxuICAgIGNvbnN0IHNpZ25lcnMgPSBuZXcgU2V0PHN0cmluZz4oZmVlUGF5ZXJQayk7XG4gICAgY29uc3QgYWNjb3VudHMgPSBuZXcgU2V0PHN0cmluZz4oZmVlUGF5ZXJQayk7XG5cbiAgICBjb25zdCBpeHNTaXplID0gdHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLnJlZHVjZSgoYWNjLCBpeCkgPT4ge1xuICAgICAgaXgua2V5cy5mb3JFYWNoKCh7IHB1YmtleSwgaXNTaWduZXIgfSkgPT4ge1xuICAgICAgICBjb25zdCBwayA9IHB1YmtleS50b0Jhc2U1OCgpO1xuICAgICAgICBpZiAoaXNTaWduZXIpIHNpZ25lcnMuYWRkKHBrKTtcbiAgICAgICAgYWNjb3VudHMuYWRkKHBrKTtcbiAgICAgIH0pO1xuXG4gICAgICBhY2NvdW50cy5hZGQoaXgucHJvZ3JhbUlkLnRvQmFzZTU4KCkpO1xuXG4gICAgICBjb25zdCBuSW5kZXhlcyA9IGl4LmtleXMubGVuZ3RoO1xuICAgICAgY29uc3Qgb3BhcXVlRGF0YSA9IGl4LmRhdGEubGVuZ3RoO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICBhY2MgK1xuICAgICAgICAxICsgLy8gUElEIGluZGV4XG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUobkluZGV4ZXMsIDEpICtcbiAgICAgICAgY29tcGFjdEFycmF5U2l6ZShvcGFxdWVEYXRhLCAxKVxuICAgICAgKTtcbiAgICB9LCAwKTtcblxuICAgIHJldHVybiAoXG4gICAgICBjb21wYWN0QXJyYXlTaXplKHNpZ25lcnMuc2l6ZSwgNjQpICsgLy8gc2lnbmF0dXJlc1xuICAgICAgMyArIC8vIGhlYWRlclxuICAgICAgY29tcGFjdEFycmF5U2l6ZShhY2NvdW50cy5zaXplLCAzMikgKyAvLyBhY2NvdW50c1xuICAgICAgMzIgKyAvLyBibG9ja2hhc2hcbiAgICAgIGNvbXBhY3RIZWFkZXIodHJhbnNhY3Rpb24uaW5zdHJ1Y3Rpb25zLmxlbmd0aCkgKyAvLyBpbnN0cnVjdGlvbnNcbiAgICAgIGl4c1NpemVcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJcyBtYXggdHJhbnNhY3Rpb24gc2l6ZVxuICAgKiBAcGFyYW0gdHJhbnNhY3Rpb24gYSBzb2xhbmEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIGZlZVBheWVyIHRoZSBwdWJsaWNLZXkgb2YgdGhlIHNpZ25lclxuICAgKiBAcmV0dXJucyBzaXplIGluIGJ5dGVzIG9mIHRoZSB0cmFuc2FjdGlvblxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGlzT3ZlclRyYW5zYWN0aW9uU2l6ZSA9IChcbiAgICB0cmFuc2FjdGlvbjogVHJhbnNhY3Rpb24sXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGNhbGN1bGF0ZVR4U2l6ZSh0cmFuc2FjdGlvbiwgZmVlUGF5ZXIpID4gTUFYX1RSQU5TQUNUSU9OX1NJWkU7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tbW9uIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbXB1dGUgfSBmcm9tICcuL2NvbXB1dGUtdW5pdCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUGFydGlhbFNpZ24gfSBmcm9tICcuL3BhcnRpYWwtc2lnbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgUHJpb3JpdHlGZWUgfSBmcm9tICcuL3ByaW9yaXR5LWZlZSc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ2FsY3VsYXRlVHhzaXplIH0gZnJvbSAnLi9jYWxjdWxhdGUtdHhzaXplJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBSZXRyeSB9IGZyb20gJy4vcmV0cnknO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uQnVpbGRlciA9IHtcbiAgLi4uQmF0Y2gsXG4gIC4uLkNhbGN1bGF0ZVR4c2l6ZSxcbiAgLi4uQ29tbW9uLFxuICAuLi5Db21wdXRlLFxuICAuLi5NaW50LFxuICAuLi5QYXJ0aWFsU2lnbixcbiAgLi4uUHJpb3JpdHlGZWUsXG4gIC4uLlJldHJ5LFxufTtcbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBDb21tb25TdHJ1Y3R1cmUsXG4gIE1pbnRTdHJ1Y3R1cmUsXG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxuICBTdWJtaXRPcHRpb25zLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICcuJztcblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuXG4gIHVud3JhcCgpOiBUO1xuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFU7XG4gIHVud3JhcDxVLCBWPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVik6IFUgfCBWO1xuICAvLyB1bmlmaWVkLXNpZ25hdHVyZXMuIGludG8gbGluZSAxMFxuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFUpOiBVO1xuICB1bndyYXAob2s/OiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gdW5rbm93bik6IHVua25vd24ge1xuICAgIGNvbnN0IHIgPSB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rID8gb2sodmFsdWUpIDogdmFsdWUpLFxuICAgICAgKGVycm9yKSA9PiAoZXJyID8gUmVzdWx0Lm9rKGVycihlcnJvcikpIDogUmVzdWx0LmVycihlcnJvcikpLFxuICAgICk7XG4gICAgaWYgKHIuaXNFcnIpIHtcbiAgICAgIHRocm93IHIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByLnZhbHVlO1xuICB9XG5cbiAgLy8vLyBtYXAgLy8vL1xuICBtYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFJlc3VsdDxVLCBFPjtcbiAgbWFwPFUsIEYgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gVSxcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gRixcbiAgKTogUmVzdWx0PFUsIEY+O1xuICBtYXAob2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiBFcnJvcik6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIgPyBlcnIoZXJyb3IpIDogZXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8vIGNoYWluIC8vLy9cbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc2luZ2xlIFRyYW5zYWN0aW9uQnVpbGRlciAvLy8vXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgYXN5bmMgc3VibWl0KFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8U3VibWl0T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4ge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMubWFwKFxuICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgIC8vIHBhcmFtZXRlcjogcGFydGlhbFNpZ24gaGV4SW5zdHJ1Y3R1cmVcbiAgICAgICAgY29uc3QgaGV4UmVnZXggPSAvXlswLTlhLWZBLUZdKyQvO1xuICAgICAgICBjb25zb2xlLmxvZygnIyMjIyB0aGlzOiAnLCB0aGlzKTtcbiAgICAgICAgaWYgKHR5cGVvZiBvayA9PT0gJ3N0cmluZycgJiYgaGV4UmVnZXgudGVzdChvaykpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5QYXJ0aWFsU2lnbihvaykuc3VibWl0KG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG9iaiA9IG9rIGFzXG4gICAgICAgICAgICB8IENvbW1vblN0cnVjdHVyZVxuICAgICAgICAgICAgfCBNaW50U3RydWN0dXJlXG4gICAgICAgICAgICB8IFBhcnRpYWxTaWduU3RydWN0dXJlO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgfSxcbiAgICApO1xuICAgIGlmIChyZXMuaXNFcnIpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKHJlcy5lcnJvcik7XG4gICAgfVxuICAgIHJldHVybiByZXMudmFsdWU7XG4gIH1cbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgaW50ZXJmYWNlIEFycmF5PFQ+IHtcbiAgICBzdWJtaXQoXG4gICAgICBvcHRpb25zPzogUGFydGlhbDxTdWJtaXRPcHRpb25zPixcbiAgICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PjtcbiAgfVxufVxuXG4vLyBUcmFuc2FjdGlvbkJ1aWxkZXIuQmF0Y2hcbkFycmF5LnByb3RvdHlwZS5zdWJtaXQgPSBhc3luYyBmdW5jdGlvbihvcHRpb25zOiBQYXJ0aWFsPFN1Ym1pdE9wdGlvbnM+ID0ge30pIHtcbiAgXG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBDb21tb25TdHJ1Y3R1cmUgfCBNaW50U3RydWN0dXJlW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgICBpZiAob2JqLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9IGVsc2UgaWYgKG9iai5pc09rKSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iai52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcignT25seSBBcnJheSBJbnN0cnVjdGlvbiBvYmplY3QnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGJhdGNoT3B0aW9ucyA9IHtcbiAgICAgIGZlZVBheWVyOiBvcHRpb25zLmZlZVBheWVyLFxuICAgICAgaXNQcmlvcml0eUZlZTogb3B0aW9ucy5pc1ByaW9yaXR5RmVlLFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBpbnN0cnVjdGlvbnMsXG4gICAgfTtcbiAgICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggc3VibWl0KCknKTtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaCgpLnN1Ym1pdChiYXRjaE9wdGlvbnMpO1xuICB9O1xuXG4gIGNsYXNzIEludGVybmFsT2s8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgICByZWFkb25seSBpc09rID0gdHJ1ZTtcbiAgICByZWFkb25seSBpc0VyciA9IGZhbHNlO1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHZhbHVlOiBUKSB7XG4gICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICAgIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICAgIF9lcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICAgICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgSW50ZXJuYWxFcnI8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgICByZWFkb25seSBpc09rID0gZmFsc2U7XG4gICAgcmVhZG9ubHkgaXNFcnIgPSB0cnVlO1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICAgIF9vazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICAgICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydCBuYW1lc3BhY2UgUmVzdWx0IHtcbiAgICBleHBvcnQgdHlwZSBPazxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxPazxULCBFPjtcbiAgICBleHBvcnQgdHlwZSBFcnI8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsRXJyPFQsIEU+O1xuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4odmFsdWU6IFQpOiBSZXN1bHQ8VCwgRT4ge1xuICAgICAgcmV0dXJuIG5ldyBJbnRlcm5hbE9rKHZhbHVlKTtcbiAgICB9XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I/OiBFKTogUmVzdWx0PFQsIEU+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yOiBFKTogUmVzdWx0PFQsIEU+IHtcbiAgICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnIoZXJyb3IgfHwgRXJyb3IoKSk7XG4gICAgfVxuXG4gICAgdHlwZSBVID0gUmVzdWx0PHVua25vd24+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgICBSMCBleHRlbmRzIFUsXG4gICAgICBSMSBleHRlbmRzIFUsXG4gICAgICBSMiBleHRlbmRzIFUsXG4gICAgICBSMyBleHRlbmRzIFUsXG4gICAgICBSNCBleHRlbmRzIFUsXG4gICAgICBSNSBleHRlbmRzIFUsXG4gICAgICBSNiBleHRlbmRzIFUsXG4gICAgICBSNyBleHRlbmRzIFUsXG4gICAgICBSOCBleHRlbmRzIFUsXG4gICAgICBSOSBleHRlbmRzIFUsXG4gICAgICBSMTAgZXh0ZW5kcyBVLFxuICAgICAgUjExIGV4dGVuZHMgVSxcbiAgICAgIFIxMiBleHRlbmRzIFUsXG4gICAgICBSMTMgZXh0ZW5kcyBVLFxuICAgICAgUjE0IGV4dGVuZHMgVSxcbiAgICAgIFIxNSBleHRlbmRzIFUsXG4gICAgPihcbiAgICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNCwgUjE1XSxcbiAgICApOiBSZXN1bHQ8XG4gICAgICBbXG4gICAgICAgIE9rVHlwZTxSMD4sXG4gICAgICAgIE9rVHlwZTxSMT4sXG4gICAgICAgIE9rVHlwZTxSMj4sXG4gICAgICAgIE9rVHlwZTxSMz4sXG4gICAgICAgIE9rVHlwZTxSND4sXG4gICAgICAgIE9rVHlwZTxSNT4sXG4gICAgICAgIE9rVHlwZTxSNj4sXG4gICAgICAgIE9rVHlwZTxSNz4sXG4gICAgICAgIE9rVHlwZTxSOD4sXG4gICAgICAgIE9rVHlwZTxSOT4sXG4gICAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgICBPa1R5cGU8UjExPixcbiAgICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgICBPa1R5cGU8UjE0PixcbiAgICAgICAgT2tUeXBlPFIxNT4sXG4gICAgICBdLFxuICAgICAgRXJyVHlwZTxcbiAgICAgICAgfCBSMFxuICAgICAgICB8IFIxXG4gICAgICAgIHwgUjJcbiAgICAgICAgfCBSM1xuICAgICAgICB8IFI0XG4gICAgICAgIHwgUjVcbiAgICAgICAgfCBSNlxuICAgICAgICB8IFI3XG4gICAgICAgIHwgUjhcbiAgICAgICAgfCBSOVxuICAgICAgICB8IFIxMFxuICAgICAgICB8IFIxMVxuICAgICAgICB8IFIxMlxuICAgICAgICB8IFIxM1xuICAgICAgICB8IFIxNFxuICAgICAgICB8IFIxNVxuICAgICAgPlxuICAgID47XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICAgIFIwIGV4dGVuZHMgVSxcbiAgICAgIFIxIGV4dGVuZHMgVSxcbiAgICAgIFIyIGV4dGVuZHMgVSxcbiAgICAgIFIzIGV4dGVuZHMgVSxcbiAgICAgIFI0IGV4dGVuZHMgVSxcbiAgICAgIFI1IGV4dGVuZHMgVSxcbiAgICAgIFI2IGV4dGVuZHMgVSxcbiAgICAgIFI3IGV4dGVuZHMgVSxcbiAgICAgIFI4IGV4dGVuZHMgVSxcbiAgICAgIFI5IGV4dGVuZHMgVSxcbiAgICAgIFIxMCBleHRlbmRzIFUsXG4gICAgICBSMTEgZXh0ZW5kcyBVLFxuICAgICAgUjEyIGV4dGVuZHMgVSxcbiAgICAgIFIxMyBleHRlbmRzIFUsXG4gICAgICBSMTQgZXh0ZW5kcyBVLFxuICAgID4oXG4gICAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTRdLFxuICAgICk6IFJlc3VsdDxcbiAgICAgIFtcbiAgICAgICAgT2tUeXBlPFIwPixcbiAgICAgICAgT2tUeXBlPFIxPixcbiAgICAgICAgT2tUeXBlPFIyPixcbiAgICAgICAgT2tUeXBlPFIzPixcbiAgICAgICAgT2tUeXBlPFI0PixcbiAgICAgICAgT2tUeXBlPFI1PixcbiAgICAgICAgT2tUeXBlPFI2PixcbiAgICAgICAgT2tUeXBlPFI3PixcbiAgICAgICAgT2tUeXBlPFI4PixcbiAgICAgICAgT2tUeXBlPFI5PixcbiAgICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgICBPa1R5cGU8UjEyPixcbiAgICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICAgIE9rVHlwZTxSMTQ+LFxuICAgICAgXSxcbiAgICAgIEVyclR5cGU8XG4gICAgICAgIHwgUjBcbiAgICAgICAgfCBSMVxuICAgICAgICB8IFIyXG4gICAgICAgIHwgUjNcbiAgICAgICAgfCBSNFxuICAgICAgICB8IFI1XG4gICAgICAgIHwgUjZcbiAgICAgICAgfCBSN1xuICAgICAgICB8IFI4XG4gICAgICAgIHwgUjlcbiAgICAgICAgfCBSMTBcbiAgICAgICAgfCBSMTFcbiAgICAgICAgfCBSMTJcbiAgICAgICAgfCBSMTNcbiAgICAgICAgfCBSMTRcbiAgICAgID5cbiAgICA+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgICBSMCBleHRlbmRzIFUsXG4gICAgICBSMSBleHRlbmRzIFUsXG4gICAgICBSMiBleHRlbmRzIFUsXG4gICAgICBSMyBleHRlbmRzIFUsXG4gICAgICBSNCBleHRlbmRzIFUsXG4gICAgICBSNSBleHRlbmRzIFUsXG4gICAgICBSNiBleHRlbmRzIFUsXG4gICAgICBSNyBleHRlbmRzIFUsXG4gICAgICBSOCBleHRlbmRzIFUsXG4gICAgICBSOSBleHRlbmRzIFUsXG4gICAgICBSMTAgZXh0ZW5kcyBVLFxuICAgICAgUjExIGV4dGVuZHMgVSxcbiAgICAgIFIxMiBleHRlbmRzIFUsXG4gICAgICBSMTMgZXh0ZW5kcyBVLFxuICAgID4oXG4gICAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzXSxcbiAgICApOiBSZXN1bHQ8XG4gICAgICBbXG4gICAgICAgIE9rVHlwZTxSMD4sXG4gICAgICAgIE9rVHlwZTxSMT4sXG4gICAgICAgIE9rVHlwZTxSMj4sXG4gICAgICAgIE9rVHlwZTxSMz4sXG4gICAgICAgIE9rVHlwZTxSND4sXG4gICAgICAgIE9rVHlwZTxSNT4sXG4gICAgICAgIE9rVHlwZTxSNj4sXG4gICAgICAgIE9rVHlwZTxSNz4sXG4gICAgICAgIE9rVHlwZTxSOD4sXG4gICAgICAgIE9rVHlwZTxSOT4sXG4gICAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgICBPa1R5cGU8UjExPixcbiAgICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgXSxcbiAgICAgIEVyclR5cGU8XG4gICAgICAgIFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExIHwgUjEyIHwgUjEzXG4gICAgICA+XG4gICAgPjtcbiAgICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgICAgUjAgZXh0ZW5kcyBVLFxuICAgICAgUjEgZXh0ZW5kcyBVLFxuICAgICAgUjIgZXh0ZW5kcyBVLFxuICAgICAgUjMgZXh0ZW5kcyBVLFxuICAgICAgUjQgZXh0ZW5kcyBVLFxuICAgICAgUjUgZXh0ZW5kcyBVLFxuICAgICAgUjYgZXh0ZW5kcyBVLFxuICAgICAgUjcgZXh0ZW5kcyBVLFxuICAgICAgUjggZXh0ZW5kcyBVLFxuICAgICAgUjkgZXh0ZW5kcyBVLFxuICAgICAgUjEwIGV4dGVuZHMgVSxcbiAgICAgIFIxMSBleHRlbmRzIFUsXG4gICAgICBSMTIgZXh0ZW5kcyBVLFxuICAgID4oXG4gICAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMl0sXG4gICAgKTogUmVzdWx0PFxuICAgICAgW1xuICAgICAgICBPa1R5cGU8UjA+LFxuICAgICAgICBPa1R5cGU8UjE+LFxuICAgICAgICBPa1R5cGU8UjI+LFxuICAgICAgICBPa1R5cGU8UjM+LFxuICAgICAgICBPa1R5cGU8UjQ+LFxuICAgICAgICBPa1R5cGU8UjU+LFxuICAgICAgICBPa1R5cGU8UjY+LFxuICAgICAgICBPa1R5cGU8Ujc+LFxuICAgICAgICBPa1R5cGU8Ujg+LFxuICAgICAgICBPa1R5cGU8Ujk+LFxuICAgICAgICBPa1R5cGU8UjEwPixcbiAgICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBdLFxuICAgICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgICA+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgICBSMCBleHRlbmRzIFUsXG4gICAgICBSMSBleHRlbmRzIFUsXG4gICAgICBSMiBleHRlbmRzIFUsXG4gICAgICBSMyBleHRlbmRzIFUsXG4gICAgICBSNCBleHRlbmRzIFUsXG4gICAgICBSNSBleHRlbmRzIFUsXG4gICAgICBSNiBleHRlbmRzIFUsXG4gICAgICBSNyBleHRlbmRzIFUsXG4gICAgICBSOCBleHRlbmRzIFUsXG4gICAgICBSOSBleHRlbmRzIFUsXG4gICAgICBSMTAgZXh0ZW5kcyBVLFxuICAgICAgUjExIGV4dGVuZHMgVSxcbiAgICA+KFxuICAgICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExXSxcbiAgICApOiBSZXN1bHQ8XG4gICAgICBbXG4gICAgICAgIE9rVHlwZTxSMD4sXG4gICAgICAgIE9rVHlwZTxSMT4sXG4gICAgICAgIE9rVHlwZTxSMj4sXG4gICAgICAgIE9rVHlwZTxSMz4sXG4gICAgICAgIE9rVHlwZTxSND4sXG4gICAgICAgIE9rVHlwZTxSNT4sXG4gICAgICAgIE9rVHlwZTxSNj4sXG4gICAgICAgIE9rVHlwZTxSNz4sXG4gICAgICAgIE9rVHlwZTxSOD4sXG4gICAgICAgIE9rVHlwZTxSOT4sXG4gICAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgICBPa1R5cGU8UjExPixcbiAgICAgIF0sXG4gICAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICAgID47XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICAgIFIwIGV4dGVuZHMgVSxcbiAgICAgIFIxIGV4dGVuZHMgVSxcbiAgICAgIFIyIGV4dGVuZHMgVSxcbiAgICAgIFIzIGV4dGVuZHMgVSxcbiAgICAgIFI0IGV4dGVuZHMgVSxcbiAgICAgIFI1IGV4dGVuZHMgVSxcbiAgICAgIFI2IGV4dGVuZHMgVSxcbiAgICAgIFI3IGV4dGVuZHMgVSxcbiAgICAgIFI4IGV4dGVuZHMgVSxcbiAgICAgIFI5IGV4dGVuZHMgVSxcbiAgICAgIFIxMCBleHRlbmRzIFUsXG4gICAgPihcbiAgICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTBdLFxuICAgICk6IFJlc3VsdDxcbiAgICAgIFtcbiAgICAgICAgT2tUeXBlPFIwPixcbiAgICAgICAgT2tUeXBlPFIxPixcbiAgICAgICAgT2tUeXBlPFIyPixcbiAgICAgICAgT2tUeXBlPFIzPixcbiAgICAgICAgT2tUeXBlPFI0PixcbiAgICAgICAgT2tUeXBlPFI1PixcbiAgICAgICAgT2tUeXBlPFI2PixcbiAgICAgICAgT2tUeXBlPFI3PixcbiAgICAgICAgT2tUeXBlPFI4PixcbiAgICAgICAgT2tUeXBlPFI5PixcbiAgICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBdLFxuICAgICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMD5cbiAgICA+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgICBSMCBleHRlbmRzIFUsXG4gICAgICBSMSBleHRlbmRzIFUsXG4gICAgICBSMiBleHRlbmRzIFUsXG4gICAgICBSMyBleHRlbmRzIFUsXG4gICAgICBSNCBleHRlbmRzIFUsXG4gICAgICBSNSBleHRlbmRzIFUsXG4gICAgICBSNiBleHRlbmRzIFUsXG4gICAgICBSNyBleHRlbmRzIFUsXG4gICAgICBSOCBleHRlbmRzIFUsXG4gICAgICBSOSBleHRlbmRzIFUsXG4gICAgPihcbiAgICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5XSxcbiAgICApOiBSZXN1bHQ8XG4gICAgICBbXG4gICAgICAgIE9rVHlwZTxSMD4sXG4gICAgICAgIE9rVHlwZTxSMT4sXG4gICAgICAgIE9rVHlwZTxSMj4sXG4gICAgICAgIE9rVHlwZTxSMz4sXG4gICAgICAgIE9rVHlwZTxSND4sXG4gICAgICAgIE9rVHlwZTxSNT4sXG4gICAgICAgIE9rVHlwZTxSNj4sXG4gICAgICAgIE9rVHlwZTxSNz4sXG4gICAgICAgIE9rVHlwZTxSOD4sXG4gICAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBdLFxuICAgICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgICA+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgICBSMCBleHRlbmRzIFUsXG4gICAgICBSMSBleHRlbmRzIFUsXG4gICAgICBSMiBleHRlbmRzIFUsXG4gICAgICBSMyBleHRlbmRzIFUsXG4gICAgICBSNCBleHRlbmRzIFUsXG4gICAgICBSNSBleHRlbmRzIFUsXG4gICAgICBSNiBleHRlbmRzIFUsXG4gICAgICBSNyBleHRlbmRzIFUsXG4gICAgICBSOCBleHRlbmRzIFUsXG4gICAgPihcbiAgICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjhdLFxuICAgICk6IFJlc3VsdDxcbiAgICAgIFtcbiAgICAgICAgT2tUeXBlPFIwPixcbiAgICAgICAgT2tUeXBlPFIxPixcbiAgICAgICAgT2tUeXBlPFIyPixcbiAgICAgICAgT2tUeXBlPFIzPixcbiAgICAgICAgT2tUeXBlPFI0PixcbiAgICAgICAgT2tUeXBlPFI1PixcbiAgICAgICAgT2tUeXBlPFI2PixcbiAgICAgICAgT2tUeXBlPFI3PixcbiAgICAgICAgT2tUeXBlPFI4PixcbiAgICAgIF0sXG4gICAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOD5cbiAgICA+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgICBSMCBleHRlbmRzIFUsXG4gICAgICBSMSBleHRlbmRzIFUsXG4gICAgICBSMiBleHRlbmRzIFUsXG4gICAgICBSMyBleHRlbmRzIFUsXG4gICAgICBSNCBleHRlbmRzIFUsXG4gICAgICBSNSBleHRlbmRzIFUsXG4gICAgICBSNiBleHRlbmRzIFUsXG4gICAgICBSNyBleHRlbmRzIFUsXG4gICAgPihcbiAgICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSN10sXG4gICAgKTogUmVzdWx0PFxuICAgICAgW1xuICAgICAgICBPa1R5cGU8UjA+LFxuICAgICAgICBPa1R5cGU8UjE+LFxuICAgICAgICBPa1R5cGU8UjI+LFxuICAgICAgICBPa1R5cGU8UjM+LFxuICAgICAgICBPa1R5cGU8UjQ+LFxuICAgICAgICBPa1R5cGU8UjU+LFxuICAgICAgICBPa1R5cGU8UjY+LFxuICAgICAgICBPa1R5cGU8Ujc+LFxuICAgICAgXSxcbiAgICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNz5cbiAgICA+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgICBSMCBleHRlbmRzIFUsXG4gICAgICBSMSBleHRlbmRzIFUsXG4gICAgICBSMiBleHRlbmRzIFUsXG4gICAgICBSMyBleHRlbmRzIFUsXG4gICAgICBSNCBleHRlbmRzIFUsXG4gICAgICBSNSBleHRlbmRzIFUsXG4gICAgICBSNiBleHRlbmRzIFUsXG4gICAgPihcbiAgICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2XSxcbiAgICApOiBSZXN1bHQ8XG4gICAgICBbXG4gICAgICAgIE9rVHlwZTxSMD4sXG4gICAgICAgIE9rVHlwZTxSMT4sXG4gICAgICAgIE9rVHlwZTxSMj4sXG4gICAgICAgIE9rVHlwZTxSMz4sXG4gICAgICAgIE9rVHlwZTxSND4sXG4gICAgICAgIE9rVHlwZTxSNT4sXG4gICAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBdLFxuICAgICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgICA+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgICBSMCBleHRlbmRzIFUsXG4gICAgICBSMSBleHRlbmRzIFUsXG4gICAgICBSMiBleHRlbmRzIFUsXG4gICAgICBSMyBleHRlbmRzIFUsXG4gICAgICBSNCBleHRlbmRzIFUsXG4gICAgICBSNSBleHRlbmRzIFUsXG4gICAgPihcbiAgICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjVdLFxuICAgICk6IFJlc3VsdDxcbiAgICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+LCBPa1R5cGU8UjU+XSxcbiAgICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1PlxuICAgID47XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICAgIFIwIGV4dGVuZHMgVSxcbiAgICAgIFIxIGV4dGVuZHMgVSxcbiAgICAgIFIyIGV4dGVuZHMgVSxcbiAgICAgIFIzIGV4dGVuZHMgVSxcbiAgICAgIFI0IGV4dGVuZHMgVSxcbiAgICA+KFxuICAgICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0XSxcbiAgICApOiBSZXN1bHQ8XG4gICAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0Pl0sXG4gICAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQ+XG4gICAgPjtcbiAgICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFUsIFIzIGV4dGVuZHMgVT4oXG4gICAgICBvYmo6IFtSMCwgUjEsIFIyLCBSM10sXG4gICAgKTogUmVzdWx0PFxuICAgICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz5dLFxuICAgICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMz5cbiAgICA+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVT4oXG4gICAgICBvYmo6IFtSMCwgUjEsIFIyXSxcbiAgICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj5dLCBFcnJUeXBlPFIwIHwgUjEgfCBSMj4+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgICAgb2JqOiBbUjAsIFIxXSxcbiAgICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT5dLCBFcnJUeXBlPFIwIHwgUjE+PjtcbiAgICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVT4oXG4gICAgICBvYmo6IFtSMF0sXG4gICAgKTogUmVzdWx0PFtPa1R5cGU8UjA+XSwgRXJyVHlwZTxSMD4+O1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiBbXSk6IFJlc3VsdDxbXT47XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxUIGV4dGVuZHMgVVtdIHwgUmVjb3JkPHN0cmluZywgVT4+KFxuICAgICAgb2JqOiBULFxuICAgICk6IFJlc3VsdDxcbiAgICAgIHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgST4gPyBJIDogbmV2ZXIgfSxcbiAgICAgIHtcbiAgICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT4gPyBFIDogbmV2ZXI7XG4gICAgICB9W2tleW9mIFRdXG4gICAgPjtcbiAgICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogdW5rbm93bik6IHVua25vd24ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICBjb25zdCByZXNBcnIgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaikge1xuICAgICAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbSBhcyB1bmtub3duO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNBcnIucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlc0Fycik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fTtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pO1xuICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICBjb25zdCBpdGVtID0gKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPilba2V5XTtcbiAgICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfVxuICAgICAgICByZXNba2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlcyk7XG4gICAgfVxuICB9XG5cbiAgZXhwb3J0IHR5cGUgUmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvciA9IEVycm9yPiA9XG4gICAgfCBSZXN1bHQuT2s8VCwgRT5cbiAgICB8IFJlc3VsdC5FcnI8VCwgRT47XG5cbiAgdHlwZSBPa1R5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PGluZmVyIE8+ID8gTyA6IG5ldmVyO1xuICB0eXBlIEVyclR5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+XG4gICAgPyBFXG4gICAgOiBuZXZlcjtcbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBY2NvdW50LFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcixcbiAgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuLyoqXG4gKiBHZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAqXG4gKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsb3dPd25lck9mZkN1cnZlXG4gKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPlxuICovXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIEFzc29jaWF0ZWQge1xuICAgIC8qKlxuICAgICAqIFtNYWluIGxvZ2ljXUdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gICAgICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAgICovXG4gICAgZXhwb3J0IGNvbnN0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgICAgbWludDogUHVia2V5LFxuICAgICAgb3duZXI6IFB1YmtleSxcbiAgICAgIGZlZVBheWVyPzogUHVia2V5LFxuICAgICAgYWxsb3dPd25lck9mZkN1cnZlID0gZmFsc2UsXG4gICAgKTogUHJvbWlzZTx7XG4gICAgICB0b2tlbkFjY291bnQ6IHN0cmluZztcbiAgICAgIGluc3Q6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgfT4gPT4ge1xuICAgICAgY29uc3QgYXNzb2NpYXRlZFRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gRG9udCB1c2UgUmVzdWx0XG4gICAgICAgIGF3YWl0IGdldEFjY291bnQoXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKS5jb21taXRtZW50LFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yKSAmJlxuICAgICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gb3duZXIgOiBmZWVQYXllcjtcblxuICAgICAgICBjb25zdCBpbnN0ID0gY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICAgIHBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3QsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEtleXBhaXIgYXMgT3JpZ2luYWwsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBjbGFzcyBLZXlwYWlyIHtcbiAgICBzZWNyZXQ6IFNlY3JldDtcbiAgICBwdWJrZXk6IFB1YmtleTtcblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtczogeyBwdWJrZXk/OiBQdWJrZXk7IHNlY3JldDogU2VjcmV0IH0pIHtcbiAgICAgIGlmICghcGFyYW1zLnB1YmtleSkge1xuICAgICAgICBjb25zdCBrZXlwYWlyID0gcGFyYW1zLnNlY3JldC50b0tleXBhaXIoKTtcbiAgICAgICAgdGhpcy5wdWJrZXkgPSBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdWJrZXkgPSBwYXJhbXMucHVia2V5O1xuICAgICAgfVxuICAgICAgdGhpcy5zZWNyZXQgPSBwYXJhbXMuc2VjcmV0O1xuICAgIH1cblxuICAgIHRvUHVibGljS2V5KCk6IFB1YmxpY0tleSB7XG4gICAgICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnB1YmtleSk7XG4gICAgfVxuXG4gICAgdG9LZXlwYWlyKCk6IE9yaWdpbmFsIHtcbiAgICAgIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy5zZWNyZXQpO1xuICAgICAgcmV0dXJuIE9yaWdpbmFsLmZyb21TZWNyZXRLZXkoZGVjb2RlZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzUHVia2V5ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBQdWJrZXkgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17MzIsNDR9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgaXNTZWNyZXQgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFNlY3JldCA9PlxuICAgICAgL15bMC05YS16QS1aXXs4Nyw4OH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBjcmVhdGUgPSAoKTogS2V5cGFpciA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlyID0gT3JpZ2luYWwuZ2VuZXJhdGUoKTtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3RhdGljIHRvS2V5UGFpciA9IChrZXlwYWlyOiBPcmlnaW5hbCk6IEtleXBhaXIgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgUFJPR1JBTV9BRERSRVNTIGFzIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb25zJztcbmltcG9ydCBCTiBmcm9tICdibi5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUGRhIHtcbiAgICBleHBvcnQgY29uc3QgZ2V0TWV0YWRhdGEgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldE1hc3RlckVkaXRpb24gPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2VkaXRpb24nKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0VHJlZUF1dGhvcml0eSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW2FkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEJndW1TaWduZXIgPSAoKTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtCdWZmZXIuZnJvbSgnY29sbGVjdGlvbl9jcGknLCAndXRmOCcpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEFzc2V0SWQgPSAoYWRkcmVzczogUHVia2V5LCBsZWFmSW5kZXg6IG51bWJlcik6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gbmV3IEJOLkJOKGxlYWZJbmRleCk7XG4gICAgICBjb25zdCBbYXNzZXRJZF0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdhc3NldCcsICd1dGY4JyksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgVWludDhBcnJheS5mcm9tKG5vZGUudG9BcnJheSgnbGUnLCA4KSksXG4gICAgICAgIF0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBhc3NldElkLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFjY291bnQgYXMgQWFzc29jaWF0ZWQgfSBmcm9tICcuL2Fzc29jaWF0ZWQnO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcbmltcG9ydCB7IEFjY291bnQgYXMgUGRhIH0gZnJvbSAnLi9wZGEnO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG4vLyBpbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSB7XG4gIC4uLkFhc3NvY2lhdGVkLFxuICAuLi5LZXlwYWlyLFxuICAuLi5QZGEsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsV0FBQUEsVUFBUyxrQkFBa0IsYUFBQUMsa0JBQWlCOzs7QUNBckQsU0FBbUIsaUJBQWlCO0FBQ3BDLE9BQU8sc0JBQXNCO0FBRXRCLElBQUksU0FBUztBQUViLElBQVU7QUFBQSxDQUFWLENBQVVDLGVBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMscUJBQVY7QUFDRSxJQUFNQSxpQkFBQSxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPNUIsSUFBTUEsaUJBQUEsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBUlosa0JBQUFELFdBQUEsb0JBQUFBLFdBQUE7QUFBQSxHQURGO0FBQUEsQ0EwQlYsQ0FBVUEsZUFBVjtBQUNFLEVBQU1B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TztBQUdMLFFBQUksd0NBQWdDO0FBQ2xDLFlBQU0sR0FBRyxVQUFVLHFCQUFxQixPQUN0QyxrQkFDRixZQUFZLE9BQU87QUFBQSxJQUNyQixXQUFXLGdDQUE0QjtBQUNyQyxZQUFNLEdBQUcsVUFBVSxpQkFBaUIsT0FDbEMsa0JBQ0YsWUFBWSxPQUFPO0FBQUEsSUFDckIsT0FBTztBQUNMLFlBQU0sR0FBRyxVQUFVLG9CQUFvQixPQUNyQyxrQkFDRixZQUFZLE9BQU87QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7QUFRQSxPQUFPLFVBQVUsY0FBYyxXQUFZO0FBQ3pDLE1BQUksQ0FBQ0EsU0FBUSxRQUFRLFNBQVMsS0FBSyxTQUFTLENBQUMsR0FBRztBQUM5QyxVQUFNLE1BQU0sNEJBQTRCLEtBQUssU0FBUyxDQUFDLEVBQUU7QUFBQSxFQUMzRDtBQUNBLFNBQU8sSUFBSUMsV0FBVSxLQUFLLFNBQVMsQ0FBQztBQUN0QztBQVFBLE9BQU8sVUFBVSxZQUFZLFdBQVk7QUFDdkMsTUFBSSxDQUFDRCxTQUFRLFFBQVEsU0FBUyxLQUFLLFNBQVMsQ0FBQyxHQUFHO0FBQzlDLFVBQU0sTUFBTSw0QkFBNEIsS0FBSyxTQUFTLENBQUMsRUFBRTtBQUFBLEVBQzNEO0FBQ0EsUUFBTSxVQUFVRCxJQUFHLE9BQU8sS0FBSyxTQUFTLENBQUM7QUFDekMsU0FBT0csU0FBUSxjQUFjLE9BQU87QUFDdEM7QUFRQSxPQUFPLFVBQVUsUUFBUSxXQUFZO0FBQ25DLFNBQU8sVUFBVSxJQUFjLEVBQzVCLElBQUksZ0JBQWdCLEVBQ3BCLFNBQVM7QUFDZDtBQVFBLE9BQU8sVUFBVSxhQUFhLFdBQVk7QUFDeEMsU0FBTyxVQUFVLElBQWMsRUFDNUIsTUFBTSxnQkFBZ0IsRUFDdEIsU0FBUztBQUNkOyIsCiAgIm5hbWVzIjogWyJLZXlwYWlyIiwgIlB1YmxpY0tleSIsICJDb25zdGFudHMiLCAiV2Fybm5pbmdNZXNzYWdlIiwgIkNsdXN0ZXIiLCAiRW5kUG9pbnRVcmwiLCAiQnVuZGxyVXJsIiwgIkRhc0FwaVVybCIsICJOZnRzdG9yYWdlQXBpS2V5IiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJOb2RlIiwgIkNvbXB1dGVCdWRnZXRQcm9ncmFtIiwgIlB1YmxpY0tleSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tcHV0ZVVuaXQiLCAiUHVibGljS2V5IiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJQcmlvcml0eUZlZSIsICJDb21wdXRlQnVkZ2V0UHJvZ3JhbSIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiUmV0cnkiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb24iLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbiIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJUcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZXN1bHQiLCAiQWNjb3VudCIsICJBc3NvY2lhdGVkIiwgIlB1YmxpY0tleSIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiUHVibGljS2V5IiwgIkFjY291bnQiLCAiUGRhIiwgIkFjY291bnQiLCAiYnMiLCAiQWNjb3VudCIsICJQdWJsaWNLZXkiLCAiS2V5cGFpciJdCn0K