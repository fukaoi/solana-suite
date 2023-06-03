import { Pubkey } from '@solana-suite/shared';
import { FilterType, History } from '../types/';
export declare namespace SolNative {
    const getHistory: (target: Pubkey, filterType: FilterType, onOk: History.OnOk, onErr: History.OnErr, narrowDown?: number) => Promise<void>;
}
//# sourceMappingURL=history.d.ts.map