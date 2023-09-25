var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/metaplex/mint.ts
import { Transaction } from "@solana/web3.js";
import { Metaplex } from "@solana-suite/nft";
import { Storage } from "storage";
import {
  debugLog,
  KeypairAccount,
  Node,
  Try
} from "@solana-suite/shared";
import {
  Convert,
  Royalty,
  Validator
} from "shared-metaplex";
var PhantomMetaplex;
((PhantomMetaplex2) => {
  PhantomMetaplex2.mint = (input, cluster, phantom) => __async(void 0, null, function* () {
    return Try(() => __async(void 0, null, function* () {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      if (!input.filePath || !input.storageType) {
        throw Error("Not found filePath or storageType");
      }
      Node.changeConnection({ cluster });
      const properties = yield Convert.Properties.intoInfraSide(
        input.properties,
        Storage.uploadContent,
        input.storageType
      );
      const sellerFeeBasisPoints = Royalty.convert(input.royalty);
      const nftStorageMetadata = Storage.toConvertOffchaindata(
        __spreadProps(__spreadValues({}, input), { properties }),
        sellerFeeBasisPoints
      );
      const uploaded = yield Storage.uploadMetaAndContent(
        nftStorageMetadata,
        input.filePath,
        input.storageType
      );
      if (uploaded.isErr) {
        throw uploaded;
      }
      const uri = uploaded.value;
      const datav2 = Convert.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      const connection = Node.getConnection();
      const mint2 = KeypairAccount.create();
      const isMutable = true;
      debugLog("# properties: ", properties);
      debugLog("# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      debugLog("# mint: ", mint2.pubkey);
      const tx = new Transaction();
      const insts = yield Metaplex.createMintInstructions(
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
      const blockhashObj = yield connection.getLatestBlockhashAndContext();
      tx.recentBlockhash = blockhashObj.value.blockhash;
      tx.partialSign(mint2.toKeypair());
      const signed = yield phantom.signTransaction(tx);
      debugLog(
        "# signed, signed.signatures: ",
        signed,
        signed.signatures.map((sig2) => sig2.publicKey.toString())
      );
      const sig = yield connection.sendRawTransaction(signed.serialize());
      yield Node.confirmedSig(sig);
      return mint2.pubkey;
    }));
  });
})(PhantomMetaplex || (PhantomMetaplex = {}));

// src/metaplex/index.ts
var Metaplex2 = __spreadValues({}, PhantomMetaplex);

// src/spl-token/add.ts
import {
  TOKEN_PROGRAM_ID,
  createMintToCheckedInstruction
} from "@solana/spl-token";
import { Transaction as Transaction2 } from "@solana/web3.js";
import { Node as Node2, Try as Try2 } from "@solana-suite/shared";
import { AssociatedAccount } from "@solana-suite/core";
var PhantomSplToken;
((PhantomSplToken4) => {
  PhantomSplToken4.add = (tokenKey, owner, cluster, totalAmount, mintDecimal, phantom) => __async(void 0, null, function* () {
    return Try2(() => __async(void 0, null, function* () {
      Node2.changeConnection({ cluster });
      const connection = Node2.getConnection();
      const transaction = new Transaction2();
      const makeInstruction = yield AssociatedAccount.makeOrCreateInstruction(
        tokenKey,
        owner
      );
      transaction.add(makeInstruction.inst);
      transaction.add(
        createMintToCheckedInstruction(
          tokenKey.toPublicKey(),
          makeInstruction.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          totalAmount,
          mintDecimal,
          [],
          TOKEN_PROGRAM_ID
        )
      );
      transaction.feePayer = owner.toPublicKey();
      const blockhashObj = yield connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;
      const signed = yield phantom.signAllTransactions([transaction]);
      for (const sign of signed) {
        const sig = yield connection.sendRawTransaction(sign.serialize());
        yield Node2.confirmedSig(sig);
      }
      return tokenKey;
    }));
  });
})(PhantomSplToken || (PhantomSplToken = {}));

// src/spl-token/mint.ts
import { Keypair, Transaction as Transaction3 } from "@solana/web3.js";
import { debugLog as debugLog2, Node as Node3, Try as Try3 } from "@solana-suite/shared";
import { Storage as Storage2 } from "storage";
import { SplToken } from "@solana-suite/core";
import { Convert as Convert2 } from "shared-metaplex";
var PhantomSplToken2;
((PhantomSplToken4) => {
  PhantomSplToken4.mint = (input, owner, cluster, totalAmount, mintDecimal, phantom) => __async(void 0, null, function* () {
    return Try3(() => __async(void 0, null, function* () {
      Node3.changeConnection({ cluster });
      const connection = Node3.getConnection();
      const transaction = new Transaction3();
      const mint2 = Keypair.generate();
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const tokenStorageMetadata = Storage2.toConvertOffchaindata(
        input,
        input.royalty
      );
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = yield Storage2.uploadMetaAndContent(
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
      const datav2 = Convert2.TokenMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      debugLog2("# datav2: ", datav2);
      debugLog2("# upload content url: ", uri);
      const insturctions = yield SplToken.createMintInstructions(
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
      const blockhashObj = yield connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;
      transaction.partialSign(mint2);
      const signed = yield phantom.signTransaction(transaction);
      debugLog2(
        "# signed, signed.signatures: ",
        signed,
        signed.signatures.map((sig2) => sig2.publicKey.toString())
      );
      const sig = yield connection.sendRawTransaction(signed.serialize());
      yield Node3.confirmedSig(sig);
      return mint2.publicKey.toString();
    }));
  });
})(PhantomSplToken2 || (PhantomSplToken2 = {}));

// src/spl-token/index.ts
var PhantomSplToken3 = __spreadValues(__spreadValues({}, PhantomSplToken), PhantomSplToken2);
export {
  Metaplex2 as Metaplex,
  PhantomSplToken3 as PhantomSplToken
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21ldGFwbGV4L21pbnQudHMiLCAiLi4vc3JjL21ldGFwbGV4L2luZGV4LnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vYWRkLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vbWludC50cyIsICIuLi9zcmMvc3BsLXRva2VuL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBNZXRhcGxleCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvbmZ0JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICdzdG9yYWdlJztcbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBLZXlwYWlyQWNjb3VudCxcbiAgTm9kZSxcbiAgUmVzdWx0LFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7XG4gIENvbnZlcnQsXG4gIFJveWFsdHksXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFZhbGlkYXRvcixcbiAgVmFsaWRhdG9yRXJyb3IsXG59IGZyb20gJ3NoYXJlZC1tZXRhcGxleCc7XG5pbXBvcnQgeyBQaGFudG9tIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFBoYW50b21NZXRhcGxleCB7XG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgTkZUIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhfSAgaW5wdXRcbiAgICogQHBhcmFtIHtQaGFudG9tfSBwaGFudG9tICAgICAgICBwaGFudG9tIHdhbGxldCBvYmplY3RcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgY2x1c3Rlcjogc3RyaW5nLFxuICAgIHBoYW50b206IFBoYW50b20sXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3IgfCBWYWxpZGF0b3JFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpbnB1dC5maWxlUGF0aCB8fCAhaW5wdXQuc3RvcmFnZVR5cGUpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBmaWxlUGF0aCBvciBzdG9yYWdlVHlwZScpO1xuICAgICAgfVxuXG4gICAgICBOb2RlLmNoYW5nZUNvbm5lY3Rpb24oeyBjbHVzdGVyIH0pO1xuXG4gICAgICAvL0NvbnZlcnQgcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnRcbiAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0LlByb3BlcnRpZXMuaW50b0luZnJhU2lkZShcbiAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgU3RvcmFnZS51cGxvYWRDb250ZW50LFxuICAgICAgICBpbnB1dC5zdG9yYWdlVHlwZSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gUm95YWx0eS5jb252ZXJ0KGlucHV0LnJveWFsdHkpO1xuICAgICAgY29uc3QgbmZ0U3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIHsgLi4uaW5wdXQsIHByb3BlcnRpZXMgfSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZE1ldGFBbmRDb250ZW50KFxuICAgICAgICBuZnRTdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICBpbnB1dC5zdG9yYWdlVHlwZSxcbiAgICAgICk7XG5cbiAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuXG4gICAgICBjb25zdCBkYXRhdjIgPSBDb252ZXJ0Lk5mdE1ldGFkYXRhLmludG9JbmZyYVNpZGUoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgbWludCA9IEtleXBhaXJBY2NvdW50LmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaXNNdXRhYmxlID0gdHJ1ZTtcblxuICAgICAgZGVidWdMb2coJyMgcHJvcGVydGllczogJywgcHJvcGVydGllcyk7XG4gICAgICBkZWJ1Z0xvZygnIyBzZWxsZXJGZWVCYXNpc1BvaW50czogJywgc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgZGVidWdMb2coJyMgbWludDogJywgbWludC5wdWJrZXkpO1xuXG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbigpO1xuXG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IE1ldGFwbGV4LmNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgcGhhbnRvbS5wdWJsaWNLZXksXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgcGhhbnRvbS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIGluc3RzLmZvckVhY2goKGluc3Q6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24pID0+IHtcbiAgICAgICAgdHguYWRkKGluc3QpO1xuICAgICAgfSk7XG4gICAgICB0eC5mZWVQYXllciA9IHBoYW50b20ucHVibGljS2V5O1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgY29ubmVjdGlvbi5nZXRMYXRlc3RCbG9ja2hhc2hBbmRDb250ZXh0KCk7XG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmoudmFsdWUuYmxvY2toYXNoO1xuICAgICAgdHgucGFydGlhbFNpZ24obWludC50b0tleXBhaXIoKSk7XG4gICAgICBjb25zdCBzaWduZWQgPSBhd2FpdCBwaGFudG9tLnNpZ25UcmFuc2FjdGlvbih0eCk7XG4gICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgJyMgc2lnbmVkLCBzaWduZWQuc2lnbmF0dXJlczogJyxcbiAgICAgICAgc2lnbmVkLFxuICAgICAgICBzaWduZWQuc2lnbmF0dXJlcy5tYXAoKHNpZykgPT4gc2lnLnB1YmxpY0tleS50b1N0cmluZygpKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBzaWcgPSBhd2FpdCBjb25uZWN0aW9uLnNlbmRSYXdUcmFuc2FjdGlvbihzaWduZWQuc2VyaWFsaXplKCkpO1xuICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcoc2lnKTtcbiAgICAgIHJldHVybiBtaW50LnB1YmtleTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQaGFudG9tTWV0YXBsZXggYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5cbmV4cG9ydCBjb25zdCBNZXRhcGxleCA9IHsuLi5NaW50fTtcbiIsICJpbXBvcnQge1xuICBUT0tFTl9QUk9HUkFNX0lELFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb24sIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBOb2RlLCBQdWJrZXksIFJlc3VsdCwgVHJ5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5pbXBvcnQgeyBBc3NvY2lhdGVkQWNjb3VudCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29yZSc7XG5pbXBvcnQgeyBQaGFudG9tIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFBoYW50b21TcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBhZGQgPSBhc3luYyAoXG4gICAgdG9rZW5LZXk6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNsdXN0ZXI6IHN0cmluZyxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgcGhhbnRvbTogUGhhbnRvbVxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgTm9kZS5jaGFuZ2VDb25uZWN0aW9uKHsgY2x1c3RlciB9KTtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgIGNvbnN0IG1ha2VJbnN0cnVjdGlvbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50Lm1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbktleSxcbiAgICAgICAgb3duZXJcbiAgICAgICk7XG4gICAgICB0cmFuc2FjdGlvbi5hZGQobWFrZUluc3RydWN0aW9uLmluc3QgYXMgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbik7XG4gICAgICB0cmFuc2FjdGlvbi5hZGQoXG4gICAgICAgIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgICAgICB0b2tlbktleS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1ha2VJbnN0cnVjdGlvbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHRvdGFsQW1vdW50LFxuICAgICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICAgIFtdLFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSURcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSBvd25lci50b1B1YmxpY0tleSgpO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgY29ubmVjdGlvbi5nZXRMYXRlc3RCbG9ja2hhc2hBbmRDb250ZXh0KCk7XG4gICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmoudmFsdWUuYmxvY2toYXNoO1xuXG4gICAgICBjb25zdCBzaWduZWQgPSBhd2FpdCBwaGFudG9tLnNpZ25BbGxUcmFuc2FjdGlvbnMoW3RyYW5zYWN0aW9uXSk7XG5cbiAgICAgIC8vIHRvZG86IHJlZmFjdG9yaW5nXG4gICAgICBmb3IgKGNvbnN0IHNpZ24gb2Ygc2lnbmVkKSB7XG4gICAgICAgIGNvbnN0IHNpZyA9IGF3YWl0IGNvbm5lY3Rpb24uc2VuZFJhd1RyYW5zYWN0aW9uKHNpZ24uc2VyaWFsaXplKCkpO1xuICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhzaWcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuS2V5O1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXIsIFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgZGVidWdMb2csIE5vZGUsIFB1YmtleSwgUmVzdWx0LCBUcnkgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnc3RvcmFnZSc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29yZSc7XG5pbXBvcnQgeyBQaGFudG9tIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29udmVydCwgVXNlclNpZGVJbnB1dCB9IGZyb20gJ3NoYXJlZC1tZXRhcGxleCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGhhbnRvbVNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5NZXRhZGF0YSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNsdXN0ZXI6IHN0cmluZyxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgcGhhbnRvbTogUGhhbnRvbSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXIgfSk7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgY29uc3QgbWludCA9IEtleXBhaXIuZ2VuZXJhdGUoKTtcblxuICAgICAgaW5wdXQucm95YWx0eSA9IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IDA7XG4gICAgICBjb25zdCB0b2tlblN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCBhcyBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgICAgICBpbnB1dC5yb3lhbHR5LFxuICAgICAgKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCAmJiBpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkTWV0YUFuZENvbnRlbnQoXG4gICAgICAgICAgdG9rZW5TdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICB1cmkgPSBpbnB1dC51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgJ3N0b3JhZ2VUeXBlICsgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnQuVG9rZW5NZXRhZGF0YS5pbnRvSW5mcmFTaWRlKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXJpKTtcblxuICAgICAgY29uc3QgaW5zdHVyY3Rpb25zID0gYXdhaXQgU3BsVG9rZW4uY3JlYXRlTWludEluc3RydWN0aW9ucyhcbiAgICAgICAgbWludC5wdWJsaWNLZXksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRvdGFsQW1vdW50LFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICBpbnN0dXJjdGlvbnMuZm9yRWFjaCgoaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbikgPT5cbiAgICAgICAgdHJhbnNhY3Rpb24uYWRkKGluc3QpLFxuICAgICAgKTtcbiAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gb3duZXIudG9QdWJsaWNLZXkoKTtcbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoQW5kQ29udGV4dCgpO1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLnZhbHVlLmJsb2NraGFzaDtcbiAgICAgIHRyYW5zYWN0aW9uLnBhcnRpYWxTaWduKG1pbnQpO1xuICAgICAgY29uc3Qgc2lnbmVkID0gYXdhaXQgcGhhbnRvbS5zaWduVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIHNpZ25lZCwgc2lnbmVkLnNpZ25hdHVyZXM6ICcsXG4gICAgICAgIHNpZ25lZCxcbiAgICAgICAgc2lnbmVkLnNpZ25hdHVyZXMubWFwKChzaWcpID0+IHNpZy5wdWJsaWNLZXkudG9TdHJpbmcoKSksXG4gICAgICApO1xuICAgICAgY29uc3Qgc2lnID0gYXdhaXQgY29ubmVjdGlvbi5zZW5kUmF3VHJhbnNhY3Rpb24oc2lnbmVkLnNlcmlhbGl6ZSgpKTtcbiAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKHNpZyk7XG4gICAgICByZXR1cm4gbWludC5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQaGFudG9tU3BsVG9rZW4gYXMgQWRkIH0gZnJvbSAnLi9hZGQnO1xuaW1wb3J0IHsgUGhhbnRvbVNwbFRva2VuIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuXG5leHBvcnQgY29uc3QgUGhhbnRvbVNwbFRva2VuID0ge1xuICAu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LFlBQVk7QUFDekMsWUFBTSxlQUFlLE1BQU0sV0FBVyw2QkFBNkI7QUFDbkUsa0JBQVksa0JBQWtCLGFBQWEsTUFBTTtBQUNqRCxrQkFBWSxZQUFZQSxLQUFJO0FBQzVCLFlBQU0sU0FBUyxNQUFNLFFBQVEsZ0JBQWdCLFdBQVc7QUFDeEQsTUFBQUc7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFFBQ0EsT0FBTyxXQUFXLElBQUksQ0FBQ0MsU0FBUUEsS0FBSSxVQUFVLFNBQVMsQ0FBQztBQUFBLE1BQ3pEO0FBQ0EsWUFBTSxNQUFNLE1BQU0sV0FBVyxtQkFBbUIsT0FBTyxVQUFVLENBQUM7QUFDbEUsWUFBTU4sTUFBSyxhQUFhLEdBQUc7QUFDM0IsYUFBT0UsTUFBSyxVQUFVLFNBQVM7QUFBQSxJQUNqQyxFQUFDO0FBQUEsRUFDSDtBQUFBLEdBOUVlSix3Q0FBQTs7O0FDTFYsSUFBTVMsbUJBQWtCLGtDQUMxQixrQkFDQUE7IiwKICAibmFtZXMiOiBbIlBoYW50b21NZXRhcGxleCIsICJtaW50IiwgInNpZyIsICJNZXRhcGxleCIsICJUcmFuc2FjdGlvbiIsICJOb2RlIiwgIlRyeSIsICJQaGFudG9tU3BsVG9rZW4iLCAiVHJ5IiwgIk5vZGUiLCAiVHJhbnNhY3Rpb24iLCAiVHJhbnNhY3Rpb24iLCAiZGVidWdMb2ciLCAiTm9kZSIsICJUcnkiLCAiU3RvcmFnZSIsICJDb252ZXJ0IiwgIlBoYW50b21TcGxUb2tlbiIsICJUcnkiLCAiTm9kZSIsICJUcmFuc2FjdGlvbiIsICJtaW50IiwgIlN0b3JhZ2UiLCAiQ29udmVydCIsICJkZWJ1Z0xvZyIsICJzaWciLCAiUGhhbnRvbVNwbFRva2VuIl0KfQo=