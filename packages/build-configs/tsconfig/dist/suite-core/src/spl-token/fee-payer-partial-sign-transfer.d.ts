import { Result, PartialSignInstruction, Pubkey, Secret } from 'shared';
export declare namespace SplToken {
    const feePayerPartialSignTransfer: (mint: Pubkey, owner: Pubkey, dest: Pubkey, signers: Secret[], amount: number, mintDecimal: number, feePayer: Pubkey) => Promise<Result<PartialSignInstruction, Error>>;
}
