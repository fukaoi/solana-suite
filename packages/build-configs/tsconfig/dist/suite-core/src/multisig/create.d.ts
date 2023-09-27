import { Result, Instruction, Secret, Pubkey } from 'shared';
export declare namespace Multisig {
    const create: (m: number, feePayer: Secret, signerPubkeys: Pubkey[]) => Promise<Result<Instruction, Error>>;
}
