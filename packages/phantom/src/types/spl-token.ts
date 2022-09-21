import {Keypair, Transaction} from "@solana/web3.js"

export type InitializeMint = {
  mint: Keypair,
  tx: Transaction
}
