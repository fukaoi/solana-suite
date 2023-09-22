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

// ../internals/storage/dist/index.mjs
import { toMetaplexFile } from "@metaplex-foundation/js";
import {
  debugLog,
  isBrowser,
  isNode,
  Try
} from "@solana-suite/shared";
import {
  Metaplex as MetaplexFoundation,
  keypairIdentity,
  bundlrStorage,
  walletAdapterIdentity
} from "@metaplex-foundation/js";
import { Node, Constants } from "@solana-suite/shared";
import { NFTStorage, Blob } from "nft.storage";
import {
  Constants as Constants2,
  isNode as isNode2,
  isBrowser as isBrowser2,
  debugLog as debugLog2,
  Try as Try2
} from "@solana-suite/shared";
import { toMetaplexFile as toMetaplexFile2 } from "@metaplex-foundation/js";
var __async2 = (__this, __arguments, generator) => {
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
var Bundlr;
((Bundlr2) => {
  const BUNDLR_CONNECT_TIMEOUT = 6e4;
  Bundlr2.make = (feePayer) => {
    const object = MetaplexFoundation.make(Node.getConnection()).use(
      bundlrStorage({
        address: Constants.BUNDLR_NETWORK_URL,
        providerUrl: Constants.switchCluster({
          cluster: Constants.currentCluster
        }),
        timeout: BUNDLR_CONNECT_TIMEOUT
      })
    );
    if (isKeypair(feePayer)) {
      object.use(keypairIdentity(feePayer));
    } else if (isPhantom(feePayer)) {
      object.use(walletAdapterIdentity(feePayer));
    }
    return object;
  };
  Bundlr2.useStorage = (feePayer) => {
    return (0, Bundlr2.make)(feePayer).storage().driver();
  };
  const isKeypair = (payer) => {
    if (!payer) {
      return false;
    }
    return "secretKey" in payer;
  };
  const isPhantom = (payer) => {
    if (!payer) {
      return false;
    }
    return "connect" in payer;
  };
})(Bundlr || (Bundlr = {}));
var Arweave;
((Arweave2) => {
  Arweave2.uploadContent = (filePath, feePayer, fileOptions) => __async2(void 0, null, function* () {
    return Try(() => __async2(void 0, null, function* () {
      debugLog("# upload content: ", filePath);
      let file;
      if (isNode()) {
        const filepath = filePath;
        const buffer = (yield import("fs")).readFileSync(filepath);
        if (fileOptions) {
          file = toMetaplexFile(buffer, filepath, fileOptions);
        } else {
          file = toMetaplexFile(buffer, filepath);
        }
      } else if (isBrowser()) {
        const filepath = filePath;
        if (fileOptions) {
          file = toMetaplexFile(filepath, "", fileOptions);
        } else {
          file = toMetaplexFile(filepath, "");
        }
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      return Bundlr.useStorage(feePayer.toKeypair()).upload(file);
    }));
  });
  Arweave2.uploadMetadata = (metadata, feePayer) => __async2(void 0, null, function* () {
    return Try(() => __async2(void 0, null, function* () {
      debugLog("# upload meta data: ", metadata);
      const uploaded = yield Bundlr.make(feePayer.toKeypair()).nfts().uploadMetadata(metadata);
      return uploaded.uri;
    }));
  });
})(Arweave || (Arweave = {}));
var NftStorage;
((NftStorage2) => {
  let isDisplayWarning = false;
  const getNftStorageApiKey = () => {
    if (!Constants2.nftStorageApiKey) {
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
      return Constants2.NFT_STORAGE_API_KEY;
    } else {
      return Constants2.nftStorageApiKey;
    }
  };
  const createGatewayUrl = (cid) => `${Constants2.NFT_STORAGE_GATEWAY_URL}/${cid}`;
  const connect = () => new NFTStorage({ token: getNftStorageApiKey() });
  NftStorage2.uploadContent = (filePath) => __async2(void 0, null, function* () {
    return Try2(() => __async2(void 0, null, function* () {
      debugLog2("# upload content: ", filePath);
      let file;
      if (isNode2()) {
        const filepath = filePath;
        file = (yield import("fs")).readFileSync(filepath);
      } else if (isBrowser2()) {
        const filepath = filePath;
        file = toMetaplexFile2(filepath, "").buffer;
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      const blobImage = new Blob([file]);
      const res = yield connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    }));
  });
  NftStorage2.uploadMetadata = (metadata) => __async2(void 0, null, function* () {
    return Try2(() => __async2(void 0, null, function* () {
      debugLog2("# upload metadata: ", metadata);
      const blobJson = new Blob([JSON.stringify(metadata)]);
      const res = yield connect().storeBlob(blobJson);
      return createGatewayUrl(res);
    }));
  });
})(NftStorage || (NftStorage = {}));
var Storage;
((Storage22) => {
  Storage22.toConvertOffchaindata = (input, sellerFeeBasisPoints) => {
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
  Storage22.uploadContent = (filePath, storageType, feePayer) => __async2(void 0, null, function* () {
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      return yield Arweave.uploadContent(filePath, feePayer);
    } else if (storageType === "nftStorage") {
      return yield NftStorage.uploadContent(filePath);
    } else {
      throw Error("Not found storageType");
    }
  });
  Storage22.uploadMetaAndContent = (input, filePath, storageType, feePayer) => __async2(void 0, null, function* () {
    let storage;
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      storage = yield (yield Arweave.uploadContent(filePath, feePayer)).unwrap(
        (ok) => __async2(void 0, null, function* () {
          input.image = ok;
          return yield Arweave.uploadMetadata(input, feePayer);
        }),
        (err) => {
          throw err;
        }
      );
    } else if (storageType === "nftStorage") {
      storage = yield (yield NftStorage.uploadContent(filePath)).unwrap(
        (ok) => __async2(void 0, null, function* () {
          input.image = ok;
          return yield NftStorage.uploadMetadata(input);
        }),
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
  });
})(Storage || (Storage = {}));

// src/metaplex/mint.ts
import {
  debugLog as debugLog3,
  KeypairAccount,
  Node as Node2,
  Try as Try3
} from "@solana-suite/shared";
import {
  Convert,
  Royalty,
  Validator
} from "internals/shared-metaplex";
var PhantomMetaplex;
((PhantomMetaplex2) => {
  PhantomMetaplex2.mint = (input, cluster, phantom) => __async(void 0, null, function* () {
    return Try3(() => __async(void 0, null, function* () {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      if (!input.filePath || !input.storageType) {
        throw Error("Not found filePath or storageType");
      }
      Node2.changeConnection({ cluster });
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
      const connection = Node2.getConnection();
      const mint2 = KeypairAccount.create();
      const isMutable = true;
      debugLog3("# properties: ", properties);
      debugLog3("# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      debugLog3("# mint: ", mint2.pubkey);
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
      debugLog3(
        "# signed, signed.signatures: ",
        signed,
        signed.signatures.map((sig2) => sig2.publicKey.toString())
      );
      const sig = yield connection.sendRawTransaction(signed.serialize());
      yield Node2.confirmedSig(sig);
      return mint2.pubkey;
    }));
  });
})(PhantomMetaplex || (PhantomMetaplex = {}));

// src/metaplex/index.ts
var Metaplex2 = Object.assign({}, PhantomMetaplex);

// src/spl-token/add.ts
import {
  TOKEN_PROGRAM_ID,
  createMintToCheckedInstruction
} from "@solana/spl-token";
import { Transaction as Transaction2 } from "@solana/web3.js";
import { Node as Node3, Try as Try4 } from "@solana-suite/shared";
import { AssociatedAccount } from "@solana-suite/core";
var PhantomSplToken;
((PhantomSplToken4) => {
  PhantomSplToken4.add = (tokenKey, owner, cluster, totalAmount, mintDecimal, phantom) => __async(void 0, null, function* () {
    return Try4(() => __async(void 0, null, function* () {
      Node3.changeConnection({ cluster });
      const connection = Node3.getConnection();
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
        yield Node3.confirmedSig(sig);
      }
      return tokenKey;
    }));
  });
})(PhantomSplToken || (PhantomSplToken = {}));

// src/spl-token/mint.ts
import { Keypair, Transaction as Transaction3 } from "@solana/web3.js";
import { debugLog as debugLog4, Node as Node4, Try as Try5 } from "@solana-suite/shared";
import { Storage as Storage2 } from "internals/storage";
import { SplToken } from "@solana-suite/core";
import { Convert as Convert2 } from "internals/shared-metaplex";
var PhantomSplToken2;
((PhantomSplToken4) => {
  PhantomSplToken4.mint = (input, owner, cluster, totalAmount, mintDecimal, phantom) => __async(void 0, null, function* () {
    return Try5(() => __async(void 0, null, function* () {
      Node4.changeConnection({ cluster });
      const connection = Node4.getConnection();
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
      debugLog4("# datav2: ", datav2);
      debugLog4("# upload content url: ", uri);
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
      debugLog4(
        "# signed, signed.signatures: ",
        signed,
        signed.signatures.map((sig2) => sig2.publicKey.toString())
      );
      const sig = yield connection.sendRawTransaction(signed.serialize());
      yield Node4.confirmedSig(sig);
      return mint2.publicKey.toString();
    }));
  });
})(PhantomSplToken2 || (PhantomSplToken2 = {}));

// src/spl-token/index.ts
var PhantomSplToken3 = Object.assign(
  {},
  PhantomSplToken,
  PhantomSplToken2
);
export {
  Metaplex2 as Metaplex,
  PhantomSplToken3 as PhantomSplToken
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL21ldGFwbGV4L21pbnQudHMiLCAiLi4vLi4vaW50ZXJuYWxzL3N0b3JhZ2Uvc3JjL2Fyd2VhdmUudHMiLCAiLi4vLi4vaW50ZXJuYWxzL3N0b3JhZ2Uvc3JjL2J1bmRsci50cyIsICIuLi8uLi9pbnRlcm5hbHMvc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vLi4vaW50ZXJuYWxzL3N0b3JhZ2Uvc3JjL3N0b3JhZ2UudHMiLCAiLi4vc3JjL21ldGFwbGV4L2luZGV4LnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vYWRkLnRzIiwgIi4uL3NyYy9zcGwtdG9rZW4vbWludC50cyIsICIuLi9zcmMvc3BsLXRva2VuL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBNZXRhcGxleCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvbmZ0JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICdpbnRlcm5hbC9zdG9yYWdlJztcbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBLZXlwYWlyQWNjb3VudCxcbiAgTm9kZSxcbiAgUmVzdWx0LFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7XG4gIENvbnZlcnQsXG4gIFJveWFsdHksXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFZhbGlkYXRvcixcbiAgVmFsaWRhdG9yRXJyb3IsXG59IGZyb20gJ2ludGVybmFscy9zaGFyZWQtbWV0YXBsZXgnO1xuaW1wb3J0IHsgUGhhbnRvbSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBQaGFudG9tTWV0YXBsZXgge1xuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnQgYW5kIE5GVCBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7VXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YX0gIGlucHV0XG4gICAqIEBwYXJhbSB7UGhhbnRvbX0gcGhhbnRvbSAgICAgICAgcGhhbnRvbSB3YWxsZXQgb2JqZWN0XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIGlucHV0OiBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgIGNsdXN0ZXI6IHN0cmluZyxcbiAgICBwaGFudG9tOiBQaGFudG9tLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yIHwgVmFsaWRhdG9yRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGlmICghaW5wdXQuZmlsZVBhdGggfHwgIWlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgZmlsZVBhdGggb3Igc3RvcmFnZVR5cGUnKTtcbiAgICAgIH1cblxuICAgICAgTm9kZS5jaGFuZ2VDb25uZWN0aW9uKHsgY2x1c3RlciB9KTtcblxuICAgICAgLy9Db252ZXJ0IHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50XG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydC5Qcm9wZXJ0aWVzLmludG9JbmZyYVNpZGUoXG4gICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgIFN0b3JhZ2UudXBsb2FkQ29udGVudCxcbiAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IFJveWFsdHkuY29udmVydChpbnB1dC5yb3lhbHR5KTtcbiAgICAgIGNvbnN0IG5mdFN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICB7IC4uLmlucHV0LCBwcm9wZXJ0aWVzIH0sXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWRNZXRhQW5kQ29udGVudChcbiAgICAgICAgbmZ0U3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICApO1xuXG4gICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICB9XG4gICAgICBjb25zdCB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydC5OZnRNZXRhZGF0YS5pbnRvSW5mcmFTaWRlKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICAgIGNvbnN0IG1pbnQgPSBLZXlwYWlyQWNjb3VudC5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IHRydWU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIHByb3BlcnRpZXM6ICcsIHByb3BlcnRpZXMpO1xuICAgICAgZGVidWdMb2coJyMgc2VsbGVyRmVlQmFzaXNQb2ludHM6ICcsIHNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgIGRlYnVnTG9nKCcjIG1pbnQ6ICcsIG1pbnQucHVia2V5KTtcblxuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oKTtcblxuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBNZXRhcGxleC5jcmVhdGVNaW50SW5zdHJ1Y3Rpb25zKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIHBoYW50b20ucHVibGljS2V5LFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBoYW50b20ucHVibGljS2V5LFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICBpbnN0cy5mb3JFYWNoKChpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uKSA9PiB7XG4gICAgICAgIHR4LmFkZChpbnN0KTtcbiAgICAgIH0pO1xuICAgICAgdHguZmVlUGF5ZXIgPSBwaGFudG9tLnB1YmxpY0tleTtcbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoQW5kQ29udGV4dCgpO1xuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLnZhbHVlLmJsb2NraGFzaDtcbiAgICAgIHR4LnBhcnRpYWxTaWduKG1pbnQudG9LZXlwYWlyKCkpO1xuICAgICAgY29uc3Qgc2lnbmVkID0gYXdhaXQgcGhhbnRvbS5zaWduVHJhbnNhY3Rpb24odHgpO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIHNpZ25lZCwgc2lnbmVkLnNpZ25hdHVyZXM6ICcsXG4gICAgICAgIHNpZ25lZCxcbiAgICAgICAgc2lnbmVkLnNpZ25hdHVyZXMubWFwKChzaWcpID0+IHNpZy5wdWJsaWNLZXkudG9TdHJpbmcoKSksXG4gICAgICApO1xuICAgICAgY29uc3Qgc2lnID0gYXdhaXQgY29ubmVjdGlvbi5zZW5kUmF3VHJhbnNhY3Rpb24oc2lnbmVkLnNlcmlhbGl6ZSgpKTtcbiAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKHNpZyk7XG4gICAgICByZXR1cm4gbWludC5wdWJrZXk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTWV0YXBsZXhGaWxlLCB0b01ldGFwbGV4RmlsZSB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL2pzJztcblxuaW1wb3J0IHtcbiAgZGVidWdMb2csXG4gIGlzQnJvd3NlcixcbiAgaXNOb2RlLFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBGaWxlQ29udGVudCwgSW5mcmFTaWRlSW5wdXQgfSBmcm9tICdpbnRlcm5hbHMvc2hhcmVkLW1ldGFwbGV4Lyc7XG5pbXBvcnQgeyBCdW5kbHIgfSBmcm9tICcuL2J1bmRscic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YXBsZXhGaWxlT3B0aW9ucyB7XG4gIHJlYWRvbmx5IGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHVuaXF1ZU5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgY29udGVudFR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgZXh0ZW5zaW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IHRhZ3M6IHsgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1bXTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBBcndlYXZlIHtcbiAgZXhwb3J0IGNvbnN0IHVwbG9hZENvbnRlbnQgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVDb250ZW50LFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgZmlsZU9wdGlvbnM/OiBNZXRhcGxleEZpbGVPcHRpb25zLCAvLyBvbmx5IGFyd2VhdmUsIG5vdCBuZnQtc3RvcmFnZVxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQ6ICcsIGZpbGVQYXRoKTtcbiAgICAgIGxldCBmaWxlITogTWV0YXBsZXhGaWxlO1xuICAgICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGggYXMgc3RyaW5nO1xuICAgICAgICBjb25zdCBidWZmZXIgPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoZmlsZXBhdGgpO1xuICAgICAgICBpZiAoZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoYnVmZmVyLCBmaWxlcGF0aCwgZmlsZU9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShidWZmZXIsIGZpbGVwYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICBpZiAoZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnLCBmaWxlT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGZpbGVwYXRoLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdXBwb3J0ZWQgZW52aXJvbm1lbnQ6IG9ubHkgTm9kZS5qcyBhbmQgQnJvd3NlciBqcycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQnVuZGxyLnVzZVN0b3JhZ2UoZmVlUGF5ZXIudG9LZXlwYWlyKCkpLnVwbG9hZChmaWxlKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkTWV0YWRhdGEgPSBhc3luYyAoXG4gICAgbWV0YWRhdGE6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgbWV0YSBkYXRhOiAnLCBtZXRhZGF0YSk7XG5cbiAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgQnVuZGxyLm1ha2UoZmVlUGF5ZXIudG9LZXlwYWlyKCkpXG4gICAgICAgIC5uZnRzKClcbiAgICAgICAgLnVwbG9hZE1ldGFkYXRhKG1ldGFkYXRhKTtcblxuICAgICAgcmV0dXJuIHVwbG9hZGVkLnVyaTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBNZXRhcGxleCBhcyBNZXRhcGxleEZvdW5kYXRpb24sXG4gIGtleXBhaXJJZGVudGl0eSxcbiAgYnVuZGxyU3RvcmFnZSxcbiAgQnVuZGxyU3RvcmFnZURyaXZlcixcbiAgd2FsbGV0QWRhcHRlcklkZW50aXR5LFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9qcyc7XG5cbmltcG9ydCB7IEtleXBhaXIgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSwgQ29uc3RhbnRzIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgQnVuZGxyU2lnbmVyLCBQaGFudG9tIH0gZnJvbSAnLi90eXBlcy9idW5kbHInO1xuXG5leHBvcnQgbmFtZXNwYWNlIEJ1bmRsciB7XG4gIGNvbnN0IEJVTkRMUl9DT05ORUNUX1RJTUVPVVQgPSA2MDAwMDtcblxuICBleHBvcnQgY29uc3QgbWFrZSA9IChmZWVQYXllcj86IEJ1bmRsclNpZ25lcik6IE1ldGFwbGV4Rm91bmRhdGlvbiA9PiB7XG4gICAgY29uc3Qgb2JqZWN0ID0gTWV0YXBsZXhGb3VuZGF0aW9uLm1ha2UoTm9kZS5nZXRDb25uZWN0aW9uKCkpLnVzZShcbiAgICAgIGJ1bmRsclN0b3JhZ2Uoe1xuICAgICAgICBhZGRyZXNzOiBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMLFxuICAgICAgICBwcm92aWRlclVybDogQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICAgICAgfSksXG4gICAgICAgIHRpbWVvdXQ6IEJVTkRMUl9DT05ORUNUX1RJTUVPVVQsXG4gICAgICB9KSxcbiAgICApO1xuICAgIGlmIChpc0tleXBhaXIoZmVlUGF5ZXIpKSB7XG4gICAgICBvYmplY3QudXNlKGtleXBhaXJJZGVudGl0eShmZWVQYXllcikpO1xuICAgIH0gZWxzZSBpZiAoaXNQaGFudG9tKGZlZVBheWVyKSkge1xuICAgICAgb2JqZWN0LnVzZSh3YWxsZXRBZGFwdGVySWRlbnRpdHkoZmVlUGF5ZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXNlU3RvcmFnZSA9IChmZWVQYXllcjogQnVuZGxyU2lnbmVyKTogQnVuZGxyU3RvcmFnZURyaXZlciA9PiB7XG4gICAgcmV0dXJuIG1ha2UoZmVlUGF5ZXIpLnN0b3JhZ2UoKS5kcml2ZXIoKSBhcyBCdW5kbHJTdG9yYWdlRHJpdmVyO1xuICB9O1xuXG4gIGNvbnN0IGlzS2V5cGFpciA9IChwYXllcjogQnVuZGxyU2lnbmVyKTogcGF5ZXIgaXMgS2V5cGFpciA9PiB7XG4gICAgaWYgKCFwYXllcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJ3NlY3JldEtleScgaW4gcGF5ZXI7XG4gIH07XG5cbiAgY29uc3QgaXNQaGFudG9tID0gKHBheWVyOiBCdW5kbHJTaWduZXIpOiBwYXllciBpcyBQaGFudG9tID0+IHtcbiAgICBpZiAoIXBheWVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAnY29ubmVjdCcgaW4gcGF5ZXI7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTkZUU3RvcmFnZSwgQmxvYiB9IGZyb20gJ25mdC5zdG9yYWdlJztcbmltcG9ydCB7XG4gIENvbnN0YW50cyxcbiAgUmVzdWx0LFxuICBpc05vZGUsXG4gIGlzQnJvd3NlcixcbiAgZGVidWdMb2csXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5pbXBvcnQgeyB0b01ldGFwbGV4RmlsZSB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL2pzJztcbmltcG9ydCB7IEluZnJhU2lkZUlucHV0LCBGaWxlQ29udGVudCB9IGZyb20gJ2ludGVybmFscy9zaGFyZWQtbWV0YXBsZXgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5mdFN0b3JhZ2Uge1xuICBsZXQgaXNEaXNwbGF5V2FybmluZyA9IGZhbHNlO1xuICBjb25zdCBnZXROZnRTdG9yYWdlQXBpS2V5ID0gKCk6IHN0cmluZyA9PiB7XG4gICAgaWYgKCFDb25zdGFudHMubmZ0U3RvcmFnZUFwaUtleSkge1xuICAgICAgaWYgKCFpc0Rpc3BsYXlXYXJuaW5nKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgXG4gICAgICAgIFtXYXJuaW5nXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBJZiB3aWxsIHVzZSBAc29sYW5hLXN1aXRlL25mdCBwYWNrYWdlXG4gICAgICAgIHlvdXIgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZS5hcGlLZXkgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGlLZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgLFxuICAgICAgICApO1xuICAgICAgICBpc0Rpc3BsYXlXYXJuaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBDb25zdGFudHMuTkZUX1NUT1JBR0VfQVBJX0tFWTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENvbnN0YW50cy5uZnRTdG9yYWdlQXBpS2V5O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVHYXRld2F5VXJsID0gKGNpZDogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgYCR7Q29uc3RhbnRzLk5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMfS8ke2NpZH1gO1xuXG4gIGNvbnN0IGNvbm5lY3QgPSAoKSA9PiBuZXcgTkZUU3RvcmFnZSh7IHRva2VuOiBnZXROZnRTdG9yYWdlQXBpS2V5KCkgfSk7XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZENvbnRlbnQgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVDb250ZW50LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQ6ICcsIGZpbGVQYXRoKTtcbiAgICAgIGxldCBmaWxlITogQnVmZmVyO1xuICAgICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGggYXMgc3RyaW5nO1xuICAgICAgICBmaWxlID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVwYXRoKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGZpbGVwYXRoLCAnJykuYnVmZmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1N1cHBvcnRlZCBlbnZpcm9ubWVudDogb25seSBOb2RlLmpzIGFuZCBCcm93c2VyIGpzJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJsb2JJbWFnZSA9IG5ldyBCbG9iKFtmaWxlXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JJbWFnZSk7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudFxuICAgKlxuICAgKiBAcGFyYW0ge1N0b3JhZ2VNZXRhZGF0YX0gbWV0YWRhdGFcbiAgICoge1xuICAgKiAgIG5hbWU/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZGVzY3JpcHRpb24/OiB7c3RyaW5nfSAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgc2VsbGVyRmVlQmFzaXNQb2ludHM/OiBudW1iZXIgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGltYWdlPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAvLyB1cGxvYWRlZCB1cmkgb2Ygb3JpZ2luYWwgY29udGVudFxuICAgKiAgIGV4dGVybmFsX3VybD86IHtzdHJpbmd9ICAgICAgICAgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IHtKc29uTWV0YWRhdGFBdHRyaWJ1dGVbXX0gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiB7SnNvbk1ldGFkYXRhUHJvcGVydGllczxVcmk+fSAvLyBpbmNsdWRlZCBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uICAgICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddOiB7dW5rbm93bn0gICAgICAgICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRNZXRhZGF0YSA9IGFzeW5jIChcbiAgICBtZXRhZGF0YTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4sXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcblxuICAgICAgY29uc3QgYmxvYkpzb24gPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JKc29uKTtcbiAgICAgIHJldHVybiBjcmVhdGVHYXRld2F5VXJsKHJlcyk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBTZWNyZXQgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQge1xuICBGaWxlQ29udGVudCxcbiAgSW5mcmFTaWRlSW5wdXQsXG4gIFN0b3JhZ2VUeXBlLFxuICBVc2VyU2lkZUlucHV0LFxufSBmcm9tICdpbnRlcm5hbHMvc2hhcmVkLW1ldGFwbGV4JztcblxuaW1wb3J0IHsgQXJ3ZWF2ZSB9IGZyb20gJy4vYXJ3ZWF2ZSc7XG5pbXBvcnQgeyBOZnRTdG9yYWdlIH0gZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RvcmFnZSB7XG4gIGV4cG9ydCBjb25zdCB0b0NvbnZlcnRPZmZjaGFpbmRhdGEgPSAoXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgKTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXG4gICAgICBzZWxsZXJfZmVlX2Jhc2lzX3BvaW50czogc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICBleHRlcm5hbF91cmw6IGlucHV0LmV4dGVybmFsX3VybCxcbiAgICAgIGF0dHJpYnV0ZXM6IGlucHV0LmF0dHJpYnV0ZXMsXG4gICAgICBwcm9wZXJ0aWVzOiBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgaW1hZ2U6ICcnLFxuICAgICAgb3B0aW9uczogaW5wdXQub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkQ29udGVudChmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFBbmRDb250ZW50ID0gYXN5bmMgKFxuICAgIGlucHV0OiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGxldCBzdG9yYWdlO1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICAgIGF3YWl0IEFyd2VhdmUudXBsb2FkQ29udGVudChmaWxlUGF0aCwgZmVlUGF5ZXIpXG4gICAgICApLnVud3JhcChcbiAgICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZE1ldGFkYXRhKGlucHV0LCBmZWVQYXllcik7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICAgIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aClcbiAgICAgICkudW53cmFwKFxuICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkTWV0YWRhdGEoaW5wdXQpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBzdG9yYWdlVHlwZScpO1xuICAgIH1cblxuICAgIGlmICghc3RvcmFnZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0VtcHR5IHN0b3JhZ2Ugb2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBzdG9yYWdlO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFBoYW50b21NZXRhcGxleCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcblxuZXhwb3J0IGNvbnN0IE1ldGFwbGV4ID0gT2JqZWN0LmFzc2lnbih7fSwgTWludCk7XG4iLCAiaW1wb3J0IHtcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7IFRyYW5zYWN0aW9uLCBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSwgUHVia2V5LCBSZXN1bHQsIFRyeSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuaW1wb3J0IHsgQXNzb2NpYXRlZEFjY291bnQgfSBmcm9tICdAc29sYW5hLXN1aXRlL2NvcmUnO1xuaW1wb3J0IHsgUGhhbnRvbSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBQaGFudG9tU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKFxuICAgIHRva2VuS2V5OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBjbHVzdGVyOiBzdHJpbmcsXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIHBoYW50b206IFBoYW50b21cbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXIgfSk7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuXG4gICAgICBjb25zdCBtYWtlSW5zdHJ1Y3Rpb24gPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgdG9rZW5LZXksXG4gICAgICAgIG93bmVyXG4gICAgICApO1xuICAgICAgdHJhbnNhY3Rpb24uYWRkKG1ha2VJbnN0cnVjdGlvbi5pbnN0IGFzIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24pO1xuICAgICAgdHJhbnNhY3Rpb24uYWRkKFxuICAgICAgICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgdG9rZW5LZXkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtYWtlSW5zdHJ1Y3Rpb24udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICB0b3RhbEFtb3VudCxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBbXSxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lEXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gb3duZXIudG9QdWJsaWNLZXkoKTtcbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoQW5kQ29udGV4dCgpO1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLnZhbHVlLmJsb2NraGFzaDtcblxuICAgICAgY29uc3Qgc2lnbmVkID0gYXdhaXQgcGhhbnRvbS5zaWduQWxsVHJhbnNhY3Rpb25zKFt0cmFuc2FjdGlvbl0pO1xuXG4gICAgICAvLyB0b2RvOiByZWZhY3RvcmluZ1xuICAgICAgZm9yIChjb25zdCBzaWduIG9mIHNpZ25lZCkge1xuICAgICAgICBjb25zdCBzaWcgPSBhd2FpdCBjb25uZWN0aW9uLnNlbmRSYXdUcmFuc2FjdGlvbihzaWduLnNlcmlhbGl6ZSgpKTtcbiAgICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcoc2lnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbktleTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyLCBUcmFuc2FjdGlvbiwgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IGRlYnVnTG9nLCBOb2RlLCBQdWJrZXksIFJlc3VsdCwgVHJ5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ2ludGVybmFscy9zdG9yYWdlJztcbmltcG9ydCB7IFNwbFRva2VuIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb3JlJztcbmltcG9ydCB7IFBoYW50b20gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBDb252ZXJ0LCBVc2VyU2lkZUlucHV0IH0gZnJvbSAnaW50ZXJuYWxzL3NoYXJlZC1tZXRhcGxleCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGhhbnRvbVNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5NZXRhZGF0YSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNsdXN0ZXI6IHN0cmluZyxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgcGhhbnRvbTogUGhhbnRvbSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXIgfSk7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgICAgY29uc3QgbWludCA9IEtleXBhaXIuZ2VuZXJhdGUoKTtcblxuICAgICAgaW5wdXQucm95YWx0eSA9IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IDA7XG4gICAgICBjb25zdCB0b2tlblN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICBpbnB1dCBhcyBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgICAgICBpbnB1dC5yb3lhbHR5LFxuICAgICAgKTtcblxuICAgICAgbGV0IHVyaSE6IHN0cmluZztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCAmJiBpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkTWV0YUFuZENvbnRlbnQoXG4gICAgICAgICAgdG9rZW5TdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICB1cmkgPSBpbnB1dC51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihgTXVzdCBzZXQgJ3N0b3JhZ2VUeXBlICsgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IHRydWU7XG5cbiAgICAgIGNvbnN0IGRhdGF2MiA9IENvbnZlcnQuVG9rZW5NZXRhZGF0YS5pbnRvSW5mcmFTaWRlKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXJpKTtcblxuICAgICAgY29uc3QgaW5zdHVyY3Rpb25zID0gYXdhaXQgU3BsVG9rZW4uY3JlYXRlTWludEluc3RydWN0aW9ucyhcbiAgICAgICAgbWludC5wdWJsaWNLZXksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRvdGFsQW1vdW50LFxuICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICBpbnN0dXJjdGlvbnMuZm9yRWFjaCgoaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbikgPT5cbiAgICAgICAgdHJhbnNhY3Rpb24uYWRkKGluc3QpLFxuICAgICAgKTtcbiAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gb3duZXIudG9QdWJsaWNLZXkoKTtcbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoQW5kQ29udGV4dCgpO1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLnZhbHVlLmJsb2NraGFzaDtcbiAgICAgIHRyYW5zYWN0aW9uLnBhcnRpYWxTaWduKG1pbnQpO1xuICAgICAgY29uc3Qgc2lnbmVkID0gYXdhaXQgcGhhbnRvbS5zaWduVHJhbnNhY3Rpb24odHJhbnNhY3Rpb24pO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIHNpZ25lZCwgc2lnbmVkLnNpZ25hdHVyZXM6ICcsXG4gICAgICAgIHNpZ25lZCxcbiAgICAgICAgc2lnbmVkLnNpZ25hdHVyZXMubWFwKChzaWcpID0+IHNpZy5wdWJsaWNLZXkudG9TdHJpbmcoKSksXG4gICAgICApO1xuICAgICAgY29uc3Qgc2lnID0gYXdhaXQgY29ubmVjdGlvbi5zZW5kUmF3VHJhbnNhY3Rpb24oc2lnbmVkLnNlcmlhbGl6ZSgpKTtcbiAgICAgIGF3YWl0IE5vZGUuY29uZmlybWVkU2lnKHNpZyk7XG4gICAgICByZXR1cm4gbWludC5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQaGFudG9tU3BsVG9rZW4gYXMgQWRkIH0gZnJvbSAnLi9hZGQnO1xuaW1wb3J0IHsgUGhhbnRvbVNwbFRva2VuIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuXG5leHBvcnQgY29uc3QgUGhhbnRvbVNwbFRva2VuID0gT2JqZWN0LmFzc2lnbihcbiAge30sXG4gIEFkZCxcbiAgTWludFxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxtQkFBMkM7QUFDcEQsU0FBUyxnQkFBZ0I7OztBQ0R6QixTQUF1QixzQkFBc0I7QUFFN0M7RUFDRTtFQUNBO0VBQ0E7RUFHQTtPQUNLO0FDVFA7RUFDRSxZQUFZO0VBQ1o7RUFDQTtFQUVBO09BQ0s7QUFHUCxTQUFTLE1BQU0saUJBQWlCO0FDVGhDLFNBQVMsWUFBWSxZQUFZO0FBQ2pDO0VBQ0UsYUFBQUE7RUFFQSxVQUFBQztFQUNBLGFBQUFDO0VBQ0EsWUFBQUM7RUFDQSxPQUFBQztPQUNLO0FBRVAsU0FBUyxrQkFBQUMsdUJBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QURFeEIsSUFBVTtDQUFWLENBQVVDLFlBQVY7QUFDTCxRQUFNLHlCQUF5QjtBQUVs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STtBQUFBLE1BQ3RCO0FBQ0Esa0JBQVksV0FBVyxNQUFNLFlBQVk7QUFDekMsWUFBTSxlQUFlLE1BQU0sV0FBVyw2QkFBNkI7QUFDbkUsa0JBQVksa0JBQWtCLGFBQWEsTUFBTTtBQUNqRCxrQkFBWSxZQUFZQSxLQUFJO0FBQzVCLFlBQU0sU0FBUyxNQUFNLFFBQVEsZ0JBQWdCLFdBQVc7QUFDeEQsTUFBQUc7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFFBQ0EsT0FBTyxXQUFXLElBQUksQ0FBQ0MsU0FBUUEsS0FBSSxVQUFVLFNBQVMsQ0FBQztBQUFBLE1BQ3pEO0FBQ0EsWUFBTSxNQUFNLE1BQU0sV0FBVyxtQkFBbUIsT0FBTyxVQUFVLENBQUM7QUFDbEUsWUFBTU4sTUFBSyxhQUFhLEdBQUc7QUFDM0IsYUFBT0UsTUFBSyxVQUFVLFNBQVM7QUFBQSxJQUNqQyxFQUFDO0FBQUEsRUFDSDtBQUFBLEdBOUVlSix3Q0FBQTs7O0FDTFYsSUFBTVMsbUJBQWtCLE9BQU87QUFBQSxFQUNwQyxDQUFDO0FBQUEsRUFDRDtBQUFBLEVBQ0FBO0FBQ0Y7IiwKICAibmFtZXMiOiBbIkNvbnN0YW50cyIsICJpc05vZGUiLCAiaXNCcm93c2VyIiwgImRlYnVnTG9nIiwgIlRyeSIsICJ0b01ldGFwbGV4RmlsZSIsICJCdW5kbHIiLCAiQXJ3ZWF2ZSIsICJfX2FzeW5jIiwgIk5mdFN0b3JhZ2UiLCAiU3RvcmFnZSIsICJkZWJ1Z0xvZyIsICJOb2RlIiwgIlRyeSIsICJQaGFudG9tTWV0YXBsZXgiLCAiVHJ5IiwgIk5vZGUiLCAibWludCIsICJkZWJ1Z0xvZyIsICJzaWciLCAiTWV0YXBsZXgiLCAiVHJhbnNhY3Rpb24iLCAiTm9kZSIsICJUcnkiLCAiUGhhbnRvbVNwbFRva2VuIiwgIlRyeSIsICJOb2RlIiwgIlRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uIiwgImRlYnVnTG9nIiwgIk5vZGUiLCAiVHJ5IiwgIlN0b3JhZ2UiLCAiQ29udmVydCIsICJQaGFudG9tU3BsVG9rZW4iLCAiVHJ5IiwgIk5vZGUiLCAiVHJhbnNhY3Rpb24iLCAibWludCIsICJTdG9yYWdlIiwgIkNvbnZlcnQiLCAiZGVidWdMb2ciLCAic2lnIiwgIlBoYW50b21TcGxUb2tlbiJdCn0K