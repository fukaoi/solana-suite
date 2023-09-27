/// <reference types="node" />
export declare const Memo: {
    getHistory: (target: import("shared").Pubkey, onOk: import("..").OnOk<import("..").UserSideOutput.History>, onErr: import("..").OnErr, options?: Partial<import("..").HistoryOptions>) => Promise<void>;
    decode: (encoded: string) => string;
    encode: (data: string) => Buffer;
    create: (data: string, owner: import("shared").Pubkey, signer: import("shared").Secret, feePayer?: import("shared").Secret | undefined) => import("shared").Instruction;
};
