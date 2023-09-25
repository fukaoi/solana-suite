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
  Metaplex10.findByOwner = async (owner, onOk, onErr, options) => {
    const sortable = !options?.sortable ? import_core2.Sortable.Desc : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    await import_core2.SplToken.genericFindByOwner(
      owner,
      (result) => result.match(onOk, onErr),
      import_shared_metaplex.UserSideInput.TokenStandard.NonFungible,
      sortable,
      isHolder
    );
  };
  Metaplex10.findByMint = async (mint) => {
    return await import_core2.SplToken.genericFindByMint(
      mint,
      import_shared_metaplex.UserSideInput.TokenStandard.NonFungible
    );
  };
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
var import_converter = require("converter");
var import_validator = require("validator");

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
  Metaplex10.createMintInstructions = async (mint2, owner, nftMetadata, feePayer, isMutable) => {
    const ata = (0, import_spl_token2.getAssociatedTokenAddressSync)(mint2, owner);
    const tokenMetadataPubkey = import_shared_metaplex3.Pda.getMetadata(mint2.toString());
    const masterEditionPubkey = import_shared_metaplex3.Pda.getMasterEdition(mint2.toString());
    const connection = import_shared3.Node.getConnection();
    const inst1 = import_web3.SystemProgram.createAccount({
      fromPubkey: feePayer,
      newAccountPubkey: mint2,
      lamports: await (0, import_spl_token2.getMinimumBalanceForRentExemptMint)(connection),
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
  };
  Metaplex10.mint = async (owner, signer, input, feePayer, freezeAuthority) => {
    return (0, import_shared2.Try)(async () => {
      const valid = import_shared_metaplex3.Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const payer = feePayer ? feePayer : signer;
      let properties;
      if (input.properties && input.storageType) {
        properties = await import_shared_metaplex3.Convert.Properties.intoInfraSide(
          input.properties,
          import_storage.Storage.uploadContent,
          input.storageType,
          payer
        );
      } else if (input.properties && !input.storageType) {
        throw Error("Must set storageType if will use properties");
      }
      input = {
        ...input,
        properties
      };
      const sellerFeeBasisPoints = import_shared_metaplex3.Royalty.convert(input.royalty);
      const nftStorageMetadata = import_storage.Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints
      );
      const createdAt = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      nftStorageMetadata.created_at = createdAt;
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = await import_storage.Storage.uploadMetaAndContent(
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
        datav2 = { ...datav2, collection };
      }
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      (0, import_shared2.debugLog)("# input: ", input);
      (0, import_shared2.debugLog)("# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      (0, import_shared2.debugLog)("# datav2: ", datav2);
      const mint2 = import_shared2.KeypairAccount.create();
      const insts = await (0, Metaplex10.createMintInstructions)(
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
    });
  };
})(Metaplex4 || (Metaplex4 = {}));

// src/metaplex/fee-payer-partial-sign-mint.ts
var Metaplex5;
((Metaplex10) => {
  Metaplex10.feePayerPartialSignMint = async (owner, signer, input, feePayer, freezeAuthority) => {
    return (0, import_shared4.Try)(async () => {
      const valid = import_validator.Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const sellerFeeBasisPoints = import_converter.Converter.Royalty.convert(input.royalty);
      let uri = "";
      if (input.filePath && input.storageType === "nftStorage") {
        const properties = await import_converter.Converter.Properties.intoInfraSide(
          input.properties,
          import_storage2.Storage.uploadContent,
          input.storageType
        );
        const nftStorageMetadata = import_storage2.Storage.toConvertOffchaindata(
          { ...input, properties },
          sellerFeeBasisPoints
        );
        const uploaded = await import_storage2.Storage.uploadMetaAndContent(
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
      let datav2 = import_converter.Converter.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      let collection;
      if (input.collection && input.collection) {
        collection = import_converter.Converter.Collection.intoInfraSide(input.collection);
        datav2 = { ...datav2, collection };
      }
      const isMutable = input.isMutable === void 0 ? true : input.isMutable;
      (0, import_shared4.debugLog)("# input: ", input);
      (0, import_shared4.debugLog)("# sellerFeeBasisPoints: ", sellerFeeBasisPoints);
      (0, import_shared4.debugLog)("# datav2: ", datav2);
      const mint = import_shared4.KeypairAccount.create();
      const insts = await Metaplex4.createMintInstructions(
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
      const blockhashObj = await import_shared4.Node.getConnection().getLatestBlockhash();
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
    });
  };
})(Metaplex5 || (Metaplex5 = {}));

// src/metaplex/fee-payer-partial-sign-transfer.ts
var import_core3 = require("@solana-suite/core");
var Metaplex6;
((Metaplex10) => {
  const NFT_AMOUNT2 = 1;
  const NFT_DECIMALS = 0;
  Metaplex10.feePayerPartialSignTransferNft = async (mint, owner, dest, signers, feePayer) => {
    return import_core3.SplToken.feePayerPartialSignTransfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT2,
      NFT_DECIMALS,
      feePayer
    );
  };
})(Metaplex6 || (Metaplex6 = {}));

// src/metaplex/thaw.ts
var import_shared5 = require("@solana-suite/shared");
var import_shared_metaplex4 = require("shared-metaplex");
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
      const editionAddress = import_shared_metaplex4.Pda.getMasterEdition(mint);
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
  Metaplex10.transfer = async (mint, owner, dest, signers, feePayer) => {
    return import_core4.SplToken.transfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT2,
      NFT_DECIMALS,
      feePayer
    );
  };
})(Metaplex8 || (Metaplex8 = {}));

