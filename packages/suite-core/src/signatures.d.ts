import { ParsedTransactionWithMeta } from "@solana/web3.js";
import { Pubkey, Result } from "shared";
import { UserSideOutput } from "./types/";
export declare namespace Signatures {
    const getForAdress: (pubkey: Pubkey, parser: (transaction: ParsedTransactionWithMeta) => UserSideOutput.History | undefined, callback: (history: Result<UserSideOutput.History[], Error>) => void, options: {
        waitTime: number;
        narrowDown: number;
    }, histories?: UserSideOutput.History[]) => Promise<void>;
}
