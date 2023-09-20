var __knownSymbol = (name, symbol) => {
  if (symbol = Symbol[name])
    return symbol;
  throw Error("Symbol." + name + " is not defined");
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var __forAwait = (obj, it, method) => (it = obj[__knownSymbol("asyncIterator")]) ? it.call(obj) : (obj = obj[__knownSymbol("iterator")](), it = {}, method = (key, fn) => (fn = obj[key]) && (it[key] = (arg) => new Promise((yes, no, done) => (arg = fn.call(obj, arg), done = arg.done, Promise.resolve(arg.value).then((value) => yes({ value, done }), no)))), method("next"), method("return"), it);

// src/airdrop.ts
import { Node, debugLog, Try } from "@solana-suite/shared";
var Airdrop;
((Airdrop2) => {
  const DEFAULT_AIRDROP_AMOUNT = 1;
  const MAX_AIRDROP_SOL = 2;
  Airdrop2.request = (pubkey, airdropAmount) => __async(void 0, null, function* () {
    return Try(() => __async(void 0, null, function* () {
      debugLog("Now airdropping...please wait");
      airdropAmount = !airdropAmount ? DEFAULT_AIRDROP_AMOUNT.toLamports() : airdropAmount.toLamports();
      if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
        throw Error(
          `Over max airdrop amount: ${airdropAmount}, max: ${MAX_AIRDROP_SOL.toLamports()}`
        );
      }
      const sig = yield Node.getConnection().requestAirdrop(
        pubkey.toPublicKey(),
        airdropAmount
      );
      yield Node.confirmedSig(sig);
      return "success";
    }));
  });
})(Airdrop || (Airdrop = {}));

