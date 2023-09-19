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

// src/arweave.ts
import {
  toMetaplexFile
} from "@metaplex-foundation/js";
import {
  debugLog,
  isBrowser,
  isNode,
  Try
} from "@solana-suite/shared";

// src/bundlr.ts
import {
  Metaplex as MetaplexFoundation,
  keypairIdentity,
  bundlrStorage,
  walletAdapterIdentity
} from "@metaplex-foundation/js";
import { Node, Constants } from "@solana-suite/shared";
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

// src/arweave.ts
var Arweave;
((Arweave2) => {
  Arweave2.getUploadPrice = (filePath, feePayer) => __async(void 0, null, function* () {
    return Try(() => __async(void 0, null, function* () {
      let buffer;
      if (isNode()) {
        const filepath = filePath;
        buffer = (yield import("fs")).readFileSync(filepath);
      } else if (isBrowser()) {
        const filepath = filePath;
        buffer = toMetaplexFile(filepath, "").buffer;
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      const res = yield Bundlr.useStorage(feePayer.toKeypair()).getUploadPrice(
        buffer.length
      );
      const basisPoints = res.basisPoints.toString();
      debugLog(
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
    return Try(() => __async(void 0, null, function* () {
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
  Arweave2.uploadMetadata = (metadata, feePayer) => __async(void 0, null, function* () {
    return Try(() => __async(void 0, null, function* () {
      debugLog("# upload meta data: ", metadata);
      const uploaded = yield Bundlr.make(feePayer.toKeypair()).nfts().uploadMetadata(metadata);
      return uploaded.uri;
    }));
  });
})(Arweave || (Arweave = {}));

// src/nft-storage.ts
import { NFTStorage, Blob } from "nft.storage";
import {
  Constants as Constants2,
  isNode as isNode2,
  isBrowser as isBrowser2,
  debugLog as debugLog2,
  Try as Try2
} from "@solana-suite/shared";
import { toMetaplexFile as toMetaplexFile2 } from "@metaplex-foundation/js";
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
  NftStorage2.uploadContent = (filePath) => __async(void 0, null, function* () {
    return Try2(() => __async(void 0, null, function* () {
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
  NftStorage2.uploadMetadata = (metadata) => __async(void 0, null, function* () {
    return Try2(() => __async(void 0, null, function* () {
      debugLog2("# upload metadata: ", metadata);
      const blobJson = new Blob([JSON.stringify(metadata)]);
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
export {
  Arweave,
  Bundlr,
  NftStorage,
  Storage
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2Fyd2VhdmUudHMiLCAiLi4vc3JjL2J1bmRsci50cyIsICIuLi9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vc3JjL3N0b3JhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7XG4gIEN1cnJlbmN5LFxuICBNZXRhcGxleEZpbGUsXG4gIHRvTWV0YXBsZXhGaWxlLFxufSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9qcyc7XG5cbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBpc0Jyb3dzZXIsXG4gIGlzTm9kZSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgRmlsZUNvbnRlbnQsIEluZnJhU2lkZUlucHV0IH0gZnJvbSAnaW50ZXJuYWxzL3NoYXJlZC1tZXRhcGxleC8nO1xuaW1wb3J0IHsgQnVuZGxyIH0gZnJvbSAnfi9idW5kbHInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFwbGV4RmlsZU9wdGlvbnMge1xuICByZWFkb25seSBkaXNwbGF5TmFtZTogc3RyaW5nO1xuICByZWFkb25seSB1bmlxdWVOYW1lOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNvbnRlbnRUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IGV4dGVuc2lvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSB0YWdzOiB7IG5hbWU6IHN0cmluZzsgdmFsdWU6IHN0cmluZyB9W107XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQXJ3ZWF2ZSB7XG4gIGV4cG9ydCBjb25zdCBnZXRVcGxvYWRQcmljZSA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8eyBwcmljZTogbnVtYmVyOyBjdXJyZW5jeTogQ3VycmVuY3kgfSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgYnVmZmVyITogQnVmZmVyO1xuICAgICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGggYXMgc3RyaW5nO1xuICAgICAgICBidWZmZXIgPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoZmlsZXBhdGgpO1xuICAgICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICBidWZmZXIgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycpLmJ1ZmZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdXBwb3J0ZWQgZW52aXJvbm1lbnQ6IG9ubHkgTm9kZS5qcyBhbmQgQnJvd3NlciBqcycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBCdW5kbHIudXNlU3RvcmFnZShmZWVQYXllci50b0tleXBhaXIoKSkuZ2V0VXBsb2FkUHJpY2UoXG4gICAgICAgIGJ1ZmZlci5sZW5ndGgsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBiYXNpc1BvaW50czogc3RyaW5nID0gcmVzLmJhc2lzUG9pbnRzLnRvU3RyaW5nKCk7XG4gICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgJyMgYnVmZmVyIGxlbmd0aCwgcHJpY2UnLFxuICAgICAgICBidWZmZXIubGVuZ3RoLFxuICAgICAgICBwYXJzZUludChiYXNpc1BvaW50cykudG9Tb2woKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcmljZTogcGFyc2VJbnQoYmFzaXNQb2ludHMpLnRvU29sKCksXG4gICAgICAgIGN1cnJlbmN5OiByZXMuY3VycmVuY3ksXG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgIGZpbGVPcHRpb25zPzogTWV0YXBsZXhGaWxlT3B0aW9ucywgLy8gb25seSBhcndlYXZlLCBub3QgbmZ0LXN0b3JhZ2VcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlUGF0aCk7XG4gICAgICBsZXQgZmlsZSE6IE1ldGFwbGV4RmlsZTtcbiAgICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoIGFzIHN0cmluZztcbiAgICAgICAgY29uc3QgYnVmZmVyID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVwYXRoKTtcbiAgICAgICAgaWYgKGZpbGVPcHRpb25zKSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGJ1ZmZlciwgZmlsZXBhdGgsIGZpbGVPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoYnVmZmVyLCBmaWxlcGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgaWYgKGZpbGVPcHRpb25zKSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGZpbGVwYXRoLCAnJywgZmlsZU9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcignU3VwcG9ydGVkIGVudmlyb25tZW50OiBvbmx5IE5vZGUuanMgYW5kIEJyb3dzZXIganMnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIEJ1bmRsci51c2VTdG9yYWdlKGZlZVBheWVyLnRvS2V5cGFpcigpKS51cGxvYWQoZmlsZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFkYXRhID0gYXN5bmMgKFxuICAgIG1ldGFkYXRhOiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgICBmZWVQYXllcjogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGEgZGF0YTogJywgbWV0YWRhdGEpO1xuXG4gICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IEJ1bmRsci5tYWtlKGZlZVBheWVyLnRvS2V5cGFpcigpKVxuICAgICAgICAubmZ0cygpXG4gICAgICAgIC51cGxvYWRNZXRhZGF0YShtZXRhZGF0YSk7XG5cbiAgICAgIHJldHVybiB1cGxvYWRlZC51cmk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgTWV0YXBsZXggYXMgTWV0YXBsZXhGb3VuZGF0aW9uLFxuICBrZXlwYWlySWRlbnRpdHksXG4gIGJ1bmRsclN0b3JhZ2UsXG4gIEJ1bmRsclN0b3JhZ2VEcml2ZXIsXG4gIHdhbGxldEFkYXB0ZXJJZGVudGl0eSxcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vanMnO1xuXG5pbXBvcnQgeyBLZXlwYWlyIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUsIENvbnN0YW50cyB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEJ1bmRsclNpZ25lciwgUGhhbnRvbSB9IGZyb20gJ34vdHlwZXMvYnVuZGxyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBCdW5kbHIge1xuICBjb25zdCBCVU5ETFJfQ09OTkVDVF9USU1FT1VUID0gNjAwMDA7XG5cbiAgZXhwb3J0IGNvbnN0IG1ha2UgPSAoZmVlUGF5ZXI/OiBCdW5kbHJTaWduZXIpOiBNZXRhcGxleEZvdW5kYXRpb24gPT4ge1xuICAgIGNvbnN0IG9iamVjdCA9IE1ldGFwbGV4Rm91bmRhdGlvbi5tYWtlKE5vZGUuZ2V0Q29ubmVjdGlvbigpKS51c2UoXG4gICAgICBidW5kbHJTdG9yYWdlKHtcbiAgICAgICAgYWRkcmVzczogQ29uc3RhbnRzLkJVTkRMUl9ORVRXT1JLX1VSTCxcbiAgICAgICAgcHJvdmlkZXJVcmw6IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICAgIH0pLFxuICAgICAgICB0aW1lb3V0OiBCVU5ETFJfQ09OTkVDVF9USU1FT1VULFxuICAgICAgfSksXG4gICAgKTtcbiAgICBpZiAoaXNLZXlwYWlyKGZlZVBheWVyKSkge1xuICAgICAgb2JqZWN0LnVzZShrZXlwYWlySWRlbnRpdHkoZmVlUGF5ZXIpKTtcbiAgICB9IGVsc2UgaWYgKGlzUGhhbnRvbShmZWVQYXllcikpIHtcbiAgICAgIG9iamVjdC51c2Uod2FsbGV0QWRhcHRlcklkZW50aXR5KGZlZVBheWVyKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVzZVN0b3JhZ2UgPSAoZmVlUGF5ZXI6IEJ1bmRsclNpZ25lcik6IEJ1bmRsclN0b3JhZ2VEcml2ZXIgPT4ge1xuICAgIHJldHVybiBtYWtlKGZlZVBheWVyKS5zdG9yYWdlKCkuZHJpdmVyKCkgYXMgQnVuZGxyU3RvcmFnZURyaXZlcjtcbiAgfTtcblxuICBjb25zdCBpc0tleXBhaXIgPSAocGF5ZXI6IEJ1bmRsclNpZ25lcik6IHBheWVyIGlzIEtleXBhaXIgPT4ge1xuICAgIGlmICghcGF5ZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICdzZWNyZXRLZXknIGluIHBheWVyO1xuICB9O1xuXG4gIGNvbnN0IGlzUGhhbnRvbSA9IChwYXllcjogQnVuZGxyU2lnbmVyKTogcGF5ZXIgaXMgUGhhbnRvbSA9PiB7XG4gICAgaWYgKCFwYXllcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJ2Nvbm5lY3QnIGluIHBheWVyO1xuICB9O1xufVxuIiwgImltcG9ydCB7IE5GVFN0b3JhZ2UsIEJsb2IgfSBmcm9tICduZnQuc3RvcmFnZSc7XG5pbXBvcnQge1xuICBDb25zdGFudHMsXG4gIFJlc3VsdCxcbiAgaXNOb2RlLFxuICBpc0Jyb3dzZXIsXG4gIGRlYnVnTG9nLFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuaW1wb3J0IHsgdG9NZXRhcGxleEZpbGUgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVJbnB1dCwgRmlsZUNvbnRlbnQgfSBmcm9tICdpbnRlcm5hbHMvc2hhcmVkLW1ldGFwbGV4JztcblxuZXhwb3J0IG5hbWVzcGFjZSBOZnRTdG9yYWdlIHtcbiAgbGV0IGlzRGlzcGxheVdhcm5pbmcgPSBmYWxzZTtcbiAgY29uc3QgZ2V0TmZ0U3RvcmFnZUFwaUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIGlmICghQ29uc3RhbnRzLm5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgIGlmICghaXNEaXNwbGF5V2FybmluZykge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFxuICAgICAgICBbV2FybmluZ11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgSWYgd2lsbCB1c2UgQHNvbGFuYS1zdWl0ZS9uZnQgcGFja2FnZVxuICAgICAgICB5b3VyIG5lZWQgdG8gdXBkYXRlIG5mdFN0b3JhZ2UuYXBpS2V5IGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpS2V5IGZyb20gaHR0cHM6Ly9uZnQuc3RvcmFnZS9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgYCxcbiAgICAgICAgKTtcbiAgICAgICAgaXNEaXNwbGF5V2FybmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gQ29uc3RhbnRzLk5GVF9TVE9SQUdFX0FQSV9LRVk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDb25zdGFudHMubmZ0U3RvcmFnZUFwaUtleTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlR2F0ZXdheVVybCA9IChjaWQ6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGAke0NvbnN0YW50cy5ORlRfU1RPUkFHRV9HQVRFV0FZX1VSTH0vJHtjaWR9YDtcblxuICBjb25zdCBjb25uZWN0ID0gKCkgPT4gbmV3IE5GVFN0b3JhZ2UoeyB0b2tlbjogZ2V0TmZ0U3RvcmFnZUFwaUtleSgpIH0pO1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRDb250ZW50ID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlQ29udGVudCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlUGF0aCk7XG4gICAgICBsZXQgZmlsZSE6IEJ1ZmZlcjtcbiAgICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoIGFzIHN0cmluZztcbiAgICAgICAgZmlsZSA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlcGF0aCk7XG4gICAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGg7XG4gICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycpLmJ1ZmZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdXBwb3J0ZWQgZW52aXJvbm1lbnQ6IG9ubHkgTm9kZS5qcyBhbmQgQnJvd3NlciBqcycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9iSW1hZ2UgPSBuZXcgQmxvYihbZmlsZV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSW1hZ2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnRcbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlTWV0YWRhdGF9IG1ldGFkYXRhXG4gICAqIHtcbiAgICogICBuYW1lPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbD86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGRlc2NyaXB0aW9uPzoge3N0cmluZ30gICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIHNlbGxlckZlZUJhc2lzUG9pbnRzPzogbnVtYmVyICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBpbWFnZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgLy8gdXBsb2FkZWQgdXJpIG9mIG9yaWdpbmFsIGNvbnRlbnRcbiAgICogICBleHRlcm5hbF91cmw/OiB7c3RyaW5nfSAgICAgICAgICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiB7SnNvbk1ldGFkYXRhQXR0cmlidXRlW119ICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzoge0pzb25NZXRhZGF0YVByb3BlcnRpZXM8VXJpPn0gLy8gaW5jbHVkZWQgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogQ29sbGVjdGlvbiAgICAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgW2tleTogc3RyaW5nXToge3Vua25vd259ICAgICAgICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgdXBsb2FkTWV0YWRhdGEgPSBhc3luYyAoXG4gICAgbWV0YWRhdGE6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG5cbiAgICAgIGNvbnN0IGJsb2JKc29uID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KG1ldGFkYXRhKV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSnNvbik7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFJlc3VsdCwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgRmlsZUNvbnRlbnQsXG4gIEluZnJhU2lkZUlucHV0LFxuICBTdG9yYWdlVHlwZSxcbiAgVXNlclNpZGVJbnB1dCxcbn0gZnJvbSAnaW50ZXJuYWxzL3NoYXJlZC1tZXRhcGxleCc7XG5cbmltcG9ydCB7IEFyd2VhdmUgfSBmcm9tICd+L2Fyd2VhdmUnO1xuaW1wb3J0IHsgTmZ0U3RvcmFnZSB9IGZyb20gJ34vbmZ0LXN0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0b3JhZ2Uge1xuICBleHBvcnQgY29uc3QgdG9Db252ZXJ0T2ZmY2hhaW5kYXRhID0gKFxuICAgIGlucHV0OiBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICk6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluID0+IHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgZGVzY3JpcHRpb246IGlucHV0LmRlc2NyaXB0aW9uLFxuICAgICAgc2VsbGVyX2ZlZV9iYXNpc19wb2ludHM6IHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgZXh0ZXJuYWxfdXJsOiBpbnB1dC5leHRlcm5hbF91cmwsXG4gICAgICBhdHRyaWJ1dGVzOiBpbnB1dC5hdHRyaWJ1dGVzLFxuICAgICAgcHJvcGVydGllczogaW5wdXQucHJvcGVydGllcyxcbiAgICAgIGltYWdlOiAnJyxcbiAgICAgIG9wdGlvbnM6IGlucHV0Lm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIGlmIChzdG9yYWdlVHlwZSA9PT0gJ2Fyd2VhdmUnKSB7XG4gICAgICBpZiAoIWZlZVBheWVyKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdBcndlYXZlIG5lZWRzIHRvIGhhdmUgZmVlcGF5ZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhd2FpdCBBcndlYXZlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm90IGZvdW5kIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRNZXRhQW5kQ29udGVudCA9IGFzeW5jIChcbiAgICBpbnB1dDogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4sXG4gICAgZmlsZVBhdGg6IEZpbGVDb250ZW50LFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBsZXQgc3RvcmFnZTtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgICBhd2FpdCBBcndlYXZlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgsIGZlZVBheWVyKVxuICAgICAgKS51bndyYXAoXG4gICAgICAgIGFzeW5jIChvazogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaW5wdXQuaW1hZ2UgPSBvaztcbiAgICAgICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWRNZXRhZGF0YShpbnB1dCwgZmVlUGF5ZXIpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgICBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgpXG4gICAgICApLnVud3JhcChcbiAgICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZE1ldGFkYXRhKGlucHV0KTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggc3RvcmFnZVR5cGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXN0b3JhZ2UpIHtcbiAgICAgIHRocm93IEVycm9yKCdFbXB0eSBzdG9yYWdlIG9iamVjdCcpO1xuICAgIH1cbiAgICByZXR1cm4gc3RvcmFnZTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLEVBR0U7QUFBQSxPQUNLO0FBRVA7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUdBO0FBQUEsT0FDSzs7O0FDYlA7QUFBQSxFQUNFLFlBQVk7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxPQUNLO0FBR1AsU0FBUyxNQUFNLGlCQUFpQjtBQUd6QixJQUFVO0FBQUEsQ0FBVixDQUFVQSxZQUFWO0FBQ0wsUUFBTSx5QkFBeUI7QUFFeEIsRUFBTUEsUUFBQSxPQUFPLENBQUMsYUFBZ0Q7QUFDbkUsVUFBTSxTQUFTLG1CQUFtQixLQUFLLEtBQUssY0FBYyxDQUFDLEVBQUU7QUFBQSxNQUMzRCxjQUFjO0FBQUEsUUFDWixTQUFTLFVBQVU7QUFB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QVcsY0FBYyxRQUFRO0FBQUEsSUFDaEQsT0FBTztBQUNMLFlBQU0sTUFBTSx1QkFBdUI7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFFTyxFQUFNQSxTQUFBLHVCQUF1QixDQUNsQyxPQUNBLFVBQ0EsYUFDQSxhQUNtQztBQUNuQyxRQUFJO0FBQ0osUUFBSSxnQkFBZ0IsV0FBVztBQUM3QixVQUFJLENBQUMsVUFBVTtBQUNiLGNBQU0sTUFBTSxnQ0FBZ0M7QUFBQSxNQUM5QztBQUNBLGdCQUFVLE9BQ1IsTUFBTSxRQUFRLGNBQWMsVUFBVSxRQUFRLEdBQzlDO0FBQUEsUUFDQSxDQUFPLE9BQWU7QUFDcEIsZ0JBQU0sUUFBUTtBQUNkLGlCQUFPLE1BQU0sUUFBUSxlQUFlLE9BQU8sUUFBUTtBQUFBLFFBQ3JEO0FBQUEsUUFDQSxDQUFDLFFBQWU7QUFDZCxnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixXQUFXLGdCQUFnQixjQUFjO0FBQ3ZDLGdCQUFVLE9BQ1IsTUFBTSxXQUFXLGNBQWMsUUFBUSxHQUN2QztBQUFBLFFBQ0EsQ0FBTyxPQUFlO0FBQ3BCLGdCQUFNLFFBQVE7QUFDZCxpQkFBTyxNQUFNLFdBQVcsZUFBZSxLQUFLO0FBQUEsUUFDOUM7QUFBQSxRQUNBLENBQUMsUUFBZTtBQUNkLGdCQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLE9BQU87QUFDTCxZQUFNLE1BQU0sc0JBQXNCO0FBQUEsSUFDcEM7QUFFQSxRQUFJLENBQUMsU0FBUztBQUNaLFlBQU0sTUFBTSxzQkFBc0I7QUFBQSxJQUNwQztBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsR0E5RWU7IiwKICAibmFtZXMiOiBbIkJ1bmRsciIsICJBcndlYXZlIiwgIkNvbnN0YW50cyIsICJpc05vZGUiLCAiaXNCcm93c2VyIiwgImRlYnVnTG9nIiwgIlRyeSIsICJ0b01ldGFwbGV4RmlsZSIsICJOZnRTdG9yYWdlIiwgIkNvbnN0YW50cyIsICJUcnkiLCAiZGVidWdMb2ciLCAiaXNOb2RlIiwgImlzQnJvd3NlciIsICJ0b01ldGFwbGV4RmlsZSIsICJTdG9yYWdlIl0KfQo=