// src/metaplex/index.ts
var Metaplex9 = {
  ...Metaplex,
  ...Metaplex2,
  ...Metaplex3,
  ...Metaplex5,
  ...Metaplex6,
  ...Metaplex4,
  ...Metaplex7,
  ...Metaplex8
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Metaplex
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9tZXRhcGxleC9idXJuLnRzIiwgIi4uL3NyYy9tZXRhcGxleC9maW5kLnRzIiwgIi4uL3NyYy9tZXRhcGxleC9mcmVlemUudHMiLCAiLi4vc3JjL21ldGFwbGV4L2ZlZS1wYXllci1wYXJ0aWFsLXNpZ24tbWludC50cyIsICIuLi9zcmMvbWV0YXBsZXgvbWludC50cyIsICIuLi9zcmMvbWV0YXBsZXgvZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlci50cyIsICIuLi9zcmMvbWV0YXBsZXgvdGhhdy50cyIsICIuLi9zcmMvbWV0YXBsZXgvdHJhbnNmZXIudHMiLCAiLi4vc3JjL21ldGFwbGV4L2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL21ldGFwbGV4JztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuXG5cbiIsICJpbXBvcnQgeyBJbnN0cnVjdGlvbiwgUHVia2V5LCBSZXN1bHQsIFNlY3JldCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9jb3JlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZXRhcGxleCB7XG4gIGNvbnN0IE5GVF9BTU9VTlQgPSAxO1xuICBjb25zdCBORlRfREVDSU1BTFMgPSAwO1xuXG4gIGV4cG9ydCBjb25zdCBidXJuID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4uYnVybihcbiAgICAgIG1pbnQsXG4gICAgICBvd25lcixcbiAgICAgIFtzaWduZXJdLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICAgIE5GVF9ERUNJTUFMUyxcbiAgICAgIGZlZVBheWVyXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBQdWJrZXksIFJlc3VsdCB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmltcG9ydCB7IFVzZXJTaWRlSW5wdXQgfSBmcm9tICdzaGFyZWQtbWV0YXBsZXgnO1xuaW1wb3J0IHsgRmluZCwgT25FcnIsIE9uT2ssIFNvcnRhYmxlLCBTcGxUb2tlbiB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29yZSc7XG5pbXBvcnQgeyBOZnRNZXRhZGF0YSB9IGZyb20gJy4uL3R5cGVzLyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTWV0YXBsZXgge1xuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG93bmVyIFB1YmtleVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtPbk9rfSBvbk9rIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T25FcnJ9IG9uRXJyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7e3NvcnRhYmxlPzogU29ydGFibGUsIGlzSG9sZGVyPzogYm9vbGVhbn19IG9wdGlvbnM/XG4gICAqIEByZXR1cm4gUHJvbWlzZTx2b2lkPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IGZpbmRCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgb25PazogT25PazxGaW5kPixcbiAgICBvbkVycjogT25FcnIsXG4gICAgb3B0aW9ucz86IHsgc29ydGFibGU/OiBTb3J0YWJsZTsgaXNIb2xkZXI/OiBib29sZWFuIH1cbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3Qgc29ydGFibGUgPSAhb3B0aW9ucz8uc29ydGFibGUgPyBTb3J0YWJsZS5EZXNjIDogb3B0aW9ucz8uc29ydGFibGU7XG4gICAgY29uc3QgaXNIb2xkZXIgPSAhb3B0aW9ucz8uaXNIb2xkZXIgPyB0cnVlIDogZmFsc2U7XG4gICAgYXdhaXQgU3BsVG9rZW4uZ2VuZXJpY0ZpbmRCeU93bmVyKFxuICAgICAgb3duZXIsXG4gICAgICAocmVzdWx0OiBSZXN1bHQ8W10sIEVycm9yPikgPT4gcmVzdWx0Lm1hdGNoKG9uT2ssIG9uRXJyKSxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgaXNIb2xkZXJcbiAgICApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBGZXRjaCBtaW50ZWQgbWV0YWRhdGEgYnkgbWludCBhZGRyZXNzXG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleVxuICApOiBQcm9taXNlPFJlc3VsdDxOZnRNZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgLy8gcmV0dXJuIGF3YWl0IFNwbFRva2VuLmdlbmVyaWNGaW5kQnlNaW50PE5mdE1ldGFkYXRhPihcbiAgICByZXR1cm4gYXdhaXQgU3BsVG9rZW4uZ2VuZXJpY0ZpbmRCeU1pbnQoXG4gICAgICBtaW50LFxuICAgICAgVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLk5vbkZ1bmdpYmxlXG4gICAgKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBJbnN0cnVjdGlvbixcbiAgS2V5cGFpckFjY291bnQsXG4gIFB1YmtleSxcbiAgUmVzdWx0LFxuICBTZWNyZXQsXG4gIFRyeSxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgUGRhIH0gZnJvbSAnc2hhcmVkLW1ldGFwbGV4JztcbmltcG9ydCB7IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgY3JlYXRlRnJlZXplRGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZXRhcGxleCB7XG4gIC8qKlxuICAgKiBGcmVlemluZyBhIHRhcmdldCBuZnRcbiAgICogaXQgc2hvdWxkIHNldCB0byBmcmVlemVBdXRob3JpdHkgd2hlbiBtaW50KClcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnQgICAgICAgICAgICAgLy8gbWludCBhZGRyZXNzXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAgICAgIC8vIGN1cnJlbnQgb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZyZWV6ZUF1dGhvcml0eSAgLy8gc2V0dGVkIGZyZWV6ZSBhdXRob3JpdHkgb2YgbmZ0XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAgICAgLy8gZmVlIHBheWVyXG4gICAqL1xuICBleHBvcnQgY29uc3QgZnJlZXplID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpXG4gICAgICApO1xuICAgICAgY29uc3QgZWRpdGlvbkFkZHJlc3MgPSBQZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUZyZWV6ZURlbGVnYXRlZEFjY291bnRJbnN0cnVjdGlvbih7XG4gICAgICAgIGRlbGVnYXRlOiBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFjY291bnQ6IHRva2VuQWNjb3VudCxcbiAgICAgICAgZWRpdGlvbjogZWRpdGlvbkFkZHJlc3MsXG4gICAgICAgIG1pbnQ6IG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKClcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgZGVidWdMb2csXG4gIEtleXBhaXJBY2NvdW50LFxuICBOb2RlLFxuICBQYXJ0aWFsU2lnbkluc3RydWN0aW9uLFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnc3RvcmFnZSc7XG5cbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ2NvbnZlcnRlcic7XG5pbXBvcnQgeyBVc2VyU2lkZUlucHV0IH0gZnJvbSAndHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IFZhbGlkYXRvciB9IGZyb20gJ3ZhbGlkYXRvcic7XG5cbmltcG9ydCB7IE1ldGFwbGV4IGFzIF9NaW50IH0gZnJvbSAnLi9taW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZXRhcGxleCB7XG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgTkZUIG1pbnQgd2l0aCBQYXJ0aWFsIFNpZ25cbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgIC8vIGZpcnN0IG1pbnRlZCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gc2lnbmVyICAgICAgICAgLy8gb3duZXIncyBTZWNyZXRcbiAgICogQHBhcmFtIHtVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhfSBpbnB1dFxuICAgKiB7XG4gICAqICAgbmFtZTogc3RyaW5nICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbDogc3RyaW5nICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZmlsZVBhdGg6IHN0cmluZyB8IEZpbGUgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBkZXNjcmlwdGlvbj86IHN0cmluZyAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIGV4dGVybmFsX3VybD86IHN0cmluZyAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzogTWV0YWRhdGFBdHRyaWJ1dGVbXSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IE1ldGFkYXRhUHJvcGVydGllczxVcmk+IC8vIGluY2x1ZGUgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogUHVia2V5ICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddPzogdW5rbm93biAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogICBjcmVhdG9ycz86IElucHV0Q3JlYXRvcnNbXSAgICAgICAgICAvLyBvdGhlciBjcmVhdG9ycyB0aGFuIG93bmVyXG4gICAqICAgdXNlcz86IFVzZXMgICAgICAgICAgICAgICAgICAgLy8gdXNhZ2UgZmVhdHVyZTogYnVybiwgc2luZ2xlLCBtdWx0aXBsZVxuICAgKiAgIGlzTXV0YWJsZT86IGJvb2xlYW4gICAgICAgICAgIC8vIGVuYWJsZSB1cGRhdGUoKVxuICAgKiB9XG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZyZWV6ZUF1dGhvcml0eT8gIC8vIGZyZWV6ZSBhdXRob3JpdHlcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnbkluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmVlUGF5ZXJQYXJ0aWFsU2lnbk1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXI6IFNlY3JldCxcbiAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5OZnRNZXRhZGF0YSxcbiAgICBmZWVQYXllcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eT86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhPihpbnB1dCk7XG4gICAgICBpZiAodmFsaWQuaXNFcnIpIHtcbiAgICAgICAgdGhyb3cgdmFsaWQuZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gQ29udmVydGVyLlJveWFsdHkuY29udmVydChpbnB1dC5yb3lhbHR5KTtcblxuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG4gICAgICBsZXQgdXJpID0gJyc7XG4gICAgICBpZiAoaW5wdXQuZmlsZVBhdGggJiYgaW5wdXQuc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gYXdhaXQgQ29udmVydGVyLlByb3BlcnRpZXMuaW50b0luZnJhU2lkZShcbiAgICAgICAgICBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgICAgIFN0b3JhZ2UudXBsb2FkQ29udGVudCxcbiAgICAgICAgICBpbnB1dC5zdG9yYWdlVHlwZSxcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBuZnRTdG9yYWdlTWV0YWRhdGEgPSBTdG9yYWdlLnRvQ29udmVydE9mZmNoYWluZGF0YShcbiAgICAgICAgICB7IC4uLmlucHV0LCBwcm9wZXJ0aWVzIH0sXG4gICAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgdXBsb2FkZWQgPSBhd2FpdCBTdG9yYWdlLnVwbG9hZE1ldGFBbmRDb250ZW50KFxuICAgICAgICAgIG5mdFN0b3JhZ2VNZXRhZGF0YSxcbiAgICAgICAgICBpbnB1dC5maWxlUGF0aCxcbiAgICAgICAgICBpbnB1dC5zdG9yYWdlVHlwZSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC51cmkpIHtcbiAgICAgICAgdXJpID0gaW5wdXQudXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYE11c3Qgc2V0ICdzdG9yYWdlVHlwZT1uZnRTdG9yYWdlICsgZmlsZVBhdGgnIG9yICd1cmknYCk7XG4gICAgICB9XG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cblxuICAgICAgbGV0IGRhdGF2MiA9IENvbnZlcnRlci5OZnRNZXRhZGF0YS5pbnRvSW5mcmFTaWRlKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIC8vLS0tIGNvbGxlY3Rpb24gLS0tXG4gICAgICBsZXQgY29sbGVjdGlvbjtcbiAgICAgIGlmIChpbnB1dC5jb2xsZWN0aW9uICYmIGlucHV0LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbiA9IENvbnZlcnRlci5Db2xsZWN0aW9uLmludG9JbmZyYVNpZGUoaW5wdXQuY29sbGVjdGlvbik7XG4gICAgICAgIGRhdGF2MiA9IHsgLi4uZGF0YXYyLCBjb2xsZWN0aW9uIH07XG4gICAgICB9XG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuXG4gICAgICBjb25zdCBpc011dGFibGUgPSBpbnB1dC5pc011dGFibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpbnB1dC5pc011dGFibGU7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGlucHV0OiAnLCBpbnB1dCk7XG4gICAgICBkZWJ1Z0xvZygnIyBzZWxsZXJGZWVCYXNpc1BvaW50czogJywgc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgZGVidWdMb2coJyMgZGF0YXYyOiAnLCBkYXRhdjIpO1xuXG4gICAgICBjb25zdCBtaW50ID0gS2V5cGFpckFjY291bnQuY3JlYXRlKCk7XG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IF9NaW50LmNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBmZWVQYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChmcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHMucHVzaChcbiAgICAgICAgICBfTWludC5jcmVhdGVEZWxlYWdhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBmcmVlemVBdXRob3JpdHkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICBpbnN0cy5mb3JFYWNoKChpbnN0KSA9PiB0eC5hZGQoaW5zdCkpO1xuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIFtzaWduZXIsIG1pbnRdLmZvckVhY2goKHNpZ25lcikgPT4gdHgucGFydGlhbFNpZ24oc2lnbmVyLnRvS2V5cGFpcigpKSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25JbnN0cnVjdGlvbihoZXgsIG1pbnQucHVia2V5KTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBQdWJsaWNLZXksXG4gIFN5c3RlbVByb2dyYW0sXG4gIFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24sXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCBCTiBmcm9tICdibi5qcyc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUFwcHJvdmVJbnN0cnVjdGlvbixcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jLFxuICBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50LFxuICBNSU5UX1NJWkUsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7XG4gIGRlYnVnTG9nLFxuICBLZXlwYWlyQWNjb3VudCxcbiAgTWludEluc3RydWN0aW9uLFxuICBQdWJrZXksXG4gIFJlc3VsdCxcbiAgU2VjcmV0LFxuICBUcnksXG59IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJ3N0b3JhZ2UnO1xuXG5pbXBvcnQge1xuICBDb252ZXJ0LFxuICBQZGEsXG4gIFJveWFsdHksXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFZhbGlkYXRvcixcbn0gZnJvbSAnaW50ZXJuYWxzL3NoYXJlZC1tZXRhcGxleCc7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1hc3RlckVkaXRpb25WM0luc3RydWN0aW9uLFxuICBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uLFxuICBEYXRhVjIsXG59IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuY29uc3QgTkZUX0FNT1VOVCA9IDE7XG5leHBvcnQgbmFtZXNwYWNlIE1ldGFwbGV4IHtcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZURlbGVhZ2F0ZUluc3RydWN0aW9uID0gKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIGRlbGVnYXRlQXV0aG9yaXR5OiBQdWJsaWNLZXksXG4gICk6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIGNvbnN0IHRva2VuQWNjb3VudCA9IGdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jKG1pbnQsIG93bmVyKTtcblxuICAgIHJldHVybiBjcmVhdGVBcHByb3ZlSW5zdHJ1Y3Rpb24oXG4gICAgICB0b2tlbkFjY291bnQsXG4gICAgICBkZWxlZ2F0ZUF1dGhvcml0eSxcbiAgICAgIG93bmVyLFxuICAgICAgTkZUX0FNT1VOVCxcbiAgICApO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjcmVhdGVNaW50SW5zdHJ1Y3Rpb25zID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmxpY0tleSxcbiAgICBvd25lcjogUHVibGljS2V5LFxuICAgIG5mdE1ldGFkYXRhOiBEYXRhVjIsXG4gICAgZmVlUGF5ZXI6IFB1YmxpY0tleSxcbiAgICBpc011dGFibGU6IGJvb2xlYW4sXG4gICk6IFByb21pc2U8VHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdPiA9PiB7XG4gICAgY29uc3QgYXRhID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuICAgIGNvbnN0IHRva2VuTWV0YWRhdGFQdWJrZXkgPSBQZGEuZ2V0TWV0YWRhdGEobWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBtYXN0ZXJFZGl0aW9uUHVia2V5ID0gUGRhLmdldE1hc3RlckVkaXRpb24obWludC50b1N0cmluZygpKTtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG5cbiAgICBjb25zdCBpbnN0MSA9IFN5c3RlbVByb2dyYW0uY3JlYXRlQWNjb3VudCh7XG4gICAgICBmcm9tUHVia2V5OiBmZWVQYXllcixcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG1pbnQsXG4gICAgICBsYW1wb3J0czogYXdhaXQgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludChjb25uZWN0aW9uKSxcbiAgICAgIHNwYWNlOiBNSU5UX1NJWkUsXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG5cbiAgICBjb25zdCBpbnN0MiA9IGNyZWF0ZUluaXRpYWxpemVNaW50SW5zdHJ1Y3Rpb24obWludCwgMCwgb3duZXIsIG93bmVyKTtcblxuICAgIGNvbnN0IGluc3QzID0gY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgZmVlUGF5ZXIsXG4gICAgICBhdGEsXG4gICAgICBvd25lcixcbiAgICAgIG1pbnQsXG4gICAgKTtcblxuICAgIGNvbnN0IGluc3Q0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKG1pbnQsIGF0YSwgb3duZXIsIDEsIDApO1xuXG4gICAgY29uc3QgaW5zdDUgPSBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAge1xuICAgICAgICBtZXRhZGF0YTogdG9rZW5NZXRhZGF0YVB1YmtleSxcbiAgICAgICAgbWludCxcbiAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNyZWF0ZU1ldGFkYXRhQWNjb3VudEFyZ3NWMzoge1xuICAgICAgICAgIGRhdGE6IG5mdE1ldGFkYXRhLFxuICAgICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogeyBfX2tpbmQ6ICdWMScsIHNpemU6IG5ldyBCTigxKSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgY29uc3QgaW5zdDYgPSBjcmVhdGVDcmVhdGVNYXN0ZXJFZGl0aW9uVjNJbnN0cnVjdGlvbihcbiAgICAgIHtcbiAgICAgICAgZWRpdGlvbjogbWFzdGVyRWRpdGlvblB1YmtleSxcbiAgICAgICAgbWludCxcbiAgICAgICAgdXBkYXRlQXV0aG9yaXR5OiBvd25lcixcbiAgICAgICAgbWludEF1dGhvcml0eTogb3duZXIsXG4gICAgICAgIHBheWVyOiBmZWVQYXllcixcbiAgICAgICAgbWV0YWRhdGE6IHRva2VuTWV0YWRhdGFQdWJrZXksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjcmVhdGVNYXN0ZXJFZGl0aW9uQXJnczoge1xuICAgICAgICAgIG1heFN1cHBseTogMCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICByZXR1cm4gW2luc3QxLCBpbnN0MiwgaW5zdDMsIGluc3Q0LCBpbnN0NSwgaW5zdDZdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgY29udGVudCBhbmQgTkZUIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgIC8vIGZpcnN0IG1pbnRlZCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gc2lnbmVyICAgICAgICAgLy8gb3duZXIncyBTZWNyZXRcbiAgICogQHBhcmFtIHtVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhfSBpbnB1dFxuICAgKiB7XG4gICAqICAgbmFtZTogc3RyaW5nICAgICAgICAgICAgICAgLy8gbmZ0IGNvbnRlbnQgbmFtZVxuICAgKiAgIHN5bWJvbDogc3RyaW5nICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZmlsZVBhdGg6IHN0cmluZyB8IEZpbGUgICAgLy8gbmZ0IHRpY2tlciBzeW1ib2xcbiAgICogICByb3lhbHR5OiBudW1iZXIgICAgICAgICAgICAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBzdG9yYWdlVHlwZTogJ2Fyd2VhdmUnfCduZnRTdG9yYWdlJyAvLyByb3lhbHR5IHBlcmNlbnRhZ2VcbiAgICogICBkZXNjcmlwdGlvbj86IHN0cmluZyAgICAgICAvLyBuZnQgY29udGVudCBkZXNjcmlwdGlvblxuICAgKiAgIGV4dGVybmFsX3VybD86IHN0cmluZyAgICAgIC8vIGxhbmRpbmcgcGFnZSwgaG9tZSBwYWdlIHVyaSwgcmVsYXRlZCB1cmxcbiAgICogICBhdHRyaWJ1dGVzPzogTWV0YWRhdGFBdHRyaWJ1dGVbXSAgICAgLy8gZ2FtZSBjaGFyYWN0ZXIgcGFyYW1ldGVyLCBwZXJzb25hbGl0eSwgY2hhcmFjdGVyaXN0aWNzXG4gICAqICAgcHJvcGVydGllcz86IE1ldGFkYXRhUHJvcGVydGllczxVcmk+IC8vIGluY2x1ZGUgZmlsZSBuYW1lLCB1cmksIHN1cHBvcnRlZCBmaWxlIHR5cGVcbiAgICogICBjb2xsZWN0aW9uPzogUHVia2V5ICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBjcmVhdG9ycz86IElucHV0Q3JlYXRvcnNbXSAgICAvLyBvdGhlciBjcmVhdG9ycyB0aGFuIG93bmVyXG4gICAqICAgdXNlcz86IFVzZXMgICAgICAgICAgICAgICAgICAgLy8gdXNhZ2UgZmVhdHVyZTogYnVybiwgc2luZ2xlLCBtdWx0aXBsZVxuICAgKiAgIGlzTXV0YWJsZT86IGJvb2xlYW4gICAgICAgICAgIC8vIGVuYWJsZSB1cGRhdGUoKVxuICAgKiAgIG9wdGlvbnM/OiBba2V5OiBzdHJpbmddPzogdW5rbm93biAgICAgICAvLyBvcHRpb25hbCBwYXJhbSwgVXN1YWxseSBub3QgdXNlZC5cbiAgICogfVxuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXI/ICAgICAgICAgLy8gZmVlIHBheWVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBmcmVlemVBdXRob3JpdHk/ICAvLyBmcmVlemUgYXV0aG9yaXR5XG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgbWludCA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIHNpZ25lcjogU2VjcmV0LFxuICAgIGlucHV0OiBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgIGZyZWV6ZUF1dGhvcml0eT86IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8TWludEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkID0gVmFsaWRhdG9yLmNoZWNrQWxsPFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyO1xuXG4gICAgICAvLy0tLSBwb3JwZXJ0aWVzLCBVcGxvYWQgY29udGVudCAtLS1cbiAgICAgIGxldCBwcm9wZXJ0aWVzO1xuICAgICAgaWYgKGlucHV0LnByb3BlcnRpZXMgJiYgaW5wdXQuc3RvcmFnZVR5cGUpIHtcbiAgICAgICAgcHJvcGVydGllcyA9IGF3YWl0IENvbnZlcnQuUHJvcGVydGllcy5pbnRvSW5mcmFTaWRlKFxuICAgICAgICAgIGlucHV0LnByb3BlcnRpZXMsXG4gICAgICAgICAgU3RvcmFnZS51cGxvYWRDb250ZW50LFxuICAgICAgICAgIGlucHV0LnN0b3JhZ2VUeXBlLFxuICAgICAgICAgIHBheWVyLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dC5wcm9wZXJ0aWVzICYmICFpbnB1dC5zdG9yYWdlVHlwZSkge1xuICAgICAgICB0aHJvdyBFcnJvcignTXVzdCBzZXQgc3RvcmFnZVR5cGUgaWYgd2lsbCB1c2UgcHJvcGVydGllcycpO1xuICAgICAgfVxuXG4gICAgICBpbnB1dCA9IHtcbiAgICAgICAgLi4uaW5wdXQsXG4gICAgICAgIHByb3BlcnRpZXMsXG4gICAgICB9O1xuICAgICAgLy8tLS0gcG9ycGVydGllcywgVXBsb2FkIGNvbnRlbnQgLS0tXG5cbiAgICAgIGNvbnN0IHNlbGxlckZlZUJhc2lzUG9pbnRzID0gUm95YWx0eS5jb252ZXJ0KGlucHV0LnJveWFsdHkpO1xuICAgICAgY29uc3QgbmZ0U3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0LFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICk7XG5cbiAgICAgIC8vIGNyZWF0ZWQgYXQgYnkgdW5peCB0aW1lc3RhbXBcbiAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICAgIG5mdFN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gY3JlYXRlZEF0O1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWRNZXRhQW5kQ29udGVudChcbiAgICAgICAgICBuZnRTdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG4gICAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBjb250ZW50IHVybDogJywgdXBsb2FkZWQpO1xuICAgICAgICBpZiAodXBsb2FkZWQuaXNFcnIpIHtcbiAgICAgICAgICB0aHJvdyB1cGxvYWRlZDtcbiAgICAgICAgfVxuICAgICAgICB1cmkgPSB1cGxvYWRlZC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXQudXJpKSB7XG4gICAgICAgIHVyaSA9IGlucHV0LnVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKGBNdXN0IHNldCAnc3RvcmFnZVR5cGUgKyBmaWxlUGF0aCcgb3IgJ3VyaSdgKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGRhdGF2MiA9IENvbnZlcnQuTmZ0TWV0YWRhdGEuaW50b0luZnJhU2lkZShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICAvLy0tLSBjb2xsZWN0aW9uIC0tLVxuICAgICAgbGV0IGNvbGxlY3Rpb247XG4gICAgICBpZiAoaW5wdXQuY29sbGVjdGlvbiAmJiBpbnB1dC5jb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24gPSBDb252ZXJ0LkNvbGxlY3Rpb24uaW50b0luZnJhU2lkZShpbnB1dC5jb2xsZWN0aW9uKTtcbiAgICAgICAgZGF0YXYyID0geyAuLi5kYXRhdjIsIGNvbGxlY3Rpb24gfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gaW5wdXQuaXNNdXRhYmxlID09PSB1bmRlZmluZWQgPyB0cnVlIDogaW5wdXQuaXNNdXRhYmxlO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBpbnB1dDogJywgaW5wdXQpO1xuICAgICAgZGVidWdMb2coJyMgc2VsbGVyRmVlQmFzaXNQb2ludHM6ICcsIHNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgIGRlYnVnTG9nKCcjIGRhdGF2MjogJywgZGF0YXYyKTtcblxuICAgICAgY29uc3QgbWludCA9IEtleXBhaXJBY2NvdW50LmNyZWF0ZSgpO1xuXG4gICAgICBjb25zdCBpbnN0cyA9IGF3YWl0IGNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgZGF0YXYyLFxuICAgICAgICBwYXllci50b0tleXBhaXIoKS5wdWJsaWNLZXksXG4gICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICk7XG5cbiAgICAgIC8vIGZyZWV6ZUF1dGhvcml0eVxuICAgICAgaWYgKGZyZWV6ZUF1dGhvcml0eSkge1xuICAgICAgICBpbnN0cy5wdXNoKFxuICAgICAgICAgIGNyZWF0ZURlbGVhZ2F0ZUluc3RydWN0aW9uKFxuICAgICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICAgIGZyZWV6ZUF1dGhvcml0eS50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgTWludEluc3RydWN0aW9uKFxuICAgICAgICBpbnN0cyxcbiAgICAgICAgW3NpZ25lci50b0tleXBhaXIoKSwgbWludC50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBtaW50LnB1YmtleSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUGFydGlhbFNpZ25JbnN0cnVjdGlvbixcbiAgUHVia2V5LFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbn0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICdAc29sYW5hLXN1aXRlL2NvcmUnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE1ldGFwbGV4IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgZXhwb3J0IGNvbnN0IGZlZVBheWVyUGFydGlhbFNpZ25UcmFuc2Zlck5mdCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgZmVlUGF5ZXI6IFB1YmtleVxuICApOiBQcm9taXNlPFJlc3VsdDxQYXJ0aWFsU2lnbkluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gU3BsVG9rZW4uZmVlUGF5ZXJQYXJ0aWFsU2lnblRyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIHNpZ25lcnMsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICAgTkZUX0RFQ0lNQUxTLFxuICAgICAgZmVlUGF5ZXJcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIEluc3RydWN0aW9uLFxuICBLZXlwYWlyQWNjb3VudCxcbiAgUHVia2V5LFxuICBSZXN1bHQsXG4gIFNlY3JldCxcbiAgVHJ5LFxufSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBQZGEgfSBmcm9tICdzaGFyZWQtbWV0YXBsZXgnO1xuaW1wb3J0IHsgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBjcmVhdGVUaGF3RGVsZWdhdGVkQWNjb3VudEluc3RydWN0aW9uIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBNZXRhcGxleCB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICovXG4gIGV4cG9ydCBjb25zdCB0aGF3ID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0XG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpXG4gICAgICApO1xuICAgICAgY29uc3QgZWRpdGlvbkFkZHJlc3MgPSBQZGEuZ2V0TWFzdGVyRWRpdGlvbihtaW50KTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRoYXdEZWxlZ2F0ZWRBY2NvdW50SW5zdHJ1Y3Rpb24oe1xuICAgICAgICBkZWxlZ2F0ZTogbmV3IEtleXBhaXJBY2NvdW50KHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgdG9rZW5BY2NvdW50OiB0b2tlbkFjY291bnQsXG4gICAgICAgIGVkaXRpb246IGVkaXRpb25BZGRyZXNzLFxuICAgICAgICBtaW50OiBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEluc3RydWN0aW9uLCBQdWJrZXksIFJlc3VsdCwgU2VjcmV0IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gfSBmcm9tICdAc29sYW5hLXN1aXRlL2NvcmUnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE1ldGFwbGV4IHtcbiAgY29uc3QgTkZUX0FNT1VOVCA9IDE7XG4gIGNvbnN0IE5GVF9ERUNJTUFMUyA9IDA7XG5cbiAgZXhwb3J0IGNvbnN0IHRyYW5zZmVyID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGRlc3Q6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICBmZWVQYXllcj86IFNlY3JldFxuICApOiBQcm9taXNlPFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFNwbFRva2VuLnRyYW5zZmVyKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgZGVzdCxcbiAgICAgIHNpZ25lcnMsXG4gICAgICBORlRfQU1PVU5ULFxuICAgICAgTkZUX0RFQ0lNQUxTLFxuICAgICAgZmVlUGF5ZXJcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IE1ldGFwbGV4IGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgTWV0YXBsZXggYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBNZXRhcGxleCBhcyBGcmVlemUgfSBmcm9tICcuL2ZyZWV6ZSc7XG5pbXBvcnQgeyBNZXRhcGxleCBhcyBGZWVQYXllciB9IGZyb20gJy4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi1taW50JztcbmltcG9ydCB7IE1ldGFwbGV4IGFzIEZlZVBheWVyVHJhbnNmZXIgfSBmcm9tICcuL2ZlZS1wYXllci1wYXJ0aWFsLXNpZ24tdHJhbnNmZXInO1xuaW1wb3J0IHsgTWV0YXBsZXggYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBNZXRhcGxleCBhcyBUaGF3IH0gZnJvbSAnLi90aGF3JztcbmltcG9ydCB7IE1ldGFwbGV4IGFzIFRyYW5zZmVyIH0gZnJvbSAnLi90cmFuc2Zlcic7XG5cbmV4cG9ydCBjb25zdCBNZXRhcGxleCA9IHtcbiAgLi4uQnVybixcbiAgLi4uRmluZCxcbiAgLi4uRnJlZXplLFxuICAuLi5GZWVQYXllcixcbiAgLi4uRmVlUGF5ZXJUcmFuc2ZlcixcbiAgLi4uTWludCxcbiAgLi4uVGhhdyxcbiAgLi4uVHJhbnNmZXIsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLGtCQUFBQTtBQUFBO0FBQUE7OztBQ0NBLGtCQUF5QjtBQUVsQixJQUFVO0FBQUEsQ0FBVixDQUFVQyxlQUFWO0FBQ0wsUUFBTUMsY0FBYTtBQUNuQixRQUFNLGVBQWU7QUFFZCxFQUFNRCxXQUFBLE9BQU8sQ0FDbEIsTUFDQSxPQUNBLFFBQ0EsYUFDK0I7QUFDL0IsV0FBTyxxQkFBUztBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQSxDQUFDLE1BQU07QUFBQSxNQUNQQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxHQWxCZTs7O0FDRmpCLDZCQUE4QjtBQUM5QixJQUFBQyxlQUFzRDtBQUcvQyxJQUFVQztBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQVVFLEVBQU1BLFdBQUEsY0FBYyxPQUN6QixPQUNBLE1BQ0EsT0FDQSxZQUNrQjtBQUNsQixVQUFNLFdBQVcsQ0FBQyxTQUFTLFdBQVcsc0JBQVMsT0FBTyxTQUFTO0FBQy9ELFVBQU0sV0FBVyxDQUFDLFNBQVMsV0FBVyxPQUFPO0FBQzdDLFVBQU0sc0JBQVM7QUFBQSxNQUNiO0FBQUEsTUFDQSxDQUFDLFdBQThCLE9BQU8sTUFBTSxNQUFNLEtBQUs7QUFBQSxNQUN2RCxxQ0FBYyxjQUFjO0FBQUEsTUFDNUI7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFRTyxFQUFNQSxXQUFBLGFBQWEsT0FDeEIsU0FDd0M7QUFFeEMsV0FBTyxNQUFNLHNCQUFTO0FBQUEsTUFDcEI7QUFBQSxNQUNBLHFDQUFjLGNBQWM7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFBQSxHQXpDZUEsMEJBQUE7OztBQ0xqQixvQkFPTztBQUNQLElBQUFDLDBCQUFvQjtBQUNwQix1QkFBOEM7QUFDOUMsZ0NBQXdEO0FBRWpELElBQVVDO0FBQUEsQ0FBVixDQUFVQSxlQUFWO0FBU0UsRUFBTUEsV0FBQSxTQUFTLENBQ3BCLE1BQ0EsT0FDQSxpQkFDQSxhQUMrQjtBQUMvQixVQUFNLFFBQVEsV0FBVyxXQUFXO0FBQ3BDLGVBQU8sbUJBQUksTUFBTTtBQUNmLFlBQU0sbUJBQWU7QUFBQSxRQUNuQixLQUFLLFlBQVk7QUFBQSxRQUNqQixNQUFNLFlBQVk7QUFBQSxNQUNwQjtBQUNBLFlBQU0saUJBQWlCLDRCQUFJLGlCQUFpQixJQUFJO0FBRWhELFlBQU0sV0FBTyxtRUFBd0M7QUFBQSxRQUNuRCxVQUFVLElBQUksNkJBQWUsRUFBRSxRQUFRLGdCQUFnQixDQUFDLEVBQUUsWUFBWTtBQUFBLFFBQ3RFO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxNQUFNLEtBQUssWUFBWTtBQUFBLE1BQ3pCLENBQUM7QUFDRCxhQUFPLElBQUk7QUFBQSxRQUNULENBQUMsSUFBSTtBQUFBLFFBQ0wsQ0FBQyxnQkFBZ0IsVUFBVSxDQUFDO0FBQUEsUUFDNUIsTUFBTSxVQUFVO0FBQUEsTUFDbEI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsR0FuQ2VBLDBCQUFBOzs7QUNaakIsSUFBQUMsaUJBU087QUFFUCxJQUFBQyxlQUE0QjtBQUU1QixJQUFBQyxrQkFBd0I7QUFFeEIsdUJBQTBCO0FBRTFCLHVCQUEwQjs7O0FDakIxQixrQkFJTztBQUVQLGdCQUFlO0FBRWYsSUFBQUMsb0JBU087QUFDUCxJQUFBQyxpQkFRTztBQUVQLHFCQUF3QjtBQUV4QixJQUFBQywwQkFNTztBQUVQLElBQUFDLDZCQUlPO0FBQ1AsSUFBQUYsaUJBQXFCO0FBQ3JCLElBQU0sYUFBYTtBQUNaLElBQVVHO0FBQUEsQ0FBVixDQUFVQSxlQUFWO0FBQ0UsRUFBTUEsV0FBQSw2QkFBNkIsQ0FDeENDLE9BQ0EsT0FDQSxzQkFDMkI7QUFDM0IsVUFBTSxtQkFBZSxpREFBOEJBLE9BQU0sS0FBSztBQUU5RCxlQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRU8sRUFBTUQsV0FBQSx5QkFBeUIsT0FDcENDLE9BQ0EsT0FDQSxhQUNBLFVBQ0EsY0FDc0M7QUFDdEMsVUFBTSxVQUFNLGlEQUE4QkEsT0FBTSxLQUFLO0FBQ3JELFVBQU0sc0JBQXNCLDRCQUFJLFlBQVlBLE1BQUssU0FBUyxDQUFDO0FBQzNELFVBQU0sc0JBQXNCLDRCQUFJLGlCQUFpQkEsTUFBSyxTQUFTLENBQUM7QUFDaEUsVUFBTSxhQUFhLG9CQUFLLGNBQWM7QUFFdEMsVUFBTSxRQUFRLDBCQUFjLGNBQWM7QUFBQSxNQUN4QyxZQUFZO0FBQUEsTUFDWixrQkFBa0JBO0FBQUEsTUFDbEIsVUFBVSxVQUFNLHNEQUFtQyxVQUFVO0FBQUEsTUFDN0QsT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUVELFVBQU0sWUFBUSxtREFBZ0NBLE9BQU0sR0FBRyxPQUFPLEtBQUs7QUFFbkUsVUFBTSxZQUFRO0FBQUEsTUFDWjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQUE7QUFBQSxJQUNGO0FBRUEsVUFBTSxZQUFRLGtEQUErQkEsT0FBTSxLQUFLLE9BQU8sR0FBRyxDQUFDO0FBRW5FLFVBQU0sWUFBUTtBQUFBLE1BQ1o7QUFBQSxRQUNFLFVBQVU7QUFBQSxRQUNWLE1BQUFBO0FBQUEsUUFDQSxlQUFlO0FBQUEsUUFDZixPQUFPO0FBQUEsUUFDUCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxRQUNFLDZCQUE2QjtBQUFBLFVBQzNCLE1BQU07QUFBQSxVQUNOO0FBQUEsVUFDQSxtQkFBbUIsRUFBRSxRQUFRLE1BQU0sTUFBTSxJQUFJLFVBQUFDLFFBQUcsQ0FBQyxFQUFFO0FBQUEsUUFDckQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFVBQU0sWUFBUTtBQUFBLE1BQ1o7QUFBQSxRQUNFLFNBQVM7QUFBQSxRQUNULE1BQUFEO0FBQUEsUUFDQSxpQkFBaUI7QUFBQSxRQUNqQixlQUFlO0FBQUEsUUFDZixPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsTUFDWjtBQUFBLE1BQ0E7QUFBQSxRQUNFLHlCQUF5QjtBQUFBLFVBQ3ZCLFdBQVc7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPLENBQUMsT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPLEtBQUs7QUFBQSxFQUNsRDtBQTRCTyxFQUFNRCxXQUFBLE9BQU8sT0FDbEIsT0FDQSxRQUNBLE9BQ0EsVUFDQSxvQkFDNEM7QUFDNUMsZUFBTyxvQkFBSSxZQUFZO0FBQ3JCLFlBQU0sUUFBUSxrQ0FBVSxTQUFvQyxLQUFLO0FBQ2pFLFVBQUksTUFBTSxPQUFPO0FBQ2YsY0FBTSxNQUFNO0FBQUEsTUFDZDtBQUVBLFlBQU0sUUFBUSxXQUFXLFdBQVc7QUFHcEMsVUFBSTtBQUNKLFVBQUksTUFBTSxjQUFjLE1BQU0sYUFBYTtBQUN6QyxxQkFBYSxNQUFNLGdDQUFRLFdBQVc7QUFBQSxVQUNwQyxNQUFNO0FBQUEsVUFDTix1QkFBUTtBQUFBLFVBQ1IsTUFBTTtBQUFBLFVBQ047QUFBQSxRQUNGO0FBQUEsTUFDRixXQUFXLE1BQU0sY0FBYyxDQUFDLE1BQU0sYUFBYTtBQUNqRCxjQUFNLE1BQU0sNkNBQTZDO0FBQUEsTUFDM0Q7QUFFQSxjQUFRO0FBQUEsUUFDTixHQUFHO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFHQSxZQUFNLHVCQUF1QixnQ0FBUSxRQUFRLE1BQU0sT0FBTztBQUMxRCxZQUFNLHFCQUFxQix1QkFBUTtBQUFBLFFBQ2pDO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFHQSxZQUFNLFlBQVksS0FBSyxPQUFNLG9CQUFJLEtBQUssR0FBRSxRQUFRLElBQUksR0FBSTtBQUN4RCx5QkFBbUIsYUFBYTtBQUVoQyxVQUFJO0FBQ0osVUFBSSxNQUFNLFlBQVksTUFBTSxhQUFhO0FBQ3ZDLGNBQU0sV0FBVyxNQUFNLHVCQUFRO0FBQUEsVUFDN0I7QUFBQSxVQUNBLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOO0FBQUEsUUFDRjtBQUNBLHFDQUFTLDBCQUEwQixRQUFRO0FBQzNDLFlBQUksU0FBUyxPQUFPO0FBQ2xCLGdCQUFNO0FBQUEsUUFDUjtBQUNBLGNBQU0sU0FBUztBQUFBLE1BQ2pCLFdBQVcsTUFBTSxLQUFLO0FBQ3BCLGNBQU0sTUFBTTtBQUFBLE1BQ2QsT0FBTztBQUNMLGNBQU0sTUFBTSw0Q0FBNEM7QUFBQSxNQUMxRDtBQUVBLFVBQUksU0FBUyxnQ0FBUSxZQUFZO0FBQUEsUUFDL0I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFHQSxVQUFJO0FBQ0osVUFBSSxNQUFNLGNBQWMsTUFBTSxZQUFZO0FBQ3hDLHFCQUFhLGdDQUFRLFdBQVcsY0FBYyxNQUFNLFVBQVU7QUFDOUQsaUJBQVMsRUFBRSxHQUFHLFFBQVEsV0FBVztBQUFBLE1BQ25DO0FBRUEsWUFBTSxZQUFZLE1BQU0sY0FBYyxTQUFZLE9BQU8sTUFBTTtBQUUvRCxtQ0FBUyxhQUFhLEtBQUs7QUFDM0IsbUNBQVMsNEJBQTRCLG9CQUFvQjtBQUN6RCxtQ0FBUyxjQUFjLE1BQU07QUFFN0IsWUFBTUMsUUFBTyw4QkFBZSxPQUFPO0FBRW5DLFlBQU0sUUFBUSxVQUFNRCxXQUFBO0FBQUEsUUFDbEJDLE1BQUssWUFBWTtBQUFBLFFBQ2pCLE1BQU0sWUFBWTtBQUFBLFFBQ2xCO0FBQUEsUUFDQSxNQUFNLFVBQVUsRUFBRTtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUdBLFVBQUksaUJBQWlCO0FBQ25CLGNBQU07QUFBQSxjQUNKRCxXQUFBO0FBQUEsWUFDRUMsTUFBSyxZQUFZO0FBQUEsWUFDakIsTUFBTSxZQUFZO0FBQUEsWUFDbEIsZ0JBQWdCLFlBQVk7QUFBQSxVQUM5QjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsYUFBTyxJQUFJO0FBQUEsUUFDVDtBQUFBLFFBQ0EsQ0FBQyxPQUFPLFVBQVUsR0FBR0EsTUFBSyxVQUFVLENBQUM7QUFBQSxRQUNyQyxNQUFNLFVBQVU7QUFBQSxRQUNoQkEsTUFBSztBQUFBLE1BQ1A7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsR0ExTmVELDBCQUFBOzs7QUR4QlYsSUFBVUc7QUFBQSxDQUFWLENBQVVBLGVBQVY7QUEyQkUsRUFBTUEsV0FBQSwwQkFBMEIsT0FDckMsT0FDQSxRQUNBLE9BQ0EsVUFDQSxvQkFDbUQ7QUFDbkQsZUFBTyxvQkFBSSxZQUFZO0FBQ3JCLFlBQU0sUUFBUSwyQkFBVSxTQUFvQyxLQUFLO0FBQ2pFLFVBQUksTUFBTSxPQUFPO0FBQ2YsY0FBTSxNQUFNO0FBQUEsTUFDZDtBQUVBLFlBQU0sdUJBQXVCLDJCQUFVLFFBQVEsUUFBUSxNQUFNLE9BQU87QUFHcEUsVUFBSSxNQUFNO0FBQ1YsVUFBSSxNQUFNLFlBQVksTUFBTSxnQkFBZ0IsY0FBYztBQUN4RCxjQUFNLGFBQWEsTUFBTSwyQkFBVSxXQUFXO0FBQUEsVUFDNUMsTUFBTTtBQUFBLFVBQ04sd0JBQVE7QUFBQSxVQUNSLE1BQU07QUFBQSxRQUNSO0FBRUEsY0FBTSxxQkFBcUIsd0JBQVE7QUFBQSxVQUNqQyxFQUFFLEdBQUcsT0FBTyxXQUFXO0FBQUEsVUFDdkI7QUFBQSxRQUNGO0FBRUEsY0FBTSxXQUFXLE1BQU0sd0JBQVE7QUFBQSxVQUM3QjtBQUFBLFVBQ0EsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFFBQ1I7QUFDQSxZQUFJLFNBQVMsT0FBTztBQUNsQixnQkFBTTtBQUFBLFFBQ1I7QUFDQSxjQUFNLFNBQVM7QUFDZixxQ0FBUywwQkFBMEIsUUFBUTtBQUFBLE1BQzdDLFdBQVcsTUFBTSxLQUFLO0FBQ3BCLGNBQU0sTUFBTTtBQUFBLE1BQ2QsT0FBTztBQUNMLGNBQU0sTUFBTSx1REFBdUQ7QUFBQSxNQUNyRTtBQUdBLFVBQUksU0FBUywyQkFBVSxZQUFZO0FBQUEsUUFDakM7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFHQSxVQUFJO0FBQ0osVUFBSSxNQUFNLGNBQWMsTUFBTSxZQUFZO0FBQ3hDLHFCQUFhLDJCQUFVLFdBQVcsY0FBYyxNQUFNLFVBQVU7QUFDaEUsaUJBQVMsRUFBRSxHQUFHLFFBQVEsV0FBVztBQUFBLE1BQ25DO0FBR0EsWUFBTSxZQUFZLE1BQU0sY0FBYyxTQUFZLE9BQU8sTUFBTTtBQUUvRCxtQ0FBUyxhQUFhLEtBQUs7QUFDM0IsbUNBQVMsNEJBQTRCLG9CQUFvQjtBQUN6RCxtQ0FBUyxjQUFjLE1BQU07QUFFN0IsWUFBTSxPQUFPLDhCQUFlLE9BQU87QUFDbkMsWUFBTSxRQUFRLE1BQU1BLFVBQU07QUFBQSxRQUN4QixLQUFLLFlBQVk7QUFBQSxRQUNqQixNQUFNLFlBQVk7QUFBQSxRQUNsQjtBQUFBLFFBQ0EsU0FBUyxZQUFZO0FBQUEsUUFDckI7QUFBQSxNQUNGO0FBR0EsVUFBSSxpQkFBaUI7QUFDbkIsY0FBTTtBQUFBLFVBQ0pBLFVBQU07QUFBQSxZQUNKLEtBQUssWUFBWTtBQUFBLFlBQ2pCLE1BQU0sWUFBWTtBQUFBLFlBQ2xCLGdCQUFnQixZQUFZO0FBQUEsVUFDOUI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFlBQU0sZUFBZSxNQUFNLG9CQUFLLGNBQWMsRUFBRSxtQkFBbUI7QUFDbkUsWUFBTSxLQUFLLElBQUkseUJBQVk7QUFBQSxRQUN6QixzQkFBc0IsYUFBYTtBQUFBLFFBQ25DLFdBQVcsYUFBYTtBQUFBLFFBQ3hCLFVBQVUsU0FBUyxZQUFZO0FBQUEsTUFDakMsQ0FBQztBQUVELFlBQU0sUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQztBQUNwQyxTQUFHLGtCQUFrQixhQUFhO0FBQ2xDLE9BQUMsUUFBUSxJQUFJLEVBQUUsUUFBUSxDQUFDQyxZQUFXLEdBQUcsWUFBWUEsUUFBTyxVQUFVLENBQUMsQ0FBQztBQUVyRSxZQUFNLGVBQWUsR0FBRyxVQUFVO0FBQUEsUUFDaEMsc0JBQXNCO0FBQUEsTUFDeEIsQ0FBQztBQUNELFlBQU0sTUFBTSxhQUFhLFNBQVMsS0FBSztBQUN2QyxhQUFPLElBQUksc0NBQXVCLEtBQUssS0FBSyxNQUFNO0FBQUEsSUFDcEQsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQWxJZUQsMEJBQUE7OztBRWZqQixJQUFBRSxlQUF5QjtBQUVsQixJQUFVQztBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQUNMLFFBQU1DLGNBQWE7QUFDbkIsUUFBTSxlQUFlO0FBRWQsRUFBTUQsV0FBQSxpQ0FBaUMsT0FDNUMsTUFDQSxPQUNBLE1BQ0EsU0FDQSxhQUNtRDtBQUNuRCxXQUFPLHNCQUFTO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0FDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEdBcEJlRCwwQkFBQTs7O0FDUmpCLElBQUFFLGlCQU9PO0FBQ1AsSUFBQUMsMEJBQW9CO0FBQ3BCLElBQUFDLG9CQUE4QztBQUM5QyxJQUFBQyw2QkFBc0Q7QUFFL0MsSUFBVUM7QUFBQSxDQUFWLENBQVVBLGVBQVY7QUFVRSxFQUFNQSxXQUFBLE9BQU8sQ0FDbEIsTUFDQSxPQUNBLGlCQUNBLGFBQytCO0FBQy9CLFVBQU0sUUFBUSxXQUFXLFdBQVc7QUFDcEMsZUFBTyxvQkFBSSxNQUFNO0FBQ2YsWUFBTSxtQkFBZTtBQUFBLFFBQ25CLEtBQUssWUFBWTtBQUFBLFFBQ2pCLE1BQU0sWUFBWTtBQUFBLE1BQ3BCO0FBQ0EsWUFBTSxpQkFBaUIsNEJBQUksaUJBQWlCLElBQUk7QUFFaEQsWUFBTSxXQUFPLGtFQUFzQztBQUFBLFFBQ2pELFVBQVUsSUFBSSw4QkFBZSxFQUFFLFFBQVEsZ0JBQWdCLENBQUMsRUFBRSxZQUFZO0FBQUEsUUFDdEU7QUFBQSxRQUNBLFNBQVM7QUFBQSxRQUNULE1BQU0sS0FBSyxZQUFZO0FBQUEsTUFDekIsQ0FBQztBQUNELGFBQU8sSUFBSTtBQUFBLFFBQ1QsQ0FBQyxJQUFJO0FBQUEsUUFDTCxDQUFDLGdCQUFnQixVQUFVLENBQUM7QUFBQSxRQUM1QixNQUFNLFVBQVU7QUFBQSxNQUNsQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQXBDZUEsMEJBQUE7OztBQ1hqQixJQUFBQyxlQUF5QjtBQUVsQixJQUFVQztBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQUNMLFFBQU1DLGNBQWE7QUFDbkIsUUFBTSxlQUFlO0FBRWQsRUFBTUQsV0FBQSxXQUFXLE9BQ3RCLE1BQ0EsT0FDQSxNQUNBLFNBQ0EsYUFDd0M7QUFDeEMsV0FBTyxzQkFBUztBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxHQXBCZUQsMEJBQUE7OztBQ01WLElBQU1FLFlBQVc7QUFBQSxFQUN0QixHQUFHO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUNMOyIsCiAgIm5hbWVzIjogWyJNZXRhcGxleCIsICJNZXRhcGxleCIsICJORlRfQU1PVU5UIiwgImltcG9ydF9jb3JlIiwgIk1ldGFwbGV4IiwgImltcG9ydF9zaGFyZWRfbWV0YXBsZXgiLCAiTWV0YXBsZXgiLCAiaW1wb3J0X3NoYXJlZCIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfc3RvcmFnZSIsICJpbXBvcnRfc3BsX3Rva2VuIiwgImltcG9ydF9zaGFyZWQiLCAiaW1wb3J0X3NoYXJlZF9tZXRhcGxleCIsICJpbXBvcnRfbXBsX3Rva2VuX21ldGFkYXRhIiwgIk1ldGFwbGV4IiwgIm1pbnQiLCAiQk4iLCAiTWV0YXBsZXgiLCAic2lnbmVyIiwgImltcG9ydF9jb3JlIiwgIk1ldGFwbGV4IiwgIk5GVF9BTU9VTlQiLCAiaW1wb3J0X3NoYXJlZCIsICJpbXBvcnRfc2hhcmVkX21ldGFwbGV4IiwgImltcG9ydF9zcGxfdG9rZW4iLCAiaW1wb3J0X21wbF90b2tlbl9tZXRhZGF0YSIsICJNZXRhcGxleCIsICJpbXBvcnRfY29yZSIsICJNZXRhcGxleCIsICJORlRfQU1PVU5UIiwgIk1ldGFwbGV4Il0KfQo=