import { Pubkey } from "shared";
import { History, HistoryOptions, OnErr, OnOk } from "../types/";
export declare namespace Memo {
    const getHistory: (target: Pubkey, onOk: OnOk<History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
}