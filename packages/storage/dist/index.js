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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9hcndlYXZlLnRzIiwgIi4uL3NyYy9idW5kbHIudHMiLCAiLi4vc3JjL25mdC1zdG9yYWdlLnRzIiwgIi4uL3NyYy9zdG9yYWdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2Fyd2VhdmUnO1xuZXhwb3J0ICogZnJvbSAnLi9idW5kbHInO1xuZXhwb3J0ICogZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5leHBvcnQgKiBmcm9tICcuL3N0b3JhZ2UnO1xuIiwgImltcG9ydCB7IE1ldGFwbGV4RmlsZSwgdG9NZXRhcGxleEZpbGUgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9qcyc7XG5cbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBpc0Jyb3dzZXIsXG4gIGlzTm9kZSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgRmlsZUNvbnRlbnQsIEluZnJhU2lkZUlucHV0IH0gZnJvbSAnc2hhcmVkLW1ldGFwbGV4Lyc7XG5pbXBvcnQgeyBCdW5kbHIgfSBmcm9tICcuL2J1bmRscic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YXBsZXhGaWxlT3B0aW9ucyB7XG4gIHJlYWRvbmx5IGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHVuaXF1ZU5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgY29udGVudFR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgZXh0ZW5zaW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IHRhZ3M6IHsgbmFtZTogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIH1bXTtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBBcndlYXZlIHtcbiAgZXhwb3J0IGNvbnN0IHVwbG9hZENvbnRlbnQgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVDb250ZW50LFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgZmlsZU9wdGlvbnM/OiBNZXRhcGxleEZpbGVPcHRpb25zLCAvLyBvbmx5IGFyd2VhdmUsIG5vdCBuZnQtc3RvcmFnZVxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQ6ICcsIGZpbGVQYXRoKTtcbiAgICAgIGxldCBmaWxlITogTWV0YXBsZXhGaWxlO1xuICAgICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGggYXMgc3RyaW5nO1xuICAgICAgICBjb25zdCBidWZmZXIgPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoZmlsZXBhdGgpO1xuICAgICAgICBpZiAoZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoYnVmZmVyLCBmaWxlcGF0aCwgZmlsZU9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShidWZmZXIsIGZpbGVwYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICBpZiAoZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnLCBmaWxlT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGZpbGVwYXRoLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdXBwb3J0ZWQgZW52aXJvbm1lbnQ6IG9ubHkgTm9kZS5qcyBhbmQgQnJvd3NlciBqcycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQnVuZGxyLnVzZVN0b3JhZ2UoZmVlUGF5ZXIudG9LZXlwYWlyKCkpLnVwbG9hZChmaWxlKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkTWV0YWRhdGEgPSBhc3luYyAoXG4gICAgbWV0YWRhdGE6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgbWV0YSBkYXRhOiAnLCBtZXRhZGF0YSk7XG5cbiAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgQnVuZGxyLm1ha2UoZmVlUGF5ZXIudG9LZXlwYWlyKCkpXG4gICAgICAgIC5uZnRzKClcbiAgICAgICAgLnVwbG9hZE1ldGFkYXRhKG1ldGFkYXRhKTtcblxuICAgICAgcmV0dXJuIHVwbG9hZGVkLnVyaTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBNZXRhcGxleCBhcyBNZXRhcGxleEZvdW5kYXRpb24sXG4gIGtleXBhaXJJZGVudGl0eSxcbiAgYnVuZGxyU3RvcmFnZSxcbiAgQnVuZGxyU3RvcmFnZURyaXZlcixcbiAgd2FsbGV0QWRhcHRlcklkZW50aXR5LFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9qcyc7XG5cbmltcG9ydCB7IEtleXBhaXIgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSwgQ29uc3RhbnRzIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgQnVuZGxyU2lnbmVyLCBQaGFudG9tIH0gZnJvbSAnLi90eXBlcy9idW5kbHInO1xuXG5leHBvcnQgbmFtZXNwYWNlIEJ1bmRsciB7XG4gIGNvbnN0IEJVTkRMUl9DT05ORUNUX1RJTUVPVVQgPSA2MDAwMDtcblxuICBleHBvcnQgY29uc3QgbWFrZSA9IChmZWVQYXllcj86IEJ1bmRsclNpZ25lcik6IE1ldGFwbGV4Rm91bmRhdGlvbiA9PiB7XG4gICAgY29uc3Qgb2JqZWN0ID0gTWV0YXBsZXhGb3VuZGF0aW9uLm1ha2UoTm9kZS5nZXRDb25uZWN0aW9uKCkpLnVzZShcbiAgICAgIGJ1bmRsclN0b3JhZ2Uoe1xuICAgICAgICBhZGRyZXNzOiBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMLFxuICAgICAgICBwcm92aWRlclVybDogQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICAgICAgfSksXG4gICAgICAgIHRpbWVvdXQ6IEJVTkRMUl9DT05ORUNUX1RJTUVPVVQsXG4gICAgICB9KSxcbiAgICApO1xuICAgIGlmIChpc0tleXBhaXIoZmVlUGF5ZXIpKSB7XG4gICAgICBvYmplY3QudXNlKGtleXBhaXJJZGVudGl0eShmZWVQYXllcikpO1xuICAgIH0gZWxzZSBpZiAoaXNQaGFudG9tKGZlZVBheWVyKSkge1xuICAgICAgb2JqZWN0LnVzZSh3YWxsZXRBZGFwdGVySWRlbnRpdHkoZmVlUGF5ZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXNlU3RvcmFnZSA9IChmZWVQYXllcjogQnVuZGxyU2lnbmVyKTogQnVuZGxyU3RvcmFnZURyaXZlciA9PiB7XG4gICAgcmV0dXJuIG1ha2UoZmVlUGF5ZXIpLnN0b3JhZ2UoKS5kcml2ZXIoKSBhcyBCdW5kbHJTdG9yYWdlRHJpdmVyO1xuICB9O1xuXG4gIGNvbnN0IGlzS2V5cGFpciA9IChwYXllcjogQnVuZGxyU2lnbmVyKTogcGF5ZXIgaXMgS2V5cGFpciA9PiB7XG4gICAgaWYgKCFwYXllcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJ3NlY3JldEtleScgaW4gcGF5ZXI7XG4gIH07XG5cbiAgY29uc3QgaXNQaGFudG9tID0gKHBheWVyOiBCdW5kbHJTaWduZXIpOiBwYXllciBpcyBQaGFudG9tID0+IHtcbiAgICBpZiAoIXBheWVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAnY29ubmVjdCcgaW4gcGF5ZXI7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTkZUU3RvcmFnZSwgQmxvYiB9IGZyb20gJ25mdC5zdG9yYWdlJztcbmltcG9ydCB7XG4gIENvbnN0YW50cyxcbiAgUmVzdWx0LFxuICBpc05vZGUsXG4gIGlzQnJvd3NlcixcbiAgZGVidWdMb2csXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5pbXBvcnQgeyB0b01ldGFwbGV4RmlsZSB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL2pzJztcbmltcG9ydCB7IEluZnJhU2lkZUlucHV0LCBGaWxlQ29udGVudCB9IGZyb20gJ3NoYXJlZC1tZXRhcGxleCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTmZ0U3RvcmFnZSB7XG4gIGxldCBpc0Rpc3BsYXlXYXJuaW5nID0gZmFsc2U7XG4gIGNvbnN0IGdldE5mdFN0b3JhZ2VBcGlLZXkgPSAoKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIUNvbnN0YW50cy5uZnRTdG9yYWdlQXBpS2V5KSB7XG4gICAgICBpZiAoIWlzRGlzcGxheVdhcm5pbmcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBcbiAgICAgICAgW1dhcm5pbmddXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIElmIHdpbGwgdXNlIEBzb2xhbmEtc3VpdGUvbmZ0IHBhY2thZ2VcbiAgICAgICAgeW91ciBuZWVkIHRvIHVwZGF0ZSBuZnRTdG9yYWdlLmFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBjYW4gZ2V0IGFwaUtleSBmcm9tIGh0dHBzOi8vbmZ0LnN0b3JhZ2UvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGAsXG4gICAgICAgICk7XG4gICAgICAgIGlzRGlzcGxheVdhcm5pbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIENvbnN0YW50cy5ORlRfU1RPUkFHRV9BUElfS0VZO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ29uc3RhbnRzLm5mdFN0b3JhZ2VBcGlLZXk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUdhdGV3YXlVcmwgPSAoY2lkOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICBgJHtDb25zdGFudHMuTkZUX1NUT1JBR0VfR0FURVdBWV9VUkx9LyR7Y2lkfWA7XG5cbiAgY29uc3QgY29ubmVjdCA9ICgpID0+IG5ldyBORlRTdG9yYWdlKHsgdG9rZW46IGdldE5mdFN0b3JhZ2VBcGlLZXkoKSB9KTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudDogJywgZmlsZVBhdGgpO1xuICAgICAgbGV0IGZpbGUhOiBCdWZmZXI7XG4gICAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aCBhcyBzdHJpbmc7XG4gICAgICAgIGZpbGUgPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoZmlsZXBhdGgpO1xuICAgICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnKS5idWZmZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcignU3VwcG9ydGVkIGVudmlyb25tZW50OiBvbmx5IE5vZGUuanMgYW5kIEJyb3dzZXIganMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmxvYkltYWdlID0gbmV3IEJsb2IoW2ZpbGVdKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkltYWdlKTtcbiAgICAgIHJldHVybiBjcmVhdGVHYXRld2F5VXJsKHJlcyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZU1ldGFkYXRhfSBtZXRhZGF0YVxuICAgKiB7XG4gICAqICAgbmFtZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBkZXNjcmlwdGlvbj86IHtzdHJpbmd9ICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBzZWxsZXJGZWVCYXNpc1BvaW50cz86IG51bWJlciAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgaW1hZ2U/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgIC8vIHVwbG9hZGVkIHVyaSBvZiBvcmlnaW5hbCBjb250ZW50XG4gICAqICAgZXh0ZXJuYWxfdXJsPzoge3N0cmluZ30gICAgICAgICAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzoge0pzb25NZXRhZGF0YUF0dHJpYnV0ZVtdfSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IHtKc29uTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT59IC8vIGluY2x1ZGVkIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IENvbGxlY3Rpb24gICAgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIFtrZXk6IHN0cmluZ106IHt1bmtub3dufSAgICAgICAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogfVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFkYXRhID0gYXN5bmMgKFxuICAgIG1ldGFkYXRhOiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuXG4gICAgICBjb25zdCBibG9iSnNvbiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShtZXRhZGF0YSldKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkpzb24pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFNlY3JldCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7XG4gIEZpbGVDb250ZW50LFxuICBJbmZyYVNpZGVJbnB1dCxcbiAgU3RvcmFnZVR5cGUsXG4gIFVzZXJTaWRlSW5wdXQsXG59IGZyb20gJ3NoYXJlZC1tZXRhcGxleCc7XG5cbmltcG9ydCB7IEFyd2VhdmUgfSBmcm9tICcuL2Fyd2VhdmUnO1xuaW1wb3J0IHsgTmZ0U3RvcmFnZSB9IGZyb20gJy4vbmZ0LXN0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0b3JhZ2Uge1xuICBleHBvcnQgY29uc3QgdG9Db252ZXJ0T2ZmY2hhaW5kYXRhID0gKFxuICAgIGlucHV0OiBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICk6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluID0+IHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgZGVzY3JpcHRpb246IGlucHV0LmRlc2NyaXB0aW9uLFxuICAgICAgc2VsbGVyX2ZlZV9iYXNpc19wb2ludHM6IHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgZXh0ZXJuYWxfdXJsOiBpbnB1dC5leHRlcm5hbF91cmwsXG4gICAgICBhdHRyaWJ1dGVzOiBpbnB1dC5hdHRyaWJ1dGVzLFxuICAgICAgcHJvcGVydGllczogaW5wdXQucHJvcGVydGllcyxcbiAgICAgIGltYWdlOiAnJyxcbiAgICAgIG9wdGlvbnM6IGlucHV0Lm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRNZXRhQW5kQ29udGVudCA9IGFzeW5jIChcbiAgICBpbnB1dDogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4sXG4gICAgZmlsZVBhdGg6IEZpbGVDb250ZW50LFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBsZXQgc3RvcmFnZTtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgICBhd2FpdCBBcndlYXZlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgsIGZlZVBheWVyKVxuICAgICAgKS51bndyYXAoXG4gICAgICAgIGFzeW5jIChvazogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaW5wdXQuaW1hZ2UgPSBvaztcbiAgICAgICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWRNZXRhZGF0YShpbnB1dCwgZmVlUGF5ZXIpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgICBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgpXG4gICAgICApLnVud3JhcChcbiAgICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZE1ldGFkYXRhKGlucHV0KTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggc3RvcmFnZVR5cGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXN0b3JhZ2UpIHtcbiAgICAgIHRocm93IEVycm9yKCdFbXB0eSBzdG9yYWdlIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gc3RvcmFnZTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsSUFBQUEsYUFBNkM7QUFFN0MsSUFBQUMsaUJBT087OztBQ1RQLGdCQU1PO0FBR1Asb0JBQWdDO0FBR3pCLElBQVU7QUFBQSxDQUFWLENBQVVDLFlBQVY7QUFDTCxRQUFNLHlCQUF5QjtBQUV4QixFQUFNQSxRQUFBLE9BQU8sQ0FBQyxhQUFnRDtBQUNuRSxVQUFNLFNBQVMsVUFBQUMsU0FBbUIsS0FBSyxtQkFBSyxjQUFjLENBQUMsRUFBRTtBQUFBLFVBQzNELHlCQUFjO0FBQUEsUUFDWixTQUFTLHdCQUFVO0FBQUEsUUFDbkIsYUFBYSx3QkFBVSxjQUFjO0FBQUEsVUFDbkMsU0FBUyx3QkFBVTtBQUFB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LEVBQ1Q7QUFFTyxFQUFNQSxTQUFBLGdCQUFnQixDQUMzQixVQUNBLGFBQ0EsYUFDbUM7QUFDbkMsUUFBSSxnQkFBZ0IsV0FBVztBQUM3QixVQUFJLENBQUMsVUFBVTtBQUNiLGNBQU0sTUFBTSxnQ0FBZ0M7QUFBQSxNQUM5QztBQUNBLGFBQU8sTUFBTSxRQUFRLGNBQWMsVUFBVSxRQUFRO0FBQUEsSUFDdkQsV0FBVyxnQkFBZ0IsY0FBYztBQUN2QyxhQUFPLE1BQU0sV0FBVyxjQUFjLFFBQVE7QUFBQSxJQUNoRCxPQUFPO0FBQ0wsWUFBTSxNQUFNLHVCQUF1QjtBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUVPLEVBQU1BLFNBQUEsdUJBQXVCLENBQ2xDLE9BQ0EsVUFDQSxhQUNBLGFBQ21DO0FBQ25DLFFBQUk7QUFDSixRQUFJLGdCQUFnQixXQUFXO0FBQzdCLFVBQUksQ0FBQyxVQUFVO0FBQ2IsY0FBTSxNQUFNLGdDQUFnQztBQUFBLE1BQzlDO0FBQ0EsZ0JBQVUsT0FDUixNQUFNLFFBQVEsY0FBYyxVQUFVLFFBQVEsR0FDOUM7QUFBQSxRQUNBLENBQU8sT0FBZTtBQUNwQixnQkFBTSxRQUFRO0FBQ2QsaUJBQU8sTUFBTSxRQUFRLGVBQWUsT0FBTyxRQUFRO0FBQUEsUUFDckQ7QUFBQSxRQUNBLENBQUMsUUFBZTtBQUNkLGdCQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLFdBQVcsZ0JBQWdCLGNBQWM7QUFDdkMsZ0JBQVUsT0FDUixNQUFNLFdBQVcsY0FBYyxRQUFRLEdBQ3ZDO0FBQUEsUUFDQSxDQUFPLE9BQWU7QUFDcEIsZ0JBQU0sUUFBUTtBQUNkLGlCQUFPLE1BQU0sV0FBVyxlQUFlLEtBQUs7QUFBQSxRQUM5QztBQUFBLFFBQ0EsQ0FBQyxRQUFlO0FBQ2QsZ0JBQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsT0FBTztBQUNMLFlBQU0sTUFBTSxzQkFBc0I7QUFBQSxJQUNwQztBQUVBLFFBQUksQ0FBQyxTQUFTO0FBQ1osWUFBTSxNQUFNLHNCQUFzQjtBQUFBLElBQ3BDO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFBQSxHQTlFZTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2pzIiwgImltcG9ydF9zaGFyZWQiLCAiQnVuZGxyIiwgIk1ldGFwbGV4Rm91bmRhdGlvbiIsICJBcndlYXZlIiwgImltcG9ydF9zaGFyZWQiLCAiaW1wb3J0X2pzIiwgIk5mdFN0b3JhZ2UiLCAiU3RvcmFnZSJdCn0K