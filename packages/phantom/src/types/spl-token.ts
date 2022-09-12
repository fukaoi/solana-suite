import {PublicKey, Transaction} from "@solana/web3.js"

export type InitializeMint = {
  mint: PublicKey,
  tx: Transaction
}
