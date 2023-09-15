"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



var _chunkAXZRHYPFjs = require('./chunk-AXZRHYPF.js');

// src/metaplex/burn.ts
var _core = require('@solana-suite/core');
var Metaplex;
((Metaplex10) => {
  const NFT_AMOUNT2 = 1;
  const NFT_DECIMALS = 0;
  Metaplex10.burn = (mint, owner, signer, feePayer) => {
    return _core.SplToken.burn(
      mint,
      owner,
      [signer],
      NFT_AMOUNT2,
      NFT_DECIMALS,
      feePayer
    );
  };
})(Metaplex || (Metaplex = {}));

// ../internal/shared-metaplex/dist/chunk-5Q35UZB4.mjs
var _shared = require('@solana-suite/shared');


var _web3js = require('@solana/web3.js');
var _mpltokenmetadata = require('@metaplex-foundation/mpl-token-metadata');

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
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
var __spreadProps2 = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var Convert;
((Convert8) => {
  let Collection;
  ((Collection2) => {
    Collection2.intoInfraSide = (input) => {
      if (!input) {
        return null;
      }
      return {
        key: input.toPublicKey(),
        verified: false
      };
    };
    Collection2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return {
        address: output.key.toString(),
        verified: output.verified
      };
    };
  })(Collection = Convert8.Collection || (Convert8.Collection = {}));
})(Convert || (Convert = {}));
var Convert2;
((Convert8) => {
  let Creators;
  ((Creators2) => {
    Creators2.intoInfraSide = (input) => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        let modify = null;
        modify = {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: data.verified
        };
        return modify;
      });
    };
    Creators2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return output.map((data) => {
        const modify = {
          address: data.address.toString(),
          share: data.share,
          verified: data.verified
        };
        return modify;
      });
    };
  })(Creators = Convert8.Creators || (Convert8.Creators = {}));
})(Convert2 || (Convert2 = {}));
var Convert3;
((Convert8) => {
  let Uses;
  ((Uses2) => {
    Uses2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return output;
    };
  })(Uses = Convert8.Uses || (Convert8.Uses = {}));
})(Convert3 || (Convert3 = {}));
var Convert4;
((Convert8) => {
  let TokenMetadata;
  ((TokenMetadata2) => {
    TokenMetadata2.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Convert2.Creators.intoInfraSide(input.creators),
        collection: null,
        uses: input.uses || null
      };
    };
    TokenMetadata2.intoUserSide = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.name),
        symbol: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.symbol),
        tokenAmount,
        uri: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.uri),
        creators: Convert2.Creators.intoUserSide(output.onchain.data.creators),
        uses: Convert3.Uses.intoUserSide(output.onchain.uses),
        dateTime: _shared.convertTimestampToDateTime.call(void 0, output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Convert8.TokenMetadata || (Convert8.TokenMetadata = {}));
})(Convert4 || (Convert4 = {}));
var Convert5;
((Convert8) => {
  let NftMetadata;
  ((NftMetadata2) => {
    NftMetadata2.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Convert2.Creators.intoInfraSide(input.creators),
        collection: Convert.Collection.intoInfraSide(input.collection),
        uses: input.uses || null
      };
    };
    NftMetadata2.intoUserSide = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: Convert4.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: Convert4.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol
        ),
        tokenAmount,
        uri: Convert4.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: Convert2.Creators.intoUserSide(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Convert.Collection.intoUserSide(
          output.onchain.collection
        ),
        uses: Convert3.Uses.intoUserSide(output.onchain.uses),
        dateTime: _shared.convertTimestampToDateTime.call(void 0, output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(NftMetadata = Convert8.NftMetadata || (Convert8.NftMetadata = {}));
})(Convert5 || (Convert5 = {}));
var Convert6;
((Convert8) => {
  let Properties;
  ((Properties2) => {
    Properties2.intoInfraSide = (input, storageFunc, storageType, feePayer) => __async2(void 0, null, function* () {
      if (!input || !input.files) {
        return {};
      }
      const files = yield Promise.all(
        input.files.map((file) => __async2(void 0, null, function* () {
          if (!file.filePath) {
            return {};
          }
          const res = yield storageFunc(file.filePath, storageType, feePayer);
          if (res.isErr) {
            throw Error(res.error.message);
          }
          return _shared.overwriteObject.call(void 0, file, [
            {
              existsKey: "filePath",
              will: { key: "uri", value: res.value }
            }
          ]);
        }))
      );
      return __spreadProps2(__spreadValues2({}, input), { files });
    });
  })(Properties = Convert8.Properties || (Convert8.Properties = {}));
})(Convert6 || (Convert6 = {}));
var Convert7 = __spreadValues2(__spreadValues2(__spreadValues2(__spreadValues2(__spreadValues2(__spreadValues2({}, Convert), Convert2), Convert5), Convert6), Convert4), Convert3);
var UserSideInput;
((UserSideInput22) => {
  let TokenStandard;
  ((TokenStandard2) => {
    TokenStandard2[TokenStandard2["NonFungible"] = 0] = "NonFungible";
    TokenStandard2[TokenStandard2["FungibleAsset"] = 1] = "FungibleAsset";
    TokenStandard2[TokenStandard2["Fungible"] = 2] = "Fungible";
    TokenStandard2[TokenStandard2["NonFungibleEdition"] = 3] = "NonFungibleEdition";
    TokenStandard2[TokenStandard2["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
  })(TokenStandard = UserSideInput22.TokenStandard || (UserSideInput22.TokenStandard = {}));
})(UserSideInput || (UserSideInput = {}));
var _Shared;
((_Shared2) => {
  let UseMethod;
  ((UseMethod2) => {
    UseMethod2[UseMethod2["Burn"] = 0] = "Burn";
    UseMethod2[UseMethod2["Multiple"] = 1] = "Multiple";
    UseMethod2[UseMethod2["Single"] = 2] = "Single";
  })(UseMethod = _Shared2.UseMethod || (_Shared2.UseMethod = {}));
})(_Shared || (_Shared = {}));
var Pda;
((Pda2) => {
  Pda2.getMetadata = (mint) => {
    const [publicKey] = _web3js.PublicKey.findProgramAddressSync(
      [Buffer.from("metadata"), _mpltokenmetadata.PROGRAM_ID.toBuffer(), mint.toPublicKey().toBuffer()],
      _mpltokenmetadata.PROGRAM_ID
    );
    return publicKey;
  };
  Pda2.getMasterEdition = (mint) => {
    const [publicKey] = _web3js.PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        _mpltokenmetadata.PROGRAM_ID.toBuffer(),
        mint.toPublicKey().toBuffer(),
        Buffer.from("edition")
      ],
      _mpltokenmetadata.PROGRAM_ID
    );
    return publicKey;
  };
})(Pda || (Pda = {}));
var Royalty;
((Royalty2) => {
  Royalty2.THRESHOLD = 100;
  Royalty2.convert = (percentage) => {
    return percentage * Royalty2.THRESHOLD;
  };
})(Royalty || (Royalty = {}));
var Validator;
((Validator2) => {
  let Message;
  ((Message2) => {
    Message2.SUCCESS = "success";
    Message2.SMALL_NUMBER = "too small";
    Message2.BIG_NUMBER = "too big";
    Message2.LONG_LENGTH = "too long";
    Message2.EMPTY = "invalid empty value";
    Message2.INVALID_URL = "invalid url";
    Message2.ONLY_NODE_JS = "`string` type is only Node.js";
  })(Message = Validator2.Message || (Validator2.Message = {}));
  Validator2.NAME_LENGTH = 32;
  Validator2.SYMBOL_LENGTH = 10;
  Validator2.URL_LENGTH = 200;
  Validator2.ROYALTY_MAX = 100;
  Validator2.SELLER_FEE_BASIS_POINTS_MAX = 1e4;
  Validator2.ROYALTY_MIN = -1;
  Validator2.isRoyalty = (royalty) => {
    return _shared.Try.call(void 0, () => {
      const key = "royalty";
      if (royalty !== 0 && !royalty) {
        throw createError(key, Message.EMPTY, royalty);
      }
      if (royalty < Validator2.ROYALTY_MIN) {
        throw createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MIN,
          condition: "underMin"
        });
      } else if (royalty > Validator2.ROYALTY_MAX) {
        throw createError(key, Message.BIG_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MAX,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isSellerFeeBasisPoints = (royalty) => {
    return _shared.Try.call(void 0, () => {
      const key = "sellerFeeBasisPoints/seller_fee_basis_points";
      if (royalty !== 0 && !royalty) {
        throw createError(key, Message.EMPTY, royalty);
      }
      if (royalty < Validator2.ROYALTY_MIN) {
        throw createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MIN,
          condition: "underMin"
        });
      } else if (royalty > Validator2.ROYALTY_MAX * Royalty.THRESHOLD) {
        throw createError(key, Message.BIG_NUMBER, royalty, {
          threshold: Validator2.SELLER_FEE_BASIS_POINTS_MAX,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isName = (name) => {
    return _shared.Try.call(void 0, () => {
      const key = "name";
      if (!name) {
        throw createError(key, Message.EMPTY, name);
      }
      if (byteLength(name) > Validator2.NAME_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, name, {
          threshold: Validator2.NAME_LENGTH,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isSymbol = (symbol) => {
    return _shared.Try.call(void 0, () => {
      const key = "symbol";
      if (!symbol) {
        throw createError(key, Message.EMPTY, symbol);
      }
      if (byteLength(symbol) > Validator2.SYMBOL_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, symbol, {
          threshold: Validator2.SYMBOL_LENGTH,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isImageUrl = (image) => isUriOrImage(image, "image");
  Validator2.checkAll = (metadata) => {
    return _shared.Try.call(void 0, () => {
      const keys = Object.keys(metadata);
      const results = [];
      keys.map((key) => {
        let res;
        switch (key) {
          case "image":
            if (key in metadata && metadata.image) {
              res = (0, Validator2.isImageUrl)(metadata.image);
            }
            break;
          case "royalty":
            if (key in metadata) {
              res = (0, Validator2.isRoyalty)(metadata.royalty);
            }
            break;
          case "seller_fee_basis_points":
            if (key in metadata && metadata.seller_fee_basis_points) {
              res = (0, Validator2.isSellerFeeBasisPoints)(metadata.seller_fee_basis_points);
            }
            break;
          case "sellerFeeBasisPoints":
            if (key in metadata) {
              res = (0, Validator2.isSellerFeeBasisPoints)(metadata.sellerFeeBasisPoints);
            }
            break;
          case "name":
            if (metadata.name) {
              res = (0, Validator2.isName)(metadata.name);
            }
            break;
          case "symbol":
            if (metadata.symbol) {
              res = (0, Validator2.isSymbol)(metadata.symbol);
            }
            break;
        }
        if (res && res.isErr) {
          results.push(...res.error.details);
        }
      });
      if (results.length > 0) {
        const message = "Caught in the validation errors. see information e.g: err<ValidatorError>.details";
        throw new ValidatorError(message, results);
      }
      return Message.SUCCESS;
    });
  };
  const byteLength = (value) => {
    const text = new TextEncoder();
    return text.encode(value).length;
  };
  const createError = (key, message, actual, limit) => {
    let error;
    if (limit) {
      error = new ValidatorError(message, [{ key, message, actual, limit }]);
    } else {
      error = new ValidatorError(message, [{ key, message, actual }]);
    }
    return error;
  };
  const isUriOrImage = (imageOrUri, key) => {
    return _shared.Try.call(void 0, () => {
      if (!imageOrUri) {
        throw createError(key, Message.EMPTY, imageOrUri);
      }
      if (byteLength(imageOrUri) > Validator2.URL_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, imageOrUri, {
          threshold: Validator2.URL_LENGTH,
          condition: "overMax"
        });
      }
      if (!/https?:\/\/[-_.!~*\\()a-zA-Z0-9;?:&=+,%#]+/g.test(imageOrUri)) {
        throw createError(key, Message.INVALID_URL, imageOrUri);
      }
      return Message.SUCCESS;
    });
  };
})(Validator || (Validator = {}));
var ValidatorError = class extends Error {
  constructor(message, details) {
    super(message);
    this.details = details;
  }
};

// src/metaplex/find.ts

var Metaplex2;
((Metaplex10) => {
  Metaplex10.findByOwner = (owner, onOk, onErr, options) => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
    const sortable = !(options == null ? void 0 : options.sortable) ? _core.Sortable.Desc : options == null ? void 0 : options.sortable;
    const isHolder = !(options == null ? void 0 : options.isHolder) ? true : false;
    yield _core.SplToken.genericFindByOwner(
      owner,
      (result) => result.match(onOk, onErr),
      UserSideInput.TokenStandard.NonFungible,
      sortable,
      isHolder
    );
  });
  Metaplex10.findByMint = (mint) => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
    return yield _core.SplToken.genericFindByMint(
      mint,
      UserSideInput.TokenStandard.NonFungible
    );
  });
})(Metaplex2 || (Metaplex2 = {}));

// src/metaplex/freeze.ts





var _spltoken = require('@solana/spl-token');

var Metaplex3;
((Metaplex10) => {
  Metaplex10.freeze = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return _shared.Try.call(void 0, () => {
      const tokenAccount = _spltoken.getAssociatedTokenAddressSync.call(void 0, 
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = Pda.getMasterEdition(mint);
      const inst = _mpltokenmetadata.createFreezeDelegatedAccountInstruction.call(void 0, {
        delegate: new (0, _shared.KeypairAccount)({ secret: freezeAuthority }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new (0, _shared.Instruction)(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(Metaplex3 || (Metaplex3 = {}));

// src/metaplex/fee-payer-partial-sign-mint.ts









// ../internal/storage/dist/chunk-XLFF4TPE.mjs
var __async3 = (__this, __arguments, generator) => {
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

// ../internal/storage/dist/index.mjs


var _js = require('@metaplex-foundation/js');













var _nftstorage = require('nft.storage');








var Bundlr;
((Bundlr2) => {
  const BUNDLR_CONNECT_TIMEOUT = 6e4;
  Bundlr2.make = (feePayer) => {
    const object = _js.Metaplex.make(_shared.Node.getConnection()).use(
      _js.bundlrStorage.call(void 0, {
        address: _shared.Constants.BUNDLR_NETWORK_URL,
        providerUrl: _shared.Constants.switchCluster({
          cluster: _shared.Constants.currentCluster
        }),
        timeout: BUNDLR_CONNECT_TIMEOUT
      })
    );
    if (isKeypair(feePayer)) {
      object.use(_js.keypairIdentity.call(void 0, feePayer));
    } else if (isPhantom(feePayer)) {
      object.use(_js.walletAdapterIdentity.call(void 0, feePayer));
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
  Arweave2.getUploadPrice = (filePath, feePayer) => __async3(void 0, null, function* () {
    return _shared.Try.call(void 0, () => __async3(void 0, null, function* () {
      let buffer;
      if (_shared.isNode.call(void 0, )) {
        const filepath = filePath;
        buffer = (yield Promise.resolve().then(() => _interopRequireWildcard(require("fs")))).readFileSync(filepath);
      } else if (_shared.isBrowser.call(void 0, )) {
        const filepath = filePath;
        buffer = _js.toMetaplexFile.call(void 0, filepath, "").buffer;
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      const res = yield Bundlr.useStorage(feePayer.toKeypair()).getUploadPrice(
        buffer.length
      );
      const basisPoints = res.basisPoints.toString();
      _shared.debugLog.call(void 0, 
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
  Arweave2.uploadContent = (filePath, feePayer, fileOptions) => __async3(void 0, null, function* () {
    return _shared.Try.call(void 0, () => __async3(void 0, null, function* () {
      _shared.debugLog.call(void 0, "# upload content: ", filePath);
      let file;
      if (_shared.isNode.call(void 0, )) {
        const filepath = filePath;
        const buffer = (yield Promise.resolve().then(() => _interopRequireWildcard(require("fs")))).readFileSync(filepath);
        if (fileOptions) {
          file = _js.toMetaplexFile.call(void 0, buffer, filepath, fileOptions);
        } else {
          file = _js.toMetaplexFile.call(void 0, buffer, filepath);
        }
      } else if (_shared.isBrowser.call(void 0, )) {
        const filepath = filePath;
        if (fileOptions) {
          file = _js.toMetaplexFile.call(void 0, filepath, "", fileOptions);
        } else {
          file = _js.toMetaplexFile.call(void 0, filepath, "");
        }
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      return Bundlr.useStorage(feePayer.toKeypair()).upload(file);
    }));
  });
  Arweave2.uploadMetadata = (metadata, feePayer) => __async3(void 0, null, function* () {
    return _shared.Try.call(void 0, () => __async3(void 0, null, function* () {
      _shared.debugLog.call(void 0, "# upload meta data: ", metadata);
      const uploaded = yield Bundlr.make(feePayer.toKeypair()).nfts().uploadMetadata(metadata);
      return uploaded.uri;
    }));
  });
})(Arweave || (Arweave = {}));
var NftStorage;
((NftStorage2) => {
  let isDisplayWarning = false;
  const getNftStorageApiKey = () => {
    if (!_shared.Constants.nftStorageApiKey) {
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
      return _shared.Constants.NFT_STORAGE_API_KEY;
    } else {
      return _shared.Constants.nftStorageApiKey;
    }
  };
  const createGatewayUrl = (cid) => `${_shared.Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
  const connect = () => new (0, _nftstorage.NFTStorage)({ token: getNftStorageApiKey() });
  NftStorage2.uploadContent = (filePath) => __async3(void 0, null, function* () {
    return _shared.Try.call(void 0, () => __async3(void 0, null, function* () {
      _shared.debugLog.call(void 0, "# upload content: ", filePath);
      let file;
      if (_shared.isNode.call(void 0, )) {
        const filepath = filePath;
        file = (yield Promise.resolve().then(() => _interopRequireWildcard(require("fs")))).readFileSync(filepath);
      } else if (_shared.isBrowser.call(void 0, )) {
        const filepath = filePath;
        file = _js.toMetaplexFile.call(void 0, filepath, "").buffer;
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      const blobImage = new (0, _nftstorage.Blob)([file]);
      const res = yield connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    }));
  });
  NftStorage2.uploadMetadata = (metadata) => __async3(void 0, null, function* () {
    return _shared.Try.call(void 0, () => __async3(void 0, null, function* () {
      _shared.debugLog.call(void 0, "# upload metadata: ", metadata);
      const blobJson = new (0, _nftstorage.Blob)([JSON.stringify(metadata)]);
      const res = yield connect().storeBlob(blobJson);
      return createGatewayUrl(res);
    }));
  });
})(NftStorage || (NftStorage = {}));
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
  Storage2.uploadContent = (filePath, storageType, feePayer) => __async3(void 0, null, function* () {
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
  Storage2.uploadMetaAndContent = (input, filePath, storageType, feePayer) => __async3(void 0, null, function* () {
    let storage;
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      storage = yield (yield Arweave.uploadContent(filePath, feePayer)).unwrap(
        (ok) => __async3(void 0, null, function* () {
          input.image = ok;
          return yield Arweave.uploadMetadata(input, feePayer);
        }),
        (err) => {
          throw err;
        }
      );
    } else if (storageType === "nftStorage") {
      storage = yield (yield NftStorage.uploadContent(filePath)).unwrap(
        (ok) => __async3(void 0, null, function* () {
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



var _bnjs = require('bn.js'); var _bnjs2 = _interopRequireDefault(_bnjs);





















var NFT_AMOUNT = 1;
var Metaplex4;
((Metaplex10) => {
  Metaplex10.createDeleagateInstruction = (mint2, owner, delegateAuthority) => {
    const tokenAccount = _spltoken.getAssociatedTokenAddressSync.call(void 0, mint2, owner);
    return _spltoken.createApproveInstruction.call(void 0, 
      tokenAccount,
      delegateAuthority,
      owner,
      NFT_AMOUNT
    );
  };
  Metaplex10.createMintInstructions = (mint2, owner, nftMetadata, feePayer, isMutable) => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
    const ata = _spltoken.getAssociatedTokenAddressSync.call(void 0, mint2, owner);
    const tokenMetadataPubkey = Pda.getMetadata(mint2.toString());
    const masterEditionPubkey = Pda.getMasterEdition(mint2.toString());
    const connection = _shared.Node.getConnection();
    const inst1 = _web3js.SystemProgram.createAccount({
      fromPubkey: feePayer,
      newAccountPubkey: mint2,
      lamports: yield _spltoken.getMinimumBalanceForRentExemptMint.call(void 0, connection),
      space: _spltoken.MINT_SIZE,
      programId: _spltoken.TOKEN_PROGRAM_ID
    });
    const inst2 = _spltoken.createInitializeMintInstruction.call(void 0, mint2, 0, owner, owner);
    const inst3 = _spltoken.createAssociatedTokenAccountInstruction.call(void 0, 
      feePayer,
      ata,
      owner,
      mint2
    );
    const inst4 = _spltoken.createMintToCheckedInstruction.call(void 0, mint2, ata, owner, 1, 0);
    const inst5 = _mpltokenmetadata.createCreateMetadataAccountV3Instruction.call(void 0, 
      {
        metadata: tokenMetadataPubkey,
        mint: mint2,
        mintAuthority: owner,
        payer: feePayer,
        updateAuthority: owner
      },
      {
        createMetadataAccountArgsV3: {
          data: nftMetadata,
          isMutable,
          collectionDetails: { __kind: "V1", size: new (0, _bnjs2.default)(1) }
        }
      }
    );
    const inst6 = _mpltokenmetadata.createCreateMasterEditionV3Instruction.call(void 0, 
      {
        edition: masterEditionPubkey,
        mint: mint2,
        updateAuthority: owner,
        mintAuthority: owner,
        payer: feePayer,
        metadata: tokenMetadataPubkey
      },
      {
        createMasterEditionArgs: {
          maxSupply: 0
        }
      }
    );
    return [inst1, inst2, inst3, inst4, inst5, inst6];
  });
  Metaplex10.mint = (owner, signer, input, feePayer, freezeAuthority) => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
    return _shared.Try.call(void 0, () => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const payer = feePayer ? feePayer : signer;
      let properties;
      if (input.properties && input.storageType) {
        properties = yield Convert7.Properties.intoInfraSide(
          input.properties,
          Storage.uploadContent,
          input.storageType,
          payer
        );
      } else if (input.properties && !input.storageType) {
        throw Error("Must set storageType if will use properties");
      }
      input = _chunkAXZRHYPFjs.__spreadProps.call(void 0, _chunkAXZRHYPFjs.__spreadValues.call(void 0, {}, input), {
        properties
      });
      const sellerFeeBasisPoints = Royalty.convert(input.royalty);
      const nftStorageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints
      );
      const createdAt = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      nftStorageMetadata.created_at = createdAt;
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = yield Storage.uploadMetaAndContent(
          nftStorageMetadata,
          input.filePath,
          input.storageType,
          payer
        );
        _shared.debugLog.call(void 0, "# upload content url: ", uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType + filePath' or 'uri'`);
      }
      let datav2 = Convert7.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      let collection;
      if (input.collection && input.collection) {
        collection = Convert7.Collection.intoInfraSide(input.collection);
        datav2 = _chunkAXZRHYPFjs.__spreadProps.call(void 0, _chunkAXZRHYPFjs.__spreadValues.call(void 0, {}, datav2), { collection });
      }
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      _shared.debugLog.call(void 0, "# input: ", input);
      _shared.debugLog.call(void 0, "# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      _shared.debugLog.call(void 0, "# datav2: ", datav2);
      const mint2 = _shared.KeypairAccount.create();
      const insts = yield (0, Metaplex10.createMintInstructions)(
        mint2.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );
      if (freezeAuthority) {
        insts.push(
          (0, Metaplex10.createDeleagateInstruction)(
            mint2.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey()
          )
        );
      }
      return new (0, _shared.MintInstruction)(
        insts,
        [signer.toKeypair(), mint2.toKeypair()],
        payer.toKeypair(),
        mint2.pubkey
      );
    }));
  });
})(Metaplex4 || (Metaplex4 = {}));

// src/metaplex/fee-payer-partial-sign-mint.ts
var Metaplex5;
((Metaplex10) => {
  Metaplex10.feePayerPartialSignMint = (owner, signer, input, feePayer, freezeAuthority) => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
    return _shared.Try.call(void 0, () => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const sellerFeeBasisPoints = Royalty.convert(input.royalty);
      let uri = "";
      if (input.filePath && input.storageType === "nftStorage") {
        const properties = yield Convert7.Properties.intoInfraSide(
          input.properties,
          Storage.uploadContent,
          input.storageType
        );
        const nftStorageMetadata = Storage.toConvertOffchaindata(
          _chunkAXZRHYPFjs.__spreadProps.call(void 0, _chunkAXZRHYPFjs.__spreadValues.call(void 0, {}, input), { properties }),
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
        uri = uploaded.value;
        _shared.debugLog.call(void 0, "# upload content url: ", uploaded);
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType=nftStorage + filePath' or 'uri'`);
      }
      let datav2 = Convert7.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      let collection;
      if (input.collection && input.collection) {
        collection = Convert7.Collection.intoInfraSide(input.collection);
        datav2 = _chunkAXZRHYPFjs.__spreadProps.call(void 0, _chunkAXZRHYPFjs.__spreadValues.call(void 0, {}, datav2), { collection });
      }
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      _shared.debugLog.call(void 0, "# input: ", input);
      _shared.debugLog.call(void 0, "# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      _shared.debugLog.call(void 0, "# datav2: ", datav2);
      const mint = _shared.KeypairAccount.create();
      const insts = yield Metaplex4.createMintInstructions(
        mint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        feePayer.toPublicKey(),
        isMutable
      );
      if (freezeAuthority) {
        insts.push(
          Metaplex4.createDeleagateInstruction(
            mint.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey()
          )
        );
      }
      const blockhashObj = yield _shared.Node.getConnection().getLatestBlockhash();
      const tx = new (0, _web3js.Transaction)({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      insts.forEach((inst) => tx.add(inst));
      tx.recentBlockhash = blockhashObj.blockhash;
      [signer, mint].forEach((signer2) => tx.partialSign(signer2.toKeypair()));
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new (0, _shared.PartialSignInstruction)(hex, mint.pubkey);
    }));
  });
})(Metaplex5 || (Metaplex5 = {}));

// src/metaplex/fee-payer-partial-sign-transfer.ts

var Metaplex6;
((Metaplex10) => {
  const NFT_AMOUNT2 = 1;
  const NFT_DECIMALS = 0;
  Metaplex10.feePayerPartialSignTransferNft = (mint, owner, dest, signers, feePayer) => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
    return _core.SplToken.feePayerPartialSignTransfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT2,
      NFT_DECIMALS,
      feePayer
    );
  });
})(Metaplex6 || (Metaplex6 = {}));

// src/metaplex/thaw.ts







var Metaplex7;
((Metaplex10) => {
  Metaplex10.thaw = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return _shared.Try.call(void 0, () => {
      const tokenAccount = _spltoken.getAssociatedTokenAddressSync.call(void 0, 
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = Pda.getMasterEdition(mint);
      const inst = _mpltokenmetadata.createThawDelegatedAccountInstruction.call(void 0, {
        delegate: new (0, _shared.KeypairAccount)({ secret: freezeAuthority }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new (0, _shared.Instruction)(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(Metaplex7 || (Metaplex7 = {}));

// src/metaplex/transfer.ts

var Metaplex8;
((Metaplex10) => {
  const NFT_AMOUNT2 = 1;
  const NFT_DECIMALS = 0;
  Metaplex10.transfer = (mint, owner, dest, signers, feePayer) => _chunkAXZRHYPFjs.__async.call(void 0, void 0, null, function* () {
    return _core.SplToken.transfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT2,
      NFT_DECIMALS,
      feePayer
    );
  });
})(Metaplex8 || (Metaplex8 = {}));

// src/metaplex/index.ts
var Metaplex9 = Object.assign(
  {},
  Metaplex,
  Metaplex2,
  Metaplex3,
  Metaplex5,
  Metaplex6,
  Metaplex4,
  Metaplex7,
  Metaplex8
);


exports.Metaplex = Metaplex9;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRhcGxleC9idXJuLnRzIiwiLi4vLi4vaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4L3NyYy9jb252ZXJ0L3Rva2VuLW1ldGFkYXRhLnRzIiwiLi4vLi4vaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4L3NyYy9jb252ZXJ0L25mdC1tZXRhZGF0YS50cyIsIi4uLy4uL2ludGVybmFsL3NoYXJlZC1tZXRhcGxleC9zcmMvY29udmVydC9wcm9wZXJ0aWVzLnRzIiwiLi4vLi4vaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4L3NyYy9wZGEudHMiLCIuLi8uLi9pbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgvc3JjL3ZhbGlkYXRvci50cyIsIi4uLy4uL2ludGVybmFsL3NoYXJlZC1tZXRhcGxleC9zcmMvY29udmVydC9jb2xsZWN0aW9uLnRzIiwiLi4vLi4vaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4L3NyYy9jb252ZXJ0L2NyZWF0b3JzLnRzIiwiLi4vLi4vaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4L3NyYy9jb252ZXJ0L3VzZXMudHMiLCIuLi8uLi9pbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgvc3JjL2NvbnZlcnQvaW5kZXgudHMiLCIuLi8uLi9pbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgvc3JjL3R5cGVzL3VzZXItc2lkZS9pbnB1dC50cyIsIi4uLy4uL2ludGVybmFsL3NoYXJlZC1tZXRhcGxleC9zcmMvdHlwZXMvc2hhcmVkLnRzIiwiLi4vLi4vaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4L3NyYy9yb3lhbHR5LnRzIiwiLi4vc3JjL21ldGFwbGV4L2ZpbmQudHMiLCIuLi9zcmMvbWV0YXBsZXgvZnJlZXplLnRzIiwiLi4vc3JjL21ldGFwbGV4L2ZlZS1wYXllci1wYXJ0aWFsLXNpZ24tbWludC50cyIsIi4uLy4uL2ludGVybmFsL3N0b3JhZ2UvZGlzdC9jaHVuay1YTEZGNFRQRS5tanMiLCIuLi8uLi9pbnRlcm5hbC9zdG9yYWdlL3NyYy9hcndlYXZlLnRzIiwiLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvYnVuZGxyLnRzIiwiLi4vLi4vaW50ZXJuYWwvc3RvcmFnZS9zcmMvbmZ0LXN0b3JhZ2UudHMiLCIuLi8uLi9pbnRlcm5hbC9zdG9yYWdlL3NyYy9zdG9yYWdlLnRzIiwiLi4vc3JjL21ldGFwbGV4L21pbnQudHMiLCIuLi9zcmMvbWV0YXBsZXgvZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlci50cyIsIi4uL3NyYy9tZXRhcGxleC90aGF3LnRzIiwiLi4vc3JjL21ldGFwbGV4L3RyYW5zZmVyLnRzIiwiLi4vc3JjL21ldGFwbGV4L2luZGV4LnRzIl0sIm5hbWVzIjpbIk1ldGFwbGV4IiwiTkZUX0FNT1VOVCIsImNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIiwiQ29udmVydCIsIkNvbGxlY3Rpb24iLCJDcmVhdG9ycyIsIlVzZXMiLCJUb2tlbk1ldGFkYXRhIiwiTmZ0TWV0YWRhdGEiLCJQcm9wZXJ0aWVzIiwiX19hc3luYyIsIl9fc3ByZWFkUHJvcHMiLCJfX3NwcmVhZFZhbHVlcyIsIlVzZXJTaWRlSW5wdXQiLCJUb2tlblN0YW5kYXJkIiwiX1NoYXJlZCIsIlVzZU1ldGhvZCIsIlBkYSIsIlJveWFsdHkiLCJWYWxpZGF0b3IiLCJNZXNzYWdlIiwiU3BsVG9rZW4iLCJUcnkiLCJkZWJ1Z0xvZyIsIktleXBhaXJBY2NvdW50IiwiTm9kZSIsIkNvbnN0YW50cyIsImlzTm9kZSIsImlzQnJvd3NlciIsInRvTWV0YXBsZXhGaWxlIiwiQnVuZGxyIiwiQXJ3ZWF2ZSIsIk5mdFN0b3JhZ2UiLCJTdG9yYWdlIiwiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCJtaW50Iiwic2lnbmVyIiwiSW5zdHJ1Y3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxTQUFTLGdCQUFnQjtBQUVsQixJQUFVO0FBQUEsQ0FBVixDQUFVQSxlQUFWO0FBQ0wsUUFBTUMsY0FBYTtBQUNuQixRQUFNLGVBQWU7QUFFZCxFQUFNRCxXQUFBLE9BQU8s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LEVBQ0FBO0FBQUEsRUFDQUE7QUFBQSxFQUNBQTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5zdHJ1Y3Rpb24sIFB1YmtleSwgUmVzdWx0LCBTZWNyZXQgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29yZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICBleHBvcnQgY29uc3QgYnVybiA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXI6IFNlY3JldCxcbiAgICBmZWVQYXllcj86IFNlY3JldFxuICApOiBSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFNwbFRva2VuLmJ1cm4oXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBbc2lnbmVyXSxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBmZWVQYXllclxuICAgICk7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBDb252ZXJ0IGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydCBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVG9rZW5NZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSAoXG4gICAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5Ub2tlbk1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IEluZnJhU2lkZUlucHV0Lk1ldGFwbGV4RGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYVNpZGUoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBudWxsLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuT25jaGFpbkFuZE9mZmNoYWluLFxuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgICApOiBVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLm1pbnQudG9TdHJpbmcoKSxcbiAgICAgICAgcm95YWx0eTogb3V0cHV0Lm9uY2hhaW4uZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgbmFtZTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5uYW1lKSxcbiAgICAgICAgc3ltYm9sOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCksXG4gICAgICAgIHRva2VuQW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgdXJpOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnVyaSksXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBkZWxldGUgTlVMTCgweDAwKSBzdHJpbmdzIGZ1bmN0aW9uXG4gICAgZXhwb3J0IGNvbnN0IGRlbGV0ZU51bGxTdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwwL2csICcnKTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb252ZXJ0IGFzIF9Db2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnQgYXMgX0NyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0IGFzIF9Vc2VzIH0gZnJvbSAnLi91c2VzJztcbmltcG9ydCB7IENvbnZlcnQgYXMgX1Rva2VuIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBOZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSAoXG4gICAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBJbmZyYVNpZGVJbnB1dC5NZXRhcGxleERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmFTaWRlKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogX0NvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmFTaWRlKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuT25jaGFpbkFuZE9mZmNoYWluLFxuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgICApOiBVc2VyU2lkZU91dHB1dC5OZnRNZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3V0cHV0Lm9uY2hhaW4udXBkYXRlQXV0aG9yaXR5LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IF9Ub2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogX1Rva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3MoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wsXG4gICAgICAgICksXG4gICAgICAgIHRva2VuQW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgdXJpOiBfVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnVyaSksXG4gICAgICAgIGlzTXV0YWJsZTogb3V0cHV0Lm9uY2hhaW4uaXNNdXRhYmxlLFxuICAgICAgICBwcmltYXJ5U2FsZUhhcHBlbmVkOiBvdXRwdXQub25jaGFpbi5wcmltYXJ5U2FsZUhhcHBlbmVkLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5lZGl0aW9uTm9uY2UsXG4gICAgICAgIGNvbGxlY3Rpb246IF9Db2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b1VzZXJTaWRlKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmNvbGxlY3Rpb24sXG4gICAgICAgICksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBvdmVyd3JpdGVPYmplY3QsIFJlc3VsdCwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgRmlsZUNvbnRlbnQsXG4gIEluZnJhU2lkZUlucHV0LFxuICBTdG9yYWdlVHlwZSxcbiAgVXNlclNpZGVJbnB1dCxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnQge1xuICBleHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gYXN5bmMgKFxuICAgICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuUHJvcGVydGllcyB8IHVuZGVmaW5lZCxcbiAgICAgIHN0b3JhZ2VGdW5jOiAoXG4gICAgICAgIGRhdGE6IEZpbGVDb250ZW50LFxuICAgICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICAgKSA9PiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4sXG4gICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICApOiBQcm9taXNlPEluZnJhU2lkZUlucHV0LlByb3BlcnRpZXM+ID0+IHtcbiAgICAgIGlmICghaW5wdXQgfHwgIWlucHV0LmZpbGVzKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgaW5wdXQuZmlsZXMubWFwKGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKCFmaWxlLmZpbGVQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHN0b3JhZ2VGdW5jKGZpbGUuZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICAgICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3ZlcndyaXRlT2JqZWN0KGZpbGUsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICB3aWxsOiB7IGtleTogJ3VyaScsIHZhbHVlOiByZXMudmFsdWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmlucHV0LCBmaWxlcyB9IGFzIEluZnJhU2lkZUlucHV0LlByb3BlcnRpZXM7XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFBkYSB7XG4gIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChtaW50OiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICBbQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksIFBST0dSQU1fSUQudG9CdWZmZXIoKSwgbWludC50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCldLFxuICAgICAgUFJPR1JBTV9JRCxcbiAgICApO1xuICAgIHJldHVybiBwdWJsaWNLZXk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldE1hc3RlckVkaXRpb24gPSAobWludDogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgW1xuICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgQnVmZmVyLmZyb20oJ2VkaXRpb24nKSxcbiAgICAgIF0sXG4gICAgICBQUk9HUkFNX0lELFxuICAgICk7XG4gICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBJbmZyYVNpZGVJbnB1dCwgVXNlclNpZGVJbnB1dCB9IGZyb20gJy4vdHlwZXMvJztcbmltcG9ydCB7IERldGFpbHMsIExpbWl0IH0gZnJvbSAnLi90eXBlcy92YWxpZGF0b3InO1xuXG5leHBvcnQgbmFtZXNwYWNlIFZhbGlkYXRvciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVzc2FnZSB7XG4gICAgZXhwb3J0IGNvbnN0IFNVQ0NFU1MgPSAnc3VjY2Vzcyc7XG4gICAgZXhwb3J0IGNvbnN0IFNNQUxMX05VTUJFUiA9ICd0b28gc21hbGwnO1xuICAgIGV4cG9ydCBjb25zdCBCSUdfTlVNQkVSID0gJ3RvbyBiaWcnO1xuICAgIGV4cG9ydCBjb25zdCBMT05HX0xFTkdUSCA9ICd0b28gbG9uZyc7XG4gICAgZXhwb3J0IGNvbnN0IEVNUFRZID0gJ2ludmFsaWQgZW1wdHkgdmFsdWUnO1xuICAgIGV4cG9ydCBjb25zdCBJTlZBTElEX1VSTCA9ICdpbnZhbGlkIHVybCc7XG4gICAgZXhwb3J0IGNvbnN0IE9OTFlfTk9ERV9KUyA9ICdgc3RyaW5nYCB0eXBlIGlzIG9ubHkgTm9kZS5qcyc7XG4gIH1cblxuICBleHBvcnQgY29uc3QgTkFNRV9MRU5HVEggPSAzMjtcbiAgZXhwb3J0IGNvbnN0IFNZTUJPTF9MRU5HVEggPSAxMDtcbiAgZXhwb3J0IGNvbnN0IFVSTF9MRU5HVEggPSAyMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01BWCA9IDEwMDtcbiAgZXhwb3J0IGNvbnN0IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCA9IDEwMDAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NSU4gPSAtMTtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlclxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3JveWFsdHknO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1NlbGxlckZlZUJhc2lzUG9pbnRzID0gKFxuICAgIHJveWFsdHk6IG51bWJlclxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3NlbGxlckZlZUJhc2lzUG9pbnRzL3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCAqIFJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXhcbiAgPihcbiAgICBtZXRhZGF0YTogVFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG1ldGFkYXRhKTtcbiAgICAgIGNvbnN0IHJlc3VsdHM6IERldGFpbHNbXSA9IFtdO1xuICAgICAga2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICBsZXQgcmVzITogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+O1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuaW1hZ2UpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNJbWFnZVVybChtZXRhZGF0YS5pbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyb3lhbHR5JzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNSb3lhbHR5KG1ldGFkYXRhLnJveWFsdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cykge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlckZlZUJhc2lzUG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5uYW1lKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzTmFtZShtZXRhZGF0YS5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3N5bWJvbCc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuc3ltYm9sKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU3ltYm9sKG1ldGFkYXRhLnN5bWJvbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzICYmIHJlcy5pc0Vycikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5yZXMuZXJyb3IuZGV0YWlscyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAnQ2F1Z2h0IGluIHRoZSB2YWxpZGF0aW9uIGVycm9ycy4gc2VlIGluZm9ybWF0aW9uIGUuZzogZXJyPFZhbGlkYXRvckVycm9yPi5kZXRhaWxzJztcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIHJlc3VsdHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICB0eXBlIFBpY2tOZnRTdG9yYWdlID0gUGljazxcbiAgICBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdpbWFnZScgfCAnc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnXG4gID47XG4gIHR5cGUgUGlja05mdFN0b3JhZ2VNZXRhcGxleCA9IFBpY2s8XG4gICAgVXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YSxcbiAgICAnbmFtZScgfCAnc3ltYm9sJyB8ICdyb3lhbHR5JyB8ICdmaWxlUGF0aCdcbiAgPjtcbiAgdHlwZSBQaWNrTWV0YXBsZXggPSBQaWNrPFxuICAgIEluZnJhU2lkZUlucHV0Lk1ldGFwbGV4RGF0YVYyLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ3VyaScgfCAnc2VsbGVyRmVlQmFzaXNQb2ludHMnXG4gID47XG5cbiAgY29uc3QgYnl0ZUxlbmd0aCA9ICh2YWx1ZTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCB0ZXh0ID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgcmV0dXJuIHRleHQuZW5jb2RlKHZhbHVlKS5sZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlRXJyb3IgPSAoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGFjdHVhbDogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGxpbWl0PzogTGltaXRcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBpZiAoIWltYWdlT3JVcmkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKGltYWdlT3JVcmkpID4gVVJMX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIGltYWdlT3JVcmksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFVSTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCEvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7PzomPSssJSNdKy9nLnRlc3QoaW1hZ2VPclVyaSkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLklOVkFMSURfVVJMLCBpbWFnZU9yVXJpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgZGV0YWlsczogRGV0YWlsc1tdO1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNbXSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIEluZnJhU2lkZUlucHV0LFxuICBJbmZyYVNpZGVPdXRwdXQsXG4gIE9wdGlvbixcbiAgVXNlclNpZGVJbnB1dCxcbiAgVXNlclNpZGVPdXRwdXQsXG59IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhU2lkZSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248VXNlclNpZGVJbnB1dC5Db2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW5mcmFTaWRlSW5wdXQuQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW5mcmFTaWRlT3V0cHV0LkNvbGxlY3Rpb24+LFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LkNvbGxlY3Rpb24gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBPcHRpb24sXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxVc2VyU2lkZUlucHV0LkNyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbmZyYVNpZGVJbnB1dC5DcmVhdG9yc1tdPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICBsZXQgbW9kaWZ5OiBPcHRpb248SW5mcmFTaWRlSW5wdXQuQ3JlYXRvcnM+ID0gbnVsbDtcbiAgICAgICAgbW9kaWZ5ID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBkYXRhLnZlcmlmaWVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBtb2RpZnk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEluZnJhU2lkZU91dHB1dC5DcmVhdG9yW10+LFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LkNyZWF0b3JzW10gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgbW9kaWZ5ID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1N0cmluZygpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBkYXRhLnZlcmlmaWVkLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbW9kaWZ5O1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5mcmFTaWRlT3V0cHV0LCBPcHRpb24sIFVzZXJTaWRlT3V0cHV0IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnQge1xuICBleHBvcnQgbmFtZXNwYWNlIFVzZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbmZyYVNpZGVPdXRwdXQuVXNlcz4sXG4gICAgKTogVXNlclNpZGVPdXRwdXQuVXNlcyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb252ZXJ0IGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydCBhcyBDcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydCBhcyBOZnRNZXRhZGF0YSB9IGZyb20gJy4vbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnQgYXMgUHJvcGVydGllcyB9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBDb252ZXJ0IGFzIFRva2VuTWV0YWRhdGEgfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnQgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5cbmV4cG9ydCBjb25zdCBDb252ZXJ0ID0ge1xuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTmZ0TWV0YWRhdGEsXG4gIC4uLlByb3BlcnRpZXMsXG4gIC4uLlRva2VuTWV0YWRhdGEsXG4gIC4uLlVzZXMsXG59O1xuIiwiaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBfU2hhcmVkLCBiaWdudW0sIEZpbGVDb250ZW50IH0gZnJvbSAnLi4vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBVc2VyU2lkZUlucHV0IHtcbiAgZXhwb3J0IHR5cGUgQ29sbGVjdGlvbiA9IFB1YmtleTtcblxuICBleHBvcnQgdHlwZSBDcmVhdG9ycyA9IHtcbiAgICBhZGRyZXNzOiBQdWJrZXk7XG4gICAgc2hhcmU6IG51bWJlcjtcbiAgICB2ZXJpZmllZDogYm9vbGVhbjtcbiAgfTtcblxuICBleHBvcnQgdHlwZSBQcm9wZXJ0aWVzID0gX1NoYXJlZC5Qcm9wZXJ0aWVzO1xuXG4gIGV4cG9ydCBlbnVtIFRva2VuU3RhbmRhcmQge1xuICAgIE5vbkZ1bmdpYmxlID0gMCxcbiAgICBGdW5naWJsZUFzc2V0ID0gMSxcbiAgICBGdW5naWJsZSA9IDIsXG4gICAgTm9uRnVuZ2libGVFZGl0aW9uID0gMyxcbiAgICBQcm9ncmFtbWFibGVOb25GdW5naWJsZSA9IDQsXG4gIH1cblxuICBleHBvcnQgdHlwZSBOZnRNZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3ltYm9sOiBzdHJpbmc7XG4gICAgcm95YWx0eTogbnVtYmVyO1xuICAgIHN0b3JhZ2VUeXBlPzogU3RvcmFnZVR5cGU7XG4gICAgZmlsZVBhdGg/OiBGaWxlQ29udGVudDtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgaXNNdXRhYmxlPzogYm9vbGVhbjtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBleHRlcm5hbF91cmw/OiBzdHJpbmc7XG4gICAgYXR0cmlidXRlcz86IF9TaGFyZWQuQXR0cmlidXRlW107XG4gICAgcHJvcGVydGllcz86IFByb3BlcnRpZXM7XG4gICAgbWF4U3VwcGx5PzogYmlnbnVtO1xuICAgIGNyZWF0b3JzPzogQ3JlYXRvcnNbXTtcbiAgICB1c2VzPzogX1NoYXJlZC5Vc2VzO1xuICAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uO1xuICAgIG9wdGlvbnM/OiBfU2hhcmVkLk9wdGlvbnM7XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgVG9rZW5NZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3ltYm9sOiBzdHJpbmc7XG4gICAgZmlsZVBhdGg/OiBGaWxlQ29udGVudDtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlVHlwZTtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICByb3lhbHR5PzogbnVtYmVyO1xuICAgIHVzZXM/OiBfU2hhcmVkLlVzZXM7XG4gICAgY3JlYXRvcnM/OiBDcmVhdG9yc1tdO1xuICAgIGF0dHJpYnV0ZXM/OiBfU2hhcmVkLkF0dHJpYnV0ZVtdO1xuICAgIG9wdGlvbnM/OiBfU2hhcmVkLk9wdGlvbnM7XG4gIH07XG59XG4iLCJpbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5leHBvcnQgdHlwZSBPcHRpb248VD4gPSBUIHwgbnVsbDtcbmV4cG9ydCB0eXBlIGJpZ251bSA9IG51bWJlciB8IEJOO1xuZXhwb3J0IHR5cGUgRmlsZUNvbnRlbnQgPSBzdHJpbmcgfCBCdWZmZXIgfCBVaW50OEFycmF5IHwgQXJyYXlCdWZmZXI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgX1NoYXJlZCB7XG4gIGV4cG9ydCB0eXBlIFByb3BlcnRpZXMgPSB7XG4gICAgY3JlYXRvcnM/OiB7XG4gICAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgICAgc2hhcmU/OiBudW1iZXI7XG4gICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH1bXTtcbiAgICBmaWxlcz86IHtcbiAgICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgICBmaWxlUGF0aD86IEZpbGVDb250ZW50O1xuICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICB9W107XG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgfTtcblxuICBleHBvcnQgdHlwZSBBdHRyaWJ1dGUgPSB7XG4gICAgdHJhaXRfdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICB9O1xuXG4gIGV4cG9ydCBlbnVtIFVzZU1ldGhvZCB7XG4gICAgQnVybiA9IDAsXG4gICAgTXVsdGlwbGUgPSAxLFxuICAgIFNpbmdsZSA9IDIsXG4gIH1cblxuICBleHBvcnQgdHlwZSBVc2VzID0ge1xuICAgIHVzZU1ldGhvZDogVXNlTWV0aG9kO1xuICAgIHJlbWFpbmluZzogYmlnbnVtO1xuICAgIHRvdGFsOiBiaWdudW07XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgT3B0aW9ucyA9IHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9O1xufVxuIiwiZXhwb3J0IG5hbWVzcGFjZSBSb3lhbHR5IHtcbiAgZXhwb3J0IGNvbnN0IFRIUkVTSE9MRCA9IDEwMDtcbiAgZXhwb3J0IGNvbnN0IGNvbnZlcnQgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IFB1YmtleSwgUmVzdWx0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgVXNlclNpZGVJbnB1dCB9IGZyb20gJ2ludGVybmFsL3NoYXJlZC1tZXRhcGxleCc7XG5pbXBvcnQgeyBGaW5kLCBPbkVyciwgT25PaywgU29ydGFibGUsIFNwbFRva2VuIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb3JlJztcbmltcG9ydCB7IE5mdE1ldGFkYXRhIH0gZnJvbSAnLi4vdHlwZXMvJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZXRhcGxleCB7XG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgb3duZXIgUHVia2V5XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgKiBAcGFyYW0ge09uT2t9IG9uT2sgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPbkVycn0gb25FcnIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIHt7c29ydGFibGU/OiBTb3J0YWJsZSwgaXNIb2xkZXI/OiBib29sZWFufX0gb3B0aW9ucz9cbiAgICogQHJldHVybiBQcm9taXNlPHZvaWQ+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5T3duZXIgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBvbk9rOiBPbk9rPEZpbmQ+LFxuICAgIG9uRXJyOiBPbkVycixcbiAgICBvcHRpb25zPzogeyBzb3J0YWJsZT86IFNvcnRhYmxlOyBpc0hvbGRlcj86IGJvb2xlYW4gfVxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBzb3J0YWJsZSA9ICFvcHRpb25zPy5zb3J0YWJsZSA/IFNvcnRhYmxlLkRlc2MgOiBvcHRpb25zPy5zb3J0YWJsZTtcbiAgICBjb25zdCBpc0hvbGRlciA9ICFvcHRpb25zPy5pc0hvbGRlciA/IHRydWUgOiBmYWxzZTtcbiAgICBhd2FpdCBTcGxUb2tlbi5nZW5lcmljRmluZEJ5T3duZXI8TmZ0TWV0YWRhdGE+KFxuICAgICAgb3duZXIsXG4gICAgICAocmVzdWx0KSA9PiByZXN1bHQubWF0Y2gob25Paywgb25FcnIpLFxuICAgICAgVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlLFxuICAgICAgc29ydGFibGUsXG4gICAgICBpc0hvbGRlclxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBtaW50IGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU1pbnQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5XG4gICk6IFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gYXdhaXQgU3BsVG9rZW4uZ2VuZXJpY0ZpbmRCeU1pbnQ8TmZ0TWV0YWRhdGE+KFxuICAgICAgbWludCxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZVxuICAgICk7XG4gIH07XG59XG4iLCJpbXBvcnQge1xuICBJbnN0cnVjdGlvbixcbiAgS2V5cGFpckFjY291bnQsXG4gIFB1YmtleSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgUGRhIH0gZnJvbSAnaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4JztcbmltcG9ydCB7IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgY3JlYXRlRnJlZXplRGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZXRhcGxleCB7XG4gIC8qKlxuICAgKiBGcmVlemluZyBhIHRhcmdldCBuZnRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gc2V0dGVkIGZyZWV6ZSBhdXRob3JpdHkgb2YgbmZ0XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAgICAgLy8gZmVlIHBheWVyXG4gICAqL1xuICBleHBvcnQgY29uc3QgZnJlZXplID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpXG4gICAgICApO1xuICAgICAgY29uc3QgZWRpdGlvbkFkZHJlc3MgPSBQZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZURlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbih7XG4gICAgICAgIGRlbGVnYXRlOiBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFjY291bnQ6IHRva2VuQWNjb3VudCxcbiAgICAgICAgZWRpdGlvbjogZWRpdGlvbkFkZHJlc3MsXG4gICAgICAgIG1pbnQ6IG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKClcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCJpbXBvcnQge1xuICBkZWJ1Z0xvZyxcbiAgS2V5cGFpckFjY291bnQsXG4gIE5vZGUsXG4gIFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sXG4gIFB1YmtleSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5pbXBvcnQgeyBUcmFuc2FjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICdpbnRlcm5hbC9zdG9yYWdlJztcblxuaW1wb3J0IHtcbiAgQ29udmVydCxcbiAgUm95YWx0eSxcbiAgVXNlclNpZGVJbnB1dCxcbiAgVmFsaWRhdG9yLFxufSBmcm9tICdpbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgnO1xuXG5pbXBvcnQgeyBNZXRhcGxleCBhcyBfTWludCB9IGZyb20gJy4vbWludCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnQgYW5kIE5GVCBtaW50IHdpdGggUGFydGlhbCBTaWduXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAvLyBmaXJzdCBtaW50ZWQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IHNpZ25lciAgICAgICAgIC8vIG93bmVyJ3MgU2VjcmV0XG4gICAqIEBwYXJhbSB7VXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YX0gaW5wdXRcbiAgICoge1xuICAgKiAgIG5hbWU6IHN0cmluZyAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w6IHN0cmluZyAgICAgICAgICAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIGZpbGVQYXRoOiBzdHJpbmcgfCBGaWxlICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgcm95YWx0eTogbnVtYmVyICAgICAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgc3RvcmFnZVR5cGU6ICdhcndlYXZlJ3wnbmZ0U3RvcmFnZScgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBleHRlcm5hbF91cmw/OiBzdHJpbmcgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IE1ldGFkYXRhQXR0cmlidXRlW10gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiBNZXRhZGF0YVByb3BlcnRpZXM8VXJpPiAvLyBpbmNsdWRlIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IFB1YmtleSAgICAgICAgICAgLy8gY29sbGVjdGlvbnMgb2YgZGlmZmVyZW50IGNvbG9ycywgc2hhcGVzLCBldGMuXG4gICAqICAgW2tleTogc3RyaW5nXT86IHVua25vd24gICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqICAgY3JlYXRvcnM/OiBJbnB1dENyZWF0b3JzW10gICAgICAgICAgLy8gb3RoZXIgY3JlYXRvcnMgdGhhbiBvd25lclxuICAgKiAgIHVzZXM/OiBVc2VzICAgICAgICAgICAgICAgICAgIC8vIHVzYWdlIGZlYXR1cmU6IGJ1cm4sIHNpbmdsZSwgbXVsdGlwbGVcbiAgICogICBpc011dGFibGU/OiBib29sZWFuICAgICAgICAgICAvLyBlbmFibGUgdXBkYXRlKClcbiAgICogfVxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXI/ICAgICAgICAgLy8gZmVlIHBheWVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBmcmVlemVBdXRob3JpdHk/ICAvLyBmcmVlemUgYXV0aG9yaXR5XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZlZVBheWVyUGFydGlhbFNpZ25NaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk/OiBTZWNyZXRcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gUm95YWx0eS5jb252ZXJ0KGlucHV0LnJveWFsdHkpO1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCB1cmkgPSAnJztcbiAgICAgIGlmIChpbnB1dC5maWxlUGF0aCAmJiBpbnB1dC5zdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBhd2FpdCBDb252ZXJ0LlByb3BlcnRpZXMuaW50b0luZnJhU2lkZShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkQ29udGVudCxcbiAgICAgICAgICBpbnB1dC5zdG9yYWdlVHlwZVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG5mdFN0b3JhZ2VNZXRhZGF0YSA9IFN0b3JhZ2UudG9Db252ZXJ0T2ZmY2hhaW5kYXRhKFxuICAgICAgICAgIHsgLi4uaW5wdXQsIHByb3BlcnRpZXMgfSxcbiAgICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50c1xuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWRNZXRhQW5kQ29udGVudChcbiAgICAgICAgICBuZnRTdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGVcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgdXJpID0gaW5wdXQudXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0ICdzdG9yYWdlVHlwZT1uZnRTdG9yYWdlICsgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgbGV0IGRhdGF2MiA9IENvbnZlcnQuTmZ0TWV0YWRhdGEuaW50b0luZnJhU2lkZShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHNcbiAgICAgICk7XG5cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG4gICAgICBsZXQgY29sbGVjdGlvbjtcbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uICYmIGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbiA9IENvbnZlcnQuQ29sbGVjdGlvbi5pbnRvSW5mcmFTaWRlKGlucHV0LmNvbGxlY3Rpb24pO1xuICAgICAgICBkYXRhdjIgPSB7IC4uLmRhdGF2MiwgY29sbGVjdGlvbiB9O1xuICAgICAgfVxuICAgICAgLy8tLS0gY29sbGVjdGlvbiAtLS1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgc2VsbGVyRmVlQmFzaXNQb2ludHM6ICcsIHNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcblxuICAgICAgY29uc3QgbWludCA9IEtleXBhaXJBY2NvdW50LmNyZWF0ZSgpO1xuICAgICAgY29uc3QgaW5zdHMgPSBhd2FpdCBfTWludC5jcmVhdGVNaW50SW5zdHJ1Y3Rpb25zKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgaXNNdXRhYmxlXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChmcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHMucHVzaChcbiAgICAgICAgICBfTWludC5jcmVhdGVEZWxlYWdhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKVxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICBjb25zdCB0eCA9IG5ldyBUcmFuc2FjdGlvbih7XG4gICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgIGJsb2NraGFzaDogYmxvY2toYXNoT2JqLmJsb2NraGFzaCxcbiAgICAgICAgZmVlUGF5ZXI6IGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcblxuICAgICAgaW5zdHMuZm9yRWFjaCgoaW5zdCkgPT4gdHguYWRkKGluc3QpKTtcbiAgICAgIHR4LnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICBbc2lnbmVyLCBtaW50XS5mb3JFYWNoKChzaWduZXIpID0+IHR4LnBhcnRpYWxTaWduKHNpZ25lci50b0tleXBhaXIoKSkpO1xuXG4gICAgICBjb25zdCBzZXJpYWxpemVkVHggPSB0eC5zZXJpYWxpemUoe1xuICAgICAgICByZXF1aXJlQWxsU2lnbmF0dXJlczogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGhleCA9IHNlcmlhbGl6ZWRUeC50b1N0cmluZygnaGV4Jyk7XG4gICAgICByZXR1cm4gbmV3IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24oaGV4LCBtaW50LnB1YmtleSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCJ2YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZGVmUHJvcHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllcztcbnZhciBfX2dldE93blByb3BEZXNjcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzO1xudmFyIF9fZ2V0T3duUHJvcFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19wcm9wSXNFbnVtID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBfX2RlZk5vcm1hbFByb3AgPSAob2JqLCBrZXksIHZhbHVlKSA9PiBrZXkgaW4gb2JqID8gX19kZWZQcm9wKG9iaiwga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlIH0pIDogb2JqW2tleV0gPSB2YWx1ZTtcbnZhciBfX3NwcmVhZFZhbHVlcyA9IChhLCBiKSA9PiB7XG4gIGZvciAodmFyIHByb3AgaW4gYiB8fCAoYiA9IHt9KSlcbiAgICBpZiAoX19oYXNPd25Qcm9wLmNhbGwoYiwgcHJvcCkpXG4gICAgICBfX2RlZk5vcm1hbFByb3AoYSwgcHJvcCwgYltwcm9wXSk7XG4gIGlmIChfX2dldE93blByb3BTeW1ib2xzKVxuICAgIGZvciAodmFyIHByb3Agb2YgX19nZXRPd25Qcm9wU3ltYm9scyhiKSkge1xuICAgICAgaWYgKF9fcHJvcElzRW51bS5jYWxsKGIsIHByb3ApKVxuICAgICAgICBfX2RlZk5vcm1hbFByb3AoYSwgcHJvcCwgYltwcm9wXSk7XG4gICAgfVxuICByZXR1cm4gYTtcbn07XG52YXIgX19zcHJlYWRQcm9wcyA9IChhLCBiKSA9PiBfX2RlZlByb3BzKGEsIF9fZ2V0T3duUHJvcERlc2NzKGIpKTtcbnZhciBfX2FzeW5jID0gKF9fdGhpcywgX19hcmd1bWVudHMsIGdlbmVyYXRvcikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHZhciBmdWxmaWxsZWQgPSAodmFsdWUpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHJlamVjdGVkID0gKHZhbHVlKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBzdGVwKGdlbmVyYXRvci50aHJvdyh2YWx1ZSkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc3RlcCA9ICh4KSA9PiB4LmRvbmUgPyByZXNvbHZlKHgudmFsdWUpIDogUHJvbWlzZS5yZXNvbHZlKHgudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7XG4gICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KF9fdGhpcywgX19hcmd1bWVudHMpKS5uZXh0KCkpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIF9fc3ByZWFkVmFsdWVzLFxuICBfX3NwcmVhZFByb3BzLFxuICBfX2FzeW5jXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxld29nSUNKMlpYSnphVzl1SWpvZ015d0tJQ0FpYzI5MWNtTmxjeUk2SUZ0ZExBb2dJQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZJRnRkTEFvZ0lDSnRZWEJ3YVc1bmN5STZJQ0lpTEFvZ0lDSnVZVzFsY3lJNklGdGRDbjBLIiwiaW1wb3J0IHtcbiAgQ3VycmVuY3ksXG4gIE1ldGFwbGV4RmlsZSxcbiAgdG9NZXRhcGxleEZpbGUsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL2pzJztcblxuaW1wb3J0IHtcbiAgZGVidWdMb2csXG4gIGlzQnJvd3NlcixcbiAgaXNOb2RlLFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBGaWxlQ29udGVudCwgSW5mcmFTaWRlSW5wdXQgfSBmcm9tICdpbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgvJztcbmltcG9ydCB7IEJ1bmRsciB9IGZyb20gJy4vYnVuZGxyJztcblxuZXhwb3J0IGludGVyZmFjZSBNZXRhcGxleEZpbGVPcHRpb25zIHtcbiAgcmVhZG9ubHkgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgdW5pcXVlTmFtZTogc3RyaW5nO1xuICByZWFkb25seSBjb250ZW50VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICByZWFkb25seSBleHRlbnNpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcmVhZG9ubHkgdGFnczogeyBuYW1lOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmcgfVtdO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIEFyd2VhdmUge1xuICBleHBvcnQgY29uc3QgZ2V0VXBsb2FkUHJpY2UgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVDb250ZW50LFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHsgcHJpY2U6IG51bWJlcjsgY3VycmVuY3k6IEN1cnJlbmN5IH0sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGJ1ZmZlciE6IEJ1ZmZlcjtcbiAgICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoIGFzIHN0cmluZztcbiAgICAgICAgYnVmZmVyID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVwYXRoKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgYnVmZmVyID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnKS5idWZmZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcignU3VwcG9ydGVkIGVudmlyb25tZW50OiBvbmx5IE5vZGUuanMgYW5kIEJyb3dzZXIganMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgQnVuZGxyLnVzZVN0b3JhZ2UoZmVlUGF5ZXIudG9LZXlwYWlyKCkpLmdldFVwbG9hZFByaWNlKFxuICAgICAgICBidWZmZXIubGVuZ3RoLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgYmFzaXNQb2ludHM6IHN0cmluZyA9IHJlcy5iYXNpc1BvaW50cy50b1N0cmluZygpO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIGJ1ZmZlciBsZW5ndGgsIHByaWNlJyxcbiAgICAgICAgYnVmZmVyLmxlbmd0aCxcbiAgICAgICAgcGFyc2VJbnQoYmFzaXNQb2ludHMpLnRvU29sKCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJpY2U6IHBhcnNlSW50KGJhc2lzUG9pbnRzKS50b1NvbCgpLFxuICAgICAgICBjdXJyZW5jeTogcmVzLmN1cnJlbmN5LFxuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICBmaWxlT3B0aW9ucz86IE1ldGFwbGV4RmlsZU9wdGlvbnMsIC8vIG9ubHkgYXJ3ZWF2ZSwgbm90IG5mdC1zdG9yYWdlXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudDogJywgZmlsZVBhdGgpO1xuICAgICAgbGV0IGZpbGUhOiBNZXRhcGxleEZpbGU7XG4gICAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aCBhcyBzdHJpbmc7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IChhd2FpdCBpbXBvcnQoJ2ZzJykpLnJlYWRGaWxlU3luYyhmaWxlcGF0aCk7XG4gICAgICAgIGlmIChmaWxlT3B0aW9ucykge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShidWZmZXIsIGZpbGVwYXRoLCBmaWxlT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmlsZSA9IHRvTWV0YXBsZXhGaWxlKGJ1ZmZlciwgZmlsZXBhdGgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVwYXRoID0gZmlsZVBhdGg7XG4gICAgICAgIGlmIChmaWxlT3B0aW9ucykge1xuICAgICAgICAgIGZpbGUgPSB0b01ldGFwbGV4RmlsZShmaWxlcGF0aCwgJycsIGZpbGVPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1N1cHBvcnRlZCBlbnZpcm9ubWVudDogb25seSBOb2RlLmpzIGFuZCBCcm93c2VyIGpzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBCdW5kbHIudXNlU3RvcmFnZShmZWVQYXllci50b0tleXBhaXIoKSkudXBsb2FkKGZpbGUpO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRNZXRhZGF0YSA9IGFzeW5jIChcbiAgICBtZXRhZGF0YTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4sXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhIGRhdGE6ICcsIG1ldGFkYXRhKTtcblxuICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBCdW5kbHIubWFrZShmZWVQYXllci50b0tleXBhaXIoKSlcbiAgICAgICAgLm5mdHMoKVxuICAgICAgICAudXBsb2FkTWV0YWRhdGEobWV0YWRhdGEpO1xuXG4gICAgICByZXR1cm4gdXBsb2FkZWQudXJpO1xuICAgIH0pO1xuICB9O1xufVxuIiwiaW1wb3J0IHtcbiAgTWV0YXBsZXggYXMgTWV0YXBsZXhGb3VuZGF0aW9uLFxuICBrZXlwYWlySWRlbnRpdHksXG4gIGJ1bmRsclN0b3JhZ2UsXG4gIEJ1bmRsclN0b3JhZ2VEcml2ZXIsXG4gIHdhbGxldEFkYXB0ZXJJZGVudGl0eSxcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vanMnO1xuXG5pbXBvcnQgeyBLZXlwYWlyIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE5vZGUsIENvbnN0YW50cyB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IEJ1bmRsclNpZ25lciwgUGhhbnRvbSB9IGZyb20gJy4vdHlwZXMvYnVuZGxyJztcblxuZXhwb3J0IG5hbWVzcGFjZSBCdW5kbHIge1xuICBjb25zdCBCVU5ETFJfQ09OTkVDVF9USU1FT1VUID0gNjAwMDA7XG5cbiAgZXhwb3J0IGNvbnN0IG1ha2UgPSAoZmVlUGF5ZXI/OiBCdW5kbHJTaWduZXIpOiBNZXRhcGxleEZvdW5kYXRpb24gPT4ge1xuICAgIGNvbnN0IG9iamVjdCA9IE1ldGFwbGV4Rm91bmRhdGlvbi5tYWtlKE5vZGUuZ2V0Q29ubmVjdGlvbigpKS51c2UoXG4gICAgICBidW5kbHJTdG9yYWdlKHtcbiAgICAgICAgYWRkcmVzczogQ29uc3RhbnRzLkJVTkRMUl9ORVRXT1JLX1VSTCxcbiAgICAgICAgcHJvdmlkZXJVcmw6IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICAgIH0pLFxuICAgICAgICB0aW1lb3V0OiBCVU5ETFJfQ09OTkVDVF9USU1FT1VULFxuICAgICAgfSlcbiAgICApO1xuICAgIGlmIChpc0tleXBhaXIoZmVlUGF5ZXIpKSB7XG4gICAgICBvYmplY3QudXNlKGtleXBhaXJJZGVudGl0eShmZWVQYXllcikpO1xuICAgIH0gZWxzZSBpZiAoaXNQaGFudG9tKGZlZVBheWVyKSkge1xuICAgICAgb2JqZWN0LnVzZSh3YWxsZXRBZGFwdGVySWRlbnRpdHkoZmVlUGF5ZXIpKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXNlU3RvcmFnZSA9IChmZWVQYXllcjogQnVuZGxyU2lnbmVyKTogQnVuZGxyU3RvcmFnZURyaXZlciA9PiB7XG4gICAgcmV0dXJuIG1ha2UoZmVlUGF5ZXIpLnN0b3JhZ2UoKS5kcml2ZXIoKSBhcyBCdW5kbHJTdG9yYWdlRHJpdmVyO1xuICB9O1xuXG4gIGNvbnN0IGlzS2V5cGFpciA9IChwYXllcjogQnVuZGxyU2lnbmVyKTogcGF5ZXIgaXMgS2V5cGFpciA9PiB7XG4gICAgaWYgKCFwYXllcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gJ3NlY3JldEtleScgaW4gcGF5ZXI7XG4gIH07XG5cbiAgY29uc3QgaXNQaGFudG9tID0gKHBheWVyOiBCdW5kbHJTaWduZXIpOiBwYXllciBpcyBQaGFudG9tID0+IHtcbiAgICBpZiAoIXBheWVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAnY29ubmVjdCcgaW4gcGF5ZXI7XG4gIH07XG59XG4iLCJpbXBvcnQgeyBORlRTdG9yYWdlLCBCbG9iIH0gZnJvbSAnbmZ0LnN0b3JhZ2UnO1xuaW1wb3J0IHtcbiAgQ29uc3RhbnRzLFxuICBSZXN1bHQsXG4gIGlzTm9kZSxcbiAgaXNCcm93c2VyLFxuICBkZWJ1Z0xvZyxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmltcG9ydCB7IHRvTWV0YXBsZXhGaWxlIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vanMnO1xuaW1wb3J0IHsgSW5mcmFTaWRlSW5wdXQsIEZpbGVDb250ZW50IH0gZnJvbSAnaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4JztcblxuZXhwb3J0IG5hbWVzcGFjZSBOZnRTdG9yYWdlIHtcbiAgbGV0IGlzRGlzcGxheVdhcm5pbmcgPSBmYWxzZTtcbiAgY29uc3QgZ2V0TmZ0U3RvcmFnZUFwaUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICAgIGlmICghQ29uc3RhbnRzLm5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgIGlmICghaXNEaXNwbGF5V2FybmluZykge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYFxuICAgICAgICBbV2FybmluZ11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgSWYgd2lsbCB1c2UgQHNvbGFuYS1zdWl0ZS9uZnQgcGFja2FnZVxuICAgICAgICB5b3VyIG5lZWQgdG8gdXBkYXRlIG5mdFN0b3JhZ2UuYXBpS2V5IGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIGNhbiBnZXQgYXBpS2V5IGZyb20gaHR0cHM6Ly9uZnQuc3RvcmFnZS9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgYFxuICAgICAgICApO1xuICAgICAgICBpc0Rpc3BsYXlXYXJuaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBDb25zdGFudHMuTkZUX1NUT1JBR0VfQVBJX0tFWTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENvbnN0YW50cy5uZnRTdG9yYWdlQXBpS2V5O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVHYXRld2F5VXJsID0gKGNpZDogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgYCR7Q29uc3RhbnRzLk5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMfS8ke2NpZH1gO1xuXG4gIGNvbnN0IGNvbm5lY3QgPSAoKSA9PiBuZXcgTkZUU3RvcmFnZSh7IHRva2VuOiBnZXROZnRTdG9yYWdlQXBpS2V5KCkgfSk7XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZENvbnRlbnQgPSBhc3luYyAoXG4gICAgZmlsZVBhdGg6IEZpbGVDb250ZW50XG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudDogJywgZmlsZVBhdGgpO1xuICAgICAgbGV0IGZpbGUhOiBCdWZmZXI7XG4gICAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgICAgY29uc3QgZmlsZXBhdGggPSBmaWxlUGF0aCBhcyBzdHJpbmc7XG4gICAgICAgIGZpbGUgPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoZmlsZXBhdGgpO1xuICAgICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICBjb25zdCBmaWxlcGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICBmaWxlID0gdG9NZXRhcGxleEZpbGUoZmlsZXBhdGgsICcnKS5idWZmZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcignU3VwcG9ydGVkIGVudmlyb25tZW50OiBvbmx5IE5vZGUuanMgYW5kIEJyb3dzZXIganMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYmxvYkltYWdlID0gbmV3IEJsb2IoW2ZpbGVdKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkltYWdlKTtcbiAgICAgIHJldHVybiBjcmVhdGVHYXRld2F5VXJsKHJlcyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50XG4gICAqXG4gICAqIEBwYXJhbSB7U3RvcmFnZU1ldGFkYXRhfSBtZXRhZGF0YVxuICAgKiB7XG4gICAqICAgbmFtZT86IHtzdHJpbmd9ICAgICAgICAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IG5hbWVcbiAgICogICBzeW1ib2w/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBkZXNjcmlwdGlvbj86IHtzdHJpbmd9ICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgZGVzY3JpcHRpb25cbiAgICogICBzZWxsZXJGZWVCYXNpc1BvaW50cz86IG51bWJlciAgICAgICAgLy8gcm95YWx0eSBwZXJjZW50YWdlXG4gICAqICAgaW1hZ2U/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgIC8vIHVwbG9hZGVkIHVyaSBvZiBvcmlnaW5hbCBjb250ZW50XG4gICAqICAgZXh0ZXJuYWxfdXJsPzoge3N0cmluZ30gICAgICAgICAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzoge0pzb25NZXRhZGF0YUF0dHJpYnV0ZVtdfSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IHtKc29uTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT59IC8vIGluY2x1ZGVkIGZpbGUgbmFtZSwgdXJpLCBzdXBwb3J0ZWQgZmlsZSB0eXBlXG4gICAqICAgY29sbGVjdGlvbj86IENvbGxlY3Rpb24gICAgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIFtrZXk6IHN0cmluZ106IHt1bmtub3dufSAgICAgICAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogfVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFkYXRhID0gYXN5bmMgKFxuICAgIG1ldGFkYXRhOiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpblxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG5cbiAgICAgIGNvbnN0IGJsb2JKc29uID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KG1ldGFkYXRhKV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSnNvbik7XG4gICAgICByZXR1cm4gY3JlYXRlR2F0ZXdheVVybChyZXMpO1xuICAgIH0pO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgUmVzdWx0LCBTZWNyZXQgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQge1xuICBGaWxlQ29udGVudCxcbiAgSW5mcmFTaWRlSW5wdXQsXG4gIFN0b3JhZ2VUeXBlLFxuICBVc2VyU2lkZUlucHV0LFxufSBmcm9tICdpbnRlcm5hbC9zaGFyZWQtbWV0YXBsZXgnO1xuXG5pbXBvcnQgeyBBcndlYXZlIH0gZnJvbSAnLi9hcndlYXZlJztcbmltcG9ydCB7IE5mdFN0b3JhZ2UgfSBmcm9tICcuL25mdC1zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTdG9yYWdlIHtcbiAgZXhwb3J0IGNvbnN0IHRvQ29udmVydE9mZmNoYWluZGF0YSA9IChcbiAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YSxcbiAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyXG4gICk6IEluZnJhU2lkZUlucHV0Lk9mZmNoYWluID0+IHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgZGVzY3JpcHRpb246IGlucHV0LmRlc2NyaXB0aW9uLFxuICAgICAgc2VsbGVyX2ZlZV9iYXNpc19wb2ludHM6IHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgZXh0ZXJuYWxfdXJsOiBpbnB1dC5leHRlcm5hbF91cmwsXG4gICAgICBhdHRyaWJ1dGVzOiBpbnB1dC5hdHRyaWJ1dGVzLFxuICAgICAgcHJvcGVydGllczogaW5wdXQucHJvcGVydGllcyxcbiAgICAgIGltYWdlOiAnJyxcbiAgICAgIG9wdGlvbnM6IGlucHV0Lm9wdGlvbnMsXG4gICAgfTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkQ29udGVudCA9IGFzeW5jIChcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkQ29udGVudChmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkQ29udGVudChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZE1ldGFBbmRDb250ZW50ID0gYXN5bmMgKFxuICAgIGlucHV0OiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgICBmaWxlUGF0aDogRmlsZUNvbnRlbnQsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgc3RvcmFnZSA9IGF3YWl0IChcbiAgICAgICAgYXdhaXQgQXJ3ZWF2ZS51cGxvYWRDb250ZW50KGZpbGVQYXRoLCBmZWVQYXllcilcbiAgICAgICkudW53cmFwKFxuICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkTWV0YWRhdGEoaW5wdXQsIGZlZVBheWVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChzdG9yYWdlVHlwZSA9PT0gJ25mdFN0b3JhZ2UnKSB7XG4gICAgICBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgICBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZENvbnRlbnQoZmlsZVBhdGgpXG4gICAgICApLnVud3JhcChcbiAgICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpbnB1dC5pbWFnZSA9IG9rO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBOZnRTdG9yYWdlLnVwbG9hZE1ldGFkYXRhKGlucHV0KTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdObyBtYXRjaCBzdG9yYWdlVHlwZScpO1xuICAgIH1cblxuICAgIGlmICghc3RvcmFnZSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0VtcHR5IHN0b3JhZ2Ugb2JqZWN0Jyk7XG4gICAgfVxuICAgIHJldHVybiBzdG9yYWdlO1xuICB9O1xufVxuIiwiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBTeXN0ZW1Qcm9ncmFtLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5pbXBvcnQge1xuICBjcmVhdGVBcHByb3ZlSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbixcbiAgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCxcbiAgTUlOVF9TSVpFLFxuICBUT0tFTl9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQge1xuICBkZWJ1Z0xvZyxcbiAgS2V5cGFpckFjY291bnQsXG4gIE1pbnRJbnN0cnVjdGlvbixcbiAgUHVia2V5LFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICdpbnRlcm5hbC9zdG9yYWdlJztcblxuaW1wb3J0IHtcbiAgQ29udmVydCxcbiAgUGRhLFxuICBSb3lhbHR5LFxuICBVc2VyU2lkZUlucHV0LFxuICBWYWxpZGF0b3IsXG59IGZyb20gJ2ludGVybmFsL3NoYXJlZC1tZXRhcGxleCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uLFxuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuY29uc3QgTkZUX0FNT1VOVCA9IDE7XG5leHBvcnQgbmFtZXNwYWNlIE1ldGFwbGV4IHtcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZURlbGVhZ2F0ZUluc3RydWN0aW9uID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGRlbGVnYXRlQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcblxuICAgIHJldHVybiBjcmVhdGVBcHByb3ZlSW5zdHJ1Y3Rpb24oXG4gICAgICB0b2tlbkFjY291bnQsXG4gICAgICBkZWxlZ2F0ZUF1dGhvcml0eSxcbiAgICAgIG93bmVyLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICApO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVNaW50SW5zdHJ1Y3Rpb25zID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIG5mdE1ldGFkYXRhOiBEYXRhVjIsXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgICBpc011dGFibGU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8VHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdPiA9PiB7XG4gICAgY29uc3QgYXRhID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuICAgIGNvbnN0IHRva2VuTWV0YWRhdGFQdWJrZXkgPSBQZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtYXN0ZXJFZGl0aW9uUHVia2V5ID0gUGRhLmdldE1hc3RlckVkaXRpb24obWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG5cbiAgICBjb25zdCBpbnN0MSA9IFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICBmcm9tUHVia2V5OiBmZWVQYXllcixcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICBsYW1wb3J0czogYXdhaXQgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludChjb25uZWN0aW9uKSxcbiAgICAgIHNwYWNlOiBNSU5UX1NJWkUsXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG5cbiAgICBjb25zdCBpbnN0MiA9IGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24obWludCwgMCwgb3duZXIsIG93bmVyKTtcblxuICAgIGNvbnN0IGluc3QzID0gY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgZmVlUGF5ZXIsXG4gICAgICBhdGEsXG4gICAgICBvd25lcixcbiAgICAgIG1pbnQsXG4gICAgKTtcblxuICAgIGNvbnN0IGluc3Q0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKG1pbnQsIGF0YSwgb3duZXIsIDEsIDApO1xuXG4gICAgY29uc3QgaW5zdDUgPSBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAge1xuICAgICAgICBtZXRhZGF0YTogdG9rZW5NZXRhZGF0YVB1YmtleSxcbiAgICAgICAgbWludCxcbiAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNyZWF0ZU1ldGFkYXRhQWNjb3VudEFyZ3NWMzoge1xuICAgICAgICAgIGRhdGE6IG5mdE1ldGFkYXRhLFxuICAgICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogeyBfX2tpbmQ6ICdWMScsIHNpemU6IG5ldyBCTigxKSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgY29uc3QgaW5zdDYgPSBjcmVhdGVDcmVhdGVNYXN0ZXJFZGl0aW9uVjNJbnN0cnVjdGlvbihcbiAgICAgIHtcbiAgICAgICAgZWRpdGlvbjogbWFzdGVyRWRpdGlvblB1YmtleSxcbiAgICAgICAgbWludCxcbiAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgbWV0YWRhdGE6IHRva2VuTWV0YWRhdGFQdWJrZXksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjcmVhdGVNYXN0ZXJFZGl0aW9uQXJnczoge1xuICAgICAgICAgIG1heFN1cHBseTogMCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICByZXR1cm4gW2luc3QxLCBpbnN0MiwgaW5zdDMsIGluc3Q0LCBpbnN0NSwgaW5zdDZdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgTkZUIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgIC8vIGZpcnN0IG1pbnRlZCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gc2lnbmVyICAgICAgICAgLy8gb3duZXIncyBTZWNyZXRcbiAgICogQHBhcmFtIHtVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhfSBpbnB1dFxuICAgKiB7XG4gICAqICAgbmFtZTogc3RyaW5nICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbDogc3RyaW5nICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZmlsZVBhdGg6IHN0cmluZyB8IEZpbGUgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBkZXNjcmlwdGlvbj86IHN0cmluZyAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIGV4dGVybmFsX3VybD86IHN0cmluZyAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzogTWV0YWRhdGFBdHRyaWJ1dGVbXSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IE1ldGFkYXRhUHJvcGVydGllczxVcmk+IC8vIGluY2x1ZGUgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogUHVia2V5ICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBjcmVhdG9ycz86IElucHV0Q3JlYXRvcnNbXSAgICAvLyBvdGhlciBjcmVhdG9ycyB0aGFuIG93bmVyXG4gICAqICAgdXNlcz86IFVzZXMgICAgICAgICAgICAgICAgICAgLy8gdXNhZ2UgZmVhdHVyZTogYnVybiwgc2luZ2xlLCBtdWx0aXBsZVxuICAgKiAgIGlzTXV0YWJsZT86IGJvb2xlYW4gICAgICAgICAgIC8vIGVuYWJsZSB1cGRhdGUoKVxuICAgKiAgIG9wdGlvbnM/OiBba2V5OiBzdHJpbmddPzogdW5rbm93biAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogfVxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXI/ICAgICAgICAgLy8gZmVlIHBheWVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBmcmVlemVBdXRob3JpdHk/ICAvLyBmcmVlemUgYXV0aG9yaXR5XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgIGZyZWV6ZUF1dGhvcml0eT86IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyO1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMgJiYgaW5wdXQuc3RvcmFnZVR5cGUpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnQuUHJvcGVydGllcy5pbnRvSW5mcmFTaWRlKFxuICAgICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgICAgU3RvcmFnZS51cGxvYWRDb250ZW50LFxuICAgICAgICAgIGlucHV0LnN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC5wcm9wZXJ0aWVzICYmICFpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICB0aHJvdyBFcnJvcignTXVzdCBzZXQgc3RvcmFnZVR5cGUgaWYgd2lsbCB1c2UgcHJvcGVydGllcycpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dCA9IHtcbiAgICAgICAgLi4uaW5wdXQsXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICB9O1xuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG5cbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gUm95YWx0eS5jb252ZXJ0KGlucHV0LnJveWFsdHkpO1xuICAgICAgY29uc3QgbmZ0U3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICAgIG5mdFN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gY3JlYXRlZEF0O1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWRNZXRhQW5kQ29udGVudChcbiAgICAgICAgICBuZnRTdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIHVyaSA9IGlucHV0LnVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCAnc3RvcmFnZVR5cGUgKyBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGRhdGF2MiA9IENvbnZlcnQuTmZ0TWV0YWRhdGEuaW50b0luZnJhU2lkZShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuICAgICAgbGV0IGNvbGxlY3Rpb247XG4gICAgICBpZiAoaW5wdXQuY29sbGVjdGlvbiAmJiBpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24gPSBDb252ZXJ0LkNvbGxlY3Rpb24uaW50b0luZnJhU2lkZShpbnB1dC5jb2xsZWN0aW9uKTtcbiAgICAgICAgZGF0YXYyID0geyAuLi5kYXRhdjIsIGNvbGxlY3Rpb24gfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgc2VsbGVyRmVlQmFzaXNQb2ludHM6ICcsIHNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcblxuICAgICAgY29uc3QgbWludCA9IEtleXBhaXJBY2NvdW50LmNyZWF0ZSgpO1xuXG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IGNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZURlbGVhZ2F0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTWludEluc3RydWN0aW9uKFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW3NpZ25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCJpbXBvcnQge1xuICBQYXJ0aWFsU2lnbkluc3RydWN0aW9uLFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29yZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICBleHBvcnQgY29uc3QgZmVlUGF5ZXJQYXJ0aWFsU2lnblRyYW5zZmVyTmZ0ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICBmZWVQYXllcjogUHVia2V5XG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBTcGxUb2tlbi5mZWVQYXllclBhcnRpYWxTaWduVHJhbnNmZXIoXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBkZXN0LFxuICAgICAgc2lnbmVycyxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBmZWVQYXllclxuICAgICk7XG4gIH07XG59XG4iLCJpbXBvcnQge1xuICBJbnN0cnVjdGlvbixcbiAgS2V5cGFpckFjY291bnQsXG4gIFB1YmtleSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgUGRhIH0gZnJvbSAnaW50ZXJuYWwvc2hhcmVkLW1ldGFwbGV4JztcbmltcG9ydCB7IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgY3JlYXRlVGhhd0RlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICAvKipcbiAgICogVGhhd2luZyBhIHRhcmdldCBORlRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gc2V0dGVkIGZyZWV6ZSBhdXRob3JpdHkgb2YgbmZ0XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAgICAgLy8gZmVlIHBheWVyXG4gICAqL1xuICBleHBvcnQgY29uc3QgdGhhdyA9IChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFNlY3JldCxcbiAgICBmZWVQYXllcj86IFNlY3JldFxuICApOiBSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPiA9PiB7XG4gICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGVkaXRpb25BZGRyZXNzID0gUGRhLmdldE1hc3RlckVkaXRpb24obWludCk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUaGF3RGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uKHtcbiAgICAgICAgZGVsZWdhdGU6IG5ldyBLZXlwYWlyQWNjb3VudCh7IHNlY3JldDogZnJlZXplQXV0aG9yaXR5IH0pLnRvUHVibGljS2V5KCksXG4gICAgICAgIHRva2VuQWNjb3VudDogdG9rZW5BY2NvdW50LFxuICAgICAgICBlZGl0aW9uOiBlZGl0aW9uQWRkcmVzcyxcbiAgICAgICAgbWludDogbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IEluc3RydWN0aW9uKFxuICAgICAgICBbaW5zdF0sXG4gICAgICAgIFtmcmVlemVBdXRob3JpdHkudG9LZXlwYWlyKCldLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsImltcG9ydCB7IEluc3RydWN0aW9uLCBQdWJrZXksIFJlc3VsdCwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICdAc29sYW5hLXN1aXRlL2NvcmUnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE1ldGFwbGV4IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICBmZWVQYXllcj86IFNlY3JldFxuICApOiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFNwbFRva2VuLnRyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIHNpZ25lcnMsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICAgTkZUX0RFQ0lNQUxTLFxuICAgICAgZmVlUGF5ZXJcbiAgICApO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgTWV0YXBsZXggYXMgQnVybiB9IGZyb20gJy4vYnVybic7XG5pbXBvcnQgeyBNZXRhcGxleCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IE1ldGFwbGV4IGFzIEZyZWV6ZSB9IGZyb20gJy4vZnJlZXplJztcbmltcG9ydCB7IE1ldGFwbGV4IGFzIEZlZVBheWVyIH0gZnJvbSAnLi9mZWUtcGF5ZXItcGFydGlhbC1zaWduLW1pbnQnO1xuaW1wb3J0IHsgTWV0YXBsZXggYXMgRmVlUGF5ZXJUcmFuc2ZlciB9IGZyb20gJy4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlcic7XG5pbXBvcnQgeyBNZXRhcGxleCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IE1ldGFwbGV4IGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgTWV0YXBsZXggYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuZXhwb3J0IGNvbnN0IE1ldGFwbGV4ID0gT2JqZWN0LmFzc2lnbihcbiAge30sXG4gIEJ1cm4sXG4gIEZpbmQsXG4gIEZyZWV6ZSxcbiAgRmVlUGF5ZXIsXG4gIEZlZVBheWVyVHJhbnNmZXIsXG4gIE1pbnQsXG4gIFRoYXcsXG4gIFRyYW5zZmVyLFxuKTtcbiJdfQ==