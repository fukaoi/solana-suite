"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
  Metaplex: () => Metaplex9
});
module.exports = __toCommonJS(src_exports);

// src/metaplex/burn.ts
var import_core = require("@solana-suite/core");
var Metaplex;
((Metaplex10) => {
  const NFT_AMOUNT2 = 1;
  const NFT_DECIMALS = 0;
  Metaplex10.burn = (mint, owner, signer, feePayer) => {
    return import_core.SplToken.burn(
      mint,
      owner,
      [signer],
      NFT_AMOUNT2,
      NFT_DECIMALS,
      feePayer
    );
  };
})(Metaplex || (Metaplex = {}));

// src/metaplex/find.ts
var import_shared_metaplex = require("shared-metaplex");
var import_core2 = require("@solana-suite/core");
var Metaplex2;
((Metaplex10) => {
  Metaplex10.findByOwner = (owner, onOk, onErr, options) => __async(void 0, null, function* () {
    const sortable = !(options == null ? void 0 : options.sortable) ? import_core2.Sortable.Desc : options == null ? void 0 : options.sortable;
    const isHolder = !(options == null ? void 0 : options.isHolder) ? true : false;
    yield import_core2.SplToken.genericFindByOwner(
      owner,
      (result) => result.match(onOk, onErr),
      import_shared_metaplex.UserSideInput.TokenStandard.NonFungible,
      sortable,
      isHolder
    );
  });
  Metaplex10.findByMint = (mint) => __async(void 0, null, function* () {
    return yield import_core2.SplToken.genericFindByMint(
      mint,
      import_shared_metaplex.UserSideInput.TokenStandard.NonFungible
    );
  });
})(Metaplex2 || (Metaplex2 = {}));

