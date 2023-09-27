export declare const SplToken: {
    transfer: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, dest: import("shared").Pubkey, signers: import("shared").Secret[], amount: number, mintDecimal: number, feePayer?: import("shared").Secret | undefined) => Promise<import("shared").Result<import("shared").Instruction, Error>>;
    thaw: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, freezeAuthority: import("shared").Secret, feePayer?: import("shared").Secret | undefined) => import("shared").Result<import("shared").Instruction, Error>;
    createFreezeAuthority: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, freezeAuthority: import("@solana/web3.js").PublicKey) => import("@solana/web3.js").TransactionInstruction;
    createMintInstructions: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: import("@metaplex-foundation/mpl-token-metadata").DataV2, feePayer: import("@solana/web3.js").PublicKey, isMutable: boolean) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
    mint: (owner: import("shared").Pubkey, signer: import("shared").Secret, totalAmount: number, mintDecimal: number, input: import("types/converter").UserSideInput.TokenMetadata, feePayer?: import("shared").Secret | undefined, freezeAuthority?: import("shared").Pubkey | undefined) => Promise<import("shared").Result<import("shared").MintInstruction, Error>>;
    getHistory: (target: import("shared").Pubkey, filterType: import("..").FilterType, onOk: import("..").OnOk<import("..").UserSideOutput.History>, onErr: import("..").OnErr, options?: Partial<import("..").HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, dest: import("shared").Pubkey, signers: import("shared").Secret[], amount: number, mintDecimal: number, feePayer: import("shared").Pubkey) => Promise<import("shared").Result<import("shared").PartialSignInstruction, Error>>;
    freeze: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, freezeAuthority: import("shared").Secret, feePayer?: import("shared").Secret | undefined) => import("shared").Result<import("shared").Instruction, Error>;
    genericFindByOwner: <T extends import("types/converter").UserSideOutput.TokenMetadata | import("types/converter").UserSideOutput.NftMetadata>(owner: import("shared").Pubkey, callback: (result: import("shared").Result<T[], Error>) => void, tokenStandard: import("types/converter").UserSideInput.TokenStandard, sortable?: import("..").Sortable | undefined, isHolder?: boolean | undefined) => Promise<void>;
    genericFindByMint: <T_1 extends import("types/converter").UserSideOutput.TokenMetadata | import("types/converter").UserSideOutput.NftMetadata>(mint: import("shared").Pubkey, tokenStandard: import("types/converter").UserSideInput.TokenStandard) => Promise<import("shared").Result<T_1, Error>>;
    findByOwner: (owner: import("shared").Pubkey, onOk: import("..").OnOk<import("types/converter").UserSideOutput.TokenMetadata>, onErr: import("..").OnErr, options?: {
        sortable?: import("..").Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => void;
    findByMint: (mint: import("shared").Pubkey) => Promise<import("shared").Result<import("types/converter").UserSideOutput.TokenMetadata, Error>>;
    burn: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, signers: import("shared").Secret[], burnAmount: number, tokenDecimals: number, feePayer?: import("shared").Secret | undefined) => import("shared").Result<import("shared").Instruction, Error>;
    add: (token: import("shared").Pubkey, owner: import("shared").Pubkey, signers: import("shared").Secret[], totalAmount: number, mintDecimal: number, feePayer?: import("shared").Secret | undefined) => Promise<import("shared").Result<import("shared").Instruction, Error>>;
};
