import { TransactionInstruction, PublicKey, Keypair } from '@solana/web3.js';

declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret = (string & {
    [secretNominality]: never;
}) | string;

/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {Pubkey} mint
 * @param {Pubkey} owner
 * @param {Secret} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
declare namespace Account$3 {
    namespace Associated {
        /**
         * [Main logic]Get Associated token Account.
         * if not created, create new token accouint
         *
         * @param {Pubkey} mint
         * @param {Pubkey} owner
         * @param {Pubkey} feePayer
         * @returns Promise<string>
         */
        const makeOrCreateInstruction: (mint: Pubkey, owner: Pubkey, feePayer?: Pubkey, allowOwnerOffCurve?: boolean) => Promise<{
            tokenAccount: string;
            inst: TransactionInstruction | undefined;
        }>;
    }
}

declare namespace Account$2 {
    class Keypair {
        secret: Secret;
        pubkey: Pubkey;
        constructor(params: {
            pubkey?: Pubkey;
            secret: Secret;
        });
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
        static isPubkey: (value: string) => value is Pubkey;
        static isSecret: (value: string) => value is Secret;
        static create: () => Keypair;
        static toKeyPair: (keypair: Keypair) => Keypair;
    }
}

declare namespace Account$1 {
    namespace Pda {
        const getMetadata: (address: Pubkey) => PublicKey;
        const getMasterEdition: (address: Pubkey) => PublicKey;
        const getTreeAuthority: (address: Pubkey) => PublicKey;
        const getBgumSigner: () => PublicKey;
        const getAssetId: (address: Pubkey, leafIndex: number) => Pubkey;
    }
}

declare global {
    interface String {
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
        toExplorerUrl(explorer?: Explorer, options?: ExplorerOptions): string;
    }
    interface Number {
        toSol(): number;
        toLamports(): number;
    }
    interface Console {
        debug(data: unknown, data2?: unknown, data3?: unknown): void;
    }
    interface Secret {
        toKeypair(): Keypair;
    }
    interface Pubkey {
        toPublicKey(): PublicKey;
    }
}
declare enum Explorer {
    Solscan = "solscan",
    SolanaFM = "solanafm",
    Xray = "xray"
}
type ExplorerOptions = {
    replacePath: string;
};

declare const Account: {
    Pda: typeof Account$1.Pda;
    Keypair: typeof Account$2.Keypair;
    Associated: typeof Account$3.Associated;
};

export { Account };
