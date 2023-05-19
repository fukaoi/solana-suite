import { TransactionSignature, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Instruction, Result } from './';
export declare class MintInstruction extends Instruction {
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}
//# sourceMappingURL=mint-instruction.d.ts.map