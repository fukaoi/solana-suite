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

// ../internal/storage/src/index.ts
var src_exports = {};
__export(src_exports, {
  Arweave: () => Arweave,
  Bundlr: () => Bundlr,
  NftStorage: () => NftStorage,
  Storage: () => Storage
});
module.exports = __toCommonJS(src_exports);

// ../internal/storage/src/arweave.ts
var import_js2 = require("@metaplex-foundation/js");
var import_shared2 = require("@solana-suite/shared");

// ../internal/storage/src/bundlr.ts
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

// ../internal/storage/src/arweave.ts
var Arweave;
((Arweave2) => {
  Arweave2.getUploadPrice = (filePath, feePayer) => __async(void 0, null, function* () {
    return (0, import_shared2.Try)(() => __async(void 0, null, function* () {
      let buffer;
      if ((0, import_shared2.isNode)()) {
        const filepath = filePath;
        buffer = (yield import("fs")).readFileSync(filepath);
      } else if ((0, import_shared2.isBrowser)()) {
        const filepath = filePath;
        buffer = (0, import_js2.toMetaplexFile)(filepath, "").buffer;
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      const res = yield Bundlr.useStorage(feePayer.toKeypair()).getUploadPrice(
        buffer.length
      );
      const basisPoints = res.basisPoints.toString();
      (0, import_shared2.debugLog)(
        "# buffer length, price",
        buffer.length,
        parseInt(basisPoints).toSol()
      );
      return {
        price: parseInt(basisPoints).toSol(),
        currency: res.currency
      };
    }));
  });
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

// ../internal/storage/src/nft-storage.ts
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

// ../internal/storage/src/storage.ts
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvYXJ3ZWF2ZS50cyIsICIuLi8uLi8uLi9pbnRlcm5hbC9zdG9yYWdlL3NyYy9idW5kbHIudHMiLCAiLi4vLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvc3RvcmFnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0ICogZnJvbSAnLi9hcndlYXZlJztcbmV4cG9ydCAqIGZyb20gJy4vYnVuZGxyJztcbmV4cG9ydCAqIGZyb20gJy4vbmZ0LXN0b3JhZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9zdG9yYWdlJztcbiIsICJpbXBvcnQge1xuICBDdXJyZW5jeSxcbiAgTWV0YXBsZXhGaWxlLFxuICB0b01ldGFwbGV4RmlsZSxcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vanMnO1xuXG5pbXBvcnQge1xuICBkZWJ1Z0xvZyxcbiAgaXNCcm93c2VyLFxuICBpc05vZGUsXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEZpbGVDb250ZW50LCBJbmZyYVNpZGVJbnB1dCB9IGZyb20gJ2ludGVybmFsL3NoYXJlZC1tZXRhcGxleC8nO1xuaW1wb3J0IHsgQnVuZGxyIH0gZnJvbSAnLi9idW5kbHInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFwbGV4RmlsZU9wdGlvbnMge1xuICByZWFkb25seSBkaXNwbGF5TmFtZTogc3RyaW5nO1xuICByZWFkb25seSB1bmlxdWVOYW1lOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNvbnRlbnRUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IGV4dGVuc2lvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSB0YWdzOiB7IG5hbWU6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9W107XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQXJ3ZWF2ZSB7XG4gIGV4cG9ydCBjb25zdCBnZXRVcGxvYWRQcmljZSA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8eyBwcmljZTogbnVtYmVyOyBjdXJyZW5jeTogQ3VycmVuY3kgfSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgYnVmZmVyITogQnVmZmVyO1xuICAgICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGggYXMgc3RyaW5nO1xuICAgICAgICBidWZmZXIgPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoZmlsZXBhdGgpO1xuICAgICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICBidWZmZXIgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycpLmJ1ZmZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdXBwb3J0ZWQgZW52aXJvbm1lbnQ6IG9ubHkgTm9kZS5qcyBhbmQgQnJvd3NlciBqcycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBCdW5kbHIudXNlU3RvcmFnZShmZWVQYXllci50b0tleXBhaXIoKSkuZ2V0VXBsb2FkUHJpY2UoXG4gICAgICAgIGJ1ZmZlci5sZW5ndGgsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBiYXNpc1BvaW50czogc3RyaW5nID0gcmVzLmJhc2lzUG9pbnRzLnRvU3RyaW5nKCk7XG4gICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgJyMgYnVmZmVyIGxlbmd0aCwgcHJpY2UnLFxuICAgICAgICBidWZmZXIubGVuZ3RoLFxuICAgICAgICBwYXJzZUludChiYXNpc1BvaW50cykudG9Tb2woKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcmljZTogcGFyc2VJbnQoYmFzaXNQb2ludHMpLnRvU29sKCksXG4gICAgICAgIGN1cnJlbmN5OiByZXMuY3VycmVuY3ksXG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgIGZpbGVPcHRpb25zPzogTWV0YXBsZXhGaWxlT3B0aW9ucywgLy8gb25seSBhcndlYXZlLCBub3QgbmZ0LXN0b3JhZ2VcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlUGF0aCk7XG4gICAgICBsZXQgZmlsZSE6IE1ldGFwbGV4RmlsZTtcbiAgICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoIGFzIHN0cmluZztcbiAgICAgICAgY29uc3QgYnVmZmVyID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVwYXRoKTtcbiAgICAgICAgaWYgKGZpbGVPcHRpb25zKSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGJ1ZmZlciwgZmlsZXBhdGgsIGZpbGVPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoYnVmZmVyLCBmaWxlcGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgaWYgKGZpbGVPcHRpb25zKSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGZpbGVwYXRoLCAnJywgZmlsZU9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcignU3VwcG9ydGVkIGVudmlyb25tZW50OiBvbmx5IE5vZGUuanMgYW5kIEJyb3dzZXIganMnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIEJ1bmRsci51c2VTdG9yYWdlKGZlZVBheWVyLnRvS2V5cGFpcigpKS51cGxvYWQoZmlsZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFkYXRhID0gYXN5bmMgKFxuICAgIG1ldGFkYXRhOiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGEgZGF0YTogJywgbWV0YWRhdGEpO1xuXG4gICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IEJ1bmRsci5tYWtlKGZlZVBheWVyLnRvS2V5cGFpcigpKVxuICAgICAgICAubmZ0cygpXG4gICAgICAgIC51cGxvYWRNZXRhZGF0YShtZXRhZGF0YSk7XG5cbiAgICAgIHJldHVybiB1cGxvYWRlZC51cmk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgTWV0YXBsZXggYXMgTWV0YXBsZXhGb3VuZGF0aW9uLFxuICBrZXlwYWlySWRlbnRpdHksXG4gIGJ1bmRsclN0b3JhZ2UsXG4gIEJ1bmRsclN0b3JhZ2VEcml2ZXIsXG4gIHdhbGxldEFkYXB0ZXJJZGVudGl0eSxcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vanMnO1xuXG5pbXBvcnQgeyBLZXlwYWlyIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUsIENvbnN0YW50cyB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEJ1bmRsclNpZ25lciwgUGhhbnRvbSB9IGZyb20gJy4vdHlwZXMvYnVuZGxyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBCdW5kbHIge1xuICBjb25zdCBCVU5ETFJfQ09OTkVDVF9USU1FT1VUID0gNjAwMDA7XG5cbiAgZXhwb3J0IGNvbnN0IG1ha2UgPSAoZmVlUGF5ZXI/OiBCdW5kbHJTaWduZXIpOiBNZXRhcGxleEZvdW5kYXRpb24gPT4ge1xuICAgIGNvbnN0IG9iamVjdCA9IE1ldGFwbGV4Rm91bmRhdGlvbi5tYWtlKE5vZGUuZ2V0Q29ubmVjdGlvbigpKS51c2UoXG4gICAgICBidW5kbHJTdG9yYWdlKHtcbiAgICAgICAgYWRkcmVzczogQ29uc3RhbnRzLkJVTkRMUl9ORVRXT1JLX1VSTCxcbiAgICAgICAgcHJvdmlkZXJVcmw6IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICAgIH0pLFxuICAgICAgICB0aW1lb3V0OiBCVU5ETFJfQ09OTkVDVF9USU1FT1VULFxuICAgICAgfSlcbiAgICApO1xuICAgIGlmIChpc0tleXBhaXIoZmVlUGF5ZXIpKSB7XG4gICAgICBvYmplY3QudXNlKGtleXBhaXJJZGVudGl0eShmZWVQYXllcikpO1xuICAgIH0gZWxzZSBpZiAoaXNQaGFudG9tKGZlZVBheWVyKSkge1xuICAgICAgb2JqZWN0LnVzZSh3YWxsZXRBZGFwdGVySWRlbnRpdHkoZmVlUGF5ZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXNlU3RvcmFnZSA9IChmZWVQYXllcjogQnVuZGxyU2lnbmVyKTogQnVuZGxyU3RvcmFnZURyaXZlciA9PiB7XG4gICAgcmV0dXJuIG1ha2UoZmVlUGF5ZXIpLnN0b3JhZ2UoKS5kcml2ZXIoKSBhcyBCdW5kbHJTdG9yYWdlRHJpdmVyO1xuICB9O1xuXG4gIGNvbnN0IGlzS2V5cGFpciA9IChwYXllcjogQnVuZGxyU2lnbmVyKTogcGF5ZXIgaXMgS2V5cGFpciA9PiB7XG4gICAgaWYgKCFwYXllcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJ3NlY3JldEtleScgaW4gcGF5ZXI7XG4gIH07XG5cbiAgY29uc3QgaXNQaGFudG9tID0gKHBheWVyOiBCdW5kbHJTaWduZXIpOiBwYXllciBpcyBQaGFudG9tID0+IHtcbiAgICBpZiAoIXBheWVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAnY29ubmVjdCcgaW4gcGF5ZXI7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTkZUU3RvcmFnZSwgQmxvYiB9IGZyb20gJ25mdC5zdG9yYWdlJztcbmltcG9ydCB7XG4gIENvbnN0YW50cyxcbiAgUmVzdWx0LFxuICBpc05vZGUsXG4gIGlzQnJvd3NlcixcbiAgZGVidWdMb2csXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5pbXBvcnQgeyB0b01ldGFwbGV4RmlsZSB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL2pzJztcbmltcG9ydCB7IEluZnJhU2lkZUlucHV0LCBGaWxlQ29udGVudCB9IGZyb20gJ2ludGVybmFsL3NoYXJlZC1tZXRhcGxleCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTmZ0U3RvcmFnZSB7XG4gIGxldCBpc0Rpc3BsYXlXYXJuaW5nID0gZmFsc2U7XG4gIGNvbnN0IGdldE5mdFN0b3JhZ2VBcGlLZXkgPSAoKTogc3RyaW5nID0+IHtcbiAgICBpZiAoIUNvbnN0YW50cy5uZnRTdG9yYWdlQXBpS2V5KSB7XG4gICAgICBpZiAoIWlzRGlzcGxheVdhcm5pbmcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBcbiAgICAgICAgW1dhcm5pbmddXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIElmIHdpbGwgdXNlIEBzb2xhbmEtc3VpdGUvbmZ0IHBhY2thZ2VcbiAgICAgICAgeW91ciBuZWVkIHRvIHVwZGF0ZSBuZnRTdG9yYWdlLmFwaUtleSBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBjYW4gZ2V0IGFwaUtleSBmcm9tIGh0dHBzOi8vbmZ0LnN0b3JhZ2UvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGBcbiAgICAgICAgKTtcbiAgICAgICAgaXNEaXNwbGF5V2FybmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29uc3RhbnRzLk5GVF9TVE9SQUdFX0FQSV9LRVk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDb25zdGFudHMubmZ0U3RvcmFnZUFwaUtleTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlR2F0ZXdheVVybCA9IChjaWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGAke0NvbnN0YW50cy5ORlRfU1RPUkFHRV9HQVRFV0FZX1VSTH0vJHtjaWR9YDtcblxuICBjb25zdCBjb25uZWN0ID0gKCkgPT4gbmV3IE5GVFN0b3JhZ2UoeyB0b2tlbjogZ2V0TmZ0U3RvcmFnZUFwaUtleSgpIH0pO1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQ6ICcsIGZpbGVQYXRoKTtcbiAgICAgIGxldCBmaWxlITogQnVmZmVyO1xuICAgICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGggYXMgc3RyaW5nO1xuICAgICAgICBmaWxlID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVwYXRoKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGZpbGVwYXRoLCAnJykuYnVmZmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1N1cHBvcnRlZCBlbnZpcm9ubWVudDogb25seSBOb2RlLmpzIGFuZCBCcm93c2VyIGpzJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJsb2JJbWFnZSA9IG5ldyBCbG9iKFtmaWxlXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JJbWFnZSk7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudFxuICAgKlxuICAgKiBAcGFyYW0ge1N0b3JhZ2VNZXRhZGF0YX0gbWV0YWRhdGFcbiAgICoge1xuICAgKiAgIG5hbWU/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZGVzY3JpcHRpb24/OiB7c3RyaW5nfSAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgc2VsbGVyRmVlQmFzaXNQb2ludHM/OiBudW1iZXIgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGltYWdlPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAvLyB1cGxvYWRlZCB1cmkgb2Ygb3JpZ2luYWwgY29udGVudFxuICAgKiAgIGV4dGVybmFsX3VybD86IHtzdHJpbmd9ICAgICAgICAgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IHtKc29uTWV0YWRhdGFBdHRyaWJ1dGVbXX0gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiB7SnNvbk1ldGFkYXRhUHJvcGVydGllczxVcmk+fSAvLyBpbmNsdWRlZCBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uICAgICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddOiB7dW5rbm93bn0gICAgICAgICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRNZXRhZGF0YSA9IGFzeW5jIChcbiAgICBtZXRhZGF0YTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW5cbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuXG4gICAgICBjb25zdCBibG9iSnNvbiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShtZXRhZGF0YSldKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkpzb24pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQsIFNlY3JldCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7XG4gIEZpbGVDb250ZW50LFxuICBJbmZyYVNpZGVJbnB1dCxcbiAgU3RvcmFnZVR5cGUsXG4gIFVzZXJTaWRlSW5wdXQsXG59IGZyb20gJ2ludGVybmFsL3NoYXJlZC1tZXRhcGxleCc7XG5cbmltcG9ydCB7IEFyd2VhdmUgfSBmcm9tICcuL2Fyd2VhdmUnO1xuaW1wb3J0IHsgTmZ0U3RvcmFnZSB9IGZyb20gJy4vbmZ0LXN0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0b3JhZ2Uge1xuICBleHBvcnQgY29uc3QgdG9Db252ZXJ0T2ZmY2hhaW5kYXRhID0gKFxuICAgIGlucHV0OiBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXJcbiAgKTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXG4gICAgICBzZWxsZXJfZmVlX2Jhc2lzX3BvaW50czogc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICBleHRlcm5hbF91cmw6IGlucHV0LmV4dGVybmFsX3VybCxcbiAgICAgIGF0dHJpYnV0ZXM6IGlucHV0LmF0dHJpYnV0ZXMsXG4gICAgICBwcm9wZXJ0aWVzOiBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgaW1hZ2U6ICcnLFxuICAgICAgb3B0aW9uczogaW5wdXQub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXRcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWRDb250ZW50KGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICByZXR1cm4gYXdhaXQgTmZ0U3RvcmFnZS51cGxvYWRDb250ZW50KGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vdCBmb3VuZCBzdG9yYWdlVHlwZScpO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkTWV0YUFuZENvbnRlbnQgPSBhc3luYyAoXG4gICAgaW5wdXQ6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXRcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBsZXQgc3RvcmFnZTtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgICBhd2FpdCBBcndlYXZlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgsIGZlZVBheWVyKVxuICAgICAgKS51bndyYXAoXG4gICAgICAgIGFzeW5jIChvazogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaW5wdXQuaW1hZ2UgPSBvaztcbiAgICAgICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWRNZXRhZGF0YShpbnB1dCwgZmVlUGF5ZXIpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICAgIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aClcbiAgICAgICkudW53cmFwKFxuICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkTWV0YWRhdGEoaW5wdXQpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vIG1hdGNoIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFzdG9yYWdlKSB7XG4gICAgICB0aHJvdyBFcnJvcignRW1wdHkgc3RvcmFnZSBvYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0b3JhZ2U7XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQ0FBLElBQUFBLGFBSU87QUFFUCxJ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