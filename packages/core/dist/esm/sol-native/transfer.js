import { SystemProgram } from '@solana/web3.js';
import { Instruction, Try } from '@solana-suite/shared';
export var SolNative;
(function (SolNative) {
    const RADIX = 10;
    SolNative.transfer = (source, dest, signers, amount, feePayer) => {
        return Try(() => {
            const inst = SystemProgram.transfer({
                fromPubkey: source.toPublicKey(),
                toPubkey: dest.toPublicKey(),
                lamports: parseInt(`${amount.toLamports()}`, RADIX),
            });
            const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
            return new Instruction([inst], signers.map((s) => s.toKeypair()), payer);
        });
    };
})(SolNative || (SolNative = {}));
//# sourceMappingURL=transfer.js.map