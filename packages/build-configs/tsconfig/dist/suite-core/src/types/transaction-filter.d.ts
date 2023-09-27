export declare enum FilterType {
    Memo = "memo",
    Mint = "mint",
    OnlyMemo = "only-memo",
    Transfer = "transfer"
}
export declare enum ModuleName {
    SolNative = "system",
    SplToken = "spl-token"
}
export declare const FilterOptions: {
    Transfer: {
        program: string[];
        action: string[];
    };
    Memo: {
        program: string[];
        action: string[];
    };
    Mint: {
        program: string[];
        action: string[];
    };
};
export type PostTokenAccount = {
    account: string;
    owner: string;
};
export type WithMemo = {
    sig: string[];
    memo: string;
};
