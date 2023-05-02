import { Result } from '@solana-suite/shared';
export declare enum Sortable {
    Asc = "asc",
    Desc = "desc"
}
export type FindByOwnerCallback = <T>(result: Result<T[], Error>) => void;
