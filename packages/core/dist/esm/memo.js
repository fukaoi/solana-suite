import { TransactionInstruction, } from '@solana/web3.js';
import bs from 'bs58';
import { Constants, Instruction } from '@solana-suite/shared';
export var Memo;
(function (Memo) {
    Memo.decode = (encoded) => bs.decode(encoded).toString();
    Memo.encode = (data) => Buffer.from(data);
    Memo.create = (data, owner, signer, feePayer) => {
        const key = owner
            ? [{
                    pubkey: owner,
                    isSigner: false,
                    isWritable: true
                }]
            : [];
        const instruction = new TransactionInstruction({
            programId: Constants.MEMO_PROGRAM_ID,
            data: Memo.encode(data),
            keys: key
        });
        return new Instruction([instruction], [signer], feePayer);
    };
})(Memo || (Memo = {}));
