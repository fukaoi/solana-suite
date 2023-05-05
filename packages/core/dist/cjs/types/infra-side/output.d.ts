import { Pubkey } from '@solana-suite/shared';
import { PublicKey } from '@solana/web3.js';
export declare namespace InfraSideOutput {
    type Transfer = {
        parsed: {
            info: {
                destination: Pubkey;
                source: Pubkey;
                lamports: number;
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type MintTo = {
        parsed: {
            info: {
                account: Pubkey;
                amount: string;
                mint: Pubkey;
                mintAuthority: Pubkey;
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type MintToChecked = MintTo;
    type TransferChecked = {
        parsed: {
            info: {
                destination: Pubkey;
                mint: Pubkey;
                mintAuthority: Pubkey;
                signers: Pubkey[];
                source: Pubkey;
                tokenAmount: {
                    amount: string;
                    decimals: number;
                    uiAmount: number;
                    uiAmountString: string;
                };
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type Memo = {
        parsed: string;
        program: string;
        programId: PublicKey;
    };
}
