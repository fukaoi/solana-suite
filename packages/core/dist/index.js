"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => {
  if (symbol = Symbol[name])
    return symbol;
  throw Error("Symbol." + name + " is not defined");
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Airdrop: () => Airdrop,
  AssociatedAccount: () => AssociatedAccount,
  FilterOptions: () => FilterOptions,
  FilterType: () => FilterType,
  Memo: () => Memo3,
  ModuleName: () => ModuleName,
  Multisig: () => Multisig5,
  SolNative: () => SolNative6,
  Sortable: () => Sortable,
  SplToken: () => SplToken11
});
module.exports = __toCommonJS(src_exports);

// src/airdrop.ts
var import_shared = require("@solana-suite/shared");
var Airdrop;
((Airdrop2) => {
  const DEFAULT_AIRDROP_AMOUNT = 1;
  const MAX_AIRDROP_SOL = 2;
  Airdrop2.request = (pubkey, airdropAmount) => __async(void 0, null, function* () {
    return (0, import_shared.Try)(() => __async(void 0, null, function* () {
      (0, import_shared.debugLog)("Now airdropping...please wait");
      airdropAmount = !airdropAmount ? DEFAULT_AIRDROP_AMOUNT.toLamports() : airdropAmount.toLamports();
      if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
        throw Error(
          `Over max airdrop amount: ${airdropAmount}, max: ${MAX_AIRDROP_SOL.toLamports()}`
        );
      }
      const sig = yield import_shared.Node.getConnection().requestAirdrop(
        pubkey.toPublicKey(),
        airdropAmount
      );
      yield import_shared.Node.confirmedSig(sig);
      return "success";
    }));
  });
})(Airdrop || (Airdrop = {}));

// src/associated-account.ts
var import_shared2 = require("@solana-suite/shared");
var import_spl_token = require("@solana/spl-token");
var AssociatedAccount;
((AssociatedAccount2) => {
  const RETRY_OVER_LIMIT = 10;
  const RETRY_SLEEP_TIME = 3;
  const get = (mint, owner, feePayer, allowOwnerOffCurve = false) => __async(void 0, null, function* () {
    const res = yield (0, AssociatedAccount2.makeOrCreateInstruction)(
      mint,
      owner,
      new import_shared2.KeypairAccount({ secret: feePayer }).pubkey,
      allowOwnerOffCurve
    );
    if (!res.inst) {
      return res.tokenAccount;
    }
    return new import_shared2.Instruction(
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
          (0, import_shared2.debugLog)("# associatedTokenAccount: ", inst);
          return inst;
        } else if (inst instanceof import_shared2.Instruction) {
          (yield inst.submit()).map(
            (ok) => __async(void 0, null, function* () {
              yield import_shared2.Node.confirmedSig(ok);
              return inst.data;
            }),
            (err) => {
              (0, import_shared2.debugLog)("# Error submit retryGetOrCreate: ", err);
              throw err;
            }
          );
        }
      } catch (e) {
        (0, import_shared2.debugLog)(`# retry: ${counter} create token account: `, e);
        (0, import_shared2.debugLog)(`# mint: ${mint}, owner: ${owner}, feePayer: ${feePayer}`);
      }
      yield (0, import_shared2.sleep)(RETRY_SLEEP_TIME);
      counter++;
    }
    throw Error(`retry action is over limit ${RETRY_OVER_LIMIT}`);
  });
  AssociatedAccount2.makeOrCreateInstruction = (mint, owner, feePayer, allowOwnerOffCurve = false) => __async(void 0, null, function* () {
    const associatedTokenAccount = (0, import_spl_token.getAssociatedTokenAddressSync)(
      mint.toPublicKey(),
      owner.toPublicKey(),
      allowOwnerOffCurve,
      import_spl_token.TOKEN_PROGRAM_ID,
      import_spl_token.ASSOCIATED_TOKEN_PROGRAM_ID
    );
    (0, import_shared2.debugLog)("# associatedTokenAccount: ", associatedTokenAccount.toString());
    try {
      yield (0, import_spl_token.getAccount)(
        import_shared2.Node.getConnection(),
        associatedTokenAccount,
        import_shared2.Node.getConnection().commitment,
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
  });
})(AssociatedAccount || (AssociatedAccount = {}));

