export declare const SolNative: {
    transferWithMultisig: (owner: import("shared").Pubkey, dest: import("shared").Pubkey, signers: import("shared").Secret[], amount: number, feePayer?: import("shared").Secret) => Promise<import("shared").Result<import("shared").Instruction, Error>>;
    transfer: (source: import("shared").Pubkey, dest: import("shared").Pubkey, signers: import("shared").Secret[], amount: number, feePayer?: import("shared").Secret) => import("shared").Result<import("shared").Instruction, Error>;
    getHistory: (target: import("shared").Pubkey, filterType: import("..").FilterType, onOk: import("..").OnOk<import("..").UserSideOutput.History>, onErr: import("..").OnErr, options?: Partial<import("..").HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (owner: import("shared").Pubkey, dest: import("shared").Pubkey, signers: import("shared").Secret[], amount: number, feePayer: import("shared").Pubkey) => Promise<import("shared").Result<import("shared").PartialSignInstruction, Error>>;
    findByOwner: (owner: import("shared").Pubkey) => Promise<import("shared").Result<import("..").OwnerInfo, Error>>;
};
