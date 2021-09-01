import {AccountLayout, MintLayout, Token} from '@solana/spl-token';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import { deserializeUnchecked, serialize } from 'borsh';
import {Util} from './src/util';
import {Transaction} from './src/transaction';
import {SplToken} from './src/spl-token';
import {publicDecrypt} from 'crypto';
import {SplNft} from './src/nft/spl/spl-nft';

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const TOKEN_ASSOCIATED_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

const createUninitializedMint = (
  instructions: TransactionInstruction[],
  payer: PublicKey,
  amount: number,
  signers: Keypair[],
) => {
  const account = Keypair.generate();
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: account.publicKey,
      lamports: amount,
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID,
    }),
  );

  signers.push(account);

  return account.publicKey;
}

const createMint = (
  instructions: TransactionInstruction[],
  payer: PublicKey,
  mintRentExempt: number,
  decimals: number,
  owner: PublicKey,
  freezeAuthority: PublicKey,
  signers: Keypair[],
) => {
  const account = createUninitializedMint(
    instructions,
    payer,
    mintRentExempt,
    signers,
  );

  console.log(signers[0].publicKey.toBase58());

  instructions.push(
    Token.createInitMintInstruction(
      TOKEN_PROGRAM_ID,
      account,
      decimals,
      owner,
      freezeAuthority,
    ),
  );

  return account;
}

export const findProgramAddress = async (
  seeds: (Buffer | Uint8Array)[],
  programId: PublicKey,
) => {
  const result = await PublicKey.findProgramAddress(seeds, programId);
  return [result[0].toBase58(), result[1]] as [string, number];
};

export class Creator {
  address: PublicKey;
  verified: boolean;
  share: number;

  constructor(args: {
    address: PublicKey;
    verified: boolean;
    share: number;
  }) {
    this.address = args.address;
    this.verified = args.verified;
    this.share = args.share;
  }
}

export class Data {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Creator[] | null;
  constructor(args: {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[] | null;
  }) {
    this.name = args.name;
    this.symbol = args.symbol;
    this.uri = args.uri;
    this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
    this.creators = args.creators;
  }
}

class CreateMetadataArgs {
  instruction: number = 0;
  data: Data;
  isMutable: boolean;

  constructor(args: { data: Data; isMutable: boolean }) {
    this.data = args.data;
    this.isMutable = args.isMutable;
  }
}

export const METADATA_SCHEMA = new Map<any, any>([
  [
    CreateMetadataArgs,
    {
      kind: 'struct',
      fields: [
        ['instruction', 'u8'],
        ['data', Data],
        ['isMutable', 'u8'], // bool
      ],
    },
  ],
  [
    Creator,
    {
      kind: 'struct',
      fields: [
        ['address', 'pubkeyAsString'],
        ['verified', 'u8'],
        ['share', 'u8'],
      ],
    },
  ],
  [
    Data,
    {
      kind: 'struct',
      fields: [
        ['name', 'string'],
        ['symbol', 'string'],
        ['uri', 'string'],
        ['sellerFeeBasisPoints', 'u16'],
        ['creators', { kind: 'option', type: [Creator] }],
      ],
    },
  ],
]);


export async function createMetadata(
  data: Data,
  updateAuthority: PublicKey,
  mintKey: PublicKey,
  mintAuthorityKey: PublicKey,
  instructions: TransactionInstruction[],
  payer: PublicKey,
) {
  const metadataProgramId = METADATA_PROGRAM_ID;

  const metadataAccount = (
    await findProgramAddress(
      [
        Buffer.from('metadata'),
        new PublicKey(metadataProgramId).toBuffer(),
        new PublicKey(mintKey).toBuffer(),
      ],
      new PublicKey(metadataProgramId),
    )
  )[0];
  console.log('Data', data);
  const value = new CreateMetadataArgs({ data, isMutable: true });
  debugger;
  const txnData = Buffer.from(serialize(METADATA_SCHEMA, value));

  const keys = [
    {
      pubkey: new PublicKey(metadataAccount),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey(mintKey),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey(mintAuthorityKey),
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: new PublicKey(payer),
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: new PublicKey(updateAuthority),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  instructions.push(
    new TransactionInstruction({
      keys,
      programId: new PublicKey(metadataProgramId),
      data: txnData,
    }),
  );

  return metadataAccount;
}

const main = async () => {
  console.log('#### test exec start ####');
  const instructions: TransactionInstruction[] = [];
  const payer = new PublicKey('DaTm7mPibeigCTiesJUpmxXYkf9T77JK4jgvH76vtYuP');
  const freezeAuthority = payer;
  const owner = payer;
  const decimals = 1;
  const signers = [Util.createKeypair('2dQ7NGx7f3bNXgJsytZX2SFD3cyzo5FzN5UrwVZz2xrYT65ucBZaNXUSdc3hme2GmA7xPpizaYDT42eGsvDdTp7T')];

  const mintRentExempt = await Util.getConnection().getMinimumBalanceForRentExemption(
    MintLayout.span,
  );

  console.log("# mint rent exempt: ", mintRentExempt);

  const mintKey = createMint(
    instructions,
    payer,
    mintRentExempt,
    decimals,
    owner,
    freezeAuthority,
    signers
  ).toBase58();
  console.log('#mintRentExempt: ', mintRentExempt);
  console.log('#mintKey: ', mintKey,);
  console.log('#signers: ', signers[0].publicKey.toBase58(), signers[1].publicKey.toBase58());

  const recipientKey = (
    await findProgramAddress(
      [
        payer.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        new PublicKey(mintKey).toBuffer(),
      ],
      TOKEN_ASSOCIATED_PROGRAM_ID,
    )
  )[0];

  createAssociatedTokenAccountInstruction(
    instructions,
    new PublicKey(recipientKey),
    payer,
    payer,
    new PublicKey(mintKey),
  );

  const metadataAccount = await createMetadata(
    new Data({
      symbol: 'TEST',
      name: `てすと`,
      uri: 'https://test.hoge.hoge', // size of url for arweave
      sellerFeeBasisPoints: 100,
      creators: null,
    }),
    payer,
    new PublicKey(mintKey),
    payer,
    instructions,
    payer,
  );

  instructions.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        new PublicKey(mintKey),
        new PublicKey(recipientKey),
        new PublicKey(payer),
        [],
        1,
      ),
    );


  const res = await Transaction.sendInstructions(signers, instructions);
  console.log("# Mint sig: ", res);
  
  setTimeout(async() => {
    const destRes = await SplNft.transferNft(mintKey, '2dQ7NGx7f3bNXgJsytZX2SFD3cyzo5FzN5UrwVZz2xrYT65ucBZaNXUSdc3hme2GmA7xPpizaYDT42eGsvDdTp7T', '81fariKMBVi2KvbfM9XBAgTmHJJXnyCzvqsrJ3xGx5WK');
    console.log("# Transfer sig: ", destRes);
  }, 1000)

}

main();
