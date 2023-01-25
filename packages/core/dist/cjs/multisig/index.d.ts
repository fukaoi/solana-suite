/// <reference types="@solana/web3.js" />
export declare const Multisig: {
    isAddress: (multisig: import('@solana/web3.js').PublicKey) => Promise<import('@solana-suite/shared').Result<boolean, Error>>;
    getInfo: (multisig: import('@solana/web3.js').PublicKey) => Promise<import('@solana-suite/shared').Result<import('@solana/buffer-layout').LayoutObject, Error>>;
    create: (m: number, feePayer: import('@solana/web3.js').Keypair, signerPubkey: import('@solana/web3.js').PublicKey[]) => Promise<import('@solana-suite/shared').Result<import('@solana-suite/shared').Instruction, Error>>;
};
