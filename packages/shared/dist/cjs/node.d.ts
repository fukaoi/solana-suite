import { Result } from './result';
import { Connection, Commitment, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';
export declare namespace Node {
    const getConnection: () => Connection;
    const changeConnection: (param: {
        cluster?: string;
        commitment?: Commitment;
    }) => void;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>>;
}
