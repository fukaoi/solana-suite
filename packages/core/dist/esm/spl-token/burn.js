import { createBurnCheckedInstruction } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Instruction, Try } from '@solana-suite/shared';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { SplToken as _Calculate } from './calculate-amount';
export var SplToken;
(function (SplToken) {
    const findAssociatedTokenAddress = (mint, owner) => {
        const address = PublicKey.findProgramAddressSync([
            owner.toPublicKey().toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mint.toPublicKey().toBuffer(),
        ], ASSOCIATED_TOKEN_PROGRAM_ID);
        return address[0];
    };
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => {
        return Try(() => {
            const tokenAccount = findAssociatedTokenAddress(mint, owner);
            const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
            const keypairs = signers.map((s) => s.toKeypair());
            const inst = createBurnCheckedInstruction(tokenAccount, mint.toPublicKey(), owner.toPublicKey(), _Calculate.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, keypairs);
            return new Instruction([inst], keypairs, payer);
        });
    };
})(SplToken || (SplToken = {}));
//# sourceMappingURL=burn.js.map