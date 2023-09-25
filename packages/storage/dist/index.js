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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Arweave: () => Arweave,
  Bundlr: () => Bundlr,
  NftStorage: () => NftStorage,
  Storage: () => Storage
});
module.exports = __toCommonJS(src_exports);

// src/arweave.ts
var import_js2 = require("@metaplex-foundation/js");
var import_shared2 = require("@solana-suite/shared");

// src/bundlr.ts
var import_js = require("@metaplex-foundation/js");
var import_shared = require("@solana-suite/shared");
var Bundlr;
((Bundlr2) => {
  const BUNDLR_CONNECT_TIMEOUT = 6e4;
  Bundlr2.make = (feePayer) => {
    const object = import_js.Metaplex.make(import_shared.Node.getConnection()).use(
      (0, import_js.bundlrStorage)({
        address: import_shared.Constants.BUNDLR_NETWORK_URL,
        providerUrl: import_shared.Constants.switchCluster({
          cluster: import_shared.Constants.currentCluster
        }),
        timeout: BUNDLR_CONNECT_TIMEOUT
      })
    );
    if (isKeypair(feePayer)) {
      object.use((0, import_js.keypairIdentity)(feePayer));
    } else if (isPhantom(feePayer)) {
      object.use((0, import_js.walletAdapterIdentity)(feePayer));
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

// src/arweave.ts
var Arweave;
((Arweave2) => {
  Arweave2.uploadContent = (filePath, feePayer, fileOptions) => __async(void 0, null, function* () {
    return (0, import_shared2.Try)(() => __async(void 0, null, function* () {
      (0, import_shared2.debugLog)("# upload content: ", filePath);
      let file;
      if ((0, import_shared2.isNode)()) {
        const filepath = filePath;
        const buffer = (yield import("fs")).readFileSync(filepath);
        if (fileOptions) {
          file = (0, import_js2.toMetaplexFile)(buffer, filepath, fileOptions);
        } else {
          file = (0, import_js2.toMetaplexFile)(buffer, filepath);
        }
      } else if ((0, import_shared2.isBrowser)()) {
        const filepath = filePath;
        if (fileOptions) {
          file = (0, import_js2.toMetaplexFile)(filepath, "", fileOptions);
        } else {
          file = (0, import_js2.toMetaplexFile)(filepath, "");
        }
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      return Bundlr.useStorage(feePayer.toKeypair()).upload(file);
    }));
  });
  Arweave2.uploadMetadata = (metadata, feePayer) => __async(void 0, null, function* () {
    return (0, import_shared2.Try)(() => __async(void 0, null, function* () {
      (0, import_shared2.debugLog)("# upload meta data: ", metadata);
      const uploaded = yield Bundlr.make(feePayer.toKeypair()).nfts().uploadMetadata(metadata);
      return uploaded.uri;
    }));
  });
})(Arweave || (Arweave = {}));

// src/nft-storage.ts
var import_nft = require("nft.storage");
var import_shared3 = require("@solana-suite/shared");
var import_js3 = require("@metaplex-foundation/js");
var NftStorage;
((NftStorage2) => {
  let isDisplayWarning = false;
  const getNftStorageApiKey = () => {
    if (!import_shared3.Constants.nftStorageApiKey) {
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
      return import_shared3.Constants.NFT_STORAGE_API_KEY;
    } else {
      return import_shared3.Constants.nftStorageApiKey;
    }
  };
  const createGatewayUrl = (cid) => `${import_shared3.Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
  const connect = () => new import_nft.NFTStorage({ token: getNftStorageApiKey() });
  NftStorage2.uploadContent = (filePath) => __async(void 0, null, function* () {
    return (0, import_shared3.Try)(() => __async(void 0, null, function* () {
      (0, import_shared3.debugLog)("# upload content: ", filePath);
      let file;
      if ((0, import_shared3.isNode)()) {
        const filepath = filePath;
        file = (yield import("fs")).readFileSync(filepath);
      } else if ((0, import_shared3.isBrowser)()) {
        const filepath = filePath;
        file = (0, import_js3.toMetaplexFile)(filepath, "").buffer;
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      const blobImage = new import_nft.Blob([file]);
      const res = yield connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    }));
  });
  NftStorage2.uploadMetadata = (metadata) => __async(void 0, null, function* () {
    return (0, import_shared3.Try)(() => __async(void 0, null, function* () {
      (0, import_shared3.debugLog)("# upload metadata: ", metadata);
      const blobJson = new import_nft.Blob([JSON.stringify(metadata)]);
      const res = yield connect().storeBlob(blobJson);
      return createGatewayUrl(res);
    }));
  });
})(NftStorage || (NftStorage = {}));

// src/storage.ts
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
  Storage2.uploadContent = (filePath, storageType, feePayer) => __async(void 0, null, function* () {
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
  Storage2.uploadMetaAndContent = (input, filePath, storageType, feePayer) => __async(void 0, null, function* () {
    let storage;
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      storage = yield (yield Arweave.uploadContent(filePath, feePayer)).unwrap(
        (ok) => __async(void 0, null, function* () {
          input.image = ok;
          return yield Arweave.uploadMetadata(input, feePayer);
        }),
        (err) => {
          throw err;
        }
      );
    } else if (storageType === "nftStorage") {
      storage = yield (yield NftStorage.uploadContent(filePath)).unwrap(
        (ok) => __async(void 0, null, function* () {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Arweave,
  Bundlr,
  NftStorage,
  Storage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9hcndlYXZlLnRzIiwgIi4uL3NyYy9idW5kbHIudHMiLCAiLi4vc3JjL25mdC1zdG9yYWdlLnRzIiwgIi4uL3NyYy9zdG9yYWdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2Fyd2VhdmUnO1xuZXhwb3J0ICogZnJvbSAnLi9idW5kbHInO1xuZXhwb3J0ICogZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5leHBvcnQgKiBmcm9tICcuL3N0b3JhZ2UnO1xuIiwgImltcG9ydCB7IE1ldGFwbGV4RmlsZSwgdG9NZXRhcGxleEZpbGUgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9qcyc7XG5cbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBpc0Jyb3dzZXIsXG4gIGlzTm9kZSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgRmlsZUNvbnRlbnQsIEluZnJhU2lkZUlucHV0IH0gZnJvbSAndHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEJ1bmRsciB9IGZyb20gJy4vYnVuZGxyJztcblxuZXhwb3J0IGludGVyZmFjZSBNZXRhcGxleEZpbGVPcHRpb25zIHtcbiAgcmVhZG9ubHkgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgdW5pcXVlTmFtZTogc3RyaW5nO1xuICByZWFkb25seSBjb250ZW50VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSBleHRlbnNpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgdGFnczogeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfVtdO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIEFyd2VhdmUge1xuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICBmaWxlT3B0aW9ucz86IE1ldGFwbGV4RmlsZU9wdGlvbnMsIC8vIG9ubHkgYXJ3ZWF2ZSwgbm90IG5mdC1zdG9yYWdlXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudDogJywgZmlsZVBhdGgpO1xuICAgICAgbGV0IGZpbGUhOiBNZXRhcGxleEZpbGU7XG4gICAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aCBhcyBzdHJpbmc7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlcGF0aCk7XG4gICAgICAgIGlmIChmaWxlT3B0aW9ucykge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShidWZmZXIsIGZpbGVwYXRoLCBmaWxlT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGJ1ZmZlciwgZmlsZXBhdGgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGg7XG4gICAgICAgIGlmIChmaWxlT3B0aW9ucykge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycsIGZpbGVPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1N1cHBvcnRlZCBlbnZpcm9ubWVudDogb25seSBOb2RlLmpzIGFuZCBCcm93c2VyIGpzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBCdW5kbHIudXNlU3RvcmFnZShmZWVQYXllci50b0tleXBhaXIoKSkudXBsb2FkKGZpbGUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRNZXRhZGF0YSA9IGFzeW5jIChcbiAgICBtZXRhZGF0YTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4sXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhIGRhdGE6ICcsIG1ldGFkYXRhKTtcblxuICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBCdW5kbHIubWFrZShmZWVQYXllci50b0tleXBhaXIoKSlcbiAgICAgICAgLm5mdHMoKVxuICAgICAgICAudXBsb2FkTWV0YWRhdGEobWV0YWRhdGEpO1xuXG4gICAgICByZXR1cm4gdXBsb2FkZWQudXJpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIE1ldGFwbGV4IGFzIE1ldGFwbGV4Rm91bmRhdGlvbixcbiAga2V5cGFpcklkZW50aXR5LFxuICBidW5kbHJTdG9yYWdlLFxuICBCdW5kbHJTdG9yYWdlRHJpdmVyLFxuICB3YWxsZXRBZGFwdGVySWRlbnRpdHksXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL2pzJztcblxuaW1wb3J0IHsgS2V5cGFpciB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlLCBDb25zdGFudHMgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBCdW5kbHJTaWduZXIsIFBoYW50b20gfSBmcm9tICcuL3R5cGVzL2J1bmRscic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQnVuZGxyIHtcbiAgY29uc3QgQlVORExSX0NPTk5FQ1RfVElNRU9VVCA9IDYwMDAwO1xuXG4gIGV4cG9ydCBjb25zdCBtYWtlID0gKGZlZVBheWVyPzogQnVuZGxyU2lnbmVyKTogTWV0YXBsZXhGb3VuZGF0aW9uID0+IHtcbiAgICBjb25zdCBvYmplY3QgPSBNZXRhcGxleEZvdW5kYXRpb24ubWFrZShOb2RlLmdldENvbm5lY3Rpb24oKSkudXNlKFxuICAgICAgYnVuZGxyU3RvcmFnZSh7XG4gICAgICAgIGFkZHJlc3M6IENvbnN0YW50cy5CVU5ETFJfTkVUV09SS19VUkwsXG4gICAgICAgIHByb3ZpZGVyVXJsOiBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgICAgICB9KSxcbiAgICAgICAgdGltZW91dDogQlVORExSX0NPTk5FQ1RfVElNRU9VVCxcbiAgICAgIH0pLFxuICAgICk7XG4gICAgaWYgKGlzS2V5cGFpcihmZWVQYXllcikpIHtcbiAgICAgIG9iamVjdC51c2Uoa2V5cGFpcklkZW50aXR5KGZlZVBheWVyKSk7XG4gICAgfSBlbHNlIGlmIChpc1BoYW50b20oZmVlUGF5ZXIpKSB7XG4gICAgICBvYmplY3QudXNlKHdhbGxldEFkYXB0ZXJJZGVudGl0eShmZWVQYXllcikpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1c2VTdG9yYWdlID0gKGZlZVBheWVyOiBCdW5kbHJTaWduZXIpOiBCdW5kbHJTdG9yYWdlRHJpdmVyID0+IHtcbiAgICByZXR1cm4gbWFrZShmZWVQYXllcikuc3RvcmFnZSgpLmRyaXZlcigpIGFzIEJ1bmRsclN0b3JhZ2VEcml2ZXI7XG4gIH07XG5cbiAgY29uc3QgaXNLZXlwYWlyID0gKHBheWVyOiBCdW5kbHJTaWduZXIpOiBwYXllciBpcyBLZXlwYWlyID0+IHtcbiAgICBpZiAoIXBheWVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAnc2VjcmV0S2V5JyBpbiBwYXllcjtcbiAgfTtcblxuICBjb25zdCBpc1BoYW50b20gPSAocGF5ZXI6IEJ1bmRsclNpZ25lcik6IHBheWVyIGlzIFBoYW50b20gPT4ge1xuICAgIGlmICghcGF5ZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICdjb25uZWN0JyBpbiBwYXllcjtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBORlRTdG9yYWdlLCBCbG9iIH0gZnJvbSAnbmZ0LnN0b3JhZ2UnO1xuaW1wb3J0IHtcbiAgQ29uc3RhbnRzLFxuICBSZXN1bHQsXG4gIGlzTm9kZSxcbiAgaXNCcm93c2VyLFxuICBkZWJ1Z0xvZyxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmltcG9ydCB7IHRvTWV0YXBsZXhGaWxlIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vanMnO1xuaW1wb3J0IHsgSW5mcmFTaWRlSW5wdXQsIEZpbGVDb250ZW50IH0gZnJvbSAndHlwZXMvY29udmVydGVyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOZnRTdG9yYWdlIHtcbiAgbGV0IGlzRGlzcGxheVdhcm5pbmcgPSBmYWxzZTtcbiAgY29uc3QgZ2V0TmZ0U3RvcmFnZUFwaUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIGlmICghQ29uc3RhbnRzLm5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgIGlmICghaXNEaXNwbGF5V2FybmluZykge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFxuICAgICAgICBbV2FybmluZ11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgSWYgd2lsbCB1c2UgQHNvbGFuYS1zdWl0ZS9uZnQgcGFja2FnZVxuICAgICAgICB5b3VyIG5lZWQgdG8gdXBkYXRlIG5mdFN0b3JhZ2UuYXBpS2V5IGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpS2V5IGZyb20gaHR0cHM6Ly9uZnQuc3RvcmFnZS9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgYCxcbiAgICAgICAgKTtcbiAgICAgICAgaXNEaXNwbGF5V2FybmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29uc3RhbnRzLk5GVF9TVE9SQUdFX0FQSV9LRVk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDb25zdGFudHMubmZ0U3RvcmFnZUFwaUtleTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlR2F0ZXdheVVybCA9IChjaWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGAke0NvbnN0YW50cy5ORlRfU1RPUkFHRV9HQVRFV0FZX1VSTH0vJHtjaWR9YDtcblxuICBjb25zdCBjb25uZWN0ID0gKCkgPT4gbmV3IE5GVFN0b3JhZ2UoeyB0b2tlbjogZ2V0TmZ0U3RvcmFnZUFwaUtleSgpIH0pO1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlUGF0aCk7XG4gICAgICBsZXQgZmlsZSE6IEJ1ZmZlcjtcbiAgICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoIGFzIHN0cmluZztcbiAgICAgICAgZmlsZSA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlcGF0aCk7XG4gICAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGg7XG4gICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycpLmJ1ZmZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdXBwb3J0ZWQgZW52aXJvbm1lbnQ6IG9ubHkgTm9kZS5qcyBhbmQgQnJvd3NlciBqcycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9iSW1hZ2UgPSBuZXcgQmxvYihbZmlsZV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSW1hZ2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnRcbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlTWV0YWRhdGF9IG1ldGFkYXRhXG4gICAqIHtcbiAgICogICBuYW1lPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbD86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGRlc2NyaXB0aW9uPzoge3N0cmluZ30gICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIHNlbGxlckZlZUJhc2lzUG9pbnRzPzogbnVtYmVyICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBpbWFnZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgLy8gdXBsb2FkZWQgdXJpIG9mIG9yaWdpbmFsIGNvbnRlbnRcbiAgICogICBleHRlcm5hbF91cmw/OiB7c3RyaW5nfSAgICAgICAgICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiB7SnNvbk1ldGFkYXRhQXR0cmlidXRlW119ICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzoge0pzb25NZXRhZGF0YVByb3BlcnRpZXM8VXJpPn0gLy8gaW5jbHVkZWQgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogQ29sbGVjdGlvbiAgICAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgW2tleTogc3RyaW5nXToge3Vua25vd259ICAgICAgICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgdXBsb2FkTWV0YWRhdGEgPSBhc3luYyAoXG4gICAgbWV0YWRhdGE6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG5cbiAgICAgIGNvbnN0IGJsb2JKc29uID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KG1ldGFkYXRhKV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSnNvbik7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgRmlsZUNvbnRlbnQsXG4gIEluZnJhU2lkZUlucHV0LFxuICBTdG9yYWdlVHlwZSxcbiAgVXNlclNpZGVJbnB1dCxcbn0gZnJvbSAndHlwZXMvY29udmVydGVyJztcblxuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICd0eXBlcy9zdG9yYWdlJztcblxuaW1wb3J0IHsgQXJ3ZWF2ZSB9IGZyb20gJy4vYXJ3ZWF2ZSc7XG5pbXBvcnQgeyBOZnRTdG9yYWdlIH0gZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RvcmFnZSB7XG4gIGV4cG9ydCBjb25zdCB0b0NvbnZlcnRPZmZjaGFpbmRhdGEgPSAoXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgKTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXG4gICAgICBzZWxsZXJfZmVlX2Jhc2lzX3BvaW50czogc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICBleHRlcm5hbF91cmw6IGlucHV0LmV4dGVybmFsX3VybCxcbiAgICAgIGF0dHJpYnV0ZXM6IGlucHV0LmF0dHJpYnV0ZXMsXG4gICAgICBwcm9wZXJ0aWVzOiBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgaW1hZ2U6ICcnLFxuICAgICAgb3B0aW9uczogaW5wdXQub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkQ29udGVudChmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFBbmRDb250ZW50ID0gYXN5bmMgKFxuICAgIGlucHV0OiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGxldCBzdG9yYWdlO1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICAgIGF3YWl0IEFyd2VhdmUudXBsb2FkQ29udGVudChmaWxlUGF0aCwgZmVlUGF5ZXIpXG4gICAgICApLnVud3JhcChcbiAgICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZE1ldGFkYXRhKGlucHV0LCBmZWVQYXllcik7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICAgIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aClcbiAgICAgICkudW53cmFwKFxuICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkTWV0YWRhdGEoaW5wdXQpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBzdG9yYWdlVHlwZScpO1xuICAgIH1cblxuICAgIGlmICghc3RvcmFnZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0VtcHR5IHN0b3JhZ2Ugb2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBzdG9yYWdlO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxJQUFBQSxhQUE2QztBQUU3QyxJQUFBQyxpQkFPTzs7O0FDVFAsZ0JBTU87QUFHUCxvQkFBZ0M7QUFHekIsSUFBVTtBQUFBLENBQVYsQ0FBVUMsWUFBVjtBQUNMLFFBQU0seUJBQXlCO0FBRXhCLEVBQU1BLFFBQUEsT0FBTyxDQUFDLGFBQWdEO0FBQ25FLFVBQU0sU0FBUyxVQUFBQyxTQUFtQixLQUFLLG1CQUFLLGNBQWMsQ0FBQyxFQUFFO0FBQUEsVUFDM0QseUJBQWM7QUFBQSxRQUNaLFNBQVMsd0JBQVU7QUFBQSxR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TztBQUFBLE1BQ1AsU0FBUyxNQUFNO0FBQUEsSUFDakI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVPLEVBQU1BLFNBQUEsZ0JBQWdCLENBQzNCLFVBQ0EsYUFDQSxhQUNtQztBQUNuQyxRQUFJLGdCQUFnQixXQUFXO0FBQzdCLFVBQUksQ0FBQyxVQUFVO0FBQ2IsY0FBTSxNQUFNLGdDQUFnQztBQUFBLE1BQzlDO0FBQ0EsYUFBTyxNQUFNLFFBQVEsY0FBYyxVQUFVLFFBQVE7QUFBQSxJQUN2RCxXQUFXLGdCQUFnQixjQUFjO0FBQ3ZDLGFBQU8sTUFBTSxXQUFXLGNBQWMsUUFBUTtBQUFBLElBQ2hELE9BQU87QUFDTCxZQUFNLE1BQU0sdUJBQXVCO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBRU8sRUFBTUEsU0FBQSx1QkFBdUIsQ0FDbEMsT0FDQSxVQUNBLGFBQ0EsYUFDbUM7QUFDbkMsUUFBSTtBQUNKLFFBQUksZ0JBQWdCLFdBQVc7QUFDN0IsVUFBSSxDQUFDLFVBQVU7QUFDYixjQUFNLE1BQU0sZ0NBQWdDO0FBQUEsTUFDOUM7QUFDQSxnQkFBVSxPQUNSLE1BQU0sUUFBUSxjQUFjLFVBQVUsUUFBUSxHQUM5QztBQUFBLFFBQ0EsQ0FBTyxPQUFlO0FBQ3BCLGdCQUFNLFFBQVE7QUFDZCxpQkFBTyxNQUFNLFFBQVEsZUFBZSxPQUFPLFFBQVE7QUFBQSxRQUNyRDtBQUFBLFFBQ0EsQ0FBQyxRQUFlO0FBQ2QsZ0JBQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsV0FBVyxnQkFBZ0IsY0FBYztBQUN2QyxnQkFBVSxPQUNSLE1BQU0sV0FBVyxjQUFjLFFBQVEsR0FDdkM7QUFBQSxRQUNBLENBQU8sT0FBZTtBQUNwQixnQkFBTSxRQUFRO0FBQ2QsaUJBQU8sTUFBTSxXQUFXLGVBQWUsS0FBSztBQUFBLFFBQzlDO0FBQUEsUUFDQSxDQUFDLFFBQWU7QUFDZCxnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixPQUFPO0FBQ0wsWUFBTSxNQUFNLHNCQUFzQjtBQUFBLElBQ3BDO0FBRUEsUUFBSSxDQUFDLFNBQVM7QUFDWixZQUFNLE1BQU0sc0JBQXNCO0FBQUEsSUFDcEM7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEdBOUVlOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanMiLCAiaW1wb3J0X3NoYXJlZCIsICJCdW5kbHIiLCAiTWV0YXBsZXhGb3VuZGF0aW9uIiwgIkFyd2VhdmUiLCAiaW1wb3J0X3NoYXJlZCIsICJpbXBvcnRfanMiLCAiTmZ0U3RvcmFnZSIsICJTdG9yYWdlIl0KfQo=