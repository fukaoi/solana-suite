import { UserSideOutput } from '@solana-suite/shared-metaplex';
export declare enum Sortable {
    Asc = "asc",
    Desc = "desc"
}
export declare namespace Find {
    type OnOk = (ok: UserSideOutput.TokenMetadata[]) => void;
    type OnErr = (err: Error) => void;
}
//# sourceMappingURL=find.d.ts.map