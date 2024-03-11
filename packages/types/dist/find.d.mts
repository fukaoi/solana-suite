import { Pubkey } from './account.mjs';

declare enum SortDirection {
    Asc = "asc",
    Desc = "desc"
}
declare enum SortBy {
    Created = "created",
    Updated = "updated",
    Recent = "recent_action"
}
type Sortable = {
    sortBy: SortBy;
    sortDirection: SortDirection;
};
type FindOptions = {
    limit: number;
    page: number;
    sort: Sortable;
    before: string;
    after: string;
};
type Find = {
    sol?: string;
    account?: string;
    destination?: Pubkey;
    source?: Pubkey;
    authority?: Pubkey;
    multisigAuthority?: Pubkey;
    signers?: Pubkey[];
    mint?: Pubkey;
    mintAuthority?: Pubkey;
    tokenAmount?: string;
    memo?: string;
    dateTime?: Date;
    type?: string;
    sig?: string;
    innerInstruction?: boolean;
};

export { Find, FindOptions, SortBy, SortDirection, Sortable };
