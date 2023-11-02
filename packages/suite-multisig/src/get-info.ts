import { Result, Try } from '~/shared';
import { Pubkey } from '~/types/account';
import { Node } from '~/node';
import { LayoutObject } from '@solana/buffer-layout';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { MultisigInstruction } from './create';

export namespace Multisig {
  export const getInfo = async (
    multisig: Pubkey,
  ): Promise<Result<LayoutObject, Error>> => {
    return Try(async () => {
      const info = await Node.getConnection().getAccountInfo(
        multisig.toPublicKey(),
      );
      if (info === null) {
        throw Error('Failed to find multisig');
      }
      if (!info.owner.equals(TOKEN_PROGRAM_ID)) {
        throw Error('Invalid multisig owner');
      }
      if (info.data.length !== MultisigInstruction.Layout.span) {
        throw Error('Invalid multisig size');
      }

      const data = Buffer.from(info.data);
      const multisigInfo = MultisigInstruction.Layout.decode(data);
      multisigInfo.signer1 = new PublicKey(multisigInfo.signer1);
      multisigInfo.signer2 = new PublicKey(multisigInfo.signer2);
      multisigInfo.signer3 = new PublicKey(multisigInfo.signer3);
      multisigInfo.signer4 = new PublicKey(multisigInfo.signer4);
      multisigInfo.signer5 = new PublicKey(multisigInfo.signer5);
      multisigInfo.signer6 = new PublicKey(multisigInfo.signer6);
      multisigInfo.signer7 = new PublicKey(multisigInfo.signer7);
      multisigInfo.signer8 = new PublicKey(multisigInfo.signer8);
      multisigInfo.signer9 = new PublicKey(multisigInfo.signer9);
      multisigInfo.signer10 = new PublicKey(multisigInfo.signer10);
      multisigInfo.signer11 = new PublicKey(multisigInfo.signer11);
      return multisigInfo;
    });
  };
}
