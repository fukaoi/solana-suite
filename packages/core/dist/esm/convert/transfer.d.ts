import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { InfraSideOutput, UserSideOutput } from '../types/';
export declare namespace Convert.Transfer {
    const intoUserSide: (output: InfraSideOutput.Transfer, meta: ParsedTransactionWithMeta) => UserSideOutput.History | undefined;
}
//# sourceMappingURL=transfer.d.ts.map