// src/memo/create.ts
var import_web3 = require("@solana/web3.js");
var import_shared3 = require("@solana-suite/shared");
var import_bs58 = __toESM(require("bs58"));
var Memo;
((Memo4) => {
  Memo4.decode = (encoded) => import_bs58.default.decode(encoded).toString();
  Memo4.encode = (data) => Buffer.from(data);
  Memo4.create = (data, owner, signer, feePayer) => {
    const key = owner.toPublicKey() ? [
      {
        pubkey: owner.toPublicKey(),
        isSigner: true,
        isWritable: true
      }
    ] : [];
    const instruction = new import_web3.TransactionInstruction({
      programId: import_shared3.Constants.MEMO_PROGRAM_ID,
      data: (0, Memo4.encode)(data),
      keys: key
    });
    const payer = feePayer || signer;
    return new import_shared3.Instruction(
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
var import_shared4 = require("@solana-suite/shared");
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
      history.dateTime = (0, import_shared4.convertTimestampToDateTime)(meta.blockTime);
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
var import_shared5 = require("@solana-suite/shared");
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
      history.dateTime = (0, import_shared5.convertTimestampToDateTime)(meta.blockTime);
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
var import_shared6 = require("@solana-suite/shared");
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
      history.dateTime = (0, import_shared6.convertTimestampToDateTime)(meta.blockTime);
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
var import_shared7 = require("@solana-suite/shared");
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
      history.dateTime = (0, import_shared7.convertTimestampToDateTime)(meta.blockTime);
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
var import_shared8 = require("@solana-suite/shared");
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
                (0, import_shared8.debugLog)(
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
var import_shared9 = require("@solana-suite/shared");
var Signatures;
((Signatures2) => {
  const parseForTransaction = (signature) => __async(void 0, null, function* () {
    const res = yield import_shared9.Node.getConnection().getParsedTransaction(signature);
    if (!res) {
      return {};
    }
    return res;
  });
  Signatures2.getForAdress = (_0, _1, _2, _3, ..._4) => __async(void 0, [_0, _1, _2, _3, ..._4], function* (pubkey, parser, callback, options, histories = []) {
    try {
      (0, import_shared9.debugLog)("# options: ", options);
      const transactions = yield import_shared9.Node.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit: options.narrowDown
        }
      );
      (0, import_shared9.debugLog)("# transactions count:", transactions.length);
      for (const transaction of transactions) {
        parseForTransaction(transaction.signature).then((signature) => {
          const history = parser(signature);
          if (history) {
            histories.push(history);
            callback(import_shared9.Result.ok(histories));
          }
        }).catch((e) => callback(import_shared9.Result.err(e)));
        yield (0, import_shared9.sleep)(options.waitTime);
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(import_shared9.Result.err(e));
      }
    }
  });
})(Signatures || (Signatures = {}));

// src/memo/history.ts
var Memo2;
((Memo4) => {
  Memo4.getHistory = (_0, _1, _2, ..._3) => __async(void 0, [_0, _1, _2, ..._3], function* (target, onOk, onErr, options = {}) {
    try {
      const defaultValues = {
        waitTime: 0.03,
        narrowDown: 100
      };
      const mergedOptions = __spreadValues(__spreadValues({}, defaultValues), options);
      const parser = TransactionFilter.parse(
        "only-memo" /* OnlyMemo */,
        "system" /* SolNative */
      );
      yield Signatures.getForAdress(
        target,
        parser,
        (result) => result.match(onOk, onErr),
        mergedOptions
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
var import_shared10 = require("@solana-suite/shared");
var import_web33 = require("@solana/web3.js");

// src/multisig/instruction.ts
var import_web32 = require("@solana/web3.js");
var import_buffer_layout = require("@solana/buffer-layout");
var import_spl_token2 = require("@solana/spl-token");
var Multisig;
((Multisig6) => {
  const createLayoutPubKey = (property) => {
    return (0, import_buffer_layout.blob)(32, property);
  };
  Multisig6.Layout = (0, import_buffer_layout.struct)([
    (0, import_buffer_layout.u8)("m"),
    (0, import_buffer_layout.u8)("n"),
    (0, import_buffer_layout.u8)("is_initialized"),
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
    return import_web32.SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: balanceNeeded,
      space: Multisig6.Layout.span,
      programId: import_spl_token2.TOKEN_PROGRAM_ID
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
        pubkey: import_web32.SYSVAR_RENT_PUBKEY,
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
    const dataLayout = (0, import_buffer_layout.struct)([
      (0, import_buffer_layout.u8)("instruction"),
      (0, import_buffer_layout.u8)("m")
    ]);
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 2,
        m
      },
      data
    );
    return new import_web32.TransactionInstruction({
      keys,
      programId: import_spl_token2.TOKEN_PROGRAM_ID,
      data
    });
  };
})(Multisig || (Multisig = {}));

// src/multisig/create.ts
var Multisig2;
((Multisig6) => {
  Multisig6.create = (m, feePayer, signerPubkeys) => __async(void 0, null, function* () {
    return (0, import_shared10.Try)(() => __async(void 0, null, function* () {
      if (m > signerPubkeys.length) {
        throw Error("signers number less than m number");
      }
      const account = import_web33.Keypair.generate();
      const connection = import_shared10.Node.getConnection();
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
      return new import_shared10.Instruction(
        [inst1, inst2],
        [account],
        feePayer.toKeypair(),
        account.publicKey.toString()
      );
    }));
  });
})(Multisig2 || (Multisig2 = {}));

// src/multisig/get-info.ts
var import_shared11 = require("@solana-suite/shared");
var import_spl_token3 = require("@solana/spl-token");
var import_web34 = require("@solana/web3.js");
var Multisig3;
((Multisig6) => {
  Multisig6.getInfo = (multisig) => __async(void 0, null, function* () {
    return (0, import_shared11.Try)(() => __async(void 0, null, function* () {
      const info = yield import_shared11.Node.getConnection().getAccountInfo(
        multisig.toPublicKey()
      );
      if (info === null) {
        throw Error("Failed to find multisig");
      }
      if (!info.owner.equals(import_spl_token3.TOKEN_PROGRAM_ID)) {
        throw Error("Invalid multisig owner");
      }
      if (info.data.length !== Multisig.Layout.span) {
        throw Error("Invalid multisig size");
      }
      const data = Buffer.from(info.data);
      const multisigInfo = Multisig.Layout.decode(data);
      multisigInfo.signer1 = new import_web34.PublicKey(multisigInfo.signer1);
      multisigInfo.signer2 = new import_web34.PublicKey(multisigInfo.signer2);
      multisigInfo.signer3 = new import_web34.PublicKey(multisigInfo.signer3);
      multisigInfo.signer4 = new import_web34.PublicKey(multisigInfo.signer4);
      multisigInfo.signer5 = new import_web34.PublicKey(multisigInfo.signer5);
      multisigInfo.signer6 = new import_web34.PublicKey(multisigInfo.signer6);
      multisigInfo.signer7 = new import_web34.PublicKey(multisigInfo.signer7);
      multisigInfo.signer8 = new import_web34.PublicKey(multisigInfo.signer8);
      multisigInfo.signer9 = new import_web34.PublicKey(multisigInfo.signer9);
      multisigInfo.signer10 = new import_web34.PublicKey(multisigInfo.signer10);
      multisigInfo.signer11 = new import_web34.PublicKey(multisigInfo.signer11);
      return multisigInfo;
    }));
  });
})(Multisig3 || (Multisig3 = {}));

// src/multisig/is-address.ts
var import_shared12 = require("@solana-suite/shared");
var Multisig4;
((Multisig6) => {
  Multisig6.isAddress = (multisig) => __async(void 0, null, function* () {
    return (0, import_shared12.Try)(() => __async(void 0, null, function* () {
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
var import_shared13 = require("@solana-suite/shared");
var SolNative;
((SolNative7) => {
  SolNative7.findByOwner = (owner) => __async(void 0, null, function* () {
    return (0, import_shared13.Try)(() => __async(void 0, null, function* () {
      var _a, _b, _c, _d, _e, _f;
      const res = yield import_shared13.Node.getConnection().getParsedAccountInfo(
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
var import_web35 = require("@solana/web3.js");
var import_shared14 = require("@solana-suite/shared");
var SolNative2;
((SolNative7) => {
  const RADIX = 10;
  SolNative7.feePayerPartialSignTransfer = (owner, dest, signers, amount, feePayer) => __async(void 0, null, function* () {
    return (0, import_shared14.Try)(() => __async(void 0, null, function* () {
      const blockHashObj = yield import_shared14.Node.getConnection().getLatestBlockhash();
      const tx = new import_web35.Transaction({
        blockhash: blockHashObj.blockhash,
        lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
        feePayer: feePayer.toPublicKey()
      }).add(
        import_web35.SystemProgram.transfer({
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
      return new import_shared14.PartialSignInstruction(hex);
    }));
  });
})(SolNative2 || (SolNative2 = {}));

// src/sol-native/history.ts
var SolNative3;
((SolNative7) => {
  SolNative7.getHistory = (_0, _1, _2, _3, ..._4) => __async(void 0, [_0, _1, _2, _3, ..._4], function* (target, filterType, onOk, onErr, options = {}) {
    try {
      const defaultValues = {
        waitTime: 0.03,
        narrowDown: 100
      };
      const mergedOptions = __spreadValues(__spreadValues({}, defaultValues), options);
      const parser = TransactionFilter.parse(filterType, "system" /* SolNative */);
      yield Signatures.getForAdress(
        target,
        parser,
        (result) => __async(void 0, null, function* () {
          return yield result.match(onOk, onErr);
        }),
        mergedOptions
      );
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  });
})(SolNative3 || (SolNative3 = {}));

// src/sol-native/transfer.ts
var import_web36 = require("@solana/web3.js");
var import_shared15 = require("@solana-suite/shared");
var SolNative4;
((SolNative7) => {
  const RADIX = 10;
  SolNative7.transfer = (source, dest, signers, amount, feePayer) => {
    return (0, import_shared15.Try)(() => {
      const inst = import_web36.SystemProgram.transfer({
        fromPubkey: source.toPublicKey(),
        toPubkey: dest.toPublicKey(),
        lamports: parseInt(`${amount.toLamports()}`, RADIX)
      });
      const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
      return new import_shared15.Instruction(
        [inst],
        signers.map((s) => s.toKeypair()),
        payer
      );
    });
  };
})(SolNative4 || (SolNative4 = {}));

// src/sol-native/transfer-with-multisig.ts
var import_spl_token4 = require("@solana/spl-token");
var import_shared16 = require("@solana-suite/shared");
var SolNative5;
((SolNative7) => {
  const RADIX = 10;
  SolNative7.transferWithMultisig = (owner, dest, signers, amount, feePayer) => __async(void 0, null, function* () {
    return (0, import_shared16.Try)(() => __async(void 0, null, function* () {
      const connection = import_shared16.Node.getConnection();
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const wrapped = yield (0, import_spl_token4.createWrappedNativeAccount)(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        parseInt(`${amount.toLamports()}`, RADIX)
      );
      (0, import_shared16.debugLog)("# wrapped sol: ", wrapped.toBase58());
      const token = yield (0, import_spl_token4.createMint)(
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
      (0, import_shared16.debugLog)("# sourceToken: ", sourceToken);
      const destToken = yield AssociatedAccount.retryGetOrCreate(
        token.toString(),
        wrapped.toString(),
        payer
      );
      (0, import_shared16.debugLog)("# destToken: ", destToken);
      const inst1 = (0, import_spl_token4.createTransferInstruction)(
        sourceToken.toPublicKey(),
        destToken.toPublicKey(),
        owner.toPublicKey(),
        parseInt(`${amount}`, RADIX),
        // No lamports, its sol
        keypairs
      );
      const inst2 = (0, import_spl_token4.createCloseAccountInstruction)(
        wrapped,
        dest.toPublicKey(),
        owner.toPublicKey(),
        keypairs
      );
      return new import_shared16.Instruction(
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
var import_spl_token5 = require("@solana/spl-token");
var import_shared17 = require("@solana-suite/shared");

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
    return (0, import_shared17.Try)(() => __async(void 0, null, function* () {
      const payer = !feePayer ? signers[0] : feePayer;
      const keypairs = signers.map((s) => s.toKeypair());
      const tokenAssociated = yield AssociatedAccount.retryGetOrCreate(
        token,
        owner,
        payer
      );
      const inst = (0, import_spl_token5.createMintToCheckedInstruction)(
        token.toPublicKey(),
        tokenAssociated.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        keypairs
      );
      return new import_shared17.Instruction([inst], keypairs, payer.toKeypair(), token);
    }));
  });
})(SplToken2 || (SplToken2 = {}));

// src/spl-token/burn.ts
var import_spl_token6 = require("@solana/spl-token");
var import_shared18 = require("@solana-suite/shared");
var SplToken3;
((SplToken12) => {
  SplToken12.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => {
    return (0, import_shared18.Try)(() => {
      const tokenAccount = (0, import_spl_token6.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
      const keypairs = signers.map((s) => s.toKeypair());
      const inst = (0, import_spl_token6.createBurnCheckedInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs
      );
      return new import_shared18.Instruction([inst], keypairs, payer);
    });
  };
})(SplToken3 || (SplToken3 = {}));

// src/spl-token/find.ts
var import_shared19 = require("@solana-suite/shared");
var import_shared_metaplex = require("internals/shared-metaplex");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_spl_token7 = require("@solana/spl-token");
var import_cross_fetch = __toESM(require("cross-fetch"));
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
    if (tokenStandard === import_shared_metaplex.UserSideInput.TokenStandard.Fungible) {
      return import_shared_metaplex.Convert.TokenMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else if (tokenStandard === import_shared_metaplex.UserSideInput.TokenStandard.NonFungible) {
      return import_shared_metaplex.Convert.NftMetadata.intoUserSide(
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
      const connection = import_shared19.Node.getConnection();
      const info = yield connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: import_spl_token7.TOKEN_PROGRAM_ID
        }
      );
      info.value.length === 0 && callback(import_shared19.Result.ok([]));
      try {
        for (var iter = __forAwait(info.value), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
          const d = temp.value;
          if (isHolder && d.account.data.parsed.info.tokenAmount.uiAmount < 1) {
            (0, import_shared19.debugLog)(
              "# findByOwner no hold metadata: ",
              d.account.data.parsed.info
            );
            continue;
          }
          const mint = d.account.data.parsed.info.mint;
          const tokenAmount = d.account.data.parsed.info.tokenAmount.amount;
          try {
            const metadata = yield import_mpl_token_metadata.Metadata.fromAccountAddress(
              connection,
              import_shared_metaplex.Pda.getMetadata(mint)
            );
            (0, import_shared19.debugLog)("# findByOwner metadata: ", metadata);
            if (metadata.tokenStandard !== tokenStandard) {
              continue;
            }
            (0, import_cross_fetch.default)(metadata.data.uri).then((response) => {
              response.json().then((json) => {
                data.push(
                  converter(tokenStandard, metadata, json, tokenAmount)
                );
                callback(import_shared19.Result.ok(data));
              }).catch((e) => {
                callback(import_shared19.Result.err(e));
              }).finally(() => {
                const descAlgo = sortByUinixTimestamp("desc" /* Desc */);
                const ascAlgo = sortByUinixTimestamp("asc" /* Asc */);
                if (sortable === "desc" /* Desc */) {
                  data = data.sort(descAlgo);
                } else if (sortable === "asc" /* Asc */) {
                  data = data.sort(ascAlgo);
                }
                callback(import_shared19.Result.ok(data));
              });
            }).catch((e) => {
              callback(import_shared19.Result.err(e));
            });
          } catch (e) {
            if (e instanceof Error && UNABLE_ERROR_REGEX.test(e.message)) {
              (0, import_shared19.debugLog)("# skip error for old SPL-TOKEN: ", mint);
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
        callback(import_shared19.Result.err(e));
      }
    }
  });
  SplToken12.genericFindByMint = (mint, tokenStandard) => __async(void 0, null, function* () {
    var _a;
    try {
      const connection = import_shared19.Node.getConnection();
      const metadata = yield import_mpl_token_metadata.Metadata.fromAccountAddress(
        connection,
        import_shared_metaplex.Pda.getMetadata(mint)
      );
      (0, import_shared19.debugLog)("# findByMint metadata: ", metadata);
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error("token standards are different");
      }
      const info = yield connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = ((_a = info.value) == null ? void 0 : _a.data).parsed.info.supply;
      const response = yield (yield (0, import_cross_fetch.default)(metadata.data.uri)).json();
      return import_shared19.Result.ok(
        converter(tokenStandard, metadata, response, tokenAmount)
      );
    } catch (e) {
      return import_shared19.Result.err(e);
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
      import_shared_metaplex.UserSideInput.TokenStandard.Fungible,
      sortable,
      isHolder
    );
  };
  SplToken12.findByMint = (mint) => __async(void 0, null, function* () {
    return yield (0, SplToken12.genericFindByMint)(
      mint,
      import_shared_metaplex.UserSideInput.TokenStandard.Fungible
    );
  });
})(SplToken4 || (SplToken4 = {}));

// src/spl-token/freeze.ts
var import_shared20 = require("@solana-suite/shared");
var import_spl_token8 = require("@solana/spl-token");
var SplToken5;
((SplToken12) => {
  SplToken12.freeze = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return (0, import_shared20.Try)(() => {
      const tokenAccount = (0, import_spl_token8.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = (0, import_spl_token8.createFreezeAccountInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        new import_shared20.KeypairAccount({ secret: freezeAuthority }).toPublicKey()
      );
      return new import_shared20.Instruction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// src/spl-token/fee-payer-partial-sign-transfer.ts
var import_spl_token9 = require("@solana/spl-token");
var import_web37 = require("@solana/web3.js");
var import_shared21 = require("@solana-suite/shared");
var SplToken6;
((SplToken12) => {
  SplToken12.feePayerPartialSignTransfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __async(void 0, null, function* () {
    return (0, import_shared21.Try)(() => __async(void 0, null, function* () {
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
      const blockhashObj = yield import_shared21.Node.getConnection().getLatestBlockhash();
      const tx = new import_web37.Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      if (!destToken.inst) {
        inst2 = (0, import_spl_token9.createTransferCheckedInstruction)(
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
        inst2 = (0, import_spl_token9.createTransferCheckedInstruction)(
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
      return new import_shared21.PartialSignInstruction(hex);
    }));
  });
})(SplToken6 || (SplToken6 = {}));

// src/spl-token/history.ts
var import_spl_token10 = require("@solana/spl-token");
var import_shared22 = require("@solana-suite/shared");
var SplToken7;
((SplToken12) => {
  SplToken12.getHistory = (_0, _1, _2, _3, ..._4) => __async(void 0, [_0, _1, _2, _3, ..._4], function* (target, filterType, onOk, onErr, options = {}) {
    try {
      const defaultValues = {
        waitTime: 0.03,
        narrowDown: 100
      };
      const mergedOptions = __spreadValues(__spreadValues({}, defaultValues), options);
      if (filterType === "memo" /* Memo */) {
        const parser = TransactionFilter.parse(filterType, "spl-token" /* SplToken */);
        yield Signatures.getForAdress(
          target,
          parser,
          (result) => result.match(onOk, onErr),
          mergedOptions
        );
      } else {
        const tokenAccounts = yield import_shared22.Node.getConnection().getParsedTokenAccountsByOwner(
          target.toPublicKey(),
          {
            programId: import_spl_token10.TOKEN_PROGRAM_ID
          }
        );
        const storedHistories = [];
        (0, import_shared22.debugLog)("# tokenAccounts size: ", tokenAccounts.value.length);
        for (const account of tokenAccounts.value) {
          const parser = TransactionFilter.parse(
            filterType,
            "spl-token" /* SplToken */
          );
          yield Signatures.getForAdress(
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
  });
})(SplToken7 || (SplToken7 = {}));

// src/spl-token/mint.ts
var import_web38 = require("@solana/web3.js");
var import_spl_token11 = require("@solana/spl-token");
var import_mpl_token_metadata2 = require("@metaplex-foundation/mpl-token-metadata");
var import_shared23 = require("@solana-suite/shared");
var import_shared_metaplex2 = require("internals/shared-metaplex");
var import_storage = require("internals/storage");
var SplToken8;
((SplToken12) => {
  SplToken12.createFreezeAuthority = (mint2, owner, freezeAuthority) => {
    return (0, import_spl_token11.createSetAuthorityInstruction)(
      mint2,
      owner,
      import_spl_token11.AuthorityType.FreezeAccount,
      freezeAuthority
    );
  };
  SplToken12.createMintInstructions = (mint2, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => __async(void 0, null, function* () {
    const connection = import_shared23.Node.getConnection();
    const lamports = yield (0, import_spl_token11.getMinimumBalanceForRentExemptMint)(connection);
    const metadataPda = import_shared_metaplex2.Pda.getMetadata(mint2.toString());
    const tokenAssociated = (0, import_spl_token11.getAssociatedTokenAddressSync)(mint2, owner);
    const inst1 = import_web38.SystemProgram.createAccount({
      fromPubkey: feePayer,
      newAccountPubkey: mint2,
      space: import_spl_token11.MINT_SIZE,
      lamports,
      programId: import_spl_token11.TOKEN_PROGRAM_ID
    });
    const inst2 = (0, import_spl_token11.createInitializeMintInstruction)(
      mint2,
      mintDecimal,
      owner,
      owner,
      import_spl_token11.TOKEN_PROGRAM_ID
    );
    const inst3 = (0, import_spl_token11.createAssociatedTokenAccountInstruction)(
      feePayer,
      tokenAssociated,
      owner,
      mint2
    );
    const inst4 = (0, import_spl_token11.createMintToCheckedInstruction)(
      mint2,
      tokenAssociated,
      owner,
      SplToken.calculateAmount(totalAmount, mintDecimal),
      mintDecimal
    );
    const inst5 = (0, import_mpl_token_metadata2.createCreateMetadataAccountV3Instruction)(
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
    return (0, import_shared23.Try)(() => __async(void 0, null, function* () {
      const valid = import_shared_metaplex2.Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const payer = feePayer ? feePayer : signer;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const tokenStorageMetadata = import_storage.Storage.toConvertOffchaindata(
        input,
        input.royalty
      );
      const createdAt = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      tokenStorageMetadata.created_at = createdAt;
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = yield import_storage.Storage.uploadMetaAndContent(
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
      const datav2 = import_shared_metaplex2.Convert.TokenMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      (0, import_shared23.debugLog)("# datav2: ", datav2);
      (0, import_shared23.debugLog)("# upload content url: ", uri);
      const mint2 = import_shared23.KeypairAccount.create();
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
      return new import_shared23.MintInstruction(
        insts,
        [signer.toKeypair(), mint2.toKeypair()],
        payer.toKeypair(),
        mint2.pubkey
      );
    }));
  });
})(SplToken8 || (SplToken8 = {}));

// src/spl-token/thaw.ts
var import_shared24 = require("@solana-suite/shared");
var import_spl_token12 = require("@solana/spl-token");
var SplToken9;
((SplToken12) => {
  SplToken12.thaw = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return (0, import_shared24.Try)(() => {
      const tokenAccount = (0, import_spl_token12.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = (0, import_spl_token12.createThawAccountInstruction)(
        tokenAccount,
        mint.toPublicKey(),
        new import_shared24.KeypairAccount({ secret: freezeAuthority }).toPublicKey()
      );
      return new import_shared24.Instruction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken9 || (SplToken9 = {}));

// src/spl-token/transfer.ts
var import_spl_token13 = require("@solana/spl-token");
var import_shared25 = require("@solana-suite/shared");
var SplToken10;
((SplToken12) => {
  SplToken12.transfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __async(void 0, null, function* () {
    return (0, import_shared25.Try)(() => __async(void 0, null, function* () {
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
      const inst = (0, import_spl_token13.createTransferCheckedInstruction)(
        sourceToken.toPublicKey(),
        mint.toPublicKey(),
        destToken.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(amount, mintDecimal),
        mintDecimal,
        keypairs
      );
      return new import_shared25.Instruction([inst], keypairs, payer.toKeypair());
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Airdrop,
  AssociatedAccount,
  FilterOptions,
  FilterType,
  Memo,
  ModuleName,
  Multisig,
  SolNative,
  Sortable,
  SplToken
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9haXJkcm9wLnRzIiwgIi4uL3NyYy9hc3NvY2lhdGVkLWFjY291bnQudHMiLCAiLi4vc3JjL21lbW8vY3JlYXRlLnRzIiwgIi4uL3NyYy90eXBlcy9maW5kLnRzIiwgIi4uL3NyYy90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXIudHMiLCAiLi4vc3JjL2NvbnZlcnQvbWVtby50cyIsICIuLi9zcmMvY29udmVydC9taW50LnRzIiwgIi4uL3NyYy9jb252ZXJ0L3RyYW5zZmVyLnRzIiwgIi4uL3NyYy9jb252ZXJ0L3RyYW5zZmVyLWNoZWNrZWQudHMiLCAiLi4vc3JjL3RyYW5zYWN0aW9uLWZpbHRlci50cyIsICIuLi9zcmMvc2lnbmF0dXJlcy50cyIsICIuLi9zcmMvbWVtby9oaXN0b3J5LnRzIiwgIi4uL3NyYy9tZW1vL2luZGV4LnRzIiwgIi4uL3NyYy9tdWx0aXNpZy9jcmVhdGUudHMiLCAiLi4vc3JjL211bHRpc2lnL2luc3RydWN0aW9uLnRzIiwgIi4uL3NyYy9tdWx0aXNpZy9nZXQtaW5mby50cyIsICIuLi9zcmMvbXVsdGlzaWcvaXMtYWRkcmVzcy50cyIsICIuLi9zcmMvbXVsdGlzaWcvaW5kZXgudHMiLCAiLi4vc3JjL3NvbC1uYXRpdmUvZmluZC50cyIsICIuLi9zcmMvc29sLW5hdGl2ZS9mZWUtcGF5ZXItcGFydGlhbC1zaWduLXRyYW5zZmVyLnRzIiwgIi4uL3NyYy9zb2wtbmF0aXZlL2hpc3RvcnkudHMiLCAiLi4vc3JjL3NvbC1uYXRpdmUvdHJhbnNmZXIudHMiLCAiLi4vc3JjL3NvbC1uYXRpdmUvdHJhbnNmZXItd2l0aC1tdWx0aXNpZy50cyIsICIuLi9zcmMvc29sLW5hdGl2ZS9pbmRleC50cyIsICIuLi9zcmMvc3BsLXRva2VuL2FkZC50cyIsICIuLi9zcmMvc3BsLXRva2VuL2NhbGN1bGF0ZS1hbW91bnQudHMiLCAiLi4vc3JjL3NwbC10b2tlbi9idXJuLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vZmluZC50cyIsICIuLi9zcmMvc3BsLXRva2VuL2ZyZWV6ZS50cyIsICIuLi9zcmMvc3BsLXRva2VuL2ZlZS1wYXllci1wYXJ0aWFsLXNpZ24tdHJhbnNmZXIudHMiLCAiLi4vc3JjL3NwbC10b2tlbi9oaXN0b3J5LnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vbWludC50cyIsICIuLi9zcmMvc3BsLXRva2VuL3RoYXcudHMiLCAiLi4vc3JjL3NwbC10b2tlbi90cmFuc2Zlci50cyIsICIuLi9zcmMvc3BsLXRva2VuL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2FpcmRyb3AnO1xuZXhwb3J0ICogZnJvbSAnLi9hc3NvY2lhdGVkLWFjY291bnQnO1xuZXhwb3J0ICogZnJvbSAnLi9tZW1vJztcbmV4cG9ydCAqIGZyb20gJy4vbXVsdGlzaWcnO1xuZXhwb3J0ICogZnJvbSAnLi9zb2wtbmF0aXZlJztcbmV4cG9ydCAqIGZyb20gJy4vc3BsLXRva2VuJztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuIiwgImltcG9ydCB7IE5vZGUsIFJlc3VsdCwgZGVidWdMb2csIFRyeSwgUHVia2V5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFpcmRyb3Age1xuICBjb25zdCBERUZBVUxUX0FJUkRST1BfQU1PVU5UID0gMTtcbiAgY29uc3QgTUFYX0FJUkRST1BfU09MID0gMjtcblxuICBleHBvcnQgY29uc3QgcmVxdWVzdCA9IGFzeW5jIChcbiAgICBwdWJrZXk6IFB1YmtleSxcbiAgICBhaXJkcm9wQW1vdW50PzogbnVtYmVyLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJ05vdyBhaXJkcm9wcGluZy4uLnBsZWFzZSB3YWl0Jyk7XG5cbiAgICAgIGFpcmRyb3BBbW91bnQgPSAhYWlyZHJvcEFtb3VudFxuICAgICAgICA/IERFRkFVTFRfQUlSRFJPUF9BTU9VTlQudG9MYW1wb3J0cygpXG4gICAgICAgIDogYWlyZHJvcEFtb3VudC50b0xhbXBvcnRzKCk7XG5cbiAgICAgIGlmIChhaXJkcm9wQW1vdW50ID4gTUFYX0FJUkRST1BfU09MLnRvTGFtcG9ydHMoKSkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBgT3ZlciBtYXggYWlyZHJvcCBhbW91bnQ6ICR7YWlyZHJvcEFtb3VudH0sIG1heDogJHtNQVhfQUlSRFJPUF9TT0wudG9MYW1wb3J0cygpfWAsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNpZyA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJlcXVlc3RBaXJkcm9wKFxuICAgICAgICBwdWJrZXkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYWlyZHJvcEFtb3VudCxcbiAgICAgICk7XG4gICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhzaWcpO1xuICAgICAgcmV0dXJuICdzdWNjZXNzJztcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBJbnN0cnVjdGlvbixcbiAgS2V5cGFpckFjY291bnQsXG4gIE5vZGUsXG4gIFB1YmtleSxcbiAgU2VjcmV0LFxuICBzbGVlcCxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFjY291bnQsXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBUT0tFTl9QUk9HUkFNX0lELFxuICBUb2tlbkFjY291bnROb3RGb3VuZEVycm9yLFxuICBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcixcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG4vKipcbiAqIEdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICpcbiAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICogQHBhcmFtIHtib29sZWFufSBhbGxvd093bmVyT2ZmQ3VydmVcbiAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nIHwgSW5zdHJ1Y3Rpb24+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQXNzb2NpYXRlZEFjY291bnQge1xuICBjb25zdCBSRVRSWV9PVkVSX0xJTUlUID0gMTA7XG4gIGNvbnN0IFJFVFJZX1NMRUVQX1RJTUUgPSAzO1xuICBjb25zdCBnZXQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgKTogUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj4gPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgbmV3IEtleXBhaXJBY2NvdW50KHsgc2VjcmV0OiBmZWVQYXllciB9KS5wdWJrZXksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgKTtcblxuICAgIGlmICghcmVzLmluc3QpIHtcbiAgICAgIHJldHVybiByZXMudG9rZW5BY2NvdW50O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICBbcmVzLmluc3RdLFxuICAgICAgW10sXG4gICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgIHJlcy50b2tlbkFjY291bnQsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0cnkgZnVuY3Rpb24gaWYgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHJldHJ5R2V0T3JDcmVhdGUgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICBsZXQgY291bnRlciA9IDE7XG4gICAgd2hpbGUgKGNvdW50ZXIgPCBSRVRSWV9PVkVSX0xJTUlUKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpbnN0ID0gYXdhaXQgZ2V0KG1pbnQsIG93bmVyLCBmZWVQYXllciwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKGluc3QgJiYgdHlwZW9mIGluc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgaW5zdCk7XG4gICAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zdCBpbnN0YW5jZW9mIEluc3RydWN0aW9uKSB7XG4gICAgICAgICAgKGF3YWl0IGluc3Quc3VibWl0KCkpLm1hcChcbiAgICAgICAgICAgIGFzeW5jIChvaykgPT4ge1xuICAgICAgICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhvayk7XG4gICAgICAgICAgICAgIHJldHVybiBpbnN0LmRhdGEgYXMgc3RyaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgZGVidWdMb2coJyMgRXJyb3Igc3VibWl0IHJldHJ5R2V0T3JDcmVhdGU6ICcsIGVycik7XG4gICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkZWJ1Z0xvZyhgIyByZXRyeTogJHtjb3VudGVyfSBjcmVhdGUgdG9rZW4gYWNjb3VudDogYCwgZSk7XG4gICAgICAgIGRlYnVnTG9nKGAjIG1pbnQ6ICR7bWludH0sIG93bmVyOiAke293bmVyfSwgZmVlUGF5ZXI6ICR7ZmVlUGF5ZXJ9YCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzbGVlcChSRVRSWV9TTEVFUF9USU1FKTtcbiAgICAgIGNvdW50ZXIrKztcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoYHJldHJ5IGFjdGlvbiBpcyBvdmVyIGxpbWl0ICR7UkVUUllfT1ZFUl9MSU1JVH1gKTtcbiAgfTtcblxuICAvKipcbiAgICogW01haW4gbG9naWNdR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAgICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgKTogUHJvbWlzZTx7XG4gICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgfT4gPT4ge1xuICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICk7XG5cbiAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgYXdhaXQgZ2V0QWNjb3VudChcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLmNvbW1pdG1lbnQsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IpICYmXG4gICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcilcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBlcnJvcicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgIGluc3QsXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IENvbnN0YW50cywgSW5zdHJ1Y3Rpb24sIFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE1lbW8ge1xuICBleHBvcnQgY29uc3QgZGVjb2RlID0gKGVuY29kZWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGJzLmRlY29kZShlbmNvZGVkKS50b1N0cmluZygpO1xuXG4gIGV4cG9ydCBjb25zdCBlbmNvZGUgPSAoZGF0YTogc3RyaW5nKTogQnVmZmVyID0+IEJ1ZmZlci5mcm9tKGRhdGEpO1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGUgPSAoXG4gICAgZGF0YTogc3RyaW5nLFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyOiBTZWNyZXQsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IEluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXkgPSBvd25lci50b1B1YmxpY0tleSgpXG4gICAgICA/IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwdWJrZXk6IG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBpc1NpZ25lcjogdHJ1ZSxcbiAgICAgICAgICAgIGlzV3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgICAgOiBbXTtcblxuICAgIGNvbnN0IGluc3RydWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAgcHJvZ3JhbUlkOiBDb25zdGFudHMuTUVNT19QUk9HUkFNX0lELFxuICAgICAgZGF0YTogZW5jb2RlKGRhdGEpLFxuICAgICAga2V5czoga2V5LFxuICAgIH0pO1xuXG4gICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciB8fCBzaWduZXI7XG5cbiAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgW2luc3RydWN0aW9uXSxcbiAgICAgIFtzaWduZXIudG9LZXlwYWlyKCldLFxuICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBVc2VyU2lkZU91dHB1dCB9IGZyb20gJ2ludGVybmFscy9zaGFyZWQtbWV0YXBsZXgnO1xuXG5leHBvcnQgZW51bSBTb3J0YWJsZSB7XG4gIEFzYyA9ICdhc2MnLFxuICBEZXNjID0gJ2Rlc2MnLFxufVxuXG5leHBvcnQgdHlwZSBUb2tlbk1ldGFkYXRhID0gVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YTtcbiIsICJleHBvcnQgZW51bSBGaWx0ZXJUeXBlIHtcbiAgTWVtbyA9ICdtZW1vJyxcbiAgTWludCA9ICdtaW50JyxcbiAgT25seU1lbW8gPSAnb25seS1tZW1vJyxcbiAgVHJhbnNmZXIgPSAndHJhbnNmZXInLFxufVxuXG5leHBvcnQgZW51bSBNb2R1bGVOYW1lIHtcbiAgU29sTmF0aXZlID0gJ3N5c3RlbScsXG4gIFNwbFRva2VuID0gJ3NwbC10b2tlbicsXG59XG5cbmV4cG9ydCBjb25zdCBGaWx0ZXJPcHRpb25zID0ge1xuICBUcmFuc2Zlcjoge1xuICAgIHByb2dyYW06IFsnc3lzdGVtJywgJ3NwbC10b2tlbiddLFxuICAgIGFjdGlvbjogWyd0cmFuc2ZlcicsICd0cmFuc2ZlckNoZWNrZWQnXSxcbiAgfSxcbiAgTWVtbzoge1xuICAgIHByb2dyYW06IFsnc3BsLW1lbW8nXSxcbiAgICBhY3Rpb246IFsnKiddLFxuICB9LFxuICBNaW50OiB7XG4gICAgcHJvZ3JhbTogWydzcGwtdG9rZW4nXSxcbiAgICBhY3Rpb246IFsnbWludFRvJywgJ21pbnRUb0NoZWNrZWQnXSxcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIFBvc3RUb2tlbkFjY291bnQgPSB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgb3duZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFdpdGhNZW1vID0ge1xuICBzaWc6IHN0cmluZ1tdO1xuICBtZW1vOiBzdHJpbmc7XG59O1xuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgSW5mcmFTaWRlT3V0cHV0LCBQb3N0VG9rZW5BY2NvdW50LCBVc2VyU2lkZU91dHB1dCB9IGZyb20gJy4uL3R5cGVzLyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0Lk1lbW8ge1xuICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk1lbW8sXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICBvdXRwdXRUcmFuc2Zlcj86IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgKTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgaGlzdG9yeTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSA9IHt9O1xuXG4gICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtID09PSAnc3BsLXRva2VuJykge1xuICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhpc3RvcnkubWVtbyA9IG91dHB1dC5wYXJzZWQ7XG4gICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICcuLi90eXBlcy8nO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydC5NaW50IHtcbiAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5NaW50VG8sXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgKTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgaGlzdG9yeTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSA9IHt9O1xuXG4gICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICBoaXN0b3J5LmFjY291bnQgPSBvdXRwdXQucGFyc2VkLmluZm8uYWNjb3VudDtcbiAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICcuLi90eXBlcy8nO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydC5UcmFuc2ZlciB7XG4gIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuVHJhbnNmZXIsXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgKTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgaGlzdG9yeTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSA9IHt9O1xuXG4gICAgLy8gdmFsaWRhdGlvbiBjaGVja1xuICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICBoaXN0b3J5LnNvbCA9IG91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cz8udG9Tb2woKS50b1N0cmluZygpO1xuICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgaWYgKFxuICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICApIHtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhpc3Rvcnk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQsIFBvc3RUb2tlbkFjY291bnQsIFVzZXJTaWRlT3V0cHV0IH0gZnJvbSAnLi4vdHlwZXMvJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnQuVHJhbnNmZXJDaGVja2VkIHtcbiAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICApOiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBoaXN0b3J5OiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5ID0ge307XG5cbiAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCkge1xuICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICApO1xuICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICApO1xuICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICB9XG5cbiAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgIGhpc3RvcnkubXVsdGlzaWdBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubXVsdGlzaWdBdXRob3JpdHk7XG4gICAgaGlzdG9yeS5zaWduZXJzID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNpZ25lcnM7XG4gICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0IGFzIF9NZW1vIH0gZnJvbSAnLi9jb252ZXJ0L21lbW8nO1xuaW1wb3J0IHsgQ29udmVydCBhcyBfTWludCB9IGZyb20gJy4vY29udmVydC9taW50JztcbmltcG9ydCB7IENvbnZlcnQgYXMgX1RyYW5zZmVyIH0gZnJvbSAnLi9jb252ZXJ0L3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnQgYXMgX1RyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vY29udmVydC90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IFBhcnNlZEluc3RydWN0aW9uLCBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIEZpbHRlck9wdGlvbnMsXG4gIEZpbHRlclR5cGUsXG4gIE1vZHVsZU5hbWUsXG4gIFBvc3RUb2tlbkFjY291bnQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG4vL0BpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkZpbHRlciB7XG4gIGNvbnN0IGNyZWF0ZVBvc3RUb2tlbkFjY291bnRMaXN0ID0gKFxuICAgIHRyYW5zYWN0aW9uOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICApOiBQb3N0VG9rZW5BY2NvdW50W10gPT4ge1xuICAgIGNvbnN0IHBvc3RUb2tlbkFjY291bnQ6IFBvc3RUb2tlbkFjY291bnRbXSA9IFtdO1xuICAgIGNvbnN0IGFjY291bnRLZXlzID0gdHJhbnNhY3Rpb24udHJhbnNhY3Rpb24ubWVzc2FnZS5hY2NvdW50S2V5cy5tYXAoKHQpID0+XG4gICAgICB0LnB1YmtleS50b1N0cmluZygpLFxuICAgICk7XG5cbiAgICB0cmFuc2FjdGlvbi5tZXRhPy5wb3N0VG9rZW5CYWxhbmNlcz8uZm9yRWFjaCgodCkgPT4ge1xuICAgICAgaWYgKGFjY291bnRLZXlzW3QuYWNjb3VudEluZGV4XSAmJiB0Lm93bmVyKSB7XG4gICAgICAgIGNvbnN0IHYgPSB7XG4gICAgICAgICAgYWNjb3VudDogYWNjb3VudEtleXNbdC5hY2NvdW50SW5kZXhdLFxuICAgICAgICAgIG93bmVyOiB0Lm93bmVyLFxuICAgICAgICB9O1xuICAgICAgICBwb3N0VG9rZW5BY2NvdW50LnB1c2godik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBvc3RUb2tlbkFjY291bnQ7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzUGFyc2VkSW5zdHJ1Y3Rpb24gPSAoXG4gICAgYXJnOiB1bmtub3duLFxuICApOiBhcmcgaXMgUGFyc2VkSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBhcmcgIT09IG51bGwgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgJ3BhcnNlZCcgaW4gYXJnO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBwYXJzZSA9XG4gICAgKGZpbHRlclR5cGU6IEZpbHRlclR5cGUsIG1vZHVsZU5hbWU6IE1vZHVsZU5hbWUpID0+XG4gICAgKHR4TWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSk6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgbGV0IGhpc3Rvcnk6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnkgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZmlsdGVyVHlwZSA9PT0gRmlsdGVyVHlwZS5NaW50ICYmXG4gICAgICAgIG1vZHVsZU5hbWUgPT09IE1vZHVsZU5hbWUuU29sTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgXCJUaGlzIGZpbHRlclR5cGUoJ0ZpbHRlclR5cGUuTWludCcpIGNhbiBub3QgdXNlIGZyb20gU29sTmF0aXZlIG1vZHVsZVwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXR4TWV0YSkge1xuICAgICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcG9zdFRva2VuQWNjb3VudCA9IGNyZWF0ZVBvc3RUb2tlbkFjY291bnRMaXN0KHR4TWV0YSk7XG5cbiAgICAgIHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICBpZiAoaXNQYXJzZWRJbnN0cnVjdGlvbihpbnN0cnVjdGlvbikpIHtcbiAgICAgICAgICBzd2l0Y2ggKGZpbHRlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5NZW1vOiB7XG4gICAgICAgICAgICAgIGlmIChGaWx0ZXJPcHRpb25zLk1lbW8ucHJvZ3JhbS5pbmNsdWRlcyhpbnN0cnVjdGlvbi5wcm9ncmFtKSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgbGV0IGluc3RydWN0aW9uVHJhbnNmZXI7XG5cbiAgICAgICAgICAgICAgICAvLyBmZXRjaCAgdHJhbnNmZXIgdHJhbnNhY3Rpb24gZm9yIHJlbGF0aW9uYWwgbWVtb1xuICAgICAgICAgICAgICAgIHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgKGluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICBpc1BhcnNlZEluc3RydWN0aW9uKGluc3RydWN0aW9uKSAmJlxuICAgICAgICAgICAgICAgICAgICAgIEZpbHRlck9wdGlvbnMuVHJhbnNmZXIucHJvZ3JhbS5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnByb2dyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyID0gaW5zdHJ1Y3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vIHNwbC10b2tlbiBvciBzeXN0ZW1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyICYmXG4gICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lICE9PSBpbnN0cnVjdGlvblRyYW5zZmVyWydwcm9ncmFtJ11cbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGRlYnVnTG9nKFxuICAgICAgICAgICAgICAgICAgICAnIyBGaWx0ZXJUeXBlLk1lbW8gYnJlYWsgaW5zdHJ1Y3Rpb246ICcsXG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uVHJhbnNmZXIsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZmV0Y2ggbWVtbyBvbmx5IHRyYW5zYWN0aW9uXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IF9NZW1vLk1lbW8uaW50b1VzZXJTaWRlKFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyLFxuICAgICAgICAgICAgICAgICAgcG9zdFRva2VuQWNjb3VudCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBGaWx0ZXJUeXBlLk9ubHlNZW1vOiB7XG4gICAgICAgICAgICAgIGlmIChGaWx0ZXJPcHRpb25zLk1lbW8ucHJvZ3JhbS5pbmNsdWRlcyhpbnN0cnVjdGlvbi5wcm9ncmFtKSkge1xuICAgICAgICAgICAgICAgIGxldCBpbnN0cnVjdGlvblRyYW5zZmVyO1xuXG4gICAgICAgICAgICAgICAgaGlzdG9yeSA9IF9NZW1vLk1lbW8uaW50b1VzZXJTaWRlKFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyLFxuICAgICAgICAgICAgICAgICAgcG9zdFRva2VuQWNjb3VudCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBGaWx0ZXJUeXBlLk1pbnQ6IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIEZpbHRlck9wdGlvbnMuTWludC5wcm9ncmFtLmluY2x1ZGVzKGluc3RydWN0aW9uLnByb2dyYW0pICYmXG4gICAgICAgICAgICAgICAgRmlsdGVyT3B0aW9ucy5NaW50LmFjdGlvbi5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnBhcnNlZC50eXBlIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBfTWludC5NaW50LmludG9Vc2VyU2lkZShpbnN0cnVjdGlvbiwgdHhNZXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5UcmFuc2ZlcjpcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG1vZHVsZU5hbWUgPT09IGluc3RydWN0aW9uLnByb2dyYW0gJiZcbiAgICAgICAgICAgICAgICBGaWx0ZXJPcHRpb25zLlRyYW5zZmVyLmFjdGlvbi5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnBhcnNlZC50eXBlIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChpbnN0cnVjdGlvbi5wYXJzZWQudHlwZSA9PT0gJ3RyYW5zZmVyQ2hlY2tlZCcpIHtcbiAgICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBfVHJhbnNmZXJDaGVja2VkLlRyYW5zZmVyQ2hlY2tlZC5pbnRvVXNlclNpZGUoXG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICAgIHBvc3RUb2tlbkFjY291bnQsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBoaXN0b3J5ID0gX1RyYW5zZmVyLlRyYW5zZmVyLmludG9Vc2VyU2lkZShcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHR4TWV0YSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gXCJAc29sYW5hL3dlYjMuanNcIjtcbmltcG9ydCB7IGRlYnVnTG9nLCBOb2RlLCBQdWJrZXksIFJlc3VsdCwgc2xlZXAgfSBmcm9tIFwiQHNvbGFuYS1zdWl0ZS9zaGFyZWRcIjtcbmltcG9ydCB7IFVzZXJTaWRlT3V0cHV0IH0gZnJvbSBcIi4vdHlwZXMvXCI7XG5cbi8vQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFNpZ25hdHVyZXMge1xuICBjb25zdCBwYXJzZUZvclRyYW5zYWN0aW9uID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICApOiBQcm9taXNlPFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGE+ID0+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRQYXJzZWRUcmFuc2FjdGlvbihzaWduYXR1cmUpO1xuICAgIGlmICghcmVzKSB7XG4gICAgICByZXR1cm4ge30gYXMgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Rm9yQWRyZXNzID0gYXN5bmMgKFxuICAgIHB1YmtleTogUHVia2V5LFxuICAgIHBhcnNlcjogKFxuICAgICAgdHJhbnNhY3Rpb246IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKSA9PiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5IHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrOiAoaGlzdG9yeTogUmVzdWx0PFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnlbXSwgRXJyb3I+KSA9PiB2b2lkLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHdhaXRUaW1lOiBudW1iZXI7XG4gICAgICBuYXJyb3dEb3duOiBudW1iZXI7XG4gICAgfSxcbiAgICBoaXN0b3JpZXM6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnlbXSA9IFtdLFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgZGVidWdMb2coXCIjIG9wdGlvbnM6IFwiLCBvcHRpb25zKTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9ucyA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldFNpZ25hdHVyZXNGb3JBZGRyZXNzKFxuICAgICAgICBwdWJrZXkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAge1xuICAgICAgICAgIGxpbWl0OiBvcHRpb25zLm5hcnJvd0Rvd24sXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZyhcIiMgdHJhbnNhY3Rpb25zIGNvdW50OlwiLCB0cmFuc2FjdGlvbnMubGVuZ3RoKTtcblxuICAgICAgZm9yIChjb25zdCB0cmFuc2FjdGlvbiBvZiB0cmFuc2FjdGlvbnMpIHtcbiAgICAgICAgcGFyc2VGb3JUcmFuc2FjdGlvbih0cmFuc2FjdGlvbi5zaWduYXR1cmUpXG4gICAgICAgICAgLnRoZW4oKHNpZ25hdHVyZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeSA9IHBhcnNlcihzaWduYXR1cmUpO1xuICAgICAgICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgaGlzdG9yaWVzLnB1c2goaGlzdG9yeSk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhoaXN0b3JpZXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZSkgPT4gY2FsbGJhY2soUmVzdWx0LmVycihlKSkpO1xuICAgICAgICBhd2FpdCBzbGVlcChvcHRpb25zLndhaXRUaW1lKTsgLy8gYXZvaWQgNDI5IGVycm9yXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHVia2V5IH0gZnJvbSBcIkBzb2xhbmEtc3VpdGUvc2hhcmVkXCI7XG5pbXBvcnQge1xuICBGaWx0ZXJUeXBlLFxuICBIaXN0b3J5LFxuICBIaXN0b3J5T3B0aW9ucyxcbiAgTW9kdWxlTmFtZSxcbiAgT25FcnIsXG4gIE9uT2ssXG59IGZyb20gXCIuLi90eXBlcy9cIjtcbmltcG9ydCB7IFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSBcIi4uL3RyYW5zYWN0aW9uLWZpbHRlclwiO1xuaW1wb3J0IHsgU2lnbmF0dXJlcyB9IGZyb20gXCIuLi9zaWduYXR1cmVzXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWVtbyB7XG4gIGV4cG9ydCBjb25zdCBnZXRIaXN0b3J5ID0gYXN5bmMgKFxuICAgIHRhcmdldDogUHVia2V5LFxuICAgIG9uT2s6IE9uT2s8SGlzdG9yeT4sXG4gICAgb25FcnI6IE9uRXJyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8SGlzdG9yeU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWVzOiBIaXN0b3J5T3B0aW9ucyA9IHtcbiAgICAgICAgd2FpdFRpbWU6IDAuMDMsXG4gICAgICAgIG5hcnJvd0Rvd246IDEwMCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXJnZWRPcHRpb25zID0geyAuLi5kZWZhdWx0VmFsdWVzLCAuLi5vcHRpb25zIH07XG4gICAgICBjb25zdCBwYXJzZXIgPSBUcmFuc2FjdGlvbkZpbHRlci5wYXJzZShcbiAgICAgICAgRmlsdGVyVHlwZS5Pbmx5TWVtbyxcbiAgICAgICAgTW9kdWxlTmFtZS5Tb2xOYXRpdmUsXG4gICAgICApO1xuICAgICAgYXdhaXQgU2lnbmF0dXJlcy5nZXRGb3JBZHJlc3MoXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgcGFyc2VyLFxuICAgICAgICAocmVzdWx0KSA9PiByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgICBtZXJnZWRPcHRpb25zXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgb25FcnIoZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IE1lbW8gYXMgQ3JlYXRlIH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgTWVtbyBhcyBIaXN0b3J5IH0gZnJvbSAnLi9oaXN0b3J5JztcblxuZXhwb3J0IGNvbnN0IE1lbW8gPSBPYmplY3QuYXNzaWduKHt9LCBDcmVhdGUsIEhpc3RvcnkpO1xuIiwgImltcG9ydCB7XG4gIE5vZGUsXG4gIFJlc3VsdCxcbiAgSW5zdHJ1Y3Rpb24sXG4gIFRyeSxcbiAgU2VjcmV0LFxuICBQdWJrZXksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEtleXBhaXIgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTXVsdGlzaWcgYXMgX0luc3RydWN0aW9uIH0gZnJvbSAnLi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICBleHBvcnQgY29uc3QgY3JlYXRlID0gYXN5bmMgKFxuICAgIG06IG51bWJlcixcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgIHNpZ25lclB1YmtleXM6IFB1YmtleVtdLFxuICApOiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBpZiAobSA+IHNpZ25lclB1YmtleXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdzaWduZXJzIG51bWJlciBsZXNzIHRoYW4gbSBudW1iZXInKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWNjb3VudCA9IEtleXBhaXIuZ2VuZXJhdGUoKTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IGJhbGFuY2VOZWVkZWQgPSBhd2FpdCBjb25uZWN0aW9uLmdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdGlvbihcbiAgICAgICAgX0luc3RydWN0aW9uLkxheW91dC5zcGFuLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdDEgPSBfSW5zdHJ1Y3Rpb24uYWNjb3VudChcbiAgICAgICAgYWNjb3VudCxcbiAgICAgICAgZmVlUGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIGJhbGFuY2VOZWVkZWQsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0MiA9IF9JbnN0cnVjdGlvbi5tdWx0aXNpZyhcbiAgICAgICAgbSxcbiAgICAgICAgYWNjb3VudCxcbiAgICAgICAgc2lnbmVyUHVia2V5cy5tYXAoKHB1YmtleTogUHVia2V5KSA9PiBwdWJrZXkudG9QdWJsaWNLZXkoKSksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgICBbaW5zdDEsIGluc3QyXSxcbiAgICAgICAgW2FjY291bnRdLFxuICAgICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgYWNjb3VudC5wdWJsaWNLZXkudG9TdHJpbmcoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBLZXlwYWlyLFxuICBTWVNWQVJfUkVOVF9QVUJLRVksXG4gIFN5c3RlbVByb2dyYW0sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IHN0cnVjdCwgdTgsIGJsb2IgfSBmcm9tICdAc29sYW5hL2J1ZmZlci1sYXlvdXQnO1xuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuLy8gQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIE11bHRpc2lnIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBjb25zdCBjcmVhdGVMYXlvdXRQdWJLZXkgPSAocHJvcGVydHk6IHN0cmluZyk6IGFueSA9PiB7XG4gICAgcmV0dXJuIGJsb2IoMzIsIHByb3BlcnR5KTtcbiAgfTtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFyZ3VtZW50ICovXG4gIGV4cG9ydCBjb25zdCBMYXlvdXQgPSBzdHJ1Y3Q8e1xuICAgIG06IG51bWJlcjtcbiAgICBuOiBudW1iZXI7XG4gICAgaXNfaW5pdGlhbGl6ZWQ6IG51bWJlcjtcbiAgICBzaWduZXIxOiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyMjogUHVibGljS2V5O1xuICAgIHNpZ25lcjM6IFB1YmxpY0tleTtcbiAgICBzaWduZXI0OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNTogUHVibGljS2V5O1xuICAgIHNpZ25lcjY6IFB1YmxpY0tleTtcbiAgICBzaWduZXI3OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyODogUHVibGljS2V5O1xuICAgIHNpZ25lcjk6IFB1YmxpY0tleTtcbiAgICBzaWduZXIxMDogUHVibGljS2V5O1xuICAgIHNpZ25lcjExOiBQdWJsaWNLZXk7XG4gIH0+KFtcbiAgICB1OCgnbScpLFxuICAgIHU4KCduJyksXG4gICAgdTgoJ2lzX2luaXRpYWxpemVkJyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXIxJyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXIyJyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXIzJyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI0JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI1JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI2JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI3JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI4JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXI5JyksXG4gICAgY3JlYXRlTGF5b3V0UHViS2V5KCdzaWduZXIxMCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMTEnKSxcbiAgXSk7XG5cbiAgZXhwb3J0IGNvbnN0IGFjY291bnQgPSAoXG4gICAgbmV3QWNjb3VudDogS2V5cGFpcixcbiAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICBiYWxhbmNlTmVlZGVkOiBudW1iZXIsXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBTeXN0ZW1Qcm9ncmFtLmNyZWF0ZUFjY291bnQoe1xuICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIucHVibGljS2V5LFxuICAgICAgbmV3QWNjb3VudFB1YmtleTogbmV3QWNjb3VudC5wdWJsaWNLZXksXG4gICAgICBsYW1wb3J0czogYmFsYW5jZU5lZWRlZCxcbiAgICAgIHNwYWNlOiBMYXlvdXQuc3BhbixcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgbXVsdGlzaWcgPSAoXG4gICAgbTogbnVtYmVyLFxuICAgIGZlZVBheWVyOiBLZXlwYWlyLFxuICAgIHNpZ25lclB1YmtleTogUHVibGljS2V5W10sXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIGNvbnN0IGtleXMgPSBbXG4gICAgICB7XG4gICAgICAgIHB1YmtleTogZmVlUGF5ZXIucHVibGljS2V5LFxuICAgICAgICBpc1NpZ25lcjogZmFsc2UsXG4gICAgICAgIGlzV3JpdGFibGU6IHRydWUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwdWJrZXk6IFNZU1ZBUl9SRU5UX1BVQktFWSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBzaWduZXJQdWJrZXkuZm9yRWFjaCgocHVia2V5KSA9PlxuICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgcHVia2V5LFxuICAgICAgICBpc1NpZ25lcjogZmFsc2UsXG4gICAgICAgIGlzV3JpdGFibGU6IGZhbHNlLFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IGRhdGFMYXlvdXQgPSBzdHJ1Y3Q8eyBpbnN0cnVjdGlvbjogbnVtYmVyOyBtOiBudW1iZXIgfT4oW1xuICAgICAgdTgoJ2luc3RydWN0aW9uJyksXG4gICAgICB1OCgnbScpLFxuICAgIF0pO1xuXG4gICAgY29uc3QgZGF0YSA9IEJ1ZmZlci5hbGxvYyhkYXRhTGF5b3V0LnNwYW4pO1xuXG4gICAgZGF0YUxheW91dC5lbmNvZGUoXG4gICAgICB7XG4gICAgICAgIGluc3RydWN0aW9uOiAyLFxuICAgICAgICBtLFxuICAgICAgfSxcbiAgICAgIGRhdGEsXG4gICAgKTtcblxuICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbih7XG4gICAgICBrZXlzLFxuICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBOb2RlLCBQdWJrZXksIFJlc3VsdCwgVHJ5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgTGF5b3V0T2JqZWN0IH0gZnJvbSAnQHNvbGFuYS9idWZmZXItbGF5b3V0JztcbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTXVsdGlzaWcgYXMgX0luc3RydWN0aW9uIH0gZnJvbSAnLi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICBleHBvcnQgY29uc3QgZ2V0SW5mbyA9IGFzeW5jIChcbiAgICBtdWx0aXNpZzogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxMYXlvdXRPYmplY3QsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldEFjY291bnRJbmZvKFxuICAgICAgICBtdWx0aXNpZy50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGlmIChpbmZvID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdGYWlsZWQgdG8gZmluZCBtdWx0aXNpZycpO1xuICAgICAgfVxuICAgICAgaWYgKCFpbmZvLm93bmVyLmVxdWFscyhUT0tFTl9QUk9HUkFNX0lEKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBtdWx0aXNpZyBvd25lcicpO1xuICAgICAgfVxuICAgICAgaWYgKGluZm8uZGF0YS5sZW5ndGggIT09IF9JbnN0cnVjdGlvbi5MYXlvdXQuc3Bhbikge1xuICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBtdWx0aXNpZyBzaXplJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuZnJvbShpbmZvLmRhdGEpO1xuICAgICAgY29uc3QgbXVsdGlzaWdJbmZvID0gX0luc3RydWN0aW9uLkxheW91dC5kZWNvZGUoZGF0YSk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMSA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjEpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjIgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIyKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIzID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyMyk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyNCA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjQpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjUgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI1KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI2ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyNik7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyNyA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjcpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjggPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI4KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI5ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyOSk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMTAgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIxMCk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMTEgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIxMSk7XG4gICAgICByZXR1cm4gbXVsdGlzaWdJbmZvO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSwgUmVzdWx0LCBUcnkgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBfR2V0IH0gZnJvbSAnLi9nZXQtaW5mbyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICBleHBvcnQgY29uc3QgaXNBZGRyZXNzID0gYXN5bmMgKFxuICAgIG11bHRpc2lnOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PGJvb2xlYW4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IF9HZXQuZ2V0SW5mbyhtdWx0aXNpZyk7XG4gICAgICBpZiAoaW5mby5pc0Vycikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBNdWx0aXNpZyBhcyBDcmVhdGUgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBHZXRJbmZvIH0gZnJvbSAnLi9nZXQtaW5mbyc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBJc0FkZHJlc3MgfSBmcm9tICcuL2lzLWFkZHJlc3MnO1xuXG5leHBvcnQgY29uc3QgTXVsdGlzaWcgPSBPYmplY3QuYXNzaWduKHt9LCBDcmVhdGUsIEdldEluZm8sIElzQWRkcmVzcyk7XG4iLCAiaW1wb3J0IHsgUGFyc2VkQWNjb3VudERhdGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSwgUHVia2V5LCBSZXN1bHQsIFRyeSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IE93bmVySW5mbyB9IGZyb20gJy4uL3R5cGVzL3NvbC1uYXRpdmUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25GaWx0ZXIgfSBmcm9tICcuLi90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNvbE5hdGl2ZSB7XG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxPd25lckluZm8sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0UGFyc2VkQWNjb3VudEluZm8oXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICBzb2w6IDAsXG4gICAgICAgIGxhbXBvcnRzOiAwLFxuICAgICAgICBvd25lcjogb3duZXIudG9TdHJpbmcoKSxcbiAgICAgIH07XG5cbiAgICAgIGlmIChUcmFuc2FjdGlvbkZpbHRlci5pc1BhcnNlZEluc3RydWN0aW9uKHJlcy52YWx1ZT8uZGF0YSkpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkQWNjb3VudERhdGEgPSByZXMudmFsdWU/LmRhdGEgYXMgUGFyc2VkQWNjb3VudERhdGE7XG4gICAgICAgIGluZm8ub3duZXIgPSBwYXJzZWRBY2NvdW50RGF0YS5wYXJzZWQ/LmluZm8/Lm93bmVyIGFzIHN0cmluZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcy52YWx1ZSkge1xuICAgICAgICBpbmZvLmxhbXBvcnRzID0gcmVzLnZhbHVlPy5sYW1wb3J0cztcbiAgICAgICAgaW5mby5zb2wgPSByZXMudmFsdWU/LmxhbXBvcnRzLnRvU29sKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTeXN0ZW1Qcm9ncmFtLCBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7XG4gIFJlc3VsdCxcbiAgTm9kZSxcbiAgUGFydGlhbFNpZ25JbnN0cnVjdGlvbixcbiAgVHJ5LFxuICBQdWJrZXksXG4gIFNlY3JldCxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNvbE5hdGl2ZSB7XG4gIGNvbnN0IFJBRElYID0gMTA7XG4gIGV4cG9ydCBjb25zdCBmZWVQYXllclBhcnRpYWxTaWduVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBibG9ja0hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja0hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2tIYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pLmFkZChcbiAgICAgICAgU3lzdGVtUHJvZ3JhbS50cmFuc2Zlcih7XG4gICAgICAgICAgZnJvbVB1YmtleTogb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICB0b1B1YmtleTogZGVzdC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGxhbXBvcnRzOiBwYXJzZUludChgJHthbW91bnQudG9MYW1wb3J0cygpfWAsIFJBRElYKSxcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgICBzaWduZXJzLmZvckVhY2goKHNpZ25lcikgPT4ge1xuICAgICAgICB0eC5wYXJ0aWFsU2lnbihzaWduZXIudG9LZXlwYWlyKCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25JbnN0cnVjdGlvbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmtleSB9IGZyb20gXCJAc29sYW5hLXN1aXRlL3NoYXJlZFwiO1xuaW1wb3J0IHtcbiAgRmlsdGVyVHlwZSxcbiAgSGlzdG9yeSxcbiAgSGlzdG9yeU9wdGlvbnMsXG4gIE1vZHVsZU5hbWUsXG4gIE9uRXJyLFxuICBPbk9rLFxufSBmcm9tIFwiLi4vdHlwZXMvXCI7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkZpbHRlciB9IGZyb20gXCIuLi90cmFuc2FjdGlvbi1maWx0ZXJcIjtcbmltcG9ydCB7IFNpZ25hdHVyZXMgfSBmcm9tIFwiLi4vc2lnbmF0dXJlc1wiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNvbE5hdGl2ZSB7XG4gIGV4cG9ydCBjb25zdCBnZXRIaXN0b3J5ID0gYXN5bmMgKFxuICAgIHRhcmdldDogUHVia2V5LFxuICAgIGZpbHRlclR5cGU6IEZpbHRlclR5cGUsXG4gICAgb25PazogT25PazxIaXN0b3J5PixcbiAgICBvbkVycjogT25FcnIsXG4gICAgb3B0aW9uczogUGFydGlhbDxIaXN0b3J5T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZXM6IEhpc3RvcnlPcHRpb25zID0ge1xuICAgICAgICB3YWl0VGltZTogMC4wMyxcbiAgICAgICAgbmFycm93RG93bjogMTAwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSB7IC4uLmRlZmF1bHRWYWx1ZXMsIC4uLm9wdGlvbnMgfTtcblxuICAgICAgY29uc3QgcGFyc2VyID0gVHJhbnNhY3Rpb25GaWx0ZXIucGFyc2UoZmlsdGVyVHlwZSwgTW9kdWxlTmFtZS5Tb2xOYXRpdmUpO1xuICAgICAgYXdhaXQgU2lnbmF0dXJlcy5nZXRGb3JBZHJlc3MoXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgcGFyc2VyLFxuICAgICAgICBhc3luYyAocmVzdWx0KSA9PiBhd2FpdCByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgICBtZXJnZWRPcHRpb25zLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIG9uRXJyKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTeXN0ZW1Qcm9ncmFtIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFJlc3VsdCwgSW5zdHJ1Y3Rpb24sIFRyeSwgUHVia2V5LCBTZWNyZXQgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU29sTmF0aXZlIHtcbiAgY29uc3QgUkFESVggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gKFxuICAgIHNvdXJjZTogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgaW5zdCA9IFN5c3RlbVByb2dyYW0udHJhbnNmZXIoe1xuICAgICAgICBmcm9tUHVia2V5OiBzb3VyY2UudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG9QdWJrZXk6IGRlc3QudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbGFtcG9ydHM6IHBhcnNlSW50KGAke2Ftb3VudC50b0xhbXBvcnRzKCl9YCwgUkFESVgpLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllci50b0tleXBhaXIoKSA6IHNpZ25lcnNbMF0udG9LZXlwYWlyKCk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgY3JlYXRlV3JhcHBlZE5hdGl2ZUFjY291bnQsXG4gIGNyZWF0ZU1pbnQsXG4gIGNyZWF0ZVRyYW5zZmVySW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUNsb3NlQWNjb3VudEluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7XG4gIFJlc3VsdCxcbiAgTm9kZSxcbiAgSW5zdHJ1Y3Rpb24sXG4gIGRlYnVnTG9nLFxuICBUcnksXG4gIFB1YmtleSxcbiAgU2VjcmV0LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBBc3NvY2lhdGVkQWNjb3VudCB9IGZyb20gJy4uL2Fzc29jaWF0ZWQtYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU29sTmF0aXZlIHtcbiAgY29uc3QgUkFESVggPSAxMDtcblxuICAvLyBOT1RJQ0U6IFRoZXJlIGlzIGEgbGFtcG9ydHMgZmx1Y3R1YXRpb24gd2hlbiB0cmFuc2ZlciB1bmRlciAwLjAwMSBzb2xcbiAgLy8gZm9yIG11bHRpU2lnIG9ubHkgZnVuY3Rpb25cbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyV2l0aE11bHRpc2lnID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBzaWduZXJzWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG4gICAgICBjb25zdCB3cmFwcGVkID0gYXdhaXQgY3JlYXRlV3JhcHBlZE5hdGl2ZUFjY291bnQoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBwYXJzZUludChgJHthbW91bnQudG9MYW1wb3J0cygpfWAsIFJBRElYKSxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIHdyYXBwZWQgc29sOiAnLCB3cmFwcGVkLnRvQmFzZTU4KCkpO1xuXG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGNyZWF0ZU1pbnQoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAwLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc291cmNlVG9rZW4gPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5yZXRyeUdldE9yQ3JlYXRlKFxuICAgICAgICB0b2tlbi50b1N0cmluZygpLFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBzb3VyY2VUb2tlbjogJywgc291cmNlVG9rZW4pO1xuXG4gICAgICBjb25zdCBkZXN0VG9rZW4gPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5yZXRyeUdldE9yQ3JlYXRlKFxuICAgICAgICB0b2tlbi50b1N0cmluZygpLFxuICAgICAgICB3cmFwcGVkLnRvU3RyaW5nKCksXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgZGVzdFRva2VuOiAnLCBkZXN0VG9rZW4pO1xuXG4gICAgICBjb25zdCBpbnN0MSA9IGNyZWF0ZVRyYW5zZmVySW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBwYXJzZUludChgJHthbW91bnR9YCwgUkFESVgpLCAvLyBObyBsYW1wb3J0cywgaXRzIHNvbFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QyID0gY3JlYXRlQ2xvc2VBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHdyYXBwZWQsXG4gICAgICAgIGRlc3QudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgICBbaW5zdDEsIGluc3QyXSxcbiAgICAgICAgc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpLFxuICAgICAgICBmZWVQYXllcj8udG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFNvbE5hdGl2ZSBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFNvbE5hdGl2ZSBhcyBGZWVQYXllciB9IGZyb20gJy4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlcic7XG5pbXBvcnQgeyBTb2xOYXRpdmUgYXMgSGlzdG9yeSB9IGZyb20gJy4vaGlzdG9yeSc7XG5pbXBvcnQgeyBTb2xOYXRpdmUgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IFNvbE5hdGl2ZSBhcyBUcmFuc2ZlcldpdGhNdWx0aXNpZyB9IGZyb20gJy4vdHJhbnNmZXItd2l0aC1tdWx0aXNpZyc7XG5cbmV4cG9ydCBjb25zdCBTb2xOYXRpdmUgPSBPYmplY3QuYXNzaWduKFxuICB7fSxcbiAgRmluZCxcbiAgRmVlUGF5ZXIsXG4gIEhpc3RvcnksXG4gIFRyYW5zZmVyLFxuICBUcmFuc2ZlcldpdGhNdWx0aXNpZyxcbik7XG4iLCAiaW1wb3J0IHsgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBJbnN0cnVjdGlvbiwgVHJ5LCBQdWJrZXksIFNlY3JldCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEFzc29jaWF0ZWRBY2NvdW50IH0gZnJvbSAnLi4vYXNzb2NpYXRlZC1hY2NvdW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGFkZCA9IGFzeW5jIChcbiAgICB0b2tlbjogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IHNpZ25lcnNbMF0gOiBmZWVQYXllcjtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCB0b2tlbkFzc29jaWF0ZWQgPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5yZXRyeUdldE9yQ3JlYXRlKFxuICAgICAgICB0b2tlbixcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW4udG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG9rZW5Bc3NvY2lhdGVkLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIF9DYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCksIHRva2VuKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICIvL0BpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVBbW91bnQgPSAoXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gYW1vdW50ICogMTAgKiogbWludERlY2ltYWw7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IEluc3RydWN0aW9uLCBQdWJrZXksIFJlc3VsdCwgU2VjcmV0LCBUcnkgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBfQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGJ1cm5BbW91bnQ6IG51bWJlcixcbiAgICB0b2tlbkRlY2ltYWxzOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyLnRvS2V5cGFpcigpIDogc2lnbmVyc1swXS50b0tleXBhaXIoKTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIF9DYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KGJ1cm5BbW91bnQsIHRva2VuRGVjaW1hbHMpLFxuICAgICAgICB0b2tlbkRlY2ltYWxzLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGRlYnVnTG9nLCBOb2RlLCBQdWJrZXksIFJlc3VsdCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEZpbmQsIE9uRXJyLCBPbk9rLCBTb3J0YWJsZSwgVG9rZW5NZXRhZGF0YSB9IGZyb20gJy4uL3R5cGVzLyc7XG5pbXBvcnQge1xuICBDb252ZXJ0LFxuICBJbmZyYVNpZGVPdXRwdXQsXG4gIFBkYSxcbiAgVXNlclNpZGVJbnB1dCxcbiAgVXNlclNpZGVPdXRwdXQsXG59IGZyb20gJ2ludGVybmFscy9zaGFyZWQtbWV0YXBsZXgnO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5pbXBvcnQgeyBUT0tFTl9QUk9HUkFNX0lEIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUGFyc2VkQWNjb3VudERhdGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGNvbnN0IFVOQUJMRV9FUlJPUl9SRUdFWCA9IC9VbmFibGUgdG8gZmluZCBNZXRhZGF0YSBhY2NvdW50LztcblxuICAvLyBTb3J0IGJ5IGxhdGVzdCB3aXRoIHVuaXh0aW1lc3RhbXAgZnVuY3Rpb25cbiAgY29uc3Qgc29ydEJ5VWluaXhUaW1lc3RhbXAgPVxuICAgIDxUIGV4dGVuZHMgVXNlclNpZGVPdXRwdXQuTmZ0TWV0YWRhdGEgfCBVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhPihcbiAgICAgIHNvcnRhYmxlOiBTb3J0YWJsZSxcbiAgICApID0+XG4gICAgKGE6IFQsIGI6IFQpOiBudW1iZXIgPT4ge1xuICAgICAgaWYgKCFhLm9mZmNoYWluLmNyZWF0ZWRfYXQpIHtcbiAgICAgICAgYS5vZmZjaGFpbi5jcmVhdGVkX2F0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmICghYi5vZmZjaGFpbi5jcmVhdGVkX2F0KSB7XG4gICAgICAgIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoc29ydGFibGUgPT09IFNvcnRhYmxlLkRlc2MpIHtcbiAgICAgICAgcmV0dXJuIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGEub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH0gZWxzZSBpZiAoc29ydGFibGUgPT09IFNvcnRhYmxlLkFzYykge1xuICAgICAgICByZXR1cm4gYS5vZmZjaGFpbi5jcmVhdGVkX2F0IC0gYi5vZmZjaGFpbi5jcmVhdGVkX2F0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGEub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH1cbiAgICB9O1xuXG4gIGNvbnN0IGNvbnZlcnRlciA9IDxUPihcbiAgICB0b2tlblN0YW5kYXJkOiBVc2VyU2lkZUlucHV0LlRva2VuU3RhbmRhcmQsXG4gICAgbWV0YWRhdGE6IE1ldGFkYXRhLFxuICAgIGpzb246IEluZnJhU2lkZU91dHB1dC5PZmZjaGFpbixcbiAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICApOiBUID0+IHtcbiAgICBpZiAodG9rZW5TdGFuZGFyZCA9PT0gVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLkZ1bmdpYmxlKSB7XG4gICAgICByZXR1cm4gQ29udmVydC5Ub2tlbk1ldGFkYXRhLmludG9Vc2VyU2lkZShcbiAgICAgICAge1xuICAgICAgICAgIG9uY2hhaW46IG1ldGFkYXRhLFxuICAgICAgICAgIG9mZmNoYWluOiBqc29uLFxuICAgICAgICB9LFxuICAgICAgICB0b2tlbkFtb3VudCxcbiAgICAgICkgYXMgVDtcbiAgICB9IGVsc2UgaWYgKHRva2VuU3RhbmRhcmQgPT09IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSkge1xuICAgICAgcmV0dXJuIENvbnZlcnQuTmZ0TWV0YWRhdGEuaW50b1VzZXJTaWRlKFxuICAgICAgICB7XG4gICAgICAgICAgb25jaGFpbjogbWV0YWRhdGEsXG4gICAgICAgICAgb2ZmY2hhaW46IGpzb24sXG4gICAgICAgIH0sXG4gICAgICAgIHRva2VuQW1vdW50LFxuICAgICAgKSBhcyBUO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggdG9rZW5TdGFuZGFyZDogJHt0b2tlblN0YW5kYXJkfWApO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2VuZXJpY0ZpbmRCeU93bmVyID0gYXN5bmMgPFxuICAgIFQgZXh0ZW5kcyBVc2VyU2lkZU91dHB1dC5OZnRNZXRhZGF0YSB8IFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsXG4gID4oXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBjYWxsYmFjazogKHJlc3VsdDogUmVzdWx0PFRbXSwgRXJyb3I+KSA9PiB2b2lkLFxuICAgIHRva2VuU3RhbmRhcmQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZCxcbiAgICBzb3J0YWJsZT86IFNvcnRhYmxlLFxuICAgIGlzSG9sZGVyPzogYm9vbGVhbixcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBkYXRhOiBUW10gPSBbXTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBjb25uZWN0aW9uLmdldFBhcnNlZFRva2VuQWNjb3VudHNCeU93bmVyKFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgaW5mby52YWx1ZS5sZW5ndGggPT09IDAgJiYgY2FsbGJhY2soUmVzdWx0Lm9rKFtdKSk7XG5cbiAgICAgIGZvciBhd2FpdCAoY29uc3QgZCBvZiBpbmZvLnZhbHVlKSB7XG4gICAgICAgIGlmIChpc0hvbGRlciAmJiBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby50b2tlbkFtb3VudC51aUFtb3VudCA8IDEpIHtcbiAgICAgICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgICAgICcjIGZpbmRCeU93bmVyIG5vIGhvbGQgbWV0YWRhdGE6ICcsXG4gICAgICAgICAgICBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mbyxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1pbnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby5taW50IGFzIFB1YmtleTtcbiAgICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSBkLmFjY291bnQuZGF0YS5wYXJzZWQuaW5mby50b2tlbkFtb3VudFxuICAgICAgICAgIC5hbW91bnQgYXMgc3RyaW5nO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgICAgICBjb25uZWN0aW9uLFxuICAgICAgICAgICAgUGRhLmdldE1ldGFkYXRhKG1pbnQpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgZGVidWdMb2coJyMgZmluZEJ5T3duZXIgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgICAgICAvLyB0b2tlblN0YW5kYXJkOiAwKE5GVCkgb3IgMiAoU1BMLVRPS0VOKVxuICAgICAgICAgIGlmIChtZXRhZGF0YS50b2tlblN0YW5kYXJkICE9PSB0b2tlblN0YW5kYXJkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmV0Y2gobWV0YWRhdGEuZGF0YS51cmkpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAuanNvbigpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGpzb246IEluZnJhU2lkZU91dHB1dC5PZmZjaGFpbikgPT4ge1xuICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZXI8VD4odG9rZW5TdGFuZGFyZCwgbWV0YWRhdGEsIGpzb24sIHRva2VuQW1vdW50KSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQub2soZGF0YSkpOyAvLyBuZWVkIHRoaXMgY2FsbCA/XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZGVzY0FsZ28gPSBzb3J0QnlVaW5peFRpbWVzdGFtcDxUPihTb3J0YWJsZS5EZXNjKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGFzY0FsZ28gPSBzb3J0QnlVaW5peFRpbWVzdGFtcDxUPihTb3J0YWJsZS5Bc2MpO1xuICAgICAgICAgICAgICAgICAgaWYgKHNvcnRhYmxlID09PSBTb3J0YWJsZS5EZXNjKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNvcnQoZGVzY0FsZ28pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzb3J0YWJsZSA9PT0gU29ydGFibGUuQXNjKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNvcnQoYXNjQWxnbyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQub2soZGF0YSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvciAmJiBVTkFCTEVfRVJST1JfUkVHRVgudGVzdChlLm1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBkZWJ1Z0xvZygnIyBza2lwIGVycm9yIGZvciBvbGQgU1BMLVRPS0VOOiAnLCBtaW50KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZW5lcmljRmluZEJ5TWludCA9IGFzeW5jIDxcbiAgICBUIGV4dGVuZHMgVXNlclNpZGVPdXRwdXQuTmZ0TWV0YWRhdGEgfCBVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhLFxuICA+KFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICB0b2tlblN0YW5kYXJkOiBVc2VyU2lkZUlucHV0LlRva2VuU3RhbmRhcmQsXG4gICk6IFByb21pc2U8UmVzdWx0PFQsIEVycm9yPj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG5cbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgTWV0YWRhdGEuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICBjb25uZWN0aW9uLFxuICAgICAgICBQZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICApO1xuICAgICAgZGVidWdMb2coJyMgZmluZEJ5TWludCBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgLy8gdG9rZW5TdGFuZGFyZDogMChORlQpIG9yIDIgKFNQTC1UT0tFTilcbiAgICAgIGlmIChtZXRhZGF0YS50b2tlblN0YW5kYXJkICE9PSB0b2tlblN0YW5kYXJkKSB7XG4gICAgICAgIHRocm93IEVycm9yKCd0b2tlbiBzdGFuZGFyZHMgYXJlIGRpZmZlcmVudCcpO1xuICAgICAgfVxuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkQWNjb3VudEluZm8obWludC50b1B1YmxpY0tleSgpKTtcbiAgICAgIGNvbnN0IHRva2VuQW1vdW50ID0gKGluZm8udmFsdWU/LmRhdGEgYXMgUGFyc2VkQWNjb3VudERhdGEpLnBhcnNlZC5pbmZvXG4gICAgICAgIC5zdXBwbHkgYXMgc3RyaW5nO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IChhd2FpdCAoXG4gICAgICAgIGF3YWl0IGZldGNoKG1ldGFkYXRhLmRhdGEudXJpKVxuICAgICAgKS5qc29uKCkpIGFzIEluZnJhU2lkZU91dHB1dC5PZmZjaGFpbjtcbiAgICAgIHJldHVybiBSZXN1bHQub2soXG4gICAgICAgIGNvbnZlcnRlcjxUPih0b2tlblN0YW5kYXJkLCBtZXRhZGF0YSwgcmVzcG9uc2UsIHRva2VuQW1vdW50KSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZSBhcyBFcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgb3duZXIgUHVia2V5XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge09uT2t9IG9uT2sgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPbkVycn0gb25FcnIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHt7c29ydGFibGU/OiBTb3J0YWJsZSwgaXNIb2xkZXI/OiBib29sZWFufX0gb3B0aW9ucz9cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvbk9rOiBPbk9rPEZpbmQ+LFxuICAgIG9uRXJyOiBPbkVycixcbiAgICBvcHRpb25zPzogeyBzb3J0YWJsZT86IFNvcnRhYmxlOyBpc0hvbGRlcj86IGJvb2xlYW4gfSxcbiAgKTogdm9pZCA9PiB7XG4gICAgY29uc3Qgc29ydGFibGUgPSAhb3B0aW9ucz8uc29ydGFibGUgPyBTb3J0YWJsZS5EZXNjIDogb3B0aW9ucz8uc29ydGFibGU7XG4gICAgY29uc3QgaXNIb2xkZXIgPSAhb3B0aW9ucz8uaXNIb2xkZXIgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZmxvYXRpbmctcHJvbWlzZXMgKi9cbiAgICBnZW5lcmljRmluZEJ5T3duZXI8VG9rZW5NZXRhZGF0YT4oXG4gICAgICBvd25lcixcbiAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgcmVzdWx0Lm1hdGNoKChvaykgPT4gb25PayhvayksIG9uRXJyKTtcbiAgICAgIH0sXG4gICAgICBVc2VyU2lkZUlucHV0LlRva2VuU3RhbmRhcmQuRnVuZ2libGUsXG4gICAgICBzb3J0YWJsZSxcbiAgICAgIGlzSG9sZGVyLFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBtaW50IGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PFRva2VuTWV0YWRhdGEsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBhd2FpdCBnZW5lcmljRmluZEJ5TWludDxUb2tlbk1ldGFkYXRhPihcbiAgICAgIG1pbnQsXG4gICAgICBVc2VyU2lkZUlucHV0LlRva2VuU3RhbmRhcmQuRnVuZ2libGUsXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBJbnN0cnVjdGlvbixcbiAgS2V5cGFpckFjY291bnQsXG4gIFB1YmtleSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEZyZWV6aW5nIGEgdGFyZ2V0IG5mdFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICovXG4gIGV4cG9ydCBjb25zdCBmcmVlemUgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgTm9kZSxcbiAgUmVzdWx0LFxuICBQYXJ0aWFsU2lnbkluc3RydWN0aW9uLFxuICBUcnksXG4gIFB1YmtleSxcbiAgU2VjcmV0LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFzc29jaWF0ZWRBY2NvdW50IH0gZnJvbSAnLi4vYXNzb2NpYXRlZC1hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBmZWVQYXllclBhcnRpYWxTaWduVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgc291cmNlVG9rZW4gPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgbGV0IGluc3QyO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG5cbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXR1cm4gYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICBpZiAoIWRlc3RUb2tlbi5pbnN0KSB7XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIF9DYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgKTtcbiAgICAgICAgdHguYWRkKGluc3QyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldHVybiBpbnN0cnVjdGlvbiBhbmQgdW5kZWNpZGVkIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgICBpbnN0MiA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBkZXN0VG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBfQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgICAga2V5cGFpcnMsXG4gICAgICAgICk7XG4gICAgICAgIHR4LmFkZChkZXN0VG9rZW4uaW5zdCkuYWRkKGluc3QyKTtcbiAgICAgIH1cblxuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGtleXBhaXJzLmZvckVhY2goKHNpZ25lcikgPT4ge1xuICAgICAgICB0eC5wYXJ0aWFsU2lnbihzaWduZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25JbnN0cnVjdGlvbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tIFwiQHNvbGFuYS9zcGwtdG9rZW5cIjtcbmltcG9ydCB7IGRlYnVnTG9nLCBOb2RlLCBQdWJrZXkgfSBmcm9tIFwiQHNvbGFuYS1zdWl0ZS9zaGFyZWRcIjtcbmltcG9ydCB7XG4gIEZpbHRlclR5cGUsXG4gIEhpc3RvcnksXG4gIEhpc3RvcnlPcHRpb25zLFxuICBNb2R1bGVOYW1lLFxuICBPbkVycixcbiAgT25PayxcbiAgVXNlclNpZGVPdXRwdXQsXG59IGZyb20gXCIuLi90eXBlcy9cIjtcbmltcG9ydCB7IFNpZ25hdHVyZXMgfSBmcm9tIFwiLi4vc2lnbmF0dXJlc1wiO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25GaWx0ZXIgfSBmcm9tIFwiLi4vdHJhbnNhY3Rpb24tZmlsdGVyXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgZ2V0SGlzdG9yeSA9IGFzeW5jIChcbiAgICB0YXJnZXQ6IFB1YmtleSxcbiAgICBmaWx0ZXJUeXBlOiBGaWx0ZXJUeXBlLFxuICAgIG9uT2s6IE9uT2s8SGlzdG9yeT4sXG4gICAgb25FcnI6IE9uRXJyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8SGlzdG9yeU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWVzOiBIaXN0b3J5T3B0aW9ucyA9IHtcbiAgICAgICAgd2FpdFRpbWU6IDAuMDMsXG4gICAgICAgIG5hcnJvd0Rvd246IDEwMCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXJnZWRPcHRpb25zID0geyAuLi5kZWZhdWx0VmFsdWVzLCAuLi5vcHRpb25zIH07XG4gICAgICBpZiAoZmlsdGVyVHlwZSA9PT0gRmlsdGVyVHlwZS5NZW1vKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlciA9IFRyYW5zYWN0aW9uRmlsdGVyLnBhcnNlKGZpbHRlclR5cGUsIE1vZHVsZU5hbWUuU3BsVG9rZW4pO1xuICAgICAgICBhd2FpdCBTaWduYXR1cmVzLmdldEZvckFkcmVzcyhcbiAgICAgICAgICB0YXJnZXQsXG4gICAgICAgICAgcGFyc2VyLFxuICAgICAgICAgIChyZXN1bHQpID0+IHJlc3VsdC5tYXRjaChvbk9rLCBvbkVyciksXG4gICAgICAgICAgbWVyZ2VkT3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRva2VuQWNjb3VudHMgPVxuICAgICAgICAgIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldFBhcnNlZFRva2VuQWNjb3VudHNCeU93bmVyKFxuICAgICAgICAgICAgdGFyZ2V0LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBzdG9yZWRIaXN0b3JpZXM6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnlbXSA9IFtdO1xuICAgICAgICBkZWJ1Z0xvZyhcIiMgdG9rZW5BY2NvdW50cyBzaXplOiBcIiwgdG9rZW5BY2NvdW50cy52YWx1ZS5sZW5ndGgpO1xuICAgICAgICBmb3IgKGNvbnN0IGFjY291bnQgb2YgdG9rZW5BY2NvdW50cy52YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlciA9IFRyYW5zYWN0aW9uRmlsdGVyLnBhcnNlKFxuICAgICAgICAgICAgZmlsdGVyVHlwZSxcbiAgICAgICAgICAgIE1vZHVsZU5hbWUuU3BsVG9rZW4sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBhd2FpdCBTaWduYXR1cmVzLmdldEZvckFkcmVzcyhcbiAgICAgICAgICAgIGFjY291bnQucHVia2V5LnRvU3RyaW5nKCksXG4gICAgICAgICAgICBwYXJzZXIsXG4gICAgICAgICAgICAocmVzdWx0KSA9PiByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgICAgICAgbWVyZ2VkT3B0aW9ucyxcbiAgICAgICAgICAgIHN0b3JlZEhpc3RvcmllcyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBvbkVycihlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBTeXN0ZW1Qcm9ncmFtLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQXV0aG9yaXR5VHlwZSxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCxcbiAgTUlOVF9TSVpFLFxuICBUT0tFTl9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24sXG4gIERhdGFWMixcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuaW1wb3J0IHtcbiAgZGVidWdMb2csXG4gIEtleXBhaXJBY2NvdW50LFxuICBNaW50SW5zdHJ1Y3Rpb24sXG4gIE5vZGUsXG4gIFB1YmtleSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5pbXBvcnQge1xuICBDb252ZXJ0LFxuICBQZGEsXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFZhbGlkYXRvcixcbn0gZnJvbSAnaW50ZXJuYWxzL3NoYXJlZC1tZXRhcGxleCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBfQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICdpbnRlcm5hbHMvc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgY3JlYXRlRnJlZXplQXV0aG9yaXR5ID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogUHVibGljS2V5LFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gY3JlYXRlU2V0QXV0aG9yaXR5SW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBBdXRob3JpdHlUeXBlLkZyZWV6ZUFjY291bnQsXG4gICAgICBmcmVlemVBdXRob3JpdHksXG4gICAgKTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY3JlYXRlTWludEluc3RydWN0aW9ucyA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgdG9rZW5NZXRhZGF0YTogRGF0YVYyLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICAgaXNNdXRhYmxlOiBib29sZWFuLFxuICApOiBQcm9taXNlPFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXT4gPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYW1wb3J0cyA9IGF3YWl0IGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQoY29ubmVjdGlvbik7XG4gICAgY29uc3QgbWV0YWRhdGFQZGEgPSBQZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCB0b2tlbkFzc29jaWF0ZWQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG5cbiAgICBjb25zdCBpbnN0MSA9IFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICBmcm9tUHVia2V5OiBmZWVQYXllcixcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICBzcGFjZTogTUlOVF9TSVpFLFxuICAgICAgbGFtcG9ydHM6IGxhbXBvcnRzLFxuICAgICAgcHJvZ3JhbUlkOiBUT0tFTl9QUk9HUkFNX0lELFxuICAgIH0pO1xuXG4gICAgY29uc3QgaW5zdDIgPSBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgb3duZXIsXG4gICAgICBvd25lcixcbiAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgKTtcblxuICAgIGNvbnN0IGluc3QzID0gY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgZmVlUGF5ZXIsXG4gICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICBvd25lcixcbiAgICAgIG1pbnQsXG4gICAgKTtcblxuICAgIGNvbnN0IGluc3Q0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIHRva2VuQXNzb2NpYXRlZCxcbiAgICAgIG93bmVyLFxuICAgICAgX0NhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQodG90YWxBbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgIG1pbnREZWNpbWFsLFxuICAgICk7XG5cbiAgICBjb25zdCBpbnN0NSA9IGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIG1ldGFkYXRhOiBtZXRhZGF0YVBkYSxcbiAgICAgICAgbWludCxcbiAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNyZWF0ZU1ldGFkYXRhQWNjb3VudEFyZ3NWMzoge1xuICAgICAgICAgIGRhdGE6IHRva2VuTWV0YWRhdGEsXG4gICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgIGNvbGxlY3Rpb25EZXRhaWxzOiBudWxsLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIHJldHVybiBbaW5zdDEsIGluc3QyLCBpbnN0MywgaW5zdDQsIGluc3Q1XTtcbiAgfTtcblxuICAvKipcbiAgICogU1BMLVRPS0VOIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgIC8vIHRva2VuIG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBzaWduZXIgICAgICAvLyB0b2tlbiBvd25lciBTZWNyZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsQW1vdW50IC8vIHRvdGFsIG51bWJlclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWludERlY2ltYWwgLy8gdG9rZW4gZGVjaW1hbFxuICAgKiBAcGFyYW0ge1B1YmtleX0gaW5wdXQgICAgICAgLy8gdG9rZW4gbWV0YWRhdGFcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgIC8vIGZlZSBwYXllclxuICAgKiBAcGFyYW0ge1B1YmtleX0gZnJlZXplQXV0aG9yaXR5PyAvLyBmcmVlemUgYXV0aG9yaXR5XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5Ub2tlbk1ldGFkYXRhLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgIGZyZWV6ZUF1dGhvcml0eT86IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPFVzZXJTaWRlSW5wdXQuVG9rZW5NZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBzaWduZXI7XG4gICAgICBpbnB1dC5yb3lhbHR5ID0gMDtcbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gMDtcblxuICAgICAgY29uc3QgdG9rZW5TdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQgYXMgVXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YSxcbiAgICAgICAgaW5wdXQucm95YWx0eSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICAgIHRva2VuU3RvcmFnZU1ldGFkYXRhLmNyZWF0ZWRfYXQgPSBjcmVhdGVkQXQ7XG5cbiAgICAgIGxldCB1cmkhOiBzdHJpbmc7XG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGggJiYgaW5wdXQuc3RvcmFnZVR5cGUpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZE1ldGFBbmRDb250ZW50KFxuICAgICAgICAgIHRva2VuU3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIGlucHV0LnN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgdXJpID0gaW5wdXQudXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJNdXN0IHNldCAnc3RvcmFnZVR5cGUgKyBmaWxlUGF0aCcgb3IgJ3VyaSdcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnQuVG9rZW5NZXRhZGF0YS5pbnRvSW5mcmFTaWRlKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXJpKTtcblxuICAgICAgY29uc3QgbWludCA9IEtleXBhaXJBY2NvdW50LmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBjcmVhdGVNaW50SW5zdHJ1Y3Rpb25zKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRvdGFsQW1vdW50LFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZUZyZWV6ZUF1dGhvcml0eShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1pbnRJbnN0cnVjdGlvbihcbiAgICAgICAgaW5zdHMsXG4gICAgICAgIFtzaWduZXIudG9LZXlwYWlyKCksIG1pbnQudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgbWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIEtleXBhaXJBY2NvdW50LFxuICBJbnN0cnVjdGlvbixcbiAgUHVia2V5LFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQge1xuICBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIFRoYXdpbmcgYSB0YXJnZXQgTkZUXG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXI/ICAgICAgIC8vIGZlZSBwYXllclxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRoYXcgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRoYXdBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBJbnN0cnVjdGlvbiwgVHJ5LCBQdWJrZXksIFNlY3JldCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFzc29jaWF0ZWRBY2NvdW50IH0gZnJvbSAnLi4vYXNzb2NpYXRlZC1hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyc1swXTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBzb3VyY2VUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBfQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFNwbFRva2VuIGFzIEFkZCB9IGZyb20gJy4vYWRkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGcmVlemUgfSBmcm9tICcuL2ZyZWV6ZSc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGZWVQYXllciB9IGZyb20gJy4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlcic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBIaXN0b3J5IH0gZnJvbSAnLi9oaXN0b3J5JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgVGhhdyB9IGZyb20gJy4vdGhhdyc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuXG5leHBvcnQgY29uc3QgU3BsVG9rZW4gPSBPYmplY3QuYXNzaWduKFxuICB7fSxcbiAgQWRkLFxuICBCdXJuLFxuICBGaW5kLFxuICBGcmVlemUsXG4gIEZlZVBheWVyLFxuICBIaXN0b3J5LFxuICBNaW50LFxuICBUaGF3LFxuICBUcmFuc2Zlcixcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FBQUE7QUFBQSxFQUFBO0FBQUEsa0JBQUFDO0FBQUEsRUFBQSxpQkFBQUM7QUFBQSxFQUFBO0FBQUEsa0JBQUFDO0FBQUE7QUFBQTs7O0FDQUEsb0JBQW9EO0FBRTdDLElBQVU7QUFBQSxDQUFWLENBQVVDLGFBQVY7QUFDTCxRQUFNLHlCQUF5QjtBQUMvQixRQUFNLGtCQUFrQjtBQUVqQixFQUFNQSxTQUFBLFVBQVUsQ0FDckIsUUFDQSxrQkFDbUM7QUFDbkMsZUFBTyxtQkFBSSxNQUFZO0FBQ3JCLGtDQUFTLCtCQUErQjtBQUV4QyxzQkFBZ0IsQ0FBQyxnQkFDYix1QkFBdUIsV0FBVyxJQUNsQyxjQUFjLFdBQVc7QUFFN0IsVUFBSSxnQkFBZ0IsZ0JBQWdCLFdBQVcsR0FBRztBQUNo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QUFBQSxHQW5DZUEsMEJBQUE7OztBQ2JqQixJQUFBQyxxQkFBaUQ7QUFDakQsSUFBQUMsa0JBQXlEO0FBSWxELElBQVVDO0FBQUEsQ0FBVixDQUFVQSxlQUFWO0FBQ0UsRUFBTUEsV0FBQSxXQUFXLENBQ3RCLE1BQ0EsT0FDQSxNQUNBLFNBQ0EsUUFDQSxhQUNBLGFBQ3dDO0FBQ3hDLGVBQU8scUJBQUksTUFBWTtBQUNyQixZQUFNLFFBQVEsV0FBVyxXQUFXLFFBQVEsQ0FBQztBQUM3QyxZQUFNLFdBQVcsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztBQUVqRCxZQUFNLGNBQWMsTUFBTSxrQkFBa0I7QUFBQSxRQUMxQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUVBLFlBQU0sWUFBWSxNQUFNLGtCQUFrQjtBQUFBLFFBQ3hDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsWUFBTSxXQUFPO0FBQUEsUUFDWCxZQUFZLFlBQVk7QUFBQSxRQUN4QixLQUFLLFlBQVk7QUFBQSxRQUNqQixVQUFVLFlBQVk7QUFBQSxRQUN0QixNQUFNLFlBQVk7QUFBQSxRQUNsQixTQUFZLGdCQUFnQixRQUFRLFdBQVc7QUFBQSxRQUMvQztBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsYUFBTyxJQUFJLDRCQUFZLENBQUMsSUFBSSxHQUFHLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFBQSxJQUM1RCxFQUFDO0FBQUEsRUFDSDtBQUFBLEdBdENlQSw0QkFBQTs7O0FDS1YsSUFBTUMsYUFBVyxPQUFPO0FBQUEsRUFDN0IsQ0FBQztBQUFBLEVBQ0RBO0FBQUEsRUFDQUE7QUFBQSxFQUNBQTtBQUFBLEVBQ0FBO0FBQUEsRUFDQUE7QUFBQSxFQUNBQTtBQUFBLEVBQ0FBO0FBQUEsRUFDQUE7QUFBQSxFQUNBQTtBQUNGOyIsCiAgIm5hbWVzIjogWyJNZW1vIiwgIk11bHRpc2lnIiwgIlNvbE5hdGl2ZSIsICJTcGxUb2tlbiIsICJBaXJkcm9wIiwgImltcG9ydF9zaGFyZWQiLCAiQXNzb2NpYXRlZEFjY291bnQiLCAiaW1wb3J0X3NoYXJlZCIsICJNZW1vIiwgImJzIiwgIlNvcnRhYmxlIiwgIkZpbHRlclR5cGUiLCAiTW9kdWxlTmFtZSIsICJpbXBvcnRfc2hhcmVkIiwgIkNvbnZlcnQiLCAiTWVtbyIsICJpbXBvcnRfc2hhcmVkIiwgIkNvbnZlcnQiLCAiTWludCIsICJpbXBvcnRfc2hhcmVkIiwgIkNvbnZlcnQiLCAiVHJhbnNmZXIiLCAiaW1wb3J0X3NoYXJlZCIsICJDb252ZXJ0IiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJpbXBvcnRfc2hhcmVkIiwgIlRyYW5zYWN0aW9uRmlsdGVyIiwgImluc3RydWN0aW9uIiwgIkNvbnZlcnQiLCAiaW1wb3J0X3NoYXJlZCIsICJTaWduYXR1cmVzIiwgIk1lbW8iLCAiTWVtbyIsICJpbXBvcnRfc2hhcmVkIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiTXVsdGlzaWciLCAiTXVsdGlzaWciLCAiaW1wb3J0X3NoYXJlZCIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF93ZWIzIiwgIk11bHRpc2lnIiwgImltcG9ydF9zaGFyZWQiLCAiTXVsdGlzaWciLCAiTXVsdGlzaWciLCAiaW1wb3J0X3NoYXJlZCIsICJTb2xOYXRpdmUiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3NoYXJlZCIsICJTb2xOYXRpdmUiLCAiU29sTmF0aXZlIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9zaGFyZWQiLCAiU29sTmF0aXZlIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X3NoYXJlZCIsICJTb2xOYXRpdmUiLCAiU29sTmF0aXZlIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X3NoYXJlZCIsICJTcGxUb2tlbiIsICJTcGxUb2tlbiIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9zaGFyZWQiLCAiU3BsVG9rZW4iLCAiaW1wb3J0X3NoYXJlZCIsICJpbXBvcnRfc3BsX3Rva2VuIiwgIlNwbFRva2VuIiwgImZldGNoIiwgImltcG9ydF9zaGFyZWQiLCAiaW1wb3J0X3NwbF90b2tlbiIsICJTcGxUb2tlbiIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9zaGFyZWQiLCAiU3BsVG9rZW4iLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfc2hhcmVkIiwgIlNwbFRva2VuIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJpbXBvcnRfc2hhcmVkIiwgImltcG9ydF9zaGFyZWRfbWV0YXBsZXgiLCAiU3BsVG9rZW4iLCAibWludCIsICJpbXBvcnRfc2hhcmVkIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU3BsVG9rZW4iLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfc2hhcmVkIiwgIlNwbFRva2VuIiwgIlNwbFRva2VuIl0KfQo=