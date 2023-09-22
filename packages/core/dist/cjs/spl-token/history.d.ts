import { Pubkey } from "@solana-suite/shared";
import { FilterType, History, HistoryOptions, OnErr, OnOk } from "../types/";
export declare namespace SplToken {
    const getHistory: (target: Pubkey, filterType: FilterType, onOk: OnOk<History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
}
//# sourceMappingURL=history.d.ts.map