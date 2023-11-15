import { Pubkey } from './account.mjs';

declare enum Sortable {
    Asc = "asc",
    Desc = "desc"
}
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

export { Find, Sortable };
