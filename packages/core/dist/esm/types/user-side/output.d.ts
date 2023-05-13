import { Pubkey } from '@solana-suite/shared';
import { UserSideOutput as _TokenAmount } from '@solana-suite/shared-metaplex';
export declare namespace UserSideOutput {
    type History = {
        sol?: string;
        account?: string;
        destination?: Pubkey;
        source?: Pubkey;
        authority?: Pubkey;
        multisigAuthority?: Pubkey;
        signers?: Pubkey[];
        mint?: Pubkey;
        mintAuthority?: Pubkey;
        tokenAmount?: _TokenAmount.TokenAmount;
        memo?: string;
        dateTime?: Date;
        type?: string;
        sig?: string;
        innerInstruction?: boolean;
    };
}
