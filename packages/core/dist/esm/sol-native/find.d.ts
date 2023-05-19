import { Pubkey, Result } from '@solana-suite/shared';
import { SolNativeOwnerInfo } from '../types/sol-native';
export declare namespace SolNative {
    const findByOwner: (owner: Pubkey) => Promise<Result<SolNativeOwnerInfo, Error>>;
}
//# sourceMappingURL=find.d.ts.map