import { TransactionInstruction } from '@solana/web3.js';
import { Constants, Instruction } from '@solana-suite/shared';
import bs from 'bs58';
export var Memo;
(function (Memo) {
    Memo.decode = (encoded) => bs.decode(encoded).toString();
    Memo.encode = (data) => Buffer.from(data);
    Memo.create = (data, owner, signer, feePayer) => {
        const key = owner.toPublicKey()
            ? [
                {
                    pubkey: owner.toPublicKey(),
                    isSigner: true,
                    isWritable: true,
                },
            ]
            : [];
        const instruction = new TransactionInstruction({
            programId: Constants.MEMO_PROGRAM_ID,
            data: Memo.encode(data),
            keys: key,
        });
        const payer = feePayer || signer;
        return new Instruction([instruction], [signer.toKeypair()], payer.toKeypair());
    };
})(Memo || (Memo = {}));
//# sourceMappingURL=create.js.map