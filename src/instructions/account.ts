import * as BufferLayout from '@solana/buffer-layout';
import {Instruction} from '../';

export namespace AccountInstruction {
  export const Layout = BufferLayout.struct(
    [
      Instruction.createLayoutPubKey('mint'),
      Instruction.createLayoutPubKey('owner'),
      Instruction.createLayoutUint64('amount'),
      BufferLayout.u32('delegateOption'),
      Instruction.createLayoutPubKey('delegate'),
      BufferLayout.u8('state'),
      BufferLayout.u32('isNativeOption'),
      Instruction.createLayoutUint64('isNative'),
      Instruction.createLayoutUint64('delegatedAmount'),
      BufferLayout.u32('closeAuthorityOption'),
      Instruction.createLayoutPubKey('closeAuthority'),
    ],
  );
}
