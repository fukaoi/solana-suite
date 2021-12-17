import { TransactionInstruction, } from '@solana/web3.js';
import bs from 'bs58';
import { Constants, Instruction } from '@solana-suite/shared';
export var Memo;
(function (Memo) {
    Memo.decode = (encoded) => bs.decode(encoded).toString();
    Memo.encode = (data) => Buffer.from(data);
    Memo.create = (data, owners, signers, feePayer) => {
        const key = owners && owners.length > 0
            ?
                owners.map(owner => {
                    return {
                        pubkey: owner,
                        isSigner: true,
                        isWritable: true
                    };
                })
            : [];
        const instruction = new TransactionInstruction({
            programId: Constants.MEMO_PROGRAM_ID,
            data: Memo.encode(data),
            keys: key
        });
        return new Instruction([instruction], signers, feePayer);
    };
    Memo.parse = (tx) => {
        const res = tx.transaction.message.instructions.filter(d => {
            const value = d;
            return value.program === 'spl-memo';
        });
        return res[0].parsed;
    };
})(Memo || (Memo = {}));
