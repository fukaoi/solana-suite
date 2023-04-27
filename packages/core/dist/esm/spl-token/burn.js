import { createBurnCheckedInstruction, getAssociatedTokenAddressSync, } from '@solana/spl-token';
import { Instruction, Try } from '@solana-suite/shared';
import { SplToken as _Calculate } from './calculate-amount';
export var SplToken;
(function (SplToken) {
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => {
        return Try(() => {
            const tokenAccount = getAssociatedTokenAddressSync(mint.toPublicKey(), owner.toPublicKey());
            const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
            const keypairs = signers.map((s) => s.toKeypair());
            const inst = createBurnCheckedInstruction(tokenAccount, mint.toPublicKey(), owner.toPublicKey(), _Calculate.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, keypairs);
            return new Instruction([inst], keypairs, payer);
        });
    };
})(SplToken || (SplToken = {}));
//# sourceMappingURL=burn.js.map