import { Result, PartialSignInstruction, Pubkey, Secret } from 'shared';
export declare namespace SolNative {
    const feePayerPartialSignTransfer: (owner: Pubkey, dest: Pubkey, signers: Secret[], amount: number, feePayer: Pubkey) => Promise<Result<PartialSignInstruction, Error>>;
}
