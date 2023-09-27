/// <reference types="@solana/web3.js" />
export declare const SplToken: {
    transfer: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, dest: import("shared").Pubkey, signers: import("shared").Secret[], amount: number, mintDecimal: number, feePayer?: import("shared").Secret) => Promise<import("shared").Result<import("shared").Instruction, Error>>;
    thaw: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, freezeAuthority: import("shared").Secret, feePayer?: import("shared").Secret) => import("shared").Result<import("shared").Instruction, Error>;
    createFreezeAuthority: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, freezeAuthority: import("@solana/web3.js").PublicKey) => import("@solana/web3.js").TransactionInstruction;
    createMintInstructions: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: import("@metaplex-foundation/mpl-token-metadata").DataV2, feePayer: import("@solana/web3.js").PublicKey, isMutable: boolean) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
    mint: (owner: import("shared").Pubkey, signer: import("shared").Secret, totalAmount: number, mintDecimal: number, input: UserSideInput.TokenMetadata, feePayer?: import("shared").Secret, freezeAuthority?: import("shared").Pubkey) => Promise<import("shared").Result<import("shared").MintInstruction, Error>>;
    getHistory: (target: import("shared").Pubkey, filterType: import("..").FilterType, onOk: import("..").OnOk<import("..").UserSideOutput.History>, onErr: import("..").OnErr, options?: Partial<import("..").HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, dest: import("shared").Pubkey, signers: import("shared").Secret[], amount: number, mintDecimal: number, feePayer: import("shared").Pubkey) => Promise<import("shared").Result<import("shared").PartialSignInstruction, Error>>;
    freeze: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, freezeAuthority: import("shared").Secret, feePayer?: import("shared").Secret) => import("shared").Result<import("shared").Instruction, Error>;
    genericFindByOwner: <T extends unknown>(owner: import("shared").Pubkey, callback: (result: import("shared").Result<T[], Error>) => void, tokenStandard: UserSideInput.TokenStandard, sortable?: import("..").Sortable, isHolder?: boolean) => Promise<void>;
    genericFindByMint: <T_1 extends unknown>(mint: import("shared").Pubkey, tokenStandard: UserSideInput.TokenStandard) => Promise<import("shared").Result<T_1, Error>>;
    findByOwner: (owner: import("shared").Pubkey, onOk: import("..").OnOk<SharendMetaplex.TokenMetadata>, onErr: import("..").OnErr, options?: {
        sortable?: import("..").Sortable;
        isHolder?: boolean;
    }) => void;
    findByMint: (mint: import("shared").Pubkey) => Promise<import("shared").Result<UserSideOutput.TokenMetadata, Error>>;
    burn: (mint: import("shared").Pubkey, owner: import("shared").Pubkey, signers: import("shared").Secret[], burnAmount: number, tokenDecimals: number, feePayer?: import("shared").Secret) => import("shared").Result<import("shared").Instruction, Error>;
    add: (token: import("shared").Pubkey, owner: import("shared").Pubkey, signers: import("shared").Secret[], totalAmount: number, mintDecimal: number, feePayer?: import("shared").Secret) => Promise<import("shared").Result<import("shared").Instruction, Error>>;
};
