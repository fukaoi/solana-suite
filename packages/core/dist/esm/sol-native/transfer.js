import { SystemProgram } from '@solana/web3.js';
import { Instruction, Try } from '@solana-suite/shared';
export var SolNative;
(function (SolNative) {
    const RADIX = 10;
    SolNative.transfer = (source, destination, signers, amount, feePayer) => {
        return Try(() => {
            const inst = SystemProgram.transfer({
                fromPubkey: source,
                toPubkey: destination,
                lamports: parseInt(`${amount.toLamports()}`, RADIX),
            });
            return new Instruction([inst], signers, feePayer);
        });
    };
})(SolNative || (SolNative = {}));
//# sourceMappingURL=transfer.js.map