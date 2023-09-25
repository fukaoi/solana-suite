// src/airdrop.ts
import { Node, debugLog, Try } from "shared";
var Airdrop;
((Airdrop2) => {
  const DEFAULT_AIRDROP_AMOUNT = 1;
  const MAX_AIRDROP_SOL = 2;
  Airdrop2.request = async (pubkey, airdropAmount) => {
    return Try(async () => {
      debugLog("Now airdropping...please wait");
      airdropAmount = !airdropAmount ? DEFAULT_AIRDROP_AMOUNT.toLamports() : airdropAmount.toLamports();
      if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
        throw Error(
          `Over max airdrop amount: ${airdropAmount}, max: ${MAX_AIRDROP_SOL.toLamports()}`
        );
      }
      const sig = await Node.getConnection().requestAirdrop(
        pubkey.toPublicKey(),
        airdropAmount
      );
      await Node.confirmedSig(sig);
      return "success";
    });
  };
})(Airdrop || (Airdrop = {}));

// src/associated-account.ts
import {
  debugLog as debugLog2,
  Instruction,
  Node as Node2,
  sleep
} from "shared";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError
} from "@solana/spl-token";
import { KeypairAccount } from "account";
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
    return new Instruction(
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
          debugLog2("# associatedTokenAccount: ", inst);
          return inst;
        } else if (inst instanceof Instruction) {
          (await inst.submit()).map(
            async (ok) => {
              await Node2.confirmedSig(ok);
              return inst.data;
            },
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
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    debugLog2("# associatedTokenAccount: ", associatedTokenAccount.toString());
    try {
      await getAccount(
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
  };
})(AssociatedAccount || (AssociatedAccount = {}));

// src/memo/create.ts
import { TransactionInstruction } from "@solana/web3.js";
import { Constants, Instruction as Instruction2 } from "shared";
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
import { convertTimestampToDateTime } from "shared";
var Convert;
((Convert5) => {
  let Memo4;
  ((Memo5) => {
    Memo5.intoUserSide = (output, meta, outputTransfer, mappingTokenAccount) => {
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
  })(Memo4 = Convert5.Memo || (Convert5.Memo = {}));
})(Convert || (Convert = {}));

// src/convert/mint.ts
import { convertTimestampToDateTime as convertTimestampToDateTime2 } from "shared";
var Convert2;
((Convert5) => {
  let Mint;
  ((Mint2) => {
    Mint2.intoUserSide = (output, meta) => {
      const history = {};
      history.mint = output.parsed.info.mint;
      history.mintAuthority = output.parsed.info.mintAuthority;
      history.tokenAmount = output.parsed.info.tokenAmount;
      history.account = output.parsed.info.account;
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime2(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Mint = Convert5.Mint || (Convert5.Mint = {}));
})(Convert2 || (Convert2 = {}));

// src/convert/transfer.ts
import { convertTimestampToDateTime as convertTimestampToDateTime3 } from "shared";
var Convert3;
((Convert5) => {
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
      history.dateTime = convertTimestampToDateTime3(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Transfer = Convert5.Transfer || (Convert5.Transfer = {}));
})(Convert3 || (Convert3 = {}));

// src/convert/transfer-checked.ts
import { convertTimestampToDateTime as convertTimestampToDateTime4 } from "shared";
var Convert4;
((Convert5) => {
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
      history.dateTime = convertTimestampToDateTime4(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(TransferChecked = Convert5.TransferChecked || (Convert5.TransferChecked = {}));
})(Convert4 || (Convert4 = {}));

// src/transaction-filter.ts
import { debugLog as debugLog3 } from "shared";
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
import { debugLog as debugLog4, Node as Node3, Result as Result2, sleep as sleep2 } from "shared";
var Signatures;
((Signatures2) => {
  const parseForTransaction = async (signature) => {
    const res = await Node3.getConnection().getParsedTransaction(signature);
    if (!res) {
      return {};
    }
    return res;
  };
  Signatures2.getForAdress = async (pubkey, parser, callback, options, histories = []) => {
    try {
      debugLog4("# options: ", options);
      const transactions = await Node3.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit: options.narrowDown
        }
      );
      debugLog4("# transactions count:", transactions.length);
      for (const transaction of transactions) {
        parseForTransaction(transaction.signature).then((signature) => {
          const history = parser(signature);
          if (history) {
            histories.push(history);
            callback(Result2.ok(histories));
          }
        }).catch((e) => callback(Result2.err(e)));
        await sleep2(options.waitTime);
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result2.err(e));
      }
    }
  };
})(Signatures || (Signatures = {}));

// src/memo/history.ts
var Memo2;
((Memo4) => {
  Memo4.getHistory = async (target, onOk, onErr, options = {}) => {
    try {
      const defaultValues = {
        waitTime: 0.03,
        narrowDown: 100
      };
      const mergedOptions = { ...defaultValues, ...options };
      const parser = TransactionFilter.parse(
        "only-memo" /* OnlyMemo */,
        "system" /* SolNative */
      );
      await Signatures.getForAdress(
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
  };
})(Memo2 || (Memo2 = {}));

// src/memo/index.ts
var Memo3 = { ...Memo, ...Memo2 };

// src/multisig/create.ts
import {
  Node as Node4,
  Instruction as Instruction3,
  Try as Try2
} from "shared";
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
  Multisig6.create = async (m, feePayer, signerPubkeys) => {
    return Try2(async () => {
      if (m > signerPubkeys.length) {
        throw Error("signers number less than m number");
      }
      const account = Keypair2.generate();
      const connection = Node4.getConnection();
      const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
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
    });
  };
})(Multisig2 || (Multisig2 = {}));

// src/multisig/get-info.ts
import { Node as Node5, Try as Try3 } from "shared";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID3 } from "@solana/spl-token";
import { PublicKey as PublicKey2 } from "@solana/web3.js";
var Multisig3;
((Multisig6) => {
  Multisig6.getInfo = async (multisig) => {
    return Try3(async () => {
      const info = await Node5.getConnection().getAccountInfo(
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
    });
  };
})(Multisig3 || (Multisig3 = {}));

// src/multisig/is-address.ts
import { Try as Try4 } from "shared";
var Multisig4;
((Multisig6) => {
  Multisig6.isAddress = async (multisig) => {
    return Try4(async () => {
      const info = await Multisig3.getInfo(multisig);
      if (info.isErr) {
        return false;
      }
      return true;
    });
  };
})(Multisig4 || (Multisig4 = {}));

// src/multisig/index.ts
var Multisig5 = { ...Multisig2, ...Multisig3, ...Multisig4 };

// src/sol-native/find.ts
import { Node as Node6, Try as Try5 } from "shared";
var SolNative;
((SolNative7) => {
  SolNative7.findByOwner = async (owner) => {
    return Try5(async () => {
      const res = await Node6.getConnection().getParsedAccountInfo(
        owner.toPublicKey()
      );
      const info = {
        sol: 0,
        lamports: 0,
        owner: owner.toString()
      };
      if (TransactionFilter.isParsedInstruction(res.value?.data)) {
        const parsedAccountData = res.value?.data;
        info.owner = parsedAccountData.parsed?.info?.owner;
      }
      if (res.value) {
        info.lamports = res.value?.lamports;
        info.sol = res.value?.lamports.toSol();
      }
      return info;
    });
  };
})(SolNative || (SolNative = {}));

// src/sol-native/fee-payer-partial-sign-transfer.ts
import { SystemProgram as SystemProgram2, Transaction } from "@solana/web3.js";
import {
  Node as Node7,
  PartialSignInstruction,
  Try as Try6
} from "shared";
var SolNative2;
((SolNative7) => {
  const RADIX = 10;
  SolNative7.feePayerPartialSignTransfer = async (owner, dest, signers, amount, feePayer) => {
    return Try6(async () => {
      const blockHashObj = await Node7.getConnection().getLatestBlockhash();
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
    });
  };
})(SolNative2 || (SolNative2 = {}));

// src/sol-native/history.ts
var SolNative3;
((SolNative7) => {
  SolNative7.getHistory = async (target, filterType, onOk, onErr, options = {}) => {
    try {
      const defaultValues = {
        waitTime: 0.03,
        narrowDown: 100
      };
      const mergedOptions = { ...defaultValues, ...options };
      const parser = TransactionFilter.parse(filterType, "system" /* SolNative */);
      await Signatures.getForAdress(
        target,
        parser,
        async (result) => await result.match(onOk, onErr),
        mergedOptions
      );
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  };
})(SolNative3 || (SolNative3 = {}));

// src/sol-native/transfer.ts
import { SystemProgram as SystemProgram3 } from "@solana/web3.js";
import { Instruction as Instruction4, Try as Try7 } from "shared";
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
} from "shared";
var SolNative5;
((SolNative7) => {
  const RADIX = 10;
  SolNative7.transferWithMultisig = async (owner, dest, signers, amount, feePayer) => {
    return Try8(async () => {
      const connection = Node8.getConnection();
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const wrapped = await createWrappedNativeAccount(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        parseInt(`${amount.toLamports()}`, RADIX)
      );
      debugLog5("# wrapped sol: ", wrapped.toBase58());
      const token = await createMint(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        owner.toPublicKey(),
        0
      );
      const sourceToken = await AssociatedAccount.retryGetOrCreate(
        token.toString(),
        owner,
        payer
      );
      debugLog5("# sourceToken: ", sourceToken);
      const destToken = await AssociatedAccount.retryGetOrCreate(
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
        feePayer?.toKeypair()
      );
    });
  };
})(SolNative5 || (SolNative5 = {}));

// src/sol-native/index.ts
var SolNative6 = {
  ...SolNative,
  ...SolNative2,
  ...SolNative3,
  ...SolNative4,
  ...SolNative5
};

// src/spl-token/add.ts
import { createMintToCheckedInstruction } from "@solana/spl-token";
import { Instruction as Instruction6, Try as Try9 } from "shared";

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
  SplToken12.add = async (token, owner, signers, totalAmount, mintDecimal, feePayer) => {
    return Try9(async () => {
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
      return new Instruction6([inst], keypairs, payer.toKeypair(), token);
    });
  };
})(SplToken2 || (SplToken2 = {}));

// src/spl-token/burn.ts
import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync2
} from "@solana/spl-token";
import { Instruction as Instruction7, Try as Try10 } from "shared";
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
import { debugLog as debugLog6, Node as Node9, Result as Result12 } from "shared";
import {
  UserSideInput
} from "types/converter";
import { Converter } from "converter";
import { Pda } from "account";
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
      return Converter.TokenMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else if (tokenStandard === UserSideInput.TokenStandard.NonFungible) {
      return Converter.NftMetadata.intoUserSide(
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
      const connection = Node9.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID4
        }
      );
      info.value.length === 0 && callback(Result12.ok([]));
      for await (const d of info.value) {
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
          const metadata = await Metadata.fromAccountAddress(
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
    } catch (e) {
      if (e instanceof Error) {
        callback(Result12.err(e));
      }
    }
  };
  SplToken12.genericFindByMint = async (mint, tokenStandard) => {
    try {
      const connection = Node9.getConnection();
      const metadata = await Metadata.fromAccountAddress(
        connection,
        Pda.getMetadata(mint)
      );
      debugLog6("# findByMint metadata: ", metadata);
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error("token standards are different");
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data).parsed.info.supply;
      const response = await (await fetch(metadata.data.uri)).json();
      return Result12.ok(
        converter(tokenStandard, metadata, response, tokenAmount)
      );
    } catch (e) {
      return Result12.err(e);
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

// src/spl-token/freeze.ts
import {
  Instruction as Instruction8,
  KeypairAccount as KeypairAccount2,
  Try as Try11
} from "shared";
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
} from "shared";
var SplToken6;
((SplToken12) => {
  SplToken12.feePayerPartialSignTransfer = async (mint, owner, dest, signers, amount, mintDecimal, feePayer) => {
    return Try12(async () => {
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
      const blockhashObj = await Node10.getConnection().getLatestBlockhash();
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
    });
  };
})(SplToken6 || (SplToken6 = {}));