// src/associated-account.ts
import {
  debugLog as debugLog2,
  Instruction,
  KeypairAccount,
  Node as Node2,
  sleep
} from "@solana-suite/shared";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError
} from "@solana/spl-token";
var AssociatedAccount;
((AssociatedAccount2) => {
  const RETRY_OVER_LIMIT = 10;
  const RETRY_SLEEP_TIME = 3;
  const get = (mint, owner, feePayer, allowOwnerOffCurve = false) => __async(void 0, null, function* () {
    const res = yield (0, AssociatedAccount2.makeOrCreateInstruction)(
      mint,
      owner,
      new KeypairAccount({ secret: feePayer }).pubkey,
      allowOwnerOffCurve
    );
    if (!res.inst) {
      return res.tokenAccount;
    }
    return new Instruction(
      [res.inst],
      [],
      feePayer.toKeypair(),
      res.tokenAccount
    );
  });
  AssociatedAccount2.retryGetOrCreate = (mint, owner, feePayer) => __async(void 0, null, function* () {
    let counter = 1;
    while (counter < RETRY_OVER_LIMIT) {
      try {
        const inst = yield get(mint, owner, feePayer, true);
        if (inst && typeof inst === "string") {
          debugLog2("# associatedTokenAccount: ", inst);
          return inst;
        } else if (inst instanceof Instruction) {
          (yield inst.submit()).map(
            (ok) => __async(void 0, null, function* () {
              yield Node2.confirmedSig(ok);
              return inst.data;
            }),
            (err) => {
              debugLog2("# Error submit retryGetOrCreate: ", err);
              throw err;
            }
          );
        }
      } catch (e) {
        debugLog2(`# retry: ${counter} create token account: `, e);
        debugLog2(`# mint: ${mint}, owner: ${owner}, feePayer: ${feePayer}`);
      }
      yield sleep(RETRY_SLEEP_TIME);
      counter++;
    }
    throw Error(`retry action is over limit ${RETRY_OVER_LIMIT}`);
  });
  AssociatedAccount2.makeOrCreateInstruction = (mint, owner, feePayer, allowOwnerOffCurve = false) => __async(void 0, null, function* () {
    const associatedTokenAccount = getAssociatedTokenAddressSync(
      mint.toPublicKey(),
      owner.toPublicKey(),
      allowOwnerOffCurve,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    debugLog2("# associatedTokenAccount: ", associatedTokenAccount.toString());
    try {
      yield getAccount(
        Node2.getConnection(),
        associatedTokenAccount,
        Node2.getConnection().commitment,
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
  });
})(AssociatedAccount || (AssociatedAccount = {}));

// src/memo/create.ts
import { TransactionInstruction } from "@solana/web3.js";
import { Constants, Instruction as Instruction2 } from "@solana-suite/shared";
import bs from "bs58";
var Memo;
((Memo4) => {
  Memo4.decode = (encoded) => bs.decode(encoded).toString();
  Memo4.encode = (data) => Buffer.from(data);
  Memo4.create = (data, owner, signer, feePayer) => {
    const key = owner.toPublicKey() ? [
      {
        pubkey: owner.toPublicKey(),
        isSigner: true,
        isWritable: true
      }
    ] : [];
    const instruction = new TransactionInstruction({
      programId: Constants.MEMO_PROGRAM_ID,
      data: (0, Memo4.encode)(data),
      keys: key
    });
    const payer = feePayer || signer;
    return new Instruction2(
      [instruction],
      [signer.toKeypair()],
      payer.toKeypair()
    );
  };
})(Memo || (Memo = {}));

// src/types/find.ts
var Sortable = /* @__PURE__ */ ((Sortable2) => {
  Sortable2["Asc"] = "asc";
  Sortable2["Desc"] = "desc";
  return Sortable2;
})(Sortable || {});

// src/types/transaction-filter.ts
var FilterType = /* @__PURE__ */ ((FilterType3) => {
  FilterType3["Memo"] = "memo";
  FilterType3["Mint"] = "mint";
  FilterType3["OnlyMemo"] = "only-memo";
  FilterType3["Transfer"] = "transfer";
  return FilterType3;
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

// src/convert/memo.ts
import { convertTimestampToDateTime } from "@solana-suite/shared";
var Convert;
((Convert7) => {
  let Memo4;
  ((Memo5) => {
    Memo5.intoUserSide = (output, meta, outputTransfer, mappingTokenAccount) => {
      var _a, _b;
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
      if (((_a = meta.meta) == null ? void 0 : _a.innerInstructions) && ((_b = meta.meta) == null ? void 0 : _b.innerInstructions.length) !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Memo4 = Convert7.Memo || (Convert7.Memo = {}));
})(Convert || (Convert = {}));

// src/convert/mint.ts
import { convertTimestampToDateTime as convertTimestampToDateTime2 } from "@solana-suite/shared";
var Convert2;
((Convert7) => {
  let Mint;
  ((Mint2) => {
    Mint2.intoUserSide = (output, meta) => {
      var _a, _b;
      const history = {};
      history.mint = output.parsed.info.mint;
      history.mintAuthority = output.parsed.info.mintAuthority;
      history.tokenAmount = output.parsed.info.tokenAmount;
      history.account = output.parsed.info.account;
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime2(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (((_a = meta.meta) == null ? void 0 : _a.innerInstructions) && ((_b = meta.meta) == null ? void 0 : _b.innerInstructions.length) !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Mint = Convert7.Mint || (Convert7.Mint = {}));
})(Convert2 || (Convert2 = {}));

// src/convert/transfer.ts
import { convertTimestampToDateTime as convertTimestampToDateTime3 } from "@solana-suite/shared";
var Convert3;
((Convert7) => {
  let Transfer;
  ((Transfer2) => {
    Transfer2.intoUserSide = (output, meta) => {
      var _a, _b, _c;
      const history = {};
      if (!output.parsed.info.destination || !output.parsed.info.lamports) {
        return;
      }
      history.source = output.parsed.info.source;
      history.destination = output.parsed.info.destination;
      history.sol = (_a = output.parsed.info.lamports) == null ? void 0 : _a.toSol().toString();
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime3(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (((_b = meta.meta) == null ? void 0 : _b.innerInstructions) && ((_c = meta.meta) == null ? void 0 : _c.innerInstructions.length) !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Transfer = Convert7.Transfer || (Convert7.Transfer = {}));
})(Convert3 || (Convert3 = {}));

// src/convert/transfer-checked.ts
import { convertTimestampToDateTime as convertTimestampToDateTime4 } from "@solana-suite/shared";
var Convert4;
((Convert7) => {
  let TransferChecked;
  ((TransferChecked2) => {
    TransferChecked2.intoUserSide = (output, meta, mappingTokenAccount) => {
      var _a, _b;
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
      history.dateTime = convertTimestampToDateTime4(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (((_a = meta.meta) == null ? void 0 : _a.innerInstructions) && ((_b = meta.meta) == null ? void 0 : _b.innerInstructions.length) !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(TransferChecked = Convert7.TransferChecked || (Convert7.TransferChecked = {}));
})(Convert4 || (Convert4 = {}));

// src/transaction-filter.ts
import { debugLog as debugLog3 } from "@solana-suite/shared";
var TransactionFilter;
((TransactionFilter2) => {
  const createPostTokenAccountList = (transaction) => {
    var _a, _b;
    const postTokenAccount = [];
    const accountKeys = transaction.transaction.message.accountKeys.map(
      (t) => t.pubkey.toString()
    );
    (_b = (_a = transaction.meta) == null ? void 0 : _a.postTokenBalances) == null ? void 0 : _b.forEach((t) => {
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
                debugLog3(
                  "# FilterType.Memo break instruction: ",
                  instructionTransfer
                );
                break;
              }
              history = Convert.Memo.intoUserSide(
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
              history = Convert.Memo.intoUserSide(
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
              history = Convert2.Mint.intoUserSide(instruction, txMeta);
            }
            break;
          }
          case "transfer" /* Transfer */:
            if (moduleName === instruction.program && FilterOptions.Transfer.action.includes(
              instruction.parsed.type
            )) {
              if (instruction.parsed.type === "transferChecked") {
                history = Convert4.TransferChecked.intoUserSide(
                  instruction,
                  txMeta,
                  postTokenAccount
                );
              } else {
                history = Convert3.Transfer.intoUserSide(
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

// src/signatures.ts
import { debugLog as debugLog4, Node as Node3, Result as Result2, sleep as sleep2 } from "@solana-suite/shared";
var Signatures;
((Signatures2) => {
  const parseForTransaction = (signature) => __async(void 0, null, function* () {
    const res = yield Node3.getConnection().getParsedTransaction(signature);
    if (!res) {
      return {};
    }
    return res;
  });
  Signatures2.getForAdress = (pubkey, parser, callback, narrowDown = 1e3) => __async(void 0, null, function* () {
    try {
      const transactions = yield Node3.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit: narrowDown
        }
      );
      debugLog4("# transactions count:", transactions.length);
      const histories = [];
      for (const transaction of transactions) {
        parseForTransaction(transaction.signature).then((signature) => {
          const history = parser(signature);
          if (history) {
            histories.push(history);
            callback(Result2.ok(histories));
          }
        }).catch((e) => callback(Result2.err(e)));
        yield sleep2(0.05);
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result2.err(e));
      }
    }
  });
})(Signatures || (Signatures = {}));

// src/memo/history.ts
var Memo2;
((Memo4) => {
  Memo4.getHistory = (target, onOk, onErr, narrowDown = 1e3) => __async(void 0, null, function* () {
    try {
      const parser = TransactionFilter.parse(
        "only-memo" /* OnlyMemo */,
        "system" /* SolNative */
      );
      yield Signatures.getForAdress(
        target,
        parser,
        (result) => result.match(onOk, onErr),
        narrowDown
      );
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  });
})(Memo2 || (Memo2 = {}));

// src/memo/index.ts
var Memo3 = Object.assign({}, Memo, Memo2);

// src/multisig/create.ts
import {
  Node as Node4,
  Instruction as Instruction3,
  Try as Try2
} from "@solana-suite/shared";
import { Keypair as Keypair2 } from "@solana/web3.js";

// src/multisig/instruction.ts
import {
  TransactionInstruction as TransactionInstruction2,
  SYSVAR_RENT_PUBKEY,
  SystemProgram
} from "@solana/web3.js";
import { struct, u8, blob } from "@solana/buffer-layout";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID2 } from "@solana/spl-token";
var Multisig;
((Multisig6) => {
  const createLayoutPubKey = (property) => {
    return blob(32, property);
  };
  Multisig6.Layout = struct([
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
  Multisig6.account = (newAccount, feePayer, balanceNeeded) => {
    return SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: balanceNeeded,
      space: Multisig6.Layout.span,
      programId: TOKEN_PROGRAM_ID2
    });
  };
  Multisig6.multisig = (m, feePayer, signerPubkey) => {
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
    return new TransactionInstruction2({
      keys,
      programId: TOKEN_PROGRAM_ID2,
      data
    });
  };
})(Multisig || (Multisig = {}));

// src/multisig/create.ts
var Multisig2;
((Multisig6) => {
  Multisig6.create = (m, feePayer, signerPubkeys) => __async(void 0, null, function* () {
    return Try2(() => __async(void 0, null, function* () {
      if (m > signerPubkeys.length) {
        throw Error("signers number less than m number");
      }
      const account = Keypair2.generate();
      const connection = Node4.getConnection();
      const balanceNeeded = yield connection.getMinimumBalanceForRentExemption(
        Multisig.Layout.span
      );
      const inst1 = Multisig.account(
        account,
        feePayer.toKeypair(),
        balanceNeeded
      );
      const inst2 = Multisig.multisig(
        m,
        account,
        signerPubkeys.map((pubkey) => pubkey.toPublicKey())
      );
      return new Instruction3(
        [inst1, inst2],
        [account],
        feePayer.toKeypair(),
        account.publicKey.toString()
      );
    }));
  });
})(Multisig2 || (Multisig2 = {}));

// src/multisig/get-info.ts
import { Node as Node5, Try as Try3 } from "@solana-suite/shared";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID3 } from "@solana/spl-token";
import { PublicKey as PublicKey2 } from "@solana/web3.js";
var Multisig3;
((Multisig6) => {
  Multisig6.getInfo = (multisig) => __async(void 0, null, function* () {
    return Try3(() => __async(void 0, null, function* () {
      const info = yield Node5.getConnection().getAccountInfo(
        multisig.toPublicKey()
      );
      if (info === null) {
        throw Error("Failed to find multisig");
      }
      if (!info.owner.equals(TOKEN_PROGRAM_ID3)) {
        throw Error("Invalid multisig owner");
      }
      if (info.data.length !== Multisig.Layout.span) {
        throw Error("Invalid multisig size");
      }
      const data = Buffer.from(info.data);
      const multisigInfo = Multisig.Layout.decode(data);
      multisigInfo.signer1 = new PublicKey2(multisigInfo.signer1);
      multisigInfo.signer2 = new PublicKey2(multisigInfo.signer2);
      multisigInfo.signer3 = new PublicKey2(multisigInfo.signer3);
      multisigInfo.signer4 = new PublicKey2(multisigInfo.signer4);
      multisigInfo.signer5 = new PublicKey2(multisigInfo.signer5);
      multisigInfo.signer6 = new PublicKey2(multisigInfo.signer6);
      multisigInfo.signer7 = new PublicKey2(multisigInfo.signer7);
      multisigInfo.signer8 = new PublicKey2(multisigInfo.signer8);
      multisigInfo.signer9 = new PublicKey2(multisigInfo.signer9);
      multisigInfo.signer10 = new PublicKey2(multisigInfo.signer10);
      multisigInfo.signer11 = new PublicKey2(multisigInfo.signer11);
      return multisigInfo;
    }));
  });
})(Multisig3 || (Multisig3 = {}));

// src/multisig/is-address.ts
import { Try as Try4 } from "@solana-suite/shared";
var Multisig4;
((Multisig6) => {
  Multisig6.isAddress = (multisig) => __async(void 0, null, function* () {
    return Try4(() => __async(void 0, null, function* () {
      const info = yield Multisig3.getInfo(multisig);
      if (info.isErr) {
        return false;
      }
      return true;
    }));
  });
})(Multisig4 || (Multisig4 = {}));

// src/multisig/index.ts
var Multisig5 = Object.assign({}, Multisig2, Multisig3, Multisig4);

// src/sol-native/find.ts
import { Node as Node6, Try as Try5 } from "@solana-suite/shared";
var SolNative;
((SolNative7) => {
  SolNative7.findByOwner = (owner) => __async(void 0, null, function* () {
    return Try5(() => __async(void 0, null, function* () {
      var _a, _b, _c, _d, _e, _f;
      const res = yield Node6.getConnection().getParsedAccountInfo(
        owner.toPublicKey()
      );
      const info = {
        sol: 0,
        lamports: 0,
        owner: owner.toString()
      };
      if (TransactionFilter.isParsedInstruction((_a = res.value) == null ? void 0 : _a.data)) {
        const parsedAccountData = (_b = res.value) == null ? void 0 : _b.data;
        info.owner = (_d = (_c = parsedAccountData.parsed) == null ? void 0 : _c.info) == null ? void 0 : _d.owner;
      }
      if (res.value) {
        info.lamports = (_e = res.value) == null ? void 0 : _e.lamports;
        info.sol = (_f = res.value) == null ? void 0 : _f.lamports.toSol();
      }
      return info;
    }));
  });
})(SolNative || (SolNative = {}));

// src/sol-native/fee-payer-partial-sign-transfer.ts
import { SystemProgram as SystemProgram2, Transaction } from "@solana/web3.js";
import {
  Node as Node7,
  PartialSignInstruction,
  Try as Try6
} from "@solana-suite/shared";
var SolNative2;
((SolNative7) => {
  const RADIX = 10;
  SolNative7.feePayerPartialSignTransfer = (owner, dest, signers, amount, feePayer) => __async(void 0, null, function* () {
    return Try6(() => __async(void 0, null, function* () {
      const blockHashObj = yield Node7.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        blockhash: blockHashObj.blockhash,
        lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
        feePayer: feePayer.toPublicKey()
      }).add(
        SystemProgram2.transfer({
          fromPubkey: owner.toPublicKey(),
          toPubkey: dest.toPublicKey(),
          lamports: parseInt(`${amount.toLamports()}`, RADIX)
        })
      );
      signers.forEach((signer) => {
        tx.partialSign(signer.toKeypair());
      });
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new PartialSignInstruction(hex);
    }));
  });
})(SolNative2 || (SolNative2 = {}));

// src/sol-native/history.ts
var SolNative3;
((SolNative7) => {
  SolNative7.getHistory = (target, filterType, onOk, onErr, narrowDown = 1e3) => __async(void 0, null, function* () {
    try {
      const parser = TransactionFilter.parse(filterType, "system" /* SolNative */);
      yield Signatures.getForAdress(
        target,
        parser,
        (result) => __async(void 0, null, function* () {
          return yield result.match(onOk, onErr);
        }),
        narrowDown
      );
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  });
})(SolNative3 || (SolNative3 = {}));

// src/sol-native/transfer.ts
import { SystemProgram as SystemProgram3 } from "@solana/web3.js";
import { Instruction as Instruction4, Try as Try7 } from "@solana-suite/shared";
var SolNative4;
((SolNative7) => {
  const RADIX = 10;
  SolNative7.transfer = (source, dest, signers, amount, feePayer) => {
    return Try7(() => {
      const inst = SystemProgram3.transfer({
        fromPubkey: source.toPublicKey(),
        toPubkey: dest.toPublicKey(),
        lamports: parseInt(`${amount.toLamports()}`, RADIX)
      });
      const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
      return new Instruction4(
        [inst],
        signers.map((s) => s.toKeypair()),
        payer
      );
    });
  };
})(SolNative4 || (SolNative4 = {}));

// src/sol-native/transfer-with-multisig.ts
import {
  createWrappedNativeAccount,
  createMint,
  createTransferInstruction,
  createCloseAccountInstruction
} from "@solana/spl-token";
import {
  Node as Node8,
  Instruction as Instruction5,
  debugLog as debugLog5,
  Try as Try8
} from "@solana-suite/shared";
var SolNative5;
((SolNative7) => {
  const RADIX = 10;
  SolNative7.transferWithMultisig = (owner, dest, signers, amount, feePayer) => __async(void 0, null, function* () {
    return Try8(() => __async(void 0, null, function* () {
      const connection = Node8.getConnection();
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const wrapped = yield createWrappedNativeAccount(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        parseInt(`${amount.toLamports()}`, RADIX)
      );
      debugLog5("# wrapped sol: ", wrapped.toBase58());
      const token = yield createMint(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        owner.toPublicKey(),
        0
      );
      const sourceToken = yield AssociatedAccount.retryGetOrCreate(
        token.toString(),
        owner,
        payer
      );
      debugLog5("# sourceToken: ", sourceToken);
      const destToken = yield AssociatedAccount.retryGetOrCreate(
        token.toString(),
        wrapped.toString(),
        payer
      );
      debugLog5("# destToken: ", destToken);
      const inst1 = createTransferInstruction(
        sourceToken.toPublicKey(),
        destToken.toPublicKey(),
        owner.toPublicKey(),
        parseInt(`${amount}`, RADIX),
        // No lamports, its sol
        keypairs
      );
      const inst2 = createCloseAccountInstruction(
        wrapped,
        dest.toPublicKey(),
        owner.toPublicKey(),
        keypairs
      );
      return new Instruction5(
        [inst1, inst2],
        signers.map((s) => s.toKeypair()),
        feePayer == null ? void 0 : feePayer.toKeypair()
      );
    }));
  });
})(SolNative5 || (SolNative5 = {}));

// src/sol-native/index.ts
var SolNative6 = Object.assign(
  {},
  SolNative,
  SolNative2,
  SolNative3,
  SolNative4,
  SolNative5
);

// src/spl-token/add.ts
import { createMintToCheckedInstruction } from "@solana/spl-token";
import { Instruction as Instruction6, Try as Try9 } from "@solana-suite/shared";

// src/spl-token/calculate-amount.ts
var SplToken;
((SplToken12) => {
  SplToken12.calculateAmount = (amount, mintDecimal) => {
    return amount * 10 ** mintDecimal;
  };
})(SplToken || (SplToken = {}));

// src/spl-token/add.ts
var SplToken2;
((SplToken12) => {
  SplToken12.add = (token, owner, signers, totalAmount, mintDecimal, feePayer) => __async(void 0, null, function* () {
    return Try9(() => __async(void 0, null, function* () {
      const payer = !feePayer ? signers[0] : feePayer;
      const keypairs = signers.map((s) => s.toKeypair());
      const tokenAssociated = yield AssociatedAccount.retryGetOrCreate(
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
      return new Instruction6([inst], keypairs, payer.toKeypair(), token);
    }));
  });
})(SplToken2 || (SplToken2 = {}));

// src/spl-token/burn.ts
import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync2
} from "@solana/spl-token";
import { Instruction as Instruction7, Try as Try10 } from "@solana-suite/shared";
var SplToken3;
((SplToken12) => {
  SplToken12.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => {
    return Try10(() => {
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
      return new Instruction7([inst], keypairs, payer);
    });
  };
})(SplToken3 || (SplToken3 = {}));

// src/spl-token/find.ts
import { debugLog as debugLog6, Node as Node9, Result as Result12 } from "@solana-suite/shared";
import {
  Convert as Convert5,
  Pda,
  UserSideInput
} from "internals/shared-metaplex";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID4 } from "@solana/spl-token";
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
      return Convert5.TokenMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else if (tokenStandard === UserSideInput.TokenStandard.NonFungible) {
      return Convert5.NftMetadata.intoUserSide(
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
  SplToken12.genericFindByOwner = (owner, callback, tokenStandard, sortable, isHolder) => __async(void 0, null, function* () {
    try {
      let data = [];
      const connection = Node9.getConnection();
      const info = yield connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID4
        }
      );
      info.value.length === 0 && callback(Result12.ok([]));
      try {
        for (var iter = __forAwait(info.value), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const d = temp.value;
          if (isHolder && d.account.data.parsed.info.tokenAmount.uiAmount < 1) {
            debugLog6(
              "# findByOwner no hold metadata: ",
              d.account.data.parsed.info
            );
            continue;
          }
          const mint = d.account.data.parsed.info.mint;
          const tokenAmount = d.account.data.parsed.info.tokenAmount.amount;
          try {
            const metadata = yield Metadata.fromAccountAddress(
              connection,
              Pda.getMetadata(mint)
            );
            debugLog6("# findByOwner metadata: ", metadata);
            if (metadata.tokenStandard !== tokenStandard) {
              continue;
            }
            fetch(metadata.data.uri).then((response) => {
              response.json().then((json) => {
                data.push(
                  converter(tokenStandard, metadata, json, tokenAmount)
                );
                callback(Result12.ok(data));
              }).catch((e) => {
                callback(Result12.err(e));
              }).finally(() => {
                const descAlgo = sortByUinixTimestamp("desc" /* Desc */);
                const ascAlgo = sortByUinixTimestamp("asc" /* Asc */);
                if (sortable === "desc" /* Desc */) {
                  data = data.sort(descAlgo);
                } else if (sortable === "asc" /* Asc */) {
                  data = data.sort(ascAlgo);
                }
                callback(Result12.ok(data));
              });
            }).catch((e) => {
              callback(Result12.err(e));
            });
          } catch (e) {
            if (e instanceof Error && UNABLE_ERROR_REGEX.test(e.message)) {
              debugLog6("# skip error for old SPL-TOKEN: ", mint);
              continue;
            }
          }
        }
      } catch (temp) {
        error = [temp];
      } finally {
        try {
          more && (temp = iter.return) && (yield temp.call(iter));
        } finally {
          if (error)
            throw error[0];
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result12.err(e));
      }
    }
  });
  SplToken12.genericFindByMint = (mint, tokenStandard) => __async(void 0, null, function* () {
    var _a;
    try {
      const connection = Node9.getConnection();
      const metadata = yield Metadata.fromAccountAddress(
        connection,
        Pda.getMetadata(mint)
      );
      debugLog6("# findByMint metadata: ", metadata);
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error("token standards are different");
      }
      const info = yield connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = ((_a = info.value) == null ? void 0 : _a.data).parsed.info.supply;
      const response = yield (yield fetch(metadata.data.uri)).json();
      return Result12.ok(
        converter(tokenStandard, metadata, response, tokenAmount)
      );
    } catch (e) {
      return Result12.err(e);
    }
  });
  SplToken12.findByOwner = (owner, onOk, onErr, options) => {
    const sortable = !(options == null ? void 0 : options.sortable) ? "desc" /* Desc */ : options == null ? void 0 : options.sortable;
    const isHolder = !(options == null ? void 0 : options.isHolder) ? true : false;
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
  SplToken12.findByMint = (mint) => __async(void 0, null, function* () {
    return yield (0, SplToken12.genericFindByMint)(
      mint,
      UserSideInput.TokenStandard.Fungible
    );
  });
})(SplToken4 || (SplToken4 = {}));

// src/spl-token/freeze.ts
import {
  Instruction as Instruction8,
  KeypairAccount as KeypairAccount2,
  Try as Try11
} from "@solana-suite/shared";
import {
  createFreezeAccountInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync3
} from "@solana/spl-token";
var SplToken5;
((SplToken12) => {
  SplToken12.freeze = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try11(() => {
      const tokenAccount = getAssociatedTokenAddressSync3(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = createFreezeAccountInstruction(
        tokenAccount,
        mint.toPublicKey(),
        new KeypairAccount2({ secret: freezeAuthority }).toPublicKey()
      );
      return new Instruction8(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// src/spl-token/fee-payer-partial-sign-transfer.ts
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { Transaction as Transaction2 } from "@solana/web3.js";
import {
  Node as Node10,
  PartialSignInstruction as PartialSignInstruction2,
  Try as Try12
} from "@solana-suite/shared";
var SplToken6;
((SplToken12) => {
  SplToken12.feePayerPartialSignTransfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __async(void 0, null, function* () {
    return Try12(() => __async(void 0, null, function* () {
      const keypairs = signers.map((s) => s.toKeypair());
      const sourceToken = yield AssociatedAccount.makeOrCreateInstruction(
        mint,
        owner,
        feePayer
      );
      const destToken = yield AssociatedAccount.makeOrCreateInstruction(
        mint,
        dest,
        feePayer
      );
      let inst2;
      const blockhashObj = yield Node10.getConnection().getLatestBlockhash();
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
      return new PartialSignInstruction2(hex);
    }));
  });
})(SplToken6 || (SplToken6 = {}));

// src/spl-token/history.ts
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID5 } from "@solana/spl-token";
import { Node as Node11 } from "@solana-suite/shared";
var SplToken7;
((SplToken12) => {
  SplToken12.getHistory = (target, filterType, onOk, onErr, narrowDown = 1e3) => __async(void 0, null, function* () {
    try {
      if (filterType === "memo" /* Memo */) {
        const parser = TransactionFilter.parse(filterType, "spl-token" /* SplToken */);
        yield Signatures.getForAdress(
          target,
          parser,
          (result) => result.match(onOk, onErr),
          narrowDown
        );
      } else {
        const tokenAccounts = yield Node11.getConnection().getParsedTokenAccountsByOwner(
          target.toPublicKey(),
          {
            programId: TOKEN_PROGRAM_ID5
          }
        );
        for (const account of tokenAccounts.value) {
          const parser = TransactionFilter.parse(
            filterType,
            "spl-token" /* SplToken */
          );
          yield Signatures.getForAdress(
            account.pubkey.toString(),
            parser,
            (result) => result.match(onOk, onErr),
            narrowDown
          );
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  });
})(SplToken7 || (SplToken7 = {}));

// src/spl-token/mint.ts
import {
  SystemProgram as SystemProgram4
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
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID6
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction
} from "@metaplex-foundation/mpl-token-metadata";
import {
  debugLog as debugLog7,
  KeypairAccount as KeypairAccount3,
  MintInstruction,
  Node as Node12,
  Try as Try13
} from "@solana-suite/shared";
import {
  Convert as Convert6,
  Pda as Pda2,
  Validator
} from "internals/shared-metaplex";
import { Storage } from "internals/storage";
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
  SplToken12.createMintInstructions = (mint2, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => __async(void 0, null, function* () {
    const connection = Node12.getConnection();
    const lamports = yield getMinimumBalanceForRentExemptMint(connection);
    const metadataPda = Pda2.getMetadata(mint2.toString());
    const tokenAssociated = getAssociatedTokenAddressSync4(mint2, owner);
    const inst1 = SystemProgram4.createAccount({
      fromPubkey: feePayer,
      newAccountPubkey: mint2,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID6
    });
    const inst2 = createInitializeMintInstruction(
      mint2,
      mintDecimal,
      owner,
      owner,
      TOKEN_PROGRAM_ID6
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
  });
  SplToken12.mint = (owner, signer, totalAmount, mintDecimal, input, feePayer, freezeAuthority) => __async(void 0, null, function* () {
    return Try13(() => __async(void 0, null, function* () {
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
        const uploaded = yield Storage.uploadMetaAndContent(
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
      const datav2 = Convert6.TokenMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      debugLog7("# datav2: ", datav2);
      debugLog7("# upload content url: ", uri);
      const mint2 = KeypairAccount3.create();
      const insts = yield (0, SplToken12.createMintInstructions)(
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
    }));
  });
})(SplToken8 || (SplToken8 = {}));

// src/spl-token/thaw.ts
import {
  KeypairAccount as KeypairAccount4,
  Instruction as Instruction9,
  Try as Try14
} from "@solana-suite/shared";
import {
  createThawAccountInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync5
} from "@solana/spl-token";
var SplToken9;
((SplToken12) => {
  SplToken12.thaw = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try14(() => {
      const tokenAccount = getAssociatedTokenAddressSync5(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = createThawAccountInstruction(
        tokenAccount,
        mint.toPublicKey(),
        new KeypairAccount4({ secret: freezeAuthority }).toPublicKey()
      );
      return new Instruction9(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken9 || (SplToken9 = {}));

// src/spl-token/transfer.ts
import { createTransferCheckedInstruction as createTransferCheckedInstruction2 } from "@solana/spl-token";
import { Instruction as Instruction10, Try as Try15 } from "@solana-suite/shared";
var SplToken10;
((SplToken12) => {
  SplToken12.transfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __async(void 0, null, function* () {
    return Try15(() => __async(void 0, null, function* () {
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const sourceToken = yield AssociatedAccount.retryGetOrCreate(
        mint,
        owner,
        payer
      );
      const destToken = yield AssociatedAccount.retryGetOrCreate(
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
      return new Instruction10([inst], keypairs, payer.toKeypair());
    }));
  });
})(SplToken10 || (SplToken10 = {}));

// src/spl-token/index.ts
var SplToken11 = Object.assign(
  {},
  SplToken2,
  SplToken3,
  SplToken4,
  SplToken5,
  SplToken6,
  SplToken7,
  SplToken8,
  SplToken9,
  SplToken10
);
export {
  Airdrop,
  AssociatedAccount,
  FilterOptions,
  FilterType,
  Memo3 as Memo,
  ModuleName,
  Multisig5 as Multisig,
  SolNative6 as SolNative,
  Sortable,
  SplToken11 as SplToken
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FpcmRyb3AudHMiLCAiLi4vc3JjL2Fzc29jaWF0ZWQtYWNjb3VudC50cyIsICIuLi9zcmMvbWVtby9jcmVhdGUudHMiLCAiLi4vc3JjL3R5cGVzL2ZpbmQudHMiLCAiLi4vc3JjL3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlci50cyIsICIuLi9zcmMvY29udmVydC9tZW1vLnRzIiwgIi4uL3NyYy9jb252ZXJ0L21pbnQudHMiLCAiLi4vc3JjL2NvbnZlcnQvdHJhbnNmZXIudHMiLCAiLi4vc3JjL2NvbnZlcnQvdHJhbnNmZXItY2hlY2tlZC50cyIsICIuLi9zcmMvdHJhbnNhY3Rpb24tZmlsdGVyLnRzIiwgIi4uL3NyYy9zaWduYXR1cmVzLnRzIiwgIi4uL3NyYy9tZW1vL2hpc3RvcnkudHMiLCAiLi4vc3JjL21lbW8vaW5kZXgudHMiLCAiLi4vc3JjL211bHRpc2lnL2NyZWF0ZS50cyIsICIuLi9zcmMvbXVsdGlzaWcvaW5zdHJ1Y3Rpb24udHMiLCAiLi4vc3JjL211bHRpc2lnL2dldC1pbmZvLnRzIiwgIi4uL3NyYy9tdWx0aXNpZy9pcy1hZGRyZXNzLnRzIiwgIi4uL3NyYy9tdWx0aXNpZy9pbmRleC50cyIsICIuLi9zcmMvc29sLW5hdGl2ZS9maW5kLnRzIiwgIi4uL3NyYy9zb2wtbmF0aXZlL2ZlZS1wYXllci1wYXJ0aWFsLXNpZ24tdHJhbnNmZXIudHMiLCAiLi4vc3JjL3NvbC1uYXRpdmUvaGlzdG9yeS50cyIsICIuLi9zcmMvc29sLW5hdGl2ZS90cmFuc2Zlci50cyIsICIuLi9zcmMvc29sLW5hdGl2ZS90cmFuc2Zlci13aXRoLW11bHRpc2lnLnRzIiwgIi4uL3NyYy9zb2wtbmF0aXZlL2luZGV4LnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vYWRkLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vY2FsY3VsYXRlLWFtb3VudC50cyIsICIuLi9zcmMvc3BsLXRva2VuL2J1cm4udHMiLCAiLi4vc3JjL3NwbC10b2tlbi9maW5kLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vZnJlZXplLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlci50cyIsICIuLi9zcmMvc3BsLXRva2VuL2hpc3RvcnkudHMiLCAiLi4vc3JjL3NwbC10b2tlbi9taW50LnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vdGhhdy50cyIsICIuLi9zcmMvc3BsLXRva2VuL3RyYW5zZmVyLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IE5vZGUsIFJlc3VsdCwgZGVidWdMb2csIFRyeSwgUHVia2V5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFpcmRyb3Age1xuICBjb25zdCBERUZBVUxUX0FJUkRST1BfQU1PVU5UID0gMTtcbiAgY29uc3QgTUFYX0FJUkRST1BfU09MID0gMjtcblxuICBleHBvcnQgY29uc3QgcmVxdWVzdCA9IGFzeW5jIChcbiAgICBwdWJrZXk6IFB1YmtleSxcbiAgICBhaXJkcm9wQW1vdW50PzogbnVtYmVyLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJ05vdyBhaXJkcm9wcGluZy4uLnBsZWFzZSB3YWl0Jyk7XG5cbiAgICAgIGFpcmRyb3BBbW91bnQgPSAhYWlyZHJvcEFtb3VudFxuICAgICAgICA/IERFRkFVTFRfQUlSRFJPUF9BTU9VTlQudG9MYW1wb3J0cygpXG4gICAgICAgIDogYWlyZHJvcEFtb3VudC50b0xhbXBvcnRzKCk7XG5cbiAgICAgIGlmIChhaXJkcm9wQW1vdW50ID4gTUFYX0FJUkRST1BfU09MLnRvTGFtcG9ydHMoKSkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgT3ZlciBtYXggYWlyZHJvcCBhbW91bnQ6ICR7YWlyZHJvcEFtb3VudH0sIG1heDogJHtNQVhfQUlSRFJPUF9TT0wudG9MYW1wb3J0cygpfWAsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNpZyA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJlcXVlc3RBaXJkcm9wKFxuICAgICAgICBwdWJrZXkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYWlyZHJvcEFtb3VudCxcbiAgICAgICk7XG4gICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhzaWcpO1xuICAgICAgcmV0dXJuICdzdWNjZXNzJztcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBJbnN0cnVjdGlvbixcbiAgS2V5cGFpckFjY291bnQsXG4gIE5vZGUsXG4gIFB1YmtleSxcbiAgU2VjcmV0LFxuICBzbGVlcCxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFjY291bnQsXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBUT0tFTl9QUk9HUkFNX0lELFxuICBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yLFxuICBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcixcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG4vKipcbiAqIEdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICpcbiAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICogQHBhcmFtIHtib29sZWFufSBhbGxvd093bmVyT2ZmQ3VydmVcbiAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nIHwgSW5zdHJ1Y3Rpb24+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQXNzb2NpYXRlZEFjY291bnQge1xuICBjb25zdCBSRVRSWV9PVkVSX0xJTUlUID0gMTA7XG4gIGNvbnN0IFJFVFJZX1NMRUVQX1RJTUUgPSAzO1xuICBjb25zdCBnZXQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgKTogUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj4gPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgbmV3IEtleXBhaXJBY2NvdW50KHsgc2VjcmV0OiBmZWVQYXllciB9KS5wdWJrZXksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgKTtcblxuICAgIGlmICghcmVzLmluc3QpIHtcbiAgICAgIHJldHVybiByZXMudG9rZW5BY2NvdW50O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICBbcmVzLmluc3RdLFxuICAgICAgW10sXG4gICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgIHJlcy50b2tlbkFjY291bnQsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0cnkgZnVuY3Rpb24gaWYgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHJldHJ5R2V0T3JDcmVhdGUgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICBsZXQgY291bnRlciA9IDE7XG4gICAgd2hpbGUgKGNvdW50ZXIgPCBSRVRSWV9PVkVSX0xJTUlUKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpbnN0ID0gYXdhaXQgZ2V0KG1pbnQsIG93bmVyLCBmZWVQYXllciwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKGluc3QgJiYgdHlwZW9mIGluc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgaW5zdCk7XG4gICAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zdCBpbnN0YW5jZW9mIEluc3RydWN0aW9uKSB7XG4gICAgICAgICAgKGF3YWl0IGluc3Quc3VibWl0KCkpLm1hcChcbiAgICAgICAgICAgIGFzeW5jIChvaykgPT4ge1xuICAgICAgICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhvayk7XG4gICAgICAgICAgICAgIHJldHVybiBpbnN0LmRhdGEgYXMgc3RyaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgZGVidWdMb2coJyMgRXJyb3Igc3VibWl0IHJldHJ5R2V0T3JDcmVhdGU6ICcsIGVycik7XG4gICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkZWJ1Z0xvZyhgIyByZXRyeTogJHtjb3VudGVyfSBjcmVhdGUgdG9rZW4gYWNjb3VudDogYCwgZSk7XG4gICAgICAgIGRlYnVnTG9nKGAjIG1pbnQ6ICR7bWludH0sIG93bmVyOiAke293bmVyfSwgZmVlUGF5ZXI6ICR7ZmVlUGF5ZXJ9YCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzbGVlcChSRVRSWV9TTEVFUF9USU1FKTtcbiAgICAgIGNvdW50ZXIrKztcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoYHJldHJ5IGFjdGlvbiBpcyBvdmVyIGxpbWl0ICR7UkVUUllfT1ZFUl9MSU1JVH1gKTtcbiAgfTtcblxuICAvKipcbiAgICogW01haW4gbG9naWNdR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAgICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgKTogUHJvbWlzZTx7XG4gICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgfT4gPT4ge1xuICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICk7XG5cbiAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgYXdhaXQgZ2V0QWNjb3VudChcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLmNvbW1pdG1lbnQsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IpICYmXG4gICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcilcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBlcnJvcicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgIGluc3QsXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbnN0YW50cywgSW5zdHJ1Y3Rpb24sIFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE1lbW8ge1xuICBleHBvcnQgY29uc3QgZGVjb2RlID0gKGVuY29kZWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGJzLmRlY29kZShlbmNvZGVkKS50b1N0cmluZygpO1xuXG4gIGV4cG9ydCBjb25zdCBlbmNvZGUgPSAoZGF0YTogc3RyaW5nKTogQnVmZmVyID0+IEJ1ZmZlci5mcm9tKGRhdGEpO1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGUgPSAoXG4gICAgZGF0YTogc3RyaW5nLFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyOiBTZWNyZXQsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IEluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXkgPSBvd25lci50b1B1YmxpY0tleSgpXG4gICAgICA/IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwdWJrZXk6IG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBpc1NpZ25lcjogdHJ1ZSxcbiAgICAgICAgICAgIGlzV3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgICAgOiBbXTtcblxuICAgIGNvbnN0IGluc3RydWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAgcHJvZ3JhbUlkOiBDb25zdGFudHMuTUVNT19QUk9HUkFNX0lELFxuICAgICAgZGF0YTogZW5jb2RlKGRhdGEpLFxuICAgICAga2V5czoga2V5LFxuICAgIH0pO1xuXG4gICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciB8fCBzaWduZXI7XG5cbiAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgW2luc3RydWN0aW9uXSxcbiAgICAgIFtzaWduZXIudG9LZXlwYWlyKCldLFxuICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBVc2VyU2lkZU91dHB1dCB9IGZyb20gJ2ludGVybmFscy9zaGFyZWQtbWV0YXBsZXgnO1xuXG5leHBvcnQgZW51bSBTb3J0YWJsZSB7XG4gIEFzYyA9ICdhc2MnLFxuICBEZXNjID0gJ2Rlc2MnLFxufVxuXG5leHBvcnQgdHlwZSBUb2tlbk1ldGFkYXRhID0gVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YTtcbiIsICJleHBvcnQgZW51bSBGaWx0ZXJUeXBlIHtcbiAgTWVtbyA9ICdtZW1vJyxcbiAgTWludCA9ICdtaW50JyxcbiAgT25seU1lbW8gPSAnb25seS1tZW1vJyxcbiAgVHJhbnNmZXIgPSAndHJhbnNmZXInLFxufVxuXG5leHBvcnQgZW51bSBNb2R1bGVOYW1lIHtcbiAgU29sTmF0aXZlID0gJ3N5c3RlbScsXG4gIFNwbFRva2VuID0gJ3NwbC10b2tlbicsXG59XG5cbmV4cG9ydCBjb25zdCBGaWx0ZXJPcHRpb25zID0ge1xuICBUcmFuc2Zlcjoge1xuICAgIHByb2dyYW06IFsnc3lzdGVtJywgJ3NwbC10b2tlbiddLFxuICAgIGFjdGlvbjogWyd0cmFuc2ZlcicsICd0cmFuc2ZlckNoZWNrZWQnXSxcbiAgfSxcbiAgTWVtbzoge1xuICAgIHByb2dyYW06IFsnc3BsLW1lbW8nXSxcbiAgICBhY3Rpb246IFsnKiddLFxuICB9LFxuICBNaW50OiB7XG4gICAgcHJvZ3JhbTogWydzcGwtdG9rZW4nXSxcbiAgICBhY3Rpb246IFsnbWludFRvJywgJ21pbnRUb0NoZWNrZWQnXSxcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIFBvc3RUb2tlbkFjY291bnQgPSB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgb3duZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFdpdGhNZW1vID0ge1xuICBzaWc6IHN0cmluZ1tdO1xuICBtZW1vOiBzdHJpbmc7XG59O1xuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgSW5mcmFTaWRlT3V0cHV0LCBQb3N0VG9rZW5BY2NvdW50LCBVc2VyU2lkZU91dHB1dCB9IGZyb20gJy4uL3R5cGVzLyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0Lk1lbW8ge1xuICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk1lbW8sXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICBvdXRwdXRUcmFuc2Zlcj86IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgKTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgaGlzdG9yeTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSA9IHt9O1xuXG4gICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtID09PSAnc3BsLXRva2VuJykge1xuICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhpc3RvcnkubWVtbyA9IG91dHB1dC5wYXJzZWQ7XG4gICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICcuLi90eXBlcy8nO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydC5NaW50IHtcbiAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5NaW50VG8sXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgKTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgaGlzdG9yeTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSA9IHt9O1xuXG4gICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICBoaXN0b3J5LmFjY291bnQgPSBvdXRwdXQucGFyc2VkLmluZm8uYWNjb3VudDtcbiAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICcuLi90eXBlcy8nO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydC5UcmFuc2ZlciB7XG4gIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuVHJhbnNmZXIsXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgKTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgaGlzdG9yeTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSA9IHt9O1xuXG4gICAgLy8gdmFsaWRhdGlvbiBjaGVja1xuICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICBoaXN0b3J5LnNvbCA9IG91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cz8udG9Tb2woKS50b1N0cmluZygpO1xuICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgaWYgKFxuICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICApIHtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhpc3Rvcnk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQsIFBvc3RUb2tlbkFjY291bnQsIFVzZXJTaWRlT3V0cHV0IH0gZnJvbSAnLi4vdHlwZXMvJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnQuVHJhbnNmZXJDaGVja2VkIHtcbiAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICApOiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBoaXN0b3J5OiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5ID0ge307XG5cbiAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCkge1xuICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICApO1xuICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICApO1xuICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICB9XG5cbiAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgIGhpc3RvcnkubXVsdGlzaWdBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubXVsdGlzaWdBdXRob3JpdHk7XG4gICAgaGlzdG9yeS5zaWduZXJzID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNpZ25lcnM7XG4gICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0IGFzIF9NZW1vIH0gZnJvbSAnLi9jb252ZXJ0L21lbW8nO1xuaW1wb3J0IHsgQ29udmVydCBhcyBfTWludCB9IGZyb20gJy4vY29udmVydC9taW50JztcbmltcG9ydCB7IENvbnZlcnQgYXMgX1RyYW5zZmVyIH0gZnJvbSAnLi9jb252ZXJ0L3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnQgYXMgX1RyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vY29udmVydC90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IFBhcnNlZEluc3RydWN0aW9uLCBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIEZpbHRlck9wdGlvbnMsXG4gIEZpbHRlclR5cGUsXG4gIE1vZHVsZU5hbWUsXG4gIFBvc3RUb2tlbkFjY291bnQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG4vL0BpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkZpbHRlciB7XG4gIGNvbnN0IGNyZWF0ZVBvc3RUb2tlbkFjY291bnRMaXN0ID0gKFxuICAgIHRyYW5zYWN0aW9uOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICApOiBQb3N0VG9rZW5BY2NvdW50W10gPT4ge1xuICAgIGNvbnN0IHBvc3RUb2tlbkFjY291bnQ6IFBvc3RUb2tlbkFjY291bnRbXSA9IFtdO1xuICAgIGNvbnN0IGFjY291bnRLZXlzID0gdHJhbnNhY3Rpb24udHJhbnNhY3Rpb24ubWVzc2FnZS5hY2NvdW50S2V5cy5tYXAoKHQpID0+XG4gICAgICB0LnB1YmtleS50b1N0cmluZygpLFxuICAgICk7XG5cbiAgICB0cmFuc2FjdGlvbi5tZXRhPy5wb3N0VG9rZW5CYWxhbmNlcz8uZm9yRWFjaCgodCkgPT4ge1xuICAgICAgaWYgKGFjY291bnRLZXlzW3QuYWNjb3VudEluZGV4XSAmJiB0Lm93bmVyKSB7XG4gICAgICAgIGNvbnN0IHYgPSB7XG4gICAgICAgICAgYWNjb3VudDogYWNjb3VudEtleXNbdC5hY2NvdW50SW5kZXhdLFxuICAgICAgICAgIG93bmVyOiB0Lm93bmVyLFxuICAgICAgICB9O1xuICAgICAgICBwb3N0VG9rZW5BY2NvdW50LnB1c2godik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBvc3RUb2tlbkFjY291bnQ7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzUGFyc2VkSW5zdHJ1Y3Rpb24gPSAoXG4gICAgYXJnOiB1bmtub3duLFxuICApOiBhcmcgaXMgUGFyc2VkSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBhcmcgIT09IG51bGwgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgJ3BhcnNlZCcgaW4gYXJnO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBwYXJzZSA9XG4gICAgKGZpbHRlclR5cGU6IEZpbHRlclR5cGUsIG1vZHVsZU5hbWU6IE1vZHVsZU5hbWUpID0+XG4gICAgKHR4TWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSk6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgbGV0IGhpc3Rvcnk6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnkgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZmlsdGVyVHlwZSA9PT0gRmlsdGVyVHlwZS5NaW50ICYmXG4gICAgICAgIG1vZHVsZU5hbWUgPT09IE1vZHVsZU5hbWUuU29sTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgXCJUaGlzIGZpbHRlclR5cGUoJ0ZpbHRlclR5cGUuTWludCcpIGNhbiBub3QgdXNlIGZyb20gU29sTmF0aXZlIG1vZHVsZVwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXR4TWV0YSkge1xuICAgICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcG9zdFRva2VuQWNjb3VudCA9IGNyZWF0ZVBvc3RUb2tlbkFjY291bnRMaXN0KHR4TWV0YSk7XG5cbiAgICAgIHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICBpZiAoaXNQYXJzZWRJbnN0cnVjdGlvbihpbnN0cnVjdGlvbikpIHtcbiAgICAgICAgICBzd2l0Y2ggKGZpbHRlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5NZW1vOiB7XG4gICAgICAgICAgICAgIGlmIChGaWx0ZXJPcHRpb25zLk1lbW8ucHJvZ3JhbS5pbmNsdWRlcyhpbnN0cnVjdGlvbi5wcm9ncmFtKSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgbGV0IGluc3RydWN0aW9uVHJhbnNmZXI7XG5cbiAgICAgICAgICAgICAgICAvLyBmZXRjaCAgdHJhbnNmZXIgdHJhbnNhY3Rpb24gZm9yIHJlbGF0aW9uYWwgbWVtb1xuICAgICAgICAgICAgICAgIHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICBpc1BhcnNlZEluc3RydWN0aW9uKGluc3RydWN0aW9uKSAmJlxuICAgICAgICAgICAgICAgICAgICAgIEZpbHRlck9wdGlvbnMuVHJhbnNmZXIucHJvZ3JhbS5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnByb2dyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyID0gaW5zdHJ1Y3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vIHNwbC10b2tlbiBvciBzeXN0ZW1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyICYmXG4gICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lICE9PSBpbnN0cnVjdGlvblRyYW5zZmVyWydwcm9ncmFtJ11cbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGRlYnVnTG9nKFxuICAgICAgICAgICAgICAgICAgICAnIyBGaWx0ZXJUeXBlLk1lbW8gYnJlYWsgaW5zdHJ1Y3Rpb246ICcsXG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uVHJhbnNmZXIsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZmV0Y2ggbWVtbyBvbmx5IHRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IF9NZW1vLk1lbW8uaW50b1VzZXJTaWRlKFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyLFxuICAgICAgICAgICAgICAgICAgcG9zdFRva2VuQWNjb3VudCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBGaWx0ZXJUeXBlLk9ubHlNZW1vOiB7XG4gICAgICAgICAgICAgIGlmIChGaWx0ZXJPcHRpb25zLk1lbW8ucHJvZ3JhbS5pbmNsdWRlcyhpbnN0cnVjdGlvbi5wcm9ncmFtKSkge1xuICAgICAgICAgICAgICAgIGxldCBpbnN0cnVjdGlvblRyYW5zZmVyO1xuXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IF9NZW1vLk1lbW8uaW50b1VzZXJTaWRlKFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyLFxuICAgICAgICAgICAgICAgICAgcG9zdFRva2VuQWNjb3VudCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBGaWx0ZXJUeXBlLk1pbnQ6IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIEZpbHRlck9wdGlvbnMuTWludC5wcm9ncmFtLmluY2x1ZGVzKGluc3RydWN0aW9uLnByb2dyYW0pICYmXG4gICAgICAgICAgICAgICAgRmlsdGVyT3B0aW9ucy5NaW50LmFjdGlvbi5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnBhcnNlZC50eXBlIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBfTWludC5NaW50LmludG9Vc2VyU2lkZShpbnN0cnVjdGlvbiwgdHhNZXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5UcmFuc2ZlcjpcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWUgPT09IGluc3RydWN0aW9uLnByb2dyYW0gJiZcbiAgICAgICAgICAgICAgICBGaWx0ZXJPcHRpb25zLlRyYW5zZmVyLmFjdGlvbi5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnBhcnNlZC50eXBlIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChpbnN0cnVjdGlvbi5wYXJzZWQudHlwZSA9PT0gJ3RyYW5zZmVyQ2hlY2tlZCcpIHtcbiAgICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBfVHJhbnNmZXJDaGVja2VkLlRyYW5zZmVyQ2hlY2tlZC5pbnRvVXNlclNpZGUoXG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICAgIHBvc3RUb2tlbkFjY291bnQsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBoaXN0b3J5ID0gX1RyYW5zZmVyLlRyYW5zZmVyLmludG9Vc2VyU2lkZShcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHR4TWV0YSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgTm9kZSwgUHVia2V5LCBSZXN1bHQsIHNsZWVwIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgVXNlclNpZGVPdXRwdXQgfSBmcm9tICcuL3R5cGVzLyc7XG5cbi8vQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFNpZ25hdHVyZXMge1xuICBjb25zdCBwYXJzZUZvclRyYW5zYWN0aW9uID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICApOiBQcm9taXNlPFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGE+ID0+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRQYXJzZWRUcmFuc2FjdGlvbihzaWduYXR1cmUpO1xuICAgIGlmICghcmVzKSB7XG4gICAgICByZXR1cm4ge30gYXMgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Rm9yQWRyZXNzID0gYXN5bmMgKFxuICAgIHB1YmtleTogUHVia2V5LFxuICAgIHBhcnNlcjogKFxuICAgICAgdHJhbnNhY3Rpb246IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKSA9PiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5IHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrOiAoaGlzdG9yeTogUmVzdWx0PFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnlbXSwgRXJyb3I+KSA9PiB2b2lkLFxuICAgIG5hcnJvd0Rvd24gPSAxMDAwLFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb25zID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0U2lnbmF0dXJlc0ZvckFkZHJlc3MoXG4gICAgICAgIHB1YmtleS50b1B1YmxpY0tleSgpLFxuICAgICAgICB7XG4gICAgICAgICAgbGltaXQ6IG5hcnJvd0Rvd24sXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyB0cmFuc2FjdGlvbnMgY291bnQ6JywgdHJhbnNhY3Rpb25zLmxlbmd0aCk7XG4gICAgICBjb25zdCBoaXN0b3JpZXM6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnlbXSA9IFtdO1xuXG4gICAgICAvLyBkb24ndCB1c2UgIFByb21pc2UuYWxsLCB0aGlzIGlzIHN5bmMgYWN0aW9uXG4gICAgICAvLyBsZXQgaSA9IDE7XG4gICAgICAvLyBmb3IgKGNvbnN0IHRyYW5zYWN0aW9uIG9mIHRyYW5zYWN0aW9ucykge1xuICAgICAgLy8gICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBwYXJzZUZvclRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uLnNpZ25hdHVyZSk7XG4gICAgICAvLyAgIGNvbnN0IGhpc3RvcnkgPSBwYXJzZXIoc2lnbmF0dXJlKTtcbiAgICAgIC8vICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgIC8vICAgICBoaXN0b3JpZXMucHVzaChoaXN0b3J5KTtcbiAgICAgIC8vICAgICBjYWxsYmFjayhSZXN1bHQub2soaGlzdG9yaWVzKSk7XG4gICAgICAvLyAgICAgaSsrO1xuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGlmIChyZWNlaXZlTGltaXQgJiYgaSA+IHJlY2VpdmVMaW1pdCkge1xuICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG5cbiAgICAgIGZvciAoY29uc3QgdHJhbnNhY3Rpb24gb2YgdHJhbnNhY3Rpb25zKSB7XG4gICAgICAgIHBhcnNlRm9yVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24uc2lnbmF0dXJlKVxuICAgICAgICAgIC50aGVuKChzaWduYXR1cmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnkgPSBwYXJzZXIoc2lnbmF0dXJlKTtcbiAgICAgICAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgICAgICAgIGhpc3Rvcmllcy5wdXNoKGhpc3RvcnkpO1xuICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQub2soaGlzdG9yaWVzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGUpID0+IGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpKTtcbiAgICAgICAgYXdhaXQgc2xlZXAoMC4wNSk7IC8vIGF2b2lkIDQyOSBlcnJvclxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEZpbHRlclR5cGUsIEhpc3RvcnksIE1vZHVsZU5hbWUsIE9uRXJyLCBPbk9rIH0gZnJvbSAnLi4vdHlwZXMvJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSAnLi4vdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IFNpZ25hdHVyZXMgfSBmcm9tICcuLi9zaWduYXR1cmVzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgZXhwb3J0IGNvbnN0IGdldEhpc3RvcnkgPSBhc3luYyAoXG4gICAgdGFyZ2V0OiBQdWJrZXksXG4gICAgb25PazogT25PazxIaXN0b3J5PixcbiAgICBvbkVycjogT25FcnIsXG4gICAgbmFycm93RG93biA9IDEwMDAsIC8vIE1heCBudW1iZXI6IDEwMDBcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcnNlciA9IFRyYW5zYWN0aW9uRmlsdGVyLnBhcnNlKFxuICAgICAgICBGaWx0ZXJUeXBlLk9ubHlNZW1vLFxuICAgICAgICBNb2R1bGVOYW1lLlNvbE5hdGl2ZSxcbiAgICAgICk7XG4gICAgICBhd2FpdCBTaWduYXR1cmVzLmdldEZvckFkcmVzcyhcbiAgICAgICAgdGFyZ2V0LFxuICAgICAgICBwYXJzZXIsXG4gICAgICAgIChyZXN1bHQpID0+IHJlc3VsdC5tYXRjaChvbk9rLCBvbkVyciksXG4gICAgICAgIG5hcnJvd0Rvd24sXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgb25FcnIoZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IE1lbW8gYXMgQ3JlYXRlIH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgTWVtbyBhcyBIaXN0b3J5IH0gZnJvbSAnLi9oaXN0b3J5JztcblxuZXhwb3J0IGNvbnN0IE1lbW8gPSBPYmplY3QuYXNzaWduKHt9LCBDcmVhdGUsIEhpc3RvcnkpO1xuIiwgImltcG9ydCB7XG4gIE5vZGUsXG4gIFJlc3VsdCxcbiAgSW5zdHJ1Y3Rpb24sXG4gIFRyeSxcbiAgU2VjcmV0LFxuICBQdWJrZXksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEtleXBhaXIgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTXVsdGlzaWcgYXMgX0luc3RydWN0aW9uIH0gZnJvbSAnLi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICBleHBvcnQgY29uc3QgY3JlYXRlID0gYXN5bmMgKFxuICAgIG06IG51bWJlcixcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgIHNpZ25lclB1YmtleXM6IFB1YmtleVtdLFxuICApOiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAobSA+IHNpZ25lclB1YmtleXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdzaWduZXJzIG51bWJlciBsZXNzIHRoYW4gbSBudW1iZXInKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWNjb3VudCA9IEtleXBhaXIuZ2VuZXJhdGUoKTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IGJhbGFuY2VOZWVkZWQgPSBhd2FpdCBjb25uZWN0aW9uLmdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdGlvbihcbiAgICAgICAgX0luc3RydWN0aW9uLkxheW91dC5zcGFuLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdDEgPSBfSW5zdHJ1Y3Rpb24uYWNjb3VudChcbiAgICAgICAgYWNjb3VudCxcbiAgICAgICAgZmVlUGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIGJhbGFuY2VOZWVkZWQsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0MiA9IF9JbnN0cnVjdGlvbi5tdWx0aXNpZyhcbiAgICAgICAgbSxcbiAgICAgICAgYWNjb3VudCxcbiAgICAgICAgc2lnbmVyUHVia2V5cy5tYXAoKHB1YmtleTogUHVia2V5KSA9PiBwdWJrZXkudG9QdWJsaWNLZXkoKSksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgICBbaW5zdDEsIGluc3QyXSxcbiAgICAgICAgW2FjY291bnRdLFxuICAgICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgYWNjb3VudC5wdWJsaWNLZXkudG9TdHJpbmcoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBLZXlwYWlyLFxuICBTWVNWQVJfUkVOVF9QVUJLRVksXG4gIFN5c3RlbVByb2dyYW0sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IHN0cnVjdCwgdTgsIGJsb2IgfSBmcm9tICdAc29sYW5hL2J1ZmZlci1sYXlvdXQnO1xuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuLy8gQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIE11bHRpc2lnIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBjb25zdCBjcmVhdGVMYXlvdXRQdWJLZXkgPSAocHJvcGVydHk6IHN0cmluZyk6IGFueSA9PiB7XG4gICAgcmV0dXJuIGJsb2IoMzIsIHByb3BlcnR5KTtcbiAgfTtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50ICovXG4gIGV4cG9ydCBjb25zdCBMYXlvdXQgPSBzdHJ1Y3Q8e1xuICAgIG06IG51bWJlcjtcbiAgICBuOiBudW1iZXI7XG4gICAgaXNfaW5pdGlhbGl6ZWQ6IG51bWJlcjtcbiAgICBzaWduZXIxOiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyMjogUHVibGljS2V5O1xuICAgIHNpZ25lcjM6IFB1YmxpY0tleTtcbiAgICBzaWduZXI0OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNTogUHVibGljS2V5O1xuICAgIHNpZ25lcjY6IFB1YmxpY0tleTtcbiAgICBzaWduZXI3OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyODogUHVibGljS2V5O1xuICAgIHNpZ25lcjk6IFB1YmxpY0tleTtcbiAgICBzaWduZXIxMDogUHVibGljS2V5O1xuICAgIHNpZ25lcjExOiBQdWJsaWNLZXk7XG4gIH0+KFtcbiAgICB1OCgnbScpLFxuICAgIHU4KCduJyksXG4gICAgdTgoJ2lzX2luaXRpYWxpemVkJyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXIxJyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXIyJyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXIzJyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI0JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI1JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI2JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI3JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI4JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI5JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXIxMCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMTEnKSxcbiAgXSk7XG5cbiAgZXhwb3J0IGNvbnN0IGFjY291bnQgPSAoXG4gICAgbmV3QWNjb3VudDogS2V5cGFpcixcbiAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICBiYWxhbmNlTmVlZGVkOiBudW1iZXIsXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBTeXN0ZW1Qcm9ncmFtLmNyZWF0ZUFjY291bnQoe1xuICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIucHVibGljS2V5LFxuICAgICAgbmV3QWNjb3VudFB1YmtleTogbmV3QWNjb3VudC5wdWJsaWNLZXksXG4gICAgICBsYW1wb3J0czogYmFsYW5jZU5lZWRlZCxcbiAgICAgIHNwYWNlOiBMYXlvdXQuc3BhbixcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgbXVsdGlzaWcgPSAoXG4gICAgbTogbnVtYmVyLFxuICAgIGZlZVBheWVyOiBLZXlwYWlyLFxuICAgIHNpZ25lclB1YmtleTogUHVibGljS2V5W10sXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIGNvbnN0IGtleXMgPSBbXG4gICAgICB7XG4gICAgICAgIHB1YmtleTogZmVlUGF5ZXIucHVibGljS2V5LFxuICAgICAgICBpc1NpZ25lcjogZmFsc2UsXG4gICAgICAgIGlzV3JpdGFibGU6IHRydWUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwdWJrZXk6IFNZU1ZBUl9SRU5UX1BVQktFWSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBzaWduZXJQdWJrZXkuZm9yRWFjaCgocHVia2V5KSA9PlxuICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgcHVia2V5LFxuICAgICAgICBpc1NpZ25lcjogZmFsc2UsXG4gICAgICAgIGlzV3JpdGFibGU6IGZhbHNlLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IGRhdGFMYXlvdXQgPSBzdHJ1Y3Q8eyBpbnN0cnVjdGlvbjogbnVtYmVyOyBtOiBudW1iZXIgfT4oW1xuICAgICAgdTgoJ2luc3RydWN0aW9uJyksXG4gICAgICB1OCgnbScpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgZGF0YSA9IEJ1ZmZlci5hbGxvYyhkYXRhTGF5b3V0LnNwYW4pO1xuXG4gICAgZGF0YUxheW91dC5lbmNvZGUoXG4gICAgICB7XG4gICAgICAgIGluc3RydWN0aW9uOiAyLFxuICAgICAgICBtLFxuICAgICAgfSxcbiAgICAgIGRhdGEsXG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbih7XG4gICAgICBrZXlzLFxuICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBOb2RlLCBQdWJrZXksIFJlc3VsdCwgVHJ5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgTGF5b3V0T2JqZWN0IH0gZnJvbSAnQHNvbGFuYS9idWZmZXItbGF5b3V0JztcbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTXVsdGlzaWcgYXMgX0luc3RydWN0aW9uIH0gZnJvbSAnLi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICBleHBvcnQgY29uc3QgZ2V0SW5mbyA9IGFzeW5jIChcbiAgICBtdWx0aXNpZzogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxMYXlvdXRPYmplY3QsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldEFjY291bnRJbmZvKFxuICAgICAgICBtdWx0aXNpZy50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGlmIChpbmZvID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdGYWlsZWQgdG8gZmluZCBtdWx0aXNpZycpO1xuICAgICAgfVxuICAgICAgaWYgKCFpbmZvLm93bmVyLmVxdWFscyhUT0tFTl9QUk9HUkFNX0lEKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBtdWx0aXNpZyBvd25lcicpO1xuICAgICAgfVxuICAgICAgaWYgKGluZm8uZGF0YS5sZW5ndGggIT09IF9JbnN0cnVjdGlvbi5MYXlvdXQuc3Bhbikge1xuICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBtdWx0aXNpZyBzaXplJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuZnJvbShpbmZvLmRhdGEpO1xuICAgICAgY29uc3QgbXVsdGlzaWdJbmZvID0gX0luc3RydWN0aW9uLkxheW91dC5kZWNvZGUoZGF0YSk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMSA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjEpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjIgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIyKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIzID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyMyk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyNCA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjQpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjUgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI1KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI2ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyNik7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyNyA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjcpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjggPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI4KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI5ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyOSk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMTAgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIxMCk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMTEgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIxMSk7XG4gICAgICByZXR1cm4gbXVsdGlzaWdJbmZvO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSwgUmVzdWx0LCBUcnkgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBfR2V0IH0gZnJvbSAnLi9nZXQtaW5mbyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICBleHBvcnQgY29uc3QgaXNBZGRyZXNzID0gYXN5bmMgKFxuICAgIG11bHRpc2lnOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PGJvb2xlYW4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IF9HZXQuZ2V0SW5mbyhtdWx0aXNpZyk7XG4gICAgICBpZiAoaW5mby5pc0Vycikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBNdWx0aXNpZyBhcyBDcmVhdGUgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBHZXRJbmZvIH0gZnJvbSAnLi9nZXQtaW5mbyc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBJc0FkZHJlc3MgfSBmcm9tICcuL2lzLWFkZHJlc3MnO1xuXG5leHBvcnQgY29uc3QgTXVsdGlzaWcgPSBPYmplY3QuYXNzaWduKHt9LCBDcmVhdGUsIEdldEluZm8sIElzQWRkcmVzcyk7XG4iLCAiaW1wb3J0IHsgUGFyc2VkQWNjb3VudERhdGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSwgUHVia2V5LCBSZXN1bHQsIFRyeSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IE93bmVySW5mbyB9IGZyb20gJy4uL3R5cGVzL3NvbC1uYXRpdmUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25GaWx0ZXIgfSBmcm9tICcuLi90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNvbE5hdGl2ZSB7XG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxPd25lckluZm8sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0UGFyc2VkQWNjb3VudEluZm8oXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICBzb2w6IDAsXG4gICAgICAgIGxhbXBvcnRzOiAwLFxuICAgICAgICBvd25lcjogb3duZXIudG9TdHJpbmcoKSxcbiAgICAgIH07XG5cbiAgICAgIGlmIChUcmFuc2FjdGlvbkZpbHRlci5pc1BhcnNlZEluc3RydWN0aW9uKHJlcy52YWx1ZT8uZGF0YSkpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkQWNjb3VudERhdGEgPSByZXMudmFsdWU/LmRhdGEgYXMgUGFyc2VkQWNjb3VudERhdGE7XG4gICAgICAgIGluZm8ub3duZXIgPSBwYXJzZWRBY2NvdW50RGF0YS5wYXJzZWQ/LmluZm8/Lm93bmVyIGFzIHN0cmluZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy52YWx1ZSkge1xuICAgICAgICBpbmZvLmxhbXBvcnRzID0gcmVzLnZhbHVlPy5sYW1wb3J0cztcbiAgICAgICAgaW5mby5zb2wgPSByZXMudmFsdWU/LmxhbXBvcnRzLnRvU29sKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTeXN0ZW1Qcm9ncmFtLCBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7XG4gIFJlc3VsdCxcbiAgTm9kZSxcbiAgUGFydGlhbFNpZ25JbnN0cnVjdGlvbixcbiAgVHJ5LFxuICBQdWJrZXksXG4gIFNlY3JldCxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNvbE5hdGl2ZSB7XG4gIGNvbnN0IFJBRElYID0gMTA7XG4gIGV4cG9ydCBjb25zdCBmZWVQYXllclBhcnRpYWxTaWduVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBibG9ja0hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja0hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2tIYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pLmFkZChcbiAgICAgICAgU3lzdGVtUHJvZ3JhbS50cmFuc2Zlcih7XG4gICAgICAgICAgZnJvbVB1YmtleTogb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICB0b1B1YmtleTogZGVzdC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGxhbXBvcnRzOiBwYXJzZUludChgJHthbW91bnQudG9MYW1wb3J0cygpfWAsIFJBRElYKSxcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICBzaWduZXJzLmZvckVhY2goKHNpZ25lcikgPT4ge1xuICAgICAgICB0eC5wYXJ0aWFsU2lnbihzaWduZXIudG9LZXlwYWlyKCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25JbnN0cnVjdGlvbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEZpbHRlclR5cGUsIEhpc3RvcnksIE1vZHVsZU5hbWUsIE9uRXJyLCBPbk9rIH0gZnJvbSAnLi4vdHlwZXMvJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSAnLi4vdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IFNpZ25hdHVyZXMgfSBmcm9tICcuLi9zaWduYXR1cmVzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTb2xOYXRpdmUge1xuICBleHBvcnQgY29uc3QgZ2V0SGlzdG9yeSA9IGFzeW5jIChcbiAgICB0YXJnZXQ6IFB1YmtleSxcbiAgICBmaWx0ZXJUeXBlOiBGaWx0ZXJUeXBlLFxuICAgIG9uT2s6IE9uT2s8SGlzdG9yeT4sXG4gICAgb25FcnI6IE9uRXJyLFxuICAgIG5hcnJvd0Rvd24gPSAxMDAwLCAvLyBNYXggbnVtYmVyOiAxMDAwXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJzZXIgPSBUcmFuc2FjdGlvbkZpbHRlci5wYXJzZShmaWx0ZXJUeXBlLCBNb2R1bGVOYW1lLlNvbE5hdGl2ZSk7XG4gICAgICBhd2FpdCBTaWduYXR1cmVzLmdldEZvckFkcmVzcyhcbiAgICAgICAgdGFyZ2V0LFxuICAgICAgICBwYXJzZXIsXG4gICAgICAgIGFzeW5jIChyZXN1bHQpID0+IGF3YWl0IHJlc3VsdC5tYXRjaChvbk9rLCBvbkVyciksXG4gICAgICAgIG5hcnJvd0Rvd24sXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgb25FcnIoZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IFN5c3RlbVByb2dyYW0gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUmVzdWx0LCBJbnN0cnVjdGlvbiwgVHJ5LCBQdWJrZXksIFNlY3JldCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTb2xOYXRpdmUge1xuICBjb25zdCBSQURJWCA9IDEwO1xuICBleHBvcnQgY29uc3QgdHJhbnNmZXIgPSAoXG4gICAgc291cmNlOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBpbnN0ID0gU3lzdGVtUHJvZ3JhbS50cmFuc2Zlcih7XG4gICAgICAgIGZyb21QdWJrZXk6IHNvdXJjZS50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b1B1YmtleTogZGVzdC50b1B1YmxpY0tleSgpLFxuICAgICAgICBsYW1wb3J0czogcGFyc2VJbnQoYCR7YW1vdW50LnRvTGFtcG9ydHMoKX1gLCBSQURJWCksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyLnRvS2V5cGFpcigpIDogc2lnbmVyc1swXS50b0tleXBhaXIoKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSksXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBjcmVhdGVXcmFwcGVkTmF0aXZlQWNjb3VudCxcbiAgY3JlYXRlTWludCxcbiAgY3JlYXRlVHJhbnNmZXJJbnN0cnVjdGlvbixcbiAgY3JlYXRlQ2xvc2VBY2NvdW50SW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHtcbiAgUmVzdWx0LFxuICBOb2RlLFxuICBJbnN0cnVjdGlvbixcbiAgZGVidWdMb2csXG4gIFRyeSxcbiAgUHVia2V5LFxuICBTZWNyZXQsXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEFzc29jaWF0ZWRBY2NvdW50IH0gZnJvbSAnLi4vYXNzb2NpYXRlZC1hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTb2xOYXRpdmUge1xuICBjb25zdCBSQURJWCA9IDEwO1xuXG4gIC8vIE5PVElDRTogVGhlcmUgaXMgYSBsYW1wb3J0cyBmbHVjdHVhdGlvbiB3aGVuIHRyYW5zZmVyIHVuZGVyIDAuMDAxIHNvbFxuICAvLyBmb3IgbXVsdGlTaWcgb25seSBmdW5jdGlvblxuICBleHBvcnQgY29uc3QgdHJhbnNmZXJXaXRoTXVsdGlzaWcgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IHNpZ25lcnNbMF07XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcbiAgICAgIGNvbnN0IHdyYXBwZWQgPSBhd2FpdCBjcmVhdGVXcmFwcGVkTmF0aXZlQWNjb3VudChcbiAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHBhcnNlSW50KGAke2Ftb3VudC50b0xhbXBvcnRzKCl9YCwgUkFESVgpLFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgd3JhcHBlZCBzb2w6ICcsIHdyYXBwZWQudG9CYXNlNTgoKSk7XG5cbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgY3JlYXRlTWludChcbiAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIDAsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLnRvU3RyaW5nKCksXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIHNvdXJjZVRva2VuOiAnLCBzb3VyY2VUb2tlbik7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLnRvU3RyaW5nKCksXG4gICAgICAgIHdyYXBwZWQudG9TdHJpbmcoKSxcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBkZXN0VG9rZW46ICcsIGRlc3RUb2tlbik7XG5cbiAgICAgIGNvbnN0IGluc3QxID0gY3JlYXRlVHJhbnNmZXJJbnN0cnVjdGlvbihcbiAgICAgICAgc291cmNlVG9rZW4udG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHBhcnNlSW50KGAke2Ftb3VudH1gLCBSQURJWCksIC8vIE5vIGxhbXBvcnRzLCBpdHMgc29sXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdDIgPSBjcmVhdGVDbG9zZUFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgd3JhcHBlZCxcbiAgICAgICAgZGVzdC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICAgIFtpbnN0MSwgaW5zdDJdLFxuICAgICAgICBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSksXG4gICAgICAgIGZlZVBheWVyPy50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU29sTmF0aXZlIGFzIEZpbmQgfSBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IHsgU29sTmF0aXZlIGFzIEZlZVBheWVyIH0gZnJvbSAnLi9mZWUtcGF5ZXItcGFydGlhbC1zaWduLXRyYW5zZmVyJztcbmltcG9ydCB7IFNvbE5hdGl2ZSBhcyBIaXN0b3J5IH0gZnJvbSAnLi9oaXN0b3J5JztcbmltcG9ydCB7IFNvbE5hdGl2ZSBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgU29sTmF0aXZlIGFzIFRyYW5zZmVyV2l0aE11bHRpc2lnIH0gZnJvbSAnLi90cmFuc2Zlci13aXRoLW11bHRpc2lnJztcblxuZXhwb3J0IGNvbnN0IFNvbE5hdGl2ZSA9IE9iamVjdC5hc3NpZ24oXG4gIHt9LFxuICBGaW5kLFxuICBGZWVQYXllcixcbiAgSGlzdG9yeSxcbiAgVHJhbnNmZXIsXG4gIFRyYW5zZmVyV2l0aE11bHRpc2lnLFxuKTtcbiIsICJpbXBvcnQgeyBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIEluc3RydWN0aW9uLCBUcnksIFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgQXNzb2NpYXRlZEFjY291bnQgfSBmcm9tICcuLi9hc3NvY2lhdGVkLWFjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgX0NhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKFxuICAgIHRva2VuOiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gc2lnbmVyc1swXSA6IGZlZVBheWVyO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IHRva2VuQXNzb2NpYXRlZCA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgX0NhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQodG90YWxBbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihbaW5zdF0sIGtleXBhaXJzLCBwYXllci50b0tleXBhaXIoKSwgdG9rZW4pO1xuICAgIH0pO1xuICB9O1xufVxuIiwgIi8vQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZUFtb3VudCA9IChcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICApOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBhbW91bnQgKiAxMCAqKiBtaW50RGVjaW1hbDtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgSW5zdHJ1Y3Rpb24sIFB1YmtleSwgUmVzdWx0LCBTZWNyZXQsIFRyeSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYnVybkFtb3VudDogbnVtYmVyLFxuICAgIHRva2VuRGVjaW1hbHM6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIudG9LZXlwYWlyKCkgOiBzaWduZXJzWzBdLnRvS2V5cGFpcigpO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgX0NhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQoYnVybkFtb3VudCwgdG9rZW5EZWNpbWFscyksXG4gICAgICAgIHRva2VuRGVjaW1hbHMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihbaW5zdF0sIGtleXBhaXJzLCBwYXllcik7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgZGVidWdMb2csIE5vZGUsIFB1YmtleSwgUmVzdWx0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgRmluZCwgT25FcnIsIE9uT2ssIFNvcnRhYmxlLCBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnLi4vdHlwZXMvJztcbmltcG9ydCB7XG4gIENvbnZlcnQsXG4gIEluZnJhU2lkZU91dHB1dCxcbiAgUGRhLFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnaW50ZXJuYWxzL3NoYXJlZC1tZXRhcGxleCc7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBQYXJzZWRBY2NvdW50RGF0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnY3Jvc3MtZmV0Y2gnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgY29uc3QgVU5BQkxFX0VSUk9SX1JFR0VYID0gL1VuYWJsZSB0byBmaW5kIE1ldGFkYXRhIGFjY291bnQvO1xuXG4gIC8vIFNvcnQgYnkgbGF0ZXN0IHdpdGggdW5peHRpbWVzdGFtcCBmdW5jdGlvblxuICBjb25zdCBzb3J0QnlVaW5peFRpbWVzdGFtcCA9XG4gICAgPFQgZXh0ZW5kcyBVc2VyU2lkZU91dHB1dC5OZnRNZXRhZGF0YSB8IFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGE+KFxuICAgICAgc29ydGFibGU6IFNvcnRhYmxlLFxuICAgICkgPT5cbiAgICAoYTogVCwgYjogVCk6IG51bWJlciA9PiB7XG4gICAgICBpZiAoIWEub2ZmY2hhaW4uY3JlYXRlZF9hdCkge1xuICAgICAgICBhLm9mZmNoYWluLmNyZWF0ZWRfYXQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKCFiLm9mZmNoYWluLmNyZWF0ZWRfYXQpIHtcbiAgICAgICAgYi5vZmZjaGFpbi5jcmVhdGVkX2F0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChzb3J0YWJsZSA9PT0gU29ydGFibGUuRGVzYykge1xuICAgICAgICByZXR1cm4gYi5vZmZjaGFpbi5jcmVhdGVkX2F0IC0gYS5vZmZjaGFpbi5jcmVhdGVkX2F0O1xuICAgICAgfSBlbHNlIGlmIChzb3J0YWJsZSA9PT0gU29ydGFibGUuQXNjKSB7XG4gICAgICAgIHJldHVybiBhLm9mZmNoYWluLmNyZWF0ZWRfYXQgLSBiLm9mZmNoYWluLmNyZWF0ZWRfYXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYi5vZmZjaGFpbi5jcmVhdGVkX2F0IC0gYS5vZmZjaGFpbi5jcmVhdGVkX2F0O1xuICAgICAgfVxuICAgIH07XG5cbiAgY29uc3QgY29udmVydGVyID0gPFQ+KFxuICAgIHRva2VuU3RhbmRhcmQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZCxcbiAgICBtZXRhZGF0YTogTWV0YWRhdGEsXG4gICAganNvbjogSW5mcmFTaWRlT3V0cHV0Lk9mZmNoYWluLFxuICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICk6IFQgPT4ge1xuICAgIGlmICh0b2tlblN0YW5kYXJkID09PSBVc2VyU2lkZUlucHV0LlRva2VuU3RhbmRhcmQuRnVuZ2libGUpIHtcbiAgICAgIHJldHVybiBDb252ZXJ0LlRva2VuTWV0YWRhdGEuaW50b1VzZXJTaWRlKFxuICAgICAgICB7XG4gICAgICAgICAgb25jaGFpbjogbWV0YWRhdGEsXG4gICAgICAgICAgb2ZmY2hhaW46IGpzb24sXG4gICAgICAgIH0sXG4gICAgICAgIHRva2VuQW1vdW50LFxuICAgICAgKSBhcyBUO1xuICAgIH0gZWxzZSBpZiAodG9rZW5TdGFuZGFyZCA9PT0gVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlKSB7XG4gICAgICByZXR1cm4gQ29udmVydC5OZnRNZXRhZGF0YS5pbnRvVXNlclNpZGUoXG4gICAgICAgIHtcbiAgICAgICAgICBvbmNoYWluOiBtZXRhZGF0YSxcbiAgICAgICAgICBvZmZjaGFpbjoganNvbixcbiAgICAgICAgfSxcbiAgICAgICAgdG9rZW5BbW91bnQsXG4gICAgICApIGFzIFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKGBObyBtYXRjaCB0b2tlblN0YW5kYXJkOiAke3Rva2VuU3RhbmRhcmR9YCk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZW5lcmljRmluZEJ5T3duZXIgPSBhc3luYyA8XG4gICAgVCBleHRlbmRzIFVzZXJTaWRlT3V0cHV0Lk5mdE1ldGFkYXRhIHwgVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSxcbiAgPihcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNhbGxiYWNrOiAocmVzdWx0OiBSZXN1bHQ8VFtdLCBFcnJvcj4pID0+IHZvaWQsXG4gICAgdG9rZW5TdGFuZGFyZDogVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLFxuICAgIHNvcnRhYmxlPzogU29ydGFibGUsXG4gICAgaXNIb2xkZXI/OiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGE6IFRbXSA9IFtdO1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkVG9rZW5BY2NvdW50c0J5T3duZXIoXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBpbmZvLnZhbHVlLmxlbmd0aCA9PT0gMCAmJiBjYWxsYmFjayhSZXN1bHQub2soW10pKTtcblxuICAgICAgZm9yIGF3YWl0IChjb25zdCBkIG9mIGluZm8udmFsdWUpIHtcbiAgICAgICAgaWYgKGlzSG9sZGVyICYmIGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50LnVpQW1vdW50IDwgMSkge1xuICAgICAgICAgIGRlYnVnTG9nKFxuICAgICAgICAgICAgJyMgZmluZEJ5T3duZXIgbm8gaG9sZCBtZXRhZGF0YTogJyxcbiAgICAgICAgICAgIGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWludCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLm1pbnQgYXMgUHVia2V5O1xuICAgICAgICBjb25zdCB0b2tlbkFtb3VudCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50XG4gICAgICAgICAgLmFtb3VudCBhcyBzdHJpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IE1ldGFkYXRhLmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgICAgICBQZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlPd25lciBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgICAgIC8vIHRva2VuU3RhbmRhcmQ6IDAoTkZUKSBvciAyIChTUEwtVE9LRU4pXG4gICAgICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgIT09IHRva2VuU3RhbmRhcmQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICByZXNwb25zZVxuICAgICAgICAgICAgICAgIC5qc29uKClcbiAgICAgICAgICAgICAgICAudGhlbigoanNvbjogSW5mcmFTaWRlT3V0cHV0Lk9mZmNoYWluKSA9PiB7XG4gICAgICAgICAgICAgICAgICBkYXRhLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnRlcjxUPih0b2tlblN0YW5kYXJkLCBtZXRhZGF0YSwganNvbiwgdG9rZW5BbW91bnQpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhkYXRhKSk7IC8vIG5lZWQgdGhpcyBjYWxsID9cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkZXNjQWxnbyA9IHNvcnRCeVVpbml4VGltZXN0YW1wPFQ+KFNvcnRhYmxlLkRlc2MpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgYXNjQWxnbyA9IHNvcnRCeVVpbml4VGltZXN0YW1wPFQ+KFNvcnRhYmxlLkFzYyk7XG4gICAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUgPT09IFNvcnRhYmxlLkRlc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc29ydChkZXNjQWxnbyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvcnRhYmxlID09PSBTb3J0YWJsZS5Bc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc29ydChhc2NBbGdvKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhkYXRhKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yICYmIFVOQUJMRV9FUlJPUl9SRUdFWC50ZXN0KGUubWVzc2FnZSkpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIHNraXAgZXJyb3IgZm9yIG9sZCBTUEwtVE9LRU46ICcsIG1pbnQpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdlbmVyaWNGaW5kQnlNaW50ID0gYXN5bmMgPFxuICAgIFQgZXh0ZW5kcyBVc2VyU2lkZU91dHB1dC5OZnRNZXRhZGF0YSB8IFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsXG4gID4oXG4gICAgbWludDogUHVia2V5LFxuICAgIHRva2VuU3RhbmRhcmQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIFBkYS5nZXRNZXRhZGF0YShtaW50KSxcbiAgICAgICk7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlNaW50IG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG4gICAgICAvLyB0b2tlblN0YW5kYXJkOiAwKE5GVCkgb3IgMiAoU1BMLVRPS0VOKVxuICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgIT09IHRva2VuU3RhbmRhcmQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3Rva2VuIHN0YW5kYXJkcyBhcmUgZGlmZmVyZW50Jyk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgY29ubmVjdGlvbi5nZXRQYXJzZWRBY2NvdW50SW5mbyhtaW50LnRvUHVibGljS2V5KCkpO1xuICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSAoaW5mby52YWx1ZT8uZGF0YSBhcyBQYXJzZWRBY2NvdW50RGF0YSkucGFyc2VkLmluZm9cbiAgICAgICAgLnN1cHBseSBhcyBzdHJpbmc7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IChcbiAgICAgICAgYXdhaXQgZmV0Y2gobWV0YWRhdGEuZGF0YS51cmkpXG4gICAgICApLmpzb24oKSkgYXMgSW5mcmFTaWRlT3V0cHV0Lk9mZmNoYWluO1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayhcbiAgICAgICAgY29udmVydGVyPFQ+KHRva2VuU3RhbmRhcmQsIG1ldGFkYXRhLCByZXNwb25zZSwgdG9rZW5BbW91bnQpLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlIGFzIEVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7T25Pa30gb25PayBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09uRXJyfSBvbkVyciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3tzb3J0YWJsZT86IFNvcnRhYmxlLCBpc0hvbGRlcj86IGJvb2xlYW59fSBvcHRpb25zP1xuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9uT2s6IE9uT2s8RmluZD4sXG4gICAgb25FcnI6IE9uRXJyLFxuICAgIG9wdGlvbnM/OiB7IHNvcnRhYmxlPzogU29ydGFibGU7IGlzSG9sZGVyPzogYm9vbGVhbiB9LFxuICApOiB2b2lkID0+IHtcbiAgICBjb25zdCBzb3J0YWJsZSA9ICFvcHRpb25zPy5zb3J0YWJsZSA/IFNvcnRhYmxlLkRlc2MgOiBvcHRpb25zPy5zb3J0YWJsZTtcbiAgICBjb25zdCBpc0hvbGRlciA9ICFvcHRpb25zPy5pc0hvbGRlciA/IHRydWUgOiBmYWxzZTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1mbG9hdGluZy1wcm9taXNlcyAqL1xuICAgIGdlbmVyaWNGaW5kQnlPd25lcjxUb2tlbk1ldGFkYXRhPihcbiAgICAgIG93bmVyLFxuICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXN1bHQubWF0Y2goKG9rKSA9PiBvbk9rKG9rKSwgb25FcnIpO1xuICAgICAgfSxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5GdW5naWJsZSxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgaXNIb2xkZXIsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VG9rZW5NZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGdlbmVyaWNGaW5kQnlNaW50PFRva2VuTWV0YWRhdGE+KFxuICAgICAgbWludCxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5GdW5naWJsZSxcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIEluc3RydWN0aW9uLFxuICBLZXlwYWlyQWNjb3VudCxcbiAgUHVia2V5LFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQge1xuICBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogRnJlZXppbmcgYSB0YXJnZXQgbmZ0XG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXI/ICAgICAgIC8vIGZlZSBwYXllclxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZUFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ldyBLZXlwYWlyQWNjb3VudCh7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBOb2RlLFxuICBSZXN1bHQsXG4gIFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sXG4gIFRyeSxcbiAgUHVia2V5LFxuICBTZWNyZXQsXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuaW1wb3J0IHsgU3BsVG9rZW4gYXMgX0NhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQXNzb2NpYXRlZEFjY291bnQgfSBmcm9tICcuLi9hc3NvY2lhdGVkLWFjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGZlZVBheWVyUGFydGlhbFNpZ25UcmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnbkluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50Lm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lcixcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgZGVzdCxcbiAgICAgICAgZmVlUGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBsZXQgaW5zdDI7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcblxuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIHJldHVybiBhc3NvY2lhdGVkIHRva2VuIGFjY291bnRcbiAgICAgIGlmICghZGVzdFRva2VuLmluc3QpIHtcbiAgICAgICAgaW5zdDIgPSBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgICBzb3VyY2VUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgZGVzdFRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgX0NhbGN1bGF0b3IuY2FsY3VsYXRlQW1vdW50KGFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICAgIGtleXBhaXJzLFxuICAgICAgICApO1xuICAgICAgICB0eC5hZGQoaW5zdDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmV0dXJuIGluc3RydWN0aW9uIGFuZCB1bmRlY2lkZWQgYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIF9DYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgKTtcbiAgICAgICAgdHguYWRkKGRlc3RUb2tlbi5pbnN0KS5hZGQoaW5zdDIpO1xuICAgICAgfVxuXG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAga2V5cGFpcnMuZm9yRWFjaCgoc2lnbmVyKSA9PiB7XG4gICAgICAgIHR4LnBhcnRpYWxTaWduKHNpZ25lcik7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2VyaWFsaXplZFR4ID0gdHguc2VyaWFsaXplKHtcbiAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBoZXggPSBzZXJpYWxpemVkVHgudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgcmV0dXJuIG5ldyBQYXJ0aWFsU2lnbkluc3RydWN0aW9uKGhleCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IE5vZGUsIFB1YmtleSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEZpbHRlclR5cGUsIEhpc3RvcnksIE1vZHVsZU5hbWUsIE9uRXJyLCBPbk9rIH0gZnJvbSAnLi4vdHlwZXMvJztcbmltcG9ydCB7IFNpZ25hdHVyZXMgfSBmcm9tICcuLi9zaWduYXR1cmVzJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSAnLi4vdHJhbnNhY3Rpb24tZmlsdGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBnZXRIaXN0b3J5ID0gYXN5bmMgKFxuICAgIHRhcmdldDogUHVia2V5LFxuICAgIGZpbHRlclR5cGU6IEZpbHRlclR5cGUsXG4gICAgb25PazogT25PazxIaXN0b3J5PixcbiAgICBvbkVycjogT25FcnIsXG4gICAgbmFycm93RG93biA9IDEwMDAsIC8vIE1heCBudW1iZXI6IDEwMDBcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChmaWx0ZXJUeXBlID09PSBGaWx0ZXJUeXBlLk1lbW8pIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gVHJhbnNhY3Rpb25GaWx0ZXIucGFyc2UoZmlsdGVyVHlwZSwgTW9kdWxlTmFtZS5TcGxUb2tlbik7XG4gICAgICAgIGF3YWl0IFNpZ25hdHVyZXMuZ2V0Rm9yQWRyZXNzKFxuICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICBwYXJzZXIsXG4gICAgICAgICAgKHJlc3VsdCkgPT4gcmVzdWx0Lm1hdGNoKG9uT2ssIG9uRXJyKSxcbiAgICAgICAgICBuYXJyb3dEb3duLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgdG9rZW5BY2NvdW50cyA9XG4gICAgICAgICAgYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0UGFyc2VkVG9rZW5BY2NvdW50c0J5T3duZXIoXG4gICAgICAgICAgICB0YXJnZXQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgIGZvciAoY29uc3QgYWNjb3VudCBvZiB0b2tlbkFjY291bnRzLnZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgcGFyc2VyID0gVHJhbnNhY3Rpb25GaWx0ZXIucGFyc2UoXG4gICAgICAgICAgICBmaWx0ZXJUeXBlLFxuICAgICAgICAgICAgTW9kdWxlTmFtZS5TcGxUb2tlbixcbiAgICAgICAgICApO1xuICAgICAgICAgIGF3YWl0IFNpZ25hdHVyZXMuZ2V0Rm9yQWRyZXNzKFxuICAgICAgICAgICAgYWNjb3VudC5wdWJrZXkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHBhcnNlcixcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHJlc3VsdC5tYXRjaChvbk9rLCBvbkVyciksXG4gICAgICAgICAgICBuYXJyb3dEb3duLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIG9uRXJyKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBQdWJsaWNLZXksXG4gIFN5c3RlbVByb2dyYW0sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBBdXRob3JpdHlUeXBlLFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbixcbiAgY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50LFxuICBNSU5UX1NJWkUsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbixcbiAgRGF0YVYyLFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5pbXBvcnQge1xuICBkZWJ1Z0xvZyxcbiAgS2V5cGFpckFjY291bnQsXG4gIE1pbnRJbnN0cnVjdGlvbixcbiAgTm9kZSxcbiAgUHVia2V5LFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmltcG9ydCB7XG4gIENvbnZlcnQsXG4gIFBkYSxcbiAgVXNlclNpZGVJbnB1dCxcbiAgVmFsaWRhdG9yLFxufSBmcm9tICdpbnRlcm5hbHMvc2hhcmVkLW1ldGFwbGV4JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ2ludGVybmFscy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBjcmVhdGVGcmVlemVBdXRob3JpdHkgPSAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBjcmVhdGVTZXRBdXRob3JpdHlJbnN0cnVjdGlvbihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIEF1dGhvcml0eVR5cGUuRnJlZXplQWNjb3VudCxcbiAgICAgIGZyZWV6ZUF1dGhvcml0eSxcbiAgICApO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVNaW50SW5zdHJ1Y3Rpb25zID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICB0b2tlbk1ldGFkYXRhOiBEYXRhVjIsXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgICBpc011dGFibGU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8VHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdPiA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhbXBvcnRzID0gYXdhaXQgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludChjb25uZWN0aW9uKTtcbiAgICBjb25zdCBtZXRhZGF0YVBkYSA9IFBkYS5nZXRNZXRhZGF0YShtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IHRva2VuQXNzb2NpYXRlZCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcblxuICAgIGNvbnN0IGluc3QxID0gU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLFxuICAgICAgbmV3QWNjb3VudFB1YmtleTogbWludCxcbiAgICAgIHNwYWNlOiBNSU5UX1NJWkUsXG4gICAgICBsYW1wb3J0czogbGFtcG9ydHMsXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG5cbiAgICBjb25zdCBpbnN0MiA9IGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgbWludERlY2ltYWwsXG4gICAgICBvd25lcixcbiAgICAgIG93bmVyLFxuICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICApO1xuXG4gICAgY29uc3QgaW5zdDMgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICBmZWVQYXllcixcbiAgICAgIHRva2VuQXNzb2NpYXRlZCxcbiAgICAgIG93bmVyLFxuICAgICAgbWludCxcbiAgICApO1xuXG4gICAgY29uc3QgaW5zdDQgPSBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgb3duZXIsXG4gICAgICBfQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudCh0b3RhbEFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgbWludERlY2ltYWwsXG4gICAgKTtcblxuICAgIGNvbnN0IGluc3Q1ID0gY3JlYXRlQ3JlYXRlTWV0YWRhdGFBY2NvdW50VjNJbnN0cnVjdGlvbihcbiAgICAgIHtcbiAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhUGRhLFxuICAgICAgICBtaW50LFxuICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG93bmVyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY3JlYXRlTWV0YWRhdGFBY2NvdW50QXJnc1YzOiB7XG4gICAgICAgICAgZGF0YTogdG9rZW5NZXRhZGF0YSxcbiAgICAgICAgICBpc011dGFibGUsXG4gICAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgcmV0dXJuIFtpbnN0MSwgaW5zdDIsIGluc3QzLCBpbnN0NCwgaW5zdDVdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTUEwtVE9LRU4gbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgLy8gdG9rZW4gb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IHNpZ25lciAgICAgIC8vIHRva2VuIG93bmVyIFNlY3JldFxuICAgKiBAcGFyYW0ge251bWJlcn0gdG90YWxBbW91bnQgLy8gdG90YWwgbnVtYmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaW50RGVjaW1hbCAvLyB0b2tlbiBkZWNpbWFsXG4gICAqIEBwYXJhbSB7UHVia2V5fSBpbnB1dCAgICAgICAvLyB0b2tlbiBtZXRhZGF0YVxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXI/ICAgLy8gZmVlIHBheWVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBmcmVlemVBdXRob3JpdHk/IC8vIGZyZWV6ZSBhdXRob3JpdHlcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyOiBTZWNyZXQsXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGlucHV0OiBVc2VyU2lkZUlucHV0LlRva2VuTWV0YWRhdGEsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgZnJlZXplQXV0aG9yaXR5PzogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8VXNlclNpZGVJbnB1dC5Ub2tlbk1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IHNpZ25lcjtcbiAgICAgIGlucHV0LnJveWFsdHkgPSAwO1xuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSAwO1xuXG4gICAgICBjb25zdCB0b2tlblN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCBhcyBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgICAgICBpbnB1dC5yb3lhbHR5LFxuICAgICAgKTtcblxuICAgICAgLy8gY3JlYXRlZCBhdCBieSB1bml4IHRpbWVzdGFtcFxuICAgICAgY29uc3QgY3JlYXRlZEF0ID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgICAgdG9rZW5TdG9yYWdlTWV0YWRhdGEuY3JlYXRlZF9hdCA9IGNyZWF0ZWRBdDtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCAmJiBpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkTWV0YUFuZENvbnRlbnQoXG4gICAgICAgICAgdG9rZW5TdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICB1cmkgPSBpbnB1dC51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihcIk11c3Qgc2V0ICdzdG9yYWdlVHlwZSArIGZpbGVQYXRoJyBvciAndXJpJ1wiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydC5Ub2tlbk1ldGFkYXRhLmludG9JbmZyYVNpZGUoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cmkpO1xuXG4gICAgICBjb25zdCBtaW50ID0gS2V5cGFpckFjY291bnQuY3JlYXRlKCk7XG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IGNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG90YWxBbW91bnQsXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRnJlZXplQXV0aG9yaXR5KFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTWludEluc3RydWN0aW9uKFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW3NpZ25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgS2V5cGFpckFjY291bnQsXG4gIEluc3RydWN0aW9uLFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7XG4gIGNyZWF0ZVRoYXdBY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogVGhhd2luZyBhIHRhcmdldCBORlRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gc2V0dGVkIGZyZWV6ZSBhdXRob3JpdHkgb2YgbmZ0XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAgICAgLy8gZmVlIHBheWVyXG4gICAqL1xuICBleHBvcnQgY29uc3QgdGhhdyA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ldyBLZXlwYWlyQWNjb3VudCh7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBSZXN1bHQsIEluc3RydWN0aW9uLCBUcnksIFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgX0NhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQXNzb2NpYXRlZEFjY291bnQgfSBmcm9tICcuLi9hc3NvY2lhdGVkLWFjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBzaWduZXJzWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IHNvdXJjZVRva2VuID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgbWludCxcbiAgICAgICAgZGVzdCxcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIF9DYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihbaW5zdF0sIGtleXBhaXJzLCBwYXllci50b0tleXBhaXIoKSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU3BsVG9rZW4gYXMgQWRkIH0gZnJvbSAnLi9hZGQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQnVybiB9IGZyb20gJy4vYnVybic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZyZWV6ZSB9IGZyb20gJy4vZnJlZXplJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZlZVBheWVyIH0gZnJvbSAnLi9mZWUtcGF5ZXItcGFydGlhbC1zaWduLXRyYW5zZmVyJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEhpc3RvcnkgfSBmcm9tICcuL2hpc3RvcnknO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUaGF3IH0gZnJvbSAnLi90aGF3JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5cbmV4cG9ydCBjb25zdCBTcGxUb2tlbiA9IE9iamVjdC5hc3NpZ24oXG4gIHt9LFxuICBBZGQsXG4gIEJ1cm4sXG4gIEZpbmQsXG4gIEZyZWV6ZSxcbiAgRmVlUGF5ZXIsXG4gIEhpc3RvcnksXG4gIE1pbnQsXG4gIFRoYXcsXG4gIFRyYW5zZmVyLFxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTLE1BQWMsVUFBVSxXQUFtQjtBQUU3QyxJQUFVO0FBQUEsQ0FBVixDQUFVQSxhQUFWO0FBQ0wsUUFBTSx5QkFBeUI7QUFDL0IsUUFBTSxrQkFBa0I7QUFFakIsRUFBTUEsU0FBQSxVQUFVLENBQ3JCLFFBQ0Esa0JBQ21DO0FBQ25DLFdBQU8sSUFBSSxNQUFZO0FBQ3JCLGVBQVMsK0JBQStCO0FBRXhDLHNCQUFnQixDQUFDLGdCQUNiLHVCQUF1QixXQUFXLElB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QUFXLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7QUFFakQsWUFBTSxjQUFjLE1BQU0sa0JBQWtCO0FBQUEsUUFDMUM7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFlBQVksTUFBTSxrQkFBa0I7QUFBQSxRQUN4QztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUVBLFlBQU0sT0FBT0M7QUFBQSxRQUNYLFlBQVksWUFBWTtBQUFBLFFBQ3hCLEtBQUssWUFBWTtBQUFBLFFBQ2pCLFVBQVUsWUFBWTtBQUFBLFFBQ3RCLE1BQU0sWUFBWTtBQUFBLFFBQ2xCLFNBQVksZ0JBQWdCLFFBQVEsV0FBVztBQUFBLFFBQy9DO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFFQSxhQUFPLElBQUlDLGNBQVksQ0FBQyxJQUFJLEdBQUcsVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUFBLElBQzVELEVBQUM7QUFBQSxFQUNIO0FBQUEsR0F0Q2VILDRCQUFBOzs7QUNLVixJQUFNSSxhQUFXLE9BQU87QUFBQSxFQUM3QixDQUFDO0FBQUEsRUFDREE7QUFBQSxFQUNBQTtBQUFBLEVBQ0FBO0FBQUEsRUFDQUE7QUFBQSxFQUNBQTtBQUFBLEVBQ0FBO0FBQUEsRUFDQUE7QUFBQSxFQUNBQTtBQUFBLEVBQ0FBO0FBQ0Y7IiwKICAibmFtZXMiOiBbIkFpcmRyb3AiLCAiZGVidWdMb2ciLCAiTm9kZSIsICJBc3NvY2lhdGVkQWNjb3VudCIsICJkZWJ1Z0xvZyIsICJOb2RlIiwgIkluc3RydWN0aW9uIiwgIk1lbW8iLCAiU29ydGFibGUiLCAiRmlsdGVyVHlwZSIsICJNb2R1bGVOYW1lIiwgIkNvbnZlcnQiLCAiTWVtbyIsICJjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSIsICJDb252ZXJ0IiwgIk1pbnQiLCAiY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUiLCAiQ29udmVydCIsICJUcmFuc2ZlciIsICJjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSIsICJDb252ZXJ0IiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJkZWJ1Z0xvZyIsICJUcmFuc2FjdGlvbkZpbHRlciIsICJpbnN0cnVjdGlvbiIsICJDb252ZXJ0IiwgImRlYnVnTG9nIiwgIk5vZGUiLCAiUmVzdWx0IiwgInNsZWVwIiwgIlNpZ25hdHVyZXMiLCAiTm9kZSIsICJkZWJ1Z0xvZyIsICJSZXN1bHQiLCAic2xlZXAiLCAiTWVtbyIsICJNZW1vIiwgIk5vZGUiLCAiSW5zdHJ1Y3Rpb24iLCAiVHJ5IiwgIktleXBhaXIiLCAiVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIk11bHRpc2lnIiwgIk11bHRpc2lnIiwgIlRyeSIsICJLZXlwYWlyIiwgIk5vZGUiLCAiSW5zdHJ1Y3Rpb24iLCAiTm9kZSIsICJUcnkiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJQdWJsaWNLZXkiLCAiTXVsdGlzaWciLCAiVHJ5IiwgIk5vZGUiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJQdWJsaWNLZXkiLCAiVHJ5IiwgIk11bHRpc2lnIiwgIlRyeSIsICJNdWx0aXNpZyIsICJOb2RlIiwgIlRyeSIsICJTb2xOYXRpdmUiLCAiVHJ5IiwgIk5vZGUiLCAiU3lzdGVtUHJvZ3JhbSIsICJOb2RlIiwgIlRyeSIsICJTb2xOYXRpdmUiLCAiVHJ5IiwgIk5vZGUiLCAiU3lzdGVtUHJvZ3JhbSIsICJTb2xOYXRpdmUiLCAiU3lzdGVtUHJvZ3JhbSIsICJJbnN0cnVjdGlvbiIsICJUcnkiLCAiU29sTmF0aXZlIiwgIk5vZGUiLCAiSW5zdHJ1Y3Rpb24iLCAiZGVidWdMb2ciLCAiVHJ5IiwgIlNvbE5hdGl2ZSIsICJUcnkiLCAiTm9kZSIsICJkZWJ1Z0xvZyIsICJJbnN0cnVjdGlvbiIsICJTb2xOYXRpdmUiLCAiSW5zdHJ1Y3Rpb24iLCAiVHJ5IiwgIlNwbFRva2VuIiwgIlNwbFRva2VuIiwgIlRyeSIsICJJbnN0cnVjdGlvbiIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJJbnN0cnVjdGlvbiIsICJUcnkiLCAiU3BsVG9rZW4iLCAiVHJ5IiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIkluc3RydWN0aW9uIiwgImRlYnVnTG9nIiwgIk5vZGUiLCAiUmVzdWx0IiwgIkNvbnZlcnQiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJTcGxUb2tlbiIsICJDb252ZXJ0IiwgIk5vZGUiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJSZXN1bHQiLCAiZGVidWdMb2ciLCAiSW5zdHJ1Y3Rpb24iLCAiS2V5cGFpckFjY291bnQiLCAiVHJ5IiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlNwbFRva2VuIiwgIlRyYW5zYWN0aW9uIiwgIk5vZGUiLCAiUGFydGlhbFNpZ25JbnN0cnVjdGlvbiIsICJUcnkiLCAiU3BsVG9rZW4iLCAiVHJ5IiwgIk5vZGUiLCAiVHJhbnNhY3Rpb24iLCAiUGFydGlhbFNpZ25JbnN0cnVjdGlvbiIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIk5vZGUiLCAiU3BsVG9rZW4iLCAiTm9kZSIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIlN5c3RlbVByb2dyYW0iLCAiY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uIiwgImNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbiIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJUT0tFTl9QUk9HUkFNX0lEIiwgImRlYnVnTG9nIiwgIktleXBhaXJBY2NvdW50IiwgIk5vZGUiLCAiVHJ5IiwgIkNvbnZlcnQiLCAiUGRhIiwgIlNwbFRva2VuIiwgIm1pbnQiLCAiTm9kZSIsICJQZGEiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiU3lzdGVtUHJvZ3JhbSIsICJUT0tFTl9QUk9HUkFNX0lEIiwgImNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbiIsICJjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24iLCAiVHJ5IiwgIkNvbnZlcnQiLCAiZGVidWdMb2ciLCAiS2V5cGFpckFjY291bnQiLCAiS2V5cGFpckFjY291bnQiLCAiSW5zdHJ1Y3Rpb24iLCAiVHJ5IiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlNwbFRva2VuIiwgImNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIiwgIkluc3RydWN0aW9uIiwgIlRyeSIsICJTcGxUb2tlbiIsICJUcnkiLCAiY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24iLCAiSW5zdHJ1Y3Rpb24iLCAiU3BsVG9rZW4iXQp9Cg==