// src/metaplex/freeze.ts
var import_shared = require("@solana-suite/shared");
var import_shared_metaplex2 = require("shared-metaplex");
var import_spl_token = require("@solana/spl-token");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var Metaplex3;
((Metaplex10) => {
  Metaplex10.freeze = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return (0, import_shared.Try)(() => {
      const tokenAccount = (0, import_spl_token.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = import_shared_metaplex2.Pda.getMasterEdition(mint);
      const inst = (0, import_mpl_token_metadata.createFreezeDelegatedAccountInstruction)({
        delegate: new import_shared.KeypairAccount({ secret: freezeAuthority }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new import_shared.Instruction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(Metaplex3 || (Metaplex3 = {}));

// src/metaplex/fee-payer-partial-sign-mint.ts
var import_shared4 = require("@solana-suite/shared");
var import_web32 = require("@solana/web3.js");
var import_storage2 = require("storage");
var import_shared_metaplex4 = require("shared-metaplex");

// src/metaplex/mint.ts
var import_web3 = require("@solana/web3.js");
var import_bn = __toESM(require("bn.js"));
var import_spl_token2 = require("@solana/spl-token");
var import_shared2 = require("@solana-suite/shared");
var import_storage = require("storage");
var import_shared_metaplex3 = require("internals/shared-metaplex");
var import_mpl_token_metadata2 = require("@metaplex-foundation/mpl-token-metadata");
var import_shared3 = require("@solana-suite/shared");
var NFT_AMOUNT = 1;
var Metaplex4;
((Metaplex10) => {
  Metaplex10.createDeleagateInstruction = (mint2, owner, delegateAuthority) => {
    const tokenAccount = (0, import_spl_token2.getAssociatedTokenAddressSync)(mint2, owner);
    return (0, import_spl_token2.createApproveInstruction)(
      tokenAccount,
      delegateAuthority,
      owner,
      NFT_AMOUNT
    );
  };
  Metaplex10.createMintInstructions = (mint2, owner, nftMetadata, feePayer, isMutable) => __async(void 0, null, function* () {
    const ata = (0, import_spl_token2.getAssociatedTokenAddressSync)(mint2, owner);
    const tokenMetadataPubkey = import_shared_metaplex3.Pda.getMetadata(mint2.toString());
    const masterEditionPubkey = import_shared_metaplex3.Pda.getMasterEdition(mint2.toString());
    const connection = import_shared3.Node.getConnection();
    const inst1 = import_web3.SystemProgram.createAccount({
      fromPubkey: feePayer,
      newAccountPubkey: mint2,
      lamports: yield (0, import_spl_token2.getMinimumBalanceForRentExemptMint)(connection),
      space: import_spl_token2.MINT_SIZE,
      programId: import_spl_token2.TOKEN_PROGRAM_ID
    });
    const inst2 = (0, import_spl_token2.createInitializeMintInstruction)(mint2, 0, owner, owner);
    const inst3 = (0, import_spl_token2.createAssociatedTokenAccountInstruction)(
      feePayer,
      ata,
      owner,
      mint2
    );
    const inst4 = (0, import_spl_token2.createMintToCheckedInstruction)(mint2, ata, owner, 1, 0);
    const inst5 = (0, import_mpl_token_metadata2.createCreateMetadataAccountV3Instruction)(
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
          collectionDetails: { __kind: "V1", size: new import_bn.default(1) }
        }
      }
    );
    const inst6 = (0, import_mpl_token_metadata2.createCreateMasterEditionV3Instruction)(
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
  Metaplex10.mint = (owner, signer, input, feePayer, freezeAuthority) => __async(void 0, null, function* () {
    return (0, import_shared2.Try)(() => __async(void 0, null, function* () {
      const valid = import_shared_metaplex3.Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const payer = feePayer ? feePayer : signer;
      let properties;
      if (input.properties && input.storageType) {
        properties = yield import_shared_metaplex3.Convert.Properties.intoInfraSide(
          input.properties,
          import_storage.Storage.uploadContent,
          input.storageType,
          payer
        );
      } else if (input.properties && !input.storageType) {
        throw Error("Must set storageType if will use properties");
      }
      input = __spreadProps(__spreadValues({}, input), {
        properties
      });
      const sellerFeeBasisPoints = import_shared_metaplex3.Royalty.convert(input.royalty);
      const nftStorageMetadata = import_storage.Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints
      );
      const createdAt = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      nftStorageMetadata.created_at = createdAt;
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = yield import_storage.Storage.uploadMetaAndContent(
          nftStorageMetadata,
          input.filePath,
          input.storageType,
          payer
        );
        (0, import_shared2.debugLog)("# upload content url: ", uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType + filePath' or 'uri'`);
      }
      let datav2 = import_shared_metaplex3.Convert.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      let collection;
      if (input.collection && input.collection) {
        collection = import_shared_metaplex3.Convert.Collection.intoInfraSide(input.collection);
        datav2 = __spreadProps(__spreadValues({}, datav2), { collection });
      }
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      (0, import_shared2.debugLog)("# input: ", input);
      (0, import_shared2.debugLog)("# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      (0, import_shared2.debugLog)("# datav2: ", datav2);
      const mint2 = import_shared2.KeypairAccount.create();
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
      return new import_shared2.MintInstruction(
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
  Metaplex10.feePayerPartialSignMint = (owner, signer, input, feePayer, freezeAuthority) => __async(void 0, null, function* () {
    return (0, import_shared4.Try)(() => __async(void 0, null, function* () {
      const valid = import_shared_metaplex4.Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const sellerFeeBasisPoints = import_shared_metaplex4.Royalty.convert(input.royalty);
      let uri = "";
      if (input.filePath && input.storageType === "nftStorage") {
        const properties = yield import_shared_metaplex4.Convert.Properties.intoInfraSide(
          input.properties,
          import_storage2.Storage.uploadContent,
          input.storageType
        );
        const nftStorageMetadata = import_storage2.Storage.toConvertOffchaindata(
          __spreadProps(__spreadValues({}, input), { properties }),
          sellerFeeBasisPoints
        );
        const uploaded = yield import_storage2.Storage.uploadMetaAndContent(
          nftStorageMetadata,
          input.filePath,
          input.storageType
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
        (0, import_shared4.debugLog)("# upload content url: ", uploaded);
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType=nftStorage + filePath' or 'uri'`);
      }
      let datav2 = import_shared_metaplex4.Convert.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      let collection;
      if (input.collection && input.collection) {
        collection = import_shared_metaplex4.Convert.Collection.intoInfraSide(input.collection);
        datav2 = __spreadProps(__spreadValues({}, datav2), { collection });
      }
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      (0, import_shared4.debugLog)("# input: ", input);
      (0, import_shared4.debugLog)("# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      (0, import_shared4.debugLog)("# datav2: ", datav2);
      const mint = import_shared4.KeypairAccount.create();
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
      const blockhashObj = yield import_shared4.Node.getConnection().getLatestBlockhash();
      const tx = new import_web32.Transaction({
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
      return new import_shared4.PartialSignInstruction(hex, mint.pubkey);
    }));
  });
})(Metaplex5 || (Metaplex5 = {}));

// src/metaplex/fee-payer-partial-sign-transfer.ts
var import_core3 = require("@solana-suite/core");
var Metaplex6;
((Metaplex10) => {
  const NFT_AMOUNT2 = 1;
  const NFT_DECIMALS = 0;
  Metaplex10.feePayerPartialSignTransferNft = (mint, owner, dest, signers, feePayer) => __async(void 0, null, function* () {
    return import_core3.SplToken.feePayerPartialSignTransfer(
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
var import_shared5 = require("@solana-suite/shared");
var import_shared_metaplex5 = require("shared-metaplex");
var import_spl_token3 = require("@solana/spl-token");
var import_mpl_token_metadata3 = require("@metaplex-foundation/mpl-token-metadata");
var Metaplex7;
((Metaplex10) => {
  Metaplex10.thaw = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return (0, import_shared5.Try)(() => {
      const tokenAccount = (0, import_spl_token3.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = import_shared_metaplex5.Pda.getMasterEdition(mint);
      const inst = (0, import_mpl_token_metadata3.createThawDelegatedAccountInstruction)({
        delegate: new import_shared5.KeypairAccount({ secret: freezeAuthority }).toPublicKey(),
        tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey()
      });
      return new import_shared5.Instruction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(Metaplex7 || (Metaplex7 = {}));

// src/metaplex/transfer.ts
var import_core4 = require("@solana-suite/core");
var Metaplex8;
((Metaplex10) => {
  const NFT_AMOUNT2 = 1;
  const NFT_DECIMALS = 0;
  Metaplex10.transfer = (mint, owner, dest, signers, feePayer) => __async(void 0, null, function* () {
    return import_core4.SplToken.transfer(
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
var Metaplex9 = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, Metaplex), Metaplex2), Metaplex3), Metaplex5), Metaplex6), Metaplex4), Metaplex7), Metaplex8);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Metaplex
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9tZXRhcGxleC9idXJuLnRzIiwgIi4uL3NyYy9tZXRhcGxleC9maW5kLnRzIiwgIi4uL3NyYy9tZXRhcGxleC9mcmVlemUudHMiLCAiLi4vc3JjL21ldGFwbGV4L2ZlZS1wYXllci1wYXJ0aWFsLXNpZ24tbWludC50cyIsICIuLi9zcmMvbWV0YXBsZXgvbWludC50cyIsICIuLi9zcmMvbWV0YXBsZXgvZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlci50cyIsICIuLi9zcmMvbWV0YXBsZXgvdGhhdy50cyIsICIuLi9zcmMvbWV0YXBsZXgvdHJhbnNmZXIudHMiLCAiLi4vc3JjL21ldGFwbGV4L2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL21ldGFwbGV4JztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuXG5cbiIsICJpbXBvcnQgeyBJbnN0cnVjdGlvbiwgUHVia2V5LCBSZXN1bHQsIFNlY3JldCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb3JlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZXRhcGxleCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4uYnVybihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIFtzaWduZXJdLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICAgIE5GVF9ERUNJTUFMUyxcbiAgICAgIGZlZVBheWVyXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQdWJrZXksIFJlc3VsdCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IFVzZXJTaWRlSW5wdXQgfSBmcm9tICdzaGFyZWQtbWV0YXBsZXgnO1xuaW1wb3J0IHsgRmluZCwgT25FcnIsIE9uT2ssIFNvcnRhYmxlLCBTcGxUb2tlbiB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29yZSc7XG5pbXBvcnQgeyBOZnRNZXRhZGF0YSB9IGZyb20gJy4uL3R5cGVzLyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG93bmVyIFB1YmtleVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtPbk9rfSBvbk9rIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T25FcnJ9IG9uRXJyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7e3NvcnRhYmxlPzogU29ydGFibGUsIGlzSG9sZGVyPzogYm9vbGVhbn19IG9wdGlvbnM/XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb25PazogT25PazxGaW5kPixcbiAgICBvbkVycjogT25FcnIsXG4gICAgb3B0aW9ucz86IHsgc29ydGFibGU/OiBTb3J0YWJsZTsgaXNIb2xkZXI/OiBib29sZWFuIH1cbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3Qgc29ydGFibGUgPSAhb3B0aW9ucz8uc29ydGFibGUgPyBTb3J0YWJsZS5EZXNjIDogb3B0aW9ucz8uc29ydGFibGU7XG4gICAgY29uc3QgaXNIb2xkZXIgPSAhb3B0aW9ucz8uaXNIb2xkZXIgPyB0cnVlIDogZmFsc2U7XG4gICAgYXdhaXQgU3BsVG9rZW4uZ2VuZXJpY0ZpbmRCeU93bmVyKFxuICAgICAgb3duZXIsXG4gICAgICAocmVzdWx0OiBSZXN1bHQ8W10sIEVycm9yPikgPT4gcmVzdWx0Lm1hdGNoKG9uT2ssIG9uRXJyKSxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgaXNIb2xkZXJcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleVxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgLy8gcmV0dXJuIGF3YWl0IFNwbFRva2VuLmdlbmVyaWNGaW5kQnlNaW50PE5mdE1ldGFkYXRhPihcbiAgICByZXR1cm4gYXdhaXQgU3BsVG9rZW4uZ2VuZXJpY0ZpbmRCeU1pbnQoXG4gICAgICBtaW50LFxuICAgICAgVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBJbnN0cnVjdGlvbixcbiAgS2V5cGFpckFjY291bnQsXG4gIFB1YmtleSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgUGRhIH0gZnJvbSAnc2hhcmVkLW1ldGFwbGV4JztcbmltcG9ydCB7IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgY3JlYXRlRnJlZXplRGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZXRhcGxleCB7XG4gIC8qKlxuICAgKiBGcmVlemluZyBhIHRhcmdldCBuZnRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gc2V0dGVkIGZyZWV6ZSBhdXRob3JpdHkgb2YgbmZ0XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAgICAgLy8gZmVlIHBheWVyXG4gICAqL1xuICBleHBvcnQgY29uc3QgZnJlZXplID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpXG4gICAgICApO1xuICAgICAgY29uc3QgZWRpdGlvbkFkZHJlc3MgPSBQZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZURlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbih7XG4gICAgICAgIGRlbGVnYXRlOiBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFjY291bnQ6IHRva2VuQWNjb3VudCxcbiAgICAgICAgZWRpdGlvbjogZWRpdGlvbkFkZHJlc3MsXG4gICAgICAgIG1pbnQ6IG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKClcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgZGVidWdMb2csXG4gIEtleXBhaXJBY2NvdW50LFxuICBOb2RlLFxuICBQYXJ0aWFsU2lnbkluc3RydWN0aW9uLFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnc3RvcmFnZSc7XG5cbmltcG9ydCB7XG4gIENvbnZlcnQsXG4gIFJveWFsdHksXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFZhbGlkYXRvcixcbn0gZnJvbSAnc2hhcmVkLW1ldGFwbGV4JztcblxuaW1wb3J0IHsgTWV0YXBsZXggYXMgX01pbnQgfSBmcm9tICcuL21pbnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE1ldGFwbGV4IHtcbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50IGFuZCBORlQgbWludCB3aXRoIFBhcnRpYWwgU2lnblxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgLy8gZmlyc3QgbWludGVkIG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBzaWduZXIgICAgICAgICAvLyBvd25lcidzIFNlY3JldFxuICAgKiBAcGFyYW0ge1VzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGF9IGlucHV0XG4gICAqIHtcbiAgICogICBuYW1lOiBzdHJpbmcgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sOiBzdHJpbmcgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBmaWxlUGF0aDogc3RyaW5nIHwgRmlsZSAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIHJveWFsdHk6IG51bWJlciAgICAgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIHN0b3JhZ2VUeXBlOiAnYXJ3ZWF2ZSd8J25mdFN0b3JhZ2UnIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGRlc2NyaXB0aW9uPzogc3RyaW5nICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgZXh0ZXJuYWxfdXJsPzogc3RyaW5nICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiBNZXRhZGF0YUF0dHJpYnV0ZVtdICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzogTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT4gLy8gaW5jbHVkZSBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBQdWJrZXkgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIFtrZXk6IHN0cmluZ10/OiB1bmtub3duICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiAgIGNyZWF0b3JzPzogSW5wdXRDcmVhdG9yc1tdICAgICAgICAgIC8vIG90aGVyIGNyZWF0b3JzIHRoYW4gb3duZXJcbiAgICogICB1c2VzPzogVXNlcyAgICAgICAgICAgICAgICAgICAvLyB1c2FnZSBmZWF0dXJlOiBidXJuLCBzaW5nbGUsIG11bHRpcGxlXG4gICAqICAgaXNNdXRhYmxlPzogYm9vbGVhbiAgICAgICAgICAgLy8gZW5hYmxlIHVwZGF0ZSgpXG4gICAqIH1cbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgICAgICAgIC8vIGZlZSBwYXllclxuICAgKiBAcGFyYW0ge1B1YmtleX0gZnJlZXplQXV0aG9yaXR5PyAgLy8gZnJlZXplIGF1dGhvcml0eVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmZWVQYXllclBhcnRpYWxTaWduTWludCA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgIGZlZVBheWVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5PzogU2VjcmV0XG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8VXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IFJveWFsdHkuY29udmVydChpbnB1dC5yb3lhbHR5KTtcblxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG4gICAgICBsZXQgdXJpID0gJyc7XG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGggJiYgaW5wdXQuc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydC5Qcm9wZXJ0aWVzLmludG9JbmZyYVNpZGUoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZENvbnRlbnQsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGVcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBuZnRTdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgICB7IC4uLmlucHV0LCBwcm9wZXJ0aWVzIH0sXG4gICAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHNcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCB1cGxvYWRlZCA9IGF3YWl0IFN0b3JhZ2UudXBsb2FkTWV0YUFuZENvbnRlbnQoXG4gICAgICAgICAgbmZ0U3RvcmFnZU1ldGFkYXRhLFxuICAgICAgICAgIGlucHV0LmZpbGVQYXRoLFxuICAgICAgICAgIGlucHV0LnN0b3JhZ2VUeXBlXG4gICAgICAgICk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVwbG9hZGVkKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIHVyaSA9IGlucHV0LnVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCAnc3RvcmFnZVR5cGU9bmZ0U3RvcmFnZSArIGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG5cbiAgICAgIGxldCBkYXRhdjIgPSBDb252ZXJ0Lk5mdE1ldGFkYXRhLmludG9JbmZyYVNpZGUoXG4gICAgICAgIGlucHV0LFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzXG4gICAgICApO1xuXG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuICAgICAgbGV0IGNvbGxlY3Rpb247XG4gICAgICBpZiAoaW5wdXQuY29sbGVjdGlvbiAmJiBpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24gPSBDb252ZXJ0LkNvbGxlY3Rpb24uaW50b0luZnJhU2lkZShpbnB1dC5jb2xsZWN0aW9uKTtcbiAgICAgICAgZGF0YXYyID0geyAuLi5kYXRhdjIsIGNvbGxlY3Rpb24gfTtcbiAgICAgIH1cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG5cbiAgICAgIGNvbnN0IGlzTXV0YWJsZSA9IGlucHV0LmlzTXV0YWJsZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlucHV0LmlzTXV0YWJsZTtcblxuICAgICAgZGVidWdMb2coJyMgaW5wdXQ6ICcsIGlucHV0KTtcbiAgICAgIGRlYnVnTG9nKCcjIHNlbGxlckZlZUJhc2lzUG9pbnRzOiAnLCBzZWxsZXJGZWVCYXNpc1BvaW50cyk7XG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBLZXlwYWlyQWNjb3VudC5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGluc3RzID0gYXdhaXQgX01pbnQuY3JlYXRlTWludEluc3RydWN0aW9ucyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIGZlZVBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGlzTXV0YWJsZVxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgX01pbnQuY3JlYXRlRGVsZWFnYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KClcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgY29uc3QgdHggPSBuZXcgVHJhbnNhY3Rpb24oe1xuICAgICAgICBsYXN0VmFsaWRCbG9ja0hlaWdodDogYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0LFxuICAgICAgICBibG9ja2hhc2g6IGJsb2NraGFzaE9iai5ibG9ja2hhc2gsXG4gICAgICAgIGZlZVBheWVyOiBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgfSk7XG5cbiAgICAgIGluc3RzLmZvckVhY2goKGluc3QpID0+IHR4LmFkZChpbnN0KSk7XG4gICAgICB0eC5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgW3NpZ25lciwgbWludF0uZm9yRWFjaCgoc2lnbmVyKSA9PiB0eC5wYXJ0aWFsU2lnbihzaWduZXIudG9LZXlwYWlyKCkpKTtcblxuICAgICAgY29uc3Qgc2VyaWFsaXplZFR4ID0gdHguc2VyaWFsaXplKHtcbiAgICAgICAgcmVxdWlyZUFsbFNpZ25hdHVyZXM6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBoZXggPSBzZXJpYWxpemVkVHgudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgcmV0dXJuIG5ldyBQYXJ0aWFsU2lnbkluc3RydWN0aW9uKGhleCwgbWludC5wdWJrZXkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQXBwcm92ZUluc3RydWN0aW9uLFxuICBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIGdldE1pbmltdW1CYWxhbmNlRm9yUmVudEV4ZW1wdE1pbnQsXG4gIE1JTlRfU0laRSxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHtcbiAgZGVidWdMb2csXG4gIEtleXBhaXJBY2NvdW50LFxuICBNaW50SW5zdHJ1Y3Rpb24sXG4gIFB1YmtleSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnc3RvcmFnZSc7XG5cbmltcG9ydCB7XG4gIENvbnZlcnQsXG4gIFBkYSxcbiAgUm95YWx0eSxcbiAgVXNlclNpZGVJbnB1dCxcbiAgVmFsaWRhdG9yLFxufSBmcm9tICdpbnRlcm5hbHMvc2hhcmVkLW1ldGFwbGV4JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlQ3JlYXRlTWFzdGVyRWRpdGlvblYzSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24sXG4gIERhdGFWMixcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5jb25zdCBORlRfQU1PVU5UID0gMTtcbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICBleHBvcnQgY29uc3QgY3JlYXRlRGVsZWFnYXRlSW5zdHJ1Y3Rpb24gPSAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgZGVsZWdhdGVBdXRob3JpdHk6IFB1YmxpY0tleSxcbiAgKTogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiA9PiB7XG4gICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZUFwcHJvdmVJbnN0cnVjdGlvbihcbiAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgIGRlbGVnYXRlQXV0aG9yaXR5LFxuICAgICAgb3duZXIsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMgPSBhc3luYyAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgbmZ0TWV0YWRhdGE6IERhdGFWMixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICAgIGlzTXV0YWJsZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uW10+ID0+IHtcbiAgICBjb25zdCBhdGEgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhtaW50LCBvd25lcik7XG4gICAgY29uc3QgdG9rZW5NZXRhZGF0YVB1YmtleSA9IFBkYS5nZXRNZXRhZGF0YShtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IG1hc3RlckVkaXRpb25QdWJrZXkgPSBQZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50LnRvU3RyaW5nKCkpO1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcblxuICAgIGNvbnN0IGluc3QxID0gU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLFxuICAgICAgbmV3QWNjb3VudFB1YmtleTogbWludCxcbiAgICAgIGxhbXBvcnRzOiBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pLFxuICAgICAgc3BhY2U6IE1JTlRfU0laRSxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGluc3QyID0gY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihtaW50LCAwLCBvd25lciwgb3duZXIpO1xuXG4gICAgY29uc3QgaW5zdDMgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICBmZWVQYXllcixcbiAgICAgIGF0YSxcbiAgICAgIG93bmVyLFxuICAgICAgbWludCxcbiAgICApO1xuXG4gICAgY29uc3QgaW5zdDQgPSBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24obWludCwgYXRhLCBvd25lciwgMSwgMCk7XG5cbiAgICBjb25zdCBpbnN0NSA9IGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24oXG4gICAgICB7XG4gICAgICAgIG1ldGFkYXRhOiB0b2tlbk1ldGFkYXRhUHVia2V5LFxuICAgICAgICBtaW50LFxuICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG93bmVyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY3JlYXRlTWV0YWRhdGFBY2NvdW50QXJnc1YzOiB7XG4gICAgICAgICAgZGF0YTogbmZ0TWV0YWRhdGEsXG4gICAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgICAgIGNvbGxlY3Rpb25EZXRhaWxzOiB7IF9fa2luZDogJ1YxJywgc2l6ZTogbmV3IEJOKDEpIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICBjb25zdCBpbnN0NiA9IGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uKFxuICAgICAge1xuICAgICAgICBlZGl0aW9uOiBtYXN0ZXJFZGl0aW9uUHVia2V5LFxuICAgICAgICBtaW50LFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICBtaW50QXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgcGF5ZXI6IGZlZVBheWVyLFxuICAgICAgICBtZXRhZGF0YTogdG9rZW5NZXRhZGF0YVB1YmtleSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNyZWF0ZU1hc3RlckVkaXRpb25BcmdzOiB7XG4gICAgICAgICAgbWF4U3VwcGx5OiAwLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIHJldHVybiBbaW5zdDEsIGluc3QyLCBpbnN0MywgaW5zdDQsIGluc3Q1LCBpbnN0Nl07XG4gIH07XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBjb250ZW50IGFuZCBORlQgbWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgLy8gZmlyc3QgbWludGVkIG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBzaWduZXIgICAgICAgICAvLyBvd25lcidzIFNlY3JldFxuICAgKiBAcGFyYW0ge1VzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGF9IGlucHV0XG4gICAqIHtcbiAgICogICBuYW1lOiBzdHJpbmcgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sOiBzdHJpbmcgICAgICAgICAgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICBmaWxlUGF0aDogc3RyaW5nIHwgRmlsZSAgICAvLyBuZnQgdGlja2VyIHN5bWJvbFxuICAgKiAgIHJveWFsdHk6IG51bWJlciAgICAgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIHN0b3JhZ2VUeXBlOiAnYXJ3ZWF2ZSd8J25mdFN0b3JhZ2UnIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGRlc2NyaXB0aW9uPzogc3RyaW5nICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgZXh0ZXJuYWxfdXJsPzogc3RyaW5nICAgICAgLy8gbGFuZGluZyBwYWdlLCBob21lIHBhZ2UgdXJpLCByZWxhdGVkIHVybFxuICAgKiAgIGF0dHJpYnV0ZXM/OiBNZXRhZGF0YUF0dHJpYnV0ZVtdICAgICAvLyBnYW1lIGNoYXJhY3RlciBwYXJhbWV0ZXIsIHBlcnNvbmFsaXR5LCBjaGFyYWN0ZXJpc3RpY3NcbiAgICogICBwcm9wZXJ0aWVzPzogTWV0YWRhdGFQcm9wZXJ0aWVzPFVyaT4gLy8gaW5jbHVkZSBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBQdWJrZXkgICAgICAgICAgIC8vIGNvbGxlY3Rpb25zIG9mIGRpZmZlcmVudCBjb2xvcnMsIHNoYXBlcywgZXRjLlxuICAgKiAgIGNyZWF0b3JzPzogSW5wdXRDcmVhdG9yc1tdICAgIC8vIG90aGVyIGNyZWF0b3JzIHRoYW4gb3duZXJcbiAgICogICB1c2VzPzogVXNlcyAgICAgICAgICAgICAgICAgICAvLyB1c2FnZSBmZWF0dXJlOiBidXJuLCBzaW5nbGUsIG11bHRpcGxlXG4gICAqICAgaXNNdXRhYmxlPzogYm9vbGVhbiAgICAgICAgICAgLy8gZW5hYmxlIHVwZGF0ZSgpXG4gICAqICAgb3B0aW9ucz86IFtrZXk6IHN0cmluZ10/OiB1bmtub3duICAgICAgIC8vIG9wdGlvbmFsIHBhcmFtLCBVc3VhbGx5IG5vdCB1c2VkLlxuICAgKiB9XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZyZWV6ZUF1dGhvcml0eT8gIC8vIGZyZWV6ZSBhdXRob3JpdHlcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtaW50ID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyOiBTZWNyZXQsXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgZnJlZXplQXV0aG9yaXR5PzogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxNaW50SW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdmFsaWQgPSBWYWxpZGF0b3IuY2hlY2tBbGw8VXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YT4oaW5wdXQpO1xuICAgICAgaWYgKHZhbGlkLmlzRXJyKSB7XG4gICAgICAgIHRocm93IHZhbGlkLmVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBzaWduZXI7XG5cbiAgICAgIC8vLS0tIHBvcnBlcnRpZXMsIFVwbG9hZCBjb250ZW50IC0tLVxuICAgICAgbGV0IHByb3BlcnRpZXM7XG4gICAgICBpZiAoaW5wdXQucHJvcGVydGllcyAmJiBpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydC5Qcm9wZXJ0aWVzLmludG9JbmZyYVNpZGUoXG4gICAgICAgICAgaW5wdXQucHJvcGVydGllcyxcbiAgICAgICAgICBTdG9yYWdlLnVwbG9hZENvbnRlbnQsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnByb3BlcnRpZXMgJiYgIWlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdNdXN0IHNldCBzdG9yYWdlVHlwZSBpZiB3aWxsIHVzZSBwcm9wZXJ0aWVzJyk7XG4gICAgICB9XG5cbiAgICAgIGlucHV0ID0ge1xuICAgICAgICAuLi5pbnB1dCxcbiAgICAgICAgcHJvcGVydGllcyxcbiAgICAgIH07XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgY29uc3Qgc2VsbGVyRmVlQmFzaXNQb2ludHMgPSBSb3lhbHR5LmNvbnZlcnQoaW5wdXQucm95YWx0eSk7XG4gICAgICBjb25zdCBuZnRTdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgKTtcblxuICAgICAgLy8gY3JlYXRlZCBhdCBieSB1bml4IHRpbWVzdGFtcFxuICAgICAgY29uc3QgY3JlYXRlZEF0ID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuICAgICAgbmZ0U3RvcmFnZU1ldGFkYXRhLmNyZWF0ZWRfYXQgPSBjcmVhdGVkQXQ7XG5cbiAgICAgIGxldCB1cmkhOiBzdHJpbmc7XG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGggJiYgaW5wdXQuc3RvcmFnZVR5cGUpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZE1ldGFBbmRDb250ZW50KFxuICAgICAgICAgIG5mdFN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBpbnB1dC5zdG9yYWdlVHlwZSxcbiAgICAgICAgICBwYXllcixcbiAgICAgICAgKTtcbiAgICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQgdXJsOiAnLCB1cGxvYWRlZCk7XG4gICAgICAgIGlmICh1cGxvYWRlZC5pc0Vycikge1xuICAgICAgICAgIHRocm93IHVwbG9hZGVkO1xuICAgICAgICB9XG4gICAgICAgIHVyaSA9IHVwbG9hZGVkLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgdXJpID0gaW5wdXQudXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0ICdzdG9yYWdlVHlwZSArIGZpbGVQYXRoJyBvciAndXJpJ2ApO1xuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YXYyID0gQ29udmVydC5OZnRNZXRhZGF0YS5pbnRvSW5mcmFTaWRlKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG4gICAgICBsZXQgY29sbGVjdGlvbjtcbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uICYmIGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbiA9IENvbnZlcnQuQ29sbGVjdGlvbi5pbnRvSW5mcmFTaWRlKGlucHV0LmNvbGxlY3Rpb24pO1xuICAgICAgICBkYXRhdjIgPSB7IC4uLmRhdGF2MiwgY29sbGVjdGlvbiB9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBzZWxsZXJGZWVCYXNpc1BvaW50czogJywgc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBtaW50ID0gS2V5cGFpckFjY291bnQuY3JlYXRlKCk7XG5cbiAgICAgIGNvbnN0IGluc3RzID0gYXdhaXQgY3JlYXRlTWludEluc3RydWN0aW9ucyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBkYXRhdjIsXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLnB1YmxpY0tleSxcbiAgICAgICAgaXNNdXRhYmxlLFxuICAgICAgKTtcblxuICAgICAgLy8gZnJlZXplQXV0aG9yaXR5XG4gICAgICBpZiAoZnJlZXplQXV0aG9yaXR5KSB7XG4gICAgICAgIGluc3RzLnB1c2goXG4gICAgICAgICAgY3JlYXRlRGVsZWFnYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNaW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIGluc3RzLFxuICAgICAgICBbc2lnbmVyLnRvS2V5cGFpcigpLCBtaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG1pbnQucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBQYXJ0aWFsU2lnbkluc3RydWN0aW9uLFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29yZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICBleHBvcnQgY29uc3QgZmVlUGF5ZXJQYXJ0aWFsU2lnblRyYW5zZmVyTmZ0ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICBmZWVQYXllcjogUHVia2V5XG4gICk6IFByb21pc2U8UmVzdWx0PFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBTcGxUb2tlbi5mZWVQYXllclBhcnRpYWxTaWduVHJhbnNmZXIoXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBkZXN0LFxuICAgICAgc2lnbmVycyxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBmZWVQYXllclxuICAgICk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgSW5zdHJ1Y3Rpb24sXG4gIEtleXBhaXJBY2NvdW50LFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IFBkYSB9IGZyb20gJ3NoYXJlZC1tZXRhcGxleCc7XG5pbXBvcnQgeyBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24gfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE1ldGFwbGV4IHtcbiAgLyoqXG4gICAqIFRoYXdpbmcgYSB0YXJnZXQgTkZUXG4gICAqIGl0IHNob3VsZCBzZXQgdG8gZnJlZXplQXV0aG9yaXR5IHdoZW4gbWludCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50ICAgICAgICAgICAgIC8vIG1pbnQgYWRkcmVzc1xuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXIgICAgICAgICAgICAvLyBjdXJyZW50IG93bmVyXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmcmVlemVBdXRob3JpdHkgIC8vIHNldHRlZCBmcmVlemUgYXV0aG9yaXR5IG9mIG5mdFxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXI/ICAgICAgIC8vIGZlZSBwYXllclxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHRoYXcgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXRcbiAgKTogUmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIGNvbnN0IHBheWVyID0gZmVlUGF5ZXIgPyBmZWVQYXllciA6IGZyZWV6ZUF1dGhvcml0eTtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KClcbiAgICAgICk7XG4gICAgICBjb25zdCBlZGl0aW9uQWRkcmVzcyA9IFBkYS5nZXRNYXN0ZXJFZGl0aW9uKG1pbnQpO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlVGhhd0RlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbih7XG4gICAgICAgIGRlbGVnYXRlOiBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFjY291bnQ6IHRva2VuQWNjb3VudCxcbiAgICAgICAgZWRpdGlvbjogZWRpdGlvbkFkZHJlc3MsXG4gICAgICAgIG1pbnQ6IG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKClcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgSW5zdHJ1Y3Rpb24sIFB1YmtleSwgUmVzdWx0LCBTZWNyZXQgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29yZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICBjb25zdCBORlRfQU1PVU5UID0gMTtcbiAgY29uc3QgTkZUX0RFQ0lNQUxTID0gMDtcblxuICBleHBvcnQgY29uc3QgdHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFByb21pc2U8UmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4udHJhbnNmZXIoXG4gICAgICBtaW50LFxuICAgICAgb3duZXIsXG4gICAgICBkZXN0LFxuICAgICAgc2lnbmVycyxcbiAgICAgIE5GVF9BTU9VTlQsXG4gICAgICBORlRfREVDSU1BTFMsXG4gICAgICBmZWVQYXllclxuICAgICk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgTWV0YXBsZXggYXMgQnVybiB9IGZyb20gJy4vYnVybic7XG5pbXBvcnQgeyBNZXRhcGxleCBhcyBGaW5kIH0gZnJvbSAnLi9maW5kJztcbmltcG9ydCB7IE1ldGFwbGV4IGFzIEZyZWV6ZSB9IGZyb20gJy4vZnJlZXplJztcbmltcG9ydCB7IE1ldGFwbGV4IGFzIEZlZVBheWVyIH0gZnJvbSAnLi9mZWUtcGF5ZXItcGFydGlhbC1zaWduLW1pbnQnO1xuaW1wb3J0IHsgTWV0YXBsZXggYXMgRmVlUGF5ZXJUcmFuc2ZlciB9IGZyb20gJy4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlcic7XG5pbXBvcnQgeyBNZXRhcGxleCBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IE1ldGFwbGV4IGFzIFRoYXcgfSBmcm9tICcuL3RoYXcnO1xuaW1wb3J0IHsgTWV0YXBsZXggYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcblxuZXhwb3J0IGNvbnN0IE1ldGFwbGV4ID0ge1xuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkZlZVBheWVyLFxuICAuLi5GZWVQYXllclRyYW5zZmVyLFxuICAuLi5NaW50LFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLGtCQUFBQTtBQUFBO0FBQUE7OztBQ0NBLGtCQUF5QjtBQUVsQixJQUFVO0FBQUEsQ0FBVixDQUFVQyxlQUFWO0FBQ0wsUUFBTUMsY0FBYTtBQUNuQixRQUFNLGVBQWU7QUFFZCxFQUFNRCxXQUFBLE9BQU8sQ0FDbEIsTUFDQSxPQUNBLFFBQ0EsYUFDK0I7QUFDL0IsV0FBTyxxQkFBUztBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQSxDQUFDLE1BQU07QUFBQSxNQUNQQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxHQWxCZTs7O0FDRmpCLDZCQUE4QjtBQUM5QixJQUFBQyxlQUFzRDtBQUcvQyxJQUFVQztBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQVVFLEVBQU1BLFdBQUEsY0FBYyxDQUN6QixPQUNBLE1BQ0EsT0FDQSxZQUNrQjtBQUNsQixVQUFNLFdBQVcsRUFBQyxtQ0FBUyxZQUFXLHNCQUFTLE9BQU8sbUNBQVM7QUFDL0QsVUFBTSxXQUFXLEVBQUMsbUNBQVMsWUFBVyxPQUFPO0FBQzdDLFVBQU0sc0JBQVM7QUFBQSxNQUNi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WUFBWTtBQUFBLFFBQ3RFO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxNQUFNLEtBQUssWUFBWTtBQUFBLE1BQ3pCLENBQUM7QUFDRCxhQUFPLElBQUk7QUFBQSxRQUNULENBQUMsSUFBSTtBQUFBLFFBQ0wsQ0FBQyxnQkFBZ0IsVUFBVSxDQUFDO0FBQUEsUUFDNUIsTUFBTSxVQUFVO0FBQUEsTUFDbEI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsR0FwQ2VBLDBCQUFBOzs7QUNYakIsSUFBQUMsZUFBeUI7QUFFbEIsSUFBVUM7QUFBQSxDQUFWLENBQVVBLGVBQVY7QUFDTCxRQUFNQyxjQUFhO0FBQ25CLFFBQU0sZUFBZTtBQUVkLEVBQU1ELFdBQUEsV0FBVyxDQUN0QixNQUNBLE9BQ0EsTUFDQSxTQUNBLGFBQ3dDO0FBQ3hDLFdBQU8sc0JBQVM7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQUM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsR0FwQmVELDBCQUFBOzs7QUNNVixJQUFNRSxZQUFXLDRIQUNuQixXQUNBQSxZQUNBQSxZQUNBQSxZQUNBQSxZQUNBQSxZQUNBQSxZQUNBQTsiLAogICJuYW1lcyI6IFsiTWV0YXBsZXgiLCAiTWV0YXBsZXgiLCAiTkZUX0FNT1VOVCIsICJpbXBvcnRfY29yZSIsICJNZXRhcGxleCIsICJpbXBvcnRfc2hhcmVkX21ldGFwbGV4IiwgIk1ldGFwbGV4IiwgImltcG9ydF9zaGFyZWQiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3N0b3JhZ2UiLCAiaW1wb3J0X3NoYXJlZF9tZXRhcGxleCIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9zaGFyZWQiLCAiaW1wb3J0X3NoYXJlZF9tZXRhcGxleCIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIk1ldGFwbGV4IiwgIm1pbnQiLCAiQk4iLCAiTWV0YXBsZXgiLCAic2lnbmVyIiwgImltcG9ydF9jb3JlIiwgIk1ldGFwbGV4IiwgIk5GVF9BTU9VTlQiLCAiaW1wb3J0X3NoYXJlZCIsICJpbXBvcnRfc2hhcmVkX21ldGFwbGV4IiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJNZXRhcGxleCIsICJpbXBvcnRfY29yZSIsICJNZXRhcGxleCIsICJORlRfQU1PVU5UIiwgIk1ldGFwbGV4Il0KfQo=