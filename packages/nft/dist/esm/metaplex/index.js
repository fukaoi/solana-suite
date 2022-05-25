var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createInitializeMintInstruction, MintLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SystemProgram, Keypair, } from '@solana/web3.js';
import { Node, Instruction, Result, } from '@solana-suite/shared';
import { SplToken, } from '@solana-suite/core';
import { MetaplexMetaData } from './metadata';
export * from './instructure';
export * from './metadata';
export * from './serialize';
export * from './account';
export var MetaplexInstruction;
(function (MetaplexInstruction) {
    MetaplexInstruction.mintAccount = (instructions, owner, // need sufficient sol account
    signers) => __awaiter(this, void 0, void 0, function* () {
        const mintRentExempt = yield Node.getConnection().getMinimumBalanceForRentExemption(MintLayout.span);
        const newAccount = Keypair.generate();
        instructions.push(SystemProgram.createAccount({
            fromPubkey: owner,
            newAccountPubkey: newAccount.publicKey,
            lamports: mintRentExempt,
            space: MintLayout.span,
            programId: TOKEN_PROGRAM_ID,
        }));
        signers.push(newAccount);
        return {
            mintAccount: newAccount.publicKey,
            signers
        };
    });
    MetaplexInstruction.mint = (instructions, createdAccount, owner, freezeAuthority) => __awaiter(this, void 0, void 0, function* () {
        const decimals = 0;
        instructions.push(createInitializeMintInstruction(createdAccount, decimals, owner, freezeAuthority, TOKEN_PROGRAM_ID));
        return createdAccount.toBase58();
    });
})(MetaplexInstruction || (MetaplexInstruction = {}));
export var Metaplex;
(function (Metaplex) {
    Metaplex.initFormat = () => {
        return {
            name: '',
            uri: '',
            symbol: '',
            update_authority: '',
            creators: [],
            seller_fee_basis_points: 0,
            primary_sale_happened: false
        };
    };
    Metaplex.initializeMint = (payer, signers) => __awaiter(this, void 0, void 0, function* () {
        const instructions = [];
        const inst1 = yield MetaplexInstruction.mintAccount(instructions, payer, signers);
        signers = signers.concat(inst1.signers);
        const tokenKey = yield MetaplexInstruction.mint(instructions, inst1.mintAccount, payer, payer);
        return {
            instructions,
            signers,
            tokenKey
        };
    });
    Metaplex.mint = (data, owner, signers) => __awaiter(this, void 0, void 0, function* () {
        const inst1 = yield Metaplex.initializeMint(owner, signers);
        signers = signers.concat(inst1.signers);
        const inst2 = yield MetaplexMetaData.create(data, inst1.tokenKey.toPublicKey(), owner, owner, owner);
        if (inst2.isErr) {
            return Result.err(inst2.error);
        }
        const inst3 = yield MetaplexMetaData.update(data, undefined, undefined, inst1.tokenKey.toPublicKey(), owner, signers);
        if (inst3.isErr)
            return Result.err(inst3.error);
        const mergeInstructions = inst1.instructions.concat(inst2.unwrap()).concat(inst3.unwrap());
        return Result.ok(new Instruction(mergeInstructions, signers, undefined, inst1.tokenKey));
    });
    Metaplex.burn = (tokenKey, owner, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const burnAmount = 1;
        const tokenDecimals = 0;
        return SplToken.burn(tokenKey, owner, signers, burnAmount, tokenDecimals, feePayer);
    });
})(Metaplex || (Metaplex = {}));
