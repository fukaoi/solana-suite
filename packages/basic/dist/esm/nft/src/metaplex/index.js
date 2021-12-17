import { Token, MintLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SystemProgram, Keypair, } from '@solana/web3.js';
import { Node, Instruction, Result, } from '@solana-suite/shared';
import { MetaplexMetaData } from './metadata';
export * from './instructure';
export * from './metadata';
export * from './serialize';
export * from './account';
export var MetaplexInstruction;
(function (MetaplexInstruction) {
    MetaplexInstruction.mintAccount = async (instructions, owner, // need sufficient sol account
    signers) => {
        const mintRentExempt = await Node.getConnection().getMinimumBalanceForRentExemption(MintLayout.span);
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
    };
    MetaplexInstruction.mint = async (instructions, createdAccount, owner, freezeAuthority) => {
        const decimals = 0;
        instructions.push(Token.createInitMintInstruction(TOKEN_PROGRAM_ID, createdAccount, decimals, owner, freezeAuthority));
        return createdAccount.toBase58();
    };
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
    Metaplex.initializeMint = async (payer, signers) => {
        const instructions = [];
        const inst1 = await MetaplexInstruction.mintAccount(instructions, payer, signers);
        signers = signers.concat(inst1.signers);
        const tokenKey = await MetaplexInstruction.mint(instructions, inst1.mintAccount, payer, payer);
        return {
            instructions,
            signers,
            tokenKey
        };
    };
    Metaplex.mint = async (data, owner, signers) => {
        const inst1 = await Metaplex.initializeMint(owner, signers);
        signers = signers.concat(inst1.signers);
        const inst2 = await MetaplexMetaData.create(data, inst1.tokenKey.toPubkey(), owner, owner, owner);
        if (inst2.isErr) {
            return Result.err(inst2.error);
        }
        const inst3 = await MetaplexMetaData.update(data, undefined, undefined, inst1.tokenKey.toPubkey(), owner, signers);
        if (inst3.isErr)
            return Result.err(inst3.error);
        const mergeInstructions = inst1.instructions.concat(inst2.unwrap()).concat(inst3.unwrap());
        return Result.ok(new Instruction(mergeInstructions, signers, undefined, inst1.tokenKey));
    };
})(Metaplex || (Metaplex = {}));
