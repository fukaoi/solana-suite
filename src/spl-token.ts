import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {serialize} from 'borsh';

import {
  Account,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  TransactionSignature,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import {Util} from './util';
import {Transaction} from './transaction';

export namespace SplToken {

  const NFT_AMOUNT = 1;
  const NFT_DECIMAL = 0;

  interface CreateResponse {
    tokenId: string,
  }

  export const create = async (
    sourceSecret: string,
    totalAmount: number,
    decimal: number,
    authority: string = Util.createKeypair(sourceSecret).publicKey.toBase58(),
  ): Promise<CreateResponse> => {
    const connection = Util.getConnection();
    const signer = new Account(Util.createKeypair(sourceSecret).secretKey);
    const authorityPubKey = new PublicKey(authority);

    const token = await Token.createMint(
      connection,
      signer,
      authorityPubKey,
      null,
      decimal,
      TOKEN_PROGRAM_ID
    );

    const tokenAccount = await token.createAssociatedTokenAccount(signer.publicKey);

    await token.mintTo(
      tokenAccount,
      authorityPubKey,
      [],
      totalAmount,
    );

    return {tokenId: token.publicKey.toBase58()};
  }

  export const createNft = (
    sourceSecret: string,
    authority: string = Util.createKeypair(sourceSecret).publicKey.toBase58(),
  ): Promise<CreateResponse> => {
    return create(
      sourceSecret,
      NFT_AMOUNT,
      NFT_DECIMAL,
      authority
    );
  }

  export const transferNft = async (
    tokenId: string,
    sourceSecret: string,
    destPubkey: string,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    return transfer(
      tokenId,
      sourceSecret,
      destPubkey,
      NFT_AMOUNT,
      instruction
    );
  }

  export const transfer = async (
    tokenId: string,
    sourceSecret: string,
    destination: string,
    amount: number,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    const tokenPubkey = new PublicKey(tokenId);
    const destPubkey = new PublicKey(destination);
    const signer = Util.createKeypair(sourceSecret);
    const token = new Token(Util.getConnection(), tokenPubkey, TOKEN_PROGRAM_ID, signer);
    const sourceTokenAccount = (await token.getOrCreateAssociatedAccountInfo(signer.publicKey)).address;
    const destTokenAccount = (await token.getOrCreateAssociatedAccountInfo(destPubkey)).address;

    console.debug(`[sourceTokenAccount:${sourceTokenAccount.toBase58()}]=>[destTokenAccount:${destTokenAccount.toBase58()}]`);

    const param = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      sourceTokenAccount,
      destTokenAccount,
      signer.publicKey,
      [],
      amount
    );

    const instructions = instruction ? new Array(param, instruction) : [param];
    const fn = await Transaction.send(
      signer.publicKey,
      [signer],
      destPubkey,
      amount,
    );
    return fn(instructions);
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

  export class Creator {
    address: string;
    verified: boolean;
    share: number;

    constructor(args: {
      address: string;
      verified: boolean;
      share: number;
    }) {
      this.address = args.address;
      this.verified = args.verified;
      this.share = args.share;
    }
  }

  class CreateMetadataArgs {
    instruction: number = 0;
    data: Data;
    isMutable: boolean;

    constructor(args: {data: Data; isMutable: boolean}) {
      this.data = args.data;
      this.isMutable = args.isMutable;
    }
  }

  export const findProgramAddress = async (
    seeds: (Buffer | Uint8Array)[],
    programId: PublicKey,
  ) => {
    const key =
      'pda-' +
      seeds.reduce((agg, item) => agg + item.toString('hex'), '') +
      programId.toString();
    const result = await PublicKey.findProgramAddress(seeds, programId);

    return [result[0].toBase58(), result[1]] as [string, number];
  };

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
      Data,
      {
        kind: 'struct',
        fields: [
          ['name', 'string'],
          ['symbol', 'string'],
          ['uri', 'string'],
          ['sellerFeeBasisPoints', 'u16'],
          ['creators', {kind: 'option', type: [Creator]}],
        ],
      },
    ],
    [
      Creator,
      {
        kind: 'struct',
        fields: [
          ['address', 'string'],
          ['verified', 'u8'],
          ['share', 'u8'],
        ],
      },
    ],
  ]
  );

  export const createMetaData = async (
    data: Data,
    updateAuthority: string,
    mintKey: string,
    mintAuthorityKey: string,
    payer: string,
  ) => {
    const metadataProgramId = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';

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
    // console.log('# Data: ', data);
    // console.log('# metadataAccount: ', metadataAccount);
    const value = new CreateMetadataArgs({data, isMutable: true});
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
    const inst = new TransactionInstruction({
      keys,
      programId: new PublicKey(metadataProgramId),
      data: txnData,
    });
    return inst;
  }
  export function createAssociatedTokenAccountInstruction(
    associatedTokenAddress: PublicKey,
    payer: PublicKey,
    walletAddress: PublicKey,
    splTokenMintAddress: PublicKey,
  ) {
    const keys = [
      {
        pubkey: payer,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: associatedTokenAddress,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: walletAddress,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: splTokenMintAddress,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: TOKEN_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false,
      },
    ];
    return new TransactionInstruction({
      keys,
      programId: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
      data: Buffer.from([]),
    });
  }

  export const createNftMetaplex2 = async (
    sourceSecret: string,
    authority: string = Util.createKeypair(sourceSecret).publicKey.toBase58(),
  ) => {
    const connection = Util.getConnection();
    const signer = new Account(Util.createKeypair(sourceSecret).secretKey);
    const authorityPubKey = new PublicKey(authority);

    const token = await Token.createMint(
      connection,
      signer,
      authorityPubKey,
      null,
      0,
      TOKEN_PROGRAM_ID
    );

    const tokenAccount = await token.createAssociatedTokenAccount(signer.publicKey);

    // await token.mintTo(
      // tokenAccount,
      // authorityPubKey,
      // [],
      // 1
    // );

    const createors = new Creator({
      address: authority,
      verified: true,
      share: 100
    });

    const cmd = await createMetaData(
      new Data({
        symbol: 'TEST',
        name: 'TEST',
        uri: 'https://hoge.hoge',
        sellerFeeBasisPoints: 10,
        creators: [createors],
      }),
      authority,
      tokenAccount.toBase58(),
      authority,
      authority,
    );

    console.log(cmd);

    const instructions: TransactionInstruction[] = [];
    instructions.push(cmd);

    const keypair = Util.createKeypair(sourceSecret);
    return Transaction.sendMySelf(keypair, instructions);
  }
  
  export const createNftMetaplex = async (
    sourceSecret: string,
    authority: string = Util.createKeypair(sourceSecret).publicKey.toBase58(),
  ) => {
    const mintKey = await create(
      sourceSecret,
      NFT_AMOUNT,
      NFT_DECIMAL,
      authority
    );

    console.log("# mintKey:", mintKey);

    const sourcePubKey = Util.createKeypair(sourceSecret).publicKey;
    let instructions: TransactionInstruction[] = [];

    const recipientKey = (
      await findProgramAddress(
        [
          sourcePubKey.toBuffer(),
          new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA').toBuffer(),
          new PublicKey(mintKey.tokenId).toBuffer(),
        ],
        new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
      )
    )[0];

    console.log("# recipientKey:", recipientKey);

    const catai = createAssociatedTokenAccountInstruction(
      new PublicKey(recipientKey),
      sourcePubKey,
      sourcePubKey,
      new PublicKey(mintKey.tokenId),
    );

    // instructions.push(catai);

    const createors = new Creator({
      address: authority,
      verified: true,
      share: 100
    });

    const cmd = await createMetaData(
      new Data({
        symbol: 'TEST',
        name: 'TEST',
        uri: 'https://hoge.hoge',
        sellerFeeBasisPoints: 10,
        creators: [createors],
      }),
      authority,
      mintKey.tokenId,
      authority,
      authority,
    );

    instructions.push(cmd);

    const keypair = Util.createKeypair(sourceSecret);
    return Transaction.sendMySelf(keypair, instructions);
  }
}
