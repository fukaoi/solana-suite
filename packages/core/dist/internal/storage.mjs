import {
  __async
} from "../chunk-HAJI5OYN.mjs";

// ../internal/storage/src/arweave.ts
import {
  toMetaplexFile
} from "@metaplex-foundation/js";
import {
  debugLog,
  isBrowser,
  isNode,
  Try
} from "@solana-suite/shared";

// ../internal/storage/src/bundlr.ts
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

// ../internal/storage/src/arweave.ts
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

// ../internal/storage/src/nft-storage.ts
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
export {
  Arweave,
  Bundlr,
  NftStorage,
  Storage
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvYXJ3ZWF2ZS50cyIsICIuLi8uLi8uLi9pbnRlcm5hbC9zdG9yYWdlL3NyYy9idW5kbHIudHMiLCAiLi4vLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCAiLi4vLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvc3RvcmFnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcbiAgQ3VycmVuY3ksXG4gIE1ldGFwbGV4RmlsZSxcbiAgdG9NZXRhcGxleEZpbGUsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL2pzJztcblxuaW1wb3J0IHtcbiAgZGVidWdMb2csXG4gIGlzQnJvd3NlcixcbiAgaXNOb2RlLFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBGaWxlQ29udGVudCwgSW5mcmFTaWRlSW5wdXQgfSBmcm9tICdpbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgvJztcbmltcG9ydCB7IEJ1bmRsciB9IGZyb20gJy4vYnVuZGxyJztcblxuZXhwb3J0IGludGVyZmFjZSBNZXRhcGxleEZpbGVPcHRpb25zIHtcbiAgcmVhZG9ubHkgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgdW5pcXVlTmFtZTogc3RyaW5nO1xuICByZWFkb25seSBjb250ZW50VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSBleHRlbnNpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgdGFnczogeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfVtdO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIEFyd2VhdmUge1xuICBleHBvcnQgY29uc3QgZ2V0VXBsb2FkUHJpY2UgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVDb250ZW50LFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHsgcHJpY2U6IG51bWJlcjsgY3VycmVuY3k6IEN1cnJlbmN5IH0sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGJ1ZmZlciE6IEJ1ZmZlcjtcbiAgICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoIGFzIHN0cmluZztcbiAgICAgICAgYnVmZmVyID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVwYXRoKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgYnVmZmVyID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnKS5idWZmZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcignU3VwcG9ydGVkIGVudmlyb25tZW50OiBvbmx5IE5vZGUuanMgYW5kIEJyb3dzZXIganMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgQnVuZGxyLnVzZVN0b3JhZ2UoZmVlUGF5ZXIudG9LZXlwYWlyKCkpLmdldFVwbG9hZFByaWNlKFxuICAgICAgICBidWZmZXIubGVuZ3RoLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgYmFzaXNQb2ludHM6IHN0cmluZyA9IHJlcy5iYXNpc1BvaW50cy50b1N0cmluZygpO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIGJ1ZmZlciBsZW5ndGgsIHByaWNlJyxcbiAgICAgICAgYnVmZmVyLmxlbmd0aCxcbiAgICAgICAgcGFyc2VJbnQoYmFzaXNQb2ludHMpLnRvU29sKCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJpY2U6IHBhcnNlSW50KGJhc2lzUG9pbnRzKS50b1NvbCgpLFxuICAgICAgICBjdXJyZW5jeTogcmVzLmN1cnJlbmN5LFxuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICBmaWxlT3B0aW9ucz86IE1ldGFwbGV4RmlsZU9wdGlvbnMsIC8vIG9ubHkgYXJ3ZWF2ZSwgbm90IG5mdC1zdG9yYWdlXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudDogJywgZmlsZVBhdGgpO1xuICAgICAgbGV0IGZpbGUhOiBNZXRhcGxleEZpbGU7XG4gICAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aCBhcyBzdHJpbmc7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlcGF0aCk7XG4gICAgICAgIGlmIChmaWxlT3B0aW9ucykge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShidWZmZXIsIGZpbGVwYXRoLCBmaWxlT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGJ1ZmZlciwgZmlsZXBhdGgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGg7XG4gICAgICAgIGlmIChmaWxlT3B0aW9ucykge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycsIGZpbGVPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1N1cHBvcnRlZCBlbnZpcm9ubWVudDogb25seSBOb2RlLmpzIGFuZCBCcm93c2VyIGpzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBCdW5kbHIudXNlU3RvcmFnZShmZWVQYXllci50b0tleXBhaXIoKSkudXBsb2FkKGZpbGUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRNZXRhZGF0YSA9IGFzeW5jIChcbiAgICBtZXRhZGF0YTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4sXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhIGRhdGE6ICcsIG1ldGFkYXRhKTtcblxuICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBCdW5kbHIubWFrZShmZWVQYXllci50b0tleXBhaXIoKSlcbiAgICAgICAgLm5mdHMoKVxuICAgICAgICAudXBsb2FkTWV0YWRhdGEobWV0YWRhdGEpO1xuXG4gICAgICByZXR1cm4gdXBsb2FkZWQudXJpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIE1ldGFwbGV4IGFzIE1ldGFwbGV4Rm91bmRhdGlvbixcbiAga2V5cGFpcklkZW50aXR5LFxuICBidW5kbHJTdG9yYWdlLFxuICBCdW5kbHJTdG9yYWdlRHJpdmVyLFxuICB3YWxsZXRBZGFwdGVySWRlbnRpdHksXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL2pzJztcblxuaW1wb3J0IHsgS2V5cGFpciB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlLCBDb25zdGFudHMgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBCdW5kbHJTaWduZXIsIFBoYW50b20gfSBmcm9tICcuL3R5cGVzL2J1bmRscic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQnVuZGxyIHtcbiAgY29uc3QgQlVORExSX0NPTk5FQ1RfVElNRU9VVCA9IDYwMDAwO1xuXG4gIGV4cG9ydCBjb25zdCBtYWtlID0gKGZlZVBheWVyPzogQnVuZGxyU2lnbmVyKTogTWV0YXBsZXhGb3VuZGF0aW9uID0+IHtcbiAgICBjb25zdCBvYmplY3QgPSBNZXRhcGxleEZvdW5kYXRpb24ubWFrZShOb2RlLmdldENvbm5lY3Rpb24oKSkudXNlKFxuICAgICAgYnVuZGxyU3RvcmFnZSh7XG4gICAgICAgIGFkZHJlc3M6IENvbnN0YW50cy5CVU5ETFJfTkVUV09SS19VUkwsXG4gICAgICAgIHByb3ZpZGVyVXJsOiBDb25zdGFudHMuc3dpdGNoQ2x1c3Rlcih7XG4gICAgICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgICAgICB9KSxcbiAgICAgICAgdGltZW91dDogQlVORExSX0NPTk5FQ1RfVElNRU9VVCxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBpZiAoaXNLZXlwYWlyKGZlZVBheWVyKSkge1xuICAgICAgb2JqZWN0LnVzZShrZXlwYWlySWRlbnRpdHkoZmVlUGF5ZXIpKTtcbiAgICB9IGVsc2UgaWYgKGlzUGhhbnRvbShmZWVQYXllcikpIHtcbiAgICAgIG9iamVjdC51c2Uod2FsbGV0QWRhcHRlcklkZW50aXR5KGZlZVBheWVyKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVzZVN0b3JhZ2UgPSAoZmVlUGF5ZXI6IEJ1bmRsclNpZ25lcik6IEJ1bmRsclN0b3JhZ2VEcml2ZXIgPT4ge1xuICAgIHJldHVybiBtYWtlKGZlZVBheWVyKS5zdG9yYWdlKCkuZHJpdmVyKCkgYXMgQnVuZGxyU3RvcmFnZURyaXZlcjtcbiAgfTtcblxuICBjb25zdCBpc0tleXBhaXIgPSAocGF5ZXI6IEJ1bmRsclNpZ25lcik6IHBheWVyIGlzIEtleXBhaXIgPT4ge1xuICAgIGlmICghcGF5ZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICdzZWNyZXRLZXknIGluIHBheWVyO1xuICB9O1xuXG4gIGNvbnN0IGlzUGhhbnRvbSA9IChwYXllcjogQnVuZGxyU2lnbmVyKTogcGF5ZXIgaXMgUGhhbnRvbSA9PiB7XG4gICAgaWYgKCFwYXllcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJ2Nvbm5lY3QnIGluIHBheWVyO1xuICB9O1xufVxuIiwgImltcG9ydCB7IE5GVFN0b3JhZ2UsIEJsb2IgfSBmcm9tICduZnQuc3RvcmFnZSc7XG5pbXBvcnQge1xuICBDb25zdGFudHMsXG4gIFJlc3VsdCxcbiAgaXNOb2RlLFxuICBpc0Jyb3dzZXIsXG4gIGRlYnVnTG9nLFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuaW1wb3J0IHsgdG9NZXRhcGxleEZpbGUgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVJbnB1dCwgRmlsZUNvbnRlbnQgfSBmcm9tICdpbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5mdFN0b3JhZ2Uge1xuICBsZXQgaXNEaXNwbGF5V2FybmluZyA9IGZhbHNlO1xuICBjb25zdCBnZXROZnRTdG9yYWdlQXBpS2V5ID0gKCk6IHN0cmluZyA9PiB7XG4gICAgaWYgKCFDb25zdGFudHMubmZ0U3RvcmFnZUFwaUtleSkge1xuICAgICAgaWYgKCFpc0Rpc3BsYXlXYXJuaW5nKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgXG4gICAgICAgIFtXYXJuaW5nXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBJZiB3aWxsIHVzZSBAc29sYW5hLXN1aXRlL25mdCBwYWNrYWdlXG4gICAgICAgIHlvdXIgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZS5hcGlLZXkgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGlLZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgXG4gICAgICAgICk7XG4gICAgICAgIGlzRGlzcGxheVdhcm5pbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIENvbnN0YW50cy5ORlRfU1RPUkFHRV9BUElfS0VZO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ29uc3RhbnRzLm5mdFN0b3JhZ2VBcGlLZXk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUdhdGV3YXlVcmwgPSAoY2lkOiBzdHJpbmcpOiBzdHJpbmcgPT5cbiAgICBgJHtDb25zdGFudHMuTkZUX1NUT1JBR0VfR0FURVdBWV9VUkx9LyR7Y2lkfWA7XG5cbiAgY29uc3QgY29ubmVjdCA9ICgpID0+IG5ldyBORlRTdG9yYWdlKHsgdG9rZW46IGdldE5mdFN0b3JhZ2VBcGlLZXkoKSB9KTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnRcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50OiAnLCBmaWxlUGF0aCk7XG4gICAgICBsZXQgZmlsZSE6IEJ1ZmZlcjtcbiAgICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoIGFzIHN0cmluZztcbiAgICAgICAgZmlsZSA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlcGF0aCk7XG4gICAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGg7XG4gICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycpLmJ1ZmZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdXBwb3J0ZWQgZW52aXJvbm1lbnQ6IG9ubHkgTm9kZS5qcyBhbmQgQnJvd3NlciBqcycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9iSW1hZ2UgPSBuZXcgQmxvYihbZmlsZV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSW1hZ2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnRcbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlTWV0YWRhdGF9IG1ldGFkYXRhXG4gICAqIHtcbiAgICogICBuYW1lPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbD86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGRlc2NyaXB0aW9uPzoge3N0cmluZ30gICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIHNlbGxlckZlZUJhc2lzUG9pbnRzPzogbnVtYmVyICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBpbWFnZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgLy8gdXBsb2FkZWQgdXJpIG9mIG9yaWdpbmFsIGNvbnRlbnRcbiAgICogICBleHRlcm5hbF91cmw/OiB7c3RyaW5nfSAgICAgICAgICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiB7SnNvbk1ldGFkYXRhQXR0cmlidXRlW119ICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzoge0pzb25NZXRhZGF0YVByb3BlcnRpZXM8VXJpPn0gLy8gaW5jbHVkZWQgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogQ29sbGVjdGlvbiAgICAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgW2tleTogc3RyaW5nXToge3Vua25vd259ICAgICAgICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgdXBsb2FkTWV0YWRhdGEgPSBhc3luYyAoXG4gICAgbWV0YWRhdGE6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgbWV0YWRhdGE6ICcsIG1ldGFkYXRhKTtcblxuICAgICAgY29uc3QgYmxvYkpzb24gPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpXSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjb25uZWN0KCkuc3RvcmVCbG9iKGJsb2JKc29uKTtcbiAgICAgIHJldHVybiBjcmVhdGVHYXRld2F5VXJsKHJlcyk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBTZWNyZXQgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQge1xuICBGaWxlQ29udGVudCxcbiAgSW5mcmFTaWRlSW5wdXQsXG4gIFN0b3JhZ2VUeXBlLFxuICBVc2VyU2lkZUlucHV0LFxufSBmcm9tICdpbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgnO1xuXG5pbXBvcnQgeyBBcndlYXZlIH0gZnJvbSAnLi9hcndlYXZlJztcbmltcG9ydCB7IE5mdFN0b3JhZ2UgfSBmcm9tICcuL25mdC1zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTdG9yYWdlIHtcbiAgZXhwb3J0IGNvbnN0IHRvQ29udmVydE9mZmNoYWluZGF0YSA9IChcbiAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YSxcbiAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyXG4gICk6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluID0+IHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgZGVzY3JpcHRpb246IGlucHV0LmRlc2NyaXB0aW9uLFxuICAgICAgc2VsbGVyX2ZlZV9iYXNpc19wb2ludHM6IHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgZXh0ZXJuYWxfdXJsOiBpbnB1dC5leHRlcm5hbF91cmwsXG4gICAgICBhdHRyaWJ1dGVzOiBpbnB1dC5hdHRyaWJ1dGVzLFxuICAgICAgcHJvcGVydGllczogaW5wdXQucHJvcGVydGllcyxcbiAgICAgIGltYWdlOiAnJyxcbiAgICAgIG9wdGlvbnM6IGlucHV0Lm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkQ29udGVudChmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFBbmRDb250ZW50ID0gYXN5bmMgKFxuICAgIGlucHV0OiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgc3RvcmFnZSA9IGF3YWl0IChcbiAgICAgICAgYXdhaXQgQXJ3ZWF2ZS51cGxvYWRDb250ZW50KGZpbGVQYXRoLCBmZWVQYXllcilcbiAgICAgICkudW53cmFwKFxuICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkTWV0YWRhdGEoaW5wdXQsIGZlZVBheWVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgICBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgpXG4gICAgICApLnVud3JhcChcbiAgICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZE1ldGFkYXRhKGlucHV0KTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBzdG9yYWdlVHlwZScpO1xuICAgIH1cblxuICAgIGlmICghc3RvcmFnZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0VtcHR5IHN0b3JhZ2Ugb2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBzdG9yYWdlO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQTtBQUFBLEVBR0U7QUFBQSxPQUNLO0FBRVA7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUdBO0FBQUEsT0FDSzs7O0FDYlA7QUFBQSxFQUNFLFlBQVk7QUFBQSxFQUNaO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxPQUNLO0FBR1AsU0FBUyxNQUFNLGlCQUFpQjtBQUd6QixJQUFVO0FBQUEsQ0FBVixDQUFVQSxZQUFWO0FBQ0wsUUFBTSx5QkFBeUI7QUFFeEIsRUFBTUEsUUFBQSxPQUFPLENBQUMsYUFBZ0Q7QUFDbkUsVUFBTSxTQUFTLG1CQUFtQixL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USxjQUFjLFVBQVUsUUFBUTtBQUFBLElBQ3ZELFdBQVcsZ0JBQWdCLGNBQWM7QUFDdkMsYUFBTyxNQUFNLFdBQVcsY0FBYyxRQUFRO0FBQUEsSUFDaEQsT0FBTztBQUNMLFlBQU0sTUFBTSx1QkFBdUI7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFFTyxFQUFNQSxTQUFBLHVCQUF1QixDQUNsQyxPQUNBLFVBQ0EsYUFDQSxhQUNtQztBQUNuQyxRQUFJO0FBQ0osUUFBSSxnQkFBZ0IsV0FBVztBQUM3QixVQUFJLENBQUMsVUFBVTtBQUNiLGNBQU0sTUFBTSxnQ0FBZ0M7QUFBQSxNQUM5QztBQUNBLGdCQUFVLE9BQ1IsTUFBTSxRQUFRLGNBQWMsVUFBVSxRQUFRLEdBQzlDO0FBQUEsUUFDQSxDQUFPLE9BQWU7QUFDcEIsZ0JBQU0sUUFBUTtBQUNkLGlCQUFPLE1BQU0sUUFBUSxlQUFlLE9BQU8sUUFBUTtBQUFBLFFBQ3JEO0FBQUEsUUFDQSxDQUFDLFFBQWU7QUFDZCxnQkFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRixXQUFXLGdCQUFnQixjQUFjO0FBQ3ZDLGdCQUFVLE9BQ1IsTUFBTSxXQUFXLGNBQWMsUUFBUSxHQUN2QztBQUFBLFFBQ0EsQ0FBTyxPQUFlO0FBQ3BCLGdCQUFNLFFBQVE7QUFDZCxpQkFBTyxNQUFNLFdBQVcsZUFBZSxLQUFLO0FBQUEsUUFDOUM7QUFBQSxRQUNBLENBQUMsUUFBZTtBQUNkLGdCQUFNO0FBQUEsUUFDUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLE9BQU87QUFDTCxZQUFNLE1BQU0sc0JBQXNCO0FBQUEsSUFDcEM7QUFFQSxRQUFJLENBQUMsU0FBUztBQUNaLFlBQU0sTUFBTSxzQkFBc0I7QUFBQSxJQUNwQztBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsR0E5RWU7IiwKICAibmFtZXMiOiBbIkJ1bmRsciIsICJBcndlYXZlIiwgIkNvbnN0YW50cyIsICJpc05vZGUiLCAiaXNCcm93c2VyIiwgImRlYnVnTG9nIiwgIlRyeSIsICJ0b01ldGFwbGV4RmlsZSIsICJOZnRTdG9yYWdlIiwgIkNvbnN0YW50cyIsICJUcnkiLCAiZGVidWdMb2ciLCAiaXNOb2RlIiwgImlzQnJvd3NlciIsICJ0b01ldGFwbGV4RmlsZSIsICJTdG9yYWdlIl0KfQo=