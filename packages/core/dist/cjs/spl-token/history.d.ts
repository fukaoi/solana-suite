import { Pubkey } from '@solana-suite/shared';
import { FilterType, History, OnErr, OnOk } from '../types/';
export declare namespace SplToken {
    const getHistory: (target: Pubkey, filterType: FilterType, onOk: OnOk<History>, onErr: OnErr, narrowDown?: number) => Promise<void>;
}
//# sourceMappingURL=history.d.ts.map