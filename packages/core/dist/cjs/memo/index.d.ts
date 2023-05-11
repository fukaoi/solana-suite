/// <reference types="node" />
export declare const Memo: {
    getHistory: (target: import("@solana-suite/shared").Pubkey, callback: (result: import("@solana-suite/shared").Result<import("..").UserSideOutput.History[], Error>) => void, narrowDown?: number) => Promise<void>;
    decode: (encoded: string) => string;
    encode: (data: string) => Buffer;
    create: (data: string, owner: import("@solana-suite/shared").Pubkey, signer: import("@solana-suite/shared").Secret, feePayer?: import("@solana-suite/shared").Secret | undefined) => import("@solana-suite/shared").Instruction;
};
