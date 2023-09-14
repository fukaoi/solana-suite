import { TransactionSignature, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Result } from '../';
export declare class Instruction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}
//# sourceMappingURL=index.d.ts.map