// src/spl-token/history.ts
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID5 } from "@solana/spl-token";
import { debugLog as debugLog7, Node as Node11 } from "shared";
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
        const tokenAccounts = await Node11.getConnection().getParsedTokenAccountsByOwner(
          target.toPublicKey(),
          {
            programId: TOKEN_PROGRAM_ID5
          }
        );
        const storedHistories = [];
        debugLog7("# tokenAccounts size: ", tokenAccounts.value.length);
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
  debugLog as debugLog8,
  KeypairAccount as KeypairAccount3,
  MintInstruction,
  Node as Node12,
  Try as Try13
} from "shared";
import { Pda as Pda2 } from "account";
import { Converter as Converter2 } from "converter";
import { Validator } from "validator";
import { Storage } from "storage";
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
    const connection = Node12.getConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
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
  };
  SplToken12.mint = async (owner, signer, totalAmount, mintDecimal, input, feePayer, freezeAuthority) => {
    return Try13(async () => {
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
      const datav2 = Converter2.TokenMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      debugLog8("# datav2: ", datav2);
      debugLog8("# upload content url: ", uri);
      const mint2 = KeypairAccount3.create();
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

// src/spl-token/thaw.ts
import {
  KeypairAccount as KeypairAccount4,
  Instruction as Instruction9,
  Try as Try14
} from "shared";
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
import { Instruction as Instruction10, Try as Try15 } from "shared";
var SplToken10;
((SplToken12) => {
  SplToken12.transfer = async (mint, owner, dest, signers, amount, mintDecimal, feePayer) => {
    return Try15(async () => {
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
      return new Instruction10([inst], keypairs, payer.toKeypair());
    });
  };
})(SplToken10 || (SplToken10 = {}));

// src/spl-token/index.ts
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FpcmRyb3AudHMiLCAiLi4vc3JjL2Fzc29jaWF0ZWQtYWNjb3VudC50cyIsICIuLi9zcmMvbWVtby9jcmVhdGUudHMiLCAiLi4vc3JjL3R5cGVzL2ZpbmQudHMiLCAiLi4vc3JjL3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlci50cyIsICIuLi9zcmMvY29udmVydC9tZW1vLnRzIiwgIi4uL3NyYy9jb252ZXJ0L21pbnQudHMiLCAiLi4vc3JjL2NvbnZlcnQvdHJhbnNmZXIudHMiLCAiLi4vc3JjL2NvbnZlcnQvdHJhbnNmZXItY2hlY2tlZC50cyIsICIuLi9zcmMvdHJhbnNhY3Rpb24tZmlsdGVyLnRzIiwgIi4uL3NyYy9zaWduYXR1cmVzLnRzIiwgIi4uL3NyYy9tZW1vL2hpc3RvcnkudHMiLCAiLi4vc3JjL21lbW8vaW5kZXgudHMiLCAiLi4vc3JjL211bHRpc2lnL2NyZWF0ZS50cyIsICIuLi9zcmMvbXVsdGlzaWcvaW5zdHJ1Y3Rpb24udHMiLCAiLi4vc3JjL211bHRpc2lnL2dldC1pbmZvLnRzIiwgIi4uL3NyYy9tdWx0aXNpZy9pcy1hZGRyZXNzLnRzIiwgIi4uL3NyYy9tdWx0aXNpZy9pbmRleC50cyIsICIuLi9zcmMvc29sLW5hdGl2ZS9maW5kLnRzIiwgIi4uL3NyYy9zb2wtbmF0aXZlL2ZlZS1wYXllci1wYXJ0aWFsLXNpZ24tdHJhbnNmZXIudHMiLCAiLi4vc3JjL3NvbC1uYXRpdmUvaGlzdG9yeS50cyIsICIuLi9zcmMvc29sLW5hdGl2ZS90cmFuc2Zlci50cyIsICIuLi9zcmMvc29sLW5hdGl2ZS90cmFuc2Zlci13aXRoLW11bHRpc2lnLnRzIiwgIi4uL3NyYy9zb2wtbmF0aXZlL2luZGV4LnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vYWRkLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vY2FsY3VsYXRlLWFtb3VudC50cyIsICIuLi9zcmMvc3BsLXRva2VuL2J1cm4udHMiLCAiLi4vc3JjL3NwbC10b2tlbi9maW5kLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vZnJlZXplLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlci50cyIsICIuLi9zcmMvc3BsLXRva2VuL2hpc3RvcnkudHMiLCAiLi4vc3JjL3NwbC10b2tlbi9taW50LnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vdGhhdy50cyIsICIuLi9zcmMvc3BsLXRva2VuL3RyYW5zZmVyLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IE5vZGUsIFJlc3VsdCwgZGVidWdMb2csIFRyeSwgUHVia2V5IH0gZnJvbSAnc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBaXJkcm9wIHtcbiAgY29uc3QgREVGQVVMVF9BSVJEUk9QX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE1BWF9BSVJEUk9QX1NPTCA9IDI7XG5cbiAgZXhwb3J0IGNvbnN0IHJlcXVlc3QgPSBhc3luYyAoXG4gICAgcHVia2V5OiBQdWJrZXksXG4gICAgYWlyZHJvcEFtb3VudD86IG51bWJlcixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCdOb3cgYWlyZHJvcHBpbmcuLi5wbGVhc2Ugd2FpdCcpO1xuXG4gICAgICBhaXJkcm9wQW1vdW50ID0gIWFpcmRyb3BBbW91bnRcbiAgICAgICAgPyBERUZBVUxUX0FJUkRST1BfQU1PVU5ULnRvTGFtcG9ydHMoKVxuICAgICAgICA6IGFpcmRyb3BBbW91bnQudG9MYW1wb3J0cygpO1xuXG4gICAgICBpZiAoYWlyZHJvcEFtb3VudCA+IE1BWF9BSVJEUk9QX1NPTC50b0xhbXBvcnRzKCkpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgYE92ZXIgbWF4IGFpcmRyb3AgYW1vdW50OiAke2FpcmRyb3BBbW91bnR9LCBtYXg6ICR7TUFYX0FJUkRST1BfU09MLnRvTGFtcG9ydHMoKX1gLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzaWcgPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5yZXF1ZXN0QWlyZHJvcChcbiAgICAgICAgcHVia2V5LnRvUHVibGljS2V5KCksXG4gICAgICAgIGFpcmRyb3BBbW91bnQsXG4gICAgICApO1xuICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcoc2lnKTtcbiAgICAgIHJldHVybiAnc3VjY2Vzcyc7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBkZWJ1Z0xvZyxcbiAgSW5zdHJ1Y3Rpb24sXG4gIE5vZGUsXG4gIFB1YmtleSxcbiAgU2VjcmV0LFxuICBzbGVlcCxcbn0gZnJvbSAnc2hhcmVkJztcblxuXG5pbXBvcnQge1xuICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QWNjb3VudCxcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG4gIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IsXG4gIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7IEtleXBhaXJBY2NvdW50IH0gZnJvbSAnYWNjb3VudCc7XG5cbi8qKlxuICogR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gKlxuICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsbG93T3duZXJPZmZDdXJ2ZVxuICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBBc3NvY2lhdGVkQWNjb3VudCB7XG4gIGNvbnN0IFJFVFJZX09WRVJfTElNSVQgPSAxMDtcbiAgY29uc3QgUkVUUllfU0xFRVBfVElNRSA9IDM7XG4gIGNvbnN0IGdldCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICApOiBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPiA9PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZlZVBheWVyIH0pLnB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICApO1xuXG4gICAgaWYgKCFyZXMuaW5zdCkge1xuICAgICAgcmV0dXJuIHJlcy50b2tlbkFjY291bnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgIFtyZXMuaW5zdF0sXG4gICAgICBbXSxcbiAgICAgIGZlZVBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgcmVzLnRva2VuQWNjb3VudCxcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXRyeSBmdW5jdGlvbiBpZiBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAqL1xuICBleHBvcnQgY29uc3QgcmV0cnlHZXRPckNyZWF0ZSA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGxldCBjb3VudGVyID0gMTtcbiAgICB3aGlsZSAoY291bnRlciA8IFJFVFJZX09WRVJfTElNSVQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGluc3QgPSBhd2FpdCBnZXQobWludCwgb3duZXIsIGZlZVBheWVyLCB0cnVlKTtcblxuICAgICAgICBpZiAoaW5zdCAmJiB0eXBlb2YgaW5zdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBpbnN0KTtcbiAgICAgICAgICByZXR1cm4gaW5zdDtcbiAgICAgICAgfSBlbHNlIGlmIChpbnN0IGluc3RhbmNlb2YgSW5zdHJ1Y3Rpb24pIHtcbiAgICAgICAgICAoYXdhaXQgaW5zdC5zdWJtaXQoKSkubWFwKFxuICAgICAgICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgICAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKG9rKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGluc3QuZGF0YSBhcyBzdHJpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgICBkZWJ1Z0xvZygnIyBFcnJvciBzdWJtaXQgcmV0cnlHZXRPckNyZWF0ZTogJywgZXJyKTtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGRlYnVnTG9nKGAjIHJldHJ5OiAke2NvdW50ZXJ9IGNyZWF0ZSB0b2tlbiBhY2NvdW50OiBgLCBlKTtcbiAgICAgICAgZGVidWdMb2coYCMgbWludDogJHttaW50fSwgb3duZXI6ICR7b3duZXJ9LCBmZWVQYXllcjogJHtmZWVQYXllcn1gKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNsZWVwKFJFVFJZX1NMRUVQX1RJTUUpO1xuICAgICAgY291bnRlcisrO1xuICAgIH1cbiAgICB0aHJvdyBFcnJvcihgcmV0cnkgYWN0aW9uIGlzIG92ZXIgbGltaXQgJHtSRVRSWV9PVkVSX0xJTUlUfWApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZlZVBheWVyXG4gICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZlZVBheWVyPzogUHVia2V5LFxuICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICApOiBQcm9taXNlPHtcbiAgICB0b2tlbkFjY291bnQ6IHN0cmluZztcbiAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICB9PiA9PiB7XG4gICAgY29uc3QgYXNzb2NpYXRlZFRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgKTtcblxuICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gRG9udCB1c2UgUmVzdWx0XG4gICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgaW5zdDogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgaWYgKFxuICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gb3duZXIgOiBmZWVQYXllcjtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgcGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYXNzb2NpYXRlZFRva2VuQWNjb3VudCxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgaW5zdCxcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgQ29uc3RhbnRzLCBJbnN0cnVjdGlvbiwgUHVia2V5LCBTZWNyZXQgfSBmcm9tICdzaGFyZWQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE1lbW8ge1xuICBleHBvcnQgY29uc3QgZGVjb2RlID0gKGVuY29kZWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGJzLmRlY29kZShlbmNvZGVkKS50b1N0cmluZygpO1xuXG4gIGV4cG9ydCBjb25zdCBlbmNvZGUgPSAoZGF0YTogc3RyaW5nKTogQnVmZmVyID0+IEJ1ZmZlci5mcm9tKGRhdGEpO1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGUgPSAoXG4gICAgZGF0YTogc3RyaW5nLFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyOiBTZWNyZXQsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IEluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXkgPSBvd25lci50b1B1YmxpY0tleSgpXG4gICAgICA/IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwdWJrZXk6IG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBpc1NpZ25lcjogdHJ1ZSxcbiAgICAgICAgICAgIGlzV3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgICAgOiBbXTtcblxuICAgIGNvbnN0IGluc3RydWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAgcHJvZ3JhbUlkOiBDb25zdGFudHMuTUVNT19QUk9HUkFNX0lELFxuICAgICAgZGF0YTogZW5jb2RlKGRhdGEpLFxuICAgICAga2V5czoga2V5LFxuICAgIH0pO1xuXG4gICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciB8fCBzaWduZXI7XG5cbiAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgW2luc3RydWN0aW9uXSxcbiAgICAgIFtzaWduZXIudG9LZXlwYWlyKCldLFxuICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBVc2VyU2lkZU91dHB1dCB9IGZyb20gJ3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBlbnVtIFNvcnRhYmxlIHtcbiAgQXNjID0gJ2FzYycsXG4gIERlc2MgPSAnZGVzYycsXG59XG5cbmV4cG9ydCB0eXBlIFRva2VuTWV0YWRhdGEgPSBVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhO1xuIiwgImV4cG9ydCBlbnVtIEZpbHRlclR5cGUge1xuICBNZW1vID0gJ21lbW8nLFxuICBNaW50ID0gJ21pbnQnLFxuICBPbmx5TWVtbyA9ICdvbmx5LW1lbW8nLFxuICBUcmFuc2ZlciA9ICd0cmFuc2ZlcicsXG59XG5cbmV4cG9ydCBlbnVtIE1vZHVsZU5hbWUge1xuICBTb2xOYXRpdmUgPSAnc3lzdGVtJyxcbiAgU3BsVG9rZW4gPSAnc3BsLXRva2VuJyxcbn1cblxuZXhwb3J0IGNvbnN0IEZpbHRlck9wdGlvbnMgPSB7XG4gIFRyYW5zZmVyOiB7XG4gICAgcHJvZ3JhbTogWydzeXN0ZW0nLCAnc3BsLXRva2VuJ10sXG4gICAgYWN0aW9uOiBbJ3RyYW5zZmVyJywgJ3RyYW5zZmVyQ2hlY2tlZCddLFxuICB9LFxuICBNZW1vOiB7XG4gICAgcHJvZ3JhbTogWydzcGwtbWVtbyddLFxuICAgIGFjdGlvbjogWycqJ10sXG4gIH0sXG4gIE1pbnQ6IHtcbiAgICBwcm9ncmFtOiBbJ3NwbC10b2tlbiddLFxuICAgIGFjdGlvbjogWydtaW50VG8nLCAnbWludFRvQ2hlY2tlZCddLFxuICB9LFxufTtcblxuZXhwb3J0IHR5cGUgUG9zdFRva2VuQWNjb3VudCA9IHtcbiAgYWNjb3VudDogc3RyaW5nO1xuICBvd25lcjogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgV2l0aE1lbW8gPSB7XG4gIHNpZzogc3RyaW5nW107XG4gIG1lbW86IHN0cmluZztcbn07XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQsIFBvc3RUb2tlbkFjY291bnQsIFVzZXJTaWRlT3V0cHV0IH0gZnJvbSAnLi4vdHlwZXMvJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0Lk1lbW8ge1xuICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk1lbW8sXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICBvdXRwdXRUcmFuc2Zlcj86IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgKTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgaGlzdG9yeTogVXNlclNpZGVPdXRwdXQuSGlzdG9yeSA9IHt9O1xuXG4gICAgLy8gY2FzZTogdHJhbnNmZXIgd2l0aCBtZW1vXG4gICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtID09PSAnc3BsLXRva2VuJykge1xuICAgICAgICBjb25zdCBmb3VuZFNvdXJjZSA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5taW50O1xuICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhpc3RvcnkubWVtbyA9IG91dHB1dC5wYXJzZWQ7XG4gICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICcuLi90eXBlcy8nO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICdzaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnQuTWludCB7XG4gIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuTWludFRvLFxuICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICk6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGhpc3Rvcnk6IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnkgPSB7fTtcblxuICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgIGhpc3RvcnkubWludEF1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50QXV0aG9yaXR5O1xuICAgIGhpc3RvcnkudG9rZW5BbW91bnQgPSBvdXRwdXQucGFyc2VkLmluZm8udG9rZW5BbW91bnQ7XG4gICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQ7XG4gICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgaWYgKFxuICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICApIHtcbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGhpc3Rvcnk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQsIFVzZXJTaWRlT3V0cHV0IH0gZnJvbSAnLi4vdHlwZXMvJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0LlRyYW5zZmVyIHtcbiAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlcixcbiAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICApOiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBoaXN0b3J5OiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5ID0ge307XG5cbiAgICAvLyB2YWxpZGF0aW9uIGNoZWNrXG4gICAgaWYgKCFvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24gfHwgIW91dHB1dC5wYXJzZWQuaW5mby5sYW1wb3J0cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhpc3Rvcnkuc291cmNlID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgIGhpc3Rvcnkuc29sID0gb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzPy50b1NvbCgpLnRvU3RyaW5nKCk7XG4gICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IEluZnJhU2lkZU91dHB1dCwgUG9zdFRva2VuQWNjb3VudCwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICcuLi90eXBlcy8nO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICdzaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnQuVHJhbnNmZXJDaGVja2VkIHtcbiAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICApOiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBoaXN0b3J5OiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5ID0ge307XG5cbiAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCkge1xuICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICApO1xuICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICApO1xuICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICB9XG5cbiAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgIGhpc3RvcnkubXVsdGlzaWdBdXRob3JpdHkgPSBvdXRwdXQucGFyc2VkLmluZm8ubXVsdGlzaWdBdXRob3JpdHk7XG4gICAgaGlzdG9yeS5zaWduZXJzID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNpZ25lcnM7XG4gICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICBpZiAoXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGlzdG9yeTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0IGFzIF9NZW1vIH0gZnJvbSAnLi9jb252ZXJ0L21lbW8nO1xuaW1wb3J0IHsgQ29udmVydCBhcyBfTWludCB9IGZyb20gJy4vY29udmVydC9taW50JztcbmltcG9ydCB7IENvbnZlcnQgYXMgX1RyYW5zZmVyIH0gZnJvbSAnLi9jb252ZXJ0L3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnQgYXMgX1RyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vY29udmVydC90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IFBhcnNlZEluc3RydWN0aW9uLCBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIEZpbHRlck9wdGlvbnMsXG4gIEZpbHRlclR5cGUsXG4gIE1vZHVsZU5hbWUsXG4gIFBvc3RUb2tlbkFjY291bnQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnc2hhcmVkJztcblxuLy9AaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25GaWx0ZXIge1xuICBjb25zdCBjcmVhdGVQb3N0VG9rZW5BY2NvdW50TGlzdCA9IChcbiAgICB0cmFuc2FjdGlvbjogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgKTogUG9zdFRva2VuQWNjb3VudFtdID0+IHtcbiAgICBjb25zdCBwb3N0VG9rZW5BY2NvdW50OiBQb3N0VG9rZW5BY2NvdW50W10gPSBbXTtcbiAgICBjb25zdCBhY2NvdW50S2V5cyA9IHRyYW5zYWN0aW9uLnRyYW5zYWN0aW9uLm1lc3NhZ2UuYWNjb3VudEtleXMubWFwKCh0KSA9PlxuICAgICAgdC5wdWJrZXkudG9TdHJpbmcoKSxcbiAgICApO1xuXG4gICAgdHJhbnNhY3Rpb24ubWV0YT8ucG9zdFRva2VuQmFsYW5jZXM/LmZvckVhY2goKHQpID0+IHtcbiAgICAgIGlmIChhY2NvdW50S2V5c1t0LmFjY291bnRJbmRleF0gJiYgdC5vd25lcikge1xuICAgICAgICBjb25zdCB2ID0ge1xuICAgICAgICAgIGFjY291bnQ6IGFjY291bnRLZXlzW3QuYWNjb3VudEluZGV4XSxcbiAgICAgICAgICBvd25lcjogdC5vd25lcixcbiAgICAgICAgfTtcbiAgICAgICAgcG9zdFRva2VuQWNjb3VudC5wdXNoKHYpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwb3N0VG9rZW5BY2NvdW50O1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1BhcnNlZEluc3RydWN0aW9uID0gKFxuICAgIGFyZzogdW5rbm93bixcbiAgKTogYXJnIGlzIFBhcnNlZEluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gYXJnICE9PSBudWxsICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmICdwYXJzZWQnIGluIGFyZztcbiAgfTtcblxuICBleHBvcnQgY29uc3QgcGFyc2UgPVxuICAgIChmaWx0ZXJUeXBlOiBGaWx0ZXJUeXBlLCBtb2R1bGVOYW1lOiBNb2R1bGVOYW1lKSA9PlxuICAgICh0eE1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEpOiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGxldCBoaXN0b3J5OiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5IHwgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGZpbHRlclR5cGUgPT09IEZpbHRlclR5cGUuTWludCAmJlxuICAgICAgICBtb2R1bGVOYW1lID09PSBNb2R1bGVOYW1lLlNvbE5hdGl2ZVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIFwiVGhpcyBmaWx0ZXJUeXBlKCdGaWx0ZXJUeXBlLk1pbnQnKSBjYW4gbm90IHVzZSBmcm9tIFNvbE5hdGl2ZSBtb2R1bGVcIixcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0eE1ldGEpIHtcbiAgICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvc3RUb2tlbkFjY291bnQgPSBjcmVhdGVQb3N0VG9rZW5BY2NvdW50TGlzdCh0eE1ldGEpO1xuXG4gICAgICB0eE1ldGEudHJhbnNhY3Rpb24ubWVzc2FnZS5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgaWYgKGlzUGFyc2VkSW5zdHJ1Y3Rpb24oaW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgICAgc3dpdGNoIChmaWx0ZXJUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEZpbHRlclR5cGUuTWVtbzoge1xuICAgICAgICAgICAgICBpZiAoRmlsdGVyT3B0aW9ucy5NZW1vLnByb2dyYW0uaW5jbHVkZXMoaW5zdHJ1Y3Rpb24ucHJvZ3JhbSkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0eE1ldGEudHJhbnNhY3Rpb24ubWVzc2FnZS5pbnN0cnVjdGlvbnMpO1xuICAgICAgICAgICAgICAgIGxldCBpbnN0cnVjdGlvblRyYW5zZmVyO1xuXG4gICAgICAgICAgICAgICAgLy8gZmV0Y2ggIHRyYW5zZmVyIHRyYW5zYWN0aW9uIGZvciByZWxhdGlvbmFsIG1lbW9cbiAgICAgICAgICAgICAgICB0eE1ldGEudHJhbnNhY3Rpb24ubWVzc2FnZS5pbnN0cnVjdGlvbnMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgIChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgaXNQYXJzZWRJbnN0cnVjdGlvbihpbnN0cnVjdGlvbikgJiZcbiAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXJPcHRpb25zLlRyYW5zZmVyLnByb2dyYW0uaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5wcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25UcmFuc2ZlciA9IGluc3RydWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAvLyBzcGwtdG9rZW4gb3Igc3lzdGVtXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25UcmFuc2ZlciAmJlxuICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZSAhPT0gaW5zdHJ1Y3Rpb25UcmFuc2ZlclsncHJvZ3JhbSddXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgICAgICAgICAgICAgJyMgRmlsdGVyVHlwZS5NZW1vIGJyZWFrIGluc3RydWN0aW9uOiAnLFxuICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGZldGNoIG1lbW8gb25seSB0cmFuc2FjdGlvblxuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBfTWVtby5NZW1vLmludG9Vc2VyU2lkZShcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgdHhNZXRhLFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25UcmFuc2ZlcixcbiAgICAgICAgICAgICAgICAgIHBvc3RUb2tlbkFjY291bnQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5Pbmx5TWVtbzoge1xuICAgICAgICAgICAgICBpZiAoRmlsdGVyT3B0aW9ucy5NZW1vLnByb2dyYW0uaW5jbHVkZXMoaW5zdHJ1Y3Rpb24ucHJvZ3JhbSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zdHJ1Y3Rpb25UcmFuc2ZlcjtcblxuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBfTWVtby5NZW1vLmludG9Vc2VyU2lkZShcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgdHhNZXRhLFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25UcmFuc2ZlcixcbiAgICAgICAgICAgICAgICAgIHBvc3RUb2tlbkFjY291bnQsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5NaW50OiB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBGaWx0ZXJPcHRpb25zLk1pbnQucHJvZ3JhbS5pbmNsdWRlcyhpbnN0cnVjdGlvbi5wcm9ncmFtKSAmJlxuICAgICAgICAgICAgICAgIEZpbHRlck9wdGlvbnMuTWludC5hY3Rpb24uaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5wYXJzZWQudHlwZSBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBoaXN0b3J5ID0gX01pbnQuTWludC5pbnRvVXNlclNpZGUoaW5zdHJ1Y3Rpb24sIHR4TWV0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEZpbHRlclR5cGUuVHJhbnNmZXI6XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lID09PSBpbnN0cnVjdGlvbi5wcm9ncmFtICYmXG4gICAgICAgICAgICAgICAgRmlsdGVyT3B0aW9ucy5UcmFuc2Zlci5hY3Rpb24uaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5wYXJzZWQudHlwZSBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zdHJ1Y3Rpb24ucGFyc2VkLnR5cGUgPT09ICd0cmFuc2ZlckNoZWNrZWQnKSB7XG4gICAgICAgICAgICAgICAgICBoaXN0b3J5ID0gX1RyYW5zZmVyQ2hlY2tlZC5UcmFuc2ZlckNoZWNrZWQuaW50b1VzZXJTaWRlKFxuICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdHhNZXRhLFxuICAgICAgICAgICAgICAgICAgICBwb3N0VG9rZW5BY2NvdW50LFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaGlzdG9yeSA9IF9UcmFuc2Zlci5UcmFuc2Zlci5pbnRvVXNlclNpZGUoXG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tIFwiQHNvbGFuYS93ZWIzLmpzXCI7XG5pbXBvcnQgeyBkZWJ1Z0xvZywgTm9kZSwgUHVia2V5LCBSZXN1bHQsIHNsZWVwIH0gZnJvbSBcInNoYXJlZFwiO1xuaW1wb3J0IHsgVXNlclNpZGVPdXRwdXQgfSBmcm9tIFwiLi90eXBlcy9cIjtcblxuLy9AaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgU2lnbmF0dXJlcyB7XG4gIGNvbnN0IHBhcnNlRm9yVHJhbnNhY3Rpb24gPSBhc3luYyAoXG4gICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gICk6IFByb21pc2U8UGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YT4gPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldFBhcnNlZFRyYW5zYWN0aW9uKHNpZ25hdHVyZSk7XG4gICAgaWYgKCFyZXMpIHtcbiAgICAgIHJldHVybiB7fSBhcyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRGb3JBZHJlc3MgPSBhc3luYyAoXG4gICAgcHVia2V5OiBQdWJrZXksXG4gICAgcGFyc2VyOiAoXG4gICAgICB0cmFuc2FjdGlvbjogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICApID0+IFVzZXJTaWRlT3V0cHV0Lkhpc3RvcnkgfCB1bmRlZmluZWQsXG4gICAgY2FsbGJhY2s6IChoaXN0b3J5OiBSZXN1bHQ8VXNlclNpZGVPdXRwdXQuSGlzdG9yeVtdLCBFcnJvcj4pID0+IHZvaWQsXG4gICAgb3B0aW9uczoge1xuICAgICAgd2FpdFRpbWU6IG51bWJlcjtcbiAgICAgIG5hcnJvd0Rvd246IG51bWJlcjtcbiAgICB9LFxuICAgIGhpc3RvcmllczogVXNlclNpZGVPdXRwdXQuSGlzdG9yeVtdID0gW10sXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBkZWJ1Z0xvZyhcIiMgb3B0aW9uczogXCIsIG9wdGlvbnMpO1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb25zID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0U2lnbmF0dXJlc0ZvckFkZHJlc3MoXG4gICAgICAgIHB1YmtleS50b1B1YmxpY0tleSgpLFxuICAgICAgICB7XG4gICAgICAgICAgbGltaXQ6IG9wdGlvbnMubmFycm93RG93bixcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKFwiIyB0cmFuc2FjdGlvbnMgY291bnQ6XCIsIHRyYW5zYWN0aW9ucy5sZW5ndGgpO1xuXG4gICAgICBmb3IgKGNvbnN0IHRyYW5zYWN0aW9uIG9mIHRyYW5zYWN0aW9ucykge1xuICAgICAgICBwYXJzZUZvclRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uLnNpZ25hdHVyZSlcbiAgICAgICAgICAudGhlbigoc2lnbmF0dXJlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5ID0gcGFyc2VyKHNpZ25hdHVyZSk7XG4gICAgICAgICAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgICAgICAgICBoaXN0b3JpZXMucHVzaChoaXN0b3J5KTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0Lm9rKGhpc3RvcmllcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlKSA9PiBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKSk7XG4gICAgICAgIGF3YWl0IHNsZWVwKG9wdGlvbnMud2FpdFRpbWUpOyAvLyBhdm9pZCA0MjkgZXJyb3JcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQdWJrZXkgfSBmcm9tIFwic2hhcmVkXCI7XG5pbXBvcnQge1xuICBGaWx0ZXJUeXBlLFxuICBIaXN0b3J5LFxuICBIaXN0b3J5T3B0aW9ucyxcbiAgTW9kdWxlTmFtZSxcbiAgT25FcnIsXG4gIE9uT2ssXG59IGZyb20gXCIuLi90eXBlcy9cIjtcbmltcG9ydCB7IFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSBcIi4uL3RyYW5zYWN0aW9uLWZpbHRlclwiO1xuaW1wb3J0IHsgU2lnbmF0dXJlcyB9IGZyb20gXCIuLi9zaWduYXR1cmVzXCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWVtbyB7XG4gIGV4cG9ydCBjb25zdCBnZXRIaXN0b3J5ID0gYXN5bmMgKFxuICAgIHRhcmdldDogUHVia2V5LFxuICAgIG9uT2s6IE9uT2s8SGlzdG9yeT4sXG4gICAgb25FcnI6IE9uRXJyLFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8SGlzdG9yeU9wdGlvbnM+ID0ge30sXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkZWZhdWx0VmFsdWVzOiBIaXN0b3J5T3B0aW9ucyA9IHtcbiAgICAgICAgd2FpdFRpbWU6IDAuMDMsXG4gICAgICAgIG5hcnJvd0Rvd246IDEwMCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXJnZWRPcHRpb25zID0geyAuLi5kZWZhdWx0VmFsdWVzLCAuLi5vcHRpb25zIH07XG4gICAgICBjb25zdCBwYXJzZXIgPSBUcmFuc2FjdGlvbkZpbHRlci5wYXJzZShcbiAgICAgICAgRmlsdGVyVHlwZS5Pbmx5TWVtbyxcbiAgICAgICAgTW9kdWxlTmFtZS5Tb2xOYXRpdmUsXG4gICAgICApO1xuICAgICAgYXdhaXQgU2lnbmF0dXJlcy5nZXRGb3JBZHJlc3MoXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgcGFyc2VyLFxuICAgICAgICAocmVzdWx0KSA9PiByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgICBtZXJnZWRPcHRpb25zXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgb25FcnIoZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7IE1lbW8gYXMgQ3JlYXRlIH0gZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IHsgTWVtbyBhcyBIaXN0b3J5IH0gZnJvbSAnLi9oaXN0b3J5JztcblxuZXhwb3J0IGNvbnN0IE1lbW8gPSB7IC4uLkNyZWF0ZSwgLi4uSGlzdG9yeSB9O1xuIiwgImltcG9ydCB7XG4gIE5vZGUsXG4gIFJlc3VsdCxcbiAgSW5zdHJ1Y3Rpb24sXG4gIFRyeSxcbiAgU2VjcmV0LFxuICBQdWJrZXksXG59IGZyb20gJ3NoYXJlZCc7XG5pbXBvcnQgeyBLZXlwYWlyIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE11bHRpc2lnIGFzIF9JbnN0cnVjdGlvbiB9IGZyb20gJy4vaW5zdHJ1Y3Rpb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIE11bHRpc2lnIHtcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IGFzeW5jIChcbiAgICBtOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICBzaWduZXJQdWJrZXlzOiBQdWJrZXlbXSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKG0gPiBzaWduZXJQdWJrZXlzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBFcnJvcignc2lnbmVycyBudW1iZXIgbGVzcyB0aGFuIG0gbnVtYmVyJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFjY291bnQgPSBLZXlwYWlyLmdlbmVyYXRlKCk7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCBiYWxhbmNlTmVlZGVkID0gYXdhaXQgY29ubmVjdGlvbi5nZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRpb24oXG4gICAgICAgIF9JbnN0cnVjdGlvbi5MYXlvdXQuc3BhbixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QxID0gX0luc3RydWN0aW9uLmFjY291bnQoXG4gICAgICAgIGFjY291bnQsXG4gICAgICAgIGZlZVBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBiYWxhbmNlTmVlZGVkLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdDIgPSBfSW5zdHJ1Y3Rpb24ubXVsdGlzaWcoXG4gICAgICAgIG0sXG4gICAgICAgIGFjY291bnQsXG4gICAgICAgIHNpZ25lclB1YmtleXMubWFwKChwdWJrZXk6IFB1YmtleSkgPT4gcHVia2V5LnRvUHVibGljS2V5KCkpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3QxLCBpbnN0Ml0sXG4gICAgICAgIFthY2NvdW50XSxcbiAgICAgICAgZmVlUGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIGFjY291bnQucHVibGljS2V5LnRvU3RyaW5nKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgS2V5cGFpcixcbiAgU1lTVkFSX1JFTlRfUFVCS0VZLFxuICBTeXN0ZW1Qcm9ncmFtLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBzdHJ1Y3QsIHU4LCBibG9iIH0gZnJvbSAnQHNvbGFuYS9idWZmZXItbGF5b3V0JztcbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbi8vIEBpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBNdWx0aXNpZyB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgY29uc3QgY3JlYXRlTGF5b3V0UHViS2V5ID0gKHByb3BlcnR5OiBzdHJpbmcpOiBhbnkgPT4ge1xuICAgIHJldHVybiBibG9iKDMyLCBwcm9wZXJ0eSk7XG4gIH07XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudCAqL1xuICBleHBvcnQgY29uc3QgTGF5b3V0ID0gc3RydWN0PHtcbiAgICBtOiBudW1iZXI7XG4gICAgbjogbnVtYmVyO1xuICAgIGlzX2luaXRpYWxpemVkOiBudW1iZXI7XG4gICAgc2lnbmVyMTogUHVibGljS2V5O1xuICAgIHNpZ25lcjI6IFB1YmxpY0tleTtcbiAgICBzaWduZXIzOiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNDogUHVibGljS2V5O1xuICAgIHNpZ25lcjU6IFB1YmxpY0tleTtcbiAgICBzaWduZXI2OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNzogUHVibGljS2V5O1xuICAgIHNpZ25lcjg6IFB1YmxpY0tleTtcbiAgICBzaWduZXI5OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyMTA6IFB1YmxpY0tleTtcbiAgICBzaWduZXIxMTogUHVibGljS2V5O1xuICB9PihbXG4gICAgdTgoJ20nKSxcbiAgICB1OCgnbicpLFxuICAgIHU4KCdpc19pbml0aWFsaXplZCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMTAnKSxcbiAgICBjcmVhdGVMYXlvdXRQdWJLZXkoJ3NpZ25lcjExJyksXG4gIF0pO1xuXG4gIGV4cG9ydCBjb25zdCBhY2NvdW50ID0gKFxuICAgIG5ld0FjY291bnQ6IEtleXBhaXIsXG4gICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgYmFsYW5jZU5lZWRlZDogbnVtYmVyLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG5ld0FjY291bnQucHVibGljS2V5LFxuICAgICAgbGFtcG9ydHM6IGJhbGFuY2VOZWVkZWQsXG4gICAgICBzcGFjZTogTGF5b3V0LnNwYW4sXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IG11bHRpc2lnID0gKFxuICAgIG06IG51bWJlcixcbiAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICBzaWduZXJQdWJrZXk6IFB1YmxpY0tleVtdLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAge1xuICAgICAgICBwdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHVia2V5OiBTWVNWQVJfUkVOVF9QVUJLRVksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgc2lnbmVyUHVia2V5LmZvckVhY2goKHB1YmtleSkgPT5cbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIHB1YmtleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBkYXRhTGF5b3V0ID0gc3RydWN0PHsgaW5zdHJ1Y3Rpb246IG51bWJlcjsgbTogbnVtYmVyIH0+KFtcbiAgICAgIHU4KCdpbnN0cnVjdGlvbicpLFxuICAgICAgdTgoJ20nKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuYWxsb2MoZGF0YUxheW91dC5zcGFuKTtcblxuICAgIGRhdGFMYXlvdXQuZW5jb2RlKFxuICAgICAge1xuICAgICAgICBpbnN0cnVjdGlvbjogMixcbiAgICAgICAgbSxcbiAgICAgIH0sXG4gICAgICBkYXRhLFxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAga2V5cyxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTm9kZSwgUHVia2V5LCBSZXN1bHQsIFRyeSB9IGZyb20gJ3NoYXJlZCc7XG5pbXBvcnQgeyBMYXlvdXRPYmplY3QgfSBmcm9tICdAc29sYW5hL2J1ZmZlci1sYXlvdXQnO1xuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBfSW5zdHJ1Y3Rpb24gfSBmcm9tICcuL2luc3RydWN0aW9uJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNdWx0aXNpZyB7XG4gIGV4cG9ydCBjb25zdCBnZXRJbmZvID0gYXN5bmMgKFxuICAgIG11bHRpc2lnOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PExheW91dE9iamVjdCwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0QWNjb3VudEluZm8oXG4gICAgICAgIG11bHRpc2lnLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgaWYgKGluZm8gPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0ZhaWxlZCB0byBmaW5kIG11bHRpc2lnJyk7XG4gICAgICB9XG4gICAgICBpZiAoIWluZm8ub3duZXIuZXF1YWxzKFRPS0VOX1BST0dSQU1fSUQpKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIG11bHRpc2lnIG93bmVyJyk7XG4gICAgICB9XG4gICAgICBpZiAoaW5mby5kYXRhLmxlbmd0aCAhPT0gX0luc3RydWN0aW9uLkxheW91dC5zcGFuKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIG11bHRpc2lnIHNpemUnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IEJ1ZmZlci5mcm9tKGluZm8uZGF0YSk7XG4gICAgICBjb25zdCBtdWx0aXNpZ0luZm8gPSBfSW5zdHJ1Y3Rpb24uTGF5b3V0LmRlY29kZShkYXRhKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIxID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyMSk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMiA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjIpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjMgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIzKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI0ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyNCk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyNSA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjUpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjYgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI2KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI3ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyNyk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyOCA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjgpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjkgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI5KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIxMCA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjEwKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIxMSA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjExKTtcbiAgICAgIHJldHVybiBtdWx0aXNpZ0luZm87XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHVia2V5LCBSZXN1bHQsIFRyeSB9IGZyb20gJ3NoYXJlZCc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBfR2V0IH0gZnJvbSAnLi9nZXQtaW5mbyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICBleHBvcnQgY29uc3QgaXNBZGRyZXNzID0gYXN5bmMgKFxuICAgIG11bHRpc2lnOiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PGJvb2xlYW4sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IF9HZXQuZ2V0SW5mbyhtdWx0aXNpZyk7XG4gICAgICBpZiAoaW5mby5pc0Vycikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBNdWx0aXNpZyBhcyBDcmVhdGUgfSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBHZXRJbmZvIH0gZnJvbSAnLi9nZXQtaW5mbyc7XG5pbXBvcnQgeyBNdWx0aXNpZyBhcyBJc0FkZHJlc3MgfSBmcm9tICcuL2lzLWFkZHJlc3MnO1xuXG5leHBvcnQgY29uc3QgTXVsdGlzaWcgPSB7IC4uLkNyZWF0ZSwgLi4uR2V0SW5mbywgLi4uSXNBZGRyZXNzIH07XG4iLCAiaW1wb3J0IHsgUGFyc2VkQWNjb3VudERhdGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSwgUHVia2V5LCBSZXN1bHQsIFRyeSB9IGZyb20gJ3NoYXJlZCc7XG5pbXBvcnQgeyBPd25lckluZm8gfSBmcm9tICcuLi90eXBlcy9zb2wtbmF0aXZlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSAnLi4vdHJhbnNhY3Rpb24tZmlsdGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTb2xOYXRpdmUge1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8T3duZXJJbmZvLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldFBhcnNlZEFjY291bnRJbmZvKFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5mbyA9IHtcbiAgICAgICAgc29sOiAwLFxuICAgICAgICBsYW1wb3J0czogMCxcbiAgICAgICAgb3duZXI6IG93bmVyLnRvU3RyaW5nKCksXG4gICAgICB9O1xuXG4gICAgICBpZiAoVHJhbnNhY3Rpb25GaWx0ZXIuaXNQYXJzZWRJbnN0cnVjdGlvbihyZXMudmFsdWU/LmRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZEFjY291bnREYXRhID0gcmVzLnZhbHVlPy5kYXRhIGFzIFBhcnNlZEFjY291bnREYXRhO1xuICAgICAgICBpbmZvLm93bmVyID0gcGFyc2VkQWNjb3VudERhdGEucGFyc2VkPy5pbmZvPy5vd25lciBhcyBzdHJpbmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMudmFsdWUpIHtcbiAgICAgICAgaW5mby5sYW1wb3J0cyA9IHJlcy52YWx1ZT8ubGFtcG9ydHM7XG4gICAgICAgIGluZm8uc29sID0gcmVzLnZhbHVlPy5sYW1wb3J0cy50b1NvbCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU3lzdGVtUHJvZ3JhbSwgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQge1xuICBSZXN1bHQsXG4gIE5vZGUsXG4gIFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sXG4gIFRyeSxcbiAgUHVia2V5LFxuICBTZWNyZXQsXG59IGZyb20gJ3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU29sTmF0aXZlIHtcbiAgY29uc3QgUkFESVggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IGZlZVBheWVyUGFydGlhbFNpZ25UcmFuc2ZlciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnbkluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGJsb2NrSGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBibG9ja2hhc2g6IGJsb2NrSGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBibG9ja0hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSkuYWRkKFxuICAgICAgICBTeXN0ZW1Qcm9ncmFtLnRyYW5zZmVyKHtcbiAgICAgICAgICBmcm9tUHVia2V5OiBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHRvUHVia2V5OiBkZXN0LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbGFtcG9ydHM6IHBhcnNlSW50KGAke2Ftb3VudC50b0xhbXBvcnRzKCl9YCwgUkFESVgpLFxuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIHNpZ25lcnMuZm9yRWFjaCgoc2lnbmVyKSA9PiB7XG4gICAgICAgIHR4LnBhcnRpYWxTaWduKHNpZ25lci50b0tleXBhaXIoKSk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2VyaWFsaXplZFR4ID0gdHguc2VyaWFsaXplKHtcbiAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBoZXggPSBzZXJpYWxpemVkVHgudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgcmV0dXJuIG5ldyBQYXJ0aWFsU2lnbkluc3RydWN0aW9uKGhleCk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHVia2V5IH0gZnJvbSBcInNoYXJlZFwiO1xuaW1wb3J0IHtcbiAgRmlsdGVyVHlwZSxcbiAgSGlzdG9yeSxcbiAgSGlzdG9yeU9wdGlvbnMsXG4gIE1vZHVsZU5hbWUsXG4gIE9uRXJyLFxuICBPbk9rLFxufSBmcm9tIFwiLi4vdHlwZXMvXCI7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkZpbHRlciB9IGZyb20gXCIuLi90cmFuc2FjdGlvbi1maWx0ZXJcIjtcbmltcG9ydCB7IFNpZ25hdHVyZXMgfSBmcm9tIFwiLi4vc2lnbmF0dXJlc1wiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNvbE5hdGl2ZSB7XG4gIGV4cG9ydCBjb25zdCBnZXRIaXN0b3J5ID0gYXN5bmMgKFxuICAgIHRhcmdldDogUHVia2V5LFxuICAgIGZpbHRlclR5cGU6IEZpbHRlclR5cGUsXG4gICAgb25PazogT25PazxIaXN0b3J5PixcbiAgICBvbkVycjogT25FcnIsXG4gICAgb3B0aW9uczogUGFydGlhbDxIaXN0b3J5T3B0aW9ucz4gPSB7fSxcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZXM6IEhpc3RvcnlPcHRpb25zID0ge1xuICAgICAgICB3YWl0VGltZTogMC4wMyxcbiAgICAgICAgbmFycm93RG93bjogMTAwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSB7IC4uLmRlZmF1bHRWYWx1ZXMsIC4uLm9wdGlvbnMgfTtcblxuICAgICAgY29uc3QgcGFyc2VyID0gVHJhbnNhY3Rpb25GaWx0ZXIucGFyc2UoZmlsdGVyVHlwZSwgTW9kdWxlTmFtZS5Tb2xOYXRpdmUpO1xuICAgICAgYXdhaXQgU2lnbmF0dXJlcy5nZXRGb3JBZHJlc3MoXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgcGFyc2VyLFxuICAgICAgICBhc3luYyAocmVzdWx0KSA9PiBhd2FpdCByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgICBtZXJnZWRPcHRpb25zLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIG9uRXJyKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBTeXN0ZW1Qcm9ncmFtIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFJlc3VsdCwgSW5zdHJ1Y3Rpb24sIFRyeSwgUHVia2V5LCBTZWNyZXQgfSBmcm9tICdzaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNvbE5hdGl2ZSB7XG4gIGNvbnN0IFJBRElYID0gMTA7XG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IChcbiAgICBzb3VyY2U6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGluc3QgPSBTeXN0ZW1Qcm9ncmFtLnRyYW5zZmVyKHtcbiAgICAgICAgZnJvbVB1YmtleTogc291cmNlLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRvUHVia2V5OiBkZXN0LnRvUHVibGljS2V5KCksXG4gICAgICAgIGxhbXBvcnRzOiBwYXJzZUludChgJHthbW91bnQudG9MYW1wb3J0cygpfWAsIFJBRElYKSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIudG9LZXlwYWlyKCkgOiBzaWduZXJzWzBdLnRvS2V5cGFpcigpO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKSxcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIGNyZWF0ZVdyYXBwZWROYXRpdmVBY2NvdW50LFxuICBjcmVhdGVNaW50LFxuICBjcmVhdGVUcmFuc2Zlckluc3RydWN0aW9uLFxuICBjcmVhdGVDbG9zZUFjY291bnRJbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5pbXBvcnQge1xuICBSZXN1bHQsXG4gIE5vZGUsXG4gIEluc3RydWN0aW9uLFxuICBkZWJ1Z0xvZyxcbiAgVHJ5LFxuICBQdWJrZXksXG4gIFNlY3JldCxcbn0gZnJvbSAnc2hhcmVkJztcbmltcG9ydCB7IEFzc29jaWF0ZWRBY2NvdW50IH0gZnJvbSAnLi4vYXNzb2NpYXRlZC1hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTb2xOYXRpdmUge1xuICBjb25zdCBSQURJWCA9IDEwO1xuXG4gIC8vIE5PVElDRTogVGhlcmUgaXMgYSBsYW1wb3J0cyBmbHVjdHVhdGlvbiB3aGVuIHRyYW5zZmVyIHVuZGVyIDAuMDAxIHNvbFxuICAvLyBmb3IgbXVsdGlTaWcgb25seSBmdW5jdGlvblxuICBleHBvcnQgY29uc3QgdHJhbnNmZXJXaXRoTXVsdGlzaWcgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IHNpZ25lcnNbMF07XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcbiAgICAgIGNvbnN0IHdyYXBwZWQgPSBhd2FpdCBjcmVhdGVXcmFwcGVkTmF0aXZlQWNjb3VudChcbiAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHBhcnNlSW50KGAke2Ftb3VudC50b0xhbXBvcnRzKCl9YCwgUkFESVgpLFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgd3JhcHBlZCBzb2w6ICcsIHdyYXBwZWQudG9CYXNlNTgoKSk7XG5cbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgY3JlYXRlTWludChcbiAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIDAsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLnRvU3RyaW5nKCksXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIHNvdXJjZVRva2VuOiAnLCBzb3VyY2VUb2tlbik7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLnRvU3RyaW5nKCksXG4gICAgICAgIHdyYXBwZWQudG9TdHJpbmcoKSxcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBkZXN0VG9rZW46ICcsIGRlc3RUb2tlbik7XG5cbiAgICAgIGNvbnN0IGluc3QxID0gY3JlYXRlVHJhbnNmZXJJbnN0cnVjdGlvbihcbiAgICAgICAgc291cmNlVG9rZW4udG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHBhcnNlSW50KGAke2Ftb3VudH1gLCBSQURJWCksIC8vIE5vIGxhbXBvcnRzLCBpdHMgc29sXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdDIgPSBjcmVhdGVDbG9zZUFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgd3JhcHBlZCxcbiAgICAgICAgZGVzdC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICAgIFtpbnN0MSwgaW5zdDJdLFxuICAgICAgICBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSksXG4gICAgICAgIGZlZVBheWVyPy50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU29sTmF0aXZlIGFzIEZpbmQgfSBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IHsgU29sTmF0aXZlIGFzIEZlZVBheWVyIH0gZnJvbSAnLi9mZWUtcGF5ZXItcGFydGlhbC1zaWduLXRyYW5zZmVyJztcbmltcG9ydCB7IFNvbE5hdGl2ZSBhcyBIaXN0b3J5IH0gZnJvbSAnLi9oaXN0b3J5JztcbmltcG9ydCB7IFNvbE5hdGl2ZSBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgU29sTmF0aXZlIGFzIFRyYW5zZmVyV2l0aE11bHRpc2lnIH0gZnJvbSAnLi90cmFuc2Zlci13aXRoLW11bHRpc2lnJztcblxuZXhwb3J0IGNvbnN0IFNvbE5hdGl2ZSA9IHtcbiAgLi4uRmluZCxcbiAgLi4uRmVlUGF5ZXIsXG4gIC4uLkhpc3RvcnksXG4gIC4uLlRyYW5zZmVyLFxuICAuLi5UcmFuc2ZlcldpdGhNdWx0aXNpZyxcbn07XG4iLCAiaW1wb3J0IHsgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBJbnN0cnVjdGlvbiwgVHJ5LCBQdWJrZXksIFNlY3JldCB9IGZyb20gJ3NoYXJlZCc7XG5pbXBvcnQgeyBBc3NvY2lhdGVkQWNjb3VudCB9IGZyb20gJy4uL2Fzc29jaWF0ZWQtYWNjb3VudCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBfQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBhZGQgPSBhc3luYyAoXG4gICAgdG9rZW46IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIHRvdGFsQW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSAhZmVlUGF5ZXIgPyBzaWduZXJzWzBdIDogZmVlUGF5ZXI7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgdG9rZW4sXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQXNzb2NpYXRlZC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBfQ2FsY3VsYXRlLmNhbGN1bGF0ZUFtb3VudCh0b3RhbEFtb3VudCwgbWludERlY2ltYWwpLFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAga2V5cGFpcnMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFtpbnN0XSwga2V5cGFpcnMsIHBheWVyLnRvS2V5cGFpcigpLCB0b2tlbik7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiLy9AaW50ZXJuYWxcbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlQW1vdW50ID0gKFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIGFtb3VudCAqIDEwICoqIG1pbnREZWNpbWFsO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIGNyZWF0ZUJ1cm5DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiwgUHVia2V5LCBSZXN1bHQsIFNlY3JldCwgVHJ5IH0gZnJvbSAnc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYnVybkFtb3VudDogbnVtYmVyLFxuICAgIHRva2VuRGVjaW1hbHM6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIudG9LZXlwYWlyKCkgOiBzaWduZXJzWzBdLnRvS2V5cGFpcigpO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgX0NhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQoYnVybkFtb3VudCwgdG9rZW5EZWNpbWFscyksXG4gICAgICAgIHRva2VuRGVjaW1hbHMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihbaW5zdF0sIGtleXBhaXJzLCBwYXllcik7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgZGVidWdMb2csIE5vZGUsIFB1YmtleSwgUmVzdWx0IH0gZnJvbSAnc2hhcmVkJztcbmltcG9ydCB7IEZpbmQsIE9uRXJyLCBPbk9rLCBTb3J0YWJsZSwgVG9rZW5NZXRhZGF0YSB9IGZyb20gJy4uL3R5cGVzLyc7XG5pbXBvcnQge1xuICBJbmZyYVNpZGVPdXRwdXQsXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICd0eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQ29udmVydGVyICB9IGZyb20gXCJjb252ZXJ0ZXJcIjtcbmltcG9ydCB7IFBkYSAgfSBmcm9tIFwiYWNjb3VudFwiO1xuaW1wb3J0IHsgTWV0YWRhdGEgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5pbXBvcnQgeyBUT0tFTl9QUk9HUkFNX0lEIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUGFyc2VkQWNjb3VudERhdGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IGZldGNoIGZyb20gJ2Nyb3NzLWZldGNoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGNvbnN0IFVOQUJMRV9FUlJPUl9SRUdFWCA9IC9VbmFibGUgdG8gZmluZCBNZXRhZGF0YSBhY2NvdW50LztcblxuICAvLyBTb3J0IGJ5IGxhdGVzdCB3aXRoIHVuaXh0aW1lc3RhbXAgZnVuY3Rpb25cbiAgY29uc3Qgc29ydEJ5VWluaXhUaW1lc3RhbXAgPVxuICAgIDxUIGV4dGVuZHMgVXNlclNpZGVPdXRwdXQuTmZ0TWV0YWRhdGEgfCBVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhPihcbiAgICAgIHNvcnRhYmxlOiBTb3J0YWJsZSxcbiAgICApID0+XG4gICAgKGE6IFQsIGI6IFQpOiBudW1iZXIgPT4ge1xuICAgICAgaWYgKCFhLm9mZmNoYWluLmNyZWF0ZWRfYXQpIHtcbiAgICAgICAgYS5vZmZjaGFpbi5jcmVhdGVkX2F0ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmICghYi5vZmZjaGFpbi5jcmVhdGVkX2F0KSB7XG4gICAgICAgIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoc29ydGFibGUgPT09IFNvcnRhYmxlLkRlc2MpIHtcbiAgICAgICAgcmV0dXJuIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGEub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH0gZWxzZSBpZiAoc29ydGFibGUgPT09IFNvcnRhYmxlLkFzYykge1xuICAgICAgICByZXR1cm4gYS5vZmZjaGFpbi5jcmVhdGVkX2F0IC0gYi5vZmZjaGFpbi5jcmVhdGVkX2F0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGIub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGEub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH1cbiAgICB9O1xuXG4gIGNvbnN0IGNvbnZlcnRlciA9IDxUPihcbiAgICB0b2tlblN0YW5kYXJkOiBVc2VyU2lkZUlucHV0LlRva2VuU3RhbmRhcmQsXG4gICAgbWV0YWRhdGE6IE1ldGFkYXRhLFxuICAgIGpzb246IEluZnJhU2lkZU91dHB1dC5PZmZjaGFpbixcbiAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICApOiBUID0+IHtcbiAgICBpZiAodG9rZW5TdGFuZGFyZCA9PT0gVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLkZ1bmdpYmxlKSB7XG4gICAgICByZXR1cm4gQ29udmVydGVyLlRva2VuTWV0YWRhdGEuaW50b1VzZXJTaWRlKFxuICAgICAgICB7XG4gICAgICAgICAgb25jaGFpbjogbWV0YWRhdGEsXG4gICAgICAgICAgb2ZmY2hhaW46IGpzb24sXG4gICAgICAgIH0sXG4gICAgICAgIHRva2VuQW1vdW50LFxuICAgICAgKSBhcyBUO1xuICAgIH0gZWxzZSBpZiAodG9rZW5TdGFuZGFyZCA9PT0gVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlKSB7XG4gICAgICByZXR1cm4gQ29udmVydGVyLk5mdE1ldGFkYXRhLmludG9Vc2VyU2lkZShcbiAgICAgICAge1xuICAgICAgICAgIG9uY2hhaW46IG1ldGFkYXRhLFxuICAgICAgICAgIG9mZmNoYWluOiBqc29uLFxuICAgICAgICB9LFxuICAgICAgICB0b2tlbkFtb3VudCxcbiAgICAgICkgYXMgVDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIHRva2VuU3RhbmRhcmQ6ICR7dG9rZW5TdGFuZGFyZH1gKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdlbmVyaWNGaW5kQnlPd25lciA9IGFzeW5jIDxcbiAgICBUIGV4dGVuZHMgVXNlclNpZGVPdXRwdXQuTmZ0TWV0YWRhdGEgfCBVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhLFxuICA+KFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgY2FsbGJhY2s6IChyZXN1bHQ6IFJlc3VsdDxUW10sIEVycm9yPikgPT4gdm9pZCxcbiAgICB0b2tlblN0YW5kYXJkOiBVc2VyU2lkZUlucHV0LlRva2VuU3RhbmRhcmQsXG4gICAgc29ydGFibGU/OiBTb3J0YWJsZSxcbiAgICBpc0hvbGRlcj86IGJvb2xlYW4sXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZGF0YTogVFtdID0gW107XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgY29ubmVjdGlvbi5nZXRQYXJzZWRUb2tlbkFjY291bnRzQnlPd25lcihcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAge1xuICAgICAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgfSxcbiAgICAgICk7XG5cbiAgICAgIGluZm8udmFsdWUubGVuZ3RoID09PSAwICYmIGNhbGxiYWNrKFJlc3VsdC5vayhbXSkpO1xuXG4gICAgICBmb3IgYXdhaXQgKGNvbnN0IGQgb2YgaW5mby52YWx1ZSkge1xuICAgICAgICBpZiAoaXNIb2xkZXIgJiYgZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8udG9rZW5BbW91bnQudWlBbW91bnQgPCAxKSB7XG4gICAgICAgICAgZGVidWdMb2coXG4gICAgICAgICAgICAnIyBmaW5kQnlPd25lciBubyBob2xkIG1ldGFkYXRhOiAnLFxuICAgICAgICAgICAgZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtaW50ID0gZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8ubWludCBhcyBQdWJrZXk7XG4gICAgICAgIGNvbnN0IHRva2VuQW1vdW50ID0gZC5hY2NvdW50LmRhdGEucGFyc2VkLmluZm8udG9rZW5BbW91bnRcbiAgICAgICAgICAuYW1vdW50IGFzIHN0cmluZztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgTWV0YWRhdGEuZnJvbUFjY291bnRBZGRyZXNzKFxuICAgICAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgICAgIFBkYS5nZXRNZXRhZGF0YShtaW50KSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGRlYnVnTG9nKCcjIGZpbmRCeU93bmVyIG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG4gICAgICAgICAgLy8gdG9rZW5TdGFuZGFyZDogMChORlQpIG9yIDIgKFNQTC1UT0tFTilcbiAgICAgICAgICBpZiAobWV0YWRhdGEudG9rZW5TdGFuZGFyZCAhPT0gdG9rZW5TdGFuZGFyZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZldGNoKG1ldGFkYXRhLmRhdGEudXJpKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgLmpzb24oKVxuICAgICAgICAgICAgICAgIC50aGVuKChqc29uOiBJbmZyYVNpZGVPdXRwdXQuT2ZmY2hhaW4pID0+IHtcbiAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChcbiAgICAgICAgICAgICAgICAgICAgY29udmVydGVyPFQ+KHRva2VuU3RhbmRhcmQsIG1ldGFkYXRhLCBqc29uLCB0b2tlbkFtb3VudCksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0Lm9rKGRhdGEpKTsgLy8gbmVlZCB0aGlzIGNhbGwgP1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NBbGdvID0gc29ydEJ5VWluaXhUaW1lc3RhbXA8VD4oU29ydGFibGUuRGVzYyk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhc2NBbGdvID0gc29ydEJ5VWluaXhUaW1lc3RhbXA8VD4oU29ydGFibGUuQXNjKTtcbiAgICAgICAgICAgICAgICAgIGlmIChzb3J0YWJsZSA9PT0gU29ydGFibGUuRGVzYykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5zb3J0KGRlc2NBbGdvKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc29ydGFibGUgPT09IFNvcnRhYmxlLkFzYykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5zb3J0KGFzY0FsZ28pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0Lm9rKGRhdGEpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IgJiYgVU5BQkxFX0VSUk9SX1JFR0VYLnRlc3QoZS5tZXNzYWdlKSkge1xuICAgICAgICAgICAgZGVidWdMb2coJyMgc2tpcCBlcnJvciBmb3Igb2xkIFNQTC1UT0tFTjogJywgbWludCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2VuZXJpY0ZpbmRCeU1pbnQgPSBhc3luYyA8XG4gICAgVCBleHRlbmRzIFVzZXJTaWRlT3V0cHV0Lk5mdE1ldGFkYXRhIHwgVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSxcbiAgPihcbiAgICBtaW50OiBQdWJrZXksXG4gICAgdG9rZW5TdGFuZGFyZDogVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLFxuICApOiBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuXG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IE1ldGFkYXRhLmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgY29ubmVjdGlvbixcbiAgICAgICAgUGRhLmdldE1ldGFkYXRhKG1pbnQpLFxuICAgICAgKTtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmRCeU1pbnQgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgIC8vIHRva2VuU3RhbmRhcmQ6IDAoTkZUKSBvciAyIChTUEwtVE9LRU4pXG4gICAgICBpZiAobWV0YWRhdGEudG9rZW5TdGFuZGFyZCAhPT0gdG9rZW5TdGFuZGFyZCkge1xuICAgICAgICB0aHJvdyBFcnJvcigndG9rZW4gc3RhbmRhcmRzIGFyZSBkaWZmZXJlbnQnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBjb25uZWN0aW9uLmdldFBhcnNlZEFjY291bnRJbmZvKG1pbnQudG9QdWJsaWNLZXkoKSk7XG4gICAgICBjb25zdCB0b2tlbkFtb3VudCA9IChpbmZvLnZhbHVlPy5kYXRhIGFzIFBhcnNlZEFjY291bnREYXRhKS5wYXJzZWQuaW5mb1xuICAgICAgICAuc3VwcGx5IGFzIHN0cmluZztcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSAoYXdhaXQgKFxuICAgICAgICBhd2FpdCBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICkuanNvbigpKSBhcyBJbmZyYVNpZGVPdXRwdXQuT2ZmY2hhaW47XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKFxuICAgICAgICBjb252ZXJ0ZXI8VD4odG9rZW5TdGFuZGFyZCwgbWV0YWRhdGEsIHJlc3BvbnNlLCB0b2tlbkFtb3VudCksXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUgYXMgRXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG93bmVyIFB1YmtleVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtPbk9rfSBvbk9rIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T25FcnJ9IG9uRXJyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7e3NvcnRhYmxlPzogU29ydGFibGUsIGlzSG9sZGVyPzogYm9vbGVhbn19IG9wdGlvbnM/XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb25PazogT25PazxGaW5kPixcbiAgICBvbkVycjogT25FcnIsXG4gICAgb3B0aW9ucz86IHsgc29ydGFibGU/OiBTb3J0YWJsZTsgaXNIb2xkZXI/OiBib29sZWFuIH0sXG4gICk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNvcnRhYmxlID0gIW9wdGlvbnM/LnNvcnRhYmxlID8gU29ydGFibGUuRGVzYyA6IG9wdGlvbnM/LnNvcnRhYmxlO1xuICAgIGNvbnN0IGlzSG9sZGVyID0gIW9wdGlvbnM/LmlzSG9sZGVyID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWZsb2F0aW5nLXByb21pc2VzICovXG4gICAgZ2VuZXJpY0ZpbmRCeU93bmVyPFRva2VuTWV0YWRhdGE+KFxuICAgICAgb3duZXIsXG4gICAgICAocmVzdWx0KSA9PiB7XG4gICAgICAgIHJlc3VsdC5tYXRjaCgob2spID0+IG9uT2sob2spLCBvbkVycik7XG4gICAgICB9LFxuICAgICAgVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLkZ1bmdpYmxlLFxuICAgICAgc29ydGFibGUsXG4gICAgICBpc0hvbGRlcixcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxUb2tlbk1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gYXdhaXQgZ2VuZXJpY0ZpbmRCeU1pbnQ8VG9rZW5NZXRhZGF0YT4oXG4gICAgICBtaW50LFxuICAgICAgVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLkZ1bmdpYmxlLFxuICAgICk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgSW5zdHJ1Y3Rpb24sXG4gIEtleXBhaXJBY2NvdW50LFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxuICBUcnksXG59IGZyb20gJ3NoYXJlZCc7XG5pbXBvcnQge1xuICBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICAvKipcbiAgICogRnJlZXppbmcgYSB0YXJnZXQgbmZ0XG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXI/ICAgICAgIC8vIGZlZSBwYXllclxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZyZWV6ZSA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZUFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5BY2NvdW50LFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG5ldyBLZXlwYWlyQWNjb3VudCh7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBOb2RlLFxuICBSZXN1bHQsXG4gIFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sXG4gIFRyeSxcbiAgUHVia2V5LFxuICBTZWNyZXQsXG59IGZyb20gJ3NoYXJlZCc7XG5cbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFzc29jaWF0ZWRBY2NvdW50IH0gZnJvbSAnLi4vYXNzb2NpYXRlZC1hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBmZWVQYXllclBhcnRpYWxTaWduVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgc291cmNlVG9rZW4gPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgbGV0IGluc3QyO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG5cbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXR1cm4gYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICBpZiAoIWRlc3RUb2tlbi5pbnN0KSB7XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIF9DYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgKTtcbiAgICAgICAgdHguYWRkKGluc3QyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldHVybiBpbnN0cnVjdGlvbiBhbmQgdW5kZWNpZGVkIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgICBpbnN0MiA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBkZXN0VG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBfQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgICAga2V5cGFpcnMsXG4gICAgICAgICk7XG4gICAgICAgIHR4LmFkZChkZXN0VG9rZW4uaW5zdCkuYWRkKGluc3QyKTtcbiAgICAgIH1cblxuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGtleXBhaXJzLmZvckVhY2goKHNpZ25lcikgPT4ge1xuICAgICAgICB0eC5wYXJ0aWFsU2lnbihzaWduZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25JbnN0cnVjdGlvbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tIFwiQHNvbGFuYS9zcGwtdG9rZW5cIjtcbmltcG9ydCB7IGRlYnVnTG9nLCBOb2RlLCBQdWJrZXkgfSBmcm9tIFwic2hhcmVkXCI7XG5pbXBvcnQge1xuICBGaWx0ZXJUeXBlLFxuICBIaXN0b3J5LFxuICBIaXN0b3J5T3B0aW9ucyxcbiAgTW9kdWxlTmFtZSxcbiAgT25FcnIsXG4gIE9uT2ssXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tIFwiLi4vdHlwZXMvXCI7XG5pbXBvcnQgeyBTaWduYXR1cmVzIH0gZnJvbSBcIi4uL3NpZ25hdHVyZXNcIjtcbmltcG9ydCB7IFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSBcIi4uL3RyYW5zYWN0aW9uLWZpbHRlclwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGdldEhpc3RvcnkgPSBhc3luYyAoXG4gICAgdGFyZ2V0OiBQdWJrZXksXG4gICAgZmlsdGVyVHlwZTogRmlsdGVyVHlwZSxcbiAgICBvbk9rOiBPbk9rPEhpc3Rvcnk+LFxuICAgIG9uRXJyOiBPbkVycixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEhpc3RvcnlPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVmYXVsdFZhbHVlczogSGlzdG9yeU9wdGlvbnMgPSB7XG4gICAgICAgIHdhaXRUaW1lOiAwLjAzLFxuICAgICAgICBuYXJyb3dEb3duOiAxMDAsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IHsgLi4uZGVmYXVsdFZhbHVlcywgLi4ub3B0aW9ucyB9O1xuICAgICAgaWYgKGZpbHRlclR5cGUgPT09IEZpbHRlclR5cGUuTWVtbykge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBUcmFuc2FjdGlvbkZpbHRlci5wYXJzZShmaWx0ZXJUeXBlLCBNb2R1bGVOYW1lLlNwbFRva2VuKTtcbiAgICAgICAgYXdhaXQgU2lnbmF0dXJlcy5nZXRGb3JBZHJlc3MoXG4gICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgIHBhcnNlcixcbiAgICAgICAgICAocmVzdWx0KSA9PiByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgICAgIG1lcmdlZE9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0b2tlbkFjY291bnRzID1cbiAgICAgICAgICBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRQYXJzZWRUb2tlbkFjY291bnRzQnlPd25lcihcbiAgICAgICAgICAgIHRhcmdldC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgY29uc3Qgc3RvcmVkSGlzdG9yaWVzOiBVc2VyU2lkZU91dHB1dC5IaXN0b3J5W10gPSBbXTtcbiAgICAgICAgZGVidWdMb2coXCIjIHRva2VuQWNjb3VudHMgc2l6ZTogXCIsIHRva2VuQWNjb3VudHMudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgZm9yIChjb25zdCBhY2NvdW50IG9mIHRva2VuQWNjb3VudHMudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBwYXJzZXIgPSBUcmFuc2FjdGlvbkZpbHRlci5wYXJzZShcbiAgICAgICAgICAgIGZpbHRlclR5cGUsXG4gICAgICAgICAgICBNb2R1bGVOYW1lLlNwbFRva2VuLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYXdhaXQgU2lnbmF0dXJlcy5nZXRGb3JBZHJlc3MoXG4gICAgICAgICAgICBhY2NvdW50LnB1YmtleS50b1N0cmluZygpLFxuICAgICAgICAgICAgcGFyc2VyLFxuICAgICAgICAgICAgKHJlc3VsdCkgPT4gcmVzdWx0Lm1hdGNoKG9uT2ssIG9uRXJyKSxcbiAgICAgICAgICAgIG1lcmdlZE9wdGlvbnMsXG4gICAgICAgICAgICBzdG9yZWRIaXN0b3JpZXMsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgb25FcnIoZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIEF1dGhvcml0eVR5cGUsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uLFxuICBjcmVhdGVTZXRBdXRob3JpdHlJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQsXG4gIE1JTlRfU0laRSxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5pbXBvcnQge1xuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBLZXlwYWlyQWNjb3VudCxcbiAgTWludEluc3RydWN0aW9uLFxuICBOb2RlLFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxuICBUcnksXG59IGZyb20gJ3NoYXJlZCc7XG5cbmltcG9ydCB7IFVzZXJTaWRlSW5wdXQgfSBmcm9tICd0eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUGRhIH0gZnJvbSAnYWNjb3VudCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICdjb252ZXJ0ZXInO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSAndmFsaWRhdG9yJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZUZyZWV6ZUF1dGhvcml0eSA9IChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFB1YmxpY0tleSxcbiAgKTogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgQXV0aG9yaXR5VHlwZS5GcmVlemVBY2NvdW50LFxuICAgICAgZnJlZXplQXV0aG9yaXR5LFxuICAgICk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMgPSBhc3luYyAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIHRva2VuTWV0YWRhdGE6IERhdGFWMixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICAgIGlzTXV0YWJsZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uW10+ID0+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgbGFtcG9ydHMgPSBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pO1xuICAgIGNvbnN0IG1ldGFkYXRhUGRhID0gUGRhLmdldE1ldGFkYXRhKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuXG4gICAgY29uc3QgaW5zdDEgPSBTeXN0ZW1Qcm9ncmFtLmNyZWF0ZUFjY291bnQoe1xuICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICBuZXdBY2NvdW50UHVia2V5OiBtaW50LFxuICAgICAgc3BhY2U6IE1JTlRfU0laRSxcbiAgICAgIGxhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGluc3QyID0gY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihcbiAgICAgIG1pbnQsXG4gICAgICBtaW50RGVjaW1hbCxcbiAgICAgIG93bmVyLFxuICAgICAgb3duZXIsXG4gICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICk7XG5cbiAgICBjb25zdCBpbnN0MyA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgIGZlZVBheWVyLFxuICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgb3duZXIsXG4gICAgICBtaW50LFxuICAgICk7XG5cbiAgICBjb25zdCBpbnN0NCA9IGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgIG1pbnQsXG4gICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICBvd25lcixcbiAgICAgIF9DYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICBtaW50RGVjaW1hbCxcbiAgICApO1xuXG4gICAgY29uc3QgaW5zdDUgPSBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAge1xuICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGFQZGEsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG1pbnRBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICBkYXRhOiB0b2tlbk1ldGFkYXRhLFxuICAgICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogbnVsbCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICByZXR1cm4gW2luc3QxLCBpbnN0MiwgaW5zdDMsIGluc3Q0LCBpbnN0NV07XG4gIH07XG5cbiAgLyoqXG4gICAqIFNQTC1UT0tFTiBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAvLyB0b2tlbiBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gc2lnbmVyICAgICAgLy8gdG9rZW4gb3duZXIgU2VjcmV0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbEFtb3VudCAvLyB0b3RhbCBudW1iZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbnREZWNpbWFsIC8vIHRva2VuIGRlY2ltYWxcbiAgICogQHBhcmFtIHtQdWJrZXl9IGlucHV0ICAgICAgIC8vIHRva2VuIG1ldGFkYXRhXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAvLyBmZWUgcGF5ZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZyZWV6ZUF1dGhvcml0eT8gLy8gZnJlZXplIGF1dGhvcml0eVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRJbnN0cnVjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXI6IFNlY3JldCxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5NZXRhZGF0YSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICBmcmVlemVBdXRob3JpdHk/OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxVc2VyU2lkZUlucHV0LlRva2VuTWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyO1xuICAgICAgaW5wdXQucm95YWx0eSA9IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IDA7XG5cbiAgICAgIGNvbnN0IHRva2VuU3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0IGFzIFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgICAgIGlucHV0LnJveWFsdHksXG4gICAgICApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBjb25zdCBjcmVhdGVkQXQgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgICB0b2tlblN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gY3JlYXRlZEF0O1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWRNZXRhQW5kQ29udGVudChcbiAgICAgICAgICB0b2tlblN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBpbnB1dC5zdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIHVyaSA9IGlucHV0LnVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKFwiTXVzdCBzZXQgJ3N0b3JhZ2VUeXBlICsgZmlsZVBhdGgnIG9yICd1cmknXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc011dGFibGUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0ZXIuVG9rZW5NZXRhZGF0YS5pbnRvSW5mcmFTaWRlKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXJpKTtcblxuICAgICAgY29uc3QgbWludCA9IEtleXBhaXJBY2NvdW50LmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBjcmVhdGVNaW50SW5zdHJ1Y3Rpb25zKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRvdGFsQW1vdW50LFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZUZyZWV6ZUF1dGhvcml0eShcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IE1pbnRJbnN0cnVjdGlvbihcbiAgICAgICAgaW5zdHMsXG4gICAgICAgIFtzaWduZXIudG9LZXlwYWlyKCksIG1pbnQudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgbWludC5wdWJrZXksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIEtleXBhaXJBY2NvdW50LFxuICBJbnN0cnVjdGlvbixcbiAgUHVia2V5LFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdzaGFyZWQnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICovXG4gIGV4cG9ydCBjb25zdCB0aGF3ID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPiA9PiB7XG4gICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEtleXBhaXJBY2NvdW50KHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCwgSW5zdHJ1Y3Rpb24sIFRyeSwgUHVia2V5LCBTZWNyZXQgfSBmcm9tICdzaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgX0NhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQXNzb2NpYXRlZEFjY291bnQgfSBmcm9tICcuLi9hc3NvY2lhdGVkLWFjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICBhbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBzaWduZXJzWzBdO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IHNvdXJjZVRva2VuID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQucmV0cnlHZXRPckNyZWF0ZShcbiAgICAgICAgbWludCxcbiAgICAgICAgZGVzdCxcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgIHNvdXJjZVRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGVzdFRva2VuLnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIF9DYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihbaW5zdF0sIGtleXBhaXJzLCBwYXllci50b0tleXBhaXIoKSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU3BsVG9rZW4gYXMgQWRkIH0gZnJvbSAnLi9hZGQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgQnVybiB9IGZyb20gJy4vYnVybic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZyZWV6ZSB9IGZyb20gJy4vZnJlZXplJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEZlZVBheWVyIH0gZnJvbSAnLi9mZWUtcGF5ZXItcGFydGlhbC1zaWduLXRyYW5zZmVyJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEhpc3RvcnkgfSBmcm9tICcuL2hpc3RvcnknO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUaGF3IH0gZnJvbSAnLi90aGF3JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5cbmV4cG9ydCBjb25zdCBTcGxUb2tlbiA9IHtcbiAgLi4uQWRkLFxuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkZlZVBheWVyLFxuICAuLi5IaXN0b3J5LFxuICAuLi5NaW50LFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxNQUFjLFVBQVUsV0FBbUI7QUFF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O0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQ0w7IiwKICAibmFtZXMiOiBbIkFpcmRyb3AiLCAiZGVidWdMb2ciLCAiTm9kZSIsICJBc3NvY2lhdGVkQWNjb3VudCIsICJJbnN0cnVjdGlvbiIsICJNZW1vIiwgIlNvcnRhYmxlIiwgIkZpbHRlclR5cGUiLCAiTW9kdWxlTmFtZSIsICJDb252ZXJ0IiwgIk1lbW8iLCAiY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUiLCAiQ29udmVydCIsICJNaW50IiwgImNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIiwgIkNvbnZlcnQiLCAiVHJhbnNmZXIiLCAiY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUiLCAiQ29udmVydCIsICJUcmFuc2ZlckNoZWNrZWQiLCAiZGVidWdMb2ciLCAiVHJhbnNhY3Rpb25GaWx0ZXIiLCAiaW5zdHJ1Y3Rpb24iLCAiQ29udmVydCIsICJkZWJ1Z0xvZyIsICJOb2RlIiwgIlJlc3VsdCIsICJzbGVlcCIsICJTaWduYXR1cmVzIiwgIk1lbW8iLCAiTWVtbyIsICJOb2RlIiwgIkluc3RydWN0aW9uIiwgIlRyeSIsICJLZXlwYWlyIiwgIlRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24iLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJNdWx0aXNpZyIsICJNdWx0aXNpZyIsICJUcnkiLCAiS2V5cGFpciIsICJOb2RlIiwgIkluc3RydWN0aW9uIiwgIk5vZGUiLCAiVHJ5IiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiUHVibGljS2V5IiwgIk11bHRpc2lnIiwgIlRyeSIsICJOb2RlIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiUHVibGljS2V5IiwgIlRyeSIsICJNdWx0aXNpZyIsICJUcnkiLCAiTXVsdGlzaWciLCAiTm9kZSIsICJUcnkiLCAiU29sTmF0aXZlIiwgIlRyeSIsICJOb2RlIiwgIlN5c3RlbVByb2dyYW0iLCAiTm9kZSIsICJUcnkiLCAiU29sTmF0aXZlIiwgIlNvbE5hdGl2ZSIsICJTeXN0ZW1Qcm9ncmFtIiwgIkluc3RydWN0aW9uIiwgIlRyeSIsICJTb2xOYXRpdmUiLCAiTm9kZSIsICJJbnN0cnVjdGlvbiIsICJkZWJ1Z0xvZyIsICJUcnkiLCAiU29sTmF0aXZlIiwgIlRyeSIsICJOb2RlIiwgImRlYnVnTG9nIiwgIkluc3RydWN0aW9uIiwgIlNvbE5hdGl2ZSIsICJJbnN0cnVjdGlvbiIsICJUcnkiLCAiU3BsVG9rZW4iLCAiU3BsVG9rZW4iLCAiVHJ5IiwgIkluc3RydWN0aW9uIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIkluc3RydWN0aW9uIiwgIlRyeSIsICJTcGxUb2tlbiIsICJUcnkiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiSW5zdHJ1Y3Rpb24iLCAiZGVidWdMb2ciLCAiTm9kZSIsICJSZXN1bHQiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJTcGxUb2tlbiIsICJOb2RlIiwgIlJlc3VsdCIsICJkZWJ1Z0xvZyIsICJJbnN0cnVjdGlvbiIsICJLZXlwYWlyQWNjb3VudCIsICJUcnkiLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiU3BsVG9rZW4iLCAiVHJhbnNhY3Rpb24iLCAiTm9kZSIsICJQYXJ0aWFsU2lnbkluc3RydWN0aW9uIiwgIlRyeSIsICJTcGxUb2tlbiIsICJUcnkiLCAiTm9kZSIsICJUcmFuc2FjdGlvbiIsICJQYXJ0aWFsU2lnbkluc3RydWN0aW9uIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiZGVidWdMb2ciLCAiTm9kZSIsICJTcGxUb2tlbiIsICJOb2RlIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiZGVidWdMb2ciLCAiU3lzdGVtUHJvZ3JhbSIsICJjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiZGVidWdMb2ciLCAiS2V5cGFpckFjY291bnQiLCAiTm9kZSIsICJUcnkiLCAiUGRhIiwgIkNvbnZlcnRlciIsICJTcGxUb2tlbiIsICJtaW50IiwgIk5vZGUiLCAiUGRhIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlN5c3RlbVByb2dyYW0iLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIiwgIlRyeSIsICJDb252ZXJ0ZXIiLCAiZGVidWdMb2ciLCAiS2V5cGFpckFjY291bnQiLCAiS2V5cGFpckFjY291bnQiLCAiSW5zdHJ1Y3Rpb24iLCAiVHJ5IiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlNwbFRva2VuIiwgImNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIiwgIkluc3RydWN0aW9uIiwgIlRyeSIsICJTcGxUb2tlbiIsICJUcnkiLCAiY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24iLCAiSW5zdHJ1Y3Rpb24iLCAiU3BsVG9rZW4iXQp9Cg==