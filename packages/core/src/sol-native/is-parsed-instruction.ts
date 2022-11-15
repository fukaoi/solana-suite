import { ParsedInstruction } from '@solana/web3.js';

//@internal
export namespace SolNative {
  // Parsed transaction instruction, Type Guard
  export const isParsedInstruction = (
    arg: unknown
  ): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && 'parsed' in arg;
  };
}
