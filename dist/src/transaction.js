import { Node, Result, Constants } from './';
export var Transaction;
(function (Transaction) {
    Transaction.get = async (signature) => await Node.getConnection().getParsedConfirmedTransaction(signature)
        .then(Result.ok)
        .catch(Result.err);
    Transaction.getAll = async (pubkey, limit) => {
        const transactions = await Node.getConnection().getConfirmedSignaturesForAddress2(pubkey, { limit })
            .then(Result.ok)
            .catch(Result.err);
        if (transactions.isErr) {
            return transactions;
        }
        else {
            const parsedSig = [];
            for (const tx of transactions.value) {
                const res = await Transaction.get(tx.signature);
                if (res.isErr)
                    return res;
                res !== null && parsedSig.push(res.value);
            }
            return Result.ok(parsedSig);
        }
    };
    Transaction.confirmedSig = async (signature, commitment = Constants.COMMITMENT) => {
        return await Node.getConnection().confirmTransaction(signature, commitment)
            .then(Result.ok)
            .catch(Result.err);
    };
})(Transaction || (Transaction = {}));
