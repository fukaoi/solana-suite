import { Pubkey } from '@solana-suite/shared';
import { History, OnErr, OnOk } from '../types/';
export declare namespace Memo {
    const getHistory: (target: Pubkey, onOk: OnOk<History>, onErr: OnErr, narrowDown?: number) => Promise<void>;
}
//# sourceMappingURL=history.d.ts.map