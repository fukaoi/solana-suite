/// <reference types="node" />
export declare const Memo: {
    getHistory: (target: import("@solana-suite/shared").Pubkey, onOk: import("..").OnOk<import("..").UserSideOutput.History>, onErr: import("..").OnErr, option?: {
        waitTime: 0.04;
        narrowDown: 1000;
    } | undefined) => Promise<void>;
    decode: (encoded: string) => string;
    encode: (data: string) => Buffer;
    create: (data: string, owner: import("@solana-suite/shared").Pubkey, signer: import("@solana-suite/shared").Secret, feePayer?: import("@solana-suite/shared").Secret | undefined) => import("@solana-suite/shared").Instruction;
};
//# sourceMappingURL=index.d.ts.map