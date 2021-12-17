import { Token, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { Transaction } from './';
import { Node, Result, Instruction } from '@solana-suite/shared';
export var SplToken;
(function (SplToken) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    let TransactionStatus;
    (function (TransactionStatus) {
        TransactionStatus["Transfer"] = "transfer";
        TransactionStatus["TransferChecked"] = "transferChecked";
        TransactionStatus["Memo"] = "memo";
    })(TransactionStatus || (TransactionStatus = {}));
    const isTransfer = (value) => {
        if (value.program === 'spl-token') {
            switch (value.parsed.type) {
                case TransactionStatus.Transfer:
                case TransactionStatus.TransferChecked:
                case TransactionStatus.Memo:
                    return true;
                default:
                    return false;
            }
        }
        else {
            return false;
        }
    };
    const convertTimestmapToDate = (blockTime) => new Date(blockTime * 1000);
    SplToken.subscribeAccount = (pubkey, callback) => {
        return Node.getConnection().onAccountChange(pubkey, async () => {
            const res = await SplToken.getTransferHistory(pubkey, 1);
            if (res.isErr) {
                return res;
            }
            callback(res.value[0]);
        });
    };
    SplToken.unsubscribeAccount = (subscribeId) => Node.getConnection().removeAccountChangeListener(subscribeId);
    SplToken.getTransferHistory = async (pubkey, limit) => {
        const transactions = await Transaction.getAll(pubkey, limit);
        if (transactions.isErr) {
            return transactions;
        }
        const hist = [];
        for (const tx of transactions.unwrap()) {
            for (const inst of tx.transaction.message.instructions) {
                const value = inst;
                if (isTransfer(value)) {
                    const v = value.parsed;
                    v.date = convertTimestmapToDate(tx.blockTime);
                    hist.push(v);
                }
            }
        }
        return Result.ok(hist);
    };
    SplToken.getTransferDestinationList = async (pubkey) => {
        const transactions = await Transaction.getAll(pubkey);
        if (transactions.isErr) {
            return Result.err(transactions.error);
        }
        const hist = [];
        for (const tx of transactions.unwrap()) {
            const posts = tx.meta?.postTokenBalances;
            if (posts.length > 0) {
                posts.forEach((p) => {
                    const amount = p.uiTokenAmount.uiAmount;
                    if (amount > 0) {
                        const index = p.accountIndex;
                        const dest = tx.transaction.message.accountKeys[index].pubkey;
                        const date = convertTimestmapToDate(tx.blockTime);
                        const v = { dest, date };
                        hist.push(v);
                    }
                });
            }
        }
        return Result.ok(hist);
    };
    SplToken.mint = async (owner, signers, totalAmount, mintDecimal, feePayer) => {
        !feePayer && (feePayer = signers[0]);
        const tokenRes = await Token.createMint(Node.getConnection(), feePayer, owner, owner, mintDecimal, TOKEN_PROGRAM_ID)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenRes.isErr) {
            return Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const tokenAssociated = await token.getOrCreateAssociatedAccountInfo(owner)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenAssociated.isErr) {
            return Result.err(tokenAssociated.error);
        }
        const inst = Token.createMintToInstruction(TOKEN_PROGRAM_ID, token.publicKey, tokenAssociated.value.address, owner, signers, totalAmount);
        return Result.ok(new Instruction([inst], signers, feePayer, token.publicKey.toBase58()));
    };
    SplToken.transfer = async (tokenKey, owner, dest, signers, amount, mintDecimal, feePayer) => {
        !feePayer && (feePayer = signers[0]);
        const token = new Token(Node.getConnection(), tokenKey, TOKEN_PROGRAM_ID, feePayer);
        const sourceToken = await token.getOrCreateAssociatedAccountInfo(owner)
            .then(Result.ok)
            .catch(Result.err);
        if (sourceToken.isErr) {
            return Result.err(sourceToken.error);
        }
        const destToken = await token.getOrCreateAssociatedAccountInfo(dest)
            .then(Result.ok)
            .catch(Result.err);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        const inst = Token.createTransferCheckedInstruction(TOKEN_PROGRAM_ID, sourceToken.value.address, tokenKey, destToken.value.address, owner, signers, amount, mintDecimal);
        return Result.ok(new Instruction([inst], signers, feePayer));
    };
    SplToken.transferNft = async (tokenKey, owner, dest, signers, feePayer) => {
        return SplToken.transfer(tokenKey, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    };
})(SplToken || (SplToken = {}));
