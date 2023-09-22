import { Pubkey } from "@solana-suite/shared";
import { History, OnErr, OnOk } from "../types/";
export declare namespace Memo {
    const getHistory: (target: Pubkey, onOk: OnOk<History>, onErr: OnErr, option?: {
        waitTime: 0.04;
        narrowDown: 1000;
    }) => Promise<void>;
}
//# sourceMappingURL=history.d.ts.map