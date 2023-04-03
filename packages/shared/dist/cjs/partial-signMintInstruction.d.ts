import { TransactionSignature } from '@solana/web3.js';
import { Result, Secret, Pubkey } from './';
export declare class PartialSignMintInstruction {
    hexInstruction: string;
    data: Pubkey;
    constructor(instructions: string, mint: Pubkey);
    submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
}
