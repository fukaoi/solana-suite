import { Result } from './result';
import { Connection, Commitment } from '@solana/web3.js';
export declare namespace Node {
    const getConnection: () => Connection;
    const changeConnection: (param: {
        cluster?: string;
        commitment?: Commitment;
        customClusterUrl?: string[];
    }) => void;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<Result.Ok<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureResult>, Error> | Result.Err<import("@solana/web3.js").RpcResponseAndContext<import("@solana/web3.js").SignatureResult>, Error> | Result.Ok<never, any> | Result.Err<never, any>>;
}
//# sourceMappingURL=node.d.ts.map