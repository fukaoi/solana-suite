export declare enum FilterType {
    Transfer = "transfer",
    Memo = "memo",
    Mint = "mint"
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
